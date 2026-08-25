import assert from "node:assert/strict";
import test from "node:test";

import {
  compilePublicProductPatternHypotheses,
  parseArguments,
} from "./compile-public-product-pattern-hypotheses.mjs";

function evidenceFixture() {
  const industries = ["finance", "healthcare", "finance"];
  const sources = [];
  const observations = [];
  for (let companyIndex = 0; companyIndex < 3; companyIndex += 1) {
    const suffix = String(companyIndex + 1);
    const company = `Company ${suffix}`;
    const product = `Product ${suffix}`;
    const sourceId = `source.${suffix}`;
    sources.push({
      source_id: sourceId,
      company,
      product_system: product,
      source_class: "actual UI",
    });
    for (const [stateIndex, state] of ["declined", `recovery-${suffix}`, `success-${suffix}`].entries()) {
      observations.push({
        observation_id: `observation.${suffix}.${stateIndex}`,
        source_id: sourceId,
        company,
        product_system: product,
        normalized_industry_id: industries[companyIndex],
        journey: stateIndex === 0 ? "checkout" : `journey-${suffix}-${stateIndex}`,
        event_state: state,
        content_slot_type: stateIndex === 0 ? "error" : "status",
        surface_channel: "web",
        exact_wording_span: `Private wording ${suffix}-${stateIndex}`,
        direct_ui: true,
      });
    }
  }
  return { sources, observations };
}

const THRESHOLDS = {
  minSupportCompanies: 3,
  minSupportProducts: 3,
  minSupportIndustries: 2,
  minDirectStatesPerProduct: 3,
};

test("defaults the compiler CLI to world-scale corpus and cross-product support targets", () => {
  assert.deepEqual(parseArguments(["--as-of", "2026-08-23"]), {
    root: "research/09-experimental/public-product-corpus",
    asOf: "2026-08-23",
    corpusTargets: {
      companies: 5_000,
      products: 20_000,
      industries: 250,
      directStatesPerProduct: 5,
    },
    hypothesisThresholds: {
      minSupportCompanies: 5,
      minSupportProducts: 5,
      minSupportIndustries: 3,
      minDirectStatesPerProduct: 5,
    },
  });
});

test("emits a deterministic cross-product structural hypothesis without copied wording", () => {
  const evidence = evidenceFixture();
  const report = compilePublicProductPatternHypotheses({
    corpusStatus: "pass",
    ...evidence,
    thresholds: THRESHOLDS,
  });

  assert.equal(report.hypotheses.length, 1);
  assert.deepEqual(report.hypotheses[0].structural_signature, {
    journey: "checkout",
    event_state: "declined",
    content_slot_type: "error",
    surface_channel: "web",
  });
  assert.deepEqual(
    {
      company_count: report.hypotheses[0].support.company_count,
      product_count: report.hypotheses[0].support.product_count,
      industry_count: report.hypotheses[0].support.industry_count,
      evidence_ref_count: report.hypotheses[0].support.evidence_refs.length,
    },
    { company_count: 3, product_count: 3, industry_count: 2, evidence_ref_count: 3 },
  );
  assert.deepEqual(
    {
      review_state: report.hypotheses[0].review_state,
      decision_state: report.hypotheses[0].decision_state,
      authority_effect: report.hypotheses[0].authority_effect,
      prompt_eligibility: report.hypotheses[0].prompt_eligibility,
      training_eligibility: report.hypotheses[0].training_eligibility,
      benchmark_eligibility: report.hypotheses[0].benchmark_eligibility,
      promotion_eligibility: report.promotion_eligibility,
    },
    {
      review_state: "unreviewed",
      decision_state: "cross_product_hypothesis",
      authority_effect: "none",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
      promotion_eligibility: false,
    },
  );
  const serialized = JSON.stringify(report);
  assert.equal(serialized.includes("exact_wording_span"), false);
  assert.equal(serialized.includes("Private wording"), false);
  assert.equal(serialized.includes("Company 1"), false);

  const reversed = compilePublicProductPatternHypotheses({
    corpusStatus: "pass",
    sources: [...evidence.sources].reverse(),
    observations: [...evidence.observations].reverse(),
    thresholds: THRESHOLDS,
  });
  assert.deepEqual(reversed, report);
});

test("does not emit a hypothesis without independent company and industry breadth", () => {
  const evidence = evidenceFixture();
  const twoCompanies = evidence.sources.slice(0, 2);
  const allowedSourceIds = new Set(twoCompanies.map((source) => source.source_id));
  const observations = evidence.observations
    .filter((observation) => allowedSourceIds.has(observation.source_id))
    .map((observation) => ({ ...observation, normalized_industry_id: "finance" }));
  const report = compilePublicProductPatternHypotheses({
    corpusStatus: "fail",
    sources: twoCompanies,
    observations,
    thresholds: THRESHOLDS,
  });
  assert.deepEqual(report.hypotheses, []);
  assert.equal(report.corpus_status, "fail");
  assert.equal(report.promotion_eligibility, false);
});

test("excludes observations from products below the direct-state threshold", () => {
  const evidence = evidenceFixture();
  const incomplete = evidence.observations.filter((observation) => (
    observation.company !== "Company 3" || observation.event_state === "declined"
  ));
  const report = compilePublicProductPatternHypotheses({
    corpusStatus: "fail",
    sources: evidence.sources,
    observations: incomplete,
    thresholds: THRESHOLDS,
  });
  assert.deepEqual(report.hypotheses, []);
});

test("does not emit structural labels that contain supporting company or product names", () => {
  const evidence = evidenceFixture();
  const named = evidence.observations.map((observation) => (
    observation.event_state === "declined"
      ? { ...observation, journey: "Company 1 Company 2 Company 3 checkout" }
      : observation
  ));
  const report = compilePublicProductPatternHypotheses({
    corpusStatus: "pass",
    sources: evidence.sources,
    observations: named,
    thresholds: THRESHOLDS,
  });
  assert.deepEqual(report.hypotheses, []);
});

test("rejects duplicate evidence identities instead of inflating support", () => {
  const evidence = evidenceFixture();
  assert.throws(
    () => compilePublicProductPatternHypotheses({
      corpusStatus: "pass",
      sources: [...evidence.sources, { ...evidence.sources[0] }],
      observations: evidence.observations,
      thresholds: THRESHOLDS,
    }),
    /duplicate source_id/u,
  );
  assert.throws(
    () => compilePublicProductPatternHypotheses({
      corpusStatus: "pass",
      sources: evidence.sources,
      observations: [...evidence.observations, { ...evidence.observations[0] }],
      thresholds: THRESHOLDS,
    }),
    /duplicate observation_id/u,
  );
});
