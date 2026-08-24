import { describe, expect, it } from "vitest";
import { finalizeRecord } from "@contentmd/core";
import {
  evaluateCandidateVoiceTone,
  qualifyVoiceToneProfile,
} from "@contentmd/evaluation";
import { eligibleVoiceFixture } from "./voice-tone-test-fixtures.js";

const PASSING_HARD_GATES = {
  product_truth: "pass",
  meaning_preservation: "pass",
  actionable_recovery: "pass",
  safety: "pass",
  controlled_terminology: "pass",
  accessibility: "pass",
  locale_applicability: "pass",
} as const;

describe("approved voice and tone profile eligibility", () => {
  it("replays complete lineage and binds current external approval to task scope", () => {
    const fixture = eligibleVoiceFixture();

    const profile = qualifyVoiceToneProfile(fixture.qualify_input);

    expect(profile).toMatchObject({
      contract_version: "contentmd.eligible-voice-tone-profile/0.1.0",
      project_id: "project.synthetic.voice",
      owner_ref: "content_owner.synthetic",
      locale: "en-US",
      channel: "web",
      context: "synthetic_recovery",
      authority_effect: "none",
    });
    expect(profile.feature_values).toHaveLength(9);
    expect(profile.profile_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("rejects expired approval and quarantined replay ancestry", () => {
    const expired = eligibleVoiceFixture();
    const { content_digest: _digest, ...approvalPreimage } = expired.approval;
    expired.qualify_input.approval_record = finalizeRecord({
      ...approvalPreimage,
      payload: { ...approvalPreimage.payload, expires_at: "2026-08-20T00:00:00Z" },
    });
    expect(() => qualifyVoiceToneProfile(expired.qualify_input))
      .toThrow("voice_profile_not_eligible:approval_not_current");

    const quarantined = eligibleVoiceFixture();
    const { content_digest: _batchDigest, ...batchPreimage } = quarantined.fixture.batch;
    const nonconformingBatch = finalizeRecord({
      ...batchPreimage,
      payload: { ...batchPreimage.payload, controlled_corpus_eligibility: false },
    });
    quarantined.qualify_input.replay.lineage_records = [
      quarantined.fixture.acquisition,
      nonconformingBatch,
    ];
    expect(() => qualifyVoiceToneProfile(quarantined.qualify_input))
      .toThrow("voice_profile_not_eligible:lineage");
  });
});

describe("hard-before-soft voice evaluation", () => {
  it("does not score voice when any truth or safety plane fails", () => {
    const fixture = eligibleVoiceFixture();
    const profile = qualifyVoiceToneProfile(fixture.qualify_input);
    const result = evaluateCandidateVoiceTone({
      profile,
      hard_gates: { ...PASSING_HARD_GATES, product_truth: "fail" },
      candidate_features: profile.feature_values.map((feature) => ({
        feature_name: feature.feature_name,
        value: (feature.lower_bound + feature.upper_bound) / 2,
      })),
    });

    expect(result.hard_status).toBe("fail");
    expect(result.voice_tone_status).toBe("not_evaluated");
    expect(result.feature_results).toEqual([]);
  });

  it("returns a nine-dimension advisory vector only after every hard plane passes", () => {
    const fixture = eligibleVoiceFixture();
    const profile = qualifyVoiceToneProfile(fixture.qualify_input);
    const result = evaluateCandidateVoiceTone({
      profile,
      hard_gates: PASSING_HARD_GATES,
      candidate_features: profile.feature_values.map((feature, index) => ({
        feature_name: feature.feature_name,
        value: index === 0 ? 0.2 : (feature.lower_bound + feature.upper_bound) / 2,
      })),
    });

    expect(result.hard_status).toBe("pass");
    expect(result.voice_tone_status).toBe("evaluated");
    expect(result.feature_results).toHaveLength(9);
    expect(result.feature_results[0]).toMatchObject({
      feature_name: "directness",
      disposition: "below_interval",
    });
    expect(result.authority_effect).toBe("none");
    expect(result).not.toHaveProperty("universal_score");
  });
});
