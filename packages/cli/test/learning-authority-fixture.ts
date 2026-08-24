import { sha256Canonical } from "@contentmd/core";
import type {
  AuthorizationInput,
  GovernancePolicy,
  ResourceLimits,
} from "../../governance/src/index.js";
import {
  finalizeGovernedRuntimeAuthorizationRecord,
  type GovernedRuntimeAuthorizationRecord,
} from "../../runtime-local/src/index.js";
import type {
  BoundRuntimeRecordRef,
  BoundRuntimeResource,
  RuntimeBinding,
  RuntimeOperationClaims,
} from "../../runtime-sdk/src/index.js";
import {
  runtimeBindingFixture,
  runtimeClaims,
} from "../../runtime-local/test/runtime-test-fixtures.js";

const DATA_CLASS = "learning-workflow-audit";

function shifted(now: string, milliseconds: number): string {
  return new Date(Date.parse(now) + milliseconds).toISOString();
}

function operationRecord(input: {
  readonly ordinal: number;
  readonly identity: string;
  readonly now: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly record_limit: number;
  readonly binding: RuntimeBinding;
  readonly project_id: string;
}): GovernedRuntimeAuthorizationRecord {
  const identity = sha256Canonical({
    contract_version: "contentmd.test-learning-authority-identity/0.1.0",
    identity: input.identity,
    ordinal: input.ordinal,
  }).slice(0, 16);
  const limits: ResourceLimits = {
    calls: 1,
    bytes: 1_000_000,
    duration_ms: 60_000,
    records: input.record_limit,
    model_tokens: 0,
    browser_actions: 0,
    retries: 0,
  };
  const policy: GovernancePolicy = {
    policy_id: `policy.runtime.learning.${identity}`,
    policy_version: 1,
    status: "current",
    effective_at: shifted(input.now, -3_600_000),
    expires_at: shifted(input.now, 3_600_000),
    allowed_actions: [input.action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["runtime.local"],
    denied_adapters: [],
    permitted_data_classes: [DATA_CLASS],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: limits,
    human_approval_actions: [],
    required_control_types: [],
  };
  const grant = {
    grant_id: `grant.runtime.learning.${identity}`,
    principal_ref: "principal.learning-operator",
    workload_ref: "workload.contentmd",
    action: input.action,
    adapter_id: "runtime.local",
    resource_scope: input.resources.map(({ resource_id }) => resource_id),
    data_classes: [DATA_CLASS],
    egress: "none" as const,
    max_limits: limits,
    issued_at: shifted(input.now, -300_000),
    expires_at: shifted(input.now, 900_000),
    revocation_state: "current" as const,
  };
  const claims: RuntimeOperationClaims = runtimeClaims({
    capability_id: `capability.runtime.learning.${identity}`,
    principal_ref: grant.principal_ref,
    project_ref: input.project_id,
    action: input.action,
    resources: input.resources,
    data_classes: [DATA_CLASS],
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
    nonce: `nonce.runtime.learning.${identity}`,
    runtime_binding_digest: input.binding.descriptor_digest,
  });
  const authorization: AuthorizationInput = {
    now: input.now,
    request: {
      operation_id: claims.capability_id,
      intent: "apply",
      action: input.action,
      adapter_id: "runtime.local",
      resource_scope: input.resources.map(({ resource_id }) => resource_id),
      data_classes: [DATA_CLASS],
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

export function learningPhaseAuthorityFixture(input: {
  readonly project_id: string;
  readonly workflow_id: string;
  readonly expected_head_digest: string | null;
  readonly operation_id: string;
  readonly include_inspection: boolean;
  readonly now?: string;
}) {
  const now = input.now ?? new Date().toISOString();
  const binding = runtimeBindingFixture(input.project_id);
  const streamId = `learning-workflow-stream.${input.project_id}`;
  const operations = [
    {
      key: "store_open",
      action: "runtime.event-store.open",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      records: 1,
    },
    ...(input.include_inspection ? [{
      key: "inspection_read",
      action: "runtime.event.read",
      resources: [{ resource_id: streamId, content_digest: null }],
      records: 100,
    }] as const : []),
    {
      key: "audit_read",
      action: "runtime.event.read",
      resources: [{ resource_id: streamId, content_digest: null }],
      records: 100,
    },
    {
      key: "audit_append",
      action: "runtime.event.append",
      resources: [{ resource_id: streamId, content_digest: input.expected_head_digest }],
      records: 1,
    },
    {
      key: "store_close",
      action: "runtime.event-store.close",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      records: 1,
    },
  ] as const;
  const records = operations.map((operation, index) => operationRecord({
    ordinal: index + 1,
    identity: `${input.workflow_id}:${input.operation_id}:${operation.key}`,
    now,
    action: operation.action,
    resources: operation.resources,
    record_limit: operation.records,
    binding,
    project_id: input.project_id,
  }));
  const refs = Object.fromEntries(operations.map((operation, index) => [
    operation.key,
    records[index]!.authorization_ref,
  ])) as Record<(typeof operations)[number]["key"], BoundRuntimeRecordRef>;
  return {
    contract_version: "contentmd.local-learning-runtime-authority/0.1.0" as const,
    workflow_id: input.workflow_id,
    project_id: input.project_id,
    stream_id: streamId,
    operation_id: input.operation_id,
    actor_ref: "actor.learning-status-operator",
    occurred_at: now,
    expected_head_digest: input.expected_head_digest,
    runtime_binding: binding,
    operation_authorization_refs: refs,
    authorization_records: records,
  };
}

export function learningStatusAuthorityFixture(input: {
  readonly project_id: string;
  readonly workflow_id: string;
  readonly expected_head_digest: string | null;
  readonly now?: string;
}) {
  return learningPhaseAuthorityFixture({
    ...input,
    operation_id: "operation.learning.status",
    include_inspection: true,
  });
}
