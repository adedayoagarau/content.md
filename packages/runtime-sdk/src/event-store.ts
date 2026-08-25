import type { RuntimeBinding } from "./descriptor.js";
import type { AuthorizedRuntimeOperation } from "./operation.js";

export interface AppendEventCommand {
  readonly event_id: string;
  readonly stream_id: string;
  readonly event_type: string;
  readonly occurred_at: string;
  readonly actor_ref: string;
  readonly data_class: string;
  readonly payload: unknown;
  readonly expected_head_digest: string | null;
}

export interface AppendEventTransaction {
  readonly transaction_id: string;
  readonly commands: readonly AppendEventCommand[];
}

export interface StoredEvent {
  readonly event_id: string;
  readonly stream_id: string;
  readonly sequence: number;
  readonly schema_version: "0.1.0";
  readonly event_type: string;
  readonly occurred_at: string;
  readonly actor_ref: string;
  readonly data_class: string;
  readonly payload: unknown;
  readonly payload_digest: string;
  readonly predecessor_digest: string | null;
  readonly event_digest: string;
}

export interface EventTransactionReceipt {
  readonly schema_version: "0.1.0";
  readonly transaction_id: string;
  readonly runtime_binding_digest: string;
  readonly event_refs: readonly string[];
  readonly transaction_digest: string;
  readonly status: "committed";
  readonly committed_at: string;
  readonly receipt_digest: string;
}

export interface EventStreamQuery {
  readonly stream_id: string;
  readonly after_sequence: number;
  readonly maximum_records: number;
}

export interface StreamHead {
  readonly stream_id: string;
  readonly sequence: number;
  readonly event_id: string;
  readonly event_digest: string;
}

export interface Projector<TState> {
  readonly projector_id: string;
  initial(): TState;
  apply(state: TState, event: StoredEvent): TState;
}

export interface EventExportRequest {
  readonly schema_version: "0.1.0";
  readonly export_id: string;
  readonly project_id: string;
  readonly stream_ids: readonly string[];
  readonly after_checkpoints: readonly Readonly<{ stream_id: string; sequence: number }>[];
  readonly requested_at: string;
  readonly request_digest: string;
}

export interface VerifiedBytes {
  readonly schema_version: "0.1.0";
  readonly artifact_id: string;
  readonly media_type: string;
  readonly byte_count: number;
  readonly sha256_digest: string;
  readonly bytes: Uint8Array;
}

export interface AuthorizedAppendOnlyEventStore {
  append(command: AppendEventCommand, operation: AuthorizedRuntimeOperation): Promise<StoredEvent>;
  appendTransaction(
    transaction: AppendEventTransaction,
    operation: AuthorizedRuntimeOperation,
  ): Promise<EventTransactionReceipt>;
  readStream(
    query: EventStreamQuery,
    operation: AuthorizedRuntimeOperation,
  ): Promise<readonly StoredEvent[]>;
  getHead(streamId: string, operation: AuthorizedRuntimeOperation): Promise<StreamHead | null>;
  rebuild<T>(projector: Projector<T>, operation: AuthorizedRuntimeOperation): Promise<T>;
  exportCanonical(
    request: EventExportRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<VerifiedBytes>;
  close(operation: AuthorizedRuntimeOperation): Promise<void>;
}

export interface RuntimeEventStoreFactory {
  open(
    binding: RuntimeBinding,
    operation: AuthorizedRuntimeOperation,
  ): Promise<AuthorizedAppendOnlyEventStore>;
}
