import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { task2IsRfc3339 } from "./feedback.js";
import {
  Task6GovernanceError,
  task6InternalBaselineScore,
  task6InternalCommitFrozenShadowRuns,
  task6InternalCommitShadowRuns,
  task6InternalReadShadowRuns,
  task6InternalRequireSealedReplay,
  task6InternalRequireSealedReplayById,
  task6InternalRequireSealedReplayInVault,
  task6InternalRequireVerifiedModelById,
  type DeterministicBaselineProfile,
  type EvaluationSimulatorVault,
  type RiskSliceWitness,
  type Task6RecordMode,
  type VerifiedSealedTestHandle,
} from "./evaluation.js";
import type { Task6ObjectRef } from "./bootstrap.js";
import type { ShadowEvaluationPlan } from "./records.js";
import {
  buildLearningDataset,
  type BuildLearningDatasetInput,
  type LearningDatasetBuildResult,
} from "./dataset.js";
import {
  task5ReauthenticatePairwiseCandidate,
  type PairwiseCandidateVectorReplay,
  type VerifiedPairwiseCandidate,
} from "./pairwise-logistic.js";
import { rankEligibleExpressions } from "./rank.js";

export interface CreateShadowEvaluationPlanInput {
  record_mode: Task6RecordMode;
  sealed_test: VerifiedSealedTestHandle;
  start_at: string;
  earliest_end_at: string;
  proposed_end_at: string;
  input_selection_ref: Task6ObjectRef;
}

export interface StartShadowSimulationInput {
  record_mode: Task6RecordMode;
  plan: ShadowEvaluationPlan;
  sealed_test: VerifiedSealedTestHandle;
  shadow_run_id: string;
  actor_ref: string;
}

export interface ShadowSimulationHandle {
  readonly contract_version: "contentmd.shadow-simulation-handle/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly shadow_run_id: string;
  readonly plan_ref: Task6ObjectRef;
  readonly sealed_test_handle_id: string;
  readonly start_event_ref: Task6ObjectRef;
  readonly handle_digest: string;
}

export interface ShadowRunStatus {
  contract_version: "contentmd.shadow-run-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_run_id: string;
  state: "started" | "observing" | "completed" | "insufficient" | "invalid"
    | "consumed_incomplete";
  observation_count: number;
  last_observation_at: string | null;
  completion_claim_event_ref: Task6ObjectRef | null;
  terminal_result_ref: Task6ObjectRef | null;
  status_digest: string;
}

export interface DriftDatasetReplay {
  contract_version: "contentmd.drift-dataset-replay/0.1.0";
  build_input: BuildLearningDatasetInput;
  expected_build_result: LearningDatasetBuildResult;
}

export interface DriftPairReplay {
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
  risk_slice_witness: RiskSliceWitness;
}

export interface ShadowOutcomeReplay {
  dataset: DriftDatasetReplay;
  pair: DriftPairReplay;
}

export interface ShadowObservationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  shadow_run_id: string;
  observation_id: string;
  observed_at: string;
  outcome_replay: ShadowOutcomeReplay;
  candidates: readonly [
    VerifiedPairwiseCandidate,
    VerifiedPairwiseCandidate,
    ...VerifiedPairwiseCandidate[],
  ];
}

export interface ShadowObservationResponse {
  contract_version: "contentmd.shadow-active-only-response/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_run_id: string;
  observation_id: string;
  input_digest: string;
  active_ordered_candidate_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  active_output_digest: string;
  response_digest: string;
}

export interface CompleteShadowSimulationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  shadow: ShadowSimulationHandle;
  ended_at: string;
  actor_ref: string;
}

export interface ShadowRunResult {
  contract_version: "contentmd.shadow-simulation-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_result_id: string;
  plan_ref: Task6ObjectRef;
  observation_count: number;
  decisive_pair_count: number;
  leakage_group_count: number;
  started_at: string;
  ended_at: string;
  active_input_digest: string;
  active_output_digest: string;
  shadow_output_digest: string;
  public_response_set_digest: string;
  expected_active_only_response_set_digest: string;
  no_influence_verified: boolean;
  completion_state: "completed" | "insufficient" | "invalid";
  result_digest: string;
}

interface ShadowPlanMaterial {
  plan: ShadowEvaluationPlan;
  plan_ref: Task6ObjectRef;
  sealed_test_handle_id: string;
  sealed_test_handle_digest: string;
  start_at: string;
  proposed_end_at: string;
}

interface ShadowStartedPayload {
  contract_version: "contentmd.shadow-started-event-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_run_id: string;
  plan_ref: Task6ObjectRef;
  sealed_test_handle_id: string;
  start_input_digest: string;
}

interface StoredShadowEvent {
  event_id: string;
  stream_id: string;
  sequence: number;
  schema_version: "0.1.0";
  event_type: "shadow_started" | "shadow_observed" | "shadow_completion_claimed"
    | "shadow_completed" | "shadow_insufficient" | "shadow_invalid";
  occurred_at: string;
  actor_ref: string;
  data_class: "learning_simulation";
  payload: unknown;
  predecessor_digest: string | null;
  event_digest: string;
}

interface StoredShadowRun {
  contract_version: "contentmd.stored-shadow-run/0.1.0";
  shadow_run_id: string;
  plan: ShadowEvaluationPlan;
  plan_ref: Task6ObjectRef;
  sealed_test_handle_id: string;
  sealed_test_handle_digest: string;
  start_input_digest: string;
  handle: ShadowSimulationHandle;
  events: readonly [StoredShadowEvent, ...StoredShadowEvent[]];
  observations: readonly StoredShadowObservation[];
  completion_input_digest: string | null;
  terminal_result: unknown | null;
}

interface StoredShadowObservation {
  contract_version: "contentmd.stored-shadow-observation/0.1.0";
  observation_id: string;
  observed_at: string;
  input_digest: string;
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  slice_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  public_response: ShadowObservationResponse;
  expected_active_only_response: ShadowObservationResponse;
  shadow_output_digest: string;
  event_ref: Task6ObjectRef;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const MILLISECOND_RFC3339 = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}\.[0-9]{3}(?:Z|[+-][0-9]{2}:[0-9]{2})$/u;
const FOURTEEN_DAYS_MS = 14 * 86_400_000;
const shadowPlans = new Map<string, ShadowPlanMaterial>();
const shadowHandleMembership = new WeakSet<object>();
const shadowHandleVaults = new WeakMap<object, EvaluationSimulatorVault>();

function fail(code: ConstructorParameters<typeof Task6GovernanceError>[0]): never {
  throw new Task6GovernanceError(code);
}

function exactTopLevel(value: unknown, expectedKeys: readonly string[]): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail("task6_input_shape_invalid");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) fail("task6_input_shape_invalid");
  const keys = Reflect.ownKeys(value);
  if (keys.some((key) => typeof key !== "string")
    || keys.length !== expectedKeys.length
    || keys.some((key) => !expectedKeys.includes(key as string))) {
    fail("task6_input_shape_invalid");
  }
  for (const key of expectedKeys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      fail("task6_input_shape_invalid");
    }
  }
}

function modeGate(value: unknown, expectedKeys: readonly string[]): void {
  exactTopLevel(value, expectedKeys);
  const descriptor = Object.getOwnPropertyDescriptor(value, "record_mode");
  if (descriptor === undefined || !("value" in descriptor)) fail("task6_input_shape_invalid");
  if (descriptor.value === "official") fail("task6_official_mode_not_supported");
  if (descriptor.value !== "development_fixture") fail("task6_input_shape_invalid");
}

const validatedFrozenGraphRoots = new WeakSet<object>();
const validatedDriftDatasetBuilds = new WeakMap<
  object,
  WeakMap<object, LearningDatasetBuildResult>
>();

function closedGraph(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value) || Object.is(value, -0)) fail("task6_input_shape_invalid");
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) fail("task6_input_shape_invalid");
  if (validatedFrozenGraphRoots.has(value)) return;
  const prototype = Object.getPrototypeOf(value);
  if (Array.isArray(value)) {
    if (prototype !== Array.prototype || Object.keys(value).length !== value.length) {
      fail("task6_input_shape_invalid");
    }
  } else if (prototype !== Object.prototype && prototype !== null) {
    fail("task6_input_shape_invalid");
  }
  ancestors.add(value);
  const keys = Array.isArray(value) ? Object.keys(value) : Reflect.ownKeys(value);
  if (Array.isArray(value)
    && Reflect.ownKeys(value).some((key) => key !== "length" && !keys.includes(String(key)))) {
    fail("task6_input_shape_invalid");
  }
  for (const key of keys) {
    if (typeof key !== "string") fail("task6_input_shape_invalid");
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
      fail("task6_input_shape_invalid");
    }
    closedGraph(descriptor.value, ancestors);
  }
  ancestors.delete(value);
}

function rememberValidatedFrozenGraph(value: unknown, seen = new Set<object>()): boolean {
  if (value === null || typeof value !== "object" || seen.has(value)) return true;
  if (!Object.isFrozen(value)) return false;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor)
      || !rememberValidatedFrozenGraph(descriptor.value, seen)) return false;
  }
  validatedFrozenGraphRoots.add(value);
  return true;
}

function freezeGraph(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) freezeGraph(descriptor.value, seen);
  }
  Object.freeze(value);
}

function immutable<T>(value: T): T {
  const copy = structuredClone(value);
  freezeGraph(copy);
  return copy;
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function assertObjectRef(ref: Task6ObjectRef): void {
  exactTopLevel(ref, ["record_id", "schema_id", "schema_version", "content_digest"]);
  if (typeof ref.record_id !== "string" || ref.record_id.length === 0
    || typeof ref.schema_id !== "string" || ref.schema_id.length === 0
    || ref.schema_version !== "0.1.0" || !DIGEST.test(ref.content_digest)) {
    fail("task6_reference_invalid");
  }
}

function refsEqual(left: Task6ObjectRef, right: Task6ObjectRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function auxiliaryRef(prefix: string, schemaId: string, digest: string): Task6ObjectRef {
  return {
    record_id: `${prefix}${digest.slice(0, 32)}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function planRef(plan: ShadowEvaluationPlan): Task6ObjectRef {
  return {
    record_id: plan.record_id,
    schema_id: plan.schema_id,
    schema_version: plan.schema_version,
    content_digest: plan.content_digest,
  };
}

function shadowEventRef(event: StoredShadowEvent): Task6ObjectRef {
  return {
    record_id: event.event_id,
    schema_id: "contentmd.simulated-learning-event",
    schema_version: "0.1.0",
    content_digest: event.event_digest,
  };
}

function shadowStreamId(shadowRunId: string): string {
  const digest = sha256Canonical({
    contract_version: "contentmd.shadow-simulation-stream/0.1.0",
    shadow_run_id: shadowRunId,
  });
  return `learning_shadow_sim.${digest.slice(0, 32)}`;
}

function createShadowEvent(
  shadowRunId: string,
  eventType: StoredShadowEvent["event_type"],
  occurredAt: string,
  actorRef: string,
  payload: unknown,
  prior: StoredShadowEvent | null,
): StoredShadowEvent {
  const streamId = shadowStreamId(shadowRunId);
  const eventIdentityDigest = sha256Canonical({
    contract_version: "contentmd.learning-simulation-event-identity/0.1.0",
    stream_id: streamId,
    event_type: eventType,
    occurred_at: occurredAt,
    actor_ref: actorRef,
    payload,
  });
  const preimage = {
    event_id: `learning_sim_event.${eventIdentityDigest.slice(0, 32)}`,
    stream_id: streamId,
    sequence: (prior?.sequence ?? 0) + 1,
    schema_version: "0.1.0" as const,
    event_type: eventType,
    occurred_at: occurredAt,
    actor_ref: actorRef,
    data_class: "learning_simulation" as const,
    payload,
    predecessor_digest: prior?.event_digest ?? null,
  };
  return immutable({ ...preimage, event_digest: sha256Canonical(preimage) });
}

function storedShadowRuns(vault: EvaluationSimulatorVault): readonly StoredShadowRun[] {
  const runs = task6InternalReadShadowRuns(vault);
  if (!Array.isArray(runs)) fail("task6_vault_invalid");
  return runs as readonly StoredShadowRun[];
}

function findStoredShadowRun(
  vault: EvaluationSimulatorVault,
  shadowRunId: string,
): StoredShadowRun | null {
  const matches = storedShadowRuns(vault).filter((run) =>
    run !== null && typeof run === "object" && run.shadow_run_id === shadowRunId);
  if (matches.length > 1) fail("task6_vault_invalid");
  return matches[0] ?? null;
}

function issueShadowHandle(
  vault: EvaluationSimulatorVault,
  stored: StoredShadowRun,
): ShadowSimulationHandle {
  const handle = immutable(stored.handle);
  shadowHandleMembership.add(handle);
  shadowHandleVaults.set(handle, vault);
  return handle;
}

function statusFromRun(stored: StoredShadowRun): ShadowRunStatus {
  if (!Array.isArray(stored.events) || stored.events.length === 0) fail("task6_vault_invalid");
  let observationCount = 0;
  let lastObservationAt: string | null = null;
  let claimRef: Task6ObjectRef | null = null;
  let terminalRef: Task6ObjectRef | null = null;
  let state: ShadowRunStatus["state"] = "started";
  let predecessor: string | null = null;
  for (let index = 0; index < stored.events.length; index += 1) {
    const event = stored.events[index]!;
    if (event.sequence !== index + 1 || event.predecessor_digest !== predecessor) {
      fail("task6_vault_invalid");
    }
    const { event_digest: _eventDigest, ...eventPreimage } = event;
    if (event.event_digest !== sha256Canonical(eventPreimage)) fail("task6_vault_invalid");
    predecessor = event.event_digest;
    if (event.event_type === "shadow_observed") {
      observationCount += 1;
      lastObservationAt = event.occurred_at;
      state = "observing";
    } else if (event.event_type === "shadow_completion_claimed") {
      claimRef = shadowEventRef(event);
      state = "consumed_incomplete";
    } else if (event.event_type === "shadow_completed"
      || event.event_type === "shadow_insufficient"
      || event.event_type === "shadow_invalid") {
      if (stored.terminal_result === null || typeof stored.terminal_result !== "object") {
        fail("task6_vault_invalid");
      }
      const result = stored.terminal_result as { shadow_result_id?: unknown; result_digest?: unknown };
      if (typeof result.shadow_result_id !== "string" || !DIGEST.test(String(result.result_digest))) {
        fail("task6_vault_invalid");
      }
      terminalRef = {
        record_id: result.shadow_result_id,
        schema_id: "contentmd.shadow-simulation-result",
        schema_version: "0.1.0",
        content_digest: String(result.result_digest),
      };
      state = event.event_type === "shadow_completed" ? "completed"
        : event.event_type === "shadow_insufficient" ? "insufficient" : "invalid";
    }
  }
  const preimage = {
    contract_version: "contentmd.shadow-run-status/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    shadow_run_id: stored.shadow_run_id,
    state,
    observation_count: observationCount,
    last_observation_at: lastObservationAt,
    completion_claim_event_ref: claimRef,
    terminal_result_ref: terminalRef,
  };
  return immutable({ ...preimage, status_digest: sha256Canonical(preimage) });
}

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): Task6ObjectRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function snapshotRef(snapshot: {
  snapshot_id: string;
  snapshot_kind: string;
  snapshot_digest: string;
}): Task6ObjectRef {
  return {
    record_id: snapshot.snapshot_id,
    schema_id: `contentmd.task2-${snapshot.snapshot_kind}-snapshot`,
    schema_version: "0.1.0",
    content_digest: snapshot.snapshot_digest,
  };
}

function assertRiskWitness(
  witness: RiskSliceWitness,
  taskRef: Task6ObjectRef,
  contextRef: Task6ObjectRef,
): void {
  exactTopLevel(witness, [
    "contract_version", "witness_id", "task_ref", "context_ref", "risk_value",
    "source_refs", "witness_digest",
  ]);
  assertObjectRef(witness.task_ref);
  assertObjectRef(witness.context_ref);
  if (!Array.isArray(witness.source_refs) || witness.source_refs.length === 0) {
    fail("task6_scope_mismatch");
  }
  for (const ref of witness.source_refs) assertObjectRef(ref);
  const expectedSources = [taskRef, contextRef].sort((left, right) =>
    compareUtf8(canonicalJson(left), canonicalJson(right)));
  if (witness.contract_version !== "contentmd.risk-slice-witness/0.1.0"
    || typeof witness.risk_value !== "string" || witness.risk_value.length === 0
    || !refsEqual(witness.task_ref, taskRef)
    || !refsEqual(witness.context_ref, contextRef)
    || canonicalJson(witness.source_refs) !== canonicalJson(expectedSources)) {
    fail("task6_scope_mismatch");
  }
  const { witness_id: _witnessId, witness_digest: _witnessDigest, ...preimage } = witness;
  const digest = sha256Canonical(preimage);
  if (witness.witness_digest !== digest
    || witness.witness_id !== `risk_slice_witness.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
}

function validateOutcomeReplay(outcome: ShadowOutcomeReplay): {
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  candidate_a_ref: Task6ObjectRef;
  candidate_b_ref: Task6ObjectRef;
  slice_values: readonly [string, string, string, string];
} {
  exactTopLevel(outcome, ["dataset", "pair"]);
  exactTopLevel(outcome.dataset, ["contract_version", "build_input", "expected_build_result"]);
  exactTopLevel(outcome.pair, [
    "example_ref", "leakage_group_ref", "candidate_a", "candidate_b", "risk_slice_witness",
  ]);
  if (outcome.dataset.contract_version !== "contentmd.drift-dataset-replay/0.1.0") {
    fail("task6_replay_invalid");
  }
  assertObjectRef(outcome.pair.example_ref);
  assertObjectRef(outcome.pair.leakage_group_ref);
  const buildInput = outcome.dataset.build_input;
  const expectedBuildResult = outcome.dataset.expected_build_result;
  const cachedByExpected = validatedDriftDatasetBuilds.get(buildInput as object);
  let replayed = cachedByExpected?.get(expectedBuildResult as object);
  if (replayed === undefined) {
    try {
      replayed = buildLearningDataset(buildInput);
    } catch {
      return fail("task6_replay_invalid");
    }
    if (canonicalJson(replayed) !== canonicalJson(expectedBuildResult)) {
      fail("task6_replay_invalid");
    }
    if (rememberValidatedFrozenGraph(buildInput)
      && rememberValidatedFrozenGraph(expectedBuildResult)) {
      const byExpected = cachedByExpected ?? new WeakMap<object, LearningDatasetBuildResult>();
      byExpected.set(expectedBuildResult as object, replayed);
      if (cachedByExpected === undefined) {
        validatedDriftDatasetBuilds.set(buildInput as object, byExpected);
      }
    }
  }
  const subjects = outcome.dataset.build_input.leakage_evidence.subjects.filter(({ example }) =>
    refsEqual(recordRef(example.preference), outcome.pair.example_ref));
  if (subjects.length !== 1) fail("task6_replay_invalid");
  const subject = subjects[0]!;
  if (subject.example.preference.payload.label !== 0
    && subject.example.preference.payload.label !== 1) {
    fail("task6_candidate_ineligible");
  }
  const groups = replayed.groups.filter(({ payload }) =>
    payload.member_refs.some((ref) => refsEqual(ref, outcome.pair.example_ref)));
  if (groups.length !== 1 || !refsEqual(recordRef(groups[0]!), outcome.pair.leakage_group_ref)) {
    fail("task6_replay_invalid");
  }
  const qualification = subject.example.qualification_input;
  const candidateARef = snapshotRef(qualification.candidate_a);
  const candidateBRef = snapshotRef(qualification.candidate_b);
  const pairCandidateARef = snapshotRef(
    outcome.pair.candidate_a.vectorization_input.candidate,
  );
  const pairCandidateBRef = snapshotRef(
    outcome.pair.candidate_b.vectorization_input.candidate,
  );
  if (!refsEqual(candidateARef, pairCandidateARef)
    || !refsEqual(candidateBRef, pairCandidateBRef)) fail("task6_reference_invalid");
  assertRiskWitness(
    outcome.pair.risk_slice_witness,
    snapshotRef(qualification.task),
    snapshotRef(qualification.context),
  );
  return {
    example_ref: outcome.pair.example_ref,
    leakage_group_ref: outcome.pair.leakage_group_ref,
    candidate_a_ref: candidateARef,
    candidate_b_ref: candidateBRef,
    slice_values: [
      qualification.context.payload.product_area,
      qualification.context.payload.channel,
      qualification.context.payload.locale,
      outcome.pair.risk_slice_witness.risk_value,
    ],
  };
}

function activeOnlyResponse(
  stored: StoredShadowRun,
  observationId: string,
  inputDigest: string,
  baseline: DeterministicBaselineProfile,
  candidates: readonly [VerifiedPairwiseCandidate, ...VerifiedPairwiseCandidate[]],
): ShadowObservationResponse {
  const ordered = candidates.map((candidate, originalIndex) => ({
    candidate,
    originalIndex,
    score: task6InternalBaselineScore(candidate.vector.values, baseline),
  })).sort((left, right) => right.score - left.score
    || compareUtf8(left.candidate.expression_digest, right.candidate.expression_digest)
    || left.originalIndex - right.originalIndex);
  const orderedRefs = ordered.map(({ candidate }) => candidate.candidate_ref) as [
    Task6ObjectRef,
    ...Task6ObjectRef[],
  ];
  const activeOutputDigest = sha256Canonical({
    contract_version: "contentmd.shadow-active-output/0.1.0",
    input_digest: inputDigest,
    active_baseline_ref: stored.plan.payload.active_baseline_ref,
    active_ordered_candidate_refs: orderedRefs,
  });
  const preimage = {
    contract_version: "contentmd.shadow-active-only-response/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    shadow_run_id: stored.shadow_run_id,
    observation_id: observationId,
    input_digest: inputDigest,
    active_ordered_candidate_refs: orderedRefs,
    active_output_digest: activeOutputDigest,
  };
  return immutable({ ...preimage, response_digest: sha256Canonical(preimage) });
}

function assertMillisecondInstant(value: unknown): asserts value is string {
  if (typeof value !== "string" || !MILLISECOND_RFC3339.test(value)
    || !task2IsRfc3339(value) || !Number.isFinite(Date.parse(value))) {
    fail("task6_input_shape_invalid");
  }
}

export function createShadowEvaluationPlan(
  input: CreateShadowEvaluationPlanInput,
): ShadowEvaluationPlan {
  try {
    modeGate(input, [
      "record_mode", "sealed_test", "start_at", "earliest_end_at", "proposed_end_at",
      "input_selection_ref",
    ]);
    closedGraph(input);
    assertMillisecondInstant(input.start_at);
    assertMillisecondInstant(input.earliest_end_at);
    assertMillisecondInstant(input.proposed_end_at);
    assertObjectRef(input.input_selection_ref);
    const stored = task6InternalRequireSealedReplay(input.sealed_test);
    const { replay } = stored;
    if (!refsEqual(input.input_selection_ref, input.sealed_test.test_population_ref)) {
      fail("task6_reference_invalid");
    }
    const startMilliseconds = Date.parse(input.start_at);
    const earliestEndMilliseconds = Date.parse(input.earliest_end_at);
    const proposedEndMilliseconds = Date.parse(input.proposed_end_at);
    if (earliestEndMilliseconds !== startMilliseconds + FOURTEEN_DAYS_MS
      || proposedEndMilliseconds < earliestEndMilliseconds) {
      fail("task6_shadow_chronology_invalid");
    }

    const startRuleDigest = sha256Canonical({
      contract_version: "contentmd.shadow-start-rule/0.1.0",
      start_at: input.start_at,
      selection_interval_start: "inclusive",
    });
    const startRuleRef = auxiliaryRef(
      "shadow_start_rule.", "contentmd.shadow-start-rule", startRuleDigest,
    );
    const endRuleDigest = sha256Canonical({
      contract_version: "contentmd.shadow-end-rule/0.1.0",
      earliest_end_at: input.earliest_end_at,
      proposed_end_at: input.proposed_end_at,
      selection_interval_end: "exclusive",
      minimum_calendar_days: 14,
      minimum_decisive_pairs: 50,
      minimum_leakage_groups: 20,
    });
    const endRuleRef = auxiliaryRef(
      "shadow_end_rule.", "contentmd.shadow-end-rule", endRuleDigest,
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
      "minimum_duration", "minimum_decisive_pairs", "minimum_leakage_groups",
      "required_slice_support", "complete_replay", "no_influence",
    ] as const).map((gate) => {
      const digest = sha256Canonical({
        contract_version: "contentmd.shadow-gate/0.1.0",
        gate,
        predicate_version: "0.1.0",
      });
      return auxiliaryRef("shadow_gate.", "contentmd.shadow-gate", digest);
    }) as [Task6ObjectRef, ...Task6ObjectRef[]];
    const requiredSliceRefs = replay.declared_slices
      .filter(({ required_for_promotion }) => required_for_promotion)
      .map(({ slice_id, slice_digest }) => ({
        record_id: slice_id,
        schema_id: "contentmd.evaluation-slice-definition",
        schema_version: "0.1.0" as const,
        content_digest: slice_digest,
      })) as [Task6ObjectRef, ...Task6ObjectRef[]];
    if (requiredSliceRefs.length === 0) fail("task6_slice_invalid");
    const baselineRef: Task6ObjectRef = {
      record_id: replay.baseline_profile.baseline_id,
      schema_id: "contentmd.expression-fit-baseline",
      schema_version: "0.1.0",
      content_digest: replay.baseline_profile.baseline_digest,
    };
    const inputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-evaluation-plan-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      sealed_test_handle_digest: input.sealed_test.handle_digest,
      active_baseline_ref: baselineRef,
      candidate_model_ref: input.sealed_test.model_ref,
      input_selection_ref: input.input_selection_ref,
      start_rule_ref: startRuleRef,
      end_rule_ref: endRuleRef,
      required_slice_refs: requiredSliceRefs,
      metric_refs: metricRefs,
      gate_refs: gateRefs,
      code_verification_digest: input.sealed_test.code_verification_digest,
      runtime_verification_digest: input.sealed_test.runtime_verification_digest,
    });
    const schemaEntry = replay.evaluation_code_manifest.entries.find(({ path }) =>
      path === "packages/schemas/src/learning-records.schema.json");
    if (schemaEntry === undefined) fail("task6_code_manifest_invalid");
    const codeManifestRef = auxiliaryRef(
      "task6_code_manifest.",
      "contentmd.task6-code-manifest",
      replay.evaluation_code_manifest.manifest_digest,
    );
    const runtimeRef = auxiliaryRef(
      "task6_runtime_profile.",
      "contentmd.task6-runtime-profile",
      replay.evaluation_runtime_profile.profile_digest,
    );
    const provenanceEntries = [
      { relationship: "active_baseline", ref: baselineRef },
      { relationship: "candidate_model", ref: input.sealed_test.model_ref },
      { relationship: "input_selection", ref: input.input_selection_ref },
      { relationship: "shadow_start_rule", ref: startRuleRef },
      { relationship: "shadow_end_rule", ref: endRuleRef },
      ...requiredSliceRefs.map((ref) => ({ relationship: "required_slice", ref })),
      ...metricRefs.map((ref) => ({ relationship: "shadow_metric", ref })),
      ...gateRefs.map((ref) => ({ relationship: "shadow_gate", ref })),
      { relationship: "evaluation_code_manifest", ref: codeManifestRef },
      { relationship: "evaluation_runtime_profile", ref: runtimeRef },
    ].sort((left, right) => compareUtf8(left.relationship, right.relationship)
      || compareUtf8(left.ref.record_id, right.ref.record_id)
      || compareUtf8(left.ref.schema_id, right.ref.schema_id)
      || compareUtf8(left.ref.schema_version, right.ref.schema_version)
      || compareUtf8(left.ref.content_digest, right.ref.content_digest));
    const provenance = provenanceEntries.map(({ relationship, ref }) => ({
      record_id: ref.record_id,
      relationship,
      content_digest: ref.content_digest,
    })) as [{ record_id: string; relationship: string; content_digest: string }, ...Array<{
      record_id: string; relationship: string; content_digest: string;
    }>];
    const record = finalizeRecord({
      record_id: `shadow_evaluation_plan.${inputDigest.slice(0, 32)}`,
      schema_id: "contentmd.shadow-evaluation-plan",
      schema_version: "0.1.0",
      record_version: 1,
      scope: structuredClone(replay.model_record.scope),
      provenance,
      lifecycle_state: "active",
      payload: {
        contract_version: "contentmd.learning-record-contract/0.1.0",
        record_mode: "development_fixture",
        ranking_objective: "expression_preference",
        candidate_kind: "expression",
        schema_digest: schemaEntry.raw_bytes_digest,
        code_digest: replay.evaluation_code_manifest.manifest_digest,
        input_digest: inputDigest,
        authority_effect: "none",
        active_baseline_ref: baselineRef,
        candidate_model_ref: input.sealed_test.model_ref,
        input_selection_ref: input.input_selection_ref,
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
      },
    }) as unknown as ShadowEvaluationPlan;
    const plan = immutable(record);
    const material = immutable({
      plan,
      plan_ref: planRef(plan),
      sealed_test_handle_id: input.sealed_test.handle_id,
      sealed_test_handle_digest: input.sealed_test.handle_digest,
      start_at: input.start_at,
      proposed_end_at: input.proposed_end_at,
    });
    const existing = shadowPlans.get(plan.record_id);
    if (existing !== undefined && canonicalJson(existing.plan) !== canonicalJson(plan)) {
      fail("task6_digest_invalid");
    }
    shadowPlans.set(plan.record_id, material);
    return plan;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function startShadowSimulation(
  vault: EvaluationSimulatorVault,
  input: StartShadowSimulationInput,
): ShadowSimulationHandle {
  try {
    modeGate(input, [
      "record_mode", "plan", "sealed_test", "shadow_run_id", "actor_ref",
    ]);
    closedGraph(input);
    task6InternalRequireSealedReplayInVault(vault, input.sealed_test);
    if (typeof input.shadow_run_id !== "string" || input.shadow_run_id.length === 0
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0) {
      fail("task6_input_shape_invalid");
    }
    const material = shadowPlans.get(input.plan.record_id);
    if (material === undefined || canonicalJson(material.plan) !== canonicalJson(input.plan)) {
      fail("task6_replay_invalid");
    }
    if (material.sealed_test_handle_id !== input.sealed_test.handle_id
      || material.sealed_test_handle_digest !== input.sealed_test.handle_digest
      || !refsEqual(input.plan.payload.candidate_model_ref, input.sealed_test.model_ref)
      || !refsEqual(input.plan.payload.input_selection_ref, input.sealed_test.test_population_ref)) {
      fail("task6_reference_invalid");
    }
    const startInputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-simulation-start-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      plan_ref: material.plan_ref,
      sealed_test_handle_digest: input.sealed_test.handle_digest,
      shadow_run_id: input.shadow_run_id,
      actor_ref: input.actor_ref,
    });
    const existing = findStoredShadowRun(vault, input.shadow_run_id);
    if (existing !== null) {
      if (existing.start_input_digest !== startInputDigest) {
        fail("task6_shadow_chronology_invalid");
      }
      return issueShadowHandle(vault, existing);
    }
    const startPayload: ShadowStartedPayload = {
      contract_version: "contentmd.shadow-started-event-payload/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      shadow_run_id: input.shadow_run_id,
      plan_ref: material.plan_ref,
      sealed_test_handle_id: input.sealed_test.handle_id,
      start_input_digest: startInputDigest,
    };
    const startEvent = createShadowEvent(
      input.shadow_run_id,
      "shadow_started",
      material.start_at,
      input.actor_ref,
      startPayload,
      null,
    );
    const startEventRef = shadowEventRef(startEvent);
    const handlePreimage = {
      contract_version: "contentmd.shadow-simulation-handle/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      shadow_run_id: input.shadow_run_id,
      plan_ref: material.plan_ref,
      sealed_test_handle_id: input.sealed_test.handle_id,
      start_event_ref: startEventRef,
    };
    const handle = immutable({
      ...handlePreimage,
      handle_digest: sha256Canonical(handlePreimage),
    });
    const run: StoredShadowRun = immutable({
      contract_version: "contentmd.stored-shadow-run/0.1.0",
      shadow_run_id: input.shadow_run_id,
      plan: input.plan,
      plan_ref: material.plan_ref,
      sealed_test_handle_id: input.sealed_test.handle_id,
      sealed_test_handle_digest: input.sealed_test.handle_digest,
      start_input_digest: startInputDigest,
      handle,
      events: [startEvent],
      observations: [],
      completion_input_digest: null,
      terminal_result: null,
    });
    const nextRuns = [...storedShadowRuns(vault), run]
      .sort((left, right) => compareUtf8(left.shadow_run_id, right.shadow_run_id));
    task6InternalCommitShadowRuns(vault, "shadow_start_append", nextRuns);
    const stored = findStoredShadowRun(vault, input.shadow_run_id);
    if (stored === null || stored.start_input_digest !== startInputDigest) {
      fail("task6_event_readback_failed");
    }
    return issueShadowHandle(vault, stored);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function inspectShadowSimulation(
  vault: EvaluationSimulatorVault,
  shadowRunId: string,
): ShadowRunStatus | null {
  try {
    task6InternalReadShadowRuns(vault);
    if (typeof shadowRunId !== "string" || shadowRunId.length === 0) {
      fail("task6_input_shape_invalid");
    }
    const stored = findStoredShadowRun(vault, shadowRunId);
    return stored === null ? null : statusFromRun(stored);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_vault_invalid");
  }
}

export function observeShadowSimulation(
  input: ShadowObservationInput,
): ShadowObservationResponse {
  try {
    modeGate(input, [
      "record_mode", "vault", "shadow_run_id", "observation_id", "observed_at",
      "outcome_replay", "candidates",
    ]);
    closedGraph(input);
    if (typeof input.shadow_run_id !== "string" || input.shadow_run_id.length === 0
      || typeof input.observation_id !== "string" || input.observation_id.length === 0) {
      fail("task6_input_shape_invalid");
    }
    assertMillisecondInstant(input.observed_at);
    if (!Array.isArray(input.candidates) || input.candidates.length < 2) {
      fail("task6_candidate_ineligible");
    }
    const stored = findStoredShadowRun(input.vault, input.shadow_run_id);
    if (stored === null) fail("task6_shadow_chronology_invalid");
    const material = shadowPlans.get(stored.plan.record_id);
    if (material === undefined || canonicalJson(material.plan) !== canonicalJson(stored.plan)) {
      fail("task6_replay_invalid");
    }
    const status = statusFromRun(stored);
    if (status.state === "consumed_incomplete") fail("task6_shadow_completion_incomplete");
    if (status.state !== "started" && status.state !== "observing") {
      fail("task6_shadow_chronology_invalid");
    }
    const observedMilliseconds = Date.parse(input.observed_at);
    if (observedMilliseconds < Date.parse(material.start_at)
      || observedMilliseconds >= Date.parse(material.proposed_end_at)
      || input.outcome_replay.dataset.build_input.evaluation_at !== input.observed_at) {
      fail("task6_shadow_chronology_invalid");
    }
    const observationInputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-observation-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      shadow_run_id: input.shadow_run_id,
      observation_id: input.observation_id,
      observed_at: input.observed_at,
      outcome_replay: input.outcome_replay,
      candidates: input.candidates,
    });
    const existing = stored.observations.filter(({ observation_id }) =>
      observation_id === input.observation_id);
    if (existing.length > 1) fail("task6_vault_invalid");
    if (existing.length === 1) {
      if (existing[0]!.input_digest !== observationInputDigest) {
        fail("task6_shadow_chronology_invalid");
      }
      return immutable(existing[0]!.public_response);
    }
    const priorObservation = stored.observations.at(-1);
    if (priorObservation !== undefined) {
      const priorMilliseconds = Date.parse(priorObservation.observed_at);
      if (observedMilliseconds < priorMilliseconds
        || (observedMilliseconds === priorMilliseconds
          && compareUtf8(input.observation_id, priorObservation.observation_id) <= 0)) {
        fail("task6_shadow_chronology_invalid");
      }
    }

    const pair = validateOutcomeReplay(input.outcome_replay);
    let candidates: [VerifiedPairwiseCandidate, ...VerifiedPairwiseCandidate[]];
    try {
      candidates = input.candidates.map((candidate) =>
        task5ReauthenticatePairwiseCandidate(candidate)) as [
          VerifiedPairwiseCandidate,
          ...VerifiedPairwiseCandidate[],
        ];
    } catch {
      return fail("task6_candidate_ineligible");
    }
    const candidateKeys = candidates.map((candidate) => canonicalJson({
      candidate_ref: candidate.candidate_ref,
      vector_ref: candidate.vector_ref,
      expression_digest: candidate.expression_digest,
    }));
    if (new Set(candidateKeys).size !== candidates.length) fail("task6_candidate_ineligible");
    const candidateAMatches = candidates.filter((candidate) =>
      refsEqual(candidate.candidate_ref, pair.candidate_a_ref)
      && canonicalJson(candidate.replay) === canonicalJson(input.outcome_replay.pair.candidate_a));
    const candidateBMatches = candidates.filter((candidate) =>
      refsEqual(candidate.candidate_ref, pair.candidate_b_ref)
      && canonicalJson(candidate.replay) === canonicalJson(input.outcome_replay.pair.candidate_b));
    if (candidateAMatches.length !== 1 || candidateBMatches.length !== 1) {
      fail("task6_candidate_ineligible");
    }

    const sealed = task6InternalRequireSealedReplayById(
      input.vault,
      stored.sealed_test_handle_id,
    );
    const sliceDimensions = ["project", "product_area", "channel", "locale", "risk"] as const;
    const sliceValues = [candidates[0]!.vector.project_id, ...pair.slice_values] as const;
    const sliceRefs = sliceDimensions.map((dimension, index) => {
      const slice = sealed.replay.declared_slices.find(({ key }) =>
        key.dimension === dimension && key.value === sliceValues[index]);
      if (slice === undefined) fail("task6_slice_invalid");
      return {
        record_id: slice.slice_id,
        schema_id: "contentmd.evaluation-slice-definition",
        schema_version: "0.1.0" as const,
        content_digest: slice.slice_digest,
      };
    }) as [Task6ObjectRef, ...Task6ObjectRef[]];
    const publicResponse = activeOnlyResponse(
      stored,
      input.observation_id,
      observationInputDigest,
      sealed.replay.baseline_profile,
      candidates,
    );
    const expectedActiveOnlyResponse = activeOnlyResponse(
      stored,
      input.observation_id,
      observationInputDigest,
      structuredClone(sealed.replay.baseline_profile),
      structuredClone(candidates) as [
        VerifiedPairwiseCandidate,
        ...VerifiedPairwiseCandidate[],
      ],
    );
    if (canonicalJson(publicResponse) !== canonicalJson(expectedActiveOnlyResponse)) {
      fail("task6_shadow_influence_detected");
    }
    let shadowOutputDigest: string;
    try {
      const model = task6InternalRequireVerifiedModelById(
        input.vault,
        stored.sealed_test_handle_id,
      );
      shadowOutputDigest = rankEligibleExpressions(model, candidates).output_digest;
    } catch {
      return fail("task6_model_invalid");
    }
    const observationPayload = {
      contract_version: "contentmd.shadow-observed-event-payload/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      shadow_run_id: input.shadow_run_id,
      observation_id: input.observation_id,
      input_digest: observationInputDigest,
      example_ref: pair.example_ref,
      leakage_group_ref: pair.leakage_group_ref,
      public_response_digest: publicResponse.response_digest,
      expected_active_only_response_digest: expectedActiveOnlyResponse.response_digest,
      shadow_output_digest: shadowOutputDigest,
    };
    const event = createShadowEvent(
      input.shadow_run_id,
      "shadow_observed",
      input.observed_at,
      "actor.task6.shadow-observation",
      observationPayload,
      stored.events.at(-1)!,
    );
    const observation: StoredShadowObservation = immutable({
      contract_version: "contentmd.stored-shadow-observation/0.1.0",
      observation_id: input.observation_id,
      observed_at: input.observed_at,
      input_digest: observationInputDigest,
      example_ref: pair.example_ref,
      leakage_group_ref: pair.leakage_group_ref,
      slice_refs: sliceRefs,
      public_response: publicResponse,
      expected_active_only_response: expectedActiveOnlyResponse,
      shadow_output_digest: shadowOutputDigest,
      event_ref: shadowEventRef(event),
    });
    const updated: StoredShadowRun = Object.freeze({
      ...stored,
      events: Object.freeze([
        ...stored.events,
        event,
      ]) as StoredShadowRun["events"],
      observations: Object.freeze([...stored.observations, observation]),
    });
    const nextRuns = storedShadowRuns(input.vault).map((run) =>
      run.shadow_run_id === stored.shadow_run_id ? updated : run);
    task6InternalCommitFrozenShadowRuns(
      input.vault,
      "shadow_observation_append",
      nextRuns,
    );
    const readback = findStoredShadowRun(input.vault, input.shadow_run_id)?.observations
      .find(({ observation_id }) => observation_id === input.observation_id);
    if (readback === undefined || readback.input_digest !== observationInputDigest) {
      fail("task6_event_readback_failed");
    }
    return immutable(readback.public_response);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function completeShadowSimulation(
  input: CompleteShadowSimulationInput,
): ShadowRunResult {
  try {
    modeGate(input, ["record_mode", "vault", "shadow", "ended_at", "actor_ref"]);
    closedGraph(input);
    assertMillisecondInstant(input.ended_at);
    if (typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || !shadowHandleMembership.has(input.shadow)
      || shadowHandleVaults.get(input.shadow) !== input.vault) {
      fail("task6_reference_invalid");
    }
    const stored = findStoredShadowRun(input.vault, input.shadow.shadow_run_id);
    if (stored === null || canonicalJson(stored.handle) !== canonicalJson(input.shadow)) {
      fail("task6_reference_invalid");
    }
    const material = shadowPlans.get(stored.plan.record_id);
    if (material === undefined || canonicalJson(material.plan) !== canonicalJson(stored.plan)) {
      fail("task6_replay_invalid");
    }
    const completionInputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-completion-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      shadow_handle_digest: input.shadow.handle_digest,
      ended_at: input.ended_at,
      actor_ref: input.actor_ref,
    });
    const status = statusFromRun(stored);
    if (status.state === "consumed_incomplete") fail("task6_shadow_completion_incomplete");
    if (status.state === "completed" || status.state === "insufficient" || status.state === "invalid") {
      if (stored.completion_input_digest !== completionInputDigest
        || stored.terminal_result === null) fail("task6_shadow_chronology_invalid");
      return immutable(stored.terminal_result as ShadowRunResult);
    }
    if (input.ended_at !== material.proposed_end_at) {
      fail("task6_shadow_chronology_invalid");
    }

    const claimPayload = {
      contract_version: "contentmd.shadow-completion-claimed-event-payload/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      shadow_run_id: stored.shadow_run_id,
      completion_input_digest: completionInputDigest,
      observation_count: stored.observations.length,
    };
    const claimEvent = createShadowEvent(
      stored.shadow_run_id,
      "shadow_completion_claimed",
      input.ended_at,
      input.actor_ref,
      claimPayload,
      stored.events.at(-1)!,
    );
    const claimedRun: StoredShadowRun = immutable({
      ...stored,
      completion_input_digest: completionInputDigest,
      events: [...stored.events, claimEvent],
    });
    task6InternalCommitShadowRuns(
      input.vault,
      "shadow_completion_claim",
      storedShadowRuns(input.vault).map((run) =>
        run.shadow_run_id === stored.shadow_run_id ? claimedRun : run),
    );
    const claimedReadback = findStoredShadowRun(input.vault, stored.shadow_run_id);
    if (claimedReadback === null
      || claimedReadback.completion_input_digest !== completionInputDigest
      || claimedReadback.events.at(-1)?.event_digest !== claimEvent.event_digest) {
      fail("task6_event_readback_failed");
    }

    const observationInputDigests = claimedReadback.observations.map(({ input_digest }) =>
      input_digest);
    const publicResponses = claimedReadback.observations.map(({ public_response }) =>
      public_response);
    const expectedResponses = claimedReadback.observations.map(
      ({ expected_active_only_response }) => expected_active_only_response,
    );
    const activeInputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-active-input-set/0.1.0",
      observation_input_digests: observationInputDigests,
    });
    const activeOutputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-active-output-set/0.1.0",
      active_output_digests: publicResponses.map(({ active_output_digest }) =>
        active_output_digest),
    });
    const shadowOutputDigest = sha256Canonical({
      contract_version: "contentmd.shadow-private-output-set/0.1.0",
      shadow_output_digests: claimedReadback.observations.map(({ shadow_output_digest }) =>
        shadow_output_digest),
    });
    const publicResponseSetDigest = sha256Canonical({
      contract_version: "contentmd.shadow-public-response-set/0.1.0",
      responses: publicResponses,
    });
    const expectedActiveOnlyResponseSetDigest = sha256Canonical({
      contract_version: "contentmd.shadow-expected-active-only-response-set/0.1.0",
      responses: expectedResponses,
    });
    const noInfluenceVerified = publicResponses.length === expectedResponses.length
      && publicResponses.every((response, index) =>
        canonicalJson(response) === canonicalJson(expectedResponses[index]));
    const leakageGroupCount = new Set(claimedReadback.observations.map(({ leakage_group_ref }) =>
      canonicalJson(leakage_group_ref))).size;
    const supportedSliceRefs = new Set(claimedReadback.observations.flatMap(({ slice_refs }) =>
      slice_refs.map((ref) => canonicalJson(ref))));
    const requiredSlicesSupported = stored.plan.payload.required_slice_refs.every((ref) =>
      supportedSliceRefs.has(canonicalJson(ref)));
    const sufficient = claimedReadback.observations.length >= stored.plan.payload.minimum_decisive_pairs
      && leakageGroupCount >= stored.plan.payload.minimum_leakage_groups
      && requiredSlicesSupported;
    const completionState = !noInfluenceVerified ? "invalid" as const
      : sufficient ? "completed" as const : "insufficient" as const;
    const resultSemantic = {
      contract_version: "contentmd.shadow-simulation-result/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      plan_ref: stored.plan_ref,
      observation_count: claimedReadback.observations.length,
      decisive_pair_count: claimedReadback.observations.length,
      leakage_group_count: leakageGroupCount,
      started_at: material.start_at,
      ended_at: input.ended_at,
      active_input_digest: activeInputDigest,
      active_output_digest: activeOutputDigest,
      shadow_output_digest: shadowOutputDigest,
      public_response_set_digest: publicResponseSetDigest,
      expected_active_only_response_set_digest: expectedActiveOnlyResponseSetDigest,
      no_influence_verified: noInfluenceVerified,
      completion_state: completionState,
    };
    const resultDigest = sha256Canonical(resultSemantic);
    const result: ShadowRunResult = immutable({
      ...resultSemantic,
      shadow_result_id: `shadow_result.${resultDigest.slice(0, 32)}`,
      result_digest: resultDigest,
    });
    const resultRef: Task6ObjectRef = {
      record_id: result.shadow_result_id,
      schema_id: "contentmd.shadow-simulation-result",
      schema_version: "0.1.0",
      content_digest: result.result_digest,
    };
    const terminalEventType = completionState === "completed" ? "shadow_completed" as const
      : completionState === "insufficient" ? "shadow_insufficient" as const
        : "shadow_invalid" as const;
    const terminalEvent = createShadowEvent(
      stored.shadow_run_id,
      terminalEventType,
      input.ended_at,
      input.actor_ref,
      {
        contract_version: "contentmd.shadow-terminal-event-payload/0.1.0",
        record_mode: "development_fixture",
        authority_effect: "none",
        shadow_run_id: stored.shadow_run_id,
        completion_input_digest: completionInputDigest,
        result_ref: resultRef,
      },
      claimEvent,
    );
    const terminalRun: StoredShadowRun = immutable({
      ...claimedReadback,
      terminal_result: result,
      events: [...claimedReadback.events, terminalEvent],
    });
    task6InternalCommitShadowRuns(
      input.vault,
      "shadow_terminal_append",
      storedShadowRuns(input.vault).map((run) =>
        run.shadow_run_id === stored.shadow_run_id ? terminalRun : run),
    );
    const terminalReadback = findStoredShadowRun(input.vault, stored.shadow_run_id);
    if (terminalReadback === null
      || canonicalJson(terminalReadback.terminal_result) !== canonicalJson(result)
      || terminalReadback.events.at(-1)?.event_digest !== terminalEvent.event_digest) {
      fail("task6_event_readback_failed");
    }
    return immutable(result);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

/**
 * Internal exact-value resolver for binding, drift, and rollback governance.
 * A caller-supplied digest-valid result is not authority: it must be the one
 * terminal value already committed inside the same active simulator vault.
 */
export function task6InternalRequireShadowResult(
  vault: EvaluationSimulatorVault,
  supplied: ShadowRunResult,
): ShadowRunResult {
  const matches = storedShadowRuns(vault).filter((stored) => {
    if (stored.terminal_result === null || typeof stored.terminal_result !== "object") return false;
    const result = stored.terminal_result as Partial<ShadowRunResult>;
    return result.shadow_result_id === supplied.shadow_result_id;
  });
  if (matches.length !== 1 || matches[0]!.terminal_result === null
    || canonicalJson(matches[0]!.terminal_result) !== canonicalJson(supplied)) {
    fail("task6_replay_invalid");
  }
  return matches[0]!.terminal_result as ShadowRunResult;
}

/** Return the sealed-test handle bound to an exact stored terminal result. */
export function task6InternalRequireShadowResultHandleId(
  vault: EvaluationSimulatorVault,
  supplied: ShadowRunResult,
): string {
  task6InternalRequireShadowResult(vault, supplied);
  const matches = storedShadowRuns(vault).filter((stored) => {
    if (stored.terminal_result === null || typeof stored.terminal_result !== "object") return false;
    const result = stored.terminal_result as Partial<ShadowRunResult>;
    return result.shadow_result_id === supplied.shadow_result_id;
  });
  if (matches.length !== 1) fail("task6_replay_invalid");
  return matches[0]!.sealed_test_handle_id;
}
