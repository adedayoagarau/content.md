import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { authorizeOperation } from "./authorize.js";
import type { AuthorizationDecision, AuthorizationInput } from "./policy.js";

export type ReviewerRole =
  | "qualified_content_designer"
  | "taxonomy_steward"
  | "corpus_steward"
  | "rights_reviewer"
  | "independent_corpus_reviewer";

export interface GovernanceObjectRef {
  object_id: string;
  object_digest: string;
}

export interface ReviewerQualificationMaterial {
  record_mode: "development_fixture" | "governed";
  reviewer_ref: GovernanceObjectRef;
  eligible_roles: readonly ReviewerRole[];
  qualified_objectives: readonly string[];
  authorized_resource_scopes: readonly string[];
  effective_at: string;
  expires_at: string | null;
  issuer_principal_ref: string;
}

export interface AuthorizationReplay {
  input: AuthorizationInput;
  expected_decision: AuthorizationDecision;
}

export interface ReviewerQualificationRecord extends ReviewerQualificationMaterial {
  contract_version: "contentmd.reviewer-qualification/0.1.0";
  qualification_id: string;
  material_digest: string;
  issuance_replay_digest: string;
  revocation_replay_digest: string | null;
  qualification_status: "current" | "expired" | "revoked" | "unknown";
  qualification_effect: "review_eligibility_only";
  authority_effect: "none";
  qualification_digest: string;
}

const MATERIAL_KEYS = Object.freeze([
  "record_mode",
  "reviewer_ref",
  "eligible_roles",
  "qualified_objectives",
  "authorized_resource_scopes",
  "effective_at",
  "expires_at",
  "issuer_principal_ref",
]);

const RECORD_KEYS = Object.freeze([
  "contract_version",
  "qualification_id",
  ...MATERIAL_KEYS,
  "material_digest",
  "issuance_replay_digest",
  "revocation_replay_digest",
  "qualification_status",
  "qualification_effect",
  "authority_effect",
  "qualification_digest",
]);

const ROLES = new Set<ReviewerRole>([
  "qualified_content_designer",
  "taxonomy_steward",
  "corpus_steward",
  "rights_reviewer",
  "independent_corpus_reviewer",
]);

function fail(reason: string): never {
  throw new TypeError(`reviewer_qualification_invalid:${reason}`);
}

function preflightGraph(value: unknown, ancestors = new Set<object>()): void {
  if (value === null || typeof value !== "object") return;
  if (ancestors.has(value)) fail("input_shape");
  const prototype = Object.getPrototypeOf(value);
  if (!Array.isArray(value) && prototype !== Object.prototype && prototype !== null) {
    fail("input_shape");
  }
  ancestors.add(value);
  try {
    if (Array.isArray(value)) {
      const indexes = Reflect.ownKeys(value).filter((key) => key !== "length");
      if (indexes.length !== value.length
        || indexes.some((key, index) => key !== String(index))) fail("input_shape");
    }
    for (const key of Reflect.ownKeys(value)) {
      if (Array.isArray(value) && key === "length") continue;
      if (typeof key !== "string") fail("input_shape");
      const descriptor = Object.getOwnPropertyDescriptor(value, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        fail("input_shape");
      }
      preflightGraph(descriptor.value, ancestors);
    }
  } finally {
    ancestors.delete(value);
  }
}

function assertExactKeys(value: object, expected: readonly string[]): void {
  const actual = Reflect.ownKeys(value);
  if (actual.length !== expected.length || expected.some((key) => !actual.includes(key))) {
    fail("input_shape");
  }
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function digest(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function timestamp(value: unknown): number | null {
  if (typeof value !== "string" || value.length === 0) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function compareScalar(left: string, right: string): number {
  const leftPoints = [...left].map((item) => item.codePointAt(0)!);
  const rightPoints = [...right].map((item) => item.codePointAt(0)!);
  const length = Math.min(leftPoints.length, rightPoints.length);
  for (let index = 0; index < length; index += 1) {
    const difference = leftPoints[index]! - rightPoints[index]!;
    if (difference !== 0) return difference;
  }
  return leftPoints.length - rightPoints.length;
}

function assertCanonicalTextSet(value: unknown, allowEmpty = false): asserts value is readonly string[] {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) fail("input_shape");
  if (value.some((item) => !nonempty(item))) fail("input_shape");
  const sorted = [...value].sort(compareScalar);
  if (new Set(value).size !== value.length || canonicalJson(value) !== canonicalJson(sorted)) {
    fail("input_shape");
  }
}

function assertMaterial(value: unknown): asserts value is ReviewerQualificationMaterial {
  preflightGraph(value);
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail("input_shape");
  assertExactKeys(value, MATERIAL_KEYS);
  const material = value as unknown as ReviewerQualificationMaterial;
  if (material.record_mode !== "development_fixture" && material.record_mode !== "governed") {
    fail("input_shape");
  }
  if (material.reviewer_ref === null || typeof material.reviewer_ref !== "object"
    || Array.isArray(material.reviewer_ref)) fail("input_shape");
  assertExactKeys(material.reviewer_ref, ["object_id", "object_digest"]);
  if (!nonempty(material.reviewer_ref.object_id) || !digest(material.reviewer_ref.object_digest)) {
    fail("input_shape");
  }
  assertCanonicalTextSet(material.eligible_roles);
  if (material.eligible_roles.some((role) => !ROLES.has(role))) fail("input_shape");
  assertCanonicalTextSet(material.qualified_objectives);
  assertCanonicalTextSet(material.authorized_resource_scopes);
  if (!nonempty(material.issuer_principal_ref)) fail("input_shape");
  const effectiveAt = timestamp(material.effective_at);
  const expiresAt = material.expires_at === null ? null : timestamp(material.expires_at);
  if (effectiveAt === null || (material.expires_at !== null && expiresAt === null)
    || (expiresAt !== null && effectiveAt > expiresAt)) fail("input_shape");
}

function assertReplay(value: unknown): asserts value is AuthorizationReplay {
  preflightGraph(value);
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail("input_shape");
  assertExactKeys(value, ["input", "expected_decision"]);
}

function same(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function verifyReplay(
  replay: AuthorizationReplay,
  material: ReviewerQualificationMaterial,
  materialDigest: string,
  expectedAction: "issue_reviewer_qualification" | "revoke_reviewer_qualification",
  reason: "issuance" | "revocation",
): void {
  assertReplay(replay);
  const actual = authorizeOperation(replay.input);
  const request = replay.input.request;
  const grant = replay.input.capability_grant;
  if (!same(actual, replay.expected_decision)
    || actual.disposition !== "allow"
    || request.action !== expectedAction
    || request.approval_class !== "semantic_decision"
    || request.subject_digest !== materialDigest
    || !same(request.resource_scope, material.authorized_resource_scopes)
    || grant === null
    || grant.principal_ref !== material.issuer_principal_ref
    || !same(grant.resource_scope, material.authorized_resource_scopes)
    || actual.audit_event.action !== expectedAction
    || actual.audit_event.actor_ref !== material.issuer_principal_ref
    || actual.audit_event.disposition !== "allowed"
    || !same(actual.audit_event.target_refs, material.authorized_resource_scopes)) {
    fail(reason);
  }
}

function statusAt(
  material: ReviewerQualificationMaterial,
  asOf: string,
  revoked: boolean,
): ReviewerQualificationRecord["qualification_status"] {
  if (revoked) return "revoked";
  const at = timestamp(asOf);
  const effective = timestamp(material.effective_at);
  const expires = material.expires_at === null ? null : timestamp(material.expires_at);
  if (at === null || effective === null || at < effective) return "unknown";
  if (expires !== null && at > expires) return "expired";
  return "current";
}

function materialFromRecord(record: ReviewerQualificationRecord): ReviewerQualificationMaterial {
  return {
    record_mode: record.record_mode,
    reviewer_ref: record.reviewer_ref,
    eligible_roles: record.eligible_roles,
    qualified_objectives: record.qualified_objectives,
    authorized_resource_scopes: record.authorized_resource_scopes,
    effective_at: record.effective_at,
    expires_at: record.expires_at,
    issuer_principal_ref: record.issuer_principal_ref,
  };
}

function deepFreeze<T>(value: T, seen = new Set<object>()): T {
  if (value === null || typeof value !== "object" || seen.has(value)) return value;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) deepFreeze(descriptor.value, seen);
  }
  return Object.freeze(value);
}

function buildRecord(input: {
  material: ReviewerQualificationMaterial;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
  as_of: string;
}): ReviewerQualificationRecord {
  assertMaterial(input.material);
  const materialDigest = sha256Canonical(input.material);
  verifyReplay(input.issuance, input.material, materialDigest, "issue_reviewer_qualification", "issuance");
  if (input.revocation !== null) {
    verifyReplay(
      input.revocation,
      input.material,
      materialDigest,
      "revoke_reviewer_qualification",
      "revocation",
    );
  }
  const statusTime = input.revocation?.input.now ?? input.issuance.input.now;
  if (input.as_of !== statusTime) fail("issuance_time");
  const issuanceReplayDigest = sha256Canonical(input.issuance);
  const revocationReplayDigest = input.revocation === null ? null : sha256Canonical(input.revocation);
  const identity = {
    contract_version: "contentmd.reviewer-qualification/0.1.0" as const,
    material_digest: materialDigest,
    issuance_replay_digest: issuanceReplayDigest,
    revocation_replay_digest: revocationReplayDigest,
  };
  const preimage = {
    contract_version: identity.contract_version,
    qualification_id: `reviewer-qualification.${sha256Canonical(identity)}`,
    ...structuredClone(input.material),
    material_digest: materialDigest,
    issuance_replay_digest: issuanceReplayDigest,
    revocation_replay_digest: revocationReplayDigest,
    qualification_status: statusAt(input.material, input.as_of, input.revocation !== null),
    qualification_effect: "review_eligibility_only" as const,
    authority_effect: "none" as const,
  };
  return deepFreeze({ ...preimage, qualification_digest: sha256Canonical(preimage) });
}

export function issueReviewerQualification(input: {
  material: ReviewerQualificationMaterial;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
  as_of: string;
}): ReviewerQualificationRecord {
  preflightGraph(input);
  assertExactKeys(input, ["material", "issuance", "revocation", "as_of"]);
  if (timestamp(input.as_of) === null) fail("input_shape");
  return buildRecord(input);
}

export function verifyReviewerQualification(input: {
  qualification: ReviewerQualificationRecord;
  issuance: AuthorizationReplay;
  revocation: AuthorizationReplay | null;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): ReviewerQualificationRecord {
  preflightGraph(input);
  assertExactKeys(input, ["qualification", "issuance", "revocation", "as_of", "verification_mode"]);
  if (input.qualification === null || typeof input.qualification !== "object"
    || Array.isArray(input.qualification)) fail("input_shape");
  assertExactKeys(input.qualification, RECORD_KEYS);
  if (input.qualification.contract_version !== "contentmd.reviewer-qualification/0.1.0"
    || input.qualification.qualification_effect !== "review_eligibility_only"
    || input.qualification.authority_effect !== "none"
    || !digest(input.qualification.qualification_digest)) fail("input_shape");
  const material = materialFromRecord(input.qualification);
  assertMaterial(material);
  const expected = buildRecord({
    material,
    issuance: input.issuance,
    revocation: input.revocation,
    as_of: input.revocation?.input.now ?? input.issuance.input.now,
  });
  if (input.qualification.qualification_id !== expected.qualification_id
    || input.qualification.material_digest !== expected.material_digest
    || input.qualification.issuance_replay_digest !== expected.issuance_replay_digest
    || input.qualification.revocation_replay_digest !== expected.revocation_replay_digest
    || input.qualification.qualification_status !== expected.qualification_status
    || input.qualification.qualification_digest !== sha256Canonical(
      Object.fromEntries(
        Object.entries(input.qualification).filter(([key]) => key !== "qualification_digest"),
      ),
    )) fail("digest");
  if (input.verification_mode !== "development_fixture" && input.verification_mode !== "official") {
    fail("input_shape");
  }
  if (input.verification_mode === "official" && material.record_mode !== "governed") {
    fail("development_fixture");
  }
  const currentStatus = statusAt(material, input.as_of, input.revocation !== null);
  if (currentStatus !== "current") fail(currentStatus);
  return input.qualification;
}
