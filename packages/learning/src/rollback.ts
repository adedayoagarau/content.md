import {
  Task6GovernanceError,
  task6InternalReadStreams,
  type EvaluationSimulatorVault,
  type SimulatedCurrentnessWitness,
  type Task6RecordMode,
} from "./evaluation.js";
import {
  inspectSimulatedBinding,
  task6InternalRequireFallbackBaselineResult,
  task6InternalRequireRollbackResult,
  task6InternalSimulateFallbackBaseline,
  task6InternalSimulateRollback,
  type SimulatedBindingTransitionResult,
} from "./binding.js";
import type { Task6ObjectRef } from "./bootstrap.js";
import { task2IsRfc3339 } from "./feedback.js";
import type { RankingModelDependencies } from "./pairwise-logistic.js";
import type { RankingModelRecord } from "./records.js";

export interface RollbackTargetReplay {
  verified_binding_event_digest: string;
  model_record: RankingModelRecord;
  model_dependencies: RankingModelDependencies;
  currentness: SimulatedCurrentnessWitness;
}

export interface SimulateRollbackInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: string;
  requested_target_event_digest: string | null;
  ordered_target_replays: readonly RollbackTargetReplay[];
  fallback_baseline_ref: Task6ObjectRef;
  reason_code:
    | "operator_simulation"
    | "drift_suspension"
    | "lineage_revocation"
    | "currentness_failure"
    | "incident_recovery";
  actor_ref: string;
  occurred_at: string;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const STREAM_ID = /^learning_binding_sim\.[a-f0-9]{32}$/u;

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

export function simulateRollback(input: SimulateRollbackInput): SimulatedBindingTransitionResult {
  try {
    modeGate(input, [
      "record_mode", "vault", "binding_stream_id", "expected_head_digest",
      "requested_target_event_digest", "ordered_target_replays", "fallback_baseline_ref",
      "reason_code", "actor_ref", "occurred_at",
    ]);
    closedGraph(input);
    if (typeof input.binding_stream_id !== "string"
      || typeof input.expected_head_digest !== "string"
      || (input.requested_target_event_digest !== null
        && typeof input.requested_target_event_digest !== "string")
      || !Array.isArray(input.ordered_target_replays)
      || ![
        "operator_simulation", "drift_suspension", "lineage_revocation",
        "currentness_failure", "incident_recovery",
      ].includes(input.reason_code)
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || typeof input.occurred_at !== "string" || !task2IsRfc3339(input.occurred_at)) {
      fail("task6_input_shape_invalid");
    }

    // Authenticate the opaque, active vault before resolving supplied refs.
    task6InternalReadStreams(input.vault);
    if (!STREAM_ID.test(input.binding_stream_id)) fail("task6_reference_invalid");
    if (!DIGEST.test(input.expected_head_digest)
      || (input.requested_target_event_digest !== null
        && !DIGEST.test(input.requested_target_event_digest))) {
      fail("task6_digest_invalid");
    }
    assertRef(input.fallback_baseline_ref);

    const existingRollback = task6InternalRequireRollbackResult({
      vault: input.vault,
      binding_stream_id: input.binding_stream_id,
      expected_head_digest: input.expected_head_digest,
      requested_target_event_digest: input.requested_target_event_digest,
      ordered_target_replays: input.ordered_target_replays,
      reason_code: input.reason_code,
      actor_ref: input.actor_ref,
      occurred_at: input.occurred_at,
    });
    if (existingRollback !== null) {
      if (existingRollback.projection.baseline_ref === null
        || !refsEqual(existingRollback.projection.baseline_ref, input.fallback_baseline_ref)) {
        fail("task6_no_valid_rollback_target");
      }
      return existingRollback;
    }

    const existing = task6InternalRequireFallbackBaselineResult({
      vault: input.vault,
      binding_stream_id: input.binding_stream_id,
      expected_head_digest: input.expected_head_digest,
      fallback_baseline_ref: input.fallback_baseline_ref,
      requested_target_event_digest: input.requested_target_event_digest,
      ordered_target_replays: input.ordered_target_replays,
      reason_code: input.reason_code,
      actor_ref: input.actor_ref,
      occurred_at: input.occurred_at,
    });
    if (existing !== null) return existing;

    const projection = inspectSimulatedBinding(input.vault, input.binding_stream_id);
    if (projection === null) fail("task6_reference_invalid");
    if (projection.projection_stage === "pending") fail("task6_transition_pending_readback");
    if (projection.verified_head_digest !== input.expected_head_digest
      || projection.physical_head_digest !== input.expected_head_digest) {
      fail("task6_stream_head_conflict");
    }
    if ((projection.state !== "candidate" && projection.state !== "suspended")
      || projection.model_ref === null) {
      fail("task6_rollback_target_invalid");
    }
    if (projection.baseline_ref === null
      || !refsEqual(projection.baseline_ref, input.fallback_baseline_ref)) {
      fail("task6_no_valid_rollback_target");
    }
    if (input.ordered_target_replays.length > 0) {
      const rolledBack = task6InternalSimulateRollback({
        vault: input.vault,
        binding_stream_id: input.binding_stream_id,
        expected_head_digest: input.expected_head_digest,
        requested_target_event_digest: input.requested_target_event_digest,
        ordered_target_replays: input.ordered_target_replays,
        reason_code: input.reason_code,
        actor_ref: input.actor_ref,
        occurred_at: input.occurred_at,
      });
      if (rolledBack !== null) return rolledBack;
    }

    return task6InternalSimulateFallbackBaseline({
      vault: input.vault,
      binding_stream_id: input.binding_stream_id,
      expected_head_digest: input.expected_head_digest,
      fallback_baseline_ref: input.fallback_baseline_ref,
      requested_target_event_digest: input.requested_target_event_digest,
      ordered_target_replays: input.ordered_target_replays,
      reason_code: input.reason_code,
      actor_ref: input.actor_ref,
      occurred_at: input.occurred_at,
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}
