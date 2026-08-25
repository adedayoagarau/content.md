import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  type AuthorizationInput,
  type DataControlDisposition,
  type GovernancePolicy,
} from "@contentmd/governance";
import {
  RuntimeError,
  type BoundRuntimeRecordRef,
  type RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";
import type { RuntimeAuthorizationResolver } from "./operation-authority.js";

export interface GovernedRuntimeAuthorizationRecord {
  readonly contract_version: "contentmd.governed-runtime-authorization/0.1.0";
  readonly authorization_ref: BoundRuntimeRecordRef;
  readonly authorization: AuthorizationInput;
  readonly claims: RuntimeOperationClaims;
}

function fail(detail: string): never {
  throw new RuntimeError("runtime_binding_not_authorized", detail);
}

function recordPreimage(input: {
  readonly authorization: AuthorizationInput;
  readonly claims: RuntimeOperationClaims;
}) {
  return {
    contract_version: "contentmd.governed-runtime-authorization/0.1.0" as const,
    authorization: input.authorization,
    claims: input.claims,
  };
}

export function finalizeGovernedRuntimeAuthorizationRecord(input: {
  readonly authorization: AuthorizationInput;
  readonly claims: RuntimeOperationClaims;
}): GovernedRuntimeAuthorizationRecord {
  const preimage = recordPreimage(input);
  return {
    ...preimage,
    authorization_ref: {
      record_id: `runtime-authorization.${input.claims.capability_id}`,
      record_version: 1,
      content_digest: sha256Canonical(preimage),
    },
  };
}

function policyRef(policy: GovernancePolicy): BoundRuntimeRecordRef {
  return {
    record_id: policy.policy_id,
    record_version: policy.policy_version,
    content_digest: sha256Canonical(policy),
  };
}

function controlRef(control: DataControlDisposition): BoundRuntimeRecordRef | null {
  if (control.record_ref === null) return null;
  return {
    record_id: control.record_ref,
    record_version: 1,
    content_digest: sha256Canonical(control),
  };
}

function verifyRecord(record: GovernedRuntimeAuthorizationRecord): void {
  const expected = finalizeGovernedRuntimeAuthorizationRecord({
    authorization: record.authorization,
    claims: record.claims,
  });
  if (record.contract_version !== expected.contract_version
    || canonicalJson(record.authorization_ref) !== canonicalJson(expected.authorization_ref)) {
    fail("authorization_record_digest_mismatch");
  }
  const authorization = record.authorization;
  const claims = record.claims;
  const grant = authorization.capability_grant;
  const expectedResources = claims.resources.map((resource) => resource.resource_id);
  const expectedPolicyRefs = authorization.policies.map(policyRef);
  const expectedControlRefs = authorization.control_dispositions
    .map(controlRef)
    .filter((value): value is BoundRuntimeRecordRef => value !== null);
  if (authorization.request.operation_id !== claims.capability_id
    || authorization.request.action !== claims.action
    || authorization.request.adapter_id !== "runtime.local"
    || authorization.request.egress !== "none"
    || canonicalJson(authorization.request.resource_scope) !== canonicalJson(expectedResources)
    || canonicalJson(authorization.request.data_classes) !== canonicalJson(claims.data_classes)
    || canonicalJson(authorization.request.requested_limits) !== canonicalJson(claims.resource_limits)
    || canonicalJson(claims.policy_refs) !== canonicalJson(expectedPolicyRefs)
    || canonicalJson(claims.control_refs) !== canonicalJson(expectedControlRefs)
    || grant === null
    || grant.grant_id !== claims.capability_grant_ref.record_id
    || claims.capability_grant_ref.record_version !== 1
    || claims.capability_grant_ref.content_digest !== sha256Canonical(grant)
    || grant.principal_ref !== claims.principal_ref
    || grant.workload_ref !== claims.workload_ref
    || grant.action !== claims.action
    || grant.adapter_id !== "runtime.local"
    || canonicalJson(grant.resource_scope) !== canonicalJson(expectedResources)
    || canonicalJson(grant.data_classes) !== canonicalJson(claims.data_classes)
    || canonicalJson(grant.max_limits) !== canonicalJson(claims.resource_limits)
    || grant.issued_at !== claims.issued_at
    || grant.expires_at !== claims.expires_at
    || claims.nonce_mode !== "single_use") {
    fail("authorization_record_claims_mismatch");
  }
}

export interface GovernedRuntimeAuthorizationResolverOptions {
  readonly records: readonly GovernedRuntimeAuthorizationRecord[];
  readonly clock: () => string;
}

export class GovernedRuntimeAuthorizationResolver implements RuntimeAuthorizationResolver {
  readonly #byRecordId = new Map<string, GovernedRuntimeAuthorizationRecord>();
  readonly #byCapabilityId = new Map<string, GovernedRuntimeAuthorizationRecord>();
  readonly #clock: () => string;

  constructor(options: GovernedRuntimeAuthorizationResolverOptions) {
    this.#clock = options.clock;
    for (const source of options.records) {
      const record = structuredClone(source);
      verifyRecord(record);
      if (this.#byRecordId.has(record.authorization_ref.record_id)
        || this.#byCapabilityId.has(record.claims.capability_id)) {
        fail("authorization_record_duplicate");
      }
      this.#byRecordId.set(record.authorization_ref.record_id, record);
      this.#byCapabilityId.set(record.claims.capability_id, record);
    }
  }

  async resolve(ref: BoundRuntimeRecordRef) {
    const record = this.#byRecordId.get(ref.record_id);
    if (record === undefined || canonicalJson(record.authorization_ref) !== canonicalJson(ref)) {
      fail("authorization_not_found");
    }
    verifyRecord(record);
    const decision = authorizeOperation({
      ...record.authorization,
      now: this.#clock(),
    });
    return {
      disposition: decision.disposition,
      claims_digest: sha256Canonical(record.claims),
      authorization_digest: record.authorization_ref.content_digest,
    };
  }

  async recheckCurrentness(
    claims: RuntimeOperationClaims,
  ): Promise<"current" | "revoked" | "unknown"> {
    const record = this.#byCapabilityId.get(claims.capability_id);
    if (record === undefined || canonicalJson(record.claims) !== canonicalJson(claims)) {
      return "unknown";
    }
    verifyRecord(record);
    const grantState = record.authorization.capability_grant?.revocation_state ?? "unknown";
    if (grantState === "revoked") return "revoked";
    if (grantState === "unknown") return "unknown";
    return authorizeOperation({ ...record.authorization, now: this.#clock() }).disposition === "allow"
      ? "current"
      : "unknown";
  }
}
