import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { afterEach, describe, expect, it } from "vitest";
import { buildProgram } from "../src/main.js";
import { governedContentDesignReviewerFixture } from "../../../scripts/content-design-reviewer-fixture.mjs";

const root = fileURLToPath(new URL("../../../", import.meta.url));
const packet = join(root, "docs/tests/fixtures/content-design-scenarios/review-sample-100.json");
const temporary: string[] = [];

afterEach(async () => {
  await Promise.all(temporary.splice(0).map((directory) => rm(directory, { recursive: true, force: true })));
});

describe("contentmd benchmark content-design", () => {
  it("creates the built-in blinded sample without requiring a repository packet path", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-sample-cli-"));
    temporary.push(directory);
    const output = join(directory, "review-sample-100.json");
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--sample-out", output]);
    const result = JSON.parse(await readFile(output, "utf8"));
    expect(result.sample_count).toBe(100);
    expect(result.packet_digest).toBe("99810c8924715b8e10aa04e3f49e3e804b59e4154c538f4a2da15c825f4a3d2b");
  });

  it("writes a packet-bound prediction set to a new path", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-cli-"));
    temporary.push(directory);
    const output = join(directory, "predictions.json");
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--out", output]);
    const result = JSON.parse(await readFile(output, "utf8"));
    expect(result.prediction_count).toBe(100);
    expect(result.evaluation_status).toBe("unscored_pending_qualified_gold");
  });

  it("creates an incomplete independent-review template", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-review-cli-"));
    temporary.push(directory);
    const output = join(directory, "review.json");
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--review-template", output]);
    const result = JSON.parse(await readFile(output, "utf8"));
    expect(result.responses).toHaveLength(100);
    expect(result.submission_state).toBe("incomplete");
    expect(result.authority_effect).toBe("none");
  });

  it("qualifies completed review and scores packet-bound predictions", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-benchmark-loop-cli-"));
    temporary.push(directory);
    const templatePath = join(directory, "review.json");
    const predictionsPath = join(directory, "predictions.json");
    const goldPath = join(directory, "gold.json");
    const reportPath = join(directory, "report.json");
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--review-template", templatePath]);
    const submission = JSON.parse(await readFile(templatePath, "utf8"));
    submission.reviewer = governedContentDesignReviewerFixture(submission.packet_ref.packet_digest);
    submission.submission_state = "complete";
    for (const response of submission.responses) {
      response.disposition = "human_preference_review";
      response.hard_dimension_results = Object.fromEntries(Object.keys(response.hard_dimension_results).map((dimension) => [dimension, "pass"]));
      response.quality_dimension_scores = Object.fromEntries(Object.keys(response.quality_dimension_scores).map((dimension) => [dimension, 3]));
      response.rationale = "Independent fixture review records a complete meaning-based judgment.";
      response.acceptable_meaning_invariants = ["Preserve the supported product state"];
      response.review_evidence_refs = ["review.fixture.session"];
    }
    await writeFile(templatePath, `${JSON.stringify(submission, null, 2)}\n`);
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--out", predictionsPath]);
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--submission", templatePath, "--gold-out", goldPath]);
    await buildProgram().parseAsync(["node", "contentmd", "benchmark", "content-design", "--packet", packet, "--gold", goldPath, "--predictions", predictionsPath, "--report-out", reportPath]);
    const gold = JSON.parse(await readFile(goldPath, "utf8"));
    const report = JSON.parse(await readFile(reportPath, "utf8"));
    expect(gold.qualified_count).toBe(100);
    expect(gold.training_eligibility).toBe("never");
    expect(report.overall.count).toBe(100);
    expect(Object.keys(report.by_ability)).toHaveLength(10);
  });
});
