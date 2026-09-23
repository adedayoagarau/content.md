import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  RECONCILED_VOICE_TONE_FEATURES,
  TONE_CONSTRUCT_RECONCILIATION,
  verifyToneConstructReconciliation,
  type ToneConstructReconciliationArtifact,
} from "@contentmd/research";

function objectKeys(value: unknown, into = new Set<string>()): Set<string> {
  if (value === null || typeof value !== "object") return into;
  for (const [key, nested] of Object.entries(value)) {
    into.add(key);
    objectKeys(nested, into);
  }
  return into;
}

describe("tone construct reconciliation", () => {
  it("keeps the English nine-feature model qualitative and unpromoted", () => {
    const artifact = TONE_CONSTRUCT_RECONCILIATION;

    expect(verifyToneConstructReconciliation(artifact)).toBe(true);
    expect(artifact.language_scope).toBe("en");
    expect(artifact.status).toBe("candidate_reconciliation_no_promotion");
    expect(artifact.current_model.feature_names).toEqual(RECONCILED_VOICE_TONE_FEATURES);
    expect(artifact.current_model.numeric_calibration_status).toBe("not_established");
    expect(artifact.current_model.construct_validity_status).toBe("not_established");
    expect(artifact.feature_reconciliation.map((item) => item.feature_name))
      .toEqual(RECONCILED_VOICE_TONE_FEATURES);
    expect([...objectKeys(artifact)].filter((key) => /^(score|weight|threshold)$/u.test(key)))
      .toEqual([]);
    expect(Object.isFrozen(artifact.feature_reconciliation)).toBe(true);
  });

  it("preserves source strength and limitation instead of treating three articles as validation", () => {
    const sources = new Map(TONE_CONSTRUCT_RECONCILIATION.sources.map(
      (source) => [source.source_id, source],
    ));

    expect(sources.get("tone-source.nng-four-dimensions")?.source_type)
      .toBe("bounded_empirical_practitioner");
    expect(sources.get("tone-source.harwood-voice-chart")?.source_type)
      .toBe("practitioner_method");
    expect(sources.get("tone-source.uxdi-tone-guide")?.source_type)
      .toBe("secondary_synthesis");
    expect(sources.get("tone-source.contentmd-cross-dataset-2026-08-27")?.source_type)
      .toBe("local_evidence_synthesis");
    expect([...sources.values()].every(
      (source) => source.limitations.length > 0 && source.authority_effect === "none",
    )).toBe(true);
  });

  it("maps dimensions, operational categories, and expression markers to separate systems", () => {
    const mappings = new Map(TONE_CONSTRUCT_RECONCILIATION.mappings.map(
      (mapping) => [mapping.mapping_id, mapping],
    ));

    expect(mappings.get("tone-map.nng.formality")).toMatchObject({
      disposition: "close_candidate_correspondence",
      existing_feature_refs: ["formality"],
      target_system: "voice_feature",
    });
    expect(mappings.get("tone-map.nng.respectfulness")).toMatchObject({
      disposition: "unmapped_open_question",
      existing_feature_refs: [],
      target_system: "open_research",
    });
    expect(mappings.get("tone-map.harwood.wordiness")).toMatchObject({
      disposition: "partial_overlap",
      existing_feature_refs: ["information_density"],
    });
    for (const id of [
      "tone-map.harwood.grammar",
      "tone-map.harwood.punctuation",
      "tone-map.harwood.capitalization",
    ]) {
      expect(mappings.get(id)?.target_system).toBe("mechanics");
      expect(mappings.get(id)?.disposition).toBe("observable_marker");
    }
    expect(mappings.get("tone-map.uxdi.four-dimensions")?.disposition)
      .toBe("secondary_restatement");
  });

  it("traces every source and feature reconciliation without adding authority", () => {
    const artifact = TONE_CONSTRUCT_RECONCILIATION;
    const sourceIds = new Set(artifact.sources.map((source) => source.source_id));
    const mappedSourceIds = new Set(artifact.mappings.map((mapping) => mapping.source_id));
    const mappingIds = new Set(artifact.mappings.map((mapping) => mapping.mapping_id));
    const featureNames = new Set(RECONCILED_VOICE_TONE_FEATURES);

    expect(mappedSourceIds).toEqual(sourceIds);
    for (const mapping of artifact.mappings) {
      expect(sourceIds.has(mapping.source_id)).toBe(true);
      expect(mapping.existing_feature_refs.every((feature) => featureNames.has(feature))).toBe(true);
      expect(mapping.non_equivalence.length).toBeGreaterThan(0);
    }
    for (const feature of artifact.feature_reconciliation) {
      expect(feature.mapping_refs.length).toBeGreaterThan(0);
      expect(feature.mapping_refs.every((mappingRef) => mappingIds.has(mappingRef))).toBe(true);
    }
    expect(artifact.authority_effect).toBe("none");
  });

  it("rejects both stale-digest and re-signed mutations", () => {
    const staleDigest = structuredClone(TONE_CONSTRUCT_RECONCILIATION);
    staleDigest.decisions[0] = "Promote every feature immediately.";
    expect(verifyToneConstructReconciliation(staleDigest)).toBe(false);

    const resigned = structuredClone(staleDigest) as ToneConstructReconciliationArtifact;
    const { reconciliation_digest: _stale, ...resignedPreimage } = resigned;
    resigned.reconciliation_digest = sha256Canonical(resignedPreimage);
    expect(resigned.reconciliation_digest)
      .not.toBe(TONE_CONSTRUCT_RECONCILIATION.reconciliation_digest);
    expect(verifyToneConstructReconciliation(resigned)).toBe(false);
  });
});
