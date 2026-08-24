import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/model-provider-sdk";

describe("@contentmd/model-provider-sdk package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/model-provider-sdk");
  });
});
