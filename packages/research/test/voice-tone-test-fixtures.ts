import { finalizeRecord, type DurableRecord, type ProvenanceRef } from "@contentmd/core";
import {
  createResearchAcquisitionManifest,
  type OrganizationVoiceProfileCandidate,
  type OrganizationVoiceProfileCandidatePayload,
  type ResearchAcquisitionManifest,
  type ResearchBatchManifest,
  type ResearchBatchManifestPayload,
  type ResearchRecordRef,
  type TonePolicyPayload,
  type TonePolicyRecord,
  type VoiceToneFeatureDefinition,
  type VoiceToneFeatureDefinitionPayload,
  type VoiceToneFeatureName,
} from "@contentmd/research";
import { SCHEMA_IDS } from "@contentmd/schemas";

export const FEATURE_NAMES = [
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

const digest = "0".repeat(64);

export function researchRef(record: DurableRecord<unknown>): ResearchRecordRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function provenance(record: DurableRecord<unknown>, relationship: string): ProvenanceRef {
  return {
    record_id: record.record_id,
    relationship,
    content_digest: record.content_digest,
  };
}

function scope() {
  return {
    memory_scope: "project" as const,
    project_id: "project.synthetic.voice",
    resource_refs: ["voice.synthetic"],
    data_classes: ["project-owned-synthetic"],
  };
}

function verificationRef(recordId: string): ResearchRecordRef {
  return {
    record_id: recordId,
    schema_id: SCHEMA_IDS.verificationReceipt,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

export interface VoiceToneFixture {
  acquisition: ResearchAcquisitionManifest;
  batch: ResearchBatchManifest;
  definitions: VoiceToneFeatureDefinition[];
  policy: TonePolicyRecord;
  profile: OrganizationVoiceProfileCandidate;
  lineage_records: DurableRecord<unknown>[];
}

export function voiceToneFixture(options: {
  controlledCorpusEligible?: boolean;
  protocolConformance?: ResearchBatchManifestPayload["protocol_conformance"];
} = {}): VoiceToneFixture {
  const acquisition = createResearchAcquisitionManifest({
    record_id: "research_acquisition.voice.synthetic",
    scope: scope(),
    provenance: [],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.research-acquisition-manifest/0.1.0",
      batch_id: "voice_synthetic",
      systems: ["project-owned-synthetic-comparisons"],
      source_classes: ["project_owned_synthetic"],
      state_slots: ["recovery"],
      page_limit: 1,
      observation_limit: 1,
      allowed_origins: ["https://example.invalid"],
      allowed_routes: ["https://example.invalid/synthetic"],
      profile_isolation_state: "established_signed_out_ephemeral",
      runtime_verification_ref: verificationRef("verification.runtime.voice.current"),
      external_research_grant_ref: verificationRef("verification.research.voice.current"),
      capture_plan: ["Use project-owned synthetic comparisons only."],
      teardown_plan: ["Discard transient comparison state."],
      no_login: true,
      no_account_creation: true,
      no_purchase: true,
      no_personal_data: true,
      no_submission: true,
      no_mutation: true,
      authority_effect: "none",
    },
  });
  const batch = finalizeRecord<ResearchBatchManifestPayload>({
    record_id: "research_batch.voice.synthetic",
    schema_id: SCHEMA_IDS.researchBatchManifest,
    schema_version: "0.1.0",
    record_version: 1,
    scope: scope(),
    provenance: [provenance(acquisition, "governed_by")],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.research-batch-manifest/0.1.0",
      acquisition_manifest_ref: researchRef(acquisition),
      source_refs: [],
      observation_refs: [],
      claim_refs: [],
      expression_evidence_refs: [],
      pattern_disposition_refs: [],
      counts: { sources: 0, observations: 0, claims: 0, expressions: 0, patterns: 0 },
      protocol_conformance: options.protocolConformance ?? "conforming",
      controlled_corpus_eligibility: options.controlledCorpusEligible ?? true,
      limitations: ["Project-owned synthetic comparison batch."],
      authority_effect: "none",
    },
  });
  const definitions = FEATURE_NAMES.map((featureName) =>
    finalizeRecord<VoiceToneFeatureDefinitionPayload>({
      record_id: `voice_tone_feature.${featureName}.v1`,
      schema_id: SCHEMA_IDS.voiceToneFeatureDefinition,
      schema_version: "0.1.0",
      record_version: 1,
      scope: scope(),
      provenance: [],
      lifecycle_state: "proposed",
      payload: {
        contract_version: "contentmd.voice-tone-feature-definition/0.1.0",
        feature_name: featureName,
        definition_version: "1.0.0",
        description: `Synthetic advisory definition for ${featureName}.`,
        value_kind: "bounded_interval",
        lower_bound: 0,
        upper_bound: 1,
        measurement_notes: ["Product truth and safety remain separate hard planes."],
        applicability: "advisory_only",
        authority_effect: "none",
      },
    }));
  const policy = finalizeRecord<TonePolicyPayload>({
    record_id: "tone_policy.voice.synthetic.recovery",
    schema_id: SCHEMA_IDS.tonePolicy,
    schema_version: "0.1.0",
    record_version: 1,
    scope: scope(),
    provenance: [provenance(batch, "supported_by")],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.tone-policy/0.1.0",
      situation: "synthetic_recovery",
      feature_values: definitions.map((definition, index) => ({
        feature_name: definition.payload.feature_name,
        definition_ref: researchRef(definition),
        lower_bound: index === 0 ? 0.7 : 0.2,
        upper_bound: index === 0 ? 0.9 : 0.8,
        uncertainty: "bounded",
        applicability: "applicable",
      })),
      prohibited_treatments: ["Do not imply product truth from style."],
      evidence_refs: [researchRef(batch)],
      decision_state: "proposed",
      authority_effect: "none",
    },
  });
  const profile = finalizeRecord<OrganizationVoiceProfileCandidatePayload>({
    record_id: "voice_profile.voice.synthetic.candidate",
    schema_id: SCHEMA_IDS.organizationVoiceProfileCandidate,
    schema_version: "0.1.0",
    record_version: 1,
    scope: scope(),
    provenance: [provenance(batch, "supported_by")],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.organization-voice-profile-candidate/0.1.0",
      organization_id: "organization.synthetic",
      candidate_name: "Synthetic evidence-bound voice candidate",
      principle_refs: [],
      tone_policy_refs: [researchRef(policy)],
      domain_overlay_refs: [],
      source_evidence_refs: [researchRef(batch)],
      decision_state: "proposed",
      uncertainty: "bounded",
      limitations: ["Candidate only; no approval or publication authority."],
      authority_effect: "none",
    },
  });

  return {
    acquisition,
    batch,
    definitions,
    policy,
    profile,
    lineage_records: [acquisition, batch],
  };
}
