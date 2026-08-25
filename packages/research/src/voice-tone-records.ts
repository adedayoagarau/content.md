import type { DurableRecord } from "@contentmd/core";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export type VoiceToneFeatureName =
  | "directness"
  | "formality"
  | "warmth"
  | "reassurance"
  | "expressiveness"
  | "humor"
  | "urgency"
  | "information_density"
  | "authority_stance";

export interface VoiceToneFeatureValue {
  feature_name: VoiceToneFeatureName;
  definition_ref: ResearchRecordRef;
  lower_bound: number;
  upper_bound: number;
  uncertainty: "none" | "bounded" | "insufficient_evidence";
  applicability: "applicable" | "not_applicable" | "unknown";
}

export interface OrganizationVoiceProfileCandidatePayload {
  contract_version: "contentmd.organization-voice-profile-candidate/0.1.0";
  organization_id: string;
  candidate_name: string;
  principle_refs: ResearchRecordRef[];
  tone_policy_refs: ResearchRecordRef[];
  domain_overlay_refs: ResearchRecordRef[];
  source_evidence_refs: ResearchRecordRef[];
  decision_state: "proposed";
  uncertainty: "bounded" | "material" | "insufficient_evidence";
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export interface VoicePrinciplePayload {
  contract_version: "contentmd.voice-principle/0.1.0";
  title: string;
  description: string;
  feature_constraints: string[];
  evidence_refs: ResearchRecordRef[];
  decision_state: "proposed";
  authority_effect: ResearchAuthorityEffect;
}

export interface TonePolicyPayload {
  contract_version: "contentmd.tone-policy/0.1.0";
  situation: string;
  feature_values: VoiceToneFeatureValue[];
  prohibited_treatments: string[];
  evidence_refs: ResearchRecordRef[];
  decision_state: "proposed";
  authority_effect: ResearchAuthorityEffect;
}

export interface DomainOverlayPayload {
  contract_version: "contentmd.domain-overlay/0.1.0";
  domain: string;
  industry_context: string;
  risk_levels: string[];
  constraint_refs: ResearchRecordRef[];
  evidence_refs: ResearchRecordRef[];
  industry_authority_effect: "none";
  authority_effect: ResearchAuthorityEffect;
  limitations: string[];
}

export interface VoiceToneFeatureDefinitionPayload {
  contract_version: "contentmd.voice-tone-feature-definition/0.1.0";
  feature_name: VoiceToneFeatureName;
  definition_version: string;
  description: string;
  value_kind: "bounded_interval";
  lower_bound: 0;
  upper_bound: 1;
  measurement_notes: string[];
  applicability: "advisory_only";
  authority_effect: ResearchAuthorityEffect;
}

export interface VoiceToneMapSnapshotPayload {
  contract_version: "contentmd.voice-tone-map-snapshot/0.1.0";
  profile_candidate_ref: ResearchRecordRef;
  feature_values: VoiceToneFeatureValue[];
  evidence_refs: ResearchRecordRef[];
  projection_digest: string;
  decision_state: "proposed";
  authority_effect: ResearchAuthorityEffect;
}

export interface VoiceToneGraphEdge {
  from_ref: ResearchRecordRef;
  relationship: "supported_by" | "constrained_by" | "qualified_by" | "challenges";
  to_ref: ResearchRecordRef;
}

export interface VoiceToneGraphSnapshotPayload {
  contract_version: "contentmd.voice-tone-graph-snapshot/0.1.0";
  root_profile_ref: ResearchRecordRef;
  node_refs: ResearchRecordRef[];
  edges: VoiceToneGraphEdge[];
  projection_digest: string;
  decision_state: "proposed";
  authority_effect: ResearchAuthorityEffect;
}

export type OrganizationVoiceProfileCandidate = DurableRecord<OrganizationVoiceProfileCandidatePayload>;
export type VoicePrincipleRecord = DurableRecord<VoicePrinciplePayload>;
export type TonePolicyRecord = DurableRecord<TonePolicyPayload>;
export type DomainOverlayRecord = DurableRecord<DomainOverlayPayload>;
export type VoiceToneFeatureDefinition = DurableRecord<VoiceToneFeatureDefinitionPayload>;
export type VoiceToneMapSnapshot = DurableRecord<VoiceToneMapSnapshotPayload>;
export type VoiceToneGraphSnapshot = DurableRecord<VoiceToneGraphSnapshotPayload>;
