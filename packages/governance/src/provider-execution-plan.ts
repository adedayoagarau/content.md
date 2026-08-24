import { createHash } from "node:crypto";
import { sha256Canonical } from "@contentmd/core";
import {
  governedModelRequestDigest,
  type ModelObjectRef,
  type PreparedProviderRequest,
  type PromptTemplateRef,
} from "@contentmd/model-provider-sdk";
import type { GovernanceAuditEvent } from "./policy.js";
import type { ExecutionPlanSigner } from "./plan-authentication.js";
import {
  authorizeProviderExecution,
  type ProviderAuthorizationDecision,
  type ProviderAuthorizationInput,
} from "./provider-preflight.js";

export interface ProviderExecutionPlan {
  schema_version: "contentmd.provider-execution-plan/0.1.0";
  plan_id: string;
  plan_digest: string;
  issued_at: string;
  expires_at: string;
  nonce: string;
  maximum_attempts: 1;
  principal_ref: string;
  workload_ref: string;
  project_id: string;
  task_id: string;
  operation_id: string;
  request_id: string;
  request_digest: string;
  input_digest: string;
  prompt_template: PromptTemplateRef;
  context_packet_ref: ModelObjectRef;
  retrieval_snapshot_ref: ModelObjectRef | null;
  egress_item_digests: string[];
  provider_id: string;
  model_id: string;
  model_profile_ref: ModelObjectRef;
  output_schema_id: string;
  output_schema_version: string;
  output_schema_digest: string;
  adapter_id: string;
  adapter_version: string;
  method: "POST";
  destination_origin: string;
  destination_path: string;
  redirect_policy: "deny";
  body_digest: string;
  body_byte_count: number;
  header_template_ref: ModelObjectRef;
  secret_ref: ModelObjectRef;
  connection_ref: ModelObjectRef;
  data_handling_profile_ref: ModelObjectRef;
  provider_capability_grant_ref: ModelObjectRef;
  policy_refs: string[];
  policy_set_digest: string;
  authorization_envelope_digest: string;
  control_dispositions: Array<{
    control_type: string;
    record_ref: string | null;
    status: string;
    disposition_digest: string;
  }>;
  verification_plan_ref: string;
  resource_limits: {
    calls: 1;
    attempts: 1;
    retries: 0;
    request_bytes: number;
    response_bytes: number;
    duration_ms: number;
    input_tokens: number;
    output_tokens: number;
  };
  attempt_ledger_stream_id: string;
  outcome_audit_stream_id: string;
  revocation_checkpoint: {
    checkpoint_id: string;
    checkpoint_digest: string;
    observed_at: string;
  };
  authorization_audit: Pick<GovernanceAuditEvent, "event_id" | "details_digest">;
  authority_effect: "none";
}

export interface AuthenticatedProviderExecutionPlan {
  schema_version: "contentmd.authenticated-provider-execution-plan/0.1.0";
  plan: ProviderExecutionPlan;
  authentication: {
    algorithm: "hmac-sha256";
    key_id: string;
    tag: string;
  };
  authority_effect: "none";
}

export interface ProviderExecutionPlanInput {
  now: string;
  expires_at: string;
  nonce: string;
  method: "POST";
  authorization: ProviderAuthorizationInput;
  prepared_request: PreparedProviderRequest;
}

export interface ProviderExecutionPlanVerificationInput {
  now: string;
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  method: "POST";
  authorization: ProviderAuthorizationInput;
  prepared_request: PreparedProviderRequest;
}

export interface ProviderExecutionPlanVerification {
  disposition: "allow" | "deny";
  reason_codes: string[];
  plan_ref: ModelObjectRef;
  authorization_decision: ProviderAuthorizationDecision;
  authority_effect: "none";
}

export class ProviderExecutionPlanError extends Error {
  readonly reason_codes: readonly string[];

  constructor(reasonCodes: readonly string[]) {
    super(`provider_execution_plan_invalid:${reasonCodes.join(",")}`);
    this.name = "ProviderExecutionPlanError";
    this.reason_codes = Object.freeze([...reasonCodes]);
  }
}

const DIGEST = /^[a-f0-9]{64}$/u;

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function objectRef(recordId: string, schemaId: string, digest: string): ModelObjectRef {
  return {
    record_id: recordId,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function bodyDigest(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function planRef(plan: ProviderExecutionPlan): ModelObjectRef {
  return objectRef(plan.plan_id, plan.schema_version, plan.plan_digest);
}

function authorizationEnvelopeDigest(input: ProviderAuthorizationInput): string {
  const { now: _outerNow, authorization, ...providerFields } = input;
  const { now: _authorizationNow, ...authorizationFields } = authorization;
  return sha256Canonical({
    ...providerFields,
    authorization: authorizationFields,
  });
}

function safeAuthorization(input: ProviderAuthorizationInput): ProviderAuthorizationDecision {
  try {
    return authorizeProviderExecution(input);
  } catch {
    return {
      disposition: "deny",
      reason_codes: ["provider_execution_authorization_invalid"],
      audit_event: {
        event_id: "audit.provider-execution.invalid",
        operation_id: input.authorization.request.operation_id,
        action: "model.generate",
        disposition: "denied",
        actor_ref: "actor.unknown",
        policy_refs: [],
        target_refs: [],
        occurred_at: input.now,
        details_digest: "0".repeat(64),
      },
      revocation_checkpoint: structuredClone(input.revocation_checkpoint),
      authority_effect: "none",
    };
  }
}

function validationReasons(input: ProviderExecutionPlanInput): {
  authorization: ProviderAuthorizationDecision;
  reasons: string[];
  observedBodyDigest: string;
} {
  const currentAuthorization: ProviderAuthorizationInput = {
    ...input.authorization,
    now: input.now,
    authorization: {
      ...input.authorization.authorization,
      now: input.now,
    },
  };
  const authorization = safeAuthorization(currentAuthorization);
  const reasons: string[] = [];
  const issued = Date.parse(input.now);
  const expires = Date.parse(input.expires_at);
  if (!Number.isFinite(issued) || !Number.isFinite(expires) || expires <= issued) {
    reasons.push("provider_execution_plan_time_invalid");
  }
  if (typeof input.nonce !== "string" || input.nonce.length === 0) {
    reasons.push("provider_execution_plan_nonce_invalid");
  }
  if (input.method !== "POST") reasons.push("provider_execution_plan_method_invalid");
  if (input.authorization.authorization.verification_plan_ref === null) {
    reasons.push("provider_execution_plan_verification_plan_missing");
  }
  if (authorization.disposition !== "allow") reasons.push("provider_execution_plan_authorization_denied");
  if (input.prepared_request.request !== input.authorization.request
    && governedModelRequestDigest(input.prepared_request.request)
      !== governedModelRequestDigest(input.authorization.request)) {
    reasons.push("provider_execution_plan_request_mismatch");
  }
  const observedBodyDigest = bodyDigest(input.prepared_request.body_bytes);
  if (observedBodyDigest !== input.prepared_request.body_digest) {
    reasons.push("provider_execution_plan_body_digest_invalid");
  }
  if (input.prepared_request.body_bytes.byteLength
    > input.authorization.authorization.request.requested_limits.bytes) {
    reasons.push("provider_execution_plan_body_limit_exceeded");
  }
  if (input.prepared_request.destination_origin !== input.authorization.connection?.origin) {
    reasons.push("provider_execution_plan_destination_invalid");
  }
  if (!input.prepared_request.destination_path.startsWith("/")
    || input.prepared_request.destination_path.includes("?")
    || input.prepared_request.destination_path.includes("#")) {
    reasons.push("provider_execution_plan_destination_invalid");
  }
  return { authorization, reasons, observedBodyDigest };
}

export async function issueProviderExecutionPlan(
  input: ProviderExecutionPlanInput,
  signer: ExecutionPlanSigner,
): Promise<AuthenticatedProviderExecutionPlan> {
  const checked = validationReasons(input);
  if (checked.reasons.length > 0) throw new ProviderExecutionPlanError(checked.reasons);
  const request = input.prepared_request.request;
  const modelProfile = input.authorization.model_profile!;
  const dataProfile = input.authorization.data_handling_profile!;
  const connection = input.authorization.connection!;
  const secret = input.authorization.secret_ref!;
  const header = input.authorization.header_template!;
  const grant = input.authorization.provider_grant!;
  const nonceDigest = sha256Canonical({
    contract: "contentmd.provider-execution-nonce/0.1.0",
    nonce: input.nonce,
  });
  const outcomeStreamDigest = sha256Canonical({
    contract: "contentmd.provider-outcome-audit-stream/0.1.0",
    nonce_digest: nonceDigest,
    operation_id: input.authorization.authorization.request.operation_id,
    request_id: request.request_id,
  });
  const controlDispositions = input.authorization.authorization.control_dispositions
    .map((control) => ({
      control_type: control.control_type,
      record_ref: control.record_ref,
      status: control.status,
      disposition_digest: sha256Canonical(control),
    }))
    .sort((left, right) => Buffer.compare(
      Buffer.from(left.control_type, "utf8"),
      Buffer.from(right.control_type, "utf8"),
    ));
  const base = {
    schema_version: "contentmd.provider-execution-plan/0.1.0" as const,
    issued_at: input.now,
    expires_at: input.expires_at,
    nonce: input.nonce,
    maximum_attempts: 1 as const,
    principal_ref: grant.principal_ref,
    workload_ref: grant.workload_ref,
    project_id: request.scope.project_id,
    task_id: request.scope.task_id,
    operation_id: input.authorization.authorization.request.operation_id,
    request_id: request.request_id,
    request_digest: governedModelRequestDigest(request),
    input_digest: request.input_digest,
    prompt_template: structuredClone(request.prompt_template),
    context_packet_ref: structuredClone(request.context_packet_ref),
    retrieval_snapshot_ref: structuredClone(request.retrieval_snapshot_ref),
    egress_item_digests: [...request.egress_item_digests],
    provider_id: request.requested_provider_id,
    model_id: request.requested_model_id,
    model_profile_ref: objectRef(modelProfile.profile_id, modelProfile.schema_version, modelProfile.profile_digest),
    output_schema_id: request.output_schema_id,
    output_schema_version: request.output_schema_version,
    output_schema_digest: request.output_schema_digest,
    adapter_id: input.authorization.adapter_id,
    adapter_version: input.authorization.adapter_version,
    method: input.method,
    destination_origin: input.prepared_request.destination_origin,
    destination_path: input.prepared_request.destination_path,
    redirect_policy: "deny" as const,
    body_digest: checked.observedBodyDigest,
    body_byte_count: input.prepared_request.body_bytes.byteLength,
    header_template_ref: objectRef(header.template_id, header.schema_version, header.template_digest),
    secret_ref: objectRef(secret.secret_ref_id, secret.schema_version, secret.secret_ref_digest),
    connection_ref: objectRef(connection.connection_id, connection.schema_version, connection.connection_digest),
    data_handling_profile_ref: objectRef(dataProfile.profile_id, dataProfile.schema_version, dataProfile.profile_digest),
    provider_capability_grant_ref: objectRef(grant.grant_id, grant.schema_version, grant.grant_digest),
    policy_refs: [...checked.authorization.audit_event.policy_refs],
    policy_set_digest: sha256Canonical(input.authorization.authorization.policies),
    authorization_envelope_digest: authorizationEnvelopeDigest(input.authorization),
    control_dispositions: controlDispositions,
    verification_plan_ref: input.authorization.authorization.verification_plan_ref!,
    resource_limits: {
      calls: 1 as const,
      attempts: 1 as const,
      retries: 0 as const,
      request_bytes: request.resource_limits.maximum_input_bytes,
      response_bytes: request.resource_limits.maximum_output_bytes,
      duration_ms: request.resource_limits.timeout_ms,
      input_tokens: request.resource_limits.maximum_input_tokens,
      output_tokens: request.resource_limits.maximum_output_tokens,
    },
    attempt_ledger_stream_id: `provider-attempt.${nonceDigest}`,
    outcome_audit_stream_id: `provider-outcome.${outcomeStreamDigest}`,
    revocation_checkpoint: {
      checkpoint_id: input.authorization.revocation_checkpoint.checkpoint_id,
      checkpoint_digest: input.authorization.revocation_checkpoint.checkpoint_digest,
      observed_at: input.authorization.revocation_checkpoint.observed_at,
    },
    authorization_audit: {
      event_id: checked.authorization.audit_event.event_id,
      details_digest: checked.authorization.audit_event.details_digest,
    },
    authority_effect: "none" as const,
  };
  const identityDigest = sha256Canonical({
    contract: "contentmd.provider-execution-plan-identity/0.1.0",
    ...base,
  });
  const withId = {
    ...base,
    plan_id: `provider-execution-plan.${identityDigest.slice(0, 32)}`,
  };
  const plan: ProviderExecutionPlan = {
    ...withId,
    plan_digest: sha256Canonical(withId),
  };
  const tag = await signer.sign(plan.plan_digest);
  return deepFreeze({
    schema_version: "contentmd.authenticated-provider-execution-plan/0.1.0",
    plan,
    authentication: {
      algorithm: signer.algorithm,
      key_id: signer.key_id,
      tag,
    },
    authority_effect: "none",
  });
}

export async function verifyAuthenticatedProviderExecutionPlan(
  input: ProviderExecutionPlanVerificationInput,
  signer: ExecutionPlanSigner,
): Promise<ProviderExecutionPlanVerification> {
  const plan = input.authenticated_plan.plan;
  const reasons: string[] = [];
  const { plan_digest: receivedDigest, plan_id: receivedId, ...planWithoutIdentity } = plan;
  const expectedIdentityDigest = sha256Canonical({
    contract: "contentmd.provider-execution-plan-identity/0.1.0",
    ...planWithoutIdentity,
  });
  const expectedId = `provider-execution-plan.${expectedIdentityDigest.slice(0, 32)}`;
  const expectedDigest = sha256Canonical({ ...planWithoutIdentity, plan_id: receivedId });
  if (!DIGEST.test(receivedDigest) || receivedId !== expectedId || receivedDigest !== expectedDigest) {
    reasons.push("provider_execution_plan_digest_invalid");
  }
  if (input.authenticated_plan.authentication.algorithm !== signer.algorithm
    || input.authenticated_plan.authentication.key_id !== signer.key_id
    || !(await signer.verify(receivedDigest, input.authenticated_plan.authentication.tag))) {
    reasons.push("provider_execution_plan_authentication_invalid");
  }
  const now = Date.parse(input.now);
  const issued = Date.parse(plan.issued_at);
  const expires = Date.parse(plan.expires_at);
  if (!Number.isFinite(now) || !Number.isFinite(issued) || !Number.isFinite(expires)
    || now < issued || now > expires) reasons.push("provider_execution_plan_expired");

  const checked = validationReasons({
    now: input.now,
    expires_at: plan.expires_at,
    nonce: plan.nonce,
    method: input.method,
    authorization: input.authorization,
    prepared_request: input.prepared_request,
  });
  if (checked.authorization.disposition !== "allow") reasons.push("provider_execution_plan_authorization_denied");
  if (input.authorization.revocation_checkpoint.status !== "current") {
    reasons.push("provider_execution_plan_revocation_not_current");
  }
  if (input.method !== plan.method) reasons.push("provider_execution_plan_method_mismatch");
  if (input.prepared_request.destination_origin !== plan.destination_origin
    || input.prepared_request.destination_path !== plan.destination_path) {
    reasons.push("provider_execution_plan_destination_mismatch");
  }
  if (checked.observedBodyDigest !== plan.body_digest
    || input.prepared_request.body_bytes.byteLength !== plan.body_byte_count) {
    reasons.push("provider_execution_plan_body_mismatch");
  }
  const request = input.prepared_request.request;
  if (request.request_id !== plan.request_id
    || governedModelRequestDigest(request) !== plan.request_digest) {
    reasons.push("provider_execution_plan_request_mismatch");
  }
  if (request.requested_model_id !== plan.model_id
    || request.requested_provider_id !== plan.provider_id) {
    reasons.push("provider_execution_plan_model_mismatch");
  }
  if (request.output_schema_id !== plan.output_schema_id
    || request.output_schema_version !== plan.output_schema_version
    || request.output_schema_digest !== plan.output_schema_digest) {
    reasons.push("provider_execution_plan_schema_mismatch");
  }
  if (input.authorization.header_template?.template_id !== plan.header_template_ref.record_id
    || input.authorization.header_template?.template_digest !== plan.header_template_ref.content_digest) {
    reasons.push("provider_execution_plan_header_mismatch");
  }
  if (input.authorization.revocation_checkpoint.checkpoint_id !== plan.revocation_checkpoint.checkpoint_id
    || input.authorization.revocation_checkpoint.checkpoint_digest !== plan.revocation_checkpoint.checkpoint_digest
    || input.authorization.revocation_checkpoint.observed_at !== plan.revocation_checkpoint.observed_at) {
    reasons.push("provider_execution_plan_revocation_mismatch");
  }
  const currentPolicySetDigest = sha256Canonical(input.authorization.authorization.policies);
  const currentAuthorizationEnvelopeDigest = authorizationEnvelopeDigest(input.authorization);
  if (plan.policy_set_digest !== currentPolicySetDigest
    || plan.authorization_envelope_digest !== currentAuthorizationEnvelopeDigest
    || plan.verification_plan_ref !== input.authorization.authorization.verification_plan_ref
    || plan.principal_ref !== input.authorization.provider_grant?.principal_ref
    || plan.workload_ref !== input.authorization.provider_grant?.workload_ref
    || plan.project_id !== request.scope.project_id
    || plan.task_id !== request.scope.task_id) {
    reasons.push("provider_execution_plan_governance_mismatch");
  }
  const unique = [...new Set(reasons)].sort();
  const disposition = unique.length === 0 ? "allow" : "deny";
  return deepFreeze({
    disposition,
    reason_codes: disposition === "allow" ? ["provider_execution_plan_verified"] : unique,
    plan_ref: planRef(plan),
    authorization_decision: checked.authorization,
    authority_effect: "none",
  });
}

export function providerExecutionPlanRef(plan: ProviderExecutionPlan): ModelObjectRef {
  return deepFreeze(planRef(plan));
}
