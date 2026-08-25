import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  createModelRequest,
  modelRequestAuditMaterial,
  modelRequestDigest,
  type GovernedModelRequestInput,
} from "@contentmd/model-provider-sdk";

function ref(recordId: string) {
  return {
    record_id: recordId,
    schema_id: "contentmd.fixture-record",
    schema_version: "0.1.0",
    content_digest: "a".repeat(64),
  };
}

function requestInput(): GovernedModelRequestInput {
  return {
    operation: "draft",
    output_schema_id: "contentmd.draft-model-output/0.1.0",
    prompt_template: {
      template_id: "contentmd.prompt.draft",
      template_version: "0.1.0",
      template_digest: "b".repeat(64),
    },
    context_packet_ref: ref("context.fixture"),
    retrieval_snapshot_ref: ref("retrieval.fixture"),
    requested_provider_id: "provider.recorded",
    requested_model_profile_ref: ref("model-profile.fixture"),
    requested_model_id: "model.synthetic-writer-v2",
    scope: {
      project_id: "project.fixture",
      task_id: "task.fixture",
      memory_scope: "project",
      locale: "en-US",
      channel: "web",
      surface: "checkout",
      risk: "high",
    },
    data_classes: ["project_fact", "public_pattern", "project_fact"],
    egress_item_digests: ["d".repeat(64), "c".repeat(64), "d".repeat(64)],
    resource_limits: {
      maximum_calls: 1,
      maximum_retries: 0,
      maximum_input_bytes: 32_768,
      maximum_output_bytes: 65_536,
      maximum_input_tokens: 8_000,
      maximum_output_tokens: 2_000,
      timeout_ms: 30_000,
    },
    provider_application_state: "none",
    input: { task: "Write a safe status message", private_source_text: "transient" },
    authority_effect: "none",
  };
}

describe("governed model contracts", () => {
  it("creates a canonical 0.2 request bound to schema, prompt, context, model, scope, and ceilings", () => {
    const input = requestInput();
    const request = createModelRequest(input);

    expect(request.schema_version).toBe("contentmd.model-request/0.2.0");
    expect(request.output_schema_version).toBe("0.1.0");
    expect(request.output_schema_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(request.input_digest).toBe(sha256Canonical(input.input));
    expect(request.data_classes).toEqual(["project_fact", "public_pattern"]);
    expect(request.egress_item_digests).toEqual(["c".repeat(64), "d".repeat(64)]);
    expect(request.authority_effect).toBe("none");
    expect(request.request_id).toBe(`model_request.${modelRequestDigest(request).slice(0, 32)}`);
    expect(Object.isFrozen(request)).toBe(true);
    expect(Object.isFrozen(request.resource_limits)).toBe(true);
  });

  it("emits minimized durable audit material without raw model input", () => {
    const request = createModelRequest(requestInput());
    const audit = modelRequestAuditMaterial(request);

    expect(audit).not.toHaveProperty("input");
    expect(audit.input_digest).toBe(request.input_digest);
    expect(audit.context_packet_ref).toEqual(request.context_packet_ref);
    expect(audit.egress_item_digests).toEqual(request.egress_item_digests);
    expect(JSON.stringify(audit)).not.toContain("private_source_text");
  });

  it("rejects hidden state, invalid ceilings, malformed digests, and authority widening", () => {
    const invalidCases: GovernedModelRequestInput[] = [
      { ...requestInput(), provider_application_state: "conversation" as "none" },
      { ...requestInput(), resource_limits: { ...requestInput().resource_limits, maximum_retries: 1 } },
      { ...requestInput(), resource_limits: { ...requestInput().resource_limits, maximum_input_bytes: 1 } },
      { ...requestInput(), egress_item_digests: ["not-a-digest"] },
      { ...requestInput(), authority_effect: "approve" as "none" },
    ];

    for (const input of invalidCases) {
      expect(() => createModelRequest(input)).toThrow(/invalid_model_request/u);
    }
  });

  it("does not mutate caller-owned arrays or input objects", () => {
    const input = requestInput();
    const before = structuredClone(input);

    createModelRequest(input);

    expect(input).toEqual(before);
  });
});
