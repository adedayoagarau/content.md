import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import { SqliteEventStore } from "@contentmd/memory";
import {
  claimProviderExecutionAttempt,
  issueProviderExecutionPlan,
} from "@contentmd/governance";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "./provider-fixtures.js";

const temporaryDirectories: string[] = [];

async function attemptFixture() {
  const directory = await mkdtemp(join(tmpdir(), "contentmd-provider-attempt-"));
  temporaryDirectories.push(directory);
  const store = new SqliteEventStore(join(directory, "attempts.sqlite"), {
    permitted_data_classes: ["provider_attempt"],
  });
  const provider = providerFixture();
  const authenticated_plan = await issueProviderExecutionPlan({
    now: PROVIDER_NOW,
    expires_at: "2026-08-22T20:01:00.000Z",
    nonce: "nonce.provider.fixture.001",
    method: "POST",
    authorization: provider.authorization,
    prepared_request: provider.prepared_request,
  }, providerPlanSigner());
  return { ...provider, authenticated_plan, store };
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

describe("provider execution attempt ledger", () => {
  it("atomically claims one minimized attempt immediately before transport", async () => {
    const fixture = await attemptFixture();

    const claim = await claimProviderExecutionAttempt({
      now: PROVIDER_NOW,
      actor_ref: "actor.fixture",
      audit_available: true,
      store: fixture.store,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    }, providerPlanSigner());

    expect(claim).toMatchObject({
      disposition: "claimed",
      sequence: 1,
      authority_effect: "none",
    });
    const events = await fixture.store.readStream(claim.stream_id);
    expect(events).toHaveLength(1);
    expect(JSON.stringify(events)).not.toContain("fixture-only-plan-signing-key");
    expect(JSON.stringify(events)).not.toContain("{\"input\":\"fixture\"}");
    fixture.store.close();
  });

  it("allows exactly one concurrent claim for the same nonce", async () => {
    const fixture = await attemptFixture();
    const input = {
      now: PROVIDER_NOW,
      actor_ref: "actor.fixture",
      audit_available: true,
      store: fixture.store,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST" as const,
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    };

    const results = await Promise.allSettled([
      claimProviderExecutionAttempt(input, providerPlanSigner()),
      claimProviderExecutionAttempt(input, providerPlanSigner()),
    ]);

    expect(results.filter((result) => result.status === "fulfilled")).toHaveLength(1);
    const rejected = results.find((result) => result.status === "rejected");
    expect(rejected).toMatchObject({
      status: "rejected",
      reason: expect.objectContaining({
        reason_codes: ["provider_attempt_nonce_already_claimed"],
      }),
    });
    const fulfilled = results.find((result) => result.status === "fulfilled");
    if (fulfilled?.status !== "fulfilled") throw new Error("missing fulfilled attempt");
    expect(await fixture.store.readStream(fulfilled.value.stream_id)).toHaveLength(1);
    fixture.store.close();
  });

  it("rejects replay without appending a second event", async () => {
    const fixture = await attemptFixture();
    const input = {
      now: PROVIDER_NOW,
      actor_ref: "actor.fixture",
      audit_available: true,
      store: fixture.store,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST" as const,
      authorization: fixture.authorization,
      prepared_request: fixture.prepared_request,
    };
    const first = await claimProviderExecutionAttempt(input, providerPlanSigner());

    await expect(claimProviderExecutionAttempt(input, providerPlanSigner())).rejects.toMatchObject({
      reason_codes: ["provider_attempt_nonce_already_claimed"],
    });
    expect(await fixture.store.readStream(first.stream_id)).toHaveLength(1);
    fixture.store.close();
  });

  it.each([
    ["expired plan", { now: "2026-08-22T20:01:00.001Z" }, "provider_execution_plan_expired"],
    ["unavailable audit", { audit_available: false }, "provider_attempt_audit_unavailable"],
    ["stale revocation", { revocation: true }, "provider_execution_plan_revocation_not_current"],
    ["body drift", { body: true }, "provider_execution_plan_body_mismatch"],
  ] as const)("fails closed before append for %s", async (_label, mutation, reason) => {
    const fixture = await attemptFixture();
    const authorization = mutation.revocation
      ? {
          ...fixture.authorization,
          revocation_checkpoint: { ...fixture.authorization.revocation_checkpoint, status: "unknown" as const },
        }
      : fixture.authorization;
    const prepared_request = mutation.body
      ? { ...fixture.prepared_request, body_bytes: Buffer.from("changed", "utf8") }
      : fixture.prepared_request;

    await expect(claimProviderExecutionAttempt({
      now: mutation.now ?? PROVIDER_NOW,
      actor_ref: "actor.fixture",
      audit_available: mutation.audit_available ?? true,
      store: fixture.store,
      authenticated_plan: fixture.authenticated_plan,
      method: "POST",
      authorization,
      prepared_request,
    }, providerPlanSigner())).rejects.toMatchObject({
      reason_codes: expect.arrayContaining([reason]),
    });
    const emptyExportPreimage = { schema_version: "0.1.0", events: [] } as const;
    expect(JSON.parse(Buffer.from(await fixture.store.exportCanonical()).toString("utf8"))).toEqual({
      ...emptyExportPreimage,
      document_digest: sha256Canonical(emptyExportPreimage),
    });
    fixture.store.close();
  });
});
