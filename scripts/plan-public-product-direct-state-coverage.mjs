#!/usr/bin/env node

import { createHash } from "node:crypto";
import { readFile, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const args = process.argv.slice(2);
const value = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const values = (name) => args.flatMap((item, index) => item === name ? [args[index + 1]] : []);

const reportPath = value("--report");
const root = value(
  "--root",
  "research/09-experimental/public-product-corpus",
);
const outputPath = value(
  "--output",
  "research/09-experimental/public-product-corpus/remediation/2026-08-27-direct-state-coverage-backlog.json",
);
const projectionBatchRoots = values("--projection-batch-root");

if (!reportPath) {
  throw new Error("Usage: plan-public-product-direct-state-coverage.mjs --report <verifier-report.json> [--output <path>]");
}

const report = JSON.parse(await readFile(reportPath, "utf8"));
const diagnostic = report.v2_diagnostic ?? report;
const target = 5;
const coverageSlots = [
  "entry_onboarding",
  "core_task_commitment",
  "pending_progress",
  "success",
  "error_recovery",
  "destructive_permission_support",
];
const taxonomy = JSON.parse(await readFile(path.join(root, "experience-taxonomy.json"), "utf8"));
const mappingBySignature = new Map(
  taxonomy.mappings.map((mapping) => [JSON.stringify(mapping.raw_signature), mapping.normalized_signature.coverage_slot_id]),
);
const mappingCountBySlot = new Map(coverageSlots.map((slot) => [slot, 0]));
for (const mapping of taxonomy.mappings) {
  const slot = mapping.normalized_signature.coverage_slot_id;
  mappingCountBySlot.set(slot, (mappingCountBySlot.get(slot) ?? 0) + 1);
}
const batchRoots = projectionBatchRoots.length === 0
  ? (await readdir(root, { withFileTypes: true }))
    .filter((entry) => {
      const match = /^(\d{4}-\d{2}-\d{2})-batch-(\d+)$/u.exec(entry.name);
      return entry.isDirectory() && match !== null && Number(match[2]) >= 77;
    })
    .map((entry) => path.join(root, entry.name))
    .sort()
  : projectionBatchRoots.map((directory) => path.resolve(directory));
const actualUiSourceIds = new Set();
const actualUiUrlsByProduct = new Map();
for (const batchRoot of batchRoots) {
  const raw = await readFile(path.join(batchRoot, "sources.jsonl"), "utf8");
  for (const line of raw.trimEnd().split("\n")) {
    const source = JSON.parse(line);
    if (source.source_class === "actual UI") {
      actualUiSourceIds.add(source.source_id);
      const key = `${source.company}\0${source.product_system}`;
      const urls = actualUiUrlsByProduct.get(key) ?? new Set();
      urls.add(source.canonical_url);
      actualUiUrlsByProduct.set(key, urls);
    }
  }
}
const slotsByProduct = new Map();
for (const batchRoot of batchRoots) {
  const raw = await readFile(path.join(batchRoot, "observations.jsonl"), "utf8");
  for (const line of raw.trimEnd().split("\n")) {
    const observation = JSON.parse(line);
    if (observation.observed_vs_inferred !== "observed_ui"
      || !actualUiSourceIds.has(observation.source_id)) continue;
    const signature = JSON.stringify({
      journey: observation.journey,
      event_state: observation.event_state,
      content_slot_type: observation.content_slot_type,
      surface_channel: observation.surface_channel,
    });
    const slot = mappingBySignature.get(signature);
    if (slot === undefined) continue;
    const key = `${observation.company}\0${observation.product_system}`;
    const slots = slotsByProduct.get(key) ?? new Set();
    slots.add(slot);
    slotsByProduct.set(key, slots);
  }
}
const directStateErrors = (diagnostic.errors ?? []).filter(
  (error) => error.code === "insufficient_direct_states",
);

const items = directStateErrors.map((error) => {
  const match = /^(\d+) is below target (\d+)$/.exec(error.detail);
  if (!match) throw new Error(`Unexpected direct-state detail: ${error.detail}`);
  const [company, product] = error.location.split(" / ", 2);
  const currentDirectStates = Number(match[1]);
  const observedSlots = slotsByProduct.get(`${company}\0${product}`) ?? new Set();
  const coveredSlots = coverageSlots.filter((slot) => observedSlots.has(slot));
  const missingSlots = coverageSlots.filter((slot) => !observedSlots.has(slot));
  const prioritizedMissingSlots = [...missingSlots].sort((left, right) =>
    (mappingCountBySlot.get(right) ?? 0) - (mappingCountBySlot.get(left) ?? 0)
      || coverageSlots.indexOf(left) - coverageSlots.indexOf(right));
  if (coveredSlots.length !== currentDirectStates) {
    throw new Error(`Coverage mismatch for ${error.location}: verifier=${currentDirectStates}, derived=${coveredSlots.length}`);
  }
  return {
    company,
    product,
    current_direct_states: currentDirectStates,
    direct_states_needed: Number(match[2]) - currentDirectStates,
    covered_slot_ids: coveredSlots,
    missing_slot_ids: missingSlots,
    missing_slot_taxonomy_support: Object.fromEntries(
      missingSlots.map((slot) => [slot, { reviewed_mapping_count: mappingCountBySlot.get(slot) ?? 0 }]),
    ),
    next_collection_slot_ids: prioritizedMissingSlots.slice(0, Number(match[2]) - currentDirectStates),
    existing_actual_ui_source_urls: [...(actualUiUrlsByProduct.get(`${company}\0${product}`) ?? [])].sort(),
    evidence_requirement: "directly observed actual UI with a resolvable source",
    permitted_action: "collect and submit a new immutable evidence batch for independent review",
    prohibited_shortcuts: [
      "infer UI states from marketing or guidance pages",
      "duplicate one state or URL to increase coverage",
      "invent, paraphrase, or backfill unavailable interface copy",
      "treat WebMCP output as approval or mutation authority",
    ],
  };
});

items.sort(
  (a, b) =>
    a.direct_states_needed - b.direct_states_needed ||
    a.company.localeCompare(b.company) ||
    a.product.localeCompare(b.product),
);

const withoutDigest = {
  schema_version: "1.0.0",
  artifact_type: "public_product_direct_state_coverage_backlog",
  as_of: diagnostic.as_of ?? "2026-08-27",
  source_report_digest: diagnostic.report_digest ?? null,
  authority_effect: "none",
  status: "collection_required",
  target_direct_states_per_product: target,
  product_count: items.length,
  total_direct_states_needed: items.reduce((sum, item) => sum + item.direct_states_needed, 0),
  priority_bands: {
    near_complete: items.filter((item) => item.direct_states_needed <= 2).length,
    partial: items.filter((item) => item.current_direct_states > 0 && item.direct_states_needed > 2).length,
    no_direct_evidence: items.filter((item) => item.current_direct_states === 0).length,
  },
  ordering: "fewest direct states needed, then company and product",
  items,
};
const digest = createHash("sha256")
  .update(JSON.stringify(withoutDigest))
  .digest("hex");
const output = { ...withoutDigest, artifact_digest: digest };

await writeFile(path.resolve(outputPath), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify({ output: outputPath, product_count: items.length, total_direct_states_needed: output.total_direct_states_needed, artifact_digest: digest }, null, 2));
