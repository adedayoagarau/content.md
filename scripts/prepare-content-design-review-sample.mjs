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
    contract_version: "contentmd.content-design-blind-review-packet/0.2.0",
    sampling_method: samplingMethod,
    sample_count: workUnits.length,
    blinded_fields: ["candidate.variant", "candidate.voice", "candidate.tone", "candidate.injected_defect", "evaluation_control", "provisional_expectation"],
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

export function prepareCalibrationCohort(scenarios) {
  return packetFor(selectCohortScenarios(scenarios, 0).map(({ scenario, ability, variantIndex, cohortSlot }) => workUnitFor(scenario, {
    ability_id: ability,
    candidate_variant_slot: variantIndex + 1,
    calibration_context_slot: cohortSlot + 1,
  })), "deterministic_stratified_ability_by_candidate_variant_five_contexts");
}

function selectCohortScenarios(scenarios, startSlot) {
  const abilities = sortedUnique(scenarios.map((scenario) => scenario.ability.id));
  const variants = sortedUnique(scenarios.map((scenario) => scenario.candidate.variant));
  const selected = [];
  for (const [abilityIndex, ability] of abilities.entries()) {
    for (const [variantIndex, variant] of variants.entries()) {
      const candidates = scenarios
        .filter((scenario) => scenario.ability.id === ability && scenario.candidate.variant === variant)
        .sort((left, right) => left.scenario_id.localeCompare(right.scenario_id));
      if (candidates.length !== 100) {
        throw new Error(`content_design_calibration_missing:${ability}:${variant}`);
      }
      for (let cohortSlot = startSlot; cohortSlot < startSlot + 5; cohortSlot += 1) {
        const matrixIndex = (cohortSlot * 21 + abilityIndex * 7 + variantIndex * 3) % candidates.length;
        const scenario = candidates[matrixIndex];
        selected.push({ scenario, ability, variantIndex, cohortSlot });
      }
    }
  }
  return selected;
}

export function prepareHeldOutReservation(scenarios) {
  const scenarioRefs = selectCohortScenarios(scenarios, 5).map(({ scenario, ability, variantIndex, cohortSlot }) => ({
    scenario_id: scenario.scenario_id,
    scenario_digest: scenario.scenario_digest,
    ability_id: ability,
    candidate_variant_slot: variantIndex + 1,
    reserved_context_slot: cohortSlot - 4,
  }));
  const preimage = {
    contract_version: "contentmd.content-design-held-out-reservation/0.1.0",
    source_matrix_count: scenarios.length,
    reserved_count: scenarioRefs.length,
    selection_method: "disjoint_stratified_ability_by_candidate_variant_five_contexts",
    scenario_refs: scenarioRefs,
    reservation_state: "frozen_unopened",
    materialization_gate: "calibration_frozen_and_evaluation_authorized",
    authority_effect: "none",
    retrieval_eligibility: "never",
    training_eligibility: "never",
  };
  return { ...preimage, reservation_digest: digest(preimage) };
}

export function prepareFullBenchmarkPacket(scenarios) {
  return packetFor(scenarios.map((scenario, index) => workUnitFor(scenario, {
    ability_id: scenario.ability.id,
    full_matrix_slot: index + 1,
  })), "complete_deterministic_10000_scenario_matrix");
}

export function validateBlindPacket(packet, expectedCount) {
  if (packet.contract_version !== "contentmd.content-design-blind-review-packet/0.2.0"
    || packet.sample_count !== expectedCount
    || packet.review_work_units.length !== expectedCount
    || packet.packet_state !== "unreviewed"
    || packet.authority_effect !== "none") throw new Error("content_design_review_packet_invalid:envelope");
  const { packet_digest: packetDigest, ...preimage } = packet;
  if (packetDigest !== digest(preimage)) throw new Error("content_design_review_packet_invalid:digest");
  if (new Set(packet.review_work_units.map((unit) => unit.work_unit_id)).size !== expectedCount) throw new Error("content_design_review_packet_invalid:duplicate_work_unit");
  for (const unit of packet.review_work_units) {
    if (Object.hasOwn(unit.candidate, "variant")
      || Object.hasOwn(unit.candidate, "voice")
      || Object.hasOwn(unit.candidate, "tone")
      || Object.hasOwn(unit.candidate, "injected_defect")
      || Object.hasOwn(unit, "evaluation_control")
      || Object.hasOwn(unit, "provisional_expectation")) throw new Error("content_design_review_packet_invalid:unblinded_label");
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

export function validateCalibrationCohort(packet) {
  validateBlindPacket(packet, 500);
  const cells = new Set(packet.review_work_units.map((unit) => [
    unit.sampling_cell.ability_id,
    unit.sampling_cell.candidate_variant_slot,
    unit.sampling_cell.calibration_context_slot,
  ].join("\u0000")));
  if (cells.size !== 500) throw new Error("content_design_review_packet_invalid:calibration_stratification");
  const abilityIds = sortedUnique(packet.review_work_units.map((unit) => unit.ability.id));
  for (const abilityId of abilityIds) {
    const units = packet.review_work_units.filter((unit) => unit.ability.id === abilityId);
    for (const field of ["situation", "surface", "target_locale"]) {
      if (new Set(units.map((unit) => unit.context[field])).size !== 10) {
        throw new Error(`content_design_review_packet_invalid:calibration_${field}_coverage`);
      }
    }
  }
  return packet;
}

export function validateHeldOutReservation(reservation) {
  const expectedKeys = ["authority_effect", "contract_version", "materialization_gate", "reservation_digest", "reservation_state", "reserved_count", "retrieval_eligibility", "scenario_refs", "selection_method", "source_matrix_count", "training_eligibility"].sort();
  if (reservation === null || typeof reservation !== "object" || Array.isArray(reservation)
    || Object.keys(reservation).sort().join("\0") !== expectedKeys.join("\0")
    || reservation.contract_version !== "contentmd.content-design-held-out-reservation/0.1.0"
    || reservation.source_matrix_count !== 10_000
    || reservation.reserved_count !== 500
    || reservation.scenario_refs.length !== 500
    || reservation.reservation_state !== "frozen_unopened"
    || reservation.materialization_gate !== "calibration_frozen_and_evaluation_authorized"
    || reservation.authority_effect !== "none"
    || reservation.retrieval_eligibility !== "never"
    || reservation.training_eligibility !== "never") {
    throw new Error("content_design_held_out_reservation_invalid:envelope");
  }
  const { reservation_digest: reservationDigest, ...preimage } = reservation;
  if (reservationDigest !== digest(preimage)) throw new Error("content_design_held_out_reservation_invalid:digest");
  if (new Set(reservation.scenario_refs.map((ref) => ref.scenario_id)).size !== 500) {
    throw new Error("content_design_held_out_reservation_invalid:duplicate_scenario");
  }
  const expectedRefKeys = ["ability_id", "candidate_variant_slot", "reserved_context_slot", "scenario_digest", "scenario_id"].sort().join("\0");
  for (const ref of reservation.scenario_refs) {
    if (ref === null || typeof ref !== "object" || Array.isArray(ref)
      || Object.keys(ref).sort().join("\0") !== expectedRefKeys
      || !/^cdes-\d{5}$/u.test(ref.scenario_id)
      || !/^[0-9a-f]{64}$/u.test(ref.scenario_digest)
      || typeof ref.ability_id !== "string" || ref.ability_id === ""
      || !Number.isSafeInteger(ref.candidate_variant_slot) || ref.candidate_variant_slot < 1 || ref.candidate_variant_slot > 10
      || !Number.isSafeInteger(ref.reserved_context_slot) || ref.reserved_context_slot < 1 || ref.reserved_context_slot > 5) {
      throw new Error("content_design_held_out_reservation_invalid:scenario_ref");
    }
  }
  return reservation;
}

async function main() {
  const inputIndex = process.argv.indexOf("--input");
  const outputIndex = process.argv.indexOf("--out");
  const calibrationOutputIndex = process.argv.indexOf("--calibration-out");
  const reservationOutputIndex = process.argv.indexOf("--reservation-out");
  const input = inputIndex >= 0 ? process.argv[inputIndex + 1] : defaultInput;
  if ([outputIndex, calibrationOutputIndex, reservationOutputIndex].filter((index) => index >= 0).length > 1) {
    throw new Error("content_design_review_packet_invalid:choose_one_output");
  }
  const calibration = calibrationOutputIndex >= 0;
  const reservation = reservationOutputIndex >= 0;
  const output = reservation
    ? process.argv[reservationOutputIndex + 1]
    : calibration ? process.argv[calibrationOutputIndex + 1]
    : outputIndex >= 0 ? process.argv[outputIndex + 1] : defaultOutput;
  if (input === undefined || output === undefined) throw new Error("content_design_review_packet_invalid:arguments");
  const scenarios = (await readFile(input, "utf8")).trim().split("\n").map((line) => JSON.parse(line));
  const packet = reservation
    ? validateHeldOutReservation(prepareHeldOutReservation(scenarios))
    : calibration
    ? validateCalibrationCohort(prepareCalibrationCohort(scenarios))
    : validateReviewSample(prepareReviewSample(scenarios));
  await writeFile(output, `${JSON.stringify(packet, null, 2)}\n`);
  console.log(JSON.stringify({
    output,
    record_count: packet.sample_count ?? packet.reserved_count,
    record_digest: packet.packet_digest ?? packet.reservation_digest,
  }, null, 2));
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  await main();
}
