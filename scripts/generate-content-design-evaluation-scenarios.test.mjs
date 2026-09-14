import assert from "node:assert/strict";
import test from "node:test";

import { buildManifest, generateScenarios } from "./generate-content-design-evaluation-scenarios.mjs";

test("generates 10,000 unique, replay-stable content-design candidates", () => {
  const first = generateScenarios();
  const second = generateScenarios();
  assert.equal(first.length, 10_000);
  assert.equal(new Set(first.map((scenario) => scenario.scenario_id)).size, 10_000);
  assert.equal(new Set(first.map((scenario) => scenario.scenario_digest)).size, 10_000);
  assert.ok(new Set(first.map((scenario) => scenario.candidate.text)).size >= 200);
  assert.ok(new Set(first.map((scenario) => JSON.stringify([scenario.candidate.text, scenario.candidate.supporting_text]))).size >= 250);
  assert.equal(first.every((scenario) => typeof scenario.context.state_expression === "string" && typeof scenario.context.consequence_expression === "string"), true);
  assert.deepEqual(first, second);
  assert.deepEqual(buildManifest(first), buildManifest(second));
});

test("keeps synthetic candidates out of gold and training eligibility", () => {
  const scenarios = generateScenarios();
  for (const scenario of scenarios) {
    assert.equal(scenario.provenance.evidence_status, "not_product_evidence");
    assert.equal(scenario.provenance.review_status, "candidate_unreviewed");
    assert.equal(scenario.provenance.rights_basis, "project_authored_synthetic");
    assert.equal(scenario.provisional_expectation.status, "generator_label_not_human_gold");
    assert.equal(scenario.human_gold, null);
  }
  assert.equal(buildManifest(scenarios).qualification_status, "synthetic_candidates_not_gold_or_training_eligible");
});

test("covers every matrix slice evenly", () => {
  const manifest = buildManifest(generateScenarios());
  assert.deepEqual(new Set(Object.values(manifest.distributions.ability)), new Set([1_000]));
  assert.deepEqual(new Set(Object.values(manifest.distributions.situation)), new Set([1_000]));
  assert.deepEqual(new Set(Object.values(manifest.distributions.surface)), new Set([1_000]));
  assert.deepEqual(new Set(Object.values(manifest.distributions.target_locale)), new Set([1_000]));
  assert.deepEqual(new Set(Object.values(manifest.distributions.candidate_variant)), new Set([1_000]));
});

test("routes untranslated locale candidates to specialist review", () => {
  const scenarios = generateScenarios();
  const untranslatedWithoutInjectedDefect = scenarios.filter((scenario) =>
    scenario.context.target_locale !== "en-US" && scenario.candidate.injected_defect === null
  );
  assert.ok(untranslatedWithoutInjectedDefect.length > 0);
  for (const scenario of untranslatedWithoutInjectedDefect) {
    assert.equal(scenario.context.source_locale, "en-US");
    assert.equal(scenario.candidate.localization_status, "source_language_candidate_requires_localization");
    assert.equal(scenario.provisional_expectation.disposition, "escalate");
  }
});
