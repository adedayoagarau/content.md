import { describe, expect, it } from "vitest";
import { RUNTIME_LOCAL_PACKAGE_ID } from "@contentmd/runtime-local";

describe("local portable runtime", () => {
  it("publishes the adopter-controlled reference package identity", () => {
    expect(RUNTIME_LOCAL_PACKAGE_ID).toBe("@contentmd/runtime-local");
  });
});
