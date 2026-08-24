import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  MAX_BOUNDED_SPAN_SCALARS,
  validateRecordedComputerUseCapture,
  type RecordedComputerUseCapture,
} from "../src/index.js";

const fixturePath = fileURLToPath(new URL(
  "../../../fixtures/voice-tone-research/govuk-passport-recorded-capture.json",
  import.meta.url,
));

async function fixture(): Promise<RecordedComputerUseCapture> {
  return JSON.parse(await readFile(fixturePath, "utf8")) as RecordedComputerUseCapture;
}

describe("recorded Computer Use capture", () => {
  it("accepts the closed, body-free synthetic capture DTO", async () => {
    const input = await fixture();
    expect(validateRecordedComputerUseCapture(input)).toEqual({ valid: true, errors: [] });
    expect(input.body_retained).toBe(false);
    expect(input.capture_disposition).toEqual({
      controlled_corpus_eligibility: false,
      benchmark_eligibility: false,
      source_evidence_effect: "none",
    });
  });

  it("rejects timestamps and bounded spans outside the frozen capture contract", async () => {
    const invalidTimestamp = await fixture();
    invalidTimestamp.captured_at = "20 August 2026";
    expect(validateRecordedComputerUseCapture(invalidTimestamp)).toEqual({
      valid: false,
      errors: ["captured_at_invalid"],
    });

    const oversized = await fixture();
    oversized.observations[0]!.bounded_span = "x".repeat(MAX_BOUNDED_SPAN_SCALARS + 1);
    expect(validateRecordedComputerUseCapture(oversized)).toEqual({
      valid: false,
      errors: ["bounded_span_too_large:0"],
    });
  });
});
