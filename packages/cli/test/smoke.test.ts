import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/cli";

describe("@contentmd/cli package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/cli");
  });
});
