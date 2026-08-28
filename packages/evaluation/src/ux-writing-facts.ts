import type { UxWritingFacts } from "./ux-writing-rule-engine.js";

export interface UxWritingFactDerivationInput {
  evidence_refs: string[];
  required_facts: string[];
  actors: Array<{ authority: "confirmed" | "limited" | "unknown" | "none" }>;
  action_contracts: Array<{
    reversibility: "reversible" | "partly_reversible" | "irreversible" | "unknown";
    recovery: string | null;
    outcome_evidence: "confirmed" | "unknown_possible" | "not_established";
  }>;
  locale: {
    direction: "ltr" | "rtl" | "mixed" | "unknown";
    specialist_review_required: boolean;
    specialist_review_complete: boolean;
  };
  candidate: {
    expressions: Array<{ text: string; invariant_refs: string[] }>;
    semantic_invariants: Array<{ invariant_id: string; status: "preserved" | "violated" | "unknown" }>;
    authority_effect: "none";
  };
  declared_facts?: UxWritingFacts;
}

const RETRY = /\b(?:try|retry|submit|pay|send)\s+again\b/iu;

export function deriveUxWritingFacts(input: UxWritingFactDerivationInput): UxWritingFacts {
  const outcomes = input.action_contracts.map((action) => action.outcome_evidence);
  const outcomeEvidence = outcomes.includes("not_established")
    ? "not_established"
    : outcomes.includes("unknown_possible") ? "unknown_possible" : "confirmed";
  const recoveryRequired = input.action_contracts.some((action) =>
    action.reversibility === "irreversible" || action.reversibility === "unknown" || action.outcome_evidence !== "confirmed"
  );
  const expressionText = input.candidate.expressions.map((expression) => expression.text).join("\n");
  const invariantIds = new Set(input.candidate.semantic_invariants.map((invariant) => invariant.invariant_id));
  const invariantsMapped = input.candidate.expressions.every((expression) =>
    expression.invariant_refs.length > 0 && expression.invariant_refs.every((ref) => invariantIds.has(ref))
  );
  const derived: UxWritingFacts = {
    "evidence.present": input.evidence_refs.length > 0 && input.required_facts.length > 0,
    "actor.authority_known": input.actors.length > 0 && input.actors.every((actor) => actor.authority === "confirmed" || actor.authority === "limited"),
    "state.outcome_evidence": outcomeEvidence,
    "recovery.retry_safe": outcomeEvidence === "confirmed" || !RETRY.test(expressionText),
    "recovery.required": recoveryRequired,
    "recovery.available": !recoveryRequired || input.action_contracts.filter((action) =>
      action.reversibility === "irreversible" || action.reversibility === "unknown" || action.outcome_evidence !== "confirmed"
    ).every((action) => action.recovery !== null),
    "expression.invariants_preserved": input.candidate.semantic_invariants.every((invariant) => invariant.status === "preserved"),
    "expression.invariants_mapped": invariantsMapped,
    "locale.specialist_review_required": input.locale.specialist_review_required || input.locale.direction === "rtl" || input.locale.direction === "mixed",
    "locale.specialist_review_complete": input.locale.specialist_review_complete,
    "governance.authority_effect": input.candidate.authority_effect,
  };
  const protectedPaths = new Set(Object.keys(derived));
  for (const key of Object.keys(input.declared_facts ?? {})) {
    if (protectedPaths.has(key)) throw new TypeError(`ux_writing_fact_override_forbidden:${key}`);
  }
  return Object.freeze({ ...(input.declared_facts ?? {}), ...derived });
}
