import {
  applyFilesystemChange,
  previewFilesystemChange,
  rollbackFilesystemChange,
  verifyFilesystemChange,
  type ChangeAuthorization,
  type FilesystemApplyReceipt,
  type FilesystemVerificationReceipt,
  type PreparedChangeTransaction,
  type FilesystemRollbackReceipt,
} from "@contentmd/adapter-filesystem";
import { sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  type AuthorizationDecision,
  type AuthorizationInput,
} from "@contentmd/governance";
import type { ContentDecisionRecord } from "@contentmd/learning";
import { compileProjectModel } from "./model-workflow.js";
import type { PreparedContentTask, ReviewedIdeCandidate } from "./task-workflow.js";

export interface GovernedChangeInput {
  project_root: string;
  transaction: PreparedChangeTransaction;
  authorization_input: AuthorizationInput;
}

export interface GovernedChangeResult {
  authorization: AuthorizationDecision;
  apply_receipt: FilesystemApplyReceipt;
  verification_receipt: FilesystemVerificationReceipt;
}

export interface GovernedTaskChangeInput {
  project_root: string;
  transaction_id: string;
  prepared: PreparedContentTask;
  review: ReviewedIdeCandidate;
  decision: ContentDecisionRecord;
}

export interface GovernedTaskVerificationResult extends FilesystemVerificationReceipt {
  task_digest: string;
  candidate_digest: string;
  target_occurrence_id: string;
  parsed_occurrence: {
    occurrence_id: string;
    source_artifact: string;
    line: number;
    column: number;
    expression_payload: string;
  };
  task_verification_digest: string;
}

function taskBindingFailure(reason: string): never {
  throw new Error(`task_change_binding_invalid:${reason}`);
}

function selectedExpression(decision: ContentDecisionRecord): string {
  if (decision.status === "accepted" && decision.selected_expression !== null) {
    return decision.selected_expression;
  }
  if (decision.status === "edited" && decision.edited_expression !== null) {
    return decision.edited_expression;
  }
  return taskBindingFailure("decision_status");
}

export function assertGovernedTaskChangeBinding(
  prepared: PreparedContentTask,
  review: ReviewedIdeCandidate,
  decision: ContentDecisionRecord,
  transaction?: PreparedChangeTransaction,
): void {
  const occurrence = prepared.target_occurrence;
  const diff = review.preview_diff;
  if (
    prepared.authority_effect !== "none" || prepared.decision_status !== "proposed" ||
    prepared.task.authority_effect !== "none" || review.authority_effect !== "none" ||
    review.decision_status !== "proposed"
  ) taskBindingFailure("authority");
  if (review.task_digest !== prepared.task.task_digest) taskBindingFailure("task_digest");
  if (!prepared.task.target_occurrence_refs.includes(occurrence.occurrence_id)) {
    taskBindingFailure("target_occurrence");
  }
  if (
    diff === null || diff.source_artifact !== occurrence.source_artifact ||
    diff.line !== occurrence.line || diff.column !== occurrence.column ||
    diff.before !== occurrence.expression_payload
  ) taskBindingFailure("preview_target");
  if (decision.project_id !== prepared.project_id) taskBindingFailure("decision_project");
  if (decision.proposal_ref !== review.candidate_digest) taskBindingFailure("decision_candidate");
  if (selectedExpression(decision) !== diff.after) taskBindingFailure("decision_expression");
  if (
    !decision.evidence_reviewed.includes(prepared.task.task_digest) ||
    !decision.evidence_reviewed.includes(occurrence.occurrence_id)
  ) taskBindingFailure("decision_evidence");
  if (decision.mutation_approval_effect !== "none") taskBindingFailure("decision_authority");
  if (transaction !== undefined && (
    transaction.operation_id !== `operation.task.${prepared.task.task_digest.slice(0, 24)}` ||
    transaction.proposal_id !== `candidate.${review.candidate_digest}` ||
    transaction.decision_id !== decision.decision_id ||
    transaction.verification_id !== `verify.${occurrence.occurrence_id}.${review.candidate_digest.slice(0, 12)}` ||
    transaction.target_path !== diff.source_artifact || transaction.line !== diff.line ||
    transaction.column !== diff.column || transaction.before !== diff.before || transaction.after !== diff.after
  )) taskBindingFailure("transaction");
}

export async function previewGovernedTaskChange(
  input: GovernedTaskChangeInput,
): Promise<PreparedChangeTransaction> {
  if (!/^[A-Za-z0-9._-]+$/u.test(input.transaction_id)) taskBindingFailure("transaction_id");
  assertGovernedTaskChangeBinding(input.prepared, input.review, input.decision);
  const diff = input.review.preview_diff!;
  const occurrence = input.prepared.target_occurrence;
  const transaction = await previewFilesystemChange({
    project_root: input.project_root,
    operation_id: `operation.task.${input.prepared.task.task_digest.slice(0, 24)}`,
    transaction_id: input.transaction_id,
    proposal_id: `candidate.${input.review.candidate_digest}`,
    decision_id: input.decision.decision_id,
    approval_id: `apr.task.${input.review.candidate_digest.slice(0, 24)}`,
    verification_id: `verify.${occurrence.occurrence_id}.${input.review.candidate_digest.slice(0, 12)}`,
    target_path: diff.source_artifact,
    additional_target_paths: [],
    line: diff.line,
    column: diff.column,
    before: diff.before,
    after: diff.after,
  });
  assertGovernedTaskChangeBinding(input.prepared, input.review, input.decision, transaction);
  return transaction;
}

export async function verifyGovernedTaskReadback(input: GovernedTaskChangeInput & {
  transaction: PreparedChangeTransaction;
  apply_receipt: FilesystemApplyReceipt;
}): Promise<GovernedTaskVerificationResult> {
  assertGovernedTaskChangeBinding(input.prepared, input.review, input.decision, input.transaction);
  const receipt = await verifyFilesystemChange({
    project_root: input.project_root,
    transaction: input.transaction,
    apply_receipt: input.apply_receipt,
  });
  const model = await compileProjectModel({ project_root: input.project_root });
  const matches = model.discovery.occurrences.filter((occurrence) => (
    occurrence.source_artifact === input.transaction.target_path &&
    occurrence.line === input.transaction.line && occurrence.column === input.transaction.column &&
    occurrence.expression_payload === input.transaction.after
  ));
  if (matches.length !== 1) throw new Error("task_change_readback_not_reparsed");
  const parsed = matches[0]!;
  const preimage = {
    ...receipt,
    task_digest: input.prepared.task.task_digest,
    candidate_digest: input.review.candidate_digest,
    target_occurrence_id: input.prepared.target_occurrence.occurrence_id,
    parsed_occurrence: {
      occurrence_id: parsed.occurrence_id,
      source_artifact: parsed.source_artifact,
      line: parsed.line,
      column: parsed.column,
      expression_payload: parsed.expression_payload,
    },
  };
  return { ...preimage, task_verification_digest: sha256Canonical(preimage) };
}

function handoff(
  input: AuthorizationInput,
  decision: AuthorizationDecision,
  transaction: PreparedChangeTransaction,
  action: "filesystem.write" | "filesystem.rollback" = "filesystem.write",
): ChangeAuthorization {
  const approval = input.approval;
  if (approval === null) throw new Error("change_not_authorized:approval_missing");
  if (input.request.action !== action) {
    throw new Error("change_not_authorized:action_mismatch");
  }
  return {
    operation_id: input.request.operation_id,
    action,
    disposition: decision.disposition,
    approval_id: approval.approval_id,
    approval_class: approval.approval_class,
    approval_status: approval.status,
    approval_revocation_state: approval.revocation_state,
    approval_expires_at: approval.expires_at,
    checked_at: input.now,
    subject_digest: input.request.subject_digest ?? "",
    verification_plan_ref: input.verification_plan_ref,
  };
}

export interface GovernedRollbackInput {
  project_root: string;
  transaction: PreparedChangeTransaction;
  apply_receipt: FilesystemApplyReceipt;
  authorization_input: AuthorizationInput;
}

export interface GovernedRollbackResult {
  authorization: AuthorizationDecision;
  rollback_receipt: FilesystemRollbackReceipt;
}

export async function executeGovernedChange(
  input: GovernedChangeInput,
): Promise<GovernedChangeResult> {
  if (
    input.authorization_input.request.subject_digest !== input.transaction.transaction_digest ||
    input.authorization_input.request.resource_scope.length !== 1 ||
    input.authorization_input.request.resource_scope[0] !== input.transaction.target_path
  ) {
    throw new Error("change_not_authorized:transaction_scope_mismatch");
  }
  const authorization = authorizeOperation(input.authorization_input);
  if (authorization.disposition !== "allow") {
    throw new Error(`change_not_authorized:${authorization.reason_codes.join(",")}`);
  }
  const applyReceipt = await applyFilesystemChange({
    project_root: input.project_root,
    transaction: input.transaction,
    authorization: handoff(input.authorization_input, authorization, input.transaction),
  });
  const verificationReceipt = await verifyFilesystemChange({
    project_root: input.project_root,
    transaction: input.transaction,
    apply_receipt: applyReceipt,
  });
  return {
    authorization,
    apply_receipt: applyReceipt,
    verification_receipt: verificationReceipt,
  };
}

export async function executeGovernedRollback(
  input: GovernedRollbackInput,
): Promise<GovernedRollbackResult> {
  if (
    input.authorization_input.request.subject_digest !== input.transaction.transaction_digest ||
    input.authorization_input.request.resource_scope.length !== 1 ||
    input.authorization_input.request.resource_scope[0] !== input.transaction.target_path
  ) {
    throw new Error("change_not_authorized:transaction_scope_mismatch");
  }
  const authorization = authorizeOperation(input.authorization_input);
  if (authorization.disposition !== "allow") {
    throw new Error(`change_not_authorized:${authorization.reason_codes.join(",")}`);
  }
  const rollbackReceipt = await rollbackFilesystemChange({
    project_root: input.project_root,
    transaction: input.transaction,
    apply_receipt: input.apply_receipt,
    authorization: handoff(input.authorization_input, authorization, input.transaction, "filesystem.rollback"),
  });
  return { authorization, rollback_receipt: rollbackReceipt };
}
