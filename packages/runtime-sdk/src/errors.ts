export type RuntimeErrorCode =
  | "runtime_detection_inconclusive"
  | "runtime_capability_unsupported"
  | "runtime_binding_not_authorized"
  | "runtime_operation_nonce_replayed"
  | "runtime_replica_acknowledgement_missing"
  | "runtime_replica_gap_detected"
  | "runtime_replica_fork_detected"
  | "runtime_canonical_commit_unavailable"
  | "runtime_preview_not_committed"
  | "runtime_host_persistence_before_canonical_ack"
  | "runtime_session_invalid"
  | "runtime_secret_unavailable"
  | "runtime_export_incomplete"
  | "runtime_cleanup_not_authorized"
  | "event_id_digest_conflict";

export class RuntimeError extends Error {
  readonly code: RuntimeErrorCode;

  constructor(code: RuntimeErrorCode, detail?: string) {
    super(detail === undefined ? code : `${code}:${detail}`);
    this.name = "RuntimeError";
    this.code = code;
  }
}
