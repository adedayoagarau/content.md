#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
} from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const root = path.resolve("research/09-experimental/public-product-corpus");
const candidateRoot = path.join(root, "remediation", "batch-91-consolidated-review-candidate");
const output = path.join(candidateRoot, "activation-preview.json");
const decoder = new TextDecoder("utf-8", { fatal: true });
const subjectKey = (ref) => `${ref.batch_id}\0${ref.record_kind}\0${ref.record_id}\0${ref.record_digest}`;
const compareUnicodeScalar = (left, right) => {
  const leftPoints = [...left].map((value) => value.codePointAt(0));
  const rightPoints = [...right].map((value) => value.codePointAt(0));
  for (let index = 0; index < Math.min(leftPoints.length, rightPoints.length); index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
};
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
const bind = (batchId, recordKind, exactLineBytes) => {
  const value = JSON.parse(decoder.decode(exactLineBytes));
  const recordId = value[recordKind === "source" ? "source_id" : "observation_id"];
  return {
    value,
    ref: derivePublicEvidenceSubjectRef({
      batch_id: batchId,
      record_kind: recordKind,
      record_id: recordId,
      exact_line_bytes: exactLineBytes,
    }),
  };
};

const input = await readPublicProductCorpusV2Input({ root, asOf: "2026-08-27" });
const subjects = [];
for (const batch of input.batches) {
  for (const line of batch.source_lines) subjects.push(bind(batch.batch_id, "source", line));
  for (const line of batch.observation_lines) subjects.push(bind(batch.batch_id, "observation", line));
}
subjects.sort((left, right) => compareUnicodeScalar(subjectKey(left.ref), subjectKey(right.ref)));
const ledger = verifyPublicEvidenceDispositionLedger({
  known_subjects: subjects.map(({ ref }) => ref),
  sets: input.disposition_sets,
  events_in_append_order: input.disposition_events,
  governance: input.review_governance,
  as_of: input.as_of,
  verification_mode: input.verification_mode,
});
const active = subjects.filter(({ ref }) => ledger.state_by_subject.get(subjectKey(ref))?.state === "active");
const candidateSubjects = [
  ...(await exactLines(path.join(candidateRoot, "sources.jsonl"))).map((line) => bind("2026-08-27-batch-91", "source", line)),
  ...(await exactLines(path.join(candidateRoot, "observations.jsonl"))).map((line) => bind("2026-08-27-batch-91", "observation", line)),
];
const byKindAndId = new Map(candidateSubjects.map((item) => [`${item.ref.record_kind}\0${item.ref.record_id}`, item]));
const candidateSourcesByUrl = new Map(candidateSubjects
  .filter(({ ref }) => ref.record_kind === "source")
  .map((item) => [item.value.canonical_url, item]));
const observationFallbackKey = (value) => JSON.stringify({
  company: value.company,
  product_system: value.product_system,
  journey: value.journey,
  event_state: value.event_state,
  content_slot_type: value.content_slot_type,
  surface_channel: value.surface_channel,
  exact_wording_span: value.exact_wording_span,
});
const candidateObservationsByFallback = new Map();
for (const item of candidateSubjects.filter(({ ref }) => ref.record_kind === "observation")) {
  const key = observationFallbackKey(item.value);
  const list = candidateObservationsByFallback.get(key) ?? [];
  list.push(item);
  candidateObservationsByFallback.set(key, list);
}
const usedCandidateKeys = new Set();
const mappings = [];
for (const current of active) {
  let replacement = byKindAndId.get(`${current.ref.record_kind}\0${current.ref.record_id}`);
  if (replacement === undefined && current.ref.record_kind === "source") {
    replacement = candidateSourcesByUrl.get(current.value.canonical_url);
  }
  if (replacement === undefined && current.ref.record_kind === "observation") {
    const choices = (candidateObservationsByFallback.get(observationFallbackKey(current.value)) ?? [])
      .filter((item) => !usedCandidateKeys.has(subjectKey(item.ref)));
    if (choices.length === 1) replacement = choices[0];
  }
  if (replacement === undefined) throw new Error(`No batch 91 replacement for ${subjectKey(current.ref)}`);
  if (replacement.ref.record_kind !== current.ref.record_kind
    || replacement.value.company !== current.value.company
    || replacement.value.product_system !== current.value.product_system) {
    throw new Error(`Projection mismatch for ${subjectKey(current.ref)}`);
  }
  usedCandidateKeys.add(subjectKey(replacement.ref));
  mappings.push({
    current_subject_ref: current.ref,
    replacement_subject_ref: replacement.ref,
    matching_basis: replacement.ref.record_id === current.ref.record_id
      ? "same_record_id"
      : current.ref.record_kind === "source" ? "same_canonical_url" : "same_structural_signature_and_wording",
    proposed_state: "superseded",
    proposed_reason_code: "superseded_by_corrected_evidence",
    authority_effect: "none",
  });
}
mappings.sort((left, right) => compareUnicodeScalar(subjectKey(left.current_subject_ref), subjectKey(right.current_subject_ref)));
const additionalCandidateSubjects = candidateSubjects
  .filter(({ ref }) => !usedCandidateKeys.has(subjectKey(ref)))
  .map(({ ref }) => ref)
  .sort((left, right) => compareUnicodeScalar(subjectKey(left), subjectKey(right)));
const preview = {
  schema_version: "1.0.0",
  artifact_type: "public_product_batch91_activation_preview",
  status: "review_required_no_mutation_performed",
  active_ledger_ref: { object_id: ledger.head.ledger_id, object_digest: ledger.head.ledger_digest },
  candidate_batch_id: "2026-08-27-batch-91",
  current_active_subject_count: active.length,
  proposed_supersession_count: mappings.length,
  additional_candidate_subject_count: additionalCandidateSubjects.length,
  mappings,
  additional_candidate_subjects: additionalCandidateSubjects,
  required_reviewers: [
    { reviewer_id: "Ola", governed_role: "corpus_steward" },
    { reviewer_id: "Ade", governed_role: "independent_corpus_reviewer" },
  ],
  prohibited_until_passing_reviews: [
    "copy candidate into an active batch directory",
    "issue review receipts",
    "append a disposition set or events",
    "claim an accepted projection",
  ],
  authority_effect: "none",
};
await writeFile(output, `${JSON.stringify(preview, null, 2)}\n`);
console.log(JSON.stringify({
  output,
  current_active_subject_count: preview.current_active_subject_count,
  proposed_supersession_count: preview.proposed_supersession_count,
  additional_candidate_subject_count: preview.additional_candidate_subject_count,
}, null, 2));
