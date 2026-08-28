#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const artifactPath = "research/09-experimental/public-product-corpus/remediation/2026-08-27-post-taxonomy-proposal-coverage-preview.json";

test("proposed taxonomy preview is deterministic and grants no authority", async () => {
  const run = () => spawnSync(process.execPath, ["scripts/preview-public-product-proposed-taxonomy-coverage.mjs"], { encoding: "utf8" });
  const first = run();
  assert.equal(first.status, 0, first.stderr);
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));
  assert.equal(artifact.proposed_mapping_count, 8);
  assert.equal(artifact.metrics_with_active_taxonomy.direct_observed_slots, 239);
  assert.equal(artifact.metrics_if_all_proposals_pass.direct_observed_slots, 258);
  assert.equal(artifact.metrics_with_active_taxonomy.products_meeting_five_state_target, 4);
  assert.equal(artifact.metrics_if_all_proposals_pass.products_meeting_five_state_target, 9);
  assert.equal(artifact.metrics_if_all_proposals_pass.total_direct_states_needed, 622);
  assert.equal(artifact.mutation_performed, false);
  assert.equal(artifact.authority_effect, "none");
  const expected = new Map([
    ["1Password security", 5],
    ["Headspace wellbeing", 5],
    ["Cleveland Clinic care access", 5],
    ["Khan Academy learning", 5],
    ["Statuspage", 4],
    ["Aflac supplemental insurance", 4],
    ["Cisco Duo identity security", 4],
    ["YubiKey authentication", 5],
    ["Auth0 identity", 3],
    ["Cloudflare platform", 4],
    ["Canva", 3],
    ["Dropbox", 4],
    ["Etsy marketplace", 4],
    ["Spotify music", 4],
    ["eBay marketplace", 4],
    ["Webflow", 4],
  ]);
  for (const item of artifact.affected_products) assert.equal(item.direct_state_count_after, expected.get(item.product_system));
  assert.equal(artifact.affected_products.length, expected.size);
  const second = run();
  assert.equal(second.status, 0, second.stderr);
  const rerun = JSON.parse(await readFile(artifactPath, "utf8"));
  assert.equal(rerun.artifact_digest, artifact.artifact_digest);
});
