#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { validateReviewSample } from "./prepare-content-design-review-sample.mjs";

const DISPOSITIONS = ["pass", "revise", "abstain", "escalate", "human_preference_review"];
const HARD_RESULTS = ["pass", "fail", "unknown", "not_applicable"];

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function invalid(reason) {
  throw new Error(`content_design_review_submission_invalid:${reason}`);
}

export function createReviewSubmissionTemplate(packet) {
  validateReviewSample(packet);
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

function validateResponse(unit, response) {
  if (response.work_unit_id !== unit.work_unit_id || !DISPOSITIONS.includes(response.disposition)) invalid(`response:${unit.work_unit_id}:disposition`);
  if (response.hard_dimension_results === null || typeof response.hard_dimension_results !== "object") invalid(`response:${unit.work_unit_id}:hard_dimensions`);
  for (const dimension of unit.rubric.hard_dimensions) {
    if (!HARD_RESULTS.includes(response.hard_dimension_results[dimension])) invalid(`response:${unit.work_unit_id}:hard:${dimension}`);
  }
  if (response.quality_dimension_scores === null || typeof response.quality_dimension_scores !== "object") invalid(`response:${unit.work_unit_id}:quality_dimensions`);
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

export function qualifyReviewSubmission(packet, submission) {
  validateReviewSample(packet);
  if (submission.contract_version !== "contentmd.content-design-review-submission/0.1.0"
    || submission.packet_ref?.packet_digest !== packet.packet_digest
    || submission.packet_ref?.sample_count !== packet.sample_count
    || submission.submission_state !== "complete"
    || submission.authority_effect !== "none"
    || submission.reviewer?.reviewer_role !== "qualified_content_designer"
    || typeof submission.reviewer?.reviewer_id !== "string" || submission.reviewer.reviewer_id.trim().length === 0
    || typeof submission.reviewer?.reviewed_at !== "string" || !Number.isFinite(Date.parse(submission.reviewer.reviewed_at))
    || submission.reviewer?.independent_review_attested !== true
    || !Array.isArray(submission.responses) || submission.responses.length !== packet.sample_count) {
    invalid("envelope");
  }
  const responses = new Map(submission.responses.map((response) => [response.work_unit_id, response]));
  if (responses.size !== packet.sample_count) invalid("duplicate_or_missing_response");
  const qualified = packet.review_work_units.map((unit) => {
    const response = responses.get(unit.work_unit_id);
    if (response === undefined) invalid(`missing:${unit.work_unit_id}`);
    validateResponse(unit, response);
    return {
      ...unit,
      human_gold: response,
      review_state: "qualified",
      benchmark_eligibility: true,
      retrieval_eligibility: "never",
      training_eligibility: "never",
    };
  });
  const preimage = {
    contract_version: "contentmd.content-design-qualified-gold-set/0.1.0",
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
  const qualityPairs = records.flatMap(({ unit, gold, prediction }) => unit.rubric.quality_dimensions.map((dimension) => [gold.quality_dimension_scores[dimension], prediction.quality_dimension_scores?.[dimension]]))
    .filter(([goldValue, predictedValue]) => typeof goldValue === "number" && typeof predictedValue === "number");
  return {
    count: records.length,
    disposition_exact_agreement: records.length === 0 ? null : dispositionCorrect / records.length,
    hard_dimension_accuracy: hardComparable.length === 0 ? null : hardCorrect / hardComparable.length,
    quality_score_mean_absolute_error: qualityPairs.length === 0 ? null : qualityPairs.reduce((sum, [goldValue, predictedValue]) => sum + Math.abs(goldValue - predictedValue), 0) / qualityPairs.length,
  };
}

export function scoreContentDesignPredictions(goldSet, predictions) {
  if (goldSet.contract_version !== "contentmd.content-design-qualified-gold-set/0.1.0"
    || predictions.contract_version !== "contentmd.content-design-predictions/0.1.0"
    || predictions.gold_set_digest !== goldSet.gold_set_digest
    || predictions.authority_effect !== "none"
    || !Array.isArray(predictions.predictions)) invalid("predictions_envelope");
  const predictionMap = new Map(predictions.predictions.map((prediction) => [prediction.work_unit_id, prediction]));
  if (predictionMap.size !== goldSet.records.length) invalid("predictions_coverage");
  const joined = goldSet.records.map((unit) => {
    const prediction = predictionMap.get(unit.work_unit_id);
    if (prediction === undefined || !DISPOSITIONS.includes(prediction.disposition)) invalid(`prediction:${unit.work_unit_id}`);
    return { unit, gold: unit.human_gold, prediction };
  });
  const slice = (field) => Object.fromEntries([...new Set(joined.map(({ unit }) => field(unit)))].sort().map((key) => [key, metric(joined.filter(({ unit }) => field(unit) === key))]));
  const preimage = {
    contract_version: "contentmd.content-design-evaluation-report/0.1.0",
    gold_set_digest: goldSet.gold_set_digest,
    prediction_set_digest: digest(predictions),
    overall: metric(joined),
    by_ability: slice((unit) => unit.ability.id),
    by_risk: slice((unit) => unit.context.risk),
    by_surface: slice((unit) => unit.context.surface),
    by_locale: slice((unit) => unit.context.target_locale),
    by_voice: slice((unit) => unit.candidate.voice),
    by_tone: slice((unit) => unit.candidate.tone),
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
