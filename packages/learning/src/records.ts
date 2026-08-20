import type { DurableRecord, ProvenanceRef } from "@contentmd/core";

export const LEARNING_SCHEMA_IDS = {
  generationRun: "contentmd.generation-run-record",
  feedbackQualification: "contentmd.feedback-qualification-record",
  learningEligibility: "contentmd.learning-eligibility-record",
  preferenceExample: "contentmd.preference-example-record",
  exemplar: "contentmd.exemplar-record",
  leakageGroup: "contentmd.leakage-group-record",
  learningDatasetManifest: "contentmd.learning-dataset-manifest",
  featureProfile: "contentmd.feature-profile",
  rankingModel: "contentmd.ranking-model-record",
  learningEvaluationRun: "contentmd.learning-evaluation-run",
  shadowEvaluationPlan: "contentmd.shadow-evaluation-plan",
  shadowBinding: "contentmd.shadow-binding-record",
  learningPromotionDecision: "contentmd.learning-promotion-decision",
  learningDeploymentBinding: "contentmd.learning-deployment-binding",
  learningDriftReport: "contentmd.learning-drift-report",
  learningRollback: "contentmd.learning-rollback-record",
  writingBenchmarkManifest: "contentmd.writing-benchmark-manifest",
  writingBenchmarkTask: "contentmd.writing-benchmark-task-record",
  benchmarkCandidateSet: "contentmd.benchmark-candidate-set-record",
  benchmarkSelection: "contentmd.benchmark-selection-record",
  benchmarkReview: "contentmd.benchmark-review-record",
  benchmarkAttempt: "contentmd.benchmark-attempt-record",
  writingBenchmarkRun: "contentmd.writing-benchmark-run",
} as const;

export type LearningSchemaId =
  (typeof LEARNING_SCHEMA_IDS)[keyof typeof LEARNING_SCHEMA_IDS];
export type Digest = string;
export type RecordMode = "development_fixture" | "official";
export type LearningAuthorityEffect =
  | "none"
  | "shadow_observation_only"
  | "promotion_decision_only"
  | "deployment_binding"
  | "rollback_binding"
  | "benchmark_attempt_control"
  | "benchmark_attempt_consumption";

export interface LearningPayloadBase {
  contract_version: "contentmd.learning-record-contract/0.1.0";
  record_mode: RecordMode;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  schema_digest: Digest;
  code_digest: Digest;
  input_digest: Digest;
  authority_effect: LearningAuthorityEffect;
}

export interface DigestRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: Digest;
}

export interface ArtifactRef {
  artifact_id: string;
  artifact_version: string;
  artifact_digest: Digest;
}

export type NonEmptyArray<T> = [T, ...T[]];
export type ExactlyFour<T> = [T, T, T, T];
export type ExactlySixty<T> = [
  T, T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T, T,
  T, T, T, T, T, T, T, T, T, T,
];

type NoAuthorityPayload = LearningPayloadBase & { authority_effect: "none" };
type PayloadWithoutAuthority = Omit<LearningPayloadBase, "record_mode" | "authority_effect">;

export type GenerationRunState =
  | "completed"
  | "refused"
  | "incomplete"
  | "invalid"
  | "transport_failed";

export type GenerationRunPayload = NoAuthorityPayload & {
  task_ref: DigestRef;
  context_ref: DigestRef;
  retrieval_snapshot_ref: DigestRef | null;
  prompt_ref: ArtifactRef;
  provider_request_ref: DigestRef;
  provider_response_ref: DigestRef;
  output_ref: DigestRef | null;
  critique_refs: DigestRef[];
  proposal_ref: DigestRef | null;
  run_state: GenerationRunState;
};

export type FeedbackQualificationPayload = NoAuthorityPayload & {
  decision_ref: DigestRef;
  rubric_ref: ArtifactRef;
  reviewer_qualification_ref: DigestRef;
  fact_set_ref: DigestRef;
  policy_ref: DigestRef;
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  presentation_ref: DigestRef;
  blinded: true;
  randomized: true;
  rationale_codes: NonEmptyArray<string>;
  outcome: "A" | "B" | "tie" | "abstain";
  conflict_state: "none" | "declared" | "adjudicated" | "unresolved";
  adjudication_ref: DigestRef | null;
  facts_changed: boolean;
  requirements_changed: boolean;
  context_changed: boolean;
  qualification_state: "qualified" | "not_qualified" | "abstained" | "invalid";
  reason_codes: string[];
};

export type LearningEligibilityPayload = NoAuthorityPayload & {
  qualification_ref: DigestRef;
  decision_ref: DigestRef;
  learning_policy_ref: DigestRef;
  permission_ref: DigestRef | null;
  target_memory_scope: "task" | "personal" | "project" | "organization" | "public";
  rights_check: "pass" | "fail" | "unknown";
  privacy_check: "pass" | "fail" | "unknown";
  factual_check: "pass" | "fail" | "unknown";
  policy_check: "pass" | "fail" | "unknown";
  incident_check: "pass" | "fail" | "unknown";
  context_check: "pass" | "fail" | "unknown";
  eligibility_state: "eligible" | "ineligible";
  reason_codes: NonEmptyArray<string>;
};

export type PreferenceExamplePayload = NoAuthorityPayload & {
  qualification_ref: DigestRef;
  eligibility_ref: DigestRef;
  task_ref: DigestRef;
  context_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  presented_order: ["A", "B"] | ["B", "A"];
  preferred_side: "A" | "B";
  label: 0 | 1;
  presentation_digest: Digest;
  feature_source_checkpoint_set_ref: DigestRef;
  preference_state: "admitted" | "invalidated" | "revoked";
};

export type ExemplarPayload = NoAuthorityPayload & {
  exemplar_kind: "expression" | "mechanism";
  subject_ref: DigestRef;
  approval_ref: DigestRef;
  applicability_scope_ref: DigestRef;
  transfer_condition_refs: NonEmptyArray<DigestRef>;
  prohibited_transfer: string;
  rights_ref: DigestRef;
  permission_ref: DigestRef;
  currentness_state: "current" | "expired" | "revoked";
  exemplar_state: "approved_current" | "expired" | "revoked";
};

export interface LeakageEdge {
  left_ref: DigestRef;
  right_ref: DigestRef;
  reason:
    | "message_lineage"
    | "supersession"
    | "task_family"
    | "template_family"
    | "source_occurrence"
    | "locale_variant"
    | "channel_variant"
    | "near_duplicate";
}

export type LeakageGroupPayload = NoAuthorityPayload & {
  rule_version: "contentmd.leakage-group/0.1.0";
  normalization_artifact_refs: NonEmptyArray<ArtifactRef>;
  member_refs: NonEmptyArray<DigestRef>;
  edges: NonEmptyArray<LeakageEdge>;
  bucket: number;
  split: "train" | "validation" | "test";
  group_state: "frozen";
};

export interface DatasetExclusion {
  example_ref: DigestRef;
  reason_code: string;
}

export interface DatasetCounts {
  examples: number;
  groups: number;
  train_examples: number;
  train_groups: number;
  validation_examples: number;
  validation_groups: number;
  test_examples: number;
  test_groups: number;
}

export type LearningDatasetManifestPayload = NoAuthorityPayload & {
  example_refs: NonEmptyArray<DigestRef>;
  exclusions: DatasetExclusion[];
  leakage_group_refs: NonEmptyArray<DigestRef>;
  train_example_refs: NonEmptyArray<DigestRef>;
  validation_example_refs: NonEmptyArray<DigestRef>;
  test_example_refs: NonEmptyArray<DigestRef>;
  permission_refs: NonEmptyArray<DigestRef>;
  feature_source_checkpoint_refs: NonEmptyArray<DigestRef>;
  counts: DatasetCounts;
  test_open_state: "not_applicable" | "sealed" | "opened";
  dataset_state:
    | "diagnostics_only"
    | "training_eligible"
    | "sealed"
    | "test_opened"
    | "invalid";
};

export interface FeatureDefinition {
  name: string;
  position: number;
  value_type: "boolean" | "number" | "closed_enum";
  transformation: string;
  nullable: boolean;
  missing_indicator_name: string | null;
}

export type FeatureProfilePayload = NoAuthorityPayload & {
  feature_profile_version: "rank-features/0.1.0";
  features: NonEmptyArray<FeatureDefinition>;
  source_artifact_refs: NonEmptyArray<ArtifactRef>;
  forbidden_input_fields: NonEmptyArray<string>;
  runtime_profile_ref: ArtifactRef;
  profile_state: "frozen";
};

export interface ModelHyperparameters {
  lambda: 1;
  learning_rate: 0.05;
  maximum_iterations: 2000;
  convergence_delta: 1e-9;
  convergence_patience: 10;
  standardized_clip_lower: -10;
  standardized_clip_upper: 10;
}

export interface StandardizationEntry {
  feature_name: string;
  mean: number;
  population_standard_deviation: number;
}

export type RankingModelPayload = NoAuthorityPayload & {
  algorithm: "pairwise_logistic_l2";
  dataset_ref: DigestRef;
  feature_profile_ref: DigestRef;
  hyperparameters: ModelHyperparameters;
  feature_order: NonEmptyArray<string>;
  standardization: NonEmptyArray<StandardizationEntry>;
  coefficient_bits: NonEmptyArray<string>;
  training_statistics_ref: DigestRef;
  runtime_profile_ref: ArtifactRef;
  model_artifact_digest: Digest;
  model_state: "trained" | "nonconverged" | "invalid";
};

export type LearningEvaluationRunPayload = NoAuthorityPayload & {
  dataset_ref: DigestRef;
  model_ref: DigestRef;
  baseline_ref: DigestRef;
  feature_profile_ref: DigestRef;
  test_open_receipt_ref: DigestRef | null;
  evaluation_population_ref: DigestRef;
  overall_metric_refs: NonEmptyArray<DigestRef>;
  slice_metric_refs: NonEmptyArray<DigestRef>;
  failure_refs: DigestRef[];
  bootstrap_ref: DigestRef | null;
  predicate_result_refs: NonEmptyArray<DigestRef>;
  attempt_consumed: boolean;
  evaluation_state: "not_run" | "invalid" | "failed" | "passed";
};

export type ShadowEvaluationPlanPayload = NoAuthorityPayload & {
  active_baseline_ref: DigestRef;
  candidate_model_ref: DigestRef;
  input_selection_ref: DigestRef;
  start_rule_ref: DigestRef;
  end_rule_ref: DigestRef;
  minimum_decisive_pairs: 50;
  minimum_leakage_groups: 20;
  minimum_calendar_days: 14;
  required_slice_refs: NonEmptyArray<DigestRef>;
  metric_refs: NonEmptyArray<DigestRef>;
  gate_refs: NonEmptyArray<DigestRef>;
  no_influence: true;
  plan_state: "proposed" | "ready" | "invalid";
};

type ShadowBindingState = "proposed" | "active" | "completed" | "suspended";
type ShadowBindingAuthority =
  | {
      record_mode: "development_fixture";
      authority_effect: "none";
      binding_state: "proposed";
    }
  | {
      record_mode: "official";
      authority_effect: "none";
      binding_state: "proposed";
    }
  | {
      record_mode: "official";
      authority_effect: "shadow_observation_only";
      binding_state: "active" | "completed" | "suspended";
    };

export type ShadowBindingPayload = PayloadWithoutAuthority &
  ShadowBindingAuthority & {
    plan_ref: DigestRef;
    active_baseline_ref: DigestRef;
    candidate_model_ref: DigestRef;
    effective_at: string | null;
    expires_at: string | null;
    active_output_digest: Digest | null;
    shadow_output_digest: Digest | null;
    no_influence: true;
  };

type LearningPromotionDecisionState =
  | "proposed"
  | "approved"
  | "rejected"
  | "narrowed"
  | "superseded";
type LearningPromotionAuthority =
  | {
      record_mode: "development_fixture";
      authority_effect: "none";
      decision_state: "proposed" | "rejected" | "superseded";
    }
  | {
      record_mode: "official";
      authority_effect: "none";
      decision_state: "proposed" | "rejected" | "superseded";
    }
  | {
      record_mode: "official";
      authority_effect: "promotion_decision_only";
      decision_state: "approved" | "narrowed";
    };

export type LearningPromotionDecisionPayload = PayloadWithoutAuthority &
  LearningPromotionAuthority & {
    model_ref: DigestRef;
    dataset_ref: DigestRef;
    evaluation_ref: DigestRef;
    shadow_result_ref: DigestRef;
    proposed_scope_ref: DigestRef;
    required_slice_refs: NonEmptyArray<DigestRef>;
    actor_ref: DigestRef;
    actor_qualification_ref: DigestRef;
    rationale: string;
    approval_ref: DigestRef | null;
  };

type LearningDeploymentBindingState =
  | "proposed"
  | "active"
  | "suspended"
  | "superseded";
type LearningDeploymentAuthority =
  | {
      record_mode: "development_fixture";
      authority_effect: "none";
      binding_state: "proposed";
    }
  | {
      record_mode: "official";
      authority_effect: "none";
      binding_state: "proposed";
    }
  | {
      record_mode: "official";
      authority_effect: "deployment_binding";
      binding_state: "active" | "suspended" | "superseded";
    };

export type LearningDeploymentBindingPayload = PayloadWithoutAuthority &
  LearningDeploymentAuthority & {
    project_id: string;
    model_ref: DigestRef | null;
    baseline_ref: DigestRef;
    promotion_decision_ref: DigestRef | null;
    previous_binding_ref: DigestRef | null;
    expected_head_event_digest: Digest;
    readback_receipt_ref: DigestRef | null;
    effective_at: string | null;
  };

export type LearningDriftReportPayload = NoAuthorityPayload & {
  binding_ref: DigestRef;
  model_ref: DigestRef | null;
  promotion_evaluation_ref: DigestRef;
  window_started_at: string;
  window_ended_at: string;
  decisive_pair_count: number;
  leakage_group_count: number;
  metric_delta_refs: NonEmptyArray<DigestRef>;
  consecutive_degraded_windows: number;
  consecutive_insufficient_windows: number;
  immediate_failure_refs: DigestRef[];
  disposition: "continue" | "review" | "suspend";
  window_state: "evaluable" | "monitoring_insufficient";
};

type LearningRollbackState =
  | "proposed"
  | "restored"
  | "fallback_baseline"
  | "rejected";
type LearningRollbackAuthority =
  | {
      record_mode: "development_fixture";
      authority_effect: "none";
      rollback_state: "proposed" | "rejected";
    }
  | {
      record_mode: "official";
      authority_effect: "none";
      rollback_state: "proposed" | "rejected";
    }
  | {
      record_mode: "official";
      authority_effect: "rollback_binding";
      rollback_state: "restored" | "fallback_baseline";
    };

export type LearningRollbackPayload = PayloadWithoutAuthority &
  LearningRollbackAuthority & {
    current_binding_ref: DigestRef;
    target_binding_ref: DigestRef | null;
    target_model_ref: DigestRef | null;
    fallback_baseline_ref: DigestRef;
    reason_code: string;
    authorization_ref: DigestRef | null;
    revalidation_refs: NonEmptyArray<DigestRef>;
    expected_head_event_digest: Digest;
    resulting_binding_ref: DigestRef | null;
    readback_receipt_ref: DigestRef | null;
  };

export interface CountEntry {
  key: string;
  count: number;
}

export interface IntersectionCount {
  keys: NonEmptyArray<string>;
  count: number;
}

export type WritingBenchmarkManifestPayload = NoAuthorityPayload & {
  benchmark_id: "LIL-WRITE-001";
  task_refs: ExactlySixty<DigestRef>;
  product_counts: NonEmptyArray<CountEntry>;
  domain_counts: NonEmptyArray<CountEntry>;
  channel_counts: NonEmptyArray<CountEntry>;
  locale_counts: NonEmptyArray<CountEntry>;
  task_type_counts: NonEmptyArray<CountEntry>;
  family_counts: NonEmptyArray<CountEntry>;
  intersection_counts: NonEmptyArray<IntersectionCount>;
  training_manifest_ref: DigestRef;
  disjointness_check_ref: DigestRef;
  generation_control_ref: DigestRef;
  metric_contract_ref: DigestRef;
  missingness_contract_ref: DigestRef;
  bootstrap_contract_ref: DigestRef;
  quality_gate_ref: DigestRef;
  manifest_state: "draft" | "sealed" | "opened" | "retired";
};

export type WritingBenchmarkTaskPayload = NoAuthorityPayload & {
  manifest_ref: DigestRef;
  product_id: string;
  domain: string;
  channel: "web" | "notification";
  locale: string;
  task_type: "strategy" | "contextual_microcopy";
  family_id: string;
  task_packet_ref: DigestRef;
  context_evidence_ref: DigestRef;
  semantic_lineage_ids: NonEmptyArray<string>;
  template_ids: NonEmptyArray<string>;
  leakage_group_ids: NonEmptyArray<string>;
  required_facts: string[];
  required_actions: string[];
  acceptance_criteria: NonEmptyArray<string>;
  ownership: "project_owned_synthetic";
  generation_config_ref: DigestRef;
  task_state: "frozen";
};

export interface CandidateEntry {
  position: 0 | 1 | 2 | 3;
  candidate_id: string;
  expression_digest: Digest;
}

export type BenchmarkCandidateSetPayload = NoAuthorityPayload & {
  task_ref: DigestRef;
  provider_operation_plan_id: string;
  provider_operation_plan_digest: Digest;
  nonce_claim_receipt_ref: DigestRef;
  provider_receipt_ref: DigestRef;
  provider_output_digest: Digest;
  provider_profile_ref: DigestRef;
  returned_model_id: string;
  prompt_template_ref: ArtifactRef;
  context_ref: DigestRef;
  alternatives_count: 4;
  output_token_budget: 512;
  candidates: ExactlyFour<CandidateEntry>;
  candidate_set_digest: Digest;
  candidate_set_state: "completed_verified_nonquarantined";
};

export type BenchmarkSelectionPayload = NoAuthorityPayload & {
  task_ref: DigestRef;
  candidate_set_ref: DigestRef;
  selection_path: "baseline" | "learned";
  ranker_ref: DigestRef;
  ordered_candidate_refs: ExactlyFour<DigestRef>;
  candidate_evaluation_refs: ExactlyFour<DigestRef>;
  selected_candidate_ref: DigestRef;
  tie_break_trace_ref: DigestRef;
  selection_digest: Digest;
  frozen_before_blinding: true;
  selection_state: "frozen";
};

export type BenchmarkReviewPayload = NoAuthorityPayload & {
  attempt_ref: DigestRef;
  task_ref: DigestRef;
  allocation_ref: DigestRef;
  randomization_ref: DigestRef;
  rubric_ref: ArtifactRef;
  reviewer_qualification_ref: DigestRef;
  reviewer_independence_ref: DigestRef;
  reviewer_role: "original" | "adjudicator";
  blinded_pair_ref: DigestRef;
  hard_result_refs: NonEmptyArray<DigestRef>;
  advisory_result_refs: NonEmptyArray<DigestRef>;
  preference: "A" | "B" | "tie" | "abstain";
  reason_codes: NonEmptyArray<string>;
  accept_as_is: boolean | null;
  accepted_edit_ref: DigestRef | null;
  review_duration_ms: number | null;
  context_changed: boolean;
  candidate_mismatch: boolean;
  model_mismatch: boolean;
  adjudicates_review_refs: DigestRef[];
  review_state: "decisive" | "tie" | "abstained" | "invalid";
};

export interface ProviderOperationPlanEntry {
  task_id: string;
  plan_id: string;
  plan_digest: Digest;
}

type BenchmarkAttemptState =
  | "draft"
  | "sealed"
  | "in_progress"
  | "interrupted"
  | "invalid_run"
  | "consumed";
type BenchmarkAttemptAuthority =
  | {
      record_mode: "development_fixture";
      authority_effect: "none";
      attempt_state: "draft";
    }
  | {
      record_mode: "official";
      authority_effect: "none";
      attempt_state: "draft";
    }
  | {
      record_mode: "official";
      authority_effect: "benchmark_attempt_control";
      attempt_state: "sealed" | "in_progress" | "interrupted";
    }
  | {
      record_mode: "official";
      authority_effect: "benchmark_attempt_consumption";
      attempt_state: "invalid_run" | "consumed";
    };

export type BenchmarkAttemptPayload = PayloadWithoutAuthority &
  BenchmarkAttemptAuthority & {
    candidate_model_ref: DigestRef;
    manifest_ref: DigestRef;
    reviewer_allocation_ref: DigestRef;
    rubric_ref: ArtifactRef;
    randomization_ref: DigestRef;
    analysis_code_ref: ArtifactRef;
    provider_operation_plan_set: ExactlySixty<ProviderOperationPlanEntry>;
    provider_operation_plan_set_digest: Digest;
    sealed_at: string | null;
    readback_receipt_ref: DigestRef | null;
    resume_count: number;
    consumed_at: string | null;
    consumption_reason: "invalid_run" | "quality_gate_opened" | null;
  };

export type WritingBenchmarkRunPayload = NoAuthorityPayload & {
  attempt_ref: DigestRef;
  manifest_ref: DigestRef;
  baseline_ref: DigestRef;
  model_ref: DigestRef;
  candidate_set_refs: NonEmptyArray<DigestRef>;
  selection_refs: NonEmptyArray<DigestRef>;
  review_refs: NonEmptyArray<DigestRef>;
  task_disposition_refs: NonEmptyArray<DigestRef>;
  valid_task_count: number;
  invalid_task_count: number;
  slice_count_refs: NonEmptyArray<DigestRef>;
  hard_failure_refs: DigestRef[];
  metric_result_refs: NonEmptyArray<DigestRef>;
  bootstrap_result_refs: NonEmptyArray<DigestRef>;
  predicate_result_refs: NonEmptyArray<DigestRef>;
  attempt_consumed: true;
  bounded_claim_status:
    | "none"
    | "synthetic_noninferiority_only"
    | "synthetic_noninferiority_plus_utility";
  run_state: "not_run" | "invalid_run" | "failed" | "passed";
};

type CanonicalLearningRecord<Id extends LearningSchemaId, Payload> =
  Omit<DurableRecord<Payload>, "schema_id" | "provenance"> & {
    schema_id: Id;
    provenance: NonEmptyArray<ProvenanceRef>;
  };

export type GenerationRunRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.generationRun,
  GenerationRunPayload
>;
export type FeedbackQualificationRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.feedbackQualification,
  FeedbackQualificationPayload
>;
export type LearningEligibilityRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningEligibility,
  LearningEligibilityPayload
>;
export type PreferenceExampleRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.preferenceExample,
  PreferenceExamplePayload
>;
export type ExemplarRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.exemplar,
  ExemplarPayload
>;
export type LeakageGroupRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.leakageGroup,
  LeakageGroupPayload
>;
export type LearningDatasetManifest = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningDatasetManifest,
  LearningDatasetManifestPayload
>;
export type FeatureProfile = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.featureProfile,
  FeatureProfilePayload
>;
export type RankingModelRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.rankingModel,
  RankingModelPayload
>;
export type LearningEvaluationRun = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningEvaluationRun,
  LearningEvaluationRunPayload
>;
export type ShadowEvaluationPlan = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.shadowEvaluationPlan,
  ShadowEvaluationPlanPayload
>;
export type ShadowBindingRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.shadowBinding,
  ShadowBindingPayload
>;
export type LearningPromotionDecision = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningPromotionDecision,
  LearningPromotionDecisionPayload
>;
export type LearningDeploymentBinding = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningDeploymentBinding,
  LearningDeploymentBindingPayload
>;
export type LearningDriftReport = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningDriftReport,
  LearningDriftReportPayload
>;
export type LearningRollbackRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.learningRollback,
  LearningRollbackPayload
>;
export type WritingBenchmarkManifest = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.writingBenchmarkManifest,
  WritingBenchmarkManifestPayload
>;
export type WritingBenchmarkTaskRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.writingBenchmarkTask,
  WritingBenchmarkTaskPayload
>;
export type BenchmarkCandidateSetRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.benchmarkCandidateSet,
  BenchmarkCandidateSetPayload
>;
export type BenchmarkSelectionRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.benchmarkSelection,
  BenchmarkSelectionPayload
>;
export type BenchmarkReviewRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.benchmarkReview,
  BenchmarkReviewPayload
>;
export type BenchmarkAttemptRecord = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.benchmarkAttempt,
  BenchmarkAttemptPayload
>;
export type WritingBenchmarkRun = CanonicalLearningRecord<
  typeof LEARNING_SCHEMA_IDS.writingBenchmarkRun,
  WritingBenchmarkRunPayload
>;

export interface LearningSchemaPayloadMap {
  [LEARNING_SCHEMA_IDS.generationRun]: GenerationRunPayload;
  [LEARNING_SCHEMA_IDS.feedbackQualification]: FeedbackQualificationPayload;
  [LEARNING_SCHEMA_IDS.learningEligibility]: LearningEligibilityPayload;
  [LEARNING_SCHEMA_IDS.preferenceExample]: PreferenceExamplePayload;
  [LEARNING_SCHEMA_IDS.exemplar]: ExemplarPayload;
  [LEARNING_SCHEMA_IDS.leakageGroup]: LeakageGroupPayload;
  [LEARNING_SCHEMA_IDS.learningDatasetManifest]: LearningDatasetManifestPayload;
  [LEARNING_SCHEMA_IDS.featureProfile]: FeatureProfilePayload;
  [LEARNING_SCHEMA_IDS.rankingModel]: RankingModelPayload;
  [LEARNING_SCHEMA_IDS.learningEvaluationRun]: LearningEvaluationRunPayload;
  [LEARNING_SCHEMA_IDS.shadowEvaluationPlan]: ShadowEvaluationPlanPayload;
  [LEARNING_SCHEMA_IDS.shadowBinding]: ShadowBindingPayload;
  [LEARNING_SCHEMA_IDS.learningPromotionDecision]: LearningPromotionDecisionPayload;
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding]: LearningDeploymentBindingPayload;
  [LEARNING_SCHEMA_IDS.learningDriftReport]: LearningDriftReportPayload;
  [LEARNING_SCHEMA_IDS.learningRollback]: LearningRollbackPayload;
  [LEARNING_SCHEMA_IDS.writingBenchmarkManifest]: WritingBenchmarkManifestPayload;
  [LEARNING_SCHEMA_IDS.writingBenchmarkTask]: WritingBenchmarkTaskPayload;
  [LEARNING_SCHEMA_IDS.benchmarkCandidateSet]: BenchmarkCandidateSetPayload;
  [LEARNING_SCHEMA_IDS.benchmarkSelection]: BenchmarkSelectionPayload;
  [LEARNING_SCHEMA_IDS.benchmarkReview]: BenchmarkReviewPayload;
  [LEARNING_SCHEMA_IDS.benchmarkAttempt]: BenchmarkAttemptPayload;
  [LEARNING_SCHEMA_IDS.writingBenchmarkRun]: WritingBenchmarkRunPayload;
}

export interface LearningSchemaRecordMap {
  [LEARNING_SCHEMA_IDS.generationRun]: GenerationRunRecord;
  [LEARNING_SCHEMA_IDS.feedbackQualification]: FeedbackQualificationRecord;
  [LEARNING_SCHEMA_IDS.learningEligibility]: LearningEligibilityRecord;
  [LEARNING_SCHEMA_IDS.preferenceExample]: PreferenceExampleRecord;
  [LEARNING_SCHEMA_IDS.exemplar]: ExemplarRecord;
  [LEARNING_SCHEMA_IDS.leakageGroup]: LeakageGroupRecord;
  [LEARNING_SCHEMA_IDS.learningDatasetManifest]: LearningDatasetManifest;
  [LEARNING_SCHEMA_IDS.featureProfile]: FeatureProfile;
  [LEARNING_SCHEMA_IDS.rankingModel]: RankingModelRecord;
  [LEARNING_SCHEMA_IDS.learningEvaluationRun]: LearningEvaluationRun;
  [LEARNING_SCHEMA_IDS.shadowEvaluationPlan]: ShadowEvaluationPlan;
  [LEARNING_SCHEMA_IDS.shadowBinding]: ShadowBindingRecord;
  [LEARNING_SCHEMA_IDS.learningPromotionDecision]: LearningPromotionDecision;
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding]: LearningDeploymentBinding;
  [LEARNING_SCHEMA_IDS.learningDriftReport]: LearningDriftReport;
  [LEARNING_SCHEMA_IDS.learningRollback]: LearningRollbackRecord;
  [LEARNING_SCHEMA_IDS.writingBenchmarkManifest]: WritingBenchmarkManifest;
  [LEARNING_SCHEMA_IDS.writingBenchmarkTask]: WritingBenchmarkTaskRecord;
  [LEARNING_SCHEMA_IDS.benchmarkCandidateSet]: BenchmarkCandidateSetRecord;
  [LEARNING_SCHEMA_IDS.benchmarkSelection]: BenchmarkSelectionRecord;
  [LEARNING_SCHEMA_IDS.benchmarkReview]: BenchmarkReviewRecord;
  [LEARNING_SCHEMA_IDS.benchmarkAttempt]: BenchmarkAttemptRecord;
  [LEARNING_SCHEMA_IDS.writingBenchmarkRun]: WritingBenchmarkRun;
}

export type LearningRecord = LearningSchemaRecordMap[LearningSchemaId];

type Equal<Left, Right> =
  (<T>() => T extends Left ? 1 : 2) extends
  (<T>() => T extends Right ? 1 : 2)
    ? (<T>() => T extends Right ? 1 : 2) extends
      (<T>() => T extends Left ? 1 : 2)
      ? true
      : false
    : false;
type Assert<Condition extends true> = Condition;

type _PayloadMapKeysAreExact = Assert<
  Equal<keyof LearningSchemaPayloadMap, LearningSchemaId>
>;
type _RecordMapKeysAreExact = Assert<
  Equal<keyof LearningSchemaRecordMap, LearningSchemaId>
>;
type _RecordUnionIdsAreExact = Assert<
  Equal<LearningRecord["schema_id"], LearningSchemaId>
>;
