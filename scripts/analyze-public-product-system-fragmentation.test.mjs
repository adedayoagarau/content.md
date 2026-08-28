#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const artifactPath = "research/09-experimental/public-product-corpus/remediation/2026-08-27-product-system-fragmentation-review-candidate.json";

test("fragmentation analysis is deterministic, conservative, and non-mutating", async () => {
  const first = spawnSync(process.execPath, ["scripts/analyze-public-product-system-fragmentation.mjs"], { encoding: "utf8" });
  assert.equal(first.status, 0, first.stderr);
  const artifact = JSON.parse(await readFile(artifactPath, "utf8"));
  assert.equal(artifact.mutation_performed, false);
  assert.equal(artifact.authority_effect, "none");
  assert.equal(artifact.proposed_alias_count, 31);
  assert.equal(artifact.metrics_before.product_count, 176);
  assert.equal(artifact.metrics_after.product_count, 145);
  assert.equal(artifact.metrics_before.products_meeting_five_direct_states, 4);
  assert.equal(artifact.metrics_after.products_meeting_five_direct_states, 4);
  const sources = new Set(artifact.proposed_aliases.map(({ company, from_product_system }) => `${company}\0${from_product_system}`));
  assert.equal(sources.has("Slack\0Slack huddles"), false);
  assert.equal(sources.has("Shopify\0Shopify orders"), false);
  assert.equal(sources.has("Google Workspace\0Google Workspace export"), false);
  assert.equal(sources.has("Adobe\0Adobe creative cloud"), true);
  const second = spawnSync(process.execPath, ["scripts/analyze-public-product-system-fragmentation.mjs"], { encoding: "utf8" });
  assert.equal(second.status, 0, second.stderr);
  const rerun = JSON.parse(await readFile(artifactPath, "utf8"));
  assert.equal(rerun.artifact_digest, artifact.artifact_digest);
});
