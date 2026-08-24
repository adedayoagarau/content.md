import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type ApprovalPauseReceipt,
  type ApprovalPauseRequest,
  type ApprovalPauseStatus,
  type ApprovalResolution,
  type AuthorizedRuntimeOperation,
  type RuntimeApprovalPause,
  type RuntimeBinding,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import {
  appendWorkflowAudit,
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

export interface LocalApprovalPauseOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly clock: () => string;
}

const APPROVAL_STATUSES = new Set<ApprovalPauseStatus["status"]>([
  "pending",
  "approved",
  "rejected",
  "expired",
  "revoked",
  "subject_changed",
  "currentness_unknown",
]);

function validateRequest(request: ApprovalPauseRequest, binding: RuntimeBinding): void {
  requireRuntimeText(request.pause_id, "approval_pause_id_invalid");
  requireRuntimeText(request.subject_ref, "approval_subject_ref_invalid");
  requireRuntimeText(request.approval_class, "approval_class_invalid");
  requireRuntimeTime(request.requested_at, "approval_requested_at_invalid");
  requireRuntimeTime(request.expires_at, "approval_expires_at_invalid");
  if (request.schema_version !== "0.1.0"
    || request.project_id !== binding.project_id
    || request.runtime_binding_digest !== binding.descriptor_digest
    || !isRuntimeDigest(request.subject_digest)
    || !isRuntimeDigest(request.request_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "approval_request_contract_mismatch");
  }
  const { request_digest: supplied, ...preimage } = request;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "approval_request_digest_mismatch");
  }
}

function validateResolution(resolution: ApprovalResolution): void {
  requireRuntimeText(resolution.resolution_id, "approval_resolution_id_invalid");
  requireRuntimeText(resolution.pause_id, "approval_pause_id_invalid");
  requireRuntimeText(resolution.subject_ref, "approval_subject_ref_invalid");
  requireRuntimeText(resolution.decision_ref, "approval_decision_ref_invalid");
  requireRuntimeTime(resolution.resolved_at, "approval_resolved_at_invalid");
  if (resolution.schema_version !== "0.1.0"
    || !(resolution.disposition === "approved" || resolution.disposition === "rejected")
    || !isRuntimeDigest(resolution.subject_digest)
    || !isRuntimeDigest(resolution.decision_digest)
    || !isRuntimeDigest(resolution.resolution_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "approval_resolution_contract_mismatch");
  }
  const { resolution_digest: supplied, ...preimage } = resolution;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "approval_resolution_digest_mismatch");
  }
}

function receiptFor(request: ApprovalPauseRequest, issuedAt: string): ApprovalPauseReceipt {
  const receiptId = `approval-pause-receipt.${sha256Canonical({
    contract_version: "contentmd.runtime-approval-pause-receipt-identity/0.1.0",
    pause_id: request.pause_id,
    request_digest: request.request_digest,
    issued_at: issuedAt,
  })}`;
  const preimage = {
    schema_version: "0.1.0" as const,
    receipt_id: receiptId,
    pause_id: request.pause_id,
    project_id: request.project_id,
    runtime_binding_digest: request.runtime_binding_digest,
    subject_digest: request.subject_digest,
    status: "pending" as const,
    issued_at: issuedAt,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}

function statusFromRow(row: WorkflowSqlRow): ApprovalPauseStatus {
  const status = requiredRowString(row, "status");
  if (!APPROVAL_STATUSES.has(status as ApprovalPauseStatus["status"])) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "approval_status_invalid");
  }
  const preimage = {
    schema_version: "0.1.0" as const,
    pause_id: requiredRowString(row, "pause_id"),
    project_id: requiredRowString(row, "project_id"),
    runtime_binding_digest: requiredRowString(row, "runtime_binding_digest"),
    subject_digest: requiredRowString(row, "subject_digest"),
    status: status as ApprovalPauseStatus["status"],
    updated_at: requiredRowString(row, "updated_at"),
  };
  return { ...preimage, status_digest: sha256Canonical(preimage) };
}

export class LocalApprovalPause implements RuntimeApprovalPause {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #clock: () => string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalApprovalPauseOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_approval_pauses (
        pause_id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        runtime_binding_digest TEXT NOT NULL,
        subject_ref TEXT NOT NULL,
        subject_digest TEXT NOT NULL,
        request_json TEXT NOT NULL,
        request_digest TEXT NOT NULL,
        request_claims_json TEXT NOT NULL,
        status TEXT NOT NULL,
        updated_at TEXT NOT NULL,
        resolution_json TEXT,
        receipt_json TEXT NOT NULL
      );
    `);
  }

  pause(request: ApprovalPauseRequest, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseReceipt> {
    return this.#exclusive(async () => {
      validateRequest(request, this.#binding);
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.approval-pause",
        method: "pause",
        action: "runtime.approval.pause",
        resources: [{ resource_id: request.pause_id, content_digest: request.subject_digest }],
        effect_input: request,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return withImmediateTransaction(this.#database, () => {
        const existing = this.#pauseRow(request.pause_id);
        if (existing !== null) {
          if (requiredRowString(existing, "request_digest") !== request.request_digest
            || requiredRowString(existing, "request_json") !== canonicalJson(request)) {
            throw new RuntimeError("event_id_digest_conflict", "approval_pause_id_digest_conflict");
          }
          return JSON.parse(requiredRowString(existing, "receipt_json")) as ApprovalPauseReceipt;
        }
        const issuedAt = this.#clock();
        if (Date.parse(issuedAt) >= Date.parse(request.expires_at)) {
          throw new RuntimeError("runtime_binding_not_authorized", "approval_request_expired");
        }
        const receipt = receiptFor(request, issuedAt);
        this.#database.prepare(`
          INSERT INTO runtime_approval_pauses (
            pause_id, project_id, runtime_binding_digest, subject_ref,
            subject_digest, request_json, request_digest, request_claims_json,
            status, updated_at, resolution_json, receipt_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending', ?, NULL, ?)
        `).run(
          request.pause_id,
          request.project_id,
          request.runtime_binding_digest,
          request.subject_ref,
          request.subject_digest,
          canonicalJson(request),
          request.request_digest,
          canonicalJson(claims),
          issuedAt,
          canonicalJson(receipt),
        );
        appendWorkflowAudit(this.#database, {
          service: "runtime.approval-pause",
          resource_id: request.pause_id,
          from_status: null,
          to_status: "pending",
          occurred_at: issuedAt,
          transition_input: {
            request_digest: request.request_digest,
            subject_ref: request.subject_ref,
            subject_digest: request.subject_digest,
            claims_digest: sha256Canonical(claims),
          },
        });
        return receipt;
      });
    });
  }

  resolve(decision: ApprovalResolution, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseStatus> {
    return this.#exclusive(async () => {
      validateResolution(decision);
      const initial = this.#requiredPauseRow(decision.pause_id);
      const request = JSON.parse(requiredRowString(initial, "request_json")) as ApprovalPauseRequest;
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.approval-pause",
        method: "resolve",
        action: "runtime.approval.resolve",
        resources: [{ resource_id: decision.pause_id, content_digest: request.subject_digest }],
        effect_input: decision,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return withImmediateTransaction(this.#database, () => {
        const row = this.#requiredPauseRow(decision.pause_id);
        const prior = statusFromRow(row);
        if (prior.status !== "pending") return prior;
        let status: ApprovalPauseStatus["status"];
        if (Date.parse(this.#clock()) >= Date.parse(request.expires_at)) {
          status = "expired";
        } else if (decision.project_id !== request.project_id
          || decision.subject_ref !== request.subject_ref
          || decision.subject_digest !== request.subject_digest) {
          status = "subject_changed";
        } else {
          status = decision.disposition;
        }
        const updatedAt = this.#clock();
        this.#database.prepare(`
          UPDATE runtime_approval_pauses
          SET status = ?, updated_at = ?, resolution_json = ?
          WHERE pause_id = ?
        `).run(status, updatedAt, canonicalJson(decision), decision.pause_id);
        appendWorkflowAudit(this.#database, {
          service: "runtime.approval-pause",
          resource_id: decision.pause_id,
          from_status: "pending",
          to_status: status,
          occurred_at: updatedAt,
          transition_input: {
            request_digest: request.request_digest,
            resolution_digest: decision.resolution_digest,
          },
        });
        return statusFromRow(this.#requiredPauseRow(decision.pause_id));
      });
    });
  }

  inspect(pauseId: string, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(pauseId, "approval_pause_id_invalid");
      const initial = this.#requiredPauseRow(pauseId);
      const subjectDigest = requiredRowString(initial, "subject_digest");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.approval-pause",
        method: "inspect",
        action: "runtime.approval.inspect",
        resources: [{ resource_id: pauseId, content_digest: subjectDigest }],
        effect_input: { pause_id: pauseId, subject_digest: subjectDigest },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return statusFromRow(this.#requiredPauseRow(pauseId));
    });
  }

  close(): void {
    this.#database.close();
  }

  #pauseRow(pauseId: string): WorkflowSqlRow | null {
    return (this.#database.prepare(`
      SELECT pause_id, project_id, runtime_binding_digest, subject_ref,
             subject_digest, request_json, request_digest, status,
             updated_at, receipt_json
      FROM runtime_approval_pauses WHERE pause_id = ?
    `).get(pauseId) as WorkflowSqlRow | undefined) ?? null;
  }

  #requiredPauseRow(pauseId: string): WorkflowSqlRow {
    const row = this.#pauseRow(pauseId);
    if (row === null) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "approval_pause_not_found");
    }
    return row;
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
