import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type RuntimeBinding,
  type RuntimeOperationVerifier,
  type RuntimeScheduler,
  type ScheduledGovernedJob,
  type ScheduleReceipt,
  type ScheduleStatus,
} from "@contentmd/runtime-sdk";
import {
  appendWorkflowAudit,
  isRuntimeDigest,
  openWorkflowDatabase,
  optionalRowString,
  requiredRowString,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  type WorkflowSqlRow,
  withImmediateTransaction,
  workflowEffect,
} from "./runtime.js";

export interface LocalSchedulerOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly clock: () => string;
}

const SCHEDULE_STATUSES = new Set<ScheduleStatus["status"]>([
  "active",
  "cancelled",
  "completed",
]);

function validateSchedule(schedule: ScheduledGovernedJob, binding: RuntimeBinding): void {
  requireRuntimeText(schedule.schedule_id, "schedule_id_invalid");
  requireRuntimeText(schedule.governed_job_ref, "schedule_job_ref_invalid");
  requireRuntimeText(schedule.schedule_expression, "schedule_expression_invalid");
  requireRuntimeText(schedule.timezone, "schedule_timezone_invalid");
  requireRuntimeTime(schedule.next_occurrence, "schedule_next_occurrence_invalid");
  if (schedule.schema_version !== "0.1.0"
    || schedule.project_id !== binding.project_id
    || schedule.runtime_binding_digest !== binding.descriptor_digest
    || !isRuntimeDigest(schedule.governed_job_digest)
    || !isRuntimeDigest(schedule.schedule_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "schedule_contract_mismatch");
  }
  const { schedule_digest: supplied, ...preimage } = schedule;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "schedule_digest_mismatch");
  }
}

function receiptFor(schedule: ScheduledGovernedJob, issuedAt: string): ScheduleReceipt {
  const receiptId = `schedule-receipt.${sha256Canonical({
    contract_version: "contentmd.runtime-schedule-receipt-identity/0.1.0",
    schedule_id: schedule.schedule_id,
    schedule_digest: schedule.schedule_digest,
    issued_at: issuedAt,
  })}`;
  const preimage = {
    schema_version: "0.1.0" as const,
    receipt_id: receiptId,
    schedule_id: schedule.schedule_id,
    project_id: schedule.project_id,
    runtime_binding_digest: schedule.runtime_binding_digest,
    status: "active" as const,
    issued_at: issuedAt,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}

function statusFromRow(row: WorkflowSqlRow): ScheduleStatus {
  const status = requiredRowString(row, "status");
  if (!SCHEDULE_STATUSES.has(status as ScheduleStatus["status"])) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "schedule_status_invalid");
  }
  const preimage = {
    schema_version: "0.1.0" as const,
    schedule_id: requiredRowString(row, "schedule_id"),
    project_id: requiredRowString(row, "project_id"),
    runtime_binding_digest: requiredRowString(row, "runtime_binding_digest"),
    status: status as ScheduleStatus["status"],
    next_occurrence: optionalRowString(row, "next_occurrence"),
    updated_at: requiredRowString(row, "updated_at"),
  };
  return { ...preimage, status_digest: sha256Canonical(preimage) };
}

export class LocalScheduler implements RuntimeScheduler {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #clock: () => string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalSchedulerOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_schedules (
        schedule_id TEXT PRIMARY KEY,
        project_id TEXT NOT NULL,
        runtime_binding_digest TEXT NOT NULL,
        schedule_json TEXT NOT NULL,
        schedule_digest TEXT NOT NULL,
        status TEXT NOT NULL,
        next_occurrence TEXT,
        updated_at TEXT NOT NULL,
        cancel_reason TEXT,
        receipt_json TEXT NOT NULL
      );
    `);
  }

  schedule(job: ScheduledGovernedJob, operation: AuthorizedRuntimeOperation): Promise<ScheduleReceipt> {
    return this.#exclusive(async () => {
      validateSchedule(job, this.#binding);
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.scheduler",
        method: "schedule",
        action: "runtime.schedule.create",
        resources: [{ resource_id: job.schedule_id, content_digest: job.schedule_digest }],
        effect_input: job,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return withImmediateTransaction(this.#database, () => {
        const existing = this.#scheduleRow(job.schedule_id);
        if (existing !== null) {
          if (requiredRowString(existing, "schedule_digest") !== job.schedule_digest
            || requiredRowString(existing, "schedule_json") !== canonicalJson(job)) {
            throw new RuntimeError("event_id_digest_conflict", "schedule_id_digest_conflict");
          }
          return JSON.parse(requiredRowString(existing, "receipt_json")) as ScheduleReceipt;
        }
        const issuedAt = this.#clock();
        const receipt = receiptFor(job, issuedAt);
        this.#database.prepare(`
          INSERT INTO runtime_schedules (
            schedule_id, project_id, runtime_binding_digest, schedule_json,
            schedule_digest, status, next_occurrence, updated_at,
            cancel_reason, receipt_json
          ) VALUES (?, ?, ?, ?, ?, 'active', ?, ?, NULL, ?)
        `).run(
          job.schedule_id,
          job.project_id,
          job.runtime_binding_digest,
          canonicalJson(job),
          job.schedule_digest,
          job.next_occurrence,
          issuedAt,
          canonicalJson(receipt),
        );
        appendWorkflowAudit(this.#database, {
          service: "runtime.scheduler",
          resource_id: job.schedule_id,
          from_status: null,
          to_status: "active",
          occurred_at: issuedAt,
          transition_input: {
            schedule_digest: job.schedule_digest,
            governed_job_ref: job.governed_job_ref,
            governed_job_digest: job.governed_job_digest,
          },
        });
        return receipt;
      });
    });
  }

  inspect(scheduleId: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(scheduleId, "schedule_id_invalid");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.scheduler",
        method: "inspect",
        action: "runtime.schedule.inspect",
        resources: [{ resource_id: scheduleId, content_digest: null }],
        effect_input: { schedule_id: scheduleId },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return statusFromRow(this.#requiredScheduleRow(scheduleId));
    });
  }

  cancel(scheduleId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus> {
    return this.#exclusive(async () => {
      requireRuntimeText(scheduleId, "schedule_id_invalid");
      requireRuntimeText(reason, "schedule_cancel_reason_invalid");
      const initial = this.#requiredScheduleRow(scheduleId);
      const scheduleDigest = requiredRowString(initial, "schedule_digest");
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.scheduler",
        method: "cancel",
        action: "runtime.schedule.cancel",
        resources: [{ resource_id: scheduleId, content_digest: scheduleDigest }],
        effect_input: { schedule_id: scheduleId, schedule_digest: scheduleDigest, reason },
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      return withImmediateTransaction(this.#database, () => {
        const row = this.#requiredScheduleRow(scheduleId);
        const prior = statusFromRow(row);
        if (prior.status === "cancelled") return prior;
        if (prior.status !== "active") {
          throw new RuntimeError("runtime_canonical_commit_unavailable", "schedule_not_active");
        }
        const updatedAt = this.#clock();
        this.#database.prepare(`
          UPDATE runtime_schedules
          SET status = 'cancelled', next_occurrence = NULL,
              updated_at = ?, cancel_reason = ?
          WHERE schedule_id = ?
        `).run(updatedAt, reason, scheduleId);
        appendWorkflowAudit(this.#database, {
          service: "runtime.scheduler",
          resource_id: scheduleId,
          from_status: "active",
          to_status: "cancelled",
          occurred_at: updatedAt,
          transition_input: { schedule_digest: scheduleDigest, reason },
        });
        return statusFromRow(this.#requiredScheduleRow(scheduleId));
      });
    });
  }

  close(): void {
    this.#database.close();
  }

  #scheduleRow(scheduleId: string): WorkflowSqlRow | null {
    return (this.#database.prepare(`
      SELECT schedule_id, project_id, runtime_binding_digest, schedule_json,
             schedule_digest, status, next_occurrence, updated_at, receipt_json
      FROM runtime_schedules WHERE schedule_id = ?
    `).get(scheduleId) as WorkflowSqlRow | undefined) ?? null;
  }

  #requiredScheduleRow(scheduleId: string): WorkflowSqlRow {
    const row = this.#scheduleRow(scheduleId);
    if (row === null) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "schedule_not_found");
    }
    return row;
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
