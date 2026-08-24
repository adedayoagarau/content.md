import { createHash } from "node:crypto";
import {
  finalizeRecord,
  sha256Canonical,
  type MemoryScope,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import type { StoredEvent } from "@contentmd/memory";
import {
  task2AssertArtifactRef,
  task2AssertCanonicalValue,
  task2AssertDigest,
  task2AssertDigestRef,
  task2AssertExactObject,
  task2AssertRecordId,
  task2AssertSortedUnique,
  task2AssertText,
  task2AssertTimestamp,
  task2AssertTopLevelShape,
  task2CompareRfc3339Instants,
  task2DigestRef,
  task2FailContract,
  task2PreflightArray,
  task2PreflightArtifactRef,
  task2PreflightBoundary,
  task2PreflightDecision,
  task2PreflightDigestRef,
  task2PreflightEvent,
  task2PreflightProducer,
  task2PreflightProposal,
  task2PreflightReceipt,
  task2PreflightText,
  task2ReceiptProvenance,
  task2RefsEqual,
  task2SortCanonical,
  task2SortProvenance,
  task2VerifyDecisionRecord,
  task2VerifyDurableRecord,
  task2VerifyEvent,
  task2VerifyProducer,
  task2VerifyProposal,
  task2VerifyReceiptShape,
  type CanonicalContentDecisionBoundary,
  type DurableContentDecisionRecord,
  type ProducerArtifactWitness,
  type ProposalRecord,
  type Task2RecordMode,
  type VerificationReceiptRecord,
} from "./feedback.js";
import {
  LEARNING_SCHEMA_IDS,
  type ArtifactRef,
  type DigestRef,
  type FeedbackQualificationRecord,
} from "./records.js";

export interface EvidenceSnapshot<K extends string, P> {
  contract_version: "contentmd.task2-evidence-snapshot/0.1.0";
  snapshot_id: string;
  snapshot_kind: K;
  snapshot_version: "0.1.0";
  captured_at: string;
  verification_mode: "development_fixture" | "resolver_verified";
  verification_receipt: VerificationReceiptRecord | null;
  source_refs: [DigestRef, ...DigestRef[]];
  payload: P;
  snapshot_digest: string;
}

export interface StableSetPayload {
  item_refs: [DigestRef, ...DigestRef[]];
  set_digest: string;
  state: "current" | "superseded" | "revoked" | "unknown";
}

export interface TaskPayload {
  task_key: string;
  fact_set_ref: DigestRef;
  policy_ref: DigestRef;
  context_ref: DigestRef;
  requirements_digest: string;
  content_slot: string;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
}

export interface ContextPayload {
  context_key: string;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  surface: string;
  audience: string;
  content_slot: string;
}

export interface CandidatePayload {
  task_ref: DigestRef;
  context_ref: DigestRef;
  content_slot: string;
  author_refs: DigestRef[];
  expression: string;
  expression_digest: string;
}

export interface BlindingProof {
  status: "pass" | "fail";
  reviewer_refs: [DigestRef, ...DigestRef[]];
  hidden_fields: ["candidate_identity", "provider_identity", "author_identity"];
  evidence_refs: [DigestRef, ...DigestRef[]];
}

export interface RandomizationProof {
  status: "pass" | "fail";
  algorithm: "sha256-counter-v1";
  seed_commitment_digest: string;
  assignment_digest: string;
  evidence_refs: [DigestRef, ...DigestRef[]];
}

export interface PresentationPayload {
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  canonical_order: ["A", "B"];
  presented_order: ["A", "B"] | ["B", "A"];
  comparison_kind: "explicit_pairwise" | "accepted_edit_vs_original";
  original_proposal_side: "A" | "B" | null;
  blinding_proof: BlindingProof;
  randomization_proof: RandomizationProof;
  fact_set_ref: DigestRef;
  policy_ref: DigestRef;
  requirements_digest: string;
}

export interface PairwiseReviewPayload {
  decision_ref: DigestRef;
  presentation_ref: DigestRef;
  reviewer_set_ref: DigestRef;
  reviewer_refs: [DigestRef, ...DigestRef[]];
  rubric_ref: ArtifactRef;
  outcome: "A" | "B" | "tie" | "abstain";
  rationale_codes: [string, ...string[]];
  conflict_state: "none" | "declared" | "unresolved";
  observed_fact_set_ref: DigestRef;
  observed_policy_ref: DigestRef;
  observed_task_ref: DigestRef;
  observed_context_ref: DigestRef;
  observed_requirements_digest: string;
}

export interface ReviewRubricPayload {
  artifact_ref: ArtifactRef;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  allowed_outcomes: ["A", "B", "tie", "abstain"];
  requires_blinding: true;
  requires_randomization: true;
  requires_rationale: true;
  stable_dimensions: ["facts", "requirements", "context"];
  status: "current" | "superseded" | "revoked";
}

export interface ReviewerEntry {
  reviewer_ref: DigestRef;
  role: "content_reviewer" | "content_designer" | "subject_matter_expert" | "adjudicator";
  qualified_objectives: ["expression_preference"];
  authorized_scopes: [MemoryScope, ...MemoryScope[]];
  independent_of_candidate_authorship: boolean;
  independence_evidence_refs: [DigestRef, ...DigestRef[]];
  conflict_state: "none" | "declared" | "resolved" | "unresolved";
  qualification_status: "current" | "expired" | "revoked" | "unknown";
  effective_at: string;
  expires_at: string | null;
}

export interface ReviewerSetPayload {
  entries: [ReviewerEntry, ...ReviewerEntry[]];
  set_digest: string;
}

export type LineageSourceClass =
  | "project_owned"
  | "project_owned_synthetic"
  | "browser_observed"
  | "competitor"
  | "third_party"
  | "nonconforming"
  | "unknown";

export interface LineageNode {
  subject_ref: DigestRef;
  parent_refs: DigestRef[];
  source_class: LineageSourceClass;
  rights_state: "training_permitted" | "blocking_only" | "prohibited" | "unknown";
}

export interface CandidateLineagePayload {
  candidate_ref: DigestRef;
  nodes: [LineageNode, ...LineageNode[]];
  transitive_complete: boolean;
}

export interface AdjudicationPayload {
  review_ref: DigestRef;
  adjudicator_ref: DigestRef;
  disposition: "A" | "B" | "tie" | "unresolved";
  rationale_codes: [string, ...string[]];
  status: "complete" | "invalid" | "revoked";
}

export interface FeedbackQualificationInput {
  record_mode: Task2RecordMode;
  evaluation_at: string;
  producer: ProducerArtifactWitness;
  decision_event: StoredEvent;
  proposal: ProposalRecord;
  decision: DurableContentDecisionRecord;
  decision_boundary: CanonicalContentDecisionBoundary;
  review: EvidenceSnapshot<"pairwise-review", PairwiseReviewPayload>;
  rubric: EvidenceSnapshot<"review-rubric", ReviewRubricPayload>;
  reviewer_set: EvidenceSnapshot<"reviewer-set", ReviewerSetPayload>;
  fact_set: EvidenceSnapshot<"fact-set", StableSetPayload>;
  policy: EvidenceSnapshot<"review-policy", StableSetPayload>;
  task: EvidenceSnapshot<"task", TaskPayload>;
  context: EvidenceSnapshot<"context", ContextPayload>;
  candidate_a: EvidenceSnapshot<"candidate", CandidatePayload>;
  candidate_b: EvidenceSnapshot<"candidate", CandidatePayload>;
  presentation: EvidenceSnapshot<"presentation", PresentationPayload>;
  lineage_a: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  lineage_b: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>;
  adjudication: EvidenceSnapshot<"adjudication", AdjudicationPayload> | null;
}

const SNAPSHOT_KEYS = [
  "contract_version", "snapshot_id", "snapshot_kind", "snapshot_version", "captured_at",
  "verification_mode", "verification_receipt", "source_refs", "payload", "snapshot_digest",
] as const;

function preflightRefArray(value: unknown, minimumLength = 0): void {
  task2PreflightArray(value, minimumLength, task2PreflightDigestRef);
}

function preflightTextArray(value: unknown, minimumLength = 0, exactLength?: number): void {
  task2PreflightArray(value, minimumLength, task2PreflightText, exactLength);
}

export function task2PreflightSnapshot<K extends string, P>(
  value: unknown,
  expectedKind: K,
  preflightPayload: (payload: Record<string, unknown>) => void,
): asserts value is EvidenceSnapshot<K, P> {
  task2AssertExactObject(value, SNAPSHOT_KEYS);
  for (const field of [
    "contract_version", "snapshot_id", "snapshot_kind", "snapshot_version",
    "captured_at", "verification_mode", "snapshot_digest",
  ] as const) task2PreflightText(value[field]);
  task2AssertTimestamp(value.captured_at);
  if (value.snapshot_kind !== expectedKind
    || (value.verification_mode !== "development_fixture"
      && value.verification_mode !== "resolver_verified")) {
    task2FailContract("input_shape");
  }
  if (value.verification_receipt !== null) task2PreflightReceipt(value.verification_receipt);
  preflightRefArray(value.source_refs, 1);
  if (value.payload === null || typeof value.payload !== "object" || Array.isArray(value.payload)) {
    task2FailContract("input_shape");
  }
  preflightPayload(value.payload as Record<string, unknown>);
}

function preflightStableSet(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, ["item_refs", "set_digest", "state"]);
  preflightRefArray(payload.item_refs, 1);
  task2PreflightText(payload.set_digest);
  if (!["current", "superseded", "revoked", "unknown"].includes(payload.state as string)) {
    task2FailContract("input_shape");
  }
}

function preflightContext(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "context_key", "product_area", "journey_state", "channel", "locale", "surface",
    "audience", "content_slot",
  ]);
  for (const value of Object.values(payload)) task2PreflightText(value);
}

function preflightTask(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "task_key", "fact_set_ref", "policy_ref", "context_ref", "requirements_digest",
    "content_slot", "ranking_objective", "candidate_kind",
  ]);
  task2PreflightText(payload.task_key);
  task2PreflightDigestRef(payload.fact_set_ref);
  task2PreflightDigestRef(payload.policy_ref);
  task2PreflightDigestRef(payload.context_ref);
  task2PreflightText(payload.requirements_digest);
  task2PreflightText(payload.content_slot);
  if (payload.ranking_objective !== "expression_preference" || payload.candidate_kind !== "expression") {
    task2FailContract("input_shape");
  }
}

function preflightCandidate(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "task_ref", "context_ref", "content_slot", "author_refs", "expression", "expression_digest",
  ]);
  task2PreflightDigestRef(payload.task_ref);
  task2PreflightDigestRef(payload.context_ref);
  task2PreflightText(payload.content_slot);
  preflightRefArray(payload.author_refs);
  task2PreflightText(payload.expression);
  task2PreflightText(payload.expression_digest);
}

function preflightRubric(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "artifact_ref", "ranking_objective", "candidate_kind", "allowed_outcomes",
    "requires_blinding", "requires_randomization", "requires_rationale", "stable_dimensions", "status",
  ]);
  task2PreflightArtifactRef(payload.artifact_ref);
  task2PreflightText(payload.ranking_objective);
  task2PreflightText(payload.candidate_kind);
  preflightTextArray(payload.allowed_outcomes, 4, 4);
  preflightTextArray(payload.stable_dimensions, 3, 3);
  if (typeof payload.requires_blinding !== "boolean"
    || typeof payload.requires_randomization !== "boolean"
    || typeof payload.requires_rationale !== "boolean") task2FailContract("input_shape");
  task2PreflightText(payload.status);
  if (!["current", "superseded", "revoked"].includes(payload.status)) {
    task2FailContract("input_shape");
  }
}

function preflightReviewerSet(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, ["entries", "set_digest"]);
  task2PreflightArray(payload.entries, 1, (value) => {
    task2AssertExactObject(value, [
      "reviewer_ref", "role", "qualified_objectives", "authorized_scopes",
      "independent_of_candidate_authorship", "independence_evidence_refs", "conflict_state",
      "qualification_status", "effective_at", "expires_at",
    ]);
    task2PreflightDigestRef(value.reviewer_ref);
    task2PreflightText(value.role);
    preflightTextArray(value.qualified_objectives, 1, 1);
    preflightTextArray(value.authorized_scopes, 1);
    if (typeof value.independent_of_candidate_authorship !== "boolean") {
      task2FailContract("input_shape");
    }
    preflightRefArray(value.independence_evidence_refs, 1);
    task2PreflightText(value.conflict_state);
    task2PreflightText(value.qualification_status);
    task2PreflightText(value.effective_at);
    if (value.expires_at !== null) task2PreflightText(value.expires_at);
  });
  task2PreflightText(payload.set_digest);
}

function preflightBlindingProof(value: unknown): void {
  task2AssertExactObject(value, ["status", "reviewer_refs", "hidden_fields", "evidence_refs"]);
  task2PreflightText(value.status);
  if (value.status !== "pass" && value.status !== "fail") task2FailContract("input_shape");
  preflightRefArray(value.reviewer_refs, 1);
  preflightTextArray(value.hidden_fields, 3, 3);
  preflightRefArray(value.evidence_refs, 1);
}

function preflightRandomizationProof(value: unknown): void {
  task2AssertExactObject(value, [
    "status", "algorithm", "seed_commitment_digest", "assignment_digest", "evidence_refs",
  ]);
  for (const field of ["status", "algorithm", "seed_commitment_digest", "assignment_digest"] as const) {
    task2PreflightText(value[field]);
  }
  if ((value.status !== "pass" && value.status !== "fail")
    || value.algorithm !== "sha256-counter-v1") task2FailContract("input_shape");
  preflightRefArray(value.evidence_refs, 1);
}

function preflightPresentation(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "canonical_order",
    "presented_order", "comparison_kind", "original_proposal_side", "blinding_proof",
    "randomization_proof", "fact_set_ref", "policy_ref", "requirements_digest",
  ]);
  for (const field of [
    "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "fact_set_ref", "policy_ref",
  ] as const) task2PreflightDigestRef(payload[field]);
  preflightTextArray(payload.canonical_order, 2, 2);
  preflightTextArray(payload.presented_order, 2, 2);
  task2PreflightText(payload.comparison_kind);
  if (payload.original_proposal_side !== null) task2PreflightText(payload.original_proposal_side);
  preflightBlindingProof(payload.blinding_proof);
  preflightRandomizationProof(payload.randomization_proof);
  task2PreflightText(payload.requirements_digest);
}

function preflightReview(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "decision_ref", "presentation_ref", "reviewer_set_ref", "reviewer_refs", "rubric_ref",
    "outcome", "rationale_codes", "conflict_state", "observed_fact_set_ref",
    "observed_policy_ref", "observed_task_ref", "observed_context_ref", "observed_requirements_digest",
  ]);
  for (const field of [
    "decision_ref", "presentation_ref", "reviewer_set_ref", "observed_fact_set_ref",
    "observed_policy_ref", "observed_task_ref", "observed_context_ref",
  ] as const) task2PreflightDigestRef(payload[field]);
  preflightRefArray(payload.reviewer_refs, 1);
  task2PreflightArtifactRef(payload.rubric_ref);
  task2PreflightText(payload.outcome);
  task2PreflightText(payload.conflict_state);
  if (!["A", "B", "tie", "abstain"].includes(payload.outcome)
    || !["none", "declared", "unresolved"].includes(payload.conflict_state)) {
    task2FailContract("input_shape");
  }
  preflightTextArray(payload.rationale_codes, 1);
  task2PreflightText(payload.observed_requirements_digest);
}

function preflightLineage(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, ["candidate_ref", "nodes", "transitive_complete"]);
  task2PreflightDigestRef(payload.candidate_ref);
  task2PreflightArray(payload.nodes, 1, (value) => {
    task2AssertExactObject(value, ["subject_ref", "parent_refs", "source_class", "rights_state"]);
    task2PreflightDigestRef(value.subject_ref);
    preflightRefArray(value.parent_refs);
    task2PreflightText(value.source_class);
    task2PreflightText(value.rights_state);
  });
  if (typeof payload.transitive_complete !== "boolean") task2FailContract("input_shape");
}

function preflightAdjudication(payload: Record<string, unknown>): void {
  task2AssertExactObject(payload, [
    "review_ref", "adjudicator_ref", "disposition", "rationale_codes", "status",
  ]);
  task2PreflightDigestRef(payload.review_ref);
  task2PreflightDigestRef(payload.adjudicator_ref);
  task2PreflightText(payload.disposition);
  preflightTextArray(payload.rationale_codes, 1);
  task2PreflightText(payload.status);
}

export const task2PreflightTaskPayload = preflightTask;
export const task2PreflightContextPayload = preflightContext;
export const task2PreflightCandidatePayload = preflightCandidate;
export const task2PreflightReviewerSetPayload = preflightReviewerSet;
export const task2PreflightPresentationPayload = preflightPresentation;
export const task2PreflightLineagePayload = preflightLineage;

export function task2PreflightFeedbackQualificationInput(
  value: unknown,
): asserts value is FeedbackQualificationInput {
  task2AssertCanonicalValue(value);
  task2AssertTopLevelShape(value, [
    "record_mode", "evaluation_at", "producer", "decision_event", "proposal", "decision",
    "decision_boundary", "review", "rubric", "reviewer_set", "fact_set", "policy", "task",
    "context", "candidate_a", "candidate_b", "presentation", "lineage_a", "lineage_b", "adjudication",
  ]);
}
const MEMORY_SCOPES: readonly MemoryScope[] = ["task", "personal", "project", "organization", "public"];

function sameTuple(actual: readonly unknown[], expected: readonly unknown[]): boolean {
  return actual.length === expected.length && actual.every((value, index) => value === expected[index]);
}

function validateRefArray(value: unknown, nonempty: boolean): asserts value is DigestRef[] {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) task2FailContract("input_shape");
  for (const ref of value) task2AssertDigestRef(ref);
  task2AssertSortedUnique(value, !nonempty);
}

function validateTextSet(value: unknown, nonempty: boolean): asserts value is string[] {
  if (!Array.isArray(value) || (nonempty && value.length === 0)
    || !value.every((entry) => typeof entry === "string" && entry.length > 0)) {
    task2FailContract("input_shape");
  }
  task2AssertSortedUnique(value, !nonempty);
}

export function task2SnapshotRef<K extends string, P>(
  snapshot: EvidenceSnapshot<K, P>,
): DigestRef {
  return {
    record_id: snapshot.snapshot_id,
    schema_id: `contentmd.task2-${snapshot.snapshot_kind}-snapshot`,
    schema_version: "0.1.0",
    content_digest: snapshot.snapshot_digest,
  };
}

function assertReferenceSchema(ref: DigestRef, expectedSchemaId: string): void {
  if (ref.schema_id !== expectedSchemaId) task2FailContract("schema_id");
}

function snapshotSchemaId(kind: string): string {
  return `contentmd.task2-${kind}-snapshot`;
}

export function task2VerifySnapshotEnvelope<K extends string, P>(
  value: EvidenceSnapshot<K, P>,
  expectedKind: K,
): void {
  task2AssertExactObject(value, SNAPSHOT_KEYS);
  task2AssertTimestamp(value.captured_at);
  if (value.snapshot_kind !== expectedKind) task2FailContract("input_shape");
  if (value.contract_version !== "contentmd.task2-evidence-snapshot/0.1.0"
    || value.snapshot_version !== "0.1.0") {
    task2FailContract("schema_id");
  }
  task2AssertRecordId(value.snapshot_id);
  if (value.verification_mode !== "development_fixture"
    && value.verification_mode !== "resolver_verified") task2FailContract("input_shape");
  task2AssertDigest(value.snapshot_digest);
  const expectedDigest = sha256Canonical({
    contract_version: value.contract_version,
    snapshot_id: value.snapshot_id,
    snapshot_kind: value.snapshot_kind,
    snapshot_version: value.snapshot_version,
    captured_at: value.captured_at,
    source_refs: value.source_refs,
    payload: value.payload,
  });
  if (expectedDigest !== value.snapshot_digest) task2FailContract("snapshot_digest");
  validateRefArray(value.source_refs, true);
  if (value.verification_mode === "development_fixture") {
    if (value.verification_receipt !== null) task2FailContract("receipt_binding");
  } else if (value.verification_mode === "resolver_verified") {
    try {
      task2VerifyReceiptShape(value.verification_receipt);
    } catch (error) {
      if (error instanceof Error && error.message === "task2_contract_invalid:durable_record_digest") {
        task2FailContract("receipt_digest");
      }
      throw error;
    }
    const receipt = value.verification_receipt;
    if (
      receipt.payload.status !== "passed"
      || receipt.payload.transaction_ref !== `evidence-snapshot.${value.snapshot_digest}`
      || receipt.payload.target_path !== `contentmd://task2/evidence-snapshot/${value.snapshot_id}`
      || receipt.payload.expected_digest !== value.snapshot_digest
      || receipt.payload.observed_digest !== value.snapshot_digest
      || receipt.payload.method !== "sha256-canonical-readback"
    ) task2FailContract("receipt_binding");
  }
}

function validateStableSet(snapshot: EvidenceSnapshot<"fact-set" | "review-policy", StableSetPayload>): void {
  task2AssertExactObject(snapshot.payload, ["item_refs", "set_digest", "state"]);
  validateRefArray(snapshot.payload.item_refs, true);
  task2AssertDigest(snapshot.payload.set_digest);
  if (snapshot.payload.set_digest !== sha256Canonical({
    contract_version: "contentmd.task2-stable-set/0.1.0",
    item_refs: snapshot.payload.item_refs,
  })) task2FailContract("digest");
  if (!["current", "superseded", "revoked", "unknown"].includes(snapshot.payload.state)) {
    task2FailContract("input_shape");
  }
}

export function task2ValidateContextSnapshot(snapshot: EvidenceSnapshot<"context", ContextPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "context_key", "product_area", "journey_state", "channel", "locale", "surface", "audience", "content_slot",
  ]);
  for (const value of Object.values(snapshot.payload)) task2AssertText(value);
}

export function task2ValidateTaskSnapshot(snapshot: EvidenceSnapshot<"task", TaskPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "task_key", "fact_set_ref", "policy_ref", "context_ref", "requirements_digest",
    "content_slot", "ranking_objective", "candidate_kind",
  ]);
  task2AssertText(snapshot.payload.task_key);
  task2AssertDigestRef(snapshot.payload.fact_set_ref);
  task2AssertDigestRef(snapshot.payload.policy_ref);
  task2AssertDigestRef(snapshot.payload.context_ref);
  assertReferenceSchema(snapshot.payload.fact_set_ref, snapshotSchemaId("fact-set"));
  assertReferenceSchema(snapshot.payload.policy_ref, snapshotSchemaId("review-policy"));
  assertReferenceSchema(snapshot.payload.context_ref, snapshotSchemaId("context"));
  task2AssertDigest(snapshot.payload.requirements_digest);
  task2AssertText(snapshot.payload.content_slot);
  if (snapshot.payload.ranking_objective !== "expression_preference" || snapshot.payload.candidate_kind !== "expression") {
    task2FailContract("input_shape");
  }
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

export function task2ValidateCandidateSnapshot(snapshot: EvidenceSnapshot<"candidate", CandidatePayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "task_ref", "context_ref", "content_slot", "author_refs", "expression", "expression_digest",
  ]);
  task2AssertDigestRef(snapshot.payload.task_ref);
  task2AssertDigestRef(snapshot.payload.context_ref);
  assertReferenceSchema(snapshot.payload.task_ref, snapshotSchemaId("task"));
  assertReferenceSchema(snapshot.payload.context_ref, snapshotSchemaId("context"));
  task2AssertText(snapshot.payload.content_slot);
  validateRefArray(snapshot.payload.author_refs, false);
  task2AssertText(snapshot.payload.expression);
  task2AssertDigest(snapshot.payload.expression_digest);
  if (sha256Utf8(snapshot.payload.expression) !== snapshot.payload.expression_digest) {
    task2FailContract("expression_digest");
  }
}

function validateRubric(snapshot: EvidenceSnapshot<"review-rubric", ReviewRubricPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "artifact_ref", "ranking_objective", "candidate_kind", "allowed_outcomes",
    "requires_blinding", "requires_randomization", "requires_rationale", "stable_dimensions", "status",
  ]);
  task2AssertArtifactRef(snapshot.payload.artifact_ref);
  if (!sameTuple(snapshot.payload.allowed_outcomes, ["A", "B", "tie", "abstain"])
    || !sameTuple(snapshot.payload.stable_dimensions, ["facts", "requirements", "context"])
    || snapshot.payload.requires_blinding !== true
    || snapshot.payload.requires_randomization !== true
    || snapshot.payload.requires_rationale !== true) task2FailContract("input_shape");
  if (!["current", "superseded", "revoked"].includes(snapshot.payload.status)) task2FailContract("input_shape");
}

export function task2ValidateReviewerSetSnapshot(snapshot: EvidenceSnapshot<"reviewer-set", ReviewerSetPayload>): void {
  task2AssertExactObject(snapshot.payload, ["entries", "set_digest"]);
  if (!Array.isArray(snapshot.payload.entries) || snapshot.payload.entries.length === 0) task2FailContract("input_shape");
  for (const entry of snapshot.payload.entries) {
    task2AssertExactObject(entry, [
      "reviewer_ref", "role", "qualified_objectives", "authorized_scopes",
      "independent_of_candidate_authorship", "independence_evidence_refs", "conflict_state",
      "qualification_status", "effective_at", "expires_at",
    ]);
    task2AssertDigestRef(entry.reviewer_ref);
    if (!["content_reviewer", "content_designer", "subject_matter_expert", "adjudicator"].includes(entry.role)) {
      task2FailContract("input_shape");
    }
    if (!sameTuple(entry.qualified_objectives, ["expression_preference"])) task2FailContract("input_shape");
    if (!Array.isArray(entry.authorized_scopes) || entry.authorized_scopes.length === 0
      || !entry.authorized_scopes.every((scope) => MEMORY_SCOPES.includes(scope))) task2FailContract("input_shape");
    task2AssertSortedUnique(entry.authorized_scopes, false);
    if (typeof entry.independent_of_candidate_authorship !== "boolean") task2FailContract("input_shape");
    validateRefArray(entry.independence_evidence_refs, true);
    if (!["none", "declared", "resolved", "unresolved"].includes(entry.conflict_state)
      || !["current", "expired", "revoked", "unknown"].includes(entry.qualification_status)) {
      task2FailContract("input_shape");
    }
    task2AssertTimestamp(entry.effective_at);
    if (entry.expires_at !== null) task2AssertTimestamp(entry.expires_at);
  }
  task2AssertSortedUnique(snapshot.payload.entries, false);
  if (new Set(snapshot.payload.entries.map((entry) => reviewerIdentity(entry.reviewer_ref))).size
    !== snapshot.payload.entries.length) {
    task2FailContract("set_uniqueness_or_order");
  }
  task2AssertDigest(snapshot.payload.set_digest);
  if (snapshot.payload.set_digest !== sha256Canonical({
    contract_version: "contentmd.task2-reviewer-set/0.1.0",
    entries: snapshot.payload.entries,
  })) task2FailContract("digest");
}

function validateBlindingProof(value: BlindingProof): void {
  task2AssertExactObject(value, ["status", "reviewer_refs", "hidden_fields", "evidence_refs"]);
  if (value.status !== "pass" && value.status !== "fail") task2FailContract("input_shape");
  validateRefArray(value.reviewer_refs, true);
  if (new Set(value.reviewer_refs.map(reviewerIdentity)).size !== value.reviewer_refs.length) {
    task2FailContract("set_uniqueness_or_order");
  }
  if (!sameTuple(value.hidden_fields, ["candidate_identity", "provider_identity", "author_identity"])) {
    task2FailContract("input_shape");
  }
  validateRefArray(value.evidence_refs, true);
}

function validateRandomizationProof(value: RandomizationProof): void {
  task2AssertExactObject(value, [
    "status", "algorithm", "seed_commitment_digest", "assignment_digest", "evidence_refs",
  ]);
  if ((value.status !== "pass" && value.status !== "fail") || value.algorithm !== "sha256-counter-v1") {
    task2FailContract("input_shape");
  }
  task2AssertDigest(value.seed_commitment_digest);
  task2AssertDigest(value.assignment_digest);
  validateRefArray(value.evidence_refs, true);
}

export function task2ValidatePresentationSnapshot(snapshot: EvidenceSnapshot<"presentation", PresentationPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "task_ref", "context_ref", "candidate_a_ref", "candidate_b_ref", "canonical_order",
    "presented_order", "comparison_kind", "original_proposal_side", "blinding_proof",
    "randomization_proof", "fact_set_ref", "policy_ref", "requirements_digest",
  ]);
  for (const ref of [
    snapshot.payload.task_ref, snapshot.payload.context_ref, snapshot.payload.candidate_a_ref,
    snapshot.payload.candidate_b_ref, snapshot.payload.fact_set_ref, snapshot.payload.policy_ref,
  ]) task2AssertDigestRef(ref);
  for (const [ref, kind] of [
    [snapshot.payload.task_ref, "task"],
    [snapshot.payload.context_ref, "context"],
    [snapshot.payload.candidate_a_ref, "candidate"],
    [snapshot.payload.candidate_b_ref, "candidate"],
    [snapshot.payload.fact_set_ref, "fact-set"],
    [snapshot.payload.policy_ref, "review-policy"],
  ] as const) assertReferenceSchema(ref, snapshotSchemaId(kind));
  if (!sameTuple(snapshot.payload.canonical_order, ["A", "B"])
    || !(sameTuple(snapshot.payload.presented_order, ["A", "B"])
      || sameTuple(snapshot.payload.presented_order, ["B", "A"]))) task2FailContract("input_shape");
  if (!["explicit_pairwise", "accepted_edit_vs_original"].includes(snapshot.payload.comparison_kind)) {
    task2FailContract("input_shape");
  }
  if (snapshot.payload.original_proposal_side !== null
    && snapshot.payload.original_proposal_side !== "A" && snapshot.payload.original_proposal_side !== "B") {
    task2FailContract("input_shape");
  }
  validateBlindingProof(snapshot.payload.blinding_proof);
  validateRandomizationProof(snapshot.payload.randomization_proof);
  task2AssertDigest(snapshot.payload.requirements_digest);
}

function validateReview(snapshot: EvidenceSnapshot<"pairwise-review", PairwiseReviewPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "decision_ref", "presentation_ref", "reviewer_set_ref", "reviewer_refs", "rubric_ref",
    "outcome", "rationale_codes", "conflict_state", "observed_fact_set_ref",
    "observed_policy_ref", "observed_task_ref", "observed_context_ref", "observed_requirements_digest",
  ]);
  for (const ref of [
    snapshot.payload.decision_ref, snapshot.payload.presentation_ref, snapshot.payload.reviewer_set_ref,
    snapshot.payload.observed_fact_set_ref, snapshot.payload.observed_policy_ref,
    snapshot.payload.observed_task_ref, snapshot.payload.observed_context_ref,
  ]) task2AssertDigestRef(ref);
  assertReferenceSchema(snapshot.payload.decision_ref, "contentmd.content-decision-record");
  assertReferenceSchema(snapshot.payload.presentation_ref, snapshotSchemaId("presentation"));
  assertReferenceSchema(snapshot.payload.reviewer_set_ref, snapshotSchemaId("reviewer-set"));
  assertReferenceSchema(snapshot.payload.observed_fact_set_ref, snapshotSchemaId("fact-set"));
  assertReferenceSchema(snapshot.payload.observed_policy_ref, snapshotSchemaId("review-policy"));
  assertReferenceSchema(snapshot.payload.observed_task_ref, snapshotSchemaId("task"));
  assertReferenceSchema(snapshot.payload.observed_context_ref, snapshotSchemaId("context"));
  validateRefArray(snapshot.payload.reviewer_refs, true);
  if (new Set(snapshot.payload.reviewer_refs.map(reviewerIdentity)).size
    !== snapshot.payload.reviewer_refs.length) {
    task2FailContract("set_uniqueness_or_order");
  }
  task2AssertArtifactRef(snapshot.payload.rubric_ref);
  if (!["A", "B", "tie", "abstain"].includes(snapshot.payload.outcome)
    || !["none", "declared", "unresolved"].includes(snapshot.payload.conflict_state)) {
    task2FailContract("input_shape");
  }
  validateTextSet(snapshot.payload.rationale_codes, true);
  task2AssertDigest(snapshot.payload.observed_requirements_digest);
}

function lineageKey(ref: DigestRef): string {
  return `${ref.record_id}\u0000${ref.schema_id}\u0000${ref.schema_version}\u0000${ref.content_digest}`;
}

function reviewerIdentity(ref: DigestRef): string {
  return ref.record_id;
}

export function task2ValidateLineageSnapshot(snapshot: EvidenceSnapshot<"candidate-lineage", CandidateLineagePayload>): void {
  task2AssertExactObject(snapshot.payload, ["candidate_ref", "nodes", "transitive_complete"]);
  task2AssertDigestRef(snapshot.payload.candidate_ref);
  assertReferenceSchema(snapshot.payload.candidate_ref, snapshotSchemaId("candidate"));
  if (!Array.isArray(snapshot.payload.nodes) || snapshot.payload.nodes.length === 0
    || typeof snapshot.payload.transitive_complete !== "boolean") task2FailContract("input_shape");
  for (const node of snapshot.payload.nodes) {
    task2AssertExactObject(node, ["subject_ref", "parent_refs", "source_class", "rights_state"]);
    task2AssertDigestRef(node.subject_ref);
    validateRefArray(node.parent_refs, false);
    if (!["project_owned", "project_owned_synthetic", "browser_observed", "competitor", "third_party", "nonconforming", "unknown"].includes(node.source_class)
      || !["training_permitted", "blocking_only", "prohibited", "unknown"].includes(node.rights_state)) {
      task2FailContract("input_shape");
    }
  }
  task2AssertSortedUnique(snapshot.payload.nodes, false);
  const nodes = new Map(snapshot.payload.nodes.map((node) => [lineageKey(node.subject_ref), node]));
  if (nodes.size !== snapshot.payload.nodes.length || !nodes.has(lineageKey(snapshot.payload.candidate_ref))) {
    task2FailContract("lineage_graph");
  }
  for (const node of snapshot.payload.nodes) {
    if (node.parent_refs.some((parent) => !nodes.has(lineageKey(parent)))) task2FailContract("lineage_graph");
  }
  const visiting = new Set<string>();
  const visited = new Set<string>();
  const walk = (key: string): void => {
    if (visiting.has(key)) task2FailContract("lineage_graph");
    if (visited.has(key)) return;
    visiting.add(key);
    for (const parent of nodes.get(key)!.parent_refs) walk(lineageKey(parent));
    visiting.delete(key);
    visited.add(key);
  };
  walk(lineageKey(snapshot.payload.candidate_ref));
  if (visited.size !== nodes.size) task2FailContract("lineage_graph");
}

function validateAdjudication(snapshot: EvidenceSnapshot<"adjudication", AdjudicationPayload>): void {
  task2AssertExactObject(snapshot.payload, [
    "review_ref", "adjudicator_ref", "disposition", "rationale_codes", "status",
  ]);
  task2AssertDigestRef(snapshot.payload.review_ref);
  task2AssertDigestRef(snapshot.payload.adjudicator_ref);
  assertReferenceSchema(snapshot.payload.review_ref, snapshotSchemaId("pairwise-review"));
  if (!["A", "B", "tie", "unresolved"].includes(snapshot.payload.disposition)
    || !["complete", "invalid", "revoked"].includes(snapshot.payload.status)) task2FailContract("input_shape");
  validateTextSet(snapshot.payload.rationale_codes, true);
}

function verifyBoundary(
  boundary: CanonicalContentDecisionBoundary,
  event: StoredEvent,
  decision: DurableContentDecisionRecord,
): void {
  task2AssertExactObject(boundary, [
    "contract_version", "event_id", "event_digest", "decision_ref", "producer_manifest_digest", "boundary_digest",
  ]);
  if (boundary.contract_version !== "contentmd.content-decision-boundary/0.1.0") task2FailContract("schema_id");
  task2AssertRecordId(boundary.event_id);
  task2AssertDigest(boundary.event_digest);
  task2AssertDigestRef(boundary.decision_ref);
  assertReferenceSchema(boundary.decision_ref, "contentmd.content-decision-record");
  task2AssertDigest(boundary.producer_manifest_digest);
  task2AssertDigest(boundary.boundary_digest);
  const { boundary_digest: _boundaryDigest, ...preimage } = boundary;
  if (sha256Canonical(preimage) !== boundary.boundary_digest) task2FailContract("boundary_digest");
  if (boundary.event_id !== event.event_id || boundary.event_digest !== event.event_digest
    || !task2RefsEqual(boundary.decision_ref, task2DigestRef(decision))) {
    task2FailContract("reference_integrity");
  }
}

function verifyDecisionBoundaryInputs(input: FeedbackQualificationInput): void {
  const eventPayload = input.decision_event.payload as unknown as {
    decision_id: string;
    status: string;
    actor_role: string;
    rationale: string;
    proposal_ref: string;
    selected_expression: string | null;
    edited_expression: string | null;
    evidence_reviewed: string[];
    scope: MemoryScope;
    project_id: string;
  };
  const expectedSelection = eventPayload.status === "accepted"
    ? eventPayload.selected_expression
    : eventPayload.status === "edited"
      ? eventPayload.edited_expression
      : null;
  if (
    input.decision.record_id !== eventPayload.decision_id
    || input.decision.payload.proposal_ref !== input.proposal.record_id
    || input.decision.payload.proposal_ref !== eventPayload.proposal_ref
    || input.decision.payload.status !== eventPayload.status
    || input.decision.payload.actor_role !== eventPayload.actor_role
    || input.decision.payload.rationale !== eventPayload.rationale
    || input.decision.payload.selected_expression !== expectedSelection
    || input.decision.payload.decided_at !== input.decision_event.occurred_at
    || sha256Canonical(input.decision.payload.evidence_reviewed)
      !== sha256Canonical(task2SortCanonical(eventPayload.evidence_reviewed))
    || input.decision.scope.memory_scope !== eventPayload.scope
    || input.decision.scope.project_id !== eventPayload.project_id
    || !sameTuple(input.decision.scope.resource_refs, [input.proposal.record_id])
    || !sameTuple(input.decision.scope.data_classes, [input.decision_event.data_class])
    || input.proposal.scope.memory_scope !== eventPayload.scope
    || input.proposal.scope.project_id !== eventPayload.project_id
  ) task2FailContract("reference_integrity");
  const proposalProvenance = input.decision.provenance.filter((entry) =>
    entry.relationship === "decision_subject"
    && entry.record_id === input.proposal.record_id
    && entry.content_digest === input.proposal.content_digest);
  const eventProvenance = input.decision.provenance.filter((entry) =>
    entry.relationship === "decision_event"
    && entry.record_id === input.decision_event.event_id
    && entry.content_digest === input.decision_event.event_digest);
  const producerProvenance = input.decision.provenance.filter((entry) =>
    entry.relationship === "producer_verification");
  if (proposalProvenance.length !== 1 || eventProvenance.length !== 1
    || producerProvenance.length > 1
    || input.decision.provenance.length !== 2 + producerProvenance.length) {
    task2FailContract("reference_integrity");
  }
}

function refSetsEqual(left: readonly DigestRef[], right: readonly DigestRef[]): boolean {
  const leftIds = [...new Set(left.map(reviewerIdentity))].sort();
  const rightIds = [...new Set(right.map(reviewerIdentity))].sort();
  return sameTuple(leftIds, rightIds);
}

export function task2LineageLearningEligible(lineage: CandidateLineagePayload): boolean {
  return lineage.transitive_complete && lineage.nodes.every((node) =>
    (node.source_class === "project_owned" || node.source_class === "project_owned_synthetic")
    && node.rights_state === "training_permitted");
}

export function task2ReviewerIsQualified(
  entry: ReviewerEntry,
  evaluationAt: string,
  scope: MemoryScope,
  authorRefs: readonly DigestRef[],
): boolean {
  return entry.qualification_status === "current"
    && entry.qualified_objectives[0] === "expression_preference"
    && entry.authorized_scopes.includes(scope)
    && entry.independent_of_candidate_authorship
    && entry.independence_evidence_refs.length > 0
    && (entry.conflict_state === "none" || entry.conflict_state === "resolved")
    && task2CompareRfc3339Instants(entry.effective_at, evaluationAt) <= 0
    && (entry.expires_at === null
      || task2CompareRfc3339Instants(evaluationAt, entry.expires_at) < 0)
    && !authorRefs.some((author) => reviewerIdentity(author) === reviewerIdentity(entry.reviewer_ref));
}

function snapshotProvenance<K extends string, P>(
  snapshot: EvidenceSnapshot<K, P>,
  relationship: string,
): ProvenanceRef[] {
  return [
    {
      record_id: snapshot.snapshot_id,
      relationship,
      content_digest: snapshot.snapshot_digest,
    },
    ...task2ReceiptProvenance(snapshot.verification_receipt, `${relationship}_verification`),
  ];
}

function validateAllInputs(input: FeedbackQualificationInput): {
  producer: ReturnType<typeof task2VerifyProducer>;
} {
  task2PreflightFeedbackQualificationInput(input);
  task2PreflightText(input.record_mode);
  if (input.record_mode !== "development_fixture" && input.record_mode !== "official") {
    task2FailContract("input_shape");
  }
  task2PreflightText(input.evaluation_at);
  task2AssertTimestamp(input.evaluation_at);

  task2PreflightProducer(input.producer);
  const producer = task2VerifyProducer(input.producer, "feedback-qualification");

  task2PreflightEvent(input.decision_event);
  task2VerifyEvent(input.decision_event);
  task2PreflightProposal(input.proposal);
  task2VerifyProposal(input.proposal);
  task2PreflightDecision(input.decision);
  task2VerifyDecisionRecord(input.decision);
  task2PreflightBoundary(input.decision_boundary);
  verifyBoundary(input.decision_boundary, input.decision_event, input.decision);
  verifyDecisionBoundaryInputs(input);

  task2PreflightSnapshot(input.review, "pairwise-review", preflightReview);
  task2VerifySnapshotEnvelope(input.review, "pairwise-review");
  validateReview(input.review);

  task2PreflightSnapshot(input.rubric, "review-rubric", preflightRubric);
  task2VerifySnapshotEnvelope(input.rubric, "review-rubric");
  validateRubric(input.rubric);

  task2PreflightSnapshot(input.reviewer_set, "reviewer-set", preflightReviewerSet);
  task2VerifySnapshotEnvelope(input.reviewer_set, "reviewer-set");
  task2ValidateReviewerSetSnapshot(input.reviewer_set);

  task2PreflightSnapshot(input.fact_set, "fact-set", preflightStableSet);
  task2VerifySnapshotEnvelope(input.fact_set, "fact-set");
  validateStableSet(input.fact_set);

  task2PreflightSnapshot(input.policy, "review-policy", preflightStableSet);
  task2VerifySnapshotEnvelope(input.policy, "review-policy");
  validateStableSet(input.policy);

  task2PreflightSnapshot(input.task, "task", preflightTask);
  task2VerifySnapshotEnvelope(input.task, "task");
  task2ValidateTaskSnapshot(input.task);

  task2PreflightSnapshot(input.context, "context", preflightContext);
  task2VerifySnapshotEnvelope(input.context, "context");
  task2ValidateContextSnapshot(input.context);

  task2PreflightSnapshot(input.candidate_a, "candidate", preflightCandidate);
  task2VerifySnapshotEnvelope(input.candidate_a, "candidate");
  task2ValidateCandidateSnapshot(input.candidate_a);

  task2PreflightSnapshot(input.candidate_b, "candidate", preflightCandidate);
  task2VerifySnapshotEnvelope(input.candidate_b, "candidate");
  task2ValidateCandidateSnapshot(input.candidate_b);

  task2PreflightSnapshot(input.presentation, "presentation", preflightPresentation);
  task2VerifySnapshotEnvelope(input.presentation, "presentation");
  task2ValidatePresentationSnapshot(input.presentation);

  task2PreflightSnapshot(input.lineage_a, "candidate-lineage", preflightLineage);
  task2VerifySnapshotEnvelope(input.lineage_a, "candidate-lineage");
  task2ValidateLineageSnapshot(input.lineage_a);

  task2PreflightSnapshot(input.lineage_b, "candidate-lineage", preflightLineage);
  task2VerifySnapshotEnvelope(input.lineage_b, "candidate-lineage");
  task2ValidateLineageSnapshot(input.lineage_b);

  if (input.adjudication !== null) {
    task2PreflightSnapshot(input.adjudication, "adjudication", preflightAdjudication);
    task2VerifySnapshotEnvelope(input.adjudication, "adjudication");
    validateAdjudication(input.adjudication);
  }
  if (input.record_mode === "official") task2FailContract("official_mode_not_supported");
  return { producer };
}

export function qualifyFeedback(input: FeedbackQualificationInput): FeedbackQualificationRecord {
  const { producer } = validateAllInputs(input);
  const decisionRef = task2DigestRef(input.decision);
  const reviewRef = task2SnapshotRef(input.review);
  const rubricRef = task2SnapshotRef(input.rubric);
  const reviewerSetRef = task2SnapshotRef(input.reviewer_set);
  const factSetRef = task2SnapshotRef(input.fact_set);
  const policyRef = task2SnapshotRef(input.policy);
  const taskRef = task2SnapshotRef(input.task);
  const contextRef = task2SnapshotRef(input.context);
  const candidateARef = task2SnapshotRef(input.candidate_a);
  const candidateBRef = task2SnapshotRef(input.candidate_b);
  const presentationRef = task2SnapshotRef(input.presentation);

  const invalidReasons = new Set<string>();
  const notQualifiedReasons = new Set<string>();
  const review = input.review.payload;
  const presentation = input.presentation.payload;
  const task = input.task.payload;
  const candidateA = input.candidate_a.payload;
  const candidateB = input.candidate_b.payload;

  if (
    !task2RefsEqual(review.decision_ref, decisionRef)
    || !task2RefsEqual(review.presentation_ref, presentationRef)
    || !task2RefsEqual(review.reviewer_set_ref, reviewerSetRef)
    || sha256Canonical(review.rubric_ref) !== sha256Canonical(input.rubric.payload.artifact_ref)
    || !task2RefsEqual(presentation.task_ref, taskRef)
    || !task2RefsEqual(presentation.context_ref, contextRef)
    || !task2RefsEqual(presentation.candidate_a_ref, candidateARef)
    || !task2RefsEqual(presentation.candidate_b_ref, candidateBRef)
    || !task2RefsEqual(task.context_ref, contextRef)
    || !task2RefsEqual(candidateA.task_ref, taskRef)
    || !task2RefsEqual(candidateB.task_ref, taskRef)
    || !task2RefsEqual(candidateA.context_ref, contextRef)
    || !task2RefsEqual(candidateB.context_ref, contextRef)
    || candidateA.content_slot !== task.content_slot
    || candidateB.content_slot !== task.content_slot
    || input.context.payload.content_slot !== task.content_slot
    || candidateARef.record_id === candidateBRef.record_id
    || candidateA.expression_digest === candidateB.expression_digest
  ) invalidReasons.add("cross_record_reference_mismatch");

  const factsChanged = !task2RefsEqual(review.observed_fact_set_ref, factSetRef)
    || !task2RefsEqual(presentation.fact_set_ref, factSetRef)
    || !task2RefsEqual(task.fact_set_ref, factSetRef);
  const policyChanged = !task2RefsEqual(review.observed_policy_ref, policyRef)
    || !task2RefsEqual(presentation.policy_ref, policyRef)
    || !task2RefsEqual(task.policy_ref, policyRef);
  const requirementsChanged = review.observed_requirements_digest !== task.requirements_digest
    || presentation.requirements_digest !== task.requirements_digest;
  const contextChanged = !task2RefsEqual(review.observed_task_ref, taskRef)
    || !task2RefsEqual(review.observed_context_ref, contextRef);
  if (factsChanged) invalidReasons.add("facts_changed");
  if (policyChanged) invalidReasons.add("policy_changed");
  if (requirementsChanged) invalidReasons.add("requirements_changed");
  if (contextChanged) invalidReasons.add("context_changed");

  let effectiveOutcome: "A" | "B" | "tie" | "abstain" = review.outcome;
  let derivedConflict: "none" | "declared" | "adjudicated" | "unresolved" = review.conflict_state;
  let adjudicationRef: DigestRef | null = null;
  let adjudicatorRef: DigestRef | null = null;
  if (review.conflict_state === "none") {
    if (input.adjudication !== null) invalidReasons.add("adjudication_invalid");
  } else if (review.conflict_state === "unresolved") {
    invalidReasons.add("conflict_unresolved");
    if (input.adjudication !== null) invalidReasons.add("adjudication_invalid");
  } else if (input.adjudication === null) {
    notQualifiedReasons.add("conflict_requires_adjudication");
  } else {
    const adjudication = input.adjudication.payload;
    adjudicatorRef = adjudication.adjudicator_ref;
    const adjudicatorEntry = input.reviewer_set.payload.entries.find((entry) =>
      reviewerIdentity(entry.reviewer_ref) === reviewerIdentity(adjudication.adjudicator_ref));
    const valid = task2RefsEqual(adjudication.review_ref, reviewRef)
      && adjudication.status === "complete"
      && adjudication.disposition !== "unresolved"
      && adjudicatorEntry?.role === "adjudicator"
      && task2ReviewerIsQualified(
        adjudicatorEntry,
        input.evaluation_at,
        input.decision.scope.memory_scope,
        [...candidateA.author_refs, ...candidateB.author_refs],
      );
    if (!valid) {
      invalidReasons.add("adjudication_invalid");
    } else {
      effectiveOutcome = adjudication.disposition as "A" | "B" | "tie";
      derivedConflict = "adjudicated";
      adjudicationRef = task2SnapshotRef(input.adjudication);
    }
  }

  const participantRefs = task2SortCanonical([...new Map([
    ...review.reviewer_refs,
    ...(adjudicatorRef === null ? [] : [adjudicatorRef]),
  ].map((ref) => [reviewerIdentity(ref), ref] as const)).values()]);
  const reviewerEntryRefs = input.reviewer_set.payload.entries.map((entry) => entry.reviewer_ref);
  const blinded = presentation.blinding_proof.status === "pass"
    && sameTuple(presentation.blinding_proof.hidden_fields, ["candidate_identity", "provider_identity", "author_identity"])
    && refSetsEqual(presentation.blinding_proof.reviewer_refs, participantRefs);
  const expectedAssignmentDigest = sha256Canonical({
    contract_version: "contentmd.task2-presentation-assignment/0.1.0",
    task_ref: presentation.task_ref,
    context_ref: presentation.context_ref,
    candidate_a_ref: presentation.candidate_a_ref,
    candidate_b_ref: presentation.candidate_b_ref,
    canonical_order: presentation.canonical_order,
    presented_order: presentation.presented_order,
    seed_commitment_digest: presentation.randomization_proof.seed_commitment_digest,
  });
  const randomized = presentation.randomization_proof.status === "pass"
    && presentation.randomization_proof.assignment_digest === expectedAssignmentDigest;
  if (!blinded) notQualifiedReasons.add("blinding_required");
  if (!randomized) notQualifiedReasons.add("randomization_required");

  const rubricCurrent = input.rubric.payload.status === "current"
    && input.rubric.payload.ranking_objective === "expression_preference"
    && input.rubric.payload.candidate_kind === "expression"
    && review.rubric_ref.artifact_id === input.rubric.payload.artifact_ref.artifact_id
    && review.rubric_ref.artifact_version === input.rubric.payload.artifact_ref.artifact_version
    && review.rubric_ref.artifact_digest === input.rubric.payload.artifact_ref.artifact_digest;
  if (!rubricCurrent) notQualifiedReasons.add("rubric_not_current_or_mismatched");

  const authorRefs = [...candidateA.author_refs, ...candidateB.author_refs];
  const reviewerSetQualified = refSetsEqual(reviewerEntryRefs, participantRefs)
    && input.reviewer_set.payload.entries.every((entry) => task2ReviewerIsQualified(
      entry,
      input.evaluation_at,
      input.decision.scope.memory_scope,
      authorRefs,
    ));
  if (!reviewerSetQualified) notQualifiedReasons.add("reviewer_set_not_qualified");
  if (!task2RefsEqual(input.lineage_a.payload.candidate_ref, candidateARef)
    || !task2RefsEqual(input.lineage_b.payload.candidate_ref, candidateBRef)) {
    invalidReasons.add("cross_record_reference_mismatch");
  }
  if (!task2LineageLearningEligible(input.lineage_a.payload)
    || !task2LineageLearningEligible(input.lineage_b.payload)) {
    notQualifiedReasons.add("candidate_lineage_not_learning_eligible");
  }
  if (input.fact_set.payload.state !== "current") notQualifiedReasons.add("fact_set_not_current");
  if (input.policy.payload.state !== "current") notQualifiedReasons.add("review_policy_not_current");

  const selectedCandidate = effectiveOutcome === "A" ? candidateA : effectiveOutcome === "B" ? candidateB : null;
  if (effectiveOutcome === "A" || effectiveOutcome === "B") {
    if ((input.decision.payload.status !== "accepted" && input.decision.payload.status !== "edited")
      || input.decision.payload.selected_expression !== selectedCandidate!.expression) {
      invalidReasons.add("decision_outcome_mismatch");
    }
    if (input.decision.payload.status === "accepted"
      && (presentation.comparison_kind !== "explicit_pairwise" || presentation.original_proposal_side !== null)) {
      invalidReasons.add("decision_outcome_mismatch");
    }
    if (input.decision.payload.status === "edited") {
      const expectedOriginalSide = effectiveOutcome === "A" ? "B" : "A";
      const originalExpression = effectiveOutcome === "A" ? candidateB.expression : candidateA.expression;
      if (presentation.comparison_kind !== "accepted_edit_vs_original"
        || presentation.original_proposal_side !== expectedOriginalSide
        || !input.proposal.payload.alternatives.includes(originalExpression)) {
        invalidReasons.add("edited_comparison_invalid");
      }
    }
  } else if (effectiveOutcome === "tie") {
    if (input.decision.payload.status !== "rejected" || input.decision.payload.selected_expression !== null) {
      invalidReasons.add("decision_outcome_mismatch");
    }
  } else if (input.decision.payload.status !== "abstained" || input.decision.payload.selected_expression !== null) {
    invalidReasons.add("decision_outcome_mismatch");
  }

  let qualificationState: "qualified" | "not_qualified" | "abstained" | "invalid";
  let reasonCodes: string[];
  if (invalidReasons.size > 0) {
    qualificationState = "invalid";
    reasonCodes = [...invalidReasons].sort();
  } else if (effectiveOutcome === "abstain") {
    qualificationState = "abstained";
    reasonCodes = ["reviewer_abstained"];
  } else {
    if (effectiveOutcome === "tie") notQualifiedReasons.add("non_decisive_tie");
    if (notQualifiedReasons.size > 0) {
      qualificationState = "not_qualified";
      reasonCodes = [...notQualifiedReasons].sort();
    } else {
      qualificationState = "qualified";
      reasonCodes = ["qualified_decisive_review"];
    }
  }

  const derivedOutputScope: RecordScope = {
    memory_scope: input.decision.scope.memory_scope,
    project_id: input.decision.scope.project_id,
    resource_refs: [...input.decision.scope.resource_refs],
    data_classes: [...input.decision.scope.data_classes],
  };
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.feedback-qualification-input/0.1.0",
    record_mode: input.record_mode,
    evaluation_at: input.evaluation_at,
    derived_output_scope: derivedOutputScope,
    producer: input.producer,
    decision_event: input.decision_event,
    proposal: input.proposal,
    decision: input.decision,
    decision_boundary: input.decision_boundary,
    evidence: {
      review: input.review,
      rubric: input.rubric,
      reviewer_set: input.reviewer_set,
      fact_set: input.fact_set,
      policy: input.policy,
      task: input.task,
      context: input.context,
      candidate_a: input.candidate_a,
      candidate_b: input.candidate_b,
      presentation: input.presentation,
      lineage_a: input.lineage_a,
      lineage_b: input.lineage_b,
      adjudication: input.adjudication,
    },
  });
  const provenance = task2SortProvenance([
    { record_id: input.proposal.record_id, relationship: "proposal", content_digest: input.proposal.content_digest },
    { record_id: input.decision_event.event_id, relationship: "decision_event", content_digest: input.decision_event.event_digest },
    {
      record_id: `content-decision-boundary.${input.decision_boundary.boundary_digest}`,
      relationship: "decision_boundary",
      content_digest: input.decision_boundary.boundary_digest,
    },
    { record_id: input.decision.record_id, relationship: "decision", content_digest: input.decision.content_digest },
    ...snapshotProvenance(input.review, "pairwise_review"),
    ...snapshotProvenance(input.rubric, "review_rubric"),
    ...snapshotProvenance(input.reviewer_set, "reviewer_set"),
    ...snapshotProvenance(input.fact_set, "fact_set"),
    ...snapshotProvenance(input.policy, "review_policy"),
    ...snapshotProvenance(input.task, "task"),
    ...snapshotProvenance(input.context, "context"),
    ...snapshotProvenance(input.candidate_a, "candidate_a"),
    ...snapshotProvenance(input.candidate_b, "candidate_b"),
    ...snapshotProvenance(input.presentation, "presentation"),
    ...snapshotProvenance(input.lineage_a, "lineage_a"),
    ...snapshotProvenance(input.lineage_b, "lineage_b"),
    ...(input.adjudication === null ? [] : snapshotProvenance(input.adjudication, "adjudication")),
    ...task2ReceiptProvenance(producer.verification_receipt, "producer_verification"),
  ]);
  return finalizeRecord({
    record_id: `feedback-qualification.${inputDigest}`,
    schema_id: LEARNING_SCHEMA_IDS.feedbackQualification,
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
      decision_ref: decisionRef,
      rubric_ref: input.rubric.payload.artifact_ref,
      reviewer_qualification_ref: reviewerSetRef,
      fact_set_ref: factSetRef,
      policy_ref: policyRef,
      task_ref: taskRef,
      context_ref: contextRef,
      candidate_a_ref: candidateARef,
      candidate_b_ref: candidateBRef,
      presentation_ref: presentationRef,
      blinded,
      randomized,
      rationale_codes: [...review.rationale_codes] as [string, ...string[]],
      outcome: effectiveOutcome,
      conflict_state: derivedConflict,
      adjudication_ref: adjudicationRef,
      facts_changed: factsChanged,
      requirements_changed: requirementsChanged,
      context_changed: contextChanged,
      qualification_state: qualificationState,
      reason_codes: reasonCodes,
    },
  }) as FeedbackQualificationRecord;
}
