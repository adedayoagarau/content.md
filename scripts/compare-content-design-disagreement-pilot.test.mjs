import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";
import assert from "node:assert/strict";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test from "node:test";

import { createEnglishPilotSubmissionTemplate } from "./analyze-content-design-external-audit.mjs";
import {
  compareEnglishPilotSubmissions,
  validateEnglishPilotSubmission,
} from "./compare-content-design-disagreement-pilot.mjs";

const hardDimensions = [
  "factual_accuracy",
  "state_accuracy",
  "semantic_fidelity",
  "agency",
  "recovery",
  "authority_boundary",
];
const qualityDimensions = [
  "clarity",
  "specificity",
  "hierarchy",
  "accessibility_readiness",
  "voice_fit",
  "tone_fit",
  "economy",
];

function packet() {
  const reviewWorkUnits = Array.from({ length: 100 }, (_, index) => ({
    work_unit_id: `pilot-cdes-${String(index + 1).padStart(5, "0")}`,
    scenario_ref: {
      scenario_id: `cdes-${String(index + 1).padStart(5, "0")}`,
      scenario_digest: String(index + 1).padStart(64, "0"),
    },
    sampling_cell: { pilot_slot: index + 1 },
    ability: { id: `ability_${index % 5}`, objective: "Review English expression" },
    context: {
      situation: `situation_${index % 10}`,
      surface: `surface_${index % 10}`,
      state: "A known product state",
    },
    candidate: { text: `Candidate ${index + 1}`, supporting_text: "Supporting content" },
    rubric: {
      evaluation_order: ["evidence_authority", "voice_tone_economy"],
      hard_dimensions: hardDimensions,
      quality_dimensions: qualityDimensions,
    },
    reviewer_response: {
      disposition: null,
      hard_dimension_results: null,
      quality_dimension_scores: null,
      rationale: null,
      acceptable_meaning_invariants: null,
      recommended_revision: null,
      reviewer_role: null,
      review_evidence_refs: null,
    },
    review_state: "unreviewed",
    authority_effect: "none",
    retrieval_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  }));
  const preimage = {
    contract_version: "contentmd.english-disagreement-pilot-packet/0.1.0",
    language_scope: "English",
    sample_count: 100,
    selection_method: "test_selection",
    source_status: "previously_exposed_synthetic_scenarios_for_calibration_only",
    blinded_fields: ["external_reviewer_outputs"],
    required_reviewer_role: "qualified_content_designer",
    review_work_units: reviewWorkUnits,
    packet_state: "unreviewed",
    authority_effect: "none",
    retrieval_eligibility: "never",
    training_eligibility: "never",
    effectiveness_claim_eligibility: false,
  };
  return {
    ...preimage,
    packet_digest: createHash("sha256").update(JSON.stringify(preimage)).digest("hex"),
  };
}

function completeSubmission(packetValue, reviewerSlot, reviewerId) {
  const submission = createEnglishPilotSubmissionTemplate(packetValue, reviewerSlot);
  submission.reviewer.reviewer_id = reviewerId;
  submission.reviewer.reviewed_at = "2026-09-15T20:00:00.000Z";
  submission.reviewer.independent_review_attested = true;
  submission.submission_state = "complete";
  for (const response of submission.responses) {
    response.disposition = "pass";
    response.hard_dimension_results = Object.fromEntries(hardDimensions.map((dimension) => [dimension, "pass"]));
    response.quality_dimension_scores = Object.fromEntries(qualityDimensions.map((dimension) => [dimension, 4]));
    response.rationale = "The candidate preserves the supplied state and action without adding claims.";
    response.acceptable_meaning_invariants = ["Preserve the supplied state and action."];
    response.recommended_revision = null;
    response.review_evidence_refs = ["context.state", "candidate.text"];
  }
  return submission;
}

test("validates and compares two complete unqualified submissions without creating gold", () => {
  const packetValue = packet();
  const reviewerA = completeSubmission(packetValue, "reviewer-a", "reviewer.alpha");
  const reviewerB = completeSubmission(packetValue, "reviewer-b", "reviewer.beta");
  assert.equal(
    validateEnglishPilotSubmission(packetValue, reviewerA, "reviewer-a").qualification_status,
    "unverified_missing_bundle",
  );
  const comparison = compareEnglishPilotSubmissions(packetValue, reviewerA, reviewerB, {
    reviewer_a: "a".repeat(64),
    reviewer_b: "b".repeat(64),
  });
  assert.equal(comparison.disposition_agreement.agreement_count, 100);
  assert.equal(comparison.adjudication_count, 0);
  assert.equal(comparison.comparison_status, "structurally_complete_qualification_unverified");
  assert.equal(comparison.human_gold_eligibility, false);
  assert.equal(comparison.authority_effect, "none");
  assert.match(comparison.comparison_digest, /^[a-f0-9]{64}$/u);
});

test("retains disposition, hard-dimension, and quality-score disagreement for adjudication", () => {
  const packetValue = packet();
  const reviewerA = completeSubmission(packetValue, "reviewer-a", "reviewer.alpha");
  const reviewerB = completeSubmission(packetValue, "reviewer-b", "reviewer.beta");
  reviewerB.responses[0].disposition = "revise";
  reviewerB.responses[0].hard_dimension_results.semantic_fidelity = "fail";
  reviewerB.responses[0].quality_dimension_scores.clarity = 2;
  reviewerB.responses[0].recommended_revision = "State the exact action and consequence.";
  const comparison = compareEnglishPilotSubmissions(packetValue, reviewerA, reviewerB, {
    reviewer_a: "a".repeat(64),
    reviewer_b: "b".repeat(64),
  });
  assert.equal(comparison.disposition_agreement.disagreement_count, 1);
  assert.equal(comparison.hard_dimension_agreement.semantic_fidelity.agreement_count, 99);
  assert.equal(comparison.quality_score_distance.clarity.mean_absolute_distance, 0.02);
  assert.equal(comparison.adjudication_count, 1);
  assert.deepEqual(comparison.adjudication_queue[0].hard_dimension_disagreements, ["semantic_fidelity"]);
  assert.deepEqual(comparison.adjudication_queue[0].quality_score_differences.clarity, {
    reviewer_a: 4,
    reviewer_b: 2,
  });
  assert.equal(comparison.adjudication_queue[0].adjudication_status, "pending");
});

test("rejects one person occupying both reviewer slots", () => {
  const packetValue = packet();
  const reviewerA = completeSubmission(packetValue, "reviewer-a", "reviewer.same");
  const reviewerB = completeSubmission(packetValue, "reviewer-b", "reviewer.same");
  assert.throws(
    () => compareEnglishPilotSubmissions(packetValue, reviewerA, reviewerB, {
      reviewer_a: "a".repeat(64),
      reviewer_b: "b".repeat(64),
    }),
    /reviewer_identity_not_independent/u,
  );
});

test("rejects a decisive response with a missing quality score", () => {
  const packetValue = packet();
  const reviewerA = completeSubmission(packetValue, "reviewer-a", "reviewer.alpha");
  reviewerA.responses[0].quality_dimension_scores.clarity = null;
  assert.throws(
    () => validateEnglishPilotSubmission(packetValue, reviewerA, "reviewer-a"),
    /required_quality_score/u,
  );
});

test("writes a create-only comparison report through the operator CLI", async (context) => {
  const temporary = await mkdtemp(path.join(tmpdir(), "contentmd-disagreement-comparison-"));
  context.after(() => rm(temporary, { recursive: true, force: true }));
  const packetValue = packet();
  const reviewerA = completeSubmission(packetValue, "reviewer-a", "reviewer.alpha");
  const reviewerB = completeSubmission(packetValue, "reviewer-b", "reviewer.beta");
  const packetPath = path.join(temporary, "packet.json");
  const reviewerAPath = path.join(temporary, "reviewer-a.json");
  const reviewerBPath = path.join(temporary, "reviewer-b.json");
  const outputPath = path.join(temporary, "comparison.json");
  await writeFile(packetPath, JSON.stringify(packetValue));
  await writeFile(reviewerAPath, JSON.stringify(reviewerA));
  await writeFile(reviewerBPath, JSON.stringify(reviewerB));
  const args = [
    new URL("./compare-content-design-disagreement-pilot.mjs", import.meta.url).pathname,
    "--packet", packetPath,
    "--reviewer-a", reviewerAPath,
    "--reviewer-b", reviewerBPath,
    "--out", outputPath,
  ];
  execFileSync(process.execPath, args, { stdio: "pipe" });
  const comparison = JSON.parse(await readFile(outputPath, "utf8"));
  assert.equal(comparison.comparison_status, "structurally_complete_qualification_unverified");
  assert.throws(
    () => execFileSync(process.execPath, args, { stdio: "pipe" }),
    /Command failed/u,
  );
});
