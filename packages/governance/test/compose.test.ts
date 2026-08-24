import { describe, expect, it } from "vitest";
import {
  composePolicies,
  type GovernancePolicy,
} from "@contentmd/governance";

function policy(
  overrides: Partial<GovernancePolicy> = {},
): GovernancePolicy {
  return {
    policy_id: "policy.fixture.base",
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-20T00:00:00.000Z",
    expires_at: null,
    allowed_actions: ["filesystem.read", "content.draft", "filesystem.write"],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["adapter.filesystem"],
    denied_adapters: [],
    permitted_data_classes: ["public-synthetic", "project-metadata"],
    denied_data_classes: [],
    permitted_egress: ["none", "local"],
    max_limits: {
      calls: 10,
      bytes: 10000,
      duration_ms: 5000,
      records: 100,
      model_tokens: 0,
      browser_actions: 0,
      retries: 1,
    },
    human_approval_actions: [],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
    ...overrides,
  };
}

describe("composePolicies", () => {
  it("uses intersections, unions, and minimum ceilings", () => {
    const composed = composePolicies([
      policy(),
      policy({
        policy_id: "policy.fixture.task",
        allowed_actions: ["filesystem.read", "content.draft"],
        denied_actions: ["filesystem.write"],
        review_actions: ["content.draft"],
        max_limits: {
          calls: 5,
          bytes: 4000,
          duration_ms: 2500,
          records: 20,
          model_tokens: 0,
          browser_actions: 0,
          retries: 0,
        },
      }),
    ]);

    expect(composed.policy_refs).toEqual([
      "policy.fixture.base@1",
      "policy.fixture.task@1",
    ]);
    expect(composed.allowed_actions).toEqual(["content.draft", "filesystem.read"]);
    expect(composed.denied_actions).toEqual(["filesystem.write"]);
    expect(composed.review_actions).toEqual(["content.draft"]);
    expect(composed.max_limits).toEqual({
      calls: 5,
      bytes: 4000,
      duration_ms: 2500,
      records: 20,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    });
  });

  it("fails closed when no current policy is available", () => {
    expect(composePolicies([])).toEqual({
      status: "invalid",
      reason_codes: ["policy_missing"],
      policy_refs: [],
      allowed_actions: [],
      denied_actions: [],
      review_actions: [],
      allowed_adapters: [],
      denied_adapters: [],
      permitted_data_classes: [],
      denied_data_classes: [],
      permitted_egress: [],
      max_limits: {
        calls: 0,
        bytes: 0,
        duration_ms: 0,
        records: 0,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      human_approval_actions: [],
      required_control_types: [],
    });
  });
});
