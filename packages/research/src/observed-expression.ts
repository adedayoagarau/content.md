import {
  finalizeRecord,
  type DurableRecord,
  type DurableRecordInput,
} from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export interface ObservedExpressionEvidencePayload {
  contract_version: "contentmd.observed-expression-evidence/0.1.0";
  source_ref: ResearchRecordRef;
  observation_ref: ResearchRecordRef;
  source_class: "other_product_public";
  bounded_span: string;
  span_digest: string;
  reuse_disposition: "evidence_only";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  authority_effect: ResearchAuthorityEffect;
  rights_review_state: "not_established" | "reviewed_evidence_only";
  distinctive_expression_fingerprint: string;
  limitations: string[];
}

export type ObservedExpressionEvidenceRecord = DurableRecord<ObservedExpressionEvidencePayload>;

export type ObservedExpressionEvidenceDraftPayload = Omit<
  ObservedExpressionEvidencePayload,
  | "contract_version"
  | "reuse_disposition"
  | "prompt_eligibility"
  | "training_eligibility"
  | "benchmark_eligibility"
  | "authority_effect"
>;

export type CreateObservedExpressionEvidenceInput = Omit<
  DurableRecordInput<ObservedExpressionEvidencePayload>,
  "schema_id" | "schema_version" | "record_version" | "payload"
> & { payload: ObservedExpressionEvidenceDraftPayload };

export function createObservedExpressionEvidenceRecord(
  input: CreateObservedExpressionEvidenceInput,
): ObservedExpressionEvidenceRecord {
  const record = finalizeRecord<ObservedExpressionEvidencePayload>({
    record_id: input.record_id,
    schema_id: SCHEMA_IDS.observedExpressionEvidence,
    schema_version: "0.1.0",
    record_version: 1,
    scope: input.scope,
    provenance: input.provenance,
    lifecycle_state: input.lifecycle_state,
    payload: {
      contract_version: "contentmd.observed-expression-evidence/0.1.0",
      ...input.payload,
      reuse_disposition: "evidence_only",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
      authority_effect: "none",
    },
  });
  const validation = validateRecord(SCHEMA_IDS.observedExpressionEvidence, record);
  if (!validation.valid) {
    throw new TypeError(`invalid_observed_expression_evidence:${validation.errors.join("|")}`);
  }
  return record;
}
