#!/usr/bin/env node

import { access, copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";
import {
  createPublicProductReviewReceipt,
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
  verifyPublicProductCorpusV2,
} from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input, verifyPublicProductCorpusV2FromDisk } from "./verify-public-product-corpus.mjs";

const apply = process.argv.includes("--apply");
const root = path.resolve("research/09-experimental/public-product-corpus");
const candidateRoot = path.join(root, "remediation", "batch-91-consolidated-review-candidate");
const destinationRoot = path.join(root, "2026-08-27-batch-91");
const batchId = "2026-08-27-batch-91";
const asOf = "2026-08-27T23:59:59.999-12:00";
const checklist = [
  "subject_accuracy",
  "transition_legality",
  "reason_fit",
  "replacement_validity",
  "rights_or_projection_safety",
  "complete_set_review",
];
const reviewFiles = {
  Ade: path.join(root, "reviewer-assignments", "ade-batch-91-consolidated-review.json"),
  Ola: path.join(root, "reviewer-assignments", "ola-batch-91-consolidated-review.json"),
};
const scalar = (left, right) => left < right ? -1 : left > right ? 1 : 0;
const subjectKey = (ref) => `${ref.batch_id}\0${ref.record_kind}\0${ref.record_id}\0${ref.record_digest}`;
const ref = (object_id, object_digest) => ({ object_id, object_digest });
const without = (value, ...keys) => Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key)));
const exactLines = async (file) => {
  const bytes = new Uint8Array(await readFile(file));
  if (bytes.length === 0 || bytes.at(-1) !== 0x0a) throw new Error(`${file}: expected nonempty LF-terminated JSONL`);
  const lines = [];
  let start = 0;
  for (let index = 0; index < bytes.length; index += 1) {
    if (bytes[index] !== 0x0a) continue;
    lines.push(bytes.slice(start, index + 1));
    start = index + 1;
  }
  return lines;
};
const validateReturnedReview = (reviewer, review) => {
  if (review.reviewer_id !== reviewer
    || review.candidate_ref !== "remediation/batch-91-consolidated-review-candidate/manifest.json"
    || review.decision !== "pass"
    || typeof review.reviewer_rationale !== "string" || review.reviewer_rationale.trim() === ""
    || typeof review.reviewed_at !== "string" || !Number.isFinite(Date.parse(review.reviewed_at))
    || Date.parse(review.reviewed_at) > Date.parse(asOf)
    || review.authority_effect !== "none") {
    throw new Error(`${reviewer} batch 91 review is incomplete, non-passing, or invalid`);
  }
};
const qualificationFor = (governance, reviewerId, role) => {
  const reviewerObjectId = `reviewer.contentmd.${reviewerId.toLowerCase()}`;
  const matches = governance.qualifications.filter((qualification) =>
    qualification.reviewer_ref.object_id === reviewerObjectId
    && qualification.eligible_roles.includes(role)
    && qualification.qualified_objectives.includes("public_product_evidence_disposition_review")
    && qualification.authorized_resource_scopes.includes("public-product-evidence-dispositions")
    && qualification.qualification_status === "current"
    && Date.parse(qualification.effective_at) <= Date.parse(asOf)
    && (qualification.expires_at === null || Date.parse(qualification.expires_at) >= Date.parse(asOf)));
  if (matches.length !== 1) throw new Error(`Expected one current ${role} qualification for ${reviewerId}`);
  return matches[0];
};

try {
  await access(destinationRoot);
  throw new Error(`${destinationRoot} already exists; batch activation is immutable and non-repeatable`);
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}
const [adeReview, olaReview, manifest, preview, isolatedReport, input] = await Promise.all([
  readFile(reviewFiles.Ade, "utf8").then(JSON.parse),
  readFile(reviewFiles.Ola, "utf8").then(JSON.parse),
  readFile(path.join(candidateRoot, "manifest.json"), "utf8").then(JSON.parse),
  readFile(path.join(candidateRoot, "activation-preview.json"), "utf8").then(JSON.parse),
  readFile(path.join(candidateRoot, "isolated-verification-report.json"), "utf8").then(JSON.parse),
  readPublicProductCorpusV2Input({ root, asOf: "2026-08-27", verificationMode: "official" }),
]);
validateReturnedReview("Ade", adeReview);
validateReturnedReview("Ola", olaReview);
if (manifest.status !== "projection_verified_independent_review_required"
  || manifest.candidate_batch_name !== batchId
  || isolatedReport.errors.some(({ code }) => !["company_target", "product_target", "industry_target", "insufficient_direct_states"].includes(code))) {
  throw new Error("Batch 91 candidate or isolated verification is not activation-ready");
}
const candidateSourceLines = await exactLines(path.join(candidateRoot, "sources.jsonl"));
const candidateObservationLines = await exactLines(path.join(candidateRoot, "observations.jsonl"));
const candidateRefs = [];
for (const [kind, lines, idKey] of [
  ["source", candidateSourceLines, "source_id"],
  ["observation", candidateObservationLines, "observation_id"],
]) {
  for (const line of lines) {
    const record = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(line));
    candidateRefs.push(derivePublicEvidenceSubjectRef({
      batch_id: batchId,
      record_kind: kind,
      record_id: record[idKey],
      exact_line_bytes: line,
    }));
  }
}
const candidateRefByKey = new Map(candidateRefs.map((item) => [subjectKey(item), item]));
const replacementKeys = new Set(preview.mappings.map(({ replacement_subject_ref }) => subjectKey(replacement_subject_ref)));
const additionalKeys = new Set(preview.additional_candidate_subjects.map(subjectKey));
if (candidateRefs.length !== manifest.source_count + manifest.observation_count
  || new Set(candidateRefs.map(subjectKey)).size !== candidateRefs.length
  || candidateRefs.some((item) => !replacementKeys.has(subjectKey(item)) && !additionalKeys.has(subjectKey(item)))) {
  throw new Error("Batch 91 candidate subjects do not match the reviewed activation preview");
}
const knownCurrent = [];
for (const batch of input.batches) {
  for (const [kind, lines, idKey] of [
    ["source", batch.source_lines, "source_id"],
    ["observation", batch.observation_lines, "observation_id"],
  ]) {
    for (const line of lines) {
      const record = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(line));
      knownCurrent.push(derivePublicEvidenceSubjectRef({ batch_id: batch.batch_id, record_kind: kind, record_id: record[idKey], exact_line_bytes: line }));
    }
  }
}
knownCurrent.sort((left, right) => scalar(subjectKey(left), subjectKey(right)));
const currentLedger = verifyPublicEvidenceDispositionLedger({
  known_subjects: knownCurrent,
  sets: input.disposition_sets,
  events_in_append_order: input.disposition_events,
  governance: input.review_governance,
  as_of: input.as_of,
  verification_mode: "official",
});
if (currentLedger.head.ledger_id !== preview.active_ledger_ref.object_id
  || currentLedger.head.ledger_digest !== preview.active_ledger_ref.object_digest) {
  throw new Error("Active disposition ledger changed after the batch 91 preview was prepared");
}
const activeKeys = new Set([...currentLedger.state_by_subject.values()]
  .filter(({ state }) => state === "active")
  .map(({ subject_ref }) => subjectKey(subject_ref)));
if (activeKeys.size !== preview.mappings.length
  || preview.mappings.some(({ current_subject_ref }) => !activeKeys.has(subjectKey(current_subject_ref)))) {
  throw new Error("Active projection changed after the batch 91 preview was prepared");
}
const existingEventHeadBySubject = new Map();
for (const event of input.disposition_events) existingEventHeadBySubject.set(subjectKey(event.subject_ref), event);
const decidedAt = [adeReview.reviewed_at, olaReview.reviewed_at].sort(scalar).at(-1);
const transitions = preview.mappings.map(({ current_subject_ref, replacement_subject_ref }) => {
  const previous = existingEventHeadBySubject.get(subjectKey(current_subject_ref));
  const replacement = candidateRefByKey.get(subjectKey(replacement_subject_ref));
  if (replacement === undefined) throw new Error(`Missing candidate replacement ${subjectKey(replacement_subject_ref)}`);
  return {
    subject_ref: current_subject_ref,
    expected_previous_event_digest: previous?.event_digest ?? null,
    expected_next_sequence: (previous?.sequence ?? 0) + 1,
    state: "superseded",
    reason_code: "superseded_by_corrected_evidence",
    replacement_refs: [replacement],
    bounded_note: "Complete reviewed replacement in immutable batch 91; original evidence remains preserved.",
    effective_at: decidedAt,
  };
}).sort((left, right) => scalar(subjectKey(left.subject_ref), subjectKey(right.subject_ref)));
const baseLedgerHead = ref(currentLedger.head.ledger_id, currentLedger.head.ledger_digest);
const setIdentity = { base_ledger_head: baseLedgerHead, as_of: asOf, proposed_transitions: transitions };
const setPreimage = {
  contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0",
  disposition_set_id: `public-product-evidence-disposition-set.${sha256Canonical(setIdentity)}`,
  ...setIdentity,
};
const set = { ...setPreimage, set_digest: sha256Canonical(setPreimage) };
const setSubject = ref(set.disposition_set_id, set.set_digest);
const olaQualification = qualificationFor(input.review_governance, "Ola", "corpus_steward");
const adeQualification = qualificationFor(input.review_governance, "Ade", "independent_corpus_reviewer");
const receiptInputs = [
  [olaQualification, "corpus_steward", olaReview.reviewed_at],
  [adeQualification, "independent_corpus_reviewer", adeReview.reviewed_at],
];
const pair = receiptInputs.map(([qualification, role, reviewedAt]) => createPublicProductReviewReceipt({
  record_mode: "official",
  review_kind: "evidence_disposition_set",
  subject_ref: setSubject,
  qualification,
  reviewer_role: role,
  checklist_version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0",
  checklist_results: checklist.map((item) => ({ item, status: "pass" })),
  decision: "pass",
  reviewed_at: reviewedAt,
}));
const receiptRefs = pair.map((receipt) => ref(receipt.receipt_id, receipt.receipt_digest));
const events = transitions.map((transition) => {
  const material = {
    contract_version: "contentmd.public-product-evidence-disposition/0.1.0",
    disposition_set_ref: setSubject,
    subject_ref: transition.subject_ref,
    previous_event_digest: transition.expected_previous_event_digest,
    sequence: transition.expected_next_sequence,
    state: transition.state,
    reason_code: transition.reason_code,
    replacement_refs: transition.replacement_refs,
    bounded_note: transition.bounded_note,
    decided_at: decidedAt,
    effective_at: transition.effective_at,
    review_receipt_refs: receiptRefs,
    disposition_effect: "corpus_projection_only",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  const preimage = {
    contract_version: material.contract_version,
    disposition_event_id: `public-product-evidence-disposition.${sha256Canonical(material)}`,
    ...without(material, "contract_version"),
  };
  return { ...preimage, event_digest: sha256Canonical(preimage) };
});
const receipts = [...input.review_governance.receipts, ...pair].sort((left, right) => scalar(left.receipt_id, right.receipt_id));
const governancePreimage = {
  contract_version: input.review_governance.contract_version,
  as_of: input.review_governance.as_of,
  qualifications: input.review_governance.qualifications,
  qualification_replays: input.review_governance.qualification_replays,
  receipts,
};
const nextGovernance = { ...governancePreimage, governance_digest: sha256Canonical(governancePreimage) };
const nextSets = [...input.disposition_sets, set];
const nextEvents = [...input.disposition_events, ...events];
const nextKnown = [...knownCurrent, ...candidateRefs].sort((left, right) => scalar(subjectKey(left), subjectKey(right)));
verifyPublicEvidenceDispositionLedger({
  known_subjects: nextKnown,
  sets: nextSets,
  events_in_append_order: nextEvents,
  governance: nextGovernance,
  as_of: input.as_of,
  verification_mode: "official",
});
const projectedReport = verifyPublicProductCorpusV2({
  ...input,
  batches: [...input.batches, { batch_id: batchId, source_lines: candidateSourceLines, observation_lines: candidateObservationLines }],
  disposition_sets: nextSets,
  disposition_events: nextEvents,
  review_governance: nextGovernance,
});
if (projectedReport.errors.length !== isolatedReport.errors.length
  || projectedReport.coverage_counts.direct_observed_slots !== isolatedReport.coverage_counts.direct_observed_slots
  || projectedReport.coverage_counts.products_meeting_direct_state_target !== isolatedReport.coverage_counts.products_meeting_direct_state_target
  || projectedReport.errors.some(({ code }) => !["company_target", "product_target", "industry_target", "insufficient_direct_states"].includes(code))) {
  throw new Error("Governed activation projection does not match the reviewed batch 91 projection");
}
const result = {
  mode: apply ? "apply" : "dry_run",
  status: apply ? "ready_to_apply" : "verified_no_mutation",
  batch_id: batchId,
  disposition_set_id: set.disposition_set_id,
  supersession_events: events.length,
  additive_subjects: preview.additional_candidate_subjects.length,
  new_review_receipts: pair.length,
  projected_error_count: projectedReport.errors.length,
  projected_direct_observed_slots: projectedReport.coverage_counts.direct_observed_slots,
  projected_products_meeting_target: projectedReport.coverage_counts.products_meeting_direct_state_target,
  projected_report_digest: projectedReport.report_digest,
};
if (!apply) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  process.exit(0);
}
await mkdir(destinationRoot);
await copyFile(path.join(candidateRoot, "sources.jsonl"), path.join(destinationRoot, "sources.jsonl"));
await copyFile(path.join(candidateRoot, "observations.jsonl"), path.join(destinationRoot, "observations.jsonl"));
await writeFile(path.join(root, "evidence-disposition-sets.jsonl"), nextSets.map(canonicalJson).join(""));
await writeFile(path.join(root, "evidence-dispositions.jsonl"), nextEvents.map(canonicalJson).join(""));
await writeFile(path.join(root, "public-product-review-governance.json"), `${JSON.stringify(nextGovernance, null, 2)}\n`);
await writeFile(path.join(root, "public-product-review-receipts.jsonl"), receipts.map(canonicalJson).join(""));
const diskReport = await verifyPublicProductCorpusV2FromDisk({ root, asOf: "2026-08-27", verificationMode: "official" });
if (diskReport.report_digest !== projectedReport.report_digest) throw new Error("Post-write verifier digest mismatch");
process.stdout.write(`${JSON.stringify({ ...result, status: "applied_and_verified" }, null, 2)}\n`);
