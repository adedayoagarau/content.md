import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/governance";

describe("@contentmd/governance package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/governance");
  });
});
