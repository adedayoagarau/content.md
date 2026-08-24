import { DatabaseSync, type SQLOutputValue } from "node:sqlite";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  SqliteEventStore,
  type StoredEvent as MemoryStoredEvent,
} from "@contentmd/memory";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type BoundRuntimeResource,
  type EventBatch,
  type ReplicaAck,
  type ReplicaArtifactManifestEntry,
  type ReplicaCheckpoint,
  type ReplicaStorageReceipt,
  type RuntimeBinding,
  type RuntimeEffectRequest,
  type RuntimeOperationClaims,
  type RuntimeOperationVerifier,
  type RuntimeSynchronizer,
  type SyncCursor,
  type SyncReceipt,
  type VerifiedEventBatch,
} from "@contentmd/runtime-sdk";
import { resolveRuntimePath } from "./paths.js";

type SqlRow = Record<string, SQLOutputValue>;

export interface ReplicaArtifactRepository {
  verify(entry: ReplicaArtifactManifestEntry): Promise<ReplicaStorageReceipt | null>;
}

export interface LocalRuntimeSynchronizerOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly permitted_data_classes: readonly string[];
  readonly artifact_repository: ReplicaArtifactRepository;
  readonly clock: () => string;
}

interface StoredReplicaBatch {
  readonly batch: EventBatch;
  readonly checkpoint: ReplicaCheckpoint;
  readonly receipts: readonly ReplicaStorageReceipt[];
  readonly sync_receipt: SyncReceipt;
}

interface SemanticConflict {
  readonly existing: MemoryStoredEvent;
  readonly incoming: EventBatch["events"][number];
}

function requiredString(row: SqlRow, key: string): string {
  const value = row[key];
  if (typeof value !== "string") {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `replica_ledger_invalid:${key}`);
  }
  return value;
}

function utf8Compare(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function runtimeEffect(input: {
  readonly method: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly effect_input: unknown;
  readonly records: number;
  readonly runtime_binding_digest: string;
}): RuntimeEffectRequest {
  const preimage = {
    interface_id: "runtime.synchronizer",
    method: input.method,
    action: input.action,
    resources: input.resources,
    data_classes: input.data_classes,
    requested_limits: {
      calls: 1,
      bytes: Buffer.byteLength(canonicalJson(input.effect_input), "utf8"),
      duration_ms: 0,
      records: input.records,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    },
    runtime_binding_digest: input.runtime_binding_digest,
  };
  return { ...preimage, effect_digest: sha256Canonical(preimage) };
}

function requireClaimsBinding(claims: RuntimeOperationClaims, binding: RuntimeBinding): void {
  if (claims.project_ref !== binding.project_id
    || claims.runtime_binding_digest !== binding.descriptor_digest) {
    throw new RuntimeError("runtime_binding_not_authorized", "replica_binding_mismatch");
  }
}

function checkpointIdentityPreimage(input: {
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly stream_id: string;
  readonly sequence: number;
  readonly head_digest: string;
}) {
  return {
    contract_version: "contentmd.replica-checkpoint-identity/0.1.0",
    ...input,
  };
}

function verifyReceipt(
  entry: ReplicaArtifactManifestEntry,
  receipt: ReplicaStorageReceipt,
): void {
  const preimage = {
    artifact_id: receipt.artifact_id,
    sha256_digest: receipt.sha256_digest,
    byte_count: receipt.byte_count,
    receipt_class: receipt.receipt_class,
  };
  if (receipt.artifact_id !== entry.artifact_id
    || receipt.sha256_digest !== entry.sha256_digest
    || receipt.byte_count !== entry.byte_count
    || receipt.receipt_class !== entry.expected_receipt_class
    || receipt.receipt_digest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `artifact_receipt_invalid:${entry.artifact_id}`);
  }
}

function verifyEvent(event: EventBatch["events"][number]): void {
  const payloadDigest = sha256Canonical(event.payload);
  const preimage = {
    event_id: event.event_id,
    stream_id: event.stream_id,
    sequence: event.sequence,
    schema_version: event.schema_version,
    event_type: event.event_type,
    occurred_at: event.occurred_at,
    actor_ref: event.actor_ref,
    data_class: event.data_class,
    payload: event.payload,
    predecessor_digest: event.predecessor_digest,
  };
  if (event.schema_version !== "0.1.0"
    || event.payload_digest !== payloadDigest
    || event.event_digest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `replica_event_invalid:${event.event_id}`);
  }
}

function verifyCheckpoint(checkpoint: ReplicaCheckpoint): void {
  const { checkpoint_digest: suppliedDigest, ...preimage } = checkpoint;
  if (checkpoint.schema_version !== "0.1.0"
    || suppliedDigest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_checkpoint_invalid");
  }
}

function parseStoredBatch(row: SqlRow): StoredReplicaBatch {
  const batch = JSON.parse(requiredString(row, "batch_json")) as EventBatch;
  const checkpoint = JSON.parse(requiredString(row, "checkpoint_json")) as ReplicaCheckpoint;
  const receipts = JSON.parse(requiredString(row, "receipts_json")) as ReplicaStorageReceipt[];
  const syncReceipt = JSON.parse(requiredString(row, "sync_receipt_json")) as SyncReceipt;
  return { batch, checkpoint, receipts, sync_receipt: syncReceipt };
}

export class LocalRuntimeSynchronizer implements RuntimeSynchronizer {
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #permittedDataClasses: readonly string[];
  readonly #artifacts: ReplicaArtifactRepository;
  readonly #clock: () => string;
  readonly #events: SqliteEventStore;
  readonly #database: DatabaseSync;

  constructor(options: LocalRuntimeSynchronizerOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#permittedDataClasses = [...options.permitted_data_classes];
    this.#artifacts = options.artifact_repository;
    this.#clock = options.clock;
    const eventsPath = resolveRuntimePath(options.project_root, ".contentmd/runtime/events.sqlite");
    const runtimePath = resolveRuntimePath(options.project_root, ".contentmd/runtime/runtime.sqlite");
    mkdirSync(dirname(eventsPath), { recursive: true, mode: 0o700 });
    this.#events = new SqliteEventStore(eventsPath, {
      permitted_data_classes: this.#permittedDataClasses,
    });
    this.#database = new DatabaseSync(runtimePath);
    this.#database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA trusted_schema = OFF;");
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_replica_batches (
        batch_id TEXT PRIMARY KEY,
        batch_digest TEXT NOT NULL,
        stream_id TEXT NOT NULL,
        sequence INTEGER NOT NULL,
        head_digest TEXT NOT NULL,
        checkpoint_digest TEXT NOT NULL UNIQUE,
        batch_json TEXT NOT NULL,
        checkpoint_json TEXT NOT NULL,
        receipts_json TEXT NOT NULL,
        sync_receipt_json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_replica_acknowledgements (
        checkpoint_digest TEXT PRIMARY KEY,
        ack_digest TEXT NOT NULL UNIQUE,
        ack_json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_replica_conflicts (
        batch_id TEXT PRIMARY KEY,
        batch_digest TEXT NOT NULL,
        conflict_event_id TEXT NOT NULL UNIQUE,
        sync_receipt_json TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_replica_inbox (
        ordinal INTEGER PRIMARY KEY AUTOINCREMENT,
        batch_id TEXT NOT NULL UNIQUE,
        batch_digest TEXT NOT NULL,
        received_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_replica_outbox (
        ordinal INTEGER PRIMARY KEY AUTOINCREMENT,
        batch_id TEXT NOT NULL UNIQUE,
        checkpoint_digest TEXT NOT NULL UNIQUE,
        ack_digest TEXT NOT NULL UNIQUE,
        ready_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_replica_cursors (
        cursor_id TEXT PRIMARY KEY,
        cursor_digest TEXT NOT NULL,
        checkpoints_json TEXT NOT NULL,
        maximum_records INTEGER NOT NULL,
        recorded_at TEXT NOT NULL
      );
    `);
  }

  async push(batch: EventBatch, operation: AuthorizedRuntimeOperation): Promise<SyncReceipt> {
    const resources = [{ resource_id: batch.batch_id, content_digest: batch.batch_digest }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "push",
      action: "runtime.sync.push",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: batch,
      records: batch.events.length + batch.manifest.entries.length,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    this.#verifyBatchEnvelope(batch);

    const existing = this.#loadBatchById(batch.batch_id);
    if (existing !== null) {
      if (existing.batch.batch_digest !== batch.batch_digest
        || canonicalJson(existing.batch) !== canonicalJson(batch)) {
        throw new RuntimeError("runtime_replica_fork_detected", `batch_id_conflict:${batch.batch_id}`);
      }
      return existing.sync_receipt;
    }
    const existingConflict = this.#loadConflictReceipt(batch.batch_id, batch.batch_digest);
    if (existingConflict !== null) return existingConflict;

    const receipts: ReplicaStorageReceipt[] = [];
    for (const manifestEntry of batch.manifest.entries) {
      if (manifestEntry.disposition === "required"
        && manifestEntry.export_permission === "forbidden") {
        throw new RuntimeError("runtime_export_incomplete", `required_artifact_forbidden:${manifestEntry.artifact_id}`);
      }
      const receipt = await this.#artifacts.verify(manifestEntry);
      if (receipt === null) {
        if (manifestEntry.disposition === "required") {
          throw new RuntimeError("runtime_export_incomplete", `artifact_unavailable:${manifestEntry.artifact_id}`);
        }
        continue;
      }
      verifyReceipt(manifestEntry, receipt);
      receipts.push(receipt);
    }

    const semanticConflict = await this.#findSemanticConflict(batch.events);
    if (semanticConflict !== null) {
      return this.#recordSemanticConflict(batch, semanticConflict);
    }

    await this.#verifySequence(batch.events);
    const storedEvents = await this.#events.appendTransaction({
      transaction_id: batch.batch_id,
      commands: batch.events.map((event) => ({
        event_id: event.event_id,
        stream_id: event.stream_id,
        event_type: event.event_type,
        occurred_at: event.occurred_at,
        actor_ref: event.actor_ref,
        data_class: event.data_class,
        payload: event.payload,
        expected_head_digest: event.predecessor_digest,
      })),
    });
    if (canonicalJson(storedEvents) !== canonicalJson(batch.events)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_event_readback_mismatch");
    }

    const lastEvent = batch.events.at(-1)!;
    const checkpoint = this.#checkpointFor(lastEvent, batch.manifest.manifest_digest);
    const receipt = this.#syncReceipt(batch, checkpoint);
    this.#database.exec("BEGIN IMMEDIATE");
    try {
      this.#database.prepare(`
        INSERT INTO runtime_replica_batches (
          batch_id, batch_digest, stream_id, sequence, head_digest,
          checkpoint_digest, batch_json, checkpoint_json,
          receipts_json, sync_receipt_json
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        batch.batch_id,
        batch.batch_digest,
        checkpoint.stream_id,
        checkpoint.sequence,
        checkpoint.head_digest,
        checkpoint.checkpoint_digest,
        canonicalJson(batch),
        canonicalJson(checkpoint),
        canonicalJson(receipts),
        canonicalJson(receipt),
      );
      this.#database.prepare(`
        INSERT INTO runtime_replica_inbox (batch_id, batch_digest, received_at)
        VALUES (?, ?, ?)
      `).run(batch.batch_id, batch.batch_digest, this.#clock());
      this.#database.exec("COMMIT");
    } catch (error) {
      this.#database.exec("ROLLBACK");
      throw error;
    }
    return receipt;
  }

  async pull(cursor: SyncCursor, operation: AuthorizedRuntimeOperation): Promise<VerifiedEventBatch> {
    const resources = [{ resource_id: cursor.cursor_id, content_digest: cursor.cursor_digest }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "pull",
      action: "runtime.sync.pull",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: cursor,
      records: cursor.maximum_records,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    const { cursor_digest: suppliedDigest, ...preimage } = cursor;
    if (cursor.schema_version !== "0.1.0"
      || cursor.project_id !== this.#binding.project_id
      || cursor.runtime_binding_digest !== this.#binding.descriptor_digest
      || suppliedDigest !== sha256Canonical(preimage)) {
      throw new RuntimeError("runtime_binding_not_authorized", "sync_cursor_invalid");
    }
    this.#validateCursorCheckpoints(cursor);
    this.#recordCursor(cursor);
    const checkpointByStream = new Map(cursor.checkpoints.map((item) => [item.stream_id, item.sequence]));
    const rows = this.#database.prepare(`
      SELECT b.batch_json, b.checkpoint_json, b.receipts_json, b.sync_receipt_json
      FROM runtime_replica_batches b
      INNER JOIN runtime_replica_outbox o
        ON o.checkpoint_digest = b.checkpoint_digest
      ORDER BY b.sequence ASC, b.batch_id ASC
    `).all() as SqlRow[];
    const stored = rows
      .map(parseStoredBatch)
      .find((item) => item.checkpoint.sequence > (checkpointByStream.get(item.checkpoint.stream_id) ?? 0));
    if (stored === undefined) {
      const pending = (this.#database.prepare(`
        SELECT batch_json, checkpoint_json, receipts_json, sync_receipt_json
        FROM runtime_replica_batches ORDER BY sequence ASC, batch_id ASC
      `).all() as SqlRow[])
        .map(parseStoredBatch)
        .some((item) => item.checkpoint.sequence > (checkpointByStream.get(item.checkpoint.stream_id) ?? 0));
      if (pending) {
        throw new RuntimeError("runtime_replica_acknowledgement_missing", "outbox_batch_not_acknowledged");
      }
      throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_batch_unavailable");
    }
    if (stored.batch.events.length > cursor.maximum_records) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_batch_exceeds_cursor_limit");
    }
    this.#verifyBatchEnvelope(stored.batch);
    verifyCheckpoint(stored.checkpoint);
    const verifiedAt = this.#clock();
    const verificationPreimage = {
      schema_version: "0.1.0" as const,
      batch: stored.batch,
      source_checkpoint: stored.checkpoint,
      verification_status: "verified" as const,
      verified_at: verifiedAt,
    };
    return {
      ...verificationPreimage,
      verification_digest: sha256Canonical(verificationPreimage),
    };
  }

  async acknowledge(
    checkpoint: ReplicaCheckpoint,
    operation: AuthorizedRuntimeOperation,
  ): Promise<ReplicaAck> {
    const resources = [{
      resource_id: checkpoint.checkpoint_id,
      content_digest: checkpoint.checkpoint_digest,
    }];
    const stored = this.#loadBatchByCheckpoint(checkpoint.checkpoint_digest);
    const recordCount = (stored?.receipts.length ?? 0) + 1;
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "acknowledge",
      action: "runtime.sync.acknowledge",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: checkpoint,
      records: recordCount,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    verifyCheckpoint(checkpoint);
    if (stored === null || canonicalJson(stored.checkpoint) !== canonicalJson(checkpoint)) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "checkpoint_not_committed");
    }
    const prior = this.#database.prepare(
      "SELECT ack_json FROM runtime_replica_acknowledgements WHERE checkpoint_digest = ?",
    ).get(checkpoint.checkpoint_digest) as SqlRow | undefined;
    if (prior !== undefined) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "acknowledgement_replayed");
    }
    if (stored.receipts.length !== stored.batch.manifest.entries.length) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "artifact_receipts_incomplete");
    }
    const acknowledgedAt = this.#clock();
    const identity = {
      contract_version: "contentmd.replica-ack-identity/0.1.0",
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      checkpoint_digest: checkpoint.checkpoint_digest,
      manifest_digest: stored.batch.manifest.manifest_digest,
    };
    const ackPreimage = {
      schema_version: "0.1.0" as const,
      ack_id: `replica-ack.${sha256Canonical(identity)}`,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      checkpoint,
      manifest_ref: {
        record_id: stored.batch.manifest.manifest_id,
        record_version: 1,
        content_digest: stored.batch.manifest.manifest_digest,
      },
      manifest_digest: stored.batch.manifest.manifest_digest,
      entry_receipts: stored.receipts,
      acknowledged_at: acknowledgedAt,
    };
    const ack: ReplicaAck = { ...ackPreimage, ack_digest: sha256Canonical(ackPreimage) };
    this.#database.exec("BEGIN IMMEDIATE");
    try {
      this.#database.prepare(`
        INSERT INTO runtime_replica_acknowledgements (checkpoint_digest, ack_digest, ack_json)
        VALUES (?, ?, ?)
      `).run(checkpoint.checkpoint_digest, ack.ack_digest, canonicalJson(ack));
      this.#database.prepare(`
        INSERT INTO runtime_replica_outbox (
          batch_id, checkpoint_digest, ack_digest, ready_at
        ) VALUES (?, ?, ?, ?)
      `).run(
        stored.batch.batch_id,
        checkpoint.checkpoint_digest,
        ack.ack_digest,
        acknowledgedAt,
      );
      this.#database.exec("COMMIT");
    } catch (error) {
      this.#database.exec("ROLLBACK");
      throw error;
    }
    return ack;
  }

  async readAcknowledgement(
    checkpoint: ReplicaCheckpoint,
    operation: AuthorizedRuntimeOperation,
  ): Promise<ReplicaAck> {
    const resources = [{
      resource_id: checkpoint.checkpoint_id,
      content_digest: checkpoint.checkpoint_digest,
    }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect({
      method: "readAcknowledgement",
      action: "runtime.sync.read-acknowledgement",
      resources,
      data_classes: this.#permittedDataClasses,
      effect_input: checkpoint,
      records: 1,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireClaimsBinding(claims, this.#binding);
    verifyCheckpoint(checkpoint);
    const row = this.#database.prepare(`
      SELECT ack_json FROM runtime_replica_acknowledgements WHERE checkpoint_digest = ?
    `).get(checkpoint.checkpoint_digest) as SqlRow | undefined;
    if (row === undefined) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "acknowledgement_not_found");
    }
    const acknowledgement = JSON.parse(requiredString(row, "ack_json")) as ReplicaAck;
    const { ack_digest: suppliedDigest, ...preimage } = acknowledgement;
    if (suppliedDigest !== sha256Canonical(preimage)
      || canonicalJson(acknowledgement.checkpoint) !== canonicalJson(checkpoint)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "acknowledgement_readback_invalid");
    }
    return acknowledgement;
  }

  close(): void {
    this.#events.close();
    this.#database.close();
  }

  #verifyBatchEnvelope(batch: EventBatch): void {
    if (batch.schema_version !== "0.1.0"
      || batch.project_id !== this.#binding.project_id
      || batch.runtime_binding_digest !== this.#binding.descriptor_digest
      || batch.events.length === 0
      || new Set(batch.events.map((event) => event.stream_id)).size !== 1) {
      throw new RuntimeError("runtime_binding_not_authorized", "replica_batch_contract_mismatch");
    }
    const { batch_digest: suppliedBatchDigest, ...batchPreimage } = batch;
    if (suppliedBatchDigest !== sha256Canonical(batchPreimage)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_batch_digest_mismatch");
    }
    for (const event of batch.events) verifyEvent(event);
    const entries = batch.manifest.entries;
    const sortedEntries = [...entries].sort((left, right) => utf8Compare(left.artifact_id, right.artifact_id));
    if (canonicalJson(entries) !== canonicalJson(sortedEntries)
      || new Set(entries.map((item) => item.artifact_id)).size !== entries.length) {
      throw new RuntimeError("runtime_export_incomplete", "artifact_manifest_not_canonical");
    }
    const entryIds = new Set(entries.map((item) => item.artifact_id));
    for (const item of entries) {
      if (item.parent_refs.some((parent) => !entryIds.has(parent))) {
        throw new RuntimeError("runtime_export_incomplete", `artifact_closure_incomplete:${item.artifact_id}`);
      }
    }
    const { manifest_digest: suppliedManifestDigest, ...manifestPreimage } = batch.manifest;
    if (batch.manifest.schema_version !== "0.1.0"
      || batch.manifest.project_id !== this.#binding.project_id
      || batch.manifest.runtime_binding_digest !== this.#binding.descriptor_digest
      || suppliedManifestDigest !== sha256Canonical(manifestPreimage)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "artifact_manifest_digest_mismatch");
    }
    const lastEvent = batch.events.at(-1)!;
    const eventRef = batch.manifest.event_ref;
    if (eventRef.record_id !== lastEvent.event_id
      || eventRef.record_version !== 1
      || eventRef.content_digest !== lastEvent.event_digest) {
      throw new RuntimeError("runtime_export_incomplete", "artifact_manifest_event_mismatch");
    }
    const checkpointIdentity = checkpointIdentityPreimage({
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      stream_id: lastEvent.stream_id,
      sequence: lastEvent.sequence,
      head_digest: lastEvent.event_digest,
    });
    const checkpointIdentityDigest = sha256Canonical(checkpointIdentity);
    if (batch.manifest.checkpoint_ref.record_id !== `replica-checkpoint.${checkpointIdentityDigest}`
      || batch.manifest.checkpoint_ref.record_version !== 1
      || batch.manifest.checkpoint_ref.content_digest !== checkpointIdentityDigest) {
      throw new RuntimeError("runtime_export_incomplete", "artifact_manifest_checkpoint_mismatch");
    }
    const manifestIdentity = {
      contract_version: "contentmd.replica-artifact-manifest-identity/0.1.0",
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_ref: batch.manifest.event_ref,
      checkpoint_ref: batch.manifest.checkpoint_ref,
      entries,
    };
    if (batch.manifest.manifest_id !== `replica-manifest.${sha256Canonical(manifestIdentity)}`) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "artifact_manifest_id_mismatch");
    }
  }

  async #verifySequence(events: readonly EventBatch["events"][number][]): Promise<void> {
    let head = await this.#events.getHead(events[0]!.stream_id);
    for (const event of events) {
      const expectedSequence = (head?.sequence ?? 0) + 1;
      if (event.sequence > expectedSequence) {
        throw new RuntimeError("runtime_replica_gap_detected", event.stream_id);
      }
      if (event.sequence < expectedSequence) {
        const existing = await this.#events.getEvent(event.event_id);
        if (existing === null || canonicalJson(existing) !== canonicalJson(event)) {
          throw new RuntimeError("runtime_replica_fork_detected", event.stream_id);
        }
        head = existing;
        continue;
      }
      if (event.predecessor_digest !== (head?.event_digest ?? null)) {
        throw new RuntimeError("runtime_replica_fork_detected", event.stream_id);
      }
      head = event as MemoryStoredEvent;
    }
  }

  #checkpointFor(event: EventBatch["events"][number], manifestDigest: string): ReplicaCheckpoint {
    const identityDigest = sha256Canonical(checkpointIdentityPreimage({
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      stream_id: event.stream_id,
      sequence: event.sequence,
      head_digest: event.event_digest,
    }));
    const preimage = {
      schema_version: "0.1.0" as const,
      checkpoint_id: `replica-checkpoint.${identityDigest}`,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      stream_id: event.stream_id,
      sequence: event.sequence,
      head_digest: event.event_digest,
      manifest_digest: manifestDigest,
      issued_at: this.#clock(),
    };
    return { ...preimage, checkpoint_digest: sha256Canonical(preimage) };
  }

  #syncReceipt(batch: EventBatch, checkpoint: ReplicaCheckpoint): SyncReceipt {
    const issuedAt = this.#clock();
    const identity = {
      contract_version: "contentmd.sync-receipt-identity/0.1.0",
      batch_id: batch.batch_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      checkpoint_digest: checkpoint.checkpoint_digest,
    };
    const preimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `sync-receipt.${sha256Canonical(identity)}`,
      batch_id: batch.batch_id,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      accepted_event_refs: batch.events.map((event) => event.event_id),
      rejected_event_refs: [] as string[],
      checkpoint,
      status: "accepted" as const,
      issued_at: issuedAt,
    };
    return { ...preimage, receipt_digest: sha256Canonical(preimage) };
  }

  async #findSemanticConflict(
    events: readonly EventBatch["events"][number][],
  ): Promise<SemanticConflict | null> {
    for (const incoming of events) {
      const head = await this.#events.getHead(incoming.stream_id);
      if (head === null || incoming.sequence > head.sequence) continue;
      const existing = (await this.#events.readStream(
        incoming.stream_id,
        Math.max(0, incoming.sequence - 1),
      ))[0];
      if (existing === undefined || canonicalJson(existing) === canonicalJson(incoming)) continue;
      if (this.#isSemanticEvent(existing.event_type) || this.#isSemanticEvent(incoming.event_type)) {
        return { existing, incoming };
      }
    }
    return null;
  }

  #isSemanticEvent(eventType: string): boolean {
    return /(decision|approval|policy|grant|authorization|binding|promotion)/u.test(eventType);
  }

  async #recordSemanticConflict(
    batch: EventBatch,
    conflict: SemanticConflict,
  ): Promise<SyncReceipt> {
    const identity = {
      contract_version: "contentmd.runtime-replica-semantic-conflict/0.1.0",
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      batch_id: batch.batch_id,
      existing_event_digest: conflict.existing.event_digest,
      incoming_event_digest: conflict.incoming.event_digest,
    };
    const conflictIdDigest = sha256Canonical(identity);
    const conflictStream = "stream.runtime.conflicts";
    const conflictHead = await this.#events.getHead(conflictStream);
    const conflictEvent = await this.#events.append({
      event_id: `event.replica-conflict.${conflictIdDigest}`,
      stream_id: conflictStream,
      event_type: "runtime_replica_semantic_conflict_recorded",
      occurred_at: this.#clock(),
      actor_ref: "runtime.local.synchronizer",
      data_class: "runtime-metadata",
      payload: {
        project_id: this.#binding.project_id,
        runtime_binding_digest: this.#binding.descriptor_digest,
        batch_id: batch.batch_id,
        existing_event_ref: conflict.existing.event_id,
        existing_event_digest: conflict.existing.event_digest,
        incoming_event_ref: conflict.incoming.event_id,
        incoming_event_digest: conflict.incoming.event_digest,
        resolution: "explicit_resolving_event_required",
      },
      expected_head_digest: conflictHead?.event_digest ?? null,
    });
    const issuedAt = this.#clock();
    const receiptIdentity = {
      contract_version: "contentmd.sync-conflict-receipt-identity/0.1.0",
      batch_id: batch.batch_id,
      conflict_event_digest: conflictEvent.event_digest,
      runtime_binding_digest: this.#binding.descriptor_digest,
    };
    const receiptPreimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `sync-receipt.${sha256Canonical(receiptIdentity)}`,
      batch_id: batch.batch_id,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      accepted_event_refs: [] as string[],
      rejected_event_refs: batch.events.map((event) => event.event_id),
      checkpoint: null,
      status: "conflict" as const,
      issued_at: issuedAt,
    };
    const receipt: SyncReceipt = {
      ...receiptPreimage,
      receipt_digest: sha256Canonical(receiptPreimage),
    };
    this.#database.prepare(`
      INSERT INTO runtime_replica_conflicts (
        batch_id, batch_digest, conflict_event_id, sync_receipt_json
      ) VALUES (?, ?, ?, ?)
    `).run(
      batch.batch_id,
      batch.batch_digest,
      conflictEvent.event_id,
      canonicalJson(receipt),
    );
    return receipt;
  }

  #loadBatchById(batchId: string): StoredReplicaBatch | null {
    const row = this.#database.prepare(`
      SELECT batch_json, checkpoint_json, receipts_json, sync_receipt_json
      FROM runtime_replica_batches WHERE batch_id = ?
    `).get(batchId) as SqlRow | undefined;
    return row === undefined ? null : parseStoredBatch(row);
  }

  #loadBatchByCheckpoint(checkpointDigest: string): StoredReplicaBatch | null {
    const row = this.#database.prepare(`
      SELECT batch_json, checkpoint_json, receipts_json, sync_receipt_json
      FROM runtime_replica_batches WHERE checkpoint_digest = ?
    `).get(checkpointDigest) as SqlRow | undefined;
    return row === undefined ? null : parseStoredBatch(row);
  }

  #loadConflictReceipt(batchId: string, batchDigest: string): SyncReceipt | null {
    const row = this.#database.prepare(`
      SELECT batch_digest, sync_receipt_json
      FROM runtime_replica_conflicts WHERE batch_id = ?
    `).get(batchId) as SqlRow | undefined;
    if (row === undefined) return null;
    if (requiredString(row, "batch_digest") !== batchDigest) {
      throw new RuntimeError("runtime_replica_fork_detected", `conflict_batch_id_reused:${batchId}`);
    }
    return JSON.parse(requiredString(row, "sync_receipt_json")) as SyncReceipt;
  }

  #validateCursorCheckpoints(cursor: SyncCursor): void {
    const sorted = [...cursor.checkpoints]
      .sort((left, right) => utf8Compare(left.stream_id, right.stream_id));
    if (new Set(cursor.checkpoints.map((item) => item.stream_id)).size !== cursor.checkpoints.length
      || canonicalJson(sorted) !== canonicalJson(cursor.checkpoints)) {
      throw new RuntimeError("runtime_binding_not_authorized", "sync_cursor_checkpoints_noncanonical");
    }
    for (const requested of cursor.checkpoints) {
      if (!Number.isSafeInteger(requested.sequence) || requested.sequence < 0) {
        throw new RuntimeError("runtime_binding_not_authorized", "sync_cursor_sequence_invalid");
      }
      const latest = this.#database.prepare(`
        SELECT sequence, head_digest FROM runtime_replica_batches
        WHERE stream_id = ? ORDER BY sequence DESC LIMIT 1
      `).get(requested.stream_id) as SqlRow | undefined;
      if (latest === undefined) {
        if (requested.sequence !== 0) {
          throw new RuntimeError("runtime_replica_gap_detected", requested.stream_id);
        }
        continue;
      }
      const latestSequence = latest.sequence;
      if (typeof latestSequence !== "number" || !Number.isSafeInteger(latestSequence)) {
        throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_ledger_sequence_invalid");
      }
      if (requested.sequence > latestSequence) {
        throw new RuntimeError("runtime_replica_gap_detected", requested.stream_id);
      }
      if (requested.sequence === 0) continue;
      const matching = this.#database.prepare(`
        SELECT head_digest FROM runtime_replica_batches
        WHERE stream_id = ? AND sequence = ?
      `).get(requested.stream_id, requested.sequence) as SqlRow | undefined;
      if (matching === undefined) {
        throw new RuntimeError("runtime_replica_gap_detected", requested.stream_id);
      }
      if (requiredString(matching, "head_digest") !== requested.head_digest) {
        throw new RuntimeError("runtime_replica_fork_detected", requested.stream_id);
      }
    }
  }

  #recordCursor(cursor: SyncCursor): void {
    const existing = this.#database.prepare(`
      SELECT cursor_digest FROM runtime_replica_cursors WHERE cursor_id = ?
    `).get(cursor.cursor_id) as SqlRow | undefined;
    if (existing !== undefined) {
      if (requiredString(existing, "cursor_digest") !== cursor.cursor_digest) {
        throw new RuntimeError("runtime_replica_fork_detected", "cursor_id_conflict");
      }
      return;
    }
    this.#database.prepare(`
      INSERT INTO runtime_replica_cursors (
        cursor_id, cursor_digest, checkpoints_json, maximum_records, recorded_at
      ) VALUES (?, ?, ?, ?, ?)
    `).run(
      cursor.cursor_id,
      cursor.cursor_digest,
      canonicalJson(cursor.checkpoints),
      cursor.maximum_records,
      this.#clock(),
    );
  }
}
