import { sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import {
  buildLearningDataset,
  completeShadowSimulation,
  createEvaluationSimulatorVault,
  createShadowEvaluationPlan,
  createSimulatedPromotionDecision,
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
  type SimulatedRevocationWitness,
} from "../src/index.js";
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

function revocationWitness(
  revokedRef: Task6ObjectRef,
  revokedAt: string,
  reason: SimulatedRevocationWitness["reason"],
): SimulatedRevocationWitness {
  const identity = {
    contract_version: "contentmd.simulated-revocation-witness/0.1.0" as const,
    revoked_ref: revokedRef,
    revoked_at: revokedAt,
    reason,
    replacement_ref: null,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  const witnessDigest = sha256Canonical(identity);
  return {
    ...identity,
    witness_id: `simulated_revocation.${witnessDigest.slice(0, 32)}`,
    witness_digest: witnessDigest,
  };
}

function currentnessAt<T extends {
  contract_version: "contentmd.simulated-currentness-witness/0.1.0";
  entries: readonly unknown[];
  record_mode: "development_fixture";
  authority_effect: "none";
}>(witness: T, checkedAt: string) {
  const preimage = {
    contract_version: witness.contract_version,
    checked_at: checkedAt,
    entries: witness.entries.map((entry) => ({
      ...(entry as Record<string, unknown>),
      expires_at: null,
    })),
    record_mode: witness.record_mode,
    authority_effect: witness.authority_effect,
  };
  const digest = sha256Canonical(preimage);
  return {
    ...preimage,
    witness_id: `simulated_currentness.${digest.slice(0, 32)}`,
    witness_digest: digest,
  };
}

describe("Task 6 simulated binding", () => {
  it("promotes only passed evaluation plus completed no-influence shadow through verified readback", () => {
    const source = task6PassingSealedReplayFixture();
    const vault = createEvaluationSimulatorVault({
      record_mode: "development_fixture",
      vault_id: "vault.task6.binding-positive",
      fault_rules: [
        {
          operation: "binding_commit",
          occurrence: 2,
          fault: "after_commit_before_ack",
        },
        {
          operation: "binding_readback",
          occurrence: 2,
          fault: "after_commit_before_ack",
        },
      ],
    });
    const sealedTest = verifySealedTestReplay(vault, {
      record_mode: "development_fixture",
      replay: source.replay,
    });
    const evaluation = runSealedEvaluation({
      record_mode: "development_fixture",
      vault,
      sealed_test: sealedTest,
      attempt_id: "attempt.task6.binding-positive",
      opened_at: source.openedAt,
      actor_ref: "actor.task6.evaluator",
    });
    expect(evaluation.evaluation_record.payload.evaluation_state).toBe("passed");
    expect(evaluation.predicate.evaluation_passed).toBe(true);
    expect(evaluation.predicate.promotion_ready_without_shadow_or_decision).toBe(true);

    const startAt = source.replay.dataset_replay.build_input.evaluation_at;
    const plan = createShadowEvaluationPlan({
      record_mode: "development_fixture",
      sealed_test: sealedTest,
      start_at: startAt,
      earliest_end_at: "2026-09-03T19:00:00.000Z",
      proposed_end_at: "2026-09-04T19:00:00.000Z",
      input_selection_ref: sealedTest.test_population_ref,
    });
    const shadow = startShadowSimulation(vault, {
      record_mode: "development_fixture",
      plan,
      sealed_test: sealedTest,
      shadow_run_id: "shadow.run.task6.binding-positive",
      actor_ref: "actor.task6.shadow-start",
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
        observation_id: `shadow.observation.binding.${String(index).padStart(3, "0")}`,
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
      ended_at: "2026-09-04T19:00:00.000Z",
      actor_ref: "actor.task6.shadow-complete",
    });
    expect(shadowResult).toMatchObject({
      completion_state: "completed",
      observation_count: 50,
      decisive_pair_count: 50,
      leakage_group_count: 20,
      no_influence_verified: true,
      authority_effect: "none",
    });

    const decision = createSimulatedPromotionDecision({
      record_mode: "development_fixture",
      evaluation,
      shadow_result: shadowResult,
      proposed_scope: source.replay.proposed_scope,
      actor_fixture_ref: auxiliaryRef(
        "actor_fixture.",
        "contentmd.simulated-actor-fixture",
        { actor: "task6-governance-reviewer" },
      ),
      rationale: "Passed sealed evaluation and complete no-influence shadow evidence.",
      decision: "approve_simulation",
      expected_head_digest: null,
    });
    const result = simulatePromotionBinding({
      record_mode: "development_fixture",
      vault,
      project_id: source.replay.proposed_scope.project_id,
      proposed_scope: source.replay.proposed_scope,
      baseline_ref: plan.payload.active_baseline_ref,
      evaluation,
      shadow_result: shadowResult,
      decision,
      actor_ref: "actor.task6.binding-simulator",
      occurred_at: "2026-09-04T19:00:00.000Z",
    });

    expect(result).toMatchObject({
      contract_version: "contentmd.simulated-binding-transition-result/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      transition_kind: "promotion",
      projection: {
        contract_version: "contentmd.simulated-binding-projection/0.1.0",
        record_mode: "development_fixture",
        authority_effect: "none",
        projection_stage: "verified",
        state: "candidate",
        baseline_ref: plan.payload.active_baseline_ref,
        model_ref: evaluation.evaluation_record.payload.model_ref,
        verified_transition_id: result.transition_id,
        pending_transition_id: null,
        pending_proposed_projection_digest: null,
      },
    });
    expect(result.projection.verified_head_digest).toBe(result.projection.physical_head_digest);
    expect(result.projection.verified_head_digest).toBe(result.readback_event_ref.content_digest);
    expect(inspectSimulatedBinding(vault, result.projection.stream_id)).toEqual(result.projection);
    expect(Object.isFrozen(result)).toBe(true);

    const recoveryDecision = createSimulatedPromotionDecision({
      record_mode: "development_fixture",
      evaluation,
      shadow_result: shadowResult,
      proposed_scope: source.replay.proposed_scope,
      actor_fixture_ref: {
        ...decision.actor_fixture_ref,
        content_digest: sha256Canonical({ actor: "task6-governance-recovery-reviewer" }),
      },
      rationale: "Exercise the simulated pending-readback recovery contract.",
      decision: "approve_simulation",
      expected_head_digest: result.projection.physical_head_digest,
    });
    const recoveryPromotionInput = {
      record_mode: "development_fixture" as const,
      vault,
      project_id: source.replay.proposed_scope.project_id,
      proposed_scope: source.replay.proposed_scope,
      baseline_ref: plan.payload.active_baseline_ref,
      evaluation,
      shadow_result: shadowResult,
      decision: recoveryDecision,
      actor_ref: "actor.task6.binding-recovery-simulator",
      occurred_at: "2026-09-05T19:00:00.000Z",
    };
    expect(() => simulatePromotionBinding(recoveryPromotionInput)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    const pending = inspectSimulatedBinding(vault, result.projection.stream_id);
    expect(pending).toMatchObject({
      projection_stage: "pending",
      state: "pending_readback",
      verified_head_digest: result.projection.verified_head_digest,
      pending_transition_id: expect.any(String),
    });
    expect(() => simulatePromotionBinding(recoveryPromotionInput)).toThrow(
      "task6_contract_invalid:task6_transition_pending_readback",
    );
    if (pending === null || pending.projection_stage !== "pending") {
      throw new Error("expected pending binding projection");
    }
    const recoveryInput = {
      record_mode: "development_fixture" as const,
      vault,
      binding_stream_id: pending.stream_id,
      transition_id: pending.pending_transition_id,
      expected_commit_head_digest: pending.physical_head_digest,
      actor_ref: "actor.task6.binding-readback-recovery",
      occurred_at: "2026-09-05T19:00:01.000Z",
    };
    expect(() => recoverSimulatedBindingReadback(recoveryInput)).toThrow(
      "task6_contract_invalid:task6_simulated_crash",
    );
    const recoveredProjection = inspectSimulatedBinding(vault, pending.stream_id);
    expect(recoveredProjection).toMatchObject({
      projection_stage: "verified",
      state: "candidate",
      verified_transition_id: pending.pending_transition_id,
      pending_transition_id: null,
      pending_proposed_projection_digest: null,
    });
    const recovered = recoverSimulatedBindingReadback(recoveryInput);
    expect(recovered.projection).toEqual(recoveredProjection);
    expect(recovered.transition_id).toBe(pending.pending_transition_id);
    expect(inspectSimulatedBinding(vault, pending.stream_id)).toEqual(recoveredProjection);
    expect(Object.isFrozen(recovered)).toBe(true);

    const rollbackInput = {
      record_mode: "development_fixture",
      vault,
      binding_stream_id: recovered.projection.stream_id,
      expected_head_digest: recovered.projection.verified_head_digest!,
      requested_target_event_digest: null,
      ordered_target_replays: [{
        verified_binding_event_digest: result.projection.verified_head_digest!,
        model_record: source.replay.model_record,
        model_dependencies: source.replay.model_dependencies,
        currentness: currentnessAt(
          source.replay.currentness,
          "2026-09-06T19:00:00.000Z",
        ),
      }],
      fallback_baseline_ref: plan.payload.active_baseline_ref,
      reason_code: "incident_recovery",
      actor_ref: "actor.task6.rollback-simulator",
      occurred_at: "2026-09-06T19:00:00.000Z",
    } as const;
    const rolledBack = simulateRollback(rollbackInput);
    expect(rolledBack).toMatchObject({
      transition_kind: "rollback",
      authority_effect: "none",
      projection: {
        projection_stage: "verified",
        state: "candidate",
        baseline_ref: plan.payload.active_baseline_ref,
        model_ref: evaluation.evaluation_record.payload.model_ref,
        authority_effect: "none",
      },
    });
    expect(rolledBack.projection.superseded_verified_event_digests).toContain(
      recovered.projection.verified_head_digest,
    );
    expect(inspectSimulatedBinding(vault, recovered.projection.stream_id)).toEqual(
      rolledBack.projection,
    );
    expect(simulateRollback(rollbackInput)).toEqual(rolledBack);
    expect(inspectSimulatedBinding(vault, recovered.projection.stream_id)).toEqual(
      rolledBack.projection,
    );

    const missingAt = "2026-09-06T19:00:00.100Z";
    const missingRef: Task6ObjectRef = {
      ...plan.payload.start_rule_ref,
      record_id: "task6.revocation.missing",
      content_digest: "0".repeat(64),
    };
    expect(() => propagateLearningRevocation({
      record_mode: "development_fixture",
      vault,
      binding_stream_id: rolledBack.projection.stream_id,
      expected_head_digest: rolledBack.projection.verified_head_digest!,
      revocation: revocationWitness(missingRef, missingAt, "source_revoked"),
      actor_ref: "actor.task6.revocation-missing",
      occurred_at: missingAt,
    })).toThrow("task6_contract_invalid:task6_revocation_lineage_invalid");

    const unrelatedAt = "2026-09-06T19:00:00.200Z";
    expect(propagateLearningRevocation({
      record_mode: "development_fixture",
      vault,
      binding_stream_id: rolledBack.projection.stream_id,
      expected_head_digest: rolledBack.projection.verified_head_digest!,
      revocation: revocationWitness(
        plan.payload.start_rule_ref,
        unrelatedAt,
        "source_revoked",
      ),
      actor_ref: "actor.task6.revocation-unrelated",
      occurred_at: unrelatedAt,
    })).toBeNull();
    expect(inspectSimulatedBinding(vault, rolledBack.projection.stream_id)).toEqual(
      rolledBack.projection,
    );

    const ambiguousAt = "2026-09-06T19:00:00.300Z";
    expect(() => propagateLearningRevocation({
      record_mode: "development_fixture",
      vault,
      binding_stream_id: rolledBack.projection.stream_id,
      expected_head_digest: rolledBack.projection.verified_head_digest!,
      revocation: revocationWitness(
        decision.actor_fixture_ref,
        ambiguousAt,
        "authority_failure",
      ),
      actor_ref: "actor.task6.revocation-ambiguous",
      occurred_at: ambiguousAt,
    })).toThrow("task6_contract_invalid:task6_revocation_lineage_invalid");

    const revokedAt = "2026-09-06T19:00:01.000Z";
    const qualificationRef = source.replay.qualification_denominator.source_refs[0]!;
    const revocationInput = {
      record_mode: "development_fixture" as const,
      vault,
      binding_stream_id: rolledBack.projection.stream_id,
      expected_head_digest: rolledBack.projection.verified_head_digest!,
      revocation: revocationWitness(qualificationRef, revokedAt, "qualification_revoked"),
      actor_ref: "actor.task6.revocation-simulator",
      occurred_at: revokedAt,
    };
    const revoked = propagateLearningRevocation(revocationInput);
    expect(revoked).toMatchObject({
      transition_kind: "suspension",
      authority_effect: "none",
      projection: {
        projection_stage: "verified",
        state: "suspended",
        model_ref: rolledBack.projection.model_ref,
        authority_effect: "none",
      },
    });
    expect(propagateLearningRevocation(revocationInput)).toEqual(revoked);

    const fallbackAt = "2026-09-06T19:00:02.000Z";
    const revokedTargetReplays = [...revoked!.projection.superseded_verified_event_digests]
      .reverse()
      .map((verified_binding_event_digest) => ({
        verified_binding_event_digest,
        model_record: source.replay.model_record,
        model_dependencies: source.replay.model_dependencies,
        currentness: currentnessAt(source.replay.currentness, fallbackAt),
      }));
    const revokedFallbackInput = {
      record_mode: "development_fixture",
      vault,
      binding_stream_id: revoked!.projection.stream_id,
      expected_head_digest: revoked!.projection.verified_head_digest!,
      requested_target_event_digest: null,
      ordered_target_replays: revokedTargetReplays,
      fallback_baseline_ref: plan.payload.active_baseline_ref,
      reason_code: "lineage_revocation",
      actor_ref: "actor.task6.revoked-target-fallback",
      occurred_at: fallbackAt,
    } as const;
    const revokedFallback = simulateRollback(revokedFallbackInput);
    expect(revokedFallback).toMatchObject({
      transition_kind: "fallback_baseline",
      authority_effect: "none",
      projection: {
        projection_stage: "verified",
        state: "baseline",
        baseline_ref: plan.payload.active_baseline_ref,
        model_ref: null,
        authority_effect: "none",
      },
    });
    expect(simulateRollback(revokedFallbackInput)).toEqual(revokedFallback);
    expect(inspectSimulatedBinding(vault, revoked!.projection.stream_id)).toEqual(
      revokedFallback.projection,
    );
  }, 1_500_000);
});
