import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "../packages/core/src/index.ts";
import { runTask6SimulatorGolden } from "../packages/learning/test/task6-simulator-golden-runner.js";

const GOLDEN_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/task6-simulator-golden.json",
  import.meta.url,
));
const LOCK_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/task6-simulator-golden.sha256",
  import.meta.url,
));
const RELATIVE_GOLDEN_PATH = "fixtures/learning-ranking/task6-simulator-golden.json";

const raw = canonicalJson(runTask6SimulatorGolden());
const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
const lock = `${rawDigest}  ${RELATIVE_GOLDEN_PATH}\n`;

if (process.argv.includes("--check")) {
  if (readFileSync(GOLDEN_PATH, "utf8") !== raw) {
    throw new Error("task6_simulator_golden_fixture_out_of_date");
  }
  if (readFileSync(LOCK_PATH, "utf8") !== lock) {
    throw new Error("task6_simulator_golden_lock_out_of_date");
  }
  process.stdout.write(`task6 simulator golden verified: ${rawDigest}\n`);
} else {
  writeFileSync(GOLDEN_PATH, raw, "utf8");
  writeFileSync(LOCK_PATH, lock, "utf8");
  process.stdout.write(`task6 simulator golden generated: ${rawDigest}\n`);
}
