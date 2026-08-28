import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import {
  qualifyContentOccurrence,
  evaluateContentQualification,
  type ContentFormat,
  type ContentFunction,
  type ContentOccurrenceForQualification,
  type ContentPracticeDomain,
  type ContentQualificationState,
} from "@contentmd/core";

interface ReviewedUseMissaCase extends ContentOccurrenceForQualification {
  review_id: string;
  expected_qualification: ContentQualificationState;
  expected_reason?: string;
  expected_formats?: ContentFormat[];
  expected_domains?: ContentPracticeDomain[];
  expected_functions?: ContentFunction[];
  review_rationale: string;
}

const fixtureUrl = new URL("./fixtures/usemissa-content-qualification-reviewed.json", import.meta.url);

describe("reviewed UseMissa content qualification sample", () => {
  it("matches every reviewed disposition and classification", async () => {
    const cases = JSON.parse(await readFile(fixtureUrl, "utf8")) as ReviewedUseMissaCase[];
    expect(cases.length).toBeGreaterThanOrEqual(12);

    for (const reviewed of cases) {
      const unit = qualifyContentOccurrence(reviewed);
      expect(unit.qualification, reviewed.review_id).toBe(reviewed.expected_qualification);
      if (reviewed.expected_reason !== undefined) {
        expect(unit.rejection_reason, reviewed.review_id).toBe(reviewed.expected_reason);
      }
      if (reviewed.expected_formats !== undefined) {
        expect(unit.formats, reviewed.review_id).toEqual(expect.arrayContaining(reviewed.expected_formats));
      }
      if (reviewed.expected_domains !== undefined) {
        expect(unit.practice_domains, reviewed.review_id).toEqual(expect.arrayContaining(reviewed.expected_domains));
      }
      if (reviewed.expected_functions !== undefined) {
        expect(unit.functions, reviewed.review_id).toEqual(expect.arrayContaining(reviewed.expected_functions));
      }
    }
  });

  it("reports explicit qualification precision and recall for the seed set", async () => {
    const cases = JSON.parse(await readFile(fixtureUrl, "utf8")) as ReviewedUseMissaCase[];
    const evaluation = evaluateContentQualification(cases);

    expect(evaluation).toMatchObject({
      sample_size: 12,
      exact_disposition_matches: 12,
      exact_disposition_accuracy: 1,
      qualified: {
        true_positive: 6,
        false_positive: 0,
        false_negative: 0,
        precision: 1,
        recall: 1,
      },
      mismatches: [],
    });
    expect(evaluation.by_source_layer).toHaveProperty("product");
    expect(evaluation.by_source_layer).toHaveProperty("api");
    expect(evaluation.by_source_layer).toHaveProperty("demo");
  });
});
