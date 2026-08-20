import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/core";

describe("@contentmd/core package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/core");
  });
});
