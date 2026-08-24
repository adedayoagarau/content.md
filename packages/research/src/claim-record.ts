import type { DurableRecord } from "@contentmd/core";
import type { ResearchAuthorityEffect, ResearchRecordRef } from "./source-record.js";

export interface ResearchClaimPayload {
  contract_version: "contentmd.research-claim/0.1.0";
  claim: string;
  source_refs: ResearchRecordRef[];
  observation_refs: ResearchRecordRef[];
  evidence_strength: "direct" | "corroborated" | "limited";
  uncertainty: "none" | "bounded" | "material";
  limitations: string[];
  authority_effect: ResearchAuthorityEffect;
}

export type ResearchClaimRecord = DurableRecord<ResearchClaimPayload>;
