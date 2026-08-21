import { sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import {
  adaptContentDecisionEvent,
  createPreferenceExample,
  determineLearningEligibility,
  qualifyFeedback,
  task2SortProvenance,
} from "@contentmd/learning";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { describe, expect, it } from "vitest";
import {
  bareRef,
  clone,
  eligibilityFixture,
  preferenceFixture,
  qualificationFixture,
  refinalizeRecord,
  snapshotRef,
} from "./task2-fixtures.js";

function admittedInput(outcome: "A" | "B" = "A") {
  const fixture = qualificationFixture(adaptContentDecisionEvent, {
    outcome,
    presentedOrder: ["B", "A"],
  });
  const qualification = qualifyFeedback(fixture.input);
  const eligibilityInput = eligibilityFixture(
    qualification,
    fixture.evidence,
    fixture.adapted.decision,
  );
  const eligibility = determineLearningEligibility(eligibilityInput);
  return {
    input: preferenceFixture(
      qualification,
      eligibility,
      eligibilityInput,
      fixture.adapted.decision,
      fixture.evidence,
    ),
    fixture,
    qualification,
    eligibility,
  };
}

describe("preference example admission", () => {
  it.each([
    ["A", 1],
    ["B", 0],
  ] as const)("preserves canonical identity and maps %s to label %i", (outcome, label) => {
    const { input } = admittedInput(outcome);
    const record = createPreferenceExample(input);
    const expectedPresentationDigest = sha256Canonical({
      contract_version: "contentmd.preference-presentation/0.1.0",
      presentation_ref: snapshotRef(input.presentation),
      task_ref: record.payload.task_ref,
      context_ref: record.payload.context_ref,
      candidate_a_ref: record.payload.candidate_a_ref,
      candidate_b_ref: record.payload.candidate_b_ref,
      canonical_order: ["A", "B"],
      presented_order: ["B", "A"],
      blinded: true,
      randomized: true,
    });

    expect(record.payload).toEqual(expect.objectContaining({
      preferred_side: outcome,
      label,
      presented_order: ["B", "A"],
      preference_state: "admitted",
      authority_effect: "none",
    }));
    expect(record.payload.candidate_a_ref.record_id).toBe("snapshot.candidate-a.task2");
    expect(record.payload.candidate_b_ref.record_id).toBe("snapshot.candidate-b.task2");
    expect(record.payload.presentation_digest).toBe(expectedPresentationDigest);
    expect(record.record_id).toBe(`preference-example.${record.payload.input_digest}`);
    expect(verifyRecordDigest(record)).toEqual({ valid: true });
    expect(validateRecord(SCHEMA_IDS.preferenceExample, record)).toEqual({
      valid: true,
      errors: [],
    });
  });

  it("allows preference evaluation after the replayed eligibility time", () => {
    const { input } = admittedInput();
    input.evaluation_at = "2026-08-20T19:00:00.000Z";

    expect(createPreferenceExample(input).payload.preference_state).toBe("admitted");
  });

  it("rejects a nonqualified pair before considering later failures", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent, { outcome: "tie" });
    const qualification = qualifyFeedback(fixture.input);
    const eligibilityInput = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
    );
    const eligibility = determineLearningEligibility(eligibilityInput);
    const input = preferenceFixture(
      qualification,
      eligibility,
      eligibilityInput,
      fixture.adapted.decision,
      fixture.evidence,
    );
    input.feature_source_checkpoint_set_ref = {
      ...bareRef("checkpoint.invalid"),
      content_digest: "bad",
    };
    expect(() => createPreferenceExample(input)).toThrow(
      "learning_example_not_eligible:qualification_state",
    );
  });

  it("rejects an ineligible qualified pair", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const qualification = qualifyFeedback(fixture.input);
    const eligibilityInput = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
      { permission: "missing" },
    );
    const eligibility = determineLearningEligibility(eligibilityInput);
    expect(() => createPreferenceExample(
      preferenceFixture(
        qualification,
        eligibility,
        eligibilityInput,
        fixture.adapted.decision,
        fixture.evidence,
      ),
    )).toThrow("learning_example_not_eligible:eligibility_state");
  });

  it("rejects a re-finalized eligible record with no permission reference", () => {
    const fixture = qualificationFixture(adaptContentDecisionEvent);
    const qualification = qualifyFeedback(fixture.input);
    const eligibilityInput = eligibilityFixture(
      qualification,
      fixture.evidence,
      fixture.adapted.decision,
      { permission: "missing" },
    );
    let eligibility = determineLearningEligibility(eligibilityInput);
    eligibility.payload.eligibility_state = "eligible";
    eligibility.payload.reason_codes = ["all_eligibility_checks_passed"];
    eligibility = refinalizeRecord(eligibility);

    expect(() => createPreferenceExample(preferenceFixture(
      qualification,
      eligibility,
      eligibilityInput,
      fixture.adapted.decision,
      fixture.evidence,
    ))).toThrow("task2_contract_invalid:reference_integrity");
  });

  it.each([
    ["retired", (record: ReturnType<typeof determineLearningEligibility>) => {
      record.lifecycle_state = "retired";
    }],
    ["record version 2", (record: ReturnType<typeof determineLearningEligibility>) => {
      record.record_version = 2;
    }],
    ["official upstream mode", (record: ReturnType<typeof determineLearningEligibility>) => {
      record.payload.record_mode = "official";
    }],
    ["stripped provenance", (record: ReturnType<typeof determineLearningEligibility>) => {
      record.provenance = [];
    }],
  ] as const)("rejects a re-finalized %s eligibility record", (_case, mutate) => {
    const admitted = admittedInput();
    let tampered = clone(admitted.eligibility);
    mutate(tampered);
    tampered = refinalizeRecord(tampered);
    admitted.input.eligibility = tampered;

    expect(() => createPreferenceExample(admitted.input)).toThrow(
      "task2_contract_invalid:reference_integrity",
    );
  });

  it("rejects widening a re-finalized eligible project record to public without permission", () => {
    const admitted = admittedInput();
    let forged = clone(admitted.eligibility);
    forged.scope.memory_scope = "public";
    forged.payload.target_memory_scope = "public";
    forged = refinalizeRecord(forged);
    admitted.input.eligibility = forged;

    expect(() => createPreferenceExample(admitted.input)).toThrow(
      "task2_contract_invalid:reference_integrity",
    );
  });

  it("rejects a substituted permission ref and provenance on a re-finalized eligibility", () => {
    const admitted = admittedInput();
    let forged = clone(admitted.eligibility);
    const substitutedPermission = {
      ...bareRef("substituted.permission"),
      schema_id: "contentmd.task2-learning-permission-snapshot",
    };
    forged.payload.permission_ref = substitutedPermission;
    const permissionProvenance = forged.provenance.find((entry) =>
      entry.relationship === "learning_permission");
    permissionProvenance!.record_id = substitutedPermission.record_id;
    permissionProvenance!.content_digest = substitutedPermission.content_digest;
    forged.provenance = task2SortProvenance(forged.provenance);
    forged = refinalizeRecord(forged);
    admitted.input.eligibility = forged;

    expect(() => createPreferenceExample(admitted.input)).toThrow(
      "task2_contract_invalid:reference_integrity",
    );
  });

  it("preflights nested eligibility-input shapes and accessors before upstream digests", () => {
    const shapeCase = admittedInput();
    (shapeCase.input.eligibility_input.permission!.payload as
      typeof shapeCase.input.eligibility_input.permission.payload & { unexpected?: boolean }
    ).unexpected = true;
    expect(() => createPreferenceExample(shapeCase.input)).toThrow(
      "task2_contract_invalid:input_shape",
    );

    const accessorCase = admittedInput();
    let accessorReads = 0;
    Object.defineProperty(accessorCase.input.eligibility_input.permission!.payload, "status", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "issued";
      },
    });
    expect(() => createPreferenceExample(accessorCase.input)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);
  });

  it("uses interface order when an earlier durable digest and later shape both fail", () => {
    const admitted = admittedInput();
    admitted.input.qualification.payload.outcome = "B";
    (admitted.input.eligibility_input.permission!.payload as
      typeof admitted.input.eligibility_input.permission.payload & { unexpected?: boolean }
    ).unexpected = true;

    expect(() => createPreferenceExample(admitted.input)).toThrow(
      "task2_contract_invalid:durable_record_digest",
    );
  });

  it("rejects cross-record ref drift and malformed checkpoint refs without a partial record", () => {
    const crossRef = admittedInput();
    const wrongQualification = {
      ...bareRef("wrong.qualification"),
      schema_id: "contentmd.feedback-qualification-record",
    };
    crossRef.input.eligibility.payload.qualification_ref = wrongQualification;
    const qualificationProvenance = crossRef.input.eligibility.provenance.find((entry) =>
      entry.relationship === "qualification");
    qualificationProvenance!.record_id = wrongQualification.record_id;
    qualificationProvenance!.content_digest = wrongQualification.content_digest;
    crossRef.input.eligibility.provenance = task2SortProvenance(
      crossRef.input.eligibility.provenance,
    );
    crossRef.input.eligibility = refinalizeRecord(crossRef.input.eligibility);
    expect(() => createPreferenceExample(crossRef.input)).toThrow(
      "task2_contract_invalid:reference_integrity",
    );

    const checkpoint = admittedInput();
    checkpoint.input.feature_source_checkpoint_set_ref.content_digest = "not-a-digest";
    expect(() => createPreferenceExample(checkpoint.input)).toThrow(
      "learning_example_not_eligible:checkpoint_ref_malformed",
    );
  });

  it("rejects official mode and cryptographic tampering", () => {
    const official = admittedInput();
    (official.input as { record_mode: string }).record_mode = "official";
    (official.input.eligibility_input as { record_mode: string }).record_mode = "official";
    (official.input.eligibility_input.qualification_input as { record_mode: string }).record_mode = "official";
    expect(() => createPreferenceExample(official.input)).toThrow(
      "task2_contract_invalid:official_mode_not_supported",
    );

    const tampered = admittedInput();
    tampered.input.presentation.payload.presented_order = ["A", "B"];
    expect(() => createPreferenceExample(tampered.input)).toThrow(
      "task2_contract_invalid:snapshot_digest",
    );
  });

  it("detects post-finalization mutation", () => {
    const record = createPreferenceExample(admittedInput().input);
    const mutated = clone(record);
    mutated.payload.label = mutated.payload.label === 1 ? 0 : 1;
    expect(verifyRecordDigest(mutated)).toEqual({
      valid: false,
      reason: "content_digest_mismatch",
    });
  });

  it("never executes a record_mode accessor before canonical validation", () => {
    const { input } = admittedInput();
    let accessorReads = 0;
    Object.defineProperty(input, "record_mode", {
      enumerable: true,
      get() {
        accessorReads += 1;
        return "development_fixture";
      },
    });

    expect(() => createPreferenceExample(input)).toThrow(
      "task2_contract_invalid:canonical_value",
    );
    expect(accessorReads).toBe(0);
  });
});
