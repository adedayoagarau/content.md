#!/usr/bin/env node

import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import { prepareFullBenchmarkPacket, validateBlindPacket } from "./prepare-content-design-review-sample.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));

function fail(reason) {
  throw new Error(`content_design_benchmark_verification_failed:${reason}`);
}

function counts(values) {
  const result = {};
  for (const value of values) result[value] = (result[value] ?? 0) + 1;
  return Object.fromEntries(Object.entries(result).sort(([left], [right]) => left.localeCompare(right)));
}

const temporary = await mkdtemp(path.join(tmpdir(), "contentmd-full-benchmark-"));
try {
  const scenarios = generateScenarios();
  const packet = validateBlindPacket(prepareFullBenchmarkPacket(scenarios), 10_000);
  const packetPath = path.join(temporary, "packet.json");
  const predictionsPath = path.join(temporary, "predictions.json");
  await writeFile(packetPath, `${JSON.stringify(packet)}\n`);
  const run = spawnSync(process.execPath, [
    path.join(root, "packages/cli/dist/main.js"),
    "benchmark", "content-design",
    "--packet", packetPath,
    "--out", predictionsPath,
  ], { cwd: root, encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
  if (run.status !== 0) fail(`cli:${run.stdout}:${run.stderr}`);
  const predictions = JSON.parse(await readFile(predictionsPath, "utf8"));
  if (predictions.packet_digest !== packet.packet_digest
    || predictions.prediction_count !== 10_000
    || predictions.predictions.length !== 10_000
    || predictions.label_access !== "blind_packet_only"
    || predictions.evaluation_status !== "unscored_pending_qualified_gold"
    || predictions.authority_effect !== "none") fail("prediction_envelope");
  if (new Set(predictions.predictions.map((prediction) => prediction.work_unit_id)).size !== 10_000) fail("prediction_identity");
  const byAbility = counts(packet.review_work_units.map((unit) => unit.ability.id));
  if (Object.values(byAbility).some((count) => count !== 1_000)) fail("ability_distribution");
  const report = {
    contract_version: "contentmd.content-design-full-benchmark-verification/0.1.0",
    scenario_count: scenarios.length,
    blind_packet_count: packet.sample_count,
    prediction_count: predictions.prediction_count,
    packet_digest: packet.packet_digest,
    prediction_set_digest: predictions.prediction_set_digest,
    dispositions: counts(predictions.predictions.map((prediction) => prediction.disposition)),
    by_ability_count: byAbility,
    evaluation_status: predictions.evaluation_status,
    label_access: predictions.label_access,
    authority_effect: "none",
    verification_status: "passed",
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
