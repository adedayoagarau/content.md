import { DatabaseSync, type SQLOutputValue } from "node:sqlite";
import {
  assertRecordId,
  canonicalJson,
  sha256Canonical,
} from "@contentmd/core";
import {
  decodeEventExport,
  encodeEventExport,
} from "./export.js";
import type {
  AppendEventCommand,
  AppendOnlyEventStore,
  EventStoreOptions,
  Projector,
  StoredEvent,
  StreamHead,
} from "./event-store.js";
import { rebuildProjection } from "./projector.js";

type SqlRow = Record<string, SQLOutputValue>;

interface EventPreimage {
  event_id: string;
  stream_id: string;
  sequence: number;
  schema_version: "0.1.0";
  event_type: string;
  occurred_at: string;
  actor_ref: string;
  data_class: string;
  payload: unknown;
  predecessor_digest: string | null;
}

function requiredString(row: SqlRow, key: string): string {
  const value = row[key];
  if (typeof value !== "string") throw new TypeError(`invalid_sql_row:${key}`);
  return value;
}

function optionalString(row: SqlRow, key: string): string | null {
  const value = row[key];
  if (value === null) return null;
  if (typeof value !== "string") throw new TypeError(`invalid_sql_row:${key}`);
  return value;
}

function eventFromRow(row: SqlRow): StoredEvent {
  const sequence = row.sequence;
  if (typeof sequence !== "number" || !Number.isInteger(sequence)) {
    throw new TypeError("invalid_sql_row:sequence");
  }
  return {
    event_id: requiredString(row, "event_id"),
    stream_id: requiredString(row, "stream_id"),
    sequence,
    schema_version: "0.1.0",
    event_type: requiredString(row, "event_type"),
    occurred_at: requiredString(row, "occurred_at"),
    actor_ref: requiredString(row, "actor_ref"),
    data_class: requiredString(row, "data_class"),
    payload: JSON.parse(requiredString(row, "payload_json")) as unknown,
    predecessor_digest: optionalString(row, "predecessor_digest"),
    event_digest: requiredString(row, "event_digest"),
  };
}

function headFromRow(row: SqlRow | undefined): StreamHead | null {
  if (row === undefined) return null;
  const sequence = row.sequence;
  if (typeof sequence !== "number" || !Number.isInteger(sequence)) {
    throw new TypeError("invalid_sql_row:sequence");
  }
  return {
    stream_id: requiredString(row, "stream_id"),
    sequence,
    event_id: requiredString(row, "event_id"),
    event_digest: requiredString(row, "event_digest"),
  };
}

export function assertSupportedSqliteRuntime(version = process.versions.node): void {
  const [majorText, minorText] = version.split(".");
  const major = Number(majorText);
  const minor = Number(minorText);
  if (major !== 24 || minor < 14) {
    throw new Error(`unsupported_runtime:node:${version}`);
  }
}

export class SqliteEventStore implements AppendOnlyEventStore {
  readonly #database: DatabaseSync;
  readonly #permittedDataClasses: Set<string>;

  constructor(path: string, options: EventStoreOptions) {
    assertSupportedSqliteRuntime(options.runtime_version);
    this.#permittedDataClasses = new Set(options.permitted_data_classes);
    this.#database = new DatabaseSync(path);
    this.#database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA trusted_schema = OFF;");
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS events (
        event_id TEXT PRIMARY KEY,
        stream_id TEXT NOT NULL,
        sequence INTEGER NOT NULL CHECK (sequence >= 1),
        schema_version TEXT NOT NULL CHECK (schema_version = '0.1.0'),
        event_type TEXT NOT NULL,
        occurred_at TEXT NOT NULL,
        actor_ref TEXT NOT NULL,
        data_class TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        predecessor_digest TEXT,
        event_digest TEXT NOT NULL UNIQUE,
        UNIQUE (stream_id, sequence)
      );
      CREATE TABLE IF NOT EXISTS stream_heads (
        stream_id TEXT PRIMARY KEY,
        sequence INTEGER NOT NULL,
        event_id TEXT NOT NULL,
        event_digest TEXT NOT NULL,
        FOREIGN KEY (event_id) REFERENCES events(event_id)
      );
      CREATE TABLE IF NOT EXISTS projection_checkpoints (
        projector_id TEXT PRIMARY KEY,
        event_digest TEXT NOT NULL,
        projection_digest TEXT NOT NULL
      );
    `);
  }

  async append(command: AppendEventCommand): Promise<StoredEvent> {
    assertRecordId(command.event_id);
    assertRecordId(command.stream_id);
    if (!this.#permittedDataClasses.has(command.data_class)) {
      throw new Error(`data_class_not_permitted:${command.data_class}`);
    }
    canonicalJson(command.payload);

    this.#database.exec("BEGIN IMMEDIATE");
    try {
      const duplicate = this.#database
        .prepare("SELECT event_id FROM events WHERE event_id = ?")
        .get(command.event_id);
      if (duplicate !== undefined) throw new Error(`duplicate_event_id:${command.event_id}`);

      const currentHead = headFromRow(
        this.#database
          .prepare("SELECT stream_id, sequence, event_id, event_digest FROM stream_heads WHERE stream_id = ?")
          .get(command.stream_id),
      );
      const currentDigest = currentHead?.event_digest ?? null;
      if (command.expected_head_digest !== currentDigest) {
        throw new Error(
          `stream_head_conflict:${command.stream_id}:expected=${command.expected_head_digest ?? "null"}:actual=${currentDigest ?? "null"}`,
        );
      }

      const preimage: EventPreimage = {
        event_id: command.event_id,
        stream_id: command.stream_id,
        sequence: (currentHead?.sequence ?? 0) + 1,
        schema_version: "0.1.0",
        event_type: command.event_type,
        occurred_at: command.occurred_at,
        actor_ref: command.actor_ref,
        data_class: command.data_class,
        payload: command.payload,
        predecessor_digest: currentDigest,
      };
      const stored: StoredEvent = {
        ...preimage,
        event_digest: sha256Canonical(preimage),
      };

      this.#database
        .prepare(`
          INSERT INTO events (
            event_id, stream_id, sequence, schema_version, event_type,
            occurred_at, actor_ref, data_class, payload_json,
            predecessor_digest, event_digest
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `)
        .run(
          stored.event_id,
          stored.stream_id,
          stored.sequence,
          stored.schema_version,
          stored.event_type,
          stored.occurred_at,
          stored.actor_ref,
          stored.data_class,
          canonicalJson(stored.payload),
          stored.predecessor_digest,
          stored.event_digest,
        );
      this.#database
        .prepare(`
          INSERT INTO stream_heads (stream_id, sequence, event_id, event_digest)
          VALUES (?, ?, ?, ?)
          ON CONFLICT(stream_id) DO UPDATE SET
            sequence = excluded.sequence,
            event_id = excluded.event_id,
            event_digest = excluded.event_digest
        `)
        .run(stored.stream_id, stored.sequence, stored.event_id, stored.event_digest);
      this.#database.exec("COMMIT");
      return stored;
    } catch (error) {
      this.#database.exec("ROLLBACK");
      throw error;
    }
  }

  async readStream(streamId: string, afterSequence = 0): Promise<StoredEvent[]> {
    assertRecordId(streamId);
    return this.#database
      .prepare(`
        SELECT event_id, stream_id, sequence, schema_version, event_type,
               occurred_at, actor_ref, data_class, payload_json,
               predecessor_digest, event_digest
        FROM events
        WHERE stream_id = ? AND sequence > ?
        ORDER BY sequence ASC
      `)
      .all(streamId, afterSequence)
      .map(eventFromRow);
  }

  async getHead(streamId: string): Promise<StreamHead | null> {
    assertRecordId(streamId);
    return headFromRow(
      this.#database
        .prepare("SELECT stream_id, sequence, event_id, event_digest FROM stream_heads WHERE stream_id = ?")
        .get(streamId),
    );
  }

  async rebuild<TState>(projector: Projector<TState>): Promise<TState> {
    return rebuildProjection(this.#readAll(), projector);
  }

  async exportCanonical(): Promise<Uint8Array> {
    return encodeEventExport(this.#readAll());
  }

  close(): void {
    this.#database.close();
  }

  #readAll(): StoredEvent[] {
    return this.#database
      .prepare(`
        SELECT event_id, stream_id, sequence, schema_version, event_type,
               occurred_at, actor_ref, data_class, payload_json,
               predecessor_digest, event_digest
        FROM events
        ORDER BY stream_id ASC, sequence ASC, event_id ASC
      `)
      .all()
      .map(eventFromRow);
  }

  static async importCanonical(
    path: string,
    bytes: Uint8Array,
    options: EventStoreOptions,
  ): Promise<SqliteEventStore> {
    const document = decodeEventExport(bytes);
    const store = new SqliteEventStore(path, options);
    try {
      for (const event of document.events) {
        const { event_digest: suppliedDigest, sequence: suppliedSequence, ...eventInput } = event;
        const appended = await store.append({
          event_id: eventInput.event_id,
          stream_id: eventInput.stream_id,
          event_type: eventInput.event_type,
          occurred_at: eventInput.occurred_at,
          actor_ref: eventInput.actor_ref,
          data_class: eventInput.data_class,
          payload: eventInput.payload,
          expected_head_digest: eventInput.predecessor_digest,
        });
        if (appended.sequence !== suppliedSequence || appended.event_digest !== suppliedDigest) {
          throw new Error(`event_import_integrity_failure:${event.event_id}`);
        }
      }
      return store;
    } catch (error) {
      store.close();
      throw error;
    }
  }
}
