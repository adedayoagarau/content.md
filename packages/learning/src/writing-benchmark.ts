import { sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import { createHash } from "node:crypto";
import {
  providerRecordDigestValid,
  type ProviderExecutionAttemptClaim,
  type ProviderExecutionPlan,
  type ProviderReceipt,
} from "@contentmd/governance";
import { binary64ToHex, kahanSum } from "./numeric.js";
import {
  task4GraphemeClusters,
  task4NfcNormalize,
  verifyTask4UnicodeRuntime,
  type Task4UnicodeRuntime,
} from "./retrieval.js";
import type {
  ArtifactRef,
  BenchmarkAttemptRecord,
  BenchmarkCandidateSetRecord,
  CountEntry,
  DigestRef,
  RecordMode,
  ProviderOperationPlanEntry,
  WritingBenchmarkManifest,
  WritingBenchmarkTaskRecord,
} from "./records.js";

const BENCHMARK_ID = "LIL-WRITE-001" as const;
const PRODUCTS = [
  "commerce",
  "education",
  "finance",
  "health",
  "public-service",
  "transport",
] as const;
const SLOT_GRID = [
  ["strategy", "web", "en-US", "value-proposition"],
  ["strategy", "web", "en-GB", "category-positioning"],
  ["contextual_microcopy", "web", "en-US", "first-run"],
  ["contextual_microcopy", "web", "en-GB", "validation-error"],
  ["contextual_microcopy", "web", "en-US", "destructive-confirmation"],
  ["contextual_microcopy", "web", "en-GB", "empty-state"],
  ["contextual_microcopy", "web", "en-US", "recovery"],
  ["contextual_microcopy", "web", "en-GB", "permission-request"],
  ["contextual_microcopy", "notification", "en-US", "status-notification"],
  ["contextual_microcopy", "notification", "en-GB", "reminder-notification"],
] as const;

export type WritingBenchmarkErrorCode =
  | "input_shape"
  | "record_mode"
  | "digest"
  | "benchmark_identity"
  | "task_set_mismatch"
  | "grid_mismatch"
  | "manifest_count_mismatch"
  | "training_binding"
  | "training_overlap"
  | "candidate_bijection"
  | "candidate_chain_invalid"
  | "candidate_set_mismatch"
  | "no_eligible_candidate"
  | "attempt_invalid"
  | "attempt_plan_set_mismatch"
  | "attempt_already_claimed"
  | "attempt_state_invalid"
  | "attempt_terminal"
  | "attempt_time_invalid"
  | "bootstrap_population_invalid"
  | "bootstrap_invalid"
  | "unicode_runtime"
  | "review_invalid"
  | "adjudication_required";

export class WritingBenchmarkError extends Error {
  readonly code: WritingBenchmarkErrorCode;

  constructor(code: WritingBenchmarkErrorCode) {
    super(`writing_benchmark_invalid:${code}`);
    this.name = "WritingBenchmarkError";
    this.code = code;
  }
}

export interface WritingBenchmarkTrainingPartition {
  training_manifest_ref: DigestRef;
  pattern_family_ids: readonly string[];
  semantic_lineage_ids: readonly string[];
  template_ids: readonly string[];
  leakage_group_ids: readonly string[];
}

export interface VerifyWritingBenchmarkManifestInput {
  record_mode: RecordMode;
  manifest: WritingBenchmarkManifest;
  tasks: readonly WritingBenchmarkTaskRecord[];
  training_partition: WritingBenchmarkTrainingPartition;
}

export interface VerifiedWritingBenchmarkManifest {
  benchmark_id: typeof BENCHMARK_ID;
  task_count: 60;
  product_count: 6;
  domain_count: 6;
  held_out_family_count: 10;
  manifest: WritingBenchmarkManifest;
  tasks: readonly WritingBenchmarkTaskRecord[];
}

export interface BenchmarkGenerationControl {
  provider_id: string;
  provider_profile_ref: DigestRef;
  returned_model_id: string;
  prompt_template_ref: ArtifactRef;
  alternatives_count: 4;
  output_token_budget: 512;
}

export interface BenchmarkCandidateChain {
  task: WritingBenchmarkTaskRecord;
  plan: ProviderExecutionPlan;
  nonce_claim: ProviderExecutionAttemptClaim;
  provider_receipt: ProviderReceipt;
  candidate_set: BenchmarkCandidateSetRecord;
}

export interface VerifyBenchmarkCandidateControlsInput {
  record_mode: RecordMode;
  verified_manifest: VerifiedWritingBenchmarkManifest;
  generation_control: BenchmarkGenerationControl;
  chains: readonly BenchmarkCandidateChain[];
}

export interface VerifiedBenchmarkCandidateControls {
  benchmark_id: typeof BENCHMARK_ID;
  chain_count: 60;
  candidate_set_refs: readonly DigestRef[];
}

export interface BenchmarkCandidateEvaluation {
  candidate_id: string;
  expression_digest: string;
  score: number;
  hard_eligible: boolean;
  exclusions: readonly string[];
}

export interface SelectBenchmarkCandidateInput {
  record_mode: RecordMode;
  selection_path: "baseline" | "learned";
  candidate_set: BenchmarkCandidateSetRecord;
  evaluations: readonly BenchmarkCandidateEvaluation[];
}

export interface BenchmarkTieBreakTrace {
  applied: boolean;
  tied_expression_digests: readonly string[];
}

export interface BenchmarkCandidateSelection {
  selection_path: "baseline" | "learned";
  selected_candidate_id: string;
  selected_expression_digest: string;
  ordered_candidate_ids: readonly string[];
  evaluations: readonly BenchmarkCandidateEvaluation[];
  tie_break_trace: BenchmarkTieBreakTrace;
}

export interface VerifyBenchmarkAttemptDraftInput {
  record_mode: RecordMode;
  attempt: BenchmarkAttemptRecord;
  manifest_ref: DigestRef;
  expected_plan_set: readonly ProviderOperationPlanEntry[];
}

export interface VerifiedBenchmarkAttemptDraft {
  attempt_ref: DigestRef;
  manifest_ref: DigestRef;
  candidate_model_ref: DigestRef;
  provider_operation_plan_set_digest: string;
  plan_count: 60;
  ready_to_seal: true;
}

export interface BenchmarkAttemptSimulatorRegistry {
  readonly contract_version: "contentmd.benchmark-attempt-simulator-registry/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
}

export interface BenchmarkAttemptSimulatorVault {
  readonly contract_version: "contentmd.benchmark-attempt-simulator-vault/0.1.0";
  readonly record_mode: "development_fixture";
  readonly authority_effect: "none";
}

export interface BenchmarkAttemptSimulationState {
  attempt_ref: DigestRef;
  manifest_ref: DigestRef;
  candidate_model_ref: DigestRef;
  attempt_state: "draft" | "sealed" | "in_progress" | "interrupted" | "invalid_run" | "consumed";
  resume_count: number;
  event_count: number;
  state_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
  official_attempt_effect: "none";
}

export interface WritingBenchmarkBootstrapSeedMaterial {
  manifest_ref: DigestRef;
  attempt_ref: DigestRef;
  candidate_model_ref: DigestRef;
  baseline_ref: DigestRef;
  selection_set_digest: string;
  review_set_digest: string;
  metric_rule_digest: string;
  analysis_code_digest: string;
}

export interface WritingBenchmarkMetricPair {
  task_id: string;
  product_id: string;
  baseline_value: number;
  learned_value: number;
}

export interface RunWritingBenchmarkHierarchicalBootstrapInput {
  record_mode: RecordMode;
  metric_id: string;
  seed_material: WritingBenchmarkBootstrapSeedMaterial;
  pairs: readonly WritingBenchmarkMetricPair[];
}

export interface WritingBenchmarkBinary64 {
  value: number;
  bits: string;
}

export interface WritingBenchmarkHierarchicalBootstrapResult {
  contract_version: "contentmd.writing-benchmark-hierarchical-bootstrap/0.1.0";
  metric_id: string;
  seed_digest: string;
  product_order: typeof PRODUCTS;
  replicate_count: 10000;
  draw_algorithm: "sha256-counter-u64be-rejection-v1";
  interval_method: "nearest-rank-2.5-97.5";
  difference_interval: {
    lower: WritingBenchmarkBinary64;
    upper: WritingBenchmarkBinary64;
  };
  replicate_vector_digest: string;
  bootstrap_digest: string;
  record_mode: "development_fixture";
  authority_effect: "none";
}

export interface WritingBenchmarkInterval {
  lower: number;
  upper: number;
}

export interface EvaluateWritingBenchmarkQualityGateInput {
  record_mode: "development_fixture";
  valid_task_count: number;
  invalid_task_count: number;
  product_valid_counts: readonly { product_id: string; valid_count: number }[];
  additional_hard_failures: {
    truthfulness: number;
    behavioral_accuracy: number;
    deception: number;
    consent: number;
    accessibility: number;
    autonomy: number;
    safety: number;
    copying: number;
  };
  noninferiority_intervals: {
    recovery: WritingBenchmarkInterval;
    comprehension: WritingBenchmarkInterval;
    accessibility_quality: WritingBenchmarkInterval;
    voice_category_fit: WritingBenchmarkInterval;
    localization: WritingBenchmarkInterval;
  };
  accepted_edit_distance_difference: WritingBenchmarkInterval;
  review_time_ratio: WritingBenchmarkInterval;
  positive_utility: {
    blind_choice_probability: WritingBenchmarkInterval;
    accepted_edit_distance_difference: WritingBenchmarkInterval;
    task_recovery_score_difference: WritingBenchmarkInterval;
  };
}

export interface WritingBenchmarkQualityGateResult {
  quality_gate_passed: boolean;
  failed_predicate_ids: readonly string[];
  bounded_claim_status: "none" | "synthetic_noninferiority_plus_utility";
}

export interface NormalizedWritingBenchmarkEditDistanceInput {
  selected_expression: string;
  accepted_expression: string;
  unicode_runtime: Task4UnicodeRuntime;
}

export interface NormalizedWritingBenchmarkEditDistance {
  selected_cluster_count: number;
  accepted_cluster_count: number;
  edit_count: number;
  normalized_distance: number;
  normalized_distance_bits: string;
}

export interface WritingBenchmarkReviewObservation {
  reviewer_id: string;
  qualified: boolean;
  blinded: boolean;
  independent_from: readonly string[];
  hard_results: Readonly<Record<string, "pass" | "fail">>;
  advisory_scores: Readonly<Record<string, number>>;
  preference: "baseline" | "learned" | "tie" | "abstain";
}

export interface AnalyzeWritingBenchmarkTaskReviewInput {
  record_mode: "development_fixture";
  original_reviews: readonly [WritingBenchmarkReviewObservation, WritingBenchmarkReviewObservation];
  adjudication_review: WritingBenchmarkReviewObservation | null;
}

export interface WritingBenchmarkTaskReviewResult {
  review_state: "valid";
  adjudication_required: boolean;
  blind_preference: "baseline" | "learned" | "tie";
  decisive_review_count: number;
  original_review_count: 2;
}

export interface OriginalReviewEditDistance {
  normalized_distance: number;
  normalized_distance_bits: string;
}

export interface MeanOriginalReviewEditEffortInput {
  original_review_distances: readonly [OriginalReviewEditDistance, OriginalReviewEditDistance];
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function assertInputShape(input: unknown): asserts input is VerifyWritingBenchmarkManifestInput {
  if (!isObject(input)) {
    throw new WritingBenchmarkError("input_shape");
  }
  const keys = Object.keys(input).sort();
  if (keys.join("\n") !== ["manifest", "record_mode", "tasks", "training_partition"].join("\n")) {
    throw new WritingBenchmarkError("input_shape");
  }
  if ((input.record_mode !== "development_fixture" && input.record_mode !== "official") ||
      !isObject(input.manifest) || !Array.isArray(input.tasks) || !isObject(input.training_partition)) {
    throw new WritingBenchmarkError("input_shape");
  }
  const partition = input.training_partition;
  if (!isObject(partition.training_manifest_ref) ||
      !Array.isArray(partition.pattern_family_ids) ||
      !Array.isArray(partition.semantic_lineage_ids) ||
      !Array.isArray(partition.template_ids) ||
      !Array.isArray(partition.leakage_group_ids)) {
    throw new WritingBenchmarkError("input_shape");
  }
  for (const values of [
    partition.pattern_family_ids,
    partition.semantic_lineage_ids,
    partition.template_ids,
    partition.leakage_group_ids,
  ]) {
    if (values.some((value) => typeof value !== "string" || value.length === 0) ||
        new Set(values).size !== values.length) {
      throw new WritingBenchmarkError("input_shape");
    }
  }
}

function sameRef(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id &&
    left.schema_id === right.schema_id &&
    left.schema_version === right.schema_version &&
    left.content_digest === right.content_digest;
}

function sameArtifactRef(left: ArtifactRef, right: ArtifactRef): boolean {
  return left.artifact_id === right.artifact_id &&
    left.artifact_version === right.artifact_version &&
    left.artifact_digest === right.artifact_digest;
}

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): DigestRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

function planRef(plan: ProviderExecutionPlan): DigestRef {
  return {
    record_id: plan.plan_id,
    schema_id: plan.schema_version,
    schema_version: "0.1.0",
    content_digest: plan.plan_digest,
  };
}

function claimRef(claim: ProviderExecutionAttemptClaim): DigestRef {
  return {
    record_id: claim.event_id,
    schema_id: claim.schema_version,
    schema_version: "0.1.0",
    content_digest: claim.event_digest,
  };
}

function receiptRef(receipt: ProviderReceipt): DigestRef {
  return {
    record_id: receipt.receipt_id,
    schema_id: receipt.schema_version,
    schema_version: "0.1.0",
    content_digest: receipt.receipt_digest,
  };
}

function planDigestValid(plan: ProviderExecutionPlan): boolean {
  const { plan_id: receivedId, plan_digest: receivedDigest, ...withoutIdentity } = plan;
  const identityDigest = sha256Canonical({
    contract: "contentmd.provider-execution-plan-identity/0.1.0",
    ...withoutIdentity,
  });
  const expectedId = `provider-execution-plan.${identityDigest.slice(0, 32)}`;
  return receivedId === expectedId &&
    receivedDigest === sha256Canonical({ ...withoutIdentity, plan_id: receivedId });
}

function candidateSetPreimage(candidateSet: BenchmarkCandidateSetRecord): object {
  const payload = candidateSet.payload;
  return {
    contract: "contentmd.writing-benchmark-candidate-set/0.1.0",
    task_ref: payload.task_ref,
    provider_operation_plan_id: payload.provider_operation_plan_id,
    provider_operation_plan_digest: payload.provider_operation_plan_digest,
    nonce_claim_receipt_ref: payload.nonce_claim_receipt_ref,
    provider_receipt_ref: payload.provider_receipt_ref,
    provider_output_digest: payload.provider_output_digest,
    provider_profile_ref: payload.provider_profile_ref,
    returned_model_id: payload.returned_model_id,
    prompt_template_ref: payload.prompt_template_ref,
    context_ref: payload.context_ref,
    alternatives_count: payload.alternatives_count,
    output_token_budget: payload.output_token_budget,
    candidates: payload.candidates,
  };
}

function candidateSetSelfValid(candidateSet: BenchmarkCandidateSetRecord): boolean {
  const candidates = candidateSet.payload.candidates;
  return candidateSet.schema_id === "contentmd.benchmark-candidate-set-record" &&
    verifyRecordDigest(candidateSet).valid &&
    candidateSet.payload.candidate_set_digest === sha256Canonical(candidateSetPreimage(candidateSet)) &&
    candidateSet.payload.alternatives_count === 4 &&
    candidateSet.payload.output_token_budget === 512 &&
    candidateSet.payload.candidate_set_state === "completed_verified_nonquarantined" &&
    candidates.length === 4 &&
    candidates.every((candidate, index) => candidate.position === index &&
      typeof candidate.candidate_id === "string" && candidate.candidate_id.length > 0 &&
      /^[a-f0-9]{64}$/u.test(candidate.expression_digest)) &&
    new Set(candidates.map((candidate) => candidate.candidate_id)).size === 4 &&
    new Set(candidates.map((candidate) => candidate.expression_digest)).size === 4;
}

function countEntries(values: readonly string[]): CountEntry[] {
  const counts = new Map<string, number>();
  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts]
    .sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([key, count]) => ({ key, count }));
}

function sameCounts(actual: readonly CountEntry[], expected: readonly CountEntry[]): boolean {
  const normalized = (entries: readonly CountEntry[]) => entries
    .map(({ key, count }) => `${key}\u0000${count}`)
    .sort();
  return JSON.stringify(normalized(actual)) === JSON.stringify(normalized(expected));
}

function intersectionKey(task: WritingBenchmarkTaskRecord): string {
  return [
    task.payload.product_id,
    task.payload.domain,
    task.payload.channel,
    task.payload.locale,
    task.payload.task_type,
    task.payload.family_id,
  ].join("\u0000");
}

function verifyRecordDigests(
  manifest: WritingBenchmarkManifest,
  tasks: readonly WritingBenchmarkTaskRecord[],
): void {
  if (!verifyRecordDigest(manifest).valid || tasks.some((task) => !verifyRecordDigest(task).valid)) {
    throw new WritingBenchmarkError("digest");
  }
}

function verifyTaskSet(
  manifest: WritingBenchmarkManifest,
  tasks: readonly WritingBenchmarkTaskRecord[],
): void {
  if (tasks.length !== 60 || manifest.payload.task_refs.length !== 60) {
    throw new WritingBenchmarkError("task_set_mismatch");
  }
  const taskById = new Map(tasks.map((task) => [task.record_id, task]));
  if (taskById.size !== 60) {
    throw new WritingBenchmarkError("task_set_mismatch");
  }
  for (const ref of manifest.payload.task_refs) {
    const task = taskById.get(ref.record_id);
    if (task === undefined || !sameRef(ref, {
      record_id: task.record_id,
      schema_id: task.schema_id,
      schema_version: task.schema_version,
      content_digest: task.content_digest,
    })) {
      throw new WritingBenchmarkError("task_set_mismatch");
    }
  }
}

function verifyGrid(tasks: readonly WritingBenchmarkTaskRecord[]): void {
  const products = new Set(tasks.map((task) => task.payload.product_id));
  const domains = new Set(tasks.map((task) => task.payload.domain));
  if (JSON.stringify([...products].sort()) !== JSON.stringify(PRODUCTS) || domains.size !== 6) {
    throw new WritingBenchmarkError("grid_mismatch");
  }
  for (const product of PRODUCTS) {
    const productTasks = tasks.filter((task) => task.payload.product_id === product);
    if (productTasks.length !== 10 || new Set(productTasks.map((task) => task.payload.domain)).size !== 1) {
      throw new WritingBenchmarkError("grid_mismatch");
    }
    const observedSlots = productTasks.map((task) => [
      task.payload.task_type,
      task.payload.channel,
      task.payload.locale,
      task.payload.family_id,
    ].join("\u0000")).sort();
    const expectedSlots = SLOT_GRID.map((slot) => slot.join("\u0000")).sort();
    if (JSON.stringify(observedSlots) !== JSON.stringify(expectedSlots)) {
      throw new WritingBenchmarkError("grid_mismatch");
    }
  }
}

function verifyManifestCounts(
  manifest: WritingBenchmarkManifest,
  tasks: readonly WritingBenchmarkTaskRecord[],
): void {
  const payload = manifest.payload;
  const checks: readonly [readonly CountEntry[], readonly string[]][] = [
    [payload.product_counts, tasks.map((task) => task.payload.product_id)],
    [payload.domain_counts, tasks.map((task) => task.payload.domain)],
    [payload.channel_counts, tasks.map((task) => task.payload.channel)],
    [payload.locale_counts, tasks.map((task) => task.payload.locale)],
    [payload.task_type_counts, tasks.map((task) => task.payload.task_type)],
    [payload.family_counts, tasks.map((task) => task.payload.family_id)],
  ];
  if (checks.some(([actual, values]) => !sameCounts(actual, countEntries(values)))) {
    throw new WritingBenchmarkError("manifest_count_mismatch");
  }
  const actualIntersections = payload.intersection_counts
    .map(({ keys, count }) => `${keys.join("\u0000")}\u0000${count}`)
    .sort();
  const expectedIntersections = tasks.map((task) => `${intersectionKey(task)}\u00001`).sort();
  if (JSON.stringify(actualIntersections) !== JSON.stringify(expectedIntersections)) {
    throw new WritingBenchmarkError("manifest_count_mismatch");
  }
}

function verifyTrainingDisjointness(
  manifest: WritingBenchmarkManifest,
  tasks: readonly WritingBenchmarkTaskRecord[],
  training: WritingBenchmarkTrainingPartition,
): void {
  if (!sameRef(manifest.payload.training_manifest_ref, training.training_manifest_ref)) {
    throw new WritingBenchmarkError("training_binding");
  }
  const overlaps = (
    benchmarkValues: readonly string[],
    trainingValues: readonly string[],
  ): boolean => {
    const benchmark = new Set(benchmarkValues);
    return trainingValues.some((value) => benchmark.has(value));
  };
  if (overlaps(tasks.map((task) => task.payload.family_id), training.pattern_family_ids) ||
      overlaps(tasks.flatMap((task) => task.payload.semantic_lineage_ids), training.semantic_lineage_ids) ||
      overlaps(tasks.flatMap((task) => task.payload.template_ids), training.template_ids) ||
      overlaps(tasks.flatMap((task) => task.payload.leakage_group_ids), training.leakage_group_ids)) {
    throw new WritingBenchmarkError("training_overlap");
  }
}

export function verifyWritingBenchmarkManifest(
  input: VerifyWritingBenchmarkManifestInput,
): VerifiedWritingBenchmarkManifest {
  assertInputShape(input);
  if (input.manifest.payload.record_mode !== input.record_mode ||
      input.tasks.some((task) => task.payload.record_mode !== input.record_mode)) {
    throw new WritingBenchmarkError("record_mode");
  }
  if (input.manifest.schema_id !== "contentmd.writing-benchmark-manifest" ||
      input.manifest.payload.benchmark_id !== BENCHMARK_ID ||
      input.tasks.some((task) => task.schema_id !== "contentmd.writing-benchmark-task-record" ||
        task.payload.benchmark_id !== BENCHMARK_ID)) {
    throw new WritingBenchmarkError("benchmark_identity");
  }
  verifyRecordDigests(input.manifest, input.tasks);
  verifyTaskSet(input.manifest, input.tasks);
  verifyGrid(input.tasks);
  verifyManifestCounts(input.manifest, input.tasks);
  verifyTrainingDisjointness(input.manifest, input.tasks, input.training_partition);

  return Object.freeze({
    benchmark_id: BENCHMARK_ID,
    task_count: 60,
    product_count: 6,
    domain_count: 6,
    held_out_family_count: 10,
    manifest: input.manifest,
    tasks: Object.freeze([...input.tasks]),
  });
}

function verifyCandidateChain(
  chain: BenchmarkCandidateChain,
  control: BenchmarkGenerationControl,
  recordMode: RecordMode,
): void {
  const { task, plan, nonce_claim: claim, provider_receipt: receipt, candidate_set: candidateSet } = chain;
  const payload = candidateSet.payload;
  const expectedNonceDigest = sha256Canonical({
    contract: "contentmd.provider-execution-nonce/0.1.0",
    nonce: plan.nonce,
  });
  if (task.payload.record_mode !== recordMode || payload.record_mode !== recordMode ||
      !verifyRecordDigest(task).valid || !planDigestValid(plan) ||
      !providerRecordDigestValid(receipt as unknown as Record<string, unknown>, "receipt_digest") ||
      !candidateSetSelfValid(candidateSet)) {
    throw new WritingBenchmarkError("candidate_chain_invalid");
  }
  if (plan.task_id !== task.record_id || plan.project_id !== task.scope.project_id ||
      plan.provider_id !== control.provider_id || plan.model_id !== control.returned_model_id ||
      plan.maximum_attempts !== 1 || plan.authority_effect !== "none" ||
      plan.resource_limits.calls !== 1 || plan.resource_limits.attempts !== 1 ||
      plan.resource_limits.retries !== 0 ||
      plan.resource_limits.output_tokens !== control.output_token_budget ||
      !sameRef(plan.model_profile_ref as DigestRef, control.provider_profile_ref) ||
      plan.prompt_template.template_id !== control.prompt_template_ref.artifact_id ||
      plan.prompt_template.template_version !== control.prompt_template_ref.artifact_version ||
      plan.prompt_template.template_digest !== control.prompt_template_ref.artifact_digest ||
      !sameRef(plan.context_packet_ref as DigestRef, task.payload.context_evidence_ref)) {
    throw new WritingBenchmarkError("candidate_chain_invalid");
  }
  if (claim.schema_version !== "contentmd.provider-execution-attempt-claim/0.1.0" ||
      claim.disposition !== "claimed" || claim.sequence !== 1 || claim.authority_effect !== "none" ||
      claim.stream_id !== plan.attempt_ledger_stream_id ||
      claim.nonce_digest !== expectedNonceDigest || !sameRef(claim.plan_ref as DigestRef, planRef(plan))) {
    throw new WritingBenchmarkError("candidate_chain_invalid");
  }
  if (receipt.schema_version !== "contentmd.provider-receipt/0.1.0" ||
      receipt.outcome_state !== "completed" || receipt.authority_effect !== "none" ||
      receipt.provider_id !== control.provider_id ||
      receipt.request_id !== plan.request_id ||
      receipt.requested_model_id !== plan.model_id ||
      receipt.returned_model_id !== control.returned_model_id ||
      receipt.provider_output_digest === null ||
      !sameRef(receipt.plan_ref as DigestRef, planRef(plan)) ||
      !sameRef(receipt.attempt_claim_ref as DigestRef, claimRef(claim))) {
    throw new WritingBenchmarkError("candidate_chain_invalid");
  }
  if (!sameRef(payload.task_ref, recordRef(task)) ||
      payload.provider_operation_plan_id !== plan.plan_id ||
      payload.provider_operation_plan_digest !== plan.plan_digest ||
      !sameRef(payload.nonce_claim_receipt_ref, claimRef(claim)) ||
      !sameRef(payload.provider_receipt_ref, receiptRef(receipt)) ||
      payload.provider_output_digest !== receipt.provider_output_digest ||
      !sameRef(payload.provider_profile_ref, control.provider_profile_ref) ||
      payload.returned_model_id !== control.returned_model_id ||
      !sameArtifactRef(payload.prompt_template_ref, control.prompt_template_ref) ||
      !sameRef(payload.context_ref, task.payload.context_evidence_ref) ||
      payload.alternatives_count !== control.alternatives_count ||
      payload.output_token_budget !== control.output_token_budget) {
    throw new WritingBenchmarkError("candidate_chain_invalid");
  }
}

export function verifyBenchmarkCandidateControls(
  input: VerifyBenchmarkCandidateControlsInput,
): VerifiedBenchmarkCandidateControls {
  if (!isObject(input) || input.record_mode !== input.verified_manifest.manifest.payload.record_mode ||
      input.verified_manifest.benchmark_id !== BENCHMARK_ID || input.verified_manifest.task_count !== 60 ||
      !Array.isArray(input.chains) || input.chains.length !== 60) {
    throw new WritingBenchmarkError("candidate_bijection");
  }
  const taskById = new Map(input.verified_manifest.tasks.map((task) => [task.record_id, task]));
  const observedTaskIds = new Set<string>();
  const uniqueDimensions = [
    new Set<string>(), new Set<string>(), new Set<string>(),
    new Set<string>(), new Set<string>(), new Set<string>(),
  ];
  const candidateSetRefs: DigestRef[] = [];
  for (const chain of input.chains) {
    const expectedTask = taskById.get(chain.task.record_id);
    if (expectedTask === undefined || !sameRef(recordRef(chain.task), recordRef(expectedTask)) ||
        observedTaskIds.has(chain.task.record_id)) {
      throw new WritingBenchmarkError("candidate_bijection");
    }
    observedTaskIds.add(chain.task.record_id);
    verifyCandidateChain(chain, input.generation_control, input.record_mode);
    const dimensions = [
      chain.plan.plan_id,
      chain.plan.nonce,
      chain.nonce_claim.event_id,
      chain.nonce_claim.event_digest,
      chain.provider_receipt.receipt_id,
      chain.candidate_set.record_id,
    ];
    dimensions.forEach((value, index) => {
      const dimensionSet = uniqueDimensions[index];
      if (dimensionSet === undefined || dimensionSet.has(value)) {
        throw new WritingBenchmarkError("candidate_bijection");
      }
      dimensionSet.add(value);
    });
    candidateSetRefs.push(recordRef(chain.candidate_set));
  }
  if (observedTaskIds.size !== 60 ||
      input.verified_manifest.tasks.some((task) => !observedTaskIds.has(task.record_id))) {
    throw new WritingBenchmarkError("candidate_bijection");
  }
  return Object.freeze({
    benchmark_id: BENCHMARK_ID,
    chain_count: 60,
    candidate_set_refs: Object.freeze(candidateSetRefs.map((ref) => Object.freeze({ ...ref }))),
  });
}

export function selectBenchmarkCandidate(
  input: SelectBenchmarkCandidateInput,
): BenchmarkCandidateSelection {
  if (!isObject(input) ||
      (input.record_mode !== "development_fixture" && input.record_mode !== "official") ||
      (input.selection_path !== "baseline" && input.selection_path !== "learned") ||
      !isObject(input.candidate_set) || !Array.isArray(input.evaluations)) {
    throw new WritingBenchmarkError("input_shape");
  }
  if (input.candidate_set.payload.record_mode !== input.record_mode ||
      !candidateSetSelfValid(input.candidate_set) || input.evaluations.length !== 4) {
    throw new WritingBenchmarkError("candidate_set_mismatch");
  }
  const candidateById = new Map(input.candidate_set.payload.candidates.map((candidate) => [
    candidate.candidate_id,
    candidate,
  ]));
  const seen = new Set<string>();
  for (const evaluation of input.evaluations) {
    const candidate = candidateById.get(evaluation.candidate_id);
    if (candidate === undefined || seen.has(evaluation.candidate_id) ||
        evaluation.expression_digest !== candidate.expression_digest ||
        typeof evaluation.score !== "number" || !Number.isFinite(evaluation.score) ||
        typeof evaluation.hard_eligible !== "boolean" || !Array.isArray(evaluation.exclusions) ||
        evaluation.exclusions.some((value: unknown) => typeof value !== "string" || value.length === 0) ||
        (evaluation.hard_eligible ? evaluation.exclusions.length !== 0 : evaluation.exclusions.length === 0)) {
      throw new WritingBenchmarkError("candidate_set_mismatch");
    }
    seen.add(evaluation.candidate_id);
  }
  if (seen.size !== 4) {
    throw new WritingBenchmarkError("candidate_set_mismatch");
  }
  const eligible = input.evaluations
    .filter((evaluation) => evaluation.hard_eligible)
    .map((evaluation) => ({
      ...evaluation,
      exclusions: Object.freeze([...evaluation.exclusions]),
    }))
    .sort((left, right) => right.score - left.score ||
      left.expression_digest.localeCompare(right.expression_digest, "en"));
  if (eligible.length === 0) {
    throw new WritingBenchmarkError("no_eligible_candidate");
  }
  const topScore = eligible[0].score;
  const tiedExpressionDigests = eligible
    .filter((evaluation) => evaluation.score === topScore)
    .map((evaluation) => evaluation.expression_digest)
    .sort();
  return Object.freeze({
    selection_path: input.selection_path,
    selected_candidate_id: eligible[0].candidate_id,
    selected_expression_digest: eligible[0].expression_digest,
    ordered_candidate_ids: Object.freeze(eligible.map((evaluation) => evaluation.candidate_id)),
    evaluations: Object.freeze(eligible.map((evaluation) => Object.freeze(evaluation))),
    tie_break_trace: Object.freeze({
      applied: tiedExpressionDigests.length > 1,
      tied_expression_digests: Object.freeze(tiedExpressionDigests),
    }),
  });
}

function planSetDigest(entries: readonly ProviderOperationPlanEntry[]): string {
  return sha256Canonical({
    contract: "contentmd.benchmark-provider-operation-plan-set/0.1.0",
    entries,
  });
}

function samePlanEntry(
  left: ProviderOperationPlanEntry,
  right: ProviderOperationPlanEntry,
): boolean {
  return left.task_id === right.task_id &&
    left.plan_id === right.plan_id &&
    left.plan_digest === right.plan_digest;
}

export function verifyBenchmarkAttemptDraft(
  input: VerifyBenchmarkAttemptDraftInput,
): VerifiedBenchmarkAttemptDraft {
  if (!isObject(input) ||
      (input.record_mode !== "development_fixture" && input.record_mode !== "official") ||
      !isObject(input.attempt) || !isObject(input.manifest_ref) ||
      !Array.isArray(input.expected_plan_set)) {
    throw new WritingBenchmarkError("input_shape");
  }
  const attempt = input.attempt;
  const payload = attempt.payload;
  if (attempt.schema_id !== "contentmd.benchmark-attempt-record" ||
      payload.record_mode !== input.record_mode || payload.authority_effect !== "none" ||
      payload.attempt_state !== "draft" || payload.sealed_at !== null ||
      payload.readback_receipt_ref !== null || payload.resume_count !== 0 ||
      payload.consumed_at !== null || payload.consumption_reason !== null ||
      !verifyRecordDigest(attempt).valid || !sameRef(payload.manifest_ref, input.manifest_ref)) {
    throw new WritingBenchmarkError("attempt_invalid");
  }
  const entries = payload.provider_operation_plan_set;
  if (entries.length !== 60 || input.expected_plan_set.length !== 60 ||
      payload.provider_operation_plan_set_digest !== planSetDigest(entries) ||
      new Set(entries.map((entry) => entry.task_id)).size !== 60 ||
      new Set(entries.map((entry) => entry.plan_id)).size !== 60 ||
      new Set(entries.map((entry) => entry.plan_digest)).size !== 60 ||
      entries.some((entry, index) => {
        const expected = input.expected_plan_set[index];
        return expected === undefined || !samePlanEntry(entry, expected);
      })) {
    throw new WritingBenchmarkError("attempt_plan_set_mismatch");
  }
  const verified = Object.freeze({
    attempt_ref: Object.freeze(recordRef(attempt)),
    manifest_ref: Object.freeze({ ...payload.manifest_ref }),
    candidate_model_ref: Object.freeze({ ...payload.candidate_model_ref }),
    provider_operation_plan_set_digest: payload.provider_operation_plan_set_digest,
    plan_count: 60,
    ready_to_seal: true,
  });
  verifiedAttemptDrafts.add(verified);
  return verified;
}

interface BenchmarkAttemptEvent {
  sequence: number;
  transition: "sealed" | "interrupted" | "resumed" | "invalid_run" | "consumed";
  occurred_at: string;
  evidence_ref: DigestRef | null;
  event_digest: string;
}

interface BenchmarkRegistryState {
  claimedAttemptKeys: Set<string>;
}

interface BenchmarkVaultState {
  registry: BenchmarkAttemptSimulatorRegistry;
  verifiedDraft: VerifiedBenchmarkAttemptDraft;
  attemptKey: string;
  attemptState: BenchmarkAttemptSimulationState["attempt_state"];
  resumeCount: number;
  lastOccurredAt: string | null;
  events: BenchmarkAttemptEvent[];
}

const verifiedAttemptDrafts = new WeakSet<object>();
const benchmarkRegistries = new WeakMap<object, BenchmarkRegistryState>();
const benchmarkVaults = new WeakMap<object, BenchmarkVaultState>();

function digestRefShapeValid(value: unknown): value is DigestRef {
  return isObject(value) && typeof value.record_id === "string" && value.record_id.length > 0 &&
    typeof value.schema_id === "string" && value.schema_id.length > 0 &&
    value.schema_version === "0.1.0" &&
    typeof value.content_digest === "string" && /^[a-f0-9]{64}$/u.test(value.content_digest);
}

function timestamp(value: string, previous: string | null): void {
  const parsed = Date.parse(value);
  if (!Number.isFinite(parsed) || (previous !== null && parsed < Date.parse(previous))) {
    throw new WritingBenchmarkError("attempt_time_invalid");
  }
}

function vaultState(vault: BenchmarkAttemptSimulatorVault): BenchmarkVaultState {
  const state = benchmarkVaults.get(vault);
  if (state === undefined) throw new WritingBenchmarkError("input_shape");
  return state;
}

function appendAttemptEvent(
  state: BenchmarkVaultState,
  transition: BenchmarkAttemptEvent["transition"],
  occurredAt: string,
  evidenceRef: DigestRef | null,
): void {
  timestamp(occurredAt, state.lastOccurredAt);
  const sequence = state.events.length + 1;
  const eventWithoutDigest = {
    sequence,
    transition,
    occurred_at: occurredAt,
    evidence_ref: evidenceRef === null ? null : { ...evidenceRef },
    previous_event_digest: state.events.at(-1)?.event_digest ?? null,
    attempt_key: state.attemptKey,
  };
  state.events.push(Object.freeze({
    sequence,
    transition,
    occurred_at: occurredAt,
    evidence_ref: evidenceRef === null ? null : Object.freeze({ ...evidenceRef }),
    event_digest: sha256Canonical(eventWithoutDigest),
  }));
  state.lastOccurredAt = occurredAt;
}

export function createBenchmarkAttemptSimulatorRegistry(): BenchmarkAttemptSimulatorRegistry {
  const registry = Object.freeze({
    contract_version: "contentmd.benchmark-attempt-simulator-registry/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  });
  benchmarkRegistries.set(registry, { claimedAttemptKeys: new Set() });
  return registry;
}

export function createBenchmarkAttemptSimulatorVault(input: {
  registry: BenchmarkAttemptSimulatorRegistry;
  verified_draft: VerifiedBenchmarkAttemptDraft;
}): BenchmarkAttemptSimulatorVault {
  const registryState = benchmarkRegistries.get(input.registry);
  if (registryState === undefined || !verifiedAttemptDrafts.has(input.verified_draft) ||
      input.verified_draft.ready_to_seal !== true) {
    throw new WritingBenchmarkError("input_shape");
  }
  const vault = Object.freeze({
    contract_version: "contentmd.benchmark-attempt-simulator-vault/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  });
  const attemptKey = sha256Canonical({
    contract: "contentmd.benchmark-attempt-key/0.1.0",
    manifest_ref: input.verified_draft.manifest_ref,
    candidate_model_ref: input.verified_draft.candidate_model_ref,
  });
  benchmarkVaults.set(vault, {
    registry: input.registry,
    verifiedDraft: input.verified_draft,
    attemptKey,
    attemptState: "draft",
    resumeCount: 0,
    lastOccurredAt: null,
    events: [],
  });
  return vault;
}

export function inspectBenchmarkAttemptSimulation(
  vault: BenchmarkAttemptSimulatorVault,
): BenchmarkAttemptSimulationState {
  const state = vaultState(vault);
  return Object.freeze({
    attempt_ref: Object.freeze({ ...state.verifiedDraft.attempt_ref }),
    manifest_ref: Object.freeze({ ...state.verifiedDraft.manifest_ref }),
    candidate_model_ref: Object.freeze({ ...state.verifiedDraft.candidate_model_ref }),
    attempt_state: state.attemptState,
    resume_count: state.resumeCount,
    event_count: state.events.length,
    state_digest: sha256Canonical({
      contract: "contentmd.benchmark-attempt-simulation-state/0.1.0",
      attempt_key: state.attemptKey,
      attempt_state: state.attemptState,
      resume_count: state.resumeCount,
      events: state.events,
    }),
    record_mode: "development_fixture",
    authority_effect: "none",
    official_attempt_effect: "none",
  });
}

export function sealBenchmarkAttemptSimulation(input: {
  vault: BenchmarkAttemptSimulatorVault;
  sealed_at: string;
  readback_receipt_ref: DigestRef;
}): BenchmarkAttemptSimulationState {
  const state = vaultState(input.vault);
  if (state.attemptState !== "draft") throw new WritingBenchmarkError("attempt_state_invalid");
  if (!digestRefShapeValid(input.readback_receipt_ref)) throw new WritingBenchmarkError("attempt_invalid");
  const registry = benchmarkRegistries.get(state.registry)!;
  if (registry.claimedAttemptKeys.has(state.attemptKey)) {
    throw new WritingBenchmarkError("attempt_already_claimed");
  }
  timestamp(input.sealed_at, state.lastOccurredAt);
  registry.claimedAttemptKeys.add(state.attemptKey);
  state.attemptState = "sealed";
  appendAttemptEvent(state, "sealed", input.sealed_at, input.readback_receipt_ref);
  return inspectBenchmarkAttemptSimulation(input.vault);
}

export function interruptBenchmarkAttemptSimulation(input: {
  vault: BenchmarkAttemptSimulatorVault;
  interrupted_at: string;
}): BenchmarkAttemptSimulationState {
  const state = vaultState(input.vault);
  if (state.attemptState !== "sealed" && state.attemptState !== "in_progress") {
    if (state.attemptState === "invalid_run" || state.attemptState === "consumed") {
      throw new WritingBenchmarkError("attempt_terminal");
    }
    throw new WritingBenchmarkError("attempt_state_invalid");
  }
  state.attemptState = "interrupted";
  appendAttemptEvent(state, "interrupted", input.interrupted_at, null);
  return inspectBenchmarkAttemptSimulation(input.vault);
}

export function resumeBenchmarkAttemptSimulation(input: {
  vault: BenchmarkAttemptSimulatorVault;
  resumed_at: string;
}): BenchmarkAttemptSimulationState {
  const state = vaultState(input.vault);
  if (state.attemptState === "invalid_run" || state.attemptState === "consumed") {
    throw new WritingBenchmarkError("attempt_terminal");
  }
  if (state.attemptState !== "interrupted") throw new WritingBenchmarkError("attempt_state_invalid");
  state.attemptState = "in_progress";
  state.resumeCount += 1;
  appendAttemptEvent(state, "resumed", input.resumed_at, null);
  return inspectBenchmarkAttemptSimulation(input.vault);
}

export function consumeBenchmarkAttemptSimulation(input: {
  vault: BenchmarkAttemptSimulatorVault;
  consumed_at: string;
  reason: "invalid_run" | "quality_gate_opened";
}): BenchmarkAttemptSimulationState {
  const state = vaultState(input.vault);
  if (state.attemptState === "invalid_run" || state.attemptState === "consumed") {
    throw new WritingBenchmarkError("attempt_terminal");
  }
  if (state.attemptState === "draft") throw new WritingBenchmarkError("attempt_state_invalid");
  if (input.reason !== "invalid_run" && input.reason !== "quality_gate_opened") {
    throw new WritingBenchmarkError("attempt_invalid");
  }
  state.attemptState = input.reason === "invalid_run" ? "invalid_run" : "consumed";
  appendAttemptEvent(state, state.attemptState, input.consumed_at, null);
  return inspectBenchmarkAttemptSimulation(input.vault);
}

function uint64be(value: bigint): Buffer {
  const bytes = Buffer.alloc(8);
  bytes.writeBigUInt64BE(value);
  return bytes;
}

function benchmarkReplicateDraws(
  seedDigest: string,
  metricId: string,
  replicate: number,
  requested: readonly number[],
): number[] {
  const values: number[] = [];
  let counter = 0n;
  let block = Buffer.alloc(0);
  let offset = 0;
  for (const upper of requested) {
    const bigUpper = BigInt(upper);
    const limit = ((1n << 64n) / bigUpper) * bigUpper;
    while (true) {
      if (offset + 8 > block.length) {
        block = createHash("sha256").update(Buffer.concat([
          Buffer.from("contentmd.writing-benchmark-bootstrap-counter/0.1.0", "utf8"),
          Buffer.from([0]),
          Buffer.from(seedDigest, "hex"),
          Buffer.from([0]),
          Buffer.from(metricId, "utf8"),
          Buffer.from([0]),
          uint64be(BigInt(replicate)),
          uint64be(counter),
        ])).digest();
        counter += 1n;
        offset = 0;
      }
      const raw = block.readBigUInt64BE(offset);
      offset += 8;
      if (raw < limit) {
        values.push(Number(raw % bigUpper));
        break;
      }
    }
  }
  return values;
}

function benchmarkBinary(value: number): WritingBenchmarkBinary64 {
  const canonical = value === 0 ? 0 : value;
  if (!Number.isFinite(canonical)) throw new WritingBenchmarkError("bootstrap_invalid");
  return Object.freeze({ value: canonical, bits: binary64ToHex(canonical) });
}

function verifyBootstrapSeedMaterial(material: WritingBenchmarkBootstrapSeedMaterial): void {
  if (!isObject(material) ||
      !digestRefShapeValid(material.manifest_ref) ||
      !digestRefShapeValid(material.attempt_ref) ||
      !digestRefShapeValid(material.candidate_model_ref) ||
      !digestRefShapeValid(material.baseline_ref) ||
      !/^[a-f0-9]{64}$/u.test(material.selection_set_digest) ||
      !/^[a-f0-9]{64}$/u.test(material.review_set_digest) ||
      !/^[a-f0-9]{64}$/u.test(material.metric_rule_digest) ||
      !/^[a-f0-9]{64}$/u.test(material.analysis_code_digest)) {
    throw new WritingBenchmarkError("bootstrap_invalid");
  }
}

function verifyBootstrapPopulation(pairs: readonly WritingBenchmarkMetricPair[]): Map<string, WritingBenchmarkMetricPair[]> {
  if (!Array.isArray(pairs) || pairs.length !== 60) {
    throw new WritingBenchmarkError("bootstrap_population_invalid");
  }
  const byProduct = new Map(PRODUCTS.map((product) => [product, [] as WritingBenchmarkMetricPair[]]));
  const taskIds = new Set<string>();
  for (const pair of pairs) {
    const productPairs = byProduct.get(pair.product_id as (typeof PRODUCTS)[number]);
    if (productPairs === undefined || typeof pair.task_id !== "string" || pair.task_id.length === 0 ||
        taskIds.has(pair.task_id) || typeof pair.baseline_value !== "number" ||
        !Number.isFinite(pair.baseline_value) || typeof pair.learned_value !== "number" ||
        !Number.isFinite(pair.learned_value)) {
      throw new WritingBenchmarkError("bootstrap_population_invalid");
    }
    taskIds.add(pair.task_id);
    productPairs.push(pair);
  }
  for (const product of PRODUCTS) {
    const productPairs = byProduct.get(product)!;
    productPairs.sort((left, right) => left.task_id.localeCompare(right.task_id, "en"));
    if (productPairs.length !== 10) throw new WritingBenchmarkError("bootstrap_population_invalid");
  }
  return byProduct;
}

export function runWritingBenchmarkHierarchicalBootstrap(
  input: RunWritingBenchmarkHierarchicalBootstrapInput,
): WritingBenchmarkHierarchicalBootstrapResult {
  if (!isObject(input) || input.record_mode !== "development_fixture" ||
      typeof input.metric_id !== "string" || input.metric_id.length === 0) {
    throw new WritingBenchmarkError("bootstrap_invalid");
  }
  verifyBootstrapSeedMaterial(input.seed_material);
  const byProduct = verifyBootstrapPopulation(input.pairs);
  const seedDigest = sha256Canonical({
    contract: "contentmd.writing-benchmark-bootstrap-seed/0.1.0",
    metric_id: input.metric_id,
    ...input.seed_material,
  });
  const replicates: number[] = [];
  const requestedDraws = [
    ...Array.from({ length: 6 }, () => 6),
    ...Array.from({ length: 60 }, () => 10),
  ];
  for (let replicate = 0; replicate < 10_000; replicate += 1) {
    const draws = benchmarkReplicateDraws(seedDigest, input.metric_id, replicate, requestedDraws);
    const sampledDifferences: number[] = [];
    for (let productDraw = 0; productDraw < 6; productDraw += 1) {
      const product = PRODUCTS[draws[productDraw]!]!;
      const productPairs = byProduct.get(product)!;
      for (let taskDraw = 0; taskDraw < 10; taskDraw += 1) {
        const pair = productPairs[draws[6 + productDraw * 10 + taskDraw]!]!;
        const difference = pair.learned_value - pair.baseline_value;
        sampledDifferences.push(difference === 0 ? 0 : difference);
      }
    }
    const mean = kahanSum(sampledDifferences) / 60;
    replicates.push(mean === 0 ? 0 : mean);
  }
  const sorted = [...replicates].sort((left, right) => left - right);
  const differenceInterval = Object.freeze({
    lower: benchmarkBinary(sorted[249]!),
    upper: benchmarkBinary(sorted[9749]!),
  });
  const replicateVectorDigest = sha256Canonical({
    contract: "contentmd.writing-benchmark-bootstrap-replicate-vector/0.1.0",
    metric_id: input.metric_id,
    difference_bits: replicates.map(binary64ToHex),
  });
  const preimage = {
    contract_version: "contentmd.writing-benchmark-hierarchical-bootstrap/0.1.0" as const,
    metric_id: input.metric_id,
    seed_digest: seedDigest,
    product_order: PRODUCTS,
    replicate_count: 10_000 as const,
    draw_algorithm: "sha256-counter-u64be-rejection-v1" as const,
    interval_method: "nearest-rank-2.5-97.5" as const,
    difference_interval: differenceInterval,
    replicate_vector_digest: replicateVectorDigest,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
  };
  return Object.freeze({
    ...preimage,
    bootstrap_digest: sha256Canonical(preimage),
  });
}

function intervalShape(value: unknown): value is WritingBenchmarkInterval {
  return isObject(value) && typeof value.lower === "number" && Number.isFinite(value.lower) &&
    typeof value.upper === "number" && Number.isFinite(value.upper) && value.lower <= value.upper;
}

export function evaluateWritingBenchmarkQualityGate(
  input: EvaluateWritingBenchmarkQualityGateInput,
): WritingBenchmarkQualityGateResult {
  if (!isObject(input) || input.record_mode !== "development_fixture" ||
      !Number.isSafeInteger(input.valid_task_count) || input.valid_task_count < 0 ||
      !Number.isSafeInteger(input.invalid_task_count) || input.invalid_task_count < 0 ||
      !Array.isArray(input.product_valid_counts) || !isObject(input.additional_hard_failures) ||
      !isObject(input.noninferiority_intervals) || !isObject(input.positive_utility) ||
      !intervalShape(input.accepted_edit_distance_difference) ||
      !intervalShape(input.review_time_ratio)) {
    throw new WritingBenchmarkError("bootstrap_invalid");
  }
  const metricIntervals = Object.values(input.noninferiority_intervals);
  const utilityIntervals = Object.values(input.positive_utility);
  if (metricIntervals.length !== 5 || metricIntervals.some((interval) => !intervalShape(interval)) ||
      utilityIntervals.length !== 3 || utilityIntervals.some((interval) => !intervalShape(interval))) {
    throw new WritingBenchmarkError("bootstrap_invalid");
  }
  const hardFailureValues = Object.values(input.additional_hard_failures);
  if (hardFailureValues.length !== 8 || hardFailureValues.some((value) =>
    !Number.isSafeInteger(value) || value < 0)) {
    throw new WritingBenchmarkError("bootstrap_invalid");
  }
  const productCounts = new Map(input.product_valid_counts.map(({ product_id, valid_count }) => [
    product_id,
    valid_count,
  ]));
  const completePopulation = input.valid_task_count === 60 && input.invalid_task_count === 0 &&
    input.product_valid_counts.length === 6 && productCounts.size === 6 &&
    PRODUCTS.every((product) => productCounts.get(product) === 10);
  const predicates = [
    ["complete_population", completePopulation],
    ["zero_additional_hard_failures", hardFailureValues.every((value) => value === 0)],
    ["metric_noninferiority", metricIntervals.every((interval) => interval.lower >= -0.10)],
    ["edit_effort_noninferiority", input.accepted_edit_distance_difference.upper <= 0.02],
    ["review_time_noninferiority", input.review_time_ratio.upper <= 1.10],
    ["positive_utility",
      input.positive_utility.blind_choice_probability.lower > 0.50 ||
      input.positive_utility.accepted_edit_distance_difference.upper < 0 ||
      input.positive_utility.task_recovery_score_difference.lower > 0],
  ] as const;
  const failedPredicateIds = predicates
    .filter(([, passed]) => !passed)
    .map(([predicateId]) => predicateId);
  const passed = failedPredicateIds.length === 0;
  return Object.freeze({
    quality_gate_passed: passed,
    failed_predicate_ids: Object.freeze(failedPredicateIds),
    bounded_claim_status: passed ? "synthetic_noninferiority_plus_utility" : "none",
  });
}

function graphemeLevenshtein(
  selected: readonly string[],
  accepted: readonly string[],
): number {
  let previous = Array.from({ length: accepted.length + 1 }, (_, index) => index);
  for (let selectedIndex = 1; selectedIndex <= selected.length; selectedIndex += 1) {
    const current = [selectedIndex];
    for (let acceptedIndex = 1; acceptedIndex <= accepted.length; acceptedIndex += 1) {
      const substitutionCost = selected[selectedIndex - 1] === accepted[acceptedIndex - 1] ? 0 : 1;
      current[acceptedIndex] = Math.min(
        current[acceptedIndex - 1]! + 1,
        previous[acceptedIndex]! + 1,
        previous[acceptedIndex - 1]! + substitutionCost,
      );
    }
    previous = current;
  }
  return previous[accepted.length]!;
}

export function normalizedWritingBenchmarkEditDistance(
  input: NormalizedWritingBenchmarkEditDistanceInput,
): NormalizedWritingBenchmarkEditDistance {
  if (!isObject(input) || typeof input.selected_expression !== "string" ||
      typeof input.accepted_expression !== "string" || !isObject(input.unicode_runtime)) {
    throw new WritingBenchmarkError("input_shape");
  }
  try {
    verifyTask4UnicodeRuntime(input.unicode_runtime);
    const selectedNormalized = task4NfcNormalize(
      input.selected_expression.replace(/\r\n?/gu, "\n"),
      input.unicode_runtime,
    );
    const acceptedNormalized = task4NfcNormalize(
      input.accepted_expression.replace(/\r\n?/gu, "\n"),
      input.unicode_runtime,
    );
    const selectedClusters = task4GraphemeClusters(selectedNormalized, input.unicode_runtime);
    const acceptedClusters = task4GraphemeClusters(acceptedNormalized, input.unicode_runtime);
    const editCount = graphemeLevenshtein(selectedClusters, acceptedClusters);
    const normalizedDistance = editCount /
      Math.max(1, selectedClusters.length, acceptedClusters.length);
    return Object.freeze({
      selected_cluster_count: selectedClusters.length,
      accepted_cluster_count: acceptedClusters.length,
      edit_count: editCount,
      normalized_distance: normalizedDistance,
      normalized_distance_bits: binary64ToHex(normalizedDistance),
    });
  } catch (error) {
    if (error instanceof WritingBenchmarkError) throw error;
    throw new WritingBenchmarkError("unicode_runtime");
  }
}

function verifyReviewObservation(review: WritingBenchmarkReviewObservation): void {
  if (!isObject(review) || typeof review.reviewer_id !== "string" || review.reviewer_id.length === 0 ||
      review.qualified !== true || review.blinded !== true || !Array.isArray(review.independent_from) ||
      new Set(review.independent_from).size !== review.independent_from.length ||
      review.independent_from.some((id) => typeof id !== "string" || id.length === 0) ||
      !isObject(review.hard_results) || !isObject(review.advisory_scores) ||
      !["baseline", "learned", "tie", "abstain"].includes(review.preference)) {
    throw new WritingBenchmarkError("review_invalid");
  }
  const hardValues = Object.values(review.hard_results);
  const advisoryValues = Object.values(review.advisory_scores);
  if (hardValues.length === 0 || hardValues.some((value) => value !== "pass" && value !== "fail") ||
      advisoryValues.length === 0 || advisoryValues.some((value) =>
        typeof value !== "number" || !Number.isInteger(value) || value < 0 || value > 4)) {
    throw new WritingBenchmarkError("review_invalid");
  }
}

function sameKeys(left: object, right: object): boolean {
  return JSON.stringify(Object.keys(left).sort()) === JSON.stringify(Object.keys(right).sort());
}

export function analyzeWritingBenchmarkTaskReview(
  input: AnalyzeWritingBenchmarkTaskReviewInput,
): WritingBenchmarkTaskReviewResult {
  if (!isObject(input) || input.record_mode !== "development_fixture" ||
      !Array.isArray(input.original_reviews) || input.original_reviews.length !== 2) {
    throw new WritingBenchmarkError("review_invalid");
  }
  const [first, second] = input.original_reviews;
  verifyReviewObservation(first);
  verifyReviewObservation(second);
  if (first.reviewer_id === second.reviewer_id ||
      !first.independent_from.includes(second.reviewer_id) ||
      !second.independent_from.includes(first.reviewer_id) ||
      !sameKeys(first.hard_results, second.hard_results) ||
      !sameKeys(first.advisory_scores, second.advisory_scores)) {
    throw new WritingBenchmarkError("review_invalid");
  }
  const hardConflict = Object.keys(first.hard_results).some((key) =>
    first.hard_results[key] !== second.hard_results[key]);
  const advisoryConflict = Object.keys(first.advisory_scores).some((key) =>
    Math.abs(first.advisory_scores[key]! - second.advisory_scores[key]!) > 1);
  const adjudicationRequired = hardConflict || advisoryConflict;
  if (adjudicationRequired && input.adjudication_review === null) {
    throw new WritingBenchmarkError("adjudication_required");
  }
  if (!adjudicationRequired && input.adjudication_review !== null) {
    throw new WritingBenchmarkError("review_invalid");
  }
  const reviews: WritingBenchmarkReviewObservation[] = [first, second];
  if (input.adjudication_review !== null) {
    const adjudicator = input.adjudication_review;
    verifyReviewObservation(adjudicator);
    if (reviews.some((review) => review.reviewer_id === adjudicator.reviewer_id) ||
        reviews.some((review) => !review.independent_from.includes(adjudicator.reviewer_id)) ||
        reviews.some((review) => !adjudicator.independent_from.includes(review.reviewer_id)) ||
        !sameKeys(first.hard_results, adjudicator.hard_results) ||
        !sameKeys(first.advisory_scores, adjudicator.advisory_scores)) {
      throw new WritingBenchmarkError("review_invalid");
    }
    reviews.push(adjudicator);
  }
  const baselineVotes = reviews.filter((review) => review.preference === "baseline").length;
  const learnedVotes = reviews.filter((review) => review.preference === "learned").length;
  const decisiveReviewCount = baselineVotes + learnedVotes;
  const blindPreference = baselineVotes === learnedVotes
    ? "tie"
    : learnedVotes > baselineVotes ? "learned" : "baseline";
  return Object.freeze({
    review_state: "valid",
    adjudication_required: adjudicationRequired,
    blind_preference: blindPreference,
    decisive_review_count: decisiveReviewCount,
    original_review_count: 2,
  });
}

export function meanOriginalReviewEditEffort(
  input: MeanOriginalReviewEditEffortInput,
): WritingBenchmarkBinary64 {
  if (!isObject(input) || !Array.isArray(input.original_review_distances) ||
      input.original_review_distances.length !== 2 ||
      input.original_review_distances.some((distance) =>
        !isObject(distance) || typeof distance.normalized_distance !== "number" ||
        !Number.isFinite(distance.normalized_distance) || distance.normalized_distance < 0 ||
        distance.normalized_distance > 1 ||
        distance.normalized_distance_bits !== binary64ToHex(distance.normalized_distance))) {
    throw new WritingBenchmarkError("review_invalid");
  }
  return benchmarkBinary(kahanSum(input.original_review_distances.map((distance) =>
    distance.normalized_distance)) / 2);
}
