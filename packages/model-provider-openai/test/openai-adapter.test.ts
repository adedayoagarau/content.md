import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { SqliteEventStore } from "@contentmd/memory";
import { issueProviderExecutionPlan } from "@contentmd/governance";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  OpenAIResponsesAdapter,
  type OpenAISecretLease,
} from "../src/index.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("OpenAIResponsesAdapter", () => {
  it("publishes a remote, strict, authorization-required descriptor", () => {
    const adapter = new OpenAIResponsesAdapter();
    expect(adapter.descriptor).toEqual({
      provider_id: "provider.openai",
      provider_version: "0.1.0",
      adapter_id: "adapter.openai.responses",
      adapter_version: "0.1.0",
      execution_mode: "remote",
      deterministic_status: "not_deterministic",
      network_required: true,
      remote_authorization_required: true,
      supported_request_versions: ["contentmd.model-request/0.2.0"],
      strict_schema_output: true,
    });
  });

  it("executes one authenticated request end to end and returns receipt separately", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-openai-adapter-"));
    temporaryDirectories.push(directory);
    const store = new SqliteEventStore(join(directory, "attempts.sqlite"), {
      permitted_data_classes: ["provider_attempt"],
    });
    const adapter = new OpenAIResponsesAdapter();
    const provider = providerFixture();
    const prepared = await adapter.prepare(provider.authorization.request);
    const authenticated_plan = await issueProviderExecutionPlan({
      now: PROVIDER_NOW,
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.openai.adapter.fixture",
      method: "POST",
      authorization: provider.authorization,
      prepared_request: prepared,
    }, providerPlanSigner());
    const lease: OpenAISecretLease = {
      secret_ref_id: "secret-ref.openai.fixture",
      environment: "test",
      async withSecret<T>(use: (value: string) => Promise<T>): Promise<T> {
        return use("sk-fixture-not-real");
      },
    };
    const providerOutput = {
      authority_effect: "none",
      intent: "advise",
      risk_level: "high",
      risk_signals: [],
      review_requirements: [],
      uncertainty: [],
    };

    const result = await adapter.executeAuthorized({
      receipt_id: "provider-receipt.adapter.fixture",
      authenticated_plan,
      signer: providerPlanSigner(),
      authorization: provider.authorization,
      prepared,
      model_profile: provider.authorization.model_profile!,
      store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => PROVIDER_NOW },
      test_mode: true,
      test_origin: "https://openai.test",
      secret_resolver: { async resolve() { return lease; } },
      transport: {
        async send() {
          return {
            status: 200,
            headers: { "content-type": "application/json" },
            body_bytes: Buffer.from(JSON.stringify({
              id: "resp_adapter_fixture",
              created_at: 1787428801,
              status: "completed",
              model: "gpt-fixture",
              output: [{
                type: "message",
                role: "assistant",
                content: [{ type: "output_text", text: JSON.stringify(providerOutput) }],
              }],
              service_tier: "default",
              store: false,
              usage: {
                input_tokens: 100,
                output_tokens: 20,
                total_tokens: 120,
                input_tokens_details: { cached_tokens: 0 },
              },
            }), "utf8"),
            received_at: "2026-08-22T20:00:00.100Z",
          };
        },
      },
    });

    expect(result.execution.canonical_output).toEqual(providerOutput);
    expect(result.provider_receipt.outcome_state).toBe("completed");
    expect(result.attempt_claim.disposition).toBe("claimed");
    expect(JSON.stringify(result)).not.toContain("sk-fixture-not-real");
    store.close();
  });
});
