import { sha256Canonical } from "@contentmd/core";
import type {
  GovernanceAuditEvent,
  OperationRequest,
  PolicyDisposition,
} from "./policy.js";

export function createGovernanceAuditEvent(input: {
  request: OperationRequest;
  disposition: PolicyDisposition;
  reason_codes: readonly string[];
  policy_refs: readonly string[];
  actor_ref: string;
  occurred_at: string;
}): GovernanceAuditEvent {
  const detailsDigest = sha256Canonical({
    operation_id: input.request.operation_id,
    disposition: input.disposition,
    reason_codes: [...input.reason_codes],
    policy_refs: [...input.policy_refs],
  });
  return {
    event_id: `audit.${input.request.operation_id}.${detailsDigest.slice(0, 16)}`,
    operation_id: input.request.operation_id,
    action: input.request.action,
    disposition:
      input.disposition === "allow"
        ? "allowed"
        : input.disposition === "review"
          ? "review_required"
          : "denied",
    actor_ref: input.actor_ref,
    policy_refs: [...input.policy_refs],
    target_refs: [...input.request.resource_scope],
    occurred_at: input.occurred_at,
    details_digest: detailsDigest,
  };
}
