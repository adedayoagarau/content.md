import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));
const GOLDEN_PATH = fileURLToPath(new URL(
  "../../../fixtures/learning-ranking/task6-simulator-golden.json",
  import.meta.url,
));
const LOCK_PATH = fileURLToPath(new URL(
  "../../../fixtures/learning-ranking/task6-simulator-golden.sha256",
  import.meta.url,
));
const RUNNER_PATH = fileURLToPath(new URL(
  "./task6-simulator-golden-runner.ts",
  import.meta.url,
));

describe("Task 6 externally locked simulator golden", () => {
  it("reproduces the complete authority-free lifecycle in two fresh processes", () => {
    const raw = readFileSync(GOLDEN_PATH, "utf8");
    const rawDigest = createHash("sha256").update(raw, "utf8").digest("hex");
    expect(readFileSync(LOCK_PATH, "utf8")).toBe(
      `${rawDigest}  fixtures/learning-ranking/task6-simulator-golden.json\n`,
    );
    const parsed = JSON.parse(raw) as Record<string, unknown> & {
      contract_version: string;
      record_mode: string;
      authority_effect: string;
      fixture_semantic_digest: string;
      sealed_test: { handle_id: string };
      evaluation: {
        attempt_status: { state: string };
        overall_metrics: {
          candidate_accuracy: { bits: string };
          candidate_log_loss: { bits: string };
        };
        bootstrap: { replicate_count: number };
      };
      shadow: {
        result: {
          completion_state: string;
          observation_count: number;
          leakage_group_count: number;
          no_influence_verified: boolean;
        };
      };
      promotion: { transition_kind: string; projection: { state: string } };
      drift: { report: { payload: { window_state: string } } };
      rollback: { transition_kind: string; projection: { state: string } };
      fallback: { transition_kind: string; projection: { state: string } };
    };
    const { fixture_semantic_digest: semanticDigest, ...fixture } = parsed;

    expect(raw).toBe(canonicalJson(parsed));
    expect(parsed).toMatchObject({
      contract_version: "contentmd.task6-simulator-golden/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      sealed_test: { handle_id: expect.stringMatching(/^sealed_test_handle\.[a-f0-9]{32}$/) },
      evaluation: {
        attempt_status: { state: "completed" },
        overall_metrics: {
          candidate_accuracy: { bits: "3feccccccccccccd" },
          candidate_log_loss: { bits: "3fd35bdb4669bd8b" },
        },
        bootstrap: { replicate_count: 10_000 },
      },
      shadow: {
        result: {
          completion_state: "completed",
          observation_count: 50,
          leakage_group_count: 20,
          no_influence_verified: true,
        },
      },
      promotion: { transition_kind: "promotion", projection: { state: "candidate" } },
      drift: { report: { payload: { window_state: "monitoring_insufficient" } } },
      rollback: { transition_kind: "rollback", projection: { state: "candidate" } },
      fallback: { transition_kind: "fallback_baseline", projection: { state: "baseline" } },
    });
    expect(semanticDigest).toBe(sha256Canonical({
      contract_version: "contentmd.task6-simulator-golden-preimage/0.1.0",
      fixture,
    }));

    const runFresh = () => execFileSync(process.execPath, [
      "--max-old-space-size=5120",
      "--import",
      "tsx",
      RUNNER_PATH,
    ], {
      cwd: ROOT,
      encoding: "utf8",
      maxBuffer: 32 * 1024 * 1024,
      timeout: 1_800_000,
    });
    const first = runFresh();
    const second = runFresh();
    expect(first).toBe(raw);
    expect(second).toBe(raw);
    expect(first).toBe(second);
  }, 3_700_000);
});
