import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import * as research from "@contentmd/research";

const packetRoot = fileURLToPath(
  new URL("../../../fixtures/frozen-pattern-packet/", import.meta.url),
);
const conversionEnvelope = {
  scope: {
    memory_scope: "public" as const,
    project_id: null,
    resource_refs: ["pattern-packet.synthetic-foundation.0.1"],
    data_classes: ["public-synthetic"],
  },
  provenance: [],
  lifecycle_state: "active" as const,
};

async function firstPacket(): Promise<Record<string, unknown>> {
  const [line] = (await readFile(`${packetRoot}/patterns.jsonl`, "utf8")).split("\n");
  return JSON.parse(line!) as Record<string, unknown>;
}

describe("pattern packet conversion", () => {
  it("converts the frozen packet into its complete canonical durable record", async () => {
    const convertPatternPacketV01 = (research as unknown as {
      convertPatternPacketV01?: (packet: Record<string, unknown>, envelope: typeof conversionEnvelope) => unknown;
    }).convertPatternPacketV01;
    const record = convertPatternPacketV01!(await firstPacket(), conversionEnvelope) as {
      record_id: string;
      schema_id: string;
      schema_version: string;
      record_version: number;
      content_digest: string;
      payload: Record<string, unknown>;
    };

    expect(record).toMatchObject({
      record_id: "pattern.recovery.unknown-outcome",
      schema_id: "contentmd.content-pattern-record",
      schema_version: "0.1.0",
      record_version: 1,
      payload: {
        evidence_strength: "direct_synthetic_observation",
        contexts: [{ states: ["outcome_unknown"] }],
        counterexamples: ["Declare failure and invite another attempt when the first attempt may still complete."],
        failure_modes: ["A duplicate transaction or contradictory status can result when uncertainty is collapsed into failure."],
        non_transferable_details: ["Provider-specific status names, timing, and support routes require current product evidence."],
        rights_boundary: "Transfer the recovery sequence, never another product's distinctive wording, brand voice, or provider terminology.",
      },
    });
    expect(record.payload.transfer_conditions).toEqual([
      { field: "journey", values: ["checkout"] },
      { field: "state", values: ["outcome_unknown"] },
      { field: "risk_level", values: ["high"] },
    ]);
    expect(record.content_digest).toMatch(/^[a-f0-9]{64}$/);
  });

  it("rejects unknown packet fields instead of silently retaining them", async () => {
    const convertPatternPacketV01 = (research as unknown as {
      convertPatternPacketV01?: (packet: Record<string, unknown>, envelope: typeof conversionEnvelope) => unknown;
    }).convertPatternPacketV01;
    const packet = await firstPacket();
    packet.unrecognized = "must not cross the conversion boundary";

    expect(() => convertPatternPacketV01!(packet, conversionEnvelope)).toThrow(
      "invalid_pattern_record:unknown_field:unrecognized",
    );
  });

  it("uses the explicit envelope and produces a stable digest for equivalent packets", async () => {
    const convertPatternPacketV01 = (research as unknown as {
      convertPatternPacketV01?: (packet: Record<string, unknown>, envelope: typeof conversionEnvelope) => {
        scope: unknown;
        lifecycle_state: string;
        content_digest: string;
      };
    }).convertPatternPacketV01;
    const packet = await firstPacket();
    const reorderedPacket = Object.fromEntries(Object.entries(packet).reverse());

    const first = convertPatternPacketV01!(packet, conversionEnvelope);
    const second = convertPatternPacketV01!(reorderedPacket, conversionEnvelope);

    expect(first.scope).toEqual(conversionEnvelope.scope);
    expect(first.lifecycle_state).toBe("active");
    expect(first.content_digest).toBe(second.content_digest);
  });

  it("rejects unknown conversion-envelope fields", async () => {
    const convertPatternPacketV01 = (research as unknown as {
      convertPatternPacketV01?: (packet: Record<string, unknown>, envelope: Record<string, unknown>) => unknown;
    }).convertPatternPacketV01;
    const envelope = { ...conversionEnvelope, inferred_authority: "not permitted" };
    const packet = await firstPacket();

    expect(() => convertPatternPacketV01!(packet, envelope)).toThrow(
      "invalid_pattern_conversion_envelope:unknown_field:inferred_authority",
    );
  });
});
