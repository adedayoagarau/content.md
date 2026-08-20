import {
  Ajv2020,
  type ErrorObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import baseRecordSchema from "./base-record.schema.json" with { type: "json" };
import contentRecordsSchema from "./content-records.schema.json" with { type: "json" };
import governanceRecordsSchema from "./governance-records.schema.json" with { type: "json" };
import workflowRecordsSchema from "./workflow-records.schema.json" with { type: "json" };

export const SCHEMA_IDS = {
  source: "contentmd.source-record",
  evidence: "contentmd.evidence-record",
  product: "contentmd.product-record",
  audience: "contentmd.audience-record",
  journeyState: "contentmd.journey-state-record",
  iaNode: "contentmd.ia-node-record",
  navigationRelation: "contentmd.navigation-relation-record",
  semanticMessage: "contentmd.semantic-message-record",
  expressionSlot: "contentmd.expression-slot-record",
  expressionVersion: "contentmd.expression-version-record",
  implementationOccurrence: "contentmd.implementation-occurrence-record",
  contentPattern: "contentmd.content-pattern-record",
  finding: "contentmd.finding-record",
  proposal: "contentmd.proposal-record",
  contentDecision: "contentmd.content-decision-record",
  learningCandidate: "contentmd.learning-candidate-record",
  policyDecision: "contentmd.policy-decision-record",
  approval: "contentmd.approval-record",
  changeTransaction: "contentmd.change-transaction-record",
  verificationReceipt: "contentmd.verification-receipt-record",
  auditEvent: "contentmd.audit-event-record",
} as const;

export type SchemaId = (typeof SCHEMA_IDS)[keyof typeof SCHEMA_IDS];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  strictTypes: false,
});

ajv.addSchema(baseRecordSchema);
const contentValidator = ajv.compile(contentRecordsSchema);
const workflowValidator = ajv.compile(workflowRecordsSchema);
const governanceValidator = ajv.compile(governanceRecordsSchema);

const contentSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.source,
  SCHEMA_IDS.evidence,
  SCHEMA_IDS.product,
  SCHEMA_IDS.audience,
  SCHEMA_IDS.journeyState,
  SCHEMA_IDS.iaNode,
  SCHEMA_IDS.navigationRelation,
  SCHEMA_IDS.semanticMessage,
  SCHEMA_IDS.expressionSlot,
  SCHEMA_IDS.expressionVersion,
  SCHEMA_IDS.implementationOccurrence,
  SCHEMA_IDS.contentPattern,
]);

const workflowSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.finding,
  SCHEMA_IDS.proposal,
  SCHEMA_IDS.contentDecision,
  SCHEMA_IDS.learningCandidate,
]);

const governanceSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.policyDecision,
  SCHEMA_IDS.approval,
  SCHEMA_IDS.changeTransaction,
  SCHEMA_IDS.verificationReceipt,
  SCHEMA_IDS.auditEvent,
]);

function validatorFor(schemaId: SchemaId): ValidateFunction {
  if (contentSchemaIds.has(schemaId)) return contentValidator;
  if (workflowSchemaIds.has(schemaId)) return workflowValidator;
  if (governanceSchemaIds.has(schemaId)) return governanceValidator;
  throw new TypeError(`Unknown schema_id: ${schemaId}`);
}

function formatError(error: ErrorObject): string {
  const path = error.instancePath.length > 0 ? error.instancePath : "/";
  const params = Object.entries(error.params)
    .map(([key, value]) => `${key}=${String(value)}`)
    .join(", ");
  return `${path} ${error.message ?? "is invalid"}${params.length > 0 ? ` (${params})` : ""}`;
}

function recordSchemaId(value: unknown): string | null {
  if (typeof value !== "object" || value === null || !("schema_id" in value)) return null;
  const schemaId = (value as { schema_id?: unknown }).schema_id;
  return typeof schemaId === "string" ? schemaId : null;
}

export function isSchemaId(value: string): value is SchemaId {
  return Object.values(SCHEMA_IDS).includes(value as SchemaId);
}

export function validateRecord(schemaId: SchemaId, value: unknown): ValidationResult {
  const receivedSchemaId = recordSchemaId(value);
  if (receivedSchemaId !== schemaId) {
    return {
      valid: false,
      errors: [
        `schema_id mismatch: expected ${schemaId}, received ${receivedSchemaId ?? "missing"}`,
      ],
    };
  }

  const validator = validatorFor(schemaId);
  const valid = validator(value);
  return {
    valid,
    errors: valid ? [] : (validator.errors ?? []).map(formatError),
  };
}

export function validateRecordSet(records: readonly unknown[]): ValidationResult {
  const errors: string[] = [];
  const seenRecordIds = new Set<string>();

  for (const record of records) {
    if (typeof record !== "object" || record === null) {
      errors.push("record must be an object");
      continue;
    }

    const recordId = "record_id" in record ? (record as { record_id?: unknown }).record_id : null;
    if (typeof recordId !== "string") {
      errors.push("record_id missing or invalid");
    } else if (seenRecordIds.has(recordId)) {
      errors.push(`duplicate record_id: ${recordId}`);
    } else {
      seenRecordIds.add(recordId);
    }

    const schemaId = recordSchemaId(record);
    if (schemaId === null || !isSchemaId(schemaId)) {
      errors.push(`unknown schema_id: ${schemaId ?? "missing"}`);
      continue;
    }

    const result = validateRecord(schemaId, record);
    errors.push(...result.errors.map((error) => `${recordId ?? "unknown"}: ${error}`));
  }

  return { valid: errors.length === 0, errors };
}

export const schemaDocuments = Object.freeze({
  base: baseRecordSchema,
  content: contentRecordsSchema,
  workflow: workflowRecordsSchema,
  governance: governanceRecordsSchema,
});
