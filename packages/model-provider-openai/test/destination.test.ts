import { describe, expect, it } from "vitest";
import { resolveOpenAIDestination } from "../src/index.js";
import { modelRequest } from "./fixtures.js";
import { prepareOpenAIResponsesRequest } from "../src/serialize.js";

describe("resolveOpenAIDestination", () => {
  it("permits only the exact production Responses destination", () => {
    const prepared = prepareOpenAIResponsesRequest(modelRequest());

    expect(resolveOpenAIDestination({ prepared, test_mode: false })).toEqual({
      authorized_origin: "https://api.openai.com",
      effective_origin: "https://api.openai.com",
      path: "/v1/responses",
      url: "https://api.openai.com/v1/responses",
      redirect: "error",
    });
  });

  it("uses an explicit reserved test origin only in test mode", () => {
    const prepared = prepareOpenAIResponsesRequest(modelRequest());

    expect(resolveOpenAIDestination({
      prepared,
      test_mode: true,
      test_origin: "https://openai.test",
    }).url).toBe("https://openai.test/v1/responses");
    expect(() => resolveOpenAIDestination({
      prepared,
      test_mode: false,
      test_origin: "https://openai.test",
    })).toThrow("openai_destination_invalid:test_origin_in_production");
  });

  it.each([
    "http://openai.test",
    "https://user@openai.test",
    "https://127.0.0.1",
    "https://example.com",
  ])("rejects unsafe test origin %s", (test_origin) => {
    const prepared = prepareOpenAIResponsesRequest(modelRequest());
    expect(() => resolveOpenAIDestination({ prepared, test_mode: true, test_origin }))
      .toThrow("openai_destination_invalid:test_origin");
  });
});
