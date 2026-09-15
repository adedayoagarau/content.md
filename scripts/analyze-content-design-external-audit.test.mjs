import assert from "node:assert/strict";
import test from "node:test";

import {
  detectLocaleReference,
  prepareEnglishDisagreementPilot,
  summarizeExternalReviewPairs,
  validateExternalReviewRecord,
} from "./analyze-content-design-external-audit.mjs";

const hard = {
  factual_accuracy: "pass",
  state_accuracy: "pass",
  semantic_fidelity: "pass",
  agency: "pass",
  recovery: "pass",
  authority_boundary: "pass",
};
const quality = {
  clarity: 5,
  specificity: 4,
  hierarchy: 4,
  accessibility_readiness: 4,
  locale_readiness: 3,
  voice_fit: 5,
  tone_fit: 5,
  economy: 5,
};

function review(workUnitId, overrides = {}) {
  return {
    work_unit_id: workUnitId,
    disposition: "pass",
    hard_dimension_results: { ...hard },
    quality_dimension_scores: { ...quality },
    rationale: "The expression preserves the supplied state and action.",
    acceptable_meaning_invariants: ["Preserve the supplied state."],
    recommended_revision: null,
    review_evidence_refs: ["context.state"],
    reviewer_confidence: "high",
    ...overrides,
  };
}

function scenario(id, targetLocale, abilityId, variant, surface, expectedDisposition = "pass", controlClass) {
  return {
    scenario_id: id,
    ability: { id: abilityId },
    context: { target_locale: targetLocale, surface, situation: `${surface}_situation` },
    candidate: { variant },
    evaluation_control: {
      class: controlClass ?? (expectedDisposition === "revise" ? "clear_failure" : "positive_control"),
      expected_disposition: expectedDisposition,
    },
  };
}

test("validates a complete structured external review", () => {
  const record = review("review-cdes-00001");
  assert.equal(validateExternalReviewRecord(record, record.work_unit_id), record);
});

test("rejects invalid scores and missing required quality judgments", () => {
  assert.throws(
    () => validateExternalReviewRecord(review("review-cdes-00001", {
      quality_dimension_scores: { ...quality, clarity: 6 },
    }), "review-cdes-00001"),
    /quality_dimension:clarity/u,
  );
  assert.throws(
    () => validateExternalReviewRecord(review("review-cdes-00001", {
      quality_dimension_scores: { ...quality, clarity: null },
    }), "review-cdes-00001"),
    /required_quality_score/u,
  );
});

test("detects locale reasoning without counting the required score key", () => {
  assert.equal(detectLocaleReference(review("review-cdes-00001")), false);
  assert.equal(detectLocaleReference(review("review-cdes-00001", {
    rationale: "The target locale requires specialist review.",
  })), true);
});

test("summarizes only English non-localization records for the usable slice", () => {
  const scenarios = [
    scenario("cdes-00001", "en-US", "voice_tone", "plain_direct", "button"),
    scenario("cdes-00002", "en-GB", "voice_tone", "warm_supportive", "email", "escalate", "near_miss"),
    scenario("cdes-00003", "es-US", "voice_tone", "plain_direct", "button"),
    scenario("cdes-00004", "en-IN", "localization", "plain_direct", "button"),
  ];
  const claude = new Map([
    ["review-cdes-00001", review("review-cdes-00001")],
    ["review-cdes-00002", review("review-cdes-00002", { disposition: "revise" })],
    ["review-cdes-00003", review("review-cdes-00003")],
    ["review-cdes-00004", review("review-cdes-00004")],
  ]);
  const cursor = new Map([
    ["review-cdes-00001", review("review-cdes-00001")],
    ["review-cdes-00002", review("review-cdes-00002")],
    ["review-cdes-00003", review("review-cdes-00003", { disposition: "abstain" })],
    ["review-cdes-00004", review("review-cdes-00004")],
  ]);
  const report = summarizeExternalReviewPairs(scenarios, { claude, cursor });
  assert.equal(report.raw_disposition_comparison.record_count, 4);
  assert.equal(report.raw_disposition_comparison.agreement_count, 2);
  assert.equal(report.english_only.record_count, 2);
  assert.equal(report.english_only.disposition_comparison.agreement_count, 1);
  assert.equal(report.english_only.synthetic_control_agreement.claude.agreement_count, 1);
  assert.equal(report.english_only.synthetic_control_agreement.cursor.agreement_count, 1);
  assert.equal(report.english_only.disposition_comparison_by_situation.email_situation.disagreement_count, 1);
  assert.equal(report.english_only.disposition_comparison_by_surface.email.disagreement_count, 1);
});

test("prepares a deterministic 100-item English disagreement pilot without regional fields", () => {
  const variants = ["concise_calm", "warm_supportive", "plain_direct", "missing_consequence"];
  const scenarios = [];
  const claude = new Map();
  const cursor = new Map();
  for (const [variantIndex, variant] of variants.entries()) {
    for (let item = 0; item < 45; item += 1) {
      const ordinal = variantIndex * 45 + item + 1;
      const id = `cdes-${String(ordinal).padStart(5, "0")}`;
      const workUnitId = `review-${id}`;
      scenarios.push({
        scenario_id: id,
        scenario_digest: String(ordinal).padStart(64, "0"),
        ability: { id: `ability_${Math.floor(item / 5)}`, objective: "Review English expression" },
        context: {
          situation: `situation_${item % 10}`,
          surface: `surface_${item % 10}`,
          source_locale: "en-US",
          target_locale: ["en-US", "en-GB", "en-IN"][item % 3],
          direction: "ltr",
          state: "A known product state",
        },
        candidate: {
          variant,
          text: `Candidate ${ordinal}`,
          supporting_text: "Supporting content",
        },
        rubric: {
          evaluation_order: ["accessibility_locale", "voice_tone_economy"],
          hard_dimensions: Object.keys(hard),
          quality_dimensions: Object.keys(quality),
        },
      });
      claude.set(workUnitId, review(workUnitId));
      cursor.set(workUnitId, review(workUnitId, {
        disposition: "revise",
        hard_dimension_results: { ...hard, semantic_fidelity: "fail" },
      }));
    }
  }
  const sourceEvidence = {
    source_packet_digest: "a".repeat(64),
    reviewer_submission_digests: { claude: "b".repeat(64), cursor: "c".repeat(64) },
  };
  const first = prepareEnglishDisagreementPilot(scenarios, { claude, cursor }, sourceEvidence);
  const second = prepareEnglishDisagreementPilot(scenarios, { claude, cursor }, sourceEvidence);
  assert.deepEqual(first, second);
  assert.equal(first.packet.sample_count, 100);
  assert.equal(first.selection_manifest.selected_count, 100);
  assert.deepEqual(first.selection_manifest.variant_quotas, {
    concise_calm: 25,
    warm_supportive: 25,
    plain_direct: 25,
    missing_consequence: 25,
  });
  assert.equal(/locale|localization/iu.test(JSON.stringify(first.packet)), false);
  assert.equal(first.packet.review_work_units.every((unit) => (
    !Object.hasOwn(unit.context, "source_locale")
    && !Object.hasOwn(unit.context, "target_locale")
    && !Object.hasOwn(unit.candidate, "variant")
  )), true);
  const abilityCounts = Object.values(first.selection_manifest.selected_records.reduce((counts, record) => ({
    ...counts,
    [record.ability_id]: (counts[record.ability_id] ?? 0) + 1,
  }), {}));
  assert.ok(Math.max(...abilityCounts) - Math.min(...abilityCounts) <= 1);
});
