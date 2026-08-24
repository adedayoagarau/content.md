import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type GovernedJob,
  type JobReceipt,
  type JobStatus,
  type RuntimeBinding,
  type RuntimeJobRunner,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import {
  appendWorkflowAudit,
  isRuntimeDigest,
  openWorkflowDatabase,
  optionalRowString,
  requiredRowInteger,
  requiredRowString,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  type WorkflowSqlRow,
  withImmediateTransaction,
  workflowEffect,
} from "./runtime.js";

export type LocalJobResultStatus = "completed" | "approval_paused" | "failed" | "remote_outcome_unknown";

export interface LocalJobHandlerResult {
  readonly status: LocalJobResultStatus;
  readonly output_ref: string | null;
  readonly output_digest: string | null;
}

export type LocalJobHandler = (
  job: GovernedJob,
  attempt: number,
) => Promise<LocalJobHandlerResult>;

export interface LocalJobRunnerOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly handlers: Readonly<Record<string, LocalJobHandler>>;
  readonly clock: () => string;
}

const JOB_STATUSES = new Set<JobStatus["status"]>([
  "queued",
  "running",
  "approval_paused",
  "completed",
  "cancelled",
  "failed",
  "remote_outcome_unknown",
]);

function validateJob(job: GovernedJob, binding: RuntimeBinding): void {
  requireRuntimeText(job.job_id, "job_id_invalid");
  requireRuntimeText(job.handler_id, "job_handler_invalid");
  requireRuntimeText(job.input_ref, "job_input_ref_invalid");
  requireRuntimeTime(job.requested_at, "job_requested_at_invalid");
  if (job.schema_version !== "0.1.0"
    || job.project_id !== binding.project_id
    || job.runtime_binding_digest !== binding.descriptor_digest
    || !isRuntimeDigest(job.input_digest)
    || !isRuntimeDigest(job.job_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "job_contract_mismatch");
  }
  const { job_digest: supplied, ...preimage } = job;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "job_digest_mismatch");
  }
}

function parseJob(row: WorkflowSqlRow): GovernedJob {
  const parsed = JSON.parse(requiredRowString(row, "job_json")) as GovernedJob;
  if (canonicalJson(parsed) !== requiredRowString(row, "job_json")) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "job_noncanonical");
  }
  return parsed;
}

function statusFromRow(row: WorkflowSqlRow): JobStatus {
  const status = requiredRowString(row, "status");
  if (!JOB_STATUSES.has(status as JobStatus["status"])) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "job_status_invalid");
  }
  const preimage = {
    schema_version: "0.1.0" as const,
    job_id: requiredRowString(row, "job_id"),
    project_id: requiredRowString(row, "project_id"),
    runtime_binding_digest: requiredRowString(row, "runtime_binding_digest"),
    status: status as JobStatus["status"],
    attempt: requiredRowInteger(row, "attempt"),
    updated_at: requiredRowString(row, "updated_at"),
    output_ref: optionalRowString(row, "output_ref"),
    output_digest: optionalRowString(row, "output_digest"),
  };
  return { ...preimage, status_digest: sha256Canonical(preimage) };
}

function receiptFor(job: GovernedJob, issuedAt: string): JobReceipt {
  const receiptId = `job-receipt.${sha256Canonical({
    contract_version: "contentmd.runtime-job-receipt-identity/0.1.0",
    job_id: job.job_id,
    job_digest: job.job_digest,
    issued_at: issuedAt,
  })}`;
  const preimage = {
    schema_version: "0.1.0" as const,
    receipt_id: receiptId,
    job_id: job.job_id,
    project_id: job.project_id,
    runtime_binding_digest: job.runtime_binding_digest,
    input_digest: job.input_digest,
    status: "queued" as const,
    issued_at: issuedAt,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}

function validateHandlerResult(result: LocalJobHandlerResult): void {
  if (!(result.status === "completed"
    || result.status === "approval_paused"
    || result.status === "failed"
    || result.status === "remote_outcome_unknown")
    || !((result.output_ref === null && result.output_digest === null)
      || (typeof result.output_ref === "string"
        && result.output_ref.length > 0
        && isRuntimeDigest(result.output_digest)))) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "job_handler_result_invalid");
  }
}

export class LocalJobRunner implements RuntimeJobRunner {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #handlers: Readonly<Record<string, LocalJobHandler>>;
  readonly #clock: () => string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalJobRunnerOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#handlers = Object.freeze({ ...options.handlers });
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_jobs (
        job_id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        runtime_binding_digest TEXT NOT NULL,
        handler_id TEXT NOT NULL,
        job_json TEXT NOT NULL,
        job_digest TEXT NOT NULL,
        status TEXT NOT NULL,
        attempt INTEGER NOT NULL CHECK (attempt >= 1),
        updated_at TEXT NOT NULL,
        output_ref TEXT,
        output_digest TEXT,
        cancel_reason TEXT,
        receipt_json TEXT NOT NULL
      );
    `);
  }

  start(job: GovernedJob, operation: AuthorizedRuntimeOperation): Promise<JobReceipt> {
    return this.#exclusive(async () => {
      validateJob(job, this.#binding);
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.jobs",
        method: "start",
        action: "runtime.job.start",
        resources: [{ resource_id: job.job_id, content_digest: job.job_digest }],
        effect_input: job,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      if (this.#handlers[job.handler_id] === undefined) {
        throw new RuntimeError("runtime_capability_unsupported", "job_handler_not_registered");
      }
      return withImmediateTransaction(this.#database, () => {
        const existing = this.#jobRow(job.job_id);
        if (existing !== null) {
          if (requiredRowString(existing, "job_digest") !== job.job_digest
            || canonicalJson(parseJob(existing)) !== canonicalJson(job)) {
            throw new RuntimeError("event_id_digest_conflict", "job_id_digest_conflict");
          }
          return JSON.parse(requiredRowString(existing, "receipt_json")) as JobReceipt;
        }
        const issuedAt = this.#clock();
        const receipt = receiptFor(job, issuedAt);
        this.#database.prepare(`
          INSERT INTO runtime_jobs (
            job_id, project_id, runtime_binding_digest, handler_id,
            job_json, job_digest, status, attempt, updated_at,
            output_ref, output_digest, cancel_reason, receipt_json
          ) VALUES (?, ?, ?, ?, ?, ?, 'queued', 1, ?, NULL, NULL, NULL, ?)
        `).run(
          job.job_id,
          job.project_id,
          job.runtime_binding_digest,
          job.handler_id,
          canonicalJson(job),
          job.job_digest,
          issuedAt,
          canonicalJson(receipt),
        );
        appendWorkflowAudit(this.#database, {
          service: "runtime.jobs",
          resource_id: job.job_id,
          from_status: null,
          to_status: "queued",
          occurred_at: issuedAt,
          transition_input: { job_digest: job.job_digest, attempt: 1 },
        });
        return receipt;
      });
    });
  }

  inspect(jobId: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(jobId, "job_id_invalid");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.jobs",
        method: "inspect",
        action: "runtime.job.inspect",
        resources: [{ resource_id: jobId, content_digest: null }],
        effect_input: { job_id: jobId },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      const row = this.#requiredJobRow(jobId);
      return statusFromRow(row);
    });
  }

  cancel(jobId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(jobId, "job_id_invalid");
      requireRuntimeText(reason, "job_cancel_reason_invalid");
      const initial = this.#requiredJobRow(jobId);
      const jobDigest = requiredRowString(initial, "job_digest");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.jobs",
        method: "cancel",
        action: "runtime.job.cancel",
        resources: [{ resource_id: jobId, content_digest: jobDigest }],
        effect_input: { job_id: jobId, job_digest: jobDigest, reason },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return withImmediateTransaction(this.#database, () => {
        const row = this.#requiredJobRow(jobId);
        const prior = statusFromRow(row);
        if (prior.status === "cancelled") return prior;
        if (!(prior.status === "queued" || prior.status === "running" || prior.status === "approval_paused")) {
          throw new RuntimeError("runtime_canonical_commit_unavailable", "job_not_cancellable");
        }
        const updatedAt = this.#clock();
        this.#database.prepare(`
          UPDATE runtime_jobs
          SET status = 'cancelled', updated_at = ?, output_ref = NULL,
              output_digest = NULL, cancel_reason = ?
          WHERE job_id = ?
        `).run(updatedAt, reason, jobId);
        appendWorkflowAudit(this.#database, {
          service: "runtime.jobs",
          resource_id: jobId,
          from_status: prior.status,
          to_status: "cancelled",
          occurred_at: updatedAt,
          transition_input: { job_digest: jobDigest, reason },
        });
        return statusFromRow(this.#requiredJobRow(jobId));
      });
    });
  }

  run(jobId: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(jobId, "job_id_invalid");
      const initial = this.#requiredJobRow(jobId);
      const jobDigest = requiredRowString(initial, "job_digest");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.jobs",
        method: "run",
        action: "runtime.job.run",
        resources: [{ resource_id: jobId, content_digest: jobDigest }],
        effect_input: { job_id: jobId, job_digest: jobDigest },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      const running = withImmediateTransaction(this.#database, () => {
        const row = this.#requiredJobRow(jobId);
        const prior = statusFromRow(row);
        if (prior.status === "remote_outcome_unknown") {
          throw new RuntimeError("runtime_canonical_commit_unavailable", "remote_outcome_requires_resolution");
        }
        if (!(prior.status === "queued" || prior.status === "approval_paused")) {
          throw new RuntimeError("runtime_canonical_commit_unavailable", "job_not_runnable");
        }
        const updatedAt = this.#clock();
        this.#database.prepare(`
          UPDATE runtime_jobs SET status = 'running', updated_at = ? WHERE job_id = ?
        `).run(updatedAt, jobId);
        appendWorkflowAudit(this.#database, {
          service: "runtime.jobs",
          resource_id: jobId,
          from_status: prior.status,
          to_status: "running",
          occurred_at: updatedAt,
          transition_input: { job_digest: jobDigest, attempt: prior.attempt },
        });
        return { job: parseJob(row), attempt: prior.attempt };
      });
      const handler = this.#handlers[running.job.handler_id];
      if (handler === undefined) {
        return this.#finish(jobId, {
          status: "failed",
          output_ref: null,
          output_digest: null,
        });
      }
      let result: LocalJobHandlerResult;
      try {
        result = await handler(running.job, running.attempt);
        validateHandlerResult(result);
      } catch {
        result = { status: "failed", output_ref: null, output_digest: null };
      }
      return this.#finish(jobId, result);
    });
  }

  close(): void {
    this.#database.close();
  }

  #finish(jobId: string, result: LocalJobHandlerResult): JobStatus {
    return withImmediateTransaction(this.#database, () => {
      const row = this.#requiredJobRow(jobId);
      const prior = statusFromRow(row);
      if (prior.status !== "running") {
        throw new RuntimeError("runtime_canonical_commit_unavailable", "job_transition_lost");
      }
      const updatedAt = this.#clock();
      this.#database.prepare(`
        UPDATE runtime_jobs
        SET status = ?, updated_at = ?, output_ref = ?, output_digest = ?
        WHERE job_id = ?
      `).run(result.status, updatedAt, result.output_ref, result.output_digest, jobId);
      appendWorkflowAudit(this.#database, {
        service: "runtime.jobs",
        resource_id: jobId,
        from_status: "running",
        to_status: result.status,
        occurred_at: updatedAt,
        transition_input: {
          job_digest: requiredRowString(row, "job_digest"),
          attempt: prior.attempt,
          output_ref: result.output_ref,
          output_digest: result.output_digest,
        },
      });
      return statusFromRow(this.#requiredJobRow(jobId));
    });
  }

  #jobRow(jobId: string): WorkflowSqlRow | null {
    return (this.#database.prepare(`
      SELECT job_id, project_id, runtime_binding_digest, handler_id,
             job_json, job_digest, status, attempt, updated_at,
             output_ref, output_digest, receipt_json
      FROM runtime_jobs WHERE job_id = ?
    `).get(jobId) as WorkflowSqlRow | undefined) ?? null;
  }

  #requiredJobRow(jobId: string): WorkflowSqlRow {
    const row = this.#jobRow(jobId);
    if (row === null) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "job_not_found");
    }
    return row;
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
