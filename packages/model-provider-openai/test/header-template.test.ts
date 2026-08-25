import { describe, expect, it } from "vitest";
import {
  createRequestHeaderTemplate,
  createSecretRef,
} from "@contentmd/governance";
import {
  withResolvedOpenAIHeaders,
  type OpenAISecretLease,
} from "../src/index.js";

function records() {
  const secret_ref = createSecretRef({
    secret_ref_id: "secret-ref.openai.fixture",
    provider_id: "provider.openai",
    credential_class: "api_key",
    account_id: "account.fixture",
    project_id: "project.fixture",
    origin: "https://api.openai.com",
    endpoint_class: "responses",
    authorization_header_name: "authorization",
    connection_id: "connection.openai.fixture",
    resolver_namespace: "runtime-secret",
    status: "current",
    revocation_ref: "revocation.openai.fixture",
  });
  const template = createRequestHeaderTemplate({
    template_id: "header-template.openai.fixture",
    provider_id: "provider.openai",
    adapter_id: "adapter.openai.responses",
    adapter_version: "0.1.0",
    application_headers: [
      { name: "authorization", value: { kind: "secret_ref", secret_ref_id: secret_ref.secret_ref_id } },
      { name: "content-type", value: { kind: "literal", value: "application/json" } },
      { name: "x-contentmd-adapter", value: { kind: "literal", value: "openai-responses/0.1.0" } },
    ],
    derived_transport_headers: ["content-length", "host"],
    status: "current",
  });
  return { secret_ref, template };
}

function lease(environment: "test" | "production"): OpenAISecretLease {
  return {
    secret_ref_id: "secret-ref.openai.fixture",
    environment,
    async withSecret<T>(use: (value: string) => Promise<T>): Promise<T> {
      return use("sk-fixture-not-real");
    },
  };
}

describe("withResolvedOpenAIHeaders", () => {
  it("substitutes only the typed secret placeholder inside an ephemeral callback", async () => {
    const state = records();
    const result = await withResolvedOpenAIHeaders({
      template: state.template,
      secret_ref: state.secret_ref,
      test_mode: true,
      resolver: { async resolve() { return lease("test"); } },
    }, async (headers) => {
      expect(headers).toEqual({
        authorization: "Bearer sk-fixture-not-real",
        "content-type": "application/json",
        "x-contentmd-adapter": "openai-responses/0.1.0",
      });
      return { names: Object.keys(headers) };
    });

    expect(result.names).toEqual(["authorization", "content-type", "x-contentmd-adapter"]);
    expect(JSON.stringify(result)).not.toContain("sk-fixture-not-real");
  });

  it("rejects production secret leases in test mode before the callback", async () => {
    const state = records();
    let callbackCalls = 0;

    await expect(withResolvedOpenAIHeaders({
      template: state.template,
      secret_ref: state.secret_ref,
      test_mode: true,
      resolver: { async resolve() { return lease("production"); } },
    }, async () => {
      callbackCalls += 1;
      return null;
    })).rejects.toThrow("openai_secret_invalid:production_secret_in_test");
    expect(callbackCalls).toBe(0);
  });
});
