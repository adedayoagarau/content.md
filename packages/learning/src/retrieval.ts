import { createHash } from "node:crypto";
import { posix } from "node:path";
import ts from "typescript-compiler";
import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
  type MemoryScope,
} from "@contentmd/core";
import {
  task2CompareRfc3339Instants,
  task2IsRfc3339,
  type RawUtf8Artifact,
  type VerificationReceiptRecord,
} from "./feedback.js";
import {
  normalizeForLeakage,
  verifyUnicodeArtifactBundle,
  type UnicodeArtifactBundle,
  type VerifiedUnicodeArtifactBundle,
} from "./unicode-normalization.js";
import type { StoreArtifactWitness } from "./leakage.js";
import type { ArtifactRef, DigestRef } from "./records.js";

export type Task4RecordMode = "development_fixture" | "official";
export type Task4AllowedSourceClass = "project_owned" | "project_owned_synthetic";
export type Task4QuarantinedSourceClass =
  | "browser_observed"
  | "competitor"
  | "third_party"
  | "nonconforming"
  | "unknown";

export type Task4Relationship =
  | "query_source"
  | "pattern_subject"
  | "scope_projection"
  | "projection_evidence"
  | "approval_evidence"
  | "rights_evidence"
  | "freshness_evidence"
  | "dispute_evidence"
  | "checkpoint_binding"
  | "feature_universe"
  | "feature_material"
  | "feature_profile"
  | "candidate_subject"
  | "runtime_artifact"
  | "producer_verification";

export type Task4ProvenanceRef =
  | {
    subject_kind: "digest_ref";
    ref: DigestRef;
    relationship: Exclude<Task4Relationship, "runtime_artifact">;
  }
  | {
    subject_kind: "artifact_ref";
    ref: ArtifactRef;
    relationship: "runtime_artifact" | "feature_universe";
  };

export interface Task4DependencyManifestEntry {
  path: string;
  raw_bytes_digest: string;
  runtime_dependency_paths: string[];
}

export interface Task4DependencyManifest {
  contract_version: "contentmd.task4-dependency-manifest/0.1.0";
  producer_id: Task4ProducerArtifactWitness["producer_id"];
  entry_paths: [string, ...string[]];
  resolution_profile: "node24-typescript59-esm-runtime-import-export-literal-dynamic-closure/0.1.0";
  resolution_artifacts: [{ path: string; raw_bytes_digest: string }, ...Array<{
    path: string;
    raw_bytes_digest: string;
  }>];
  entries: [Task4DependencyManifestEntry, ...Task4DependencyManifestEntry[]];
  dependency_manifest_digest: string;
}

export interface Task4ProducerArtifactWitness {
  contract_version: "contentmd.task4-producer-witness/0.1.0";
  producer_id:
    | "retrieval-snapshot"
    | "feature-profile"
    | "candidate-feature-vector"
    | "deterministic-baseline";
  contract_artifact: RawUtf8Artifact;
  schema_artifact: RawUtf8Artifact | null;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  resolution_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  dependency_manifest: Task4DependencyManifest;
  verification_mode: "development_fixture" | "build_verified";
  verification_receipt: VerificationReceiptRecord | null;
}

export interface Task4UnicodeRuntime {
  contract_version: "contentmd.task4-unicode-runtime/0.1.0";
  unicode_bundle: UnicodeArtifactBundle;
  runtime_profile: StoreArtifactWitness;
  runtime_digest: string;
}

export interface VerifiedTask4Producer {
  schema_digest: string;
  code_digest: string;
  producer_manifest_digest: string;
  producer_verification_ref: DigestRef | null;
}

export class Task4ContractError extends TypeError {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "Task4ContractError";
    this.code = code;
  }
}

export function task4FailContract(suffix: string): never {
  throw new Task4ContractError(`task4_contract_invalid:${suffix}`);
}

export type Task4IntegrityStage =
  | "canonical_value"
  | "producer_witness"
  | "unicode_runtime"
  | "digest"
  | "reference_binding"
  | "scope_mismatch"
  | "checkpoint_binding"
  | "feature_profile_binding"
  | "provenance"
  | "quarantined_expression_present"
  | "forbidden_input_field"
  | "numeric_nonfinite";

const TASK4_INTEGRITY_STAGE_ORDER: readonly Task4IntegrityStage[] = [
  "canonical_value",
  "producer_witness",
  "unicode_runtime",
  "digest",
  "reference_binding",
  "scope_mismatch",
  "checkpoint_binding",
  "feature_profile_binding",
  "provenance",
  "quarantined_expression_present",
  "forbidden_input_field",
  "numeric_nonfinite",
];

/**
 * Internal whole-graph stage runner. Each callback is deliberately
 * single-category and must exhaust that category across the supplied graph.
 * Constructors and hashes that depend on unresolved later stages run only
 * after this plan completes.
 */
export function task4RunStagePlan(
  stages: Partial<Readonly<Record<Task4IntegrityStage, () => void>>>,
): void {
  for (const stage of TASK4_INTEGRITY_STAGE_ORDER) stages[stage]?.();
}

const DIGEST = /^[a-f0-9]{64}$/;
const RECORD_ID = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const MEMORY_SCOPES: readonly MemoryScope[] = ["task", "personal", "project", "organization", "public"];
const ALLOWED_SOURCE_CLASSES: readonly Task4AllowedSourceClass[] = ["project_owned", "project_owned_synthetic"];
const QUARANTINED_SOURCE_CLASSES: readonly Task4QuarantinedSourceClass[] = [
  "browser_observed", "competitor", "third_party", "nonconforming", "unknown",
];
export const TASK4_FORBIDDEN_INPUT_FIELDS = [
  "actor_identity", "author_identity", "protected_class", "inferred_emotion", "inferred_vulnerability",
  "presentation_side", "presentation_order", "provider_alternative_order", "decision", "post_decision_outcome",
  "browser_expression", "competitor_expression", "third_party_expression",
] as const;
const TASK4_PRODUCER_CACHE = new Map<string, VerifiedTask4Producer>();
const TASK4_UNICODE_RUNTIME_CACHE = new Map<string, VerifiedTask4UnicodeRuntime>();
let TASK4_NUMERIC_DEFERRAL_DEPTH = 0;
const CONTRACT_PATH = "docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md";
const CONTRACT_DIGEST = "ef267d8533fd3d4dcd88c77f40b5555117df8d15034798ecf22f59d8b146d019";
const RUNTIME_PROFILE_DIGEST = "eef23dc9f2e6c1dcd46201291758d07f400d834e24076e2bc4beb451ae526696";
const RESOLUTION_ARTIFACT_DIGESTS: Readonly<Record<string, string>> = {
  "package.json": "b17d7c6ce0a063d79a3ba0b120af40b49a3e06222e4969bec1532195ce5cd39c",
  "packages/core/package.json": "ac30cbc0dde687457af18dac4ea25dae8fcb24ba9ded2e14469d27fff493a420",
  "packages/core/tsconfig.json": "e65448deef4c80a91d7141388282bd0e70c1565da8b4750101673247d06be85c",
  "packages/learning/package.json": "c589857a9d193bfa85e075c1e0a5eb18f162329f1c393ab527d6c1b37628b34a",
  "packages/learning/tsconfig.json": "41ecc76204c5edec36bfbe6534a89fbfe23f0523b2cac3b4aec7fa1596ea42ac",
  "pnpm-lock.yaml": "507cd2460c0752e4c02d49e5fa6dc019bf3fba512e0ae504220861eabd32c69f",
  "tsconfig.base.json": "2447d4312f6115cf97f808aa3b611c4a72a133736df134dab7377e6a639a30c2",
  "tsconfig.json": "8221a91bc77da14f98779b37e87bce105feaa290e4f54c5536f946695b8b3a61",
};

export function task4Sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function task4CanonicalCompare(left: unknown, right: unknown): number {
  const comparable = (value: unknown): string => {
    try {
      return canonicalJson(value);
    } catch {
      const replaceNonfinite = (current: unknown): unknown => {
        if (typeof current === "number" && !Number.isFinite(current)) return "\u0000task4-nonfinite";
        if (current === null || typeof current !== "object") return current;
        if (Array.isArray(current)) return current.map(replaceNonfinite);
        const result: Record<string, unknown> = {};
        for (const key of (Reflect.ownKeys(current) as string[]).sort((a, b) => a.localeCompare(b, "en"))) {
          result[key] = replaceNonfinite(Object.getOwnPropertyDescriptor(current, key)!.value);
        }
        return result;
      };
      return canonicalJson(replaceNonfinite(value));
    }
  };
  return Buffer.compare(Buffer.from(comparable(left), "utf8"), Buffer.from(comparable(right), "utf8"));
}

export function task4CanonicalEqual(left: unknown, right: unknown): boolean {
  try {
    return canonicalJson(left) === canonicalJson(right);
  } catch {
    const equalWithNonfiniteDeferred = (a: unknown, b: unknown): boolean => {
      if (typeof a === "number" || typeof b === "number") {
        if (typeof a !== "number" || typeof b !== "number") return false;
        if (!Number.isFinite(a) || !Number.isFinite(b)) return true;
        return a === b;
      }
      if (a === null || b === null || typeof a !== "object" || typeof b !== "object") return a === b;
      if (Array.isArray(a) || Array.isArray(b)) {
        if (!Array.isArray(a) || !Array.isArray(b) || a.length !== b.length) return false;
        return a.every((value, index) => equalWithNonfiniteDeferred(value, b[index]));
      }
      const leftKeys = (Reflect.ownKeys(a) as string[]).sort((x, y) => x.localeCompare(y, "en"));
      const rightKeys = (Reflect.ownKeys(b) as string[]).sort((x, y) => x.localeCompare(y, "en"));
      if (leftKeys.length !== rightKeys.length || leftKeys.some((key, index) => key !== rightKeys[index])) return false;
      return leftKeys.every((key) => equalWithNonfiniteDeferred(
        Object.getOwnPropertyDescriptor(a, key)!.value,
        Object.getOwnPropertyDescriptor(b, key)!.value,
      ));
    };
    return equalWithNonfiniteDeferred(left, right);
  }
}

export function task4SortCanonical<T>(values: readonly T[]): T[] {
  return [...values].sort(task4CanonicalCompare);
}

export function task4SortScalar(values: readonly string[]): string[] {
  if (values.some((value) => !task4IsUnicodeScalarText(value))) return [...values];
  return [...values].sort((left, right) => {
    const leftScalars = Array.from(left, (value) => value.codePointAt(0)!);
    const rightScalars = Array.from(right, (value) => value.codePointAt(0)!);
    const count = Math.min(leftScalars.length, rightScalars.length);
    for (let index = 0; index < count; index += 1) {
      if (leftScalars[index]! < rightScalars[index]!) return -1;
      if (leftScalars[index]! > rightScalars[index]!) return 1;
    }
    return leftScalars.length - rightScalars.length;
  });
}

export function task4IsUnicodeScalarText(value: string): boolean {
  for (let index = 0; index < value.length; index += 1) {
    const unit = value.charCodeAt(index);
    if (unit >= 0xd800 && unit <= 0xdbff) {
      const next = value.charCodeAt(index + 1);
      if (!(next >= 0xdc00 && next <= 0xdfff)) return false;
      index += 1;
    } else if (unit >= 0xdc00 && unit <= 0xdfff) return false;
  }
  return true;
}

export function task4AssertUnicodeScalarGraph(value: unknown): void {
  const seen = new Set<object>();
  const visit = (current: unknown): void => {
    if (typeof current === "string") {
      if (!task4IsUnicodeScalarText(current)) task4FailContract("unicode_runtime");
      return;
    }
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) visit(descriptor.value);
    }
  };
  visit(value);
}

export function task4RefsEqual(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

export function task4DigestRef(
  record_id: string,
  schema_id: string,
  content_digest: string,
): DigestRef {
  return { record_id, schema_id, schema_version: "0.1.0", content_digest };
}

export function task4ArtifactRefKey(ref: ArtifactRef): string {
  return canonicalJson(ref);
}

export function task4DigestRefKey(ref: DigestRef): string {
  return canonicalJson(ref);
}

export function task4AssertExactKeys(
  value: unknown,
  keys: readonly string[],
  suffix = "canonical_value",
): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task4FailContract(suffix);
  const actual = Reflect.ownKeys(value);
  if (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null) {
    task4FailContract(suffix);
  }
  if (actual.length !== keys.length
    || actual.some((key) => typeof key !== "string")
    || keys.some((key) => !actual.includes(key))) task4FailContract(suffix);
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) task4FailContract(suffix);
  }
}

export function task4TopLevelGate(value: unknown, keys: readonly string[]): void {
  task4AssertExactKeys(value, keys, "input_shape");
  const mode = Object.getOwnPropertyDescriptor(value, "record_mode")!.value;
  if (mode !== "development_fixture" && mode !== "official") task4FailContract("input_shape");
  if (mode === "official") task4FailContract("official_mode_not_supported");
}

export function task4AssertCanonicalGraph(value: unknown): void {
  const ancestors = new Set<object>();
  const visitShape = (current: unknown): void => {
    if (current === null || typeof current === "string" || typeof current === "boolean" || typeof current === "number") return;
    if (typeof current !== "object") task4FailContract("canonical_value");
    if (ancestors.has(current)) task4FailContract("canonical_value");
    const prototype = Object.getPrototypeOf(current);
    if (Array.isArray(current)) {
      if (prototype !== Array.prototype) task4FailContract("canonical_value");
      const descriptors = Object.getOwnPropertyDescriptors(current);
      const expected = new Set(["length", ...Array.from({ length: current.length }, (_, index) => String(index))]);
      if (Reflect.ownKeys(current).length !== expected.size
        || Reflect.ownKeys(current).some((key) => typeof key !== "string" || !expected.has(key))) {
        task4FailContract("canonical_value");
      }
      ancestors.add(current);
      try {
        for (let index = 0; index < current.length; index += 1) {
          const descriptor = descriptors[String(index)];
          if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
            task4FailContract("canonical_value");
          }
          visitShape(descriptor.value);
        }
      } finally {
        ancestors.delete(current);
      }
      return;
    }
    if (prototype !== Object.prototype && prototype !== null) task4FailContract("canonical_value");
    ancestors.add(current);
    try {
      const keys = Reflect.ownKeys(current);
      if (keys.some((key) => typeof key !== "string")) task4FailContract("canonical_value");
      for (const key of (keys as string[]).sort((left, right) => left.localeCompare(right, "en"))) {
        const descriptor = Object.getOwnPropertyDescriptor(current, key);
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          task4FailContract("canonical_value");
        }
        visitShape(descriptor.value);
      }
    } finally {
      ancestors.delete(current);
    }
  };
  visitShape(value);
}

export function task4AssertFiniteNumbers(value: unknown): void {
  if (TASK4_NUMERIC_DEFERRAL_DEPTH > 0) return;
  const visitNumbers = (current: unknown): void => {
    if (typeof current === "number") {
      if (!Number.isFinite(current)) task4FailContract("numeric_nonfinite");
      return;
    }
    if (current === null || typeof current !== "object") return;
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) {
        visitNumbers(Object.getOwnPropertyDescriptor(current, String(index))!.value);
      }
      return;
    }
    const keys = (Reflect.ownKeys(current) as string[]).sort((left, right) => left.localeCompare(right, "en"));
    for (const key of keys) visitNumbers(Object.getOwnPropertyDescriptor(current, key)!.value);
  };
  visitNumbers(value);
}

export function task4WithDeferredNumeric<T>(operation: () => T): T {
  TASK4_NUMERIC_DEFERRAL_DEPTH += 1;
  try {
    return operation();
  } finally {
    TASK4_NUMERIC_DEFERRAL_DEPTH -= 1;
  }
}

export function task4ContainsNonfinite(value: unknown): boolean {
  let found = false;
  const seen = new Set<object>();
  const visit = (current: unknown): void => {
    if (found) return;
    if (typeof current === "number") {
      found = !Number.isFinite(current);
      return;
    }
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) visit(descriptor.value);
    }
  };
  visit(value);
  return found;
}

export function task4WithoutForbiddenInputFields<T>(value: T): T {
  const clone = (current: unknown): unknown => {
    if (current === null || typeof current !== "object") return current;
    if (Array.isArray(current)) {
      return current.map((_, index) => clone(Object.getOwnPropertyDescriptor(current, String(index))!.value));
    }
    const result: Record<string, unknown> = {};
    for (const key of Reflect.ownKeys(current)) {
      if (typeof key !== "string"
        || TASK4_FORBIDDEN_INPUT_FIELDS.includes(key as typeof TASK4_FORBIDDEN_INPUT_FIELDS[number])) continue;
      const descriptor = Object.getOwnPropertyDescriptor(current, key)!;
      if ("value" in descriptor) result[key] = clone(descriptor.value);
    }
    return result;
  };
  return clone(value) as T;
}

export function task4AssertNoForbiddenInputFields(value: unknown): void {
  const seen = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    for (const key of Reflect.ownKeys(current)) {
      if (typeof key === "string"
        && TASK4_FORBIDDEN_INPUT_FIELDS.includes(key as typeof TASK4_FORBIDDEN_INPUT_FIELDS[number])) {
        task4FailContract("forbidden_input_field");
      }
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) visit(descriptor.value);
    }
  };
  visit(value);
}

function task4FreezeGraph(value: unknown, seen: Set<object>): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) task4FreezeGraph(descriptor.value, seen);
  }
  Object.freeze(value);
}

export function task4Immutable<T>(value: T): T {
  const clone = structuredClone(value);
  task4FreezeGraph(clone, new Set<object>());
  return clone;
}

export function task4CacheKey(value: unknown): string | null {
  try {
    return sha256Canonical(value);
  } catch {
    return null;
  }
}

function assertText(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task4FailContract("canonical_value");
}

function assertRecordId(value: unknown): asserts value is string {
  if (typeof value !== "string" || !RECORD_ID.test(value)) task4FailContract("canonical_value");
}

function assertDigest(value: unknown): asserts value is string {
  if (typeof value !== "string") task4FailContract("canonical_value");
  if (!DIGEST.test(value)) task4FailContract("digest");
}

function assertTimestamp(value: unknown): asserts value is string {
  if (!task2IsRfc3339(value)) task4FailContract("canonical_value");
}

function assertArray(value: unknown, minimum = 0): asserts value is unknown[] {
  if (!Array.isArray(value) || value.length < minimum) task4FailContract("canonical_value");
}

function assertTextArray(value: unknown, minimum = 0): asserts value is string[] {
  assertArray(value, minimum);
  value.forEach(assertText);
}

function assertUniqueTextArray(value: unknown, minimum = 0): asserts value is string[] {
  assertTextArray(value, minimum);
  if (new Set(value).size !== value.length) task4FailContract("canonical_value");
}

function assertCanonicalTextSet(value: unknown, minimum = 0): asserts value is string[] {
  assertUniqueTextArray(value, minimum);
  if (!task4CanonicalEqual(value, task4SortScalar(value))) task4FailContract("canonical_value");
}

function assertCanonicalSet<T>(value: readonly T[]): void {
  const sorted = task4SortCanonical(value);
  if (!task4CanonicalEqual(value, sorted)
    || new Set(value.map((item) => canonicalJson(item))).size !== value.length) task4FailContract("canonical_value");
}

function assertScalarSet(value: readonly string[]): void {
  if (!task4CanonicalEqual(value, task4SortScalar(value)) || new Set(value).size !== value.length) {
    task4FailContract("canonical_value");
  }
}

export function task4AssertDigestRefShape(value: unknown): asserts value is DigestRef {
  task4AssertExactKeys(value, ["record_id", "schema_id", "schema_version", "content_digest"]);
  assertRecordId(value.record_id);
  assertText(value.schema_id);
  if (value.schema_version !== "0.1.0") task4FailContract("canonical_value");
  if (typeof value.content_digest !== "string") task4FailContract("canonical_value");
}

export function task4VerifyDigestRef(value: unknown): asserts value is DigestRef {
  task4AssertDigestRefShape(value);
  assertDigest(value.content_digest);
}

export function task4AssertArtifactRefShape(value: unknown): asserts value is ArtifactRef {
  task4AssertExactKeys(value, ["artifact_id", "artifact_version", "artifact_digest"]);
  assertText(value.artifact_id);
  assertText(value.artifact_version);
  if (typeof value.artifact_digest !== "string") task4FailContract("canonical_value");
}

export function task4VerifyArtifactRef(value: unknown): asserts value is ArtifactRef {
  task4AssertArtifactRefShape(value);
  assertDigest(value.artifact_digest);
}

function assertRawArtifactShape(value: unknown): asserts value is RawUtf8Artifact {
  task4AssertExactKeys(value, ["path", "bytes_utf8", "raw_bytes_digest"]);
  assertText(value.path);
  if (typeof value.bytes_utf8 !== "string" || typeof value.raw_bytes_digest !== "string") {
    task4FailContract("canonical_value");
  }
}

function verifyRawArtifact(value: RawUtf8Artifact, suffix: string): void {
  if (!DIGEST.test(value.raw_bytes_digest) || task4Sha256Utf8(value.bytes_utf8) !== value.raw_bytes_digest) {
    task4FailContract(suffix);
  }
}

function assertReceiptShape(value: unknown): asserts value is VerificationReceiptRecord {
  task4AssertExactKeys(value, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task4AssertExactKeys(value.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  assertArray(value.provenance);
  for (const item of value.provenance) {
    task4AssertExactKeys(item, ["record_id", "relationship", "content_digest"]);
  }
  task4AssertExactKeys(value.payload, [
    "transaction_ref", "target_path", "expected_digest", "observed_digest",
    "status", "verified_at", "method",
  ]);
  assertRecordId(value.record_id);
  if (value.schema_id !== "contentmd.verification-receipt-record"
    || value.schema_version !== "0.1.0"
    || typeof value.record_version !== "number"
    || (Number.isFinite(value.record_version) && value.record_version !== 1)
    || value.scope.memory_scope !== "task"
    || value.scope.project_id !== null
    || value.lifecycle_state !== "active") task4FailContract("canonical_value");
  assertUniqueTextArray(value.scope.resource_refs, 1);
  if (!task4CanonicalEqual(value.scope.data_classes, ["verification_metadata"])) {
    task4FailContract("canonical_value");
  }
  for (const item of value.provenance) {
    const provenance = item as Record<string, unknown>;
    assertRecordId(provenance.record_id);
    assertText(provenance.relationship);
    if (typeof provenance.content_digest !== "string") task4FailContract("canonical_value");
  }
  for (const key of ["transaction_ref", "target_path", "expected_digest", "observed_digest"] as const) {
    assertText(value.payload[key]);
  }
  if (value.payload.status !== "passed"
    || value.payload.method !== "sha256-canonical-readback"
    || !task2IsRfc3339(value.payload.verified_at)
    || typeof value.content_digest !== "string") task4FailContract("canonical_value");
}

function assertProducerShape(value: unknown): asserts value is Task4ProducerArtifactWitness {
  task4AssertExactKeys(value, [
    "contract_version", "producer_id", "contract_artifact", "schema_artifact", "source_artifacts",
    "resolution_artifacts", "dependency_manifest", "verification_mode", "verification_receipt",
  ]);
  if (value.contract_version !== "contentmd.task4-producer-witness/0.1.0"
    || !( ["retrieval-snapshot", "feature-profile", "candidate-feature-vector", "deterministic-baseline"] as readonly unknown[])
      .includes(value.producer_id)) task4FailContract("canonical_value");
  assertRawArtifactShape(value.contract_artifact);
  if (value.schema_artifact !== null) assertRawArtifactShape(value.schema_artifact);
  assertArray(value.source_artifacts, 1);
  value.source_artifacts.forEach(assertRawArtifactShape);
  assertArray(value.resolution_artifacts, 1);
  value.resolution_artifacts.forEach(assertRawArtifactShape);
  const manifest = value.dependency_manifest;
  task4AssertExactKeys(manifest, [
    "contract_version", "producer_id", "entry_paths", "resolution_profile",
    "resolution_artifacts", "entries", "dependency_manifest_digest",
  ]);
  if (manifest.contract_version !== "contentmd.task4-dependency-manifest/0.1.0"
    || !( ["retrieval-snapshot", "feature-profile", "candidate-feature-vector", "deterministic-baseline"] as readonly unknown[])
      .includes(manifest.producer_id)
    || manifest.resolution_profile
      !== "node24-typescript59-esm-runtime-import-export-literal-dynamic-closure/0.1.0") {
    task4FailContract("canonical_value");
  }
  assertTextArray(manifest.entry_paths, 1);
  assertArray(manifest.resolution_artifacts, 1);
  for (const item of manifest.resolution_artifacts) {
    task4AssertExactKeys(item, ["path", "raw_bytes_digest"]);
    assertText(item.path);
    if (typeof item.raw_bytes_digest !== "string") task4FailContract("canonical_value");
  }
  assertArray(manifest.entries, 1);
  for (const entry of manifest.entries) {
    task4AssertExactKeys(entry, ["path", "raw_bytes_digest", "runtime_dependency_paths"]);
    assertText(entry.path);
    if (typeof entry.raw_bytes_digest !== "string") task4FailContract("canonical_value");
    assertTextArray(entry.runtime_dependency_paths);
  }
  if (typeof manifest.dependency_manifest_digest !== "string") task4FailContract("canonical_value");
  if (value.verification_mode !== "development_fixture" && value.verification_mode !== "build_verified") {
    task4FailContract("canonical_value");
  }
  if (value.verification_receipt !== null) assertReceiptShape(value.verification_receipt);
}

/** Internal Task 4 category-stage preflight; package-root exports remain named and closed. */
export function task4PreflightProducerShape(value: unknown): asserts value is Task4ProducerArtifactWitness {
  assertProducerShape(value);
}

function importDeclarationHasRuntimeValue(node: ts.ImportDeclaration): boolean {
  const clause = node.importClause;
  if (clause === undefined) return true;
  if (clause.isTypeOnly) return false;
  if (clause.name !== undefined) return true;
  const bindings = clause.namedBindings;
  if (bindings === undefined || ts.isNamespaceImport(bindings)) return bindings !== undefined;
  return bindings.elements.some((element) => !element.isTypeOnly);
}

function exportDeclarationHasRuntimeValue(node: ts.ExportDeclaration): boolean {
  if (node.isTypeOnly || node.moduleSpecifier === undefined) return false;
  if (node.exportClause === undefined || ts.isNamespaceExport(node.exportClause)) return true;
  return node.exportClause.elements.some((element) => !element.isTypeOnly);
}

function runtimeSpecifiers(path: string, source: string): string[] {
  const sourceFile = ts.createSourceFile(path, source, ts.ScriptTarget.ESNext, true, ts.ScriptKind.TS);
  const diagnostics = (sourceFile as ts.SourceFile & {
    readonly parseDiagnostics: readonly ts.Diagnostic[];
  }).parseDiagnostics;
  if (diagnostics.length > 0) task4FailContract("producer_witness");
  const specifiers: string[] = [];
  const forbiddenDynamicCodeNames = new Set([
    "eval", "Function", "AsyncFunction", "GeneratorFunction", "AsyncGeneratorFunction",
  ]);
  const staticPropertyName = (expression: ts.Expression): string | null => {
    if (ts.isStringLiteralLike(expression)) return expression.text;
    if (ts.isParenthesizedExpression(expression)) return staticPropertyName(expression.expression);
    if (ts.isBinaryExpression(expression) && expression.operatorToken.kind === ts.SyntaxKind.PlusToken) {
      const left = staticPropertyName(expression.left);
      const right = staticPropertyName(expression.right);
      return left === null || right === null ? null : left + right;
    }
    if (ts.isTemplateExpression(expression)) {
      let value = expression.head.text;
      for (const span of expression.templateSpans) {
        const substitution = staticPropertyName(span.expression);
        if (substitution === null) return null;
        value += substitution + span.literal.text;
      }
      return value;
    }
    return null;
  };
  const visit = (node: ts.Node): void => {
    if (ts.isIdentifier(node) && forbiddenDynamicCodeNames.has(node.text)) {
      task4FailContract("producer_witness");
    }
    if (ts.isPropertyAccessExpression(node) && node.name.text === "constructor") {
      task4FailContract("producer_witness");
    }
    if (ts.isElementAccessExpression(node)) {
      const propertyName = staticPropertyName(node.argumentExpression);
      if (propertyName === "constructor" || (propertyName !== null && forbiddenDynamicCodeNames.has(propertyName))) {
        task4FailContract("producer_witness");
      }
    }
    if (ts.isImportDeclaration(node) && importDeclarationHasRuntimeValue(node)) {
      if (!ts.isStringLiteral(node.moduleSpecifier)) task4FailContract("producer_witness");
      if (["vm", "node:vm", "module", "node:module"].includes(node.moduleSpecifier.text)) {
        task4FailContract("producer_witness");
      }
      specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isExportDeclaration(node) && exportDeclarationHasRuntimeValue(node)) {
      if (!ts.isStringLiteral(node.moduleSpecifier!)) task4FailContract("producer_witness");
      if (["vm", "node:vm", "module", "node:module"].includes(node.moduleSpecifier.text)) {
        task4FailContract("producer_witness");
      }
      specifiers.push(node.moduleSpecifier.text);
    } else if (ts.isImportEqualsDeclaration(node)) {
      task4FailContract("producer_witness");
    } else if (ts.isCallExpression(node)) {
      if (node.expression.kind === ts.SyntaxKind.ImportKeyword) {
        if (node.arguments.length !== 1 || !ts.isStringLiteral(node.arguments[0]!)) {
          task4FailContract("producer_witness");
        }
        specifiers.push(node.arguments[0]!.text);
      } else if (ts.isIdentifier(node.expression) && node.expression.text === "require") {
        task4FailContract("producer_witness");
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return [...new Set(specifiers)];
}

const TASK4_VIRTUAL_ROOT = "/contentmd-task4-workspace";

function virtualResolutionFiles(
  sourceArtifacts: readonly RawUtf8Artifact[],
  resolutionArtifacts: readonly RawUtf8Artifact[],
): Map<string, string> {
  const files = new Map<string, string>();
  [...sourceArtifacts, ...resolutionArtifacts].forEach(({ path, bytes_utf8 }) => {
    files.set(`${TASK4_VIRTUAL_ROOT}/${path}`, bytes_utf8);
  });
  for (const { path, bytes_utf8 } of [...sourceArtifacts, ...resolutionArtifacts]) {
    if (path === "packages/core/package.json" || path.startsWith("packages/core/src/")) {
      files.set(`${TASK4_VIRTUAL_ROOT}/node_modules/@contentmd/core/${path.slice("packages/core/".length)}`, bytes_utf8);
    }
  }
  return files;
}

function createRuntimeResolver(
  sourceArtifacts: readonly RawUtf8Artifact[],
  resolutionArtifacts: readonly RawUtf8Artifact[],
): (from: string, specifier: string) => string | null {
  const files = virtualResolutionFiles(sourceArtifacts, resolutionArtifacts);
  const directories = new Set<string>();
  for (const file of files.keys()) {
    let directory = posix.dirname(file);
    while (directory.startsWith(TASK4_VIRTUAL_ROOT)) {
      directories.add(directory);
      const parent = posix.dirname(directory);
      if (parent === directory) break;
      directory = parent;
    }
  }
  const host: ts.ModuleResolutionHost = {
    fileExists: (file) => files.has(posix.normalize(file)),
    readFile: (file) => files.get(posix.normalize(file)),
    directoryExists: (directory) => directories.has(posix.normalize(directory)),
    getDirectories: () => [],
    realpath: (file) => posix.normalize(file),
    useCaseSensitiveFileNames: () => true,
  };
  const compilerOptions: ts.CompilerOptions = {
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    target: ts.ScriptTarget.ESNext,
    customConditions: ["development"],
    allowImportingTsExtensions: true,
  };
  const cache = ts.createModuleResolutionCache(TASK4_VIRTUAL_ROOT, (path) => path, compilerOptions);
  return (from, specifier) => {
    if (specifier.startsWith("node:")) return null;
    if (specifier === "typescript-compiler") return null;
    const result = ts.resolveModuleName(
      specifier,
      `${TASK4_VIRTUAL_ROOT}/${from}`,
      compilerOptions,
      host,
      cache,
    ).resolvedModule;
    if (result === undefined) task4FailContract("producer_witness");
    let resolved = posix.normalize(result.resolvedFileName);
    const coreAlias = `${TASK4_VIRTUAL_ROOT}/node_modules/@contentmd/core/`;
    if (resolved.startsWith(coreAlias)) {
      resolved = `${TASK4_VIRTUAL_ROOT}/packages/core/${resolved.slice(coreAlias.length)}`;
    }
    const prefix = `${TASK4_VIRTUAL_ROOT}/`;
    if (!resolved.startsWith(prefix)) task4FailContract("producer_witness");
    const workspacePath = resolved.slice(prefix.length);
    if (!sourceArtifacts.some(({ path }) => path === workspacePath)) task4FailContract("producer_witness");
    return workspacePath;
  };
}

function receiptRef(receipt: VerificationReceiptRecord): DigestRef {
  return task4DigestRef(receipt.record_id, receipt.schema_id, receipt.content_digest);
}

function verifyProducerReceipt(
  receipt: VerificationReceiptRecord,
  producerId: Task4ProducerArtifactWitness["producer_id"],
  manifestDigest: string,
): void {
  if (!task4ContainsNonfinite(receipt) && verifyRecordDigest(receipt).valid !== true) {
    task4FailContract("producer_witness");
  }
  const target = `contentmd://task4/producer-manifest/${producerId}`;
  if (!task4CanonicalEqual(receipt, {
    ...receipt,
    record_id: receipt.record_id,
  })
    || receipt.record_id !== `verification-receipt.task4-producer.${producerId}.${manifestDigest}`
    || receipt.schema_id !== "contentmd.verification-receipt-record"
    || receipt.schema_version !== "0.1.0"
    || (Number.isFinite(receipt.record_version) && receipt.record_version !== 1)
    || receipt.lifecycle_state !== "active"
    || !task4CanonicalEqual(receipt.scope, {
      memory_scope: "task",
      project_id: null,
      resource_refs: [target],
      data_classes: ["verification_metadata"],
    })
    || !task4CanonicalEqual(receipt.provenance, [])
    || !task4CanonicalEqual(receipt.payload, {
      transaction_ref: `producer-manifest.${manifestDigest}`,
      target_path: target,
      expected_digest: manifestDigest,
      observed_digest: manifestDigest,
      status: "passed",
      verified_at: receipt.payload.verified_at,
      method: "sha256-canonical-readback",
    })
    || !task2IsRfc3339(receipt.payload.verified_at)) task4FailContract("producer_witness");
}

export function verifyTask4Producer(
  witness: Task4ProducerArtifactWitness,
  expectedProducer: Task4ProducerArtifactWitness["producer_id"],
): VerifiedTask4Producer {
  assertProducerShape(witness);
  if (witness.contract_version !== "contentmd.task4-producer-witness/0.1.0"
    || witness.producer_id !== expectedProducer) task4FailContract("producer_witness");
  const producerCacheKey = task4CacheKey({ expected_producer: expectedProducer, witness });
  const cachedProducer = producerCacheKey === null ? undefined : TASK4_PRODUCER_CACHE.get(producerCacheKey);
  if (cachedProducer !== undefined) return cachedProducer;
  verifyRawArtifact(witness.contract_artifact, "producer_witness");
  if (witness.contract_artifact.path !== CONTRACT_PATH
    || witness.contract_artifact.raw_bytes_digest !== CONTRACT_DIGEST) task4FailContract("producer_witness");
  if (expectedProducer === "feature-profile") {
    if (witness.schema_artifact === null) task4FailContract("producer_witness");
    verifyRawArtifact(witness.schema_artifact, "producer_witness");
    if (witness.schema_artifact.path !== "packages/schemas/src/learning-records.schema.json") {
      task4FailContract("producer_witness");
    }
  } else if (witness.schema_artifact !== null) task4FailContract("producer_witness");
  witness.source_artifacts.forEach((artifact) => verifyRawArtifact(artifact, "producer_witness"));
  witness.resolution_artifacts.forEach((artifact) => verifyRawArtifact(artifact, "producer_witness"));
  const expectedResolutionPaths = Object.keys(RESOLUTION_ARTIFACT_DIGESTS);
  const resolutionPaths = witness.resolution_artifacts.map((artifact) => artifact.path);
  if (!task4CanonicalEqual(resolutionPaths, expectedResolutionPaths)
    || resolutionPaths.some((path, index) => witness.resolution_artifacts[index]!.raw_bytes_digest
      !== RESOLUTION_ARTIFACT_DIGESTS[path])) task4FailContract("producer_witness");
  const expectedEntry = {
    "retrieval-snapshot": "packages/learning/src/retrieval.ts",
    "feature-profile": "packages/learning/src/features.ts",
    "candidate-feature-vector": "packages/learning/src/features.ts",
    "deterministic-baseline": "packages/learning/src/baseline.ts",
  }[expectedProducer];
  const manifest = witness.dependency_manifest;
  const sourcePaths = witness.source_artifacts.map((artifact) => artifact.path);
  if (!task4CanonicalEqual(sourcePaths, [...sourcePaths].sort()) || new Set(sourcePaths).size !== sourcePaths.length
    || !task4CanonicalEqual(manifest.entry_paths, [expectedEntry])
    || manifest.contract_version !== "contentmd.task4-dependency-manifest/0.1.0"
    || manifest.producer_id !== expectedProducer
    || manifest.resolution_profile !== "node24-typescript59-esm-runtime-import-export-literal-dynamic-closure/0.1.0"
    || !task4CanonicalEqual(manifest.resolution_artifacts,
      witness.resolution_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest })))
    || !task4CanonicalEqual(manifest.entries.map((entry) => entry.path), sourcePaths)) {
    task4FailContract("producer_witness");
  }
  const byPath = new Map(witness.source_artifacts.map((artifact) => [artifact.path, artifact]));
  const resolveRuntimeSpecifier = createRuntimeResolver(
    witness.source_artifacts,
    witness.resolution_artifacts,
  );
  const reachable = new Set<string>();
  const pending = [expectedEntry];
  while (pending.length > 0) {
    const path = pending.shift()!;
    if (reachable.has(path)) continue;
    const artifact = byPath.get(path);
    if (artifact === undefined) task4FailContract("producer_witness");
    reachable.add(path);
    const dependencies = runtimeSpecifiers(path, artifact.bytes_utf8)
      .map((specifier) => resolveRuntimeSpecifier(path, specifier))
      .filter((resolved): resolved is string => resolved !== null)
      .sort();
    const entry = manifest.entries.find((candidate) => candidate.path === path);
    if (entry === undefined
      || entry.raw_bytes_digest !== artifact.raw_bytes_digest
      || !task4CanonicalEqual(entry.runtime_dependency_paths, dependencies)
      || new Set(dependencies).size !== dependencies.length) task4FailContract("producer_witness");
    dependencies.forEach((dependency) => {
      if (!byPath.has(dependency)) task4FailContract("producer_witness");
      pending.push(dependency);
    });
  }
  if (reachable.size !== byPath.size || manifest.entries.length !== byPath.size) task4FailContract("producer_witness");
  const { dependency_manifest_digest: _manifestDigest, ...manifestPreimage } = manifest;
  if (!DIGEST.test(manifest.dependency_manifest_digest)
    || manifest.dependency_manifest_digest !== sha256Canonical(manifestPreimage)) task4FailContract("producer_witness");
  const codeDigest = sha256Canonical({
    contract_version: "contentmd.task4-code-manifest/0.2.0",
    producer_id: expectedProducer,
    entry_paths: manifest.entry_paths,
    resolution_artifacts: manifest.resolution_artifacts,
    dependency_manifest_digest: manifest.dependency_manifest_digest,
    entries: manifest.entries,
  });
  const producerManifestDigest = sha256Canonical({
    contract_version: "contentmd.task4-producer-manifest/0.1.0",
    producer_id: expectedProducer,
    contract: {
      path: witness.contract_artifact.path,
      raw_bytes_digest: witness.contract_artifact.raw_bytes_digest,
    },
    schema: witness.schema_artifact === null ? null : {
      path: witness.schema_artifact.path,
      raw_bytes_digest: witness.schema_artifact.raw_bytes_digest,
    },
    dependency_manifest_digest: manifest.dependency_manifest_digest,
    code_digest: codeDigest,
  });
  let producerVerificationRef: DigestRef | null = null;
  if (witness.verification_mode === "development_fixture") {
    if (witness.verification_receipt !== null) task4FailContract("producer_witness");
  } else if (witness.verification_mode === "build_verified") {
    if (witness.verification_receipt === null) task4FailContract("producer_witness");
    verifyProducerReceipt(witness.verification_receipt, expectedProducer, producerManifestDigest);
    producerVerificationRef = receiptRef(witness.verification_receipt);
  } else task4FailContract("canonical_value");
  const verifiedProducer = task4Immutable({
    schema_digest: witness.schema_artifact?.raw_bytes_digest ?? CONTRACT_DIGEST,
    code_digest: codeDigest,
    producer_manifest_digest: producerManifestDigest,
    producer_verification_ref: producerVerificationRef,
  });
  if (producerCacheKey !== null) TASK4_PRODUCER_CACHE.set(producerCacheKey, verifiedProducer);
  return verifiedProducer;
}

function assertUnicodeRuntimeShape(value: unknown): asserts value is Task4UnicodeRuntime {
  task4AssertExactKeys(value, ["contract_version", "unicode_bundle", "runtime_profile", "runtime_digest"]);
  if (value.contract_version !== "contentmd.task4-unicode-runtime/0.1.0") task4FailContract("canonical_value");
  const bundle = value.unicode_bundle;
  task4AssertExactKeys(bundle, [
    "contract_version", "source_lock", "acquisition_receipt", "generator", "normalization",
    "casefold", "whitespace", "word_break", "grapheme_break", "bundle_digest",
  ]);
  if (bundle.contract_version !== "contentmd.unicode-artifact-bundle/0.1.0") {
    task4FailContract("canonical_value");
  }
  for (const key of ["source_lock", "acquisition_receipt", "generator"] as const) {
    assertRawArtifactShape(bundle[key]);
  }
  for (const key of ["normalization", "casefold", "whitespace", "word_break", "grapheme_break"] as const) {
    task4AssertExactKeys(bundle[key], ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"]);
    assertText(bundle[key].path);
    if (typeof bundle[key].bytes_utf8 !== "string" || typeof bundle[key].raw_bytes_digest !== "string") {
      task4FailContract("canonical_value");
    }
    task4AssertArtifactRefShape(bundle[key].artifact_ref);
  }
  if (typeof bundle.bundle_digest !== "string") task4FailContract("canonical_value");
  task4AssertExactKeys(value.runtime_profile, ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"]);
  assertText(value.runtime_profile.path);
  if (typeof value.runtime_profile.bytes_utf8 !== "string"
    || typeof value.runtime_profile.raw_bytes_digest !== "string") task4FailContract("canonical_value");
  task4AssertArtifactRefShape(value.runtime_profile.artifact_ref);
  if (typeof value.runtime_digest !== "string") task4FailContract("canonical_value");
}

/** Internal Task 4 category-stage preflight; it validates shape without artifact semantics. */
export function task4PreflightUnicodeRuntimeShape(value: unknown): asserts value is Task4UnicodeRuntime {
  assertUnicodeRuntimeShape(value);
}

export function task4PreflightStoreArtifactShape(value: unknown): asserts value is StoreArtifactWitness {
  task4AssertExactKeys(value, ["path", "bytes_utf8", "raw_bytes_digest", "artifact_ref"]);
  assertText(value.path);
  if (typeof value.bytes_utf8 !== "string" || typeof value.raw_bytes_digest !== "string") {
    task4FailContract("canonical_value");
  }
  task4AssertArtifactRefShape(value.artifact_ref);
}

export function task4PreflightRawArtifactShape(value: unknown): asserts value is RawUtf8Artifact {
  assertRawArtifactShape(value);
}

export function verifyTask4RuntimeProfile(runtime: StoreArtifactWitness): void {
  if (runtime.path !== "fixtures/learning-ranking/feature-source-runtime-profile.json"
    || runtime.raw_bytes_digest !== RUNTIME_PROFILE_DIGEST
    || task4Sha256Utf8(runtime.bytes_utf8) !== runtime.raw_bytes_digest) task4FailContract("unicode_runtime");
  let parsed: unknown;
  try { parsed = JSON.parse(runtime.bytes_utf8); } catch { task4FailContract("unicode_runtime"); }
  const semantic = {
    canonical_json_algorithm: "contentmd.core-canonical-json/0.1.0",
    contract_version: "contentmd.feature-source-runtime-profile/0.1.0",
    hash_algorithm: "sha256",
    network_access: "none",
    node_version: "24.14.0",
    text_encoding: "utf-8-fatal",
    timestamp_role: "descriptive_only",
  };
  if (!task4CanonicalEqual(parsed, semantic)
    || runtime.bytes_utf8 !== canonicalJson(semantic)
    || !task4CanonicalEqual(runtime.artifact_ref, {
      artifact_id: "contentmd.feature-source-runtime-profile",
      artifact_version: "0.1.0",
      artifact_digest: runtime.raw_bytes_digest,
    })) task4FailContract("unicode_runtime");
}

export interface VerifiedTask4UnicodeRuntime {
  verified_bundle: VerifiedUnicodeArtifactBundle;
  artifact_refs: ArtifactRef[];
}

export function verifyTask4UnicodeRuntime(runtime: Task4UnicodeRuntime): VerifiedTask4UnicodeRuntime {
  assertUnicodeRuntimeShape(runtime);
  const runtimeCacheKey = task4CacheKey(runtime);
  const cachedRuntime = runtimeCacheKey === null ? undefined : TASK4_UNICODE_RUNTIME_CACHE.get(runtimeCacheKey);
  if (cachedRuntime !== undefined) return cachedRuntime;
  let verified: VerifiedUnicodeArtifactBundle;
  try { verified = verifyUnicodeArtifactBundle(runtime.unicode_bundle); } catch { task4FailContract("unicode_runtime"); }
  verifyTask4RuntimeProfile(runtime.runtime_profile);
  const { runtime_digest: _digest, ...preimage } = runtime;
  if (!DIGEST.test(runtime.runtime_digest)
    || runtime.runtime_digest !== sha256Canonical(preimage)) task4FailContract("unicode_runtime");
  const verifiedRuntime = {
    verified_bundle: verified,
    artifact_refs: task4Immutable([...verified.artifact_refs, runtime.runtime_profile.artifact_ref]),
  };
  Object.freeze(verifiedRuntime);
  if (runtimeCacheKey !== null) TASK4_UNICODE_RUNTIME_CACHE.set(runtimeCacheKey, verifiedRuntime);
  return verifiedRuntime;
}

interface PropertyRange { start: number; end: number; property: string }
interface ScalarRange { start: number; end: number }
interface BoundaryTables {
  property_ranges: PropertyRange[];
  extended_pictographic_ranges: ScalarRange[];
  indic_conjunct_break_ranges?: PropertyRange[];
}

const TASK4_BOUNDARY_TABLE_CACHE = new Map<string, BoundaryTables>();

function parseBoundaryTables(artifact: { bytes_utf8: string }, kind: "word" | "grapheme"): BoundaryTables {
  const cacheKey = `${kind}:${task4Sha256Utf8(artifact.bytes_utf8)}`;
  const cached = TASK4_BOUNDARY_TABLE_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  let parsed: unknown;
  try { parsed = JSON.parse(artifact.bytes_utf8); } catch { task4FailContract("unicode_runtime"); }
  if (parsed === null || typeof parsed !== "object" || !("tables" in parsed)) task4FailContract("unicode_runtime");
  const tables = (parsed as { tables: BoundaryTables }).tables;
  if (!Array.isArray(tables.property_ranges) || !Array.isArray(tables.extended_pictographic_ranges)
    || (kind === "grapheme" && !Array.isArray(tables.indic_conjunct_break_ranges))) {
    task4FailContract("unicode_runtime");
  }
  TASK4_BOUNDARY_TABLE_CACHE.set(cacheKey, tables);
  return tables;
}

function lookupProperty(ranges: readonly PropertyRange[], scalar: number, fallback = "Other"): string {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const range = ranges[middle]!;
    if (scalar < range.start) high = middle - 1;
    else if (scalar > range.end) low = middle + 1;
    else return range.property;
  }
  return fallback;
}

function inRanges(ranges: readonly ScalarRange[], scalar: number): boolean {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const range = ranges[middle]!;
    if (scalar < range.start) high = middle - 1;
    else if (scalar > range.end) low = middle + 1;
    else return true;
  }
  return false;
}

function scalarsToString(values: readonly number[]): string {
  return String.fromCodePoint(...values);
}

function decodeScalars(value: string): number[] {
  const scalars: number[] = [];
  for (let index = 0; index < value.length; index += 1) {
    const first = value.charCodeAt(index);
    if (first >= 0xd800 && first <= 0xdbff) {
      if (index + 1 >= value.length) task4FailContract("unicode_runtime");
      const second = value.charCodeAt(index + 1);
      if (second < 0xdc00 || second > 0xdfff) task4FailContract("unicode_runtime");
      scalars.push((first - 0xd800) * 0x400 + second - 0xdc00 + 0x10000);
      index += 1;
    } else if (first >= 0xdc00 && first <= 0xdfff) task4FailContract("unicode_runtime");
    else scalars.push(first);
  }
  return scalars;
}

function isIgnoredWordProperty(value: string): boolean {
  return value === "Extend" || value === "Format" || value === "ZWJ";
}

function isAHLetter(value: string): boolean {
  return value === "ALetter" || value === "Hebrew_Letter";
}

function isMidNumLetQ(value: string): boolean {
  return value === "MidNumLet" || value === "Single_Quote";
}

function previousSignificant(properties: readonly string[], before: number): number {
  for (let index = before; index >= 0; index -= 1) if (!isIgnoredWordProperty(properties[index]!)) return index;
  return -1;
}

function nextSignificant(properties: readonly string[], after: number): number {
  for (let index = after; index < properties.length; index += 1) {
    if (!isIgnoredWordProperty(properties[index]!)) return index;
  }
  return properties.length;
}

function wordBreakAt(scalars: readonly number[], properties: readonly string[], tables: BoundaryTables, index: number): boolean {
  const immediateLeft = properties[index - 1]!;
  const immediateRight = properties[index]!;
  if (immediateLeft === "CR" && immediateRight === "LF") return false;
  if (["Newline", "CR", "LF"].includes(immediateLeft)
    || ["Newline", "CR", "LF"].includes(immediateRight)) return true;
  if (immediateLeft === "ZWJ" && inRanges(tables.extended_pictographic_ranges, scalars[index]!)) return false;
  if (immediateLeft === "WSegSpace" && immediateRight === "WSegSpace") return false;
  if (isIgnoredWordProperty(immediateRight)) return false;
  const leftIndex = previousSignificant(properties, index - 1);
  const rightIndex = nextSignificant(properties, index);
  if (leftIndex < 0 || rightIndex >= properties.length) return true;
  const left = properties[leftIndex]!;
  const right = properties[rightIndex]!;
  if (isAHLetter(left) && isAHLetter(right)) return false;
  const right2Index = nextSignificant(properties, rightIndex + 1);
  const right2 = right2Index < properties.length ? properties[right2Index]! : "";
  const left2Index = previousSignificant(properties, leftIndex - 1);
  const left2 = left2Index >= 0 ? properties[left2Index]! : "";
  if (isAHLetter(left) && (right === "MidLetter" || isMidNumLetQ(right)) && isAHLetter(right2)) return false;
  if (isAHLetter(left2) && (left === "MidLetter" || isMidNumLetQ(left)) && isAHLetter(right)) return false;
  if (left === "Hebrew_Letter" && right === "Single_Quote") return false;
  if (left === "Hebrew_Letter" && right === "Double_Quote" && right2 === "Hebrew_Letter") return false;
  if (left2 === "Hebrew_Letter" && left === "Double_Quote" && right === "Hebrew_Letter") return false;
  if (left === "Numeric" && right === "Numeric") return false;
  if (isAHLetter(left) && right === "Numeric") return false;
  if (left === "Numeric" && isAHLetter(right)) return false;
  if (left === "Numeric" && (right === "MidNum" || isMidNumLetQ(right)) && right2 === "Numeric") return false;
  if (left2 === "Numeric" && (left === "MidNum" || isMidNumLetQ(left)) && right === "Numeric") return false;
  if (left === "Katakana" && right === "Katakana") return false;
  const wordish = (value: string): boolean => isAHLetter(value)
    || value === "Numeric" || value === "Katakana" || value === "ExtendNumLet";
  if (wordish(left) && right === "ExtendNumLet") return false;
  if (left === "ExtendNumLet" && (isAHLetter(right) || right === "Numeric" || right === "Katakana")) return false;
  if (right === "Regional_Indicator") {
    let count = 0;
    for (let cursor = leftIndex; cursor >= 0;) {
      if (properties[cursor] !== "Regional_Indicator") break;
      count += 1;
      cursor = previousSignificant(properties, cursor - 1);
    }
    if (count % 2 === 1) return false;
  }
  return true;
}

interface Task4ValuedScalarRange { start: number; end: number; value: number }
interface Task4NormalizationTables {
  canonical_combining_class_ranges: Task4ValuedScalarRange[];
  decomposition_mappings: Array<{
    scalar: number;
    mapping: number[];
    kind: "canonical" | "compatibility";
  }>;
  composition_pairs: Array<{ starter: number; combining: number; composite: number }>;
}

const TASK4_NORMALIZATION_TABLE_CACHE = new Map<string, Task4NormalizationTables>();
const TASK4_NORMALIZATION_LOOKUP_CACHE = new WeakMap<Task4NormalizationTables, {
  decompositionByScalar: Map<number, number[]>;
  canonicalDecompositionByScalar: Map<number, number[]>;
  pairMap: Map<string, number>;
}>();
const TASK4_WORD_TOKEN_CACHE = new WeakMap<Task4UnicodeRuntime, {
  signature: readonly string[];
  values: Map<string, readonly string[]>;
}>();

const TASK4_HANGUL = {
  s_base: 44032, l_base: 4352, v_base: 4449, t_base: 4519,
  l_count: 19, v_count: 21, t_count: 28, n_count: 588, s_count: 11172,
} as const;

function task4RangeValue(ranges: readonly Task4ValuedScalarRange[], scalar: number): number {
  let low = 0;
  let high = ranges.length - 1;
  while (low <= high) {
    const middle = (low + high) >>> 1;
    const range = ranges[middle]!;
    if (scalar < range.start) high = middle - 1;
    else if (scalar > range.end) low = middle + 1;
    else return range.value;
  }
  return 0;
}

function task4DecomposeHangul(scalar: number): number[] | null {
  const index = scalar - TASK4_HANGUL.s_base;
  if (index < 0 || index >= TASK4_HANGUL.s_count) return null;
  const trailingIndex = index % TASK4_HANGUL.t_count;
  const output = [
    TASK4_HANGUL.l_base + Math.floor(index / TASK4_HANGUL.n_count),
    TASK4_HANGUL.v_base + Math.floor((index % TASK4_HANGUL.n_count) / TASK4_HANGUL.t_count),
  ];
  if (trailingIndex !== 0) output.push(TASK4_HANGUL.t_base + trailingIndex);
  return output;
}

function task4ComposeHangul(starter: number, combining: number): number | null {
  const leadingIndex = starter - TASK4_HANGUL.l_base;
  const vowelIndex = combining - TASK4_HANGUL.v_base;
  if (leadingIndex >= 0 && leadingIndex < TASK4_HANGUL.l_count
    && vowelIndex >= 0 && vowelIndex < TASK4_HANGUL.v_count) {
    return TASK4_HANGUL.s_base
      + (leadingIndex * TASK4_HANGUL.v_count + vowelIndex) * TASK4_HANGUL.t_count;
  }
  const syllableIndex = starter - TASK4_HANGUL.s_base;
  const trailingIndex = combining - TASK4_HANGUL.t_base;
  if (syllableIndex >= 0 && syllableIndex < TASK4_HANGUL.s_count
    && syllableIndex % TASK4_HANGUL.t_count === 0
    && trailingIndex > 0 && trailingIndex < TASK4_HANGUL.t_count) return starter + trailingIndex;
  return null;
}

function task4ComposeNormalized(
  scalars: readonly number[],
  artifactBytes: string,
  canonicalOnly: boolean,
): number[] {
  const cacheKey = task4Sha256Utf8(artifactBytes);
  let tables = TASK4_NORMALIZATION_TABLE_CACHE.get(cacheKey);
  if (tables === undefined) {
    const parsed = JSON.parse(artifactBytes) as { tables?: Task4NormalizationTables };
    tables = parsed.tables;
    if (tables === undefined) task4FailContract("unicode_runtime");
    TASK4_NORMALIZATION_TABLE_CACHE.set(cacheKey, tables);
  }
  let lookups = TASK4_NORMALIZATION_LOOKUP_CACHE.get(tables);
  if (lookups === undefined) {
    lookups = {
      decompositionByScalar: new Map(
        tables.decomposition_mappings.map(({ scalar, mapping }) => [scalar, mapping] as const),
      ),
      canonicalDecompositionByScalar: new Map(
        tables.decomposition_mappings
          .filter(({ kind }) => kind === "canonical")
          .map(({ scalar, mapping }) => [scalar, mapping] as const),
      ),
      pairMap: new Map(tables.composition_pairs.map(
        ({ starter, combining, composite }) => [`${starter}.${combining}`, composite] as const,
      )),
    };
    TASK4_NORMALIZATION_LOOKUP_CACHE.set(tables, lookups);
  }
  const { decompositionByScalar, canonicalDecompositionByScalar, pairMap } = lookups;
  const selectedDecomposition = canonicalOnly
    ? canonicalDecompositionByScalar
    : decompositionByScalar;
  const decomposed: number[] = [];
  const active = new Set<number>();
  const decompose = (scalar: number): void => {
    if (active.has(scalar)) task4FailContract("unicode_runtime");
    const mapping = task4DecomposeHangul(scalar) ?? selectedDecomposition.get(scalar);
    if (mapping === undefined) {
      decomposed.push(scalar);
      return;
    }
    active.add(scalar);
    mapping.forEach(decompose);
    active.delete(scalar);
  };
  scalars.forEach(decompose);

  const ordered: number[] = [];
  for (const scalar of decomposed) {
    const scalarClass = task4RangeValue(tables.canonical_combining_class_ranges, scalar);
    ordered.push(scalar);
    if (scalarClass === 0) continue;
    let position = ordered.length - 1;
    while (position > 0) {
      const previousClass = task4RangeValue(
        tables.canonical_combining_class_ranges,
        ordered[position - 1]!,
      );
      if (previousClass === 0 || previousClass <= scalarClass) break;
      ordered[position] = ordered[position - 1]!;
      position -= 1;
    }
    ordered[position] = scalar;
  }

  const composed: number[] = [];
  let starterPosition = -1;
  let starter = -1;
  let lastClass = 0;
  for (const scalar of ordered) {
    const scalarClass = task4RangeValue(tables.canonical_combining_class_ranges, scalar);
    const composite = starterPosition >= 0
      ? task4ComposeHangul(starter, scalar) ?? pairMap.get(`${starter}.${scalar}`) ?? null
      : null;
    if (composite !== null && (lastClass === 0 || lastClass < scalarClass)) {
      composed[starterPosition] = composite;
      starter = composite;
      continue;
    }
    if (scalarClass === 0) {
      starterPosition = composed.length;
      starter = scalar;
      lastClass = 0;
    } else {
      lastClass = scalarClass;
    }
    composed.push(scalar);
  }
  return composed;
}

function task4SecondNfkc(scalars: readonly number[], artifactBytes: string): number[] {
  return task4ComposeNormalized(scalars, artifactBytes, false);
}

export function task4NfcNormalize(
  expression: string,
  runtime: Task4UnicodeRuntime,
): string {
  return scalarsToString(task4ComposeNormalized(
    decodeScalars(expression),
    runtime.unicode_bundle.normalization.bytes_utf8,
    true,
  ));
}

export function task4WordTokens(
  expression: string,
  runtime: Task4UnicodeRuntime,
): string[] {
  const signature = [
    runtime.runtime_digest,
    runtime.unicode_bundle.bundle_digest,
    runtime.unicode_bundle.normalization.bytes_utf8,
    runtime.unicode_bundle.casefold.bytes_utf8,
    runtime.unicode_bundle.whitespace.bytes_utf8,
    runtime.unicode_bundle.word_break.bytes_utf8,
  ];
  let cache = TASK4_WORD_TOKEN_CACHE.get(runtime);
  if (cache === undefined || cache.signature.some((value, index) => value !== signature[index])) {
    cache = { signature, values: new Map() };
    TASK4_WORD_TOKEN_CACHE.set(runtime, cache);
  }
  const cached = cache.values.get(expression);
  if (cached !== undefined) return [...cached];
  let normalized: number[];
  try {
    normalized = task4SecondNfkc(
      normalizeForLeakage(expression, runtime.unicode_bundle),
      runtime.unicode_bundle.normalization.bytes_utf8,
    );
  } catch { task4FailContract("unicode_runtime"); }
  if (normalized.length === 0) return [];
  const tables = parseBoundaryTables(runtime.unicode_bundle.word_break, "word");
  const properties = normalized.map((scalar) => lookupProperty(tables.property_ranges, scalar));
  const segments: number[][] = [];
  let start = 0;
  for (let index = 1; index < normalized.length; index += 1) {
    if (wordBreakAt(normalized, properties, tables, index)) {
      segments.push(normalized.slice(start, index));
      start = index;
    }
  }
  segments.push(normalized.slice(start));
  const tokens = segments.filter((segment) => segment.some((scalar) => {
    const property = lookupProperty(tables.property_ranges, scalar);
    return property === "ALetter" || property === "Hebrew_Letter"
      || property === "Numeric" || property === "Katakana";
  })).map(scalarsToString);
  cache.values.set(expression, Object.freeze([...tokens]));
  return tokens;
}

function graphemeBreakAt(
  scalars: readonly number[],
  properties: readonly string[],
  tables: BoundaryTables,
  index: number,
): boolean {
  const left = properties[index - 1]!;
  const right = properties[index]!;
  if (left === "CR" && right === "LF") return false;
  if (["Control", "CR", "LF"].includes(left) || ["Control", "CR", "LF"].includes(right)) return true;
  if (left === "L" && ["L", "V", "LV", "LVT"].includes(right)) return false;
  if (["LV", "V"].includes(left) && ["V", "T"].includes(right)) return false;
  if (["LVT", "T"].includes(left) && right === "T") return false;
  if (right === "Extend" || right === "ZWJ" || right === "SpacingMark" || left === "Prepend") return false;
  if (tables.indic_conjunct_break_ranges !== undefined
    && lookupProperty(tables.indic_conjunct_break_ranges, scalars[index]!, "None") === "Consonant") {
    let cursor = index - 1;
    let linker = false;
    while (cursor >= 0) {
      const property = lookupProperty(tables.indic_conjunct_break_ranges, scalars[cursor]!, "None");
      if (property === "Extend") { cursor -= 1; continue; }
      if (property === "Linker") { linker = true; cursor -= 1; continue; }
      if (property === "Consonant" && linker) return false;
      break;
    }
  }
  if (inRanges(tables.extended_pictographic_ranges, scalars[index]!)) {
    let cursor = index - 1;
    if (properties[cursor] === "ZWJ") {
      cursor -= 1;
      while (cursor >= 0 && properties[cursor] === "Extend") cursor -= 1;
      if (cursor >= 0 && inRanges(tables.extended_pictographic_ranges, scalars[cursor]!)) return false;
    }
  }
  if (right === "Regional_Indicator") {
    let count = 0;
    for (let cursor = index - 1; cursor >= 0 && properties[cursor] === "Regional_Indicator"; cursor -= 1) count += 1;
    if (count % 2 === 1) return false;
  }
  return true;
}

export function task4GraphemeClusters(
  expression: string,
  runtime: Task4UnicodeRuntime,
): string[] {
  const scalars = decodeScalars(expression);
  if (scalars.length === 0) return [];
  const tables = parseBoundaryTables(runtime.unicode_bundle.grapheme_break, "grapheme");
  const properties = scalars.map((scalar) => lookupProperty(tables.property_ranges, scalar));
  const clusters: string[] = [];
  let start = 0;
  for (let index = 1; index < scalars.length; index += 1) {
    if (graphemeBreakAt(scalars, properties, tables, index)) {
      clusters.push(scalarsToString(scalars.slice(start, index)));
      start = index;
    }
  }
  clusters.push(scalarsToString(scalars.slice(start)));
  return clusters;
}

export function task4GraphemeCount(expression: string, runtime: Task4UnicodeRuntime): number {
  return task4GraphemeClusters(expression, runtime).length;
}

export interface Task4PatternContext {
  journeys: string[];
  stages: string[];
  states: string[];
  channels: string[];
  modalities: string[];
  locales: string[];
  risk_levels: string[];
}

export interface Task4ContentPatternPayload {
  evidence_strength: string;
  problem: string;
  contexts: Task4PatternContext[];
  mechanism: string;
  source_refs: string[];
  counterexamples: string[];
  failure_modes: string[];
  transfer_conditions: Array<{ field: string; values: string[] }>;
  non_transferable_details: string[];
  rights_boundary: string;
}

export type Task4ContentPatternRecord = DurableRecord<Task4ContentPatternPayload>;

export interface RetrievalQuery {
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  query_terms: [string, ...string[]];
  query_source_refs: [DigestRef, ...DigestRef[]];
  registry_versions: [ArtifactRef, ...ArtifactRef[]];
  query_digest: string;
}

export interface RetrievalTransferCondition {
  field:
    | "project_id"
    | "memory_scope"
    | "product_area"
    | "journey_state"
    | "channel"
    | "locale"
    | "market"
    | "risk";
  allowed_values: [string, ...string[]];
}

interface RetrievalDispositionEvidenceBase {
  contract_version: "contentmd.task4-retrieval-disposition-evidence/0.1.0";
  evidence_id: string;
  pattern_ref: DigestRef;
  verification_mode: "development_fixture";
  source_class: Task4AllowedSourceClass;
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  evidence_digest: string;
}

export type RetrievalDispositionEvidence =
  | (RetrievalDispositionEvidenceBase & {
    evidence_kind: "approval";
    approval_state: "approved_current" | "not_approved" | "expired" | "revoked";
  })
  | (RetrievalDispositionEvidenceBase & {
    evidence_kind: "rights";
    rights_state: "retrieval_permitted" | "blocking_only" | "prohibited" | "unknown";
  })
  | (RetrievalDispositionEvidenceBase & {
    evidence_kind: "freshness";
    freshness_state: "current" | "stale" | "unknown";
    evaluated_at: string;
    expires_at: string | null;
  })
  | (RetrievalDispositionEvidenceBase & {
    evidence_kind: "dispute";
    dispute_state: "none" | "resolved" | "unresolved";
    resolution_ref: DigestRef | null;
  });

export interface RetrievalProjectionEvidence {
  contract_version: "contentmd.task4-retrieval-projection-evidence/0.1.0";
  evidence_id: string;
  pattern_ref: DigestRef;
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  evidence_strength: "direct_project_evidence" | "qualified_project_review" | "project_owned_synthetic";
  outcome_text: [string, ...string[]];
  transfer_conditions: RetrievalTransferCondition[];
  approval_ref: DigestRef;
  rights_ref: DigestRef;
  verification_mode: "development_fixture";
  source_class: Task4AllowedSourceClass;
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  evidence_digest: string;
}

export interface RetrievalProjection {
  contract_version: "contentmd.task4-retrieval-projection/0.1.0";
  projection_id: string;
  pattern_ref: DigestRef;
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  lifecycle_state:
    | "proposed" | "approved" | "active" | "superseded" | "retired"
    | "rejected" | "expired" | "revoked";
  approval_state: "approved_current" | "not_approved" | "expired" | "revoked";
  rights_state: "retrieval_permitted" | "blocking_only" | "prohibited" | "unknown";
  freshness_state: "current" | "stale" | "unknown";
  dispute_state: "none" | "resolved" | "unresolved";
  expires_at: string | null;
  source_class: Task4AllowedSourceClass;
  evidence_strength: "direct_project_evidence" | "qualified_project_review" | "project_owned_synthetic";
  mechanism_text: [string, ...string[]];
  problem_text: [string, ...string[]];
  context_text: [string, ...string[]];
  outcome_text: [string, ...string[]];
  failure_mode_text: [string, ...string[]];
  transfer_conditions: RetrievalTransferCondition[];
  projection_evidence_ref: DigestRef;
  approval_ref: DigestRef;
  rights_ref: DigestRef;
  freshness_ref: DigestRef;
  dispute_ref: DigestRef;
  authority_effect: "none";
  projection_digest: string;
}

export interface ApprovedRetrievalCandidate {
  source_class: Task4AllowedSourceClass;
  pattern: Task4ContentPatternRecord;
  projection: RetrievalProjection;
  projection_evidence: RetrievalProjectionEvidence;
  approval_evidence: RetrievalDispositionEvidence & { evidence_kind: "approval" };
  rights_evidence: RetrievalDispositionEvidence & { evidence_kind: "rights" };
  freshness_evidence: RetrievalDispositionEvidence & { evidence_kind: "freshness" };
  dispute_evidence: RetrievalDispositionEvidence & { evidence_kind: "dispute" };
}

export interface QuarantinedRetrievalCandidate {
  source_class: Task4QuarantinedSourceClass;
  evidence_ref: DigestRef;
  purpose: "retrieval_exclusion_only";
  contains_expression: false;
}

export interface RetrievalInput {
  record_mode: Task4RecordMode;
  evaluation_at: string;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  query: RetrievalQuery;
  candidates: Array<ApprovedRetrievalCandidate | QuarantinedRetrievalCandidate>;
}

export interface VerifyRetrievalSnapshotInput {
  record_mode: Task4RecordMode;
  retrieval_input: RetrievalInput;
  snapshot: RetrievalSnapshot;
}

export type RetrievalExclusionReason =
  | "quarantined_source_class"
  | "project_mismatch"
  | "memory_scope_mismatch"
  | "product_area_mismatch"
  | "journey_state_mismatch"
  | "channel_mismatch"
  | "locale_mismatch"
  | "market_mismatch"
  | "risk_mismatch"
  | "revoked"
  | "expired"
  | "lifecycle_not_active"
  | "approval_not_current"
  | "rights_not_permitted"
  | "freshness_not_current"
  | "unresolved_dispute"
  | "transfer_incompatible";

export interface RetrievalScore {
  mechanism_coverage: number;
  problem_coverage: number;
  context_coverage: number;
  outcome_coverage: number;
  failure_mode_coverage: number;
  lexical_score: number;
  evidence_strength_score: number;
  transfer_condition_score: number;
  total_score: number;
}

export interface RetrievalHit {
  rank: number;
  pattern_ref: DigestRef;
  projection_ref: DigestRef;
  score: RetrievalScore;
}

export interface RetrievalExclusion {
  subject_ref: DigestRef;
  reason: RetrievalExclusionReason;
}

export interface RetrievalSnapshot {
  contract_version: "contentmd.task4-retrieval-snapshot/0.1.0";
  snapshot_id: string;
  record_mode: "development_fixture";
  query: RetrievalQuery;
  query_digest: string;
  candidate_set_digest: string;
  candidates: RetrievalHit[];
  exclusions: RetrievalExclusion[];
  registry_versions: [ArtifactRef, ...ArtifactRef[]];
  producer_manifest_digest: string;
  producer_verification_ref: DigestRef | null;
  unicode_runtime_digest: string;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  snapshot_digest: string;
}

const RETRIEVAL_INPUT_KEYS = [
  "record_mode", "evaluation_at", "producer", "unicode_runtime", "query", "candidates",
] as const;
const RETRIEVAL_QUERY_KEYS = [
  "project_id", "memory_scope", "product_area", "journey_state", "channel", "locale",
  "market", "risk", "query_terms", "query_source_refs", "registry_versions", "query_digest",
] as const;
const APPROVED_CANDIDATE_KEYS = [
  "source_class", "pattern", "projection", "projection_evidence", "approval_evidence",
  "rights_evidence", "freshness_evidence", "dispute_evidence",
] as const;
const QUARANTINE_KEYS = ["source_class", "evidence_ref", "purpose", "contains_expression"] as const;
const PROJECTION_KEYS = [
  "contract_version", "projection_id", "pattern_ref", "project_id", "memory_scope", "product_area",
  "journey_state", "channel", "locale", "market", "risk", "lifecycle_state", "approval_state",
  "rights_state", "freshness_state", "dispute_state", "expires_at", "source_class", "evidence_strength",
  "mechanism_text", "problem_text", "context_text", "outcome_text", "failure_mode_text",
  "transfer_conditions", "projection_evidence_ref", "approval_ref", "rights_ref", "freshness_ref",
  "dispute_ref", "authority_effect", "projection_digest",
] as const;
const PROJECTION_EVIDENCE_KEYS = [
  "contract_version", "evidence_id", "pattern_ref", "project_id", "memory_scope", "product_area",
  "journey_state", "channel", "locale", "market", "risk", "evidence_strength", "outcome_text",
  "transfer_conditions", "approval_ref", "rights_ref", "verification_mode", "source_class",
  "source_refs", "authority_effect", "evidence_digest",
] as const;
const PATTERN_KEYS = [
  "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
  "lifecycle_state", "payload", "content_digest",
] as const;
const SNAPSHOT_KEYS = [
  "contract_version", "snapshot_id", "record_mode", "query", "query_digest", "candidate_set_digest",
  "candidates", "exclusions", "registry_versions", "producer_manifest_digest",
  "producer_verification_ref", "unicode_runtime_digest", "provenance", "authority_effect", "snapshot_digest",
] as const;

function assertRefArray(value: unknown, minimum = 0): asserts value is DigestRef[] {
  assertArray(value, minimum);
  value.forEach(task4AssertDigestRefShape);
}

function assertArtifactArray(value: unknown, minimum = 0): asserts value is ArtifactRef[] {
  assertArray(value, minimum);
  value.forEach(task4AssertArtifactRefShape);
}

function assertTransferConditions(value: unknown): asserts value is RetrievalTransferCondition[] {
  assertArray(value);
  for (const condition of value) {
    task4AssertExactKeys(condition, ["field", "allowed_values"]);
    const typed = condition as unknown as RetrievalTransferCondition;
    if (!["project_id", "memory_scope", "product_area", "journey_state", "channel", "locale", "market", "risk"]
      .includes(String(typed.field))) task4FailContract("canonical_value");
    assertTextArray(typed.allowed_values, 1);
    assertScalarSet(typed.allowed_values);
  }
  const fields = (value as RetrievalTransferCondition[]).map((condition) => condition.field);
  if (!task4CanonicalEqual(fields, task4SortScalar(fields)) || new Set(fields).size !== fields.length) {
    task4FailContract("canonical_value");
  }
}

function assertPatternShape(value: unknown): asserts value is Task4ContentPatternRecord {
  task4AssertExactKeys(value, PATTERN_KEYS);
  const record = value as unknown as Task4ContentPatternRecord;
  task4AssertExactKeys(record.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  assertCanonicalTextSet(record.scope.resource_refs);
  assertCanonicalTextSet(record.scope.data_classes);
  assertArray(record.provenance);
  for (const entry of record.provenance) {
    task4AssertExactKeys(entry, ["record_id", "relationship", "content_digest"]);
    assertRecordId(entry.record_id);
    assertText(entry.relationship);
    if (typeof entry.content_digest !== "string") task4FailContract("canonical_value");
  }
  task4AssertExactKeys(record.payload, [
    "evidence_strength", "problem", "contexts", "mechanism", "source_refs", "counterexamples",
    "failure_modes", "transfer_conditions", "non_transferable_details", "rights_boundary",
  ]);
  assertText(record.payload.evidence_strength);
  assertText(record.payload.problem);
  assertText(record.payload.mechanism);
  assertText(record.payload.rights_boundary);
  assertCanonicalTextSet(record.payload.source_refs, 1);
  assertUniqueTextArray(record.payload.counterexamples, 1);
  assertUniqueTextArray(record.payload.failure_modes, 1);
  assertUniqueTextArray(record.payload.non_transferable_details, 1);
  assertArray(record.payload.contexts, 1);
  for (const context of record.payload.contexts) {
    task4AssertExactKeys(context, [
      "journeys", "stages", "states", "channels", "modalities", "locales", "risk_levels",
    ]);
    for (const field of ["journeys", "stages", "states", "channels", "modalities", "locales", "risk_levels"] as const) {
      assertCanonicalTextSet(context[field], 1);
    }
  }
  assertCanonicalSet(record.payload.contexts);
  assertArray(record.payload.transfer_conditions, 1);
  for (const condition of record.payload.transfer_conditions) {
    task4AssertExactKeys(condition, ["field", "values"]);
    if (!["journey", "stage", "state", "channel", "modality", "locale", "risk_level", "rights_status"]
      .includes(condition.field)) task4FailContract("canonical_value");
    assertCanonicalTextSet(condition.values, 1);
  }
  const transferFields = record.payload.transfer_conditions.map((condition) => condition.field);
  if (!task4CanonicalEqual(transferFields, task4SortScalar(transferFields))
    || new Set(transferFields).size !== transferFields.length) task4FailContract("canonical_value");
  assertRecordId(record.record_id);
  assertText(record.schema_id);
  if (record.schema_id !== "contentmd.content-pattern-record"
    || record.schema_version !== "0.1.0"
    || typeof record.record_version !== "number"
    || (Number.isFinite(record.record_version) && record.record_version !== 1)) {
    task4FailContract("canonical_value");
  }
  if (!MEMORY_SCOPES.includes(record.scope.memory_scope)) task4FailContract("canonical_value");
  if (record.scope.project_id !== null) assertText(record.scope.project_id);
  if (!["proposed", "approved", "active", "superseded", "retired", "rejected"].includes(record.lifecycle_state)) {
    task4FailContract("canonical_value");
  }
  if (typeof record.content_digest !== "string") task4FailContract("canonical_value");
}

function assertProjectionShape(value: unknown): asserts value is RetrievalProjection {
  task4AssertExactKeys(value, PROJECTION_KEYS);
  const record = value as unknown as RetrievalProjection;
  task4AssertDigestRefShape(record.pattern_ref);
  for (const key of ["project_id", "product_area", "journey_state", "channel", "locale", "market", "risk"] as const) {
    assertText(record[key]);
  }
  if (record.contract_version !== "contentmd.task4-retrieval-projection/0.1.0"
    || !MEMORY_SCOPES.includes(record.memory_scope)
    || !["proposed", "approved", "active", "superseded", "retired", "rejected", "expired", "revoked"]
      .includes(record.lifecycle_state)
    || !["approved_current", "not_approved", "expired", "revoked"].includes(record.approval_state)
    || !["retrieval_permitted", "blocking_only", "prohibited", "unknown"].includes(record.rights_state)
    || !["current", "stale", "unknown"].includes(record.freshness_state)
    || !["none", "resolved", "unresolved"].includes(record.dispute_state)
    || !ALLOWED_SOURCE_CLASSES.includes(record.source_class)
    || !["direct_project_evidence", "qualified_project_review", "project_owned_synthetic"]
      .includes(record.evidence_strength)
    || record.authority_effect !== "none") task4FailContract("canonical_value");
  if (record.expires_at !== null) assertTimestamp(record.expires_at);
  for (const key of ["mechanism_text", "problem_text", "context_text", "outcome_text", "failure_mode_text"] as const) {
    assertTextArray(record[key], 1);
  }
  assertTransferConditions(record.transfer_conditions);
  for (const key of [
    "projection_evidence_ref", "approval_ref", "rights_ref", "freshness_ref", "dispute_ref",
  ] as const) task4AssertDigestRefShape(record[key]);
  assertRecordId(record.projection_id);
  if (typeof record.projection_digest !== "string") task4FailContract("canonical_value");
}

function assertProjectionEvidenceShape(value: unknown): asserts value is RetrievalProjectionEvidence {
  task4AssertExactKeys(value, PROJECTION_EVIDENCE_KEYS);
  const record = value as unknown as RetrievalProjectionEvidence;
  task4AssertDigestRefShape(record.pattern_ref);
  for (const key of ["project_id", "product_area", "journey_state", "channel", "locale", "market", "risk"] as const) {
    assertText(record[key]);
  }
  if (record.contract_version !== "contentmd.task4-retrieval-projection-evidence/0.1.0"
    || !MEMORY_SCOPES.includes(record.memory_scope)
    || !["direct_project_evidence", "qualified_project_review", "project_owned_synthetic"]
      .includes(record.evidence_strength)
    || record.verification_mode !== "development_fixture"
    || !ALLOWED_SOURCE_CLASSES.includes(record.source_class)
    || record.authority_effect !== "none") task4FailContract("canonical_value");
  assertTextArray(record.outcome_text, 1);
  assertTransferConditions(record.transfer_conditions);
  task4AssertDigestRefShape(record.approval_ref);
  task4AssertDigestRefShape(record.rights_ref);
  assertRefArray(record.source_refs, 1);
  assertCanonicalSet(record.source_refs);
  assertRecordId(record.evidence_id);
  if (typeof record.evidence_digest !== "string") task4FailContract("canonical_value");
}

function dispositionKeys(kind: string): readonly string[] {
  const common = [
    "contract_version", "evidence_id", "pattern_ref", "verification_mode", "source_class",
    "source_refs", "authority_effect", "evidence_digest", "evidence_kind",
  ];
  if (kind === "approval") return [...common, "approval_state"];
  if (kind === "rights") return [...common, "rights_state"];
  if (kind === "freshness") return [...common, "freshness_state", "evaluated_at", "expires_at"];
  if (kind === "dispute") return [...common, "dispute_state", "resolution_ref"];
  task4FailContract("canonical_value");
}

function assertDispositionShape(value: unknown, expectedKind: string): asserts value is RetrievalDispositionEvidence {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task4FailContract("canonical_value");
  const kindDescriptor = Object.getOwnPropertyDescriptor(value, "evidence_kind");
  if (kindDescriptor === undefined || !("value" in kindDescriptor) || kindDescriptor.value !== expectedKind) {
    task4FailContract("canonical_value");
  }
  task4AssertExactKeys(value, dispositionKeys(expectedKind));
  const record = value as unknown as RetrievalDispositionEvidence;
  task4AssertDigestRefShape(record.pattern_ref);
  assertRefArray(record.source_refs, 1);
  assertCanonicalSet(record.source_refs);
  if (record.contract_version !== "contentmd.task4-retrieval-disposition-evidence/0.1.0"
    || record.verification_mode !== "development_fixture"
    || !ALLOWED_SOURCE_CLASSES.includes(record.source_class)
    || record.authority_effect !== "none") task4FailContract("canonical_value");
  assertRecordId(record.evidence_id);
  if (typeof record.evidence_digest !== "string") task4FailContract("canonical_value");
  if (expectedKind === "approval"
    && !["approved_current", "not_approved", "expired", "revoked"].includes(String((record as Extract<RetrievalDispositionEvidence, { evidence_kind: "approval" }>).approval_state))) {
    task4FailContract("canonical_value");
  }
  if (expectedKind === "rights"
    && !["retrieval_permitted", "blocking_only", "prohibited", "unknown"].includes(String((record as Extract<RetrievalDispositionEvidence, { evidence_kind: "rights" }>).rights_state))) {
    task4FailContract("canonical_value");
  }
  if (expectedKind === "freshness") {
    const freshness = record as Extract<RetrievalDispositionEvidence, { evidence_kind: "freshness" }>;
    if (!["current", "stale", "unknown"].includes(String(freshness.freshness_state))) task4FailContract("canonical_value");
    assertTimestamp(freshness.evaluated_at);
    if (freshness.expires_at !== null) assertTimestamp(freshness.expires_at);
  }
  if (expectedKind === "dispute") {
    const dispute = record as Extract<RetrievalDispositionEvidence, { evidence_kind: "dispute" }>;
    if (!["none", "resolved", "unresolved"].includes(String(dispute.dispute_state))) task4FailContract("canonical_value");
    if (dispute.resolution_ref !== null) task4AssertDigestRefShape(dispute.resolution_ref);
  }
}

function assertQueryShape(value: unknown): asserts value is RetrievalQuery {
  task4AssertExactKeys(value, RETRIEVAL_QUERY_KEYS);
  const record = value as unknown as RetrievalQuery;
  for (const key of ["project_id", "product_area", "journey_state", "channel", "locale", "market", "risk"] as const) {
    assertText(record[key]);
  }
  if (!MEMORY_SCOPES.includes(record.memory_scope)) task4FailContract("canonical_value");
  assertTextArray(record.query_terms, 1);
  assertRefArray(record.query_source_refs, 1);
  assertCanonicalSet(record.query_source_refs);
  assertArtifactArray(record.registry_versions, 1);
  assertCanonicalSet(record.registry_versions);
  if (typeof record.query_digest !== "string") task4FailContract("canonical_value");
}

function hasQuarantinedExpression(value: Record<string | symbol, unknown>): boolean {
  return Reflect.ownKeys(value).some((key) => typeof key === "string"
    && (key === "expression" || key === "expression_digest"
      || key === "browser_expression" || key === "competitor_expression"
      || key === "third_party_expression"));
}

export function task4HasQuarantinedExpressions(value: unknown): boolean {
  const seen = new Set<object>();
  let found = false;
  const visit = (current: unknown): void => {
    if (found || current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    if (!Array.isArray(current)) {
      const record = current as Record<string | symbol, unknown>;
      const sourceClass = Object.getOwnPropertyDescriptor(record, "source_class")?.value;
      const purpose = Object.getOwnPropertyDescriptor(record, "purpose")?.value;
      if ((QUARANTINED_SOURCE_CLASSES.includes(sourceClass as Task4QuarantinedSourceClass)
          || purpose === "retrieval_exclusion_only" || purpose === "feature_exclusion_only")
        && hasQuarantinedExpression(record)) {
        found = true;
        return;
      }
    }
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) visit(descriptor.value);
    }
  };
  visit(value);
  return found;
}

export function task4AssertNoQuarantinedExpressions(value: unknown): void {
  if (task4HasQuarantinedExpressions(value)) {
    task4FailContract("quarantined_expression_present");
  }
}

function assertCandidateShape(value: unknown): asserts value is ApprovedRetrievalCandidate | QuarantinedRetrievalCandidate {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task4FailContract("canonical_value");
  const sourceClass = Object.getOwnPropertyDescriptor(value, "source_class")?.value;
  if (QUARANTINED_SOURCE_CLASSES.includes(sourceClass as Task4QuarantinedSourceClass)) {
    const candidate = value as Record<string | symbol, unknown>;
    if (hasQuarantinedExpression(candidate)) {
      const allowed = new Set<string | symbol>(QUARANTINE_KEYS);
      for (const key of Reflect.ownKeys(candidate)) {
        if (!allowed.has(key) && !(typeof key === "string"
          && (key === "expression" || key === "expression_digest"
            || key === "browser_expression" || key === "competitor_expression"
            || key === "third_party_expression"))) {
          task4FailContract("canonical_value");
        }
      }
      task4AssertDigestRefShape(candidate.evidence_ref);
      if (candidate.purpose !== "retrieval_exclusion_only" || candidate.contains_expression !== false) {
        task4FailContract("canonical_value");
      }
      return;
    }
    task4AssertExactKeys(value, QUARANTINE_KEYS);
    task4AssertDigestRefShape(value.evidence_ref);
    if (value.purpose !== "retrieval_exclusion_only" || value.contains_expression !== false) {
      task4FailContract("canonical_value");
    }
    return;
  }
  if (!ALLOWED_SOURCE_CLASSES.includes(sourceClass as Task4AllowedSourceClass)) task4FailContract("canonical_value");
  task4AssertExactKeys(value, APPROVED_CANDIDATE_KEYS);
  assertPatternShape(value.pattern);
  assertProjectionShape(value.projection);
  assertProjectionEvidenceShape(value.projection_evidence);
  assertDispositionShape(value.approval_evidence, "approval");
  assertDispositionShape(value.rights_evidence, "rights");
  assertDispositionShape(value.freshness_evidence, "freshness");
  assertDispositionShape(value.dispute_evidence, "dispute");
}

function assertRetrievalInputShape(value: unknown): asserts value is RetrievalInput {
  task4AssertExactKeys(value, RETRIEVAL_INPUT_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  assertTimestamp(value.evaluation_at);
  assertProducerShape(value.producer);
  assertUnicodeRuntimeShape(value.unicode_runtime);
  assertQueryShape(value.query);
  assertArray(value.candidates);
  value.candidates.forEach(assertCandidateShape);
}

function verifyRefDigests(value: unknown): void {
  const visited = new WeakSet<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current !== "object") return;
    if (visited.has(current)) return;
    visited.add(current);
    if (!Array.isArray(current)) {
      const keys = Reflect.ownKeys(current);
      if (keys.length === 4 && keys.every((key) => typeof key === "string")
        && ["record_id", "schema_id", "schema_version", "content_digest"].every((key) => keys.includes(key))) {
        assertDigest((current as DigestRef).content_digest);
      }
      if (keys.length === 3 && keys.every((key) => typeof key === "string")
        && ["artifact_id", "artifact_version", "artifact_digest"].every((key) => keys.includes(key))) {
        assertDigest((current as ArtifactRef).artifact_digest);
      }
    }
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key)!;
      if ("value" in descriptor) visit(descriptor.value);
    }
  };
  visit(value);
}

function verifyPatternDigest(pattern: Task4ContentPatternRecord): void {
  assertDigest(pattern.content_digest);
  if (!task4ContainsNonfinite(pattern) && verifyRecordDigest(pattern).valid !== true) task4FailContract("digest");
}

function verifyPattern(pattern: Task4ContentPatternRecord): DigestRef {
  if (pattern.schema_id !== "contentmd.content-pattern-record"
    || pattern.schema_version !== "0.1.0"
    || (Number.isFinite(pattern.record_version) && pattern.record_version !== 1)) {
    task4FailContract("reference_binding");
  }
  verifyPatternDigest(pattern);
  return task4DigestRef(pattern.record_id, pattern.schema_id, pattern.content_digest);
}

function verifyDispositionDigest(evidence: RetrievalDispositionEvidence): void {
  assertDigest(evidence.evidence_digest);
  if (task4ContainsNonfinite(evidence)) return;
  const { evidence_id: _id, evidence_digest: _digest, ...identity } = evidence;
  const expectedId = `retrieval-disposition-evidence.${sha256Canonical(identity)}`;
  const { evidence_digest: _drop, ...content } = evidence;
  if (evidence.evidence_id !== expectedId || evidence.evidence_digest !== sha256Canonical(content)) {
    task4FailContract("digest");
  }
}

function verifyDisposition(
  evidence: RetrievalDispositionEvidence,
  expectedKind: RetrievalDispositionEvidence["evidence_kind"],
): DigestRef {
  if (evidence.evidence_kind !== expectedKind) task4FailContract("reference_binding");
  verifyDispositionDigest(evidence);
  if (evidence.evidence_kind === "dispute") {
    if ((evidence.dispute_state === "resolved") !== (evidence.resolution_ref !== null)) {
      task4FailContract("reference_binding");
    }
  }
  return task4DigestRef(
    evidence.evidence_id,
    "contentmd.task4-retrieval-disposition-evidence",
    evidence.evidence_digest,
  );
}

function verifyProjectionEvidenceDigest(evidence: RetrievalProjectionEvidence): void {
  assertDigest(evidence.evidence_digest);
  if (task4ContainsNonfinite(evidence)) return;
  const { evidence_id: _id, evidence_digest: _digest, ...identity } = evidence;
  const expectedId = `retrieval-projection-evidence.${sha256Canonical(identity)}`;
  const { evidence_digest: _drop, ...content } = evidence;
  if (evidence.evidence_id !== expectedId || evidence.evidence_digest !== sha256Canonical(content)) {
    task4FailContract("digest");
  }
}

function verifyProjectionEvidence(evidence: RetrievalProjectionEvidence): DigestRef {
  verifyProjectionEvidenceDigest(evidence);
  return task4DigestRef(
    evidence.evidence_id,
    "contentmd.task4-retrieval-projection-evidence",
    evidence.evidence_digest,
  );
}

function verifyProjectionDigest(projection: RetrievalProjection): void {
  assertDigest(projection.projection_digest);
  if (task4ContainsNonfinite(projection)) return;
  const { projection_id: _id, projection_digest: _digest, ...identity } = projection;
  const expectedId = `retrieval-projection.${sha256Canonical(identity)}`;
  const { projection_digest: _drop, ...content } = projection;
  if (projection.projection_id !== expectedId || projection.projection_digest !== sha256Canonical(content)) {
    task4FailContract("digest");
  }
}

function verifyProjection(projection: RetrievalProjection): DigestRef {
  verifyProjectionDigest(projection);
  return task4DigestRef(
    projection.projection_id,
    "contentmd.task4-retrieval-projection",
    projection.projection_digest,
  );
}

interface VerifiedApprovedCandidate {
  input: ApprovedRetrievalCandidate;
  pattern_ref: DigestRef;
  projection_ref: DigestRef;
  projection_evidence_ref: DigestRef;
  approval_ref: DigestRef;
  rights_ref: DigestRef;
  freshness_ref: DigestRef;
  dispute_ref: DigestRef;
}

function verifyApprovedCandidateDigests(candidate: ApprovedRetrievalCandidate): void {
  verifyPatternDigest(candidate.pattern);
  verifyProjectionDigest(candidate.projection);
  verifyProjectionEvidenceDigest(candidate.projection_evidence);
  verifyDispositionDigest(candidate.approval_evidence);
  verifyDispositionDigest(candidate.rights_evidence);
  verifyDispositionDigest(candidate.freshness_evidence);
  verifyDispositionDigest(candidate.dispute_evidence);
}

function patternContextText(pattern: Task4ContentPatternRecord): string[] {
  return pattern.payload.contexts.flatMap((context) => [
    ...context.journeys,
    ...context.stages,
    ...context.states,
    ...context.channels,
    ...context.modalities,
    ...context.locales,
    ...context.risk_levels,
  ]);
}

function verifyApprovedCandidate(
  candidate: ApprovedRetrievalCandidate,
  evaluationAt: string,
): VerifiedApprovedCandidate {
  const patternRef = verifyPattern(candidate.pattern);
  const projectionRef = verifyProjection(candidate.projection);
  const projectionEvidenceRef = verifyProjectionEvidence(candidate.projection_evidence);
  const approvalRef = verifyDisposition(candidate.approval_evidence, "approval");
  const rightsRef = verifyDisposition(candidate.rights_evidence, "rights");
  const freshnessRef = verifyDisposition(candidate.freshness_evidence, "freshness");
  const disputeRef = verifyDisposition(candidate.dispute_evidence, "dispute");
  const projection = candidate.projection;
  const evidence = candidate.projection_evidence;
  const scopeProjection = {
    project_id: projection.project_id,
    memory_scope: projection.memory_scope,
    product_area: projection.product_area,
    journey_state: projection.journey_state,
    channel: projection.channel,
    locale: projection.locale,
    market: projection.market,
    risk: projection.risk,
  };
  const evidenceScope = {
    project_id: evidence.project_id,
    memory_scope: evidence.memory_scope,
    product_area: evidence.product_area,
    journey_state: evidence.journey_state,
    channel: evidence.channel,
    locale: evidence.locale,
    market: evidence.market,
    risk: evidence.risk,
  };
  if (candidate.source_class !== projection.source_class
    || candidate.source_class !== evidence.source_class
    || !task4RefsEqual(patternRef, projection.pattern_ref)
    || !task4RefsEqual(patternRef, evidence.pattern_ref)
    || !task4CanonicalEqual(scopeProjection, evidenceScope)
    || projection.project_id !== candidate.pattern.scope.project_id
    || projection.memory_scope !== candidate.pattern.scope.memory_scope
    || projection.evidence_strength !== evidence.evidence_strength
    || !task4CanonicalEqual(projection.outcome_text, evidence.outcome_text)
    || !task4CanonicalEqual(projection.transfer_conditions, evidence.transfer_conditions)
    || !task4RefsEqual(projection.projection_evidence_ref, projectionEvidenceRef)
    || !task4RefsEqual(projection.approval_ref, approvalRef)
    || !task4RefsEqual(projection.rights_ref, rightsRef)
    || !task4RefsEqual(projection.freshness_ref, freshnessRef)
    || !task4RefsEqual(projection.dispute_ref, disputeRef)
    || !task4RefsEqual(evidence.approval_ref, approvalRef)
    || !task4RefsEqual(evidence.rights_ref, rightsRef)
    || !task4CanonicalEqual(projection.mechanism_text, [candidate.pattern.payload.mechanism])
    || !task4CanonicalEqual(projection.problem_text, [candidate.pattern.payload.problem])
    || !task4CanonicalEqual(projection.context_text, patternContextText(candidate.pattern))
    || !task4CanonicalEqual(projection.failure_mode_text, candidate.pattern.payload.failure_modes)
    || candidate.approval_evidence.approval_state !== projection.approval_state
    || candidate.rights_evidence.rights_state !== projection.rights_state
    || candidate.freshness_evidence.freshness_state !== projection.freshness_state
    || candidate.freshness_evidence.expires_at !== projection.expires_at
    || candidate.freshness_evidence.evaluated_at !== evaluationAt
    || candidate.dispute_evidence.dispute_state !== projection.dispute_state) {
    task4FailContract("reference_binding");
  }
  for (const disposition of [
    candidate.approval_evidence, candidate.rights_evidence,
    candidate.freshness_evidence, candidate.dispute_evidence,
  ]) {
    if (!task4RefsEqual(disposition.pattern_ref, patternRef)
      || disposition.source_class !== candidate.source_class) task4FailContract("reference_binding");
  }
  return {
    input: candidate,
    pattern_ref: patternRef,
    projection_ref: projectionRef,
    projection_evidence_ref: projectionEvidenceRef,
    approval_ref: approvalRef,
    rights_ref: rightsRef,
    freshness_ref: freshnessRef,
    dispute_ref: disputeRef,
  };
}

function normalizeQuery(query: RetrievalQuery, runtime: Task4UnicodeRuntime): {
  normalized_query_term_sequences: string[][];
  normalized_query_tokens: string[];
} {
  const normalized = query.query_terms.map((term) => task4WordTokens(term, runtime));
  if (normalized.some((tokens) => tokens.length === 0)) task4FailContract("canonical_value");
  if (!task4CanonicalEqual(normalized, task4SortCanonical(normalized))
    || new Set(normalized.map(canonicalJson)).size !== normalized.length) task4FailContract("canonical_value");
  const tokens = task4SortScalar([...new Set(normalized.flat())]);
  const expectedDigest = sha256Canonical({
    contract_version: "contentmd.task4-retrieval-query/0.1.0",
    project_id: query.project_id,
    memory_scope: query.memory_scope,
    product_area: query.product_area,
    journey_state: query.journey_state,
    channel: query.channel,
    locale: query.locale,
    market: query.market,
    risk: query.risk,
    query_terms: query.query_terms,
    normalized_query_term_sequences: normalized,
    normalized_query_tokens: tokens,
    query_source_refs: query.query_source_refs,
    registry_versions: query.registry_versions,
  });
  assertDigest(query.query_digest);
  if (query.query_digest !== expectedDigest) task4FailContract("digest");
  return { normalized_query_term_sequences: normalized, normalized_query_tokens: tokens };
}

function verifyQueryCanonicalNormalizationStage(
  query: RetrievalQuery,
  runtime: Task4UnicodeRuntime,
): void {
  let normalized: string[][];
  try {
    normalized = query.query_terms.map((term) => task4WordTokens(term, runtime));
  } catch {
    // An unreadable Unicode witness belongs to the later Unicode stage. A
    // structurally usable witness can still prove query-set canonicality here.
    return;
  }
  if (normalized.some((tokens) => tokens.length === 0)
    || !task4CanonicalEqual(normalized, task4SortCanonical(normalized))
    || new Set(normalized.map(canonicalJson)).size !== normalized.length) {
    task4FailContract("canonical_value");
  }
}

function verifyUnicodeTexts(values: readonly string[], runtime: Task4UnicodeRuntime): void {
  for (const value of values) task4WordTokens(value, runtime);
}

function verifyApprovedCandidateUnicodeStage(
  candidate: ApprovedRetrievalCandidate,
  runtime: Task4UnicodeRuntime,
): void {
  const pattern = candidate.pattern.payload;
  verifyUnicodeTexts([
    pattern.evidence_strength,
    pattern.problem,
    pattern.mechanism,
    pattern.rights_boundary,
    ...pattern.source_refs,
    ...pattern.counterexamples,
    ...pattern.failure_modes,
    ...pattern.non_transferable_details,
    ...pattern.contexts.flatMap((context) => [
      ...context.journeys,
      ...context.stages,
      ...context.states,
      ...context.channels,
      ...context.modalities,
      ...context.locales,
      ...context.risk_levels,
    ]),
    ...pattern.transfer_conditions.flatMap((condition) => [condition.field, ...condition.values]),
    candidate.projection.project_id,
    candidate.projection.product_area,
    candidate.projection.journey_state,
    candidate.projection.channel,
    candidate.projection.locale,
    candidate.projection.market,
    candidate.projection.risk,
    ...candidate.projection.mechanism_text,
    ...candidate.projection.problem_text,
    ...candidate.projection.context_text,
    ...candidate.projection.outcome_text,
    ...candidate.projection.failure_mode_text,
    ...candidate.projection.transfer_conditions.flatMap((condition) => [condition.field, ...condition.allowed_values]),
    candidate.projection_evidence.project_id,
    candidate.projection_evidence.product_area,
    candidate.projection_evidence.journey_state,
    candidate.projection_evidence.channel,
    candidate.projection_evidence.locale,
    candidate.projection_evidence.market,
    candidate.projection_evidence.risk,
    ...candidate.projection_evidence.outcome_text,
    ...candidate.projection_evidence.transfer_conditions.flatMap((condition) => [condition.field, ...condition.allowed_values]),
  ], runtime);
}

function verifyRetrievalUnicodeStage(input: RetrievalInput): void {
  verifyTask4UnicodeRuntime(input.unicode_runtime);
  task4AssertUnicodeScalarGraph(input);
  verifyUnicodeTexts(input.query.query_terms, input.unicode_runtime);
  for (const candidate of input.candidates) {
    if (ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass)) {
      verifyApprovedCandidateUnicodeStage(candidate as ApprovedRetrievalCandidate, input.unicode_runtime);
    }
  }
}

function queryField(query: RetrievalQuery, field: RetrievalTransferCondition["field"]): string {
  return query[field];
}

function exclusionReason(
  candidate: VerifiedApprovedCandidate,
  query: RetrievalQuery,
  evaluationAt: string,
): RetrievalExclusionReason | null {
  const projection = candidate.input.projection;
  if (projection.project_id !== query.project_id) return "project_mismatch";
  if (projection.memory_scope !== query.memory_scope) return "memory_scope_mismatch";
  if (projection.product_area !== query.product_area) return "product_area_mismatch";
  if (projection.journey_state !== query.journey_state) return "journey_state_mismatch";
  if (projection.channel !== query.channel) return "channel_mismatch";
  if (projection.locale !== query.locale) return "locale_mismatch";
  if (projection.market !== query.market) return "market_mismatch";
  if (projection.risk !== query.risk) return "risk_mismatch";
  if (projection.lifecycle_state === "revoked" || projection.approval_state === "revoked") return "revoked";
  if (projection.lifecycle_state === "expired" || projection.approval_state === "expired"
    || (projection.expires_at !== null
      && task2CompareRfc3339Instants(projection.expires_at, evaluationAt) <= 0)) return "expired";
  if (candidate.input.pattern.lifecycle_state !== "active" || projection.lifecycle_state !== "active") {
    return "lifecycle_not_active";
  }
  if (projection.approval_state !== "approved_current") return "approval_not_current";
  if (projection.rights_state !== "retrieval_permitted") return "rights_not_permitted";
  if (projection.freshness_state !== "current") return "freshness_not_current";
  if (projection.dispute_state === "unresolved") return "unresolved_dispute";
  if (projection.transfer_conditions.some((condition) => !condition.allowed_values.includes(queryField(query, condition.field)))) {
    return "transfer_incompatible";
  }
  return null;
}

function coverage(queryTokens: ReadonlySet<string>, fields: readonly string[], runtime: Task4UnicodeRuntime): number {
  const fieldTokens = new Set(fields.flatMap((field) => task4WordTokens(field, runtime)));
  let matched = 0;
  for (const token of queryTokens) if (fieldTokens.has(token)) matched += 1;
  return matched / queryTokens.size;
}

function clip01(value: number): number {
  if (!Number.isFinite(value)) task4FailContract("numeric_nonfinite");
  return Math.min(1, Math.max(0, value));
}

function scoreCandidate(
  candidate: VerifiedApprovedCandidate,
  queryTokens: readonly string[],
  runtime: Task4UnicodeRuntime,
): RetrievalScore {
  const set = new Set(queryTokens);
  const projection = candidate.input.projection;
  const mechanism_coverage = coverage(set, projection.mechanism_text, runtime);
  const problem_coverage = coverage(set, projection.problem_text, runtime);
  const context_coverage = coverage(set, projection.context_text, runtime);
  const outcome_coverage = coverage(set, projection.outcome_text, runtime);
  const failure_mode_coverage = coverage(set, projection.failure_mode_text, runtime);
  const lexical_score = clip01(
    0.30 * mechanism_coverage
    + 0.25 * problem_coverage
    + 0.20 * context_coverage
    + 0.15 * outcome_coverage
    + 0.10 * failure_mode_coverage,
  );
  const evidence_strength_score = {
    direct_project_evidence: 1,
    qualified_project_review: 0.75,
    project_owned_synthetic: 0.5,
  }[projection.evidence_strength];
  // Candidates are admitted only after every declared transfer condition has
  // been checked against the query, so the admitted score is exactly one.
  const transfer_condition_score = 1;
  return {
    mechanism_coverage: clip01(mechanism_coverage),
    problem_coverage: clip01(problem_coverage),
    context_coverage: clip01(context_coverage),
    outcome_coverage: clip01(outcome_coverage),
    failure_mode_coverage: clip01(failure_mode_coverage),
    lexical_score,
    evidence_strength_score,
    transfer_condition_score: clip01(transfer_condition_score),
    total_score: clip01(0.70 * lexical_score + 0.20 * evidence_strength_score + 0.10 * transfer_condition_score),
  };
}

function sortTask4Provenance(values: readonly Task4ProvenanceRef[]): Task4ProvenanceRef[] {
  const sorted = task4SortCanonical(values);
  if (new Set(sorted.map(canonicalJson)).size !== sorted.length) task4FailContract("provenance");
  return sorted;
}

function task4RuntimeArtifactRefs(runtime: Task4UnicodeRuntime): ArtifactRef[] {
  return [
    runtime.unicode_bundle.normalization.artifact_ref,
    runtime.unicode_bundle.casefold.artifact_ref,
    runtime.unicode_bundle.whitespace.artifact_ref,
    runtime.unicode_bundle.word_break.artifact_ref,
    runtime.unicode_bundle.grapheme_break.artifact_ref,
    runtime.runtime_profile.artifact_ref,
  ];
}

function buildRetrievalProvenance(
  input: RetrievalInput,
  approved: readonly VerifiedApprovedCandidate[],
  producerVerificationRef: DigestRef | null,
): [Task4ProvenanceRef, ...Task4ProvenanceRef[]] {
  const values: Task4ProvenanceRef[] = [];
  input.query.query_source_refs.forEach((ref) => values.push({ subject_kind: "digest_ref", ref, relationship: "query_source" }));
  for (const candidate of approved) {
    values.push({ subject_kind: "digest_ref", ref: candidate.pattern_ref, relationship: "pattern_subject" });
    values.push({ subject_kind: "digest_ref", ref: candidate.projection_ref, relationship: "scope_projection" });
    values.push({ subject_kind: "digest_ref", ref: candidate.projection_evidence_ref, relationship: "projection_evidence" });
    values.push({ subject_kind: "digest_ref", ref: candidate.approval_ref, relationship: "approval_evidence" });
    values.push({ subject_kind: "digest_ref", ref: candidate.rights_ref, relationship: "rights_evidence" });
    values.push({ subject_kind: "digest_ref", ref: candidate.freshness_ref, relationship: "freshness_evidence" });
    values.push({ subject_kind: "digest_ref", ref: candidate.dispute_ref, relationship: "dispute_evidence" });
  }
  [...input.query.registry_versions, ...task4RuntimeArtifactRefs(input.unicode_runtime)].forEach((ref) => {
    values.push({ subject_kind: "artifact_ref", ref, relationship: "runtime_artifact" });
  });
  if (producerVerificationRef !== null) {
    values.push({ subject_kind: "digest_ref", ref: producerVerificationRef, relationship: "producer_verification" });
  }
  const sorted = sortTask4Provenance(values);
  if (sorted.length === 0) task4FailContract("provenance");
  return sorted as [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
}

function retrievalSnapshotRef(snapshot: RetrievalSnapshot): DigestRef {
  return task4DigestRef(
    snapshot.snapshot_id,
    "contentmd.task4-retrieval-snapshot",
    snapshot.snapshot_digest,
  );
}

interface RetrievalReferenceDraft {
  approved: VerifiedApprovedCandidate[];
  candidates: RetrievalHit[];
  exclusions: RetrievalExclusion[];
}

function verifyRetrievalInputDigestStage(input: RetrievalInput): void {
  verifyRefDigests(input);
  const approved = input.candidates.filter(
    (candidate): candidate is ApprovedRetrievalCandidate =>
      ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass),
  );
  approved.forEach(verifyApprovedCandidateDigests);
  normalizeQuery(input.query, input.unicode_runtime);
}

function verifyRetrievalCandidateSetDigestStage(
  input: RetrievalInput,
  snapshot: RetrievalSnapshot,
): void {
  const candidates = input.candidates.map(retrievalCandidateWithoutDeferredExpression);
  const approvedCandidates = task4SortCanonical(candidates.filter(
    (candidate): candidate is ApprovedRetrievalCandidate =>
      ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass),
  ));
  const quarantinedCandidates = task4SortCanonical(candidates.filter(
    (candidate): candidate is QuarantinedRetrievalCandidate =>
      QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass),
  ));
  const preimage = {
    contract_version: "contentmd.task4-retrieval-candidate-set/0.1.0",
    approved_candidates: approvedCandidates,
    quarantined_candidates: quarantinedCandidates,
  };
  if (!task4ContainsNonfinite(preimage)
    && snapshot.candidate_set_digest !== sha256Canonical(preimage)) {
    task4FailContract("digest");
  }
}

function retrievalCandidateWithoutDeferredExpression(
  candidate: ApprovedRetrievalCandidate | QuarantinedRetrievalCandidate,
): ApprovedRetrievalCandidate | QuarantinedRetrievalCandidate {
  if (!QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass)) {
    return candidate;
  }
  const clone = { ...candidate } as Record<string, unknown>;
  for (const key of [
    "expression", "expression_digest", "browser_expression", "competitor_expression",
    "third_party_expression",
  ]) delete clone[key];
  return clone as unknown as QuarantinedRetrievalCandidate;
}

function buildRetrievalReferenceDraft(input: RetrievalInput): RetrievalReferenceDraft {
  const candidates = input.candidates.map(retrievalCandidateWithoutDeferredExpression);
  const approved = candidates
    .filter((candidate): candidate is ApprovedRetrievalCandidate =>
      ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass))
    .map((candidate) => verifyApprovedCandidate(candidate, input.evaluation_at));
  const normalized = normalizeQuery(input.query, input.unicode_runtime);
  const exclusions: RetrievalExclusion[] = candidates
    .filter((candidate): candidate is QuarantinedRetrievalCandidate =>
      QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass))
    .map((candidate) => ({
      subject_ref: candidate.evidence_ref,
      reason: "quarantined_source_class",
    }));
  const ranked = approved.flatMap((candidate): Array<Omit<RetrievalHit, "rank">> => {
    const reason = exclusionReason(candidate, input.query, input.evaluation_at);
    if (reason !== null) {
      exclusions.push({ subject_ref: candidate.pattern_ref, reason });
      return [];
    }
    return [{
      pattern_ref: candidate.pattern_ref,
      projection_ref: candidate.projection_ref,
      score: scoreCandidate(candidate, normalized.normalized_query_tokens, input.unicode_runtime),
    }];
  }).sort((left, right) => {
    const score = right.score.total_score - left.score.total_score;
    if (score !== 0) return score;
    const lexical = right.score.lexical_score - left.score.lexical_score;
    if (lexical !== 0) return lexical;
    const evidence = right.score.evidence_strength_score - left.score.evidence_strength_score;
    if (evidence !== 0) return evidence;
    return task4CanonicalCompare(left.pattern_ref, right.pattern_ref);
  });
  exclusions.sort((left, right) => task4CanonicalCompare(left.subject_ref, right.subject_ref));
  return {
    approved,
    candidates: ranked.map((hit, rank) => ({ rank, ...hit })),
    exclusions,
  };
}

function retrievalSnapshotReferenceView(snapshot: RetrievalSnapshot): unknown {
  const {
    snapshot_id: _snapshotId,
    candidate_set_digest: _candidateSetDigest,
    provenance: _provenance,
    snapshot_digest: _snapshotDigest,
    ...view
  } = snapshot;
  return view;
}

function expectedRetrievalSnapshotReferenceView(
  input: RetrievalInput,
  producer: VerifiedTask4Producer,
  draft: RetrievalReferenceDraft,
): unknown {
  return {
    contract_version: "contentmd.task4-retrieval-snapshot/0.1.0",
    record_mode: "development_fixture",
    query: input.query,
    query_digest: input.query.query_digest,
    candidates: draft.candidates,
    exclusions: draft.exclusions,
    registry_versions: input.query.registry_versions,
    producer_manifest_digest: producer.producer_manifest_digest,
    producer_verification_ref: producer.producer_verification_ref,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
    authority_effect: "none",
  };
}

function verifyRetrievalCanonicalSetStage(input: RetrievalInput): void {
  const approvedKeys = input.candidates.flatMap((candidate) =>
    ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass)
      ? [canonicalJson({
          record_id: (candidate as ApprovedRetrievalCandidate).pattern.record_id,
          schema_id: (candidate as ApprovedRetrievalCandidate).pattern.schema_id,
          schema_version: (candidate as ApprovedRetrievalCandidate).pattern.schema_version,
          content_digest: (candidate as ApprovedRetrievalCandidate).pattern.content_digest,
        })]
      : []);
  const quarantinedKeys = input.candidates.flatMap((candidate) =>
    QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass)
      ? [canonicalJson((candidate as QuarantinedRetrievalCandidate).evidence_ref)]
      : []);
  if (new Set(approvedKeys).size !== approvedKeys.length
    || new Set(quarantinedKeys).size !== quarantinedKeys.length) task4FailContract("canonical_value");
}

function verifyRetrievalQuarantineStage(input: RetrievalInput): void {
  if (input.candidates.some((candidate) =>
    QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass)
    && hasQuarantinedExpression(candidate as unknown as Record<string | symbol, unknown>))) {
    task4FailContract("quarantined_expression_present");
  }
}

export function retrieveApprovedPatterns(input: RetrievalInput): RetrievalSnapshot {
  task4TopLevelGate(input, RETRIEVAL_INPUT_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  let producer!: VerifiedTask4Producer;
  let draft!: RetrievalReferenceDraft;
  task4RunStagePlan({
    canonical_value: () => {
      assertRetrievalInputShape(input);
      verifyRetrievalCanonicalSetStage(input);
      verifyQueryCanonicalNormalizationStage(input.query, input.unicode_runtime);
    },
    producer_witness: () => { producer = verifyTask4Producer(input.producer, "retrieval-snapshot"); },
    unicode_runtime: () => { verifyRetrievalUnicodeStage(input); },
    digest: () => { verifyRetrievalInputDigestStage(input); },
    reference_binding: () => { draft = buildRetrievalReferenceDraft(input); },
    quarantined_expression_present: () => { task4AssertNoQuarantinedExpressions(suppliedInput); },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedInput); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedInput); },
  });
  const approvedInputs = input.candidates
    .filter((candidate): candidate is ApprovedRetrievalCandidate => ALLOWED_SOURCE_CLASSES.includes(candidate.source_class as Task4AllowedSourceClass));
  const approved = draft.approved;
  const normalized = normalizeQuery(input.query, input.unicode_runtime);
  const quarantined = input.candidates
    .filter((candidate): candidate is QuarantinedRetrievalCandidate => QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass));
  if (new Set(approved.map((candidate) => task4DigestRefKey(candidate.pattern_ref))).size !== approved.length
    || new Set(quarantined.map((candidate) => task4DigestRefKey(candidate.evidence_ref))).size !== quarantined.length) {
    task4FailContract("canonical_value");
  }
  const approvedCandidates = task4SortCanonical(approved.map((candidate) => candidate.input));
  const quarantinedCandidates = task4SortCanonical(quarantined);
  const provenance = buildRetrievalProvenance(input, approved, producer.producer_verification_ref);
  if (input.candidates.some((candidate) => QUARANTINED_SOURCE_CLASSES.includes(candidate.source_class as Task4QuarantinedSourceClass)
    && hasQuarantinedExpression(candidate as unknown as Record<string | symbol, unknown>))) {
    task4FailContract("quarantined_expression_present");
  }
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  const candidate_set_digest = sha256Canonical({
    contract_version: "contentmd.task4-retrieval-candidate-set/0.1.0",
    approved_candidates: approvedCandidates,
    quarantined_candidates: quarantinedCandidates,
  });
  const exclusions: RetrievalExclusion[] = quarantined.map((candidate) => ({
    subject_ref: candidate.evidence_ref,
    reason: "quarantined_source_class",
  }));
  const ranked = approved.flatMap((candidate): Array<Omit<RetrievalHit, "rank">> => {
    const reason = exclusionReason(candidate, input.query, input.evaluation_at);
    if (reason !== null) {
      exclusions.push({ subject_ref: candidate.pattern_ref, reason });
      return [];
    }
    return [{
      pattern_ref: candidate.pattern_ref,
      projection_ref: candidate.projection_ref,
      score: scoreCandidate(candidate, normalized.normalized_query_tokens, input.unicode_runtime),
    }];
  }).sort((left, right) => {
    const score = right.score.total_score - left.score.total_score;
    if (score !== 0) return score;
    const lexical = right.score.lexical_score - left.score.lexical_score;
    if (lexical !== 0) return lexical;
    const evidence = right.score.evidence_strength_score - left.score.evidence_strength_score;
    if (evidence !== 0) return evidence;
    return task4CanonicalCompare(left.pattern_ref, right.pattern_ref);
  });
  const candidates = ranked.map((hit, rank) => ({ rank, ...hit }));
  exclusions.sort((left, right) => task4CanonicalCompare(left.subject_ref, right.subject_ref));
  const identity = {
    contract_version: "contentmd.task4-retrieval-snapshot/0.1.0" as const,
    record_mode: "development_fixture" as const,
    query: input.query,
    query_digest: input.query.query_digest,
    candidate_set_digest,
    candidates,
    exclusions,
    registry_versions: input.query.registry_versions,
    producer_manifest_digest: producer.producer_manifest_digest,
    producer_verification_ref: producer.producer_verification_ref,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
    provenance,
    authority_effect: "none" as const,
  };
  const snapshot_id = `retrieval-snapshot.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, snapshot_id };
  return task4Immutable({ ...withoutDigest, snapshot_digest: sha256Canonical(withoutDigest) });
}

function assertTask4Provenance(value: unknown): asserts value is Task4ProvenanceRef[] {
  assertArray(value, 1);
  for (const item of value) {
    if (item === null || typeof item !== "object" || Array.isArray(item)) task4FailContract("canonical_value");
    const kind = Object.getOwnPropertyDescriptor(item, "subject_kind")?.value;
    if (kind === "digest_ref") {
      task4AssertExactKeys(item, ["subject_kind", "ref", "relationship"]);
      task4AssertDigestRefShape(item.ref);
    } else if (kind === "artifact_ref") {
      task4AssertExactKeys(item, ["subject_kind", "ref", "relationship"]);
      task4AssertArtifactRefShape(item.ref);
    } else task4FailContract("canonical_value");
    assertText(item.relationship);
  }
}

function assertSnapshotShape(value: unknown): asserts value is RetrievalSnapshot {
  task4AssertExactKeys(value, SNAPSHOT_KEYS);
  if (value.contract_version !== "contentmd.task4-retrieval-snapshot/0.1.0"
    || value.record_mode !== "development_fixture"
    || value.authority_effect !== "none") task4FailContract("canonical_value");
  assertRecordId(value.snapshot_id);
  assertQueryShape(value.query);
  if (typeof value.query_digest !== "string" || typeof value.candidate_set_digest !== "string"
    || typeof value.producer_manifest_digest !== "string" || typeof value.unicode_runtime_digest !== "string"
    || typeof value.snapshot_digest !== "string") task4FailContract("canonical_value");
  assertArray(value.candidates);
  for (const hit of value.candidates) {
    task4AssertExactKeys(hit, ["rank", "pattern_ref", "projection_ref", "score"]);
    const typed = hit as unknown as RetrievalHit;
    if (typeof typed.rank !== "number"
      || (Number.isFinite(typed.rank) && (!Number.isSafeInteger(typed.rank) || typed.rank < 0))) {
      task4FailContract("canonical_value");
    }
    task4AssertDigestRefShape(typed.pattern_ref);
    task4AssertDigestRefShape(typed.projection_ref);
    task4AssertExactKeys(typed.score, [
      "mechanism_coverage", "problem_coverage", "context_coverage", "outcome_coverage",
      "failure_mode_coverage", "lexical_score", "evidence_strength_score",
      "transfer_condition_score", "total_score",
    ]);
    Object.values(typed.score).forEach((score) => {
      if (typeof score !== "number") task4FailContract("canonical_value");
    });
  }
  assertArray(value.exclusions);
  for (const exclusion of value.exclusions) {
    task4AssertExactKeys(exclusion, ["subject_ref", "reason"]);
    task4AssertDigestRefShape(exclusion.subject_ref);
    if (![
      "quarantined_source_class", "project_mismatch", "memory_scope_mismatch", "product_area_mismatch",
      "journey_state_mismatch", "channel_mismatch", "locale_mismatch", "market_mismatch", "risk_mismatch",
      "revoked", "expired", "lifecycle_not_active", "approval_not_current", "rights_not_permitted",
      "freshness_not_current", "unresolved_dispute", "transfer_incompatible",
    ].includes(String(exclusion.reason))) task4FailContract("canonical_value");
  }
  assertArtifactArray(value.registry_versions, 1);
  assertCanonicalSet(value.registry_versions);
  if (value.producer_verification_ref !== null) task4AssertDigestRefShape(value.producer_verification_ref);
  assertTask4Provenance(value.provenance);
}

function verifySnapshotDigestStage(snapshot: RetrievalSnapshot): void {
  verifyRefDigests(snapshot);
  for (const digest of [
    snapshot.query_digest, snapshot.candidate_set_digest, snapshot.producer_manifest_digest,
    snapshot.unicode_runtime_digest, snapshot.snapshot_digest,
  ]) assertDigest(digest);
  if (!task4ContainsNonfinite(snapshot)) {
    const { snapshot_id: _id, snapshot_digest: _digest, ...identity } = snapshot;
    const { snapshot_digest: _drop, ...content } = snapshot;
    if (snapshot.snapshot_id !== `retrieval-snapshot.${sha256Canonical(identity)}`
      || snapshot.snapshot_digest !== sha256Canonical(content)) task4FailContract("digest");
  }
}

function verifySnapshotReferenceStage(
  snapshot: RetrievalSnapshot,
  expectedView: unknown,
): void {
  snapshot.candidates.forEach((hit, index) => {
    if (Number.isFinite(hit.rank) && hit.rank !== index) task4FailContract("reference_binding");
  });
  if (!task4CanonicalEqual(retrievalSnapshotReferenceView(snapshot), expectedView)) {
    task4FailContract("reference_binding");
  }
}

function verifySnapshotProvenanceStage(
  snapshot: RetrievalSnapshot,
  expected: readonly Task4ProvenanceRef[],
): void {
  if (!task4CanonicalEqual(snapshot.provenance, task4SortCanonical(snapshot.provenance))
    || new Set(snapshot.provenance.map(canonicalJson)).size !== snapshot.provenance.length) {
    task4FailContract("provenance");
  }
  if (!task4CanonicalEqual(snapshot.provenance, expected)) task4FailContract("provenance");
}

export function verifyRetrievalSnapshot(input: VerifyRetrievalSnapshotInput): void {
  task4TopLevelGate(input, ["record_mode", "retrieval_input", "snapshot"]);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  let producer!: VerifiedTask4Producer;
  let draft!: RetrievalReferenceDraft;
  task4RunStagePlan({
    canonical_value: () => {
      task4AssertExactKeys(input, ["record_mode", "retrieval_input", "snapshot"]);
      assertRetrievalInputShape(input.retrieval_input);
      verifyRetrievalCanonicalSetStage(input.retrieval_input);
      verifyQueryCanonicalNormalizationStage(
        input.retrieval_input.query,
        input.retrieval_input.unicode_runtime,
      );
      assertSnapshotShape(input.snapshot);
      verifyQueryCanonicalNormalizationStage(
        input.snapshot.query,
        input.retrieval_input.unicode_runtime,
      );
    },
    producer_witness: () => {
      producer = verifyTask4Producer(input.retrieval_input.producer, "retrieval-snapshot");
    },
    unicode_runtime: () => {
      verifyRetrievalUnicodeStage(input.retrieval_input);
      task4AssertUnicodeScalarGraph(input.snapshot);
      verifyUnicodeTexts(
        input.snapshot.query.query_terms,
        input.retrieval_input.unicode_runtime,
      );
    },
    digest: () => {
      verifyRetrievalInputDigestStage(input.retrieval_input);
      normalizeQuery(input.snapshot.query, input.retrieval_input.unicode_runtime);
      verifySnapshotDigestStage(input.snapshot);
      verifyRetrievalCandidateSetDigestStage(input.retrieval_input, input.snapshot);
    },
    reference_binding: () => {
      draft = buildRetrievalReferenceDraft(input.retrieval_input);
      verifySnapshotReferenceStage(
        input.snapshot,
        expectedRetrievalSnapshotReferenceView(input.retrieval_input, producer, draft),
      );
    },
    provenance: () => {
      verifySnapshotProvenanceStage(
        input.snapshot,
        buildRetrievalProvenance(
          input.retrieval_input,
          draft.approved,
          producer.producer_verification_ref,
        ),
      );
    },
    quarantined_expression_present: () => { task4AssertNoQuarantinedExpressions(suppliedInput); },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedInput); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedInput); },
  });
  const expected = retrieveApprovedPatterns(input.retrieval_input);
  if (!task4CanonicalEqual(input.snapshot, expected)) task4FailContract("reference_binding");
  void retrievalSnapshotRef(input.snapshot);
}
