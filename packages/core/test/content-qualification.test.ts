import { describe, expect, it } from "vitest";
import {
  qualifyContentOccurrence,
  qualifyContentOccurrences,
  type ContentOccurrenceForQualification,
} from "@contentmd/core";

function occurrence(overrides: Partial<ContentOccurrenceForQualification> = {}): ContentOccurrenceForQualification {
  return {
    occurrence_id: "occurrence.default",
    source_artifact: "app/checkout/page.tsx",
    syntax_kind: "jsx_text",
    expression_payload: "Check your orders before trying again.",
    channel: "web",
    modality: "visible",
    component: "PaymentRecovery",
    route: null,
    semantic_context: "component:PaymentRecovery;element:p",
    ...overrides,
  };
}

describe("content occurrence qualification", () => {
  it("classifies one expression across domain, function, format, and microcopy scope", () => {
    const unit = qualifyContentOccurrence(occurrence());

    expect(unit).toMatchObject({
      qualification: "qualified",
      source_layer: "product",
      microcopy: true,
    });
    expect(unit.practice_domains).toEqual(expect.arrayContaining(["product_ux", "support", "transactional"]));
    expect(unit.functions).toEqual(expect.arrayContaining(["enable_recovery"]));
    expect(unit.formats).toEqual(expect.arrayContaining(["description"]));
    expect(unit.authority_effect).toBe("none");
  });

  it.each([
    ["·", "punctuation_or_symbol_only"],
    ["3", "numeric_only"],
  ])("rejects non-semantic fragment %s", (expression, reason) => {
    expect(qualifyContentOccurrence(occurrence({ expression_payload: expression }))).toMatchObject({
      qualification: "rejected",
      rejection_reason: reason,
      microcopy: false,
    });
  });

  it("keeps an isolated connector uncertain instead of manufacturing meaning", () => {
    expect(qualifyContentOccurrence(occurrence({ expression_payload: "of" }))).toMatchObject({
      qualification: "uncertain",
      rejection_reason: "isolated_connector_fragment",
    });
  });

  it("keeps a short standalone field label when its content role supplies meaning", () => {
    expect(qualifyContentOccurrence(occurrence({
      expression_payload: "From",
      semantic_context: "component:DateRange;element:label;property:label",
    }))).toMatchObject({
      qualification: "qualified",
      formats: ["field_label"],
    });
  });

  it.each([
    "src/Button.stories.tsx",
    "tests/checkout.test.tsx",
    "fixtures/example.tsx",
    "shadcn-studio/demo/page.tsx",
  ])("excludes non-product source layer %s", (sourceArtifact) => {
    expect(qualifyContentOccurrence(occurrence({ source_artifact: sourceArtifact }))).toMatchObject({
      qualification: "rejected",
    });
  });

  it("reports raw, qualified, uncertain, rejected, and microcopy counts separately", () => {
    const result = qualifyContentOccurrences([
      occurrence(),
      occurrence({ occurrence_id: "occurrence.connector", expression_payload: "and" }),
      occurrence({ occurrence_id: "occurrence.symbol", expression_payload: "—" }),
    ]);
    expect(result.summary).toMatchObject({
      occurrence_count: 3,
      qualified_count: 1,
      uncertain_count: 1,
      rejected_count: 1,
      microcopy_count: 1,
    });
  });
});
