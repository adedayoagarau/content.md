import { createHash } from "node:crypto";
import {
  Ajv2020,
  type ErrorObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import candidateRankingSchema from "./model-output/candidate-ranking.schema.json" with { type: "json" };
import classificationSchema from "./model-output/classification.schema.json" with { type: "json" };
import draftSchema from "./model-output/draft.schema.json" with { type: "json" };
import evaluationSchema from "./model-output/evaluation.schema.json" with { type: "json" };
import rewriteSchema from "./model-output/rewrite.schema.json" with { type: "json" };
import strategySchema from "./model-output/strategy.schema.json" with { type: "json" };
import uxRepairRewriteSchema from "./model-output/ux-repair-rewrite.schema.json" with { type: "json" };

export const MODEL_OUTPUT_SCHEMA_IDS = [
  "contentmd.strategy-model-output/0.1.0",
  "contentmd.draft-model-output/0.1.0",
  "contentmd.rewrite-model-output/0.1.0",
  "contentmd.ux-repair-rewrite-model-output/0.1.0",
  "contentmd.classification-model-output/0.1.0",
  "contentmd.evaluation-model-output/0.1.0",
  "contentmd.candidate-ranking-model-output/0.1.0",
] as const;

export type ModelOutputSchemaId = (typeof MODEL_OUTPUT_SCHEMA_IDS)[number];

export type ModelOutputSchemaErrorCode =
  | "model_output_invalid"
  | "model_schema_not_projectable"
  | "unknown_model_output_schema";

export interface ModelOutputValidationFinding {
  instance_path: string;
  schema_path: string;
  keyword: string;
  message: string;
  params: Readonly<Record<string, unknown>>;
}

export interface ModelOutputValidationResult {
  valid: boolean;
  findings: ModelOutputValidationFinding[];
}

export interface ProviderModelOutputSchemaProjection {
  projection_id: string;
  source_schema_id: ModelOutputSchemaId;
  source_schema_digest: string;
  projection_digest: string;
  strict: true;
  schema: Readonly<Record<string, unknown>>;
}

export interface ModelOutputSchemaDefinition {
  schema_id: ModelOutputSchemaId;
  schema_version: "0.1.0";
  schema_digest: string;
  canonical_schema: Readonly<Record<string, unknown>>;
  maximum_output_bytes: number;
  projection_compatibility: {
    status: "compatible";
    reason_codes: readonly [];
  };
  provider_projection: ProviderModelOutputSchemaProjection;
  validate(value: unknown): ModelOutputValidationResult;
  canonicalize(value: unknown): string;
}

export class ModelOutputSchemaError extends Error {
  readonly code: ModelOutputSchemaErrorCode;
  readonly findings: readonly ModelOutputValidationFinding[];

  constructor(
    code: ModelOutputSchemaErrorCode,
    detail: string,
    findings: readonly ModelOutputValidationFinding[] = [],
  ) {
    super(`${code}:${detail}`);
    this.name = "ModelOutputSchemaError";
    this.code = code;
    this.findings = findings;
  }
}

type SchemaDocument = Record<string, unknown>;

const SCHEMA_DOCUMENTS: Readonly<Record<ModelOutputSchemaId, SchemaDocument>> = Object.freeze({
  "contentmd.strategy-model-output/0.1.0": strategySchema as SchemaDocument,
  "contentmd.draft-model-output/0.1.0": draftSchema as SchemaDocument,
  "contentmd.rewrite-model-output/0.1.0": rewriteSchema as SchemaDocument,
  "contentmd.ux-repair-rewrite-model-output/0.1.0": uxRepairRewriteSchema as SchemaDocument,
  "contentmd.classification-model-output/0.1.0": classificationSchema as SchemaDocument,
  "contentmd.evaluation-model-output/0.1.0": evaluationSchema as SchemaDocument,
  "contentmd.candidate-ranking-model-output/0.1.0": candidateRankingSchema as SchemaDocument,
});

const MAXIMUM_OUTPUT_BYTES: Readonly<Record<ModelOutputSchemaId, number>> = Object.freeze({
  "contentmd.strategy-model-output/0.1.0": 65_536,
  "contentmd.draft-model-output/0.1.0": 131_072,
  "contentmd.rewrite-model-output/0.1.0": 131_072,
  "contentmd.ux-repair-rewrite-model-output/0.1.0": 131_072,
  "contentmd.classification-model-output/0.1.0": 32_768,
  "contentmd.evaluation-model-output/0.1.0": 131_072,
  "contentmd.candidate-ranking-model-output/0.1.0": 131_072,
});

function failCanonical(path: string, detail: string): never {
  throw new TypeError(`Value at ${path} is not canonical JSON: ${detail}`);
}

function canonicalizeJson(value: unknown, path: string, ancestors: Set<object>): string {
  if (value === null) return "null";
  if (typeof value === "string" || typeof value === "boolean") return JSON.stringify(value);
  if (typeof value === "number") {
    if (!Number.isFinite(value)) failCanonical(path, "numbers must be finite");
    return JSON.stringify(Object.is(value, -0) ? 0 : value);
  }
  if (typeof value !== "object") failCanonical(path, `unsupported ${typeof value} value`);
  if (ancestors.has(value)) failCanonical(path, "cycles are not supported");

  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      return `[${value.map((item, index) =>
        canonicalizeJson(item, `${path}[${index}]`, ancestors)).join(",")}]`;
    }
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      failCanonical(path, "objects must be plain records");
    }
    const ownKeys = Reflect.ownKeys(value);
    if (ownKeys.some((key) => typeof key !== "string")) {
      failCanonical(path, "symbol keys are not supported");
    }
    const keys = (ownKeys as string[]).sort((left, right) => left.localeCompare(right, "en"));
    return `{${keys.map((key) => {
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        failCanonical(`${path}.${key}`, "properties must be enumerable data properties");
      }
      return `${JSON.stringify(key)}:${canonicalizeJson(descriptor.value, `${path}.${key}`, ancestors)}`;
    }).join(",")}}`;
  } finally {
    ancestors.delete(value);
  }
}

function canonicalJson(value: unknown): string {
  return `${canonicalizeJson(value, "$", new Set())}\n`;
}

function sha256Canonical(value: unknown): string {
  return createHash("sha256").update(canonicalJson(value), "utf8").digest("hex");
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

const PROJECTABLE_KEYWORDS = new Set([
  "type",
  "const",
  "enum",
  "properties",
  "required",
  "additionalProperties",
  "items",
  "minItems",
  "maxItems",
  "minimum",
  "maximum",
  "minLength",
  "maxLength",
]);

const PROJECTION_METADATA = new Set(["$schema", "$id", "title", "description"]);

function projectionFailure(path: string, detail: string): never {
  throw new ModelOutputSchemaError(
    "model_schema_not_projectable",
    `${path}:${detail}`,
  );
}

function projectSchemaNode(value: unknown, path: string): Record<string, unknown> {
  if (!isPlainRecord(value)) projectionFailure(path, "schema node must be a plain object");
  const projected: Record<string, unknown> = {};

  for (const key of Object.keys(value)) {
    if (PROJECTION_METADATA.has(key)) continue;
    if (!PROJECTABLE_KEYWORDS.has(key)) projectionFailure(`${path}.${key}`, "unsupported keyword");
    const item = value[key];
    if (key === "properties") {
      if (!isPlainRecord(item)) projectionFailure(`${path}.properties`, "must be an object");
      projected.properties = Object.fromEntries(
        Object.entries(item).map(([property, propertySchema]) => [
          property,
          projectSchemaNode(propertySchema, `${path}.properties.${property}`),
        ]),
      );
    } else if (key === "items") {
      projected.items = projectSchemaNode(item, `${path}.items`);
    } else {
      projected[key] = structuredClone(item);
    }
  }

  const types = typeof projected.type === "string"
    ? [projected.type]
    : Array.isArray(projected.type)
      ? projected.type
      : [];
  if (types.includes("object")) {
    if (!isPlainRecord(projected.properties)) {
      projectionFailure(path, "object schemas require properties");
    }
    if (projected.additionalProperties !== false) {
      projectionFailure(path, "object schemas must be closed");
    }
    const propertyNames = Object.keys(projected.properties);
    if (!Array.isArray(projected.required)
      || projected.required.some((item) => typeof item !== "string")
      || JSON.stringify(projected.required) !== JSON.stringify(propertyNames)) {
      projectionFailure(path, "all object properties must remain required");
    }
  }
  if (types.includes("array") && !isPlainRecord(projected.items)) {
    projectionFailure(path, "array schemas require one item schema");
  }
  return projected;
}

export function projectModelOutputSchemaDocument(
  document: unknown,
): Readonly<Record<string, unknown>> {
  return deepFreeze(projectSchemaNode(document, "$"));
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

function findingsFrom(errors: readonly ErrorObject[] | null | undefined): ModelOutputValidationFinding[] {
  return (errors ?? []).map((error) => ({
    instance_path: error.instancePath,
    schema_path: error.schemaPath,
    keyword: error.keyword,
    message: error.message ?? "is invalid",
    params: Object.freeze({ ...error.params }),
  }));
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  strictTypes: false,
  coerceTypes: false,
  removeAdditional: false,
  useDefaults: false,
});

const definitions = new Map<ModelOutputSchemaId, ModelOutputSchemaDefinition>();
for (const schemaId of MODEL_OUTPUT_SCHEMA_IDS) {
  const canonicalSchema = SCHEMA_DOCUMENTS[schemaId];
  const schemaDigest = sha256Canonical(canonicalSchema);
  const validator: ValidateFunction = ajv.compile(canonicalSchema);
  const providerSchema = projectModelOutputSchemaDocument(canonicalSchema);
  const projection: ProviderModelOutputSchemaProjection = deepFreeze({
    projection_id: `${schemaId}#provider-strict/0.1.0`,
    source_schema_id: schemaId,
    source_schema_digest: schemaDigest,
    projection_digest: sha256Canonical(providerSchema),
    strict: true,
    schema: providerSchema,
  });
  const definition: ModelOutputSchemaDefinition = {
    schema_id: schemaId,
    schema_version: "0.1.0",
    schema_digest: schemaDigest,
    canonical_schema: deepFreeze(structuredClone(canonicalSchema)),
    maximum_output_bytes: MAXIMUM_OUTPUT_BYTES[schemaId],
    projection_compatibility: Object.freeze({
      status: "compatible" as const,
      reason_codes: [] as const,
    }),
    provider_projection: projection,
    validate(value: unknown): ModelOutputValidationResult {
      const valid = validator(value) as boolean;
      return { valid, findings: valid ? [] : findingsFrom(validator.errors) };
    },
    canonicalize(value: unknown): string {
      const valid = validator(value) as boolean;
      if (!valid) {
        const findings = findingsFrom(validator.errors);
        throw new ModelOutputSchemaError("model_output_invalid", schemaId, findings);
      }
      const bytes = canonicalJson(value);
      if (Buffer.byteLength(bytes, "utf8") > MAXIMUM_OUTPUT_BYTES[schemaId]) {
        throw new ModelOutputSchemaError("model_output_invalid", `${schemaId}:output_too_large`);
      }
      return bytes;
    },
  };
  definitions.set(schemaId, deepFreeze(definition));
}

export function resolveModelOutputSchema(
  schemaId: ModelOutputSchemaId,
): ModelOutputSchemaDefinition {
  const definition = definitions.get(schemaId);
  if (definition === undefined) {
    throw new ModelOutputSchemaError("unknown_model_output_schema", String(schemaId));
  }
  return definition;
}

export const modelOutputSchemaDocuments = deepFreeze(
  Object.fromEntries(MODEL_OUTPUT_SCHEMA_IDS.map((schemaId) => [
    schemaId,
    structuredClone(SCHEMA_DOCUMENTS[schemaId]),
  ])) as Record<ModelOutputSchemaId, SchemaDocument>,
);
