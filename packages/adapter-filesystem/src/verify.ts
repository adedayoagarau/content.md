import { readFile } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import type { FilesystemApplyReceipt } from "./apply.js";
import { resolveGuardedTarget, sha256Bytes } from "./guards.js";
import { verifyTransactionDigest, type PreparedChangeTransaction } from "./preview.js";

export interface FilesystemVerificationReceipt {
  schema_version: "contentmd.filesystem-verification-receipt/0.1.0";
  operation_id: string;
  verification_id: string;
  transaction_id: string;
  observed_digest: string;
  verified: true;
  receipt_digest: string;
}

export interface FilesystemVerificationRequest {
  project_root: string;
  transaction: PreparedChangeTransaction;
  apply_receipt: FilesystemApplyReceipt;
}

export function verifyApplyReceipt(receipt: FilesystemApplyReceipt): void {
  const { receipt_digest: received, ...preimage } = receipt;
  if (sha256Canonical(preimage) !== received) throw new Error("apply_receipt_digest_mismatch");
}

export async function verifyFilesystemChange(input: FilesystemVerificationRequest): Promise<FilesystemVerificationReceipt> {
  verifyTransactionDigest(input.transaction);
  verifyApplyReceipt(input.apply_receipt);
  if (
    input.apply_receipt.transaction_id !== input.transaction.transaction_id ||
    input.apply_receipt.after_digest !== input.transaction.after_digest
  ) {
    throw new Error("verification_receipt_transaction_mismatch");
  }
  const target = await resolveGuardedTarget(input.project_root, input.transaction.target_path);
  const observedDigest = sha256Bytes(await readFile(target.absolute_path));
  if (observedDigest !== input.transaction.after_digest) throw new Error("verification_readback_mismatch");
  const preimage = {
    schema_version: "contentmd.filesystem-verification-receipt/0.1.0" as const,
    operation_id: input.transaction.operation_id,
    verification_id: input.transaction.verification_id,
    transaction_id: input.transaction.transaction_id,
    observed_digest: observedDigest,
    verified: true as const,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}
