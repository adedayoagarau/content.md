import assert from "node:assert/strict";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { generatePublicProductTaxonomyReviewPacket } from "./generate-public-product-taxonomy-review-packet.mjs";

test("creates unreviewed work units and proposes only exact frozen coverage slots", async () => {
  const root = await mkdtemp(path.join(os.tmpdir(), "contentmd-taxonomy-review-packet-"));
  const batch = path.join(root, "2026-08-24-batch-01");
  await mkdir(batch);
  await writeFile(path.join(batch, "observations.jsonl"), [
    JSON.stringify({ observation_id: "o1", journey: "success", event_state: "ready", content_slot_type: "confirmation", surface_channel: "web" }),
    JSON.stringify({ observation_id: "o2", journey: "entry/discovery", event_state: "landing", content_slot_type: "headline", surface_channel: "web" }),
  ].join("\n") + "\n");
  try {
    const packet = await generatePublicProductTaxonomyReviewPacket({ root });
    assert.equal(packet.raw_signature_count, 2);
    assert.equal(packet.evidence_ref_count, 2);
    assert.equal(packet.deterministic_coverage_slot_candidate_count, 1);
    const success = packet.review_work_units.find((unit) => unit.raw_signature.journey === "success");
    const entry = packet.review_work_units.find((unit) => unit.raw_signature.journey === "entry/discovery");
    assert.equal(success.deterministic_coverage_slot_candidate.coverage_slot_id, "success");
    assert.equal(entry.deterministic_coverage_slot_candidate, null);
    for (const unit of packet.review_work_units) {
      assert.equal(unit.review_state, "unreviewed");
      assert.equal(unit.classification_effect, "none");
      assert.equal(unit.prompt_eligibility, "never");
    }
  } finally {
    await rm(root, { recursive: true, force: true });
  }
});
