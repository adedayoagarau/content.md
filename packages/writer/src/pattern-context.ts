import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  qualifyTransferablePatternForPrompt,
  type QualifiedPatternMechanism,
  type QualifyTransferablePatternForPromptInput,
  type ResearchRecordRef,
} from "@contentmd/research";

export interface PatternPromptContextContent {
  contract_version: "contentmd.pattern-prompt-context/0.1.0";
  project_id: string;
  pattern_ref: ResearchRecordRef;
  disposition_ref: ResearchRecordRef;
  approval_ref: ResearchRecordRef;
  transferable_mechanism: string;
  prohibited_imitation_boundary: string;
  applicable_contexts: QualifiedPatternMechanism["applicable_contexts"];
  transfer_conditions: QualifiedPatternMechanism["transfer_conditions"];
  evidence_refs: ResearchRecordRef[];
  source_projection_digest: string;
  qualification_digest: string;
  verification_digest: string;
  raw_observation_included: false;
  authority_effect: "none";
  context_digest: string;
}

export interface PatternPromptContextVerification {
  contract_version: "contentmd.pattern-prompt-context-verification/0.1.0";
  qualification_input: QualifyTransferablePatternForPromptInput;
  qualified_pattern: QualifiedPatternMechanism;
  verification_digest: string;
}

export interface PatternPromptContextItem {
  source_ref: ResearchRecordRef;
  data_class: "approved_pattern";
  content: PatternPromptContextContent;
  verification: PatternPromptContextVerification;
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

function refFor(input: QualifyTransferablePatternForPromptInput): ResearchRecordRef {
  return {
    record_id: input.pattern.record_id,
    schema_id: input.pattern.schema_id,
    schema_version: input.pattern.schema_version,
    content_digest: input.pattern.content_digest,
  };
}

function buildContent(
  qualified: QualifiedPatternMechanism,
  verificationDigest: string,
): PatternPromptContextContent {
  const preimage = {
    contract_version: "contentmd.pattern-prompt-context/0.1.0" as const,
    project_id: qualified.project_id,
    pattern_ref: canonicalClone(qualified.pattern_ref),
    disposition_ref: canonicalClone(qualified.disposition_ref),
    approval_ref: canonicalClone(qualified.approval_ref),
    transferable_mechanism: qualified.transferable_mechanism,
    prohibited_imitation_boundary: qualified.prohibited_imitation_boundary,
    applicable_contexts: canonicalClone(qualified.applicable_contexts),
    transfer_conditions: canonicalClone(qualified.transfer_conditions),
    evidence_refs: canonicalClone(qualified.evidence_refs),
    source_projection_digest: qualified.source_projection_digest,
    qualification_digest: qualified.qualification_digest,
    verification_digest: verificationDigest,
    raw_observation_included: false as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, context_digest: sha256Canonical(preimage) };
}

export function createPatternPromptContext(
  input: QualifyTransferablePatternForPromptInput,
): PatternPromptContextItem {
  const qualificationInput = canonicalClone(input);
  const qualifiedPattern = qualifyTransferablePatternForPrompt(qualificationInput);
  const verificationPreimage = {
    contract_version: "contentmd.pattern-prompt-context-verification/0.1.0" as const,
    qualification_input: qualificationInput,
    qualified_pattern: canonicalClone(qualifiedPattern),
  };
  const verificationDigest = sha256Canonical(verificationPreimage);
  return deepFreeze({
    source_ref: refFor(qualificationInput),
    data_class: "approved_pattern" as const,
    content: buildContent(qualifiedPattern, verificationDigest),
    verification: {
      ...verificationPreimage,
      verification_digest: verificationDigest,
    },
  });
}

function invalid(detail: string): never {
  throw new TypeError(`prompt_context_forbidden:${detail}`);
}

function assertPlainDataGraph(value: unknown, path: string, ancestors = new Set<object>()): void {
  if (value === null || typeof value === "string" || typeof value === "boolean") return;
  if (typeof value === "number") {
    if (!Number.isFinite(value)) invalid("approved_pattern_unverified");
    return;
  }
  if (typeof value !== "object" || ancestors.has(value)) invalid("approved_pattern_unverified");
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== Array.prototype) {
    invalid("approved_pattern_unverified");
  }
  ancestors.add(value);
  try {
    const keys = Reflect.ownKeys(value);
    if (Array.isArray(value)) {
      if (keys.length !== value.length + 1 || keys[keys.length - 1] !== "length") {
        invalid("approved_pattern_unverified");
      }
    }
    for (const key of keys) {
      if (key === "length" && Array.isArray(value)) continue;
      if (typeof key !== "string") invalid("approved_pattern_unverified");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined
        || !descriptor.enumerable
        || !("value" in descriptor)) {
        invalid("approved_pattern_unverified");
      }
      assertPlainDataGraph(descriptor.value, `${path}.${key}`, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

export function verifyAndProjectPatternPromptContext(
  value: PatternPromptContextItem,
): Omit<PatternPromptContextItem, "verification"> {
  assertPlainDataGraph(value, "approved_pattern");
  let replayed: PatternPromptContextItem;
  try {
    replayed = createPatternPromptContext(value.verification.qualification_input);
  } catch {
    invalid("approved_pattern_unverified");
  }
  if (canonicalJson(value.verification.qualified_pattern)
      !== canonicalJson(replayed.verification.qualified_pattern)
    || value.verification.verification_digest !== replayed.verification.verification_digest
    || canonicalJson(value.source_ref) !== canonicalJson(replayed.source_ref)
    || canonicalJson(value.content) !== canonicalJson(replayed.content)) {
    invalid("approved_pattern_replay_mismatch");
  }
  return deepFreeze({
    source_ref: canonicalClone(replayed.source_ref),
    data_class: "approved_pattern" as const,
    content: canonicalClone(replayed.content),
  });
}
