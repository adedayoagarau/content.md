import { sha256Canonical } from "@contentmd/core";
import {
  createGovernedModelRequest,
  governedModelRequestDigest,
  type GovernedModelRequest,
  type GovernedModelRequestInput,
  type GovernedModelResponse,
  type ModelOperation,
} from "./contracts.js";

export type { ModelOperation } from "./contracts.js";

export interface ModelProviderDescriptor {
  provider_id: string;
  provider_version: string;
  adapter_id: string;
  adapter_version: string;
  execution_mode: "recorded" | "local" | "remote";
  deterministic_status: "recorded_exact" | "declared_deterministic" | "not_deterministic";
  network_required: boolean;
  remote_authorization_required: boolean;
  supported_request_versions: readonly string[];
  strict_schema_output: boolean;
}

export interface LegacyModelRequestInput {
  operation: ModelOperation;
  output_schema_id: string;
  input: unknown;
}

export interface LegacyModelRequest extends LegacyModelRequestInput {
  schema_version: "contentmd.model-request/0.1.0";
  request_id: string;
}

export interface LegacyModelResponse {
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

export type ModelRequestInput = LegacyModelRequestInput | GovernedModelRequestInput;
export type ModelRequest = LegacyModelRequest | GovernedModelRequest;
export type ModelResponse = LegacyModelResponse | GovernedModelResponse;

export interface ModelProvider {
  descriptor: ModelProviderDescriptor;
  generate(request: ModelRequest): Promise<ModelResponse>;
}

export function createModelRequest(input: GovernedModelRequestInput): GovernedModelRequest;
export function createModelRequest(input: LegacyModelRequestInput): LegacyModelRequest;
export function createModelRequest(input: ModelRequestInput): ModelRequest {
  if ("prompt_template" in input) return createGovernedModelRequest(input);
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
  if (request.schema_version === "contentmd.model-request/0.2.0") {
    return governedModelRequestDigest(request);
  }
  return sha256Canonical(request);
}
