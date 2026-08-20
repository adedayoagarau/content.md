import { sha256Canonical } from "@contentmd/core";

export type ModelOperation = "strategy" | "draft" | "rewrite" | "classify" | "evaluate";

export interface ModelProviderDescriptor {
  provider_id: string;
  provider_version: string;
  execution_mode: "recorded" | "local" | "remote";
  deterministic_status: "recorded_exact" | "declared_deterministic" | "not_deterministic";
  network_required: boolean;
}

export interface ModelRequestInput {
  operation: ModelOperation;
  output_schema_id: string;
  input: unknown;
}

export interface ModelRequest extends ModelRequestInput {
  schema_version: "contentmd.model-request/0.1.0";
  request_id: string;
}

export interface ModelResponse {
  schema_version: "contentmd.model-response/0.1.0";
  request_id: string;
  provider_id: string;
  model_id: string;
  input_digest: string;
  output_digest: string;
  output: unknown;
  token_accounting: {
    input_tokens: number;
    output_tokens: number;
  };
  deterministic_status: "recorded_exact" | "declared_deterministic" | "not_deterministic";
  authority_effect: "none";
}

export interface ModelProvider {
  descriptor: ModelProviderDescriptor;
  generate(request: ModelRequest): Promise<ModelResponse>;
}

export function createModelRequest(input: ModelRequestInput): ModelRequest {
  if (input.output_schema_id.trim().length === 0) {
    throw new TypeError("output_schema_id must be nonempty");
  }
  const preimage = {
    schema_version: "contentmd.model-request/0.1.0" as const,
    operation: input.operation,
    output_schema_id: input.output_schema_id,
    input: input.input,
  };
  return {
    ...preimage,
    request_id: `model_request.${sha256Canonical(preimage).slice(0, 32)}`,
  };
}

export function modelRequestDigest(request: ModelRequest): string {
  return sha256Canonical(request);
}
