import { sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type CleanupReceipt,
  type CleanupRequest,
  type RuntimeBinding,
  type RuntimeCleanup,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import {
  isRuntimeDigest,
  openWorkflowDatabase,
  requiredRowString,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  type WorkflowSqlRow,
  withImmediateTransaction,
  workflowEffect,
} from "./runtime.js";

export interface LocalCleanupOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly clock: () => string;
}

const PROTECTED_CLASSES = new Set([
  "approval_pauses",
  "canonical_events",
  "referenced_blobs",
  "replica_acknowledgements",
  "runtime_bindings",
]);

const CLEANABLE_CLASSES = new Set([
  "cancelled_schedules",
  "completed_jobs",
  "expired_nonces",
  "expired_sessions",
  "progress_events",
]);

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function validateRequest(request: CleanupRequest, binding: RuntimeBinding): void {
  requireRuntimeText(request.request_id, "cleanup_request_id_invalid");
  requireRuntimeTime(request.older_than, "cleanup_older_than_invalid");
  requireRuntimeTime(request.requested_at, "cleanup_requested_at_invalid");
  if (request.schema_version !== "0.1.0"
    || request.project_id !== binding.project_id
    || request.runtime_binding_digest !== binding.descriptor_digest
    || request.object_classes.length === 0
    || request.object_classes.some((item) => typeof item !== "string" || item.length === 0)
    || new Set(request.object_classes).size !== request.object_classes.length
    || [...request.object_classes].sort(compareText).some((item, index) => item !== request.object_classes[index])
    || !isRuntimeDigest(request.request_digest)) {
    throw new RuntimeError("runtime_cleanup_not_authorized", "cleanup_request_contract_invalid");
  }
  const { request_digest: supplied, ...preimage } = request;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_cleanup_not_authorized", "cleanup_request_digest_invalid");
  }
}

export class LocalCleanup implements RuntimeCleanup {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #clock: () => string;

  constructor(options: LocalCleanupOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
  }

  async clean(
    request: CleanupRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<CleanupReceipt> {
    validateRequest(request, this.#binding);
    const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
      interface_id: "runtime.cleanup",
      method: "clean",
      action: "runtime.cleanup.run",
      resources: [{ resource_id: request.request_id, content_digest: request.request_digest }],
      effect_input: request,
      runtime_binding_digest: this.#binding.descriptor_digest,
      records: request.object_classes.length,
    }));
    requireRuntimeBinding(claims, this.#binding);
    const removedRefs: string[] = [];
    const retained: Array<{ object_ref: string; reason: string }> = [];
    withImmediateTransaction(this.#database, () => {
      for (const objectClass of request.object_classes) {
        if (PROTECTED_CLASSES.has(objectClass)) {
          retained.push({ object_ref: objectClass, reason: "canonical_or_governed" });
          continue;
        }
        if (!CLEANABLE_CLASSES.has(objectClass)) {
          retained.push({ object_ref: objectClass, reason: "unsupported_object_class" });
          continue;
        }
        if (objectClass === "expired_sessions") {
          removedRefs.push(...this.#deleteRows({
            table: "runtime_sessions",
            idColumn: "session_ref",
            where: "expires_at < ?",
            parameters: [request.older_than],
          }));
        } else if (objectClass === "completed_jobs") {
          removedRefs.push(...this.#deleteRows({
            table: "runtime_jobs",
            idColumn: "job_id",
            where: "status IN ('completed', 'failed') AND updated_at < ?",
            parameters: [request.older_than],
          }));
        } else if (objectClass === "cancelled_schedules") {
          removedRefs.push(...this.#deleteRows({
            table: "runtime_schedules",
            idColumn: "schedule_id",
            where: "status = 'cancelled' AND updated_at < ?",
            parameters: [request.older_than],
          }));
        } else if (objectClass === "progress_events") {
          removedRefs.push(...this.#deleteProgress(request.older_than));
        } else if (objectClass === "expired_nonces") {
          removedRefs.push(...this.#deleteExpiredNonces(request.older_than));
        }
      }
    });
    removedRefs.sort(compareText);
    retained.sort((left, right) => compareText(left.object_ref, right.object_ref));
    const completedAt = this.#clock();
    const receiptId = `cleanup-receipt.${sha256Canonical({
      contract_version: "contentmd.runtime-cleanup-receipt-identity/0.1.0",
      request_id: request.request_id,
      request_digest: request.request_digest,
      removed_refs: removedRefs,
      retained,
    })}`;
    const preimage = {
      schema_version: "0.1.0" as const,
      receipt_id: receiptId,
      request_id: request.request_id,
      project_id: request.project_id,
      runtime_binding_digest: request.runtime_binding_digest,
      removed_refs: removedRefs,
      retained,
      completed_at: completedAt,
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  }

  close(): void {
    this.#database.close();
  }

  #tableExists(table: string): boolean {
    return this.#database.prepare(`
      SELECT name FROM sqlite_master WHERE type = 'table' AND name = ?
    `).get(table) !== undefined;
  }

  #deleteRows(input: {
    readonly table: "runtime_sessions" | "runtime_jobs" | "runtime_schedules";
    readonly idColumn: "session_ref" | "job_id" | "schedule_id";
    readonly where: string;
    readonly parameters: readonly string[];
  }): string[] {
    if (!this.#tableExists(input.table)) return [];
    const rows = this.#database.prepare(`
      SELECT ${input.idColumn} FROM ${input.table} WHERE ${input.where}
      ORDER BY ${input.idColumn} ASC
    `).all(...input.parameters) as WorkflowSqlRow[];
    const ids = rows.map((row) => requiredRowString(row, input.idColumn));
    if (ids.length > 0) {
      this.#database.prepare(`DELETE FROM ${input.table} WHERE ${input.where}`)
        .run(...input.parameters);
    }
    return ids.map((id) => `${input.table}:${id}`);
  }

  #deleteProgress(olderThan: string): string[] {
    if (!this.#tableExists("runtime_progress_events")) return [];
    const rows = this.#database.prepare(`
      SELECT event_id, event_json FROM runtime_progress_events ORDER BY event_id ASC
    `).all() as WorkflowSqlRow[];
    const ids = rows
      .filter((row) => {
        const event = JSON.parse(requiredRowString(row, "event_json")) as { occurred_at?: unknown };
        return typeof event.occurred_at === "string" && event.occurred_at < olderThan;
      })
      .map((row) => requiredRowString(row, "event_id"));
    for (const id of ids) {
      this.#database.prepare("DELETE FROM runtime_progress_events WHERE event_id = ?").run(id);
    }
    return ids.map((id) => `runtime_progress_events:${id}`);
  }

  #deleteExpiredNonces(olderThan: string): string[] {
    if (!this.#tableExists("runtime_nonce_claims") || !this.#tableExists("runtime_capabilities")) return [];
    const rows = this.#database.prepare(`
      SELECT n.nonce
      FROM runtime_nonce_claims n
      JOIN runtime_capabilities c ON c.capability_ref = n.capability_ref
      WHERE c.expires_at < ?
      ORDER BY n.nonce ASC
    `).all(olderThan) as WorkflowSqlRow[];
    const ids = rows.map((row) => requiredRowString(row, "nonce"));
    for (const id of ids) {
      this.#database.prepare("DELETE FROM runtime_nonce_claims WHERE nonce = ?").run(id);
    }
    return ids.map((id) => `runtime_nonce_claims:${id}`);
  }
}
