import { describe, expect, it } from "vitest";
import {
  LearningAuthorizationError,
  createLearningCandidate,
  evaluatePromotionReadiness,
} from "@contentmd/learning";

const base = {
  hypothesis: "For unknown payment outcomes, status verification should precede any retry instruction.",
  expected_benefit: "Reduce unsafe duplicate-payment guidance.",
  supporting_decision_refs: ["decision.accepted.1"],
  contradicting_decision_refs: [],
  data_scope: "project" as const,
  project_id: "project.beacon",
  rights_privacy_disposition: "permitted_for_candidate" as const,
  evaluation_plan: "Evaluate against a sealed set of pre- and post-submission recovery states.",
  rollback_plan: "Retire the candidate and rebuild projections without using it for retrieval.",
  learning_data_permission_ref: "permission.learning.project-beacon",
};

describe("learning candidates", () => {
  it("deduplicates candidate identity by hypothesis and scope", () => {
    const first = createLearningCandidate(base);
    const second = createLearningCandidate({
      ...base,
      supporting_decision_refs: ["decision.accepted.1", "decision.accepted.2"],
    });

    expect(first.candidate_id).toBe(second.candidate_id);
    expect(first.lifecycle_state).toBe("proposed");
    expect(first.promotion_status).toBe("not_requested");
    expect(first.learned_preference_status).toBe("not_established");
    expect(first.authority_effect).toBe("none");
  });

  it("does not treat one decision as a learned preference", () => {
    const candidate = createLearningCandidate(base);
    const readiness = evaluatePromotionReadiness(candidate, {
      permission_current: true,
      allowed_data_scopes: ["project"],
      target_scope: "project",
      minimum_supporting_decisions: 3,
      requires_human_review: true,
    });

    expect(readiness).toEqual({ disposition: "not_ready", reason: "insufficient_supporting_decisions" });
  });

  it("rejects missing permission and project-to-organization scope widening", () => {
    expect(() => createLearningCandidate({ ...base, learning_data_permission_ref: null })).toThrow(
      new LearningAuthorizationError("learning_data_not_authorized"),
    );
    const candidate = createLearningCandidate({
      ...base,
      supporting_decision_refs: ["decision.1", "decision.2", "decision.3"],
    });

    expect(evaluatePromotionReadiness(candidate, {
      permission_current: true,
      allowed_data_scopes: ["project", "organization"],
      target_scope: "organization",
      minimum_supporting_decisions: 3,
      requires_human_review: true,
    })).toEqual({ disposition: "not_authorized", reason: "scope_widening_not_authorized" });
    expect(evaluatePromotionReadiness(candidate, {
      permission_current: false,
      allowed_data_scopes: ["project"],
      target_scope: "project",
      minimum_supporting_decisions: 3,
      requires_human_review: true,
    })).toEqual({ disposition: "not_authorized", reason: "learning_data_not_authorized" });
  });

  it("requires review even after the evidence threshold is met", () => {
    const candidate = createLearningCandidate({
      ...base,
      supporting_decision_refs: ["decision.1", "decision.2", "decision.3"],
    });

    expect(evaluatePromotionReadiness(candidate, {
      permission_current: true,
      allowed_data_scopes: ["project"],
      target_scope: "project",
      minimum_supporting_decisions: 3,
      requires_human_review: true,
    })).toEqual({ disposition: "review_required", reason: "promotion_requires_separate_human_decision" });
  });
});
