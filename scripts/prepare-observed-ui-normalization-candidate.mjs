#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import {
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
  verifyPublicProductCorpusV2,
} from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const root = path.resolve("research/09-experimental/public-product-corpus");
const outputRoot = path.join(root, "remediation", "batch-84-review-candidate");
const asOf = "2026-08-27";
const candidateBatch = "2026-08-27-batch-84";
const excludedMarkers = new Set([
  "observed headline; inferred journey",
  "observed control; inferred recovery",
  "observed status-like text",
]);

const input = await readPublicProductCorpusV2Input({ root, asOf });
const decoder = new TextDecoder("utf-8", { fatal: true });
const subjects = [];
for (const batch of input.batches) {
  for (const [recordKind, lines] of [["source", batch.source_lines], ["observation", batch.observation_lines]]) {
    for (const exactLineBytes of lines) {
      const value = JSON.parse(decoder.decode(exactLineBytes));
      const recordId = value[recordKind === "source" ? "source_id" : "observation_id"];
      const ref = derivePublicEvidenceSubjectRef({
        batch_id: batch.batch_id,
        record_kind: recordKind,
        record_id: recordId,
        exact_line_bytes: exactLineBytes,
      });
      subjects.push({ ref, value });
    }
  }
}
const subjectKey = (ref) => `${ref.batch_id}\0${ref.record_kind}\0${ref.record_id}\0${ref.record_digest}`;
const compareUnicodeScalar = (left, right) => {
  const leftPoints = [...left].map((value) => value.codePointAt(0));
  const rightPoints = [...right].map((value) => value.codePointAt(0));
  for (let index = 0; index < Math.min(leftPoints.length, rightPoints.length); index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
};
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
const sources = active.filter(({ ref }) => ref.record_kind === "source");
const actualUiSourceIds = new Set(
  sources.filter(({ value }) => value.source_class === "actual UI").map(({ value }) => value.source_id),
);
const observations = active.filter(({ ref }) => ref.record_kind === "observation");
const normalized = [];
const excluded = [];
const candidateObservations = observations.map(({ value, ref }) => {
  const marker = value.observed_vs_inferred;
  const isCandidate = actualUiSourceIds.has(value.source_id)
    && typeof marker === "string"
    && marker.startsWith("observed")
    && marker !== "observed_ui";
  if (!isCandidate) return value;
  if (excludedMarkers.has(marker) || marker.includes("inferred")) {
    excluded.push({ observation_id: value.observation_id, marker, original_subject_ref: ref });
    return value;
  }
  normalized.push({ observation_id: value.observation_id, marker, original_subject_ref: ref });
  return { ...value, observed_vs_inferred: "observed_ui" };
});

const encode = (records) => records.map((record) => `${JSON.stringify(record)}\n`);
const isolatedInput = {
  ...input,
  batches: [{
    batch_id: candidateBatch,
    source_lines: encode(sources.map(({ value }) => value)).map((line) => new TextEncoder().encode(line)),
    observation_lines: encode(candidateObservations).map((line) => new TextEncoder().encode(line)),
  }],
  disposition_sets: [],
  disposition_events: [],
};
const report = verifyPublicProductCorpusV2(isolatedInput);
const candidateErrors = report.errors.filter((error) => ![
  "company_target", "product_target", "industry_target", "insufficient_direct_states",
].includes(error.code));
const manifest = {
  contract_version: "contentmd.public-product-corpus-replacement-candidate/0.1.0",
  candidate_batch_name: candidateBatch,
  status: candidateErrors.length === 0
    ? "projection_verified_independent_review_required"
    : "projection_failed",
  replacement_scope: "complete active projection; atomic supersession required",
  source_count: sources.length,
  observation_count: candidateObservations.length,
  normalized_observation_count: normalized.length,
  normalized_prior_markers: [...new Set(normalized.map(({ marker }) => marker))].sort(),
  excluded_ambiguous_observations: excluded,
  active_ledger_ref: {
    object_id: ledger.head.ledger_id,
    object_digest: ledger.head.ledger_digest,
  },
  isolated_projection_verification: {
    status: report.status,
    error_count: report.errors.length,
    candidate_specific_error_count: candidateErrors.length,
    direct_observed_slots: report.coverage_counts.direct_observed_slots,
    products_with_direct_observations: report.coverage_counts.products_with_direct_observations,
    products_meeting_direct_state_target: report.coverage_counts.products_meeting_direct_state_target,
    insufficient_direct_states_count: report.errors.filter(({ code }) => code === "insufficient_direct_states").length,
    report_digest: report.report_digest,
  },
  prohibited_activation_shortcuts: [
    "do not edit an activated batch",
    "do not append this batch before independent review",
    "do not activate without atomic governed supersession of every replaced active subject",
    "do not treat marker normalization as new evidence or approval authority",
  ],
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};

await mkdir(outputRoot, { recursive: true });
await writeFile(path.join(outputRoot, "sources.jsonl"), encode(sources.map(({ value }) => value)).join(""));
await writeFile(path.join(outputRoot, "observations.jsonl"), encode(candidateObservations).join(""));
await writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(path.join(outputRoot, "normalization-audit.json"), `${JSON.stringify({ normalized, excluded }, null, 2)}\n`);
await writeFile(path.join(outputRoot, "isolated-verification-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output: outputRoot, ...manifest.isolated_projection_verification, normalized: normalized.length, excluded: excluded.length }, null, 2));
