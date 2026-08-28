import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { generatePublicProductTaxonomyReviewerAssignment } from "./generate-public-product-taxonomy-review-assignments.mjs";

test("binds an unreviewed taxonomy queue to one reviewer without creating a decision", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-taxonomy-review-assignment-"));
  const batch = path.join(root, "2026-08-24-batch-01");
  await mkdir(batch);
  await writeFile(path.join(batch, "observations.jsonl"), `${JSON.stringify({
    observation_id: "o1",
    journey: "success",
    event_state: "ready",
    content_slot_type: "confirmation",
    surface_channel: "web",
  })}\n`);
  try {
    const assignment = await generatePublicProductTaxonomyReviewerAssignment({
      root,
      reviewerId: "Ade",
      reviewerRole: "qualified_content_designer",
    });
    assert.equal(assignment.reviewer_id, "Ade");
    assert.equal(assignment.reviewer_role, "qualified_content_designer");
    assert.equal(assignment.work_units.length, 1);
    assert.deepEqual(assignment.work_units[0].proposed_normalized_signature, {
      coverage_slot_id: "success",
      journey_family_id: null,
      state_class_id: null,
      content_slot_class_id: null,
      surface_channel_id: null,
    });
    assert.equal(assignment.work_units[0].proposal_state, "partial_deterministic");
    assert.deepEqual(assignment.work_units[0].reviewer_actions_required, [
      "inspect_evidence_refs",
      "complete_normalized_signature",
      "complete_checklist",
      "record_rationale_and_counterexamples",
      "record_decision",
    ]);
    assert.equal(assignment.work_units[0].decision, null);
    assert.equal(assignment.work_units[0].checklist_results.length, 10);
    assert.ok(assignment.work_units[0].checklist_results.every((item) => item.status === null));
    assert.equal(assignment.review_state, "unreviewed");
    assert.equal(assignment.authority_effect, "none");
    assert.equal(assignment.training_eligibility, "never");
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
