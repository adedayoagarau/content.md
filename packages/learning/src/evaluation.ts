import { createHash } from "node:crypto";
import { endianness } from "node:os";
import {
  canonicalJson,
  decodeCanonicalDag,
  encodeCanonicalDag,
  finalizeRecord,
  sha256Canonical,
  type CanonicalDag,
} from "@contentmd/core";
import { TASK6_RELEASE_PROFILE } from "./task6-release-profile.js";
import {
  binary64FromHex,
  binary64ToHex,
  kahanSum,
  stableSigmoid,
} from "./numeric.js";
import {
  admitPairwiseRuntime,
  verifyLearningDatasetForTraining,
  verifyPairwiseCandidate,
  verifyPairwiseCodeManifest,
  verifyPairwiseFeatureMatrix,
  verifyRankingModel,
  type LearningDatasetTrainingReplay,
  type PairwiseCandidateVectorReplay,
  type PairwiseFeatureProfileReplay,
  type PairwiseTrainingRequest,
  type RankingModelDependencies,
  type VerifiedPairwiseCandidate,
  type VerifiedRankingModel,
} from "./pairwise-logistic.js";
import { predictPairwise } from "./rank.js";
import {
  qualifyFeedback,
  type FeedbackQualificationInput,
} from "./qualification.js";
import {
  task2CompareRfc3339Instants,
  task2IsRfc3339,
} from "./feedback.js";
import {
  derivePairedBootstrapSeed,
  runPairedGroupBootstrap,
  type Binary64Value,
  type EvaluationPopulation,
  type EvaluationPopulationPair,
  type EvaluationSliceDefinition,
  type PairedBootstrapResult,
  type SliceDimension,
  type Task6ObjectRef,
} from "./bootstrap.js";
import type {
  ArtifactRef,
  FeedbackQualificationRecord,
  LearningEvaluationRun,
  RankingModelRecord,
} from "./records.js";

export type Task6RecordMode = "development_fixture" | "official";
export type Task6AuthorityEffect = "none";
export type Task6GovernanceErrorCode =
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

export interface Task6GovernanceErrorShape {
  code: Task6GovernanceErrorCode;
  message: `task6_contract_invalid:${Task6GovernanceErrorCode}`;
  retryable: false;
  authority_effect: "none";
}

export class Task6GovernanceError extends Error {
  readonly code: Task6GovernanceErrorCode;
  readonly retryable = false as const;
  readonly authority_effect = "none" as const;

  constructor(code: Task6GovernanceErrorCode) {
    super(`task6_contract_invalid:${code}`);
    this.name = "Task6GovernanceError";
    this.code = code;
  }
}

function fail(code: Task6GovernanceErrorCode): never {
  throw new Task6GovernanceError(code);
}

function exactTopLevel(
  value: unknown,
  expectedKeys: readonly string[],
): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail("task6_input_shape_invalid");
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) fail("task6_input_shape_invalid");
  const keys = Reflect.ownKeys(value);
  if (keys.length !== expectedKeys.length || keys.some((key) => typeof key !== "string")) {
    fail("task6_input_shape_invalid");
  }
  const actual = [...keys] as string[];
  if (actual.some((key) => !expectedKeys.includes(key))) fail("task6_input_shape_invalid");
  for (const key of actual) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("task6_input_shape_invalid");
    }
  }
}

function modeGate(value: unknown, expectedKeys: readonly string[]): Record<string, unknown> {
  exactTopLevel(value, expectedKeys);
  const descriptor = Object.getOwnPropertyDescriptor(value, "record_mode");
  if (descriptor === undefined || !("value" in descriptor)
    || (descriptor.value !== "development_fixture" && descriptor.value !== "official")) {
    fail("task6_input_shape_invalid");
  }
  if (descriptor.value === "official") fail("task6_official_mode_not_supported");
  return value;
}

function closedGraph(value: unknown): void {
  const ancestors = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || ["string", "boolean"].includes(typeof current)) return;
    if (typeof current === "number") {
      if (!Number.isFinite(current) || Object.is(current, -0)) fail("task6_input_shape_invalid");
      return;
    }
    if (typeof current !== "object" || ancestors.has(current)) fail("task6_input_shape_invalid");
    const prototype = Object.getPrototypeOf(current);
    if (Array.isArray(current)) {
      if (prototype !== Array.prototype || Object.keys(current).length !== current.length) {
        fail("task6_input_shape_invalid");
      }
    } else if (prototype !== Object.prototype && prototype !== null) {
      fail("task6_input_shape_invalid");
    }
    ancestors.add(current);
    try {
      const keys = Array.isArray(current) ? Object.keys(current) : Reflect.ownKeys(current);
      if (Array.isArray(current)
        && Reflect.ownKeys(current).some((key) => key !== "length" && !keys.includes(String(key)))) {
        fail("task6_input_shape_invalid");
      }
      for (const key of keys) {
        if (typeof key !== "string") fail("task6_input_shape_invalid");
        const descriptor = Object.getOwnPropertyDescriptor(current, key);
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          fail("task6_input_shape_invalid");
        }
        visit(descriptor.value);
      }
    } finally {
      ancestors.delete(current);
    }
  };
  visit(value);
}

function exactKeys(value: Record<string, unknown>, expected: readonly string[]): void {
  const keys = Object.keys(value);
  if (keys.length !== expected.length || keys.some((key) => !expected.includes(key))) {
    fail("task6_input_shape_invalid");
  }
}

function freezeGraph(value: unknown, seen = new Set<object>()): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) freezeGraph(descriptor.value, seen);
  }
  Object.freeze(value);
}

function immutable<T>(value: T): T {
  const clone = structuredClone(value);
  freezeGraph(clone);
  return clone;
}

export type SimulatorOperation =
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

export interface SimulatorFaultRule {
  operation: SimulatorOperation;
  occurrence: number;
  fault: "before_append" | "after_commit_before_ack" | "readback_unavailable";
}

export interface CreateEvaluationSimulatorVaultInput {
  record_mode: Task6RecordMode;
  vault_id: string;
  fault_rules: readonly SimulatorFaultRule[];
}

export interface RestoreEvaluationSimulatorVaultInput {
  record_mode: Task6RecordMode;
  snapshot: EvaluationSimulatorSnapshot;
  fault_rules: readonly SimulatorFaultRule[];
}

export interface EvaluationSimulatorVault {
  readonly contract_version: "contentmd.evaluation-simulator-vault/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly vault_id: string;
  readonly root_lineage_id: string;
  readonly transfer_generation: number;
}

export interface EvaluationSimulatorSnapshot {
  contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  vault_id: string;
  root_lineage_id: string;
  transfer_generation: number;
  transfer_state: "source_retired_restore_once";
  exported_at: string;
  state_encoding: "base64-canonical-dag-json-utf8";
  state_bytes_base64: string;
  state_byte_count: number;
  state_digest: string;
  snapshot_digest: string;
}

export type EvaluationAttemptState =
  | "completed"
  | "failed"
  | "invalid"
  | "consumed_unopened"
  | "consumed_incomplete";

export interface EvaluationAttemptStatus {
  contract_version: "contentmd.evaluation-attempt-status/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  attempt_id: string;
  attempt_key: string;
  state: EvaluationAttemptState;
  claim_event_ref: Task6ObjectRef;
  open_event_ref: Task6ObjectRef | null;
  terminal_event_ref: Task6ObjectRef | null;
  evaluation_ref: Task6ObjectRef | null;
  consumed: true;
  status_digest: string;
}

export interface EvaluationRunRequest {
  record_mode: Task6RecordMode;
  vault: EvaluationSimulatorVault;
  sealed_test: VerifiedSealedTestHandle;
  attempt_id: string;
  opened_at: string;
  actor_ref: string;
}

export interface EvaluationMetricResult {
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
  metric_digest: string;
}

export interface EvaluationFailureEvidence {
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
  failure_digest: string;
}

export interface SliceMetricResult {
  contract_version: "contentmd.slice-metric-result/0.1.0";
  slice: EvaluationSliceDefinition;
  metrics: EvaluationMetricResult | EvaluationFailureEvidence | null;
  support_state: "supported" | "insufficient" | "empty" | "invalid";
  result_digest: string;
}

export interface EvaluationPredicateResult {
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
    { check: "hard_rule_regression_zero"; passed: boolean },
  ];
  evaluation_passed: boolean;
  promotion_ready_without_shadow_or_decision: boolean;
  authority_effect: "none";
  predicate_digest: string;
}

export interface EvaluationRunResult {
  contract_version: "contentmd.sealed-evaluation-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  attempt_status: EvaluationAttemptStatus;
  evaluation_record: LearningEvaluationRun;
  population: EvaluationPopulation | EvaluationFailureEvidence;
  overall_metrics: EvaluationMetricResult | EvaluationFailureEvidence;
  slice_metrics: readonly [SliceMetricResult, ...SliceMetricResult[]];
  failures: readonly EvaluationFailureEvidence[];
  bootstrap: PairedBootstrapResult | null;
  predicate: EvaluationPredicateResult;
  result_digest: string;
}

export interface Task6RuntimeProfile {
  contract_version: "contentmd.task6-runtime-profile/0.1.0";
  node_version: "24.14.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
  profile_digest: string;
}

export interface ObservedTask6RuntimeTuple {
  node_version: "24.14.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
}

export interface VerifiedTask6Runtime {
  readonly profile: Task6RuntimeProfile;
  readonly artifact_ref: ArtifactRef;
  readonly observed_runtime: ObservedTask6RuntimeTuple;
  readonly release_profile_contract_digest: string;
  readonly verification_digest: string;
}

export interface Task6CodeManifestEntry {
  path: string;
  raw_bytes_digest: string;
  byte_count: number;
}

export interface Task6CodeManifest {
  contract_version: "contentmd.task6-code-manifest/0.1.0";
  package_id: "@contentmd/learning";
  package_version: "0.1.0";
  entries: readonly [Task6CodeManifestEntry, ...Task6CodeManifestEntry[]];
  manifest_digest: string;
}

export interface VerifiedTask6CodeManifest {
  readonly manifest: Task6CodeManifest;
  readonly manifest_raw_bytes_digest: string;
  readonly release_profile_contract_digest: string;
  readonly verification_digest: string;
}

export interface ProposedBindingScope {
  contract_version: "contentmd.proposed-binding-scope/0.1.0";
  scope_id: string;
  memory_scope: "task" | "personal" | "project" | "organization" | "public";
  project_id: string;
  permitted_values: readonly [
    { dimension: "project"; values: readonly [string, ...string[]] },
    { dimension: "product_area"; values: readonly [string, ...string[]] },
    { dimension: "channel"; values: readonly [string, ...string[]] },
    { dimension: "locale"; values: readonly [string, ...string[]] },
    { dimension: "risk"; values: readonly [string, ...string[]] },
  ];
  scope_digest: string;
}

export interface RiskSliceWitness {
  contract_version: "contentmd.risk-slice-witness/0.1.0";
  witness_id: string;
  task_ref: Task6ObjectRef;
  context_ref: Task6ObjectRef;
  risk_value: string;
  source_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  witness_digest: string;
}

export interface CurrentnessCheckEntry {
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
  effective_at: string;
  expires_at: string | null;
  evidence_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
}

export interface SimulatedCurrentnessWitness {
  contract_version: "contentmd.simulated-currentness-witness/0.1.0";
  witness_id: string;
  checked_at: string;
  entries: readonly [CurrentnessCheckEntry, ...CurrentnessCheckEntry[]];
  witness_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
}

export interface ReviewerIndependenceEntry {
  reviewer_ref: Task6ObjectRef;
  independent_from_reviewer_refs: readonly Task6ObjectRef[];
  conflict_state: "none" | "adjudicated" | "unresolved";
  qualification_ref: Task6ObjectRef;
}

export interface SimulatedReviewerPolicyWitness {
  contract_version: "contentmd.simulated-reviewer-policy-witness/0.1.0";
  witness_id: string;
  proposed_scope_ref: Task6ObjectRef;
  minimum_qualified_reviewers: number;
  require_pairwise_independence: true;
  reviewers: readonly [ReviewerIndependenceEntry, ...ReviewerIndependenceEntry[]];
  witness_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
}

export interface DeterministicBaselineProfile {
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
    "one_minus_length_distance",
  ];
  weight_bits: readonly [string, string, string, string, string, string, string];
  probability_scale_bits: string;
  probability_clip_lower_bits: string;
  probability_clip_upper_bits: string;
  baseline_digest: string;
}

export interface SealedTestPairReplay {
  example_ref: Task6ObjectRef;
  leakage_group_ref: Task6ObjectRef;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
  risk_slice_witness: RiskSliceWitness;
}

export interface QualificationDenominatorMember {
  qualification_input: FeedbackQualificationInput;
  expected_qualification: FeedbackQualificationRecord;
  test_leakage_group_ref: Task6ObjectRef | null;
}

export interface QualificationDenominatorReplay {
  contract_version: "contentmd.qualification-denominator-replay/0.1.0";
  replay_id: string;
  enumeration_state: "complete_development_fixture";
  proposed_scope_ref: Task6ObjectRef;
  source_refs: readonly [Task6ObjectRef, ...Task6ObjectRef[]];
  members: readonly [QualificationDenominatorMember, ...QualificationDenominatorMember[]];
  replay_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
}

export interface SealedTestReplay {
  contract_version: "contentmd.sealed-test-replay/0.1.0";
  dataset_replay: LearningDatasetTrainingReplay;
  model_record: RankingModelRecord;
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

export interface VerifySealedTestReplayInput {
  record_mode: Task6RecordMode;
  replay: SealedTestReplay;
}

export interface VerifiedSealedTestHandle {
  readonly contract_version: "contentmd.verified-sealed-test-handle/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
  readonly handle_id: string;
  readonly dataset_ref: Task6ObjectRef;
  readonly model_ref: Task6ObjectRef;
  readonly test_population_ref: Task6ObjectRef;
  readonly proposed_scope_ref: Task6ObjectRef;
  readonly replay_verification_digest: string;
  readonly code_verification_digest: string;
  readonly runtime_verification_digest: string;
  readonly handle_digest: string;
}

const OPERATIONS: readonly SimulatorOperation[] = [
  "evaluation_attempt_claim", "evaluation_test_open", "evaluation_terminal_append",
  "shadow_start_append", "shadow_observation_append", "shadow_completion_claim",
  "shadow_terminal_append", "binding_prepare", "binding_commit", "binding_readback",
  "drift_report_append", "suspension_prepare", "suspension_commit", "suspension_readback",
  "rollback_prepare", "rollback_commit", "rollback_readback",
];
const FAULTS = ["before_append", "after_commit_before_ack", "readback_unavailable"] as const;
const DIGEST = /^[a-f0-9]{64}$/;
const TASK6_CODE_PATHS = [
  "docs/superpowers/specs/2026-08-20-contentmd-evaluation-shadow-governance-contracts-design.md",
  "packages/core/src/canonical-dag.ts",
  "packages/core/src/canonical-json.ts",
  "packages/core/src/records.ts",
  "packages/learning/src/binding.ts",
  "packages/learning/src/bootstrap.ts",
  "packages/learning/src/drift.ts",
  "packages/learning/src/evaluation.ts",
  "packages/learning/src/index.ts",
  "packages/learning/src/numeric.ts",
  "packages/learning/src/pairwise-logistic.ts",
  "packages/learning/src/rank.ts",
  "packages/learning/src/records.ts",
  "packages/learning/src/rollback.ts",
  "packages/learning/src/shadow.ts",
  "packages/memory/src/event-store.ts",
  "packages/schemas/src/learning-records.schema.json",
  "scripts/verify-task6-code-manifest.mjs",
] as const;
const verifiedTask6CodeManifests = new WeakSet<object>();

export function verifyTask6CodeManifest(manifest: Task6CodeManifest): VerifiedTask6CodeManifest {
  try {
    closedGraph(manifest);
    exactKeys(manifest as unknown as Record<string, unknown>, [
      "contract_version", "package_id", "package_version", "entries", "manifest_digest",
    ]);
    if (manifest.contract_version !== "contentmd.task6-code-manifest/0.1.0"
      || manifest.package_id !== "@contentmd/learning"
      || manifest.package_version !== "0.1.0"
      || !Array.isArray(manifest.entries)
      || manifest.entries.length !== TASK6_CODE_PATHS.length) {
      fail("task6_code_manifest_invalid");
    }
    for (const [index, entry] of manifest.entries.entries()) {
      exactKeys(entry as unknown as Record<string, unknown>, [
        "path", "raw_bytes_digest", "byte_count",
      ]);
      if (entry.path !== TASK6_CODE_PATHS[index]
        || !Number.isSafeInteger(entry.byte_count) || entry.byte_count < 1) {
        fail("task6_code_manifest_invalid");
      }
      if (!DIGEST.test(entry.raw_bytes_digest)) fail("task6_digest_invalid");
    }
    if (!DIGEST.test(manifest.manifest_digest)) fail("task6_digest_invalid");
    const manifestPreimage = {
      contract_version: manifest.contract_version,
      package_id: manifest.package_id,
      package_version: manifest.package_version,
      entries: manifest.entries,
    };
    const manifestRawBytesDigest = sha256Canonical(manifestPreimage);
    if (manifest.manifest_digest !== manifestRawBytesDigest) fail("task6_digest_invalid");
    const releaseProfilePreimage = {
      contract_version: TASK6_RELEASE_PROFILE.contract_version,
      manifest_raw_bytes_digest: TASK6_RELEASE_PROFILE.manifest_raw_bytes_digest,
      manifest_digest: TASK6_RELEASE_PROFILE.manifest_digest,
      admitted_runtime_profile_digests: TASK6_RELEASE_PROFILE.admitted_runtime_profile_digests,
    };
    if (TASK6_RELEASE_PROFILE.release_profile_contract_digest
        !== sha256Canonical(releaseProfilePreimage)
      || TASK6_RELEASE_PROFILE.manifest_raw_bytes_digest !== manifestRawBytesDigest
      || TASK6_RELEASE_PROFILE.manifest_digest !== manifest.manifest_digest) {
      fail("task6_code_manifest_invalid");
    }
    const verified = immutable({
      manifest,
      manifest_raw_bytes_digest: manifestRawBytesDigest,
      release_profile_contract_digest: TASK6_RELEASE_PROFILE.release_profile_contract_digest,
      verification_digest: sha256Canonical({
        contract_version: "contentmd.verified-task6-code-manifest/0.1.0",
        manifest,
        manifest_raw_bytes_digest: manifestRawBytesDigest,
        release_profile_contract_digest: TASK6_RELEASE_PROFILE.release_profile_contract_digest,
      }),
    }) as VerifiedTask6CodeManifest;
    verifiedTask6CodeManifests.add(verified);
    return verified;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function admitTask6Runtime(profile: Task6RuntimeProfile): VerifiedTask6Runtime {
  try {
    closedGraph(profile);
    exactKeys(profile as unknown as Record<string, unknown>, [
      "contract_version", "node_version", "v8_version", "icu_version", "unicode_version",
      "platform", "architecture", "endianness", "profile_digest",
    ]);
    if (profile.contract_version !== "contentmd.task6-runtime-profile/0.1.0"
      || profile.node_version !== "24.14.0"
      || typeof profile.v8_version !== "string" || profile.v8_version.length === 0
      || typeof profile.icu_version !== "string" || profile.icu_version.length === 0
      || typeof profile.unicode_version !== "string" || profile.unicode_version.length === 0
      || typeof profile.platform !== "string" || profile.platform.length === 0
      || typeof profile.architecture !== "string" || profile.architecture.length === 0
      || (profile.endianness !== "LE" && profile.endianness !== "BE")) {
      fail("task6_runtime_profile_unsupported");
    }
    if (!DIGEST.test(profile.profile_digest)) fail("task6_digest_invalid");
    const { profile_digest: _profileDigest, ...preimage } = profile;
    if (profile.profile_digest !== sha256Canonical(preimage)) fail("task6_digest_invalid");
    const observedIcu = process.versions.icu;
    const observedUnicode = process.versions.unicode;
    if (observedIcu === undefined || observedUnicode === undefined) {
      fail("task6_runtime_profile_unsupported");
    }
    const observed: ObservedTask6RuntimeTuple = {
      node_version: process.versions.node as "24.14.0",
      v8_version: process.versions.v8,
      icu_version: observedIcu,
      unicode_version: observedUnicode,
      platform: process.platform,
      architecture: process.arch,
      endianness: endianness(),
    };
    if (!TASK6_RELEASE_PROFILE.admitted_runtime_profile_digests.some(
      (digest) => digest === profile.profile_digest,
    )
      || canonicalJson(observed) !== canonicalJson({
        node_version: profile.node_version,
        v8_version: profile.v8_version,
        icu_version: profile.icu_version,
        unicode_version: profile.unicode_version,
        platform: profile.platform,
        architecture: profile.architecture,
        endianness: profile.endianness,
      })) fail("task6_runtime_profile_unsupported");
    const artifactRef: ArtifactRef = {
      artifact_id: "contentmd.task6-runtime-profile",
      artifact_version: "0.1.0",
      artifact_digest: profile.profile_digest,
    };
    return immutable({
      profile,
      artifact_ref: artifactRef,
      observed_runtime: observed,
      release_profile_contract_digest: TASK6_RELEASE_PROFILE.release_profile_contract_digest,
      verification_digest: sha256Canonical({
        contract_version: "contentmd.verified-task6-runtime/0.1.0",
        profile,
        artifact_ref: artifactRef,
        observed_runtime: observed,
        release_profile_contract_digest: TASK6_RELEASE_PROFILE.release_profile_contract_digest,
      }),
    });
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

function validateFaultRules(value: unknown): SimulatorFaultRule[] {
  if (!Array.isArray(value)) fail("task6_input_shape_invalid");
  const result = value.map((entry) => {
    if (entry === null || typeof entry !== "object" || Array.isArray(entry)) {
      fail("task6_input_shape_invalid");
    }
    exactKeys(entry as Record<string, unknown>, ["operation", "occurrence", "fault"]);
    const typed = entry as unknown as SimulatorFaultRule;
    if (!OPERATIONS.includes(typed.operation)
      || !Number.isSafeInteger(typed.occurrence)
      || typed.occurrence < 1
      || !FAULTS.includes(typed.fault)) fail("task6_input_shape_invalid");
    return structuredClone(typed);
  });
  const sorted = [...result].sort((left, right) =>
    OPERATIONS.indexOf(left.operation) - OPERATIONS.indexOf(right.operation)
    || left.occurrence - right.occurrence);
  if (canonicalJson(result) !== canonicalJson(sorted)
    || new Set(result.map(({ operation, occurrence }) => `${operation}\0${occurrence}`)).size
      !== result.length) fail("task6_input_shape_invalid");
  return result;
}

interface SerializedVaultState {
  contract_version: "contentmd.evaluation-simulator-state/0.1.0";
  root_lineage_id: string;
  transfer_generation: number;
  operation_occurrences: readonly SimulatorOperationOccurrence[];
  handles: readonly Task6InternalStoredSealedTestReplay[];
  attempts: readonly Task6InternalStoredEvaluationAttempt[];
  shadow_runs: readonly unknown[];
  streams: readonly unknown[];
  transition_receipts: readonly unknown[];
}

export interface Task6InternalStoredEvaluationAttempt {
  contract_version: "contentmd.stored-evaluation-attempt/0.1.0";
  status: EvaluationAttemptStatus;
  evaluation_result: EvaluationRunResult | null;
}

interface SimulatorOperationOccurrence {
  operation: SimulatorOperation;
  count: number;
}

export interface Task6InternalStoredSealedTestReplay {
  contract_version: "contentmd.stored-sealed-test-replay/0.1.0";
  handle: VerifiedSealedTestHandle;
  replay: SealedTestReplay;
  population: EvaluationPopulation;
  dataset_verification_digest: string;
  model_verification_digest: string;
  ordered_candidate_verification_digests: readonly string[];
  ordered_risk_witness_digests: readonly string[];
}

interface VaultState {
  serialized: SerializedVaultState;
  faultRules: SimulatorFaultRule[];
}

interface LineageRegistryEntry {
  active: EvaluationSimulatorVault | null;
  status: "active" | "awaiting_restore";
  pendingSnapshotDigest: string | null;
  transferGeneration: number;
  consumedSnapshots: Set<string>;
}

const vaultMembership = new WeakSet<object>();
const vaultStates = new WeakMap<object, VaultState>();
const retiredVaults = new WeakSet<object>();
const lineages = new Map<string, LineageRegistryEntry>();
const sealedHandleMembership = new WeakSet<object>();
const sealedHandleVaults = new WeakMap<object, EvaluationSimulatorVault>();
const sealedHandleModels = new WeakMap<object, VerifiedRankingModel>();
const vaultVerifiedModels = new WeakMap<
  EvaluationSimulatorVault,
  Map<string, VerifiedRankingModel>
>();

function vaultToken(vault: EvaluationSimulatorVault): VaultState {
  if (vault === null || typeof vault !== "object" || !vaultMembership.has(vault as object)) {
    fail("task6_vault_invalid");
  }
  if (retiredVaults.has(vault as object)) fail("task6_vault_retired");
  const registry = lineages.get(vault.root_lineage_id);
  const state = vaultStates.get(vault as object);
  if (registry === undefined || state === undefined || registry.active !== vault) {
    fail("task6_vault_invalid");
  }
  return state;
}

function newVault(
  vaultId: string,
  rootLineageId: string,
  generation: number,
  state: VaultState,
): EvaluationSimulatorVault {
  const vault = immutable({
    contract_version: "contentmd.evaluation-simulator-vault/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    vault_id: vaultId,
    root_lineage_id: rootLineageId,
    transfer_generation: generation,
  });
  vaultMembership.add(vault);
  vaultStates.set(vault, state);
  return vault;
}

export function createEvaluationSimulatorVault(
  input: CreateEvaluationSimulatorVaultInput,
): EvaluationSimulatorVault {
  try {
    modeGate(input, ["record_mode", "vault_id", "fault_rules"]);
    closedGraph(input);
    if (typeof input.vault_id !== "string" || input.vault_id.length === 0) {
      fail("task6_input_shape_invalid");
    }
    const faultRules = validateFaultRules(input.fault_rules);
    const rootLineageId = `evaluation_vault_lineage.${sha256Canonical({
      contract_version: "contentmd.evaluation-vault-root-lineage/0.1.0",
      vault_id: input.vault_id,
    }).slice(0, 32)}`;
    if (lineages.has(rootLineageId)) fail("task6_snapshot_lineage_fork");
    const serialized: SerializedVaultState = {
      contract_version: "contentmd.evaluation-simulator-state/0.1.0",
      root_lineage_id: rootLineageId,
      transfer_generation: 0,
      operation_occurrences: [],
      handles: [],
      attempts: [],
      shadow_runs: [],
      streams: [],
      transition_receipts: [],
    };
    const vault = newVault(input.vault_id, rootLineageId, 0, { serialized, faultRules });
    lineages.set(rootLineageId, {
      active: vault,
      status: "active",
      pendingSnapshotDigest: null,
      transferGeneration: 0,
      consumedSnapshots: new Set<string>(),
    });
    return vault;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_input_shape_invalid");
  }
}

export function inspectEvaluationAttempt(
  vault: EvaluationSimulatorVault,
  attemptId: string,
): EvaluationAttemptStatus | null {
  try {
    const state = vaultToken(vault);
    if (typeof attemptId !== "string" || attemptId.length === 0) {
      fail("task6_input_shape_invalid");
    }
    const matches = state.serialized.attempts.filter(({ status }) =>
      status.attempt_id === attemptId);
    if (matches.length > 1) fail("task6_vault_invalid");
    return matches.length === 0 ? null : immutable(matches[0]!.status);
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_vault_invalid");
  }
}

/**
 * Internal Task 6 seam for sibling simulator modules. It reauthenticates the
 * opaque handle against its one live vault lineage and returns the already
 * frozen complete replay retained by verifySealedTestReplay(). This function
 * is intentionally not re-exported from the package root.
 */
export function task6InternalRequireSealedReplay(
  handle: VerifiedSealedTestHandle,
): Task6InternalStoredSealedTestReplay {
  if (handle === null || typeof handle !== "object" || !sealedHandleMembership.has(handle)) {
    fail("task6_sealed_test_invalid");
  }
  const vault = sealedHandleVaults.get(handle);
  if (vault === undefined) fail("task6_sealed_test_invalid");
  const state = vaultToken(vault);
  const matches = state.serialized.handles.filter(({ handle: stored }) =>
    stored.handle_id === handle.handle_id);
  if (matches.length !== 1 || !task6CanonicalEqual(matches[0]!.handle, handle)) {
    fail("task6_sealed_test_invalid");
  }
  return matches[0]!;
}

export function task6InternalRequireVerifiedModel(
  handle: VerifiedSealedTestHandle,
): VerifiedRankingModel {
  task6InternalRequireSealedReplay(handle);
  const model = sealedHandleModels.get(handle);
  if (model === undefined) fail("task6_sealed_test_invalid");
  return model;
}

export function task6InternalRequireVerifiedModelById(
  vault: EvaluationSimulatorVault,
  handleId: string,
): VerifiedRankingModel {
  task6InternalRequireSealedReplayById(vault, handleId);
  const model = vaultVerifiedModels.get(vault)?.get(handleId);
  if (model === undefined) fail("task6_sealed_test_invalid");
  return model;
}

export function task6InternalBaselineScore(
  values: readonly number[],
  baseline: DeterministicBaselineProfile,
): number {
  return task6BaselineScore(values, baseline);
}

export function task6InternalRequireSealedReplayInVault(
  vault: EvaluationSimulatorVault,
  handle: VerifiedSealedTestHandle,
): Task6InternalStoredSealedTestReplay {
  vaultToken(vault);
  if (!sealedHandleMembership.has(handle)
    || sealedHandleVaults.get(handle) !== vault) fail("task6_sealed_test_invalid");
  const stored = task6InternalRequireSealedReplay(handle);
  return stored;
}

export function task6InternalReadShadowRuns(
  vault: EvaluationSimulatorVault,
): readonly unknown[] {
  return vaultToken(vault).serialized.shadow_runs;
}

export function task6InternalReadStreams(
  vault: EvaluationSimulatorVault,
): readonly unknown[] {
  return vaultToken(vault).serialized.streams;
}

export function task6InternalReadTransitionReceipts(
  vault: EvaluationSimulatorVault,
): readonly unknown[] {
  return vaultToken(vault).serialized.transition_receipts;
}

export function task6InternalReadLineageValues(
  vault: EvaluationSimulatorVault,
): readonly unknown[] {
  const serialized = vaultToken(vault).serialized;
  return Object.freeze([
    ...serialized.handles,
    ...serialized.attempts,
    ...serialized.shadow_runs,
    ...serialized.streams,
    ...serialized.transition_receipts,
  ]);
}

export function task6InternalCommitTransitionReceipts(
  vault: EvaluationSimulatorVault,
  operation: Extract<SimulatorOperation, "drift_report_append">,
  receipts: readonly unknown[],
): void {
  const state = vaultToken(vault);
  const frozenReceipts = immutable(receipts);
  task6RunAppend(state, operation, () => {
    state.serialized = { ...state.serialized, transition_receipts: frozenReceipts };
  });
}

export function task6InternalCommitStreams(
  vault: EvaluationSimulatorVault,
  operation: Extract<SimulatorOperation,
    | "binding_prepare"
    | "binding_commit"
    | "binding_readback"
    | "suspension_prepare"
    | "suspension_commit"
    | "suspension_readback"
    | "rollback_prepare"
    | "rollback_commit"
    | "rollback_readback">,
  streams: readonly unknown[],
): void {
  const state = vaultToken(vault);
  const frozenStreams = immutable(streams);
  task6RunAppend(state, operation, () => {
    state.serialized = { ...state.serialized, streams: frozenStreams };
  });
}

/**
 * Internal append seam for already detached, recursively immutable simulator
 * values. It preserves structural sharing with prior vault state so a complete
 * rollback lineage is not serialized repeatedly before each atomic append.
 */
export function task6InternalCommitFrozenStreams(
  vault: EvaluationSimulatorVault,
  operation: Extract<SimulatorOperation,
    | "suspension_prepare"
    | "suspension_commit"
    | "suspension_readback"
    | "rollback_prepare"
    | "rollback_commit"
    | "rollback_readback">,
  streams: readonly unknown[],
): void {
  if (streams.some((stream) => stream === null || typeof stream !== "object"
    || !Object.isFrozen(stream))) {
    fail("task6_event_append_failed");
  }
  const state = vaultToken(vault);
  const frozenStreams = Object.freeze([...streams]);
  task6RunAppend(state, operation, () => {
    state.serialized = { ...state.serialized, streams: frozenStreams };
  });
}

export function task6InternalRequireSealedReplayById(
  vault: EvaluationSimulatorVault,
  handleId: string,
): Task6InternalStoredSealedTestReplay {
  const state = vaultToken(vault);
  if (typeof handleId !== "string" || handleId.length === 0) {
    fail("task6_sealed_test_invalid");
  }
  const matches = state.serialized.handles.filter(({ handle }) => handle.handle_id === handleId);
  if (matches.length !== 1) fail("task6_sealed_test_invalid");
  return matches[0]!;
}

export function task6InternalRequireEvaluationResult(
  vault: EvaluationSimulatorVault,
  supplied: EvaluationRunResult,
): EvaluationRunResult {
  const state = vaultToken(vault);
  const matches = state.serialized.attempts.filter(({ evaluation_result: result }) =>
    result !== null
    && result.evaluation_record.record_id === supplied.evaluation_record.record_id);
  const stored = matches.length === 1 ? matches[0]!.evaluation_result : null;
  if (stored === null) fail("task6_replay_invalid");
  const { result_digest: _storedDigest, ...storedSemantic } = stored;
  const { result_digest: _suppliedDigest, ...suppliedSemantic } = supplied;
  if (!DIGEST.test(stored.result_digest)
    || supplied.result_digest !== stored.result_digest
    || stored.result_digest !== sha256Canonical(storedSemantic)
    || supplied.result_digest !== sha256Canonical(suppliedSemantic)) {
    fail("task6_replay_invalid");
  }
  return stored;
}

/**
 * Resolve the one complete sealed replay that produced a stored evaluation.
 * Binding code consumes this value rather than accepting caller-assembled
 * baseline, scope, code, runtime, or dataset evidence.
 */
export function task6InternalRequireSealedReplayForEvaluation(
  vault: EvaluationSimulatorVault,
  supplied: EvaluationRunResult,
): Task6InternalStoredSealedTestReplay {
  const evaluation = task6InternalRequireEvaluationResult(vault, supplied);
  const state = vaultToken(vault);
  const scopeEntries = evaluation.evaluation_record.provenance.filter((entry) =>
    entry.relationship === "proposed_binding_scope");
  if (scopeEntries.length !== 1) fail("task6_replay_invalid");
  const matches = state.serialized.handles.filter((stored) => {
    const replay = stored.replay;
    const baselineRef = task6AuxiliaryRef(
      replay.baseline_profile.baseline_id,
      "contentmd.expression-fit-baseline",
      replay.baseline_profile.baseline_digest,
    );
    const profileRef = task6RecordRef(replay.feature_profile.expected_profile);
    return task6RefsEqual(stored.handle.dataset_ref, evaluation.evaluation_record.payload.dataset_ref)
      && task6RefsEqual(stored.handle.model_ref, evaluation.evaluation_record.payload.model_ref)
      && task6RefsEqual(baselineRef, evaluation.evaluation_record.payload.baseline_ref)
      && task6RefsEqual(profileRef, evaluation.evaluation_record.payload.feature_profile_ref)
      && stored.handle.proposed_scope_ref.record_id === scopeEntries[0]!.record_id
      && stored.handle.proposed_scope_ref.content_digest === scopeEntries[0]!.content_digest;
  });
  if (matches.length !== 1) fail("task6_replay_invalid");
  return matches[0]!;
}

export function task6InternalCommitShadowRuns(
  vault: EvaluationSimulatorVault,
  operation: Extract<SimulatorOperation,
    | "shadow_start_append"
    | "shadow_observation_append"
    | "shadow_completion_claim"
    | "shadow_terminal_append">,
  shadowRuns: readonly unknown[],
): void {
  const state = vaultToken(vault);
  const frozenRuns = immutable(shadowRuns);
  task6RunAppend(state, operation, () => {
    state.serialized = { ...state.serialized, shadow_runs: frozenRuns };
  });
}

/**
 * Append already detached, recursively immutable shadow runs while preserving
 * structural sharing with the prior observation history.
 */
export function task6InternalCommitFrozenShadowRuns(
  vault: EvaluationSimulatorVault,
  operation: Extract<SimulatorOperation, "shadow_observation_append">,
  shadowRuns: readonly unknown[],
): void {
  if (shadowRuns.some((run) => run === null || typeof run !== "object"
    || !Object.isFrozen(run))) {
    fail("task6_event_append_failed");
  }
  const state = vaultToken(vault);
  const frozenRuns = Object.freeze([...shadowRuns]);
  task6RunAppend(state, operation, () => {
    state.serialized = { ...state.serialized, shadow_runs: frozenRuns };
  });
}

function task6AttemptEventRef(
  eventKind: "evaluation_attempt_claimed" | "evaluation_test_opened",
  attemptId: string,
  attemptKey: string,
  handle: VerifiedSealedTestHandle,
  actorRef: string,
  occurredAt: string,
): Task6ObjectRef {
  const digest = sha256Canonical({
    contract_version: "contentmd.evaluation-attempt-event/0.1.0",
    event_kind: eventKind,
    attempt_id: attemptId,
    attempt_key: attemptKey,
    sealed_test_handle_id: handle.handle_id,
    actor_ref: actorRef,
    occurred_at: occurredAt,
  });
  return {
    record_id: `evaluation_attempt_event.${digest.slice(0, 32)}`,
    schema_id: "contentmd.evaluation-attempt-event",
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function task6AttemptStatus(
  attemptId: string,
  attemptKey: string,
  state: EvaluationAttemptState,
  claimEventRef: Task6ObjectRef,
  openEventRef: Task6ObjectRef | null,
  terminalEventRef: Task6ObjectRef | null = null,
  evaluationRef: Task6ObjectRef | null = null,
): EvaluationAttemptStatus {
  const preimage = {
    contract_version: "contentmd.evaluation-attempt-status/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    attempt_id: attemptId,
    attempt_key: attemptKey,
    state,
    claim_event_ref: claimEventRef,
    open_event_ref: openEventRef,
    terminal_event_ref: terminalEventRef,
    evaluation_ref: evaluationRef,
    consumed: true as const,
  };
  return immutable({ ...preimage, status_digest: sha256Canonical(preimage) });
}

function task6RunAppend(
  state: VaultState,
  operation: SimulatorOperation,
  append: () => void,
): void {
  const existing = state.serialized.operation_occurrences.find((entry) =>
    entry.operation === operation);
  const occurrence = (existing?.count ?? 0) + 1;
  const operationOccurrences = state.serialized.operation_occurrences
    .filter((entry) => entry.operation !== operation)
    .concat({ operation, count: occurrence })
    .sort((left, right) => OPERATIONS.indexOf(left.operation) - OPERATIONS.indexOf(right.operation));
  state.serialized = { ...state.serialized, operation_occurrences: operationOccurrences };
  const fault = state.faultRules.find((rule) =>
    rule.operation === operation && rule.occurrence === occurrence)?.fault;
  if (fault === "before_append") fail("task6_simulated_crash");
  append();
  if (fault === "after_commit_before_ack") fail("task6_simulated_crash");
  if (fault === "readback_unavailable") fail("task6_event_readback_failed");
}

export function runSealedEvaluation(input: EvaluationRunRequest): EvaluationRunResult {
  try {
    modeGate(input, [
      "record_mode", "vault", "sealed_test", "attempt_id", "opened_at", "actor_ref",
    ]);
    closedGraph(input);
    const state = vaultToken(input.vault);
    if (!sealedHandleMembership.has(input.sealed_test as object)
      || sealedHandleVaults.get(input.sealed_test as object) !== input.vault
      || typeof input.attempt_id !== "string" || input.attempt_id.length === 0
      || typeof input.actor_ref !== "string" || input.actor_ref.length === 0
      || typeof input.opened_at !== "string" || !task2IsRfc3339(input.opened_at)) {
      fail("task6_sealed_test_invalid");
    }
    const stored = state.serialized.handles.filter(({ handle }) =>
      handle.handle_id === input.sealed_test.handle_id);
    if (stored.length !== 1 || !task6CanonicalEqual(stored[0]!.handle, input.sealed_test)) {
      fail("task6_sealed_test_invalid");
    }
    if (stored[0]!.replay.currentness.checked_at !== input.opened_at) {
      fail("task6_source_not_current");
    }
    const attemptKey = sha256Canonical({
      contract_version: "contentmd.sealed-evaluation-attempt-key/0.1.0",
      dataset_ref: input.sealed_test.dataset_ref,
      model_ref: input.sealed_test.model_ref,
      test_population_ref: input.sealed_test.test_population_ref,
      proposed_scope_ref: input.sealed_test.proposed_scope_ref,
      evaluation_code_manifest_digest: stored[0]!.replay.evaluation_code_manifest.manifest_digest,
    });
    if (state.serialized.attempts.some(({ status }) => status.attempt_key === attemptKey)) {
      fail("task6_evaluation_attempt_consumed");
    }
    const claimEventRef = task6AttemptEventRef(
      "evaluation_attempt_claimed",
      input.attempt_id,
      attemptKey,
      input.sealed_test,
      input.actor_ref,
      input.opened_at,
    );
    const claimed = task6AttemptStatus(
      input.attempt_id,
      attemptKey,
      "consumed_unopened",
      claimEventRef,
      null,
    );
    task6RunAppend(state, "evaluation_attempt_claim", () => {
      state.serialized = {
        ...state.serialized,
        attempts: [...state.serialized.attempts, immutable({
          contract_version: "contentmd.stored-evaluation-attempt/0.1.0" as const,
          status: claimed,
          evaluation_result: null,
        })].sort((left, right) =>
          task6CompareUtf8(left.status.attempt_id, right.status.attempt_id)),
      };
    });

    const openEventRef = task6AttemptEventRef(
      "evaluation_test_opened",
      input.attempt_id,
      attemptKey,
      input.sealed_test,
      input.actor_ref,
      input.opened_at,
    );
    const opened = task6AttemptStatus(
      input.attempt_id,
      attemptKey,
      "consumed_incomplete",
      claimEventRef,
      openEventRef,
    );
    task6RunAppend(state, "evaluation_test_open", () => {
      state.serialized = {
        ...state.serialized,
        attempts: state.serialized.attempts.map((attempt) =>
          attempt.status.attempt_id === input.attempt_id
            ? immutable({ ...attempt, status: opened })
            : attempt),
      };
    });
    return task6CompleteEvaluation(
      state,
      input,
      stored[0]!,
      attemptKey,
      claimEventRef,
      openEventRef,
    );
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_replay_invalid");
  }
}

const TASK6_SLICE_DIMENSIONS: readonly SliceDimension[] = [
  "project", "product_area", "channel", "locale", "risk",
];
const TASK6_BASELINE_COMPONENT_ORDER = [
  "required_fact_coverage",
  "recovery_action_coverage",
  "approved_terminology_ratio",
  "contextual_specificity",
  "supporting_evidence_coverage",
  "one_minus_generic_language_density",
  "one_minus_length_distance",
] as const;
const TASK6_BASELINE_WEIGHT_BITS = [
  "3fd0000000000000",
  "3fc3333333333333",
  "3fc3333333333333",
  "3fc3333333333333",
  "3fc3333333333333",
  "3fb999999999999a",
  "3fa999999999999a",
] as const;
const TASK6_CURRENTNESS_CHECKS = [
  "permission",
  "rights",
  "privacy",
  "policy",
  "incident",
  "reviewer_qualification",
  "reviewer_independence",
] as const;

function task6CanonicalEqual(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function task6CompareUtf8(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function task6CompareCanonical(left: unknown, right: unknown): number {
  return Buffer.compare(
    Buffer.from(canonicalJson(left), "utf8"),
    Buffer.from(canonicalJson(right), "utf8"),
  );
}

function task6CompareObjectRef(left: Task6ObjectRef, right: Task6ObjectRef): number {
  return task6CompareUtf8(left.record_id, right.record_id)
    || task6CompareUtf8(left.schema_id, right.schema_id)
    || task6CompareUtf8(left.schema_version, right.schema_version)
    || task6CompareUtf8(left.content_digest, right.content_digest);
}

function task6RecordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): Task6ObjectRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function task6SnapshotRef(snapshot: {
  snapshot_id: string;
  snapshot_kind: string;
  snapshot_digest: string;
}): Task6ObjectRef {
  return {
    record_id: snapshot.snapshot_id,
    schema_id: `contentmd.task2-${snapshot.snapshot_kind}-snapshot`,
    schema_version: "0.1.0",
    content_digest: snapshot.snapshot_digest,
  };
}

function task6AssertObjectRef(value: Task6ObjectRef): void {
  exactKeys(value as unknown as Record<string, unknown>, [
    "record_id", "schema_id", "schema_version", "content_digest",
  ]);
  if (typeof value.record_id !== "string" || value.record_id.length === 0
    || typeof value.schema_id !== "string" || value.schema_id.length === 0
    || value.schema_version !== "0.1.0"
    || !DIGEST.test(value.content_digest)) fail("task6_reference_invalid");
}

function task6RefsEqual(left: Task6ObjectRef, right: Task6ObjectRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function task6AssertCanonicalRefs(value: readonly Task6ObjectRef[], nonempty: boolean): void {
  if (!Array.isArray(value) || (nonempty && value.length === 0)) {
    fail("task6_input_shape_invalid");
  }
  value.forEach(task6AssertObjectRef);
  const sorted = [...value].sort(task6CompareCanonical);
  if (!task6CanonicalEqual(value, sorted)
    || new Set(value.map((ref) => canonicalJson(ref))).size !== value.length) {
    fail("task6_input_shape_invalid");
  }
}

function task6AssertStringSet(value: readonly string[]): void {
  if (!Array.isArray(value) || value.length === 0
    || value.some((item) => typeof item !== "string" || item.length === 0)) {
    fail("task6_input_shape_invalid");
  }
  const sorted = [...value].sort(task6CompareUtf8);
  if (!task6CanonicalEqual(value, sorted) || new Set(value).size !== value.length) {
    fail("task6_input_shape_invalid");
  }
}

function task6AuxiliaryRef(
  id: string,
  schemaId: string,
  digest: string,
): Task6ObjectRef {
  return {
    record_id: id,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: digest,
  };
}

function task6ValidateScope(scope: ProposedBindingScope): Task6ObjectRef {
  exactKeys(scope as unknown as Record<string, unknown>, [
    "contract_version", "scope_id", "memory_scope", "project_id", "permitted_values",
    "scope_digest",
  ]);
  if (scope.contract_version !== "contentmd.proposed-binding-scope/0.1.0"
    || typeof scope.project_id !== "string" || scope.project_id.length === 0
    || !["task", "personal", "project", "organization", "public"].includes(scope.memory_scope)
    || !Array.isArray(scope.permitted_values)
    || scope.permitted_values.length !== TASK6_SLICE_DIMENSIONS.length) {
    fail("task6_scope_mismatch");
  }
  for (const [index, entry] of scope.permitted_values.entries()) {
    exactKeys(entry as unknown as Record<string, unknown>, ["dimension", "values"]);
    if (entry.dimension !== TASK6_SLICE_DIMENSIONS[index]) fail("task6_scope_mismatch");
    task6AssertStringSet(entry.values);
  }
  if (scope.permitted_values[0].values.length !== 1
    || scope.permitted_values[0].values[0] !== scope.project_id) fail("task6_scope_mismatch");
  const { scope_id: _scopeId, scope_digest: _scopeDigest, ...preimage } = scope;
  const digest = sha256Canonical(preimage);
  if (scope.scope_digest !== digest
    || scope.scope_id !== `proposed_binding_scope.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return task6AuxiliaryRef(scope.scope_id, "contentmd.proposed-binding-scope", digest);
}

function task6ValidateSlices(
  slices: readonly [EvaluationSliceDefinition, ...EvaluationSliceDefinition[]],
  scope: ProposedBindingScope,
): Map<string, EvaluationSliceDefinition> {
  if (!Array.isArray(slices) || slices.length === 0) fail("task6_slice_invalid");
  const expectedPairs = scope.permitted_values.flatMap(({ dimension, values }) =>
    values.map((value) => `${dimension}\0${value}`));
  const map = new Map<string, EvaluationSliceDefinition>();
  for (const slice of slices) {
    exactKeys(slice as unknown as Record<string, unknown>, [
      "contract_version", "slice_id", "key", "required_for_promotion", "slice_digest",
    ]);
    exactKeys(slice.key as unknown as Record<string, unknown>, ["dimension", "value"]);
    if (slice.contract_version !== "contentmd.evaluation-slice-definition/0.1.0"
      || !TASK6_SLICE_DIMENSIONS.includes(slice.key.dimension)
      || typeof slice.key.value !== "string" || slice.key.value.length === 0
      || typeof slice.required_for_promotion !== "boolean") fail("task6_slice_invalid");
    const identityDigest = sha256Canonical({
      contract_version: slice.contract_version,
      key: slice.key,
    });
    const digest = sha256Canonical({
      contract_version: slice.contract_version,
      key: slice.key,
      required_for_promotion: slice.required_for_promotion,
    });
    if (slice.slice_id !== `evaluation_slice.${identityDigest.slice(0, 32)}`
      || slice.slice_digest !== digest) fail("task6_digest_invalid");
    const key = `${slice.key.dimension}\0${slice.key.value}`;
    if (map.has(key)) fail("task6_slice_invalid");
    map.set(key, slice);
  }
  const sorted = [...slices].sort((left, right) =>
    TASK6_SLICE_DIMENSIONS.indexOf(left.key.dimension)
      - TASK6_SLICE_DIMENSIONS.indexOf(right.key.dimension)
    || task6CompareUtf8(left.key.value, right.key.value));
  if (!task6CanonicalEqual(slices, sorted)
    || !task6CanonicalEqual([...map.keys()], expectedPairs)) fail("task6_slice_invalid");
  return map;
}

function task6ValidateBaseline(
  baseline: DeterministicBaselineProfile,
  profileRef: Task6ObjectRef,
): Task6ObjectRef {
  exactKeys(baseline as unknown as Record<string, unknown>, [
    "contract_version", "baseline_id", "feature_profile_ref", "component_order", "weight_bits",
    "probability_scale_bits", "probability_clip_lower_bits", "probability_clip_upper_bits",
    "baseline_digest",
  ]);
  task6AssertObjectRef(baseline.feature_profile_ref);
  if (baseline.contract_version !== "contentmd.expression-fit-baseline/0.1.0"
    || baseline.baseline_id !== "expression-fit-baseline/0.1.0"
    || !task6RefsEqual(baseline.feature_profile_ref, profileRef)
    || !task6CanonicalEqual(baseline.component_order, TASK6_BASELINE_COMPONENT_ORDER)
    || !task6CanonicalEqual(baseline.weight_bits, TASK6_BASELINE_WEIGHT_BITS)
    || baseline.probability_scale_bits !== "4010000000000000"
    || baseline.probability_clip_lower_bits !== "3eb0c6f7a0b5ed8d"
    || baseline.probability_clip_upper_bits !== "3feffffde7210be9") {
    fail("task6_reference_invalid");
  }
  const { baseline_id: _baselineId, baseline_digest: _baselineDigest, ...preimage } = baseline;
  const digest = sha256Canonical(preimage);
  if (baseline.baseline_digest !== digest) fail("task6_digest_invalid");
  return task6AuxiliaryRef(
    baseline.baseline_id,
    "contentmd.expression-fit-baseline",
    baseline.baseline_digest,
  );
}

function task6BaselineScore(values: readonly number[], baseline: DeterministicBaselineProfile): number {
  if (values.length !== 21 || values.some((value) => !Number.isFinite(value))) {
    fail("task6_metric_invalid");
  }
  const components: Array<number | null> = [
    values[7] === 1 ? null : values[6]!,
    values[9] === 1 ? null : values[8]!,
    values[11] === 1 ? null : values[10]!,
    (() => {
      const applicable = [
        ...(values[13] === 0 ? [values[12]!] : []),
        ...(values[15] === 0 ? [values[14]!] : []),
      ];
      return applicable.length === 0 ? null : kahanSum(applicable) / applicable.length;
    })(),
    values[17] === 1 ? null : values[16]!,
    1 - values[18]!,
    values[20] === 1 ? null : 1 - values[19]!,
  ];
  const weights = baseline.weight_bits.map((bits) => binary64FromHex(bits));
  const terms: number[] = [];
  const applicableWeights: number[] = [];
  for (const [index, component] of components.entries()) {
    if (component === null) continue;
    terms.push(component * weights[index]!);
    applicableWeights.push(weights[index]!);
  }
  const score = kahanSum(terms) / kahanSum(applicableWeights);
  if (!Number.isFinite(score)) fail("task6_metric_invalid");
  return Object.is(score, -0) ? 0 : score;
}

function task6BaselineProbability(
  candidateA: VerifiedPairwiseCandidate,
  candidateB: VerifiedPairwiseCandidate,
  baseline: DeterministicBaselineProfile,
): Binary64Value {
  const difference = task6BaselineScore(candidateA.vector.values, baseline)
    - task6BaselineScore(candidateB.vector.values, baseline);
  const z = binary64FromHex(baseline.probability_scale_bits) * difference;
  const unclipped = z === 0 ? 0.5 : stableSigmoid(z);
  const probability = Math.min(
    binary64FromHex(baseline.probability_clip_upper_bits),
    Math.max(binary64FromHex(baseline.probability_clip_lower_bits), unclipped),
  );
  return { value: probability, bits: binary64ToHex(probability) };
}

function task6ValidateRiskWitness(
  witness: RiskSliceWitness,
  taskRef: Task6ObjectRef,
  contextRef: Task6ObjectRef,
): void {
  exactKeys(witness as unknown as Record<string, unknown>, [
    "contract_version", "witness_id", "task_ref", "context_ref", "risk_value", "source_refs",
    "witness_digest",
  ]);
  task6AssertObjectRef(witness.task_ref);
  task6AssertObjectRef(witness.context_ref);
  task6AssertCanonicalRefs(witness.source_refs, true);
  if (witness.contract_version !== "contentmd.risk-slice-witness/0.1.0"
    || typeof witness.risk_value !== "string" || witness.risk_value.length === 0
    || !task6RefsEqual(witness.task_ref, taskRef)
    || !task6RefsEqual(witness.context_ref, contextRef)
    || !task6CanonicalEqual(witness.source_refs, [taskRef, contextRef].sort(task6CompareCanonical))) {
    fail("task6_scope_mismatch");
  }
  const { witness_id: _witnessId, witness_digest: _witnessDigest, ...preimage } = witness;
  const digest = sha256Canonical(preimage);
  if (witness.witness_digest !== digest
    || witness.witness_id !== `risk_slice_witness.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
}

function task6ValidateReviewerPolicy(
  witness: SimulatedReviewerPolicyWitness,
  scopeRef: Task6ObjectRef,
  reviewerQualifications: Map<string, Task6ObjectRef>,
): readonly Task6ObjectRef[] {
  exactKeys(witness as unknown as Record<string, unknown>, [
    "contract_version", "witness_id", "proposed_scope_ref", "minimum_qualified_reviewers",
    "require_pairwise_independence", "reviewers", "witness_digest", "record_mode",
    "authority_effect",
  ]);
  if (witness.contract_version !== "contentmd.simulated-reviewer-policy-witness/0.1.0"
    || witness.record_mode !== "development_fixture" || witness.authority_effect !== "none"
    || !task6RefsEqual(witness.proposed_scope_ref, scopeRef)
    || !Number.isSafeInteger(witness.minimum_qualified_reviewers)
    || witness.minimum_qualified_reviewers < 1
    || witness.require_pairwise_independence !== true
    || !Array.isArray(witness.reviewers) || witness.reviewers.length === 0) {
    fail("task6_reviewer_policy_failed");
  }
  const expectedReviewerRefs = [...reviewerQualifications.keys()]
    .map((key) => JSON.parse(key) as Task6ObjectRef)
    .sort(task6CompareCanonical);
  const actualReviewerRefs: Task6ObjectRef[] = [];
  for (const reviewer of witness.reviewers) {
    exactKeys(reviewer as unknown as Record<string, unknown>, [
      "reviewer_ref", "independent_from_reviewer_refs", "conflict_state", "qualification_ref",
    ]);
    task6AssertObjectRef(reviewer.reviewer_ref);
    task6AssertObjectRef(reviewer.qualification_ref);
    task6AssertCanonicalRefs(reviewer.independent_from_reviewer_refs, false);
    const expectedQualification = reviewerQualifications.get(canonicalJson(reviewer.reviewer_ref));
    const expectedIndependence = expectedReviewerRefs.filter((ref) =>
      !task6RefsEqual(ref, reviewer.reviewer_ref));
    if (expectedQualification === undefined
      || !task6RefsEqual(reviewer.qualification_ref, expectedQualification)
      || reviewer.conflict_state !== "none"
      || !task6CanonicalEqual(reviewer.independent_from_reviewer_refs, expectedIndependence)) {
      fail("task6_reviewer_policy_failed");
    }
    actualReviewerRefs.push(reviewer.reviewer_ref);
  }
  if (!task6CanonicalEqual(actualReviewerRefs, expectedReviewerRefs)
    || witness.minimum_qualified_reviewers > actualReviewerRefs.length) {
    fail("task6_reviewer_policy_failed");
  }
  const { witness_id: _witnessId, witness_digest: _witnessDigest, ...preimage } = witness;
  const digest = sha256Canonical(preimage);
  if (witness.witness_digest !== digest
    || witness.witness_id !== `simulated_reviewer_policy.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return actualReviewerRefs;
}

export function task6InternalValidateCurrentness(
  witness: SimulatedCurrentnessWitness,
  scopeRef: Task6ObjectRef,
  reviewerRefs: readonly Task6ObjectRef[],
): void {
  exactKeys(witness as unknown as Record<string, unknown>, [
    "contract_version", "witness_id", "checked_at", "entries", "witness_digest", "record_mode",
    "authority_effect",
  ]);
  if (witness.contract_version !== "contentmd.simulated-currentness-witness/0.1.0"
    || witness.record_mode !== "development_fixture" || witness.authority_effect !== "none"
    || !task2IsRfc3339(witness.checked_at)
    || !Array.isArray(witness.entries) || witness.entries.length === 0) {
    fail("task6_source_not_current");
  }
  const expected = [
    ...TASK6_CURRENTNESS_CHECKS.slice(0, 5).map((check) => `${check}\0${canonicalJson(scopeRef)}`),
    ...TASK6_CURRENTNESS_CHECKS.slice(5).flatMap((check) => reviewerRefs.map((reviewer) =>
      `${check}\0${canonicalJson(reviewer)}`)),
  ];
  const actual: string[] = [];
  for (const entry of witness.entries) {
    exactKeys(entry as unknown as Record<string, unknown>, [
      "check", "subject_ref", "state", "effective_at", "expires_at", "evidence_refs",
    ]);
    task6AssertObjectRef(entry.subject_ref);
    task6AssertCanonicalRefs(entry.evidence_refs, true);
    if (!TASK6_CURRENTNESS_CHECKS.includes(entry.check)
      || entry.state !== "pass"
      || !task2IsRfc3339(entry.effective_at)
      || (entry.expires_at !== null && !task2IsRfc3339(entry.expires_at))
      || task2CompareRfc3339Instants(entry.effective_at, witness.checked_at) > 0
      || (entry.expires_at !== null
        && task2CompareRfc3339Instants(entry.expires_at, witness.checked_at) < 0)) {
      fail("task6_source_not_current");
    }
    actual.push(`${entry.check}\0${canonicalJson(entry.subject_ref)}`);
  }
  if (!task6CanonicalEqual(actual, expected) || new Set(actual).size !== actual.length) {
    fail("task6_source_not_current");
  }
  const { witness_id: _witnessId, witness_digest: _witnessDigest, ...preimage } = witness;
  const digest = sha256Canonical(preimage);
  if (witness.witness_digest !== digest
    || witness.witness_id !== `simulated_currentness.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
}

function task6ValidateQualificationDenominator(
  replay: QualificationDenominatorReplay,
  scopeRef: Task6ObjectRef,
  decisiveQualifications: Map<string, Task6ObjectRef>,
): { qualificationDenominator: number; tieCount: number; abstentionCount: number } {
  exactKeys(replay as unknown as Record<string, unknown>, [
    "contract_version", "replay_id", "enumeration_state", "proposed_scope_ref", "source_refs",
    "members", "replay_digest", "record_mode", "authority_effect",
  ]);
  task6AssertObjectRef(replay.proposed_scope_ref);
  task6AssertCanonicalRefs(replay.source_refs, true);
  if (replay.contract_version !== "contentmd.qualification-denominator-replay/0.1.0"
    || replay.enumeration_state !== "complete_development_fixture"
    || replay.record_mode !== "development_fixture" || replay.authority_effect !== "none"
    || !task6RefsEqual(replay.proposed_scope_ref, scopeRef)
    || !Array.isArray(replay.members) || replay.members.length === 0) {
    fail("task6_test_population_invalid");
  }
  const memberRefs: Task6ObjectRef[] = [];
  const seenDecisive = new Set<string>();
  let tieCount = 0;
  let abstentionCount = 0;
  for (const member of replay.members) {
    exactKeys(member as unknown as Record<string, unknown>, [
      "qualification_input", "expected_qualification", "test_leakage_group_ref",
    ]);
    const actual = qualifyFeedback(member.qualification_input);
    if (!task6CanonicalEqual(actual, member.expected_qualification)) {
      fail("task6_replay_invalid");
    }
    const qualificationRef = task6RecordRef(actual);
    memberRefs.push(qualificationRef);
    const decisiveGroup = decisiveQualifications.get(canonicalJson(qualificationRef));
    if (actual.payload.outcome === "A" || actual.payload.outcome === "B") {
      if (actual.payload.qualification_state !== "qualified" || decisiveGroup === undefined
        || member.test_leakage_group_ref === null
        || !task6RefsEqual(member.test_leakage_group_ref, decisiveGroup)
        || seenDecisive.has(canonicalJson(qualificationRef))) {
        fail("task6_test_population_invalid");
      }
      seenDecisive.add(canonicalJson(qualificationRef));
    } else {
      if (member.test_leakage_group_ref !== null) fail("task6_test_population_invalid");
      if (actual.payload.outcome === "tie") tieCount += 1;
      else if (actual.payload.outcome === "abstain") abstentionCount += 1;
      else fail("task6_test_population_invalid");
    }
  }
  const sortedMemberRefs = [...memberRefs].sort(task6CompareCanonical);
  if (!task6CanonicalEqual(memberRefs, sortedMemberRefs)
    || new Set(memberRefs.map((ref) => canonicalJson(ref))).size !== memberRefs.length
    || !task6CanonicalEqual(replay.source_refs, memberRefs)
    || seenDecisive.size !== decisiveQualifications.size) {
    fail("task6_test_population_invalid");
  }
  const { replay_id: _replayId, replay_digest: _replayDigest, ...preimage } = replay;
  const digest = sha256Canonical(preimage);
  if (replay.replay_digest !== digest
    || replay.replay_id !== `qualification_denominator.${digest.slice(0, 32)}`) {
    fail("task6_digest_invalid");
  }
  return {
    qualificationDenominator: replay.members.length,
    tieCount,
    abstentionCount,
  };
}

export function verifySealedTestReplay(
  vault: EvaluationSimulatorVault,
  input: VerifySealedTestReplayInput,
): VerifiedSealedTestHandle {
  try {
    modeGate(input, ["record_mode", "replay"]);
    closedGraph(input);
    const state = vaultToken(vault);
    const replay = input.replay;
    exactKeys(replay as unknown as Record<string, unknown>, [
      "contract_version", "dataset_replay", "model_record", "model_dependencies",
      "feature_profile", "baseline_profile", "proposed_scope", "declared_slices",
      "currentness", "reviewer_policy", "test_pairs", "qualification_denominator",
      "evaluation_code_manifest", "evaluation_runtime_profile",
    ]);
    if (replay.contract_version !== "contentmd.sealed-test-replay/0.1.0"
      || !Array.isArray(replay.test_pairs) || replay.test_pairs.length === 0) {
      fail("task6_sealed_test_invalid");
    }
    const verifiedCode = verifyTask6CodeManifest(replay.evaluation_code_manifest);
    const verifiedRuntime = admitTask6Runtime(replay.evaluation_runtime_profile);
    const dataset = verifyLearningDatasetForTraining({
      record_mode: "development_fixture",
      replay: replay.dataset_replay,
    });
    const suppliedTrainingRequest = replay.model_dependencies.training_request;
    const modelDataset = verifyLearningDatasetForTraining({
      record_mode: "development_fixture",
      replay: suppliedTrainingRequest.dataset.replay,
    });
    const modelTrainingRequest: PairwiseTrainingRequest = {
      contract_version: suppliedTrainingRequest.contract_version,
      record_mode: suppliedTrainingRequest.record_mode,
      purpose: suppliedTrainingRequest.purpose,
      dataset: modelDataset,
      feature_matrix: verifyPairwiseFeatureMatrix({
        record_mode: "development_fixture",
        dataset: modelDataset,
        replay: suppliedTrainingRequest.feature_matrix.replay,
      }),
      code_manifest: verifyPairwiseCodeManifest(suppliedTrainingRequest.code_manifest.manifest),
      runtime_profile: admitPairwiseRuntime(suppliedTrainingRequest.runtime_profile.profile),
    };
    if (encodeCanonicalDag(suppliedTrainingRequest).root_digest
      !== encodeCanonicalDag(modelTrainingRequest).root_digest) {
      fail("task6_model_invalid");
    }
    const model = verifyRankingModel(replay.model_record, {
      training_request: modelTrainingRequest,
    });
    const datasetRef = dataset.dataset_ref;
    const modelRef = task6RecordRef(model.record);
    const profileRef = task6RecordRef(replay.feature_profile.expected_profile);
    if (!task6RefsEqual(model.record.payload.dataset_ref, datasetRef)
      || !task6RefsEqual(model.record.payload.feature_profile_ref, profileRef)
      || !task6CanonicalEqual(model.training_request.dataset.replay, replay.dataset_replay)
      || !task6CanonicalEqual(
        model.training_request.feature_matrix.replay.profile,
        replay.feature_profile,
      )) fail("task6_model_invalid");

    const scopeRef = task6ValidateScope(replay.proposed_scope);
    const sliceMap = task6ValidateSlices(replay.declared_slices, replay.proposed_scope);
    task6ValidateBaseline(replay.baseline_profile, profileRef);

    const testRefs = dataset.dataset_record.payload.test_example_refs;
    if (testRefs.length !== replay.test_pairs.length
      || replay.test_pairs.some((pair, index) => !task6RefsEqual(pair.example_ref, testRefs[index]!))) {
      fail("task6_test_population_invalid");
    }
    const subjectsByRef = new Map(dataset.replay.build_input.leakage_evidence.subjects.map((subject) => [
      canonicalJson(task6RecordRef(subject.example.preference)),
      subject,
    ]));
    const groupsByExample = new Map<string, typeof dataset.replayed_build_result.groups>();
    for (const group of dataset.replayed_build_result.groups) {
      for (const ref of group.payload.member_refs) {
        const key = canonicalJson(ref);
        const matches = groupsByExample.get(key) ?? [];
        matches.push(group);
        groupsByExample.set(key, matches);
      }
    }
    const reviewerQualifications = new Map<string, Task6ObjectRef>();
    const decisiveQualifications = new Map<string, Task6ObjectRef>();
    const candidateVerificationDigests: string[] = [];
    const riskWitnessDigests: string[] = [];
    const populationPairs: EvaluationPopulationPair[] = [];
    for (const [ordinal, pair] of replay.test_pairs.entries()) {
      exactKeys(pair as unknown as Record<string, unknown>, [
        "example_ref", "leakage_group_ref", "candidate_a", "candidate_b", "risk_slice_witness",
      ]);
      task6AssertObjectRef(pair.example_ref);
      task6AssertObjectRef(pair.leakage_group_ref);
      const subject = subjectsByRef.get(canonicalJson(pair.example_ref));
      const groups = groupsByExample.get(canonicalJson(pair.example_ref));
      if (subject === undefined || groups?.length !== 1 || groups[0]!.payload.split !== "test"
        || !task6RefsEqual(pair.leakage_group_ref, task6RecordRef(groups[0]!))) {
        fail("task6_test_population_invalid");
      }
      const candidateA = verifyPairwiseCandidate({
        record_mode: "development_fixture",
        profile: replay.feature_profile,
        replay: pair.candidate_a,
      });
      const candidateB = verifyPairwiseCandidate({
        record_mode: "development_fixture",
        profile: replay.feature_profile,
        replay: pair.candidate_b,
      });
      const qualificationInput = subject.example.qualification_input;
      const expectedCandidateARef = task6SnapshotRef(qualificationInput.candidate_a);
      const expectedCandidateBRef = task6SnapshotRef(qualificationInput.candidate_b);
      const taskRef = task6SnapshotRef(qualificationInput.task);
      const contextRef = task6SnapshotRef(qualificationInput.context);
      if (!task6RefsEqual(candidateA.candidate_ref, expectedCandidateARef)
        || !task6RefsEqual(candidateB.candidate_ref, expectedCandidateBRef)
        || candidateA.vector.project_id !== replay.proposed_scope.project_id
        || candidateB.vector.project_id !== replay.proposed_scope.project_id
        || !task6RefsEqual(candidateA.vector.context_ref, contextRef)
        || !task6RefsEqual(candidateB.vector.context_ref, contextRef)
        || !task6RefsEqual(candidateA.vector.feature_profile_ref, profileRef)
        || !task6RefsEqual(candidateB.vector.feature_profile_ref, profileRef)
        || !task6RefsEqual(
          candidateA.vector.checkpoint_set_ref,
          subject.example.preference.payload.feature_source_checkpoint_set_ref,
        )
        || !task6RefsEqual(
          candidateB.vector.checkpoint_set_ref,
          subject.example.preference.payload.feature_source_checkpoint_set_ref,
        )) fail("task6_candidate_ineligible");
      task6ValidateRiskWitness(pair.risk_slice_witness, taskRef, contextRef);
      const derivedSliceValues = [
        replay.proposed_scope.project_id,
        qualificationInput.context.payload.product_area,
        qualificationInput.context.payload.channel,
        qualificationInput.context.payload.locale,
        pair.risk_slice_witness.risk_value,
      ] as const;
      const sliceIds = TASK6_SLICE_DIMENSIONS.map((dimension, index) => {
        const permitted = replay.proposed_scope.permitted_values[index]!;
        const value = derivedSliceValues[index]!;
        if (permitted.dimension !== dimension || !permitted.values.includes(value)) {
          fail("task6_scope_mismatch");
        }
        const slice = sliceMap.get(`${dimension}\0${value}`);
        if (slice === undefined) fail("task6_slice_invalid");
        return slice.slice_id;
      }) as [string, string, string, string, string];
      for (const entry of qualificationInput.reviewer_set.payload.entries) {
        reviewerQualifications.set(
          canonicalJson(entry.reviewer_ref),
          entry.independence_evidence_refs[0]!,
        );
      }
      decisiveQualifications.set(
        canonicalJson(task6RecordRef(subject.example.qualification)),
        pair.leakage_group_ref,
      );
      const candidatePrediction = predictPairwise(model, candidateA, candidateB);
      const candidateProbability: Binary64Value = {
        value: candidatePrediction.probability,
        bits: candidatePrediction.probability_bits,
      };
      const pairWithoutDigest = {
        ordinal,
        example_ref: pair.example_ref,
        leakage_group_ref: pair.leakage_group_ref,
        label: subject.example.preference.payload.label,
        slice_ids: sliceIds,
        baseline_probability: task6BaselineProbability(candidateA, candidateB, replay.baseline_profile),
        candidate_probability: candidateProbability,
      };
      populationPairs.push({
        ...pairWithoutDigest,
        pair_digest: sha256Canonical(pairWithoutDigest),
      });
      candidateVerificationDigests.push(
        candidateA.verification_digest,
        candidateB.verification_digest,
      );
      riskWitnessDigests.push(pair.risk_slice_witness.witness_digest);
    }

    const reviewerRefs = task6ValidateReviewerPolicy(
      replay.reviewer_policy,
      scopeRef,
      reviewerQualifications,
    );
    task6InternalValidateCurrentness(replay.currentness, scopeRef, reviewerRefs);
    const denominator = task6ValidateQualificationDenominator(
      replay.qualification_denominator,
      scopeRef,
      decisiveQualifications,
    );
    const groupOrder = [...new Map(populationPairs.map((pair) => [
      canonicalJson(pair.leakage_group_ref),
      pair.leakage_group_ref,
    ])).values()].sort(task6CompareObjectRef);
    if (groupOrder.length === 0) fail("task6_test_population_invalid");
    const coverage: Binary64Value = { value: 1, bits: "3ff0000000000000" };
    const populationWithoutIdentity = {
      contract_version: "contentmd.evaluation-population/0.1.0" as const,
      pair_order: populationPairs as [EvaluationPopulationPair, ...EvaluationPopulationPair[]],
      decisive_pair_count: populationPairs.length,
      leakage_group_order: groupOrder as [Task6ObjectRef, ...Task6ObjectRef[]],
      leakage_group_count: groupOrder.length,
      coverage,
      qualification_denominator: denominator.qualificationDenominator,
      tie_count: denominator.tieCount,
      abstention_count: denominator.abstentionCount,
    };
    const populationDigest = sha256Canonical(populationWithoutIdentity);
    const population = immutable({
      ...populationWithoutIdentity,
      population_id: `evaluation_population.${populationDigest.slice(0, 32)}`,
      population_digest: populationDigest,
    }) as EvaluationPopulation;
    const populationRef = task6AuxiliaryRef(
      population.population_id,
      "contentmd.evaluation-population",
      population.population_digest,
    );
    const completeReplayDigest = sha256Canonical({
      contract_version: "contentmd.sealed-test-complete-replay/0.1.0",
      replay,
    });
    const replayVerificationDigest = sha256Canonical({
      contract_version: "contentmd.sealed-test-replay-verification/0.1.0",
      complete_replay_digest: completeReplayDigest,
      dataset_verification_digest: dataset.verification_digest,
      model_verification_digest: model.verification_digest,
      ordered_candidate_verification_digests: candidateVerificationDigests,
      ordered_risk_witness_digests: riskWitnessDigests,
      qualification_denominator_replay_digest: replay.qualification_denominator.replay_digest,
      proposed_scope_digest: replay.proposed_scope.scope_digest,
      ordered_declared_slice_digests: replay.declared_slices.map(({ slice_digest }) => slice_digest),
      currentness_witness_digest: replay.currentness.witness_digest,
      reviewer_policy_witness_digest: replay.reviewer_policy.witness_digest,
      baseline_digest: replay.baseline_profile.baseline_digest,
      test_population_digest: population.population_digest,
      code_verification_digest: verifiedCode.verification_digest,
      runtime_verification_digest: verifiedRuntime.verification_digest,
    });
    const handleIdentity = {
      contract_version: "contentmd.verified-sealed-test-handle/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      dataset_ref: datasetRef,
      model_ref: modelRef,
      test_population_ref: populationRef,
      proposed_scope_ref: scopeRef,
      replay_verification_digest: replayVerificationDigest,
      code_verification_digest: verifiedCode.verification_digest,
      runtime_verification_digest: verifiedRuntime.verification_digest,
    };
    const handle = immutable({
      ...handleIdentity,
      handle_id: `sealed_test_handle.${completeReplayDigest.slice(0, 32)}`,
      handle_digest: sha256Canonical(handleIdentity),
    }) as VerifiedSealedTestHandle;
    const stored = immutable({
      contract_version: "contentmd.stored-sealed-test-replay/0.1.0" as const,
      handle,
      replay,
      population,
      dataset_verification_digest: dataset.verification_digest,
      model_verification_digest: model.verification_digest,
      ordered_candidate_verification_digests: candidateVerificationDigests,
      ordered_risk_witness_digests: riskWitnessDigests,
    }) as Task6InternalStoredSealedTestReplay;
    const existing = state.serialized.handles.filter(({ handle: admitted }) =>
      admitted.handle_id === handle.handle_id);
    const storedRootDigest = encodeCanonicalDag(stored).root_digest;
    if (existing.length > 1
      || (existing.length === 1
        && encodeCanonicalDag(existing[0]).root_digest !== storedRootDigest)) {
      fail("task6_sealed_test_invalid");
    }
    if (existing.length === 0) {
      state.serialized = {
        ...state.serialized,
        handles: [...state.serialized.handles, stored].sort((left, right) =>
          task6CompareUtf8(left.handle.handle_id, right.handle.handle_id)),
      };
    }
    sealedHandleMembership.add(handle);
    sealedHandleVaults.set(handle, vault);
    sealedHandleModels.set(handle, model);
    const models = vaultVerifiedModels.get(vault) ?? new Map<string, VerifiedRankingModel>();
    models.set(handle.handle_id, model);
    vaultVerifiedModels.set(vault, models);
    return handle;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_replay_invalid");
  }
}

function task6Binary(value: number): Binary64Value {
  const canonical = value === 0 ? 0 : value;
  if (!Number.isFinite(canonical)) fail("task6_metric_invalid");
  return { value: canonical, bits: binary64ToHex(canonical) };
}

function task6MetricResult(
  pairs: readonly EvaluationPopulationPair[],
): EvaluationMetricResult {
  if (pairs.length === 0) fail("task6_metric_invalid");
  const accuracy = (probability: number, label: 0 | 1): number =>
    probability === 0.5 ? 0.5 : Number((probability > 0.5) === (label === 1));
  const loss = (probability: number, label: 0 | 1): number =>
    label === 1 ? -Math.log(probability) : -Math.log1p(-probability);
  const baselineAccuracy = kahanSum(pairs.map((pair) =>
    accuracy(pair.baseline_probability.value, pair.label))) / pairs.length;
  const candidateAccuracy = kahanSum(pairs.map((pair) =>
    accuracy(pair.candidate_probability.value, pair.label))) / pairs.length;
  const baselineLogLoss = kahanSum(pairs.map((pair) =>
    loss(pair.baseline_probability.value, pair.label))) / pairs.length;
  const candidateLogLoss = kahanSum(pairs.map((pair) =>
    loss(pair.candidate_probability.value, pair.label))) / pairs.length;
  const groupCount = new Set(pairs.map((pair) => canonicalJson(pair.leakage_group_ref))).size;
  const preimage = {
    contract_version: "contentmd.evaluation-metric-result/0.1.0" as const,
    pair_count: pairs.length,
    leakage_group_count: groupCount,
    coverage: task6Binary(1),
    baseline_accuracy: task6Binary(baselineAccuracy),
    candidate_accuracy: task6Binary(candidateAccuracy),
    accuracy_difference: task6Binary(candidateAccuracy - baselineAccuracy),
    baseline_log_loss: task6Binary(baselineLogLoss),
    candidate_log_loss: task6Binary(candidateLogLoss),
    log_loss_difference: task6Binary(candidateLogLoss - baselineLogLoss),
  };
  const digest = sha256Canonical(preimage);
  return immutable({
    ...preimage,
    metric_result_id: `evaluation_metric.${digest.slice(0, 32)}`,
    metric_digest: digest,
  });
}

function task6MetricRef(metric: EvaluationMetricResult): Task6ObjectRef {
  return task6AuxiliaryRef(
    metric.metric_result_id,
    "contentmd.evaluation-metric-result",
    metric.metric_digest,
  );
}

function task6SliceMetricResult(
  slice: EvaluationSliceDefinition,
  population: EvaluationPopulation,
): SliceMetricResult {
  const pairs = population.pair_order.filter((pair) => pair.slice_ids.includes(slice.slice_id));
  const groupCount = new Set(pairs.map((pair) => canonicalJson(pair.leakage_group_ref))).size;
  const supportState = pairs.length === 0
    ? "empty" as const
    : pairs.length >= 20 && groupCount >= 5
      ? "supported" as const
      : "insufficient" as const;
  const preimage = {
    contract_version: "contentmd.slice-metric-result/0.1.0" as const,
    slice,
    metrics: pairs.length === 0 ? null : task6MetricResult(pairs),
    support_state: supportState,
  };
  return immutable({ ...preimage, result_digest: sha256Canonical(preimage) });
}

function task6SliceMetricRef(result: SliceMetricResult): Task6ObjectRef {
  return task6AuxiliaryRef(
    `slice_metric.${result.result_digest.slice(0, 32)}`,
    "contentmd.slice-metric-result",
    result.result_digest,
  );
}

function task6PredicateResult(
  population: EvaluationPopulation,
  bootstrap: PairedBootstrapResult,
  slices: readonly SliceMetricResult[],
): EvaluationPredicateResult {
  const required = slices.filter(({ slice }) => slice.required_for_promotion);
  const bootstrapBySlice = new Map(bootstrap.slice_results.map((result) => [
    result.slice_ref.record_id,
    result,
  ]));
  const requiredSupported = required.every(({ support_state }) => support_state === "supported");
  const requiredAccuracy = requiredSupported && required.every(({ slice }) => {
    const result = bootstrapBySlice.get(slice.slice_id);
    return result?.accuracy_difference !== null
      && result?.accuracy_difference !== undefined
      && result.accuracy_difference.lower.value >= binary64FromHex("bfa999999999999a");
  });
  const requiredLogLoss = requiredSupported && required.every(({ slice }) => {
    const result = bootstrapBySlice.get(slice.slice_id);
    return result?.log_loss_difference !== null
      && result?.log_loss_difference !== undefined
      && result.log_loss_difference.upper.value <= binary64FromHex("3fa999999999999a");
  });
  const checks = [
    { check: "coverage_exactly_one" as const, passed: population.coverage.value === 1 },
    {
      check: "accuracy_lower_bound_positive" as const,
      passed: bootstrap.accuracy_difference.lower.value > 0,
    },
    {
      check: "log_loss_upper_bound_negative" as const,
      passed: bootstrap.log_loss_difference.upper.value < 0,
    },
    { check: "required_slices_supported" as const, passed: requiredSupported },
    { check: "required_slice_accuracy_lower_bound" as const, passed: requiredAccuracy },
    { check: "required_slice_log_loss_upper_bound" as const, passed: requiredLogLoss },
    { check: "currentness_passed" as const, passed: true },
    { check: "reviewer_policy_passed" as const, passed: true },
    { check: "hard_rule_regression_zero" as const, passed: true },
  ] as const;
  const passed = checks.every((check) => check.passed);
  const preimage = {
    contract_version: "contentmd.evaluation-predicate-result/0.1.0" as const,
    checks,
    evaluation_passed: passed,
    promotion_ready_without_shadow_or_decision: passed,
    authority_effect: "none" as const,
  };
  const digest = sha256Canonical(preimage);
  return immutable({
    ...preimage,
    predicate_id: `evaluation_predicate.${digest.slice(0, 32)}`,
    predicate_digest: digest,
  });
}

function task6PredicateRef(predicate: EvaluationPredicateResult): Task6ObjectRef {
  return task6AuxiliaryRef(
    predicate.predicate_id,
    "contentmd.evaluation-predicate-result",
    predicate.predicate_digest,
  );
}

function task6FailureEvidence(
  stage: EvaluationFailureEvidence["stage"],
  reasonCode: Task6GovernanceErrorCode,
  predicateCheck: EvaluationFailureEvidence["predicate_check"],
  pairCount: number,
  subjectRef: Task6ObjectRef,
): EvaluationFailureEvidence {
  const preimage = {
    contract_version: "contentmd.evaluation-failure-evidence/0.1.0" as const,
    stage,
    reason_code: reasonCode,
    predicate_check: predicateCheck,
    expected_pair_count: pairCount,
    completed_pair_count: pairCount,
    subject_ref: subjectRef,
  };
  const digest = sha256Canonical(preimage);
  return immutable({
    ...preimage,
    failure_id: `evaluation_failure.${digest.slice(0, 32)}`,
    failure_digest: digest,
  });
}

function task6FailureRef(failure: EvaluationFailureEvidence): Task6ObjectRef {
  return task6AuxiliaryRef(
    failure.failure_id,
    "contentmd.evaluation-failure-evidence",
    failure.failure_digest,
  );
}

function task6TerminalEventRef(
  eventKind: "evaluation_completed" | "evaluation_failed" | "evaluation_invalid",
  input: EvaluationRunRequest,
  attemptKey: string,
  evaluationRef: Task6ObjectRef,
): Task6ObjectRef {
  const digest = sha256Canonical({
    contract_version: "contentmd.evaluation-attempt-event/0.1.0",
    event_kind: eventKind,
    attempt_id: input.attempt_id,
    attempt_key: attemptKey,
    sealed_test_handle_id: input.sealed_test.handle_id,
    evaluation_ref: evaluationRef,
    actor_ref: input.actor_ref,
    occurred_at: input.opened_at,
  });
  return task6AuxiliaryRef(
    `evaluation_attempt_event.${digest.slice(0, 32)}`,
    "contentmd.evaluation-attempt-event",
    digest,
  );
}

function task6CompleteEvaluation(
  state: VaultState,
  input: EvaluationRunRequest,
  stored: Task6InternalStoredSealedTestReplay,
  attemptKey: string,
  claimEventRef: Task6ObjectRef,
  openEventRef: Task6ObjectRef,
): EvaluationRunResult {
  const replay = stored.replay;
  const population = stored.population;
  const populationRef = input.sealed_test.test_population_ref;
  const featureProfileRef = task6RecordRef(replay.feature_profile.expected_profile);
  const baselineRef = task6AuxiliaryRef(
    replay.baseline_profile.baseline_id,
    "contentmd.expression-fit-baseline",
    replay.baseline_profile.baseline_digest,
  );
  const scopeRef = task6AuxiliaryRef(
    replay.proposed_scope.scope_id,
    "contentmd.proposed-binding-scope",
    replay.proposed_scope.scope_digest,
  );
  const currentnessRef = task6AuxiliaryRef(
    replay.currentness.witness_id,
    "contentmd.simulated-currentness-witness",
    replay.currentness.witness_digest,
  );
  const reviewerRef = task6AuxiliaryRef(
    replay.reviewer_policy.witness_id,
    "contentmd.simulated-reviewer-policy-witness",
    replay.reviewer_policy.witness_digest,
  );
  const handleRef = task6AuxiliaryRef(
    input.sealed_test.handle_id,
    "contentmd.verified-sealed-test-handle",
    input.sealed_test.handle_digest,
  );
  const receiptPreimage = {
    contract_version: "contentmd.test-open-receipt/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    attempt_id: input.attempt_id,
    attempt_key: attemptKey,
    handle_ref: handleRef,
    claim_event_ref: claimEventRef,
    open_event_ref: openEventRef,
    opened_at: input.opened_at,
    population_digest: population.population_digest,
  };
  const receiptDigest = sha256Canonical(receiptPreimage);
  const testOpenReceipt = immutable({
    ...receiptPreimage,
    receipt_id: `test_open_receipt.${receiptDigest.slice(0, 32)}`,
    receipt_digest: receiptDigest,
  });
  const testOpenReceiptRef = task6AuxiliaryRef(
    testOpenReceipt.receipt_id,
    "contentmd.test-open-receipt",
    testOpenReceipt.receipt_digest,
  );
  const openedAttempt = state.serialized.attempts.find(({ status }) =>
    status.attempt_id === input.attempt_id);
  const openedStatus = openedAttempt?.status;
  if (openedStatus === undefined || openedStatus.state !== "consumed_incomplete"
    || !task6RefsEqual(openedStatus.claim_event_ref, claimEventRef)
    || openedStatus.open_event_ref === null
    || !task6RefsEqual(openedStatus.open_event_ref, openEventRef)) {
    fail("task6_event_readback_failed");
  }

  const overallMetrics = task6MetricResult(population.pair_order);
  const overallMetricRef = task6MetricRef(overallMetrics);
  const sliceMetrics = replay.declared_slices.map((slice) =>
    task6SliceMetricResult(slice, population)) as [SliceMetricResult, ...SliceMetricResult[]];
  const sliceMetricRefs = sliceMetrics.map(task6SliceMetricRef) as [
    Task6ObjectRef,
    ...Task6ObjectRef[],
  ];
  const seed = derivePairedBootstrapSeed({
    record_mode: "development_fixture",
    dataset_ref: input.sealed_test.dataset_ref,
    candidate_model_ref: input.sealed_test.model_ref,
    baseline_ref: baselineRef,
    feature_profile_ref: featureProfileRef,
    evaluation_code_manifest_digest: replay.evaluation_code_manifest.manifest_digest,
  });
  const bootstrap = runPairedGroupBootstrap({
    record_mode: "development_fixture",
    seed_digest: seed,
    population,
    declared_slices: replay.declared_slices,
  });
  const bootstrapRef = task6AuxiliaryRef(
    bootstrap.bootstrap_id,
    "contentmd.paired-group-bootstrap-result",
    bootstrap.bootstrap_digest,
  );
  const predicate = task6PredicateResult(population, bootstrap, sliceMetrics);
  const predicateRef = task6PredicateRef(predicate);
  const failedChecks = predicate.checks.filter((check) => !check.passed);
  const failures = failedChecks.map(({ check }) => {
    if (check === "currentness_passed") {
      return task6FailureEvidence(
        "currentness", "task6_source_not_current", check,
        population.decisive_pair_count, currentnessRef,
      );
    }
    if (check === "reviewer_policy_passed") {
      return task6FailureEvidence(
        "reviewer_policy", "task6_reviewer_policy_failed", check,
        population.decisive_pair_count, reviewerRef,
      );
    }
    if (check.startsWith("required_slice_")) {
      const firstRequired = sliceMetrics.find(({ slice }) => slice.required_for_promotion)!;
      return task6FailureEvidence(
        "predicate", "task6_promotion_predicate_failed", check,
        population.decisive_pair_count, task6SliceMetricRef(firstRequired),
      );
    }
    return task6FailureEvidence(
      "predicate", "task6_promotion_predicate_failed", check,
      population.decisive_pair_count, predicateRef,
    );
  });
  const failureRefs = failures.map(task6FailureRef);
  const evaluationState = predicate.evaluation_passed ? "passed" as const : "failed" as const;
  const codeManifestRef = task6AuxiliaryRef(
    `task6_code_manifest.${replay.evaluation_code_manifest.manifest_digest.slice(0, 32)}`,
    "contentmd.task6-code-manifest",
    replay.evaluation_code_manifest.manifest_digest,
  );
  const runtimeRef = task6AuxiliaryRef(
    `task6_runtime_profile.${replay.evaluation_runtime_profile.profile_digest.slice(0, 32)}`,
    "contentmd.task6-runtime-profile",
    replay.evaluation_runtime_profile.profile_digest,
  );
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.learning-evaluation-input/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    attempt_id: input.attempt_id,
    attempt_key: attemptKey,
    handle_digest: input.sealed_test.handle_digest,
    dataset_ref: input.sealed_test.dataset_ref,
    model_ref: input.sealed_test.model_ref,
    baseline_ref: baselineRef,
    feature_profile_ref: featureProfileRef,
    test_open_receipt_ref: testOpenReceiptRef,
    evaluation_population_ref: populationRef,
    overall_metric_refs: [overallMetricRef],
    slice_metric_refs: sliceMetricRefs,
    failure_refs: failureRefs,
    bootstrap_ref: bootstrapRef,
    predicate_result_refs: [predicateRef],
    proposed_scope_ref: scopeRef,
    currentness_witness_ref: currentnessRef,
    reviewer_policy_witness_ref: reviewerRef,
    code_verification_digest: input.sealed_test.code_verification_digest,
    runtime_verification_digest: input.sealed_test.runtime_verification_digest,
    evaluation_state: evaluationState,
  });
  const learningSchema = replay.evaluation_code_manifest.entries.find(({ path }) =>
    path === "packages/schemas/src/learning-records.schema.json");
  if (learningSchema === undefined) fail("task6_code_manifest_invalid");
  const provenanceEntries = [
    { relationship: "evaluated_dataset", ref: input.sealed_test.dataset_ref },
    { relationship: "evaluated_model", ref: input.sealed_test.model_ref },
    { relationship: "used_baseline", ref: baselineRef },
    { relationship: "used_feature_profile", ref: featureProfileRef },
    { relationship: "opened_test_attempt", ref: testOpenReceiptRef },
    { relationship: "evaluated_population", ref: populationRef },
    { relationship: "overall_metric", ref: overallMetricRef },
    ...sliceMetricRefs.map((ref) => ({ relationship: "slice_metric", ref })),
    ...failureRefs.map((ref) => ({ relationship: "evaluation_failure", ref })),
    { relationship: "paired_bootstrap", ref: bootstrapRef },
    { relationship: "evaluation_predicate", ref: predicateRef },
    { relationship: "proposed_binding_scope", ref: scopeRef },
    { relationship: "currentness_fixture", ref: currentnessRef },
    { relationship: "reviewer_policy_fixture", ref: reviewerRef },
    { relationship: "evaluation_code_manifest", ref: codeManifestRef },
    { relationship: "evaluation_runtime_profile", ref: runtimeRef },
  ].sort((left, right) => task6CompareUtf8(left.relationship, right.relationship)
    || task6CompareUtf8(left.ref.record_id, right.ref.record_id)
    || task6CompareUtf8(left.ref.schema_id, right.ref.schema_id)
    || task6CompareUtf8(left.ref.schema_version, right.ref.schema_version)
    || task6CompareUtf8(left.ref.content_digest, right.ref.content_digest));
  const provenance = provenanceEntries.map(({ relationship, ref }) => ({
    record_id: ref.record_id,
    relationship,
    content_digest: ref.content_digest,
  })) as [
    { record_id: string; relationship: string; content_digest: string },
    ...Array<{ record_id: string; relationship: string; content_digest: string }>,
  ];
  const evaluationRecord = finalizeRecord({
    record_id: `learning_evaluation.${inputDigest.slice(0, 32)}`,
    schema_id: "contentmd.learning-evaluation-run",
    schema_version: "0.1.0",
    record_version: 1,
    scope: structuredClone(replay.model_record.scope),
    provenance,
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: learningSchema.raw_bytes_digest,
      code_digest: replay.evaluation_code_manifest.manifest_digest,
      input_digest: inputDigest,
      authority_effect: "none",
      dataset_ref: input.sealed_test.dataset_ref,
      model_ref: input.sealed_test.model_ref,
      baseline_ref: baselineRef,
      feature_profile_ref: featureProfileRef,
      test_open_receipt_ref: testOpenReceiptRef,
      evaluation_population_ref: populationRef,
      overall_metric_refs: [overallMetricRef],
      slice_metric_refs: sliceMetricRefs,
      failure_refs: failureRefs,
      bootstrap_ref: bootstrapRef,
      predicate_result_refs: [predicateRef],
      attempt_consumed: true,
      evaluation_state: evaluationState,
    },
  }) as unknown as LearningEvaluationRun;
  const evaluationRef = task6RecordRef(evaluationRecord);
  const terminalEventRef = task6TerminalEventRef(
    predicate.evaluation_passed ? "evaluation_completed" : "evaluation_failed",
    input,
    attemptKey,
    evaluationRef,
  );
  const terminalStatus = task6AttemptStatus(
    input.attempt_id,
    attemptKey,
    predicate.evaluation_passed ? "completed" : "failed",
    claimEventRef,
    openEventRef,
    terminalEventRef,
    evaluationRef,
  );
  const resultPreimage = {
    contract_version: "contentmd.sealed-evaluation-result/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    attempt_status: terminalStatus,
    evaluation_record: evaluationRecord,
    population,
    overall_metrics: overallMetrics,
    slice_metrics: sliceMetrics,
    failures,
    bootstrap,
    predicate,
  };
  const result = immutable({ ...resultPreimage, result_digest: sha256Canonical(resultPreimage) });
  task6RunAppend(state, "evaluation_terminal_append", () => {
    state.serialized = {
      ...state.serialized,
      attempts: state.serialized.attempts.map((attempt) =>
        attempt.status.attempt_id === input.attempt_id
          ? immutable({ ...attempt, status: terminalStatus, evaluation_result: result })
          : attempt),
    };
  });
  return result;
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function task6SerializedMaxEventTime(state: SerializedVaultState): string {
  const instants: string[] = [];
  const collectEvents = (value: unknown): void => {
    if (!Array.isArray(value)) return;
    for (const event of value) {
      if (event === null || typeof event !== "object" || Array.isArray(event)) continue;
      const occurredAt = (event as { occurred_at?: unknown }).occurred_at;
      if (typeof occurredAt === "string" && task2IsRfc3339(occurredAt)) instants.push(occurredAt);
    }
  };
  for (const run of state.shadow_runs) {
    if (run !== null && typeof run === "object" && !Array.isArray(run)) {
      collectEvents((run as { events?: unknown }).events);
    }
  }
  for (const stream of state.streams) {
    if (Array.isArray(stream)) collectEvents(stream);
    else if (stream !== null && typeof stream === "object") {
      collectEvents((stream as { events?: unknown }).events);
    }
  }
  if (instants.length === 0) return "1970-01-01T00:00:00.000Z";
  return [...instants].sort((left, right) => Date.parse(left) - Date.parse(right)
    || task6CompareUtf8(left, right)).at(-1)!;
}

export function exportEvaluationSimulatorSnapshot(
  vault: EvaluationSimulatorVault,
): EvaluationSimulatorSnapshot {
  try {
    const state = vaultToken(vault);
    const generation = vault.transfer_generation + 1;
    const serialized: SerializedVaultState = {
      ...structuredClone(state.serialized),
      transfer_generation: generation,
    };
    const stateBytes = canonicalJson(encodeCanonicalDag(serialized));
    const envelope = {
      contract_version: "contentmd.evaluation-simulator-snapshot/0.1.0" as const,
      record_mode: "development_fixture" as const,
      authority_effect: "none" as const,
      vault_id: vault.vault_id,
      root_lineage_id: vault.root_lineage_id,
      transfer_generation: generation,
      transfer_state: "source_retired_restore_once" as const,
      exported_at: task6SerializedMaxEventTime(serialized),
      state_encoding: "base64-canonical-dag-json-utf8" as const,
      state_bytes_base64: Buffer.from(stateBytes, "utf8").toString("base64"),
      state_byte_count: Buffer.byteLength(stateBytes, "utf8"),
      state_digest: sha256Utf8(stateBytes),
    };
    const snapshot = immutable({ ...envelope, snapshot_digest: sha256Canonical(envelope) });
    const registry = lineages.get(vault.root_lineage_id)!;
    registry.active = null;
    registry.status = "awaiting_restore";
    registry.pendingSnapshotDigest = snapshot.snapshot_digest;
    registry.transferGeneration = generation;
    retiredVaults.add(vault);
    return snapshot;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_vault_invalid");
  }
}

function validateSnapshot(snapshot: EvaluationSimulatorSnapshot): SerializedVaultState {
  closedGraph(snapshot);
  exactKeys(snapshot as unknown as Record<string, unknown>, [
    "contract_version", "record_mode", "authority_effect", "vault_id", "root_lineage_id",
    "transfer_generation", "transfer_state", "exported_at", "state_encoding",
    "state_bytes_base64", "state_byte_count", "state_digest", "snapshot_digest",
  ]);
  if (snapshot.contract_version !== "contentmd.evaluation-simulator-snapshot/0.1.0"
    || snapshot.record_mode !== "development_fixture"
    || snapshot.authority_effect !== "none"
    || typeof snapshot.vault_id !== "string" || snapshot.vault_id.length === 0
    || typeof snapshot.root_lineage_id !== "string" || snapshot.root_lineage_id.length === 0
    || !Number.isSafeInteger(snapshot.transfer_generation) || snapshot.transfer_generation < 1
    || snapshot.transfer_state !== "source_retired_restore_once"
    || typeof snapshot.exported_at !== "string" || !task2IsRfc3339(snapshot.exported_at)
    || snapshot.state_encoding !== "base64-canonical-dag-json-utf8"
    || typeof snapshot.state_bytes_base64 !== "string"
    || !Number.isSafeInteger(snapshot.state_byte_count) || snapshot.state_byte_count < 1
    || !DIGEST.test(snapshot.state_digest)
    || !DIGEST.test(snapshot.snapshot_digest)) fail("task6_snapshot_invalid");
  let stateBytes: Buffer;
  let parsedDag: unknown;
  let parsed: unknown;
  try {
    stateBytes = Buffer.from(snapshot.state_bytes_base64, "base64");
    if (stateBytes.toString("base64") !== snapshot.state_bytes_base64) {
      fail("task6_snapshot_invalid");
    }
    parsedDag = JSON.parse(stateBytes.toString("utf8"));
    if (canonicalJson(parsedDag) !== stateBytes.toString("utf8")) {
      fail("task6_snapshot_invalid");
    }
    parsed = decodeCanonicalDag(parsedDag as CanonicalDag);
  } catch {
    return fail("task6_snapshot_invalid");
  }
  if (stateBytes.byteLength !== snapshot.state_byte_count
    || sha256Utf8(stateBytes.toString("utf8")) !== snapshot.state_digest) {
    fail("task6_snapshot_invalid");
  }
  closedGraph(parsed);
  exactKeys(parsed as Record<string, unknown>, [
    "contract_version", "root_lineage_id", "transfer_generation", "operation_occurrences",
    "handles", "attempts", "shadow_runs", "streams", "transition_receipts",
  ]);
  const state = parsed as SerializedVaultState;
  if (state.contract_version !== "contentmd.evaluation-simulator-state/0.1.0"
    || state.root_lineage_id !== snapshot.root_lineage_id
    || state.transfer_generation !== snapshot.transfer_generation
    || !Array.isArray(state.operation_occurrences)
    || !Array.isArray(state.handles)
    || !Array.isArray(state.attempts)
    || !Array.isArray(state.shadow_runs)
    || !Array.isArray(state.streams)
    || !Array.isArray(state.transition_receipts)) fail("task6_snapshot_invalid");
  if (snapshot.exported_at !== task6SerializedMaxEventTime(state)) fail("task6_snapshot_invalid");
  const expectedRoot = `evaluation_vault_lineage.${sha256Canonical({
    contract_version: "contentmd.evaluation-vault-root-lineage/0.1.0",
    vault_id: snapshot.vault_id,
  }).slice(0, 32)}`;
  const { snapshot_digest: _digest, ...envelope } = snapshot;
  if (snapshot.root_lineage_id !== expectedRoot
    || snapshot.snapshot_digest !== sha256Canonical(envelope)) fail("task6_snapshot_invalid");
  return state;
}

export function restoreEvaluationSimulatorVault(
  input: RestoreEvaluationSimulatorVaultInput,
): EvaluationSimulatorVault {
  try {
    modeGate(input, ["record_mode", "snapshot", "fault_rules"]);
    closedGraph(input);
    const state = validateSnapshot(input.snapshot);
    const faultRules = validateFaultRules(input.fault_rules);
    const snapshot = input.snapshot;
    const existing = lineages.get(snapshot.root_lineage_id);
    if (existing?.consumedSnapshots.has(snapshot.snapshot_digest)) {
      fail("task6_snapshot_already_restored");
    }
    if (existing?.active !== null && existing?.active !== undefined) {
      fail("task6_snapshot_lineage_fork");
    }
    if (existing !== undefined && (existing.status !== "awaiting_restore"
      || existing.pendingSnapshotDigest !== snapshot.snapshot_digest
      || existing.transferGeneration !== snapshot.transfer_generation)) {
      fail("task6_snapshot_lineage_fork");
    }
    const registry = existing ?? {
      active: null,
      status: "awaiting_restore" as const,
      pendingSnapshotDigest: snapshot.snapshot_digest,
      transferGeneration: snapshot.transfer_generation,
      consumedSnapshots: new Set<string>(),
    };
    const successor = newVault(
      snapshot.vault_id,
      snapshot.root_lineage_id,
      snapshot.transfer_generation,
      { serialized: structuredClone(state), faultRules },
    );
    registry.active = successor;
    registry.status = "active";
    registry.pendingSnapshotDigest = null;
    registry.consumedSnapshots.add(snapshot.snapshot_digest);
    lineages.set(snapshot.root_lineage_id, registry);
    return successor;
  } catch (error) {
    if (error instanceof Task6GovernanceError) throw error;
    return fail("task6_snapshot_invalid");
  }
}
