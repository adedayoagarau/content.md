import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import { SqliteEventStore } from "@contentmd/memory";
import { issueProviderExecutionPlan } from "@contentmd/governance";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  executeGuardedOpenAIRequest,
  prepareOpenAIResponsesRequest,
  type OpenAISecretLease,
} from "../src/index.js";

const temporaryDirectories: string[] = [];

function lease(environment: "test" | "production"): OpenAISecretLease {
  return {
    secret_ref_id: "secret-ref.openai.fixture",
    environment,
    async withSecret<T>(use: (value: string) => Promise<T>): Promise<T> {
      return use("sk-fixture-not-real");
    },
  };
}

async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), "contentmd-openai-guard-"));
  temporaryDirectories.push(directory);
  const store = new SqliteEventStore(join(directory, "attempts.sqlite"), {
    permitted_data_classes: ["provider_attempt"],
  });
  const provider = providerFixture();
  const prepared = prepareOpenAIResponsesRequest(provider.authorization.request);
  const authenticated_plan = await issueProviderExecutionPlan({
    now: PROVIDER_NOW,
    expires_at: "2026-08-22T20:01:00.000Z",
    nonce: "nonce.openai.guard.fixture",
    method: "POST",
    authorization: provider.authorization,
    prepared_request: prepared,
  }, providerPlanSigner());
  return { ...provider, prepared, authenticated_plan, store };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("executeGuardedOpenAIRequest", () => {
  it("claims once, rechecks, and sends the exact authorized bytes with no redirect", async () => {
    const state = await fixture();
    const calls: Array<Record<string, unknown>> = [];
    const times = [PROVIDER_NOW, "2026-08-22T20:00:00.001Z"];

    const result = await executeGuardedOpenAIRequest({
      authenticated_plan: state.authenticated_plan,
      signer: providerPlanSigner(),
      authorization: state.authorization,
      prepared: state.prepared,
      store: state.store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => times.shift() ?? PROVIDER_NOW },
      test_mode: true,
      test_origin: "https://openai.test",
      secret_resolver: { async resolve() { return lease("test"); } },
      transport: {
        async send(request) {
          calls.push(request as unknown as Record<string, unknown>);
          return {
            status: 200,
            headers: { "content-type": "application/json" },
            body_bytes: Buffer.from('{"id":"resp_fixture"}', "utf8"),
            received_at: "2026-08-22T20:00:00.100Z",
          };
        },
      },
    });

    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({
      url: "https://openai.test/v1/responses",
      method: "POST",
      redirect: "error",
      headers: {
        authorization: "Bearer sk-fixture-not-real",
        "content-type": "application/json",
        "x-contentmd-adapter": "openai-responses/0.1.0",
      },
      body_bytes: state.prepared.body_bytes,
      timeout_ms: 30_000,
    });
    expect(result.attempt_claim.disposition).toBe("claimed");
    expect(JSON.stringify(result)).not.toContain("sk-fixture-not-real");
    state.store.close();
  });

  it("rejects body drift before claim or transport", async () => {
    const state = await fixture();
    let sends = 0;
    const prepared = {
      ...state.prepared,
      body_bytes: Buffer.from("changed", "utf8"),
    };

    await expect(executeGuardedOpenAIRequest({
      authenticated_plan: state.authenticated_plan,
      signer: providerPlanSigner(),
      authorization: state.authorization,
      prepared,
      store: state.store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => PROVIDER_NOW },
      test_mode: true,
      test_origin: "https://openai.test",
      secret_resolver: { async resolve() { return lease("test"); } },
      transport: { async send() { sends += 1; throw new Error("must not send"); } },
    })).rejects.toMatchObject({
      reason_codes: expect.arrayContaining(["provider_execution_plan_body_mismatch"]),
    });
    expect(sends).toBe(0);
    const emptyExportPreimage = { schema_version: "0.1.0", events: [] } as const;
    expect(JSON.parse(Buffer.from(await state.store.exportCanonical()).toString("utf8"))).toEqual({
      ...emptyExportPreimage,
      document_digest: sha256Canonical(emptyExportPreimage),
    });
    state.store.close();
  });

  it("rejects a production secret in test mode without sending", async () => {
    const state = await fixture();
    let sends = 0;

    await expect(executeGuardedOpenAIRequest({
      authenticated_plan: state.authenticated_plan,
      signer: providerPlanSigner(),
      authorization: state.authorization,
      prepared: state.prepared,
      store: state.store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => PROVIDER_NOW },
      test_mode: true,
      test_origin: "https://openai.test",
      secret_resolver: { async resolve() { return lease("production"); } },
      transport: { async send() { sends += 1; throw new Error("must not send"); } },
    })).rejects.toThrow("openai_secret_invalid:production_secret_in_test");
    expect(sends).toBe(0);
    state.store.close();
  });

  it("marks a post-claim transport failure as an unknown provider outcome", async () => {
    const state = await fixture();

    await expect(executeGuardedOpenAIRequest({
      authenticated_plan: state.authenticated_plan,
      signer: providerPlanSigner(),
      authorization: state.authorization,
      prepared: state.prepared,
      store: state.store,
      actor_ref: "actor.fixture",
      audit_available: true,
      clock: { now: () => PROVIDER_NOW },
      test_mode: true,
      test_origin: "https://openai.test",
      secret_resolver: { async resolve() { return lease("test"); } },
      transport: { async send() { throw new Error("connection reset"); } },
    })).rejects.toMatchObject({
      code: "provider_outcome_unknown",
      attempt_claim: expect.objectContaining({ disposition: "claimed" }),
    });
    state.store.close();
  });
});
