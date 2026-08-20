import { describe, expect, it } from "vitest";
import { PACKAGE_ID } from "@contentmd/adapter-filesystem";

describe("@contentmd/adapter-filesystem package", () => {
  it("exposes its stable package identity", () => {
    expect(PACKAGE_ID).toBe("@contentmd/adapter-filesystem");
  });
});
