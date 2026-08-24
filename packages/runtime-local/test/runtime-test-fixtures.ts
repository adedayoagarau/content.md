import { join } from "node:path";
import { sha256Canonical } from "@contentmd/core";
import {
  LocalAuthorizedEventStoreFactory,
  LocalRuntimeOperationAuthority,
  LocalRuntimeSqliteLedger,
  eventStoreEffectClaims,
  type RuntimeAuthorizationResolver,
} from "@contentmd/runtime-local";
import type {
  AuthorizedAppendOnlyEventStore,
  AuthorizedRuntimeOperation,
  BoundRuntimeRecordRef,
  BoundRuntimeResource,
  RuntimeBinding,
  RuntimeEffectRequest,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";

export const NOW = "2026-08-23T12:00:00.000Z";
export const AUTHORIZATION_REF: BoundRuntimeRecordRef = {
  record_id: "authorization.runtime.fixture",
  record_version: 1,
  content_digest: "a".repeat(64),
};

export function runtimeClaims(
  overrides: Partial<RuntimeOperationClaims> = {},
): RuntimeOperationClaims {
  return {
    capability_id: "capability.runtime.fixture",
    tenant_ref: "tenant.runtime.fixture",
    principal_ref: "principal.runtime.fixture",
    workload_ref: "workload.contentmd",
    project_ref: "project.runtime.fixture",
    action: "runtime.event.append",
    resources: [{ resource_id: "stream.runtime.fixture", content_digest: null }],
    data_classes: ["runtime-metadata"],
    policy_refs: [{
      record_id: "policy.runtime.fixture",
      record_version: 1,
      content_digest: "b".repeat(64),
    }],
    capability_grant_ref: {
      record_id: "grant.runtime.fixture",
      record_version: 1,
      content_digest: "c".repeat(64),
    },
    control_refs: [{
      record_id: "control.runtime.fixture",
      record_version: 1,
      content_digest: "d".repeat(64),
    }],
    resource_limits: {
      calls: 1,
      bytes: 4096,
      duration_ms: 2000,
      records: 2,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    },
    issued_at: "2026-08-23T11:55:00.000Z",
    expires_at: "2026-08-23T12:15:00.000Z",
    revocation_checkpoint: {
      stream_id: "stream.governance.fixture",
      sequence: 8,
      head_digest: "e".repeat(64),
    },
    nonce: "nonce.runtime.fixture",
    nonce_mode: "single_use",
    runtime_binding_digest: "f".repeat(64),
    audit_target: {
      stream_id: "stream.audit.fixture",
      data_class: "runtime-metadata",
    },
    ...overrides,
  };
}

export function runtimeEffect(
  claims: RuntimeOperationClaims,
  overrides: Partial<RuntimeEffectRequest> = {},
): RuntimeEffectRequest {
  const effect = {
    interface_id: "runtime.event-store",
    method: "append",
    action: claims.action,
    resources: claims.resources,
    data_classes: claims.data_classes,
    requested_limits: {
      calls: 1,
      bytes: 128,
      duration_ms: 1000,
      records: 1,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    },
    runtime_binding_digest: claims.runtime_binding_digest,
    ...overrides,
  };
  return {
    ...effect,
    effect_digest: sha256Canonical(effect),
  };
}

export class MutableAuthorizationResolver implements RuntimeAuthorizationResolver {
  currentness: "current" | "revoked" | "unknown" = "current";
  disposition: "allow" | "deny" | "review" = "allow";
  expectedClaimsDigest = "";

  accept(claims: RuntimeOperationClaims): void {
    this.expectedClaimsDigest = sha256Canonical(claims);
  }

  async resolve(ref: BoundRuntimeRecordRef) {
    if (ref.record_id !== AUTHORIZATION_REF.record_id
      || ref.record_version !== AUTHORIZATION_REF.record_version
      || ref.content_digest !== AUTHORIZATION_REF.content_digest) {
      throw new Error("authorization_not_found");
    }
    return {
      disposition: this.disposition,
      claims_digest: this.expectedClaimsDigest,
      authorization_digest: AUTHORIZATION_REF.content_digest,
    } as const;
  }

  async recheckCurrentness(_claims: RuntimeOperationClaims) {
    return this.currentness;
  }
}

export function authorityFixture(root: string) {
  let now = NOW;
  const resolver = new MutableAuthorizationResolver();
  const ledger = new LocalRuntimeSqliteLedger(join(root, "runtime.sqlite"));
  const authority = new LocalRuntimeOperationAuthority({
    ledger,
    authorization_resolver: resolver,
    clock: () => now,
    verifier_id: "runtime.local.operation-authority",
  });
  return {
    authority,
    ledger,
    resolver,
    setNow(value: string) { now = value; },
  };
}

export function runtimeBindingFixture(
  projectId = "project.runtime.fixture",
): RuntimeBinding {
  const digest = "f".repeat(64);
  return {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: `runtime.binding.${projectId}`,
    binding_version: 1,
    project_id: projectId,
    status: "active",
    proposal_ref: "runtime.proposal.fixture",
    proposal_digest: digest,
    decision_ref: "runtime.binding-decision.fixture",
    decision_digest: digest,
    descriptor_ref: "runtime.descriptor.local",
    descriptor_digest: digest,
    integration_mode: "sidecar",
    canonical_replica: {
      runtime_id: "runtime.local",
      data_location_id: "runtime.local.canonical",
    },
    interface_bindings: [],
    consistency_model: "single_writer_strong",
    transaction_boundary: "sqlite_immediate_transaction",
    idempotency_behavior: "event_id_plus_digest",
    retry_behavior: "explicit_authorized_only",
    ambiguous_outcome_behavior: "read_before_retry",
    identity_provider: "runtime.local.identity",
    authentication_provider: "runtime.local.authentication",
    secret_resolver: "runtime.local.environment",
    data_locations: [{
      location_id: "runtime.local.canonical",
      data_class: "runtime-metadata",
      role: "canonical_replica",
    }],
    retention: { mode: "policy_bound", policy_ref: "policy.runtime.retention" },
    encryption: { at_rest: "platform-filesystem", in_transit: "not_applicable" },
    telemetry: { mode: "minimized", data_classes: ["runtime-metadata"] },
    health_checks: ["runtime.node", "runtime.sqlite"],
    cleanup: { mode: "explicit_authorized" },
    export: { mode: "canonical_verified" },
    adapter_digests: [{ adapter_id: "runtime.local", adapter_digest: digest }],
    conformance_receipts: [{
      record_id: "runtime.conformance.fixture",
      record_version: 1,
      content_digest: digest,
    }],
    issued_at: NOW,
    predecessor_binding_digest: null,
  };
}

export interface AuthorizedEventStoreFixture {
  readonly store: AuthorizedAppendOnlyEventStore;
  readonly binding: RuntimeBinding;
  issue(
    action: string,
    resources: readonly BoundRuntimeResource[],
    dataClasses: readonly string[],
    effectInput: unknown,
    records: number,
  ): Promise<AuthorizedRuntimeOperation>;
  close(): Promise<void>;
}

export async function authorizedEventStoreFixture(input: {
  readonly root: string;
  readonly project_id: string;
  readonly permitted_data_classes: readonly string[];
}): Promise<AuthorizedEventStoreFixture> {
  const fixture = authorityFixture(input.root);
  const binding = runtimeBindingFixture(input.project_id);
  const factory = new LocalAuthorizedEventStoreFactory({
    project_root: input.root,
    authority: fixture.authority,
    permitted_data_classes: input.permitted_data_classes,
    clock: () => NOW,
  });
  let counter = 0;
  async function issue(
    action: string,
    resources: readonly BoundRuntimeResource[],
    dataClasses: readonly string[],
    effectInput: unknown,
    records: number,
  ): Promise<AuthorizedRuntimeOperation> {
    counter += 1;
    const requested = eventStoreEffectClaims(action, resources, dataClasses, effectInput, records);
    const claims = runtimeClaims({
      capability_id: `capability.runtime.fixture.${counter}`,
      nonce: `nonce.runtime.fixture.${counter}`,
      project_ref: input.project_id,
      action,
      resources,
      data_classes: dataClasses,
      resource_limits: {
        calls: 1,
        bytes: Math.max(requested.bytes, 4096),
        duration_ms: 2000,
        records: Math.max(records, 1),
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      runtime_binding_digest: binding.descriptor_digest,
    });
    fixture.resolver.accept(claims);
    return fixture.authority.issue(AUTHORIZATION_REF, claims);
  }
  const openInput = { binding_id: binding.binding_id };
  const store = await factory.open(binding, await issue(
    "runtime.event-store.open",
    [{ resource_id: binding.binding_id, content_digest: null }],
    input.permitted_data_classes,
    openInput,
    1,
  ));
  return {
    store,
    binding,
    issue,
    async close() {
      await store.close(await issue(
        "runtime.event-store.close",
        [{ resource_id: binding.binding_id, content_digest: null }],
        input.permitted_data_classes,
        { binding_id: binding.binding_id },
        1,
      ));
      fixture.ledger.close();
    },
  };
}
