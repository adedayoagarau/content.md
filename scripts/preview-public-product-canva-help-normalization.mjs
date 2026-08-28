#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const root = path.resolve("research/09-experimental/public-product-corpus");
const remediation = path.join(root, "remediation");
const candidate = path.join(remediation, "batch-106-canva-help-normalization-candidate");
const output = path.join(candidate, "atomic-replacement-verification-report.json");
const baseCandidate = path.join(remediation, "batch-98-consolidated-review-candidate");
const additiveCandidates = [
  "batch-79-review-candidate",
  "batch-99-review-candidate",
  "batch-100-review-candidate",
  "batch-101-review-candidate",
  "batch-102-review-candidate",
  "batch-103-review-candidate",
  "batch-104-review-candidate",
  "batch-105-review-candidate",
  "batch-107-review-candidate",
  "batch-108-review-candidate",
  "batch-109-review-candidate",
];
const encoder = new TextEncoder();
const readExactLines = async (file) => {
  const text = await readFile(file, "utf8");
  if (!text.endsWith("\n")) throw new Error(`${file}: JSONL must be LF-terminated`);
  return text.split(/(?<=\n)/u).filter(Boolean);
};
const digest = (line) => createHash("sha256").update(line).digest("hex");
const manifest = JSON.parse(await readFile(path.join(candidate, "manifest.json"), "utf8"));
const superseded = new Map(manifest.superseded_records.map((record) => [`${record.record_kind}\0${record.record_id}`, record]));
const foundSuperseded = new Set();
const filterAndVerify = (kind, lines) => lines.filter((line) => {
  const value = JSON.parse(line);
  const id = value[kind === "source" ? "source_id" : "observation_id"];
  const record = superseded.get(`${kind}\0${id}`);
  if (record === undefined) return true;
  if (digest(line) !== record.exact_line_digest) throw new Error(`${kind} ${id}: superseded exact-line digest mismatch`);
  foundSuperseded.add(`${kind}\0${id}`);
  return false;
});
const replacementSources = filterAndVerify("source", await readExactLines(path.join(baseCandidate, "sources.jsonl")));
const replacementObservations = filterAndVerify("observation", await readExactLines(path.join(baseCandidate, "observations.jsonl")));
if (superseded.size !== 2 || foundSuperseded.size !== superseded.size) throw new Error("Expected exactly two matching superseded records");
replacementSources.push(...await readExactLines(path.join(candidate, "sources.jsonl")));
replacementObservations.push(...await readExactLines(path.join(candidate, "observations.jsonl")));
const batches = [{
  batch_id: "candidate-overlay-001-canva-atomic-replacement",
  source_lines: replacementSources.map((line) => encoder.encode(line)),
  observation_lines: replacementObservations.map((line) => encoder.encode(line)),
}];
for (let index = 0; index < additiveCandidates.length; index += 1) {
  const directory = path.join(remediation, additiveCandidates[index]);
  batches.push({
    batch_id: `candidate-overlay-${String(index + 2).padStart(3, "0")}`,
    source_lines: (await readExactLines(path.join(directory, "sources.jsonl"))).map((line) => encoder.encode(line)),
    observation_lines: (await readExactLines(path.join(directory, "observations.jsonl"))).map((line) => encoder.encode(line)),
  });
}
const base = await readPublicProductCorpusV2Input({ root, asOf: "2026-08-27" });
const report = verifyPublicProductCorpusV2({ ...base, batches, disposition_sets: [], disposition_events: [] });
await writeFile(output, `${JSON.stringify(report, null, 2)}\n`);
const breadthCodes = new Set(["company_target", "product_target", "industry_target", "insufficient_direct_states", "taxonomy_unmapped"]);
const unexpected = report.errors.filter(({ code }) => !breadthCodes.has(code));
console.log(JSON.stringify({
  output,
  unexpected_error_count: unexpected.length,
  error_counts: Object.fromEntries([...new Set(report.errors.map(({ code }) => code))].sort().map((code) => [code, report.errors.filter((error) => error.code === code).length])),
  coverage_counts: report.coverage_counts,
  report_digest: report.report_digest,
}, null, 2));
if (unexpected.length > 0) process.exitCode = 1;
