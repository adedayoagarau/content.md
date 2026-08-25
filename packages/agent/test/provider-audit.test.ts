import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import {
  claimProviderExecutionAttempt,
  createProviderReceipt,
  issueProviderExecutionPlan,
  providerExecutionPlanRef,
} from "@contentmd/governance";
import { SqliteEventStore, type AppendOnlyEventStore } from "@contentmd/memory";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  AppendOnlyProviderAudit,
  ProviderAuditError,
} from "../src/provider-audit.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

async function auditFixture() {
  const directory = await mkdtemp(join(tmpdir(), "contentmd-provider-audit-"));
  temporaryDirectories.push(directory);
  const store = new SqliteEventStore(join(directory, "events.sqlite"), {
    permitted_data_classes: ["provider_attempt", "provider_audit"],
  });
  const provider = providerFixture();
  const signer = providerPlanSigner();
  const authenticated_plan = await issueProviderExecutionPlan({
    now: PROVIDER_NOW,
    expires_at: "2026-08-22T20:01:00.000Z",
    nonce: "nonce.provider-audit.fixture",
    method: "POST",
    authorization: provider.authorization,
    prepared_request: provider.prepared_request,
  }, signer);
  const attempt = await claimProviderExecutionAttempt({
    now: PROVIDER_NOW,
    actor_ref: "actor.fixture",
    audit_available: true,
    store,
    authenticated_plan,
    method: "POST",
    authorization: provider.authorization,
    prepared_request: provider.prepared_request,
  }, signer);
  const attempt_claim_ref = {
    record_id: attempt.event_id,
    schema_id: attempt.schema_version,
    schema_version: "0.1.0",
    content_digest: attempt.event_digest,
  };
  const provider_receipt = createProviderReceipt({
    receipt_id: "provider-receipt.audit.fixture",
    plan_ref: providerExecutionPlanRef(authenticated_plan.plan),
    attempt_claim_ref,
    request_id: provider.authorization.request.request_id,
    provider_id: "provider.openai",
    requested_model_id: "gpt-fixture",
    returned_model_id: "gpt-fixture",
    provider_response_id: "resp.audit.fixture",
    provider_created_at: PROVIDER_NOW,
    outcome_state: "completed",
    http_status: 200,
    response_body_digest: "a".repeat(64),
    response_body_byte_count: 200,
    provider_output_digest: "b".repeat(64),
    model_response_digest: "c".repeat(64),
    token_accounting: { input_tokens: 10, output_tokens: 5, total_tokens: 15, cached_input_tokens: 0 },
    sent_at: PROVIDER_NOW,
    completed_at: PROVIDER_NOW,
    outcome_audit_stream_id: authenticated_plan.plan.outcome_audit_stream_id,
    retention_disposition: "transient_only",
    authority_effect: "none",
  });
  return { store, provider, authenticated_plan, provider_receipt };
}

describe("append-only provider audit", () => {
  it("appends minimized pre-attempt and outcome events with exact readback", async () => {
    const fixture = await auditFixture();
    const audit = new AppendOnlyProviderAudit(fixture.store);
    const base = {
      actor_ref: "actor.fixture",
      occurred_at: PROVIDER_NOW,
      authenticated_plan: fixture.authenticated_plan,
      authorization: fixture.provider.authorization,
    };

    const pre = await audit.appendPreAttempt(base);
    const outcome = await audit.appendOutcome({
      ...base,
      provider_receipt: fixture.provider_receipt,
      response: null,
    });

    expect(pre.event_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(outcome.event_digest).toMatch(/^[a-f0-9]{64}$/u);
    const events = await fixture.store.readStream(
      fixture.authenticated_plan.plan.outcome_audit_stream_id,
    );
    expect(events.map((event) => event.event_type)).toEqual([
      "provider.execution.pre-attempt-audited",
      "provider.execution.outcome-audited",
    ]);
    const serialized = JSON.stringify(events);
    expect(serialized).not.toContain("Classify the checkout content risk");
    expect(serialized).not.toContain('{"input":"fixture"}');
    expect(serialized).not.toContain("fixture-only-plan-signing-key");
    fixture.store.close();
  });

  it("fails closed when append readback cannot prove the exact event", async () => {
    const fixture = await auditFixture();
    const lyingStore: AppendOnlyEventStore = {
      append: fixture.store.append.bind(fixture.store),
      appendExclusive: fixture.store.appendExclusive.bind(fixture.store),
      appendTransaction: fixture.store.appendTransaction.bind(fixture.store),
      getEvent: fixture.store.getEvent.bind(fixture.store),
      readStream: fixture.store.readStream.bind(fixture.store),
      async getHead() { return null; },
      rebuild: fixture.store.rebuild.bind(fixture.store),
      exportCanonical: fixture.store.exportCanonical.bind(fixture.store),
      close: fixture.store.close.bind(fixture.store),
    };
    const audit = new AppendOnlyProviderAudit(lyingStore);

    await expect(audit.appendPreAttempt({
      actor_ref: "actor.fixture",
      occurred_at: PROVIDER_NOW,
      authenticated_plan: fixture.authenticated_plan,
      authorization: fixture.provider.authorization,
    })).rejects.toBeInstanceOf(ProviderAuditError);
    fixture.store.close();
  });
});
