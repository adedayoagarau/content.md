import { DatabaseSync, type SQLOutputValue } from "node:sqlite";
import { canonicalJson } from "@contentmd/core";
import type {
  BoundRuntimeRecordRef,
  RuntimeOperationClaims,
} from "@contentmd/runtime-sdk";

type SqlRow = Record<string, SQLOutputValue>;

export interface StoredRuntimeCapability {
  readonly capability_ref: string;
  readonly capability_digest: string;
  readonly verifier_id: string;
  readonly authorization_ref: BoundRuntimeRecordRef;
  readonly claims: RuntimeOperationClaims;
  readonly claims_digest: string;
}

function requiredString(row: SqlRow, key: string): string {
  const value = row[key];
  if (typeof value !== "string") throw new TypeError(`runtime_ledger_invalid:${key}`);
  return value;
}

function requiredInteger(row: SqlRow, key: string): number {
  const value = row[key];
  if (typeof value !== "number" || !Number.isSafeInteger(value)) {
    throw new TypeError(`runtime_ledger_invalid:${key}`);
  }
  return value;
}

export class LocalRuntimeSqliteLedger {
  readonly #database: DatabaseSync;

  constructor(path: string) {
    this.#database = new DatabaseSync(path);
    this.#database.exec("PRAGMA foreign_keys = ON; PRAGMA journal_mode = WAL; PRAGMA trusted_schema = OFF;");
    this.#database.exec(`
      CREATE TABLE IF NOT EXISTS runtime_capabilities (
        capability_ref TEXT PRIMARY KEY,
        capability_digest TEXT NOT NULL,
        verifier_id TEXT NOT NULL,
        authorization_record_id TEXT NOT NULL,
        authorization_record_version INTEGER NOT NULL,
        authorization_content_digest TEXT NOT NULL,
        claims_json TEXT NOT NULL,
        claims_digest TEXT NOT NULL,
        issued_at TEXT NOT NULL,
        expires_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS runtime_nonce_claims (
        nonce TEXT PRIMARY KEY,
        capability_ref TEXT NOT NULL,
        effect_digest TEXT NOT NULL,
        claimed_at TEXT NOT NULL,
        FOREIGN KEY (capability_ref) REFERENCES runtime_capabilities(capability_ref)
      );
      CREATE TABLE IF NOT EXISTS runtime_audit_attempts (
        attempt_id TEXT PRIMARY KEY,
        capability_ref TEXT NOT NULL,
        action TEXT NOT NULL,
        effect_digest TEXT NOT NULL,
        disposition TEXT NOT NULL CHECK (disposition IN ('allowed', 'denied')),
        attempted_at TEXT NOT NULL,
        FOREIGN KEY (capability_ref) REFERENCES runtime_capabilities(capability_ref)
      );
    `);
  }

  beginImmediate(): void {
    this.#database.exec("BEGIN IMMEDIATE");
  }

  commit(): void {
    this.#database.exec("COMMIT");
  }

  rollback(): void {
    this.#database.exec("ROLLBACK");
  }

  putCapability(capability: StoredRuntimeCapability): void {
    const existing = this.getCapability(capability.capability_ref);
    if (existing !== null) {
      if (canonicalJson(existing) !== canonicalJson(capability)) {
        throw new Error("runtime_binding_not_authorized:capability_id_conflict");
      }
      return;
    }
    this.#database.prepare(`
      INSERT INTO runtime_capabilities (
        capability_ref, capability_digest, verifier_id,
        authorization_record_id, authorization_record_version,
        authorization_content_digest, claims_json, claims_digest,
        issued_at, expires_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      capability.capability_ref,
      capability.capability_digest,
      capability.verifier_id,
      capability.authorization_ref.record_id,
      capability.authorization_ref.record_version,
      capability.authorization_ref.content_digest,
      canonicalJson(capability.claims),
      capability.claims_digest,
      capability.claims.issued_at,
      capability.claims.expires_at,
    );
  }

  getCapability(capabilityRef: string): StoredRuntimeCapability | null {
    const row = this.#database.prepare(`
      SELECT capability_ref, capability_digest, verifier_id,
             authorization_record_id, authorization_record_version,
             authorization_content_digest, claims_json, claims_digest
      FROM runtime_capabilities WHERE capability_ref = ?
    `).get(capabilityRef) as SqlRow | undefined;
    if (row === undefined) return null;
    return {
      capability_ref: requiredString(row, "capability_ref"),
      capability_digest: requiredString(row, "capability_digest"),
      verifier_id: requiredString(row, "verifier_id"),
      authorization_ref: {
        record_id: requiredString(row, "authorization_record_id"),
        record_version: requiredInteger(row, "authorization_record_version"),
        content_digest: requiredString(row, "authorization_content_digest"),
      },
      claims: JSON.parse(requiredString(row, "claims_json")) as RuntimeOperationClaims,
      claims_digest: requiredString(row, "claims_digest"),
    };
  }

  claimNonce(input: {
    readonly nonce: string;
    readonly capability_ref: string;
    readonly effect_digest: string;
    readonly claimed_at: string;
  }): void {
    this.#database.prepare(`
      INSERT INTO runtime_nonce_claims (nonce, capability_ref, effect_digest, claimed_at)
      VALUES (?, ?, ?, ?)
    `).run(input.nonce, input.capability_ref, input.effect_digest, input.claimed_at);
  }

  appendAuditAttempt(input: {
    readonly attempt_id: string;
    readonly capability_ref: string;
    readonly action: string;
    readonly effect_digest: string;
    readonly disposition: "allowed" | "denied";
    readonly attempted_at: string;
  }): void {
    this.#database.prepare(`
      INSERT INTO runtime_audit_attempts (
        attempt_id, capability_ref, action, effect_digest, disposition, attempted_at
      ) VALUES (?, ?, ?, ?, ?, ?)
    `).run(
      input.attempt_id,
      input.capability_ref,
      input.action,
      input.effect_digest,
      input.disposition,
      input.attempted_at,
    );
  }

  close(): void {
    this.#database.close();
  }
}
