import { sha256Canonical } from "@contentmd/core";
import {
  CONTENT_DESIGN_STAGES,
  verifyContentDecisionContract,
  type ContentDecisionContract,
  type ContentDesignStage,
} from "./content-decision-contract.js";

export const UNIVERSAL_ASSURANCE_KERNEL_VERSION =
  "contentmd.universal-assurance-kernel/0.1.0" as const;

export const UNIVERSAL_ASSURANCE_CRITERION_IDS = [
  "cdk.evidence_authority",
  "cdk.need_intervention_fit",
  "cdk.product_state_truth",
  "cdk.semantic_sufficiency",
  "cdk.structure_findability",
  "cdk.material_comprehension",
  "cdk.actionability_recovery",
  "cdk.agency_ethics",
  "cdk.accessibility_inclusion",
  "cdk.channel_system_fit",
  "cdk.voice_tone_terminology",
  "cdk.governance_lifecycle",
] as const;
export type UniversalAssuranceCriterionId =
  typeof UNIVERSAL_ASSURANCE_CRITERION_IDS[number];

export type UniversalAssurancePlane = "hard" | "advisory";
export type UniversalAssuranceReviewType =
  | "deterministic"
  | "specialist"
  | "research"
  | "human_judgment"
  | "preference";

export interface UniversalAssuranceCriterion {
  criterion_id: UniversalAssuranceCriterionId;
  criterion_version: "0.1.0";
  title: string;
  construct: string;
  question: string;
  plane: UniversalAssurancePlane;
  review_type: UniversalAssuranceReviewType;
  applicable_stages: ContentDesignStage[];
  failure_consequence: string;
  repair: string;
  source_refs: string[];
  authority_effect: "none";
}

const ALL_STAGES = [...CONTENT_DESIGN_STAGES];
const PRODUCTION_STAGES: ContentDesignStage[] = [
  "specify", "design", "write", "review", "implement", "verify",
];
const DESIGN_THROUGH_MAINTENANCE: ContentDesignStage[] = [
  "model", "decide", "specify", "design", "write", "review", "implement", "verify", "maintain",
];
const SYNTHESIS_REF = "research/08-synthesis/deterministic-ux-writing-usecase-research-2026-09-19.md";
const CONTENT_CONTRACT_REF = "research/10-cognitive-ergonomics/content-contract-and-lint-candidates.md";
const IA_REF = "research/01-discipline/content-modeling-and-information-architecture.md";
const CHANNEL_REF = "research/04-surfaces/channel-and-modality-content-practice.md";
const INTERACTION_REF = "research/04-surfaces/interaction-pattern-content-practice.md";
const VOICE_REF = "research/03-domain-matrix/voice-tone-terminology.md";

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

export const UNIVERSAL_ASSURANCE_CRITERIA: readonly UniversalAssuranceCriterion[] = deepFreeze([
  {
    criterion_id: "cdk.evidence_authority",
    criterion_version: "0.1.0",
    title: "Evidence and authority",
    construct: "The decision is traceable to evidence with an explicit authority boundary.",
    question: "Are material claims, classifications, and decisions supported at the authority level asserted?",
    plane: "hard",
    review_type: "human_judgment",
    applicable_stages: ALL_STAGES,
    failure_consequence: "Unsupported assumptions can be mistaken for product truth or approval.",
    repair: "Add evidence, lower the claim status, preserve conflict, or route the decision to an owner.",
    source_refs: [SYNTHESIS_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.need_intervention_fit",
    criterion_version: "0.1.0",
    title: "Need and intervention fit",
    construct: "The proposed intervention addresses the evidenced user, product, and content needs.",
    question: "Is content the right intervention, including the valid outcomes of no content change or product change?",
    plane: "hard",
    review_type: "human_judgment",
    applicable_stages: ["discover", "frame", "decide", ...PRODUCTION_STAGES, "measure", "retire"],
    failure_consequence: "The team may optimize wording for a problem that content cannot solve.",
    repair: "Reframe the needs and select or escalate the intervention before drafting.",
    source_refs: [SYNTHESIS_REF, CONTENT_CONTRACT_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.product_state_truth",
    criterion_version: "0.1.0",
    title: "Product and state truth",
    construct: "Content describes actual product behavior, state, eligibility, timing, and consequences.",
    question: "Does the decision remain true for the represented product state and known boundary cases?",
    plane: "hard",
    review_type: "deterministic",
    applicable_stages: ["frame", ...DESIGN_THROUGH_MAINTENANCE],
    failure_consequence: "The experience can misstate what happened, what will happen, or what the user can do.",
    repair: "Resolve product facts or abstain from the affected claim until the state model is known.",
    source_refs: [SYNTHESIS_REF, CONTENT_CONTRACT_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.semantic_sufficiency",
    criterion_version: "0.1.0",
    title: "Semantic sufficiency",
    construct: "Required meaning and invariants survive wording and presentation changes.",
    question: "Does the artifact communicate every material fact, distinction, and consequence without contradiction?",
    plane: "hard",
    review_type: "human_judgment",
    applicable_stages: DESIGN_THROUGH_MAINTENANCE,
    failure_consequence: "A fluent artifact may still omit or alter decision-critical meaning.",
    repair: "Restore the missing invariant, fact, distinction, or ordered information requirement.",
    source_refs: [CONTENT_CONTRACT_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.structure_findability",
    criterion_version: "0.1.0",
    title: "Structure and findability",
    construct: "Information is organized and placed where users can locate it at the point of need.",
    question: "Can the intended user find and scan the required information in the journey context?",
    plane: "advisory",
    review_type: "human_judgment",
    applicable_stages: ["model", ...PRODUCTION_STAGES, "maintain", "retire"],
    failure_consequence: "Correct content can remain functionally unavailable because of hierarchy or placement.",
    repair: "Change hierarchy, grouping, sequence, labels, or placement and test the revised structure.",
    source_refs: [IA_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.material_comprehension",
    criterion_version: "0.1.0",
    title: "Material comprehension",
    construct: "Intended users can form the required understanding, not merely encounter readable text.",
    question: "Is there adequate evidence that users understand the decision-critical meaning?",
    plane: "hard",
    review_type: "research",
    applicable_stages: ["decide", ...PRODUCTION_STAGES, "measure"],
    failure_consequence: "Readability or preference can be mistaken for comprehension.",
    repair: "Run an appropriate comprehension check or narrow the claim to what existing evidence supports.",
    source_refs: [SYNTHESIS_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.actionability_recovery",
    criterion_version: "0.1.0",
    title: "Actionability and recovery",
    construct: "Users can identify the available action, consequence, outcome state, and safe recovery path.",
    question: "Can the user act or recover without unsafe repetition, ambiguity, or a dead end?",
    plane: "hard",
    review_type: "deterministic",
    applicable_stages: ["decide", ...PRODUCTION_STAGES, "measure", "retire"],
    failure_consequence: "Users can repeat consequential actions, lose progress, or be stranded.",
    repair: "Specify actor, action, object, consequence, reversibility, outcome evidence, and recovery.",
    source_refs: [CONTENT_CONTRACT_REF, INTERACTION_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.agency_ethics",
    criterion_version: "0.1.0",
    title: "Agency and ethics",
    construct: "The experience supports informed, voluntary action without manipulation or blame.",
    question: "Are choices, consequences, consent, and system responsibility represented fairly?",
    plane: "hard",
    review_type: "specialist",
    applicable_stages: ["frame", "model", "decide", ...PRODUCTION_STAGES],
    failure_consequence: "Content can coerce, obscure material consequences, or assign responsibility unfairly.",
    repair: "Remove manipulative framing, expose material choices, and obtain the required specialist decision.",
    source_refs: [SYNTHESIS_REF, CONTENT_CONTRACT_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.accessibility_inclusion",
    criterion_version: "0.1.0",
    title: "Accessibility and inclusion",
    construct: "Meaning and action remain available across relevant access needs and user contexts.",
    question: "Does the content avoid known exclusion and satisfy the applicable accessibility requirements?",
    plane: "hard",
    review_type: "specialist",
    applicable_stages: ["model", "decide", ...PRODUCTION_STAGES, "measure", "maintain"],
    failure_consequence: "Some users may be unable to understand, navigate, or complete the task.",
    repair: "Resolve the identified barrier and obtain specialist review where deterministic checks are insufficient.",
    source_refs: [SYNTHESIS_REF, CHANNEL_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.channel_system_fit",
    criterion_version: "0.1.0",
    title: "Channel and system fit",
    construct: "Content is feasible in the component, channel, interaction, and system constraints that render it.",
    question: "Will the artifact remain complete and usable in its actual delivery system?",
    plane: "hard",
    review_type: "deterministic",
    applicable_stages: ["model", ...PRODUCTION_STAGES, "maintain"],
    failure_consequence: "Truncation, interaction mismatch, or unsupported behavior can change the experience.",
    repair: "Reconcile the artifact with component behavior, channel limits, and implementation constraints.",
    source_refs: [CHANNEL_REF, INTERACTION_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.voice_tone_terminology",
    criterion_version: "0.1.0",
    title: "Voice, tone, and terminology fit",
    construct: "Expression follows an eligible voice profile, situational tone policy, and controlled terminology.",
    question: "After hard meaning and safety requirements pass, is the expression appropriate and consistent?",
    plane: "advisory",
    review_type: "preference",
    applicable_stages: ["specify", "design", "write", "review", "implement", "verify", "measure", "maintain"],
    failure_consequence: "The artifact may feel inconsistent or inappropriate while remaining semantically safe.",
    repair: "Apply the eligible profile and policy, then compare or test alternatives without changing invariants.",
    source_refs: [VOICE_REF],
    authority_effect: "none",
  },
  {
    criterion_id: "cdk.governance_lifecycle",
    criterion_version: "0.1.0",
    title: "Governance and lifecycle",
    construct: "Ownership, approval, implementation, measurement, maintenance, and retirement states are explicit.",
    question: "Can the decision be governed and kept valid over its intended lifecycle?",
    plane: "hard",
    review_type: "specialist",
    applicable_stages: ALL_STAGES,
    failure_consequence: "A sound proposal can be mistaken for approved, live, current, or reusable content.",
    repair: "Record owner, authority state, acceptance evidence, implementation state, and review trigger.",
    source_refs: [SYNTHESIS_REF],
    authority_effect: "none",
  },
]);

export const UNIVERSAL_ASSURANCE_KERNEL_DIGEST = sha256Canonical({
  kernel_version: UNIVERSAL_ASSURANCE_KERNEL_VERSION,
  criteria: UNIVERSAL_ASSURANCE_CRITERIA,
});

export function requiredAssuranceCriterionIds(
  stage: ContentDesignStage,
): UniversalAssuranceCriterionId[] {
  if (!CONTENT_DESIGN_STAGES.includes(stage)) {
    throw new TypeError("universal_assurance_invalid:stage");
  }
  return UNIVERSAL_ASSURANCE_CRITERIA
    .filter((criterion) => criterion.applicable_stages.includes(stage))
    .map((criterion) => criterion.criterion_id);
}

export type UniversalAssuranceAssessmentStatus =
  | "pass"
  | "fail"
  | "unknown"
  | "not_observed"
  | "conflicting_evidence"
  | "unable_to_evaluate";

export interface UniversalAssuranceAssessment {
  criterion_id: UniversalAssuranceCriterionId;
  status: UniversalAssuranceAssessmentStatus;
  rationale: string;
  evidence_refs: string[];
  failure_disposition: "revise" | "reject" | null;
}

export interface UniversalAssuranceCriterionResult {
  criterion_id: UniversalAssuranceCriterionId;
  status: UniversalAssuranceAssessmentStatus | "not_applicable";
  rationale: string;
  evidence_refs: string[];
  failure_disposition: "revise" | "reject" | null;
  plane: UniversalAssurancePlane;
  review_type: UniversalAssuranceReviewType;
  applicable: boolean;
  source: "submitted" | "missing" | "stage_routing";
}

export type UniversalAssuranceTransition =
  | "proceed"
  | "revise"
  | "reject"
  | "test"
  | "abstain"
  | "escalate";

export interface UniversalAssuranceEvaluation {
  contract_version: "contentmd.universal-assurance-evaluation/0.1.0";
  kernel_version: typeof UNIVERSAL_ASSURANCE_KERNEL_VERSION;
  kernel_digest: string;
  content_decision_contract_id: string;
  content_decision_contract_digest: string;
  stage: ContentDesignStage;
  hard_status: "pass" | "fail" | "unknown";
  advisory_status: "pass" | "findings_present" | "not_evaluated";
  recommended_transition: UniversalAssuranceTransition;
  transition_criterion_ids: UniversalAssuranceCriterionId[];
  criterion_results: UniversalAssuranceCriterionResult[];
  authority_effect: "none";
  evaluation_digest: string;
}

const ASSESSMENT_STATUSES = [
  "pass", "fail", "unknown", "not_observed", "conflicting_evidence", "unable_to_evaluate",
] as const;
const UNRESOLVED_STATUSES: readonly UniversalAssuranceAssessmentStatus[] = [
  "unknown", "not_observed", "conflicting_evidence", "unable_to_evaluate",
];

function invalid(reason: string): never {
  throw new TypeError(`universal_assurance_invalid:${reason}`);
}

function lexical(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

function requiredText(value: unknown, field: string): string {
  if (typeof value !== "string" || value.trim().length === 0) invalid(field);
  return value.trim();
}

function uniqueSortedText(values: unknown, field: string): string[] {
  if (!Array.isArray(values)) invalid(field);
  return [...new Set(values.map((value, index) => requiredText(value, `${field}.${index}`)))]
    .sort(lexical);
}

function normalizeAssessment(
  value: UniversalAssuranceAssessment,
  index: number,
): UniversalAssuranceAssessment {
  const field = `assessments.${index}`;
  if (!UNIVERSAL_ASSURANCE_CRITERION_IDS.includes(value.criterion_id)) {
    invalid(`${field}.criterion_id`);
  }
  if (!ASSESSMENT_STATUSES.includes(value.status)) invalid(`${field}.status`);
  const evidenceRefs = uniqueSortedText(value.evidence_refs, `${field}.evidence_refs`);
  if (["pass", "fail", "conflicting_evidence"].includes(value.status)
    && evidenceRefs.length === 0) invalid(`${field}.evidence_refs`);
  if (value.status === "fail") {
    if (value.failure_disposition !== "revise" && value.failure_disposition !== "reject") {
      invalid(`${field}.failure_disposition`);
    }
  } else if (value.failure_disposition !== null) {
    invalid(`${field}.failure_disposition`);
  }
  return {
    criterion_id: value.criterion_id,
    status: value.status,
    rationale: requiredText(value.rationale, `${field}.rationale`),
    evidence_refs: evidenceRefs,
    failure_disposition: value.failure_disposition,
  };
}

function criterionFor(id: UniversalAssuranceCriterionId): UniversalAssuranceCriterion {
  return UNIVERSAL_ASSURANCE_CRITERIA.find((criterion) => criterion.criterion_id === id)!;
}

export function evaluateUniversalAssurance(input: {
  contract: ContentDecisionContract;
  assessments: UniversalAssuranceAssessment[];
}): UniversalAssuranceEvaluation {
  if (!verifyContentDecisionContract(input.contract)) invalid("contract");
  if (!Array.isArray(input.assessments)) invalid("assessments");

  const plannedIds = input.contract.assurance_plan.core_criterion_ids;
  if (plannedIds.some((id) => !UNIVERSAL_ASSURANCE_CRITERION_IDS.includes(
    id as UniversalAssuranceCriterionId,
  ))) invalid("contract.assurance_plan.unknown_criterion");
  const requiredIds = requiredAssuranceCriterionIds(input.contract.stage);
  if (requiredIds.some((id) => !plannedIds.includes(id))) {
    invalid("contract.assurance_plan.incomplete");
  }

  const normalizedAssessments = input.assessments.map(normalizeAssessment);
  const assessmentIds = normalizedAssessments.map((assessment) => assessment.criterion_id);
  if (new Set(assessmentIds).size !== assessmentIds.length) invalid("assessments.duplicate_criterion");
  if (assessmentIds.some((id) => !requiredIds.includes(id))) invalid("assessments.not_applicable");
  const byId = new Map(normalizedAssessments.map((assessment) => [assessment.criterion_id, assessment]));

  const results = UNIVERSAL_ASSURANCE_CRITERION_IDS.map((criterionId) => {
    const criterion = criterionFor(criterionId);
    const applicable = requiredIds.includes(criterionId);
    const submitted = byId.get(criterionId);
    if (!applicable) {
      return {
        criterion_id: criterionId,
        plane: criterion.plane,
        review_type: criterion.review_type,
        applicable: false,
        status: "not_applicable" as const,
        rationale: "Criterion does not apply at this content-design stage.",
        evidence_refs: [],
        failure_disposition: null,
        source: "stage_routing" as const,
      };
    }
    if (submitted === undefined) {
      return {
        criterion_id: criterionId,
        plane: criterion.plane,
        review_type: criterion.review_type,
        applicable: true,
        status: "not_observed" as const,
        rationale: "No criterion assessment was supplied.",
        evidence_refs: [],
        failure_disposition: null,
        source: "missing" as const,
      };
    }
    return {
      ...submitted,
      plane: criterion.plane,
      review_type: criterion.review_type,
      applicable: true,
      source: "submitted" as const,
    };
  });

  const hard = results.filter((result) => result.applicable && result.plane === "hard");
  const advisory = results.filter((result) => result.applicable && result.plane === "advisory");
  const hardFailures = hard.filter((result) => result.status === "fail");
  const hardUnresolved = hard.filter((result) => UNRESOLVED_STATUSES.includes(
    result.status as UniversalAssuranceAssessmentStatus,
  ));
  const hardStatus: UniversalAssuranceEvaluation["hard_status"] = hardFailures.length > 0
    ? "fail"
    : hardUnresolved.length > 0 ? "unknown" : "pass";
  const advisoryFindings = advisory.filter((result) => result.status !== "pass");
  const advisoryStatus: UniversalAssuranceEvaluation["advisory_status"] = hardStatus !== "pass"
    ? "not_evaluated"
    : advisoryFindings.length > 0 ? "findings_present" : "pass";

  let recommendedTransition: UniversalAssuranceTransition;
  let transitionCriterionIds: UniversalAssuranceCriterionId[];
  const rejected = hardFailures.filter((result) => result.failure_disposition === "reject");
  if (rejected.length > 0) {
    recommendedTransition = "reject";
    transitionCriterionIds = rejected.map((result) => result.criterion_id);
  } else if (hardFailures.length > 0) {
    recommendedTransition = "revise";
    transitionCriterionIds = hardFailures.map((result) => result.criterion_id);
  } else if (hardUnresolved.length > 0) {
    const specialistUnresolved = hardUnresolved.filter((result) => result.review_type === "specialist");
    recommendedTransition = specialistUnresolved.length > 0 ? "escalate" : "abstain";
    transitionCriterionIds = (specialistUnresolved.length > 0 ? specialistUnresolved : hardUnresolved)
      .map((result) => result.criterion_id);
  } else {
    const advisoryFailures = advisory.filter((result) => result.status === "fail");
    if (advisoryFailures.length > 0) {
      recommendedTransition = "revise";
      transitionCriterionIds = advisoryFailures.map((result) => result.criterion_id);
    } else if (advisoryFindings.length > 0) {
      recommendedTransition = "test";
      transitionCriterionIds = advisoryFindings.map((result) => result.criterion_id);
    } else {
      recommendedTransition = "proceed";
      transitionCriterionIds = [];
    }
  }

  const preimage = {
    contract_version: "contentmd.universal-assurance-evaluation/0.1.0" as const,
    kernel_version: UNIVERSAL_ASSURANCE_KERNEL_VERSION,
    kernel_digest: UNIVERSAL_ASSURANCE_KERNEL_DIGEST,
    content_decision_contract_id: input.contract.contract_id,
    content_decision_contract_digest: input.contract.contract_digest,
    stage: input.contract.stage,
    hard_status: hardStatus,
    advisory_status: advisoryStatus,
    recommended_transition: recommendedTransition,
    transition_criterion_ids: transitionCriterionIds,
    criterion_results: results,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, evaluation_digest: sha256Canonical(preimage) });
}
