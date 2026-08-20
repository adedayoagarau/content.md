import { finalizeRecord, isRecordId, type DurableRecordInput } from "@contentmd/core";
import type {
  ContentPatternPayload,
  ContentPatternRecord,
  PatternContext,
  PatternQuery,
  PatternTransferCondition,
} from "./pattern-record.js";
import type { PatternPacketRecordV01 } from "./pattern-packet-v01.js";

const PACKET_KEYS = new Set([
  "context",
  "counterexample",
  "evidence_strength",
  "failure_mode",
  "mechanism",
  "non_transferable_detail",
  "pattern_id",
  "problem",
  "prohibited_imitation_boundary",
  "schema_version",
  "source_refs",
  "transfer_conditions",
]);
const CONTEXT_KEYS = new Set([
  "journeys",
  "stages",
  "states",
  "channels",
  "modalities",
  "locales",
  "risk_levels",
]);
const TRANSFER_FIELDS = new Set<keyof PatternQuery>([
  "journey",
  "stage",
  "state",
  "channel",
  "modality",
  "locale",
  "risk_level",
  "rights_status",
]);
const MEMORY_SCOPES = new Set(["task", "personal", "project", "organization", "public"]);
const LIFECYCLE_STATES = new Set(["proposed", "approved", "active", "superseded", "retired", "rejected"]);
const SCOPE_KEYS = new Set(["memory_scope", "project_id", "resource_refs", "data_classes"]);
const PROVENANCE_KEYS = new Set(["record_id", "relationship", "content_digest"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function requireString(record: Record<string, unknown>, field: string, kind: string): string {
  const value = record[field];
  if (typeof value !== "string" || value.trim().length === 0) {
    throw new Error(`invalid_${kind}_record:${field}`);
  }
  return value;
}

function requireStringArray(record: Record<string, unknown>, field: string, kind: string): string[] {
  const value = record[field];
  if (!Array.isArray(value) || value.length === 0 || value.some((item) => typeof item !== "string" || item.length === 0)) {
    throw new Error(`invalid_${kind}_record:${field}`);
  }
  if (new Set(value).size !== value.length) throw new Error(`invalid_${kind}_record:${field}`);
  return [...value];
}

function rejectUnknownFields(record: Record<string, unknown>, allowed: Set<string>, kind: string): void {
  for (const key of Object.keys(record)) {
    if (!allowed.has(key)) throw new Error(`invalid_${kind}_record:unknown_field:${key}`);
  }
}

function parseContext(value: unknown): PatternContext {
  if (!isRecord(value)) throw new Error("invalid_pattern_record:context");
  rejectUnknownFields(value, CONTEXT_KEYS, "pattern_context");
  return {
    journeys: requireStringArray(value, "journeys", "pattern_context"),
    stages: requireStringArray(value, "stages", "pattern_context"),
    states: requireStringArray(value, "states", "pattern_context"),
    channels: requireStringArray(value, "channels", "pattern_context"),
    modalities: requireStringArray(value, "modalities", "pattern_context"),
    locales: requireStringArray(value, "locales", "pattern_context"),
    risk_levels: requireStringArray(value, "risk_levels", "pattern_context"),
  };
}

function parseTransferConditions(value: unknown): PatternTransferCondition[] {
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error("invalid_pattern_record:transfer_conditions");
  }
  return value.map((condition) => {
    if (!isRecord(condition)) throw new Error("invalid_pattern_record:transfer_conditions");
    rejectUnknownFields(condition, new Set(["field", "values"]), "transfer_condition");
    const field = requireString(condition, "field", "transfer_condition") as keyof PatternQuery;
    if (!TRANSFER_FIELDS.has(field)) throw new Error(`invalid_transfer_condition_field:${field}`);
    return {
      field,
      values: requireStringArray(condition, "values", "transfer_condition"),
    };
  });
}

function parsePacket(packet: PatternPacketRecordV01): PatternPacketRecordV01 {
  const value = packet as unknown;
  if (!isRecord(value)) throw new Error("invalid_pattern_record");
  rejectUnknownFields(value, PACKET_KEYS, "pattern");
  if (value.schema_version !== "contentmd.pattern/0.1.0") {
    throw new Error("invalid_pattern_record:schema_version");
  }
  return {
    schema_version: "contentmd.pattern/0.1.0",
    pattern_id: requireString(value, "pattern_id", "pattern"),
    source_refs: requireStringArray(value, "source_refs", "pattern"),
    evidence_strength: requireString(value, "evidence_strength", "pattern"),
    problem: requireString(value, "problem", "pattern"),
    context: parseContext(value.context),
    mechanism: requireString(value, "mechanism", "pattern"),
    counterexample: requireString(value, "counterexample", "pattern"),
    failure_mode: requireString(value, "failure_mode", "pattern"),
    transfer_conditions: parseTransferConditions(value.transfer_conditions),
    non_transferable_detail: requireString(value, "non_transferable_detail", "pattern"),
    prohibited_imitation_boundary: requireString(value, "prohibited_imitation_boundary", "pattern"),
  };
}

function requireEnvelope(
  envelope: Pick<DurableRecordInput<ContentPatternPayload>, "scope" | "provenance" | "lifecycle_state">,
): void {
  const value = envelope as unknown;
  if (!isRecord(value)) throw new Error("invalid_pattern_conversion_envelope");
  for (const key of Object.keys(value)) {
    if (!["scope", "provenance", "lifecycle_state"].includes(key)) {
      throw new Error(`invalid_pattern_conversion_envelope:unknown_field:${key}`);
    }
  }
  for (const field of ["scope", "provenance", "lifecycle_state"] as const) {
    if (!(field in value)) throw new Error(`invalid_pattern_conversion_envelope:${field}`);
  }
  validateScope(value.scope);
  validateProvenance(value.provenance);
  if (typeof value.lifecycle_state !== "string" || !LIFECYCLE_STATES.has(value.lifecycle_state)) {
    throw new Error("invalid_pattern_conversion_envelope:lifecycle_state");
  }
}

function validateScope(value: unknown): void {
  if (!isRecord(value)) throw new Error("invalid_pattern_conversion_envelope:scope");
  for (const key of Object.keys(value)) {
    if (!SCOPE_KEYS.has(key)) throw new Error(`invalid_pattern_conversion_envelope:scope:unknown_field:${key}`);
  }
  if (typeof value.memory_scope !== "string" || !MEMORY_SCOPES.has(value.memory_scope)) {
    throw new Error("invalid_pattern_conversion_envelope:scope:memory_scope");
  }
  if (value.project_id !== null && typeof value.project_id !== "string") {
    throw new Error("invalid_pattern_conversion_envelope:scope:project_id");
  }
  validateScopeStringArray(value.resource_refs, "resource_refs");
  validateScopeStringArray(value.data_classes, "data_classes");
}

function validateScopeStringArray(value: unknown, field: "resource_refs" | "data_classes"): void {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string" || item.length === 0) || new Set(value).size !== value.length) {
    throw new Error(`invalid_pattern_conversion_envelope:scope:${field}`);
  }
}

function validateProvenance(value: unknown): void {
  if (!Array.isArray(value)) throw new Error("invalid_pattern_conversion_envelope:provenance");
  for (const [index, item] of value.entries()) {
    if (!isRecord(item)) throw new Error(`invalid_pattern_conversion_envelope:provenance:${index}`);
    for (const key of Object.keys(item)) {
      if (!PROVENANCE_KEYS.has(key)) {
        throw new Error(`invalid_pattern_conversion_envelope:provenance:${index}:unknown_field:${key}`);
      }
    }
    if (typeof item.record_id !== "string" || !isRecordId(item.record_id)) {
      throw new Error(`invalid_pattern_conversion_envelope:provenance:${index}:record_id`);
    }
    if (typeof item.relationship !== "string" || item.relationship.length === 0) {
      throw new Error(`invalid_pattern_conversion_envelope:provenance:${index}:relationship`);
    }
    if (typeof item.content_digest !== "string" || !/^[a-f0-9]{64}$/u.test(item.content_digest)) {
      throw new Error(`invalid_pattern_conversion_envelope:provenance:${index}:content_digest`);
    }
  }
}

export function convertPatternPacketV01(
  packet: PatternPacketRecordV01,
  envelope: Pick<
    DurableRecordInput<ContentPatternPayload>,
    "scope" | "provenance" | "lifecycle_state"
  >,
): ContentPatternRecord {
  const parsed = parsePacket(packet);
  requireEnvelope(envelope);
  return finalizeRecord({
    record_id: parsed.pattern_id,
    schema_id: "contentmd.content-pattern-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: envelope.scope,
    provenance: envelope.provenance,
    lifecycle_state: envelope.lifecycle_state,
    payload: {
      evidence_strength: parsed.evidence_strength,
      problem: parsed.problem,
      contexts: [parsed.context],
      mechanism: parsed.mechanism,
      source_refs: parsed.source_refs,
      counterexamples: [parsed.counterexample],
      failure_modes: [parsed.failure_mode],
      transfer_conditions: parsed.transfer_conditions,
      non_transferable_details: [parsed.non_transferable_detail],
      rights_boundary: parsed.prohibited_imitation_boundary,
    },
  });
}
