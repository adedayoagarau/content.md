import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  RUNTIME_INTERFACE_IDS,
  type RuntimeConformanceReceipt,
  type RuntimeDescriptor,
} from "@contentmd/runtime-sdk";
import {
  assertSupportedSqliteRuntime,
  createLocalRuntime,
} from "@contentmd/runtime-local";
import {
  authorityFixture,
  runtimeBindingFixture,
} from "./runtime-test-fixtures.js";

const NOW = "2026-08-23T12:00:00.000Z";

function implementationId(interfaceId: string): string {
  return `runtime.local.${interfaceId.slice("runtime.".length)}`;
}

function receipt(interfaceId: string): RuntimeConformanceReceipt {
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
    issued_at: NOW,
  };
  return { ...preimage, receipt_digest: sha256Canonical(preimage) };
}

function descriptor(receipts: readonly RuntimeConformanceReceipt[]): RuntimeDescriptor {
  const byInterface = new Map(receipts.map((item) => [item.interface_id, item]));
  const preimage = {
    descriptor_id: "runtime.descriptor.local.complete",
    descriptor_version: "0.1.0",
    runtime_id: "runtime.local",
    runtime_version: "0.1.0",
    integration_mode: "sidecar" as const,
    environment_family: "node-local",
    supported_host_versions: [">=24.14.0 <25"],
    interface_bindings: RUNTIME_INTERFACE_IDS.map((interfaceId) => {
      const item = byInterface.get(interfaceId)!;
      return {
        interface_id: interfaceId,
        interface_version: "0.1.0",
        status: "supported" as const,
        implementation_id: item.implementation_id,
        implementation_version: item.implementation_version,
        implementation_digest: item.implementation_digest,
        semantics_digest: sha256Canonical({
          contract_version: "contentmd.local-semantics/0.1.0",
          interface_id: interfaceId,
        }),
        conformance_receipt_ref: {
          record_id: item.receipt_id,
          record_version: 1,
          content_digest: item.receipt_digest,
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
  return { ...preimage, descriptor_digest: sha256Canonical(preimage) };
}

async function runtimeFixture(input: {
  receipts?: readonly RuntimeConformanceReceipt[];
  descriptor?: RuntimeDescriptor;
  node_version?: string;
} = {}) {
  const root = await mkdtemp(join(tmpdir(), "contentmd-local-runtime-"));
  const authority = authorityFixture(root);
  const receipts = input.receipts ?? RUNTIME_INTERFACE_IDS.map(receipt);
  const localDescriptor = input.descriptor ?? descriptor(receipts);
  const baseBinding = runtimeBindingFixture();
  const binding = {
    ...baseBinding,
    descriptor_ref: localDescriptor.descriptor_id,
    descriptor_digest: localDescriptor.descriptor_digest,
    interface_bindings: localDescriptor.interface_bindings,
    adapter_digests: [{ adapter_id: "runtime.local", adapter_digest: localDescriptor.descriptor_digest }],
    conformance_receipts: receipts.map((item) => ({
      record_id: item.receipt_id,
      record_version: 1,
      content_digest: item.receipt_digest,
    })),
  };
  const runtime = createLocalRuntime({
    project_root: root,
    descriptor: localDescriptor,
    conformance_receipts: receipts,
    binding,
    authority: authority.authority,
    identity_resolver: {
      async resolve() {
        return {
          verifier_id: "identity.fixture",
          tenant_ref: "tenant.fixture",
          principal_ref: "principal.fixture",
          workload_ref: "workload.contentmd",
          project_ref: binding.project_id,
          expires_at: "2026-08-23T13:00:00.000Z",
          identity_digest: "d".repeat(64),
        };
      },
    },
    job_handlers: {},
    rpc_input_schemas: {},
    rpc_handlers: {},
    allowed_secret_source_names: [],
    read_environment: () => undefined,
    permitted_data_classes: ["runtime-metadata"],
    blob_reference_resolver: { async currentReferences() { return []; } },
    replica_artifact_repository: { async verify() { return null; } },
    snapshot_provider: { async collect() { return []; } },
    clock: () => NOW,
    node_version: input.node_version ?? "24.14.0",
  });
  return { runtime, authority, receipts, descriptor: localDescriptor, binding };
}

describe("complete local runtime conformance", () => {
  it("accepts only the pinned Node 24 runtime range", () => {
    expect(() => assertSupportedSqliteRuntime("24.13.9")).toThrow("unsupported_runtime:node:24.13.9");
    expect(() => assertSupportedSqliteRuntime("24.14.0")).not.toThrow();
    expect(() => assertSupportedSqliteRuntime("24.22.0")).not.toThrow();
    expect(() => assertSupportedSqliteRuntime("25.0.0")).toThrow("unsupported_runtime:node:25.0.0");
  });

  it("assembles all focused capabilities only after complete conformance verification", async () => {
    const fixture = await runtimeFixture();
    expect(fixture.runtime.descriptor.interface_bindings.map((item) => item.interface_id))
      .toEqual(RUNTIME_INTERFACE_IDS);
    for (const capability of [
      "eventStore", "jobs", "approvals", "progress", "exporter", "blobs",
      "scheduler", "ingress", "secrets", "sync", "health", "cleanup",
    ] as const) {
      expect(fixture.runtime[capability]).toBeDefined();
    }
    fixture.runtime.close();
    fixture.authority.ledger.close();
  });

  it("rejects a descriptor claim without its exact receipt before creating runtime files", async () => {
    const receipts = RUNTIME_INTERFACE_IDS.map(receipt);
    const localDescriptor = descriptor(receipts);
    await expect(runtimeFixture({ receipts: receipts.slice(1), descriptor: localDescriptor }))
      .rejects.toThrow("runtime_capability_unsupported:conformance_receipt_missing:runtime.event-store");
  });

  it("rejects failed or digest-forged conformance receipts", async () => {
    const receipts = RUNTIME_INTERFACE_IDS.map(receipt);
    const failed = { ...receipts[0]!, failed_check_ids: ["runtime.event-store.failed"] };
    await expect(runtimeFixture({ receipts: [failed, ...receipts.slice(1)], descriptor: descriptor(receipts) }))
      .rejects.toThrow("runtime_capability_unsupported:conformance_receipt_digest_invalid");
  });
});
