import type { AuthorizedRuntimeOperation, BoundRuntimeRecordRef } from "./operation.js";
import type { StoredEvent } from "./event-store.js";

export interface ReplicaArtifactManifestEntry {
  readonly artifact_id: string;
  readonly media_type: string;
  readonly schema_id: string | null;
  readonly sha256_digest: string;
  readonly byte_count: number;
  readonly disposition: "required" | "optional";
  readonly export_permission: "permitted" | "forbidden";
  readonly parent_refs: readonly string[];
  readonly expected_receipt_class: string;
}

export interface ReplicaArtifactManifest {
  readonly schema_version: "0.1.0";
  readonly manifest_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly event_ref: BoundRuntimeRecordRef;
  readonly checkpoint_ref: BoundRuntimeRecordRef;
  readonly entries: readonly ReplicaArtifactManifestEntry[];
  readonly manifest_digest: string;
  readonly created_at: string;
}

export interface ReplicaCheckpoint {
  readonly schema_version: "0.1.0";
  readonly checkpoint_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly stream_id: string;
  readonly sequence: number;
  readonly head_digest: string;
  readonly manifest_digest: string;
  readonly checkpoint_digest: string;
  readonly issued_at: string;
}

export interface ReplicaStorageReceipt {
  readonly artifact_id: string;
  readonly sha256_digest: string;
  readonly byte_count: number;
  readonly receipt_class: string;
  readonly receipt_digest: string;
}

export interface ReplicaAck {
  readonly schema_version: "0.1.0";
  readonly ack_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly checkpoint: ReplicaCheckpoint;
  readonly manifest_ref: BoundRuntimeRecordRef;
  readonly manifest_digest: string;
  readonly entry_receipts: readonly ReplicaStorageReceipt[];
  readonly acknowledged_at: string;
  readonly ack_digest: string;
}

export interface EventBatch {
  readonly schema_version: "0.1.0";
  readonly batch_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly events: readonly StoredEvent[];
  readonly manifest: ReplicaArtifactManifest;
  readonly batch_digest: string;
}

export interface SyncReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly batch_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly accepted_event_refs: readonly string[];
  readonly rejected_event_refs: readonly string[];
  readonly checkpoint: ReplicaCheckpoint | null;
  readonly status: "accepted" | "rejected" | "conflict";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface SyncCursor {
  readonly schema_version: "0.1.0";
  readonly cursor_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly checkpoints: readonly Readonly<{ stream_id: string; sequence: number; head_digest: string }>[];
  readonly maximum_records: number;
  readonly cursor_digest: string;
}

export interface VerifiedEventBatch {
  readonly schema_version: "0.1.0";
  readonly batch: EventBatch;
  readonly source_checkpoint: ReplicaCheckpoint;
  readonly verification_status: "verified";
  readonly verified_at: string;
  readonly verification_digest: string;
}

export interface RuntimeSynchronizer {
  push(batch: EventBatch, operation: AuthorizedRuntimeOperation): Promise<SyncReceipt>;
  pull(cursor: SyncCursor, operation: AuthorizedRuntimeOperation): Promise<VerifiedEventBatch>;
  acknowledge(checkpoint: ReplicaCheckpoint, operation: AuthorizedRuntimeOperation): Promise<ReplicaAck>;
}
