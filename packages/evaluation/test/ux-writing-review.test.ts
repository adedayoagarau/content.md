import { describe, expect, it } from "vitest";
import {
  assertUxWritingRepairBrief,
  reviewUxWriting,
  reviewUxWritingRepairCandidate,
  type UxWritingReviewRequest,
} from "@contentmd/evaluation";

function request(): UxWritingReviewRequest {
  return {
    contract_version: "contentmd.ux-writing-review-request/0.1.0",
    request_id: "uxw.request.payment-review",
    target: { source_artifact: "checkout.tsx", line: 42, column: 3, text: "Payment failed. Try again." },
    facts: {
      "evidence.present": true,
      "actor.authority_known": true,
      "agency.choice_required": false,
      "state.outcome_evidence": "unknown_possible",
      "recovery.retry_safe": false,
      "recovery.required": true,
      "recovery.available": true,
      "control.present": false,
      "navigation.destination_present": false,
      "system.generated_or_hybrid": false,
      "expression.invariants_preserved": true,
      "expression.invariants_mapped": true,
      "locale.specialist_review_required": false,
      "governance.authority_effect": "none",
    },
    evidence_refs: ["fact.payment-state"],
    preserve: ["A payment submission occurred", "The outcome is not confirmed"],
    must_not_claim: ["Payment failed", "Payment succeeded"],
    required_facts: ["The payment outcome may be unknown"],
    consequence: "Another attempt may duplicate payment",
    recovery: "Check payment status",
    channel: "web",
    locale: "en-US",
    acceptance_criteria: ["No unconditional retry", "Unknown state remains explicit"],
    unresolved_questions: [],
    authority_effect: "none",
  };
}

describe("UX-writing review and repair", () => {
  it("creates a deterministic invariant-preserving repair brief", () => {
    const first = reviewUxWriting({ request: request() });
    const second = reviewUxWriting({ request: request() });
    expect(first).toEqual(second);
    expect(first.report.hard_plane_status).toBe("fail");
    expect(first.repair_brief?.must_change).toContain("Represent the outcome as unknown and provide a verification path before retry.");
    expect(assertUxWritingRepairBrief(first.repair_brief!)).toEqual(first.repair_brief);
  });

  it("rejects a digest-altered repair brief", () => {
    const brief = reviewUxWriting({ request: request() }).repair_brief!;
    expect(() => assertUxWritingRepairBrief({ ...brief, recovery: "Try again" })).toThrow("ux_writing_repair_brief_invalid:integrity");
  });

  it("re-evaluates a repair candidate without allowing it to self-certify preservation", () => {
    const source = request();
    const brief = reviewUxWriting({ request: source }).repair_brief!;
    const result = reviewUxWritingRepairCandidate({
      request: source,
      repair_brief: brief,
      candidate: {
        text: "We couldn't confirm this payment. Check its status before trying again.",
        semantic_invariant_refs: brief.preserve,
      },
    });
    expect(result.report.hard_plane_status).toBe("unknown");
    expect(result.report.recommended_disposition).toBe("abstain");
    expect(result.report.findings.map((finding) => finding.rule_id)).not.toContain("uxw.expression.invariants-mapped");
  });

  it("fails a candidate that repeats a prohibited product-state claim", () => {
    const source = request();
    const brief = reviewUxWriting({ request: source }).repair_brief!;
    const result = reviewUxWritingRepairCandidate({
      request: source,
      repair_brief: brief,
      candidate: {
        text: "Payment failed. Check its status.",
        semantic_invariant_refs: brief.preserve,
      },
    });
    expect(result.report.hard_plane_status).toBe("fail");
    expect(result.report.findings.map((finding) => finding.rule_id)).toContain("uxw.expression.invariants-preserved");
  });
});
