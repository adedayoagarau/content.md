import { createHash } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "../packages/core/src/index.ts";
import { runTask6SimulatorGolden } from "../packages/learning/test/task6-simulator-golden-runner.js";
import { currentGoldenRuntimeProfileDigest } from "../packages/learning/test/golden-runtime.js";

const GOLDEN_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/task6-simulator-golden.json",
  import.meta.url,
));
const LOCK_PATH = fileURLToPath(new URL(
  "../fixtures/learning-ranking/task6-simulator-golden.sha256",
  import.meta.url,
));
const RELATIVE_GOLDEN_PATH = "fixtures/learning-ranking/task6-simulator-golden.json";

if (process.argv.includes("--check")) {
  const raw = readFileSync(GOLDEN_PATH, "utf8");
  const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
  const lock = `${rawDigest}  ${RELATIVE_GOLDEN_PATH}\n`;
  if (readFileSync(LOCK_PATH, "utf8") !== lock) {
    throw new Error("task6_simulator_golden_lock_out_of_date");
  }
  const parsed = JSON.parse(raw) as Record<string, unknown> & {
    fixture_semantic_digest: string;
    runtime_profile_digest: string;
  };
  const { fixture_semantic_digest: fixtureDigest, ...fixture } = parsed;
  if (fixtureDigest !== sha256Canonical({
    contract_version: "contentmd.task6-simulator-golden-preimage/0.1.0",
    fixture,
  })) {
    throw new Error("task6_simulator_golden_fixture_digest_invalid");
  }
  const currentRuntimeDigest = currentGoldenRuntimeProfileDigest(
    "contentmd.task6-runtime-profile/0.1.0",
  );
  if (parsed.runtime_profile_digest !== currentRuntimeDigest) {
    process.stdout.write(`task6 simulator golden lock verified on nonmatching runtime: ${rawDigest}\n`);
    process.exit(0);
  }
  if (canonicalJson(runTask6SimulatorGolden()) !== raw) {
    throw new Error("task6_simulator_golden_fixture_out_of_date");
  }
  process.stdout.write(`task6 simulator golden verified: ${rawDigest}\n`);
} else {
  const raw = canonicalJson(runTask6SimulatorGolden());
  const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
  const lock = `${rawDigest}  ${RELATIVE_GOLDEN_PATH}\n`;
  writeFileSync(GOLDEN_PATH, raw, "utf8");
  writeFileSync(LOCK_PATH, lock, "utf8");
  process.stdout.write(`task6 simulator golden generated: ${rawDigest}\n`);
}
