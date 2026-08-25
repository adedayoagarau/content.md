import { sha256Canonical } from "@contentmd/core";
import type {
  AuthorizationInput,
  GovernancePolicy,
  ResourceLimits,
} from "../../governance/src/index.js";
import {
  eventStoreEffectClaims,
  finalizeGovernedRuntimeAuthorizationRecord,
} from "../../runtime-local/src/index.js";
import type {
  BoundRuntimeResource,
  RuntimeBinding,
  RuntimeOperationClaims,
} from "../../runtime-sdk/src/index.js";
import {
  runtimeBindingFixture,
  runtimeClaims,
} from "../../runtime-local/test/runtime-test-fixtures.js";

export interface RuntimeDecisionFixtureInput {
  readonly expected_head_digest: string | null;
  readonly decision_id: string;
  readonly status: "accepted" | "edited" | "rejected" | "abstained";
  readonly actor_ref: string;
  readonly actor_role: string;
  readonly rationale: string;
  readonly proposal_ref: string;
  readonly selected_expression: string | null;
  readonly edited_expression: string | null;
  readonly evidence_reviewed: readonly string[];
  readonly scope: "task" | "session" | "project" | "organization";
  readonly project_id: string;
  readonly occurred_at: string;
  readonly data_class: string;
}

function shifted(now: string, milliseconds: number): string {
  return new Date(Date.parse(now) + milliseconds).toISOString();
}

function authorizationRecord(input: {
  readonly ordinal: number;
  readonly now: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_class: string;
  readonly effect_input: unknown;
  readonly records: number;
  readonly binding: RuntimeBinding;
  readonly project_id: string;
}) {
  const limits: ResourceLimits = eventStoreEffectClaims(
    input.action,
    input.resources,
    [input.data_class],
    input.effect_input,
    input.records,
  );
  const policy: GovernancePolicy = {
    policy_id: `policy.runtime.local-decision.${input.ordinal}`,
    policy_version: 1,
    status: "current",
    effective_at: shifted(input.now, -3_600_000),
    expires_at: shifted(input.now, 3_600_000),
    allowed_actions: [input.action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["runtime.local"],
    denied_adapters: [],
    permitted_data_classes: [input.data_class],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: limits,
    human_approval_actions: [],
    required_control_types: [],
  };
  const grant = {
    grant_id: `grant.runtime.local-decision.${input.ordinal}`,
    principal_ref: "principal.fixture-reviewer",
    workload_ref: "workload.contentmd",
    action: input.action,
    adapter_id: "runtime.local",
    resource_scope: input.resources.map((resource) => resource.resource_id),
    data_classes: [input.data_class],
    egress: "none" as const,
    max_limits: limits,
    issued_at: shifted(input.now, -300_000),
    expires_at: shifted(input.now, 900_000),
    revocation_state: "current" as const,
  };
  const claims: RuntimeOperationClaims = runtimeClaims({
    capability_id: `capability.runtime.local-decision.${input.ordinal}`,
    principal_ref: grant.principal_ref,
    project_ref: input.project_id,
    action: input.action,
    resources: input.resources,
    data_classes: [input.data_class],
    policy_refs: [{
      record_id: policy.policy_id,
      record_version: policy.policy_version,
      content_digest: sha256Canonical(policy),
    }],
    capability_grant_ref: {
      record_id: grant.grant_id,
      record_version: 1,
      content_digest: sha256Canonical(grant),
    },
    control_refs: [],
    resource_limits: limits,
    issued_at: grant.issued_at,
    expires_at: grant.expires_at,
    nonce: `nonce.runtime.local-decision.${input.ordinal}`,
    runtime_binding_digest: input.binding.descriptor_digest,
  });
  const authorization: AuthorizationInput = {
    now: input.now,
    request: {
      operation_id: claims.capability_id,
      intent: "apply",
      action: input.action,
      adapter_id: "runtime.local",
      resource_scope: input.resources.map((resource) => resource.resource_id),
      data_classes: [input.data_class],
      egress: "none",
      requested_limits: limits,
      approval_class: null,
      requires_readback: false,
    },
    policies: [policy],
    capability_grant: grant,
    approval: null,
    control_dispositions: [],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  return finalizeGovernedRuntimeAuthorizationRecord({ authorization, claims });
}

export function runtimeDecisionAuthorityFixture(
  decision: RuntimeDecisionFixtureInput,
  now = new Date().toISOString(),
) {
  const binding = runtimeBindingFixture(decision.project_id);
  const streamId = `decision-stream.${decision.project_id}`;
  const command = {
    event_id: `event.${decision.decision_id}`,
    stream_id: streamId,
    event_type: "content_decision_recorded",
    occurred_at: decision.occurred_at,
    actor_ref: decision.actor_ref,
    data_class: decision.data_class,
    payload: {
      schema_version: "contentmd.content-decision/0.1.0",
      decision_id: decision.decision_id,
      status: decision.status,
      actor_ref: decision.actor_ref,
      actor_role: decision.actor_role,
      rationale: decision.rationale,
      proposal_ref: decision.proposal_ref,
      selected_expression: decision.selected_expression,
      edited_expression: decision.edited_expression,
      evidence_reviewed: [...new Set(decision.evidence_reviewed)].sort(),
      scope: decision.scope,
      project_id: decision.project_id,
      occurred_at: decision.occurred_at,
      mutation_approval_effect: "none",
    },
    expected_head_digest: decision.expected_head_digest,
  };
  const operationInputs = [
    {
      action: "runtime.event-store.open",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      effect_input: { binding_id: binding.binding_id },
    },
    {
      action: "runtime.event.head",
      resources: [{ resource_id: streamId, content_digest: null }],
      effect_input: { stream_id: streamId },
    },
    {
      action: "runtime.event.append",
      resources: [{ resource_id: streamId, content_digest: decision.expected_head_digest }],
      effect_input: command,
    },
    {
      action: "runtime.event-store.close",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      effect_input: { binding_id: binding.binding_id },
    },
  ] as const;
  return {
    contract_version: "contentmd.local-decision-runtime-authority/0.1.0" as const,
    runtime_binding: binding,
    authorization_records: operationInputs.map((operation, index) => authorizationRecord({
      ordinal: index + 1,
      now,
      action: operation.action,
      resources: operation.resources,
      data_class: decision.data_class,
      effect_input: operation.effect_input,
      records: 1,
      binding,
      project_id: decision.project_id,
    })),
  };
}
