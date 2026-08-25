import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ObservedExpressionEvidenceRecord } from "./observed-expression.js";
import type { PatternDispositionRecord } from "./pattern-disposition.js";
import type { ContentPatternRecord } from "./pattern-record.js";
import {
  assessThirdPartyExpressionSimilarity,
  DISTINCTIVE_SIMILARITY_THRESHOLD,
} from "./similarity.js";
import type { ResearchRecordRef } from "./source-record.js";
import { verifyVoiceLineage } from "./voice-tone-lineage.js";
import type { PatternRightsStatus, PatternTransferField } from "./pattern-record.js";

export interface TransferablePatternProjection {
  contract_version: "contentmd.transferable-pattern-projection/0.1.0";
  pattern_ref: ResearchRecordRef;
  transferable_mechanism: string;
  prohibited_imitation_boundary: string;
  evidence_refs: ResearchRecordRef[];
  similarity_threshold: typeof DISTINCTIVE_SIMILARITY_THRESHOLD;
  maximum_similarity: number;
  decision_state: "candidate_abstraction";
  authority_effect: "none";
  projection_digest: string;
}

export interface SynthesizeTransferablePatternInput {
  pattern: ContentPatternRecord;
  disposition: PatternDispositionRecord;
  expression_evidence: ObservedExpressionEvidenceRecord[];
  lineage_records: DurableRecord<unknown>[];
}

export interface PatternPromptTaskScope {
  project_id: string;
  journey: string;
  stage: string;
  state: string;
  channel: string;
  modality: string;
  locale: string;
  risk: string;
  rights_status: PatternRightsStatus;
  evaluation_at: string;
}

export interface PatternApprovalPayload {
  approval_class: "semantic_decision";
  subject_ref: string;
  subject_digest: string;
  scope: string[];
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export type PatternApprovalRecord = DurableRecord<PatternApprovalPayload>;

export interface QualifyTransferablePatternForPromptInput
  extends SynthesizeTransferablePatternInput {
  task_scope: PatternPromptTaskScope;
  approval_record: PatternApprovalRecord;
}

export interface QualifiedPatternMechanism {
  contract_version: "contentmd.qualified-pattern-mechanism/0.1.0";
  project_id: string;
  pattern_ref: ResearchRecordRef;
  disposition_ref: ResearchRecordRef;
  approval_ref: ResearchRecordRef;
  transferable_mechanism: string;
  prohibited_imitation_boundary: string;
  applicable_contexts: ContentPatternRecord["payload"]["contexts"];
  transfer_conditions: ContentPatternRecord["payload"]["transfer_conditions"];
  evidence_refs: ResearchRecordRef[];
  source_projection_digest: string;
  evaluation_at: string;
  decision_state: "approved_for_project_prompt";
  authority_effect: "none";
  qualification_digest: string;
}

function refFor(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function exactRef(left: ResearchRecordRef, right: ResearchRecordRef): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function compareRefs(left: ResearchRecordRef, right: ResearchRecordRef): number {
  const leftBytes = canonicalJson(left);
  const rightBytes = canonicalJson(right);
  return leftBytes < rightBytes ? -1 : leftBytes > rightBytes ? 1 : 0;
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

function assertRecords(input: SynthesizeTransferablePatternInput): void {
  if (!verifyRecordDigest(input.pattern).valid
    || !validateRecord(SCHEMA_IDS.contentPattern, input.pattern).valid) {
    throw new TypeError("pattern_transfer_blocked:pattern_integrity");
  }
  if (!verifyRecordDigest(input.disposition).valid
    || !validateRecord(SCHEMA_IDS.patternDisposition, input.disposition).valid) {
    throw new TypeError("pattern_transfer_blocked:disposition_integrity");
  }
  if (!exactRef(input.disposition.payload.pattern_ref, refFor(input.pattern))) {
    throw new TypeError("pattern_transfer_blocked:pattern_binding");
  }
}

function assertReview(disposition: PatternDispositionRecord): void {
  if (disposition.payload.disposition !== "candidate_abstraction"
    || disposition.payload.rights_review_state !== "reviewed"
    || disposition.payload.reviewer_refs.length === 0) {
    throw new TypeError("pattern_transfer_blocked:rights_review");
  }
  if (disposition.payload.similarity_review_state !== "passed") {
    throw new TypeError("pattern_transfer_blocked:similarity_review");
  }
  if (disposition.payload.prompt_eligibility !== "review_required"
    || disposition.payload.training_eligibility !== "project_owned_application_only") {
    throw new TypeError("pattern_transfer_blocked:eligibility");
  }
}

function assertLineage(input: SynthesizeTransferablePatternInput): Map<string, DurableRecord<unknown>> {
  try {
    return verifyVoiceLineage([
      input.pattern,
      input.disposition,
      ...input.expression_evidence,
      ...input.lineage_records,
    ]);
  } catch (error) {
    if (error instanceof Error && (
      error.message.startsWith("voice_lineage_quarantined:")
      || error.message.startsWith("duplicate_voice_lineage_record:")
    )) {
      throw new TypeError("nonconforming_evidence_lineage_blocked");
    }
    throw error;
  }
}

function assertBoundRefs(
  disposition: PatternDispositionRecord,
  lineage: ReadonlyMap<string, DurableRecord<unknown>>,
): void {
  for (const ref of [...disposition.payload.evidence_refs, ...disposition.payload.reviewer_refs]) {
    const record = lineage.get(ref.record_id);
    if (record === undefined || !exactRef(refFor(record), ref)) {
      throw new TypeError(`pattern_transfer_blocked:lineage_binding:${ref.record_id}`);
    }
  }
}

export function synthesizeTransferablePattern(
  input: SynthesizeTransferablePatternInput,
): TransferablePatternProjection {
  assertRecords(input);
  assertReview(input.disposition);
  for (const evidence of input.expression_evidence) {
    if (evidence.payload.rights_review_state !== "reviewed_evidence_only") {
      throw new TypeError("pattern_transfer_blocked:rights_review");
    }
  }
  const similarity = assessThirdPartyExpressionSimilarity({
    candidate_expression: input.pattern.payload.mechanism,
    evidence: input.expression_evidence,
  });
  if (similarity.blocked) throw new TypeError("third_party_expression_similarity_blocked");

  const lineage = assertLineage(input);
  assertBoundRefs(input.disposition, lineage);
  const evidenceRefs = [...input.disposition.payload.evidence_refs].sort(compareRefs);
  const preimage = {
    contract_version: "contentmd.transferable-pattern-projection/0.1.0" as const,
    pattern_ref: refFor(input.pattern),
    transferable_mechanism: input.pattern.payload.mechanism,
    prohibited_imitation_boundary: input.pattern.payload.rights_boundary,
    evidence_refs: evidenceRefs,
    similarity_threshold: DISTINCTIVE_SIMILARITY_THRESHOLD,
    maximum_similarity: similarity.maximum_score,
    decision_state: "candidate_abstraction" as const,
    authority_effect: "none" as const,
  };
  return {
    ...preimage,
    projection_digest: sha256Canonical(preimage),
  };
}

function promptInvalid(reason: string): never {
  throw new TypeError(`pattern_prompt_context_invalid:${reason}`);
}

function assertPromptText(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) promptInvalid(field);
}

function taskScopeValue(
  scope: PatternPromptTaskScope,
  field: PatternTransferField,
): string {
  if (field === "risk_level") return scope.risk;
  return scope[field];
}

function assertPatternScope(input: QualifyTransferablePatternForPromptInput): void {
  const scope = input.task_scope;
  for (const [field, value] of Object.entries(scope)) assertPromptText(value, `task_scope.${field}`);
  if (input.pattern.lifecycle_state !== "active"
    || input.disposition.lifecycle_state !== "active"
    || input.pattern.scope.memory_scope !== "project"
    || input.pattern.scope.project_id !== scope.project_id
    || input.disposition.scope.project_id !== scope.project_id) {
    promptInvalid("pattern_scope");
  }
  const contextMatches = input.pattern.payload.contexts.some((context) => (
    context.journeys.includes(scope.journey)
    && context.stages.includes(scope.stage)
    && context.states.includes(scope.state)
    && context.channels.includes(scope.channel)
    && context.modalities.includes(scope.modality)
    && context.locales.includes(scope.locale)
    && context.risk_levels.includes(scope.risk)
  ));
  if (!contextMatches || input.pattern.payload.transfer_conditions.some(
    (condition) => !condition.values.includes(taskScopeValue(scope, condition.field)),
  )) {
    promptInvalid("pattern_scope");
  }
}

function assertPatternApproval(input: QualifyTransferablePatternForPromptInput): void {
  const approval = input.approval_record;
  if (!verifyRecordDigest(approval).valid
    || !validateRecord(SCHEMA_IDS.approval, approval).valid) {
    promptInvalid("approval_integrity");
  }
  const evaluatedAt = Date.parse(input.task_scope.evaluation_at);
  const issuedAt = Date.parse(approval.payload.issued_at);
  const expiresAt = approval.payload.expires_at === null
    ? null
    : Date.parse(approval.payload.expires_at);
  if (!Number.isFinite(evaluatedAt)
    || !Number.isFinite(issuedAt)
    || (expiresAt !== null && !Number.isFinite(expiresAt))) {
    promptInvalid("time");
  }
  if (approval.lifecycle_state !== "active"
    || approval.scope.project_id !== input.task_scope.project_id
    || approval.payload.approval_class !== "semantic_decision"
    || approval.payload.status !== "issued"
    || approval.payload.revocation_state !== "current"
    || approval.payload.subject_ref !== input.pattern.record_id
    || approval.payload.subject_digest !== input.pattern.content_digest
    || issuedAt > evaluatedAt
    || (expiresAt !== null && evaluatedAt >= expiresAt)) {
    promptInvalid("approval_not_current");
  }
  const scope = input.task_scope;
  const requiredScope = [
    `project:${scope.project_id}`,
    `journey:${scope.journey}`,
    `stage:${scope.stage}`,
    `state:${scope.state}`,
    `channel:${scope.channel}`,
    `modality:${scope.modality}`,
    `locale:${scope.locale}`,
    `risk:${scope.risk}`,
  ];
  if (requiredScope.some((value) => !approval.payload.scope.includes(value))) {
    promptInvalid("approval_scope");
  }
}

export function qualifyTransferablePatternForPrompt(
  input: QualifyTransferablePatternForPromptInput,
): QualifiedPatternMechanism {
  assertPatternScope(input);
  const projection = synthesizeTransferablePattern(input);
  assertPatternApproval(input);
  const preimage = {
    contract_version: "contentmd.qualified-pattern-mechanism/0.1.0" as const,
    project_id: input.task_scope.project_id,
    pattern_ref: refFor(input.pattern),
    disposition_ref: refFor(input.disposition),
    approval_ref: refFor(input.approval_record),
    transferable_mechanism: projection.transferable_mechanism,
    prohibited_imitation_boundary: projection.prohibited_imitation_boundary,
    applicable_contexts: canonicalClone(input.pattern.payload.contexts),
    transfer_conditions: canonicalClone(input.pattern.payload.transfer_conditions),
    evidence_refs: canonicalClone(projection.evidence_refs),
    source_projection_digest: projection.projection_digest,
    evaluation_at: input.task_scope.evaluation_at,
    decision_state: "approved_for_project_prompt" as const,
    authority_effect: "none" as const,
  };
  return deepFreeze({
    ...preimage,
    qualification_digest: sha256Canonical(preimage),
  });
}
