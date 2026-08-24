import { describe, expect, expectTypeOf, it } from "vitest";
import {
  RUNTIME_INTERFACE_IDS,
  type RuntimeDescriptor,
  type RuntimeInterfaceBinding,
} from "@contentmd/runtime-sdk";

describe("runtime descriptor contract", () => {
  it("describes exact supported implementations and explicit unsupported interfaces", () => {
    const digest = "a".repeat(64);
    const supported = {
      interface_id: "runtime.event-store",
      interface_version: "0.1.0",
      status: "supported",
      implementation_id: "runtime.local.event-store",
      implementation_version: "0.1.0",
      implementation_digest: digest,
      semantics_digest: digest,
      conformance_receipt_ref: {
        record_id: "runtime.conformance.fixture",
        record_version: 1,
        content_digest: digest,
      },
    } satisfies RuntimeInterfaceBinding;
    const unsupported = {
      interface_id: "runtime.remote-rpc",
      interface_version: "0.1.0",
      status: "unsupported",
      failure_code: "runtime_capability_unsupported",
    } satisfies RuntimeInterfaceBinding;
    const descriptor = {
      descriptor_id: "runtime.descriptor.local",
      descriptor_version: "0.1.0",
      descriptor_digest: digest,
      runtime_id: "runtime.local",
      runtime_version: "0.1.0",
      integration_mode: "sidecar",
      environment_family: "node-local",
      supported_host_versions: [">=24.14.0 <25"],
      interface_bindings: [supported, unsupported],
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
    } satisfies RuntimeDescriptor;

    expect(RUNTIME_INTERFACE_IDS).toContain("runtime.event-store");
    expect(descriptor.interface_bindings).toEqual([supported, unsupported]);
    expectTypeOf(descriptor).toMatchTypeOf<RuntimeDescriptor>();
    expect(descriptor).not.toHaveProperty("supports_jobs");
  });
});
