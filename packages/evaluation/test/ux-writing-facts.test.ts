import { describe, expect, it } from "vitest";
import { deriveUxWritingFacts } from "@contentmd/evaluation";

describe("UX-writing fact derivation", () => {
  const input = () => ({
    evidence_refs: ["fact.payment"],
    required_facts: ["Payment outcome may be unknown"],
    actors: [{ authority: "confirmed" as const }],
    action_contracts: [{ reversibility: "partly_reversible" as const, recovery: "Check status", outcome_evidence: "unknown_possible" as const }],
    locale: { direction: "ltr" as const, specialist_review_required: false, specialist_review_complete: false },
    candidate: {
      expressions: [{ text: "Payment failed. Try again.", invariant_refs: ["state"] }],
      semantic_invariants: [{ invariant_id: "state", status: "preserved" as const }],
      authority_effect: "none" as const,
    },
  });

  it("derives unsafe retry and recovery facts from typed contracts", () => {
    expect(deriveUxWritingFacts(input())).toMatchObject({
      "evidence.present": true,
      "actor.authority_known": true,
      "state.outcome_evidence": "unknown_possible",
      "recovery.retry_safe": false,
      "recovery.required": true,
      "recovery.available": true,
      "expression.invariants_preserved": true,
      "expression.invariants_mapped": true,
      "governance.authority_effect": "none",
    });
  });

  it("does not let declared facts override protected derivations", () => {
    expect(() => deriveUxWritingFacts({ ...input(), declared_facts: { "recovery.retry_safe": true } })).toThrow("ux_writing_fact_override_forbidden:recovery.retry_safe");
  });
});
