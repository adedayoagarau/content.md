#!/usr/bin/env node

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { verifyPublicProductCorpusV2 } from "../packages/research/dist/index.js";
import { readPublicProductCorpusV2Input } from "./verify-public-product-corpus.mjs";

const args = process.argv.slice(2);
const values = (name) => args.flatMap((value, index) => value === name ? [args[index + 1]] : []);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const candidates = values("--candidate");
if (candidates.length === 0) throw new Error("At least one --candidate <directory> is required");
const root = path.resolve(value("--root", "research/09-experimental/public-product-corpus"));
const output = value("--output", null);
const asOf = value("--as-of", "2026-08-27");
const encoder = new TextEncoder();
const exactLines = async (file) => {
  const text = await readFile(file, "utf8");
  if (!text.endsWith("\n")) throw new Error(`${file}: JSONL must be LF-terminated`);
  return text.split(/(?<=\n)/u).filter(Boolean).map((line) => encoder.encode(line));
};
const batches = [];
for (let index = 0; index < candidates.length; index += 1) {
  const directory = path.resolve(candidates[index]);
  batches.push({
    batch_id: `candidate-overlay-${String(index + 1).padStart(3, "0")}`,
    source_lines: await exactLines(path.join(directory, "sources.jsonl")),
    observation_lines: await exactLines(path.join(directory, "observations.jsonl")),
  });
}
const base = await readPublicProductCorpusV2Input({ root, asOf });
const report = verifyPublicProductCorpusV2({
  ...base,
  batches,
  disposition_sets: [],
  disposition_events: [],
});
if (output !== null) await writeFile(path.resolve(output), `${JSON.stringify(report, null, 2)}\n`);
const counts = Object.fromEntries(
  [...new Set(report.errors.map(({ code }) => code))].sort()
    .map((code) => [code, report.errors.filter((error) => error.code === code).length]),
);
console.log(JSON.stringify({
  status: report.status,
  error_count: report.errors.length,
  error_counts: counts,
  coverage_counts: report.coverage_counts,
  report_digest: report.report_digest,
  output,
}, null, 2));
