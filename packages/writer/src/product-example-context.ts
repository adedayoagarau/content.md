import {
  canonicalJson,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
} from "@contentmd/core";
import type { ModelObjectRef } from "@contentmd/model-provider-sdk";
import {
  createContentTaskPacket,
  type ContentTaskPacket,
} from "./task-packet.js";
import {
  assertReviewFindingPromptBinding,
  verifyAndProjectReviewFindingPromptContext,
  type ReviewFindingPromptContextItem,
} from "./review-finding-context.js";

export type ProductExampleDataClass = "approved_example" | "counterexample";

export interface ProductExampleSemanticMessagePayload {
  intent: string;
  required_facts: string[];
  prohibited_claims: string[];
  journey_state_refs: string[];
}

export interface ProductExampleExpressionSlotPayload {
  semantic_message_ref: string;
  channel: string;
  modality: string;
  surface: string;
  slot: string;
  locale: string;
  state_ref: string;
}

export interface ProductExampleExpressionVersionPayload {
  expression_slot_ref: string;
  expression_payload: string;
  variables: string[];
  decision_ref: string | null;
}

export interface ProductExampleApprovalPayload {
  approval_class: "semantic_decision";
  subject_ref: string;
  subject_digest: string;
  scope: string[];
  status: "issued" | "revoked" | "expired" | "superseded";
  issued_at: string;
  expires_at: string | null;
  revocation_state: "current" | "revoked" | "unknown";
}

export type ProductExampleSemanticMessageRecord = DurableRecord<
  ProductExampleSemanticMessagePayload
>;
export type ProductExampleExpressionSlotRecord = DurableRecord<
  ProductExampleExpressionSlotPayload
>;
export type ProductExampleExpressionVersionRecord = DurableRecord<
  ProductExampleExpressionVersionPayload
>;
export type ProductExampleApprovalRecord = DurableRecord<
  ProductExampleApprovalPayload
>;

export interface QualifyProductExampleForPromptInput {
  project_id: string;
  evaluation_at: string;
  data_class: ProductExampleDataClass;
  task: ContentTaskPacket;
  expression_version: ProductExampleExpressionVersionRecord;
  expression_slot: ProductExampleExpressionSlotRecord;
  semantic_message: ProductExampleSemanticMessageRecord;
  approval_record: ProductExampleApprovalRecord;
  lineage_records: DurableRecord<unknown>[];
  review_finding_context: ReviewFindingPromptContextItem | null;
}

export interface EligibleProductExample {
  contract_version: "contentmd.eligible-product-example/0.1.0";
  project_id: string;
  task_id: string;
  task_digest: string;
  evaluation_at: string;
  data_class: ProductExampleDataClass;
  expression_ref: ModelObjectRef;
  expression_slot_ref: ModelObjectRef;
  semantic_message_ref: ModelObjectRef;
  approval_ref: ModelObjectRef;
  lineage_refs: ModelObjectRef[];
  expression_payload: string;
  variables: string[];
  semantic_intent: string;
  required_fact_refs: string[];
  prohibited_claims: string[];
  journey_state_refs: string[];
  channel: string;
  modality: string;
  surface: string;
  slot: string;
  locale: string;
  state_ref: string;
  source_class: "project_owned";
  rights_state: "prompt_permitted";
  finding_ref: ModelObjectRef | null;
  counterexample_rationale: string | null;
  counterexample_uncertainty: string | null;
  counterexample_next_action: string | null;
  raw_source_locators_included: false;
  authority_effect: "none";
  qualification_digest: string;
}

export interface ProductExamplePromptContextContent
  extends Omit<EligibleProductExample, "contract_version"> {
  contract_version: "contentmd.product-example-prompt-context/0.1.0";
  verification_digest: string;
  context_digest: string;
}

export interface ProductExamplePromptContextVerification {
  contract_version: "contentmd.product-example-prompt-context-verification/0.1.0";
  qualification_input: QualifyProductExampleForPromptInput;
  eligible_example: EligibleProductExample;
  verification_digest: string;
}

export interface ProductExamplePromptContextItem {
  source_ref: ModelObjectRef;
  data_class: ProductExampleDataClass;
  content: ProductExamplePromptContextContent;
  verification: ProductExamplePromptContextVerification;
}

const DIGEST = /^[a-f0-9]{64}$/u;
const RECORD_ID = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/u;
const RFC3339_UTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/u;

function invalid(reason: string): never {
  throw new TypeError(`product_example_prompt_context_invalid:${reason}`);
}

function forbidden(reason: string): never {
  throw new TypeError(`prompt_context_forbidden:${reason}`);
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
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

function assertPlainDataGraph(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("input_shape");
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) invalid("input_shape");
  const expectedPrototype = Array.isArray(value) ? Array.prototype : Object.prototype;
  if (Object.getPrototypeOf(value) !== expectedPrototype) invalid("input_shape");
  ancestors.add(value);
  try {
    const keys = Reflect.ownKeys(value);
    if (Array.isArray(value)
      && (keys.length !== value.length + 1 || keys[keys.length - 1] !== "length")) {
      invalid("input_shape");
    }
    for (const key of keys) {
      if (Array.isArray(value) && key === "length") continue;
      if (typeof key !== "string") invalid("input_shape");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        invalid("input_shape");
      }
      assertPlainDataGraph(descriptor.value, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

function exactKeys(value: object, expected: readonly string[]): boolean {
  return canonicalJson(Object.keys(value).sort(compareUtf8))
    === canonicalJson([...expected].sort(compareUtf8));
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function uniqueStrings(value: unknown, nonempty = false): value is string[] {
  return Array.isArray(value)
    && (!nonempty || value.length > 0)
    && value.every((entry) => text(entry))
    && new Set(value).size === value.length;
}

function refFor(record: DurableRecord<unknown>): ModelObjectRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function assertBaseRecord(record: DurableRecord<unknown>, projectId: string): void {
  if (!exactKeys(record, [
    "record_id", "schema_id", "schema_version", "record_version", "content_digest",
    "scope", "provenance", "lifecycle_state", "payload",
  ])
    || !RECORD_ID.test(record.record_id)
    || !text(record.schema_id)
    || record.schema_version !== "0.1.0"
    || !Number.isSafeInteger(record.record_version)
    || record.record_version < 1
    || !DIGEST.test(record.content_digest)
    || record.lifecycle_state !== "active"
    || !exactKeys(record.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"])
    || record.scope.memory_scope !== "project"
    || record.scope.project_id !== projectId
    || !uniqueStrings(record.scope.resource_refs)
    || !uniqueStrings(record.scope.data_classes)
    || !Array.isArray(record.provenance)
    || !record.provenance.every((entry) => (
      exactKeys(entry, ["record_id", "relationship", "content_digest"])
      && RECORD_ID.test(entry.record_id)
      && text(entry.relationship)
      && DIGEST.test(entry.content_digest)
    ))
    || new Set(record.provenance.map((entry) => canonicalJson(entry))).size
      !== record.provenance.length
    || record.payload === null
    || typeof record.payload !== "object"
    || Array.isArray(record.payload)
    || !verifyRecordDigest(record).valid) {
    invalid("record_integrity");
  }
}

function assertTask(input: QualifyProductExampleForPromptInput): void {
  let replayed: ContentTaskPacket;
  try {
    replayed = createContentTaskPacket(input.task);
  } catch {
    invalid("task_integrity");
  }
  if (canonicalJson(replayed) !== canonicalJson(input.task)) invalid("task_integrity");
}

function assertSpecificRecords(input: QualifyProductExampleForPromptInput): void {
  const expression = input.expression_version;
  const slot = input.expression_slot;
  const message = input.semantic_message;
  const approval = input.approval_record;
  for (const record of [expression, slot, message, approval]) {
    assertBaseRecord(record, input.project_id);
  }
  if (expression.schema_id !== "contentmd.expression-version-record"
    || !exactKeys(expression.payload, [
      "expression_slot_ref", "expression_payload", "variables", "decision_ref",
    ])
    || expression.payload.expression_slot_ref !== slot.record_id
    || !text(expression.payload.expression_payload)
    || !uniqueStrings(expression.payload.variables)
    || expression.payload.decision_ref !== approval.record_id
    || !expression.scope.data_classes.includes(input.data_class)) {
    invalid("expression_integrity");
  }
  if (slot.schema_id !== "contentmd.expression-slot-record"
    || !exactKeys(slot.payload, [
      "semantic_message_ref", "channel", "modality", "surface", "slot", "locale", "state_ref",
    ])
    || !Object.values(slot.payload).every((value) => text(value))
    || slot.payload.semantic_message_ref !== message.record_id
    || slot.payload.channel !== input.task.channel
    || slot.payload.locale !== input.task.locale
    || !input.task.journey_state_refs.includes(slot.payload.state_ref)) {
    invalid("slot_scope");
  }
  if (message.schema_id !== "contentmd.semantic-message-record"
    || !exactKeys(message.payload, [
      "intent", "required_facts", "prohibited_claims", "journey_state_refs",
    ])
    || !text(message.payload.intent)
    || !uniqueStrings(message.payload.required_facts)
    || !uniqueStrings(message.payload.prohibited_claims)
    || !uniqueStrings(message.payload.journey_state_refs, true)
    || message.record_id !== input.task.semantic_message_ref
    || canonicalJson(message.payload.required_facts) !== canonicalJson(input.task.required_fact_refs)
    || canonicalJson(message.payload.prohibited_claims) !== canonicalJson(input.task.prohibited_claims)
    || canonicalJson(message.payload.journey_state_refs) !== canonicalJson(input.task.journey_state_refs)) {
    invalid("semantic_message_scope");
  }
  if (approval.schema_id !== "contentmd.approval-record"
    || !exactKeys(approval.payload, [
      "approval_class", "subject_ref", "subject_digest", "scope", "status",
      "issued_at", "expires_at", "revocation_state",
    ])
    || approval.payload.approval_class !== "semantic_decision"
    || approval.payload.subject_ref !== expression.record_id
    || approval.payload.subject_digest !== expression.content_digest
    || !uniqueStrings(approval.payload.scope, true)
    || approval.payload.status !== "issued"
    || approval.payload.revocation_state !== "current"
    || !RFC3339_UTC.test(approval.payload.issued_at)
    || (approval.payload.expires_at !== null && !RFC3339_UTC.test(approval.payload.expires_at))) {
    invalid("approval_integrity");
  }
}

function assertApprovalScope(input: QualifyProductExampleForPromptInput): void {
  if (!RFC3339_UTC.test(input.evaluation_at)) invalid("evaluation_at");
  const evaluatedAt = Date.parse(input.evaluation_at);
  const issuedAt = Date.parse(input.approval_record.payload.issued_at);
  const expiresAt = input.approval_record.payload.expires_at === null
    ? null
    : Date.parse(input.approval_record.payload.expires_at);
  if (!Number.isFinite(evaluatedAt)
    || !Number.isFinite(issuedAt)
    || issuedAt > evaluatedAt
    || (expiresAt !== null && (!Number.isFinite(expiresAt) || evaluatedAt >= expiresAt))) {
    invalid("approval_not_current");
  }
  const requiredScope = [
    `project:${input.project_id}`,
    `task:${input.task.task_id}`,
    `data_class:${input.data_class}`,
    `semantic_message:${input.semantic_message.record_id}`,
    `channel:${input.expression_slot.payload.channel}`,
    `locale:${input.expression_slot.payload.locale}`,
    `state:${input.expression_slot.payload.state_ref}`,
    "rights:prompt_permitted",
    "source_class:project_owned",
  ];
  if (input.data_class === "counterexample") {
    if (input.review_finding_context === null) invalid("counterexample_finding");
    requiredScope.push(`finding:${input.review_finding_context.source_ref.record_id}`);
  } else if (input.review_finding_context !== null) {
    invalid("approved_example_finding");
  }
  if (requiredScope.some((value) => !input.approval_record.payload.scope.includes(value))) {
    invalid("approval_scope");
  }
}

function assertCounterexampleFinding(
  input: QualifyProductExampleForPromptInput,
): Omit<ReviewFindingPromptContextItem, "verification"> | null {
  if (input.data_class === "approved_example") {
    if (input.review_finding_context !== null) invalid("approved_example_finding");
    return null;
  }
  if (input.review_finding_context === null) invalid("counterexample_finding");
  let projected: Omit<ReviewFindingPromptContextItem, "verification">;
  try {
    projected = verifyAndProjectReviewFindingPromptContext(input.review_finding_context);
    assertReviewFindingPromptBinding(projected, input.task, input.project_id);
  } catch {
    invalid("counterexample_finding");
  }
  const findingOccurrenceRefs = new Set(projected.content.occurrence_refs);
  const matchingOccurrences = input.review_finding_context.verification.qualification_input
    .review_input.occurrences.filter((occurrence) => (
      findingOccurrenceRefs.has(occurrence.occurrence_id)
      && occurrence.expression_payload === input.expression_version.payload.expression_payload
      && occurrence.locale === input.expression_slot.payload.locale
      && occurrence.channel === input.expression_slot.payload.channel
    ));
  if (matchingOccurrences.length !== 1
    || !input.approval_record.payload.scope.includes(`finding:${projected.source_ref.record_id}`)) {
    invalid("counterexample_finding_binding");
  }
  return projected;
}

function assertLineage(input: QualifyProductExampleForPromptInput): ModelObjectRef[] {
  const lineageById = new Map<string, DurableRecord<unknown>>();
  for (const record of input.lineage_records) {
    assertBaseRecord(record, input.project_id);
    if (lineageById.has(record.record_id)) invalid("duplicate_lineage_record");
    lineageById.set(record.record_id, record);
  }
  const required = new Map<string, string>();
  for (const record of [
    input.expression_version,
    input.expression_slot,
    input.semantic_message,
    input.approval_record,
  ]) {
    for (const provenance of record.provenance) {
      const prior = required.get(provenance.record_id);
      if (prior !== undefined && prior !== provenance.content_digest) invalid("lineage_conflict");
      required.set(provenance.record_id, provenance.content_digest);
    }
  }
  if (required.size !== lineageById.size) invalid("lineage_coverage");
  for (const [recordId, digest] of required) {
    const record = lineageById.get(recordId);
    if (record === undefined || record.content_digest !== digest) invalid("lineage_binding");
  }
  return [...lineageById.values()]
    .map(refFor)
    .sort((left, right) => compareUtf8(left.record_id, right.record_id));
}

export function qualifyProductExampleForPrompt(
  input: QualifyProductExampleForPromptInput,
): EligibleProductExample {
  assertPlainDataGraph(input);
  if (!exactKeys(input, [
    "project_id", "evaluation_at", "data_class", "task", "expression_version",
    "expression_slot", "semantic_message", "approval_record", "lineage_records",
    "review_finding_context",
  ])
    || !text(input.project_id)
    || (input.data_class !== "approved_example" && input.data_class !== "counterexample")) {
    invalid("input_shape");
  }
  assertTask(input);
  assertSpecificRecords(input);
  const counterexampleFinding = assertCounterexampleFinding(input);
  assertApprovalScope(input);
  const lineageRefs = assertLineage(input);
  const preimage = {
    contract_version: "contentmd.eligible-product-example/0.1.0" as const,
    project_id: input.project_id,
    task_id: input.task.task_id,
    task_digest: input.task.task_digest,
    evaluation_at: input.evaluation_at,
    data_class: input.data_class,
    expression_ref: refFor(input.expression_version),
    expression_slot_ref: refFor(input.expression_slot),
    semantic_message_ref: refFor(input.semantic_message),
    approval_ref: refFor(input.approval_record),
    lineage_refs: lineageRefs,
    expression_payload: input.expression_version.payload.expression_payload,
    variables: canonicalClone(input.expression_version.payload.variables),
    semantic_intent: input.semantic_message.payload.intent,
    required_fact_refs: canonicalClone(input.semantic_message.payload.required_facts),
    prohibited_claims: canonicalClone(input.semantic_message.payload.prohibited_claims),
    journey_state_refs: canonicalClone(input.semantic_message.payload.journey_state_refs),
    channel: input.expression_slot.payload.channel,
    modality: input.expression_slot.payload.modality,
    surface: input.expression_slot.payload.surface,
    slot: input.expression_slot.payload.slot,
    locale: input.expression_slot.payload.locale,
    state_ref: input.expression_slot.payload.state_ref,
    source_class: "project_owned" as const,
    rights_state: "prompt_permitted" as const,
    finding_ref: counterexampleFinding === null
      ? null
      : canonicalClone(counterexampleFinding.content.finding_ref),
    counterexample_rationale: counterexampleFinding?.content.rationale ?? null,
    counterexample_uncertainty: counterexampleFinding?.content.uncertainty ?? null,
    counterexample_next_action: counterexampleFinding?.content.suggested_next_action ?? null,
    raw_source_locators_included: false as const,
    authority_effect: "none" as const,
  };
  return deepFreeze({
    ...preimage,
    qualification_digest: sha256Canonical(preimage),
  });
}

function buildContent(
  eligible: EligibleProductExample,
  verificationDigest: string,
): ProductExamplePromptContextContent {
  const {
    contract_version: _eligibleContract,
    qualification_digest,
    ...fields
  } = canonicalClone(eligible);
  const preimage = {
    contract_version: "contentmd.product-example-prompt-context/0.1.0" as const,
    ...fields,
    qualification_digest,
    verification_digest: verificationDigest,
  };
  return {
    ...preimage,
    context_digest: sha256Canonical(preimage),
  };
}

export function createProductExamplePromptContext(
  input: QualifyProductExampleForPromptInput,
): ProductExamplePromptContextItem {
  const qualificationInput = canonicalClone(input);
  const eligibleExample = qualifyProductExampleForPrompt(qualificationInput);
  const verificationPreimage = {
    contract_version: "contentmd.product-example-prompt-context-verification/0.1.0" as const,
    qualification_input: qualificationInput,
    eligible_example: canonicalClone(eligibleExample),
  };
  const verificationDigest = sha256Canonical(verificationPreimage);
  return deepFreeze({
    source_ref: refFor(qualificationInput.expression_version),
    data_class: qualificationInput.data_class,
    content: buildContent(eligibleExample, verificationDigest),
    verification: {
      ...verificationPreimage,
      verification_digest: verificationDigest,
    },
  });
}

export function verifyAndProjectProductExamplePromptContext(
  value: ProductExamplePromptContextItem,
): Omit<ProductExamplePromptContextItem, "verification"> {
  assertPlainDataGraph(value);
  let replayed: ProductExamplePromptContextItem;
  try {
    replayed = createProductExamplePromptContext(value.verification.qualification_input);
  } catch {
    forbidden("approved_example_unverified");
  }
  if (canonicalJson(value.verification.eligible_example)
      !== canonicalJson(replayed.verification.eligible_example)
    || value.verification.verification_digest !== replayed.verification.verification_digest
    || canonicalJson(value.source_ref) !== canonicalJson(replayed.source_ref)
    || value.data_class !== replayed.data_class
    || canonicalJson(value.content) !== canonicalJson(replayed.content)) {
    forbidden("approved_example_replay_mismatch");
  }
  return deepFreeze({
    source_ref: canonicalClone(replayed.source_ref),
    data_class: replayed.data_class,
    content: canonicalClone(replayed.content),
  });
}

export function assertProductExamplePromptBinding(
  value: Omit<ProductExamplePromptContextItem, "verification">,
  task: ContentTaskPacket,
  projectId: string,
): void {
  if (value.content.project_id !== projectId) forbidden("approved_example_scope");
  if (value.content.task_id !== task.task_id
    || value.content.task_digest !== task.task_digest) {
    forbidden("approved_example_task_binding");
  }
}
