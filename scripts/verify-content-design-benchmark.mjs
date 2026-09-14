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

function assertExactDistribution(actual, expectedCount, expectedKeys, reason) {
  if (Object.keys(actual).length !== expectedKeys
    || Object.values(actual).some((count) => count !== expectedCount)) fail(reason);
}

function distinct(values) {
  return [...new Set(values)].sort();
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
  if (new Set(scenarios.map((scenario) => scenario.scenario_digest)).size !== 10_000) fail("scenario_digest_identity");
  const byAbility = counts(packet.review_work_units.map((unit) => unit.ability.id));
  const bySituation = counts(packet.review_work_units.map((unit) => unit.context.situation));
  const bySurface = counts(packet.review_work_units.map((unit) => unit.context.surface));
  const byLocale = counts(packet.review_work_units.map((unit) => unit.context.target_locale));
  assertExactDistribution(byAbility, 1_000, 10, "ability_distribution");
  assertExactDistribution(bySituation, 1_000, 10, "situation_distribution");
  assertExactDistribution(bySurface, 1_000, 10, "surface_distribution");
  assertExactDistribution(byLocale, 1_000, 10, "locale_distribution");

  const requiredSlices = {
    situations: distinct(packet.review_work_units.map((unit) => unit.context.situation)),
    surfaces: distinct(packet.review_work_units.map((unit) => unit.context.surface)),
    locales: distinct(packet.review_work_units.map((unit) => unit.context.target_locale)),
  };
  for (const ability of Object.keys(byAbility)) {
    const units = packet.review_work_units.filter((unit) => unit.ability.id === ability);
    if (JSON.stringify(distinct(units.map((unit) => unit.context.situation))) !== JSON.stringify(requiredSlices.situations)) {
      fail(`ability_situation_coverage:${ability}`);
    }
    if (JSON.stringify(distinct(units.map((unit) => unit.context.surface))) !== JSON.stringify(requiredSlices.surfaces)) {
      fail(`ability_surface_coverage:${ability}`);
    }
    if (JSON.stringify(distinct(units.map((unit) => unit.context.target_locale))) !== JSON.stringify(requiredSlices.locales)) {
      fail(`ability_locale_coverage:${ability}`);
    }
  }

  const breadth = {
    risks: distinct(packet.review_work_units.map((unit) => unit.context.risk)),
    voice_profiles: distinct(packet.review_work_units.map((unit) => unit.context.voice_profile)),
    situational_tones: distinct(packet.review_work_units.map((unit) => unit.context.situational_tone)),
    channels: distinct(packet.review_work_units.map((unit) => unit.context.channel)),
    directions: distinct(packet.review_work_units.map((unit) => unit.context.direction)),
  };
  if (breadth.risks.length !== 4
    || breadth.voice_profiles.length !== 4
    || breadth.situational_tones.length !== 4
    || breadth.channels.length !== 6
    || JSON.stringify(breadth.directions) !== JSON.stringify(["ltr", "rtl"])) fail("context_breadth");
  if (packet.review_work_units.some((unit) => (
    Object.hasOwn(unit.candidate, "variant")
    || Object.hasOwn(unit.candidate, "voice")
    || Object.hasOwn(unit.candidate, "tone")
    || Object.hasOwn(unit.candidate, "injected_defect")
  ))) fail("blinded_candidate_fields");
  const report = {
    contract_version: "contentmd.content-design-full-benchmark-verification/0.1.0",
    scenario_count: scenarios.length,
    blind_packet_count: packet.sample_count,
    prediction_count: predictions.prediction_count,
    packet_digest: packet.packet_digest,
    prediction_set_digest: predictions.prediction_set_digest,
    dispositions: counts(predictions.predictions.map((prediction) => prediction.disposition)),
    by_ability_count: byAbility,
    cross_dimensional_coverage: {
      situations: Object.keys(bySituation).length,
      surfaces: Object.keys(bySurface).length,
      locales: Object.keys(byLocale).length,
      ...breadth,
      every_ability_covers_every_situation_surface_and_locale: true,
    },
    evaluation_status: predictions.evaluation_status,
    label_access: predictions.label_access,
    authority_effect: "none",
    verification_status: "passed",
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
