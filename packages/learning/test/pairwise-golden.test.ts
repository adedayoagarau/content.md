import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const GOLDEN_PATH = fileURLToPath(new URL(
  "../../../fixtures/learning-ranking/golden-model.json",
  import.meta.url,
));
const LOCK_PATH = fileURLToPath(new URL(
  "../../../fixtures/learning-ranking/golden-model.sha256",
  import.meta.url,
));
const RUNNER_PATH = fileURLToPath(new URL("./pairwise-golden-runner.ts", import.meta.url));

describe("Task 5 externally locked golden", () => {
  it("reproduces the compact replay commitment and outputs in two fresh processes", () => {
    const raw = readFileSync(GOLDEN_PATH, "utf8");
    const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
    expect(readFileSync(LOCK_PATH, "utf8")).toBe(
      `${rawDigest}  fixtures/learning-ranking/golden-model.json\n`,
    );
    const parsed = JSON.parse(raw) as Record<string, unknown> & {
      fixture_semantic_digest: string;
      prediction_cases: Array<{ case_id: string }>;
      replay_commitment: { training_row_digests: string[] };
    };
    const { fixture_semantic_digest: semanticDigest, ...fixture } = parsed;
    expect(raw).toBe(canonicalJson(parsed));
    expect(semanticDigest).toBe(sha256Canonical({
      contract_version: "contentmd.pairwise-golden-model-preimage/0.1.0",
      fixture,
    }));
    expect(parsed.prediction_cases.map(({ case_id }) => case_id)).toEqual([
      "ordinary",
      "ordinary_reversed",
      "exact_score_tie",
      "greatest_absolute_score_delta",
    ]);
    expect(parsed.replay_commitment.training_row_digests).toHaveLength(80);

    const runFresh = () => execFileSync(process.execPath, [
      "--max-old-space-size=4096",
      "--import",
      "tsx",
      RUNNER_PATH,
    ], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 2 * 1024 * 1024,
      timeout: 360_000,
    });
    const first = runFresh();
    const second = runFresh();
    expect(first).toBe(raw);
    expect(second).toBe(raw);
    expect(first).toBe(second);
  }, 420_000);
});
