#!/usr/bin/env node

import { createHash } from "node:crypto";
import { access, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { verifyReviewerQualification } from "../packages/governance/dist/index.js";
import { validateEnglishDisagreementPilotPacket } from "./analyze-content-design-external-audit.mjs";

const DISPOSITIONS = ["pass", "revise", "abstain", "escalate", "human_preference_review"];
const HARD_RESULTS = ["pass", "fail", "unknown", "not_applicable"];

function fail(reason) {
  throw new Error(`content_design_disagreement_pilot_invalid:${reason}`);
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function exactKeys(value, expected) {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    && JSON.stringify(Object.keys(value).sort()) === JSON.stringify([...expected].sort());
}

function nonempty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function uniqueStringArray(value) {
  return Array.isArray(value) && value.length > 0
    && new Set(value).size === value.length
    && value.every(nonempty);
}

function isRfc3339(value) {
  return typeof value === "string"
    && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/u.test(value)
    && Number.isFinite(Date.parse(value));
}

function ratio(numerator, denominator) {
  return denominator === 0 ? null : Number((numerator / denominator).toFixed(6));
}

function qualificationStatus(reviewer, packetDigest) {
  if (reviewer.qualification_bundle === null) return "unverified_missing_bundle";
  let qualification;
  try {
    qualification = verifyReviewerQualification({
      ...reviewer.qualification_bundle,
      as_of: reviewer.reviewed_at,
      verification_mode: "official",
    });
  } catch {
    fail(`reviewer_qualification:${reviewer.reviewer_slot}`);
  }
  const packetScope = `content-design-benchmark-packet:${packetDigest}`;
  if (qualification.reviewer_ref.object_id !== reviewer.reviewer_id
    || !qualification.eligible_roles.includes("qualified_content_designer")
    || !qualification.qualified_objectives.includes("content_design_benchmark_review")
    || !qualification.authorized_resource_scopes.includes("content-design-benchmark")
    || !qualification.authorized_resource_scopes.includes(packetScope)) {
    fail(`reviewer_qualification_scope:${reviewer.reviewer_slot}`);
  }
  return "verified_for_exact_packet";
}

function validateResponse(unit, response, reviewerSlot) {
  const responseKeys = [
    "work_unit_id",
    "disposition",
    "hard_dimension_results",
    "quality_dimension_scores",
    "rationale",
    "acceptable_meaning_invariants",
    "recommended_revision",
    "review_evidence_refs",
  ];
  if (!exactKeys(response, responseKeys)) fail(`${reviewerSlot}:${unit.work_unit_id}:response_keys`);
  if (response.work_unit_id !== unit.work_unit_id || !DISPOSITIONS.includes(response.disposition)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:disposition`);
  }
  if (!exactKeys(response.hard_dimension_results, unit.rubric.hard_dimensions)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:hard_dimensions`);
  }
  for (const dimension of unit.rubric.hard_dimensions) {
    if (!HARD_RESULTS.includes(response.hard_dimension_results[dimension])) {
      fail(`${reviewerSlot}:${unit.work_unit_id}:hard:${dimension}`);
    }
  }
  if (response.disposition === "pass"
    && Object.values(response.hard_dimension_results).some((result) => !["pass", "not_applicable"].includes(result))) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:pass_with_unresolved_hard_dimension`);
  }
  if (!exactKeys(response.quality_dimension_scores, unit.rubric.quality_dimensions)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:quality_dimensions`);
  }
  for (const dimension of unit.rubric.quality_dimensions) {
    const score = response.quality_dimension_scores[dimension];
    if (score !== null && (!Number.isInteger(score) || score < 1 || score > 5)) {
      fail(`${reviewerSlot}:${unit.work_unit_id}:quality:${dimension}`);
    }
  }
  if (["pass", "revise", "human_preference_review"].includes(response.disposition)
    && Object.values(response.quality_dimension_scores).some((score) => score === null)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:required_quality_score`);
  }
  if (!nonempty(response.rationale) || response.rationale.trim().length < 20) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:rationale`);
  }
  if (!uniqueStringArray(response.acceptable_meaning_invariants)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:invariants`);
  }
  if (response.disposition === "revise" && !nonempty(response.recommended_revision)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:recommended_revision`);
  }
  if (response.recommended_revision !== null && !nonempty(response.recommended_revision)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:recommended_revision_type`);
  }
  if (!uniqueStringArray(response.review_evidence_refs)) {
    fail(`${reviewerSlot}:${unit.work_unit_id}:evidence_refs`);
  }
  return response;
}

export function validateEnglishPilotSubmission(packet, submission, expectedReviewerSlot) {
  validateEnglishDisagreementPilotPacket(packet);
  const envelopeKeys = [
    "contract_version",
    "packet_ref",
    "reviewer",
    "responses",
    "submission_state",
    "human_gold_eligibility",
    "authority_effect",
  ];
  if (!exactKeys(submission, envelopeKeys)
    || submission.contract_version !== "contentmd.english-disagreement-pilot-submission/0.1.0"
    || submission.packet_ref?.packet_digest !== packet.packet_digest
    || submission.packet_ref?.sample_count !== packet.sample_count
    || submission.submission_state !== "complete"
    || submission.human_gold_eligibility !== false
    || submission.authority_effect !== "none"
    || !Array.isArray(submission.responses)
    || submission.responses.length !== packet.sample_count) fail(`${expectedReviewerSlot}:submission_envelope`);
  const reviewerKeys = [
    "reviewer_slot",
    "reviewer_id",
    "reviewer_role",
    "reviewed_at",
    "independent_review_attested",
    "qualification_bundle",
  ];
  if (!exactKeys(submission.reviewer, reviewerKeys)
    || submission.reviewer.reviewer_slot !== expectedReviewerSlot
    || !nonempty(submission.reviewer.reviewer_id)
    || submission.reviewer.reviewer_role !== "qualified_content_designer"
    || !isRfc3339(submission.reviewer.reviewed_at)
    || submission.reviewer.independent_review_attested !== true
    || (submission.reviewer.qualification_bundle !== null
      && (typeof submission.reviewer.qualification_bundle !== "object"
        || Array.isArray(submission.reviewer.qualification_bundle)))) {
    fail(`${expectedReviewerSlot}:reviewer`);
  }
  for (const [index, unit] of packet.review_work_units.entries()) {
    validateResponse(unit, submission.responses[index], expectedReviewerSlot);
  }
  return {
    submission,
    qualification_status: qualificationStatus(submission.reviewer, packet.packet_digest),
  };
}

function groupedSummary(records, field) {
  const groups = new Map();
  for (const record of records) {
    const key = field(record.unit);
    const group = groups.get(key) ?? [];
    group.push(record);
    groups.set(key, group);
  }
  return Object.fromEntries([...groups.entries()].sort(([left], [right]) => left.localeCompare(right)).map(([key, group]) => {
    const dispositionAgreement = group.filter((record) => record.left.disposition === record.right.disposition).length;
    return [key, {
      count: group.length,
      disposition_agreement_count: dispositionAgreement,
      disposition_agreement_rate: ratio(dispositionAgreement, group.length),
      adjudication_count: group.filter((record) => record.requires_adjudication).length,
    }];
  }));
}

export function compareEnglishPilotSubmissions(packet, reviewerA, reviewerB, sourceDigests) {
  const left = validateEnglishPilotSubmission(packet, reviewerA, "reviewer-a");
  const right = validateEnglishPilotSubmission(packet, reviewerB, "reviewer-b");
  if (reviewerA.reviewer.reviewer_id === reviewerB.reviewer.reviewer_id) fail("reviewer_identity_not_independent");
  if (!/^[a-f0-9]{64}$/u.test(sourceDigests?.reviewer_a ?? "")
    || !/^[a-f0-9]{64}$/u.test(sourceDigests?.reviewer_b ?? "")) fail("submission_source_digest");

  const paired = packet.review_work_units.map((unit, index) => {
    const responseA = reviewerA.responses[index];
    const responseB = reviewerB.responses[index];
    const hardDimensionDisagreements = unit.rubric.hard_dimensions.filter((dimension) => (
      responseA.hard_dimension_results[dimension] !== responseB.hard_dimension_results[dimension]
    ));
    const qualityScoreDifferences = Object.fromEntries(unit.rubric.quality_dimensions.flatMap((dimension) => {
      const scoreA = responseA.quality_dimension_scores[dimension];
      const scoreB = responseB.quality_dimension_scores[dimension];
      return scoreA === scoreB ? [] : [[dimension, { reviewer_a: scoreA, reviewer_b: scoreB }]];
    }));
    const dispositionDisagreement = responseA.disposition !== responseB.disposition;
    return {
      unit,
      left: responseA,
      right: responseB,
      disposition_disagreement: dispositionDisagreement,
      hard_dimension_disagreements: hardDimensionDisagreements,
      quality_score_differences: qualityScoreDifferences,
      requires_adjudication: dispositionDisagreement
        || hardDimensionDisagreements.length > 0
        || Object.keys(qualityScoreDifferences).length > 0,
    };
  });

  const dispositionAgreementCount = paired.filter((record) => !record.disposition_disagreement).length;
  const hardDimensionAgreement = Object.fromEntries(packet.review_work_units[0].rubric.hard_dimensions.map((dimension) => {
    const count = paired.filter((record) => (
      record.left.hard_dimension_results[dimension] === record.right.hard_dimension_results[dimension]
    )).length;
    return [dimension, { agreement_count: count, count: paired.length, agreement_rate: ratio(count, paired.length) }];
  }));
  const qualityScoreDistance = Object.fromEntries(packet.review_work_units[0].rubric.quality_dimensions.map((dimension) => {
    const pairs = paired.flatMap((record) => {
      const scoreA = record.left.quality_dimension_scores[dimension];
      const scoreB = record.right.quality_dimension_scores[dimension];
      return typeof scoreA === "number" && typeof scoreB === "number" ? [[scoreA, scoreB]] : [];
    });
    return [dimension, {
      comparable_count: pairs.length,
      mean_absolute_distance: pairs.length === 0 ? null : Number((
        pairs.reduce((sum, [scoreA, scoreB]) => sum + Math.abs(scoreA - scoreB), 0) / pairs.length
      ).toFixed(6)),
    }];
  }));
  const adjudicationQueue = paired.filter((record) => record.requires_adjudication).map((record) => ({
    work_unit_id: record.unit.work_unit_id,
    scenario_ref: record.unit.scenario_ref,
    ability_id: record.unit.ability.id,
    situation: record.unit.context.situation,
    surface: record.unit.context.surface,
    disposition: { reviewer_a: record.left.disposition, reviewer_b: record.right.disposition },
    hard_dimension_disagreements: record.hard_dimension_disagreements,
    quality_score_differences: record.quality_score_differences,
    adjudication_status: "pending",
  }));
  const bothQualified = left.qualification_status === "verified_for_exact_packet"
    && right.qualification_status === "verified_for_exact_packet";
  const preimage = {
    contract_version: "contentmd.english-disagreement-pilot-comparison/0.1.0",
    packet_ref: { packet_digest: packet.packet_digest, sample_count: packet.sample_count },
    submission_refs: {
      reviewer_a: {
        reviewer_id: reviewerA.reviewer.reviewer_id,
        reviewed_at: reviewerA.reviewer.reviewed_at,
        source_digest: sourceDigests.reviewer_a,
        qualification_status: left.qualification_status,
      },
      reviewer_b: {
        reviewer_id: reviewerB.reviewer.reviewer_id,
        reviewed_at: reviewerB.reviewer.reviewed_at,
        source_digest: sourceDigests.reviewer_b,
        qualification_status: right.qualification_status,
      },
    },
    disposition_agreement: {
      agreement_count: dispositionAgreementCount,
      disagreement_count: paired.length - dispositionAgreementCount,
      count: paired.length,
      agreement_rate: ratio(dispositionAgreementCount, paired.length),
    },
    hard_dimension_agreement: hardDimensionAgreement,
    quality_score_distance: qualityScoreDistance,
    by_ability: groupedSummary(paired, (unit) => unit.ability.id),
    by_situation: groupedSummary(paired, (unit) => unit.context.situation),
    by_surface: groupedSummary(paired, (unit) => unit.context.surface),
    adjudication_count: adjudicationQueue.length,
    adjudication_queue: adjudicationQueue,
    comparison_status: bothQualified
      ? "qualified_submissions_pending_adjudication"
      : "structurally_complete_qualification_unverified",
    human_gold_eligibility: false,
    effectiveness_claim_eligibility: false,
    training_eligibility: "never",
    retrieval_eligibility: "never",
    authority_effect: "none",
  };
  return { ...preimage, comparison_digest: sha256(JSON.stringify(preimage)) };
}

async function readJsonWithDigest(file) {
  const bytes = await readFile(path.resolve(file));
  return { value: JSON.parse(bytes.toString("utf8")), digest: sha256(bytes) };
}

function parseArguments(argv) {
  const values = {};
  for (let index = 0; index < argv.length; index += 2) {
    const key = argv[index];
    const value = argv[index + 1];
    if (!["--packet", "--reviewer-a", "--reviewer-b", "--out"].includes(key) || value === undefined) {
      fail("usage:--packet packet.json --reviewer-a a.json --reviewer-b b.json --out comparison.json");
    }
    if (values[key] !== undefined) fail(`duplicate_argument:${key}`);
    values[key] = value;
  }
  for (const key of ["--packet", "--reviewer-a", "--reviewer-b", "--out"]) {
    if (values[key] === undefined) fail(`missing_argument:${key}`);
  }
  const paths = Object.values(values).map((value) => path.resolve(value));
  if (new Set(paths).size !== paths.length) fail("paths_must_be_distinct");
  return values;
}

const invokedPath = process.argv[1] === undefined ? null : path.resolve(process.argv[1]);
if (invokedPath === fileURLToPath(import.meta.url)) {
  const args = parseArguments(process.argv.slice(2));
  try {
    await access(path.resolve(args["--out"]));
    fail(`output_exists:${path.resolve(args["--out"])}`);
  } catch (error) {
    if (!(error !== null && typeof error === "object" && error.code === "ENOENT")) throw error;
  }
  const packet = (await readJsonWithDigest(args["--packet"])).value;
  const reviewerA = await readJsonWithDigest(args["--reviewer-a"]);
  const reviewerB = await readJsonWithDigest(args["--reviewer-b"]);
  const comparison = compareEnglishPilotSubmissions(packet, reviewerA.value, reviewerB.value, {
    reviewer_a: reviewerA.digest,
    reviewer_b: reviewerB.digest,
  });
  await writeFile(path.resolve(args["--out"]), `${JSON.stringify(comparison, null, 2)}\n`, { flag: "wx" });
  process.stdout.write(`${JSON.stringify({
    output: path.resolve(args["--out"]),
    comparison_digest: comparison.comparison_digest,
    comparison_status: comparison.comparison_status,
    disposition_agreement: comparison.disposition_agreement,
    adjudication_count: comparison.adjudication_count,
    authority_effect: comparison.authority_effect,
  }, null, 2)}\n`);
}
