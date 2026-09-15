#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validateReviewSample } from "./prepare-content-design-review-sample.mjs";
import { verifyReviewerQualification } from "../packages/governance/dist/index.js";

const DISPOSITIONS = ["pass", "revise", "abstain", "escalate", "human_preference_review"];
const HARD_RESULTS = ["pass", "fail", "unknown", "not_applicable"];

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function invalid(reason) {
  throw new Error(`content_design_review_submission_invalid:${reason}`);
}

function isRfc3339(value) {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)
    && Number.isFinite(Date.parse(value));
}

function sameKeys(value, expected) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort());
}

function nonempty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function stringArray(value) {
  return Array.isArray(value) && value.length > 0 && new Set(value).size === value.length && value.every(nonempty);
}

function validatePredictionSet(predictions, packetDigest, units) {
  if (predictions === null || typeof predictions !== "object"
    || predictions.contract_version !== "contentmd.content-design-predictions/0.1.0"
    || predictions.packet_digest !== packetDigest
    || predictions.evaluator_version !== "contentmd.deterministic-content-design-baseline/0.2.0"
    || predictions.evaluation_status !== "unscored_pending_qualified_gold"
    || predictions.label_access !== "blind_packet_only"
    || predictions.authority_effect !== "none"
    || !Number.isSafeInteger(predictions.prediction_count)
    || predictions.prediction_count !== units.length
    || !Array.isArray(predictions.predictions)
    || predictions.predictions.length !== units.length) invalid("predictions_envelope");
  const { prediction_set_digest: predictionDigest, ...preimage } = predictions;
  if (predictionDigest !== digest(preimage)) invalid("predictions_digest");
  const unitMap = new Map(units.map((unit) => [unit.work_unit_id, unit]));
  const ids = new Set();
  for (const prediction of predictions.predictions) {
    const unit = prediction !== null && typeof prediction === "object" ? unitMap.get(prediction.work_unit_id) : undefined;
    if (unit === undefined || ids.has(prediction.work_unit_id)) invalid("predictions_coverage");
    ids.add(prediction.work_unit_id);
    if (!DISPOSITIONS.includes(prediction.disposition)
      || prediction.evaluator_version !== predictions.evaluator_version
      || prediction.authority_effect !== "none"
      || !sameKeys(prediction.hard_dimension_results, unit.rubric.hard_dimensions)
      || Object.values(prediction.hard_dimension_results).some((result) => !HARD_RESULTS.includes(result))
      || !sameKeys(prediction.quality_dimension_scores, unit.rubric.quality_dimensions)
      || Object.values(prediction.quality_dimension_scores).some((score) => score !== null && (!Number.isInteger(score) || score < 1 || score > 5))
      || !Array.isArray(prediction.rationale_codes) || prediction.rationale_codes.length === 0
      || prediction.rationale_codes.some((code) => typeof code !== "string" || code.trim().length === 0)) invalid(`prediction_shape:${prediction.work_unit_id}`);
    if (prediction.disposition === "pass"
      && Object.values(prediction.hard_dimension_results).some((result) => result !== "pass" && result !== "not_applicable")) {
      invalid(`prediction_pass_unresolved:${prediction.work_unit_id}`);
    }
  }
  return predictions;
}

export function createReviewSubmissionTemplate(packet) {
  validateReviewSample(packet);
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

function verifyBenchmarkReviewer(reviewer, packetDigest) {
  let qualification;
  try {
    qualification = verifyReviewerQualification({
      ...reviewer.qualification_bundle,
      as_of: reviewer.reviewed_at,
      verification_mode: "official",
    });
  } catch {
    invalid("reviewer_qualification");
  }
  const packetScope = `content-design-benchmark-packet:${packetDigest}`;
  if (qualification.reviewer_ref.object_id !== reviewer.reviewer_id
    || !qualification.eligible_roles.includes("qualified_content_designer")
    || !qualification.qualified_objectives.includes("content_design_benchmark_review")
    || !qualification.authorized_resource_scopes.includes("content-design-benchmark")
    || !qualification.authorized_resource_scopes.includes(packetScope)) {
    invalid("reviewer_qualification_scope");
  }
}

function validateResponse(unit, response) {
  if (response === null || typeof response !== "object" || Array.isArray(response)) invalid(`response:${unit.work_unit_id}:shape`);
  if (response.work_unit_id !== unit.work_unit_id || !DISPOSITIONS.includes(response.disposition)) invalid(`response:${unit.work_unit_id}:disposition`);
  if (!sameKeys(response.hard_dimension_results, unit.rubric.hard_dimensions)) invalid(`response:${unit.work_unit_id}:hard_dimensions`);
  for (const dimension of unit.rubric.hard_dimensions) {
    if (!HARD_RESULTS.includes(response.hard_dimension_results[dimension])) invalid(`response:${unit.work_unit_id}:hard:${dimension}`);
  }
  if (!sameKeys(response.quality_dimension_scores, unit.rubric.quality_dimensions)) invalid(`response:${unit.work_unit_id}:quality_dimensions`);
  for (const dimension of unit.rubric.quality_dimensions) {
    const score = response.quality_dimension_scores[dimension];
    if (score !== null && (!Number.isInteger(score) || score < 1 || score > 5)) invalid(`response:${unit.work_unit_id}:quality:${dimension}`);
  }
  if (typeof response.rationale !== "string" || response.rationale.trim().length < 20) invalid(`response:${unit.work_unit_id}:rationale`);
  if (!Array.isArray(response.acceptable_meaning_invariants) || response.acceptable_meaning_invariants.length === 0
    || response.acceptable_meaning_invariants.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    invalid(`response:${unit.work_unit_id}:invariants`);
  }
  if (response.disposition === "revise" && (typeof response.recommended_revision !== "string" || response.recommended_revision.trim().length === 0)) {
    invalid(`response:${unit.work_unit_id}:recommended_revision`);
  }
  if (response.recommended_revision !== null && typeof response.recommended_revision !== "string") invalid(`response:${unit.work_unit_id}:recommended_revision_type`);
  if (!Array.isArray(response.review_evidence_refs) || response.review_evidence_refs.length === 0
    || response.review_evidence_refs.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    invalid(`response:${unit.work_unit_id}:evidence_refs`);
  }
}

function validateQualifiedRecord(unit) {
  if (unit === null || typeof unit !== "object" || Array.isArray(unit)
    || typeof unit.work_unit_id !== "string" || unit.work_unit_id.trim().length === 0
    || unit.review_state !== "qualified" || unit.benchmark_eligibility !== true
    || unit.retrieval_eligibility !== "never" || unit.training_eligibility !== "never"
    || unit.authority_effect !== "none"
    || unit.scenario_ref === null || typeof unit.scenario_ref !== "object"
    || typeof unit.scenario_ref.scenario_id !== "string" || unit.scenario_ref.scenario_id.trim().length === 0
    || typeof unit.scenario_ref.scenario_digest !== "string" || unit.scenario_ref.scenario_digest.trim().length === 0
    || unit.ability === null || typeof unit.ability !== "object"
    || typeof unit.ability.id !== "string" || unit.ability.id.trim().length === 0
    || typeof unit.ability.objective !== "string" || unit.ability.objective.trim().length === 0
    || unit.context === null || typeof unit.context !== "object"
    || !["state", "state_expression", "action_expression", "consequence_expression", "situation", "surface", "surface_context", "channel", "risk", "user_goal", "source_locale", "target_locale", "voice_profile", "situational_tone"].every((key) => nonempty(unit.context[key]))
    || !["ltr", "rtl"].includes(unit.context.direction)
    || unit.context.evidence === null || typeof unit.context.evidence !== "object"
    || !["scenario_facts_available", "missing"].includes(unit.context.evidence.material_fact_status)
    || (unit.context.evidence.material_fact_status === "missing" ? !nonempty(unit.context.evidence.unresolved_question) : unit.context.evidence.unresolved_question !== null)
    || unit.candidate === null || typeof unit.candidate !== "object"
    || !nonempty(unit.candidate.text)
    || (unit.candidate.supporting_text !== null && typeof unit.candidate.supporting_text !== "string")
    || !nonempty(unit.candidate.language) || !nonempty(unit.candidate.localization_status)
    || ["variant", "voice", "tone", "injected_defect"].some((key) => Object.hasOwn(unit.candidate, key))
    || Object.hasOwn(unit, "evaluation_control") || Object.hasOwn(unit, "provisional_expectation")
    || unit.rubric === null || typeof unit.rubric !== "object"
    || !stringArray(unit.rubric.evaluation_order)
    || !stringArray(unit.rubric.hard_dimensions)
    || !stringArray(unit.rubric.quality_dimensions)
    || unit.reviewer_response === null || typeof unit.reviewer_response !== "object" || Array.isArray(unit.reviewer_response)
    || Object.values(unit.reviewer_response).some((item) => item !== null)) invalid(`gold_record:${unit?.work_unit_id ?? "unknown"}`);
  validateResponse(unit, unit.human_gold);
}

function validateGoldSet(value) {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || value.contract_version !== "contentmd.content-design-qualified-gold-set/0.2.0"
    || value.packet_ref === null || typeof value.packet_ref !== "object"
    || typeof value.packet_ref.packet_digest !== "string" || value.packet_ref.packet_digest.trim().length === 0
    || !Number.isSafeInteger(value.packet_ref.sample_count) || value.packet_ref.sample_count < 1
    || value.reviewer === null || typeof value.reviewer !== "object"
    || !Array.isArray(value.records)) invalid("gold_envelope");
  const { gold_set_digest: goldDigest, ...preimage } = value;
  if (goldDigest !== digest(preimage)) invalid("gold_digest");
  if (value.reviewer.reviewer_role !== "qualified_content_designer"
    || typeof value.reviewer.reviewer_id !== "string" || value.reviewer.reviewer_id.trim().length === 0
    || !isRfc3339(value.reviewer.reviewed_at) || value.reviewer.independent_review_attested !== true
    || value.qualified_count !== value.records.length || value.packet_ref.sample_count !== value.records.length
    || value.benchmark_eligibility !== true || value.retrieval_eligibility !== "never"
    || value.training_eligibility !== "never" || value.authority_effect !== "none") invalid("gold_shape");
  verifyBenchmarkReviewer(value.reviewer, value.packet_ref.packet_digest);
  const ids = new Set();
  for (const unit of value.records) {
    if (ids.has(unit?.work_unit_id)) invalid("gold_coverage");
    ids.add(unit?.work_unit_id);
    validateQualifiedRecord(unit);
  }
  return value;
}

export function qualifyReviewSubmission(packet, submission) {
  validateReviewSample(packet);
  if (submission.contract_version !== "contentmd.content-design-review-submission/0.2.0"
    || submission.packet_ref?.packet_digest !== packet.packet_digest
    || submission.packet_ref?.sample_count !== packet.sample_count
    || submission.submission_state !== "complete"
    || submission.authority_effect !== "none"
    || submission.reviewer?.reviewer_role !== "qualified_content_designer"
    || typeof submission.reviewer?.reviewer_id !== "string" || submission.reviewer.reviewer_id.trim().length === 0
    || !isRfc3339(submission.reviewer?.reviewed_at)
    || submission.reviewer?.independent_review_attested !== true
    || !Array.isArray(submission.responses) || submission.responses.length !== packet.sample_count) {
    invalid("envelope");
  }
  verifyBenchmarkReviewer(submission.reviewer, packet.packet_digest);
  const responses = new Map(submission.responses.map((response) => [response.work_unit_id, response]));
  if (responses.size !== packet.sample_count) invalid("duplicate_or_missing_response");
  const qualified = packet.review_work_units.map((unit) => {
    const response = responses.get(unit.work_unit_id);
    if (response === undefined) invalid(`missing:${unit.work_unit_id}`);
    validateResponse(unit, response);
    return {
      ...structuredClone(unit),
      human_gold: structuredClone(response),
      review_state: "qualified",
      benchmark_eligibility: true,
      retrieval_eligibility: "never",
      training_eligibility: "never",
    };
  });
  const preimage = {
    contract_version: "contentmd.content-design-qualified-gold-set/0.2.0",
    packet_ref: submission.packet_ref,
    reviewer: submission.reviewer,
    qualified_count: qualified.length,
    records: qualified,
    benchmark_eligibility: true,
    retrieval_eligibility: "never",
    training_eligibility: "never",
    authority_effect: "none",
  };
  return { ...preimage, gold_set_digest: digest(preimage) };
}

function metric(records) {
  const dispositionCorrect = records.filter(({ gold, prediction }) => gold.disposition === prediction.disposition).length;
  const hardPairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.hard_dimensions.map((dimension) => [gold.hard_dimension_results[dimension], prediction.hard_dimension_results?.[dimension]]));
  const hardComparable = hardPairs.filter(([goldValue, predictedValue]) => goldValue !== "unknown" && predictedValue !== undefined);
  const hardCorrect = hardComparable.filter(([goldValue, predictedValue]) => goldValue === predictedValue).length;
  const qualityPairsAll = records.flatMap(({ unit, gold, prediction }) => unit.rubric.quality_dimensions.map((dimension) => [gold.quality_dimension_scores[dimension], prediction.quality_dimension_scores?.[dimension]]));
  const qualityGoldCount = qualityPairsAll.filter(([goldValue]) => typeof goldValue === "number").length;
  const qualityPredictionCount = qualityPairsAll.filter(([, predictedValue]) => typeof predictedValue === "number").length;
  const qualityPairs = qualityPairsAll.filter(([goldValue, predictedValue]) => typeof goldValue === "number" && typeof predictedValue === "number");
  return {
    count: records.length,
    disposition_exact_agreement: records.length === 0 ? null : dispositionCorrect / records.length,
    hard_dimension_accuracy: hardComparable.length === 0 ? null : hardCorrect / hardComparable.length,
    quality_gold_score_count: qualityGoldCount,
    quality_prediction_score_count: qualityPredictionCount,
    quality_comparable_score_count: qualityPairs.length,
    quality_prediction_coverage: ratio(qualityPairs.length, qualityGoldCount),
    quality_score_mean_absolute_error: qualityPairs.length === 0 ? null : qualityPairs.reduce((sum, [goldValue, predictedValue]) => sum + Math.abs(goldValue - predictedValue), 0) / qualityPairs.length,
  };
}

function ratio(numerator, denominator) {
  return denominator === 0 ? null : numerator / denominator;
}

function releaseDiagnostics(records) {
  const criticalSafety = records.filter(({ unit, gold }) => unit.context.risk === "critical"
    && (["revise", "abstain", "escalate"].includes(gold.disposition)
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

function dispositionConfusion(records) {
  return Object.fromEntries(DISPOSITIONS.map((goldDisposition) => [goldDisposition, Object.fromEntries(
    DISPOSITIONS.map((predictedDisposition) => [predictedDisposition, records.filter(({ gold, prediction }) =>
      gold.disposition === goldDisposition && prediction.disposition === predictedDisposition).length]),
  )]));
}

export function scoreContentDesignPredictions(goldSet, predictions) {
  goldSet = validateGoldSet(goldSet);
  predictions = validatePredictionSet(predictions, goldSet.packet_ref.packet_digest, goldSet.records);
  const predictionMap = new Map(predictions.predictions.map((prediction) => [prediction.work_unit_id, prediction]));
  if (predictionMap.size !== goldSet.records.length) invalid("predictions_coverage");
  const joined = goldSet.records.map((unit) => {
    const prediction = predictionMap.get(unit.work_unit_id);
    if (prediction === undefined || !DISPOSITIONS.includes(prediction.disposition)) invalid(`prediction:${unit.work_unit_id}`);
    return { unit, gold: unit.human_gold, prediction };
  });
  const slice = (field) => Object.fromEntries([...new Set(joined.map(({ unit }) => field(unit)))].sort().map((key) => [key, metric(joined.filter(({ unit }) => field(unit) === key))]));
  const preimage = {
    contract_version: "contentmd.content-design-evaluation-report/0.3.0",
    gold_set_digest: goldSet.gold_set_digest,
    packet_digest: predictions.packet_digest,
    prediction_set_digest: predictions.prediction_set_digest,
    overall: metric(joined),
    by_ability: slice((unit) => unit.ability.id),
    by_risk: slice((unit) => unit.context.risk),
    by_surface: slice((unit) => unit.context.surface),
    by_locale: slice((unit) => unit.context.target_locale),
    by_voice: slice((unit) => unit.context.voice_profile),
    by_tone: slice((unit) => unit.context.situational_tone),
    disposition_confusion: dispositionConfusion(joined),
    release_threshold_diagnostics: releaseDiagnostics(joined),
    authority_effect: "none",
  };
  return { ...preimage, report_digest: digest(preimage) };
}

async function main() {
  const packetPath = process.argv[process.argv.indexOf("--packet") + 1];
  const submissionPath = process.argv[process.argv.indexOf("--submission") + 1];
  const outputPath = process.argv[process.argv.indexOf("--out") + 1];
  if (packetPath === undefined || outputPath === undefined) invalid("arguments");
  const packet = JSON.parse(await readFile(packetPath, "utf8"));
  if (process.argv.includes("--template")) {
    const template = createReviewSubmissionTemplate(packet);
    await writeFile(outputPath, `${JSON.stringify(template, null, 2)}\n`);
    console.log(JSON.stringify({ output: outputPath, response_count: template.responses.length, submission_state: template.submission_state }, null, 2));
    return;
  }
  if (submissionPath === undefined) invalid("arguments");
  const submission = JSON.parse(await readFile(submissionPath, "utf8"));
  const goldSet = qualifyReviewSubmission(packet, submission);
  await writeFile(outputPath, `${JSON.stringify(goldSet, null, 2)}\n`);
  console.log(JSON.stringify({ output: outputPath, qualified_count: goldSet.qualified_count, gold_set_digest: goldSet.gold_set_digest }, null, 2));
}

if (process.argv[1] !== undefined && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) await main();
