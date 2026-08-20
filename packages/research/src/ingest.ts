import { createHash } from "node:crypto";
import { readFile, realpath } from "node:fs/promises";
import { isAbsolute, join, relative, sep } from "node:path";
import { sha256Canonical } from "@contentmd/core";
import { convertPatternPacketV01 } from "./pattern-converter.js";
import type {
  PatternContext,
  PatternIngestResult,
  PatternQuery,
  PatternRightsStatus,
  PatternSourceRecord,
  PatternTransferCondition,
} from "./pattern-record.js";
import type { PatternPacketRecordV01 } from "./pattern-packet-v01.js";

const ALLOWED_RIGHTS = new Set<PatternRightsStatus>([
  "project_owned_synthetic",
  "licensed_for_pattern_learning",
  "public_domain",
]);
const REQUIRED_FILES = ["LICENSES.md", "patterns.jsonl", "sources.jsonl"];
const PATTERN_KEYS = new Set([
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

interface ManifestFile {
  path: string;
  sha256: string;
}

interface PatternPacketManifest {
  schema_version: "contentmd.pattern-packet-manifest/0.1.0";
  packet_id: string;
  packet_status: "frozen_open_development";
  rights_status: PatternRightsStatus;
  holdout_eligibility: "never";
  files: ManifestFile[];
}

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

function sha256Bytes(bytes: Uint8Array): string {
  return createHash("sha256").update(bytes).digest("hex");
}

function parseJsonLineRecords(text: string, kind: string): Record<string, unknown>[] {
  return text
    .split("\n")
    .filter((line) => line.trim().length > 0)
    .map((line, index) => {
      let value: unknown;
      try {
        value = JSON.parse(line) as unknown;
      } catch {
        throw new Error(`invalid_${kind}_json:${index + 1}`);
      }
      if (!isRecord(value)) throw new Error(`invalid_${kind}_record:${index + 1}`);
      return value;
    });
}

function parseSource(record: Record<string, unknown>): PatternSourceRecord {
  const rightsStatus = requireString(record, "rights_status", "source");
  if (!ALLOWED_RIGHTS.has(rightsStatus as PatternRightsStatus)) {
    throw new Error(`source_rights_status_not_permitted:${rightsStatus}`);
  }
  const capturedAt = requireString(record, "captured_at", "source");
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/u.test(capturedAt) || Number.isNaN(Date.parse(capturedAt))) {
    throw new Error("invalid_source_record:captured_at");
  }
  return {
    source_id: requireString(record, "source_id", "source"),
    source_type: requireString(record, "source_type", "source"),
    locator: requireString(record, "locator", "source"),
    access_mode: requireString(record, "access_mode", "source"),
    captured_at: capturedAt,
    rights_status: rightsStatus as PatternRightsStatus,
    evidence_strength: requireString(record, "evidence_strength", "source"),
  };
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

function parsePattern(record: Record<string, unknown>): PatternPacketRecordV01 {
  if ("distinctive_expression" in record || "source_expression" in record || "copied_expression" in record) {
    throw new Error("prohibited_distinctive_expression_field");
  }
  for (const key of Object.keys(record)) {
    if (!PATTERN_KEYS.has(key)) throw new Error(`invalid_pattern_record:unknown_field:${key}`);
  }
  if (record.schema_version !== "contentmd.pattern/0.1.0") {
    throw new Error("invalid_pattern_record:schema_version");
  }
  return {
    schema_version: "contentmd.pattern/0.1.0",
    pattern_id: requireString(record, "pattern_id", "pattern"),
    source_refs: requireStringArray(record, "source_refs", "pattern"),
    evidence_strength: requireString(record, "evidence_strength", "pattern"),
    problem: requireString(record, "problem", "pattern"),
    context: parseContext(record.context),
    mechanism: requireString(record, "mechanism", "pattern"),
    counterexample: requireString(record, "counterexample", "pattern"),
    failure_mode: requireString(record, "failure_mode", "pattern"),
    transfer_conditions: parseTransferConditions(record.transfer_conditions),
    non_transferable_detail: requireString(record, "non_transferable_detail", "pattern"),
    prohibited_imitation_boundary: requireString(record, "prohibited_imitation_boundary", "pattern"),
  };
}

function parseManifest(value: unknown): PatternPacketManifest {
  if (!isRecord(value)) throw new Error("invalid_pattern_manifest");
  if (
    value.schema_version !== "contentmd.pattern-packet-manifest/0.1.0" ||
    value.packet_status !== "frozen_open_development" ||
    value.holdout_eligibility !== "never"
  ) {
    throw new Error("invalid_pattern_manifest:status");
  }
  const rightsStatus = requireString(value, "rights_status", "pattern_manifest");
  if (!ALLOWED_RIGHTS.has(rightsStatus as PatternRightsStatus)) {
    throw new Error("pattern_manifest_rights_status_not_permitted");
  }
  if (!Array.isArray(value.files)) throw new Error("invalid_pattern_manifest:files");
  const files = value.files.map((item) => {
    if (!isRecord(item)) throw new Error("invalid_pattern_manifest:file");
    const path = requireString(item, "path", "pattern_manifest_file");
    const sha256 = requireString(item, "sha256", "pattern_manifest_file");
    if (!/^[a-f0-9]{64}$/u.test(sha256)) throw new Error(`invalid_manifest_digest:${path}`);
    return { path, sha256 };
  });
  const paths = files.map((file) => file.path).sort();
  if (new Set(paths).size !== paths.length || JSON.stringify(paths) !== JSON.stringify(REQUIRED_FILES)) {
    throw new Error("invalid_pattern_manifest:file_set");
  }
  return {
    schema_version: "contentmd.pattern-packet-manifest/0.1.0",
    packet_id: requireString(value, "packet_id", "pattern_manifest"),
    packet_status: "frozen_open_development",
    rights_status: rightsStatus as PatternRightsStatus,
    holdout_eligibility: "never",
    files,
  };
}

function withinRoot(root: string, path: string): boolean {
  const fromRoot = relative(root, path);
  return fromRoot !== ".." && !fromRoot.startsWith(`..${sep}`) && !isAbsolute(fromRoot);
}

export async function ingestPatternPacket(packetRoot: string): Promise<PatternIngestResult> {
  const root = await realpath(packetRoot);
  const manifest = parseManifest(JSON.parse(await readFile(join(root, "manifest.json"), "utf8")) as unknown);
  const contents = new Map<string, Uint8Array>();
  for (const file of manifest.files) {
    const resolved = await realpath(join(root, file.path));
    if (!withinRoot(root, resolved)) throw new Error(`pattern_file_outside_root:${file.path}`);
    const bytes = await readFile(resolved);
    if (sha256Bytes(bytes) !== file.sha256) throw new Error(`manifest_digest_mismatch:${file.path}`);
    contents.set(file.path, bytes);
  }
  const sources = parseJsonLineRecords(
    new TextDecoder().decode(contents.get("sources.jsonl")!),
    "source",
  ).map(parseSource);
  const patterns = parseJsonLineRecords(
    new TextDecoder().decode(contents.get("patterns.jsonl")!),
    "pattern",
  ).map(parsePattern);
  const sourceIds = new Set<string>();
  for (const source of sources) {
    if (sourceIds.has(source.source_id)) throw new Error(`duplicate_pattern_source:${source.source_id}`);
    sourceIds.add(source.source_id);
  }
  const patternIds = new Set<string>();
  for (const pattern of patterns) {
    if (patternIds.has(pattern.pattern_id)) throw new Error(`duplicate_pattern:${pattern.pattern_id}`);
    patternIds.add(pattern.pattern_id);
    for (const sourceRef of pattern.source_refs) {
      if (!sourceIds.has(sourceRef)) throw new Error(`missing_pattern_source:${sourceRef}`);
    }
  }
  sources.sort((left, right) => left.source_id.localeCompare(right.source_id));
  patterns.sort((left, right) => left.pattern_id.localeCompare(right.pattern_id));
  const records = patterns.map((pattern) => convertPatternPacketV01(pattern, {
    scope: {
      memory_scope: "public",
      project_id: null,
      resource_refs: [manifest.packet_id],
      data_classes: [manifest.rights_status],
    },
    provenance: [],
    lifecycle_state: "active",
  }));
  return {
    packet_id: manifest.packet_id,
    packet_digest: sha256Canonical({
      manifest,
      sources,
      patterns,
    }),
    rights_status: manifest.rights_status,
    sources,
    patterns,
    records,
  };
}
