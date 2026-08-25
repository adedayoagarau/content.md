import { describe, expect, expectTypeOf, it } from "vitest";
import type {
  AuthorizedRuntimeOperation,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";

describe("runtime operation contract", () => {
  it("binds authority to exact identity, resources, controls, limits, and runtime", () => {
    const claims = {
      capability_id: "capability.fixture.runtime.001",
      tenant_ref: "tenant.fixture",
      principal_ref: "actor.fixture.user",
      workload_ref: "workload.contentmd",
      project_ref: "project.fixture",
      action: "runtime.event.append",
      resources: [{ resource_id: "stream.fixture", content_digest: "a".repeat(64) }],
      data_classes: ["public-synthetic"],
      policy_refs: [{ record_id: "policy.fixture", record_version: 1, content_digest: "b".repeat(64) }],
      capability_grant_ref: { record_id: "grant.fixture", record_version: 1, content_digest: "c".repeat(64) },
      control_refs: [{ record_id: "control.memory.fixture", record_version: 1, content_digest: "d".repeat(64) }],
      resource_limits: { calls: 1, bytes: 4096, duration_ms: 2000, records: 2, model_tokens: 0, browser_actions: 0, retries: 0 },
      issued_at: "2026-08-20T18:00:00.000Z",
      expires_at: "2026-08-20T18:15:00.000Z",
      revocation_checkpoint: { stream_id: "stream.governance.fixture", sequence: 8, head_digest: "e".repeat(64) },
      nonce: "nonce.fixture.runtime.001",
      nonce_mode: "single_use",
      runtime_binding_digest: "f".repeat(64),
      audit_target: { stream_id: "stream.audit.fixture", data_class: "project-metadata" },
    } satisfies RuntimeOperationClaims;

    expect(claims.nonce_mode).toBe("single_use");
    expect(claims.control_refs).toHaveLength(1);
    expectTypeOf<AuthorizedRuntimeOperation>().toBeObject();
  });
});
