#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { generatePublicProductTaxonomyReviewPacket } from "./generate-public-product-taxonomy-review-packet.mjs";

const ROLES = new Set(["qualified_content_designer", "taxonomy_steward"]);
const CHECKLIST_ITEMS = Object.freeze([
  "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
  "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality",
  "localization_transferability", "rights_safe_abstraction",
]);

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function invalid(reason) {
  throw new TypeError(`public_product_taxonomy_review_assignment_invalid:${reason}`);
}

export async function generatePublicProductTaxonomyReviewerAssignment({ root, reviewerId, reviewerRole }) {
  if (typeof reviewerId !== "string" || reviewerId.trim() !== reviewerId || reviewerId.length === 0) invalid("reviewer_id");
  if (!ROLES.has(reviewerRole)) invalid("reviewer_role");
  const packet = await generatePublicProductTaxonomyReviewPacket({ root });
  const workUnits = packet.review_work_units.map((unit) => {
    const coverageSlotId = unit.deterministic_coverage_slot_candidate?.coverage_slot_id ?? null;
    return {
      work_unit_id: unit.work_unit_id,
      raw_signature: unit.raw_signature,
      evidence_refs: unit.evidence_refs,
      deterministic_coverage_slot_candidate: unit.deterministic_coverage_slot_candidate,
      proposed_normalized_signature: {
        coverage_slot_id: coverageSlotId,
        journey_family_id: null,
        state_class_id: null,
        content_slot_class_id: null,
        surface_channel_id: null,
      },
      proposal_state: coverageSlotId === null ? "unproposed" : "partial_deterministic",
      reviewer_actions_required: [
        "inspect_evidence_refs",
        "complete_normalized_signature",
        "complete_checklist",
        "record_rationale_and_counterexamples",
        "record_decision",
      ],
      checklist_version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0",
      checklist_results: CHECKLIST_ITEMS.map((item) => ({ item, status: null })),
      decision: null,
      rationale: null,
      counterexample_refs: [],
    };
  });
  const identity = {
    contract_version: "contentmd.public-product-taxonomy-review-assignment/0.1.0",
    source_packet_digest: packet.packet_digest,
    reviewer_id: reviewerId,
    reviewer_role: reviewerRole,
  };
  const preimage = {
    ...identity,
    assignment_id: `taxonomy-review-assignment.${digest(identity)}`,
    work_units: workUnits,
    review_state: "unreviewed",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return { ...preimage, assignment_digest: digest(preimage) };
}

export async function writePublicProductTaxonomyReviewerAssignment(input) {
  const assignment = await generatePublicProductTaxonomyReviewerAssignment(input);
  await mkdir(path.dirname(input.output), { recursive: true });
  await writeFile(input.output, `${JSON.stringify(assignment, null, 2)}\n`, "utf8");
  return assignment;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const value = (flag) => {
    const index = process.argv.indexOf(flag);
    return index < 0 ? undefined : process.argv[index + 1];
  };
  try {
    const output = value("--out");
    if (output === undefined) invalid("out");
    const assignment = await writePublicProductTaxonomyReviewerAssignment({
      root: value("--root") ?? "research/09-experimental/public-product-corpus",
      reviewerId: value("--reviewer-id"),
      reviewerRole: value("--reviewer-role"),
      output,
    });
    process.stdout.write(`${JSON.stringify({ assignment_id: assignment.assignment_id, assignment_digest: assignment.assignment_digest, work_unit_count: assignment.work_units.length })}\n`);
  } catch (error) {
    process.stderr.write(`${error.stack ?? error.message}\n`);
    process.exitCode = 1;
  }
}
