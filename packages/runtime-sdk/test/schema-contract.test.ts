import { describe, expect, it } from "vitest";
import { SCHEMA_IDS } from "../../schemas/src/index.js";

describe("portable runtime schema IDs", () => {
  it("publishes the exact durable runtime schema families", () => {
    expect(SCHEMA_IDS).toMatchObject({
      runtimeDetectionReport: "contentmd.runtime-detection-report",
      runtimeProposal: "contentmd.runtime-proposal-record",
      runtimeBindingDecision: "contentmd.runtime-binding-decision-record",
      runtimeBinding: "contentmd.runtime-binding-record",
      runtimeConformanceReceipt: "contentmd.runtime-conformance-receipt",
      replicaArtifactManifest: "contentmd.replica-artifact-manifest",
      replicaAck: "contentmd.replica-ack-record",
    });
  });
});
