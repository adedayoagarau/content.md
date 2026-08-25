import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  createProviderReceipt,
  issueProviderExecutionPlan,
  providerExecutionPlanRef,
  type AuthenticatedProviderExecutionPlan,
  type ExecutionPlanSigner,
  type AuthorizationInput,
  type ProviderAuthorizationInput,
  type ProviderExecutionAttemptClaim,
  type ProviderReceipt,
} from "@contentmd/governance";
import type { AppendOnlyEventStore } from "@contentmd/memory";
import type {
  GovernedModelRequest,
  ModelExecutionResult,
  ModelProviderDescriptor,
  PreparedProviderRequest,
} from "@contentmd/model-provider-sdk";

export interface ProviderConfigurationLookup {
  project_root: string;
  model_profile_ref: string;
  connection_ref: string;
  grant_ref: string;
  control_refs: readonly string[];
}

export interface ProviderConfigurationResolver {
  resolve(input: ProviderConfigurationLookup): Promise<ResolvedProviderConfiguration>;
}

export type ResolvedProviderConfiguration = Omit<
  ProviderAuthorizationInput,
  "now" | "request" | "authorization"
> & {
  authorization: Omit<AuthorizationInput, "now">;
};

export interface ProviderAuditRef {
  event_id: string;
  event_digest: string;
}

export interface ProviderPreAttemptAuditInput {
  actor_ref: string;
  occurred_at: string;
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  authorization: ProviderAuthorizationInput;
}

export interface ProviderOutcomeAuditInput extends ProviderPreAttemptAuditInput {
  provider_receipt: ProviderReceipt;
  response: ModelExecutionResult["response"] | null;
}

export interface ProviderAuditPort {
  appendPreAttempt(input: ProviderPreAttemptAuditInput): Promise<ProviderAuditRef>;
  appendOutcome(input: ProviderOutcomeAuditInput): Promise<ProviderAuditRef>;
}

export interface GovernedAdapterExecutionInput {
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  signer: ExecutionPlanSigner;
  authorization: ProviderAuthorizationInput;
  prepared: PreparedProviderRequest;
  store: AppendOnlyEventStore;
  actor_ref: string;
  audit_available: boolean;
  clock: { now(): string };
}

export interface GovernedAdapterExecutionResult {
  execution: ModelExecutionResult;
  provider_receipt: ProviderReceipt;
  attempt_claim: ProviderExecutionAttemptClaim;
  authority_effect: "none";
}

/**
 * Provider-neutral adapter seam used by the orchestrator. Provider-specific
 * composition may capture its secret resolver and transport, but neither type
 * nor value crosses into the agent package.
 */
export interface GovernedLiveModelAdapter {
  readonly descriptor: ModelProviderDescriptor;
  prepare(request: GovernedModelRequest): Promise<PreparedProviderRequest>;
  executeAuthorized(input: GovernedAdapterExecutionInput): Promise<GovernedAdapterExecutionResult>;
}

export interface GovernedLiveModelExecutorInput extends ProviderConfigurationLookup {
  actor_ref: string;
  expires_at: string;
  nonce: string;
  clock: { now(): string };
  signer: ExecutionPlanSigner;
  store: AppendOnlyEventStore;
  configuration: ProviderConfigurationResolver;
  audit: ProviderAuditPort;
  adapter: GovernedLiveModelAdapter;
  compile_request(): Promise<GovernedModelRequest>;
}

export type GovernedLiveModelDisposition = "released" | "quarantined";

export interface GovernedLiveModelExecutorResult {
  disposition: GovernedLiveModelDisposition;
  reason_code: null
    | "provider_output_quarantined"
    | "provider_outcome_unknown"
    | "model_output_invalid";
  execution: ModelExecutionResult | null;
  provider_receipt: ProviderReceipt | null;
  plan_ref: ReturnType<typeof providerExecutionPlanRef>;
  pre_attempt_audit_ref: ProviderAuditRef;
  outcome_audit_ref: ProviderAuditRef | null;
  authority_effect: "none";
}

export type GovernedLiveModelExecutorErrorCode =
  | "provider_configuration_invalid"
  | "provider_execution_plan_invalid"
  | "provider_pre_attempt_audit_unavailable"
  | "provider_execution_result_invalid";

export class GovernedLiveModelExecutorError extends Error {
  readonly code: GovernedLiveModelExecutorErrorCode;
  readonly reason_codes: readonly string[];

  constructor(code: GovernedLiveModelExecutorErrorCode, reasonCodes: readonly string[]) {
    super(`${code}:${reasonCodes.join(",")}`);
    this.name = "GovernedLiveModelExecutorError";
    this.code = code;
    this.reason_codes = Object.freeze([...reasonCodes]);
  }
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

function text(value: unknown, field: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) {
    throw new GovernedLiveModelExecutorError("provider_configuration_invalid", [field]);
  }
}

function validateLookup(input: GovernedLiveModelExecutorInput): void {
  for (const field of [
    "project_root", "model_profile_ref", "connection_ref", "grant_ref", "actor_ref", "expires_at", "nonce",
  ] as const) text(input[field], field);
  if (!Array.isArray(input.control_refs) || input.control_refs.length === 0
    || input.control_refs.some((ref) => typeof ref !== "string" || ref.length === 0)
    || new Set(input.control_refs).size !== input.control_refs.length) {
    throw new GovernedLiveModelExecutorError("provider_configuration_invalid", ["control_refs"]);
  }
}

function validateConfiguration(
  request: GovernedModelRequest,
  authorization: ProviderAuthorizationInput,
  adapter: GovernedLiveModelAdapter,
  expiresAt: string,
): void {
  const reasons: string[] = [];
  if (authorization.request.request_id !== request.request_id
    || canonicalJson(authorization.request) !== canonicalJson(request)) {
    reasons.push("provider_configuration_request_mismatch");
  }
  if (authorization.adapter_id !== adapter.descriptor.adapter_id
    || authorization.adapter_version !== adapter.descriptor.adapter_version
    || request.requested_provider_id !== adapter.descriptor.provider_id) {
    reasons.push("provider_configuration_adapter_mismatch");
  }
  if (!adapter.descriptor.supported_request_versions.includes(request.schema_version)
    || adapter.descriptor.remote_authorization_required !== true
    || adapter.descriptor.strict_schema_output !== true) {
    reasons.push("provider_configuration_adapter_capability_mismatch");
  }
  const planExpiry = Date.parse(expiresAt);
  const grantExpiry = Date.parse(authorization.provider_grant?.expires_at ?? "");
  if (!Number.isFinite(planExpiry) || !Number.isFinite(grantExpiry) || planExpiry > grantExpiry) {
    reasons.push("provider_configuration_plan_expiry_invalid");
  }
  if (reasons.length > 0) {
    throw new GovernedLiveModelExecutorError("provider_configuration_invalid", reasons.sort());
  }
}

function validateExecutionResult(
  result: GovernedAdapterExecutionResult,
  request: GovernedModelRequest,
  authenticatedPlan: AuthenticatedProviderExecutionPlan,
  adapter: GovernedLiveModelAdapter,
): void {
  const response = result.execution.response;
  const receipt = result.provider_receipt;
  const planRef = providerExecutionPlanRef(authenticatedPlan.plan);
  const reasons: string[] = [];
  if (result.authority_effect !== "none" || response.authority_effect !== "none") {
    reasons.push("provider_execution_authority_effect_invalid");
  }
  if (response.request_id !== request.request_id
    || response.provider_id !== adapter.descriptor.provider_id
    || response.adapter_id !== adapter.descriptor.adapter_id
    || response.adapter_version !== adapter.descriptor.adapter_version
    || response.requested_model_id !== request.requested_model_id
    || response.input_digest !== request.input_digest) {
    reasons.push("provider_execution_response_binding_invalid");
  }
  if (receipt.request_id !== request.request_id
    || receipt.provider_id !== adapter.descriptor.provider_id
    || canonicalJson(receipt.plan_ref) !== canonicalJson(planRef)
    || receipt.outcome_audit_stream_id !== authenticatedPlan.plan.outcome_audit_stream_id) {
    reasons.push("provider_execution_receipt_binding_invalid");
  }
  if (canonicalJson(result.attempt_claim.plan_ref) !== canonicalJson(planRef)
    || result.attempt_claim.stream_id !== authenticatedPlan.plan.attempt_ledger_stream_id
    || result.attempt_claim.disposition !== "claimed") {
    reasons.push("provider_execution_attempt_binding_invalid");
  }
  if (response.response_state === "completed") {
    if (result.execution.canonical_output === null
      || receipt.outcome_state !== "completed"
      || response.model_id !== receipt.returned_model_id
      || response.canonical_output_digest === null
      || response.canonical_output_digest !== sha256Canonical(result.execution.canonical_output)
      || response.output_digest !== response.canonical_output_digest
      || response.provider_output_digest !== receipt.provider_output_digest
      || receipt.model_response_digest !== sha256Canonical(response)) {
      reasons.push("provider_execution_completed_output_invalid");
    }
  } else if (result.execution.canonical_output !== null) {
    reasons.push("provider_execution_noncompleted_output_present");
  }
  if (reasons.length > 0) {
    throw new GovernedLiveModelExecutorError("provider_execution_result_invalid", reasons.sort());
  }
}

function attemptClaimRef(attempt: ProviderExecutionAttemptClaim) {
  return {
    record_id: attempt.event_id,
    schema_id: attempt.schema_version,
    schema_version: "0.1.0",
    content_digest: attempt.event_digest,
  };
}

function unknownOutcomeAttempt(
  error: unknown,
  authenticatedPlan: AuthenticatedProviderExecutionPlan,
): ProviderExecutionAttemptClaim | null {
  if (error === null || typeof error !== "object"
    || !("code" in error) || error.code !== "provider_outcome_unknown"
    || !("attempt_claim" in error) || error.attempt_claim === null
    || typeof error.attempt_claim !== "object") return null;
  const attempt = error.attempt_claim as ProviderExecutionAttemptClaim;
  const planRef = providerExecutionPlanRef(authenticatedPlan.plan);
  if (attempt.disposition !== "claimed"
    || attempt.stream_id !== authenticatedPlan.plan.attempt_ledger_stream_id
    || canonicalJson(attempt.plan_ref) !== canonicalJson(planRef)) return null;
  return attempt;
}

function createUnknownOutcomeReceipt(
  request: GovernedModelRequest,
  authenticatedPlan: AuthenticatedProviderExecutionPlan,
  attempt: ProviderExecutionAttemptClaim,
): ProviderReceipt {
  const planRef = providerExecutionPlanRef(authenticatedPlan.plan);
  const receiptIdentity = sha256Canonical({
    contract: "contentmd.provider-unknown-outcome-receipt-identity/0.1.0",
    plan_ref: planRef,
    attempt_claim_ref: attemptClaimRef(attempt),
    request_id: request.request_id,
  });
  return createProviderReceipt({
    receipt_id: `provider-receipt.unknown.${receiptIdentity.slice(0, 32)}`,
    plan_ref: planRef,
    attempt_claim_ref: attemptClaimRef(attempt),
    request_id: request.request_id,
    provider_id: authenticatedPlan.plan.provider_id,
    requested_model_id: authenticatedPlan.plan.model_id,
    returned_model_id: null,
    provider_response_id: null,
    provider_created_at: null,
    outcome_state: "provider_outcome_unknown",
    http_status: null,
    response_body_digest: null,
    response_body_byte_count: null,
    provider_output_digest: null,
    model_response_digest: null,
    token_accounting: null,
    sent_at: attempt.claimed_at,
    completed_at: null,
    outcome_audit_stream_id: authenticatedPlan.plan.outcome_audit_stream_id,
    retention_disposition: "transient_only",
    authority_effect: "none",
  });
}

export async function executeGovernedLiveModel(
  input: GovernedLiveModelExecutorInput,
): Promise<GovernedLiveModelExecutorResult> {
  validateLookup(input);
  const lookup: ProviderConfigurationLookup = {
    project_root: input.project_root,
    model_profile_ref: input.model_profile_ref,
    connection_ref: input.connection_ref,
    grant_ref: input.grant_ref,
    control_refs: Object.freeze([...input.control_refs]),
  };
  const resolvedConfiguration = await input.configuration.resolve(lookup);
  const request = await input.compile_request();
  const authorizationNow = input.clock.now();
  const authorization: ProviderAuthorizationInput = {
    ...resolvedConfiguration,
    now: authorizationNow,
    request,
    authorization: {
      ...resolvedConfiguration.authorization,
      now: authorizationNow,
    },
  };
  validateConfiguration(request, authorization, input.adapter, input.expires_at);
  const prepared = await input.adapter.prepare(request);

  let authenticatedPlan: AuthenticatedProviderExecutionPlan;
  try {
    authenticatedPlan = await issueProviderExecutionPlan({
      now: input.clock.now(),
      expires_at: input.expires_at,
      nonce: input.nonce,
      method: "POST",
      authorization,
      prepared_request: prepared,
    }, input.signer);
  } catch (error) {
    const reasons = error !== null && typeof error === "object" && "reason_codes" in error
      && Array.isArray(error.reason_codes)
      ? error.reason_codes.filter((reason): reason is string => typeof reason === "string")
      : ["provider_execution_plan_issue_failed"];
    throw new GovernedLiveModelExecutorError("provider_execution_plan_invalid", reasons);
  }

  let preAttemptAuditRef: ProviderAuditRef;
  try {
    preAttemptAuditRef = await input.audit.appendPreAttempt({
      actor_ref: input.actor_ref,
      occurred_at: input.clock.now(),
      authenticated_plan: authenticatedPlan,
      authorization,
    });
  } catch {
    throw new GovernedLiveModelExecutorError(
      "provider_pre_attempt_audit_unavailable",
      ["provider_audit_append_failed"],
    );
  }

  let adapterResult: GovernedAdapterExecutionResult;
  try {
    adapterResult = await input.adapter.executeAuthorized({
      authenticated_plan: authenticatedPlan,
      signer: input.signer,
      authorization,
      prepared,
      store: input.store,
      actor_ref: input.actor_ref,
      audit_available: true,
      clock: input.clock,
    });
  } catch (error) {
    const attempt = unknownOutcomeAttempt(error, authenticatedPlan);
    if (attempt === null) throw error;
    const providerReceipt = createUnknownOutcomeReceipt(request, authenticatedPlan, attempt);
    let outcomeAuditRef: ProviderAuditRef | null = null;
    try {
      outcomeAuditRef = await input.audit.appendOutcome({
        actor_ref: input.actor_ref,
        occurred_at: input.clock.now(),
        authenticated_plan: authenticatedPlan,
        authorization,
        provider_receipt: providerReceipt,
        response: null,
      });
    } catch {
      return deepFreeze({
        disposition: "quarantined",
        reason_code: "provider_output_quarantined",
        execution: null,
        provider_receipt: providerReceipt,
        plan_ref: providerExecutionPlanRef(authenticatedPlan.plan),
        pre_attempt_audit_ref: preAttemptAuditRef,
        outcome_audit_ref: null,
        authority_effect: "none",
      });
    }
    return deepFreeze({
      disposition: "quarantined",
      reason_code: "provider_outcome_unknown",
      execution: null,
      provider_receipt: providerReceipt,
      plan_ref: providerExecutionPlanRef(authenticatedPlan.plan),
      pre_attempt_audit_ref: preAttemptAuditRef,
      outcome_audit_ref: outcomeAuditRef,
      authority_effect: "none",
    });
  }
  validateExecutionResult(adapterResult, request, authenticatedPlan, input.adapter);

  let outcomeAuditRef: ProviderAuditRef;
  try {
    outcomeAuditRef = await input.audit.appendOutcome({
      actor_ref: input.actor_ref,
      occurred_at: input.clock.now(),
      authenticated_plan: authenticatedPlan,
      authorization,
      provider_receipt: adapterResult.provider_receipt,
      response: adapterResult.execution.response,
    });
  } catch {
    return deepFreeze({
      disposition: "quarantined",
      reason_code: "provider_output_quarantined",
      execution: null,
      provider_receipt: adapterResult.provider_receipt,
      plan_ref: providerExecutionPlanRef(authenticatedPlan.plan),
      pre_attempt_audit_ref: preAttemptAuditRef,
      outcome_audit_ref: null,
      authority_effect: "none",
    });
  }

  const completed = adapterResult.execution.response.response_state === "completed"
    && adapterResult.execution.canonical_output !== null;
  return deepFreeze({
    disposition: completed ? "released" : "quarantined",
    reason_code: completed ? null : "model_output_invalid",
    execution: completed ? adapterResult.execution : null,
    provider_receipt: adapterResult.provider_receipt,
    plan_ref: providerExecutionPlanRef(authenticatedPlan.plan),
    pre_attempt_audit_ref: preAttemptAuditRef,
    outcome_audit_ref: outcomeAuditRef,
    authority_effect: "none",
  });
}
