import type { AppendOnlyEventStore } from "@contentmd/memory";
import {
  claimProviderExecutionAttempt,
  verifyAuthenticatedProviderExecutionPlan,
  type AuthenticatedProviderExecutionPlan,
  type ExecutionPlanSigner,
  type ProviderAuthorizationInput,
  type ProviderExecutionAttemptClaim,
} from "@contentmd/governance";
import { resolveOpenAIDestination } from "./destination.js";
import {
  withResolvedOpenAIHeaders,
  type OpenAISecretResolver,
} from "./header-template.js";
import type { PreparedOpenAIResponsesRequest } from "./serialize.js";

export interface OpenAITransportRequest {
  url: string;
  method: "POST";
  redirect: "error";
  headers: Readonly<Record<string, string>>;
  body_bytes: Uint8Array;
  timeout_ms: number;
}

export interface OpenAITransportResponse {
  status: number;
  headers: Readonly<Record<string, string>>;
  body_bytes: Uint8Array;
  received_at: string;
}

export interface OpenAITransport {
  send(request: OpenAITransportRequest): Promise<OpenAITransportResponse>;
}

export interface ExecuteGuardedOpenAIRequestInput {
  authenticated_plan: AuthenticatedProviderExecutionPlan;
  signer: ExecutionPlanSigner;
  authorization: ProviderAuthorizationInput;
  prepared: PreparedOpenAIResponsesRequest;
  store: AppendOnlyEventStore;
  actor_ref: string;
  audit_available: boolean;
  clock: { now(): string };
  test_mode: boolean;
  test_origin?: string;
  secret_resolver: OpenAISecretResolver;
  transport: OpenAITransport;
}

export interface GuardedOpenAITransportResult {
  response: OpenAITransportResponse;
  attempt_claim: ProviderExecutionAttemptClaim;
  authority_effect: "none";
}

export type OpenAIGuardedFetchErrorCode =
  | "provider_execution_plan_recheck_failed"
  | "provider_outcome_unknown"
  | "provider_response_invalid";

export class OpenAIGuardedFetchError extends Error {
  readonly code: OpenAIGuardedFetchErrorCode;
  readonly reason_codes: readonly string[];
  readonly attempt_claim: ProviderExecutionAttemptClaim | null;

  constructor(
    code: OpenAIGuardedFetchErrorCode,
    reasonCodes: readonly string[],
    attemptClaim: ProviderExecutionAttemptClaim | null,
  ) {
    super(`${code}:${reasonCodes.join(",")}`);
    this.name = "OpenAIGuardedFetchError";
    this.code = code;
    this.reason_codes = Object.freeze([...reasonCodes]);
    this.attempt_claim = attemptClaim;
  }
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  if (ArrayBuffer.isView(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function validateResponse(
  response: OpenAITransportResponse,
  maximumBytes: number,
  attempt: ProviderExecutionAttemptClaim,
): OpenAITransportResponse {
  if (!Number.isSafeInteger(response.status) || response.status < 100 || response.status > 599
    || typeof response.received_at !== "string" || !Number.isFinite(Date.parse(response.received_at))
    || !(response.body_bytes instanceof Uint8Array)
    || response.body_bytes.byteLength > maximumBytes) {
    throw new OpenAIGuardedFetchError(
      "provider_response_invalid",
      [response.body_bytes.byteLength > maximumBytes
        ? "provider_response_byte_limit_exceeded"
        : "provider_response_shape_invalid"],
      attempt,
    );
  }
  return {
    status: response.status,
    headers: Object.freeze({ ...response.headers }),
    body_bytes: Buffer.from(response.body_bytes),
    received_at: response.received_at,
  };
}

export async function executeGuardedOpenAIRequest(
  input: ExecuteGuardedOpenAIRequestInput,
): Promise<GuardedOpenAITransportResult> {
  const destination = resolveOpenAIDestination({
    prepared: input.prepared,
    test_mode: input.test_mode,
    ...(input.test_origin === undefined ? {} : { test_origin: input.test_origin }),
  });
  const template = input.authorization.header_template;
  const secretRef = input.authorization.secret_ref;
  if (template === null || secretRef === null) {
    throw new TypeError("openai_guarded_fetch_invalid:provider_records");
  }

  return withResolvedOpenAIHeaders({
    template,
    secret_ref: secretRef,
    test_mode: input.test_mode,
    resolver: input.secret_resolver,
  }, async (headers) => {
    const attempt = await claimProviderExecutionAttempt({
      now: input.clock.now(),
      actor_ref: input.actor_ref,
      audit_available: input.audit_available,
      store: input.store,
      authenticated_plan: input.authenticated_plan,
      method: "POST",
      authorization: input.authorization,
      prepared_request: input.prepared,
    }, input.signer);

    const recheck = await verifyAuthenticatedProviderExecutionPlan({
      now: input.clock.now(),
      authenticated_plan: input.authenticated_plan,
      method: "POST",
      authorization: input.authorization,
      prepared_request: input.prepared,
    }, input.signer);
    if (recheck.disposition !== "allow") {
      throw new OpenAIGuardedFetchError(
        "provider_execution_plan_recheck_failed",
        recheck.reason_codes,
        attempt,
      );
    }

    let response: OpenAITransportResponse;
    try {
      response = await input.transport.send({
        url: destination.url,
        method: "POST",
        redirect: "error",
        headers,
        body_bytes: input.prepared.body_bytes,
        timeout_ms: input.authenticated_plan.plan.resource_limits.duration_ms,
      });
    } catch {
      throw new OpenAIGuardedFetchError(
        "provider_outcome_unknown",
        ["provider_transport_failed_after_claim"],
        attempt,
      );
    }
    return deepFreeze({
      response: validateResponse(
        response,
        input.authenticated_plan.plan.resource_limits.response_bytes,
        attempt,
      ),
      attempt_claim: attempt,
      authority_effect: "none",
    });
  });
}
