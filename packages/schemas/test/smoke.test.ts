import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/schemas";

describe("@contentmd/schemas package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/schemas");
  });
});
