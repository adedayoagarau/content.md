import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  reviewContent,
  type ContentFinding,
  type ReviewInput,
  type ReviewReport,
} from "@contentmd/evaluation";
import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  createContentTaskPacket,
  type ContentTaskPacket,
} from "./task-packet.js";

export interface QualifyReviewFindingForPromptInput {
  project_id: string;
  task: ContentTaskPacket;
  review_input: ReviewInput;
  review_report: ReviewReport;
  finding_id: string;
}

export interface ReviewFindingPromptContextContent {
  contract_version: "contentmd.review-finding-prompt-context/0.1.0";
  project_id: string;
  task_id: string;
  task_digest: string;
  review_input_digest: string;
  report_ref: ModelObjectRef;
  finding_ref: ModelObjectRef;
  rule_id: string;
  rule_version: "0.1.0";
  severity: ContentFinding["severity"];
  outcome_class: ContentFinding["outcome_class"];
  dimension: string;
  occurrence_refs: string[];
  evidence_refs: string[];
  rationale: string;
  uncertainty: ContentFinding["uncertainty"];
  suggested_next_action: string;
  automatic_rewrite_allowed: false;
  raw_expression_included: false;
  authority_effect: "none";
  qualification_digest: string;
  verification_digest: string;
  context_digest: string;
}

export interface ReviewFindingPromptContextVerification {
  contract_version: "contentmd.review-finding-prompt-context-verification/0.1.0";
  qualification_input: QualifyReviewFindingForPromptInput;
  verification_digest: string;
}

export interface ReviewFindingPromptContextItem {
  source_ref: ModelObjectRef;
  data_class: "review_finding";
  content: ReviewFindingPromptContextContent;
  verification: ReviewFindingPromptContextVerification;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const PAYMENT_FACT_STATES = new Set([
  "unknown_possible",
  "failure_confirmed",
  "not_established",
]);
const DELETE_FACT_STATES = new Set([
  "local_only",
  "cancels_provider_attempt",
  "not_established",
]);

function invalid(reason: string): never {
  throw new TypeError(`review_finding_prompt_context_invalid:${reason}`);
}

function forbidden(reason: string): never {
  throw new TypeError(`prompt_context_forbidden:${reason}`);
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

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
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

function exactKeys(value: object, expected: readonly string[]): void {
  const actual = Object.keys(value).sort(compareUtf8);
  const wanted = [...expected].sort(compareUtf8);
  if (canonicalJson(actual) !== canonicalJson(wanted)) invalid("input_shape");
}

function canonicalStrings(value: unknown, field: string, allowEmpty = false): string[] {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) invalid(field);
  for (const item of value) text(item, field);
  const sorted = [...value].sort(compareUtf8);
  if (new Set(value).size !== value.length || canonicalJson(value) !== canonicalJson(sorted)) {
    invalid(field);
  }
  return value;
}

function taskInput(task: ContentTaskPacket) {
  return {
    task_id: task.task_id,
    target_occurrence_refs: task.target_occurrence_refs,
    voice_profile_refs: task.voice_profile_refs,
    terminology_refs: task.terminology_refs,
    decision_status: task.decision_status,
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
  };
}

function verifyTask(task: ContentTaskPacket): void {
  let replayed: ContentTaskPacket;
  try {
    replayed = createContentTaskPacket(taskInput(task));
  } catch {
    invalid("task");
  }
  if (canonicalJson(replayed) !== canonicalJson(task)) invalid("task");
}

function verifyReviewInput(input: ReviewInput, task: ContentTaskPacket, projectId: string): void {
  exactKeys(input, ["project_id", "occurrences", "evidence_refs", "product_facts"]);
  text(input.project_id, "review_input.project_id");
  if (input.project_id !== projectId) invalid("project_scope");
  canonicalStrings(input.evidence_refs, "review_input.evidence_refs");
  if (input.evidence_refs.some((ref) => !task.evidence_refs.includes(ref))) {
    invalid("task_evidence");
  }
  exactKeys(input.product_facts, [
    "payment_outcome_after_submission",
    "workspace_delete_effect",
  ]);
  if (!PAYMENT_FACT_STATES.has(input.product_facts.payment_outcome_after_submission)
    || !DELETE_FACT_STATES.has(input.product_facts.workspace_delete_effect)) {
    invalid("product_facts");
  }
  if (!Array.isArray(input.occurrences) || input.occurrences.length === 0) {
    invalid("review_input.occurrences");
  }
  const ids: string[] = [];
  for (const occurrence of input.occurrences) {
    exactKeys(occurrence, [
      "occurrence_id", "source_artifact", "line", "column", "syntax_kind",
      "expression_payload", "locale", "channel", "modality", "component", "route",
      "semantic_context",
    ]);
    for (const field of [
      "occurrence_id", "source_artifact", "syntax_kind", "expression_payload", "locale",
      "channel", "modality", "semantic_context",
    ] as const) text(occurrence[field], `review_input.occurrences.${field}`);
    for (const field of ["component", "route"] as const) {
      if (occurrence[field] !== null) text(occurrence[field], `review_input.occurrences.${field}`);
    }
    if (!Number.isSafeInteger(occurrence.line) || occurrence.line < 1
      || !Number.isSafeInteger(occurrence.column) || occurrence.column < 1) {
      invalid("review_input.occurrences.position");
    }
    if (occurrence.locale !== task.locale || occurrence.channel !== task.channel) {
      invalid("task_scope");
    }
    ids.push(occurrence.occurrence_id);
  }
  const sortedIds = [...ids].sort(compareUtf8);
  if (new Set(ids).size !== ids.length || canonicalJson(ids) !== canonicalJson(sortedIds)) {
    invalid("review_input.occurrences");
  }
}

function findingRef(finding: ContentFinding): ModelObjectRef {
  return {
    record_id: finding.finding_id,
    schema_id: "contentmd.content-finding",
    schema_version: finding.rule_version,
    content_digest: sha256Canonical(finding),
  };
}

function reportRef(report: ReviewReport): ModelObjectRef {
  return {
    record_id: report.report_id,
    schema_id: "contentmd.review-report",
    schema_version: "0.1.0",
    content_digest: sha256Canonical(report),
  };
}

function qualify(input: QualifyReviewFindingForPromptInput): {
  finding: ContentFinding;
  report_ref: ModelObjectRef;
  finding_ref: ModelObjectRef;
  qualification_digest: string;
} {
  assertPlainDataGraph(input);
  exactKeys(input, ["project_id", "task", "review_input", "review_report", "finding_id"]);
  text(input.project_id, "project_id");
  text(input.finding_id, "finding_id");
  verifyTask(input.task);
  verifyReviewInput(input.review_input, input.task, input.project_id);
  let replayed: ReviewReport;
  try {
    replayed = reviewContent(input.review_input);
  } catch {
    invalid("review_replay");
  }
  if (canonicalJson(replayed) !== canonicalJson(input.review_report)) invalid("review_replay");
  if (input.review_report.project_id !== input.project_id) invalid("project_scope");
  const finding = input.review_report.findings.find((candidate) => (
    candidate.finding_id === input.finding_id
  ));
  if (finding === undefined) invalid("finding_membership");
  if (finding.automatic_rewrite_allowed) invalid("automatic_rewrite_forbidden");
  const knownOccurrences = new Set(input.review_input.occurrences.map((item) => item.occurrence_id));
  if (finding.occurrence_refs.some((ref) => !knownOccurrences.has(ref))) {
    invalid("occurrence_binding");
  }
  const selectedFindingRef = findingRef(finding);
  const selectedReportRef = reportRef(input.review_report);
  const qualificationDigest = sha256Canonical({
    contract_version: "contentmd.review-finding-prompt-qualification/0.1.0",
    project_id: input.project_id,
    task_id: input.task.task_id,
    task_digest: input.task.task_digest,
    review_input_digest: input.review_report.input_digest,
    report_ref: selectedReportRef,
    finding_ref: selectedFindingRef,
  });
  return {
    finding,
    report_ref: selectedReportRef,
    finding_ref: selectedFindingRef,
    qualification_digest: qualificationDigest,
  };
}

export function createReviewFindingPromptContext(
  input: QualifyReviewFindingForPromptInput,
): ReviewFindingPromptContextItem {
  const canonicalInput = canonicalClone(input);
  const qualified = qualify(canonicalInput);
  const contentWithoutVerification = {
    contract_version: "contentmd.review-finding-prompt-context/0.1.0" as const,
    project_id: canonicalInput.project_id,
    task_id: canonicalInput.task.task_id,
    task_digest: canonicalInput.task.task_digest,
    review_input_digest: canonicalInput.review_report.input_digest,
    report_ref: qualified.report_ref,
    finding_ref: qualified.finding_ref,
    rule_id: qualified.finding.rule_id,
    rule_version: qualified.finding.rule_version,
    severity: qualified.finding.severity,
    outcome_class: qualified.finding.outcome_class,
    dimension: qualified.finding.dimension,
    occurrence_refs: [...qualified.finding.occurrence_refs],
    evidence_refs: [...qualified.finding.evidence_refs],
    rationale: qualified.finding.rationale,
    uncertainty: qualified.finding.uncertainty,
    suggested_next_action: qualified.finding.suggested_next_action,
    automatic_rewrite_allowed: false as const,
    raw_expression_included: false as const,
    authority_effect: "none" as const,
    qualification_digest: qualified.qualification_digest,
  };
  const verificationDigest = sha256Canonical({
    contract_version: "contentmd.review-finding-prompt-verification/0.1.0",
    qualification_input: canonicalInput,
    qualified_content: contentWithoutVerification,
  });
  const contentWithoutDigest = {
    ...contentWithoutVerification,
    verification_digest: verificationDigest,
  };
  return deepFreeze({
    source_ref: canonicalClone(qualified.finding_ref),
    data_class: "review_finding" as const,
    content: {
      ...contentWithoutDigest,
      context_digest: sha256Canonical(contentWithoutDigest),
    },
    verification: {
      contract_version: "contentmd.review-finding-prompt-context-verification/0.1.0" as const,
      qualification_input: canonicalInput,
      verification_digest: verificationDigest,
    },
  });
}

export function verifyAndProjectReviewFindingPromptContext(
  value: ReviewFindingPromptContextItem,
): Omit<ReviewFindingPromptContextItem, "verification"> {
  assertPlainDataGraph(value);
  if (value.data_class !== "review_finding"
    || value.verification.contract_version
      !== "contentmd.review-finding-prompt-context-verification/0.1.0"
    || !DIGEST.test(value.verification.verification_digest)) {
    forbidden("review_finding_unverified");
  }
  let replayed: ReviewFindingPromptContextItem;
  try {
    replayed = createReviewFindingPromptContext(value.verification.qualification_input);
  } catch {
    forbidden("review_finding_unverified");
  }
  if (canonicalJson(replayed.source_ref) !== canonicalJson(value.source_ref)
    || canonicalJson(replayed.content) !== canonicalJson(value.content)
    || replayed.verification.verification_digest !== value.verification.verification_digest) {
    forbidden("review_finding_replay_mismatch");
  }
  return deepFreeze(canonicalClone({
    source_ref: replayed.source_ref,
    data_class: replayed.data_class,
    content: replayed.content,
  }));
}

export function assertReviewFindingPromptBinding(
  value: Omit<ReviewFindingPromptContextItem, "verification">,
  task: ContentTaskPacket,
  projectId: string,
): void {
  if (value.content.project_id !== projectId) forbidden("review_finding_scope");
  if (value.content.task_id !== task.task_id || value.content.task_digest !== task.task_digest) {
    forbidden("review_finding_task_binding");
  }
  if (value.source_ref.record_id !== value.content.finding_ref.record_id
    || value.source_ref.content_digest !== value.content.finding_ref.content_digest
    || !DIGEST.test(value.content.context_digest)
    || !DIGEST.test(value.content.verification_digest)) {
    forbidden("review_finding_replay_mismatch");
  }
}
