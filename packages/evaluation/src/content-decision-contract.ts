import { canonicalJson, sha256Canonical } from "@contentmd/core";

export const CONTENT_DECISION_CONTRACT_VERSION =
  "contentmd.content-decision-contract/0.1.0" as const;

export const CONTENT_DESIGN_STAGES = [
  "discover",
  "frame",
  "model",
  "decide",
  "specify",
  "design",
  "write",
  "review",
  "implement",
  "verify",
  "measure",
  "maintain",
  "retire",
] as const;
export type ContentDesignStage = typeof CONTENT_DESIGN_STAGES[number];

export const CONTENT_DECISION_CLASSIFICATION_DIMENSIONS = [
  "work_intent",
  "product_context",
  "evidence_authority",
  "user_context",
  "user_need",
  "product_need",
  "content_need",
  "experience",
  "content_object",
  "risk",
  "governance",
  "voice_profile",
  "tone_context",
  "lifecycle",
] as const;
export type ContentDecisionClassificationDimension =
  typeof CONTENT_DECISION_CLASSIFICATION_DIMENSIONS[number];

export const CONTENT_INTERVENTION_TYPES = [
  "no_content_change",
  "remove_content",
  "restructure_content",
  "change_interaction",
  "change_product_behavior",
  "create_or_revise_content",
  "research_required",
  "policy_decision_required",
  "specialist_review_required",
  "undecided",
] as const;
export type ContentInterventionType = typeof CONTENT_INTERVENTION_TYPES[number];

export type ContentDecisionEvidenceStatus =
  | "established"
  | "proposed"
  | "unknown"
  | "conflicting"
  | "not_applicable";
export type ContentDecisionMethod = "deterministic" | "model" | "human" | "hybrid";

export interface ContentDecisionClassification {
  dimension: ContentDecisionClassificationDimension;
  status: ContentDecisionEvidenceStatus;
  label: string | null;
  candidate_labels: string[];
  evidence_refs: string[];
  rationale: string;
  method: ContentDecisionMethod;
  method_ref: string;
}

export interface ContentDecisionNeed {
  status: ContentDecisionEvidenceStatus;
  statement: string | null;
  evidence_refs: string[];
  rationale: string;
  method: ContentDecisionMethod;
  method_ref: string;
}

export interface ContentDecisionNeeds {
  user: ContentDecisionNeed;
  product: ContentDecisionNeed;
  content: ContentDecisionNeed;
}

export interface ContentInterventionDecision {
  status: "decided" | "proposed" | "undecided";
  type: ContentInterventionType;
  rationale: string;
  evidence_refs: string[];
  method: ContentDecisionMethod;
  method_ref: string;
}

export interface ContentDecisionSubject {
  product_ref: string;
  surface: string;
  channel: string;
  locale: string;
}

export type ContentDecisionFactStatus = "established" | "unknown" | "conflicting";

export interface ContentDecisionRequiredFact {
  fact_id: string;
  requirement: string;
  value: string | null;
  status: ContentDecisionFactStatus;
  evidence_refs: string[];
}

export interface ContentDecisionSemanticInvariant {
  invariant_id: string;
  statement: string;
  evidence_refs: string[];
}

export type ContentDecisionReversibility =
  | "reversible"
  | "conditionally_reversible"
  | "irreversible"
  | "unknown"
  | "not_applicable";

export type ContentDecisionOutcomeEvidence =
  | "confirmed"
  | "partial"
  | "failed"
  | "unknown"
  | "not_applicable";

export interface ContentDecisionActionContract {
  action_id: string;
  actor: string;
  object: string;
  consequence: string;
  reversibility: ContentDecisionReversibility;
  outcome_evidence: ContentDecisionOutcomeEvidence;
  recovery: string | null;
}

export interface ContentDecisionSemanticContract {
  intended_outcome: string;
  required_facts: ContentDecisionRequiredFact[];
  semantic_invariants: ContentDecisionSemanticInvariant[];
  prohibited_claims: string[];
  action_contracts: ContentDecisionActionContract[];
  information_requirements: string[];
}

export interface ContentDecisionVoicePolicy {
  status: "approved" | "proposed" | "missing" | "not_applicable";
  profile_ref: string | null;
}

export interface ContentDecisionExpressionPolicy {
  voice: ContentDecisionVoicePolicy;
  tone_policy_refs: string[];
  terminology_refs: string[];
  accessibility_requirements: string[];
  channel_constraints: string[];
}

export interface ContentDecisionAssurancePlan {
  core_criterion_ids: string[];
  overlay_refs: string[];
  acceptance_criteria: string[];
  specialist_review_requirements: string[];
}

export interface ContentDecisionContractInput {
  stage: ContentDesignStage;
  subject: ContentDecisionSubject;
  classifications: ContentDecisionClassification[];
  needs: ContentDecisionNeeds;
  intervention: ContentInterventionDecision;
  semantic_contract: ContentDecisionSemanticContract;
  expression_policy: ContentDecisionExpressionPolicy;
  assurance_plan: ContentDecisionAssurancePlan;
  unresolved_questions: string[];
  supersedes_contract_digest: string | null;
}

export interface ContentDecisionContract extends ContentDecisionContractInput {
  contract_version: typeof CONTENT_DECISION_CONTRACT_VERSION;
  contract_id: string;
  authority_effect: "none";
  contract_digest: string;
}

const EVIDENCE_STATUSES = [
  "established", "proposed", "unknown", "conflicting", "not_applicable",
] as const;
const DECISION_METHODS = ["deterministic", "model", "human", "hybrid"] as const;
const FACT_STATUSES = ["established", "unknown", "conflicting"] as const;
const REVERSIBILITY = [
  "reversible", "conditionally_reversible", "irreversible", "unknown", "not_applicable",
] as const;
const OUTCOME_EVIDENCE = ["confirmed", "partial", "failed", "unknown", "not_applicable"] as const;
const VOICE_STATUSES = ["approved", "proposed", "missing", "not_applicable"] as const;
const CONTENT_PRODUCING_STAGES = [
  "specify", "design", "write", "review", "implement", "verify",
] as const;
const CONTENT_PRODUCING_INTERVENTIONS = [
  "create_or_revise_content", "restructure_content",
] as const;

function invalid(reason: string): never {
  throw new TypeError(`content_decision_contract_invalid:${reason}`);
}

function lexical(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function member<T extends string>(value: unknown, values: readonly T[], field: string): T {
  if (typeof value !== "string" || !values.includes(value as T)) invalid(field);
  return value as T;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
  return value.trim();
}

function nullableText(value: unknown, field: string): string | null {
  if (value === null) return null;
  return requiredText(value, field);
}

function uniqueSortedText(values: unknown, field: string): string[] {
  if (!Array.isArray(values)) invalid(field);
  return [...new Set(values.map((value, index) => requiredText(value, `${field}.${index}`)))]
    .sort(lexical);
}

function orderedUniqueText(values: unknown, field: string): string[] {
  if (!Array.isArray(values)) invalid(field);
  const normalized = values.map((value, index) => requiredText(value, `${field}.${index}`));
  if (new Set(normalized).size !== normalized.length) invalid(`${field}.duplicate`);
  return normalized;
}

function normalizeLocale(value: unknown): string {
  const raw = requiredText(value, "subject.locale");
  try {
    const locale = new Intl.Locale(raw);
    if (locale.language !== "en") invalid("subject.locale_non_english");
    return locale.toString();
  } catch (error) {
    if (error instanceof TypeError && error.message.startsWith("content_decision_contract_invalid:")) {
      throw error;
    }
    return invalid("subject.locale");
  }
}

function assertEvidenceStatus(
  input: {
    status: ContentDecisionEvidenceStatus;
    value: string | null;
    candidates: string[];
    evidenceRefs: string[];
    method: ContentDecisionMethod;
  },
  field: string,
  conflictRequiresCandidates = true,
): void {
  if (["established", "proposed"].includes(input.status) && input.value === null) {
    invalid(`${field}.value`);
  }
  if (["unknown", "conflicting", "not_applicable"].includes(input.status)
    && input.value !== null) invalid(`${field}.value`);
  if (input.status === "established" && input.evidenceRefs.length === 0) {
    invalid(`${field}.evidence_refs`);
  }
  if (input.status === "conflicting"
    && ((conflictRequiresCandidates && input.candidates.length < 2)
      || input.evidenceRefs.length < 2)) {
    invalid(`${field}.conflict`);
  }
  if (input.method === "model" && input.status === "established") {
    invalid(`${field}.model_authority`);
  }
}

function normalizeClassification(
  value: ContentDecisionClassification,
  index: number,
): ContentDecisionClassification {
  const field = `classifications.${index}`;
  const dimension = member(value.dimension, CONTENT_DECISION_CLASSIFICATION_DIMENSIONS, `${field}.dimension`);
  const status = member(value.status, EVIDENCE_STATUSES, `${field}.status`);
  const label = nullableText(value.label, `${field}.label`);
  const candidateLabels = uniqueSortedText(value.candidate_labels, `${field}.candidate_labels`);
  const evidenceRefs = uniqueSortedText(value.evidence_refs, `${field}.evidence_refs`);
  const method = member(value.method, DECISION_METHODS, `${field}.method`);
  assertEvidenceStatus({
    status,
    value: label,
    candidates: candidateLabels,
    evidenceRefs,
    method,
  }, field);
  return {
    dimension,
    status,
    label,
    candidate_labels: candidateLabels,
    evidence_refs: evidenceRefs,
    rationale: requiredText(value.rationale, `${field}.rationale`),
    method,
    method_ref: requiredText(value.method_ref, `${field}.method_ref`),
  };
}

function normalizeClassifications(values: ContentDecisionClassification[]): ContentDecisionClassification[] {
  if (!Array.isArray(values)) invalid("classifications");
  const normalized = values.map(normalizeClassification);
  const byDimension = new Map(normalized.map((value) => [value.dimension, value]));
  if (byDimension.size !== normalized.length) invalid("classifications.duplicate_dimension");
  if (byDimension.size !== CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.length
    || CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.some((dimension) => !byDimension.has(dimension))) {
    invalid("classifications.incomplete");
  }
  return CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.map((dimension) => byDimension.get(dimension)!);
}

function normalizeNeed(value: ContentDecisionNeed, field: string): ContentDecisionNeed {
  const status = member(value.status, EVIDENCE_STATUSES, `${field}.status`);
  const statement = nullableText(value.statement, `${field}.statement`);
  const evidenceRefs = uniqueSortedText(value.evidence_refs, `${field}.evidence_refs`);
  const method = member(value.method, DECISION_METHODS, `${field}.method`);
  assertEvidenceStatus({
    status,
    value: statement,
    candidates: [],
    evidenceRefs,
    method,
  }, field, false);
  return {
    status,
    statement,
    evidence_refs: evidenceRefs,
    rationale: requiredText(value.rationale, `${field}.rationale`),
    method,
    method_ref: requiredText(value.method_ref, `${field}.method_ref`),
  };
}

function normalizeIntervention(value: ContentInterventionDecision): ContentInterventionDecision {
  const status = member(value.status, ["decided", "proposed", "undecided"] as const, "intervention.status");
  const type = member(value.type, CONTENT_INTERVENTION_TYPES, "intervention.type");
  const method = member(value.method, DECISION_METHODS, "intervention.method");
  if ((status === "undecided") !== (type === "undecided")) invalid("intervention.decision_state");
  if (method === "model" && status === "decided") invalid("intervention.model_authority");
  const evidenceRefs = uniqueSortedText(value.evidence_refs, "intervention.evidence_refs");
  if (status === "decided" && evidenceRefs.length === 0) invalid("intervention.evidence_refs");
  return {
    status,
    type,
    rationale: requiredText(value.rationale, "intervention.rationale"),
    evidence_refs: evidenceRefs,
    method,
    method_ref: requiredText(value.method_ref, "intervention.method_ref"),
  };
}

function normalizeRequiredFact(
  value: ContentDecisionRequiredFact,
  index: number,
): ContentDecisionRequiredFact {
  const field = `semantic_contract.required_facts.${index}`;
  const status = member(value.status, FACT_STATUSES, `${field}.status`);
  const factValue = nullableText(value.value, `${field}.value`);
  const evidenceRefs = uniqueSortedText(value.evidence_refs, `${field}.evidence_refs`);
  if (status === "established" && (factValue === null || evidenceRefs.length === 0)) {
    invalid(`${field}.established`);
  }
  if (status !== "established" && factValue !== null) invalid(`${field}.value`);
  if (status === "conflicting" && evidenceRefs.length < 2) invalid(`${field}.conflicting`);
  return {
    fact_id: requiredText(value.fact_id, `${field}.fact_id`),
    requirement: requiredText(value.requirement, `${field}.requirement`),
    value: factValue,
    status,
    evidence_refs: evidenceRefs,
  };
}

function normalizeById<T>(
  values: T[],
  normalize: (value: T, index: number) => T,
  id: (value: T) => string,
  field: string,
): T[] {
  if (!Array.isArray(values)) invalid(field);
  const normalized = values.map(normalize);
  const ids = normalized.map(id);
  if (new Set(ids).size !== ids.length) invalid(`${field}.duplicate_id`);
  return normalized.sort((left, right) => lexical(id(left), id(right)));
}

function normalizeSemanticContract(
  value: ContentDecisionSemanticContract,
): ContentDecisionSemanticContract {
  const requiredFacts = normalizeById(
    value.required_facts,
    normalizeRequiredFact,
    (fact) => fact.fact_id,
    "semantic_contract.required_facts",
  );
  const semanticInvariants = normalizeById(
    value.semantic_invariants,
    (invariant, index) => ({
      invariant_id: requiredText(invariant.invariant_id, `semantic_contract.semantic_invariants.${index}.invariant_id`),
      statement: requiredText(invariant.statement, `semantic_contract.semantic_invariants.${index}.statement`),
      evidence_refs: uniqueSortedText(
        invariant.evidence_refs,
        `semantic_contract.semantic_invariants.${index}.evidence_refs`,
      ),
    }),
    (invariant) => invariant.invariant_id,
    "semantic_contract.semantic_invariants",
  );
  for (const [index, invariant] of semanticInvariants.entries()) {
    if (invariant.evidence_refs.length === 0) {
      invalid(`semantic_contract.semantic_invariants.${index}.evidence_refs`);
    }
  }
  const actionContracts = normalizeById(
    value.action_contracts,
    (action, index) => ({
      action_id: requiredText(action.action_id, `semantic_contract.action_contracts.${index}.action_id`),
      actor: requiredText(action.actor, `semantic_contract.action_contracts.${index}.actor`),
      object: requiredText(action.object, `semantic_contract.action_contracts.${index}.object`),
      consequence: requiredText(action.consequence, `semantic_contract.action_contracts.${index}.consequence`),
      reversibility: member(
        action.reversibility,
        REVERSIBILITY,
        `semantic_contract.action_contracts.${index}.reversibility`,
      ),
      outcome_evidence: member(
        action.outcome_evidence,
        OUTCOME_EVIDENCE,
        `semantic_contract.action_contracts.${index}.outcome_evidence`,
      ),
      recovery: nullableText(action.recovery, `semantic_contract.action_contracts.${index}.recovery`),
    }),
    (action) => action.action_id,
    "semantic_contract.action_contracts",
  );
  return {
    intended_outcome: requiredText(value.intended_outcome, "semantic_contract.intended_outcome"),
    required_facts: requiredFacts,
    semantic_invariants: semanticInvariants,
    prohibited_claims: uniqueSortedText(value.prohibited_claims, "semantic_contract.prohibited_claims"),
    action_contracts: actionContracts,
    information_requirements: orderedUniqueText(
      value.information_requirements,
      "semantic_contract.information_requirements",
    ),
  };
}

function normalizeExpressionPolicy(
  value: ContentDecisionExpressionPolicy,
): ContentDecisionExpressionPolicy {
  const status = member(value.voice.status, VOICE_STATUSES, "expression_policy.voice.status");
  const profileRef = nullableText(value.voice.profile_ref, "expression_policy.voice.profile_ref");
  if (["approved", "proposed"].includes(status) !== (profileRef !== null)) {
    invalid("expression_policy.voice.profile_ref");
  }
  return {
    voice: { status, profile_ref: profileRef },
    tone_policy_refs: uniqueSortedText(value.tone_policy_refs, "expression_policy.tone_policy_refs"),
    terminology_refs: uniqueSortedText(value.terminology_refs, "expression_policy.terminology_refs"),
    accessibility_requirements: uniqueSortedText(
      value.accessibility_requirements,
      "expression_policy.accessibility_requirements",
    ),
    channel_constraints: uniqueSortedText(
      value.channel_constraints,
      "expression_policy.channel_constraints",
    ),
  };
}

function normalizeAssurancePlan(value: ContentDecisionAssurancePlan): ContentDecisionAssurancePlan {
  const criterionIds = uniqueSortedText(value.core_criterion_ids, "assurance_plan.core_criterion_ids");
  const acceptanceCriteria = uniqueSortedText(
    value.acceptance_criteria,
    "assurance_plan.acceptance_criteria",
  );
  if (criterionIds.length === 0) invalid("assurance_plan.core_criterion_ids");
  if (acceptanceCriteria.length === 0) invalid("assurance_plan.acceptance_criteria");
  return {
    core_criterion_ids: criterionIds,
    overlay_refs: uniqueSortedText(value.overlay_refs, "assurance_plan.overlay_refs"),
    acceptance_criteria: acceptanceCriteria,
    specialist_review_requirements: uniqueSortedText(
      value.specialist_review_requirements,
      "assurance_plan.specialist_review_requirements",
    ),
  };
}

function normalizeInput(input: ContentDecisionContractInput): ContentDecisionContractInput {
  const stage = member(input.stage, CONTENT_DESIGN_STAGES, "stage");
  const supersedes = nullableText(input.supersedes_contract_digest, "supersedes_contract_digest");
  if (supersedes !== null && !/^[a-f0-9]{64}$/u.test(supersedes)) {
    invalid("supersedes_contract_digest");
  }
  const intervention = normalizeIntervention(input.intervention);
  const semanticContract = normalizeSemanticContract(input.semantic_contract);
  if (CONTENT_PRODUCING_STAGES.includes(stage as typeof CONTENT_PRODUCING_STAGES[number])
    && CONTENT_PRODUCING_INTERVENTIONS.includes(
      intervention.type as typeof CONTENT_PRODUCING_INTERVENTIONS[number],
    )
    && (semanticContract.required_facts.length === 0
      || semanticContract.semantic_invariants.length === 0)) {
    invalid("semantic_contract.insufficient_for_content_production");
  }
  return {
    stage,
    subject: {
      product_ref: requiredText(input.subject.product_ref, "subject.product_ref"),
      surface: requiredText(input.subject.surface, "subject.surface"),
      channel: requiredText(input.subject.channel, "subject.channel"),
      locale: normalizeLocale(input.subject.locale),
    },
    classifications: normalizeClassifications(input.classifications),
    needs: {
      user: normalizeNeed(input.needs.user, "needs.user"),
      product: normalizeNeed(input.needs.product, "needs.product"),
      content: normalizeNeed(input.needs.content, "needs.content"),
    },
    intervention,
    semantic_contract: semanticContract,
    expression_policy: normalizeExpressionPolicy(input.expression_policy),
    assurance_plan: normalizeAssurancePlan(input.assurance_plan),
    unresolved_questions: uniqueSortedText(input.unresolved_questions, "unresolved_questions"),
    supersedes_contract_digest: supersedes,
  };
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

export function createUnresolvedContentDecisionClassifications(input: {
  method: ContentDecisionMethod;
  method_ref: string;
  rationale: string;
}): ContentDecisionClassification[] {
  const method = member(input.method, DECISION_METHODS, "classifications.method");
  const methodRef = requiredText(input.method_ref, "classifications.method_ref");
  const rationale = requiredText(input.rationale, "classifications.rationale");
  return CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.map((dimension) => ({
    dimension,
    status: "unknown",
    label: null,
    candidate_labels: [],
    evidence_refs: [],
    rationale,
    method,
    method_ref: methodRef,
  }));
}

export function createContentDecisionContract(
  input: ContentDecisionContractInput,
): ContentDecisionContract {
  const normalized = normalizeInput(input);
  const identityDigest = sha256Canonical({
    contract_version: CONTENT_DECISION_CONTRACT_VERSION,
    ...normalized,
    authority_effect: "none",
  });
  const preimage = {
    contract_version: CONTENT_DECISION_CONTRACT_VERSION,
    contract_id: `content-decision.${identityDigest.slice(0, 32)}`,
    ...normalized,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, contract_digest: sha256Canonical(preimage) });
}

export function verifyContentDecisionContract(contract: ContentDecisionContract): boolean {
  try {
    if (contract.contract_version !== CONTENT_DECISION_CONTRACT_VERSION
      || contract.authority_effect !== "none") return false;
    const {
      contract_version: _version,
      contract_id: _id,
      authority_effect: _authority,
      contract_digest: _digest,
      ...input
    } = contract;
    const replayed = createContentDecisionContract(input);
    return canonicalJson(replayed) === canonicalJson(contract);
  } catch {
    return false;
  }
}
