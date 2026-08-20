export interface AppendEventCommand {
  event_id: string;
  stream_id: string;
  event_type: string;
  occurred_at: string;
  actor_ref: string;
  data_class: string;
  payload: unknown;
  expected_head_digest: string | null;
}

export interface StoredEvent {
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
  event_digest: string;
}

export interface StreamHead {
  stream_id: string;
  sequence: number;
  event_id: string;
  event_digest: string;
}

export interface Projector<TState> {
  initial(): TState;
  apply(state: TState, event: StoredEvent): TState;
}

export interface AppendOnlyEventStore {
  append(command: AppendEventCommand): Promise<StoredEvent>;
  readStream(streamId: string, afterSequence?: number): Promise<StoredEvent[]>;
  getHead(streamId: string): Promise<StreamHead | null>;
  rebuild<TState>(projector: Projector<TState>): Promise<TState>;
  exportCanonical(): Promise<Uint8Array>;
  close(): void;
}

export interface EventStoreOptions {
  permitted_data_classes: readonly string[];
  runtime_version?: string;
}
