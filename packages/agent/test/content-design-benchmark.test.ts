import { createHash } from "node:crypto";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  compareContentDesignGoldSets,
  createContentDesignReviewSubmissionTemplate,
  predictContentDesignBenchmark,
  predictLocalContentDesignBenchmark,
  qualifyContentDesignReview,
  scoreContentDesignBenchmark,
  scoreLocalContentDesignBenchmark,
  writeBuiltinContentDesignReviewPacket,
} from "@contentmd/agent";
import { governedContentDesignReviewerFixture } from "../../../scripts/content-design-reviewer-fixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));

function redigest(value: Record<string, unknown>, digestField = "packet_digest"): void {
  const preimage = structuredClone(value);
  delete preimage[digestField];
  value[digestField] = createHash("sha256").update(JSON.stringify(preimage)).digest("hex");
}

describe("content-design benchmark", () => {
  it("reproduces the committed blinded baseline without hidden labels", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const expected = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/contentmd-baseline-predictions.json"), "utf8"));
    const result = predictContentDesignBenchmark(packet);
    expect(result).toEqual(expected);
    expect(result.prediction_count).toBe(100);
    expect(result.evaluation_status).toBe("unscored_pending_qualified_gold");
    expect(result.label_access).toBe("blind_packet_only");
    expect(result.predictions.some((prediction) => prediction.disposition === "pass")).toBe(true);
    expect(result.predictions.some((prediction) => prediction.disposition === "abstain")).toBe(true);
    for (const prediction of result.predictions.filter((candidate) => candidate.disposition === "pass")) {
      expect(Object.values(prediction.hard_dimension_results).every((value) => value === "pass" || value === "not_applicable")).toBe(true);
    }
  });

  it("rejects redigested malformed or label-leaking packets", async () => {
    const source = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const leaked = structuredClone(source);
    leaked.review_work_units[0].candidate.voice = "accusatory";
    redigest(leaked);
    expect(() => predictContentDesignBenchmark(leaked)).toThrow("content_design_benchmark_invalid:packet_shape");
    const malformed = structuredClone(source);
    delete malformed.review_work_units[0].context.evidence;
    redigest(malformed);
    expect(() => predictContentDesignBenchmark(malformed)).toThrow("content_design_benchmark_invalid:packet_shape");
  });

  it("reproduces the committed independent-review response template", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const expected = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-submission-template.json"), "utf8"));
    expect(createContentDesignReviewSubmissionTemplate(packet)).toEqual(expected);
  });

  it("refuses to overwrite an existing prediction file", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-agent-"));
    const output = join(directory, "existing.json");
    await writeFile(output, "preserve me");
    try {
      await expect(predictLocalContentDesignBenchmark(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), output))
        .rejects.toThrow(/EEXIST/);
      expect(await readFile(output, "utf8")).toBe("preserve me");
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("writes the built-in blinded review sample and refuses to overwrite it", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-sample-"));
    const output = join(directory, "review-sample-100.json");
    try {
      const packet = await writeBuiltinContentDesignReviewPacket(output);
      expect(packet.sample_count).toBe(100);
      expect(packet.packet_digest).toBe("99810c8924715b8e10aa04e3f49e3e804b59e4154c538f4a2da15c825f4a3d2b");
      await expect(writeBuiltinContentDesignReviewPacket(output)).rejects.toThrow(/EEXIST/);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("qualifies complete independent review for benchmarking only and scores bound predictions", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const submission = createContentDesignReviewSubmissionTemplate(packet) as unknown as Record<string, unknown> & { reviewer: Record<string, unknown>; responses: Array<Record<string, unknown>> };
    submission.reviewer = governedContentDesignReviewerFixture(packet.packet_digest);
    submission.submission_state = "complete";
    for (const response of submission.responses) {
      response.disposition = "human_preference_review";
      response.hard_dimension_results = Object.fromEntries(Object.keys(response.hard_dimension_results as object).map((dimension) => [dimension, "pass"]));
      response.quality_dimension_scores = Object.fromEntries(Object.keys(response.quality_dimension_scores as object).map((dimension) => [dimension, 3]));
      response.rationale = "Independent fixture review records a complete meaning-based judgment.";
      response.acceptable_meaning_invariants = ["Preserve the supported product state"];
      response.recommended_revision = null;
      response.review_evidence_refs = ["review.fixture.session"];
    }
    const gold = qualifyContentDesignReview(packet, submission);
    expect(gold.qualified_count).toBe(100);
    expect(gold.benchmark_eligibility).toBe(true);
    expect(gold.retrieval_eligibility).toBe("never");
    expect(gold.training_eligibility).toBe("never");
    const report = scoreContentDesignBenchmark(gold, predictContentDesignBenchmark(packet));
    expect(report.overall.count).toBe(100);
    expect(Object.keys(report.by_ability)).toHaveLength(10);
    expect(report.contract_version).toBe("contentmd.content-design-evaluation-report/0.2.0");
    expect(report.release_threshold_diagnostics.benchmark_claim_eligibility).toBe(false);
    expect(report.disposition_confusion.human_preference_review.human_preference_review).toBeGreaterThan(0);
    expect(report.authority_effect).toBe("none");

    const alteredGold = structuredClone(gold) as unknown as Record<string, unknown> & { records: Array<Record<string, unknown>> };
    alteredGold.records[0].benchmark_eligibility = false;
    expect(() => scoreContentDesignBenchmark(alteredGold, predictContentDesignBenchmark(packet)))
      .toThrow("qualification_review_incomplete:content_design:gold_digest");

    const redigestedGold = structuredClone(alteredGold);
    redigest(redigestedGold, "gold_set_digest");
    expect(() => scoreContentDesignBenchmark(redigestedGold, predictContentDesignBenchmark(packet)))
      .toThrow(/gold_record|gold_shape/);

    const extraDimensionGold = structuredClone(gold) as unknown as Record<string, unknown> & { records: Array<{ human_gold: { hard_dimension_results: Record<string, unknown> } }> };
    extraDimensionGold.records[0].human_gold.hard_dimension_results.injected_dimension = "pass";
    redigest(extraDimensionGold, "gold_set_digest");
    expect(() => scoreContentDesignBenchmark(extraDimensionGold, predictContentDesignBenchmark(packet)))
      .toThrow(/hard_dimensions/);

    const altered = structuredClone(predictContentDesignBenchmark(packet)) as unknown as Record<string, unknown> & { predictions: Array<Record<string, unknown>> };
    const reviseIndex = altered.predictions.findIndex((prediction) => prediction.disposition === "revise");
    expect(reviseIndex).toBeGreaterThanOrEqual(0);
    altered.predictions[reviseIndex].disposition = "pass";
    expect(() => scoreContentDesignBenchmark(gold, altered)).toThrow("qualification_review_incomplete:content_design:predictions_digest");

    const redigested = structuredClone(altered);
    redigest(redigested, "prediction_set_digest");
    expect(() => scoreContentDesignBenchmark(gold, redigested)).toThrow(/prediction_pass_unresolved|prediction_shape/);
  });

  it("compares two independent reviews and preserves disagreements for adjudication", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const complete = (reviewerId: string) => {
      const submission = createContentDesignReviewSubmissionTemplate(packet) as unknown as Record<string, unknown> & { reviewer: Record<string, unknown>; responses: Array<Record<string, unknown>> };
      submission.reviewer = governedContentDesignReviewerFixture(packet.packet_digest, { reviewerId });
      submission.submission_state = "complete";
      for (const response of submission.responses) {
        response.disposition = "pass";
        response.hard_dimension_results = Object.fromEntries(Object.keys(response.hard_dimension_results as object).map((dimension) => [dimension, "pass"]));
        response.quality_dimension_scores = Object.fromEntries(Object.keys(response.quality_dimension_scores as object).map((dimension) => [dimension, 4]));
        response.rationale = "Independent fixture review records a complete meaning-based judgment.";
        response.acceptable_meaning_invariants = ["Preserve the supported product state"];
        response.recommended_revision = null;
        response.review_evidence_refs = [`review.fixture.${reviewerId}`];
      }
      return submission;
    };
    const left = qualifyContentDesignReview(packet, complete("reviewer.fixture.a"));
    const rightSubmission = complete("reviewer.fixture.b");
    rightSubmission.responses[0].disposition = "revise";
    rightSubmission.responses[0].recommended_revision = "State the supported outcome and next step.";
    rightSubmission.responses[0].hard_dimension_results.factual_accuracy = "fail";
    rightSubmission.responses[0].quality_dimension_scores.clarity = 2;
    const right = qualifyContentDesignReview(packet, rightSubmission);
    const report = compareContentDesignGoldSets(left, right);
    expect(report.record_count).toBe(100);
    expect(report.disposition_exact_agreement).toBe(0.99);
    expect(report.hard_dimension_exact_agreement).toBeLessThan(1);
    expect(report.quality_score_mean_absolute_difference).toBeGreaterThan(0);
    expect(report.disagreement_count).toBe(1);
    expect(report.disagreements[0]).toMatchObject({
      work_unit_id: left.records[0].work_unit_id,
      left_disposition: "pass",
      right_disposition: "revise",
      hard_dimension_disagreements: ["factual_accuracy"],
    });
    expect(report.calibration_status).toBe("agreement_measured_adjudication_required");
    expect(report.adjudication_required).toBe(true);
    expect(report.benchmark_claim_eligibility).toBe(false);
    expect(report.authority_effect).toBe("none");
    expect(() => compareContentDesignGoldSets(left, left)).toThrow("calibration_reviewer_independence");

    const altered = structuredClone(right) as unknown as Record<string, unknown> & { records: Array<Record<string, unknown>> };
    altered.records[0].context = { changed: true };
    redigest(altered, "gold_set_digest");
    expect(() => compareContentDesignGoldSets(left, altered)).toThrow(/gold_record|calibration_record_binding/);
  });

  it("rejects caller-redigested gold whose scenario context differs from the blind packet", async () => {
    const packetValue = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const submission = createContentDesignReviewSubmissionTemplate(packetValue) as unknown as Record<string, unknown> & { reviewer: Record<string, unknown>; responses: Array<Record<string, unknown>> };
    submission.reviewer = governedContentDesignReviewerFixture(packetValue.packet_digest);
    submission.submission_state = "complete";
    for (const response of submission.responses) {
      response.disposition = "pass";
      response.hard_dimension_results = Object.fromEntries(Object.keys(response.hard_dimension_results as object).map((dimension) => [dimension, "pass"]));
      response.quality_dimension_scores = Object.fromEntries(Object.keys(response.quality_dimension_scores as object).map((dimension) => [dimension, 4]));
      response.rationale = "Independent fixture review records a complete meaning-based judgment.";
      response.acceptable_meaning_invariants = ["Preserve the supported product state"];
      response.recommended_revision = null;
      response.review_evidence_refs = ["review.fixture.session"];
    }
    const gold = qualifyContentDesignReview(packetValue, submission) as unknown as Record<string, unknown> & { records: Array<{ context: { state: string } }> };
    gold.records[0].context.state = "A different but structurally valid product state";
    redigest(gold, "gold_set_digest");
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-packet-binding-"));
    const goldPath = join(directory, "gold.json");
    const predictionsPath = join(directory, "predictions.json");
    try {
      await writeFile(goldPath, JSON.stringify(gold));
      await writeFile(predictionsPath, JSON.stringify(predictContentDesignBenchmark(packetValue)));
      await expect(scoreLocalContentDesignBenchmark(
        join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"),
        goldPath,
        predictionsPath,
        join(directory, "report.json"),
      )).rejects.toThrow(/gold_packet_binding/);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });
});
