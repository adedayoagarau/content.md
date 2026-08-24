import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/adapter-sdk";

describe("@contentmd/adapter-sdk package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/adapter-sdk");
  });
});
