import { describe, expect, it } from "vitest";
import {
  compareContentImprovement,
  createContentImprovementBrief,
  qualifyContentOccurrence,
  rankContentReviewFindings,
} from "@contentmd/core";

function unit(input: {
  id: string;
  expression: string;
  context: string;
  source?: string;
}) {
  return qualifyContentOccurrence({
    occurrence_id: input.id,
    source_artifact: input.source ?? "app/checkout/page.tsx",
    syntax_kind: "jsx_text",
    expression_payload: input.expression,
    channel: "web",
    modality: "visible",
    component: "Checkout",
    route: "/checkout",
    semantic_context: input.context,
  });
}

describe("regular-user content finding ranking", () => {
  it("prioritizes errors without recovery and retains evidence references", () => {
    const findings = rankContentReviewFindings([
      unit({ id: "occurrence.error", expression: "Payment failed.", context: "component:Checkout;property:error" }),
      unit({ id: "occurrence.action", expression: "Continue", context: "component:Checkout;element:button" }),
      unit({ id: "occurrence.fragment", expression: "of", context: "component:Checkout;element:p" }),
    ]);

    expect(findings.map((item) => item.rule_id)).toEqual([
      "content.error_missing_recovery",
      "content.ambiguous_action",
      "content.candidate_needs_context",
    ]);
    expect(findings[0]).toMatchObject({
      severity: "high",
      occurrence_ref: "occurrence.error",
      source_artifact: "app/checkout/page.tsx",
      authority_effect: "none",
    });
  });

  it("does not flag an error composition that includes recovery", () => {
    const findings = rankContentReviewFindings([
      unit({
        id: "occurrence.recoverable",
        expression: "Payment failed. Check your orders before trying again.",
        context: "component:Checkout;property:error",
      }),
    ]);
    expect(findings).toEqual([]);
  });

  it("is deterministic, bounded, and rejects an invalid limit", () => {
    const units = Array.from({ length: 12 }, (_, index) => unit({
      id: `occurrence.${String(index).padStart(2, "0")}`,
      expression: "Continue",
      context: "component:Checkout;element:button",
      source: `app/${String(index).padStart(2, "0")}/page.tsx`,
    }));
    expect(rankContentReviewFindings(units)).toHaveLength(10);
    expect(rankContentReviewFindings(units, 3)).toEqual(rankContentReviewFindings(structuredClone(units), 3));
    expect(() => rankContentReviewFindings(units, -1)).toThrow("content_finding_limit_invalid");
  });

  it("creates an evidence-bound, non-mutating brief without inventing replacement copy", () => {
    const contentUnit = unit({
      id: "occurrence.error",
      expression: "Payment failed.",
      context: "component:Checkout;property:error",
    });
    const finding = rankContentReviewFindings([contentUnit])[0]!;
    const brief = createContentImprovementBrief(finding, contentUnit);

    expect(brief).toMatchObject({
      finding_ref: finding.finding_id,
      qualification_ref: contentUnit.qualification_id,
      current_expression: "Payment failed.",
      proposal_status: "context_required",
      mutation_effect: "none",
      authority_effect: "none",
    });
    expect(brief.required_facts).toContain("whether retry is safe");
    expect(brief).not.toHaveProperty("proposed_expression");
  });

  it("compares a candidate only after every required user-supplied fact is present", () => {
    const contentUnit = unit({ id: "occurrence.error", expression: "Payment failed.", context: "property:error" });
    const finding = rankContentReviewFindings([contentUnit])[0]!;
    const brief = createContentImprovementBrief(finding, contentUnit);
    const facts = Object.fromEntries(brief.required_facts.map((fact) => [fact, `Established: ${fact}`]));
    const comparison = compareContentImprovement(brief, finding, {
      finding_ref: finding.finding_id,
      facts,
      provenance: "user_supplied",
      authority_effect: "none",
    }, "Payment failed. Check your orders before trying again.");

    expect(comparison).toMatchObject({
      status: "ready_for_patch_preview",
      missing_facts: [],
      mutation_effect: "none",
    });
    expect(comparison.checks.every((check) => check.passed)).toBe(true);
  });
});
