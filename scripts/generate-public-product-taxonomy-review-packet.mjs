#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { planPublicProductTaxonomyMigration } from "./plan-public-product-taxonomy-migration.mjs";

const EXACT_COVERAGE_SLOT_BY_JOURNEY = Object.freeze({
  "entry/onboarding": "entry_onboarding",
  "core task/commitment": "core_task_commitment",
  "pending/progress": "pending_progress",
  success: "success",
  "error/recovery": "error_recovery",
  "destructive/permission/support": "destructive_permission_support",
});

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function compareUnicodeScalar(left, right) {
  const leftPoints = Array.from(left, (character) => character.codePointAt(0));
  const rightPoints = Array.from(right, (character) => character.codePointAt(0));
  const limit = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < limit; index += 1) {
    if (leftPoints[index] !== rightPoints[index]) return leftPoints[index] < rightPoints[index] ? -1 : 1;
  }
  return leftPoints.length === rightPoints.length ? 0 : leftPoints.length < rightPoints.length ? -1 : 1;
}

function workUnitFor(candidate) {
  const coverageSlotId = EXACT_COVERAGE_SLOT_BY_JOURNEY[candidate.raw_signature.journey] ?? null;
  return {
    work_unit_id: candidate.candidate_id,
    raw_signature: candidate.raw_signature,
    evidence_refs: candidate.evidence_refs,
    deterministic_coverage_slot_candidate: coverageSlotId === null ? null : {
      coverage_slot_id: coverageSlotId,
      rule_id: "exact_raw_journey_to_frozen_coverage_slot/0.1.0",
      confidence: 1,
      rationale: "Exact raw journey string matches one frozen coverage-slot bootstrap label; no other normalized coordinate is proposed.",
    },
    required_reviewer_roles: ["qualified_content_designer", "taxonomy_steward"],
    required_checklist_version: "contentmd.public-product-review-checklist/0.1.0",
    required_checklist_items: [
      "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
      "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality",
      "localization_transferability", "rights_safe_abstraction",
    ],
    review_state: "unreviewed",
    classification_effect: "none",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
}

export async function generatePublicProductTaxonomyReviewPacket({ root }) {
  const migrationPlan = await planPublicProductTaxonomyMigration({ root });
  const reviewWorkUnits = migrationPlan.review_candidates.map(workUnitFor)
    .sort((left, right) => compareUnicodeScalar(left.work_unit_id, right.work_unit_id));
  const deterministicCoverageCandidates = reviewWorkUnits
    .filter((unit) => unit.deterministic_coverage_slot_candidate !== null);
  const preimage = {
    contract_version: "contentmd.public-product-taxonomy-review-packet/0.1.0",
    migration_plan_digest: migrationPlan.plan_digest,
    active_taxonomy_ref: null,
    required_mapping_review_tuple: ["qualified_content_designer", "taxonomy_steward"],
    required_taxonomy_version_review_tuple: ["qualified_content_designer", "taxonomy_steward"],
    raw_signature_count: reviewWorkUnits.length,
    evidence_ref_count: reviewWorkUnits.reduce((count, unit) => count + unit.evidence_refs.length, 0),
    deterministic_coverage_slot_candidate_count: deterministicCoverageCandidates.length,
    unproposed_normalized_coordinate_count: reviewWorkUnits.length,
    review_work_units: reviewWorkUnits,
    review_state: "unreviewed",
    classification_effect: "none",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return { ...preimage, packet_digest: digest(preimage) };
}

export async function writePublicProductTaxonomyReviewPacket({ root, output }) {
  const packet = await generatePublicProductTaxonomyReviewPacket({ root });
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, `${JSON.stringify(packet, null, 2)}\n`, "utf8");
  return packet;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const rootIndex = process.argv.indexOf("--root");
  const outputIndex = process.argv.indexOf("--out");
  if (outputIndex < 0 || process.argv[outputIndex + 1] === undefined) {
    process.stderr.write("--out is required\n");
    process.exitCode = 1;
  } else {
    try {
      const packet = await writePublicProductTaxonomyReviewPacket({
        root: rootIndex < 0 ? "research/09-experimental/public-product-corpus" : process.argv[rootIndex + 1],
        output: process.argv[outputIndex + 1],
      });
      process.stdout.write(`${JSON.stringify({ packet_digest: packet.packet_digest, raw_signature_count: packet.raw_signature_count, deterministic_coverage_slot_candidate_count: packet.deterministic_coverage_slot_candidate_count })}\n`);
    } catch (error) {
      process.stderr.write(`${error.stack ?? error.message}\n`);
      process.exitCode = 1;
    }
  }
}
