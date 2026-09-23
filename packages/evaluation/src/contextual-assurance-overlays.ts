import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  CONTENT_DECISION_CLASSIFICATION_DIMENSIONS,
  CONTENT_DESIGN_STAGES,
  verifyContentDecisionContract,
  type ContentDecisionContract,
  type ContentDecisionEvidenceStatus,
  type ContentDecisionClassificationDimension,
  type ContentDesignStage,
} from "./content-decision-contract.js";
import {
  UNIVERSAL_ASSURANCE_KERNEL_DIGEST,
  UNIVERSAL_ASSURANCE_KERNEL_VERSION,
  type UniversalAssuranceAssessmentStatus,
  type UniversalAssuranceEvaluation,
  type UniversalAssurancePlane,
  type UniversalAssuranceReviewType,
  type UniversalAssuranceTransition,
} from "./universal-assurance-kernel.js";

export const CONTEXTUAL_ASSURANCE_OVERLAY_VERSION =
  "contentmd.contextual-assurance-overlay/0.1.0" as const;

export const CONTEXTUAL_ASSURANCE_OVERLAY_CATEGORIES = [
  "product",
  "risk",
  "interaction",
  "channel",
  "accessibility",
  "governance",
] as const;
export type ContextualAssuranceOverlayCategory =
  typeof CONTEXTUAL_ASSURANCE_OVERLAY_CATEGORIES[number];

interface ContextualAssuranceTriggerBase {
  clause_id: string;
}

export interface ClassificationLabelTrigger extends ContextualAssuranceTriggerBase {
  kind: "classification_label";
  dimension: ContentDecisionClassificationDimension;
  labels: string[];
}

export interface ClassificationStatusTrigger extends ContextualAssuranceTriggerBase {
  kind: "classification_status";
  dimension: ContentDecisionClassificationDimension;
  statuses: ContentDecisionEvidenceStatus[];
}

export interface SubjectFieldTrigger extends ContextualAssuranceTriggerBase {
  kind: "subject_field";
  field: "product_ref" | "surface" | "channel";
  values: string[];
}

export interface SemanticActionTrigger extends ContextualAssuranceTriggerBase {
  kind: "semantic_action";
  field: "reversibility" | "outcome_evidence";
  values: string[];
}

export interface VoiceStatusTrigger extends ContextualAssuranceTriggerBase {
  kind: "voice_status";
  values: Array<"approved" | "proposed" | "missing" | "not_applicable">;
}

export interface UnresolvedQuestionsTrigger extends ContextualAssuranceTriggerBase {
  kind: "unresolved_questions";
  present: boolean;
}

export type ContextualAssuranceTrigger =
  | ClassificationLabelTrigger
  | ClassificationStatusTrigger
  | SubjectFieldTrigger
  | SemanticActionTrigger
  | VoiceStatusTrigger
  | UnresolvedQuestionsTrigger;

export interface ContextualAssuranceCriterion {
  criterion_id: string;
  criterion_version: "0.1.0";
  title: string;
  construct: string;
  question: string;
  plane: UniversalAssurancePlane;
  review_type: UniversalAssuranceReviewType;
  required_evidence: string[];
  failure_consequence: string;
  repair: string;
  source_refs: string[];
}

export interface ContextualAssuranceOverlayDefinition {
  contract_version: typeof CONTEXTUAL_ASSURANCE_OVERLAY_VERSION;
  overlay_id: string;
  overlay_version: "0.1.0";
  category: ContextualAssuranceOverlayCategory;
  title: string;
  decision_state: "proposed" | "approved" | "retired";
  applicable_stages: ContentDesignStage[];
  selection: {
    all: ContextualAssuranceTrigger[];
  };
  criteria: ContextualAssuranceCriterion[];
  source_refs: string[];
  approval_refs: string[];
  authority_effect: "none";
}

export interface ContextualAssuranceOverlaySelectionResult {
  overlay_ref: string;
  category: ContextualAssuranceOverlayCategory;
  decision_state: ContextualAssuranceOverlayDefinition["decision_state"];
  status: "selected" | "not_selected" | "unresolved";
  binding: "required" | "provisional" | null;
  matched_clause_ids: string[];
  unresolved_clause_ids: string[];
  unresolved_dimensions: ContentDecisionClassificationDimension[];
}

export interface ContextualAssuranceOverlayResolution {
  contract_version: "contentmd.contextual-assurance-overlay-resolution/0.1.0";
  content_decision_contract_id: string;
  content_decision_contract_digest: string;
  registry_digest: string;
  plan_status: "complete" | "incomplete" | "blocked";
  required_overlay_refs: string[];
  provisional_overlay_refs: string[];
  selected_overlay_refs: string[];
  unresolved_overlay_refs: string[];
  missing_overlay_refs: string[];
  unexpected_overlay_refs: string[];
  unresolved_dimensions: ContentDecisionClassificationDimension[];
  overlay_results: ContextualAssuranceOverlaySelectionResult[];
  authority_effect: "none";
  resolution_digest: string;
}

export interface ContextualAssuranceAssessment {
  criterion_id: string;
  status: UniversalAssuranceAssessmentStatus;
  rationale: string;
  evidence_refs: string[];
  failure_disposition: "revise" | "reject" | null;
}

export interface ContextualAssuranceCriterionResult extends ContextualAssuranceAssessment {
  overlay_ref: string;
  overlay_category: ContextualAssuranceOverlayCategory;
  overlay_binding: "required" | "provisional";
  plane: UniversalAssurancePlane;
  review_type: UniversalAssuranceReviewType;
  source: "submitted" | "missing";
}

export interface ContextualAssuranceEvaluation {
  contract_version: "contentmd.contextual-assurance-evaluation/0.1.0";
  content_decision_contract_id: string;
  content_decision_contract_digest: string;
  registry_digest: string;
  resolution_digest: string;
  routing_status: ContextualAssuranceOverlayResolution["plan_status"];
  hard_status: "pass" | "fail" | "unknown";
  advisory_status: "pass" | "findings_present" | "not_evaluated";
  recommended_transition: UniversalAssuranceTransition;
  transition_criterion_ids: string[];
  transition_overlay_refs: string[];
  criterion_results: ContextualAssuranceCriterionResult[];
  authority_effect: "none";
  evaluation_digest: string;
}

export interface CombinedContentAssuranceEvaluation {
  contract_version: "contentmd.combined-content-assurance-evaluation/0.1.0";
  content_decision_contract_id: string;
  content_decision_contract_digest: string;
  universal_evaluation_digest: string;
  contextual_evaluation_digest: string;
  hard_status: "pass" | "fail" | "unknown";
  advisory_status: "pass" | "findings_present" | "not_evaluated";
  recommended_transition: UniversalAssuranceTransition;
  transition_sources: Array<"universal" | "contextual">;
  authority_effect: "none";
  evaluation_digest: string;
}

const PRODUCTION_STAGES: ContentDesignStage[] = [
  "decide", "specify", "design", "write", "review", "implement", "verify",
];
const DELIVERY_STAGES: ContentDesignStage[] = [
  "design", "write", "review", "implement", "verify", "measure", "maintain",
];
const SYNTHESIS_REF = "research/08-synthesis/deterministic-ux-writing-usecase-research-2026-09-19.md";
const CONTENT_CONTRACT_REF = "research/10-cognitive-ergonomics/content-contract-and-lint-candidates.md";
const INTERACTION_REF = "research/04-surfaces/interaction-pattern-content-practice.md";
const CHANNEL_REF = "research/04-surfaces/channel-and-modality-content-practice.md";
const VOICE_DOMAIN_REF = "research/03-domain-matrix/voice-tone-terminology.md";
const FOUNDATIONAL_REF = "research/08-synthesis/foundational-findings.md";

function criterion(input: Omit<ContextualAssuranceCriterion, "criterion_version">): ContextualAssuranceCriterion {
  return { ...input, criterion_version: "0.1.0" };
}

function proposedOverlay(
  input: Omit<ContextualAssuranceOverlayDefinition,
    "contract_version" | "overlay_version" | "decision_state" | "approval_refs" | "authority_effect">,
): ContextualAssuranceOverlayDefinition {
  return {
    ...input,
    contract_version: CONTEXTUAL_ASSURANCE_OVERLAY_VERSION,
    overlay_version: "0.1.0",
    decision_state: "proposed",
    approval_refs: [],
    authority_effect: "none",
  };
}

export const CORE_CONTEXTUAL_ASSURANCE_OVERLAYS: readonly ContextualAssuranceOverlayDefinition[] = deepFreeze([
  proposedOverlay({
    overlay_id: "contentmd.overlay.product.unconfirmed-outcome",
    category: "product",
    title: "Unconfirmed product outcome",
    applicable_stages: PRODUCTION_STAGES,
    selection: {
      all: [{
        clause_id: "outcome-is-unconfirmed",
        kind: "semantic_action",
        field: "outcome_evidence",
        values: ["unknown", "partial"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.product.unconfirmed-outcome.verification-before-retry",
        title: "Verification before consequential retry",
        construct: "An unresolved outcome is not converted into a fresh consequential action.",
        question: "Does the experience provide a status-verification path before any retry that could duplicate the action?",
        plane: "hard",
        review_type: "deterministic",
        required_evidence: ["Rendered recovery path", "Product retry behavior"],
        failure_consequence: "A user may duplicate a payment, submission, booking, or another consequential action.",
        repair: "Expose the unknown state and a verification path before offering or implying retry.",
        source_refs: [CONTENT_CONTRACT_REF, INTERACTION_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.product.unconfirmed-outcome.update-expectation",
        title: "Outcome update expectation",
        construct: "The user can tell how and when the unresolved outcome may become knowable.",
        question: "Is the next status source, update mechanism, or bounded uncertainty communicated without inventing timing?",
        plane: "hard",
        review_type: "human_judgment",
        required_evidence: ["Product status model", "Update or polling behavior"],
        failure_consequence: "The user may be stranded or infer certainty that the product cannot support.",
        repair: "Add the supported status source or preserve the timing question as unresolved.",
        source_refs: [SYNTHESIS_REF, CONTENT_CONTRACT_REF],
      }),
    ],
    source_refs: [SYNTHESIS_REF, CONTENT_CONTRACT_REF, INTERACTION_REF],
  }),
  proposedOverlay({
    overlay_id: "contentmd.overlay.risk.irreversible-action",
    category: "risk",
    title: "Irreversible or conditionally reversible action",
    applicable_stages: PRODUCTION_STAGES,
    selection: {
      all: [{
        clause_id: "action-is-not-freely-reversible",
        kind: "semantic_action",
        field: "reversibility",
        values: ["irreversible", "conditionally_reversible"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.risk.irreversible-action.consequence-before-commit",
        title: "Material consequence before commitment",
        construct: "The person understands the affected object and material consequence before acting.",
        question: "Is the irreversible or conditionally reversible consequence explicit before commitment?",
        plane: "hard",
        review_type: "human_judgment",
        required_evidence: ["Rendered pre-commit state", "Action consequence specification"],
        failure_consequence: "The person may commit without understanding a loss, obligation, or limited remedy.",
        repair: "Move the material consequence before the action and name the affected object directly.",
        source_refs: [CONTENT_CONTRACT_REF, INTERACTION_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.risk.irreversible-action.confirmation-or-undo",
        title: "Confirmation, review, or undo mechanism",
        construct: "The interaction supplies the applicable prevention or recovery mechanism.",
        question: "Does the product provide the required review, confirmation, reversibility, or recovery behavior?",
        plane: "hard",
        review_type: "deterministic",
        required_evidence: ["Interaction behavior", "Recovery specification"],
        failure_consequence: "Content alone may appear to protect a user when the interaction supplies no effective safeguard.",
        repair: "Add the applicable interaction safeguard or route the gap to product design.",
        source_refs: [INTERACTION_REF, FOUNDATIONAL_REF],
      }),
    ],
    source_refs: [CONTENT_CONTRACT_REF, INTERACTION_REF, FOUNDATIONAL_REF],
  }),
  proposedOverlay({
    overlay_id: "contentmd.overlay.interaction.commitment",
    category: "interaction",
    title: "Commitment, consent, or destructive interaction",
    applicable_stages: PRODUCTION_STAGES,
    selection: {
      all: [{
        clause_id: "experience-is-consequential-interaction",
        kind: "classification_label",
        dimension: "experience",
        labels: ["commitment", "consent", "destructive_confirmation", "review_before_submit"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.interaction.commitment.action-label-contract",
        title: "Action label matches the committed behavior",
        construct: "The primary action names the actual operation rather than a vague continuation.",
        question: "Does the action label preserve the action, object, and commitment boundary?",
        plane: "hard",
        review_type: "deterministic",
        required_evidence: ["Action contract", "Rendered control label"],
        failure_consequence: "A person may commit, consent, submit, or delete under a misleading label.",
        repair: "Use a label that names the actual operation and preserves the semantic action contract.",
        source_refs: [INTERACTION_REF, CONTENT_CONTRACT_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.interaction.commitment.choice-hierarchy",
        title: "Material alternatives remain understandable",
        construct: "The interaction represents acceptance, refusal, correction, and exit without coercive hierarchy.",
        question: "Are the material choices and their consequences understandable in the complete interaction?",
        plane: "hard",
        review_type: "human_judgment",
        required_evidence: ["Rendered choice hierarchy", "Interaction alternatives"],
        failure_consequence: "The person may be pushed toward a commitment or lose a meaningful alternative.",
        repair: "Expose the alternatives and revise hierarchy or wording that obscures a valid choice.",
        source_refs: [INTERACTION_REF, FOUNDATIONAL_REF],
      }),
    ],
    source_refs: [INTERACTION_REF, CONTENT_CONTRACT_REF, FOUNDATIONAL_REF],
  }),
  proposedOverlay({
    overlay_id: "contentmd.overlay.channel.out-of-app",
    category: "channel",
    title: "Out-of-app communication",
    applicable_stages: DELIVERY_STAGES,
    selection: {
      all: [{
        clause_id: "channel-can-arrive-outside-product",
        kind: "subject_field",
        field: "channel",
        values: ["email", "sms", "push_notification", "voice"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.channel.out-of-app.privacy-safe-preview",
        title: "Privacy-safe preview",
        construct: "The channel reveals only information safe for its authentication and visibility context.",
        question: "Could a lock screen, inbox preview, shared device, or spoken channel expose sensitive information?",
        plane: "hard",
        review_type: "specialist",
        required_evidence: ["Channel preview", "Privacy classification"],
        failure_consequence: "Sensitive product, identity, financial, health, or safety information may be exposed.",
        repair: "Reduce preview detail and move sensitive content behind the appropriate authenticated context.",
        source_refs: [CHANNEL_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.channel.out-of-app.cross-channel-continuity",
        title: "Cross-channel continuity",
        construct: "The notification leads to a current, consistent, and operable destination.",
        question: "Do message state, action, expiry, and destination remain consistent when the user returns to the product?",
        plane: "hard",
        review_type: "deterministic",
        required_evidence: ["Deep-link behavior", "Expiry and deduplication behavior"],
        failure_consequence: "The user may act on a stale, duplicated, or contradictory message.",
        repair: "Bind the expression to current state, expiry, deduplication, and a verified destination.",
        source_refs: [CHANNEL_REF, INTERACTION_REF],
      }),
    ],
    source_refs: [CHANNEL_REF, INTERACTION_REF],
  }),
  proposedOverlay({
    overlay_id: "contentmd.overlay.accessibility.dynamic-status",
    category: "accessibility",
    title: "Dynamic status or feedback",
    applicable_stages: DELIVERY_STAGES,
    selection: {
      all: [{
        clause_id: "content-object-is-dynamic-status",
        kind: "classification_label",
        dimension: "content_object",
        labels: ["dynamic_status", "error_message", "progress_indicator", "status_message"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.accessibility.dynamic-status.status-announcement",
        title: "Programmatic status announcement",
        construct: "The status is available without requiring visual focus movement or color perception.",
        question: "Is the status exposed with the correct semantics, timing, and interruption behavior?",
        plane: "hard",
        review_type: "specialist",
        required_evidence: ["Accessibility tree", "Assistive-technology behavior"],
        failure_consequence: "A user may not perceive a failure, progress update, completion, or required correction.",
        repair: "Implement and verify the appropriate status semantics and announcement behavior.",
        source_refs: [CHANNEL_REF, INTERACTION_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.accessibility.dynamic-status.nonvisual-recovery",
        title: "Nonvisual recovery path",
        construct: "Recovery instructions and affected controls remain locatable and operable nonvisually.",
        question: "Can a user identify the affected object and complete recovery without relying on position or color alone?",
        plane: "hard",
        review_type: "specialist",
        required_evidence: ["Keyboard flow", "Screen-reader recovery flow"],
        failure_consequence: "The content may describe recovery that some users cannot locate or operate.",
        repair: "Bind the message to the affected control and verify focus, naming, association, and recovery order.",
        source_refs: [INTERACTION_REF, FOUNDATIONAL_REF],
      }),
    ],
    source_refs: [CHANNEL_REF, INTERACTION_REF, FOUNDATIONAL_REF],
  }),
  proposedOverlay({
    overlay_id: "contentmd.overlay.governance.approval-required",
    category: "governance",
    title: "Explicit approval or specialist authority required",
    applicable_stages: ["decide", ...DELIVERY_STAGES, "retire"],
    selection: {
      all: [{
        clause_id: "governance-requires-explicit-approval",
        kind: "classification_label",
        dimension: "governance",
        labels: ["approval_required", "regulated", "specialist_review"],
      }],
    },
    criteria: [
      criterion({
        criterion_id: "contentmd.overlay.governance.approval-required.current-approval",
        title: "Current scoped approval",
        construct: "The material decision has a current approval for its exact scope and version.",
        question: "Is the accountable approval current, unrevoked, version-bound, and applicable to this product context?",
        plane: "hard",
        review_type: "specialist",
        required_evidence: ["Approval record", "Decision and scope binding"],
        failure_consequence: "A proposal may be mistaken for an approved claim, policy, or release decision.",
        repair: "Obtain or refresh the exact scoped approval without inferring it from evidence or implementation.",
        source_refs: [VOICE_DOMAIN_REF, FOUNDATIONAL_REF],
      }),
      criterion({
        criterion_id: "contentmd.overlay.governance.approval-required.delivery-state",
        title: "Approval and delivery states remain separate",
        construct: "Approval, implementation, verification, and live observation are independently represented.",
        question: "Does the record avoid treating approval as implementation or live presence as approval?",
        plane: "hard",
        review_type: "deterministic",
        required_evidence: ["Decision record", "Delivery-state evidence"],
        failure_consequence: "Teams may publish unapproved content or assume approved content is already live.",
        repair: "Record the decision and delivery states independently and reconcile any divergence.",
        source_refs: [VOICE_DOMAIN_REF, FOUNDATIONAL_REF],
      }),
    ],
    source_refs: [VOICE_DOMAIN_REF, FOUNDATIONAL_REF],
  }),
]);

const EVIDENCE_STATUSES = [
  "established", "proposed", "unknown", "conflicting", "not_applicable",
] as const;
const ASSESSMENT_STATUSES = [
  "pass", "fail", "unknown", "not_observed", "conflicting_evidence", "unable_to_evaluate",
] as const;
const UNRESOLVED_ASSESSMENTS: readonly UniversalAssuranceAssessmentStatus[] = [
  "unknown", "not_observed", "conflicting_evidence", "unable_to_evaluate",
];
const OVERLAY_ID = /^contentmd\.overlay\.[a-z0-9_.-]+$/u;
const CRITERION_ID = /^contentmd\.overlay\.[a-z0-9_.-]+$/u;
const CLAUSE_ID = /^[a-z][a-z0-9-]*$/u;

function invalid(reason: string): never {
  throw new TypeError(`contextual_assurance_invalid:${reason}`);
}

function lexical(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
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

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
  return value.trim();
}

function uniqueSorted(values: unknown, field: string): string[] {
  if (!Array.isArray(values)) invalid(field);
  return [...new Set(values.map((value, index) => requiredText(value, `${field}.${index}`)))]
    .sort(lexical);
}

function orderedStages(values: ContentDesignStage[], field: string): ContentDesignStage[] {
  if (!Array.isArray(values) || values.some((value) => !CONTENT_DESIGN_STAGES.includes(value))) {
    invalid(field);
  }
  const set = new Set(values);
  return CONTENT_DESIGN_STAGES.filter((stage) => set.has(stage));
}

export function contextualAssuranceOverlayRef(
  overlay: Pick<ContextualAssuranceOverlayDefinition, "overlay_id" | "overlay_version">,
): string {
  return `${overlay.overlay_id}@${overlay.overlay_version}`;
}

function normalizeTrigger(
  trigger: ContextualAssuranceTrigger,
  field: string,
): ContextualAssuranceTrigger {
  const clauseId = requiredText(trigger.clause_id, `${field}.clause_id`);
  if (!CLAUSE_ID.test(clauseId)) invalid(`${field}.clause_id`);
  if (trigger.kind === "classification_label") {
    if (!CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.includes(trigger.dimension)) {
      invalid(`${field}.dimension`);
    }
    const labels = uniqueSorted(trigger.labels, `${field}.labels`);
    if (labels.length === 0) invalid(`${field}.labels`);
    return { clause_id: clauseId, kind: trigger.kind, dimension: trigger.dimension, labels };
  }
  if (trigger.kind === "classification_status") {
    if (!CONTENT_DECISION_CLASSIFICATION_DIMENSIONS.includes(trigger.dimension)
      || !Array.isArray(trigger.statuses)
      || trigger.statuses.some((status) => !EVIDENCE_STATUSES.includes(status))) {
      invalid(field);
    }
    const statuses = EVIDENCE_STATUSES.filter((status) => trigger.statuses.includes(status));
    if (statuses.length === 0) invalid(`${field}.statuses`);
    return { clause_id: clauseId, kind: trigger.kind, dimension: trigger.dimension, statuses };
  }
  if (trigger.kind === "subject_field") {
    if (!["product_ref", "surface", "channel"].includes(trigger.field)) invalid(`${field}.field`);
    const values = uniqueSorted(trigger.values, `${field}.values`);
    if (values.length === 0) invalid(`${field}.values`);
    return { clause_id: clauseId, kind: trigger.kind, field: trigger.field, values };
  }
  if (trigger.kind === "semantic_action") {
    if (!["reversibility", "outcome_evidence"].includes(trigger.field)) invalid(`${field}.field`);
    const values = uniqueSorted(trigger.values, `${field}.values`);
    if (values.length === 0) invalid(`${field}.values`);
    return { clause_id: clauseId, kind: trigger.kind, field: trigger.field, values };
  }
  if (trigger.kind === "voice_status") {
    const ordered = ["approved", "proposed", "missing", "not_applicable"] as const;
    if (!Array.isArray(trigger.values)
      || trigger.values.some((value) => !ordered.includes(value))) invalid(`${field}.values`);
    const values = ordered.filter((value) => trigger.values.includes(value));
    if (values.length === 0) invalid(`${field}.values`);
    return { clause_id: clauseId, kind: trigger.kind, values };
  }
  if (trigger.kind === "unresolved_questions") {
    if (typeof trigger.present !== "boolean") invalid(`${field}.present`);
    return { clause_id: clauseId, kind: trigger.kind, present: trigger.present };
  }
  return invalid(`${field}.kind`);
}

function normalizeCriterion(
  value: ContextualAssuranceCriterion,
  overlayId: string,
  index: number,
): ContextualAssuranceCriterion {
  const field = `${overlayId}.criteria.${index}`;
  const criterionId = requiredText(value.criterion_id, `${field}.criterion_id`);
  if (!CRITERION_ID.test(criterionId) || !criterionId.startsWith(`${overlayId}.`)) {
    invalid(`${field}.criterion_id`);
  }
  if (value.criterion_version !== "0.1.0"
    || !["hard", "advisory"].includes(value.plane)
    || !["deterministic", "specialist", "research", "human_judgment", "preference"]
      .includes(value.review_type)) invalid(field);
  const requiredEvidence = uniqueSorted(value.required_evidence, `${field}.required_evidence`);
  const sourceRefs = uniqueSorted(value.source_refs, `${field}.source_refs`);
  if (requiredEvidence.length === 0 || sourceRefs.length === 0) invalid(field);
  return {
    criterion_id: criterionId,
    criterion_version: "0.1.0",
    title: requiredText(value.title, `${field}.title`),
    construct: requiredText(value.construct, `${field}.construct`),
    question: requiredText(value.question, `${field}.question`),
    plane: value.plane,
    review_type: value.review_type,
    required_evidence: requiredEvidence,
    failure_consequence: requiredText(value.failure_consequence, `${field}.failure_consequence`),
    repair: requiredText(value.repair, `${field}.repair`),
    source_refs: sourceRefs,
  };
}

function normalizeOverlay(
  value: ContextualAssuranceOverlayDefinition,
): ContextualAssuranceOverlayDefinition {
  if (value.contract_version !== CONTEXTUAL_ASSURANCE_OVERLAY_VERSION
    || value.overlay_version !== "0.1.0"
    || !OVERLAY_ID.test(value.overlay_id)
    || !CONTEXTUAL_ASSURANCE_OVERLAY_CATEGORIES.includes(value.category)
    || !["proposed", "approved", "retired"].includes(value.decision_state)
    || value.authority_effect !== "none") invalid("overlay");
  const approvalRefs = uniqueSorted(value.approval_refs, `${value.overlay_id}.approval_refs`);
  if (value.decision_state === "approved" && approvalRefs.length === 0) {
    invalid(`${value.overlay_id}.approval_refs`);
  }
  if (!Array.isArray(value.selection.all) || value.selection.all.length === 0) {
    invalid(`${value.overlay_id}.selection`);
  }
  const triggers = value.selection.all
    .map((trigger, index) => normalizeTrigger(trigger, `${value.overlay_id}.selection.${index}`))
    .sort((left, right) => lexical(left.clause_id, right.clause_id));
  if (new Set(triggers.map((trigger) => trigger.clause_id)).size !== triggers.length) {
    invalid(`${value.overlay_id}.selection.duplicate_clause`);
  }
  if (!Array.isArray(value.criteria) || value.criteria.length === 0) {
    invalid(`${value.overlay_id}.criteria`);
  }
  const criteria = value.criteria.map((item, index) => normalizeCriterion(item, value.overlay_id, index))
    .sort((left, right) => lexical(left.criterion_id, right.criterion_id));
  if (new Set(criteria.map((item) => item.criterion_id)).size !== criteria.length) {
    invalid(`${value.overlay_id}.criteria.duplicate_id`);
  }
  const sourceRefs = uniqueSorted(value.source_refs, `${value.overlay_id}.source_refs`);
  if (sourceRefs.length === 0) invalid(`${value.overlay_id}.source_refs`);
  return {
    contract_version: CONTEXTUAL_ASSURANCE_OVERLAY_VERSION,
    overlay_id: value.overlay_id,
    overlay_version: "0.1.0",
    category: value.category,
    title: requiredText(value.title, `${value.overlay_id}.title`),
    decision_state: value.decision_state,
    applicable_stages: orderedStages(value.applicable_stages, `${value.overlay_id}.applicable_stages`),
    selection: { all: triggers },
    criteria,
    source_refs: sourceRefs,
    approval_refs: approvalRefs,
    authority_effect: "none",
  };
}

function normalizeRegistry(
  values: readonly ContextualAssuranceOverlayDefinition[],
): ContextualAssuranceOverlayDefinition[] {
  if (!Array.isArray(values)) invalid("registry");
  const normalized = values.map(normalizeOverlay)
    .sort((left, right) => lexical(contextualAssuranceOverlayRef(left), contextualAssuranceOverlayRef(right)));
  const refs = normalized.map(contextualAssuranceOverlayRef);
  if (new Set(refs).size !== refs.length) invalid("registry.duplicate_overlay");
  const criterionIds = normalized.flatMap((overlay) => overlay.criteria.map((item) => item.criterion_id));
  if (new Set(criterionIds).size !== criterionIds.length) invalid("registry.duplicate_criterion");
  return normalized;
}

type TriggerStatus = "match" | "no_match" | "unresolved";

function evaluateTrigger(
  trigger: ContextualAssuranceTrigger,
  contract: ContentDecisionContract,
): { status: TriggerStatus; provisional: boolean; dimension: ContentDecisionClassificationDimension | null } {
  if (trigger.kind === "classification_label") {
    const classification = contract.classifications.find((item) => item.dimension === trigger.dimension)!;
    if (classification.status === "unknown" || classification.status === "conflicting") {
      return { status: "unresolved", provisional: true, dimension: trigger.dimension };
    }
    if (classification.status === "not_applicable" || classification.label === null) {
      return { status: "no_match", provisional: false, dimension: null };
    }
    return {
      status: trigger.labels.includes(classification.label) ? "match" : "no_match",
      provisional: classification.status === "proposed",
      dimension: null,
    };
  }
  if (trigger.kind === "classification_status") {
    const classification = contract.classifications.find((item) => item.dimension === trigger.dimension)!;
    return {
      status: trigger.statuses.includes(classification.status) ? "match" : "no_match",
      provisional: classification.status === "proposed" || classification.status === "unknown"
        || classification.status === "conflicting",
      dimension: null,
    };
  }
  if (trigger.kind === "subject_field") {
    return {
      status: trigger.values.includes(contract.subject[trigger.field]) ? "match" : "no_match",
      provisional: false,
      dimension: null,
    };
  }
  if (trigger.kind === "semantic_action") {
    const values = contract.semantic_contract.action_contracts.map((action) => action[trigger.field]);
    if (values.some((value) => trigger.values.includes(value))) {
      return { status: "match", provisional: false, dimension: null };
    }
    if (values.includes("unknown")) {
      return { status: "unresolved", provisional: true, dimension: null };
    }
    return { status: "no_match", provisional: false, dimension: null };
  }
  if (trigger.kind === "voice_status") {
    return {
      status: trigger.values.includes(contract.expression_policy.voice.status) ? "match" : "no_match",
      provisional: contract.expression_policy.voice.status === "proposed",
      dimension: null,
    };
  }
  return {
    status: (contract.unresolved_questions.length > 0) === trigger.present ? "match" : "no_match",
    provisional: false,
    dimension: null,
  };
}

export function resolveContextualAssuranceOverlays(input: {
  contract: ContentDecisionContract;
  registry: readonly ContextualAssuranceOverlayDefinition[];
}): ContextualAssuranceOverlayResolution {
  if (!verifyContentDecisionContract(input.contract)) invalid("contract");
  const registry = normalizeRegistry(input.registry);
  const registryDigest = sha256Canonical(registry);
  const active = registry.filter((overlay) => overlay.decision_state !== "retired");
  const overlayResults: ContextualAssuranceOverlaySelectionResult[] = active.map((overlay) => {
    const overlayRef = contextualAssuranceOverlayRef(overlay);
    if (!overlay.applicable_stages.includes(input.contract.stage)) {
      return {
        overlay_ref: overlayRef,
        category: overlay.category,
        decision_state: overlay.decision_state,
        status: "not_selected",
        binding: null,
        matched_clause_ids: [],
        unresolved_clause_ids: [],
        unresolved_dimensions: [],
      };
    }
    const triggerResults = overlay.selection.all.map((trigger) => ({
      trigger,
      ...evaluateTrigger(trigger, input.contract),
    }));
    if (triggerResults.some((result) => result.status === "no_match")) {
      return {
        overlay_ref: overlayRef,
        category: overlay.category,
        decision_state: overlay.decision_state,
        status: "not_selected",
        binding: null,
        matched_clause_ids: triggerResults
          .filter((result) => result.status === "match")
          .map((result) => result.trigger.clause_id)
          .sort(lexical),
        unresolved_clause_ids: [],
        unresolved_dimensions: [],
      };
    }
    const unresolved = triggerResults.filter((result) => result.status === "unresolved");
    if (unresolved.length > 0) {
      return {
        overlay_ref: overlayRef,
        category: overlay.category,
        decision_state: overlay.decision_state,
        status: "unresolved",
        binding: null,
        matched_clause_ids: triggerResults
          .filter((result) => result.status === "match")
          .map((result) => result.trigger.clause_id)
          .sort(lexical),
        unresolved_clause_ids: unresolved.map((result) => result.trigger.clause_id).sort(lexical),
        unresolved_dimensions: [...new Set(unresolved.flatMap((result) =>
          result.dimension === null ? [] : [result.dimension]))]
          .sort(lexical),
      };
    }
    const provisional = overlay.decision_state !== "approved"
      || triggerResults.some((result) => result.provisional);
    return {
      overlay_ref: overlayRef,
      category: overlay.category,
      decision_state: overlay.decision_state,
      status: "selected",
      binding: provisional ? "provisional" : "required",
      matched_clause_ids: triggerResults.map((result) => result.trigger.clause_id).sort(lexical),
      unresolved_clause_ids: [],
      unresolved_dimensions: [],
    };
  });
  const selected = overlayResults.filter((result) => result.status === "selected");
  const unresolved = overlayResults.filter((result) => result.status === "unresolved");
  const selectedRefs = selected.map((result) => result.overlay_ref).sort(lexical);
  const activeRefs = new Set(active.map(contextualAssuranceOverlayRef));
  const plannedRefs = input.contract.assurance_plan.overlay_refs;
  const missingRefs = selectedRefs.filter((ref) => !plannedRefs.includes(ref));
  const unexpectedRefs = plannedRefs.filter((ref) => !selectedRefs.includes(ref) || !activeRefs.has(ref));
  const planStatus: ContextualAssuranceOverlayResolution["plan_status"] = unresolved.length > 0
    ? "blocked"
    : missingRefs.length > 0 || unexpectedRefs.length > 0 ? "incomplete" : "complete";
  const preimage = {
    contract_version: "contentmd.contextual-assurance-overlay-resolution/0.1.0" as const,
    content_decision_contract_id: input.contract.contract_id,
    content_decision_contract_digest: input.contract.contract_digest,
    registry_digest: registryDigest,
    plan_status: planStatus,
    required_overlay_refs: selected
      .filter((result) => result.binding === "required")
      .map((result) => result.overlay_ref)
      .sort(lexical),
    provisional_overlay_refs: selected
      .filter((result) => result.binding === "provisional")
      .map((result) => result.overlay_ref)
      .sort(lexical),
    selected_overlay_refs: selectedRefs,
    unresolved_overlay_refs: unresolved.map((result) => result.overlay_ref).sort(lexical),
    missing_overlay_refs: missingRefs,
    unexpected_overlay_refs: unexpectedRefs,
    unresolved_dimensions: [...new Set(unresolved.flatMap((result) => result.unresolved_dimensions))]
      .sort(lexical),
    overlay_results: overlayResults,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, resolution_digest: sha256Canonical(preimage) });
}

export function verifyContextualAssuranceOverlayResolution(input: {
  resolution: ContextualAssuranceOverlayResolution;
  contract: ContentDecisionContract;
  registry: readonly ContextualAssuranceOverlayDefinition[];
}): boolean {
  try {
    const replayed = resolveContextualAssuranceOverlays({
      contract: input.contract,
      registry: input.registry,
    });
    return canonicalJson(replayed) === canonicalJson(input.resolution);
  } catch {
    return false;
  }
}

function normalizeAssessment(
  value: ContextualAssuranceAssessment,
  index: number,
): ContextualAssuranceAssessment {
  const field = `assessments.${index}`;
  const criterionId = requiredText(value.criterion_id, `${field}.criterion_id`);
  if (!ASSESSMENT_STATUSES.includes(value.status)) invalid(`${field}.status`);
  const evidenceRefs = uniqueSorted(value.evidence_refs, `${field}.evidence_refs`);
  if (["pass", "fail", "conflicting_evidence"].includes(value.status)
    && evidenceRefs.length === 0) invalid(`${field}.evidence_refs`);
  if (value.status === "fail") {
    if (value.failure_disposition !== "revise" && value.failure_disposition !== "reject") {
      invalid(`${field}.failure_disposition`);
    }
  } else if (value.failure_disposition !== null) invalid(`${field}.failure_disposition`);
  return {
    criterion_id: criterionId,
    status: value.status,
    rationale: requiredText(value.rationale, `${field}.rationale`),
    evidence_refs: evidenceRefs,
    failure_disposition: value.failure_disposition,
  };
}

export function evaluateContextualAssurance(input: {
  contract: ContentDecisionContract;
  registry: readonly ContextualAssuranceOverlayDefinition[];
  resolution: ContextualAssuranceOverlayResolution;
  assessments: ContextualAssuranceAssessment[];
}): ContextualAssuranceEvaluation {
  if (!verifyContextualAssuranceOverlayResolution({
    resolution: input.resolution,
    contract: input.contract,
    registry: input.registry,
  })) invalid("resolution");
  const registry = normalizeRegistry(input.registry);
  const selectedResults = new Map(input.resolution.overlay_results
    .filter((result) => result.status === "selected")
    .map((result) => [result.overlay_ref, result]));
  const selectedOverlays = registry.filter((overlay) => selectedResults.has(
    contextualAssuranceOverlayRef(overlay),
  ));
  const criteria = selectedOverlays.flatMap((overlay) => {
    const overlayRef = contextualAssuranceOverlayRef(overlay);
    const selection = selectedResults.get(overlayRef)!;
    return overlay.criteria.map((item) => ({
      ...item,
      overlay_ref: overlayRef,
      overlay_category: overlay.category,
      overlay_binding: selection.binding!,
    }));
  }).sort((left, right) => lexical(left.criterion_id, right.criterion_id));
  if (!Array.isArray(input.assessments)) invalid("assessments");
  const assessments = input.assessments.map(normalizeAssessment);
  if (new Set(assessments.map((item) => item.criterion_id)).size !== assessments.length) {
    invalid("assessments.duplicate_criterion");
  }
  const criterionIds = new Set(criteria.map((item) => item.criterion_id));
  if (assessments.some((item) => !criterionIds.has(item.criterion_id))) {
    invalid("assessments.not_applicable");
  }
  const byId = new Map(assessments.map((item) => [item.criterion_id, item]));
  const results: ContextualAssuranceCriterionResult[] = criteria.map((item) => {
    const submitted = byId.get(item.criterion_id);
    if (submitted !== undefined) {
      return {
        ...submitted,
        overlay_ref: item.overlay_ref,
        overlay_category: item.overlay_category,
        overlay_binding: item.overlay_binding,
        plane: item.plane,
        review_type: item.review_type,
        source: "submitted",
      };
    }
    return {
      criterion_id: item.criterion_id,
      status: "not_observed",
      rationale: "No criterion assessment was supplied.",
      evidence_refs: [],
      failure_disposition: null,
      overlay_ref: item.overlay_ref,
      overlay_category: item.overlay_category,
      overlay_binding: item.overlay_binding,
      plane: item.plane,
      review_type: item.review_type,
      source: "missing",
    };
  });
  const hard = results.filter((result) => result.plane === "hard");
  const advisory = results.filter((result) => result.plane === "advisory");
  const hardFailures = hard.filter((result) => result.status === "fail");
  const hardUnresolved = hard.filter((result) => UNRESOLVED_ASSESSMENTS.includes(result.status));
  const routingBlocked = input.resolution.plan_status !== "complete";
  const hardStatus: ContextualAssuranceEvaluation["hard_status"] = hardFailures.length > 0
    ? "fail"
    : routingBlocked || hardUnresolved.length > 0 ? "unknown" : "pass";
  const advisoryFindings = advisory.filter((result) => result.status !== "pass");
  const advisoryStatus: ContextualAssuranceEvaluation["advisory_status"] = hardStatus !== "pass"
    ? "not_evaluated"
    : advisoryFindings.length > 0 ? "findings_present" : "pass";
  let recommendedTransition: UniversalAssuranceTransition;
  let transitionCriterionIds: string[];
  let transitionOverlayRefs: string[];
  const rejected = hardFailures.filter((result) => result.failure_disposition === "reject");
  if (rejected.length > 0) {
    recommendedTransition = "reject";
    transitionCriterionIds = rejected.map((result) => result.criterion_id);
    transitionOverlayRefs = [...new Set(rejected.map((result) => result.overlay_ref))].sort(lexical);
  } else if (hardFailures.length > 0) {
    recommendedTransition = "revise";
    transitionCriterionIds = hardFailures.map((result) => result.criterion_id);
    transitionOverlayRefs = [...new Set(hardFailures.map((result) => result.overlay_ref))].sort(lexical);
  } else if (routingBlocked) {
    const routedRefs = [
      ...input.resolution.unresolved_overlay_refs,
      ...input.resolution.missing_overlay_refs,
      ...input.resolution.unexpected_overlay_refs,
    ].sort(lexical);
    const approvedRefs = new Set(registry
      .filter((overlay) => overlay.decision_state === "approved")
      .map(contextualAssuranceOverlayRef));
    recommendedTransition = routedRefs.some((ref) => approvedRefs.has(ref)) ? "escalate" : "abstain";
    transitionCriterionIds = [];
    transitionOverlayRefs = routedRefs;
  } else if (hardUnresolved.length > 0) {
    const specialist = hardUnresolved.filter((result) => result.review_type === "specialist");
    recommendedTransition = specialist.length > 0 ? "escalate" : "abstain";
    const active = specialist.length > 0 ? specialist : hardUnresolved;
    transitionCriterionIds = active.map((result) => result.criterion_id);
    transitionOverlayRefs = [...new Set(active.map((result) => result.overlay_ref))].sort(lexical);
  } else {
    const advisoryFailures = advisory.filter((result) => result.status === "fail");
    if (advisoryFailures.length > 0) {
      recommendedTransition = "revise";
      transitionCriterionIds = advisoryFailures.map((result) => result.criterion_id);
      transitionOverlayRefs = [...new Set(advisoryFailures.map((result) => result.overlay_ref))]
        .sort(lexical);
    } else if (advisoryFindings.length > 0) {
      recommendedTransition = "test";
      transitionCriterionIds = advisoryFindings.map((result) => result.criterion_id);
      transitionOverlayRefs = [...new Set(advisoryFindings.map((result) => result.overlay_ref))]
        .sort(lexical);
    } else {
      recommendedTransition = "proceed";
      transitionCriterionIds = [];
      transitionOverlayRefs = [];
    }
  }
  const preimage = {
    contract_version: "contentmd.contextual-assurance-evaluation/0.1.0" as const,
    content_decision_contract_id: input.contract.contract_id,
    content_decision_contract_digest: input.contract.contract_digest,
    registry_digest: input.resolution.registry_digest,
    resolution_digest: input.resolution.resolution_digest,
    routing_status: input.resolution.plan_status,
    hard_status: hardStatus,
    advisory_status: advisoryStatus,
    recommended_transition: recommendedTransition,
    transition_criterion_ids: transitionCriterionIds,
    transition_overlay_refs: transitionOverlayRefs,
    criterion_results: results,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, evaluation_digest: sha256Canonical(preimage) });
}

function validEvaluationDigest<T extends { evaluation_digest: string }>(value: T): boolean {
  const { evaluation_digest: received, ...preimage } = value;
  return /^[a-f0-9]{64}$/u.test(received) && received === sha256Canonical(preimage);
}

export function combineContentAssuranceEvaluations(input: {
  universal: UniversalAssuranceEvaluation;
  contextual: ContextualAssuranceEvaluation;
}): CombinedContentAssuranceEvaluation {
  if (!validEvaluationDigest(input.universal)
    || input.universal.kernel_version !== UNIVERSAL_ASSURANCE_KERNEL_VERSION
    || input.universal.kernel_digest !== UNIVERSAL_ASSURANCE_KERNEL_DIGEST
    || !validEvaluationDigest(input.contextual)
    || input.universal.content_decision_contract_id !== input.contextual.content_decision_contract_id
    || input.universal.content_decision_contract_digest
      !== input.contextual.content_decision_contract_digest) invalid("evaluation_pair");
  const hardStatus: CombinedContentAssuranceEvaluation["hard_status"] =
    input.universal.hard_status === "fail" || input.contextual.hard_status === "fail"
      ? "fail"
      : input.universal.hard_status === "unknown" || input.contextual.hard_status === "unknown"
        ? "unknown"
        : "pass";
  const transitionSources: Array<"universal" | "contextual"> = [];
  let recommendedTransition: UniversalAssuranceTransition;
  if (hardStatus === "fail") {
    recommendedTransition = input.universal.recommended_transition === "reject"
      || input.contextual.recommended_transition === "reject" ? "reject" : "revise";
    if (input.universal.hard_status === "fail") transitionSources.push("universal");
    if (input.contextual.hard_status === "fail") transitionSources.push("contextual");
  } else if (hardStatus === "unknown") {
    recommendedTransition = input.universal.recommended_transition === "escalate"
      || input.contextual.recommended_transition === "escalate" ? "escalate" : "abstain";
    if (input.universal.hard_status === "unknown") transitionSources.push("universal");
    if (input.contextual.hard_status === "unknown") transitionSources.push("contextual");
  } else if (input.universal.recommended_transition === "revise"
    || input.contextual.recommended_transition === "revise") {
    recommendedTransition = "revise";
    if (input.universal.recommended_transition === "revise") transitionSources.push("universal");
    if (input.contextual.recommended_transition === "revise") transitionSources.push("contextual");
  } else if (input.universal.recommended_transition === "test"
    || input.contextual.recommended_transition === "test") {
    recommendedTransition = "test";
    if (input.universal.recommended_transition === "test") transitionSources.push("universal");
    if (input.contextual.recommended_transition === "test") transitionSources.push("contextual");
  } else {
    recommendedTransition = "proceed";
  }
  const advisoryStatus: CombinedContentAssuranceEvaluation["advisory_status"] = hardStatus !== "pass"
    ? "not_evaluated"
    : input.universal.advisory_status === "findings_present"
      || input.contextual.advisory_status === "findings_present" ? "findings_present" : "pass";
  const preimage = {
    contract_version: "contentmd.combined-content-assurance-evaluation/0.1.0" as const,
    content_decision_contract_id: input.universal.content_decision_contract_id,
    content_decision_contract_digest: input.universal.content_decision_contract_digest,
    universal_evaluation_digest: input.universal.evaluation_digest,
    contextual_evaluation_digest: input.contextual.evaluation_digest,
    hard_status: hardStatus,
    advisory_status: advisoryStatus,
    recommended_transition: recommendedTransition,
    transition_sources: transitionSources,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, evaluation_digest: sha256Canonical(preimage) });
}
