import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/evaluation";

describe("@contentmd/evaluation package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/evaluation");
  });
});
