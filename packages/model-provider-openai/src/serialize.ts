import { createHash } from "node:crypto";
import { canonicalJson } from "@contentmd/core";
import {
  resolveRequestOutputSchema,
  type GovernedModelRequest,
  type PreparedProviderRequest,
  type ResolvedRequestOutputSchema,
} from "@contentmd/model-provider-sdk";

export interface PreparedOpenAIResponsesRequest extends PreparedProviderRequest {
  adapter_id: "adapter.openai.responses";
  adapter_version: "0.1.0";
  request_id: string;
  method: "POST";
  destination_origin: "https://api.openai.com";
  destination_path: "/v1/responses";
  body_byte_count: number;
  schema_projection: ResolvedRequestOutputSchema["provider_projection"];
  sdk_client_options: { maxRetries: 0 };
}

const DIGEST = /^[a-f0-9]{64}$/u;

function invalid(field: string): never {
  throw new TypeError(`openai_prepare_invalid:${field}`);
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  if (ArrayBuffer.isView(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function compiledPromptInput(value: unknown): {
  instructions: string;
  input: string;
  prompt_digest: string;
  authority_effect: "none";
} {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return invalid("request.input");
  }
  const keys = Object.keys(value).sort();
  if (keys.join(",") !== "authority_effect,input,instructions,prompt_digest") {
    return invalid("request.input");
  }
  const input = value as Record<string, unknown>;
  if (typeof input.instructions !== "string" || input.instructions.length === 0
    || typeof input.input !== "string" || input.input.length === 0
    || typeof input.prompt_digest !== "string" || !DIGEST.test(input.prompt_digest)
    || input.authority_effect !== "none") {
    return invalid("request.input");
  }
  return input as {
    instructions: string;
    input: string;
    prompt_digest: string;
    authority_effect: "none";
  };
}

function schemaName(schemaId: string): string {
  const name = schemaId.replace(/[^a-zA-Z0-9_-]/gu, "_");
  if (name.length === 0 || name.length > 64) return invalid("output_schema_id");
  return name;
}

export function prepareOpenAIResponsesRequest(
  request: GovernedModelRequest,
): PreparedOpenAIResponsesRequest {
  if (request.schema_version !== "contentmd.model-request/0.2.0"
    || request.requested_provider_id !== "provider.openai"
    || request.provider_application_state !== "none"
    || request.authority_effect !== "none"
    || request.resource_limits.maximum_calls !== 1
    || request.resource_limits.maximum_retries !== 0) {
    return invalid("request");
  }
  const prompt = compiledPromptInput(request.input);
  const resolved = resolveRequestOutputSchema(request.output_schema_id);
  if (resolved.schema_digest !== request.output_schema_digest
    || resolved.schema_version !== request.output_schema_version) {
    return invalid("output_schema");
  }
  const body = {
    background: false,
    input: prompt.input,
    instructions: prompt.instructions,
    max_output_tokens: request.resource_limits.maximum_output_tokens,
    model: request.requested_model_id,
    store: false,
    stream: false,
    text: {
      format: {
        type: "json_schema" as const,
        name: schemaName(request.output_schema_id),
        strict: true as const,
        schema: resolved.provider_projection.schema,
      },
    },
    tools: [] as never[],
    truncation: "disabled" as const,
  };
  const bytes = Buffer.from(canonicalJson(body), "utf8");
  if (bytes.byteLength > request.resource_limits.maximum_input_bytes) {
    return invalid("resource_limits.maximum_input_bytes");
  }
  return deepFreeze({
    adapter_id: "adapter.openai.responses",
    adapter_version: "0.1.0",
    request_id: request.request_id,
    request,
    method: "POST",
    destination_origin: "https://api.openai.com",
    destination_path: "/v1/responses",
    body_bytes: bytes,
    body_digest: createHash("sha256").update(bytes).digest("hex"),
    body_byte_count: bytes.byteLength,
    schema_projection: resolved.provider_projection,
    sdk_client_options: { maxRetries: 0 },
  });
}
