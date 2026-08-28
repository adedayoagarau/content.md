#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("research/09-experimental/public-product-corpus");
const candidateRoots = [
  path.join(root, "remediation/batch-91-consolidated-review-candidate"),
  path.join(root, "remediation/batch-92-review-candidate"),
];
const output = path.join(root, "remediation/2026-08-27-product-system-fragmentation-review-candidate.json");
const aliases = [
  ["1Password", "1Password account recovery", "1Password security"],
  ["Adobe", "Adobe creative cloud", "Adobe Creative Cloud"],
  ["Airbnb", "Airbnb travel entry", "Airbnb travel"],
  ["Asana", "Asana pricing", "Asana"],
  ["Asana", "Asana support", "Asana"],
  ["Atlassian", "Jira pricing", "Jira"],
  ["Canva", "Canva cancel and refund", "Canva"],
  ["Canva", "Canva pricing", "Canva"],
  ["Canva", "Canva support", "Canva"],
  ["Cloudflare", "Cloudflare pricing", "Cloudflare platform"],
  ["Figma", "Figma community entry", "Figma"],
  ["Figma", "Figma design", "Figma"],
  ["Figma", "Figma plans", "Figma"],
  ["Figma", "Figma pricing", "Figma"],
  ["Google Workspace", "Google Workspace support", "Google Workspace"],
  ["Mailchimp", "Mailchimp pricing", "Mailchimp marketing"],
  ["Miro", "Miro pricing", "Miro"],
  ["monday.com", "monday.com pricing", "monday.com"],
  ["Notion", "Notion pricing", "Notion"],
  ["Okta", "Okta pricing", "Okta identity"],
  ["Revolut", "Revolut plans", "Revolut banking"],
  ["Shopify", "Shopify commerce entry", "Shopify commerce"],
  ["Shopify", "Shopify pricing", "Shopify commerce"],
  ["Shopify", "Shopify support", "Shopify commerce"],
  ["Slack", "Slack entry", "Slack"],
  ["Slack", "Slack pricing", "Slack"],
  ["Trello", "Trello pricing", "Trello"],
  ["Verizon", "Verizon disconnect", "Verizon service"],
  ["Verizon", "Verizon support", "Verizon service"],
  ["Wise", "Wise pricing", "Wise money transfer"],
  ["Zoom", "Zoom Workplace pricing", "Zoom Workplace"],
];

const readJsonl = async (file) => (await readFile(file, "utf8")).trimEnd().split("\n").map(JSON.parse);
const sources = (await Promise.all(candidateRoots.map((directory) => readJsonl(path.join(directory, "sources.jsonl"))))).flat();
const observations = (await Promise.all(candidateRoots.map((directory) => readJsonl(path.join(directory, "observations.jsonl"))))).flat();
const taxonomy = JSON.parse(await readFile(path.join(root, "experience-taxonomy.json"), "utf8"));
const mappingBySignature = new Map(taxonomy.mappings.map((mapping) => [
  JSON.stringify(mapping.raw_signature),
  mapping.normalized_signature.coverage_slot_id,
]));
const aliasByKey = new Map(aliases.map(([company, from, to]) => [`${company}\0${from}`, to]));
const existingProducts = new Set(sources.map(({ company, product_system }) => `${company}\0${product_system}`));
for (const [company, from, to] of aliases) {
  if (!existingProducts.has(`${company}\0${from}`)) throw new Error(`missing alias source: ${company} / ${from}`);
  if (!existingProducts.has(`${company}\0${to}`)) throw new Error(`missing canonical target: ${company} / ${to}`);
  if (from === to) throw new Error(`self alias: ${company} / ${from}`);
}
const canonicalProduct = (company, product) => aliasByKey.get(`${company}\0${product}`) ?? product;
const slots = (reconcile) => {
  const actualSources = new Set(sources.filter(({ source_class }) => source_class === "actual UI").map(({ source_id }) => source_id));
  const byProduct = new Map();
  for (const observation of observations) {
    if (observation.observed_vs_inferred !== "observed_ui" || !actualSources.has(observation.source_id)) continue;
    const signature = JSON.stringify({
      journey: observation.journey,
      event_state: observation.event_state,
      content_slot_type: observation.content_slot_type,
      surface_channel: observation.surface_channel,
    });
    const slot = mappingBySignature.get(signature);
    if (slot === undefined) continue;
    const product = reconcile ? canonicalProduct(observation.company, observation.product_system) : observation.product_system;
    const key = `${observation.company}\0${product}`;
    const set = byProduct.get(key) ?? new Set();
    set.add(slot);
    byProduct.set(key, set);
  }
  return byProduct;
};
const before = slots(false);
const after = slots(true);
const productKeysBefore = new Set(sources.map(({ company, product_system }) => `${company}\0${product_system}`));
const productKeysAfter = new Set(sources.map(({ company, product_system }) => `${company}\0${canonicalProduct(company, product_system)}`));
const resultRows = aliases.map(([company, from, to]) => {
  const fromSlots = [...(before.get(`${company}\0${from}`) ?? [])].sort();
  const targetSlotsBefore = [...(before.get(`${company}\0${to}`) ?? [])].sort();
  const targetSlotsAfter = [...(after.get(`${company}\0${to}`) ?? [])].sort();
  return {
    company,
    from_product_system: from,
    canonical_product_system: to,
    rationale: "source label names a pricing, support, entry, recovery, feature, or casing variant rather than an independently identifiable named product",
    source_row_count: sources.filter((row) => row.company === company && row.product_system === from).length,
    observation_row_count: observations.filter((row) => row.company === company && row.product_system === from).length,
    from_direct_slot_ids: fromSlots,
    canonical_direct_slot_ids_before: targetSlotsBefore,
    canonical_direct_slot_ids_after: targetSlotsAfter,
    direct_slot_gain_at_canonical_product: targetSlotsAfter.length - targetSlotsBefore.length,
  };
});
const metrics = (keys, slotMap) => ({
  product_count: keys.size,
  products_below_five_direct_states: [...keys].filter((key) => (slotMap.get(key)?.size ?? 0) < 5).length,
  products_meeting_five_direct_states: [...keys].filter((key) => (slotMap.get(key)?.size ?? 0) >= 5).length,
  total_direct_slots: [...keys].reduce((sum, key) => sum + (slotMap.get(key)?.size ?? 0), 0),
});
const withoutDigest = {
  schema_version: "1.0.0",
  artifact_type: "public_product_system_fragmentation_review_candidate",
  as_of: "2026-08-27",
  status: "independent_review_required",
  corpus_rule: "rows, pages, raw industry labels, translations, and minor product variants do not substitute for product breadth",
  scope: "non-mutating canonical product-identity proposal over the batch-91 plus batch-92 projection",
  proposed_alias_count: resultRows.length,
  metrics_before: metrics(productKeysBefore, before),
  metrics_after: metrics(productKeysAfter, after),
  proposed_aliases: resultRows,
  reviewer_boundary: "review every alias independently; reject any source label that represents an independently identifiable named product or system",
  mutation_performed: false,
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};
const artifactDigest = createHash("sha256").update(JSON.stringify(withoutDigest)).digest("hex");
await writeFile(output, `${JSON.stringify({ ...withoutDigest, artifact_digest: artifactDigest }, null, 2)}\n`);
console.log(JSON.stringify({ output, ...withoutDigest.metrics_before, projected: withoutDigest.metrics_after, proposed_alias_count: aliases.length, artifact_digest: artifactDigest }, null, 2));
