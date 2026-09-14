import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

declare const CONTENTMD_BUILTIN_REVIEW_PACKET: string | undefined;

type HardResult = "pass" | "fail" | "unknown" | "not_applicable";
type Disposition = "pass" | "revise" | "abstain" | "escalate" | "human_preference_review";

interface ReviewWorkUnit {
  work_unit_id: string;
  ability: { id: string; objective: string };
  context: {
    state: string;
    state_expression: string;
    consequence_expression: string;
    situation: string;
    surface: string;
    risk: string;
    source_locale: string;
    target_locale: string;
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
    localization_status: string;
  };
  rubric: {
    hard_dimensions: string[];
    quality_dimensions: string[];
  };
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
  contract_version: string;
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: {
    reviewer_id: string;
    reviewer_role: string;
    reviewed_at: string;
    independent_review_attested: boolean;
  };
  responses: CompletedReviewResponse[];
  submission_state: string;
  authority_effect: string;
}

export interface QualifiedContentDesignGoldSet {
  contract_version: "contentmd.content-design-qualified-gold-set/0.1.0";
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
  contract_version: "contentmd.content-design-evaluation-report/0.2.0";
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
  disposition_confusion: Record<Disposition, Record<Disposition, number>>;
  release_threshold_diagnostics: ReleaseThresholdDiagnostics;
  authority_effect: "none";
  report_digest: string;
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
  quality_score_mean_absolute_error: number | null;
}

export interface BlindReviewPacket {
  contract_version: string;
  packet_digest: string;
  sample_count: number;
  review_work_units: ReviewWorkUnit[];
  authority_effect: string;
}

interface ContentDesignPrediction {
  work_unit_id: string;
  disposition: Disposition;
  hard_dimension_results: Record<string, HardResult>;
  quality_dimension_scores: Record<string, number | null>;
  rationale_codes: string[];
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0";
  authority_effect: "none";
}

export interface ContentDesignPredictionSet {
  contract_version: "contentmd.content-design-predictions/0.1.0";
  packet_digest: string;
  evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0";
  prediction_count: number;
  predictions: ContentDesignPrediction[];
  evaluation_status: "unscored_pending_qualified_gold";
  label_access: "blind_packet_only";
  authority_effect: "none";
  prediction_set_digest: string;
}

export interface ContentDesignReviewSubmissionTemplate {
  contract_version: "contentmd.content-design-review-submission/0.1.0";
  packet_ref: { packet_digest: string; sample_count: number };
  reviewer: {
    reviewer_id: null;
    reviewer_role: "qualified_content_designer";
    reviewed_at: null;
    independent_review_attested: false;
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

function validatePacket(value: unknown): BlindReviewPacket {
  if (value === null || typeof value !== "object") throw new TypeError("content_design_benchmark_invalid:packet");
  const packet = value as BlindReviewPacket;
  if (packet.contract_version !== "contentmd.content-design-blind-review-packet/0.2.0"
    || packet.authority_effect !== "none"
    || !Number.isSafeInteger(packet.sample_count) || packet.sample_count < 1
    || !Array.isArray(packet.review_work_units) || packet.review_work_units.length !== packet.sample_count) {
    throw new TypeError("content_design_benchmark_invalid:packet");
  }
  const { packet_digest: packetDigest, ...preimage } = packet;
  if (packetDigest !== digest(preimage)) throw new TypeError("content_design_benchmark_invalid:packet_digest");
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
  const recovery: HardResult = unit.context.situation !== "payment_unknown"
    ? "not_applicable"
    : /\b(?:check|verify)\b.*\b(?:payment|status|order)\b/iu.test(combinedText) ? "pass" : "fail";
  const hard: Record<string, HardResult> = {
    factual_accuracy: materialEvidenceMissing ? "unknown" : falseCertainty ? "fail" : "pass",
    state_accuracy: falseCertainty || vague || !stateRepresented ? "fail" : "pass",
    semantic_fidelity: vague || !stateRepresented || !consequenceRepresented ? "fail" : "pass",
    agency: pressure ? "fail" : "pass",
    recovery,
    authority_boundary: /\b(?:approved|authorized|guaranteed)\b/iu.test(text) ? "unknown" : "pass",
  };
  const hardFailure = Object.values(hard).includes("fail");
  const allHardResolved = Object.values(hard).every((result) => result === "pass" || result === "not_applicable");
  const disposition: Disposition = materialEvidenceMissing
    ? "abstain"
    : hardFailure || blame || pressure
    ? "revise"
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
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0",
    authority_effect: "none",
  };
}

export function predictContentDesignBenchmark(packetValue: unknown): ContentDesignPredictionSet {
  const packet = validatePacket(packetValue);
  const predictions = packet.review_work_units.map(predict);
  const preimage = {
    contract_version: "contentmd.content-design-predictions/0.1.0" as const,
    packet_digest: packet.packet_digest,
    evaluator_version: "contentmd.deterministic-content-design-baseline/0.2.0" as const,
    prediction_count: predictions.length,
    predictions,
    evaluation_status: "unscored_pending_qualified_gold" as const,
    label_access: "blind_packet_only" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, prediction_set_digest: digest(preimage) };
}

export function createContentDesignReviewSubmissionTemplate(packetValue: unknown): ContentDesignReviewSubmissionTemplate {
  const packet = validatePacket(packetValue);
  return {
    contract_version: "contentmd.content-design-review-submission/0.1.0",
    packet_ref: { packet_digest: packet.packet_digest, sample_count: packet.sample_count },
    reviewer: {
      reviewer_id: null,
      reviewer_role: "qualified_content_designer",
      reviewed_at: null,
      independent_review_attested: false,
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

const DISPOSITIONS: readonly Disposition[] = ["pass", "revise", "abstain", "escalate", "human_preference_review"];
const HARD_RESULTS: readonly HardResult[] = ["pass", "fail", "unknown", "not_applicable"];

function incomplete(reason: string): never {
  throw new Error(`qualification_review_incomplete:content_design:${reason}`);
}

function validateCompletedResponse(unit: ReviewWorkUnit, response: CompletedReviewResponse): void {
  if (response.work_unit_id !== unit.work_unit_id || !DISPOSITIONS.includes(response.disposition)) incomplete(`${unit.work_unit_id}:disposition`);
  if (response.hard_dimension_results === null || typeof response.hard_dimension_results !== "object") incomplete(`${unit.work_unit_id}:hard_dimensions`);
  for (const dimension of unit.rubric.hard_dimensions) {
    if (!HARD_RESULTS.includes(response.hard_dimension_results[dimension]!)) incomplete(`${unit.work_unit_id}:hard:${dimension}`);
  }
  if (response.quality_dimension_scores === null || typeof response.quality_dimension_scores !== "object") incomplete(`${unit.work_unit_id}:quality_dimensions`);
  for (const dimension of unit.rubric.quality_dimensions) {
    const score = response.quality_dimension_scores[dimension];
    if (score === undefined || score !== null && (!Number.isInteger(score) || score < 1 || score > 5)) incomplete(`${unit.work_unit_id}:quality:${dimension}`);
  }
  if (typeof response.rationale !== "string" || response.rationale.trim().length < 20) incomplete(`${unit.work_unit_id}:rationale`);
  if (!Array.isArray(response.acceptable_meaning_invariants) || response.acceptable_meaning_invariants.length === 0
    || response.acceptable_meaning_invariants.some((value) => typeof value !== "string" || value.trim().length === 0)) incomplete(`${unit.work_unit_id}:invariants`);
  if (response.disposition === "revise" && (typeof response.recommended_revision !== "string" || response.recommended_revision.trim().length === 0)) incomplete(`${unit.work_unit_id}:recommended_revision`);
  if (!Array.isArray(response.review_evidence_refs) || response.review_evidence_refs.length === 0
    || response.review_evidence_refs.some((value) => typeof value !== "string" || value.trim().length === 0)) incomplete(`${unit.work_unit_id}:evidence_refs`);
}

export function qualifyContentDesignReview(packetValue: unknown, submissionValue: unknown): QualifiedContentDesignGoldSet {
  const packet = validatePacket(packetValue);
  if (submissionValue === null || typeof submissionValue !== "object") incomplete("submission");
  const submission = submissionValue as ContentDesignReviewSubmission;
  if (submission.contract_version !== "contentmd.content-design-review-submission/0.1.0"
    || submission.packet_ref?.packet_digest !== packet.packet_digest
    || submission.packet_ref?.sample_count !== packet.sample_count
    || submission.submission_state !== "complete"
    || submission.authority_effect !== "none"
    || submission.reviewer?.reviewer_role !== "qualified_content_designer"
    || typeof submission.reviewer?.reviewer_id !== "string" || submission.reviewer.reviewer_id.trim().length === 0
    || typeof submission.reviewer?.reviewed_at !== "string" || !Number.isFinite(Date.parse(submission.reviewer.reviewed_at))
    || submission.reviewer?.independent_review_attested !== true
    || !Array.isArray(submission.responses) || submission.responses.length !== packet.sample_count) incomplete("envelope");
  const responses = new Map(submission.responses.map((response) => [response.work_unit_id, response]));
  if (responses.size !== packet.sample_count) incomplete("duplicate_or_missing_response");
  const records = packet.review_work_units.map((unit) => {
    const response = responses.get(unit.work_unit_id);
    if (response === undefined) incomplete(`missing:${unit.work_unit_id}`);
    validateCompletedResponse(unit, response);
    return {
      ...unit,
      human_gold: response,
      review_state: "qualified" as const,
      benchmark_eligibility: true as const,
      retrieval_eligibility: "never" as const,
      training_eligibility: "never" as const,
    };
  });
  const preimage = {
    contract_version: "contentmd.content-design-qualified-gold-set/0.1.0" as const,
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
  const qualityPairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.quality_dimensions.map((dimension) => [gold.quality_dimension_scores[dimension], prediction.quality_dimension_scores[dimension]] as const))
    .filter((pair): pair is readonly [number, number] => typeof pair[0] === "number" && typeof pair[1] === "number");
  return {
    count: records.length,
    disposition_exact_agreement: records.length === 0 ? null : dispositionCorrect / records.length,
    hard_dimension_accuracy: hardComparable.length === 0 ? null : hardComparable.filter(([goldValue, predictedValue]) => goldValue === predictedValue).length / hardComparable.length,
    quality_score_mean_absolute_error: qualityPairs.length === 0 ? null : qualityPairs.reduce((sum, [goldValue, predictedValue]) => sum + Math.abs(goldValue - predictedValue), 0) / qualityPairs.length,
  };
}

function ratio(numerator: number, denominator: number): number | null {
  return denominator === 0 ? null : numerator / denominator;
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
  const gold = goldValue as QualifiedContentDesignGoldSet;
  const predictions = predictionValue as ContentDesignPredictionSet;
  if (gold?.contract_version !== "contentmd.content-design-qualified-gold-set/0.1.0"
    || predictions?.contract_version !== "contentmd.content-design-predictions/0.1.0"
    || predictions.packet_digest !== gold.packet_ref?.packet_digest
    || predictions.evaluation_status !== "unscored_pending_qualified_gold"
    || predictions.authority_effect !== "none"
    || !Array.isArray(gold.records) || !Array.isArray(predictions.predictions)) incomplete("score_envelope");
  const { gold_set_digest: goldDigest, ...goldPreimage } = gold;
  if (goldDigest !== digest(goldPreimage)) incomplete("gold_digest");
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
    contract_version: "contentmd.content-design-evaluation-report/0.2.0" as const,
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
    disposition_confusion: dispositionConfusion(joined),
    release_threshold_diagnostics: releaseDiagnostics(joined),
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

export async function qualifyLocalContentDesignReview(packetPath: string, submissionPath: string, outputPath: string): Promise<QualifiedContentDesignGoldSet> {
  const [packet, submission] = await Promise.all([
    readFile(packetPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(submissionPath, "utf8").then((value) => JSON.parse(value) as unknown),
  ]);
  const result = qualifyContentDesignReview(packet, submission);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}

export async function scoreLocalContentDesignBenchmark(goldPath: string, predictionsPath: string, outputPath: string): Promise<ContentDesignEvaluationReport> {
  const [gold, predictions] = await Promise.all([
    readFile(goldPath, "utf8").then((value) => JSON.parse(value) as unknown),
    readFile(predictionsPath, "utf8").then((value) => JSON.parse(value) as unknown),
  ]);
  const result = scoreContentDesignBenchmark(gold, predictions);
  await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, { flag: "wx" });
  return result;
}
