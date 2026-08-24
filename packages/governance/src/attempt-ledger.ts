import { sha256Canonical } from "@contentmd/core";
import type { AppendOnlyEventStore, StoredEvent } from "@contentmd/memory";
import type { ModelObjectRef, PreparedProviderRequest } from "@contentmd/model-provider-sdk";
import type { ExecutionPlanSigner } from "./plan-authentication.js";
import type { ProviderAuthorizationInput } from "./provider-preflight.js";
import {
  providerExecutionPlanRef,
  verifyAuthenticatedProviderExecutionPlan,
  type AuthenticatedProviderExecutionPlan,
} from "./provider-execution-plan.js";

export interface ProviderExecutionAttemptInput {
  now: string;
  actor_ref: string;
  audit_available: boolean;
  store: AppendOnlyEventStore;
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  method: "POST";
  authorization: ProviderAuthorizationInput;
  prepared_request: PreparedProviderRequest;
}

export interface ProviderExecutionAttemptClaim {
  schema_version: "contentmd.provider-execution-attempt-claim/0.1.0";
  disposition: "claimed";
  stream_id: string;
  event_id: string;
  event_digest: string;
  sequence: 1;
  plan_ref: ModelObjectRef;
  nonce_digest: string;
  claimed_at: string;
  authority_effect: "none";
}

export class ProviderExecutionAttemptDenied extends Error {
  readonly reason_codes: readonly string[];

  constructor(reasonCodes: readonly string[]) {
    super(`provider_execution_attempt_denied:${reasonCodes.join(",")}`);
    this.name = "ProviderExecutionAttemptDenied";
    this.reason_codes = Object.freeze([...reasonCodes]);
  }
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function nonceDigest(nonce: string): string {
  return sha256Canonical({
    contract: "contentmd.provider-execution-nonce/0.1.0",
    nonce,
  });
}

function isReplayConflict(error: unknown): boolean {
  return error instanceof Error
    && (error.message.startsWith("duplicate_event_id:")
      || error.message.startsWith("stream_head_conflict:"));
}

function claimFromEvent(
  event: StoredEvent,
  planRef: ModelObjectRef,
  digest: string,
  claimedAt: string,
): ProviderExecutionAttemptClaim {
  if (event.sequence !== 1) {
    throw new ProviderExecutionAttemptDenied(["provider_attempt_nonce_already_claimed"]);
  }
  return deepFreeze({
    schema_version: "contentmd.provider-execution-attempt-claim/0.1.0",
    disposition: "claimed",
    stream_id: event.stream_id,
    event_id: event.event_id,
    event_digest: event.event_digest,
    sequence: 1,
    plan_ref: planRef,
    nonce_digest: digest,
    claimed_at: claimedAt,
    authority_effect: "none",
  });
}

export async function claimProviderExecutionAttempt(
  input: ProviderExecutionAttemptInput,
  signer: ExecutionPlanSigner,
): Promise<ProviderExecutionAttemptClaim> {
  if (!input.audit_available) {
    throw new ProviderExecutionAttemptDenied(["provider_attempt_audit_unavailable"]);
  }
  if (typeof input.actor_ref !== "string" || input.actor_ref.length === 0) {
    throw new ProviderExecutionAttemptDenied(["provider_attempt_actor_invalid"]);
  }
  const verification = await verifyAuthenticatedProviderExecutionPlan({
    now: input.now,
    authenticated_plan: input.authenticated_plan,
    method: input.method,
    authorization: input.authorization,
    prepared_request: input.prepared_request,
  }, signer);
  if (verification.disposition !== "allow") {
    throw new ProviderExecutionAttemptDenied(verification.reason_codes);
  }
  const plan = input.authenticated_plan.plan;
  if (plan.maximum_attempts !== 1) {
    throw new ProviderExecutionAttemptDenied(["provider_attempt_limit_invalid"]);
  }
  const digest = nonceDigest(plan.nonce);
  const streamId = `provider-attempt.${digest}`;
  const eventId = `provider-attempt-claim.${sha256Canonical({
    contract: "contentmd.provider-execution-attempt-event/0.1.0",
    plan_digest: plan.plan_digest,
    nonce_digest: digest,
  }).slice(0, 32)}`;
  if (await input.store.getHead(streamId) !== null) {
    throw new ProviderExecutionAttemptDenied(["provider_attempt_nonce_already_claimed"]);
  }
  const planRef = providerExecutionPlanRef(plan);
  try {
    const event = await input.store.appendExclusive({
      event_id: eventId,
      stream_id: streamId,
      event_type: "provider.execution-attempt.claimed",
      occurred_at: input.now,
      actor_ref: input.actor_ref,
      data_class: "provider_attempt",
      payload: {
        schema_version: "contentmd.provider-execution-attempt-event/0.1.0",
        plan_ref: planRef,
        nonce_digest: digest,
        authorization_audit_event_id: plan.authorization_audit.event_id,
        revocation_checkpoint_digest: plan.revocation_checkpoint.checkpoint_digest,
        disposition: "claimed",
        authority_effect: "none",
      },
      expected_head_digest: null,
    });
    return claimFromEvent(event, planRef, digest, input.now);
  } catch (error) {
    if (isReplayConflict(error)) {
      throw new ProviderExecutionAttemptDenied(["provider_attempt_nonce_already_claimed"]);
    }
    throw new ProviderExecutionAttemptDenied(["provider_attempt_audit_append_failed"]);
  }
}
