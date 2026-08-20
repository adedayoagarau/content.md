import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  SqliteEventStore,
  type Projector,
  type StoredEvent,
} from "@contentmd/memory";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(
    temporaryDirectories.splice(0).map((directory) =>
      rm(directory, { recursive: true, force: true }),
    ),
  );
});

describe("event projection", () => {
  it("rebuilds the same supersession state without mutating prior events", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-projector-"));
    temporaryDirectories.push(directory);
    const store = new SqliteEventStore(join(directory, "events.sqlite"), {
      permitted_data_classes: ["public-synthetic"],
    });
    const first = await store.append({
      event_id: "event.fixture.001",
      stream_id: "stream.fixture.records",
      event_type: "record.proposed",
      occurred_at: "2026-08-20T16:00:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "message.fixture.001", version: 1 },
      expected_head_digest: null,
    });
    await store.append({
      event_id: "event.fixture.002",
      stream_id: "stream.fixture.records",
      event_type: "record.superseded",
      occurred_at: "2026-08-20T16:01:00.000Z",
      actor_ref: "actor.fixture.user",
      data_class: "public-synthetic",
      payload: { record_id: "message.fixture.001", version: 1 },
      expected_head_digest: first.event_digest,
    });

    type State = { active: string[]; superseded: string[] };
    const projector: Projector<State> = {
      initial: () => ({ active: [], superseded: [] }),
      apply(state: State, event: StoredEvent): State {
        const recordId = (event.payload as { record_id: string }).record_id;
        if (event.event_type === "record.proposed") {
          return { ...state, active: [...state.active, recordId] };
        }
        return {
          active: state.active.filter((value) => value !== recordId),
          superseded: [...state.superseded, recordId],
        };
      },
    };

    const firstBuild = await store.rebuild(projector);
    const secondBuild = await store.rebuild(projector);

    expect(firstBuild).toEqual({
      active: [],
      superseded: ["message.fixture.001"],
    });
    expect(secondBuild).toEqual(firstBuild);
    expect(await store.readStream("stream.fixture.records")).toHaveLength(2);
    store.close();
  });
});
