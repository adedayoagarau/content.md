import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type DurableRecord,
  type RecordScope,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ResearchRecordRef } from "./source-record.js";
import { verifyVoiceLineage } from "./voice-tone-lineage.js";
import type {
  OrganizationVoiceProfileCandidate,
  TonePolicyRecord,
  VoiceToneFeatureDefinition,
  VoiceToneFeatureName,
  VoiceToneFeatureValue,
  VoiceToneMapSnapshot,
  VoiceToneMapSnapshotPayload,
} from "./voice-tone-records.js";

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

export interface CompileVoiceToneMapInput {
  profile_candidate: OrganizationVoiceProfileCandidate;
  feature_definitions: VoiceToneFeatureDefinition[];
  tone_policies: TonePolicyRecord[];
  lineage_records: DurableRecord<unknown>[];
}

function fail(reason: string): never {
  throw new TypeError(`voice_tone_map_invalid:${reason}`);
}

function copyRef(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function copyScope(scope: RecordScope): RecordScope {
  return {
    memory_scope: scope.memory_scope,
    project_id: scope.project_id,
    resource_refs: [...scope.resource_refs],
    data_classes: [...scope.data_classes],
  };
}

function exactRef(left: ResearchRecordRef, right: ResearchRecordRef): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function uniqueSortedRefs(refs: readonly ResearchRecordRef[]): ResearchRecordRef[] {
  const byBytes = new Map<string, ResearchRecordRef>();
  for (const ref of refs) {
    const bytes = canonicalJson(ref);
    byBytes.set(bytes, {
      record_id: ref.record_id,
      schema_id: ref.schema_id,
      schema_version: ref.schema_version,
      content_digest: ref.content_digest,
    });
  }
  return [...byBytes.entries()]
    .sort(([left], [right]) => left < right ? -1 : left > right ? 1 : 0)
    .map(([, ref]) => ref);
}

function validateProfile(profile: OrganizationVoiceProfileCandidate): void {
  if (!verifyRecordDigest(profile).valid) fail("profile_candidate_digest");
  if (!validateRecord(SCHEMA_IDS.organizationVoiceProfileCandidate, profile).valid) {
    fail("profile_candidate_schema");
  }
}

function validateDefinitions(
  definitions: readonly VoiceToneFeatureDefinition[],
): Map<VoiceToneFeatureName, VoiceToneFeatureDefinition> {
  if (definitions.length !== FEATURE_NAMES.length) fail("feature_definition_set");
  const byName = new Map<VoiceToneFeatureName, VoiceToneFeatureDefinition>();
  for (let index = 0; index < definitions.length; index += 1) {
    const definition = definitions[index]!;
    if (!verifyRecordDigest(definition).valid) fail("feature_definition_digest");
    if (!validateRecord(SCHEMA_IDS.voiceToneFeatureDefinition, definition).valid) {
      fail("feature_definition_schema");
    }
    if (definition.payload.feature_name !== FEATURE_NAMES[index]
      || byName.has(definition.payload.feature_name)) {
      fail("feature_definition_set");
    }
    byName.set(definition.payload.feature_name, definition);
  }
  return byName;
}

function validatePolicies(policies: readonly TonePolicyRecord[]): void {
  if (policies.length === 0) fail("tone_policy_set");
  const ids = new Set<string>();
  for (const policy of policies) {
    if (!verifyRecordDigest(policy).valid) fail("tone_policy_digest");
    if (!validateRecord(SCHEMA_IDS.tonePolicy, policy).valid) fail("tone_policy_schema");
    if (ids.has(policy.record_id)) fail("tone_policy_set");
    ids.add(policy.record_id);
  }
}

function assertExactPolicyRefs(
  profile: OrganizationVoiceProfileCandidate,
  policies: readonly TonePolicyRecord[],
): void {
  const expected = policies.map(copyRef).sort((left, right) => {
    const leftBytes = canonicalJson(left);
    const rightBytes = canonicalJson(right);
    return leftBytes < rightBytes ? -1 : leftBytes > rightBytes ? 1 : 0;
  });
  const actual = [...profile.payload.tone_policy_refs].sort((left, right) => {
    const leftBytes = canonicalJson(left);
    const rightBytes = canonicalJson(right);
    return leftBytes < rightBytes ? -1 : leftBytes > rightBytes ? 1 : 0;
  });
  if (expected.length !== actual.length
    || expected.some((ref, index) => !exactRef(ref, actual[index]!))) {
    fail("tone_policy_set");
  }
}

function projectFeature(
  featureName: VoiceToneFeatureName,
  definition: VoiceToneFeatureDefinition,
  policies: readonly TonePolicyRecord[],
): VoiceToneFeatureValue {
  const values = policies.flatMap((policy) =>
    policy.payload.feature_values.filter((value) => value.feature_name === featureName));
  if (values.length === 0) {
    return {
      feature_name: featureName,
      definition_ref: copyRef(definition),
      lower_bound: 0,
      upper_bound: 1,
      uncertainty: "insufficient_evidence",
      applicability: "unknown",
    };
  }

  let lowerBound = 0;
  let upperBound = 1;
  let applicable = false;
  let allNotApplicable = true;
  let uncertainty: VoiceToneFeatureValue["uncertainty"] = "none";
  for (const value of values) {
    if (!exactRef(value.definition_ref, copyRef(definition))) {
      fail(`feature_definition_binding:${featureName}`);
    }
    if (!Number.isFinite(value.lower_bound) || !Number.isFinite(value.upper_bound)
      || value.lower_bound < 0 || value.upper_bound > 1
      || value.lower_bound > value.upper_bound) {
      fail(`feature_interval:${featureName}`);
    }
    if (value.applicability === "applicable") {
      applicable = true;
      allNotApplicable = false;
      lowerBound = Math.max(lowerBound, value.lower_bound);
      upperBound = Math.min(upperBound, value.upper_bound);
    } else if (value.applicability === "unknown") {
      allNotApplicable = false;
    }
    if (value.uncertainty === "insufficient_evidence") uncertainty = "insufficient_evidence";
    else if (value.uncertainty === "bounded" && uncertainty === "none") uncertainty = "bounded";
  }
  if (lowerBound > upperBound) fail(`feature_interval_conflict:${featureName}`);

  return {
    feature_name: featureName,
    definition_ref: copyRef(definition),
    lower_bound: lowerBound,
    upper_bound: upperBound,
    uncertainty,
    applicability: applicable ? "applicable" : allNotApplicable ? "not_applicable" : "unknown",
  };
}

export function compileVoiceToneMap(input: CompileVoiceToneMapInput): VoiceToneMapSnapshot {
  validateProfile(input.profile_candidate);
  const definitions = validateDefinitions(input.feature_definitions);
  validatePolicies(input.tone_policies);
  assertExactPolicyRefs(input.profile_candidate, input.tone_policies);

  const lineage = [
    input.profile_candidate,
    ...input.feature_definitions,
    ...input.tone_policies,
    ...input.lineage_records,
  ];
  const lineageById = verifyVoiceLineage(lineage);
  for (const evidenceRef of [
    ...input.profile_candidate.payload.source_evidence_refs,
    ...input.tone_policies.flatMap((policy) => policy.payload.evidence_refs),
  ]) {
    const record = lineageById.get(evidenceRef.record_id);
    if (record === undefined || !exactRef(copyRef(record), evidenceRef)) {
      fail(`evidence_binding:${evidenceRef.record_id}`);
    }
  }

  const featureValues = FEATURE_NAMES.map((featureName) =>
    projectFeature(featureName, definitions.get(featureName)!, input.tone_policies));
  const evidenceRefs = uniqueSortedRefs([
    ...input.profile_candidate.payload.source_evidence_refs,
    ...input.tone_policies.flatMap((policy) => policy.payload.evidence_refs),
  ]);
  const projection = {
    contract_version: "contentmd.voice-tone-map-projection/0.1.0" as const,
    profile_candidate_ref: copyRef(input.profile_candidate),
    feature_values: featureValues,
    evidence_refs: evidenceRefs,
  };
  const projectionDigest = sha256Canonical(projection);
  const record = finalizeRecord<VoiceToneMapSnapshotPayload>({
    record_id: `voice_tone_map.${projectionDigest.slice(0, 32)}`,
    schema_id: SCHEMA_IDS.voiceToneMapSnapshot,
    schema_version: "0.1.0",
    record_version: 1,
    scope: copyScope(input.profile_candidate.scope),
    provenance: [{
      record_id: input.profile_candidate.record_id,
      relationship: "projected_from",
      content_digest: input.profile_candidate.content_digest,
    }],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.voice-tone-map-snapshot/0.1.0",
      profile_candidate_ref: copyRef(input.profile_candidate),
      feature_values: featureValues,
      evidence_refs: evidenceRefs,
      projection_digest: projectionDigest,
      decision_state: "proposed",
      authority_effect: "none",
    },
  });
  if (!validateRecord(SCHEMA_IDS.voiceToneMapSnapshot, record).valid) fail("output_schema");
  return record;
}
