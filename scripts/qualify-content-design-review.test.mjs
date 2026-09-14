import assert from "node:assert/strict";
import test from "node:test";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import { prepareReviewSample } from "./prepare-content-design-review-sample.mjs";
import { createReviewSubmissionTemplate, qualifyReviewSubmission, scoreContentDesignPredictions } from "./qualify-content-design-review.mjs";

function completedFixture() {
  const packet = prepareReviewSample(generateScenarios());
  const submission = createReviewSubmissionTemplate(packet);
  submission.reviewer = {
    reviewer_id: "reviewer.fixture",
    reviewer_role: "qualified_content_designer",
    reviewed_at: "2026-09-14T12:00:00.000Z",
    independent_review_attested: true,
  };
  submission.submission_state = "complete";
  for (const response of submission.responses) {
    response.disposition = "pass";
    response.hard_dimension_results = Object.fromEntries(Object.keys(response.hard_dimension_results).map((dimension) => [dimension, "pass"]));
    response.quality_dimension_scores = Object.fromEntries(Object.keys(response.quality_dimension_scores).map((dimension) => [dimension, 4]));
    response.rationale = "Fixture review establishes a complete meaning-based judgment.";
    response.acceptable_meaning_invariants = ["Preserve the supported product state"];
    response.review_evidence_refs = ["review.fixture.session"];
  }
  return { packet, submission };
}

test("rejects incomplete review rather than creating synthetic gold", () => {
  const packet = prepareReviewSample(generateScenarios());
  const submission = createReviewSubmissionTemplate(packet);
  assert.throws(() => qualifyReviewSubmission(packet, submission), /invalid:envelope/);
});

test("qualifies a complete review for benchmarking only", () => {
  const { packet, submission } = completedFixture();
  const gold = qualifyReviewSubmission(packet, submission);
  assert.equal(gold.qualified_count, 100);
  assert.equal(gold.benchmark_eligibility, true);
  assert.equal(gold.retrieval_eligibility, "never");
  assert.equal(gold.training_eligibility, "never");
  assert.equal(gold.records.every((record) => record.review_state === "qualified"), true);
});

test("scores exact agreement and reports every required slice", () => {
  const { packet, submission } = completedFixture();
  const gold = qualifyReviewSubmission(packet, submission);
  const predictions = {
    contract_version: "contentmd.content-design-predictions/0.1.0",
    packet_digest: packet.packet_digest,
    evaluation_status: "unscored_pending_qualified_gold",
    predictions: gold.records.map((record) => ({
      work_unit_id: record.work_unit_id,
      disposition: record.human_gold.disposition,
      hard_dimension_results: record.human_gold.hard_dimension_results,
      quality_dimension_scores: record.human_gold.quality_dimension_scores,
    })),
    authority_effect: "none",
  };
  const report = scoreContentDesignPredictions(gold, predictions);
  assert.equal(report.overall.disposition_exact_agreement, 1);
  assert.equal(report.overall.hard_dimension_accuracy, 1);
  assert.equal(report.overall.quality_score_mean_absolute_error, 0);
  for (const key of ["by_ability", "by_risk", "by_surface", "by_locale", "by_voice", "by_tone"]) {
    assert.ok(Object.keys(report[key]).length > 1);
  }
});

test("rejects predictions that do not bind to the exact gold set", () => {
  const { packet, submission } = completedFixture();
  const gold = qualifyReviewSubmission(packet, submission);
  assert.throws(() => scoreContentDesignPredictions(gold, {
    contract_version: "contentmd.content-design-predictions/0.1.0",
    packet_digest: "wrong",
    evaluation_status: "unscored_pending_qualified_gold",
    predictions: [],
    authority_effect: "none",
  }), /predictions_envelope/);
});
