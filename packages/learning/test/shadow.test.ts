import { sha256Canonical } from "@contentmd/core";
import { beforeAll, describe, expect, it } from "vitest";
import {
  buildLearningDataset,
  completeShadowSimulation,
  createEvaluationSimulatorVault,
  createSimulatedPromotionDecision,
  createShadowEvaluationPlan,
  inspectShadowSimulation,
  inspectSimulatedBinding,
  observeShadowSimulation,
  runSealedEvaluation,
  simulatePromotionBinding,
  startShadowSimulation,
  Task6GovernanceError,
  verifyPairwiseCandidate,
  verifySealedTestReplay,
  type Task6ObjectRef,
  type SimulatorFaultRule,
} from "../src/index.js";
import { task6SealedReplayFixture } from "./task6-fixtures.js";

function auxiliaryRef(prefix: string, schemaId: string, digest: string): Task6ObjectRef {
  return {
    record_id: `${prefix}${digest.slice(0, 32)}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function fixture() {
  const source = task6SealedReplayFixture();
  const vault = createEvaluationSimulatorVault({
    record_mode: "development_fixture",
    vault_id: "vault.task6.shadow-plan",
    fault_rules: [],
  });
  const sealedTest = verifySealedTestReplay(vault, {
    record_mode: "development_fixture",
    replay: source.replay,
  });
  return { source, vault, sealedTest };
}

function planFor(sealedTest: ReturnType<typeof verifySealedTestReplay>) {
  return createShadowEvaluationPlan({
    record_mode: "development_fixture",
    sealed_test: sealedTest,
    start_at: "2026-08-20T20:00:00.000Z",
    earliest_end_at: "2026-09-03T20:00:00.000Z",
    proposed_end_at: "2026-09-04T20:00:00.000Z",
    input_selection_ref: sealedTest.test_population_ref,
  });
}

function faultVault(
  replay: ReturnType<typeof task6SealedReplayFixture>["replay"],
  vaultId: string,
  faultRules: readonly SimulatorFaultRule[],
) {
  const vault = createEvaluationSimulatorVault({
    record_mode: "development_fixture",
    vault_id: vaultId,
    fault_rules: faultRules,
  });
  const sealedTest = verifySealedTestReplay(vault, {
    record_mode: "development_fixture",
    replay,
  });
  return { vault, sealedTest, plan: planFor(sealedTest) };
}

describe("Task 6 no-influence shadow", () => {
  let shared: ReturnType<typeof fixture>;

  beforeAll(() => {
    shared = fixture();
  }, 600_000);

  it("issues the exact authority-free ready shadow plan", () => {
    const { source, sealedTest } = shared;
    const startAt = "2026-08-20T20:00:00.000Z";
    const earliestEndAt = "2026-09-03T20:00:00.000Z";
    const proposedEndAt = "2026-09-04T20:00:00.000Z";
    const inputSelectionRef = sealedTest.test_population_ref;
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: startAt,
      earliest_end_at: earliestEndAt,
      proposed_end_at: proposedEndAt,
      input_selection_ref: inputSelectionRef,
    });

    const startRuleDigest = sha256Canonical({
      contract_version: "contentmd.shadow-start-rule/0.1.0",
      start_at: startAt,
      selection_interval_start: "inclusive",
    });
    const startRuleRef = auxiliaryRef(
      "shadow_start_rule.",
      "contentmd.shadow-start-rule",
      startRuleDigest,
    );
    const endRuleDigest = sha256Canonical({
      contract_version: "contentmd.shadow-end-rule/0.1.0",
      earliest_end_at: earliestEndAt,
      proposed_end_at: proposedEndAt,
      selection_interval_end: "exclusive",
      minimum_calendar_days: 14,
      minimum_decisive_pairs: 50,
      minimum_leakage_groups: 20,
    });
    const endRuleRef = auxiliaryRef(
      "shadow_end_rule.",
      "contentmd.shadow-end-rule",
      endRuleDigest,
    );
    const metricRefs = (["pairwise_accuracy", "log_loss"] as const).map((metric) => {
      const digest = sha256Canonical({
        contract_version: "contentmd.shadow-metric/0.1.0",
        metric,
        aggregation: "equal_pair_kahan_mean",
      });
      return auxiliaryRef("shadow_metric.", "contentmd.shadow-metric", digest);
    }) as [Task6ObjectRef, Task6ObjectRef];
    const gateRefs = ([
      "minimum_duration",
      "minimum_decisive_pairs",
      "minimum_leakage_groups",
      "required_slice_support",
      "complete_replay",
      "no_influence",
    ] as const).map((gate) => {
      const digest = sha256Canonical({
        contract_version: "contentmd.shadow-gate/0.1.0",
        gate,
        predicate_version: "0.1.0",
      });
      return auxiliaryRef("shadow_gate.", "contentmd.shadow-gate", digest);
    }) as [Task6ObjectRef, ...Task6ObjectRef[]];
    const requiredSliceRefs = source.replay.declared_slices
      .filter(({ required_for_promotion }) => required_for_promotion)
      .map(({ slice_id, slice_digest }) => ({
        record_id: slice_id,
        schema_id: "contentmd.evaluation-slice-definition",
        schema_version: "0.1.0" as const,
        content_digest: slice_digest,
      })) as [Task6ObjectRef, ...Task6ObjectRef[]];
    const baselineRef: Task6ObjectRef = {
      record_id: source.replay.baseline_profile.baseline_id,
      schema_id: "contentmd.expression-fit-baseline",
      schema_version: "0.1.0",
      content_digest: source.replay.baseline_profile.baseline_digest,
    };
    const inputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-evaluation-plan-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      sealed_test_handle_digest: sealedTest.handle_digest,
      active_baseline_ref: baselineRef,
      candidate_model_ref: sealedTest.model_ref,
      input_selection_ref: inputSelectionRef,
      start_rule_ref: startRuleRef,
      end_rule_ref: endRuleRef,
      required_slice_refs: requiredSliceRefs,
      metric_refs: metricRefs,
      gate_refs: gateRefs,
      code_verification_digest: sealedTest.code_verification_digest,
      runtime_verification_digest: sealedTest.runtime_verification_digest,
    });

    expect(plan.record_id).toBe(`shadow_evaluation_plan.${inputDigest.slice(0, 32)}`);
    expect(plan.schema_id).toBe("contentmd.shadow-evaluation-plan");
    expect(plan.lifecycle_state).toBe("active");
    expect(plan.scope).toEqual(source.replay.model_record.scope);
    expect(plan.payload).toEqual({
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: source.replay.evaluation_code_manifest.entries.find(({ path }) =>
        path === "packages/schemas/src/learning-records.schema.json")!.raw_bytes_digest,
      code_digest: source.replay.evaluation_code_manifest.manifest_digest,
      input_digest: inputDigest,
      authority_effect: "none",
      active_baseline_ref: baselineRef,
      candidate_model_ref: sealedTest.model_ref,
      input_selection_ref: inputSelectionRef,
      start_rule_ref: startRuleRef,
      end_rule_ref: endRuleRef,
      minimum_decisive_pairs: 50,
      minimum_leakage_groups: 20,
      minimum_calendar_days: 14,
      required_slice_refs: requiredSliceRefs,
      metric_refs: metricRefs,
      gate_refs: gateRefs,
      no_influence: true,
      plan_state: "ready",
    });
    expect(plan.provenance.map(({ relationship }) => relationship)).toEqual([
      "active_baseline",
      "candidate_model",
      "evaluation_code_manifest",
      "evaluation_runtime_profile",
      "input_selection",
      ...requiredSliceRefs.map(() => "required_slice"),
      "shadow_end_rule",
      ...gateRefs.map(() => "shadow_gate"),
      ...metricRefs.map(() => "shadow_metric"),
      "shadow_start_rule",
    ]);
    expect(plan.payload.authority_effect).toBe("none");
    expect(Object.isFrozen(plan)).toBe(true);
  });

  it("starts one opaque shadow run and rebuilds its started status", () => {
    const { vault, sealedTest } = shared;
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: "2026-08-20T20:00:00.000Z",
      earliest_end_at: "2026-09-03T20:00:00.000Z",
      proposed_end_at: "2026-09-04T20:00:00.000Z",
      input_selection_ref: sealedTest.test_population_ref,
    });
    const runId = "shadow.run.task6.001";
    expect(inspectShadowSimulation(vault, runId)).toBeNull();

    const shadow = startShadowSimulation(vault, {
      record_mode: "development_fixture",
      plan,
      sealed_test: sealedTest,
      shadow_run_id: runId,
      actor_ref: "actor.task6.shadow-start",
    });
    const { handle_digest: _handleDigest, ...handlePreimage } = shadow;
    expect(shadow.contract_version).toBe("contentmd.shadow-simulation-handle/0.1.0");
    expect(shadow.record_mode).toBe("development_fixture");
    expect(shadow.authority_effect).toBe("none");
    expect(shadow.shadow_run_id).toBe(runId);
    expect(shadow.handle_digest).toBe(sha256Canonical(handlePreimage));
    expect(Object.isFrozen(shadow)).toBe(true);

    const status = inspectShadowSimulation(vault, runId)!;
    const { status_digest: _statusDigest, ...statusPreimage } = status;
    expect(status).toEqual({
      contract_version: "contentmd.shadow-run-status/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      shadow_run_id: runId,
      state: "started",
      observation_count: 0,
      last_observation_at: null,
      completion_claim_event_ref: null,
      terminal_result_ref: null,
      status_digest: sha256Canonical(statusPreimage),
    });
    expect(Object.isFrozen(status)).toBe(true);
  });

  it("makes an exact duplicate start idempotent and rejects changed bytes", () => {
    const { vault, sealedTest } = shared;
    const plan = planFor(sealedTest);
    const input = {
      record_mode: "development_fixture" as const,
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.idempotent",
      actor_ref: "actor.task6.shadow-start",
    };
    const first = startShadowSimulation(vault, input);
    const duplicate = startShadowSimulation(vault, {
      ...structuredClone(input),
      sealed_test: sealedTest,
    });
    expect(duplicate).toEqual(first);
    expect(inspectShadowSimulation(vault, input.shadow_run_id)?.observation_count).toBe(0);
    expect(() => startShadowSimulation(vault, {
      ...input,
      actor_ref: "actor.task6.changed",
    })).toThrow("task6_contract_invalid:task6_shadow_chronology_invalid");
  });

  it("does not create a run when the start append crashes before commit", () => {
    const { vault, sealedTest, plan } = faultVault(
      shared.source.replay,
      "vault.task6.shadow-start-before-append",
      [{ operation: "shadow_start_append", occurrence: 1, fault: "before_append" }],
    );
    const input = {
      record_mode: "development_fixture" as const,
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.before-append",
      actor_ref: "actor.task6.shadow-start",
    };
    expect(() => startShadowSimulation(vault, input)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    expect(inspectShadowSimulation(vault, input.shadow_run_id)).toBeNull();
    expect(startShadowSimulation(vault, input).shadow_run_id).toBe(input.shadow_run_id);
  }, 300_000);

  it("preserves one start after commit-before-ack and returns it on exact retry", () => {
    const { vault, sealedTest, plan } = faultVault(
      shared.source.replay,
      "vault.task6.shadow-start-after-commit",
      [{
        operation: "shadow_start_append",
        occurrence: 1,
        fault: "after_commit_before_ack",
      }],
    );
    const input = {
      record_mode: "development_fixture" as const,
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.after-commit",
      actor_ref: "actor.task6.shadow-start",
    };
    let observed: unknown;
    try {
      startShadowSimulation(vault, input);
    } catch (error) {
      observed = error;
    }
    expect(observed).toBeInstanceOf(Task6GovernanceError);
    expect((observed as Task6GovernanceError).code).toBe("task6_simulated_crash");
    expect(inspectShadowSimulation(vault, input.shadow_run_id)?.state).toBe("started");
    const recovered = startShadowSimulation(vault, {
      ...structuredClone(input),
      sealed_test: sealedTest,
    });
    expect(recovered.shadow_run_id).toBe(input.shadow_run_id);
    expect(inspectShadowSimulation(vault, input.shadow_run_id)?.observation_count).toBe(0);
  }, 300_000);

  it("records one chronological observation but returns active-baseline output only", () => {
    const { source, vault, sealedTest } = shared;
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: "2026-08-20T19:00:00.000Z",
      earliest_end_at: "2026-09-03T19:00:00.000Z",
      proposed_end_at: "2026-09-04T19:00:00.000Z",
      input_selection_ref: sealedTest.test_population_ref,
    });
    const shadowRunId = "shadow.run.task6.observation-001";
    const shadow = startShadowSimulation(vault, {
      record_mode: "development_fixture",
      plan,
      sealed_test: sealedTest,
      shadow_run_id: shadowRunId,
      actor_ref: "actor.task6.shadow-start",
    });
    let pair: any = source.replay.test_pairs[0]!;
    let candidates: any = [
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
    ] as const;
    let expectedBuildResult: any = buildLearningDataset(source.replay.dataset_replay.build_input);
    let observationInput: any = {
      record_mode: "development_fixture",
      vault,
      shadow_run_id: shadowRunId,
      observation_id: "shadow.observation.001",
      observed_at: source.replay.dataset_replay.build_input.evaluation_at,
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
      candidates,
    } as const;
    let response: any = observeShadowSimulation(observationInput);

    const { response_digest: _responseDigest, ...responsePreimage } = response;
    expect(response.contract_version).toBe("contentmd.shadow-active-only-response/0.1.0");
    expect(response.authority_effect).toBe("none");
    expect(response.shadow_run_id).toBe(shadowRunId);
    expect(response.observation_id).toBe("shadow.observation.001");
    expect(response.active_ordered_candidate_refs).toHaveLength(2);
    expect(new Set(response.active_ordered_candidate_refs.map(({ record_id }) => record_id))).toEqual(
      new Set(candidates.map(({ candidate_ref }) => candidate_ref.record_id)),
    );
    expect(response.response_digest).toBe(sha256Canonical(responsePreimage));
    expect(Object.keys(response).some((key) => /shadow.*(?:score|output|rank|probability)/u.test(key)))
      .toBe(false);
    expect(Object.isFrozen(response)).toBe(true);
    expect(observeShadowSimulation(observationInput)).toEqual(response);
    expect(() => observeShadowSimulation({
      ...observationInput,
      candidates: [candidates[1], candidates[0]],
    })).toThrow("task6_contract_invalid:task6_shadow_chronology_invalid");
    expect(() => observeShadowSimulation({
      ...observationInput,
      observation_id: "shadow.observation.000",
    })).toThrow("task6_contract_invalid:task6_shadow_chronology_invalid");
    let second: any = observeShadowSimulation({
      ...observationInput,
      observation_id: "shadow.observation.002",
    });
    expect(second.observation_id).toBe("shadow.observation.002");
    expect(inspectShadowSimulation(vault, shadowRunId)).toMatchObject({
      state: "observing",
      observation_count: 2,
      last_observation_at: source.replay.dataset_replay.build_input.evaluation_at,
    });
    const result = completeShadowSimulation({
      record_mode: "development_fixture",
      vault,
      shadow,
      ended_at: "2026-09-04T19:00:00.000Z",
      actor_ref: "actor.task6.shadow-complete",
    });
    const {
      result_digest: _resultDigest,
      shadow_result_id: _shadowResultId,
      ...resultSemantic
    } = result;
    expect(result).toMatchObject({
      contract_version: "contentmd.shadow-simulation-result/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      plan_ref: shadow.plan_ref,
      observation_count: 2,
      decisive_pair_count: 2,
      leakage_group_count: 1,
      started_at: "2026-08-20T19:00:00.000Z",
      ended_at: "2026-09-04T19:00:00.000Z",
      no_influence_verified: true,
      completion_state: "insufficient",
    });
    expect(result.result_digest).toBe(sha256Canonical(resultSemantic));
    expect(result.shadow_result_id).toBe(`shadow_result.${result.result_digest.slice(0, 32)}`);
    expect(Object.isFrozen(result)).toBe(true);
    expect(inspectShadowSimulation(vault, shadowRunId)).toMatchObject({
      state: "insufficient",
      observation_count: 2,
      terminal_result_ref: {
        record_id: result.shadow_result_id,
        content_digest: result.result_digest,
      },
    });
    // The observation replay carries the complete Task 3/4 evidence graph. Release
    // test-only aliases before opening the separately verified evaluation so this
    // acceptance path exercises the product boundary, not accidental heap retention.
    pair = null;
    candidates = null;
    expectedBuildResult = null;
    observationInput = null;
    response = null;
    second = null;
    const evaluation = runSealedEvaluation({
      record_mode: "development_fixture",
      vault,
      sealed_test: sealedTest,
      attempt_id: "attempt.task6.shadow-decision-evidence",
      opened_at: source.openedAt,
      actor_ref: "actor.task6.evaluator",
    });
    const decision = createSimulatedPromotionDecision({
      record_mode: "development_fixture",
      evaluation,
      shadow_result: result,
      proposed_scope: source.replay.proposed_scope,
      actor_fixture_ref: auxiliaryRef(
        "actor_fixture.",
        "contentmd.simulated-actor-fixture",
        sha256Canonical({ actor: "task6-governance-reviewer" }),
      ),
      rationale: "Evaluation and shadow thresholds are insufficient; reject simulation.",
      decision: "reject_simulation",
      expected_head_digest: null,
    });
    const {
      decision_digest: _decisionDigest,
      decision_id: _decisionId,
      ...decisionSemantic
    } = decision;
    expect(decision).toMatchObject({
      contract_version: "contentmd.simulated-promotion-decision/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      evaluation_ref: {
        record_id: evaluation.evaluation_record.record_id,
        content_digest: evaluation.evaluation_record.content_digest,
      },
      shadow_result_ref: {
        record_id: result.shadow_result_id,
        content_digest: result.result_digest,
      },
      proposed_scope_ref: sealedTest.proposed_scope_ref,
      decision: "reject_simulation",
      expected_head_digest: null,
    });
    expect(decision.decision_digest).toBe(sha256Canonical(decisionSemantic));
    expect(decision.decision_id).toBe(
      `simulated_promotion_decision.${decision.decision_digest.slice(0, 32)}`,
    );
    expect(Object.isFrozen(decision)).toBe(true);
    const bindingStreamDigest = sha256Canonical({
      contract_version: "contentmd.simulated-binding-stream/0.1.0",
      project_id: source.replay.proposed_scope.project_id,
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      proposed_scope_ref: sealedTest.proposed_scope_ref,
    });
    const bindingStreamId = `learning_binding_sim.${bindingStreamDigest.slice(0, 32)}`;
    expect(inspectSimulatedBinding(vault, bindingStreamId)).toBeNull();
    expect(() => simulatePromotionBinding({
      record_mode: "development_fixture",
      vault,
      project_id: source.replay.proposed_scope.project_id,
      proposed_scope: source.replay.proposed_scope,
      baseline_ref: plan.payload.active_baseline_ref,
      evaluation,
      shadow_result: result,
      decision,
      actor_ref: "actor.task6.binding-simulator",
      occurred_at: "2026-09-04T19:00:00.000Z",
    })).toThrow("task6_contract_invalid:task6_promotion_predicate_failed");
    expect(inspectSimulatedBinding(vault, bindingStreamId)).toBeNull();
  }, 150_000);

});
