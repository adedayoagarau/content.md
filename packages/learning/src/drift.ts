import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
} from "@contentmd/core";
import type { LearningDriftReport } from "./records.js";
import type {
  Binary64Value,
  PairedBootstrapResult,
  Task6ObjectRef,
} from "./bootstrap.js";
import {
  Task6GovernanceError,
  task6InternalCommitTransitionReceipts,
  task6InternalReadLineageValues,
  task6InternalReadStreams,
  task6InternalReadTransitionReceipts,
  task6InternalRequireEvaluationResult,
  task6InternalRequireSealedReplayForEvaluation,
  task6InternalValidateCurrentness,
  type EvaluationMetricResult,
  type EvaluationRunResult,
  type EvaluationSimulatorVault,
  type SimulatedCurrentnessWitness,
  type SliceMetricResult,
  type Task6RecordMode,
} from "./evaluation.js";
import {
  task6InternalRequireSuspensionResult,
  task6InternalRequireVerifiedBindingReplay,
  task6InternalSimulateSuspension,
  type SimulatedBindingTransitionResult,
} from "./binding.js";
import type { DriftDatasetReplay, DriftPairReplay } from "./shadow.js";
import { task2CompareRfc3339Instants, task2IsRfc3339 } from "./feedback.js";
import { buildLearningDataset } from "./dataset.js";

export interface DriftObservation {
  observation_id: string;
  observed_at: string;
  pair: DriftPairReplay;
}

export interface EvaluateDriftWindowInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  actor_ref: string;
  previous_report: LearningDriftReport | null;
  promotion_evaluation: EvaluationRunResult;
  dataset_replay: DriftDatasetReplay;
  currentness: SimulatedCurrentnessWitness;
  observations: readonly DriftObservation[];
  evaluation_at: string;
}

export interface DriftWindowCursor {
  started_at: string;
  after_observation_id: string | null;
}

export interface DriftWindowStatus {
  contract_version: "contentmd.drift-window-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  drift_input_digest: string;
  binding_stream_id: string;
  state:
    | "report_committed"
    | "suspension_prepared"
    | "suspension_pending_readback"
    | "completed";
  report_ref: Task6ObjectRef;
  next_cursor: DriftWindowCursor;
  selected_observation_count: number;
  suspension_transition_id: string | null;
  terminal_result_digest: string | null;
  status_digest: string;
}

export interface DriftMetricDeltaResult {
  contract_version: "contentmd.drift-metric-delta-result/0.1.0";
  metric_delta_id: string;
  window_state: "evaluable" | "monitoring_insufficient";
  pair_count: number;
  leakage_group_count: number;
  accuracy_difference_from_promotion: Binary64Value | null;
  log_loss_difference_from_promotion: Binary64Value | null;
  required_slice_result_refs: readonly Task6ObjectRef[];
  bootstrap_ref: Task6ObjectRef | null;
  metric_delta_digest: string;
}

interface DriftWindowPopulation {
  contract_version: "contentmd.drift-window-population/0.1.0";
  population_id: string;
  binding_stream_id: string;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  window_started_at: string;
  window_ended_at: string;
  close_reason: "pair_cap" | "day_30";
  selected_observation_ids: readonly string[];
  leakage_group_refs: readonly Task6ObjectRef[];
  pair_count: number;
  leakage_group_count: number;
  population_digest: string;
}

export interface LearningDriftResult {
  contract_version: "contentmd.learning-drift-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  report: LearningDriftReport;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  close_reason: "pair_cap" | "day_30";
  metric_delta: DriftMetricDeltaResult;
  metrics: EvaluationMetricResult | null;
  slice_metrics: readonly SliceMetricResult[];
  bootstrap: PairedBootstrapResult | null;
  disposition: "continue" | "review" | "suspend";
  suspension_transition: SimulatedBindingTransitionResult | null;
  result_digest: string;
}

type LearningDriftResultPreimage = Omit<
  LearningDriftResult,
  "suspension_transition" | "result_digest"
>;

interface StoredDriftWindowReceipt {
  contract_version: "contentmd.stored-drift-window-receipt/0.1.0";
  request_digest: string;
  drift_input_digest: string;
  binding_stream_id: string;
  report: LearningDriftReport;
  window_population: DriftWindowPopulation;
  metric_delta: DriftMetricDeltaResult;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  close_reason: "pair_cap" | "day_30";
  selected_observation_ids: readonly string[];
  result_preimage: LearningDriftResultPreimage;
  stored_receipt_digest: string;
}

export interface SimulatedRevocationWitness {
  contract_version: "contentmd.simulated-revocation-witness/0.1.0";
  witness_id: string;
  revoked_ref: Task6ObjectRef;
  revoked_at: string;
  reason:
    | "source_revoked"
    | "qualification_revoked"
    | "permission_revoked"
    | "rights_revoked"
    | "privacy_failure"
    | "hard_rule_failure"
    | "copying_failure"
    | "authority_failure";
  replacement_ref: Task6ObjectRef | null;
  witness_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
}

export interface PropagateLearningRevocationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  revocation: SimulatedRevocationWitness;
  actor_ref: string;
  occurred_at: string;
}

const DIGEST = /^[a-f0-9]{64}$/u;

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
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
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

interface DriftWindowSelectionInput {
  start_cursor: DriftWindowCursor;
  observations: readonly Pick<DriftObservation, "observation_id" | "observed_at">[];
  evaluation_at: string;
}

interface DriftWindowSelection {
  close_reason: "pair_cap" | "day_30";
  window_started_at: string;
  window_ended_at: string;
  selected_observation_ids: readonly string[];
  next_cursor: DriftWindowCursor;
}

const DRIFT_WINDOW_MILLISECONDS = 30 * 86_400_000;
const DRIFT_PAIR_CAP = 100;
const DRIFT_SUSPENSION_MILLISECONDS = 60 * 86_400_000;
const utf8Encoder = new TextEncoder();

function compareUtf8(left: string, right: string): number {
  const leftBytes = utf8Encoder.encode(left);
  const rightBytes = utf8Encoder.encode(right);
  const length = Math.min(leftBytes.length, rightBytes.length);
  for (let index = 0; index < length; index += 1) {
    if (leftBytes[index] !== rightBytes[index]) return leftBytes[index]! - rightBytes[index]!;
  }
  return leftBytes.length - rightBytes.length;
}

function instantMilliseconds(value: string): number {
  if (!task2IsRfc3339(value)) fail("task6_drift_window_invalid");
  const milliseconds = Date.parse(value);
  if (!Number.isFinite(milliseconds)) fail("task6_drift_window_invalid");
  return milliseconds;
}

function afterCursor(
  observedMilliseconds: number,
  observationId: string,
  cursorMilliseconds: number,
  cursorObservationId: string | null,
): boolean {
  if (observedMilliseconds !== cursorMilliseconds) {
    return observedMilliseconds > cursorMilliseconds;
  }
  return cursorObservationId === null || compareUtf8(observationId, cursorObservationId) > 0;
}

export function task6InternalSelectDriftWindow(
  input: DriftWindowSelectionInput,
): DriftWindowSelection {
  if (input === null || typeof input !== "object" || Array.isArray(input)
    || !Array.isArray(input.observations)
    || input.start_cursor === null || typeof input.start_cursor !== "object"
    || Array.isArray(input.start_cursor)
    || typeof input.start_cursor.started_at !== "string"
    || (input.start_cursor.after_observation_id !== null
      && (typeof input.start_cursor.after_observation_id !== "string"
        || input.start_cursor.after_observation_id.length === 0))) {
    fail("task6_drift_window_invalid");
  }
  const startedMilliseconds = instantMilliseconds(input.start_cursor.started_at);
  const evaluationMilliseconds = instantMilliseconds(input.evaluation_at);
  const scheduledEndMilliseconds = startedMilliseconds + DRIFT_WINDOW_MILLISECONDS;
  if (!Number.isSafeInteger(scheduledEndMilliseconds)
    || input.observations.length > DRIFT_PAIR_CAP) fail("task6_drift_window_invalid");
  let priorMilliseconds = startedMilliseconds;
  let priorId = input.start_cursor.after_observation_id;
  const ids = new Set<string>();
  for (const observation of input.observations) {
    if (observation === null || typeof observation !== "object" || Array.isArray(observation)
      || typeof observation.observation_id !== "string" || observation.observation_id.length === 0
      || typeof observation.observed_at !== "string" || ids.has(observation.observation_id)) {
      fail("task6_drift_window_invalid");
    }
    const observedMilliseconds = instantMilliseconds(observation.observed_at);
    if (!afterCursor(observedMilliseconds, observation.observation_id, priorMilliseconds, priorId)
      || observedMilliseconds >= scheduledEndMilliseconds
      || observedMilliseconds > evaluationMilliseconds) fail("task6_drift_window_invalid");
    ids.add(observation.observation_id);
    priorMilliseconds = observedMilliseconds;
    priorId = observation.observation_id;
  }
  const pairCapReached = input.observations.length === DRIFT_PAIR_CAP;
  if (!pairCapReached && evaluationMilliseconds < scheduledEndMilliseconds) {
    fail("task6_drift_window_invalid");
  }
  const closeReason = pairCapReached ? "pair_cap" as const : "day_30" as const;
  const windowStartedAt = new Date(startedMilliseconds).toISOString();
  const windowEndedAt = pairCapReached
    ? new Date(priorMilliseconds).toISOString()
    : new Date(scheduledEndMilliseconds).toISOString();
  const nextCursor: DriftWindowCursor = pairCapReached
    ? { started_at: windowEndedAt, after_observation_id: priorId }
    : { started_at: windowEndedAt, after_observation_id: null };
  return Object.freeze({
    close_reason: closeReason,
    window_started_at: windowStartedAt,
    window_ended_at: windowEndedAt,
    selected_observation_ids: Object.freeze(input.observations.map(({ observation_id }) =>
      observation_id)),
    next_cursor: Object.freeze(nextCursor),
  });
}

interface DriftDispositionInput {
  prior_consecutive_degraded_windows: number;
  prior_consecutive_insufficient_windows: number;
  window_state: "evaluable" | "monitoring_insufficient";
  degraded: boolean;
  window_ended_at: string;
  last_evaluable_window_ended_at: string;
}

interface DriftDisposition {
  consecutive_degraded_windows: number;
  consecutive_insufficient_windows: number;
  disposition: "continue" | "review" | "suspend";
}

export function task6InternalDeriveDriftDisposition(
  input: DriftDispositionInput,
): DriftDisposition {
  if (!Number.isSafeInteger(input.prior_consecutive_degraded_windows)
    || input.prior_consecutive_degraded_windows < 0
    || !Number.isSafeInteger(input.prior_consecutive_insufficient_windows)
    || input.prior_consecutive_insufficient_windows < 0
    || (input.window_state !== "evaluable"
      && input.window_state !== "monitoring_insufficient")
    || typeof input.degraded !== "boolean"
    || (input.window_state === "monitoring_insufficient" && input.degraded)) {
    fail("task6_drift_history_invalid");
  }
  const windowEndedMilliseconds = instantMilliseconds(input.window_ended_at);
  const lastEvaluableMilliseconds = instantMilliseconds(input.last_evaluable_window_ended_at);
  if (windowEndedMilliseconds < lastEvaluableMilliseconds) fail("task6_drift_history_invalid");
  const consecutiveDegradedWindows = input.window_state === "evaluable" && input.degraded
    ? input.prior_consecutive_degraded_windows + 1
    : 0;
  const consecutiveInsufficientWindows = input.window_state === "monitoring_insufficient"
    ? input.prior_consecutive_insufficient_windows + 1
    : 0;
  if (!Number.isSafeInteger(consecutiveDegradedWindows)
    || !Number.isSafeInteger(consecutiveInsufficientWindows)) {
    fail("task6_drift_history_invalid");
  }
  const staleWithoutEvaluation = input.window_state === "monitoring_insufficient"
    && windowEndedMilliseconds - lastEvaluableMilliseconds >= DRIFT_SUSPENSION_MILLISECONDS;
  const suspend = consecutiveDegradedWindows >= 2
    || consecutiveInsufficientWindows >= 2
    || staleWithoutEvaluation;
  const review = input.window_state === "monitoring_insufficient" || input.degraded;
  return Object.freeze({
    consecutive_degraded_windows: consecutiveDegradedWindows,
    consecutive_insufficient_windows: consecutiveInsufficientWindows,
    disposition: suspend ? "suspend" : review ? "review" : "continue",
  });
}

interface DriftWindowStatusInput {
  drift_input_digest: string;
  binding_stream_id: string;
  state: DriftWindowStatus["state"];
  report_ref: Task6ObjectRef;
  next_cursor: DriftWindowCursor;
  selected_observation_ids: readonly string[];
  suspension_transition_id: string | null;
  terminal_result_digest: string | null;
}

function validRef(ref: Task6ObjectRef): boolean {
  return ref !== null && typeof ref === "object" && !Array.isArray(ref)
    && typeof ref.record_id === "string" && ref.record_id.length > 0
    && typeof ref.schema_id === "string" && ref.schema_id.length > 0
    && ref.schema_version === "0.1.0" && DIGEST.test(ref.content_digest);
}

export function task6InternalIssueDriftWindowStatus(
  input: DriftWindowStatusInput,
): DriftWindowStatus {
  const states: readonly DriftWindowStatus["state"][] = [
    "report_committed", "suspension_prepared", "suspension_pending_readback", "completed",
  ];
  if (!DIGEST.test(input.drift_input_digest)
    || !/^learning_binding_sim\.[a-f0-9]{32}$/u.test(input.binding_stream_id)
    || !states.includes(input.state)
    || !validRef(input.report_ref)
    || input.next_cursor === null || typeof input.next_cursor !== "object"
    || typeof input.next_cursor.started_at !== "string"
    || !task2IsRfc3339(input.next_cursor.started_at)
    || (input.next_cursor.after_observation_id !== null
      && (typeof input.next_cursor.after_observation_id !== "string"
        || input.next_cursor.after_observation_id.length === 0))
    || !Array.isArray(input.selected_observation_ids)
    || input.selected_observation_ids.some((id) => typeof id !== "string" || id.length === 0)
    || new Set(input.selected_observation_ids).size !== input.selected_observation_ids.length
    || (input.suspension_transition_id !== null
      && !/^learning_transition\.[a-f0-9]{32}$/u.test(input.suspension_transition_id))
    || (input.terminal_result_digest !== null && !DIGEST.test(input.terminal_result_digest))) {
    fail("task6_drift_history_invalid");
  }
  const transitionRequired = input.state === "suspension_prepared"
    || input.state === "suspension_pending_readback";
  if ((input.state === "report_committed"
      && (input.suspension_transition_id !== null || input.terminal_result_digest !== null))
    || (transitionRequired
      && (input.suspension_transition_id === null || input.terminal_result_digest !== null))
    || (input.state === "completed" && input.terminal_result_digest === null)) {
    fail("task6_drift_history_invalid");
  }
  const semantic = {
    contract_version: "contentmd.drift-window-status/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    drift_input_digest: input.drift_input_digest,
    binding_stream_id: input.binding_stream_id,
    state: input.state,
    report_ref: input.report_ref,
    next_cursor: input.next_cursor,
    selected_observation_count: input.selected_observation_ids.length,
    suspension_transition_id: input.suspension_transition_id,
    terminal_result_digest: input.terminal_result_digest,
  };
  return immutable({ ...semantic, status_digest: sha256Canonical(semantic) });
}

function sameCanonical(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function objectRef(
  recordId: string,
  schemaId: string,
  contentDigest: string,
): Task6ObjectRef {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: contentDigest,
  };
}

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): Task6ObjectRef {
  return objectRef(record.record_id, record.schema_id, record.content_digest);
}

function refsEqual(left: Task6ObjectRef, right: Task6ObjectRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function assertObjectRef(ref: Task6ObjectRef): void {
  exactTopLevel(ref, ["record_id", "schema_id", "schema_version", "content_digest"]);
  if (typeof ref.record_id !== "string" || ref.record_id.length === 0
    || typeof ref.schema_id !== "string" || ref.schema_id.length === 0
    || ref.schema_version !== "0.1.0" || !DIGEST.test(ref.content_digest)) {
    fail("task6_reference_invalid");
  }
}

function revocationReference(witness: SimulatedRevocationWitness): Task6ObjectRef {
  exactTopLevel(witness, [
    "contract_version", "witness_id", "revoked_ref", "revoked_at", "reason",
    "replacement_ref", "witness_digest", "record_mode", "authority_effect",
  ]);
  assertObjectRef(witness.revoked_ref);
  if (witness.replacement_ref !== null) assertObjectRef(witness.replacement_ref);
  if (witness.contract_version !== "contentmd.simulated-revocation-witness/0.1.0"
    || typeof witness.witness_id !== "string" || witness.witness_id.length === 0
    || !task2IsRfc3339(witness.revoked_at)
    || ![
      "source_revoked", "qualification_revoked", "permission_revoked", "rights_revoked",
      "privacy_failure", "hard_rule_failure", "copying_failure", "authority_failure",
    ].includes(witness.reason)
    || witness.record_mode !== "development_fixture"
    || witness.authority_effect !== "none") {
    fail("task6_input_shape_invalid");
  }
  const { witness_id: _witnessId, witness_digest: _witnessDigest, ...preimage } = witness;
  const digest = sha256Canonical(preimage);
  if (witness.witness_digest !== digest
    || witness.witness_id !== `simulated_revocation.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return objectRef(
    witness.witness_id,
    "contentmd.simulated-revocation-witness",
    witness.witness_digest,
  );
}

export interface Task6InternalReferenceIndex {
  exact: Set<string>;
  digestsByIdentity: Map<string, Set<string>>;
}

export function task6InternalReferenceIndex(
  values: readonly unknown[],
): Task6InternalReferenceIndex {
  const exact = new Set<string>();
  const digestsByIdentity = new Map<string, Set<string>>();
  const visited = new Set<object>();
  const ancestors = new Set<object>();
  const add = (
    recordId: unknown,
    schemaId: unknown,
    schemaVersion: unknown,
    contentDigest: unknown,
  ): void => {
    if (typeof recordId !== "string" || recordId.length === 0
      || typeof schemaId !== "string" || schemaId.length === 0
      || schemaVersion !== "0.1.0"
      || typeof contentDigest !== "string" || !DIGEST.test(contentDigest)) return;
    const identity = `${recordId}\0${schemaId}\0${schemaVersion}`;
    exact.add(`${identity}\0${contentDigest}`);
    const digests = digestsByIdentity.get(identity) ?? new Set<string>();
    digests.add(contentDigest);
    digestsByIdentity.set(identity, digests);
  };
  const visit = (value: unknown): void => {
    if (value === null || typeof value !== "object") return;
    if (ancestors.has(value)) fail("task6_revocation_lineage_invalid");
    if (visited.has(value)) return;
    ancestors.add(value);
    if (!Array.isArray(value)) {
      const candidate = value as Record<string, unknown>;
      add(
        candidate["record_id"],
        candidate["schema_id"],
        candidate["schema_version"],
        candidate["content_digest"],
      );
      if (typeof candidate["snapshot_kind"] === "string") {
        add(
          candidate["snapshot_id"],
          `contentmd.task2-${candidate["snapshot_kind"]}-snapshot`,
          "0.1.0",
          candidate["snapshot_digest"],
        );
      }
    }
    for (const key of Reflect.ownKeys(value)) {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (typeof key !== "string" || descriptor === undefined || !("value" in descriptor)) {
        fail("task6_revocation_lineage_invalid");
      }
      visit(descriptor.value);
    }
    ancestors.delete(value);
    visited.add(value);
  };
  values.forEach(visit);
  return { exact, digestsByIdentity };
}

function refIndexKey(ref: Task6ObjectRef): string {
  return `${ref.record_id}\0${ref.schema_id}\0${ref.schema_version}\0${ref.content_digest}`;
}

function refIdentityKey(ref: Task6ObjectRef): string {
  return `${ref.record_id}\0${ref.schema_id}\0${ref.schema_version}`;
}

function requestDigest(input: EvaluateDriftWindowInput): string {
  return sha256Canonical({
    contract_version: "contentmd.learning-drift-request/0.1.0",
    record_mode: input.record_mode,
    binding_stream_id: input.binding_stream_id,
    expected_head_digest: input.expected_head_digest,
    actor_ref: input.actor_ref,
    previous_report: input.previous_report,
    promotion_evaluation: input.promotion_evaluation,
    dataset_replay: input.dataset_replay,
    currentness: input.currentness,
    observations: input.observations,
    evaluation_at: input.evaluation_at,
  });
}

function storedDriftReceipts(vault: EvaluationSimulatorVault): readonly StoredDriftWindowReceipt[] {
  const values = task6InternalReadTransitionReceipts(vault);
  if (!Array.isArray(values)) fail("task6_vault_invalid");
  return values.filter((value): value is StoredDriftWindowReceipt =>
    value !== null && typeof value === "object" && !Array.isArray(value)
    && (value as { contract_version?: unknown }).contract_version
      === "contentmd.stored-drift-window-receipt/0.1.0");
}

function populationRef(population: DriftWindowPopulation): Task6ObjectRef {
  return objectRef(
    population.population_id,
    "contentmd.drift-window-population",
    population.population_digest,
  );
}

function metricDeltaRef(metric: DriftMetricDeltaResult): Task6ObjectRef {
  return objectRef(
    metric.metric_delta_id,
    "contentmd.drift-metric-delta-result",
    metric.metric_delta_digest,
  );
}

function issuePopulation(
  bindingStreamId: string,
  selection: DriftWindowSelection,
  startCursor: DriftWindowCursor,
  leakageGroupRefs: readonly Task6ObjectRef[],
): DriftWindowPopulation {
  const semantic = {
    contract_version: "contentmd.drift-window-population/0.1.0" as const,
    binding_stream_id: bindingStreamId,
    start_cursor: startCursor,
    next_cursor: selection.next_cursor,
    window_started_at: selection.window_started_at,
    window_ended_at: selection.window_ended_at,
    close_reason: selection.close_reason,
    selected_observation_ids: selection.selected_observation_ids,
    leakage_group_refs: leakageGroupRefs,
    pair_count: selection.selected_observation_ids.length,
    leakage_group_count: leakageGroupRefs.length,
  };
  const digest = sha256Canonical(semantic);
  return immutable({
    ...semantic,
    population_id: `drift_window_population.${digest.slice(0, 32)}`,
    population_digest: digest,
  });
}

function issueMonitoringInsufficientMetricDelta(): DriftMetricDeltaResult {
  const semantic = {
    contract_version: "contentmd.drift-metric-delta-result/0.1.0" as const,
    window_state: "monitoring_insufficient" as const,
    pair_count: 0,
    leakage_group_count: 0,
    accuracy_difference_from_promotion: null,
    log_loss_difference_from_promotion: null,
    required_slice_result_refs: [] as readonly Task6ObjectRef[],
    bootstrap_ref: null,
  };
  const digest = sha256Canonical(semantic);
  return immutable({
    ...semantic,
    metric_delta_id: `drift_metric_delta.${digest.slice(0, 32)}`,
    metric_delta_digest: digest,
  });
}

function compareProvenance(
  left: { relationship: string; ref: Task6ObjectRef },
  right: { relationship: string; ref: Task6ObjectRef },
): number {
  return compareUtf8(left.relationship, right.relationship)
    || compareUtf8(left.ref.record_id, right.ref.record_id)
    || compareUtf8(left.ref.schema_id, right.ref.schema_id)
    || compareUtf8(left.ref.schema_version, right.ref.schema_version)
    || compareUtf8(left.ref.content_digest, right.ref.content_digest);
}

function validateStoredReceipt(receipt: StoredDriftWindowReceipt): void {
  try {
    const { stored_receipt_digest: _storedReceiptDigest, ...receiptSemantic } = receipt;
    const {
      population_id: _populationId,
      population_digest: _populationDigest,
      ...populationSemantic
    } = receipt.window_population;
    const {
      metric_delta_id: _metricId,
      metric_delta_digest: _metricDigest,
      ...metricSemantic
    } = receipt.metric_delta;
    const populationDigest = sha256Canonical(populationSemantic);
    const metricDigest = sha256Canonical(metricSemantic);
    if (!DIGEST.test(receipt.request_digest)
      || !DIGEST.test(receipt.drift_input_digest)
      || receipt.stored_receipt_digest !== sha256Canonical(receiptSemantic)
      || receipt.window_population.population_digest !== populationDigest
      || receipt.window_population.population_id
        !== `drift_window_population.${populationDigest.slice(0, 32)}`
      || receipt.metric_delta.metric_delta_digest !== metricDigest
      || receipt.metric_delta.metric_delta_id
        !== `drift_metric_delta.${metricDigest.slice(0, 32)}`
      || !verifyRecordDigest(receipt.report).valid
      || receipt.report.payload.input_digest !== receipt.drift_input_digest
      || !sameCanonical(receipt.result_preimage.report, receipt.report)
      || !sameCanonical(receipt.result_preimage.metric_delta, receipt.metric_delta)
      || !sameCanonical(receipt.result_preimage.start_cursor, receipt.start_cursor)
      || !sameCanonical(receipt.result_preimage.next_cursor, receipt.next_cursor)
      || receipt.result_preimage.close_reason !== receipt.close_reason
      || !sameCanonical(
        receipt.window_population.selected_observation_ids,
        receipt.selected_observation_ids,
      )
      || receipt.window_population.binding_stream_id !== receipt.binding_stream_id
      || receipt.window_population.pair_count !== receipt.selected_observation_ids.length
      || receipt.result_preimage.report.payload.decisive_pair_count
        !== receipt.selected_observation_ids.length) {
      fail("task6_drift_history_invalid");
    }
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    fail("task6_drift_history_invalid");
  }
}

function reportReference(report: LearningDriftReport): Task6ObjectRef {
  return recordRef(report);
}

function issueDriftResult(
  preimage: LearningDriftResultPreimage,
  suspensionTransition: SimulatedBindingTransitionResult | null,
): LearningDriftResult {
  const semantic = { ...preimage, suspension_transition: suspensionTransition };
  return immutable({ ...semantic, result_digest: sha256Canonical(semantic) });
}

function completedStatus(
  receipt: StoredDriftWindowReceipt,
  result: LearningDriftResult,
): DriftWindowStatus {
  return task6InternalIssueDriftWindowStatus({
    drift_input_digest: receipt.drift_input_digest,
    binding_stream_id: receipt.binding_stream_id,
    state: "completed",
    report_ref: reportReference(receipt.report),
    next_cursor: receipt.next_cursor,
    selected_observation_ids: receipt.selected_observation_ids,
    suspension_transition_id: result.suspension_transition?.transition_id ?? null,
    terminal_result_digest: result.result_digest,
  });
}

function reportCommittedStatus(receipt: StoredDriftWindowReceipt): DriftWindowStatus {
  return task6InternalIssueDriftWindowStatus({
    drift_input_digest: receipt.drift_input_digest,
    binding_stream_id: receipt.binding_stream_id,
    state: "report_committed",
    report_ref: reportReference(receipt.report),
    next_cursor: receipt.next_cursor,
    selected_observation_ids: receipt.selected_observation_ids,
    suspension_transition_id: null,
    terminal_result_digest: null,
  });
}

function resultFromReceipt(
  vault: EvaluationSimulatorVault,
  receipt: StoredDriftWindowReceipt,
): LearningDriftResult | null {
  if (receipt.result_preimage.disposition !== "suspend") {
    return issueDriftResult(receipt.result_preimage, null);
  }
  const suspension = task6InternalRequireSuspensionResult(
    vault,
    receipt.binding_stream_id,
    reportReference(receipt.report),
  );
  return suspension === null ? null : issueDriftResult(receipt.result_preimage, suspension);
}

export function evaluateDriftWindow(input: EvaluateDriftWindowInput): LearningDriftResult {
  try {
    modeGate(input, [
      "record_mode", "vault", "binding_stream_id", "expected_head_digest", "actor_ref",
      "previous_report", "promotion_evaluation", "dataset_replay", "currentness",
      "observations", "evaluation_at",
    ]);
    task6InternalReadStreams(input.vault);
    if (typeof input.binding_stream_id !== "string"
      || typeof input.expected_head_digest !== "string" || !DIGEST.test(input.expected_head_digest)
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || !task2IsRfc3339(input.evaluation_at)
      || !Array.isArray(input.observations)) fail("task6_input_shape_invalid");

    const exactRequestDigest = requestDigest(input);
    const priorReceipts = storedDriftReceipts(input.vault);
    const retries = priorReceipts.filter((receipt) => receipt.request_digest === exactRequestDigest);
    if (retries.length > 1) fail("task6_drift_history_invalid");
    if (retries.length === 1) {
      const stored = retries[0]!;
      validateStoredReceipt(stored);
      let existingResult = resultFromReceipt(input.vault, stored);
      if (existingResult === null && stored.result_preimage.disposition === "suspend") {
        task6InternalSimulateSuspension({
          vault: input.vault,
          binding_stream_id: stored.binding_stream_id,
          expected_head_digest: input.expected_head_digest,
          cause_kind: "drift",
          cause_ref: reportReference(stored.report),
          cause_value: stored.report,
          actor_ref: input.actor_ref,
          occurred_at: input.evaluation_at,
        });
        existingResult = resultFromReceipt(input.vault, stored);
      }
      if (existingResult === null) fail("task6_drift_history_invalid");
      return immutable(existingResult);
    }
    const bindingReceipts = priorReceipts.filter((receipt) =>
      receipt.binding_stream_id === input.binding_stream_id);
    let previousReceipt: StoredDriftWindowReceipt | null = null;
    if (input.previous_report === null) {
      if (bindingReceipts.length !== 0) fail("task6_drift_history_invalid");
    } else {
      const matches = bindingReceipts.filter((receipt) =>
        receipt.report.record_id === input.previous_report!.record_id
        && receipt.report.content_digest === input.previous_report!.content_digest);
      if (matches.length !== 1 || bindingReceipts.at(-1) !== matches[0]
        || !sameCanonical(matches[0]!.report, input.previous_report)) {
        fail("task6_drift_history_invalid");
      }
      validateStoredReceipt(matches[0]!);
      previousReceipt = matches[0]!;
    }
    const binding = task6InternalRequireVerifiedBindingReplay(
      input.vault,
      input.binding_stream_id,
      input.expected_head_digest,
    );
    const promotionEvaluation = task6InternalRequireEvaluationResult(
      input.vault,
      input.promotion_evaluation,
    );
    if (binding.promotion_evaluation.result_digest !== promotionEvaluation.result_digest
      || !refsEqual(
        recordRef(binding.promotion_evaluation.evaluation_record),
        recordRef(promotionEvaluation.evaluation_record),
      )
      || promotionEvaluation.evaluation_record.payload.evaluation_state !== "passed"
      || promotionEvaluation.predicate.evaluation_passed !== true) {
      fail("task6_replay_invalid");
    }
    const sealed = task6InternalRequireSealedReplayForEvaluation(
      input.vault,
      promotionEvaluation,
    );
    if (binding.projection.model_ref === null
      || !refsEqual(binding.projection.model_ref, sealed.handle.model_ref)) {
      fail("task6_replay_invalid");
    }
    const scope = sealed.replay.proposed_scope;
    const scopeRef = objectRef(
      scope.scope_id,
      "contentmd.proposed-binding-scope",
      scope.scope_digest,
    );
    const reviewerRefs = sealed.replay.reviewer_policy.reviewers.map(({ reviewer_ref }) =>
      reviewer_ref);
    if (input.currentness.checked_at !== input.evaluation_at) fail("task6_source_not_current");
    task6InternalValidateCurrentness(input.currentness, scopeRef, reviewerRefs);

    if (input.dataset_replay.contract_version !== "contentmd.drift-dataset-replay/0.1.0") {
      fail("task6_replay_invalid");
    }
    let replayedDataset;
    try {
      replayedDataset = buildLearningDataset(input.dataset_replay.build_input);
    } catch {
      return fail("task6_replay_invalid");
    }
    if (!sameCanonical(replayedDataset, input.dataset_replay.expected_build_result)
      || replayedDataset.groups.length !== 0
      || replayedDataset.manifest !== null
      || replayedDataset.diagnostics.included_examples !== 0
      || input.observations.length !== 0) {
      fail("task6_drift_window_invalid");
    }

    const startCursor: DriftWindowCursor = previousReceipt === null
      ? { started_at: binding.verified_at, after_observation_id: null }
      : immutable(previousReceipt.next_cursor);
    const selection = task6InternalSelectDriftWindow({
      start_cursor: startCursor,
      observations: [],
      evaluation_at: input.evaluation_at,
    });
    const population = issuePopulation(input.binding_stream_id, selection, startCursor, []);
    const metricDelta = issueMonitoringInsufficientMetricDelta();
    const disposition = task6InternalDeriveDriftDisposition({
      prior_consecutive_degraded_windows:
        previousReceipt?.report.payload.consecutive_degraded_windows ?? 0,
      prior_consecutive_insufficient_windows:
        previousReceipt?.report.payload.consecutive_insufficient_windows ?? 0,
      window_state: "monitoring_insufficient",
      degraded: false,
      window_ended_at: selection.window_ended_at,
      last_evaluable_window_ended_at: previousReceipt?.report.payload.window_state === "evaluable"
        ? previousReceipt.report.payload.window_ended_at
        : binding.verified_at,
    });

    const bindingRef = objectRef(
      binding.projection.projection_id,
      "contentmd.simulated-binding-projection",
      binding.projection.projection_digest,
    );
    const modelRef = binding.projection.model_ref;
    const promotionEvaluationRef = recordRef(promotionEvaluation.evaluation_record);
    const metricRef = metricDeltaRef(metricDelta);
    const windowPopulationRef = populationRef(population);
    const currentnessRef = objectRef(
      input.currentness.witness_id,
      "contentmd.simulated-currentness-witness",
      input.currentness.witness_digest,
    );
    const codeManifestRef = objectRef(
      `task6_code_manifest.${sealed.replay.evaluation_code_manifest.manifest_digest.slice(0, 32)}`,
      "contentmd.task6-code-manifest",
      sealed.replay.evaluation_code_manifest.manifest_digest,
    );
    const runtimeRef = objectRef(
      `task6_runtime_profile.${sealed.replay.evaluation_runtime_profile.profile_digest.slice(0, 32)}`,
      "contentmd.task6-runtime-profile",
      sealed.replay.evaluation_runtime_profile.profile_digest,
    );
    const previousReportRef = previousReceipt === null
      ? null
      : reportReference(previousReceipt.report);
    const driftInputDigest = sha256Canonical({
      contract_version: "contentmd.learning-drift-input/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      binding_ref: bindingRef,
      model_ref: modelRef,
      promotion_evaluation_ref: promotionEvaluationRef,
      previous_report_ref: previousReportRef,
      start_cursor: startCursor,
      next_cursor: selection.next_cursor,
      window_started_at: selection.window_started_at,
      window_ended_at: selection.window_ended_at,
      close_reason: selection.close_reason,
      decisive_pair_count: 0,
      leakage_group_count: 0,
      window_population_ref: windowPopulationRef,
      metric_delta_ref: metricRef,
      consecutive_degraded_windows: disposition.consecutive_degraded_windows,
      consecutive_insufficient_windows: disposition.consecutive_insufficient_windows,
      immediate_failure_refs: [],
      disposition: disposition.disposition,
      window_state: "monitoring_insufficient",
      currentness_witness_ref: currentnessRef,
      code_verification_digest: sealed.handle.code_verification_digest,
      runtime_verification_digest: sealed.handle.runtime_verification_digest,
    });
    const learningSchema = sealed.replay.evaluation_code_manifest.entries.find(({ path }) =>
      path === "packages/schemas/src/learning-records.schema.json");
    if (learningSchema === undefined) fail("task6_code_manifest_invalid");
    const provenanceEntries = [
      { relationship: "drift_binding", ref: bindingRef },
      { relationship: "drift_model", ref: modelRef },
      { relationship: "promotion_evaluation", ref: promotionEvaluationRef },
      { relationship: "drift_window_population", ref: windowPopulationRef },
      { relationship: "drift_metric_delta", ref: metricRef },
      { relationship: "evaluation_code_manifest", ref: codeManifestRef },
      { relationship: "evaluation_runtime_profile", ref: runtimeRef },
      ...(previousReportRef === null
        ? []
        : [{ relationship: "previous_drift_report", ref: previousReportRef }]),
    ].sort(compareProvenance);
    const provenance = provenanceEntries.map(({ relationship, ref }) => ({
      record_id: ref.record_id,
      relationship,
      content_digest: ref.content_digest,
    })) as [
      { record_id: string; relationship: string; content_digest: string },
      ...Array<{ record_id: string; relationship: string; content_digest: string }>,
    ];
    const report = finalizeRecord({
      record_id: `learning_drift.${driftInputDigest.slice(0, 32)}`,
      schema_id: "contentmd.learning-drift-report",
      schema_version: "0.1.0",
      record_version: 1,
      scope: structuredClone(sealed.replay.model_record.scope),
      provenance,
      lifecycle_state: "active",
      payload: {
        contract_version: "contentmd.learning-record-contract/0.1.0",
        record_mode: "development_fixture",
        ranking_objective: "expression_preference",
        candidate_kind: "expression",
        schema_digest: learningSchema.raw_bytes_digest,
        code_digest: sealed.replay.evaluation_code_manifest.manifest_digest,
        input_digest: driftInputDigest,
        authority_effect: "none",
        binding_ref: bindingRef,
        model_ref: modelRef,
        promotion_evaluation_ref: promotionEvaluationRef,
        window_started_at: selection.window_started_at,
        window_ended_at: selection.window_ended_at,
        decisive_pair_count: 0,
        leakage_group_count: 0,
        metric_delta_refs: [metricRef],
        consecutive_degraded_windows: disposition.consecutive_degraded_windows,
        consecutive_insufficient_windows: disposition.consecutive_insufficient_windows,
        immediate_failure_refs: [],
        disposition: disposition.disposition,
        window_state: "monitoring_insufficient",
      },
    }) as unknown as LearningDriftReport;
    const resultPreimage: LearningDriftResultPreimage = {
      contract_version: "contentmd.learning-drift-result/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      report,
      start_cursor: startCursor,
      next_cursor: selection.next_cursor,
      close_reason: selection.close_reason,
      metric_delta: metricDelta,
      metrics: null,
      slice_metrics: [] as readonly SliceMetricResult[],
      bootstrap: null,
      disposition: disposition.disposition,
    };
    const receiptSemantic = {
      contract_version: "contentmd.stored-drift-window-receipt/0.1.0" as const,
      request_digest: exactRequestDigest,
      drift_input_digest: driftInputDigest,
      binding_stream_id: input.binding_stream_id,
      report,
      window_population: population,
      metric_delta: metricDelta,
      start_cursor: startCursor,
      next_cursor: selection.next_cursor,
      close_reason: selection.close_reason,
      selected_observation_ids: selection.selected_observation_ids,
      result_preimage: resultPreimage,
    };
    const receipt = immutable({
      ...receiptSemantic,
      stored_receipt_digest: sha256Canonical(receiptSemantic),
    });
    task6InternalCommitTransitionReceipts(
      input.vault,
      "drift_report_append",
      [...task6InternalReadTransitionReceipts(input.vault), receipt],
    );
    const readback = storedDriftReceipts(input.vault).filter((candidate) =>
      candidate.drift_input_digest === driftInputDigest);
    if (readback.length !== 1) fail("task6_event_readback_failed");
    validateStoredReceipt(readback[0]!);
    let suspension: SimulatedBindingTransitionResult | null = null;
    if (disposition.disposition === "suspend") {
      suspension = task6InternalSimulateSuspension({
        vault: input.vault,
        binding_stream_id: input.binding_stream_id,
        expected_head_digest: input.expected_head_digest,
        cause_kind: "drift",
        cause_ref: reportReference(report),
        cause_value: report,
        actor_ref: input.actor_ref,
        occurred_at: input.evaluation_at,
      });
    }
    return issueDriftResult(readback[0]!.result_preimage, suspension);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function inspectDriftWindow(
  vault: EvaluationSimulatorVault,
  driftInputDigest: string,
): DriftWindowStatus | null {
  try {
    if (typeof driftInputDigest !== "string" || !DIGEST.test(driftInputDigest)) {
      fail("task6_digest_invalid");
    }
    task6InternalReadStreams(vault);
    const matches = storedDriftReceipts(vault).filter((receipt) =>
      receipt.drift_input_digest === driftInputDigest);
    if (matches.length === 0) return null;
    if (matches.length !== 1) fail("task6_drift_history_invalid");
    validateStoredReceipt(matches[0]!);
    const result = resultFromReceipt(vault, matches[0]!);
    return result === null
      ? reportCommittedStatus(matches[0]!)
      : completedStatus(matches[0]!, result);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function propagateLearningRevocation(
  input: PropagateLearningRevocationInput,
): SimulatedBindingTransitionResult | null {
  try {
    modeGate(input, [
      "record_mode", "vault", "binding_stream_id", "expected_head_digest", "revocation",
      "actor_ref", "occurred_at",
    ]);
    if (typeof input.binding_stream_id !== "string" || input.binding_stream_id.length === 0
      || typeof input.expected_head_digest !== "string" || !DIGEST.test(input.expected_head_digest)
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || !task2IsRfc3339(input.occurred_at)) fail("task6_input_shape_invalid");
    const revocationRef = revocationReference(input.revocation);
    if (task2CompareRfc3339Instants(input.revocation.revoked_at, input.occurred_at) > 0) {
      fail("task6_revocation_lineage_invalid");
    }
    const existing = task6InternalRequireSuspensionResult(
      input.vault,
      input.binding_stream_id,
      revocationRef,
      input.actor_ref,
      input.occurred_at,
    );
    if (existing !== null) return existing;

    const binding = task6InternalRequireVerifiedBindingReplay(
      input.vault,
      input.binding_stream_id,
      input.expected_head_digest,
    );
    const sealed = task6InternalRequireSealedReplayForEvaluation(
      input.vault,
      binding.promotion_evaluation,
    );
    if (binding.projection.model_ref === null
      || !refsEqual(binding.projection.model_ref, sealed.handle.model_ref)) {
      fail("task6_revocation_lineage_invalid");
    }

    const vaultIndex = task6InternalReferenceIndex(task6InternalReadLineageValues(input.vault));
    const identityDigests = vaultIndex.digestsByIdentity.get(
      refIdentityKey(input.revocation.revoked_ref),
    );
    if (identityDigests === undefined || identityDigests.size !== 1
      || !vaultIndex.exact.has(refIndexKey(input.revocation.revoked_ref))) {
      fail("task6_revocation_lineage_invalid");
    }
    const currentIndex = task6InternalReferenceIndex([
      sealed,
      binding.promotion_evaluation,
      binding.projection,
    ]);
    if (!currentIndex.exact.has(refIndexKey(input.revocation.revoked_ref))) return null;

    return task6InternalSimulateSuspension({
      vault: input.vault,
      binding_stream_id: input.binding_stream_id,
      expected_head_digest: input.expected_head_digest,
      cause_kind: "revocation",
      cause_ref: revocationRef,
      cause_value: input.revocation,
      actor_ref: input.actor_ref,
      occurred_at: input.occurred_at,
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}
