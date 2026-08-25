import type { DurableRecord } from "@contentmd/core";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export interface ResearchEvidenceDimensions {
  behavior: "observed_direct" | "observed_indirect" | "not_observed";
  meaning: "explicit" | "inferred_from_visible_context" | "not_observed";
  accessibility: "observed" | "not_observed";
  localization: "observed" | "not_observed";
  outcome: "observed" | "not_observed";
}

export interface BrowserObservationPayload {
  contract_version: "contentmd.browser-observation/0.1.0";
  source_ref: ResearchRecordRef;
  surface: string;
  journey: string;
  state: string;
  channel: string;
  locale: string;
  locator: string;
  capture_ref: ResearchRecordRef | null;
  bounded_span: string | null;
  bounded_span_digest: string | null;
  availability: "observed" | "not_observed" | "access_blocked";
  direct_exercise_state:
    | "directly_exercised_synthetic_input"
    | "visible_not_exercised"
    | "not_observed";
  observation_strength: "direct_visible_observation" | "official_example" | "not_observed";
  evidence_dimensions: ResearchEvidenceDimensions;
  taint_flags: string[];
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export type BrowserObservationRecord = DurableRecord<BrowserObservationPayload>;
