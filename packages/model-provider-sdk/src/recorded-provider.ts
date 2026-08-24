import { readFile } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import {
  canonicalizeModelOutput,
  resolveRequestOutputSchema,
} from "./schema-resolution.js";
import type {
  GovernedModelRequest,
  GovernedModelResponse,
} from "./contracts.js";
import type {
  ModelExecutionPort,
  ModelExecutionResult,
} from "./execution.js";
import {
  modelRequestDigest,
  type ModelProvider,
  type ModelProviderDescriptor,
  type ModelRequest,
  type ModelResponse,
} from "./provider.js";

interface LegacyRecordedEntry {
  schema_version: "contentmd.recorded-model-entry/0.1.0";
  request_digest: string;
  provider_id: string;
  model_id: string;
  output: unknown;
  input_tokens: number;
  output_tokens: number;
  deterministic_status: "recorded_exact";
}

interface GovernedRecordedEntry {
  schema_version: "contentmd.recorded-model-entry/0.2.0";
  request_digest: string;
  provider_id: string;
  adapter_id: string;
  adapter_version: string;
  model_id: string;
  provider_response_id: string | null;
  provider_created_at: string | null;
  output: unknown;
  input_tokens: number;
  output_tokens: number;
  cached_input_tokens: number;
  service_tier: string | null;
  deterministic_status: "recorded_exact";
}

type RecordedEntry = LegacyRecordedEntry | GovernedRecordedEntry;

const LEGACY_ENTRY_KEYS = [
  "deterministic_status",
  "input_tokens",
  "model_id",
  "output",
  "output_tokens",
  "provider_id",
  "request_digest",
  "schema_version",
] as const;

const GOVERNED_ENTRY_KEYS = [
  "adapter_id",
  "adapter_version",
  "cached_input_tokens",
  "deterministic_status",
  "input_tokens",
  "model_id",
  "output",
  "output_tokens",
  "provider_created_at",
  "provider_id",
  "provider_response_id",
  "request_digest",
  "schema_version",
  "service_tier",
] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function nonnegativeInteger(value: unknown): value is number {
  return typeof value === "number" && Number.isSafeInteger(value) && value >= 0;
}

function nonemptyText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function nullableText(value: unknown): value is string | null {
  return value === null || nonemptyText(value);
}

function hasExactKeys(value: Record<string, unknown>, expected: readonly string[]): boolean {
  const actual = Object.keys(value).sort();
  return actual.length === expected.length && actual.every((key, index) => key === expected[index]);
}

function parseEntry(value: unknown, line: number): RecordedEntry {
  if (!isRecord(value)) {
    throw new Error(`invalid_recorded_model_entry:${line}`);
  }
  if (
    value.schema_version !== "contentmd.recorded-model-entry/0.1.0" &&
    value.schema_version !== "contentmd.recorded-model-entry/0.2.0"
  ) {
    throw new Error(`invalid_recorded_model_entry:${line}`);
  }
  const expectedKeys = value.schema_version === "contentmd.recorded-model-entry/0.2.0"
    ? GOVERNED_ENTRY_KEYS
    : LEGACY_ENTRY_KEYS;
  if (!hasExactKeys(value, expectedKeys)) {
    throw new Error(`invalid_recorded_model_entry:${line}:shape`);
  }
  for (const field of ["request_digest", "provider_id", "model_id"] as const) {
    if (typeof value[field] !== "string" || value[field].length === 0) {
      throw new Error(`invalid_recorded_model_entry:${line}:${field}`);
    }
  }
  if (!/^[a-f0-9]{64}$/u.test(value.request_digest as string)) {
    throw new Error(`invalid_recorded_model_entry:${line}:request_digest`);
  }
  if (
    !nonnegativeInteger(value.input_tokens) ||
    !nonnegativeInteger(value.output_tokens) ||
    value.deterministic_status !== "recorded_exact" ||
    !("output" in value)
  ) {
    throw new Error(`invalid_recorded_model_entry:${line}:metadata`);
  }
  if (value.schema_version === "contentmd.recorded-model-entry/0.2.0") {
    if (
      !nonemptyText(value.adapter_id) ||
      !nonemptyText(value.adapter_version) ||
      !nullableText(value.provider_response_id) ||
      !nullableText(value.provider_created_at) ||
      !nonnegativeInteger(value.cached_input_tokens) ||
      !nullableText(value.service_tier)
    ) {
      throw new Error(`invalid_recorded_model_entry:${line}:metadata`);
    }
  }
  return value as unknown as RecordedEntry;
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

export class RecordedModelProvider implements ModelProvider, ModelExecutionPort {
  readonly descriptor: ModelProviderDescriptor = {
    provider_id: "provider.recorded",
    provider_version: "0.2.0",
    adapter_id: "adapter.recorded",
    adapter_version: "0.2.0",
    execution_mode: "recorded",
    deterministic_status: "recorded_exact",
    network_required: false,
    remote_authorization_required: false,
    supported_request_versions: [
      "contentmd.model-request/0.1.0",
      "contentmd.model-request/0.2.0",
    ],
    strict_schema_output: true,
  };
  readonly #entries: Map<string, RecordedEntry>;

  private constructor(entries: Map<string, RecordedEntry>) {
    this.#entries = entries;
  }

  static async fromFile(path: string): Promise<RecordedModelProvider> {
    const lines = (await readFile(path, "utf8")).split("\n");
    const entries = new Map<string, RecordedEntry>();
    for (const [index, line] of lines.entries()) {
      if (line.trim().length === 0) continue;
      let parsed: unknown;
      try {
        parsed = JSON.parse(line) as unknown;
      } catch {
        throw new Error(`invalid_recorded_model_json:${index + 1}`);
      }
      const entry = parseEntry(parsed, index + 1);
      if (entries.has(entry.request_digest)) {
        throw new Error(`duplicate_recorded_request:${entry.request_digest}`);
      }
      entries.set(entry.request_digest, entry);
    }
    return new RecordedModelProvider(entries);
  }

  async generate(request: ModelRequest): Promise<ModelResponse> {
    if (request.schema_version === "contentmd.model-request/0.2.0") {
      return (await this.execute(request)).response;
    }
    const inputDigest = modelRequestDigest(request);
    const entry = this.#entries.get(inputDigest);
    if (entry === undefined) throw new Error(`recorded_response_not_found:${inputDigest}`);
    if (entry.schema_version !== "contentmd.recorded-model-entry/0.1.0") {
      throw new Error(`recorded_response_version_mismatch:${inputDigest}`);
    }
    return {
      schema_version: "contentmd.model-response/0.1.0",
      request_id: request.request_id,
      provider_id: entry.provider_id,
      model_id: entry.model_id,
      input_digest: inputDigest,
      output_digest: sha256Canonical(entry.output),
      output: entry.output,
      token_accounting: {
        input_tokens: entry.input_tokens,
        output_tokens: entry.output_tokens,
      },
      deterministic_status: entry.deterministic_status,
      authority_effect: "none",
    };
  }

  async execute(request: GovernedModelRequest): Promise<ModelExecutionResult> {
    const inputDigest = modelRequestDigest(request);
    const entry = this.#entries.get(inputDigest);
    if (entry === undefined) throw new Error(`recorded_response_not_found:${inputDigest}`);
    if (entry.schema_version !== "contentmd.recorded-model-entry/0.2.0") {
      throw new Error(`recorded_response_version_mismatch:${inputDigest}`);
    }
    if (
      entry.provider_id !== request.requested_provider_id ||
      entry.model_id !== request.requested_model_id ||
      entry.adapter_id !== this.descriptor.adapter_id ||
      entry.adapter_version !== this.descriptor.adapter_version ||
      entry.input_tokens > request.resource_limits.maximum_input_tokens ||
      entry.output_tokens > request.resource_limits.maximum_output_tokens ||
      entry.cached_input_tokens > entry.input_tokens
    ) {
      throw new Error(`recorded_response_binding_mismatch:${inputDigest}`);
    }

    const canonical = canonicalizeModelOutput(request.output_schema_id, entry.output);
    if (
      Buffer.byteLength(canonical.canonical_output_bytes, "utf8") >
      request.resource_limits.maximum_output_bytes
    ) {
      throw new Error(`recorded_response_binding_mismatch:${inputDigest}`);
    }
    const resolvedSchema = resolveRequestOutputSchema(request.output_schema_id);
    const canonicalOutput = deepFreeze(structuredClone(entry.output));
    const response: GovernedModelResponse = {
      schema_version: "contentmd.model-response/0.2.0",
      request_id: request.request_id,
      provider_id: entry.provider_id,
      adapter_id: entry.adapter_id,
      adapter_version: entry.adapter_version,
      model_profile_ref: structuredClone(request.requested_model_profile_ref),
      requested_model_id: request.requested_model_id,
      model_id: entry.model_id,
      provider_response_id: entry.provider_response_id,
      provider_created_at: entry.provider_created_at,
      response_state: "completed",
      incomplete_reason: null,
      refusal_reason: null,
      input_digest: request.input_digest,
      provider_output_digest: canonical.canonical_output_digest,
      parsed_output_digest: canonical.canonical_output_digest,
      canonical_output_digest: canonical.canonical_output_digest,
      output_digest: canonical.canonical_output_digest,
      schema_projection_id: resolvedSchema.provider_projection.projection_id,
      schema_projection_digest: resolvedSchema.provider_projection.projection_digest,
      token_accounting: {
        input_tokens: entry.input_tokens,
        output_tokens: entry.output_tokens,
        total_tokens: entry.input_tokens + entry.output_tokens,
        cached_input_tokens: entry.cached_input_tokens,
      },
      timeout_observed: false,
      retry_count: 0,
      service_tier: entry.service_tier,
      provider_storage_requested: false,
      output_ref: null,
      retention_disposition: "transient_only",
      deterministic_status: entry.deterministic_status,
      authority_effect: "none",
      output: structuredClone(canonicalOutput),
    };
    return deepFreeze({
      response,
      canonical_output: canonicalOutput,
    });
  }
}
