import type { BoundRuntimeRecordRef } from "./operation.js";
import type { RuntimeEventStoreFactory } from "./event-store.js";
import type { RuntimeSynchronizer } from "./replica.js";
import type {
  RuntimeApprovalPause,
  RuntimeBlobStore,
  RuntimeCleanup,
  RuntimeExporter,
  RuntimeHealth,
  RuntimeIngress,
  RuntimeJobRunner,
  RuntimeProgressPublisher,
  RuntimeScheduler,
  RuntimeSecretResolver,
} from "./services.js";

export const RUNTIME_INTERFACE_IDS = Object.freeze([
  "runtime.event-store",
  "runtime.blob-store",
  "runtime.jobs",
  "runtime.approval-pause",
  "runtime.progress",
  "runtime.export",
  "runtime.scheduler",
  "runtime.ingress",
  "runtime.secrets",
  "runtime.sync",
  "runtime.health",
  "runtime.cleanup",
] as const);

export type RuntimeIntegrationMode = "embedded" | "sidecar" | "remote_service";

export interface SupportedRuntimeInterfaceBinding {
  readonly interface_id: string;
  readonly interface_version: string;
  readonly status: "supported";
  readonly implementation_id: string;
  readonly implementation_version: string;
  readonly implementation_digest: string;
  readonly semantics_digest: string;
  readonly conformance_receipt_ref: BoundRuntimeRecordRef;
}

export interface UnsupportedRuntimeInterfaceBinding {
  readonly interface_id: string;
  readonly interface_version: string;
  readonly status: "unsupported";
  readonly failure_code: "runtime_capability_unsupported";
}

export type RuntimeInterfaceBinding =
  | SupportedRuntimeInterfaceBinding
  | UnsupportedRuntimeInterfaceBinding;

export interface RuntimeDescriptor {
  readonly descriptor_id: string;
  readonly descriptor_version: string;
  readonly descriptor_digest: string;
  readonly runtime_id: string;
  readonly runtime_version: string;
  readonly integration_mode: RuntimeIntegrationMode;
  readonly environment_family: string;
  readonly supported_host_versions: readonly string[];
  readonly interface_bindings: readonly RuntimeInterfaceBinding[];
  readonly consistency_model: string;
  readonly retry_semantics: string;
  readonly data_locations: readonly string[];
  readonly retention_behavior: string;
  readonly encryption_behavior: string;
  readonly identity_provider: string;
  readonly authentication_provider: string;
  readonly telemetry_behavior: string;
  readonly package_requirements: readonly string[];
  readonly infrastructure_requirements: readonly string[];
}

export interface RuntimeCanonicalReplicaSelection {
  readonly runtime_id: string;
  readonly data_location_id: string;
}

export interface RuntimeDataLocation {
  readonly location_id: string;
  readonly data_class: string;
  readonly role: "canonical_replica" | "replaceable_replica" | "operational";
}

export interface RuntimeBinding {
  readonly contract_version: "contentmd.runtime-binding/0.1.0";
  readonly binding_id: string;
  readonly binding_version: number;
  readonly project_id: string;
  readonly status: "active" | "superseded" | "revoked";
  readonly proposal_ref: string;
  readonly proposal_digest: string;
  readonly decision_ref: string;
  readonly decision_digest: string;
  readonly descriptor_ref: string;
  readonly descriptor_digest: string;
  readonly integration_mode: RuntimeIntegrationMode;
  readonly canonical_replica: RuntimeCanonicalReplicaSelection;
  readonly interface_bindings: readonly RuntimeInterfaceBinding[];
  readonly consistency_model: string;
  readonly transaction_boundary: string;
  readonly idempotency_behavior: string;
  readonly retry_behavior: string;
  readonly ambiguous_outcome_behavior: string;
  readonly identity_provider: string;
  readonly authentication_provider: string;
  readonly secret_resolver: string;
  readonly data_locations: readonly RuntimeDataLocation[];
  readonly retention: Readonly<{ mode: "policy_bound"; policy_ref: string }>;
  readonly encryption: Readonly<{ at_rest: string; in_transit: string }>;
  readonly telemetry: Readonly<{ mode: "none" | "minimized"; data_classes: readonly string[] }>;
  readonly health_checks: readonly string[];
  readonly cleanup: Readonly<{ mode: "explicit_authorized" }>;
  readonly export: Readonly<{ mode: "canonical_verified" }>;
  readonly adapter_digests: readonly Readonly<{ adapter_id: string; adapter_digest: string }>[];
  readonly conformance_receipts: readonly BoundRuntimeRecordRef[];
  readonly issued_at: string;
  readonly predecessor_binding_digest: string | null;
}

export interface RuntimeProfile {
  readonly descriptor: RuntimeDescriptor;
  readonly eventStore: RuntimeEventStoreFactory;
  readonly jobs: RuntimeJobRunner;
  readonly approvals: RuntimeApprovalPause;
  readonly progress: RuntimeProgressPublisher;
  readonly exporter: RuntimeExporter;
  readonly blobs: RuntimeBlobStore;
  readonly scheduler: RuntimeScheduler;
  readonly ingress: RuntimeIngress;
  readonly secrets: RuntimeSecretResolver;
  readonly sync: RuntimeSynchronizer;
  readonly health: RuntimeHealth;
  readonly cleanup: RuntimeCleanup;
}
