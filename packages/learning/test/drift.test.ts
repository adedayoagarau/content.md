import { sha256Canonical } from "@contentmd/core";
import { validateRecord } from "@contentmd/schemas";
import { describe, expect, it } from "vitest";
import {
  buildLearningDataset,
  completeShadowSimulation,
  createEvaluationSimulatorVault,
  createShadowEvaluationPlan,
  createSimulatedPromotionDecision,
  evaluateDriftWindow,
  inspectDriftWindow,
  inspectSimulatedBinding,
  observeShadowSimulation,
  propagateLearningRevocation,
  recoverSimulatedBindingReadback,
  runSealedEvaluation,
  simulatePromotionBinding,
  simulateRollback,
  startShadowSimulation,
  verifyPairwiseCandidate,
  verifySealedTestReplay,
  type Task6ObjectRef,
} from "../src/index.js";
import { task6InternalReadTransitionReceipts } from "../src/evaluation.js";
import {
  task6InternalReferenceIndex,
  task6InternalDeriveDriftDisposition,
  task6InternalIssueDriftWindowStatus,
  task6InternalSelectDriftWindow,
} from "../src/drift.js";
import { task6PassingSealedReplayFixture } from "./task6-fixtures.js";

function auxiliaryRef(prefix: string, schemaId: string, value: unknown): Task6ObjectRef {
  const digest = sha256Canonical(value);
  return {
    record_id: `${prefix}${digest.slice(0, 32)}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

describe("Task 6 drift governance boundary", () => {
  it("fails closed when the stored revocation lineage graph is cyclic", () => {
    const cyclic: { next?: unknown } = {};
    cyclic.next = cyclic;
    expect(() => task6InternalReferenceIndex([cyclic])).toThrow(
      "task6_contract_invalid:task6_revocation_lineage_invalid",
    );
  });

  it("short-circuits official drift and revocation calls before nested input access", () => {
    let reads = 0;
    const trapped = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("nested read");
      },
    });
    expect(() => evaluateDriftWindow({
      record_mode: "official",
      vault: trapped,
      binding_stream_id: "learning_binding_sim.invalid",
      expected_head_digest: "0".repeat(64),
      actor_ref: "actor.task6.official",
      previous_report: trapped,
      promotion_evaluation: trapped,
      dataset_replay: trapped,
      currentness: trapped,
      observations: trapped,
      evaluation_at: "2026-10-01T00:00:00.000Z",
    } as never)).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(() => propagateLearningRevocation({
      record_mode: "official",
      vault: trapped,
      binding_stream_id: "learning_binding_sim.invalid",
      expected_head_digest: "0".repeat(64),
      revocation: trapped,
      actor_ref: "actor.task6.official",
      occurred_at: "2026-10-01T00:00:00.000Z",
    } as never)).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(reads).toBe(0);
  });

  it("reports no drift history for a fresh authenticated vault", () => {
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.drift-empty",
      fault_rules: [],
    });
    expect(inspectDriftWindow(vault, "0".repeat(64))).toBeNull();
    expect(() => inspectDriftWindow(structuredClone(vault), "0".repeat(64))).toThrow(
      "task6_contract_invalid:task6_vault_invalid",
    );
    expect(() => inspectDriftWindow(vault, "not-a-digest")).toThrow(
      "task6_contract_invalid:task6_digest_invalid",
    );
  });

  it("closes a day-30 window without consuming the next window boundary", () => {
    const selected = task6InternalSelectDriftWindow({
      start_cursor: {
        started_at: "2026-01-01T00:00:00.000Z",
        after_observation_id: null,
      },
      observations: [
        { observation_id: "observation.a", observed_at: "2026-01-01T00:00:00.000Z" },
        { observation_id: "observation.b", observed_at: "2026-01-01T00:00:00.000Z" },
        { observation_id: "observation.c", observed_at: "2026-01-30T23:59:59.999Z" },
      ],
      evaluation_at: "2026-01-31T00:00:00.000Z",
    });
    expect(selected).toEqual({
      close_reason: "day_30",
      window_started_at: "2026-01-01T00:00:00.000Z",
      window_ended_at: "2026-01-31T00:00:00.000Z",
      selected_observation_ids: ["observation.a", "observation.b", "observation.c"],
      next_cursor: {
        started_at: "2026-01-31T00:00:00.000Z",
        after_observation_id: null,
      },
    });
    expect(() => task6InternalSelectDriftWindow({
      start_cursor: {
        started_at: "2026-01-01T00:00:00.000Z",
        after_observation_id: null,
      },
      observations: [
        { observation_id: "observation.next", observed_at: "2026-01-31T00:00:00.000Z" },
      ],
      evaluation_at: "2026-01-31T00:00:00.000Z",
    })).toThrow("task6_contract_invalid:task6_drift_window_invalid");
  });

  it("closes exactly at the 100th chronological pair and rejects reuse or reordering", () => {
    const observations = Array.from({ length: 100 }, (_, index) => ({
      observation_id: `observation.${String(index).padStart(3, "0")}`,
      observed_at: "2026-02-02T00:00:00.000Z",
    }));
    const selected = task6InternalSelectDriftWindow({
      start_cursor: {
        started_at: "2026-02-01T00:00:00.000Z",
        after_observation_id: null,
      },
      observations,
      evaluation_at: "2026-02-02T00:00:00.000Z",
    });
    expect(selected.close_reason).toBe("pair_cap");
    expect(selected.selected_observation_ids).toHaveLength(100);
    expect(selected.next_cursor).toEqual({
      started_at: "2026-02-02T00:00:00.000Z",
      after_observation_id: "observation.099",
    });
    expect(() => task6InternalSelectDriftWindow({
      start_cursor: {
        started_at: "2026-02-01T00:00:00.000Z",
        after_observation_id: null,
      },
      observations: [...observations, {
        observation_id: "observation.100",
        observed_at: "2026-02-02T00:00:00.000Z",
      }],
      evaluation_at: "2026-02-02T00:00:00.000Z",
    })).toThrow("task6_contract_invalid:task6_drift_window_invalid");
    expect(() => task6InternalSelectDriftWindow({
      start_cursor: {
        started_at: "2026-02-02T00:00:00.000Z",
        after_observation_id: "observation.050",
      },
      observations: [observations[49]!, observations[51]!],
      evaluation_at: "2026-03-04T00:00:00.000Z",
    })).toThrow("task6_contract_invalid:task6_drift_window_invalid");
  });

  it("derives exact degradation, insufficiency, and 60-day suspension counters", () => {
    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 0,
      prior_consecutive_insufficient_windows: 0,
      window_state: "evaluable",
      degraded: true,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-03-01T00:00:00.000Z",
    })).toEqual({
      consecutive_degraded_windows: 1,
      consecutive_insufficient_windows: 0,
      disposition: "review",
    });
    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 1,
      prior_consecutive_insufficient_windows: 0,
      window_state: "evaluable",
      degraded: true,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-03-01T00:00:00.000Z",
    }).disposition).toBe("suspend");
    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 4,
      prior_consecutive_insufficient_windows: 3,
      window_state: "evaluable",
      degraded: false,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-03-01T00:00:00.000Z",
    })).toEqual({
      consecutive_degraded_windows: 0,
      consecutive_insufficient_windows: 0,
      disposition: "continue",
    });

    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 1,
      prior_consecutive_insufficient_windows: 0,
      window_state: "monitoring_insufficient",
      degraded: false,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-03-02T00:00:00.001Z",
    })).toEqual({
      consecutive_degraded_windows: 0,
      consecutive_insufficient_windows: 1,
      disposition: "review",
    });
    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 0,
      prior_consecutive_insufficient_windows: 1,
      window_state: "monitoring_insufficient",
      degraded: false,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-03-02T00:00:00.001Z",
    }).disposition).toBe("suspend");
    expect(task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows: 0,
      prior_consecutive_insufficient_windows: 0,
      window_state: "monitoring_insufficient",
      degraded: false,
      window_ended_at: "2026-04-01T00:00:00.000Z",
      last_evaluable_window_ended_at: "2026-01-31T00:00:00.000Z",
    }).disposition).toBe("suspend");
  });

  it("issues only the four exact inspectable drift stages", () => {
    const common = {
      drift_input_digest: "1".repeat(64),
      binding_stream_id: `learning_binding_sim.${"2".repeat(32)}`,
      report_ref: {
        record_id: "learning_drift.fixture",
        schema_id: "contentmd.learning-drift-report",
        schema_version: "0.1.0" as const,
        content_digest: "3".repeat(64),
      },
      next_cursor: {
        started_at: "2026-05-01T00:00:00.000Z",
        after_observation_id: null,
      },
      selected_observation_ids: ["observation.001", "observation.002"],
    };
    const completed = task6InternalIssueDriftWindowStatus({
      ...common,
      state: "completed",
      suspension_transition_id: null,
      terminal_result_digest: "4".repeat(64),
    });
    const { status_digest: _statusDigest, ...preimage } = completed;
    expect(completed).toEqual({
      contract_version: "contentmd.drift-window-status/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      drift_input_digest: common.drift_input_digest,
      binding_stream_id: common.binding_stream_id,
      state: "completed",
      report_ref: common.report_ref,
      next_cursor: common.next_cursor,
      selected_observation_count: 2,
      suspension_transition_id: null,
      terminal_result_digest: "4".repeat(64),
      status_digest: sha256Canonical(preimage),
    });
    expect(Object.isFrozen(completed)).toBe(true);
    expect(() => task6InternalIssueDriftWindowStatus({
      ...common,
      state: "report_committed",
      suspension_transition_id: `learning_transition.${"5".repeat(32)}`,
      terminal_result_digest: null,
    })).toThrow("task6_contract_invalid:task6_drift_history_invalid");
    expect(() => task6InternalIssueDriftWindowStatus({
      ...common,
      state: "suspension_pending_readback",
      suspension_transition_id: null,
      terminal_result_digest: null,
    })).toThrow("task6_contract_invalid:task6_drift_history_invalid");
    expect(() => task6InternalIssueDriftWindowStatus({
      ...common,
      state: "completed",
      suspension_transition_id: null,
      terminal_result_digest: null,
    })).toThrow("task6_contract_invalid:task6_drift_history_invalid");
  });

  it("atomically commits and replays the first day-30 monitoring-insufficient report", () => {
    const source = task6PassingSealedReplayFixture();
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.drift-first-window",
      fault_rules: [{
        operation: "rollback_prepare",
        occurrence: 1,
        fault: "after_commit_before_ack",
      }, {
        operation: "rollback_commit",
        occurrence: 1,
        fault: "after_commit_before_ack",
      }, {
        operation: "rollback_readback",
        occurrence: 1,
        fault: "after_commit_before_ack",
      }],
    });
    const sealedTest = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: source.replay,
    });
    const evaluation = runSealedEvaluation({
      record_mode: "development_fixture",
      vault,
      sealed_test: sealedTest,
      attempt_id: "attempt.task6.drift-first-window",
      opened_at: source.openedAt,
      actor_ref: "actor.task6.drift-evaluator",
    });
    expect(evaluation.evaluation_record.payload.evaluation_state).toBe("passed");

    const startAt = source.replay.dataset_replay.build_input.evaluation_at;
    const promotedAt = "2026-09-04T19:00:00.000Z";
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: startAt,
      earliest_end_at: "2026-09-03T19:00:00.000Z",
      proposed_end_at: promotedAt,
      input_selection_ref: sealedTest.test_population_ref,
    });
    const shadow = startShadowSimulation(vault, {
      record_mode: "development_fixture",
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.drift-first-window",
      actor_ref: "actor.task6.drift-shadow-start",
    });
    const expectedBuildResult = buildLearningDataset(source.replay.dataset_replay.build_input);
    const candidatesByGroup = source.shadowPairs.map((pair) => [
      verifyPairwiseCandidate({
        record_mode: "development_fixture",
        profile: source.replay.feature_profile,
        replay: pair.candidate_a,
      }),
      verifyPairwiseCandidate({
        record_mode: "development_fixture",
        profile: source.replay.feature_profile,
        replay: pair.candidate_b,
      }),
    ] as const);
    for (let index = 0; index < 50; index += 1) {
      const pairIndex = index % source.shadowPairs.length;
      const pair = source.shadowPairs[pairIndex]!;
      observeShadowSimulation({
        record_mode: "development_fixture",
        vault,
        shadow_run_id: shadow.shadow_run_id,
        observation_id: `shadow.observation.drift.${String(index).padStart(3, "0")}`,
        observed_at: startAt,
        outcome_replay: {
          dataset: {
            contract_version: "contentmd.drift-dataset-replay/0.1.0",
            build_input: source.replay.dataset_replay.build_input,
            expected_build_result: expectedBuildResult,
          },
          pair: {
            example_ref: pair.example_ref,
            leakage_group_ref: pair.leakage_group_ref,
            candidate_a: pair.candidate_a,
            candidate_b: pair.candidate_b,
            risk_slice_witness: pair.risk_slice_witness,
          },
        },
        candidates: candidatesByGroup[pairIndex]!,
      });
    }
    const shadowResult = completeShadowSimulation({
      record_mode: "development_fixture",
      vault,
      shadow,
      ended_at: promotedAt,
      actor_ref: "actor.task6.drift-shadow-complete",
    });
    const decision = createSimulatedPromotionDecision({
      record_mode: "development_fixture",
      evaluation,
      shadow_result: shadowResult,
      proposed_scope: source.replay.proposed_scope,
      actor_fixture_ref: auxiliaryRef(
        "actor_fixture.",
        "contentmd.simulated-actor-fixture",
        { actor: "task6-drift-governance-reviewer" },
      ),
      rationale: "Passed sealed evaluation and complete no-influence shadow evidence.",
      decision: "approve_simulation",
      expected_head_digest: null,
    });
    const promotion = simulatePromotionBinding({
      record_mode: "development_fixture",
      vault,
      project_id: source.replay.proposed_scope.project_id,
      proposed_scope: source.replay.proposed_scope,
      baseline_ref: plan.payload.active_baseline_ref,
      evaluation,
      shadow_result: shadowResult,
      decision,
      actor_ref: "actor.task6.drift-binding-simulator",
      occurred_at: promotedAt,
    });

    const evaluationAt = "2026-10-04T19:00:00.000Z";
    const driftBuildInput = structuredClone(source.replay.dataset_replay.build_input);
    driftBuildInput.evaluation_at = evaluationAt;
    const driftBuildResult = buildLearningDataset(driftBuildInput);
    expect(driftBuildResult).toMatchObject({
      groups: [],
      manifest: null,
      diagnostics: {
        included_examples: 0,
        issuance_disposition: "manifest_unissued_structural_empty",
      },
    });
    const {
      witness_id: _priorWitnessId,
      witness_digest: _priorWitnessDigest,
      ...currentnessBase
    } = source.replay.currentness;
    const currentnessIdentity = {
      ...currentnessBase,
      checked_at: evaluationAt,
      entries: source.replay.currentness.entries.map((entry) => ({
        ...entry,
        effective_at: promotedAt,
        expires_at: "2026-10-05T19:00:00.000Z",
      })),
    };
    const currentnessDigest = sha256Canonical(currentnessIdentity);
    const input = {
      record_mode: "development_fixture" as const,
      vault,
      binding_stream_id: promotion.projection.stream_id,
      expected_head_digest: promotion.projection.verified_head_digest!,
      actor_ref: "actor.task6.drift-window",
      previous_report: null,
      promotion_evaluation: evaluation,
      dataset_replay: {
        contract_version: "contentmd.drift-dataset-replay/0.1.0" as const,
        build_input: driftBuildInput,
        expected_build_result: driftBuildResult,
      },
      currentness: {
        ...currentnessIdentity,
        witness_id: `simulated_currentness.${currentnessDigest.slice(0, 32)}`,
        witness_digest: currentnessDigest,
      },
      observations: [],
      evaluation_at: evaluationAt,
    };

    const result = evaluateDriftWindow(input);
    expect(result).toMatchObject({
      contract_version: "contentmd.learning-drift-result/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      start_cursor: { started_at: promotedAt, after_observation_id: null },
      next_cursor: { started_at: evaluationAt, after_observation_id: null },
      close_reason: "day_30",
      metric_delta: {
        window_state: "monitoring_insufficient",
        pair_count: 0,
        leakage_group_count: 0,
        accuracy_difference_from_promotion: null,
        log_loss_difference_from_promotion: null,
        required_slice_result_refs: [],
        bootstrap_ref: null,
      },
      metrics: null,
      slice_metrics: [],
      bootstrap: null,
      disposition: "review",
      suspension_transition: null,
      report: {
        schema_id: "contentmd.learning-drift-report",
        schema_version: "0.1.0",
        record_version: 1,
        lifecycle_state: "active",
        payload: {
          record_mode: "development_fixture",
          authority_effect: "none",
          window_started_at: promotedAt,
          window_ended_at: evaluationAt,
          decisive_pair_count: 0,
          leakage_group_count: 0,
          consecutive_degraded_windows: 0,
          consecutive_insufficient_windows: 1,
          immediate_failure_refs: [],
          disposition: "review",
          window_state: "monitoring_insufficient",
        },
      },
    });
    expect(validateRecord("contentmd.learning-drift-report", result.report)).toEqual({
      valid: true,
      errors: [],
    });
    const status = inspectDriftWindow(vault, result.report.payload.input_digest);
    expect(status).toMatchObject({
      state: "completed",
      drift_input_digest: result.report.payload.input_digest,
      selected_observation_count: 0,
      next_cursor: result.next_cursor,
      suspension_transition_id: null,
      terminal_result_digest: result.result_digest,
      authority_effect: "none",
    });
    expect(evaluateDriftWindow(input)).toEqual(result);
    expect(inspectDriftWindow(vault, result.report.payload.input_digest)).toEqual(status);
    expect(Object.isFrozen(result)).toBe(true);

    const receipts = task6InternalReadTransitionReceipts(vault).filter((receipt) =>
      receipt !== null && typeof receipt === "object" && !Array.isArray(receipt)
      && (receipt as { contract_version?: unknown }).contract_version
        === "contentmd.stored-drift-window-receipt/0.1.0");
    expect(receipts).toHaveLength(1);
    const receipt = receipts[0]! as Record<string, unknown> & {
      stored_receipt_digest: string;
      window_population: Record<string, unknown>;
    };
    const { stored_receipt_digest: storedReceiptDigest, ...receiptSemantic } = receipt;
    const {
      suspension_transition: _suspensionTransition,
      result_digest: _resultDigest,
      ...resultPreimage
    } = result;
    expect(storedReceiptDigest).toBe(sha256Canonical(receiptSemantic));
    expect(receipt).toMatchObject({
      drift_input_digest: result.report.payload.input_digest,
      binding_stream_id: promotion.projection.stream_id,
      report: result.report,
      metric_delta: result.metric_delta,
      start_cursor: result.start_cursor,
      next_cursor: result.next_cursor,
      close_reason: "day_30",
      selected_observation_ids: [],
      result_preimage: resultPreimage,
      window_population: {
        contract_version: "contentmd.drift-window-population/0.1.0",
        binding_stream_id: promotion.projection.stream_id,
        start_cursor: result.start_cursor,
        next_cursor: result.next_cursor,
        window_started_at: promotedAt,
        window_ended_at: evaluationAt,
        close_reason: "day_30",
        selected_observation_ids: [],
        leakage_group_refs: [],
        pair_count: 0,
        leakage_group_count: 0,
      },
    });

    const secondEvaluationAt = "2026-11-03T19:00:00.000Z";
    const {
      witness_id: _currentWitnessId,
      witness_digest: _currentWitnessDigest,
      ...secondCurrentnessBase
    } = input.currentness;
    const secondCurrentnessIdentity = {
      ...secondCurrentnessBase,
      checked_at: secondEvaluationAt,
      entries: input.currentness.entries.map((entry) => ({
        ...entry,
        effective_at: promotedAt,
        expires_at: "2026-11-04T19:00:00.000Z",
      })),
    };
    const secondCurrentnessDigest = sha256Canonical(secondCurrentnessIdentity);
    const secondInput = {
      ...input,
      previous_report: result.report,
      currentness: {
        ...secondCurrentnessIdentity,
        witness_id: `simulated_currentness.${secondCurrentnessDigest.slice(0, 32)}`,
        witness_digest: secondCurrentnessDigest,
      },
      evaluation_at: secondEvaluationAt,
    };
    const suspended = evaluateDriftWindow(secondInput);
    expect(suspended).toMatchObject({
      start_cursor: { started_at: evaluationAt, after_observation_id: null },
      next_cursor: { started_at: secondEvaluationAt, after_observation_id: null },
      close_reason: "day_30",
      metrics: null,
      slice_metrics: [],
      bootstrap: null,
      disposition: "suspend",
      report: {
        payload: {
          consecutive_degraded_windows: 0,
          consecutive_insufficient_windows: 2,
          disposition: "suspend",
          window_state: "monitoring_insufficient",
        },
      },
      suspension_transition: {
        transition_kind: "suspension",
        projection: {
          projection_stage: "verified",
          state: "suspended",
          model_ref: promotion.projection.model_ref,
          authority_effect: "none",
        },
      },
    });
    expect(validateRecord("contentmd.learning-drift-report", suspended.report)).toEqual({
      valid: true,
      errors: [],
    });
    const suspendedStatus = inspectDriftWindow(
      vault,
      suspended.report.payload.input_digest,
    );
    expect(suspendedStatus).toMatchObject({
      state: "completed",
      selected_observation_count: 0,
      next_cursor: suspended.next_cursor,
      suspension_transition_id: suspended.suspension_transition!.transition_id,
      terminal_result_digest: suspended.result_digest,
    });
    expect(evaluateDriftWindow(secondInput)).toEqual(suspended);
    expect(inspectDriftWindow(vault, result.report.payload.input_digest)).toEqual(status);
    expect(task6InternalReadTransitionReceipts(vault).filter((candidate) =>
      candidate !== null && typeof candidate === "object" && !Array.isArray(candidate)
      && (candidate as { contract_version?: unknown }).contract_version
        === "contentmd.stored-drift-window-receipt/0.1.0")).toHaveLength(2);

    const rollbackInput = {
      record_mode: "development_fixture",
      vault,
      binding_stream_id: promotion.projection.stream_id,
      expected_head_digest:
        suspended.suspension_transition!.projection.verified_head_digest!,
      requested_target_event_digest: null,
      ordered_target_replays: [],
      fallback_baseline_ref: {
        record_id: source.replay.baseline_profile.baseline_id,
        schema_id: "contentmd.expression-fit-baseline",
        schema_version: "0.1.0",
        content_digest: source.replay.baseline_profile.baseline_digest,
      },
      reason_code: "drift_suspension",
      actor_ref: "actor.task6.rollback-fallback",
      occurred_at: "2026-11-03T19:00:00.001Z",
    } as const;
    expect(() => simulateRollback(rollbackInput)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    expect(inspectSimulatedBinding(vault, promotion.projection.stream_id)).toEqual(
      suspended.suspension_transition!.projection,
    );
    expect(() => simulateRollback(rollbackInput)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    const pendingFallback = inspectSimulatedBinding(
      vault,
      promotion.projection.stream_id,
    );
    expect(pendingFallback).toMatchObject({
      projection_stage: "pending",
      state: "pending_readback",
      baseline_ref: suspended.suspension_transition!.projection.baseline_ref,
      model_ref: suspended.suspension_transition!.projection.model_ref,
    });
    if (pendingFallback?.projection_stage !== "pending") {
      throw new Error("expected pending fallback projection");
    }
    expect(() => simulateRollback(rollbackInput)).toThrow(
      "task6_contract_invalid:task6_transition_pending_readback",
    );
    const fallbackRecoveryInput = {
      record_mode: "development_fixture",
      vault,
      binding_stream_id: promotion.projection.stream_id,
      transition_id: pendingFallback.pending_transition_id,
      expected_commit_head_digest: pendingFallback.physical_head_digest,
      actor_ref: "actor.task6.rollback-fallback-readback",
      occurred_at: "2026-11-03T19:00:00.002Z",
    } as const;
    expect(() => recoverSimulatedBindingReadback(fallbackRecoveryInput)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    expect(inspectSimulatedBinding(vault, promotion.projection.stream_id)).toMatchObject({
      projection_stage: "verified",
      state: "baseline",
      model_ref: null,
    });
    const fallback = recoverSimulatedBindingReadback(fallbackRecoveryInput);
    expect(fallback).toMatchObject({
      transition_kind: "fallback_baseline",
      authority_effect: "none",
      projection: {
        projection_stage: "verified",
        state: "baseline",
        baseline_ref: fallback.projection.baseline_ref,
        model_ref: null,
        authority_effect: "none",
      },
    });
    expect(inspectSimulatedBinding(vault, promotion.projection.stream_id)).toEqual(
      fallback.projection,
    );
    expect(simulateRollback(rollbackInput)).toEqual(fallback);
  }, 1_800_000);
});
