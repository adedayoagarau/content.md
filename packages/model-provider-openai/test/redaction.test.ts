import { describe, expect, it } from "vitest";
import {
  redactOpenAIError,
  redactOpenAIValue,
} from "../src/index.js";

describe("OpenAI diagnostic redaction", () => {
  it("removes resolved credentials and authorization-like fields", () => {
    const secret = "sk-test-fixture-secret-value";
    const redacted = redactOpenAIValue({
      authorization: `Bearer ${secret}`,
      headers: { "x-api-key": secret, "content-type": "application/json" },
      nested: { secret_value: secret, secret_ref_id: "secret-ref.openai.fixture" },
      message: `request failed with ${secret}`,
    }, [secret]);

    expect(redacted).toEqual({
      authorization: "[REDACTED]",
      headers: { "content-type": "application/json", "x-api-key": "[REDACTED]" },
      message: "request failed with [REDACTED]",
      nested: { secret_ref_id: "secret-ref.openai.fixture", secret_value: "[REDACTED]" },
    });
    expect(JSON.stringify(redacted)).not.toContain(secret);
  });

  it("returns a bounded error diagnostic without stack or cyclic values", () => {
    const error = Object.assign(new Error("Bearer sk-live-should-never-appear"), {
      code: "transport_failed",
      request: {} as Record<string, unknown>,
    });
    error.request.self = error.request;

    expect(redactOpenAIError(error)).toEqual({
      name: "Error",
      message: "Bearer [REDACTED]",
      code: "transport_failed",
    });
    expect(redactOpenAIError(error)).not.toHaveProperty("stack");
  });
});
