import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  UX_WRITING_ACTION_FAMILIES,
  UX_WRITING_ATTENTION_MODES,
  UX_WRITING_CHANNELS,
  UX_WRITING_CONTENT_SCOPES,
  UX_WRITING_CONTENT_SLOTS,
  UX_WRITING_CONVERSATION_STATES,
  UX_WRITING_COORDINATE_AXES,
  UX_WRITING_EVENT_STATES,
  UX_WRITING_INTERACTION_PATTERNS,
  UX_WRITING_JOURNEY_FAMILIES,
  UX_WRITING_MESSAGE_PURPOSES,
  UX_WRITING_REVERSIBILITY,
  UX_WRITING_STATE_CAUSES,
  UX_WRITING_STATE_CLASSES,
  UX_WRITING_TASK_STRUCTURES,
  UX_WRITING_WORK_INTENTS,
  type UxWritingAxisStatus,
  type UxWritingCoordinateAxis,
} from "./ux-writing-coordinate.js";

export const AI_ADJUDICATION_CRITERIA = [
  "evidence_relation",
  "requested_axis_coverage",
  "source_label_compatibility",
  "ontology_conformance",
  "internal_consistency",
  "uncertainty_is_honest",
] as const;

export type AiAdjudicationCriterion = typeof AI_ADJUDICATION_CRITERIA[number];
export type AiAdjudicationUncertainty = "none" | "bounded" | "material";

export interface AiAdjudicationSourceLabel {
  label_id: string;
  layer: "source" | "derived";
  dimension: string;
  value: string;
  evidence_refs: string[];
}

export interface AiAdjudicationTaskInput {
  project_id: string;
  task_id: string;
  source: {
    source_ref: string;
    source_digest: string;
    data_class: "public_product_evidence" | "project_evidence" | "user_supplied_evidence";
    content: unknown;
    evidence_refs: string[];
  };
  source_labels: AiAdjudicationSourceLabel[];
  requested_axes: UxWritingCoordinateAxis[];
  locale: string;
  channel: string;
  surface: string;
  risk: string;
  governance: {
    model_processing_eligibility: "classification_and_evaluation_with_explicit_run_authorization";
    processing_authorization_ref: string;
    prompt_reuse_eligibility: "never";
    training_eligibility: "never";
    retention_eligibility: "transient_only";
    authority_effect: "none";
  };
}

export interface AiAdjudicationTask extends AiAdjudicationTaskInput {
  contract_version: "contentmd.ai-adjudication-task/0.1.0";
  task_digest: string;
}

export interface AiUxCoordinateLabel {
  axis: UxWritingCoordinateAxis;
  status: UxWritingAxisStatus;
  values: string[];
  rationale: string;
  evidence_refs: string[];
  uncertainty: AiAdjudicationUncertainty;
}

export interface AiUxCoordinateClassificationOutput {
  authority_effect: "none";
  decision_state: "model_proposed";
  model_processing_purpose: "classification_only";
  labels: AiUxCoordinateLabel[];
  uncertainties: string[];
}

export interface ValidatedAiUxCoordinateClassification extends AiUxCoordinateClassificationOutput {
  classification_digest: string;
}

export interface AiUxCoordinateCriterionResult {
  criterion: AiAdjudicationCriterion;
  status: "pass" | "fail" | "unknown";
  rationale: string;
  evidence_refs: string[];
}

export interface AiUxCoordinateEvaluationOutput {
  authority_effect: "none";
  model_processing_purpose: "evaluation_only";
  verdict: "pass" | "revise" | "abstain" | "escalate";
  criteria: AiUxCoordinateCriterionResult[];
  corrections: AiUxCoordinateLabel[];
  unresolved: string[];
  authority_escalation_reasons: string[];
}

export interface ValidatedAiUxCoordinateEvaluation extends AiUxCoordinateEvaluationOutput {
  evaluation_digest: string;
}

export type AiAdjudicationDecisionStatus =
  | "ai_accepted"
  | "abstained"
  | "authority_escalation"
  | "revision_exhausted"
  | "revision_stalled"
  | "invalid_model_decision";

export interface AiAdjudicationDecision {
  contract_version: "contentmd.ai-adjudication-decision/0.1.0";
  decision_id: string;
  task_id: string;
  task_digest: string;
  status: AiAdjudicationDecisionStatus;
  route: "proceed" | "abstain" | "human_exception";
  accepted_labels: AiUxCoordinateLabel[] | null;
  classification_digest: string | null;
  evaluation_digest: string | null;
  reason_codes: string[];
  human_exception_required: boolean;
  authority_effect: "none";
  decision_digest: string;
}

export class AiAdjudicationContractError extends Error {
  readonly code: "invalid_task" | "invalid_classification" | "invalid_evaluation" | "invalid_decision";
  readonly detail: string;

  constructor(
    code: AiAdjudicationContractError["code"],
    detail: string,
  ) {
    super(`${code}:${detail}`);
    this.name = "AiAdjudicationContractError";
    this.code = code;
    this.detail = detail;
  }
}

const DIGEST = /^[a-f0-9]{64}$/u;
const AXIS_SET = new Set<string>(UX_WRITING_COORDINATE_AXES);
const CRITERION_SET = new Set<string>(AI_ADJUDICATION_CRITERIA);
const RISK_VALUES = ["low", "medium", "high", "critical", "unknown"] as const;
const AXIS_VALUES: Readonly<Record<Exclude<UxWritingCoordinateAxis, "locale">, readonly string[]>> = {
  work_intent: UX_WRITING_WORK_INTENTS,
  journey: UX_WRITING_JOURNEY_FAMILIES,
  state: UX_WRITING_STATE_CLASSES,
  event_state: UX_WRITING_EVENT_STATES,
  message_purposes: UX_WRITING_MESSAGE_PURPOSES,
  content_slot: UX_WRITING_CONTENT_SLOTS,
  interaction_pattern: UX_WRITING_INTERACTION_PATTERNS,
  action_family: UX_WRITING_ACTION_FAMILIES,
  channel: UX_WRITING_CHANNELS,
  attention_mode: UX_WRITING_ATTENTION_MODES,
  task_structure: UX_WRITING_TASK_STRUCTURES,
  state_cause: UX_WRITING_STATE_CAUSES,
  content_scope: UX_WRITING_CONTENT_SCOPES,
  reversibility: UX_WRITING_REVERSIBILITY,
  conversation_state: UX_WRITING_CONVERSATION_STATES,
  risk: RISK_VALUES,
};

export function projectAiUxCoordinateOntology(requestedAxes: readonly UxWritingCoordinateAxis[]) {
  const requested = new Set(requestedAxes);
  if (requested.size !== requestedAxes.length
    || requestedAxes.some((axis) => !AXIS_SET.has(axis))) {
    fail("invalid_task", "requested_axes:ontology_projection");
  }
  const axes = Object.fromEntries(UX_WRITING_COORDINATE_AXES
    .filter((axis) => requested.has(axis))
    .map((axis) => [
      axis,
      axis === "locale"
        ? { kind: "canonical_english_bcp47", values: [] }
        : { kind: "closed_vocabulary", values: [...AXIS_VALUES[axis]] },
    ]));
  const preimage = {
    contract_version: "contentmd.ai-ux-coordinate-ontology-projection/0.1.0" as const,
    language_scope: "english_only" as const,
    axes,
  };
  return deepFreeze({ ...preimage, ontology_digest: sha256Canonical(preimage) });
}

function compareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
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

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
}

function fail(
  code: AiAdjudicationContractError["code"],
  detail: string,
): never {
  throw new AiAdjudicationContractError(code, detail);
}

function nonempty(value: unknown, field: string, code: AiAdjudicationContractError["code"]): asserts value is string {
  if (typeof value !== "string" || value.trim().length === 0) fail(code, field);
}

function sortedUnique(
  values: readonly string[],
  field: string,
  code: AiAdjudicationContractError["code"],
): string[] {
  if (!Array.isArray(values)) fail(code, field);
  for (const value of values) nonempty(value, field, code);
  return [...new Set(values)].sort(compareUtf8);
}

function canonicalEnglishLocale(value: string, field: string, code: AiAdjudicationContractError["code"]): string {
  nonempty(value, field, code);
  let locale: string;
  try {
    locale = Intl.getCanonicalLocales(value.replaceAll("_", "-"))[0] ?? "";
  } catch {
    return fail(code, field);
  }
  if (locale.split("-")[0]?.toLocaleLowerCase("en-US") !== "en") fail(code, `${field}:english_only`);
  return locale;
}

function validAxisValue(axis: UxWritingCoordinateAxis, value: string): boolean {
  if (axis === "locale") {
    try {
      return canonicalEnglishLocale(value, `labels.${axis}.values`, "invalid_classification") === value;
    } catch {
      return false;
    }
  }
  return (AXIS_VALUES[axis] as readonly string[]).includes(value);
}

function normalizeLabel(
  label: AiUxCoordinateLabel,
  task: AiAdjudicationTask,
  code: "invalid_classification" | "invalid_evaluation",
  index: number,
): AiUxCoordinateLabel {
  if (typeof label !== "object" || label === null || Array.isArray(label)) fail(code, `labels[${index}]`);
  if (!AXIS_SET.has(label.axis) || !task.requested_axes.includes(label.axis)) {
    fail(code, `labels[${index}].axis`);
  }
  if (!["exact", "ambiguous", "unclassified"].includes(label.status)) {
    fail(code, `labels[${index}].status`);
  }
  nonempty(label.rationale, `labels[${index}].rationale`, code);
  if (!["none", "bounded", "material"].includes(label.uncertainty)) {
    fail(code, `labels[${index}].uncertainty`);
  }
  const values = sortedUnique(label.values, `labels[${index}].values`, code);
  const evidenceRefs = sortedUnique(label.evidence_refs, `labels[${index}].evidence_refs`, code);
  const allowedEvidence = new Set(task.source.evidence_refs);
  if (evidenceRefs.some((ref) => !allowedEvidence.has(ref))) {
    fail(code, `labels[${index}].evidence_refs:unknown`);
  }
  if (values.some((value) => !validAxisValue(label.axis, value))) {
    fail(code, `labels[${index}].values:ontology`);
  }
  if (label.status === "unclassified") {
    if (values.length !== 0 || label.uncertainty !== "material") {
      fail(code, `labels[${index}]:unclassified_contract`);
    }
  } else if (label.status === "ambiguous") {
    if (values.length < 2 || label.uncertainty === "none" || evidenceRefs.length === 0) {
      fail(code, `labels[${index}]:ambiguous_contract`);
    }
  } else {
    const expectedMinimum = 1;
    const expectedMaximum = label.axis === "message_purposes" ? 32 : 1;
    if (values.length < expectedMinimum || values.length > expectedMaximum
      || label.uncertainty === "material" || evidenceRefs.length === 0) {
      fail(code, `labels[${index}]:exact_contract`);
    }
  }
  return {
    axis: label.axis,
    status: label.status,
    values,
    rationale: label.rationale.trim(),
    evidence_refs: evidenceRefs,
    uncertainty: label.uncertainty,
  };
}

function normalizeLabels(
  labels: AiUxCoordinateLabel[],
  task: AiAdjudicationTask,
  code: "invalid_classification" | "invalid_evaluation",
  requireCoverage: boolean,
): AiUxCoordinateLabel[] {
  if (!Array.isArray(labels)) fail(code, "labels");
  const normalized = labels.map((label, index) => normalizeLabel(label, task, code, index));
  const axes = normalized.map((label) => label.axis);
  if (new Set(axes).size !== axes.length) fail(code, "labels:duplicate_axis");
  if (requireCoverage && (
    axes.length !== task.requested_axes.length
    || task.requested_axes.some((axis) => !axes.includes(axis))
  )) {
    fail(code, "labels:requested_axis_coverage");
  }
  const axisOrder = new Map(UX_WRITING_COORDINATE_AXES.map((axis, index) => [axis, index]));
  return normalized.sort((left, right) =>
    (axisOrder.get(left.axis) ?? Number.MAX_SAFE_INTEGER)
      - (axisOrder.get(right.axis) ?? Number.MAX_SAFE_INTEGER));
}

export function createAiAdjudicationTask(input: AiAdjudicationTaskInput): AiAdjudicationTask {
  for (const [field, value] of [
    ["project_id", input.project_id],
    ["task_id", input.task_id],
    ["source.source_ref", input.source?.source_ref],
    ["channel", input.channel],
    ["surface", input.surface],
    ["risk", input.risk],
    ["governance.processing_authorization_ref", input.governance?.processing_authorization_ref],
  ] as const) nonempty(value, field, "invalid_task");
  if (!DIGEST.test(input.source.source_digest)) fail("invalid_task", "source.source_digest");
  let computedSourceDigest: string;
  try {
    computedSourceDigest = sha256Canonical(input.source.content);
  } catch {
    return fail("invalid_task", "source.content");
  }
  if (computedSourceDigest !== input.source.source_digest) fail("invalid_task", "source.digest_mismatch");
  if (![
    "public_product_evidence", "project_evidence", "user_supplied_evidence",
  ].includes(input.source.data_class)) fail("invalid_task", "source.data_class");
  if (
    input.governance.model_processing_eligibility
      !== "classification_and_evaluation_with_explicit_run_authorization"
    || input.governance.prompt_reuse_eligibility !== "never"
    || input.governance.training_eligibility !== "never"
    || input.governance.retention_eligibility !== "transient_only"
    || input.governance.authority_effect !== "none"
  ) fail("invalid_task", "governance");

  const locale = canonicalEnglishLocale(input.locale, "locale", "invalid_task");
  if (!Array.isArray(input.requested_axes) || input.requested_axes.length === 0) {
    fail("invalid_task", "requested_axes");
  }
  if (input.requested_axes.some((axis) => !AXIS_SET.has(axis))) fail("invalid_task", "requested_axes:unknown");
  const requestedSet = new Set(input.requested_axes);
  if (requestedSet.size !== input.requested_axes.length) fail("invalid_task", "requested_axes:duplicate");
  const requestedAxes = UX_WRITING_COORDINATE_AXES.filter((axis) => requestedSet.has(axis));
  const evidenceRefs = sortedUnique(input.source.evidence_refs, "source.evidence_refs", "invalid_task");
  if (evidenceRefs.length === 0) fail("invalid_task", "source.evidence_refs:empty");
  const allowedEvidence = new Set(evidenceRefs);
  if (!Array.isArray(input.source_labels)) fail("invalid_task", "source_labels");
  const sourceLabels = input.source_labels.map((label, index) => {
    for (const [field, value] of [
      [`source_labels[${index}].label_id`, label.label_id],
      [`source_labels[${index}].dimension`, label.dimension],
      [`source_labels[${index}].value`, label.value],
    ] as const) nonempty(value, field, "invalid_task");
    if (!["source", "derived"].includes(label.layer)) fail("invalid_task", `source_labels[${index}].layer`);
    const refs = sortedUnique(label.evidence_refs, `source_labels[${index}].evidence_refs`, "invalid_task");
    if (refs.some((ref) => !allowedEvidence.has(ref))) {
      fail("invalid_task", `source_labels[${index}].evidence_refs:unknown`);
    }
    return {
      label_id: label.label_id.trim(),
      layer: label.layer,
      dimension: label.dimension.trim(),
      value: label.value.trim(),
      evidence_refs: refs,
    };
  }).sort((left, right) => compareUtf8(left.label_id, right.label_id));
  if (new Set(sourceLabels.map((label) => label.label_id)).size !== sourceLabels.length) {
    fail("invalid_task", "source_labels:duplicate_label_id");
  }

  const preimage: AiAdjudicationTaskInput & {
    contract_version: "contentmd.ai-adjudication-task/0.1.0";
  } = {
    contract_version: "contentmd.ai-adjudication-task/0.1.0",
    project_id: input.project_id.trim(),
    task_id: input.task_id.trim(),
    source: {
      source_ref: input.source.source_ref.trim(),
      source_digest: input.source.source_digest,
      data_class: input.source.data_class,
      content: canonicalClone(input.source.content),
      evidence_refs: evidenceRefs,
    },
    source_labels: sourceLabels,
    requested_axes: requestedAxes,
    locale,
    channel: input.channel.trim(),
    surface: input.surface.trim(),
    risk: input.risk.trim(),
    governance: canonicalClone(input.governance),
  };
  return deepFreeze({ ...preimage, task_digest: sha256Canonical(preimage) });
}

export function verifyAiAdjudicationTask(task: AiAdjudicationTask): void {
  if (task.contract_version !== "contentmd.ai-adjudication-task/0.1.0") {
    fail("invalid_task", "contract_version");
  }
  const { contract_version: _contractVersion, task_digest: claimedDigest, ...input } = task;
  const rebuilt = createAiAdjudicationTask(input);
  if (rebuilt.task_digest !== claimedDigest || canonicalJson(rebuilt) !== canonicalJson(task)) {
    fail("invalid_task", "task_digest_mismatch");
  }
}

export function validateAiUxCoordinateClassification(
  task: AiAdjudicationTask,
  output: AiUxCoordinateClassificationOutput,
): ValidatedAiUxCoordinateClassification {
  if (
    output.authority_effect !== "none"
    || output.decision_state !== "model_proposed"
    || output.model_processing_purpose !== "classification_only"
  ) fail("invalid_classification", "boundary");
  const labels = normalizeLabels(output.labels, task, "invalid_classification", true);
  const uncertainties = sortedUnique(output.uncertainties, "uncertainties", "invalid_classification");
  if (labels.some((label) => label.status === "unclassified") && uncertainties.length === 0) {
    fail("invalid_classification", "uncertainties:required_for_unclassified");
  }
  const preimage: AiUxCoordinateClassificationOutput = {
    authority_effect: "none",
    decision_state: "model_proposed",
    model_processing_purpose: "classification_only",
    labels,
    uncertainties,
  };
  return deepFreeze({ ...preimage, classification_digest: sha256Canonical(preimage) });
}

export function validateAiUxCoordinateEvaluation(
  task: AiAdjudicationTask,
  classification: ValidatedAiUxCoordinateClassification,
  output: AiUxCoordinateEvaluationOutput,
): ValidatedAiUxCoordinateEvaluation {
  if (output.authority_effect !== "none" || output.model_processing_purpose !== "evaluation_only") {
    fail("invalid_evaluation", "boundary");
  }
  if (!["pass", "revise", "abstain", "escalate"].includes(output.verdict)) {
    fail("invalid_evaluation", "verdict");
  }
  if (!Array.isArray(output.criteria)) fail("invalid_evaluation", "criteria");
  const allowedEvidence = new Set(task.source.evidence_refs);
  const criteria = output.criteria.map((criterion, index) => {
    if (!CRITERION_SET.has(criterion.criterion)) fail("invalid_evaluation", `criteria[${index}].criterion`);
    if (!["pass", "fail", "unknown"].includes(criterion.status)) {
      fail("invalid_evaluation", `criteria[${index}].status`);
    }
    nonempty(criterion.rationale, `criteria[${index}].rationale`, "invalid_evaluation");
    const evidenceRefs = sortedUnique(
      criterion.evidence_refs,
      `criteria[${index}].evidence_refs`,
      "invalid_evaluation",
    );
    if (evidenceRefs.some((ref) => !allowedEvidence.has(ref))) {
      fail("invalid_evaluation", `criteria[${index}].evidence_refs:unknown`);
    }
    return {
      criterion: criterion.criterion,
      status: criterion.status,
      rationale: criterion.rationale.trim(),
      evidence_refs: evidenceRefs,
    };
  }).sort((left, right) => compareUtf8(left.criterion, right.criterion));
  const criterionNames = criteria.map((criterion) => criterion.criterion);
  if (
    new Set(criterionNames).size !== criterionNames.length
    || AI_ADJUDICATION_CRITERIA.some((criterion) => !criterionNames.includes(criterion))
  ) fail("invalid_evaluation", "criteria:coverage");

  const corrections = normalizeLabels(output.corrections, task, "invalid_evaluation", false);
  const unresolved = sortedUnique(output.unresolved, "unresolved", "invalid_evaluation");
  const escalationReasons = sortedUnique(
    output.authority_escalation_reasons,
    "authority_escalation_reasons",
    "invalid_evaluation",
  );
  const nonPassCriteria = criteria.filter((criterion) => criterion.status !== "pass");
  if (output.verdict === "pass") {
    if (nonPassCriteria.length > 0 || corrections.length > 0 || unresolved.length > 0
      || escalationReasons.length > 0
      || classification.labels.some((label) => label.status === "unclassified")) {
      fail("invalid_evaluation", "verdict:pass_contract");
    }
  } else if (output.verdict === "revise") {
    if (corrections.length === 0 || nonPassCriteria.length === 0 || unresolved.length > 0
      || escalationReasons.length > 0) {
      fail("invalid_evaluation", "verdict:revise_contract");
    }
  } else if (output.verdict === "abstain") {
    if (unresolved.length === 0 || corrections.length > 0 || escalationReasons.length > 0
      || !criteria.some((criterion) => criterion.status === "unknown")) {
      fail("invalid_evaluation", "verdict:abstain_contract");
    }
  } else if (escalationReasons.length === 0 || corrections.length > 0) {
    fail("invalid_evaluation", "verdict:escalate_contract");
  }

  const preimage: AiUxCoordinateEvaluationOutput = {
    authority_effect: "none",
    model_processing_purpose: "evaluation_only",
    verdict: output.verdict,
    criteria,
    corrections,
    unresolved,
    authority_escalation_reasons: escalationReasons,
  };
  return deepFreeze({ ...preimage, evaluation_digest: sha256Canonical(preimage) });
}

export function createAiAdjudicationDecision(input: {
  task: AiAdjudicationTask;
  status: AiAdjudicationDecisionStatus;
  classification: ValidatedAiUxCoordinateClassification | null;
  evaluation: ValidatedAiUxCoordinateEvaluation | null;
  reason_codes: string[];
}): AiAdjudicationDecision {
  const reasonCodes = sortedUnique(input.reason_codes, "reason_codes", "invalid_decision");
  if (reasonCodes.length === 0) fail("invalid_decision", "reason_codes:empty");
  const accepted = input.status === "ai_accepted";
  const requiredVerdict = input.status === "ai_accepted" ? "pass"
    : input.status === "abstained" ? "abstain"
      : input.status === "authority_escalation" ? "escalate"
        : input.status === "revision_exhausted" || input.status === "revision_stalled"
          ? "revise"
          : null;
  if (requiredVerdict !== null && (
    input.classification === null
    || input.evaluation?.verdict !== requiredVerdict
  )) fail("invalid_decision", `${input.status}:evaluator_binding`);
  const humanException = new Set<AiAdjudicationDecisionStatus>([
    "authority_escalation",
    "revision_exhausted",
    "revision_stalled",
    "invalid_model_decision",
  ]).has(input.status);
  const route = accepted ? "proceed" as const
    : input.status === "abstained" ? "abstain" as const
      : "human_exception" as const;
  const preimage = {
    contract_version: "contentmd.ai-adjudication-decision/0.1.0" as const,
    task_id: input.task.task_id,
    task_digest: input.task.task_digest,
    status: input.status,
    route,
    accepted_labels: accepted ? canonicalClone(input.classification!.labels) : null,
    classification_digest: input.classification?.classification_digest ?? null,
    evaluation_digest: input.evaluation?.evaluation_digest ?? null,
    reason_codes: reasonCodes,
    human_exception_required: humanException,
    authority_effect: "none" as const,
  };
  const decisionDigest = sha256Canonical(preimage);
  return deepFreeze({
    ...preimage,
    decision_id: `ai_adjudication.${decisionDigest.slice(0, 32)}`,
    decision_digest: decisionDigest,
  });
}
