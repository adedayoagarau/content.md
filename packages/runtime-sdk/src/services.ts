import type { AuthorizedRuntimeOperation, AuthenticatedRuntimeSession } from "./operation.js";

export interface GovernedJob {
  readonly schema_version: "0.1.0";
  readonly job_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly handler_id: string;
  readonly input_ref: string;
  readonly input_digest: string;
  readonly requested_at: string;
  readonly job_digest: string;
}

export interface JobReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly job_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly input_digest: string;
  readonly status: "queued" | "running" | "approval_paused" | "completed" | "cancelled" | "failed" | "remote_outcome_unknown";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface JobStatus {
  readonly schema_version: "0.1.0";
  readonly job_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly status: JobReceipt["status"];
  readonly attempt: number;
  readonly updated_at: string;
  readonly output_ref: string | null;
  readonly output_digest: string | null;
  readonly status_digest: string;
}

export interface RuntimeJobRunner {
  start(job: GovernedJob, operation: AuthorizedRuntimeOperation): Promise<JobReceipt>;
  inspect(jobId: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
  cancel(jobId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<JobStatus>;
}

export interface ApprovalPauseRequest {
  readonly schema_version: "0.1.0";
  readonly pause_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly subject_ref: string;
  readonly subject_digest: string;
  readonly approval_class: string;
  readonly requested_at: string;
  readonly expires_at: string;
  readonly request_digest: string;
}

export interface ApprovalPauseReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly pause_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly subject_digest: string;
  readonly status: "pending";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface ApprovalResolution {
  readonly schema_version: "0.1.0";
  readonly resolution_id: string;
  readonly pause_id: string;
  readonly project_id: string;
  readonly subject_ref: string;
  readonly subject_digest: string;
  readonly decision_ref: string;
  readonly decision_digest: string;
  readonly disposition: "approved" | "rejected";
  readonly resolved_at: string;
  readonly resolution_digest: string;
}

export interface ApprovalPauseStatus {
  readonly schema_version: "0.1.0";
  readonly pause_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly subject_digest: string;
  readonly status: "pending" | "approved" | "rejected" | "expired" | "revoked" | "subject_changed" | "currentness_unknown";
  readonly updated_at: string;
  readonly status_digest: string;
}

export interface RuntimeApprovalPause {
  pause(request: ApprovalPauseRequest, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseReceipt>;
  resolve(decision: ApprovalResolution, operation: AuthorizedRuntimeOperation): Promise<ApprovalPauseStatus>;
}

export interface ProgressEvent {
  readonly schema_version: "0.1.0";
  readonly event_id: string;
  readonly operation_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly sequence: number;
  readonly predecessor_digest: string | null;
  readonly status: string;
  readonly message: string;
  readonly occurred_at: string;
  readonly event_digest: string;
}

export interface RuntimeProgressPublisher {
  publish(event: ProgressEvent, operation: AuthorizedRuntimeOperation): Promise<void>;
}

export interface ExportRequest {
  readonly schema_version: "0.1.0";
  readonly export_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly checkpoint_ref: string;
  readonly checkpoint_digest: string;
  readonly requested_at: string;
  readonly request_digest: string;
}

export interface ExportReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly export_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly manifest_ref: string;
  readonly manifest_digest: string;
  readonly status: "completed" | "incomplete" | "failed";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface RuntimeExporter {
  exportSnapshot(request: ExportRequest, operation: AuthorizedRuntimeOperation): Promise<ExportReceipt>;
}

export interface AuthorizedBlob {
  readonly schema_version: "0.1.0";
  readonly blob_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly media_type: string;
  readonly schema_id: string | null;
  readonly data_class: string;
  readonly disposition: "required" | "optional";
  readonly export_permission: "permitted" | "forbidden";
  readonly parent_refs: readonly string[];
  readonly retention_ref: string;
  readonly bytes: Uint8Array;
  readonly sha256_digest: string;
}

export interface BlobRef {
  readonly blob_id: string;
  readonly sha256_digest: string;
}

export interface BlobReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly blob_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly sha256_digest: string;
  readonly byte_count: number;
  readonly status: "stored" | "existing";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface VerifiedBlob {
  readonly schema_version: "0.1.0";
  readonly blob_id: string;
  readonly media_type: string;
  readonly byte_count: number;
  readonly sha256_digest: string;
  readonly bytes: Uint8Array;
  readonly verified_at: string;
  readonly verification_digest: string;
}

export interface BlobExpiryRequest {
  readonly schema_version: "0.1.0";
  readonly request_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly blob_ref: BlobRef;
  readonly reason: string;
  readonly requested_at: string;
  readonly request_digest: string;
}

export interface BlobExpiryReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly blob_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly status: "expired" | "retained_referenced";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface RuntimeBlobStore {
  put(blob: AuthorizedBlob, operation: AuthorizedRuntimeOperation): Promise<BlobReceipt>;
  get(ref: BlobRef, operation: AuthorizedRuntimeOperation): Promise<VerifiedBlob>;
  expire(request: BlobExpiryRequest, operation: AuthorizedRuntimeOperation): Promise<BlobExpiryReceipt>;
}

export interface ScheduledGovernedJob {
  readonly schema_version: "0.1.0";
  readonly schedule_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly governed_job_ref: string;
  readonly governed_job_digest: string;
  readonly schedule_expression: string;
  readonly timezone: string;
  readonly next_occurrence: string;
  readonly schedule_digest: string;
}

export interface ScheduleReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly schedule_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly status: "active";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface ScheduleStatus {
  readonly schema_version: "0.1.0";
  readonly schedule_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly status: "active" | "cancelled" | "completed";
  readonly next_occurrence: string | null;
  readonly updated_at: string;
  readonly status_digest: string;
}

export interface RuntimeScheduler {
  schedule(job: ScheduledGovernedJob, operation: AuthorizedRuntimeOperation): Promise<ScheduleReceipt>;
  inspect(scheduleId: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
  cancel(scheduleId: string, reason: string, operation: AuthorizedRuntimeOperation): Promise<ScheduleStatus>;
}

export interface RuntimeIngressRequest {
  readonly schema_version: "0.1.0";
  readonly request_id: string;
  readonly tenant_ref: string;
  readonly principal_attestation_ref: string;
  readonly workload_ref: string;
  readonly project_ref: string;
  readonly connection_ref: string;
  readonly requested_at: string;
  readonly request_digest: string;
}

export interface SchemaValidatedRpcRequest {
  readonly schema_version: "0.1.0";
  readonly request_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly method: string;
  readonly input_schema_id: string;
  readonly input: unknown;
  readonly input_digest: string;
}

export interface RpcReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly request_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly output_ref: string | null;
  readonly output_digest: string | null;
  readonly status: "completed" | "failed";
  readonly issued_at: string;
  readonly receipt_digest: string;
}

export interface AuthorizedSubscription {
  readonly schema_version: "0.1.0";
  readonly subscription_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly resource_refs: readonly string[];
  readonly data_classes: readonly string[];
  readonly after_sequence: number;
  readonly request_digest: string;
}

export interface ReadonlyEventChannel extends AsyncIterable<ProgressEvent> {
  readonly channel_id: string;
  readonly channel_digest: string;
  close(): Promise<void>;
}

export interface RuntimeIngress {
  authenticate(request: RuntimeIngressRequest): Promise<AuthenticatedRuntimeSession>;
  invoke(
    session: AuthenticatedRuntimeSession,
    request: SchemaValidatedRpcRequest,
    operation: AuthorizedRuntimeOperation,
  ): Promise<RpcReceipt>;
  subscribe(
    session: AuthenticatedRuntimeSession,
    request: AuthorizedSubscription,
    operation: AuthorizedRuntimeOperation,
  ): Promise<ReadonlyEventChannel>;
}

export interface SecretRef {
  readonly schema_version: "0.1.0";
  readonly secret_ref_id: string;
  readonly project_id: string;
  readonly resolver_id: string;
  readonly source_name: string;
  readonly allowed_adapter_ids: readonly string[];
  readonly purpose: string;
  readonly issued_at: string;
  readonly expires_at: string;
  readonly ref_digest: string;
}

export interface SecretLease {
  readonly lease_id: string;
  readonly secret_ref_id: string;
  readonly fingerprint: string;
  readonly resolver_id: string;
  readonly issued_at: string;
  readonly expires_at: string;
  withValue<T>(use: (value: Uint8Array) => T | Promise<T>): Promise<T>;
}

export interface RuntimeSecretResolver {
  resolve(ref: SecretRef, operation: AuthorizedRuntimeOperation): Promise<SecretLease>;
}

export interface RuntimeHealthReport {
  readonly schema_version: "0.1.0";
  readonly report_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly status: "healthy" | "degraded" | "unhealthy";
  readonly check_results: readonly Readonly<{ check_id: string; status: "pass" | "fail" | "unknown"; detail_digest: string }>[];
  readonly inspected_at: string;
  readonly report_digest: string;
}

export interface CleanupRequest {
  readonly schema_version: "0.1.0";
  readonly request_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly object_classes: readonly string[];
  readonly older_than: string;
  readonly requested_at: string;
  readonly request_digest: string;
}

export interface CleanupReceipt {
  readonly schema_version: "0.1.0";
  readonly receipt_id: string;
  readonly request_id: string;
  readonly project_id: string;
  readonly runtime_binding_digest: string;
  readonly removed_refs: readonly string[];
  readonly retained: readonly Readonly<{ object_ref: string; reason: string }>[];
  readonly completed_at: string;
  readonly receipt_digest: string;
}

export interface RuntimeHealth {
  inspect(binding: import("./descriptor.js").RuntimeBinding, operation: AuthorizedRuntimeOperation): Promise<RuntimeHealthReport>;
}

export interface RuntimeCleanup {
  clean(request: CleanupRequest, operation: AuthorizedRuntimeOperation): Promise<CleanupReceipt>;
}
