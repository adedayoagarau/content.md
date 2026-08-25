import type { GovernedModelRequest } from "@contentmd/model-provider-sdk";
import { createGovernanceAuditEvent } from "./audit.js";
import { authorizeOperation } from "./authorize.js";
import type { AuthorizationInput, GovernanceAuditEvent } from "./policy.js";
import {
  providerRecordDigestValid,
  type ModelProfile,
  type ProviderCapabilityGrant,
  type ProviderConnectionRecord,
  type ProviderDataHandlingProfile,
  type RequestHeaderTemplate,
  type RevocationCheckpoint,
  type SecretRef,
} from "./provider-records.js";

export interface ProviderAuthorizationInput {
  now: string;
  authorization: AuthorizationInput;
  request: GovernedModelRequest;
  adapter_id: string;
  adapter_version: string;
  model_profile: ModelProfile | null;
  data_handling_profile: ProviderDataHandlingProfile | null;
  connection: ProviderConnectionRecord | null;
  secret_ref: SecretRef | null;
  header_template: RequestHeaderTemplate | null;
  provider_grant: ProviderCapabilityGrant | null;
  revocation_checkpoint: RevocationCheckpoint;
  audit_available: boolean;
}

export interface ProviderAuthorizationDecision {
  disposition: "allow" | "deny";
  reason_codes: string[];
  audit_event: GovernanceAuditEvent;
  revocation_checkpoint: RevocationCheckpoint;
  authority_effect: "none";
}

function includesAll(values: readonly string[], required: readonly string[]): boolean {
  return required.every((item) => values.includes(item));
}

function sameRef(
  ref: { record_id: string; content_digest: string },
  recordId: string,
  digest: string,
): boolean {
  return ref.record_id === recordId && ref.content_digest === digest;
}

function current(record: { status: string } | null, missing: string, notCurrent: string): string[] {
  if (record === null) return [missing];
  return record.status === "current" ? [] : [notCurrent];
}

export function authorizeProviderExecution(
  input: ProviderAuthorizationInput,
): ProviderAuthorizationDecision {
  const outer = authorizeOperation(input.authorization);
  const reasons: string[] = outer.disposition === "allow" ? [] : outer.reason_codes.map((reason) => `outer:${reason}`);

  reasons.push(...current(input.model_profile, "model_profile_missing", "model_profile_not_current"));
  reasons.push(...current(input.data_handling_profile, "provider_data_profile_missing", "provider_data_profile_not_current"));
  reasons.push(...current(input.connection, "provider_connection_missing", "provider_connection_not_current"));
  reasons.push(...current(input.secret_ref, "provider_secret_ref_missing", "provider_secret_ref_not_current"));
  reasons.push(...current(input.header_template, "provider_header_template_missing", "provider_header_template_not_current"));
  if (input.provider_grant === null) reasons.push("provider_grant_missing");
  if (!input.audit_available) reasons.push("provider_audit_unavailable");
  if (input.revocation_checkpoint.status !== "current") {
    reasons.push("provider_revocation_checkpoint_not_current");
  }

  const profile = input.model_profile;
  const dataProfile = input.data_handling_profile;
  const connection = input.connection;
  const secret = input.secret_ref;
  const template = input.header_template;
  const grant = input.provider_grant;

  if (profile !== null) {
    if (!providerRecordDigestValid(profile as unknown as Record<string, unknown>, "profile_digest")) {
      reasons.push("model_profile_digest_invalid");
    }
    if (input.request.requested_provider_id !== profile.provider_id) reasons.push("model_profile_provider_mismatch");
    if (input.request.requested_model_id !== profile.requested_model_id) reasons.push("model_profile_model_mismatch");
    if (!sameRef(input.request.requested_model_profile_ref, profile.profile_id, profile.profile_digest)) {
      reasons.push("model_profile_reference_mismatch");
    }
    if (!profile.supported_operations.includes(input.request.operation)) reasons.push("model_profile_operation_mismatch");
    if (!profile.supported_output_schema_ids.includes(input.request.output_schema_id)) {
      reasons.push("model_profile_output_schema_mismatch");
    }
    if (input.request.resource_limits.maximum_input_tokens > profile.maximum_input_tokens) {
      reasons.push("model_profile_input_token_limit_exceeded");
    }
    if (input.request.resource_limits.maximum_output_tokens > profile.maximum_output_tokens) {
      reasons.push("model_profile_output_token_limit_exceeded");
    }
    if (input.request.resource_limits.timeout_ms > profile.timeout_ms) reasons.push("model_profile_timeout_exceeded");
    if (input.request.resource_limits.maximum_retries > profile.maximum_retries) {
      reasons.push("model_profile_retry_limit_exceeded");
    }
  }

  if (dataProfile !== null) {
    if (!providerRecordDigestValid(dataProfile as unknown as Record<string, unknown>, "profile_digest")) {
      reasons.push("provider_data_profile_digest_invalid");
    }
    if (dataProfile.project_id !== input.request.scope.project_id) reasons.push("provider_data_profile_project_mismatch");
    if (dataProfile.application_state !== input.request.provider_application_state) {
      reasons.push("provider_application_state_mismatch");
    }
  }

  if (connection !== null) {
    if (!providerRecordDigestValid(connection as unknown as Record<string, unknown>, "connection_digest")) {
      reasons.push("provider_connection_digest_invalid");
    }
    if (connection.project_id !== input.request.scope.project_id) reasons.push("provider_connection_project_mismatch");
    if (connection.provider_id !== input.request.requested_provider_id) reasons.push("provider_connection_provider_mismatch");
  }

  if (secret !== null) {
    if (!providerRecordDigestValid(secret as unknown as Record<string, unknown>, "secret_ref_digest")) {
      reasons.push("provider_secret_ref_digest_invalid");
    }
    if (connection !== null && (
      secret.connection_id !== connection.connection_id ||
      secret.origin !== connection.origin ||
      secret.endpoint_class !== connection.endpoint_class ||
      secret.project_id !== connection.project_id ||
      secret.account_id !== connection.account_id
    )) reasons.push("provider_secret_ref_binding_mismatch");
  }

  if (template !== null) {
    if (!providerRecordDigestValid(template as unknown as Record<string, unknown>, "template_digest")) {
      reasons.push("provider_header_template_digest_invalid");
    }
    if (template.adapter_id !== input.adapter_id || template.adapter_version !== input.adapter_version) {
      reasons.push("provider_header_template_adapter_mismatch");
    }
    if (connection !== null && !sameRef(connection.header_template_ref, template.template_id, template.template_digest)) {
      reasons.push("provider_header_template_reference_mismatch");
    }
  }

  if (profile !== null && dataProfile !== null
    && !sameRef(profile.data_handling_profile_ref, dataProfile.profile_id, dataProfile.profile_digest)) {
    reasons.push("provider_data_profile_reference_mismatch");
  }
  if (connection !== null && dataProfile !== null
    && !sameRef(connection.data_handling_profile_ref, dataProfile.profile_id, dataProfile.profile_digest)) {
    reasons.push("provider_connection_data_profile_mismatch");
  }

  if (grant !== null) {
    if (!providerRecordDigestValid(grant as unknown as Record<string, unknown>, "grant_digest")) {
      reasons.push("provider_grant_digest_invalid");
    }
    if (grant.revocation_state !== "current") reasons.push("provider_grant_not_current");
    const now = Date.parse(input.now);
    const issued = Date.parse(grant.issued_at);
    const expires = Date.parse(grant.expires_at);
    if (!Number.isFinite(now) || !Number.isFinite(issued) || !Number.isFinite(expires)
      || issued > now || expires < now) reasons.push("provider_grant_time_invalid");
    if (grant.adapter_id !== input.adapter_id || grant.provider_id !== input.request.requested_provider_id) {
      reasons.push("provider_grant_provider_mismatch");
    }
    if (!grant.operations.includes(input.request.operation)) reasons.push("provider_grant_operation_mismatch");
    if (!grant.output_schema_ids.includes(input.request.output_schema_id)) {
      reasons.push("provider_grant_output_schema_mismatch");
    }
    if (!includesAll(grant.data_classes, input.request.data_classes)) {
      reasons.push("provider_grant_data_class_mismatch");
    }
    if (profile !== null && !sameRef(grant.model_profile_ref, profile.profile_id, profile.profile_digest)) {
      reasons.push("provider_grant_model_profile_mismatch");
    }
    if (connection !== null && !sameRef(grant.connection_ref, connection.connection_id, connection.connection_digest)) {
      reasons.push("provider_grant_connection_mismatch");
    }
  }

  if (!includesAll(input.authorization.request.data_classes, input.request.data_classes)) {
    reasons.push("provider_authorization_data_class_mismatch");
  }
  if (input.authorization.request.adapter_id !== input.adapter_id) reasons.push("provider_authorization_adapter_mismatch");
  if (input.authorization.request.action !== "model.generate") reasons.push("provider_authorization_action_mismatch");

  const reasonCodes = [...new Set(reasons)].sort();
  const disposition = reasonCodes.length === 0 ? "allow" : "deny";
  const finalReasons = disposition === "allow" ? ["provider_execution_authorized"] : reasonCodes;
  return {
    disposition,
    reason_codes: finalReasons,
    audit_event: createGovernanceAuditEvent({
      request: input.authorization.request,
      disposition,
      reason_codes: finalReasons,
      policy_refs: outer.policy_refs,
      actor_ref: input.provider_grant?.principal_ref ?? "actor.unknown",
      occurred_at: input.now,
    }),
    revocation_checkpoint: structuredClone(input.revocation_checkpoint),
    authority_effect: "none",
  };
}
