import { describe, expect, it } from "vitest";
import { evaluateUxWritingCandidate, type UxWritingEvaluationRequest } from "@contentmd/evaluation";

function request(overrides: Partial<UxWritingEvaluationRequest> = {}): UxWritingEvaluationRequest {
  return {
    request_id: "uxw.request.payment",
    risk_level: "high",
    evidence_refs: ["fact.payment-state"],
    required_facts: ["Outcome may be unknown"],
    open_questions: [],
    locale: { targets: [], direction: "ltr", specialist_review_required: false },
    action_contracts: [{
      action_id: "pay",
      reversibility: "partly_reversible",
      recovery: "Check payment status",
      outcome_evidence: "unknown_possible",
    }],
    ...overrides,
  };
}

function candidate(text = "We’re checking your payment status.") {
  return {
    candidate_id: "uxw.candidate.payment",
    semantic_invariants: [{ invariant_id: "state", status: "preserved" as const }],
    expressions: [{ expression_id: "status", text, invariant_refs: ["state"] }],
    unresolved_questions: [],
  };
}

describe("hard-first UX-writing evaluation", () => {
  it("blocks unsafe retry while an action outcome is unknown", () => {
    const result = evaluateUxWritingCandidate(request(), candidate("Payment failed. Try again."));
    expect(result.hard_plane_status).toBe("fail");
    expect(result.voice_tone_status).toBe("not_evaluated");
    expect(result.findings.map((item) => item.reason_code)).toContain("uxw.recovery.unsafe_retry");
  });

  it("abstains instead of inventing certainty when outcome evidence is incomplete", () => {
    const result = evaluateUxWritingCandidate(request(), candidate());
    expect(result.hard_plane_status).toBe("unknown");
    expect(result.recommended_disposition).toBe("abstain");
    expect(result.voice_tone_status).toBe("not_evaluated");
  });

  it("requires specialist review for RTL localization", () => {
    const result = evaluateUxWritingCandidate(request({
      risk_level: "low",
      locale: { targets: ["ar"], direction: "rtl", specialist_review_required: true },
      action_contracts: [],
    }), candidate());
    expect(result.hard_plane_status).toBe("unknown");
    expect(result.recommended_disposition).toBe("escalate");
    expect(result.findings.map((item) => item.reason_code)).toContain("uxw.specialist.locale_required");
  });

  it("permits voice and tone evaluation only after the hard plane passes", () => {
    const result = evaluateUxWritingCandidate(request({
      risk_level: "low",
      action_contracts: [],
    }), candidate());
    expect(result.hard_plane_status).toBe("pass");
    expect(result.voice_tone_status).toBe("eligible");
    expect(result.recommended_disposition).toBe("bounded_approval");
  });
});
