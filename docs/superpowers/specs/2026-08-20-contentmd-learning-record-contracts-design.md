---
title: "content.md Recursive Learning Record Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-LEARNING-RECORD-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: explicit-user-approval-in-task
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Recursive Learning Record Contracts 0.1

## 1. Purpose and boundary

This addendum freezes the public wire contract for Recursive Learning Task 1 in the [parent design](2026-08-20-contentmd-live-intelligence-learning-design.md) and [implementation plan](../plans/2026-08-20-contentmd-recursive-learning-ranking.md). It resolves only record identity, field shape, nullability, local state, and authority effect. Behavioral qualification, cross-record set equality, training, evaluation, promotion, benchmark execution, and statistical decisions remain in Tasks 2–8.

The user approved this strict-record approach and directed implementation to continue without another approval pause. This document authorizes bounded local code and tests only. It does not authorize browser or provider access, credential use, model calls, deployment, promotion, benchmark execution, publication, or learning from third-party expressions.

## 2. Canonical envelope and shared payload

Every record is a `DurableRecord<TPayload>` from `@contentmd/core`. The existing envelope remains authoritative and closed. Learning records additionally require at least one digest-bound `provenance` entry. `scope` is the sole scope representation and `provenance` is the sole lineage representation; payloads must not duplicate either as opaque dictionaries.

Every payload contains exactly these shared fields plus its record-specific fields:

```ts
type Digest = string; // exactly 64 lowercase hexadecimal characters
type RecordMode = "development_fixture" | "official";

interface LearningPayloadBase {
  contract_version: "contentmd.learning-record-contract/0.1.0";
  record_mode: RecordMode;
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  schema_digest: Digest;
  code_digest: Digest;
  input_digest: Digest;
  authority_effect: LearningAuthorityEffect;
}

interface DigestRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: Digest;
}

interface ArtifactRef {
  artifact_id: string;
  artifact_version: string;
  artifact_digest: Digest;
}
```

All objects are closed. All required text has `minLength: 1`. All ID/reference arrays use `minItems: 1` and `uniqueItems: true` unless an exact cardinality or explicit empty allowance is stated below. Unknown fields fail. Nullable means the field is required and its value is either the named type or `null`; omission is invalid.

`schema_digest` is SHA-256 over the exact UTF-8 raw bytes of `learning-records.schema.json`. `code_digest` is SHA-256 over the immutable producing or evaluating code artifact declared by the later task that creates the record. `input_digest` is SHA-256 over that task's explicitly named canonical input preimage. They never contain the record's own `content_digest`. Task 1 fixtures use frozen synthetic byte strings and record those fixture preimages in the test; no zero or unexplained placeholder digest is valid evidence.

`content_digest` is produced and verified only with `finalizeRecord` and `verifyRecordDigest`. Schema validation proves digest syntax, not digest truth.

## 3. Schema IDs and local states

The following 23 IDs are exact. TypeScript and schema-package literals are intentionally duplicated to avoid a `schemas -> learning -> core -> schemas` cycle and must pass an exact parity test.

| Type | Exact `schema_id` | Required local state field and closed values |
| --- | --- | --- |
| `GenerationRunRecord` | `contentmd.generation-run-record` | `run_state`: `completed`, `refused`, `incomplete`, `invalid`, `transport_failed` |
| `FeedbackQualificationRecord` | `contentmd.feedback-qualification-record` | `qualification_state`: `qualified`, `not_qualified`, `abstained`, `invalid` |
| `LearningEligibilityRecord` | `contentmd.learning-eligibility-record` | `eligibility_state`: `eligible`, `ineligible` |
| `PreferenceExampleRecord` | `contentmd.preference-example-record` | `preference_state`: `admitted`, `invalidated`, `revoked` |
| `ExemplarRecord` | `contentmd.exemplar-record` | `exemplar_state`: `approved_current`, `expired`, `revoked` |
| `LeakageGroupRecord` | `contentmd.leakage-group-record` | `group_state`: `frozen` |
| `LearningDatasetManifest` | `contentmd.learning-dataset-manifest` | `dataset_state`: `diagnostics_only`, `training_eligible`, `sealed`, `test_opened`, `invalid` |
| `FeatureProfile` | `contentmd.feature-profile` | `profile_state`: `frozen` |
| `RankingModelRecord` | `contentmd.ranking-model-record` | `model_state`: `trained`, `nonconverged`, `invalid` |
| `LearningEvaluationRun` | `contentmd.learning-evaluation-run` | `evaluation_state`: `not_run`, `invalid`, `failed`, `passed` |
| `ShadowEvaluationPlan` | `contentmd.shadow-evaluation-plan` | `plan_state`: `proposed`, `ready`, `invalid` |
| `ShadowBindingRecord` | `contentmd.shadow-binding-record` | `binding_state`: `proposed`, `active`, `completed`, `suspended` |
| `LearningPromotionDecision` | `contentmd.learning-promotion-decision` | `decision_state`: `proposed`, `approved`, `rejected`, `narrowed`, `superseded` |
| `LearningDeploymentBinding` | `contentmd.learning-deployment-binding` | `binding_state`: `proposed`, `active`, `suspended`, `superseded` |
| `LearningDriftReport` | `contentmd.learning-drift-report` | `window_state`: `evaluable`, `monitoring_insufficient` |
| `LearningRollbackRecord` | `contentmd.learning-rollback-record` | `rollback_state`: `proposed`, `restored`, `fallback_baseline`, `rejected` |
| `WritingBenchmarkManifest` | `contentmd.writing-benchmark-manifest` | `manifest_state`: `draft`, `sealed`, `opened`, `retired` |
| `WritingBenchmarkTaskRecord` | `contentmd.writing-benchmark-task-record` | `task_state`: `frozen` |
| `BenchmarkCandidateSetRecord` | `contentmd.benchmark-candidate-set-record` | `candidate_set_state`: `completed_verified_nonquarantined` |
| `BenchmarkSelectionRecord` | `contentmd.benchmark-selection-record` | `selection_state`: `frozen` |
| `BenchmarkReviewRecord` | `contentmd.benchmark-review-record` | `review_state`: `decisive`, `tie`, `abstained`, `invalid` |
| `BenchmarkAttemptRecord` | `contentmd.benchmark-attempt-record` | `attempt_state`: `draft`, `sealed`, `in_progress`, `interrupted`, `invalid_run`, `consumed` |
| `WritingBenchmarkRun` | `contentmd.writing-benchmark-run` | `run_state`: `not_run`, `invalid_run`, `failed`, `passed` |

Base `lifecycle_state` remains separate from every local state above. Evaluation never implies approval; approval never implies deployment; deployment never implies execution; execution never implies a valid result.

## 4. Authority-effect matrix

`LearningAuthorityEffect` is closed to:

```ts
type LearningAuthorityEffect =
  | "none"
  | "shadow_observation_only"
  | "promotion_decision_only"
  | "deployment_binding"
  | "rollback_binding"
  | "benchmark_attempt_control"
  | "benchmark_attempt_consumption";
```

Eighteen record families require `authority_effect: "none"` in every state. Only the five families below may use another value, and only under these state/mode conditions:

| Family | Exact rule |
| --- | --- |
| `ShadowBindingRecord` | `proposed` requires `none`; `official` plus `active`, `completed`, or `suspended` requires `shadow_observation_only`. It never influences returned ordering. |
| `LearningPromotionDecision` | `proposed`, `rejected`, or `superseded` requires `none`; `official` plus `approved` or `narrowed` requires `promotion_decision_only`. It does not mutate a binding. |
| `LearningDeploymentBinding` | `proposed` requires `none`; every other state requires `official` plus `deployment_binding`. |
| `LearningRollbackRecord` | `proposed` or `rejected` requires `none`; `restored` or `fallback_baseline` requires `official` plus `rollback_binding`. |
| `BenchmarkAttemptRecord` | `draft` requires `none`; `official` plus `sealed`, `in_progress`, or `interrupted` requires `benchmark_attempt_control`; `official` plus `invalid_run` or `consumed` requires `benchmark_attempt_consumption`. |

Any persisted `development_fixture` requires `authority_effect: "none"`. Tests may construct non-persisted official-shape objects solely to exercise schema branches; those objects are not issued records.

## 5. Exact record-specific payloads

Fields below are required in addition to `LearningPayloadBase`. `Ref` means `DigestRef`; `Artifact` means `ArtifactRef`; `Digest` means the shared digest type.

### 5.1 Qualification and learning evidence

- `GenerationRunRecord`: `task_ref: Ref`; `context_ref: Ref`; `retrieval_snapshot_ref: Ref | null`; `prompt_ref: Artifact`; `provider_request_ref: Ref`; `provider_response_ref: Ref`; `output_ref: Ref | null`; `critique_refs: Ref[]` (empty allowed); `proposal_ref: Ref | null`; `run_state`.
- `FeedbackQualificationRecord`: `decision_ref: Ref`; `rubric_ref: Artifact`; `reviewer_qualification_ref: Ref`; `fact_set_ref: Ref`; `policy_ref: Ref`; `task_ref: Ref`; `context_ref: Ref`; `candidate_a_ref: Ref`; `candidate_b_ref: Ref`; `presentation_ref: Ref`; `blinded: boolean`; `randomized: boolean`; `rationale_codes: string[]`; `outcome: "A" | "B" | "tie" | "abstain"`; `conflict_state: "none" | "declared" | "adjudicated" | "unresolved"`; `adjudication_ref: Ref | null`; `facts_changed: boolean`; `requirements_changed: boolean`; `context_changed: boolean`; `qualification_state`; `reason_codes: string[]` (empty allowed). Boolean fields record the observed proof result so failed-blinding or failed-randomization evidence can remain an inspectable `not_qualified` record; `qualified` requires both true under the Task 2 behavioral contract.
- `LearningEligibilityRecord`: `qualification_ref: Ref`; `decision_ref: Ref`; `learning_policy_ref: Ref`; `permission_ref: Ref | null`; `target_memory_scope: "task" | "personal" | "project" | "organization" | "public"`; `rights_check`, `privacy_check`, `factual_check`, `policy_check`, `incident_check`, and `context_check`, each `"pass" | "fail" | "unknown"`; `eligibility_state`; `reason_codes: string[]`.
- `PreferenceExampleRecord`: `qualification_ref: Ref`; `eligibility_ref: Ref`; `task_ref: Ref`; `context_ref: Ref`; `candidate_a_ref: Ref`; `candidate_b_ref: Ref`; `presented_order: ["A", "B"] | ["B", "A"]`; `preferred_side: "A" | "B"`; `label: 0 | 1`; `presentation_digest: Digest`; `feature_source_checkpoint_set_ref: Ref`; `preference_state`.
- `ExemplarRecord`: `exemplar_kind: "expression" | "mechanism"`; `subject_ref: Ref`; `approval_ref: Ref`; `applicability_scope_ref: Ref`; `transfer_condition_refs: Ref[]`; `prohibited_transfer: string`; `rights_ref: Ref`; `permission_ref: Ref`; `currentness_state: "current" | "expired" | "revoked"`; `exemplar_state`.

### 5.2 Dataset, features, model, and evaluation

- `LeakageGroupRecord`: `rule_version: "contentmd.leakage-group/0.1.0"`; `normalization_artifact_refs: Artifact[]`; `member_refs: Ref[]`; empty-allowed `edges: LeakageEdge[]`; `bucket: integer 0..99`; `split: "train" | "validation" | "test"`; `group_state`. A singleton uses `edges: []`; runtime grouping requires every serialized edge to have distinct endpoints. `LeakageEdge` is closed: `left_ref`, `right_ref`, and `reason: "message_lineage" | "supersession" | "task_family" | "template_family" | "source_occurrence" | "locale_variant" | "channel_variant" | "near_duplicate"`.
- `LearningDatasetManifest`: `example_refs: Ref[]`; `exclusions: DatasetExclusion[]` (empty allowed); `leakage_group_refs: Ref[]`; `train_example_refs: Ref[]`; `validation_example_refs: Ref[]`; `test_example_refs: Ref[]`; `permission_refs: Ref[]`; `feature_source_checkpoint_refs: Ref[]`; `counts: DatasetCounts`; `test_open_state: "not_applicable" | "sealed" | "opened"`; `dataset_state`. `DatasetExclusion` is `{ example_ref: Ref, reason_code: string }`. `DatasetCounts` has nonnegative integers `examples`, `groups`, `train_examples`, `train_groups`, `validation_examples`, `validation_groups`, `test_examples`, `test_groups`.
- `FeatureProfile`: `feature_profile_version: "rank-features/0.1.0"`; `features: FeatureDefinition[]`; `source_artifact_refs: Artifact[]`; `forbidden_input_fields: string[]`; `runtime_profile_ref: Artifact`; `profile_state`. `FeatureDefinition` is closed: `name`, `position` (nonnegative integer), `value_type: "boolean" | "number" | "closed_enum"`, `transformation`, `nullable`, and `missing_indicator_name: string | null`.
- `RankingModelRecord`: `algorithm: "pairwise_logistic_l2"`; `dataset_ref: Ref`; `feature_profile_ref: Ref`; `hyperparameters: ModelHyperparameters`; `feature_order: string[]`; `standardization: StandardizationEntry[]`; `coefficient_bits: string[]` with each value 16 lowercase hex characters; `training_statistics_ref: Ref`; `runtime_profile_ref: Artifact`; `model_artifact_digest: Digest`; `model_state`. `ModelHyperparameters` exactly binds lambda `1`, learning rate `0.05`, maximum iterations `2000`, convergence delta `1e-9`, convergence patience `10`, standardized clip lower `-10`, and upper `10`. `StandardizationEntry` is the closed object `{ feature_name: string, mean: finite number, population_standard_deviation: finite nonnegative number }`; a zero deviation records the parent design's zero-variance case.
- `LearningEvaluationRun`: `dataset_ref: Ref`; `model_ref: Ref`; `baseline_ref: Ref`; `feature_profile_ref: Ref`; `test_open_receipt_ref: Ref | null`; `evaluation_population_ref: Ref`; `overall_metric_refs: Ref[]`; `slice_metric_refs: Ref[]`; `failure_refs: Ref[]` (empty allowed); `bootstrap_ref: Ref | null`; `predicate_result_refs: Ref[]`; `attempt_consumed: boolean`; `evaluation_state`.
- `ShadowEvaluationPlan`: `active_baseline_ref: Ref`; `candidate_model_ref: Ref`; `input_selection_ref: Ref`; `start_rule_ref: Ref`; `end_rule_ref: Ref`; `minimum_decisive_pairs: 50`; `minimum_leakage_groups: 20`; `minimum_calendar_days: 14`; `required_slice_refs: Ref[]`; `metric_refs: Ref[]`; `gate_refs: Ref[]`; `no_influence: true`; `plan_state`.
- `ShadowBindingRecord`: `plan_ref: Ref`; `active_baseline_ref: Ref`; `candidate_model_ref: Ref`; `effective_at: RFC3339 timestamp | null`; `expires_at: RFC3339 timestamp | null`; `input_digest: Digest` is the shared field and remains the sole input digest; `active_output_digest: Digest | null`; `shadow_output_digest: Digest | null`; `no_influence: true`; `binding_state`.
- `LearningPromotionDecision`: `model_ref: Ref`; `dataset_ref: Ref`; `evaluation_ref: Ref`; `shadow_result_ref: Ref`; `proposed_scope_ref: Ref`; `required_slice_refs: Ref[]`; `actor_ref: Ref`; `actor_qualification_ref: Ref`; `rationale: string`; `approval_ref: Ref | null`; `decision_state`.
- `LearningDeploymentBinding`: `project_id: string`; `model_ref: Ref | null`; `baseline_ref: Ref`; `promotion_decision_ref: Ref | null`; `previous_binding_ref: Ref | null`; `expected_head_event_digest: Digest`; `readback_receipt_ref: Ref | null`; `effective_at: RFC3339 timestamp | null`; `binding_state`.
- `LearningDriftReport`: `binding_ref: Ref`; `model_ref: Ref | null`; `promotion_evaluation_ref: Ref`; `window_started_at: RFC3339 timestamp`; `window_ended_at: RFC3339 timestamp`; `decisive_pair_count: nonnegative integer`; `leakage_group_count: nonnegative integer`; `metric_delta_refs: Ref[]`; `consecutive_degraded_windows: nonnegative integer`; `consecutive_insufficient_windows: nonnegative integer`; `immediate_failure_refs: Ref[]` (empty allowed); `disposition: "continue" | "review" | "suspend"`; `window_state`.
- `LearningRollbackRecord`: `current_binding_ref: Ref`; `target_binding_ref: Ref | null`; `target_model_ref: Ref | null`; `fallback_baseline_ref: Ref`; `reason_code: string`; `authorization_ref: Ref | null`; `revalidation_refs: Ref[]`; `expected_head_event_digest: Digest`; `resulting_binding_ref: Ref | null`; `readback_receipt_ref: Ref | null`; `rollback_state`.

### 5.3 Writing-effectiveness benchmark

- `WritingBenchmarkManifest`: `benchmark_id: "LIL-WRITE-001"`; `task_refs: Ref[]` with exactly 60 entries; `product_counts`, `domain_counts`, `channel_counts`, `locale_counts`, `task_type_counts`, and `family_counts`, each a nonempty `CountEntry[]`; `intersection_counts: IntersectionCount[]`; `training_manifest_ref: Ref`; `disjointness_check_ref: Ref`; `generation_control_ref: Ref`; `metric_contract_ref: Ref`; `missingness_contract_ref: Ref`; `bootstrap_contract_ref: Ref`; `quality_gate_ref: Ref`; `manifest_state`. `CountEntry` is `{ key: string, count: positive integer }`; `IntersectionCount` is `{ keys: string[], count: positive integer }`.
- `WritingBenchmarkTaskRecord`: `manifest_ref: Ref`; `product_id: string`; `domain: string`; `channel: "web" | "notification"`; `locale: string`; `task_type: "strategy" | "contextual_microcopy"`; `family_id: string`; `task_packet_ref: Ref`; `context_evidence_ref: Ref`; `semantic_lineage_ids: string[]`; `template_ids: string[]`; `leakage_group_ids: string[]`; `required_facts: string[]` (empty allowed); `required_actions: string[]` (empty allowed); `acceptance_criteria: string[]`; `ownership: "project_owned_synthetic"`; `generation_config_ref: Ref`; `task_state`.
- `BenchmarkCandidateSetRecord`: `task_ref: Ref`; `provider_operation_plan_id: string`; `provider_operation_plan_digest: Digest`; `nonce_claim_receipt_ref: Ref`; `provider_receipt_ref: Ref`; `provider_output_digest: Digest`; `provider_profile_ref: Ref`; `returned_model_id: string`; `prompt_template_ref: Artifact`; `context_ref: Ref`; `alternatives_count: 4`; `output_token_budget: 512`; `candidates: CandidateEntry[]` with exactly four entries; `candidate_set_digest: Digest`; `candidate_set_state`. `CandidateEntry` is `{ position: 0 | 1 | 2 | 3, candidate_id: string, expression_digest: Digest }`.
- `BenchmarkSelectionRecord`: `task_ref: Ref`; `candidate_set_ref: Ref`; `selection_path: "baseline" | "learned"`; `ranker_ref: Ref`; `ordered_candidate_refs: Ref[]` with exactly four entries; `candidate_evaluation_refs: Ref[]` with exactly four entries; `selected_candidate_ref: Ref`; `tie_break_trace_ref: Ref`; `selection_digest: Digest`; `frozen_before_blinding: true`; `selection_state`.
- `BenchmarkReviewRecord`: `attempt_ref: Ref`; `task_ref: Ref`; `allocation_ref: Ref`; `randomization_ref: Ref`; `rubric_ref: Artifact`; `reviewer_qualification_ref: Ref`; `reviewer_independence_ref: Ref`; `reviewer_role: "original" | "adjudicator"`; `blinded_pair_ref: Ref`; `hard_result_refs: Ref[]`; `advisory_result_refs: Ref[]`; `preference: "A" | "B" | "tie" | "abstain"`; `reason_codes: string[]`; `accept_as_is: boolean | null`; `accepted_edit_ref: Ref | null`; `review_duration_ms: nonnegative integer | null`; `context_changed: boolean`; `candidate_mismatch: boolean`; `model_mismatch: boolean`; `adjudicates_review_refs: Ref[]` (empty allowed); `review_state`.
- `BenchmarkAttemptRecord`: `candidate_model_ref: Ref`; `manifest_ref: Ref`; `reviewer_allocation_ref: Ref`; `rubric_ref: Artifact`; `randomization_ref: Ref`; `analysis_code_ref: Artifact`; `provider_operation_plan_set: ProviderOperationPlanEntry[]` with exactly 60 entries; `provider_operation_plan_set_digest: Digest`; `sealed_at: RFC3339 timestamp | null`; `readback_receipt_ref: Ref | null`; `resume_count: nonnegative integer`; `consumed_at: RFC3339 timestamp | null`; `consumption_reason: "invalid_run" | "quality_gate_opened" | null`; `attempt_state`. `ProviderOperationPlanEntry` is closed: `task_id`, `plan_id`, and `plan_digest`.
- `WritingBenchmarkRun`: `attempt_ref: Ref`; `manifest_ref: Ref`; `baseline_ref: Ref`; `model_ref: Ref`; `candidate_set_refs: Ref[]`; `selection_refs: Ref[]`; `review_refs: Ref[]`; `task_disposition_refs: Ref[]`; `valid_task_count: integer 0..60`; `invalid_task_count: integer 0..60`; `slice_count_refs: Ref[]`; `hard_failure_refs: Ref[]` (empty allowed); `metric_result_refs: Ref[]`; `bootstrap_result_refs: Ref[]`; `predicate_result_refs: Ref[]`; `attempt_consumed: true`; `bounded_claim_status: "none" | "synthetic_noninferiority_only" | "synthetic_noninferiority_plus_utility"`; `run_state`.

## 6. Non-self-referential derived digests

The following payload digests use separately named preimages and exclude both themselves and the outer `content_digest`:

| Digest | Exact canonical preimage |
| --- | --- |
| `model_artifact_digest` | algorithm, dataset ref, feature-profile ref, hyperparameters, feature order, standardization, coefficient bits, training-statistics ref, runtime-profile ref |
| `candidate_set_digest` | task ref, plan ID/digest, nonce receipt ref, provider receipt ref, provider output digest, provider/profile/model/template/context bindings, token budget, ordered candidates |
| `selection_digest` | task ref, candidate-set ref, path, ranker ref, ordered candidates, candidate evaluations, selected candidate, tie-break trace |
| `provider_operation_plan_set_digest` | UTF-8 canonical JSON array of the 60 entries in stored order |

Task 1 validates digest shape and presence. The producing runtime in the named later task recomputes these preimages and rejects mismatch.

## 7. Structural schema versus runtime invariants

Task 1 schema and TypeScript contracts enforce:

- all 23 exact IDs and exact shared constants;
- required fields, nullability, local enums, cardinalities, closed nested objects, unique whole-array values, and authority/state branches;
- exactly 60 plan entries and exactly four candidates/evaluations where declared;
- schema-ID parity across packages and compile-time type coverage; and
- real outer digest verification in tests.

Later runtime validators enforce semantic-key uniqueness, reference existence, cross-record equality, canonical ordering, digest recomputation, task-set bijection, leakage closure, split membership, qualification rules, one-shot consumption, compare-and-swap, readback, chronology, statistical denominators, and pass/fail predicates. JSON Schema must not claim to prove those relationships.

## 8. Package and test contract

Task 1 implements one `learning-records.schema.json` with 23 independently closed record definitions and one top-level union. The registry compiles or selects the exact record definition for the requested ID rather than surfacing irrelevant 23-way errors.

`packages/learning/src/records.ts` exports `LEARNING_SCHEMA_IDS`, shared primitives, all 23 payload types, all 23 named record types, a schema-ID-to-payload map, and the complete union. It includes compile-time exactness assertions because Vitest does not type-check test files.

The schemas package must not import learning. Learning tests may import schemas through a direct `@contentmd/schemas` workspace development dependency; Task 1 therefore includes `packages/learning/package.json` and `pnpm-lock.yaml`.

Table-driven tests require one valid finalized record for every ID and reject missing shared fields, wrong objective/kind/effect, unknown payload and nested fields, malformed digests, invalid enum members, duplicate whole-array entries, and schema selector mismatch. Tests compare the exact 23-key sets across TypeScript IDs, registry IDs, schema branches, fixture factories, and the payload map. At least one schema-valid post-finalization mutation must fail `verifyRecordDigest`.

Task 1 fixtures and persisted examples remain `development_fixture`, proposed/not-run where applicable, and have `authority_effect: none`. No Task 1 artifact is a learning decision, deployment, benchmark attempt, model result, or effectiveness claim.

## 9. Acceptance

This contract is ready for Task 1 implementation when:

1. all 23 IDs, shared types, fields, nullability, states, and authority branches are represented exactly;
2. no package cycle is introduced;
3. schema validation and cryptographic digest verification remain distinct;
4. later-task semantic invariants are not falsely claimed as Task 1 guarantees; and
5. the full Node 24 test, typecheck, package-boundary, foundation, and clean-diff gates pass.
