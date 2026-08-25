import { describe, expect, it } from "vitest";
import {
  issueProviderExecutionPlan,
  providerExecutionPlanRef,
} from "@contentmd/governance";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  parseOpenAIResponsesResult,
  prepareOpenAIResponsesRequest,
  type GuardedOpenAITransportResult,
} from "../src/index.js";

const canonicalOutput = {
  authority_effect: "none",
  intent: "advise",
  risk_level: "high",
  risk_signals: [],
  review_requirements: [],
  uncertainty: [],
};

function responseBody(overrides: Record<string, unknown> = {}) {
  return {
    id: "resp_fixture",
    object: "response",
    created_at: 1787428801,
    status: "completed",
    incomplete_details: null,
    error: null,
    model: "gpt-fixture",
    output: [{
      id: "msg_fixture",
      type: "message",
      role: "assistant",
      content: [{
        type: "output_text",
        text: JSON.stringify(canonicalOutput),
        annotations: [],
      }],
    }],
    service_tier: "default",
    store: false,
    usage: {
      input_tokens: 100,
      output_tokens: 20,
      total_tokens: 120,
      input_tokens_details: { cached_tokens: 5 },
    },
    ...overrides,
  };
}

async function parseFixture(body: unknown, status = 200) {
  const provider = providerFixture();
  const prepared = prepareOpenAIResponsesRequest(provider.authorization.request);
  const authenticated_plan = await issueProviderExecutionPlan({
    now: PROVIDER_NOW,
    expires_at: "2026-08-22T20:01:00.000Z",
    nonce: "nonce.openai.response.fixture",
    method: "POST",
    authorization: provider.authorization,
    prepared_request: prepared,
  }, providerPlanSigner());
  const planRef = providerExecutionPlanRef(authenticated_plan.plan);
  const transport_result: GuardedOpenAITransportResult = {
    response: {
      status,
      headers: { "content-type": "application/json" },
      body_bytes: typeof body === "string"
        ? Buffer.from(body, "utf8")
        : Buffer.from(JSON.stringify(body), "utf8"),
      received_at: "2026-08-22T20:00:01.100Z",
    },
    attempt_claim: {
      schema_version: "contentmd.provider-execution-attempt-claim/0.1.0",
      disposition: "claimed",
      stream_id: authenticated_plan.plan.attempt_ledger_stream_id,
      event_id: "provider-attempt-claim.fixture",
      event_digest: "6".repeat(64),
      sequence: 1,
      plan_ref: planRef,
      nonce_digest: "7".repeat(64),
      claimed_at: PROVIDER_NOW,
      authority_effect: "none",
    },
    authority_effect: "none",
  };
  return parseOpenAIResponsesResult({
    receipt_id: "provider-receipt.openai.fixture",
    authenticated_plan,
    prepared,
    model_profile: provider.authorization.model_profile!,
    transport_result,
  });
}

describe("parseOpenAIResponsesResult", () => {
  it("releases only completed, allowlisted, schema-valid canonical output", async () => {
    const result = await parseFixture(responseBody());

    expect(result.execution.canonical_output).toEqual(canonicalOutput);
    expect(result.execution.response).toMatchObject({
      response_state: "completed",
      model_id: "gpt-fixture",
      provider_response_id: "resp_fixture",
      retry_count: 0,
      provider_storage_requested: false,
      authority_effect: "none",
    });
    expect(result.receipt.outcome_state).toBe("completed");
    expect(result.receipt.receipt_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("retains refusal as refusal with no canonical output", async () => {
    const result = await parseFixture(responseBody({
      output: [{
        id: "msg_fixture",
        type: "message",
        role: "assistant",
        content: [{ type: "refusal", refusal: "Cannot complete this request." }],
      }],
    }));

    expect(result.execution.canonical_output).toBeNull();
    expect(result.execution.response.response_state).toBe("refused");
    expect(result.execution.response.refusal_reason).toBe("Cannot complete this request.");
    expect(result.receipt.outcome_state).toBe("refused");
  });

  it("retains incomplete status and reason with no canonical output", async () => {
    const result = await parseFixture(responseBody({
      status: "incomplete",
      incomplete_details: { reason: "max_output_tokens" },
      output: [],
    }));

    expect(result.execution.canonical_output).toBeNull();
    expect(result.execution.response.response_state).toBe("incomplete");
    expect(result.execution.response.incomplete_reason).toBe("max_output_tokens");
  });

  it("marks malformed JSON and returned-model mismatch invalid", async () => {
    const malformed = await parseFixture("not json");
    const wrongModel = await parseFixture(responseBody({ model: "gpt-unapproved" }));

    expect(malformed.execution.response.response_state).toBe("invalid");
    expect(malformed.execution.canonical_output).toBeNull();
    expect(wrongModel.execution.response.response_state).toBe("invalid");
    expect(wrongModel.execution.canonical_output).toBeNull();
  });

  it("rejects response bytes over the request ceiling", async () => {
    await expect(parseFixture(`{"padding":"${"x".repeat(40_000)}"}`))
      .rejects.toThrow("openai_response_invalid:response_byte_limit_exceeded");
  });
});
