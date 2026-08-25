import assert from "node:assert/strict";
import test from "node:test";

import {
  compilePublicProductPatternHypotheses,
} from "./compile-public-product-pattern-hypotheses.mjs";
import {
  adjudicatePublicProductPatternReviews,
  createPublicProductPatternReview,
  createPublicProductPatternReviewQueue,
} from "./review-public-product-pattern-hypotheses.mjs";

const DIMENSIONS = [
  "state_accuracy",
  "user_goal_alignment",
  "clarity",
  "actionable_recovery",
  "accessibility",
  "localization_transferability",
  "evidence_quality",
  "counterexample_coverage",
  "rights_abstraction",
];

function hypothesisFixture() {
  const sources = [];
  const observations = [];
  for (const [index, industry] of ["finance", "healthcare", "public_services"].entries()) {
    const suffix = String(index + 1);
    sources.push({
      source_id: `source.${suffix}`,
      company: `Organization ${suffix}`,
      product_system: `Service ${suffix}`,
      source_class: "actual UI",
    });
    observations.push({
      observation_id: `observation.${suffix}`,
      source_id: `source.${suffix}`,
      company: `Organization ${suffix}`,
      product_system: `Service ${suffix}`,
      normalized_industry_id: industry,
      journey: "account recovery",
      event_state: "identity verification required",
      content_slot_type: "recovery guidance",
      surface_channel: "web",
      exact_wording_span: `Do not retain this source wording ${suffix}`,
      direct_ui: true,
    });
  }
  return compilePublicProductPatternHypotheses({
    corpusStatus: "pass",
    sources,
    observations,
    thresholds: {
      minSupportCompanies: 3,
      minSupportProducts: 3,
      minSupportIndustries: 3,
      minDirectStatesPerProduct: 1,
    },
  });
}

function passingResults() {
  return DIMENSIONS.map((dimension) => ({ dimension, status: "pass" }));
}

test("creates a deterministic quality-review queue without source wording or product identities", () => {
  const report = hypothesisFixture();
  const queue = createPublicProductPatternReviewQueue(report);
  assert.equal(queue.tasks.length, 1);
  assert.deepEqual(queue.tasks[0].rubric_dimensions, DIMENSIONS);
  assert.deepEqual(queue.tasks[0].allowed_outcomes, [
    "approve_for_canonical_authoring",
    "hold_for_more_evidence",
    "reject",
  ]);
  assert.equal(queue.tasks[0].minimum_independent_reviewers, 2);
  assert.equal(queue.tasks[0].review_state, "unreviewed");
  assert.equal(queue.authority_effect, "none");
  assert.equal(queue.prompt_eligibility, "never");
  assert.equal(queue.training_eligibility, "never");
  assert.equal(queue.benchmark_eligibility, false);
  assert.equal(queue.promotion_eligibility, false);
  const serialized = JSON.stringify(queue);
  assert.equal(serialized.includes("Do not retain this source wording"), false);
  assert.equal(serialized.includes("Organization 1"), false);
  assert.equal(serialized.includes("Service 1"), false);
  assert.deepEqual(createPublicProductPatternReviewQueue(report), queue);
});

test("rejects a tampered hypothesis before creating a review task", () => {
  const report = structuredClone(hypothesisFixture());
  report.hypotheses[0].structural_signature.journey = "tampered journey";
  assert.throws(
    () => createPublicProductPatternReviewQueue(report),
    /pattern_review_invalid:hypothesis_integrity/u,
  );
});

test("requires two independent qualified reviewers before canonical authoring is ready", () => {
  const hypothesis = hypothesisFixture().hypotheses[0];
  const first = createPublicProductPatternReview({
    hypothesis,
    reviewerId: "reviewer.alpha",
    reviewerQualification: "qualified_content_designer",
    dimensionResults: passingResults(),
    recommendation: "approve_for_canonical_authoring",
  });
  const held = adjudicatePublicProductPatternReviews({ hypothesis, reviews: [first] });
  assert.equal(held.decision_state, "hold_for_more_evidence");

  const second = createPublicProductPatternReview({
    hypothesis,
    reviewerId: "reviewer.beta",
    reviewerQualification: "qualified_content_designer",
    dimensionResults: passingResults(),
    recommendation: "approve_for_canonical_authoring",
  });
  const ready = adjudicatePublicProductPatternReviews({
    hypothesis,
    reviews: [second, first],
  });
  assert.equal(ready.decision_state, "ready_for_canonical_authoring");
  assert.equal(ready.canonical_pattern_authoring_required, true);
  assert.equal(ready.authority_effect, "none");
  assert.equal(ready.prompt_eligibility, "never");
  assert.equal(ready.training_eligibility, "never");
  assert.equal(ready.benchmark_eligibility, false);
  assert.equal(ready.promotion_eligibility, false);
  assert.deepEqual(
    ready.review_refs.map((ref) => ref.review_id),
    [first.review_id, second.review_id].sort(),
  );
});

test("holds insufficient evidence and rejects a failed quality dimension", () => {
  const hypothesis = hypothesisFixture().hypotheses[0];
  const insufficient = createPublicProductPatternReview({
    hypothesis,
    reviewerId: "reviewer.alpha",
    reviewerQualification: "qualified_content_designer",
    dimensionResults: DIMENSIONS.map((dimension) => ({
      dimension,
      status: dimension === "evidence_quality" ? "insufficient" : "pass",
    })),
    recommendation: "hold_for_more_evidence",
  });
  const failed = createPublicProductPatternReview({
    hypothesis,
    reviewerId: "reviewer.beta",
    reviewerQualification: "qualified_content_designer",
    dimensionResults: DIMENSIONS.map((dimension) => ({
      dimension,
      status: dimension === "actionable_recovery" ? "fail" : "pass",
    })),
    recommendation: "reject",
  });
  assert.equal(
    adjudicatePublicProductPatternReviews({ hypothesis, reviews: [insufficient] })
      .decision_state,
    "hold_for_more_evidence",
  );
  assert.equal(
    adjudicatePublicProductPatternReviews({ hypothesis, reviews: [insufficient, failed] })
      .decision_state,
    "rejected",
  );
});

test("rejects duplicate reviewers and review tampering", () => {
  const hypothesis = hypothesisFixture().hypotheses[0];
  const review = createPublicProductPatternReview({
    hypothesis,
    reviewerId: "reviewer.alpha",
    reviewerQualification: "qualified_content_designer",
    dimensionResults: passingResults(),
    recommendation: "approve_for_canonical_authoring",
  });
  assert.throws(
    () => adjudicatePublicProductPatternReviews({ hypothesis, reviews: [review, review] }),
    /pattern_review_invalid:duplicate_reviewer/u,
  );
  const tampered = structuredClone(review);
  tampered.recommendation = "reject";
  assert.throws(
    () => adjudicatePublicProductPatternReviews({ hypothesis, reviews: [tampered] }),
    /pattern_review_invalid:review_integrity/u,
  );
});
