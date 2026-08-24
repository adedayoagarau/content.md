import { createHash } from "node:crypto";
import { sha256Canonical } from "@contentmd/core";
import {
  createProviderReceipt,
  providerExecutionPlanRef,
  type AuthenticatedProviderExecutionPlan,
  type ModelProfile,
  type ProviderReceipt,
} from "@contentmd/governance";
import {
  canonicalizeModelOutput,
  type GovernedModelResponse,
  type ModelExecutionResult,
} from "@contentmd/model-provider-sdk";
import type { GuardedOpenAITransportResult } from "./guarded-fetch.js";
import type { PreparedOpenAIResponsesRequest } from "./serialize.js";

export interface ParseOpenAIResponsesResultInput {
  receipt_id: string;
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  prepared: PreparedOpenAIResponsesRequest;
  model_profile: ModelProfile;
  transport_result: GuardedOpenAITransportResult;
}

export interface ParsedOpenAIResponsesResult {
  execution: ModelExecutionResult;
  receipt: ProviderReceipt;
  authority_effect: "none";
}

export class OpenAIResponseParseError extends Error {
  readonly code: string;

  constructor(code: string) {
    super(`openai_response_invalid:${code}`);
    this.name = "OpenAIResponseParseError";
    this.code = code;
  }
}

interface ParsedEnvelope {
  id: string | null;
  created_at: string | null;
  status: string | null;
  model: string | null;
  output_text: string | null;
  refusal: string | null;
  incomplete_reason: string | null;
  service_tier: string | null;
  store: boolean | null;
  usage: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cached_input_tokens: number;
  };
}

function record(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

function optionalText(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null;
}

function integer(value: unknown): number | null {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0 ? value : null;
}

function parseEnvelope(bytes: Uint8Array): ParsedEnvelope | null {
  let value: unknown;
  try {
    value = JSON.parse(Buffer.from(bytes).toString("utf8")) as unknown;
  } catch {
    return null;
  }
  const root = record(value);
  if (root === null) return null;
  const texts: string[] = [];
  const refusals: string[] = [];
  if (Array.isArray(root.output)) {
    for (const itemValue of root.output) {
      const item = record(itemValue);
      if (item === null || !Array.isArray(item.content)) continue;
      for (const contentValue of item.content) {
        const content = record(contentValue);
        if (content?.type === "output_text" && typeof content.text === "string") {
          texts.push(content.text);
        }
        if (content?.type === "refusal" && typeof content.refusal === "string") {
          refusals.push(content.refusal);
        }
      }
    }
  }
  const usage = record(root.usage);
  const inputTokens = integer(usage?.input_tokens) ?? 0;
  const outputTokens = integer(usage?.output_tokens) ?? 0;
  const inputDetails = record(usage?.input_tokens_details);
  const cachedTokens = integer(inputDetails?.cached_tokens) ?? 0;
  const suppliedTotal = integer(usage?.total_tokens);
  const totalTokens = suppliedTotal === inputTokens + outputTokens
    ? suppliedTotal
    : inputTokens + outputTokens;
  const incomplete = record(root.incomplete_details);
  const created = integer(root.created_at);
  return {
    id: optionalText(root.id),
    created_at: created === null ? null : new Date(created * 1_000).toISOString(),
    status: optionalText(root.status),
    model: optionalText(root.model),
    output_text: texts.length === 1 ? texts[0]! : null,
    refusal: refusals.length === 1 ? refusals[0]! : null,
    incomplete_reason: optionalText(incomplete?.reason),
    service_tier: optionalText(root.service_tier),
    store: typeof root.store === "boolean" ? root.store : null,
    usage: {
      input_tokens: inputTokens,
      output_tokens: outputTokens,
      total_tokens: totalTokens,
      cached_input_tokens: Math.min(cachedTokens, inputTokens),
    },
  };
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

export function parseOpenAIResponsesResult(
  input: ParseOpenAIResponsesResultInput,
): ParsedOpenAIResponsesResult {
  const transport = input.transport_result.response;
  if (transport.body_bytes.byteLength > input.prepared.request.resource_limits.maximum_output_bytes) {
    throw new OpenAIResponseParseError("response_byte_limit_exceeded");
  }
  const rawBodyDigest = createHash("sha256").update(transport.body_bytes).digest("hex");
  const envelope = parseEnvelope(transport.body_bytes);
  let responseState: GovernedModelResponse["response_state"] = "invalid";
  let incompleteReason: string | null = null;
  let refusalReason: string | null = null;
  let canonicalOutput: unknown | null = null;
  let providerOutputDigest: string | null = null;
  let parsedOutputDigest: string | null = null;
  let canonicalOutputDigest: string | null = null;

  if (transport.status < 200 || transport.status >= 300) {
    responseState = "transport_failed";
  } else if (envelope?.status === "incomplete") {
    responseState = "incomplete";
    incompleteReason = envelope.incomplete_reason ?? "provider_incomplete";
  } else if (envelope?.status === "completed" && envelope.refusal !== null) {
    responseState = "refused";
    refusalReason = envelope.refusal;
    providerOutputDigest = createHash("sha256").update(envelope.refusal, "utf8").digest("hex");
  } else if (envelope?.status === "completed"
    && envelope.output_text !== null
    && envelope.model !== null
    && input.model_profile.permitted_returned_model_ids.includes(envelope.model)
    && envelope.store === false) {
    providerOutputDigest = createHash("sha256").update(envelope.output_text, "utf8").digest("hex");
    try {
      const parsed = JSON.parse(envelope.output_text) as unknown;
      parsedOutputDigest = sha256Canonical(parsed);
      const canonical = canonicalizeModelOutput(input.prepared.request.output_schema_id, parsed);
      canonicalOutput = structuredClone(parsed);
      canonicalOutputDigest = canonical.canonical_output_digest;
      responseState = "completed";
    } catch {
      responseState = "invalid";
    }
  }

  const usage = envelope?.usage ?? {
    input_tokens: 0,
    output_tokens: 0,
    total_tokens: 0,
    cached_input_tokens: 0,
  };
  const outputDigest = canonicalOutputDigest ?? sha256Canonical({
    response_state: responseState,
    incomplete_reason: incompleteReason,
    refusal_reason: refusalReason,
    provider_output_digest: providerOutputDigest,
    response_body_digest: rawBodyDigest,
  });
  const response: GovernedModelResponse = {
    schema_version: "contentmd.model-response/0.2.0",
    request_id: input.prepared.request.request_id,
    provider_id: "provider.openai",
    adapter_id: input.prepared.adapter_id,
    adapter_version: input.prepared.adapter_version,
    model_profile_ref: structuredClone(input.prepared.request.requested_model_profile_ref),
    requested_model_id: input.prepared.request.requested_model_id,
    model_id: envelope?.model ?? input.prepared.request.requested_model_id,
    provider_response_id: envelope?.id ?? null,
    provider_created_at: envelope?.created_at ?? null,
    response_state: responseState,
    incomplete_reason: incompleteReason,
    refusal_reason: refusalReason,
    input_digest: input.prepared.request.input_digest,
    provider_output_digest: providerOutputDigest,
    parsed_output_digest: parsedOutputDigest,
    canonical_output_digest: canonicalOutputDigest,
    output_digest: outputDigest,
    schema_projection_id: input.prepared.schema_projection.projection_id,
    schema_projection_digest: input.prepared.schema_projection.projection_digest,
    token_accounting: usage,
    timeout_observed: false,
    retry_count: 0,
    service_tier: envelope?.service_tier ?? null,
    provider_storage_requested: false,
    output_ref: null,
    retention_disposition: "transient_only",
    deterministic_status: "not_deterministic",
    authority_effect: "none",
    output: canonicalOutput,
  };
  const frozenResponse = deepFreeze(response);
  const attempt = input.transport_result.attempt_claim;
  const receipt = createProviderReceipt({
    receipt_id: input.receipt_id,
    plan_ref: providerExecutionPlanRef(input.authenticated_plan.plan),
    attempt_claim_ref: {
      record_id: attempt.event_id,
      schema_id: attempt.schema_version,
      schema_version: "0.1.0",
      content_digest: attempt.event_digest,
    },
    request_id: input.prepared.request.request_id,
    provider_id: "provider.openai",
    requested_model_id: input.prepared.request.requested_model_id,
    returned_model_id: envelope?.model ?? null,
    provider_response_id: envelope?.id ?? null,
    provider_created_at: envelope?.created_at ?? null,
    outcome_state: responseState,
    http_status: transport.status,
    response_body_digest: rawBodyDigest,
    response_body_byte_count: transport.body_bytes.byteLength,
    provider_output_digest: providerOutputDigest,
    model_response_digest: sha256Canonical(frozenResponse),
    token_accounting: usage,
    sent_at: attempt.claimed_at,
    completed_at: transport.received_at,
    outcome_audit_stream_id: input.authenticated_plan.plan.outcome_audit_stream_id,
    retention_disposition: "transient_only",
    authority_effect: "none",
  });
  return deepFreeze({
    execution: {
      response: frozenResponse,
      canonical_output: canonicalOutput === null ? null : deepFreeze(structuredClone(canonicalOutput)),
    },
    receipt,
    authority_effect: "none",
  });
}
