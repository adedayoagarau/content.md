import { describe, expect, it } from "vitest";
import { reviewContent } from "@contentmd/evaluation";

describe("review refusal boundaries", () => {
  it("reports unknown product behavior instead of guessing a recovery rewrite", () => {
    const report = reviewContent({
      project_id: "project.unknown",
      evidence_refs: ["occurrence.payment"],
      product_facts: {
        payment_outcome_after_submission: "not_established",
        workspace_delete_effect: "not_established",
      },
      occurrences: [
        {
          occurrence_id: "occurrence.payment",
          source_artifact: "src/status.tsx",
          line: 1,
          column: 1,
          syntax_kind: "jsx_text",
          expression_payload: "Payment failed. Try again.",
          locale: "en-US",
          channel: "web",
          modality: "visible",
          component: "PaymentStatus",
          route: null,
          semantic_context: "component:PaymentStatus;element:p",
        },
      ],
    });
    const ruleIds = report.findings.map((finding) => finding.rule_id);
    const unknown = report.findings.find((finding) => finding.rule_id === "content.product-behavior-unknown");

    expect(ruleIds).toContain("content.product-behavior-unknown");
    expect(ruleIds).not.toContain("content.state-mismatch");
    expect(ruleIds).not.toContain("content.unsafe-retry");
    expect(unknown).toEqual(
      expect.objectContaining({
        automatic_rewrite_allowed: false,
        suggested_next_action: "Establish the post-submission payment-state contract before proposing recovery copy.",
      }),
    );
  });
});
