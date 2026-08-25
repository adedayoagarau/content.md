import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  providerExecutionPlanRef,
  type ProviderReceipt,
} from "@contentmd/governance";
import type { AppendOnlyEventStore, StoredEvent } from "@contentmd/memory";
import type {
  ProviderAuditPort,
  ProviderAuditRef,
  ProviderOutcomeAuditInput,
  ProviderPreAttemptAuditInput,
} from "./live-model-executor.js";

export type ProviderAuditErrorCode =
  | "provider_audit_binding_invalid"
  | "provider_audit_append_failed"
  | "provider_audit_readback_failed";

export class ProviderAuditError extends Error {
  readonly code: ProviderAuditErrorCode;

  constructor(code: ProviderAuditErrorCode) {
    super(code);
    this.name = "ProviderAuditError";
    this.code = code;
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

function receiptRef(receipt: ProviderReceipt) {
  return {
    record_id: receipt.receipt_id,
    schema_id: receipt.schema_version,
    schema_version: "0.1.0",
    content_digest: receipt.receipt_digest,
  };
}

function auditRef(event: StoredEvent): ProviderAuditRef {
  return deepFreeze({ event_id: event.event_id, event_digest: event.event_digest });
}

function assertBaseBinding(input: ProviderPreAttemptAuditInput): void {
  const plan = input.authenticated_plan.plan;
  if (typeof input.actor_ref !== "string" || input.actor_ref.length === 0
    || !Number.isFinite(Date.parse(input.occurred_at))
    || input.authorization.authorization.request.operation_id !== plan.operation_id
    || input.authorization.request.request_id !== plan.request_id
    || input.authorization.adapter_id !== plan.adapter_id
    || input.authorization.adapter_version !== plan.adapter_version
    || input.authorization.revocation_checkpoint.checkpoint_id
      !== plan.revocation_checkpoint.checkpoint_id
    || input.authorization.revocation_checkpoint.checkpoint_digest
      !== plan.revocation_checkpoint.checkpoint_digest) {
    throw new ProviderAuditError("provider_audit_binding_invalid");
  }
}

function assertOutcomeBinding(input: ProviderOutcomeAuditInput): void {
  assertBaseBinding(input);
  const plan = input.authenticated_plan.plan;
  const receipt = input.provider_receipt;
  if (canonicalJson(receipt.plan_ref) !== canonicalJson(providerExecutionPlanRef(plan))
    || receipt.request_id !== plan.request_id
    || receipt.provider_id !== plan.provider_id
    || receipt.outcome_audit_stream_id !== plan.outcome_audit_stream_id
    || (input.response !== null && (
      input.response.request_id !== plan.request_id
      || input.response.provider_id !== plan.provider_id
      || input.response.adapter_id !== plan.adapter_id
      || input.response.adapter_version !== plan.adapter_version
    ))) {
    throw new ProviderAuditError("provider_audit_binding_invalid");
  }
}

export class AppendOnlyProviderAudit implements ProviderAuditPort {
  readonly #store: AppendOnlyEventStore;

  constructor(store: AppendOnlyEventStore) {
    this.#store = store;
  }

  async #append(
    input: ProviderPreAttemptAuditInput,
    stage: "pre_attempt" | "outcome",
    payloadExtension: Record<string, unknown>,
  ): Promise<ProviderAuditRef> {
    const plan = input.authenticated_plan.plan;
    const streamId = plan.outcome_audit_stream_id;
    const head = await this.#store.getHead(streamId);
    const payload = {
      schema_version: "contentmd.provider-audit-event/0.1.0",
      stage,
      plan_ref: providerExecutionPlanRef(plan),
      operation_id: plan.operation_id,
      request_id: plan.request_id,
      request_digest: plan.request_digest,
      input_digest: plan.input_digest,
      provider_id: plan.provider_id,
      adapter_id: plan.adapter_id,
      adapter_version: plan.adapter_version,
      model_profile_ref: plan.model_profile_ref,
      authorization_audit: plan.authorization_audit,
      revocation_checkpoint: plan.revocation_checkpoint,
      ...payloadExtension,
      authority_effect: "none",
    };
    const eventId = `provider-audit.${stage}.${sha256Canonical({
      contract: "contentmd.provider-audit-event-identity/0.1.0",
      stream_id: streamId,
      predecessor_digest: head?.event_digest ?? null,
      payload,
    }).slice(0, 32)}`;
    let event: StoredEvent;
    try {
      event = await this.#store.append({
        event_id: eventId,
        stream_id: streamId,
        event_type: stage === "pre_attempt"
          ? "provider.execution.pre-attempt-audited"
          : "provider.execution.outcome-audited",
        occurred_at: input.occurred_at,
        actor_ref: input.actor_ref,
        data_class: "provider_audit",
        payload,
        expected_head_digest: head?.event_digest ?? null,
      });
    } catch {
      throw new ProviderAuditError("provider_audit_append_failed");
    }
    const readback = await this.#store.getHead(streamId);
    if (readback === null || readback.event_id !== event.event_id
      || readback.event_digest !== event.event_digest
      || readback.sequence !== event.sequence) {
      throw new ProviderAuditError("provider_audit_readback_failed");
    }
    return auditRef(event);
  }

  async appendPreAttempt(input: ProviderPreAttemptAuditInput): Promise<ProviderAuditRef> {
    assertBaseBinding(input);
    return this.#append(input, "pre_attempt", {
      disposition: "authorized_pending_attempt",
      provider_receipt_ref: null,
      response_state: null,
      response_output_digest: null,
    });
  }

  async appendOutcome(input: ProviderOutcomeAuditInput): Promise<ProviderAuditRef> {
    assertOutcomeBinding(input);
    return this.#append(input, "outcome", {
      disposition: input.provider_receipt.outcome_state === "completed"
        ? "completed_pending_release"
        : "quarantined",
      provider_receipt_ref: receiptRef(input.provider_receipt),
      response_state: input.response?.response_state ?? null,
      response_output_digest: input.response?.output_digest ?? null,
    });
  }
}
