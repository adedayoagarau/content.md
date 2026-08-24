import type { PatternContext, PatternTransferCondition } from "./pattern-record.js";

export interface PatternPacketRecordV01 {
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
