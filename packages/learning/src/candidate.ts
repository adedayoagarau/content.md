import { sha256Canonical, type MemoryScope } from "@contentmd/core";

export type CandidateRightsPrivacyDisposition =
  | "permitted_for_candidate"
  | "not_authorized";

export interface LearningCandidateInput {
  hypothesis: string;
  expected_benefit: string;
  supporting_decision_refs: string[];
  contradicting_decision_refs: string[];
  data_scope: MemoryScope;
  project_id: string | null;
  rights_privacy_disposition: CandidateRightsPrivacyDisposition;
  evaluation_plan: string;
  rollback_plan: string;
  learning_data_permission_ref: string | null;
}

export interface LearningCandidateRecord extends LearningCandidateInput {
  schema_version: "contentmd.learning-candidate/0.1.0";
  candidate_id: string;
  lifecycle_state: "proposed";
  promotion_status: "not_requested";
  learned_preference_status: "not_established";
  authority_effect: "none";
}

export class LearningAuthorizationError extends Error {
  readonly code: "learning_data_not_authorized";

  constructor(code: "learning_data_not_authorized") {
    super(code);
    this.name = "LearningAuthorizationError";
    this.code = code;
  }
}

function text(value: string, field: string): string {
  if (value.trim().length === 0) throw new TypeError(`invalid_learning_candidate:${field}`);
  return value;
}

export function createLearningCandidate(
  input: LearningCandidateInput,
): LearningCandidateRecord {
  if (input.learning_data_permission_ref === null || input.rights_privacy_disposition !== "permitted_for_candidate") {
    throw new LearningAuthorizationError("learning_data_not_authorized");
  }
  for (const field of ["hypothesis", "expected_benefit", "evaluation_plan", "rollback_plan"] as const) {
    text(input[field], field);
  }
  text(input.learning_data_permission_ref, "learning_data_permission_ref");
  if (input.data_scope === "project" && (input.project_id === null || input.project_id.trim().length === 0)) {
    throw new TypeError("invalid_learning_candidate:project_id");
  }
  const identity = {
    hypothesis: input.hypothesis.trim(),
    data_scope: input.data_scope,
    project_id: input.project_id,
  };
  return {
    schema_version: "contentmd.learning-candidate/0.1.0",
    candidate_id: `learning_candidate.${sha256Canonical(identity).slice(0, 32)}`,
    hypothesis: input.hypothesis.trim(),
    expected_benefit: input.expected_benefit,
    supporting_decision_refs: [...new Set(input.supporting_decision_refs)].sort(),
    contradicting_decision_refs: [...new Set(input.contradicting_decision_refs)].sort(),
    data_scope: input.data_scope,
    project_id: input.project_id,
    rights_privacy_disposition: input.rights_privacy_disposition,
    evaluation_plan: input.evaluation_plan,
    rollback_plan: input.rollback_plan,
    learning_data_permission_ref: input.learning_data_permission_ref,
    lifecycle_state: "proposed",
    promotion_status: "not_requested",
    learned_preference_status: "not_established",
    authority_effect: "none",
  };
}
