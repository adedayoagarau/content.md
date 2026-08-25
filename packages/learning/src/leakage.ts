import { createHash } from "node:crypto";
import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type MemoryScope,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import type { StoredEvent } from "@contentmd/memory";
import {
  Task2ContractError,
  task2CompareRfc3339Instants,
  task2DigestRef,
  task2IsRfc3339,
  task2RefsEqual,
  type RawUtf8Artifact,
  type VerificationReceiptRecord,
} from "./feedback.js";
import {
  qualifyFeedback,
  task2LineageLearningEligible,
  task2SnapshotRef,
  task2VerifySnapshotEnvelope,
  type CandidatePayload,
  type ContextPayload,
  type EvidenceSnapshot,
  type FeedbackQualificationInput,
  type StableSetPayload,
  type TaskPayload,
} from "./qualification.js";
import {
  determineLearningEligibility,
  type LearningEligibilityInput,
} from "./eligibility.js";
import {
  createPreferenceExample,
  type PreferenceExampleInput,
} from "./preference.js";
import {
  LEARNING_SCHEMA_IDS,
  type ArtifactRef,
  type DigestRef,
  type ExemplarRecord,
  type FeedbackQualificationRecord,
  type LeakageEdge,
  type LeakageGroupRecord,
  type LearningEligibilityRecord,
  type PreferenceExampleRecord,
} from "./records.js";
import {
  areNearDuplicates,
  normalizeForLeakage,
  scalarTrigramSet,
  verifyUnicodeArtifactBundle,
  type FrozenUnicodeArtifactWitness,
  type UnicodeArtifactBundle,
  type VerifiedUnicodeArtifactBundle,
} from "./unicode-normalization.js";

export type Split = "train" | "validation" | "test";
export type AllowedLearningSourceClass = "project_owned" | "project_owned_synthetic";
export type BlockingOnlySourceClass = "browser_observed" | "competitor" | "third_party";

export class Task3ContractError extends TypeError {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "Task3ContractError";
    this.code = code;
  }
}

export function task3FailContract(suffix: string): never {
  throw new Task3ContractError(`task3_contract_invalid:${suffix}`);
}

function translateUnicodeFailure<T>(operation: () => T): T {
  try {
    return operation();
  } catch (error) {
    const code = error !== null && typeof error === "object" && "code" in error
      ? String((error as { code: unknown }).code)
      : "";
    if (code === "task3_contract_invalid:unicode_artifact") task3FailContract("unicode_artifact");
    if (code === "task3_contract_invalid:unicode_scalar") task3FailContract("unicode_scalar");
    throw error;
  }
}

export function task3VerifyUnicodeBundle(bundle: UnicodeArtifactBundle): VerifiedUnicodeArtifactBundle {
  return translateUnicodeFailure(() => verifyUnicodeArtifactBundle(bundle));
}

export function task3NormalizeExpression(
  expression: string,
  bundle: UnicodeArtifactBundle | VerifiedUnicodeArtifactBundle,
): number[] {
  return translateUnicodeFailure(() => normalizeForLeakage(expression, bundle));
}

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const RECORD_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const MEMORY_SCOPES: readonly MemoryScope[] = ["task", "personal", "project", "organization", "public"];
const ALLOWED_SOURCE_CLASSES: readonly AllowedLearningSourceClass[] = ["project_owned", "project_owned_synthetic"];
export const FEATURE_SOURCE_ROLES = [
  "task",
  "context",
  "fact_set",
  "policy",
  "candidate_a",
  "candidate_b",
  "retrieval_snapshot",
  "approved_pattern",
  "approved_exemplar",
  "acceptance_criteria",
] as const;
export type FeatureSourceRole = (typeof FEATURE_SOURCE_ROLES)[number];

export const DECLARED_LEAKAGE_REASONS = [
  "message_lineage",
  "supersession",
  "task_family",
  "template_family",
  "source_occurrence",
  "locale_variant",
  "channel_variant",
] as const;
export type DeclaredLeakageReason = (typeof DECLARED_LEAKAGE_REASONS)[number];

const EDGE_REASON_ORDER = [...DECLARED_LEAKAGE_REASONS, "near_duplicate"] as const;

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function ownDataEntries(value: object): [string, unknown][] {
  return Reflect.ownKeys(value).flatMap((key): [string, unknown][] => {
    if (typeof key !== "string") task3FailContract("canonical_value");
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !("value" in descriptor)) task3FailContract("canonical_value");
    if (key !== "length" && !descriptor.enumerable) task3FailContract("canonical_value");
    return [[key, descriptor.value]];
  });
}

/** Descriptor-only graph walk. It deliberately never performs a property read. */
export function task3AssertCanonicalGraph(value: unknown): void {
  const ancestors = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current === "string" || typeof current === "boolean") return;
    if (typeof current === "number") {
      if (!Number.isFinite(current)) task3FailContract("canonical_value");
      return;
    }
    if (typeof current !== "object") task3FailContract("canonical_value");
    if (ancestors.has(current)) task3FailContract("canonical_value");
    const prototype = Object.getPrototypeOf(current);
    if (Array.isArray(current)) {
      if (prototype !== Array.prototype) task3FailContract("canonical_value");
      const descriptors = Object.getOwnPropertyDescriptors(current);
      for (let index = 0; index < current.length; index += 1) {
        const descriptor = descriptors[String(index)];
        if (descriptor === undefined || !("value" in descriptor) || !descriptor.enumerable) {
          task3FailContract("canonical_value");
        }
      }
      const expected = new Set(["length", ...Array.from({ length: current.length }, (_, index) => String(index))]);
      if (Reflect.ownKeys(current).some((key) => typeof key !== "string" || !expected.has(key))) {
        task3FailContract("canonical_value");
      }
      ancestors.add(current);
      try {
        for (let index = 0; index < current.length; index += 1) visit(descriptors[String(index)]!.value);
      } finally {
        ancestors.delete(current);
      }
      return;
    }
    if (prototype !== Object.prototype && prototype !== null) task3FailContract("canonical_value");
    ancestors.add(current);
    try {
      for (const [, child] of ownDataEntries(current)) visit(child);
    } finally {
      ancestors.delete(current);
    }
  };
  visit(value);
}

function assertExactKeys(value: unknown, keys: readonly string[], suffix = "input_shape"): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task3FailContract(suffix);
  const actual = Object.keys(value);
  if (actual.length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))) task3FailContract(suffix);
}

function task3TopLevelShape(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task3FailContract("input_shape");
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) task3FailContract("input_shape");
  const actual = Reflect.ownKeys(value);
  if (actual.length !== keys.length
    || actual.some((key) => typeof key !== "string")
    || keys.some((key) => !actual.includes(key))) task3FailContract("input_shape");
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      task3FailContract("input_shape");
    }
  }
}

function task3NestedObjectShape(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task3FailContract("input_shape");
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) task3FailContract("input_shape");
  const actual = Reflect.ownKeys(value);
  if (actual.length !== keys.length
    || actual.some((key) => typeof key !== "string")
    || keys.some((key) => !actual.includes(key))) task3FailContract("input_shape");
}

function task3Descriptor(value: unknown, key: string): PropertyDescriptor | undefined {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return undefined;
  return Object.getOwnPropertyDescriptor(value, key);
}

/** Top-level-only mode preflight. It never walks or reads a nested value. */
export function task3PreflightTopLevelRecordMode(value: unknown, keys: readonly string[]): void {
  task3TopLevelShape(value, keys);
  const descriptor = Object.getOwnPropertyDescriptor(value, "record_mode");
  if (descriptor === undefined || !("value" in descriptor)) return;
  if (descriptor.value === "official") task3FailContract("official_mode_not_supported");
  if (descriptor.value !== "development_fixture") task3FailContract("input_shape");
}

export function task3DescriptorDataValue(value: unknown, key: string): unknown | undefined {
  const descriptor = task3Descriptor(value, key);
  return descriptor !== undefined && "value" in descriptor ? descriptor.value : undefined;
}

export function task3PreflightDescriptorChildKeys(value: unknown, key: string, keys: readonly string[]): void {
  const descriptor = task3Descriptor(value, key);
  if (descriptor === undefined || !("value" in descriptor)) return;
  task3NestedObjectShape(descriptor.value, keys);
}

export function task3PreflightDescriptorArrayItemKeys(value: unknown, key: string, keys: readonly string[]): void {
  const property = task3Descriptor(value, key);
  if (property === undefined || !("value" in property)) return;
  const child = property.value;
  if (!Array.isArray(child)) task3FailContract("input_shape");
  if (Object.getPrototypeOf(child) !== Array.prototype) task3FailContract("input_shape");
  const descriptors = Object.getOwnPropertyDescriptors(child);
  const expectedKeys = new Set(["length", ...Array.from({ length: child.length }, (_, index) => String(index))]);
  if (Reflect.ownKeys(child).some((itemKey) => typeof itemKey !== "string" || !expectedKeys.has(itemKey))) {
    task3FailContract("input_shape");
  }
  for (let index = 0; index < child.length; index += 1) {
    const descriptor = descriptors[String(index)];
    if (descriptor === undefined || !("value" in descriptor)) continue;
    task3NestedObjectShape(descriptor.value, keys);
  }
}

interface Task3ShapeState { readonly seen: WeakSet<object> }

function task3ShapeState(): Task3ShapeState {
  return { seen: new WeakSet<object>() };
}

function task3ShapeObject(
  value: unknown,
  keys: readonly string[],
  state: Task3ShapeState,
  inspect?: (record: Record<string, unknown>, state: Task3ShapeState) => void,
): void {
  task3NestedObjectShape(value, keys);
  if (state.seen.has(value)) return;
  state.seen.add(value);
  inspect?.(value, state);
}

function task3ShapeUnionKeys(value: unknown, variants: readonly (readonly string[])[]): readonly string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task3FailContract("input_shape");
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) task3FailContract("input_shape");
  const actual = Reflect.ownKeys(value);
  if (actual.some((key) => typeof key !== "string")) task3FailContract("input_shape");
  const match = variants.find((keys) => actual.length === keys.length
    && keys.every((key) => actual.includes(key)));
  if (match === undefined) task3FailContract("input_shape");
  return match;
}

function task3ShapeDataChild(
  owner: Record<string, unknown>,
  key: string,
  inspect: (value: unknown) => void,
): void {
  const descriptor = Object.getOwnPropertyDescriptor(owner, key);
  if (descriptor !== undefined && "value" in descriptor) inspect(descriptor.value);
}

function task3ShapeArray(
  value: unknown,
  state: Task3ShapeState,
  inspect: (value: unknown, state: Task3ShapeState) => void,
): void {
  if (!Array.isArray(value) || Object.getPrototypeOf(value) !== Array.prototype) {
    task3FailContract("input_shape");
  }
  const ownKeys = Reflect.ownKeys(value);
  const expectedKeys = new Set(["length", ...Array.from({ length: value.length }, (_, index) => String(index))]);
  if (ownKeys.some((key) => typeof key !== "string" || !expectedKeys.has(key))
    || ownKeys.length !== expectedKeys.size) task3FailContract("input_shape");
  if (state.seen.has(value)) return;
  state.seen.add(value);
  const descriptors = Object.getOwnPropertyDescriptors(value);
  for (let index = 0; index < value.length; index += 1) {
    const descriptor = descriptors[String(index)];
    if (descriptor === undefined) task3FailContract("input_shape");
    if ("value" in descriptor) inspect(descriptor.value, state);
  }
}

function task3ShapeArrayChild(
  owner: Record<string, unknown>,
  key: string,
  state: Task3ShapeState,
  inspect: (value: unknown, state: Task3ShapeState) => void,
): void {
  task3ShapeDataChild(owner, key, (value) => task3ShapeArray(value, state, inspect));
}

function task3ShapeTextArray(value: unknown, state: Task3ShapeState): void {
  task3ShapeArray(value, state, (entry) => {
    if (typeof entry !== "string" || entry.length === 0) task3FailContract("input_shape");
  });
}

function task3ShapeDigestRef(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["record_id", "schema_id", "schema_version", "content_digest"], state);
}

function task3ShapeArtifactRef(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["artifact_id", "artifact_version", "artifact_digest"], state);
}

function task3ShapeRawArtifact(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["path", "bytes_utf8", "raw_bytes_digest"], state);
}

function task3ShapeScope(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["memory_scope", "project_id", "resource_refs", "data_classes"], state,
    (scope, current) => {
      task3ShapeDataChild(scope, "resource_refs", (refs) => task3ShapeTextArray(refs, current));
      task3ShapeDataChild(scope, "data_classes", (classes) => task3ShapeTextArray(classes, current));
    });
}

function task3ShapeProvenance(value: unknown, state: Task3ShapeState): void {
  task3ShapeArray(value, state, (entry, current) => {
    task3ShapeObject(entry, ["record_id", "relationship", "content_digest"], current);
  });
}

function task3ShapeVerificationReceipt(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ], state, (receipt, current) => {
    task3ShapeDataChild(receipt, "scope", (scope) => task3ShapeScope(scope, current));
    task3ShapeDataChild(receipt, "provenance", (provenance) => task3ShapeProvenance(provenance, current));
    task3ShapeDataChild(receipt, "payload", (payload) => task3ShapeObject(payload, [
      "transaction_ref", "target_path", "expected_digest", "observed_digest",
      "status", "verified_at", "method",
    ], current));
  });
}

export function task3PreflightDescriptorProvenance(value: unknown): void {
  task3PreflightDescriptorArrayItemKeys(value, "provenance", [
    "record_id", "relationship", "content_digest",
  ]);
}

function task3ShapeProducer(value: unknown, state: Task3ShapeState, topLevel: boolean): void {
  const keys = [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ] as const;
  if (topLevel) task3TopLevelShape(value, keys);
  else task3NestedObjectShape(value, keys);
  if (state.seen.has(value as object)) return;
  state.seen.add(value as object);
  const producer = value as Record<string, unknown>;
  task3ShapeDataChild(producer, "schema_artifact", (artifact) => task3ShapeRawArtifact(artifact, state));
  task3ShapeArrayChild(producer, "source_artifacts", state, task3ShapeRawArtifact);
  task3ShapeDataChild(producer, "verification_receipt", (receipt) => {
    if (receipt !== null) task3ShapeVerificationReceipt(receipt, state);
  });
}

/** Descriptor-only closed-shape pass for a producer and its optional receipt. */
export function task3PreflightProducerShape(value: unknown, topLevel = false): void {
  task3ShapeProducer(value, task3ShapeState(), topLevel);
}

const TASK3_DURABLE_KEYS = [
  "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
  "lifecycle_state", "payload", "content_digest",
] as const;
const TASK2_SNAPSHOT_KEYS = [
  "contract_version", "snapshot_id", "snapshot_kind", "snapshot_version", "captured_at",
  "verification_mode", "verification_receipt", "source_refs", "payload", "snapshot_digest",
] as const;
const TASK2_SHARED_PAYLOAD_KEYS = [
  "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
  "code_digest", "input_digest", "authority_effect",
] as const;

function task3ShapeRefArray(value: unknown, state: Task3ShapeState): void {
  task3ShapeArray(value, state, task3ShapeDigestRef);
}

function task3ShapeArtifactArray(value: unknown, state: Task3ShapeState): void {
  task3ShapeArray(value, state, task3ShapeArtifactRef);
}

function task3ShapeDurable(
  value: unknown,
  payloadKeys: readonly string[],
  state: Task3ShapeState,
  inspectPayload?: (payload: Record<string, unknown>, state: Task3ShapeState) => void,
): void {
  task3ShapeObject(value, TASK3_DURABLE_KEYS, state, (record, current) => {
    task3ShapeDataChild(record, "scope", (scope) => task3ShapeScope(scope, current));
    task3ShapeDataChild(record, "provenance", (provenance) => task3ShapeProvenance(provenance, current));
    task3ShapeDataChild(record, "payload", (payload) => {
      task3ShapeObject(payload, payloadKeys, current, inspectPayload);
    });
  });
}

function task3ShapeTask2Producer(value: unknown, state: Task3ShapeState): void {
  task3ShapeProducer(value, state, false);
}

function task3ShapeTask2Event(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "event_id", "stream_id", "sequence", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "payload", "predecessor_digest", "event_digest",
  ], state, (event, current) => {
    task3ShapeDataChild(event, "payload", (payload) => task3ShapeObject(payload, [
      "schema_version", "decision_id", "status", "actor_ref", "actor_role", "rationale",
      "proposal_ref", "selected_expression", "edited_expression", "evidence_reviewed",
      "scope", "project_id", "occurred_at", "mutation_approval_effect",
    ], current, (eventPayload, eventState) => {
      task3ShapeDataChild(eventPayload, "evidence_reviewed", (evidence) => task3ShapeTextArray(evidence, eventState));
    }));
  });
}

function task3ShapeTask2Proposal(value: unknown, state: Task3ShapeState): void {
  task3ShapeDurable(value, [
    "task_packet_ref", "operation", "alternatives", "evidence_refs", "pattern_refs", "tradeoffs",
  ], state, (payload, current) => {
    for (const key of ["alternatives", "evidence_refs", "pattern_refs", "tradeoffs"] as const) {
      task3ShapeDataChild(payload, key, (items) => task3ShapeTextArray(items, current));
    }
  });
}

function task3ShapeTask2Decision(value: unknown, state: Task3ShapeState): void {
  task3ShapeDurable(value, [
    "proposal_ref", "status", "actor_role", "rationale", "selected_expression",
    "evidence_reviewed", "decided_at",
  ], state, (payload, current) => {
    task3ShapeDataChild(payload, "evidence_reviewed", (items) => task3ShapeTextArray(items, current));
  });
}

function task3ShapeTask2Boundary(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "event_id", "event_digest", "decision_ref",
    "producer_manifest_digest", "boundary_digest",
  ], state, (boundary, current) => {
    task3ShapeDataChild(boundary, "decision_ref", (ref) => task3ShapeDigestRef(ref, current));
  });
}

function task3ShapeTask2SnapshotPayload(
  payload: unknown,
  kind: string,
  state: Task3ShapeState,
): void {
  const refChild = (record: Record<string, unknown>, key: string, current: Task3ShapeState): void => {
    task3ShapeDataChild(record, key, (ref) => task3ShapeDigestRef(ref, current));
  };
  const refArrayChild = (record: Record<string, unknown>, key: string, current: Task3ShapeState): void => {
    task3ShapeDataChild(record, key, (refs) => task3ShapeRefArray(refs, current));
  };
  if (kind === "fact-set" || kind === "review-policy") {
    task3ShapeObject(payload, ["item_refs", "set_digest", "state"], state, (record, current) => {
      refArrayChild(record, "item_refs", current);
    });
    return;
  }
  if (kind === "context") {
    task3ShapeObject(payload, [
      "context_key", "product_area", "journey_state", "channel", "locale", "surface",
      "audience", "content_slot",
    ], state);
    return;
  }
  if (kind === "task") {
    task3ShapeObject(payload, [
      "task_key", "fact_set_ref", "policy_ref", "context_ref", "requirements_digest",
      "content_slot", "ranking_objective", "candidate_kind",
    ], state, (record, current) => {
      for (const key of ["fact_set_ref", "policy_ref", "context_ref"] as const) refChild(record, key, current);
    });
    return;
  }
  if (kind === "candidate") {
    task3ShapeObject(payload, [
      "task_ref", "context_ref", "content_slot", "author_refs", "expression", "expression_digest",
    ], state, (record, current) => {
      refChild(record, "task_ref", current);
      refChild(record, "context_ref", current);
      refArrayChild(record, "author_refs", current);
    });
    return;
  }
  if (kind === "review-rubric") {
    task3ShapeObject(payload, [
      "artifact_ref", "ranking_objective", "candidate_kind", "allowed_outcomes",
      "requires_blinding", "requires_randomization", "requires_rationale", "stable_dimensions", "status",
    ], state, (record, current) => {
      task3ShapeDataChild(record, "artifact_ref", (ref) => task3ShapeArtifactRef(ref, current));
      task3ShapeDataChild(record, "allowed_outcomes", (items) => task3ShapeTextArray(items, current));
      task3ShapeDataChild(record, "stable_dimensions", (items) => task3ShapeTextArray(items, current));
    });
    return;
  }
  if (kind === "reviewer-set") {
    task3ShapeObject(payload, ["entries", "set_digest"], state, (record, current) => {
      task3ShapeArrayChild(record, "entries", current, (entry, entryState) => {
        task3ShapeObject(entry, [
          "reviewer_ref", "role", "qualified_objectives", "authorized_scopes",
          "independent_of_candidate_authorship", "independence_evidence_refs", "conflict_state",
          "qualification_status", "effective_at", "expires_at",
        ], entryState, (reviewer, reviewerState) => {
          refChild(reviewer, "reviewer_ref", reviewerState);
          task3ShapeDataChild(reviewer, "qualified_objectives", (items) => task3ShapeTextArray(items, reviewerState));
          task3ShapeDataChild(reviewer, "authorized_scopes", (items) => task3ShapeTextArray(items, reviewerState));
          refArrayChild(reviewer, "independence_evidence_refs", reviewerState);
        });
      });
    });
    return;
  }
  if (kind === "presentation") {
    task3ShapeObject(payload, [
      "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "canonical_order",
      "presented_order", "comparison_kind", "original_proposal_side", "blinding_proof",
      "randomization_proof", "fact_set_ref", "policy_ref", "requirements_digest",
    ], state, (record, current) => {
      for (const key of [
        "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "fact_set_ref", "policy_ref",
      ] as const) refChild(record, key, current);
      task3ShapeDataChild(record, "canonical_order", (items) => task3ShapeTextArray(items, current));
      task3ShapeDataChild(record, "presented_order", (items) => task3ShapeTextArray(items, current));
      task3ShapeDataChild(record, "blinding_proof", (proof) => task3ShapeObject(proof, [
        "status", "reviewer_refs", "hidden_fields", "evidence_refs",
      ], current, (blinding, proofState) => {
        refArrayChild(blinding, "reviewer_refs", proofState);
        task3ShapeDataChild(blinding, "hidden_fields", (items) => task3ShapeTextArray(items, proofState));
        refArrayChild(blinding, "evidence_refs", proofState);
      }));
      task3ShapeDataChild(record, "randomization_proof", (proof) => task3ShapeObject(proof, [
        "status", "algorithm", "seed_commitment_digest", "assignment_digest", "evidence_refs",
      ], current, (randomization, proofState) => {
        refArrayChild(randomization, "evidence_refs", proofState);
      }));
    });
    return;
  }
  if (kind === "pairwise-review") {
    task3ShapeObject(payload, [
      "decision_ref", "presentation_ref", "reviewer_set_ref", "reviewer_refs", "rubric_ref",
      "outcome", "rationale_codes", "conflict_state", "observed_fact_set_ref",
      "observed_policy_ref", "observed_task_ref", "observed_context_ref", "observed_requirements_digest",
    ], state, (record, current) => {
      for (const key of [
        "decision_ref", "presentation_ref", "reviewer_set_ref", "observed_fact_set_ref",
        "observed_policy_ref", "observed_task_ref", "observed_context_ref",
      ] as const) refChild(record, key, current);
      refArrayChild(record, "reviewer_refs", current);
      task3ShapeDataChild(record, "rubric_ref", (ref) => task3ShapeArtifactRef(ref, current));
      task3ShapeDataChild(record, "rationale_codes", (items) => task3ShapeTextArray(items, current));
    });
    return;
  }
  if (kind === "candidate-lineage") {
    task3ShapeObject(payload, ["candidate_ref", "nodes", "transitive_complete"], state,
      (record, current) => {
        refChild(record, "candidate_ref", current);
        task3ShapeArrayChild(record, "nodes", current, (node, nodeState) => {
          task3ShapeObject(node, ["subject_ref", "parent_refs", "source_class", "rights_state"], nodeState,
            (lineage, lineageState) => {
              refChild(lineage, "subject_ref", lineageState);
              refArrayChild(lineage, "parent_refs", lineageState);
            });
        });
      });
    return;
  }
  if (kind === "adjudication") {
    task3ShapeObject(payload, [
      "review_ref", "adjudicator_ref", "disposition", "rationale_codes", "status",
    ], state, (record, current) => {
      refChild(record, "review_ref", current);
      refChild(record, "adjudicator_ref", current);
      task3ShapeDataChild(record, "rationale_codes", (items) => task3ShapeTextArray(items, current));
    });
    return;
  }
  if (kind === "learning-policy") {
    task3ShapeObject(payload, [
      "policy_ref", "status", "ranking_objective", "candidate_kind", "allowed_memory_scopes",
      "allowed_scope_transitions", "minimum_independent_reviewers", "allowed_lineage_classes",
      "required_checks", "edited_content_requires_unchanged_facts_requirements_context",
    ], state, (record, current) => {
      refChild(record, "policy_ref", current);
      for (const key of ["allowed_memory_scopes", "allowed_lineage_classes", "required_checks"] as const) {
        task3ShapeDataChild(record, key, (items) => task3ShapeTextArray(items, current));
      }
      task3ShapeArrayChild(record, "allowed_scope_transitions", current, (transition, transitionState) => {
        task3ShapeObject(transition, ["from", "to"], transitionState);
      });
      task3ShapeDataChild(record, "minimum_independent_reviewers", (minimums) => {
        task3ShapeObject(minimums, ["task", "personal", "project", "organization", "public"], current);
      });
    });
    return;
  }
  if (kind === "learning-permission") {
    task3ShapeObject(payload, [
      "permission_ref", "permission_class", "status", "revocation_state", "ranking_objective",
      "candidate_kind", "allowed_memory_scopes", "project_ids", "subject_refs", "issued_at", "expires_at",
    ], state, (record, current) => {
      refChild(record, "permission_ref", current);
      task3ShapeDataChild(record, "allowed_memory_scopes", (items) => task3ShapeTextArray(items, current));
      task3ShapeDataChild(record, "project_ids", (items) => task3ShapeTextArray(items, current));
      refArrayChild(record, "subject_refs", current);
    });
    return;
  }
  if (kind === "eligibility-checks") {
    task3ShapeObject(payload, [
      "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref",
      "candidate_b_ref", "target_memory_scope", "project_id", "evaluated_at",
      "rights", "privacy", "factual", "policy", "incident", "context",
    ], state, (record, current) => {
      for (const key of [
        "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref",
      ] as const) refChild(record, key, current);
      for (const key of ["rights", "privacy", "factual", "policy", "incident", "context"] as const) {
        task3ShapeDataChild(record, key, (check) => task3ShapeObject(check, [
          "state", "evidence_refs", "rationale_codes",
        ], current, (checkRecord, checkState) => {
          refArrayChild(checkRecord, "evidence_refs", checkState);
          task3ShapeDataChild(checkRecord, "rationale_codes", (items) => task3ShapeTextArray(items, checkState));
        }));
      }
    });
    return;
  }
  if (["retrieval", "approved-pattern", "acceptance-criteria"].includes(kind)) {
    task3ShapeObject(payload, [
      "contract_version", "feature_role", "project_id", "source_class", "rights_state",
      "permission_snapshot_ref", "eligibility_checks_snapshot_ref", "ordered_feature_refs", "constraint",
      "state", "content_form", "set_digest",
    ], state, (record, current) => {
      refChild(record, "permission_snapshot_ref", current);
      refChild(record, "eligibility_checks_snapshot_ref", current);
      refArrayChild(record, "ordered_feature_refs", current);
      task3ShapeDataChild(record, "constraint", (constraint) => {
        const kindDescriptor = task3DescriptorDataValue(constraint, "constraint_kind");
        const keys = kindDescriptor === "grapheme_count"
          ? ["constraint_kind", "minimum", "maximum"]
          : ["constraint_kind"];
        task3ShapeObject(constraint, keys, current);
      });
    });
    return;
  }
  task3FailContract("input_shape");
}

const TASK2_SNAPSHOT_PAYLOAD_SHAPES = [
  { kind: "fact-set", keys: ["item_refs", "set_digest", "state"] },
  {
    kind: "context",
    keys: [
      "context_key", "product_area", "journey_state", "channel", "locale", "surface",
      "audience", "content_slot",
    ],
  },
  {
    kind: "task",
    keys: [
      "task_key", "fact_set_ref", "policy_ref", "context_ref", "requirements_digest",
      "content_slot", "ranking_objective", "candidate_kind",
    ],
  },
  {
    kind: "candidate",
    keys: ["task_ref", "context_ref", "content_slot", "author_refs", "expression", "expression_digest"],
  },
  {
    kind: "review-rubric",
    keys: [
      "artifact_ref", "ranking_objective", "candidate_kind", "allowed_outcomes",
      "requires_blinding", "requires_randomization", "requires_rationale", "stable_dimensions", "status",
    ],
  },
  { kind: "reviewer-set", keys: ["entries", "set_digest"] },
  {
    kind: "presentation",
    keys: [
      "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "canonical_order",
      "presented_order", "comparison_kind", "original_proposal_side", "blinding_proof",
      "randomization_proof", "fact_set_ref", "policy_ref", "requirements_digest",
    ],
  },
  {
    kind: "pairwise-review",
    keys: [
      "decision_ref", "presentation_ref", "reviewer_set_ref", "reviewer_refs", "rubric_ref",
      "outcome", "rationale_codes", "conflict_state", "observed_fact_set_ref",
      "observed_policy_ref", "observed_task_ref", "observed_context_ref", "observed_requirements_digest",
    ],
  },
  { kind: "candidate-lineage", keys: ["candidate_ref", "nodes", "transitive_complete"] },
  { kind: "adjudication", keys: ["review_ref", "adjudicator_ref", "disposition", "rationale_codes", "status"] },
  {
    kind: "learning-policy",
    keys: [
      "policy_ref", "status", "ranking_objective", "candidate_kind", "allowed_memory_scopes",
      "allowed_scope_transitions", "minimum_independent_reviewers", "allowed_lineage_classes",
      "required_checks", "edited_content_requires_unchanged_facts_requirements_context",
    ],
  },
  {
    kind: "learning-permission",
    keys: [
      "permission_ref", "permission_class", "status", "revocation_state", "ranking_objective",
      "candidate_kind", "allowed_memory_scopes", "project_ids", "subject_refs", "issued_at", "expires_at",
    ],
  },
  {
    kind: "eligibility-checks",
    keys: [
      "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref",
      "candidate_b_ref", "target_memory_scope", "project_id", "evaluated_at",
      "rights", "privacy", "factual", "policy", "incident", "context",
    ],
  },
  {
    kind: "retrieval",
    keys: [
      "contract_version", "feature_role", "project_id", "source_class", "rights_state",
      "permission_snapshot_ref", "eligibility_checks_snapshot_ref", "ordered_feature_refs", "constraint",
      "state", "content_form", "set_digest",
    ],
  },
] as const;

function task3ShapeTask2SnapshotByShape(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, TASK2_SNAPSHOT_KEYS, state, (snapshot, current) => {
    task3ShapeDataChild(snapshot, "verification_receipt", (receipt) => {
      if (receipt !== null) task3ShapeVerificationReceipt(receipt, current);
    });
    task3ShapeDataChild(snapshot, "source_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeDataChild(snapshot, "payload", (payload) => {
      const keys = task3ShapeUnionKeys(payload, TASK2_SNAPSHOT_PAYLOAD_SHAPES.map((shape) => shape.keys));
      const shape = TASK2_SNAPSHOT_PAYLOAD_SHAPES.find((candidate) => candidate.keys === keys);
      if (shape === undefined) task3FailContract("input_shape");
      task3ShapeTask2SnapshotPayload(payload, shape.kind, current);
    });
  });
}

function task3ShapeTask2Snapshot(
  value: unknown,
  expectedKind: string,
  state: Task3ShapeState,
): void {
  task3ShapeObject(value, TASK2_SNAPSHOT_KEYS, state, (snapshot, current) => {
    const kind = task3DescriptorDataValue(snapshot, "snapshot_kind");
    if (kind !== undefined && kind !== expectedKind) task3FailContract("input_shape");
    task3ShapeDataChild(snapshot, "verification_receipt", (receipt) => {
      if (receipt !== null) task3ShapeVerificationReceipt(receipt, current);
    });
    task3ShapeDataChild(snapshot, "source_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeDataChild(snapshot, "payload", (payload) => {
      task3ShapeTask2SnapshotPayload(payload, expectedKind, current);
    });
  });
}

function task3ShapeTask2QualificationRecord(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "decision_ref", "rubric_ref", "reviewer_qualification_ref",
    "fact_set_ref", "policy_ref", "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref",
    "presentation_ref", "blinded", "randomized", "rationale_codes", "outcome", "conflict_state",
    "adjudication_ref", "facts_changed", "requirements_changed", "context_changed",
    "qualification_state", "reason_codes",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    for (const key of [
      "decision_ref", "reviewer_qualification_ref", "fact_set_ref", "policy_ref", "task_ref",
      "context_ref", "candidate_a_ref", "candidate_b_ref", "presentation_ref",
    ] as const) task3ShapeDataChild(payload, key, (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(payload, "rubric_ref", (ref) => task3ShapeArtifactRef(ref, current));
    task3ShapeDataChild(payload, "adjudication_ref", (ref) => {
      if (ref !== null) task3ShapeDigestRef(ref, current);
    });
    task3ShapeDataChild(payload, "rationale_codes", (items) => task3ShapeTextArray(items, current));
    task3ShapeDataChild(payload, "reason_codes", (items) => task3ShapeTextArray(items, current));
  });
}

function task3ShapeTask2EligibilityRecord(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "qualification_ref", "decision_ref", "learning_policy_ref",
    "permission_ref", "target_memory_scope", "rights_check", "privacy_check", "factual_check",
    "policy_check", "incident_check", "context_check", "eligibility_state", "reason_codes",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    for (const key of ["qualification_ref", "decision_ref", "learning_policy_ref"] as const) {
      task3ShapeDataChild(payload, key, (ref) => task3ShapeDigestRef(ref, current));
    }
    task3ShapeDataChild(payload, "permission_ref", (ref) => {
      if (ref !== null) task3ShapeDigestRef(ref, current);
    });
    task3ShapeDataChild(payload, "reason_codes", (items) => task3ShapeTextArray(items, current));
  });
}

function task3ShapeTask2PreferenceRecord(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "qualification_ref", "eligibility_ref", "task_ref", "context_ref",
    "candidate_a_ref", "candidate_b_ref", "presented_order", "preferred_side", "label",
    "presentation_digest", "feature_source_checkpoint_set_ref", "preference_state",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    for (const key of [
      "qualification_ref", "eligibility_ref", "task_ref", "context_ref", "candidate_a_ref",
      "candidate_b_ref", "feature_source_checkpoint_set_ref",
    ] as const) task3ShapeDataChild(payload, key, (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(payload, "presented_order", (items) => task3ShapeTextArray(items, current));
  });
}

function task3ShapeTask2QualificationInput(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "record_mode", "evaluation_at", "producer", "decision_event", "proposal", "decision",
    "decision_boundary", "review", "rubric", "reviewer_set", "fact_set", "policy", "task",
    "context", "candidate_a", "candidate_b", "presentation", "lineage_a", "lineage_b", "adjudication",
  ], state, (input, current) => {
    task3ShapeDataChild(input, "producer", (producer) => task3ShapeTask2Producer(producer, current));
    task3ShapeDataChild(input, "decision_event", (event) => task3ShapeTask2Event(event, current));
    task3ShapeDataChild(input, "proposal", (proposal) => task3ShapeTask2Proposal(proposal, current));
    task3ShapeDataChild(input, "decision", (decision) => task3ShapeTask2Decision(decision, current));
    task3ShapeDataChild(input, "decision_boundary", (boundary) => task3ShapeTask2Boundary(boundary, current));
    for (const [key, kind] of [
      ["review", "pairwise-review"], ["rubric", "review-rubric"], ["reviewer_set", "reviewer-set"],
      ["fact_set", "fact-set"], ["policy", "review-policy"], ["task", "task"], ["context", "context"],
      ["candidate_a", "candidate"], ["candidate_b", "candidate"], ["presentation", "presentation"],
      ["lineage_a", "candidate-lineage"], ["lineage_b", "candidate-lineage"],
    ] as const) {
      task3ShapeDataChild(input, key, (snapshot) => task3ShapeTask2Snapshot(snapshot, kind, current));
    }
    task3ShapeDataChild(input, "adjudication", (snapshot) => {
      if (snapshot !== null) task3ShapeTask2Snapshot(snapshot, "adjudication", current);
    });
  });
}

function task3ShapeTask2EligibilityInput(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "record_mode", "evaluation_at", "producer", "qualification", "qualification_input", "decision",
    "learning_policy", "permission", "checks", "lineage_a", "lineage_b", "reviewer_set",
    "target_memory_scope",
  ], state, (input, current) => {
    task3ShapeDataChild(input, "producer", (producer) => task3ShapeTask2Producer(producer, current));
    task3ShapeDataChild(input, "qualification", (record) => task3ShapeTask2QualificationRecord(record, current));
    task3ShapeDataChild(input, "qualification_input", (nested) => task3ShapeTask2QualificationInput(nested, current));
    task3ShapeDataChild(input, "decision", (record) => task3ShapeTask2Decision(record, current));
    for (const [key, kind] of [
      ["learning_policy", "learning-policy"], ["checks", "eligibility-checks"],
      ["lineage_a", "candidate-lineage"], ["lineage_b", "candidate-lineage"],
      ["reviewer_set", "reviewer-set"],
    ] as const) {
      task3ShapeDataChild(input, key, (snapshot) => task3ShapeTask2Snapshot(snapshot, kind, current));
    }
    task3ShapeDataChild(input, "permission", (snapshot) => {
      if (snapshot !== null) task3ShapeTask2Snapshot(snapshot, "learning-permission", current);
    });
  });
}

function task3ShapeTask2PreferenceInput(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "record_mode", "evaluation_at", "producer", "qualification", "eligibility", "eligibility_input",
    "decision", "task", "context", "candidate_a", "candidate_b", "presentation",
    "feature_source_checkpoint_set_ref",
  ], state, (input, current) => {
    task3ShapeDataChild(input, "producer", (producer) => task3ShapeTask2Producer(producer, current));
    task3ShapeDataChild(input, "qualification", (record) => task3ShapeTask2QualificationRecord(record, current));
    task3ShapeDataChild(input, "eligibility", (record) => task3ShapeTask2EligibilityRecord(record, current));
    task3ShapeDataChild(input, "eligibility_input", (nested) => task3ShapeTask2EligibilityInput(nested, current));
    task3ShapeDataChild(input, "decision", (record) => task3ShapeTask2Decision(record, current));
    for (const [key, kind] of [
      ["task", "task"], ["context", "context"], ["candidate_a", "candidate"],
      ["candidate_b", "candidate"], ["presentation", "presentation"],
    ] as const) {
      task3ShapeDataChild(input, key, (snapshot) => task3ShapeTask2Snapshot(snapshot, kind, current));
    }
    task3ShapeDataChild(input, "feature_source_checkpoint_set_ref", (ref) => task3ShapeDigestRef(ref, current));
  });
}

function task3ShapeStoreArtifact(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"], state,
    (artifact, current) => {
      task3ShapeDataChild(artifact, "artifact_ref", (ref) => task3ShapeArtifactRef(ref, current));
    });
}

function task3ShapeStoreBinding(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "binding_id", "store_kind", "project_id", "store_instance_id",
    "instance_nonce_digest", "store_schema", "runtime_profile", "binding_digest",
  ], state, (binding, current) => {
    task3ShapeDataChild(binding, "store_schema", (artifact) => task3ShapeStoreArtifact(artifact, current));
    task3ShapeDataChild(binding, "runtime_profile", (artifact) => task3ShapeStoreArtifact(artifact, current));
  });
}

function task3ShapeExemplarRecord(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "exemplar_kind", "subject_ref", "approval_ref",
    "applicability_scope_ref", "transfer_condition_refs", "prohibited_transfer", "rights_ref",
    "permission_ref", "currentness_state", "exemplar_state",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    for (const key of [
      "subject_ref", "approval_ref", "applicability_scope_ref", "rights_ref", "permission_ref",
    ] as const) task3ShapeDataChild(payload, key, (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(payload, "transfer_condition_refs", (refs) => task3ShapeRefArray(refs, current));
  });
}

function task3ShapeFeatureMaterial(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["material_kind", "source_ref", "value"], state, (material, current) => {
    task3ShapeDataChild(material, "source_ref", (ref) => task3ShapeDigestRef(ref, current));
    const materialKind = task3DescriptorDataValue(material, "material_kind");
    task3ShapeDataChild(material, "value", (nested) => {
      if (materialKind === "durable_record") {
        task3ShapeExemplarRecord(nested, current);
        return;
      }
      if (materialKind === "task2_evidence_snapshot") {
        const snapshotKind = task3DescriptorDataValue(nested, "snapshot_kind");
        if (typeof snapshotKind !== "string") {
          if (snapshotKind !== undefined) task3FailContract("input_shape");
          task3ShapeTask2SnapshotByShape(nested, current);
          return;
        }
        task3ShapeTask2Snapshot(nested, snapshotKind, current);
        return;
      }
      if (materialKind !== undefined) task3FailContract("input_shape");
      const keys = task3ShapeUnionKeys(nested, [TASK3_DURABLE_KEYS, TASK2_SNAPSHOT_KEYS]);
      if (keys === TASK3_DURABLE_KEYS) task3ShapeExemplarRecord(nested, current);
      else task3ShapeTask2SnapshotByShape(nested, current);
    });
  });
}

function task3ShapeFeatureEvent(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "event_id", "stream_id", "sequence", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "payload", "predecessor_digest", "event_digest",
  ], state, (event, current) => {
    task3ShapeDataChild(event, "payload", (payload) => task3ShapeObject(payload, [
      "contract_version", "project_id", "source_ref", "source_role", "source_class", "rights_state",
    ], current, (eventPayload, payloadState) => {
      task3ShapeDataChild(eventPayload, "source_ref", (ref) => task3ShapeDigestRef(ref, payloadState));
    }));
  });
}

function task3ShapeFeatureManifestEntry(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "source_ref", "source_role", "source_class", "rights_state", "material", "stream_id",
    "event_id", "sequence", "event_digest", "event",
  ], state, (entry, current) => {
    task3ShapeDataChild(entry, "source_ref", (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(entry, "material", (material) => task3ShapeFeatureMaterial(material, current));
    task3ShapeDataChild(entry, "event", (event) => task3ShapeFeatureEvent(event, current));
  });
}

function task3ShapeFeatureManifest(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["contract_version", "manifest_id", "project_id", "entries", "manifest_digest"], state,
    (manifest, current) => {
      task3ShapeArrayChild(manifest, "entries", current, task3ShapeFeatureManifestEntry);
    });
}

function task3ShapeStreamReceipt(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "store_binding_digest", "stream_id", "maximum_sequence", "head_event_id",
    "head_event_digest", "prefix_digest", "feature_source_manifest_digest", "verification_method",
    "verified_at", "receipt_digest",
  ], state);
}

function task3ShapeStreamCheckpoint(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "stream_id", "maximum_sequence", "head_event_id", "head_event_digest", "complete_prefix",
    "prefix_digest", "receipt",
  ], state, (stream, current) => {
    task3ShapeArrayChild(stream, "complete_prefix", current, task3ShapeFeatureEvent);
    task3ShapeDataChild(stream, "receipt", (receipt) => task3ShapeStreamReceipt(receipt, current));
  });
}

function task3ShapeCheckpoint(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "checkpoint_set_id", "record_mode", "store_binding",
    "feature_source_manifest", "streams", "checkpoint_set_digest",
  ], state, (checkpoint, current) => {
    task3ShapeDataChild(checkpoint, "store_binding", (binding) => task3ShapeStoreBinding(binding, current));
    task3ShapeDataChild(checkpoint, "feature_source_manifest", (manifest) => task3ShapeFeatureManifest(manifest, current));
    task3ShapeArrayChild(checkpoint, "streams", current, task3ShapeStreamCheckpoint);
  });
}

function task3ShapeObservation(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "observation_id", "store_binding_digest", "observed_at", "streams",
    "observed_entries", "observation_digest",
  ], state, (observation, current) => {
    task3ShapeArrayChild(observation, "streams", current, (stream, streamState) => {
      task3ShapeObject(stream, [
        "stream_id", "checkpoint_maximum_sequence", "checkpoint_head_event_digest",
        "observed_head_sequence", "observed_head_event_id", "observed_head_event_digest",
        "complete_suffix", "suffix_digest",
      ], streamState, (observed, observedState) => {
        task3ShapeArrayChild(observed, "complete_suffix", observedState, task3ShapeFeatureEvent);
      });
    });
    task3ShapeArrayChild(observation, "observed_entries", current, task3ShapeFeatureManifestEntry);
  });
}

/** Complete descriptor-only checkpoint closure; it never invokes an accessor. */
export function task3PreflightCheckpointShape(value: unknown): void {
  task3ShapeCheckpoint(value, task3ShapeState());
}

function task3ShapeDatasetExample(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "qualification_input", "qualification", "eligibility_input", "eligibility", "preference_input",
    "preference", "feature_checkpoint_set", "post_checkpoint_observation", "blocking_evidence",
  ], state, (example, current) => {
    task3ShapeDataChild(example, "qualification_input", (input) => task3ShapeTask2QualificationInput(input, current));
    task3ShapeDataChild(example, "qualification", (record) => task3ShapeTask2QualificationRecord(record, current));
    task3ShapeDataChild(example, "eligibility_input", (input) => task3ShapeTask2EligibilityInput(input, current));
    task3ShapeDataChild(example, "eligibility", (record) => task3ShapeTask2EligibilityRecord(record, current));
    task3ShapeDataChild(example, "preference_input", (input) => task3ShapeTask2PreferenceInput(input, current));
    task3ShapeDataChild(example, "preference", (record) => task3ShapeTask2PreferenceRecord(record, current));
    task3ShapeDataChild(example, "feature_checkpoint_set", (checkpoint) => task3ShapeCheckpoint(checkpoint, current));
    task3ShapeDataChild(example, "post_checkpoint_observation", (observation) => {
      if (observation !== null) task3ShapeObservation(observation, current);
    });
    task3ShapeArrayChild(example, "blocking_evidence", current, (blocking, blockingState) => {
      task3ShapeObject(blocking, ["evidence_ref", "source_class", "purpose", "contains_expression"], blockingState,
        (record, recordState) => {
          task3ShapeDataChild(record, "evidence_ref", (ref) => task3ShapeDigestRef(ref, recordState));
        });
    });
  });
}

function task3ShapeLeakageSubject(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["example", "relation_ids"], state, (subject, current) => {
    task3ShapeDataChild(subject, "example", (example) => task3ShapeDatasetExample(example, current));
    task3ShapeDataChild(subject, "relation_ids", (ids) => task3ShapeTextArray(ids, current));
  });
}

function task3ShapeRelationEvidencePayload(value: unknown, state: Task3ShapeState): void {
  const evidenceKind = task3DescriptorDataValue(value, "evidence_kind");
  const variants = [
    ["evidence_kind", "semantic_subject_ref", "member_candidate_refs"],
    ["evidence_kind", "predecessor_candidate_ref", "successor_candidate_ref"],
    ["evidence_kind", "family_id", "member_task_refs"],
    ["evidence_kind", "family_id", "member_candidate_refs"],
    ["evidence_kind", "occurrence_id", "member_candidate_refs"],
    ["evidence_kind", "variant_family_id", "context_values"],
  ] as const;
  const keys = task3ShapeUnionKeys(value, variants);
  const ref = (record: Record<string, unknown>, key: string, current: Task3ShapeState): void => {
    task3ShapeDataChild(record, key, (nested) => task3ShapeDigestRef(nested, current));
  };
  const refs = (record: Record<string, unknown>, key: string, current: Task3ShapeState): void => {
    task3ShapeDataChild(record, key, (nested) => task3ShapeRefArray(nested, current));
  };
  const allowedKinds = keys.includes("semantic_subject_ref") ? ["message_lineage"]
    : keys.includes("predecessor_candidate_ref") ? ["supersession"]
      : keys.includes("member_task_refs") ? ["task_family"]
        : keys.includes("occurrence_id") ? ["source_occurrence"]
          : keys.includes("context_values") ? ["locale_variant", "channel_variant"]
            : ["template_family"];
  if (evidenceKind !== undefined && !allowedKinds.includes(String(evidenceKind))) task3FailContract("input_shape");
  task3ShapeObject(value, keys, state, (record, current) => {
    if (keys.includes("semantic_subject_ref")) ref(record, "semantic_subject_ref", current);
    if (keys.includes("member_candidate_refs")) refs(record, "member_candidate_refs", current);
    if (keys.includes("predecessor_candidate_ref")) {
      ref(record, "predecessor_candidate_ref", current);
      ref(record, "successor_candidate_ref", current);
    }
    if (keys.includes("member_task_refs")) refs(record, "member_task_refs", current);
    if (keys.includes("context_values")) {
      task3ShapeArrayChild(record, "context_values", current, (binding, bindingState) => {
        task3ShapeObject(binding, ["context_ref", "observed_value"], bindingState,
          (contextBinding, contextState) => ref(contextBinding, "context_ref", contextState));
      });
    }
  });
}

function task3ShapeRelationMaterial(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["material_kind", "material_ref", "source_class", "rights_state", "value"], state,
    (material, current) => {
      task3ShapeDataChild(material, "material_ref", (ref) => task3ShapeDigestRef(ref, current));
      task3ShapeDataChild(material, "value", (evidence) => {
        task3ShapeObject(evidence, [
          "contract_version", "evidence_id", "evidence_version", "verification_mode", "authority_effect",
          "source_class", "rights_state", "evidence", "evidence_digest",
        ], current, (record, evidenceState) => {
          task3ShapeDataChild(record, "evidence", (payload) => task3ShapeRelationEvidencePayload(payload, evidenceState));
        });
      });
    });
}

function task3ShapeCandidateBinding(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, ["example_ref", "candidate_sides", "candidate_refs"], state,
    (binding, current) => {
      task3ShapeDataChild(binding, "example_ref", (ref) => task3ShapeDigestRef(ref, current));
      task3ShapeDataChild(binding, "candidate_sides", (sides) => task3ShapeTextArray(sides, current));
      task3ShapeDataChild(binding, "candidate_refs", (refs) => task3ShapeRefArray(refs, current));
    });
}

function task3ShapeRelationBasis(value: unknown, state: Task3ShapeState): void {
  const basisKind = task3DescriptorDataValue(value, "basis_kind");
  const keys = task3ShapeUnionKeys(value, [
    ["basis_kind", "semantic_subject_ref", "bindings", "membership_evidence_ref"],
    ["basis_kind", "predecessor", "successor", "membership_evidence_ref"],
    ["basis_kind", "family_id", "bindings", "membership_evidence_ref"],
    ["basis_kind", "occurrence_id", "bindings", "membership_evidence_ref"],
    ["basis_kind", "variant_family_id", "message_lineage_relation_id", "bindings", "membership_evidence_ref"],
  ]);
  const ref = (record: Record<string, unknown>, key: string, current: Task3ShapeState): void => {
    task3ShapeDataChild(record, key, (nested) => task3ShapeDigestRef(nested, current));
  };
  const membership = (record: Record<string, unknown>, current: Task3ShapeState): void => {
    ref(record, "membership_evidence_ref", current);
  };
  const allowedKinds = keys.includes("semantic_subject_ref") ? ["message_lineage"]
    : keys.includes("predecessor") ? ["supersession"]
      : keys.includes("occurrence_id") ? ["source_occurrence"]
        : keys.includes("variant_family_id") ? ["locale_variant", "channel_variant"]
          : ["task_family", "template_family"];
  if (basisKind !== undefined && !allowedKinds.includes(String(basisKind))) task3FailContract("input_shape");
  task3ShapeObject(value, keys, state, (record, current) => {
    if (keys.includes("semantic_subject_ref")) {
      ref(record, "semantic_subject_ref", current);
      task3ShapeArrayChild(record, "bindings", current, task3ShapeCandidateBinding);
    } else if (keys.includes("predecessor")) {
      for (const key of ["predecessor", "successor"] as const) {
        task3ShapeDataChild(record, key, (binding) => task3ShapeObject(binding, [
          "example_ref", "candidate_ref",
        ], current, (candidate, candidateState) => {
          ref(candidate, "example_ref", candidateState);
          ref(candidate, "candidate_ref", candidateState);
        }));
      }
    } else if (keys.includes("variant_family_id")) {
      task3ShapeArrayChild(record, "bindings", current, (binding, bindingState) => {
        task3ShapeObject(binding, ["example_ref", "context_ref", "observed_value"], bindingState,
          (contextBinding, contextState) => {
            ref(contextBinding, "example_ref", contextState);
            ref(contextBinding, "context_ref", contextState);
          });
      });
    } else {
      task3ShapeArrayChild(record, "bindings", current, (binding, bindingState) => {
        if (keys.includes("occurrence_id") || basisKind === "template_family") {
          task3ShapeCandidateBinding(binding, bindingState);
          return;
        }
        if (basisKind === "task_family") {
          task3ShapeObject(binding, ["example_ref", "task_ref"], bindingState,
            (taskBinding, taskState) => {
              ref(taskBinding, "example_ref", taskState);
              ref(taskBinding, "task_ref", taskState);
            });
          return;
        }
        const bindingKeys = task3ShapeUnionKeys(binding, [
          ["example_ref", "task_ref"],
          ["example_ref", "candidate_sides", "candidate_refs"],
        ]);
        if (bindingKeys.includes("task_ref")) {
          task3ShapeObject(binding, bindingKeys, bindingState, (taskBinding, taskState) => {
            ref(taskBinding, "example_ref", taskState);
            ref(taskBinding, "task_ref", taskState);
          });
        } else {
          task3ShapeCandidateBinding(binding, bindingState);
        }
      });
    }
    membership(record, current);
  });
}

function task3ShapeRelationNode(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "relation_id", "reason", "basis", "member_example_refs", "evidence_refs",
    "source_class", "rights_state", "relation_digest",
  ], state, (node, current) => {
    task3ShapeDataChild(node, "basis", (basis) => task3ShapeRelationBasis(basis, current));
    task3ShapeDataChild(node, "member_example_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeDataChild(node, "evidence_refs", (refs) => task3ShapeRefArray(refs, current));
  });
}

function task3ShapeLeakageEvidence(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "snapshot_id", "snapshot_version", "record_mode", "cohort_scope",
    "enumeration_state", "subjects", "relation_nodes", "additional_materials", "snapshot_digest",
  ], state, (snapshot, current) => {
    task3ShapeDataChild(snapshot, "cohort_scope", (scope) => {
      task3ShapeObject(scope, ["memory_scope", "project_id"], current);
    });
    task3ShapeArrayChild(snapshot, "subjects", current, task3ShapeLeakageSubject);
    task3ShapeArrayChild(snapshot, "relation_nodes", current, task3ShapeRelationNode);
    task3ShapeArrayChild(snapshot, "additional_materials", current, task3ShapeRelationMaterial);
  });
}

function task3ShapeVerifiedExample(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "subject", "example_ref", "feature_as_of_digest", "presented_feature_refs",
    "checkpointed_feature_refs", "normalized_a", "normalized_b", "exclusion_reasons",
  ], state, (verified, current) => {
    task3ShapeDataChild(verified, "subject", (subject) => task3ShapeLeakageSubject(subject, current));
    task3ShapeDataChild(verified, "example_ref", (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(verified, "presented_feature_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeDataChild(verified, "checkpointed_feature_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeDataChild(verified, "normalized_a", (scalars) => {
      if (scalars !== null) task3ShapeArray(scalars, current, () => undefined);
    });
    task3ShapeDataChild(verified, "normalized_b", (scalars) => {
      if (scalars !== null) task3ShapeArray(scalars, current, () => undefined);
    });
    task3ShapeDataChild(verified, "exclusion_reasons", (reasons) => task3ShapeTextArray(reasons, current));
  });
}

export function task3PreflightDatasetExampleShape(value: unknown): void {
  task3ShapeLeakageSubject(value, task3ShapeState());
}

export function task3PreflightLeakageEvidenceShape(value: unknown): void {
  task3ShapeLeakageEvidence(value, task3ShapeState());
}

export function task3PreflightRelationClosureShape(
  relationNodes: unknown,
  additionalMaterials: unknown,
): void {
  const state = task3ShapeState();
  task3ShapeArray(relationNodes, state, task3ShapeRelationNode);
  task3ShapeArray(additionalMaterials, state, task3ShapeRelationMaterial);
}

export function task3PreflightVerifiedExamplesShape(value: unknown): void {
  task3ShapeArray(value, task3ShapeState(), task3ShapeVerifiedExample);
}

function task3ShapeLeakageGroup(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "rule_version", "normalization_artifact_refs", "member_refs",
    "edges", "bucket", "split", "group_state",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    task3ShapeDataChild(payload, "normalization_artifact_refs", (refs) => task3ShapeArtifactArray(refs, current));
    task3ShapeDataChild(payload, "member_refs", (refs) => task3ShapeRefArray(refs, current));
    task3ShapeArrayChild(payload, "edges", current, (edge, edgeState) => {
      task3ShapeObject(edge, ["left_ref", "right_ref", "reason"], edgeState, (record, recordState) => {
        task3ShapeDataChild(record, "left_ref", (ref) => task3ShapeDigestRef(ref, recordState));
        task3ShapeDataChild(record, "right_ref", (ref) => task3ShapeDigestRef(ref, recordState));
      });
    });
  });
}

function task3ShapeDatasetManifest(value: unknown, state: Task3ShapeState): void {
  const payloadKeys = [
    ...TASK2_SHARED_PAYLOAD_KEYS, "example_refs", "exclusions", "leakage_group_refs",
    "train_example_refs", "validation_example_refs", "test_example_refs", "permission_refs",
    "feature_source_checkpoint_refs", "counts", "test_open_state", "dataset_state",
  ] as const;
  task3ShapeDurable(value, payloadKeys, state, (payload, current) => {
    for (const key of [
      "example_refs", "leakage_group_refs", "train_example_refs", "validation_example_refs",
      "test_example_refs", "permission_refs", "feature_source_checkpoint_refs",
    ] as const) task3ShapeDataChild(payload, key, (refs) => task3ShapeRefArray(refs, current));
    task3ShapeArrayChild(payload, "exclusions", current, (exclusion, exclusionState) => {
      task3ShapeObject(exclusion, ["example_ref", "reason_code"], exclusionState,
        (record, recordState) => {
          task3ShapeDataChild(record, "example_ref", (ref) => task3ShapeDigestRef(ref, recordState));
        });
    });
    task3ShapeDataChild(payload, "counts", (counts) => task3ShapeObject(counts, [
      "examples", "groups", "train_examples", "train_groups", "validation_examples",
      "validation_groups", "test_examples", "test_groups",
    ], current));
  });
}

function task3ShapeSealWitness(value: unknown, state: Task3ShapeState): void {
  task3ShapeObject(value, [
    "contract_version", "source_dataset_ref", "sealed_at", "membership_digest", "verification_mode",
    "verification_receipt", "seal_digest",
  ], state, (witness, current) => {
    task3ShapeDataChild(witness, "source_dataset_ref", (ref) => task3ShapeDigestRef(ref, current));
    task3ShapeDataChild(witness, "verification_receipt", (receipt) => {
      if (receipt !== null) task3ShapeVerificationReceipt(receipt, current);
    });
  });
}

export function task3PreflightLeakageGroupShape(value: unknown): void {
  task3ShapeLeakageGroup(value, task3ShapeState());
}

export function task3PreflightDatasetManifestShape(value: unknown): void {
  task3ShapeDatasetManifest(value, task3ShapeState());
}

export function task3PreflightSealWitnessShape(value: unknown): void {
  task3ShapeSealWitness(value, task3ShapeState());
}

const GLOBAL_RECORD_ID_FIELDS = new Set([
  "record_id", "snapshot_id", "event_id", "stream_id", "binding_id", "manifest_id",
  "checkpoint_set_id", "observation_id", "evidence_id", "relation_id", "projection_id",
  "store_instance_id", "head_event_id", "observed_head_event_id",
]);

function task3GraphObjects(value: unknown): object[] {
  const objects: object[] = [];
  const seen = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    objects.push(current);
    for (const child of Array.isArray(current) ? current : Object.values(current)) visit(child);
  };
  visit(value);
  return objects;
}

/** Category-staged integrity preflight used by every public Task 3 boundary. */
export function task3PreflightGlobalIntegrity(value: unknown): void {
  const objects = task3GraphObjects(value);
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    for (const [key, field] of Object.entries(object)) {
      if (key.endsWith("_at") && field !== null && !task2IsRfc3339(field)) task3FailContract("timestamp");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    for (const [key, field] of Object.entries(object)) {
      if (!GLOBAL_RECORD_ID_FIELDS.has(key) || field === null) continue;
      if (typeof field !== "string" || !RECORD_ID_PATTERN.test(field)) task3FailContract("record_id");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    const record = object as Record<string, unknown>;
    if (Object.hasOwn(record, "schema_id")
      && (typeof record.schema_id !== "string" || record.schema_id.length === 0)) task3FailContract("schema_id");
    if (Object.hasOwn(record, "schema_id")
      && Object.hasOwn(record, "schema_version") && record.schema_version !== "0.1.0") {
      task3FailContract("schema_id");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    for (const [key, field] of Object.entries(object)) {
      if (!key.endsWith("_digest") || field === null) continue;
      if (typeof field !== "string" || !DIGEST_PATTERN.test(field)) task3FailContract("digest");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    const record = object as Record<string, unknown>;
    if (record.contract_version === "contentmd.feature-source-checkpoint-set/0.1.0") {
      const { checkpoint_set_digest: _digest, ...content } = record;
      if (record.checkpoint_set_digest !== sha256Canonical(content)) task3FailContract("digest");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    const record = object as Record<string, unknown>;
    if (!Object.hasOwn(record, "record_version") || !Object.hasOwn(record, "content_digest")
      || !Object.hasOwn(record, "scope") || !Object.hasOwn(record, "payload")) continue;
    if (record.schema_id === "contentmd.verification-receipt-record") continue;
    try {
      if (verifyRecordDigest(record as never).valid !== true) task3FailContract("durable_record_digest");
    } catch (error) {
      if (error instanceof Task3ContractError) throw error;
      task3FailContract("durable_record_digest");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    const record = object as Record<string, unknown>;
    if (record.contract_version === "contentmd.task2-evidence-snapshot/0.1.0") {
      const expected = sha256Canonical({
        contract_version: record.contract_version,
        snapshot_id: record.snapshot_id,
        snapshot_kind: record.snapshot_kind,
        snapshot_version: record.snapshot_version,
        captured_at: record.captured_at,
        source_refs: record.source_refs,
        payload: record.payload,
      });
      if (record.snapshot_digest !== expected) task3FailContract("snapshot_digest");
    } else if (record.contract_version === "contentmd.leakage-evidence-snapshot/0.1.0") {
      const { snapshot_digest: _digest, ...content } = record;
      if (record.snapshot_digest !== sha256Canonical(content)) task3FailContract("snapshot_digest");
    }
  }
  for (const object of objects) {
    if (Array.isArray(object)) continue;
    const record = object as Record<string, unknown>;
    if (record.schema_id === "contentmd.verification-receipt-record") {
      try {
        if (verifyRecordDigest(record as never).valid !== true) task3FailContract("receipt_digest");
      } catch (error) {
        if (error instanceof Task3ContractError) throw error;
        task3FailContract("receipt_digest");
      }
    } else if (record.contract_version === "contentmd.stream-checkpoint-receipt/0.1.0") {
      const { receipt_digest: _digest, ...content } = record;
      if (record.receipt_digest !== sha256Canonical(content)) task3FailContract("receipt_digest");
    }
  }
}

function assertText(value: unknown, suffix = "input_shape"): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task3FailContract(suffix);
}

function assertDigest(value: unknown, suffix = "digest"): asserts value is string {
  if (typeof value !== "string" || !DIGEST_PATTERN.test(value)) task3FailContract(suffix);
}

function assertRecordId(value: unknown): asserts value is string {
  if (typeof value !== "string" || !RECORD_ID_PATTERN.test(value)) task3FailContract("record_id");
}

function assertTimestamp(value: unknown): asserts value is string {
  if (!task2IsRfc3339(value)) task3FailContract("timestamp");
}

function assertSafeInteger(value: unknown, minimum = 0, suffix = "input_shape"): asserts value is number {
  if (!Number.isSafeInteger(value) || (value as number) < minimum) task3FailContract(suffix);
}

export function task3CanonicalCompare(left: unknown, right: unknown): number {
  return Buffer.compare(Buffer.from(canonicalJson(left), "utf8"), Buffer.from(canonicalJson(right), "utf8"));
}

export function task3SortCanonical<T>(values: readonly T[]): T[] {
  return [...values].sort(task3CanonicalCompare);
}

function assertSortedUnique<T>(values: readonly T[], allowEmpty = true): void {
  if ((!allowEmpty && values.length === 0)
    || values.some((value, index) => index > 0 && task3CanonicalCompare(values[index - 1], value) >= 0)) {
    task3FailContract("set_uniqueness_or_order");
  }
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function refKey(ref: DigestRef): string {
  return canonicalJson(ref);
}

function collectDigestRefKeys(value: unknown, keys = new Set<string>()): Set<string> {
  if (value === null || typeof value !== "object") return keys;
  if (!Array.isArray(value)) {
    const record = value as Record<string, unknown>;
    const objectKeys = Object.keys(record);
    if (objectKeys.length === 4
      && objectKeys.includes("record_id")
      && objectKeys.includes("schema_id")
      && objectKeys.includes("schema_version")
      && objectKeys.includes("content_digest")
      && record.schema_version === "0.1.0") {
      keys.add(canonicalJson(record));
      return keys;
    }
  }
  for (const child of Array.isArray(value) ? value : Object.values(value)) collectDigestRefKeys(child, keys);
  return keys;
}

export function task3RefsEqual(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function assertDigestRef(value: unknown): asserts value is DigestRef {
  assertExactKeys(value, ["record_id", "schema_id", "schema_version", "content_digest"]);
  assertRecordId(value.record_id);
  assertText(value.schema_id, "schema_id");
  if (value.schema_version !== "0.1.0") task3FailContract("schema_id");
  assertDigest(value.content_digest);
}

function assertArtifactRef(value: unknown): asserts value is ArtifactRef {
  assertExactKeys(value, ["artifact_id", "artifact_version", "artifact_digest"]);
  assertText(value.artifact_id);
  assertText(value.artifact_version);
  assertDigest(value.artifact_digest);
}

export function task3RecordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): DigestRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

export function task3CheckpointSetRef(checkpoint: {
  checkpoint_set_id: string;
  checkpoint_set_digest: string;
}): DigestRef {
  return {
    record_id: checkpoint.checkpoint_set_id,
    schema_id: "contentmd.feature-source-checkpoint-set",
    schema_version: "0.1.0",
    content_digest: checkpoint.checkpoint_set_digest,
  };
}

export function task3ObservationRef(observation: FeatureSourcePostCheckpointObservation): DigestRef {
  return {
    record_id: observation.observation_id,
    schema_id: "contentmd.feature-source-post-checkpoint-observation",
    schema_version: "0.1.0",
    content_digest: observation.observation_digest,
  };
}

function artifactProvenance(ref: ArtifactRef, relationship: string): ProvenanceRef {
  return {
    record_id: `artifact.${ref.artifact_id}.${ref.artifact_version}`,
    relationship,
    content_digest: ref.artifact_digest,
  };
}

export function task3SortProvenance(values: readonly ProvenanceRef[]): ProvenanceRef[] {
  const sorted = [...values].sort((left, right) => {
    const byRecord = Buffer.compare(Buffer.from(left.record_id, "utf8"), Buffer.from(right.record_id, "utf8"));
    if (byRecord !== 0) return byRecord;
    const byRelationship = Buffer.compare(Buffer.from(left.relationship, "utf8"), Buffer.from(right.relationship, "utf8"));
    if (byRelationship !== 0) return byRelationship;
    return Buffer.compare(Buffer.from(left.content_digest, "utf8"), Buffer.from(right.content_digest, "utf8"));
  });
  return sorted.filter((item, index) => index === 0 || !canonicalEqual(item, sorted[index - 1]));
}

const TASK2_ERROR_SUFFIX: Readonly<Record<string, string>> = {
  input_shape: "input_shape",
  canonical_value: "canonical_value",
  timestamp: "timestamp",
  record_id: "record_id",
  schema_id: "schema_id",
  digest: "digest",
  event_digest: "digest",
  boundary_digest: "digest",
  expression_digest: "digest",
  durable_record_digest: "durable_record_digest",
  snapshot_digest: "snapshot_digest",
  receipt_digest: "receipt_digest",
  receipt_binding: "receipt_binding",
  producer_artifact: "producer_artifact",
  producer_manifest: "producer_manifest",
  reference_integrity: "reference_integrity",
  lineage_graph: "reference_integrity",
  set_uniqueness_or_order: "set_uniqueness_or_order",
  official_mode_not_supported: "official_mode_not_supported",
};

function replayTask2<T>(derive: () => T): T {
  try {
    return derive();
  } catch (error) {
    if (!(error instanceof Task2ContractError)) throw error;
    if (error.code.startsWith("learning_example_not_eligible:")) task3FailContract("reference_integrity");
    const suffix = error.code.replace(/^task2_contract_invalid:/, "");
    task3FailContract(TASK2_ERROR_SUFFIX[suffix] ?? "reference_integrity");
  }
}

export interface Task3ProducerArtifactWitness {
  contract_version: "contentmd.task3-producer-witness/0.1.0";
  producer_id: "leakage-group" | "learning-dataset" | "dataset-seal";
  schema_artifact: RawUtf8Artifact;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  verification_mode: "development_fixture" | "build_verified";
  verification_receipt: VerificationReceiptRecord | null;
}

export interface VerifiedTask3Producer {
  schema_digest: string;
  code_digest: string;
  producer_manifest_digest: string;
  verification_receipt: VerificationReceiptRecord | null;
}

const PRODUCER_SOURCE_PATHS = {
  "leakage-group": ["packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
  "learning-dataset": ["packages/learning/src/dataset.ts", "packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
  "dataset-seal": ["packages/learning/src/dataset.ts"],
} as const;

function assertRawArtifact(value: unknown): asserts value is RawUtf8Artifact {
  assertExactKeys(value, ["path", "bytes_utf8", "raw_bytes_digest"]);
  assertText(value.path, "producer_artifact");
  if (typeof value.bytes_utf8 !== "string") task3FailContract("producer_artifact");
  assertDigest(value.raw_bytes_digest, "producer_artifact");
  if (sha256Utf8(value.bytes_utf8) !== value.raw_bytes_digest) task3FailContract("producer_artifact");
}

function verifyTask3Receipt(
  receipt: VerificationReceiptRecord,
  producerId: Task3ProducerArtifactWitness["producer_id"],
  manifestDigest: string,
): void {
  assertExactKeys(receipt, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  assertExactKeys(receipt.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!Array.isArray(receipt.provenance)) task3FailContract("input_shape");
  for (const provenance of receipt.provenance) {
    assertExactKeys(provenance, ["record_id", "relationship", "content_digest"]);
  }
  assertExactKeys(receipt.payload, [
    "transaction_ref", "target_path", "expected_digest", "observed_digest",
    "status", "verified_at", "method",
  ]);
  if (verifyRecordDigest(receipt).valid !== true) task3FailContract("receipt_digest");
  const targetPath = `contentmd://task3/producer-manifest/${producerId}`;
  if (receipt.record_id !== `verification-receipt.task3-producer.${producerId}.${manifestDigest}`
    || receipt.schema_id !== "contentmd.verification-receipt-record"
    || receipt.schema_version !== "0.1.0"
    || receipt.record_version !== 1
    || receipt.lifecycle_state !== "active"
    || !canonicalEqual(receipt.scope, {
      memory_scope: "task",
      project_id: null,
      resource_refs: [targetPath],
      data_classes: ["verification_metadata"],
    })
    || receipt.provenance.length !== 0
    || !canonicalEqual(receipt.payload, {
      transaction_ref: `producer-manifest.${manifestDigest}`,
      target_path: targetPath,
      expected_digest: manifestDigest,
      observed_digest: manifestDigest,
      status: "passed",
      verified_at: receipt.payload.verified_at,
      method: "sha256-canonical-readback",
    })) {
    task3FailContract("receipt_binding");
  }
  assertTimestamp(receipt.payload.verified_at);
}

export function verifyTask3Producer(
  witness: Task3ProducerArtifactWitness,
  expectedProducer: Task3ProducerArtifactWitness["producer_id"],
): VerifiedTask3Producer {
  task3PreflightProducerShape(witness, true);
  task3AssertCanonicalGraph(witness);
  task3PreflightGlobalIntegrity(witness);
  assertExactKeys(witness, [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ], "producer_artifact");
  if (witness.contract_version !== "contentmd.task3-producer-witness/0.1.0"
    || witness.producer_id !== expectedProducer) task3FailContract("producer_artifact");
  assertRawArtifact(witness.schema_artifact);
  if (witness.schema_artifact.path !== "packages/schemas/src/learning-records.schema.json") {
    task3FailContract("producer_artifact");
  }
  if (!Array.isArray(witness.source_artifacts) || witness.source_artifacts.length === 0) {
    task3FailContract("producer_artifact");
  }
  witness.source_artifacts.forEach(assertRawArtifact);
  const expectedPaths = [...PRODUCER_SOURCE_PATHS[expectedProducer]].sort();
  const actualPaths = witness.source_artifacts.map((artifact) => artifact.path);
  if (!canonicalEqual(actualPaths, expectedPaths) || new Set(actualPaths).size !== actualPaths.length) {
    task3FailContract("producer_artifact");
  }
  const schemaDigest = witness.schema_artifact.raw_bytes_digest;
  const codeDigest = sha256Canonical({
    contract_version: "contentmd.task3-code-manifest/0.1.0",
    producer_id: witness.producer_id,
    entries: witness.source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest })),
  });
  const producerManifestDigest = sha256Canonical({
    contract_version: "contentmd.task3-producer-manifest/0.1.0",
    producer_id: witness.producer_id,
    schema: { path: witness.schema_artifact.path, raw_bytes_digest: schemaDigest },
    code_digest: codeDigest,
  });
  if (witness.verification_mode === "development_fixture") {
    if (witness.verification_receipt !== null) task3FailContract("receipt_binding");
  } else if (witness.verification_mode === "build_verified") {
    if (witness.verification_receipt === null) task3FailContract("receipt_binding");
    verifyTask3Receipt(witness.verification_receipt, expectedProducer, producerManifestDigest);
  } else {
    task3FailContract("producer_artifact");
  }
  return {
    schema_digest: schemaDigest,
    code_digest: codeDigest,
    producer_manifest_digest: producerManifestDigest,
    verification_receipt: witness.verification_receipt,
  };
}

export interface StoreArtifactWitness {
  path: "fixtures/learning-ranking/feature-source-store-schema.json" | "fixtures/learning-ranking/feature-source-runtime-profile.json";
  bytes_utf8: string;
  raw_bytes_digest: string;
  artifact_ref: ArtifactRef;
}

export interface StoreBindingWitness {
  contract_version: "contentmd.feature-store-binding/0.1.0";
  binding_id: string;
  store_kind: "sqlite_append_only_event_store" | "synthetic_append_only_event_store";
  project_id: string;
  store_instance_id: string;
  instance_nonce_digest: string;
  store_schema: StoreArtifactWitness;
  runtime_profile: StoreArtifactWitness;
  binding_digest: string;
}

export type ExpressionFreeFeatureRole = "retrieval_snapshot" | "approved_pattern" | "acceptance_criteria";
export type ExpressionFreeFeatureConstraint =
  | { constraint_kind: "none" }
  | { constraint_kind: "grapheme_count"; minimum: number | null; maximum: number | null };

export interface ExpressionFreeFeaturePayload {
  contract_version: "contentmd.expression-free-feature/0.1.0";
  feature_role: ExpressionFreeFeatureRole;
  project_id: string;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  permission_snapshot_ref: DigestRef;
  eligibility_checks_snapshot_ref: DigestRef;
  ordered_feature_refs: [DigestRef, ...DigestRef[]];
  constraint: ExpressionFreeFeatureConstraint;
  state: "current";
  content_form: "expression_free_ref_and_numeric_metadata";
  set_digest: string;
}

export type ClosedTask2FeatureSnapshot =
  | EvidenceSnapshot<"task", TaskPayload>
  | EvidenceSnapshot<"context", ContextPayload>
  | EvidenceSnapshot<"fact-set", StableSetPayload>
  | EvidenceSnapshot<"review-policy", StableSetPayload>
  | EvidenceSnapshot<"candidate", CandidatePayload>
  | EvidenceSnapshot<"retrieval", ExpressionFreeFeaturePayload>
  | EvidenceSnapshot<"approved-pattern", ExpressionFreeFeaturePayload>
  | EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>;

export type CompleteFeatureMaterial =
  | { material_kind: "durable_record"; source_ref: DigestRef; value: ExemplarRecord }
  | { material_kind: "task2_evidence_snapshot"; source_ref: DigestRef; value: ClosedTask2FeatureSnapshot };

export interface FeatureSourceRecordedPayload {
  contract_version: "contentmd.feature-source-append/0.1.0";
  project_id: string;
  source_ref: DigestRef;
  source_role: FeatureSourceRole;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
}

export interface FeatureSourceManifestEntry {
  source_ref: DigestRef;
  source_role: FeatureSourceRole;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  material: CompleteFeatureMaterial;
  stream_id: string;
  event_id: string;
  sequence: number;
  event_digest: string;
  event: StoredEvent;
}

export interface FeatureSourceManifest {
  contract_version: "contentmd.feature-source-manifest/0.1.0";
  manifest_id: string;
  project_id: string;
  entries: [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]];
  manifest_digest: string;
}

export interface StreamCheckpointReceipt {
  contract_version: "contentmd.stream-checkpoint-receipt/0.1.0";
  store_binding_digest: string;
  stream_id: string;
  maximum_sequence: number;
  head_event_id: string | null;
  head_event_digest: string | null;
  prefix_digest: string;
  feature_source_manifest_digest: string;
  verification_method: "complete-prefix-sha256-chain";
  verified_at: string;
  receipt_digest: string;
}

export interface FeatureSourceStreamCheckpoint {
  stream_id: string;
  maximum_sequence: number;
  head_event_id: string | null;
  head_event_digest: string | null;
  complete_prefix: StoredEvent[];
  prefix_digest: string;
  receipt: StreamCheckpointReceipt;
}

export interface FeatureSourceCheckpointSet {
  contract_version: "contentmd.feature-source-checkpoint-set/0.1.0";
  checkpoint_set_id: string;
  record_mode: "development_fixture" | "official";
  store_binding: StoreBindingWitness;
  feature_source_manifest: FeatureSourceManifest;
  streams: [FeatureSourceStreamCheckpoint, ...FeatureSourceStreamCheckpoint[]];
  checkpoint_set_digest: string;
}

export interface PostCheckpointStreamObservation {
  stream_id: string;
  checkpoint_maximum_sequence: number;
  checkpoint_head_event_digest: string | null;
  observed_head_sequence: number;
  observed_head_event_id: string;
  observed_head_event_digest: string;
  complete_suffix: [StoredEvent, ...StoredEvent[]];
  suffix_digest: string;
}

export interface FeatureSourcePostCheckpointObservation {
  contract_version: "contentmd.feature-source-post-checkpoint-observation/0.1.0";
  observation_id: string;
  store_binding_digest: string;
  observed_at: string;
  streams: [PostCheckpointStreamObservation, ...PostCheckpointStreamObservation[]];
  observed_entries: [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]];
  observation_digest: string;
}

export interface BlockingEvidenceRef {
  evidence_ref: DigestRef;
  source_class: BlockingOnlySourceClass;
  purpose: "dataset_exclusion_only";
  contains_expression: false;
}

export interface DatasetExampleEvidence {
  qualification_input: FeedbackQualificationInput;
  qualification: FeedbackQualificationRecord;
  eligibility_input: LearningEligibilityInput;
  eligibility: LearningEligibilityRecord;
  preference_input: PreferenceExampleInput;
  preference: PreferenceExampleRecord;
  feature_checkpoint_set: FeatureSourceCheckpointSet;
  post_checkpoint_observation: FeatureSourcePostCheckpointObservation | null;
  blocking_evidence: BlockingEvidenceRef[];
}

export type RelationMembershipEvidencePayload =
  | { evidence_kind: "message_lineage"; semantic_subject_ref: DigestRef; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "supersession"; predecessor_candidate_ref: DigestRef; successor_candidate_ref: DigestRef }
  | { evidence_kind: "task_family"; family_id: string; member_task_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "template_family"; family_id: string; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "source_occurrence"; occurrence_id: string; member_candidate_refs: [DigestRef, ...DigestRef[]] }
  | { evidence_kind: "locale_variant"; variant_family_id: string; context_values: [{ context_ref: DigestRef; observed_value: string }, ...Array<{ context_ref: DigestRef; observed_value: string }>] }
  | { evidence_kind: "channel_variant"; variant_family_id: string; context_values: [{ context_ref: DigestRef; observed_value: string }, ...Array<{ context_ref: DigestRef; observed_value: string }>] };

export interface RelationMembershipEvidence {
  contract_version: "contentmd.relation-membership-evidence/0.1.0";
  evidence_id: string;
  evidence_version: "0.1.0";
  verification_mode: "development_fixture";
  authority_effect: "none";
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  evidence: RelationMembershipEvidencePayload;
  evidence_digest: string;
}

export interface CompleteRelationMaterial {
  material_kind: "relation_membership_evidence";
  material_ref: DigestRef;
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  value: RelationMembershipEvidence;
}

export interface RelationCandidateBinding {
  example_ref: DigestRef;
  candidate_sides: ["A"] | ["B"] | ["A", "B"];
  candidate_refs: [DigestRef, ...DigestRef[]];
}

export interface RelationTaskBinding { example_ref: DigestRef; task_ref: DigestRef }
export interface RelationContextBinding { example_ref: DigestRef; context_ref: DigestRef; observed_value: string }

export type LeakageRelationBasis =
  | { basis_kind: "message_lineage"; semantic_subject_ref: DigestRef; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "supersession"; predecessor: { example_ref: DigestRef; candidate_ref: DigestRef }; successor: { example_ref: DigestRef; candidate_ref: DigestRef }; membership_evidence_ref: DigestRef }
  | { basis_kind: "task_family"; family_id: string; bindings: [RelationTaskBinding, ...RelationTaskBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "template_family"; family_id: string; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "source_occurrence"; occurrence_id: string; bindings: [RelationCandidateBinding, ...RelationCandidateBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "locale_variant"; variant_family_id: string; message_lineage_relation_id: string; bindings: [RelationContextBinding, ...RelationContextBinding[]]; membership_evidence_ref: DigestRef }
  | { basis_kind: "channel_variant"; variant_family_id: string; message_lineage_relation_id: string; bindings: [RelationContextBinding, ...RelationContextBinding[]]; membership_evidence_ref: DigestRef };

export interface LeakageRelationNode {
  contract_version: "contentmd.leakage-relation/0.1.0";
  relation_id: string;
  reason: DeclaredLeakageReason;
  basis: LeakageRelationBasis;
  member_example_refs: [DigestRef, ...DigestRef[]];
  evidence_refs: [DigestRef, ...DigestRef[]];
  source_class: AllowedLearningSourceClass;
  rights_state: "training_permitted";
  relation_digest: string;
}

export interface LeakageSubjectWitness {
  example: DatasetExampleEvidence;
  relation_ids: [string, ...string[]];
}

export interface LeakageEvidenceSnapshot {
  contract_version: "contentmd.leakage-evidence-snapshot/0.1.0";
  snapshot_id: string;
  snapshot_version: "0.1.0";
  record_mode: "development_fixture" | "official";
  cohort_scope: { memory_scope: MemoryScope; project_id: string | null };
  enumeration_state: "complete";
  subjects: [LeakageSubjectWitness, ...LeakageSubjectWitness[]];
  relation_nodes: [LeakageRelationNode, ...LeakageRelationNode[]];
  additional_materials: CompleteRelationMaterial[];
  snapshot_digest: string;
}

export interface CandidateSimilarityTrace {
  left_side: "A" | "B";
  right_side: "A" | "B";
  left_normalized_scalars: number[];
  right_normalized_scalars: number[];
  left_trigram_keys: string[];
  right_trigram_keys: string[];
  intersection_size: number;
  union_size: number;
  near_duplicate: boolean;
}

export interface ExamplePairSimilarityTrace {
  left_example_ref: DigestRef;
  right_example_ref: DigestRef;
  comparisons: [CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace];
  near_duplicate: boolean;
  trace_digest: string;
}

export interface AdmittedGroupingEvidence {
  qualification_input: FeedbackQualificationInput;
  qualification: FeedbackQualificationRecord;
  eligibility_input: LearningEligibilityInput;
  eligibility: LearningEligibilityRecord;
  preference_input: PreferenceExampleInput;
  preference: PreferenceExampleRecord;
  feature_checkpoint_set: FeatureSourceCheckpointSet;
}

export interface ComponentSubjectProjection {
  example: AdmittedGroupingEvidence;
  contributing_relation_ids: string[];
}

export interface ComponentEvidenceProjection {
  contract_version: "contentmd.leakage-component-evidence/0.1.0";
  projection_id: string;
  subjects: [ComponentSubjectProjection, ...ComponentSubjectProjection[]];
  contributing_relation_nodes: LeakageRelationNode[];
  contributing_additional_materials: CompleteRelationMaterial[];
  normalization_artifacts: {
    normalization: FrozenUnicodeArtifactWitness;
    casefold: FrozenUnicodeArtifactWitness;
    whitespace: FrozenUnicodeArtifactWitness;
  };
  pair_similarity_traces: ExamplePairSimilarityTrace[];
  projection_digest: string;
}

export interface RelationCommitment {
  relation_id: string;
  relation_digest: string;
  evidence_refs: [DigestRef, ...DigestRef[]];
}

export interface VerifiedDatasetExample {
  subject: LeakageSubjectWitness;
  example_ref: DigestRef;
  feature_as_of_digest: string | null;
  presented_feature_refs: DigestRef[];
  checkpointed_feature_refs: DigestRef[];
  normalized_a: number[] | null;
  normalized_b: number[] | null;
  exclusion_reasons: string[];
}

export interface DeriveLeakageGroupsInput {
  record_mode: "development_fixture";
  producer: Task3ProducerArtifactWitness;
  unicode_artifacts: UnicodeArtifactBundle;
  admitted_examples: [VerifiedDatasetExample, ...VerifiedDatasetExample[]];
  relation_nodes: LeakageRelationNode[];
  additional_materials: CompleteRelationMaterial[];
}

export interface DerivedLeakageGroups {
  groups: LeakageGroupRecord[];
  projections: ComponentEvidenceProjection[];
  traces: ExamplePairSimilarityTrace[];
}

export function deriveLearningSplit(groupId: string): { bucket: number; split: Split } {
  assertRecordId(groupId);
  const digest = createHash("sha256")
    .update(Buffer.concat([
      Buffer.from("contentmd.learning-split/0.1.0", "utf8"),
      Buffer.from([0]),
      Buffer.from(groupId, "utf8"),
    ]))
    .digest("hex");
  const hash = BigInt(`0x${digest}`);
  const bucket = Number((hash * 100n) / (1n << 256n));
  return { bucket, split: bucket < 80 ? "train" : bucket < 90 ? "validation" : "test" };
}

const STORE_SCHEMA_VALUE = {
  contract_version: "contentmd.feature-source-store-schema/0.1.0",
  allowed_store_kinds: ["sqlite_append_only_event_store", "synthetic_append_only_event_store"],
  allowed_event_type: "feature_source_recorded",
  allowed_data_class: "learning_feature_source",
  sequence_origin: 1,
  sequence_step: 1,
  first_predecessor: null,
  later_predecessor: "prior_event_digest",
  event_digest_algorithm: "sha256-canonical",
  append_order_authority: "sequence_and_digest_chain",
} as const;

const RUNTIME_PROFILE_VALUE = {
  contract_version: "contentmd.feature-source-runtime-profile/0.1.0",
  node_version: "24.14.0",
  hash_algorithm: "sha256",
  text_encoding: "utf-8-fatal",
  canonical_json_algorithm: "contentmd.core-canonical-json/0.1.0",
  timestamp_role: "descriptive_only",
  network_access: "none",
} as const;

function verifyStoreArtifact(
  witness: StoreArtifactWitness,
  kind: "store_schema" | "runtime_profile",
): void {
  assertExactKeys(witness, ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"]);
  const isSchema = kind === "store_schema";
  const path = isSchema
    ? "fixtures/learning-ranking/feature-source-store-schema.json"
    : "fixtures/learning-ranking/feature-source-runtime-profile.json";
  const value = isSchema ? STORE_SCHEMA_VALUE : RUNTIME_PROFILE_VALUE;
  const artifactId = isSchema
    ? "contentmd.feature-source-store-schema"
    : "contentmd.feature-source-runtime-profile";
  if (witness.path !== path || witness.bytes_utf8 !== canonicalJson(value)) task3FailContract("checkpoint_binding");
  assertDigest(witness.raw_bytes_digest);
  assertArtifactRef(witness.artifact_ref);
  if (witness.raw_bytes_digest !== sha256Utf8(witness.bytes_utf8)
    || witness.artifact_ref.artifact_id !== artifactId
    || witness.artifact_ref.artifact_version !== "0.1.0"
    || witness.artifact_ref.artifact_digest !== witness.raw_bytes_digest) {
    task3FailContract("checkpoint_binding");
  }
}

export function verifyStoreBinding(binding: StoreBindingWitness): void {
  task3TopLevelShape(binding, [
    "contract_version", "binding_id", "store_kind", "project_id", "store_instance_id",
    "instance_nonce_digest", "store_schema", "runtime_profile", "binding_digest",
  ]);
  task3ShapeStoreBinding(binding, task3ShapeState());
  task3AssertCanonicalGraph(binding);
  task3PreflightGlobalIntegrity(binding);
  assertExactKeys(binding, [
    "contract_version", "binding_id", "store_kind", "project_id", "store_instance_id",
    "instance_nonce_digest", "store_schema", "runtime_profile", "binding_digest",
  ]);
  if (binding.contract_version !== "contentmd.feature-store-binding/0.1.0"
    || !STORE_SCHEMA_VALUE.allowed_store_kinds.includes(binding.store_kind)) {
    task3FailContract("checkpoint_binding");
  }
  assertText(binding.project_id);
  assertRecordId(binding.store_instance_id);
  assertDigest(binding.instance_nonce_digest);
  assertDigest(binding.binding_digest);
  verifyStoreArtifact(binding.store_schema, "store_schema");
  verifyStoreArtifact(binding.runtime_profile, "runtime_profile");
  const expectedNonce = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id: binding.store_instance_id,
    store_kind: binding.store_kind,
    project_id: binding.project_id,
  });
  if (binding.instance_nonce_digest !== expectedNonce) task3FailContract("checkpoint_binding");
  const identity = {
    contract_version: binding.contract_version,
    store_kind: binding.store_kind,
    project_id: binding.project_id,
    store_instance_id: binding.store_instance_id,
    instance_nonce_digest: binding.instance_nonce_digest,
    store_schema: binding.store_schema,
    runtime_profile: binding.runtime_profile,
  };
  if (binding.binding_id !== `feature-store-binding.${sha256Canonical(identity)}`) {
    task3FailContract("checkpoint_binding");
  }
  const { binding_digest: _digest, ...content } = binding;
  if (binding.binding_digest !== sha256Canonical(content)) task3FailContract("checkpoint_binding");
}

export function deriveFeatureSourceStreamId(
  storeBindingDigest: string,
  projectId: string,
  sourceRole: FeatureSourceRole,
): string {
  return `feature-source-stream.${sha256Canonical({
    contract_version: "contentmd.feature-source-stream-identity/0.1.0",
    store_binding_digest: storeBindingDigest,
    project_id: projectId,
    source_role: sourceRole,
  })}`;
}

export function deriveFeatureSourceEventId(
  storeBindingDigest: string,
  streamId: string,
  sourceRef: DigestRef,
  sourceRole: FeatureSourceRole,
  sourceClass: AllowedLearningSourceClass,
): string {
  return `feature-source-recorded.${sha256Canonical({
    contract_version: "contentmd.feature-source-event-identity/0.1.0",
    store_binding_digest: storeBindingDigest,
    stream_id: streamId,
    source_ref: sourceRef,
    source_role: sourceRole,
    source_class: sourceClass,
    rights_state: "training_permitted",
  })}`;
}

function snapshotRefFromUnknown(value: ClosedTask2FeatureSnapshot): DigestRef {
  return {
    record_id: value.snapshot_id,
    schema_id: `contentmd.task2-${value.snapshot_kind}-snapshot`,
    schema_version: "0.1.0",
    content_digest: value.snapshot_digest,
  };
}

function verifySnapshotEnvelope(value: ClosedTask2FeatureSnapshot): void {
  assertExactKeys(value, [
    "contract_version", "snapshot_id", "snapshot_kind", "snapshot_version", "captured_at",
    "verification_mode", "verification_receipt", "source_refs", "payload", "snapshot_digest",
  ]);
  if (value.contract_version !== "contentmd.task2-evidence-snapshot/0.1.0"
    || value.snapshot_version !== "0.1.0") task3FailContract("schema_id");
  assertRecordId(value.snapshot_id);
  assertTimestamp(value.captured_at);
  assertDigest(value.snapshot_digest, "snapshot_digest");
  if (!Array.isArray(value.source_refs) || value.source_refs.length === 0) task3FailContract("input_shape");
  value.source_refs.forEach(assertDigestRef);
  assertSortedUnique(value.source_refs, false);
  const expected = sha256Canonical({
    contract_version: value.contract_version,
    snapshot_id: value.snapshot_id,
    snapshot_kind: value.snapshot_kind,
    snapshot_version: value.snapshot_version,
    captured_at: value.captured_at,
    source_refs: value.source_refs,
    payload: value.payload,
  });
  if (expected !== value.snapshot_digest) task3FailContract("snapshot_digest");
  if (value.verification_mode === "development_fixture") {
    if (value.verification_receipt !== null) task3FailContract("receipt_binding");
  } else if (value.verification_mode === "resolver_verified") {
    if (value.verification_receipt === null || verifyRecordDigest(value.verification_receipt).valid !== true) {
      task3FailContract("receipt_digest");
    }
    const receipt = value.verification_receipt;
    if (receipt.payload.status !== "passed"
      || receipt.payload.transaction_ref !== `evidence-snapshot.${value.snapshot_digest}`
      || receipt.payload.target_path !== `contentmd://task2/evidence-snapshot/${value.snapshot_id}`
      || receipt.payload.expected_digest !== value.snapshot_digest
      || receipt.payload.observed_digest !== value.snapshot_digest
      || receipt.payload.method !== "sha256-canonical-readback") task3FailContract("receipt_binding");
  } else {
    task3FailContract("input_shape");
  }
  replayTask2(() => task2VerifySnapshotEnvelope(
    value as EvidenceSnapshot<string, unknown>,
    value.snapshot_kind,
  ));
}

function verifyFeatureMaterial(material: CompleteFeatureMaterial): DigestRef {
  assertExactKeys(material, ["material_kind", "source_ref", "value"]);
  assertDigestRef(material.source_ref);
  if (material.material_kind === "durable_record") {
    assertExactKeys(material.value, [
      "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
      "lifecycle_state", "payload", "content_digest",
    ]);
    assertRecordId(material.value.record_id);
    if (material.value.schema_id !== LEARNING_SCHEMA_IDS.exemplar
      || material.value.schema_version !== "0.1.0"
      || material.value.record_version !== 1) task3FailContract("schema_id");
    assertExactKeys(material.value.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
    if (!MEMORY_SCOPES.includes(material.value.scope.memory_scope)
      || !Array.isArray(material.value.scope.resource_refs)
      || !Array.isArray(material.value.scope.data_classes)
      || material.value.scope.resource_refs.some((item) => typeof item !== "string" || item.length === 0)
      || material.value.scope.data_classes.some((item) => typeof item !== "string" || item.length === 0)
      || !canonicalEqual(material.value.scope.resource_refs, sortTextUtf8(material.value.scope.resource_refs))
      || !canonicalEqual(material.value.scope.data_classes, sortTextUtf8(material.value.scope.data_classes))) {
      task3FailContract("input_shape");
    }
    if (!Array.isArray(material.value.provenance) || material.value.provenance.length === 0
      || !canonicalEqual(material.value.provenance, task3SortProvenance(material.value.provenance))) {
      task3FailContract("provenance");
    }
    for (const provenance of material.value.provenance) {
      assertExactKeys(provenance, ["record_id", "relationship", "content_digest"]);
      assertRecordId(provenance.record_id);
      assertText(provenance.relationship);
      assertDigest(provenance.content_digest);
    }
    assertExactKeys(material.value.payload, [
      "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
      "code_digest", "input_digest", "authority_effect", "exemplar_kind", "subject_ref", "approval_ref",
      "applicability_scope_ref", "transfer_condition_refs", "prohibited_transfer", "rights_ref",
      "permission_ref", "currentness_state", "exemplar_state",
    ]);
    const payload = material.value.payload;
    if (payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
      || payload.record_mode !== "development_fixture"
      || payload.ranking_objective !== "expression_preference"
      || payload.candidate_kind !== "expression"
      || payload.authority_effect !== "none"
      || !["expression", "mechanism"].includes(payload.exemplar_kind)
      || !["current", "expired", "revoked"].includes(payload.currentness_state)
      || !["approved_current", "expired", "revoked"].includes(payload.exemplar_state)) {
      task3FailContract("checkpoint_binding");
    }
    assertText(payload.prohibited_transfer);
    [payload.schema_digest, payload.code_digest, payload.input_digest].forEach((digest) => assertDigest(digest));
    [payload.subject_ref, payload.approval_ref, payload.applicability_scope_ref, payload.rights_ref, payload.permission_ref]
      .forEach(assertDigestRef);
    if (!Array.isArray(payload.transfer_condition_refs) || payload.transfer_condition_refs.length === 0) {
      task3FailContract("input_shape");
    }
    payload.transfer_condition_refs.forEach(assertDigestRef);
    assertSortedUnique(payload.transfer_condition_refs, false);
    if (verifyRecordDigest(material.value).valid !== true) task3FailContract("durable_record_digest");
    if (!task3RefsEqual(material.source_ref, task3RecordRef(material.value))) task3FailContract("reference_integrity");
  } else if (material.material_kind === "task2_evidence_snapshot") {
    verifySnapshotEnvelope(material.value);
    if (!task3RefsEqual(material.source_ref, snapshotRefFromUnknown(material.value))) {
      task3FailContract("reference_integrity");
    }
  } else {
    task3FailContract("input_shape");
  }
  return material.source_ref;
}

function assertStoredEventShape(event: StoredEvent): void {
  assertExactKeys(event, [
    "event_id", "stream_id", "sequence", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "payload", "predecessor_digest", "event_digest",
  ]);
  assertRecordId(event.event_id);
  assertRecordId(event.stream_id);
  assertSafeInteger(event.sequence, 1);
  if (event.schema_version !== "0.1.0") task3FailContract("schema_id");
  assertTimestamp(event.occurred_at);
  assertText(event.actor_ref);
  assertDigest(event.event_digest);
  if (event.predecessor_digest !== null) assertDigest(event.predecessor_digest);
  const { event_digest: _digest, ...preimage } = event;
  if (sha256Canonical(preimage) !== event.event_digest) task3FailContract("digest");
}

function verifyFeatureEvent(
  event: StoredEvent,
  binding: StoreBindingWitness,
  role: FeatureSourceRole,
): FeatureSourceRecordedPayload {
  assertStoredEventShape(event);
  assertExactKeys(event.payload, [
    "contract_version", "project_id", "source_ref", "source_role", "source_class", "rights_state",
  ]);
  const payload = event.payload as unknown as FeatureSourceRecordedPayload;
  if (event.event_type !== "feature_source_recorded"
    || event.data_class !== "learning_feature_source"
    || event.actor_ref !== "contentmd.task3-development-fixture-recorder"
    || payload.contract_version !== "contentmd.feature-source-append/0.1.0"
    || payload.project_id !== binding.project_id
    || payload.source_role !== role
    || !ALLOWED_SOURCE_CLASSES.includes(payload.source_class)
    || payload.rights_state !== "training_permitted") task3FailContract("checkpoint_binding");
  assertDigestRef(payload.source_ref);
  const streamId = deriveFeatureSourceStreamId(binding.binding_digest, binding.project_id, role);
  const eventId = deriveFeatureSourceEventId(
    binding.binding_digest,
    streamId,
    payload.source_ref,
    role,
    payload.source_class,
  );
  if (event.stream_id !== streamId || event.event_id !== eventId) task3FailContract("checkpoint_binding");
  return payload;
}

function verifyManifestEntry(
  entry: FeatureSourceManifestEntry,
  binding: StoreBindingWitness,
): void {
  assertExactKeys(entry, [
    "source_ref", "source_role", "source_class", "rights_state", "material", "stream_id",
    "event_id", "sequence", "event_digest", "event",
  ]);
  assertDigestRef(entry.source_ref);
  if (!FEATURE_SOURCE_ROLES.includes(entry.source_role)
    || !ALLOWED_SOURCE_CLASSES.includes(entry.source_class)
    || entry.rights_state !== "training_permitted") task3FailContract("checkpoint_binding");
  const materialRef = verifyFeatureMaterial(entry.material);
  const payload = verifyFeatureEvent(entry.event, binding, entry.source_role);
  if (!task3RefsEqual(entry.source_ref, materialRef)
    || !task3RefsEqual(entry.source_ref, payload.source_ref)
    || entry.source_class !== payload.source_class
    || entry.stream_id !== entry.event.stream_id
    || entry.event_id !== entry.event.event_id
    || entry.sequence !== entry.event.sequence
    || entry.event_digest !== entry.event.event_digest) task3FailContract("checkpoint_binding");
}

function verifyFeatureManifest(manifest: FeatureSourceManifest, binding: StoreBindingWitness): void {
  assertExactKeys(manifest, ["contract_version", "manifest_id", "project_id", "entries", "manifest_digest"]);
  if (manifest.contract_version !== "contentmd.feature-source-manifest/0.1.0"
    || manifest.project_id !== binding.project_id) task3FailContract("checkpoint_binding");
  if (!Array.isArray(manifest.entries) || manifest.entries.length === 0) task3FailContract("input_shape");
  manifest.entries.forEach((entry) => verifyManifestEntry(entry, binding));
  assertSortedUnique(manifest.entries.map((entry) => entry.source_ref), false);
  const uniquenessSets = [
    manifest.entries.map((entry) => refKey(entry.material.source_ref)),
    manifest.entries.map((entry) => `${entry.stream_id}\0${entry.sequence}`),
    manifest.entries.map((entry) => entry.event_id),
    manifest.entries.map((entry) => refKey(entry.source_ref)),
  ];
  if (uniquenessSets.some((values) => new Set(values).size !== values.length)) {
    task3FailContract("set_uniqueness_or_order");
  }
  const identity = {
    contract_version: manifest.contract_version,
    project_id: manifest.project_id,
    entries: manifest.entries,
  };
  if (manifest.manifest_id !== `feature-source-manifest.${sha256Canonical(identity)}`) {
    task3FailContract("checkpoint_binding");
  }
  const { manifest_digest: _digest, ...content } = manifest;
  if (manifest.manifest_digest !== sha256Canonical(content)) task3FailContract("checkpoint_binding");
}

function roleForStream(binding: StoreBindingWitness, streamId: string): FeatureSourceRole | undefined {
  return FEATURE_SOURCE_ROLES.find((role) =>
    deriveFeatureSourceStreamId(binding.binding_digest, binding.project_id, role) === streamId);
}

function verifyStreamCheckpoint(
  checkpoint: FeatureSourceStreamCheckpoint,
  binding: StoreBindingWitness,
  manifestDigest: string,
): void {
  assertExactKeys(checkpoint, [
    "stream_id", "maximum_sequence", "head_event_id", "head_event_digest", "complete_prefix",
    "prefix_digest", "receipt",
  ]);
  assertRecordId(checkpoint.stream_id);
  assertSafeInteger(checkpoint.maximum_sequence, 0);
  assertDigest(checkpoint.prefix_digest);
  if (!Array.isArray(checkpoint.complete_prefix)) task3FailContract("input_shape");
  const role = roleForStream(binding, checkpoint.stream_id);
  if (role === undefined) task3FailContract("checkpoint_binding");
  let predecessor: string | null = null;
  checkpoint.complete_prefix.forEach((event, index) => {
    verifyFeatureEvent(event, binding, role);
    if (event.sequence !== index + 1 || event.predecessor_digest !== predecessor) {
      task3FailContract("checkpoint_chain");
    }
    predecessor = event.event_digest;
  });
  if (checkpoint.maximum_sequence !== checkpoint.complete_prefix.length) task3FailContract("checkpoint_chain");
  const head = checkpoint.complete_prefix.at(-1);
  if ((head === undefined && (checkpoint.head_event_id !== null || checkpoint.head_event_digest !== null))
    || (head !== undefined && (checkpoint.head_event_id !== head.event_id || checkpoint.head_event_digest !== head.event_digest))) {
    task3FailContract("checkpoint_chain");
  }
  const expectedPrefix = sha256Canonical({
    contract_version: "contentmd.feature-source-prefix/0.1.0",
    stream_id: checkpoint.stream_id,
    maximum_sequence: checkpoint.maximum_sequence,
    complete_prefix: checkpoint.complete_prefix,
  });
  if (checkpoint.prefix_digest !== expectedPrefix) task3FailContract("checkpoint_chain");
  const receipt = checkpoint.receipt;
  assertExactKeys(receipt, [
    "contract_version", "store_binding_digest", "stream_id", "maximum_sequence", "head_event_id",
    "head_event_digest", "prefix_digest", "feature_source_manifest_digest", "verification_method",
    "verified_at", "receipt_digest",
  ]);
  assertTimestamp(receipt.verified_at);
  assertDigest(receipt.receipt_digest, "receipt_digest");
  const { receipt_digest: _receiptDigest, ...receiptPreimage } = receipt;
  if (sha256Canonical(receiptPreimage) !== receipt.receipt_digest) task3FailContract("receipt_digest");
  if (receipt.contract_version !== "contentmd.stream-checkpoint-receipt/0.1.0"
    || receipt.store_binding_digest !== binding.binding_digest
    || receipt.stream_id !== checkpoint.stream_id
    || receipt.maximum_sequence !== checkpoint.maximum_sequence
    || receipt.head_event_id !== checkpoint.head_event_id
    || receipt.head_event_digest !== checkpoint.head_event_digest
    || receipt.prefix_digest !== checkpoint.prefix_digest
    || receipt.feature_source_manifest_digest !== manifestDigest
    || receipt.verification_method !== "complete-prefix-sha256-chain") task3FailContract("receipt_binding");
}

export function verifyFeatureSourceCheckpointSet(checkpoint: FeatureSourceCheckpointSet): void {
  task3PreflightTopLevelRecordMode(checkpoint, [
    "contract_version", "checkpoint_set_id", "record_mode", "store_binding",
    "feature_source_manifest", "streams", "checkpoint_set_digest",
  ]);
  task3PreflightDescriptorChildKeys(checkpoint, "store_binding", [
    "contract_version", "binding_id", "store_kind", "project_id", "store_instance_id",
    "instance_nonce_digest", "store_schema", "runtime_profile", "binding_digest",
  ]);
  task3PreflightDescriptorChildKeys(checkpoint, "feature_source_manifest", [
    "contract_version", "manifest_id", "project_id", "entries", "manifest_digest",
  ]);
  task3PreflightDescriptorArrayItemKeys(checkpoint, "streams", [
    "stream_id", "maximum_sequence", "head_event_id", "head_event_digest", "complete_prefix",
    "prefix_digest", "receipt",
  ]);
  task3PreflightCheckpointShape(checkpoint);
  task3AssertCanonicalGraph(checkpoint);
  task3PreflightGlobalIntegrity(checkpoint);
  assertExactKeys(checkpoint, [
    "contract_version", "checkpoint_set_id", "record_mode", "store_binding",
    "feature_source_manifest", "streams", "checkpoint_set_digest",
  ]);
  if (checkpoint.contract_version !== "contentmd.feature-source-checkpoint-set/0.1.0") task3FailContract("schema_id");
  if (checkpoint.record_mode !== "development_fixture") {
    if (checkpoint.record_mode === "official") task3FailContract("official_mode_not_supported");
    task3FailContract("input_shape");
  }
  verifyStoreBinding(checkpoint.store_binding);
  verifyFeatureManifest(checkpoint.feature_source_manifest, checkpoint.store_binding);
  if (!Array.isArray(checkpoint.streams) || checkpoint.streams.length !== FEATURE_SOURCE_ROLES.length) {
    task3FailContract("checkpoint_binding");
  }
  checkpoint.streams.forEach((stream) => verifyStreamCheckpoint(
    stream,
    checkpoint.store_binding,
    checkpoint.feature_source_manifest.manifest_digest,
  ));
  const expectedStreamIds = FEATURE_SOURCE_ROLES.map((role) => deriveFeatureSourceStreamId(
    checkpoint.store_binding.binding_digest,
    checkpoint.store_binding.project_id,
    role,
  )).sort();
  if (!canonicalEqual(checkpoint.streams.map((stream) => stream.stream_id), expectedStreamIds)) {
    task3FailContract("checkpoint_binding");
  }
  const allEvents = checkpoint.streams.flatMap((stream) => stream.complete_prefix);
  if (new Set(allEvents.map((event) => event.event_id)).size !== allEvents.length
    || new Set(allEvents.map((event) => event.event_digest)).size !== allEvents.length) {
    task3FailContract("checkpoint_chain");
  }
  for (const entry of checkpoint.feature_source_manifest.entries) {
    const stream = checkpoint.streams.find((candidate) => candidate.stream_id === entry.stream_id);
    if (stream === undefined || !stream.complete_prefix.some((event) => canonicalEqual(event, entry.event))) {
      task3FailContract("checkpoint_binding");
    }
  }
  const identity = {
    contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
    record_mode: checkpoint.record_mode,
    store_binding: checkpoint.store_binding,
    feature_source_manifest: checkpoint.feature_source_manifest,
    streams: checkpoint.streams,
  };
  if (checkpoint.checkpoint_set_id !== `feature-source-checkpoint-set.${sha256Canonical(identity)}`) {
    task3FailContract("checkpoint_binding");
  }
  const { checkpoint_set_digest: _digest, ...content } = checkpoint;
  if (checkpoint.checkpoint_set_digest !== sha256Canonical(content)) task3FailContract("checkpoint_binding");
}

function verifyObservation(
  observation: FeatureSourcePostCheckpointObservation,
  checkpoint: FeatureSourceCheckpointSet,
): void {
  assertExactKeys(observation, [
    "contract_version", "observation_id", "store_binding_digest", "observed_at", "streams",
    "observed_entries", "observation_digest",
  ]);
  if (observation.contract_version !== "contentmd.feature-source-post-checkpoint-observation/0.1.0"
    || observation.store_binding_digest !== checkpoint.store_binding.binding_digest) {
    task3FailContract("checkpoint_binding");
  }
  assertTimestamp(observation.observed_at);
  if (!Array.isArray(observation.streams) || observation.streams.length === 0
    || !Array.isArray(observation.observed_entries) || observation.observed_entries.length === 0) {
    task3FailContract("input_shape");
  }
  observation.observed_entries.forEach((entry) => verifyManifestEntry(entry, checkpoint.store_binding));
  assertSortedUnique(observation.observed_entries.map((entry) => entry.source_ref), false);
  const checkpointEvents = checkpoint.streams.flatMap((stream) => stream.complete_prefix);
  const suffixEvents: StoredEvent[] = [];
  const observedStreamIds = new Set<string>();
  for (const stream of observation.streams) {
    assertExactKeys(stream, [
      "stream_id", "checkpoint_maximum_sequence", "checkpoint_head_event_digest", "observed_head_sequence",
      "observed_head_event_id", "observed_head_event_digest", "complete_suffix", "suffix_digest",
    ]);
    const checkpointStream = checkpoint.streams.find((candidate) => candidate.stream_id === stream.stream_id);
    if (checkpointStream === undefined || observedStreamIds.has(stream.stream_id)) task3FailContract("checkpoint_binding");
    observedStreamIds.add(stream.stream_id);
    if (stream.checkpoint_maximum_sequence !== checkpointStream.maximum_sequence
      || stream.checkpoint_head_event_digest !== checkpointStream.head_event_digest
      || !Array.isArray(stream.complete_suffix) || stream.complete_suffix.length === 0) {
      task3FailContract("checkpoint_chain");
    }
    const role = roleForStream(checkpoint.store_binding, stream.stream_id);
    if (role === undefined) task3FailContract("checkpoint_binding");
    let predecessor = checkpointStream.head_event_digest;
    stream.complete_suffix.forEach((event, index) => {
      verifyFeatureEvent(event, checkpoint.store_binding, role);
      if (event.sequence !== checkpointStream.maximum_sequence + index + 1
        || event.predecessor_digest !== predecessor) task3FailContract("checkpoint_chain");
      predecessor = event.event_digest;
      suffixEvents.push(event);
    });
    const head = stream.complete_suffix.at(-1)!;
    if (stream.observed_head_sequence !== head.sequence
      || stream.observed_head_event_id !== head.event_id
      || stream.observed_head_event_digest !== head.event_digest) task3FailContract("checkpoint_chain");
    const expectedSuffix = sha256Canonical({
      contract_version: "contentmd.feature-source-post-checkpoint-suffix/0.1.0",
      stream_id: stream.stream_id,
      checkpoint_maximum_sequence: stream.checkpoint_maximum_sequence,
      checkpoint_head_event_digest: stream.checkpoint_head_event_digest,
      observed_head_sequence: stream.observed_head_sequence,
      complete_suffix: stream.complete_suffix,
    });
    if (stream.suffix_digest !== expectedSuffix) task3FailContract("checkpoint_chain");
  }
  if (new Set([...checkpointEvents, ...suffixEvents].map((event) => event.event_id)).size
      !== checkpointEvents.length + suffixEvents.length
    || new Set([...checkpointEvents, ...suffixEvents].map((event) => event.event_digest)).size
      !== checkpointEvents.length + suffixEvents.length) task3FailContract("checkpoint_chain");
  const expectedObservedStreams = [...new Set(observation.observed_entries.map((entry) => entry.stream_id))].sort();
  if (!canonicalEqual(observation.streams.map((stream) => stream.stream_id), expectedObservedStreams)) {
    task3FailContract("checkpoint_binding");
  }
  const manifestRefs = new Set(checkpoint.feature_source_manifest.entries.map((entry) => refKey(entry.source_ref)));
  for (const entry of observation.observed_entries) {
    const stream = observation.streams.find((candidate) => candidate.stream_id === entry.stream_id);
    if (stream === undefined
      || entry.sequence <= stream.checkpoint_maximum_sequence
      || manifestRefs.has(refKey(entry.source_ref))
      || !stream.complete_suffix.some((event) => canonicalEqual(event, entry.event))) {
      task3FailContract("checkpoint_binding");
    }
  }
  const identity = {
    contract_version: observation.contract_version,
    store_binding_digest: observation.store_binding_digest,
    observed_at: observation.observed_at,
    streams: observation.streams,
    observed_entries: observation.observed_entries,
  };
  if (observation.observation_id !== `feature-source-post-checkpoint-observation.${sha256Canonical(identity)}`) {
    task3FailContract("checkpoint_binding");
  }
  const { observation_digest: _digest, ...content } = observation;
  if (observation.observation_digest !== sha256Canonical(content)) task3FailContract("checkpoint_binding");
}

const REQUIRED_ROLE_BINDINGS: Readonly<Record<
  "task" | "context" | "fact_set" | "policy" | "candidate_a" | "candidate_b",
  { schemaId: string; snapshotKind: string; select: (example: DatasetExampleEvidence) => unknown }
>> = {
  task: {
    schemaId: "contentmd.task2-task-snapshot",
    snapshotKind: "task",
    select: (example) => example.qualification_input.task,
  },
  context: {
    schemaId: "contentmd.task2-context-snapshot",
    snapshotKind: "context",
    select: (example) => example.qualification_input.context,
  },
  fact_set: {
    schemaId: "contentmd.task2-fact-set-snapshot",
    snapshotKind: "fact-set",
    select: (example) => example.qualification_input.fact_set,
  },
  policy: {
    schemaId: "contentmd.task2-review-policy-snapshot",
    snapshotKind: "review-policy",
    select: (example) => example.qualification_input.policy,
  },
  candidate_a: {
    schemaId: "contentmd.task2-candidate-snapshot",
    snapshotKind: "candidate",
    select: (example) => example.qualification_input.candidate_a,
  },
  candidate_b: {
    schemaId: "contentmd.task2-candidate-snapshot",
    snapshotKind: "candidate",
    select: (example) => example.qualification_input.candidate_b,
  },
};

function verifyRequiredFeatureBindings(
  example: DatasetExampleEvidence,
  checkpoint: FeatureSourceCheckpointSet,
): void {
  const entriesByRole = new Map<FeatureSourceRole, FeatureSourceManifestEntry[]>();
  for (const entry of checkpoint.feature_source_manifest.entries) {
    const list = entriesByRole.get(entry.source_role) ?? [];
    list.push(entry);
    entriesByRole.set(entry.source_role, list);
  }
  for (const [role, binding] of Object.entries(REQUIRED_ROLE_BINDINGS) as [keyof typeof REQUIRED_ROLE_BINDINGS, typeof REQUIRED_ROLE_BINDINGS[keyof typeof REQUIRED_ROLE_BINDINGS]][]) {
    const entries = entriesByRole.get(role);
    if (entries?.length !== 1) task3FailContract("checkpoint_binding");
    const entry = entries[0]!;
    if (entry.material.material_kind !== "task2_evidence_snapshot"
      || entry.source_ref.schema_id !== binding.schemaId
      || entry.material.value.snapshot_kind !== binding.snapshotKind
      || !canonicalEqual(entry.material.value, binding.select(example))) {
      task3FailContract("checkpoint_binding");
    }
  }
}

function includesRef(values: readonly DigestRef[], ref: DigestRef): boolean {
  return values.some((candidate) => task3RefsEqual(candidate, ref));
}

function verifyOptionalFeatureBindings(
  example: DatasetExampleEvidence,
  checkpoint: FeatureSourceCheckpointSet,
): void {
  const permission = example.eligibility_input.permission;
  const checks = example.eligibility_input.checks;
  const permissionRef = permission === null ? null : task2SnapshotRef(permission);
  const byRef = new Map(checkpoint.feature_source_manifest.entries.map((entry) => [refKey(entry.source_ref), entry]));
  for (const entry of checkpoint.feature_source_manifest.entries) {
    if (entry.source_role === "approved_exemplar") {
      if (entry.material.material_kind !== "durable_record"
        || entry.source_ref.schema_id !== LEARNING_SCHEMA_IDS.exemplar
        || entry.material.value.lifecycle_state !== "active"
        || entry.material.value.payload.exemplar_state !== "approved_current"
        || entry.material.value.payload.currentness_state !== "current"
        || entry.material.value.scope.project_id !== checkpoint.store_binding.project_id
        || permission === null
        || !task3RefsEqual(entry.material.value.payload.permission_ref, permission.payload.permission_ref)
        || !includesRef(permission.payload.subject_refs, entry.material.value.payload.subject_ref)
        || !includesRef(checks.payload.rights.evidence_refs, entry.material.value.payload.rights_ref)) {
        task3FailContract("checkpoint_binding");
      }
      continue;
    }
    if (entry.source_role !== "retrieval_snapshot"
      && entry.source_role !== "approved_pattern"
      && entry.source_role !== "acceptance_criteria") continue;
    if (entry.material.material_kind !== "task2_evidence_snapshot") task3FailContract("checkpoint_binding");
    const snapshot = entry.material.value;
    const expectedKind = entry.source_role === "retrieval_snapshot"
      ? "retrieval"
      : entry.source_role === "approved_pattern" ? "approved-pattern" : "acceptance-criteria";
    const payload = snapshot.payload as ExpressionFreeFeaturePayload;
    if (snapshot.snapshot_kind !== expectedKind) task3FailContract("checkpoint_binding");
    assertExactKeys(payload, [
      "contract_version", "feature_role", "project_id", "source_class", "rights_state",
      "permission_snapshot_ref", "eligibility_checks_snapshot_ref", "ordered_feature_refs", "constraint",
      "state", "content_form", "set_digest",
    ]);
    if (payload.contract_version !== "contentmd.expression-free-feature/0.1.0"
      || payload.feature_role !== entry.source_role
      || payload.project_id !== checkpoint.store_binding.project_id
      || payload.source_class !== entry.source_class
      || payload.rights_state !== "training_permitted"
      || permissionRef === null
      || payload.state !== "current"
      || payload.content_form !== "expression_free_ref_and_numeric_metadata"
      || !Array.isArray(payload.ordered_feature_refs) || payload.ordered_feature_refs.length === 0) {
      task3FailContract("checkpoint_binding");
    }
    payload.ordered_feature_refs.forEach(assertDigestRef);
    if (new Set(payload.ordered_feature_refs.map(refKey)).size !== payload.ordered_feature_refs.length
      || payload.ordered_feature_refs.some((ref) => task3RefsEqual(ref, entry.source_ref))) {
      task3FailContract("checkpoint_binding");
    }
    const targets = payload.ordered_feature_refs.map((ref) => byRef.get(refKey(ref)));
    if (targets.some((target) => target === undefined)) task3FailContract("checkpoint_binding");
    if (entry.source_role === "approved_pattern"
      && targets.some((target) => target!.source_role !== "approved_exemplar"
        || (target!.material.material_kind === "durable_record" && target!.material.value.payload.exemplar_kind !== "mechanism"))) {
      task3FailContract("checkpoint_binding");
    }
    if (entry.source_role === "retrieval_snapshot"
      && targets.some((target) => target!.source_role !== "approved_pattern" && target!.source_role !== "approved_exemplar")) {
      task3FailContract("checkpoint_binding");
    }
    if (entry.source_role === "acceptance_criteria"
      && targets.some((target) => target!.source_role !== "fact_set" && target!.source_role !== "policy")) {
      task3FailContract("checkpoint_binding");
    }
    if (payload.constraint.constraint_kind === "none") {
      assertExactKeys(payload.constraint, ["constraint_kind"]);
    } else if (payload.constraint.constraint_kind === "grapheme_count" && entry.source_role === "acceptance_criteria") {
      assertExactKeys(payload.constraint, ["constraint_kind", "minimum", "maximum"]);
      const { minimum, maximum } = payload.constraint;
      if (minimum === null && maximum === null) task3FailContract("checkpoint_binding");
      if (minimum !== null) assertSafeInteger(minimum, 0, "checkpoint_binding");
      if (maximum !== null) assertSafeInteger(maximum, 0, "checkpoint_binding");
      if (minimum !== null && maximum !== null && minimum > maximum) task3FailContract("checkpoint_binding");
    } else {
      task3FailContract("checkpoint_binding");
    }
    const expectedSourceRefs = task3SortCanonical([
      payload.permission_snapshot_ref,
      payload.eligibility_checks_snapshot_ref,
      ...payload.ordered_feature_refs,
    ].filter((ref, index, all) => all.findIndex((other) => task3RefsEqual(ref, other)) === index));
    if (!canonicalEqual(snapshot.source_refs, expectedSourceRefs)) task3FailContract("checkpoint_binding");
    const expectedSetDigest = sha256Canonical({
      contract_version: "contentmd.expression-free-feature-set/0.1.0",
      feature_role: payload.feature_role,
      project_id: payload.project_id,
      source_class: payload.source_class,
      rights_state: payload.rights_state,
      permission_snapshot_ref: payload.permission_snapshot_ref,
      eligibility_checks_snapshot_ref: payload.eligibility_checks_snapshot_ref,
      ordered_feature_refs: payload.ordered_feature_refs,
      constraint: payload.constraint,
      state: payload.state,
      content_form: payload.content_form,
    });
    if (payload.set_digest !== expectedSetDigest) task3FailContract("checkpoint_binding");
    const resolvedSubjects: DigestRef[] = [];
    const resolvedRights: DigestRef[] = [];
    const resolveTarget = (target: FeatureSourceManifestEntry, allowPattern: boolean): void => {
      if (target.source_class !== payload.source_class || target.rights_state !== payload.rights_state) {
        task3FailContract("checkpoint_binding");
      }
      if (target.source_role === "approved_exemplar") {
        if (target.material.material_kind !== "durable_record"
          || target.material.value.lifecycle_state !== "active"
          || target.material.value.payload.exemplar_kind !== "mechanism"
          || target.material.value.payload.exemplar_state !== "approved_current"
          || target.material.value.payload.currentness_state !== "current") task3FailContract("checkpoint_binding");
        resolvedSubjects.push(target.material.value.payload.subject_ref);
        resolvedRights.push(target.material.value.payload.rights_ref);
        return;
      }
      if (target.source_role === "approved_pattern" && allowPattern) {
        if (target.material.material_kind !== "task2_evidence_snapshot") task3FailContract("checkpoint_binding");
        const targetPayload = target.material.value.payload as ExpressionFreeFeaturePayload;
        if (!Array.isArray(targetPayload.ordered_feature_refs) || targetPayload.ordered_feature_refs.length === 0) {
          task3FailContract("checkpoint_binding");
        }
        for (const nestedRef of targetPayload.ordered_feature_refs) {
          const nested = byRef.get(refKey(nestedRef));
          if (nested === undefined || nested.source_role !== "approved_exemplar") task3FailContract("checkpoint_binding");
          resolveTarget(nested, false);
        }
        return;
      }
      if ((target.source_role === "fact_set" || target.source_role === "policy")
        && entry.source_role === "acceptance_criteria"
        && target.material.material_kind === "task2_evidence_snapshot") {
        const stable = target.material.value.payload as StableSetPayload;
        if (stable.state !== "current") task3FailContract("checkpoint_binding");
        return;
      }
      task3FailContract("checkpoint_binding");
    };
    targets.forEach((target) => resolveTarget(target!, entry.source_role === "retrieval_snapshot"));
    const uniqueSubjects = resolvedSubjects.filter((ref, index, all) =>
      all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index);
    const uniqueRights = resolvedRights.filter((ref, index, all) =>
      all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index);
    if (permission === null) task3FailContract("checkpoint_binding");
    if (!uniqueSubjects.every((ref) => includesRef(permission.payload.subject_refs, ref))
      || !uniqueRights.every((ref) => includesRef(checks.payload.rights.evidence_refs, ref))
      || checks.payload.rights.state !== "pass") task3FailContract("checkpoint_binding");
  }
}

function verifyTask2Replay(example: DatasetExampleEvidence): void {
  const replayedQualification = replayTask2(() => qualifyFeedback(example.qualification_input));
  if (!canonicalEqual(replayedQualification, example.qualification)) task3FailContract("reference_integrity");
  const replayedEligibility = replayTask2(() => determineLearningEligibility(example.eligibility_input));
  if (!canonicalEqual(replayedEligibility, example.eligibility)
    || !canonicalEqual(example.eligibility_input.qualification, example.qualification)
    || !canonicalEqual(example.eligibility_input.qualification_input, example.qualification_input)) {
    task3FailContract("reference_integrity");
  }
  const replayedPreference = replayTask2(() => createPreferenceExample(example.preference_input));
  if (!canonicalEqual(replayedPreference, example.preference)
    || !canonicalEqual(example.preference_input.qualification, example.qualification)
    || !canonicalEqual(example.preference_input.eligibility, example.eligibility)
    || !canonicalEqual(example.preference_input.eligibility_input, example.eligibility_input)
    || !canonicalEqual(example.preference_input.decision, example.qualification_input.decision)
    || !canonicalEqual(example.preference_input.task, example.qualification_input.task)
    || !canonicalEqual(example.preference_input.context, example.qualification_input.context)
    || !canonicalEqual(example.preference_input.candidate_a, example.qualification_input.candidate_a)
    || !canonicalEqual(example.preference_input.candidate_b, example.qualification_input.candidate_b)
    || !canonicalEqual(example.preference_input.presentation, example.qualification_input.presentation)) {
    task3FailContract("reference_integrity");
  }
}

export function verifyDatasetExample(
  subject: LeakageSubjectWitness,
): VerifiedDatasetExample {
  task3TopLevelShape(subject, ["example", "relation_ids"]);
  task3PreflightDescriptorChildKeys(subject, "example", [
    "qualification_input", "qualification", "eligibility_input", "eligibility", "preference_input",
    "preference", "feature_checkpoint_set", "post_checkpoint_observation", "blocking_evidence",
  ]);
  task3PreflightDatasetExampleShape(subject);
  task3AssertCanonicalGraph(subject);
  task3PreflightGlobalIntegrity(subject);
  assertExactKeys(subject, ["example", "relation_ids"]);
  const example = subject.example;
  assertExactKeys(example, [
    "qualification_input", "qualification", "eligibility_input", "eligibility", "preference_input",
    "preference", "feature_checkpoint_set", "post_checkpoint_observation", "blocking_evidence",
  ]);
  if (!Array.isArray(subject.relation_ids) || subject.relation_ids.length === 0
    || subject.relation_ids.some((id) => typeof id !== "string" || id.length === 0)) {
    task3FailContract("leakage_universe");
  }
  if (subject.relation_ids.some((id, index) => index > 0 && id <= subject.relation_ids[index - 1]!)) {
    task3FailContract("set_uniqueness_or_order");
  }
  verifyTask2Replay(example);
  const modeValues = [
    example.qualification_input.record_mode,
    example.qualification.payload.record_mode,
    example.eligibility_input.record_mode,
    example.eligibility.payload.record_mode,
    example.preference_input.record_mode,
    example.preference.payload.record_mode,
    example.feature_checkpoint_set.record_mode,
  ];
  if (modeValues.some((mode) => mode !== "development_fixture")) task3FailContract("reference_integrity");
  verifyFeatureSourceCheckpointSet(example.feature_checkpoint_set);
  if (example.feature_checkpoint_set.store_binding.project_id !== example.preference.scope.project_id
    || example.feature_checkpoint_set.feature_source_manifest.project_id !== example.preference.scope.project_id) {
    task3FailContract("checkpoint_binding");
  }
  const checkpointRef = task3CheckpointSetRef(example.feature_checkpoint_set);
  verifyRequiredFeatureBindings(example, example.feature_checkpoint_set);
  verifyOptionalFeatureBindings(example, example.feature_checkpoint_set);
  if (!Array.isArray(example.blocking_evidence)) task3FailContract("input_shape");
  for (const blocking of example.blocking_evidence) {
    assertExactKeys(blocking, ["evidence_ref", "source_class", "purpose", "contains_expression"]);
    assertDigestRef(blocking.evidence_ref);
    if (!["browser_observed", "competitor", "third_party"].includes(blocking.source_class)
      || blocking.purpose !== "dataset_exclusion_only"
      || blocking.contains_expression !== false) task3FailContract("leakage_universe");
  }
  assertSortedUnique(example.blocking_evidence);
  if (example.post_checkpoint_observation !== null) {
    verifyObservation(example.post_checkpoint_observation, example.feature_checkpoint_set);
    const mergedEntries = [
      ...example.feature_checkpoint_set.feature_source_manifest.entries,
      ...example.post_checkpoint_observation.observed_entries,
    ].sort((left, right) => task3CanonicalCompare(left.source_ref, right.source_ref)) as [
      FeatureSourceManifestEntry,
      ...FeatureSourceManifestEntry[],
    ];
    const bindingView: FeatureSourceCheckpointSet = {
      ...example.feature_checkpoint_set,
      feature_source_manifest: {
        ...example.feature_checkpoint_set.feature_source_manifest,
        entries: mergedEntries,
      },
    };
    verifyRequiredFeatureBindings(example, bindingView);
    verifyOptionalFeatureBindings(example, bindingView);
  }
  const checkpointOccurrences = example.qualification_input.presentation.source_refs
    .filter((ref) => task3RefsEqual(ref, checkpointRef)).length;
  const presented = example.qualification_input.presentation.source_refs
    .filter((ref) => !task3RefsEqual(ref, checkpointRef));
  const checkpointed = example.feature_checkpoint_set.feature_source_manifest.entries.map((entry) => entry.source_ref);
  const checkpointBindingValid = checkpointOccurrences === 1
    && task3RefsEqual(checkpointRef, example.preference.payload.feature_source_checkpoint_set_ref)
    && task3RefsEqual(checkpointRef, example.preference_input.feature_source_checkpoint_set_ref);
  const featureAsOfDigest = checkpointBindingValid && canonicalEqual(presented, checkpointed)
    ? sha256Canonical({
      contract_version: "contentmd.feature-as-of/0.1.0",
      checkpoint_set_ref: checkpointRef,
      presentation_ref: task2SnapshotRef(example.qualification_input.presentation),
      feature_source_manifest_digest: example.feature_checkpoint_set.feature_source_manifest.manifest_digest,
    })
    : null;
  const exclusionReasons: string[] = [];
  if (example.blocking_evidence.length > 0) exclusionReasons.push("forbidden_source_class");
  if (!checkpointBindingValid) {
    exclusionReasons.push("presentation_checkpoint_mismatch");
  }
  const presentedKeys = new Set(presented.map(refKey));
  const checkpointedKeys = new Set(checkpointed.map(refKey));
  const presentedOnly = presented.filter((ref) => !checkpointedKeys.has(refKey(ref)));
  const checkpointedOnly = checkpointed.filter((ref) => !presentedKeys.has(refKey(ref)));
  const observedKeys = new Set(example.post_checkpoint_observation?.observed_entries
    .map((entry) => refKey(entry.source_ref)) ?? []);
  if (presentedOnly.some((ref) => observedKeys.has(refKey(ref)))) {
    exclusionReasons.push("feature_source_after_checkpoint");
  }
  if (presentedOnly.some((ref) => !observedKeys.has(refKey(ref))) || checkpointedOnly.length > 0) {
    exclusionReasons.push("feature_source_not_manifested");
  }
  return {
    subject,
    example_ref: task3RecordRef(example.preference),
    feature_as_of_digest: featureAsOfDigest,
    presented_feature_refs: presented,
    checkpointed_feature_refs: checkpointed,
    normalized_a: null,
    normalized_b: null,
    exclusion_reasons: exclusionReasons,
  };
}

function verifyMembershipEvidence(material: CompleteRelationMaterial): void {
  assertExactKeys(material, ["material_kind", "material_ref", "source_class", "rights_state", "value"]);
  if (material.material_kind !== "relation_membership_evidence"
    || !ALLOWED_SOURCE_CLASSES.includes(material.source_class)
    || material.rights_state !== "training_permitted") task3FailContract("leakage_relationship");
  assertDigestRef(material.material_ref);
  const value = material.value;
  assertExactKeys(value, [
    "contract_version", "evidence_id", "evidence_version", "verification_mode", "authority_effect",
    "source_class", "rights_state", "evidence", "evidence_digest",
  ]);
  if (value.contract_version !== "contentmd.relation-membership-evidence/0.1.0"
    || value.evidence_version !== "0.1.0"
    || value.verification_mode !== "development_fixture"
    || value.authority_effect !== "none"
    || value.source_class !== material.source_class
    || value.rights_state !== material.rights_state) task3FailContract("leakage_relationship");
  const payloadKeys: Readonly<Record<DeclaredLeakageReason, readonly string[]>> = {
    message_lineage: ["evidence_kind", "semantic_subject_ref", "member_candidate_refs"],
    supersession: ["evidence_kind", "predecessor_candidate_ref", "successor_candidate_ref"],
    task_family: ["evidence_kind", "family_id", "member_task_refs"],
    template_family: ["evidence_kind", "family_id", "member_candidate_refs"],
    source_occurrence: ["evidence_kind", "occurrence_id", "member_candidate_refs"],
    locale_variant: ["evidence_kind", "variant_family_id", "context_values"],
    channel_variant: ["evidence_kind", "variant_family_id", "context_values"],
  };
  const evidenceKind = (value.evidence as { evidence_kind?: unknown }).evidence_kind;
  if (typeof evidenceKind !== "string" || !DECLARED_LEAKAGE_REASONS.includes(evidenceKind as DeclaredLeakageReason)) {
    task3FailContract("leakage_relationship");
  }
  assertExactKeys(value.evidence, payloadKeys[evidenceKind as DeclaredLeakageReason]);
  if (evidenceKind === "message_lineage") {
    const evidence = value.evidence as Extract<RelationMembershipEvidencePayload, { evidence_kind: "message_lineage" }>;
    assertDigestRef(evidence.semantic_subject_ref);
    if (!Array.isArray(evidence.member_candidate_refs) || evidence.member_candidate_refs.length === 0) {
      task3FailContract("leakage_relationship");
    }
    evidence.member_candidate_refs.forEach(assertDigestRef);
    assertSortedUnique(evidence.member_candidate_refs, false);
  } else if (evidenceKind === "supersession") {
    const evidence = value.evidence as Extract<RelationMembershipEvidencePayload, { evidence_kind: "supersession" }>;
    assertDigestRef(evidence.predecessor_candidate_ref);
    assertDigestRef(evidence.successor_candidate_ref);
    if (task3RefsEqual(evidence.predecessor_candidate_ref, evidence.successor_candidate_ref)) {
      task3FailContract("leakage_relationship");
    }
  } else if (evidenceKind === "task_family") {
    const evidence = value.evidence as Extract<RelationMembershipEvidencePayload, { evidence_kind: "task_family" }>;
    assertText(evidence.family_id, "leakage_relationship");
    if (!Array.isArray(evidence.member_task_refs) || evidence.member_task_refs.length === 0) {
      task3FailContract("leakage_relationship");
    }
    evidence.member_task_refs.forEach(assertDigestRef);
    assertSortedUnique(evidence.member_task_refs, false);
  } else if (evidenceKind === "template_family" || evidenceKind === "source_occurrence") {
    const evidence = value.evidence as Extract<RelationMembershipEvidencePayload, { evidence_kind: "template_family" | "source_occurrence" }>;
    assertText(evidence.evidence_kind === "template_family" ? evidence.family_id : evidence.occurrence_id, "leakage_relationship");
    if (!Array.isArray(evidence.member_candidate_refs) || evidence.member_candidate_refs.length === 0) {
      task3FailContract("leakage_relationship");
    }
    evidence.member_candidate_refs.forEach(assertDigestRef);
    assertSortedUnique(evidence.member_candidate_refs, false);
  } else {
    const evidence = value.evidence as Extract<RelationMembershipEvidencePayload, { evidence_kind: "locale_variant" | "channel_variant" }>;
    assertText(evidence.variant_family_id, "leakage_relationship");
    if (!Array.isArray(evidence.context_values) || evidence.context_values.length === 0) {
      task3FailContract("leakage_relationship");
    }
    for (const context of evidence.context_values) {
      assertExactKeys(context, ["context_ref", "observed_value"]);
      assertDigestRef(context.context_ref);
      assertText(context.observed_value, "leakage_relationship");
    }
    assertSortedUnique(evidence.context_values, false);
  }
  assertRecordId(value.evidence_id);
  assertDigest(value.evidence_digest);
  const identity = {
    contract_version: value.contract_version,
    evidence_version: value.evidence_version,
    verification_mode: value.verification_mode,
    authority_effect: value.authority_effect,
    source_class: value.source_class,
    rights_state: value.rights_state,
    evidence: value.evidence,
  };
  if (value.evidence_id !== `relation-membership-evidence.${sha256Canonical(identity)}`) {
    task3FailContract("leakage_relationship");
  }
  const { evidence_digest: _digest, ...content } = value;
  if (value.evidence_digest !== sha256Canonical(content)) task3FailContract("leakage_relationship");
  if (material.material_ref.record_id !== value.evidence_id
    || material.material_ref.schema_id !== "contentmd.task3-relation-membership-evidence"
    || material.material_ref.schema_version !== "0.1.0"
    || material.material_ref.content_digest !== value.evidence_digest) task3FailContract("leakage_relationship");
}

function candidateBindingProjection(
  binding: RelationCandidateBinding,
  example: DatasetExampleEvidence,
): DigestRef[] {
  assertExactKeys(binding, ["example_ref", "candidate_sides", "candidate_refs"]);
  assertDigestRef(binding.example_ref);
  if (!Array.isArray(binding.candidate_sides)
    || !canonicalEqual(binding.candidate_sides, ["A"])
      && !canonicalEqual(binding.candidate_sides, ["B"])
      && !canonicalEqual(binding.candidate_sides, ["A", "B"])) task3FailContract("leakage_relationship");
  if (!Array.isArray(binding.candidate_refs) || binding.candidate_refs.length !== binding.candidate_sides.length) {
    task3FailContract("leakage_relationship");
  }
  const expected = binding.candidate_sides.map((side) => task2SnapshotRef(
    side === "A" ? example.qualification_input.candidate_a : example.qualification_input.candidate_b,
  ));
  if (!canonicalEqual(binding.candidate_refs, expected)) task3FailContract("leakage_relationship");
  return expected;
}

function exampleForRef(
  subjects: ReadonlyMap<string, VerifiedDatasetExample>,
  ref: DigestRef,
): VerifiedDatasetExample {
  assertDigestRef(ref);
  const example = subjects.get(refKey(ref));
  if (example === undefined) task3FailContract("leakage_universe");
  return example;
}

function candidateSideForRef(example: DatasetExampleEvidence, ref: DigestRef): "A" | "B" | null {
  if (task3RefsEqual(ref, task2SnapshotRef(example.qualification_input.candidate_a))) return "A";
  if (task3RefsEqual(ref, task2SnapshotRef(example.qualification_input.candidate_b))) return "B";
  return null;
}

function verifyRelationNode(
  node: LeakageRelationNode,
  subjects: ReadonlyMap<string, VerifiedDatasetExample>,
  materials: ReadonlyMap<string, CompleteRelationMaterial>,
  nodesById: ReadonlyMap<string, LeakageRelationNode>,
): void {
  assertExactKeys(node, [
    "contract_version", "relation_id", "reason", "basis", "member_example_refs", "evidence_refs",
    "source_class", "rights_state", "relation_digest",
  ]);
  if (node.contract_version !== "contentmd.leakage-relation/0.1.0"
    || !DECLARED_LEAKAGE_REASONS.includes(node.reason)
    || node.basis.basis_kind !== node.reason
    || !ALLOWED_SOURCE_CLASSES.includes(node.source_class)
    || node.rights_state !== "training_permitted") task3FailContract("leakage_relationship");
  const basisKeys: Readonly<Record<DeclaredLeakageReason, readonly string[]>> = {
    message_lineage: ["basis_kind", "semantic_subject_ref", "bindings", "membership_evidence_ref"],
    supersession: ["basis_kind", "predecessor", "successor", "membership_evidence_ref"],
    task_family: ["basis_kind", "family_id", "bindings", "membership_evidence_ref"],
    template_family: ["basis_kind", "family_id", "bindings", "membership_evidence_ref"],
    source_occurrence: ["basis_kind", "occurrence_id", "bindings", "membership_evidence_ref"],
    locale_variant: ["basis_kind", "variant_family_id", "message_lineage_relation_id", "bindings", "membership_evidence_ref"],
    channel_variant: ["basis_kind", "variant_family_id", "message_lineage_relation_id", "bindings", "membership_evidence_ref"],
  };
  assertExactKeys(node.basis, basisKeys[node.reason]);
  assertDigestRef(node.basis.membership_evidence_ref);
  assertRecordId(node.relation_id);
  assertDigest(node.relation_digest);
  if (!Array.isArray(node.member_example_refs) || node.member_example_refs.length === 0
    || !Array.isArray(node.evidence_refs) || node.evidence_refs.length !== 1) task3FailContract("leakage_relationship");
  node.member_example_refs.forEach(assertDigestRef);
  node.evidence_refs.forEach(assertDigestRef);
  assertSortedUnique(node.member_example_refs, false);
  assertSortedUnique(node.evidence_refs, false);
  node.member_example_refs.forEach((ref) => exampleForRef(subjects, ref));
  const material = materials.get(refKey(node.evidence_refs[0]!));
  if (material === undefined || !task3RefsEqual(node.basis.membership_evidence_ref, node.evidence_refs[0]!)) {
    task3FailContract("leakage_relationship");
  }
  const evidence = material.value.evidence;
  if (evidence.evidence_kind !== node.reason
    || material.source_class !== node.source_class
    || material.rights_state !== node.rights_state) task3FailContract("leakage_relationship");

  let derivedMembers: DigestRef[] = [];
  if (node.reason === "message_lineage" && node.basis.basis_kind === "message_lineage"
    && evidence.evidence_kind === "message_lineage") {
    const basis = node.basis;
    assertDigestRef(basis.semantic_subject_ref);
    if (!Array.isArray(basis.bindings) || basis.bindings.length === 0) task3FailContract("leakage_relationship");
    assertSortedUnique(basis.bindings, false);
    if (new Set(basis.bindings.map((binding) => refKey(binding.example_ref))).size !== basis.bindings.length) {
      task3FailContract("leakage_relationship");
    }
    const candidateRefs: DigestRef[] = [];
    derivedMembers = basis.bindings.map((binding) => {
      const verified = exampleForRef(subjects, binding.example_ref);
      const refs = candidateBindingProjection(binding, verified.subject.example);
      candidateRefs.push(...refs);
      for (const ref of refs) {
        const side = candidateSideForRef(verified.subject.example, ref)!;
        const lineage = side === "A"
          ? verified.subject.example.qualification_input.lineage_a
          : verified.subject.example.qualification_input.lineage_b;
        if (!lineage.payload.nodes.some((candidate) => task3RefsEqual(candidate.subject_ref, basis.semantic_subject_ref))) {
          task3FailContract("leakage_relationship");
        }
      }
      return binding.example_ref;
    });
    const uniqueCandidates = task3SortCanonical(candidateRefs.filter((ref, index, all) =>
      all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index));
    if (!task3RefsEqual(evidence.semantic_subject_ref, basis.semantic_subject_ref)
      || !canonicalEqual(evidence.member_candidate_refs, uniqueCandidates)) task3FailContract("leakage_relationship");
  } else if (node.reason === "supersession" && node.basis.basis_kind === "supersession"
    && evidence.evidence_kind === "supersession") {
    const basis = node.basis;
    assertExactKeys(basis.predecessor, ["example_ref", "candidate_ref"]);
    assertExactKeys(basis.successor, ["example_ref", "candidate_ref"]);
    assertDigestRef(basis.predecessor.example_ref);
    assertDigestRef(basis.predecessor.candidate_ref);
    assertDigestRef(basis.successor.example_ref);
    assertDigestRef(basis.successor.candidate_ref);
    const predecessor = exampleForRef(subjects, basis.predecessor.example_ref);
    const successor = exampleForRef(subjects, basis.successor.example_ref);
    const predecessorSide = candidateSideForRef(predecessor.subject.example, basis.predecessor.candidate_ref);
    const successorSide = candidateSideForRef(successor.subject.example, basis.successor.candidate_ref);
    if (predecessorSide === null || successorSide === null
      || task3RefsEqual(basis.predecessor.example_ref, basis.successor.example_ref)
      || task3RefsEqual(basis.predecessor.candidate_ref, basis.successor.candidate_ref)) {
      task3FailContract("leakage_relationship");
    }
    const successorLineage = successorSide === "A"
      ? successor.subject.example.qualification_input.lineage_a
      : successor.subject.example.qualification_input.lineage_b;
    const root = successorLineage.payload.nodes.find((candidate) =>
      task3RefsEqual(candidate.subject_ref, basis.successor.candidate_ref));
    if (root === undefined || !includesRef(root.parent_refs, basis.predecessor.candidate_ref)
      || !task3RefsEqual(evidence.predecessor_candidate_ref, basis.predecessor.candidate_ref)
      || !task3RefsEqual(evidence.successor_candidate_ref, basis.successor.candidate_ref)) {
      task3FailContract("leakage_relationship");
    }
    derivedMembers = [basis.predecessor.example_ref, basis.successor.example_ref];
    if (node.member_example_refs.length !== 2) task3FailContract("leakage_relationship");
  } else if (node.reason === "task_family" && node.basis.basis_kind === "task_family"
    && evidence.evidence_kind === "task_family") {
    assertText(node.basis.family_id, "leakage_relationship");
    if (!Array.isArray(node.basis.bindings) || node.basis.bindings.length === 0) task3FailContract("leakage_relationship");
    assertSortedUnique(node.basis.bindings, false);
    if (new Set(node.basis.bindings.map((binding) => refKey(binding.example_ref))).size !== node.basis.bindings.length) {
      task3FailContract("leakage_relationship");
    }
    const taskRefs: DigestRef[] = [];
    derivedMembers = node.basis.bindings.map((binding) => {
      assertExactKeys(binding, ["example_ref", "task_ref"]);
      const verified = exampleForRef(subjects, binding.example_ref);
      const expected = task2SnapshotRef(verified.subject.example.qualification_input.task);
      if (!task3RefsEqual(binding.task_ref, expected)) task3FailContract("leakage_relationship");
      taskRefs.push(binding.task_ref);
      return binding.example_ref;
    });
    if (evidence.family_id !== node.basis.family_id
      || !canonicalEqual(evidence.member_task_refs, task3SortCanonical(taskRefs.filter((ref, index, all) =>
        all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index)))) task3FailContract("leakage_relationship");
  } else if ((node.reason === "template_family" || node.reason === "source_occurrence")
    && (node.basis.basis_kind === "template_family" || node.basis.basis_kind === "source_occurrence")
    && (evidence.evidence_kind === "template_family" || evidence.evidence_kind === "source_occurrence")) {
    const candidateRefs: DigestRef[] = [];
    if (!Array.isArray(node.basis.bindings) || node.basis.bindings.length === 0) task3FailContract("leakage_relationship");
    assertSortedUnique(node.basis.bindings, false);
    if (new Set(node.basis.bindings.map((binding) => refKey(binding.example_ref))).size !== node.basis.bindings.length) {
      task3FailContract("leakage_relationship");
    }
    derivedMembers = node.basis.bindings.map((binding) => {
      const verified = exampleForRef(subjects, binding.example_ref);
      candidateRefs.push(...candidateBindingProjection(binding, verified.subject.example));
      return binding.example_ref;
    });
    const expectedRefs = task3SortCanonical(candidateRefs.filter((ref, index, all) =>
      all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index));
    const keyMatches = node.reason === "template_family"
      ? node.basis.basis_kind === "template_family" && evidence.evidence_kind === "template_family"
        && node.basis.family_id === evidence.family_id
      : node.basis.basis_kind === "source_occurrence" && evidence.evidence_kind === "source_occurrence"
        && node.basis.occurrence_id === evidence.occurrence_id;
    if (!keyMatches || !canonicalEqual(evidence.member_candidate_refs, expectedRefs)) {
      task3FailContract("leakage_relationship");
    }
  } else if ((node.reason === "locale_variant" || node.reason === "channel_variant")
    && (node.basis.basis_kind === "locale_variant" || node.basis.basis_kind === "channel_variant")
    && (evidence.evidence_kind === "locale_variant" || evidence.evidence_kind === "channel_variant")) {
    const lineage = nodesById.get(node.basis.message_lineage_relation_id);
    assertText(node.basis.variant_family_id, "leakage_relationship");
    assertRecordId(node.basis.message_lineage_relation_id);
    if (!Array.isArray(node.basis.bindings) || node.basis.bindings.length === 0) task3FailContract("leakage_relationship");
    assertSortedUnique(node.basis.bindings, false);
    if (new Set(node.basis.bindings.map((binding) => refKey(binding.example_ref))).size !== node.basis.bindings.length) {
      task3FailContract("leakage_relationship");
    }
    if (lineage?.reason !== "message_lineage") task3FailContract("leakage_relationship");
    const contextValues: { context_ref: DigestRef; observed_value: string }[] = [];
    derivedMembers = node.basis.bindings.map((binding) => {
      assertExactKeys(binding, ["example_ref", "context_ref", "observed_value"]);
      const verified = exampleForRef(subjects, binding.example_ref);
      const expectedContext = task2SnapshotRef(verified.subject.example.qualification_input.context);
      const expectedValue = node.reason === "locale_variant"
        ? verified.subject.example.qualification_input.context.payload.locale
        : verified.subject.example.qualification_input.context.payload.channel;
      if (!task3RefsEqual(binding.context_ref, expectedContext) || binding.observed_value !== expectedValue
        || !lineage.member_example_refs.some((ref) => task3RefsEqual(ref, binding.example_ref))) {
        task3FailContract("leakage_relationship");
      }
      contextValues.push({ context_ref: binding.context_ref, observed_value: binding.observed_value });
      return binding.example_ref;
    });
    const expectedKey = node.reason === "locale_variant" ? node.basis.variant_family_id : node.basis.variant_family_id;
    if (evidence.variant_family_id !== expectedKey
      || !canonicalEqual(evidence.context_values, task3SortCanonical(contextValues.filter((value, index, all) =>
        all.findIndex((candidate) => canonicalEqual(candidate, value)) === index)))
      || (derivedMembers.length > 1 && new Set(contextValues.map((value) => value.observed_value)).size < 2)) {
      task3FailContract("leakage_relationship");
    }
  } else {
    task3FailContract("leakage_relationship");
  }
  const uniqueDerivedMembers = task3SortCanonical(derivedMembers.filter((ref, index, all) =>
    all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index));
  if (!canonicalEqual(node.member_example_refs, uniqueDerivedMembers)) task3FailContract("leakage_relationship");
  const identity = {
    contract_version: "contentmd.leakage-relation-identity/0.1.0",
    reason: node.reason,
    basis: node.basis,
    member_example_refs: node.member_example_refs,
    evidence_refs: node.evidence_refs,
    source_class: node.source_class,
    rights_state: node.rights_state,
  };
  const digest = sha256Canonical(identity);
  const segment = node.reason.replaceAll("_", "-");
  if (node.relation_digest !== digest || node.relation_id !== `leakage-relation.${segment}.${digest}`) {
    task3FailContract("leakage_relationship");
  }
}

export interface VerifiedLeakageEvidence {
  examples: VerifiedDatasetExample[];
  subjects_by_ref: Map<string, VerifiedDatasetExample>;
  nodes_by_id: Map<string, LeakageRelationNode>;
  materials_by_ref: Map<string, CompleteRelationMaterial>;
}

export function verifyLeakageEvidenceSnapshot(snapshot: LeakageEvidenceSnapshot): VerifiedLeakageEvidence {
  task3PreflightTopLevelRecordMode(snapshot, [
    "contract_version", "snapshot_id", "snapshot_version", "record_mode", "cohort_scope",
    "enumeration_state", "subjects", "relation_nodes", "additional_materials", "snapshot_digest",
  ]);
  task3PreflightDescriptorChildKeys(snapshot, "cohort_scope", ["memory_scope", "project_id"]);
  task3PreflightDescriptorArrayItemKeys(snapshot, "subjects", ["example", "relation_ids"]);
  task3PreflightLeakageEvidenceShape(snapshot);
  task3AssertCanonicalGraph(snapshot);
  task3PreflightGlobalIntegrity(snapshot);
  assertExactKeys(snapshot, [
    "contract_version", "snapshot_id", "snapshot_version", "record_mode", "cohort_scope",
    "enumeration_state", "subjects", "relation_nodes", "additional_materials", "snapshot_digest",
  ]);
  if (snapshot.contract_version !== "contentmd.leakage-evidence-snapshot/0.1.0"
    || snapshot.snapshot_version !== "0.1.0"
    || snapshot.enumeration_state !== "complete") task3FailContract("leakage_universe");
  if (snapshot.record_mode !== "development_fixture") {
    if (snapshot.record_mode === "official") task3FailContract("official_mode_not_supported");
    task3FailContract("input_shape");
  }
  assertExactKeys(snapshot.cohort_scope, ["memory_scope", "project_id"]);
  if (!MEMORY_SCOPES.includes(snapshot.cohort_scope.memory_scope)
    || snapshot.cohort_scope.project_id !== null && (typeof snapshot.cohort_scope.project_id !== "string" || snapshot.cohort_scope.project_id.length === 0)) {
    task3FailContract("scope_mismatch");
  }
  if (!Array.isArray(snapshot.subjects) || snapshot.subjects.length === 0
    || !Array.isArray(snapshot.relation_nodes) || snapshot.relation_nodes.length === 0
    || !Array.isArray(snapshot.additional_materials)) task3FailContract("input_shape");
  const examples = snapshot.subjects.map(verifyDatasetExample);
  assertSortedUnique(examples.map((example) => example.example_ref), false);
  const subjectsByRef = new Map(examples.map((example) => [refKey(example.example_ref), example]));
  if (subjectsByRef.size !== examples.length) task3FailContract("leakage_universe");
  snapshot.additional_materials.forEach(verifyMembershipEvidence);
  assertSortedUnique(snapshot.additional_materials.map((material) => material.material_ref));
  const materialsByRef = new Map(snapshot.additional_materials.map((material) => [refKey(material.material_ref), material]));
  if (materialsByRef.size !== snapshot.additional_materials.length) task3FailContract("leakage_universe");
  if (snapshot.relation_nodes.some((node, index) => index > 0 && node.relation_id <= snapshot.relation_nodes[index - 1]!.relation_id)) {
    task3FailContract("set_uniqueness_or_order");
  }
  const nodesById = new Map(snapshot.relation_nodes.map((node) => [node.relation_id, node]));
  if (nodesById.size !== snapshot.relation_nodes.length) task3FailContract("leakage_universe");
  snapshot.relation_nodes.forEach((node) => verifyRelationNode(node, subjectsByRef, materialsByRef, nodesById));
  const referencedMaterialKeys = new Set(snapshot.relation_nodes.flatMap((node) => node.evidence_refs.map(refKey)));
  if (referencedMaterialKeys.size !== materialsByRef.size
    || [...materialsByRef.keys()].some((key) => !referencedMaterialKeys.has(key))) {
    task3FailContract("leakage_universe");
  }
  const blockingKeys = new Set(examples.flatMap((example) =>
    example.subject.example.blocking_evidence.map((blocking) => refKey(blocking.evidence_ref))));
  if (blockingKeys.size > 0) {
    const nonBlockingRefs = new Set<string>();
    for (const example of examples) {
      const { blocking_evidence: _blocking, ...otherEvidence } = example.subject.example;
      collectDigestRefKeys(otherEvidence, nonBlockingRefs);
    }
    collectDigestRefKeys(snapshot.relation_nodes, nonBlockingRefs);
    collectDigestRefKeys(snapshot.additional_materials, nonBlockingRefs);
    if ([...blockingKeys].some((key) => nonBlockingRefs.has(key))) task3FailContract("leakage_universe");
  }
  for (const verified of examples) {
    const expectedRelations = snapshot.relation_nodes
      .filter((node) => node.member_example_refs.some((ref) => task3RefsEqual(ref, verified.example_ref)))
      .map((node) => node.relation_id)
      .sort();
    if (!canonicalEqual(verified.subject.relation_ids, expectedRelations)
      || !expectedRelations.some((relationId) => nodesById.get(relationId)?.reason === "message_lineage")) {
      task3FailContract("leakage_universe");
    }
  }
  const identity = {
    contract_version: snapshot.contract_version,
    snapshot_version: snapshot.snapshot_version,
    record_mode: snapshot.record_mode,
    cohort_scope: snapshot.cohort_scope,
    enumeration_state: snapshot.enumeration_state,
    subjects: snapshot.subjects,
    relation_nodes: snapshot.relation_nodes,
    additional_materials: snapshot.additional_materials,
  };
  if (snapshot.snapshot_id !== `leakage-evidence.${sha256Canonical(identity)}`) task3FailContract("leakage_universe");
  const { snapshot_digest: _digest, ...content } = snapshot;
  if (snapshot.snapshot_digest !== sha256Canonical(content)) task3FailContract("snapshot_digest");
  return { examples, subjects_by_ref: subjectsByRef, nodes_by_id: nodesById, materials_by_ref: materialsByRef };
}

function candidateTrace(
  leftSide: "A" | "B",
  rightSide: "A" | "B",
  left: readonly number[],
  right: readonly number[],
): CandidateSimilarityTrace {
  const leftTrigrams = scalarTrigramSet(left);
  const rightTrigrams = scalarTrigramSet(right);
  const rightSet = new Set(rightTrigrams);
  const intersectionSize = leftTrigrams.filter((key) => rightSet.has(key)).length;
  const unionSize = new Set([...leftTrigrams, ...rightTrigrams]).size;
  return {
    left_side: leftSide,
    right_side: rightSide,
    left_normalized_scalars: [...left],
    right_normalized_scalars: [...right],
    left_trigram_keys: leftTrigrams,
    right_trigram_keys: rightTrigrams,
    intersection_size: intersectionSize,
    union_size: unionSize,
    near_duplicate: areNearDuplicates(left, right),
  };
}

function pairTrace(left: VerifiedDatasetExample, right: VerifiedDatasetExample): ExamplePairSimilarityTrace {
  if (left.normalized_a === null || left.normalized_b === null
    || right.normalized_a === null || right.normalized_b === null) task3FailContract("unicode_scalar");
  const comparisons = [
    candidateTrace("A", "A", left.normalized_a, right.normalized_a),
    candidateTrace("A", "B", left.normalized_a, right.normalized_b),
    candidateTrace("B", "A", left.normalized_b, right.normalized_a),
    candidateTrace("B", "B", left.normalized_b, right.normalized_b),
  ] as [CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace, CandidateSimilarityTrace];
  const preimage = {
    left_example_ref: left.example_ref,
    right_example_ref: right.example_ref,
    comparisons,
    near_duplicate: comparisons.some((comparison) => comparison.near_duplicate),
  };
  return { ...preimage, trace_digest: sha256Canonical(preimage) };
}

function edgeCompare(left: LeakageEdge, right: LeakageEdge): number {
  const leftRef = task3CanonicalCompare(left.left_ref, right.left_ref);
  if (leftRef !== 0) return leftRef;
  const rightRef = task3CanonicalCompare(left.right_ref, right.right_ref);
  if (rightRef !== 0) return rightRef;
  return EDGE_REASON_ORDER.indexOf(left.reason) - EDGE_REASON_ORDER.indexOf(right.reason);
}

function orientEdge(left: DigestRef, right: DigestRef, reason: LeakageEdge["reason"]): LeakageEdge {
  if (task3RefsEqual(left, right)) task3FailContract("group_identity");
  return task3CanonicalCompare(left, right) < 0
    ? { left_ref: left, right_ref: right, reason }
    : { left_ref: right, right_ref: left, reason };
}

class UnionFind {
  readonly #parent = new Map<string, string>();

  add(key: string): void { this.#parent.set(key, key); }

  find(key: string): string {
    const parent = this.#parent.get(key);
    if (parent === undefined) task3FailContract("dataset_partition");
    if (parent === key) return key;
    const root = this.find(parent);
    this.#parent.set(key, root);
    return root;
  }

  union(left: string, right: string): void {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (leftRoot === rightRoot) return;
    this.#parent.set(leftRoot < rightRoot ? rightRoot : leftRoot, leftRoot < rightRoot ? leftRoot : rightRoot);
  }
}

function sortTextUtf8(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((left, right) => Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
}

function normalizationRefs(bundle: UnicodeArtifactBundle): [ArtifactRef, ArtifactRef, ArtifactRef] {
  return [bundle.normalization.artifact_ref, bundle.casefold.artifact_ref, bundle.whitespace.artifact_ref]
    .sort((left, right) => Buffer.compare(Buffer.from(left.artifact_id, "utf8"), Buffer.from(right.artifact_id, "utf8"))) as [ArtifactRef, ArtifactRef, ArtifactRef];
}

function admittedProjection(example: DatasetExampleEvidence): AdmittedGroupingEvidence {
  return {
    qualification_input: example.qualification_input,
    qualification: example.qualification,
    eligibility_input: example.eligibility_input,
    eligibility: example.eligibility,
    preference_input: example.preference_input,
    preference: example.preference,
    feature_checkpoint_set: example.feature_checkpoint_set,
  };
}

export function verifyLeakageGroupRecord(group: LeakageGroupRecord): void {
  task3TopLevelShape(group, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task3PreflightDescriptorChildKeys(group, "scope", ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  task3PreflightDescriptorProvenance(group);
  task3PreflightDescriptorChildKeys(group, "payload", [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
    "code_digest", "input_digest", "authority_effect", "rule_version", "normalization_artifact_refs",
    "member_refs", "edges", "bucket", "split", "group_state",
  ]);
  const groupPayload = task3DescriptorDataValue(group, "payload");
  if (groupPayload !== undefined) {
    task3PreflightDescriptorArrayItemKeys(groupPayload, "normalization_artifact_refs", [
      "artifact_id", "artifact_version", "artifact_digest",
    ]);
    task3PreflightDescriptorArrayItemKeys(groupPayload, "member_refs", [
      "record_id", "schema_id", "schema_version", "content_digest",
    ]);
    task3PreflightDescriptorArrayItemKeys(groupPayload, "edges", ["left_ref", "right_ref", "reason"]);
  }
  task3PreflightLeakageGroupShape(group);
  task3AssertCanonicalGraph(group);
  task3PreflightGlobalIntegrity(group);
  assertExactKeys(group, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  assertExactKeys(group.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!Array.isArray(group.scope.resource_refs) || !Array.isArray(group.scope.data_classes)
    || !Array.isArray(group.provenance)) task3FailContract("input_shape");
  for (const provenance of group.provenance) {
    assertExactKeys(provenance, ["record_id", "relationship", "content_digest"]);
  }
  assertExactKeys(group.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
    "code_digest", "input_digest", "authority_effect", "rule_version", "normalization_artifact_refs",
    "member_refs", "edges", "bucket", "split", "group_state",
  ]);
  if (!Array.isArray(group.payload.normalization_artifact_refs)
    || !Array.isArray(group.payload.member_refs)
    || !Array.isArray(group.payload.edges)) task3FailContract("input_shape");
  for (const ref of group.payload.normalization_artifact_refs) assertArtifactRef(ref);
  for (const ref of group.payload.member_refs) assertDigestRef(ref);
  for (const edge of group.payload.edges) {
    assertExactKeys(edge, ["left_ref", "right_ref", "reason"]);
    assertDigestRef(edge.left_ref);
    assertDigestRef(edge.right_ref);
  }
  if (group.schema_id !== LEARNING_SCHEMA_IDS.leakageGroup
    || group.schema_version !== "0.1.0"
    || group.record_version !== 1) task3FailContract("schema_id");
  if (!/^leakage-group\.[a-f0-9]{64}$/.test(group.record_id)) task3FailContract("record_id");
  if (verifyRecordDigest(group).valid !== true) task3FailContract("durable_record_digest");
  if (group.lifecycle_state !== "active") task3FailContract("group_identity");
  if (group.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || group.payload.record_mode !== "development_fixture"
    || group.payload.ranking_objective !== "expression_preference"
    || group.payload.candidate_kind !== "expression"
    || group.payload.authority_effect !== "none"
    || group.payload.rule_version !== "contentmd.leakage-group/0.1.0"
    || group.payload.group_state !== "frozen") task3FailContract("group_identity");
  [group.content_digest, group.payload.schema_digest, group.payload.code_digest, group.payload.input_digest]
    .forEach((digest) => assertDigest(digest));
  if (!Array.isArray(group.payload.normalization_artifact_refs)
    || group.payload.normalization_artifact_refs.length !== 3
    || !Array.isArray(group.payload.member_refs) || group.payload.member_refs.length === 0
    || !Array.isArray(group.payload.edges)) task3FailContract("input_shape");
  group.payload.normalization_artifact_refs.forEach(assertArtifactRef);
  group.payload.member_refs.forEach(assertDigestRef);
  if (group.payload.member_refs.some((ref) => ref.schema_id !== LEARNING_SCHEMA_IDS.preferenceExample)) {
    task3FailContract("reference_integrity");
  }
  if (group.payload.normalization_artifact_refs.some((ref, index) => index > 0
    && ref.artifact_id <= group.payload.normalization_artifact_refs[index - 1]!.artifact_id)) {
    task3FailContract("set_uniqueness_or_order");
  }
  if (!canonicalEqual(
    group.payload.normalization_artifact_refs.map((ref) => [ref.artifact_id, ref.artifact_version]),
    [
      ["unicode-casefold", "17.0.0"],
      ["unicode-normalization", "17.0.0"],
      ["unicode-whitespace", "17.0.0"],
    ],
  )) task3FailContract("unicode_artifact");
  assertSortedUnique(group.payload.member_refs, false);
  if (group.payload.edges.some((edge, index) => {
    assertExactKeys(edge, ["left_ref", "right_ref", "reason"]);
    assertDigestRef(edge.left_ref);
    assertDigestRef(edge.right_ref);
    return !EDGE_REASON_ORDER.includes(edge.reason)
      || edge.left_ref.schema_id !== LEARNING_SCHEMA_IDS.preferenceExample
      || edge.right_ref.schema_id !== LEARNING_SCHEMA_IDS.preferenceExample
      || task3RefsEqual(edge.left_ref, edge.right_ref)
      || !includesRef(group.payload.member_refs, edge.left_ref)
      || !includesRef(group.payload.member_refs, edge.right_ref)
      || index > 0 && edgeCompare(group.payload.edges[index - 1]!, edge) >= 0;
  })) task3FailContract("group_identity");
  if (group.payload.member_refs.length === 1 && group.payload.edges.length !== 0) task3FailContract("group_identity");
  if (!Number.isSafeInteger(group.payload.bucket) || group.payload.bucket < 0 || group.payload.bucket > 99
    || !["train", "validation", "test"].includes(group.payload.split)) task3FailContract("split_assignment");
  if (group.payload.member_refs.length > 1) {
    const connected = new UnionFind();
    group.payload.member_refs.forEach((ref) => connected.add(refKey(ref)));
    group.payload.edges.forEach((edge) => connected.union(refKey(edge.left_ref), refKey(edge.right_ref)));
    const roots = new Set(group.payload.member_refs.map((ref) => connected.find(refKey(ref))));
    if (roots.size !== 1) task3FailContract("group_identity");
  }
  const derived = deriveLearningSplit(group.record_id);
  if (group.payload.bucket !== derived.bucket || group.payload.split !== derived.split) {
    task3FailContract("split_assignment");
  }
  if (!Array.isArray(group.provenance) || group.provenance.length === 0
    || !canonicalEqual(group.provenance, task3SortProvenance(group.provenance))) task3FailContract("provenance");
  for (const provenance of group.provenance) {
    assertRecordId(provenance.record_id);
    assertText(provenance.relationship, "provenance");
    assertDigest(provenance.content_digest, "provenance");
  }
  if (!MEMORY_SCOPES.includes(group.scope.memory_scope)
    || group.scope.project_id !== null
      && (typeof group.scope.project_id !== "string" || group.scope.project_id.length === 0)
    || group.scope.resource_refs.length === 0
    || group.scope.data_classes.length === 0
    || group.scope.resource_refs.some((value) => typeof value !== "string" || value.length === 0)
    || group.scope.data_classes.some((value) => typeof value !== "string" || value.length === 0)
    || !canonicalEqual(group.scope.resource_refs, sortTextUtf8(group.scope.resource_refs))
    || !canonicalEqual(group.scope.data_classes, sortTextUtf8(group.scope.data_classes))) {
    task3FailContract("scope_mismatch");
  }
  if (!canonicalEqual(group.scope.resource_refs, sortTextUtf8(group.payload.member_refs.map((ref) => ref.record_id)))) {
    task3FailContract("scope_mismatch");
  }
}

export function deriveLeakageGroups(input: DeriveLeakageGroupsInput): DerivedLeakageGroups {
  task3PreflightTopLevelRecordMode(input, [
    "record_mode", "producer", "unicode_artifacts", "admitted_examples", "relation_nodes",
    "additional_materials",
  ]);
  const producerShape = task3DescriptorDataValue(input, "producer");
  if (producerShape !== undefined) task3PreflightProducerShape(producerShape);
  const admittedShape = task3DescriptorDataValue(input, "admitted_examples");
  if (admittedShape !== undefined) task3PreflightVerifiedExamplesShape(admittedShape);
  const relationShape = task3DescriptorDataValue(input, "relation_nodes");
  const materialShape = task3DescriptorDataValue(input, "additional_materials");
  if (relationShape !== undefined && materialShape !== undefined) {
    task3PreflightRelationClosureShape(relationShape, materialShape);
  }
  task3AssertCanonicalGraph(input);
  task3PreflightGlobalIntegrity(input);
  assertExactKeys(input, [
    "record_mode", "producer", "unicode_artifacts", "admitted_examples", "relation_nodes",
    "additional_materials",
  ]);
  if (input.record_mode !== "development_fixture") task3FailContract("official_mode_not_supported");
  const producer = verifyTask3Producer(input.producer, "leakage-group");
  const verifiedUnicode = task3VerifyUnicodeBundle(input.unicode_artifacts);
  if (!Array.isArray(input.admitted_examples) || input.admitted_examples.length === 0) {
    task3FailContract("dataset_partition");
  }
  assertSortedUnique(input.admitted_examples.map((example) => example.example_ref), false);
  const examples = input.admitted_examples.map((example) => {
    const replayed = verifyDatasetExample(example.subject);
    if (!task3RefsEqual(replayed.example_ref, example.example_ref)
      || replayed.feature_as_of_digest !== example.feature_as_of_digest
      || !canonicalEqual(replayed.presented_feature_refs, example.presented_feature_refs)
      || !canonicalEqual(replayed.checkpointed_feature_refs, example.checkpointed_feature_refs)
      || !canonicalEqual(replayed.exclusion_reasons, example.exclusion_reasons)) {
      task3FailContract("reference_integrity");
    }
    if (replayed.exclusion_reasons.length !== 0) task3FailContract("dataset_partition");
    return { ...example };
  });
  for (const example of examples) {
    const candidateA = example.subject.example.qualification_input.candidate_a.payload.expression;
    const candidateB = example.subject.example.qualification_input.candidate_b.payload.expression;
    example.normalized_a = task3NormalizeExpression(candidateA, verifiedUnicode);
    example.normalized_b = task3NormalizeExpression(candidateB, verifiedUnicode);
    if (example.normalized_a.length === 0 || example.normalized_b.length === 0) task3FailContract("dataset_partition");
  }
  const byRef = new Map(examples.map((example) => [refKey(example.example_ref), example]));
  input.additional_materials.forEach(verifyMembershipEvidence);
  assertSortedUnique(input.additional_materials.map((material) => material.material_ref));
  if (input.relation_nodes.some((node, index) => index > 0
    && node.relation_id <= input.relation_nodes[index - 1]!.relation_id)) task3FailContract("set_uniqueness_or_order");
  const materialValidationMap = new Map(input.additional_materials.map((material) => [refKey(material.material_ref), material]));
  const nodeValidationMap = new Map(input.relation_nodes.map((node) => [node.relation_id, node]));
  if (nodeValidationMap.size !== input.relation_nodes.length
    || materialValidationMap.size !== input.additional_materials.length) task3FailContract("leakage_universe");
  input.relation_nodes.forEach((node) => verifyRelationNode(node, byRef, materialValidationMap, nodeValidationMap));
  const requiredMaterialKeys = new Set(input.relation_nodes.flatMap((node) => node.evidence_refs.map(refKey)));
  if (requiredMaterialKeys.size !== materialValidationMap.size
    || [...materialValidationMap.keys()].some((key) => !requiredMaterialKeys.has(key))) {
    task3FailContract("leakage_universe");
  }
  for (const example of examples) {
    const expectedIds = input.relation_nodes
      .filter((node) => node.member_example_refs.some((ref) => task3RefsEqual(ref, example.example_ref)))
      .map((node) => node.relation_id)
      .sort();
    if (!canonicalEqual(example.subject.relation_ids, expectedIds)) task3FailContract("leakage_universe");
  }
  const union = new UnionFind();
  for (const key of byRef.keys()) union.add(key);
  const edgeMap = new Map<string, LeakageEdge>();
  const addEdge = (edge: LeakageEdge): void => {
    const key = canonicalJson(edge);
    edgeMap.set(key, edge);
    union.union(refKey(edge.left_ref), refKey(edge.right_ref));
  };
  for (const node of input.relation_nodes) {
    const members = node.member_example_refs.filter((ref) => byRef.has(refKey(ref)));
    if (members.length !== node.member_example_refs.length) task3FailContract("leakage_relationship");
    for (let left = 0; left < members.length; left += 1) {
      for (let right = left + 1; right < members.length; right += 1) {
        addEdge(orientEdge(members[left]!, members[right]!, node.reason));
      }
    }
  }
  const traces: ExamplePairSimilarityTrace[] = [];
  for (let left = 0; left < examples.length; left += 1) {
    for (let right = left + 1; right < examples.length; right += 1) {
      const trace = pairTrace(examples[left]!, examples[right]!);
      traces.push(trace);
      if (trace.near_duplicate) addEdge(orientEdge(trace.left_example_ref, trace.right_example_ref, "near_duplicate"));
    }
  }
  traces.sort((left, right) => {
    const leftResult = task3CanonicalCompare(left.left_example_ref, right.left_example_ref);
    return leftResult === 0 ? task3CanonicalCompare(left.right_example_ref, right.right_example_ref) : leftResult;
  });
  const components = new Map<string, VerifiedDatasetExample[]>();
  for (const [key, example] of byRef) {
    const root = union.find(key);
    const component = components.get(root) ?? [];
    component.push(example);
    components.set(root, component);
  }
  const artifactRefs = normalizationRefs(input.unicode_artifacts);
  const materialByRef = new Map(input.additional_materials.map((material) => [refKey(material.material_ref), material]));
  const outputs: { group: LeakageGroupRecord; projection: ComponentEvidenceProjection }[] = [];
  for (const component of components.values()) {
    component.sort((left, right) => task3CanonicalCompare(left.example_ref, right.example_ref));
    const memberRefs = component.map((example) => example.example_ref) as [DigestRef, ...DigestRef[]];
    const memberKeys = new Set(memberRefs.map(refKey));
    const edges = [...edgeMap.values()]
      .filter((edge) => memberKeys.has(refKey(edge.left_ref)) && memberKeys.has(refKey(edge.right_ref)))
      .sort(edgeCompare);
    let contributingNodes = input.relation_nodes.filter((node) => {
      const members = node.member_example_refs.filter((ref) => memberKeys.has(refKey(ref)));
      return members.length >= 2;
    });
    if (component.length === 1) {
      if (edges.length !== 0) task3FailContract("group_identity");
      const singleton = component[0]!;
      const anchor = input.relation_nodes
        .filter((node) => node.reason === "message_lineage"
          && node.member_example_refs.some((ref) => task3RefsEqual(ref, singleton.example_ref)))
        .sort((left, right) => left.relation_id.localeCompare(right.relation_id, "en"))[0];
      if (anchor === undefined) task3FailContract("leakage_relationship");
      contributingNodes = [anchor];
    }
    contributingNodes = [...new Map(contributingNodes.map((node) => [node.relation_id, node])).values()]
      .sort((left, right) => left.relation_id.localeCompare(right.relation_id, "en"));
    const contributingIds = new Set(contributingNodes.map((node) => node.relation_id));
    const contributingMaterials = task3SortCanonical(contributingNodes.flatMap((node) =>
      node.evidence_refs.map((ref) => materialByRef.get(refKey(ref)) ?? task3FailContract("leakage_relationship")))
      .filter((material, index, all) => all.findIndex((candidate) =>
        task3RefsEqual(candidate.material_ref, material.material_ref)) === index));
    const componentTraces = traces.filter((trace) => memberKeys.has(refKey(trace.left_example_ref))
      && memberKeys.has(refKey(trace.right_example_ref)));
    const projectedSubjects = component.map((example) => ({
      example: admittedProjection(example.subject.example),
      contributing_relation_ids: example.subject.relation_ids.filter((id) => contributingIds.has(id)).sort(),
    })) as [ComponentSubjectProjection, ...ComponentSubjectProjection[]];
    const projectionIdentity = {
      contract_version: "contentmd.leakage-component-evidence/0.1.0" as const,
      subjects: projectedSubjects,
      contributing_relation_nodes: contributingNodes,
      contributing_additional_materials: contributingMaterials,
      normalization_artifacts: {
        normalization: input.unicode_artifacts.normalization,
        casefold: input.unicode_artifacts.casefold,
        whitespace: input.unicode_artifacts.whitespace,
      },
      pair_similarity_traces: componentTraces,
    };
    const projectionId = `leakage-component-evidence.${sha256Canonical(projectionIdentity)}`;
    const projectionWithoutDigest = { ...projectionIdentity, projection_id: projectionId };
    const projection: ComponentEvidenceProjection = {
      contract_version: projectionIdentity.contract_version,
      projection_id: projectionId,
      subjects: projectedSubjects,
      contributing_relation_nodes: contributingNodes,
      contributing_additional_materials: contributingMaterials,
      normalization_artifacts: projectionIdentity.normalization_artifacts,
      pair_similarity_traces: componentTraces,
      projection_digest: sha256Canonical(projectionWithoutDigest),
    };
    const relationCommitments = task3SortCanonical(contributingNodes.map((node) => ({
      relation_id: node.relation_id,
      relation_digest: node.relation_digest,
      evidence_refs: node.evidence_refs,
    }))) as RelationCommitment[];
    const groupIdentityPreimage = {
      contract_version: "contentmd.leakage-group-identity/0.1.0",
      rule_version: "contentmd.leakage-group/0.1.0",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      producer_manifest_digest: producer.producer_manifest_digest,
      normalization_artifact_refs: artifactRefs,
      member_refs: memberRefs,
      relation_commitments: relationCommitments,
      edges,
    };
    const groupIdentityDigest = sha256Canonical(groupIdentityPreimage);
    const groupId = `leakage-group.${groupIdentityDigest}`;
    const { bucket, split } = deriveLearningSplit(groupId);
    const firstScope = component[0]!.subject.example.preference.scope;
    if (component.some((example) => example.subject.example.preference.scope.memory_scope !== firstScope.memory_scope
      || example.subject.example.preference.scope.project_id !== firstScope.project_id)) task3FailContract("scope_mismatch");
    const derivedScope: RecordScope = {
      memory_scope: firstScope.memory_scope,
      project_id: firstScope.project_id,
      resource_refs: sortTextUtf8(component.map((example) => example.subject.example.preference.record_id)),
      data_classes: sortTextUtf8(component.flatMap((example) => example.subject.example.preference.scope.data_classes)),
    };
    const inputDigest = sha256Canonical({
      contract_version: "contentmd.leakage-group-input/0.1.0",
      record_mode: input.record_mode,
      producer_manifest_digest: producer.producer_manifest_digest,
      derived_output_scope: derivedScope,
      component_evidence_projection: projection,
      group_identity_digest: groupIdentityDigest,
      bucket,
      split,
    });
    const provenance = task3SortProvenance([
      { record_id: projection.projection_id, relationship: "leakage_component_evidence", content_digest: projection.projection_digest },
      ...component.map((example) => ({
        record_id: example.subject.example.preference.record_id,
        relationship: "member_example",
        content_digest: example.subject.example.preference.content_digest,
      })),
      ...contributingNodes.map((node) => ({
        record_id: node.relation_id,
        relationship: "leakage_relationship",
        content_digest: node.relation_digest,
      })),
      ...contributingMaterials.map((material) => ({
        record_id: material.value.evidence_id,
        relationship: "leakage_relationship_evidence",
        content_digest: material.value.evidence_digest,
      })),
      ...componentTraces.filter((trace) => trace.near_duplicate).map((trace) => ({
        record_id: `near-duplicate-trace.${trace.trace_digest}`,
        relationship: "leakage_relationship",
        content_digest: trace.trace_digest,
      })),
      ...artifactRefs.map((ref) => artifactProvenance(ref, "normalization_artifact")),
      ...task3SortCanonical(component.map((example) => task3CheckpointSetRef(example.subject.example.feature_checkpoint_set))
        .filter((ref, index, all) => all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index))
        .map((ref) => ({ record_id: ref.record_id, relationship: "feature_source_checkpoint_set", content_digest: ref.content_digest })),
    ]);
    const group = finalizeRecord({
      record_id: groupId,
      schema_id: LEARNING_SCHEMA_IDS.leakageGroup,
      schema_version: "0.1.0",
      record_version: 1,
      scope: derivedScope,
      provenance: provenance as [ProvenanceRef, ...ProvenanceRef[]],
      lifecycle_state: "active",
      payload: {
        contract_version: "contentmd.learning-record-contract/0.1.0",
        record_mode: input.record_mode,
        ranking_objective: "expression_preference",
        candidate_kind: "expression",
        schema_digest: producer.schema_digest,
        code_digest: producer.code_digest,
        input_digest: inputDigest,
        authority_effect: "none",
        rule_version: "contentmd.leakage-group/0.1.0",
        normalization_artifact_refs: artifactRefs,
        member_refs: memberRefs,
        edges,
        bucket,
        split,
        group_state: "frozen",
      },
    }) as unknown as LeakageGroupRecord;
    outputs.push({ group, projection });
  }
  outputs.sort((left, right) => left.group.record_id.localeCompare(right.group.record_id, "en"));
  const ids = new Map<string, string>();
  for (const { group } of outputs) {
    verifyLeakageGroupRecord(group);
    const prior = ids.get(group.record_id);
    if (prior !== undefined && prior !== group.content_digest) task3FailContract("group_identity");
    ids.set(group.record_id, group.content_digest);
  }
  return {
    groups: outputs.map(({ group }) => group),
    projections: outputs.map(({ projection }) => projection),
    traces,
  };
}
