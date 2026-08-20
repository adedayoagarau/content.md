import { describe, expect, it } from "vitest";
import {
  finalizeRecord,
  verifyRecordDigest,
  type DurableRecordInput,
} from "@contentmd/core";

const sourceInput: DurableRecordInput<{
  source_type: string;
  locator: string;
  access_mode: string;
  captured_at: string;
  rights_status: string;
  evidence_strength: string;
}> = {
  record_id: "src_fixture_product_001",
  schema_id: "contentmd.source-record",
  schema_version: "0.1.0",
  record_version: 1,
  scope: {
    memory_scope: "project",
    project_id: "project_fixture_checkout",
    resource_refs: ["PRODUCT.md"],
    data_classes: ["public-synthetic"],
  },
  provenance: [],
  lifecycle_state: "proposed",
  payload: {
    source_type: "product_document",
    locator: "PRODUCT.md",
    access_mode: "local_file",
    captured_at: "2026-08-20T16:00:00.000Z",
    rights_status: "project_owned_synthetic",
    evidence_strength: "direct_read",
  },
};

describe("durable records", () => {
  it("finalizes and verifies a digest over the record preimage", () => {
    const record = finalizeRecord(sourceInput);

    expect(record.content_digest).toMatch(/^[a-f0-9]{64}$/);
    expect(verifyRecordDigest(record)).toEqual({ valid: true });
  });

  it("detects post-finalization mutation", () => {
    const record = finalizeRecord(sourceInput);
    const changed = {
      ...record,
      payload: { ...record.payload, locator: "DESIGN.md" },
    };

    expect(verifyRecordDigest(changed)).toEqual({
      valid: false,
      reason: "content_digest_mismatch",
    });
  });
});
