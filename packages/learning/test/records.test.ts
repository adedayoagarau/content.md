import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { finalizeRecord, verifyRecordDigest } from "@contentmd/core";
import { LEARNING_SCHEMA_IDS } from "@contentmd/learning";
import { SCHEMA_IDS, schemaDocuments, validateRecord } from "@contentmd/schemas";

const EXPECTED_LEARNING_SCHEMA_IDS = [
  "contentmd.generation-run-record",
  "contentmd.feedback-qualification-record",
  "contentmd.learning-eligibility-record",
  "contentmd.preference-example-record",
  "contentmd.exemplar-record",
  "contentmd.leakage-group-record",
  "contentmd.learning-dataset-manifest",
  "contentmd.feature-profile",
  "contentmd.ranking-model-record",
  "contentmd.learning-evaluation-run",
  "contentmd.shadow-evaluation-plan",
  "contentmd.shadow-binding-record",
  "contentmd.learning-promotion-decision",
  "contentmd.learning-deployment-binding",
  "contentmd.learning-drift-report",
  "contentmd.learning-rollback-record",
  "contentmd.writing-benchmark-manifest",
  "contentmd.writing-benchmark-task-record",
  "contentmd.benchmark-candidate-set-record",
  "contentmd.benchmark-selection-record",
  "contentmd.benchmark-review-record",
  "contentmd.benchmark-attempt-record",
  "contentmd.writing-benchmark-run",
] as const;

type LearningSchemaId = (typeof EXPECTED_LEARNING_SCHEMA_IDS)[number];
type JsonObject = Record<string, unknown>;

const digest = (preimage: string): string =>
  createHash("sha256").update(preimage, "utf8").digest("hex");

const fixtureDigest = (label: string): string =>
  digest(`contentmd.learning.record-test/0.1.0\n${label}\n`);

const digestRef = (label: string) => ({
  record_id: `fixture.ref.${label.replaceAll("_", ".")}`,
  schema_id: "contentmd.synthetic-reference-record",
  schema_version: "0.1.0" as const,
  content_digest: fixtureDigest(`ref:${label}`),
});

const artifactRef = (label: string) => ({
  artifact_id: `fixture.artifact.${label.replaceAll("_", ".")}`,
  artifact_version: "0.1.0",
  artifact_digest: fixtureDigest(`artifact:${label}`),
});

const commonPayload = () => ({
  contract_version: "contentmd.learning-record-contract/0.1.0",
  record_mode: "development_fixture",
  ranking_objective: "expression_preference",
  candidate_kind: "expression",
  schema_digest: fixtureDigest("schema-bytes:learning-records.schema.json"),
  code_digest: fixtureDigest("code-bytes:records-fixture-producer.ts"),
  input_digest: fixtureDigest("input-bytes:records-fixture-input.json"),
  authority_effect: "none",
});

const payloadFactories = {
  [LEARNING_SCHEMA_IDS.generationRun]: () => ({
    ...commonPayload(),
    task_ref: digestRef("generation_task"),
    context_ref: digestRef("generation_context"),
    retrieval_snapshot_ref: null,
    prompt_ref: artifactRef("generation_prompt"),
    provider_request_ref: digestRef("provider_request"),
    provider_response_ref: digestRef("provider_response"),
    output_ref: null,
    critique_refs: [],
    proposal_ref: null,
    run_state: "completed",
  }),
  [LEARNING_SCHEMA_IDS.feedbackQualification]: () => ({
    ...commonPayload(),
    decision_ref: digestRef("qualification_decision"),
    rubric_ref: artifactRef("qualification_rubric"),
    reviewer_qualification_ref: digestRef("reviewer_qualification"),
    fact_set_ref: digestRef("qualification_facts"),
    policy_ref: digestRef("qualification_policy"),
    task_ref: digestRef("qualification_task"),
    context_ref: digestRef("qualification_context"),
    candidate_a_ref: digestRef("qualification_candidate_a"),
    candidate_b_ref: digestRef("qualification_candidate_b"),
    presentation_ref: digestRef("qualification_presentation"),
    blinded: true,
    randomized: true,
    rationale_codes: ["synthetic_pairwise_review"],
    outcome: "A",
    conflict_state: "none",
    adjudication_ref: null,
    facts_changed: false,
    requirements_changed: false,
    context_changed: false,
    qualification_state: "qualified",
    reason_codes: [],
  }),
  [LEARNING_SCHEMA_IDS.learningEligibility]: () => ({
    ...commonPayload(),
    qualification_ref: digestRef("eligibility_qualification"),
    decision_ref: digestRef("eligibility_decision"),
    learning_policy_ref: digestRef("eligibility_policy"),
    permission_ref: null,
    target_memory_scope: "project",
    rights_check: "pass",
    privacy_check: "pass",
    factual_check: "pass",
    policy_check: "pass",
    incident_check: "pass",
    context_check: "pass",
    eligibility_state: "eligible",
    reason_codes: ["project_owned_synthetic"],
  }),
  [LEARNING_SCHEMA_IDS.preferenceExample]: () => ({
    ...commonPayload(),
    qualification_ref: digestRef("preference_qualification"),
    eligibility_ref: digestRef("preference_eligibility"),
    task_ref: digestRef("preference_task"),
    context_ref: digestRef("preference_context"),
    candidate_a_ref: digestRef("preference_candidate_a"),
    candidate_b_ref: digestRef("preference_candidate_b"),
    presented_order: ["A", "B"],
    preferred_side: "A",
    label: 1,
    presentation_digest: fixtureDigest("preference:presentation"),
    feature_source_checkpoint_set_ref: digestRef("feature_checkpoint_set"),
    preference_state: "admitted",
  }),
  [LEARNING_SCHEMA_IDS.exemplar]: () => ({
    ...commonPayload(),
    exemplar_kind: "expression",
    subject_ref: digestRef("exemplar_subject"),
    approval_ref: digestRef("exemplar_approval"),
    applicability_scope_ref: digestRef("exemplar_scope"),
    transfer_condition_refs: [digestRef("exemplar_transfer_condition")],
    prohibited_transfer: "Do not transfer outside the bound synthetic scope.",
    rights_ref: digestRef("exemplar_rights"),
    permission_ref: digestRef("exemplar_permission"),
    currentness_state: "current",
    exemplar_state: "approved_current",
  }),
  [LEARNING_SCHEMA_IDS.leakageGroup]: () => ({
    ...commonPayload(),
    rule_version: "contentmd.leakage-group/0.1.0",
    normalization_artifact_refs: [artifactRef("leakage_normalizer")],
    member_refs: [digestRef("leakage_member_a"), digestRef("leakage_member_b")],
    edges: [{
      left_ref: digestRef("leakage_member_a"),
      right_ref: digestRef("leakage_member_b"),
      reason: "near_duplicate",
    }],
    bucket: 18,
    split: "train",
    group_state: "frozen",
  }),
  [LEARNING_SCHEMA_IDS.learningDatasetManifest]: () => ({
    ...commonPayload(),
    example_refs: [digestRef("dataset_example_a"), digestRef("dataset_example_b")],
    exclusions: [{
      example_ref: digestRef("dataset_excluded_example"),
      reason_code: "synthetic_exclusion",
    }],
    leakage_group_refs: [digestRef("dataset_leakage_group")],
    train_example_refs: [digestRef("dataset_train_example")],
    validation_example_refs: [digestRef("dataset_validation_example")],
    test_example_refs: [digestRef("dataset_test_example")],
    permission_refs: [digestRef("dataset_permission")],
    feature_source_checkpoint_refs: [digestRef("dataset_feature_checkpoint")],
    counts: {
      examples: 3,
      groups: 3,
      train_examples: 1,
      train_groups: 1,
      validation_examples: 1,
      validation_groups: 1,
      test_examples: 1,
      test_groups: 1,
    },
    test_open_state: "sealed",
    dataset_state: "diagnostics_only",
  }),
  [LEARNING_SCHEMA_IDS.featureProfile]: () => ({
    ...commonPayload(),
    feature_profile_version: "rank-features/0.1.0",
    features: [{
      name: "length_delta",
      position: 0,
      value_type: "number",
      transformation: "identity",
      nullable: false,
      missing_indicator_name: null,
    }],
    source_artifact_refs: [artifactRef("feature_source")],
    forbidden_input_fields: ["post_presentation_outcome"],
    runtime_profile_ref: artifactRef("feature_runtime"),
    profile_state: "frozen",
  }),
  [LEARNING_SCHEMA_IDS.rankingModel]: () => ({
    ...commonPayload(),
    algorithm: "pairwise_logistic_l2",
    dataset_ref: digestRef("model_dataset"),
    feature_profile_ref: digestRef("model_feature_profile"),
    hyperparameters: {
      lambda: 1,
      learning_rate: 0.05,
      maximum_iterations: 2000,
      convergence_delta: 1e-9,
      convergence_patience: 10,
      standardized_clip_lower: -10,
      standardized_clip_upper: 10,
    },
    feature_order: ["length_delta"],
    standardization: [{
      feature_name: "length_delta",
      mean: 0,
      population_standard_deviation: 1,
    }],
    coefficient_bits: ["3ff0000000000000"],
    training_statistics_ref: digestRef("model_training_statistics"),
    runtime_profile_ref: artifactRef("model_runtime"),
    model_artifact_digest: fixtureDigest("model:artifact-preimage"),
    model_state: "trained",
  }),
  [LEARNING_SCHEMA_IDS.learningEvaluationRun]: () => ({
    ...commonPayload(),
    dataset_ref: digestRef("evaluation_dataset"),
    model_ref: digestRef("evaluation_model"),
    baseline_ref: digestRef("evaluation_baseline"),
    feature_profile_ref: digestRef("evaluation_feature_profile"),
    test_open_receipt_ref: null,
    evaluation_population_ref: digestRef("evaluation_population"),
    overall_metric_refs: [digestRef("evaluation_overall_metric")],
    slice_metric_refs: [digestRef("evaluation_slice_metric")],
    failure_refs: [],
    bootstrap_ref: null,
    predicate_result_refs: [digestRef("evaluation_predicate")],
    attempt_consumed: false,
    evaluation_state: "not_run",
  }),
  [LEARNING_SCHEMA_IDS.shadowEvaluationPlan]: () => ({
    ...commonPayload(),
    active_baseline_ref: digestRef("shadow_plan_baseline"),
    candidate_model_ref: digestRef("shadow_plan_candidate"),
    input_selection_ref: digestRef("shadow_plan_input_selection"),
    start_rule_ref: digestRef("shadow_plan_start_rule"),
    end_rule_ref: digestRef("shadow_plan_end_rule"),
    minimum_decisive_pairs: 50,
    minimum_leakage_groups: 20,
    minimum_calendar_days: 14,
    required_slice_refs: [digestRef("shadow_plan_slice")],
    metric_refs: [digestRef("shadow_plan_metric")],
    gate_refs: [digestRef("shadow_plan_gate")],
    no_influence: true,
    plan_state: "proposed",
  }),
  [LEARNING_SCHEMA_IDS.shadowBinding]: () => ({
    ...commonPayload(),
    plan_ref: digestRef("shadow_binding_plan"),
    active_baseline_ref: digestRef("shadow_binding_baseline"),
    candidate_model_ref: digestRef("shadow_binding_candidate"),
    effective_at: null,
    expires_at: null,
    active_output_digest: null,
    shadow_output_digest: null,
    no_influence: true,
    binding_state: "proposed",
  }),
  [LEARNING_SCHEMA_IDS.learningPromotionDecision]: () => ({
    ...commonPayload(),
    model_ref: digestRef("promotion_model"),
    dataset_ref: digestRef("promotion_dataset"),
    evaluation_ref: digestRef("promotion_evaluation"),
    shadow_result_ref: digestRef("promotion_shadow_result"),
    proposed_scope_ref: digestRef("promotion_scope"),
    required_slice_refs: [digestRef("promotion_slice")],
    actor_ref: digestRef("promotion_actor"),
    actor_qualification_ref: digestRef("promotion_actor_qualification"),
    rationale: "Synthetic proposal fixture; no authority effect.",
    approval_ref: null,
    decision_state: "proposed",
  }),
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding]: () => ({
    ...commonPayload(),
    project_id: "project.synthetic.learning",
    model_ref: null,
    baseline_ref: digestRef("deployment_baseline"),
    promotion_decision_ref: null,
    previous_binding_ref: null,
    expected_head_event_digest: fixtureDigest("deployment:expected-head"),
    readback_receipt_ref: null,
    effective_at: null,
    binding_state: "proposed",
  }),
  [LEARNING_SCHEMA_IDS.learningDriftReport]: () => ({
    ...commonPayload(),
    binding_ref: digestRef("drift_binding"),
    model_ref: null,
    promotion_evaluation_ref: digestRef("drift_promotion_evaluation"),
    window_started_at: "2026-08-01T00:00:00Z",
    window_ended_at: "2026-08-15T00:00:00Z",
    decisive_pair_count: 0,
    leakage_group_count: 0,
    metric_delta_refs: [digestRef("drift_metric_delta")],
    consecutive_degraded_windows: 0,
    consecutive_insufficient_windows: 1,
    immediate_failure_refs: [],
    disposition: "continue",
    window_state: "monitoring_insufficient",
  }),
  [LEARNING_SCHEMA_IDS.learningRollback]: () => ({
    ...commonPayload(),
    current_binding_ref: digestRef("rollback_current_binding"),
    target_binding_ref: null,
    target_model_ref: null,
    fallback_baseline_ref: digestRef("rollback_fallback_baseline"),
    reason_code: "synthetic_proposal",
    authorization_ref: null,
    revalidation_refs: [digestRef("rollback_revalidation")],
    expected_head_event_digest: fixtureDigest("rollback:expected-head"),
    resulting_binding_ref: null,
    readback_receipt_ref: null,
    rollback_state: "proposed",
  }),
  [LEARNING_SCHEMA_IDS.writingBenchmarkManifest]: () => ({
    ...commonPayload(),
    benchmark_id: "LIL-WRITE-001",
    task_refs: Array.from({ length: 60 }, (_, index) =>
      digestRef(`benchmark_manifest_task_${index.toString().padStart(2, "0")}`)),
    product_counts: [{ key: "synthetic_product", count: 60 }],
    domain_counts: [{ key: "synthetic_domain", count: 60 }],
    channel_counts: [{ key: "web", count: 60 }],
    locale_counts: [{ key: "en-US", count: 60 }],
    task_type_counts: [{ key: "contextual_microcopy", count: 60 }],
    family_counts: [{ key: "synthetic_family", count: 60 }],
    intersection_counts: [{ keys: ["synthetic_product", "web", "en-US"], count: 60 }],
    training_manifest_ref: digestRef("benchmark_training_manifest"),
    disjointness_check_ref: digestRef("benchmark_disjointness_check"),
    generation_control_ref: digestRef("benchmark_generation_control"),
    metric_contract_ref: digestRef("benchmark_metric_contract"),
    missingness_contract_ref: digestRef("benchmark_missingness_contract"),
    bootstrap_contract_ref: digestRef("benchmark_bootstrap_contract"),
    quality_gate_ref: digestRef("benchmark_quality_gate"),
    manifest_state: "draft",
  }),
  [LEARNING_SCHEMA_IDS.writingBenchmarkTask]: () => ({
    ...commonPayload(),
    manifest_ref: digestRef("benchmark_task_manifest"),
    product_id: "synthetic_product",
    domain: "synthetic_domain",
    channel: "web",
    locale: "en-US",
    task_type: "contextual_microcopy",
    family_id: "synthetic_family",
    task_packet_ref: digestRef("benchmark_task_packet"),
    context_evidence_ref: digestRef("benchmark_task_context_evidence"),
    semantic_lineage_ids: ["synthetic.semantic.lineage"],
    template_ids: ["synthetic.template"],
    leakage_group_ids: ["synthetic.leakage.group"],
    required_facts: [],
    required_actions: [],
    acceptance_criteria: ["The expression is clear and fact preserving."],
    ownership: "project_owned_synthetic",
    generation_config_ref: digestRef("benchmark_task_generation_config"),
    task_state: "frozen",
  }),
  [LEARNING_SCHEMA_IDS.benchmarkCandidateSet]: () => ({
    ...commonPayload(),
    task_ref: digestRef("candidate_set_task"),
    provider_operation_plan_id: "synthetic.plan.00",
    provider_operation_plan_digest: fixtureDigest("candidate-set:provider-plan"),
    nonce_claim_receipt_ref: digestRef("candidate_set_nonce_receipt"),
    provider_receipt_ref: digestRef("candidate_set_provider_receipt"),
    provider_output_digest: fixtureDigest("candidate-set:provider-output"),
    provider_profile_ref: digestRef("candidate_set_provider_profile"),
    returned_model_id: "recorded-provider-synthetic-v1",
    prompt_template_ref: artifactRef("candidate_set_prompt_template"),
    context_ref: digestRef("candidate_set_context"),
    alternatives_count: 4,
    output_token_budget: 512,
    candidates: Array.from({ length: 4 }, (_, position) => ({
      position,
      candidate_id: `synthetic.candidate.${position}`,
      expression_digest: fixtureDigest(`candidate-set:expression:${position}`),
    })),
    candidate_set_digest: fixtureDigest("candidate-set:canonical-preimage"),
    candidate_set_state: "completed_verified_nonquarantined",
  }),
  [LEARNING_SCHEMA_IDS.benchmarkSelection]: () => ({
    ...commonPayload(),
    task_ref: digestRef("selection_task"),
    candidate_set_ref: digestRef("selection_candidate_set"),
    selection_path: "baseline",
    ranker_ref: digestRef("selection_ranker"),
    ordered_candidate_refs: Array.from({ length: 4 }, (_, index) =>
      digestRef(`selection_ordered_candidate_${index}`)),
    candidate_evaluation_refs: Array.from({ length: 4 }, (_, index) =>
      digestRef(`selection_candidate_evaluation_${index}`)),
    selected_candidate_ref: digestRef("selection_selected_candidate"),
    tie_break_trace_ref: digestRef("selection_tie_break_trace"),
    selection_digest: fixtureDigest("selection:canonical-preimage"),
    frozen_before_blinding: true,
    selection_state: "frozen",
  }),
  [LEARNING_SCHEMA_IDS.benchmarkReview]: () => ({
    ...commonPayload(),
    attempt_ref: digestRef("benchmark_review_attempt"),
    task_ref: digestRef("benchmark_review_task"),
    allocation_ref: digestRef("benchmark_review_allocation"),
    randomization_ref: digestRef("benchmark_review_randomization"),
    rubric_ref: artifactRef("benchmark_review_rubric"),
    reviewer_qualification_ref: digestRef("benchmark_review_qualification"),
    reviewer_independence_ref: digestRef("benchmark_review_independence"),
    reviewer_role: "original",
    blinded_pair_ref: digestRef("benchmark_review_blinded_pair"),
    hard_result_refs: [digestRef("benchmark_review_hard_result")],
    advisory_result_refs: [digestRef("benchmark_review_advisory_result")],
    preference: "A",
    reason_codes: ["synthetic_review"],
    accept_as_is: true,
    accepted_edit_ref: null,
    review_duration_ms: 1200,
    context_changed: false,
    candidate_mismatch: false,
    model_mismatch: false,
    adjudicates_review_refs: [],
    review_state: "decisive",
  }),
  [LEARNING_SCHEMA_IDS.benchmarkAttempt]: () => ({
    ...commonPayload(),
    candidate_model_ref: digestRef("benchmark_attempt_candidate_model"),
    manifest_ref: digestRef("benchmark_attempt_manifest"),
    reviewer_allocation_ref: digestRef("benchmark_attempt_reviewer_allocation"),
    rubric_ref: artifactRef("benchmark_attempt_rubric"),
    randomization_ref: digestRef("benchmark_attempt_randomization"),
    analysis_code_ref: artifactRef("benchmark_attempt_analysis_code"),
    provider_operation_plan_set: Array.from({ length: 60 }, (_, index) => ({
      task_id: `synthetic.task.${index.toString().padStart(2, "0")}`,
      plan_id: `synthetic.plan.${index.toString().padStart(2, "0")}`,
      plan_digest: fixtureDigest(`benchmark-attempt:plan:${index}`),
    })),
    provider_operation_plan_set_digest: fixtureDigest("benchmark-attempt:ordered-plan-set"),
    sealed_at: null,
    readback_receipt_ref: null,
    resume_count: 0,
    consumed_at: null,
    consumption_reason: null,
    attempt_state: "draft",
  }),
  [LEARNING_SCHEMA_IDS.writingBenchmarkRun]: () => ({
    ...commonPayload(),
    attempt_ref: digestRef("benchmark_run_attempt"),
    manifest_ref: digestRef("benchmark_run_manifest"),
    baseline_ref: digestRef("benchmark_run_baseline"),
    model_ref: digestRef("benchmark_run_model"),
    candidate_set_refs: [digestRef("benchmark_run_candidate_set")],
    selection_refs: [digestRef("benchmark_run_selection")],
    review_refs: [digestRef("benchmark_run_review")],
    task_disposition_refs: [digestRef("benchmark_run_task_disposition")],
    valid_task_count: 0,
    invalid_task_count: 0,
    slice_count_refs: [digestRef("benchmark_run_slice_count")],
    hard_failure_refs: [],
    metric_result_refs: [digestRef("benchmark_run_metric")],
    bootstrap_result_refs: [digestRef("benchmark_run_bootstrap")],
    predicate_result_refs: [digestRef("benchmark_run_predicate")],
    attempt_consumed: true,
    bounded_claim_status: "none",
    run_state: "not_run",
  }),
} satisfies Record<LearningSchemaId, () => JsonObject>;

function validRecord(schemaId: LearningSchemaId) {
  return finalizeRecord({
    record_id: `fixture.${schemaId.replace(/^contentmd\./, "").replaceAll("-", ".")}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project",
      project_id: "project.synthetic.learning",
      resource_refs: ["fixture.input.synthetic"],
      data_classes: ["project-owned-synthetic"],
    },
    provenance: [{
      record_id: "fixture.source.synthetic",
      relationship: "derived_from",
      content_digest: fixtureDigest("provenance:project-owned-source"),
    }],
    lifecycle_state: "proposed",
    payload: payloadFactories[schemaId](),
  });
}

function mutatedPayloadRecord(
  schemaId: LearningSchemaId,
  mutate: (payload: JsonObject) => void,
) {
  const record = structuredClone(validRecord(schemaId));
  mutate(record.payload);
  return record;
}

function expectSchemaValid(schemaId: LearningSchemaId, value: unknown): void {
  expect(validateRecord(schemaId as never, value)).toEqual({ valid: true, errors: [] });
}

function expectSchemaInvalid(schemaId: LearningSchemaId, value: unknown): void {
  const result = validateRecord(schemaId as never, value);
  expect(result.valid, result.errors.join("\n")).toBe(false);
  expect(result.errors.length).toBeGreaterThan(0);
}

function collectLearningSchemaIds(value: unknown, found = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const entry of value) collectLearningSchemaIds(entry, found);
    return found;
  }
  if (typeof value !== "object" || value === null) return found;

  const object = value as JsonObject;
  const schemaIdProperty = object.schema_id;
  if (typeof schemaIdProperty === "object" && schemaIdProperty !== null) {
    const literal = (schemaIdProperty as JsonObject).const;
    if (typeof literal === "string" && literal.startsWith("contentmd.")) found.add(literal);
  }
  for (const nested of Object.values(object)) collectLearningSchemaIds(nested, found);
  return found;
}

const LOCAL_STATE_FIELDS: Record<LearningSchemaId, string> = {
  [LEARNING_SCHEMA_IDS.generationRun]: "run_state",
  [LEARNING_SCHEMA_IDS.feedbackQualification]: "qualification_state",
  [LEARNING_SCHEMA_IDS.learningEligibility]: "eligibility_state",
  [LEARNING_SCHEMA_IDS.preferenceExample]: "preference_state",
  [LEARNING_SCHEMA_IDS.exemplar]: "exemplar_state",
  [LEARNING_SCHEMA_IDS.leakageGroup]: "group_state",
  [LEARNING_SCHEMA_IDS.learningDatasetManifest]: "dataset_state",
  [LEARNING_SCHEMA_IDS.featureProfile]: "profile_state",
  [LEARNING_SCHEMA_IDS.rankingModel]: "model_state",
  [LEARNING_SCHEMA_IDS.learningEvaluationRun]: "evaluation_state",
  [LEARNING_SCHEMA_IDS.shadowEvaluationPlan]: "plan_state",
  [LEARNING_SCHEMA_IDS.shadowBinding]: "binding_state",
  [LEARNING_SCHEMA_IDS.learningPromotionDecision]: "decision_state",
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding]: "binding_state",
  [LEARNING_SCHEMA_IDS.learningDriftReport]: "window_state",
  [LEARNING_SCHEMA_IDS.learningRollback]: "rollback_state",
  [LEARNING_SCHEMA_IDS.writingBenchmarkManifest]: "manifest_state",
  [LEARNING_SCHEMA_IDS.writingBenchmarkTask]: "task_state",
  [LEARNING_SCHEMA_IDS.benchmarkCandidateSet]: "candidate_set_state",
  [LEARNING_SCHEMA_IDS.benchmarkSelection]: "selection_state",
  [LEARNING_SCHEMA_IDS.benchmarkReview]: "review_state",
  [LEARNING_SCHEMA_IDS.benchmarkAttempt]: "attempt_state",
  [LEARNING_SCHEMA_IDS.writingBenchmarkRun]: "run_state",
};

describe("canonical learning record contracts", () => {
  it("publishes the same exact 23 schema IDs from learning, schemas, schema branches, and fixtures", () => {
    const expected = [...EXPECTED_LEARNING_SCHEMA_IDS].sort();
    const learningDocument = (schemaDocuments as unknown as JsonObject).learning;
    expect(learningDocument).toBeDefined();
    const documentIds = [...collectLearningSchemaIds(learningDocument)].sort();
    const topLevelBranches = learningDocument.oneOf as JsonObject[];
    const definitions = learningDocument.$defs as JsonObject;
    const topLevelRefs = topLevelBranches.map((branch) => branch.$ref);
    const topLevelIds = topLevelRefs.map((reference) => {
      expect(reference).toMatch(/^#\/\$defs\/[A-Za-z][A-Za-z0-9]*Record$/);
      const definitionName = (reference as string).slice("#/$defs/".length);
      const branchIds = [...collectLearningSchemaIds(definitions[definitionName])];
      expect(branchIds).toHaveLength(1);
      return branchIds[0];
    });
    const registryIds = Object.values(SCHEMA_IDS)
      .filter((schemaId) => documentIds.includes(schemaId))
      .sort();

    expect(topLevelRefs).toHaveLength(23);
    expect(new Set(topLevelRefs).size).toBe(23);
    expect(topLevelIds.sort()).toEqual(expected);
    expect(Object.values(LEARNING_SCHEMA_IDS).sort()).toEqual(expected);
    expect(registryIds).toEqual(expected);
    expect(documentIds).toEqual(expected);
    expect(Object.keys(payloadFactories).sort()).toEqual(expected);
  });

  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("accepts a complete finalized %s", (schemaId) => {
    const record = validRecord(schemaId);

    expectSchemaValid(schemaId, record);
    expect(verifyRecordDigest(record)).toEqual({ valid: true });
  });

  it("preserves failed blinding and randomization as schema-valid observable booleans", () => {
    const record = mutatedPayloadRecord(LEARNING_SCHEMA_IDS.feedbackQualification, (payload) => {
      payload.blinded = false;
      payload.randomized = false;
      payload.qualification_state = "not_qualified";
      payload.reason_codes = ["blinding_required", "randomization_required"];
    });

    expectSchemaValid(LEARNING_SCHEMA_IDS.feedbackQualification, record);
  });

  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("rejects %s without a common required field", (schemaId) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      delete payload.schema_digest;
    });

    expectSchemaInvalid(schemaId, record);
  });

  it.each([
    ["ranking_objective", "pattern_relevance"],
    ["candidate_kind", "pattern"],
    ["authority_effect", "writes_everywhere"],
  ] as const)("rejects every record with wrong shared %s", (field, wrongValue) => {
    for (const schemaId of EXPECTED_LEARNING_SCHEMA_IDS) {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload[field] = wrongValue;
      });
      expectSchemaInvalid(schemaId, record);
    }
  });

  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("rejects an unknown top-level payload field in %s", (schemaId) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      payload.unknown_payload_field = "must fail closed";
    });

    expectSchemaInvalid(schemaId, record);
  });

  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("rejects a malformed shared digest in %s", (schemaId) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      payload.code_digest = "ABC123";
    });

    expectSchemaInvalid(schemaId, record);
  });

  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("rejects an invalid local-state enum in %s", (schemaId) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      payload[LOCAL_STATE_FIELDS[schemaId]] = "invented_state";
    });

    expectSchemaInvalid(schemaId, record);
  });
});

const NESTED_UNKNOWN_CASES: readonly [
  string,
  LearningSchemaId,
  (payload: JsonObject) => void,
][] = [
  ["digest reference", LEARNING_SCHEMA_IDS.generationRun, (payload) => {
    (payload.task_ref as JsonObject).unknown_nested_field = true;
  }],
  ["artifact reference", LEARNING_SCHEMA_IDS.generationRun, (payload) => {
    (payload.prompt_ref as JsonObject).unknown_nested_field = true;
  }],
  ["leakage edge", LEARNING_SCHEMA_IDS.leakageGroup, (payload) => {
    ((payload.edges as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["dataset exclusion", LEARNING_SCHEMA_IDS.learningDatasetManifest, (payload) => {
    ((payload.exclusions as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["dataset counts", LEARNING_SCHEMA_IDS.learningDatasetManifest, (payload) => {
    (payload.counts as JsonObject).unknown_nested_field = true;
  }],
  ["feature definition", LEARNING_SCHEMA_IDS.featureProfile, (payload) => {
    ((payload.features as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["model hyperparameters", LEARNING_SCHEMA_IDS.rankingModel, (payload) => {
    (payload.hyperparameters as JsonObject).unknown_nested_field = true;
  }],
  ["standardization entry", LEARNING_SCHEMA_IDS.rankingModel, (payload) => {
    ((payload.standardization as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["count entry", LEARNING_SCHEMA_IDS.writingBenchmarkManifest, (payload) => {
    ((payload.product_counts as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["intersection count", LEARNING_SCHEMA_IDS.writingBenchmarkManifest, (payload) => {
    ((payload.intersection_counts as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["candidate entry", LEARNING_SCHEMA_IDS.benchmarkCandidateSet, (payload) => {
    ((payload.candidates as JsonObject[])[0]).unknown_nested_field = true;
  }],
  ["provider plan entry", LEARNING_SCHEMA_IDS.benchmarkAttempt, (payload) => {
    ((payload.provider_operation_plan_set as JsonObject[])[0]).unknown_nested_field = true;
  }],
];

const OFFICIAL_AUTHORITY_STATES: readonly [
  LearningSchemaId,
  string,
  string,
  string,
][] = [
  [LEARNING_SCHEMA_IDS.shadowBinding, "binding_state", "active", "shadow_observation_only"],
  [LEARNING_SCHEMA_IDS.shadowBinding, "binding_state", "completed", "shadow_observation_only"],
  [LEARNING_SCHEMA_IDS.shadowBinding, "binding_state", "suspended", "shadow_observation_only"],
  [LEARNING_SCHEMA_IDS.learningPromotionDecision, "decision_state", "approved", "promotion_decision_only"],
  [LEARNING_SCHEMA_IDS.learningPromotionDecision, "decision_state", "narrowed", "promotion_decision_only"],
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding, "binding_state", "active", "deployment_binding"],
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding, "binding_state", "suspended", "deployment_binding"],
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding, "binding_state", "superseded", "deployment_binding"],
  [LEARNING_SCHEMA_IDS.learningRollback, "rollback_state", "restored", "rollback_binding"],
  [LEARNING_SCHEMA_IDS.learningRollback, "rollback_state", "fallback_baseline", "rollback_binding"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "sealed", "benchmark_attempt_control"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "in_progress", "benchmark_attempt_control"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "interrupted", "benchmark_attempt_control"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "invalid_run", "benchmark_attempt_consumption"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "consumed", "benchmark_attempt_consumption"],
];

const OFFICIAL_NO_AUTHORITY_STATES: readonly [LearningSchemaId, string, string][] = [
  [LEARNING_SCHEMA_IDS.shadowBinding, "binding_state", "proposed"],
  [LEARNING_SCHEMA_IDS.learningPromotionDecision, "decision_state", "proposed"],
  [LEARNING_SCHEMA_IDS.learningPromotionDecision, "decision_state", "rejected"],
  [LEARNING_SCHEMA_IDS.learningPromotionDecision, "decision_state", "superseded"],
  [LEARNING_SCHEMA_IDS.learningDeploymentBinding, "binding_state", "proposed"],
  [LEARNING_SCHEMA_IDS.learningRollback, "rollback_state", "proposed"],
  [LEARNING_SCHEMA_IDS.learningRollback, "rollback_state", "rejected"],
  [LEARNING_SCHEMA_IDS.benchmarkAttempt, "attempt_state", "draft"],
];

describe("closed nested shapes and authority branches", () => {
  it.each(NESTED_UNKNOWN_CASES)("rejects an unknown field in a %s", (_label, schemaId, mutate) => {
    expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, mutate));
  });

  it.each(OFFICIAL_AUTHORITY_STATES)(
    "accepts official %s %s=%s with %s",
    (schemaId, stateField, state, effect) => {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.record_mode = "official";
        payload[stateField] = state;
        payload.authority_effect = effect;
      });
      expectSchemaValid(schemaId, record);
    },
  );

  it.each(OFFICIAL_NO_AUTHORITY_STATES)(
    "accepts official non-authoritative %s %s=%s",
    (schemaId, stateField, state) => {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.record_mode = "official";
        payload[stateField] = state;
        payload.authority_effect = "none";
      });
      expectSchemaValid(schemaId, record);
    },
  );

  it.each(OFFICIAL_AUTHORITY_STATES)(
    "rejects development-fixture %s %s=%s even with no authority effect",
    (schemaId, stateField, state) => {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload[stateField] = state;
        payload.authority_effect = "none";
      });
      expectSchemaInvalid(schemaId, record);
    },
  );

  it.each(OFFICIAL_AUTHORITY_STATES)(
    "rejects official %s %s=%s without its required authority effect",
    (schemaId, stateField, state) => {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.record_mode = "official";
        payload[stateField] = state;
        payload.authority_effect = "none";
      });
      expectSchemaInvalid(schemaId, record);
    },
  );

  it.each([
    LEARNING_SCHEMA_IDS.shadowBinding,
    LEARNING_SCHEMA_IDS.learningPromotionDecision,
    LEARNING_SCHEMA_IDS.learningDeploymentBinding,
    LEARNING_SCHEMA_IDS.learningRollback,
    LEARNING_SCHEMA_IDS.benchmarkAttempt,
  ] as const)("rejects a non-none authority effect in the non-authoritative %s starting state", (schemaId) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      payload.record_mode = "official";
      payload.authority_effect = "benchmark_attempt_control";
    });
    expectSchemaInvalid(schemaId, record);
  });

  it("rejects legal-but-disallowed authority effects for all eighteen non-authority families", () => {
    const authorityFamilies = new Set<LearningSchemaId>([
      LEARNING_SCHEMA_IDS.shadowBinding,
      LEARNING_SCHEMA_IDS.learningPromotionDecision,
      LEARNING_SCHEMA_IDS.learningDeploymentBinding,
      LEARNING_SCHEMA_IDS.learningRollback,
      LEARNING_SCHEMA_IDS.benchmarkAttempt,
    ]);

    for (const schemaId of EXPECTED_LEARNING_SCHEMA_IDS) {
      if (authorityFamilies.has(schemaId)) continue;
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.record_mode = "official";
        payload.authority_effect = "shadow_observation_only";
      });
      expectSchemaInvalid(schemaId, record);
    }
  });
});

const EXACT_ARRAY_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  field: string;
  exact: 4 | 60;
  extraEntry: () => unknown;
}[] = [
  {
    label: "benchmark manifest task refs",
    schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest,
    field: "task_refs",
    exact: 60,
    extraEntry: () => digestRef("benchmark_manifest_task_extra"),
  },
  {
    label: "benchmark attempt operation-plan set",
    schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt,
    field: "provider_operation_plan_set",
    exact: 60,
    extraEntry: () => ({
      task_id: "synthetic.task.extra",
      plan_id: "synthetic.plan.extra",
      plan_digest: fixtureDigest("benchmark-attempt:plan:extra"),
    }),
  },
  {
    label: "benchmark candidates",
    schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet,
    field: "candidates",
    exact: 4,
    extraEntry: () => ({
      position: 0,
      candidate_id: "synthetic.candidate.extra",
      expression_digest: fixtureDigest("candidate-set:expression:extra"),
    }),
  },
  {
    label: "ordered candidate refs",
    schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection,
    field: "ordered_candidate_refs",
    exact: 4,
    extraEntry: () => digestRef("selection_ordered_candidate_extra"),
  },
  {
    label: "candidate evaluation refs",
    schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection,
    field: "candidate_evaluation_refs",
    exact: 4,
    extraEntry: () => digestRef("selection_candidate_evaluation_extra"),
  },
];

const DUPLICATE_ARRAY_CASES: readonly [
  string,
  LearningSchemaId,
  (payload: JsonObject) => unknown[],
][] = [
  ["rationale code", LEARNING_SCHEMA_IDS.feedbackQualification, (payload) =>
    payload.rationale_codes as unknown[]],
  ["digest reference", LEARNING_SCHEMA_IDS.exemplar, (payload) =>
    payload.transfer_condition_refs as unknown[]],
  ["leakage edge", LEARNING_SCHEMA_IDS.leakageGroup, (payload) =>
    payload.edges as unknown[]],
  ["dataset exclusion", LEARNING_SCHEMA_IDS.learningDatasetManifest, (payload) =>
    payload.exclusions as unknown[]],
  ["feature definition", LEARNING_SCHEMA_IDS.featureProfile, (payload) =>
    payload.features as unknown[]],
  ["string ID", LEARNING_SCHEMA_IDS.writingBenchmarkTask, (payload) =>
    payload.semantic_lineage_ids as unknown[]],
  ["count entry", LEARNING_SCHEMA_IDS.writingBenchmarkManifest, (payload) =>
    payload.product_counts as unknown[]],
];

describe("cardinality, uniqueness, routing, and digest truth", () => {
  it.each(EXACT_ARRAY_CASES)("requires exactly $exact entries for $label", (testCase) => {
    for (const length of [testCase.exact - 1, testCase.exact + 1]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        const array = payload[testCase.field] as unknown[];
        if (length < testCase.exact) array.pop();
        else array.push(testCase.extraEntry());
      });
      expectSchemaInvalid(testCase.schemaId, record);
    }
  });

  it.each(EXACT_ARRAY_CASES)("rejects a duplicate whole entry in $label", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      const array = payload[testCase.field] as unknown[];
      array[array.length - 1] = structuredClone(array[0]);
    });
    expectSchemaInvalid(testCase.schemaId, record);
  });

  it.each(DUPLICATE_ARRAY_CASES)("rejects a duplicate whole-array %s", (_label, schemaId, select) => {
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      const array = select(payload);
      array.push(structuredClone(array[0]));
    });
    expectSchemaInvalid(schemaId, record);
  });

  it("rejects duplicate values in nested intersection keys", () => {
    const schemaId = LEARNING_SCHEMA_IDS.writingBenchmarkManifest;
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      const intersection = (payload.intersection_counts as JsonObject[])[0];
      const keys = intersection.keys as unknown[];
      keys.push(keys[0]);
    });
    expectSchemaInvalid(schemaId, record);
  });

  it("rejects duplicate scope and provenance entries", () => {
    const schemaId = LEARNING_SCHEMA_IDS.generationRun;
    const duplicateScope = structuredClone(validRecord(schemaId));
    duplicateScope.scope.resource_refs.push(duplicateScope.scope.resource_refs[0]);
    expectSchemaInvalid(schemaId, duplicateScope);

    const duplicateProvenance = structuredClone(validRecord(schemaId));
    duplicateProvenance.provenance.push(structuredClone(duplicateProvenance.provenance[0]));
    expectSchemaInvalid(schemaId, duplicateProvenance);
  });

  it("requires at least one digest-bound provenance entry", () => {
    const schemaId = LEARNING_SCHEMA_IDS.generationRun;
    const record = structuredClone(validRecord(schemaId));
    record.provenance = [];

    expectSchemaInvalid(schemaId, record);
  });

  it.each([
    [LEARNING_SCHEMA_IDS.generationRun, (payload: JsonObject) => {
      (payload.task_ref as JsonObject).content_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.generationRun, (payload: JsonObject) => {
      (payload.prompt_ref as JsonObject).artifact_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.rankingModel, (payload: JsonObject) => {
      payload.model_artifact_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.benchmarkCandidateSet, (payload: JsonObject) => {
      payload.candidate_set_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.benchmarkSelection, (payload: JsonObject) => {
      payload.selection_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.benchmarkAttempt, (payload: JsonObject) => {
      payload.provider_operation_plan_set_digest = "not-a-digest";
    }],
    [LEARNING_SCHEMA_IDS.benchmarkAttempt, (payload: JsonObject) => {
      ((payload.provider_operation_plan_set as JsonObject[])[0]).plan_digest = "not-a-digest";
    }],
  ] as const)("rejects a malformed nested or derived digest in %s", (schemaId, mutate) => {
    expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, mutate));
  });

  it("rejects a schema selector mismatch before branch validation", () => {
    const record = validRecord(LEARNING_SCHEMA_IDS.generationRun);
    const result = validateRecord(LEARNING_SCHEMA_IDS.feedbackQualification as never, record);

    expect(result.valid).toBe(false);
    expect(result.errors).toEqual([
      `schema_id mismatch: expected ${LEARNING_SCHEMA_IDS.feedbackQualification}, received ${LEARNING_SCHEMA_IDS.generationRun}`,
    ]);
  });

  it("keeps schema validity separate from outer digest truth", () => {
    const schemaId = LEARNING_SCHEMA_IDS.generationRun;
    const record = structuredClone(validRecord(schemaId));
    record.payload.run_state = "refused";

    expectSchemaValid(schemaId, record);
    expect(verifyRecordDigest(record)).toEqual({
      valid: false,
      reason: "content_digest_mismatch",
    });
  });

  it("does not mistake semantic plan-ID uniqueness for whole-entry uniqueness", () => {
    const schemaId = LEARNING_SCHEMA_IDS.benchmarkAttempt;
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      const entries = payload.provider_operation_plan_set as JsonObject[];
      entries[1].task_id = entries[0].task_id;
    });

    expectSchemaValid(schemaId, record);
  });

  it("does not claim to recompute a structurally valid derived digest", () => {
    const schemaId = LEARNING_SCHEMA_IDS.benchmarkCandidateSet;
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      payload.candidate_set_digest = fixtureDigest("deliberately-different-valid-shape-digest");
    });

    expectSchemaValid(schemaId, record);
    expect(verifyRecordDigest(record)).toEqual({
      valid: false,
      reason: "content_digest_mismatch",
    });
  });
});

type JsonPath = readonly (string | number)[];

function valueAtPath(root: unknown, path: JsonPath): unknown {
  let value = root;
  for (const segment of path) {
    value = (value as Record<string | number, unknown>)[segment];
  }
  return value;
}

function setAtPath(root: unknown, path: JsonPath, value: unknown): void {
  const parent = valueAtPath(root, path.slice(0, -1)) as Record<string | number, unknown>;
  parent[path[path.length - 1]] = value;
}

function deleteAtPath(root: unknown, path: JsonPath): void {
  const parent = valueAtPath(root, path.slice(0, -1)) as Record<string | number, unknown>;
  delete parent[path[path.length - 1]];
}

const NESTED_REQUIRED_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
}[] = [
  { label: "digest reference", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["task_ref"] },
  { label: "artifact reference", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["prompt_ref"] },
  { label: "leakage edge", schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: ["edges", 0] },
  { label: "dataset exclusion", schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, path: ["exclusions", 0] },
  { label: "dataset counts", schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, path: ["counts"] },
  { label: "feature definition", schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: ["features", 0] },
  { label: "model hyperparameters", schemaId: LEARNING_SCHEMA_IDS.rankingModel, path: ["hyperparameters"] },
  { label: "standardization entry", schemaId: LEARNING_SCHEMA_IDS.rankingModel, path: ["standardization", 0] },
  { label: "count entry", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: ["product_counts", 0] },
  { label: "intersection count", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: ["intersection_counts", 0] },
  { label: "candidate entry", schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, path: ["candidates", 0] },
  { label: "provider plan entry", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["provider_operation_plan_set", 0] },
];

const LOCAL_STATE_ACCEPTANCE_GROUPS: readonly {
  schemaId: LearningSchemaId;
  stateField: string;
  states: readonly string[];
  recordMode: "development_fixture" | "official";
  authorityEffect: string;
}[] = [
  { schemaId: LEARNING_SCHEMA_IDS.generationRun, stateField: "run_state", states: ["completed", "refused", "incomplete", "invalid", "transport_failed"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, stateField: "qualification_state", states: ["qualified", "not_qualified", "abstained", "invalid"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningEligibility, stateField: "eligibility_state", states: ["eligible", "ineligible"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.preferenceExample, stateField: "preference_state", states: ["admitted", "invalidated", "revoked"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.exemplar, stateField: "exemplar_state", states: ["approved_current", "expired", "revoked"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.leakageGroup, stateField: "group_state", states: ["frozen"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, stateField: "dataset_state", states: ["diagnostics_only", "training_eligible", "sealed", "test_opened", "invalid"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.featureProfile, stateField: "profile_state", states: ["frozen"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.rankingModel, stateField: "model_state", states: ["trained", "nonconverged", "invalid"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningEvaluationRun, stateField: "evaluation_state", states: ["not_run", "invalid", "failed", "passed"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, stateField: "plan_state", states: ["proposed", "ready", "invalid"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, stateField: "window_state", states: ["evaluable", "monitoring_insufficient"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, stateField: "manifest_state", states: ["draft", "sealed", "opened", "retired"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, stateField: "task_state", states: ["frozen"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, stateField: "candidate_set_state", states: ["completed_verified_nonquarantined"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection, stateField: "selection_state", states: ["frozen"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, stateField: "review_state", states: ["decisive", "tie", "abstained", "invalid"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkRun, stateField: "run_state", states: ["not_run", "invalid_run", "failed", "passed"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.shadowBinding, stateField: "binding_state", states: ["proposed"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.shadowBinding, stateField: "binding_state", states: ["active", "completed", "suspended"], recordMode: "official", authorityEffect: "shadow_observation_only" },
  { schemaId: LEARNING_SCHEMA_IDS.learningPromotionDecision, stateField: "decision_state", states: ["proposed", "rejected", "superseded"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningPromotionDecision, stateField: "decision_state", states: ["approved", "narrowed"], recordMode: "official", authorityEffect: "promotion_decision_only" },
  { schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, stateField: "binding_state", states: ["proposed"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, stateField: "binding_state", states: ["active", "suspended", "superseded"], recordMode: "official", authorityEffect: "deployment_binding" },
  { schemaId: LEARNING_SCHEMA_IDS.learningRollback, stateField: "rollback_state", states: ["proposed", "rejected"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.learningRollback, stateField: "rollback_state", states: ["restored", "fallback_baseline"], recordMode: "official", authorityEffect: "rollback_binding" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, stateField: "attempt_state", states: ["draft"], recordMode: "development_fixture", authorityEffect: "none" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, stateField: "attempt_state", states: ["sealed", "in_progress", "interrupted"], recordMode: "official", authorityEffect: "benchmark_attempt_control" },
  { schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, stateField: "attempt_state", states: ["invalid_run", "consumed"], recordMode: "official", authorityEffect: "benchmark_attempt_consumption" },
];

const LOCAL_STATE_ACCEPTANCE_CASES = LOCAL_STATE_ACCEPTANCE_GROUPS.flatMap((group) =>
  group.states.map((state) => ({ ...group, state })),
);

const NULLABLE_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
  typedValue: unknown;
}[] = [
  { label: "generation retrieval snapshot", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["retrieval_snapshot_ref"], typedValue: digestRef("nullable_generation_retrieval") },
  { label: "generation output", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["output_ref"], typedValue: digestRef("nullable_generation_output") },
  { label: "generation proposal", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["proposal_ref"], typedValue: digestRef("nullable_generation_proposal") },
  { label: "feedback adjudication", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["adjudication_ref"], typedValue: digestRef("nullable_feedback_adjudication") },
  { label: "eligibility permission", schemaId: LEARNING_SCHEMA_IDS.learningEligibility, path: ["permission_ref"], typedValue: digestRef("nullable_eligibility_permission") },
  { label: "feature missing indicator", schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: ["features", 0, "missing_indicator_name"], typedValue: "length_delta_missing" },
  { label: "evaluation test-open receipt", schemaId: LEARNING_SCHEMA_IDS.learningEvaluationRun, path: ["test_open_receipt_ref"], typedValue: digestRef("nullable_evaluation_test_open") },
  { label: "evaluation bootstrap", schemaId: LEARNING_SCHEMA_IDS.learningEvaluationRun, path: ["bootstrap_ref"], typedValue: digestRef("nullable_evaluation_bootstrap") },
  { label: "shadow effective timestamp", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["effective_at"], typedValue: "2026-08-20T12:34:56.789+05:30" },
  { label: "shadow expiry timestamp", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["expires_at"], typedValue: "2026-08-20T12:34:56.789+05:30" },
  { label: "shadow active output digest", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["active_output_digest"], typedValue: fixtureDigest("nullable_shadow_active_output") },
  { label: "shadow candidate output digest", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["shadow_output_digest"], typedValue: fixtureDigest("nullable_shadow_candidate_output") },
  { label: "promotion approval", schemaId: LEARNING_SCHEMA_IDS.learningPromotionDecision, path: ["approval_ref"], typedValue: digestRef("nullable_promotion_approval") },
  { label: "deployment model", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["model_ref"], typedValue: digestRef("nullable_deployment_model") },
  { label: "deployment promotion", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["promotion_decision_ref"], typedValue: digestRef("nullable_deployment_promotion") },
  { label: "deployment previous binding", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["previous_binding_ref"], typedValue: digestRef("nullable_deployment_previous") },
  { label: "deployment readback", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["readback_receipt_ref"], typedValue: digestRef("nullable_deployment_readback") },
  { label: "deployment effective timestamp", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["effective_at"], typedValue: "2026-08-20T12:34:56.789+05:30" },
  { label: "drift model", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["model_ref"], typedValue: digestRef("nullable_drift_model") },
  { label: "rollback target binding", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["target_binding_ref"], typedValue: digestRef("nullable_rollback_target_binding") },
  { label: "rollback target model", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["target_model_ref"], typedValue: digestRef("nullable_rollback_target_model") },
  { label: "rollback authorization", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["authorization_ref"], typedValue: digestRef("nullable_rollback_authorization") },
  { label: "rollback resulting binding", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["resulting_binding_ref"], typedValue: digestRef("nullable_rollback_resulting_binding") },
  { label: "rollback readback", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["readback_receipt_ref"], typedValue: digestRef("nullable_rollback_readback") },
  { label: "review accept-as-is", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["accept_as_is"], typedValue: false },
  { label: "review accepted edit", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["accepted_edit_ref"], typedValue: digestRef("nullable_review_accepted_edit") },
  { label: "review duration", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["review_duration_ms"], typedValue: 0 },
  { label: "attempt sealed timestamp", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["sealed_at"], typedValue: "2026-08-20T12:34:56.789+05:30" },
  { label: "attempt readback", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["readback_receipt_ref"], typedValue: digestRef("nullable_attempt_readback") },
  { label: "attempt consumed timestamp", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["consumed_at"], typedValue: "2026-08-20T12:34:56.789+05:30" },
  { label: "attempt consumption reason", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["consumption_reason"], typedValue: "quality_gate_opened" },
];

describe("complete required-key, state, and nullable branch coverage", () => {
  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("requires every shared and record-specific payload key in %s", (schemaId) => {
    for (const field of Object.keys(validRecord(schemaId).payload)) {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        delete payload[field];
      });
      expectSchemaInvalid(schemaId, record);
    }
  });

  it.each(NESTED_REQUIRED_CASES)("requires every key in the $label nested shape", (testCase) => {
    const nested = valueAtPath(validRecord(testCase.schemaId).payload, testCase.path) as JsonObject;
    for (const field of Object.keys(nested)) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        deleteAtPath(payload, [...testCase.path, field]);
      });
      expectSchemaInvalid(testCase.schemaId, record);
    }
  });

  it.each(LOCAL_STATE_ACCEPTANCE_CASES)(
    "accepts $schemaId $stateField=$state in its exact authority branch",
    (testCase) => {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        payload.record_mode = testCase.recordMode;
        payload.authority_effect = testCase.authorityEffect;
        payload[testCase.stateField] = testCase.state;
      });
      expectSchemaValid(testCase.schemaId, record);
    },
  );

  it.each(NULLABLE_CASES)("accepts null and typed branches but requires the $label key", (testCase) => {
    const nullRecord = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, null);
    });
    expectSchemaValid(testCase.schemaId, nullRecord);

    const typedRecord = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, structuredClone(testCase.typedValue));
    });
    expectSchemaValid(testCase.schemaId, typedRecord);

    const omittedRecord = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      deleteAtPath(payload, testCase.path);
    });
    expectSchemaInvalid(testCase.schemaId, omittedRecord);
  });
});

const INVALID_CLOSED_VALUE_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
  invalidValue: unknown;
}[] = [
  { label: "contract version", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["contract_version"], invalidValue: "contentmd.learning-record-contract/9.9.9" },
  { label: "record mode", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["record_mode"], invalidValue: "preview" },
  { label: "ranking objective", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["ranking_objective"], invalidValue: "pattern_relevance" },
  { label: "candidate kind", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["candidate_kind"], invalidValue: "pattern" },
  { label: "authority effect", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["authority_effect"], invalidValue: "writes_everywhere" },
  { label: "digest-ref schema version", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["task_ref", "schema_version"], invalidValue: "0.2.0" },
  { label: "blinded review boolean", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["blinded"], invalidValue: "unknown" },
  { label: "randomized review boolean", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["randomized"], invalidValue: "unknown" },
  { label: "qualification outcome", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["outcome"], invalidValue: "C" },
  { label: "conflict state", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["conflict_state"], invalidValue: "waived" },
  { label: "target memory scope", schemaId: LEARNING_SCHEMA_IDS.learningEligibility, path: ["target_memory_scope"], invalidValue: "global" },
  ...["rights_check", "privacy_check", "factual_check", "policy_check", "incident_check", "context_check"].map((field) => ({
    label: field.replaceAll("_", " "),
    schemaId: LEARNING_SCHEMA_IDS.learningEligibility,
    path: [field] as JsonPath,
    invalidValue: "skipped",
  })),
  { label: "presented order", schemaId: LEARNING_SCHEMA_IDS.preferenceExample, path: ["presented_order"], invalidValue: ["A", "A"] },
  { label: "preferred side", schemaId: LEARNING_SCHEMA_IDS.preferenceExample, path: ["preferred_side"], invalidValue: "C" },
  { label: "preference label", schemaId: LEARNING_SCHEMA_IDS.preferenceExample, path: ["label"], invalidValue: 2 },
  { label: "exemplar kind", schemaId: LEARNING_SCHEMA_IDS.exemplar, path: ["exemplar_kind"], invalidValue: "template" },
  { label: "exemplar currentness", schemaId: LEARNING_SCHEMA_IDS.exemplar, path: ["currentness_state"], invalidValue: "stale" },
  { label: "leakage rule version", schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: ["rule_version"], invalidValue: "contentmd.leakage-group/0.2.0" },
  { label: "leakage-edge reason", schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: ["edges", 0, "reason"], invalidValue: "looks_similar" },
  { label: "leakage split", schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: ["split"], invalidValue: "holdout" },
  { label: "test-open state", schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, path: ["test_open_state"], invalidValue: "partly_open" },
  { label: "feature-profile version", schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: ["feature_profile_version"], invalidValue: "rank-features/0.2.0" },
  { label: "feature value type", schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: ["features", 0, "value_type"], invalidValue: "text" },
  { label: "ranking algorithm", schemaId: LEARNING_SCHEMA_IDS.rankingModel, path: ["algorithm"], invalidValue: "neural_ranker" },
  ...Object.entries({
    lambda: 2,
    learning_rate: 0.1,
    maximum_iterations: 1999,
    convergence_delta: 1e-8,
    convergence_patience: 11,
    standardized_clip_lower: -9,
    standardized_clip_upper: 9,
  }).map(([field, invalidValue]) => ({
    label: `hyperparameter ${field}`,
    schemaId: LEARNING_SCHEMA_IDS.rankingModel,
    path: ["hyperparameters", field] as JsonPath,
    invalidValue,
  })),
  { label: "shadow minimum decisive pairs", schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, path: ["minimum_decisive_pairs"], invalidValue: 49 },
  { label: "shadow minimum leakage groups", schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, path: ["minimum_leakage_groups"], invalidValue: 19 },
  { label: "shadow minimum calendar days", schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, path: ["minimum_calendar_days"], invalidValue: 13 },
  { label: "shadow-plan no-influence constant", schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, path: ["no_influence"], invalidValue: false },
  { label: "shadow-binding no-influence constant", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["no_influence"], invalidValue: false },
  { label: "drift disposition", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["disposition"], invalidValue: "ignore" },
  { label: "benchmark manifest ID", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: ["benchmark_id"], invalidValue: "LIL-WRITE-002" },
  { label: "benchmark channel", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: ["channel"], invalidValue: "print" },
  { label: "benchmark task type", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: ["task_type"], invalidValue: "translation" },
  { label: "benchmark ownership", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: ["ownership"], invalidValue: "public_scrape" },
  { label: "candidate position", schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, path: ["candidates", 0, "position"], invalidValue: 4 },
  { label: "alternatives count", schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, path: ["alternatives_count"], invalidValue: 5 },
  { label: "output token budget", schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, path: ["output_token_budget"], invalidValue: 513 },
  { label: "selection path", schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection, path: ["selection_path"], invalidValue: "hybrid" },
  { label: "frozen-before-blinding constant", schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection, path: ["frozen_before_blinding"], invalidValue: false },
  { label: "reviewer role", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["reviewer_role"], invalidValue: "observer" },
  { label: "review preference", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["preference"], invalidValue: "both" },
  { label: "attempt consumption reason", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["consumption_reason"], invalidValue: "manual_stop" },
  { label: "run consumed constant", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkRun, path: ["attempt_consumed"], invalidValue: false },
  { label: "bounded claim status", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkRun, path: ["bounded_claim_status"], invalidValue: "production_superiority" },
];

const NONEMPTY_ARRAY_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
}[] = [
  { label: "feedback rationale codes", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["rationale_codes"] },
  { label: "eligibility reason codes", schemaId: LEARNING_SCHEMA_IDS.learningEligibility, path: ["reason_codes"] },
  { label: "exemplar transfer conditions", schemaId: LEARNING_SCHEMA_IDS.exemplar, path: ["transfer_condition_refs"] },
  ...["normalization_artifact_refs", "member_refs"].map((field) => ({ label: `leakage ${field}`, schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: [field] as JsonPath })),
  ...["example_refs", "leakage_group_refs", "train_example_refs", "validation_example_refs", "test_example_refs", "permission_refs", "feature_source_checkpoint_refs"].map((field) => ({ label: `dataset ${field}`, schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, path: [field] as JsonPath })),
  ...["features", "source_artifact_refs", "forbidden_input_fields"].map((field) => ({ label: `feature-profile ${field}`, schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: [field] as JsonPath })),
  ...["feature_order", "standardization", "coefficient_bits"].map((field) => ({ label: `ranking-model ${field}`, schemaId: LEARNING_SCHEMA_IDS.rankingModel, path: [field] as JsonPath })),
  ...["overall_metric_refs", "slice_metric_refs", "predicate_result_refs"].map((field) => ({ label: `evaluation ${field}`, schemaId: LEARNING_SCHEMA_IDS.learningEvaluationRun, path: [field] as JsonPath })),
  ...["required_slice_refs", "metric_refs", "gate_refs"].map((field) => ({ label: `shadow-plan ${field}`, schemaId: LEARNING_SCHEMA_IDS.shadowEvaluationPlan, path: [field] as JsonPath })),
  { label: "promotion required slices", schemaId: LEARNING_SCHEMA_IDS.learningPromotionDecision, path: ["required_slice_refs"] },
  { label: "drift metric deltas", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["metric_delta_refs"] },
  { label: "rollback revalidations", schemaId: LEARNING_SCHEMA_IDS.learningRollback, path: ["revalidation_refs"] },
  ...["task_refs", "product_counts", "domain_counts", "channel_counts", "locale_counts", "task_type_counts", "family_counts", "intersection_counts"].map((field) => ({ label: `benchmark manifest ${field}`, schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: [field] as JsonPath })),
  ...["semantic_lineage_ids", "template_ids", "leakage_group_ids", "acceptance_criteria"].map((field) => ({ label: `benchmark task ${field}`, schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: [field] as JsonPath })),
  { label: "candidate set candidates", schemaId: LEARNING_SCHEMA_IDS.benchmarkCandidateSet, path: ["candidates"] },
  ...["ordered_candidate_refs", "candidate_evaluation_refs"].map((field) => ({ label: `selection ${field}`, schemaId: LEARNING_SCHEMA_IDS.benchmarkSelection, path: [field] as JsonPath })),
  ...["hard_result_refs", "advisory_result_refs", "reason_codes"].map((field) => ({ label: `review ${field}`, schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: [field] as JsonPath })),
  { label: "attempt provider plans", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["provider_operation_plan_set"] },
  ...["candidate_set_refs", "selection_refs", "review_refs", "task_disposition_refs", "slice_count_refs", "metric_result_refs", "bootstrap_result_refs", "predicate_result_refs"].map((field) => ({ label: `benchmark run ${field}`, schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkRun, path: [field] as JsonPath })),
  { label: "intersection keys", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: ["intersection_counts", 0, "keys"] },
];

const EMPTY_ALLOWED_ARRAY_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
  sample: unknown;
}[] = [
  { label: "leakage edges", schemaId: LEARNING_SCHEMA_IDS.leakageGroup, path: ["edges"], sample: { left_ref: digestRef("empty_allowed_leakage_left"), right_ref: digestRef("empty_allowed_leakage_right"), reason: "near_duplicate" } },
  { label: "generation critiques", schemaId: LEARNING_SCHEMA_IDS.generationRun, path: ["critique_refs"], sample: digestRef("empty_allowed_generation_critique") },
  { label: "qualification reason codes", schemaId: LEARNING_SCHEMA_IDS.feedbackQualification, path: ["reason_codes"], sample: "synthetic_reason" },
  { label: "dataset exclusions", schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest, path: ["exclusions"], sample: { example_ref: digestRef("empty_allowed_exclusion"), reason_code: "synthetic_exclusion" } },
  { label: "evaluation failures", schemaId: LEARNING_SCHEMA_IDS.learningEvaluationRun, path: ["failure_refs"], sample: digestRef("empty_allowed_evaluation_failure") },
  { label: "drift immediate failures", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["immediate_failure_refs"], sample: digestRef("empty_allowed_drift_failure") },
  { label: "task required facts", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: ["required_facts"], sample: "synthetic fact" },
  { label: "task required actions", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkTask, path: ["required_actions"], sample: "synthetic action" },
  { label: "review adjudications", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["adjudicates_review_refs"], sample: digestRef("empty_allowed_review_adjudication") },
  { label: "run hard failures", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkRun, path: ["hard_failure_refs"], sample: digestRef("empty_allowed_run_failure") },
];

describe("closed values and array contracts", () => {
  it.each(INVALID_CLOSED_VALUE_CASES)("rejects an invalid $label member", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, structuredClone(testCase.invalidValue));
    });
    expectSchemaInvalid(testCase.schemaId, record);
  });

  it.each(NONEMPTY_ARRAY_CASES)("rejects an empty $label array", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, []);
    });
    expectSchemaInvalid(testCase.schemaId, record);
  });

  it.each(EMPTY_ALLOWED_ARRAY_CASES)("accepts an explicitly empty $label array", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, []);
    });
    expectSchemaValid(testCase.schemaId, record);
  });

  it.each(NONEMPTY_ARRAY_CASES)("rejects whole-entry duplication in $label", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      const array = valueAtPath(payload, testCase.path) as unknown[];
      if (array.length === 1) array.push(structuredClone(array[0]));
      else array[array.length - 1] = structuredClone(array[0]);
    });
    expectSchemaInvalid(testCase.schemaId, record);
  });

  it.each(EMPTY_ALLOWED_ARRAY_CASES)("rejects whole-entry duplication in empty-allowed $label", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, [structuredClone(testCase.sample), structuredClone(testCase.sample)]);
    });
    expectSchemaInvalid(testCase.schemaId, record);
  });
});

function collectStringLeafPaths(value: unknown, path: JsonPath = [], found: JsonPath[] = []): JsonPath[] {
  if (typeof value === "string") {
    found.push(path);
    return found;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => collectStringLeafPaths(entry, [...path, index], found));
    return found;
  }
  if (typeof value === "object" && value !== null) {
    for (const [key, nested] of Object.entries(value)) {
      collectStringLeafPaths(nested, [...path, key], found);
    }
  }
  return found;
}

const NONNEGATIVE_INTEGER_PATHS: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
}[] = [
  ...["examples", "groups", "train_examples", "train_groups", "validation_examples", "validation_groups", "test_examples", "test_groups"].map((field) => ({
    label: `dataset count ${field}`,
    schemaId: LEARNING_SCHEMA_IDS.learningDatasetManifest,
    path: ["counts", field] as JsonPath,
  })),
  { label: "feature position", schemaId: LEARNING_SCHEMA_IDS.featureProfile, path: ["features", 0, "position"] },
  ...["decisive_pair_count", "leakage_group_count", "consecutive_degraded_windows", "consecutive_insufficient_windows"].map((field) => ({
    label: `drift ${field}`,
    schemaId: LEARNING_SCHEMA_IDS.learningDriftReport,
    path: [field] as JsonPath,
  })),
  { label: "review duration", schemaId: LEARNING_SCHEMA_IDS.benchmarkReview, path: ["review_duration_ms"] },
  { label: "attempt resume count", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["resume_count"] },
];

const POSITIVE_COUNT_PATHS: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
}[] = [
  ...["product_counts", "domain_counts", "channel_counts", "locale_counts", "task_type_counts", "family_counts"].map((field) => ({
    label: `${field} entry count`,
    schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest,
    path: [field, 0, "count"] as JsonPath,
  })),
  { label: "intersection entry count", schemaId: LEARNING_SCHEMA_IDS.writingBenchmarkManifest, path: ["intersection_counts", 0, "count"] },
];

const TIMESTAMP_CASES: readonly {
  label: string;
  schemaId: LearningSchemaId;
  path: JsonPath;
}[] = [
  { label: "shadow effective_at", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["effective_at"] },
  { label: "shadow expires_at", schemaId: LEARNING_SCHEMA_IDS.shadowBinding, path: ["expires_at"] },
  { label: "deployment effective_at", schemaId: LEARNING_SCHEMA_IDS.learningDeploymentBinding, path: ["effective_at"] },
  { label: "drift window_started_at", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["window_started_at"] },
  { label: "drift window_ended_at", schemaId: LEARNING_SCHEMA_IDS.learningDriftReport, path: ["window_ended_at"] },
  { label: "attempt sealed_at", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["sealed_at"] },
  { label: "attempt consumed_at", schemaId: LEARNING_SCHEMA_IDS.benchmarkAttempt, path: ["consumed_at"] },
];

describe("string, number, and timestamp boundaries", () => {
  it.each(EXPECTED_LEARNING_SCHEMA_IDS)("rejects an empty value at every populated string leaf in %s", (schemaId) => {
    const paths = collectStringLeafPaths(validRecord(schemaId).payload);
    expect(paths.length).toBeGreaterThan(0);
    for (const path of paths) {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        setAtPath(payload, path, "");
      });
      expectSchemaInvalid(schemaId, record);
    }
  });

  it("rejects an empty string in the nullable feature-name branch", () => {
    const schemaId = LEARNING_SCHEMA_IDS.featureProfile;
    const record = mutatedPayloadRecord(schemaId, (payload) => {
      ((payload.features as JsonObject[])[0]).missing_indicator_name = "";
    });
    expectSchemaInvalid(schemaId, record);
  });

  it.each(NONNEGATIVE_INTEGER_PATHS)("enforces nonnegative integer boundaries for $label", (testCase) => {
    for (const validValue of [0, 1]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        setAtPath(payload, testCase.path, validValue);
      });
      expectSchemaValid(testCase.schemaId, record);
    }
    for (const invalidValue of [-1, 0.5, "0"]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        setAtPath(payload, testCase.path, invalidValue);
      });
      expectSchemaInvalid(testCase.schemaId, record);
    }
  });

  it.each(POSITIVE_COUNT_PATHS)("enforces positive integer boundaries for $label", (testCase) => {
    for (const validValue of [1, 2]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        setAtPath(payload, testCase.path, validValue);
      });
      expectSchemaValid(testCase.schemaId, record);
    }
    for (const invalidValue of [0, 1.5, "1"]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        setAtPath(payload, testCase.path, invalidValue);
      });
      expectSchemaInvalid(testCase.schemaId, record);
    }
  });

  it("enforces the inclusive integer bucket range", () => {
    const schemaId = LEARNING_SCHEMA_IDS.leakageGroup;
    for (const validValue of [0, 99]) {
      expectSchemaValid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        payload.bucket = validValue;
      }));
    }
    for (const invalidValue of [-1, 100, 0.5, "0"]) {
      expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        payload.bucket = invalidValue;
      }));
    }
  });

  it("accepts any finite numeric mean and a nonnegative numeric population standard deviation", () => {
    const schemaId = LEARNING_SCHEMA_IDS.rankingModel;
    for (const mean of [-1.25, 0, 1.25]) {
      expectSchemaValid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.standardization as JsonObject[])[0]).mean = mean;
      }));
    }
    for (const deviation of [0, 0.5]) {
      expectSchemaValid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.standardization as JsonObject[])[0]).population_standard_deviation = deviation;
      }));
    }
    for (const invalidMean of ["0", null]) {
      expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.standardization as JsonObject[])[0]).mean = invalidMean;
      }));
    }
    for (const invalidDeviation of [-0.1, "0", null]) {
      expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.standardization as JsonObject[])[0]).population_standard_deviation = invalidDeviation;
      }));
    }
  });

  it("enforces all candidate position members and their numeric types", () => {
    const schemaId = LEARNING_SCHEMA_IDS.benchmarkCandidateSet;
    for (const position of [0, 1, 2, 3]) {
      expectSchemaValid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.candidates as JsonObject[])[0]).position = position;
      }));
    }
    for (const position of [-1, 4, 0.5, "0"]) {
      expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        ((payload.candidates as JsonObject[])[0]).position = position;
      }));
    }
  });

  it.each([
    ["valid_task_count", LEARNING_SCHEMA_IDS.writingBenchmarkRun],
    ["invalid_task_count", LEARNING_SCHEMA_IDS.writingBenchmarkRun],
  ] as const)("enforces the inclusive 0..60 integer range for %s", (field, schemaId) => {
    for (const validValue of [0, 60]) {
      expectSchemaValid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        payload[field] = validValue;
      }));
    }
    for (const invalidValue of [-1, 61, 0.5, "0"]) {
      expectSchemaInvalid(schemaId, mutatedPayloadRecord(schemaId, (payload) => {
        payload[field] = invalidValue;
      }));
    }
  });

  it.each(TIMESTAMP_CASES)("accepts RFC3339 fractional-offset syntax for $label", (testCase) => {
    const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
      setAtPath(payload, testCase.path, "2026-08-20T12:34:56.789+05:30");
    });
    expectSchemaValid(testCase.schemaId, record);
  });

  it("accepts RFC3339 year 0000, lowercase separators, and a valid leap-second position", () => {
    const schemaId = LEARNING_SCHEMA_IDS.shadowBinding;
    for (const timestamp of [
      "0000-01-01T00:00:00Z",
      "0000-02-29T00:00:00Z",
      "2026-08-20t12:34:56.1z",
      "2016-12-31T23:59:60Z",
    ]) {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.effective_at = timestamp;
      });
      expectSchemaValid(schemaId, record);
    }
  });

  it("rejects invalid RFC3339 year width and leap-second positions", () => {
    const schemaId = LEARNING_SCHEMA_IDS.shadowBinding;
    for (const timestamp of [
      "-001-01-01T00:00:00Z",
      "10000-01-01T00:00:00Z",
      "2016-12-30T23:59:60Z",
    ]) {
      const record = mutatedPayloadRecord(schemaId, (payload) => {
        payload.effective_at = timestamp;
      });
      expectSchemaInvalid(schemaId, record);
    }
  });

  it.each(TIMESTAMP_CASES)("rejects invalid calendar/time syntax for $label", (testCase) => {
    for (const invalidTimestamp of [
      "2026-02-30T12:00:00Z",
      "2026-08-20T24:00:01Z",
      "2026-08-20T12:60:00Z",
      "2026-08-20T12:00:00",
      "not-a-time",
    ]) {
      const record = mutatedPayloadRecord(testCase.schemaId, (payload) => {
        setAtPath(payload, testCase.path, invalidTimestamp);
      });
      expectSchemaInvalid(testCase.schemaId, record);
    }
  });

  it("rejects duplicates in both scope string-array categories", () => {
    const schemaId = LEARNING_SCHEMA_IDS.generationRun;
    for (const field of ["resource_refs", "data_classes"] as const) {
      const record = structuredClone(validRecord(schemaId));
      record.scope[field].push(record.scope[field][0]);
      expectSchemaInvalid(schemaId, record);
    }
  });
});
