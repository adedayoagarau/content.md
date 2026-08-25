import type {
  ModelExecutionResult,
  ModelProviderDescriptor,
} from "@contentmd/model-provider-sdk";
import type {
  ModelProfile,
  ProviderExecutionAttemptClaim,
  ProviderReceipt,
} from "@contentmd/governance";
import {
  executeGuardedOpenAIRequest,
  type ExecuteGuardedOpenAIRequestInput,
} from "./guarded-fetch.js";
import { parseOpenAIResponsesResult } from "./response-parser.js";
import {
  prepareOpenAIResponsesRequest,
  type PreparedOpenAIResponsesRequest,
} from "./serialize.js";

const DESCRIPTOR: ModelProviderDescriptor = Object.freeze({
  provider_id: "provider.openai",
  provider_version: "0.1.0",
  adapter_id: "adapter.openai.responses",
  adapter_version: "0.1.0",
  execution_mode: "remote",
  deterministic_status: "not_deterministic",
  network_required: true,
  remote_authorization_required: true,
  supported_request_versions: Object.freeze(["contentmd.model-request/0.2.0"]),
  strict_schema_output: true,
});

export interface ExecuteAuthorizedOpenAIRequestInput
  extends ExecuteGuardedOpenAIRequestInput {
  receipt_id: string;
  model_profile: ModelProfile;
}

export interface AuthorizedOpenAIExecutionResult {
  execution: ModelExecutionResult;
  provider_receipt: ProviderReceipt;
  attempt_claim: ProviderExecutionAttemptClaim;
  authority_effect: "none";
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

export class OpenAIResponsesAdapter {
  readonly descriptor = DESCRIPTOR;

  async prepare(
    request: PreparedOpenAIResponsesRequest["request"],
  ): Promise<PreparedOpenAIResponsesRequest> {
    return prepareOpenAIResponsesRequest(request);
  }

  async executeAuthorized(
    input: ExecuteAuthorizedOpenAIRequestInput,
  ): Promise<AuthorizedOpenAIExecutionResult> {
    const transportResult = await executeGuardedOpenAIRequest(input);
    const parsed = parseOpenAIResponsesResult({
      receipt_id: input.receipt_id,
      authenticated_plan: input.authenticated_plan,
      prepared: input.prepared,
      model_profile: input.model_profile,
      transport_result: transportResult,
    });
    return deepFreeze({
      execution: parsed.execution,
      provider_receipt: parsed.receipt,
      attempt_claim: transportResult.attempt_claim,
      authority_effect: "none",
    });
  }
}
