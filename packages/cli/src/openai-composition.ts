import { sha256Canonical } from "@contentmd/core";
import {
  executeGovernedLiveModel,
  type GovernedLiveModelAdapter,
  type GovernedLiveModelExecutorInput,
  type GovernedLiveModelExecutorResult,
} from "@contentmd/agent";
import {
  OpenAIResponsesAdapter,
  type OpenAISecretResolver,
  type OpenAITransport,
  type PreparedOpenAIResponsesRequest,
} from "@contentmd/model-provider-openai";

interface GovernedOpenAICompositionBase {
  secret_resolver: OpenAISecretResolver;
  transport: OpenAITransport;
}

export type GovernedOpenAICompositionInput = GovernedOpenAICompositionBase & (
  | { environment: "test"; test_origin: string }
  | { environment: "production"; test_origin?: never }
);

type GovernedModelRequest = Parameters<GovernedLiveModelAdapter["prepare"]>[0];
type GovernedModelExecutionResult = NonNullable<GovernedLiveModelExecutorResult["execution"]>;

export interface GovernedOpenAIModelExecutionPort {
  readonly descriptor: GovernedLiveModelAdapter["descriptor"];
  execute(request: GovernedModelRequest): Promise<GovernedModelExecutionResult>;
}

export type GovernedOpenAIModelExecutionPortInput = Omit<
  GovernedLiveModelExecutorInput,
  "adapter" | "compile_request" | "nonce" | "expires_at"
> & {
  openai: GovernedOpenAICompositionInput;
  next_execution(request: GovernedModelRequest): {
    nonce: string;
    expires_at: string;
  };
};

export class OpenAICompositionError extends Error {
  readonly code = "provider_output_not_released" as const;
  readonly reason_code: GovernedLiveModelExecutorResult["reason_code"];

  constructor(reasonCode: GovernedLiveModelExecutorResult["reason_code"]) {
    super(`provider_output_not_released:${reasonCode ?? "unknown"}`);
    this.name = "OpenAICompositionError";
    this.reason_code = reasonCode;
  }
}

function receiptId(input: {
  plan_id: string;
  plan_digest: string;
  request_id: string;
}): string {
  const digest = sha256Canonical({
    contract: "contentmd.openai-provider-receipt-identity/0.1.0",
    plan_id: input.plan_id,
    plan_digest: input.plan_digest,
    request_id: input.request_id,
  });
  return `provider-receipt.openai.${digest.slice(0, 32)}`;
}

/**
 * The only provider-specific composition root. The portable agent receives the
 * returned provider-neutral port and never imports OpenAI types or values.
 */
export function createGovernedOpenAIAdapter(
  input: GovernedOpenAICompositionInput,
): GovernedLiveModelAdapter {
  if (input.environment === "test") {
    let origin: URL;
    try {
      origin = new URL(input.test_origin);
    } catch {
      throw new TypeError("openai_composition_invalid:test_origin");
    }
    if (origin.protocol !== "https:"
      || !(origin.hostname.endsWith(".test") || origin.hostname.endsWith(".invalid"))) {
      throw new TypeError("openai_composition_invalid:test_origin");
    }
  }
  const adapter = new OpenAIResponsesAdapter();
  const composed: GovernedLiveModelAdapter = {
    descriptor: adapter.descriptor,
    prepare: (request) => adapter.prepare(request),
    executeAuthorized: async (executionInput) => {
      if (executionInput.authorization.model_profile === null) {
        throw new TypeError("openai_composition_invalid:model_profile");
      }
      return adapter.executeAuthorized({
        ...executionInput,
        prepared: executionInput.prepared as PreparedOpenAIResponsesRequest,
        receipt_id: receiptId({
          plan_id: executionInput.authenticated_plan.plan.plan_id,
          plan_digest: executionInput.authenticated_plan.plan.plan_digest,
          request_id: executionInput.prepared.request.request_id,
        }),
        model_profile: executionInput.authorization.model_profile,
        test_mode: input.environment === "test",
        ...(input.environment === "test" ? { test_origin: input.test_origin } : {}),
        secret_resolver: input.secret_resolver,
        transport: input.transport,
      });
    },
  };
  return Object.freeze(composed);
}

export function createGovernedOpenAIModelExecutionPort(
  input: GovernedOpenAIModelExecutionPortInput,
): GovernedOpenAIModelExecutionPort {
  const adapter = createGovernedOpenAIAdapter(input.openai);
  return Object.freeze({
    descriptor: adapter.descriptor,
    async execute(request: GovernedModelRequest): Promise<GovernedModelExecutionResult> {
      const execution = input.next_execution(request);
      const result = await executeGovernedLiveModel({
        project_root: input.project_root,
        model_profile_ref: input.model_profile_ref,
        connection_ref: input.connection_ref,
        grant_ref: input.grant_ref,
        control_refs: input.control_refs,
        actor_ref: input.actor_ref,
        expires_at: execution.expires_at,
        nonce: execution.nonce,
        clock: input.clock,
        signer: input.signer,
        store: input.store,
        configuration: input.configuration,
        audit: input.audit,
        adapter,
        compile_request: async () => request,
      });
      if (result.disposition !== "released" || result.execution === null) {
        throw new OpenAICompositionError(result.reason_code);
      }
      return result.execution;
    },
  });
}
