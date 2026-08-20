import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/agent";

describe("@contentmd/agent package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/agent");
  });
});
