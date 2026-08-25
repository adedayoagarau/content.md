import { describe, expect, it } from "vitest";
import { planPublicProductCorpusExpansionV2, verifyPublicProductCorpusV2 } from "@contentmd/research";
import { projectionFixture } from "./public-product-corpus-fixtures.js";

describe("normalized public-product corpus expansion v0.2", () => {
  it("plans from canonical slot gaps and remains collection-only", () => {
    const report = verifyPublicProductCorpusV2(projectionFixture(5));
    const plan = planPublicProductCorpusExpansionV2({ report, maximum_assignments: 10 });

    expect(plan.near_complete_products).toHaveLength(1);
    expect(plan.near_complete_products[0]!.covered_slot_ids).toHaveLength(5);
    expect(plan.near_complete_products[0]!.missing_slot_ids).toEqual(["destructive_permission_support"]);
    expect(plan.effect).toBe("collection_operator_only");
    expect(plan.authority_effect).toBe("none");
    expect(plan.prompt_eligibility).toBe("never");
    expect(plan.training_eligibility).toBe("never");
    expect(plan.benchmark_eligibility).toBe(false);
  });

  it("refuses failed projections and invalid assignment bounds", () => {
    const failed = verifyPublicProductCorpusV2(projectionFixture(5, true));
    expect(() => planPublicProductCorpusExpansionV2({ report: failed, maximum_assignments: 10 })).toThrow();
    const accepted = verifyPublicProductCorpusV2(projectionFixture(5));
    expect(() => planPublicProductCorpusExpansionV2({ report: accepted, maximum_assignments: 0 })).toThrow();
  });
});
