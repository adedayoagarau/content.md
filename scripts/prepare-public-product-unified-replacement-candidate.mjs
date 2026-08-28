#!/usr/bin/env node

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const corpusRoot = path.resolve("research/09-experimental/public-product-corpus");
const remediationRoot = path.join(corpusRoot, "remediation");
const normalizedRoot = path.join(remediationRoot, "batch-84-review-candidate");
const alaskaRoot = path.join(remediationRoot, "batch-81-review-candidate");
const outputRoot = path.join(remediationRoot, "batch-85-unified-review-candidate");
const candidateBatch = "2026-08-27-batch-85";
const parseJsonl = async (file) => (await readFile(file, "utf8")).trimEnd().split("\n").map(JSON.parse);
const canonicalJsonl = (records) => records.map((record) => `${JSON.stringify(record)}\n`).join("");

const [normalizedSources, normalizedObservations, alaskaSources, alaskaObservations] = await Promise.all([
  parseJsonl(path.join(normalizedRoot, "sources.jsonl")),
  parseJsonl(path.join(normalizedRoot, "observations.jsonl")),
  parseJsonl(path.join(alaskaRoot, "sources.jsonl")),
  parseJsonl(path.join(alaskaRoot, "observations.jsonl")),
]);
const replacedSourceId = "src-alaska-flight-status-80";
const sources = normalizedSources.filter(({ source_id }) => source_id !== replacedSourceId).concat(alaskaSources);
const observations = normalizedObservations.filter(({ source_id }) => source_id !== replacedSourceId).concat(alaskaObservations);
sources.sort((left, right) => left.source_id.localeCompare(right.source_id));
observations.sort((left, right) => left.observation_id.localeCompare(right.observation_id));

const baseInput = await readPublicProductCorpusV2Input({ root: corpusRoot, asOf: "2026-08-27" });
const encoder = new TextEncoder();
const report = verifyPublicProductCorpusV2({
  ...baseInput,
  batches: [{
    batch_id: candidateBatch,
    source_lines: canonicalJsonl(sources).split(/(?<=\n)/u).filter(Boolean).map((line) => encoder.encode(line)),
    observation_lines: canonicalJsonl(observations).split(/(?<=\n)/u).filter(Boolean).map((line) => encoder.encode(line)),
  }],
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
  composition: [
    "complete ledger-active projection from batch 84 candidate",
    "208 unambiguous observed marker normalizations",
    "Alaska flight-status replacement and observed empty-route validation from batch 81 candidate",
  ],
  source_count: sources.length,
  observation_count: observations.length,
  replacement_scope: "complete active projection; atomic supersession of every current active subject required",
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
  supersedes_review_candidates: [
    "remediation/batch-81-review-candidate/manifest.json",
    "remediation/batch-84-review-candidate/manifest.json",
  ],
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
console.log(JSON.stringify({ output: outputRoot, ...manifest.isolated_projection_verification }, null, 2));
