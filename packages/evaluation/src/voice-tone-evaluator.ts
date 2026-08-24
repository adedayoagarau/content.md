import { sha256Canonical } from "@contentmd/core";
import type { VoiceToneFeatureName } from "@contentmd/research";
import {
  verifyEligibleVoiceToneProfile,
  type EligibleVoiceToneProfile,
} from "./voice-tone-profile.js";

export type HardGateDisposition = "pass" | "fail" | "unknown";

export interface VoiceToneHardGates {
  product_truth: HardGateDisposition;
  meaning_preservation: HardGateDisposition;
  actionable_recovery: HardGateDisposition;
  safety: HardGateDisposition;
  controlled_terminology: HardGateDisposition;
  accessibility: HardGateDisposition;
  locale_applicability: HardGateDisposition;
}

export interface CandidateVoiceToneFeature {
  feature_name: VoiceToneFeatureName;
  value: number;
}

export interface VoiceToneFeatureEvaluation {
  feature_name: VoiceToneFeatureName;
  value: number;
  lower_bound: number;
  upper_bound: number;
  disposition: "within_interval" | "below_interval" | "above_interval" | "not_applicable" | "unknown";
  distance: number;
}

export interface CandidateVoiceToneEvaluation {
  contract_version: "contentmd.candidate-voice-tone-evaluation/0.1.0";
  profile_digest: string;
  hard_status: HardGateDisposition;
  hard_gates: VoiceToneHardGates;
  voice_tone_status: "evaluated" | "not_evaluated";
  feature_results: VoiceToneFeatureEvaluation[];
  authority_effect: "none";
  evaluation_digest: string;
}

function invalid(reason: string): never {
  throw new TypeError(`voice_tone_evaluation_invalid:${reason}`);
}

export function evaluateCandidateVoiceTone(input: {
  profile: EligibleVoiceToneProfile;
  hard_gates: VoiceToneHardGates;
  candidate_features: CandidateVoiceToneFeature[];
}): CandidateVoiceToneEvaluation {
  if (!verifyEligibleVoiceToneProfile(input.profile)) invalid("profile");
  const gateValues = Object.values(input.hard_gates);
  if (gateValues.length !== 7
    || gateValues.some((value) => !["pass", "fail", "unknown"].includes(value))) {
    invalid("hard_gates");
  }
  const hardStatus: HardGateDisposition = gateValues.includes("fail")
    ? "fail"
    : gateValues.includes("unknown") ? "unknown" : "pass";
  let featureResults: VoiceToneFeatureEvaluation[] = [];
  if (hardStatus === "pass") {
    if (input.candidate_features.length !== input.profile.feature_values.length) {
      invalid("feature_set");
    }
    featureResults = input.profile.feature_values.map((constraint, index) => {
      const candidate = input.candidate_features[index]!;
      if (candidate.feature_name !== constraint.feature_name
        || !Number.isFinite(candidate.value)
        || candidate.value < 0
        || candidate.value > 1) invalid("feature_set");
      let disposition: VoiceToneFeatureEvaluation["disposition"];
      let distance = 0;
      if (constraint.applicability === "not_applicable") disposition = "not_applicable";
      else if (constraint.applicability === "unknown") disposition = "unknown";
      else if (candidate.value < constraint.lower_bound) {
        disposition = "below_interval";
        distance = constraint.lower_bound - candidate.value;
      } else if (candidate.value > constraint.upper_bound) {
        disposition = "above_interval";
        distance = candidate.value - constraint.upper_bound;
      } else disposition = "within_interval";
      return {
        feature_name: candidate.feature_name,
        value: candidate.value,
        lower_bound: constraint.lower_bound,
        upper_bound: constraint.upper_bound,
        disposition,
        distance: Number(distance.toFixed(6)),
      };
    });
  }
  const preimage = {
    contract_version: "contentmd.candidate-voice-tone-evaluation/0.1.0" as const,
    profile_digest: input.profile.profile_digest,
    hard_status: hardStatus,
    hard_gates: { ...input.hard_gates },
    voice_tone_status: hardStatus === "pass" ? "evaluated" as const : "not_evaluated" as const,
    feature_results: featureResults,
    authority_effect: "none" as const,
  };
  return { ...preimage, evaluation_digest: sha256Canonical(preimage) };
}
