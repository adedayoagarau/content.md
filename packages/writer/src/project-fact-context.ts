import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
} from "@contentmd/core";
import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  createContentTaskPacket,
  type ContentTaskPacket,
} from "./task-packet.js";

export interface ProjectFactSourcePayload {
  source_type: string;
  locator: string;
  access_mode: string;
  captured_at: string;
  rights_status: string;
  evidence_strength: string;
}

export interface ProjectFactEvidencePayload {
  source_refs: string[];
  claim: string;
  observation_strength: string;
  limitations: string[];
}

export interface ProjectFactApprovalPayload {
  approval_class: "semantic_decision";
  subject_ref: string;
  subject_digest: string;
  scope: string[];
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export type ProjectFactSourceRecord = DurableRecord<ProjectFactSourcePayload>;
export type ProjectFactRecord = DurableRecord<ProjectFactEvidencePayload>;
export type ProjectFactApprovalRecord = DurableRecord<ProjectFactApprovalPayload>;

export interface QualifyProjectFactForPromptInput {
  project_id: string;
  evaluation_at: string;
  task: ContentTaskPacket;
  fact_record: ProjectFactRecord;
  source_records: ProjectFactSourceRecord[];
  approval_record: ProjectFactApprovalRecord;
}

export interface EligibleProjectFact {
  contract_version: "contentmd.eligible-project-fact/0.1.0";
  project_id: string;
  task_id: string;
  task_digest: string;
  evaluation_at: string;
  fact_ref: ModelObjectRef;
  source_refs: ModelObjectRef[];
  approval_ref: ModelObjectRef;
  claim: string;
  observation_strength: string;
  limitations: string[];
  effective_from: string;
  effective_through: string | null;
  raw_source_locators_included: false;
  authority_effect: "none";
  qualification_digest: string;
}

export interface ProjectFactPromptContextContent
  extends Omit<EligibleProjectFact, "contract_version"> {
  contract_version: "contentmd.project-fact-prompt-context/0.1.0";
  verification_digest: string;
  context_digest: string;
}

export interface ProjectFactPromptContextVerification {
  contract_version: "contentmd.project-fact-prompt-context-verification/0.1.0";
  qualification_input: QualifyProjectFactForPromptInput;
  eligible_fact: EligibleProjectFact;
  verification_digest: string;
}

export interface ProjectFactPromptContextItem {
  source_ref: ModelObjectRef;
  data_class: "project_fact";
  content: ProjectFactPromptContextContent;
  verification: ProjectFactPromptContextVerification;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const RECORD_ID = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/u;
const RFC3339_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u;
const LIFECYCLE_STATES = new Set([
  "proposed",
  "approved",
  "active",
  "superseded",
  "retired",
  "rejected",
]);
const MEMORY_SCOPES = new Set(["task", "personal", "project", "organization", "public"]);

function invalid(reason: string): never {
  throw new TypeError(`project_fact_prompt_context_invalid:${reason}`);
}

function forbidden(reason: string): never {
  throw new TypeError(`prompt_context_forbidden:${reason}`);
}

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function assertPlainDataGraph(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("input_shape");
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) invalid("input_shape");
  const expectedPrototype = Array.isArray(value) ? Array.prototype : Object.prototype;
  if (Object.getPrototypeOf(value) !== expectedPrototype) invalid("input_shape");
  ancestors.add(value);
  try {
    const keys = Reflect.ownKeys(value);
    if (Array.isArray(value)
      && (keys.length !== value.length + 1 || keys[keys.length - 1] !== "length")) {
      invalid("input_shape");
    }
    for (const key of keys) {
      if (Array.isArray(value) && key === "length") continue;
      if (typeof key !== "string") invalid("input_shape");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        invalid("input_shape");
      }
      assertPlainDataGraph(descriptor.value, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

function refFor(record: DurableRecord<unknown>): ModelObjectRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function exactKeys(value: object, expected: readonly string[]): boolean {
  const keys = Object.keys(value).sort(compareUtf8);
  const orderedExpected = [...expected].sort(compareUtf8);
  return canonicalJson(keys) === canonicalJson(orderedExpected);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function isUniqueStringArray(
  value: unknown,
  options: { nonempty?: boolean; nonempty_items?: boolean } = {},
): value is string[] {
  if (!Array.isArray(value)
    || (options.nonempty === true && value.length === 0)
    || value.some((item) => (
      typeof item !== "string" || (options.nonempty_items === true && item.length === 0)
    ))) return false;
  return new Set(value).size === value.length;
}

function hasBaseRecordShape(record: DurableRecord<unknown>, schemaId: string): boolean {
  if (!exactKeys(record, [
    "record_id",
    "schema_id",
    "schema_version",
    "record_version",
    "content_digest",
    "scope",
    "provenance",
    "lifecycle_state",
    "payload",
  ])
    || !RECORD_ID.test(record.record_id)
    || record.schema_id !== schemaId
    || record.schema_version !== "0.1.0"
    || !Number.isSafeInteger(record.record_version)
    || record.record_version < 1
    || !DIGEST.test(record.content_digest)
    || !LIFECYCLE_STATES.has(record.lifecycle_state)
    || !exactKeys(record.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"])
    || !MEMORY_SCOPES.has(record.scope.memory_scope)
    || (record.scope.project_id !== null && typeof record.scope.project_id !== "string")
    || !isUniqueStringArray(record.scope.resource_refs, { nonempty_items: true })
    || !isUniqueStringArray(record.scope.data_classes, { nonempty_items: true })
    || !Array.isArray(record.provenance)) return false;
  return record.provenance.every((provenance) => (
    exactKeys(provenance, ["record_id", "relationship", "content_digest"])
    && RECORD_ID.test(provenance.record_id)
    && isText(provenance.relationship)
    && DIGEST.test(provenance.content_digest)
  ));
}

function hasSourcePayloadShape(value: unknown): value is ProjectFactSourcePayload {
  if (typeof value !== "object" || value === null
    || !exactKeys(value, [
      "source_type",
      "locator",
      "access_mode",
      "captured_at",
      "rights_status",
      "evidence_strength",
    ])) return false;
  const payload = value as unknown as ProjectFactSourcePayload;
  return isText(payload.source_type)
    && isText(payload.locator)
    && isText(payload.access_mode)
    && RFC3339_UTC.test(payload.captured_at)
    && isText(payload.rights_status)
    && isText(payload.evidence_strength);
}

function hasEvidencePayloadShape(value: unknown): value is ProjectFactEvidencePayload {
  if (typeof value !== "object" || value === null
    || !exactKeys(value, ["source_refs", "claim", "observation_strength", "limitations"])) {
    return false;
  }
  const payload = value as unknown as ProjectFactEvidencePayload;
  return isUniqueStringArray(payload.source_refs, { nonempty: true, nonempty_items: true })
    && isText(payload.claim)
    && isText(payload.observation_strength)
    && Array.isArray(payload.limitations)
    && payload.limitations.every((item) => typeof item === "string");
}

function hasApprovalPayloadShape(value: unknown): value is ProjectFactApprovalPayload {
  if (typeof value !== "object" || value === null
    || !exactKeys(value, [
      "approval_class",
      "subject_ref",
      "subject_digest",
      "scope",
      "status",
      "issued_at",
      "expires_at",
      "revocation_state",
    ])) return false;
  const payload = value as unknown as ProjectFactApprovalPayload;
  return payload.approval_class === "semantic_decision"
    && isText(payload.subject_ref)
    && DIGEST.test(payload.subject_digest)
    && isUniqueStringArray(payload.scope, { nonempty: true })
    && new Set(["issued", "revoked", "expired", "superseded"]).has(payload.status)
    && isText(payload.issued_at)
    && (payload.expires_at === null || typeof payload.expires_at === "string")
    && new Set(["current", "revoked", "unknown"]).has(payload.revocation_state);
}

function replayTask(task: ContentTaskPacket): ContentTaskPacket {
  return createContentTaskPacket({
    task_id: task.task_id,
    product_context_refs: task.product_context_refs,
    audience_job_refs: task.audience_job_refs,
    journey_state_refs: task.journey_state_refs,
    semantic_message_ref: task.semantic_message_ref,
    required_fact_refs: task.required_fact_refs,
    prohibited_claims: task.prohibited_claims,
    consequence: task.consequence,
    recovery: task.recovery,
    channel: task.channel,
    locale: task.locale,
    risk: task.risk,
    evidence_refs: task.evidence_refs,
    acceptance_criteria: task.acceptance_criteria,
  });
}

function assertRecord(
  record: DurableRecord<unknown>,
  schemaId: "contentmd.source-record" | "contentmd.evidence-record" | "contentmd.approval-record",
  reason: string,
): void {
  const payloadValid = schemaId === "contentmd.source-record"
    ? hasSourcePayloadShape(record.payload)
    : schemaId === "contentmd.evidence-record"
      ? hasEvidencePayloadShape(record.payload)
      : hasApprovalPayloadShape(record.payload);
  if (!hasBaseRecordShape(record, schemaId)
    || !payloadValid
    || !verifyRecordDigest(record).valid) {
    invalid(reason);
  }
}

function assertProjectScope(
  record: DurableRecord<unknown>,
  projectId: string,
  reason: string,
): void {
  if ((record.scope.memory_scope !== "project" && record.scope.memory_scope !== "organization")
    || record.scope.project_id !== projectId) {
    invalid(reason);
  }
}

function assertCurrentTime(input: QualifyProjectFactForPromptInput): number {
  const evaluatedAt = Date.parse(input.evaluation_at);
  if (!Number.isFinite(evaluatedAt)) invalid("evaluation_at");
  return evaluatedAt;
}

function assertTask(input: QualifyProjectFactForPromptInput): void {
  let replayed: ContentTaskPacket;
  try {
    replayed = replayTask(input.task);
  } catch {
    invalid("task_integrity");
  }
  if (canonicalJson(replayed) !== canonicalJson(input.task)) invalid("task_integrity");
  if (!input.task.required_fact_refs.includes(input.fact_record.record_id)) invalid("task_fact");
}

function assertSources(input: QualifyProjectFactForPromptInput, evaluatedAt: number): ProjectFactSourceRecord[] {
  const expectedIds = [...input.fact_record.payload.source_refs].sort(compareUtf8);
  const orderedSources = [...input.source_records].sort((left, right) => (
    compareUtf8(left.record_id, right.record_id)
  ));
  const receivedIds = orderedSources.map((source) => source.record_id);
  if (new Set(receivedIds).size !== receivedIds.length
    || canonicalJson(receivedIds) !== canonicalJson(expectedIds)) invalid("source_set");
  if (input.fact_record.provenance.length !== orderedSources.length) invalid("source_lineage");

  for (const source of orderedSources) {
    assertRecord(source, "contentmd.source-record", "source_integrity");
    if (source.lifecycle_state !== "active" && source.lifecycle_state !== "approved") {
      invalid("source_lifecycle");
    }
    const capturedAt = Date.parse(source.payload.captured_at);
    if (!Number.isFinite(capturedAt) || capturedAt > evaluatedAt) invalid("source_time");
    const publicSource = source.scope.memory_scope === "public" && source.scope.project_id === null;
    if (!publicSource) assertProjectScope(source, input.project_id, "source_scope");
    if (!input.task.evidence_refs.includes(source.record_id)) invalid("task_evidence");
    const provenance = input.fact_record.provenance.find((candidate) => (
      candidate.record_id === source.record_id
      && candidate.content_digest === source.content_digest
      && candidate.relationship.trim().length > 0
    ));
    if (provenance === undefined) invalid("source_lineage");
  }
  return orderedSources;
}

function assertApproval(input: QualifyProjectFactForPromptInput, evaluatedAt: number): void {
  const approval = input.approval_record;
  assertRecord(approval, "contentmd.approval-record", "approval_integrity");
  assertProjectScope(approval, input.project_id, "approval_scope");
  const issuedAt = Date.parse(approval.payload.issued_at);
  const expiresAt = approval.payload.expires_at === null
    ? null
    : Date.parse(approval.payload.expires_at);
  if (!Number.isFinite(issuedAt) || (expiresAt !== null && !Number.isFinite(expiresAt))) {
    invalid("approval_time");
  }
  if (approval.lifecycle_state !== "active"
    || approval.payload.approval_class !== "semantic_decision"
    || approval.payload.subject_ref !== input.fact_record.record_id
    || approval.payload.subject_digest !== input.fact_record.content_digest
    || approval.payload.status !== "issued"
    || approval.payload.revocation_state !== "current"
    || issuedAt > evaluatedAt
    || (expiresAt !== null && evaluatedAt >= expiresAt)) {
    invalid("approval_not_current");
  }
  if (!approval.payload.scope.includes(`project:${input.project_id}`)
    || !approval.payload.scope.includes("data_class:project_fact")) {
    invalid("approval_scope");
  }
  if (approval.provenance.length !== 1
    || approval.provenance[0]?.record_id !== input.fact_record.record_id
    || approval.provenance[0]?.content_digest !== input.fact_record.content_digest) {
    invalid("approval_lineage");
  }
}

export function qualifyProjectFactForPrompt(
  input: QualifyProjectFactForPromptInput,
): EligibleProjectFact {
  assertPlainDataGraph(input);
  text(input.project_id, "project_id");
  text(input.evaluation_at, "evaluation_at");
  const evaluatedAt = assertCurrentTime(input);
  assertRecord(input.fact_record, "contentmd.evidence-record", "fact_integrity");
  if (input.fact_record.lifecycle_state !== "active") invalid("fact_lifecycle");
  assertProjectScope(input.fact_record, input.project_id, "fact_scope");
  if (!input.fact_record.scope.data_classes.includes("project_fact")
    || input.fact_record.scope.resource_refs.length === 0
    || input.fact_record.scope.resource_refs.some((ref) => (
      !input.task.product_context_refs.includes(ref)
    ))) {
    invalid("fact_scope");
  }
  assertTask(input);
  const sourceRecords = assertSources(input, evaluatedAt);
  assertApproval(input, evaluatedAt);

  const preimage = {
    contract_version: "contentmd.eligible-project-fact/0.1.0" as const,
    project_id: input.project_id,
    task_id: input.task.task_id,
    task_digest: input.task.task_digest,
    evaluation_at: input.evaluation_at,
    fact_ref: refFor(input.fact_record),
    source_refs: sourceRecords.map(refFor),
    approval_ref: refFor(input.approval_record),
    claim: input.fact_record.payload.claim,
    observation_strength: input.fact_record.payload.observation_strength,
    limitations: [...input.fact_record.payload.limitations],
    effective_from: input.approval_record.payload.issued_at,
    effective_through: input.approval_record.payload.expires_at,
    raw_source_locators_included: false as const,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, qualification_digest: sha256Canonical(preimage) });
}

function buildContent(
  eligible: EligibleProjectFact,
  verificationDigest: string,
): ProjectFactPromptContextContent {
  const {
    contract_version: _eligibleContract,
    qualification_digest,
    ...eligibleFields
  } = canonicalClone(eligible);
  const preimage = {
    contract_version: "contentmd.project-fact-prompt-context/0.1.0" as const,
    ...eligibleFields,
    qualification_digest,
    verification_digest: verificationDigest,
  };
  return { ...preimage, context_digest: sha256Canonical(preimage) };
}

export function createProjectFactPromptContext(
  input: QualifyProjectFactForPromptInput,
): ProjectFactPromptContextItem {
  const qualificationInput = canonicalClone(input);
  const eligibleFact = qualifyProjectFactForPrompt(qualificationInput);
  const verificationPreimage = {
    contract_version: "contentmd.project-fact-prompt-context-verification/0.1.0" as const,
    qualification_input: qualificationInput,
    eligible_fact: canonicalClone(eligibleFact),
  };
  const verificationDigest = sha256Canonical(verificationPreimage);
  return deepFreeze({
    source_ref: canonicalClone(eligibleFact.fact_ref),
    data_class: "project_fact" as const,
    content: buildContent(eligibleFact, verificationDigest),
    verification: {
      ...verificationPreimage,
      verification_digest: verificationDigest,
    },
  });
}

export function verifyAndProjectProjectFactPromptContext(
  value: ProjectFactPromptContextItem,
): Omit<ProjectFactPromptContextItem, "verification"> {
  try {
    assertPlainDataGraph(value);
  } catch {
    forbidden("project_fact_unverified");
  }
  let replayed: ProjectFactPromptContextItem;
  try {
    replayed = createProjectFactPromptContext(value.verification.qualification_input);
  } catch {
    forbidden("project_fact_unverified");
  }
  if (canonicalJson(value.verification.eligible_fact)
      !== canonicalJson(replayed.verification.eligible_fact)
    || value.verification.verification_digest !== replayed.verification.verification_digest
    || canonicalJson(value.source_ref) !== canonicalJson(replayed.source_ref)
    || canonicalJson(value.content) !== canonicalJson(replayed.content)) {
    forbidden("project_fact_replay_mismatch");
  }
  return deepFreeze({
    source_ref: canonicalClone(replayed.source_ref),
    data_class: "project_fact" as const,
    content: canonicalClone(replayed.content),
  });
}

export function assertProjectFactPromptBinding(
  value: Omit<ProjectFactPromptContextItem, "verification">,
  task: ContentTaskPacket,
  projectId: string,
): void {
  if (value.content.project_id !== projectId) forbidden("project_fact_scope");
  if (value.content.task_id !== task.task_id || value.content.task_digest !== task.task_digest) {
    forbidden("project_fact_task_binding");
  }
  if (!task.required_fact_refs.includes(value.content.fact_ref.record_id)) {
    forbidden("project_fact_task_binding");
  }
  if (!DIGEST.test(value.content.context_digest)
    || !DIGEST.test(value.content.qualification_digest)
    || !DIGEST.test(value.content.verification_digest)) {
    forbidden("project_fact_replay_mismatch");
  }
}
