#!/usr/bin/env node

import { access, readdir, readFile } from "node:fs/promises";
import { isDeepStrictEqual } from "node:util";
import { fileURLToPath } from "node:url";
import path from "node:path";

import { reviewUxWriting } from "../packages/evaluation/dist/index.js";
import { createAuthoredChallengeReviewPacket } from "./prepare-authored-content-design-reviews.mjs";

const repositoryRoot = fileURLToPath(new URL("../", import.meta.url));
const defaultRoot = path.join(
  repositoryRoot,
  "docs/tests/fixtures/content-design-authored-challenges",
);

const evaluationOrder = [
  "evidence_and_authority",
  "truth_and_state_accuracy",
  "action_consequence_and_recovery",
  "semantic_fidelity",
  "accessibility_readiness",
  "comprehension_and_structure",
  "voice_tone_and_economy",
];

const candidateFields = ["headline", "body", "primary_button", "secondary_button"];
const qualityDimensions = ["clarity", "specificity", "hierarchy", "voice_fit", "tone_fit", "economy"];
const hardDimensions = [
  "evidence_and_authority",
  "truth_and_state_accuracy",
  "action_consequence_and_recovery",
  "semantic_fidelity",
  "accessibility_readiness",
];

function fail(challenge, reason) {
  throw new Error(`authored_content_design_challenge_invalid:${challenge}:${reason}`);
}

function record(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function nonEmpty(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function stringArray(value, allowEmpty = false) {
  return Array.isArray(value)
    && (allowEmpty || value.length > 0)
    && value.every(nonEmpty)
    && new Set(value).size === value.length;
}

function sameStrings(actual, expected) {
  return Array.isArray(actual)
    && actual.length === expected.length
    && actual.every((value, index) => value === expected[index]);
}

function codePointCount(value) {
  return [...value].length;
}

async function readJson(file, challenge) {
  try {
    return JSON.parse(await readFile(file, "utf8"));
  } catch {
    fail(challenge, `json:${path.basename(file)}`);
  }
}

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch (error) {
    if (error?.code === "ENOENT") return false;
    throw error;
  }
}

function validateScenario(scenario, challenge) {
  if (!record(scenario)
    || scenario.contract_version !== "contentmd.authored-content-design-challenge/0.1.0"
    || scenario.scenario_id !== `content-design.challenge.${challenge}`
    || scenario.status !== "authored_synthetic_unreviewed"
    || scenario.language_scope !== "English") fail(challenge, "identity_or_language_scope");
  if (JSON.stringify(scenario).includes('"locale')) fail(challenge, "locale_field_present");
  if (!record(scenario.provenance)
    || scenario.provenance.authorship !== "project_authored_synthetic"
    || scenario.provenance.source_use !== "exercise_structure_only"
    || scenario.provenance.source_expression_copied !== false
    || !nonEmpty(scenario.provenance.structural_inspiration_url)) fail(challenge, "provenance");
  if (!record(scenario.context)
    || !Object.values(scenario.context).every(nonEmpty)
    || !record(scenario.product_state)
    || !stringArray(scenario.product_state.known_facts)
    || !stringArray(scenario.product_state.forbidden_claims)
    || !nonEmpty(scenario.challenge)) fail(challenge, "context_or_facts");
  if (!record(scenario.current_content)) fail(challenge, "current_content");
  for (const field of candidateFields) {
    const value = scenario.current_content[field];
    if (value !== null && !nonEmpty(value)) fail(challenge, `current_content:${field}`);
  }
  if (!record(scenario.constraints)
    || scenario.constraints.button_count !== 2
    || !nonEmpty(scenario.constraints.character_counting_rule)) fail(challenge, "constraints");
  for (const field of candidateFields) {
    const limit = scenario.constraints[`${field}_max_characters`];
    if (!Number.isSafeInteger(limit) || limit < 1) fail(challenge, `constraint:${field}`);
  }
  if (!record(scenario.interaction_contract)
    || !Object.values(scenario.interaction_contract).every(nonEmpty)
    || !record(scenario.expression_direction)
    || !stringArray(scenario.expression_direction.intended_voice)
    || !stringArray(scenario.expression_direction.situational_tone)
    || !stringArray(scenario.expression_direction.avoid)) fail(challenge, "interaction_or_expression");
  if (!record(scenario.required_output)
    || !sameStrings(scenario.required_output.candidate_fields, candidateFields)
    || !stringArray(scenario.required_output.rationale_requirements)
    || !sameStrings(scenario.evaluation_order, evaluationOrder)) fail(challenge, "output_or_evaluation_contract");
  if (!record(scenario.governance)
    || scenario.governance.review_state !== "unreviewed"
    || scenario.governance.authority_effect !== "none"
    || scenario.governance.retrieval_eligibility !== "never"
    || scenario.governance.training_eligibility !== "never"
    || scenario.governance.benchmark_eligibility !== false
    || scenario.governance.effectiveness_claim_eligibility !== false) fail(challenge, "governance");
}

function validateContentmdReplay(request, receivedReview, receivedBrief, challenge) {
  if (!record(request)
    || request.contract_version !== "contentmd.ux-writing-review-request/0.1.0"
    || request.locale !== "en"
    || request.authority_effect !== "none"
    || request.facts?.["locale.specialist_review_required"] !== false) fail(challenge, "contentmd_review_request");
  const replay = reviewUxWriting({ request });
  if (!isDeepStrictEqual(replay.report, receivedReview)) fail(challenge, "contentmd_review_replay");
  if (!isDeepStrictEqual(replay.repair_brief, receivedBrief)) fail(challenge, "contentmd_repair_brief_replay");
  if (replay.report.findings.some((finding) => finding.dimension === "localization")) {
    fail(challenge, "locale_evaluation_present");
  }
  return replay;
}

function validateCandidate(candidate, scenario, request, challenge) {
  if (!record(candidate)
    || candidate.contract_version !== "contentmd.authored-challenge-candidate/0.1.0"
    || candidate.scenario_id !== scenario.scenario_id
    || !record(candidate.generator)
    || candidate.generator.system !== "content.md"
    || !nonEmpty(candidate.generator.version)
    || !["repository_agent", "live_provider"].includes(candidate.generator.execution_path)
    || !nonEmpty(candidate.generator.host_system)
    || candidate.generator.run_id !== null && !nonEmpty(candidate.generator.run_id)
    || !record(candidate.candidate)
    || !record(candidate.character_counts)
    || !record(candidate.rationale)
    || !record(candidate.self_check)
    || candidate.review_state !== "unreviewed"
    || candidate.authority_effect !== "none") fail(challenge, "candidate_contract");
  for (const field of candidateFields) {
    const text = candidate.candidate[field];
    const count = codePointCount(text ?? "");
    if (!nonEmpty(text)
      || candidate.character_counts[field] !== count
      || count > scenario.constraints[`${field}_max_characters`]) fail(challenge, `candidate_field:${field}`);
  }
  for (const field of ["state_accuracy", "actions", "hierarchy", "voice_and_tone", "economy"]) {
    if (!nonEmpty(candidate.rationale[field])) fail(challenge, `candidate_rationale:${field}`);
  }
  if (!Array.isArray(candidate.unresolved_questions)
    || candidate.unresolved_questions.some((question) => !nonEmpty(question))
    || candidate.self_check.all_constraints_met !== true
    || candidate.self_check.all_required_meanings_mapped !== true
    || candidate.self_check.forbidden_claims_absent !== true
    || !Array.isArray(candidate.meaning_map)) fail(challenge, "candidate_self_check");
  const mapped = new Set(candidate.meaning_map.map((entry) => entry?.required_meaning));
  if (request.preserve.some((meaning) => !mapped.has(meaning))) fail(challenge, "candidate_meaning_map");
  const expression = candidateFields.map((field) => candidate.candidate[field]).join(" ").toLowerCase();
  if (scenario.product_state.forbidden_claims.some((claim) => expression.includes(claim.toLowerCase()))) {
    fail(challenge, "candidate_forbidden_claim");
  }
}

function validateExternalReview(review, reviewer, scenario, packet, challenge) {
  if (!record(review)
    || review.contract_version !== "contentmd.authored-challenge-independent-review/0.1.0"
    || review.scenario_id !== scenario.scenario_id
    || review.review_packet_digest !== packet.packet_digest
    || review.scenario_digest !== packet.scenario_ref.content_digest
    || review.candidate_digest !== packet.candidate_ref.content_digest
    || review.reviewer?.system !== reviewer
    || !nonEmpty(review.reviewer?.model)
    || review.independent_review_attestation !== true
    || !["pass", "revise", "abstain", "escalate", "human_preference_review"].includes(review.disposition)
    || review.review_state !== "external_model_review_unqualified"
    || review.authority_effect !== "none") fail(challenge, `external_review_contract:${reviewer}`);
  if (!record(review.hard_dimension_results)
    || !sameStrings(Object.keys(review.hard_dimension_results).sort(), [...hardDimensions].sort())
    || Object.values(review.hard_dimension_results).some((value) => !["pass", "fail", "unknown"].includes(value))) {
    fail(challenge, `external_review_hard_dimensions:${reviewer}`);
  }
  if (!record(review.quality_scores)
    || !sameStrings(Object.keys(review.quality_scores).sort(), [...qualityDimensions].sort())
    || Object.values(review.quality_scores).some((value) => !Number.isInteger(value) || value < 1 || value > 5)) {
    fail(challenge, `external_review_quality:${reviewer}`);
  }
  if (!record(review.constraint_checks)
    || !sameStrings(Object.keys(review.constraint_checks).sort(), [...candidateFields].sort())
    || Object.values(review.constraint_checks).some((value) => !["pass", "fail"].includes(value))) {
    fail(challenge, `external_review_constraints:${reviewer}`);
  }
}

async function verifyChallenge(root, challenge) {
  const directory = path.join(root, challenge);
  const requiredFiles = [
    "README.md",
    "SOURCE-NOTES.md",
    "scenario.json",
    "prompts/contentmd-rewrite.md",
    "prompts/independent-review.md",
    "outputs/contentmd/README.md",
    "outputs/contentmd/review-request.json",
    "outputs/contentmd/review.json",
    "outputs/contentmd/repair-brief.json",
    "outputs/claude/README.md",
    "outputs/cursor/README.md",
  ];
  for (const file of requiredFiles) {
    if (!await exists(path.join(directory, file))) fail(challenge, `missing:${file}`);
  }

  const scenario = await readJson(path.join(directory, "scenario.json"), challenge);
  validateScenario(scenario, challenge);
  const request = await readJson(path.join(directory, "outputs/contentmd/review-request.json"), challenge);
  const review = await readJson(path.join(directory, "outputs/contentmd/review.json"), challenge);
  const repairBrief = await readJson(path.join(directory, "outputs/contentmd/repair-brief.json"), challenge);
  const replay = validateContentmdReplay(request, review, repairBrief, challenge);

  const candidatePath = path.join(directory, "outputs/contentmd/candidate.json");
  const candidatePresent = await exists(candidatePath);
  const candidate = candidatePresent ? await readJson(candidatePath, challenge) : null;
  if (candidate !== null) validateCandidate(candidate, scenario, request, challenge);

  const reviewPrompt = await readFile(path.join(directory, "prompts/independent-review.md"), "utf8");

  const reviewerStatus = {};
  for (const reviewer of ["claude", "cursor"]) {
    const reviewerSystem = reviewer === "claude" ? "Claude" : "Cursor";
    const packetPath = path.join(directory, `outputs/${reviewer}/review-packet.json`);
    const packetPresent = await exists(packetPath);
    if (candidatePresent && !packetPresent) fail(challenge, `review_packet_missing:${reviewer}`);
    if (!candidatePresent && packetPresent) fail(challenge, `review_packet_without_candidate:${reviewer}`);
    let packet = null;
    if (packetPresent) {
      packet = await readJson(packetPath, challenge);
      const expectedPacket = createAuthoredChallengeReviewPacket({
        reviewer_system: reviewerSystem,
        scenario,
        candidate,
        review_prompt: reviewPrompt,
      });
      if (!isDeepStrictEqual(packet, expectedPacket)) fail(challenge, `review_packet_binding:${reviewer}`);
    }
    const reviewPath = path.join(directory, `outputs/${reviewer}/review.json`);
    const reviewPresent = await exists(reviewPath);
    if (reviewPresent && !candidatePresent) fail(challenge, `external_review_without_candidate:${reviewer}`);
    if (reviewPresent) {
      validateExternalReview(await readJson(reviewPath, challenge), reviewerSystem, scenario, packet, challenge);
    }
    reviewerStatus[reviewer] = reviewPresent ? "received_unqualified" : "pending";
  }

  return {
    scenario_id: scenario.scenario_id,
    language_scope: scenario.language_scope,
    contentmd_diagnosis: replay.report.recommended_disposition,
    contentmd_finding_count: replay.report.findings.length,
    candidate_status: candidatePresent ? "present_unreviewed" : "pending",
    external_reviews: reviewerStatus,
    locale_evaluation: false,
    authority_effect: "none",
  };
}

export async function verifyAuthoredContentDesignChallenges(root = defaultRoot) {
  const entries = await readdir(root, { withFileTypes: true });
  const challenges = entries
    .filter((entry) => entry.isDirectory() && /^\d{3}-[a-z0-9-]+$/u.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  if (challenges.length === 0) fail("root", "no_challenges");
  const results = [];
  for (const challenge of challenges) results.push(await verifyChallenge(root, challenge));
  return {
    contract_version: "contentmd.authored-content-design-challenge-verification/0.1.0",
    challenge_count: results.length,
    challenges: results,
    language_scope: "English",
    external_model_reviews_are_human_gold: false,
    effectiveness_claim_eligibility: false,
    authority_effect: "none",
    verification_status: "passed",
  };
}

const invoked = process.argv[1] === undefined ? null : path.resolve(process.argv[1]);
if (invoked !== null && invoked === fileURLToPath(import.meta.url)) {
  const result = await verifyAuthoredContentDesignChallenges(process.argv[2] === undefined
    ? defaultRoot
    : path.resolve(process.argv[2]));
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}
