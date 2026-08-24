import {
  applyFilesystemChange,
  rollbackFilesystemChange,
  verifyFilesystemChange,
  type ChangeAuthorization,
  type FilesystemApplyReceipt,
  type FilesystemVerificationReceipt,
  type PreparedChangeTransaction,
  type FilesystemRollbackReceipt,
} from "@contentmd/adapter-filesystem";
import {
  authorizeOperation,
  type AuthorizationDecision,
  type AuthorizationInput,
} from "@contentmd/governance";

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
