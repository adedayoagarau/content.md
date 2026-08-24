import { sha256Canonical } from "@contentmd/core";
import type {
  ApprovalClass,
  AuthorizationInput,
  ControlType,
  DataControlDisposition,
  GovernancePolicy,
  ResourceLimits,
} from "@contentmd/governance";
import {
  eventStoreEffectClaims,
  finalizeGovernedRuntimeAuthorizationRecord,
  type GovernedRuntimeAuthorizationRecord,
} from "@contentmd/runtime-local";
import {
  RUNTIME_INTERFACE_IDS,
  type BoundRuntimeRecordRef,
  type BoundRuntimeResource,
  type RuntimeBinding,
  type RuntimeBindingDecision,
  type RuntimeConformanceReceipt,
  type RuntimeDescriptor,
  type RuntimeOperationClaims,
  type RuntimeProposalRecord,
} from "@contentmd/runtime-sdk";

export const BINDING_DATA_CLASSES = Object.freeze([
  "runtime_binding",
  "runtime_binding_decision",
] as const);

export interface RuntimeBindingProjectionFixture {
  readonly contract_version: "contentmd.runtime-binding-projection/0.1.0";
  readonly binding: RuntimeBinding;
  readonly binding_digest: string;
  readonly activation_event_ref: string;
  readonly activation_event_digest: string;
  readonly activation_sequence: number;
  readonly projected_at: string;
  readonly projection_digest: string;
}

function shifted(now: string, milliseconds: number): string {
  return new Date(Date.parse(now) + milliseconds).toISOString();
}

function implementationId(interfaceId: string): string {
  return `runtime.local.${interfaceId.slice("runtime.".length)}`;
}

function conformanceReceipt(interfaceId: string, now: string): RuntimeConformanceReceipt {
  const implementationDigest = sha256Canonical({
    contract_version: "contentmd.local-implementation/0.1.0",
    interface_id: interfaceId,
  });
  const fixtureTraceDigest = sha256Canonical({
    contract_version: "contentmd.local-conformance-trace/0.1.0",
    interface_id: interfaceId,
    check_ids: [`${interfaceId}.conformance`],
  });
  const receiptId = `runtime.conformance.${interfaceId.slice("runtime.".length).replaceAll("-", ".")}`;
  const preimage = {
    schema_version: "0.1.0" as const,
    receipt_id: receiptId,
    interface_id: interfaceId,
    interface_version: "0.1.0",
    implementation_id: implementationId(interfaceId),
    implementation_version: "0.1.0",
    implementation_digest: implementationDigest,
    fixture_trace_digest: fixtureTraceDigest,
    passed_check_ids: [`${interfaceId}.conformance`],
    failed_check_ids: [] as string[],
    node_version: "24.14.0",
    issued_at: now,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}

export function completeLocalConformance(now: string): {
  readonly descriptor: RuntimeDescriptor;
  readonly receipts: readonly RuntimeConformanceReceipt[];
} {
  const receipts = RUNTIME_INTERFACE_IDS.map((interfaceId) => conformanceReceipt(interfaceId, now));
  const byInterface = new Map(receipts.map((receipt) => [receipt.interface_id, receipt]));
  const preimage = {
    descriptor_id: "runtime.descriptor.local.complete",
    descriptor_version: "0.1.0",
    runtime_id: "runtime.local",
    runtime_version: "0.1.0",
    integration_mode: "sidecar" as const,
    environment_family: "node-local",
    supported_host_versions: [">=24.14.0 <25"],
    interface_bindings: RUNTIME_INTERFACE_IDS.map((interfaceId) => {
      const receipt = byInterface.get(interfaceId)!;
      return {
        interface_id: interfaceId,
        interface_version: "0.1.0",
        status: "supported" as const,
        implementation_id: receipt.implementation_id,
        implementation_version: receipt.implementation_version,
        implementation_digest: receipt.implementation_digest,
        semantics_digest: sha256Canonical({
          contract_version: "contentmd.local-semantics/0.1.0",
          interface_id: interfaceId,
        }),
        conformance_receipt_ref: {
          record_id: receipt.receipt_id,
          record_version: 1,
          content_digest: receipt.receipt_digest,
        },
      };
    }),
    consistency_model: "single_writer_strong",
    retry_semantics: "explicit_authorized_only",
    data_locations: ["adopter-controlled-local"],
    retention_behavior: "policy_bound",
    encryption_behavior: "platform-filesystem",
    identity_provider: "runtime.local.identity",
    authentication_provider: "runtime.local.authentication",
    telemetry_behavior: "minimized",
    package_requirements: [],
    infrastructure_requirements: [],
  };
  return {
    descriptor: { ...preimage, descriptor_digest: sha256Canonical(preimage) },
    receipts,
  };
}

function controls(): readonly DataControlDisposition[] {
  return ([
    "connection_authorization",
    "data_processing",
    "durable_memory",
    "telemetry",
  ] as const satisfies readonly ControlType[]).map((controlType) => ({
    control_type: controlType,
    applicability: "applicable" as const,
    record_ref: `control.runtime-binding.${controlType}`,
    status: "current" as const,
    rationale: `The ${controlType} control is current for this exact local binding.`,
  }));
}

function controlRefs(dispositions: readonly DataControlDisposition[]): readonly BoundRuntimeRecordRef[] {
  return dispositions.map((control) => ({
    record_id: control.record_ref!,
    record_version: 1,
    content_digest: sha256Canonical(control),
  }));
}

function authorizationRecord(input: {
  readonly ordinal: number;
  readonly namespace: string;
  readonly now: string;
  readonly project_id: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly effect_input: unknown;
  readonly records: number;
  readonly runtime_binding_digest: string;
  readonly controls: readonly DataControlDisposition[];
  readonly approval_class: ApprovalClass | null;
  readonly subject_ref: string;
  readonly subject_digest: string;
  readonly requires_readback?: boolean;
}): GovernedRuntimeAuthorizationRecord {
  const limits: ResourceLimits = eventStoreEffectClaims(
    input.action,
    input.resources,
    input.data_classes,
    input.effect_input,
    input.records,
  );
  const policy: GovernancePolicy = {
    policy_id: `policy.runtime-binding.${input.namespace}.${input.ordinal}`,
    policy_version: 1,
    status: "current",
    effective_at: shifted(input.now, -3_600_000),
    expires_at: shifted(input.now, 3_600_000),
    allowed_actions: [input.action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["runtime.local"],
    denied_adapters: [],
    permitted_data_classes: [...input.data_classes],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: limits,
    human_approval_actions: [],
    required_control_types: input.controls.map((control) => control.control_type),
  };
  const grant = {
    grant_id: `grant.runtime-binding.${input.namespace}.${input.ordinal}`,
    principal_ref: "principal.runtime-owner",
    workload_ref: "workload.contentmd",
    action: input.action,
    adapter_id: "runtime.local",
    resource_scope: input.resources.map((resource) => resource.resource_id),
    data_classes: [...input.data_classes],
    egress: "none" as const,
    max_limits: limits,
    issued_at: shifted(input.now, -300_000),
    expires_at: shifted(input.now, 900_000),
    revocation_state: "current" as const,
  };
  const capabilityId = `capability.runtime-binding.${input.namespace}.${input.ordinal}`;
  const approval = input.approval_class === null ? null : {
    approval_id: `approval.runtime-binding.${input.namespace}.${input.ordinal}`,
    approval_class: input.approval_class,
    subject_ref: capabilityId,
    subject_digest: input.subject_digest,
    status: "issued" as const,
    issued_at: shifted(input.now, -120_000),
    expires_at: shifted(input.now, 600_000),
    revocation_state: "current" as const,
  };
  const refs = controlRefs(input.controls);
  const claims: RuntimeOperationClaims = {
    capability_id: capabilityId,
    tenant_ref: "tenant.runtime.fixture",
    principal_ref: grant.principal_ref,
    workload_ref: grant.workload_ref,
    project_ref: input.project_id,
    action: input.action,
    resources: input.resources,
    data_classes: input.data_classes,
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
    control_refs: refs,
    resource_limits: limits,
    issued_at: grant.issued_at,
    expires_at: grant.expires_at,
    revocation_checkpoint: {
      stream_id: `governance.runtime-binding.${input.project_id}`,
      sequence: 1,
      head_digest: "a".repeat(64),
    },
    nonce: `nonce.runtime-binding.${input.namespace}.${input.ordinal}`,
    nonce_mode: "single_use",
    runtime_binding_digest: input.runtime_binding_digest,
    audit_target: {
      stream_id: `audit.runtime-binding.${input.project_id}`,
      data_class: "runtime_binding",
    },
  };
  const authorization: AuthorizationInput = {
    now: input.now,
    request: {
      operation_id: claims.capability_id,
      intent: "apply",
      action: input.action,
      adapter_id: "runtime.local",
      resource_scope: input.resources.map((resource) => resource.resource_id),
      data_classes: [...input.data_classes],
      egress: "none",
      requested_limits: limits,
      approval_class: input.approval_class,
      requires_readback: input.requires_readback ?? false,
      subject_digest: input.subject_digest,
    },
    policies: [policy],
    capability_grant: grant,
    approval,
    control_dispositions: [...input.controls],
    verification_plan_ref: input.requires_readback === true
      ? `verification-plan.runtime-binding.${input.namespace}.${input.ordinal}`
      : null,
    reliability_evidence: null,
  };
  return finalizeGovernedRuntimeAuthorizationRecord({ authorization, claims });
}

function eventDigest(input: {
  readonly event_id: string;
  readonly stream_id: string;
  readonly event_type: string;
  readonly occurred_at: string;
  readonly actor_ref: string;
  readonly data_class: string;
  readonly payload: unknown;
  readonly expected_head_digest: string | null;
}, sequence = 1): string {
  return sha256Canonical({
    event_id: input.event_id,
    stream_id: input.stream_id,
    sequence,
    schema_version: "0.1.0",
    event_type: input.event_type,
    occurred_at: input.occurred_at,
    actor_ref: input.actor_ref,
    data_class: input.data_class,
    payload: input.payload,
    predecessor_digest: input.expected_head_digest,
  });
}

export function governedBindingFixture(input: {
  readonly proposal: RuntimeProposalRecord;
  readonly descriptor: RuntimeDescriptor;
  readonly receipts: readonly RuntimeConformanceReceipt[];
  readonly now: string;
  readonly project_id?: string;
  readonly decision_id?: string;
  readonly decision_event_predecessor_digest?: string | null;
  readonly decision_event_sequence?: number;
  readonly current_projection?: RuntimeBindingProjectionFixture | null;
}) {
  const projectId = input.project_id ?? "project.runtime.fixture";
  const current = input.current_projection ?? null;
  const decisionId = input.decision_id ?? "runtime.binding-decision.fixture";
  const authorizationNamespace = sha256Canonical({ decision_id: decisionId }).slice(0, 16);
  const candidate = input.proposal.candidates.find((item) => (
    item.runtime_id === "runtime.local"
      && item.descriptor_ref === input.descriptor.descriptor_id
      && item.descriptor_digest === input.descriptor.descriptor_digest
  ))!;
  const dispositions = controls();
  const refs = controlRefs(dispositions);
  const conformanceRefs = input.receipts.map((receipt) => ({
    record_id: receipt.receipt_id,
    record_version: 1,
    content_digest: receipt.receipt_digest,
  }));
  const decisionAuthorization = authorizationRecord({
    ordinal: 1,
    namespace: authorizationNamespace,
    now: input.now,
    project_id: projectId,
    action: "runtime.binding.decide",
    resources: [{ resource_id: input.proposal.proposal_id, content_digest: input.proposal.proposal_digest }],
    data_classes: ["runtime_binding_decision"],
    effect_input: {
      proposal_id: input.proposal.proposal_id,
      proposal_digest: input.proposal.proposal_digest,
      selected_descriptor_ref: candidate.descriptor_ref,
      selected_descriptor_digest: candidate.descriptor_digest,
    },
    records: 1,
    runtime_binding_digest: input.descriptor.descriptor_digest,
    controls: dispositions,
    approval_class: "release",
    subject_ref: input.proposal.proposal_id,
    subject_digest: input.proposal.proposal_digest,
  });
  const decisionPreimage = {
    schema_version: "0.1.0" as const,
    decision_id: decisionId,
    project_id: projectId,
    proposal_ref: {
      record_id: input.proposal.proposal_id,
      record_version: 1,
      content_digest: input.proposal.proposal_digest,
    },
    proposal_digest: input.proposal.proposal_digest,
    selected_descriptor_ref: candidate.descriptor_ref,
    selected_descriptor_digest: candidate.descriptor_digest,
    canonical_replica_runtime_id: candidate.runtime_id,
    decision_status: "approved" as const,
    actor_ref: "actor.runtime-owner",
    principal_ref: "principal.runtime-owner",
    workload_ref: "workload.contentmd",
    rationale: "Use the conforming adopter-controlled local canonical replica.",
    decided_at: input.now,
    authorization_ref: decisionAuthorization.authorization_ref,
    authorization_digest: decisionAuthorization.authorization_ref.content_digest,
    conformance_receipt_refs: conformanceRefs,
    applicable_control_refs: refs,
  };
  const decision: RuntimeBindingDecision = {
    ...decisionPreimage,
    decision_digest: sha256Canonical(decisionPreimage),
  };
  const bindingVersion = (current?.binding.binding_version ?? 0) + 1;
  const predecessorBindingDigest = current?.binding_digest ?? null;
  const bindingIdentity = {
    contract_version: "contentmd.runtime-binding-identity/0.1.0",
    project_id: projectId,
    proposal_digest: input.proposal.proposal_digest,
    decision_digest: decision.decision_digest,
    descriptor_digest: input.descriptor.descriptor_digest,
    binding_version: bindingVersion,
    predecessor_binding_digest: predecessorBindingDigest,
  };
  const binding: RuntimeBinding = {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: `runtime.binding.${sha256Canonical(bindingIdentity)}`,
    binding_version: bindingVersion,
    project_id: projectId,
    status: "active",
    proposal_ref: input.proposal.proposal_id,
    proposal_digest: input.proposal.proposal_digest,
    decision_ref: decision.decision_id,
    decision_digest: decision.decision_digest,
    descriptor_ref: input.descriptor.descriptor_id,
    descriptor_digest: input.descriptor.descriptor_digest,
    integration_mode: input.descriptor.integration_mode,
    canonical_replica: {
      runtime_id: "runtime.local",
      data_location_id: "runtime.local.canonical",
    },
    interface_bindings: input.descriptor.interface_bindings,
    consistency_model: input.descriptor.consistency_model,
    transaction_boundary: "sqlite_immediate_transaction",
    idempotency_behavior: "event_id_plus_digest",
    retry_behavior: input.descriptor.retry_semantics,
    ambiguous_outcome_behavior: "read_before_retry",
    identity_provider: input.descriptor.identity_provider,
    authentication_provider: input.descriptor.authentication_provider,
    secret_resolver: "runtime.local.environment",
    data_locations: [{
      location_id: "runtime.local.canonical",
      data_class: "runtime-metadata",
      role: "canonical_replica",
    }],
    retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
    encryption: { at_rest: input.descriptor.encryption_behavior, in_transit: "not_applicable" },
    telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
    health_checks: ["runtime.node", "runtime.sqlite"],
    cleanup: { mode: "explicit_authorized" },
    export: { mode: "canonical_verified" },
    adapter_digests: [{
      adapter_id: "runtime.local",
      adapter_digest: input.descriptor.descriptor_digest,
    }],
    conformance_receipts: conformanceRefs,
    issued_at: input.now,
    predecessor_binding_digest: predecessorBindingDigest,
  };
  const bindingDigest = sha256Canonical(binding);
  const decisionStream = `runtime-binding-decisions.${projectId}`;
  const bindingStream = `runtime-bindings.${projectId}`;
  const decisionCommand = {
    event_id: `event.${decision.decision_id}`,
    stream_id: decisionStream,
    event_type: "runtime_binding_decided",
    occurred_at: input.now,
    actor_ref: decision.actor_ref,
    data_class: "runtime_binding_decision",
    payload: decision,
    expected_head_digest: input.decision_event_predecessor_digest ?? null,
  } as const;
  const activationPayload = {
    contract_version: "contentmd.runtime-binding-activation/0.1.0" as const,
    binding,
    binding_digest: bindingDigest,
    decision_event_ref: decisionCommand.event_id,
    decision_event_digest: eventDigest(decisionCommand, input.decision_event_sequence ?? 1),
    activated_at: input.now,
  };
  const activationCommand = {
    event_id: `event.runtime-binding-activated.${sha256Canonical(activationPayload)}`,
    stream_id: bindingStream,
    event_type: "runtime_binding_activated",
    occurred_at: input.now,
    actor_ref: decision.actor_ref,
    data_class: "runtime_binding",
    payload: activationPayload,
    expected_head_digest: current?.activation_event_digest ?? null,
  } as const;
  const activationSequence = (current?.activation_sequence ?? 0) + 1;
  const activationEventDigest = eventDigest(activationCommand, activationSequence);
  const projectionPreimage = {
    contract_version: "contentmd.runtime-binding-projection/0.1.0" as const,
    binding,
    binding_digest: bindingDigest,
    activation_event_ref: activationCommand.event_id,
    activation_event_digest: activationEventDigest,
    activation_sequence: activationSequence,
    projected_at: input.now,
  };
  const projection: RuntimeBindingProjectionFixture = {
    ...projectionPreimage,
    projection_digest: sha256Canonical(projectionPreimage),
  };
  const operationInputs = [
    {
      action: "runtime.event-store.open",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      data_classes: BINDING_DATA_CLASSES,
      effect_input: { binding_id: binding.binding_id },
      records: 1,
      approval_class: null,
      subject_ref: binding.binding_id,
      subject_digest: bindingDigest,
      requires_readback: false,
    },
    {
      action: "runtime.event.read",
      resources: [{ resource_id: decisionStream, content_digest: null }],
      data_classes: BINDING_DATA_CLASSES,
      effect_input: { stream_id: decisionStream, after_sequence: 0, maximum_records: 1024 },
      records: 1024,
      approval_class: null,
      subject_ref: decision.decision_id,
      subject_digest: decision.decision_digest,
      requires_readback: false,
    },
    {
      action: "runtime.event.append",
      resources: [{
        resource_id: bindingStream,
        content_digest: current?.activation_event_digest ?? null,
      }],
      data_classes: ["runtime_binding"],
      effect_input: activationCommand,
      records: 1,
      approval_class: "release" as const,
      subject_ref: binding.binding_id,
      subject_digest: bindingDigest,
      requires_readback: true,
    },
    {
      action: "runtime.event.read",
      resources: [{ resource_id: bindingStream, content_digest: null }],
      data_classes: BINDING_DATA_CLASSES,
      effect_input: {
        stream_id: bindingStream,
        after_sequence: current?.activation_sequence ?? 0,
        maximum_records: 1,
      },
      records: 1,
      approval_class: null,
      subject_ref: activationCommand.event_id,
      subject_digest: activationEventDigest,
      requires_readback: false,
    },
    {
      action: "runtime.binding.project",
      resources: [{
        resource_id: ".contentmd/runtime/current-runtime-binding.json",
        content_digest: current?.projection_digest ?? null,
      }],
      data_classes: ["runtime_binding"],
      effect_input: projection,
      records: 1,
      approval_class: "mutation" as const,
      subject_ref: binding.binding_id,
      subject_digest: bindingDigest,
      requires_readback: true,
    },
    {
      action: "runtime.event-store.close",
      resources: [{ resource_id: binding.binding_id, content_digest: null }],
      data_classes: BINDING_DATA_CLASSES,
      effect_input: { binding_id: binding.binding_id },
      records: 1,
      approval_class: null,
      subject_ref: binding.binding_id,
      subject_digest: bindingDigest,
      requires_readback: false,
    },
  ] as const;
  const authorizationRecords = [
    decisionAuthorization,
    ...operationInputs.map((operation, index) => authorizationRecord({
      ordinal: index + 2,
      namespace: authorizationNamespace,
      now: input.now,
      project_id: projectId,
      action: operation.action,
      resources: operation.resources,
      data_classes: operation.data_classes,
      effect_input: operation.effect_input,
      records: operation.records,
      runtime_binding_digest: input.descriptor.descriptor_digest,
      controls: dispositions,
      approval_class: operation.approval_class,
      subject_ref: operation.subject_ref,
      subject_digest: operation.subject_digest,
      requires_readback: operation.requires_readback,
    })),
  ];
  return {
    decision,
    decision_command: decisionCommand,
    activation_command: activationCommand,
    projection,
    binding,
    binding_digest: bindingDigest,
    authority_bundle: {
      contract_version: "contentmd.runtime-binding-authority/0.1.0" as const,
      conformance_receipts: input.receipts,
      authorization_records: authorizationRecords,
    },
  };
}
