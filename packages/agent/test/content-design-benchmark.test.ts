import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  createContentDesignReviewSubmissionTemplate,
  predictContentDesignBenchmark,
  predictLocalContentDesignBenchmark,
  qualifyContentDesignReview,
  scoreContentDesignBenchmark,
  writeBuiltinContentDesignReviewPacket,
} from "@contentmd/agent";

const root = fileURLToPath(new URL("../../../", import.meta.url));

describe("content-design benchmark", () => {
  it("reproduces the committed blinded baseline without hidden labels", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const expected = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/contentmd-baseline-predictions.json"), "utf8"));
    const result = predictContentDesignBenchmark(packet);
    expect(result).toEqual(expected);
    expect(result.prediction_count).toBe(100);
    expect(result.evaluation_status).toBe("unscored_pending_qualified_gold");
    expect(result.label_access).toBe("blind_packet_only");
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
      expect(packet.packet_digest).toBe("d418a8f58009b3ffc4e223a9d3336140402d850d603985becf90eb31704c1a1a");
      await expect(writeBuiltinContentDesignReviewPacket(output)).rejects.toThrow(/EEXIST/);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it("qualifies complete independent review for benchmarking only and scores bound predictions", async () => {
    const packet = JSON.parse(await readFile(join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8"));
    const submission = createContentDesignReviewSubmissionTemplate(packet) as unknown as Record<string, unknown> & { reviewer: Record<string, unknown>; responses: Array<Record<string, unknown>> };
    submission.reviewer = {
      reviewer_id: "reviewer.fixture",
      reviewer_role: "qualified_content_designer",
      reviewed_at: "2026-09-14T12:00:00.000Z",
      independent_review_attested: true,
    };
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
    expect(report.authority_effect).toBe("none");
  });
});
