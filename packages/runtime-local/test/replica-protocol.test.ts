import { createHash } from "node:crypto";
import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import { SqliteEventStore } from "@contentmd/memory";
import {
  CanonicalFirstReplicaCoordinator,
  LocalBlobStore,
  LocalRuntimeSynchronizer,
  type ReplicaArtifactRepository,
} from "@contentmd/runtime-local";
import type {
  AuthorizedRuntimeOperation,
  EventBatch,
  ReplicaAck,
  ReplicaArtifactManifestEntry,
  ReplicaStorageReceipt,
  RuntimeOperationClaims,
  StoredEvent,
  SyncCursor,
} from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  NOW,
  authorityFixture,
  runtimeBindingFixture,
  runtimeClaims,
} from "./runtime-test-fixtures.js";

function digestBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function storedEvent(input: {
  readonly event_id: string;
  readonly sequence: number;
  readonly predecessor_digest: string | null;
  readonly payload?: unknown;
  readonly event_type?: string;
}): StoredEvent {
  const payload = input.payload ?? { artifact_refs: ["artifact.runtime.preview"] };
  const preimage = {
    event_id: input.event_id,
    stream_id: "stream.runtime.replica",
    sequence: input.sequence,
    schema_version: "0.1.0" as const,
    event_type: input.event_type ?? "runtime_preview_committed",
    occurred_at: NOW,
    actor_ref: "actor.runtime.fixture",
    data_class: "runtime-metadata",
    payload,
    predecessor_digest: input.predecessor_digest,
  };
  return {
    ...preimage,
    payload_digest: sha256Canonical(payload),
    event_digest: sha256Canonical(preimage),
  };
}

function checkpointIdentity(event: StoredEvent, bindingDigest: string) {
  const preimage = {
    contract_version: "contentmd.replica-checkpoint-identity/0.1.0",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    stream_id: event.stream_id,
    sequence: event.sequence,
    head_digest: event.event_digest,
  };
  const contentDigest = sha256Canonical(preimage);
  return {
    record_id: `replica-checkpoint.${contentDigest}`,
    record_version: 1,
    content_digest: contentDigest,
  };
}

function entry(input: {
  readonly artifact_id: string;
  readonly bytes: Uint8Array;
  readonly parent_refs?: readonly string[];
  readonly export_permission?: "permitted" | "forbidden";
}): ReplicaArtifactManifestEntry {
  return {
    artifact_id: input.artifact_id,
    media_type: "application/json",
    schema_id: null,
    sha256_digest: digestBytes(input.bytes),
    byte_count: input.bytes.byteLength,
    disposition: "required",
    export_permission: input.export_permission ?? "permitted",
    parent_refs: input.parent_refs ?? [],
    expected_receipt_class: "runtime.local.verified-blob",
  };
}

function batch(input: {
  readonly binding_digest: string;
  readonly event: StoredEvent;
  readonly entries: readonly ReplicaArtifactManifestEntry[];
}): EventBatch {
  const checkpointRef = checkpointIdentity(input.event, input.binding_digest);
  const eventRef = {
    record_id: input.event.event_id,
    record_version: 1,
    content_digest: input.event.event_digest,
  };
  const manifestIdentity = {
    contract_version: "contentmd.replica-artifact-manifest-identity/0.1.0",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: input.binding_digest,
    event_ref: eventRef,
    checkpoint_ref: checkpointRef,
    entries: input.entries,
  };
  const manifestPreimage = {
    schema_version: "0.1.0" as const,
    manifest_id: `replica-manifest.${sha256Canonical(manifestIdentity)}`,
    project_id: "project.runtime.fixture",
    runtime_binding_digest: input.binding_digest,
    event_ref: eventRef,
    checkpoint_ref: checkpointRef,
    entries: input.entries,
    created_at: NOW,
  };
  const manifest = {
    ...manifestPreimage,
    manifest_digest: sha256Canonical(manifestPreimage),
  };
  const batchIdentity = sha256Canonical({
    contract_version: "contentmd.replica-batch-identity/0.1.0",
    project_id: manifest.project_id,
    runtime_binding_digest: input.binding_digest,
    event_refs: [input.event.event_id],
    manifest_digest: manifest.manifest_digest,
  });
  const batchPreimage = {
    schema_version: "0.1.0" as const,
    batch_id: `replica-batch.${batchIdentity}`,
    project_id: manifest.project_id,
    runtime_binding_digest: input.binding_digest,
    events: [input.event],
    manifest,
  };
  return { ...batchPreimage, batch_digest: sha256Canonical(batchPreimage) };
}

class MemoryArtifactRepository implements ReplicaArtifactRepository {
  readonly bytes = new Map<string, Uint8Array>();
  corruptReceiptFor: string | null = null;

  async verify(entryValue: ReplicaArtifactManifestEntry): Promise<ReplicaStorageReceipt | null> {
    const bytes = this.bytes.get(entryValue.artifact_id);
    if (bytes === undefined || digestBytes(bytes) !== entryValue.sha256_digest) return null;
    const preimage = {
      artifact_id: entryValue.artifact_id,
      sha256_digest: entryValue.sha256_digest,
      byte_count: bytes.byteLength,
      receipt_class: entryValue.expected_receipt_class,
    };
    return {
      ...preimage,
      receipt_digest: this.corruptReceiptFor === entryValue.artifact_id
        ? "0".repeat(64)
        : sha256Canonical(preimage),
    };
  }
}

class SyntheticHostedReplica {
  #durable = 0;

  async persist(_preview: EventBatch, acknowledgement: ReplicaAck | null): Promise<void> {
    if (acknowledgement === null) {
      throw new Error("runtime_host_persistence_before_canonical_ack");
    }
    this.#durable += 1;
  }

  async durableRecordCount(): Promise<number> {
    return this.#durable;
  }
}

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-replica-"));
  const authorization = authorityFixture(root);
  const binding = runtimeBindingFixture();
  const artifacts = new MemoryArtifactRepository();
  const synchronizer = new LocalRuntimeSynchronizer({
    project_root: root,
    binding,
    authority: authorization.authority,
    permitted_data_classes: ["runtime-metadata"],
    artifact_repository: artifacts,
    clock: () => NOW,
  });
  let counter = 0;
  async function issue(input: {
    readonly action: string;
    readonly resource_id: string;
    readonly content_digest: string | null;
    readonly records: number;
  }): Promise<AuthorizedRuntimeOperation> {
    counter += 1;
    const claims = runtimeClaims({
      capability_id: `capability.runtime.replica.${counter}`,
      nonce: `nonce.runtime.replica.${counter}`,
      action: input.action,
      resources: [{ resource_id: input.resource_id, content_digest: input.content_digest }],
      data_classes: ["runtime-metadata"],
      resource_limits: {
        calls: 1,
        bytes: 65_536,
        duration_ms: 5_000,
        records: input.records,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      runtime_binding_digest: binding.descriptor_digest,
    } satisfies Partial<RuntimeOperationClaims>);
    authorization.resolver.accept(claims);
    return authorization.authority.issue(AUTHORIZATION_REF, claims);
  }
  return { root, authorization, binding, artifacts, synchronizer, issue };
}

function cursor(
  bindingDigest: string,
  input: {
    readonly cursor_id?: string;
    readonly sequence?: number;
    readonly head_digest?: string;
  } = {},
): SyncCursor {
  const preimage = {
    schema_version: "0.1.0" as const,
    cursor_id: input.cursor_id ?? "sync-cursor.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    checkpoints: [{
      stream_id: "stream.runtime.replica",
      sequence: input.sequence ?? 0,
      head_digest: input.head_digest ?? "0".repeat(64),
    }],
    maximum_records: 10,
  };
  return { ...preimage, cursor_digest: sha256Canonical(preimage) };
}

describe("canonical-first replica protocol", () => {
  it("prepares a complete deterministic closure before committing a replica receipt", async () => {
    const f = await fixture();
    const policyBytes = new TextEncoder().encode("policy");
    const previewBytes = new TextEncoder().encode("preview");
    const policy = entry({ artifact_id: "artifact.runtime.policy", bytes: policyBytes });
    const preview = entry({
      artifact_id: "artifact.runtime.preview",
      bytes: previewBytes,
      parent_refs: [policy.artifact_id],
    });
    f.artifacts.bytes.set(policy.artifact_id, policyBytes);
    f.artifacts.bytes.set(preview.artifact_id, previewBytes);
    const event = storedEvent({
      event_id: "event.runtime.coordinated",
      sequence: 1,
      predecessor_digest: null,
      payload: { artifact_refs: [preview.artifact_id] },
    });
    const coordinator = new CanonicalFirstReplicaCoordinator({
      synchronizer: f.synchronizer,
      binding: f.binding,
      clock: () => NOW,
    });
    const prepared = coordinator.prepare({
      commit_id: "replica-commit.runtime.fixture",
      event,
      artifacts: [preview, policy],
      created_at: NOW,
    });
    expect(prepared.batch.manifest.entries.map((item) => item.artifact_id)).toEqual([
      policy.artifact_id,
      preview.artifact_id,
    ]);
    expect(prepared.prepare_digest).toBe(sha256Canonical({
      contract_version: "contentmd.prepared-replica-commit/0.1.0",
      commit_id: prepared.commit_id,
      batch: prepared.batch,
      expected_checkpoint: prepared.expected_checkpoint,
    }));

    const receipt = await coordinator.commit(prepared, {
      push: await f.issue({
        action: "runtime.sync.push",
        resource_id: prepared.batch.batch_id,
        content_digest: prepared.batch.batch_digest,
        records: prepared.batch.events.length + prepared.batch.manifest.entries.length,
      }),
      acknowledge: await f.issue({
        action: "runtime.sync.acknowledge",
        resource_id: prepared.expected_checkpoint.checkpoint_id,
        content_digest: prepared.expected_checkpoint.checkpoint_digest,
        records: prepared.batch.manifest.entries.length + 1,
      }),
    });
    expect(receipt).toMatchObject({
      commit_id: prepared.commit_id,
      project_id: f.binding.project_id,
      runtime_binding_digest: f.binding.descriptor_digest,
      batch_ref: {
        record_id: prepared.batch.batch_id,
        content_digest: prepared.batch.batch_digest,
      },
      checkpoint_ref: {
        record_id: prepared.expected_checkpoint.checkpoint_id,
        content_digest: prepared.expected_checkpoint.checkpoint_digest,
      },
      manifest_ref: {
        record_id: prepared.batch.manifest.manifest_id,
        content_digest: prepared.batch.manifest.manifest_digest,
      },
      status: "committed",
    });
    expect(receipt.receipt_digest).toMatch(/^[a-f0-9]{64}$/u);
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it.each([
    ["missing root", ["artifact.runtime.policy"]],
    ["unreachable extra", ["artifact.runtime.preview", "artifact.runtime.policy", "artifact.runtime.extra"]],
  ] as const)("rejects a %s definition before issuing a batch", async (_label, selectedIds) => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("artifact");
    const definitions = [
      entry({ artifact_id: "artifact.runtime.policy", bytes }),
      entry({
        artifact_id: "artifact.runtime.preview",
        bytes,
        parent_refs: ["artifact.runtime.policy"],
      }),
      entry({ artifact_id: "artifact.runtime.extra", bytes }),
    ].filter((item) => selectedIds.includes(item.artifact_id as never));
    const coordinator = new CanonicalFirstReplicaCoordinator({
      synchronizer: f.synchronizer,
      binding: f.binding,
      clock: () => NOW,
    });
    expect(() => coordinator.prepare({
      commit_id: "replica-commit.runtime.invalid",
      event: storedEvent({
        event_id: "event.runtime.invalid-closure",
        sequence: 1,
        predecessor_digest: null,
        payload: { artifact_refs: ["artifact.runtime.preview"] },
      }),
      artifacts: definitions,
      created_at: NOW,
    })).toThrow("runtime_export_incomplete");
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("prevents host persistence until canonical storage, checkpoint, and acknowledgement", async () => {
    const f = await fixture();
    const policyBytes = new TextEncoder().encode('{"policy":"current"}\n');
    const previewBytes = new TextEncoder().encode('{"preview":"content"}\n');
    const entries = [
      entry({ artifact_id: "artifact.runtime.policy", bytes: policyBytes }),
      entry({
        artifact_id: "artifact.runtime.preview",
        bytes: previewBytes,
        parent_refs: ["artifact.runtime.policy"],
      }),
    ];
    f.artifacts.bytes.set(entries[0]!.artifact_id, policyBytes);
    f.artifacts.bytes.set(entries[1]!.artifact_id, previewBytes);
    const event = storedEvent({
      event_id: "event.runtime.replica.first",
      sequence: 1,
      predecessor_digest: null,
    });
    const preview = batch({
      binding_digest: f.binding.descriptor_digest,
      event,
      entries,
    });
    const host = new SyntheticHostedReplica();

    expect(await host.durableRecordCount()).toBe(0);
    await expect(host.persist(preview, null))
      .rejects.toThrow("runtime_host_persistence_before_canonical_ack");
    expect(await host.durableRecordCount()).toBe(0);

    const pushed = await f.synchronizer.push(preview, await f.issue({
      action: "runtime.sync.push",
      resource_id: preview.batch_id,
      content_digest: preview.batch_digest,
      records: preview.events.length + preview.manifest.entries.length,
    }));
    expect(pushed).toMatchObject({ status: "accepted", accepted_event_refs: [event.event_id] });
    expect(pushed.checkpoint).not.toBeNull();
    const acknowledgement = await f.synchronizer.acknowledge(
      pushed.checkpoint!,
      await f.issue({
        action: "runtime.sync.acknowledge",
        resource_id: pushed.checkpoint!.checkpoint_id,
        content_digest: pushed.checkpoint!.checkpoint_digest,
        records: entries.length + 1,
      }),
    );
    expect(acknowledgement.manifest_digest).toBe(preview.manifest.manifest_digest);
    expect(acknowledgement.entry_receipts).toHaveLength(2);
    await host.persist(preview, acknowledgement);
    expect(await host.durableRecordCount()).toBe(1);

    const request = cursor(f.binding.descriptor_digest);
    const restored = await f.synchronizer.pull(request, await f.issue({
      action: "runtime.sync.pull",
      resource_id: request.cursor_id,
      content_digest: request.cursor_digest,
      records: request.maximum_records,
    }));
    expect(restored.batch).toEqual(preview);
    expect(restored.source_checkpoint).toEqual(pushed.checkpoint);
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it.each([
    ["missing artifact", (f: Awaited<ReturnType<typeof fixture>>, entries: ReplicaArtifactManifestEntry[]) => {
      f.artifacts.bytes.delete(entries[1]!.artifact_id);
    }, "runtime_export_incomplete"],
    ["corrupt receipt", (f: Awaited<ReturnType<typeof fixture>>, entries: ReplicaArtifactManifestEntry[]) => {
      f.artifacts.corruptReceiptFor = entries[1]!.artifact_id;
    }, "runtime_canonical_commit_unavailable"],
  ] as const)("rejects a %s before appending an event", async (_label, mutate, errorCode) => {
    const f = await fixture();
    const parentBytes = new TextEncoder().encode("parent");
    const childBytes = new TextEncoder().encode("child");
    const entries = [
      entry({ artifact_id: "artifact.runtime.parent", bytes: parentBytes }),
      entry({ artifact_id: "artifact.runtime.preview", bytes: childBytes, parent_refs: ["artifact.runtime.parent"] }),
    ];
    f.artifacts.bytes.set(entries[0]!.artifact_id, parentBytes);
    f.artifacts.bytes.set(entries[1]!.artifact_id, childBytes);
    mutate(f, entries);
    const event = storedEvent({ event_id: "event.runtime.rejected", sequence: 1, predecessor_digest: null });
    const rejected = batch({ binding_digest: f.binding.descriptor_digest, event, entries });
    await expect(f.synchronizer.push(rejected, await f.issue({
      action: "runtime.sync.push",
      resource_id: rejected.batch_id,
      content_digest: rejected.batch_digest,
      records: 3,
    }))).rejects.toThrow(errorCode);
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("rejects an incomplete artifact closure and a required forbidden export", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("preview");
    const incompleteEntries = [entry({
      artifact_id: "artifact.runtime.preview",
      bytes,
      parent_refs: ["artifact.runtime.missing-parent"],
    })];
    f.artifacts.bytes.set(incompleteEntries[0]!.artifact_id, bytes);
    const event = storedEvent({ event_id: "event.runtime.incomplete", sequence: 1, predecessor_digest: null });
    const incomplete = batch({
      binding_digest: f.binding.descriptor_digest,
      event,
      entries: incompleteEntries,
    });
    await expect(f.synchronizer.push(incomplete, await f.issue({
      action: "runtime.sync.push",
      resource_id: incomplete.batch_id,
      content_digest: incomplete.batch_digest,
      records: 2,
    }))).rejects.toThrow("runtime_export_incomplete");

    const forbiddenEntries = [entry({
      artifact_id: "artifact.runtime.preview",
      bytes,
      export_permission: "forbidden",
    })];
    const forbidden = batch({
      binding_digest: f.binding.descriptor_digest,
      event,
      entries: forbiddenEntries,
    });
    await expect(f.synchronizer.push(forbidden, await f.issue({
      action: "runtime.sync.push",
      resource_id: forbidden.batch_id,
      content_digest: forbidden.batch_digest,
      records: 2,
    }))).rejects.toThrow("runtime_export_incomplete");
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("distinguishes predecessor gaps from forks and rejects acknowledgement replay", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("preview");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const gapEvent = storedEvent({
      event_id: "event.runtime.gap",
      sequence: 2,
      predecessor_digest: "a".repeat(64),
    });
    const gap = batch({ binding_digest: f.binding.descriptor_digest, event: gapEvent, entries });
    await expect(f.synchronizer.push(gap, await f.issue({
      action: "runtime.sync.push",
      resource_id: gap.batch_id,
      content_digest: gap.batch_digest,
      records: 2,
    }))).rejects.toThrow("runtime_replica_gap_detected");

    const firstEvent = storedEvent({ event_id: "event.runtime.first", sequence: 1, predecessor_digest: null });
    const first = batch({ binding_digest: f.binding.descriptor_digest, event: firstEvent, entries });
    const pushed = await f.synchronizer.push(first, await f.issue({
      action: "runtime.sync.push",
      resource_id: first.batch_id,
      content_digest: first.batch_digest,
      records: 2,
    }));
    const forkEvent = storedEvent({
      event_id: "event.runtime.fork",
      sequence: 2,
      predecessor_digest: "b".repeat(64),
    });
    const fork = batch({ binding_digest: f.binding.descriptor_digest, event: forkEvent, entries });
    await expect(f.synchronizer.push(fork, await f.issue({
      action: "runtime.sync.push",
      resource_id: fork.batch_id,
      content_digest: fork.batch_digest,
      records: 2,
    }))).rejects.toThrow("runtime_replica_fork_detected");

    await f.synchronizer.acknowledge(pushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: pushed.checkpoint!.checkpoint_id,
      content_digest: pushed.checkpoint!.checkpoint_digest,
      records: 2,
    }));
    await expect(f.synchronizer.acknowledge(pushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: pushed.checkpoint!.checkpoint_id,
      content_digest: pushed.checkpoint!.checkpoint_digest,
      records: 2,
    }))).rejects.toThrow("runtime_replica_acknowledgement_missing:acknowledgement_replayed");
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("records concurrent semantic decisions as a conflict instead of choosing the latest", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("decision evidence");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const firstEvent = storedEvent({
      event_id: "event.runtime.decision.first",
      event_type: "content_decision_recorded",
      sequence: 1,
      predecessor_digest: null,
      payload: { artifact_refs: [entries[0]!.artifact_id], decision: "first" },
    });
    const first = batch({ binding_digest: f.binding.descriptor_digest, event: firstEvent, entries });
    await f.synchronizer.push(first, await f.issue({
      action: "runtime.sync.push",
      resource_id: first.batch_id,
      content_digest: first.batch_digest,
      records: 2,
    }));

    const concurrentEvent = storedEvent({
      event_id: "event.runtime.decision.concurrent",
      event_type: "content_decision_recorded",
      sequence: 1,
      predecessor_digest: null,
      payload: { artifact_refs: [entries[0]!.artifact_id], decision: "concurrent" },
    });
    const concurrent = batch({
      binding_digest: f.binding.descriptor_digest,
      event: concurrentEvent,
      entries,
    });
    const conflict = await f.synchronizer.push(concurrent, await f.issue({
      action: "runtime.sync.push",
      resource_id: concurrent.batch_id,
      content_digest: concurrent.batch_digest,
      records: 2,
    }));
    expect(conflict).toMatchObject({
      status: "conflict",
      accepted_event_refs: [],
      rejected_event_refs: [concurrentEvent.event_id],
      checkpoint: null,
    });

    f.synchronizer.close();
    const raw = new SqliteEventStore(join(f.root, ".contentmd/runtime/events.sqlite"), {
      permitted_data_classes: ["runtime-metadata"],
    });
    const canonical = await raw.readStream(firstEvent.stream_id);
    expect(canonical).toHaveLength(1);
    expect(canonical[0]!.event_id).toBe(firstEvent.event_id);
    const conflicts = await raw.readStream("stream.runtime.conflicts");
    expect(conflicts).toHaveLength(1);
    expect(conflicts[0]).toMatchObject({
      event_type: "runtime_replica_semantic_conflict_recorded",
      payload: {
        existing_event_ref: firstEvent.event_id,
        incoming_event_ref: concurrentEvent.event_id,
      },
    });
    raw.close();
    f.authorization.ledger.close();
  });

  it("withholds unacknowledged batches from pull", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("preview");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const event = storedEvent({
      event_id: "event.runtime.unacknowledged",
      sequence: 1,
      predecessor_digest: null,
    });
    const pending = batch({ binding_digest: f.binding.descriptor_digest, event, entries });
    await f.synchronizer.push(pending, await f.issue({
      action: "runtime.sync.push",
      resource_id: pending.batch_id,
      content_digest: pending.batch_digest,
      records: 2,
    }));
    const request = cursor(f.binding.descriptor_digest);
    await expect(f.synchronizer.pull(request, await f.issue({
      action: "runtime.sync.pull",
      resource_id: request.cursor_id,
      content_digest: request.cursor_digest,
      records: request.maximum_records,
    }))).rejects.toThrow("runtime_replica_acknowledgement_missing");
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("pulls acknowledged batches in order and rejects cursor gaps or forks", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("preview");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const firstEvent = storedEvent({
      event_id: "event.runtime.ordered.first",
      sequence: 1,
      predecessor_digest: null,
    });
    const first = batch({ binding_digest: f.binding.descriptor_digest, event: firstEvent, entries });
    const firstPushed = await f.synchronizer.push(first, await f.issue({
      action: "runtime.sync.push",
      resource_id: first.batch_id,
      content_digest: first.batch_digest,
      records: 2,
    }));
    await f.synchronizer.acknowledge(firstPushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: firstPushed.checkpoint!.checkpoint_id,
      content_digest: firstPushed.checkpoint!.checkpoint_digest,
      records: 2,
    }));
    const secondEvent = storedEvent({
      event_id: "event.runtime.ordered.second",
      sequence: 2,
      predecessor_digest: firstEvent.event_digest,
    });
    const second = batch({ binding_digest: f.binding.descriptor_digest, event: secondEvent, entries });
    const secondPushed = await f.synchronizer.push(second, await f.issue({
      action: "runtime.sync.push",
      resource_id: second.batch_id,
      content_digest: second.batch_digest,
      records: 2,
    }));
    await f.synchronizer.acknowledge(secondPushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: secondPushed.checkpoint!.checkpoint_id,
      content_digest: secondPushed.checkpoint!.checkpoint_digest,
      records: 2,
    }));

    const firstCursor = cursor(f.binding.descriptor_digest, { cursor_id: "sync-cursor.runtime.first" });
    await expect(f.synchronizer.pull(firstCursor, await f.issue({
      action: "runtime.sync.pull",
      resource_id: firstCursor.cursor_id,
      content_digest: firstCursor.cursor_digest,
      records: firstCursor.maximum_records,
    }))).resolves.toMatchObject({ batch: { batch_id: first.batch_id } });
    const secondCursor = cursor(f.binding.descriptor_digest, {
      cursor_id: "sync-cursor.runtime.second",
      sequence: 1,
      head_digest: firstEvent.event_digest,
    });
    await expect(f.synchronizer.pull(secondCursor, await f.issue({
      action: "runtime.sync.pull",
      resource_id: secondCursor.cursor_id,
      content_digest: secondCursor.cursor_digest,
      records: secondCursor.maximum_records,
    }))).resolves.toMatchObject({ batch: { batch_id: second.batch_id } });

    const forkedCursor = cursor(f.binding.descriptor_digest, {
      cursor_id: "sync-cursor.runtime.forked",
      sequence: 1,
      head_digest: "f".repeat(64),
    });
    await expect(f.synchronizer.pull(forkedCursor, await f.issue({
      action: "runtime.sync.pull",
      resource_id: forkedCursor.cursor_id,
      content_digest: forkedCursor.cursor_digest,
      records: forkedCursor.maximum_records,
    }))).rejects.toThrow("runtime_replica_fork_detected");
    const gapCursor = cursor(f.binding.descriptor_digest, {
      cursor_id: "sync-cursor.runtime.gap",
      sequence: 3,
      head_digest: "e".repeat(64),
    });
    await expect(f.synchronizer.pull(gapCursor, await f.issue({
      action: "runtime.sync.pull",
      resource_id: gapCursor.cursor_id,
      content_digest: gapCursor.cursor_digest,
      records: gapCursor.maximum_records,
    }))).rejects.toThrow("runtime_replica_gap_detected");
    f.synchronizer.close();
    f.authorization.ledger.close();
  });

  it("restores the exact canonical acknowledgement after the local synchronizer restarts", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("restart-safe preview");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const event = storedEvent({
      event_id: "event.runtime.restart-safe",
      sequence: 1,
      predecessor_digest: null,
    });
    const value = batch({ binding_digest: f.binding.descriptor_digest, event, entries });
    const pushed = await f.synchronizer.push(value, await f.issue({
      action: "runtime.sync.push",
      resource_id: value.batch_id,
      content_digest: value.batch_digest,
      records: 2,
    }));
    const acknowledgement = await f.synchronizer.acknowledge(pushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: pushed.checkpoint!.checkpoint_id,
      content_digest: pushed.checkpoint!.checkpoint_digest,
      records: 2,
    }));
    f.synchronizer.close();

    const restoredSynchronizer = new LocalRuntimeSynchronizer({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      permitted_data_classes: ["runtime-metadata"],
      artifact_repository: f.artifacts,
      clock: () => NOW,
    });
    const restored = await restoredSynchronizer.readAcknowledgement(
      pushed.checkpoint!,
      await f.issue({
        action: "runtime.sync.read-acknowledgement",
        resource_id: pushed.checkpoint!.checkpoint_id,
        content_digest: pushed.checkpoint!.checkpoint_digest,
        records: 1,
      }),
    );
    expect(restored).toEqual(acknowledgement);
    restoredSynchronizer.close();
    f.authorization.ledger.close();
  });

  it("persists cursor identity and rejects a redefined cursor after restart", async () => {
    const f = await fixture();
    const bytes = new TextEncoder().encode("cursor preview");
    const entries = [entry({ artifact_id: "artifact.runtime.preview", bytes })];
    f.artifacts.bytes.set(entries[0]!.artifact_id, bytes);
    const event = storedEvent({
      event_id: "event.runtime.cursor",
      sequence: 1,
      predecessor_digest: null,
    });
    const value = batch({ binding_digest: f.binding.descriptor_digest, event, entries });
    const pushed = await f.synchronizer.push(value, await f.issue({
      action: "runtime.sync.push",
      resource_id: value.batch_id,
      content_digest: value.batch_digest,
      records: 2,
    }));
    await f.synchronizer.acknowledge(pushed.checkpoint!, await f.issue({
      action: "runtime.sync.acknowledge",
      resource_id: pushed.checkpoint!.checkpoint_id,
      content_digest: pushed.checkpoint!.checkpoint_digest,
      records: 2,
    }));
    const initial = cursor(f.binding.descriptor_digest, { cursor_id: "sync-cursor.runtime.stable" });
    await f.synchronizer.pull(initial, await f.issue({
      action: "runtime.sync.pull",
      resource_id: initial.cursor_id,
      content_digest: initial.cursor_digest,
      records: initial.maximum_records,
    }));
    f.synchronizer.close();

    const restoredSynchronizer = new LocalRuntimeSynchronizer({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      permitted_data_classes: ["runtime-metadata"],
      artifact_repository: f.artifacts,
      clock: () => NOW,
    });
    const changedPreimage = {
      schema_version: initial.schema_version,
      cursor_id: initial.cursor_id,
      project_id: initial.project_id,
      runtime_binding_digest: initial.runtime_binding_digest,
      checkpoints: initial.checkpoints,
      maximum_records: 9,
    };
    const changed = { ...changedPreimage, cursor_digest: sha256Canonical(changedPreimage) };
    await expect(restoredSynchronizer.pull(changed, await f.issue({
      action: "runtime.sync.pull",
      resource_id: changed.cursor_id,
      content_digest: changed.cursor_digest,
      records: changed.maximum_records,
    }))).rejects.toThrow("runtime_replica_fork_detected:cursor_id_conflict");
    restoredSynchronizer.close();
    f.authorization.ledger.close();
  });

  it("restores event, manifest, checkpoint, acknowledgement, and blob bytes after host loss", async () => {
    const f = await fixture();
    f.synchronizer.close();
    const blobStore = new LocalBlobStore({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      permitted_data_classes: ["runtime-metadata"],
      reference_resolver: { async currentReferences() { return []; } },
      clock: () => NOW,
    });
    const policyBytes = new TextEncoder().encode("restorable policy");
    const previewBytes = new TextEncoder().encode("restorable preview");
    const definitions = [
      entry({ artifact_id: "artifact.runtime.policy", bytes: policyBytes }),
      entry({
        artifact_id: "artifact.runtime.preview",
        bytes: previewBytes,
        parent_refs: ["artifact.runtime.policy"],
      }),
    ];
    for (const [definition, bytes] of [
      [definitions[0]!, policyBytes],
      [definitions[1]!, previewBytes],
    ] as const) {
      await blobStore.put({
        schema_version: "0.1.0",
        blob_id: definition.artifact_id,
        project_id: f.binding.project_id,
        runtime_binding_digest: f.binding.descriptor_digest,
        media_type: definition.media_type,
        schema_id: definition.schema_id,
        data_class: "runtime-metadata",
        disposition: definition.disposition,
        export_permission: definition.export_permission,
        parent_refs: definition.parent_refs,
        retention_ref: "retention.runtime.synthetic",
        bytes,
        sha256_digest: definition.sha256_digest,
      }, await f.issue({
        action: "runtime.blob.put",
        resource_id: definition.artifact_id,
        content_digest: definition.sha256_digest,
        records: 1,
      }));
    }
    let synchronizer = new LocalRuntimeSynchronizer({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      permitted_data_classes: ["runtime-metadata"],
      artifact_repository: blobStore,
      clock: () => NOW,
    });
    const coordinator = new CanonicalFirstReplicaCoordinator({
      synchronizer,
      binding: f.binding,
      clock: () => NOW,
    });
    const prepared = coordinator.prepare({
      commit_id: "replica-commit.runtime.host-loss",
      event: storedEvent({
        event_id: "event.runtime.host-loss",
        sequence: 1,
        predecessor_digest: null,
      }),
      artifacts: definitions,
      created_at: NOW,
    });
    const committed = await coordinator.commit(prepared, {
      push: await f.issue({
        action: "runtime.sync.push",
        resource_id: prepared.batch.batch_id,
        content_digest: prepared.batch.batch_digest,
        records: 3,
      }),
      acknowledge: await f.issue({
        action: "runtime.sync.acknowledge",
        resource_id: prepared.expected_checkpoint.checkpoint_id,
        content_digest: prepared.expected_checkpoint.checkpoint_digest,
        records: 3,
      }),
    });
    synchronizer.close();

    synchronizer = new LocalRuntimeSynchronizer({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      permitted_data_classes: ["runtime-metadata"],
      artifact_repository: blobStore,
      clock: () => NOW,
    });
    const request = cursor(f.binding.descriptor_digest, { cursor_id: "sync-cursor.runtime.host-loss" });
    const restored = await synchronizer.pull(request, await f.issue({
      action: "runtime.sync.pull",
      resource_id: request.cursor_id,
      content_digest: request.cursor_digest,
      records: request.maximum_records,
    }));
    expect(restored.batch).toEqual(prepared.batch);
    expect(restored.source_checkpoint).toEqual(prepared.expected_checkpoint);
    const acknowledgement = await synchronizer.readAcknowledgement(
      prepared.expected_checkpoint,
      await f.issue({
        action: "runtime.sync.read-acknowledgement",
        resource_id: prepared.expected_checkpoint.checkpoint_id,
        content_digest: prepared.expected_checkpoint.checkpoint_digest,
        records: 1,
      }),
    );
    expect(acknowledgement.ack_digest).toBe(committed.acknowledgement_ref.content_digest);
    const restoredPreview = await blobStore.get({
      blob_id: definitions[1]!.artifact_id,
      sha256_digest: definitions[1]!.sha256_digest,
    }, await f.issue({
      action: "runtime.blob.get",
      resource_id: definitions[1]!.artifact_id,
      content_digest: definitions[1]!.sha256_digest,
      records: 1,
    }));
    expect(restoredPreview.bytes).toEqual(previewBytes);
    synchronizer.close();
    f.authorization.ledger.close();
  });
});
