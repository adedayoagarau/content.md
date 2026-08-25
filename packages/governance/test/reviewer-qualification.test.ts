import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  authorizeOperation,
  issueReviewerQualification,
  verifyReviewerQualification,
  type AuthorizationInput,
  type AuthorizationReplay,
  type GovernancePolicy,
  type ReviewerQualificationMaterial,
} from "@contentmd/governance";

const issuedAt = "2026-08-24T16:00:00.000Z";
const expiresAt = "2026-09-24T16:00:00.000Z";

const limits = Object.freeze({
  calls: 1,
  bytes: 16_384,
  duration_ms: 1_000,
  records: 1,
  model_tokens: 0,
  browser_actions: 0,
  retries: 0,
});

function material(
  overrides: Partial<ReviewerQualificationMaterial> = {},
): ReviewerQualificationMaterial {
  return {
    record_mode: "governed",
    reviewer_ref: {
      object_id: "reviewer.content-designer.001",
      object_digest: "1".repeat(64),
    },
    eligible_roles: ["qualified_content_designer"],
    qualified_objectives: ["public_product_taxonomy_review"],
    authorized_resource_scopes: ["public-product-corpus", "public-product-taxonomy"],
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: expiresAt,
    issuer_principal_ref: "principal.governance.issuer.001",
    ...overrides,
  };
}

function policy(action: string): GovernancePolicy {
  return {
    policy_id: `policy.reviewer-qualification.${action}`,
    policy_version: 1,
    status: "current",
    effective_at: "2026-08-24T00:00:00.000Z",
    expires_at: "2026-12-31T23:59:59.999Z",
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

function authorizationInput(
  qualificationMaterial: ReviewerQualificationMaterial,
  action = "issue_reviewer_qualification",
): AuthorizationInput {
  const materialDigest = sha256Canonical(qualificationMaterial);
  const operationId = `operation.${action}.${materialDigest.slice(0, 16)}`;
  return {
    now: issuedAt,
    request: {
      operation_id: operationId,
      intent: "enforce",
      action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...qualificationMaterial.authorized_resource_scopes],
      data_classes: ["governance-metadata"],
      egress: "none",
      requested_limits: { ...limits },
      approval_class: "semantic_decision",
      requires_readback: false,
      subject_digest: materialDigest,
    },
    policies: [policy(action)],
    capability_grant: {
      grant_id: `grant.${action}.001`,
      principal_ref: qualificationMaterial.issuer_principal_ref,
      workload_ref: "workload.contentmd.governance",
      action,
      adapter_id: "adapter.governance.reviewer-qualification",
      resource_scope: [...qualificationMaterial.authorized_resource_scopes],
      data_classes: ["governance-metadata"],
      egress: "none",
      max_limits: { ...limits },
      issued_at: "2026-08-24T15:00:00.000Z",
      expires_at: "2026-08-24T17:00:00.000Z",
      revocation_state: "current",
    },
    approval: {
      approval_id: `approval.${action}.001`,
      approval_class: "semantic_decision",
      subject_ref: operationId,
      subject_digest: materialDigest,
      status: "issued",
      issued_at: "2026-08-24T15:30:00.000Z",
      expires_at: "2026-08-24T17:00:00.000Z",
      revocation_state: "current",
    },
    control_dispositions: [
      {
        control_type: "data_processing",
        applicability: "applicable",
        record_ref: "control.reviewer-qualification.processing",
        status: "current",
        rationale: "Qualification metadata only.",
      },
      {
        control_type: "durable_memory",
        applicability: "applicable",
        record_ref: "control.reviewer-qualification.memory",
        status: "current",
        rationale: "The qualification is an auditable governance record.",
      },
      {
        control_type: "telemetry",
        applicability: "applicable",
        record_ref: "control.reviewer-qualification.telemetry",
        status: "current",
        rationale: "Only minimized governance audit metadata is retained.",
      },
    ],
    verification_plan_ref: null,
    reliability_evidence: null,
  };
}

function replay(
  qualificationMaterial: ReviewerQualificationMaterial,
  action = "issue_reviewer_qualification",
): AuthorizationReplay {
  const input = authorizationInput(qualificationMaterial, action);
  return { input, expected_decision: authorizeOperation(input) };
}

function governedInput(overrides: {
  material?: ReviewerQualificationMaterial;
  issuance?: AuthorizationReplay;
  revocation?: AuthorizationReplay | null;
  as_of?: string;
} = {}) {
  const qualificationMaterial = overrides.material ?? material();
  return {
    material: qualificationMaterial,
    issuance: overrides.issuance ?? replay(qualificationMaterial),
    revocation: overrides.revocation ?? null,
    as_of: overrides.as_of ?? issuedAt,
  };
}

describe("reviewer qualification", () => {
  it("issues and verifies an immutable current qualification from the governed replay", () => {
    const input = governedInput();
    const record = issueReviewerQualification(input);

    expect(record).toMatchObject({
      contract_version: "contentmd.reviewer-qualification/0.1.0",
      qualification_status: "current",
      qualification_effect: "review_eligibility_only",
      authority_effect: "none",
      material_digest: sha256Canonical(input.material),
      issuance_replay_digest: sha256Canonical(input.issuance),
      revocation_replay_digest: null,
    });
    expect(record.qualification_id).toMatch(/^reviewer-qualification\.[0-9a-f]{64}$/u);
    expect(record.qualification_digest).toBe(
      sha256Canonical(Object.fromEntries(
        Object.entries(record).filter(([key]) => key !== "qualification_digest"),
      )),
    );
    expect(verifyReviewerQualification({
      qualification: record,
      issuance: input.issuance,
      revocation: null,
      as_of: issuedAt,
      verification_mode: "official",
    })).toBe(record);
    expect(Object.isFrozen(record)).toBe(true);
    expect(Object.isFrozen(record.reviewer_ref)).toBe(true);
  });

  it("rejects a replay whose supplied decision differs from fresh authorization", () => {
    const input = governedInput();
    const record = issueReviewerQualification(input);
    const forgedReplay: AuthorizationReplay = {
      ...input.issuance,
      expected_decision: {
        ...input.issuance.expected_decision,
        audit_event: {
          ...input.issuance.expected_decision.audit_event,
          target_refs: ["public-product-corpus", "unreviewed-scope"],
        },
      },
    };

    expect(() => verifyReviewerQualification({
      qualification: record,
      issuance: forgedReplay,
      revocation: null,
      as_of: issuedAt,
      verification_mode: "official",
    })).toThrow("reviewer_qualification_invalid:issuance");
  });

  it("rejects an issuance whose subject is not the exact material digest", () => {
    const qualificationMaterial = material();
    const issuance = replay(qualificationMaterial);
    issuance.input.request.subject_digest = "0".repeat(64);
    issuance.input.approval!.subject_digest = "0".repeat(64);
    issuance.expected_decision = authorizeOperation(issuance.input);

    expect(() => issueReviewerQualification(governedInput({
      material: qualificationMaterial,
      issuance,
    }))).toThrow("reviewer_qualification_invalid:issuance");
  });

  it("rejects an issuer that differs from the authorized grant principal", () => {
    const qualificationMaterial = material();
    const issuance = replay(qualificationMaterial);
    issuance.input.capability_grant = {
      ...issuance.input.capability_grant!,
      principal_ref: "principal.unrelated",
    };
    issuance.expected_decision = authorizeOperation(issuance.input);

    expect(() => issueReviewerQualification(governedInput({
      material: qualificationMaterial,
      issuance,
    }))).toThrow("reviewer_qualification_invalid:issuance");
  });

  it.each([
    ["policy", (input: AuthorizationInput) => ({ ...input, policies: [] })],
    ["capability grant", (input: AuthorizationInput) => ({
      ...input,
      capability_grant: { ...input.capability_grant!, revocation_state: "revoked" as const },
    })],
    ["semantic approval", (input: AuthorizationInput) => ({
      ...input,
      approval: { ...input.approval!, status: "revoked" as const, revocation_state: "revoked" as const },
    })],
    ["control disposition", (input: AuthorizationInput) => ({
      ...input,
      control_dispositions: input.control_dispositions.filter(
        (item) => item.control_type !== "telemetry",
      ),
    })],
  ])("rejects a missing, stale, or mismatched %s replay", (_name, mutate) => {
    const qualificationMaterial = material();
    const validReplay = replay(qualificationMaterial);
    const invalidInput = mutate(structuredClone(validReplay.input));
    const invalidReplay = {
      input: invalidInput,
      expected_decision: authorizeOperation(invalidInput),
    };

    expect(() => issueReviewerQualification(governedInput({
      material: qualificationMaterial,
      issuance: invalidReplay,
    }))).toThrow("reviewer_qualification_invalid:issuance");
  });

  it("rejects an issuance status time that differs from its authorization replay time", () => {
    expect(() => issueReviewerQualification(governedInput({
      as_of: "2026-08-24T16:00:00.001Z",
    }))).toThrow("reviewer_qualification_invalid:issuance_time");
  });

  it("records an authorized revocation and rejects it as unusable", () => {
    const qualificationMaterial = material();
    const input = governedInput({
      material: qualificationMaterial,
      revocation: replay(qualificationMaterial, "revoke_reviewer_qualification"),
    });
    const record = issueReviewerQualification(input);

    expect(record.qualification_status).toBe("revoked");
    expect(() => verifyReviewerQualification({
      qualification: record,
      issuance: input.issuance,
      revocation: input.revocation,
      as_of: issuedAt,
      verification_mode: "official",
    })).toThrow("reviewer_qualification_invalid:revoked");
  });

  it("rejects a current record after its qualification expiry", () => {
    const input = governedInput();
    const record = issueReviewerQualification(input);

    expect(() => verifyReviewerQualification({
      qualification: record,
      issuance: input.issuance,
      revocation: null,
      as_of: "2026-09-24T16:00:00.001Z",
      verification_mode: "official",
    })).toThrow("reviewer_qualification_invalid:expired");
  });

  it("never accepts a development fixture for official review", () => {
    const qualificationMaterial = material({ record_mode: "development_fixture" });
    const input = governedInput({ material: qualificationMaterial });
    const record = issueReviewerQualification(input);

    expect(() => verifyReviewerQualification({
      qualification: record,
      issuance: input.issuance,
      revocation: null,
      as_of: issuedAt,
      verification_mode: "official",
    })).toThrow("reviewer_qualification_invalid:development_fixture");
  });

  it("rejects non-data properties without invoking their getters", () => {
    const qualificationMaterial = material();
    const input = governedInput();
    let reads = 0;
    Object.defineProperty(qualificationMaterial, "extra", {
      enumerable: true,
      get() {
        reads += 1;
        return "forbidden";
      },
    });

    expect(() => issueReviewerQualification({
      ...input,
      material: qualificationMaterial,
    })).toThrow("reviewer_qualification_invalid:input_shape");
    expect(reads).toBe(0);
  });
});
