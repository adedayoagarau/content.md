import { describe, expect, it } from "vitest";
import { createProviderReceipt } from "@contentmd/governance";

const planRef = {
  record_id: "provider-execution-plan.fixture",
  schema_id: "contentmd.provider-execution-plan/0.1.0",
  schema_version: "0.1.0",
  content_digest: "1".repeat(64),
};

const claimRef = {
  record_id: "provider-attempt-claim.fixture",
  schema_id: "contentmd.provider-execution-attempt-claim/0.1.0",
  schema_version: "0.1.0",
  content_digest: "2".repeat(64),
};

describe("ProviderReceipt", () => {
  it("creates an immutable minimized completed-outcome receipt", () => {
    const receipt = createProviderReceipt({
      receipt_id: "provider-receipt.fixture",
      plan_ref: planRef,
      attempt_claim_ref: claimRef,
      request_id: "model_request.fixture",
      provider_id: "provider.openai",
      requested_model_id: "gpt-fixture",
      returned_model_id: "gpt-fixture",
      provider_response_id: "response.fixture",
      provider_created_at: "2026-08-22T20:00:01.000Z",
      outcome_state: "completed",
      http_status: 200,
      response_body_digest: "3".repeat(64),
      response_body_byte_count: 128,
      provider_output_digest: "4".repeat(64),
      model_response_digest: "5".repeat(64),
      token_accounting: {
        input_tokens: 100,
        output_tokens: 20,
        total_tokens: 120,
        cached_input_tokens: 0,
      },
      sent_at: "2026-08-22T20:00:00.500Z",
      completed_at: "2026-08-22T20:00:01.100Z",
      outcome_audit_stream_id: "provider-outcome.fixture",
      retention_disposition: "transient_only",
      authority_effect: "none",
    });

    expect(receipt.receipt_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(receipt.authority_effect).toBe("none");
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.token_accounting)).toBe(true);
    expect(JSON.stringify(receipt)).not.toContain("secret");
    expect(JSON.stringify(receipt)).not.toContain("output_text");
  });

  it("records unknown post-send outcomes without inventing a response", () => {
    const receipt = createProviderReceipt({
      receipt_id: "provider-receipt.unknown.fixture",
      plan_ref: planRef,
      attempt_claim_ref: claimRef,
      request_id: "model_request.fixture",
      provider_id: "provider.openai",
      requested_model_id: "gpt-fixture",
      returned_model_id: null,
      provider_response_id: null,
      provider_created_at: null,
      outcome_state: "provider_outcome_unknown",
      http_status: null,
      response_body_digest: null,
      response_body_byte_count: null,
      provider_output_digest: null,
      model_response_digest: null,
      token_accounting: null,
      sent_at: "2026-08-22T20:00:00.500Z",
      completed_at: null,
      outcome_audit_stream_id: "provider-outcome.fixture",
      retention_disposition: "transient_only",
      authority_effect: "none",
    });

    expect(receipt.outcome_state).toBe("provider_outcome_unknown");
    expect(receipt.returned_model_id).toBeNull();
  });

  it("rejects completed receipts that lack observed response evidence", () => {
    expect(() => createProviderReceipt({
      receipt_id: "provider-receipt.invalid.fixture",
      plan_ref: planRef,
      attempt_claim_ref: claimRef,
      request_id: "model_request.fixture",
      provider_id: "provider.openai",
      requested_model_id: "gpt-fixture",
      returned_model_id: null,
      provider_response_id: null,
      provider_created_at: null,
      outcome_state: "completed",
      http_status: null,
      response_body_digest: null,
      response_body_byte_count: null,
      provider_output_digest: null,
      model_response_digest: null,
      token_accounting: null,
      sent_at: "2026-08-22T20:00:00.500Z",
      completed_at: null,
      outcome_audit_stream_id: "provider-outcome.fixture",
      retention_disposition: "transient_only",
      authority_effect: "none",
    })).toThrow("invalid_provider_record:completed_receipt");
  });
});
