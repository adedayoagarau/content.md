import { describe, expect, it } from "vitest";
import {
  createContentQualificationReviewPacket,
  evaluateCompletedContentQualificationReview,
  qualifyContentOccurrences,
  type ContentOccurrenceForQualification,
} from "@contentmd/core";

function occurrence(
  occurrenceId: string,
  expression: string,
  sourceArtifact = "app/checkout/page.tsx",
): ContentOccurrenceForQualification {
  return {
    occurrence_id: occurrenceId,
    source_artifact: sourceArtifact,
    syntax_kind: "jsx_text",
    expression_payload: expression,
    channel: "web",
    modality: "visible",
    component: "Checkout",
    route: "/checkout",
    semantic_context: "component:Checkout;element:p",
    line: 1,
    column: 1,
  };
}

function reviewed<T extends ReturnType<typeof createContentQualificationReviewPacket>>(packet: T): T {
  return {
    ...packet,
    items: packet.items.map((item, index) => ({
      ...item,
      reviewer_qualification: item.proposed_qualification,
      reviewer_role: index % 2 === 0 ? "qualified_content_designer" : "taxonomy_steward",
      reviewer_notes: "Independently checked against the source-bound expression and context.",
    })),
  };
}

describe("content qualification review", () => {
  const units = qualifyContentOccurrences([
    occurrence("occurrence.error", "Payment failed. Try again."),
    occurrence("occurrence.action", "Continue"),
    occurrence("occurrence.connector", "of"),
    occurrence("occurrence.punctuation", "·"),
    occurrence("occurrence.api", "Idempotency-Key is required.", "src/api/payments.ts"),
    occurrence("occurrence.fixture", "Example confirmation", "fixtures/example.tsx"),
  ]).units;

  it("creates a deterministic, bounded, reviewer-blank stratified packet", () => {
    const first = createContentQualificationReviewPacket(units, 5);
    const second = createContentQualificationReviewPacket([...units].reverse(), 5);

    expect(first).toEqual(second);
    expect(first).toMatchObject({
      requested_sample_size: 5,
      sample_size: 5,
      review_status: "awaiting_independent_review",
      authority_effect: "none",
    });
    expect(first.strata_count).toBeGreaterThan(1);
    expect(first.items.every((item) =>
      item.reviewer_qualification === null
      && item.reviewer_role === null
      && item.reviewer_notes === null
      && item.authority_effect === "none")).toBe(true);
  });

  it("requires a complete independent review and reports measured agreement", () => {
    const packet = createContentQualificationReviewPacket(units, units.length);
    expect(() => evaluateCompletedContentQualificationReview(packet, units))
      .toThrow("qualification_review_incomplete");

    const result = evaluateCompletedContentQualificationReview(reviewed(packet), units);
    expect(result).toMatchObject({
      completed_item_count: units.length,
      reviewer_roles: ["qualified_content_designer", "taxonomy_steward"],
      review_status: "independently_reviewed",
      authority_effect: "none",
      evaluation: {
        sample_size: units.length,
        exact_disposition_accuracy: 1,
        qualified: { precision: 1, recall: 1 },
        mismatches: [],
      },
    });
  });

  it("rejects changes to the sampled source identity", () => {
    const packet = reviewed(createContentQualificationReviewPacket(units, 3));
    const changedUnits = units.map((unit, index) => index === 0 ? { ...unit, expression: "Changed after review" } : unit);
    expect(() => evaluateCompletedContentQualificationReview(packet, changedUnits))
      .toThrow("qualification_review_source_changed");
  });
});
