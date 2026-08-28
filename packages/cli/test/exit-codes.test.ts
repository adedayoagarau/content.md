import { describe, expect, it } from "vitest";
import { EXIT_CODES, exitCodeForStatus } from "@contentmd/cli";

describe("CLI exit codes", () => {
  it("freezes the public status mapping", () => {
    expect(EXIT_CODES).toEqual({
      completed: 0,
      findings_present: 10,
      blocked_by_evidence: 20,
      denied_by_governance: 21,
      invalid_input: 22,
      unsupported_capability: 23,
      cancelled: 130,
      internal_failure: 30,
    });
    for (const [status, code] of Object.entries(EXIT_CODES)) {
      expect(exitCodeForStatus(status as keyof typeof EXIT_CODES)).toBe(code);
    }
  });
});
