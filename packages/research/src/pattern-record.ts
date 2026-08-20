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

export interface ContentPatternRecord {
  schema_version: "contentmd.pattern/0.1.0";
  pattern_id: string;
  source_refs: string[];
  evidence_strength: string;
  problem: string;
  context: PatternContext;
  mechanism: string;
  counterexample: string;
  failure_mode: string;
  transfer_conditions: PatternTransferCondition[];
  non_transferable_detail: string;
  prohibited_imitation_boundary: string;
}

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
  patterns: ContentPatternRecord[];
}
