import type { DurableRecord } from "@contentmd/core";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export interface PatternDispositionPayload {
  contract_version: "contentmd.pattern-disposition/0.1.0";
  pattern_ref: ResearchRecordRef;
  evidence_refs: ResearchRecordRef[];
  disposition: "evidence_only" | "candidate_abstraction" | "rejected";
  prompt_eligibility: "never" | "review_required";
  training_eligibility: "never" | "project_owned_application_only";
  benchmark_eligibility: false;
  rights_review_state: "not_established" | "reviewed";
  similarity_review_state: "not_run" | "passed" | "failed";
  reviewer_refs: ResearchRecordRef[];
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export type PatternDispositionRecord = DurableRecord<PatternDispositionPayload>;
