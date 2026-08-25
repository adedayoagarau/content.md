import { mkdir, mkdtemp, readFile, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { DatabaseSync } from "node:sqlite";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import {
  LocalCleanup,
  LocalEnvironmentSecretResolver,
  LocalExporter,
  LocalIngress,
  LocalApprovalPause,
  LocalJobRunner,
  LocalProgressPublisher,
  LocalRuntimeHealth,
} from "@contentmd/runtime-local";
import type {
  AuthenticatedRuntimeSession,
  AuthorizedRuntimeOperation,
  AuthorizedSubscription,
  BoundRuntimeResource,
  CleanupRequest,
  ExportRequest,
  RuntimeIngressRequest,
  RuntimeOperationClaims,
  SchemaValidatedRpcRequest,
  SecretRef,
  GovernedJob,
  ApprovalPauseRequest,
  ProgressEvent,
} from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  NOW,
  authorityFixture,
  runtimeBindingFixture,
  runtimeClaims,
} from "./runtime-test-fixtures.js";

async function fixture() {
  const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-boundary-"));
  const authorization = authorityFixture(root);
  const binding = runtimeBindingFixture();
  let counter = 0;
  async function issue(input: {
    readonly action: string;
    readonly resources: readonly BoundRuntimeResource[];
    readonly data_classes?: readonly string[];
    readonly records?: number;
  }): Promise<AuthorizedRuntimeOperation> {
    counter += 1;
    const claims = runtimeClaims({
      capability_id: `capability.runtime.boundary.${counter}`,
      nonce: `nonce.runtime.boundary.${counter}`,
      action: input.action,
      resources: input.resources,
      data_classes: input.data_classes ?? ["runtime-metadata"],
      resource_limits: {
        calls: 1,
        bytes: 262_144,
        duration_ms: 5_000,
        records: input.records ?? 16,
        model_tokens: 0,
        browser_actions: 0,
        retries: 0,
      },
      runtime_binding_digest: binding.descriptor_digest,
    } satisfies Partial<RuntimeOperationClaims>);
    authorization.resolver.accept(claims);
    return authorization.authority.issue(AUTHORIZATION_REF, claims);
  }
  return { root, authorization, binding, issue };
}

function ingressRequest(): RuntimeIngressRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    request_id: "ingress-request.runtime.fixture",
    tenant_ref: "tenant.runtime.fixture",
    principal_attestation_ref: "attestation.runtime.fixture",
    workload_ref: "workload.contentmd",
    project_ref: "project.runtime.fixture",
    connection_ref: "connection.runtime.fixture",
    requested_at: NOW,
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function rpcRequest(input: unknown = { message: "hello" }): SchemaValidatedRpcRequest {
  return {
    schema_version: "0.1.0",
    request_id: "rpc-request.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: "f".repeat(64),
    method: "echo",
    input_schema_id: "schema.echo",
    input,
    input_digest: sha256Canonical(input),
  };
}

function subscription(): AuthorizedSubscription {
  const preimage = {
    schema_version: "0.1.0" as const,
    subscription_id: "subscription.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: "f".repeat(64),
    resource_refs: ["operation.runtime.fixture"],
    data_classes: ["runtime-metadata"],
    after_sequence: 0,
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function secretRef(sourceName = "CONTENTMD_TEST_SECRET"): SecretRef {
  const preimage = {
    schema_version: "0.1.0" as const,
    secret_ref_id: `secret-ref.runtime.${sourceName.toLowerCase()}`,
    project_id: "project.runtime.fixture",
    resolver_id: "runtime.local.environment",
    source_name: sourceName,
    allowed_adapter_ids: ["adapter.runtime.fixture"],
    purpose: "test_provider_authentication",
    issued_at: NOW,
    expires_at: "2026-08-23T13:00:00.000Z",
  };
  return { ...preimage, ref_digest: sha256Canonical(preimage) };
}

function exportRequest(exportId = "export.runtime.fixture"): ExportRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    export_id: exportId,
    project_id: "project.runtime.fixture",
    runtime_binding_digest: "f".repeat(64),
    checkpoint_ref: "replica-checkpoint.runtime.fixture",
    checkpoint_digest: "a".repeat(64),
    requested_at: NOW,
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function cleanupRequest(): CleanupRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    request_id: "cleanup-request.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: "f".repeat(64),
    object_classes: [
      "approval_pauses",
      "canonical_events",
      "completed_jobs",
      "expired_sessions",
      "progress_events",
      "replica_acknowledgements",
      "runtime_bindings",
      "cancelled_schedules",
    ].sort(),
    older_than: "2026-08-24T00:00:00.000Z",
    requested_at: NOW,
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function governedJob(bindingDigest: string): GovernedJob {
  const preimage = {
    schema_version: "0.1.0" as const,
    job_id: "job.runtime.cleanup",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    handler_id: "handler.runtime.cleanup",
    input_ref: "input.runtime.cleanup",
    input_digest: "b".repeat(64),
    requested_at: NOW,
  };
  return { ...preimage, job_digest: sha256Canonical(preimage) };
}

function approvalPause(bindingDigest: string): ApprovalPauseRequest {
  const preimage = {
    schema_version: "0.1.0" as const,
    pause_id: "approval-pause.runtime.cleanup",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    subject_ref: "job.runtime.cleanup",
    subject_digest: "c".repeat(64),
    approval_class: "content_change",
    requested_at: NOW,
    expires_at: "2026-08-25T00:00:00.000Z",
  };
  return { ...preimage, request_digest: sha256Canonical(preimage) };
}

function progressEvent(bindingDigest: string): ProgressEvent {
  const preimage = {
    schema_version: "0.1.0" as const,
    event_id: "progress-event.runtime.subscription",
    operation_id: "operation.runtime.fixture",
    project_id: "project.runtime.fixture",
    runtime_binding_digest: bindingDigest,
    sequence: 1,
    predecessor_digest: null,
    status: "running",
    message: "Visible authorized progress",
    occurred_at: NOW,
  };
  return { ...preimage, event_digest: sha256Canonical(preimage) };
}

describe("local governed boundary services", () => {
  it("keeps authenticated identity separate from invoke and subscription authority", async () => {
    const f = await fixture();
    let now = NOW;
    let handlerCalls = 0;
    const ingress = new LocalIngress({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      identity_resolver: {
        async resolve(attestationRef: string) {
          expect(attestationRef).toBe("attestation.runtime.fixture");
          return {
            status: "current" as const,
            tenant_ref: "tenant.runtime.fixture",
            principal_ref: "principal.runtime.fixture",
            workload_ref: "workload.contentmd",
            project_ref: "project.runtime.fixture",
            expires_at: "2026-08-23T12:30:00.000Z",
            identity_digest: "9".repeat(64),
          };
        },
      },
      input_schemas: {
        "schema.echo": (input: unknown) => (
          typeof input === "object" && input !== null && "message" in input
          && typeof input.message === "string"
        ),
      },
      handlers: {
        async echo(input: unknown) {
          handlerCalls += 1;
          return {
            output_ref: "rpc-output.runtime.fixture",
            output_digest: sha256Canonical(input),
          };
        },
      },
      clock: () => now,
    });
    const session = await ingress.authenticate(ingressRequest());
    const valid = rpcRequest();
    const invokeOperation = await f.issue({
      action: "runtime.ingress.invoke",
      resources: [{ resource_id: valid.request_id, content_digest: valid.input_digest }],
    });
    const malformed = rpcRequest({ wrong: true });
    await expect(ingress.invoke(session, malformed, invokeOperation))
      .rejects.toThrow("runtime_session_invalid:rpc_input_schema_invalid");
    expect(handlerCalls).toBe(0);
    await expect(ingress.invoke(session, valid, invokeOperation))
      .resolves.toMatchObject({ status: "completed", output_ref: "rpc-output.runtime.fixture" });
    expect(handlerCalls).toBe(1);

    const guessed = { ...session, session_digest: "0".repeat(64) } as AuthenticatedRuntimeSession;
    await expect(ingress.invoke(guessed, valid, {} as AuthorizedRuntimeOperation))
      .rejects.toThrow("runtime_session_invalid");
    await expect(ingress.subscribe(session, subscription(), {} as AuthorizedRuntimeOperation))
      .rejects.toThrow("runtime_binding_not_authorized");

    now = "2026-08-23T12:31:00.000Z";
    await expect(ingress.invoke(session, valid, {} as AuthorizedRuntimeOperation))
      .rejects.toThrow("runtime_session_invalid:session_expired");
    ingress.close();
    f.authorization.ledger.close();
  });

  it("leases only a declared environment secret and zeroes callback bytes", async () => {
    const f = await fixture();
    const resolver = new LocalEnvironmentSecretResolver({
      binding: f.binding,
      authority: f.authorization.authority,
      adapter_id: "adapter.runtime.fixture",
      allowed_source_names: ["CONTENTMD_TEST_SECRET"],
      read_environment: (name: string) => name === "CONTENTMD_TEST_SECRET" ? "super-secret-value" : undefined,
      clock: () => NOW,
    });
    const ref = secretRef();
    const lease = await resolver.resolve(ref, await f.issue({
      action: "runtime.secret.resolve",
      resources: [{ resource_id: ref.secret_ref_id, content_digest: ref.ref_digest }],
    }));
    expect(JSON.stringify(lease)).not.toContain("super-secret-value");
    expect(JSON.stringify(lease)).not.toContain("CONTENTMD_TEST_SECRET");
    let borrowed: Uint8Array | null = null;
    await expect(lease.withValue((bytes) => {
      borrowed = bytes;
      return new TextDecoder().decode(bytes);
    })).resolves.toBe("super-secret-value");
    expect([...borrowed!]).toEqual(new Array(borrowed!.byteLength).fill(0));

    const undeclared = secretRef("CONTENTMD_UNDECLARED_SECRET");
    await expect(resolver.resolve(undeclared, await f.issue({
      action: "runtime.secret.resolve",
      resources: [{ resource_id: undeclared.secret_ref_id, content_digest: undeclared.ref_digest }],
    }))).rejects.toThrow("runtime_secret_unavailable:secret_source_not_declared");
    f.authorization.ledger.close();
  });

  it("subscribes only after capability validation and exposes a read-only progress snapshot", async () => {
    const f = await fixture();
    const publisher = new LocalProgressPublisher({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const event = progressEvent(f.binding.descriptor_digest);
    await publisher.publish(event, await f.issue({
      action: "runtime.progress.publish",
      resources: [{ resource_id: event.operation_id, content_digest: event.event_digest }],
    }));
    publisher.close();
    const ingress = new LocalIngress({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      identity_resolver: {
        async resolve() {
          return {
            status: "current" as const,
            tenant_ref: "tenant.runtime.fixture",
            principal_ref: "principal.runtime.fixture",
            workload_ref: "workload.contentmd",
            project_ref: "project.runtime.fixture",
            expires_at: "2026-08-23T12:30:00.000Z",
            identity_digest: "9".repeat(64),
          };
        },
      },
      input_schemas: {},
      handlers: {},
      clock: () => NOW,
    });
    const session = await ingress.authenticate(ingressRequest());
    const request = subscription();
    const channel = await ingress.subscribe(session, request, await f.issue({
      action: "runtime.ingress.subscribe",
      resources: [{ resource_id: request.subscription_id, content_digest: request.request_digest }],
    }));
    const observed: ProgressEvent[] = [];
    for await (const item of channel) observed.push(item);
    expect(observed).toEqual([event]);
    await channel.close();
    ingress.close();
    f.authorization.ledger.close();
  });

  it("fails an export when any required artifact is forbidden", async () => {
    const f = await fixture();
    const request = exportRequest("export.runtime.forbidden");
    const exporter = new LocalExporter({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      snapshot_provider: {
        async collect() {
          return [{
            relative_path: "artifacts/private.bin",
            bytes: new TextEncoder().encode("private"),
            sha256_digest: sha256Canonical("private"),
            disposition: "required" as const,
            export_permission: "forbidden" as const,
          }];
        },
      },
      clock: () => NOW,
    });
    await expect(exporter.exportSnapshot(request, await f.issue({
      action: "runtime.export.create",
      resources: [{ resource_id: request.export_id, content_digest: request.request_digest }],
    }))).rejects.toThrow("runtime_export_incomplete:required_artifact_forbidden");
    await expect(stat(join(f.root, ".contentmd/runtime/exports", request.export_id)))
      .rejects.toMatchObject({ code: "ENOENT" });
    f.authorization.ledger.close();
  });

  it("writes a mode-0700 verified export with an independently hashed manifest", async () => {
    const f = await fixture();
    const request = exportRequest("export.runtime.complete");
    const bytes = new TextEncoder().encode("canonical export bytes");
    const byteDigest = await crypto.subtle.digest("SHA-256", bytes);
    const digest = [...new Uint8Array(byteDigest)].map((item) => item.toString(16).padStart(2, "0")).join("");
    const exporter = new LocalExporter({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      snapshot_provider: {
        async collect() {
          return [{
            relative_path: "events/canonical.jsonl",
            bytes,
            sha256_digest: digest,
            disposition: "required" as const,
            export_permission: "permitted" as const,
          }];
        },
      },
      clock: () => NOW,
    });
    const receipt = await exporter.exportSnapshot(request, await f.issue({
      action: "runtime.export.create",
      resources: [{ resource_id: request.export_id, content_digest: request.request_digest }],
    }));
    expect(receipt.status).toBe("completed");
    const exportRoot = join(f.root, ".contentmd/runtime/exports", request.export_id);
    expect((await stat(exportRoot)).mode & 0o777).toBe(0o700);
    expect(await readFile(join(exportRoot, "events/canonical.jsonl"))).toEqual(Buffer.from(bytes));
    const manifestText = await readFile(join(exportRoot, "manifest.json"), "utf8");
    const manifest = JSON.parse(manifestText) as { manifest_digest: string; entries: unknown[] };
    expect(canonicalJson(manifest)).toBe(manifestText);
    const { manifest_digest: supplied, ...preimage } = manifest;
    expect(supplied).toBe(sha256Canonical(preimage));
    expect(manifest.entries).toHaveLength(1);
    f.authorization.ledger.close();
  });

  it("reports health without exposing paths, content, or secrets", async () => {
    const f = await fixture();
    await mkdir(join(f.root, ".contentmd/runtime"), { recursive: true });
    new DatabaseSync(join(f.root, ".contentmd/runtime/runtime.sqlite")).close();
    const health = new LocalRuntimeHealth({
      project_root: f.root,
      authority: f.authorization.authority,
      checks: {
        "runtime.custom": async () => ({
          status: "pass" as const,
          detail: "secret-value at /private/user/path",
        }),
      },
      clock: () => NOW,
    });
    const report = await health.inspect(f.binding, await f.issue({
      action: "runtime.health.inspect",
      resources: [{ resource_id: f.binding.binding_id, content_digest: f.binding.descriptor_digest }],
    }));
    expect(report.status).toBe("healthy");
    expect(JSON.stringify(report)).not.toContain("secret-value");
    expect(JSON.stringify(report)).not.toContain("/private/user/path");
    expect(report.check_results.every((check) => /^[a-f0-9]{64}$/u.test(check.detail_digest))).toBe(true);
    f.authorization.ledger.close();
  });

  it("cleans only authorized operational classes and retains canonical classes", async () => {
    const f = await fixture();
    const cleanup = new LocalCleanup({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const request = cleanupRequest();
    const receipt = await cleanup.clean(request, await f.issue({
      action: "runtime.cleanup.run",
      resources: [{ resource_id: request.request_id, content_digest: request.request_digest }],
    }));
    expect(receipt.removed_refs).toEqual([]);
    expect(receipt.retained).toEqual([
      { object_ref: "approval_pauses", reason: "canonical_or_governed" },
      { object_ref: "canonical_events", reason: "canonical_or_governed" },
      { object_ref: "replica_acknowledgements", reason: "canonical_or_governed" },
      { object_ref: "runtime_bindings", reason: "canonical_or_governed" },
    ]);
    f.authorization.ledger.close();
  });

  it("removes an old completed job but retains an approval pause", async () => {
    const f = await fixture();
    const job = governedJob(f.binding.descriptor_digest);
    const runner = new LocalJobRunner({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      handlers: {
        "handler.runtime.cleanup": async () => ({ status: "completed", output_ref: null, output_digest: null }),
      },
      clock: () => NOW,
    });
    await runner.start(job, await f.issue({
      action: "runtime.job.start",
      resources: [{ resource_id: job.job_id, content_digest: job.job_digest }],
    }));
    await runner.run(job.job_id, await f.issue({
      action: "runtime.job.run",
      resources: [{ resource_id: job.job_id, content_digest: job.job_digest }],
    }));
    runner.close();
    const pause = approvalPause(f.binding.descriptor_digest);
    const approvals = new LocalApprovalPause({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    await approvals.pause(pause, await f.issue({
      action: "runtime.approval.pause",
      resources: [{ resource_id: pause.pause_id, content_digest: pause.subject_digest }],
    }));
    approvals.close();

    const preimage = {
      schema_version: "0.1.0" as const,
      request_id: "cleanup-request.runtime.rows",
      project_id: "project.runtime.fixture",
      runtime_binding_digest: f.binding.descriptor_digest,
      object_classes: ["approval_pauses", "completed_jobs"],
      older_than: "2026-08-24T00:00:00.000Z",
      requested_at: NOW,
    };
    const request = { ...preimage, request_digest: sha256Canonical(preimage) };
    const cleanup = new LocalCleanup({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    const receipt = await cleanup.clean(request, await f.issue({
      action: "runtime.cleanup.run",
      resources: [{ resource_id: request.request_id, content_digest: request.request_digest }],
      records: 2,
    }));
    expect(receipt.removed_refs).toEqual([`runtime_jobs:${job.job_id}`]);
    expect(receipt.retained).toEqual([{ object_ref: "approval_pauses", reason: "canonical_or_governed" }]);
    cleanup.close();

    const restoredApprovals = new LocalApprovalPause({
      project_root: f.root,
      binding: f.binding,
      authority: f.authorization.authority,
      clock: () => NOW,
    });
    await expect(restoredApprovals.inspect(pause.pause_id, await f.issue({
      action: "runtime.approval.inspect",
      resources: [{ resource_id: pause.pause_id, content_digest: pause.subject_digest }],
    }))).resolves.toMatchObject({ status: "pending" });
    restoredApprovals.close();
    f.authorization.ledger.close();
  });
});
