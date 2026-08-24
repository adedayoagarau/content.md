import { describe, expect, it } from "vitest";
import * as learning from "../src/index.js";

describe("Task 6 rollback and fallback boundary", () => {
  it("exposes the exact governed rollback seam", () => {
    expect(typeof (learning as Record<string, unknown>).simulateRollback).toBe("function");
  });

  it("short-circuits official rollback before reading nested evidence", () => {
    let reads = 0;
    const trapped = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("nested read");
      },
    });
    expect(() => learning.simulateRollback({
      record_mode: "official",
      vault: trapped,
      binding_stream_id: "learning_binding_sim.invalid",
      expected_head_digest: "0".repeat(64),
      requested_target_event_digest: null,
      ordered_target_replays: trapped,
      fallback_baseline_ref: trapped,
      reason_code: "incident_recovery",
      actor_ref: "actor.task6.official",
      occurred_at: "2026-11-03T19:00:00.001Z",
    } as never)).toThrow("task6_contract_invalid:task6_official_mode_not_supported");
    expect(reads).toBe(0);
  });
});
