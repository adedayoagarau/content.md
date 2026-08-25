import assert from "node:assert/strict";
import test from "node:test";

import {
  parseArguments,
  planPublicProductCorpusExpansion,
} from "./plan-public-product-corpus-expansion.mjs";

function fixture() {
  const sources = [
    {
      source_id: "source.alpha",
      company: "Alpha Org",
      product_system: "Alpha Product",
      source_class: "actual UI",
      normalized_industry_id: "finance",
    },
    {
      source_id: "source.beta",
      company: "Beta Org",
      product_system: "Beta Product",
      source_class: "actual UI",
      normalized_industry_id: "healthcare",
    },
    {
      source_id: "source.gamma",
      company: "Gamma Org",
      product_system: "Gamma Product",
      source_class: "official content guidance",
      normalized_industry_id: "healthcare",
    },
  ];
  const observations = [];
  for (const state of ["entry", "review", "error", "recovery"]) {
    observations.push({
      observation_id: `observation.alpha.${state}`,
      source_id: "source.alpha",
      company: "Alpha Org",
      product_system: "Alpha Product",
      normalized_industry_id: "finance",
      journey: "checkout",
      event_state: state,
      direct_ui: true,
    });
  }
  for (const state of ["entry", "error"]) {
    observations.push({
      observation_id: `observation.beta.${state}`,
      source_id: "source.beta",
      company: "Beta Org",
      product_system: "Beta Product",
      normalized_industry_id: "healthcare",
      journey: "onboarding",
      event_state: state,
      direct_ui: true,
    });
  }
  observations.push({
    observation_id: "observation.gamma.documented",
    source_id: "source.gamma",
    company: "Gamma Org",
    product_system: "Gamma Product",
    normalized_industry_id: "healthcare",
    journey: "account",
    event_state: "documented",
    direct_ui: false,
  });
  return { sources, observations };
}

const TARGETS = {
  companies: 10,
  products: 30,
  industries: 5,
  directStatesPerProduct: 5,
};

test("parses deterministic corpus planner inputs and world-scale defaults", () => {
  assert.deepEqual(parseArguments(["--as-of", "2026-08-24"]), {
    root: "research/09-experimental/public-product-corpus",
    asOf: "2026-08-24",
    targets: {
      companies: 5_000,
      products: 20_000,
      industries: 250,
      directStatesPerProduct: 5,
    },
  });
  assert.deepEqual(parseArguments([
    "--root", "research/custom",
    "--as-of", "2026-08-24T12:00:00-07:00",
    "--min-companies", "50",
    "--min-products", "150",
    "--min-industries", "20",
    "--min-direct-states-per-product", "4",
  ]).targets, {
    companies: 50,
    products: 150,
    industries: 20,
    directStatesPerProduct: 4,
  });
});

test("prioritizes near-complete products and separately identifies products needing first UI evidence", () => {
  const input = fixture();
  const plan = planPublicProductCorpusExpansion({ ...input, targets: TARGETS });
  assert.deepEqual(
    plan.state_completion_queue.map((item) => ({
      company: item.company,
      product_system: item.product_system,
      observed_state_count: item.observed_state_count,
      missing_state_count: item.missing_state_count,
      priority_rank: item.priority_rank,
    })),
    [
      {
        company: "Alpha Org",
        product_system: "Alpha Product",
        observed_state_count: 4,
        missing_state_count: 1,
        priority_rank: 0,
      },
      {
        company: "Beta Org",
        product_system: "Beta Product",
        observed_state_count: 2,
        missing_state_count: 3,
        priority_rank: 1,
      },
    ],
  );
  assert.deepEqual(
    plan.direct_ui_start_queue.map((item) => ({
      company: item.company,
      product_system: item.product_system,
      normalized_industry_id: item.normalized_industry_id,
      priority_rank: item.priority_rank,
    })),
    [{
      company: "Gamma Org",
      product_system: "Gamma Product",
      normalized_industry_id: "healthcare",
      priority_rank: 0,
    }],
  );
});

test("reports industry and breadth gaps without granting model authority", () => {
  const plan = planPublicProductCorpusExpansion({ ...fixture(), targets: TARGETS });
  assert.deepEqual(plan.counts, {
    companies: 3,
    products: 3,
    industries: 2,
    products_meeting_direct_state_target: 0,
    products_with_direct_ui: 2,
  });
  assert.deepEqual(plan.gaps, {
    companies_remaining: 7,
    products_remaining: 27,
    industries_remaining: 3,
    products_below_direct_state_target: 3,
  });
  assert.deepEqual(plan.industry_coverage, [
    {
      industry_id: "finance",
      company_count: 1,
      product_count: 1,
      direct_ui_product_count: 1,
    },
    {
      industry_id: "healthcare",
      company_count: 2,
      product_count: 2,
      direct_ui_product_count: 1,
    },
  ]);
  assert.equal(plan.collection_operator_only, true);
  assert.equal(plan.authority_effect, "none");
  assert.equal(plan.prompt_eligibility, "never");
  assert.equal(plan.training_eligibility, "never");
  assert.equal(plan.benchmark_eligibility, false);
  assert.equal(JSON.stringify(plan).includes("exact_wording_span"), false);
});

test("is stable under input permutation and rejects duplicate identities", () => {
  const input = fixture();
  const expected = planPublicProductCorpusExpansion({ ...input, targets: TARGETS });
  const reversed = planPublicProductCorpusExpansion({
    sources: [...input.sources].reverse(),
    observations: [...input.observations].reverse(),
    targets: TARGETS,
  });
  assert.deepEqual(reversed, expected);
  assert.throws(
    () => planPublicProductCorpusExpansion({
      sources: [...input.sources, { ...input.sources[0] }],
      observations: input.observations,
      targets: TARGETS,
    }),
    /corpus_expansion_invalid:duplicate_source_id/u,
  );
  assert.throws(
    () => planPublicProductCorpusExpansion({
      sources: input.sources,
      observations: [...input.observations, { ...input.observations[0] }],
      targets: TARGETS,
    }),
    /corpus_expansion_invalid:duplicate_observation_id/u,
  );
});

test("rejects contradictory industry projections for the same product", () => {
  const input = fixture();
  const contradictory = {
    ...input.sources[0],
    source_id: "source.alpha.other",
    normalized_industry_id: "healthcare",
  };
  assert.throws(
    () => planPublicProductCorpusExpansion({
      sources: [...input.sources, contradictory],
      observations: input.observations,
      targets: TARGETS,
    }),
    /corpus_expansion_invalid:product_industry_projection/u,
  );
});
