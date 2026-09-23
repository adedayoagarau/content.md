import { describe, expect, it } from "vitest";
import {
  UNIVERSAL_ASSURANCE_CRITERIA,
  createContentDecisionContract,
  evaluateUniversalAssurance,
  requiredAssuranceCriterionIds,
  type ContentDesignStage,
  type UniversalAssuranceAssessment,
  type UniversalAssuranceCriterionId,
} from "@contentmd/evaluation";
import { contentDecisionInput } from "./content-decision-test-fixtures.js";

function passingAssessments(stage: ContentDesignStage = "review"): UniversalAssuranceAssessment[] {
  return requiredAssuranceCriterionIds(stage).map((criterionId) => ({
    criterion_id: criterionId,
    status: "pass",
    rationale: "The synthetic evidence satisfies this criterion.",
    evidence_refs: [`evidence.${criterionId}`],
    failure_disposition: null,
  }));
}

function assessment(
  assessments: UniversalAssuranceAssessment[],
  criterionId: UniversalAssuranceCriterionId,
): UniversalAssuranceAssessment {
  return assessments.find((item) => item.criterion_id === criterionId)!;
}

describe("universal assurance kernel", () => {
  it("proceeds only when every applicable hard and advisory criterion passes", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const result = evaluateUniversalAssurance({
      contract,
      assessments: passingAssessments(),
    });

    expect(result.hard_status).toBe("pass");
    expect(result.advisory_status).toBe("pass");
    expect(result.recommended_transition).toBe("proceed");
    expect(result.criterion_results).toHaveLength(UNIVERSAL_ASSURANCE_CRITERIA.length);
    expect(result.evaluation_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(result).not.toHaveProperty("score");
    expect(result).not.toHaveProperty("universal_score");
    expect(Object.isFrozen(result.criterion_results)).toBe(true);
  });

  it("does not let advisory passes compensate for a hard failure", () => {
    const assessments = passingAssessments();
    Object.assign(assessment(assessments, "cdk.product_state_truth"), {
      status: "fail",
      rationale: "The proposed message claims a known result for an unknown product state.",
      evidence_refs: ["evidence.state-mismatch.synthetic"],
      failure_disposition: "revise",
    });

    const result = evaluateUniversalAssurance({
      contract: createContentDecisionContract(contentDecisionInput()),
      assessments,
    });

    expect(result.hard_status).toBe("fail");
    expect(result.advisory_status).toBe("not_evaluated");
    expect(result.recommended_transition).toBe("revise");
    expect(result.transition_criterion_ids).toEqual(["cdk.product_state_truth"]);
  });

  it("abstains for missing ordinary evidence and escalates missing specialist evidence", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const missingTruth = passingAssessments().filter(
      (item) => item.criterion_id !== "cdk.product_state_truth",
    );
    const abstained = evaluateUniversalAssurance({ contract, assessments: missingTruth });
    expect(abstained.hard_status).toBe("unknown");
    expect(abstained.recommended_transition).toBe("abstain");
    expect(abstained.criterion_results.find(
      (item) => item.criterion_id === "cdk.product_state_truth",
    )?.status).toBe("not_observed");

    const missingSpecialist = passingAssessments().filter(
      (item) => item.criterion_id !== "cdk.accessibility_inclusion",
    );
    const escalated = evaluateUniversalAssurance({ contract, assessments: missingSpecialist });
    expect(escalated.hard_status).toBe("unknown");
    expect(escalated.recommended_transition).toBe("escalate");
    expect(escalated.transition_criterion_ids).toEqual(["cdk.accessibility_inclusion"]);
  });

  it("routes advisory failures to revision and unresolved advisory claims to testing", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const failed = passingAssessments();
    Object.assign(assessment(failed, "cdk.voice_tone_terminology"), {
      status: "fail",
      rationale: "Expression does not match the eligible profile.",
      evidence_refs: ["evidence.voice-profile.synthetic"],
      failure_disposition: "revise",
    });
    const revised = evaluateUniversalAssurance({ contract, assessments: failed });
    expect(revised.hard_status).toBe("pass");
    expect(revised.advisory_status).toBe("findings_present");
    expect(revised.recommended_transition).toBe("revise");

    const unresolved = passingAssessments();
    Object.assign(assessment(unresolved, "cdk.voice_tone_terminology"), {
      status: "unknown",
      rationale: "No approved voice profile is currently eligible for this scope.",
      evidence_refs: [],
      failure_disposition: null,
    });
    const tested = evaluateUniversalAssurance({ contract, assessments: unresolved });
    expect(tested.hard_status).toBe("pass");
    expect(tested.advisory_status).toBe("findings_present");
    expect(tested.recommended_transition).toBe("test");
  });

  it("supports an explicit hard rejection and remains deterministic across assessment order", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const rejectedAssessments = passingAssessments();
    Object.assign(assessment(rejectedAssessments, "cdk.agency_ethics"), {
      status: "fail",
      rationale: "The interaction withholds a material consequence from the user.",
      evidence_refs: ["evidence.material-omission.synthetic"],
      failure_disposition: "reject",
    });
    const forward = evaluateUniversalAssurance({ contract, assessments: rejectedAssessments });
    const reverse = evaluateUniversalAssurance({
      contract,
      assessments: [...rejectedAssessments].reverse(),
    });

    expect(forward.recommended_transition).toBe("reject");
    expect(reverse).toEqual(forward);
  });

  it("rejects a contract that omits a stage-required assurance criterion", () => {
    const input = contentDecisionInput();
    input.assurance_plan.core_criterion_ids = input.assurance_plan.core_criterion_ids.filter(
      (id) => id !== "cdk.semantic_sufficiency",
    );
    const contract = createContentDecisionContract(input);

    expect(() => evaluateUniversalAssurance({ contract, assessments: [] }))
      .toThrow("universal_assurance_invalid:contract.assurance_plan.incomplete");
  });
});
