import {
  createUnresolvedContentDecisionClassifications,
  requiredAssuranceCriterionIds,
  type ContentDecisionContractInput,
  type ContentDesignStage,
} from "@contentmd/evaluation";

export function contentDecisionInput(
  stage: ContentDesignStage = "review",
): ContentDecisionContractInput {
  return {
    stage,
    subject: {
      product_ref: "product.synthetic.checkout",
      surface: "payment review",
      channel: "web",
      locale: "en-US",
    },
    classifications: createUnresolvedContentDecisionClassifications({
      method: "deterministic",
      method_ref: "classifier.synthetic/0.1.0",
      rationale: "The fixture intentionally leaves this dimension unresolved.",
    }),
    needs: {
      user: {
        status: "established",
        statement: "Understand whether the payment completed and what to do next.",
        evidence_refs: ["evidence.user-study.synthetic"],
        rationale: "Task evidence establishes a need for outcome clarity.",
        method: "human",
        method_ref: "decision.user-need.synthetic",
      },
      product: {
        status: "established",
        statement: "Prevent an unsafe duplicate payment attempt.",
        evidence_refs: ["evidence.product-state.synthetic"],
        rationale: "The product cannot confirm the final processor outcome yet.",
        method: "human",
        method_ref: "decision.product-need.synthetic",
      },
      content: {
        status: "proposed",
        statement: "Explain the unknown outcome and give a safe next step.",
        evidence_refs: ["evidence.pattern.synthetic"],
        rationale: "Content can expose the state while the system verifies the outcome.",
        method: "hybrid",
        method_ref: "decision.content-need.synthetic",
      },
    },
    intervention: {
      status: "decided",
      type: "create_or_revise_content",
      rationale: "The state needs an explicit explanation and recovery instruction.",
      evidence_refs: ["decision.intervention.synthetic"],
      method: "human",
      method_ref: "review.intervention.synthetic",
    },
    semantic_contract: {
      intended_outcome: "The user understands that the result is unknown and avoids paying again.",
      required_facts: [
        {
          fact_id: "fact.outcome",
          requirement: "State whether payment completion is known.",
          value: "The payment outcome is not yet confirmed.",
          status: "established",
          evidence_refs: ["evidence.product-state.synthetic"],
        },
        {
          fact_id: "fact.next-check",
          requirement: "State where the user can verify the final outcome.",
          value: "The user can check Activity before trying again.",
          status: "established",
          evidence_refs: ["evidence.recovery.synthetic"],
        },
      ],
      semantic_invariants: [
        {
          invariant_id: "invariant.no-success-claim",
          statement: "Do not imply that payment succeeded or failed.",
          evidence_refs: ["evidence.product-state.synthetic"],
        },
        {
          invariant_id: "invariant.no-immediate-retry",
          statement: "Do not instruct the user to pay again before checking Activity.",
          evidence_refs: ["evidence.recovery.synthetic"],
        },
      ],
      prohibited_claims: ["Your payment failed", "Your payment is complete"],
      action_contracts: [
        {
          action_id: "action.check-activity",
          actor: "user",
          object: "payment status in Activity",
          consequence: "The user can determine whether another payment attempt is safe.",
          reversibility: "not_applicable",
          outcome_evidence: "confirmed",
          recovery: null,
        },
      ],
      information_requirements: [
        "State that the outcome is not confirmed.",
        "Tell the user to check Activity before trying again.",
      ],
    },
    expression_policy: {
      voice: { status: "missing", profile_ref: null },
      tone_policy_refs: [],
      terminology_refs: ["terminology.payment.synthetic"],
      accessibility_requirements: ["Do not rely on color alone to communicate status."],
      channel_constraints: ["Primary message must fit the web status component."],
    },
    assurance_plan: {
      core_criterion_ids: requiredAssuranceCriterionIds(stage),
      overlay_refs: [],
      acceptance_criteria: [
        "No success or failure claim is made while the outcome is unknown.",
        "A safe verification step is present.",
      ],
      specialist_review_requirements: ["Accessibility review before implementation."],
    },
    unresolved_questions: ["How long can processor confirmation take?"],
    supersedes_contract_digest: null,
  };
}
