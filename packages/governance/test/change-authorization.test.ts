import { describe, expect, it } from "vitest";
import { authorizeOperation, type AuthorizationInput, type GovernancePolicy } from "@contentmd/governance";

const limits = {
  calls: 1,
  bytes: 4096,
  duration_ms: 2000,
  records: 2,
  model_tokens: 0,
  browser_actions: 0,
  retries: 0,
};

const policy: GovernancePolicy = {
  policy_id: "policy.fixture.change",
  policy_version: 1,
  status: "current",
  effective_at: "2026-08-20T00:00:00.000Z",
  expires_at: "2026-08-21T00:00:00.000Z",
  allowed_actions: ["filesystem.write", "filesystem.rollback"],
  denied_actions: [],
  review_actions: [],
  allowed_adapters: ["adapter.filesystem"],
  denied_adapters: [],
  permitted_data_classes: ["public-synthetic"],
  denied_data_classes: [],
  permitted_egress: ["none"],
  max_limits: limits,
  human_approval_actions: ["filesystem.write", "filesystem.rollback"],
  required_control_types: ["data_processing", "durable_memory", "telemetry"],
};

function authorizationInput(approvalClass: "mutation" | "semantic_decision" = "mutation"): AuthorizationInput {
  const subjectDigest = "a".repeat(64);
  return {
    now: "2026-08-20T18:00:00.000Z",
    request: {
      operation_id: "operation.fixture.apply",
      intent: "apply",
      action: "filesystem.write",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/components/CheckoutSummary.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      requested_limits: limits,
      approval_class: "mutation",
      requires_readback: true,
      subject_digest: subjectDigest,
    },
    policies: [policy],
    capability_grant: {
      grant_id: "grant.fixture.apply",
      principal_ref: "actor.fixture.agent",
      workload_ref: "workload.contentmd",
      action: "filesystem.write",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/components/CheckoutSummary.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      max_limits: limits,
      issued_at: "2026-08-20T17:00:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: "apr_fixture_delete_workspace_v1",
      approval_class: approvalClass,
      subject_ref: "operation.fixture.apply",
      subject_digest: subjectDigest,
      status: "issued",
      issued_at: "2026-08-20T17:30:00.000Z",
      expires_at: "2026-08-20T19:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "connection_authorization", applicability: "not_applicable", record_ref: null, status: "not_applicable", rationale: "No connector." },
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Synthetic fixture." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Audit records only." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Local verification metadata." },
    ],
    verification_plan_ref: "verify_fixture_delete_workspace_v1",
    reliability_evidence: null,
  };
}

describe("change authorization", () => {
  it("allows only an exact mutation approval", () => {
    expect(authorizeOperation(authorizationInput()).disposition).toBe("allow");
  });

  it("does not treat proposal acceptance as mutation approval", () => {
    const decision = authorizeOperation(authorizationInput("semantic_decision"));

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain("approval_class_mismatch");
  });
});
