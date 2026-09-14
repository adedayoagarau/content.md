import { sha256Canonical } from "../packages/core/dist/index.js";
import {
  authorizeOperation,
  issueReviewerQualification,
} from "../packages/governance/dist/index.js";

const LIMITS = Object.freeze({
  calls: 1,
  bytes: 1_048_576,
  duration_ms: 1_000,
  records: 100,
  model_tokens: 0,
  browser_actions: 0,
  retries: 0,
});

export function governedContentDesignReviewerFixture(packetDigest, {
  reviewerId = "reviewer.fixture",
  reviewedAt = "2026-09-14T12:00:00.000Z",
} = {}) {
  const scopes = [
    "content-design-benchmark",
    `content-design-benchmark-packet:${packetDigest}`,
  ];
  const material = {
    record_mode: "governed",
    reviewer_ref: { object_id: reviewerId, object_digest: "1".repeat(64) },
    eligible_roles: ["qualified_content_designer"],
    qualified_objectives: ["content_design_benchmark_review"],
    authorized_resource_scopes: scopes,
    effective_at: "2026-01-01T00:00:00.000Z",
    expires_at: "2027-01-01T00:00:00.000Z",
    issuer_principal_ref: "principal.test-only.content-design-governance",
  };
  const materialDigest = sha256Canonical(material);
  const operationId = `operation.issue-content-design-reviewer.${materialDigest.slice(0, 16)}`;
  const input = {
    now: reviewedAt,
    request: {
      operation_id: operationId,
      intent: "enforce",
      action: "issue_reviewer_qualification",
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: scopes,
      data_classes: ["governance-metadata"],
      egress: "none",
      requested_limits: { ...LIMITS },
      approval_class: "semantic_decision",
      requires_readback: false,
      subject_digest: materialDigest,
    },
    policies: [{
      policy_id: "policy.test-only.content-design-reviewer-qualification",
      policy_version: 1,
      status: "current",
      effective_at: "2026-01-01T00:00:00.000Z",
      expires_at: "2027-01-01T00:00:00.000Z",
      allowed_actions: ["issue_reviewer_qualification"],
      denied_actions: [],
      review_actions: [],
      allowed_adapters: ["adapter.governance.reviewer-qualification"],
      denied_adapters: [],
      permitted_data_classes: ["governance-metadata"],
      denied_data_classes: [],
      permitted_egress: ["none"],
      max_limits: { ...LIMITS },
      human_approval_actions: ["issue_reviewer_qualification"],
      required_control_types: ["data_processing", "durable_memory", "telemetry"],
    }],
    capability_grant: {
      grant_id: "grant.test-only.content-design-reviewer-qualification",
      principal_ref: material.issuer_principal_ref,
      workload_ref: "workload.test-only.content-design-governance",
      action: "issue_reviewer_qualification",
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: scopes,
      data_classes: ["governance-metadata"],
      egress: "none",
      max_limits: { ...LIMITS },
      issued_at: "2026-09-14T10:00:00.000Z",
      expires_at: "2026-09-14T14:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: "approval.test-only.content-design-reviewer-qualification",
      approval_class: "semantic_decision",
      subject_ref: operationId,
      subject_digest: materialDigest,
      status: "issued",
      issued_at: "2026-09-14T11:00:00.000Z",
      expires_at: "2026-09-14T14:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.test-only.processing", status: "current", rationale: "Qualification metadata only." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.test-only.memory", status: "current", rationale: "Qualification is auditable." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.test-only.telemetry", status: "current", rationale: "Audit metadata is minimized." },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  const issuance = { input, expected_decision: authorizeOperation(input) };
  const qualification = issueReviewerQualification({
    material,
    issuance,
    revocation: null,
    as_of: reviewedAt,
  });
  return {
    reviewer_id: reviewerId,
    reviewer_role: "qualified_content_designer",
    reviewed_at: reviewedAt,
    independent_review_attested: true,
    qualification_bundle: { qualification, issuance, revocation: null },
  };
}
