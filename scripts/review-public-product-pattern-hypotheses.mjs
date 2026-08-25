import { createHash } from "node:crypto";

import {
  verifyPublicProductPatternHypothesis,
} from "./compile-public-product-pattern-hypotheses.mjs";
import { adjudicatePublicProductPatternReviewsV2 } from "../packages/research/dist/index.js";

export function adjudicatePublicProductPatternReviewsV2FromEvidence(input) {
  return adjudicatePublicProductPatternReviewsV2(input);
}

const REVIEW_DIMENSIONS = Object.freeze([
  "state_accuracy",
  "user_goal_alignment",
  "clarity",
  "actionable_recovery",
  "accessibility",
  "localization_transferability",
  "evidence_quality",
  "counterexample_coverage",
  "rights_abstraction",
]);

const REVIEW_OUTCOMES = Object.freeze([
  "approve_for_canonical_authoring",
  "hold_for_more_evidence",
  "reject",
]);

const RESULT_STATUSES = new Set(["pass", "fail", "insufficient"]);

function compareUnicodeScalar(left, right) {
  const leftPoints = [...String(left)].map((value) => value.codePointAt(0));
  const rightPoints = [...String(right)].map((value) => value.codePointAt(0));
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] - rightPoints[index];
  }
  return leftPoints.length - rightPoints.length;
}

function canonicalJson(value) {
  if (value === null || typeof value === "boolean" || typeof value === "string") {
    return JSON.stringify(value);
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("canonical_value");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`;
  if (typeof value !== "object" || Object.getPrototypeOf(value) !== Object.prototype) {
    invalid("canonical_value");
  }
  return `{${Object.keys(value)
    .sort(compareUnicodeScalar)
    .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
    .join(",")}}`;
}

function sha256Canonical(value) {
  return createHash("sha256").update(`${canonicalJson(value)}\n`, "utf8").digest("hex");
}

function exactKeys(value, expected) {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const actual = Object.keys(value).sort(compareUnicodeScalar);
  const wanted = [...expected].sort(compareUnicodeScalar);
  return actual.length === wanted.length
    && actual.every((key, index) => key === wanted[index]);
}

function invalid(code) {
  throw new TypeError(`pattern_review_invalid:${code}`);
}

function nonemptyText(value, code) {
  if (typeof value !== "string" || value.trim() === "") invalid(code);
  for (const point of value) {
    const scalar = point.codePointAt(0);
    if (scalar >= 0xD800 && scalar <= 0xDFFF) invalid(code);
  }
  return value;
}

function canonicalClone(value) {
  return JSON.parse(canonicalJson(value));
}

function deepFreeze(value, seen = new Set()) {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const child of Object.values(value)) deepFreeze(child, seen);
  return Object.freeze(value);
}

function hypothesisRef(hypothesis) {
  return {
    hypothesis_id: hypothesis.hypothesis_id,
    hypothesis_digest: hypothesis.hypothesis_digest,
  };
}

function assertHypothesis(hypothesis) {
  if (!verifyPublicProductPatternHypothesis(hypothesis)) invalid("hypothesis_integrity");
}

function assertHypothesisReport(report) {
  if (!exactKeys(report, [
    "authority_effect", "benchmark_eligibility", "contract_version", "corpus_status",
    "counts", "hypotheses", "promotion_eligibility", "prompt_eligibility", "thresholds",
    "training_eligibility",
  ])
    || report.contract_version !== "contentmd.public-product-pattern-hypothesis-report/0.1.0"
    || !["pass", "fail"].includes(report.corpus_status)
    || report.authority_effect !== "none"
    || report.prompt_eligibility !== "never"
    || report.training_eligibility !== "never"
    || report.benchmark_eligibility !== false
    || report.promotion_eligibility !== false
    || !Array.isArray(report.hypotheses)
    || report.hypotheses.length !== report.counts?.hypotheses) {
    invalid("hypothesis_report");
  }
  for (const hypothesis of report.hypotheses) assertHypothesis(hypothesis);
}

export function createPublicProductPatternReviewQueue(report) {
  assertHypothesisReport(report);
  const tasks = report.hypotheses
    .map((hypothesis) => {
      const ref = hypothesisRef(hypothesis);
      const identity = {
        contract_version: "contentmd.public-product-pattern-review-task-identity/0.1.0",
        hypothesis_ref: ref,
      };
      const preimage = {
        contract_version: "contentmd.public-product-pattern-review-task/0.1.0",
        review_task_id: `public-product-pattern-review.${sha256Canonical(identity)}`,
        hypothesis_ref: ref,
        structural_signature: canonicalClone(hypothesis.structural_signature),
        support: {
          company_count: hypothesis.support.company_count,
          product_count: hypothesis.support.product_count,
          industry_count: hypothesis.support.industry_count,
          evidence_ref_count: hypothesis.support.evidence_refs.length,
        },
        rubric_dimensions: [...REVIEW_DIMENSIONS],
        minimum_independent_reviewers: 2,
        required_reviewer_qualification: "qualified_content_designer",
        allowed_outcomes: [...REVIEW_OUTCOMES],
        review_state: "unreviewed",
        authority_effect: "none",
        prompt_eligibility: "never",
        training_eligibility: "never",
        benchmark_eligibility: false,
        promotion_eligibility: false,
      };
      return { ...preimage, review_task_digest: sha256Canonical(preimage) };
    })
    .sort((left, right) => compareUnicodeScalar(left.review_task_id, right.review_task_id));
  const preimage = {
    contract_version: "contentmd.public-product-pattern-review-queue/0.1.0",
    source_report_contract_version: report.contract_version,
    source_corpus_status: report.corpus_status,
    tasks,
    decision_state: "review_queue",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
    promotion_eligibility: false,
  };
  return deepFreeze({ ...preimage, queue_digest: sha256Canonical(preimage) });
}

function assertDimensionResults(results) {
  if (!Array.isArray(results) || results.length !== REVIEW_DIMENSIONS.length) {
    invalid("dimension_results");
  }
  for (const [index, result] of results.entries()) {
    if (!exactKeys(result, ["dimension", "status"])
      || result.dimension !== REVIEW_DIMENSIONS[index]
      || !RESULT_STATUSES.has(result.status)) invalid("dimension_results");
  }
}

export function createPublicProductPatternReview({
  hypothesis,
  reviewerId,
  reviewerQualification,
  dimensionResults,
  recommendation,
}) {
  assertHypothesis(hypothesis);
  nonemptyText(reviewerId, "reviewer_id");
  if (reviewerQualification !== "qualified_content_designer") {
    invalid("reviewer_qualification");
  }
  assertDimensionResults(dimensionResults);
  if (!REVIEW_OUTCOMES.includes(recommendation)) invalid("recommendation");
  const ref = hypothesisRef(hypothesis);
  const identity = {
    contract_version: "contentmd.public-product-pattern-human-review-identity/0.1.0",
    hypothesis_ref: ref,
    reviewer_id: reviewerId,
  };
  const preimage = {
    contract_version: "contentmd.public-product-pattern-human-review/0.1.0",
    review_id: `public-product-pattern-human-review.${sha256Canonical(identity)}`,
    hypothesis_ref: ref,
    reviewer_id: reviewerId,
    reviewer_qualification: reviewerQualification,
    dimension_results: canonicalClone(dimensionResults),
    recommendation,
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return deepFreeze({ ...preimage, review_digest: sha256Canonical(preimage) });
}

function assertReview(review, hypothesis) {
  if (!exactKeys(review, [
    "authority_effect", "benchmark_eligibility", "contract_version", "dimension_results",
    "hypothesis_ref", "prompt_eligibility", "recommendation", "review_digest", "review_id",
    "reviewer_id", "reviewer_qualification", "training_eligibility",
  ])) invalid("review_integrity");
  let replayed;
  try {
    replayed = createPublicProductPatternReview({
      hypothesis,
      reviewerId: review.reviewer_id,
      reviewerQualification: review.reviewer_qualification,
      dimensionResults: review.dimension_results,
      recommendation: review.recommendation,
    });
  } catch {
    invalid("review_integrity");
  }
  if (canonicalJson(review) !== canonicalJson(replayed)) invalid("review_integrity");
}

export function adjudicatePublicProductPatternReviews({ hypothesis, reviews }) {
  assertHypothesis(hypothesis);
  if (!Array.isArray(reviews)) invalid("reviews");
  const reviewers = new Set();
  for (const review of reviews) {
    assertReview(review, hypothesis);
    if (reviewers.has(review.reviewer_id)) invalid("duplicate_reviewer");
    reviewers.add(review.reviewer_id);
  }
  const anyFailure = reviews.some((review) => (
    review.recommendation === "reject"
      || review.dimension_results.some((result) => result.status === "fail")
  ));
  const unanimouslyReady = reviews.length >= 2 && reviews.every((review) => (
    review.recommendation === "approve_for_canonical_authoring"
      && review.dimension_results.every((result) => result.status === "pass")
  ));
  const decisionState = anyFailure
    ? "rejected"
    : unanimouslyReady
      ? "ready_for_canonical_authoring"
      : "hold_for_more_evidence";
  const reviewRefs = reviews
    .map((review) => ({ review_id: review.review_id, review_digest: review.review_digest }))
    .sort((left, right) => compareUnicodeScalar(left.review_id, right.review_id));
  const preimage = {
    contract_version: "contentmd.public-product-pattern-review-adjudication/0.1.0",
    hypothesis_ref: hypothesisRef(hypothesis),
    review_refs: reviewRefs,
    decision_state: decisionState,
    canonical_pattern_authoring_required: decisionState === "ready_for_canonical_authoring",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
    promotion_eligibility: false,
  };
  return deepFreeze({ ...preimage, adjudication_digest: sha256Canonical(preimage) });
}
