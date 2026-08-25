import type { ResourceLimits } from "@contentmd/governance";

declare const authorizedRuntimeOperationBrand: unique symbol;
declare const authenticatedRuntimeSessionBrand: unique symbol;

export type AuthorizedRuntimeOperation = Readonly<{
  capability_ref: string;
  capability_digest: string;
  verifier_id: string;
  [authorizedRuntimeOperationBrand]: true;
}>;

export type AuthenticatedRuntimeSession = Readonly<{
  session_ref: string;
  session_digest: string;
  verifier_id: string;
  [authenticatedRuntimeSessionBrand]: true;
}>;

export interface BoundRuntimeRecordRef {
  readonly record_id: string;
  readonly record_version: number;
  readonly content_digest: string;
}

export interface BoundRuntimeResource {
  readonly resource_id: string;
  readonly content_digest: string | null;
}

export interface RuntimeRevocationCheckpoint {
  readonly stream_id: string;
  readonly sequence: number;
  readonly head_digest: string;
}

export interface RuntimeAuditTarget {
  readonly stream_id: string;
  readonly data_class: string;
}

export interface RuntimeOperationClaims {
  readonly capability_id: string;
  readonly tenant_ref: string;
  readonly principal_ref: string;
  readonly workload_ref: string;
  readonly project_ref: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly policy_refs: readonly BoundRuntimeRecordRef[];
  readonly capability_grant_ref: BoundRuntimeRecordRef;
  readonly control_refs: readonly BoundRuntimeRecordRef[];
  readonly resource_limits: ResourceLimits;
  readonly issued_at: string;
  readonly expires_at: string;
  readonly revocation_checkpoint: RuntimeRevocationCheckpoint;
  readonly nonce: string;
  readonly nonce_mode: "single_use";
  readonly runtime_binding_digest: string;
  readonly audit_target: RuntimeAuditTarget;
}

export interface RuntimeEffectRequest {
  readonly interface_id: string;
  readonly method: string;
  readonly action: string;
  readonly resources: readonly BoundRuntimeResource[];
  readonly data_classes: readonly string[];
  readonly requested_limits: ResourceLimits;
  readonly runtime_binding_digest: string;
  readonly effect_digest: string;
}

export interface RuntimeOperationVerifier {
  resolveAndClaim(
    operation: AuthorizedRuntimeOperation,
    effect: RuntimeEffectRequest,
  ): Promise<RuntimeOperationClaims>;
}
