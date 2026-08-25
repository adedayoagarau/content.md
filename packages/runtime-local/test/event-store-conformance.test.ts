import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  LocalAuthorizedEventStoreFactory,
  eventStoreEffectClaims,
} from "@contentmd/runtime-local";
import type {
  AuthorizedRuntimeOperation,
  BoundRuntimeResource,
  RuntimeBinding,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";
import {
  AUTHORIZATION_REF,
  NOW,
  authorizedEventStoreFixture,
  authorityFixture,
  runtimeClaims,
} from "./runtime-test-fixtures.js";

function binding(): RuntimeBinding {
  const digest = "f".repeat(64);
  return {
    contract_version: "contentmd.runtime-binding/0.1.0",
    binding_id: "runtime.binding.fixture",
    binding_version: 1,
    project_id: "project.runtime.fixture",
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

describe("authorized local event store", () => {
  it("commits an authorized transaction atomically and returns a digest-bound receipt", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-transaction-"));
    const fixture = await authorizedEventStoreFixture({
      root,
      project_id: "project.runtime.fixture",
      permitted_data_classes: ["runtime-metadata"],
    });
    const first = {
      event_id: "event.runtime.transaction.first",
      stream_id: "stream.runtime.transaction",
      event_type: "runtime_transaction_recorded",
      occurred_at: NOW,
      actor_ref: "actor.runtime.fixture",
      data_class: "runtime-metadata",
      payload: { order: 1 },
      expected_head_digest: null,
    };
    const firstEventDigest = sha256Canonical({
      event_id: first.event_id,
      stream_id: first.stream_id,
      sequence: 1,
      schema_version: "0.1.0",
      event_type: first.event_type,
      occurred_at: first.occurred_at,
      actor_ref: first.actor_ref,
      data_class: first.data_class,
      payload: first.payload,
      predecessor_digest: null,
    });
    const second = {
      ...first,
      event_id: "event.runtime.transaction.second",
      payload: { order: 2 },
      expected_head_digest: firstEventDigest,
    };
    const transaction = {
      transaction_id: "transaction.runtime.fixture",
      commands: [first, second],
    };
    const resources = transaction.commands.map((command) => ({
      resource_id: command.stream_id,
      content_digest: command.expected_head_digest,
    }));

    try {
      const receipt = await fixture.store.appendTransaction(transaction, await fixture.issue(
        "runtime.event.transaction",
        resources,
        ["runtime-metadata"],
        transaction,
        2,
      ));
      const eventRefs = [first.event_id, second.event_id];
      const transactionDigest = sha256Canonical({
        transaction_id: transaction.transaction_id,
        runtime_binding_digest: fixture.binding.descriptor_digest,
        event_refs: eventRefs,
      });
      const receiptPreimage = {
        schema_version: "0.1.0",
        transaction_id: transaction.transaction_id,
        runtime_binding_digest: fixture.binding.descriptor_digest,
        event_refs: eventRefs,
        transaction_digest: transactionDigest,
        status: "committed",
        committed_at: NOW,
      };
      expect(receipt).toEqual({
        ...receiptPreimage,
        receipt_digest: sha256Canonical(receiptPreimage),
      });

      const query = {
        stream_id: first.stream_id,
        after_sequence: 0,
        maximum_records: 10,
      };
      await expect(fixture.store.readStream(query, await fixture.issue(
        "runtime.event.read",
        [{ resource_id: first.stream_id, content_digest: null }],
        ["runtime-metadata"],
        query,
        10,
      ))).resolves.toMatchObject([
        { event_id: first.event_id, sequence: 1 },
        { event_id: second.event_id, sequence: 2 },
      ]);
    } finally {
      await fixture.close();
    }
  });

  it("requires a distinct exact operation for open, append, read, head, export, and close", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-store-"));
    const fixture = authorityFixture(root);
    const runtimeBinding = binding();
    const factory = new LocalAuthorizedEventStoreFactory({
      project_root: root,
      authority: fixture.authority,
      permitted_data_classes: ["runtime-metadata"],
      clock: () => NOW,
    });
    let counter = 0;
    async function operation(
      action: string,
      resources: readonly BoundRuntimeResource[],
      dataClasses: readonly string[],
      effectInput: unknown,
      records: number,
    ): Promise<AuthorizedRuntimeOperation> {
      counter += 1;
      const requested = eventStoreEffectClaims(action, resources, dataClasses, effectInput, records);
      const claims = runtimeClaims({
        capability_id: `capability.runtime.store.${counter}`,
        nonce: `nonce.runtime.store.${counter}`,
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
      } satisfies Partial<RuntimeOperationClaims>);
      fixture.resolver.accept(claims);
      return fixture.authority.issue(AUTHORIZATION_REF, claims);
    }

    const openInput = { binding_id: runtimeBinding.binding_id };
    const store = await factory.open(runtimeBinding, await operation(
      "runtime.event-store.open",
      [{ resource_id: runtimeBinding.binding_id, content_digest: null }],
      ["runtime-metadata"],
      openInput,
      1,
    ));
    const command = {
      event_id: "event.runtime.fixture",
      stream_id: "stream.runtime.fixture",
      event_type: "runtime_fixture_recorded",
      occurred_at: NOW,
      actor_ref: "actor.runtime.fixture",
      data_class: "runtime-metadata",
      payload: { value: "fixture" },
      expected_head_digest: null,
    };
    const stored = await store.append(command, await operation(
      "runtime.event.append",
      [{ resource_id: command.stream_id, content_digest: null }],
      [command.data_class],
      command,
      1,
    ));
    expect(stored.payload_digest).toBe(sha256Canonical(command.payload));

    const query = { stream_id: command.stream_id, after_sequence: 0, maximum_records: 10 };
    await expect(store.readStream(query, await operation(
      "runtime.event.read",
      [{ resource_id: command.stream_id, content_digest: null }],
      [command.data_class],
      query,
      query.maximum_records,
    ))).resolves.toHaveLength(1);
    await expect(store.getHead(command.stream_id, await operation(
      "runtime.event.head",
      [{ resource_id: command.stream_id, content_digest: null }],
      [command.data_class],
      { stream_id: command.stream_id },
      1,
    ))).resolves.toMatchObject({ event_id: command.event_id, sequence: 1 });

    const exportRequest = {
      schema_version: "0.1.0" as const,
      export_id: "export.runtime.fixture",
      project_id: runtimeBinding.project_id,
      stream_ids: [command.stream_id],
      after_checkpoints: [],
      requested_at: NOW,
      request_digest: "1".repeat(64),
    };
    const exported = await store.exportCanonical(exportRequest, await operation(
      "runtime.event.export",
      [{ resource_id: exportRequest.export_id, content_digest: exportRequest.request_digest }],
      [command.data_class],
      exportRequest,
      1,
    ));
    expect(exported.byte_count).toBeGreaterThan(0);
    expect(exported.sha256_digest).toMatch(/^[a-f0-9]{64}$/);

    await store.close(await operation(
      "runtime.event-store.close",
      [{ resource_id: runtimeBinding.binding_id, content_digest: null }],
      ["runtime-metadata"],
      { binding_id: runtimeBinding.binding_id },
      1,
    ));
  });

  it("does not touch the database when append authorization is wrong", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-runtime-store-denied-"));
    const fixture = authorityFixture(root);
    const runtimeBinding = binding();
    const factory = new LocalAuthorizedEventStoreFactory({
      project_root: root,
      authority: fixture.authority,
      permitted_data_classes: ["runtime-metadata"],
      clock: () => NOW,
    });
    const openResources = [{ resource_id: runtimeBinding.binding_id, content_digest: null }];
    const openClaims = runtimeClaims({
      capability_id: "capability.runtime.open",
      nonce: "nonce.runtime.open",
      action: "runtime.event-store.open",
      resources: openResources,
      data_classes: ["runtime-metadata"],
    });
    fixture.resolver.accept(openClaims);
    const store = await factory.open(runtimeBinding, await fixture.authority.issue(
      AUTHORIZATION_REF,
      openClaims,
    ));
    const wrongClaims = runtimeClaims({
      capability_id: "capability.runtime.wrong-append",
      nonce: "nonce.runtime.wrong-append",
      action: "runtime.event.append",
      resources: [{ resource_id: "stream.other", content_digest: null }],
    });
    fixture.resolver.accept(wrongClaims);
    await expect(store.append({
      event_id: "event.denied",
      stream_id: "stream.runtime.fixture",
      event_type: "runtime_fixture_recorded",
      occurred_at: NOW,
      actor_ref: "actor.runtime.fixture",
      data_class: "runtime-metadata",
      payload: { denied: true },
      expected_head_digest: null,
    }, await fixture.authority.issue(AUTHORIZATION_REF, wrongClaims)))
      .rejects.toThrow("runtime_binding_not_authorized");
  });
});
