import { createGovernanceAuditEvent } from "./audit.js";
import { composePolicies, limitKeys } from "./compose.js";
import type {
  ApprovalClass,
  AuthorizationDecision,
  AuthorizationInput,
  CapabilityGrant,
  ComposedPolicy,
  DataControlDisposition,
  OperationApproval,
  ResourceLimits,
} from "./policy.js";

function timestamp(value: string): number | null {
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function exceeds(requested: ResourceLimits, maximum: ResourceLimits): (keyof ResourceLimits)[] {
  return limitKeys.filter((key) => requested[key] > maximum[key]);
}

function includesAll(granted: readonly string[], requested: readonly string[]): boolean {
  return requested.every((value) => granted.includes(value));
}

function validateGrant(
  input: AuthorizationInput,
  grant: CapabilityGrant | null,
): string[] {
  if (grant === null) return ["capability_grant_missing"];
  const reasons: string[] = [];
  const now = timestamp(input.now);
  const issuedAt = timestamp(grant.issued_at);
  const expiresAt = timestamp(grant.expires_at);
  if (now === null || issuedAt === null || expiresAt === null) {
    reasons.push("capability_grant_time_invalid");
  } else {
    if (issuedAt > now) reasons.push("capability_grant_not_yet_effective");
    if (expiresAt < now) reasons.push("capability_grant_expired");
  }
  if (grant.revocation_state === "revoked") reasons.push("capability_grant_revoked");
  if (grant.revocation_state === "unknown") reasons.push("capability_grant_revocation_unknown");
  if (grant.action !== input.request.action) reasons.push("capability_grant_action_mismatch");
  if (grant.adapter_id !== input.request.adapter_id) reasons.push("capability_grant_adapter_mismatch");
  if (grant.egress !== input.request.egress) reasons.push("capability_grant_egress_mismatch");
  if (!includesAll(grant.resource_scope, input.request.resource_scope)) {
    reasons.push("capability_grant_resource_scope_mismatch");
  }
  if (!includesAll(grant.data_classes, input.request.data_classes)) {
    reasons.push("capability_grant_data_scope_mismatch");
  }
  reasons.push(
    ...exceeds(input.request.requested_limits, grant.max_limits).map(
      (key) => `capability_grant_limit_exceeded:${key}`,
    ),
  );
  return reasons;
}

function validateApproval(
  input: AuthorizationInput,
  approval: OperationApproval | null,
  requiredClass: ApprovalClass,
): string[] {
  if (approval === null) return ["approval_missing"];
  const reasons: string[] = [];
  if (approval.approval_class !== requiredClass) reasons.push("approval_class_mismatch");
  if (approval.subject_ref !== input.request.operation_id) reasons.push("approval_subject_mismatch");
  if (approval.status === "revoked" || approval.revocation_state === "revoked") {
    reasons.push("approval_revoked");
  } else if (approval.status !== "issued") {
    reasons.push(`approval_not_current:${approval.status}`);
  }
  if (approval.revocation_state === "unknown") reasons.push("approval_revocation_unknown");
  const now = timestamp(input.now);
  const issuedAt = timestamp(approval.issued_at);
  const expiresAt = approval.expires_at === null ? null : timestamp(approval.expires_at);
  if (now === null || issuedAt === null || (approval.expires_at !== null && expiresAt === null)) {
    reasons.push("approval_time_invalid");
  } else {
    if (issuedAt > now) reasons.push("approval_not_yet_effective");
    if (expiresAt !== null && expiresAt < now) reasons.push("approval_expired");
  }
  return reasons;
}

function validateControls(
  required: readonly string[],
  dispositions: readonly DataControlDisposition[],
): string[] {
  const reasons: string[] = [];
  const grouped = new Map<string, DataControlDisposition[]>();
  for (const disposition of dispositions) {
    const items = grouped.get(disposition.control_type) ?? [];
    items.push(disposition);
    grouped.set(disposition.control_type, items);
  }
  for (const [controlType, items] of grouped) {
    if (items.length !== 1) reasons.push(`control_duplicate:${controlType}`);
    for (const item of items) {
      if (item.rationale.trim().length === 0) reasons.push(`control_rationale_missing:${controlType}`);
      if (item.applicability === "applicable") {
        if (item.record_ref === null) reasons.push(`control_record_missing:${controlType}`);
        if (item.status !== "current") reasons.push(`control_not_current:${controlType}`);
      } else if (item.status !== "not_applicable" || item.record_ref !== null) {
        reasons.push(`control_na_invalid:${controlType}`);
      }
    }
  }
  for (const controlType of required) {
    if (!grouped.has(controlType)) reasons.push(`control_missing:${controlType}`);
  }
  return reasons;
}

function validatePolicy(
  input: AuthorizationInput,
  composed: ComposedPolicy,
): string[] {
  const reasons = [...composed.reason_codes];
  const now = timestamp(input.now);
  if (now === null) reasons.push("authorization_time_invalid");
  for (const policy of input.policies) {
    const effectiveAt = timestamp(policy.effective_at);
    const expiresAt = policy.expires_at === null ? null : timestamp(policy.expires_at);
    if (effectiveAt === null || (policy.expires_at !== null && expiresAt === null)) {
      reasons.push(`policy_time_invalid:${policy.policy_id}`);
    } else if (now !== null) {
      if (effectiveAt > now) reasons.push(`policy_not_yet_effective:${policy.policy_id}`);
      if (expiresAt !== null && expiresAt < now) reasons.push(`policy_expired:${policy.policy_id}`);
    }
  }
  if (composed.denied_actions.includes(input.request.action)) reasons.push("policy_action_denied");
  if (!composed.allowed_actions.includes(input.request.action)) reasons.push("policy_action_not_allowed");
  if (composed.denied_adapters.includes(input.request.adapter_id)) reasons.push("policy_adapter_denied");
  if (!composed.allowed_adapters.includes(input.request.adapter_id)) reasons.push("policy_adapter_not_allowed");
  if (input.request.data_classes.some((item) => composed.denied_data_classes.includes(item))) {
    reasons.push("policy_data_class_denied");
  }
  if (!includesAll(composed.permitted_data_classes, input.request.data_classes)) {
    reasons.push("policy_data_class_not_permitted");
  }
  if (!composed.permitted_egress.includes(input.request.egress)) reasons.push("policy_egress_denied");
  reasons.push(
    ...exceeds(input.request.requested_limits, composed.max_limits).map(
      (key) => `policy_resource_limit_exceeded:${key}`,
    ),
  );
  return reasons;
}

export function authorizeOperation(input: AuthorizationInput): AuthorizationDecision {
  const composed = composePolicies(input.policies);
  const reasons = [
    ...validatePolicy(input, composed),
    ...validateGrant(input, input.capability_grant),
    ...validateControls(composed.required_control_types, input.control_dispositions),
  ];

  const approvalRequired =
    input.request.approval_class !== null ||
    composed.human_approval_actions.includes(input.request.action);
  if (approvalRequired) {
    const approvalClass = input.request.approval_class ?? "mutation";
    reasons.push(...validateApproval(input, input.approval, approvalClass));
  }
  if (input.request.requires_readback && input.verification_plan_ref === null) {
    reasons.push("verification_plan_missing");
  }

  const uniqueReasons = [...new Set(reasons)].sort();
  const reviewRequired =
    uniqueReasons.length === 0 && composed.review_actions.includes(input.request.action);
  const disposition =
    uniqueReasons.length > 0 ? "deny" : reviewRequired ? "review" : "allow";
  const reasonCodes =
    uniqueReasons.length > 0
      ? uniqueReasons
      : reviewRequired
        ? ["policy_review_required"]
        : ["policy_and_grant_satisfied"];
  const actorRef = input.capability_grant?.principal_ref ?? "actor.unknown";

  return {
    disposition,
    reason_codes: reasonCodes,
    conditions: input.verification_plan_ref === null ? [] : [`readback:${input.verification_plan_ref}`],
    policy_refs: composed.policy_refs,
    audit_event: createGovernanceAuditEvent({
      request: input.request,
      disposition,
      reason_codes: reasonCodes,
      policy_refs: composed.policy_refs,
      actor_ref: actorRef,
      occurred_at: input.now,
    }),
  };
}
