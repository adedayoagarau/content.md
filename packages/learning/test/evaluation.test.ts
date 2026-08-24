import { sha256Canonical } from "@contentmd/core";
import { readFileSync } from "node:fs";
import { endianness } from "node:os";
import { describe, expect, it } from "vitest";
import {
  admitTask6Runtime,
  createEvaluationSimulatorVault,
  exportEvaluationSimulatorSnapshot,
  inspectEvaluationAttempt,
  restoreEvaluationSimulatorVault,
  runSealedEvaluation,
  verifySealedTestReplay,
  verifyTask6CodeManifest,
} from "../src/index.js";
import {
  task6SealedReplayFixture,
} from "./task6-fixtures.js";

describe("Task 6 evaluation simulator boundary", () => {
  it("verifies the exact release-owned Task 6 code manifest", () => {
    const preimage = JSON.parse(readFileSync(new URL(
      "../../../fixtures/learning-ranking/task6-code-manifest.json",
      import.meta.url,
    ), "utf8"));
    const manifest = { ...preimage, manifest_digest: sha256Canonical(preimage) };
    const verified = verifyTask6CodeManifest(manifest);

    expect(verified.manifest.entries).toHaveLength(18);
    expect(verified.manifest.entries.map(({ path }) => path)).toContain(
      "packages/core/src/canonical-dag.ts",
    );
    expect(verified.manifest_raw_bytes_digest).toBe(manifest.manifest_digest);
    expect(verified.verification_digest).toBe(sha256Canonical({
      contract_version: "contentmd.verified-task6-code-manifest/0.1.0",
      manifest,
      manifest_raw_bytes_digest: manifest.manifest_digest,
      release_profile_contract_digest: verified.release_profile_contract_digest,
    }));
    expect(Object.isFrozen(verified)).toBe(true);
  });

  it("admits only the exact release-owned Task 6 runtime tuple", () => {
    const identity = {
      contract_version: "contentmd.task6-runtime-profile/0.1.0" as const,
      node_version: "24.14.0" as const,
      v8_version: process.versions.v8,
      icu_version: process.versions.icu,
      unicode_version: process.versions.unicode,
      platform: process.platform,
      architecture: process.arch,
      endianness: endianness(),
    };
    const verified = admitTask6Runtime({
      ...identity,
      profile_digest: sha256Canonical(identity),
    });
    expect(verified.observed_runtime).toEqual({
      node_version: identity.node_version,
      v8_version: identity.v8_version,
      icu_version: identity.icu_version,
      unicode_version: identity.unicode_version,
      platform: identity.platform,
      architecture: identity.architecture,
      endianness: identity.endianness,
    });
    expect(verified.verification_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(Object.isFrozen(verified)).toBe(true);
  });

  it("short-circuits official mode before nested input access", () => {
    let reads = 0;
    const faultRules = new Proxy([], {
      get() {
        reads += 1;
        throw new Error("nested read");
      },
    });
    expect(() => createEvaluationSimulatorVault({
      record_mode: "official",
      vault_id: "vault.task6.official",
      fault_rules: faultRules,
    })).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(reads).toBe(0);

    const sealedTest = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("sealed handle read");
      },
    });
    expect(() => runSealedEvaluation({
      record_mode: "official",
      vault: sealedTest as never,
      sealed_test: sealedTest as never,
      attempt_id: "attempt.task6.official",
      opened_at: "2026-08-20T20:00:00.000Z",
      actor_ref: "actor.task6.official",
    })).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(reads).toBe(0);
  });

  it("transfers one live vault lineage to exactly one successor", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.transfer",
      fault_rules: [],
    });
    const expectedLineage = `evaluation_vault_lineage.${sha256Canonical({
      contract_version: "contentmd.evaluation-vault-root-lineage/0.1.0",
      vault_id: "vault.task6.transfer",
    }).slice(0, 32)}`;
    expect(vault.root_lineage_id).toBe(expectedLineage);
    expect(vault.transfer_generation).toBe(0);
    expect(Object.isFrozen(vault)).toBe(true);

    const snapshot = exportEvaluationSimulatorSnapshot(vault);
    expect(snapshot.root_lineage_id).toBe(expectedLineage);
    expect(snapshot.transfer_generation).toBe(1);
    expect(snapshot.exported_at).toBe("1970-01-01T00:00:00.000Z");
    expect(() => exportEvaluationSimulatorSnapshot(vault)).toThrow(
      "task6_contract_invalid:task6_vault_retired",
    );

    const successor = restoreEvaluationSimulatorVault({
      record_mode: "development_fixture",
      snapshot,
      fault_rules: [],
    });
    expect(successor.root_lineage_id).toBe(expectedLineage);
    expect(successor.transfer_generation).toBe(1);
    expect(() => restoreEvaluationSimulatorVault({
      record_mode: "development_fixture",
      snapshot,
      fault_rules: [],
    })).toThrow("task6_contract_invalid:task6_snapshot_already_restored");
    expect(() => exportEvaluationSimulatorSnapshot(structuredClone(successor))).toThrow(
      "task6_contract_invalid:task6_vault_invalid",
    );
  });

  it("inspects the authenticated attempt ledger without exposing vault state", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.attempt-inspection",
      fault_rules: [],
    });

    expect(inspectEvaluationAttempt(vault, "attempt.task6.missing")).toBeNull();
    expect(() => inspectEvaluationAttempt(structuredClone(vault), "attempt.task6.missing")).toThrow(
      "task6_contract_invalid:task6_vault_invalid",
    );
    expect(() => inspectEvaluationAttempt(vault, "")).toThrow(
      "task6_contract_invalid:task6_input_shape_invalid",
    );
  });

  it("verifies and retains a complete sealed replay while returning only an opaque handle", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.sealed-replay",
      fault_rules: [],
    });
    const fixture = task6SealedReplayFixture();
    const handle = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: fixture.replay,
    });

    expect(handle.contract_version).toBe("contentmd.verified-sealed-test-handle/0.1.0");
    expect(handle.record_mode).toBe("development_fixture");
    expect(handle.authority_effect).toBe("none");
    expect(handle.handle_id).toMatch(/^sealed_test_handle\.[a-f0-9]{32}$/);
    expect(handle.handle_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(handle.replay_verification_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(handle.test_population_ref.schema_id).toBe("contentmd.evaluation-population");
    expect(Object.keys(handle).sort()).toEqual([
      "authority_effect",
      "code_verification_digest",
      "contract_version",
      "dataset_ref",
      "handle_digest",
      "handle_id",
      "model_ref",
      "proposed_scope_ref",
      "record_mode",
      "replay_verification_digest",
      "runtime_verification_digest",
      "test_population_ref",
    ]);
    expect(Object.isFrozen(handle)).toBe(true);
    expect(JSON.stringify(handle)).not.toContain("expression");
    expect(JSON.stringify(handle)).not.toContain("candidate_a");
    expect(JSON.stringify(handle)).not.toContain("label");
  }, 180_000);

  it("consumes a sealed attempt only after the claim append commits", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.attempt-ledger",
      fault_rules: [
        {
          operation: "evaluation_attempt_claim",
          occurrence: 1,
          fault: "before_append",
        },
        {
          operation: "evaluation_test_open",
          occurrence: 1,
          fault: "before_append",
        },
      ],
    });
    const fixture = task6SealedReplayFixture();
    const handle = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: fixture.replay,
    });
    const request = {
      record_mode: "development_fixture" as const,
      vault,
      sealed_test: handle,
      opened_at: fixture.openedAt,
      actor_ref: "actor.task6.evaluator",
    };

    expect(() => runSealedEvaluation({
      ...request,
      attempt_id: "attempt.task6.before-claim",
    })).toThrow("task6_contract_invalid:task6_simulated_crash");
    expect(inspectEvaluationAttempt(vault, "attempt.task6.before-claim")).toBeNull();

    expect(() => runSealedEvaluation({
      ...request,
      attempt_id: "attempt.task6.claimed-unopened",
    })).toThrow("task6_contract_invalid:task6_simulated_crash");
    const consumed = inspectEvaluationAttempt(vault, "attempt.task6.claimed-unopened");
    expect(consumed?.state).toBe("consumed_unopened");
    expect(consumed?.consumed).toBe(true);
    expect(consumed?.open_event_ref).toBeNull();
    expect(consumed?.terminal_event_ref).toBeNull();
    expect(consumed?.evaluation_ref).toBeNull();
    expect(consumed?.attempt_key).toMatch(/^[a-f0-9]{64}$/);

    expect(() => runSealedEvaluation({
      ...request,
      attempt_id: "attempt.task6.duplicate-key",
    })).toThrow("task6_contract_invalid:task6_evaluation_attempt_consumed");
    expect(inspectEvaluationAttempt(vault, "attempt.task6.duplicate-key")).toBeNull();
  }, 180_000);

  it("opens the sealed population once and returns a complete authority-free evaluation", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.complete-evaluation",
      fault_rules: [],
    });
    const fixture = task6SealedReplayFixture();
    const handle = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: fixture.replay,
    });
    const result = runSealedEvaluation({
      record_mode: "development_fixture",
      vault,
      sealed_test: handle,
      attempt_id: "attempt.task6.complete-evaluation",
      opened_at: fixture.openedAt,
      actor_ref: "actor.task6.evaluator",
    });

    expect(result.attempt_status.state).toBe("failed");
    expect(result.authority_effect).toBe("none");
    expect(result.population.decisive_pair_count).toBe(20);
    expect(result.population.leakage_group_count).toBe(5);
    expect(result.population.coverage).toEqual({ value: 1, bits: "3ff0000000000000" });
    expect(result.overall_metrics.pair_count).toBe(20);
    expect(result.overall_metrics.leakage_group_count).toBe(5);
    expect(result.overall_metrics.baseline_accuracy.bits).toBe("3ff0000000000000");
    expect(result.overall_metrics.candidate_accuracy.bits).toBe("3ff0000000000000");
    expect(result.overall_metrics.accuracy_difference.bits).toBe("0000000000000000");
    expect(result.overall_metrics.baseline_log_loss.bits).toBe("3fc605a7d86a0ad2");
    expect(result.overall_metrics.candidate_log_loss.bits).toBe("3fcb001ef76282a6");
    expect(result.overall_metrics.log_loss_difference.bits).toBe("3fa3e9dc7be1df50");
    expect(result.slice_metrics).toHaveLength(5);
    expect(result.slice_metrics.every(({ support_state }) => support_state === "supported")).toBe(true);
    expect(result.bootstrap?.replicate_count).toBe(10_000);
    expect(result.bootstrap?.slice_results).toHaveLength(5);
    expect(result.bootstrap?.accuracy_difference.lower.bits).toBe("0000000000000000");
    expect(result.bootstrap?.accuracy_difference.upper.bits).toBe("0000000000000000");
    expect(result.bootstrap?.log_loss_difference.lower.bits).toBe("3fa3e9dc7be1df48");
    expect(result.bootstrap?.log_loss_difference.upper.bits).toBe("3fa3e9dc7be1df54");
    expect(result.predicate.checks.map(({ check }) => check)).toEqual([
      "coverage_exactly_one",
      "accuracy_lower_bound_positive",
      "log_loss_upper_bound_negative",
      "required_slices_supported",
      "required_slice_accuracy_lower_bound",
      "required_slice_log_loss_upper_bound",
      "currentness_passed",
      "reviewer_policy_passed",
      "hard_rule_regression_zero",
    ]);
    expect(result.predicate.checks.map(({ passed }) => passed)).toEqual([
      true, false, false, true, true, true, true, true, true,
    ]);
    expect(result.failures).toHaveLength(2);
    expect(result.failures.map(({ predicate_check }) => predicate_check)).toEqual([
      "accuracy_lower_bound_positive",
      "log_loss_upper_bound_negative",
    ]);
    expect(new Set(result.failures.map(({ failure_id }) => failure_id)).size).toBe(2);
    expect(result.evaluation_record.payload.evaluation_state).toBe(
      result.predicate.evaluation_passed ? "passed" : "failed",
    );
    expect(result.evaluation_record.payload.authority_effect).toBe("none");
    expect(result.attempt_status.terminal_event_ref).not.toBeNull();
    expect(result.attempt_status.evaluation_ref).toEqual({
      record_id: result.evaluation_record.record_id,
      schema_id: result.evaluation_record.schema_id,
      schema_version: result.evaluation_record.schema_version,
      content_digest: result.evaluation_record.content_digest,
    });
    expect(inspectEvaluationAttempt(vault, result.attempt_status.attempt_id)).toEqual(
      result.attempt_status,
    );
    expect(Object.isFrozen(result)).toBe(true);
  }, 240_000);
});
