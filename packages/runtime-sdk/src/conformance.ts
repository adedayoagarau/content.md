import type { BoundRuntimeRecordRef } from "./operation.js";

export interface RuntimeConformanceReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly interface_id: string;
  readonly interface_version: string;
  readonly implementation_id: string;
  readonly implementation_version: string;
  readonly implementation_digest: string;
  readonly fixture_trace_digest: string;
  readonly passed_check_ids: readonly string[];
  readonly failed_check_ids: readonly string[];
  readonly node_version: string;
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface RuntimeBindingDecision {
  readonly schema_version: "0.1.0";
  readonly decision_id: string;
  readonly project_id: string;
  readonly proposal_ref: BoundRuntimeRecordRef;
  readonly proposal_digest: string;
  readonly selected_descriptor_ref: string;
  readonly selected_descriptor_digest: string;
  readonly canonical_replica_runtime_id: string;
  readonly decision_status: "approved" | "rejected" | "superseded";
  readonly actor_ref: string;
  readonly principal_ref: string;
  readonly workload_ref: string;
  readonly rationale: string;
  readonly decided_at: string;
  readonly authorization_ref: BoundRuntimeRecordRef;
  readonly authorization_digest: string;
  readonly conformance_receipt_refs: readonly BoundRuntimeRecordRef[];
  readonly applicable_control_refs: readonly BoundRuntimeRecordRef[];
  readonly decision_digest: string;
}
