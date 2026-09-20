import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  buildLearningDataset,
  completeShadowSimulation,
  createEvaluationSimulatorVault,
  createShadowEvaluationPlan,
  createSimulatedPromotionDecision,
  evaluateDriftWindow,
  observeShadowSimulation,
  propagateLearningRevocation,
  runSealedEvaluation,
  simulatePromotionBinding,
  simulateRollback,
  startShadowSimulation,
  verifyPairwiseCandidate,
  verifySealedTestReplay,
  type SimulatedCurrentnessWitness,
  type SimulatedRevocationWitness,
  type Task6ObjectRef,
} from "../src/index.js";
import {
  freezeTask6FixtureValue,
  task6PassingSealedReplayFixture,
} from "./task6-fixtures.js";

function invariant(condition: unknown, code: string): asserts condition {
  if (!condition) throw new Error(`task6_golden_${code}`);
}

function auxiliaryRef(prefix: string, schemaId: string, value: unknown): Task6ObjectRef {
  const digest = sha256Canonical(value);
  return {
    record_id: `${prefix}${digest.slice(0, 32)}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function currentnessAt(
  witness: SimulatedCurrentnessWitness,
  checkedAt: string,
  effectiveAt: string,
  expiresAt: string | null,
): SimulatedCurrentnessWitness {
  const entries = witness.entries.map((entry) => ({
    ...entry,
    effective_at: effectiveAt,
    expires_at: expiresAt,
  })) as unknown as SimulatedCurrentnessWitness["entries"];
  const semantic = {
    contract_version: witness.contract_version,
    checked_at: checkedAt,
    entries,
    record_mode: witness.record_mode,
    authority_effect: witness.authority_effect,
  };
  const witnessDigest = sha256Canonical(semantic);
  return {
    ...semantic,
    witness_id: `simulated_currentness.${witnessDigest.slice(0, 32)}`,
    witness_digest: witnessDigest,
  };
}

function revocationWitness(
  revokedRef: Task6ObjectRef,
  revokedAt: string,
): SimulatedRevocationWitness {
  const semantic = {
    contract_version: "contentmd.simulated-revocation-witness/0.1.0" as const,
    revoked_ref: revokedRef,
    revoked_at: revokedAt,
    reason: "qualification_revoked" as const,
    replacement_ref: null,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  const witnessDigest = sha256Canonical(semantic);
  return {
    ...semantic,
    witness_id: `simulated_revocation.${witnessDigest.slice(0, 32)}`,
    witness_digest: witnessDigest,
  };
}

function assertRecordDigest(record: { content_digest: string }) {
  const { content_digest: contentDigest, ...semantic } = record;
  invariant(contentDigest === sha256Canonical(semantic), "record_digest");
}

function assertResultDigest(result: { result_digest: string }) {
  const { result_digest: resultDigest, ...semantic } = result;
  invariant(resultDigest === sha256Canonical(semantic), "result_digest");
}

export function runTask6SimulatorGolden() {
  const source = task6PassingSealedReplayFixture();
  invariant(
    source.replay.evaluation_code_manifest.manifest_digest
      === "bbd166d7b453a35f2f6498c29df99c70d7dbc2f2036e2bd989fe08a4cd354f32",
    "code_manifest_lock",
  );
  const vault = createEvaluationSimulatorVault({
    record_mode: "development_fixture",
    vault_id: "vault.task6.simulator-golden",
    fault_rules: [],
  });
  const sealedTest = verifySealedTestReplay(vault, {
    record_mode: "development_fixture",
    replay: source.replay,
  });
  const evaluation = runSealedEvaluation({
    record_mode: "development_fixture",
    vault,
    sealed_test: sealedTest,
    attempt_id: "attempt.task6.simulator-golden",
    opened_at: source.openedAt,
    actor_ref: "actor.task6.simulator-golden-evaluator",
  });
  invariant(evaluation.evaluation_record.payload.evaluation_state === "passed", "evaluation_state");
  invariant(evaluation.attempt_status.state === "completed", "attempt_state");
  invariant(evaluation.overall_metrics.candidate_accuracy.bits === "3feccccccccccccd", "accuracy_bits");
  invariant(evaluation.overall_metrics.candidate_log_loss.bits === "3fd35bdb4669bd8b", "loss_bits");
  invariant(evaluation.overall_metrics.baseline_log_loss.bits === "3ff9d4c8d28382b0", "baseline_loss_bits");
  invariant(evaluation.bootstrap?.replicate_count === 10_000, "bootstrap_count");
  assertRecordDigest(evaluation.evaluation_record);
  assertResultDigest(evaluation);

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
  const shadowHandle = startShadowSimulation(vault, {
    record_mode: "development_fixture",
    plan,
    sealed_test: sealedTest,
    shadow_run_id: "shadow.run.task6.simulator-golden",
    actor_ref: "actor.task6.simulator-golden-shadow-start",
  });
  const expectedBuildResult = freezeTask6FixtureValue(
    buildLearningDataset(source.replay.dataset_replay.build_input),
  );
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
      shadow_run_id: shadowHandle.shadow_run_id,
      observation_id: `shadow.observation.simulator-golden.${String(index).padStart(3, "0")}`,
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
    shadow: shadowHandle,
    ended_at: promotedAt,
    actor_ref: "actor.task6.simulator-golden-shadow-complete",
  });
  invariant(shadowResult.completion_state === "completed", "shadow_state");
  invariant(shadowResult.observation_count === 50, "shadow_count");
  invariant(shadowResult.leakage_group_count === 20, "shadow_groups");
  invariant(shadowResult.no_influence_verified, "shadow_influence");
  const { shadow_result_id: shadowResultId, result_digest: shadowResultDigest, ...shadowSemantic }
    = shadowResult;
  invariant(shadowResultDigest === sha256Canonical(shadowSemantic), "shadow_digest");
  invariant(shadowResultId === `shadow_result.${shadowResultDigest.slice(0, 32)}`, "shadow_id");

  const decision = createSimulatedPromotionDecision({
    record_mode: "development_fixture",
    evaluation,
    shadow_result: shadowResult,
    proposed_scope: source.replay.proposed_scope,
    actor_fixture_ref: auxiliaryRef(
      "actor_fixture.",
      "contentmd.simulated-actor-fixture",
      { actor: "task6-simulator-golden-reviewer" },
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
    actor_ref: "actor.task6.simulator-golden-binding",
    occurred_at: promotedAt,
  });
  invariant(promotion.transition_kind === "promotion", "promotion_kind");
  invariant(promotion.projection.state === "candidate", "promotion_state");
  assertResultDigest(promotion);

  const driftAt = "2026-10-04T19:00:00.000Z";
  const driftBuildInput = structuredClone(source.replay.dataset_replay.build_input);
  driftBuildInput.evaluation_at = driftAt;
  const driftBuildResult = buildLearningDataset(driftBuildInput);
  const drift = evaluateDriftWindow({
    record_mode: "development_fixture",
    vault,
    binding_stream_id: promotion.projection.stream_id,
    expected_head_digest: promotion.projection.verified_head_digest!,
    actor_ref: "actor.task6.simulator-golden-drift",
    previous_report: null,
    promotion_evaluation: evaluation,
    dataset_replay: {
      contract_version: "contentmd.drift-dataset-replay/0.1.0",
      build_input: driftBuildInput,
      expected_build_result: driftBuildResult,
    },
    currentness: currentnessAt(
      source.replay.currentness,
      driftAt,
      promotedAt,
      "2026-10-05T19:00:00.000Z",
    ),
    observations: [],
    evaluation_at: driftAt,
  });
  invariant(drift.report.payload.window_state === "monitoring_insufficient", "drift_state");
  invariant(drift.disposition === "review", "drift_disposition");
  assertRecordDigest(drift.report);
  assertResultDigest(drift);

  const secondDecision = createSimulatedPromotionDecision({
    record_mode: "development_fixture",
    evaluation,
    shadow_result: shadowResult,
    proposed_scope: source.replay.proposed_scope,
    actor_fixture_ref: auxiliaryRef(
      "actor_fixture.",
      "contentmd.simulated-actor-fixture",
      { actor: "task6-simulator-golden-second-reviewer" },
    ),
    rationale: "Create a second verified binding for rollback conformance.",
    decision: "approve_simulation",
    expected_head_digest: promotion.projection.verified_head_digest,
  });
  const secondPromotion = simulatePromotionBinding({
    record_mode: "development_fixture",
    vault,
    project_id: source.replay.proposed_scope.project_id,
    proposed_scope: source.replay.proposed_scope,
    baseline_ref: plan.payload.active_baseline_ref,
    evaluation,
    shadow_result: shadowResult,
    decision: secondDecision,
    actor_ref: "actor.task6.simulator-golden-second-binding",
    occurred_at: "2026-10-05T19:00:00.000Z",
  });
  invariant(secondPromotion.transition_kind === "promotion", "second_promotion_kind");
  assertResultDigest(secondPromotion);

  const rollbackAt = "2026-10-06T19:00:00.000Z";
  const rollback = simulateRollback({
    record_mode: "development_fixture",
    vault,
    binding_stream_id: secondPromotion.projection.stream_id,
    expected_head_digest: secondPromotion.projection.verified_head_digest!,
    requested_target_event_digest: null,
    ordered_target_replays: [{
      verified_binding_event_digest: promotion.projection.verified_head_digest!,
      model_record: source.replay.model_record,
      model_dependencies: source.replay.model_dependencies,
      currentness: currentnessAt(source.replay.currentness, rollbackAt, promotedAt, null),
    }],
    fallback_baseline_ref: plan.payload.active_baseline_ref,
    reason_code: "incident_recovery",
    actor_ref: "actor.task6.simulator-golden-rollback",
    occurred_at: rollbackAt,
  });
  invariant(rollback.transition_kind === "rollback", "rollback_kind");
  invariant(rollback.projection.state === "candidate", "rollback_state");
  assertResultDigest(rollback);

  const revokedAt = "2026-10-06T19:00:01.000Z";
  const qualificationRef = source.replay.qualification_denominator.source_refs[0]!;
  const suspension = propagateLearningRevocation({
    record_mode: "development_fixture",
    vault,
    binding_stream_id: rollback.projection.stream_id,
    expected_head_digest: rollback.projection.verified_head_digest!,
    revocation: revocationWitness(qualificationRef, revokedAt),
    actor_ref: "actor.task6.simulator-golden-revocation",
    occurred_at: revokedAt,
  });
  invariant(suspension !== null, "suspension_missing");
  invariant(suspension.transition_kind === "suspension", "suspension_kind");
  invariant(suspension.projection.state === "suspended", "suspension_state");
  assertResultDigest(suspension);

  const fallbackAt = "2026-10-06T19:00:02.000Z";
  const revokedTargetReplays = [...suspension.projection.superseded_verified_event_digests]
    .reverse()
    .map((verifiedBindingEventDigest) => ({
      verified_binding_event_digest: verifiedBindingEventDigest,
      model_record: source.replay.model_record,
      model_dependencies: source.replay.model_dependencies,
      currentness: currentnessAt(source.replay.currentness, fallbackAt, promotedAt, null),
    }));
  const fallback = simulateRollback({
    record_mode: "development_fixture",
    vault,
    binding_stream_id: suspension.projection.stream_id,
    expected_head_digest: suspension.projection.verified_head_digest!,
    requested_target_event_digest: null,
    ordered_target_replays: revokedTargetReplays,
    fallback_baseline_ref: plan.payload.active_baseline_ref,
    reason_code: "lineage_revocation",
    actor_ref: "actor.task6.simulator-golden-fallback",
    occurred_at: fallbackAt,
  });
  invariant(fallback.transition_kind === "fallback_baseline", "fallback_kind");
  invariant(fallback.projection.state === "baseline", "fallback_state");
  assertResultDigest(fallback);

  const fixture = {
    contract_version: "contentmd.task6-simulator-golden/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    code_manifest_digest: source.replay.evaluation_code_manifest.manifest_digest,
    runtime_profile_digest: source.replay.evaluation_runtime_profile.profile_digest,
    sealed_test: sealedTest,
    evaluation,
    shadow: { plan, handle: shadowHandle, result: shadowResult },
    promotion,
    drift,
    second_promotion: secondPromotion,
    rollback,
    suspension,
    fallback,
  };
  return {
    ...fixture,
    fixture_semantic_digest: sha256Canonical({
      contract_version: "contentmd.task6-simulator-golden-preimage/0.1.0",
      fixture,
    }),
  };
}

if (process.argv[1]?.endsWith("task6-simulator-golden-runner.ts")) {
  process.stdout.write(canonicalJson(runTask6SimulatorGolden()));
}
