import type {
  GovernedModelRequest,
  GovernedModelResponse,
  ModelObjectRef,
} from "./contracts.js";
import type { ModelProviderDescriptor } from "./provider.js";

export interface ModelExecutionResult {
  response: GovernedModelResponse;
  canonical_output: unknown | null;
}

export interface ModelExecutionPort {
  descriptor: ModelProviderDescriptor;
  execute(request: GovernedModelRequest): Promise<ModelExecutionResult>;
}

export interface PreparedProviderRequest {
  request: GovernedModelRequest;
  body_bytes: Uint8Array;
  body_digest: string;
  destination_origin: string;
  destination_path: string;
}

export type AuthenticatedExecutionPlanRef = ModelObjectRef;

export interface ProviderRuntimePorts {
  now(): string;
}

export interface AuthorizedProviderAdapter {
  descriptor: ModelProviderDescriptor;
  prepare(input: GovernedModelRequest): Promise<PreparedProviderRequest>;
  executeAuthorized(
    prepared: PreparedProviderRequest,
    planRef: AuthenticatedExecutionPlanRef,
    ports: ProviderRuntimePorts,
  ): Promise<ModelExecutionResult>;
}
