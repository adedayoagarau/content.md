import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { planPublicProductTaxonomyMigration } from "./plan-public-product-taxonomy-migration.mjs";

test("emits deterministic raw-signature review candidates with no classification authority", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-taxonomy-migration-"));
  const batch = path.join(root, "2026-08-24-batch-01");
  await mkdir(batch);
  await writeFile(path.join(batch, "observations.jsonl"), [
    JSON.stringify({ observation_id: "o1", journey: "entry", event_state: "start", content_slot_type: "heading", surface_channel: "web" }),
    JSON.stringify({ observation_id: "o2", journey: "entry", event_state: "start", content_slot_type: "heading", surface_channel: "web" }),
  ].join("\n") + "\n");
  try {
    const plan = await planPublicProductTaxonomyMigration({ root });
    assert.equal(plan.raw_signature_count, 1);
    assert.equal(plan.review_candidates.length, 1);
    assert.equal(plan.review_candidates[0].proposed_signature, null);
    assert.equal(plan.authority_effect, "none");
    assert.equal(plan.prompt_eligibility, "never");
    assert.equal(plan.training_eligibility, "never");
  } finally { await rm(root, { recursive: true, force: true }); }
});
