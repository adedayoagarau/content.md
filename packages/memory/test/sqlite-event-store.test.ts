import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { SqliteEventStore } from "@contentmd/memory";

const temporaryDirectories: string[] = [];

async function createStore() {
  const directory = await mkdtemp(join(tmpdir(), "contentmd-memory-"));
  temporaryDirectories.push(directory);
  return new SqliteEventStore(join(directory, "events.sqlite"), {
    permitted_data_classes: ["public-synthetic", "project-metadata"],
  });
}

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("SqliteEventStore", () => {
  it("appends a digest-linked stream with monotonic sequences", async () => {
    const store = await createStore();
    const first = await store.append({
      event_id: "event.fixture.001",
      stream_id: "stream.fixture.project",
      event_type: "record.proposed",
      occurred_at: "2026-08-20T16:00:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "source.fixture.001", state: "proposed" },
      expected_head_digest: null,
    });
    const second = await store.append({
      event_id: "event.fixture.002",
      stream_id: "stream.fixture.project",
      event_type: "record.approved",
      occurred_at: "2026-08-20T16:01:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "project-metadata",
      payload: { record_id: "source.fixture.001", state: "approved" },
      expected_head_digest: first.event_digest,
    });

    expect(first.sequence).toBe(1);
    expect(first.predecessor_digest).toBeNull();
    expect(first.payload_digest).toBe(sha256Canonical(first.payload));
    expect(second.sequence).toBe(2);
    expect(second.predecessor_digest).toBe(first.event_digest);
    expect(await store.getHead("stream.fixture.project")).toEqual({
      stream_id: "stream.fixture.project",
      sequence: 2,
      event_id: "event.fixture.002",
      event_digest: second.event_digest,
    });
    store.close();
  });

  it("replays an identical event ID and rejects a different event under that ID", async () => {
    const store = await createStore();
    const firstCommand = {
      event_id: "event.fixture.001",
      stream_id: "stream.fixture.project",
      event_type: "record.proposed",
      occurred_at: "2026-08-20T16:00:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "source.fixture.001" },
      expected_head_digest: null,
    } as const;
    const first = await store.append(firstCommand);

    await expect(store.append(firstCommand)).resolves.toEqual(first);
    await expect(store.append({
      ...firstCommand,
      payload: { changed: true },
    })).rejects.toThrow("event_id_digest_conflict:event.fixture.001");
    await expect(
      store.append({
        ...firstCommand,
        event_id: "event.fixture.002",
        expected_head_digest: "0".repeat(64),
      }),
    ).rejects.toThrow("stream_head_conflict");
    store.close();
  });

  it("rejects an identical replay when an exclusive append claims a one-shot effect", async () => {
    const store = await createStore();
    const command = {
      event_id: "event.fixture.exclusive.001",
      stream_id: "stream.fixture.exclusive",
      event_type: "record.claimed",
      occurred_at: "2026-08-20T16:00:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "claim.fixture.001" },
      expected_head_digest: null,
    } as const;

    await expect(store.appendExclusive(command)).resolves.toMatchObject({ sequence: 1 });
    await expect(store.appendExclusive(command)).rejects.toThrow(
      "duplicate_event_id:event.fixture.exclusive.001",
    );
    expect(await store.readStream(command.stream_id)).toHaveLength(1);
    store.close();
  });

  it("commits an ordered transaction atomically and rolls back every event on failure", async () => {
    const store = await createStore();
    const firstCommand = {
      event_id: "event.transaction.001",
      stream_id: "stream.transaction.project",
      event_type: "record.proposed",
      occurred_at: "2026-08-20T16:10:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "source.transaction.001", state: "proposed" },
      expected_head_digest: null,
    } as const;
    const firstDigest = sha256Canonical({
      event_id: firstCommand.event_id,
      stream_id: firstCommand.stream_id,
      sequence: 1,
      schema_version: "0.1.0",
      event_type: firstCommand.event_type,
      occurred_at: firstCommand.occurred_at,
      actor_ref: firstCommand.actor_ref,
      data_class: firstCommand.data_class,
      payload: firstCommand.payload,
      predecessor_digest: null,
    });
    const secondCommand = {
      event_id: "event.transaction.002",
      stream_id: firstCommand.stream_id,
      event_type: "record.approved",
      occurred_at: "2026-08-20T16:11:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "project-metadata",
      payload: { record_id: "source.transaction.001", state: "approved" },
      expected_head_digest: firstDigest,
    } as const;

    const events = await store.appendTransaction({
      transaction_id: "transaction.fixture.001",
      commands: [firstCommand, secondCommand],
    });
    expect(events.map((event) => [event.event_id, event.sequence])).toEqual([
      ["event.transaction.001", 1],
      ["event.transaction.002", 2],
    ]);
    expect(await store.getEvent("event.transaction.002")).toEqual(events[1]);

    await expect(store.appendTransaction({
      transaction_id: "transaction.fixture.rollback",
      commands: [{
        ...firstCommand,
        event_id: "event.transaction.rollback.001",
        stream_id: "stream.transaction.rollback",
        expected_head_digest: null,
      }, {
        ...secondCommand,
        event_id: "event.transaction.rollback.002",
        stream_id: "stream.transaction.rollback",
        data_class: "raw-private-content",
        expected_head_digest: null,
      }],
    })).rejects.toThrow("data_class_not_permitted");
    await expect(store.getEvent("event.transaction.rollback.001")).resolves.toBeNull();
    await expect(store.getHead("stream.transaction.rollback")).resolves.toBeNull();
    store.close();
  });

  it("denies undeclared private data classes", async () => {
    const store = await createStore();

    await expect(
      store.append({
        event_id: "event.fixture.private.001",
        stream_id: "stream.fixture.project",
        event_type: "record.proposed",
        occurred_at: "2026-08-20T16:00:00.000Z",
        actor_ref: "actor.fixture.user",
        data_class: "raw-private-content",
        payload: { secret: "must not persist" },
        expected_head_digest: null,
      }),
    ).rejects.toThrow("data_class_not_permitted");
    store.close();
  });

  it("exports and imports byte-identical canonical events", async () => {
    const source = await createStore();
    await source.append({
      event_id: "event.fixture.001",
      stream_id: "stream.fixture.project",
      event_type: "record.proposed",
      occurred_at: "2026-08-20T16:00:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { b: 2, a: 1 },
      expected_head_digest: null,
    });
    const exported = await source.exportCanonical();
    source.close();
    const exportedDocument = JSON.parse(new TextDecoder().decode(exported)) as {
      schema_version: "0.1.0";
      events: Array<Record<string, unknown>>;
      document_digest: string;
    };
    expect(exportedDocument.document_digest).toBe(sha256Canonical({
      schema_version: exportedDocument.schema_version,
      events: exportedDocument.events,
    }));

    const directory = await mkdtemp(join(tmpdir(), "contentmd-memory-import-"));
    temporaryDirectories.push(directory);
    const imported = await SqliteEventStore.importCanonical(
      join(directory, "events.sqlite"),
      exported,
      { permitted_data_classes: ["public-synthetic", "project-metadata"] },
    );

    expect(await imported.exportCanonical()).toEqual(exported);
    imported.close();

    const tamperedEvents = structuredClone(exportedDocument.events);
    tamperedEvents[0]!.payload = { b: 2, a: 9 };
    const tampered = {
      schema_version: exportedDocument.schema_version,
      events: tamperedEvents,
      document_digest: sha256Canonical({
        schema_version: exportedDocument.schema_version,
        events: tamperedEvents,
      }),
    };
    const tamperedDirectory = await mkdtemp(join(tmpdir(), "contentmd-memory-import-tampered-"));
    temporaryDirectories.push(tamperedDirectory);
    await expect(SqliteEventStore.importCanonical(
      join(tamperedDirectory, "events.sqlite"),
      new TextEncoder().encode(canonicalJson(tampered)),
      { permitted_data_classes: ["public-synthetic", "project-metadata"] },
    )).rejects.toThrow("event_export_integrity_failure");
  });
});
