import {
  finalizeRecord,
  verifyRecordDigest,
  type DurableRecord,
  type DurableRecordInput,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export interface ResearchAcquisitionManifestPayload {
  contract_version: "contentmd.research-acquisition-manifest/0.1.0";
  batch_id: string;
  systems: string[];
  source_classes: string[];
  state_slots: string[];
  page_limit: number;
  observation_limit: number;
  allowed_origins: string[];
  allowed_routes: string[];
  profile_isolation_state:
    | "established_signed_out_ephemeral"
    | "not_established"
    | "expired"
    | "revoked";
  runtime_verification_ref: ResearchRecordRef | null;
  external_research_grant_ref: ResearchRecordRef | null;
  capture_plan: string[];
  teardown_plan: string[];
  no_login: true;
  no_account_creation: true;
  no_purchase: true;
  no_personal_data: true;
  no_submission: true;
  no_mutation: true;
  authority_effect: ResearchAuthorityEffect;
}

export type ResearchAcquisitionManifest = DurableRecord<ResearchAcquisitionManifestPayload>;

export type CreateResearchAcquisitionManifestInput = Omit<
  DurableRecordInput<ResearchAcquisitionManifestPayload>,
  "schema_id" | "schema_version" | "record_version"
>;

export interface ResearchBatchCounts {
  sources: number;
  observations: number;
  claims: number;
  expressions: number;
  patterns: number;
}

export interface ResearchBatchManifestPayload {
  contract_version: "contentmd.research-batch-manifest/0.1.0";
  acquisition_manifest_ref: ResearchRecordRef;
  source_refs: ResearchRecordRef[];
  observation_refs: ResearchRecordRef[];
  claim_refs: ResearchRecordRef[];
  expression_evidence_refs: ResearchRecordRef[];
  pattern_disposition_refs: ResearchRecordRef[];
  counts: ResearchBatchCounts;
  protocol_conformance:
    | "conforming"
    | "nonconforming_profile"
    | "nonconforming_authorization";
  controlled_corpus_eligibility: boolean;
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export type ResearchBatchManifest = DurableRecord<ResearchBatchManifestPayload>;

export type ResearchAcquisitionDenialReason =
  | "manifest_invalid"
  | "manifest_digest_invalid"
  | "profile_isolation_not_established"
  | "runtime_verification_missing"
  | "external_research_grant_missing";

export type ResearchAcquisitionDecision =
  | { allowed: true; reason: null; authority_effect: "none" }
  | { allowed: false; reason: ResearchAcquisitionDenialReason; authority_effect: "none" };

export function createResearchAcquisitionManifest(
  input: CreateResearchAcquisitionManifestInput,
): ResearchAcquisitionManifest {
  const record = finalizeRecord<ResearchAcquisitionManifestPayload>({
    record_id: input.record_id,
    schema_id: SCHEMA_IDS.researchAcquisitionManifest,
    schema_version: "0.1.0",
    record_version: 1,
    scope: input.scope,
    provenance: input.provenance,
    lifecycle_state: input.lifecycle_state,
    payload: input.payload,
  });
  const validation = validateRecord(SCHEMA_IDS.researchAcquisitionManifest, record);
  if (!validation.valid) {
    throw new TypeError(`invalid_research_acquisition_manifest:${validation.errors.join("|")}`);
  }
  return record;
}

export function evaluateResearchAcquisition(
  manifest: ResearchAcquisitionManifest,
): ResearchAcquisitionDecision {
  if (!validateRecord(SCHEMA_IDS.researchAcquisitionManifest, manifest).valid) {
    return { allowed: false, reason: "manifest_invalid", authority_effect: "none" };
  }
  if (!verifyRecordDigest(manifest).valid) {
    return { allowed: false, reason: "manifest_digest_invalid", authority_effect: "none" };
  }
  if (manifest.payload.profile_isolation_state !== "established_signed_out_ephemeral") {
    return {
      allowed: false,
      reason: "profile_isolation_not_established",
      authority_effect: "none",
    };
  }
  if (manifest.payload.runtime_verification_ref === null) {
    return { allowed: false, reason: "runtime_verification_missing", authority_effect: "none" };
  }
  if (manifest.payload.external_research_grant_ref === null) {
    return {
      allowed: false,
      reason: "external_research_grant_missing",
      authority_effect: "none",
    };
  }
  return { allowed: true, reason: null, authority_effect: "none" };
}
