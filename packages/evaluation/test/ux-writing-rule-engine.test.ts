import { describe, expect, it } from "vitest";
import {
  CORE_UX_WRITING_RULE_PACKS,
  evaluateUxWritingRules,
  resolveUxWritingRulePacks,
  type UxWritingRulePack,
} from "@contentmd/evaluation";

function passingFacts() {
  return {
    "evidence.present": true,
    "actor.authority_known": true,
    "agency.choice_required": false,
    "state.outcome_evidence": "confirmed",
    "recovery.required": false,
    "control.present": false,
    "navigation.destination_present": false,
    "system.generated_or_hybrid": false,
    "expression.invariants_preserved": true,
    "expression.invariants_mapped": true,
    "locale.specialist_review_required": false,
    "governance.authority_effect": "none",
  } as const;
}

describe("declarative UX-writing rule engine", () => {
  it("returns a replay-stable digest for canonical-equivalent input", () => {
    const first = evaluateUxWritingRules({ facts: passingFacts(), evidence_refs: ["fact.actor", "fact.product"], core_packs: CORE_UX_WRITING_RULE_PACKS });
    const second = evaluateUxWritingRules({ facts: passingFacts(), evidence_refs: ["fact.product", "fact.actor", "fact.actor"], core_packs: [...CORE_UX_WRITING_RULE_PACKS].reverse() });
    expect(first).toEqual(second);
    expect(first.hard_plane_status).toBe("pass");
  });

  it("fails an unsafe retry and suppresses advisory evaluation", () => {
    const result = evaluateUxWritingRules({
      facts: {
        ...passingFacts(),
        "state.outcome_evidence": "unknown_possible",
        "recovery.retry_safe": false,
      },
      evidence_refs: ["fact.payment-state"],
      core_packs: CORE_UX_WRITING_RULE_PACKS,
    });
    expect(result.hard_plane_status).toBe("fail");
    expect(result.advisory_status).toBe("not_evaluated");
    expect(result.findings.map((item) => item.rule_id)).toContain("uxw.recovery.safe-retry");
  });

  it("returns unknown rather than inventing a missing required fact", () => {
    const facts = { ...passingFacts() } as Record<string, string | boolean>;
    delete facts["actor.authority_known"];
    const result = evaluateUxWritingRules({ facts, evidence_refs: [], core_packs: CORE_UX_WRITING_RULE_PACKS });
    expect(result.hard_plane_status).toBe("unknown");
    expect(result.recommended_disposition).toBe("abstain");
  });

  it("allows an approved project pack to suppress only suppressible advisory rules", () => {
    const overlay: UxWritingRulePack = {
      contract_version: "contentmd.ux-writing-rule-pack/0.1.0",
      pack_id: "uxw-pack.project.fixture",
      pack_version: 1,
      layer: "project",
      status: "approved",
      scope: { surfaces: [], channels: [], locales: [], risk_levels: [] },
      rules: [{
        rule_id: "uxw.project.term-approved",
        rule_version: "0.1.0",
        title: "Use approved term",
        classification: "advisory",
        dimension: "terminology",
        review_type: "deterministic",
        applies_when: [],
        assertion: { fact_path: "project.term_approved", operator: "equals", value: true },
        failure_status: "fail",
        reason: "Term is not approved.",
        consequence: "People may see inconsistent concepts.",
        repair: "Use the governed project term.",
        required_fact_paths: ["project.term_approved"],
        source_refs: ["project.term-policy"],
        fixture_refs: ["project.fixture.term"],
        override_policy: "project_may_suppress_advisory",
      }],
      suppressed_rule_ids: ["uxw.navigation.destination-consistent"],
      supersedes_pack_ref: null,
      approval_refs: ["approval.project.uxw"],
      authority_effect: "none",
    };
    expect(resolveUxWritingRulePacks(CORE_UX_WRITING_RULE_PACKS, [overlay])).toHaveLength(10);
  });

  it("rejects attempts to collide with or suppress a core hard rule", () => {
    const overlay: UxWritingRulePack = {
      ...CORE_UX_WRITING_RULE_PACKS[0]!,
      pack_id: "uxw-pack.project.invalid",
      layer: "project",
      approval_refs: ["approval.project.uxw"],
      suppressed_rule_ids: ["uxw.evidence.required"],
    };
    expect(() => resolveUxWritingRulePacks(CORE_UX_WRITING_RULE_PACKS, [overlay])).toThrow(/project_rule_collision|suppression_forbidden/);
  });
});
