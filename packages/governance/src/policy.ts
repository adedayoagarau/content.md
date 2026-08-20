export type OperatingIntent = "discover" | "advise" | "draft" | "apply" | "enforce";
export type PolicyDisposition = "allow" | "deny" | "review";
export type EgressMode = "none" | "local" | "network";
export type ApprovalClass =
  | "semantic_decision"
  | "mutation"
  | "release"
  | "learning_promotion";

export type ControlType =
  | "connection_authorization"
  | "data_processing"
  | "durable_memory"
  | "telemetry";

export interface ResourceLimits {
  calls: number;
  bytes: number;
  duration_ms: number;
  records: number;
  model_tokens: number;
  browser_actions: number;
  retries: number;
}

export interface GovernancePolicy {
  policy_id: string;
  policy_version: number;
  status: "draft" | "current" | "revoked" | "superseded";
  effective_at: string;
  expires_at: string | null;
  allowed_actions: string[];
  denied_actions: string[];
  review_actions: string[];
  allowed_adapters: string[];
  denied_adapters: string[];
  permitted_data_classes: string[];
  denied_data_classes: string[];
  permitted_egress: EgressMode[];
  max_limits: ResourceLimits;
  human_approval_actions: string[];
  required_control_types: ControlType[];
}

export interface ComposedPolicy {
  status: "current" | "invalid";
  reason_codes: string[];
  policy_refs: string[];
  allowed_actions: string[];
  denied_actions: string[];
  review_actions: string[];
  allowed_adapters: string[];
  denied_adapters: string[];
  permitted_data_classes: string[];
  denied_data_classes: string[];
  permitted_egress: EgressMode[];
  max_limits: ResourceLimits;
  human_approval_actions: string[];
  required_control_types: ControlType[];
}

export interface OperationRequest {
  operation_id: string;
  intent: OperatingIntent;
  action: string;
  adapter_id: string;
  resource_scope: string[];
  data_classes: string[];
  egress: EgressMode;
  requested_limits: ResourceLimits;
  approval_class: ApprovalClass | null;
  requires_readback: boolean;
  subject_digest?: string;
}

export interface CapabilityGrant {
  grant_id: string;
  principal_ref: string;
  workload_ref: string;
  action: string;
  adapter_id: string;
  resource_scope: string[];
  data_classes: string[];
  egress: EgressMode;
  max_limits: ResourceLimits;
  issued_at: string;
  expires_at: string;
  revocation_state: "current" | "revoked" | "unknown";
}

export interface OperationApproval {
  approval_id: string;
  approval_class: ApprovalClass;
  subject_ref: string;
  subject_digest?: string;
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export interface DataControlDisposition {
  control_type: ControlType;
  applicability: "applicable" | "not_applicable";
  record_ref: string | null;
  status: "current" | "expired" | "revoked" | "unknown" | "not_applicable";
  rationale: string;
}

export interface ReliabilityEvidence {
  score: number;
  observations: number;
}

export interface AuthorizationInput {
  now: string;
  request: OperationRequest;
  policies: GovernancePolicy[];
  capability_grant: CapabilityGrant | null;
  approval: OperationApproval | null;
  control_dispositions: DataControlDisposition[];
  verification_plan_ref: string | null;
  reliability_evidence: ReliabilityEvidence | null;
}

export interface GovernanceAuditEvent {
  event_id: string;
  operation_id: string;
  action: string;
  disposition: "allowed" | "denied" | "review_required";
  actor_ref: string;
  policy_refs: string[];
  target_refs: string[];
  occurred_at: string;
  details_digest: string;
}

export interface AuthorizationDecision {
  disposition: PolicyDisposition;
  reason_codes: string[];
  conditions: string[];
  policy_refs: string[];
  audit_event: GovernanceAuditEvent;
}
