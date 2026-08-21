import { createHash } from "node:crypto";
import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
  type MemoryScope,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import type { AppendOnlyEventStore, StoredEvent } from "@contentmd/memory";
import type { ArtifactRef, DigestRef } from "./records.js";

export type ContentDecisionStatus = "accepted" | "edited" | "rejected" | "abstained";

export interface ContentDecisionInput {
  store: AppendOnlyEventStore;
  stream_id: string;
  expected_head_digest: string | null;
  decision_id: string;
  status: ContentDecisionStatus;
  actor_ref: string;
  actor_role: string;
  rationale: string;
  proposal_ref: string;
  selected_expression: string | null;
  edited_expression: string | null;
  evidence_reviewed: string[];
  scope: MemoryScope;
  project_id: string;
  occurred_at: string;
  data_class: string;
}

export interface ContentDecisionRecord {
  schema_version: "contentmd.content-decision/0.1.0";
  decision_id: string;
  status: ContentDecisionStatus;
  actor_ref: string;
  actor_role: string;
  rationale: string;
  proposal_ref: string;
  selected_expression: string | null;
  edited_expression: string | null;
  evidence_reviewed: string[];
  scope: MemoryScope;
  project_id: string;
  occurred_at: string;
  mutation_approval_effect: "none";
  sequence: number;
  event_digest: string;
}

export type ContentDecisionEventPayload = Omit<
  ContentDecisionRecord,
  "sequence" | "event_digest"
>;

const DECISION_STATUSES = new Set<ContentDecisionStatus>([
  "accepted",
  "edited",
  "rejected",
  "abstained",
]);

function requireText(value: string, field: string): void {
  if (value.trim().length === 0) throw new TypeError(`invalid_content_decision:${field}`);
}

export async function recordContentDecision(
  input: ContentDecisionInput,
): Promise<ContentDecisionRecord> {
  if (!DECISION_STATUSES.has(input.status)) throw new TypeError("invalid_content_decision:status");
  for (const field of [
    "stream_id",
    "decision_id",
    "actor_ref",
    "actor_role",
    "rationale",
    "proposal_ref",
    "project_id",
    "data_class",
  ] as const) {
    requireText(input[field], field);
  }
  if (input.status === "accepted" && (input.selected_expression === null || input.selected_expression.trim().length === 0)) {
    throw new Error("accepted_decision_requires_selected_expression");
  }
  if (input.status === "edited" && (input.edited_expression === null || input.edited_expression.trim().length === 0)) {
    throw new Error("edited_decision_requires_edited_expression");
  }
  if (
    (input.status === "rejected" || input.status === "abstained") &&
    (input.selected_expression !== null || input.edited_expression !== null)
  ) {
    throw new Error(`${input.status}_decision_cannot_select_expression`);
  }
  if (Number.isNaN(Date.parse(input.occurred_at))) throw new TypeError("invalid_content_decision:occurred_at");
  if (input.evidence_reviewed.length === 0) throw new TypeError("invalid_content_decision:evidence_reviewed");
  const payload = {
    schema_version: "contentmd.content-decision/0.1.0" as const,
    decision_id: input.decision_id,
    status: input.status,
    actor_ref: input.actor_ref,
    actor_role: input.actor_role,
    rationale: input.rationale,
    proposal_ref: input.proposal_ref,
    selected_expression: input.selected_expression,
    edited_expression: input.edited_expression,
    evidence_reviewed: [...new Set(input.evidence_reviewed)].sort(),
    scope: input.scope,
    project_id: input.project_id,
    occurred_at: input.occurred_at,
    mutation_approval_effect: "none" as const,
  };
  const event = await input.store.append({
    event_id: `event.${input.decision_id}`,
    stream_id: input.stream_id,
    event_type: "content_decision_recorded",
    occurred_at: input.occurred_at,
    actor_ref: input.actor_ref,
    data_class: input.data_class,
    payload,
    expected_head_digest: input.expected_head_digest,
  });
  return { ...payload, sequence: event.sequence, event_digest: event.event_digest };
}

export type Task2RecordMode = "development_fixture" | "official";
export type Task2VerificationMode = "development_fixture" | "build_verified";

export class Task2ContractError extends TypeError {
  readonly code: string;

  constructor(code: string) {
    super(code);
    this.name = "Task2ContractError";
    this.code = code;
  }
}

export interface VerificationReceiptPayload {
  transaction_ref: string;
  target_path: string;
  expected_digest: string;
  observed_digest: string;
  status: "passed" | "failed" | "incomplete";
  verified_at: string;
  method: string;
}

export type VerificationReceiptRecord = DurableRecord<VerificationReceiptPayload> & {
  schema_id: "contentmd.verification-receipt-record";
};

export interface ProposalPayload {
  task_packet_ref: string;
  operation: "strategy" | "draft" | "rewrite";
  alternatives: [string, ...string[]];
  evidence_refs: string[];
  pattern_refs: string[];
  tradeoffs: string[];
}

export type ProposalRecord = DurableRecord<ProposalPayload> & {
  schema_id: "contentmd.proposal-record";
};

export interface DurableContentDecisionPayload {
  proposal_ref: string;
  status: ContentDecisionStatus;
  actor_role: string;
  rationale: string;
  selected_expression: string | null;
  evidence_reviewed: string[];
  decided_at: string;
}

export type DurableContentDecisionRecord = DurableRecord<DurableContentDecisionPayload> & {
  schema_id: "contentmd.content-decision-record";
};

export interface RawUtf8Artifact {
  path: string;
  bytes_utf8: string;
  raw_bytes_digest: string;
}

export type Task2ProducerId =
  | "content-decision-adapter"
  | "feedback-qualification"
  | "learning-eligibility"
  | "preference-example";

export interface ProducerArtifactWitness {
  contract_version: "contentmd.task2-producer-witness/0.1.0";
  producer_id: Task2ProducerId;
  schema_artifact: RawUtf8Artifact;
  source_artifacts: [RawUtf8Artifact, ...RawUtf8Artifact[]];
  verification_mode: Task2VerificationMode;
  verification_receipt: VerificationReceiptRecord | null;
}

export interface VerifiedProducerArtifacts {
  schema_digest: string;
  code_digest: string;
  producer_manifest_digest: string;
  verification_receipt: VerificationReceiptRecord | null;
}

export interface CanonicalContentDecisionBoundary {
  contract_version: "contentmd.content-decision-boundary/0.1.0";
  event_id: string;
  event_digest: string;
  decision_ref: DigestRef;
  producer_manifest_digest: string;
  boundary_digest: string;
}

export interface AdaptedContentDecision {
  decision: DurableContentDecisionRecord;
  boundary: CanonicalContentDecisionBoundary;
}

export interface AdaptContentDecisionInput {
  event: StoredEvent;
  proposal: ProposalRecord;
  producer: ProducerArtifactWitness;
}

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const RECORD_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const RFC3339_DATE_TIME = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[Tt]([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]+))?([Zz]|([+-])([0-9]{2}):([0-9]{2}))$/;

export function task2FailContract(suffix: string): never {
  throw new Task2ContractError(`task2_contract_invalid:${suffix}`);
}

export function task2FailAdmission(suffix: string): never {
  throw new Task2ContractError(`learning_example_not_eligible:${suffix}`);
}

const task2Fail = task2FailContract;

export function task2AssertTopLevelShape(
  value: unknown,
  keys: readonly string[],
): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    task2Fail("input_shape");
  }
  const actual = Reflect.ownKeys(value as object)
    .filter((key): key is string => typeof key === "string")
    .sort();
  if (actual.length !== keys.length || actual.some((key, index) => key !== [...keys].sort()[index])) {
    task2Fail("input_shape");
  }
}

export function task2AssertCanonicalValue(value: unknown): void {
  try {
    const ancestors = new Set<object>();
    const inspect = (candidate: unknown): void => {
      if (candidate === null || typeof candidate === "string" || typeof candidate === "boolean") return;
      if (typeof candidate === "number") {
        if (!Number.isFinite(candidate) || Object.is(candidate, -0)) throw new TypeError("noncanonical number");
        return;
      }
      if (typeof candidate !== "object") throw new TypeError("unsupported");
      if (ancestors.has(candidate)) throw new TypeError("cycle");
      ancestors.add(candidate);
      try {
        if (Array.isArray(candidate)) {
          if (Object.getPrototypeOf(candidate) !== Array.prototype) throw new TypeError("array prototype");
          const ownKeys = Reflect.ownKeys(candidate);
          const expectedKeys = [
            ...Array.from({ length: candidate.length }, (_, index) => String(index)),
            "length",
          ];
          if (ownKeys.length !== expectedKeys.length
            || ownKeys.some((key, index) => key !== expectedKeys[index])) throw new TypeError("array keys");
          for (let index = 0; index < candidate.length; index += 1) {
            const descriptor = Object.getOwnPropertyDescriptor(candidate, String(index));
            if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
              throw new TypeError("array descriptor");
            }
            inspect(descriptor.value);
          }
          return;
        }
        const prototype = Object.getPrototypeOf(candidate);
        if (prototype !== Object.prototype && prototype !== null) throw new TypeError("object prototype");
        for (const key of Reflect.ownKeys(candidate)) {
          if (typeof key !== "string") throw new TypeError("symbol key");
          const descriptor = Object.getOwnPropertyDescriptor(candidate, key);
          if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
            throw new TypeError("object descriptor");
          }
          inspect(descriptor.value);
        }
      } finally {
        ancestors.delete(candidate);
      }
    };
    inspect(value);
    canonicalJson(value);
  } catch {
    task2Fail("canonical_value");
  }
}

export function task2AssertExactObject(
  value: unknown,
  keys: readonly string[],
): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    task2Fail("input_shape");
  }
  const actual = Object.keys(value as object).sort();
  const expected = [...keys].sort();
  if (actual.length !== expected.length || actual.some((key, index) => key !== expected[index])) {
    task2Fail("input_shape");
  }
}

export function task2AssertText(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task2Fail("input_shape");
}

export function task2PreflightArray<T = unknown>(
  value: unknown,
  minimumLength: number,
  inspect: (entry: unknown) => void,
  exactLength?: number,
): asserts value is T[] {
  if (!Array.isArray(value)
    || value.length < minimumLength
    || (exactLength !== undefined && value.length !== exactLength)) {
    task2Fail("input_shape");
  }
  for (const entry of value as unknown[]) inspect(entry);
}

export function task2PreflightText(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task2Fail("input_shape");
}

export function task2PreflightDigestRef(value: unknown): asserts value is DigestRef {
  task2AssertExactObject(value, ["record_id", "schema_id", "schema_version", "content_digest"]);
  task2PreflightText(value.record_id);
  task2PreflightText(value.schema_id);
  task2PreflightText(value.schema_version);
  task2PreflightText(value.content_digest);
}

export function task2PreflightArtifactRef(value: unknown): asserts value is ArtifactRef {
  task2AssertExactObject(value, ["artifact_id", "artifact_version", "artifact_digest"]);
  task2PreflightText(value.artifact_id);
  task2PreflightText(value.artifact_version);
  task2PreflightText(value.artifact_digest);
}

export function task2PreflightScope(value: unknown): asserts value is RecordScope {
  task2AssertExactObject(value, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  task2PreflightText(value.memory_scope);
  if (value.project_id !== null) task2PreflightText(value.project_id);
  task2PreflightArray(value.resource_refs, 0, task2PreflightText);
  task2PreflightArray(value.data_classes, 0, task2PreflightText);
}

export function task2PreflightProvenance(value: unknown): asserts value is ProvenanceRef[] {
  task2PreflightArray(value, 0, (entry) => {
    task2AssertExactObject(entry, ["record_id", "relationship", "content_digest"]);
    task2PreflightText(entry.record_id);
    task2PreflightText(entry.relationship);
    task2PreflightText(entry.content_digest);
  });
}

const TASK2_DURABLE_RECORD_KEYS = [
  "record_id", "schema_id", "schema_version", "record_version", "content_digest",
  "scope", "provenance", "lifecycle_state", "payload",
] as const;

export function task2PreflightDurableRecord(
  value: unknown,
  preflightPayload: (payload: Record<string, unknown>) => void,
): asserts value is DurableRecord<Record<string, unknown>> {
  task2AssertExactObject(value, TASK2_DURABLE_RECORD_KEYS);
  task2PreflightText(value.record_id);
  task2PreflightText(value.schema_id);
  task2PreflightText(value.schema_version);
  if (!Number.isInteger(value.record_version) || Number(value.record_version) < 1) {
    task2Fail("input_shape");
  }
  task2PreflightText(value.content_digest);
  task2PreflightScope(value.scope);
  task2PreflightProvenance(value.provenance);
  task2PreflightText(value.lifecycle_state);
  if (value.payload === null || typeof value.payload !== "object" || Array.isArray(value.payload)) {
    task2Fail("input_shape");
  }
  preflightPayload(value.payload as Record<string, unknown>);
}

export function task2PreflightReceipt(value: unknown): asserts value is VerificationReceiptRecord {
  task2PreflightDurableRecord(value, (payload) => {
    task2AssertExactObject(payload, [
      "transaction_ref", "target_path", "expected_digest", "observed_digest",
      "status", "verified_at", "method",
    ]);
    for (const field of [
      "transaction_ref", "target_path", "expected_digest", "observed_digest",
      "status", "verified_at", "method",
    ] as const) task2PreflightText(payload[field]);
  });
}

function task2PreflightRawArtifact(value: unknown): asserts value is RawUtf8Artifact {
  task2AssertExactObject(value, ["path", "bytes_utf8", "raw_bytes_digest"]);
  task2PreflightText(value.path);
  if (typeof value.bytes_utf8 !== "string") task2Fail("input_shape");
  task2PreflightText(value.raw_bytes_digest);
}

export function task2PreflightProducer(value: unknown): asserts value is ProducerArtifactWitness {
  task2AssertExactObject(value, [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ]);
  task2PreflightText(value.contract_version);
  task2PreflightText(value.producer_id);
  task2PreflightRawArtifact(value.schema_artifact);
  task2PreflightArray(value.source_artifacts, 1, task2PreflightRawArtifact);
  task2PreflightText(value.verification_mode);
  if (value.verification_receipt !== null) task2PreflightReceipt(value.verification_receipt);
}

export function task2PreflightEvent(value: unknown): asserts value is StoredEvent & {
  payload: ContentDecisionEventPayload;
} {
  task2AssertExactObject(value, [
    "event_id", "stream_id", "sequence", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "payload", "predecessor_digest", "event_digest",
  ]);
  for (const field of [
    "event_id", "stream_id", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "event_digest",
  ] as const) task2PreflightText(value[field]);
  if (!Number.isInteger(value.sequence) || Number(value.sequence) < 1) task2Fail("input_shape");
  if (value.predecessor_digest !== null) task2PreflightText(value.predecessor_digest);
  task2AssertExactObject(value.payload, [
    "schema_version", "decision_id", "status", "actor_ref", "actor_role", "rationale",
    "proposal_ref", "selected_expression", "edited_expression", "evidence_reviewed",
    "scope", "project_id", "occurred_at", "mutation_approval_effect",
  ]);
  for (const field of [
    "schema_version", "decision_id", "status", "actor_ref", "actor_role", "rationale",
    "proposal_ref", "scope", "project_id", "occurred_at", "mutation_approval_effect",
  ] as const) task2PreflightText(value.payload[field]);
  if (!DECISION_STATUSES.has(value.payload.status as ContentDecisionStatus)
    || !["task", "personal", "project", "organization", "public"].includes(value.payload.scope as string)
    || value.payload.mutation_approval_effect !== "none") task2Fail("input_shape");
  if (value.payload.selected_expression !== null) task2PreflightText(value.payload.selected_expression);
  if (value.payload.edited_expression !== null) task2PreflightText(value.payload.edited_expression);
  task2PreflightArray(value.payload.evidence_reviewed, 1, task2PreflightText);
}

export function task2PreflightProposal(value: unknown): asserts value is ProposalRecord {
  task2PreflightDurableRecord(value, (payload) => {
    task2AssertExactObject(payload, [
      "task_packet_ref", "operation", "alternatives", "evidence_refs", "pattern_refs", "tradeoffs",
    ]);
    task2PreflightText(payload.task_packet_ref);
    task2PreflightText(payload.operation);
    if (!["strategy", "draft", "rewrite"].includes(payload.operation)) task2Fail("input_shape");
    task2PreflightArray(payload.alternatives, 1, task2PreflightText);
    task2PreflightArray(payload.evidence_refs, 0, task2PreflightText);
    task2PreflightArray(payload.pattern_refs, 0, task2PreflightText);
    task2PreflightArray(payload.tradeoffs, 0, task2PreflightText);
  });
}

export function task2PreflightDecision(value: unknown): asserts value is DurableContentDecisionRecord {
  task2PreflightDurableRecord(value, (payload) => {
    task2AssertExactObject(payload, [
      "proposal_ref", "status", "actor_role", "rationale", "selected_expression",
      "evidence_reviewed", "decided_at",
    ]);
    for (const field of ["proposal_ref", "status", "actor_role", "rationale", "decided_at"] as const) {
      task2PreflightText(payload[field]);
    }
    if (!DECISION_STATUSES.has(payload.status as ContentDecisionStatus)) task2Fail("input_shape");
    if (payload.selected_expression !== null) task2PreflightText(payload.selected_expression);
    task2PreflightArray(payload.evidence_reviewed, 0, task2PreflightText);
  });
}

export function task2PreflightBoundary(value: unknown): asserts value is CanonicalContentDecisionBoundary {
  task2AssertExactObject(value, [
    "contract_version", "event_id", "event_digest", "decision_ref",
    "producer_manifest_digest", "boundary_digest",
  ]);
  for (const field of [
    "contract_version", "event_id", "event_digest", "producer_manifest_digest", "boundary_digest",
  ] as const) task2PreflightText(value[field]);
  task2PreflightDigestRef(value.decision_ref);
}

export function task2AssertRecordId(value: unknown): asserts value is string {
  if (typeof value !== "string" || !RECORD_ID_PATTERN.test(value)) task2Fail("record_id");
}

export function task2AssertDigest(value: unknown): asserts value is string {
  if (typeof value !== "string" || !DIGEST_PATTERN.test(value)) task2Fail("digest");
}

function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInMonth(year: number, month: number): number {
  if (month === 2) return isLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function shiftDate(
  year: number,
  month: number,
  day: number,
  direction: -1 | 1,
): readonly [number, number, number] {
  if (direction === 1) {
    if (day < daysInMonth(year, month)) return [year, month, day + 1];
    if (month < 12) return [year, month + 1, 1];
    return [year + 1, 1, 1];
  }
  if (day > 1) return [year, month, day - 1];
  if (month > 1) return [year, month - 1, daysInMonth(year, month - 1)];
  return [year - 1, 12, 31];
}

export function task2IsRfc3339(value: unknown): value is string {
  if (typeof value !== "string") return false;
  const match = RFC3339_DATE_TIME.exec(value);
  if (match === null) return false;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[10] === undefined ? 0 : Number(match[10]);
  const offsetMinute = match[11] === undefined ? 0 : Number(match[11]);
  if (
    month < 1 || month > 12 || day < 1 || day > daysInMonth(year, month)
    || hour > 23 || minute > 59 || second > 60 || offsetHour > 23 || offsetMinute > 59
  ) return false;
  if (second < 60) return true;
  const sign = match[9] === "-" ? -1 : 1;
  const offset = match[8]!.toLowerCase() === "z" ? 0 : sign * (offsetHour * 60 + offsetMinute);
  let utcMinutes = hour * 60 + minute - offset;
  let utcYear = year;
  let utcMonth = month;
  let utcDay = day;
  if (utcMinutes < 0) {
    utcMinutes += 1440;
    [utcYear, utcMonth, utcDay] = shiftDate(year, month, day, -1);
  } else if (utcMinutes >= 1440) {
    utcMinutes -= 1440;
    [utcYear, utcMonth, utcDay] = shiftDate(year, month, day, 1);
  }
  return utcYear >= 0 && utcYear <= 9999 && utcMinutes === 1439
    && utcDay === daysInMonth(utcYear, utcMonth);
}

export function task2AssertTimestamp(value: unknown): asserts value is string {
  if (!task2IsRfc3339(value)) task2Fail("timestamp");
}

interface ExactRfc3339Instant {
  whole_second: bigint;
  leap_second: boolean;
  fractional_second: string;
}

function daysBeforeYear(year: bigint): bigint {
  return 365n * year
    + (year + 3n) / 4n
    - (year + 99n) / 100n
    + (year + 399n) / 400n;
}

function exactRfc3339Instant(value: string): ExactRfc3339Instant {
  task2AssertTimestamp(value);
  const match = RFC3339_DATE_TIME.exec(value)!;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[10] === undefined ? 0 : Number(match[10]);
  const offsetMinute = match[11] === undefined ? 0 : Number(match[11]);
  const offsetSign = match[9] === "-" ? -1 : 1;
  const offsetSeconds = match[8]!.toLowerCase() === "z"
    ? 0
    : offsetSign * (offsetHour * 3600 + offsetMinute * 60);
  let elapsedDays = daysBeforeYear(BigInt(year));
  for (let priorMonth = 1; priorMonth < month; priorMonth += 1) {
    elapsedDays += BigInt(daysInMonth(year, priorMonth));
  }
  elapsedDays += BigInt(day - 1);
  return {
    whole_second: elapsedDays * 86_400n
      + BigInt(hour * 3600 + minute * 60 + second - offsetSeconds),
    leap_second: second === 60,
    fractional_second: match[7] ?? "",
  };
}

function compareFractionalSeconds(left: string, right: string): -1 | 0 | 1 {
  const width = Math.max(left.length, right.length);
  for (let index = 0; index < width; index += 1) {
    const leftDigit = index < left.length ? left.charCodeAt(index) : 48;
    const rightDigit = index < right.length ? right.charCodeAt(index) : 48;
    if (leftDigit < rightDigit) return -1;
    if (leftDigit > rightDigit) return 1;
  }
  return 0;
}

export function task2CompareRfc3339Instants(left: string, right: string): -1 | 0 | 1 {
  const leftInstant = exactRfc3339Instant(left);
  const rightInstant = exactRfc3339Instant(right);
  if (leftInstant.whole_second < rightInstant.whole_second) return -1;
  if (leftInstant.whole_second > rightInstant.whole_second) return 1;
  if (leftInstant.leap_second !== rightInstant.leap_second) {
    return leftInstant.leap_second ? -1 : 1;
  }
  return compareFractionalSeconds(
    leftInstant.fractional_second,
    rightInstant.fractional_second,
  );
}

function canonicalBytes(value: unknown): Buffer {
  return Buffer.from(canonicalJson(value), "utf8");
}

export function task2CanonicalCompare(left: unknown, right: unknown): number {
  return Buffer.compare(canonicalBytes(left), canonicalBytes(right));
}

export function task2SortedUnique<T>(values: readonly T[]): boolean {
  for (let index = 1; index < values.length; index += 1) {
    if (task2CanonicalCompare(values[index - 1], values[index]) >= 0) return false;
  }
  return true;
}

export function task2SortCanonical<T>(values: readonly T[]): T[] {
  return [...values].sort(task2CanonicalCompare);
}

export function task2AssertSortedUnique<T>(values: readonly T[], allowEmpty = true): void {
  if (!Array.isArray(values) || (!allowEmpty && values.length === 0) || !task2SortedUnique(values)) {
    task2Fail("set_uniqueness_or_order");
  }
}

export function task2AssertDigestRef(value: unknown): asserts value is DigestRef {
  task2AssertExactObject(value, ["record_id", "schema_id", "schema_version", "content_digest"]);
  task2AssertRecordId(value.record_id);
  task2AssertText(value.schema_id);
  if (value.schema_version !== "0.1.0") task2Fail("schema_id");
  task2AssertDigest(value.content_digest);
}

export function task2AssertArtifactRef(value: unknown): asserts value is ArtifactRef {
  task2AssertExactObject(value, ["artifact_id", "artifact_version", "artifact_digest"]);
  task2AssertText(value.artifact_id);
  task2AssertText(value.artifact_version);
  task2AssertDigest(value.artifact_digest);
}

export function task2DigestRef(record: {
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

export function task2RefsEqual(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

export function task2AssertScope(value: unknown, verifyOrder = true): asserts value is RecordScope {
  task2AssertExactObject(value, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!["task", "personal", "project", "organization", "public"].includes(String(value.memory_scope))) {
    task2Fail("input_shape");
  }
  if (value.project_id !== null) task2AssertText(value.project_id);
  if (!Array.isArray(value.resource_refs) || !value.resource_refs.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2Fail("input_shape");
  }
  if (!Array.isArray(value.data_classes) || !value.data_classes.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2Fail("input_shape");
  }
  if (verifyOrder) {
    task2AssertSortedUnique(value.resource_refs as string[]);
    task2AssertSortedUnique(value.data_classes as string[]);
  }
}

export function task2AssertProvenance(value: unknown, verifyOrder = true): asserts value is ProvenanceRef[] {
  if (!Array.isArray(value)) task2Fail("input_shape");
  const entries = value as unknown[];
  for (const entry of entries) {
    task2AssertExactObject(entry, ["record_id", "relationship", "content_digest"]);
    task2AssertRecordId(entry.record_id);
    task2AssertText(entry.relationship);
    task2AssertDigest(entry.content_digest);
  }
  if (!verifyOrder) return;
  const typed = entries as ProvenanceRef[];
  for (let index = 1; index < typed.length; index += 1) {
    const left = typed[index - 1]!;
    const right = typed[index]!;
    const byId = Buffer.compare(Buffer.from(left.record_id), Buffer.from(right.record_id));
    const byRelationship = byId === 0
      ? Buffer.compare(Buffer.from(left.relationship), Buffer.from(right.relationship))
      : byId;
    const order = byRelationship === 0
      ? Buffer.compare(Buffer.from(left.content_digest), Buffer.from(right.content_digest))
      : byRelationship;
    if (order >= 0) task2Fail("set_uniqueness_or_order");
  }
}

function task2AssertDurableEnvelope(
  value: unknown,
  expectedSchemaId: string,
): asserts value is DurableRecord<unknown> {
  task2AssertExactObject(value, [
    "record_id", "schema_id", "schema_version", "record_version", "content_digest",
    "scope", "provenance", "lifecycle_state", "payload",
  ]);
  if (!Number.isInteger(value.record_version) || Number(value.record_version) < 1) task2Fail("input_shape");
  if (!["proposed", "approved", "active", "superseded", "retired", "rejected"].includes(String(value.lifecycle_state))) {
    task2Fail("input_shape");
  }
  if (value.payload === null || typeof value.payload !== "object" || Array.isArray(value.payload)) task2Fail("input_shape");
  task2AssertScope(value.scope, false);
  task2AssertProvenance(value.provenance, false);
  task2AssertRecordId(value.record_id);
  if (value.schema_id !== expectedSchemaId || value.schema_version !== "0.1.0") task2Fail("schema_id");
  task2AssertDigest(value.content_digest);
}

export function task2VerifyDurableRecord(
  value: unknown,
  expectedSchemaId: string,
  verifyCollections = true,
): asserts value is DurableRecord<Record<string, unknown>> {
  task2AssertDurableEnvelope(value, expectedSchemaId);
  let result: ReturnType<typeof verifyRecordDigest> | undefined;
  try {
    result = verifyRecordDigest(value);
  } catch {
    task2Fail("durable_record_digest");
  }
  if (result === undefined || !result.valid) task2Fail("durable_record_digest");
  if (verifyCollections) {
    task2AssertScope(value.scope);
    task2AssertProvenance(value.provenance);
  }
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function task2VerifyReceiptShape(receipt: unknown): asserts receipt is VerificationReceiptRecord {
  task2VerifyDurableRecord(receipt, "contentmd.verification-receipt-record");
  task2AssertExactObject(receipt.payload, [
    "transaction_ref", "target_path", "expected_digest", "observed_digest",
    "status", "verified_at", "method",
  ]);
  task2AssertText(receipt.payload.transaction_ref);
  task2AssertText(receipt.payload.target_path);
  task2AssertDigest(receipt.payload.expected_digest);
  task2AssertDigest(receipt.payload.observed_digest);
  if (!["passed", "failed", "incomplete"].includes(String(receipt.payload.status))) task2Fail("input_shape");
  task2AssertTimestamp(receipt.payload.verified_at);
  task2AssertText(receipt.payload.method);
}

export function task2ReceiptProvenance(
  receipt: VerificationReceiptRecord | null,
  relationship: string,
): ProvenanceRef[] {
  return receipt === null ? [] : [{
    record_id: receipt.record_id,
    relationship,
    content_digest: receipt.content_digest,
  }];
}

export function task2VerifyProducer(
  witness: unknown,
  expectedProducerId: Task2ProducerId,
): VerifiedProducerArtifacts {
  task2AssertExactObject(witness, [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ]);
  if (witness.contract_version !== "contentmd.task2-producer-witness/0.1.0" || witness.producer_id !== expectedProducerId) {
    task2Fail("producer_manifest");
  }
  const verifyArtifact: (artifact: unknown) => asserts artifact is RawUtf8Artifact = (artifact) => {
    task2AssertExactObject(artifact, ["path", "bytes_utf8", "raw_bytes_digest"]);
    const rawArtifact = artifact as unknown as RawUtf8Artifact;
    const pathSegments = typeof rawArtifact.path === "string" ? rawArtifact.path.split("/") : [];
    if (typeof rawArtifact.path !== "string" || rawArtifact.path.length === 0
      || rawArtifact.path.startsWith("/") || rawArtifact.path.includes("\\")
      || rawArtifact.path.includes("\u0000") || pathSegments.some((segment) => segment.length === 0 || segment === "." || segment === "..")) {
      task2Fail("producer_artifact");
    }
    if (typeof rawArtifact.bytes_utf8 !== "string") task2Fail("producer_artifact");
    task2AssertDigest(rawArtifact.raw_bytes_digest);
    if (sha256Utf8(rawArtifact.bytes_utf8) !== rawArtifact.raw_bytes_digest) task2Fail("producer_artifact");
  };
  const producerWitness = witness as unknown as ProducerArtifactWitness;
  verifyArtifact(producerWitness.schema_artifact);
  const expectedSchemaPath = expectedProducerId === "content-decision-adapter"
    ? "packages/schemas/src/workflow-records.schema.json"
    : "packages/schemas/src/learning-records.schema.json";
  if (producerWitness.schema_artifact.path !== expectedSchemaPath) task2Fail("producer_artifact");
  if (!Array.isArray(producerWitness.source_artifacts) || producerWitness.source_artifacts.length === 0) task2Fail("producer_artifact");
  for (const artifact of producerWitness.source_artifacts) verifyArtifact(artifact);
  for (let index = 1; index < producerWitness.source_artifacts.length; index += 1) {
    if (Buffer.compare(
      Buffer.from(producerWitness.source_artifacts[index - 1]!.path, "utf8"),
      Buffer.from(producerWitness.source_artifacts[index]!.path, "utf8"),
    ) >= 0) {
      task2Fail("producer_artifact");
    }
  }
  const artifactPaths = [
    producerWitness.schema_artifact.path,
    ...producerWitness.source_artifacts.map(({ path }) => path),
  ];
  if (new Set(artifactPaths).size !== artifactPaths.length) task2Fail("producer_artifact");
  const schema_digest = producerWitness.schema_artifact.raw_bytes_digest;
  const code_digest = sha256Canonical({
    contract_version: "contentmd.task2-code-manifest/0.1.0",
    producer_id: expectedProducerId,
    entries: producerWitness.source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest })),
  });
  const producer_manifest_digest = sha256Canonical({
    contract_version: "contentmd.task2-producer-manifest/0.1.0",
    producer_id: expectedProducerId,
    schema: { path: producerWitness.schema_artifact.path, raw_bytes_digest: schema_digest },
    code_digest,
  });
  if (producerWitness.verification_mode === "development_fixture") {
    if (producerWitness.verification_receipt !== null) task2Fail("receipt_binding");
  } else if (producerWitness.verification_mode === "build_verified") {
    try {
      task2VerifyReceiptShape(producerWitness.verification_receipt);
    } catch (error) {
      if (error instanceof Task2ContractError && error.code.endsWith("durable_record_digest")) {
        task2Fail("receipt_digest");
      }
      throw error;
    }
    const payload = producerWitness.verification_receipt.payload;
    if (
      payload.status !== "passed"
      || payload.transaction_ref !== `producer-manifest.${producer_manifest_digest}`
      || payload.target_path !== `contentmd://task2/producer-manifest/${expectedProducerId}`
      || payload.expected_digest !== producer_manifest_digest
      || payload.observed_digest !== producer_manifest_digest
      || payload.method !== "sha256-canonical-readback"
    ) task2Fail("receipt_binding");
  } else {
    task2Fail("producer_manifest");
  }
  return {
    schema_digest,
    code_digest,
    producer_manifest_digest,
    verification_receipt: producerWitness.verification_receipt,
  };
}

export function task2VerifyProposal(value: unknown): asserts value is ProposalRecord {
  task2AssertExactObject(value, [
    "record_id", "schema_id", "schema_version", "record_version", "content_digest",
    "scope", "provenance", "lifecycle_state", "payload",
  ]);
  task2AssertExactObject(value.payload, [
    "task_packet_ref", "operation", "alternatives", "evidence_refs", "pattern_refs", "tradeoffs",
  ]);
  const proposal = value as unknown as ProposalRecord;
  task2AssertText(proposal.payload.task_packet_ref);
  if (!["strategy", "draft", "rewrite"].includes(String(proposal.payload.operation))) task2Fail("input_shape");
  if (!Array.isArray(proposal.payload.alternatives) || proposal.payload.alternatives.length === 0) task2Fail("input_shape");
  if (!proposal.payload.alternatives.every((item) => typeof item === "string" && item.length > 0)) task2Fail("input_shape");
  for (const field of ["evidence_refs", "pattern_refs", "tradeoffs"] as const) {
    const array = proposal.payload[field];
    if (!Array.isArray(array) || !array.every((item) => typeof item === "string" && item.length > 0)) task2Fail("input_shape");
  }
  task2VerifyDurableRecord(value, "contentmd.proposal-record");
  task2AssertSortedUnique(proposal.payload.evidence_refs);
  task2AssertSortedUnique(proposal.payload.pattern_refs);
}

export function task2VerifyEvent(value: unknown): asserts value is StoredEvent & { payload: ContentDecisionEventPayload } {
  task2AssertExactObject(value, [
    "event_id", "stream_id", "sequence", "schema_version", "event_type", "occurred_at",
    "actor_ref", "data_class", "payload", "predecessor_digest", "event_digest",
  ]);
  const event = value as unknown as StoredEvent & { payload: ContentDecisionEventPayload };
  task2AssertExactObject(event.payload, [
    "schema_version", "decision_id", "status", "actor_ref", "actor_role", "rationale",
    "proposal_ref", "selected_expression", "edited_expression", "evidence_reviewed",
    "scope", "project_id", "occurred_at", "mutation_approval_effect",
  ]);
  if (!Number.isInteger(event.sequence) || Number(event.sequence) < 1) task2Fail("input_shape");
  for (const field of ["actor_ref", "actor_role", "rationale", "proposal_ref", "project_id"] as const) {
    task2AssertText(event.payload[field]);
  }
  task2AssertText(event.actor_ref);
  task2AssertText(event.data_class);
  if (!DECISION_STATUSES.has(event.payload.status)) task2Fail("input_shape");
  if (!["task", "personal", "project", "organization", "public"].includes(event.payload.scope)) task2Fail("input_shape");
  if (event.payload.mutation_approval_effect !== "none") task2Fail("input_shape");
  if (!Array.isArray(event.payload.evidence_reviewed) || event.payload.evidence_reviewed.length === 0
    || !event.payload.evidence_reviewed.every((item) => typeof item === "string" && item.length > 0)) {
    task2Fail("input_shape");
  }
  const selected = event.payload.selected_expression;
  const edited = event.payload.edited_expression;
  if (selected !== null && (typeof selected !== "string" || selected.length === 0)) task2Fail("input_shape");
  if (edited !== null && (typeof edited !== "string" || edited.length === 0)) task2Fail("input_shape");
  const expressionShapeValid =
    (event.payload.status === "accepted" && selected !== null && edited === null)
    || (event.payload.status === "edited" && selected === null && edited !== null)
    || ((event.payload.status === "rejected" || event.payload.status === "abstained") && selected === null && edited === null);
  task2AssertTimestamp(event.occurred_at);
  task2AssertTimestamp(event.payload.occurred_at);
  task2AssertRecordId(event.event_id);
  task2AssertRecordId(event.payload.decision_id);
  if (event.schema_version !== "0.1.0" || event.payload.schema_version !== "contentmd.content-decision/0.1.0") {
    task2Fail("schema_id");
  }
  task2AssertDigest(event.event_digest);
  if (event.predecessor_digest !== null) task2AssertDigest(event.predecessor_digest);
  const { event_digest: _eventDigest, ...preimage } = event;
  if (sha256Canonical(preimage) !== event.event_digest) task2Fail("event_digest");
  if (!expressionShapeValid || event.event_type !== "content_decision_recorded" || (
    event.event_id !== `event.${event.payload.decision_id}`
    || event.actor_ref !== event.payload.actor_ref
    || event.occurred_at !== event.payload.occurred_at
  )) task2Fail("reference_integrity");
  const expectedLegacyEvidenceOrder = [...new Set(event.payload.evidence_reviewed)].sort();
  if (expectedLegacyEvidenceOrder.length !== event.payload.evidence_reviewed.length
    || expectedLegacyEvidenceOrder.some((entry, index) => entry !== event.payload.evidence_reviewed[index])) {
    task2Fail("set_uniqueness_or_order");
  }
}

export function task2VerifyDecisionRecord(value: unknown): asserts value is DurableContentDecisionRecord {
  task2AssertExactObject(value, [
    "record_id", "schema_id", "schema_version", "record_version", "content_digest",
    "scope", "provenance", "lifecycle_state", "payload",
  ]);
  task2AssertExactObject(value.payload, [
    "proposal_ref", "status", "actor_role", "rationale", "selected_expression",
    "evidence_reviewed", "decided_at",
  ]);
  const decision = value as unknown as DurableContentDecisionRecord;
  task2AssertText(decision.payload.proposal_ref);
  if (!DECISION_STATUSES.has(decision.payload.status)) task2Fail("input_shape");
  task2AssertText(decision.payload.actor_role);
  task2AssertText(decision.payload.rationale);
  if (decision.payload.selected_expression !== null) task2AssertText(decision.payload.selected_expression);
  if (!Array.isArray(decision.payload.evidence_reviewed) || !decision.payload.evidence_reviewed.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2Fail("input_shape");
  }
  task2AssertTimestamp(decision.payload.decided_at);
  task2VerifyDurableRecord(value, "contentmd.content-decision-record");
  task2AssertSortedUnique(decision.payload.evidence_reviewed);
}

export function task2SortProvenance(values: readonly ProvenanceRef[]): ProvenanceRef[] {
  return [...values].sort((left, right) => {
    const byId = Buffer.compare(Buffer.from(left.record_id), Buffer.from(right.record_id));
    if (byId !== 0) return byId;
    const byRelationship = Buffer.compare(Buffer.from(left.relationship), Buffer.from(right.relationship));
    return byRelationship !== 0
      ? byRelationship
      : Buffer.compare(Buffer.from(left.content_digest), Buffer.from(right.content_digest));
  });
}

export function adaptContentDecisionEvent(
  input: AdaptContentDecisionInput,
): AdaptedContentDecision {
  task2AssertCanonicalValue(input);
  task2AssertTopLevelShape(input, ["event", "proposal", "producer"]);
  task2PreflightEvent(input.event);
  task2VerifyEvent(input.event);
  task2PreflightProposal(input.proposal);
  task2VerifyProposal(input.proposal);
  task2PreflightProducer(input.producer);
  const producer = task2VerifyProducer(input.producer, "content-decision-adapter");
  const payload = input.event.payload;
  if (
    payload.proposal_ref !== input.proposal.record_id
    || input.proposal.scope.memory_scope !== payload.scope
    || input.proposal.scope.project_id !== payload.project_id
  ) task2Fail("reference_integrity");

  const selectedExpression = payload.status === "accepted"
    ? payload.selected_expression
    : payload.status === "edited"
      ? payload.edited_expression
      : null;
  const provenance = task2SortProvenance([
    {
      record_id: input.proposal.record_id,
      relationship: "decision_subject",
      content_digest: input.proposal.content_digest,
    },
    {
      record_id: input.event.event_id,
      relationship: "decision_event",
      content_digest: input.event.event_digest,
    },
    ...task2ReceiptProvenance(producer.verification_receipt, "producer_verification"),
  ]);
  const decision = finalizeRecord({
    record_id: payload.decision_id,
    schema_id: "contentmd.content-decision-record" as const,
    schema_version: "0.1.0" as const,
    record_version: 1,
    scope: {
      memory_scope: payload.scope,
      project_id: payload.project_id,
      resource_refs: [input.proposal.record_id],
      data_classes: [input.event.data_class],
    },
    provenance,
    lifecycle_state: "active" as const,
    payload: {
      proposal_ref: input.proposal.record_id,
      status: payload.status,
      actor_role: payload.actor_role,
      rationale: payload.rationale,
      selected_expression: selectedExpression,
      evidence_reviewed: task2SortCanonical(payload.evidence_reviewed),
      decided_at: input.event.occurred_at,
    },
  }) as DurableContentDecisionRecord;
  const decision_ref = task2DigestRef(decision);
  const boundaryPreimage = {
    contract_version: "contentmd.content-decision-boundary/0.1.0" as const,
    event_id: input.event.event_id,
    event_digest: input.event.event_digest,
    decision_ref,
    producer_manifest_digest: producer.producer_manifest_digest,
  };
  return {
    decision,
    boundary: {
      ...boundaryPreimage,
      boundary_digest: sha256Canonical(boundaryPreimage),
    },
  };
}
