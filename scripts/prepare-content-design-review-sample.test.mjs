import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import {
  prepareCalibrationCohort,
  prepareFullBenchmarkPacket,
  prepareHeldOutReservation,
  prepareReviewSample,
  validateBlindPacket,
  validateCalibrationCohort,
  validateHeldOutReservation,
  validateReviewSample,
} from "./prepare-content-design-review-sample.mjs";

test("creates a replay-stable blinded 100-cell review packet", () => {
  const first = prepareReviewSample(generateScenarios());
  const second = prepareReviewSample(generateScenarios());
  assert.deepEqual(first, second);
  assert.equal(validateReviewSample(first), first);
  assert.equal(first.sample_count, 100);
  assert.equal(new Set(first.review_work_units.map((unit) => unit.ability.id)).size, 10);
  assert.equal(new Set(first.review_work_units.map((unit) => `${unit.sampling_cell.ability_id}:${unit.sampling_cell.candidate_variant_slot}`)).size, 100);
  assert.ok(new Set(first.review_work_units.map((unit) => unit.context.voice_profile)).size >= 3);
  assert.ok(new Set(first.review_work_units.map((unit) => unit.context.situational_tone)).size >= 3);
  for (const unit of first.review_work_units) {
    assert.equal(Object.hasOwn(unit.candidate, "injected_defect"), false);
    assert.equal(Object.hasOwn(unit.candidate, "variant"), false);
    assert.equal(Object.hasOwn(unit.candidate, "voice"), false);
    assert.equal(Object.hasOwn(unit.candidate, "tone"), false);
    assert.equal(Object.hasOwn(unit, "evaluation_control"), false);
    assert.equal(Object.hasOwn(unit, "provisional_expectation"), false);
    assert.equal(unit.reviewer_response.disposition, null);
    assert.equal(unit.training_eligibility, "never");
  }
});

test("rejects label leakage and digest drift", () => {
  const packet = prepareReviewSample(generateScenarios());
  const leaked = structuredClone(packet);
  leaked.review_work_units[0].candidate.injected_defect = "hidden_answer";
  assert.throws(() => validateReviewSample(leaked), /digest|unblinded_label/);
  const drifted = structuredClone(packet);
  drifted.review_work_units[0].candidate.text = "Changed after sampling";
  assert.throws(() => validateReviewSample(drifted), /digest/);
});

test("creates a fully blinded packet for all 10,000 scenarios", () => {
  const packet = prepareFullBenchmarkPacket(generateScenarios());
  assert.equal(validateBlindPacket(packet, 10_000), packet);
  assert.equal(packet.sample_count, 10_000);
  assert.equal(packet.sampling_method, "complete_deterministic_10000_scenario_matrix");
  assert.equal(new Set(packet.review_work_units.map((unit) => unit.scenario_ref.scenario_id)).size, 10_000);
  for (const unit of packet.review_work_units) {
    assert.equal(Object.hasOwn(unit.candidate, "injected_defect"), false);
    assert.equal(Object.hasOwn(unit.candidate, "variant"), false);
    assert.equal(Object.hasOwn(unit.candidate, "voice"), false);
    assert.equal(Object.hasOwn(unit.candidate, "tone"), false);
    assert.equal(Object.hasOwn(unit, "evaluation_control"), false);
    assert.equal(Object.hasOwn(unit, "provisional_expectation"), false);
  }
});

test("creates a replay-stable 500-item calibration cohort with five contexts per cell", () => {
  const first = prepareCalibrationCohort(generateScenarios());
  const second = prepareCalibrationCohort(generateScenarios());
  assert.deepEqual(first, second);
  assert.equal(validateCalibrationCohort(first), first);
  assert.equal(first.sample_count, 500);
  assert.equal(new Set(first.review_work_units.map((unit) => unit.scenario_ref.scenario_id)).size, 500);
  assert.equal(new Set(first.review_work_units.map((unit) => [
    unit.sampling_cell.ability_id,
    unit.sampling_cell.candidate_variant_slot,
    unit.sampling_cell.calibration_context_slot,
  ].join(":"))).size, 500);
  for (const ability of new Set(first.review_work_units.map((unit) => unit.ability.id))) {
    const units = first.review_work_units.filter((unit) => unit.ability.id === ability);
    assert.equal(units.length, 50);
    assert.equal(new Set(units.map((unit) => unit.context.situation)).size, 10);
    assert.equal(new Set(units.map((unit) => unit.context.surface)).size, 10);
    assert.equal(new Set(units.map((unit) => unit.context.target_locale)).size, 10);
  }
});

test("keeps the committed 500-item calibration cohort in generator parity", async () => {
  const committed = JSON.parse(await readFile(
    "docs/tests/fixtures/content-design-scenarios/calibration-cohort-500.json",
    "utf8",
  ));
  assert.deepEqual(committed, prepareCalibrationCohort(generateScenarios()));
  assert.equal(validateCalibrationCohort(committed), committed);
});

test("reserves a disjoint unopened 500-item evaluation cohort", async () => {
  const scenarios = generateScenarios();
  const calibration = prepareCalibrationCohort(scenarios);
  const reservation = prepareHeldOutReservation(scenarios);
  assert.equal(validateHeldOutReservation(reservation), reservation);
  assert.equal(new Set(reservation.scenario_refs.map((ref) => ref.scenario_id)).size, 500);
  const calibrationIds = new Set(calibration.review_work_units.map((unit) => unit.scenario_ref.scenario_id));
  assert.equal(reservation.scenario_refs.some((ref) => calibrationIds.has(ref.scenario_id)), false);
  for (const ability of new Set(reservation.scenario_refs.map((ref) => ref.ability_id))) {
    const refs = reservation.scenario_refs.filter((ref) => ref.ability_id === ability);
    assert.equal(refs.length, 50);
    assert.equal(new Set(refs.map((ref) => ref.candidate_variant_slot)).size, 10);
    assert.equal(new Set(refs.map((ref) => ref.reserved_context_slot)).size, 5);
  }
  const committed = JSON.parse(await readFile(
    "docs/tests/fixtures/content-design-scenarios/held-out-reservation-500.json",
    "utf8",
  ));
  assert.deepEqual(committed, reservation);
  const exposed = structuredClone(reservation);
  exposed.scenario_refs[0].candidate_text = "hidden evaluation content";
  exposed.reservation_digest = "0".repeat(64);
  assert.throws(() => validateHeldOutReservation(exposed), /envelope|scenario_ref|digest/);
});
