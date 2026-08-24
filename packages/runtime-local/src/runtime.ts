import { mkdirSync } from "node:fs";
import { dirname } from "node:path";
import { DatabaseSync, type SQLOutputValue } from "node:sqlite";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { assertSupportedSqliteRuntime } from "@contentmd/memory";
import {
  RuntimeError,
  RUNTIME_INTERFACE_IDS,
  type BoundRuntimeResource,
  type RuntimeBinding,
  type RuntimeConformanceReceipt,
  type RuntimeDescriptor,
  type RuntimeEffectRequest,
  type RuntimeOperationClaims,
  type RuntimeOperationVerifier,
  type RuntimeProfile,
} from "@contentmd/runtime-sdk";
import { LocalAuthorizedEventStoreFactory } from "./authorized-event-store.js";
import { LocalBlobStore, type BlobReferenceResolver } from "./blob-store.js";
import { LocalCleanup } from "./cleanup.js";
import { LocalExporter, type LocalSnapshotProvider } from "./exporter.js";
import { LocalRuntimeHealth, type LocalHealthCheck } from "./health.js";
import {
  LocalIngress,
  type LocalIdentityResolver,
  type LocalInputSchema,
  type LocalRpcHandler,
} from "./ingress.js";
import type { LocalJobHandler } from "./job-runner.js";
import { resolveRuntimePath } from "./paths.js";
import { LocalEnvironmentSecretResolver } from "./secret-resolver.js";
import {
  LocalRuntimeSynchronizer,
  type ReplicaArtifactRepository,
} from "./synchronizer.js";
import { createLocalWorkflowServices } from "./workflow-services.js";

export { assertSupportedSqliteRuntime };

export interface CreateLocalRuntimeOptions {
  readonly project_root: string;
  readonly descriptor: RuntimeDescriptor;
  readonly conformance_receipts: readonly RuntimeConformanceReceipt[];
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly identity_resolver: LocalIdentityResolver;
  readonly job_handlers: Readonly<Record<string, LocalJobHandler>>;
  readonly rpc_input_schemas: Readonly<Record<string, LocalInputSchema>>;
  readonly rpc_handlers: Readonly<Record<string, LocalRpcHandler>>;
  readonly allowed_secret_source_names: readonly string[];
  readonly read_environment: (name: string) => string | undefined;
  readonly permitted_data_classes: readonly string[];
  readonly blob_reference_resolver: BlobReferenceResolver;
  readonly replica_artifact_repository: ReplicaArtifactRepository;
  readonly snapshot_provider: LocalSnapshotProvider;
  readonly health_checks?: Readonly<Record<string, LocalHealthCheck>>;
  readonly clock: () => string;
  readonly node_version?: string;
}

export interface LocalRuntime extends RuntimeProfile {
  readonly binding: RuntimeBinding;
  close(): void;
}

export interface VerifyLocalRuntimeConformanceInput {
  readonly descriptor: RuntimeDescriptor;
  readonly conformance_receipts: readonly RuntimeConformanceReceipt[];
  readonly now: string;
  readonly node_version?: string;
}

function compareRuntimeText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function verifyConformanceReceipt(receipt: RuntimeConformanceReceipt, now: string): void {
  const { receipt_digest: suppliedDigest, ...preimage } = receipt;
  if (!isRuntimeDigest(suppliedDigest) || suppliedDigest !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_capability_unsupported", "conformance_receipt_digest_invalid");
  }
  if (receipt.schema_version !== "0.1.0"
    || receipt.receipt_id.length === 0
    || receipt.interface_id.length === 0
    || receipt.interface_version !== "0.1.0"
    || receipt.implementation_id.length === 0
    || receipt.implementation_version !== "0.1.0"
    || !isRuntimeDigest(receipt.implementation_digest)
    || !isRuntimeDigest(receipt.fixture_trace_digest)
    || receipt.passed_check_ids.length === 0
    || receipt.failed_check_ids.length !== 0
    || new Set(receipt.passed_check_ids).size !== receipt.passed_check_ids.length
    || [...receipt.passed_check_ids].sort(compareRuntimeText)
      .some((item, index) => item !== receipt.passed_check_ids[index])
    || Date.parse(receipt.issued_at) > Date.parse(now)) {
    throw new RuntimeError("runtime_capability_unsupported", "conformance_receipt_failed");
  }
  try {
    assertSupportedSqliteRuntime(receipt.node_version);
  } catch {
    throw new RuntimeError("runtime_capability_unsupported", "conformance_receipt_runtime_unsupported");
  }
}

export function verifyLocalRuntimeConformance(
  input: VerifyLocalRuntimeConformanceInput,
): void {
  assertSupportedSqliteRuntime(input.node_version);
  const { descriptor_digest: suppliedDescriptorDigest, ...descriptorPreimage } = input.descriptor;
  if (!isRuntimeDigest(suppliedDescriptorDigest)
    || suppliedDescriptorDigest !== sha256Canonical(descriptorPreimage)
    || input.descriptor.runtime_id !== "runtime.local"
    || input.descriptor.descriptor_version !== "0.1.0"
    || input.descriptor.runtime_version !== "0.1.0"
    || !(input.descriptor.integration_mode === "embedded"
      || input.descriptor.integration_mode === "sidecar")) {
    throw new RuntimeError("runtime_capability_unsupported", "local_descriptor_invalid");
  }
  const receiptById = new Map<string, RuntimeConformanceReceipt>();
  for (const receipt of input.conformance_receipts) {
    if (receiptById.has(receipt.receipt_id)) {
      throw new RuntimeError("runtime_capability_unsupported", "conformance_receipt_duplicate");
    }
    verifyConformanceReceipt(receipt, input.now);
    receiptById.set(receipt.receipt_id, receipt);
  }
  if (input.descriptor.interface_bindings.length !== RUNTIME_INTERFACE_IDS.length) {
    throw new RuntimeError("runtime_capability_unsupported", "local_interface_set_incomplete");
  }
  for (const [index, interfaceId] of RUNTIME_INTERFACE_IDS.entries()) {
    const binding = input.descriptor.interface_bindings[index];
    if (binding === undefined || binding.interface_id !== interfaceId || binding.status !== "supported") {
      throw new RuntimeError("runtime_capability_unsupported", `local_interface_claim_invalid:${interfaceId}`);
    }
    const receipt = receiptById.get(binding.conformance_receipt_ref.record_id);
    if (receipt === undefined) {
      throw new RuntimeError("runtime_capability_unsupported", `conformance_receipt_missing:${interfaceId}`);
    }
    if (binding.conformance_receipt_ref.record_version !== 1
      || binding.conformance_receipt_ref.content_digest !== receipt.receipt_digest
      || receipt.interface_id !== binding.interface_id
      || receipt.interface_version !== binding.interface_version
      || receipt.implementation_id !== binding.implementation_id
      || receipt.implementation_version !== binding.implementation_version
      || receipt.implementation_digest !== binding.implementation_digest) {
      throw new RuntimeError("runtime_capability_unsupported", `conformance_receipt_binding_invalid:${interfaceId}`);
    }
  }
}

function verifyLocalRuntimeInputs(options: CreateLocalRuntimeOptions): void {
  const now = options.clock();
  verifyLocalRuntimeConformance({
    descriptor: options.descriptor,
    conformance_receipts: options.conformance_receipts,
    now,
    ...(options.node_version === undefined ? {} : { node_version: options.node_version }),
  });
  if (options.binding.status !== "active"
    || options.binding.descriptor_ref !== options.descriptor.descriptor_id
    || options.binding.descriptor_digest !== options.descriptor.descriptor_digest
    || options.binding.interface_bindings.length !== options.descriptor.interface_bindings.length) {
    throw new RuntimeError("runtime_binding_not_authorized", "local_runtime_binding_invalid");
  }
  const expectedReceiptRefs = options.descriptor.interface_bindings.map((binding) => {
    if (binding.status !== "supported") {
      throw new RuntimeError("runtime_capability_unsupported", "local_interface_unsupported");
    }
    return binding.conformance_receipt_ref;
  });
  if (canonicalJson(options.binding.interface_bindings) !== canonicalJson(options.descriptor.interface_bindings)
    || canonicalJson(options.binding.conformance_receipts) !== canonicalJson(expectedReceiptRefs)) {
    throw new RuntimeError("runtime_binding_not_authorized", "local_runtime_binding_evidence_mismatch");
  }
}

export function createLocalRuntime(options: CreateLocalRuntimeOptions): LocalRuntime {
  assertSupportedSqliteRuntime(options.node_version);
  verifyLocalRuntimeInputs(options);
  const workflow = createLocalWorkflowServices({
    project_root: options.project_root,
    binding: options.binding,
    authority: options.authority,
    handlers: options.job_handlers,
    clock: options.clock,
  });
  const ingress = new LocalIngress({
    project_root: options.project_root,
    binding: options.binding,
    authority: options.authority,
    identity_resolver: options.identity_resolver,
    input_schemas: options.rpc_input_schemas,
    handlers: options.rpc_handlers,
    clock: options.clock,
  });
  const sync = new LocalRuntimeSynchronizer({
    project_root: options.project_root,
    binding: options.binding,
    authority: options.authority,
    permitted_data_classes: options.permitted_data_classes,
    artifact_repository: options.replica_artifact_repository,
    clock: options.clock,
  });
  const cleanup = new LocalCleanup({
    project_root: options.project_root,
    binding: options.binding,
    authority: options.authority,
    clock: options.clock,
  });
  let closed = false;
  return Object.freeze({
    descriptor: options.descriptor,
    binding: options.binding,
    eventStore: new LocalAuthorizedEventStoreFactory({
      project_root: options.project_root,
      authority: options.authority,
      permitted_data_classes: options.permitted_data_classes,
      clock: options.clock,
    }),
    jobs: workflow.jobs,
    approvals: workflow.approvals,
    progress: workflow.progress,
    exporter: new LocalExporter({
      project_root: options.project_root,
      binding: options.binding,
      authority: options.authority,
      snapshot_provider: options.snapshot_provider,
      clock: options.clock,
    }),
    blobs: new LocalBlobStore({
      project_root: options.project_root,
      binding: options.binding,
      authority: options.authority,
      permitted_data_classes: options.permitted_data_classes,
      reference_resolver: options.blob_reference_resolver,
      clock: options.clock,
    }),
    scheduler: workflow.scheduler,
    ingress,
    secrets: new LocalEnvironmentSecretResolver({
      binding: options.binding,
      authority: options.authority,
      adapter_id: "runtime.local",
      allowed_source_names: options.allowed_secret_source_names,
      read_environment: options.read_environment,
      clock: options.clock,
    }),
    sync,
    health: new LocalRuntimeHealth({
      project_root: options.project_root,
      authority: options.authority,
      ...(options.health_checks === undefined ? {} : { checks: options.health_checks }),
      clock: options.clock,
    }),
    cleanup,
    close(): void {
      if (closed) return;
      closed = true;
      cleanup.close();
      sync.close();
      ingress.close();
      workflow.close();
    },
  });
}

export type WorkflowSqlRow = Record<string, SQLOutputValue>;

export function isRuntimeDigest(value: unknown): value is string {
  return typeof value === "string" && /^[a-f0-9]{64}$/u.test(value);
}

export function requireRuntimeText(value: unknown, detail: string): asserts value is string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RuntimeError("runtime_binding_not_authorized", detail);
  }
}

export function requireRuntimeTime(value: unknown, detail: string): asserts value is string {
  requireRuntimeText(value, detail);
  if (!Number.isFinite(Date.parse(value))) {
    throw new RuntimeError("runtime_binding_not_authorized", detail);
  }
}

export function requireRuntimeBinding(
  claims: RuntimeOperationClaims,
  binding: RuntimeBinding,
): void {
  if (binding.status !== "active"
    || claims.project_ref !== binding.project_id
    || claims.runtime_binding_digest !== binding.descriptor_digest) {
    throw new RuntimeError("runtime_binding_not_authorized", "workflow_binding_mismatch");
  }
}

export function workflowEffect(input: {
  readonly interface_id: string;
  readonly method: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly effect_input: unknown;
  readonly runtime_binding_digest: string;
  readonly data_classes?: readonly string[];
  readonly records?: number;
}): RuntimeEffectRequest {
  const preimage = {
    interface_id: input.interface_id,
    method: input.method,
    action: input.action,
    resources: input.resources,
    data_classes: input.data_classes ?? ["runtime-metadata"],
    requested_limits: {
      calls: 1,
      bytes: Buffer.byteLength(canonicalJson(input.effect_input), "utf8"),
      duration_ms: 0,
      records: input.records ?? 1,
      model_tokens: 0,
      browser_actions: 0,
      retries: 0,
    },
    runtime_binding_digest: input.runtime_binding_digest,
  };
  return { ...preimage, effect_digest: sha256Canonical(preimage) };
}

export function openWorkflowDatabase(projectRoot: string): DatabaseSync {
  assertSupportedSqliteRuntime();
  const path = resolveRuntimePath(projectRoot, ".contentmd/runtime/runtime.sqlite");
  mkdirSync(dirname(path), { recursive: true, mode: 0o700 });
  const database = new DatabaseSync(path);
  database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA trusted_schema = OFF;");
  database.exec(`
    CREATE TABLE IF NOT EXISTS runtime_workflow_audit (
      event_id TEXT PRIMARY KEY,
      service TEXT NOT NULL,
      resource_id TEXT NOT NULL,
      from_status TEXT,
      to_status TEXT NOT NULL,
      occurred_at TEXT NOT NULL,
      transition_digest TEXT NOT NULL UNIQUE
    );
  `);
  return database;
}

export function appendWorkflowAudit(database: DatabaseSync, input: {
  readonly service: string;
  readonly resource_id: string;
  readonly from_status: string | null;
  readonly to_status: string;
  readonly occurred_at: string;
  readonly transition_input: unknown;
}): void {
  const transitionDigest = sha256Canonical({
    contract_version: "contentmd.runtime-workflow-transition/0.1.0",
    service: input.service,
    resource_id: input.resource_id,
    from_status: input.from_status,
    to_status: input.to_status,
    occurred_at: input.occurred_at,
    transition_input: input.transition_input,
  });
  database.prepare(`
    INSERT OR IGNORE INTO runtime_workflow_audit (
      event_id, service, resource_id, from_status, to_status,
      occurred_at, transition_digest
    ) VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(
    `workflow-audit.${transitionDigest}`,
    input.service,
    input.resource_id,
    input.from_status,
    input.to_status,
    input.occurred_at,
    transitionDigest,
  );
}

export function requiredRowString(row: WorkflowSqlRow, key: string): string {
  const value = row[key];
  if (typeof value !== "string") {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `workflow_row_invalid_${key}`);
  }
  return value;
}

export function optionalRowString(row: WorkflowSqlRow, key: string): string | null {
  const value = row[key];
  if (value === null) return null;
  if (typeof value !== "string") {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `workflow_row_invalid_${key}`);
  }
  return value;
}

export function requiredRowInteger(row: WorkflowSqlRow, key: string): number {
  const value = row[key];
  if (typeof value !== "number" || !Number.isSafeInteger(value)) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", `workflow_row_invalid_${key}`);
  }
  return value;
}

export function withImmediateTransaction<T>(database: DatabaseSync, operation: () => T): T {
  database.exec("BEGIN IMMEDIATE");
  try {
    const result = operation();
    database.exec("COMMIT");
    return result;
  } catch (error) {
    try { database.exec("ROLLBACK"); } catch { /* transaction was already unavailable */ }
    throw error;
  }
}
