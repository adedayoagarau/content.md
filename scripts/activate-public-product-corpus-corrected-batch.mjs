#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";
import { authorizeOperation, issueReviewerQualification } from "../packages/governance/dist/index.js";
import { createPublicProductReviewReceipt, derivePublicEvidenceSubjectRef, verifyPublicEvidenceDispositionLedger } from "../packages/research/dist/index.js";

const root = "research/09-experimental/public-product-corpus";
const candidateRoot = `${root}/remediation/corrected-replacement-batch-77`;
const batchId = "2026-08-27-batch-77";
const reviewedAt = "2026-08-27T12:10:00.000-07:00";
const asOf = "2026-08-27T23:59:59.999-12:00";
const scopes = ["public-product-corpus", "public-product-evidence-dispositions"];
const limits = { calls: 1, bytes: 16_384, duration_ms: 1_000, records: 1, model_tokens: 0, browser_actions: 0, retries: 0 };
const checklist = ["subject_accuracy", "transition_legality", "reason_fit", "replacement_validity", "rights_or_projection_safety", "complete_set_review"];
const scalar = (a, b) => a < b ? -1 : a > b ? 1 : 0;
const subjectKey = (x) => `${x.batch_id}\0${x.record_kind}\0${x.record_id}\0${x.record_digest}`;
const ref = (object_id, object_digest) => ({ object_id, object_digest });
const without = (value, ...keys) => Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key)));

function policy(action) {
  return { policy_id: `policy.workspace-owner.${action}.disposition`, policy_version: 1, status: "current", effective_at: "2026-08-27T00:00:00.000-07:00", expires_at: "2027-08-27T00:00:00.000-07:00", allowed_actions: [action], denied_actions: [], review_actions: [], allowed_adapters: ["adapter.governance.reviewer-qualification"], denied_adapters: [], permitted_data_classes: ["governance-metadata"], denied_data_classes: [], permitted_egress: ["none"], max_limits: { ...limits }, human_approval_actions: [action], required_control_types: ["data_processing", "durable_memory", "telemetry"] };
}
function qualification(existingReviewerRef, reviewerId, role) {
  const material = { record_mode: "governed", reviewer_ref: existingReviewerRef, eligible_roles: [role], qualified_objectives: ["public_product_evidence_disposition_review"], authorized_resource_scopes: [...scopes], effective_at: "2026-08-27T00:00:00.000-07:00", expires_at: null, issuer_principal_ref: "principal.contentmd.workspace-owner" };
  const materialDigest = sha256Canonical(material), action = "issue_reviewer_qualification", operationId = `operation.${action}.${materialDigest.slice(0, 16)}`;
  const input = { now: reviewedAt, request: { operation_id: operationId, intent: "enforce", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...scopes], data_classes: ["governance-metadata"], egress: "none", requested_limits: { ...limits }, approval_class: "semantic_decision", requires_readback: false, subject_digest: materialDigest }, policies: [policy(action)], capability_grant: { grant_id: `grant.disposition.${reviewerId.toLowerCase()}`, principal_ref: material.issuer_principal_ref, workload_ref: "workload.contentmd.public-product-remediation", action, adapter_id: "adapter.governance.reviewer-qualification", resource_scope: [...scopes], data_classes: ["governance-metadata"], egress: "none", max_limits: { ...limits }, issued_at: "2026-08-27T12:00:00.000-07:00", expires_at: "2026-08-27T13:00:00.000-07:00", revocation_state: "current" }, approval: { approval_id: `approval.disposition.${reviewerId.toLowerCase()}`, approval_class: "semantic_decision", subject_ref: operationId, subject_digest: materialDigest, status: "issued", issued_at: "2026-08-27T12:01:00.000-07:00", expires_at: "2026-08-27T13:00:00.000-07:00", revocation_state: "current" }, control_dispositions: [{ control_type: "data_processing", applicability: "applicable", record_ref: "control.disposition.processing", status: "current", rationale: "Evidence disposition metadata." }, { control_type: "durable_memory", applicability: "applicable", record_ref: "control.disposition.memory", status: "current", rationale: "Append-only audit evidence." }, { control_type: "telemetry", applicability: "applicable", record_ref: "control.disposition.telemetry", status: "current", rationale: "Minimized governance audit metadata." }], verification_plan_ref: null, reliability_evidence: null };
  const issuance = { input, expected_decision: authorizeOperation(input) };
  return { record: issueReviewerQualification({ material, issuance, revocation: null, as_of: reviewedAt }), issuance };
}

const governance = JSON.parse(await readFile(`${root}/public-product-review-governance.json`, "utf8"));
const adeRef = governance.qualifications.find((item) => item.reviewer_ref.object_id === "reviewer.contentmd.ade").reviewer_ref;
const olaRef = governance.qualifications.find((item) => item.reviewer_ref.object_id === "reviewer.contentmd.ola").reviewer_ref;
const steward = qualification(olaRef, "Ola", "corpus_steward");
const independent = qualification(adeRef, "Ade", "independent_corpus_reviewer");
const manifest = JSON.parse(await readFile(`${candidateRoot}/manifest.json`, "utf8"));
const replacementRefs = new Map();
for (const [file, kind, idKey] of [["sources.jsonl", "source", "source_id"], ["observations.jsonl", "observation", "observation_id"]]) {
  const text = await readFile(`${candidateRoot}/${file}`, "utf8");
  for (const line of text.match(/[^\n]*\n/gu) ?? []) {
    const record = JSON.parse(line);
    replacementRefs.set(`${kind}\0${record[idKey]}`, derivePublicEvidenceSubjectRef({ batch_id: batchId, record_kind: kind, record_id: record[idKey], exact_line_bytes: new TextEncoder().encode(line) }));
  }
}
const actions = [...manifest.source_actions, ...manifest.observation_actions];
const transitions = actions.map((action) => {
  const superseded = action.action === "supersede_with_corrected_candidate";
  const replacement = superseded ? replacementRefs.get(`${action.subject_ref.record_kind}\0${action.replacement_record_id}`) : undefined;
  if (superseded && !replacement) throw new Error(`missing_replacement:${action.replacement_record_id}`);
  return { subject_ref: action.subject_ref, expected_previous_event_digest: null, expected_next_sequence: 1, state: superseded ? "superseded" : "held", reason_code: superseded ? "superseded_by_corrected_evidence" : "review_pending", replacement_refs: replacement ? [replacement] : [], bounded_note: superseded ? "Canonical exact-schema replacement in reviewed batch 77 candidate." : `Held for ${action.action.replaceAll("_", " ")}.`, effective_at: reviewedAt };
}).sort((a, b) => scalar(subjectKey(a.subject_ref), subjectKey(b.subject_ref)));
const setIdentity = { base_ledger_head: null, as_of: asOf, proposed_transitions: transitions };
const setPreimage = { contract_version: "contentmd.public-product-evidence-disposition-set/0.1.0", disposition_set_id: `public-product-evidence-disposition-set.${sha256Canonical(setIdentity)}`, ...setIdentity };
const set = { ...setPreimage, set_digest: sha256Canonical(setPreimage) };
const setSubject = ref(set.disposition_set_id, set.set_digest);
const pair = [[steward, "corpus_steward"], [independent, "independent_corpus_reviewer"]].map(([reviewer, role]) => createPublicProductReviewReceipt({ record_mode: "official", review_kind: "evidence_disposition_set", subject_ref: setSubject, qualification: reviewer.record, reviewer_role: role, checklist_version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0", checklist_results: checklist.map((item) => ({ item, status: "pass" })), decision: "pass", reviewed_at: reviewedAt }));
const receiptRefs = pair.map((receipt) => ref(receipt.receipt_id, receipt.receipt_digest));
const events = transitions.map((transition) => {
  const material = { contract_version: "contentmd.public-product-evidence-disposition/0.1.0", disposition_set_ref: setSubject, subject_ref: transition.subject_ref, previous_event_digest: null, sequence: 1, state: transition.state, reason_code: transition.reason_code, replacement_refs: transition.replacement_refs, bounded_note: transition.bounded_note, decided_at: reviewedAt, effective_at: transition.effective_at, review_receipt_refs: receiptRefs, disposition_effect: "corpus_projection_only", authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false };
  const preimage = { contract_version: material.contract_version, disposition_event_id: `public-product-evidence-disposition.${sha256Canonical(material)}`, ...without(material, "contract_version") };
  return { ...preimage, event_digest: sha256Canonical(preimage) };
});
const qualifications = [...governance.qualifications, steward.record, independent.record].sort((a, b) => scalar(a.qualification_id, b.qualification_id));
const qualificationReplays = [...governance.qualification_replays, { qualification_id: steward.record.qualification_id, issuance: steward.issuance, revocation: null }, { qualification_id: independent.record.qualification_id, issuance: independent.issuance, revocation: null }].sort((a, b) => scalar(a.qualification_id, b.qualification_id));
const receipts = [...governance.receipts, ...pair].sort((a, b) => scalar(a.receipt_id, b.receipt_id));
const governancePreimage = { contract_version: governance.contract_version, as_of: asOf, qualifications, qualification_replays: qualificationReplays, receipts };
const nextGovernance = { ...governancePreimage, governance_digest: sha256Canonical(governancePreimage) };
const known = [...actions.map((item) => item.subject_ref), ...replacementRefs.values()].sort((a, b) => scalar(subjectKey(a), subjectKey(b)));
verifyPublicEvidenceDispositionLedger({ known_subjects: known, sets: [set], events_in_append_order: events, governance: nextGovernance, as_of: asOf, verification_mode: "official" });
await writeFile(`${root}/evidence-disposition-sets.jsonl`, canonicalJson(set));
await writeFile(`${root}/evidence-dispositions.jsonl`, events.map(canonicalJson).join(""));
await writeFile(`${root}/public-product-review-governance.json`, `${JSON.stringify(nextGovernance, null, 2)}\n`);
await writeFile(`${root}/public-product-review-receipts.jsonl`, receipts.map(canonicalJson).join(""));
process.stdout.write(`${JSON.stringify({ disposition_set_id: set.disposition_set_id, events: events.length, superseded: transitions.filter((item) => item.state === "superseded").length, held: transitions.filter((item) => item.state === "held").length, governance_receipts: receipts.length })}\n`);
