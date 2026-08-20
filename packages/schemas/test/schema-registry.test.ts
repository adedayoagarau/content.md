import { describe, expect, it } from "vitest";
import {
  SCHEMA_IDS,
  validateRecord,
  validateRecordSet,
} from "@contentmd/schemas";

function validSourceRecord() {
  return {
    record_id: "src_fixture_product_001",
    schema_id: SCHEMA_IDS.source,
    schema_version: "0.1.0" as const,
    record_version: 1,
    content_digest: "0".repeat(64),
    scope: {
      memory_scope: "project" as const,
      project_id: "project_fixture_checkout",
      resource_refs: ["PRODUCT.md"],
      data_classes: ["public-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed" as const,
    payload: {
      source_type: "product_document",
      locator: "PRODUCT.md",
      access_mode: "local_file",
      captured_at: "2026-08-20T16:00:00.000Z",
      rights_status: "project_owned_synthetic",
      evidence_strength: "direct_read",
    },
  };
}

describe("schema registry", () => {
  it("validates a source record with no unknown fields", () => {
    const result = validateRecord(SCHEMA_IDS.source, validSourceRecord());

    expect(result).toEqual({ valid: true, errors: [] });
  });

  it("rejects unknown fields and malformed digests", () => {
    const invalid = {
      ...validSourceRecord(),
      content_digest: "not-a-digest",
      unexpected: true,
    };

    const result = validateRecord(SCHEMA_IDS.source, invalid);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/additional properties|content_digest/i);
  });

  it("rejects a schema selector that disagrees with the record", () => {
    const result = validateRecord(SCHEMA_IDS.finding, validSourceRecord());

    expect(result).toEqual({
      valid: false,
      errors: [
        "schema_id mismatch: expected contentmd.finding-record, received contentmd.source-record",
      ],
    });
  });

  it("rejects duplicate record identities", () => {
    const record = validSourceRecord();
    const result = validateRecordSet([record, record]);

    expect(result).toEqual({
      valid: false,
      errors: ["duplicate record_id: src_fixture_product_001"],
    });
  });

  it("rejects a finding whose hard/advisory union is ambiguous", () => {
    const invalidFinding = {
      record_id: "finding_fixture_001",
      schema_id: SCHEMA_IDS.finding,
      schema_version: "0.1.0" as const,
      record_version: 1,
      content_digest: "0".repeat(64),
      scope: {
        memory_scope: "project" as const,
        project_id: "project_fixture_checkout",
        resource_refs: ["occ_fixture_001"],
        data_classes: ["public-synthetic"],
      },
      provenance: [],
      lifecycle_state: "proposed" as const,
      payload: {
        rule_id: "rule.unsupported-claim.v1",
        severity: "high",
        classification: "hard",
        hard_outcome: "truthfulness",
        advisory_dimension: "clarity",
        occurrence_refs: ["occ_fixture_001"],
        evidence_refs: [],
        rationale: "The superlative has no supporting fact.",
        uncertainty: "none",
        next_action: "Supply evidence or remove the claim.",
        automatic_rewrite_allowed: false,
      },
    };

    const result = validateRecord(SCHEMA_IDS.finding, invalidFinding);

    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/oneOf/i);
  });
});
