import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { AppendOnlyProviderAudit } from "@contentmd/agent";
import { issueProviderExecutionPlan } from "../../governance/src/index.js";
import { SqliteEventStore } from "../../memory/src/index.js";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  createGovernedOpenAIAdapter,
  createGovernedOpenAIModelExecutionPort,
} from "../src/openai-composition.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("governed OpenAI composition", () => {
  it("executes exact authenticated bytes through the captured test transport", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-openai-composition-"));
    temporaryDirectories.push(directory);
    const store = new SqliteEventStore(join(directory, "attempts.sqlite"), {
      permitted_data_classes: ["provider_attempt"],
    });
    const provider = providerFixture();
    const signer = providerPlanSigner();
    const sent: Array<{ url: string; authorization: string; body: string }> = [];
    const providerOutput = {
      authority_effect: "none",
      intent: "advise",
      risk_level: "high",
      risk_signals: [],
      review_requirements: [],
      uncertainty: [],
    };
    const adapter = createGovernedOpenAIAdapter({
      environment: "test",
      test_origin: "https://captured-openai.test",
      secret_resolver: {
        async resolve(ref) {
          return {
            secret_ref_id: ref.secret_ref_id,
            environment: "test",
            async withSecret<T>(use: (secret: string) => Promise<T>): Promise<T> {
              return use("sk-captured-fixture-not-real");
            },
          };
        },
      },
      transport: {
        async send(request) {
          sent.push({
            url: request.url,
            authorization: request.headers.authorization ?? "",
            body: Buffer.from(request.body_bytes).toString("utf8"),
          });
          return {
            status: 200,
            headers: { "content-type": "application/json" },
            body_bytes: Buffer.from(JSON.stringify({
              id: "resp_composition_fixture",
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
    const prepared = await adapter.prepare(provider.authorization.request);
    const authenticatedPlan = await issueProviderExecutionPlan({
      now: PROVIDER_NOW,
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.openai.composition.fixture",
      method: "POST",
      authorization: provider.authorization,
      prepared_request: prepared,
    }, signer);

    const result = await adapter.executeAuthorized({
      authenticated_plan: authenticatedPlan,
      signer,
      authorization: provider.authorization,
      prepared,
      store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => PROVIDER_NOW },
    });

    expect(result.execution.canonical_output).toEqual(providerOutput);
    expect(result.provider_receipt).toMatchObject({
      outcome_state: "completed",
      requested_model_id: "gpt-fixture",
      returned_model_id: "gpt-fixture",
      authority_effect: "none",
    });
    expect(result.attempt_claim.disposition).toBe("claimed");
    expect(sent).toHaveLength(1);
    expect(sent[0]?.url).toBe("https://captured-openai.test/v1/responses");
    expect(sent[0]?.authorization).toBe("Bearer sk-captured-fixture-not-real");
    expect(sent[0]?.body).toBe(Buffer.from(prepared.body_bytes).toString("utf8"));
    expect(JSON.stringify(result)).not.toContain("sk-captured-fixture-not-real");
    store.close();
  });

  it("releases a response only through the full executor and append-only audit", async () => {
    const directory = await mkdtemp(join(tmpdir(), "contentmd-openai-port-"));
    temporaryDirectories.push(directory);
    const store = new SqliteEventStore(join(directory, "provider-events.sqlite"), {
      permitted_data_classes: ["provider_attempt", "provider_audit"],
    });
    const provider = providerFixture();
    const {
      now: _providerNow,
      request: _providerRequest,
      authorization,
      ...records
    } = provider.authorization;
    const { now: _authorizationNow, ...authorizationTemplate } = authorization;
    let sends = 0;
    const canonicalOutput = {
      authority_effect: "none",
      intent: "advise",
      risk_level: "high",
      risk_signals: [],
      review_requirements: [],
      uncertainty: [],
    };
    const port = createGovernedOpenAIModelExecutionPort({
      project_root: directory,
      model_profile_ref: "model-profile.openai.fixture",
      connection_ref: "connection.openai.fixture",
      grant_ref: "grant.provider.fixture",
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      clock: { now: () => PROVIDER_NOW },
      signer: providerPlanSigner(),
      store,
      configuration: {
        async resolve() {
          return { ...records, authorization: authorizationTemplate };
        },
      },
      audit: new AppendOnlyProviderAudit(store),
      next_execution: () => ({
        expires_at: "2026-08-22T20:01:00.000Z",
        nonce: "nonce.openai.model-port.fixture",
      }),
      openai: {
        environment: "test",
        test_origin: "https://captured-openai.test",
        secret_resolver: {
          async resolve(ref) {
            return {
              secret_ref_id: ref.secret_ref_id,
              environment: "test",
              async withSecret<T>(use: (secret: string) => Promise<T>): Promise<T> {
                return use("sk-captured-fixture-not-real");
              },
            };
          },
        },
        transport: {
          async send() {
            sends += 1;
            return {
              status: 200,
              headers: { "content-type": "application/json" },
              body_bytes: Buffer.from(JSON.stringify({
                id: "resp_model_port_fixture",
                created_at: 1787428801,
                status: "completed",
                model: "gpt-fixture",
                output: [{
                  type: "message",
                  role: "assistant",
                  content: [{ type: "output_text", text: JSON.stringify(canonicalOutput) }],
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
      },
    });

    const execution = await port.execute(provider.authorization.request);

    expect(execution.canonical_output).toEqual(canonicalOutput);
    expect(sends).toBe(1);
    const exported = Buffer.from(await store.exportCanonical()).toString("utf8");
    expect(exported).toContain("provider.execution.pre-attempt-audited");
    expect(exported).toContain("provider.execution.outcome-audited");
    expect(exported).not.toContain("sk-captured-fixture-not-real");
    store.close();
  });
});
