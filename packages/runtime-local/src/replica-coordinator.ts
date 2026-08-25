import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type BoundRuntimeRecordRef,
  type EventBatch,
  type ReplicaArtifactManifestEntry,
  type ReplicaCheckpoint,
  type RuntimeBinding,
  type RuntimeSynchronizer,
  type StoredEvent,
} from "@contentmd/runtime-sdk";

export interface CanonicalReplicaCommitInput {
  readonly commit_id: string;
  readonly event: StoredEvent;
  readonly artifacts: readonly ReplicaArtifactManifestEntry[];
  readonly created_at: string;
}

export interface PreparedReplicaCommit {
  readonly contract_version: "contentmd.prepared-replica-commit/0.1.0";
  readonly commit_id: string;
  readonly batch: EventBatch;
  readonly expected_checkpoint: ReplicaCheckpoint;
  readonly prepare_digest: string;
}

export interface CanonicalReplicaCommitOperations {
  readonly push: AuthorizedRuntimeOperation;
  readonly acknowledge: AuthorizedRuntimeOperation;
}

export interface CommittedReplicaReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly commit_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly batch_ref: BoundRuntimeRecordRef;
  readonly checkpoint_ref: BoundRuntimeRecordRef;
  readonly manifest_ref: BoundRuntimeRecordRef;
  readonly acknowledgement_ref: BoundRuntimeRecordRef;
  readonly status: "committed";
  readonly committed_at: string;
  readonly receipt_digest: string;
}

export interface CanonicalFirstReplicaCoordinatorOptions {
  readonly synchronizer: RuntimeSynchronizer;
  readonly binding: RuntimeBinding;
  readonly clock: () => string;
}

function utf8Compare(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
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

function verifyEvent(event: StoredEvent): void {
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
    || event.payload_digest !== sha256Canonical(event.payload)
    || event.event_digest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_event_invalid");
  }
}

function artifactRoots(event: StoredEvent): readonly string[] {
  const payload = event.payload;
  if (typeof payload !== "object" || payload === null || Array.isArray(payload)) {
    throw new RuntimeError("runtime_export_incomplete", "event_artifact_roots_missing");
  }
  const roots = (payload as Record<string, unknown>).artifact_refs;
  if (!Array.isArray(roots)
    || roots.length === 0
    || roots.some((item) => typeof item !== "string" || item.length === 0)
    || new Set(roots).size !== roots.length) {
    throw new RuntimeError("runtime_export_incomplete", "event_artifact_roots_invalid");
  }
  const sorted = [...roots].sort(utf8Compare);
  if (canonicalJson(roots) !== canonicalJson(sorted)) {
    throw new RuntimeError("runtime_export_incomplete", "event_artifact_roots_noncanonical");
  }
  return roots as string[];
}

function verifyEntry(entry: ReplicaArtifactManifestEntry): void {
  const sortedParents = [...entry.parent_refs].sort(utf8Compare);
  if (entry.artifact_id.length === 0
    || entry.media_type.length === 0
    || !/^[a-f0-9]{64}$/u.test(entry.sha256_digest)
    || !Number.isSafeInteger(entry.byte_count)
    || entry.byte_count < 0
    || entry.expected_receipt_class.length === 0
    || new Set(entry.parent_refs).size !== entry.parent_refs.length
    || canonicalJson(entry.parent_refs) !== canonicalJson(sortedParents)) {
    throw new RuntimeError("runtime_export_incomplete", `artifact_definition_invalid:${entry.artifact_id}`);
  }
  if (entry.disposition === "required" && entry.export_permission === "forbidden") {
    throw new RuntimeError("runtime_export_incomplete", `required_artifact_forbidden:${entry.artifact_id}`);
  }
}

export class CanonicalFirstReplicaCoordinator {
  readonly #synchronizer: RuntimeSynchronizer;
  readonly #binding: RuntimeBinding;
  readonly #clock: () => string;

  constructor(options: CanonicalFirstReplicaCoordinatorOptions) {
    this.#synchronizer = options.synchronizer;
    this.#binding = options.binding;
    this.#clock = options.clock;
  }

  prepare(input: CanonicalReplicaCommitInput): PreparedReplicaCommit {
    verifyEvent(input.event);
    const roots = artifactRoots(input.event);
    const definitions = new Map<string, ReplicaArtifactManifestEntry>();
    for (const artifact of input.artifacts) {
      verifyEntry(artifact);
      if (definitions.has(artifact.artifact_id)) {
        throw new RuntimeError("runtime_export_incomplete", `artifact_definition_repeated:${artifact.artifact_id}`);
      }
      definitions.set(artifact.artifact_id, artifact);
    }
    const closure = new Set<string>();
    const pending = [...roots];
    while (pending.length > 0) {
      const artifactId = pending.pop()!;
      if (closure.has(artifactId)) continue;
      const definition = definitions.get(artifactId);
      if (definition === undefined) {
        throw new RuntimeError("runtime_export_incomplete", `artifact_definition_missing:${artifactId}`);
      }
      closure.add(artifactId);
      pending.push(...definition.parent_refs);
    }
    if (closure.size !== definitions.size) {
      throw new RuntimeError("runtime_export_incomplete", "artifact_definition_unreachable");
    }
    const entries = [...closure]
      .map((artifactId) => definitions.get(artifactId)!)
      .sort((left, right) => utf8Compare(left.artifact_id, right.artifact_id));
    const checkpointIdentity = checkpointIdentityPreimage({
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      stream_id: input.event.stream_id,
      sequence: input.event.sequence,
      head_digest: input.event.event_digest,
    });
    const checkpointIdentityDigest = sha256Canonical(checkpointIdentity);
    const checkpointRef = {
      record_id: `replica-checkpoint.${checkpointIdentityDigest}`,
      record_version: 1,
      content_digest: checkpointIdentityDigest,
    };
    const eventRef = {
      record_id: input.event.event_id,
      record_version: 1,
      content_digest: input.event.event_digest,
    };
    const manifestIdentity = {
      contract_version: "contentmd.replica-artifact-manifest-identity/0.1.0",
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_ref: eventRef,
      checkpoint_ref: checkpointRef,
      entries,
    };
    const manifestPreimage = {
      schema_version: "0.1.0" as const,
      manifest_id: `replica-manifest.${sha256Canonical(manifestIdentity)}`,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_ref: eventRef,
      checkpoint_ref: checkpointRef,
      entries,
      created_at: input.created_at,
    };
    const manifest = {
      ...manifestPreimage,
      manifest_digest: sha256Canonical(manifestPreimage),
    };
    const batchIdentity = {
      contract_version: "contentmd.replica-batch-identity/0.1.0",
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_refs: [input.event.event_id],
      manifest_digest: manifest.manifest_digest,
    };
    const batchPreimage = {
      schema_version: "0.1.0" as const,
      batch_id: `replica-batch.${sha256Canonical(batchIdentity)}`,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      events: [input.event],
      manifest,
    };
    const batch: EventBatch = {
      ...batchPreimage,
      batch_digest: sha256Canonical(batchPreimage),
    };
    const checkpointPreimage = {
      schema_version: "0.1.0" as const,
      checkpoint_id: checkpointRef.record_id,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      stream_id: input.event.stream_id,
      sequence: input.event.sequence,
      head_digest: input.event.event_digest,
      manifest_digest: manifest.manifest_digest,
      issued_at: this.#clock(),
    };
    const expectedCheckpoint: ReplicaCheckpoint = {
      ...checkpointPreimage,
      checkpoint_digest: sha256Canonical(checkpointPreimage),
    };
    const preparePreimage = {
      contract_version: "contentmd.prepared-replica-commit/0.1.0" as const,
      commit_id: input.commit_id,
      batch,
      expected_checkpoint: expectedCheckpoint,
    };
    return Object.freeze({
      ...preparePreimage,
      prepare_digest: sha256Canonical(preparePreimage),
    });
  }

  async commit(
    prepared: PreparedReplicaCommit,
    operations: CanonicalReplicaCommitOperations,
  ): Promise<CommittedReplicaReceipt> {
    const { prepare_digest: suppliedPrepareDigest, ...preparePreimage } = prepared;
    if (prepared.contract_version !== "contentmd.prepared-replica-commit/0.1.0"
      || suppliedPrepareDigest !== sha256Canonical(preparePreimage)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "prepared_replica_commit_invalid");
    }
    const replay = this.prepare({
      commit_id: prepared.commit_id,
      event: prepared.batch.events[0]!,
      artifacts: prepared.batch.manifest.entries,
      created_at: prepared.batch.manifest.created_at,
    });
    if (canonicalJson(replay) !== canonicalJson(prepared)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "prepared_replica_commit_replay_mismatch");
    }
    const pushed = await this.#synchronizer.push(prepared.batch, operations.push);
    if (pushed.status !== "accepted"
      || pushed.checkpoint === null
      || canonicalJson(pushed.checkpoint) !== canonicalJson(prepared.expected_checkpoint)) {
      throw new RuntimeError("runtime_canonical_commit_unavailable", "replica_checkpoint_readback_mismatch");
    }
    const acknowledgement = await this.#synchronizer.acknowledge(
      pushed.checkpoint,
      operations.acknowledge,
    );
    if (acknowledgement.checkpoint.checkpoint_digest !== pushed.checkpoint.checkpoint_digest
      || acknowledgement.manifest_digest !== prepared.batch.manifest.manifest_digest) {
      throw new RuntimeError("runtime_replica_acknowledgement_missing", "replica_acknowledgement_mismatch");
    }
    const committedAt = this.#clock();
    const identity = {
      contract_version: "contentmd.committed-replica-receipt-identity/0.1.0",
      commit_id: prepared.commit_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      batch_digest: prepared.batch.batch_digest,
      checkpoint_digest: pushed.checkpoint.checkpoint_digest,
      acknowledgement_digest: acknowledgement.ack_digest,
    };
    const receiptPreimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `committed-replica-receipt.${sha256Canonical(identity)}`,
      commit_id: prepared.commit_id,
      project_id: this.#binding.project_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      batch_ref: {
        record_id: prepared.batch.batch_id,
        record_version: 1,
        content_digest: prepared.batch.batch_digest,
      },
      checkpoint_ref: {
        record_id: pushed.checkpoint.checkpoint_id,
        record_version: 1,
        content_digest: pushed.checkpoint.checkpoint_digest,
      },
      manifest_ref: {
        record_id: prepared.batch.manifest.manifest_id,
        record_version: 1,
        content_digest: prepared.batch.manifest.manifest_digest,
      },
      acknowledgement_ref: {
        record_id: acknowledgement.ack_id,
        record_version: 1,
        content_digest: acknowledgement.ack_digest,
      },
      status: "committed" as const,
      committed_at: committedAt,
    };
    return Object.freeze({
      ...receiptPreimage,
      receipt_digest: sha256Canonical(receiptPreimage),
    });
  }
}
