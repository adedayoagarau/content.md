import { describe, expect, it } from "vitest";
import {
  RUNTIME_SDK_PACKAGE_ID,
  RUNTIME_SDK_VERSION,
} from "@contentmd/runtime-sdk";

describe("portable runtime SDK", () => {
  it("has a stable provider-neutral package identity", () => {
    expect(RUNTIME_SDK_PACKAGE_ID).toBe("@contentmd/runtime-sdk");
    expect(RUNTIME_SDK_VERSION).toBe("0.1.0");
  });
});
