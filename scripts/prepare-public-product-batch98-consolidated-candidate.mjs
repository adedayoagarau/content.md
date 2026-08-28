#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const corpusRoot = path.resolve("research/09-experimental/public-product-corpus");
const remediationRoot = path.join(corpusRoot, "remediation");
const inputs = [
  "batch-91-consolidated-review-candidate",
  "batch-92-review-candidate",
  "batch-93-review-candidate",
  "batch-94-review-candidate",
  "batch-95-review-candidate",
  "batch-96-review-candidate",
  "batch-97-review-candidate",
];
const outputRoot = path.join(remediationRoot, "batch-98-consolidated-review-candidate");
const candidateBatch = "2026-08-27-batch-98";
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
const allowedCodes = new Set(["company_target", "product_target", "industry_target", "insufficient_direct_states", "taxonomy_unmapped"]);
const unexpectedErrors = report.errors.filter(({ code }) => !allowedCodes.has(code));
const unmappedErrors = report.errors.filter(({ code }) => code === "taxonomy_unmapped");
if (unexpectedErrors.length > 0) throw new Error(`unexpected candidate errors: ${unexpectedErrors.map(({ code, location }) => `${code}@${location}`).join(", ")}`);
if (unmappedErrors.length !== 6) throw new Error(`expected six review-bound unmapped signatures, found ${unmappedErrors.length}`);
const manifest = {
  contract_version: "contentmd.public-product-corpus-replacement-candidate/0.1.0",
  candidate_batch_name: candidateBatch,
  status: "consolidated_evidence_verified_taxonomy_and_independent_review_required",
  replacement_scope: "complete current active projection plus all evidence candidates through batch 97; atomic supersession required after taxonomy review",
  source_count: sources.length,
  observation_count: observations.length,
  consolidates_review_candidates: inputs.map((directory) => `remediation/${directory}/manifest.json`),
  isolated_projection_verification: {
    status: report.status,
    error_count: report.errors.length,
    unexpected_candidate_error_count: unexpectedErrors.length,
    expected_taxonomy_unmapped_count: unmappedErrors.length,
    direct_observed_slots_under_active_taxonomy: report.coverage_counts.direct_observed_slots,
    products_with_direct_observations: report.coverage_counts.products_with_direct_observations,
    products_meeting_direct_state_target_under_active_taxonomy: report.coverage_counts.products_meeting_direct_state_target,
    insufficient_direct_states_count_under_active_taxonomy: report.errors.filter(({ code }) => code === "insufficient_direct_states").length,
    report_digest: report.report_digest,
  },
  proposed_taxonomy_coverage_preview_ref: "remediation/2026-08-27-post-taxonomy-proposal-coverage-preview.json",
  activation_boundary: {
    mode: "successor taxonomy plus single atomic governed supersession",
    individual_evidence_candidates_become_audit_history: true,
    activated_batches_must_not_be_edited: true,
    mutation_performed: false,
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
console.log(JSON.stringify({ output: outputRoot, sources: sources.length, observations: observations.length, ...manifest.isolated_projection_verification }, null, 2));
