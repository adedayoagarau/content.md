import { describe, expect, it } from "vitest";
import {
  createHmacExecutionPlanSigner,
  issueProviderExecutionPlan,
  verifyAuthenticatedProviderExecutionPlan,
} from "@contentmd/governance";
import { PROVIDER_NOW, providerFixture } from "./provider-fixtures.js";

const signer = () => createHmacExecutionPlanSigner({
  key_id: "plan-signing-key.fixture",
  secret: Buffer.from("fixture-only-plan-signing-key-32b", "utf8"),
});

async function issued() {
  const fixture = providerFixture();
  const authenticated_plan = await issueProviderExecutionPlan({
    now: PROVIDER_NOW,
    expires_at: "2026-08-22T20:01:00.000Z",
    nonce: "nonce.provider.fixture.001",
    method: "POST",
    authorization: fixture.authorization,
    prepared_request: fixture.prepared_request,
  }, signer());
  return { ...fixture, authenticated_plan };
}

describe("authenticated provider execution plans", () => {
  it("issues an immutable, minimized, single-attempt plan bound to the exact request", async () => {
    const fixture = await issued();

    expect(fixture.authenticated_plan.plan.maximum_attempts).toBe(1);
    expect(fixture.authenticated_plan.plan.authority_effect).toBe("none");
    expect(fixture.authenticated_plan.plan.body_byte_count).toBe(20);
    expect(fixture.authenticated_plan.plan).toMatchObject({
      principal_ref: "actor.fixture",
      workload_ref: "workload.contentmd",
      project_id: "project.fixture",
      task_id: "task.fixture",
      redirect_policy: "deny",
      verification_plan_ref: "verification.provider.fixture",
      attempt_ledger_stream_id: expect.stringMatching(/^provider-attempt\.[a-f0-9]{64}$/u),
      outcome_audit_stream_id: expect.stringMatching(/^provider-outcome\.[a-f0-9]{64}$/u),
      resource_limits: {
        calls: 1,
        attempts: 1,
        retries: 0,
        request_bytes: 131_072,
        response_bytes: 32_768,
        duration_ms: 30_000,
        input_tokens: 8_000,
        output_tokens: 2_000,
      },
    });
    expect(fixture.authenticated_plan.plan.policy_refs).toEqual(["policy.provider.fixture@1"]);
    expect(fixture.authenticated_plan.plan.control_dispositions).toHaveLength(4);
    expect(fixture.authenticated_plan.plan.policy_set_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(fixture.authenticated_plan.plan.authorization_envelope_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(fixture.authenticated_plan.authentication.algorithm).toBe("hmac-sha256");
    expect(Object.isFrozen(fixture.authenticated_plan.plan)).toBe(true);
    expect(JSON.stringify(fixture.authenticated_plan)).not.toContain("fixture-only-plan-signing-key");
    expect(JSON.stringify(fixture.authenticated_plan)).not.toContain("{\"input\":\"fixture\"}");

    const verification = await verifyAuthenticatedProviderExecutionPlan({
      now: PROVIDER_NOW,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, signer());
    expect(verification).toMatchObject({
      disposition: "allow",
      reason_codes: ["provider_execution_plan_verified"],
      authority_effect: "none",
    });
  });

  it.each([
    ["body", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.prepared_request = {
        ...fixture.prepared_request,
        body_bytes: Buffer.from('{"input":"changed"}\n', "utf8"),
      };
    }, "provider_execution_plan_body_mismatch"],
    ["destination", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.prepared_request = { ...fixture.prepared_request, destination_path: "/v1/chat/completions" };
    }, "provider_execution_plan_destination_mismatch"],
    ["header", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.authorization = {
        ...fixture.authorization,
        header_template: { ...fixture.authorization.header_template!, template_digest: "f".repeat(64) },
      };
    }, "provider_execution_plan_header_mismatch"],
    ["model", (fixture: Awaited<ReturnType<typeof issued>>) => {
      const request = { ...fixture.prepared_request.request, requested_model_id: "gpt-drift" };
      fixture.prepared_request = { ...fixture.prepared_request, request };
      fixture.authorization = { ...fixture.authorization, request };
    }, "provider_execution_plan_model_mismatch"],
    ["schema", (fixture: Awaited<ReturnType<typeof issued>>) => {
      const request = {
        ...fixture.prepared_request.request,
        output_schema_digest: "e".repeat(64),
      };
      fixture.prepared_request = { ...fixture.prepared_request, request };
      fixture.authorization = { ...fixture.authorization, request };
    }, "provider_execution_plan_schema_mismatch"],
    ["revocation", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.authorization = {
        ...fixture.authorization,
        revocation_checkpoint: { ...fixture.authorization.revocation_checkpoint, status: "unknown" },
      };
    }, "provider_execution_plan_revocation_not_current"],
  ] as const)("denies %s drift", async (_label, mutate, reason) => {
    const fixture = await issued();
    mutate(fixture);

    const verification = await verifyAuthenticatedProviderExecutionPlan({
      now: PROVIDER_NOW,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, signer());
    expect(verification.disposition).toBe("deny");
    expect(verification.reason_codes).toContain(reason);
  });

  it("denies expiry and authentication tampering", async () => {
    const fixture = await issued();
    const tampered = structuredClone(fixture.authenticated_plan);
    tampered.authentication.tag = "0".repeat(64);

    const invalidSignature = await verifyAuthenticatedProviderExecutionPlan({
      now: PROVIDER_NOW,
      authenticated_plan: tampered,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, signer());
    const expired = await verifyAuthenticatedProviderExecutionPlan({
      now: "2026-08-22T20:01:00.001Z",
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, signer());

    expect(invalidSignature.reason_codes).toContain("provider_execution_plan_authentication_invalid");
    expect(expired.reason_codes).toContain("provider_execution_plan_expired");
  });

  it.each([
    ["policy", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.authorization = {
        ...fixture.authorization,
        authorization: {
          ...fixture.authorization.authorization,
          policies: fixture.authorization.authorization.policies.map((policy) => ({
            ...policy,
            policy_version: policy.policy_version + 1,
          })),
        },
      };
    }],
    ["control", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.authorization = {
        ...fixture.authorization,
        authorization: {
          ...fixture.authorization.authorization,
          control_dispositions: fixture.authorization.authorization.control_dispositions.map((control, index) =>
            index === 0 ? { ...control, rationale: "Changed after plan issuance." } : control),
        },
      };
    }],
    ["verification plan", (fixture: Awaited<ReturnType<typeof issued>>) => {
      fixture.authorization = {
        ...fixture.authorization,
        authorization: {
          ...fixture.authorization.authorization,
          verification_plan_ref: "verification.provider.drift",
        },
      };
    }],
  ] as const)("denies %s governance drift even when authorization remains allowable", async (_label, mutate) => {
    const fixture = await issued();
    mutate(fixture);

    const verification = await verifyAuthenticatedProviderExecutionPlan({
      now: PROVIDER_NOW,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, signer());

    expect(verification.disposition).toBe("deny");
    expect(verification.reason_codes).toContain("provider_execution_plan_governance_mismatch");
  });
});
