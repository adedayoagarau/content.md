import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/writer";

describe("@contentmd/writer package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/writer");
  });
});
