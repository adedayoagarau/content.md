#!/usr/bin/env node
import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";

const hash = (value) => createHash("sha256").update(JSON.stringify(value)).digest("hex");
const stable = (value) => Array.isArray(value) ? value.map(stable) : value !== null && typeof value === "object"
  ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable(value[key])])) : value;
const canonicalHash = (value) => hash(stable(value));
const withoutDigest = (value, key) => { const copy = structuredClone(value); delete copy[key]; return copy; };
const checklistItems = ["definition_completeness", "semantic_id_stability", "mapping_set_completeness", "previous_version_compatibility", "effective_time_validity", "review_closure", "no_authority_or_learning_widening"];

const root = "research/09-experimental/public-product-corpus";
const v2 = JSON.parse(await readFile(`${root}/taxonomy-mapping-reconciliation-v2.json`, "utf8"));
if (canonicalHash(withoutDigest(v2, "reconciliation_digest")) !== v2.reconciliation_digest) throw new Error("invalid_v2_reconciliation_digest");

const reviewFiles = {
  Ade: `${root}/reviewer-assignments/ade-remediation-mapping-review.reviewed.json`,
  Ola: `${root}/reviewer-assignments/ola-remediation-mapping-review.reviewed.json`,
};
const reviews = {};
for (const [reviewer, file] of Object.entries(reviewFiles)) {
  const review = JSON.parse(await readFile(file, "utf8"));
  if (hash(withoutDigest(review, "assignment_digest")) !== review.assignment_digest) throw new Error(`invalid_review_digest:${reviewer}`);
  if (review.review_state !== "completed" || review.work_units.length !== 30 || review.work_units.some((unit) => unit.decision !== "pass" || unit.checklist_results.some((item) => item.status !== "pass"))) throw new Error(`incomplete_review:${reviewer}`);
  reviews[reviewer] = review;
}
const targets = new Set(v2.work_units.filter((unit) => unit.resolution_status === "resolved_pending_targeted_reapproval").map((unit) => unit.work_unit_id));
for (const review of Object.values(reviews)) {
  const reviewed = new Set(review.work_units.map((unit) => unit.work_unit_id));
  if (reviewed.size !== targets.size || [...targets].some((id) => !reviewed.has(id))) throw new Error("remediation_scope_mismatch");
}

const finalPreimage = {
  ...withoutDigest(v2, "reconciliation_digest"),
  contract_version: "contentmd.public-product-taxonomy-reconciliation/0.3.0",
  supersedes_reconciliation_digest: v2.reconciliation_digest,
  remediation_reviews: Object.values(reviews).map((review) => ({ reviewer_id: review.reviewer_id, reviewer_role: review.reviewer_role, assignment_id: review.assignment_id, assignment_digest: review.assignment_digest, pass_count: 30, attestation_provenance: review.attestation_provenance })),
  resolution_summary: { ...v2.resolution_summary, targeted_reapproval_required_count: 0, targeted_reapproval_passed_count: 30 },
  work_units: v2.work_units.map((unit) => targets.has(unit.work_unit_id) ? { ...unit, resolution_status: "resolved", resolution_basis: "targeted_reapproval_passed" } : unit),
  mapping_closure: "complete",
  taxonomy_version_review_state: "completed_relayed_attestations_unverified",
};
const finalReconciliation = { ...finalPreimage, reconciliation_digest: canonicalHash(finalPreimage) };
await writeFile(`${root}/taxonomy-mapping-reconciliation-final.json`, `${JSON.stringify(finalReconciliation, null, 2)}\n`);

for (const [reviewer, role] of [["Ade", "qualified_content_designer"], ["Ola", "taxonomy_steward"]]) {
  const identity = { contract_version: "contentmd.public-product-taxonomy-version-review/0.1.0", reconciliation_digest: finalReconciliation.reconciliation_digest, reviewer_id: reviewer, reviewer_role: role };
  const preimage = {
    ...identity,
    review_id: `taxonomy-version-review.${hash(identity)}`,
    checklist_version: "contentmd.public-product-review-checklist.taxonomy-version/0.1.0",
    checklist_results: checklistItems.map((item) => ({ item, status: "pass" })),
    decision: "pass",
    rationale: "All closed taxonomy definitions, semantic identifiers, 343 reconciled mappings, compatibility boundary, effective-time boundary, review closure, and authority restrictions are approved as relayed by the workspace user.",
    review_state: "completed",
    attestation_provenance: { assertion: "Approve all", relayed_by: "workspace_user", recorded_on: "2026-08-26", identity_verification: "not_performed", qualification_verification: "not_performed", independence_verification: "not_performed" },
    authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false,
  };
  const output = `${root}/reviewer-assignments/${reviewer.toLowerCase()}-taxonomy-version-review.reviewed.json`;
  await writeFile(output, `${JSON.stringify({ ...preimage, review_digest: hash(preimage) }, null, 2)}\n`);
}
process.stdout.write(`${JSON.stringify({ reconciliation_digest: finalReconciliation.reconciliation_digest, mapping_count: finalReconciliation.work_units.length, mapping_closure: finalReconciliation.mapping_closure, taxonomy_version_review_state: finalReconciliation.taxonomy_version_review_state })}\n`);
