import { sha256Canonical } from "@contentmd/core";
import {
  AI_ADJUDICATION_CRITERIA,
  AiAdjudicationContractError,
  createAiAdjudicationDecision,
  createAiAdjudicationTask,
  validateAiUxCoordinateClassification,
  validateAiUxCoordinateEvaluation,
  type AiAdjudicationCriterion,
  type AiAdjudicationTask,
  type AiUxCoordinateClassificationOutput,
  type AiUxCoordinateEvaluationOutput,
} from "@contentmd/evaluation";
import { describe, expect, it } from "vitest";

const SOURCE = {
  title: "Payment review",
  observation: "The user reviews an order and submits payment.",
};

function task(): AiAdjudicationTask {
  return createAiAdjudicationTask({
    project_id: "project.test",
    task_id: "task.checkout-review",
    source: {
      source_ref: "source.checkout-review",
      source_digest: sha256Canonical(SOURCE),
      data_class: "public_product_evidence",
      content: SOURCE,
      evidence_refs: ["evidence.checkout-review"],
    },
    source_labels: [{
      label_id: "source-label.t8",
      layer: "source",
      dimension: "taxonomy_section",
      value: "T8-actions",
      evidence_refs: ["evidence.checkout-review"],
    }],
    requested_axes: ["journey", "action_family"],
    locale: "en-US",
    channel: "web",
    surface: "checkout",
    risk: "high",
    governance: {
      model_processing_eligibility: "classification_and_evaluation_with_explicit_run_authorization",
      processing_authorization_ref: "authorization.test.ai-adjudication",
      prompt_reuse_eligibility: "never",
      training_eligibility: "never",
      retention_eligibility: "transient_only",
      authority_effect: "none",
    },
  });
}

function classification(): AiUxCoordinateClassificationOutput {
  return {
    authority_effect: "none",
    decision_state: "model_proposed",
    model_processing_purpose: "classification_only",
    labels: [
      {
        axis: "action_family",
        status: "exact",
        values: ["pay"],
        rationale: "Submitting payment is the primary action.",
        evidence_refs: ["evidence.checkout-review"],
        uncertainty: "none",
      },
      {
        axis: "journey",
        status: "exact",
        values: ["commitment"],
        rationale: "The user is at the commitment point of the journey.",
        evidence_refs: ["evidence.checkout-review"],
        uncertainty: "none",
      },
    ],
    uncertainties: [],
  };
}

function criterion(criterionName: AiAdjudicationCriterion): AiUxCoordinateEvaluationOutput["criteria"][number] {
  return {
    criterion: criterionName,
    status: "pass",
    rationale: `${criterionName} passes.`,
    evidence_refs: criterionName === "requested_axis_coverage" || criterionName === "ontology_conformance"
      ? [] : ["evidence.checkout-review"],
  };
}

function evaluation(): AiUxCoordinateEvaluationOutput {
  return {
    authority_effect: "none",
    model_processing_purpose: "evaluation_only",
    verdict: "pass",
    criteria: AI_ADJUDICATION_CRITERIA.map(criterion),
    corrections: [],
    unresolved: [],
    authority_escalation_reasons: [],
  };
}

describe("AI UX-coordinate adjudication contracts", () => {
  it("canonicalizes existing source labels and accepts an independently evaluated classification", () => {
    const currentTask = task();
    const validatedClassification = validateAiUxCoordinateClassification(currentTask, classification());
    const validatedEvaluation = validateAiUxCoordinateEvaluation(
      currentTask,
      validatedClassification,
      evaluation(),
    );
    const decision = createAiAdjudicationDecision({
      task: currentTask,
      status: "ai_accepted",
      classification: validatedClassification,
      evaluation: validatedEvaluation,
      reason_codes: ["independent_evaluation_passed"],
    });

    expect(currentTask.requested_axes).toEqual(["journey", "action_family"]);
    expect(validatedClassification.labels.map((label) => label.axis)).toEqual([
      "journey", "action_family",
    ]);
    expect(decision).toMatchObject({
      status: "ai_accepted",
      route: "proceed",
      human_exception_required: false,
      authority_effect: "none",
    });
    expect(decision.accepted_labels).toHaveLength(2);
    expect(decision.decision_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("rejects model processing without the explicit classification-only governance boundary", () => {
    const input = task();
    expect(() => createAiAdjudicationTask({
      ...input,
      governance: {
        ...input.governance,
        model_processing_eligibility: "never" as "classification_and_evaluation_with_explicit_run_authorization",
      },
    })).toThrowError(expect.objectContaining<AiAdjudicationContractError>({
      code: "invalid_task",
    }));
  });

  it("fails closed on missing axes, values outside the ontology, and unknown evidence", () => {
    const currentTask = task();
    const missingAxis = classification();
    missingAxis.labels.pop();
    expect(() => validateAiUxCoordinateClassification(currentTask, missingAxis))
      .toThrow("invalid_classification:labels:requested_axis_coverage");

    const unknownValue = classification();
    unknownValue.labels[0]!.values = ["purchase_now"];
    expect(() => validateAiUxCoordinateClassification(currentTask, unknownValue))
      .toThrow("invalid_classification:labels[0].values:ontology");

    const unknownEvidence = classification();
    unknownEvidence.labels[0]!.evidence_refs = ["evidence.not-in-task"];
    expect(() => validateAiUxCoordinateClassification(currentTask, unknownEvidence))
      .toThrow("invalid_classification:labels[0].evidence_refs:unknown");
  });

  it("requires all six evaluator criteria and makes pass incompatible with unclassified output", () => {
    const currentTask = task();
    const validated = validateAiUxCoordinateClassification(currentTask, classification());
    const missingCriterion = evaluation();
    missingCriterion.criteria.pop();
    expect(() => validateAiUxCoordinateEvaluation(currentTask, validated, missingCriterion))
      .toThrow("invalid_evaluation:criteria:coverage");

    const unclassified = classification();
    unclassified.labels[0] = {
      ...unclassified.labels[0]!,
      status: "unclassified",
      values: [],
      evidence_refs: [],
      uncertainty: "material",
    };
    unclassified.uncertainties = ["The source does not establish the primary action."];
    const validatedUnclassified = validateAiUxCoordinateClassification(currentTask, unclassified);
    expect(() => validateAiUxCoordinateEvaluation(currentTask, validatedUnclassified, evaluation()))
      .toThrow("invalid_evaluation:verdict:pass_contract");
  });

  it("routes abstention without default human review and reserves people for genuine exceptions", () => {
    const currentTask = task();
    const validatedClassification = validateAiUxCoordinateClassification(currentTask, classification());
    const abstainOutput = evaluation();
    abstainOutput.verdict = "abstain";
    abstainOutput.criteria = AI_ADJUDICATION_CRITERIA.map((name) => ({
      ...criterion(name),
      status: name === "evidence_relation" ? "unknown" as const : "pass" as const,
    }));
    abstainOutput.unresolved = ["The evidence is insufficient for acceptance."];
    const abstainEvaluation = validateAiUxCoordinateEvaluation(
      currentTask,
      validatedClassification,
      abstainOutput,
    );
    const escalateOutput = evaluation();
    escalateOutput.verdict = "escalate";
    escalateOutput.authority_escalation_reasons = ["External legal authority is required."];
    const escalateEvaluation = validateAiUxCoordinateEvaluation(
      currentTask,
      validatedClassification,
      escalateOutput,
    );
    const abstained = createAiAdjudicationDecision({
      task: currentTask,
      status: "abstained",
      classification: validatedClassification,
      evaluation: abstainEvaluation,
      reason_codes: ["missing_evidence"],
    });
    const escalated = createAiAdjudicationDecision({
      task: currentTask,
      status: "authority_escalation",
      classification: validatedClassification,
      evaluation: escalateEvaluation,
      reason_codes: ["legal_authority_required"],
    });

    expect(abstained).toMatchObject({ route: "abstain", human_exception_required: false });
    expect(escalated).toMatchObject({ route: "human_exception", human_exception_required: true });
  });
});
