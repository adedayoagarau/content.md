#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = fileURLToPath(new URL("../", import.meta.url));
const defaultInput = path.join(root, "docs/tests/fixtures/content-design-scenarios/scenarios.jsonl");
const defaultOutput = path.join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function sortedUnique(values) {
  return [...new Set(values)].sort();
}

function workUnitFor(scenario, samplingCell) {
  return {
    work_unit_id: `review-${scenario.scenario_id}`,
    scenario_ref: { scenario_id: scenario.scenario_id, scenario_digest: scenario.scenario_digest },
    sampling_cell: samplingCell,
    ability: scenario.ability,
    context: scenario.context,
    candidate: {
      text: scenario.candidate.text,
      supporting_text: scenario.candidate.supporting_text,
      voice: scenario.candidate.voice,
      tone: scenario.candidate.tone,
      language: scenario.candidate.language,
      localization_status: scenario.candidate.localization_status,
    },
    rubric: scenario.rubric,
    reviewer_response: {
      disposition: null,
      hard_dimension_results: null,
      quality_dimension_scores: null,
      rationale: null,
      acceptable_meaning_invariants: null,
      recommended_revision: null,
      reviewer_role: null,
      review_evidence_refs: null,
    },
    review_state: "unreviewed",
    authority_effect: "none",
    retrieval_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
}

function packetFor(workUnits, samplingMethod) {
  const preimage = {
    contract_version: "contentmd.content-design-blind-review-packet/0.1.0",
    sampling_method: samplingMethod,
    sample_count: workUnits.length,
    blinded_fields: ["candidate.injected_defect", "provisional_expectation"],
    required_reviewer_role: "qualified_content_designer",
    source_qualification: "synthetic_candidates_not_gold_or_training_eligible",
    review_work_units: workUnits,
    packet_state: "unreviewed",
    authority_effect: "none",
  };
  return { ...preimage, packet_digest: digest(preimage) };
}

export function prepareReviewSample(scenarios) {
  const abilities = sortedUnique(scenarios.map((scenario) => scenario.ability.id));
  const variants = sortedUnique(scenarios.map((scenario) => scenario.candidate.variant));
  const situations = sortedUnique(scenarios.map((scenario) => scenario.context.situation));
  const surfaces = sortedUnique(scenarios.map((scenario) => scenario.context.surface));
  const byKey = new Map(scenarios.map((scenario) => [
    [scenario.ability.id, scenario.context.situation, scenario.context.surface, scenario.candidate.variant].join("\u0000"),
    scenario,
  ]));
  const workUnits = [];
  for (const [abilityIndex, ability] of abilities.entries()) {
    for (const [variantIndex, variant] of variants.entries()) {
      const situation = situations[(abilityIndex + variantIndex) % situations.length];
      const surface = surfaces[(abilityIndex * 3 + variantIndex) % surfaces.length];
      const scenario = byKey.get([ability, situation, surface, variant].join("\u0000"));
      if (scenario === undefined) throw new Error(`content_design_sample_missing:${ability}:${situation}:${surface}:${variant}`);
      workUnits.push(workUnitFor(scenario, { ability_id: ability, candidate_variant_slot: variantIndex + 1 }));
    }
  }
  return packetFor(workUnits, "deterministic_stratified_ability_by_candidate_variant");
}

export function prepareFullBenchmarkPacket(scenarios) {
  return packetFor(scenarios.map((scenario, index) => workUnitFor(scenario, {
    ability_id: scenario.ability.id,
    full_matrix_slot: index + 1,
  })), "complete_deterministic_10000_scenario_matrix");
}

export function validateBlindPacket(packet, expectedCount) {
  if (packet.contract_version !== "contentmd.content-design-blind-review-packet/0.1.0"
    || packet.sample_count !== expectedCount
    || packet.review_work_units.length !== expectedCount
    || packet.packet_state !== "unreviewed"
    || packet.authority_effect !== "none") throw new Error("content_design_review_packet_invalid:envelope");
  const { packet_digest: packetDigest, ...preimage } = packet;
  if (packetDigest !== digest(preimage)) throw new Error("content_design_review_packet_invalid:digest");
  if (new Set(packet.review_work_units.map((unit) => unit.work_unit_id)).size !== expectedCount) throw new Error("content_design_review_packet_invalid:duplicate_work_unit");
  for (const unit of packet.review_work_units) {
    if (Object.hasOwn(unit.candidate, "injected_defect") || Object.hasOwn(unit, "provisional_expectation")) throw new Error("content_design_review_packet_invalid:unblinded_label");
    if (unit.review_state !== "unreviewed" || unit.training_eligibility !== "never" || unit.retrieval_eligibility !== "never") throw new Error("content_design_review_packet_invalid:eligibility");
  }
  return packet;
}

export function validateReviewSample(packet) {
  validateBlindPacket(packet, 100);
  const cells = new Set(packet.review_work_units.map((unit) =>
    `${unit.sampling_cell.ability_id}\u0000${unit.sampling_cell.candidate_variant_slot}`
  ));
  if (cells.size !== 100) throw new Error("content_design_review_packet_invalid:stratification");
  return packet;
}

async function main() {
  const inputIndex = process.argv.indexOf("--input");
  const outputIndex = process.argv.indexOf("--out");
  const input = inputIndex >= 0 ? process.argv[inputIndex + 1] : defaultInput;
  const output = outputIndex >= 0 ? process.argv[outputIndex + 1] : defaultOutput;
  if (input === undefined || output === undefined) throw new Error("content_design_review_packet_invalid:arguments");
  const scenarios = (await readFile(input, "utf8")).trim().split("\n").map((line) => JSON.parse(line));
  const packet = validateReviewSample(prepareReviewSample(scenarios));
  await writeFile(output, `${JSON.stringify(packet, null, 2)}\n`);
  console.log(JSON.stringify({ output, sample_count: packet.sample_count, packet_digest: packet.packet_digest }, null, 2));
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
