import { describe, expect, it } from "vitest";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

const digest = "0".repeat(64);

function envelope(schema_id: string, payload: unknown) {
  return {
    record_id: "uxw.fixture.001",
    schema_id,
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: {
      memory_scope: "project",
      project_id: "project.fixture",
      resource_refs: [],
      data_classes: ["public-synthetic"],
    },
    provenance: [],
    lifecycle_state: "proposed",
    payload,
  };
}

function requestPayload() {
  return {
    contract_version: "contentmd.ux-writing-request/0.1.0",
    request_type: "draft",
    surface: "checkout confirmation",
    channel: "web",
    actors: [{ actor_id: "customer", role: "payer", authority: "confirmed", affected: true }],
    goals: ["Understand whether payment completed"],
    interaction_state: {
      current: "submitted",
      previous: "reviewing",
      next_possible: ["confirmed", "failed", "unknown"],
      success: "confirmed",
      failure: "failed",
      unknown_possible: true,
    },
    message_intent: "Represent an unknown payment outcome safely",
    required_facts: ["The payment outcome is not confirmed"],
    forbidden_claims: ["Payment failed"],
    action_contracts: [{
      action_id: "pay",
      actor_id: "customer",
      object: "invoice",
      consequence: "May transfer funds",
      reversibility: "partly_reversible",
      recovery: "Check payment status",
      outcome_evidence: "unknown_possible",
    }],
    risk_level: "high",
    locale: { source: "en-US", targets: [], direction: "ltr", specialist_review_required: false },
    accessibility_requirements: ["Announce status change"],
    voice_profile_refs: [],
    tone_policy_refs: [],
    evidence_refs: ["fact.payment-state"],
    open_questions: [],
    acceptance_criteria: ["No unsafe retry"],
    authority_effect: "none",
  };
}

describe("UX-writing record schemas", () => {
  it("validates a closed UX-writing request", () => {
    expect(validateRecord(
      SCHEMA_IDS.uxWritingRequest,
      envelope(SCHEMA_IDS.uxWritingRequest, requestPayload()),
    )).toEqual({ valid: true, errors: [] });
  });

  it("rejects authority and unknown payload fields", () => {
    const payload = { ...requestPayload(), authority_effect: "publish", surprise: true };
    const result = validateRecord(
      SCHEMA_IDS.uxWritingRequest,
      envelope(SCHEMA_IDS.uxWritingRequest, payload),
    );
    expect(result.valid).toBe(false);
    expect(result.errors.join("\n")).toMatch(/authority_effect|additional properties/i);
  });

  it("requires every candidate expression to carry invariant references", () => {
    const candidate = envelope(SCHEMA_IDS.uxWritingCandidate, {
      contract_version: "contentmd.ux-writing-candidate/0.1.0",
      request_ref: "uxw.request.001",
      status: "proposed",
      semantic_invariants: [{ invariant_id: "state", statement: "Outcome is unknown", source_refs: ["fact.payment-state"], status: "preserved" }],
      expressions: [{ expression_id: "message", channel: "web", locale: "en-US", text: "We’re checking your payment.", invariant_refs: [] }],
      rationale: "Avoids asserting an unsupported outcome.",
      assumptions: [],
      alternatives_considered: [],
      unresolved_questions: [],
      evaluation_outcomes: [{ reason_code: "uxw.state.outcome_unknown", dimension: "state", outcome_class: "hard", status: "unknown", evidence_refs: ["fact.payment-state"], review_type: "deterministic" }],
      hard_plane_status: "unknown",
      recommended_disposition: "abstain",
      approval_refs: [],
      authority_effect: "none",
    });
    expect(validateRecord(SCHEMA_IDS.uxWritingCandidate, candidate).valid).toBe(false);
  });
});
