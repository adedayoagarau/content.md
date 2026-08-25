import { createHash } from "node:crypto";
import { sha256Canonical } from "@contentmd/core";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type RuntimeBinding,
  type RuntimeOperationVerifier,
  type RuntimeSecretResolver,
  type SecretLease,
  type SecretRef,
} from "@contentmd/runtime-sdk";
import {
  isRuntimeDigest,
  requireRuntimeBinding,
  requireRuntimeText,
  requireRuntimeTime,
  workflowEffect,
} from "./runtime.js";

export interface LocalEnvironmentSecretResolverOptions {
  readonly binding: RuntimeBinding;
  readonly authority: RuntimeOperationVerifier;
  readonly adapter_id: string;
  readonly allowed_source_names: readonly string[];
  readonly read_environment: (name: string) => string | undefined;
  readonly clock: () => string;
}

function digestBytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function validateRef(ref: SecretRef, binding: RuntimeBinding): void {
  requireRuntimeText(ref.secret_ref_id, "secret_ref_id_invalid");
  requireRuntimeText(ref.source_name, "secret_source_name_invalid");
  requireRuntimeText(ref.purpose, "secret_purpose_invalid");
  requireRuntimeTime(ref.issued_at, "secret_issued_at_invalid");
  requireRuntimeTime(ref.expires_at, "secret_expires_at_invalid");
  if (ref.schema_version !== "0.1.0"
    || ref.project_id !== binding.project_id
    || ref.resolver_id !== "runtime.local.environment"
    || ref.allowed_adapter_ids.length === 0
    || ref.allowed_adapter_ids.some((item) => typeof item !== "string" || item.length === 0)
    || new Set(ref.allowed_adapter_ids).size !== ref.allowed_adapter_ids.length
    || !isRuntimeDigest(ref.ref_digest)) {
    throw new RuntimeError("runtime_secret_unavailable", "secret_ref_contract_invalid");
  }
  const { ref_digest: supplied, ...preimage } = ref;
  if (supplied !== sha256Canonical(preimage)) {
    throw new RuntimeError("runtime_secret_unavailable", "secret_ref_digest_invalid");
  }
}

class LocalSecretLease implements SecretLease {
  readonly lease_id: string;
  readonly secret_ref_id: string;
  readonly fingerprint: string;
  readonly resolver_id: string;
  readonly issued_at: string;
  readonly expires_at: string;
  #bytes: Uint8Array | null;

  constructor(input: {
    readonly ref: SecretRef;
    readonly bytes: Uint8Array;
    readonly issued_at: string;
  }) {
    this.secret_ref_id = input.ref.secret_ref_id;
    this.fingerprint = digestBytes(input.bytes);
    this.resolver_id = input.ref.resolver_id;
    this.issued_at = input.issued_at;
    this.expires_at = input.ref.expires_at;
    this.lease_id = `secret-lease.${sha256Canonical({
      contract_version: "contentmd.runtime-secret-lease-identity/0.1.0",
      secret_ref_id: this.secret_ref_id,
      fingerprint: this.fingerprint,
      resolver_id: this.resolver_id,
      issued_at: this.issued_at,
      expires_at: this.expires_at,
    })}`;
    this.#bytes = input.bytes;
  }

  async withValue<T>(use: (value: Uint8Array) => T | Promise<T>): Promise<T> {
    if (this.#bytes === null) {
      throw new RuntimeError("runtime_secret_unavailable", "secret_lease_consumed");
    }
    const borrowed = this.#bytes;
    this.#bytes = null;
    try {
      return await use(borrowed);
    } finally {
      borrowed.fill(0);
    }
  }
}

export class LocalEnvironmentSecretResolver implements RuntimeSecretResolver {
  readonly #binding: RuntimeBinding;
  readonly #authority: RuntimeOperationVerifier;
  readonly #adapterId: string;
  readonly #allowedSourceNames: ReadonlySet<string>;
  readonly #readEnvironment: (name: string) => string | undefined;
  readonly #clock: () => string;

  constructor(options: LocalEnvironmentSecretResolverOptions) {
    requireRuntimeText(options.adapter_id, "secret_adapter_id_invalid");
    this.#binding = options.binding;
    this.#authority = options.authority;
    this.#adapterId = options.adapter_id;
    this.#allowedSourceNames = new Set(options.allowed_source_names);
    this.#readEnvironment = options.read_environment;
    this.#clock = options.clock;
  }

  async resolve(ref: SecretRef, operation: AuthorizedRuntimeOperation): Promise<SecretLease> {
    validateRef(ref, this.#binding);
    if (!ref.allowed_adapter_ids.includes(this.#adapterId)) {
      throw new RuntimeError("runtime_secret_unavailable", "secret_adapter_not_allowed");
    }
    if (!this.#allowedSourceNames.has(ref.source_name)) {
      throw new RuntimeError("runtime_secret_unavailable", "secret_source_not_declared");
    }
    if (Date.parse(this.#clock()) < Date.parse(ref.issued_at)
      || Date.parse(this.#clock()) >= Date.parse(ref.expires_at)) {
      throw new RuntimeError("runtime_secret_unavailable", "secret_ref_expired");
    }
    const claims = await this.#authority.resolveAndClaim(operation, workflowEffect({
      interface_id: "runtime.secrets",
      method: "resolve",
      action: "runtime.secret.resolve",
      resources: [{ resource_id: ref.secret_ref_id, content_digest: ref.ref_digest }],
      effect_input: ref,
      runtime_binding_digest: this.#binding.descriptor_digest,
    }));
    requireRuntimeBinding(claims, this.#binding);
    const value = this.#readEnvironment(ref.source_name);
    if (value === undefined) {
      throw new RuntimeError("runtime_secret_unavailable", "secret_source_missing");
    }
    return new LocalSecretLease({
      ref,
      bytes: new TextEncoder().encode(value),
      issued_at: this.#clock(),
    });
  }
}
