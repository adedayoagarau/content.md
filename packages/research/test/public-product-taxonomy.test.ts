import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  issueReviewerQualification,
  type AuthorizationInput,
  type AuthorizationReplay,
  type GovernancePolicy,
  type ReviewerQualificationMaterial,
  type ReviewerRole,
} from "@contentmd/governance";
import {
  PUBLIC_PRODUCT_COVERAGE_SLOTS,
  createPublicProductReviewReceipt,
  createTaxonomyProposal,
  normalizePublicProductSignature,
  verifyPublicProductExperienceTaxonomy,
  type ExperienceMapping,
  type NormalizedStructuralSignature,
  type PublicProductDigestRef,
  type PublicProductExperienceTaxonomy,
  type PublicProductReviewGovernanceEvidence,
  type PublicProductReviewReceipt,
  type PublicProductTaxonomyDefinition,
  type RawStructuralSignature,
} from "@contentmd/research";

const reviewedAt = "2026-08-24T18:00:00.000Z";
const asOf = "2026-08-24T19:00:00.000Z";
const limits = {
  calls: 1, bytes: 16_384, duration_ms: 1_000, records: 1,
  model_tokens: 0, browser_actions: 0, retries: 0,
};

const mappingItems = [
  "raw_state_accuracy", "coverage_slot_fit", "journey_family_fit", "state_class_fit",
  "content_slot_fit", "channel_fit", "counterexample_sufficiency",
  "industry_neutrality", "localization_transferability", "rights_safe_abstraction",
] as const;
const taxonomyItems = [
  "definition_completeness", "semantic_id_stability", "mapping_set_completeness",
  "previous_version_compatibility", "effective_time_validity", "review_closure",
  "no_authority_or_learning_widening",
] as const;

function scalarCompare(left: string, right: string): number {
  const a = [...left].map((value) => value.codePointAt(0)!);
  const b = [...right].map((value) => value.codePointAt(0)!);
  for (let index = 0; index < Math.min(a.length, b.length); index += 1) {
    const difference = a[index]! - b[index]!;
    if (difference !== 0) return difference;
  }
  return a.length - b.length;
}

function ref(objectId: string, objectDigest: string): PublicProductDigestRef {
  return { object_id: objectId, object_digest: objectDigest };
}

function policy(action: string): GovernancePolicy {
  return {
    policy_id: `policy.${action}`,
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: "2026-08-25T00:00:00.000Z",
    allowed_actions: [action], denied_actions: [], review_actions: [],
    allowed_adapters: ["adapter.governance.reviewer-qualification"], denied_adapters: [],
    permitted_data_classes: ["governance-metadata"], denied_data_classes: [],
    permitted_egress: ["none"], max_limits: { ...limits },
    human_approval_actions: [action],
    required_control_types: ["data_processing", "durable_memory", "telemetry"],
  };
}

function qualification(reviewerNumber: number, role: ReviewerRole) {
  const material: ReviewerQualificationMaterial = {
    record_mode: "governed",
    reviewer_ref: ref(`reviewer.taxonomy.${reviewerNumber}`, String(reviewerNumber).repeat(64)),
    eligible_roles: [role],
    qualified_objectives: ["public_product_review"],
    authorized_resource_scopes: ["public-product-corpus", "public-product-taxonomy"],
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: "2026-08-25T00:00:00.000Z",
    issuer_principal_ref: "principal.public-product-governance",
  };
  const materialDigest = sha256Canonical(material);
  const action = "issue_reviewer_qualification";
  const operationId = `operation.${action}.${reviewerNumber}`;
  const authorization: AuthorizationInput = {
    now: reviewedAt,
    request: {
      operation_id: operationId, intent: "enforce", action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"], egress: "none",
      requested_limits: { ...limits }, approval_class: "semantic_decision",
      requires_readback: false, subject_digest: materialDigest,
    },
    policies: [policy(action)],
    capability_grant: {
      grant_id: `grant.taxonomy.${reviewerNumber}`,
      principal_ref: material.issuer_principal_ref,
      workload_ref: "workload.contentmd.taxonomy-review", action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...material.authorized_resource_scopes],
      data_classes: ["governance-metadata"], egress: "none", max_limits: { ...limits },
      issued_at: "2026-08-24T17:00:00.000Z",
      expires_at: "2026-08-24T20:00:00.000Z", revocation_state: "current",
    },
    approval: {
      approval_id: `approval.taxonomy.${reviewerNumber}`,
      approval_class: "semantic_decision", subject_ref: operationId,
      subject_digest: materialDigest, status: "issued",
      issued_at: "2026-08-24T17:30:00.000Z",
      expires_at: "2026-08-24T20:00:00.000Z", revocation_state: "current",
    },
    control_dispositions: [
      { control_type: "data_processing", applicability: "applicable", record_ref: "control.processing", status: "current", rationale: "Governance metadata." },
      { control_type: "durable_memory", applicability: "applicable", record_ref: "control.memory", status: "current", rationale: "Auditable review." },
      { control_type: "telemetry", applicability: "applicable", record_ref: "control.telemetry", status: "current", rationale: "Minimized audit." },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
  const issuance: AuthorizationReplay = {
    input: authorization,
    expected_decision: authorizeOperation(authorization),
  };
  return {
    record: issueReviewerQualification({ material, issuance, revocation: null, as_of: reviewedAt }),
    issuance,
  };
}

function definition(definitionId: string): PublicProductTaxonomyDefinition {
  const preimage = {
    definition_id: definitionId,
    display_name: definitionId.replaceAll("_", " "),
    description: `Bounded definition for ${definitionId}.`,
    inclusion_rule: `Include only direct ${definitionId} evidence.`,
    exclusion_rule: `Exclude inferred ${definitionId} labels.`,
    counterexample_refs: [] as PublicProductDigestRef[],
  };
  return { ...preimage, definition_digest: sha256Canonical(preimage) };
}

function rawSignature(journey = "start"): RawStructuralSignature {
  return {
    journey,
    event_state: "entry",
    content_slot_type: "primary_message",
    surface_channel: "web",
  };
}

function normalizedSignature(
  coverageSlotId: typeof PUBLIC_PRODUCT_COVERAGE_SLOTS[number] = "entry_onboarding",
): NormalizedStructuralSignature {
  return {
    coverage_slot_id: coverageSlotId,
    journey_family_id: "journey.account_entry",
    state_class_id: "state.entry",
    content_slot_class_id: "content.primary_message",
    surface_channel_id: "channel.web",
  };
}

function receiptRef(receipt: PublicProductReviewReceipt): PublicProductDigestRef {
  return ref(receipt.receipt_id, receipt.receipt_digest);
}

function reviewReceipt(input: {
  kind: "taxonomy_mapping" | "taxonomy_version";
  subject: PublicProductDigestRef;
  qualification: ReturnType<typeof qualification>["record"];
  role: ReviewerRole;
}): PublicProductReviewReceipt {
  const items = input.kind === "taxonomy_mapping" ? mappingItems : taxonomyItems;
  return createPublicProductReviewReceipt({
    record_mode: "official",
    review_kind: input.kind,
    subject_ref: input.subject,
    qualification: input.qualification,
    reviewer_role: input.role,
    checklist_version: input.kind === "taxonomy_mapping"
      ? "contentmd.public-product-review-checklist.taxonomy-mapping/0.1.0"
      : "contentmd.public-product-review-checklist.taxonomy-version/0.1.0",
    checklist_results: items.map((item) => ({ item, status: "pass" as const })),
    decision: "pass",
    reviewed_at: reviewedAt,
  });
}

function mappingWithReviews(input: {
  raw?: RawStructuralSignature;
  normalized?: NormalizedStructuralSignature;
  rationale?: string;
  designers: ReturnType<typeof qualification>;
  steward: ReturnType<typeof qualification>;
}) {
  const material = {
    raw_signature: input.raw ?? rawSignature(),
    normalized_signature: input.normalized ?? normalizedSignature(),
    rationale: input.rationale ?? "Direct entry evidence maps to the canonical entry slot.",
    counterexample_refs: [] as PublicProductDigestRef[],
  };
  const mappingMaterialDigest = sha256Canonical(material);
  const subject = ref(`mapping-material.${mappingMaterialDigest}`, mappingMaterialDigest);
  const receipts = [
    reviewReceipt({ kind: "taxonomy_mapping", subject, qualification: input.designers.record, role: "qualified_content_designer" }),
    reviewReceipt({ kind: "taxonomy_mapping", subject, qualification: input.steward.record, role: "taxonomy_steward" }),
  ] as const;
  const reviewRefs = receipts.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef];
  const identity = { mapping_material_digest: mappingMaterialDigest, review_receipt_refs: reviewRefs };
  const preimage = {
    mapping_id: `experience-mapping.${sha256Canonical(identity)}`,
    ...material,
    mapping_material_digest: mappingMaterialDigest,
    review_receipt_refs: reviewRefs,
  };
  return {
    mapping: { ...preimage, mapping_digest: sha256Canonical(preimage) } satisfies ExperienceMapping,
    receipts,
  };
}

function governance(input: {
  reviewers: readonly ReturnType<typeof qualification>[];
  receipts: readonly PublicProductReviewReceipt[];
}): PublicProductReviewGovernanceEvidence {
  const qualifications = input.reviewers.map((item) => item.record)
    .sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const qualificationReplays = input.reviewers.map((item) => ({
    qualification_id: item.record.qualification_id,
    issuance: item.issuance,
    revocation: null,
  })).sort((left, right) => scalarCompare(left.qualification_id, right.qualification_id));
  const receipts = [...input.receipts]
    .sort((left, right) => scalarCompare(left.receipt_id, right.receipt_id));
  const preimage = {
    contract_version: "contentmd.public-product-review-governance/0.1.0" as const,
    as_of: asOf,
    qualifications,
    qualification_replays: qualificationReplays,
    receipts,
  };
  return { ...preimage, governance_digest: sha256Canonical(preimage) };
}

function taxonomyFixture(input: {
  previousTaxonomyRef?: PublicProductDigestRef | null;
  rationale?: string;
} = {}) {
  const designer = qualification(1, "qualified_content_designer");
  const steward = qualification(2, "taxonomy_steward");
  const mappingResult = mappingWithReviews({ designers: designer, steward, rationale: input.rationale });
  const coverageSlots = PUBLIC_PRODUCT_COVERAGE_SLOTS.map(definition);
  const journeyFamilies = [definition("journey.account_entry")];
  const stateClasses = [definition("state.entry")];
  const contentSlotClasses = [definition("content.primary_message")];
  const surfaceChannels = [definition("channel.web")];
  const material = {
    contract_version: "contentmd.public-product-experience-taxonomy/0.1.0" as const,
    taxonomy_version: "2026-08-24.1",
    previous_taxonomy_ref: input.previousTaxonomyRef ?? null,
    effective_at: "2026-08-24T19:00:00.000Z",
    coverage_slots: coverageSlots,
    journey_families: journeyFamilies,
    state_classes: stateClasses,
    content_slot_classes: contentSlotClasses,
    surface_channels: surfaceChannels,
    mappings: [mappingResult.mapping],
  };
  const taxonomyMaterialDigest = sha256Canonical(material);
  const taxonomySubject = ref(`taxonomy-material.${taxonomyMaterialDigest}`, taxonomyMaterialDigest);
  const taxonomyReceipts = [
    reviewReceipt({ kind: "taxonomy_version", subject: taxonomySubject, qualification: designer.record, role: "qualified_content_designer" }),
    reviewReceipt({ kind: "taxonomy_version", subject: taxonomySubject, qualification: steward.record, role: "taxonomy_steward" }),
  ] as const;
  const mappingReviewRefs = mappingResult.receipts.map(receiptRef)
    .sort((left, right) => scalarCompare(left.object_id, right.object_id));
  const taxonomyReviewRefs = taxonomyReceipts.map(receiptRef) as [PublicProductDigestRef, PublicProductDigestRef];
  const taxonomyIdentity = {
    taxonomy_material_digest: taxonomyMaterialDigest,
    mapping_review_receipt_refs: mappingReviewRefs,
    taxonomy_review_receipt_refs: taxonomyReviewRefs,
  };
  const preimage = {
    contract_version: material.contract_version,
    taxonomy_id: `public-product-experience-taxonomy.${sha256Canonical(taxonomyIdentity)}`,
    taxonomy_version: material.taxonomy_version,
    previous_taxonomy_ref: material.previous_taxonomy_ref,
    effective_at: material.effective_at,
    coverage_slots: coverageSlots,
    journey_families: journeyFamilies,
    state_classes: stateClasses,
    content_slot_classes: contentSlotClasses,
    surface_channels: surfaceChannels,
    mappings: [mappingResult.mapping],
    mapping_review_receipt_refs: mappingReviewRefs,
    taxonomy_review_receipt_refs: taxonomyReviewRefs,
    taxonomy_material_digest: taxonomyMaterialDigest,
    classification_effect: "corpus_projection_only" as const,
    authority_effect: "none" as const,
    prompt_eligibility: "never" as const,
    training_eligibility: "never" as const,
    benchmark_eligibility: false as const,
  };
  const taxonomy: PublicProductExperienceTaxonomy = {
    ...preimage,
    taxonomy_digest: sha256Canonical(preimage),
  };
  return {
    taxonomy,
    governance: governance({
      reviewers: [designer, steward],
      receipts: [...mappingResult.receipts, ...taxonomyReceipts],
    }),
  };
}

describe("versioned public-product taxonomy", () => {
  it("verifies the exact six-slot taxonomy and performs exact lookup only", () => {
    const fixture = taxonomyFixture();
    const verified = verifyPublicProductExperienceTaxonomy({
      ...fixture,
      as_of: asOf,
      verification_mode: "official",
    });

    expect(fixture.taxonomy.coverage_slots.map((item) => item.definition_id))
      .toEqual(PUBLIC_PRODUCT_COVERAGE_SLOTS);
    expect(normalizePublicProductSignature(verified, rawSignature("start")))
      .toEqual(normalizedSignature("entry_onboarding"));
    expect(normalizePublicProductSignature(verified, rawSignature("Start"))).toBeNull();
    expect(Object.isFrozen(verified.taxonomy)).toBe(true);
    expect(() => (verified.by_raw_signature_digest as Map<string, ExperienceMapping>).set(
      "forged",
      fixture.taxonomy.mappings[0]!,
    )).toThrow();
  });

  it("rejects duplicate mapping entries for the same raw signature", () => {
    const fixture = taxonomyFixture();
    const duplicate = structuredClone(fixture.taxonomy.mappings[0]!);
    const invalid = structuredClone(fixture.taxonomy);
    invalid.mappings.push(duplicate);

    expect(() => verifyPublicProductExperienceTaxonomy({
      taxonomy: invalid,
      governance: fixture.governance,
      as_of: asOf,
      verification_mode: "official",
    })).toThrow("public_product_contract_invalid:canonical_value");
  });

  it("rejects a mapping to a normalized definition absent from the same taxonomy", () => {
    const fixture = taxonomyFixture();
    const invalid = structuredClone(fixture.taxonomy);
    invalid.mappings[0]!.normalized_signature.state_class_id = "state.missing";

    expect(() => verifyPublicProductExperienceTaxonomy({
      taxonomy: invalid,
      governance: fixture.governance,
      as_of: asOf,
      verification_mode: "official",
    })).toThrow("public_product_contract_invalid:digest");
  });

  it("requires the mapping review pair and the whole-taxonomy review pair", () => {
    const fixture = taxonomyFixture();
    const withoutMappingReceipt = {
      ...fixture.governance,
      receipts: fixture.governance.receipts.filter(
        (receipt) => receipt.review_kind !== "taxonomy_mapping",
      ),
    };
    const { governance_digest: _discarded, ...governancePreimage } = withoutMappingReceipt;
    const governance = {
      ...governancePreimage,
      governance_digest: sha256Canonical(governancePreimage),
    };

    expect(() => verifyPublicProductExperienceTaxonomy({
      taxonomy: fixture.taxonomy,
      governance,
      as_of: asOf,
      verification_mode: "official",
    })).toThrow("public_product_contract_invalid:reference_binding");
  });

  it("binds previous taxonomy and reviewed material into taxonomy identity", () => {
    const first = taxonomyFixture();
    const second = taxonomyFixture({
      previousTaxonomyRef: ref(first.taxonomy.taxonomy_id, first.taxonomy.taxonomy_digest),
    });
    const revised = taxonomyFixture({ rationale: "A revised reviewed rationale." });

    expect(second.taxonomy.taxonomy_id).not.toBe(first.taxonomy.taxonomy_id);
    expect(revised.taxonomy.taxonomy_id).not.toBe(first.taxonomy.taxonomy_id);
  });

  it("creates ML suggestions as immutable, authority-free queue entries only", () => {
    const fixture = taxonomyFixture();
    const proposal = createTaxonomyProposal({
      active_taxonomy_ref: ref(fixture.taxonomy.taxonomy_id, fixture.taxonomy.taxonomy_digest),
      raw_signature: rawSignature("unmapped-start"),
      proposed_signature: normalizedSignature(),
      evidence_refs: [ref("evidence.001", "1".repeat(64))],
      counterexample_refs: [],
      proposer_kind: "ml_suggestion",
      proposer_artifact_refs: [
        ref("artifact.code", "2".repeat(64)),
        ref("artifact.input", "3".repeat(64)),
        ref("artifact.model", "4".repeat(64)),
      ],
      confidence: 0.75,
    });

    expect(proposal).toMatchObject({
      review_state: "unreviewed",
      classification_effect: "none",
      authority_effect: "none",
      prompt_eligibility: "never",
      training_eligibility: "never",
      benchmark_eligibility: false,
    });
    expect(Object.isFrozen(proposal)).toBe(true);
  });

  it("rejects an ML suggestion without exact code, input, and model artifact refs", () => {
    expect(() => createTaxonomyProposal({
      active_taxonomy_ref: null,
      raw_signature: rawSignature("unmapped-start"),
      proposed_signature: normalizedSignature(),
      evidence_refs: [ref("evidence.001", "1".repeat(64))],
      counterexample_refs: [],
      proposer_kind: "ml_suggestion",
      proposer_artifact_refs: [ref("artifact.model", "4".repeat(64))],
      confidence: 0.75,
    })).toThrow("public_product_contract_invalid:canonical_value");
  });
});
