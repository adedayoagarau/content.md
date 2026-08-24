import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  claimProviderExecutionAttempt,
  createProviderReceipt,
  providerExecutionPlanRef,
  verifyAuthenticatedProviderExecutionPlan,
} from "@contentmd/governance";
import { SqliteEventStore } from "@contentmd/memory";
import type { ModelExecutionResult } from "@contentmd/model-provider-sdk";
import {
  PROVIDER_NOW,
  providerFixture,
  providerPlanSigner,
} from "../../governance/test/provider-fixtures.js";
import {
  GovernedLiveModelExecutorError,
  executeGovernedLiveModel,
  type GovernedLiveModelAdapter,
  type ProviderAuditPort,
  type ProviderConfigurationResolver,
} from "../src/live-model-executor.js";

const temporaryDirectories: string[] = [];

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) =>
    rm(directory, { recursive: true, force: true })));
});

function attemptRef(attempt: {
  event_id: string;
  event_digest: string;
  schema_version: string;
}) {
  return {
    record_id: attempt.event_id,
    schema_id: attempt.schema_version,
    schema_version: "0.1.0",
    content_digest: attempt.event_digest,
  };
}

async function executorFixture(options: {
  failOutcomeAudit?: boolean;
  unknownOutcome?: boolean;
} = {}) {
  const order: string[] = [];
  const directory = await mkdtemp(join(tmpdir(), "contentmd-live-executor-"));
  temporaryDirectories.push(directory);
  const store = new SqliteEventStore(join(directory, "events.sqlite"), {
    permitted_data_classes: ["provider_attempt"],
  });
  const provider = providerFixture();
  const signer = providerPlanSigner();
  const configuration: ProviderConfigurationResolver = {
    async resolve() {
      order.push("resolve_records");
      const {
        now: _now,
        request: _request,
        authorization,
        ...records
      } = provider.authorization;
      const { now: _authorizationNow, ...authorizationTemplate } = authorization;
      return { ...records, authorization: authorizationTemplate };
    },
  };
  const audit: ProviderAuditPort = {
    async appendPreAttempt() {
      order.push("append_pre_attempt_audit");
      return { event_id: "audit.pre.fixture", event_digest: "8".repeat(64) };
    },
    async appendOutcome() {
      order.push("append_outcome_audit");
      if (options.failOutcomeAudit === true) throw new Error("audit unavailable");
      return { event_id: "audit.outcome.fixture", event_digest: "9".repeat(64) };
    },
  };
  const adapter: GovernedLiveModelAdapter = {
    descriptor: {
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
    },
    async prepare(request) {
      order.push("prepare_wire_bytes");
      return { ...provider.prepared_request, request };
    },
    async executeAuthorized(input) {
      const attempt = await claimProviderExecutionAttempt({
        now: input.clock.now(),
        actor_ref: input.actor_ref,
        audit_available: input.audit_available,
        store: input.store,
        authenticated_plan: input.authenticated_plan,
        method: "POST",
        authorization: input.authorization,
        prepared_request: input.prepared,
      }, input.signer);
      order.push("claim_nonce");
      const verification = await verifyAuthenticatedProviderExecutionPlan({
        now: input.clock.now(),
        authenticated_plan: input.authenticated_plan,
        method: "POST",
        authorization: input.authorization,
        prepared_request: input.prepared,
      }, input.signer);
      if (verification.disposition !== "allow") throw new Error("recheck denied");
      order.push("recheck_currentness");
      order.push("execute_transport");
      if (options.unknownOutcome === true) {
        const error = Object.assign(new Error("transport failed after claim"), {
          code: "provider_outcome_unknown" as const,
          reason_codes: ["provider_transport_failed_after_claim"],
          attempt_claim: attempt,
        });
        throw error;
      }
      const output = {
        authority_effect: "none",
        intent: "advise",
        risk_level: "high",
        risk_signals: [],
        review_requirements: [],
        uncertainty: [],
      };
      const outputDigest = sha256Canonical(output);
      const response = {
        schema_version: "contentmd.model-response/0.2.0" as const,
        request_id: input.prepared.request.request_id,
        provider_id: "provider.openai",
        adapter_id: "adapter.openai.responses",
        adapter_version: "0.1.0",
        model_profile_ref: input.prepared.request.requested_model_profile_ref,
        requested_model_id: "gpt-fixture",
        model_id: "gpt-fixture",
        provider_response_id: "resp.live-executor.fixture",
        provider_created_at: PROVIDER_NOW,
        response_state: "completed" as const,
        incomplete_reason: null,
        refusal_reason: null,
        input_digest: input.prepared.request.input_digest,
        provider_output_digest: outputDigest,
        parsed_output_digest: outputDigest,
        canonical_output_digest: outputDigest,
        output_digest: outputDigest,
        schema_projection_id: "projection.fixture",
        schema_projection_digest: "a".repeat(64),
        token_accounting: { input_tokens: 10, output_tokens: 5, total_tokens: 15, cached_input_tokens: 0 },
        timeout_observed: false,
        retry_count: 0 as const,
        service_tier: "default",
        provider_storage_requested: false as const,
        output_ref: null,
        retention_disposition: "transient_only" as const,
        deterministic_status: "not_deterministic" as const,
        authority_effect: "none" as const,
        output,
      };
      const execution: ModelExecutionResult = { response, canonical_output: output };
      order.push("validate_model_output");
      return {
        execution,
        provider_receipt: createProviderReceipt({
          receipt_id: "provider-receipt.live-executor.fixture",
          plan_ref: providerExecutionPlanRef(input.authenticated_plan.plan),
          attempt_claim_ref: attemptRef(attempt),
          request_id: input.prepared.request.request_id,
          provider_id: "provider.openai",
          requested_model_id: "gpt-fixture",
          returned_model_id: "gpt-fixture",
          provider_response_id: "resp.live-executor.fixture",
          provider_created_at: PROVIDER_NOW,
          outcome_state: "completed",
          http_status: 200,
          response_body_digest: "b".repeat(64),
          response_body_byte_count: 200,
          provider_output_digest: outputDigest,
          model_response_digest: sha256Canonical(response),
          token_accounting: response.token_accounting,
          sent_at: PROVIDER_NOW,
          completed_at: PROVIDER_NOW,
          outcome_audit_stream_id: input.authenticated_plan.plan.outcome_audit_stream_id,
          retention_disposition: "transient_only",
          authority_effect: "none",
        }),
        attempt_claim: attempt,
        authority_effect: "none" as const,
      };
    },
  };
  return { order, store, provider, signer, configuration, audit, adapter };
}

describe("governed live model executor", () => {
  it("exhausts authorization, attempt, validation, and audit before releasing output", async () => {
    const fixture = await executorFixture();
    const result = await executeGovernedLiveModel({
      project_root: "/project/fixture",
      model_profile_ref: "model-profile.openai.fixture",
      connection_ref: "connection.openai.fixture",
      grant_ref: "grant.provider.fixture",
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.agent.live-executor.fixture",
      clock: { now: () => PROVIDER_NOW },
      signer: fixture.signer,
      store: fixture.store,
      configuration: fixture.configuration,
      audit: fixture.audit,
      adapter: fixture.adapter,
      compile_request: async () => {
        fixture.order.push("compile_and_manifest");
        return fixture.provider.authorization.request;
      },
    });

    expect(result.disposition).toBe("released");
    expect(result.execution?.canonical_output).not.toBeNull();
    expect(fixture.order).toEqual([
      "resolve_records",
      "compile_and_manifest",
      "prepare_wire_bytes",
      "append_pre_attempt_audit",
      "claim_nonce",
      "recheck_currentness",
      "execute_transport",
      "validate_model_output",
      "append_outcome_audit",
    ]);
    fixture.store.close();
  });

  it("quarantines a completed output when outcome audit durability fails", async () => {
    const fixture = await executorFixture({ failOutcomeAudit: true });
    const result = await executeGovernedLiveModel({
      project_root: "/project/fixture",
      model_profile_ref: "model-profile.openai.fixture",
      connection_ref: "connection.openai.fixture",
      grant_ref: "grant.provider.fixture",
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.agent.live-executor.audit-failure",
      clock: { now: () => PROVIDER_NOW },
      signer: fixture.signer,
      store: fixture.store,
      configuration: fixture.configuration,
      audit: fixture.audit,
      adapter: fixture.adapter,
      compile_request: async () => fixture.provider.authorization.request,
    });

    expect(result).toMatchObject({
      disposition: "quarantined",
      reason_code: "provider_output_quarantined",
      execution: null,
    });
    expect(result.provider_receipt?.outcome_state).toBe("completed");
    fixture.store.close();
  });

  it("fails closed before an attempt when the pre-attempt audit cannot append", async () => {
    const fixture = await executorFixture();
    fixture.audit.appendPreAttempt = async () => { throw new Error("audit unavailable"); };

    await expect(executeGovernedLiveModel({
      project_root: "/project/fixture",
      model_profile_ref: "model-profile.openai.fixture",
      connection_ref: "connection.openai.fixture",
      grant_ref: "grant.provider.fixture",
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.agent.live-executor.pre-audit-failure",
      clock: { now: () => PROVIDER_NOW },
      signer: fixture.signer,
      store: fixture.store,
      configuration: fixture.configuration,
      audit: fixture.audit,
      adapter: fixture.adapter,
      compile_request: async () => fixture.provider.authorization.request,
    })).rejects.toBeInstanceOf(GovernedLiveModelExecutorError);
    const emptyExportPreimage = { schema_version: "0.1.0", events: [] } as const;
    expect(JSON.parse(Buffer.from(await fixture.store.exportCanonical()).toString("utf8"))).toEqual({
      ...emptyExportPreimage,
      document_digest: sha256Canonical(emptyExportPreimage),
    });
    fixture.store.close();
  });

  it("records a post-claim transport failure as unknown outcome without retry", async () => {
    const fixture = await executorFixture({ unknownOutcome: true });
    const result = await executeGovernedLiveModel({
      project_root: "/project/fixture",
      model_profile_ref: "model-profile.openai.fixture",
      connection_ref: "connection.openai.fixture",
      grant_ref: "grant.provider.fixture",
      control_refs: ["control.connection", "control.processing", "control.memory", "control.telemetry"],
      actor_ref: "actor.fixture",
      expires_at: "2026-08-22T20:01:00.000Z",
      nonce: "nonce.agent.live-executor.unknown-outcome",
      clock: { now: () => PROVIDER_NOW },
      signer: fixture.signer,
      store: fixture.store,
      configuration: fixture.configuration,
      audit: fixture.audit,
      adapter: fixture.adapter,
      compile_request: async () => fixture.provider.authorization.request,
    });

    expect(result).toMatchObject({
      disposition: "quarantined",
      reason_code: "provider_outcome_unknown",
      execution: null,
      provider_receipt: { outcome_state: "provider_outcome_unknown" },
    });
    expect(fixture.order.filter((step) => step === "execute_transport")).toHaveLength(1);
    expect(fixture.order.at(-1)).toBe("append_outcome_audit");
    fixture.store.close();
  });
});
