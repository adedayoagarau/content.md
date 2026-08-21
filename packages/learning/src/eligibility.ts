import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  type MemoryScope,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import {
  task2AssertCanonicalValue,
  task2AssertDigest,
  task2AssertDigestRef,
  task2AssertExactObject,
  task2AssertProvenance,
  task2AssertScope,
  task2AssertSortedUnique,
  task2AssertText,
  task2AssertTimestamp,
  task2AssertTopLevelShape,
  task2CompareRfc3339Instants,
  task2DigestRef,
  task2FailContract,
  task2PreflightArray,
  task2PreflightArtifactRef,
  task2PreflightDecision,
  task2PreflightDigestRef,
  task2PreflightDurableRecord,
  task2PreflightProducer,
  task2PreflightText,
  task2ReceiptProvenance,
  task2RefsEqual,
  task2SortProvenance,
  task2VerifyDecisionRecord,
  task2VerifyDurableRecord,
  task2VerifyProducer,
  type DurableContentDecisionRecord,
  type ProducerArtifactWitness,
  type Task2RecordMode,
} from "./feedback.js";
import {
  task2LineageLearningEligible,
  qualifyFeedback,
  task2ReviewerIsQualified,
  task2PreflightFeedbackQualificationInput,
  task2PreflightLineagePayload,
  task2PreflightReviewerSetPayload,
  task2PreflightSnapshot,
  task2SnapshotRef,
  task2ValidateLineageSnapshot,
  task2ValidateReviewerSetSnapshot,
  task2VerifySnapshotEnvelope,
  type CandidateLineagePayload,
  type EvidenceSnapshot,
  type FeedbackQualificationInput,
  type ReviewerSetPayload,
} from "./qualification.js";
import {
  LEARNING_SCHEMA_IDS,
  type DigestRef,
  type FeedbackQualificationRecord,
  type LearningEligibilityRecord,
} from "./records.js";

export interface ScopeTransition {
  from: MemoryScope;
  to: MemoryScope;
}

export interface LearningPolicyPayload {
  policy_ref: DigestRef;
  status: "current" | "superseded" | "revoked" | "unknown";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_memory_scopes: [MemoryScope, ...MemoryScope[]];
  allowed_scope_transitions: [ScopeTransition, ...ScopeTransition[]];
  minimum_independent_reviewers: Record<MemoryScope, number>;
  allowed_lineage_classes: ["project_owned", "project_owned_synthetic"];
  required_checks: ["rights", "privacy", "factual", "policy", "incident", "context"];
  edited_content_requires_unchanged_facts_requirements_context: true;
}

export interface LearningPermissionPayload {
  permission_ref: DigestRef;
  permission_class: "learning_data";
  status: "issued" | "revoked" | "expired" | "superseded";
  revocation_state: "current" | "revoked" | "unknown";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_memory_scopes: [MemoryScope, ...MemoryScope[]];
  project_ids: [string, ...string[]];
  subject_refs: [DigestRef, ...DigestRef[]];
  issued_at: string;
  expires_at: string | null;
}

export type CheckState = "pass" | "fail" | "unknown";

export interface EligibilityCheck {
  state: CheckState;
  evidence_refs: [DigestRef, ...DigestRef[]];
  rationale_codes: [string, ...string[]];
}

export interface EligibilityChecksPayload {
  qualification_ref: DigestRef;
  decision_ref: DigestRef;
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  target_memory_scope: MemoryScope;
  project_id: string | null;
  evaluated_at: string;
  rights: EligibilityCheck;
  privacy: EligibilityCheck;
  factual: EligibilityCheck;
  policy: EligibilityCheck;
  incident: EligibilityCheck;
  context: EligibilityCheck;
}

export interface LearningEligibilityInput {
  record_mode: Task2RecordMode;
  evaluation_at: string;
  producer: ProducerArtifactWitness;
  qualification: FeedbackQualificationRecord;
  qualification_input: FeedbackQualificationInput;
  decision: DurableContentDecisionRecord;
  learning_policy: EvidenceSnapshot<"learning-policy", LearningPolicyPayload>;
  permission: EvidenceSnapshot<"learning-permission", LearningPermissionPayload> | null;
  checks: EvidenceSnapshot<"eligibility-checks", EligibilityChecksPayload>;
  lineage_a: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  lineage_b: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  reviewer_set: EvidenceSnapshot<"reviewer-set", ReviewerSetPayload>;
  target_memory_scope: MemoryScope;
}

const MEMORY_SCOPES: readonly MemoryScope[] = ["task", "personal", "project", "organization", "public"];
const CHECK_NAMES = ["rights", "privacy", "factual", "policy", "incident", "context"] as const;

function sameTuple(actual: readonly unknown[], expected: readonly unknown[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function scopesEqual(left: RecordScope, right: RecordScope): boolean {
  return left.memory_scope === right.memory_scope
    && left.project_id === right.project_id
    && sameTuple(left.resource_refs, right.resource_refs)
    && sameTuple(left.data_classes, right.data_classes);
}

function assertReferenceSchema(ref: DigestRef, expectedSchemaId: string): void {
  if (ref.schema_id !== expectedSchemaId) task2FailContract("schema_id");
}

function snapshotSchemaId(kind: string): string {
  return `contentmd.task2-${kind}-snapshot`;
}

function validateRefSet(value: unknown, nonempty = true): asserts value is DigestRef[] {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) task2FailContract("input_shape");
  for (const ref of value) task2AssertDigestRef(ref);
  task2AssertSortedUnique(value, !nonempty);
}

function validateTextSet(value: unknown): asserts value is string[] {
  if (!Array.isArray(value) || value.length === 0
    || !value.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2FailContract("input_shape");
  }
  task2AssertSortedUnique(value, false);
}

function validateLearningSharedPayload(payload: {
  contract_version: unknown;
  record_mode: unknown;
  ranking_objective: unknown;
  candidate_kind: unknown;
  authority_effect: unknown;
  schema_digest: unknown;
  code_digest: unknown;
  input_digest: unknown;
}): void {
  if (payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || (payload.record_mode !== "development_fixture" && payload.record_mode !== "official")
    || payload.ranking_objective !== "expression_preference"
    || payload.candidate_kind !== "expression"
    || payload.authority_effect !== "none") task2FailContract("input_shape");
  task2AssertDigest(payload.schema_digest);
  task2AssertDigest(payload.code_digest);
  task2AssertDigest(payload.input_digest);
}

const QUALIFICATION_REASON_CODES = new Set([
  "qualified_decisive_review", "cross_record_reference_mismatch", "facts_changed",
  "policy_changed", "requirements_changed", "context_changed", "conflict_unresolved",
  "adjudication_invalid", "decision_outcome_mismatch", "edited_comparison_invalid",
  "reviewer_abstained", "non_decisive_tie", "blinding_required", "randomization_required",
  "rubric_not_current_or_mismatched", "reviewer_set_not_qualified",
  "candidate_lineage_not_learning_eligible", "conflict_requires_adjudication",
  "fact_set_not_current", "review_policy_not_current",
]);
const INVALID_QUALIFICATION_REASONS = new Set([
  "cross_record_reference_mismatch", "facts_changed", "policy_changed",
  "requirements_changed", "context_changed", "conflict_unresolved",
  "adjudication_invalid", "decision_outcome_mismatch", "edited_comparison_invalid",
]);
const NOT_QUALIFIED_REASONS = new Set([
  "non_decisive_tie", "blinding_required", "randomization_required",
  "rubric_not_current_or_mismatched", "reviewer_set_not_qualified",
  "candidate_lineage_not_learning_eligible", "conflict_requires_adjudication",
  "fact_set_not_current", "review_policy_not_current",
]);
const ELIGIBILITY_REASON_CODES = new Set([
  "all_eligibility_checks_passed", "feedback_not_qualified", "decision_ref_mismatch",
  "learning_policy_not_current_or_mismatched", "scope_transition_not_allowed",
  "permission_missing", "permission_not_current", "permission_not_yet_effective",
  "permission_expired", "permission_revoked_or_unknown",
  "permission_objective_or_kind_mismatch", "permission_scope_mismatch",
  "permission_project_mismatch", "permission_subject_mismatch",
  "eligibility_checks_binding_mismatch", "rights_check_fail", "rights_check_unknown",
  "privacy_check_fail", "privacy_check_unknown", "factual_check_fail",
  "factual_check_unknown", "policy_check_fail", "policy_check_unknown",
  "incident_check_fail", "incident_check_unknown", "context_check_fail",
  "context_check_unknown", "candidate_lineage_not_learning_eligible",
  "reviewer_set_insufficient_or_unqualified", "edited_content_changed",
]);

function assertTextArrayShape(value: unknown): asserts value is string[] {
  if (!Array.isArray(value) || value.length === 0
    || !value.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2FailContract("input_shape");
  }
}

function assertBoundProvenance(entry: ProvenanceRef, ref: DigestRef | null): void {
  if (ref !== null && (entry.record_id !== ref.record_id || entry.content_digest !== ref.content_digest)) {
    task2FailContract("reference_integrity");
  }
}

function assertExactConsumedProvenance(
  provenance: readonly ProvenanceRef[],
  required: Readonly<Record<string, DigestRef | null>>,
  optional: readonly string[],
): void {
  const requiredNames = new Set(Object.keys(required));
  const optionalNames = new Set(optional);
  const byRelationship = new Map<string, ProvenanceRef[]>();
  for (const entry of provenance) {
    if (!requiredNames.has(entry.relationship) && !optionalNames.has(entry.relationship)) {
      task2FailContract("reference_integrity");
    }
    const entries = byRelationship.get(entry.relationship) ?? [];
    entries.push(entry);
    byRelationship.set(entry.relationship, entries);
  }
  for (const [relationship, ref] of Object.entries(required)) {
    const entries = byRelationship.get(relationship) ?? [];
    if (entries.length !== 1) task2FailContract("reference_integrity");
    assertBoundProvenance(entries[0]!, ref);
  }
  for (const relationship of optionalNames) {
    if ((byRelationship.get(relationship)?.length ?? 0) > 1) {
      task2FailContract("reference_integrity");
    }
  }
}

const DURABLE_RECORD_KEYS = [
  "record_id", "schema_id", "schema_version", "record_version", "content_digest",
  "scope", "provenance", "lifecycle_state", "payload",
] as const;
const QUALIFICATION_PAYLOAD_KEYS = [
  "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
  "code_digest", "input_digest", "authority_effect", "decision_ref", "rubric_ref",
  "reviewer_qualification_ref", "fact_set_ref", "policy_ref", "task_ref", "context_ref",
  "candidate_a_ref", "candidate_b_ref", "presentation_ref", "blinded", "randomized",
  "rationale_codes", "outcome", "conflict_state", "adjudication_ref", "facts_changed",
  "requirements_changed", "context_changed", "qualification_state", "reason_codes",
] as const;
const ELIGIBILITY_PAYLOAD_KEYS = [
  "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
  "code_digest", "input_digest", "authority_effect", "qualification_ref", "decision_ref",
  "learning_policy_ref", "permission_ref", "target_memory_scope", "rights_check", "privacy_check",
  "factual_check", "policy_check", "incident_check", "context_check", "eligibility_state", "reason_codes",
] as const;

function preflightTextArray(value: unknown, minimumLength = 0, exactLength?: number): void {
  task2PreflightArray(value, minimumLength, task2PreflightText, exactLength);
}

function preflightRefArray(value: unknown, minimumLength = 0): void {
  task2PreflightArray(value, minimumLength, task2PreflightDigestRef);
}

function preflightLearningSharedPayload(payload: Record<string, unknown>): void {
  for (const field of [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
    "code_digest", "input_digest", "authority_effect",
  ] as const) task2PreflightText(payload[field]);
}

export function task2PreflightQualificationRecord(value: unknown): void {
  task2PreflightDurableRecord(value, (payload) => {
    task2AssertExactObject(payload, QUALIFICATION_PAYLOAD_KEYS);
    preflightLearningSharedPayload(payload);
    for (const field of [
      "decision_ref", "reviewer_qualification_ref", "fact_set_ref", "policy_ref", "task_ref",
      "context_ref", "candidate_a_ref", "candidate_b_ref", "presentation_ref",
    ] as const) task2PreflightDigestRef(payload[field]);
    task2PreflightArtifactRef(payload.rubric_ref);
    if (typeof payload.blinded !== "boolean" || typeof payload.randomized !== "boolean") {
      task2FailContract("input_shape");
    }
    preflightTextArray(payload.rationale_codes, 1);
    task2PreflightText(payload.outcome);
    task2PreflightText(payload.conflict_state);
    if (payload.adjudication_ref !== null) task2PreflightDigestRef(payload.adjudication_ref);
    if (typeof payload.facts_changed !== "boolean"
      || typeof payload.requirements_changed !== "boolean"
      || typeof payload.context_changed !== "boolean") task2FailContract("input_shape");
    task2PreflightText(payload.qualification_state);
    preflightTextArray(payload.reason_codes, 1);
  });
}

export function task2PreflightEligibilityRecord(value: unknown): void {
  task2PreflightDurableRecord(value, (payload) => {
    task2AssertExactObject(payload, ELIGIBILITY_PAYLOAD_KEYS);
    preflightLearningSharedPayload(payload);
    for (const field of ["qualification_ref", "decision_ref", "learning_policy_ref"] as const) {
      task2PreflightDigestRef(payload[field]);
    }
    if (payload.permission_ref !== null) task2PreflightDigestRef(payload.permission_ref);
    task2PreflightText(payload.target_memory_scope);
    for (const field of [
      "rights_check", "privacy_check", "factual_check", "policy_check", "incident_check",
      "context_check", "eligibility_state",
    ] as const) task2PreflightText(payload[field]);
    preflightTextArray(payload.reason_codes, 1);
  });
}

function preflightLearningPolicy(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "policy_ref", "status", "ranking_objective", "candidate_kind", "allowed_memory_scopes",
    "allowed_scope_transitions", "minimum_independent_reviewers", "allowed_lineage_classes",
    "required_checks", "edited_content_requires_unchanged_facts_requirements_context",
  ]);
  task2PreflightDigestRef(payload.policy_ref);
  for (const field of ["status", "ranking_objective", "candidate_kind"] as const) {
    task2PreflightText(payload[field]);
  }
  preflightTextArray(payload.allowed_memory_scopes, 1);
  task2PreflightArray(payload.allowed_scope_transitions, 1, (transition) => {
    task2AssertExactObject(transition, ["from", "to"]);
    task2PreflightText(transition.from);
    task2PreflightText(transition.to);
  });
  task2AssertExactObject(payload.minimum_independent_reviewers, MEMORY_SCOPES);
  for (const scope of MEMORY_SCOPES) {
    if (!Number.isInteger(payload.minimum_independent_reviewers[scope])) {
      task2FailContract("input_shape");
    }
  }
  preflightTextArray(payload.allowed_lineage_classes, 2, 2);
  preflightTextArray(payload.required_checks, 6, 6);
  if (typeof payload.edited_content_requires_unchanged_facts_requirements_context !== "boolean") {
    task2FailContract("input_shape");
  }
}

function preflightPermission(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "permission_ref", "permission_class", "status", "revocation_state", "ranking_objective",
    "candidate_kind", "allowed_memory_scopes", "project_ids", "subject_refs", "issued_at", "expires_at",
  ]);
  task2PreflightDigestRef(payload.permission_ref);
  for (const field of [
    "permission_class", "status", "revocation_state", "ranking_objective", "candidate_kind", "issued_at",
  ] as const) task2PreflightText(payload[field]);
  preflightTextArray(payload.allowed_memory_scopes, 1);
  preflightTextArray(payload.project_ids, 1);
  preflightRefArray(payload.subject_refs, 1);
  if (payload.expires_at !== null) task2PreflightText(payload.expires_at);
}

function preflightCheck(value: unknown): void {
  task2AssertExactObject(value, ["state", "evidence_refs", "rationale_codes"]);
  task2PreflightText(value.state);
  preflightRefArray(value.evidence_refs, 1);
  preflightTextArray(value.rationale_codes, 1);
}

function preflightChecks(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref",
    "candidate_b_ref", "target_memory_scope", "project_id", "evaluated_at",
    "rights", "privacy", "factual", "policy", "incident", "context",
  ]);
  for (const field of [
    "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref",
  ] as const) task2PreflightDigestRef(payload[field]);
  task2PreflightText(payload.target_memory_scope);
  if (payload.project_id !== null) task2PreflightText(payload.project_id);
  task2PreflightText(payload.evaluated_at);
  for (const name of CHECK_NAMES) preflightCheck(payload[name]);
}

export function task2PreflightLearningEligibilityInput(
  value: unknown,
): asserts value is LearningEligibilityInput {
  task2AssertCanonicalValue(value);
  task2AssertTopLevelShape(value, [
    "record_mode", "evaluation_at", "producer", "qualification", "qualification_input", "decision",
    "learning_policy", "permission", "checks", "lineage_a", "lineage_b", "reviewer_set",
    "target_memory_scope",
  ]);
}

export function task2VerifyQualificationRecord(
  value: unknown,
): asserts value is FeedbackQualificationRecord {
  task2AssertExactObject(value, DURABLE_RECORD_KEYS);
  task2AssertCanonicalValue(value);
  task2AssertExactObject(value.payload, QUALIFICATION_PAYLOAD_KEYS);
  const record = value as unknown as FeedbackQualificationRecord;
  validateLearningSharedPayload(record.payload);
  for (const field of [
    "decision_ref", "reviewer_qualification_ref", "fact_set_ref", "policy_ref", "task_ref",
    "context_ref", "candidate_a_ref", "candidate_b_ref", "presentation_ref",
  ] as const) task2AssertDigestRef(record.payload[field]);
  assertReferenceSchema(record.payload.decision_ref, "contentmd.content-decision-record");
  assertReferenceSchema(record.payload.reviewer_qualification_ref, snapshotSchemaId("reviewer-set"));
  assertReferenceSchema(record.payload.fact_set_ref, snapshotSchemaId("fact-set"));
  assertReferenceSchema(record.payload.policy_ref, snapshotSchemaId("review-policy"));
  assertReferenceSchema(record.payload.task_ref, snapshotSchemaId("task"));
  assertReferenceSchema(record.payload.context_ref, snapshotSchemaId("context"));
  assertReferenceSchema(record.payload.candidate_a_ref, snapshotSchemaId("candidate"));
  assertReferenceSchema(record.payload.candidate_b_ref, snapshotSchemaId("candidate"));
  assertReferenceSchema(record.payload.presentation_ref, snapshotSchemaId("presentation"));
  task2AssertExactObject(record.payload.rubric_ref, ["artifact_id", "artifact_version", "artifact_digest"]);
  task2AssertText(record.payload.rubric_ref.artifact_id);
  task2AssertText(record.payload.rubric_ref.artifact_version);
  task2AssertDigest(record.payload.rubric_ref.artifact_digest);
  if (typeof record.payload.blinded !== "boolean" || typeof record.payload.randomized !== "boolean") {
    task2FailContract("input_shape");
  }
  assertTextArrayShape(record.payload.rationale_codes);
  if (!["A", "B", "tie", "abstain"].includes(record.payload.outcome)
    || !["none", "declared", "adjudicated", "unresolved"].includes(record.payload.conflict_state)
    || !["qualified", "not_qualified", "abstained", "invalid"].includes(record.payload.qualification_state)) {
    task2FailContract("input_shape");
  }
  if (record.payload.adjudication_ref !== null) {
    task2AssertDigestRef(record.payload.adjudication_ref);
    assertReferenceSchema(record.payload.adjudication_ref, snapshotSchemaId("adjudication"));
  }
  if (typeof record.payload.facts_changed !== "boolean"
    || typeof record.payload.requirements_changed !== "boolean"
    || typeof record.payload.context_changed !== "boolean") task2FailContract("input_shape");
  assertTextArrayShape(record.payload.reason_codes);
  task2VerifyDurableRecord(value, LEARNING_SCHEMA_IDS.feedbackQualification, false);
  if (record.record_version !== 1 || record.lifecycle_state !== "active"
    || record.payload.record_mode !== "development_fixture"
    || record.payload.authority_effect !== "none"
    || record.record_id !== `feedback-qualification.${record.payload.input_digest}`) {
    task2FailContract("reference_integrity");
  }
  if (!record.payload.reason_codes.every((reason) => QUALIFICATION_REASON_CODES.has(reason))) {
    task2FailContract("reference_integrity");
  }
  const adjudicationCoherent = (record.payload.conflict_state === "adjudicated")
    === (record.payload.adjudication_ref !== null);
  const driftClear = !record.payload.facts_changed
    && !record.payload.requirements_changed && !record.payload.context_changed;
  const reasonSet = new Set(record.payload.reason_codes);
  let stateCoherent = false;
  if (record.payload.qualification_state === "qualified") {
    stateCoherent = (record.payload.outcome === "A" || record.payload.outcome === "B")
      && record.payload.blinded && record.payload.randomized && driftClear
      && (record.payload.conflict_state === "none" || record.payload.conflict_state === "adjudicated")
      && sameTuple(record.payload.reason_codes, ["qualified_decisive_review"]);
  } else if (record.payload.qualification_state === "abstained") {
    stateCoherent = record.payload.outcome === "abstain" && driftClear
      && (record.payload.conflict_state === "none" || record.payload.conflict_state === "declared")
      && record.payload.adjudication_ref === null
      && sameTuple(record.payload.reason_codes, ["reviewer_abstained"]);
  } else if (record.payload.qualification_state === "not_qualified") {
    stateCoherent = record.payload.outcome !== "abstain" && driftClear
      && record.payload.conflict_state !== "unresolved"
      && record.payload.reason_codes.every((reason) => NOT_QUALIFIED_REASONS.has(reason))
      && reasonSet.has("non_decisive_tie") === (record.payload.outcome === "tie")
      && reasonSet.has("blinding_required") === !record.payload.blinded
      && reasonSet.has("randomization_required") === !record.payload.randomized
      && reasonSet.has("conflict_requires_adjudication") === (record.payload.conflict_state === "declared");
  } else {
    stateCoherent = record.payload.reason_codes.every((reason) => INVALID_QUALIFICATION_REASONS.has(reason))
      && reasonSet.has("facts_changed") === record.payload.facts_changed
      && reasonSet.has("requirements_changed") === record.payload.requirements_changed
      && reasonSet.has("context_changed") === record.payload.context_changed
      && reasonSet.has("conflict_unresolved") === (record.payload.conflict_state === "unresolved");
  }
  if (!stateCoherent || !adjudicationCoherent) {
    task2FailContract("reference_integrity");
  }
  const hadAdjudication = record.payload.adjudication_ref !== null
    || reasonSet.has("adjudication_invalid");
  assertExactConsumedProvenance(record.provenance, {
    proposal: null,
    decision_event: null,
    decision_boundary: null,
    decision: record.payload.decision_ref,
    pairwise_review: null,
    review_rubric: null,
    reviewer_set: record.payload.reviewer_qualification_ref,
    fact_set: record.payload.fact_set_ref,
    review_policy: record.payload.policy_ref,
    task: record.payload.task_ref,
    context: record.payload.context_ref,
    candidate_a: record.payload.candidate_a_ref,
    candidate_b: record.payload.candidate_b_ref,
    presentation: record.payload.presentation_ref,
    lineage_a: null,
    lineage_b: null,
    ...(hadAdjudication ? { adjudication: record.payload.adjudication_ref } : {}),
  }, [
    "producer_verification", "pairwise_review_verification", "review_rubric_verification",
    "reviewer_set_verification", "fact_set_verification", "review_policy_verification",
    "task_verification", "context_verification", "candidate_a_verification",
    "candidate_b_verification", "presentation_verification", "lineage_a_verification",
    "lineage_b_verification", ...(hadAdjudication ? ["adjudication_verification"] : []),
  ]);
  task2AssertScope(record.scope);
  task2AssertProvenance(record.provenance);
  task2AssertSortedUnique(record.payload.rationale_codes, false);
  task2AssertSortedUnique(record.payload.reason_codes, false);
}

export function task2VerifyEligibilityRecord(
  value: unknown,
): asserts value is LearningEligibilityRecord {
  task2AssertExactObject(value, DURABLE_RECORD_KEYS);
  task2AssertCanonicalValue(value);
  task2AssertExactObject(value.payload, ELIGIBILITY_PAYLOAD_KEYS);
  const record = value as unknown as LearningEligibilityRecord;
  validateLearningSharedPayload(record.payload);
  task2AssertDigestRef(record.payload.qualification_ref);
  task2AssertDigestRef(record.payload.decision_ref);
  task2AssertDigestRef(record.payload.learning_policy_ref);
  assertReferenceSchema(record.payload.qualification_ref, LEARNING_SCHEMA_IDS.feedbackQualification);
  assertReferenceSchema(record.payload.decision_ref, "contentmd.content-decision-record");
  assertReferenceSchema(record.payload.learning_policy_ref, snapshotSchemaId("learning-policy"));
  if (record.payload.permission_ref !== null) {
    task2AssertDigestRef(record.payload.permission_ref);
    assertReferenceSchema(record.payload.permission_ref, snapshotSchemaId("learning-permission"));
  }
  if (!MEMORY_SCOPES.includes(record.payload.target_memory_scope)) task2FailContract("input_shape");
  for (const field of ["rights_check", "privacy_check", "factual_check", "policy_check", "incident_check", "context_check"] as const) {
    if (!["pass", "fail", "unknown"].includes(record.payload[field])) task2FailContract("input_shape");
  }
  if (record.payload.eligibility_state !== "eligible" && record.payload.eligibility_state !== "ineligible") {
    task2FailContract("input_shape");
  }
  assertTextArrayShape(record.payload.reason_codes);
  task2VerifyDurableRecord(value, LEARNING_SCHEMA_IDS.learningEligibility, false);
  if (record.record_version !== 1 || record.lifecycle_state !== "active"
    || record.payload.record_mode !== "development_fixture"
    || record.payload.authority_effect !== "none"
    || record.record_id !== `learning-eligibility.${record.payload.input_digest}`) {
    task2FailContract("reference_integrity");
  }
  if (!record.payload.reason_codes.every((reason) => ELIGIBILITY_REASON_CODES.has(reason))) {
    task2FailContract("reference_integrity");
  }
  const reasonSet = new Set(record.payload.reason_codes);
  const checkStates = [record.payload.rights_check, record.payload.privacy_check,
    record.payload.factual_check, record.payload.policy_check, record.payload.incident_check,
    record.payload.context_check];
  const eligibleCoherent = record.payload.eligibility_state !== "eligible" || (
    record.payload.permission_ref !== null
    && sameTuple(record.payload.reason_codes, ["all_eligibility_checks_passed"])
    && checkStates.every((state) => state === "pass")
  );
  let checkReasonsCoherent = true;
  for (const field of ["rights", "privacy", "factual", "policy", "incident", "context"] as const) {
    const state = record.payload[`${field}_check`];
    checkReasonsCoherent &&= reasonSet.has(`${field}_check_fail`) === (state === "fail")
      && reasonSet.has(`${field}_check_unknown`) === (state === "unknown");
  }
  if (record.scope.memory_scope !== record.payload.target_memory_scope
    || !eligibleCoherent
    || (record.payload.eligibility_state === "ineligible"
      && (reasonSet.has("all_eligibility_checks_passed") || record.payload.reason_codes.length === 0))
    || reasonSet.has("permission_missing") !== (record.payload.permission_ref === null)
    || !checkReasonsCoherent) {
    task2FailContract("reference_integrity");
  }
  assertExactConsumedProvenance(record.provenance, {
    qualification: record.payload.qualification_ref,
    decision: record.payload.decision_ref,
    learning_policy: record.payload.learning_policy_ref,
    eligibility_checks: null,
    lineage_a: null,
    lineage_b: null,
    reviewer_set: null,
    ...(record.payload.permission_ref === null
      ? {}
      : { learning_permission: record.payload.permission_ref }),
  }, [
    "producer_verification", "learning_policy_verification", "eligibility_checks_verification",
    "lineage_a_verification", "lineage_b_verification", "reviewer_set_verification",
    ...(record.payload.permission_ref === null ? [] : ["learning_permission_verification"]),
  ]);
  task2AssertScope(record.scope);
  task2AssertProvenance(record.provenance);
  task2AssertSortedUnique(record.payload.reason_codes, false);
}

function validateLearningPolicy(snapshot: EvidenceSnapshot<"learning-policy", LearningPolicyPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "policy_ref", "status", "ranking_objective", "candidate_kind", "allowed_memory_scopes",
    "allowed_scope_transitions", "minimum_independent_reviewers", "allowed_lineage_classes",
    "required_checks", "edited_content_requires_unchanged_facts_requirements_context",
  ]);
  task2AssertDigestRef(snapshot.payload.policy_ref);
  if (!["current", "superseded", "revoked", "unknown"].includes(snapshot.payload.status)) {
    task2FailContract("input_shape");
  }
  task2AssertText(snapshot.payload.ranking_objective);
  task2AssertText(snapshot.payload.candidate_kind);
  if (!Array.isArray(snapshot.payload.allowed_memory_scopes) || snapshot.payload.allowed_memory_scopes.length === 0
    || !snapshot.payload.allowed_memory_scopes.every((scope) => MEMORY_SCOPES.includes(scope))) {
    task2FailContract("input_shape");
  }
  task2AssertSortedUnique(snapshot.payload.allowed_memory_scopes, false);
  if (!Array.isArray(snapshot.payload.allowed_scope_transitions) || snapshot.payload.allowed_scope_transitions.length === 0) {
    task2FailContract("input_shape");
  }
  for (const transition of snapshot.payload.allowed_scope_transitions) {
    task2AssertExactObject(transition, ["from", "to"]);
    if (!MEMORY_SCOPES.includes(transition.from) || !MEMORY_SCOPES.includes(transition.to)) {
      task2FailContract("input_shape");
    }
  }
  task2AssertSortedUnique(snapshot.payload.allowed_scope_transitions, false);
  task2AssertExactObject(snapshot.payload.minimum_independent_reviewers, MEMORY_SCOPES);
  for (const scope of MEMORY_SCOPES) {
    const minimum = snapshot.payload.minimum_independent_reviewers[scope];
    const floor = scope === "organization" || scope === "public" ? 2 : 1;
    if (!Number.isInteger(minimum) || minimum < floor) task2FailContract("input_shape");
  }
  if (!sameTuple(snapshot.payload.allowed_lineage_classes, ["project_owned", "project_owned_synthetic"])
    || !sameTuple(snapshot.payload.required_checks, CHECK_NAMES)
    || snapshot.payload.edited_content_requires_unchanged_facts_requirements_context !== true) {
    task2FailContract("input_shape");
  }
}

function validatePermission(snapshot: EvidenceSnapshot<"learning-permission", LearningPermissionPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "permission_ref", "permission_class", "status", "revocation_state", "ranking_objective",
    "candidate_kind", "allowed_memory_scopes", "project_ids", "subject_refs", "issued_at", "expires_at",
  ]);
  task2AssertDigestRef(snapshot.payload.permission_ref);
  if (snapshot.payload.permission_class !== "learning_data"
    || !["issued", "revoked", "expired", "superseded"].includes(snapshot.payload.status)
    || !["current", "revoked", "unknown"].includes(snapshot.payload.revocation_state)) {
    task2FailContract("input_shape");
  }
  task2AssertText(snapshot.payload.ranking_objective);
  task2AssertText(snapshot.payload.candidate_kind);
  if (!Array.isArray(snapshot.payload.allowed_memory_scopes) || snapshot.payload.allowed_memory_scopes.length === 0
    || !snapshot.payload.allowed_memory_scopes.every((scope) => MEMORY_SCOPES.includes(scope))) {
    task2FailContract("input_shape");
  }
  task2AssertSortedUnique(snapshot.payload.allowed_memory_scopes, false);
  validateTextSet(snapshot.payload.project_ids);
  validateRefSet(snapshot.payload.subject_refs);
  task2AssertTimestamp(snapshot.payload.issued_at);
  if (snapshot.payload.expires_at !== null) task2AssertTimestamp(snapshot.payload.expires_at);
}

function validateCheck(value: EligibilityCheck): void {
  task2AssertExactObject(value, ["state", "evidence_refs", "rationale_codes"]);
  if (!["pass", "fail", "unknown"].includes(value.state)) task2FailContract("input_shape");
  validateRefSet(value.evidence_refs);
  validateTextSet(value.rationale_codes);
}

function validateChecks(snapshot: EvidenceSnapshot<"eligibility-checks", EligibilityChecksPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref",
    "candidate_b_ref", "target_memory_scope", "project_id", "evaluated_at",
    "rights", "privacy", "factual", "policy", "incident", "context",
  ]);
  for (const field of [
    "qualification_ref", "decision_ref", "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref",
  ] as const) task2AssertDigestRef(snapshot.payload[field]);
  assertReferenceSchema(snapshot.payload.qualification_ref, LEARNING_SCHEMA_IDS.feedbackQualification);
  assertReferenceSchema(snapshot.payload.decision_ref, "contentmd.content-decision-record");
  assertReferenceSchema(snapshot.payload.task_ref, snapshotSchemaId("task"));
  assertReferenceSchema(snapshot.payload.context_ref, snapshotSchemaId("context"));
  assertReferenceSchema(snapshot.payload.candidate_a_ref, snapshotSchemaId("candidate"));
  assertReferenceSchema(snapshot.payload.candidate_b_ref, snapshotSchemaId("candidate"));
  if (!MEMORY_SCOPES.includes(snapshot.payload.target_memory_scope)) task2FailContract("input_shape");
  if (snapshot.payload.project_id !== null) task2AssertText(snapshot.payload.project_id);
  task2AssertTimestamp(snapshot.payload.evaluated_at);
  for (const name of CHECK_NAMES) validateCheck(snapshot.payload[name]);
}

function includesRef(values: readonly DigestRef[], expected: DigestRef): boolean {
  return values.some((ref) => task2RefsEqual(ref, expected));
}

function snapshotProvenance<K extends string, P>(
  snapshot: EvidenceSnapshot<K, P>,
  relationship: string,
): ProvenanceRef[] {
  return [
    { record_id: snapshot.snapshot_id, relationship, content_digest: snapshot.snapshot_digest },
    ...task2ReceiptProvenance(snapshot.verification_receipt, `${relationship}_verification`),
  ];
}

function validateInput(input: LearningEligibilityInput): ReturnType<typeof task2VerifyProducer> {
  task2PreflightLearningEligibilityInput(input);
  task2PreflightText(input.record_mode);
  if (input.record_mode !== "development_fixture" && input.record_mode !== "official") {
    task2FailContract("input_shape");
  }
  task2PreflightText(input.evaluation_at);
  task2AssertTimestamp(input.evaluation_at);

  task2PreflightProducer(input.producer);
  const producer = task2VerifyProducer(input.producer, "learning-eligibility");

  task2PreflightQualificationRecord(input.qualification);
  task2VerifyQualificationRecord(input.qualification);

  task2PreflightFeedbackQualificationInput(input.qualification_input);
  const replayedQualification = qualifyFeedback(input.qualification_input);
  if (canonicalJson(replayedQualification) !== canonicalJson(input.qualification)
    || input.qualification_input.record_mode !== input.record_mode) {
    task2FailContract("reference_integrity");
  }

  task2PreflightDecision(input.decision);
  task2VerifyDecisionRecord(input.decision);
  if (canonicalJson(input.qualification_input.decision) !== canonicalJson(input.decision)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.learning_policy, "learning-policy", preflightLearningPolicy);
  task2VerifySnapshotEnvelope(input.learning_policy, "learning-policy");
  validateLearningPolicy(input.learning_policy);

  if (input.permission !== null) {
    task2PreflightSnapshot(input.permission, "learning-permission", preflightPermission);
    task2VerifySnapshotEnvelope(input.permission, "learning-permission");
    validatePermission(input.permission);
  }

  task2PreflightSnapshot(input.checks, "eligibility-checks", preflightChecks);
  task2VerifySnapshotEnvelope(input.checks, "eligibility-checks");
  validateChecks(input.checks);

  task2PreflightSnapshot(input.lineage_a, "candidate-lineage", task2PreflightLineagePayload);
  task2VerifySnapshotEnvelope(input.lineage_a, "candidate-lineage");
  task2ValidateLineageSnapshot(input.lineage_a);
  if (canonicalJson(input.qualification_input.lineage_a) !== canonicalJson(input.lineage_a)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.lineage_b, "candidate-lineage", task2PreflightLineagePayload);
  task2VerifySnapshotEnvelope(input.lineage_b, "candidate-lineage");
  task2ValidateLineageSnapshot(input.lineage_b);
  if (canonicalJson(input.qualification_input.lineage_b) !== canonicalJson(input.lineage_b)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightSnapshot(input.reviewer_set, "reviewer-set", task2PreflightReviewerSetPayload);
  task2VerifySnapshotEnvelope(input.reviewer_set, "reviewer-set");
  task2ValidateReviewerSetSnapshot(input.reviewer_set);
  if (canonicalJson(input.qualification_input.reviewer_set) !== canonicalJson(input.reviewer_set)) {
    task2FailContract("reference_integrity");
  }

  task2PreflightText(input.target_memory_scope);
  if (!MEMORY_SCOPES.includes(input.target_memory_scope)) task2FailContract("input_shape");
  if (input.record_mode === "official") task2FailContract("official_mode_not_supported");
  return producer;
}

export function determineLearningEligibility(
  input: LearningEligibilityInput,
): LearningEligibilityRecord {
  const producer = validateInput(input);
  const reasons = new Set<string>();
  const qualificationRef = task2DigestRef(input.qualification);
  const decisionRef = task2DigestRef(input.decision);
  const learningPolicyRef = task2SnapshotRef(input.learning_policy);
  const permissionRef = input.permission === null ? null : task2SnapshotRef(input.permission);
  const checks = input.checks.payload;
  const qualification = input.qualification.payload;

  if (qualification.qualification_state !== "qualified"
    || (qualification.outcome !== "A" && qualification.outcome !== "B")) {
    reasons.add("feedback_not_qualified");
  }
  if (!task2RefsEqual(qualification.decision_ref, decisionRef)
    || !scopesEqual(input.qualification.scope, input.decision.scope)) {
    reasons.add("decision_ref_mismatch");
  }

  const policy = input.learning_policy.payload;
  const policyMatches = policy.status === "current"
    && policy.ranking_objective === "expression_preference"
    && policy.candidate_kind === "expression"
    && policy.allowed_memory_scopes.includes(input.target_memory_scope)
    && sameTuple(policy.required_checks, CHECK_NAMES)
    && sameTuple(policy.allowed_lineage_classes, ["project_owned", "project_owned_synthetic"]);
  if (!policyMatches) reasons.add("learning_policy_not_current_or_mismatched");
  if (!policy.allowed_scope_transitions.some((transition) =>
    transition.from === input.qualification.scope.memory_scope && transition.to === input.target_memory_scope)) {
    reasons.add("scope_transition_not_allowed");
  }

  if (input.permission === null) {
    reasons.add("permission_missing");
  } else {
    const permission = input.permission.payload;
    if (permission.status === "expired") reasons.add("permission_expired");
    if (permission.status === "revoked") reasons.add("permission_revoked_or_unknown");
    if (permission.status === "superseded") reasons.add("permission_not_current");
    if (permission.revocation_state !== "current") reasons.add("permission_revoked_or_unknown");
    if (task2CompareRfc3339Instants(permission.issued_at, input.evaluation_at) > 0) {
      reasons.add("permission_not_yet_effective");
    }
    if (permission.expires_at !== null
      && task2CompareRfc3339Instants(input.evaluation_at, permission.expires_at) >= 0) {
      reasons.add("permission_expired");
    }
    if (permission.ranking_objective !== "expression_preference" || permission.candidate_kind !== "expression") {
      reasons.add("permission_objective_or_kind_mismatch");
    }
    if (!permission.allowed_memory_scopes.includes(input.target_memory_scope)) reasons.add("permission_scope_mismatch");
    const projectId = input.qualification.scope.project_id;
    if (projectId === null || !permission.project_ids.includes(projectId)) reasons.add("permission_project_mismatch");
    if (![qualification.candidate_a_ref, qualification.candidate_b_ref, decisionRef]
      .every((ref) => includesRef(permission.subject_refs, ref))) reasons.add("permission_subject_mismatch");
  }

  const expectedChecksBindings = [
    task2RefsEqual(checks.qualification_ref, qualificationRef),
    task2RefsEqual(checks.decision_ref, decisionRef),
    task2RefsEqual(checks.task_ref, qualification.task_ref),
    task2RefsEqual(checks.context_ref, qualification.context_ref),
    task2RefsEqual(checks.candidate_a_ref, qualification.candidate_a_ref),
    task2RefsEqual(checks.candidate_b_ref, qualification.candidate_b_ref),
    checks.target_memory_scope === input.target_memory_scope,
    checks.project_id === input.qualification.scope.project_id,
    checks.evaluated_at === input.evaluation_at,
  ];
  if (expectedChecksBindings.some((matches) => !matches)) reasons.add("eligibility_checks_binding_mismatch");
  for (const name of CHECK_NAMES) {
    const state = checks[name].state;
    if (state !== "pass") reasons.add(`${name}_check_${state}`);
  }

  if (!task2LineageLearningEligible(input.lineage_a.payload)
    || !task2LineageLearningEligible(input.lineage_b.payload)
    || !task2RefsEqual(input.lineage_a.payload.candidate_ref, qualification.candidate_a_ref)
    || !task2RefsEqual(input.lineage_b.payload.candidate_ref, qualification.candidate_b_ref)) {
    reasons.add("candidate_lineage_not_learning_eligible");
  }
  if (!task2RefsEqual(task2SnapshotRef(input.reviewer_set), qualification.reviewer_qualification_ref)) {
    reasons.add("reviewer_set_insufficient_or_unqualified");
  }
  const uniqueReviewers = new Map(
    input.reviewer_set.payload.entries.map((entry) => [entry.reviewer_ref.record_id, entry]),
  );
  const reviewerCount = [...uniqueReviewers.values()].filter((entry) => task2ReviewerIsQualified(
    entry,
    input.evaluation_at,
    input.target_memory_scope,
    [],
  )).length;
  if (reviewerCount < policy.minimum_independent_reviewers[input.target_memory_scope]) {
    reasons.add("reviewer_set_insufficient_or_unqualified");
  }
  if (input.decision.payload.status === "edited"
    && (qualification.facts_changed || qualification.requirements_changed || qualification.context_changed)) {
    reasons.add("edited_content_changed");
  }

  const eligible = reasons.size === 0;
  const reasonCodes = eligible ? ["all_eligibility_checks_passed"] : [...reasons].sort();
  const derivedOutputScope: RecordScope = {
    memory_scope: input.target_memory_scope,
    project_id: input.qualification.scope.project_id,
    resource_refs: [...input.qualification.scope.resource_refs],
    data_classes: [...input.qualification.scope.data_classes],
  };
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.learning-eligibility-input/0.1.0",
    record_mode: input.record_mode,
    evaluation_at: input.evaluation_at,
    derived_output_scope: derivedOutputScope,
    producer: input.producer,
    qualification: input.qualification,
    qualification_input: input.qualification_input,
    decision: input.decision,
    evidence: {
      learning_policy: input.learning_policy,
      permission: input.permission,
      checks: input.checks,
      lineage_a: input.lineage_a,
      lineage_b: input.lineage_b,
      reviewer_set: input.reviewer_set,
    },
    target_memory_scope: input.target_memory_scope,
  });
  const provenance = task2SortProvenance([
    { record_id: input.qualification.record_id, relationship: "qualification", content_digest: input.qualification.content_digest },
    { record_id: input.decision.record_id, relationship: "decision", content_digest: input.decision.content_digest },
    ...snapshotProvenance(input.learning_policy, "learning_policy"),
    ...(input.permission === null ? [] : snapshotProvenance(input.permission, "learning_permission")),
    ...snapshotProvenance(input.checks, "eligibility_checks"),
    ...snapshotProvenance(input.lineage_a, "lineage_a"),
    ...snapshotProvenance(input.lineage_b, "lineage_b"),
    ...snapshotProvenance(input.reviewer_set, "reviewer_set"),
    ...task2ReceiptProvenance(producer.verification_receipt, "producer_verification"),
  ]);
  return finalizeRecord({
    record_id: `learning-eligibility.${inputDigest}`,
    schema_id: LEARNING_SCHEMA_IDS.learningEligibility,
    schema_version: "0.1.0",
    record_version: 1,
    scope: derivedOutputScope,
    provenance,
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
      qualification_ref: qualificationRef,
      decision_ref: decisionRef,
      learning_policy_ref: learningPolicyRef,
      permission_ref: permissionRef,
      target_memory_scope: input.target_memory_scope,
      rights_check: checks.rights.state,
      privacy_check: checks.privacy.state,
      factual_check: checks.factual.state,
      policy_check: checks.policy.state,
      incident_check: checks.incident.state,
      context_check: checks.context.state,
      eligibility_state: eligible ? "eligible" : "ineligible",
      reason_codes: reasonCodes as [string, ...string[]],
    },
  }) as LearningEligibilityRecord;
}
