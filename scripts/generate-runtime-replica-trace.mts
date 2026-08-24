import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { canonicalJson, sha256Canonical } from "../packages/core/dist/index.js";
import { CanonicalFirstReplicaCoordinator } from "../packages/runtime-local/dist/replica-coordinator.js";
import type {
  AuthorizedRuntimeOperation,
  EventBatch,
  ReplicaAck,
  ReplicaArtifactManifestEntry,
  ReplicaCheckpoint,
  ReplicaStorageReceipt,
  RuntimeBinding,
  RuntimeSynchronizer,
  SyncCursor,
  SyncReceipt,
  VerifiedEventBatch,
} from "../packages/runtime-sdk/src/index.js";

const NOW = "2026-08-23T12:00:00.000Z";
const DIGEST = "f".repeat(64);
const OUTPUT = resolve("fixtures/runtime-traces/canonical-replica.jsonl");

function digestBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function binding(): RuntimeBinding {
  return {
    project_id: "project.runtime.synthetic-trace",
    descriptor_digest: DIGEST,
  } as unknown as RuntimeBinding;
}

function event() {
  const payload = { artifact_refs: ["artifact.runtime.synthetic.preview"] };
  const preimage = {
    event_id: "event.runtime.synthetic-trace",
    stream_id: "stream.runtime.synthetic-trace",
    sequence: 1,
    schema_version: "0.1.0" as const,
    event_type: "runtime_preview_committed",
    occurred_at: NOW,
    actor_ref: "actor.runtime.synthetic",
    data_class: "runtime-metadata",
    payload,
    predecessor_digest: null,
  };
  return {
    ...preimage,
    payload_digest: sha256Canonical(payload),
    event_digest: sha256Canonical(preimage),
  };
}

function artifacts(): readonly ReplicaArtifactManifestEntry[] {
  const policyBytes = new TextEncoder().encode('{"policy":"synthetic"}\n');
  const previewBytes = new TextEncoder().encode('{"preview":"synthetic"}\n');
  return [
    {
      artifact_id: "artifact.runtime.synthetic.policy",
      media_type: "application/json",
      schema_id: null,
      sha256_digest: digestBytes(policyBytes),
      byte_count: policyBytes.byteLength,
      disposition: "required",
      export_permission: "permitted",
      parent_refs: [],
      expected_receipt_class: "runtime.local.verified-blob",
    },
    {
      artifact_id: "artifact.runtime.synthetic.preview",
      media_type: "application/json",
      schema_id: null,
      sha256_digest: digestBytes(previewBytes),
      byte_count: previewBytes.byteLength,
      disposition: "required",
      export_permission: "permitted",
      parent_refs: ["artifact.runtime.synthetic.policy"],
      expected_receipt_class: "runtime.local.verified-blob",
    },
  ];
}

class TraceSynchronizer implements RuntimeSynchronizer {
  lastPush: SyncReceipt | null = null;
  lastAcknowledgement: ReplicaAck | null = null;

  async push(batch: EventBatch, _operation: AuthorizedRuntimeOperation): Promise<SyncReceipt> {
    const eventValue = batch.events.at(-1)!;
    const checkpointPreimage = {
      schema_version: "0.1.0" as const,
      checkpoint_id: batch.manifest.checkpoint_ref.record_id,
      project_id: batch.project_id,
      runtime_binding_digest: batch.runtime_binding_digest,
      stream_id: eventValue.stream_id,
      sequence: eventValue.sequence,
      head_digest: eventValue.event_digest,
      manifest_digest: batch.manifest.manifest_digest,
      issued_at: NOW,
    };
    const checkpoint: ReplicaCheckpoint = {
      ...checkpointPreimage,
      checkpoint_digest: sha256Canonical(checkpointPreimage),
    };
    const identity = {
      contract_version: "contentmd.sync-receipt-identity/0.1.0",
      batch_id: batch.batch_id,
      runtime_binding_digest: batch.runtime_binding_digest,
      checkpoint_digest: checkpoint.checkpoint_digest,
    };
    const receiptPreimage = {
      schema_version: "0.1.0" as const,
      receipt_id: `sync-receipt.${sha256Canonical(identity)}`,
      batch_id: batch.batch_id,
      project_id: batch.project_id,
      runtime_binding_digest: batch.runtime_binding_digest,
      accepted_event_refs: batch.events.map((item) => item.event_id),
      rejected_event_refs: [] as string[],
      checkpoint,
      status: "accepted" as const,
      issued_at: NOW,
    };
    this.lastPush = { ...receiptPreimage, receipt_digest: sha256Canonical(receiptPreimage) };
    return this.lastPush;
  }

  async acknowledge(
    checkpoint: ReplicaCheckpoint,
    _operation: AuthorizedRuntimeOperation,
  ): Promise<ReplicaAck> {
    if (this.lastPush?.checkpoint === null || this.lastPush === null) throw new Error("push_required");
    const batch = tracePrepared.batch;
    const receipts: ReplicaStorageReceipt[] = batch.manifest.entries.map((entry) => {
      const preimage = {
        artifact_id: entry.artifact_id,
        sha256_digest: entry.sha256_digest,
        byte_count: entry.byte_count,
        receipt_class: entry.expected_receipt_class,
      };
      return { ...preimage, receipt_digest: sha256Canonical(preimage) };
    });
    const identity = {
      contract_version: "contentmd.replica-ack-identity/0.1.0",
      project_id: batch.project_id,
      runtime_binding_digest: batch.runtime_binding_digest,
      checkpoint_digest: checkpoint.checkpoint_digest,
      manifest_digest: batch.manifest.manifest_digest,
    };
    const preimage = {
      schema_version: "0.1.0" as const,
      ack_id: `replica-ack.${sha256Canonical(identity)}`,
      project_id: batch.project_id,
      runtime_binding_digest: batch.runtime_binding_digest,
      checkpoint,
      manifest_ref: {
        record_id: batch.manifest.manifest_id,
        record_version: 1,
        content_digest: batch.manifest.manifest_digest,
      },
      manifest_digest: batch.manifest.manifest_digest,
      entry_receipts: receipts,
      acknowledged_at: NOW,
    };
    this.lastAcknowledgement = { ...preimage, ack_digest: sha256Canonical(preimage) };
    return this.lastAcknowledgement;
  }

  async pull(_cursor: SyncCursor, _operation: AuthorizedRuntimeOperation): Promise<VerifiedEventBatch> {
    throw new Error("trace_pull_not_used");
  }
}

const runtimeBinding = binding();
const synchronizer = new TraceSynchronizer();
const coordinator = new CanonicalFirstReplicaCoordinator({
  synchronizer,
  binding: runtimeBinding,
  clock: () => NOW,
});
const tracePrepared = coordinator.prepare({
  commit_id: "replica-commit.runtime.synthetic-trace",
  event: event(),
  artifacts: artifacts(),
  created_at: NOW,
});
const operation = Object.freeze({
  capability_ref: "capability.runtime.synthetic-trace",
  capability_digest: DIGEST,
  verifier_id: "runtime.synthetic-trace",
}) as AuthorizedRuntimeOperation;
const committed = await coordinator.commit(tracePrepared, {
  push: operation,
  acknowledge: operation,
});
const output = [
  { trace_step: "prepared", value: tracePrepared },
  { trace_step: "sync_receipt", value: synchronizer.lastPush },
  { trace_step: "acknowledgement", value: synchronizer.lastAcknowledgement },
  { trace_step: "committed", value: committed },
].map((item) => canonicalJson(item)).join("");

if (process.argv.includes("--check")) {
  const existing = await readFile(OUTPUT, "utf8").catch(() => "");
  if (existing !== output) {
    throw new Error("runtime_replica_trace_out_of_date");
  }
} else {
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, output, { encoding: "utf8", mode: 0o600 });
}
