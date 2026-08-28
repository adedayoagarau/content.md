import {
  Ajv2020,
  type ErrorObject,
  type ValidateFunction,
} from "ajv/dist/2020.js";
import baseRecordSchema from "./base-record.schema.json" with { type: "json" };
import contentRecordsSchema from "./content-records.schema.json" with { type: "json" };
import governanceRecordsSchema from "./governance-records.schema.json" with { type: "json" };
import learningRecordsSchema from "./learning-records.schema.json" with { type: "json" };
import modelTrainingStatisticsSchema from "./model-training-statistics.schema.json" with { type: "json" };
import researchRecordsSchema from "./research-records.schema.json" with { type: "json" };
import runtimeRecordsSchema from "./runtime-records.schema.json" with { type: "json" };
import voiceToneRecordsSchema from "./voice-tone-records.schema.json" with { type: "json" };
import workflowRecordsSchema from "./workflow-records.schema.json" with { type: "json" };
import uxWritingRecordsSchema from "./ux-writing-records.schema.json" with { type: "json" };
import uxWritingIntelligenceRecordsSchema from "./ux-writing-intelligence-records.schema.json" with { type: "json" };
import companyKnowledgeRecordsSchema from "./company-knowledge-records.schema.json" with { type: "json" };

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
  generationRun: "contentmd.generation-run-record",
  feedbackQualification: "contentmd.feedback-qualification-record",
  learningEligibility: "contentmd.learning-eligibility-record",
  preferenceExample: "contentmd.preference-example-record",
  exemplar: "contentmd.exemplar-record",
  leakageGroup: "contentmd.leakage-group-record",
  learningDatasetManifest: "contentmd.learning-dataset-manifest",
  featureProfile: "contentmd.feature-profile",
  rankingModel: "contentmd.ranking-model-record",
  modelTrainingStatistics: "contentmd.model-training-statistics-record",
  learningEvaluationRun: "contentmd.learning-evaluation-run",
  shadowEvaluationPlan: "contentmd.shadow-evaluation-plan",
  shadowBinding: "contentmd.shadow-binding-record",
  learningPromotionDecision: "contentmd.learning-promotion-decision",
  learningDeploymentBinding: "contentmd.learning-deployment-binding",
  learningDriftReport: "contentmd.learning-drift-report",
  learningRollback: "contentmd.learning-rollback-record",
  writingBenchmarkManifest: "contentmd.writing-benchmark-manifest",
  writingBenchmarkTask: "contentmd.writing-benchmark-task-record",
  benchmarkCandidateSet: "contentmd.benchmark-candidate-set-record",
  benchmarkSelection: "contentmd.benchmark-selection-record",
  benchmarkReview: "contentmd.benchmark-review-record",
  benchmarkAttempt: "contentmd.benchmark-attempt-record",
  writingBenchmarkRun: "contentmd.writing-benchmark-run",
  researchAcquisitionManifest: "contentmd.research-acquisition-manifest",
  researchSource: "contentmd.research-source-record",
  browserObservation: "contentmd.browser-observation-record",
  researchClaim: "contentmd.research-claim-record",
  observedExpressionEvidence: "contentmd.observed-expression-evidence-record",
  patternDisposition: "contentmd.pattern-disposition-record",
  researchBatchManifest: "contentmd.research-batch-manifest",
  organizationVoiceProfileCandidate: "contentmd.organization-voice-profile-candidate",
  voicePrinciple: "contentmd.voice-principle-record",
  tonePolicy: "contentmd.tone-policy-record",
  domainOverlay: "contentmd.domain-overlay-record",
  voiceToneFeatureDefinition: "contentmd.voice-tone-feature-definition",
  voiceToneMapSnapshot: "contentmd.voice-tone-map-snapshot",
  voiceToneGraphSnapshot: "contentmd.voice-tone-graph-snapshot",
  runtimeDetectionReport: "contentmd.runtime-detection-report",
  runtimeProposal: "contentmd.runtime-proposal-record",
  runtimeBindingDecision: "contentmd.runtime-binding-decision-record",
  runtimeBinding: "contentmd.runtime-binding-record",
  runtimeConformanceReceipt: "contentmd.runtime-conformance-receipt",
  replicaArtifactManifest: "contentmd.replica-artifact-manifest",
  replicaAck: "contentmd.replica-ack-record",
  uxWritingRequest: "contentmd.ux-writing-request-record",
  uxWritingCandidate: "contentmd.ux-writing-candidate-record",
  uxWritingRulePack: "contentmd.ux-writing-rule-pack",
  uxWritingReviewReport: "contentmd.ux-writing-review-report",
  uxWritingRepairBrief: "contentmd.ux-writing-repair-brief",
  companyKnowledgePacket: "contentmd.company-knowledge-packet",
} as const;

export type SchemaId = (typeof SCHEMA_IDS)[keyof typeof SCHEMA_IDS];

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const RFC3339_DATE_TIME = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[Tt]([0-9]{2}):([0-9]{2}):([0-9]{2})(?:\.([0-9]+))?([Zz]|([+-])([0-9]{2}):([0-9]{2}))$/;

function isGregorianLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

function daysInGregorianMonth(year: number, month: number): number {
  if (month === 2) return isGregorianLeapYear(year) ? 29 : 28;
  return [4, 6, 9, 11].includes(month) ? 30 : 31;
}

function shiftGregorianDate(
  year: number,
  month: number,
  day: number,
  direction: -1 | 1,
): readonly [number, number, number] {
  if (direction === 1) {
    if (day < daysInGregorianMonth(year, month)) return [year, month, day + 1];
    if (month < 12) return [year, month + 1, 1];
    return [year + 1, 1, 1];
  }
  if (day > 1) return [year, month, day - 1];
  if (month > 1) return [year, month - 1, daysInGregorianMonth(year, month - 1)];
  return [year - 1, 12, 31];
}

function isPossibleRfc3339LeapSecond(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  offsetMinutes: number,
): boolean {
  let utcMinuteOfDay = hour * 60 + minute - offsetMinutes;
  let utcYear = year;
  let utcMonth = month;
  let utcDay = day;
  if (utcMinuteOfDay < 0) {
    utcMinuteOfDay += 24 * 60;
    [utcYear, utcMonth, utcDay] = shiftGregorianDate(year, month, day, -1);
  } else if (utcMinuteOfDay >= 24 * 60) {
    utcMinuteOfDay -= 24 * 60;
    [utcYear, utcMonth, utcDay] = shiftGregorianDate(year, month, day, 1);
  }

  // RFC 3339 permits second 60 only for an inserted UTC leap second. A static,
  // offline validator cannot know future IERS announcements, so it accepts only
  // the possible insertion slot: 23:59 UTC on a Gregorian month's final day.
  // Whether an insertion was actually announced is an evidence/runtime check.
  return (
    utcYear >= 0 &&
    utcYear <= 9999 &&
    utcMinuteOfDay === 23 * 60 + 59 &&
    utcDay === daysInGregorianMonth(utcYear, utcMonth)
  );
}

function validateRfc3339DateTime(value: string): boolean {
  const match = RFC3339_DATE_TIME.exec(value);
  if (match === null) return false;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const hour = Number(match[4]);
  const minute = Number(match[5]);
  const second = Number(match[6]);
  const offsetHour = match[10] === undefined ? 0 : Number(match[10]);
  const offsetMinute = match[11] === undefined ? 0 : Number(match[11]);
  if (
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > daysInGregorianMonth(year, month) ||
    hour > 23 ||
    minute > 59 ||
    second > 60 ||
    offsetHour > 23 ||
    offsetMinute > 59
  ) {
    return false;
  }

  if (second < 60) return true;
  const offsetSign = match[9] === "-" ? -1 : 1;
  const offsetMinutes = match[8]!.toLowerCase() === "z"
    ? 0
    : offsetSign * (offsetHour * 60 + offsetMinute);
  return isPossibleRfc3339LeapSecond(
    year,
    month,
    day,
    hour,
    minute,
    offsetMinutes,
  );
}

const ajv = new Ajv2020({
  allErrors: true,
  strict: true,
  strictTypes: false,
});

ajv.addFormat("date-time", {
  type: "string",
  validate: validateRfc3339DateTime,
});
ajv.addFormat("uri", {
  type: "string",
  validate(value: string): boolean {
    try {
      const parsed = new URL(value);
      return parsed.protocol.length > 1 && parsed.hostname.length > 0;
    } catch {
      return false;
    }
  },
});
ajv.addSchema(baseRecordSchema);
const contentValidator = ajv.compile(contentRecordsSchema);
const workflowValidator = ajv.compile(workflowRecordsSchema);
const governanceValidator = ajv.compile(governanceRecordsSchema);
ajv.addSchema(learningRecordsSchema);
const modelTrainingStatisticsValidator = ajv.compile(modelTrainingStatisticsSchema);
const researchValidator = ajv.compile(researchRecordsSchema);
const runtimeValidator = ajv.compile(runtimeRecordsSchema);
const voiceToneValidator = ajv.compile(voiceToneRecordsSchema);
const uxWritingValidator = ajv.compile(uxWritingRecordsSchema);
const uxWritingIntelligenceValidator = ajv.compile(uxWritingIntelligenceRecordsSchema);
const companyKnowledgeValidator = ajv.compile(companyKnowledgeRecordsSchema);

const learningSchemaDefs = {
  [SCHEMA_IDS.generationRun]: "generationRunRecord",
  [SCHEMA_IDS.feedbackQualification]: "feedbackQualificationRecord",
  [SCHEMA_IDS.learningEligibility]: "learningEligibilityRecord",
  [SCHEMA_IDS.preferenceExample]: "preferenceExampleRecord",
  [SCHEMA_IDS.exemplar]: "exemplarRecord",
  [SCHEMA_IDS.leakageGroup]: "leakageGroupRecord",
  [SCHEMA_IDS.learningDatasetManifest]: "learningDatasetManifestRecord",
  [SCHEMA_IDS.featureProfile]: "featureProfileRecord",
  [SCHEMA_IDS.rankingModel]: "rankingModelRecord",
  [SCHEMA_IDS.learningEvaluationRun]: "learningEvaluationRunRecord",
  [SCHEMA_IDS.shadowEvaluationPlan]: "shadowEvaluationPlanRecord",
  [SCHEMA_IDS.shadowBinding]: "shadowBindingRecord",
  [SCHEMA_IDS.learningPromotionDecision]: "learningPromotionDecisionRecord",
  [SCHEMA_IDS.learningDeploymentBinding]: "learningDeploymentBindingRecord",
  [SCHEMA_IDS.learningDriftReport]: "learningDriftReportRecord",
  [SCHEMA_IDS.learningRollback]: "learningRollbackRecord",
  [SCHEMA_IDS.writingBenchmarkManifest]: "writingBenchmarkManifestRecord",
  [SCHEMA_IDS.writingBenchmarkTask]: "writingBenchmarkTaskRecord",
  [SCHEMA_IDS.benchmarkCandidateSet]: "benchmarkCandidateSetRecord",
  [SCHEMA_IDS.benchmarkSelection]: "benchmarkSelectionRecord",
  [SCHEMA_IDS.benchmarkReview]: "benchmarkReviewRecord",
  [SCHEMA_IDS.benchmarkAttempt]: "benchmarkAttemptRecord",
  [SCHEMA_IDS.writingBenchmarkRun]: "writingBenchmarkRunRecord",
} as const satisfies Partial<Record<SchemaId, string>>;

const learningValidators = new Map<SchemaId, ValidateFunction>(
  Object.entries(learningSchemaDefs).map(([schemaId, definition]) => [
    schemaId as SchemaId,
    ajv.compile({
      $schema: "https://json-schema.org/draft/2020-12/schema",
      $ref: `${learningRecordsSchema.$id}#/$defs/${definition}`,
    }),
  ]),
);

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

const learningSchemaIds = new Set<SchemaId>(
  Object.keys(learningSchemaDefs) as SchemaId[],
);

const researchSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.researchAcquisitionManifest,
  SCHEMA_IDS.researchSource,
  SCHEMA_IDS.browserObservation,
  SCHEMA_IDS.researchClaim,
  SCHEMA_IDS.observedExpressionEvidence,
  SCHEMA_IDS.patternDisposition,
  SCHEMA_IDS.researchBatchManifest,
]);

const voiceToneSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.organizationVoiceProfileCandidate,
  SCHEMA_IDS.voicePrinciple,
  SCHEMA_IDS.tonePolicy,
  SCHEMA_IDS.domainOverlay,
  SCHEMA_IDS.voiceToneFeatureDefinition,
  SCHEMA_IDS.voiceToneMapSnapshot,
  SCHEMA_IDS.voiceToneGraphSnapshot,
]);

const runtimeSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.runtimeDetectionReport,
  SCHEMA_IDS.runtimeProposal,
  SCHEMA_IDS.runtimeBindingDecision,
  SCHEMA_IDS.runtimeBinding,
  SCHEMA_IDS.runtimeConformanceReceipt,
  SCHEMA_IDS.replicaArtifactManifest,
  SCHEMA_IDS.replicaAck,
]);

const uxWritingSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.uxWritingRequest,
  SCHEMA_IDS.uxWritingCandidate,
]);

const uxWritingIntelligenceSchemaIds = new Set<SchemaId>([
  SCHEMA_IDS.uxWritingRulePack,
  SCHEMA_IDS.uxWritingReviewReport,
  SCHEMA_IDS.uxWritingRepairBrief,
]);

const companyKnowledgeSchemaIds = new Set<SchemaId>([SCHEMA_IDS.companyKnowledgePacket]);

function validatorFor(schemaId: SchemaId): ValidateFunction {
  if (contentSchemaIds.has(schemaId)) return contentValidator;
  if (workflowSchemaIds.has(schemaId)) return workflowValidator;
  if (governanceSchemaIds.has(schemaId)) return governanceValidator;
  if (learningSchemaIds.has(schemaId)) return learningValidators.get(schemaId)!;
  if (schemaId === SCHEMA_IDS.modelTrainingStatistics) return modelTrainingStatisticsValidator;
  if (researchSchemaIds.has(schemaId)) return researchValidator;
  if (runtimeSchemaIds.has(schemaId)) return runtimeValidator;
  if (voiceToneSchemaIds.has(schemaId)) return voiceToneValidator;
  if (uxWritingSchemaIds.has(schemaId)) return uxWritingValidator;
  if (uxWritingIntelligenceSchemaIds.has(schemaId)) return uxWritingIntelligenceValidator;
  if (companyKnowledgeSchemaIds.has(schemaId)) return companyKnowledgeValidator;
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
  learning: learningRecordsSchema,
  modelTrainingStatistics: modelTrainingStatisticsSchema,
  research: researchRecordsSchema,
  runtime: runtimeRecordsSchema,
  voiceTone: voiceToneRecordsSchema,
  uxWriting: uxWritingRecordsSchema,
  uxWritingIntelligence: uxWritingIntelligenceRecordsSchema,
  companyKnowledge: companyKnowledgeRecordsSchema,
});
