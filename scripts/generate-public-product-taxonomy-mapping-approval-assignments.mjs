#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";

const ROLES = new Set(["qualified_content_designer", "taxonomy_steward"]);
const CHECKLIST_ITEMS = Object.freeze([
  "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
  "content_slot_fit", "channel_fit", "counterexample_sufficiency", "industry_neutrality",
  "localization_transferability", "rights_safe_abstraction",
]);

function digest(value) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

function stable(value) {
  if (Array.isArray(value)) return value.map(stable);
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])]));
  }
  return value;
}

function invalid(reason) {
  throw new TypeError(`public_product_taxonomy_mapping_approval_assignment_invalid:${reason}`);
}

export async function generatePublicProductTaxonomyMappingApprovalAssignment({ reconciliationPath, reviewerId, reviewerRole }) {
  if (typeof reviewerId !== "string" || reviewerId.trim() !== reviewerId || reviewerId.length === 0) invalid("reviewer_id");
  if (!ROLES.has(reviewerRole)) invalid("reviewer_role");
  const reconciliation = JSON.parse(await readFile(reconciliationPath, "utf8"));
  if (reconciliation.contract_version !== "contentmd.public-product-taxonomy-reconciliation/0.1.0") invalid("reconciliation_contract");
  const preimage = structuredClone(reconciliation);
  const reconciliationDigest = preimage.reconciliation_digest;
  delete preimage.reconciliation_digest;
  if (digest(stable(preimage)) !== reconciliationDigest) invalid("reconciliation_digest");
  if (reconciliation.mapping_closure !== "complete" || reconciliation.work_units.some((unit) => unit.resolution_status !== "resolved")) invalid("mapping_closure");

  const identity = {
    contract_version: "contentmd.public-product-taxonomy-mapping-approval-assignment/0.1.0",
    source_packet_digest: reconciliation.source_packet_digest,
    reconciliation_digest: reconciliationDigest,
    reviewer_id: reviewerId,
    reviewer_role: reviewerRole,
  };
  const assignment = {
    ...identity,
    assignment_id: `taxonomy-mapping-approval-assignment.${digest(identity)}`,
    taxonomy_definition_digests: Object.fromEntries(Object.entries(reconciliation.taxonomy_definitions).map(([key, definitions]) => [key, definitions.map((item) => item.definition_digest)])),
    work_units: reconciliation.work_units.map((unit) => ({
      work_unit_id: unit.work_unit_id,
      raw_signature: unit.raw_signature,
      evidence_refs: unit.evidence_refs,
      proposed_normalized_signature: unit.final_normalized_signature,
      reconciliation_context: {
        resolution_basis: unit.resolution_basis,
        source_correction_required: unit.source_correction_required,
        source_disposition: unit.source_disposition,
        counterexample_refs: unit.counterexample_refs,
        remaining_evidence_gap: unit.remaining_evidence_gap,
      },
      reviewer_actions_required: [
        "inspect_evidence_refs",
        "verify_reconciled_normalized_signature",
        "complete_checklist",
        "record_rationale_and_counterexamples",
        "record_decision",
      ],
      checklist_version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0",
      checklist_results: CHECKLIST_ITEMS.map((item) => ({ item, status: null })),
      decision: null,
      rationale: null,
      counterexample_refs: [],
    })),
    review_state: "unreviewed",
    authority_effect: "none",
    prompt_eligibility: "never",
    training_eligibility: "never",
    benchmark_eligibility: false,
  };
  return { ...assignment, assignment_digest: digest(assignment) };
}

export async function writePublicProductTaxonomyMappingApprovalAssignment(input) {
  const assignment = await generatePublicProductTaxonomyMappingApprovalAssignment(input);
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
    const assignment = await writePublicProductTaxonomyMappingApprovalAssignment({
      reconciliationPath: value("--reconciliation") ?? "research/09-experimental/public-product-corpus/taxonomy-mapping-reconciliation.json",
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
