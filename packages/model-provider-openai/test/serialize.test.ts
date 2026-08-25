import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { prepareOpenAIResponsesRequest } from "../src/index.js";
import { modelRequest } from "./fixtures.js";

describe("prepareOpenAIResponsesRequest", () => {
  it("freezes exact stateless Responses wire bytes with strict structured output", () => {
    const request = modelRequest();
    const prepared = prepareOpenAIResponsesRequest(request);
    const body = JSON.parse(Buffer.from(prepared.body_bytes).toString("utf8")) as Record<string, unknown>;

    expect(prepared).toMatchObject({
      adapter_id: "adapter.openai.responses",
      adapter_version: "0.1.0",
      request_id: request.request_id,
      method: "POST",
      destination_origin: "https://api.openai.com",
      destination_path: "/v1/responses",
      body_byte_count: prepared.body_bytes.byteLength,
      sdk_client_options: { maxRetries: 0 },
    });
    expect(prepared.body_digest).toBe(
      createHash("sha256").update(prepared.body_bytes).digest("hex"),
    );
    expect(body).toMatchObject({
      model: "gpt-fixture",
      store: false,
      background: false,
      stream: false,
      tools: [],
      truncation: "disabled",
      max_output_tokens: 2_000,
      text: {
        format: {
          type: "json_schema",
          strict: true,
          name: "contentmd_classification-model-output_0_1_0",
        },
      },
    });
    expect((body.text as { format: { schema: unknown } }).format.schema)
      .toEqual(prepared.schema_projection.schema);
    expect(body).not.toHaveProperty("previous_response_id");
    expect(body).not.toHaveProperty("conversation");
    expect(body).not.toHaveProperty("metadata");
    expect(Object.isFrozen(prepared)).toBe(true);
    expect(Object.isFrozen(prepared.schema_projection)).toBe(true);
  });

  it("rejects caller input that is not the compiled prompt contract", () => {
    const request = structuredClone(modelRequest());
    request.input = { arbitrary: "raw prompt" };

    expect(() => prepareOpenAIResponsesRequest(request))
      .toThrow("openai_prepare_invalid:request.input");
  });
});
