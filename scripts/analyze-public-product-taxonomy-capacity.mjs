#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const root = path.resolve(value("--root", "research/09-experimental/public-product-corpus"));
const backlogPath = path.resolve(value(
  "--backlog",
  "research/09-experimental/public-product-corpus/remediation/2026-08-27-post-batch-91-direct-state-coverage-backlog.json",
));
const outputPath = path.resolve(value(
  "--output",
  "research/09-experimental/public-product-corpus/remediation/2026-08-27-taxonomy-capacity-gap.json",
));
const [taxonomy, backlog] = await Promise.all([
  readFile(path.join(root, "experience-taxonomy.json"), "utf8").then(JSON.parse),
  readFile(backlogPath, "utf8").then(JSON.parse),
]);
const slots = [
  "entry_onboarding",
  "core_task_commitment",
  "pending_progress",
  "success",
  "error_recovery",
  "destructive_permission_support",
];
const mappingCount = Object.fromEntries(slots.map((slot) => [slot, 0]));
const mappingsBySlot = Object.fromEntries(slots.map((slot) => [slot, []]));
for (const mapping of taxonomy.mappings) {
  const slot = mapping.normalized_signature.coverage_slot_id;
  mappingCount[slot] += 1;
  mappingsBySlot[slot].push({
    mapping_id: mapping.mapping_id,
    raw_signature: mapping.raw_signature,
    normalized_signature: mapping.normalized_signature,
  });
}
const demand = Object.fromEntries(slots.map((slot) => [slot, {
  missing_product_count: 0,
  next_collection_product_count: 0,
  four_slot_product_count: 0,
}]));
for (const item of backlog.items) {
  for (const slot of item.missing_slot_ids) demand[slot].missing_product_count += 1;
  for (const slot of item.next_collection_slot_ids) demand[slot].next_collection_product_count += 1;
  if (item.current_direct_states === 4) {
    for (const slot of item.missing_slot_ids) demand[slot].four_slot_product_count += 1;
  }
}
const slotAnalysis = slots.map((slot) => ({
  coverage_slot_id: slot,
  reviewed_mapping_count: mappingCount[slot],
  ...demand[slot],
  missing_products_per_reviewed_mapping: Number((demand[slot].missing_product_count / mappingCount[slot]).toFixed(2)),
  capacity_risk: mappingCount[slot] <= 1 ? "critical" : mappingCount[slot] < 10 ? "high" : mappingCount[slot] < 50 ? "medium" : "lower",
  reviewed_mapping_candidates: mappingsBySlot[slot],
})).sort((left, right) =>
  right.four_slot_product_count - left.four_slot_product_count
  || right.missing_products_per_reviewed_mapping - left.missing_products_per_reviewed_mapping
  || left.coverage_slot_id.localeCompare(right.coverage_slot_id));
const fourSlotProducts = backlog.items.filter(({ current_direct_states }) => current_direct_states === 4).map((item) => ({
  company: item.company,
  product: item.product,
  missing_slot_ids: item.missing_slot_ids,
  existing_actual_ui_source_urls: item.existing_actual_ui_source_urls,
  required_evidence: "directly observed public UI state with an exact reviewed mapping, or a separately reviewed taxonomy amendment",
}));
const preimage = {
  schema_version: "1.0.0",
  artifact_type: "public_product_taxonomy_capacity_gap",
  source_backlog_digest: backlog.artifact_digest,
  authority_effect: "none",
  status: "taxonomy_and_collection_work_required",
  slot_analysis: slotAnalysis,
  four_slot_products: fourSlotProducts,
  findings: {
    success_mapping_capacity_is_critical: mappingCount.success === 1,
    pending_progress_mapping_capacity_is_high_risk: mappingCount.pending_progress < 10,
    automatic_relabeling_is_prohibited: true,
    amendment_requires_evidence_bound_independent_review: true,
  },
  permitted_next_actions: [
    "collect an actual UI state that matches an existing reviewed raw signature exactly",
    "when a legitimate observed state is unmapped, create an evidence-bound taxonomy amendment review packet",
    "retain products below threshold until five distinct canonical slots are proven",
  ],
  prohibited_shortcuts: [
    "generalize a narrow reviewed mapping to unrelated wording or states",
    "infer progress or success from instructional or marketing copy",
    "count multiple errors from one form as distinct canonical states",
    "activate a mapping amendment without independent governed review",
  ],
};
const artifact = {
  ...preimage,
  artifact_digest: createHash("sha256").update(JSON.stringify(preimage)).digest("hex"),
};
await writeFile(outputPath, `${JSON.stringify(artifact, null, 2)}\n`);
console.log(JSON.stringify({
  output: outputPath,
  four_slot_products: fourSlotProducts.length,
  slot_analysis: slotAnalysis,
  artifact_digest: artifact.artifact_digest,
}, null, 2));
