import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
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

  it("rejects duplicate IDs and stale stream heads", async () => {
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
    await store.append(firstCommand);

    await expect(store.append(firstCommand)).rejects.toThrow("duplicate_event_id");
    await expect(
      store.append({
        ...firstCommand,
        event_id: "event.fixture.002",
        expected_head_digest: "0".repeat(64),
      }),
    ).rejects.toThrow("stream_head_conflict");
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

    const directory = await mkdtemp(join(tmpdir(), "contentmd-memory-import-"));
    temporaryDirectories.push(directory);
    const imported = await SqliteEventStore.importCanonical(
      join(directory, "events.sqlite"),
      exported,
      { permitted_data_classes: ["public-synthetic", "project-metadata"] },
    );

    expect(await imported.exportCanonical()).toEqual(exported);
    imported.close();
  });
});
