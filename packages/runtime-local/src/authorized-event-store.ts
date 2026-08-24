import { createHash } from "node:crypto";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { ResourceLimits } from "@contentmd/governance";
import {
  SqliteEventStore,
  type Projector as MemoryProjector,
  type StoredEvent as MemoryStoredEvent,
} from "@contentmd/memory";
import {
  RuntimeError,
  type AppendEventCommand,
  type AppendEventTransaction,
  type AuthorizedAppendOnlyEventStore,
  type AuthorizedRuntimeOperation,
  type BoundRuntimeResource,
  type EventExportRequest,
  type EventStreamQuery,
  type EventTransactionReceipt,
  type Projector,
  type RuntimeBinding,
  type RuntimeEffectRequest,
  type RuntimeEventStoreFactory,
  type RuntimeOperationClaims,
  type RuntimeOperationVerifier,
  type StoredEvent,
  type StreamHead,
  type VerifiedBytes,
} from "@contentmd/runtime-sdk";
import { resolveRuntimePath } from "./paths.js";

export function eventStoreEffectClaims(
  _action: string,
  _resources: readonly BoundRuntimeResource[],
  _dataClasses: readonly string[],
  effectInput: unknown,
  records: number,
): ResourceLimits {
  return {
    calls: 1,
    bytes: Buffer.byteLength(canonicalJson(effectInput), "utf8"),
    duration_ms: 0,
    records,
    model_tokens: 0,
    browser_actions: 0,
    retries: 0,
  };
}

function runtimeEffect(
  interfaceId: string,
  method: string,
  action: string,
  resources: readonly BoundRuntimeResource[],
  dataClasses: readonly string[],
  input: unknown,
  records: number,
  runtimeBindingDigest: string,
): RuntimeEffectRequest {
  const preimage = {
    interface_id: interfaceId,
    method,
    action,
    resources,
    data_classes: dataClasses,
    requested_limits: eventStoreEffectClaims(action, resources, dataClasses, input, records),
    runtime_binding_digest: runtimeBindingDigest,
  };
  return { ...preimage, effect_digest: sha256Canonical(preimage) };
}

function toRuntimeEvent(event: MemoryStoredEvent): StoredEvent {
  return {
    ...event,
    payload_digest: sha256Canonical(event.payload),
  };
}

function byteDigest(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function requireProject(
  claims: RuntimeOperationClaims,
  binding: RuntimeBinding,
): void {
  if (claims.project_ref !== binding.project_id) {
    throw new RuntimeError("runtime_binding_not_authorized", "project_mismatch");
  }
}

export interface LocalAuthorizedEventStoreFactoryOptions {
  readonly project_root: string;
  readonly authority: RuntimeOperationVerifier;
  readonly permitted_data_classes: readonly string[];
  readonly clock: () => string;
}

class LocalAuthorizedAppendOnlyEventStore implements AuthorizedAppendOnlyEventStore {
  readonly #raw: SqliteEventStore;
  readonly #authority: RuntimeOperationVerifier;
  readonly #binding: RuntimeBinding;
  readonly #permittedDataClasses: readonly string[];
  readonly #clock: () => string;

  constructor(input: {
    readonly raw: SqliteEventStore;
    readonly authority: RuntimeOperationVerifier;
    readonly binding: RuntimeBinding;
    readonly permitted_data_classes: readonly string[];
    readonly clock: () => string;
  }) {
    this.#raw = input.raw;
    this.#authority = input.authority;
    this.#binding = input.binding;
    this.#permittedDataClasses = [...input.permitted_data_classes];
    this.#clock = input.clock;
  }

  async append(
    command: AppendEventCommand,
    operation: AuthorizedRuntimeOperation,
  ): Promise<StoredEvent> {
    const resources = [{
      resource_id: command.stream_id,
      content_digest: command.expected_head_digest,
    }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "append",
      "runtime.event.append",
      resources,
      [command.data_class],
      command,
      1,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    return toRuntimeEvent(await this.#raw.append(command));
  }

  async appendTransaction(
    transaction: AppendEventTransaction,
    operation: AuthorizedRuntimeOperation,
  ): Promise<EventTransactionReceipt> {
    const resources = transaction.commands.map((command) => ({
      resource_id: command.stream_id,
      content_digest: command.expected_head_digest,
    }));
    const dataClasses = [...new Set(transaction.commands.map((command) => command.data_class))].sort();
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "appendTransaction",
      "runtime.event.transaction",
      resources,
      dataClasses,
      transaction,
      transaction.commands.length,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    const events = await this.#raw.appendTransaction(transaction);
    const eventRefs = events.map((event) => event.event_id);
    const transactionDigest = sha256Canonical({
      transaction_id: transaction.transaction_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_refs: eventRefs,
    });
    const preimage = {
      schema_version: "0.1.0" as const,
      transaction_id: transaction.transaction_id,
      runtime_binding_digest: this.#binding.descriptor_digest,
      event_refs: eventRefs,
      transaction_digest: transactionDigest,
      status: "committed" as const,
      committed_at: this.#clock(),
    };
    return Object.freeze({
      ...preimage,
      event_refs: Object.freeze([...preimage.event_refs]),
      receipt_digest: sha256Canonical(preimage),
    });
  }

  async readStream(
    query: EventStreamQuery,
    operation: AuthorizedRuntimeOperation,
  ): Promise<readonly StoredEvent[]> {
    const resources = [{ resource_id: query.stream_id, content_digest: null }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "readStream",
      "runtime.event.read",
      resources,
      this.#permittedDataClasses,
      query,
      query.maximum_records,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    return (await this.#raw.readStream(query.stream_id, query.after_sequence))
      .slice(0, query.maximum_records)
      .map(toRuntimeEvent);
  }

  async getHead(
    streamId: string,
    operation: AuthorizedRuntimeOperation,
  ): Promise<StreamHead | null> {
    const input = { stream_id: streamId };
    const resources = [{ resource_id: streamId, content_digest: null }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "getHead",
      "runtime.event.head",
      resources,
      this.#permittedDataClasses,
      input,
      1,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    return this.#raw.getHead(streamId);
  }

  async rebuild<T>(
    projector: Projector<T>,
    operation: AuthorizedRuntimeOperation,
  ): Promise<T> {
    const input = { projector_id: projector.projector_id };
    const resources = [{ resource_id: projector.projector_id, content_digest: null }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "rebuild",
      "runtime.event.project",
      resources,
      this.#permittedDataClasses,
      input,
      1,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    const adapter: MemoryProjector<T> = {
      initial: () => projector.initial(),
      apply: (state, event) => projector.apply(state, toRuntimeEvent(event)),
    };
    return this.#raw.rebuild(adapter);
  }

  async exportCanonical(
    request: EventExportRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<VerifiedBytes> {
    const resources = [{
      resource_id: request.export_id,
      content_digest: request.request_digest,
    }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "exportCanonical",
      "runtime.event.export",
      resources,
      this.#permittedDataClasses,
      request,
      1,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    const bytes = await this.#raw.exportCanonical();
    return {
      schema_version: "0.1.0",
      artifact_id: request.export_id,
      media_type: "application/jsonl",
      byte_count: bytes.byteLength,
      sha256_digest: byteDigest(bytes),
      bytes,
    };
  }

  async close(operation: AuthorizedRuntimeOperation): Promise<void> {
    const input = { binding_id: this.#binding.binding_id };
    const resources = [{ resource_id: this.#binding.binding_id, content_digest: null }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "close",
      "runtime.event-store.close",
      resources,
      this.#permittedDataClasses,
      input,
      1,
      this.#binding.descriptor_digest,
    ));
    requireProject(claims, this.#binding);
    this.#raw.close();
  }
}

export class LocalAuthorizedEventStoreFactory implements RuntimeEventStoreFactory {
  readonly #root: string;
  readonly #authority: RuntimeOperationVerifier;
  readonly #permittedDataClasses: readonly string[];
  readonly #clock: () => string;

  constructor(options: LocalAuthorizedEventStoreFactoryOptions) {
    this.#root = options.project_root;
    this.#authority = options.authority;
    this.#permittedDataClasses = [...options.permitted_data_classes];
    this.#clock = options.clock;
  }

  async open(
    binding: RuntimeBinding,
    operation: AuthorizedRuntimeOperation,
  ): Promise<AuthorizedAppendOnlyEventStore> {
    const input = { binding_id: binding.binding_id };
    const resources = [{ resource_id: binding.binding_id, content_digest: null }];
    const claims = await this.#authority.resolveAndClaim(operation, runtimeEffect(
      "runtime.event-store",
      "open",
      "runtime.event-store.open",
      resources,
      this.#permittedDataClasses,
      input,
      1,
      binding.descriptor_digest,
    ));
    requireProject(claims, binding);
    const path = resolveRuntimePath(this.#root, ".contentmd/runtime/events.sqlite");
    await mkdir(dirname(path), { recursive: true });
    const raw = new SqliteEventStore(path, {
      permitted_data_classes: this.#permittedDataClasses,
    });
    return new LocalAuthorizedAppendOnlyEventStore({
      raw,
      authority: this.#authority,
      binding,
      permitted_data_classes: this.#permittedDataClasses,
      clock: this.#clock,
    });
  }
}
