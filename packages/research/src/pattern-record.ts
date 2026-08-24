export type PatternRightsStatus =
  | "project_owned_synthetic"
  | "licensed_for_pattern_learning"
  | "public_domain";

export interface PatternSourceRecord {
  source_id: string;
  source_type: string;
  locator: string;
  access_mode: string;
  captured_at: string;
  rights_status: PatternRightsStatus;
  evidence_strength: string;
}

export interface PatternContext {
  journeys: string[];
  stages: string[];
  states: string[];
  channels: string[];
  modalities: string[];
  locales: string[];
  risk_levels: string[];
}

export interface PatternQuery {
  journey: string;
  stage: string;
  state: string;
  channel: string;
  modality: string;
  locale: string;
  risk_level: string;
  rights_status: PatternRightsStatus;
}

export type PatternTransferField = keyof PatternQuery;

export interface PatternTransferCondition {
  field: PatternTransferField;
  values: string[];
}

import type { DurableRecord } from "@contentmd/core";
import type { PatternPacketRecordV01 } from "./pattern-packet-v01.js";

export interface ContentPatternPayload {
  evidence_strength: string;
  problem: string;
  contexts: PatternContext[];
  mechanism: string;
  source_refs: string[];
  counterexamples: string[];
  failure_modes: string[];
  transfer_conditions: PatternTransferCondition[];
  non_transferable_details: string[];
  rights_boundary: string;
}

export type ContentPatternRecord = DurableRecord<ContentPatternPayload>;

export interface PatternMatch {
  pattern_id: string;
  eligible: boolean;
  score: number;
  reasons: string[];
  nonmatch_reasons: string[];
  pattern: ContentPatternRecord;
}

export interface PatternIngestResult {
  packet_id: string;
  packet_digest: string;
  rights_status: PatternRightsStatus;
  sources: PatternSourceRecord[];
  patterns: PatternPacketRecordV01[];
  records: ContentPatternRecord[];
}
