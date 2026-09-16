import assert from "node:assert/strict";
import test from "node:test";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import { prepareReviewSample } from "./prepare-content-design-review-sample.mjs";
import { predictContentDesignPacket } from "./predict-content-design-scenarios.mjs";

test("produces replay-stable predictions from the blind packet only", () => {
  const packet = prepareReviewSample(generateScenarios());
  const first = predictContentDesignPacket(packet);
  const second = predictContentDesignPacket(structuredClone(packet));
  assert.deepEqual(first, second);
  assert.equal(first.prediction_count, 100);
  assert.equal(first.packet_digest, packet.packet_digest);
  assert.equal(first.label_access, "blind_packet_only");
  assert.equal(first.evaluation_status, "unscored_pending_qualified_gold");
  assert.equal(first.predictions.every((prediction) => prediction.authority_effect === "none"), true);
});

test("detects pass, abstention, state, pressure, blame, and locale boundaries without hidden labels", () => {
  const packet = prepareReviewSample(generateScenarios());
  const result = predictContentDesignPacket(packet);
  const byId = new Map(result.predictions.map((prediction) => [prediction.work_unit_id, prediction]));
  for (const unit of packet.review_work_units) {
    const prediction = byId.get(unit.work_unit_id);
    assert.ok(prediction);
    assert.equal(Object.hasOwn(prediction, "injected_defect"), false);
    assert.equal(Object.hasOwn(prediction, "provisional_expectation"), false);
    assert.equal(Object.hasOwn(unit.candidate, "voice"), false);
    assert.equal(Object.hasOwn(unit.candidate, "tone"), false);
    if (unit.context.evidence.material_fact_status === "missing") assert.equal(prediction.disposition, "abstain");
    if (/act now|don't miss out/iu.test(unit.candidate.text)) assert.equal(prediction.disposition, "revise");
    if (/you caused this/iu.test(unit.candidate.text)) assert.equal(prediction.disposition, "revise");
    if (unit.context.target_locale !== "en-US"
      && unit.context.evidence.material_fact_status !== "missing"
      && !Object.values(prediction.hard_dimension_results).includes("fail")) {
      assert.equal(prediction.disposition, "escalate");
    }
  }
  assert.ok(result.predictions.some((prediction) => prediction.disposition === "pass"));
  assert.ok(result.predictions.some((prediction) => prediction.disposition === "abstain"));
  for (const prediction of result.predictions.filter((candidate) => candidate.disposition === "pass")) {
    assert.equal(Object.values(prediction.hard_dimension_results).every((value) => value === "pass" || value === "not_applicable"), true);
  }
});
