import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import { createModelRequest } from "@contentmd/model-provider-sdk";
import {
  authorizeProviderExecution,
  createModelProfile,
  createProviderCapabilityGrant,
  createProviderConnectionRecord,
  createProviderDataHandlingProfile,
  createRequestHeaderTemplate,
  createSecretRef,
  type AuthorizationInput,
  type GovernancePolicy,
} from "@contentmd/governance";

const now = "2026-08-22T20:00:00.000Z";

const ref = (recordId: string, schemaId: string, contentDigest: string) => ({
  record_id: recordId,
  schema_id: schemaId,
  schema_version: "0.1.0",
  content_digest: contentDigest,
});

const policy: GovernancePolicy = {
  policy_id: "policy.provider.fixture",
  policy_version: 1,
  status: "current",
  effective_at: "2026-08-22T00:00:00.000Z",
  expires_at: "2026-08-23T00:00:00.000Z",
  allowed_actions: ["model.generate"],
  denied_actions: [],
  review_actions: [],
  allowed_adapters: ["adapter.openai.responses"],
  denied_adapters: [],
  permitted_data_classes: ["project_fact", "task_context"],
  denied_data_classes: [],
  permitted_egress: ["network"],
  max_limits: {
    calls: 1,
    bytes: 262_144,
    duration_ms: 30_000,
    records: 1,
    model_tokens: 10_000,
    browser_actions: 0,
    retries: 0,
  },
  human_approval_actions: [],
  required_control_types: [
    "connection_authorization",
    "data_processing",
    "durable_memory",
    "telemetry",
  ],
};

function fixtures() {
  const dataProfile = createProviderDataHandlingProfile({
    profile_id: "provider-data.openai.fixture",
    provider_id: "provider.openai",
    account_id: "account.fixture",
    project_id: "project.fixture",
    application_state: "none",
    abuse_monitoring_retention: "provider_policy_applies",
    zero_data_retention_status: "not_established",
    prompt_caching: "not_requested",
    training_opt_in: false,
    processing_region: "global",
    policy_url: "https://openai.com/policies",
    sourced_at: "2026-08-22T18:00:00.000Z",
    effective_at: "2026-08-22T18:00:00.000Z",
    review_at: "2026-09-22T18:00:00.000Z",
    status: "current",
  });
  const modelProfile = createModelProfile({
    profile_id: "model-profile.openai.fixture",
    provider_id: "provider.openai",
    requested_model_id: "gpt-fixture",
    permitted_returned_model_ids: ["gpt-fixture"],
    supported_operations: ["classify", "draft", "rewrite", "strategy"],
    supported_output_schema_ids: ["contentmd.classification-model-output/0.1.0"],
    maximum_input_tokens: 8_000,
    maximum_output_tokens: 2_000,
    timeout_ms: 30_000,
    maximum_retries: 0,
    structured_output: true,
    data_handling_profile_ref: ref(
      dataProfile.profile_id,
      dataProfile.schema_version,
      dataProfile.profile_digest,
    ),
    status: "current",
  });
  const secretRef = createSecretRef({
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
  const headerTemplate = createRequestHeaderTemplate({
    template_id: "header-template.openai.fixture",
    provider_id: "provider.openai",
    adapter_id: "adapter.openai.responses",
    adapter_version: "0.1.0",
    application_headers: [
      { name: "authorization", value: { kind: "secret_ref", secret_ref_id: secretRef.secret_ref_id } },
      { name: "content-type", value: { kind: "literal", value: "application/json" } },
    ],
    derived_transport_headers: ["content-length", "host"],
    status: "current",
  });
  const connection = createProviderConnectionRecord({
    connection_id: "connection.openai.fixture",
    provider_id: "provider.openai",
    account_id: "account.fixture",
    project_id: "project.fixture",
    origin: "https://api.openai.com",
    endpoint_class: "responses",
    data_handling_profile_ref: ref(
      dataProfile.profile_id,
      dataProfile.schema_version,
      dataProfile.profile_digest,
    ),
    secret_ref_id: secretRef.secret_ref_id,
    header_template_ref: ref(
      headerTemplate.template_id,
      headerTemplate.schema_version,
      headerTemplate.template_digest,
    ),
    status: "current",
  });
  const grant = createProviderCapabilityGrant({
    grant_id: "grant.provider.fixture",
    principal_ref: "actor.fixture",
    workload_ref: "workload.contentmd",
    action: "model.generate",
    adapter_id: "adapter.openai.responses",
    provider_id: "provider.openai",
    resource_scope: ["project.fixture", "task.fixture"],
    data_classes: ["project_fact", "task_context"],
    egress: "network",
    operations: ["classify"],
    output_schema_ids: ["contentmd.classification-model-output/0.1.0"],
    model_profile_ref: ref(
      modelProfile.profile_id,
      modelProfile.schema_version,
      modelProfile.profile_digest,
    ),
    connection_ref: ref(
      connection.connection_id,
      connection.schema_version,
      connection.connection_digest,
    ),
    max_limits: policy.max_limits,
    issued_at: "2026-08-22T19:00:00.000Z",
    expires_at: "2026-08-22T21:00:00.000Z",
    revocation_state: "current",
  });
  return { dataProfile, modelProfile, secretRef, headerTemplate, connection, grant };
}

function request(overrides: Record<string, unknown> = {}) {
  const state = fixtures();
  return {
    state,
    request: createModelRequest({
      operation: "classify",
      output_schema_id: "contentmd.classification-model-output/0.1.0",
      prompt_template: {
        template_id: "contentmd.prompt.classify",
        template_version: "0.1.0",
        template_digest: "1".repeat(64),
      },
      context_packet_ref: ref("context.fixture", "contentmd.context-packet", "2".repeat(64)),
      retrieval_snapshot_ref: null,
      requested_provider_id: "provider.openai",
      requested_model_profile_ref: ref(
        state.modelProfile.profile_id,
        state.modelProfile.schema_version,
        state.modelProfile.profile_digest,
      ),
      requested_model_id: "gpt-fixture",
      scope: {
        project_id: "project.fixture",
        task_id: "task.fixture",
        memory_scope: "project",
        locale: "en-US",
        channel: "web",
        surface: "checkout",
        risk: "high",
      },
      data_classes: ["project_fact", "task_context"],
      egress_item_digests: ["3".repeat(64), "4".repeat(64)],
      resource_limits: {
        maximum_calls: 1,
        maximum_retries: 0,
        maximum_input_bytes: 131_072,
        maximum_output_bytes: 32_768,
        maximum_input_tokens: 8_000,
        maximum_output_tokens: 2_000,
        timeout_ms: 30_000,
      },
      provider_application_state: "none",
      input: { prompt_digest: "5".repeat(64) },
      authority_effect: "none",
      ...overrides,
    }),
  };
}

function authorizationInput(grant = fixtures().grant): AuthorizationInput {
  return {
    now,
    request: {
      operation_id: "operation.model.fixture",
      intent: "draft",
      action: "model.generate",
      adapter_id: "adapter.openai.responses",
      resource_scope: ["project.fixture", "task.fixture"],
      data_classes: ["project_fact", "task_context"],
      egress: "network",
      requested_limits: policy.max_limits,
      approval_class: null,
      requires_readback: false,
    },
    policies: [policy],
    capability_grant: grant,
    approval: null,
    control_dispositions: [
      { control_type: "connection_authorization", applicability: "applicable", record_ref: "control.connection", status: "current", rationale: "Exact connection record." },
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Exact data profile." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Transient provider output only." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Minimized audit metadata." },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
}

function revocationCheckpoint() {
  return {
    checkpoint_id: "revocation-checkpoint.fixture",
    checkpoint_digest: sha256Canonical({ state: "current", observed_at: now }),
    observed_at: now,
    status: "current" as const,
  };
}

function preflight(overrides: Record<string, unknown> = {}) {
  const requestFixture = request(overrides.request as Record<string, unknown> | undefined);
  const state = requestFixture.state;
  return authorizeProviderExecution({
    now,
    authorization: authorizationInput(state.grant),
    request: requestFixture.request,
    adapter_id: "adapter.openai.responses",
    adapter_version: "0.1.0",
    model_profile: state.modelProfile,
    data_handling_profile: state.dataProfile,
    connection: state.connection,
    secret_ref: state.secretRef,
    header_template: state.headerTemplate,
    provider_grant: state.grant,
    revocation_checkpoint: revocationCheckpoint(),
    audit_available: true,
    ...overrides,
  });
}

describe("authorizeProviderExecution", () => {
  it("allows one exact, current, fully disclosed provider request", () => {
    const decision = preflight();

    expect(decision.disposition).toBe("allow");
    expect(decision.reason_codes).toEqual(["provider_execution_authorized"]);
    expect(decision.authority_effect).toBe("none");
    expect(JSON.stringify(decision.audit_event)).not.toContain("prompt_digest");
  });

  it.each([
    ["missing grant", { provider_grant: null }, "provider_grant_missing"],
    ["missing connection", { connection: null }, "provider_connection_missing"],
    ["missing data profile", { data_handling_profile: null }, "provider_data_profile_missing"],
    ["audit unavailable", { audit_available: false }, "provider_audit_unavailable"],
    [
      "expired provider grant",
      { provider_grant: { ...fixtures().grant, expires_at: "2026-08-22T19:59:59.000Z" } },
      "provider_grant_time_invalid",
    ],
    [
      "revoked provider grant",
      { provider_grant: { ...fixtures().grant, revocation_state: "revoked" } },
      "provider_grant_not_current",
    ],
    [
      "revoked connection",
      { connection: { ...fixtures().connection, status: "revoked" } },
      "provider_connection_not_current",
    ],
    [
      "stale revocation checkpoint",
      { revocation_checkpoint: { ...revocationCheckpoint(), status: "unknown" } },
      "provider_revocation_checkpoint_not_current",
    ],
  ] as const)("fails closed for %s", (_label, override, reason) => {
    const decision = preflight(override as Record<string, unknown>);

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain(reason);
  });

  it("denies undeclared data classes and model resource drift", () => {
    const state = fixtures();
    const driftedRequest = request({
      data_classes: ["confidential", "project_fact", "task_context"],
      resource_limits: {
        maximum_calls: 1,
        maximum_retries: 0,
        maximum_input_bytes: 131_072,
        maximum_output_bytes: 32_768,
        maximum_input_tokens: 8_000,
        maximum_output_tokens: 2_001,
        timeout_ms: 30_000,
      },
    }).request;

    const decision = authorizeProviderExecution({
      now,
      authorization: authorizationInput(state.grant),
      request: driftedRequest,
      adapter_id: "adapter.openai.responses",
      adapter_version: "0.1.0",
      model_profile: state.modelProfile,
      data_handling_profile: state.dataProfile,
      connection: state.connection,
      secret_ref: state.secretRef,
      header_template: state.headerTemplate,
      provider_grant: state.grant,
      revocation_checkpoint: {
        checkpoint_id: "revocation-checkpoint.fixture",
        checkpoint_digest: "9".repeat(64),
        observed_at: now,
        status: "current",
      },
      audit_available: true,
    });

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain("provider_grant_data_class_mismatch");
    expect(decision.reason_codes).toContain("model_profile_output_token_limit_exceeded");
  });

  it("denies when the most-restrictive policy blocks provider generation", () => {
    const state = fixtures();
    const decision = preflight({
      authorization: {
        ...authorizationInput(state.grant),
        policies: [{
          ...policy,
          allowed_actions: [],
          denied_actions: ["model.generate"],
        }],
      },
      provider_grant: state.grant,
    });

    expect(decision.disposition).toBe("deny");
    expect(decision.reason_codes).toContain("outer:policy_action_denied");
  });
});
