#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("research/09-experimental/public-product-corpus");
const remediation = path.join(root, "remediation");
const candidateNames = [
  "batch-79-review-candidate",
  "batch-91-consolidated-review-candidate",
  "batch-92-review-candidate",
  "batch-93-review-candidate",
  "batch-94-review-candidate",
  "batch-95-review-candidate",
  "batch-96-review-candidate",
  "batch-97-review-candidate",
  "batch-99-review-candidate",
  "batch-100-review-candidate",
  "batch-101-review-candidate",
  "batch-102-review-candidate",
  "batch-103-review-candidate",
  "batch-104-review-candidate",
  "batch-105-review-candidate",
  "batch-107-review-candidate",
  "batch-108-review-candidate",
  "batch-109-review-candidate",
];
const proposalFiles = [
  "batch-79-review-candidate/taxonomy-mapping-proposal.json",
  "batch-93-review-candidate/taxonomy-mapping-proposal.json",
  "batch-94-review-candidate/taxonomy-mapping-proposal.json",
  "batch-95-review-candidate/taxonomy-mapping-proposal.json",
  "batch-96-review-candidate/taxonomy-mapping-proposal-error.json",
  "batch-96-review-candidate/taxonomy-mapping-proposal-success.json",
  "batch-97-review-candidate/taxonomy-mapping-proposal.json",
  "batch-101-review-candidate/taxonomy-mapping-proposal.json",
];
const output = path.join(remediation, "2026-08-27-post-taxonomy-proposal-coverage-preview.json");
const readJsonl = async (file) => (await readFile(file, "utf8")).trimEnd().split("\n").map(JSON.parse);
const sources = (await Promise.all(candidateNames.map((name) => readJsonl(path.join(remediation, name, "sources.jsonl"))))).flat();
const observations = (await Promise.all(candidateNames.map((name) => readJsonl(path.join(remediation, name, "observations.jsonl"))))).flat();
const taxonomy = JSON.parse(await readFile(path.join(root, "experience-taxonomy.json"), "utf8"));
const proposals = await Promise.all(proposalFiles.map(async (file) => ({
  file: `remediation/${file}`,
  proposal: JSON.parse(await readFile(path.join(remediation, file), "utf8")),
})));
const signature = (value) => JSON.stringify({
  journey: value.journey,
  event_state: value.event_state,
  content_slot_type: value.content_slot_type,
  surface_channel: value.surface_channel,
});
const activeMappings = new Map(taxonomy.mappings.map((mapping) => [signature(mapping.raw_signature), mapping.normalized_signature.coverage_slot_id]));
const proposedMappings = new Map(activeMappings);
for (const { file, proposal } of proposals) {
  const key = signature(proposal.raw_signature);
  if (activeMappings.has(key)) throw new Error(`${file}: proposal duplicates an active mapping`);
  if (proposedMappings.has(key)) throw new Error(`${file}: proposal duplicates another proposal`);
  proposedMappings.set(key, proposal.proposed_normalized_signature.coverage_slot_id);
}
const actualUiSourceIds = new Set(sources.filter(({ source_class }) => source_class === "actual UI").map(({ source_id }) => source_id));
const productKeys = new Set(sources.map(({ company, product_system }) => `${company}\0${product_system}`));
const derive = (mappings) => {
  const slotsByProduct = new Map();
  for (const observation of observations) {
    if (observation.observed_vs_inferred !== "observed_ui" || !actualUiSourceIds.has(observation.source_id)) continue;
    const slot = mappings.get(signature(observation));
    if (slot === undefined) continue;
    const key = `${observation.company}\0${observation.product_system}`;
    const slots = slotsByProduct.get(key) ?? new Set();
    slots.add(slot);
    slotsByProduct.set(key, slots);
  }
  return slotsByProduct;
};
const active = derive(activeMappings);
const proposed = derive(proposedMappings);
const metrics = (map) => ({
  product_count: productKeys.size,
  direct_observed_slots: [...productKeys].reduce((sum, key) => sum + (map.get(key)?.size ?? 0), 0),
  products_with_direct_observations: [...productKeys].filter((key) => (map.get(key)?.size ?? 0) > 0).length,
  products_meeting_five_state_target: [...productKeys].filter((key) => (map.get(key)?.size ?? 0) >= 5).length,
  products_below_five_state_target: [...productKeys].filter((key) => (map.get(key)?.size ?? 0) < 5).length,
  total_direct_states_needed: [...productKeys].reduce((sum, key) => sum + Math.max(0, 5 - (map.get(key)?.size ?? 0)), 0),
});
const affectedKeys = [...productKeys].filter((key) => {
  const before = active.get(key) ?? new Set();
  const after = proposed.get(key) ?? new Set();
  return before.size !== after.size || [...before].some((slot) => !after.has(slot));
}).sort();
const affectedProducts = affectedKeys.map((key) => {
  const [company, product_system] = key.split("\0");
  const before = [...(active.get(key) ?? [])].sort();
  const after = [...(proposed.get(key) ?? [])].sort();
  return {
    company,
    product_system,
    direct_slot_ids_before: before,
    direct_slot_ids_after: after,
    direct_state_count_before: before.length,
    direct_state_count_after: after.length,
    meets_target_before: before.length >= 5,
    meets_target_after: after.length >= 5,
  };
});
const withoutDigest = {
  schema_version: "1.0.0",
  artifact_type: "public_product_proposed_taxonomy_coverage_preview",
  as_of: "2026-08-27",
  status: "non_authoritative_review_preview",
  candidate_projection: candidateNames.map((name) => `remediation/${name}`),
  proposal_refs: proposals.map(({ file }) => file),
  proposed_mapping_count: proposals.length,
  metrics_with_active_taxonomy: metrics(active),
  metrics_if_all_proposals_pass: metrics(proposed),
  affected_products: affectedProducts,
  governance_boundary: "This preview performs signature lookup only. It does not create mapping digests, reviews, receipts, a taxonomy version, evidence dispositions, activation, or coverage authority.",
  mutation_performed: false,
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};
const artifactDigest = createHash("sha256").update(JSON.stringify(withoutDigest)).digest("hex");
await writeFile(output, `${JSON.stringify({ ...withoutDigest, artifact_digest: artifactDigest }, null, 2)}\n`);
console.log(JSON.stringify({ output, proposed_mapping_count: proposals.length, ...withoutDigest.metrics_if_all_proposals_pass, affected_products: affectedProducts, artifact_digest: artifactDigest }, null, 2));
