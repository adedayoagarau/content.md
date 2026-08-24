import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { ModelOutputSchemaId } from "@contentmd/schemas";
import { ModelProviderContractError } from "./errors.js";
import { resolveRequestOutputSchema } from "./schema-resolution.js";

export type ModelOperation = "strategy" | "draft" | "rewrite" | "classify" | "evaluate";

export interface ModelObjectRef {
  record_id: string;
  schema_id: string;
  schema_version: string;
  content_digest: string;
}

export interface PromptTemplateRef {
  template_id: string;
  template_version: string;
  template_digest: string;
}

export interface ModelRequestScope {
  project_id: string;
  task_id: string;
  memory_scope: "public" | "organization" | "project" | "session" | "none";
  locale: string;
  channel: string;
  surface: string;
  risk: string;
}

export interface ModelRequestResourceLimits {
  maximum_calls: 1;
  maximum_retries: 0;
  maximum_input_bytes: number;
  maximum_output_bytes: number;
  maximum_input_tokens: number;
  maximum_output_tokens: number;
  timeout_ms: number;
}

export interface GovernedModelRequestInput {
  operation: ModelOperation;
  output_schema_id: ModelOutputSchemaId;
  prompt_template: PromptTemplateRef;
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  requested_provider_id: string;
  requested_model_profile_ref: ModelObjectRef;
  requested_model_id: string;
  scope: ModelRequestScope;
  data_classes: string[];
  egress_item_digests: string[];
  resource_limits: ModelRequestResourceLimits;
  provider_application_state: "none";
  input: unknown;
  authority_effect: "none";
}

export interface GovernedModelRequest extends GovernedModelRequestInput {
  schema_version: "contentmd.model-request/0.2.0";
  request_id: string;
  output_schema_version: "0.1.0";
  output_schema_digest: string;
  input_digest: string;
}

export interface GovernedModelResponse {
  schema_version: "contentmd.model-response/0.2.0";
  request_id: string;
  provider_id: string;
  adapter_id: string;
  adapter_version: string;
  model_profile_ref: ModelObjectRef;
  requested_model_id: string;
  model_id: string;
  provider_response_id: string | null;
  provider_created_at: string | null;
  response_state: "completed" | "refused" | "incomplete" | "invalid" | "transport_failed";
  incomplete_reason: string | null;
  refusal_reason: string | null;
  input_digest: string;
  provider_output_digest: string | null;
  parsed_output_digest: string | null;
  canonical_output_digest: string | null;
  output_digest: string;
  schema_projection_id: string;
  schema_projection_digest: string;
  token_accounting: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cached_input_tokens: number;
  };
  timeout_observed: boolean;
  retry_count: 0;
  service_tier: string | null;
  provider_storage_requested: false;
  output_ref: ModelObjectRef | null;
  retention_disposition: "transient_only" | "authorized_durable";
  deterministic_status: "recorded_exact" | "declared_deterministic" | "not_deterministic";
  authority_effect: "none";
  output: unknown;
}

export interface ModelRequestAuditMaterial extends Omit<GovernedModelRequest, "input"> {}

const DIGEST = /^[a-f0-9]{64}$/u;

function invalid(field: string): never {
  throw new ModelProviderContractError("invalid_model_request", field);
}

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) invalid(field);
}

function digest(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || !DIGEST.test(value)) invalid(field);
}

function ref(value: ModelObjectRef, field: string): void {
  text(value.record_id, `${field}.record_id`);
  text(value.schema_id, `${field}.schema_id`);
  text(value.schema_version, `${field}.schema_version`);
  digest(value.content_digest, `${field}.content_digest`);
}

function sortedUnique(values: readonly string[], field: string, digests = false): string[] {
  if (!Array.isArray(values)) invalid(field);
  for (const value of values) {
    if (digests) digest(value, field);
    else text(value, field);
  }
  return [...new Set(values)].sort((left, right) =>
    Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
}

function positiveInteger(value: number, field: string): void {
  if (!Number.isSafeInteger(value) || value <= 0) invalid(field);
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

export function createGovernedModelRequest(
  input: GovernedModelRequestInput,
): GovernedModelRequest {
  const resolvedSchema = resolveRequestOutputSchema(input.output_schema_id);
  text(input.prompt_template.template_id, "prompt_template.template_id");
  text(input.prompt_template.template_version, "prompt_template.template_version");
  digest(input.prompt_template.template_digest, "prompt_template.template_digest");
  ref(input.context_packet_ref, "context_packet_ref");
  if (input.retrieval_snapshot_ref !== null) ref(input.retrieval_snapshot_ref, "retrieval_snapshot_ref");
  ref(input.requested_model_profile_ref, "requested_model_profile_ref");
  text(input.requested_provider_id, "requested_provider_id");
  text(input.requested_model_id, "requested_model_id");
  for (const field of ["project_id", "task_id", "locale", "channel", "surface", "risk"] as const) {
    text(input.scope[field], `scope.${field}`);
  }
  if (!["public", "organization", "project", "session", "none"].includes(input.scope.memory_scope)) {
    invalid("scope.memory_scope");
  }
  if (input.provider_application_state !== "none") invalid("provider_application_state");
  if (input.authority_effect !== "none") invalid("authority_effect");
  if (input.resource_limits.maximum_calls !== 1) invalid("resource_limits.maximum_calls");
  if (input.resource_limits.maximum_retries !== 0) invalid("resource_limits.maximum_retries");
  for (const field of [
    "maximum_input_bytes",
    "maximum_output_bytes",
    "maximum_input_tokens",
    "maximum_output_tokens",
    "timeout_ms",
  ] as const) {
    positiveInteger(input.resource_limits[field], `resource_limits.${field}`);
  }
  if (input.resource_limits.maximum_output_bytes > resolvedSchema.maximum_output_bytes) {
    invalid("resource_limits.maximum_output_bytes");
  }

  let inputDigest: string;
  try {
    if (Buffer.byteLength(canonicalJson(input.input), "utf8") > input.resource_limits.maximum_input_bytes) {
      invalid("resource_limits.maximum_input_bytes");
    }
    inputDigest = sha256Canonical(input.input);
  } catch {
    invalid("input");
  }
  const preimage = {
    schema_version: "contentmd.model-request/0.2.0" as const,
    operation: input.operation,
    output_schema_id: input.output_schema_id,
    output_schema_version: resolvedSchema.schema_version,
    output_schema_digest: resolvedSchema.schema_digest,
    prompt_template: structuredClone(input.prompt_template),
    context_packet_ref: structuredClone(input.context_packet_ref),
    retrieval_snapshot_ref: structuredClone(input.retrieval_snapshot_ref),
    requested_provider_id: input.requested_provider_id,
    requested_model_profile_ref: structuredClone(input.requested_model_profile_ref),
    requested_model_id: input.requested_model_id,
    scope: structuredClone(input.scope),
    data_classes: sortedUnique(input.data_classes, "data_classes"),
    egress_item_digests: sortedUnique(input.egress_item_digests, "egress_item_digests", true),
    resource_limits: structuredClone(input.resource_limits),
    provider_application_state: input.provider_application_state,
    input: structuredClone(input.input),
    input_digest: inputDigest,
    authority_effect: input.authority_effect,
  };
  const requestDigest = sha256Canonical(preimage);
  return deepFreeze({
    ...preimage,
    request_id: `model_request.${requestDigest.slice(0, 32)}`,
  });
}

export function governedModelRequestDigest(request: GovernedModelRequest): string {
  const { request_id: _requestId, ...preimage } = request;
  return sha256Canonical(preimage);
}

export function modelRequestAuditMaterial(
  request: GovernedModelRequest,
): ModelRequestAuditMaterial {
  const { input: _input, ...audit } = request;
  return deepFreeze(structuredClone(audit));
}
