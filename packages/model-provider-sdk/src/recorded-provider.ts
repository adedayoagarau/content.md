import { readFile } from "node:fs/promises";
import { sha256Canonical } from "@contentmd/core";
import {
  modelRequestDigest,
  type ModelProvider,
  type ModelProviderDescriptor,
  type ModelRequest,
  type ModelResponse,
} from "./provider.js";

interface RecordedEntry {
  schema_version: "contentmd.recorded-model-entry/0.1.0";
  request_digest: string;
  provider_id: string;
  model_id: string;
  output: unknown;
  input_tokens: number;
  output_tokens: number;
  deterministic_status: "recorded_exact";
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseEntry(value: unknown, line: number): RecordedEntry {
  if (!isRecord(value) || value.schema_version !== "contentmd.recorded-model-entry/0.1.0") {
    throw new Error(`invalid_recorded_model_entry:${line}`);
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
    typeof value.input_tokens !== "number" ||
    !Number.isSafeInteger(value.input_tokens) ||
    value.input_tokens < 0 ||
    typeof value.output_tokens !== "number" ||
    !Number.isSafeInteger(value.output_tokens) ||
    value.output_tokens < 0 ||
    value.deterministic_status !== "recorded_exact" ||
    !("output" in value)
  ) {
    throw new Error(`invalid_recorded_model_entry:${line}:metadata`);
  }
  return value as unknown as RecordedEntry;
}

export class RecordedModelProvider implements ModelProvider {
  readonly descriptor: ModelProviderDescriptor = {
    provider_id: "provider.recorded",
    provider_version: "0.1.0",
    execution_mode: "recorded",
    deterministic_status: "recorded_exact",
    network_required: false,
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
    const inputDigest = modelRequestDigest(request);
    const entry = this.#entries.get(inputDigest);
    if (entry === undefined) throw new Error(`recorded_response_not_found:${inputDigest}`);
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
}
