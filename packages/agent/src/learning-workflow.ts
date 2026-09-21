import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  buildLearningDataset,
  completeShadowSimulation,
  createSimulatedPromotionDecision,
  createShadowEvaluationPlan,
  createPreferenceExample,
  determineLearningEligibility,
  evaluateDriftWindow,
  observeShadowSimulation,
  qualifyFeedback,
  runSealedEvaluation,
  sealLearningDataset,
  simulatePromotionBinding,
  simulateRollback,
  startShadowSimulation,
  trainPairwiseLogistic,
  verifySealedTestReplay,
  type EvaluationRunResult,
  type EvaluateDriftWindowInput,
  type EvaluationSimulatorVault,
  type FeedbackQualificationInput,
  type LearningEligibilityInput,
  type LearningDriftResult,
  type PairwiseTrainingRequest,
  type PairwiseTrainingResult,
  type PreferenceExampleInput,
  type ProposedBindingScope,
  type SealedTestReplay,
  type SealLearningDatasetInput,
  type SimulateRollbackInput,
  type ShadowEvaluationPlan,
  type ShadowObservationInput,
  type ShadowObservationResponse,
  type ShadowRunResult,
  type ShadowSimulationHandle,
  type SimulatedBindingTransitionResult,
  type SimulatedPromotionDecision,
  type BuildLearningDatasetInput,
  type Task6ObjectRef,
  type VerifiedSealedTestHandle,
} from "@contentmd/learning";
import type {
  AuthorizedAppendOnlyEventStore,
  AuthorizedRuntimeOperation,
} from "@contentmd/runtime-sdk";

export type LearningWorkflowPhase =
  | "examples"
  | "dataset"
  | "train"
  | "evaluate"
  | "shadow"
  | "promote"
  | "status"
  | "drift"
  | "rollback";

export interface LearningWorkflowAuthority {
  readonly store: AuthorizedAppendOnlyEventStore;
  readonly read_operation: AuthorizedRuntimeOperation;
  readonly append_operation: AuthorizedRuntimeOperation;
  readonly stream_id: string;
  readonly expected_head_digest: string | null;
  readonly workflow_id: string;
  readonly project_id: string;
  readonly operation_id: string;
  readonly actor_ref: string;
  readonly occurred_at: string;
}

export interface LearningWorkflowDenominator {
  readonly name: string;
  readonly value: number;
}

export interface LearningWorkflowAuditRecord {
  readonly contract_version: "contentmd.learning-workflow-audit/0.1.0";
  readonly workflow_id: string;
  readonly project_id: string;
  readonly operation_id: string;
  readonly phase: LearningWorkflowPhase;
  readonly result_digest: string;
  readonly record_refs: readonly string[];
  readonly reason_codes: readonly string[];
  readonly denominators: readonly LearningWorkflowDenominator[];
  readonly exclusions: readonly string[];
  readonly authority_effect: "none";
  readonly sequence: number;
  readonly event_digest: string;
}

export interface LearningWorkflowPhaseResult<T> {
  readonly data: T;
  readonly audit: LearningWorkflowAuditRecord;
}

export interface RunLearningExamplesPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly qualification_input: FeedbackQualificationInput;
  readonly eligibility_input: LearningEligibilityInput;
  readonly preference_input: PreferenceExampleInput | null;
}

export interface LearningExamplesPhaseData {
  readonly qualification: ReturnType<typeof qualifyFeedback>;
  readonly eligibility: ReturnType<typeof determineLearningEligibility>;
  readonly preference: ReturnType<typeof createPreferenceExample> | null;
}

export interface RunLearningDatasetPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly build_input: BuildLearningDatasetInput;
  readonly seal: Omit<SealLearningDatasetInput, "record_mode" | "source_manifest">;
}

export interface LearningDatasetPhaseData {
  readonly build: ReturnType<typeof buildLearningDataset>;
  readonly dataset: ReturnType<typeof sealLearningDataset> | null;
}

export interface RunLearningTrainingPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly request: PairwiseTrainingRequest;
}

export interface RunLearningEvaluationPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly vault: EvaluationSimulatorVault;
  readonly replay: SealedTestReplay;
  readonly attempt_id: string;
  readonly opened_at: string;
  readonly actor_ref: string;
}

export interface LearningEvaluationPhaseData {
  readonly sealed_test: VerifiedSealedTestHandle;
  readonly result: EvaluationRunResult;
}

export interface LearningShadowObservationInput extends Omit<
  ShadowObservationInput,
  "record_mode" | "vault" | "shadow_run_id"
> {}

export interface RunLearningShadowPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly vault: EvaluationSimulatorVault;
  readonly sealed_test: VerifiedSealedTestHandle;
  readonly evaluation: EvaluationRunResult;
  readonly start_at: string;
  readonly earliest_end_at: string;
  readonly proposed_end_at: string;
  readonly input_selection_ref: Task6ObjectRef;
  readonly shadow_run_id: string;
  readonly start_actor_ref: string;
  readonly observations: readonly LearningShadowObservationInput[];
  readonly ended_at: string;
  readonly completion_actor_ref: string;
}

export interface LearningShadowPhaseData {
  readonly plan: ShadowEvaluationPlan;
  readonly shadow: ShadowSimulationHandle;
  readonly responses: readonly ShadowObservationResponse[];
  readonly result: ShadowRunResult;
}

export interface RunLearningPromotionPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly vault: EvaluationSimulatorVault;
  readonly sealed_test: VerifiedSealedTestHandle;
  readonly project_id: string;
  readonly proposed_scope: ProposedBindingScope;
  readonly baseline_ref: Task6ObjectRef;
  readonly evaluation: EvaluationRunResult;
  readonly shadow: LearningShadowPhaseData;
  readonly decision: SimulatedPromotionDecision;
  readonly actor_ref: string;
  readonly occurred_at: string;
}

export interface LearningPromotionPhaseData {
  readonly decision: SimulatedPromotionDecision;
  readonly transition: SimulatedBindingTransitionResult | null;
}

export interface RunLearningDriftPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly promotion: LearningPromotionPhaseData;
  readonly request: EvaluateDriftWindowInput;
}

export interface LearningDriftPhaseData {
  readonly result: LearningDriftResult;
}

export interface RunLearningRollbackPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly promotion: LearningPromotionPhaseData;
  readonly drift: LearningDriftPhaseData | null;
  readonly request: SimulateRollbackInput;
}

export interface LearningRollbackPhaseData {
  readonly transition: SimulatedBindingTransitionResult;
}

export interface RunLearningStatusPhaseInput {
  readonly authority: LearningWorkflowAuthority;
  readonly inspection_operation: AuthorizedRuntimeOperation;
}

export interface LearningWorkflowStatusData {
  readonly workflow_id: string;
  readonly project_id: string;
  readonly stream_id: string;
  readonly completed_phases: readonly LearningWorkflowPhase[];
  readonly last_completed_phase: LearningWorkflowPhase | null;
  readonly latest_event_digest: string | null;
  readonly authority_effect: "none";
}

interface AuditSummary {
  readonly record_refs: readonly string[];
  readonly reason_codes: readonly string[];
  readonly denominators: readonly LearningWorkflowDenominator[];
  readonly exclusions: readonly string[];
}

interface AuditResultBinding {
  readonly phase: LearningWorkflowPhase;
  readonly result_digest: string | null;
  readonly mismatch_code: string;
}

interface PreparedAuditAppend {
  readonly authority: LearningWorkflowAuthority;
  readonly phase: LearningWorkflowPhase;
  readonly expected_head_digest: string | null;
}

const DATA_CLASS = "learning-workflow-audit";
const PHASE_ORDER: readonly LearningWorkflowPhase[] = [
  "examples", "dataset", "train", "evaluate", "shadow", "promote", "status", "drift", "rollback",
];

function fail(code: string): never {
  throw new Error(code);
}

function requireText(value: string, field: string): void {
  if (value.trim().length === 0) fail(`learning_workflow_input_invalid:${field}`);
}

function sortedUnique(values: readonly string[]): string[] {
  return [...new Set(values)].sort((left, right) => Buffer.compare(
    Buffer.from(left, "utf8"),
    Buffer.from(right, "utf8"),
  ));
}

function validateAuthority(authority: LearningWorkflowAuthority): void {
  for (const [field, value] of [
    ["stream_id", authority.stream_id],
    ["workflow_id", authority.workflow_id],
    ["project_id", authority.project_id],
    ["operation_id", authority.operation_id],
    ["actor_ref", authority.actor_ref],
    ["occurred_at", authority.occurred_at],
  ] as const) requireText(value, field);
  if (!Number.isFinite(Date.parse(authority.occurred_at))) {
    fail("learning_workflow_input_invalid:occurred_at");
  }
}

function phaseFromPayload(payload: unknown): LearningWorkflowPhase {
  if (payload === null || typeof payload !== "object" || Array.isArray(payload)) {
    fail("learning_workflow_audit_invalid:payload");
  }
  const phase = (payload as { phase?: unknown }).phase;
  if (typeof phase !== "string" || !PHASE_ORDER.includes(phase as LearningWorkflowPhase)) {
    fail("learning_workflow_audit_invalid:phase");
  }
  return phase as LearningWorkflowPhase;
}

function requirePrerequisite(
  phase: LearningWorkflowPhase,
  completed: ReadonlySet<LearningWorkflowPhase>,
): void {
  const prerequisite: Partial<Record<LearningWorkflowPhase, LearningWorkflowPhase>> = {
    dataset: "examples",
    train: "dataset",
    evaluate: "train",
    shadow: "evaluate",
    promote: "shadow",
    drift: "promote",
    rollback: "promote",
  };
  const required = prerequisite[phase];
  if (required !== undefined && !completed.has(required)) {
    fail(`learning_workflow_prerequisite_missing:${phase}:${required}`);
  }
}

async function prepareAuditAppend(
  authority: LearningWorkflowAuthority,
  phase: LearningWorkflowPhase,
  resultBindings: readonly AuditResultBinding[] = [],
): Promise<PreparedAuditAppend> {
  validateAuthority(authority);
  const events = await authority.store.readStream({
    stream_id: authority.stream_id,
    after_sequence: 0,
    maximum_records: 100,
  }, authority.read_operation);
  const eventPhases = events.map((event) => {
    const eventPhase = phaseFromPayload(event.payload);
    if (event.event_type !== `learning_workflow_${eventPhase}_completed`) {
      fail("learning_workflow_audit_invalid:event_type");
    }
    const payload = event.payload as {
      contract_version?: unknown;
      workflow_id?: unknown;
      project_id?: unknown;
    };
    if (payload.contract_version !== "contentmd.learning-workflow-audit/0.1.0") {
      fail("learning_workflow_audit_invalid:contract_version");
    }
    if (payload.workflow_id !== authority.workflow_id || payload.project_id !== authority.project_id) {
      fail("learning_workflow_audit_invalid:scope");
    }
    return eventPhase;
  });
  const actualHead = events.at(-1)?.event_digest ?? null;
  if (actualHead !== authority.expected_head_digest) {
    fail("learning_workflow_head_mismatch");
  }
  requirePrerequisite(phase, new Set(eventPhases));
  for (const resultBinding of resultBindings) {
    const priorEvents = events.filter((_, index) => eventPhases[index] === resultBinding.phase);
    if (resultBinding.result_digest === null) {
      if (priorEvents.length !== 0) fail(resultBinding.mismatch_code);
    } else if (priorEvents.length !== 1
      || (priorEvents[0]!.payload as { result_digest?: unknown }).result_digest
        !== resultBinding.result_digest) {
      fail(resultBinding.mismatch_code);
    }
  }
  return Object.freeze({
    authority,
    phase,
    expected_head_digest: actualHead,
  });
}

async function appendAudit<T>(
  authority: LearningWorkflowAuthority,
  phase: LearningWorkflowPhase,
  data: T,
  summary: AuditSummary,
  prepared?: PreparedAuditAppend,
): Promise<LearningWorkflowPhaseResult<T>> {
  const auditPreparation = prepared ?? await prepareAuditAppend(authority, phase);
  if (auditPreparation.authority !== authority
    || auditPreparation.phase !== phase
    || auditPreparation.expected_head_digest !== authority.expected_head_digest) {
    fail("learning_workflow_audit_invalid:prepared_append");
  }
  const resultDigest = sha256Canonical(data);
  const payload = {
    contract_version: "contentmd.learning-workflow-audit/0.1.0" as const,
    workflow_id: authority.workflow_id,
    project_id: authority.project_id,
    operation_id: authority.operation_id,
    phase,
    result_digest: resultDigest,
    record_refs: [...summary.record_refs],
    reason_codes: sortedUnique(summary.reason_codes),
    denominators: [...summary.denominators].sort((left, right) => Buffer.compare(
      Buffer.from(left.name, "utf8"),
      Buffer.from(right.name, "utf8"),
    )),
    exclusions: sortedUnique(summary.exclusions),
    authority_effect: "none" as const,
  };
  const event = await authority.store.append({
    event_id: `learning-workflow-event.${sha256Canonical(payload).slice(0, 32)}`,
    stream_id: authority.stream_id,
    event_type: `learning_workflow_${phase}_completed`,
    occurred_at: authority.occurred_at,
    actor_ref: authority.actor_ref,
    data_class: DATA_CLASS,
    payload,
    expected_head_digest: authority.expected_head_digest,
  }, authority.append_operation);
  return {
    data,
    audit: Object.freeze({
      ...payload,
      record_refs: Object.freeze([...payload.record_refs]),
      reason_codes: Object.freeze([...payload.reason_codes]),
      denominators: Object.freeze(payload.denominators.map((entry) => Object.freeze({ ...entry }))),
      exclusions: Object.freeze([...payload.exclusions]),
      sequence: event.sequence,
      event_digest: event.event_digest,
    }),
  };
}

export async function runLearningExamplesPhase(
  input: RunLearningExamplesPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningExamplesPhaseData>> {
  const qualification = qualifyFeedback(input.qualification_input);
  if (canonicalJson(input.eligibility_input.qualification) !== canonicalJson(qualification)
    || canonicalJson(input.eligibility_input.qualification_input)
      !== canonicalJson(input.qualification_input)) {
    fail("learning_workflow_input_mismatch:qualification");
  }
  const eligibility = determineLearningEligibility(input.eligibility_input);
  const decisive = qualification.payload.outcome === "A" || qualification.payload.outcome === "B";
  const admitted = qualification.payload.qualification_state === "qualified"
    && eligibility.payload.eligibility_state === "eligible"
    && decisive;
  if (admitted && input.preference_input === null) {
    fail("learning_workflow_input_invalid:preference_input_missing");
  }
  if (input.preference_input !== null
    && (canonicalJson(input.preference_input.qualification) !== canonicalJson(qualification)
      || canonicalJson(input.preference_input.eligibility) !== canonicalJson(eligibility)
      || canonicalJson(input.preference_input.eligibility_input)
        !== canonicalJson(input.eligibility_input))) {
    fail("learning_workflow_input_mismatch:eligibility");
  }
  const preference = admitted
    ? createPreferenceExample(input.preference_input!)
    : null;
  const data = Object.freeze({ qualification, eligibility, preference });
  const exclusions = preference === null
    ? [
        `qualification:${qualification.payload.qualification_state}`,
        `eligibility:${eligibility.payload.eligibility_state}`,
        `outcome:${qualification.payload.outcome}`,
      ]
    : [];
  return appendAudit(input.authority, "examples", data, {
    record_refs: [
      qualification.record_id,
      eligibility.record_id,
      ...(preference === null ? [] : [preference.record_id]),
    ],
    reason_codes: [
      ...qualification.payload.reason_codes,
      ...eligibility.payload.reason_codes,
    ],
    denominators: [
      { name: "eligible_examples", value: preference === null ? 0 : 1 },
      { name: "submitted_examples", value: 1 },
    ],
    exclusions,
  });
}

export async function runLearningDatasetPhase(
  input: RunLearningDatasetPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningDatasetPhaseData>> {
  const build = buildLearningDataset(input.build_input);
  const dataset = build.manifest === null
    ? null
    : sealLearningDataset({
        ...input.seal,
        record_mode: input.build_input.record_mode,
        source_manifest: build.manifest,
      });
  const data = Object.freeze({ build, dataset });
  return appendAudit(input.authority, "dataset", data, {
    record_refs: [
      ...(build.manifest === null ? [] : [build.manifest.record_id]),
      ...(dataset === null ? [] : [dataset.record_id]),
    ],
    reason_codes: build.diagnostics.reason_codes,
    denominators: [
      { name: "excluded_examples", value: build.diagnostics.excluded_examples },
      { name: "included_examples", value: build.diagnostics.included_examples },
      { name: "submitted_examples", value: build.diagnostics.submitted_examples },
    ],
    exclusions: build.manifest?.payload.exclusions.map(({ reason_code }) => reason_code) ?? [],
  });
}

function trainingSummary(result: PairwiseTrainingResult): AuditSummary {
  if (result.state === "trained") {
    return {
      record_refs: [result.statistics_record.record_id, result.model_record.record_id],
      reason_codes: [],
      denominators: [{ name: "training_pairs", value: result.statistics_record.payload.pair_count }],
      exclusions: [],
    };
  }
  if (result.state === "nonconverged") {
    return {
      record_refs: [result.statistics_record.record_id, result.model_record.record_id],
      reason_codes: [result.error.code],
      denominators: [{ name: "training_pairs", value: result.statistics_record.payload.pair_count }],
      exclusions: ["training_nonconverged"],
    };
  }
  return {
    record_refs: result.statistics_record === null ? [] : [result.statistics_record.record_id],
    reason_codes: [result.error.code],
    denominators: result.statistics_record === null
      ? []
      : [{ name: "training_pairs", value: result.statistics_record.payload.pair_count }],
    exclusions: ["training_invalid"],
  };
}

export async function runLearningTrainingPhase(
  input: RunLearningTrainingPhaseInput,
): Promise<LearningWorkflowPhaseResult<PairwiseTrainingResult>> {
  const result = trainPairwiseLogistic(input.request);
  return appendAudit(input.authority, "train", result, trainingSummary(result));
}

export async function runLearningEvaluationPhase(
  input: RunLearningEvaluationPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningEvaluationPhaseData>> {
  const sealedTest = verifySealedTestReplay(input.vault, {
    record_mode: "development_fixture",
    replay: input.replay,
  });
  const result = runSealedEvaluation({
    record_mode: "development_fixture",
    vault: input.vault,
    sealed_test: sealedTest,
    attempt_id: input.attempt_id,
    opened_at: input.opened_at,
    actor_ref: input.actor_ref,
  });
  const data = Object.freeze({ sealed_test: sealedTest, result });
  const metrics = result.overall_metrics;
  return appendAudit(input.authority, "evaluate", data, {
    record_refs: [
      sealedTest.handle_id,
      result.evaluation_record.record_id,
      ...result.failures.map(({ failure_id }) => failure_id),
    ],
    reason_codes: result.failures.map(({ reason_code }) => reason_code),
    denominators: [
      {
        name: "decisive_pairs",
        value: metrics.contract_version === "contentmd.evaluation-metric-result/0.1.0"
          ? metrics.pair_count
          : metrics.completed_pair_count,
      },
      { name: "evaluation_failures", value: result.failures.length },
      {
        name: "leakage_groups",
        value: metrics.contract_version === "contentmd.evaluation-metric-result/0.1.0"
          ? metrics.leakage_group_count
          : 0,
      },
    ],
    exclusions: result.predicate.checks
      .filter(({ passed }) => !passed)
      .map(({ check }) => `predicate:${check}`),
  });
}

export async function runLearningShadowPhase(
  input: RunLearningShadowPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningShadowPhaseData>> {
  if (!input.evaluation.predicate.evaluation_passed
    || input.evaluation.evaluation_record.payload.evaluation_state !== "passed"
  || canonicalJson(input.evaluation.evaluation_record.payload.model_ref)
      !== canonicalJson(input.sealed_test.model_ref)) {
    fail("learning_workflow_input_mismatch:evaluation");
  }
  const auditPreparation = await prepareAuditAppend(input.authority, "shadow", [{
    phase: "evaluate",
    result_digest: sha256Canonical({
      sealed_test: input.sealed_test,
      result: input.evaluation,
    }),
    mismatch_code: "learning_workflow_input_mismatch:evaluation_audit",
  }]);
  const plan = createShadowEvaluationPlan({
    record_mode: "development_fixture",
    sealed_test: input.sealed_test,
    start_at: input.start_at,
    earliest_end_at: input.earliest_end_at,
    proposed_end_at: input.proposed_end_at,
    input_selection_ref: input.input_selection_ref,
  });
  const shadow = startShadowSimulation(input.vault, {
    record_mode: "development_fixture",
    plan,
    sealed_test: input.sealed_test,
    shadow_run_id: input.shadow_run_id,
    actor_ref: input.start_actor_ref,
  });
  const responses = Object.freeze(input.observations.map((observation) => (
    observeShadowSimulation({
      record_mode: "development_fixture",
      vault: input.vault,
      shadow_run_id: shadow.shadow_run_id,
      ...observation,
    })
  )));
  const result = completeShadowSimulation({
    record_mode: "development_fixture",
    vault: input.vault,
    shadow,
    ended_at: input.ended_at,
    actor_ref: input.completion_actor_ref,
  });
  const data = Object.freeze({ plan, shadow, responses, result });
  return appendAudit(input.authority, "shadow", data, {
    record_refs: [
      input.evaluation.evaluation_record.record_id,
      plan.record_id,
      shadow.shadow_run_id,
      result.shadow_result_id,
    ],
    reason_codes: result.completion_state === "completed"
      ? []
      : [`shadow_${result.completion_state}`],
    denominators: [
      { name: "decisive_pairs", value: result.decisive_pair_count },
      { name: "leakage_groups", value: result.leakage_group_count },
      { name: "observations", value: result.observation_count },
    ],
    exclusions: result.no_influence_verified ? [] : ["shadow_influence_detected"],
  }, auditPreparation);
}

export async function runLearningPromotionPhase(
  input: RunLearningPromotionPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningPromotionPhaseData>> {
  const verifiedDecision = createSimulatedPromotionDecision({
    record_mode: "development_fixture",
    evaluation: input.evaluation,
    shadow_result: input.shadow.result,
    proposed_scope: input.proposed_scope,
    actor_fixture_ref: input.decision.actor_fixture_ref,
    rationale: input.decision.rationale,
    decision: input.decision.decision,
    expected_head_digest: input.decision.expected_head_digest,
  });
  if (canonicalJson(verifiedDecision) !== canonicalJson(input.decision)) {
    fail("learning_workflow_input_mismatch:promotion_decision");
  }
  const auditPreparation = await prepareAuditAppend(input.authority, "promote", [
    {
      phase: "evaluate",
      result_digest: sha256Canonical({
        sealed_test: input.sealed_test,
        result: input.evaluation,
      }),
      mismatch_code: "learning_workflow_input_mismatch:evaluation_audit",
    },
    {
      phase: "shadow",
      result_digest: sha256Canonical(input.shadow),
      mismatch_code: "learning_workflow_input_mismatch:shadow_audit",
    },
  ]);
  const transition = input.decision.decision === "approve_simulation"
    ? simulatePromotionBinding({
        record_mode: "development_fixture",
        vault: input.vault,
        project_id: input.project_id,
        proposed_scope: input.proposed_scope,
        baseline_ref: input.baseline_ref,
        evaluation: input.evaluation,
        shadow_result: input.shadow.result,
        decision: input.decision,
        actor_ref: input.actor_ref,
        occurred_at: input.occurred_at,
      })
    : null;
  const data = Object.freeze({ decision: input.decision, transition });
  return appendAudit(input.authority, "promote", data, {
    record_refs: [
      input.decision.decision_id,
      ...(transition === null ? [] : [transition.transition_id]),
    ],
    reason_codes: transition === null ? ["promotion_decision_rejected"] : [],
    denominators: [
      { name: "promotion_decisions", value: 1 },
      { name: "promotion_transitions", value: transition === null ? 0 : 1 },
    ],
    exclusions: transition === null ? ["promotion_not_applied"] : [],
  }, auditPreparation);
}

export async function runLearningDriftPhase(
  input: RunLearningDriftPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningDriftPhaseData>> {
  const auditPreparation = await prepareAuditAppend(input.authority, "drift", [{
    phase: "promote",
    result_digest: sha256Canonical(input.promotion),
    mismatch_code: "learning_workflow_input_mismatch:promotion_audit",
  }]);
  const result = evaluateDriftWindow(input.request);
  const data = Object.freeze({ result });
  return appendAudit(input.authority, "drift", data, {
    record_refs: [
      result.report.record_id,
      ...(result.suspension_transition === null
        ? []
        : [result.suspension_transition.transition_id]),
    ],
    reason_codes: result.disposition === "continue"
      ? []
      : [`drift_${result.disposition}`],
    denominators: [
      { name: "decisive_pairs", value: result.report.payload.decisive_pair_count },
      { name: "leakage_groups", value: result.report.payload.leakage_group_count },
      { name: "observations", value: result.metric_delta.pair_count },
    ],
    exclusions: result.metric_delta.window_state === "monitoring_insufficient"
      ? ["monitoring_insufficient"]
      : [],
  }, auditPreparation);
}

export async function runLearningRollbackPhase(
  input: RunLearningRollbackPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningRollbackPhaseData>> {
  const auditPreparation = await prepareAuditAppend(input.authority, "rollback", [
    {
      phase: "promote",
      result_digest: sha256Canonical(input.promotion),
      mismatch_code: "learning_workflow_input_mismatch:promotion_audit",
    },
    {
      phase: "drift",
      result_digest: input.drift === null ? null : sha256Canonical(input.drift),
      mismatch_code: "learning_workflow_input_mismatch:drift_audit",
    },
  ]);
  const transition = simulateRollback(input.request);
  const data = Object.freeze({ transition });
  return appendAudit(input.authority, "rollback", data, {
    record_refs: [transition.transition_id],
    reason_codes: [`rollback_${transition.transition_kind}`],
    denominators: [{ name: "rollback_transitions", value: 1 }],
    exclusions: [],
  }, auditPreparation);
}

export async function runLearningStatusPhase(
  input: RunLearningStatusPhaseInput,
): Promise<LearningWorkflowPhaseResult<LearningWorkflowStatusData>> {
  validateAuthority(input.authority);
  const events = await input.authority.store.readStream({
    stream_id: input.authority.stream_id,
    after_sequence: 0,
    maximum_records: 100,
  }, input.inspection_operation);
  const phases = events.map((event) => {
    const phase = phaseFromPayload(event.payload);
    if (event.event_type !== `learning_workflow_${phase}_completed`) {
      fail("learning_workflow_audit_invalid:event_type");
    }
    const payload = event.payload as { workflow_id?: unknown; project_id?: unknown };
    if (payload.workflow_id !== input.authority.workflow_id
      || payload.project_id !== input.authority.project_id) {
      fail("learning_workflow_audit_invalid:scope");
    }
    return phase;
  });
  const completedPhases = Object.freeze(PHASE_ORDER.filter((phase) => phases.includes(phase)));
  const data = Object.freeze({
    workflow_id: input.authority.workflow_id,
    project_id: input.authority.project_id,
    stream_id: input.authority.stream_id,
    completed_phases: completedPhases,
    last_completed_phase: phases.at(-1) ?? null,
    latest_event_digest: events.at(-1)?.event_digest ?? null,
    authority_effect: "none" as const,
  });
  return appendAudit(input.authority, "status", data, {
    record_refs: data.latest_event_digest === null ? [] : [data.latest_event_digest],
    reason_codes: phases.length === 0 ? ["learning_workflow_not_started"] : [],
    denominators: [{ name: "completed_phases", value: completedPhases.length }],
    exclusions: [],
  });
}
