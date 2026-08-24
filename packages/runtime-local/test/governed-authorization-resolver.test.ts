import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import type { AuthorizationInput, GovernancePolicy } from "@contentmd/governance";
import {
  GovernedRuntimeAuthorizationResolver,
  LocalRuntimeOperationAuthority,
  LocalRuntimeSqliteLedger,
  finalizeGovernedRuntimeAuthorizationRecord,
} from "@contentmd/runtime-local";
import type { RuntimeOperationClaims } from "@contentmd/runtime-sdk";
import { NOW, runtimeClaims, runtimeEffect } from "./runtime-test-fixtures.js";

function authorizationRecord(claims: RuntimeOperationClaims) {
  const policy: GovernancePolicy = {
    policy_id: "policy.runtime.fixture",
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-23T11:00:00.000Z",
    expires_at: "2026-08-23T13:00:00.000Z",
    allowed_actions: [claims.action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["runtime.local"],
    denied_adapters: [],
    permitted_data_classes: [...claims.data_classes],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: { ...claims.resource_limits },
    human_approval_actions: [],
    required_control_types: [],
  };
  const grant = {
    grant_id: claims.capability_grant_ref.record_id,
    principal_ref: claims.principal_ref,
    workload_ref: claims.workload_ref,
    action: claims.action,
    adapter_id: "runtime.local",
    resource_scope: claims.resources.map((resource) => resource.resource_id),
    data_classes: [...claims.data_classes],
    egress: "none" as const,
    max_limits: { ...claims.resource_limits },
    issued_at: claims.issued_at,
    expires_at: claims.expires_at,
    revocation_state: "current" as const,
  };
  const authorization: AuthorizationInput = {
    now: NOW,
    request: {
      operation_id: claims.capability_id,
      intent: "apply",
      action: claims.action,
      adapter_id: "runtime.local",
      resource_scope: claims.resources.map((resource) => resource.resource_id),
      data_classes: [...claims.data_classes],
      egress: "none",
      requested_limits: { ...claims.resource_limits },
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

describe("governed runtime authorization resolver", () => {
  it("issues and rechecks a capability only from a complete current governance record", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-governed-runtime-resolver-"));
    const claims = runtimeClaims({
      policy_refs: [{
        record_id: "policy.runtime.fixture",
        record_version: 1,
        content_digest: sha256Canonical({
          policy_id: "policy.runtime.fixture",
          policy_version: 1,
          status: "current",
          effective_at: "2026-08-23T11:00:00.000Z",
          expires_at: "2026-08-23T13:00:00.000Z",
          allowed_actions: ["runtime.event.append"],
          denied_actions: [],
          review_actions: [],
          allowed_adapters: ["runtime.local"],
          denied_adapters: [],
          permitted_data_classes: ["runtime-metadata"],
          denied_data_classes: [],
          permitted_egress: ["none"],
          max_limits: runtimeClaims().resource_limits,
          human_approval_actions: [],
          required_control_types: [],
        }),
      }],
      capability_grant_ref: {
        record_id: "grant.runtime.fixture",
        record_version: 1,
        content_digest: sha256Canonical({
          grant_id: "grant.runtime.fixture",
          principal_ref: "principal.runtime.fixture",
          workload_ref: "workload.contentmd",
          action: "runtime.event.append",
          adapter_id: "runtime.local",
          resource_scope: ["stream.runtime.fixture"],
          data_classes: ["runtime-metadata"],
          egress: "none",
          max_limits: runtimeClaims().resource_limits,
          issued_at: "2026-08-23T11:55:00.000Z",
          expires_at: "2026-08-23T12:15:00.000Z",
          revocation_state: "current",
        }),
      },
      control_refs: [],
    });
    const record = authorizationRecord(claims);
    const resolver = new GovernedRuntimeAuthorizationResolver({
      records: [record],
      clock: () => NOW,
    });
    const ledger = new LocalRuntimeSqliteLedger(join(root, "ledger.sqlite"));
    const authority = new LocalRuntimeOperationAuthority({
      ledger,
      authorization_resolver: resolver,
      clock: () => NOW,
      verifier_id: "runtime.local.operation-authority",
    });

    const operation = await authority.issue(record.authorization_ref, claims);
    await expect(authority.resolveAndClaim(operation, runtimeEffect(claims)))
      .resolves.toEqual(claims);
    ledger.close();
  });

  it("rejects a governance record whose claimed authorization digest was forged", async () => {
    const claims = runtimeClaims();
    const record = authorizationRecord(claims);
    expect(() => new GovernedRuntimeAuthorizationResolver({
      records: [{
        ...record,
        authorization_ref: { ...record.authorization_ref, content_digest: "0".repeat(64) },
      }],
      clock: () => NOW,
    })).toThrow("runtime_binding_not_authorized");
  });
});
