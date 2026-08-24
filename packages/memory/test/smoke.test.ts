import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/memory";

describe("@contentmd/memory package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/memory");
  });
});
