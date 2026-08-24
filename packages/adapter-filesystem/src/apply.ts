import { open, readFile, rename, unlink } from "node:fs/promises";
import { dirname, join } from "node:path";
import { randomUUID } from "node:crypto";
import { sha256Canonical } from "@contentmd/core";
import { resolveGuardedTarget, sha256Bytes } from "./guards.js";
import { verifyTransactionDigest, type PreparedChangeTransaction } from "./preview.js";

export interface ChangeAuthorization {
  operation_id: string;
  action: "filesystem.write" | "filesystem.rollback";
  disposition: "allow" | "deny" | "review";
  approval_id: string;
  approval_class: "mutation" | "semantic_decision" | "release" | "learning_promotion";
  approval_status: "issued" | "revoked" | "expired" | "superseded";
  approval_revocation_state: "current" | "revoked" | "unknown";
  approval_expires_at: string | null;
  checked_at: string;
  subject_digest: string;
  verification_plan_ref: string | null;
}

export interface FilesystemApplyReceipt {
  schema_version: "contentmd.filesystem-apply-receipt/0.1.0";
  operation_id: string;
  transaction_id: string;
  target_path: string;
  before_digest: string;
  after_digest: string;
  changed: true;
  readback_verified: true;
  applied_at: string;
  authorization_digest: string;
  receipt_digest: string;
}

export interface FilesystemApplyRequest {
  project_root: string;
  transaction: PreparedChangeTransaction;
  authorization: ChangeAuthorization | null;
}

export function validateChangeAuthorization(
  transaction: PreparedChangeTransaction,
  authorization: ChangeAuthorization | null,
  expectedAction: "filesystem.write" | "filesystem.rollback",
): asserts authorization is ChangeAuthorization {
  if (authorization === null) throw new Error("mutation_authorization_missing");
  if (authorization.disposition !== "allow") throw new Error("mutation_authorization_not_allowed");
  if (authorization.action !== expectedAction) throw new Error("mutation_authorization_action_mismatch");
  if (expectedAction === "filesystem.write" && authorization.operation_id !== transaction.operation_id) {
    throw new Error("mutation_authorization_operation_mismatch");
  }
  if (authorization.approval_class !== "mutation") throw new Error("mutation_approval_class_mismatch");
  if (authorization.approval_status !== "issued" || authorization.approval_revocation_state !== "current") {
    throw new Error("mutation_approval_not_current");
  }
  if (expectedAction === "filesystem.write" && authorization.approval_id !== transaction.approval_id) {
    throw new Error("mutation_approval_id_mismatch");
  }
  if (authorization.subject_digest !== transaction.transaction_digest) {
    throw new Error("mutation_authorization_subject_mismatch");
  }
  const checkedAt = Date.parse(authorization.checked_at);
  const expiresAt = authorization.approval_expires_at === null ? null : Date.parse(authorization.approval_expires_at);
  if (!Number.isFinite(checkedAt) || (authorization.approval_expires_at !== null && !Number.isFinite(expiresAt))) {
    throw new Error("mutation_authorization_time_invalid");
  }
  if (expiresAt !== null && expiresAt < checkedAt) throw new Error("mutation_approval_expired");
  if (authorization.verification_plan_ref !== transaction.verification_id) {
    throw new Error("mutation_verification_plan_mismatch");
  }
}

export async function atomicReplace(path: string, bytes: Uint8Array, mode: number): Promise<void> {
  const parent = dirname(path);
  const temporary = join(parent, `.contentmd-${randomUUID()}.tmp`);
  let handle: Awaited<ReturnType<typeof open>> | null = null;
  try {
    handle = await open(temporary, "wx", mode);
    await handle.writeFile(bytes);
    await handle.sync();
    await handle.close();
    handle = null;
    await rename(temporary, path);
    const parentHandle = await open(parent, "r");
    try {
      await parentHandle.sync();
    } finally {
      await parentHandle.close();
    }
  } catch (error) {
    if (handle !== null) await handle.close().catch(() => undefined);
    await unlink(temporary).catch(() => undefined);
    throw error;
  }
}

export async function applyFilesystemChange(input: FilesystemApplyRequest): Promise<FilesystemApplyReceipt> {
  verifyTransactionDigest(input.transaction);
  validateChangeAuthorization(input.transaction, input.authorization, "filesystem.write");
  const target = await resolveGuardedTarget(input.project_root, input.transaction.target_path);
  const current = await readFile(target.absolute_path);
  if (sha256Bytes(current) !== input.transaction.before_digest) throw new Error("change_source_digest_mismatch");
  const afterBytes = Buffer.from(input.transaction.after_bytes_base64, "base64");
  if (sha256Bytes(afterBytes) !== input.transaction.after_digest) throw new Error("change_after_digest_mismatch");
  await atomicReplace(target.absolute_path, afterBytes, input.transaction.file_mode);
  const readback = await readFile(target.absolute_path);
  if (sha256Bytes(readback) !== input.transaction.after_digest) {
    const original = Buffer.from(input.transaction.rollback_bytes_base64, "base64");
    await atomicReplace(target.absolute_path, original, input.transaction.file_mode);
    throw new Error("apply_readback_mismatch_rolled_back");
  }
  const preimage = {
    schema_version: "contentmd.filesystem-apply-receipt/0.1.0" as const,
    operation_id: input.transaction.operation_id,
    transaction_id: input.transaction.transaction_id,
    target_path: input.transaction.target_path,
    before_digest: input.transaction.before_digest,
    after_digest: input.transaction.after_digest,
    changed: true as const,
    readback_verified: true as const,
    applied_at: input.authorization.checked_at,
    authorization_digest: sha256Canonical(input.authorization),
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}
