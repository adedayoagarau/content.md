import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  verifyReviewerQualification,
  type AuthorizationReplay,
  type ReviewerQualificationRecord,
} from "@contentmd/governance";

declare const CONTENTMD_BUILTIN_REVIEW_PACKET: string | undefined;

type HardResult = "pass" | "fail" | "unknown" | "not_applicable";
type Disposition = "pass" | "revise" | "abstain" | "escalate" | "human_preference_review";

interface ReviewWorkUnit {
  work_unit_id: string;
  scenario_ref: { scenario_id: string; scenario_digest: string };
  sampling_cell: Record<string, string | number>;
  ability: { id: string; objective: string };
  context: {
    state: string;
    state_expression: string;
    action_expression: string;
    consequence_expression: string;
    situation: string;
    surface: string;
    surface_context: string;
    channel: string;
    risk: string;
    user_goal: string;
    source_locale: string;
    target_locale: string;
    direction: "ltr" | "rtl";
    voice_profile: string;
    situational_tone: string;
    evidence: {
      material_fact_status: "scenario_facts_available" | "missing";
      unresolved_question: string | null;
    };
  };
  candidate: {
    text: string;
    supporting_text: string | null;
    language: string;
    localization_status: string;
  };
  rubric: {
    evaluation_order: string[];
    hard_dimensions: string[];
    quality_dimensions: string[];
  };
  reviewer_response: Record<string, null>;
  review_state: "unreviewed" | "qualified";
  authority_effect: "none";
  retrieval_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: boolean;
}

interface CompletedReviewResponse {
  work_unit_id: string;
  disposition: Disposition;
  hard_dimension_results: Record<string, HardResult>;
  quality_dimension_scores: Record<string, number | null>;
  rationale: string;
  acceptable_meaning_invariants: string[];
  recommended_revision: string | null;
  review_evidence_refs: string[];
}

interface ContentDesignReviewSubmission {
  contract_version: "contentmd.content-design-review-submission/0.2.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: {
    reviewer_id: string;
    reviewer_role: string;
    reviewed_at: string;
    independent_review_attested: boolean;
    qualification_bundle: ReviewerQualificationBundle;
  };
  responses: CompletedReviewResponse[];
  submission_state: string;
  authority_effect: string;
}

interface ReviewerQualificationBundle {
  qualification: ReviewerQualificationRecord;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
}

export interface QualifiedContentDesignGoldSet {
  contract_version: "contentmd.content-design-qualified-gold-set/0.2.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: ContentDesignReviewSubmission["reviewer"];
  qualified_count: number;
  records: Array<ReviewWorkUnit & {
    human_gold: CompletedReviewResponse;
    review_state: "qualified";
    benchmark_eligibility: true;
    retrieval_eligibility: "never";
    training_eligibility: "never";
  }>;
  benchmark_eligibility: true;
  retrieval_eligibility: "never";
  training_eligibility: "never";
  authority_effect: "none";
  gold_set_digest: string;
}

export interface ContentDesignEvaluationReport {
  contract_version: "contentmd.content-design-evaluation-report/0.5.0";
  gold_set_digest: string;
  packet_digest: string;
  prediction_set_digest: string;
  overall: ContentDesignMetrics;
  by_ability: Record<string, ContentDesignMetrics>;
  by_risk: Record<string, ContentDesignMetrics>;
  by_surface: Record<string, ContentDesignMetrics>;
  by_locale: Record<string, ContentDesignMetrics>;
  by_voice: Record<string, ContentDesignMetrics>;
  by_tone: Record<string, ContentDesignMetrics>;
  by_quality_dimension: Record<string, ContentDesignQualityMetrics>;
  by_hard_dimension: Record<string, ContentDesignHardMetrics>;
  disposition_confusion: Record<Disposition, Record<Disposition, number>>;
  release_threshold_diagnostics: ReleaseThresholdDiagnostics;
  authority_effect: "none";
  report_digest: string;
}

export interface ContentDesignCalibrationReport {
  contract_version: "contentmd.content-design-calibration-report/0.2.0";
  packet_digest: string;
  left_gold_set_digest: string;
  right_gold_set_digest: string;
  reviewer_refs: [string, string];
  record_count: number;
  disposition_exact_agreement: number;
  hard_dimension_exact_agreement: number;
  quality_score_mean_absolute_difference: number | null;
  by_ability: Record<string, {
    count: number;
    disposition_exact_agreement: number;
    disagreement_count: number;
  }>;
  by_hard_dimension: Record<string, { comparison_count: number; exact_agreement: number | null; disagreement_count: number }>;
  by_quality_dimension: Record<string, { comparable_score_count: number; mean_absolute_difference: number | null; disagreement_count: number }>;
  disagreement_count: number;
  disagreements: Array<{
    work_unit_id: string;
    ability_id: string;
    left_disposition: Disposition;
    right_disposition: Disposition;
    hard_dimension_disagreements: string[];
    quality_dimension_disagreements: Array<{ dimension: string; left: number | null; right: number | null }>;
  }>;
  calibration_status: "agreement_measured_no_disagreement" | "agreement_measured_adjudication_required";
  adjudication_required: boolean;
  benchmark_claim_eligibility: false;
  authority_effect: "none";
  report_digest: string;
}

export interface ContentDesignReviewerQualificationRequest {
  contract_version: "contentmd.content-design-reviewer-qualification-request/0.1.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer_id: string;
  requested_role: "qualified_content_designer";
  requested_objective: "content_design_benchmark_review";
  requested_resource_scopes: ["content-design-benchmark", string];
  request_state: "awaiting_external_program_steward";
  authority_effect: "none";
  request_digest: string;
}

interface ReleaseThresholdDiagnostics {
  critical_safety_count: number;
  critical_false_acceptance_count: number;
  critical_false_acceptance_rate: number | null;
  required_abstention_count: number;
  correct_abstention_count: number;
  abstention_recall: number | null;
  required_escalation_count: number;
  correct_escalation_count: number;
  escalation_recall: number | null;
  approved_pass_count: number;
  false_rejection_count: number;
  false_rejection_rate: number | null;
  diagnostic_status: "measured_not_authorizing";
  benchmark_claim_eligibility: false;
}

interface ContentDesignMetrics {
  count: number;
  disposition_exact_agreement: number | null;
  hard_dimension_accuracy: number | null;
  quality_gold_score_count: number;
  quality_prediction_score_count: number;
  quality_comparable_score_count: number;
  quality_prediction_coverage: number | null;
  quality_score_mean_absolute_error: number | null;
}

interface ContentDesignQualityMetrics {
  gold_score_count: number;
  prediction_score_count: number;
  comparable_score_count: number;
  prediction_coverage: number | null;
  mean_absolute_error: number | null;
}

interface ContentDesignHardMetrics {
  gold_decisive_count: number;
  prediction_result_count: number;
  comparable_result_count: number;
  comparison_coverage: number | null;
  accuracy: number | null;
}

export interface BlindReviewPacket {
  contract_version: "contentmd.content-design-blind-review-packet/0.2.0";
  packet_digest: string;
  sampling_method: string;
  sample_count: number;
  blinded_fields: string[];
  required_reviewer_role: "qualified_content_designer";
  source_qualification: "synthetic_candidates_not_gold_or_training_eligible";
  review_work_units: ReviewWorkUnit[];
  packet_state: "unreviewed";
  authority_effect: "none";
}

interface ContentDesignPrediction {
  work_unit_id: string;
  disposition: Disposition;
  hard_dimension_results: Record<string, HardResult>;
  quality_dimension_scores: Record<string, number | null>;
  rationale_codes: string[];
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.3.0";
  authority_effect: "none";
}

export interface ContentDesignPredictionSet {
  contract_version: "contentmd.content-design-predictions/0.3.0";
  packet_digest: string;
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.3.0";
  prediction_count: number;
  predictions: ContentDesignPrediction[];
  quality_dimension_coverage: Record<string, { prediction_count: number; opportunity_count: number; coverage: number }>;
  hard_dimension_result_distribution: Record<string, { opportunity_count: number; pass: number; fail: number; unknown: number; not_applicable: number }>;
  evaluation_status: "unscored_pending_qualified_gold";
  label_access: "blind_packet_only";
  authority_effect: "none";
  prediction_set_digest: string;
}

export interface ContentDesignReviewSubmissionTemplate {
  contract_version: "contentmd.content-design-review-submission/0.2.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: {
    reviewer_id: null;
    reviewer_role: "qualified_content_designer";
    reviewed_at: null;
    independent_review_attested: false;
    qualification_bundle: null;
  };
  responses: Array<{
    work_unit_id: string;
    disposition: null;
    hard_dimension_results: Record<string, null>;
    quality_dimension_scores: Record<string, null>;
    rationale: null;
    acceptable_meaning_invariants: null;
    recommended_revision: null;
    review_evidence_refs: null;
  }>;
  submission_state: "incomplete";
  authority_effect: "none";
}

function digest(value: unknown): string {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

const BLINDED_FIELDS = ["candidate.variant", "candidate.voice", "candidate.tone", "candidate.injected_defect", "evaluation_control", "provisional_expectation"];
const RECOVERY_REQUIRED_SITUATIONS = new Set(["payment_unknown", "subscription_renewal", "permission_request", "validation_error", "service_interruption", "automated_assistant"]);

function record(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function stringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.length > 0 && new Set(value).size === value.length && value.every(nonempty);
}

function validWorkUnit(value: unknown): value is ReviewWorkUnit {
  if (!record(value) || !record(value.scenario_ref) || !record(value.sampling_cell)
    || !record(value.ability) || !record(value.context) || !record(value.candidate)
    || !record(value.rubric) || !record(value.reviewer_response)) return false;
  const context = value.context;
  const candidate = value.candidate;
  const evidence = context.evidence;
  if (!record(evidence)
    || !["scenario_facts_available", "missing"].includes(String(evidence.material_fact_status))
    || (evidence.material_fact_status === "missing" ? !nonempty(evidence.unresolved_question) : evidence.unresolved_question !== null)) return false;
  if (["variant", "voice", "tone", "injected_defect"].some((key) => Object.hasOwn(candidate, key))
    || Object.hasOwn(value, "evaluation_control") || Object.hasOwn(value, "provisional_expectation")) return false;
  const requiredContext = ["state", "state_expression", "action_expression", "consequence_expression", "situation", "surface", "surface_context", "channel", "risk", "user_goal", "source_locale", "target_locale", "voice_profile", "situational_tone"];
  return nonempty(value.work_unit_id)
    && nonempty(value.scenario_ref.scenario_id) && nonempty(value.scenario_ref.scenario_digest)
    && nonempty(value.ability.id) && nonempty(value.ability.objective)
    && requiredContext.every((key) => nonempty(context[key]))
    && (context.direction === "ltr" || context.direction === "rtl")
    && nonempty(candidate.text)
    && (candidate.supporting_text === null || typeof candidate.supporting_text === "string")
    && nonempty(candidate.language) && nonempty(candidate.localization_status)
    && stringArray(value.rubric.evaluation_order)
    && stringArray(value.rubric.hard_dimensions)
    && stringArray(value.rubric.quality_dimensions)
    && Object.values(value.reviewer_response).every((item) => item === null)
    && value.review_state === "unreviewed"
    && value.authority_effect === "none"
    && value.retrieval_eligibility === "never"
    && value.training_eligibility === "never"
    && value.benchmark_eligibility === false;
}

function validatePacket(value: unknown): BlindReviewPacket {
  if (value === null || typeof value !== "object") throw new TypeError("content_design_benchmark_invalid:packet");
  const packet = value as BlindReviewPacket;
  if (packet.contract_version !== "contentmd.content-design-blind-review-packet/0.2.0"
    || packet.authority_effect !== "none"
    || packet.packet_state !== "unreviewed"
    || packet.required_reviewer_role !== "qualified_content_designer"
    || packet.source_qualification !== "synthetic_candidates_not_gold_or_training_eligible"
    || !nonempty(packet.sampling_method)
    || JSON.stringify(packet.blinded_fields) !== JSON.stringify(BLINDED_FIELDS)
    || !Number.isSafeInteger(packet.sample_count) || packet.sample_count < 1
    || !Array.isArray(packet.review_work_units) || packet.review_work_units.length !== packet.sample_count) {
    throw new TypeError("content_design_benchmark_invalid:packet");
  }
  const { packet_digest: packetDigest, ...preimage } = packet;
  if (packetDigest !== digest(preimage)) throw new TypeError("content_design_benchmark_invalid:packet_digest");
  if (new Set(packet.review_work_units.map((unit) => unit.work_unit_id)).size !== packet.sample_count
    || !packet.review_work_units.every(validWorkUnit)) throw new TypeError("content_design_benchmark_invalid:packet_shape");
  return packet;
}

function predict(unit: ReviewWorkUnit): ContentDesignPrediction {
  const text = unit.candidate.text;
  const combinedText = [unit.candidate.supporting_text, text].filter((value): value is string => typeof value === "string").join(" ");
  const lower = combinedText.toLocaleLowerCase("en-US");
  const state = unit.context.state.toLocaleLowerCase("en-US");
  const falseCertainty = /\beverything is complete\b/u.test(lower) && !/completed successfully/u.test(state);
  const vague = /\bsomething happened\b/u.test(lower) || /^continue\.?$/iu.test(text.trim());
  const blame = /\byou (?:did|entered|chose|caused)\b.*\b(?:incorrect|wrong|failed|mistake|issue)/iu.test(text);
  const pressure = /\bact now\b|\bdon't miss out\b|\bhurry\b/iu.test(text);
  const stylisticNearMiss = /^(?:we're here to help\.|important:)/iu.test(text.trim());
  const overloaded = text.trim().split(/\s+/u).length > 28;
  const stateRepresented = lower.includes(unit.context.state_expression.toLocaleLowerCase("en-US"));
  const consequenceRepresented = lower.includes(unit.context.consequence_expression.toLocaleLowerCase("en-US"));
  const localeMismatch = unit.context.target_locale !== unit.context.source_locale
    && unit.candidate.localization_status === "source_language_candidate_requires_localization";
  const materialEvidenceMissing = unit.context.evidence?.material_fact_status === "missing";
  const authorityUnresolved = /\b(?:approved|authorized|guaranteed)\b/iu.test(text);
  const recovery: HardResult = !RECOVERY_REQUIRED_SITUATIONS.has(unit.context.situation)
    ? "not_applicable"
    : lower.includes(unit.context.action_expression.toLocaleLowerCase("en-US")) ? "pass" : "fail";
  const hard: Record<string, HardResult> = {
    factual_accuracy: materialEvidenceMissing ? "unknown" : falseCertainty ? "fail" : "pass",
    state_accuracy: falseCertainty || vague || !stateRepresented ? "fail" : "pass",
    semantic_fidelity: vague || !stateRepresented || !consequenceRepresented ? "fail" : "pass",
    agency: pressure ? "fail" : "pass",
    recovery,
    authority_boundary: authorityUnresolved ? "unknown" : "pass",
  };
  const hardFailure = Object.values(hard).includes("fail");
  const allHardResolved = Object.values(hard).every((result) => result === "pass" || result === "not_applicable");
  const disposition: Disposition = materialEvidenceMissing
    ? "abstain"
    : hardFailure || blame || pressure
    ? "revise"
    : authorityUnresolved
      ? "escalate"
    : localeMismatch
      ? "escalate"
      : allHardResolved && !stylisticNearMiss ? "pass" : "human_preference_review";
  const rationaleCodes = [
    falseCertainty && "unsupported_certainty",
    vague && "unclear_action_or_state",
    !stateRepresented && "state_not_represented",
    !consequenceRepresented && "consequence_not_represented",
    blame && "user_blame",
    pressure && "unsupported_urgency_or_pressure",
    overloaded && "poor_economy",
    materialEvidenceMissing && "material_evidence_missing",
    localeMismatch && "in_locale_review_required",
    authorityUnresolved && "authority_claim_requires_verification",
  ].filter((value): value is string => typeof value === "string");
  return {
    work_unit_id: unit.work_unit_id,
    disposition,
    hard_dimension_results: hard,
    quality_dimension_scores: {
      clarity: vague ? 1 : overloaded ? 2 : 4,
      specificity: vague ? 1 : stateRepresented ? 4 : 2,
      hierarchy: overloaded ? 1 : unit.context.surface === "button" && text.split(/\s+/u).length > 8 ? 2 : 3,
      accessibility_readiness: unit.context.surface === "screen_reader_status" ? (overloaded ? 2 : 3) : null,
      locale_readiness: localeMismatch ? 1 : 4,
      voice_fit: blame || pressure ? 1 : 3,
      tone_fit: blame || pressure ? 1 : 3,
      economy: overloaded ? 1 : vague ? 2 : text.split(/\s+/u).length > 20 ? 2 : 4,
    },
    rationale_codes: rationaleCodes.length === 0
      ? disposition === "pass" ? ["hard_checks_passed"] : ["hard_checks_passed_preference_unresolved"]
      : rationaleCodes,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.3.0",
    authority_effect: "none",
  };
}

function predictionQualityCoverage(predictions: ContentDesignPrediction[]): Record<string, { prediction_count: number; opportunity_count: number; coverage: number }> {
  const dimensions = [...new Set(predictions.flatMap((prediction) => Object.keys(prediction.quality_dimension_scores)))].sort();
  return Object.fromEntries(dimensions.map((dimension) => {
    const opportunityCount = predictions.filter((prediction) => Object.hasOwn(prediction.quality_dimension_scores, dimension)).length;
    const predictionCount = predictions.filter((prediction) => typeof prediction.quality_dimension_scores[dimension] === "number").length;
    return [dimension, { prediction_count: predictionCount, opportunity_count: opportunityCount, coverage: opportunityCount === 0 ? 0 : predictionCount / opportunityCount }];
  }));
}

function predictionHardDistribution(predictions: ContentDesignPrediction[]): Record<string, { opportunity_count: number; pass: number; fail: number; unknown: number; not_applicable: number }> {
  const dimensions = [...new Set(predictions.flatMap((prediction) => Object.keys(prediction.hard_dimension_results)))].sort();
  return Object.fromEntries(dimensions.map((dimension) => {
    const results = predictions.flatMap((prediction) => Object.hasOwn(prediction.hard_dimension_results, dimension) ? [prediction.hard_dimension_results[dimension]!] : []);
    return [dimension, {
      opportunity_count: results.length,
      pass: results.filter((result) => result === "pass").length,
      fail: results.filter((result) => result === "fail").length,
      unknown: results.filter((result) => result === "unknown").length,
      not_applicable: results.filter((result) => result === "not_applicable").length,
    }];
  }));
}

export function predictContentDesignBenchmark(packetValue: unknown): ContentDesignPredictionSet {
  const packet = validatePacket(packetValue);
  const predictions = packet.review_work_units.map(predict);
  const preimage = {
    contract_version: "contentmd.content-design-predictions/0.3.0" as const,
    packet_digest: packet.packet_digest,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.3.0" as const,
    prediction_count: predictions.length,
    predictions,
    quality_dimension_coverage: predictionQualityCoverage(predictions),
    hard_dimension_result_distribution: predictionHardDistribution(predictions),
    evaluation_status: "unscored_pending_qualified_gold" as const,
    label_access: "blind_packet_only" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, prediction_set_digest: digest(preimage) };
}

export function createContentDesignReviewSubmissionTemplate(packetValue: unknown): ContentDesignReviewSubmissionTemplate {
  const packet = validatePacket(packetValue);
  return {
    contract_version: "contentmd.content-design-review-submission/0.2.0",
    packet_ref: { packet_digest: packet.packet_digest, sample_count: packet.sample_count },
    reviewer: {
      reviewer_id: null,
      reviewer_role: "qualified_content_designer",
      reviewed_at: null,
      independent_review_attested: false,
      qualification_bundle: null,
    },
    responses: packet.review_work_units.map((unit) => ({
      work_unit_id: unit.work_unit_id,
      disposition: null,
      hard_dimension_results: Object.fromEntries(unit.rubric.hard_dimensions.map((dimension) => [dimension, null])),
      quality_dimension_scores: Object.fromEntries(unit.rubric.quality_dimensions.map((dimension) => [dimension, null])),
      rationale: null,
      acceptable_meaning_invariants: null,
      recommended_revision: null,
      review_evidence_refs: null,
    })),
    submission_state: "incomplete",
    authority_effect: "none",
  };
}

export function createContentDesignReviewerQualificationRequest(packetValue: unknown, reviewerIdValue: string): ContentDesignReviewerQualificationRequest {
  const packet = validatePacket(packetValue);
  const reviewerId = reviewerIdValue.trim();
  if (reviewerId.length === 0 || reviewerId.length > 200) incomplete("reviewer_qualification_request_id");
  const packetScope = `content-design-benchmark-packet:${packet.packet_digest}`;
  const preimage = {
    contract_version: "contentmd.content-design-reviewer-qualification-request/0.1.0" as const,
    packet_ref: { packet_digest: packet.packet_digest, sample_count: packet.sample_count },
    reviewer_id: reviewerId,
    requested_role: "qualified_content_designer" as const,
    requested_objective: "content_design_benchmark_review" as const,
    requested_resource_scopes: ["content-design-benchmark", packetScope] as ["content-design-benchmark", string],
    request_state: "awaiting_external_program_steward" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, request_digest: digest(preimage) };
}

function verifyBenchmarkReviewer(
  reviewer: ContentDesignReviewSubmission["reviewer"],
  packetDigest: string,
): void {
  let qualification: ReviewerQualificationRecord;
  try {
    qualification = verifyReviewerQualification({
      ...reviewer.qualification_bundle,
      as_of: reviewer.reviewed_at,
      verification_mode: "official",
    });
  } catch {
    incomplete("reviewer_qualification");
  }
  const packetScope = `content-design-benchmark-packet:${packetDigest}`;
  if (qualification.reviewer_ref.object_id !== reviewer.reviewer_id
    || !qualification.eligible_roles.includes("qualified_content_designer")
    || !qualification.qualified_objectives.includes("content_design_benchmark_review")
    || !qualification.authorized_resource_scopes.includes("content-design-benchmark")
    || !qualification.authorized_resource_scopes.includes(packetScope)) {
    incomplete("reviewer_qualification_scope");
  }
}

const DISPOSITIONS: readonly Disposition[] = ["pass", "revise", "abstain", "escalate", "human_preference_review"];
const HARD_RESULTS: readonly HardResult[] = ["pass", "fail", "unknown", "not_applicable"];

function incomplete(reason: string): never {
  throw new Error(`qualification_review_incomplete:content_design:${reason}`);
}

function isRfc3339(value: unknown): value is string {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)
    && Number.isFinite(Date.parse(value));
}

function sameKeys(value: Record<string, unknown>, expected: string[]): boolean {
  return JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort());
}

function validatePredictionSet(value: unknown, packetDigest: string, units: QualifiedContentDesignGoldSet["records"]): ContentDesignPredictionSet {
  if (!record(value)) incomplete("predictions_envelope");
  const predictions = value as unknown as ContentDesignPredictionSet;
  if (predictions.contract_version !== "contentmd.content-design-predictions/0.3.0"
    || predictions.packet_digest !== packetDigest
    || predictions.evaluator_version !== "contentmd.deterministic-content-design-baseline/0.3.0"
    || predictions.evaluation_status !== "unscored_pending_qualified_gold"
    || predictions.label_access !== "blind_packet_only"
    || predictions.authority_effect !== "none"
    || !Number.isSafeInteger(predictions.prediction_count)
    || predictions.prediction_count !== units.length
    || !Array.isArray(predictions.predictions)
    || predictions.predictions.length !== units.length) incomplete("predictions_envelope");
  const { prediction_set_digest: predictionDigest, ...preimage } = predictions;
  if (predictionDigest !== digest(preimage)) incomplete("predictions_digest");
  const unitMap = new Map(units.map((unit) => [unit.work_unit_id, unit]));
  const ids = new Set<string>();
  for (const prediction of predictions.predictions) {
    const unit = record(prediction) && nonempty(prediction.work_unit_id) ? unitMap.get(prediction.work_unit_id) : undefined;
    if (unit === undefined || ids.has(prediction.work_unit_id)) incomplete("prediction_coverage");
    ids.add(prediction.work_unit_id);
    if (!DISPOSITIONS.includes(prediction.disposition as Disposition)
      || prediction.evaluator_version !== predictions.evaluator_version
      || prediction.authority_effect !== "none"
      || !record(prediction.hard_dimension_results)
      || !sameKeys(prediction.hard_dimension_results, unit.rubric.hard_dimensions)
      || Object.values(prediction.hard_dimension_results).some((result) => !HARD_RESULTS.includes(result as HardResult))
      || !record(prediction.quality_dimension_scores)
      || !sameKeys(prediction.quality_dimension_scores, unit.rubric.quality_dimensions)
      || Object.values(prediction.quality_dimension_scores).some((score) => score !== null && (!Number.isInteger(score) || Number(score) < 1 || Number(score) > 5))
      || !stringArray(prediction.rationale_codes)) incomplete(`prediction_shape:${prediction.work_unit_id}`);
    if (prediction.disposition === "pass"
      && Object.values(prediction.hard_dimension_results).some((result) => result !== "pass" && result !== "not_applicable")) {
      incomplete(`prediction_pass_unresolved:${prediction.work_unit_id}`);
    }
  }
  if (JSON.stringify(predictions.quality_dimension_coverage) !== JSON.stringify(predictionQualityCoverage(predictions.predictions))) incomplete("prediction_quality_coverage");
  if (JSON.stringify(predictions.hard_dimension_result_distribution) !== JSON.stringify(predictionHardDistribution(predictions.predictions))) incomplete("prediction_hard_distribution");
  return predictions;
}

function validateCompletedResponse(unit: ReviewWorkUnit, value: unknown): asserts value is CompletedReviewResponse {
  if (!record(value)) incomplete(`${unit.work_unit_id}:response`);
  const response = value as unknown as CompletedReviewResponse;
  if (response.work_unit_id !== unit.work_unit_id || !DISPOSITIONS.includes(response.disposition)) incomplete(`${unit.work_unit_id}:disposition`);
  if (!record(response.hard_dimension_results)
    || !sameKeys(response.hard_dimension_results, unit.rubric.hard_dimensions)) incomplete(`${unit.work_unit_id}:hard_dimensions`);
  for (const dimension of unit.rubric.hard_dimensions) {
    if (!HARD_RESULTS.includes(response.hard_dimension_results[dimension]!)) incomplete(`${unit.work_unit_id}:hard:${dimension}`);
  }
  if (!record(response.quality_dimension_scores)
    || !sameKeys(response.quality_dimension_scores, unit.rubric.quality_dimensions)) incomplete(`${unit.work_unit_id}:quality_dimensions`);
  for (const dimension of unit.rubric.quality_dimensions) {
    const score = response.quality_dimension_scores[dimension];
    if (score === undefined || score !== null && (!Number.isInteger(score) || score < 1 || score > 5)) incomplete(`${unit.work_unit_id}:quality:${dimension}`);
    if (response.disposition !== "abstain" && response.disposition !== "escalate" && score === null) {
      incomplete(`${unit.work_unit_id}:quality:${dimension}`);
    }
  }
  if (typeof response.rationale !== "string" || response.rationale.trim().length < 20) incomplete(`${unit.work_unit_id}:rationale`);
  if (!Array.isArray(response.acceptable_meaning_invariants) || response.acceptable_meaning_invariants.length === 0
    || response.acceptable_meaning_invariants.some((value) => typeof value !== "string" || value.trim().length === 0)) incomplete(`${unit.work_unit_id}:invariants`);
  if (response.disposition === "revise" && (typeof response.recommended_revision !== "string" || response.recommended_revision.trim().length === 0)) incomplete(`${unit.work_unit_id}:recommended_revision`);
  if (response.recommended_revision !== null && typeof response.recommended_revision !== "string") incomplete(`${unit.work_unit_id}:recommended_revision_type`);
  if (!Array.isArray(response.review_evidence_refs) || response.review_evidence_refs.length === 0
    || response.review_evidence_refs.some((value) => typeof value !== "string" || value.trim().length === 0)) incomplete(`${unit.work_unit_id}:evidence_refs`);
}

function validateGoldSet(value: unknown): QualifiedContentDesignGoldSet {
  if (!record(value)) incomplete("score_envelope");
  const gold = value as unknown as QualifiedContentDesignGoldSet;
  if (gold.contract_version !== "contentmd.content-design-qualified-gold-set/0.2.0"
    || !record(gold.packet_ref) || !nonempty(gold.packet_ref.packet_digest)
    || !Number.isSafeInteger(gold.packet_ref.sample_count) || gold.packet_ref.sample_count < 1
    || !record(gold.reviewer)
    || !Array.isArray(gold.records)) incomplete("score_envelope");
  const { gold_set_digest: goldDigest, ...goldPreimage } = gold;
  if (goldDigest !== digest(goldPreimage)) incomplete("gold_digest");
  if (gold.reviewer.reviewer_role !== "qualified_content_designer"
    || !nonempty(gold.reviewer.reviewer_id)
    || !isRfc3339(gold.reviewer.reviewed_at)
    || gold.reviewer.independent_review_attested !== true
    || gold.qualified_count !== gold.records.length
    || gold.packet_ref.sample_count !== gold.records.length
    || gold.benchmark_eligibility !== true
    || gold.retrieval_eligibility !== "never"
    || gold.training_eligibility !== "never"
    || gold.authority_effect !== "none") incomplete("gold_shape");
  verifyBenchmarkReviewer(gold.reviewer, gold.packet_ref.packet_digest);
  const ids = new Set<string>();
  for (const qualified of gold.records) {
    if (!record(qualified) || !nonempty(qualified.work_unit_id) || ids.has(qualified.work_unit_id)) incomplete("gold_coverage");
    ids.add(qualified.work_unit_id);
    const base = structuredClone(qualified) as Record<string, unknown>;
    const humanGold = base.human_gold;
    delete base.human_gold;
    base.review_state = "unreviewed";
    base.benchmark_eligibility = false;
    if (!validWorkUnit(base)
      || qualified.review_state !== "qualified"
      || qualified.benchmark_eligibility !== true
      || qualified.retrieval_eligibility !== "never"
      || qualified.training_eligibility !== "never"
      || qualified.authority_effect !== "none") incomplete(`gold_record:${qualified.work_unit_id}`);
    validateCompletedResponse(base, humanGold);
  }
  return gold;
}

function verifyGoldPacketBinding(gold: QualifiedContentDesignGoldSet, packet: BlindReviewPacket): void {
  if (gold.packet_ref.packet_digest !== packet.packet_digest
    || gold.packet_ref.sample_count !== packet.sample_count
    || gold.records.length !== packet.review_work_units.length) incomplete("gold_packet_binding");
  const packetUnits = new Map(packet.review_work_units.map((unit) => [unit.work_unit_id, unit]));
  for (const record of gold.records) {
    const expected = packetUnits.get(record.work_unit_id);
    if (expected === undefined) incomplete("gold_packet_binding");
    const actual = structuredClone(record) as unknown as Record<string, unknown>;
    delete actual.human_gold;
    actual.review_state = "unreviewed";
    actual.benchmark_eligibility = false;
    if (JSON.stringify(actual) !== JSON.stringify(expected)) incomplete(`gold_packet_binding:${record.work_unit_id}`);
  }
}

export function qualifyContentDesignReview(packetValue: unknown, submissionValue: unknown): QualifiedContentDesignGoldSet {
  const packet = validatePacket(packetValue);
  if (submissionValue === null || typeof submissionValue !== "object") incomplete("submission");
  const submission = submissionValue as ContentDesignReviewSubmission;
  if (submission.contract_version !== "contentmd.content-design-review-submission/0.2.0"
    || submission.packet_ref?.packet_digest !== packet.packet_digest
    || submission.packet_ref?.sample_count !== packet.sample_count
    || submission.submission_state !== "complete"
    || submission.authority_effect !== "none"
    || submission.reviewer?.reviewer_role !== "qualified_content_designer"
    || typeof submission.reviewer?.reviewer_id !== "string" || submission.reviewer.reviewer_id.trim().length === 0
    || !isRfc3339(submission.reviewer?.reviewed_at)
    || submission.reviewer?.independent_review_attested !== true
    || !Array.isArray(submission.responses) || submission.responses.length !== packet.sample_count) incomplete("envelope");
  verifyBenchmarkReviewer(submission.reviewer, packet.packet_digest);
  const responses = new Map(submission.responses.map((response) => [response.work_unit_id, response]));
  if (responses.size !== packet.sample_count) incomplete("duplicate_or_missing_response");
  const records = packet.review_work_units.map((unit) => {
    const response = responses.get(unit.work_unit_id);
    if (response === undefined) incomplete(`missing:${unit.work_unit_id}`);
    validateCompletedResponse(unit, response);
    return {
      ...structuredClone(unit),
      human_gold: structuredClone(response),
      review_state: "qualified" as const,
      benchmark_eligibility: true as const,
      retrieval_eligibility: "never" as const,
      training_eligibility: "never" as const,
    };
  });
  const preimage = {
    contract_version: "contentmd.content-design-qualified-gold-set/0.2.0" as const,
    packet_ref: submission.packet_ref,
    reviewer: submission.reviewer,
    qualified_count: records.length,
    records,
    benchmark_eligibility: true as const,
    retrieval_eligibility: "never" as const,
    training_eligibility: "never" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, gold_set_digest: digest(preimage) };
}

type JoinedRecord = { unit: QualifiedContentDesignGoldSet["records"][number]; gold: CompletedReviewResponse; prediction: ContentDesignPrediction };

function metrics(records: JoinedRecord[]): ContentDesignMetrics {
  const dispositionCorrect = records.filter(({ gold, prediction }) => gold.disposition === prediction.disposition).length;
  const hardPairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.hard_dimensions.map((dimension) => [gold.hard_dimension_results[dimension], prediction.hard_dimension_results[dimension]] as const));
  const hardComparable = hardPairs.filter(([goldValue, predictedValue]) => goldValue !== "unknown" && predictedValue !== undefined);
  const qualityPairsAll = records.flatMap(({ unit, gold, prediction }) => unit.rubric.quality_dimensions.map((dimension) => [gold.quality_dimension_scores[dimension], prediction.quality_dimension_scores[dimension]] as const));
  const qualityGoldCount = qualityPairsAll.filter(([goldValue]) => typeof goldValue === "number").length;
  const qualityPredictionCount = qualityPairsAll.filter(([, predictedValue]) => typeof predictedValue === "number").length;
  const qualityPairs = qualityPairsAll.filter((pair): pair is readonly [number, number] => typeof pair[0] === "number" && typeof pair[1] === "number");
  return {
    count: records.length,
    disposition_exact_agreement: records.length === 0 ? null : dispositionCorrect / records.length,
    hard_dimension_accuracy: hardComparable.length === 0 ? null : hardComparable.filter(([goldValue, predictedValue]) => goldValue === predictedValue).length / hardComparable.length,
    quality_gold_score_count: qualityGoldCount,
    quality_prediction_score_count: qualityPredictionCount,
    quality_comparable_score_count: qualityPairs.length,
    quality_prediction_coverage: ratio(qualityPairs.length, qualityGoldCount),
    quality_score_mean_absolute_error: qualityPairs.length === 0 ? null : qualityPairs.reduce((sum, [goldValue, predictedValue]) => sum + Math.abs(goldValue - predictedValue), 0) / qualityPairs.length,
  };
}

function ratio(numerator: number, denominator: number): number | null {
  return denominator === 0 ? null : numerator / denominator;
}

function qualityDimensionMetrics(records: JoinedRecord[], dimension: string): ContentDesignQualityMetrics {
  const pairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.quality_dimensions.includes(dimension)
    ? [[gold.quality_dimension_scores[dimension], prediction.quality_dimension_scores[dimension]] as const]
    : []);
  const goldCount = pairs.filter(([goldValue]) => typeof goldValue === "number").length;
  const predictionCount = pairs.filter(([, predictedValue]) => typeof predictedValue === "number").length;
  const comparable = pairs.filter((pair): pair is readonly [number, number] => typeof pair[0] === "number" && typeof pair[1] === "number");
  return {
    gold_score_count: goldCount,
    prediction_score_count: predictionCount,
    comparable_score_count: comparable.length,
    prediction_coverage: ratio(comparable.length, goldCount),
    mean_absolute_error: comparable.length === 0 ? null : comparable.reduce((sum, [goldValue, predictedValue]) => sum + Math.abs(goldValue - predictedValue), 0) / comparable.length,
  };
}

function hardDimensionMetrics(records: JoinedRecord[], dimension: string): ContentDesignHardMetrics {
  const pairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.hard_dimensions.includes(dimension)
    ? [[gold.hard_dimension_results[dimension], prediction.hard_dimension_results[dimension]] as const]
    : []);
  const goldDecisiveCount = pairs.filter(([goldValue]) => goldValue !== "unknown").length;
  const predictionResultCount = pairs.filter(([, predictedValue]) => predictedValue !== undefined).length;
  const comparable = pairs.filter((pair): pair is readonly [HardResult, HardResult] => pair[0] !== "unknown" && pair[1] !== undefined);
  return {
    gold_decisive_count: goldDecisiveCount,
    prediction_result_count: predictionResultCount,
    comparable_result_count: comparable.length,
    comparison_coverage: ratio(comparable.length, goldDecisiveCount),
    accuracy: comparable.length === 0 ? null : comparable.filter(([goldValue, predictedValue]) => goldValue === predictedValue).length / comparable.length,
  };
}

function releaseDiagnostics(records: JoinedRecord[]): ReleaseThresholdDiagnostics {
  const criticalSafety = records.filter(({ unit, gold }) => unit.context.risk === "critical"
    && (gold.disposition === "revise" || gold.disposition === "abstain" || gold.disposition === "escalate"
      || Object.values(gold.hard_dimension_results).includes("fail")));
  const abstentions = records.filter(({ gold }) => gold.disposition === "abstain");
  const escalations = records.filter(({ gold }) => gold.disposition === "escalate");
  const approvedPasses = records.filter(({ gold }) => gold.disposition === "pass");
  const criticalFalseAcceptances = criticalSafety.filter(({ prediction }) => prediction.disposition === "pass").length;
  const correctAbstentions = abstentions.filter(({ prediction }) => prediction.disposition === "abstain").length;
  const correctEscalations = escalations.filter(({ prediction }) => prediction.disposition === "escalate").length;
  const falseRejections = approvedPasses.filter(({ prediction }) => prediction.disposition !== "pass").length;
  return {
    critical_safety_count: criticalSafety.length,
    critical_false_acceptance_count: criticalFalseAcceptances,
    critical_false_acceptance_rate: ratio(criticalFalseAcceptances, criticalSafety.length),
    required_abstention_count: abstentions.length,
    correct_abstention_count: correctAbstentions,
    abstention_recall: ratio(correctAbstentions, abstentions.length),
    required_escalation_count: escalations.length,
    correct_escalation_count: correctEscalations,
    escalation_recall: ratio(correctEscalations, escalations.length),
    approved_pass_count: approvedPasses.length,
    false_rejection_count: falseRejections,
    false_rejection_rate: ratio(falseRejections, approvedPasses.length),
    diagnostic_status: "measured_not_authorizing",
    benchmark_claim_eligibility: false,
  };
}

function dispositionConfusion(records: JoinedRecord[]): Record<Disposition, Record<Disposition, number>> {
  return Object.fromEntries(DISPOSITIONS.map((goldDisposition) => [goldDisposition, Object.fromEntries(
    DISPOSITIONS.map((predictedDisposition) => [predictedDisposition, records.filter(({ gold, prediction }) =>
      gold.disposition === goldDisposition && prediction.disposition === predictedDisposition).length]),
  )])) as Record<Disposition, Record<Disposition, number>>;
}

export function scoreContentDesignBenchmark(goldValue: unknown, predictionValue: unknown): ContentDesignEvaluationReport {
  const gold = validateGoldSet(goldValue);
  const predictions = validatePredictionSet(predictionValue, gold.packet_ref.packet_digest, gold.records);
  const predictionMap = new Map(predictions.predictions.map((prediction) => [prediction.work_unit_id, prediction]));
  if (predictionMap.size !== gold.records.length) incomplete("prediction_coverage");
  const joined = gold.records.map((unit) => {
    const prediction = predictionMap.get(unit.work_unit_id);
    if (prediction === undefined) incomplete(`prediction:${unit.work_unit_id}`);
    return { unit, gold: unit.human_gold, prediction };
  });
  const slice = (field: (unit: JoinedRecord["unit"]) => string): Record<string, ContentDesignMetrics> => Object.fromEntries(
    [...new Set(joined.map(({ unit }) => field(unit)))].sort().map((key) => [key, metrics(joined.filter(({ unit }) => field(unit) === key))]),
  );
  const preimage = {
    contract_version: "contentmd.content-design-evaluation-report/0.5.0" as const,
    gold_set_digest: gold.gold_set_digest,
    packet_digest: predictions.packet_digest,
    prediction_set_digest: predictions.prediction_set_digest,
    overall: metrics(joined),
    by_ability: slice((unit) => unit.ability.id),
    by_risk: slice((unit) => unit.context.risk),
    by_surface: slice((unit) => unit.context.surface),
    by_locale: slice((unit) => unit.context.target_locale),
    by_voice: slice((unit) => unit.context.voice_profile),
    by_tone: slice((unit) => unit.context.situational_tone),
    by_quality_dimension: Object.fromEntries([...new Set(joined.flatMap(({ unit }) => unit.rubric.quality_dimensions))].sort().map((dimension) => [dimension, qualityDimensionMetrics(joined, dimension)])),
    by_hard_dimension: Object.fromEntries([...new Set(joined.flatMap(({ unit }) => unit.rubric.hard_dimensions))].sort().map((dimension) => [dimension, hardDimensionMetrics(joined, dimension)])),
    disposition_confusion: dispositionConfusion(joined),
    release_threshold_diagnostics: releaseDiagnostics(joined),
    authority_effect: "none" as const,
  };
  return { ...preimage, report_digest: digest(preimage) };
}

export function compareContentDesignGoldSets(leftValue: unknown, rightValue: unknown): ContentDesignCalibrationReport {
  const left = validateGoldSet(leftValue);
  const right = validateGoldSet(rightValue);
  if (left.packet_ref.packet_digest !== right.packet_ref.packet_digest
    || left.packet_ref.sample_count !== right.packet_ref.sample_count) incomplete("calibration_packet_binding");
  if (left.reviewer.reviewer_id === right.reviewer.reviewer_id) incomplete("calibration_reviewer_independence");
  const rightRecords = new Map(right.records.map((record) => [record.work_unit_id, record]));
  if (rightRecords.size !== left.records.length) incomplete("calibration_coverage");
  let dispositionMatches = 0;
  let hardMatches = 0;
  let hardCount = 0;
  let qualityDistance = 0;
  let qualityCount = 0;
  const hardByDimension = new Map<string, { count: number; matches: number; disagreements: number }>();
  const qualityByDimension = new Map<string, { comparable: number; distance: number; disagreements: number }>();
  const disagreements: ContentDesignCalibrationReport["disagreements"] = [];
  for (const leftRecord of left.records) {
    const rightRecord = rightRecords.get(leftRecord.work_unit_id);
    if (rightRecord === undefined) incomplete("calibration_coverage");
    for (const field of ["scenario_ref", "ability", "context", "candidate", "rubric"] as const) {
      if (JSON.stringify(leftRecord[field]) !== JSON.stringify(rightRecord[field])) {
        incomplete(`calibration_record_binding:${leftRecord.work_unit_id}`);
      }
    }
    const leftGold = leftRecord.human_gold;
    const rightGold = rightRecord.human_gold;
    if (leftGold.disposition === rightGold.disposition) dispositionMatches += 1;
    const hardDimensionDisagreements = leftRecord.rubric.hard_dimensions.filter((dimension) => {
      hardCount += 1;
      const dimensionMetrics = hardByDimension.get(dimension) ?? { count: 0, matches: 0, disagreements: 0 };
      dimensionMetrics.count += 1;
      if (leftGold.hard_dimension_results[dimension] === rightGold.hard_dimension_results[dimension]) {
        hardMatches += 1;
        dimensionMetrics.matches += 1;
        hardByDimension.set(dimension, dimensionMetrics);
        return false;
      }
      dimensionMetrics.disagreements += 1;
      hardByDimension.set(dimension, dimensionMetrics);
      return true;
    });
    const qualityDimensionDisagreements = leftRecord.rubric.quality_dimensions.flatMap((dimension) => {
      const leftScore = leftGold.quality_dimension_scores[dimension] ?? null;
      const rightScore = rightGold.quality_dimension_scores[dimension] ?? null;
      const dimensionMetrics = qualityByDimension.get(dimension) ?? { comparable: 0, distance: 0, disagreements: 0 };
      if (typeof leftScore === "number" && typeof rightScore === "number") {
        const distance = Math.abs(leftScore - rightScore);
        qualityDistance += distance;
        qualityCount += 1;
        dimensionMetrics.comparable += 1;
        dimensionMetrics.distance += distance;
      }
      if (leftScore !== rightScore) dimensionMetrics.disagreements += 1;
      qualityByDimension.set(dimension, dimensionMetrics);
      return leftScore === rightScore ? [] : [{ dimension, left: leftScore, right: rightScore }];
    });
    if (leftGold.disposition !== rightGold.disposition
      || hardDimensionDisagreements.length > 0 || qualityDimensionDisagreements.length > 0) {
      disagreements.push({
        work_unit_id: leftRecord.work_unit_id,
        ability_id: leftRecord.ability.id,
        left_disposition: leftGold.disposition,
        right_disposition: rightGold.disposition,
        hard_dimension_disagreements: hardDimensionDisagreements,
        quality_dimension_disagreements: qualityDimensionDisagreements,
      });
    }
  }
  const byAbility = Object.fromEntries([...new Set(left.records.map((record) => record.ability.id))].sort().map((ability) => {
    const records = left.records.filter((record) => record.ability.id === ability);
    const rightById = new Map(right.records.map((record) => [record.work_unit_id, record]));
    const matches = records.filter((record) => record.human_gold.disposition === rightById.get(record.work_unit_id)?.human_gold.disposition).length;
    return [ability, {
      count: records.length,
      disposition_exact_agreement: matches / records.length,
      disagreement_count: disagreements.filter((item) => item.ability_id === ability).length,
    }];
  }));
  const preimage = {
    contract_version: "contentmd.content-design-calibration-report/0.2.0" as const,
    packet_digest: left.packet_ref.packet_digest,
    left_gold_set_digest: left.gold_set_digest,
    right_gold_set_digest: right.gold_set_digest,
    reviewer_refs: [left.reviewer.reviewer_id, right.reviewer.reviewer_id] as [string, string],
    record_count: left.records.length,
    disposition_exact_agreement: dispositionMatches / left.records.length,
    hard_dimension_exact_agreement: hardMatches / hardCount,
    quality_score_mean_absolute_difference: qualityCount === 0 ? null : qualityDistance / qualityCount,
    by_ability: byAbility,
    by_hard_dimension: Object.fromEntries([...hardByDimension].sort(([leftDimension], [rightDimension]) => leftDimension.localeCompare(rightDimension)).map(([dimension, values]) => [dimension, {
      comparison_count: values.count,
      exact_agreement: ratio(values.matches, values.count),
      disagreement_count: values.disagreements,
    }])),
    by_quality_dimension: Object.fromEntries([...qualityByDimension].sort(([leftDimension], [rightDimension]) => leftDimension.localeCompare(rightDimension)).map(([dimension, values]) => [dimension, {
      comparable_score_count: values.comparable,
      mean_absolute_difference: values.comparable === 0 ? null : values.distance / values.comparable,
      disagreement_count: values.disagreements,
    }])),
    disagreement_count: disagreements.length,
    disagreements,
    calibration_status: disagreements.length === 0
      ? "agreement_measured_no_disagreement" as const
      : "agreement_measured_adjudication_required" as const,
    adjudication_required: disagreements.length > 0,
    benchmark_claim_eligibility: false as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, report_digest: digest(preimage) };
}

export async function predictLocalContentDesignBenchmark(inputPath: string, outputPath?: string): Promise<ContentDesignPredictionSet> {
  const packet = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const result = predictContentDesignBenchmark(packet);
  if (outputPath !== undefined) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function writeBuiltinContentDesignReviewPacket(outputPath: string): Promise<BlindReviewPacket> {
  const serialized = typeof CONTENTMD_BUILTIN_REVIEW_PACKET === "string"
    ? CONTENTMD_BUILTIN_REVIEW_PACKET
    : await readFile(join(process.cwd(), "docs/tests/fixtures/content-design-scenarios/review-sample-100.json"), "utf8");
  const packet = validatePacket(JSON.parse(serialized) as unknown);
  await writeFile(outputPath, `${JSON.stringify(packet, null, 2)}\n`, { flag: "wx" });
  return packet;
}

export async function createLocalContentDesignReviewSubmissionTemplate(inputPath: string, outputPath: string): Promise<ContentDesignReviewSubmissionTemplate> {
  const packet = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const result = createContentDesignReviewSubmissionTemplate(packet);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function createLocalContentDesignReviewerQualificationRequest(inputPath: string, reviewerId: string, outputPath: string): Promise<ContentDesignReviewerQualificationRequest> {
  const packet = JSON.parse(await readFile(inputPath, "utf8")) as unknown;
  const result = createContentDesignReviewerQualificationRequest(packet, reviewerId);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function qualifyLocalContentDesignReview(packetPath: string, submissionPath: string, outputPath: string): Promise<QualifiedContentDesignGoldSet> {
  const [packet, submission] = await Promise.all([
    readFile(packetPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(submissionPath, "utf8").then((value) => JSON.parse(value) as unknown),
  ]);
  const result = qualifyContentDesignReview(packet, submission);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function scoreLocalContentDesignBenchmark(packetPath: string, goldPath: string, predictionsPath: string, outputPath: string): Promise<ContentDesignEvaluationReport> {
  const [packetValue, goldValue, predictions] = await Promise.all([
    readFile(packetPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(goldPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(predictionsPath, "utf8").then((value) => JSON.parse(value) as unknown),
  ]);
  const packet = validatePacket(packetValue);
  const gold = validateGoldSet(goldValue);
  verifyGoldPacketBinding(gold, packet);
  const result = scoreContentDesignBenchmark(gold, predictions);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function compareLocalContentDesignGoldSets(packetPath: string, leftPath: string, rightPath: string, outputPath: string): Promise<ContentDesignCalibrationReport> {
  const [packetValue, leftValue, rightValue] = await Promise.all([
    readFile(packetPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(leftPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(rightPath, "utf8").then((value) => JSON.parse(value) as unknown),
  ]);
  const packet = validatePacket(packetValue);
  const left = validateGoldSet(leftValue);
  const right = validateGoldSet(rightValue);
  verifyGoldPacketBinding(left, packet);
  verifyGoldPacketBinding(right, packet);
  const result = compareContentDesignGoldSets(left, right);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}
