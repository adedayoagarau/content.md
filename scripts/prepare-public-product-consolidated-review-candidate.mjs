#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const corpusRoot = path.resolve("research/09-experimental/public-product-corpus");
const remediationRoot = path.join(corpusRoot, "remediation");
const inputs = [
  "batch-85-unified-review-candidate",
  "batch-86-review-candidate",
  "batch-87-review-candidate",
  "batch-88-review-candidate",
  "batch-89-review-candidate",
  "batch-90-review-candidate",
];
const outputRoot = path.join(remediationRoot, "batch-91-consolidated-review-candidate");
const candidateBatch = "2026-08-27-batch-91";
const readJsonl = async (file) => (await readFile(file, "utf8")).trimEnd().split("\n").map(JSON.parse);
const canonicalJsonl = (records) => records.map((record) => `${JSON.stringify(record)}\n`).join("");
const sources = [];
const observations = [];
for (const directory of inputs) {
  sources.push(...await readJsonl(path.join(remediationRoot, directory, "sources.jsonl")));
  observations.push(...await readJsonl(path.join(remediationRoot, directory, "observations.jsonl")));
}
const assertUnique = (records, key, label) => {
  const counts = new Map();
  for (const record of records) counts.set(record[key], (counts.get(record[key]) ?? 0) + 1);
  const duplicates = [...counts].filter(([, count]) => count > 1).map(([value]) => value);
  if (duplicates.length > 0) throw new Error(`${label} duplicates: ${duplicates.join(", ")}`);
};
assertUnique(sources, "source_id", "source_id");
assertUnique(sources, "canonical_url", "canonical_url");
assertUnique(observations, "observation_id", "observation_id");
const sourceIds = new Set(sources.map(({ source_id }) => source_id));
const missingSources = observations.filter(({ source_id }) => !sourceIds.has(source_id));
if (missingSources.length > 0) throw new Error(`missing source bindings: ${missingSources.map(({ observation_id }) => observation_id).join(", ")}`);
sources.sort((left, right) => left.source_id.localeCompare(right.source_id));
observations.sort((left, right) => left.observation_id.localeCompare(right.observation_id));

const base = await readPublicProductCorpusV2Input({ root: corpusRoot, asOf: "2026-08-27" });
const encoder = new TextEncoder();
const toLines = (records) => canonicalJsonl(records).split(/(?<=\n)/u).filter(Boolean).map((line) => encoder.encode(line));
const report = verifyPublicProductCorpusV2({
  ...base,
  batches: [{ batch_id: candidateBatch, source_lines: toLines(sources), observation_lines: toLines(observations) }],
  disposition_sets: [],
  disposition_events: [],
});
const candidateErrors = report.errors.filter(({ code }) => ![
  "company_target", "product_target", "industry_target", "insufficient_direct_states",
].includes(code));
const manifest = {
  contract_version: "contentmd.public-product-corpus-replacement-candidate/0.1.0",
  candidate_batch_name: candidateBatch,
  status: candidateErrors.length === 0 ? "projection_verified_independent_review_required" : "projection_failed",
  replacement_scope: "complete current active projection plus reviewed-candidate evidence; atomic supersession required",
  source_count: sources.length,
  observation_count: observations.length,
  consolidates_review_candidates: inputs.map((directory) => `remediation/${directory}/manifest.json`),
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
  activation_boundary: {
    mode: "single atomic governed supersession",
    review_candidates_85_through_90_become_audit_history: true,
    activated_batches_must_not_be_edited: true,
  },
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};
await mkdir(outputRoot, { recursive: true });
await writeFile(path.join(outputRoot, "sources.jsonl"), canonicalJsonl(sources));
await writeFile(path.join(outputRoot, "observations.jsonl"), canonicalJsonl(observations));
await writeFile(path.join(outputRoot, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(path.join(outputRoot, "isolated-verification-report.json"), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ output: outputRoot, ...manifest.isolated_projection_verification, sources: sources.length, observations: observations.length }, null, 2));
