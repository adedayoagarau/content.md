import { describe, expect, it } from "vitest";
import { verifyRecordDigest } from "@contentmd/core";
import { compileVoiceToneMap } from "@contentmd/research";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { FEATURE_NAMES, voiceToneFixture } from "./voice-tone-test-fixtures.js";

describe("voice and tone map projection", () => {
  it("projects the exact nine advisory dimensions without acquiring authority", () => {
    const fixture = voiceToneFixture();

    const snapshot = compileVoiceToneMap({
      profile_candidate: fixture.profile,
      feature_definitions: fixture.definitions,
      tone_policies: [fixture.policy],
      lineage_records: fixture.lineage_records,
    });

    expect(snapshot.payload.feature_values.map((value) => value.feature_name)).toEqual(FEATURE_NAMES);
    expect(snapshot.payload.feature_values[0]).toMatchObject({
      feature_name: "directness",
      lower_bound: 0.7,
      upper_bound: 0.9,
      uncertainty: "bounded",
      applicability: "applicable",
    });
    expect(snapshot.payload).toMatchObject({
      decision_state: "proposed",
      authority_effect: "none",
    });
    expect(verifyRecordDigest(snapshot)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.voiceToneMapSnapshot, snapshot)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("rejects incomplete definitions and nonconforming lineage", () => {
    const complete = voiceToneFixture();
    expect(() => compileVoiceToneMap({
      profile_candidate: complete.profile,
      feature_definitions: complete.definitions.slice(0, -1),
      tone_policies: [complete.policy],
      lineage_records: complete.lineage_records,
    })).toThrow("voice_tone_map_invalid:feature_definition_set");

    const quarantined = voiceToneFixture({ controlledCorpusEligible: false });
    expect(() => compileVoiceToneMap({
      profile_candidate: quarantined.profile,
      feature_definitions: quarantined.definitions,
      tone_policies: [quarantined.policy],
      lineage_records: quarantined.lineage_records,
    })).toThrow("voice_lineage_quarantined:research_batch.voice.synthetic");
  });

  it("rejects conflicting intervals instead of averaging away disagreement", () => {
    const fixture = voiceToneFixture();
    const conflicting = structuredClone(fixture.policy);
    conflicting.record_id = "tone_policy.voice.synthetic.conflicting";
    conflicting.payload.feature_values[0]!.lower_bound = 0;
    conflicting.payload.feature_values[0]!.upper_bound = 0.5;

    expect(() => compileVoiceToneMap({
      profile_candidate: fixture.profile,
      feature_definitions: fixture.definitions,
      tone_policies: [fixture.policy, conflicting],
      lineage_records: fixture.lineage_records,
    })).toThrow("voice_tone_map_invalid:tone_policy_digest");
  });
});
