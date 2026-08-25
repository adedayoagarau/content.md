export type AdapterCapability =
  | "discover"
  | "preview"
  | "apply"
  | "verify"
  | "rollback";

export interface AdapterDescriptor {
  adapter_id: string;
  adapter_version: string;
  display_name: string;
  capabilities: AdapterCapability[];
  authority_effect: "none";
}

export interface DiscoverRequest {
  project_root: string;
}

export type InventoryExclusionReason =
  | "credential_or_environment"
  | "private_or_bulk_data"
  | "generated_output"
  | "dependency_or_cache"
  | "binary_or_oversize"
  | "outside_project_root"
  | "user_excluded";

export interface InventoryArtifact {
  relative_path: string;
  content_digest: string;
  byte_length: number;
  extension: string;
}

export interface InventoryExclusion {
  relative_path: string;
  reason: InventoryExclusionReason;
}

export interface StackFact {
  stack_id: string;
  kind: "python" | "javascript" | "typescript" | "static_web" | "documentation";
  workspace_root: string;
  manifest_ref: string;
  framework_hints: string[];
  confidence: "high" | "medium" | "low";
}

export interface DiscoveryCoverage {
  inventoried: number;
  scanned: number;
  skipped: number;
  unsupported: number;
  failed: number;
}

export interface RepositoryInventory {
  contract_version: "contentmd.repository-inventory/0.2.0";
  project_root: string;
  artifacts: InventoryArtifact[];
  exclusions: InventoryExclusion[];
  stacks: StackFact[];
  coverage: DiscoveryCoverage;
  bytes_read: number;
  resource_ceiling: { max_file_bytes: number };
  authority_effect: "none";
  inventory_digest: string;
}

export type SourceLifecycle =
  | "canonical"
  | "active"
  | "draft"
  | "historical"
  | "superseded"
  | "rejected"
  | "unknown";

export type EvidenceClass =
  | "documented"
  | "implemented"
  | "tested"
  | "observed"
  | "approved"
  | "historical";

export interface SourceCandidate {
  source_id: string;
  relative_path: string;
  source_type: string;
  adapter_id: string;
  adapter_version: string;
  content_digest: string;
  lifecycle: SourceLifecycle;
  evidence_class: EvidenceClass;
  declared_date: string | null;
  declared_owner: string | null;
  scope: {
    products: string[];
    services: string[];
    markets: string[];
    locales: string[];
    surfaces: string[];
    versions: string[];
  };
  discovery_reason: string;
  limitations: string[];
  authority_effect: "none";
}

export interface ProjectIdentityProposal {
  contract_version: "contentmd.project-identity-proposal/0.2.0";
  proposed_project_id: string;
  proposed_name: string;
  evidence_refs: string[];
  confidence: "high" | "medium" | "low";
  authority_effect: "none";
  proposal_digest: string;
}

export type ContentSyntaxKind =
  | "jsx_text"
  | "jsx_attribute"
  | "object_property"
  | "locale_message"
  | "html_title"
  | "html_attribute"
  | "html_metadata";

export type ContentChannel = "web" | "email" | "sms" | "api" | "unknown";
export type ContentModality = "visible" | "assistive" | "metadata" | "machine";

export interface DiscoveredContentOccurrence {
  occurrence_id: string;
  candidate_id: string;
  source_artifact: string;
  line: number;
  column: number;
  end_line: number;
  end_column: number;
  syntax_kind: ContentSyntaxKind;
  expression_payload: string;
  locale: string;
  channel: ContentChannel;
  modality: ContentModality;
  component: string | null;
  route: string | null;
  semantic_context: string;
}

export interface DiscoverResult {
  adapter_id: string;
  adapter_version: string;
  project_root: string;
  scan_digest: string;
  scanned_artifacts: string[];
  occurrences: DiscoveredContentOccurrence[];
  warnings: string[];
}

export interface ChangePreviewRequest {
  operation_id: string;
  transaction_ref: string;
}

export interface ChangePreview {
  operation_id: string;
  changed: false;
  authority_effect: "none";
}

export interface ApprovedChangeRequest {
  operation_id: string;
  transaction_ref: string;
}

export interface ApplyReceipt {
  operation_id: string;
  changed: boolean;
  receipt_digest: string;
}

export interface VerificationRequest {
  operation_id: string;
  apply_receipt_ref: string;
}

export interface VerificationReceipt {
  operation_id: string;
  verified: boolean;
  receipt_digest: string;
}

export interface RollbackRequest {
  operation_id: string;
  apply_receipt_ref: string;
}

export interface RollbackReceipt {
  operation_id: string;
  rolled_back: boolean;
  receipt_digest: string;
}

export class AdapterCapabilityError extends Error {
  readonly code: "unsupported_capability";
  readonly capability: string;

  constructor(code: "unsupported_capability", capability: string) {
    super(`${code}: ${capability}`);
    this.name = "AdapterCapabilityError";
    this.code = code;
    this.capability = capability;
  }
}

export interface ContentAdapter<
  TPreviewRequest = ChangePreviewRequest,
  TPreview = ChangePreview,
  TApplyRequest = ApprovedChangeRequest,
  TApplyReceipt = ApplyReceipt,
  TVerificationRequest = VerificationRequest,
  TVerificationReceipt = VerificationReceipt,
  TRollbackRequest = RollbackRequest,
  TRollbackReceipt = RollbackReceipt,
> {
  descriptor: AdapterDescriptor;
  discover(request: DiscoverRequest): Promise<DiscoverResult>;
  preview(request: TPreviewRequest): Promise<TPreview>;
  apply(request: TApplyRequest): Promise<TApplyReceipt>;
  verify(request: TVerificationRequest): Promise<TVerificationReceipt>;
  rollback(request: TRollbackRequest): Promise<TRollbackReceipt>;
}
