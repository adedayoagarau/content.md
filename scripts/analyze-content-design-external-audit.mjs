#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";
import {
  prepareFullBenchmarkPacket,
  validateBlindPacket,
} from "./prepare-content-design-review-sample.mjs";

const DISPOSITIONS = new Set(["pass", "revise", "abstain", "escalate", "human_preference_review"]);
const HARD_DIMENSIONS = [
  "factual_accuracy",
  "state_accuracy",
  "semantic_fidelity",
  "agency",
  "recovery",
  "authority_boundary",
];
const HARD_RESULTS = new Set(["pass", "fail", "unknown", "not_applicable"]);
const QUALITY_DIMENSIONS = [
  "clarity",
  "specificity",
  "hierarchy",
  "accessibility_readiness",
  "locale_readiness",
  "voice_fit",
  "tone_fit",
  "economy",
];
const REVIEWERS = ["claude", "cursor"];
const ENGLISH_TARGET_LOCALES = ["en-US", "en-GB", "en-IN"];
const ENGLISH_EXCLUDED_ABILITIES = ["localization"];
const ENGLISH_EXCLUDED_QUALITY_DIMENSIONS = ["locale_readiness"];

function fail(reason) {
  throw new Error(`content_design_external_audit_invalid:${reason}`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function sortedCounts(values) {
  const result = {};
  for (const value of values) result[value] = (result[value] ?? 0) + 1;
  return Object.fromEntries(Object.entries(result).sort(([left], [right]) => left.localeCompare(right)));
}

function exactKeys(value, expected) {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return false;
  return JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort());
}

function roundedRatio(numerator, denominator) {
  return denominator === 0 ? null : Number((numerator / denominator).toFixed(6));
}

function comparison(agreementCount, recordCount) {
  return {
    agreement_count: agreementCount,
    disagreement_count: recordCount - agreementCount,
    record_count: recordCount,
    agreement_rate: roundedRatio(agreementCount, recordCount),
  };
}

export function detectLocaleReference(review) {
  const reviewText = [
    review.rationale,
    ...(review.acceptable_meaning_invariants ?? []),
    review.recommended_revision ?? "",
    ...(review.review_evidence_refs ?? []),
  ].join(" ");
  return /locale|locali[sz]/iu.test(reviewText);
}

export function validateExternalReviewRecord(record, expectedWorkUnitId, location = "record") {
  const requiredKeys = [
    "work_unit_id",
    "disposition",
    "hard_dimension_results",
    "quality_dimension_scores",
    "rationale",
    "acceptable_meaning_invariants",
    "recommended_revision",
    "review_evidence_refs",
    "reviewer_confidence",
  ];
  if (!exactKeys(record, requiredKeys)) fail(`${location}:keys`);
  if (record.work_unit_id !== expectedWorkUnitId) fail(`${location}:work_unit_id`);
  if (!DISPOSITIONS.has(record.disposition)) fail(`${location}:disposition`);
  if (!exactKeys(record.hard_dimension_results, HARD_DIMENSIONS)) fail(`${location}:hard_dimension_keys`);
  for (const dimension of HARD_DIMENSIONS) {
    if (!HARD_RESULTS.has(record.hard_dimension_results[dimension])) fail(`${location}:hard_dimension:${dimension}`);
  }
  if (!exactKeys(record.quality_dimension_scores, QUALITY_DIMENSIONS)) fail(`${location}:quality_dimension_keys`);
  for (const dimension of QUALITY_DIMENSIONS) {
    const score = record.quality_dimension_scores[dimension];
    if (score !== null && (!Number.isInteger(score) || score < 1 || score > 5)) {
      fail(`${location}:quality_dimension:${dimension}`);
    }
  }
  if (["pass", "revise", "human_preference_review"].includes(record.disposition)
    && QUALITY_DIMENSIONS.some((dimension) => record.quality_dimension_scores[dimension] === null)) {
    fail(`${location}:required_quality_score`);
  }
  if (typeof record.rationale !== "string" || record.rationale.trim().length === 0) fail(`${location}:rationale`);
  if (!Array.isArray(record.acceptable_meaning_invariants)
    || record.acceptable_meaning_invariants.length === 0
    || record.acceptable_meaning_invariants.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    fail(`${location}:acceptable_meaning_invariants`);
  }
  if (record.recommended_revision !== null
    && (typeof record.recommended_revision !== "string" || record.recommended_revision.trim().length === 0)) {
    fail(`${location}:recommended_revision`);
  }
  if (!Array.isArray(record.review_evidence_refs)
    || record.review_evidence_refs.length === 0
    || record.review_evidence_refs.some((value) => typeof value !== "string" || value.trim().length === 0)) {
    fail(`${location}:review_evidence_refs`);
  }
  if (!["high", "medium", "low"].includes(record.reviewer_confidence)) fail(`${location}:reviewer_confidence`);
  return record;
}

function sliceComparison(records, leftReviewer, rightReviewer) {
  const left = records.map((record) => leftReviewer.get(record.work_unit_id));
  const right = records.map((record) => rightReviewer.get(record.work_unit_id));
  if (left.some((record) => record === undefined) || right.some((record) => record === undefined)) {
    fail("comparison_missing_review");
  }
  const agreementCount = records.filter((record) => (
    leftReviewer.get(record.work_unit_id).disposition === rightReviewer.get(record.work_unit_id).disposition
  )).length;
  return comparison(agreementCount, records.length);
}

function groupedDispositionComparison(records, leftReviewer, rightReviewer, field) {
  const groups = new Map();
  for (const record of records) {
    const key = field(record);
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }
  return Object.fromEntries([...groups.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, group]) => [key, sliceComparison(group, leftReviewer, rightReviewer)]));
}

function englishSyntheticControlDisposition(scenario) {
  if (scenario.evaluation_control.class === "positive_control") return "pass";
  if (scenario.evaluation_control.class === "near_miss") return "human_preference_review";
  return scenario.evaluation_control.expected_disposition;
}

export function summarizeExternalReviewPairs(scenarios, reviewsByReviewer) {
  const scenarioById = new Map(scenarios.map((scenario) => [scenario.scenario_id, scenario]));
  const records = scenarios.map((scenario) => ({
    work_unit_id: `review-${scenario.scenario_id}`,
    scenario,
  }));
  const englishRecords = records.filter(({ scenario }) => (
    ENGLISH_TARGET_LOCALES.includes(scenario.context.target_locale)
    && !ENGLISH_EXCLUDED_ABILITIES.includes(scenario.ability.id)
  ));
  const left = reviewsByReviewer.claude;
  const right = reviewsByReviewer.cursor;

  const hardDimensionAgreement = {};
  for (const dimension of HARD_DIMENSIONS) {
    const agreementCount = englishRecords.filter(({ work_unit_id }) => (
      left.get(work_unit_id).hard_dimension_results[dimension]
      === right.get(work_unit_id).hard_dimension_results[dimension]
    )).length;
    hardDimensionAgreement[dimension] = comparison(agreementCount, englishRecords.length);
  }

  const qualityDistance = {};
  for (const dimension of QUALITY_DIMENSIONS.filter((name) => !ENGLISH_EXCLUDED_QUALITY_DIMENSIONS.includes(name))) {
    let absoluteDistance = 0;
    let pairedCount = 0;
    for (const { work_unit_id } of englishRecords) {
      const leftScore = left.get(work_unit_id).quality_dimension_scores[dimension];
      const rightScore = right.get(work_unit_id).quality_dimension_scores[dimension];
      if (leftScore === null || rightScore === null) continue;
      absoluteDistance += Math.abs(leftScore - rightScore);
      pairedCount += 1;
    }
    qualityDistance[dimension] = {
      paired_score_count: pairedCount,
      missing_pair_count: englishRecords.length - pairedCount,
      mean_absolute_distance: pairedCount === 0 ? null : Number((absoluteDistance / pairedCount).toFixed(6)),
    };
  }

  const syntheticControlAgreement = {};
  for (const reviewer of REVIEWERS) {
    const reviewerRecords = reviewsByReviewer[reviewer];
    const agreementCount = englishRecords.filter(({ work_unit_id, scenario }) => (
      reviewerRecords.get(work_unit_id).disposition === englishSyntheticControlDisposition(scenario)
    )).length;
    syntheticControlAgreement[reviewer] = comparison(agreementCount, englishRecords.length);
  }

  return {
    raw_disposition_comparison: sliceComparison(records, left, right),
    english_only: {
      scope: {
        target_locales: ENGLISH_TARGET_LOCALES,
        excluded_abilities: ENGLISH_EXCLUDED_ABILITIES,
        excluded_quality_dimensions: ENGLISH_EXCLUDED_QUALITY_DIMENSIONS,
        synthetic_control_normalization: {
          positive_control: "pass",
          near_miss: "human_preference_review",
          other_controls: "preserve_generator_disposition",
          reason: "remove_locale_only_escalation_from_the_English_expression_slice",
        },
      },
      record_count: englishRecords.length,
      disposition_comparison: sliceComparison(englishRecords, left, right),
      synthetic_control_agreement: syntheticControlAgreement,
      residual_locale_reference_count: Object.fromEntries(REVIEWERS.map((reviewer) => [
        reviewer,
        englishRecords.filter(({ work_unit_id }) => detectLocaleReference(reviewsByReviewer[reviewer].get(work_unit_id))).length,
      ])),
      hard_dimension_agreement: hardDimensionAgreement,
      quality_dimension_mean_absolute_distance: qualityDistance,
      disposition_comparison_by_candidate_variant: groupedDispositionComparison(
        englishRecords,
        left,
        right,
        ({ scenario }) => scenario.candidate.variant,
      ),
      disposition_comparison_by_situation: groupedDispositionComparison(
        englishRecords,
        left,
        right,
        ({ scenario }) => scenario.context.situation,
      ),
      disposition_comparison_by_surface: groupedDispositionComparison(
        englishRecords,
        left,
        right,
        ({ scenario }) => scenario.context.surface,
      ),
    },
  };
}

async function readJson(file, reason) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch (error) {
    fail(`${reason}:${error instanceof Error ? error.message : String(error)}`);
  }
}

async function readReviewerSubmission(auditRoot, reviewer, expectedWorkUnitIds, expectedBatchCount, batchSize) {
  const reviewerRoot = path.join(auditRoot, "outputs", reviewer);
  const names = (await readdir(reviewerRoot)).filter((name) => !name.startsWith(".")).sort();
  const expectedNames = Array.from({ length: expectedBatchCount }, (_, index) => (
    `batch-${String(index + 1).padStart(3, "0")}.responses.jsonl`
  ));
  if (JSON.stringify(names) !== JSON.stringify(expectedNames)) fail(`${reviewer}:output_files`);

  const records = [];
  const submissionHash = createHash("sha256");
  for (let batchIndex = 0; batchIndex < expectedBatchCount; batchIndex += 1) {
    const name = expectedNames[batchIndex];
    const raw = await readFile(path.join(reviewerRoot, name), "utf8");
    submissionHash.update(name).update("\0").update(raw).update("\0");
    const lines = raw.split(/\r?\n/u).filter((line) => line.trim().length > 0);
    if (lines.length !== batchSize) fail(`${reviewer}:${name}:record_count`);
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
      const absoluteIndex = batchIndex * batchSize + lineIndex;
      let record;
      try {
        record = JSON.parse(lines[lineIndex]);
      } catch (error) {
        fail(`${reviewer}:${name}:${lineIndex + 1}:json:${error instanceof Error ? error.message : String(error)}`);
      }
      records.push(validateExternalReviewRecord(
        record,
        expectedWorkUnitIds[absoluteIndex],
        `${reviewer}:${name}:${lineIndex + 1}`,
      ));
    }
  }
  if (new Set(records.map((record) => record.work_unit_id)).size !== expectedWorkUnitIds.length) {
    fail(`${reviewer}:duplicate_work_unit_id`);
  }
  return {
    records,
    submission_digest: submissionHash.digest("hex"),
  };
}

export async function analyzeContentDesignExternalAudit(auditRoot) {
  const resolvedAuditRoot = path.resolve(auditRoot);
  const manifest = await readJson(path.join(resolvedAuditRoot, "MANIFEST.json"), "manifest");
  const scenarios = generateScenarios();
  const packet = validateBlindPacket(prepareFullBenchmarkPacket(scenarios), 10_000);
  if (manifest.contract_version !== "contentmd.external-model-audit-handoff/0.1.0"
    || manifest.created_from_packet_digest !== packet.packet_digest
    || manifest.scenario_count !== 10_000
    || manifest.batch_count !== 100
    || manifest.batch_size !== 100
    || manifest.audit_kind !== "exploratory_model_review_not_human_gold"
    || manifest.authority_effect !== "none"
    || manifest.retrieval_eligibility !== "never"
    || manifest.training_eligibility !== "never"
    || manifest.effectiveness_claim_eligibility !== false) fail("manifest_envelope");
  if (!Array.isArray(manifest.input_files) || manifest.input_files.length !== manifest.batch_count) {
    fail("manifest_input_files");
  }

  const expectedWorkUnitIds = [];
  for (let batchIndex = 0; batchIndex < manifest.batch_count; batchIndex += 1) {
    const name = `batch-${String(batchIndex + 1).padStart(3, "0")}.json`;
    const entry = manifest.input_files[batchIndex];
    if (entry.path !== `inputs/${name}` || entry.work_unit_count !== manifest.batch_size) {
      fail(`manifest_input_entry:${name}`);
    }
    const file = path.join(resolvedAuditRoot, entry.path);
    const raw = await readFile(file, "utf8");
    if (sha256(raw) !== entry.sha256) fail(`input_digest:${name}`);
    const batch = JSON.parse(raw);
    const expectedUnits = packet.review_work_units.slice(
      batchIndex * manifest.batch_size,
      (batchIndex + 1) * manifest.batch_size,
    );
    if (batch.contract_version !== "contentmd.external-model-audit-batch/0.1.0"
      || batch.audit_kind !== manifest.audit_kind
      || batch.full_packet_ref?.packet_digest !== packet.packet_digest
      || batch.full_packet_ref?.sample_count !== manifest.scenario_count
      || batch.batch_number !== batchIndex + 1
      || batch.batch_count !== manifest.batch_count
      || batch.work_unit_count !== manifest.batch_size
      || JSON.stringify(batch.review_work_units) !== JSON.stringify(expectedUnits)) {
      fail(`input_batch:${name}`);
    }
    expectedWorkUnitIds.push(...batch.review_work_units.map((unit) => unit.work_unit_id));
  }
  if (new Set(expectedWorkUnitIds).size !== manifest.scenario_count) fail("input_work_unit_identity");

  const reviewerSubmissions = {};
  const reviewsByReviewer = {};
  for (const reviewer of REVIEWERS) {
    const submission = await readReviewerSubmission(
      resolvedAuditRoot,
      reviewer,
      expectedWorkUnitIds,
      manifest.batch_count,
      manifest.batch_size,
    );
    reviewsByReviewer[reviewer] = new Map(submission.records.map((record) => [record.work_unit_id, record]));
    reviewerSubmissions[reviewer] = {
      record_count: submission.records.length,
      submission_digest: submission.submission_digest,
      disposition_distribution: sortedCounts(submission.records.map((record) => record.disposition)),
      locale_reference_count: submission.records.filter(detectLocaleReference).length,
    };
  }

  const comparisonReport = summarizeExternalReviewPairs(scenarios, reviewsByReviewer);
  return {
    contract_version: "contentmd.external-model-audit-analysis/0.1.0",
    audit_kind: manifest.audit_kind,
    source_packet_digest: packet.packet_digest,
    input_verification: {
      batch_count: manifest.batch_count,
      work_unit_count: expectedWorkUnitIds.length,
      manifest_digests_verified: true,
      generator_parity_verified: true,
    },
    reviewer_submissions: reviewerSubmissions,
    ...comparisonReport,
    interpretation: {
      external_models_are_human_gold: false,
      synthetic_controls_are_adjudicated_truth: false,
      retrieval_eligibility: "never",
      training_eligibility: "never",
      effectiveness_claim_eligibility: false,
      authority_effect: "none",
    },
    verification_status: "passed",
  };
}

function parseArguments(argv) {
  let auditRoot;
  let output;
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--out") {
      output = argv[index + 1];
      if (output === undefined) fail("missing_out_path");
      index += 1;
    } else if (auditRoot === undefined) {
      auditRoot = value;
    } else {
      fail(`unexpected_argument:${value}`);
    }
  }
  if (auditRoot === undefined) fail("usage:node scripts/analyze-content-design-external-audit.mjs <audit-root> [--out report.json]");
  return { auditRoot, output };
}

const invokedPath = process.argv[1] === undefined ? null : path.resolve(process.argv[1]);
if (invokedPath === fileURLToPath(import.meta.url)) {
  const { auditRoot, output } = parseArguments(process.argv.slice(2));
  const report = await analyzeContentDesignExternalAudit(auditRoot);
  const serialized = `${JSON.stringify(report, null, 2)}\n`;
  if (output !== undefined) await writeFile(path.resolve(output), serialized, { flag: "wx" });
  process.stdout.write(serialized);
}
