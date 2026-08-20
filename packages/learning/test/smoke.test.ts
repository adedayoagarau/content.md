import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/learning";

describe("@contentmd/learning package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/learning");
  });
});
