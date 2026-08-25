import assert from "node:assert/strict";
import test from "node:test";

import {
  parseArguments,
  verifyPublicProductDiscoverySeeds,
} from "./verify-public-product-discovery-seeds.mjs";

const TAXONOMY = {
  contract_version: "contentmd.public-product-industry-taxonomy/0.1.0",
  industries: [
    { industry_id: "commerce", name: "Commerce", aliases: ["commerce"] },
    { industry_id: "education", name: "Education", aliases: ["education"] },
  ],
  authority_effect: "none",
};

const BASE_SEED = {
  seed_id: "seed.alpha",
  company: "Alpha Org",
  product_system: "Alpha Product",
  industry_alias: "commerce",
  entry_url: "https://alpha.example/product",
  region: "Latin America",
  priority_reason: "new regional marketplace coverage",
  discovered_at: "2026-08-24T00:00:00-07:00",
  status: "unverified_candidate",
  authority_effect: "none",
  prompt_eligibility: "never",
  training_eligibility: "never",
  benchmark_eligibility: false,
};

test("creates a deterministic non-evidence discovery queue prioritized by industry gap", () => {
  const seeds = [
    BASE_SEED,
    {
      ...BASE_SEED,
      seed_id: "seed.beta",
      company: "Beta Org",
      product_system: "Beta Learning",
      industry_alias: "education",
      entry_url: "https://beta.example/learn",
      region: "Africa",
      priority_reason: "new regional learning coverage",
    },
  ];
  const existingSources = [{
    company: "Existing Org",
    product_system: "Existing Store",
    canonical_url: "https://existing.example/",
    normalized_industry_id: "commerce",
  }];
  const report = verifyPublicProductDiscoverySeeds({
    seeds,
    existingSources,
    industryTaxonomy: TAXONOMY,
    asOf: "2026-08-24",
  });

  assert.equal(report.status, "pass");
  assert.deepEqual(report.discovery_queue.map((item) => ({
    priority_rank: item.priority_rank,
    company: item.company,
    product_system: item.product_system,
    normalized_industry_id: item.normalized_industry_id,
  })), [
    {
      priority_rank: 0,
      company: "Beta Org",
      product_system: "Beta Learning",
      normalized_industry_id: "education",
    },
    {
      priority_rank: 1,
      company: "Alpha Org",
      product_system: "Alpha Product",
      normalized_industry_id: "commerce",
    },
  ]);
  assert.equal(report.counts.candidate_companies, 2);
  assert.equal(report.counts.candidate_products, 2);
  assert.equal(report.counts.candidate_industries, 2);
  assert.equal(report.counts.corpus_products_added, 0);
  assert.equal(report.scheduling_eligible, true);
  assert.equal(report.authority_effect, "none");
  assert.equal(report.prompt_eligibility, "never");
  assert.equal(report.training_eligibility, "never");
  assert.equal(report.benchmark_eligibility, false);
  assert.match(report.report_digest, /^[0-9a-f]{64}$/u);
  assert.equal(Object.isFrozen(report.discovery_queue), true);
});

test("rejects candidates that duplicate an existing product or canonical URL", () => {
  const existingSources = [{
    company: BASE_SEED.company,
    product_system: BASE_SEED.product_system,
    canonical_url: BASE_SEED.entry_url,
    normalized_industry_id: "commerce",
  }];
  const report = verifyPublicProductDiscoverySeeds({
    seeds: [BASE_SEED],
    existingSources,
    industryTaxonomy: TAXONOMY,
    asOf: "2026-08-24",
  });
  assert.equal(report.status, "fail");
  assert.equal(report.scheduling_eligible, false);
  assert.ok(report.errors.some((error) => error.code === "existing_product"));
  assert.ok(report.errors.some((error) => error.code === "existing_canonical_url"));
  assert.deepEqual(report.discovery_queue, []);
});

test("fails closed on unknown industries and duplicate seed identities", () => {
  const invalidIndustry = { ...BASE_SEED, industry_alias: "invented sector" };
  const duplicate = { ...BASE_SEED };
  const report = verifyPublicProductDiscoverySeeds({
    seeds: [invalidIndustry, duplicate],
    existingSources: [],
    industryTaxonomy: TAXONOMY,
    asOf: "2026-08-24",
  });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "unmapped_industry"));
  assert.ok(report.errors.some((error) => error.code === "duplicate_seed_id"));
  assert.ok(report.errors.some((error) => error.code === "duplicate_candidate_product"));
  assert.ok(report.errors.some((error) => error.code === "duplicate_entry_url"));
});

test("rejects future seeds and any attempt to grant model or product authority", () => {
  const invalid = {
    ...BASE_SEED,
    discovered_at: "2026-08-26T00:00:00Z",
    authority_effect: "write",
    prompt_eligibility: "allowed",
    training_eligibility: "allowed",
    benchmark_eligibility: true,
  };
  const report = verifyPublicProductDiscoverySeeds({
    seeds: [invalid],
    existingSources: [],
    industryTaxonomy: TAXONOMY,
    asOf: "2026-08-24",
  });
  assert.equal(report.status, "fail");
  assert.ok(report.errors.some((error) => error.code === "future_seed"));
  assert.ok(report.errors.some((error) => error.code === "authority_boundary"));
});

test("parses an explicit discovery-seed verification command", () => {
  assert.deepEqual(parseArguments([
    "--root", "research/corpus",
    "--seeds", "research/seeds.jsonl",
    "--as-of", "2026-08-24",
  ]), {
    root: "research/corpus",
    seedsFile: "research/seeds.jsonl",
    asOf: "2026-08-24",
  });
});
