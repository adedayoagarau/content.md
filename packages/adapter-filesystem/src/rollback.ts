import { readFile } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import {
  atomicReplace,
  validateChangeAuthorization,
  type ChangeAuthorization,
  type FilesystemApplyReceipt,
} from "./apply.js";
import { resolveGuardedTarget, sha256Bytes } from "./guards.js";
import { verifyTransactionDigest, type PreparedChangeTransaction } from "./preview.js";
import { verifyApplyReceipt } from "./verify.js";

export interface FilesystemRollbackReceipt {
  schema_version: "contentmd.filesystem-rollback-receipt/0.1.0";
  operation_id: string;
  transaction_id: string;
  target_path: string;
  restored_digest: string;
  rolled_back: true;
  readback_verified: true;
  authorization_digest: string;
  receipt_digest: string;
}

export interface FilesystemRollbackRequest {
  project_root: string;
  transaction: PreparedChangeTransaction;
  apply_receipt: FilesystemApplyReceipt;
  authorization: ChangeAuthorization | null;
}

export async function rollbackFilesystemChange(input: FilesystemRollbackRequest): Promise<FilesystemRollbackReceipt> {
  verifyTransactionDigest(input.transaction);
  verifyApplyReceipt(input.apply_receipt);
  validateChangeAuthorization(input.transaction, input.authorization, "filesystem.rollback");
  const target = await resolveGuardedTarget(input.project_root, input.transaction.target_path);
  const currentDigest = sha256Bytes(await readFile(target.absolute_path));
  if (currentDigest !== input.transaction.after_digest) throw new Error("rollback_source_digest_mismatch");
  const original = Buffer.from(input.transaction.rollback_bytes_base64, "base64");
  if (sha256Bytes(original) !== input.transaction.rollback_bytes_digest) {
    throw new Error("rollback_material_digest_mismatch");
  }
  await atomicReplace(target.absolute_path, original, input.transaction.file_mode);
  const restoredDigest = sha256Bytes(await readFile(target.absolute_path));
  if (restoredDigest !== input.transaction.before_digest) throw new Error("rollback_readback_mismatch");
  const preimage = {
    schema_version: "contentmd.filesystem-rollback-receipt/0.1.0" as const,
    operation_id: input.authorization.operation_id,
    transaction_id: input.transaction.transaction_id,
    target_path: input.transaction.target_path,
    restored_digest: restoredDigest,
    rolled_back: true as const,
    readback_verified: true as const,
    authorization_digest: sha256Canonical(input.authorization),
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}
