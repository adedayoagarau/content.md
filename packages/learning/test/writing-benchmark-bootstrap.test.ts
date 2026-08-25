import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import type { DigestRef } from "../src/records.js";
import {
  evaluateWritingBenchmarkQualityGate,
  runWritingBenchmarkHierarchicalBootstrap,
  WritingBenchmarkError,
} from "../src/writing-benchmark.js";

const PRODUCTS = [
  "commerce",
  "education",
  "finance",
  "health",
  "public-service",
  "transport",
] as const;

const sha256 = (value: string): string =>
  createHash("sha256").update(value, "utf8").digest("hex");

const digestRef = (label: string): DigestRef => ({
  record_id: `fixture.${label}`,
  schema_id: "contentmd.synthetic-reference-record",
  schema_version: "0.1.0",
  content_digest: sha256(`contentmd.writing-benchmark-bootstrap-test/0.1.0\n${label}\n`),
});

function bootstrapInput() {
  return {
    record_mode: "development_fixture" as const,
    metric_id: "comprehension",
    seed_material: {
      manifest_ref: digestRef("manifest"),
      attempt_ref: digestRef("attempt"),
      candidate_model_ref: digestRef("candidate-model"),
      baseline_ref: digestRef("baseline"),
      selection_set_digest: sha256("selection-set"),
      review_set_digest: sha256("review-set"),
      metric_rule_digest: sha256("metric-rule"),
      analysis_code_digest: sha256("analysis-code"),
    },
    pairs: PRODUCTS.flatMap((productId) =>
      Array.from({ length: 10 }, (_, index) => ({
        task_id: `task.${productId}.${String(index).padStart(2, "0")}`,
        product_id: productId,
        baseline_value: 0,
        learned_value: 0.25,
      }))),
  };
}

function qualityGateInput() {
  return {
    record_mode: "development_fixture" as const,
    valid_task_count: 60,
    invalid_task_count: 0,
    product_valid_counts: PRODUCTS.map((product_id) => ({ product_id, valid_count: 10 })),
    additional_hard_failures: {
      truthfulness: 0,
      behavioral_accuracy: 0,
      deception: 0,
      consent: 0,
      accessibility: 0,
      autonomy: 0,
      safety: 0,
      copying: 0,
    },
    noninferiority_intervals: {
      recovery: { lower: -0.1, upper: 0.2 },
      comprehension: { lower: -0.05, upper: 0.2 },
      accessibility_quality: { lower: 0, upper: 0.2 },
      voice_category_fit: { lower: -0.08, upper: 0.2 },
      localization: { lower: -0.1, upper: 0.2 },
    },
    accepted_edit_distance_difference: { lower: -0.04, upper: 0.01 },
    review_time_ratio: { lower: 0.9, upper: 1.1 },
    positive_utility: {
      blind_choice_probability: { lower: 0.51, upper: 0.7 },
      accepted_edit_distance_difference: { lower: -0.04, upper: 0.01 },
      task_recovery_score_difference: { lower: 0, upper: 0.2 },
    },
  };
}

describe("LIL-WRITE-001 hierarchical paired bootstrap", () => {
  it("reproduces exactly 10,000 two-level draws and nearest-rank bounds", () => {
    const input = bootstrapInput();
    const first = runWritingBenchmarkHierarchicalBootstrap(input);
    const second = runWritingBenchmarkHierarchicalBootstrap(structuredClone(input));

    expect(first).toEqual(second);
    expect(first.replicate_count).toBe(10_000);
    expect(first.draw_algorithm).toBe("sha256-counter-u64be-rejection-v1");
    expect(first.interval_method).toBe("nearest-rank-2.5-97.5");
    expect(first.difference_interval).toEqual({
      lower: { value: 0.25, bits: "3fd0000000000000" },
      upper: { value: 0.25, bits: "3fd0000000000000" },
    });
    expect(first.replicate_vector_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(first.bootstrap_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("rejects a 59-task population instead of changing the denominator", () => {
    const input = bootstrapInput();
    input.pairs.pop();

    expect(() => runWritingBenchmarkHierarchicalBootstrap(input))
      .toThrowError(new WritingBenchmarkError("bootstrap_population_invalid"));
  });
});

describe("LIL-WRITE-001 exact quality predicates", () => {
  it("passes only a complete zero-invalidation result with noninferiority and positive utility", () => {
    const result = evaluateWritingBenchmarkQualityGate(qualityGateInput());

    expect(result).toEqual({
      quality_gate_passed: true,
      failed_predicate_ids: [],
      bounded_claim_status: "synthetic_noninferiority_plus_utility",
    });
  });

  it.each([
    ["complete_population", (input: ReturnType<typeof qualityGateInput>) => { input.valid_task_count = 59; }],
    ["zero_additional_hard_failures", (input: ReturnType<typeof qualityGateInput>) => { input.additional_hard_failures.consent = 1; }],
    ["metric_noninferiority", (input: ReturnType<typeof qualityGateInput>) => { input.noninferiority_intervals.localization.lower = -0.100_001; }],
    ["edit_effort_noninferiority", (input: ReturnType<typeof qualityGateInput>) => { input.accepted_edit_distance_difference.upper = 0.020_001; }],
    ["review_time_noninferiority", (input: ReturnType<typeof qualityGateInput>) => { input.review_time_ratio.upper = 1.100_001; }],
    ["positive_utility", (input: ReturnType<typeof qualityGateInput>) => {
      input.positive_utility.blind_choice_probability.lower = 0.5;
      input.positive_utility.accepted_edit_distance_difference.upper = 0;
      input.positive_utility.task_recovery_score_difference.lower = 0;
    }],
  ] as const)("fails the %s predicate independently", (predicateId, mutate) => {
    const input = qualityGateInput();
    mutate(input);

    const result = evaluateWritingBenchmarkQualityGate(input);
    expect(result.quality_gate_passed).toBe(false);
    expect(result.failed_predicate_ids).toContain(predicateId);
    expect(result.bounded_claim_status).toBe("none");
  });
});
