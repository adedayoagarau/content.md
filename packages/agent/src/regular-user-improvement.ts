import { mkdir, open, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import {
  applyFilesystemChange,
  previewFilesystemChange,
  rollbackFilesystemChange,
  type ChangeAuthorization,
  type FilesystemApplyReceipt,
  type PreparedChangeTransaction,
} from "@contentmd/adapter-filesystem";
import {
  canonicalJson,
  compareContentImprovement,
  type ContentImprovementBrief,
  type ContentImprovementComparison,
  type ContentReviewFinding,
  type QualifiedContentUnit,
  type UserSuppliedImprovementContext,
} from "@contentmd/core";

export interface RegularUserPatchPreview {
  target_path: string;
  line: number;
  column: number;
  before: string;
  after: string;
  before_digest: string;
  after_digest: string;
  unified_diff: string;
  transaction_digest: string;
  mutation_status: "previewed_not_applied";
  authority_effect: "none";
}

export interface RegularUserChangeRecord {
  contract_version: "contentmd.regular-user-change/0.1.0";
  transaction: PreparedChangeTransaction;
  apply_receipt: FilesystemApplyReceipt;
  confirmation: "explicit_local_user_confirmation";
  undo_status: "available" | "completed";
  authority_effect: "local_source_mutation_only";
}

function regularUserAuthorization(
  transaction: PreparedChangeTransaction,
  action: "filesystem.write" | "filesystem.rollback",
): ChangeAuthorization {
  return {
    operation_id: transaction.operation_id,
    action,
    disposition: "allow",
    approval_id: transaction.approval_id,
    approval_class: "mutation",
    approval_status: "issued",
    approval_revocation_state: "current",
    approval_expires_at: null,
    checked_at: new Date().toISOString(),
    subject_digest: transaction.transaction_digest,
    verification_plan_ref: transaction.verification_id,
  };
}

function changeRecordPath(projectRoot: string, digest: string): string {
  if (!/^[a-f0-9]{64}$/u.test(digest)) throw new Error("regular_user_change_digest_invalid");
  return join(resolve(projectRoot), ".contentmd", "regular-user-changes", `${digest}.json`);
}

async function writeRecord(path: string, record: RegularUserChangeRecord): Promise<void> {
  await mkdir(dirname(path), { recursive: true, mode: 0o700 });
  const handle = await open(path, "wx", 0o600);
  try {
    await handle.writeFile(`${canonicalJson(record)}\n`, "utf8");
    await handle.sync();
  } finally {
    await handle.close();
  }
}

async function preparedTransaction(input: {
  project_root: string;
  comparison: ContentImprovementComparison;
  unit: QualifiedContentUnit;
}): Promise<PreparedChangeTransaction> {
  if (input.unit.line === null || input.unit.column === null) throw new Error("improvement_source_coordinates_missing");
  if (input.unit.syntax_kind === "jsx_composition") throw new Error("improvement_composition_patch_unsupported");
  return previewFilesystemChange({
    project_root: input.project_root,
    operation_id: `operation.regular-user.${input.comparison.comparison_id.slice(-24)}`,
    transaction_id: `regular-user.${input.comparison.comparison_id.slice(-24)}`,
    proposal_id: input.comparison.comparison_id,
    decision_id: "decision.local-user-confirmation",
    approval_id: "approval.local-user-confirmation",
    verification_id: `verify.${input.comparison.comparison_id.slice(-24)}`,
    target_path: input.unit.source_artifact,
    additional_target_paths: [],
    line: input.unit.line,
    column: input.unit.column,
    before: input.unit.expression,
    after: input.comparison.candidate_expression,
  });
}

export async function previewRegularUserImprovement(input: {
  project_root: string;
  finding: ContentReviewFinding;
  unit: QualifiedContentUnit;
  brief: ContentImprovementBrief;
  context: UserSuppliedImprovementContext;
  candidate_expression: string;
  include_patch: boolean;
}): Promise<{ comparison: ContentImprovementComparison; patch_preview: RegularUserPatchPreview | null }> {
  const comparison = compareContentImprovement(input.brief, input.finding, input.context, input.candidate_expression);
  if (!input.include_patch || comparison.status !== "ready_for_patch_preview") {
    return { comparison, patch_preview: null };
  }
  const transaction = await preparedTransaction({ project_root: input.project_root, comparison, unit: input.unit });
  return {
    comparison,
    patch_preview: {
      target_path: transaction.target_path,
      line: transaction.line,
      column: transaction.column,
      before: transaction.before,
      after: transaction.after,
      before_digest: transaction.before_digest,
      after_digest: transaction.after_digest,
      unified_diff: transaction.unified_diff,
      transaction_digest: transaction.transaction_digest,
      mutation_status: transaction.mutation_status,
      authority_effect: transaction.authority_effect,
    },
  };
}

export async function applyRegularUserImprovement(input: {
  project_root: string;
  finding: ContentReviewFinding;
  unit: QualifiedContentUnit;
  brief: ContentImprovementBrief;
  context: UserSuppliedImprovementContext;
  candidate_expression: string;
  expected_transaction_digest: string;
  confirmed: boolean;
}): Promise<{ comparison: ContentImprovementComparison; record: RegularUserChangeRecord; record_path: string }> {
  if (!input.confirmed) throw new Error("regular_user_change_confirmation_required");
  const comparison = compareContentImprovement(input.brief, input.finding, input.context, input.candidate_expression);
  if (comparison.status !== "ready_for_patch_preview") throw new Error("regular_user_change_not_ready");
  const transaction = await preparedTransaction({ project_root: input.project_root, comparison, unit: input.unit });
  if (transaction.transaction_digest !== input.expected_transaction_digest) {
    throw new Error("regular_user_change_digest_mismatch");
  }
  const applyReceipt = await applyFilesystemChange({
    project_root: input.project_root,
    transaction,
    authorization: regularUserAuthorization(transaction, "filesystem.write"),
  });
  const record: RegularUserChangeRecord = {
    contract_version: "contentmd.regular-user-change/0.1.0",
    transaction,
    apply_receipt: applyReceipt,
    confirmation: "explicit_local_user_confirmation",
    undo_status: "available",
    authority_effect: "local_source_mutation_only",
  };
  const recordPath = changeRecordPath(input.project_root, transaction.transaction_digest);
  try {
    await writeRecord(recordPath, record);
  } catch (error) {
    await rollbackFilesystemChange({
      project_root: input.project_root,
      transaction,
      apply_receipt: applyReceipt,
      authorization: regularUserAuthorization(transaction, "filesystem.rollback"),
    });
    throw error;
  }
  return { comparison, record, record_path: recordPath };
}

export async function undoRegularUserImprovement(input: {
  project_root: string;
  transaction_digest: string;
  confirmed: boolean;
}): Promise<{ record: RegularUserChangeRecord; record_path: string }> {
  if (!input.confirmed) throw new Error("regular_user_undo_confirmation_required");
  const recordPath = changeRecordPath(input.project_root, input.transaction_digest);
  const parsed = JSON.parse(await readFile(recordPath, "utf8")) as RegularUserChangeRecord;
  if (
    parsed.contract_version !== "contentmd.regular-user-change/0.1.0"
    || parsed.transaction.transaction_digest !== input.transaction_digest
    || parsed.undo_status !== "available"
  ) throw new Error("regular_user_change_record_invalid");
  await rollbackFilesystemChange({
    project_root: input.project_root,
    transaction: parsed.transaction,
    apply_receipt: parsed.apply_receipt,
    authorization: regularUserAuthorization(parsed.transaction, "filesystem.rollback"),
  });
  const completed = { ...parsed, undo_status: "completed" as const };
  await writeFile(recordPath, `${canonicalJson(completed)}\n`, { mode: 0o600 });
  return { record: completed, record_path: recordPath };
}
