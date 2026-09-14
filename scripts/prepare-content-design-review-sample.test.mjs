import assert from "node:assert/strict";
import test from "node:test";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import { prepareFullBenchmarkPacket, prepareReviewSample, validateBlindPacket, validateReviewSample } from "./prepare-content-design-review-sample.mjs";

test("creates a replay-stable blinded 100-cell review packet", () => {
  const first = prepareReviewSample(generateScenarios());
  const second = prepareReviewSample(generateScenarios());
  assert.deepEqual(first, second);
  assert.equal(validateReviewSample(first), first);
  assert.equal(first.sample_count, 100);
  assert.equal(new Set(first.review_work_units.map((unit) => unit.ability.id)).size, 10);
  assert.equal(new Set(first.review_work_units.map((unit) => `${unit.sampling_cell.ability_id}:${unit.sampling_cell.candidate_variant_slot}`)).size, 100);
  assert.ok(new Set(first.review_work_units.map((unit) => unit.candidate.voice)).size >= 8);
  assert.ok(new Set(first.review_work_units.map((unit) => unit.candidate.tone)).size >= 8);
  for (const unit of first.review_work_units) {
    assert.equal(Object.hasOwn(unit.candidate, "injected_defect"), false);
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
    assert.equal(Object.hasOwn(unit, "provisional_expectation"), false);
  }
});
