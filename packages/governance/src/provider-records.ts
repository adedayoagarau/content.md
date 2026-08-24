import { sha256Canonical } from "@contentmd/core";
import type {
  ModelObjectRef,
  ModelOperation,
  ModelOutputSchemaId,
} from "@contentmd/model-provider-sdk";
import type {
  CapabilityGrant,
  EgressMode,
  ResourceLimits,
} from "./policy.js";

export type ProviderRecordStatus = "current" | "expired" | "revoked" | "superseded";

export interface ModelProfileInput {
  profile_id: string;
  provider_id: string;
  requested_model_id: string;
  permitted_returned_model_ids: string[];
  supported_operations: ModelOperation[];
  supported_output_schema_ids: ModelOutputSchemaId[];
  maximum_input_tokens: number;
  maximum_output_tokens: number;
  timeout_ms: number;
  maximum_retries: 0;
  structured_output: true;
  data_handling_profile_ref: ModelObjectRef;
  status: ProviderRecordStatus;
}

export interface ModelProfile extends ModelProfileInput {
  schema_version: "contentmd.model-profile/0.1.0";
  profile_digest: string;
}

export interface ProviderDataHandlingProfileInput {
  profile_id: string;
  provider_id: string;
  account_id: string;
  project_id: string;
  application_state: "none";
  abuse_monitoring_retention: string;
  zero_data_retention_status: "not_established" | "enabled" | "not_enabled";
  prompt_caching: string;
  training_opt_in: false;
  processing_region: string;
  policy_url: string;
  sourced_at: string;
  effective_at: string;
  review_at: string;
  status: ProviderRecordStatus;
}

export interface ProviderDataHandlingProfile extends ProviderDataHandlingProfileInput {
  schema_version: "contentmd.provider-data-handling-profile/0.1.0";
  profile_digest: string;
}

export type HeaderTemplateValue =
  | { kind: "literal"; value: string }
  | { kind: "secret_ref"; secret_ref_id: string };

export interface ApplicationHeaderTemplate {
  name: string;
  value: HeaderTemplateValue;
}

export interface RequestHeaderTemplateInput {
  template_id: string;
  provider_id: string;
  adapter_id: string;
  adapter_version: string;
  application_headers: ApplicationHeaderTemplate[];
  derived_transport_headers: string[];
  status: ProviderRecordStatus;
}

export interface RequestHeaderTemplate extends RequestHeaderTemplateInput {
  schema_version: "contentmd.request-header-template/0.1.0";
  template_digest: string;
}

export interface SecretRefInput {
  secret_ref_id: string;
  provider_id: string;
  credential_class: string;
  account_id: string;
  project_id: string;
  origin: string;
  endpoint_class: string;
  authorization_header_name: string;
  connection_id: string;
  resolver_namespace: string;
  status: ProviderRecordStatus;
  revocation_ref: string;
}

export interface SecretRef extends SecretRefInput {
  schema_version: "contentmd.secret-ref/0.1.0";
  secret_ref_digest: string;
}

export interface ProviderConnectionRecordInput {
  connection_id: string;
  provider_id: string;
  account_id: string;
  project_id: string;
  origin: string;
  endpoint_class: string;
  data_handling_profile_ref: ModelObjectRef;
  secret_ref_id: string;
  header_template_ref: ModelObjectRef;
  status: ProviderRecordStatus;
}

export interface ProviderConnectionRecord extends ProviderConnectionRecordInput {
  schema_version: "contentmd.provider-connection/0.1.0";
  connection_digest: string;
}

export interface ProviderCapabilityGrantInput extends CapabilityGrant {
  provider_id: string;
  operations: ModelOperation[];
  output_schema_ids: ModelOutputSchemaId[];
  model_profile_ref: ModelObjectRef;
  connection_ref: ModelObjectRef;
}

export interface ProviderCapabilityGrant extends ProviderCapabilityGrantInput {
  schema_version: "contentmd.provider-capability-grant/0.1.0";
  grant_digest: string;
}

export interface RevocationCheckpoint {
  checkpoint_id: string;
  checkpoint_digest: string;
  observed_at: string;
  status: "current" | "unknown";
}

export interface ProviderReceiptInput {
  receipt_id: string;
  plan_ref: ModelObjectRef;
  attempt_claim_ref: ModelObjectRef;
  request_id: string;
  provider_id: string;
  requested_model_id: string;
  returned_model_id: string | null;
  provider_response_id: string | null;
  provider_created_at: string | null;
  outcome_state:
    | "completed"
    | "refused"
    | "incomplete"
    | "invalid"
    | "transport_failed"
    | "provider_outcome_unknown";
  http_status: number | null;
  response_body_digest: string | null;
  response_body_byte_count: number | null;
  provider_output_digest: string | null;
  model_response_digest: string | null;
  token_accounting: {
    input_tokens: number;
    output_tokens: number;
    total_tokens: number;
    cached_input_tokens: number;
  } | null;
  sent_at: string;
  completed_at: string | null;
  outcome_audit_stream_id: string;
  retention_disposition: "transient_only" | "authorized_durable";
  authority_effect: "none";
}

export interface ProviderReceipt extends ProviderReceiptInput {
  schema_version: "contentmd.provider-receipt/0.1.0";
  receipt_digest: string;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const HEADER_NAME = /^[a-z0-9!#$%&'*+.^_`|~-]+$/u;

function fail(field: string): never {
  throw new TypeError(`invalid_provider_record:${field}`);
}

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) fail(field);
}

function positiveInteger(value: unknown, field: string): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) fail(field);
}

function nonnegativeInteger(value: unknown, field: string): asserts value is number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) fail(field);
}

function optionalDigest(value: string | null, field: string): void {
  if (value !== null && !DIGEST.test(value)) fail(field);
}

function validateRef(value: ModelObjectRef, field: string): void {
  text(value.record_id, `${field}.record_id`);
  text(value.schema_id, `${field}.schema_id`);
  text(value.schema_version, `${field}.schema_version`);
  if (!DIGEST.test(value.content_digest)) fail(`${field}.content_digest`);
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function strings<T extends string>(values: readonly T[], field: string): T[] {
  if (!Array.isArray(values)) fail(field);
  for (const value of values) text(value, field);
  return [...new Set(values)].sort(compareUtf8);
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

function freezeRecord<T extends object, K extends string>(
  value: T,
  digestField: K,
): T & Record<K, string> {
  return deepFreeze({
    ...value,
    [digestField]: sha256Canonical(value),
  }) as T & Record<K, string>;
}

export function createProviderDataHandlingProfile(
  input: ProviderDataHandlingProfileInput,
): ProviderDataHandlingProfile {
  for (const field of [
    "profile_id", "provider_id", "account_id", "project_id", "abuse_monitoring_retention",
    "prompt_caching", "processing_region", "policy_url", "sourced_at", "effective_at", "review_at",
  ] as const) text(input[field], field);
  if (input.application_state !== "none" || input.training_opt_in !== false) fail("data_handling");
  const preimage = {
    schema_version: "contentmd.provider-data-handling-profile/0.1.0" as const,
    ...structuredClone(input),
  };
  return freezeRecord(preimage, "profile_digest") as ProviderDataHandlingProfile;
}

export function createModelProfile(input: ModelProfileInput): ModelProfile {
  for (const field of ["profile_id", "provider_id", "requested_model_id"] as const) {
    text(input[field], field);
  }
  validateRef(input.data_handling_profile_ref, "data_handling_profile_ref");
  positiveInteger(input.maximum_input_tokens, "maximum_input_tokens");
  positiveInteger(input.maximum_output_tokens, "maximum_output_tokens");
  positiveInteger(input.timeout_ms, "timeout_ms");
  if (input.maximum_retries !== 0 || input.structured_output !== true) fail("model_controls");
  const preimage = {
    schema_version: "contentmd.model-profile/0.1.0" as const,
    ...structuredClone(input),
    permitted_returned_model_ids: strings(input.permitted_returned_model_ids, "permitted_returned_model_ids"),
    supported_operations: strings(input.supported_operations, "supported_operations"),
    supported_output_schema_ids: strings(input.supported_output_schema_ids, "supported_output_schema_ids"),
  };
  return freezeRecord(preimage, "profile_digest") as ModelProfile;
}

export function createSecretRef(input: SecretRefInput): SecretRef {
  for (const field of [
    "secret_ref_id", "provider_id", "credential_class", "account_id", "project_id", "origin",
    "endpoint_class", "authorization_header_name", "connection_id", "resolver_namespace", "revocation_ref",
  ] as const) text(input[field], field);
  if (input.authorization_header_name !== input.authorization_header_name.toLowerCase()
    || !HEADER_NAME.test(input.authorization_header_name)) fail("authorization_header_name");
  const origin = new URL(input.origin);
  if (origin.protocol !== "https:" || origin.username !== "" || origin.password !== "" || origin.pathname !== "/") {
    fail("origin");
  }
  const preimage = {
    schema_version: "contentmd.secret-ref/0.1.0" as const,
    ...structuredClone(input),
  };
  return freezeRecord(preimage, "secret_ref_digest") as SecretRef;
}

export function createRequestHeaderTemplate(
  input: RequestHeaderTemplateInput,
): RequestHeaderTemplate {
  for (const field of ["template_id", "provider_id", "adapter_id", "adapter_version"] as const) {
    text(input[field], field);
  }
  const headers = input.application_headers.map((header, index) => {
    if (!HEADER_NAME.test(header.name) || header.name !== header.name.toLowerCase()) {
      fail(`application_headers[${index}].name`);
    }
    if (header.value.kind === "literal") {
      if (!/^[\x20-\x7e]*$/u.test(header.value.value)
        || header.value.value !== header.value.value.trim()) fail(`application_headers[${index}].value`);
    } else {
      text(header.value.secret_ref_id, `application_headers[${index}].secret_ref_id`);
    }
    return structuredClone(header);
  }).sort((left, right) => compareUtf8(left.name, right.name));
  if (new Set(headers.map((header) => header.name)).size !== headers.length) fail("application_headers");
  const preimage = {
    schema_version: "contentmd.request-header-template/0.1.0" as const,
    ...structuredClone(input),
    application_headers: headers,
    derived_transport_headers: strings(input.derived_transport_headers, "derived_transport_headers"),
  };
  return freezeRecord(preimage, "template_digest") as RequestHeaderTemplate;
}

export function createProviderConnectionRecord(
  input: ProviderConnectionRecordInput,
): ProviderConnectionRecord {
  for (const field of [
    "connection_id", "provider_id", "account_id", "project_id", "origin", "endpoint_class", "secret_ref_id",
  ] as const) text(input[field], field);
  validateRef(input.data_handling_profile_ref, "data_handling_profile_ref");
  validateRef(input.header_template_ref, "header_template_ref");
  const preimage = {
    schema_version: "contentmd.provider-connection/0.1.0" as const,
    ...structuredClone(input),
  };
  return freezeRecord(preimage, "connection_digest") as ProviderConnectionRecord;
}

export function createProviderCapabilityGrant(
  input: ProviderCapabilityGrantInput,
): ProviderCapabilityGrant {
  for (const field of [
    "grant_id", "principal_ref", "workload_ref", "action", "adapter_id", "provider_id", "issued_at", "expires_at",
  ] as const) text(input[field], field);
  validateRef(input.model_profile_ref, "model_profile_ref");
  validateRef(input.connection_ref, "connection_ref");
  const preimage = {
    schema_version: "contentmd.provider-capability-grant/0.1.0" as const,
    ...structuredClone(input),
    resource_scope: strings(input.resource_scope, "resource_scope"),
    data_classes: strings(input.data_classes, "data_classes"),
    operations: strings(input.operations, "operations"),
    output_schema_ids: strings(input.output_schema_ids, "output_schema_ids"),
  };
  return freezeRecord(preimage, "grant_digest") as ProviderCapabilityGrant;
}

export function providerRecordDigestValid(
  record: Record<string, unknown>,
  digestField: string,
): boolean {
  const received = record[digestField];
  if (typeof received !== "string" || !DIGEST.test(received)) return false;
  const preimage = { ...record };
  delete preimage[digestField];
  return sha256Canonical(preimage) === received;
}

export function createProviderReceipt(input: ProviderReceiptInput): ProviderReceipt {
  for (const field of [
    "receipt_id",
    "request_id",
    "provider_id",
    "requested_model_id",
    "sent_at",
    "outcome_audit_stream_id",
  ] as const) text(input[field], field);
  validateRef(input.plan_ref, "plan_ref");
  validateRef(input.attempt_claim_ref, "attempt_claim_ref");
  for (const [field, value] of [
    ["returned_model_id", input.returned_model_id],
    ["provider_response_id", input.provider_response_id],
    ["provider_created_at", input.provider_created_at],
    ["completed_at", input.completed_at],
  ] as const) {
    if (value !== null) text(value, field);
  }
  optionalDigest(input.response_body_digest, "response_body_digest");
  optionalDigest(input.provider_output_digest, "provider_output_digest");
  optionalDigest(input.model_response_digest, "model_response_digest");
  if (input.http_status !== null
    && (!Number.isSafeInteger(input.http_status) || input.http_status < 100 || input.http_status > 599)) {
    fail("http_status");
  }
  if (input.response_body_byte_count !== null) {
    nonnegativeInteger(input.response_body_byte_count, "response_body_byte_count");
  }
  if (input.token_accounting !== null) {
    for (const field of ["input_tokens", "output_tokens", "total_tokens", "cached_input_tokens"] as const) {
      nonnegativeInteger(input.token_accounting[field], `token_accounting.${field}`);
    }
    if (input.token_accounting.total_tokens
      !== input.token_accounting.input_tokens + input.token_accounting.output_tokens
      || input.token_accounting.cached_input_tokens > input.token_accounting.input_tokens) {
      fail("token_accounting");
    }
  }
  const sentAt = Date.parse(input.sent_at);
  const completedAt = input.completed_at === null ? null : Date.parse(input.completed_at);
  if (!Number.isFinite(sentAt)
    || (input.completed_at !== null && !Number.isFinite(completedAt))
    || (completedAt !== null && completedAt < sentAt)) fail("receipt_time");
  if (input.authority_effect !== "none") fail("authority_effect");
  if (input.outcome_state === "completed") {
    if (input.returned_model_id === null
      || input.http_status === null
      || input.response_body_digest === null
      || input.response_body_byte_count === null
      || input.provider_output_digest === null
      || input.model_response_digest === null
      || input.token_accounting === null
      || input.completed_at === null) fail("completed_receipt");
  }
  if (input.outcome_state === "provider_outcome_unknown") {
    if (input.returned_model_id !== null
      || input.provider_response_id !== null
      || input.provider_created_at !== null
      || input.http_status !== null
      || input.response_body_digest !== null
      || input.response_body_byte_count !== null
      || input.provider_output_digest !== null
      || input.model_response_digest !== null
      || input.token_accounting !== null
      || input.completed_at !== null) fail("unknown_outcome_receipt");
  }
  const preimage = {
    schema_version: "contentmd.provider-receipt/0.1.0" as const,
    ...structuredClone(input),
  };
  return freezeRecord(preimage, "receipt_digest") as ProviderReceipt;
}

export type { EgressMode, ResourceLimits };
