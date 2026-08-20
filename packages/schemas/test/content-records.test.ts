import { describe, expect, it } from "vitest";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

function validPatternRecord() {
  return {
    record_id: "pattern.fixture.structured-payload",
    schema_id: SCHEMA_IDS.contentPattern,
    schema_version: "0.1.0" as const,
    record_version: 1,
    content_digest: "0".repeat(64),
    scope: {
      memory_scope: "public" as const,
      project_id: null,
      resource_refs: ["packet.fixture"],
      data_classes: ["public-synthetic"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      evidence_strength: "direct_synthetic_observation",
      problem: "A person needs a safe next step.",
      contexts: [{
        journeys: ["checkout"],
        stages: ["post_submission"],
        states: ["outcome_unknown"],
        channels: ["web"],
        modalities: ["visible"],
        locales: ["en-US"],
        risk_levels: ["high"],
      }],
      mechanism: "Verify before retrying.",
      source_refs: ["source.fixture"],
      counterexamples: ["Retry immediately."],
      failure_modes: ["Duplicate transaction."],
      transfer_conditions: [{ field: "state", values: ["outcome_unknown"] }],
      non_transferable_details: ["Provider labels differ."],
      rights_boundary: "Do not copy distinctive wording.",
    },
  };
}

describe("content pattern schema", () => {
  it("accepts the canonical payload with structured context and transfer conditions", () => {
    expect(validateRecord(SCHEMA_IDS.contentPattern, validPatternRecord())).toEqual({ valid: true, errors: [] });
  });

  it("rejects unknown payload keys and empty required arrays", () => {
    const invalid = validPatternRecord();
    invalid.payload.contexts = [];
    invalid.payload.transfer_conditions = [];
    Object.assign(invalid.payload, { unexpected: true });

    const result = validateRecord(SCHEMA_IDS.contentPattern, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/additional properties|minItems/i);
  });
});
