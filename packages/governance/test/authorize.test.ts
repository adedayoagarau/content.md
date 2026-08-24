import { describe, expect, it } from "vitest";
import {
  authorizeOperation,
  type AuthorizationInput,
  type DataControlDisposition,
  type GovernancePolicy,
} from "@contentmd/governance";

const now = "2026-08-20T16:00:00.000Z";

const basePolicy: GovernancePolicy = {
  policy_id: "policy.fixture.project",
  policy_version: 1,
  status: "current",
  effective_at: "2026-08-20T00:00:00.000Z",
  expires_at: "2026-08-21T00:00:00.000Z",
  allowed_actions: ["filesystem.read", "filesystem.write"],
  denied_actions: [],
  review_actions: [],
  allowed_adapters: ["adapter.filesystem"],
  denied_adapters: [],
  permitted_data_classes: ["public-synthetic", "project-metadata"],
  denied_data_classes: [],
  permitted_egress: ["none", "local"],
  max_limits: {
    calls: 4,
    bytes: 4096,
    duration_ms: 2000,
    records: 10,
    model_tokens: 0,
    browser_actions: 0,
    retries: 0,
  },
  human_approval_actions: ["filesystem.write"],
  required_control_types: ["data_processing", "durable_memory", "telemetry"],
};

const controls: DataControlDisposition[] = [
  {
    control_type: "connection_authorization",
    applicability: "not_applicable",
    record_ref: null,
    status: "not_applicable",
    rationale: "The local filesystem operation has no connector.",
  },
  {
    control_type: "data_processing",
    applicability: "applicable",
    record_ref: "control.fixture.processing",
    status: "current",
    rationale: "Synthetic project content only.",
  },
  {
    control_type: "durable_memory",
    applicability: "applicable",
    record_ref: "control.fixture.memory",
    status: "current",
    rationale: "Project-scoped event metadata is retained.",
  },
  {
    control_type: "telemetry",
    applicability: "applicable",
    record_ref: "control.fixture.telemetry",
    status: "current",
    rationale: "Local audit metadata only.",
  },
];

function input(overrides: Partial<AuthorizationInput> = {}): AuthorizationInput {
  return {
    now,
    request: {
      operation_id: "operation.fixture.read.001",
      intent: "discover",
      action: "filesystem.read",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/App.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      requested_limits: {
        calls: 1,
        bytes: 1024,
        duration_ms: 500,
        records: 2,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      approval_class: null,
      requires_readback: false,
    },
    policies: [basePolicy],
    capability_grant: {
      grant_id: "grant.fixture.read.001",
      principal_ref: "actor.fixture.agent",
      workload_ref: "workload.fixture.contentmd",
      action: "filesystem.read",
      adapter_id: "adapter.filesystem",
      resource_scope: ["src/App.tsx"],
      data_classes: ["public-synthetic"],
      egress: "none",
      max_limits: {
        calls: 1,
        bytes: 2048,
        duration_ms: 1000,
        records: 5,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      issued_at: "2026-08-20T15:00:00.000Z",
      expires_at: "2026-08-20T17:00:00.000Z",
      revocation_state: "current",
    },
    approval: null,
    control_dispositions: controls,
    verification_plan_ref: null,
    reliability_evidence: { score: 0.99, observations: 1000 },
    ...overrides,
  };
}

describe("authorizeOperation", () => {
  it("allows an exactly granted local read and returns a minimized audit event", () => {
    const decision = authorizeOperation(input());

    expect(decision.disposition).toBe("allow");
    expect(decision.reason_codes).toEqual(["policy_and_grant_satisfied"]);
    expect(decision.audit_event).toMatchObject({
      operation_id: "operation.fixture.read.001",
      action: "filesystem.read",
      disposition: "allowed",
      policy_refs: ["policy.fixture.project@1"],
      target_refs: ["src/App.tsx"],
      occurred_at: now,
    });
    expect(JSON.stringify(decision.audit_event)).not.toContain("0.99");
  });

  it.each([
    ["missing policy", { policies: [] }, "policy_missing"],
    ["missing grant", { capability_grant: null }, "capability_grant_missing"],
    [
      "expired grant",
      {
        capability_grant: {
          ...input().capability_grant!,
          expires_at: "2026-08-20T15:59:59.000Z",
        },
      },
      "capability_grant_expired",
    ],
    [
      "revoked grant",
      {
        capability_grant: {
          ...input().capability_grant!,
          revocation_state: "revoked" as const,
        },
      },
      "capability_grant_revoked",
    ],
    [
      "resource ceiling",
      {
        request: {
          ...input().request,
          requested_limits: { ...input().request.requested_limits, bytes: 4097 },
        },
      },
      "policy_resource_limit_exceeded:bytes",
    ],
    [
      "egress",
      { request: { ...input().request, egress: "network" as const } },
      "policy_egress_denied",
    ],
    [
      "missing required control",
      { control_dispositions: controls.filter((item) => item.control_type !== "telemetry") },
      "control_missing:telemetry",
    ],
    [
      "missing readback",
      {
        request: { ...input().request, requires_readback: true },
        verification_plan_ref: null,
      },
      "verification_plan_missing",
    ],
  ])("fails closed for %s", (_name, overrides, reasonCode) => {
    const decision = authorizeOperation(input(overrides as Partial<AuthorizationInput>));

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain(reasonCode);
    expect(decision.audit_event.disposition).toBe("denied");
  });

  it("requires a current mutation approval for writes", () => {
    const writeInput = input({
      request: {
        ...input().request,
        operation_id: "operation.fixture.write.001",
        intent: "apply",
        action: "filesystem.write",
        approval_class: "mutation",
        requires_readback: true,
      },
      capability_grant: {
        ...input().capability_grant!,
        grant_id: "grant.fixture.write.001",
        action: "filesystem.write",
      },
      verification_plan_ref: "verification-plan.fixture.write.001",
      approval: {
        approval_id: "approval.fixture.write.001",
        approval_class: "mutation",
        subject_ref: "operation.fixture.write.001",
        subject_digest: "a".repeat(64),
        status: "revoked",
        issued_at: "2026-08-20T15:30:00.000Z",
        expires_at: "2026-08-20T17:00:00.000Z",
        revocation_state: "revoked",
      },
    });

    const decision = authorizeOperation(writeInput);

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain("approval_revoked");
  });

  it("binds mutation approval to the exact operation subject digest", () => {
    const writeInput = input({
      request: {
        ...input().request,
        operation_id: "operation.fixture.write.digest",
        intent: "apply",
        action: "filesystem.write",
        approval_class: "mutation",
        requires_readback: true,
        subject_digest: "a".repeat(64),
      },
      capability_grant: {
        ...input().capability_grant!,
        action: "filesystem.write",
      },
      verification_plan_ref: "verification-plan.fixture.write.digest",
      approval: {
        approval_id: "approval.fixture.write.digest",
        approval_class: "mutation",
        subject_ref: "operation.fixture.write.digest",
        subject_digest: "b".repeat(64),
        status: "issued",
        issued_at: "2026-08-20T15:30:00.000Z",
        expires_at: "2026-08-20T17:00:00.000Z",
        revocation_state: "current",
      },
    });

    const decision = authorizeOperation(writeInput);

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain("approval_subject_digest_mismatch");
  });

  it("does not let reliability change an authorization result", () => {
    const high = authorizeOperation(input({ policies: [] }));
    const low = authorizeOperation(
      input({
        policies: [],
        reliability_evidence: { score: 0, observations: 0 },
      }),
    );

    expect(high.disposition).toBe("deny");
    expect(low.disposition).toBe("deny");
    expect(high.reason_codes).toEqual(low.reason_codes);
  });
});
