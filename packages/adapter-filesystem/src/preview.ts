import { readFile, stat } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import { resolveGuardedTarget, sha256Bytes } from "./guards.js";

export interface FilesystemChangePreviewRequest {
  project_root: string;
  operation_id: string;
  transaction_id: string;
  proposal_id: string;
  decision_id: string;
  approval_id: string;
  verification_id: string;
  target_path: string;
  additional_target_paths: string[];
  line: number;
  column: number;
  before: string;
  after: string;
}

export interface PreparedChangeTransaction {
  schema_version: "contentmd.change-transaction/0.1.0";
  operation_id: string;
  transaction_id: string;
  proposal_id: string;
  decision_id: string;
  approval_id: string;
  verification_id: string;
  target_path: string;
  line: number;
  column: number;
  before: string;
  after: string;
  before_digest: string;
  after_digest: string;
  unified_diff: string;
  rollback_bytes_digest: string;
  rollback_bytes_base64: string;
  after_bytes_base64: string;
  file_mode: number;
  mutation_status: "previewed_not_applied";
  authority_effect: "none";
  transaction_digest: string;
}

function offsetAt(source: string, line: number, column: number): number {
  if (!Number.isSafeInteger(line) || line < 1 || !Number.isSafeInteger(column) || column < 1) {
    throw new Error("change_coordinate_invalid");
  }
  const lines = source.split("\n");
  const selected = lines[line - 1];
  if (selected === undefined || column - 1 > selected.length) throw new Error("change_coordinate_invalid");
  let offset = 0;
  for (let index = 0; index < line - 1; index += 1) offset += (lines[index]?.length ?? 0) + 1;
  return offset + column - 1;
}

function decodeUtf8(bytes: Uint8Array): string {
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw new Error("change_target_encoding_unsupported");
  }
}

export function transactionPreimage(
  transaction: Omit<PreparedChangeTransaction, "transaction_digest">,
): Omit<PreparedChangeTransaction, "transaction_digest"> {
  return transaction;
}

export function verifyTransactionDigest(transaction: PreparedChangeTransaction): void {
  const { transaction_digest: received, ...preimage } = transaction;
  if (sha256Canonical(preimage) !== received) throw new Error("change_transaction_digest_mismatch");
}

export async function previewFilesystemChange(
  request: FilesystemChangePreviewRequest,
): Promise<PreparedChangeTransaction> {
  if (request.additional_target_paths.length > 0) throw new Error("change_multi_file_widening_denied");
  if (request.before.length === 0 || request.after.length === 0 || request.before === request.after) {
    throw new Error("change_expression_invalid");
  }
  const target = await resolveGuardedTarget(request.project_root, request.target_path);
  const originalBytes = await readFile(target.absolute_path);
  const source = decodeUtf8(originalBytes);
  const start = offsetAt(source, request.line, request.column);
  if (source.slice(start, start + request.before.length) !== request.before) {
    throw new Error("change_coordinate_content_mismatch");
  }
  const afterSource = `${source.slice(0, start)}${request.after}${source.slice(start + request.before.length)}`;
  const afterBytes = new TextEncoder().encode(afterSource);
  const mode = (await stat(target.absolute_path)).mode & 0o777;
  const beforeDigest = sha256Bytes(originalBytes);
  const afterDigest = sha256Bytes(afterBytes);
  const preimage: Omit<PreparedChangeTransaction, "transaction_digest"> = {
    schema_version: "contentmd.change-transaction/0.1.0",
    operation_id: request.operation_id,
    transaction_id: request.transaction_id,
    proposal_id: request.proposal_id,
    decision_id: request.decision_id,
    approval_id: request.approval_id,
    verification_id: request.verification_id,
    target_path: request.target_path,
    line: request.line,
    column: request.column,
    before: request.before,
    after: request.after,
    before_digest: beforeDigest,
    after_digest: afterDigest,
    unified_diff: `--- a/${request.target_path}\n+++ b/${request.target_path}\n@@ -${request.line},1 +${request.line},1 @@\n-${request.before}\n+${request.after}\n`,
    rollback_bytes_digest: beforeDigest,
    rollback_bytes_base64: Buffer.from(originalBytes).toString("base64"),
    after_bytes_base64: Buffer.from(afterBytes).toString("base64"),
    file_mode: mode,
    mutation_status: "previewed_not_applied",
    authority_effect: "none",
  };
  return { ...preimage, transaction_digest: sha256Canonical(preimage) };
}
