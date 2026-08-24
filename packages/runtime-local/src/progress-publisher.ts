import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type ProgressEvent,
  type RuntimeBinding,
  type RuntimeOperationVerifier,
  type RuntimeProgressPublisher,
} from "@contentmd/runtime-sdk";
import {
  appendWorkflowAudit,
  isRuntimeDigest,
  openWorkflowDatabase,
  requiredRowInteger,
  requiredRowString,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  type WorkflowSqlRow,
  withImmediateTransaction,
  workflowEffect,
} from "./runtime.js";

export interface LocalProgressPublisherOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly clock: () => string;
}

function validateEvent(event: ProgressEvent, binding: RuntimeBinding): void {
  requireRuntimeText(event.event_id, "progress_event_id_invalid");
  requireRuntimeText(event.operation_id, "progress_operation_id_invalid");
  requireRuntimeText(event.status, "progress_status_invalid");
  requireRuntimeText(event.message, "progress_message_invalid");
  requireRuntimeTime(event.occurred_at, "progress_occurred_at_invalid");
  if (event.schema_version !== "0.1.0"
    || event.project_id !== binding.project_id
    || event.runtime_binding_digest !== binding.descriptor_digest
    || !Number.isSafeInteger(event.sequence)
    || event.sequence < 1
    || !(event.predecessor_digest === null || isRuntimeDigest(event.predecessor_digest))
    || !isRuntimeDigest(event.event_digest)) {
    throw new RuntimeError("runtime_binding_not_authorized", "progress_contract_mismatch");
  }
  const { event_digest: supplied, ...preimage } = event;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "progress_digest_mismatch");
  }
}

export class LocalProgressPublisher implements RuntimeProgressPublisher {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #clock: () => string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalProgressPublisherOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_progress_events (
        event_id TEXT PRIMARY KEY,
        operation_id TEXT NOT NULL,
        project_id TEXT NOT NULL,
        runtime_binding_digest TEXT NOT NULL,
        sequence INTEGER NOT NULL CHECK (sequence >= 1),
        predecessor_digest TEXT,
        event_json TEXT NOT NULL,
        event_digest TEXT NOT NULL UNIQUE,
        UNIQUE (operation_id, sequence)
      );
    `);
  }

  publish(event: ProgressEvent, operation: AuthorizedRuntimeOperation): Promise<void> {
    return this.#exclusive(async () => {
      validateEvent(event, this.#binding);
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.progress",
        method: "publish",
        action: "runtime.progress.publish",
        resources: [{ resource_id: event.operation_id, content_digest: event.event_digest }],
        effect_input: event,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      withImmediateTransaction(this.#database, () => {
        const existingById = this.#database.prepare(`
          SELECT event_json, event_digest FROM runtime_progress_events WHERE event_id = ?
        `).get(event.event_id) as WorkflowSqlRow | undefined;
        if (existingById !== undefined) {
          if (requiredRowString(existingById, "event_digest") !== event.event_digest
            || requiredRowString(existingById, "event_json") !== canonicalJson(event)) {
            throw new RuntimeError("event_id_digest_conflict", "progress_event_id_digest_conflict");
          }
          return;
        }
        const occupied = this.#database.prepare(`
          SELECT event_id FROM runtime_progress_events
          WHERE operation_id = ? AND sequence = ?
        `).get(event.operation_id, event.sequence) as WorkflowSqlRow | undefined;
        if (occupied !== undefined) {
          throw new RuntimeError("event_id_digest_conflict", "progress_sequence_conflict");
        }
        const head = this.#database.prepare(`
          SELECT sequence, event_digest FROM runtime_progress_events
          WHERE operation_id = ? ORDER BY sequence DESC LIMIT 1
        `).get(event.operation_id) as WorkflowSqlRow | undefined;
        const expectedSequence = head === undefined ? 1 : requiredRowInteger(head, "sequence") + 1;
        const expectedPredecessor = head === undefined ? null : requiredRowString(head, "event_digest");
        if (event.sequence !== expectedSequence || event.predecessor_digest !== expectedPredecessor) {
          throw new RuntimeError("runtime_canonical_commit_unavailable", "progress_sequence_gap");
        }
        this.#database.prepare(`
          INSERT INTO runtime_progress_events (
            event_id, operation_id, project_id, runtime_binding_digest,
            sequence, predecessor_digest, event_json, event_digest
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          event.event_id,
          event.operation_id,
          event.project_id,
          event.runtime_binding_digest,
          event.sequence,
          event.predecessor_digest,
          canonicalJson(event),
          event.event_digest,
        );
        appendWorkflowAudit(this.#database, {
          service: "runtime.progress",
          resource_id: event.operation_id,
          from_status: head === undefined ? null : `sequence-${expectedSequence - 1}`,
          to_status: `sequence-${event.sequence}`,
          occurred_at: this.#clock(),
          transition_input: {
            event_id: event.event_id,
            event_digest: event.event_digest,
            predecessor_digest: event.predecessor_digest,
          },
        });
      });
    });
  }

  close(): void {
    this.#database.close();
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
