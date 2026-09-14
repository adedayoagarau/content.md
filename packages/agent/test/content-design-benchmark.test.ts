import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { createContentDesignReviewSubmissionTemplate, predictContentDesignBenchmark, predictLocalContentDesignBenchmark } from "@contentmd/agent";

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
});
