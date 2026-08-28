#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import test from "node:test";

const artifact = "research/09-experimental/public-product-corpus/remediation/batch-106-canva-help-normalization-candidate/atomic-replacement-verification-report.json";

test("Canva Help Center normalization is atomic, clean, and non-authoritative", async () => {
  const run = spawnSync(process.execPath, ["scripts/preview-public-product-canva-help-normalization.mjs"], { encoding: "utf8" });
  assert.equal(run.status, 0, run.stderr || run.stdout);
  const report = JSON.parse(await readFile(artifact, "utf8"));
  const unexpected = report.errors.filter(({ code }) => !new Set(["company_target", "product_target", "industry_target", "insufficient_direct_states", "taxonomy_unmapped"]).has(code));
  assert.deepEqual(unexpected, []);
  assert.equal(report.errors.filter(({ code }) => code === "taxonomy_unmapped").length, 20);
  assert.equal(report.coverage_counts.mapped_observations, 454);
  assert.equal(report.coverage_counts.direct_observed_slots, 240);
  assert.equal(report.coverage_counts.products_meeting_direct_state_target, 4);
});
