import { describe, expect, it } from "vitest";
import {
  CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
  combineContentAssuranceEvaluations,
  contextualAssuranceOverlayRef,
  createContentDecisionContract,
  evaluateContextualAssurance,
  evaluateUniversalAssurance,
  requiredAssuranceCriterionIds,
  resolveContextualAssuranceOverlays,
  verifyContextualAssuranceOverlayResolution,
  type ContentDecisionClassificationDimension,
  type ContentDecisionContractInput,
  type ContextualAssuranceAssessment,
  type ContextualAssuranceOverlayResolution,
  type UniversalAssuranceAssessment,
} from "@contentmd/evaluation";
import { contentDecisionInput } from "./content-decision-test-fixtures.js";

function establishClassification(
  input: ContentDecisionContractInput,
  dimension: ContentDecisionClassificationDimension,
  label: string,
): void {
  const classification = input.classifications.find((item) => item.dimension === dimension)!;
  Object.assign(classification, {
    status: "established",
    label,
    candidate_labels: [],
    evidence_refs: [`evidence.classification.${dimension}`],
    rationale: `Human review established the ${dimension} classification.`,
    method: "human",
    method_ref: `decision.classification.${dimension}`,
  });
}

function overlayRef(overlayId: string): string {
  const overlay = CORE_CONTEXTUAL_ASSURANCE_OVERLAYS.find(
    (candidate) => candidate.overlay_id === overlayId,
  );
  if (overlay === undefined) throw new Error(`missing test overlay: ${overlayId}`);
  return contextualAssuranceOverlayRef(overlay);
}

function commitmentInput(): ContentDecisionContractInput {
  const input = contentDecisionInput();
  establishClassification(input, "experience", "commitment");
  establishClassification(input, "content_object", "dynamic_status");
  establishClassification(input, "governance", "approval_required");
  input.assurance_plan.overlay_refs = [
    overlayRef("contentmd.overlay.interaction.commitment"),
    overlayRef("contentmd.overlay.accessibility.dynamic-status"),
    overlayRef("contentmd.overlay.governance.approval-required"),
  ];
  return input;
}

function productRiskChannelInput(): ContentDecisionContractInput {
  const input = contentDecisionInput();
  input.subject.channel = "email";
  Object.assign(input.semantic_contract.action_contracts[0], {
    reversibility: "irreversible",
    outcome_evidence: "partial",
  });
  establishClassification(input, "experience", "informational");
  establishClassification(input, "content_object", "static_text");
  establishClassification(input, "governance", "standard_review");
  input.assurance_plan.overlay_refs = [
    overlayRef("contentmd.overlay.product.unconfirmed-outcome"),
    overlayRef("contentmd.overlay.risk.irreversible-action"),
    overlayRef("contentmd.overlay.channel.out-of-app"),
  ];
  return input;
}

function passingContextualAssessments(
  resolution: ContextualAssuranceOverlayResolution,
): ContextualAssuranceAssessment[] {
  const selected = new Set(resolution.selected_overlay_refs);
  return CORE_CONTEXTUAL_ASSURANCE_OVERLAYS
    .filter((overlay) => selected.has(contextualAssuranceOverlayRef(overlay)))
    .flatMap((overlay) => overlay.criteria)
    .map((criterion) => ({
      criterion_id: criterion.criterion_id,
      status: "pass",
      rationale: "The synthetic evidence satisfies this contextual criterion.",
      evidence_refs: [`evidence.${criterion.criterion_id}`],
      failure_disposition: null,
    }));
}

function passingUniversalAssessments(): UniversalAssuranceAssessment[] {
  return requiredAssuranceCriterionIds("review").map((criterionId) => ({
    criterion_id: criterionId,
    status: "pass",
    rationale: "The synthetic evidence satisfies this universal criterion.",
    evidence_refs: [`evidence.${criterionId}`],
    failure_disposition: null,
  }));
}

describe("contextual assurance overlays", () => {
  it("preserves unresolved routing dimensions instead of inventing overlays", () => {
    const contract = createContentDecisionContract(contentDecisionInput());
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });

    expect(resolution.plan_status).toBe("blocked");
    expect(resolution.selected_overlay_refs).toEqual([]);
    expect(resolution.unresolved_dimensions).toEqual([
      "content_object",
      "experience",
      "governance",
    ]);
    expect(resolution.unresolved_overlay_refs).toEqual([
      overlayRef("contentmd.overlay.accessibility.dynamic-status"),
      overlayRef("contentmd.overlay.governance.approval-required"),
      overlayRef("contentmd.overlay.interaction.commitment"),
    ]);
    expect(resolution.authority_effect).toBe("none");
  });

  it("routes interaction, accessibility, and governance overlays from explicit classifications", () => {
    const contract = createContentDecisionContract(commitmentInput());
    const forward = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });
    const reverse = resolveContextualAssuranceOverlays({
      contract,
      registry: [...CORE_CONTEXTUAL_ASSURANCE_OVERLAYS].reverse(),
    });

    expect(forward.plan_status).toBe("complete");
    expect(forward.required_overlay_refs).toEqual([]);
    expect(forward.provisional_overlay_refs).toEqual(forward.selected_overlay_refs);
    expect(forward.selected_overlay_refs).toEqual([
      overlayRef("contentmd.overlay.accessibility.dynamic-status"),
      overlayRef("contentmd.overlay.governance.approval-required"),
      overlayRef("contentmd.overlay.interaction.commitment"),
    ]);
    expect(reverse).toEqual(forward);
    expect(Object.isFrozen(forward.overlay_results)).toBe(true);
    expect(verifyContextualAssuranceOverlayResolution({
      resolution: forward,
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    })).toBe(true);
  });

  it("routes product, risk, and channel overlays from structure rather than style", () => {
    const contract = createContentDecisionContract(productRiskChannelInput());
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });

    expect(resolution.plan_status).toBe("complete");
    expect(resolution.selected_overlay_refs).toEqual([
      overlayRef("contentmd.overlay.channel.out-of-app"),
      overlayRef("contentmd.overlay.product.unconfirmed-outcome"),
      overlayRef("contentmd.overlay.risk.irreversible-action"),
    ]);
    expect(resolution.overlay_results.filter((result) => result.status === "selected")
      .map((result) => result.category)).toEqual(["channel", "product", "risk"]);
  });

  it("marks the assurance plan incomplete when a selected overlay is absent", () => {
    const input = commitmentInput();
    const missing = overlayRef("contentmd.overlay.governance.approval-required");
    input.assurance_plan.overlay_refs = input.assurance_plan.overlay_refs.filter(
      (candidate) => candidate !== missing,
    );
    const contract = createContentDecisionContract(input);
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });

    expect(resolution.plan_status).toBe("incomplete");
    expect(resolution.missing_overlay_refs).toEqual([missing]);
    const evaluation = evaluateContextualAssurance({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
      resolution,
      assessments: passingContextualAssessments(resolution),
    });
    expect(evaluation.hard_status).toBe("unknown");
    expect(evaluation.recommended_transition).toBe("abstain");
    expect(evaluation.transition_overlay_refs).toEqual([missing]);
  });

  it("proceeds only after selected criteria pass and escalates missing specialist evidence", () => {
    const contract = createContentDecisionContract(commitmentInput());
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });
    const assessments = passingContextualAssessments(resolution);
    const passed = evaluateContextualAssurance({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
      resolution,
      assessments,
    });

    expect(passed.hard_status).toBe("pass");
    expect(passed.advisory_status).toBe("pass");
    expect(passed.recommended_transition).toBe("proceed");
    expect(passed).not.toHaveProperty("score");

    const specialistCriterion = passed.criterion_results.find(
      (result) => result.review_type === "specialist",
    )!;
    const escalated = evaluateContextualAssurance({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
      resolution,
      assessments: assessments.filter(
        (item) => item.criterion_id !== specialistCriterion.criterion_id,
      ),
    });
    expect(escalated.hard_status).toBe("unknown");
    expect(escalated.recommended_transition).toBe("escalate");
    expect(escalated.transition_criterion_ids).toEqual([specialistCriterion.criterion_id]);
  });

  it("keeps contextual hard failures non-compensable in the combined decision", () => {
    const contract = createContentDecisionContract(commitmentInput());
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });
    const assessments = passingContextualAssessments(resolution);
    Object.assign(assessments.find(
      (item) => item.criterion_id.endsWith("action-label-contract"),
    )!, {
      status: "fail",
      rationale: "The label hides the commitment.",
      evidence_refs: ["evidence.misleading-label.synthetic"],
      failure_disposition: "revise",
    });
    const contextual = evaluateContextualAssurance({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
      resolution,
      assessments,
    });
    const universal = evaluateUniversalAssurance({
      contract,
      assessments: passingUniversalAssessments(),
    });
    const combined = combineContentAssuranceEvaluations({ universal, contextual });

    expect(universal.recommended_transition).toBe("proceed");
    expect(contextual.recommended_transition).toBe("revise");
    expect(combined.hard_status).toBe("fail");
    expect(combined.recommended_transition).toBe("revise");
    expect(combined.transition_sources).toEqual(["contextual"]);
    expect(combined).not.toHaveProperty("score");
  });

  it("rejects a tampered resolution during deterministic replay", () => {
    const contract = createContentDecisionContract(commitmentInput());
    const resolution = resolveContextualAssuranceOverlays({
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    });
    const tampered = structuredClone(resolution);
    tampered.plan_status = "blocked";

    expect(verifyContextualAssuranceOverlayResolution({
      resolution: tampered,
      contract,
      registry: CORE_CONTEXTUAL_ASSURANCE_OVERLAYS,
    })).toBe(false);
  });
});
