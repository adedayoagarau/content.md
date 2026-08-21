import { sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import {
  adaptContentDecisionEvent,
  determineLearningEligibility,
  qualifyFeedback,
} from "@contentmd/learning";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { describe, expect, it } from "vitest";
import {
  canonicalSet,
  clone,
  eligibilityFixture,
  qualificationFixture,
  recordRef,
  refinalizeRecord,
  rehashSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";

function qualifiedFixture(options: Parameters<typeof qualificationFixture>[1] = {}) {
  const fixture = qualificationFixture(adaptContentDecisionEvent, options);
  const qualification = qualifyFeedback(fixture.input);
  return { fixture, qualification };
}

describe("learning eligibility", () => {
  it("issues a digest-valid eligible project record only when every check passes", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    const record = determineLearningEligibility(input);

    expect(record.payload).toEqual(expect.objectContaining({
      eligibility_state: "eligible",
      target_memory_scope: "project",
      rights_check: "pass",
      privacy_check: "pass",
      factual_check: "pass",
      policy_check: "pass",
      incident_check: "pass",
      context_check: "pass",
      reason_codes: ["all_eligibility_checks_passed"],
      authority_effect: "none",
    }));
    expect(record.record_id).toBe(`learning-eligibility.${record.payload.input_digest}`);
    expect(record.scope.memory_scope).toBe("project");
    expect(verifyRecordDigest(record)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.learningEligibility, record)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it.each([
    ["rights", "fail", "rights_check_fail"],
    ["rights", "unknown", "rights_check_unknown"],
    ["privacy", "fail", "privacy_check_fail"],
    ["privacy", "unknown", "privacy_check_unknown"],
    ["factual", "fail", "factual_check_fail"],
    ["factual", "unknown", "factual_check_unknown"],
    ["policy", "fail", "policy_check_fail"],
    ["policy", "unknown", "policy_check_unknown"],
    ["incident", "fail", "incident_check_fail"],
    ["incident", "unknown", "incident_check_unknown"],
    ["context", "fail", "context_check_fail"],
    ["context", "unknown", "context_check_unknown"],
  ] as const)("retains the %s %s check reason", (check, state, reason) => {
    const { fixture, qualification } = qualifiedFixture();
    const options = state === "fail" ? { failedCheck: check } : { unknownCheck: check };
    const record = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
        options,
      ),
    );

    expect(record.payload.eligibility_state).toBe("ineligible");
    expect(record.payload.reason_codes).toContain(reason);
    expect(record.payload[`${check}_check`]).toBe(state);
  });

  it.each([
    ["missing", "permission_missing"],
    ["revoked", "permission_revoked_or_unknown"],
    ["unknown", "permission_revoked_or_unknown"],
    ["expired", "permission_expired"],
    ["future", "permission_not_yet_effective"],
  ] as const)("fails closed for %s learning permission", (permission, reason) => {
    const { fixture, qualification } = qualifiedFixture();
    const record = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
        { permission },
      ),
    );
    expect(record.payload.eligibility_state).toBe("ineligible");
    expect(record.payload.reason_codes).toContain(reason);
    if (permission === "missing") expect(record.payload.permission_ref).toBeNull();
  });

  it("enforces policy currentness, exact scope transitions, and reviewer minima", () => {
    const { fixture, qualification } = qualifiedFixture();
    const stalePolicy = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
        { policyStatus: "superseded" },
      ),
    );
    const organization = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
        { targetScope: "organization" },
      ),
    );

    expect(stalePolicy.payload.reason_codes).toContain(
      "learning_policy_not_current_or_mismatched",
    );
    expect(organization.payload.reason_codes).toContain(
      "reviewer_set_insufficient_or_unqualified",
    );
    expect(organization.scope.memory_scope).toBe("organization");
  });

  it.each([
    "memory_scope",
    "project_id",
    "resource_refs",
    "data_classes",
  ] as const)("requires qualification %s to equal the decision scope", (field) => {
    const { fixture, qualification } = qualifiedFixture();
    let mismatched = clone(qualification);
    if (field === "memory_scope") mismatched.scope.memory_scope = "personal";
    if (field === "project_id") mismatched.scope.project_id = "project.other";
    if (field === "resource_refs") mismatched.scope.resource_refs = ["resource.other"];
    if (field === "data_classes") mismatched.scope.data_classes = ["other_feedback"];
    mismatched = refinalizeRecord(mismatched);

    expect(() => determineLearningEligibility(
      eligibilityFixture(
        mismatched,
        fixture.evidence,
        fixture.adapted.decision,
      ),
    )).toThrow("task2_contract_invalid:reference_integrity");
  });

  it.each([
    [
      "arbitrary fractional precision",
      "2026-08-20T18:00:00.123456789123456789Z",
      "2026-08-20T18:00:00.123456789123456788Z",
      "2026-08-20T18:00:00.123456789123456790Z",
    ],
    [
      "a valid leap second",
      "2026-06-30T23:59:60.5Z",
      "2026-06-30T23:59:60.4Z",
      "2026-07-01T00:00:00.0Z",
    ],
  ])("compares permission validity using exact RFC3339 instants for %s", (
    _case,
    evaluationAt,
    issuedAt,
    expiresAt,
  ) => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    input.evaluation_at = evaluationAt;
    input.qualification_input.evaluation_at = evaluationAt;
    if (evaluationAt.includes(":60")) {
      const reviewer = input.reviewer_set.payload.entries[0]!;
      reviewer.effective_at = "2026-06-01T00:00:00.000Z";
      reviewer.expires_at = "2026-07-02T00:00:00.000Z";
      input.reviewer_set.payload.set_digest = sha256Canonical({
        contract_version: "contentmd.task2-reviewer-set/0.1.0",
        entries: input.reviewer_set.payload.entries,
      });
      input.reviewer_set = rehashSnapshot(input.reviewer_set);
      input.qualification_input.reviewer_set = input.reviewer_set;
      input.qualification_input.review.payload.reviewer_set_ref = snapshotRef(input.reviewer_set);
      input.qualification_input.review = rehashSnapshot(input.qualification_input.review);
    }
    input.qualification = qualifyFeedback(input.qualification_input);
    input.checks.payload.qualification_ref = recordRef(input.qualification);
    input.checks.payload.evaluated_at = evaluationAt;
    input.checks = rehashSnapshot(input.checks);
    input.permission!.payload.issued_at = issuedAt;
    input.permission!.payload.expires_at = expiresAt;
    input.permission = rehashSnapshot(input.permission!);

    expect(determineLearningEligibility(input).payload).toEqual(expect.objectContaining({
      eligibility_state: "eligible",
      reason_codes: ["all_eligibility_checks_passed"],
    }));
  });

  it("allows eligibility evaluation after the replayed qualification time", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    input.evaluation_at = "2026-08-20T18:30:00.000Z";
    input.checks.payload.evaluated_at = input.evaluation_at;
    input.checks = rehashSnapshot(input.checks);

    expect(determineLearningEligibility(input).payload).toEqual(expect.objectContaining({
      eligibility_state: "eligible",
      reason_codes: ["all_eligibility_checks_passed"],
    }));
  });

  it.each([
    ["revoked", "current", "2026-08-21T00:00:00.000Z", ["permission_revoked_or_unknown"]],
    ["expired", "current", "2026-08-21T00:00:00.000Z", ["permission_expired"]],
    ["superseded", "current", "2026-08-21T00:00:00.000Z", ["permission_not_current"]],
    [
      "expired",
      "unknown",
      "2026-08-20T17:59:59.000Z",
      ["permission_expired", "permission_revoked_or_unknown"],
    ],
  ] as const)("maps and accumulates exact %s permission reasons", (
    status,
    revocationState,
    expiresAt,
    expectedReasons,
  ) => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    input.permission!.payload.status = status;
    input.permission!.payload.revocation_state = revocationState;
    input.permission!.payload.expires_at = expiresAt;
    input.permission = rehashSnapshot(input.permission!);

    const record = determineLearningEligibility(input);
    expect(record.payload.eligibility_state).toBe("ineligible");
    expect(record.payload.reason_codes).toEqual(expectedReasons);
  });

  it.each([
    ["learning_policy", "ranking_objective", "other_objective", "learning_policy_not_current_or_mismatched"],
    ["learning_policy", "candidate_kind", "pattern", "learning_policy_not_current_or_mismatched"],
    ["permission", "ranking_objective", "other_objective", "permission_objective_or_kind_mismatch"],
    ["permission", "candidate_kind", "pattern", "permission_objective_or_kind_mismatch"],
  ] as const)("records a substantive %s %s mismatch", (target, field, value, expectedReason) => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    if (target === "learning_policy") {
      (input.learning_policy.payload as Record<string, unknown>)[field] = value;
      input.learning_policy = rehashSnapshot(input.learning_policy);
    } else {
      (input.permission!.payload as Record<string, unknown>)[field] = value;
      input.permission = rehashSnapshot(input.permission!);
    }

    const record = determineLearningEligibility(input);
    expect(record.payload.eligibility_state).toBe("ineligible");
    expect(record.payload.reason_codes).toContain(expectedReason);
  });

  it("does not let duplicate reviewer identities satisfy an organization minimum", () => {
    const { fixture, qualification } = qualifiedFixture();
    const reviewerSet = clone(fixture.evidence.reviewer_set);
    const original = reviewerSet.payload.entries[0]!;
    original.authorized_scopes = canonicalSet([
      "project",
      "organization",
    ]) as typeof original.authorized_scopes;
    const duplicate = clone(original);
    duplicate.role = "content_reviewer";
    duplicate.reviewer_ref = {
      ...duplicate.reviewer_ref,
      content_digest: sha256Canonical({ alternate_version_of_same_reviewer: true }),
    };
    const entries = canonicalSet([original, duplicate]);
    reviewerSet.payload.entries = entries as typeof reviewerSet.payload.entries;
    reviewerSet.payload.set_digest = sha256Canonical({
      contract_version: "contentmd.task2-reviewer-set/0.1.0",
      entries,
    });
    const rehashedReviewerSet = rehashSnapshot(reviewerSet);
    fixture.evidence.reviewer_set = rehashedReviewerSet;
    fixture.evidence.qualification_input.reviewer_set = rehashedReviewerSet;
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
      { targetScope: "organization" },
    );

    expect(() => determineLearningEligibility(input)).toThrow(
      "task2_contract_invalid:set_uniqueness_or_order",
    );
  });

  it("binds the checks snapshot to qualification, decision, task, context, candidates, scope and time", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    input.checks.payload.evaluated_at = "2026-08-20T18:00:01.000Z";
    input.checks = rehashSnapshot(input.checks);
    const record = determineLearningEligibility(input);
    expect(record.payload.reason_codes).toContain("eligibility_checks_binding_mismatch");
  });

  it("blocks edited content when facts, requirements, or context changed", () => {
    const { fixture, qualification } = qualifiedFixture({
      status: "edited",
      observedRequirementsChanged: true,
    });
    const record = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
      ),
    );
    expect(record.payload.eligibility_state).toBe("ineligible");
    expect(record.payload.reason_codes).toContain("feedback_not_qualified");
    expect(record.payload.reason_codes).toContain("edited_content_changed");
  });

  it("rechecks durable and snapshot integrity and rejects official issuance", () => {
    const { fixture, qualification } = qualifiedFixture();
    const durableTamper = eligibilityFixture(
      clone(qualification),
      fixture.evidence,
      fixture.adapted.decision,
    );
    durableTamper.qualification.payload.outcome = "B";
    expect(() => determineLearningEligibility(durableTamper)).toThrow(
      "task2_contract_invalid:durable_record_digest",
    );

    const snapshotTamper = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    snapshotTamper.learning_policy.payload.status = "revoked";
    expect(() => determineLearningEligibility(snapshotTamper)).toThrow(
      "task2_contract_invalid:snapshot_digest",
    );

    const official = clone(eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    ));
    (official as { record_mode: string }).record_mode = "official";
    (official.qualification_input as { record_mode: string }).record_mode = "official";
    expect(() => determineLearningEligibility(official)).toThrow(
      "task2_contract_invalid:official_mode_not_supported",
    );

    const valid = determineLearningEligibility(
      eligibilityFixture(
        qualification,
        fixture.evidence,
        fixture.adapted.decision,
      ),
    );
    const mutated = clone(valid);
    mutated.payload.eligibility_state = "ineligible";
    expect(verifyRecordDigest(mutated).valid).toBe(false);
  });

  it.each([
    ["retired", (record: ReturnType<typeof qualifyFeedback>) => {
      record.lifecycle_state = "retired";
    }],
    ["record version 2", (record: ReturnType<typeof qualifyFeedback>) => {
      record.record_version = 2;
    }],
    ["official upstream mode", (record: ReturnType<typeof qualifyFeedback>) => {
      record.payload.record_mode = "official";
    }],
    ["stripped provenance", (record: ReturnType<typeof qualifyFeedback>) => {
      record.provenance = [];
    }],
  ] as const)("rejects a re-finalized %s qualification record", (_case, mutate) => {
    const { fixture, qualification } = qualifiedFixture();
    let tampered = clone(qualification);
    mutate(tampered);
    tampered = refinalizeRecord(tampered);

    expect(() => determineLearningEligibility(eligibilityFixture(
      tampered,
      fixture.evidence,
      fixture.adapted.decision,
    ))).toThrow("task2_contract_invalid:reference_integrity");
  });

  it("rejects a re-finalized qualified record whose success proofs are incoherent", () => {
    const { fixture, qualification } = qualifiedFixture();
    let tampered = clone(qualification);
    tampered.payload.blinded = false;
    tampered = refinalizeRecord(tampered);

    expect(() => determineLearningEligibility(eligibilityFixture(
      tampered,
      fixture.evidence,
      fixture.adapted.decision,
    ))).toThrow("task2_contract_invalid:reference_integrity");
  });

  it("rejects a re-finalized not-qualified record forged into a qualified record", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent, { outcome: "tie" });
    let forged = qualifyFeedback(fixture.input);
    forged.payload.outcome = "A";
    forged.payload.qualification_state = "qualified";
    forged.payload.reason_codes = ["qualified_decisive_review"];
    forged = refinalizeRecord(forged);

    expect(() => determineLearningEligibility(eligibilityFixture(
      forged,
      fixture.evidence,
      fixture.adapted.decision,
    ))).toThrow("task2_contract_invalid:reference_integrity");
  });

  it("rejects substituted decision-boundary provenance on a re-finalized qualification", () => {
    const { fixture, qualification } = qualifiedFixture();
    let forged = clone(qualification);
    const boundary = forged.provenance.find((entry) =>
      entry.relationship === "decision_boundary");
    boundary!.content_digest = sha256Canonical({ substituted_boundary: true });
    forged = refinalizeRecord(forged);

    expect(() => determineLearningEligibility(eligibilityFixture(
      forged,
      fixture.evidence,
      fixture.adapted.decision,
    ))).toThrow("task2_contract_invalid:reference_integrity");
  });

  it("preflights nested eligibility shapes before stale snapshot digests", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    (input.learning_policy.payload as typeof input.learning_policy.payload & {
      unexpected?: boolean;
    }).unexpected = true;

    expect(() => determineLearningEligibility(input)).toThrow(
      "task2_contract_invalid:input_shape",
    );
  });

  it("uses interface order when an earlier durable digest and later shape both fail", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      clone(qualification),
      fixture.evidence,
      fixture.adapted.decision,
    );
    input.qualification.payload.outcome = "B";
    (input.learning_policy.payload as typeof input.learning_policy.payload & {
      unexpected?: boolean;
    }).unexpected = true;

    expect(() => determineLearningEligibility(input)).toThrow(
      "task2_contract_invalid:durable_record_digest",
    );
  });

  it("rejects nested accessors and negative zero before replay or digest verification", () => {
    const accessorCase = qualifiedFixture();
    const accessorInput = eligibilityFixture(
      accessorCase.qualification,
      accessorCase.fixture.evidence,
      accessorCase.fixture.adapted.decision,
    );
    let accessorReads = 0;
    Object.defineProperty(accessorInput.qualification_input.review.payload, "outcome", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "A";
      },
    });
    expect(() => determineLearningEligibility(accessorInput)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);

    const negativeZeroCase = qualifiedFixture();
    const negativeZeroInput = eligibilityFixture(
      negativeZeroCase.qualification,
      negativeZeroCase.fixture.evidence,
      negativeZeroCase.fixture.adapted.decision,
    );
    negativeZeroInput.learning_policy.payload.minimum_independent_reviewers.project = -0;
    expect(() => determineLearningEligibility(negativeZeroInput)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
  });

  it("never executes a record_mode accessor before canonical validation", () => {
    const { fixture, qualification } = qualifiedFixture();
    const input = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    let accessorReads = 0;
    Object.defineProperty(input, "record_mode", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "development_fixture";
      },
    });

    expect(() => determineLearningEligibility(input)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);
  });
});
