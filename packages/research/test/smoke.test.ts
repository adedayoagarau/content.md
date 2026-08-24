import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/research";

describe("@contentmd/research package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/research");
  });
});
