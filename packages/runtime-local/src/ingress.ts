import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthenticatedRuntimeSession,
  type AuthorizedRuntimeOperation,
  type AuthorizedSubscription,
  type ProgressEvent,
  type ReadonlyEventChannel,
  type RpcReceipt,
  type RuntimeBinding,
  type RuntimeIngress,
  type RuntimeIngressRequest,
  type RuntimeOperationVerifier,
  type SchemaValidatedRpcRequest,
} from "@contentmd/runtime-sdk";
import {
  isRuntimeDigest,
  openWorkflowDatabase,
  requiredRowString,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  type WorkflowSqlRow,
  withImmediateTransaction,
  workflowEffect,
} from "./runtime.js";

const INGRESS_VERIFIER_ID = "runtime.local.ingress";

export interface LocalIdentityAttestation {
  readonly status: "current" | "revoked" | "unknown";
  readonly tenant_ref: string;
  readonly principal_ref: string;
  readonly workload_ref: string;
  readonly project_ref: string;
  readonly expires_at: string;
  readonly identity_digest: string;
}

export interface LocalIdentityResolver {
  resolve(attestationRef: string): Promise<LocalIdentityAttestation>;
}

export interface LocalRpcHandlerResult {
  readonly output_ref: string | null;
  readonly output_digest: string | null;
}

export type LocalRpcHandler = (input: unknown) => Promise<LocalRpcHandlerResult>;
export type LocalInputSchema = (input: unknown) => boolean;

export interface LocalIngressOptions {
  readonly project_root: string;
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly identity_resolver: LocalIdentityResolver;
  readonly input_schemas: Readonly<Record<string, LocalInputSchema>>;
  readonly handlers: Readonly<Record<string, LocalRpcHandler>>;
  readonly clock: () => string;
}

interface StoredSession {
  readonly session_ref: string;
  readonly session_digest: string;
  readonly verifier_id: string;
  readonly tenant_ref: string;
  readonly principal_ref: string;
  readonly workload_ref: string;
  readonly project_ref: string;
  readonly connection_ref: string;
  readonly identity_digest: string;
  readonly issued_at: string;
  readonly expires_at: string;
}

function validateIngressRequest(request: RuntimeIngressRequest): void {
  requireRuntimeText(request.request_id, "ingress_request_id_invalid");
  requireRuntimeText(request.tenant_ref, "ingress_tenant_invalid");
  requireRuntimeText(request.principal_attestation_ref, "ingress_attestation_invalid");
  requireRuntimeText(request.workload_ref, "ingress_workload_invalid");
  requireRuntimeText(request.project_ref, "ingress_project_invalid");
  requireRuntimeText(request.connection_ref, "ingress_connection_invalid");
  requireRuntimeTime(request.requested_at, "ingress_requested_at_invalid");
  if (request.schema_version !== "0.1.0" || !isRuntimeDigest(request.request_digest)) {
    throw new RuntimeError("runtime_session_invalid", "ingress_request_contract_invalid");
  }
  const { request_digest: supplied, ...preimage } = request;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_session_invalid", "ingress_request_digest_invalid");
  }
}

function validateRpcRequest(
  request: SchemaValidatedRpcRequest,
  binding: RuntimeBinding,
  inputSchemas: Readonly<Record<string, LocalInputSchema>>,
): void {
  requireRuntimeText(request.request_id, "rpc_request_id_invalid");
  requireRuntimeText(request.method, "rpc_method_invalid");
  requireRuntimeText(request.input_schema_id, "rpc_input_schema_id_invalid");
  if (request.schema_version !== "0.1.0"
    || request.project_id !== binding.project_id
    || request.runtime_binding_digest !== binding.descriptor_digest
    || !isRuntimeDigest(request.input_digest)
    || request.input_digest !== sha256Canonical(request.input)) {
    throw new RuntimeError("runtime_session_invalid", "rpc_request_contract_invalid");
  }
  const validator = inputSchemas[request.input_schema_id];
  let valid = false;
  try { valid = validator?.(request.input) === true; } catch { valid = false; }
  if (!valid) throw new RuntimeError("runtime_session_invalid", "rpc_input_schema_invalid");
}

function validateSubscription(request: AuthorizedSubscription, binding: RuntimeBinding): void {
  requireRuntimeText(request.subscription_id, "subscription_id_invalid");
  if (request.schema_version !== "0.1.0"
    || request.project_id !== binding.project_id
    || request.runtime_binding_digest !== binding.descriptor_digest
    || !Number.isSafeInteger(request.after_sequence)
    || request.after_sequence < 0
    || request.resource_refs.length === 0
    || request.resource_refs.some((item) => typeof item !== "string" || item.length === 0)
    || request.data_classes.length === 0
    || request.data_classes.some((item) => typeof item !== "string" || item.length === 0)
    || !isRuntimeDigest(request.request_digest)) {
    throw new RuntimeError("runtime_session_invalid", "subscription_contract_invalid");
  }
  const { request_digest: supplied, ...preimage } = request;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_session_invalid", "subscription_digest_invalid");
  }
}

function opaqueSession(session: StoredSession): AuthenticatedRuntimeSession {
  return Object.freeze({
    session_ref: session.session_ref,
    session_digest: session.session_digest,
    verifier_id: session.verifier_id,
  }) as AuthenticatedRuntimeSession;
}

function validateHandlerResult(result: LocalRpcHandlerResult): void {
  if (!((result.output_ref === null && result.output_digest === null)
    || (typeof result.output_ref === "string"
      && result.output_ref.length > 0
      && isRuntimeDigest(result.output_digest)))) {
    throw new RuntimeError("runtime_canonical_commit_unavailable", "rpc_handler_result_invalid");
  }
}

class LocalSnapshotEventChannel implements ReadonlyEventChannel {
  readonly channel_id: string;
  readonly channel_digest: string;
  readonly #events: readonly ProgressEvent[];
  #closed = false;

  constructor(channelId: string, channelDigest: string, events: readonly ProgressEvent[]) {
    this.channel_id = channelId;
    this.channel_digest = channelDigest;
    this.#events = events;
  }

  async *[Symbol.asyncIterator](): AsyncIterator<ProgressEvent> {
    if (this.#closed) return;
    for (const event of this.#events) {
      if (this.#closed) return;
      yield event;
    }
  }

  async close(): Promise<void> {
    this.#closed = true;
  }
}

export class LocalIngress implements RuntimeIngress {
  readonly #database;
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #identityResolver: LocalIdentityResolver;
  readonly #inputSchemas: Readonly<Record<string, LocalInputSchema>>;
  readonly #handlers: Readonly<Record<string, LocalRpcHandler>>;
  readonly #clock: () => string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalIngressOptions) {
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#identityResolver = options.identity_resolver;
    this.#inputSchemas = Object.freeze({ ...options.input_schemas });
    this.#handlers = Object.freeze({ ...options.handlers });
    this.#clock = options.clock;
    this.#database = openWorkflowDatabase(options.project_root);
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_sessions (
        session_ref TEXT PRIMARY KEY,
        session_digest TEXT NOT NULL UNIQUE,
        verifier_id TEXT NOT NULL,
        tenant_ref TEXT NOT NULL,
        principal_ref TEXT NOT NULL,
        workload_ref TEXT NOT NULL,
        project_ref TEXT NOT NULL,
        connection_ref TEXT NOT NULL,
        identity_digest TEXT NOT NULL,
        issued_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_rpc_receipts (
        request_id TEXT PRIMARY KEY,
        session_ref TEXT NOT NULL,
        request_digest TEXT NOT NULL,
        receipt_json TEXT NOT NULL,
        FOREIGN KEY (session_ref) REFERENCES runtime_sessions(session_ref)
      );
    `);
  }

  authenticate(request: RuntimeIngressRequest): Promise<AuthenticatedRuntimeSession> {
    return this.#exclusive(async () => {
      validateIngressRequest(request);
      const identity = await this.#identityResolver.resolve(request.principal_attestation_ref);
      requireRuntimeTime(identity.expires_at, "identity_expiry_invalid");
      if (identity.status !== "current"
        || identity.tenant_ref !== request.tenant_ref
        || identity.workload_ref !== request.workload_ref
        || identity.project_ref !== request.project_ref
        || identity.project_ref !== this.#binding.project_id
        || !isRuntimeDigest(identity.identity_digest)
        || Date.parse(this.#clock()) >= Date.parse(identity.expires_at)) {
        throw new RuntimeError("runtime_session_invalid", "identity_attestation_invalid");
      }
      const sessionRef = `runtime-session.${sha256Canonical({
        contract_version: "contentmd.runtime-session-identity/0.1.0",
        request_digest: request.request_digest,
        identity_digest: identity.identity_digest,
      })}`;
      const preimage = {
        session_ref: sessionRef,
        verifier_id: INGRESS_VERIFIER_ID,
        tenant_ref: identity.tenant_ref,
        principal_ref: identity.principal_ref,
        workload_ref: identity.workload_ref,
        project_ref: identity.project_ref,
        connection_ref: request.connection_ref,
        identity_digest: identity.identity_digest,
        issued_at: this.#clock(),
        expires_at: identity.expires_at,
      };
      const session: StoredSession = {
        ...preimage,
        session_digest: sha256Canonical(preimage),
      };
      withImmediateTransaction(this.#database, () => {
        const existing = this.#sessionRow(sessionRef);
        if (existing !== null) {
          if (requiredRowString(existing, "session_digest") !== session.session_digest) {
            throw new RuntimeError("runtime_session_invalid", "session_identity_conflict");
          }
          return;
        }
        this.#database.prepare(`
          INSERT INTO runtime_sessions (
            session_ref, session_digest, verifier_id, tenant_ref, principal_ref,
            workload_ref, project_ref, connection_ref, identity_digest,
            issued_at, expires_at
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          session.session_ref,
          session.session_digest,
          session.verifier_id,
          session.tenant_ref,
          session.principal_ref,
          session.workload_ref,
          session.project_ref,
          session.connection_ref,
          session.identity_digest,
          session.issued_at,
          session.expires_at,
        );
      });
      return opaqueSession(session);
    });
  }

  invoke(
    session: AuthenticatedRuntimeSession,
    request: SchemaValidatedRpcRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<RpcReceipt> {
    return this.#exclusive(async () => {
      const storedSession = this.#requireSession(session);
      validateRpcRequest(request, this.#binding, this.#inputSchemas);
      if (storedSession.project_ref !== request.project_id) {
        throw new RuntimeError("runtime_session_invalid", "session_project_mismatch");
      }
      const handler = this.#handlers[request.method];
      if (handler === undefined) {
        throw new RuntimeError("runtime_capability_unsupported", "rpc_handler_not_registered");
      }
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.ingress",
        method: "invoke",
        action: "runtime.ingress.invoke",
        resources: [{ resource_id: request.request_id, content_digest: request.input_digest }],
        effect_input: request,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      const existing = this.#database.prepare(`
        SELECT request_digest, receipt_json FROM runtime_rpc_receipts WHERE request_id = ?
      `).get(request.request_id) as WorkflowSqlRow | undefined;
      const requestDigest = sha256Canonical(request);
      if (existing !== undefined) {
        if (requiredRowString(existing, "request_digest") !== requestDigest) {
          throw new RuntimeError("event_id_digest_conflict", "rpc_request_id_digest_conflict");
        }
        return JSON.parse(requiredRowString(existing, "receipt_json")) as RpcReceipt;
      }
      let result: LocalRpcHandlerResult;
      let status: RpcReceipt["status"] = "completed";
      try {
        result = await handler(request.input);
        validateHandlerResult(result);
      } catch {
        result = { output_ref: null, output_digest: null };
        status = "failed";
      }
      const issuedAt = this.#clock();
      const receiptId = `rpc-receipt.${sha256Canonical({
        contract_version: "contentmd.runtime-rpc-receipt-identity/0.1.0",
        request_id: request.request_id,
        request_digest: requestDigest,
        issued_at: issuedAt,
      })}`;
      const preimage = {
        schema_version: "0.1.0" as const,
        receipt_id: receiptId,
        request_id: request.request_id,
        project_id: request.project_id,
        runtime_binding_digest: request.runtime_binding_digest,
        output_ref: result.output_ref,
        output_digest: result.output_digest,
        status,
        issued_at: issuedAt,
      };
      const receipt: RpcReceipt = { ...preimage, receipt_digest: sha256Canonical(preimage) };
      withImmediateTransaction(this.#database, () => {
        this.#database.prepare(`
          INSERT INTO runtime_rpc_receipts (
            request_id, session_ref, request_digest, receipt_json
          ) VALUES (?, ?, ?, ?)
        `).run(request.request_id, storedSession.session_ref, requestDigest, canonicalJson(receipt));
      });
      return receipt;
    });
  }

  subscribe(
    session: AuthenticatedRuntimeSession,
    request: AuthorizedSubscription,
    operation: AuthorizedRuntimeOperation,
  ): Promise<ReadonlyEventChannel> {
    return this.#exclusive(async () => {
      const storedSession = this.#requireSession(session);
      validateSubscription(request, this.#binding);
      if (storedSession.project_ref !== request.project_id) {
        throw new RuntimeError("runtime_session_invalid", "session_project_mismatch");
      }
      const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
        interface_id: "runtime.ingress",
        method: "subscribe",
        action: "runtime.ingress.subscribe",
        resources: [{ resource_id: request.subscription_id, content_digest: request.request_digest }],
        data_classes: request.data_classes,
        effect_input: request,
        runtime_binding_digest: this.#binding.descriptor_digest,
      }));
      requireRuntimeBinding(claims, this.#binding);
      const progressTable = this.#database.prepare(`
        SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'runtime_progress_events'
      `).get() as WorkflowSqlRow | undefined;
      const events = progressTable === undefined
        ? []
        : (this.#database.prepare(`
            SELECT event_json FROM runtime_progress_events
            WHERE operation_id IN (${request.resource_refs.map(() => "?").join(",")})
              AND sequence > ?
            ORDER BY operation_id ASC, sequence ASC
          `).all(...request.resource_refs, request.after_sequence) as WorkflowSqlRow[])
            .map((row) => JSON.parse(requiredRowString(row, "event_json")) as ProgressEvent);
      const channelId = `runtime-channel.${sha256Canonical({
        contract_version: "contentmd.runtime-event-channel-identity/0.1.0",
        subscription_digest: request.request_digest,
        session_digest: storedSession.session_digest,
      })}`;
      const channelDigest = sha256Canonical({
        contract_version: "contentmd.runtime-event-channel/0.1.0",
        channel_id: channelId,
        event_digests: events.map((event) => event.event_digest),
      });
      return new LocalSnapshotEventChannel(channelId, channelDigest, events);
    });
  }

  close(): void {
    this.#database.close();
  }

  #sessionRow(sessionRef: string): WorkflowSqlRow | null {
    return (this.#database.prepare(`
      SELECT session_ref, session_digest, verifier_id, tenant_ref, principal_ref,
             workload_ref, project_ref, connection_ref, identity_digest,
             issued_at, expires_at
      FROM runtime_sessions WHERE session_ref = ?
    `).get(sessionRef) as WorkflowSqlRow | undefined) ?? null;
  }

  #requireSession(session: AuthenticatedRuntimeSession): StoredSession {
    if (typeof session !== "object" || session === null
      || typeof session.session_ref !== "string"
      || typeof session.session_digest !== "string"
      || session.verifier_id !== INGRESS_VERIFIER_ID) {
      throw new RuntimeError("runtime_session_invalid", "session_shape_invalid");
    }
    const row = this.#sessionRow(session.session_ref);
    if (row === null || requiredRowString(row, "session_digest") !== session.session_digest) {
      throw new RuntimeError("runtime_session_invalid", "session_not_found");
    }
    const stored: StoredSession = {
      session_ref: requiredRowString(row, "session_ref"),
      session_digest: requiredRowString(row, "session_digest"),
      verifier_id: requiredRowString(row, "verifier_id"),
      tenant_ref: requiredRowString(row, "tenant_ref"),
      principal_ref: requiredRowString(row, "principal_ref"),
      workload_ref: requiredRowString(row, "workload_ref"),
      project_ref: requiredRowString(row, "project_ref"),
      connection_ref: requiredRowString(row, "connection_ref"),
      identity_digest: requiredRowString(row, "identity_digest"),
      issued_at: requiredRowString(row, "issued_at"),
      expires_at: requiredRowString(row, "expires_at"),
    };
    const { session_digest: supplied, ...preimage } = stored;
    if (supplied !== sha256Canonical(preimage)) {
      throw new RuntimeError("runtime_session_invalid", "session_digest_invalid");
    }
    if (Date.parse(this.#clock()) >= Date.parse(stored.expires_at)) {
      throw new RuntimeError("runtime_session_invalid", "session_expired");
    }
    return stored;
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
