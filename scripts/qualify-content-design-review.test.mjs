import { createHash } from "node:crypto";
import assert from "node:assert/strict";
import test from "node:test";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import { prepareReviewSample } from "./prepare-content-design-review-sample.mjs";
import { createReviewSubmissionTemplate, qualifyReviewSubmission, scoreContentDesignPredictions } from "./qualify-content-design-review.mjs";
import { governedContentDesignReviewerFixture } from "./content-design-reviewer-fixture.mjs";

function completedFixture() {
  const packet = prepareReviewSample(generateScenarios());
  const submission = createReviewSubmissionTemplate(packet);
  submission.reviewer = governedContentDesignReviewerFixture(packet.packet_digest);
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

function predictionSet(packet, records, predictionFor) {
  const predictions = records.map((record) => ({
    work_unit_id: record.work_unit_id,
    ...predictionFor(record),
    rationale_codes: ["test_fixture_judgment"],
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0",
    authority_effect: "none",
  }));
  const preimage = {
    contract_version: "contentmd.content-design-predictions/0.1.0",
    packet_digest: packet.packet_digest,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0",
    prediction_count: predictions.length,
    predictions,
    evaluation_status: "unscored_pending_qualified_gold",
    label_access: "blind_packet_only",
    authority_effect: "none",
  };
  return { ...preimage, prediction_set_digest: createHash("sha256").update(JSON.stringify(preimage)).digest("hex") };
}

function redigest(value, field = "gold_set_digest") {
  const preimage = structuredClone(value);
  delete preimage[field];
  value[field] = createHash("sha256").update(JSON.stringify(preimage)).digest("hex");
}

test("rejects incomplete review rather than creating synthetic gold", () => {
  const packet = prepareReviewSample(generateScenarios());
  const submission = createReviewSubmissionTemplate(packet);
  assert.throws(() => qualifyReviewSubmission(packet, submission), /invalid:envelope/);
});

test("rejects a parseable timestamp that is not RFC 3339", () => {
  const { packet, submission } = completedFixture();
  submission.reviewer.reviewed_at = "2026-09-14";
  assert.throws(() => qualifyReviewSubmission(packet, submission), /invalid:envelope/);
});

test("rejects a role string and self-attestation without governed qualification", () => {
  const { packet, submission } = completedFixture();
  delete submission.reviewer.qualification_bundle;
  assert.throws(() => qualifyReviewSubmission(packet, submission), /reviewer_qualification/);
});

test("rejects forged or differently scoped reviewer qualification", () => {
  const forged = completedFixture();
  forged.submission.reviewer = structuredClone(forged.submission.reviewer);
  forged.submission.reviewer.qualification_bundle.qualification.qualification_digest = "0".repeat(64);
  assert.throws(() => qualifyReviewSubmission(forged.packet, forged.submission), /reviewer_qualification/);

  const wrongScope = completedFixture();
  wrongScope.submission.reviewer = governedContentDesignReviewerFixture("0".repeat(64));
  assert.throws(() => qualifyReviewSubmission(wrongScope.packet, wrongScope.submission), /reviewer_qualification_scope/);
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
  const predictions = predictionSet(packet, gold.records, (record) => ({
      disposition: record.human_gold.disposition,
      hard_dimension_results: record.human_gold.hard_dimension_results,
      quality_dimension_scores: record.human_gold.quality_dimension_scores,
  }));
  const report = scoreContentDesignPredictions(gold, predictions);
  assert.equal(report.overall.disposition_exact_agreement, 1);
  assert.equal(report.overall.hard_dimension_accuracy, 1);
  assert.equal(report.overall.quality_score_mean_absolute_error, 0);
  assert.equal(report.release_threshold_diagnostics.approved_pass_count, 100);
  assert.equal(report.release_threshold_diagnostics.false_rejection_count, 0);
  assert.equal(report.release_threshold_diagnostics.false_rejection_rate, 0);
  assert.equal(report.release_threshold_diagnostics.benchmark_claim_eligibility, false);
  assert.equal(report.disposition_confusion.pass.pass, 100);
  for (const key of ["by_ability", "by_risk", "by_surface", "by_locale", "by_voice", "by_tone"]) {
    assert.ok(Object.keys(report[key]).length > 1);
  }
  const altered = structuredClone(predictions);
  altered.predictions[0].disposition = "revise";
  assert.throws(() => scoreContentDesignPredictions(gold, altered), /predictions_digest/);

  const alteredGold = structuredClone(gold);
  alteredGold.records[0].benchmark_eligibility = false;
  assert.throws(() => scoreContentDesignPredictions(alteredGold, predictions), /gold_digest/);

  const redigestedGold = structuredClone(alteredGold);
  redigest(redigestedGold);
  assert.throws(() => scoreContentDesignPredictions(redigestedGold, predictions), /gold_record|gold_shape/);

  const extraDimensionGold = structuredClone(gold);
  extraDimensionGold.records[0].human_gold.hard_dimension_results.injected_dimension = "pass";
  redigest(extraDimensionGold);
  assert.throws(() => scoreContentDesignPredictions(extraDimensionGold, predictions), /hard_dimensions/);
});

test("reports safety and routing failures without converting diagnostics into authority", () => {
  const { packet, submission } = completedFixture();
  const criticalIndex = packet.review_work_units.findIndex((unit) => unit.context.risk === "critical");
  submission.responses[criticalIndex].disposition = "revise";
  submission.responses[criticalIndex].hard_dimension_results.factual_accuracy = "fail";
  submission.responses[criticalIndex].recommended_revision = "State only the supported outcome.";
  submission.responses[1].disposition = "abstain";
  submission.responses[2].disposition = "escalate";
  const gold = qualifyReviewSubmission(packet, submission);
  const predictions = predictionSet(packet, gold.records, (record) => ({
      disposition: "pass",
      hard_dimension_results: Object.fromEntries(record.rubric.hard_dimensions.map((dimension) => [dimension, "pass"])),
      quality_dimension_scores: Object.fromEntries(record.rubric.quality_dimensions.map((dimension) => [dimension, 4])),
  }));
  const diagnostics = scoreContentDesignPredictions(gold, predictions).release_threshold_diagnostics;
  assert.equal(diagnostics.critical_false_acceptance_count, 1);
  assert.equal(diagnostics.abstention_recall, 0);
  assert.equal(diagnostics.escalation_recall, 0);
  assert.equal(diagnostics.benchmark_claim_eligibility, false);
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
