import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  qualifyVoiceToneProfile,
  type EligibleVoiceToneProfile,
  type QualifyVoiceToneProfileInput,
} from "@contentmd/evaluation";
import type { ResearchRecordRef, VoiceToneFeatureValue } from "@contentmd/research";

export interface VoicePromptContextContent {
  contract_version: "contentmd.voice-prompt-context/0.1.0";
  profile_digest: string;
  graph_snapshot_ref: ResearchRecordRef;
  approval_ref: ResearchRecordRef;
  owner_ref: string;
  locale: string;
  channel: string;
  context: string;
  feature_values: VoiceToneFeatureValue[];
  verification_digest: string;
  hard_planes_remain_authoritative: true;
  raw_observation_included: false;
  authority_effect: "none";
  context_digest: string;
}

export interface VoicePromptContextVerification {
  contract_version: "contentmd.voice-prompt-context-verification/0.1.0";
  qualification_input: QualifyVoiceToneProfileInput;
  eligible_profile: EligibleVoiceToneProfile;
  verification_digest: string;
}

export interface VoicePromptContextItem {
  source_ref: ResearchRecordRef;
  data_class: "voice_tone_guidance";
  content: VoicePromptContextContent;
  verification: VoicePromptContextVerification;
}

function canonicalClone<T>(value: T): T {
  return JSON.parse(canonicalJson(value)) as T;
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function invalid(detail: string): never {
  throw new TypeError(`prompt_context_forbidden:${detail}`);
}

function assertPlainDataGraph(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("voice_tone_guidance_unverified");
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) {
    invalid("voice_tone_guidance_unverified");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== Array.prototype) {
    invalid("voice_tone_guidance_unverified");
  }
  ancestors.add(value);
  try {
    const keys = Reflect.ownKeys(value);
    if (Array.isArray(value)
      && (keys.length !== value.length + 1 || keys[keys.length - 1] !== "length")) {
      invalid("voice_tone_guidance_unverified");
    }
    for (const key of keys) {
      if (key === "length" && Array.isArray(value)) continue;
      if (typeof key !== "string") invalid("voice_tone_guidance_unverified");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        invalid("voice_tone_guidance_unverified");
      }
      assertPlainDataGraph(descriptor.value, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

function buildContent(
  profile: EligibleVoiceToneProfile,
  verificationDigest: string,
): VoicePromptContextContent {
  const preimage = {
    contract_version: "contentmd.voice-prompt-context/0.1.0" as const,
    profile_digest: profile.profile_digest,
    graph_snapshot_ref: canonicalClone(profile.graph_snapshot_ref),
    approval_ref: canonicalClone(profile.approval_ref),
    owner_ref: profile.owner_ref,
    locale: profile.locale,
    channel: profile.channel,
    context: profile.context,
    feature_values: canonicalClone(profile.feature_values),
    verification_digest: verificationDigest,
    hard_planes_remain_authoritative: true as const,
    raw_observation_included: false as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, context_digest: sha256Canonical(preimage) };
}

export function createVoicePromptContext(
  input: QualifyVoiceToneProfileInput,
): VoicePromptContextItem {
  const qualificationInput = canonicalClone(input);
  const eligibleProfile = qualifyVoiceToneProfile(qualificationInput);
  const verificationPreimage = {
    contract_version: "contentmd.voice-prompt-context-verification/0.1.0" as const,
    qualification_input: qualificationInput,
    eligible_profile: canonicalClone(eligibleProfile),
  };
  const verificationDigest = sha256Canonical(verificationPreimage);
  return deepFreeze({
    source_ref: canonicalClone(eligibleProfile.map_snapshot_ref),
    data_class: "voice_tone_guidance" as const,
    content: buildContent(eligibleProfile, verificationDigest),
    verification: {
      ...verificationPreimage,
      verification_digest: verificationDigest,
    },
  });
}

export function verifyAndProjectVoicePromptContext(
  value: VoicePromptContextItem,
): Omit<VoicePromptContextItem, "verification"> {
  assertPlainDataGraph(value);
  let replayed: VoicePromptContextItem;
  try {
    replayed = createVoicePromptContext(value.verification.qualification_input);
  } catch {
    invalid("voice_tone_guidance_unverified");
  }
  if (canonicalJson(value.verification.eligible_profile)
      !== canonicalJson(replayed.verification.eligible_profile)
    || value.verification.verification_digest !== replayed.verification.verification_digest
    || canonicalJson(value.source_ref) !== canonicalJson(replayed.source_ref)
    || canonicalJson(value.content) !== canonicalJson(replayed.content)) {
    invalid("voice_tone_guidance_replay_mismatch");
  }
  return deepFreeze({
    source_ref: canonicalClone(replayed.source_ref),
    data_class: "voice_tone_guidance" as const,
    content: canonicalClone(replayed.content),
  });
}
