import type { RuntimeDescriptor } from "./descriptor.js";
import type { BoundRuntimeRecordRef } from "./operation.js";

export interface RuntimeDetectionEvidence {
  readonly evidence_id: string;
  readonly kind: string;
  readonly relative_locator: string;
  readonly content_digest: string | null;
  readonly observation: string;
  readonly confidence: "low" | "medium" | "high";
  readonly conflict_state: "none" | "conflicting" | "unknown";
  readonly authority_effect: "none";
}

export interface RuntimeDetectionReport {
  readonly schema_version: "0.1.0";
  readonly report_id: string;
  readonly project_root_digest: string;
  readonly evidence: readonly RuntimeDetectionEvidence[];
  readonly conflicts: readonly string[];
  readonly unknowns: readonly string[];
  readonly inspected_at: string;
  readonly authority_effect: "none";
  readonly report_digest: string;
}

export interface RuntimeCandidateProposal {
  readonly runtime_id: string;
  readonly descriptor_ref: string;
  readonly descriptor_digest: string;
  readonly availability: "available" | "unavailable" | "adapter_unavailable_pending_plan_4";
  readonly bindable: boolean;
  readonly failure_code: "runtime_capability_unsupported" | null;
  readonly requirements: readonly string[];
  readonly trade_offs: readonly string[];
  readonly conflicts: readonly string[];
  readonly unknowns: readonly string[];
}

export interface RuntimeProposalRecord {
  readonly schema_version: "0.1.0";
  readonly proposal_id: string;
  readonly detection_report_ref: BoundRuntimeRecordRef;
  readonly detection_report_digest: string;
  readonly candidates: readonly RuntimeCandidateProposal[];
  readonly recommended_runtime_id: string;
  readonly authority_effect: "none";
  readonly proposal_digest: string;
}

export interface RuntimeDetector {
  inspect(projectRoot: string): Promise<RuntimeDetectionReport>;
  propose(
    report: RuntimeDetectionReport,
    descriptors: readonly RuntimeDescriptor[],
  ): Promise<RuntimeProposalRecord>;
}
