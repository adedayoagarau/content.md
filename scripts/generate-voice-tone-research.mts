import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "../packages/core/dist/index.js";
import { createProjectOwnedComparisonCorpus } from "../packages/research/dist/index.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FIXTURE_DIRECTORY = fileURLToPath(new URL(
  "../fixtures/voice-tone-research/",
  import.meta.url,
));

function jsonl(records: readonly unknown[]): string {
  return records.map((record) => canonicalJson(record)).join("");
}

const corpus = createProjectOwnedComparisonCorpus();
const outputs = new Map<string, string>([
  ["project-owned-comparisons.jsonl", jsonl(corpus.comparisons)],
  ["leakage-groups.jsonl", jsonl(corpus.leakage_groups)],
  ["rights-register.jsonl", jsonl(corpus.rights_records)],
  ["comparison-manifest.json", canonicalJson(corpus.manifest)],
]);

mkdirSync(FIXTURE_DIRECTORY, { recursive: true });
if (process.argv.includes("--check")) {
  for (const [name, expected] of outputs) {
    const received = readFileSync(`${FIXTURE_DIRECTORY}${name}`, "utf8");
    if (received !== expected) throw new Error(`voice_research_fixture_out_of_date:${name}`);
  }
  process.stdout.write(
    `voice research fixtures verified: ${corpus.comparisons.length} pairs, ${corpus.leakage_groups.length} leakage groups\n`,
  );
} else {
  for (const [name, bytes] of outputs) writeFileSync(`${FIXTURE_DIRECTORY}${name}`, bytes, "utf8");
  process.stdout.write(
    `voice research fixtures generated in ${ROOT}: ${corpus.comparisons.length} pairs, ${corpus.leakage_groups.length} leakage groups\n`,
  );
}
