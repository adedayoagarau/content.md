import { describe, expect, it } from "vitest";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

const digest = "0".repeat(64);

function ref(recordId: string, schemaId: string) {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function record(schemaId: string, recordId: string, payload: unknown) {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.research",
      resource_refs: ["research.batch.synthetic"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed",
    payload,
  };
}

function validFeatureDefinition() {
  return record(
    SCHEMA_IDS.voiceToneFeatureDefinition,
    "voice_tone_feature.directness.v1",
    {
      contract_version: "contentmd.voice-tone-feature-definition/0.1.0",
      feature_name: "directness",
      definition_version: "1.0.0",
      description: "How explicitly the expression states the action and consequence.",
      value_kind: "bounded_interval",
      lower_bound: 0,
      upper_bound: 1,
      measurement_notes: ["Keep product truth and accessibility on separate hard planes."],
      applicability: "advisory_only",
      authority_effect: "none",
    },
  );
}

function validDomainOverlay() {
  return record(
    SCHEMA_IDS.domainOverlay,
    "domain_overlay.synthetic.finance",
    {
      contract_version: "contentmd.domain-overlay/0.1.0",
      domain: "financial_services",
      industry_context: "finance_and_payments",
      risk_levels: ["high"],
      constraint_refs: [ref("constraint.synthetic.disclosure", "contentmd.synthetic-constraint")],
      evidence_refs: [ref("claim.synthetic.disclosure", SCHEMA_IDS.researchClaim)],
      industry_authority_effect: "none",
      authority_effect: "none",
      limitations: ["Industry context does not approve wording or voice."],
    },
  );
}

describe("voice and tone record schemas", () => {
  it("accepts a closed advisory feature definition", () => {
    expect(validateRecord(
      SCHEMA_IDS.voiceToneFeatureDefinition,
      validFeatureDefinition(),
    )).toEqual({ valid: true, errors: [] });
  });

  it("keeps an industry overlay from owning or approving voice", () => {
    expect(validateRecord(
      SCHEMA_IDS.domainOverlay,
      validDomainOverlay(),
    )).toEqual({ valid: true, errors: [] });

    for (const mutation of [
      { industry_authority_effect: "voice_owner" },
      { authority_effect: "approved" },
    ]) {
      const invalid = validDomainOverlay();
      Object.assign(invalid.payload, mutation);
      expect(validateRecord(SCHEMA_IDS.domainOverlay, invalid).valid).toBe(false);
    }
  });

  it("rejects voice features that collapse a hard product-truth plane into style", () => {
    const invalid = validFeatureDefinition();
    Object.assign(invalid.payload, { feature_name: "product_truth" });

    const result = validateRecord(SCHEMA_IDS.voiceToneFeatureDefinition, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/feature_name|enum/i);
  });
});
