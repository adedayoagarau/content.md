import { createHash } from "node:crypto";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import type { ObservedExpressionEvidenceRecord } from "./observed-expression.js";
import {
  assessThirdPartyExpressionSimilarity,
  DISTINCTIVE_SIMILARITY_THRESHOLD,
} from "./similarity.js";
import type { ResearchRecordRef } from "./source-record.js";
import type { VoiceToneFeatureName } from "./voice-tone-records.js";

const FEATURE_NAMES = [
  "directness",
  "formality",
  "warmth",
  "reassurance",
  "expressiveness",
  "humor",
  "urgency",
  "information_density",
  "authority_stance",
] as const satisfies readonly VoiceToneFeatureName[];

export interface VoiceComparisonContext {
  journey: string;
  stage: string;
  state: string;
  channel: string;
  locale: string;
  risk: string;
}

export interface VoiceComparisonFeature {
  feature_name: VoiceToneFeatureName;
  value: number;
}

export interface ProjectOwnedComparisonCandidate {
  candidate_id: string;
  candidate_kind: "project_owned_synthetic";
  expression: string;
  expression_digest: string;
  voice_tone_features: VoiceComparisonFeature[];
  hard_rule_status: "pass";
  failed_rule_ids: [];
  candidate_digest: string;
}

export interface ProjectOwnedVoiceComparison {
  contract_version: "contentmd.project-owned-voice-comparison/0.1.0";
  comparison_id: string;
  project_id: "project.synthetic.voice-comparison";
  semantic_message_id: string;
  leakage_group_id: string;
  context: VoiceComparisonContext;
  objective: "clear_actionable_recovery";
  candidate_a: ProjectOwnedComparisonCandidate;
  candidate_b: ProjectOwnedComparisonCandidate;
  blind_assignment: {
    left_candidate_id: string;
    right_candidate_id: string;
    order_digest: string;
  };
  preferred_candidate_id: string;
  third_party_evidence_refs: [];
  authority_effect: "none";
  comparison_digest: string;
}

export interface VoiceComparisonLeakageGroup {
  contract_version: "contentmd.voice-comparison-leakage-group/0.1.0";
  leakage_group_id: string;
  member_comparison_ids: string[];
  grouping_basis: "shared_semantic_message_and_context";
  group_digest: string;
}

export interface VoiceComparisonRightsRecord {
  contract_version: "contentmd.voice-comparison-rights/0.1.0";
  candidate_id: string;
  rights_status: "project_owned_synthetic";
  source_kind: "deterministic_project_generator";
  third_party_ancestor_refs: [];
  prompt_eligibility: "project_owned_only";
  training_eligibility: "project_owned_only";
  authority_effect: "none";
  rights_digest: string;
}

export interface CorpusFileWitness {
  path: string;
  raw_bytes_digest: string;
  byte_count: number;
}

export interface VoiceComparisonManifest {
  contract_version: "contentmd.voice-comparison-manifest/0.1.0";
  corpus_id: "voice-comparison.project-owned.v1";
  pair_count: number;
  leakage_group_count: number;
  candidate_count: number;
  source_class: "project_owned_synthetic";
  similarity_threshold: typeof DISTINCTIVE_SIMILARITY_THRESHOLD;
  files: {
    comparisons: CorpusFileWitness;
    leakage_groups: CorpusFileWitness;
    rights_records: CorpusFileWitness;
  };
  authority_effect: "none";
  manifest_digest: string;
}

export interface ProjectOwnedComparisonCorpus {
  comparisons: ProjectOwnedVoiceComparison[];
  leakage_groups: VoiceComparisonLeakageGroup[];
  rights_records: VoiceComparisonRightsRecord[];
  manifest: VoiceComparisonManifest;
}

export interface VoiceComparisonVerification {
  valid: true;
  pair_count: 100;
  leakage_group_count: 30;
  candidate_count: 200;
  authority_effect: "none";
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function pad(value: number, width = 3): string {
  return String(value).padStart(width, "0");
}

function canonicalJsonl(records: readonly unknown[]): string {
  return records.map((record) => canonicalJson(record)).join("");
}

function finalizeCandidate(
  preimage: Omit<ProjectOwnedComparisonCandidate, "candidate_digest">,
): ProjectOwnedComparisonCandidate {
  return { ...preimage, candidate_digest: sha256Canonical(preimage) };
}

function featureVector(stronger: boolean, offset: number): VoiceComparisonFeature[] {
  const strong = [0.86, 0.58, 0.62, 0.78, 0.24, 0, 0.34, 0.72, 0.3];
  const weak = [0.54, 0.61, 0.44, 0.49, 0.31, 0, 0.48, 0.46, 0.44];
  const values = stronger ? strong : weak;
  return FEATURE_NAMES.map((featureName, index) => ({
    feature_name: featureName,
    value: Number(Math.min(1, Math.max(0, values[index]! + (offset % 3) * 0.01)).toFixed(2)),
  }));
}

function candidate(
  index: number,
  side: "a" | "b",
  stronger: boolean,
): ProjectOwnedComparisonCandidate {
  const field = ["payment details", "delivery address", "contact information", "account details"][index % 4]!;
  const next = ["review", "confirmation", "the next step", "submission"][index % 4]!;
  const expression = stronger
    ? `Correct the ${field}, then continue to ${next}. Reference ${pad(index)}.`
    : `There is an issue with the ${field}. Make an update to proceed. Reference ${pad(index)}.`;
  return finalizeCandidate({
    candidate_id: `voice_candidate.${pad(index)}.${side}`,
    candidate_kind: "project_owned_synthetic",
    expression,
    expression_digest: sha256Utf8(expression),
    voice_tone_features: featureVector(stronger, index),
    hard_rule_status: "pass",
    failed_rule_ids: [],
  });
}

function finalizeRights(
  candidateId: string,
): VoiceComparisonRightsRecord {
  const preimage = {
    contract_version: "contentmd.voice-comparison-rights/0.1.0" as const,
    candidate_id: candidateId,
    rights_status: "project_owned_synthetic" as const,
    source_kind: "deterministic_project_generator" as const,
    third_party_ancestor_refs: [] as [],
    prompt_eligibility: "project_owned_only" as const,
    training_eligibility: "project_owned_only" as const,
    authority_effect: "none" as const,
  };
  return { ...preimage, rights_digest: sha256Canonical(preimage) };
}

function fileWitness(path: string, records: readonly unknown[]): CorpusFileWitness {
  const bytes = canonicalJsonl(records);
  return { path, raw_bytes_digest: sha256Utf8(bytes), byte_count: Buffer.byteLength(bytes, "utf8") };
}

export function createProjectOwnedComparisonCorpus(): ProjectOwnedComparisonCorpus {
  const comparisons: ProjectOwnedVoiceComparison[] = [];
  const rightsRecords: VoiceComparisonRightsRecord[] = [];
  for (let index = 0; index < 100; index += 1) {
    const comparisonId = `voice_comparison.${pad(index)}`;
    const groupId = `voice_leakage_group.${pad(index % 30, 2)}`;
    const preferA = index % 2 === 0;
    const candidateA = candidate(index, "a", preferA);
    const candidateB = candidate(index, "b", !preferA);
    const leftCandidateId = index % 2 === 0 ? candidateB.candidate_id : candidateA.candidate_id;
    const rightCandidateId = index % 2 === 0 ? candidateA.candidate_id : candidateB.candidate_id;
    const orderPreimage = {
      contract_version: "contentmd.voice-comparison-blind-order/0.1.0" as const,
      comparison_id: comparisonId,
      left_candidate_id: leftCandidateId,
      right_candidate_id: rightCandidateId,
    };
    const preimage = {
      contract_version: "contentmd.project-owned-voice-comparison/0.1.0" as const,
      comparison_id: comparisonId,
      project_id: "project.synthetic.voice-comparison" as const,
      semantic_message_id: `semantic_message.synthetic.recovery.${pad(index % 30, 2)}`,
      leakage_group_id: groupId,
      context: {
        journey: "checkout",
        stage: ["entry", "review", "confirmation"][index % 3]!,
        state: "validation_error",
        channel: "web",
        locale: "en-US",
        risk: ["low", "medium", "high"][index % 3]!,
      },
      objective: "clear_actionable_recovery" as const,
      candidate_a: candidateA,
      candidate_b: candidateB,
      blind_assignment: {
        left_candidate_id: leftCandidateId,
        right_candidate_id: rightCandidateId,
        order_digest: sha256Canonical(orderPreimage),
      },
      preferred_candidate_id: preferA ? candidateA.candidate_id : candidateB.candidate_id,
      third_party_evidence_refs: [] as [],
      authority_effect: "none" as const,
    };
    comparisons.push({ ...preimage, comparison_digest: sha256Canonical(preimage) });
    rightsRecords.push(finalizeRights(candidateA.candidate_id), finalizeRights(candidateB.candidate_id));
  }

  const leakageGroups = Array.from({ length: 30 }, (_, groupIndex) => {
    const leakageGroupId = `voice_leakage_group.${pad(groupIndex, 2)}`;
    const memberComparisonIds = comparisons
      .filter((comparison) => comparison.leakage_group_id === leakageGroupId)
      .map((comparison) => comparison.comparison_id);
    const preimage = {
      contract_version: "contentmd.voice-comparison-leakage-group/0.1.0" as const,
      leakage_group_id: leakageGroupId,
      member_comparison_ids: memberComparisonIds,
      grouping_basis: "shared_semantic_message_and_context" as const,
    };
    return { ...preimage, group_digest: sha256Canonical(preimage) };
  });

  const manifestPreimage = {
    contract_version: "contentmd.voice-comparison-manifest/0.1.0" as const,
    corpus_id: "voice-comparison.project-owned.v1" as const,
    pair_count: comparisons.length,
    leakage_group_count: leakageGroups.length,
    candidate_count: rightsRecords.length,
    source_class: "project_owned_synthetic" as const,
    similarity_threshold: DISTINCTIVE_SIMILARITY_THRESHOLD,
    files: {
      comparisons: fileWitness(
        "fixtures/voice-tone-research/project-owned-comparisons.jsonl",
        comparisons,
      ),
      leakage_groups: fileWitness(
        "fixtures/voice-tone-research/leakage-groups.jsonl",
        leakageGroups,
      ),
      rights_records: fileWitness(
        "fixtures/voice-tone-research/rights-register.jsonl",
        rightsRecords,
      ),
    },
    authority_effect: "none" as const,
  };
  return {
    comparisons,
    leakage_groups: leakageGroups,
    rights_records: rightsRecords,
    manifest: { ...manifestPreimage, manifest_digest: sha256Canonical(manifestPreimage) },
  };
}

function invalid(reason: string): never {
  throw new TypeError(reason);
}

function verifyCandidate(candidateValue: ProjectOwnedComparisonCandidate): void {
  const candidate = candidateValue as ProjectOwnedComparisonCandidate & { candidate_kind: string };
  if (candidate.candidate_kind !== "project_owned_synthetic") {
    invalid("voice_comparison_not_project_owned");
  }
  if (candidate.expression_digest !== sha256Utf8(candidate.expression)) {
    invalid("voice_comparison_digest_invalid");
  }
  const { candidate_digest: received, ...preimage } = candidate;
  if (received !== sha256Canonical(preimage)) invalid("voice_comparison_digest_invalid");
  if (candidate.hard_rule_status !== "pass" || candidate.failed_rule_ids.length !== 0) {
    invalid("voice_comparison_hard_rule_invalid");
  }
  if (candidate.voice_tone_features.length !== FEATURE_NAMES.length
    || candidate.voice_tone_features.some((feature, index) =>
      feature.feature_name !== FEATURE_NAMES[index]
      || !Number.isFinite(feature.value)
      || feature.value < 0
      || feature.value > 1)) {
    invalid("voice_comparison_feature_vector_invalid");
  }
}

function verifyManifest(corpus: ProjectOwnedComparisonCorpus): void {
  const manifest = corpus.manifest;
  const { manifest_digest: received, ...preimage } = manifest;
  if (received !== sha256Canonical(preimage)
    || manifest.pair_count !== 100
    || manifest.leakage_group_count !== 30
    || manifest.candidate_count !== 200
    || manifest.source_class !== "project_owned_synthetic"
    || manifest.similarity_threshold !== DISTINCTIVE_SIMILARITY_THRESHOLD
    || manifest.authority_effect !== "none") {
    invalid("voice_comparison_manifest_invalid");
  }
  const expected = {
    comparisons: fileWitness(manifest.files.comparisons.path, corpus.comparisons),
    leakage_groups: fileWitness(manifest.files.leakage_groups.path, corpus.leakage_groups),
    rights_records: fileWitness(manifest.files.rights_records.path, corpus.rights_records),
  };
  if (canonicalJson(expected) !== canonicalJson(manifest.files)) {
    invalid("voice_comparison_manifest_invalid");
  }
}

export function verifyVoiceToneComparisonCorpus(
  corpus: ProjectOwnedComparisonCorpus,
  thirdPartyEvidence: readonly ObservedExpressionEvidenceRecord[],
): VoiceComparisonVerification {
  if (corpus.comparisons.length !== 100) invalid("voice_comparison_manifest_invalid");
  const comparisonIds = new Set<string>();
  const candidateIds = new Set<string>();
  for (const comparison of corpus.comparisons) {
    if (comparison.authority_effect !== "none"
      || comparison.third_party_evidence_refs.length !== 0) {
      invalid("voice_comparison_not_project_owned");
    }
    verifyCandidate(comparison.candidate_a);
    verifyCandidate(comparison.candidate_b);
    if (comparisonIds.has(comparison.comparison_id)
      || candidateIds.has(comparison.candidate_a.candidate_id)
      || candidateIds.has(comparison.candidate_b.candidate_id)) {
      invalid("voice_comparison_duplicate_identity");
    }
    comparisonIds.add(comparison.comparison_id);
    candidateIds.add(comparison.candidate_a.candidate_id);
    candidateIds.add(comparison.candidate_b.candidate_id);
    const candidateSet = new Set([
      comparison.candidate_a.candidate_id,
      comparison.candidate_b.candidate_id,
    ]);
    if (!candidateSet.has(comparison.blind_assignment.left_candidate_id)
      || !candidateSet.has(comparison.blind_assignment.right_candidate_id)
      || comparison.blind_assignment.left_candidate_id === comparison.blind_assignment.right_candidate_id
      || !candidateSet.has(comparison.preferred_candidate_id)) {
      invalid("voice_comparison_blinding_invalid");
    }
    const expectedOrder = sha256Canonical({
      contract_version: "contentmd.voice-comparison-blind-order/0.1.0",
      comparison_id: comparison.comparison_id,
      left_candidate_id: comparison.blind_assignment.left_candidate_id,
      right_candidate_id: comparison.blind_assignment.right_candidate_id,
    });
    if (comparison.blind_assignment.order_digest !== expectedOrder) {
      invalid("voice_comparison_blinding_invalid");
    }
    const { comparison_digest: received, ...preimage } = comparison;
    if (received !== sha256Canonical(preimage)) invalid("voice_comparison_digest_invalid");
    for (const candidate of [comparison.candidate_a, comparison.candidate_b]) {
      if (assessThirdPartyExpressionSimilarity({
        candidate_expression: candidate.expression,
        evidence: thirdPartyEvidence,
      }).blocked) {
        invalid("third_party_expression_similarity_blocked");
      }
    }
  }

  if (corpus.leakage_groups.length !== 30) invalid("voice_comparison_leakage_invalid");
  const memberships = new Map<string, number>();
  const leakageIds = new Set<string>();
  for (const group of corpus.leakage_groups) {
    if (leakageIds.has(group.leakage_group_id) || group.member_comparison_ids.length < 3) {
      invalid("voice_comparison_leakage_invalid");
    }
    leakageIds.add(group.leakage_group_id);
    const { group_digest: received, ...preimage } = group;
    if (received !== sha256Canonical(preimage)
      || new Set(group.member_comparison_ids).size !== group.member_comparison_ids.length) {
      invalid("voice_comparison_leakage_invalid");
    }
    for (const comparisonId of group.member_comparison_ids) {
      if (!comparisonIds.has(comparisonId)) invalid("voice_comparison_leakage_invalid");
      memberships.set(comparisonId, (memberships.get(comparisonId) ?? 0) + 1);
      const comparison = corpus.comparisons.find((item) => item.comparison_id === comparisonId)!;
      if (comparison.leakage_group_id !== group.leakage_group_id) {
        invalid("voice_comparison_leakage_invalid");
      }
    }
  }
  if ([...comparisonIds].some((id) => memberships.get(id) !== 1)) {
    invalid("voice_comparison_leakage_invalid");
  }

  if (corpus.rights_records.length !== 200) invalid("voice_comparison_rights_invalid");
  const rightsCandidates = new Set<string>();
  for (const record of corpus.rights_records) {
    if (record.rights_status !== "project_owned_synthetic"
      || record.source_kind !== "deterministic_project_generator"
      || record.third_party_ancestor_refs.length !== 0
      || record.prompt_eligibility !== "project_owned_only"
      || record.training_eligibility !== "project_owned_only"
      || record.authority_effect !== "none"
      || !candidateIds.has(record.candidate_id)
      || rightsCandidates.has(record.candidate_id)) {
      invalid("voice_comparison_rights_invalid");
    }
    const { rights_digest: received, ...preimage } = record;
    if (received !== sha256Canonical(preimage)) invalid("voice_comparison_rights_invalid");
    rightsCandidates.add(record.candidate_id);
  }
  if (rightsCandidates.size !== candidateIds.size) invalid("voice_comparison_rights_invalid");

  verifyManifest(corpus);
  return {
    valid: true,
    pair_count: 100,
    leakage_group_count: 30,
    candidate_count: 200,
    authority_effect: "none",
  };
}
