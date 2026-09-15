---
title: "content.md Evaluation, Shadow, and Governance Simulator Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-EVALUATION-SHADOW-GOVERNANCE-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: approved-parent-design-and-explicit-continuation
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Evaluation, Shadow, and Governance Simulator Contracts 0.1

## 1. Purpose and non-authority boundary

This addendum freezes the executable contract for Recursive Learning Task 6. It resolves sealed-test evaluation, metric and slice arithmetic, deterministic paired bootstrap, no-influence shadow observation, simulated compare-and-swap/readback transitions, drift, lineage revocation, and rollback.

Version 0.1 is deliberately a `development_fixture`-only, in-process simulator. The committed Task 3 and Task 5 contracts reject `official`, and the repository has no authenticated official artifact resolver, operation-capability resolver, canonical authority store, or independently administered readback service for learning promotion. Task 6 therefore does not issue an official `ShadowBindingRecord`, `LearningPromotionDecision`, `LearningDeploymentBinding`, or effective `LearningRollbackRecord`. It does not call `authorizeOperation()` and does not reinterpret a structurally valid `AuthorizationDecision`, approval, grant, digest, event receipt, or SQLite append as official learning authority.

Every issued Task 1 record and every Task 6 handle, attempt status, lifecycle result, event payload, binding projection, simulated decision, and receipt has `record_mode: "development_fixture"` and `authority_effect: "none"`. Static definitions, manifests, metric evidence, and digest-only witnesses that do not carry an authority field are non-authoritative by this contract and can be consumed only inside a development-fixture call. Every mode-bearing public API descriptor-validates only its top-level `record_mode` first and throws `task6_official_mode_not_supported` for exact `official` before reading another nested value. This is unconditional even when the caller supplies apparently current policy, approval, capability, store, or readback material.

The simulator proves deterministic mechanics and failure behavior only. It does not promote or deploy a model, alter an active product ordering, create authority, contact a provider, use a credential, write project memory, or claim that a learned ranker is effective outside the frozen development fixture.

## 2. Closure of the 13 implementation blockers

| # | Blocker | Frozen resolution |
| --- | --- | --- |
| 1 | No public API or package-export contract | Sections 4 and 5 freeze every public value, type, function signature, opaque token, and the exact `index.ts` export boundary. |
| 2 | Bare refs and missing resolver-free identities, preimages, code, or runtime | Sections 5–7 require complete Task 3/5 replay, exact auxiliary-object preimages, a release-owned code manifest, and an admitted runtime token. A ref, digest, receipt, boolean, or caller-authored `verified` flag is never sufficient. |
| 3 | One-shot use is unenforceable when replay bytes are caller-held | Section 6 truthfully limits enforcement to an opaque, single-process vault and atomic simulator ledger. It enforces API consumption but makes no secrecy, anti-copying, cross-process, or official one-shot claim about bytes the caller already possesses. |
| 4 | Metric arithmetic, log loss, ties, bit identity, coverage, or replay is incomplete | Section 8 freezes pair order, baseline arithmetic, candidate replay, `p = 0.5`, log loss, Kahan means, coverage `1.0`, positive-zero rules, and binary64 evidence. |
| 5 | Slice type, order, overlap, preregistration, scope, reviewer, hard-rule, or currentness is incomplete | Section 9 defines the five dimensions, canonical order, intentional cross-dimension overlap, frozen scope/slices, derived assignments, complete simulator witnesses, and exact gate equations. |
| 6 | Bootstrap seed, counter, endian, rejection, grouping, duplicates, arithmetic, percentile, or digest is incomplete | Section 10 defines every byte and operation, including 64-bit big-endian counter blocks, unbiased rejection, repeated-group semantics, 10,000 replicates, and nearest-rank indices. |
| 7 | Evaluation refs, states, nullability, attempt consumption, identity, or provenance is absent | Section 11 freezes attempt stages, result equations, every auxiliary ref, `LearningEvaluationRun` fields, record ID/input digest, and exact provenance projection. |
| 8 | Shadow selection, rules, result, chronology, or no-influence proof is absent | Section 12 freezes plan creation, half-open time selection, ordered observations, same-input scoring, active-only responses, completion gates, and digest proof. |
| 9 | CAS event IDs, null head, projection, readback, or two-phase crash handling is absent | Section 13 defines the simulator event ledger, null-head creation, event identities, prepare/commit/readback phases, fenced pending commits, recovery, and projection rules. |
| 10 | Official behavior is impossible under development-only Tasks 3/5 and unauthenticated primitives | Sections 1, 4, and 16 make official mode an unconditional pre-nested-read error and prohibit fabricating authority from the retained generic governance or store shapes. |
| 11 | Drift window inclusivity, closure, order, counters, 60-day rule, or replay is incomplete | Section 14 freezes cursor-based non-overlap, 30-day maximums, the 100-pair early close, thresholds, inclusive degradation boundaries, counters, and full prior-state replay. |
| 12 | Lineage revocation, rollback target/currentness, fallback, supersession, or atomic ordering is incomplete | Sections 14 and 15 derive lineage from complete stored replays, suspend immediately, revalidate every prior target in exact reverse chronology, fall back to baseline, and use the same two-phase transition protocol. |
| 13 | Closed errors, precedence, concurrency, post-claim, append, or readback failures are absent | Sections 17 and 18 define the closed union, exact precedence, synchronous single-vault concurrency boundary, consumed crash states, fail-before-append, commit-before-ack, and readback failure semantics. |

## 3. Scope, files, and dependencies

Task 6 owns:

- `packages/learning/src/bootstrap.ts` — SHA-256 counter stream, unbiased draws, metric resampling, and nearest-rank intervals;
- `packages/learning/src/evaluation.ts` — release verification, opaque simulator vault, sealed-test replay, metrics, predicates, evaluation records, and attempt inspection;
- `packages/learning/src/shadow.ts` — shadow plan, chronological observation, active-only response, completion, and no-influence proof;
- `packages/learning/src/binding.ts` — simulated event ledger, promotion-decision simulation, two-phase CAS/readback, recovery, and binding projection;
- `packages/learning/src/drift.ts` — deterministic monitoring windows, counters, reports, and lineage-revocation propagation;
- `packages/learning/src/rollback.ts` — reverse-chronology target revalidation, rollback, baseline fallback, and supersession projection;
- `packages/learning/src/task6-release-profile.ts` — generated release-owned Task 6 code/runtime pins;
- `packages/learning/src/index.ts` — the exact exports in section 5;
- one focused test file for each runtime file above;
- `scripts/verify-task6-code-manifest.mjs` — bounded read-only raw-byte verification;
- `fixtures/learning-ranking/task6-code-manifest.json`; and
- `fixtures/learning-ranking/task6-simulator-golden.json` with `task6-simulator-golden.sha256`.

No JSON Schema family is added. The three Task 1 durable records that Task 6 may issue—`LearningEvaluationRun`, `ShadowEvaluationPlan`, and `LearningDriftReport`—already have canonical schemas. Task 6 auxiliary objects are closed runtime values with exact derived identities; they are not inserted into the 23-family learning-record union.

No third-party runtime dependency is permitted. Runtime code may use `@contentmd/core`, `@contentmd/memory` types, committed Task 3 public replay APIs, the Task 5 public API, ECMAScript primitives, Node SHA-256, and the exact Task 5 numeric helpers. It may not instantiate `SqliteEventStore`, call a governance authorizer, read a file, use a browser, call a model/provider, access a network, resolve a credential, read the clock, inspect an environment variable, use `Math.random`, or mutate an input.

## 4. Global invariants and top-level mode gate

The exact objective is `expression_preference`; the exact candidate kind is `expression`. The deterministic baseline and learned candidate score the same pair of already hard-eligible expressions. Evaluation cannot generate, edit, filter, hide, or expose a candidate and cannot compensate for a hard-rule failure.

All semantic inputs are plain, closed objects with enumerable data properties. Arrays are dense, non-aliased, and contain no symbol keys or accessors. The sole transport exception is a value reconstructed by the verified `contentmd.canonical-dag/0.1.0` decoder: repeated canonical subtrees may share identity only when the complete shared subtree is recursively frozen, so the sharing cannot create mutable shared state. All required strings are nonempty. Digest text is 64 lowercase hexadecimal characters; binary64 text is 16 lowercase hexadecimal characters. All numbers are primitive, finite, canonical positive zero when zero, and safe integers where declared. All returned values are copied and recursively frozen.

Every mode-bearing function performs this exact preflight:

1. descriptor-check only the closed top-level object and its own enumerable data-property `record_mode`;
2. an absent, extra, inherited, accessor, symbol, non-enumerable, non-object, or invalid mode shape throws `task6_input_shape_invalid`;
3. exact `official` throws `task6_official_mode_not_supported` before any other nested read, proxy trap, digest, ref, replay, vault, code, runtime, authority, store, or time check; and
4. only exact `development_fixture` proceeds.

The `EvaluationSimulatorVault` argument is checked for module-private membership only after that mode gate. A structural cast, copied snapshot, direct import, or recomputed digest never creates an opaque token.

## 5. Exact public API, closed types, and exports

The Task 6 files export only the values and types named in this section. `packages/learning/src/index.ts` re-exports all of them. Private validators, projection reducers, counter readers, event appenders, and vault maps are not exported.

The following imported Task 3 and Task 5 types retain their normative definitions and are not weakened: `LearningDatasetTrainingReplay`, `RankingModelDependencies`, `PairwiseCandidateVectorReplay`, `PairwiseFeatureProfileReplay`, `VerifiedLearningDatasetForTraining`, `VerifiedRankingModel`, `VerifiedPairwiseCandidate`, `PairwisePrediction`, `PairwiseRankResult`, `PairwiseCodeManifest`, and `PairwiseRuntimeProfile`.

```ts
type Task6RecordMode = "development_fixture" | "official";
type Task6AuthorityEffect = "none";
type Digest = string;
type Binary64Hex = string;
type Rfc3339Instant = string;

type SliceDimension =
  | "project"
  | "product_area"
  | "channel"
  | "locale"
  | "risk";

interface Task6ObjectRef {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: Digest;
}

interface Binary64Value {
  value: number;
  bits: Binary64Hex;
}

interface SliceKey {
  dimension: SliceDimension;
  value: string;
}

interface EvaluationSliceDefinition {
  contract_version: "contentmd.evaluation-slice-definition/0.1.0";
  slice_id: string;
  key: SliceKey;
  required_for_promotion: boolean;
  slice_digest: Digest;
}

interface ProposedBindingScope {
  contract_version: "contentmd.proposed-binding-scope/0.1.0";
  scope_id: string;
  memory_scope: "task" | "personal" | "project" | "organization" | "public";
  project_id: string;
  permitted_values: readonly [
    { dimension: "project"; values: readonly [string, ...string[]] },
    { dimension: "product_area"; values: readonly [string, ...string[]] },
    { dimension: "channel"; values: readonly [string, ...string[]] },
    { dimension: "locale"; values: readonly [string, ...string[]] },
    { dimension: "risk"; values: readonly [string, ...string[]] }
  ];
  scope_digest: Digest;
}

interface RiskSliceWitness {
  contract_version: "contentmd.risk-slice-witness/0.1.0";
  witness_id: string;
  task_ref: Task6ObjectRef;
  context_ref: Task6ObjectRef;
  risk_value: string;
  source_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  witness_digest: Digest;
}

interface CurrentnessCheckEntry {
  check:
    | "permission"
    | "rights"
    | "privacy"
    | "policy"
    | "incident"
    | "reviewer_qualification"
    | "reviewer_independence";
  subject_ref: Task6ObjectRef;
  state: "pass" | "fail" | "unknown";
  effective_at: Rfc3339Instant;
  expires_at: Rfc3339Instant | null;
  evidence_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
}

interface SimulatedCurrentnessWitness {
  contract_version: "contentmd.simulated-currentness-witness/0.1.0";
  witness_id: string;
  checked_at: Rfc3339Instant;
  entries: readonly [CurrentnessCheckEntry, ...CurrentnessCheckEntry[]];
  witness_digest: Digest;
  record_mode: "development_fixture";
  authority_effect: "none";
}

interface ReviewerIndependenceEntry {
  reviewer_ref: Task6ObjectRef;
  independent_from_reviewer_refs: readonly Task6ObjectRef[];
  conflict_state: "none" | "adjudicated" | "unresolved";
  qualification_ref: Task6ObjectRef;
}

interface SimulatedReviewerPolicyWitness {
  contract_version: "contentmd.simulated-reviewer-policy-witness/0.1.0";
  witness_id: string;
  proposed_scope_ref: Task6ObjectRef;
  minimum_qualified_reviewers: number;
  require_pairwise_independence: true;
  reviewers: readonly [ReviewerIndependenceEntry, ...ReviewerIndependenceEntry[]];
  witness_digest: Digest;
  record_mode: "development_fixture";
  authority_effect: "none";
}

interface DeterministicBaselineProfile {
  contract_version: "contentmd.expression-fit-baseline/0.1.0";
  baseline_id: "expression-fit-baseline/0.1.0";
  feature_profile_ref: Task6ObjectRef;
  component_order: readonly [
    "required_fact_coverage",
    "recovery_action_coverage",
    "approved_terminology_ratio",
    "contextual_specificity",
    "supporting_evidence_coverage",
    "one_minus_generic_language_density",
    "one_minus_length_distance"
  ];
  weight_bits: readonly [
    "3fd0000000000000",
    "3fc3333333333333",
    "3fc3333333333333",
    "3fc3333333333333",
    "3fc3333333333333",
    "3fb999999999999a",
    "3fa999999999999a"
  ];
  probability_scale_bits: "4010000000000000";
  probability_clip_lower_bits: "3eb0c6f7a0b5ed8d";
  probability_clip_upper_bits: "3feffffde7210be9";
  baseline_digest: Digest;
}

interface SealedTestPairReplay {
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
  risk_slice_witness: RiskSliceWitness;
}

interface QualificationDenominatorMember {
  qualification_input: import("./qualification.js").FeedbackQualificationInput;
  expected_qualification: import("./records.js").FeedbackQualificationRecord;
  test_leakage_group_ref: Task6ObjectRef | null;
}

interface QualificationDenominatorReplay {
  contract_version: "contentmd.qualification-denominator-replay/0.1.0";
  replay_id: string;
  enumeration_state: "complete_development_fixture";
  proposed_scope_ref: Task6ObjectRef;
  source_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  members: readonly [QualificationDenominatorMember, ...QualificationDenominatorMember[]];
  replay_digest: Digest;
  record_mode: "development_fixture";
  authority_effect: "none";
}

interface SealedTestReplay {
  contract_version: "contentmd.sealed-test-replay/0.1.0";
  dataset_replay: LearningDatasetTrainingReplay;
  model_record: import("./records.js").RankingModelRecord;
  model_dependencies: RankingModelDependencies;
  feature_profile: PairwiseFeatureProfileReplay;
  baseline_profile: DeterministicBaselineProfile;
  proposed_scope: ProposedBindingScope;
  declared_slices: readonly [EvaluationSliceDefinition, ...EvaluationSliceDefinition[]];
  currentness: SimulatedCurrentnessWitness;
  reviewer_policy: SimulatedReviewerPolicyWitness;
  test_pairs: readonly [SealedTestPairReplay, ...SealedTestPairReplay[]];
  qualification_denominator: QualificationDenominatorReplay;
  evaluation_code_manifest: Task6CodeManifest;
  evaluation_runtime_profile: Task6RuntimeProfile;
}

interface VerifySealedTestReplayInput {
  record_mode: Task6RecordMode;
  replay: SealedTestReplay;
}

interface VerifiedSealedTestHandle {
  readonly contract_version: "contentmd.verified-sealed-test-handle/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly handle_id: string;
  readonly dataset_ref: Task6ObjectRef;
  readonly model_ref: Task6ObjectRef;
  readonly test_population_ref: Task6ObjectRef;
  readonly proposed_scope_ref: Task6ObjectRef;
  readonly replay_verification_digest: Digest;
  readonly code_verification_digest: Digest;
  readonly runtime_verification_digest: Digest;
  readonly handle_digest: Digest;
}

interface Task6CodeManifestEntry {
  path: string;
  raw_bytes_digest: Digest;
  byte_count: number;
}

interface Task6CodeManifest {
  contract_version: "contentmd.task6-code-manifest/0.1.0";
  package_id: "@contentmd/learning";
  package_version: "0.1.0";
  entries: readonly [Task6CodeManifestEntry, ...Task6CodeManifestEntry[]];
  manifest_digest: Digest;
}

interface Task6ReleaseProfile {
  contract_version: "contentmd.task6-release-profile/0.1.0";
  manifest_raw_bytes_digest: Digest;
  manifest_digest: Digest;
  admitted_runtime_profile_digests: readonly [Digest, ...Digest[]];
  release_profile_contract_digest: Digest;
}

interface Task6RuntimeProfile {
  contract_version: "contentmd.task6-runtime-profile/0.1.0";
  node_version: "24.14.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
  profile_digest: Digest;
}

interface VerifiedTask6CodeManifest {
  readonly manifest: Task6CodeManifest;
  readonly manifest_raw_bytes_digest: Digest;
  readonly release_profile_contract_digest: Digest;
  readonly verification_digest: Digest;
}

interface ObservedTask6RuntimeTuple {
  node_version: "24.14.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
}

interface VerifiedTask6Runtime {
  readonly profile: Task6RuntimeProfile;
  readonly artifact_ref: import("./records.js").ArtifactRef;
  readonly observed_runtime: ObservedTask6RuntimeTuple;
  readonly release_profile_contract_digest: Digest;
  readonly verification_digest: Digest;
}

type SimulatorOperation =
  | "evaluation_attempt_claim"
  | "evaluation_test_open"
  | "evaluation_terminal_append"
  | "shadow_start_append"
  | "shadow_observation_append"
  | "shadow_completion_claim"
  | "shadow_terminal_append"
  | "binding_prepare"
  | "binding_commit"
  | "binding_readback"
  | "drift_report_append"
  | "suspension_prepare"
  | "suspension_commit"
  | "suspension_readback"
  | "rollback_prepare"
  | "rollback_commit"
  | "rollback_readback";

interface SimulatorFaultRule {
  operation: SimulatorOperation;
  occurrence: number;
  fault: "before_append" | "after_commit_before_ack" | "readback_unavailable";
}

interface CreateEvaluationSimulatorVaultInput {
  record_mode: Task6RecordMode;
  vault_id: string;
  fault_rules: readonly SimulatorFaultRule[];
}

interface RestoreEvaluationSimulatorVaultInput {
  record_mode: Task6RecordMode;
  snapshot: EvaluationSimulatorSnapshot;
  fault_rules: readonly SimulatorFaultRule[];
}

interface EvaluationSimulatorVault {
  readonly contract_version: "contentmd.evaluation-simulator-vault/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly vault_id: string;
  readonly root_lineage_id: string;
  readonly transfer_generation: number;
}

interface EvaluationSimulatorSnapshot {
  contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  vault_id: string;
  root_lineage_id: string;
  transfer_generation: number;
  transfer_state: "source_retired_restore_once";
  exported_at: Rfc3339Instant;
  state_encoding: "base64-canonical-dag-json-utf8";
  state_bytes_base64: string;
  state_byte_count: number;
  state_digest: Digest;
  snapshot_digest: Digest;
}

type EvaluationAttemptState =
  | "completed"
  | "failed"
  | "invalid"
  | "consumed_unopened"
  | "consumed_incomplete";

interface EvaluationAttemptStatus {
  contract_version: "contentmd.evaluation-attempt-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  attempt_id: string;
  attempt_key: Digest;
  state: EvaluationAttemptState;
  claim_event_ref: Task6ObjectRef;
  open_event_ref: Task6ObjectRef | null;
  terminal_event_ref: Task6ObjectRef | null;
  evaluation_ref: Task6ObjectRef | null;
  consumed: true;
  status_digest: Digest;
}

interface EvaluationRunRequest {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  sealed_test: VerifiedSealedTestHandle;
  attempt_id: string;
  opened_at: Rfc3339Instant;
  actor_ref: string;
}

interface EvaluationRunResult {
  contract_version: "contentmd.sealed-evaluation-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  attempt_status: EvaluationAttemptStatus;
  evaluation_record: import("./records.js").LearningEvaluationRun;
  population: EvaluationPopulation | EvaluationFailureEvidence;
  overall_metrics: EvaluationMetricResult | EvaluationFailureEvidence;
  slice_metrics: readonly [SliceMetricResult, ...SliceMetricResult[]];
  failures: readonly EvaluationFailureEvidence[];
  bootstrap: PairedBootstrapResult | null;
  predicate: EvaluationPredicateResult;
  result_digest: Digest;
}

interface EvaluationPopulationPair {
  ordinal: number;
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  label: 0 | 1;
  slice_ids: readonly [string, string, string, string, string];
  baseline_probability: Binary64Value;
  candidate_probability: Binary64Value;
  pair_digest: Digest;
}

interface EvaluationPopulation {
  contract_version: "contentmd.evaluation-population/0.1.0";
  population_id: string;
  pair_order: readonly [EvaluationPopulationPair, ...EvaluationPopulationPair[]];
  decisive_pair_count: number;
  leakage_group_order: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  leakage_group_count: number;
  coverage: Binary64Value;
  qualification_denominator: number;
  tie_count: number;
  abstention_count: number;
  population_digest: Digest;
}

interface EvaluationMetricResult {
  contract_version: "contentmd.evaluation-metric-result/0.1.0";
  metric_result_id: string;
  pair_count: number;
  leakage_group_count: number;
  coverage: Binary64Value;
  baseline_accuracy: Binary64Value;
  candidate_accuracy: Binary64Value;
  accuracy_difference: Binary64Value;
  baseline_log_loss: Binary64Value;
  candidate_log_loss: Binary64Value;
  log_loss_difference: Binary64Value;
  metric_digest: Digest;
}

interface EvaluationFailureEvidence {
  contract_version: "contentmd.evaluation-failure-evidence/0.1.0";
  failure_id: string;
  stage:
    | "population"
    | "coverage"
    | "metric"
    | "slice"
    | "currentness"
    | "reviewer_policy"
    | "bootstrap"
    | "predicate";
  reason_code: Task6GovernanceErrorCode;
  predicate_check: EvaluationPredicateResult["checks"][number]["check"] | null;
  expected_pair_count: number;
  completed_pair_count: number;
  subject_ref: Task6ObjectRef;
  failure_digest: Digest;
}

interface SliceMetricResult {
  contract_version: "contentmd.slice-metric-result/0.1.0";
  slice: EvaluationSliceDefinition;
  metrics: EvaluationMetricResult | EvaluationFailureEvidence | null;
  support_state: "supported" | "insufficient" | "empty" | "invalid";
  result_digest: Digest;
}

interface PairedBootstrapInterval {
  lower: Binary64Value;
  upper: Binary64Value;
}

interface SliceBootstrapResult {
  slice_ref: Task6ObjectRef;
  pair_count: number;
  leakage_group_count: number;
  accuracy_difference: PairedBootstrapInterval | null;
  log_loss_difference: PairedBootstrapInterval | null;
  support_state: "supported" | "insufficient" | "empty";
  replicate_vector_digest: Digest | null;
}

interface PairedBootstrapResult {
  contract_version: "contentmd.paired-group-bootstrap-result/0.1.0";
  bootstrap_id: string;
  seed_digest: Digest;
  group_order: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  replicate_count: 10000;
  draw_algorithm: "sha256-counter-u64be-rejection-v1";
  interval_method: "nearest-rank-2.5-97.5";
  accuracy_difference: PairedBootstrapInterval;
  log_loss_difference: PairedBootstrapInterval;
  slice_results: readonly [SliceBootstrapResult, ...SliceBootstrapResult[]];
  overall_replicate_vector_digest: Digest;
  bootstrap_digest: Digest;
}

interface PairedBootstrapSeedInput {
  record_mode: Task6RecordMode;
  dataset_ref: Task6ObjectRef;
  candidate_model_ref: Task6ObjectRef;
  baseline_ref: Task6ObjectRef;
  feature_profile_ref: Task6ObjectRef;
  evaluation_code_manifest_digest: Digest;
}

interface PairedGroupBootstrapInput {
  record_mode: Task6RecordMode;
  seed_digest: Digest;
  population: EvaluationPopulation;
  declared_slices: readonly [EvaluationSliceDefinition, ...EvaluationSliceDefinition[]];
}

interface EvaluationPredicateResult {
  contract_version: "contentmd.evaluation-predicate-result/0.1.0";
  predicate_id: string;
  checks: readonly [
    { check: "coverage_exactly_one"; passed: boolean },
    { check: "accuracy_lower_bound_positive"; passed: boolean },
    { check: "log_loss_upper_bound_negative"; passed: boolean },
    { check: "required_slices_supported"; passed: boolean },
    { check: "required_slice_accuracy_lower_bound"; passed: boolean },
    { check: "required_slice_log_loss_upper_bound"; passed: boolean },
    { check: "currentness_passed"; passed: boolean },
    { check: "reviewer_policy_passed"; passed: boolean },
    { check: "hard_rule_regression_zero"; passed: boolean }
  ];
  evaluation_passed: boolean;
  promotion_ready_without_shadow_or_decision: boolean;
  authority_effect: "none";
  predicate_digest: Digest;
}
```

Shadow, binding, drift, and rollback types are:

```ts
interface CreateShadowEvaluationPlanInput {
  record_mode: Task6RecordMode;
  sealed_test: VerifiedSealedTestHandle;
  start_at: Rfc3339Instant;
  earliest_end_at: Rfc3339Instant;
  proposed_end_at: Rfc3339Instant;
  input_selection_ref: Task6ObjectRef;
}

interface StartShadowSimulationInput {
  record_mode: Task6RecordMode;
  plan: import("./records.js").ShadowEvaluationPlan;
  sealed_test: VerifiedSealedTestHandle;
  shadow_run_id: string;
  actor_ref: string;
}

interface ShadowSimulationHandle {
  readonly contract_version: "contentmd.shadow-simulation-handle/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly shadow_run_id: string;
  readonly plan_ref: Task6ObjectRef;
  readonly sealed_test_handle_id: string;
  readonly start_event_ref: Task6ObjectRef;
  readonly handle_digest: Digest;
}

interface ShadowObservationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  shadow_run_id: string;
  observation_id: string;
  observed_at: Rfc3339Instant;
  outcome_replay: ShadowOutcomeReplay;
  candidates: readonly [
    VerifiedPairwiseCandidate,
    VerifiedPairwiseCandidate,
    ...VerifiedPairwiseCandidate[]
  ];
}

interface ShadowOutcomeReplay {
  dataset: DriftDatasetReplay;
  pair: DriftPairReplay;
}

interface ShadowObservationResponse {
  contract_version: "contentmd.shadow-active-only-response/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_run_id: string;
  observation_id: string;
  input_digest: Digest;
  active_ordered_candidate_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  active_output_digest: Digest;
  response_digest: Digest;
}

interface ShadowRunResult {
  contract_version: "contentmd.shadow-simulation-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_result_id: string;
  plan_ref: Task6ObjectRef;
  observation_count: number;
  decisive_pair_count: number;
  leakage_group_count: number;
  started_at: Rfc3339Instant;
  ended_at: Rfc3339Instant;
  active_input_digest: Digest;
  active_output_digest: Digest;
  shadow_output_digest: Digest;
  public_response_set_digest: Digest;
  expected_active_only_response_set_digest: Digest;
  no_influence_verified: boolean;
  completion_state: "completed" | "insufficient" | "invalid";
  result_digest: Digest;
}

interface CompleteShadowSimulationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  shadow: ShadowSimulationHandle;
  ended_at: Rfc3339Instant;
  actor_ref: string;
}

interface ShadowRunStatus {
  contract_version: "contentmd.shadow-run-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  shadow_run_id: string;
  state: "started" | "observing" | "completed" | "insufficient" | "invalid" | "consumed_incomplete";
  observation_count: number;
  last_observation_at: Rfc3339Instant | null;
  completion_claim_event_ref: Task6ObjectRef | null;
  terminal_result_ref: Task6ObjectRef | null;
  status_digest: Digest;
}

interface SimulatedPromotionDecision {
  contract_version: "contentmd.simulated-promotion-decision/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  decision_id: string;
  evaluation_ref: Task6ObjectRef;
  shadow_result_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
  actor_fixture_ref: Task6ObjectRef;
  rationale: string;
  decision: "approve_simulation" | "reject_simulation";
  expected_head_digest: Digest | null;
  decision_digest: Digest;
}

interface CreateSimulatedPromotionDecisionInput {
  record_mode: Task6RecordMode;
  evaluation: EvaluationRunResult;
  shadow_result: ShadowRunResult;
  proposed_scope: ProposedBindingScope;
  actor_fixture_ref: Task6ObjectRef;
  rationale: string;
  decision: "approve_simulation" | "reject_simulation";
  expected_head_digest: Digest | null;
}

interface SimulatedProposedProjection {
  contract_version: "contentmd.simulated-proposed-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  stream_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  prior_verified_projection_digest: Digest;
  prior_verified_head_digest: Digest | null;
  prior_verified_transition_id: string | null;
  baseline_ref: Task6ObjectRef;
  current_model_ref: Task6ObjectRef | null;
  proposed_state: "baseline" | "candidate" | "suspended";
  proposed_model_ref: Task6ObjectRef | null;
  superseded_verified_event_digests: readonly Digest[];
  proposed_projection_digest: Digest;
}

interface SimulatedVerifiedBindingProjection {
  contract_version: "contentmd.simulated-binding-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  projection_id: string;
  projection_stage: "verified";
  stream_id: string;
  verified_head_digest: Digest | null;
  physical_head_digest: Digest | null;
  state: "baseline" | "candidate" | "suspended";
  baseline_ref: Task6ObjectRef | null;
  model_ref: Task6ObjectRef | null;
  verified_transition_id: string | null;
  pending_transition_id: null;
  pending_proposed_projection_digest: null;
  superseded_verified_event_digests: readonly Digest[];
  projection_digest: Digest;
}

interface SimulatedPendingBindingProjection {
  contract_version: "contentmd.simulated-binding-projection/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  projection_id: string;
  projection_stage: "pending";
  stream_id: string;
  verified_head_digest: Digest | null;
  physical_head_digest: Digest;
  state: "pending_readback";
  baseline_ref: Task6ObjectRef | null;
  model_ref: Task6ObjectRef | null;
  verified_transition_id: string | null;
  pending_transition_id: string;
  pending_proposed_projection_digest: Digest;
  superseded_verified_event_digests: readonly Digest[];
  projection_digest: Digest;
}

type SimulatedBindingProjection =
  | SimulatedVerifiedBindingProjection
  | SimulatedPendingBindingProjection;

type SimulatedEventPhase = "prepare" | "commit" | "readback";

interface SimulatedTransitionPreparedPayload {
  contract_version: "contentmd.simulated-transition-prepared-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "prepare";
  transition_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  binding_stream_id: string;
  expected_binding_head_digest: Digest | null;
  prior_verified_projection_digest: Digest;
  proposed_projection_digest: Digest;
  transition_evidence_digest: Digest;
}

interface SimulatedPromotionCommitPayload {
  contract_version: "contentmd.simulated-promotion-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "promotion";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: Digest | null;
  prior_verified_projection_digest: Digest;
  proposed_projection_digest: Digest;
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  evaluation_ref: Task6ObjectRef;
  shadow_result_ref: Task6ObjectRef;
  decision_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedSuspensionCommitPayload {
  contract_version: "contentmd.simulated-suspension-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "suspension";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: Digest;
  prior_verified_projection_digest: Digest;
  proposed_projection_digest: Digest;
  baseline_ref: Task6ObjectRef;
  model_ref: Task6ObjectRef;
  cause_kind: "drift" | "revocation";
  cause_ref: Task6ObjectRef;
  proposed_scope_ref: Task6ObjectRef;
}

interface SimulatedRollbackCommitPayload {
  contract_version: "contentmd.simulated-rollback-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "rollback";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: Digest;
  prior_verified_projection_digest: Digest;
  proposed_projection_digest: Digest;
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: Task6ObjectRef;
  requested_target_event_digest: Digest | null;
  selected_target_event_digest: Digest;
  ordered_target_event_digests: readonly [Digest, ...Digest[]];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: SimulateRollbackInput["reason_code"];
}

interface SimulatedFallbackBaselineCommitPayload {
  contract_version: "contentmd.simulated-fallback-baseline-commit-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "commit";
  transition_id: string;
  transition_kind: "fallback_baseline";
  prepare_event_ref: Task6ObjectRef;
  expected_binding_head_digest: Digest;
  prior_verified_projection_digest: Digest;
  proposed_projection_digest: Digest;
  baseline_ref: Task6ObjectRef;
  from_model_ref: Task6ObjectRef;
  to_model_ref: null;
  requested_target_event_digest: Digest | null;
  selected_target_event_digest: null;
  ordered_target_event_digests: readonly Digest[];
  proposed_scope_ref: Task6ObjectRef;
  reason_code: SimulateRollbackInput["reason_code"];
}

interface SimulatedReadbackVerifiedPayload {
  contract_version: "contentmd.simulated-readback-verified-payload/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  phase: "readback";
  transition_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  prepare_event_ref: Task6ObjectRef;
  commit_event_ref: Task6ObjectRef;
  expected_commit_digest: Digest;
  observed_commit_digest: Digest;
  proposed_projection_digest: Digest;
  complete_lineage_digest: Digest;
}

type SimulatedLearningEventPayload =
  | SimulatedTransitionPreparedPayload
  | SimulatedPromotionCommitPayload
  | SimulatedSuspensionCommitPayload
  | SimulatedRollbackCommitPayload
  | SimulatedFallbackBaselineCommitPayload
  | SimulatedReadbackVerifiedPayload;

interface SimulatedBindingTransitionResult {
  contract_version: "contentmd.simulated-binding-transition-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  transition_id: string;
  transition_kind: "promotion" | "suspension" | "rollback" | "fallback_baseline";
  prepare_event_ref: Task6ObjectRef;
  commit_event_ref: Task6ObjectRef;
  readback_event_ref: Task6ObjectRef;
  readback_receipt_ref: Task6ObjectRef;
  projection: SimulatedVerifiedBindingProjection;
  result_digest: Digest;
}

interface SimulatePromotionBindingInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  project_id: string;
  proposed_scope: ProposedBindingScope;
  baseline_ref: Task6ObjectRef;
  evaluation: EvaluationRunResult;
  shadow_result: ShadowRunResult;
  decision: SimulatedPromotionDecision;
  actor_ref: string;
  occurred_at: Rfc3339Instant;
}

interface RecoverSimulatedBindingReadbackInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  transition_id: string;
  expected_commit_head_digest: Digest;
  actor_ref: string;
  occurred_at: Rfc3339Instant;
}

interface DriftDatasetReplay {
  contract_version: "contentmd.drift-dataset-replay/0.1.0";
  build_input: import("./dataset.js").BuildLearningDatasetInput;
  expected_build_result: import("./dataset.js").LearningDatasetBuildResult;
}

interface DriftPairReplay {
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
  risk_slice_witness: RiskSliceWitness;
}

interface DriftObservation {
  observation_id: string;
  observed_at: Rfc3339Instant;
  pair: DriftPairReplay;
}

interface EvaluateDriftWindowInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: Digest;
  actor_ref: string;
  previous_report: import("./records.js").LearningDriftReport | null;
  promotion_evaluation: EvaluationRunResult;
  dataset_replay: DriftDatasetReplay;
  currentness: SimulatedCurrentnessWitness;
  observations: readonly DriftObservation[];
  evaluation_at: Rfc3339Instant;
}

interface DriftWindowCursor {
  started_at: Rfc3339Instant;
  after_observation_id: string | null;
}

interface DriftWindowStatus {
  contract_version: "contentmd.drift-window-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  drift_input_digest: Digest;
  binding_stream_id: string;
  state:
    | "report_committed"
    | "suspension_prepared"
    | "suspension_pending_readback"
    | "completed";
  report_ref: Task6ObjectRef;
  next_cursor: DriftWindowCursor;
  selected_observation_count: number;
  suspension_transition_id: string | null;
  terminal_result_digest: Digest | null;
  status_digest: Digest;
}

interface DriftWindowPopulation {
  contract_version: "contentmd.drift-window-population/0.1.0";
  population_id: string;
  binding_stream_id: string;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  window_started_at: Rfc3339Instant;
  window_ended_at: Rfc3339Instant;
  close_reason: "pair_cap" | "day_30";
  selected_observation_ids: readonly string[];
  leakage_group_refs: readonly Task6ObjectRef[];
  pair_count: number;
  leakage_group_count: number;
  population_digest: Digest;
}

interface DriftMetricDeltaResult {
  contract_version: "contentmd.drift-metric-delta-result/0.1.0";
  metric_delta_id: string;
  window_state: "evaluable" | "monitoring_insufficient";
  pair_count: number;
  leakage_group_count: number;
  accuracy_difference_from_promotion: Binary64Value | null;
  log_loss_difference_from_promotion: Binary64Value | null;
  required_slice_result_refs: readonly Task6ObjectRef[];
  bootstrap_ref: Task6ObjectRef | null;
  metric_delta_digest: Digest;
}

interface LearningDriftResult {
  contract_version: "contentmd.learning-drift-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  report: import("./records.js").LearningDriftReport;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  close_reason: "pair_cap" | "day_30";
  metric_delta: DriftMetricDeltaResult;
  metrics: EvaluationMetricResult | null;
  slice_metrics: readonly SliceMetricResult[];
  bootstrap: PairedBootstrapResult | null;
  disposition: "continue" | "review" | "suspend";
  suspension_transition: SimulatedBindingTransitionResult | null;
  result_digest: Digest;
}

interface LearningDriftResultPreimage {
  contract_version: "contentmd.learning-drift-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  report: import("./records.js").LearningDriftReport;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  close_reason: "pair_cap" | "day_30";
  metric_delta: DriftMetricDeltaResult;
  metrics: EvaluationMetricResult | null;
  slice_metrics: readonly SliceMetricResult[];
  bootstrap: PairedBootstrapResult | null;
  disposition: "continue" | "review" | "suspend";
}

interface StoredDriftWindowReceipt {
  contract_version: "contentmd.stored-drift-window-receipt/0.1.0";
  request_digest: Digest;
  drift_input_digest: Digest;
  binding_stream_id: string;
  report: import("./records.js").LearningDriftReport;
  window_population: DriftWindowPopulation;
  metric_delta: DriftMetricDeltaResult;
  start_cursor: DriftWindowCursor;
  next_cursor: DriftWindowCursor;
  close_reason: "pair_cap" | "day_30";
  selected_observation_ids: readonly string[];
  result_preimage: LearningDriftResultPreimage;
  stored_receipt_digest: Digest;
}

interface SimulatedRevocationWitness {
  contract_version: "contentmd.simulated-revocation-witness/0.1.0";
  witness_id: string;
  revoked_ref: Task6ObjectRef;
  revoked_at: Rfc3339Instant;
  reason:
    | "source_revoked"
    | "qualification_revoked"
    | "permission_revoked"
    | "rights_revoked"
    | "privacy_failure"
    | "hard_rule_failure"
    | "copying_failure"
    | "authority_failure";
  replacement_ref: Task6ObjectRef | null;
  witness_digest: Digest;
  record_mode: "development_fixture";
  authority_effect: "none";
}

interface PropagateLearningRevocationInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: Digest;
  revocation: SimulatedRevocationWitness;
  actor_ref: string;
  occurred_at: Rfc3339Instant;
}

interface RollbackTargetReplay {
  verified_binding_event_digest: Digest;
  model_record: import("./records.js").RankingModelRecord;
  model_dependencies: RankingModelDependencies;
  currentness: SimulatedCurrentnessWitness;
}

interface SimulateRollbackInput {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  binding_stream_id: string;
  expected_head_digest: Digest;
  requested_target_event_digest: Digest | null;
  ordered_target_replays: readonly RollbackTargetReplay[];
  fallback_baseline_ref: Task6ObjectRef;
  reason_code:
    | "operator_simulation"
    | "drift_suspension"
    | "lineage_revocation"
    | "currentness_failure"
    | "incident_recovery";
  actor_ref: string;
  occurred_at: Rfc3339Instant;
}
```

The public functions are exactly:

```ts
verifyTask6CodeManifest(manifest: Task6CodeManifest): VerifiedTask6CodeManifest;
admitTask6Runtime(profile: Task6RuntimeProfile): VerifiedTask6Runtime;
createEvaluationSimulatorVault(input: CreateEvaluationSimulatorVaultInput): EvaluationSimulatorVault;
restoreEvaluationSimulatorVault(input: RestoreEvaluationSimulatorVaultInput): EvaluationSimulatorVault;
exportEvaluationSimulatorSnapshot(vault: EvaluationSimulatorVault): EvaluationSimulatorSnapshot;
verifySealedTestReplay(vault: EvaluationSimulatorVault, input: VerifySealedTestReplayInput): VerifiedSealedTestHandle;
inspectEvaluationAttempt(vault: EvaluationSimulatorVault, attemptId: string): EvaluationAttemptStatus | null;
runSealedEvaluation(input: EvaluationRunRequest): EvaluationRunResult;
derivePairedBootstrapSeed(input: PairedBootstrapSeedInput): Digest;
runPairedGroupBootstrap(input: PairedGroupBootstrapInput): PairedBootstrapResult;
createShadowEvaluationPlan(input: CreateShadowEvaluationPlanInput): import("./records.js").ShadowEvaluationPlan;
startShadowSimulation(vault: EvaluationSimulatorVault, input: StartShadowSimulationInput): ShadowSimulationHandle;
observeShadowSimulation(input: ShadowObservationInput): ShadowObservationResponse;
completeShadowSimulation(input: CompleteShadowSimulationInput): ShadowRunResult;
inspectShadowSimulation(vault: EvaluationSimulatorVault, shadowRunId: string): ShadowRunStatus | null;
createSimulatedPromotionDecision(input: CreateSimulatedPromotionDecisionInput): SimulatedPromotionDecision;
simulatePromotionBinding(input: SimulatePromotionBindingInput): SimulatedBindingTransitionResult;
recoverSimulatedBindingReadback(input: RecoverSimulatedBindingReadbackInput): SimulatedBindingTransitionResult;
inspectSimulatedBinding(vault: EvaluationSimulatorVault, streamId: string): SimulatedBindingProjection | null;
evaluateDriftWindow(input: EvaluateDriftWindowInput): LearningDriftResult;
inspectDriftWindow(vault: EvaluationSimulatorVault, driftInputDigest: Digest): DriftWindowStatus | null;
propagateLearningRevocation(input: PropagateLearningRevocationInput): SimulatedBindingTransitionResult | null;
simulateRollback(input: SimulateRollbackInput): SimulatedBindingTransitionResult;
```

`EvaluationSimulatorSnapshot`, `PairedBootstrapSeedInput`, `PairedGroupBootstrapInput`, `StartShadowSimulationInput`, `ShadowSimulationHandle`, `CompleteShadowSimulationInput`, `ShadowRunStatus`, `CreateSimulatedPromotionDecisionInput`, `SimulatePromotionBindingInput`, `RecoverSimulatedBindingReadbackInput`, `LearningDriftResult`, `PropagateLearningRevocationInput`, `Task6GovernanceError`, `Task6GovernanceErrorCode`, and `Task6GovernanceErrorShape` are public closed types defined by sections 6 and 10–17. No overload or options bag may add undeclared behavior.

## 6. Opaque vault, sealed-test replay, and truthful one-shot simulation

`EvaluationSimulatorVault` is authenticated by a module-private `WeakSet`; its state lives in a module-private `WeakMap`. A module-private root-lineage registry additionally maps each `root_lineage_id` to exactly one lifecycle state and at most one live vault token. It stores copied, frozen complete replay values, attempt ledgers, shadow ledgers, event streams, transition receipts, projections, and occurrence counters. Every state-changing function is synchronous from the first vault-state read through the final append and copy, so two calls sharing one live lineage cannot interleave inside a transition. Separate processes, workers, module copies, or independently created vault lineages do not share state and are not coordinated.

This boundary truthfully enforces one-shot consumption only for callers using one live root lineage: the original opaque vault or exactly one successor produced by the transfer protocol below, never both. `verifySealedTestReplay()` cannot make the caller forget the Task 3/5 replay bytes it supplied. The handle is not a confidentiality boundary, enclave, DRM mechanism, official sealed store, cross-process lock, or proof that the caller did not inspect or copy test subjects. The simulator may support TDD of consumption mechanics; it must never label that evidence `official`, `secret`, or tamper-resistant.

`verifySealedTestReplay()` performs these resolver-free steps:

1. apply the Task 6 mode gate;
2. verify and admit the exact release-owned Task 6 code/runtime manifests;
3. call Task 5 `verifyLearningDatasetForTraining()` with the complete dataset replay;
4. reauthenticate the model dependency request before calling `verifyRankingModel()`: rerun `verifyLearningDatasetForTraining()` from `training_request.dataset.replay`, rerun `verifyPairwiseFeatureMatrix()` from that authenticated dataset and `training_request.feature_matrix.replay`, rerun `verifyPairwiseCodeManifest()` from the supplied manifest, rerun `admitPairwiseRuntime()` from the supplied profile, rebuild the exact `PairwiseTrainingRequest`, and require its verified canonical-DAG root digest to equal the complete caller-carried request root digest; then call Task 5 `verifyRankingModel()` with that rebuilt request and require its dataset/profile refs to equal the sealed dataset and feature-profile replay;
5. require the model dependencies to contain the same complete dataset replay byte-for-byte;
6. require `test_pairs.map(example_ref)` to equal the sealed manifest's `test_example_refs` position-for-position, with no omission, addition, independent sort, train/validation ref, or duplicate;
7. locate each complete Task 3 subject and its unique leakage group in the replayed build result and derive label, candidates, task, context, project, reviewer refs, and checkpoint; separately call Task 2 `qualifyFeedback()` for every complete qualification-denominator member, require byte equality with every expected record, require every decisive sealed-test qualification exactly once, and derive the qualification denominator plus tie/abstention counts;
8. call Task 5 `verifyPairwiseCandidate()` for both candidate replays and require exact candidate refs, hard eligibility, project/context/target/checkpoint/universe/profile/runtime equality, and byte-equal feature values;
9. derive project, product-area, channel, and locale slices from the complete Task 2 context snapshot nested in the Task 3 subject; verify the risk witness digest, refs, task, and context, then use its development-fixture `risk_value` without claiming official semantic authority;
10. verify the proposed scope, declared slice universe, currentness witness, reviewer-policy witness, and deterministic baseline profile; and
11. copy the complete replay into the vault and return only an opaque handle without candidate expressions, labels, vectors, or test rows.

After a verified snapshot is restored, `verifySealedTestReplay()` may reauthenticate the exact complete replay already stored under the same derived `handle_id`. It must repeat every verification above and require the stored and rederived `{handle, replay, population, verification digests}` values to have the same `contentmd.canonical-dag/0.1.0` root digest. On exact equality it returns a new module-local opaque handle bound to the one active successor without appending a second stored replay or resetting any attempt state. A same-ID mismatch, a second stored match, or an incomplete replay is `task6_sealed_test_invalid`. This is the only way a fresh module may regain a handle-bound capability after importing snapshot bytes; the serialized handle object itself is never trusted or admitted as opaque authority.

`test_population_ref` has schema ID `contentmd.evaluation-population`, version `0.1.0`, and content digest equal to the population digest derived before opening but stored only in the vault. The handle ID is `sealed_test_handle.` plus the first 32 characters of:

```text
complete_replay_digest = sha256Canonical({
  contract_version: "contentmd.sealed-test-complete-replay/0.1.0",
  replay
})

replay_verification_digest = sha256Canonical({
  contract_version: "contentmd.sealed-test-replay-verification/0.1.0",
  complete_replay_digest,
  dataset_verification_digest,
  model_verification_digest,
  ordered_candidate_verification_digests,
  ordered_risk_witness_digests,
  qualification_denominator_replay_digest,
  proposed_scope_digest,
  ordered_declared_slice_digests,
  currentness_witness_digest,
  reviewer_policy_witness_digest,
  baseline_digest,
  test_population_digest,
  code_verification_digest,
  runtime_verification_digest
})
```

`replay` is the complete verified `SealedTestReplay`, including all nested Task 3/5 inputs and expected outputs; its digest is calculated only after every caller-carried digest is rederived. `dataset_verification_digest` and `model_verification_digest` are copied from the exact Task 5 opaque results. `ordered_candidate_verification_digests` is the dense vector in sealed test-pair order, candidate A then B. `ordered_risk_witness_digests` is in that same pair order. Declared-slice digests remain in canonical declared order. Every scalar digest is the rederived digest of the complete named value, not a caller alias. Neither `replay_verification_digest` nor any handle field occurs in either preimage.

The handle identity is:

```text
handle_digest = sha256Canonical({
  contract_version: "contentmd.verified-sealed-test-handle/0.1.0",
  record_mode: "development_fixture",
  authority_effect: "none",
  dataset_ref,
  model_ref,
  test_population_ref,
  proposed_scope_ref,
  replay_verification_digest,
  code_verification_digest,
  runtime_verification_digest
})
```

The evaluation attempt key is:

```text
sha256Canonical({
  contract_version: "contentmd.sealed-evaluation-attempt-key/0.1.0",
  dataset_ref,
  model_ref,
  test_population_ref,
  proposed_scope_ref,
  evaluation_code_manifest_digest
})
```

Only one claim may exist for an attempt key across a vault, regardless of `attempt_id`. `runSealedEvaluation()` atomically appends `evaluation_attempt_claimed` before test access. That append permanently consumes the key. It then appends `evaluation_test_opened` before reading the vault's pair material, computes the result, and appends exactly one `evaluation_completed`, `evaluation_failed`, or `evaluation_invalid` terminal event before returning a result.

Fault rules are unique and sorted by `SimulatorOperation` declaration order then positive safe-integer `occurrence`; two rules may not target the same operation/occurrence. The occurrence counter advances exactly once immediately before that operation's one named durable append and survives snapshots. `before_append` throws `task6_simulated_crash` before bytes or consumption change. `after_commit_before_ack` appends, advances durable state, and throws before returning. `readback_unavailable` appends, then throws `task6_event_readback_failed` when the operation's mandatory independent read fails. Each rule fires once. Every operation name in the union denotes exactly one append: evaluation claim/open/terminal; shadow start/observation/completion-claim/terminal; promotion prepare/commit/readback; drift report; suspension prepare/commit/readback; or rollback/fallback prepare/commit/readback. A fault value on any other operation/append pairing is shape-invalid.

The attempt crash equations are exact:

| Durable simulator evidence | Inspected state | May retry or reopen |
| --- | --- | --- |
| no claim event | no status | a caller may explicitly call once; no automatic retry occurs |
| claim committed, open absent | `consumed_unopened` | no |
| open committed, terminal absent | `consumed_incomplete` | no |
| terminal `completed` | `completed` | no |
| terminal `failed` | `failed` | no |
| terminal `invalid` | `invalid` | no |

A `before_append` fault writes nothing. An `after_commit_before_ack` fault throws after the event exists; inspection reveals the resulting consumed state. `readback_unavailable` after claim is also consumed and cannot be retried. A duplicate or concurrent second claim fails `task6_evaluation_attempt_consumed`. The simulator never silently creates a new attempt ID, candidate model, dataset, or holdout.

`createEvaluationSimulatorVault()` derives `root_lineage_id = "evaluation_vault_lineage." + first32(sha256Canonical({contract_version: "contentmd.evaluation-vault-root-lineage/0.1.0", vault_id}))`, assigns generation `0`, and reserves both IDs for the module lifetime. A second create with the same vault or lineage ID throws `task6_snapshot_lineage_fork`; retirement never releases the reservation. Every handle is bound to the root lineage rather than a particular generation. A stateful call with a vault argument must receive the registry's one active token; a handle-only stateful call resolves its opaque handle to the lineage and requires that lineage to have an active token before accessing state.

`EvaluationSimulatorSnapshot` has the exact envelope in section 5. Decoded `state_bytes_base64` must be UTF-8 canonical JSON for a `contentmd.canonical-dag/0.1.0` value whose decoded root is the exact closed internal object `{contract_version: "contentmd.evaluation-simulator-state/0.1.0", root_lineage_id, transfer_generation, operation_occurrences, handles, attempts, shadow_runs, streams, transition_receipts}`. The DAG node table, every node digest, `root_digest`, and `manifest_digest` are verified before the root is reconstructed; dangling, cyclic, duplicate, noncanonical, unreachable, or tampered nodes are `task6_snapshot_invalid`. Those six state arrays contain the complete frozen values already admitted to the vault; repeated evidence may share content-addressed DAG nodes, arrays are sorted by raw UTF-8 primary ID, and event arrays retain sequence order. `state_byte_count` is the decoded DAG-JSON byte length, `state_digest` is raw-byte SHA-256, and `snapshot_digest = sha256Canonical()` over every envelope field except itself. Noncanonical DAG JSON, an unknown internal key, a value not reproducible from its complete replay, or a missing nested object is `task6_snapshot_invalid`. `exported_at` is the maximum explicit event time in the reconstructed state or the fixed string `1970-01-01T00:00:00.000Z` for an empty vault; it never reads the clock.

`exportEvaluationSimulatorSnapshot()` is a transfer, not a copy. It requires the exact active token, builds and verifies generation `g + 1` snapshot bytes, and then performs one synchronous registry mutation that marks the source token `retired`, clears the active-token slot, and records `{status: "awaiting_restore", pending_snapshot_digest, transfer_generation: g + 1}` before returning the snapshot. No stateful API, inspection API, second export, attempt claim, shadow operation, drift operation, transition, or rollback may use the retired source; all throw `task6_vault_retired` before reading mutable state. Failure before that atomic mutation returns no snapshot and leaves the source active. Once the mutation occurs, the source never becomes live again.

`restoreEvaluationSimulatorVault()` applies the mode gate, validates the complete envelope/state, and rebuilds every digest, event chain, attempt equation, shadow chronology, transition receipt, and projection from genesis; it never trusts serialized projections or opaque-token claims. In the originating module it accepts only the registry's exact awaiting-restore digest/generation, atomically marks that snapshot consumed, creates one generation-`g + 1` successor token, and installs that token as the sole active lineage instance. A second restore of the same snapshot is `task6_snapshot_already_restored`; restore while any lineage token is active or from a divergent generation/digest is `task6_snapshot_lineage_fork`. An invalid snapshot remains unconsumed but can never be repaired by ignoring a field. In a fresh module, the first fully verified imported snapshot reserves its root/generation and becomes the one active token; another import of that lineage is rejected in that module. Because opaque handles cannot be serialized or recreated, a fresh-module import may use only ID-addressed inspection/recovery APIs and cannot open or complete a handle-bound attempt; this is fail-closed. Another process or module copy can still import copied bytes without detection, which is an explicit non-authoritative limitation rather than a security claim.

Restore-specific precedence is non-overlapping and overrides the generic post-mode classes in section 17:

| First observed restore condition | Exact outcome |
| --- | --- |
| top-level descriptor/mode property is malformed | `task6_input_shape_invalid` |
| top-level mode is exact `official` | `task6_official_mode_not_supported` before snapshot read |
| nested snapshot/envelope/state shape, canonical bytes, byte count, root derivation, generation equality, state digest, snapshot digest, or rebuilt internal evidence is invalid | `task6_snapshot_invalid`; registry/consumed sets are not consulted or mutated |
| the fully valid exact `snapshot_digest` is already in that root lineage's consumed-snapshot set | `task6_snapshot_already_restored`, even when its successor is currently active; this wins over active-lineage fork |
| the fully valid digest is not consumed and that root lineage currently has an active token | `task6_snapshot_lineage_fork` |
| lineage is `awaiting_restore` and digest plus generation equal the one pending transfer | atomically install the sole successor and consume the digest |
| lineage is `awaiting_restore` but a fully valid snapshot has a different digest, stale/later generation, divergent state digest, or non-pending transfer | `task6_snapshot_lineage_fork` |
| lineage is known but neither active nor awaiting this exact transfer | `task6_snapshot_lineage_fork` |
| root lineage is unknown in this fresh module and the snapshot is fully valid | reserve the imported root/generation, consume the digest, and install the sole active token |

Thus an exact second restore is always `task6_snapshot_already_restored`; a different valid snapshot competing with an active/restoring lineage is always `task6_snapshot_lineage_fork`; malformed or digest-invalid bytes are always `task6_snapshot_invalid` before either registry error.

The transfer/crash states are exhaustive:

| Durable module state | Source usable | Restore/recovery rule |
| --- | --- | --- |
| export fails before atomic retirement | yes | no snapshot exists; explicit export retry is allowed |
| snapshot returned; lineage `awaiting_restore` | no | the exact snapshot may be restored once |
| process stops after retirement but before restore | no in that process | only caller-retained snapshot bytes can initialize one successor in a fresh module |
| restore validation fails before successor install | no | exact valid pending snapshot remains the only admissible restore input |
| successor installed and acknowledgement returned | successor only | old source and old snapshot are permanently rejected |
| process stops after successor install but before acknowledgement | no recoverable token in that module | old snapshot is consumed; no retry may create a second token |
| copied snapshot imported by separate processes | undetectable cross-process fork | evidence is development-fixture-only and void as one-shot/security proof |

Attempts, shadow completion claims, observation IDs, drift cursors, transition heads, and fault occurrence counters survive transfer byte-for-byte. A transferred consumed attempt remains consumed; no restore generation may retry, reopen, or rename it.

## 7. Auxiliary identities, code manifest, and runtime admission

Every auxiliary object with a designated derived ID uses one rule: derive its semantic digest with `sha256Canonical()` over every field except that exact derived-ID field and its exact semantic-digest field, derive the ID as the stated lowercase prefix plus the first 32 digest characters, then derive its `Task6ObjectRef` using the object's exact schema ID, version `0.1.0`, and semantic digest. Other fields ending in `_id` or `_digest`, including caller IDs and nested verification digests, remain in the preimage. An object with a semantic digest but no derived ID hashes every field except that one semantic-digest field. A result that contains other auxiliary objects contains them completely or by a ref whose complete value exists in the same returned result or vault replay. No object accepts an independent derived ID or digest assertion.

The exact prefixes and schema IDs are:

| Object | ID prefix | Schema ID |
| --- | --- | --- |
| baseline profile | fixed `expression-fit-baseline/0.1.0` | `contentmd.expression-fit-baseline` |
| proposed scope | `proposed_binding_scope.` | `contentmd.proposed-binding-scope` |
| slice definition | `evaluation_slice.` | `contentmd.evaluation-slice-definition` |
| risk witness | `risk_slice_witness.` | `contentmd.risk-slice-witness` |
| currentness witness | `simulated_currentness.` | `contentmd.simulated-currentness-witness` |
| reviewer policy witness | `simulated_reviewer_policy.` | `contentmd.simulated-reviewer-policy-witness` |
| qualification denominator replay | `qualification_denominator.` | `contentmd.qualification-denominator-replay` |
| evaluation population | `evaluation_population.` | `contentmd.evaluation-population` |
| metric result | `evaluation_metric.` | `contentmd.evaluation-metric-result` |
| evaluation failure | `evaluation_failure.` | `contentmd.evaluation-failure-evidence` |
| slice metric | `slice_metric.` | `contentmd.slice-metric-result` |
| bootstrap | `paired_bootstrap.` | `contentmd.paired-group-bootstrap-result` |
| predicate | `evaluation_predicate.` | `contentmd.evaluation-predicate-result` |
| test-open receipt | `test_open_receipt.` | `contentmd.test-open-receipt` |
| shadow result | `shadow_result.` | `contentmd.shadow-simulation-result` |
| simulated decision | `simulated_promotion_decision.` | `contentmd.simulated-promotion-decision` |
| simulator event | `learning_sim_event.` | `contentmd.simulated-learning-event` |
| readback receipt | `learning_sim_readback.` | `contentmd.simulated-learning-readback` |
| binding projection | `simulated_binding_projection.` | `contentmd.simulated-binding-projection` |
| revocation witness | `simulated_revocation.` | `contentmd.simulated-revocation-witness` |
| drift window population | `drift_window_population.` | `contentmd.drift-window-population` |
| drift metric delta | `drift_metric_delta.` | `contentmd.drift-metric-delta-result` |
| Task 6 code manifest | `task6_code_manifest.` | `contentmd.task6-code-manifest` |
| Task 6 runtime profile | `task6_runtime_profile.` | `contentmd.task6-runtime-profile` |

The Task 6 code-manifest paths are exactly these entries in ascending raw UTF-8 path order:

```text
docs/superpowers/specs/2026-08-20-contentmd-evaluation-shadow-governance-contracts-design.md
packages/core/src/canonical-dag.ts
packages/core/src/canonical-json.ts
packages/core/src/records.ts
packages/learning/src/binding.ts
packages/learning/src/bootstrap.ts
packages/learning/src/drift.ts
packages/learning/src/evaluation.ts
packages/learning/src/index.ts
packages/learning/src/numeric.ts
packages/learning/src/pairwise-logistic.ts
packages/learning/src/rank.ts
packages/learning/src/records.ts
packages/learning/src/rollback.ts
packages/learning/src/shadow.ts
packages/memory/src/event-store.ts
packages/schemas/src/learning-records.schema.json
scripts/verify-task6-code-manifest.mjs
```

Each entry binds exact raw bytes and positive byte count. `manifest_digest = sha256Canonical({contract_version, package_id, package_version, entries})`. The canonical fixture contains only those four preimage fields; its raw bytes are `canonicalJson()` and therefore its raw-byte digest equals the semantic manifest digest. `task6-release-profile.ts` is excluded from the manifest to avoid self-reference and exports one recursively frozen `Task6ReleaseProfile` constant. `admitted_runtime_profile_digests` is nonempty, unique, and ascending by lowercase digest bytes. Its digest representation is exactly:

```text
release_profile_contract_digest = sha256Canonical({
  contract_version: "contentmd.task6-release-profile/0.1.0",
  manifest_raw_bytes_digest,
  manifest_digest,
  admitted_runtime_profile_digests
})
```

The digest field is absent from that preimage and is the fifth field of the exported object. `manifest_raw_bytes_digest` is raw SHA-256 of `canonicalJson({contract_version, package_id, package_version, entries})`; `manifest_digest` is the semantic digest above. A pure verifier accepts only the pinned release-owned manifest. The external script reads only the fixture, release profile, and exact manifest paths; rejects missing, extra, reordered, changed, or symlinked-outside-workspace paths; writes nothing; and uses no network.

After checking every entry, both manifest pins, and the release-profile digest, `verifyTask6CodeManifest()` returns this literal verification identity:

```text
verification_digest = sha256Canonical({
  contract_version: "contentmd.verified-task6-code-manifest/0.1.0",
  manifest,
  manifest_raw_bytes_digest,
  release_profile_contract_digest
})
```

Here `manifest` is the complete public `Task6CodeManifest`, including its already rederived `manifest_digest`; none of the four verification-preimage fields is omitted or replaced by a ref.

The Task 6 code-manifest object ref is `{record_id: "task6_code_manifest." + first32(manifest_digest), schema_id: "contentmd.task6-code-manifest", schema_version: "0.1.0", content_digest: manifest_digest}`. This exact projection is used anywhere a Task 1 record needs code-manifest provenance.

Task 6 runtime admission is identical in representation to Task 5. The admitted tuples use Node `24.14.0`, V8 `13.6.233.17-node.41`, ICU `78.2`, Unicode `17.0`, and little-endian execution on either `darwin` / `arm64` or `linux` / `x64`. The profile digest excludes itself and is `sha256Canonical({contract_version, node_version, v8_version, icu_version, unicode_version, platform, architecture, endianness})`. The artifact ref is `{artifact_id: "contentmd.task6-runtime-profile", artifact_version: "0.1.0", artifact_digest: profile_digest}`. `admitTask6Runtime()` alone observes the process tuple. `observed_runtime` contains exactly the seven tuple fields in `ObservedTask6RuntimeTuple`, copied after exact equality with the profile. The exact profile digest must occur exactly once in the release profile's admitted list, so admission does not generalize beyond the two named tuples. The returned verification identity is:

```text
verification_digest = sha256Canonical({
  contract_version: "contentmd.verified-task6-runtime/0.1.0",
  profile,
  artifact_ref,
  observed_runtime,
  release_profile_contract_digest
})
```

A new tuple needs a separately reviewed golden and release-profile entry; no fallback occurs.

The corresponding provenance ref is `{record_id: "task6_runtime_profile." + first32(profile_digest), schema_id: "contentmd.task6-runtime-profile", schema_version: "0.1.0", content_digest: profile_digest}`. It is a Task 6 auxiliary ref and remains distinct from the payload's `ArtifactRef` and the Task 5 numeric-runtime ref.

Task 3 replay verification, Task 5 code verification, Task 5 runtime admission, Task 6 code verification, and Task 6 runtime admission remain distinct. Every evaluation input digest binds all five verification digests transitively. Substitution of Task 4's feature runtime for Task 5 or Task 6's numeric runtime fails.

## 8. Exact baseline, pair metrics, coverage, and binary64 identity

Feature positions are the exact Task 5 `PairwiseFeatureOrder`. For one verified candidate vector, baseline components are evaluated in `component_order`:

1. required-fact coverage is position 6 and is omitted exactly when position 7 is `1`;
2. recovery-action coverage is position 8 and is omitted exactly when position 9 is `1`;
3. approved-terminology ratio is position 10 and is omitted exactly when position 11 is `1`;
4. contextual specificity is the Kahan mean, in entity-then-action order, of applicable position 12 when position 13 is `0` and position 14 when position 15 is `0`; it is omitted only when both are missing;
5. supporting-evidence coverage is position 16 and is omitted exactly when position 17 is `1`;
6. one minus generic-language density is `1 - position 18` and is always applicable; and
7. one minus length distance is `1 - position 19` and is omitted exactly when position 20 is `1`.

Each included weighted term is `component_value * decoded_weight` in that order. The numerator is classic Kahan summation of included terms; the denominator is classic Kahan summation of their decoded weights in the same order; and score is numerator divided by denominator. The denominator cannot be zero because generic density is applicable for every Task 5 eligible candidate. Exact zeros are canonicalized to positive zero after each named output, not after every CPU instruction.

For A and B, compute `d = score_A - score_B`, then `z = 4 * d`. When `z` is exact zero, the unclipped baseline probability is exactly `0.5`; otherwise use Task 5 `stableSigmoid(z)`. Clip with `min(1 - 1e-6, max(1e-6, p))` in that literal order. The candidate probability is the exact clipped `probability` and `probability_bits` returned by Task 5 `predictPairwise()` after complete model and candidate reauthentication.

For a pair with label `y`, accuracy is exactly:

- `1` when `p > 0.5` and `y = 1`, or `p < 0.5` and `y = 0`;
- `0` for the opposite strict direction; and
- `0.5` when `p === 0.5`, for either label.

Log loss is `-Math.log(p)` for `y = 1` and `-Math.log1p(-p)` for `y = 0`. It uses the clipped probability. Pair values are processed in sealed `test_example_refs` order. Means use classic Kahan summation divided by the exact pair count. Differences are candidate minus baseline after computing each mean independently. No rounding, decimal formatting, epsilon comparison, weighting, group normalization, or slice reweighting occurs.

Every probability, accuracy, log loss, mean, difference, and confidence bound is finite, canonical positive zero when zero, and represented as `{value, bits}` with `value === binary64FromHex(bits)` and `bits === binary64ToHex(value)`. A mismatch is invalid. Primary coverage is `predicted_pair_count / decisive_pair_count`, computed once in binary64; both systems must predict every pair and the result must have bits `3ff0000000000000`. Partial coverage, a missing candidate, a missing probability, or non-finite arithmetic makes the run `invalid`; it never drops a row.

The qualification denominator is the exact member count of `QualificationDenominatorReplay`. Members sort by expected qualification ref, are unique, and every source ref is present in at least one complete Task 2 input. Every decisive sealed-test subject's exact qualification record occurs once and carries its derived test leakage-group ref. A tie or abstention has a null test-group ref, remains within the preregistered task/context/scope selection, and is counted by its replayed outcome. Any decisive extra, decisive omission, duplicate, changed Task 2 output, scope mismatch, or non-complete fixture enumeration invalidates the handle. `complete_development_fixture` is a caller-supplied fixture assertion whose bytes and downstream use are digest-bound; without an authenticated resolver it does not prove official enumeration completeness. Ties and abstentions are never converted to labels or inserted into primary metrics. The decisive population remains exactly the sealed manifest's test refs.

## 9. Slice, scope, reviewer, hard-rule, and currentness contract

Slice dimension order is exactly `project`, `product_area`, `channel`, `locale`, `risk`. Values are nonempty byte-preserved strings; no case fold, locale normalization, or aliasing occurs. Slice definitions sort by dimension order and then raw UTF-8 value. `slice_id = "evaluation_slice." + first32(sha256Canonical({contract_version, key}))`; `slice_digest` hashes `{contract_version, key, required_for_promotion}`.

Each decisive pair belongs to exactly one slice in each dimension, recorded as a five-ID tuple in dimension order. Cross-dimension overlap is intentional: one pair contributes once to its project slice, once to its product-area slice, once to its channel slice, once to its locale slice, and once to its risk slice. Within one dimension a pair may not belong to two slices. Overall metrics count the pair once. Slice metrics count the pair once per matching slice. The declared slice universe is frozen in the sealed handle before the attempt and contains every scope-permitted value exactly once; required slices are the entries with `required_for_promotion: true`. A caller cannot add, remove, narrow, or relabel a slice after test opening.

The proposed binding scope requires a nonempty project ID and five exact permitted-value lists in dimension order. Each list is raw-UTF-8 sorted and unique. The project list contains exactly the scope project ID. Every test pair's derived values must be permitted. A wider, narrower, cross-project, unknown, or out-of-scope pair invalidates the handle before claim.

A slice is `supported` at 20 decisive pairs and 5 distinct leakage groups, `insufficient` when nonempty but below either threshold, and `empty` at zero pairs. Metrics are null only for `empty`; an insufficient nonempty slice still has metrics but no bootstrap interval. Every required slice must be supported. Non-required slice insufficiency is reported and does not alone fail evaluation.

The currentness witness is a development fixture, not an authorization. Entries sort by check order shown in the interface, then subject ref. For every permission, rights, privacy, policy, incident, reviewer-qualification, and reviewer-independence ref transitively used by the test population and proposed scope, exactly one entry must exist. `checked_at` equals the evaluation `opened_at`; `effective_at <= checked_at`; a non-null expiry must be `>= checked_at`. Every state must be `pass`. `fail` makes the promotion predicate false; `unknown`, missing, duplicate, time-incoherent, or extra entries make the evaluation invalid. The witness cannot establish official currentness.

Reviewer refs are derived from the complete Task 3 qualification inputs. The reviewer-policy witness contains exactly that unique reviewer set. `minimum_qualified_reviewers` is a positive safe integer and must be at least `2` for any simulated active-binding decision. A passing reviewer gate requires at least the declared minimum, every qualification currentness entry to pass, every distinct reviewer pair to name each other in both independence lists, and no unresolved conflict. The simulator can exercise stricter policy values, but it cannot claim those fixture reviewers are qualified organizational actors.

Hard eligibility is replayed through Task 5 for both candidates on every pair. Because the baseline and learned model score the same Task 5-eligible pair set, `hard_rule_regression_count` is exactly zero. Any ineligible candidate, browser/competitor/third-party feature or label, blocking-only value, copying failure, or changed hard-rule replay invalidates the run; it cannot be represented as a compensable metric.

## 10. Deterministic paired group bootstrap

`PairedBootstrapSeedInput` is the closed object `{record_mode, dataset_ref, candidate_model_ref, baseline_ref, feature_profile_ref, evaluation_code_manifest_digest}`. After the mode gate, the seed is:

```text
sha256Canonical({
  contract_version: "contentmd.paired-bootstrap/0.1.0",
  dataset_ref,
  candidate_model_ref,
  baseline_ref,
  feature_profile_ref,
  evaluation_code_manifest_digest
})
```

`PairedGroupBootstrapInput` is the closed object `{record_mode, seed_digest, population, declared_slices}` and accepts the complete verified population, not parallel probability arrays or asserted group membership. `runPairedGroupBootstrap()` revalidates every pair digest, bit/value equality, slice assignment, group ref, order, and population digest before drawing.

The overall group order is the population's distinct leakage-group refs sorted by raw UTF-8 tuple `(record_id, schema_id, schema_version, content_digest)`. A slice uses the subset of that order having at least one slice pair. Pairs within a group retain evaluation-population order.

For population key `overall` or an exact `slice_id`, replicate `r` from `0` through `9999`, and counter `c` starting at `0`, a counter block is:

```text
SHA256(
  UTF8("contentmd.paired-bootstrap-counter/0.1.0") || 0x00 ||
  hexToBytes(seed_digest) || 0x00 || UTF8(population_key) || 0x00 ||
  uint64be(r) || uint64be(c)
)
```

Read each 32-byte block as four unsigned 64-bit big-endian integers in byte order. For `G` groups, let `limit = floor(2^64 / G) * G`. Reject a value `u >= limit`; otherwise accept index `Number(u % G)`. Continue successive block values and increment `c` per block until exactly `G` group indices are accepted. Counter overflow is invalid. `G` is a positive safe integer and never exceeds `2^53 - 1`.

Every replicate samples exactly the original number of groups with replacement. All pairs of an accepted group are copied in their original order. A repeated group repeats all its pairs and contributes repeatedly to both numerator and denominator. No per-group averaging, deduplication, pair weighting, or fixed-size pair resampling occurs. Each replicate recomputes baseline and candidate accuracy and log loss using section 8, then stores candidate-minus-baseline difference bits. Any empty replicate or non-finite value is invalid.

There are exactly 10,000 differences for each metric. Sort decoded finite numbers ascending with a numeric comparator; equal values retain no identity significance. The 2.5th nearest-rank bound is 1-based rank `ceil(0.025 * 10000) = 250`, array index `249`. The 97.5th bound is rank `ceil(0.975 * 10000) = 9750`, array index `9749`. Bounds retain exact binary64 bits.

`overall_replicate_vector_digest` hashes `{contract_version: "contentmd.bootstrap-replicate-vector/0.1.0", population_key: "overall", accuracy_difference_bits, log_loss_difference_bits}` with both full 10,000-entry arrays. Each supported slice uses the same preimage with its `slice_id`; its digest is stored in `SliceBootstrapResult`. Empty or insufficient slices have null intervals and null vector digest and consume no counter blocks. `bootstrap_digest` hashes every public result field except itself, including seed, group order, exact method names, intervals, slice results, and replicate-vector digests.

## 11. Evaluation attempt, predicates, records, identity, and provenance

The test-open receipt is the auxiliary object `{contract_version: "contentmd.test-open-receipt/0.1.0", record_mode: "development_fixture", authority_effect: "none", receipt_id, attempt_id, attempt_key, handle_ref, claim_event_ref, open_event_ref, opened_at, population_digest, receipt_digest}`. It is issued only after independent simulator readback finds both exact events in sequence and recomputes their event digests. It is not a Task 3 `test_opened` manifest, official receipt, or secrecy claim.

The evaluation predicate checks section 5's exact nine entries in that order. The arithmetic comparisons are literal:

- overall accuracy lower bound `> +0`;
- overall log-loss upper bound `< +0`;
- every required slice has at least 20 pairs and 5 groups;
- every required slice accuracy lower bound `>= -0.05` (`bfa999999999999a`);
- every required slice log-loss upper bound `<= +0.05` (`3fa999999999999a`);
- currentness and reviewer gates pass; and
- hard-rule regression count equals `0`.

`evaluation_passed` is the conjunction of all nine. `promotion_ready_without_shadow_or_decision` equals that conjunction but remains a diagnostic name: it never means promotable, approved, or deployed. A completed shadow and separate simulated decision are checked only by the binding simulator, and even their conjunction has no authority effect.

Evaluation state equations are exhaustive:

| State | Exact conditions | Nullability |
| --- | --- | --- |
| `passed` | complete replay and arithmetic valid; coverage exactly one; bootstrap complete; all nine predicates true | test-open, population, overall, all slice, bootstrap, and predicate refs non-null; failures empty; attempt consumed true |
| `failed` | complete replay and arithmetic valid; coverage exactly one; bootstrap complete; at least one policy/statistical predicate false | same non-null refs; failures contains exact predicate-failure refs in predicate order; attempt consumed true |
| `invalid` | claim and open succeeded, but coverage, metric, slice assignment, currentness completeness, bootstrap arithmetic, or post-open replay integrity is invalid | test-open is non-null; `population` and `overall_metrics` use their valid object when complete and otherwise the exact `EvaluationFailureEvidence`; every declared slice has a `SliceMetricResult`, using `support_state: invalid` and failure evidence when needed; bootstrap is null unless all 10,000 replicates completed; failures are nonempty; predicate is non-null with unavailable checks false; attempt consumed true |
| `not_run` | never issued by `runSealedEvaluation()` | reserved Task 1 shape only |

The post-open mapping is total. `expected_pair_count` is always the sealed decisive-pair count. `completed_pair_count` is the number of consecutive pairs in sealed order for which every value required by that stage was completely produced before the first invalid value; failures detected only after a full vector/mean/digest use the expected count. Every returned failure has the non-null subject ref below. Integrity validation stops at the first root invalid trigger in the section 17 precedence/order, then materializes the exact deterministic dependent failure cascade below. Independent predicate failures are all accumulated; they are not the only situation with multiple failure objects.

| Trigger after test open | Evaluation state | Failure stage and reason code | Completed count and subject | Result/ref consequences |
| --- | --- | --- | --- | --- |
| pair replay/member/label/group/candidate changes or a population digest mismatch | `invalid` | `population`, `task6_test_population_invalid` | consecutive valid population pairs; sealed `test_population_ref` | `population` is this failure; overall is metric-stage failure derived from it; every slice is `invalid`; bootstrap null |
| either system omits/abstains on a decisive pair, coverage is not exact one, or a probability is missing/nonfinite | `invalid` | `coverage`, `task6_metric_invalid` | pairs with both probabilities complete; population ref | population remains complete only if every row was formed, otherwise population is the failure; overall is failure; affected/current/later slices invalid; bootstrap null |
| bit/value mismatch, negative zero, nonfinite operation, order violation, Kahan/log-loss/mean/difference mismatch | `invalid` | `metric`, `task6_metric_invalid` | pairs completed by the failing arithmetic, or expected count for final-aggregate mismatch; population ref | population remains complete; overall is failure; slices without independently complete metrics are invalid; bootstrap null |
| undeclared, missing, duplicate, overlapping same-dimension, out-of-order, out-of-scope, or digest-invalid slice assignment | `invalid` | `slice`, `task6_slice_invalid` | expected count; failing declared-slice ref | population/overall remain complete; prior complete slice results remain; failing and later declared slices use the same failure and `invalid`; bootstrap null |
| currentness entry is `unknown`, missing, duplicate, extra, expired, not yet effective, or time-incoherent | `invalid` | `currentness`, `task6_source_not_current` | expected count; currentness-witness ref | population/overall/slices remain complete; bootstrap null; predicate currentness and every later unavailable check false |
| currentness is complete/coherent and any required entry is `fail` | `failed` | `currentness`, `task6_source_not_current` | expected count; currentness-witness ref | all metric/bootstrap refs complete; only `currentness_passed` is false unless another independent predicate also fails |
| reviewer witness is missing/extra/duplicate/digest-invalid or its lists/count are structurally incoherent | `invalid` | `reviewer_policy`, `task6_reviewer_policy_failed` | expected count; reviewer-policy-witness ref | complete earlier metric refs; bootstrap null; reviewer and later unavailable checks false |
| reviewer witness is coherent but minimum count, qualification, bilateral independence, or conflict predicate is not satisfied | `failed` | `reviewer_policy`, `task6_reviewer_policy_failed` | expected count; reviewer-policy-witness ref | all metric/bootstrap refs complete; only `reviewer_policy_passed` is false unless another predicate also fails |
| any post-open candidate becomes hard-ineligible or hard-rule regression count would be nonzero | `invalid` | `predicate`, `task6_candidate_ineligible` | pairs before the first ineligible candidate; candidate ref | affected population/metrics use failure evidence as above; bootstrap null; `hard_rule_regression_zero` and unavailable later checks false |
| seed/counter/rejection/group membership/replicate/vector digest/percentile arithmetic is invalid or fewer than 10,000 required replicates complete | `invalid` | `bootstrap`, `task6_bootstrap_invalid` | expected count; overall population ref or failing slice ref | metric/slice results remain complete; bootstrap null; statistical predicate checks unavailable and false |
| coverage is one but overall accuracy lower bound is not positive | `failed` | `predicate`, `task6_promotion_predicate_failed` | expected count; predicate-result ref | `accuracy_lower_bound_positive` false; complete result refs |
| coverage is one but overall log-loss upper bound is not negative | `failed` | `predicate`, `task6_promotion_predicate_failed` | expected count; predicate-result ref | `log_loss_upper_bound_negative` false; complete result refs |
| a required slice is empty/insufficient | `failed` | `predicate`, `task6_promotion_predicate_failed` | expected count; that slice ref | `required_slices_supported` false and its unavailable bound checks false; complete overall bootstrap and specified null slice intervals |
| supported required-slice accuracy lower bound is below `-0.05` | `failed` | `predicate`, `task6_promotion_predicate_failed` | expected count; that slice ref | `required_slice_accuracy_lower_bound` false; complete result refs |
| supported required-slice log-loss upper bound is above `+0.05` | `failed` | `predicate`, `task6_promotion_predicate_failed` | expected count; that slice ref | `required_slice_log_loss_upper_bound` false; complete result refs |
| predicate/check order, digest, or result identity is internally inconsistent after otherwise complete inputs | `invalid` | `predicate`, `task6_digest_invalid` | expected count; predicate-result ref | complete metric/bootstrap refs; inconsistent/current-and-later checks false |

Dependent failure construction is exact; `F_*` denotes one complete `EvaluationFailureEvidence` with its normal derived ID/digest:

| Root invalid trigger | `population` member | `overall_metrics` member | Declared-slice construction | Canonical `failures` contribution |
| --- | --- | --- | --- | --- |
| population replay/member/digest failure | `F_population = {stage: population, reason: task6_test_population_invalid, completed: consecutive valid population pairs, subject: sealed test_population_ref}` | distinct `F_metric = {stage: metric, same reason/count/subject}` | every slice has `support_state: invalid` and reuses the exact `F_metric` ref; no per-slice failure object | `[F_population, F_metric]` |
| post-open hard-ineligible candidate | `F_population = {stage: population, reason: task6_candidate_ineligible, completed: pairs before candidate, subject: candidate_ref}` | distinct `F_metric = {stage: metric, same reason/count/subject}` | every slice is invalid and reuses `F_metric` | `[F_population, F_metric]` |
| missing/nonfinite pair probability prevents a complete population row | `F_population = {stage: population, reason: task6_metric_invalid, completed: pairs with both probabilities, subject: sealed test_population_ref}` | distinct `F_coverage = {stage: coverage, same reason/count/subject}` | every slice is invalid and reuses `F_coverage` | `[F_population, F_coverage]` |
| population complete but coverage denominator/bits are not exact one | complete `EvaluationPopulation` | `F_coverage = {stage: coverage, reason: task6_metric_invalid, completed: expected count, subject: population_ref}` | every slice is invalid and reuses `F_coverage` | `[F_coverage]` |
| population complete but overall metric arithmetic/identity fails | complete `EvaluationPopulation` | `F_metric = {stage: metric, reason: task6_metric_invalid, completed: table-defined count, subject: population_ref}` | every slice not already independently completed is invalid and reuses `F_metric`; a completed earlier slice remains complete | `[F_metric]` |
| slice assignment/identity fails after complete overall metric | complete population | complete overall metric | prior declared slices remain complete; one `F_slice` is created and reused by the failing and every later slice. Its subject is the known failing slice ref, or the population ref when no declared slice can be identified | `[F_slice]` once, never once per reused slice |
| currentness, reviewer, bootstrap, or predicate identity invalid after complete prior stages | complete population | complete overall metric | already complete slice results remain complete | exactly the one root failure object from the first table |

Reusing a failure means byte-identical object/ref reuse; a slice never clones or restages it. `failures` contains every distinct failure object referenced by `population`, `overall_metrics`, or any `SliceMetricResult`, exactly once, followed by independent false-predicate failures. Canonical order is stage order `population`, `coverage`, `metric`, `slice`, `currentness`, `reviewer_policy`, `bootstrap`, `predicate`; within `slice`, declared-slice order; within `predicate`, the nine-check order and then declared-slice order. This ordering places `F_population` before its metric/coverage dependent and eliminates the earlier predicate-only accumulation ambiguity.

For a valid predicate, all nine booleans are evaluated in declared order. For an invalid run, each check whose complete prerequisites precede the invalid stage retains its literal result; the check whose prerequisites are invalid and every later dependent check is exactly `false`. `evaluation_passed` and `promotion_ready_without_shadow_or_decision` are always false. For a failed run, one `EvaluationFailureEvidence` is emitted per false check in predicate order, except the specific currentness/reviewer reason replaces the generic promotion reason. `predicate_check` is that exact check for every false-predicate failure, including currentness and reviewer failures, and is `null` for root integrity failures not emitted from a false check. This field prevents two false checks with the same stage, reason, counts, and subject from collapsing to one identity. When multiple required slices fail one check, failure evidence is in declared-slice order. The `failures` array uses the exact cascade ordering above, and duplicate semantic failure refs are rejected.

Pre-claim shape, official, digest, replay, model, code, runtime, scope, or sealed-state failure throws and issues no record. A failure after claim but before open creates no evaluation record and inspects as `consumed_unopened`. A failure after open but before a terminal record inspects as `consumed_incomplete`. No partial successful record is returned.

The evaluation record input digest is:

```text
sha256Canonical({
  contract_version: "contentmd.learning-evaluation-input/0.1.0",
  record_mode: "development_fixture",
  authority_effect: "none",
  attempt_id,
  attempt_key,
  handle_digest,
  dataset_ref,
  model_ref,
  baseline_ref,
  feature_profile_ref,
  test_open_receipt_ref,
  evaluation_population_ref,
  overall_metric_refs,
  slice_metric_refs,
  failure_refs,
  bootstrap_ref,
  predicate_result_refs,
  proposed_scope_ref,
  currentness_witness_ref,
  reviewer_policy_witness_ref,
  code_verification_digest,
  runtime_verification_digest,
  evaluation_state
})
```

The record ID is `learning_evaluation.` plus the first 32 input-digest characters; schema ID/version are `contentmd.learning-evaluation-run@0.1.0`; record version is `1`; lifecycle is `active`; scope equals the sealed dataset scope; shared schema digest is the verified learning-schema raw-byte entry; code digest is the Task 6 code-manifest digest; authority is `none`; and outer content digest comes only from `finalizeRecord()`.

Payload refs map exactly: dataset/model/baseline/feature-profile/test-open/slices/failures/bootstrap/predicates map to the same named objects; `attempt_consumed` is true. `evaluation_population_ref` is the ref of the `EvaluationRunResult.population` member, including its population-stage `EvaluationFailureEvidence` on an invalid run before a complete population exists. `overall_metric_refs` has exactly one entry and refers to the `overall_metrics` member, including its metric-stage failure evidence when applicable. `slice_metric_refs` equals declared-slice order. `predicate_result_refs` has exactly one entry. `bootstrap_ref` is null exactly for invalid runs without a complete bootstrap.

Provenance is unique by the complete entry and sorted by the raw-UTF-8 tuple `(relationship, record_id, schema_id, schema_version, content_digest)`. It contains exactly one `evaluated_dataset`, `evaluated_model`, `used_baseline`, `used_feature_profile`, `opened_test_attempt`, `evaluated_population`, `evaluation_predicate`, `proposed_binding_scope`, `currentness_fixture`, `reviewer_policy_fixture`, `evaluation_code_manifest`, and `evaluation_runtime_profile`; exactly one `overall_metric`; every slice result as `slice_metric`; every failure as `evaluation_failure`; and `paired_bootstrap` exactly when non-null. The population/overall relationship targets their actual union member, including failure evidence, and every failure evidence also appears once under `evaluation_failure`. No event, ref, or auxiliary result outside that set appears.

## 12. No-influence shadow contract

`createShadowEvaluationPlan()` reauthenticates the sealed handle and issues a Task 1 `ShadowEvaluationPlan` development fixture with authority `none`. Its fixed values are 50 decisive pairs, 20 leakage groups, 14 calendar days, `no_influence: true`, exact active baseline/candidate/input-selection refs, declared required slices, metric refs for accuracy and log loss, and gate refs for duration, pair count, group count, required-slice support, replay validity, and no influence.

The start-rule auxiliary is exactly `{contract_version: "contentmd.shadow-start-rule/0.1.0", start_at, selection_interval_start: "inclusive", rule_digest}`. The end-rule auxiliary is exactly `{contract_version: "contentmd.shadow-end-rule/0.1.0", earliest_end_at, proposed_end_at, selection_interval_end: "exclusive", minimum_calendar_days: 14, minimum_decisive_pairs: 50, minimum_leakage_groups: 20, rule_digest}`. Metric auxiliaries are the two exact closed objects `{contract_version: "contentmd.shadow-metric/0.1.0", metric: "pairwise_accuracy" | "log_loss", aggregation: "equal_pair_kahan_mean", metric_digest}`. Gate auxiliaries are one closed object per gate named `minimum_duration`, `minimum_decisive_pairs`, `minimum_leakage_groups`, `required_slice_support`, `complete_replay`, and `no_influence`, each with `{contract_version: "contentmd.shadow-gate/0.1.0", gate, predicate_version: "0.1.0", gate_digest}`. Their IDs use the section 7 prefix rule with prefixes `shadow_start_rule.`, `shadow_end_rule.`, `shadow_metric.`, and `shadow_gate.` and matching `contentmd.*` schema IDs. Digest preimages exclude only their digest and derived ID.

The plan input digest is `sha256Canonical({contract_version: "contentmd.shadow-evaluation-plan-input/0.1.0", record_mode: "development_fixture", authority_effect: "none", sealed_test_handle_digest, active_baseline_ref, candidate_model_ref, input_selection_ref, start_rule_ref, end_rule_ref, required_slice_refs, metric_refs, gate_refs, code_verification_digest, runtime_verification_digest})`. The record ID is `shadow_evaluation_plan.` plus its first 32 characters; schema ID/version are `contentmd.shadow-evaluation-plan@0.1.0`; record version is `1`; lifecycle is `active`; scope equals the sealed dataset; schema/code digests come from the verified release manifest; and `plan_state` is `ready`. Invalid construction throws and emits no plan; this function never issues `proposed` or `invalid`. Provenance contains exactly `active_baseline`, `candidate_model`, `input_selection`, `shadow_start_rule`, `shadow_end_rule`, every required slice as `required_slice`, both metrics as `shadow_metric`, every gate as `shadow_gate`, plus `evaluation_code_manifest` and `evaluation_runtime_profile`, sorted by the raw-UTF-8 tuple `(relationship, record_id, schema_id, schema_version, content_digest)`.

All instants are strict RFC3339 with an explicit offset and millisecond precision, normalized to UTC before comparison. `earliest_end_at` must equal `start_at + 14 * 86,400,000` milliseconds exactly. `proposed_end_at >= earliest_end_at`. The selection interval is half-open `[start_at, proposed_end_at)`. Input selection, scope, slices, model, baseline, code, runtime, and gates are frozen by the plan input digest; no observation can change them.

`StartShadowSimulationInput` is `{record_mode, plan, sealed_test, shadow_run_id, actor_ref}`; the vault is the function's separate first argument. It replays the plan/handle relationship and appends one start event. The returned `ShadowSimulationHandle` is opaque and vault-bound.

Observations must have unique IDs and strictly increasing order keys `(UTC epoch milliseconds, observation_id raw UTF-8)`. Their time lies in the half-open plan interval. Each `outcome_replay` calls Task 3 `buildLearningDataset()` from its complete input, requires byte equality with `expected_build_result`, locates exactly one qualified decisive subject and its derived leakage group, requires `build_input.evaluation_at` to equal `observed_at`, and rejects future or post-decision feature material under Task 3 rules. The replay may legitimately produce a diagnostics-only or structurally empty manifest because shadow support is counted across observations; the verified decisive subject and group must still exist in the replayed result. Candidates are completely reauthenticated Task 5 tokens, nonempty, pairwise unique by candidate/vector/expression ref, include the exact replayed pair sides, and share the exact project/context/target/checkpoint/universe/runtime domain.

For each observation the simulator computes the active deterministic baseline ordering and the shadow Task 5 learned ordering over the same candidate tuple. Both paths see the exact same verified input digest. The public `ShadowObservationResponse` contains only active ordering and active digests. It contains no shadow score, probability, rank, tie trace, candidate visibility flag, prompt input, selection signal, decision signal, or branch flag. The shadow ordering and its digest stay only in the vault ledger.

The active-only expected response is recomputed by a private function that accepts no model or shadow value. `response_digest` hashes the complete public response except itself. The no-influence proof requires the chronology-preserving vector of actual public response bytes to equal the chronology-preserving vector independently recomputed with that active-only function; no deduplication or set reordering occurs. It also requires no shadow value in any active input/output preimage. Equality of only a high-level ordering is insufficient.

Completion occurs only at the explicit `proposed_end_at`, after at least 14 calendar days, 50 qualified decisive observations, 20 distinct leakage groups, all required slices supported, all observation replays current and valid, and exact no-influence equality. Calling earlier throws without closing the run. At the end time an under-threshold run completes as `insufficient`; a replay or no-influence mismatch completes as `invalid`; otherwise it is `completed`. No state is called `active` or `completed` in a Task 1 `ShadowBindingRecord`, because the development-fixture schema forbids those states.

`ShadowRunResult` input/output/set digests include observations in chronology. `shadow_output_digest` commits the private learned orderings without returning them individually. A completed result is necessary but not sufficient for a simulated promotion decision.

Shadow durability uses four exact append operations. Start appends `shadow_started`; observation appends `shadow_observed`; completion first appends `shadow_completion_claimed`, then appends exactly one `shadow_completed`, `shadow_insufficient`, or `shadow_invalid`. The completion claim permanently consumes that run's terminal attempt. `inspectShadowSimulation()` rebuilds status from those events; cached counts/results are ignored.

| Shadow fault/durable evidence | Inspection state | Explicit retry or recovery | Count/consumption rule |
| --- | --- | --- | --- |
| start `before_append` | no run | exact start call may retry | no run ID consumed |
| start committed, ack/readback fails | `started` | byte-identical start input returns the same handle without append; different bytes for the ID fail | one start only |
| observation `before_append` | prior `started`/`observing` | exact observation may retry | ID and count unchanged |
| observation committed, ack/readback fails | `observing` | byte-identical retry returns the stored active-only response without scoring or append; different bytes for the ID fail | observation counted once |
| completion claim `before_append` | prior `started`/`observing` | exact completion may retry | terminal attempt not consumed |
| completion claim committed but function stops, including terminal `before_append` | `consumed_incomplete` with non-null claim and null terminal ref | no retry, reopen, new end time, or automatic recovery; throws `task6_shadow_completion_incomplete` | completion permanently consumed; observations unchanged |
| terminal committed, ack/readback fails | `completed`, `insufficient`, or `invalid` | byte-identical completion call returns the stored result after full readback without append; different bytes fail | terminal/counts consumed once |
| terminal already acknowledged | terminal state | byte-identical duplicate is idempotent and returns the same frozen result | no rescore, append, or double count |

An observation retry compares the complete canonical input, including outcome replay/candidates and `observed_at`, not only `observation_id`. A terminal retry compares the complete completion input and stored claim preimage. Snapshot transfer preserves every event and idempotency key. There is deliberately no recovery API for `consumed_incomplete`; producing a terminal result after an unacknowledged completion claim would be an unfrozen second sealed observation of the private shadow ledger, so the simulator fails closed.

## 13. Simulated event ledger, CAS, projection, readback, and promotion

The simulator ledger uses the committed `StoredEvent` field shape but never claims to be the retained `AppendOnlyEventStore`. Its only data class is `learning_simulation`. Sequence begins at `1`, increases by one, the first predecessor is null, later predecessors equal the prior event digest, and event digest is `sha256Canonical()` over every `StoredEvent` field except `event_digest`. Event arrays are append-only inside the opaque vault.

Binding stream identity is:

```text
"learning_binding_sim." + first32(sha256Canonical({
  contract_version: "contentmd.simulated-binding-stream/0.1.0",
  project_id,
  ranking_objective: "expression_preference",
  candidate_kind: "expression",
  proposed_scope_ref
}))
```

The complete transition-evidence object is a closed discriminated union. Promotion contains exactly `{kind: "promotion", baseline_ref, model_ref, evaluation_ref, shadow_result_ref, decision_ref, proposed_scope_ref}`. Suspension contains exactly `{kind: "suspension", baseline_ref, model_ref, cause_kind: "drift" | "revocation", cause_ref, proposed_scope_ref}`. Rollback contains exactly `{kind: "rollback", baseline_ref, from_model_ref, to_model_ref, requested_target_event_digest, selected_target_event_digest, ordered_target_event_digests, proposed_scope_ref, reason_code}`. Baseline fallback contains the same fields with `kind: "fallback_baseline"`, `to_model_ref: null`, and `selected_target_event_digest: null`. `transition_evidence_digest = sha256Canonical({contract_version: "contentmd.simulated-transition-evidence/0.1.0", evidence: complete_union_member})`; no asserted digest occurs inside the union member.

Projection construction is acyclic and stage-specific. At genesis, the transition derives a `SimulatedVerifiedBindingProjection` with null heads/transition IDs, `projection_stage: "verified"`, `state: "baseline"`, the exact supplied baseline ref, null model/pending fields, and an empty superseded array. An existing transition starts only from the last independently rebuilt verified projection. For either case, `SimulatedProposedProjection` is then built without a transition ID, physical head, commit ref, or readback ref. Its exact digest is:

```text
proposed_projection_digest = sha256Canonical({
  contract_version: "contentmd.simulated-proposed-projection/0.1.0",
  record_mode: "development_fixture",
  authority_effect: "none",
  stream_id,
  transition_kind,
  prior_verified_projection_digest,
  prior_verified_head_digest,
  prior_verified_transition_id,
  baseline_ref,
  current_model_ref,
  proposed_state,
  proposed_model_ref,
  superseded_verified_event_digests
})
```

The proposed superseded array is the prior verified array followed by `prior_verified_head_digest` exactly when non-null; it is chronological, duplicate-free, and never sorted. Promotion proposes `candidate` plus its model; suspension proposes `suspended` while preserving the model ref; rollback proposes `candidate` plus the selected prior model; fallback proposes `baseline` plus null model. The transition identity is then:

```text
transition_digest = sha256Canonical({
  contract_version: "contentmd.simulated-binding-transition/0.1.0",
  binding_stream_id,
  transition_kind,
  expected_head_digest,
  prior_verified_projection_digest,
  proposed_projection_digest,
  transition_evidence_digest,
  actor_ref,
  occurred_at
})
transition_id = "learning_transition." + first32(transition_digest)
```

Thus neither transition identity nor proposed projection depends on a pending/final projection containing `transition_id`. Transaction stream identity is `learning_transition_sim.` plus the first 32 characters of `transition_digest`. Null is the sole empty-head representation; no zero digest or Task 1 non-null `expected_head_event_digest` is fabricated.

The six payload interfaces in section 5 are the complete payload shapes. `payload_digest = sha256Canonical(payload)` with no omitted field. Phase/event/stream mapping is literal:

| Event type | Phase | Exact payload | Stream and CAS predecessor |
| --- | --- | --- | --- |
| `transition_prepared` | `prepare` | `SimulatedTransitionPreparedPayload` | new transaction stream, sequence 1, null predecessor |
| `binding_committed` | `commit` | `SimulatedPromotionCommitPayload` | binding stream, supplied expected binding head |
| `binding_suspended_committed` | `commit` | `SimulatedSuspensionCommitPayload` | binding stream, supplied non-null expected binding head |
| `rollback_committed` | `commit` | `SimulatedRollbackCommitPayload` | binding stream, supplied non-null expected binding head |
| `fallback_baseline_committed` | `commit` | `SimulatedFallbackBaselineCommitPayload` | binding stream, supplied non-null expected binding head |
| `binding_readback_verified` | `readback` | `SimulatedReadbackVerifiedPayload` | binding stream, exact commit event digest |

Each stored event is the closed object `{event_id, schema_version: "0.1.0", data_class: "learning_simulation", stream_id, event_type, sequence, predecessor_digest, payload, actor_ref, occurred_at, event_digest}`. All six event types carry that literal `schema_version`; omission or any other version is shape-invalid. `payload` is the mapped interface, `sequence` is the predecessor sequence plus one, and:

```text
event_id_digest = sha256Canonical({
  contract_version: "contentmd.simulated-learning-event-id/0.1.0",
  schema_version: "0.1.0",
  data_class: "learning_simulation",
  stream_id,
  event_type,
  sequence,
  predecessor_digest,
  payload_digest,
  actor_ref,
  occurred_at
})
event_id = "learning_sim_event." + first32(event_id_digest)
event_digest = sha256Canonical(complete_stored_event_without_event_digest)
```

The event-digest preimage therefore also contains literal `schema_version: "0.1.0"` through the complete stored event. Its ref uses the simulator-event schema ID, ref `schema_version: "0.1.0"`, and `content_digest: event_digest`. Event IDs are globally unique; duplicate ID with identical or different bytes fails. Payload `phase` must equal the mapping, so no fourth phase or mismatched event/payload pair parses.

Promotion simulation requires a passed evaluation, completed shadow with `no_influence_verified: true`, exact same model/dataset/scope/code/runtime lineage, a separate `SimulatedPromotionDecision` with `decision: approve_simulation`, and an expected head equal to the current physical head, including null at genesis. That decision is a fixture and grants no authority.

Before readback append, the simulator resolves complete evidence values already held in the vault. Role order is fixed: promotion uses `[baseline_profile, proposed_scope, sealed_test_replay, evaluation_result, shadow_result, simulated_decision]`; suspension uses `[baseline_profile, proposed_scope, current_binding_replay, cause_value]`; rollback uses `[baseline_profile, proposed_scope, current_binding_replay, ordered_target_replays, selected_target_replay]`; fallback uses the rollback order with final `selected_target_replay: null`. `current_binding_replay` contains every full binding event from genesis plus each prior transition's complete evidence values. Then:

```text
resolved_evidence_values_digest = sha256Canonical({
  contract_version: "contentmd.simulated-resolved-transition-evidence/0.1.0",
  transition_kind,
  ordered_role_values
})

complete_lineage_digest = sha256Canonical({
  contract_version: "contentmd.simulated-complete-transition-lineage/0.1.0",
  transition_id,
  transition_digest,
  transition_evidence,
  resolved_evidence_values_digest,
  proposed_projection,
  prepare_event,
  ordered_binding_events_through_commit
})
```

Every named object is complete, revalidated, and digest-bearing where its own contract requires; `ordered_binding_events_through_commit` is the full sequence from genesis through the new commit. The readback event and final projection are deliberately absent, preventing a digest cycle.

Every binding change uses this two-phase protocol:

1. append `transition_prepared` to the empty transaction stream with expected null; read it back and recompute its digest;
2. recheck every prerequisite and the binding physical head;
3. append one commit event to the binding stream by CAS against the supplied expected head;
4. derive `SimulatedPendingBindingProjection` without changing the verified binding: verified head/state/model/transition/superseded fields remain the prior verified values, physical head equals the commit digest, pending transition equals `transition_id`, and pending proposed digest equals `proposed_projection_digest`;
5. independently read the complete binding stream, recompute every digest/sequence/predecessor, require the physical head to equal the commit, rebuild the proposed projection, and compute the complete-lineage digest without trusting cached state;
6. append `binding_readback_verified` by CAS against the commit digest with the exact readback payload, binding equal expected/observed commit digests, the proposed-projection digest, and complete-lineage digest;
7. independently read again, require the new physical head and readback event, derive the final verified projection from the proposed projection, and issue the readback receipt and transition result.

Pending projection digest/ID uses the section 7 rule over every public field except its own ID/digest. The final `SimulatedVerifiedBindingProjection` has `projection_stage: "verified"`; both heads equal the readback event digest; state/baseline/model/superseded fields equal the proposed projection; verified transition equals `transition_id`; both pending fields are null. Its digest/ID likewise derives only after the readback event exists. A verified projection requires equal physical/verified heads; a pending projection requires physical head unequal to its prior verified head. Any other field combination is invalid.

The readback receipt is the exact auxiliary `{contract_version: "contentmd.simulated-learning-readback/0.1.0", record_mode: "development_fixture", authority_effect: "none", receipt_id, transition_id, stream_id, prepare_event_ref, commit_event_ref, readback_event_ref, expected_commit_digest, observed_commit_digest, proposed_projection_digest, final_verified_projection_digest, complete_lineage_digest, status: "passed", method: "simulated-independent-chain-readback", receipt_digest}`. Its semantic digest excludes only `receipt_id` and `receipt_digest`; its ID/ref use section 7. Expected and observed commit digests must be equal. It has authority `none`.

A prepared-only crash changes no binding. A commit-without-readback crash leaves the verified projection unchanged, exposes `pending_readback`, and fences every new transition on that stream. `recoverSimulatedBindingReadback()` accepts only the same vault, transition ID, and exact commit head; it retrieves and revalidates the complete original transition replay already stored under the prepare and commit events. It may perform steps 5–7 but may not reappend prepare or commit. A readback-event commit-before-ack is recovered by inspection and returns the already verified projection without adding another event. A failed recomputation or unavailable readback keeps the stream fenced. No timeout, last-write-wins rule, new transition, rollback, or baseline fallback may skip that recovery.

On successful verification, projection supersession is derived rather than mutating an old event. The prior verified head digest was appended once in the transition-ID-free proposed projection; the new verified readback event is the verified head. A CAS mismatch fails with the actual and expected digests in private diagnostic data, but the public error contains only the stable code.

## 14. Drift windows, counters, and lineage revocation

Drift observations are replayed with the same candidate/model/metric/slice rules as evaluation. `EvaluateDriftWindowInput.dataset_replay` calls Task 3 `buildLearningDataset()` and requires byte equality with its complete expected result. Observation refs, labels, candidate sides, groups, task/context snapshots, permissions, and checkpoint material are derived from that result; its exact observed-ref set equals the input observations with no omission, addition, or duplicate. The currentness witness is complete at `evaluation_at` and remains a non-authoritative fixture. Observations sort by order key `(observed_at UTC milliseconds, observation_id raw UTF-8)`, IDs are unique, and a later input cannot backdate before the stored cursor.

Each window starts at a cursor `{started_at, after_observation_id}`. Genesis uses the verified binding time and null `after_observation_id`; null is an ordering sentinel before every nonempty observation ID at the same instant. Membership is order-key greater than the start cursor and time less than the scheduled end `started_at + 30 * 86,400,000` milliseconds. The first 100 decisive observations close the window early at the 100th order key with `close_reason: pair_cap`; otherwise the window closes only when `evaluation_at >= scheduled_end` with `close_reason: day_30`. Calling before either close condition throws `task6_drift_window_invalid` and issues no report. The supplied observations are exactly the selected members through that close boundary; a later member is rejected from this call and may appear only after the returned cursor. An observation is used by exactly one window. After a pair-cap close, the next cursor is the 100th order key; after day 30, the next start is the scheduled end with null ID. This cursor rule includes an observation exactly at the next start, makes equal-timestamp observations deterministic, and keeps windows non-overlapping.

The complete `DriftWindowPopulation` is derived before metrics or report issuance. Its `selected_observation_ids` are the exact chronological window vector; `leakage_group_refs` is the unique set derived from those observations and sorted by the raw-UTF-8 object-ref tuple `(record_id, schema_id, schema_version, content_digest)`; `pair_count` equals the selected-ID count and `leakage_group_count` equals the leakage-ref count. Its cursors, timestamps, close reason, and binding stream are byte-equal to the selected window. The population digest and `population_id` use section 7 with prefix `drift_window_population.`. Empty arrays and zero counts are valid only for a closed monitoring-insufficient window whose complete replay proves that no observation belongs to the selected interval. No caller supplies a population ID, digest, ref, count, or group set.

A closed window is `evaluable` at at least 50 decisive pairs and 20 distinct leakage groups; otherwise it is `monitoring_insufficient`. An open window issues no Task 1 drift report. An evaluable `LearningDriftResult` has non-null metrics and bootstrap plus slice results in declared-slice order. A monitoring-insufficient result has `metrics: null`, an empty slice array, and `bootstrap: null`. Evaluable windows compute candidate accuracy/log loss and required slices with the same bits/order rules. Their bootstrap resamples current groups against the fixed promotion-test candidate metric: each replicate difference is current replicate metric minus the fixed promotion metric. A window is degraded when any of these inclusive conditions holds:

- candidate accuracy minus promotion-test candidate accuracy `<= -0.10` (`bfb999999999999a`);
- candidate log loss minus promotion-test candidate log loss `>= +0.10` (`3fb999999999999a`);
- any required slice is unsupported;
- any required-slice accuracy lower bound is `< -0.05`; or
- any required-slice log-loss upper bound is `> +0.05`.

Drift bootstrap is a separate domain, never a call that reinterprets the evaluation bootstrap seed. The passed promotion evaluation is replayed completely; the fixed comparison scalars are its candidate-accuracy and candidate-log-loss values, and for each required slice its candidate metric values. The drift seed is:

```text
drift_seed_digest = sha256Canonical({
  contract_version: "contentmd.drift-paired-bootstrap/0.1.0",
  binding_stream_id,
  verified_binding_head_digest,
  promotion_evaluation_ref,
  promotion_overall_metric_ref,
  ordered_promotion_required_slice_metric_refs,
  window_population_ref,
  previous_report_ref,
  evaluation_code_manifest_digest,
  evaluation_runtime_profile_digest
})
```

Current-window leakage-group order is the section 10 raw-UTF-8 ref tuple order; pairs inside a group retain drift-population order. For population key `drift:overall` or `drift:` plus an exact required `slice_id`, replicate/counter values and rejection sampling are section 10 except the counter domain bytes are exactly:

```text
SHA256(
  UTF8("contentmd.drift-bootstrap-counter/0.1.0") || 0x00 ||
  hexToBytes(drift_seed_digest) || 0x00 || UTF8(population_key) || 0x00 ||
  uint64be(r) || uint64be(c)
)
```

Each of 10,000 replicates draws the current population's group count with replacement, expands all current pairs including repeated groups, and computes the current candidate metric with section 8 order/Kahan rules. It never resamples, pairs, weights, or perturbs the promotion population. The stored statistics are exactly `current_replicate_candidate_accuracy - fixed_promotion_candidate_accuracy` and `current_replicate_candidate_log_loss - fixed_promotion_candidate_log_loss`. Overall and slice vectors use numeric ascending sort and nearest-rank indices `249` and `9749`; duplicate numeric values remain duplicated. Empty/unsupported required slices consume no counter blocks and have null intervals/digest, causing the required-slice degradation gate.

The exact replicate-vector digest is:

```text
sha256Canonical({
  contract_version: "contentmd.drift-bootstrap-replicate-vector/0.1.0",
  population_key,
  statistic_orientation: "current-minus-fixed-promotion",
  fixed_promotion_accuracy_bits,
  fixed_promotion_log_loss_bits,
  accuracy_difference_bits,
  log_loss_difference_bits
})
```

Both difference arrays contain all 10,000 binary64 hex strings in replicate order. The public `PairedBootstrapResult.seed_digest` equals `drift_seed_digest`; its group order, intervals, slice results, vector digests, and final `bootstrap_digest` use the section 10 public field preimage unchanged. Substituting the evaluation counter domain, resampling promotion groups, reversing subtraction, group-averaging, dropping duplicates, or hashing sorted rather than replicate-order vectors is `task6_bootstrap_invalid`.

`DriftMetricDeltaResult` is always issued for a closed window. For `evaluable`, both overall differences are non-null, required-slice refs are in declared required-slice order, and bootstrap is non-null. For `monitoring_insufficient`, both differences are null, the slice-ref array is empty, and bootstrap is null. Its ID/digest use section 7. The Task 1 report's nonempty `metric_delta_refs` contains exactly this one auxiliary ref in both states.

Counter equations are exact:

| Window | `consecutive_degraded_windows` | `consecutive_insufficient_windows` |
| --- | --- | --- |
| evaluable and degraded | prior degraded + 1 | 0 |
| evaluable and not degraded | 0 | 0 |
| monitoring insufficient | 0 | prior insufficient + 1 |

The prior report must be supplied completely and revalidated against the vault's immediately preceding report; a bare ref or skipped report fails. Window start/cursor, promotion evaluation, binding, model, scope, required slices, metric code/runtime, counters, and prior digest all replay exactly.

Disposition is `suspend` at two consecutive degraded evaluable windows, two consecutive insufficient windows, or when `window_ended_at - last_evaluable_window_ended_at >= 60 * 86,400,000` milliseconds. Before the first evaluable window, the anchor is the verified binding time. Equality at 60 days suspends. Otherwise degraded or insufficient yields `review`; an evaluable nondegraded window yields `continue`.

Any new hard-rule, copying, rights, privacy, authority, permission, or lineage-revocation failure suspends immediately without waiting for a closed window through `propagateLearningRevocation()`; it does not close or increment a drift window and emits no Task 1 drift report. `evaluateDriftWindow()` requires its currentness fixture to be complete and passing, so `immediate_failure_refs` is exactly empty for every report it issues in 0.1. `propagateLearningRevocation()` resolves `revoked_ref` against complete Task 3/5/6 values already stored in the vault, verifies the revocation witness, and derives transitive edges from actual record provenance and exact Task 6 preimages. It does not accept a caller-authored edge list. The closure order is source or qualification -> preference example -> dataset -> model -> evaluation -> shadow -> verified binding. If the current learned binding is reachable, it executes a simulated suspension transition through section 13. If not reachable, it appends no binding event and returns null. Missing, ambiguous, cyclic, digest-invalid, or incomplete closure fails closed.

The drift input digest is `sha256Canonical({contract_version: "contentmd.learning-drift-input/0.1.0", record_mode: "development_fixture", authority_effect: "none", binding_ref, model_ref, promotion_evaluation_ref, previous_report_ref, start_cursor, next_cursor, window_started_at, window_ended_at, close_reason, decisive_pair_count, leakage_group_count, window_population_ref, metric_delta_ref, consecutive_degraded_windows, consecutive_insufficient_windows, immediate_failure_refs, disposition, window_state, currentness_witness_ref, code_verification_digest, runtime_verification_digest})`.

Each issued `LearningDriftReport` is a development fixture with authority `none`, record version `1`, lifecycle `active`, the exact Task 1 payload fields, and a record ID `learning_drift.` plus the first 32 characters of that input digest. `metric_delta_refs` is exactly the one `DriftMetricDeltaResult` ref. Its provenance contains the binding, model when non-null, promotion evaluation, prior drift report when non-null, complete window population, metric delta, code manifest, and runtime profile. The array is unique by complete entry and sorted by the raw-UTF-8 tuple `(relationship, record_id, schema_id, schema_version, content_digest)`. `immediate_failure_refs` is exactly empty; immediate revocation suspension is the separate path above and cannot be inferred merely from a report.

`request_digest` is derived before looking up an idempotent receipt as `sha256Canonical({contract_version: "contentmd.learning-drift-request/0.1.0", record_mode, binding_stream_id, expected_head_digest, actor_ref, previous_report, promotion_evaluation, dataset_replay, currentness, observations, evaluation_at})`; the opaque vault token is never hashed. `drift_report_append` stores exactly one complete `StoredDriftWindowReceipt` as one atomic simulator entry. `stored_receipt_digest` is `sha256Canonical()` over every receipt field except itself. The receipt contains the complete report, population, metric delta, cursors, close reason, selected observation IDs, and exact transition-free `LearningDriftResultPreimage`; its repeated report, metric, cursor, selection, input-digest, and binding fields must be byte-equal across every occurrence. Independent readback revalidates the receipt digest, every nested identity/digest, the population equations, and the report/preimage/provenance equations before returning. The cursor/observations become consumed only when that append commits. For a non-suspending receipt, final result derivation appends literal `suspension_transition: null` to the stored preimage and then derives `result_digest`. For a suspending receipt, it appends the one verified cause-bound suspension transition rebuilt from section 13 events, then derives `result_digest`; the report receipt is never rewritten and the transition ID never enters its digest. A byte-identical retry requires both the same `request_digest` and the same derived `drift_input_digest`; one without the other, duplicate receipts, or different bytes that collide on either identity is `task6_drift_history_invalid`. A suspending disposition performs its separate suspension prepare/commit/readback only after drift-report readback; those three appends use the suspension fault operations and never rewrite the report.

`inspectDriftWindow()` is the read-only inspection seam. It mode-gates, authenticates the active vault, validates the input digest, rebuilds the stored report/cursor and any suspension events, and returns null only when no report append exists. `report_committed` means a suspending report exists without prepare; `suspension_prepared` means prepare exists without commit; `suspension_pending_readback` means commit exists without readback; `completed` means either a verified non-suspending report or a suspending report with verified readback. `terminal_result_digest` is non-null exactly for `completed`; status digest hashes every field except itself.

All four status states use `selected_observation_count = selected_observation_ids.length = report.payload.decisive_pair_count`. The selected-ID vector is the exact chronological window vector committed by `drift_report_append`; pair-cap therefore gives `100`, while day-30 gives its actual closed-window count. `next_cursor` is byte-equal to the committed report/result preimage. The remaining equations are:

| `DriftWindowStatus.state` | Required durable evidence | `suspension_transition_id` | `terminal_result_digest` |
| --- | --- | --- | --- |
| `report_committed` | suspending report exists; no suspension prepare | null | null |
| `suspension_prepared` | exact prepare event exists; no commit | non-null and byte-equal to the rederived prepare-payload `transition_id` | null |
| `suspension_pending_readback` | exact prepare and suspension commit exist; no readback | non-null and equal across rederived prepare/commit payloads and pending binding projection | null |
| `completed` | either verified non-suspending report with no suspension events, or suspending report plus exact prepare/commit/readback | null for non-suspend; otherwise non-null and equal across prepare/commit/readback payloads and final projection | non-null and equal to the rederived complete `LearningDriftResult.result_digest` |

Any count/cursor mismatch, transition ID in a state requiring null, null or unequal transition ID in a suspension state, terminal digest in a nonterminal state, or missing terminal digest in `completed` is `task6_drift_history_invalid`. `status_digest` hashes the complete public status except itself only after these equations pass.

| Drift fault/durable evidence | Public recovery | Cursor and suspension rule |
| --- | --- | --- |
| report `before_append` | exact `evaluateDriftWindow()` input may retry | previous cursor remains current; no observation consumed; no suspension starts |
| report committed, ack/readback fails | inspection returns `completed` for non-suspend or `report_committed` for suspend after recomputation; byte-identical input resumes without a second report append | selected observations and next cursor are already consumed once |
| committed non-suspending report | byte-identical duplicate returns the same frozen result | no metric/bootstrap recompute, counter increment, or observation reuse |
| committed suspending report, suspension not prepared | byte-identical retry reuses the report and starts the one suspension transition | report/counters remain single; transition identity is unchanged |
| suspension prepared only | drift inspection returns `suspension_prepared`; byte-identical retry revalidates the stored prepare and continues at commit without reappend; different bytes fail | report remains committed; transition identity and prepare count remain one |
| suspension commit pending readback | drift inspection returns `suspension_pending_readback`; binding inspection exposes pending and `recoverSimulatedBindingReadback()` is the sole transition recovery seam | drift retry throws `task6_transition_pending_readback` until recovery; no report/cursor duplication |
| suspension readback committed before ack | binding recovery returns the existing verified projection; byte-identical drift retry then returns the stored result | one report, one transition, one consumed window |
| different bytes reuse the same prior-report/cursor or resulting report ID | `task6_drift_history_invalid` | no append, retry, counter, or fallback |

Exact-input idempotent replay is the report recovery seam, drift inspection exposes its durable stage, and binding inspection/recovery is the suspension seam. A process crash is recoverable only through the one-live-lineage snapshot transfer. No recovery path recomputes a different bootstrap, changes `evaluation_at`, consumes a second window, or advances a counter twice.

## 15. Rollback revalidation, fallback, and atomic sequence

Rollback begins only from a fully verified, nonpending simulated binding projection whose physical and verified heads are equal to `expected_head_digest`. `ordered_target_replays` must equal every prior verified learned-model binding in exact reverse verified chronology, without omission, addition, or reordering. A non-null `requested_target_event_digest` must equal exactly one entry; target search begins at that entry and continues only toward older entries. A null request starts at the first entry and therefore chooses the most recent valid prior model. Newer entries before an explicit requested target remain mandatory replay evidence but are not eligible targets for that request.

For each target in order, the simulator:

1. resolves the exact prior event and complete model/dataset/evaluation lineage from the vault;
2. reruns Task 5 `verifyRankingModel()` from complete dependencies;
3. requires a trained, nonquarantined model and exact objective, candidate kind, project, proposed scope, feature profile, Task 5 runtime, Task 6 runtime, schema, and code bindings;
4. verifies the complete currentness witness at `occurred_at`, including permissions, rights, privacy, policy, incident, reviewer qualification, and independence;
5. rejects any target reached by a stored revocation closure or immediate failure; and
6. chooses the first target that passes every check.

An invalid target is not repaired, rehashed, or silently narrowed. If no prior learned model passes, the transition kind is `fallback_baseline`, model ref is null, and the exact supplied baseline ref must equal the current scope's verified deterministic baseline. Otherwise the transition kind is `rollback` and binds the selected target model.

Rollback uses the section 13 prepare/commit/readback sequence. A target does not become current at prepare or commit. A commit crash leaves the prior verified projection current and the stream fenced. Successful readback supersedes the previous verified binding in projection without modifying its event. The resulting auxiliary transition has authority `none`; Task 6 does not issue a Task 1 `LearningRollbackRecord` in `restored` or `fallback_baseline`, because those states require official mode and `rollback_binding` authority.

Suspension and fallback are distinct: suspension preserves the model ref for review but routes the simulated projection to no learned ordering; fallback binds the deterministic baseline with model ref null. Neither changes a real runtime.

## 16. Record and provenance mapping summary

| Mechanic | Task 1 record emitted in 0.1 | Auxiliary evidence | Authority effect |
| --- | --- | --- | --- |
| sealed evaluation | `LearningEvaluationRun` in `passed`, `failed`, or `invalid` | handle, attempt events/status, open receipt, population, metrics, slices, bootstrap, predicate | `none` |
| shadow plan/run | `ShadowEvaluationPlan` in `ready` | shadow handle, observation ledger, active-only responses, shadow result | `none` |
| simulated promotion | none | simulated decision, transition events, readback receipt, projection | `none` |
| drift | `LearningDriftReport` | window cursor/population/bootstrap, optional suspension transition | `none` |
| revocation | none | revocation witness, derived closure, optional suspension transition | `none` |
| rollback/fallback | none | target replays, transition events, readback receipt, projection | `none` |

`ShadowBindingRecord.active/completed/suspended`, `LearningPromotionDecision.approved/narrowed`, `LearningDeploymentBinding.active/suspended/superseded`, and `LearningRollbackRecord.restored/fallback_baseline` are never issued. Official calls always short-circuit. Adding an authenticated authority resolver, canonical official store, and independent readback boundary requires a new contract version; it is not an implementation detail of this simulator.

## 17. Closed errors and exact precedence

```ts
type Task6GovernanceErrorCode =
  | "task6_input_shape_invalid"
  | "task6_official_mode_not_supported"
  | "task6_vault_invalid"
  | "task6_vault_retired"
  | "task6_snapshot_invalid"
  | "task6_snapshot_already_restored"
  | "task6_snapshot_lineage_fork"
  | "task6_digest_invalid"
  | "task6_reference_invalid"
  | "task6_replay_invalid"
  | "task6_objective_mismatch"
  | "task6_mode_mismatch"
  | "task6_scope_mismatch"
  | "task6_source_not_current"
  | "task6_reviewer_policy_failed"
  | "task6_sealed_test_invalid"
  | "task6_test_population_invalid"
  | "task6_model_invalid"
  | "task6_candidate_ineligible"
  | "task6_code_manifest_invalid"
  | "task6_runtime_profile_unsupported"
  | "task6_metric_invalid"
  | "task6_slice_invalid"
  | "task6_bootstrap_invalid"
  | "task6_evaluation_attempt_consumed"
  | "task6_evaluation_attempt_incomplete"
  | "task6_shadow_chronology_invalid"
  | "task6_shadow_completion_incomplete"
  | "task6_shadow_insufficient"
  | "task6_shadow_influence_detected"
  | "task6_promotion_predicate_failed"
  | "task6_simulated_decision_missing"
  | "task6_stream_head_conflict"
  | "task6_transition_pending_readback"
  | "task6_event_append_failed"
  | "task6_event_readback_failed"
  | "task6_drift_window_invalid"
  | "task6_drift_history_invalid"
  | "task6_revocation_lineage_invalid"
  | "task6_rollback_target_invalid"
  | "task6_no_valid_rollback_target"
  | "task6_simulated_crash";

interface Task6GovernanceErrorShape {
  code: Task6GovernanceErrorCode;
  message: `task6_contract_invalid:${Task6GovernanceErrorCode}`;
  retryable: false;
  authority_effect: "none";
}

class Task6GovernanceError extends Error {
  readonly code: Task6GovernanceErrorCode;
  readonly retryable: false;
  readonly authority_effect: "none";
}
```

All public functions throw only `Task6GovernanceError` for contract failures. Predicate failure normally produces a `failed` evaluation or rejected simulated decision; `task6_promotion_predicate_failed` is used only when a caller asks the binding function to commit despite those stored results. `task6_no_valid_rollback_target` is inspectable diagnostic evidence before the function takes the required baseline fallback; it is thrown only when the fallback baseline is also invalid or mismatched.

After the top-level mode gate, validation stops at the first class in this order:

1. closed nested shape and primitive domain;
2. vault/token membership, active/retired lifecycle, snapshot transfer generation, and one-live-lineage state;
3. digest, derived ID, event-chain, and outer-record truth;
4. complete value/ref equality, existence, and resolver-free replay equality;
5. objective, candidate kind, nested mode, project, scope, and domain equality;
6. permission, rights, privacy, policy, incident, reviewer, source, and revocation currentness;
7. sealed dataset/test population, one-shot attempt state, and test membership;
8. Task 5 model/candidate replay, hard eligibility, code manifest, and Task 5/6 runtime admission;
9. metric, bit/value, coverage, slice, and bootstrap arithmetic;
10. shadow selection, chronology, support, and no-influence;
11. evaluation/shadow/promotion predicate and separate simulated decision;
12. event ID, append, CAS, pending-transition, projection, and readback;
13. drift window/history/counter and lineage-revocation closure;
14. rollback chronology, target revalidation, and baseline fallback; and
15. injected simulator crash.

Within a class, interface fields are checked in literal declaration order and arrays in stored order. The specific error row wins over a generic shape row only after its class is reached. Append failure before commit is `task6_event_append_failed`; commit-before-ack is `task6_simulated_crash` and inspection reveals state; digest or projection mismatch during independent readback is `task6_event_readback_failed`. No error causes an automatic retry, new attempt, new transition, fallback, or hidden mutation.

## 18. Side effects, mutation rules, and concurrency limit

Runtime functions may mutate only the module-private state of the exact passed simulator vault. They never mutate caller input, a Task 1/3/5 record, a verified token, or a prior event. All event history is append-only. Projection, attempt status, counters, supersession, and lineage closure are rebuilt from events and complete replay; cached values are non-authoritative.

The runtime performs no file or SQLite access, network or provider call, browser action, credential or environment lookup, clock read, randomness, subprocess, logging, telemetry, project-memory append, CLI action, product ranking change, promotion, deployment, or official rollback. Times, actor strings, and fault rules are explicit development-fixture inputs. The manifest verifier and SHA-lock tests perform bounded local reads only and write nothing.

Synchronous execution serializes calls only inside one JavaScript process and one root lineage. The section 6 registry permits one active original-or-successor token, atomically retires every exporting source, consumes each snapshot once, and rejects a retired source, active-lineage restore, duplicate restore, stale generation, or same-module fork. There is no cross-worker or cross-process mutual exclusion, and copied bytes can still be imported by separate module registries. This limitation is why Task 6 is non-authoritative and why no official mode exists.

## 19. TDD and verification contract

Implementation uses Node `24.14.0` exactly and test-first order. Minimum executable evidence is:

1. package-export parity proves every section 5 value/type is exported through `packages/learning/src/index.ts` and no private helper is exported;
2. top-level official calls short-circuit before nested proxy/accessor traps for every mode-bearing function;
3. complete Task 3/5 replay tests reject every bare ref, digest, vector, receipt, boolean, structural cast, WeakSet bypass, train/validation member, reordered test row, caller-rehashed object, and changed upstream witness;
4. vault RED tests prove source retirement before snapshot return, retired-source rejection for every stateful API, exact-generation restore, one active original-or-successor, every restore-precedence row including exact-consumed-digest winning over active fork, process-crash states, attempt consumption across transfer, the stated cross-process limitation, and every snapshot error;
5. independent metric fixtures cover every baseline component/applicability combination, contextual averaging, denominator renormalization, exact `p = 0.5`, probability clipping, A/B reversal, `0/0.5/1` accuracy, both log-loss branches, Kahan order, coverage one, positive zero, and bit/value equality;
6. slice tests cover all five dimensions, raw UTF-8 order, one-per-dimension membership, intentional cross-dimension overlap, declared-universe freeze, required/non-required support, scope mismatch, reviewer counts/independence/conflict, currentness fail/unknown/expiry, and hard-rule regression zero;
7. bootstrap tests independently calculate the evaluation and separate drift seeds/domain bytes, uint64 big-endian decoding, rejection boundary, counter increments, group/pair order, repeated groups, fixed-promotion subtraction orientation, empty/insufficient slices, 10,000 replicate-order vector digests, and indices 249/9749;
8. evaluation RED tests mutate every row in both total failure tables and assert population-to-metric/coverage cascades, slice failure-ref reuse, exact state/reason/count/subject/nullability/check booleans/canonical failure order/provenance, plus preclaim non-issuance, claim/open/terminal order, identity, inequality boundaries, and transfer-stable attempt consumption;
9. shadow tests cover the 14-day equality boundary, half-open end, 50-pair/20-group thresholds, chronology tie-break, same-input equality, active-only response bytes, absence of shadow-derived branch fields, every start/observation/completion-claim/terminal fault row, exact-input idempotency, `consumed_incomplete`, no double count, and no Task 1 active shadow binding;
10. event-ledger RED tests prove the proposed-projection preimage contains no transition ID, transition identity contains only its proposed digest, pending/final projection equations are constructible without cycles, literal StoredEvent `schema_version: "0.1.0"` is present in all six events and both ID/digest bindings, all phase/payload/field mutations fail closed, complete-lineage role/value/order mutations change the digest, and prepare/commit/readback/CAS/recovery/supersession preserve history;
11. drift tests cover cursor inclusivity, equal-timestamp ordering, pair-cap close, day-30 equality, 50/20 evaluability, inclusive 0.10 degradation, separate counter domain/current-minus-fixed-promotion vectors, exact counter resets/increments, every four-state status count/cursor/transition-ID/terminal equation, every report/suspension fault row, inspection and exact-input recovery, two-window and 60-day suspension, full prior-report replay, and no double-consumed observation;
12. revocation tests cover every immediate reason, derived source-to-binding closure, unrelated revocation, missing/ambiguous/cyclic lineage, immediate suspension, and no caller-authored edges;
13. rollback tests cover exact reverse chronology, requested-target equality, every currentness/replay invalidation, selection of the first valid prior model, no-valid-model baseline fallback, invalid fallback failure, two-phase crash/recovery, and preserved history; and
14. two fresh-process golden runs produce byte-identical handles, metrics, bootstrap intervals/digests, evaluation record, shadow result, event chain, drift report, rollback/fallback projection, and external raw-byte lock.

The exact verification commands are:

```bash
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-task6-code-manifest.mjs
shasum -a 256 -c fixtures/learning-ranking/task6-simulator-golden.sha256
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node --max-old-space-size=4096 --import tsx scripts/generate-task6-simulator-golden.mts --check
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/task6-simulator-golden.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run packages/learning/test/bootstrap.test.ts packages/learning/test/evaluation.test.ts packages/learning/test/shadow.test.ts packages/learning/test/binding.test.ts packages/learning/test/drift.test.ts packages/learning/test/rollback.test.ts
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/vitest/vitest.mjs run
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node node_modules/typescript/bin/tsc -b tsconfig.json --pretty false
/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/check-package-boundaries.mjs
PATH="/Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin:$PATH" /Users/aagarau/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node scripts/verify-foundation.mjs
git diff --check
```

No test calls a public endpoint, browser, provider, credential resolver, mutable external service, real authority resolver, or production store.

## 20. Acceptance

Task 6 is implementation-ready only when:

1. all public APIs, types, exports, files, identities, manifests, and runtime values are exact and closed;
2. complete Task 3/5 replay is mandatory and no bare assertion can receive an opaque token;
3. the simulator's one-shot limit is documented and tested without a false secrecy or official-authority claim;
4. metric, slice, bootstrap, evaluation-state, and provenance rules have one bit-identical interpretation;
5. shadow returns active ordering only and proves byte-equal active-only responses;
6. simulated binding, drift suspension, revocation, rollback, and fallback use append-only two-phase CAS/readback without rewriting history;
7. crash, append, readback, concurrency, currentness, and rollback failures remain fail-closed and inspectable;
8. every official call stops before nested reads and no Task 1 authority-bearing lifecycle state is emitted; and
9. the focused tests, external manifest/lock checks, full suite, typecheck, package boundaries, foundation verifier, and clean diff pass under the one admitted runtime.
