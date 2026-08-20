import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { ingestPatternPacket, retrievePatterns } from "@contentmd/research";

const packetRoot = fileURLToPath(
  new URL("../../../fixtures/frozen-pattern-packet/", import.meta.url),
);

describe("deterministic pattern retrieval", () => {
  it("ranks a transferable recovery mechanism and records why", async () => {
    const packet = await ingestPatternPacket(packetRoot);
    const query = {
      journey: "checkout",
      stage: "post_submission",
      state: "outcome_unknown",
      channel: "web",
      modality: "visible",
      locale: "en-US",
      risk_level: "high",
      rights_status: "project_owned_synthetic",
    };
    const first = retrievePatterns(query, packet.patterns);
    const second = retrievePatterns(structuredClone(query), structuredClone(packet.patterns));

    expect(first).toEqual(second);
    expect(first[0]).toEqual(
      expect.objectContaining({
        pattern_id: "pattern.recovery.unknown-outcome",
        eligible: true,
      }),
    );
    expect(first[0]?.reasons).toContain("transfer:state=outcome_unknown");
  });

  it("keeps a transfer-condition mismatch as an explicit nonmatch", async () => {
    const packet = await ingestPatternPacket(packetRoot);
    const results = retrievePatterns(
      {
        journey: "checkout",
        stage: "pre_submission",
        state: "ready_to_submit",
        channel: "web",
        modality: "visible",
        locale: "en-US",
        risk_level: "high",
        rights_status: "project_owned_synthetic",
      },
      packet.patterns,
    );
    const recovery = results.find((result) => result.pattern_id === "pattern.recovery.unknown-outcome");

    expect(recovery).toEqual(
      expect.objectContaining({
        eligible: false,
        nonmatch_reasons: expect.arrayContaining(["transfer_mismatch:state"]),
      }),
    );
  });
});
