import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "../packages/core/src/index.ts";
import { runPairwiseGolden } from "../packages/learning/test/pairwise-golden-runner.js";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const GOLDEN_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/golden-model.json",
  import.meta.url,
));
const LOCK_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/golden-model.sha256",
  import.meta.url,
));
const RELATIVE_GOLDEN_PATH = "fixtures/learning-ranking/golden-model.json";

const raw = canonicalJson(runPairwiseGolden());
const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
const lock = `${rawDigest}  ${RELATIVE_GOLDEN_PATH}\n`;

if (process.argv.includes("--check")) {
  if (readFileSync(GOLDEN_PATH, "utf8") !== raw) {
    throw new Error("pairwise_golden_fixture_out_of_date");
  }
  if (readFileSync(LOCK_PATH, "utf8") !== lock) {
    throw new Error("pairwise_golden_lock_out_of_date");
  }
  process.stdout.write(`pairwise golden verified: ${rawDigest}\n`);
} else {
  writeFileSync(GOLDEN_PATH, raw, "utf8");
  writeFileSync(LOCK_PATH, lock, "utf8");
  process.stdout.write(`pairwise golden generated: ${rawDigest}\n`);
}
