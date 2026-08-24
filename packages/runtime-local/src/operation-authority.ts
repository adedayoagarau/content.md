import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { ResourceLimits } from "@contentmd/governance";
import {
  RuntimeError,
  type AuthorizedRuntimeOperation,
  type BoundRuntimeRecordRef,
  type RuntimeEffectRequest,
  type RuntimeOperationClaims,
  type RuntimeOperationVerifier,
} from "@contentmd/runtime-sdk";
import { LocalRuntimeSqliteLedger } from "./sqlite-ledger.js";

export interface RuntimeAuthorizationResolver {
  resolve(ref: BoundRuntimeRecordRef): Promise<{
    readonly disposition: "allow" | "deny" | "review";
    readonly claims_digest: string;
    readonly authorization_digest: string;
  }>;
  recheckCurrentness(
    claims: RuntimeOperationClaims,
  ): Promise<"current" | "revoked" | "unknown">;
}

export interface LocalRuntimeOperationAuthorityOptions {
  readonly ledger: LocalRuntimeSqliteLedger;
  readonly authorization_resolver: RuntimeAuthorizationResolver;
  readonly clock: () => string;
  readonly verifier_id: string;
}

const LIMIT_KEYS = [
  "calls",
  "bytes",
  "duration_ms",
  "records",
  "model_tokens",
  "browser_actions",
  "retries",
] as const satisfies readonly (keyof ResourceLimits)[];

function deny(detail: string): never {
  throw new RuntimeError("runtime_binding_not_authorized", detail);
}

function effectPreimage(effect: RuntimeEffectRequest): Omit<RuntimeEffectRequest, "effect_digest"> {
  const { effect_digest: _digest, ...preimage } = effect;
  return preimage;
}

function validTimeWindow(claims: RuntimeOperationClaims, now: string): boolean {
  const issued = Date.parse(claims.issued_at);
  const expires = Date.parse(claims.expires_at);
  const current = Date.parse(now);
  return Number.isFinite(issued)
    && Number.isFinite(expires)
    && Number.isFinite(current)
    && issued <= current
    && current < expires;
}

function effectMatches(claims: RuntimeOperationClaims, effect: RuntimeEffectRequest): boolean {
  return effect.action === claims.action
    && canonicalJson(effect.resources) === canonicalJson(claims.resources)
    && canonicalJson(effect.data_classes) === canonicalJson(claims.data_classes)
    && effect.runtime_binding_digest === claims.runtime_binding_digest
    && LIMIT_KEYS.every((key) => effect.requested_limits[key] <= claims.resource_limits[key])
    && sha256Canonical(effectPreimage(effect)) === effect.effect_digest;
}

function opaqueOperation(input: {
  readonly capability_ref: string;
  readonly capability_digest: string;
  readonly verifier_id: string;
}): AuthorizedRuntimeOperation {
  return Object.freeze(input) as AuthorizedRuntimeOperation;
}

export class LocalRuntimeOperationAuthority implements RuntimeOperationVerifier {
  readonly #ledger: LocalRuntimeSqliteLedger;
  readonly #resolver: RuntimeAuthorizationResolver;
  readonly #clock: () => string;
  readonly #verifierId: string;
  #tail: Promise<void> = Promise.resolve();

  constructor(options: LocalRuntimeOperationAuthorityOptions) {
    this.#ledger = options.ledger;
    this.#resolver = options.authorization_resolver;
    this.#clock = options.clock;
    this.#verifierId = options.verifier_id;
  }

  async issue(
    authorizationRef: BoundRuntimeRecordRef,
    claims: RuntimeOperationClaims,
  ): Promise<AuthorizedRuntimeOperation> {
    return this.#exclusive(async () => {
      let resolved: Awaited<ReturnType<RuntimeAuthorizationResolver["resolve"]>>;
      try {
        resolved = await this.#resolver.resolve(authorizationRef);
      } catch {
        deny("authorization_not_found");
      }
      const claimsDigest = sha256Canonical(claims);
      if (resolved.disposition !== "allow"
        || resolved.authorization_digest !== authorizationRef.content_digest
        || resolved.claims_digest !== claimsDigest
        || claims.nonce_mode !== "single_use"
        || !validTimeWindow(claims, this.#clock())) {
        deny("authorization_claims_mismatch");
      }
      const capabilityDigest = sha256Canonical({
        contract_version: "contentmd.runtime-operation-capability/0.1.0",
        capability_ref: claims.capability_id,
        authorization_ref: authorizationRef,
        claims_digest: claimsDigest,
        verifier_id: this.#verifierId,
      });
      this.#ledger.beginImmediate();
      try {
        this.#ledger.putCapability({
          capability_ref: claims.capability_id,
          capability_digest: capabilityDigest,
          verifier_id: this.#verifierId,
          authorization_ref: authorizationRef,
          claims,
          claims_digest: claimsDigest,
        });
        this.#ledger.commit();
      } catch (error) {
        this.#ledger.rollback();
        if (error instanceof RuntimeError) throw error;
        deny("capability_issuance_failed");
      }
      return opaqueOperation({
        capability_ref: claims.capability_id,
        capability_digest: capabilityDigest,
        verifier_id: this.#verifierId,
      });
    });
  }

  async resolveAndClaim(
    operation: AuthorizedRuntimeOperation,
    effect: RuntimeEffectRequest,
  ): Promise<RuntimeOperationClaims> {
    return this.#exclusive(async () => {
      this.#ledger.beginImmediate();
      try {
        const stored = this.#ledger.getCapability(operation.capability_ref);
        if (stored === null
          || operation.verifier_id !== this.#verifierId
          || stored.verifier_id !== this.#verifierId
          || operation.capability_digest !== stored.capability_digest
          || stored.claims_digest !== sha256Canonical(stored.claims)
          || !validTimeWindow(stored.claims, this.#clock())
          || !effectMatches(stored.claims, effect)) {
          deny("capability_or_effect_mismatch");
        }
        const currentness = await this.#resolver.recheckCurrentness(stored.claims);
        if (currentness !== "current") deny(`authorization_${currentness}`);
        try {
          this.#ledger.claimNonce({
            nonce: stored.claims.nonce,
            capability_ref: stored.capability_ref,
            effect_digest: effect.effect_digest,
            claimed_at: this.#clock(),
          });
        } catch {
          throw new RuntimeError("runtime_operation_nonce_replayed");
        }
        this.#ledger.appendAuditAttempt({
          attempt_id: `runtime-audit.${sha256Canonical({
            capability_ref: stored.capability_ref,
            effect_digest: effect.effect_digest,
            claimed_at: this.#clock(),
          })}`,
          capability_ref: stored.capability_ref,
          action: effect.action,
          effect_digest: effect.effect_digest,
          disposition: "allowed",
          attempted_at: this.#clock(),
        });
        this.#ledger.commit();
        return stored.claims;
      } catch (error) {
        try { this.#ledger.rollback(); } catch { /* transaction was already unavailable */ }
        if (error instanceof RuntimeError) throw error;
        deny("claim_failed");
      }
    });
  }

  #exclusive<T>(operation: () => Promise<T>): Promise<T> {
    const result = this.#tail.then(operation, operation);
    this.#tail = result.then(() => undefined, () => undefined);
    return result;
  }
}
