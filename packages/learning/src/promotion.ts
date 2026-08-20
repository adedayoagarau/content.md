import type { MemoryScope } from "@contentmd/core";
import type { LearningCandidateRecord } from "./candidate.js";

export interface LearningPolicy {
  permission_current: boolean;
  allowed_data_scopes: MemoryScope[];
  target_scope: MemoryScope;
  minimum_supporting_decisions: number;
  requires_human_review: true;
}

export type PromotionReadiness =
  | { disposition: "not_authorized"; reason: "learning_data_not_authorized" | "scope_widening_not_authorized" }
  | { disposition: "not_ready"; reason: "insufficient_supporting_decisions" | "contradicting_evidence_requires_evaluation" }
  | { disposition: "review_required"; reason: "promotion_requires_separate_human_decision" };

const scopeRank: Record<MemoryScope, number> = {
  task: 0,
  personal: 1,
  project: 2,
  organization: 3,
  public: 4,
};

export function evaluatePromotionReadiness(
  candidate: LearningCandidateRecord,
  policy: LearningPolicy,
): PromotionReadiness {
  if (
    !policy.permission_current ||
    !policy.allowed_data_scopes.includes(candidate.data_scope) ||
    candidate.learning_data_permission_ref === null
  ) {
    return { disposition: "not_authorized", reason: "learning_data_not_authorized" };
  }
  if (scopeRank[policy.target_scope] > scopeRank[candidate.data_scope]) {
    return { disposition: "not_authorized", reason: "scope_widening_not_authorized" };
  }
  if (candidate.supporting_decision_refs.length < policy.minimum_supporting_decisions) {
    return { disposition: "not_ready", reason: "insufficient_supporting_decisions" };
  }
  if (candidate.contradicting_decision_refs.length > 0) {
    return { disposition: "not_ready", reason: "contradicting_evidence_requires_evaluation" };
  }
  return { disposition: "review_required", reason: "promotion_requires_separate_human_decision" };
}
