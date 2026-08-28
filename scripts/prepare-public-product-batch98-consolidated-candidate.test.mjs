#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const root = "research/09-experimental/public-product-corpus/remediation/batch-98-consolidated-review-candidate";

test("batch 98 consolidates all current evidence without granting authority", async () => {
  const run = spawnSync(process.execPath, ["scripts/prepare-public-product-batch98-consolidated-candidate.mjs"], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr);
  const manifest = JSON.parse(await readFile(`${root}/manifest.json`, "utf8"));
  const report = JSON.parse(await readFile(`${root}/isolated-verification-report.json`, "utf8"));
  assert.equal(manifest.source_count, 513);
  assert.equal(manifest.observation_count, 446);
  assert.equal(manifest.isolated_projection_verification.unexpected_candidate_error_count, 0);
  assert.equal(manifest.isolated_projection_verification.expected_taxonomy_unmapped_count, 6);
  assert.equal(manifest.activation_boundary.mutation_performed, false);
  assert.equal(manifest.authority_effect, "none");
  assert.equal(report.coverage_counts.direct_observed_slots, 226);
  assert.equal(report.errors.filter(({ code }) => code === "taxonomy_unmapped").length, 6);
  assert.equal(report.errors.filter(({ code }) => ["missing_source", "duplicate_canonical_url", "rights_boundary", "taxonomy_invalid"].includes(code)).length, 0);
});
