import { canonicalJson, sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import {
  Task6GovernanceError,
  task6InternalCommitFrozenStreams,
  task6InternalCommitStreams,
  task6InternalReadStreams,
  task6InternalRequireEvaluationResult,
  task6InternalRequireSealedReplayById,
  task6InternalRequireSealedReplayForEvaluation,
  task6InternalValidateCurrentness,
  type EvaluationSimulatorVault,
  type EvaluationRunResult,
  type ProposedBindingScope,
  type SimulatedCurrentnessWitness,
  type Task6RecordMode,
} from "./evaluation.js";
import type { Task6ObjectRef } from "./bootstrap.js";
import { task2IsRfc3339 } from "./feedback.js";
import {
  task6InternalRequireShadowResult,
  task6InternalRequireShadowResultHandleId,
  type ShadowRunResult,
} from "./shadow.js";
import {
  verifyRankingModel,
  type RankingModelDependencies,
} from "./pairwise-logistic.js";
import type { RankingModelRecord } from "./records.js";

export interface SimulatedPromotionDecision {
  contract_version: "contentmd.simulated-promotion-decision/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  decision_id: string;
  evaluation_ref: Task6ObjectRef;
  shadow_result_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
  actor_fixture_ref: Task6ObjectRef;
  rationale: string;
  decision: "approve_simulation" | "reject_simulation";
  expected_head_digest: string | null;
  decision_digest: string;
}

export interface CreateSimulatedPromotionDecisionInput {
  record_mode: Task6RecordMode;
  evaluation: EvaluationRunResult;
  shadow_result: ShadowRunResult;
  proposed_scope: ProposedBindingScope;
  actor_fixture_ref: Task6ObjectRef;
  rationale: string;
  decision: "approve_simulation" | "reject_simulation";
  expected_head_digest: string | null;
}

export interface SimulatedProposedProjection {
  contract_version: "contentmd.simulated-proposed-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  stream_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  prior_verified_projection_digest: string;
  prior_verified_head_digest: string | null;
  prior_verified_transition_id: string | null;
  baseline_ref: Task6ObjectRef;
  current_model_ref: Task6ObjectRef | null;
  proposed_state: "baseline" | "candidate" | "suspended";
  proposed_model_ref: Task6ObjectRef | null;
  superseded_verified_event_digests: readonly string[];
  proposed_projection_digest: string;
}

export interface SimulatedVerifiedBindingProjection {
  contract_version: "contentmd.simulated-binding-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  projection_id: string;
  projection_stage: "verified";
  stream_id: string;
  verified_head_digest: string | null;
  physical_head_digest: string | null;
  state: "baseline" | "candidate" | "suspended";
  baseline_ref: Task6ObjectRef | null;
  model_ref: Task6ObjectRef | null;
  verified_transition_id: string | null;
  pending_transition_id: null;
  pending_proposed_projection_digest: null;
  superseded_verified_event_digests: readonly string[];
  projection_digest: string;
}

export interface SimulatedPendingBindingProjection {
  contract_version: "contentmd.simulated-binding-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  projection_id: string;
  projection_stage: "pending";
  stream_id: string;
  verified_head_digest: string | null;
  physical_head_digest: string;
  state: "pending_readback";
  baseline_ref: Task6ObjectRef | null;
  model_ref: Task6ObjectRef | null;
  verified_transition_id: string | null;
  pending_transition_id: string;
  pending_proposed_projection_digest: string;
  superseded_verified_event_digests: readonly string[];
  projection_digest: string;
}

export type SimulatedBindingProjection =
  | SimulatedVerifiedBindingProjection
  | SimulatedPendingBindingProjection;

export interface Task6InternalVerifiedBindingReplay {
  projection: SimulatedVerifiedBindingProjection;
  verified_at: string;
  transition_id: string;
  promotion_transition_id: string;
  promotion_evaluation: EvaluationRunResult;
}

export interface Task6InternalSuspensionInput {
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  cause_kind: "drift" | "revocation";
  cause_ref: Task6ObjectRef;
  cause_value: unknown;
  actor_ref: string;
  occurred_at: string;
}

export interface Task6InternalFallbackBaselineInput {
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  fallback_baseline_ref: Task6ObjectRef;
  requested_target_event_digest: string | null;
  ordered_target_replays: readonly unknown[];
  reason_code:
    | "operator_simulation"
    | "drift_suspension"
    | "lineage_revocation"
    | "currentness_failure"
    | "incident_recovery";
  actor_ref: string;
  occurred_at: string;
}

export interface Task6InternalRollbackTargetReplay {
  verified_binding_event_digest: string;
  model_record: RankingModelRecord;
  model_dependencies: RankingModelDependencies;
  currentness: SimulatedCurrentnessWitness;
}

export interface Task6InternalRollbackInput {
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  requested_target_event_digest: string | null;
  ordered_target_replays: readonly Task6InternalRollbackTargetReplay[];
  reason_code: Task6InternalFallbackBaselineInput["reason_code"];
  actor_ref: string;
  occurred_at: string;
}

export interface Task6InternalResolvedRollbackTarget {
  replay: Task6InternalRollbackTargetReplay;
  ordered_target_replays: readonly Task6InternalRollbackTargetReplay[];
  model_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

export interface SimulatedBindingTransitionResult {
  contract_version: "contentmd.simulated-binding-transition-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  transition_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  prepare_event_ref: Task6ObjectRef;
  commit_event_ref: Task6ObjectRef;
  readback_event_ref: Task6ObjectRef;
  readback_receipt_ref: Task6ObjectRef;
  projection: SimulatedVerifiedBindingProjection;
  result_digest: string;
}

export interface RecoverSimulatedBindingReadbackInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  transition_id: string;
  expected_commit_head_digest: string;
  actor_ref: string;
  occurred_at: string;
}

export interface SimulatePromotionBindingInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  project_id: string;
  proposed_scope: ProposedBindingScope;
  baseline_ref: Task6ObjectRef;
  evaluation: EvaluationRunResult;
  shadow_result: ShadowRunResult;
  decision: SimulatedPromotionDecision;
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

function closedGraph(value: unknown): void {
  const ancestors = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current === "string" || typeof current === "boolean") return;
    if (typeof current === "number") {
      if (!Number.isFinite(current) || Object.is(current, -0)) fail("task6_input_shape_invalid");
      return;
    }
    if (typeof current !== "object" || ancestors.has(current)) fail("task6_input_shape_invalid");
    const prototype = Object.getPrototypeOf(current);
    if (Array.isArray(current)) {
      if (prototype !== Array.prototype || Object.keys(current).length !== current.length) {
        fail("task6_input_shape_invalid");
      }
    } else if (prototype !== Object.prototype && prototype !== null) {
      fail("task6_input_shape_invalid");
    }
    ancestors.add(current);
    const keys = Array.isArray(current) ? Object.keys(current) : Reflect.ownKeys(current);
    for (const key of keys) {
      if (typeof key !== "string") fail("task6_input_shape_invalid");
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        fail("task6_input_shape_invalid");
      }
      visit(descriptor.value);
    }
    ancestors.delete(current);
  };
  visit(value);
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

function immutableWithStructuralSharing<T>(value: T): T {
  const copies = new WeakMap<object, object>();
  const visit = (current: unknown): unknown => {
    if (current === null || typeof current !== "object") return current;
    const existing = copies.get(current);
    if (existing !== undefined) return existing;
    if (Array.isArray(current)) {
      const copy: unknown[] = [];
      copies.set(current, copy);
      let unchanged = Object.isFrozen(current);
      for (const item of current) {
        const detached = visit(item);
        copy.push(detached);
        unchanged &&= detached === item;
      }
      if (unchanged) {
        copies.set(current, current);
        return current;
      }
      return Object.freeze(copy);
    }
    const copy: Record<string, unknown> = {};
    copies.set(current, copy);
    let unchanged = Object.isFrozen(current);
    for (const key of Object.keys(current)) {
      const original = (current as Record<string, unknown>)[key];
      const detached = visit(original);
      copy[key] = detached;
      unchanged &&= detached === original;
    }
    if (unchanged) {
      copies.set(current, current);
      return current;
    }
    return Object.freeze(copy);
  };
  return visit(value) as T;
}

function assertRef(ref: Task6ObjectRef): void {
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

function evaluationRef(evaluation: EvaluationRunResult): Task6ObjectRef {
  return {
    record_id: evaluation.evaluation_record.record_id,
    schema_id: evaluation.evaluation_record.schema_id,
    schema_version: evaluation.evaluation_record.schema_version,
    content_digest: evaluation.evaluation_record.content_digest,
  };
}

function shadowResultRef(result: ShadowRunResult): Task6ObjectRef {
  return {
    record_id: result.shadow_result_id,
    schema_id: "contentmd.shadow-simulation-result",
    schema_version: "0.1.0",
    content_digest: result.result_digest,
  };
}

function proposedScopeRef(scope: ProposedBindingScope): Task6ObjectRef {
  return {
    record_id: scope.scope_id,
    schema_id: "contentmd.proposed-binding-scope",
    schema_version: "0.1.0",
    content_digest: scope.scope_digest,
  };
}

function assertScope(scope: ProposedBindingScope): Task6ObjectRef {
  exactTopLevel(scope, [
    "contract_version", "scope_id", "memory_scope", "project_id", "permitted_values",
    "scope_digest",
  ]);
  if (scope.contract_version !== "contentmd.proposed-binding-scope/0.1.0"
    || !["task", "personal", "project", "organization", "public"].includes(scope.memory_scope)
    || typeof scope.project_id !== "string" || scope.project_id.length === 0
    || !Array.isArray(scope.permitted_values) || scope.permitted_values.length !== 5
    || !DIGEST.test(scope.scope_digest)) fail("task6_input_shape_invalid");
  const dimensions = ["project", "product_area", "channel", "locale", "risk"] as const;
  for (const [index, entry] of scope.permitted_values.entries()) {
    exactTopLevel(entry, ["dimension", "values"]);
    if (entry.dimension !== dimensions[index]
      || !Array.isArray(entry.values) || entry.values.length === 0
      || entry.values.some((value) => typeof value !== "string" || value.length === 0)
      || new Set(entry.values).size !== entry.values.length) fail("task6_input_shape_invalid");
  }
  const { scope_id: _scopeId, scope_digest: _scopeDigest, ...semantic } = scope;
  const digest = sha256Canonical(semantic);
  if (scope.scope_digest !== digest
    || scope.scope_id !== `proposed_binding_scope.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return proposedScopeRef(scope);
}

function assertEvaluation(evaluation: EvaluationRunResult): Task6ObjectRef {
  const { result_digest: _resultDigest, ...semantic } = evaluation;
  if (!DIGEST.test(evaluation.result_digest)
    || evaluation.result_digest !== sha256Canonical(semantic)
    || !verifyRecordDigest(evaluation.evaluation_record).valid) fail("task6_digest_invalid");
  return evaluationRef(evaluation);
}

function assertShadowResult(result: ShadowRunResult): Task6ObjectRef {
  const { shadow_result_id: _resultId, result_digest: _resultDigest, ...semantic } = result;
  const digest = sha256Canonical(semantic);
  if (result.result_digest !== digest
    || result.shadow_result_id !== `shadow_result.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return shadowResultRef(result);
}

function assertDecision(decision: SimulatedPromotionDecision): Task6ObjectRef {
  exactTopLevel(decision, [
    "contract_version", "record_mode", "authority_effect", "decision_id", "evaluation_ref",
    "shadow_result_ref", "proposed_scope_ref", "actor_fixture_ref", "rationale", "decision",
    "expected_head_digest", "decision_digest",
  ]);
  assertRef(decision.evaluation_ref);
  assertRef(decision.shadow_result_ref);
  assertRef(decision.proposed_scope_ref);
  assertRef(decision.actor_fixture_ref);
  const { decision_id: _decisionId, decision_digest: _decisionDigest, ...semantic } = decision;
  const digest = sha256Canonical(semantic);
  if (decision.contract_version !== "contentmd.simulated-promotion-decision/0.1.0"
    || decision.record_mode !== "development_fixture" || decision.authority_effect !== "none"
    || (decision.decision !== "approve_simulation" && decision.decision !== "reject_simulation")
    || typeof decision.rationale !== "string" || decision.rationale.trim().length === 0
    || (decision.expected_head_digest !== null && !DIGEST.test(decision.expected_head_digest))
    || decision.decision_digest !== digest
    || decision.decision_id !== `simulated_promotion_decision.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return {
    record_id: decision.decision_id,
    schema_id: "contentmd.simulated-promotion-decision",
    schema_version: "0.1.0",
    content_digest: decision.decision_digest,
  };
}

function bindingStreamId(projectId: string, scopeRef: Task6ObjectRef): string {
  const digest = sha256Canonical({
    contract_version: "contentmd.simulated-binding-stream/0.1.0",
    project_id: projectId,
    ranking_objective: "expression_preference",
    candidate_kind: "expression",
    proposed_scope_ref: scopeRef,
  });
  return `learning_binding_sim.${digest.slice(0, 32)}`;
}

type SimulatedTransitionKind = SimulatedBindingTransitionResult["transition_kind"];

interface SimulatedPromotionEvidence {
  kind: "promotion";
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  evaluation_ref: Task6ObjectRef;
  shadow_result_ref: Task6ObjectRef;
  decision_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedSuspensionEvidence {
  kind: "suspension";
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  cause_kind: "drift" | "revocation";
  cause_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedFallbackBaselineEvidence {
  kind: "fallback_baseline";
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: null;
  requested_target_event_digest: string | null;
  selected_target_event_digest: null;
  ordered_target_event_digests: readonly string[];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: Task6InternalFallbackBaselineInput["reason_code"];
}

interface SimulatedRollbackEvidence {
  kind: "rollback";
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: Task6ObjectRef;
  requested_target_event_digest: string | null;
  selected_target_event_digest: string;
  ordered_target_event_digests: readonly [string, ...string[]];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: Task6InternalFallbackBaselineInput["reason_code"];
}

type SimulatedTransitionEvidence =
  | SimulatedPromotionEvidence
  | SimulatedSuspensionEvidence
  | SimulatedRollbackEvidence
  | SimulatedFallbackBaselineEvidence;

interface SimulatedTransitionPreparedPayload {
  contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "prepare";
  transition_id: string;
  transition_kind: SimulatedTransitionKind;
  binding_stream_id: string;
  expected_binding_head_digest: string | null;
  prior_verified_projection_digest: string;
  proposed_projection_digest: string;
  transition_evidence_digest: string;
}

interface SimulatedPromotionCommitPayload {
  contract_version: "contentmd.simulated-promotion-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "promotion";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: string | null;
  prior_verified_projection_digest: string;
  proposed_projection_digest: string;
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  evaluation_ref: Task6ObjectRef;
  shadow_result_ref: Task6ObjectRef;
  decision_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedSuspensionCommitPayload {
  contract_version: "contentmd.simulated-suspension-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "suspension";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: string;
  prior_verified_projection_digest: string;
  proposed_projection_digest: string;
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  cause_kind: "drift" | "revocation";
  cause_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedFallbackBaselineCommitPayload {
  contract_version: "contentmd.simulated-fallback-baseline-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "fallback_baseline";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: string;
  prior_verified_projection_digest: string;
  proposed_projection_digest: string;
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: null;
  requested_target_event_digest: string | null;
  selected_target_event_digest: null;
  ordered_target_event_digests: readonly string[];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: Task6InternalFallbackBaselineInput["reason_code"];
}

interface SimulatedRollbackCommitPayload {
  contract_version: "contentmd.simulated-rollback-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "rollback";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: string;
  prior_verified_projection_digest: string;
  proposed_projection_digest: string;
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: Task6ObjectRef;
  requested_target_event_digest: string | null;
  selected_target_event_digest: string;
  ordered_target_event_digests: readonly [string, ...string[]];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: Task6InternalFallbackBaselineInput["reason_code"];
}

interface SimulatedReadbackVerifiedPayload {
  contract_version: "contentmd.simulated-readback-verified-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "readback";
  transition_id: string;
  transition_kind: SimulatedTransitionKind;
  prepare_event_ref: Task6ObjectRef;
  commit_event_ref: Task6ObjectRef;
  expected_commit_digest: string;
  observed_commit_digest: string;
  proposed_projection_digest: string;
  complete_lineage_digest: string;
}

interface SimulatedLearningEvent {
  event_id: string;
  schema_version: "0.1.0";
  data_class: "learning_simulation";
  stream_id: string;
  event_type:
    | "transition_prepared"
    | "binding_committed"
    | "binding_suspended_committed"
    | "rollback_committed"
    | "fallback_baseline_committed"
    | "binding_readback_verified";
  sequence: number;
  predecessor_digest: string | null;
  payload:
    | SimulatedTransitionPreparedPayload
    | SimulatedPromotionCommitPayload
    | SimulatedSuspensionCommitPayload
    | SimulatedRollbackCommitPayload
    | SimulatedFallbackBaselineCommitPayload
    | SimulatedReadbackVerifiedPayload;
  actor_ref: string;
  occurred_at: string;
  event_digest: string;
}

interface StoredBindingStream {
  contract_version: "contentmd.stored-simulated-binding-stream/0.1.0";
  stream_id: string;
  events: readonly SimulatedLearningEvent[];
}

interface StoredTransitionStream {
  contract_version: "contentmd.stored-simulated-transition-stream/0.1.0";
  stream_id: string;
  transition_id: string;
  transition_digest: string;
  transition_evidence: SimulatedTransitionEvidence;
  proposed_projection: SimulatedProposedProjection;
  sealed_test_handle_id: string;
  evaluation_result: EvaluationRunResult;
  shadow_result: ShadowRunResult;
  decision: SimulatedPromotionDecision;
  cause_value: unknown | null;
  events: readonly [SimulatedLearningEvent];
}

interface StoredFallbackTransitionValues {
  contract_version: "contentmd.simulated-fallback-transition-values/0.1.0";
  current_binding_replay: unknown;
  ordered_target_replays: readonly unknown[];
  selected_target_replay: null;
}

interface StoredRollbackTransitionValues {
  contract_version: "contentmd.simulated-rollback-transition-values/0.1.0";
  current_binding_replay: unknown;
  ordered_target_replays: readonly Task6InternalRollbackTargetReplay[];
  selected_target_replay: Task6InternalRollbackTargetReplay;
}

type StoredSimulatedStream = StoredBindingStream | StoredTransitionStream;

function hasExactKeys(value: unknown, keys: readonly string[]): value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    return false;
  }
  const actual = Reflect.ownKeys(value);
  return actual.length === keys.length
    && actual.every((key) => typeof key === "string" && keys.includes(key));
}

function storedSimulatedStreams(vault: EvaluationSimulatorVault): readonly StoredSimulatedStream[] {
  const streams = task6InternalReadStreams(vault);
  if (!Array.isArray(streams)) fail("task6_vault_invalid");
  const typed = streams as readonly StoredSimulatedStream[];
  if (new Set(typed.map((stream) => stream.stream_id)).size !== typed.length) {
    fail("task6_vault_invalid");
  }
  for (const stream of typed) {
    const binding = hasExactKeys(stream, ["contract_version", "stream_id", "events"])
      && stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0";
    const transition = hasExactKeys(stream, [
      "contract_version", "stream_id", "transition_id", "transition_digest",
      "transition_evidence", "proposed_projection", "sealed_test_handle_id",
      "evaluation_result", "shadow_result", "decision", "cause_value", "events",
    ]) && stream.contract_version === "contentmd.stored-simulated-transition-stream/0.1.0";
    if ((!binding && !transition) || typeof stream.stream_id !== "string" || !Array.isArray(stream.events)) {
      fail("task6_vault_invalid");
    }
  }
  return typed;
}

function eventRef(event: SimulatedLearningEvent): Task6ObjectRef {
  return {
    record_id: event.event_id,
    schema_id: "contentmd.simulated-learning-event",
    schema_version: "0.1.0",
    content_digest: event.event_digest,
  };
}

function createLearningEvent(
  streamId: string,
  eventType: SimulatedLearningEvent["event_type"],
  payload: SimulatedLearningEvent["payload"],
  actorRef: string,
  occurredAt: string,
  predecessor: SimulatedLearningEvent | null,
): SimulatedLearningEvent {
  const sequence = predecessor === null ? 1 : predecessor.sequence + 1;
  const predecessorDigest = predecessor?.event_digest ?? null;
  const eventIdDigest = sha256Canonical({
    contract_version: "contentmd.simulated-learning-event-id/0.1.0",
    schema_version: "0.1.0",
    data_class: "learning_simulation",
    stream_id: streamId,
    event_type: eventType,
    sequence,
    predecessor_digest: predecessorDigest,
    payload_digest: sha256Canonical(payload),
    actor_ref: actorRef,
    occurred_at: occurredAt,
  });
  const semantic = {
    event_id: `learning_sim_event.${eventIdDigest.slice(0, 32)}`,
    schema_version: "0.1.0" as const,
    data_class: "learning_simulation" as const,
    stream_id: streamId,
    event_type: eventType,
    sequence,
    predecessor_digest: predecessorDigest,
    payload,
    actor_ref: actorRef,
    occurred_at: occurredAt,
  };
  return immutable({ ...semantic, event_digest: sha256Canonical(semantic) });
}

function verifyLearningEvent(
  event: SimulatedLearningEvent,
  streamId: string,
  sequence: number,
  predecessorDigest: string | null,
): void {
  if (!hasExactKeys(event, [
    "event_id", "schema_version", "data_class", "stream_id", "event_type", "sequence",
    "predecessor_digest", "payload", "actor_ref", "occurred_at", "event_digest",
  ]) || event.schema_version !== "0.1.0" || event.data_class !== "learning_simulation"
    || event.stream_id !== streamId || event.sequence !== sequence
    || event.predecessor_digest !== predecessorDigest
    || typeof event.actor_ref !== "string" || event.actor_ref.length === 0
    || !task2IsRfc3339(event.occurred_at) || !DIGEST.test(event.event_digest)) {
    fail("task6_event_readback_failed");
  }
  const phase = event.event_type === "transition_prepared" ? "prepare"
    : event.event_type === "binding_readback_verified" ? "readback" : "commit";
  if (event.payload.phase !== phase) fail("task6_event_readback_failed");
  const eventIdDigest = sha256Canonical({
    contract_version: "contentmd.simulated-learning-event-id/0.1.0",
    schema_version: "0.1.0",
    data_class: "learning_simulation",
    stream_id: streamId,
    event_type: event.event_type,
    sequence,
    predecessor_digest: predecessorDigest,
    payload_digest: sha256Canonical(event.payload),
    actor_ref: event.actor_ref,
    occurred_at: event.occurred_at,
  });
  const { event_digest: _eventDigest, ...semantic } = event;
  if (event.event_id !== `learning_sim_event.${eventIdDigest.slice(0, 32)}`
    || event.event_digest !== sha256Canonical(semantic)) fail("task6_event_readback_failed");
}

function issueVerifiedProjection(
  semantic: Omit<SimulatedVerifiedBindingProjection, "projection_id" | "projection_digest">,
): SimulatedVerifiedBindingProjection {
  const digest = sha256Canonical(semantic);
  return immutable({
    ...semantic,
    projection_id: `simulated_binding_projection.${digest.slice(0, 32)}`,
    projection_digest: digest,
  });
}

function issuePendingProjection(
  semantic: Omit<SimulatedPendingBindingProjection, "projection_id" | "projection_digest">,
): SimulatedPendingBindingProjection {
  const digest = sha256Canonical(semantic);
  return immutable({
    ...semantic,
    projection_id: `simulated_binding_projection.${digest.slice(0, 32)}`,
    projection_digest: digest,
  });
}

function genesisProjection(streamId: string, baselineRef: Task6ObjectRef): SimulatedVerifiedBindingProjection {
  return issueVerifiedProjection({
    contract_version: "contentmd.simulated-binding-projection/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    projection_stage: "verified",
    stream_id: streamId,
    verified_head_digest: null,
    physical_head_digest: null,
    state: "baseline",
    baseline_ref: baselineRef,
    model_ref: null,
    verified_transition_id: null,
    pending_transition_id: null,
    pending_proposed_projection_digest: null,
    superseded_verified_event_digests: [],
  });
}

function promotionProposedProjection(
  prior: SimulatedVerifiedBindingProjection,
  modelRef: Task6ObjectRef,
): SimulatedProposedProjection {
  if (prior.baseline_ref === null) fail("task6_event_readback_failed");
  const semantic = {
    contract_version: "contentmd.simulated-proposed-projection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    stream_id: prior.stream_id,
    transition_kind: "promotion" as const,
    prior_verified_projection_digest: prior.projection_digest,
    prior_verified_head_digest: prior.verified_head_digest,
    prior_verified_transition_id: prior.verified_transition_id,
    baseline_ref: prior.baseline_ref,
    current_model_ref: prior.model_ref,
    proposed_state: "candidate" as const,
    proposed_model_ref: modelRef,
    superseded_verified_event_digests: prior.verified_head_digest === null
      ? [...prior.superseded_verified_event_digests]
      : [...prior.superseded_verified_event_digests, prior.verified_head_digest],
  };
  return immutable({ ...semantic, proposed_projection_digest: sha256Canonical(semantic) });
}

function suspensionProposedProjection(
  prior: SimulatedVerifiedBindingProjection,
): SimulatedProposedProjection {
  if (prior.baseline_ref === null || prior.model_ref === null || prior.state !== "candidate") {
    fail("task6_event_readback_failed");
  }
  const semantic = {
    contract_version: "contentmd.simulated-proposed-projection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    stream_id: prior.stream_id,
    transition_kind: "suspension" as const,
    prior_verified_projection_digest: prior.projection_digest,
    prior_verified_head_digest: prior.verified_head_digest,
    prior_verified_transition_id: prior.verified_transition_id,
    baseline_ref: prior.baseline_ref,
    current_model_ref: prior.model_ref,
    proposed_state: "suspended" as const,
    proposed_model_ref: prior.model_ref,
    superseded_verified_event_digests: prior.verified_head_digest === null
      ? [...prior.superseded_verified_event_digests]
      : [...prior.superseded_verified_event_digests, prior.verified_head_digest],
  };
  return immutable({ ...semantic, proposed_projection_digest: sha256Canonical(semantic) });
}

function fallbackBaselineProposedProjection(
  prior: SimulatedVerifiedBindingProjection,
): SimulatedProposedProjection {
  if (prior.baseline_ref === null || prior.model_ref === null
    || (prior.state !== "candidate" && prior.state !== "suspended")) {
    fail("task6_event_readback_failed");
  }
  const semantic = {
    contract_version: "contentmd.simulated-proposed-projection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    stream_id: prior.stream_id,
    transition_kind: "fallback_baseline" as const,
    prior_verified_projection_digest: prior.projection_digest,
    prior_verified_head_digest: prior.verified_head_digest,
    prior_verified_transition_id: prior.verified_transition_id,
    baseline_ref: prior.baseline_ref,
    current_model_ref: prior.model_ref,
    proposed_state: "baseline" as const,
    proposed_model_ref: null,
    superseded_verified_event_digests: prior.verified_head_digest === null
      ? [...prior.superseded_verified_event_digests]
      : [...prior.superseded_verified_event_digests, prior.verified_head_digest],
  };
  return immutable({ ...semantic, proposed_projection_digest: sha256Canonical(semantic) });
}

function rollbackProposedProjection(
  prior: SimulatedVerifiedBindingProjection,
  targetModelRef: Task6ObjectRef,
): SimulatedProposedProjection {
  if (prior.baseline_ref === null || prior.model_ref === null
    || (prior.state !== "candidate" && prior.state !== "suspended")) {
    fail("task6_event_readback_failed");
  }
  const semantic = {
    contract_version: "contentmd.simulated-proposed-projection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    stream_id: prior.stream_id,
    transition_kind: "rollback" as const,
    prior_verified_projection_digest: prior.projection_digest,
    prior_verified_head_digest: prior.verified_head_digest,
    prior_verified_transition_id: prior.verified_transition_id,
    baseline_ref: prior.baseline_ref,
    current_model_ref: prior.model_ref,
    proposed_state: "candidate" as const,
    proposed_model_ref: targetModelRef,
    superseded_verified_event_digests: prior.verified_head_digest === null
      ? [...prior.superseded_verified_event_digests]
      : [...prior.superseded_verified_event_digests, prior.verified_head_digest],
  };
  return immutable({ ...semantic, proposed_projection_digest: sha256Canonical(semantic) });
}

function rankingModelRef(record: RankingModelRecord): Task6ObjectRef {
  return Object.freeze({
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  });
}

function pendingProjection(
  prior: SimulatedVerifiedBindingProjection,
  proposed: SimulatedProposedProjection,
  transitionId: string,
  commitDigest: string,
): SimulatedPendingBindingProjection {
  return issuePendingProjection({
    contract_version: "contentmd.simulated-binding-projection/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    projection_stage: "pending",
    stream_id: prior.stream_id,
    verified_head_digest: prior.verified_head_digest,
    physical_head_digest: commitDigest,
    state: "pending_readback",
    baseline_ref: prior.baseline_ref,
    model_ref: prior.model_ref,
    verified_transition_id: prior.verified_transition_id,
    pending_transition_id: transitionId,
    pending_proposed_projection_digest: proposed.proposed_projection_digest,
    superseded_verified_event_digests: prior.superseded_verified_event_digests,
  });
}

function finalProjection(
  proposed: SimulatedProposedProjection,
  transitionId: string,
  readbackDigest: string,
): SimulatedVerifiedBindingProjection {
  return issueVerifiedProjection({
    contract_version: "contentmd.simulated-binding-projection/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    projection_stage: "verified",
    stream_id: proposed.stream_id,
    verified_head_digest: readbackDigest,
    physical_head_digest: readbackDigest,
    state: proposed.proposed_state,
    baseline_ref: proposed.baseline_ref,
    model_ref: proposed.proposed_model_ref,
    verified_transition_id: transitionId,
    pending_transition_id: null,
    pending_proposed_projection_digest: null,
    superseded_verified_event_digests: proposed.superseded_verified_event_digests,
  });
}

function transitionStreamId(transitionId: string): string {
  if (!/^learning_transition\.[a-f0-9]{32}$/u.test(transitionId)) {
    fail("task6_event_readback_failed");
  }
  return `learning_transition_sim.${transitionId.slice("learning_transition.".length)}`;
}

function verifyTransitionStream(stream: StoredTransitionStream): void {
  if (stream.events.length !== 1 || stream.events[0]!.event_type !== "transition_prepared") {
    fail("task6_event_readback_failed");
  }
  const prepare = stream.events[0]!;
  verifyLearningEvent(prepare, stream.stream_id, 1, null);
  const payload = prepare.payload as SimulatedTransitionPreparedPayload;
  const evidenceDigest = sha256Canonical({
    contract_version: "contentmd.simulated-transition-evidence/0.1.0",
    evidence: stream.transition_evidence,
  });
  const transitionDigest = sha256Canonical({
    contract_version: "contentmd.simulated-binding-transition/0.1.0",
    binding_stream_id: payload.binding_stream_id,
    transition_kind: payload.transition_kind,
    expected_head_digest: payload.expected_binding_head_digest,
    prior_verified_projection_digest: payload.prior_verified_projection_digest,
    proposed_projection_digest: payload.proposed_projection_digest,
    transition_evidence_digest: payload.transition_evidence_digest,
    actor_ref: prepare.actor_ref,
    occurred_at: prepare.occurred_at,
  });
  if (stream.transition_digest !== transitionDigest
    || stream.transition_id !== `learning_transition.${transitionDigest.slice(0, 32)}`
    || stream.stream_id !== transitionStreamId(stream.transition_id)
    || payload.transition_id !== stream.transition_id
    || payload.transition_evidence_digest !== evidenceDigest
    || payload.proposed_projection_digest !== stream.proposed_projection.proposed_projection_digest
    || stream.proposed_projection.proposed_projection_digest
      !== sha256Canonical((({ proposed_projection_digest: _digest, ...semantic }) => semantic)(
        stream.proposed_projection,
      ))) {
    fail("task6_event_readback_failed");
  }
}

function replaceStoredStream(
  streams: readonly StoredSimulatedStream[],
  replacement: StoredSimulatedStream,
): StoredSimulatedStream[] {
  const index = streams.findIndex((stream) => stream.stream_id === replacement.stream_id);
  if (index < 0) return [...streams, replacement];
  return streams.map((stream, candidateIndex) => candidateIndex === index ? replacement : stream);
}

function transactionFor(
  streams: readonly StoredSimulatedStream[],
  transitionId: string,
): StoredTransitionStream {
  const matches = streams.filter((stream): stream is StoredTransitionStream =>
    stream.contract_version === "contentmd.stored-simulated-transition-stream/0.1.0"
    && stream.transition_id === transitionId);
  if (matches.length !== 1) fail("task6_event_readback_failed");
  verifyTransitionStream(matches[0]!);
  return matches[0]!;
}

function currentBindingReplayValue(
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  projection: SimulatedVerifiedBindingProjection,
): unknown {
  if (projection.verified_head_digest === null
    || binding.events.at(-1)?.event_digest !== projection.verified_head_digest) {
    fail("task6_event_readback_failed");
  }
  const transitionIds = binding.events.flatMap((event) =>
    event.event_type === "binding_readback_verified" ? [event.payload.transition_id] : []);
  if (new Set(transitionIds).size !== transitionIds.length) fail("task6_event_readback_failed");
  const transitionStreams = Object.freeze(
    transitionIds.map((transitionId) => transactionFor(streams, transitionId)),
  );
  return Object.freeze({
    contract_version: "contentmd.simulated-current-binding-replay/0.1.0",
    binding_stream_id: binding.stream_id,
    verified_projection: projection,
    binding_events: binding.events,
    transition_streams: transitionStreams,
  });
}

function currentBindingReplay(
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  projection: SimulatedVerifiedBindingProjection,
): unknown {
  return immutable(currentBindingReplayValue(streams, binding, projection));
}

function resolvedTransitionRoleValues(
  vault: EvaluationSimulatorVault,
  transition: StoredTransitionStream,
): readonly unknown[] {
  const sealed = task6InternalRequireSealedReplayById(vault, transition.sealed_test_handle_id);
  const evaluation = task6InternalRequireEvaluationResult(vault, transition.evaluation_result);
  const shadow = task6InternalRequireShadowResult(vault, transition.shadow_result);
  if (task6InternalRequireShadowResultHandleId(vault, shadow) !== transition.sealed_test_handle_id) {
    fail("task6_event_readback_failed");
  }
  assertDecision(transition.decision);
  const common = [
    sealed.replay.baseline_profile,
    sealed.replay.proposed_scope,
    sealed.replay,
    evaluation,
    shadow,
    transition.decision,
  ];
  if (transition.transition_evidence.kind === "promotion") {
    if (transition.cause_value !== null) fail("task6_event_readback_failed");
    return common;
  }
  if (transition.transition_evidence.kind === "rollback") {
    if (!hasExactKeys(transition.cause_value, [
      "contract_version", "current_binding_replay", "ordered_target_replays",
      "selected_target_replay",
    ]) || transition.cause_value.contract_version
        !== "contentmd.simulated-rollback-transition-values/0.1.0"
      || !Array.isArray(transition.cause_value.ordered_target_replays)
      || transition.cause_value.selected_target_replay === null
      || typeof transition.cause_value.selected_target_replay !== "object") {
      fail("task6_event_readback_failed");
    }
    const values = transition.cause_value as unknown as StoredRollbackTransitionValues;
    return [
      sealed.replay.baseline_profile,
      sealed.replay.proposed_scope,
      values.current_binding_replay,
      values.ordered_target_replays,
      values.selected_target_replay,
    ];
  }
  if (transition.transition_evidence.kind === "fallback_baseline") {
    if (!hasExactKeys(transition.cause_value, [
      "contract_version", "current_binding_replay", "ordered_target_replays",
      "selected_target_replay",
    ]) || transition.cause_value.contract_version
        !== "contentmd.simulated-fallback-transition-values/0.1.0"
      || !Array.isArray(transition.cause_value.ordered_target_replays)
      || transition.cause_value.selected_target_replay !== null) {
      fail("task6_event_readback_failed");
    }
    const values = transition.cause_value as unknown as StoredFallbackTransitionValues;
    return [
      sealed.replay.baseline_profile,
      sealed.replay.proposed_scope,
      values.current_binding_replay,
      values.ordered_target_replays,
      values.selected_target_replay,
    ];
  }
  if (transition.cause_value === null) fail("task6_event_readback_failed");
  return [...common, transition.cause_value];
}

function completeLineageDigest(
  vault: EvaluationSimulatorVault,
  transition: StoredTransitionStream,
  bindingEventsThroughCommit: readonly SimulatedLearningEvent[],
): string {
  const resolvedEvidenceValuesDigest = sha256Canonical({
    contract_version: "contentmd.simulated-resolved-transition-evidence/0.1.0",
    transition_kind: transition.transition_evidence.kind,
    ordered_role_values: resolvedTransitionRoleValues(vault, transition),
  });
  return sha256Canonical({
    contract_version: "contentmd.simulated-complete-transition-lineage/0.1.0",
    transition_id: transition.transition_id,
    transition_digest: transition.transition_digest,
    transition_evidence: transition.transition_evidence,
    resolved_evidence_values_digest: resolvedEvidenceValuesDigest,
    proposed_projection: transition.proposed_projection,
    prepare_event: transition.events[0],
    ordered_binding_events_through_commit: bindingEventsThroughCommit,
  });
}

function issueTransitionResult(
  transition: StoredTransitionStream,
  commitEvent: SimulatedLearningEvent,
  readbackEvent: SimulatedLearningEvent,
  projection: SimulatedVerifiedBindingProjection,
  lineageDigest: string,
): SimulatedBindingTransitionResult {
  const prepareEvent = transition.events[0]!;
  const receiptSemantic = {
    contract_version: "contentmd.simulated-learning-readback/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    transition_id: transition.transition_id,
    stream_id: projection.stream_id,
    prepare_event_ref: eventRef(prepareEvent),
    commit_event_ref: eventRef(commitEvent),
    readback_event_ref: eventRef(readbackEvent),
    expected_commit_digest: commitEvent.event_digest,
    observed_commit_digest: commitEvent.event_digest,
    proposed_projection_digest: transition.proposed_projection.proposed_projection_digest,
    final_verified_projection_digest: projection.projection_digest,
    complete_lineage_digest: lineageDigest,
    status: "passed" as const,
    method: "simulated-independent-chain-readback" as const,
  };
  const receiptDigest = sha256Canonical(receiptSemantic);
  const receiptRef: Task6ObjectRef = {
    record_id: `learning_sim_readback.${receiptDigest.slice(0, 32)}`,
    schema_id: "contentmd.simulated-learning-readback",
    schema_version: "0.1.0",
    content_digest: receiptDigest,
  };
  const resultSemantic = {
    contract_version: "contentmd.simulated-binding-transition-result/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    transition_id: transition.transition_id,
    transition_kind: transition.transition_evidence.kind,
    prepare_event_ref: eventRef(prepareEvent),
    commit_event_ref: eventRef(commitEvent),
    readback_event_ref: eventRef(readbackEvent),
    readback_receipt_ref: receiptRef,
    projection,
  };
  return immutable({ ...resultSemantic, result_digest: sha256Canonical(resultSemantic) });
}

function rebuildBindingProjection(
  vault: EvaluationSimulatorVault,
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
): SimulatedBindingProjection {
  if (binding.events.length === 0) fail("task6_event_readback_failed");
  let predecessor: string | null = null;
  let verified: SimulatedVerifiedBindingProjection | null = null;
  let pending: SimulatedPendingBindingProjection | null = null;
  for (const [index, event] of binding.events.entries()) {
    verifyLearningEvent(event, binding.stream_id, index + 1, predecessor);
    predecessor = event.event_digest;
    if (event.event_type === "binding_committed") {
      if (pending !== null) fail("task6_event_readback_failed");
      const payload = event.payload as SimulatedPromotionCommitPayload;
      const transition = transactionFor(streams, payload.transition_id);
      if (transition.transition_evidence.kind !== "promotion") {
        fail("task6_event_readback_failed");
      }
      const prepare = transition.events[0]!;
      const proposed = transition.proposed_projection;
      const prior = verified ?? genesisProjection(binding.stream_id, payload.baseline_ref);
      const expectedProposed = promotionProposedProjection(prior, payload.model_ref);
      if (!refsEqual(eventRef(prepare), payload.prepare_event_ref)
        || payload.expected_binding_head_digest !== prior.physical_head_digest
        || payload.prior_verified_projection_digest !== prior.projection_digest
        || payload.proposed_projection_digest !== proposed.proposed_projection_digest
        || canonicalJson(expectedProposed) !== canonicalJson(proposed)
        || !refsEqual(payload.baseline_ref, proposed.baseline_ref)
        || !refsEqual(payload.model_ref, transition.transition_evidence.model_ref)
        || !refsEqual(payload.evaluation_ref, transition.transition_evidence.evaluation_ref)
        || !refsEqual(payload.shadow_result_ref, transition.transition_evidence.shadow_result_ref)
        || !refsEqual(payload.decision_ref, transition.transition_evidence.decision_ref)
        || !refsEqual(payload.proposed_scope_ref, transition.transition_evidence.proposed_scope_ref)) {
        fail("task6_event_readback_failed");
      }
      pending = pendingProjection(prior, proposed, payload.transition_id, event.event_digest);
    } else if (event.event_type === "binding_suspended_committed") {
      if (pending !== null || verified === null) fail("task6_event_readback_failed");
      const payload = event.payload as SimulatedSuspensionCommitPayload;
      const transition = transactionFor(streams, payload.transition_id);
      if (transition.transition_evidence.kind !== "suspension") {
        fail("task6_event_readback_failed");
      }
      const prepare = transition.events[0]!;
      const proposed = transition.proposed_projection;
      const prior = verified;
      const expectedProposed = suspensionProposedProjection(prior);
      if (!refsEqual(eventRef(prepare), payload.prepare_event_ref)
        || payload.expected_binding_head_digest !== prior.physical_head_digest
        || payload.prior_verified_projection_digest !== prior.projection_digest
        || payload.proposed_projection_digest !== proposed.proposed_projection_digest
        || canonicalJson(expectedProposed) !== canonicalJson(proposed)
        || !refsEqual(payload.baseline_ref, proposed.baseline_ref)
        || proposed.proposed_model_ref === null
        || !refsEqual(payload.model_ref, proposed.proposed_model_ref)
        || !refsEqual(payload.baseline_ref, transition.transition_evidence.baseline_ref)
        || !refsEqual(payload.model_ref, transition.transition_evidence.model_ref)
        || payload.cause_kind !== transition.transition_evidence.cause_kind
        || !refsEqual(payload.cause_ref, transition.transition_evidence.cause_ref)
        || !refsEqual(payload.proposed_scope_ref, transition.transition_evidence.proposed_scope_ref)) {
        fail("task6_event_readback_failed");
      }
      pending = pendingProjection(prior, proposed, payload.transition_id, event.event_digest);
    } else if (event.event_type === "rollback_committed") {
      if (pending !== null || verified === null) fail("task6_event_readback_failed");
      const payload = event.payload as SimulatedRollbackCommitPayload;
      const transition = transactionFor(streams, payload.transition_id);
      if (transition.transition_evidence.kind !== "rollback") {
        fail("task6_event_readback_failed");
      }
      const prepare = transition.events[0]!;
      const proposed = transition.proposed_projection;
      const prior = verified;
      const expectedProposed = rollbackProposedProjection(prior, payload.to_model_ref);
      if (!refsEqual(eventRef(prepare), payload.prepare_event_ref)
        || payload.expected_binding_head_digest !== prior.physical_head_digest
        || payload.prior_verified_projection_digest !== prior.projection_digest
        || payload.proposed_projection_digest !== proposed.proposed_projection_digest
        || canonicalJson(expectedProposed) !== canonicalJson(proposed)
        || !refsEqual(payload.baseline_ref, proposed.baseline_ref)
        || !refsEqual(payload.from_model_ref, prior.model_ref!)
        || proposed.proposed_model_ref === null
        || !refsEqual(payload.to_model_ref, proposed.proposed_model_ref)
        || payload.requested_target_event_digest
          !== transition.transition_evidence.requested_target_event_digest
        || payload.selected_target_event_digest
          !== transition.transition_evidence.selected_target_event_digest
        || canonicalJson(payload.ordered_target_event_digests)
          !== canonicalJson(transition.transition_evidence.ordered_target_event_digests)
        || !refsEqual(payload.baseline_ref, transition.transition_evidence.baseline_ref)
        || !refsEqual(payload.from_model_ref, transition.transition_evidence.from_model_ref)
        || !refsEqual(payload.to_model_ref, transition.transition_evidence.to_model_ref)
        || !refsEqual(payload.proposed_scope_ref, transition.transition_evidence.proposed_scope_ref)
        || payload.reason_code !== transition.transition_evidence.reason_code) {
        fail("task6_event_readback_failed");
      }
      pending = pendingProjection(prior, proposed, payload.transition_id, event.event_digest);
    } else if (event.event_type === "fallback_baseline_committed") {
      if (pending !== null || verified === null) fail("task6_event_readback_failed");
      const payload = event.payload as SimulatedFallbackBaselineCommitPayload;
      const transition = transactionFor(streams, payload.transition_id);
      if (transition.transition_evidence.kind !== "fallback_baseline") {
        fail("task6_event_readback_failed");
      }
      const prepare = transition.events[0]!;
      const proposed = transition.proposed_projection;
      const prior = verified;
      const expectedProposed = fallbackBaselineProposedProjection(prior);
      if (!refsEqual(eventRef(prepare), payload.prepare_event_ref)
        || payload.expected_binding_head_digest !== prior.physical_head_digest
        || payload.prior_verified_projection_digest !== prior.projection_digest
        || payload.proposed_projection_digest !== proposed.proposed_projection_digest
        || canonicalJson(expectedProposed) !== canonicalJson(proposed)
        || !refsEqual(payload.baseline_ref, proposed.baseline_ref)
        || !refsEqual(payload.from_model_ref, prior.model_ref!)
        || payload.to_model_ref !== null
        || payload.requested_target_event_digest
          !== transition.transition_evidence.requested_target_event_digest
        || payload.selected_target_event_digest !== null
        || canonicalJson(payload.ordered_target_event_digests)
          !== canonicalJson(transition.transition_evidence.ordered_target_event_digests)
        || !refsEqual(payload.baseline_ref, transition.transition_evidence.baseline_ref)
        || !refsEqual(payload.from_model_ref, transition.transition_evidence.from_model_ref)
        || !refsEqual(payload.proposed_scope_ref, transition.transition_evidence.proposed_scope_ref)
        || payload.reason_code !== transition.transition_evidence.reason_code) {
        fail("task6_event_readback_failed");
      }
      pending = pendingProjection(prior, proposed, payload.transition_id, event.event_digest);
    } else if (event.event_type === "binding_readback_verified") {
      if (pending === null) fail("task6_event_readback_failed");
      const payload = event.payload as SimulatedReadbackVerifiedPayload;
      const transition = transactionFor(streams, payload.transition_id);
      const commit = binding.events[index - 1];
      if (commit === undefined
        || (commit.event_type !== "binding_committed"
          && commit.event_type !== "binding_suspended_committed"
          && commit.event_type !== "rollback_committed"
          && commit.event_type !== "fallback_baseline_committed")
        || !refsEqual(eventRef(transition.events[0]!), payload.prepare_event_ref)
        || !refsEqual(eventRef(commit), payload.commit_event_ref)
        || payload.expected_commit_digest !== commit.event_digest
        || payload.observed_commit_digest !== commit.event_digest
        || payload.proposed_projection_digest
          !== transition.proposed_projection.proposed_projection_digest
        || payload.complete_lineage_digest
          !== completeLineageDigest(vault, transition, binding.events.slice(0, index))) {
        fail("task6_event_readback_failed");
      }
      verified = finalProjection(
        transition.proposed_projection,
        payload.transition_id,
        event.event_digest,
      );
      pending = null;
    } else {
      fail("task6_event_readback_failed");
    }
  }
  return pending ?? verified ?? fail("task6_event_readback_failed");
}

export function inspectSimulatedBinding(
  vault: EvaluationSimulatorVault,
  streamId: string,
): SimulatedBindingProjection | null {
  try {
    if (typeof streamId !== "string" || !/^learning_binding_sim\.[a-f0-9]{32}$/u.test(streamId)) {
      fail("task6_reference_invalid");
    }
    const streams = storedSimulatedStreams(vault);
    const matches = streams.filter((stream): stream is StoredBindingStream =>
      stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
      && stream.stream_id === streamId);
    if (matches.length === 0) return null;
    if (matches.length !== 1) fail("task6_vault_invalid");
    return immutable(rebuildBindingProjection(vault, streams, matches[0]!));
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function task6InternalRequireVerifiedBindingReplay(
  vault: EvaluationSimulatorVault,
  streamId: string,
  expectedHeadDigest: string,
): Task6InternalVerifiedBindingReplay {
  if (typeof streamId !== "string" || !/^learning_binding_sim\.[a-f0-9]{32}$/u.test(streamId)
    || typeof expectedHeadDigest !== "string" || !DIGEST.test(expectedHeadDigest)) {
    fail("task6_reference_invalid");
  }
  const streams = storedSimulatedStreams(vault);
  const matches = streams.filter((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === streamId);
  if (matches.length !== 1) fail("task6_event_readback_failed");
  const binding = matches[0]!;
  const projection = rebuildBindingProjection(vault, streams, binding);
  const readback = binding.events.at(-1);
  if (projection.projection_stage !== "verified"
    || projection.state !== "candidate"
    || projection.model_ref === null
    || projection.verified_transition_id === null
    || projection.verified_head_digest !== expectedHeadDigest
    || projection.physical_head_digest !== expectedHeadDigest
    || readback === undefined
    || readback.event_type !== "binding_readback_verified"
    || readback.event_digest !== expectedHeadDigest) {
    fail(projection.projection_stage === "pending"
      ? "task6_transition_pending_readback"
      : "task6_stream_head_conflict");
  }
  const payload = readback.payload as SimulatedReadbackVerifiedPayload;
  const transition = transactionFor(streams, payload.transition_id);
  let promotionTransition: StoredTransitionStream;
  if (transition.transition_evidence.kind === "promotion") {
    promotionTransition = transition;
  } else if (transition.transition_evidence.kind === "rollback"
    && transition.cause_value !== null
    && hasExactKeys(transition.cause_value, [
      "contract_version", "current_binding_replay", "ordered_target_replays",
      "selected_target_replay",
    ])) {
    const selected = transition.cause_value.selected_target_replay;
    if (!hasExactKeys(selected, [
      "verified_binding_event_digest", "model_record", "model_dependencies", "currentness",
    ]) || typeof selected.verified_binding_event_digest !== "string") {
      fail("task6_event_readback_failed");
    }
    promotionTransition = targetPromotionTransition(
      vault,
      streams,
      binding,
      storedRollbackTarget(vault, streams, binding, selected.verified_binding_event_digest),
    );
  } else {
    fail("task6_event_readback_failed");
  }
  const evaluation = promotionTransition.evaluation_result;
  assertEvaluation(evaluation);
  if (payload.transition_id !== projection.verified_transition_id
    || transition.transition_id !== projection.verified_transition_id
    || promotionTransition.transition_evidence.kind !== "promotion"
    || !refsEqual(promotionTransition.transition_evidence.model_ref, projection.model_ref)
    || !refsEqual(promotionTransition.transition_evidence.evaluation_ref, evaluationRef(evaluation))
    || (transition.transition_evidence.kind === "rollback"
      && !refsEqual(transition.transition_evidence.to_model_ref, projection.model_ref))) {
    fail("task6_event_readback_failed");
  }
  return immutable({
    projection,
    verified_at: readback.occurred_at,
    transition_id: transition.transition_id,
    promotion_transition_id: promotionTransition.transition_id,
    promotion_evaluation: evaluation,
  });
}

export function task6InternalSimulateSuspension(
  input: Task6InternalSuspensionInput,
): SimulatedBindingTransitionResult {
  const verified = task6InternalRequireVerifiedBindingReplay(
    input.vault,
    input.binding_stream_id,
    input.expected_head_digest,
  );
  if (!(["drift", "revocation"] as const).includes(input.cause_kind)
    || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
    || !task2IsRfc3339(input.occurred_at)) {
    fail("task6_input_shape_invalid");
  }
  assertRef(input.cause_ref);
  let derivedCauseRef: Task6ObjectRef;
  if (input.cause_kind === "drift") {
    if (input.cause_value === null || typeof input.cause_value !== "object"
      || Array.isArray(input.cause_value)
      || !("record_id" in input.cause_value)
      || !("schema_id" in input.cause_value)
      || !("schema_version" in input.cause_value)
      || !("content_digest" in input.cause_value)
      || !verifyRecordDigest(input.cause_value as never).valid) {
      fail("task6_digest_invalid");
    }
    const causeRecord = input.cause_value as {
      record_id: string;
      schema_id: string;
      schema_version: "0.1.0";
      content_digest: string;
    };
    derivedCauseRef = {
      record_id: causeRecord.record_id,
      schema_id: causeRecord.schema_id,
      schema_version: causeRecord.schema_version,
      content_digest: causeRecord.content_digest,
    };
  } else {
    if (!hasExactKeys(input.cause_value, [
      "contract_version", "witness_id", "revoked_ref", "revoked_at", "reason",
      "replacement_ref", "witness_digest", "record_mode", "authority_effect",
    ])) fail("task6_digest_invalid");
    const witness = input.cause_value as Record<string, unknown>;
    const { witness_id: witnessId, witness_digest: witnessDigest, ...preimage } = witness;
    const digest = sha256Canonical(preimage);
    if (witness["contract_version"] !== "contentmd.simulated-revocation-witness/0.1.0"
      || witness["record_mode"] !== "development_fixture"
      || witness["authority_effect"] !== "none"
      || typeof witnessId !== "string"
      || typeof witnessDigest !== "string"
      || witnessDigest !== digest
      || witnessId !== `simulated_revocation.${digest.slice(0, 32)}`) {
      fail("task6_digest_invalid");
    }
    derivedCauseRef = {
      record_id: witnessId,
      schema_id: "contentmd.simulated-revocation-witness",
      schema_version: "0.1.0",
      content_digest: witnessDigest,
    };
  }
  if (!refsEqual(input.cause_ref, derivedCauseRef)) fail("task6_reference_invalid");

  const initialStreams = storedSimulatedStreams(input.vault);
  const origin = transactionFor(initialStreams, verified.transition_id);
  const lineageOrigin = transactionFor(initialStreams, verified.promotion_transition_id);
  if ((origin.transition_evidence.kind !== "promotion"
    && origin.transition_evidence.kind !== "rollback")
    || verified.projection.baseline_ref === null
    || verified.projection.model_ref === null) {
    fail("task6_event_readback_failed");
  }
  const prior = verified.projection;
  const baselineRef = prior.baseline_ref;
  const modelRef = prior.model_ref;
  if (baselineRef === null || modelRef === null) fail("task6_event_readback_failed");
  const proposed = suspensionProposedProjection(prior);
  const transitionEvidence: SimulatedSuspensionEvidence = Object.freeze({
    kind: "suspension",
    baseline_ref: baselineRef,
    model_ref: modelRef,
    cause_kind: input.cause_kind,
    cause_ref: input.cause_ref,
    proposed_scope_ref: origin.transition_evidence.proposed_scope_ref,
  });
  const transitionEvidenceDigest = sha256Canonical({
    contract_version: "contentmd.simulated-transition-evidence/0.1.0",
    evidence: transitionEvidence,
  });
  const transitionDigest = sha256Canonical({
    contract_version: "contentmd.simulated-binding-transition/0.1.0",
    binding_stream_id: input.binding_stream_id,
    transition_kind: "suspension",
    expected_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
    actor_ref: input.actor_ref,
    occurred_at: input.occurred_at,
  });
  const transitionId = `learning_transition.${transitionDigest.slice(0, 32)}`;
  const transactionStreamId = transitionStreamId(transitionId);
  const preparePayload: SimulatedTransitionPreparedPayload = {
    contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "prepare",
    transition_id: transitionId,
    transition_kind: "suspension",
    binding_stream_id: input.binding_stream_id,
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
  };
  const prepareEvent = createLearningEvent(
    transactionStreamId,
    "transition_prepared",
    preparePayload,
    input.actor_ref,
    input.occurred_at,
    null,
  );
  const transactionStream: StoredTransitionStream = Object.freeze({
    contract_version: "contentmd.stored-simulated-transition-stream/0.1.0",
    stream_id: transactionStreamId,
    transition_id: transitionId,
    transition_digest: transitionDigest,
    transition_evidence: transitionEvidence,
    proposed_projection: proposed,
    sealed_test_handle_id: lineageOrigin.sealed_test_handle_id,
    evaluation_result: lineageOrigin.evaluation_result,
    shadow_result: lineageOrigin.shadow_result,
    decision: lineageOrigin.decision,
    cause_value: immutableWithStructuralSharing(input.cause_value),
    events: Object.freeze([prepareEvent]) as readonly [SimulatedLearningEvent],
  });
  if (initialStreams.some((stream) => stream.stream_id === transactionStreamId)) {
    fail("task6_event_append_failed");
  }
  task6InternalCommitFrozenStreams(
    input.vault,
    "suspension_prepare",
    [...initialStreams, transactionStream],
  );
  const afterPrepare = storedSimulatedStreams(input.vault);
  const prepared = transactionFor(afterPrepare, transitionId);
  if (prepared.transition_digest !== transitionDigest) fail("task6_event_readback_failed");
  const preparedProjection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (preparedProjection === null
    || preparedProjection.projection_digest !== prior.projection_digest) {
    fail("task6_stream_head_conflict");
  }

  const commitPayload: SimulatedSuspensionCommitPayload = {
    contract_version: "contentmd.simulated-suspension-commit-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "commit",
    transition_id: transitionId,
    transition_kind: "suspension",
    prepare_event_ref: eventRef(prepareEvent),
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    baseline_ref: baselineRef,
    model_ref: modelRef,
    cause_kind: input.cause_kind,
    cause_ref: input.cause_ref,
    proposed_scope_ref: transitionEvidence.proposed_scope_ref,
  };
  const preparedStreams = storedSimulatedStreams(input.vault);
  const binding = preparedStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (binding === undefined || binding.events.at(-1)?.event_digest !== input.expected_head_digest) {
    fail("task6_stream_head_conflict");
  }
  const commitEvent = createLearningEvent(
    input.binding_stream_id,
    "binding_suspended_committed",
    commitPayload,
    input.actor_ref,
    input.occurred_at,
    binding.events.at(-1)!,
  );
  const bindingAfterCommit: StoredBindingStream = Object.freeze({
    ...binding,
    events: Object.freeze([...binding.events, commitEvent]),
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "suspension_commit",
    replaceStoredStream(preparedStreams, bindingAfterCommit),
  );
  const pending = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (pending === null || pending.projection_stage !== "pending"
    || pending.pending_transition_id !== transitionId
    || pending.physical_head_digest !== commitEvent.event_digest) {
    fail("task6_event_readback_failed");
  }

  const committedStreams = storedSimulatedStreams(input.vault);
  const committedBinding = committedStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (committedBinding === undefined) fail("task6_event_readback_failed");
  const lineageDigest = completeLineageDigest(input.vault, prepared, committedBinding.events);
  const readbackPayload: SimulatedReadbackVerifiedPayload = {
    contract_version: "contentmd.simulated-readback-verified-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "readback",
    transition_id: transitionId,
    transition_kind: "suspension",
    prepare_event_ref: eventRef(prepareEvent),
    commit_event_ref: eventRef(commitEvent),
    expected_commit_digest: commitEvent.event_digest,
    observed_commit_digest: commitEvent.event_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    complete_lineage_digest: lineageDigest,
  };
  const readbackEvent = createLearningEvent(
    input.binding_stream_id,
    "binding_readback_verified",
    readbackPayload,
    input.actor_ref,
    input.occurred_at,
    commitEvent,
  );
  const bindingAfterReadback: StoredBindingStream = Object.freeze({
    ...committedBinding,
    events: Object.freeze([...committedBinding.events, readbackEvent]),
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "suspension_readback",
    replaceStoredStream(committedStreams, bindingAfterReadback),
  );
  const projection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (projection === null || projection.projection_stage !== "verified"
    || projection.state !== "suspended"
    || projection.verified_transition_id !== transitionId
    || projection.verified_head_digest !== readbackEvent.event_digest) {
    fail("task6_event_readback_failed");
  }
  return issueTransitionResult(
    prepared,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

interface StoredRollbackTarget {
  verified_binding_event_digest: string;
  projection: SimulatedVerifiedBindingProjection;
  transition: StoredTransitionStream;
}

function storedRollbackTarget(
  vault: EvaluationSimulatorVault,
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  verifiedEventDigest: string,
): StoredRollbackTarget {
  const indexes = binding.events.flatMap((event, index) =>
    event.event_digest === verifiedEventDigest ? [index] : []);
  if (indexes.length !== 1) fail("task6_rollback_target_invalid");
  const index = indexes[0]!;
  const event = binding.events[index]!;
  if (event.event_type !== "binding_readback_verified") {
    fail("task6_rollback_target_invalid");
  }
  const prefix: StoredBindingStream = Object.freeze({
    ...binding,
    events: Object.freeze(binding.events.slice(0, index + 1)),
  });
  const projection = rebuildBindingProjection(vault, streams, prefix);
  if (projection.projection_stage !== "verified"
    || projection.verified_head_digest !== verifiedEventDigest) {
    fail("task6_rollback_target_invalid");
  }
  return {
    verified_binding_event_digest: verifiedEventDigest,
    projection,
    transition: transactionFor(streams, event.payload.transition_id),
  };
}

function targetPromotionLineage(
  vault: EvaluationSimulatorVault,
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  target: StoredRollbackTarget,
  seen = new Set<string>(),
): ReturnType<typeof task6InternalRequireSealedReplayById> {
  const promotion = targetPromotionTransition(vault, streams, binding, target, seen);
  return task6InternalRequireSealedReplayById(vault, promotion.sealed_test_handle_id);
}

function targetPromotionTransition(
  vault: EvaluationSimulatorVault,
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  target: StoredRollbackTarget,
  seen = new Set<string>(),
): StoredTransitionStream {
  if (seen.has(target.verified_binding_event_digest)) {
    fail("task6_rollback_target_invalid");
  }
  seen.add(target.verified_binding_event_digest);
  if (target.transition.transition_evidence.kind === "promotion") {
    return target.transition;
  }
  if (target.transition.transition_evidence.kind !== "rollback"
    || !hasExactKeys(target.transition.cause_value, [
      "contract_version", "current_binding_replay", "ordered_target_replays",
      "selected_target_replay",
    ])
    || target.transition.cause_value.contract_version
      !== "contentmd.simulated-rollback-transition-values/0.1.0") {
    fail("task6_rollback_target_invalid");
  }
  const selected = target.transition.cause_value.selected_target_replay;
  if (!hasExactKeys(selected, [
    "verified_binding_event_digest", "model_record", "model_dependencies", "currentness",
  ]) || typeof selected.verified_binding_event_digest !== "string") {
    fail("task6_rollback_target_invalid");
  }
  return targetPromotionTransition(
    vault,
    streams,
    binding,
    storedRollbackTarget(vault, streams, binding, selected.verified_binding_event_digest),
    seen,
  );
}

function graphContainsRef(value: unknown, ref: Task6ObjectRef): boolean {
  const visited = new Set<object>();
  const ancestors = new Set<object>();
  let found = false;
  const visit = (current: unknown): void => {
    if (found || current === null || typeof current !== "object") return;
    if (ancestors.has(current)) fail("task6_rollback_target_invalid");
    if (visited.has(current)) return;
    ancestors.add(current);
    if (!Array.isArray(current)) {
      const candidate = current as Record<string, unknown>;
      if (candidate["record_id"] === ref.record_id
        && candidate["schema_id"] === ref.schema_id
        && candidate["schema_version"] === ref.schema_version
        && candidate["content_digest"] === ref.content_digest) {
        found = true;
      } else if (candidate["snapshot_id"] === ref.record_id
        && `contentmd.task2-${String(candidate["snapshot_kind"])}-snapshot` === ref.schema_id
        && candidate["snapshot_digest"] === ref.content_digest) {
        found = true;
      }
    }
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (typeof key !== "string" || descriptor === undefined || !("value" in descriptor)) {
        fail("task6_rollback_target_invalid");
      }
      visit(descriptor.value);
    }
    ancestors.delete(current);
    visited.add(current);
  };
  visit(value);
  return found;
}

function storedRevokedRefs(
  streams: readonly StoredSimulatedStream[],
): readonly Task6ObjectRef[] {
  return streams.flatMap((stream) => {
    if (stream.contract_version !== "contentmd.stored-simulated-transition-stream/0.1.0"
      || stream.transition_evidence.kind !== "suspension"
      || stream.transition_evidence.cause_kind !== "revocation"
      || !hasExactKeys(stream.cause_value, [
        "contract_version", "witness_id", "revoked_ref", "revoked_at", "reason",
        "replacement_ref", "witness_digest", "record_mode", "authority_effect",
      ])) return [];
    const witness = stream.cause_value as Record<string, unknown>;
    const revokedRef = witness["revoked_ref"] as Task6ObjectRef;
    assertRef(revokedRef);
    const { witness_id: witnessId, witness_digest: witnessDigest, ...preimage } = witness;
    const digest = sha256Canonical(preimage);
    const witnessRef: Task6ObjectRef = {
      record_id: String(witnessId),
      schema_id: "contentmd.simulated-revocation-witness",
      schema_version: "0.1.0",
      content_digest: String(witnessDigest),
    };
    if (witness["contract_version"] !== "contentmd.simulated-revocation-witness/0.1.0"
      || witness["record_mode"] !== "development_fixture"
      || witness["authority_effect"] !== "none"
      || witnessDigest !== digest
      || witnessId !== `simulated_revocation.${digest.slice(0, 32)}`
      || !refsEqual(stream.transition_evidence.cause_ref, witnessRef)) {
      fail("task6_rollback_target_invalid");
    }
    return [revokedRef];
  });
}

function targetReachedByStoredRevocation(
  streams: readonly StoredSimulatedStream[],
  lineage: ReturnType<typeof task6InternalRequireSealedReplayById>,
  projection: SimulatedVerifiedBindingProjection,
): boolean {
  return storedRevokedRefs(streams).some((revokedRef) =>
    graphContainsRef(lineage, revokedRef) || graphContainsRef(projection, revokedRef));
}

function resolveRollbackTarget(
  input: Task6InternalRollbackInput,
  streams: readonly StoredSimulatedStream[],
  binding: StoredBindingStream,
  prior: SimulatedVerifiedBindingProjection,
): Task6InternalResolvedRollbackTarget | null {
  const detachedTargetReplays = immutableWithStructuralSharing(input.ordered_target_replays);
  const storedTargets = [...prior.superseded_verified_event_digests]
    .map((digest) => storedRollbackTarget(input.vault, streams, binding, digest))
    .filter((target) => target.projection.state === "candidate"
      && target.projection.model_ref !== null)
    .reverse();
  const expectedDigests = storedTargets.map(({ verified_binding_event_digest }) =>
    verified_binding_event_digest);
  const suppliedDigests = detachedTargetReplays.map(({ verified_binding_event_digest }) =>
    verified_binding_event_digest);
  if (canonicalJson(suppliedDigests) !== canonicalJson(expectedDigests)) {
    fail("task6_rollback_target_invalid");
  }
  const requestedIndex = input.requested_target_event_digest === null
    ? 0
    : expectedDigests.indexOf(input.requested_target_event_digest);
  if (input.requested_target_event_digest !== null && requestedIndex < 0) {
    fail("task6_rollback_target_invalid");
  }
  const currentTransition = prior.verified_transition_id === null
    ? null
    : transactionFor(streams, prior.verified_transition_id);
  if (currentTransition === null) fail("task6_rollback_target_invalid");
  const currentScopeRef = currentTransition.transition_evidence.proposed_scope_ref;

  for (let index = requestedIndex; index < storedTargets.length; index += 1) {
    const target = storedTargets[index]!;
    const replay = detachedTargetReplays[index]!;
    const lineage = targetPromotionLineage(input.vault, streams, binding, target);
    if (targetReachedByStoredRevocation(streams, lineage, target.projection)) continue;
    const scopeRef = assertScope(lineage.replay.proposed_scope);
    if (!refsEqual(scopeRef, currentScopeRef)
      || target.projection.baseline_ref === null
      || prior.baseline_ref === null
      || !refsEqual(target.projection.baseline_ref, prior.baseline_ref)) {
      fail("task6_rollback_target_invalid");
    }
    let modelRef: Task6ObjectRef;
    try {
      const verifiedModel = verifyRankingModel(replay.model_record, replay.model_dependencies);
      modelRef = rankingModelRef(verifiedModel.record);
      if (verifiedModel.verification_digest !== lineage.model_verification_digest
        || !refsEqual(modelRef, lineage.handle.model_ref)
        || target.projection.model_ref === null
        || !refsEqual(modelRef, target.projection.model_ref)
        || replay.currentness.checked_at !== input.occurred_at) {
        continue;
      }
      task6InternalValidateCurrentness(
        replay.currentness,
        scopeRef,
        lineage.replay.reviewer_policy.reviewers.map(({ reviewer_ref }) => reviewer_ref),
      );
    } catch {
      continue;
    }
    return {
      replay,
      ordered_target_replays: detachedTargetReplays,
      model_ref: modelRef,
      proposed_scope_ref: scopeRef,
    };
  }
  return null;
}

export function task6InternalSimulateRollback(
  input: Task6InternalRollbackInput,
): SimulatedBindingTransitionResult | null {
  if (!/^learning_binding_sim\.[a-f0-9]{32}$/u.test(input.binding_stream_id)
    || !DIGEST.test(input.expected_head_digest)
    || (input.requested_target_event_digest !== null
      && !DIGEST.test(input.requested_target_event_digest))
    || !Array.isArray(input.ordered_target_replays)
    || input.ordered_target_replays.length === 0
    || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
    || !task2IsRfc3339(input.occurred_at)) {
    fail("task6_rollback_target_invalid");
  }
  const initialStreams = storedSimulatedStreams(input.vault);
  const bindingMatches = initialStreams.filter((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (bindingMatches.length !== 1) fail("task6_reference_invalid");
  const binding = bindingMatches[0]!;
  const prior = rebuildBindingProjection(input.vault, initialStreams, binding);
  if (prior.projection_stage !== "verified"
    || (prior.state !== "candidate" && prior.state !== "suspended")
    || prior.baseline_ref === null
    || prior.model_ref === null
    || prior.verified_transition_id === null
    || prior.verified_head_digest !== input.expected_head_digest
    || prior.physical_head_digest !== input.expected_head_digest) {
    fail(prior.projection_stage === "pending"
      ? "task6_transition_pending_readback"
      : "task6_stream_head_conflict");
  }
  const selected = resolveRollbackTarget(input, initialStreams, binding, prior);
  if (selected === null) return null;
  const origin = transactionFor(initialStreams, prior.verified_transition_id);
  const proposed = rollbackProposedProjection(prior, selected.model_ref);
  const orderedTargetDigests = Object.freeze(
    selected.ordered_target_replays.map(({ verified_binding_event_digest }) =>
      verified_binding_event_digest),
  ) as readonly [string, ...string[]];
  const transitionEvidence: SimulatedRollbackEvidence = Object.freeze({
    kind: "rollback",
    baseline_ref: prior.baseline_ref,
    from_model_ref: prior.model_ref,
    to_model_ref: selected.model_ref,
    requested_target_event_digest: input.requested_target_event_digest,
    selected_target_event_digest: selected.replay.verified_binding_event_digest,
    ordered_target_event_digests: orderedTargetDigests,
    proposed_scope_ref: selected.proposed_scope_ref,
    reason_code: input.reason_code,
  });
  const transitionValues: StoredRollbackTransitionValues = Object.freeze({
    contract_version: "contentmd.simulated-rollback-transition-values/0.1.0",
    current_binding_replay: currentBindingReplayValue(initialStreams, binding, prior),
    ordered_target_replays: selected.ordered_target_replays,
    selected_target_replay: selected.replay,
  });
  const transitionEvidenceDigest = sha256Canonical({
    contract_version: "contentmd.simulated-transition-evidence/0.1.0",
    evidence: transitionEvidence,
  });
  const transitionDigest = sha256Canonical({
    contract_version: "contentmd.simulated-binding-transition/0.1.0",
    binding_stream_id: input.binding_stream_id,
    transition_kind: "rollback",
    expected_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
    actor_ref: input.actor_ref,
    occurred_at: input.occurred_at,
  });
  const transitionId = `learning_transition.${transitionDigest.slice(0, 32)}`;
  const preparePayload: SimulatedTransitionPreparedPayload = {
    contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "prepare",
    transition_id: transitionId,
    transition_kind: "rollback",
    binding_stream_id: input.binding_stream_id,
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
  };
  const prepareEvent = createLearningEvent(
    transitionStreamId(transitionId),
    "transition_prepared",
    preparePayload,
    input.actor_ref,
    input.occurred_at,
    null,
  );
  const transactionStream: StoredTransitionStream = Object.freeze({
    contract_version: "contentmd.stored-simulated-transition-stream/0.1.0",
    stream_id: transitionStreamId(transitionId),
    transition_id: transitionId,
    transition_digest: transitionDigest,
    transition_evidence: transitionEvidence,
    proposed_projection: proposed,
    sealed_test_handle_id: origin.sealed_test_handle_id,
    evaluation_result: origin.evaluation_result,
    shadow_result: origin.shadow_result,
    decision: origin.decision,
    cause_value: transitionValues,
    events: Object.freeze([prepareEvent]) as readonly [SimulatedLearningEvent],
  });
  if (initialStreams.some((stream) => stream.stream_id === transactionStream.stream_id)) {
    fail("task6_event_append_failed");
  }
  task6InternalCommitFrozenStreams(
    input.vault,
    "rollback_prepare",
    [...initialStreams, transactionStream],
  );
  const preparedStreams = storedSimulatedStreams(input.vault);
  const prepared = transactionFor(preparedStreams, transitionId);
  if (prepared !== transactionStream) {
    fail("task6_event_readback_failed");
  }
  const preparedProjection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (preparedProjection === null
    || preparedProjection.projection_digest !== prior.projection_digest) {
    fail("task6_stream_head_conflict");
  }
  const commitPayload: SimulatedRollbackCommitPayload = {
    contract_version: "contentmd.simulated-rollback-commit-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "commit",
    transition_id: transitionId,
    transition_kind: "rollback",
    prepare_event_ref: eventRef(prepareEvent),
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    baseline_ref: prior.baseline_ref,
    from_model_ref: prior.model_ref,
    to_model_ref: selected.model_ref,
    requested_target_event_digest: input.requested_target_event_digest,
    selected_target_event_digest: selected.replay.verified_binding_event_digest,
    ordered_target_event_digests: orderedTargetDigests,
    proposed_scope_ref: selected.proposed_scope_ref,
    reason_code: input.reason_code,
  };
  const beforeCommit = storedSimulatedStreams(input.vault);
  const bindingBeforeCommit = beforeCommit.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (bindingBeforeCommit === undefined
    || bindingBeforeCommit.events.at(-1)?.event_digest !== input.expected_head_digest) {
    fail("task6_stream_head_conflict");
  }
  const commitEvent = createLearningEvent(
    input.binding_stream_id,
    "rollback_committed",
    commitPayload,
    input.actor_ref,
    input.occurred_at,
    bindingBeforeCommit.events.at(-1)!,
  );
  const bindingAfterCommit: StoredBindingStream = immutable({
    ...bindingBeforeCommit,
    events: [...bindingBeforeCommit.events, commitEvent],
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "rollback_commit",
    replaceStoredStream(beforeCommit, bindingAfterCommit),
  );
  const pending = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (pending === null || pending.projection_stage !== "pending"
    || pending.pending_transition_id !== transitionId
    || pending.physical_head_digest !== commitEvent.event_digest) {
    fail("task6_event_readback_failed");
  }
  const committedStreams = storedSimulatedStreams(input.vault);
  const committedBinding = committedStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (committedBinding === undefined) fail("task6_event_readback_failed");
  const lineageDigest = completeLineageDigest(input.vault, prepared, committedBinding.events);
  const readbackPayload: SimulatedReadbackVerifiedPayload = {
    contract_version: "contentmd.simulated-readback-verified-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "readback",
    transition_id: transitionId,
    transition_kind: "rollback",
    prepare_event_ref: eventRef(prepareEvent),
    commit_event_ref: eventRef(commitEvent),
    expected_commit_digest: commitEvent.event_digest,
    observed_commit_digest: commitEvent.event_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    complete_lineage_digest: lineageDigest,
  };
  const readbackEvent = createLearningEvent(
    input.binding_stream_id,
    "binding_readback_verified",
    readbackPayload,
    input.actor_ref,
    input.occurred_at,
    commitEvent,
  );
  const bindingAfterReadback: StoredBindingStream = immutable({
    ...committedBinding,
    events: [...committedBinding.events, readbackEvent],
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "rollback_readback",
    replaceStoredStream(committedStreams, bindingAfterReadback),
  );
  const projection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (projection === null || projection.projection_stage !== "verified"
    || projection.state !== "candidate"
    || projection.model_ref === null
    || !refsEqual(projection.model_ref, selected.model_ref)
    || projection.verified_transition_id !== transitionId
    || projection.verified_head_digest !== readbackEvent.event_digest) {
    fail("task6_event_readback_failed");
  }
  return issueTransitionResult(
    prepared,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

export function task6InternalSimulateFallbackBaseline(
  input: Task6InternalFallbackBaselineInput,
): SimulatedBindingTransitionResult {
  if (!/^learning_binding_sim\.[a-f0-9]{32}$/u.test(input.binding_stream_id)
    || !DIGEST.test(input.expected_head_digest)
    || (input.requested_target_event_digest !== null
      && !DIGEST.test(input.requested_target_event_digest))
    || !Array.isArray(input.ordered_target_replays)
    || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
    || !task2IsRfc3339(input.occurred_at)) {
    fail("task6_rollback_target_invalid");
  }
  assertRef(input.fallback_baseline_ref);
  const initialStreams = storedSimulatedStreams(input.vault);
  const binding = initialStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (binding === undefined) fail("task6_reference_invalid");
  const prior = rebuildBindingProjection(input.vault, initialStreams, binding);
  if (prior.projection_stage !== "verified"
    || (prior.state !== "candidate" && prior.state !== "suspended")
    || prior.baseline_ref === null
    || prior.model_ref === null
    || prior.verified_transition_id === null
    || prior.verified_head_digest !== input.expected_head_digest
    || prior.physical_head_digest !== input.expected_head_digest) {
    fail(prior.projection_stage === "pending"
      ? "task6_transition_pending_readback"
      : "task6_stream_head_conflict");
  }
  if (!refsEqual(input.fallback_baseline_ref, prior.baseline_ref)) {
    fail("task6_no_valid_rollback_target");
  }
  const origin = transactionFor(initialStreams, prior.verified_transition_id);
  const proposed = fallbackBaselineProposedProjection(prior);
  const detachedTargetReplays = immutableWithStructuralSharing(input.ordered_target_replays);
  const orderedTargetEventDigests = Object.freeze(detachedTargetReplays.map((target) => {
    if (!hasExactKeys(target, [
      "verified_binding_event_digest", "model_record", "model_dependencies", "currentness",
    ]) || typeof target.verified_binding_event_digest !== "string") {
      fail("task6_rollback_target_invalid");
    }
    return target.verified_binding_event_digest;
  }));
  const transitionEvidence: SimulatedFallbackBaselineEvidence = Object.freeze({
    kind: "fallback_baseline",
    baseline_ref: prior.baseline_ref,
    from_model_ref: prior.model_ref,
    to_model_ref: null,
    requested_target_event_digest: input.requested_target_event_digest,
    selected_target_event_digest: null,
    ordered_target_event_digests: orderedTargetEventDigests,
    proposed_scope_ref: origin.transition_evidence.proposed_scope_ref,
    reason_code: input.reason_code,
  });
  const transitionValues: StoredFallbackTransitionValues = Object.freeze({
    contract_version: "contentmd.simulated-fallback-transition-values/0.1.0",
    current_binding_replay: currentBindingReplayValue(initialStreams, binding, prior),
    ordered_target_replays: detachedTargetReplays,
    selected_target_replay: null,
  });
  const transitionEvidenceDigest = sha256Canonical({
    contract_version: "contentmd.simulated-transition-evidence/0.1.0",
    evidence: transitionEvidence,
  });
  const transitionDigest = sha256Canonical({
    contract_version: "contentmd.simulated-binding-transition/0.1.0",
    binding_stream_id: input.binding_stream_id,
    transition_kind: "fallback_baseline",
    expected_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
    actor_ref: input.actor_ref,
    occurred_at: input.occurred_at,
  });
  const transitionId = `learning_transition.${transitionDigest.slice(0, 32)}`;
  const transactionStreamId = transitionStreamId(transitionId);
  const preparePayload: SimulatedTransitionPreparedPayload = {
    contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "prepare",
    transition_id: transitionId,
    transition_kind: "fallback_baseline",
    binding_stream_id: input.binding_stream_id,
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    transition_evidence_digest: transitionEvidenceDigest,
  };
  const prepareEvent = createLearningEvent(
    transactionStreamId,
    "transition_prepared",
    preparePayload,
    input.actor_ref,
    input.occurred_at,
    null,
  );
  const transactionStream: StoredTransitionStream = Object.freeze({
    contract_version: "contentmd.stored-simulated-transition-stream/0.1.0",
    stream_id: transactionStreamId,
    transition_id: transitionId,
    transition_digest: transitionDigest,
    transition_evidence: transitionEvidence,
    proposed_projection: proposed,
    sealed_test_handle_id: origin.sealed_test_handle_id,
    evaluation_result: origin.evaluation_result,
    shadow_result: origin.shadow_result,
    decision: origin.decision,
    cause_value: transitionValues,
    events: Object.freeze([prepareEvent]) as readonly [SimulatedLearningEvent],
  });
  const existingPrepared = initialStreams.filter((stream): stream is StoredTransitionStream =>
    stream.contract_version === "contentmd.stored-simulated-transition-stream/0.1.0"
    && stream.stream_id === transactionStreamId);
  let afterPrepare: readonly StoredSimulatedStream[];
  let prepared: StoredTransitionStream;
  if (existingPrepared.length === 0) {
    task6InternalCommitFrozenStreams(
      input.vault,
      "rollback_prepare",
      [...initialStreams, transactionStream],
    );
    afterPrepare = storedSimulatedStreams(input.vault);
    prepared = transactionFor(afterPrepare, transitionId);
  } else if (existingPrepared.length === 1) {
    verifyTransitionStream(existingPrepared[0]!);
    if (canonicalJson(existingPrepared[0]) !== canonicalJson(transactionStream)) {
      fail("task6_event_append_failed");
    }
    afterPrepare = initialStreams;
    prepared = existingPrepared[0]!;
  } else {
    fail("task6_event_append_failed");
  }
  if (prepared.transition_digest !== transitionDigest) fail("task6_event_readback_failed");
  const preparedProjection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (preparedProjection === null
    || preparedProjection.projection_digest !== prior.projection_digest) {
    fail("task6_stream_head_conflict");
  }

  const commitPayload: SimulatedFallbackBaselineCommitPayload = {
    contract_version: "contentmd.simulated-fallback-baseline-commit-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "commit",
    transition_id: transitionId,
    transition_kind: "fallback_baseline",
    prepare_event_ref: eventRef(prepareEvent),
    expected_binding_head_digest: input.expected_head_digest,
    prior_verified_projection_digest: prior.projection_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    baseline_ref: prior.baseline_ref,
    from_model_ref: prior.model_ref,
    to_model_ref: null,
    requested_target_event_digest: input.requested_target_event_digest,
    selected_target_event_digest: null,
    ordered_target_event_digests: orderedTargetEventDigests,
    proposed_scope_ref: transitionEvidence.proposed_scope_ref,
    reason_code: input.reason_code,
  };
  const preparedStreams = storedSimulatedStreams(input.vault);
  const preparedBinding = preparedStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (preparedBinding === undefined
    || preparedBinding.events.at(-1)?.event_digest !== input.expected_head_digest) {
    fail("task6_stream_head_conflict");
  }
  const commitEvent = createLearningEvent(
    input.binding_stream_id,
    "fallback_baseline_committed",
    commitPayload,
    input.actor_ref,
    input.occurred_at,
    preparedBinding.events.at(-1)!,
  );
  const bindingAfterCommit: StoredBindingStream = Object.freeze({
    ...preparedBinding,
    events: Object.freeze([...preparedBinding.events, commitEvent]),
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "rollback_commit",
    replaceStoredStream(preparedStreams, bindingAfterCommit),
  );
  const pending = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (pending === null || pending.projection_stage !== "pending"
    || pending.pending_transition_id !== transitionId
    || pending.physical_head_digest !== commitEvent.event_digest) {
    fail("task6_event_readback_failed");
  }

  const committedStreams = storedSimulatedStreams(input.vault);
  const committedBinding = committedStreams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (committedBinding === undefined) fail("task6_event_readback_failed");
  const lineageDigest = completeLineageDigest(input.vault, prepared, committedBinding.events);
  const readbackPayload: SimulatedReadbackVerifiedPayload = {
    contract_version: "contentmd.simulated-readback-verified-payload/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    phase: "readback",
    transition_id: transitionId,
    transition_kind: "fallback_baseline",
    prepare_event_ref: eventRef(prepareEvent),
    commit_event_ref: eventRef(commitEvent),
    expected_commit_digest: commitEvent.event_digest,
    observed_commit_digest: commitEvent.event_digest,
    proposed_projection_digest: proposed.proposed_projection_digest,
    complete_lineage_digest: lineageDigest,
  };
  const readbackEvent = createLearningEvent(
    input.binding_stream_id,
    "binding_readback_verified",
    readbackPayload,
    input.actor_ref,
    input.occurred_at,
    commitEvent,
  );
  const bindingAfterReadback: StoredBindingStream = Object.freeze({
    ...committedBinding,
    events: Object.freeze([...committedBinding.events, readbackEvent]),
  });
  task6InternalCommitFrozenStreams(
    input.vault,
    "rollback_readback",
    replaceStoredStream(committedStreams, bindingAfterReadback),
  );
  const projection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
  if (projection === null || projection.projection_stage !== "verified"
    || projection.state !== "baseline"
    || projection.model_ref !== null
    || projection.verified_transition_id !== transitionId
    || projection.verified_head_digest !== readbackEvent.event_digest) {
    fail("task6_event_readback_failed");
  }
  return issueTransitionResult(
    prepared,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

export function task6InternalRequireFallbackBaselineResult(
  input: Task6InternalFallbackBaselineInput,
): SimulatedBindingTransitionResult | null {
  assertRef(input.fallback_baseline_ref);
  const suppliedFingerprints = (input.ordered_target_replays as readonly Task6InternalRollbackTargetReplay[])
    .map(rollbackReplayFingerprint);
  if (suppliedFingerprints.some((fingerprint) => fingerprint === null)) return null;
  const streams = storedSimulatedStreams(input.vault);
  const matches = streams.filter((stream): stream is StoredTransitionStream => {
    if (stream.contract_version !== "contentmd.stored-simulated-transition-stream/0.1.0"
      || stream.transition_evidence.kind !== "fallback_baseline") return false;
    const prepare = stream.events[0];
    if (prepare === undefined || prepare.event_type !== "transition_prepared") return false;
    const payload = prepare.payload as SimulatedTransitionPreparedPayload;
    const values = stream.cause_value;
    if (!hasExactKeys(values, [
      "contract_version", "current_binding_replay", "ordered_target_replays",
      "selected_target_replay",
    ]) || !Array.isArray(values.ordered_target_replays)) return false;
    const storedFingerprints = (values.ordered_target_replays as readonly Task6InternalRollbackTargetReplay[])
      .map(rollbackReplayFingerprint);
    return stream.proposed_projection.stream_id === input.binding_stream_id
      && payload.expected_binding_head_digest === input.expected_head_digest
      && refsEqual(stream.transition_evidence.baseline_ref, input.fallback_baseline_ref)
      && stream.transition_evidence.requested_target_event_digest
        === input.requested_target_event_digest
      && stream.transition_evidence.reason_code === input.reason_code
      && canonicalJson(stream.transition_evidence.ordered_target_event_digests)
        === canonicalJson(input.ordered_target_replays.map((target) => {
          if (target === null || typeof target !== "object" || Array.isArray(target)
            || !("verified_binding_event_digest" in target)) return null;
          return (target as { verified_binding_event_digest: unknown }).verified_binding_event_digest;
        }))
      && prepare.actor_ref === input.actor_ref
      && prepare.occurred_at === input.occurred_at
      && values.contract_version === "contentmd.simulated-fallback-transition-values/0.1.0"
      && storedFingerprints.every((fingerprint) => fingerprint !== null)
      && canonicalJson(storedFingerprints) === canonicalJson(suppliedFingerprints)
      && values.selected_target_replay === null;
  });
  if (matches.length === 0) return null;
  if (matches.length !== 1) fail("task6_event_readback_failed");
  const transition = matches[0]!;
  verifyTransitionStream(transition);
  const binding = streams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (binding === undefined) fail("task6_event_readback_failed");
  const commitIndex = binding.events.findIndex((event) =>
    event.event_type === "fallback_baseline_committed"
    && event.payload.transition_id === transition.transition_id);
  if (commitIndex < 0) return null;
  const commitEvent = binding.events[commitIndex]!;
  const readbackEvent = binding.events[commitIndex + 1];
  if (readbackEvent === undefined) return null;
  if (readbackEvent.event_type !== "binding_readback_verified"
    || readbackEvent.payload.transition_id !== transition.transition_id) {
    fail("task6_event_readback_failed");
  }
  const prefix: StoredBindingStream = immutable({
    ...binding,
    events: binding.events.slice(0, commitIndex + 2),
  });
  const projection = rebuildBindingProjection(input.vault, streams, prefix);
  if (projection.projection_stage !== "verified"
    || projection.state !== "baseline"
    || projection.model_ref !== null
    || projection.verified_transition_id !== transition.transition_id) {
    fail("task6_event_readback_failed");
  }
  const lineageDigest = completeLineageDigest(
    input.vault,
    transition,
    binding.events.slice(0, commitIndex + 1),
  );
  return issueTransitionResult(
    transition,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

function rollbackReplayFingerprint(replay: Task6InternalRollbackTargetReplay): string | null {
  try {
    const verifiedModel = verifyRankingModel(replay.model_record, replay.model_dependencies);
    return sha256Canonical({
      contract_version: "contentmd.simulated-rollback-target-fingerprint/0.1.0",
      verified_binding_event_digest: replay.verified_binding_event_digest,
      model_verification_digest: verifiedModel.verification_digest,
      currentness: replay.currentness,
    });
  } catch {
    return null;
  }
}

export function task6InternalRequireRollbackResult(
  input: Task6InternalRollbackInput,
): SimulatedBindingTransitionResult | null {
  const suppliedFingerprints = input.ordered_target_replays.map(rollbackReplayFingerprint);
  if (suppliedFingerprints.some((fingerprint) => fingerprint === null)) return null;
  const streams = storedSimulatedStreams(input.vault);
  const matches = streams.filter((stream): stream is StoredTransitionStream => {
    if (stream.contract_version !== "contentmd.stored-simulated-transition-stream/0.1.0"
      || stream.transition_evidence.kind !== "rollback") return false;
    const prepare = stream.events[0];
    if (prepare === undefined || prepare.event_type !== "transition_prepared") return false;
    const payload = prepare.payload as SimulatedTransitionPreparedPayload;
    const values = stream.cause_value;
    if (stream.proposed_projection.stream_id !== input.binding_stream_id
      || payload.expected_binding_head_digest !== input.expected_head_digest
      || stream.transition_evidence.requested_target_event_digest
        !== input.requested_target_event_digest
      || stream.transition_evidence.reason_code !== input.reason_code
      || canonicalJson(stream.transition_evidence.ordered_target_event_digests)
        !== canonicalJson(input.ordered_target_replays.map(
          ({ verified_binding_event_digest }) => verified_binding_event_digest,
        ))
      || prepare.actor_ref !== input.actor_ref
      || prepare.occurred_at !== input.occurred_at
      || !hasExactKeys(values, [
        "contract_version", "current_binding_replay", "ordered_target_replays",
        "selected_target_replay",
      ])
      || values.contract_version !== "contentmd.simulated-rollback-transition-values/0.1.0"
      || !Array.isArray(values.ordered_target_replays)
      || values.selected_target_replay === null
      || typeof values.selected_target_replay !== "object") {
      return false;
    }
    const storedFingerprints = (values.ordered_target_replays as readonly Task6InternalRollbackTargetReplay[])
      .map(rollbackReplayFingerprint);
    return storedFingerprints.every((fingerprint) => fingerprint !== null)
      && canonicalJson(storedFingerprints) === canonicalJson(suppliedFingerprints)
      && stream.transition_evidence.selected_target_event_digest
        === (values.selected_target_replay as Task6InternalRollbackTargetReplay)
          .verified_binding_event_digest;
  });
  if (matches.length === 0) return null;
  if (matches.length !== 1) fail("task6_event_readback_failed");
  const transition = matches[0]!;
  verifyTransitionStream(transition);
  const binding = streams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === input.binding_stream_id);
  if (binding === undefined) fail("task6_event_readback_failed");
  const commitIndex = binding.events.findIndex((event) =>
    event.event_type === "rollback_committed"
    && event.payload.transition_id === transition.transition_id);
  if (commitIndex < 0) return null;
  const commitEvent = binding.events[commitIndex]!;
  const readbackEvent = binding.events[commitIndex + 1];
  if (readbackEvent === undefined) return null;
  if (readbackEvent.event_type !== "binding_readback_verified"
    || readbackEvent.payload.transition_id !== transition.transition_id) {
    fail("task6_event_readback_failed");
  }
  const prefix: StoredBindingStream = Object.freeze({
    ...binding,
    events: Object.freeze(binding.events.slice(0, commitIndex + 2)),
  });
  const projection = rebuildBindingProjection(input.vault, streams, prefix);
  if (projection.projection_stage !== "verified"
    || projection.state !== "candidate"
    || projection.model_ref === null
    || projection.verified_transition_id !== transition.transition_id) {
    fail("task6_event_readback_failed");
  }
  const lineageDigest = completeLineageDigest(
    input.vault,
    transition,
    binding.events.slice(0, commitIndex + 1),
  );
  return issueTransitionResult(
    transition,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

export function task6InternalRequireSuspensionResult(
  vault: EvaluationSimulatorVault,
  bindingStreamId: string,
  causeRef: Task6ObjectRef,
  actorRef?: string,
  occurredAt?: string,
): SimulatedBindingTransitionResult | null {
  assertRef(causeRef);
  const streams = storedSimulatedStreams(vault);
  const transitions = streams.filter((stream): stream is StoredTransitionStream =>
    stream.contract_version === "contentmd.stored-simulated-transition-stream/0.1.0"
    && stream.transition_evidence.kind === "suspension"
    && stream.proposed_projection.stream_id === bindingStreamId
    && refsEqual(stream.transition_evidence.cause_ref, causeRef)
    && (actorRef === undefined || stream.events[0]?.actor_ref === actorRef)
    && (occurredAt === undefined || stream.events[0]?.occurred_at === occurredAt));
  if (transitions.length === 0) return null;
  if (transitions.length !== 1) fail("task6_event_readback_failed");
  const transition = transitions[0]!;
  verifyTransitionStream(transition);
  const binding = streams.find((stream): stream is StoredBindingStream =>
    stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
    && stream.stream_id === bindingStreamId);
  if (binding === undefined) fail("task6_event_readback_failed");
  const commitIndex = binding.events.findIndex((event) =>
    event.event_type === "binding_suspended_committed"
    && event.payload.transition_id === transition.transition_id);
  if (commitIndex < 0) return null;
  const commitEvent = binding.events[commitIndex]!;
  const readbackEvent = binding.events[commitIndex + 1];
  if (readbackEvent === undefined) return null;
  if (readbackEvent.event_type !== "binding_readback_verified"
    || readbackEvent.payload.transition_id !== transition.transition_id) {
    fail("task6_event_readback_failed");
  }
  const prefix: StoredBindingStream = {
    ...binding,
    events: binding.events.slice(0, commitIndex + 2),
  };
  const projection = rebuildBindingProjection(vault, streams, prefix);
  if (projection.projection_stage !== "verified" || projection.state !== "suspended") {
    fail("task6_event_readback_failed");
  }
  const lineageDigest = completeLineageDigest(
    vault,
    transition,
    binding.events.slice(0, commitIndex + 1),
  );
  return issueTransitionResult(
    transition,
    commitEvent,
    readbackEvent,
    projection,
    lineageDigest,
  );
}

export function recoverSimulatedBindingReadback(
  input: RecoverSimulatedBindingReadbackInput,
): SimulatedBindingTransitionResult {
  try {
    modeGate(input, [
      "record_mode", "vault", "binding_stream_id", "transition_id",
      "expected_commit_head_digest", "actor_ref", "occurred_at",
    ]);
    closedGraph(input);
    if (!/^learning_binding_sim\.[a-f0-9]{32}$/u.test(input.binding_stream_id)
      || !/^learning_transition\.[a-f0-9]{32}$/u.test(input.transition_id)
      || !DIGEST.test(input.expected_commit_head_digest)
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || typeof input.occurred_at !== "string" || !task2IsRfc3339(input.occurred_at)) {
      fail("task6_input_shape_invalid");
    }
    const streams = storedSimulatedStreams(input.vault);
    const bindingMatches = streams.filter((stream): stream is StoredBindingStream =>
      stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
      && stream.stream_id === input.binding_stream_id);
    if (bindingMatches.length !== 1) fail("task6_event_readback_failed");
    const binding = bindingMatches[0]!;
    const transition = transactionFor(streams, input.transition_id);
    if (transition.proposed_projection.stream_id !== input.binding_stream_id) {
      fail("task6_event_readback_failed");
    }
    const commitIndexes = binding.events.flatMap((event, index) =>
      (event.event_type === "binding_committed"
        || event.event_type === "binding_suspended_committed"
        || event.event_type === "rollback_committed"
        || event.event_type === "fallback_baseline_committed")
        && event.payload.transition_id === input.transition_id ? [index] : []);
    if (commitIndexes.length !== 1) fail("task6_event_readback_failed");
    const commitIndex = commitIndexes[0]!;
    const commitEvent = binding.events[commitIndex]!;
    if (commitEvent.event_digest !== input.expected_commit_head_digest) {
      fail("task6_stream_head_conflict");
    }
    const existingReadback = binding.events[commitIndex + 1];
    if (existingReadback !== undefined) {
      if (existingReadback.event_type !== "binding_readback_verified"
        || existingReadback.payload.transition_id !== input.transition_id) {
        fail("task6_event_readback_failed");
      }
      const prefix: StoredBindingStream = immutable({
        ...binding,
        events: binding.events.slice(0, commitIndex + 2),
      });
      const projection = rebuildBindingProjection(input.vault, streams, prefix);
      if (projection.projection_stage !== "verified"
        || projection.verified_transition_id !== input.transition_id) {
        fail("task6_event_readback_failed");
      }
      const lineageDigest = completeLineageDigest(
        input.vault,
        transition,
        binding.events.slice(0, commitIndex + 1),
      );
      return issueTransitionResult(
        transition,
        commitEvent,
        existingReadback,
        projection,
        lineageDigest,
      );
    }

    const pending = rebuildBindingProjection(input.vault, streams, binding);
    if (pending.projection_stage !== "pending"
      || pending.pending_transition_id !== input.transition_id
      || pending.physical_head_digest !== input.expected_commit_head_digest) {
      fail("task6_transition_pending_readback");
    }
    const lineageDigest = completeLineageDigest(
      input.vault,
      transition,
      binding.events.slice(0, commitIndex + 1),
    );
    const readbackPayload: SimulatedReadbackVerifiedPayload = {
      contract_version: "contentmd.simulated-readback-verified-payload/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      phase: "readback",
      transition_id: input.transition_id,
      transition_kind: transition.transition_evidence.kind,
      prepare_event_ref: eventRef(transition.events[0]!),
      commit_event_ref: eventRef(commitEvent),
      expected_commit_digest: commitEvent.event_digest,
      observed_commit_digest: commitEvent.event_digest,
      proposed_projection_digest: transition.proposed_projection.proposed_projection_digest,
      complete_lineage_digest: lineageDigest,
    };
    const readbackEvent = createLearningEvent(
      input.binding_stream_id,
      "binding_readback_verified",
      readbackPayload,
      input.actor_ref,
      input.occurred_at,
      commitEvent,
    );
    const bindingAfterReadback: StoredBindingStream = immutable({
      ...binding,
      events: [...binding.events, readbackEvent],
    });
    const readbackOperation = transition.transition_evidence.kind === "promotion"
      ? "binding_readback"
      : transition.transition_evidence.kind === "suspension"
        ? "suspension_readback"
        : "rollback_readback";
    task6InternalCommitStreams(
      input.vault,
      readbackOperation,
      replaceStoredStream(streams, bindingAfterReadback),
    );
    const afterReadback = storedSimulatedStreams(input.vault);
    const storedBinding = afterReadback.find((stream): stream is StoredBindingStream =>
      stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
      && stream.stream_id === input.binding_stream_id);
    if (storedBinding === undefined
      || storedBinding.events.at(-1)?.event_digest !== readbackEvent.event_digest) {
      fail("task6_event_readback_failed");
    }
    const projection = rebuildBindingProjection(input.vault, afterReadback, storedBinding);
    if (projection.projection_stage !== "verified"
      || projection.verified_transition_id !== input.transition_id
      || projection.verified_head_digest !== readbackEvent.event_digest) {
      fail("task6_event_readback_failed");
    }
    return issueTransitionResult(
      transition,
      commitEvent,
      readbackEvent,
      projection,
      lineageDigest,
    );
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function simulatePromotionBinding(
  input: SimulatePromotionBindingInput,
): SimulatedBindingTransitionResult {
  try {
    modeGate(input, [
      "record_mode", "vault", "project_id", "proposed_scope", "baseline_ref", "evaluation",
      "shadow_result", "decision", "actor_ref", "occurred_at",
    ]);
    closedGraph(input);
    // Authenticate the vault before accepting any caller-supplied evidence.
    storedSimulatedStreams(input.vault);
    if (typeof input.project_id !== "string" || input.project_id.length === 0
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || typeof input.occurred_at !== "string" || !task2IsRfc3339(input.occurred_at)) {
      fail("task6_input_shape_invalid");
    }
    assertRef(input.baseline_ref);
    const scopeRef = assertScope(input.proposed_scope);
    const evaluationRefValue = assertEvaluation(input.evaluation);
    const shadowRef = assertShadowResult(input.shadow_result);
    const decisionRef = assertDecision(input.decision);
    const storedEvaluation = task6InternalRequireEvaluationResult(input.vault, input.evaluation);
    const storedShadow = task6InternalRequireShadowResult(input.vault, input.shadow_result);
    const sealed = task6InternalRequireSealedReplayForEvaluation(input.vault, storedEvaluation);
    const shadowHandleId = task6InternalRequireShadowResultHandleId(input.vault, storedShadow);
    const evaluationPayload = storedEvaluation.evaluation_record.payload;
    const storedBaselineRef: Task6ObjectRef = {
      record_id: sealed.replay.baseline_profile.baseline_id,
      schema_id: "contentmd.expression-fit-baseline",
      schema_version: "0.1.0",
      content_digest: sealed.replay.baseline_profile.baseline_digest,
    };
    if (input.project_id !== input.proposed_scope.project_id
      || evaluationPayload.ranking_objective !== "expression_preference"
      || evaluationPayload.candidate_kind !== "expression"
      || sealed.handle.handle_id !== shadowHandleId
      || canonicalJson(input.proposed_scope) !== canonicalJson(sealed.replay.proposed_scope)
      || !refsEqual(scopeRef, input.decision.proposed_scope_ref)
      || !refsEqual(evaluationRefValue, input.decision.evaluation_ref)
      || !refsEqual(shadowRef, input.decision.shadow_result_ref)
      || !refsEqual(input.baseline_ref, evaluationPayload.baseline_ref)
      || !refsEqual(input.baseline_ref, storedBaselineRef)
      || !refsEqual(sealed.handle.model_ref, evaluationPayload.model_ref)
      || !storedEvaluation.evaluation_record.provenance.some((entry) =>
        entry.relationship === "proposed_binding_scope"
        && entry.record_id === scopeRef.record_id
        && entry.content_digest === scopeRef.content_digest)) {
      fail("task6_scope_mismatch");
    }
    const streamId = bindingStreamId(input.project_id, scopeRef);
    const existing = inspectSimulatedBinding(input.vault, streamId);
    if (existing?.projection_stage === "pending") fail("task6_transition_pending_readback");
    const currentHead = existing?.physical_head_digest ?? null;
    if (input.decision.expected_head_digest !== currentHead) fail("task6_stream_head_conflict");
    if (storedEvaluation.predicate.evaluation_passed !== true
      || storedEvaluation.predicate.promotion_ready_without_shadow_or_decision !== true
      || storedEvaluation.evaluation_record.payload.evaluation_state !== "passed"
      || storedShadow.completion_state !== "completed"
      || storedShadow.no_influence_verified !== true
      || input.decision.decision !== "approve_simulation") {
      fail("task6_promotion_predicate_failed");
    }
    const prior = existing ?? genesisProjection(streamId, input.baseline_ref);
    const proposed = promotionProposedProjection(prior, evaluationPayload.model_ref);
    const transitionEvidence: SimulatedPromotionEvidence = {
      kind: "promotion",
      baseline_ref: input.baseline_ref,
      model_ref: evaluationPayload.model_ref,
      evaluation_ref: evaluationRefValue,
      shadow_result_ref: shadowRef,
      decision_ref: decisionRef,
      proposed_scope_ref: scopeRef,
    };
    const transitionEvidenceDigest = sha256Canonical({
      contract_version: "contentmd.simulated-transition-evidence/0.1.0",
      evidence: transitionEvidence,
    });
    const transitionDigest = sha256Canonical({
      contract_version: "contentmd.simulated-binding-transition/0.1.0",
      binding_stream_id: streamId,
      transition_kind: "promotion",
      expected_head_digest: currentHead,
      prior_verified_projection_digest: prior.projection_digest,
      proposed_projection_digest: proposed.proposed_projection_digest,
      transition_evidence_digest: transitionEvidenceDigest,
      actor_ref: input.actor_ref,
      occurred_at: input.occurred_at,
    });
    const transitionId = `learning_transition.${transitionDigest.slice(0, 32)}`;
    const transactionStreamId = transitionStreamId(transitionId);
    const preparePayload: SimulatedTransitionPreparedPayload = {
      contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      phase: "prepare",
      transition_id: transitionId,
      transition_kind: "promotion",
      binding_stream_id: streamId,
      expected_binding_head_digest: currentHead,
      prior_verified_projection_digest: prior.projection_digest,
      proposed_projection_digest: proposed.proposed_projection_digest,
      transition_evidence_digest: transitionEvidenceDigest,
    };
    const prepareEvent = createLearningEvent(
      transactionStreamId,
      "transition_prepared",
      preparePayload,
      input.actor_ref,
      input.occurred_at,
      null,
    );
    const transactionStream: StoredTransitionStream = immutable({
      contract_version: "contentmd.stored-simulated-transition-stream/0.1.0",
      stream_id: transactionStreamId,
      transition_id: transitionId,
      transition_digest: transitionDigest,
      transition_evidence: transitionEvidence,
      proposed_projection: proposed,
      sealed_test_handle_id: sealed.handle.handle_id,
      evaluation_result: storedEvaluation,
      shadow_result: storedShadow,
      decision: input.decision,
      cause_value: null,
      events: [prepareEvent],
    });
    const beforePrepare = storedSimulatedStreams(input.vault);
    if (beforePrepare.some((stream) => stream.stream_id === transactionStreamId)) {
      fail("task6_event_append_failed");
    }
    task6InternalCommitStreams(
      input.vault,
      "binding_prepare",
      [...beforePrepare, transactionStream],
    );
    const afterPrepare = storedSimulatedStreams(input.vault);
    const prepared = transactionFor(afterPrepare, transitionId);
    if (canonicalJson(prepared) !== canonicalJson(transactionStream)) {
      fail("task6_event_readback_failed");
    }

    // Re-authenticate every prerequisite and the CAS head after the prepare
    // append. A prepared transaction never changes the binding projection.
    task6InternalRequireEvaluationResult(input.vault, storedEvaluation);
    task6InternalRequireShadowResult(input.vault, storedShadow);
    const afterPrepareProjection = inspectSimulatedBinding(input.vault, streamId);
    if (canonicalJson(afterPrepareProjection) !== canonicalJson(existing)) {
      fail("task6_stream_head_conflict");
    }
    const commitPayload: SimulatedPromotionCommitPayload = {
      contract_version: "contentmd.simulated-promotion-commit-payload/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      phase: "commit",
      transition_id: transitionId,
      transition_kind: "promotion",
      prepare_event_ref: eventRef(prepareEvent),
      expected_binding_head_digest: currentHead,
      prior_verified_projection_digest: prior.projection_digest,
      proposed_projection_digest: proposed.proposed_projection_digest,
      baseline_ref: input.baseline_ref,
      model_ref: evaluationPayload.model_ref,
      evaluation_ref: evaluationRefValue,
      shadow_result_ref: shadowRef,
      decision_ref: decisionRef,
      proposed_scope_ref: scopeRef,
    };
    const currentStreams = storedSimulatedStreams(input.vault);
    const bindingMatches = currentStreams.filter((stream): stream is StoredBindingStream =>
      stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
      && stream.stream_id === streamId);
    if (bindingMatches.length > 1) fail("task6_vault_invalid");
    const bindingBeforeCommit = bindingMatches[0] ?? immutable({
      contract_version: "contentmd.stored-simulated-binding-stream/0.1.0" as const,
      stream_id: streamId,
      events: [],
    });
    const predecessor = bindingBeforeCommit.events.at(-1) ?? null;
    if ((predecessor?.event_digest ?? null) !== currentHead) fail("task6_stream_head_conflict");
    const commitEvent = createLearningEvent(
      streamId,
      "binding_committed",
      commitPayload,
      input.actor_ref,
      input.occurred_at,
      predecessor,
    );
    const bindingAfterCommit: StoredBindingStream = immutable({
      ...bindingBeforeCommit,
      events: [...bindingBeforeCommit.events, commitEvent],
    });
    task6InternalCommitStreams(
      input.vault,
      "binding_commit",
      replaceStoredStream(currentStreams, bindingAfterCommit),
    );
    const pending = inspectSimulatedBinding(input.vault, streamId);
    if (pending === null || pending.projection_stage !== "pending"
      || pending.physical_head_digest !== commitEvent.event_digest
      || pending.pending_transition_id !== transitionId) {
      fail("task6_event_readback_failed");
    }

    const committedStreams = storedSimulatedStreams(input.vault);
    const committedBinding = committedStreams.find((stream): stream is StoredBindingStream =>
      stream.contract_version === "contentmd.stored-simulated-binding-stream/0.1.0"
      && stream.stream_id === streamId);
    if (committedBinding === undefined
      || committedBinding.events.at(-1)?.event_digest !== commitEvent.event_digest) {
      fail("task6_event_readback_failed");
    }
    const lineageDigest = completeLineageDigest(input.vault, prepared, committedBinding.events);
    const readbackPayload: SimulatedReadbackVerifiedPayload = {
      contract_version: "contentmd.simulated-readback-verified-payload/0.1.0",
      record_mode: "development_fixture",
      authority_effect: "none",
      phase: "readback",
      transition_id: transitionId,
      transition_kind: "promotion",
      prepare_event_ref: eventRef(prepareEvent),
      commit_event_ref: eventRef(commitEvent),
      expected_commit_digest: commitEvent.event_digest,
      observed_commit_digest: commitEvent.event_digest,
      proposed_projection_digest: proposed.proposed_projection_digest,
      complete_lineage_digest: lineageDigest,
    };
    const readbackEvent = createLearningEvent(
      streamId,
      "binding_readback_verified",
      readbackPayload,
      input.actor_ref,
      input.occurred_at,
      commitEvent,
    );
    const bindingAfterReadback: StoredBindingStream = immutable({
      ...committedBinding,
      events: [...committedBinding.events, readbackEvent],
    });
    task6InternalCommitStreams(
      input.vault,
      "binding_readback",
      replaceStoredStream(committedStreams, bindingAfterReadback),
    );
    const projection = inspectSimulatedBinding(input.vault, streamId);
    if (projection === null || projection.projection_stage !== "verified"
      || projection.verified_head_digest !== readbackEvent.event_digest
      || projection.physical_head_digest !== readbackEvent.event_digest) {
      fail("task6_event_readback_failed");
    }
    return issueTransitionResult(
      prepared,
      commitEvent,
      readbackEvent,
      projection,
      lineageDigest,
    );
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function createSimulatedPromotionDecision(
  input: CreateSimulatedPromotionDecisionInput,
): SimulatedPromotionDecision {
  try {
    modeGate(input, [
      "record_mode", "evaluation", "shadow_result", "proposed_scope", "actor_fixture_ref",
      "rationale", "decision", "expected_head_digest",
    ]);
    closedGraph(input);
    assertRef(input.actor_fixture_ref);
    if (typeof input.rationale !== "string" || input.rationale.trim().length === 0
      || (input.decision !== "approve_simulation" && input.decision !== "reject_simulation")
      || (input.expected_head_digest !== null && !DIGEST.test(input.expected_head_digest))) {
      fail("task6_input_shape_invalid");
    }
    const { result_digest: _evaluationDigest, ...evaluationSemantic } = input.evaluation;
    if (input.evaluation.result_digest !== sha256Canonical(evaluationSemantic)
      || !verifyRecordDigest(input.evaluation.evaluation_record).valid) {
      fail("task6_digest_invalid");
    }
    const {
      shadow_result_id: _shadowResultId,
      result_digest: _shadowDigest,
      ...shadowSemantic
    } = input.shadow_result;
    const shadowDigest = sha256Canonical(shadowSemantic);
    if (input.shadow_result.result_digest !== shadowDigest
      || input.shadow_result.shadow_result_id
        !== `shadow_result.${shadowDigest.slice(0, 32)}`) fail("task6_digest_invalid");
    const { scope_id: _scopeId, scope_digest: _scopeDigest, ...scopeSemantic } = input.proposed_scope;
    const scopeDigest = sha256Canonical(scopeSemantic);
    if (input.proposed_scope.scope_digest !== scopeDigest
      || input.proposed_scope.scope_id !== `proposed_binding_scope.${scopeDigest.slice(0, 32)}`) {
      fail("task6_digest_invalid");
    }
    const scopeRef = proposedScopeRef(input.proposed_scope);
    const scopeProvenance = input.evaluation.evaluation_record.provenance.filter((entry) =>
      entry.relationship === "proposed_binding_scope");
    if (scopeProvenance.length !== 1
      || scopeProvenance[0]!.record_id !== scopeRef.record_id
      || scopeProvenance[0]!.content_digest !== scopeRef.content_digest) {
      fail("task6_scope_mismatch");
    }
    const semantic = {
      contract_version: "contentmd.simulated-promotion-decision/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      evaluation_ref: evaluationRef(input.evaluation),
      shadow_result_ref: shadowResultRef(input.shadow_result),
      proposed_scope_ref: scopeRef,
      actor_fixture_ref: input.actor_fixture_ref,
      rationale: input.rationale,
      decision: input.decision,
      expected_head_digest: input.expected_head_digest,
    };
    const digest = sha256Canonical(semantic);
    return immutable({
      ...semantic,
      decision_id: `simulated_promotion_decision.${digest.slice(0, 32)}`,
      decision_digest: digest,
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}
