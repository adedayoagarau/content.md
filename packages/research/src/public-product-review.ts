import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  verifyReviewerQualification,
  type AuthorizationReplay,
  type ReviewerQualificationRecord,
  type ReviewerRole,
} from "@contentmd/governance";
import {
  PublicProductContractError,
  assertClosedPlainRecord,
  compareUnicodeScalar,
  immutableClone,
  runPublicProductStagePlan,
  type PublicProductDigestRef,
} from "./public-product-contracts.js";

export type PublicProductReviewKind =
  | "taxonomy_mapping"
  | "taxonomy_version"
  | "evidence_disposition_set"
  | "pattern_hypothesis";

export interface PublicProductReviewReceipt {
  contract_version: "contentmd.public-product-review-receipt/0.1.0";
  receipt_id: string;
  record_mode: "development_fixture" | "official";
  review_kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  reviewer_ref: PublicProductDigestRef;
  reviewer_role: ReviewerRole;
  qualification_ref: PublicProductDigestRef;
  checklist_version: string;
  checklist_results: readonly { item: string; status: "pass" | "fail" | "insufficient" }[];
  decision: "pass" | "fail" | "insufficient";
  reviewed_at: string;
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  receipt_digest: string;
}

export interface PublicProductReviewGovernanceEvidence {
  contract_version: "contentmd.public-product-review-governance/0.1.0";
  as_of: string;
  qualifications: readonly ReviewerQualificationRecord[];
  qualification_replays: readonly {
    qualification_id: string;
    issuance: AuthorizationReplay;
    revocation: AuthorizationReplay | null;
  }[];
  receipts: readonly PublicProductReviewReceipt[];
  governance_digest: string;
}

const CHECKLISTS = Object.freeze({
  taxonomy_mapping: Object.freeze({
    version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0",
    items: Object.freeze([
      "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
      "content_slot_fit", "channel_fit", "counterexample_sufficiency",
      "industry_neutrality", "localization_transferability", "rights_safe_abstraction",
    ]),
  }),
  taxonomy_version: Object.freeze({
    version: "contentmd.public-product-review-checklist.taxonomy-version/0.1.0",
    items: Object.freeze([
      "definition_completeness", "semantic_id_stability", "mapping_set_completeness",
      "previous_version_compatibility", "effective_time_validity", "review_closure",
      "no_authority_or_learning_widening",
    ]),
  }),
  evidence_disposition_set: Object.freeze({
    version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0",
    items: Object.freeze([
      "subject_accuracy", "transition_legality", "reason_fit", "replacement_validity",
      "rights_or_projection_safety", "complete_set_review",
    ]),
  }),
  pattern_hypothesis: Object.freeze({
    version: "contentmd.public-product-review-checklist.pattern-hypothesis/0.1.0",
    items: Object.freeze([
      "state_accuracy", "user_goal_alignment", "clarity", "actionable_recovery",
      "accessibility", "localization_transferability", "evidence_quality",
      "counterexample_coverage", "rights_abstraction",
    ]),
  }),
} as const);

const INPUT_KEYS = Object.freeze([
  "record_mode", "review_kind", "subject_ref", "qualification", "reviewer_role",
  "checklist_version", "checklist_results", "decision", "reviewed_at",
]);
const RECEIPT_KEYS = Object.freeze([
  "contract_version", "receipt_id", "record_mode", "review_kind", "subject_ref",
  "reviewer_ref", "reviewer_role", "qualification_ref", "checklist_version",
  "checklist_results", "decision", "reviewed_at", "authority_effect",
  "prompt_eligibility", "training_eligibility", "benchmark_eligibility", "receipt_digest",
]);
const GOVERNANCE_KEYS = Object.freeze([
  "contract_version", "as_of", "qualifications", "qualification_replays", "receipts",
  "governance_digest",
]);

function fail(code: ConstructorParameters<typeof PublicProductContractError>[0], detail?: string): never {
  throw new PublicProductContractError(code, detail);
}

function reviewFail(detail: string): never {
  throw new TypeError(`public_product_review_invalid:${detail}`);
}

function isDigest(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function isText(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function time(value: unknown): number | null {
  if (!isText(value)) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function assertRef(value: unknown, path: string): asserts value is PublicProductDigestRef {
  assertClosedPlainRecord(value, ["object_id", "object_digest"], path);
  if (!isText(value.object_id) || !isDigest(value.object_digest)) fail("canonical_value", path);
}

function same(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function without<T extends object>(value: T, keys: readonly string[]): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([key]) => !keys.includes(key)));
}

function qualificationRef(value: ReviewerQualificationRecord): PublicProductDigestRef {
  return { object_id: value.qualification_id, object_digest: value.qualification_digest };
}

function assertChecklist(input: {
  review_kind: PublicProductReviewKind;
  checklist_version: string;
  checklist_results: PublicProductReviewReceipt["checklist_results"];
  decision: PublicProductReviewReceipt["decision"];
}): void {
  const specification = CHECKLISTS[input.review_kind];
  if (input.checklist_version !== specification.version
    || !Array.isArray(input.checklist_results)
    || input.checklist_results.length !== specification.items.length) {
    fail("canonical_value", "checklist");
  }
  for (let index = 0; index < specification.items.length; index += 1) {
    const result = input.checklist_results[index];
    assertClosedPlainRecord(result, ["item", "status"], `checklist_results[${index}]`);
    if (result.item !== specification.items[index]
      || typeof result.status !== "string"
      || !["pass", "fail", "insufficient"].includes(result.status)) {
      fail("canonical_value", "checklist");
    }
  }
  const expectedDecision = input.checklist_results.some((result) => result.status === "fail")
    ? "fail"
    : input.checklist_results.some((result) => result.status === "insufficient")
      ? "insufficient"
      : "pass";
  if (input.decision !== expectedDecision) fail("canonical_value", "decision");
}

function assertReceiptShape(value: unknown): asserts value is PublicProductReviewReceipt {
  assertClosedPlainRecord(value, RECEIPT_KEYS, "receipt");
  if (value.contract_version !== "contentmd.public-product-review-receipt/0.1.0"
    || !isText(value.receipt_id)
    || (value.record_mode !== "development_fixture" && value.record_mode !== "official")
    || typeof value.review_kind !== "string"
    || !Object.hasOwn(CHECKLISTS, value.review_kind)
    || !isText(value.checklist_version)
    || !Array.isArray(value.checklist_results)
    || !["pass", "fail", "insufficient"].includes(value.decision as string)
    || time(value.reviewed_at) === null
    || value.authority_effect !== "none"
    || value.prompt_eligibility !== "never"
    || value.training_eligibility !== "never"
    || value.benchmark_eligibility !== false
    || !isDigest(value.receipt_digest)) fail("canonical_value", "receipt");
  assertRef(value.subject_ref, "receipt.subject_ref");
  assertRef(value.reviewer_ref, "receipt.reviewer_ref");
  assertRef(value.qualification_ref, "receipt.qualification_ref");
  assertChecklist(value as unknown as Parameters<typeof assertChecklist>[0]);
}

function assertCanonicalArray<T>(
  values: readonly T[],
  identity: (value: T) => string,
  path: string,
): void {
  const identities = values.map(identity);
  const sorted = [...identities].sort(compareUnicodeScalar);
  if (new Set(identities).size !== identities.length || !same(identities, sorted)) {
    fail("canonical_value", path);
  }
}

function assertGovernanceShape(value: unknown): asserts value is PublicProductReviewGovernanceEvidence {
  assertClosedPlainRecord(value, GOVERNANCE_KEYS, "governance");
  if (value.contract_version !== "contentmd.public-product-review-governance/0.1.0"
    || time(value.as_of) === null
    || !Array.isArray(value.qualifications)
    || !Array.isArray(value.qualification_replays)
    || !Array.isArray(value.receipts)
    || !isDigest(value.governance_digest)) fail("canonical_value", "governance");
  for (const receipt of value.receipts) assertReceiptShape(receipt);
  for (const replay of value.qualification_replays) {
    assertClosedPlainRecord(replay, ["qualification_id", "issuance", "revocation"], "qualification_replay");
    if (!isText(replay.qualification_id)) fail("canonical_value", "qualification_replay");
  }
  assertCanonicalArray(value.qualifications, (item) => item.qualification_id, "qualifications");
  assertCanonicalArray(value.qualification_replays, (item) => item.qualification_id, "qualification_replays");
  assertCanonicalArray(value.receipts, (item) => item.receipt_id, "receipts");
}

function assertReceiptDigest(receipt: PublicProductReviewReceipt): void {
  const identityMaterial = without(receipt, ["receipt_id", "receipt_digest"]);
  const expectedId = `public-product-review-receipt.${sha256Canonical(identityMaterial)}`;
  const expectedDigest = sha256Canonical(without(receipt, ["receipt_digest"]));
  if (receipt.receipt_id !== expectedId || receipt.receipt_digest !== expectedDigest) fail("digest");
}

function assertQualificationOuterDigest(qualification: ReviewerQualificationRecord): void {
  const material = {
    record_mode: qualification.record_mode,
    reviewer_ref: qualification.reviewer_ref,
    eligible_roles: qualification.eligible_roles,
    qualified_objectives: qualification.qualified_objectives,
    authorized_resource_scopes: qualification.authorized_resource_scopes,
    effective_at: qualification.effective_at,
    expires_at: qualification.expires_at,
    issuer_principal_ref: qualification.issuer_principal_ref,
  };
  const identity = {
    contract_version: qualification.contract_version,
    material_digest: qualification.material_digest,
    issuance_replay_digest: qualification.issuance_replay_digest,
    revocation_replay_digest: qualification.revocation_replay_digest,
  };
  if (qualification.material_digest !== sha256Canonical(material)
    || qualification.qualification_id !== `reviewer-qualification.${sha256Canonical(identity)}`
    || qualification.qualification_digest !== sha256Canonical(without(qualification, ["qualification_digest"]))) {
    fail("digest");
  }
}

function validRoleTuple(kind: PublicProductReviewKind, roles: readonly ReviewerRole[]): boolean {
  if (kind === "taxonomy_mapping" || kind === "taxonomy_version") {
    return same(roles, ["qualified_content_designer", "taxonomy_steward"]);
  }
  if (kind === "pattern_hypothesis") {
    return same(roles, ["qualified_content_designer", "qualified_content_designer"]);
  }
  return same(roles, ["corpus_steward", "rights_reviewer"])
    || same(roles, ["corpus_steward", "independent_corpus_reviewer"]);
}

export function createPublicProductReviewReceipt(input: {
  record_mode: "development_fixture" | "official";
  review_kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  qualification: ReviewerQualificationRecord;
  reviewer_role: ReviewerRole;
  checklist_version: string;
  checklist_results: PublicProductReviewReceipt["checklist_results"];
  decision: PublicProductReviewReceipt["decision"];
  reviewed_at: string;
}): PublicProductReviewReceipt {
  assertClosedPlainRecord(input, INPUT_KEYS, "input");
  if ((input.record_mode !== "development_fixture" && input.record_mode !== "official")
    || !Object.hasOwn(CHECKLISTS, input.review_kind)
    || time(input.reviewed_at) === null) fail("canonical_value");
  assertRef(input.subject_ref, "subject_ref");
  assertChecklist(input);
  if (!input.qualification.eligible_roles.includes(input.reviewer_role)
    || (input.record_mode === "official" && input.qualification.record_mode !== "governed")) {
    fail("reviewer_qualification");
  }
  const reviewed = time(input.reviewed_at)!;
  const effective = time(input.qualification.effective_at);
  const expires = input.qualification.expires_at === null ? null : time(input.qualification.expires_at);
  if (effective === null || reviewed < effective || (expires !== null && reviewed > expires)
    || input.qualification.qualification_status !== "current") fail("reviewer_qualification");
  const identityMaterial = {
    contract_version: "contentmd.public-product-review-receipt/0.1.0" as const,
    record_mode: input.record_mode,
    review_kind: input.review_kind,
    subject_ref: structuredClone(input.subject_ref),
    reviewer_ref: structuredClone(input.qualification.reviewer_ref),
    reviewer_role: input.reviewer_role,
    qualification_ref: qualificationRef(input.qualification),
    checklist_version: input.checklist_version,
    checklist_results: structuredClone(input.checklist_results),
    decision: input.decision,
    reviewed_at: input.reviewed_at,
    authority_effect: "none" as const,
    prompt_eligibility: "never" as const,
    training_eligibility: "never" as const,
    benchmark_eligibility: false as const,
  };
  const preimage = {
    receipt_id: `public-product-review-receipt.${sha256Canonical(identityMaterial)}`,
    ...identityMaterial,
  };
  return immutableClone({ ...preimage, receipt_digest: sha256Canonical(preimage) });
}

export function verifyPublicProductReviewPair(input: {
  kind: PublicProductReviewKind;
  subject_ref: PublicProductDigestRef;
  receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  required_roles: readonly [ReviewerRole, ReviewerRole];
  governance: PublicProductReviewGovernanceEvidence;
  verification_mode: "development_fixture" | "official";
}): readonly [PublicProductReviewReceipt, PublicProductReviewReceipt] {
  let receipts: [PublicProductReviewReceipt, PublicProductReviewReceipt] | undefined;
  runPublicProductStagePlan({
    input_shape: () => {
      assertClosedPlainRecord(
        input,
        ["kind", "subject_ref", "receipt_refs", "required_roles", "governance", "verification_mode"],
        "input",
      );
      assertGovernanceShape(input.governance);
      if (!Array.isArray(input.receipt_refs) || input.receipt_refs.length !== 2
        || !Array.isArray(input.required_roles) || input.required_roles.length !== 2) {
        fail("input_shape");
      }
      for (const ref of input.receipt_refs) assertRef(ref, "receipt_ref");
      assertRef(input.subject_ref, "subject_ref");
    },
    canonical_value: () => {
      if (!Object.hasOwn(CHECKLISTS, input.kind)
        || (input.verification_mode !== "development_fixture" && input.verification_mode !== "official")
        || !validRoleTuple(input.kind, input.required_roles)) fail("canonical_value");
    },
    digest: () => {
      const governancePreimage = without(input.governance, ["governance_digest"]);
      if (input.governance.governance_digest !== sha256Canonical(governancePreimage)) fail("digest");
      for (const receipt of input.governance.receipts) assertReceiptDigest(receipt);
      for (const qualification of input.governance.qualifications) {
        assertQualificationOuterDigest(qualification);
        const replays = input.governance.qualification_replays.filter(
          (replay) => replay.qualification_id === qualification.qualification_id,
        );
        if (replays.length === 1) {
          const replay = replays[0]!;
          const revocationDigest = replay.revocation === null
            ? null
            : sha256Canonical(replay.revocation);
          if (qualification.issuance_replay_digest !== sha256Canonical(replay.issuance)
            || qualification.revocation_replay_digest !== revocationDigest) fail("digest");
        }
      }
    },
    reference_binding: () => {
      const resolved = input.receipt_refs.map((ref) => input.governance.receipts.filter(
        (receipt) => receipt.receipt_id === ref.object_id && receipt.receipt_digest === ref.object_digest,
      ));
      if (resolved.some((matches) => matches.length !== 1)) fail("reference_binding");
      receipts = [resolved[0]![0]!, resolved[1]![0]!];
      if (receipts.some((receipt) => receipt.review_kind !== input.kind
        || !same(receipt.subject_ref, input.subject_ref))) fail("reference_binding");
      if (receipts[0].reviewer_ref.object_id === receipts[1].reviewer_ref.object_id) {
        reviewFail("duplicate_reviewer");
      }
      if (receipts[0].reviewer_role !== input.required_roles[0]
        || receipts[1].reviewer_role !== input.required_roles[1]) reviewFail("role_order");
      if (input.kind === "pattern_hypothesis"
        && compareUnicodeScalar(receipts[0].reviewer_ref.object_id, receipts[1].reviewer_ref.object_id) >= 0) {
        reviewFail("reviewer_order");
      }
    },
    reviewer_qualification: () => {
      if (receipts === undefined) fail("reference_binding");
      for (const receipt of receipts) {
        const qualifications = input.governance.qualifications.filter(
          (qualification) => same(qualificationRef(qualification), receipt.qualification_ref)
            && same(qualification.reviewer_ref, receipt.reviewer_ref),
        );
        if (qualifications.length !== 1) fail("reviewer_qualification");
        const qualification = qualifications[0]!;
        const replays = input.governance.qualification_replays.filter(
          (replay) => replay.qualification_id === qualification.qualification_id,
        );
        if (replays.length !== 1 || !qualification.eligible_roles.includes(receipt.reviewer_role)) {
          fail("reviewer_qualification");
        }
        try {
          verifyReviewerQualification({
            qualification,
            issuance: replays[0]!.issuance,
            revocation: replays[0]!.revocation,
            as_of: receipt.reviewed_at,
            verification_mode: input.verification_mode,
          });
          verifyReviewerQualification({
            qualification,
            issuance: replays[0]!.issuance,
            revocation: replays[0]!.revocation,
            as_of: input.governance.as_of,
            verification_mode: input.verification_mode,
          });
        } catch {
          fail("reviewer_qualification");
        }
        if (receipt.record_mode !== input.verification_mode || receipt.decision !== "pass") {
          fail("reviewer_qualification");
        }
      }
    },
  });
  if (receipts === undefined) fail("reference_binding");
  return immutableClone(receipts);
}
