import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { generatePublicProductTaxonomyMappingApprovalAssignment } from "./generate-public-product-taxonomy-mapping-approval-assignments.mjs";

const digest = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value !== null && typeof value === "object"
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;

test("binds a resolved reconciliation to an independent unreviewed approval assignment", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-taxonomy-mapping-approval-"));
  const reconciliationPath = path.join(root, "reconciliation.json");
  const definition = { definition_id: "entry", definition_digest: "definition-digest" };
  const preimage = {
    contract_version: "contentmd.public-product-taxonomy-reconciliation/0.1.0",
    source_packet_digest: "source-digest",
    taxonomy_definitions: { coverage_slots: [definition] },
    work_units: [{
      work_unit_id: "unit-1", raw_signature: { journey: "entry" }, evidence_refs: [{ record_id: "o1" }],
      final_normalized_signature: { coverage_slot_id: "entry", journey_family_id: "journey.entry", state_class_id: "state.ready", content_slot_class_id: "content.heading", surface_channel_id: "channel.web" },
      resolution_status: "resolved", resolution_basis: "reviewer_convergence", source_correction_required: false,
      source_disposition: "retain_immutable_evidence", counterexample_refs: [], remaining_evidence_gap: null,
    }],
    mapping_closure: "complete",
  };
  await writeFile(reconciliationPath, JSON.stringify({ ...preimage, reconciliation_digest: digest(stable(preimage)) }));
  try {
    const assignment = await generatePublicProductTaxonomyMappingApprovalAssignment({ reconciliationPath, reviewerId: "Ade", reviewerRole: "qualified_content_designer" });
    assert.equal(assignment.work_units.length, 1);
    assert.deepEqual(assignment.work_units[0].proposed_normalized_signature, preimage.work_units[0].final_normalized_signature);
    assert.equal(assignment.work_units[0].decision, null);
    assert.ok(assignment.work_units[0].checklist_results.every((item) => item.status === null));
    assert.equal(assignment.review_state, "unreviewed");
    assert.equal(assignment.authority_effect, "none");
    assert.equal(assignment.training_eligibility, "never");
    const assignmentPreimage = structuredClone(assignment); delete assignmentPreimage.assignment_digest;
    assert.equal(assignment.assignment_digest, digest(assignmentPreimage));
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
