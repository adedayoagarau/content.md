import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  issueReviewerQualification,
  type AuthorizationInput,
  type AuthorizationReplay,
  type GovernancePolicy,
  type ReviewerQualificationMaterial,
  type ReviewerQualificationRecord,
  type ReviewerRole,
} from "@contentmd/governance";
import {
  createPublicProductReviewReceipt,
  verifyPublicProductReviewPair,
  type PublicProductDigestRef,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewKind,
  type PublicProductReviewReceipt,
} from "@contentmd/research";

const reviewedAt = "2026-08-24T18:00:00.000Z";
const asOf = "2026-08-24T19:00:00.000Z";
const limits = {
  calls: 1,
  bytes: 16_384,
  duration_ms: 1_000,
  records: 1,
  model_tokens: 0,
  browser_actions: 0,
  retries: 0,
};

const checklists = {
  taxonomy_mapping: {
    version: "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0",
    items: [
      "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
      "content_slot_fit", "channel_fit", "counterexample_sufficiency",
      "industry_neutrality", "localization_transferability", "rights_safe_abstraction",
    ],
  },
  taxonomy_version: {
    version: "contentmd.public-product-review-checklist.taxonomy-version/0.1.0",
    items: [
      "definition_completeness", "semantic_id_stability", "mapping_set_completeness",
      "previous_version_compatibility", "effective_time_validity", "review_closure",
      "no_authority_or_learning_widening",
    ],
  },
  evidence_disposition_set: {
    version: "contentmd.public-product-review-checklist.evidence-disposition-set/0.1.0",
    items: [
      "subject_accuracy", "transition_legality", "reason_fit", "replacement_validity",
      "rights_or_projection_safety", "complete_set_review",
    ],
  },
  pattern_hypothesis: {
    version: "contentmd.public-product-review-checklist.pattern-hypothesis/0.1.0",
    items: [
      "state_accuracy", "user_goal_alignment", "clarity", "actionable_recovery",
      "accessibility", "localization_transferability", "evidence_quality",
      "counterexample_coverage", "rights_abstraction",
    ],
  },
} as const;

function scalarCompare(left: string, right: string): number {
  const leftPoints = [...left].map((value) => value.codePointAt(0)!);
  const rightPoints = [...right].map((value) => value.codePointAt(0)!);
  for (let index = 0; index < Math.min(leftPoints.length, rightPoints.length); index += 1) {
    const difference = leftPoints[index]! - rightPoints[index]!;
    if (difference !== 0) return difference;
  }
  return leftPoints.length - rightPoints.length;
}

function qualificationMaterial(
  reviewerNumber: number,
  role: ReviewerRole,
  recordMode: "development_fixture" | "governed" = "governed",
): ReviewerQualificationMaterial {
  return {
    record_mode: recordMode,
    reviewer_ref: {
      object_id: `reviewer.public-product.${reviewerNumber}`,
      object_digest: String(reviewerNumber).repeat(64),
    },
    eligible_roles: [role],
    qualified_objectives: ["public_product_review"],
    authorized_resource_scopes: ["public-product-corpus", "public-product-taxonomy"],
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: "2026-08-25T00:00:00.000Z",
    issuer_principal_ref: "principal.public-product-governance",
  };
}

function qualificationPolicy(action: string): GovernancePolicy {
  return {
    policy_id: `policy.${action}`,
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: "2026-08-25T00:00:00.000Z",
    allowed_actions: [action],
    denied_actions: [],
    review_actions: [],
    allowed_adapters: ["adapter.governance.reviewer-qualification"],
    denied_adapters: [],
    permitted_data_classes: ["governance-metadata"],
    denied_data_classes: [],
    permitted_egress: ["none"],
    max_limits: { ...limits },
    human_approval_actions: [action],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
  };
}

function qualificationReplay(material: ReviewerQualificationMaterial): AuthorizationReplay {
  const materialDigest = sha256Canonical(material);
  const action = "issue_reviewer_qualification";
  const operationId = `operation.${action}.${material.reviewer_ref.object_id}`;
  const input: AuthorizationInput = {
    now: reviewedAt,
    request: {
      operation_id: operationId,
      intent: "enforce",
      action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"],
      egress: "none",
      requested_limits: { ...limits },
      approval_class: "semantic_decision",
      requires_readback: false,
      subject_digest: materialDigest,
    },
    policies: [qualificationPolicy(action)],
    capability_grant: {
      grant_id: `grant.${material.reviewer_ref.object_id}`,
      principal_ref: material.issuer_principal_ref,
      workload_ref: "workload.contentmd.public-product-review",
      action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"],
      egress: "none",
      max_limits: { ...limits },
      issued_at: "2026-08-24T17:00:00.000Z",
      expires_at: "2026-08-24T20:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: `approval.${material.reviewer_ref.object_id}`,
      approval_class: "semantic_decision",
      subject_ref: operationId,
      subject_digest: materialDigest,
      status: "issued",
      issued_at: "2026-08-24T17:30:00.000Z",
      expires_at: "2026-08-24T20:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      {
        control_type: "data_processing",
        applicability: "applicable",
        record_ref: "control.public-product.processing",
        status: "current",
        rationale: "Governance metadata only.",
      },
      {
        control_type: "durable_memory",
        applicability: "applicable",
        record_ref: "control.public-product.memory",
        status: "current",
        rationale: "Review qualifications are auditable records.",
      },
      {
        control_type: "telemetry",
        applicability: "applicable",
        record_ref: "control.public-product.telemetry",
        status: "current",
        rationale: "Minimized governance audit metadata only.",
      },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  return { input, expected_decision: authorizeOperation(input) };
}

function qualification(
  reviewerNumber: number,
  role: ReviewerRole,
  recordMode: "development_fixture" | "governed" = "governed",
) {
  const material = qualificationMaterial(reviewerNumber, role, recordMode);
  const issuance = qualificationReplay(material);
  const record = issueReviewerQualification({
    material,
    issuance,
    revocation: null,
    as_of: reviewedAt,
  });
  return { record, issuance };
}

function digestRef(record: ReviewerQualificationRecord): PublicProductDigestRef {
  return {
    object_id: record.qualification_id,
    object_digest: record.qualification_digest,
  };
}

function receiptRef(receipt: PublicProductReviewReceipt): PublicProductDigestRef {
  return { object_id: receipt.receipt_id, object_digest: receipt.receipt_digest };
}

function results(kind: PublicProductReviewKind) {
  return checklists[kind].items.map((item) => ({ item, status: "pass" as const }));
}

function createReceipt(
  kind: PublicProductReviewKind,
  reviewer: ReviewerQualificationRecord,
  role: ReviewerRole,
  recordMode: "development_fixture" | "official" = "official",
): PublicProductReviewReceipt {
  return createPublicProductReviewReceipt({
    record_mode: recordMode,
    review_kind: kind,
    subject_ref: { object_id: `subject.${kind}`, object_digest: "a".repeat(64) },
    qualification: reviewer,
    reviewer_role: role,
    checklist_version: checklists[kind].version,
    checklist_results: results(kind),
    decision: "pass",
    reviewed_at: reviewedAt,
  });
}

function governanceEvidence(input: {
  qualifications: readonly { record: ReviewerQualificationRecord; issuance: AuthorizationReplay }[];
  receipts: readonly PublicProductReviewReceipt[];
  evidenceAsOf?: string;
}): PublicProductReviewGovernanceEvidence {
  const qualifications = input.qualifications
    .map(({ record }) => record)
    .sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const qualificationReplays = input.qualifications
    .map(({ record, issuance }) => ({
      qualification_id: record.qualification_id,
      issuance,
      revocation: null,
    }))
    .sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const receipts = [...input.receipts]
    .sort((left, right) => scalarCompare(left.receipt_id, right.receipt_id));
  const preimage = {
    contract_version: "contentmd.public-product-review-governance/0.1.0" as const,
    as_of: input.evidenceAsOf ?? asOf,
    qualifications,
    qualification_replays: qualificationReplays,
    receipts,
  };
  return { ...preimage, governance_digest: sha256Canonical(preimage) };
}

function pairFixture(
  kind: PublicProductReviewKind = "taxonomy_mapping",
  roles: readonly [ReviewerRole, ReviewerRole] = [
    "qualified_content_designer",
    "taxonomy_steward",
  ],
  recordMode: "development_fixture" | "official" = "official",
) {
  const first = qualification(1, roles[0], recordMode === "official" ? "governed" : "development_fixture");
  const second = qualification(2, roles[1], recordMode === "official" ? "governed" : "development_fixture");
  const firstReceipt = createReceipt(kind, first.record, roles[0], recordMode);
  const secondReceipt = createReceipt(kind, second.record, roles[1], recordMode);
  const governance = governanceEvidence({
    qualifications: [first, second],
    receipts: [firstReceipt, secondReceipt],
  });
  return {
    first,
    second,
    firstReceipt,
    secondReceipt,
    governance,
    pairInput: {
      kind,
      subject_ref: firstReceipt.subject_ref,
      receipt_refs: [receiptRef(firstReceipt), receiptRef(secondReceipt)] as const,
      required_roles: roles,
      governance,
      verification_mode: recordMode,
    },
  };
}

function rehashGovernance(
  governance: PublicProductReviewGovernanceEvidence,
): PublicProductReviewGovernanceEvidence {
  const { governance_digest: _discarded, ...preimage } = governance;
  return { ...preimage, governance_digest: sha256Canonical(preimage) };
}

describe("portable public-product review receipts", () => {
  it.each([
    ["taxonomy_mapping", "qualified_content_designer"],
    ["taxonomy_version", "taxonomy_steward"],
    ["evidence_disposition_set", "corpus_steward"],
    ["pattern_hypothesis", "qualified_content_designer"],
  ] as const)("creates an immutable, authority-free %s receipt", (kind, role) => {
    const reviewer = qualification(1, role).record;
    const receipt = createReceipt(kind, reviewer, role);

    expect(receipt).toMatchObject({
      contract_version: "contentmd.public-product-review-receipt/0.1.0",
      record_mode: "official",
      review_kind: kind,
      reviewer_ref: reviewer.reviewer_ref,
      qualification_ref: digestRef(reviewer),
      checklist_version: checklists[kind].version,
      decision: "pass",
      authority_effect: "none",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
    });
    expect(Object.isFrozen(receipt)).toBe(true);
    expect(Object.isFrozen(receipt.checklist_results)).toBe(true);
  });

  it("verifies two independent reviewers in the required role order", () => {
    const fixture = pairFixture();
    expect(verifyPublicProductReviewPair(fixture.pairInput)).toEqual([
      fixture.firstReceipt,
      fixture.secondReceipt,
    ]);
  });

  it.each([
    ["taxonomy_mapping", ["qualified_content_designer", "taxonomy_steward"]],
    ["taxonomy_version", ["qualified_content_designer", "taxonomy_steward"]],
    ["evidence_disposition_set", ["corpus_steward", "rights_reviewer"]],
    ["pattern_hypothesis", ["qualified_content_designer", "qualified_content_designer"]],
  ] as const)("verifies the exact %s reviewer tuple", (kind, roles) => {
    const fixture = pairFixture(kind, roles);
    expect(verifyPublicProductReviewPair(fixture.pairInput)).toHaveLength(2);
  });

  it("rejects duplicate reviewers even when both receipt refs are digest-valid", () => {
    const fixture = pairFixture();
    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      receipt_refs: [receiptRef(fixture.firstReceipt), receiptRef(fixture.firstReceipt)],
    })).toThrow("public_product_review_invalid:duplicate_reviewer");
  });

  it("rejects a valid receipt pair bound to a different subject", () => {
    const fixture = pairFixture();
    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      subject_ref: { ...fixture.pairInput.subject_ref, object_digest: "b".repeat(64) },
    })).toThrow("public_product_contract_invalid:reference_binding");
  });

  it("rejects the correct reviewers supplied in the wrong role order", () => {
    const fixture = pairFixture();
    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      receipt_refs: [receiptRef(fixture.secondReceipt), receiptRef(fixture.firstReceipt)],
    })).toThrow("public_product_review_invalid:role_order");
  });

  it("rejects a changed checklist result whose receipt digest is stale", () => {
    const fixture = pairFixture();
    const changed = structuredClone(fixture.firstReceipt);
    changed.checklist_results[0] = { ...changed.checklist_results[0]!, status: "fail" };
    changed.decision = "fail";
    const governance = rehashGovernance({
      ...fixture.governance,
      receipts: [changed, fixture.secondReceipt].sort(
        (left, right) => scalarCompare(left.receipt_id, right.receipt_id),
      ),
    });

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      governance,
    })).toThrow("public_product_contract_invalid:digest");
  });

  it("rejects missing, reordered, or extra checklist results", () => {
    const reviewer = qualification(1, "qualified_content_designer").record;
    for (const checklistResults of [
      results("taxonomy_mapping").slice(1),
      [results("taxonomy_mapping")[1]!, results("taxonomy_mapping")[0]!, ...results("taxonomy_mapping").slice(2)],
      [...results("taxonomy_mapping"), { item: "extra", status: "pass" as const }],
    ]) {
      expect(() => createPublicProductReviewReceipt({
        record_mode: "official",
        review_kind: "taxonomy_mapping",
        subject_ref: { object_id: "subject.taxonomy_mapping", object_digest: "a".repeat(64) },
        qualification: reviewer,
        reviewer_role: "qualified_content_designer",
        checklist_version: checklists.taxonomy_mapping.version,
        checklist_results: checklistResults,
        decision: "pass",
        reviewed_at: reviewedAt,
      })).toThrow("public_product_contract_invalid:canonical_value");
    }
  });

  it("rejects an expired qualification at the verification as-of time", () => {
    const fixture = pairFixture();
    const governance = governanceEvidence({
      qualifications: [fixture.first, fixture.second],
      receipts: [fixture.firstReceipt, fixture.secondReceipt],
      evidenceAsOf: "2026-08-25T00:00:00.001Z",
    });

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      governance,
    })).toThrow("public_product_contract_invalid:reviewer_qualification");
  });

  it("rejects a self-declared qualification that lacks its matching replay", () => {
    const fixture = pairFixture();
    const governance = rehashGovernance({
      ...fixture.governance,
      qualification_replays: fixture.governance.qualification_replays.slice(1),
    });

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      governance,
    })).toThrow("public_product_contract_invalid:reviewer_qualification");
  });

  it("rejects development qualifications and receipts in official verification", () => {
    const fixture = pairFixture("taxonomy_mapping", [
      "qualified_content_designer",
      "taxonomy_steward",
    ], "development_fixture");

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      verification_mode: "official",
    })).toThrow("public_product_contract_invalid:reviewer_qualification");
  });

  it("rejects extra accessors without invoking them", () => {
    const fixture = pairFixture();
    let reads = 0;
    const input = { ...fixture.pairInput } as Record<string, unknown>;
    Object.defineProperty(input, "extra", {
      enumerable: true,
      get() {
        reads += 1;
        return "forbidden";
      },
    });

    expect(() => verifyPublicProductReviewPair(
      input as unknown as Parameters<typeof verifyPublicProductReviewPair>[0],
    )).toThrow("public_product_contract_invalid:input_shape");
    expect(reads).toBe(0);
  });

  it("exhausts digest faults before qualification currentness faults", () => {
    const fixture = pairFixture();
    const changed = { ...fixture.firstReceipt, receipt_digest: "0".repeat(64) };
    const governance = rehashGovernance({
      ...fixture.governance,
      as_of: "2026-08-25T00:00:00.001Z",
      receipts: [changed, fixture.secondReceipt].sort(
        (left, right) => scalarCompare(left.receipt_id, right.receipt_id),
      ),
    });

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      governance,
    })).toThrow("public_product_contract_invalid:digest");
  });

  it("classifies a changed qualification replay before reviewer qualification", () => {
    const fixture = pairFixture();
    const governance = structuredClone(fixture.governance);
    governance.qualification_replays[0]!.issuance.input.control_dispositions[0]!.rationale =
      "Changed but still semantically valid control rationale.";
    governance.qualification_replays[0]!.issuance.expected_decision = authorizeOperation(
      governance.qualification_replays[0]!.issuance.input,
    );
    const rehashed = rehashGovernance(governance);

    expect(() => verifyPublicProductReviewPair({
      ...fixture.pairInput,
      governance: rehashed,
    })).toThrow("public_product_contract_invalid:digest");
  });
});
