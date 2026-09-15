import { readFileSync } from "node:fs";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  adaptContentDecisionEvent,
  buildLearningDataset,
  createEvaluationSimulatorVault,
  createSimulatedPromotionDecision,
  determineLearningEligibility,
  inspectShadowSimulation,
  qualifyFeedback,
  verifyPairwiseCandidate,
  type EvaluationRunResult,
  type VerifiedSealedTestHandle,
} from "@contentmd/learning";
import { authorizedEventStoreFixture } from "../../runtime-local/test/runtime-test-fixtures.js";
import {
  eligibilityFixture,
  preferenceFixture,
  qualificationFixture,
} from "../../learning/test/task2-fixtures.js";
import {
  task5DatasetReplayFixture,
  task5FeatureMatrixFixture,
} from "../../learning/test/task5-fixtures.js";
import { task6PassingSealedReplayFixture } from "../../learning/test/task6-fixtures.js";
import {
  runLearningDatasetPhase,
  runLearningDriftPhase,
  runLearningEvaluationPhase,
  runLearningExamplesPhase,
  runLearningPromotionPhase,
  runLearningRollbackPhase,
  runLearningShadowPhase,
  runLearningStatusPhase,
  runLearningTrainingPhase,
  type LearningWorkflowAuthority,
} from "../src/learning-workflow.js";

const PROJECT_ID = "project.task2.fixture";
const WORKFLOW_ID = "learning-workflow.task7.fixture";
const STREAM_ID = `learning-workflow-stream.${PROJECT_ID}`;
const DATA_CLASS = "learning-workflow-audit";
const temporaryDirectories: string[] = [];
// Replay verification is covered by the Task 6 golden suite; this fixture keeps
// the audit-ordering test bounded to the authority boundary it asserts.
const task6GoldenSealedTest = (JSON.parse(readFileSync(
  new URL("../../../fixtures/learning-ranking/task6-simulator-golden.json", import.meta.url),
  "utf8",
)) as { sealed_test: VerifiedSealedTestHandle }).sealed_test;

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => (
    rm(directory, { recursive: true, force: true })
  )));
});

async function projectRoot(): Promise<string> {
  const root = await mkdtemp(join(tmpdir(), "contentmd-learning-workflow-"));
  temporaryDirectories.push(root);
  return root;
}

async function phaseAuthority(
  fixture: Awaited<ReturnType<typeof authorizedEventStoreFixture>>,
  operationId: string,
  expectedHeadDigest: string | null,
): Promise<LearningWorkflowAuthority> {
  const query = { stream_id: STREAM_ID, after_sequence: 0, maximum_records: 100 };
  return {
    store: fixture.store,
    read_operation: await fixture.issue(
      "runtime.event.read",
      [{ resource_id: STREAM_ID, content_digest: null }],
      [DATA_CLASS],
      query,
      100,
    ),
    append_operation: await fixture.issue(
      "runtime.event.append",
      [{ resource_id: STREAM_ID, content_digest: expectedHeadDigest }],
      [DATA_CLASS],
      { operation_id: operationId, expected_head_digest: expectedHeadDigest },
      1,
    ),
    stream_id: STREAM_ID,
    expected_head_digest: expectedHeadDigest,
    workflow_id: WORKFLOW_ID,
    project_id: PROJECT_ID,
    operation_id: operationId,
    actor_ref: "actor.task7.learning-operator",
    occurred_at: "2026-08-23T12:00:00.000Z",
  };
}

async function appendWorkflowAuditFixture(
  fixture: Awaited<ReturnType<typeof authorizedEventStoreFixture>>,
  phase: "promote" | "drift",
  resultDigest: string,
  expectedHeadDigest: string | null,
) {
  const payload = {
    contract_version: "contentmd.learning-workflow-audit/0.1.0" as const,
    workflow_id: WORKFLOW_ID,
    project_id: PROJECT_ID,
    operation_id: `operation.task7.${phase}-fixture`,
    phase,
    result_digest: resultDigest,
    record_refs: [] as string[],
    reason_codes: [] as string[],
    denominators: [] as Array<{ name: string; value: number }>,
    exclusions: [] as string[],
    authority_effect: "none" as const,
  };
  const command = {
    event_id: `learning-workflow-event.task7.${phase}-fixture`,
    stream_id: STREAM_ID,
    event_type: `learning_workflow_${phase}_completed`,
    occurred_at: "2026-08-23T11:00:00.000Z",
    actor_ref: "actor.task7.learning-operator",
    data_class: DATA_CLASS,
    payload,
    expected_head_digest: expectedHeadDigest,
  };
  return fixture.store.append(command, await fixture.issue(
    "runtime.event.append",
    [{ resource_id: STREAM_ID, content_digest: expectedHeadDigest }],
    [DATA_CLASS],
    command,
    1,
  ));
}

describe("governed recursive learning workflow", () => {
  it("rejects shadow evaluation bytes not bound by the prior append-only audit", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    try {
      const vault = createEvaluationSimulatorVault({
        record_mode: "development_fixture",
        vault_id: "vault.task7.shadow-audit-mismatch",
        fault_rules: [],
      });
      const sealedTest = task6GoldenSealedTest;
      const priorPayload = {
        contract_version: "contentmd.learning-workflow-audit/0.1.0" as const,
        workflow_id: WORKFLOW_ID,
        project_id: PROJECT_ID,
        operation_id: "operation.task7.evaluate-prior",
        phase: "evaluate" as const,
        result_digest: "f".repeat(64),
        record_refs: [] as string[],
        reason_codes: [] as string[],
        denominators: [] as Array<{ name: string; value: number }>,
        exclusions: [] as string[],
        authority_effect: "none" as const,
      };
      const priorCommand = {
        event_id: "learning-workflow-event.task7.evaluate-prior",
        stream_id: STREAM_ID,
        event_type: "learning_workflow_evaluate_completed",
        occurred_at: "2026-08-23T11:00:00.000Z",
        actor_ref: "actor.task7.learning-operator",
        data_class: DATA_CLASS,
        payload: priorPayload,
        expected_head_digest: null,
      };
      const prior = await events.store.append(priorCommand, await events.issue(
        "runtime.event.append",
        [{ resource_id: STREAM_ID, content_digest: null }],
        [DATA_CLASS],
        priorCommand,
        1,
      ));
      const forgedEvaluation = {
        predicate: { evaluation_passed: true },
        evaluation_record: {
          record_id: "learning_evaluation.forged",
          payload: {
            evaluation_state: "passed",
            model_ref: sealedTest.model_ref,
          },
        },
        result_digest: "0".repeat(64),
      } as unknown as EvaluationRunResult;
      await expect(runLearningShadowPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.shadow-audit-mismatch",
          prior.event_digest,
        ),
        vault,
        sealed_test: sealedTest,
        evaluation: forgedEvaluation,
        start_at: "2026-08-25T19:00:00.000Z",
        earliest_end_at: "2026-09-03T19:00:00.000Z",
        proposed_end_at: "2026-09-04T19:00:00.000Z",
        input_selection_ref: sealedTest.test_population_ref,
        shadow_run_id: "shadow.run.task7.audit-mismatch",
        start_actor_ref: "actor.task7.shadow-start",
        observations: [],
        ended_at: "2026-09-04T19:00:00.000Z",
        completion_actor_ref: "actor.task7.shadow-complete",
      })).rejects.toThrow("learning_workflow_input_mismatch:evaluation_audit");
      expect(inspectShadowSimulation(vault, "shadow.run.task7.audit-mismatch")).toBeNull();
      const stored = await events.store.readStream({
        stream_id: STREAM_ID,
        after_sequence: 0,
        maximum_records: 100,
      }, await events.issue(
        "runtime.event.read",
        [{ resource_id: STREAM_ID, content_digest: null }],
        [DATA_CLASS],
        { stream_id: STREAM_ID, after_sequence: 0, maximum_records: 100 },
        100,
      ));
      expect(stored).toHaveLength(1);
      expect(stored[0]?.event_digest).toBe(prior.event_digest);
    } finally {
      await events.close();
    }
  }, 300_000);

  it("runs real examples, dataset, and deterministic training with one fresh durable authority per phase", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    try {
      const qualification = qualificationFixture(adaptContentDecisionEvent);
      const expectedQualification = qualifyFeedback(qualification.input);
      const eligibilityInput = eligibilityFixture(
        expectedQualification,
        qualification.evidence,
        qualification.adapted.decision,
      );
      const expectedEligibility = determineLearningEligibility(eligibilityInput);
      const examples = await runLearningExamplesPhase({
        authority: await phaseAuthority(events, "operation.task7.examples", null),
        qualification_input: qualification.input,
        eligibility_input: eligibilityInput,
        preference_input: preferenceFixture(
          expectedQualification,
          expectedEligibility,
          eligibilityInput,
          qualification.adapted.decision,
          qualification.evidence,
        ),
      });

      expect(examples.data.qualification.payload.qualification_state).toBe("qualified");
      expect(examples.data.eligibility.payload.eligibility_state).toBe("eligible");
      expect(examples.data.preference?.payload.label).toBe(1);
      expect(examples.audit).toMatchObject({
        phase: "examples",
        sequence: 1,
        authority_effect: "none",
        record_refs: [
          examples.data.qualification.record_id,
          examples.data.eligibility.record_id,
          examples.data.preference!.record_id,
        ],
      });

      const datasetReplay = task5DatasetReplayFixture();
      const dataset = await runLearningDatasetPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.dataset",
          examples.audit.event_digest,
        ),
        build_input: datasetReplay.build_input,
        seal: datasetReplay.seal,
      });

      expect(dataset.data.build.diagnostics.issuance_disposition).toBe("manifest_issued");
      expect(dataset.data.dataset?.payload.dataset_state).toBe("sealed");
      expect(dataset.audit.phase).toBe("dataset");
      expect(dataset.audit.sequence).toBe(2);
      expect(dataset.audit.denominators).toEqual([
        { name: "excluded_examples", value: 0 },
        { name: "included_examples", value: 120 },
        { name: "submitted_examples", value: 120 },
      ]);

      const request = task6PassingSealedReplayFixture()
        .replay.model_dependencies.training_request;
      const training = await runLearningTrainingPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.train",
          dataset.audit.event_digest,
        ),
        request,
      });

      expect(training.data.state).toBe("trained");
      expect(training.audit).toMatchObject({
        phase: "train",
        sequence: 3,
        authority_effect: "none",
        reason_codes: [],
      });
      expect(training.audit.record_refs).toEqual([
        training.data.state === "trained" ? training.data.statistics_record.record_id : "",
        training.data.state === "trained" ? training.data.model_record.record_id : "",
      ]);

      const evaluationSource = task6PassingSealedReplayFixture();
      const vault = createEvaluationSimulatorVault({
        record_mode: "development_fixture",
        vault_id: "vault.task7.learning-evaluation",
        fault_rules: [],
      });
      const evaluation = await runLearningEvaluationPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.evaluate",
          training.audit.event_digest,
        ),
        vault,
        replay: evaluationSource.replay,
        attempt_id: "attempt.task7.learning-evaluation",
        opened_at: evaluationSource.openedAt,
        actor_ref: "actor.task7.learning-evaluator",
      });

      expect(evaluation.data.result.evaluation_record.payload.evaluation_state).toBe("passed");
      expect(evaluation.data.result.authority_effect).toBe("none");
      expect(evaluation.audit).toMatchObject({
        phase: "evaluate",
        sequence: 4,
        authority_effect: "none",
        record_refs: [
          evaluation.data.sealed_test.handle_id,
          evaluation.data.result.evaluation_record.record_id,
        ],
        denominators: [
          { name: "decisive_pairs", value: 20 },
          { name: "evaluation_failures", value: 0 },
          { name: "leakage_groups", value: 5 },
        ],
      });

      const shadowStartAt = evaluationSource.replay.dataset_replay.build_input.evaluation_at;
      const shadowBuild = buildLearningDataset(
        evaluationSource.replay.dataset_replay.build_input,
      );
      const shadowCandidates = evaluationSource.shadowPairs.map((pair) => [
        verifyPairwiseCandidate({
          record_mode: "development_fixture",
          profile: evaluationSource.replay.feature_profile,
          replay: pair.candidate_a,
        }),
        verifyPairwiseCandidate({
          record_mode: "development_fixture",
          profile: evaluationSource.replay.feature_profile,
          replay: pair.candidate_b,
        }),
      ] as const);
      const shadow = await runLearningShadowPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.shadow",
          evaluation.audit.event_digest,
        ),
        vault,
        sealed_test: evaluation.data.sealed_test,
        evaluation: evaluation.data.result,
        start_at: shadowStartAt,
        earliest_end_at: "2026-09-03T19:00:00.000Z",
        proposed_end_at: "2026-09-04T19:00:00.000Z",
        input_selection_ref: evaluation.data.sealed_test.test_population_ref,
        shadow_run_id: "shadow.run.task7.learning",
        start_actor_ref: "actor.task7.shadow-start",
        observations: Array.from({ length: 50 }, (_, index) => {
          const pairIndex = index % evaluationSource.shadowPairs.length;
          const pair = evaluationSource.shadowPairs[pairIndex]!;
          return {
            observation_id: `shadow.observation.task7.${String(index).padStart(3, "0")}`,
            observed_at: shadowStartAt,
            outcome_replay: {
              dataset: {
                contract_version: "contentmd.drift-dataset-replay/0.1.0" as const,
                build_input: evaluationSource.replay.dataset_replay.build_input,
                expected_build_result: shadowBuild,
              },
              pair: {
                example_ref: pair.example_ref,
                leakage_group_ref: pair.leakage_group_ref,
                candidate_a: pair.candidate_a,
                candidate_b: pair.candidate_b,
                risk_slice_witness: pair.risk_slice_witness,
              },
            },
            candidates: shadowCandidates[pairIndex]!,
          };
        }),
        ended_at: "2026-09-04T19:00:00.000Z",
        completion_actor_ref: "actor.task7.shadow-complete",
      });

      expect(shadow.data.result).toMatchObject({
        completion_state: "completed",
        observation_count: 50,
        decisive_pair_count: 50,
        leakage_group_count: 20,
        no_influence_verified: true,
        authority_effect: "none",
      });
      expect(shadow.audit).toMatchObject({
        phase: "shadow",
        sequence: 5,
        authority_effect: "none",
        denominators: [
          { name: "decisive_pairs", value: 50 },
          { name: "leakage_groups", value: 20 },
          { name: "observations", value: 50 },
        ],
      });

      const actorFixtureDigest = sha256Canonical({
        actor: "task7-governance-reviewer",
      });
      const promotionDecision = createSimulatedPromotionDecision({
        record_mode: "development_fixture",
        evaluation: evaluation.data.result,
        shadow_result: shadow.data.result,
        proposed_scope: evaluationSource.replay.proposed_scope,
        actor_fixture_ref: {
          record_id: `actor_fixture.${actorFixtureDigest.slice(0, 32)}`,
          schema_id: "contentmd.simulated-actor-fixture",
          schema_version: "0.1.0",
          content_digest: actorFixtureDigest,
        },
        rationale: "The sealed evaluation passed and the complete shadow verified no influence.",
        decision: "approve_simulation",
        expected_head_digest: null,
      });
      const promotion = await runLearningPromotionPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.promote-approved",
          shadow.audit.event_digest,
        ),
        vault,
        sealed_test: evaluation.data.sealed_test,
        project_id: PROJECT_ID,
        proposed_scope: evaluationSource.replay.proposed_scope,
        baseline_ref: shadow.data.plan.payload.active_baseline_ref,
        evaluation: evaluation.data.result,
        shadow: shadow.data,
        decision: promotionDecision,
        actor_ref: "actor.task7.binding-simulator",
        occurred_at: "2026-09-04T19:00:00.000Z",
      });

      expect(promotion.data.decision).toEqual(promotionDecision);
      expect(promotion.data.transition).toMatchObject({
        transition_kind: "promotion",
        authority_effect: "none",
        projection: {
          state: "candidate",
          projection_stage: "verified",
        },
      });
      expect(promotion.audit).toMatchObject({
        phase: "promote",
        sequence: 6,
        authority_effect: "none",
        reason_codes: [],
        exclusions: [],
      });

      const promotedAt = "2026-09-04T19:00:00.000Z";
      const evaluationAt = "2026-10-04T19:00:00.000Z";
      const driftBuildInput = structuredClone(
        evaluationSource.replay.dataset_replay.build_input,
      );
      driftBuildInput.evaluation_at = evaluationAt;
      const driftBuildResult = buildLearningDataset(driftBuildInput);
      const {
        witness_id: _priorWitnessId,
        witness_digest: _priorWitnessDigest,
        ...currentnessBase
      } = evaluationSource.replay.currentness;
      const currentnessIdentity = {
        ...currentnessBase,
        checked_at: evaluationAt,
        entries: evaluationSource.replay.currentness.entries.map((entry) => ({
          ...entry,
          effective_at: promotedAt,
          expires_at: "2026-10-05T19:00:00.000Z",
        })),
      };
      const currentnessDigest = sha256Canonical(currentnessIdentity);
      const promotionTransition = promotion.data.transition!;
      const drift = await runLearningDriftPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.drift",
          promotion.audit.event_digest,
        ),
        promotion: promotion.data,
        request: {
          record_mode: "development_fixture",
          vault,
          binding_stream_id: promotionTransition.projection.stream_id,
          expected_head_digest: promotionTransition.projection.verified_head_digest!,
          actor_ref: "actor.task7.drift-monitor",
          previous_report: null,
          promotion_evaluation: evaluation.data.result,
          dataset_replay: {
            contract_version: "contentmd.drift-dataset-replay/0.1.0",
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
        },
      });

      expect(drift.data.result).toMatchObject({
        disposition: "review",
        authority_effect: "none",
        metric_delta: { window_state: "monitoring_insufficient" },
        suspension_transition: null,
      });
      expect(drift.audit).toMatchObject({
        phase: "drift",
        sequence: 7,
        reason_codes: ["drift_review"],
        exclusions: ["monitoring_insufficient"],
      });

      const rollbackRequest = {
        record_mode: "development_fixture" as const,
        vault,
        binding_stream_id: promotionTransition.projection.stream_id,
        expected_head_digest: promotionTransition.projection.verified_head_digest!,
        requested_target_event_digest: null,
        ordered_target_replays: [],
        fallback_baseline_ref: shadow.data.plan.payload.active_baseline_ref,
        reason_code: "operator_simulation" as const,
        actor_ref: "actor.task7.rollback-operator",
        occurred_at: evaluationAt,
      };
      const forgedDrift = structuredClone(drift.data);
      forgedDrift.result.result_digest = "0".repeat(64);
      await expect(runLearningRollbackPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.rollback-forged-drift",
          drift.audit.event_digest,
        ),
        promotion: promotion.data,
        drift: forgedDrift,
        request: rollbackRequest,
      })).rejects.toThrow("learning_workflow_input_mismatch:drift_audit");

      const rollback = await runLearningRollbackPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.rollback",
          drift.audit.event_digest,
        ),
        promotion: promotion.data,
        drift: drift.data,
        request: rollbackRequest,
      });

      expect(rollback.data.transition).toMatchObject({
        transition_kind: "fallback_baseline",
        authority_effect: "none",
        projection: {
          state: "baseline",
          projection_stage: "verified",
        },
      });
      expect(rollback.audit).toMatchObject({
        phase: "rollback",
        sequence: 8,
        reason_codes: ["rollback_fallback_baseline"],
        exclusions: [],
      });

      const readOperation = await events.issue(
        "runtime.event.read",
        [{ resource_id: STREAM_ID, content_digest: null }],
        [DATA_CLASS],
        { stream_id: STREAM_ID, after_sequence: 0, maximum_records: 100 },
        100,
      );
      const stored = await events.store.readStream({
        stream_id: STREAM_ID,
        after_sequence: 0,
        maximum_records: 100,
      }, readOperation);
      expect(stored.map(({ event_type }) => event_type)).toEqual([
        "learning_workflow_examples_completed",
        "learning_workflow_dataset_completed",
        "learning_workflow_train_completed",
        "learning_workflow_evaluate_completed",
        "learning_workflow_shadow_completed",
        "learning_workflow_promote_completed",
        "learning_workflow_drift_completed",
        "learning_workflow_rollback_completed",
      ]);
      expect(stored.every(({ payload }) => JSON.stringify(payload).includes("expression") === false))
        .toBe(true);
    } finally {
      await events.close();
    }
  }, 1_500_000);

  it("reports durable workflow status without inferring any completed phase", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    try {
      const query = { stream_id: STREAM_ID, after_sequence: 0, maximum_records: 100 };
      const status = await runLearningStatusPhase({
        authority: await phaseAuthority(events, "operation.task7.status", null),
        inspection_operation: await events.issue(
          "runtime.event.read",
          [{ resource_id: STREAM_ID, content_digest: null }],
          [DATA_CLASS],
          query,
          100,
        ),
      });

      expect(status.data).toEqual({
        workflow_id: WORKFLOW_ID,
        project_id: PROJECT_ID,
        stream_id: STREAM_ID,
        completed_phases: [],
        last_completed_phase: null,
        latest_event_digest: null,
        authority_effect: "none",
      });
      expect(status.audit).toMatchObject({
        phase: "status",
        sequence: 1,
        authority_effect: "none",
        reason_codes: ["learning_workflow_not_started"],
      });
    } finally {
      await events.close();
    }
  });

  it("rejects a reused append authority and never infers approval from workflow progress", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    try {
      const qualification = qualificationFixture(adaptContentDecisionEvent);
      const expectedQualification = qualifyFeedback(qualification.input);
      const eligibilityInput = eligibilityFixture(
        expectedQualification,
        qualification.evidence,
        qualification.adapted.decision,
      );
      const expectedEligibility = determineLearningEligibility(eligibilityInput);
      const authority = await phaseAuthority(events, "operation.task7.replay", null);
      const input = {
        authority,
        qualification_input: qualification.input,
        eligibility_input: eligibilityInput,
        preference_input: preferenceFixture(
          expectedQualification,
          expectedEligibility,
          eligibilityInput,
          qualification.adapted.decision,
          qualification.evidence,
        ),
      };
      const first = await runLearningExamplesPhase(input);
      const replayRead = await events.issue(
        "runtime.event.read",
        [{ resource_id: STREAM_ID, content_digest: null }],
        [DATA_CLASS],
        { stream_id: STREAM_ID, after_sequence: 0, maximum_records: 100 },
        100,
      );

      await expect(runLearningExamplesPhase({
        ...input,
        authority: {
          ...authority,
          read_operation: replayRead,
          expected_head_digest: first.audit.event_digest,
          operation_id: "operation.task7.replay-again",
        },
      })).rejects.toThrow("runtime_binding_not_authorized");
    } finally {
      await events.close();
    }
  }, 60_000);

  it("does not let training skip the required examples and dataset audit lineage", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    let reads = 0;
    const trappedRequest = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("training input read before workflow preflight");
      },
    });
    try {
      await expect(runLearningTrainingPhase({
        authority: await phaseAuthority(events, "operation.task7.train-too-early", null),
        request: trappedRequest as never,
      })).rejects.toThrow("learning_workflow_prerequisite_missing:train:dataset");
      expect(reads).toBe(0);
    } finally {
      await events.close();
    }
  }, 180_000);

  it.each([
    ["drift", runLearningDriftPhase],
    ["rollback", runLearningRollbackPhase],
  ] as const)("does not let %s inspect simulator input before a durable promotion audit", async (
    phase,
    runPhase,
  ) => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    let reads = 0;
    const trapped = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("simulator input read before workflow preflight");
      },
    });
    try {
      await expect(runPhase({
        authority: await phaseAuthority(
          events,
          `operation.task7.${phase}-too-early`,
          null,
        ),
        promotion: trapped,
        ...(phase === "rollback" ? { drift: null } : {}),
        request: trapped,
      } as never)).rejects.toThrow(
        `learning_workflow_prerequisite_missing:${phase}:promote`,
      );
      expect(reads).toBe(0);
    } finally {
      await events.close();
    }
  });

  it("rejects rollback evidence that does not match the exact prior drift audit", async () => {
    const root = await projectRoot();
    const events = await authorizedEventStoreFixture({
      root,
      project_id: PROJECT_ID,
      permitted_data_classes: [DATA_CLASS],
    });
    const promotion = { decision: { decision_id: "decision.fixture" }, transition: null };
    const drift = { result: { result_digest: "a".repeat(64) } };
    try {
      const promoted = await appendWorkflowAuditFixture(
        events,
        "promote",
        sha256Canonical(promotion),
        null,
      );
      const drifted = await appendWorkflowAuditFixture(
        events,
        "drift",
        sha256Canonical(drift),
        promoted.event_digest,
      );
      const forgedDrift = structuredClone(drift);
      forgedDrift.result.result_digest = "b".repeat(64);
      await expect(runLearningRollbackPhase({
        authority: await phaseAuthority(
          events,
          "operation.task7.rollback-drift-mismatch",
          drifted.event_digest,
        ),
        promotion,
        drift: forgedDrift,
        request: {},
      } as never)).rejects.toThrow("learning_workflow_input_mismatch:drift_audit");
    } finally {
      await events.close();
    }
  });

  it("uses the exact Task 5 matrix fixture as an independently verified training input", () => {
    const fixture = task5FeatureMatrixFixture();
    expect(fixture.replay.rows).toHaveLength(80);
    expect(fixture.datasetReplay.expected_dataset_record.payload.dataset_state).toBe("sealed");
  }, 180_000);
});
