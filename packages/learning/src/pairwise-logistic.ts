import { createHash } from "node:crypto";
import { endianness } from "node:os";
import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  type DurableRecord,
} from "@contentmd/core";
import {
  buildLearningDataset,
  sealLearningDataset,
  type BuildLearningDatasetInput,
  type DatasetSealWitness,
  type LearningDatasetBuildResult,
  type SealLearningDatasetInput,
} from "./dataset.js";
import { Task3ContractError, type Task3ProducerArtifactWitness } from "./leakage.js";
import {
  TASK4_FEATURE_ORDER,
  createFeatureProfile,
  vectorizeCandidate,
  type CandidateFeatureVector,
  type CandidateVectorizationInput,
  type CreateFeatureProfileInput,
} from "./features.js";
import {
  binary64ToHex,
  kahanSum,
  PairwiseRankingError,
  stableSigmoid,
  stableSoftplus,
  task5Fail,
  type PairwiseRankingErrorCode,
  type PairwiseRankingErrorShape,
} from "./numeric.js";
import type {
  ArtifactRef,
  DigestRef,
  FeatureProfile,
  LearningDatasetManifest,
  ModelHyperparameters,
  RankingModelRecord,
  StandardizationEntry,
} from "./records.js";
import { Task4ContractError } from "./retrieval.js";
import { PAIRWISE_RELEASE_PROFILE } from "./pairwise-release-profile.js";

export {
  PairwiseRankingError,
} from "./numeric.js";
export type {
  PairwiseRankingErrorCode,
  PairwiseRankingErrorShape,
} from "./numeric.js";

function fail(code: PairwiseRankingErrorCode): never {
  return task5Fail(code);
}

export interface DatasetSealReplay {
  producer: Task3ProducerArtifactWitness;
  witness: DatasetSealWitness;
}

export interface LearningDatasetTrainingReplay {
  contract_version: "contentmd.learning-dataset-training-replay/0.1.0";
  build_input: BuildLearningDatasetInput;
  seal: DatasetSealReplay;
  expected_dataset_record: LearningDatasetManifest;
}

export interface VerifyLearningDatasetForTrainingInput {
  record_mode: "development_fixture" | "official";
  replay: LearningDatasetTrainingReplay;
}

export interface VerifiedLearningDatasetForTraining {
  readonly contract_version: "contentmd.verified-learning-dataset/0.1.0";
  readonly record_mode: "development_fixture";
  readonly replay: LearningDatasetTrainingReplay;
  readonly replayed_build_result: LearningDatasetBuildResult & { manifest: LearningDatasetManifest };
  readonly dataset_record: LearningDatasetManifest;
  readonly dataset_ref: DigestRef;
  readonly verification_digest: string;
}

export interface PairwiseFeatureProfileReplay {
  contract_version: "contentmd.pairwise-feature-profile-replay/0.1.0";
  profile_input: CreateFeatureProfileInput;
  expected_profile: FeatureProfile;
}

export interface PairwiseCandidateVectorReplay {
  contract_version: "contentmd.pairwise-candidate-vector-replay/0.1.0";
  vectorization_input: Omit<CandidateVectorizationInput, "record_mode" | "profile" | "profile_input">;
  expected_vector: CandidateFeatureVector;
}

export interface VerifyPairwiseCandidateInput {
  record_mode: "development_fixture" | "official";
  profile: PairwiseFeatureProfileReplay;
  replay: PairwiseCandidateVectorReplay;
}

export interface PairwiseTrainingRowReplay {
  example_ref: DigestRef;
  leakage_group_ref: DigestRef;
  label: 0 | 1;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
}

export interface PairwiseFeatureMatrixReplay {
  contract_version: "contentmd.pairwise-feature-matrix-replay/0.1.0";
  profile: PairwiseFeatureProfileReplay;
  rows: [PairwiseTrainingRowReplay, ...PairwiseTrainingRowReplay[]];
}

export interface VerifyPairwiseFeatureMatrixInput {
  record_mode: "development_fixture" | "official";
  dataset: VerifiedLearningDatasetForTraining;
  replay: PairwiseFeatureMatrixReplay;
}

export interface PairwiseTrainingRow {
  example_ref: DigestRef;
  leakage_group_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  label: 0 | 1;
  feature_source_checkpoint_set_ref: DigestRef;
  project_id: string;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  checkpoint_set_ref: DigestRef;
  feature_profile_ref: DigestRef;
  feature_universe_ref: DigestRef;
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  candidate_a_values: readonly number[];
  candidate_b_values: readonly number[];
  candidate_a_vector_digest: string;
  candidate_b_vector_digest: string;
}

export interface VerifiedPairwiseFeatureMatrix {
  readonly contract_version: "contentmd.verified-pairwise-feature-matrix/0.1.0";
  readonly record_mode: "development_fixture";
  readonly dataset_verification_digest: string;
  readonly dataset_ref: DigestRef;
  readonly replay: PairwiseFeatureMatrixReplay;
  readonly feature_profile_record: FeatureProfile;
  readonly feature_order: typeof TASK4_FEATURE_ORDER;
  readonly training_rows: readonly [PairwiseTrainingRow, ...PairwiseTrainingRow[]];
  readonly matrix_digest: string;
  readonly verification_digest: string;
  readonly browser_feature_count: 0;
  readonly competitor_feature_count: 0;
  readonly third_party_label_count: 0;
  readonly blocking_only_verification_digest: string;
}

export interface VerifiedPairwiseCandidate {
  readonly contract_version: "contentmd.verified-pairwise-candidate/0.1.0";
  readonly record_mode: "development_fixture";
  readonly verification_input: VerifyPairwiseCandidateInput;
  readonly profile: FeatureProfile;
  readonly replay: PairwiseCandidateVectorReplay;
  readonly vector: CandidateFeatureVector;
  readonly vector_ref: DigestRef;
  readonly candidate_ref: DigestRef;
  readonly expression_digest: string;
  readonly verification_digest: string;
}

export interface CodeManifestEntry {
  path: string;
  raw_bytes_digest: string;
  byte_count: number;
}

export interface PairwiseCodeManifest {
  contract_version: "contentmd.pairwise-code-manifest/0.1.0";
  package_id: "@contentmd/learning";
  package_version: "0.1.0";
  entries: readonly CodeManifestEntry[];
  manifest_digest: string;
}

export interface PairwiseRuntimeProfile {
  contract_version: "contentmd.pairwise-runtime-profile/0.1.0";
  node_version: "24.20.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
  profile_digest: string;
}

export interface VerifiedPairwiseCodeManifest {
  readonly manifest: PairwiseCodeManifest;
  readonly verification_digest: string;
}

export interface VerifiedPairwiseRuntime {
  readonly profile: PairwiseRuntimeProfile;
  readonly artifact_ref: ArtifactRef;
  readonly verification_digest: string;
}

export type StatisticsInvalidStage =
  | "input_numeric"
  | "standardization"
  | "initial_loss"
  | "gradient_update"
  | "updated_loss";

export interface ModelTrainingStatisticsPayload {
  contract_version: "contentmd.model-training-statistics/0.1.0";
  record_mode: "development_fixture";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  schema_digest: string;
  dataset_ref: DigestRef;
  feature_profile_ref: DigestRef;
  purpose: "golden_conformance" | "diagnostic" | "candidate";
  training_input_digest: string;
  code_digest: string;
  runtime_profile_ref: ArtifactRef;
  pair_count: number;
  feature_count: 21;
  iterations_completed: number;
  convergence_streak: number;
  converged: boolean;
  initial_loss_bits: string | null;
  final_loss_bits: string | null;
  coefficient_set_digest: string | null;
  statistics_state: "completed" | "nonconverged" | "invalid";
  invalid_stage: StatisticsInvalidStage | null;
  error_code: PairwiseRankingErrorCode | null;
  authority_effect: "none";
}

export type ModelTrainingStatisticsRecord = DurableRecord<ModelTrainingStatisticsPayload> & {
  schema_id: "contentmd.model-training-statistics-record";
  schema_version: "0.1.0";
  provenance: readonly [
    { record_id: string; relationship: string; content_digest: string },
    { record_id: string; relationship: string; content_digest: string },
  ];
};

export interface PairwiseTrainingRequest {
  contract_version: "contentmd.pairwise-training-request/0.1.0";
  record_mode: "development_fixture" | "official";
  purpose: "golden_conformance" | "diagnostic" | "candidate";
  dataset: VerifiedLearningDatasetForTraining;
  feature_matrix: VerifiedPairwiseFeatureMatrix;
  code_manifest: VerifiedPairwiseCodeManifest;
  runtime_profile: VerifiedPairwiseRuntime;
}

export type PairwiseTrainingResult =
  | { state: "trained"; statistics_record: ModelTrainingStatisticsRecord; model_record: RankingModelRecord }
  | {
      state: "nonconverged";
      statistics_record: ModelTrainingStatisticsRecord;
      model_record: RankingModelRecord;
      error: { code: PairwiseRankingErrorCode; message: string; retryable: false };
    }
  | {
      state: "invalid";
      statistics_record: ModelTrainingStatisticsRecord | null;
      model_record: null;
      error: { code: PairwiseRankingErrorCode; message: string; retryable: false };
    };

export interface RankingModelDependencies {
  training_request: PairwiseTrainingRequest;
}

export interface VerifiedRankingModel {
  readonly record: RankingModelRecord;
  readonly training_request: PairwiseTrainingRequest;
  readonly feature_order: typeof TASK4_FEATURE_ORDER;
  readonly standardization: readonly StandardizationEntry[];
  readonly coefficient_bits: readonly string[];
  readonly verification_digest: string;
}

const verifiedDatasets = new WeakSet<object>();
const verifiedCandidates = new WeakSet<object>();
const verifiedMatrices = new WeakSet<object>();
const verifiedCodeManifests = new WeakSet<object>();
const verifiedRuntimes = new WeakSet<object>();
const verifiedModels = new WeakSet<object>();

const PAIRWISE_CODE_PATHS = [
  "docs/superpowers/specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md",
  "packages/core/src/canonical-json.ts",
  "packages/core/src/records.ts",
  "packages/learning/src/index.ts",
  "packages/learning/src/numeric.ts",
  "packages/learning/src/pairwise-logistic.ts",
  "packages/learning/src/rank.ts",
  "packages/learning/src/records.ts",
  "packages/schemas/src/learning-records.schema.json",
  "packages/schemas/src/model-training-statistics.schema.json",
  "packages/schemas/src/schema-registry.ts",
  "scripts/verify-pairwise-code-manifest.mjs",
] as const;

function exactDataKeys(value: Record<string, unknown>, keys: readonly string[]): void {
  const actual = Reflect.ownKeys(value);
  if (actual.length !== keys.length
    || actual.some((key) => typeof key !== "string")
    || keys.some((key) => !actual.includes(key))) fail("ranking_input_shape_invalid");
  for (const key of keys) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
      fail("ranking_input_shape_invalid");
    }
  }
}

function task5AssertClosedDataGraph(value: unknown): void {
  const ancestors = new WeakSet<object>();
  const deeplyFrozen = new WeakMap<object, boolean>();
  const visit = (current: unknown): boolean => {
    if (current === null || typeof current === "string" || typeof current === "boolean") return true;
    if (typeof current === "number") {
      if (!Number.isFinite(current) || Object.is(current, -0)) fail("ranking_non_finite");
      return true;
    }
    if (typeof current !== "object") fail("ranking_input_shape_invalid");
    if (ancestors.has(current)) fail("ranking_input_shape_invalid");
    if (deeplyFrozen.has(current)) {
      if (deeplyFrozen.get(current) !== true) fail("ranking_input_shape_invalid");
      return true;
    }
    ancestors.add(current);
    const prototype = Object.getPrototypeOf(current);
    let immutable = Object.isFrozen(current);
    if (Array.isArray(current)) {
      if (prototype !== Array.prototype) fail("ranking_input_shape_invalid");
      const lengthDescriptor = Object.getOwnPropertyDescriptor(current, "length");
      if (lengthDescriptor === undefined || !("value" in lengthDescriptor)
        || typeof lengthDescriptor.value !== "number" || !Number.isSafeInteger(lengthDescriptor.value)
        || lengthDescriptor.value < 0) fail("ranking_input_shape_invalid");
      const expected = new Set([
        "length",
        ...Array.from({ length: lengthDescriptor.value }, (_, index) => String(index)),
      ]);
      const actual = Reflect.ownKeys(current);
      if (actual.length !== expected.size
        || actual.some((key) => typeof key !== "string" || !expected.has(key))) {
        fail("ranking_input_shape_invalid");
      }
      for (let index = 0; index < lengthDescriptor.value; index += 1) {
        const descriptor = Object.getOwnPropertyDescriptor(current, String(index));
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          fail("ranking_input_shape_invalid");
        }
        immutable = visit(descriptor.value) && immutable;
      }
    } else {
      if (prototype !== Object.prototype && prototype !== null) fail("ranking_input_shape_invalid");
      for (const key of Reflect.ownKeys(current)) {
        if (typeof key !== "string") fail("ranking_input_shape_invalid");
        const descriptor = Object.getOwnPropertyDescriptor(current, key);
        if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
          fail("ranking_input_shape_invalid");
        }
        immutable = visit(descriptor.value) && immutable;
      }
    }
    ancestors.delete(current);
    deeplyFrozen.set(current, immutable);
    return immutable;
  };
  try {
    visit(value);
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    fail("ranking_input_shape_invalid");
  }
}

function task5FreezeGraph(value: unknown, seen: Set<object>): void {
  if (value === null || typeof value !== "object" || seen.has(value)) return;
  seen.add(value);
  for (const key of Reflect.ownKeys(value)) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (descriptor !== undefined && "value" in descriptor) task5FreezeGraph(descriptor.value, seen);
  }
  Object.freeze(value);
}

function task5Immutable<T>(value: T): T {
  const clone = structuredClone(value);
  task5FreezeGraph(clone, new Set<object>());
  return clone;
}

const TASK5_DIGEST = /^[a-f0-9]{64}$/;

export function verifyPairwiseCodeManifest(
  manifest: PairwiseCodeManifest,
): VerifiedPairwiseCodeManifest {
  try {
    task5AssertClosedDataGraph(manifest);
    exactDataKeys(manifest as unknown as Record<string, unknown>, [
      "contract_version", "package_id", "package_version", "entries", "manifest_digest",
    ]);
    if (manifest.contract_version !== "contentmd.pairwise-code-manifest/0.1.0"
      || manifest.package_id !== "@contentmd/learning"
      || manifest.package_version !== "0.1.0"
      || !Array.isArray(manifest.entries)) fail("ranking_input_shape_invalid");
    if (manifest.entries.length !== PAIRWISE_CODE_PATHS.length) {
      fail("ranking_code_manifest_invalid");
    }
    for (const [index, entry] of manifest.entries.entries()) {
      exactDataKeys(entry as unknown as Record<string, unknown>, [
        "path", "raw_bytes_digest", "byte_count",
      ]);
      if (typeof entry.path !== "string"
        || typeof entry.raw_bytes_digest !== "string"
        || typeof entry.byte_count !== "number"
        || !Number.isSafeInteger(entry.byte_count)
        || entry.byte_count < 1) fail("ranking_input_shape_invalid");
      if (!TASK5_DIGEST.test(entry.raw_bytes_digest)) fail("ranking_digest_invalid");
      if (entry.path !== PAIRWISE_CODE_PATHS[index]) fail("ranking_code_manifest_invalid");
    }
    if (!TASK5_DIGEST.test(manifest.manifest_digest)) fail("ranking_digest_invalid");
    const manifestPreimage = {
      contract_version: manifest.contract_version,
      package_id: manifest.package_id,
      package_version: manifest.package_version,
      entries: manifest.entries,
    };
    const derivedManifestDigest = sha256Canonical(manifestPreimage);
    const canonicalManifestDigest = sha256Utf8(canonicalJson(manifestPreimage));
    if (manifest.manifest_digest !== derivedManifestDigest) fail("ranking_digest_invalid");
    if (derivedManifestDigest !== PAIRWISE_RELEASE_PROFILE.manifest_digest
      || canonicalManifestDigest !== PAIRWISE_RELEASE_PROFILE.manifest_raw_bytes_digest) {
      fail("ranking_code_manifest_invalid");
    }
    const releaseProfileContractDigest = sha256Canonical(PAIRWISE_RELEASE_PROFILE);
    const verified = task5Immutable({
      manifest,
      verification_digest: sha256Canonical({
        contract_version: "contentmd.pairwise-code-verification/0.1.0",
        manifest_digest: derivedManifestDigest,
        manifest_raw_bytes_digest: canonicalManifestDigest,
        release_profile_contract_digest: releaseProfileContractDigest,
      }),
    }) as VerifiedPairwiseCodeManifest;
    verifiedCodeManifests.add(verified);
    return verified;
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    return fail("ranking_input_shape_invalid");
  }
}

export function admitPairwiseRuntime(
  profile: PairwiseRuntimeProfile,
): VerifiedPairwiseRuntime {
  try {
    task5AssertClosedDataGraph(profile);
    exactDataKeys(profile as unknown as Record<string, unknown>, [
      "contract_version", "node_version", "v8_version", "icu_version", "unicode_version",
      "platform", "architecture", "endianness", "profile_digest",
    ]);
    for (const field of [
      profile.contract_version,
      profile.node_version,
      profile.v8_version,
      profile.icu_version,
      profile.unicode_version,
      profile.platform,
      profile.architecture,
      profile.endianness,
      profile.profile_digest,
    ]) {
      if (typeof field !== "string" || field.length === 0) fail("ranking_input_shape_invalid");
    }
    if (profile.contract_version !== "contentmd.pairwise-runtime-profile/0.1.0"
      || profile.node_version !== "24.20.0"
      || (profile.endianness !== "LE" && profile.endianness !== "BE")) {
      fail("ranking_runtime_profile_unsupported");
    }
    if (!TASK5_DIGEST.test(profile.profile_digest)) fail("ranking_digest_invalid");
    const { profile_digest: _profileDigest, ...profilePreimage } = profile;
    if (profile.profile_digest !== sha256Canonical(profilePreimage)) fail("ranking_digest_invalid");
    if (!PAIRWISE_RELEASE_PROFILE.admitted_runtime_profile_digests.some((digest) =>
      digest === profile.profile_digest)
      || profile.node_version !== process.versions.node
      || profile.v8_version !== process.versions.v8
      || profile.icu_version !== process.versions.icu
      || profile.unicode_version !== process.versions.unicode
      || profile.platform !== process.platform
      || profile.architecture !== process.arch
      || profile.endianness !== endianness()) {
      fail("ranking_runtime_profile_unsupported");
    }
    const artifactRef: ArtifactRef = {
      artifact_id: "contentmd.pairwise-runtime-profile",
      artifact_version: "0.1.0",
      artifact_digest: profile.profile_digest,
    };
    const verified = task5Immutable({
      profile,
      artifact_ref: artifactRef,
      verification_digest: sha256Canonical({
        contract_version: "contentmd.pairwise-runtime-verification/0.1.0",
        profile_digest: profile.profile_digest,
        artifact_ref: artifactRef,
        observed_node_version: process.versions.node,
        observed_v8_version: process.versions.v8,
        observed_icu_version: process.versions.icu,
        observed_unicode_version: process.versions.unicode,
        observed_platform: process.platform,
        observed_architecture: process.arch,
        observed_endianness: endianness(),
      }),
    }) as VerifiedPairwiseRuntime;
    verifiedRuntimes.add(verified);
    return verified;
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    return fail("ranking_input_shape_invalid");
  }
}

const TASK3_ERROR_MAP: Readonly<Record<string, PairwiseRankingErrorCode>> = {
  input_shape: "ranking_input_shape_invalid",
  canonical_value: "ranking_input_shape_invalid",
  timestamp: "ranking_input_shape_invalid",
  set_uniqueness_or_order: "ranking_input_shape_invalid",
  official_mode_not_supported: "ranking_mode_mismatch",
  digest: "ranking_digest_invalid",
  durable_record_digest: "ranking_digest_invalid",
  snapshot_digest: "ranking_digest_invalid",
  receipt_digest: "ranking_digest_invalid",
  producer_artifact: "ranking_digest_invalid",
  producer_manifest: "ranking_digest_invalid",
  unicode_artifact: "ranking_digest_invalid",
  unicode_scalar: "ranking_digest_invalid",
  record_id: "ranking_reference_invalid",
  schema_id: "ranking_reference_invalid",
  receipt_binding: "ranking_reference_invalid",
  reference_integrity: "ranking_reference_invalid",
  checkpoint_chain: "ranking_reference_invalid",
  checkpoint_binding: "ranking_reference_invalid",
  leakage_universe: "ranking_reference_invalid",
  leakage_relationship: "ranking_reference_invalid",
  group_identity: "ranking_reference_invalid",
  provenance: "ranking_reference_invalid",
  scope_mismatch: "ranking_scope_mismatch",
  split_assignment: "ranking_test_state_invalid",
  dataset_partition: "ranking_test_state_invalid",
  dataset_counts: "ranking_dataset_state_invalid",
  dataset_state: "ranking_dataset_state_invalid",
};

const TASK4_ERROR_MAP: Readonly<Record<string, PairwiseRankingErrorCode>> = {
  input_shape: "ranking_input_shape_invalid",
  canonical_value: "ranking_input_shape_invalid",
  official_mode_not_supported: "ranking_mode_mismatch",
  producer_witness: "ranking_digest_invalid",
  unicode_runtime: "ranking_digest_invalid",
  digest: "ranking_digest_invalid",
  reference_binding: "ranking_reference_invalid",
  provenance: "ranking_reference_invalid",
  scope_mismatch: "ranking_scope_mismatch",
  checkpoint_binding: "ranking_scope_mismatch",
  feature_profile_binding: "ranking_feature_profile_mismatch",
  quarantined_expression_present: "ranking_source_quarantined",
  forbidden_input_field: "ranking_source_quarantined",
  numeric_nonfinite: "ranking_non_finite",
};

const TASK5_ERROR_PRECEDENCE: readonly PairwiseRankingErrorCode[] = [
  "ranking_input_shape_invalid",
  "ranking_official_mode_not_supported",
  "ranking_digest_invalid",
  "ranking_reference_invalid",
  "ranking_objective_mismatch",
  "ranking_mode_mismatch",
  "ranking_scope_mismatch",
  "learning_data_not_authorized",
  "ranking_source_quarantined",
  "learning_dataset_insufficient",
  "ranking_dataset_state_invalid",
  "ranking_test_state_invalid",
  "ranking_feature_profile_mismatch",
  "ranking_feature_order_invalid",
  "ranking_runtime_profile_unsupported",
  "ranking_code_manifest_invalid",
  "ranking_non_finite",
  "ranking_training_invalid",
  "ranking_training_nonconverged",
  "ranking_model_invalid",
  "ranking_model_quarantined",
  "ranking_candidate_ineligible",
];

interface Task5CapturedFailure {
  code: PairwiseRankingErrorCode;
  slot: number;
}

type Task5Captured<T> =
  | { ok: true; value: T }
  | { ok: false; failure: Task5CapturedFailure };

function task5Capture<T>(slot: number, operation: () => T): Task5Captured<T> {
  try {
    return { ok: true, value: operation() };
  } catch (error) {
    return {
      ok: false,
      failure: {
        code: error instanceof PairwiseRankingError
          ? error.code
          : "ranking_input_shape_invalid",
        slot,
      },
    };
  }
}

function task5ThrowEarliest(failures: readonly Task5CapturedFailure[]): void {
  if (failures.length === 0) return;
  const ordered = [...failures].sort((left, right) =>
    TASK5_ERROR_PRECEDENCE.indexOf(left.code) - TASK5_ERROR_PRECEDENCE.indexOf(right.code)
    || left.slot - right.slot);
  fail(ordered[0]!.code);
}

function task5RunTask3<T>(operation: () => T): T {
  try {
    return operation();
  } catch (error) {
    if (!(error instanceof Task3ContractError)) fail("ranking_input_shape_invalid");
    const prefix = "task3_contract_invalid:";
    if (!error.code.startsWith(prefix)) fail("ranking_input_shape_invalid");
    const mapped = TASK3_ERROR_MAP[error.code.slice(prefix.length)];
    if (mapped === undefined) fail("ranking_input_shape_invalid");
    return fail(mapped);
  }
}

function task5RunTask4<T>(operation: () => T): T {
  try {
    return operation();
  } catch (error) {
    if (!(error instanceof Task4ContractError)) fail("ranking_input_shape_invalid");
    const prefix = "task4_contract_invalid:";
    if (!error.code.startsWith(prefix)) fail("ranking_input_shape_invalid");
    const mapped = TASK4_ERROR_MAP[error.code.slice(prefix.length)];
    if (mapped === undefined) fail("ranking_input_shape_invalid");
    return fail(mapped);
  }
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  try {
    return canonicalJson(left) === canonicalJson(right);
  } catch {
    return fail("ranking_input_shape_invalid");
  }
}

function datasetThresholdsPass(result: LearningDatasetBuildResult): result is LearningDatasetBuildResult & {
  manifest: LearningDatasetManifest;
} {
  if (result.manifest === null) return false;
  const counts = result.manifest.payload.counts;
  return counts.examples >= 100
    && counts.groups >= 30
    && counts.train_examples >= 1
    && counts.train_groups >= 1
    && counts.validation_examples >= 20
    && counts.validation_groups >= 5
    && counts.test_examples >= 20
    && counts.test_groups >= 5;
}

function task5TopLevelGate(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  try {
    if (value === null || typeof value !== "object" || Array.isArray(value)) {
      fail("ranking_input_shape_invalid");
    }
    const object = value as Record<string, unknown>;
    const prototype = Object.getPrototypeOf(object);
    if (prototype !== Object.prototype && prototype !== null) fail("ranking_input_shape_invalid");
    const actual = Reflect.ownKeys(object);
    if (actual.length !== keys.length
      || actual.some((key) => typeof key !== "string")
      || keys.some((key) => !actual.includes(key))) fail("ranking_input_shape_invalid");
    for (const key of keys) {
      const descriptor = Object.getOwnPropertyDescriptor(object, key);
      if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
        fail("ranking_input_shape_invalid");
      }
    }
    const mode = Object.getOwnPropertyDescriptor(object, "record_mode")!.value;
    if (mode !== "development_fixture" && mode !== "official") fail("ranking_input_shape_invalid");
    if (mode === "official") fail("ranking_official_mode_not_supported");
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    fail("ranking_input_shape_invalid");
  }
}

export function verifyLearningDatasetForTraining(
  input: VerifyLearningDatasetForTrainingInput,
): VerifiedLearningDatasetForTraining {
  task5TopLevelGate(input, ["record_mode", "replay"]);
  task5AssertClosedDataGraph(input);
  const replay = input.replay as unknown as Record<string, unknown>;
  exactDataKeys(replay, ["contract_version", "build_input", "seal", "expected_dataset_record"]);
  if (replay.contract_version !== "contentmd.learning-dataset-training-replay/0.1.0") {
    fail("ranking_input_shape_invalid");
  }
  const seal = replay.seal as Record<string, unknown>;
  exactDataKeys(seal, ["producer", "witness"]);
  const typedReplay = replay as unknown as LearningDatasetTrainingReplay;
  const replayedBuild = task5RunTask3(() => buildLearningDataset(typedReplay.build_input));
  if (!datasetThresholdsPass(replayedBuild)) fail("learning_dataset_insufficient");
  if (replayedBuild.manifest.payload.record_mode !== "development_fixture"
    || replayedBuild.manifest.payload.dataset_state !== "training_eligible"
    || replayedBuild.manifest.payload.test_open_state !== "not_applicable") {
    fail("ranking_dataset_state_invalid");
  }
  const derivedSealInput: SealLearningDatasetInput = {
    record_mode: "development_fixture",
    producer: typedReplay.seal.producer,
    source_manifest: replayedBuild.manifest,
    witness: typedReplay.seal.witness,
  };
  const sealed = task5RunTask3(() => sealLearningDataset(derivedSealInput));
  if (!canonicalEqual(sealed, typedReplay.expected_dataset_record)) {
    fail("ranking_reference_invalid");
  }
  if (sealed.payload.record_mode !== "development_fixture"
    || sealed.payload.dataset_state !== "sealed"
    || sealed.payload.test_open_state !== "sealed") fail("ranking_dataset_state_invalid");
  if (sealed.payload.train_example_refs.length === 0) fail("learning_dataset_insufficient");
  const datasetRef: DigestRef = {
    record_id: sealed.record_id,
    schema_id: sealed.schema_id,
    schema_version: sealed.schema_version,
    content_digest: sealed.content_digest,
  };
  const identity = {
    contract_version: "contentmd.verified-learning-dataset/0.1.0" as const,
    record_mode: "development_fixture" as const,
    replay: typedReplay,
    replayed_build_result: replayedBuild,
    derived_seal_input: derivedSealInput,
    dataset_ref: datasetRef,
  };
  const verified = task5Immutable({
    contract_version: identity.contract_version,
    record_mode: identity.record_mode,
    replay: typedReplay,
    replayed_build_result: replayedBuild,
    dataset_record: sealed,
    dataset_ref: datasetRef,
    verification_digest: sha256Canonical(identity),
  }) as VerifiedLearningDatasetForTraining;
  verifiedDatasets.add(verified);
  return verified;
}

function refsEqual(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
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

function candidateSnapshotRef(candidate: CandidateVectorizationInput["candidate"]): DigestRef {
  return {
    record_id: candidate.snapshot_id,
    schema_id: "contentmd.task2-candidate-snapshot",
    schema_version: "0.1.0",
    content_digest: candidate.snapshot_digest,
  };
}

function candidateVectorRef(vector: CandidateFeatureVector): DigestRef {
  return {
    record_id: vector.vector_id,
    schema_id: "contentmd.task4-candidate-feature-vector",
    schema_version: "0.1.0",
    content_digest: vector.vector_digest,
  };
}

function assertCandidateReplayShape(value: unknown): asserts value is PairwiseCandidateVectorReplay {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    fail("ranking_input_shape_invalid");
  }
  const replay = value as Record<string, unknown>;
  exactDataKeys(replay, ["contract_version", "vectorization_input", "expected_vector"]);
  if (replay.contract_version !== "contentmd.pairwise-candidate-vector-replay/0.1.0") {
    fail("ranking_input_shape_invalid");
  }
}

function replayCandidateVector(
  profileReplay: PairwiseFeatureProfileReplay,
  profile: FeatureProfile,
  replay: PairwiseCandidateVectorReplay,
): { vectorInput: CandidateVectorizationInput; vector: CandidateFeatureVector; candidateRef: DigestRef; vectorRef: DigestRef } {
  const vectorInput: CandidateVectorizationInput = {
    ...replay.vectorization_input,
    record_mode: "development_fixture",
    profile_input: profileReplay.profile_input,
    profile,
  };
  const replayed = task5RunTask4(() => vectorizeCandidate(vectorInput));
  if (replayed.status !== "eligible") fail("ranking_candidate_ineligible");
  if (!canonicalEqual(replayed.vector, replay.expected_vector)) fail("ranking_reference_invalid");
  if (vectorInput.blocking_evidence.length !== 0
    || vectorInput.rule_evaluations.some(({ eligibility_gate }) =>
      eligibility_gate.hard_rule_status !== "pass"
      || eligibility_gate.prohibited_claim_status !== "clear")) {
    fail("ranking_candidate_ineligible");
  }
  if (vectorInput.candidate.payload.expression_digest
    !== sha256Utf8(vectorInput.candidate.payload.expression)) fail("ranking_digest_invalid");
  return {
    vectorInput,
    vector: replayed.vector,
    candidateRef: candidateSnapshotRef(vectorInput.candidate),
    vectorRef: candidateVectorRef(replayed.vector),
  };
}

function reauthenticateDataset(
  value: VerifiedLearningDatasetForTraining,
): VerifiedLearningDatasetForTraining {
  if (value === null || typeof value !== "object" || !verifiedDatasets.has(value)) {
    fail("ranking_reference_invalid");
  }
  const replayed = verifyLearningDatasetForTraining({
    record_mode: "development_fixture",
    replay: value.replay,
  });
  if (!canonicalEqual(replayed, value)) fail("ranking_reference_invalid");
  return replayed;
}

export function verifyPairwiseFeatureMatrix(
  input: VerifyPairwiseFeatureMatrixInput,
): VerifiedPairwiseFeatureMatrix {
  task5TopLevelGate(input, ["record_mode", "dataset", "replay"]);
  const dataset = reauthenticateDataset(input.dataset);
  task5AssertClosedDataGraph(input.replay);
  const replay = input.replay as unknown as Record<string, unknown>;
  exactDataKeys(replay, ["contract_version", "profile", "rows"]);
  if (replay.contract_version !== "contentmd.pairwise-feature-matrix-replay/0.1.0"
    || !Array.isArray(replay.rows) || replay.rows.length === 0) {
    fail("ranking_input_shape_invalid");
  }
  const profileReplay = replay.profile as Record<string, unknown>;
  exactDataKeys(profileReplay, ["contract_version", "profile_input", "expected_profile"]);
  if (profileReplay.contract_version !== "contentmd.pairwise-feature-profile-replay/0.1.0") {
    fail("ranking_input_shape_invalid");
  }
  const typedReplay = replay as unknown as PairwiseFeatureMatrixReplay;
  for (const row of typedReplay.rows) {
    exactDataKeys(row as unknown as Record<string, unknown>, [
      "example_ref", "leakage_group_ref", "label", "candidate_a", "candidate_b",
    ]);
    if (row.label !== 0 && row.label !== 1) fail("ranking_input_shape_invalid");
    assertCandidateReplayShape(row.candidate_a);
    assertCandidateReplayShape(row.candidate_b);
  }
  const typedProfile = profileReplay as unknown as PairwiseFeatureProfileReplay;
  const profile = task5RunTask4(() => createFeatureProfile(typedProfile.profile_input));
  if (!canonicalEqual(profile, typedProfile.expected_profile)) fail("ranking_feature_profile_mismatch");
  const candidateReplays = typedReplay.rows.map((row, rowIndex) => ({
    candidate_a: task5Capture(rowIndex * 2, () =>
      replayCandidateVector(typedProfile, profile, row.candidate_a)),
    candidate_b: task5Capture(rowIndex * 2 + 1, () =>
      replayCandidateVector(typedProfile, profile, row.candidate_b)),
  }));
  task5ThrowEarliest(candidateReplays.flatMap(({ candidate_a, candidate_b }) => [
    ...(candidate_a.ok ? [] : [candidate_a.failure]),
    ...(candidate_b.ok ? [] : [candidate_b.failure]),
  ]));
  const datasetProject = dataset.dataset_record.scope.project_id;
  if (datasetProject === null || profile.scope.project_id !== datasetProject) {
    fail("ranking_scope_mismatch");
  }
  const trainRefs = dataset.dataset_record.payload.train_example_refs;
  if (typedReplay.rows.length !== trainRefs.length
    || typedReplay.rows.some((row, index) => !refsEqual(row.example_ref, trainRefs[index]!))) {
    fail("ranking_reference_invalid");
  }
  const subjectByRef = new Map(dataset.replay.build_input.leakage_evidence.subjects.map((subject) => [
    canonicalJson(recordRef(subject.example.preference)),
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
  const featureProfileRef = recordRef(profile);
  const trainingRows: PairwiseTrainingRow[] = [];
  for (const [index, rowReplay] of typedReplay.rows.entries()) {
    const expectedExampleRef = trainRefs[index]!;
    const subject = subjectByRef.get(canonicalJson(expectedExampleRef));
    const groups = groupsByExample.get(canonicalJson(expectedExampleRef));
    if (subject === undefined || groups?.length !== 1 || groups[0]!.payload.split !== "train") {
      fail("ranking_reference_invalid");
    }
    const expectedGroupRef = recordRef(groups[0]!);
    const preference = subject.example.preference;
    const expectedCandidateARef = candidateSnapshotRef(subject.example.qualification_input.candidate_a);
    const expectedCandidateBRef = candidateSnapshotRef(subject.example.qualification_input.candidate_b);
    if (!refsEqual(rowReplay.leakage_group_ref, expectedGroupRef)
      || rowReplay.label !== preference.payload.label
      || !refsEqual(preference.payload.candidate_a_ref, expectedCandidateARef)
      || !refsEqual(preference.payload.candidate_b_ref, expectedCandidateBRef)) {
      fail("ranking_reference_invalid");
    }
    const replayedCandidates = candidateReplays[index]!;
    if (!replayedCandidates.candidate_a.ok || !replayedCandidates.candidate_b.ok) {
      fail("ranking_input_shape_invalid");
    }
    const candidateA = replayedCandidates.candidate_a.value;
    const candidateB = replayedCandidates.candidate_b.value;
    if (!refsEqual(candidateA.candidateRef, expectedCandidateARef)
      || !refsEqual(candidateB.candidateRef, expectedCandidateBRef)
      || !canonicalEqual(candidateA.vectorInput.candidate, subject.example.qualification_input.candidate_a)
      || !canonicalEqual(candidateB.vectorInput.candidate, subject.example.qualification_input.candidate_b)
      || !canonicalEqual(candidateA.vectorInput.checkpoint_set, subject.example.feature_checkpoint_set)
      || !canonicalEqual(candidateB.vectorInput.checkpoint_set, subject.example.feature_checkpoint_set)
      || refsEqual(candidateA.candidateRef, candidateB.candidateRef)
      || refsEqual(candidateA.vectorRef, candidateB.vectorRef)) {
      fail("ranking_reference_invalid");
    }
    const vectorA = candidateA.vector;
    const vectorB = candidateB.vector;
    const sharedBindingsEqual = vectorA.project_id === vectorB.project_id
      && refsEqual(vectorA.context_ref, vectorB.context_ref)
      && refsEqual(vectorA.target_scope_ref, vectorB.target_scope_ref)
      && vectorA.target_scope_role === vectorB.target_scope_role
      && refsEqual(vectorA.checkpoint_set_ref, vectorB.checkpoint_set_ref)
      && refsEqual(vectorA.feature_profile_ref, vectorB.feature_profile_ref)
      && refsEqual(vectorA.feature_universe_ref, vectorB.feature_universe_ref)
      && canonicalEqual(vectorA.runtime_profile_ref, vectorB.runtime_profile_ref)
      && vectorA.unicode_runtime_digest === vectorB.unicode_runtime_digest;
    if (!sharedBindingsEqual
      || vectorA.project_id !== datasetProject
      || vectorA.target_scope_role !== "target"
      || !refsEqual(vectorA.feature_profile_ref, featureProfileRef)
      || !refsEqual(vectorA.checkpoint_set_ref, preference.payload.feature_source_checkpoint_set_ref)
      || !canonicalEqual(vectorA.feature_order, TASK4_FEATURE_ORDER)
      || !canonicalEqual(vectorB.feature_order, TASK4_FEATURE_ORDER)) {
      fail("ranking_scope_mismatch");
    }
    trainingRows.push({
      example_ref: expectedExampleRef,
      leakage_group_ref: expectedGroupRef,
      candidate_a_ref: candidateA.candidateRef,
      candidate_b_ref: candidateB.candidateRef,
      label: preference.payload.label,
      feature_source_checkpoint_set_ref: preference.payload.feature_source_checkpoint_set_ref,
      project_id: vectorA.project_id,
      context_ref: vectorA.context_ref,
      target_scope_ref: vectorA.target_scope_ref,
      checkpoint_set_ref: vectorA.checkpoint_set_ref,
      feature_profile_ref: vectorA.feature_profile_ref,
      feature_universe_ref: vectorA.feature_universe_ref,
      runtime_profile_ref: vectorA.runtime_profile_ref,
      unicode_runtime_digest: vectorA.unicode_runtime_digest,
      candidate_a_vector_ref: candidateA.vectorRef,
      candidate_b_vector_ref: candidateB.vectorRef,
      candidate_a_values: [...vectorA.values],
      candidate_b_values: [...vectorB.values],
      candidate_a_vector_digest: vectorA.vector_digest,
      candidate_b_vector_digest: vectorB.vector_digest,
    });
  }
  const orderedRowRefs = trainingRows.map((row) => row.example_ref);
  const orderedCandidateVectorRefs = trainingRows.flatMap((row) => [
    row.candidate_a_vector_ref,
    row.candidate_b_vector_ref,
  ]);
  const blocking_only_verification_digest = sha256Canonical({
    contract_version: "contentmd.pairwise-blocking-only-verification/0.1.0",
    ordered_row_refs: orderedRowRefs,
    ordered_candidate_vector_refs: orderedCandidateVectorRefs,
    all_vector_replays_eligible: true,
    all_blocking_evidence_empty: true,
    browser_feature_count: 0,
    competitor_feature_count: 0,
    third_party_label_count: 0,
  });
  const matrix_digest = sha256Canonical({
    contract_version: "contentmd.pairwise-feature-matrix/0.1.0",
    dataset_ref: dataset.dataset_ref,
    feature_profile_ref: featureProfileRef,
    feature_order: TASK4_FEATURE_ORDER,
    training_rows: trainingRows,
    browser_feature_count: 0,
    competitor_feature_count: 0,
    third_party_label_count: 0,
    blocking_only_verification_digest,
  });
  const verification_digest = sha256Canonical({
    contract_version: "contentmd.verified-pairwise-feature-matrix/0.1.0",
    record_mode: "development_fixture",
    dataset_verification_digest: dataset.verification_digest,
    replay: typedReplay,
    matrix_digest,
  });
  if (trainingRows.length === 0) fail("learning_dataset_insufficient");
  const nonemptyTrainingRows = trainingRows as [PairwiseTrainingRow, ...PairwiseTrainingRow[]];
  const verified = task5Immutable({
    contract_version: "contentmd.verified-pairwise-feature-matrix/0.1.0" as const,
    record_mode: "development_fixture" as const,
    dataset_verification_digest: dataset.verification_digest,
    dataset_ref: dataset.dataset_ref,
    replay: typedReplay,
    feature_profile_record: profile,
    feature_order: [...TASK4_FEATURE_ORDER],
    training_rows: nonemptyTrainingRows,
    matrix_digest,
    verification_digest,
    browser_feature_count: 0 as const,
    competitor_feature_count: 0 as const,
    third_party_label_count: 0 as const,
    blocking_only_verification_digest,
  }) as VerifiedPairwiseFeatureMatrix;
  verifiedMatrices.add(verified);
  return verified;
}

export function verifyPairwiseCandidate(
  input: VerifyPairwiseCandidateInput,
): VerifiedPairwiseCandidate {
  task5TopLevelGate(input, ["record_mode", "profile", "replay"]);
  task5AssertClosedDataGraph(input);
  const profileReplay = input.profile as unknown as Record<string, unknown>;
  exactDataKeys(profileReplay, ["contract_version", "profile_input", "expected_profile"]);
  if (profileReplay.contract_version !== "contentmd.pairwise-feature-profile-replay/0.1.0") {
    fail("ranking_input_shape_invalid");
  }
  const vectorReplay = input.replay as unknown as Record<string, unknown>;
  exactDataKeys(vectorReplay, ["contract_version", "vectorization_input", "expected_vector"]);
  if (vectorReplay.contract_version !== "contentmd.pairwise-candidate-vector-replay/0.1.0") {
    fail("ranking_input_shape_invalid");
  }
  const typedProfile = profileReplay as unknown as PairwiseFeatureProfileReplay;
  const typedReplay = vectorReplay as unknown as PairwiseCandidateVectorReplay;
  const profile = task5RunTask4(() => createFeatureProfile(typedProfile.profile_input));
  if (!canonicalEqual(profile, typedProfile.expected_profile)) {
    fail("ranking_feature_profile_mismatch");
  }
  const vectorInput: CandidateVectorizationInput = {
    ...typedReplay.vectorization_input,
    record_mode: "development_fixture",
    profile_input: typedProfile.profile_input,
    profile,
  };
  const replayed = task5RunTask4(() => vectorizeCandidate(vectorInput));
  if (replayed.status !== "eligible") fail("ranking_candidate_ineligible");
  if (!canonicalEqual(replayed.vector, typedReplay.expected_vector)) {
    fail("ranking_reference_invalid");
  }
  if (vectorInput.blocking_evidence.length !== 0
    || vectorInput.rule_evaluations.some(({ eligibility_gate }) =>
      eligibility_gate.hard_rule_status !== "pass"
      || eligibility_gate.prohibited_claim_status !== "clear")) {
    fail("ranking_candidate_ineligible");
  }
  const candidate = vectorInput.candidate;
  if (candidate.payload.expression_digest !== sha256Utf8(candidate.payload.expression)) {
    fail("ranking_digest_invalid");
  }
  const candidateRef: DigestRef = {
    record_id: candidate.snapshot_id,
    schema_id: "contentmd.task2-candidate-snapshot",
    schema_version: "0.1.0",
    content_digest: candidate.snapshot_digest,
  };
  const vectorRef: DigestRef = {
    record_id: replayed.vector.vector_id,
    schema_id: "contentmd.task4-candidate-feature-vector",
    schema_version: "0.1.0",
    content_digest: replayed.vector.vector_digest,
  };
  const identity = {
    contract_version: "contentmd.verified-pairwise-candidate/0.1.0" as const,
    record_mode: "development_fixture" as const,
    profile,
    replay: typedReplay,
    vector_ref: vectorRef,
    candidate_ref: candidateRef,
    expression_digest: candidate.payload.expression_digest,
  };
  const verified = task5Immutable({
    contract_version: identity.contract_version,
    record_mode: identity.record_mode,
    verification_input: input,
    profile,
    replay: typedReplay,
    vector: replayed.vector,
    vector_ref: vectorRef,
    candidate_ref: candidateRef,
    expression_digest: identity.expression_digest,
    verification_digest: sha256Canonical(identity),
  }) as VerifiedPairwiseCandidate;
  verifiedCandidates.add(verified);
  return verified;
}

function task5ErrorShape(code: PairwiseRankingErrorCode): PairwiseRankingErrorShape {
  return {
    code,
    message: `task5_contract_invalid:${code}`,
    retryable: false,
  };
}

const PAIRWISE_HYPERPARAMETERS: ModelHyperparameters = {
  lambda: 1,
  learning_rate: 0.05,
  maximum_iterations: 2000,
  convergence_delta: 1e-9,
  convergence_patience: 10,
  standardized_clip_lower: -10,
  standardized_clip_upper: 10,
};

function trainingFinite(value: number): number {
  if (!Number.isFinite(value)) fail("ranking_training_invalid");
  return value === 0 ? 0 : value;
}

function requiredCodeEntryDigest(
  code: VerifiedPairwiseCodeManifest,
  path: string,
): string {
  const matches = code.manifest.entries.filter((entry) => entry.path === path);
  if (matches.length !== 1) fail("ranking_code_manifest_invalid");
  return matches[0]!.raw_bytes_digest;
}

interface StandardizedTrainingMatrix {
  standardization: [StandardizationEntry, ...StandardizationEntry[]];
  deltas: readonly (readonly number[])[];
}

function standardizeTrainingRows(
  rows: VerifiedPairwiseFeatureMatrix["training_rows"],
): StandardizedTrainingMatrix {
  const standardization: StandardizationEntry[] = [];
  const candidateA: number[][] = rows.map(() => []);
  const candidateB: number[][] = rows.map(() => []);
  for (let featureIndex = 0; featureIndex < TASK4_FEATURE_ORDER.length; featureIndex += 1) {
    const population: number[] = [];
    for (const row of rows) {
      population.push(
        trainingFinite(row.candidate_a_values[featureIndex]!),
        trainingFinite(row.candidate_b_values[featureIndex]!),
      );
    }
    const mean = trainingFinite(kahanSum(population) / population.length);
    const squaredDeviations = population.map((value) => {
      const deviation = trainingFinite(value - mean);
      return trainingFinite(deviation * deviation);
    });
    const variance = trainingFinite(kahanSum(squaredDeviations) / population.length);
    const populationStandardDeviation = trainingFinite(Math.sqrt(variance));
    standardization.push({
      feature_name: TASK4_FEATURE_ORDER[featureIndex]!,
      mean,
      population_standard_deviation: populationStandardDeviation,
    });
    for (const [rowIndex, row] of rows.entries()) {
      const standardize = (value: number): number => {
        if (populationStandardDeviation === 0) return 0;
        const normalized = trainingFinite(
          trainingFinite(value - mean) / populationStandardDeviation,
        );
        return trainingFinite(Math.min(
          PAIRWISE_HYPERPARAMETERS.standardized_clip_upper,
          Math.max(PAIRWISE_HYPERPARAMETERS.standardized_clip_lower, normalized),
        ));
      };
      candidateA[rowIndex]!.push(standardize(row.candidate_a_values[featureIndex]!));
      candidateB[rowIndex]!.push(standardize(row.candidate_b_values[featureIndex]!));
    }
  }
  const deltas = candidateA.map((values, rowIndex) => values.map((value, featureIndex) =>
    trainingFinite(value - candidateB[rowIndex]![featureIndex]!)));
  return {
    standardization: standardization as [StandardizationEntry, ...StandardizationEntry[]],
    deltas,
  };
}

function pairwiseLoss(
  weights: readonly number[],
  deltas: readonly (readonly number[])[],
  labels: readonly (0 | 1)[],
): number {
  const rowLosses: number[] = [];
  for (const [rowIndex, delta] of deltas.entries()) {
    const products = delta.map((value, featureIndex) =>
      trainingFinite(weights[featureIndex]! * value));
    const score = trainingFinite(kahanSum(products));
    rowLosses.push(trainingFinite(
      stableSoftplus(score) - trainingFinite(labels[rowIndex]! * score),
    ));
  }
  const meanRowLoss = trainingFinite(kahanSum(rowLosses) / rowLosses.length);
  const squaredWeights = weights.map((weight) => trainingFinite(weight * weight));
  const regularizer = trainingFinite(
    trainingFinite(PAIRWISE_HYPERPARAMETERS.lambda / 2) * kahanSum(squaredWeights),
  );
  return trainingFinite(meanRowLoss + regularizer);
}

interface PairwiseFitResult {
  weights: readonly number[];
  initialLoss: number;
  finalLoss: number;
  iterationsCompleted: number;
  convergenceStreak: number;
  converged: boolean;
}

function fitPairwiseLogistic(
  deltas: readonly (readonly number[])[],
  labels: readonly (0 | 1)[],
): PairwiseFitResult {
  let weights: number[] = TASK4_FEATURE_ORDER.map(() => 0);
  const initialLoss = pairwiseLoss(weights, deltas, labels);
  let previousLoss = initialLoss;
  let finalLoss = initialLoss;
  let convergenceStreak = 0;
  let iterationsCompleted = 0;
  for (let iteration = 1; iteration <= PAIRWISE_HYPERPARAMETERS.maximum_iterations; iteration += 1) {
    const rowScores = deltas.map((delta) => trainingFinite(kahanSum(
      delta.map((value, featureIndex) => trainingFinite(weights[featureIndex]! * value)),
    )));
    const gradients = TASK4_FEATURE_ORDER.map((_featureName, featureIndex) => {
      const contributions = deltas.map((delta, rowIndex) => trainingFinite(
        trainingFinite(stableSigmoid(rowScores[rowIndex]!) - labels[rowIndex]!)
          * delta[featureIndex]!,
      ));
      const meanGradient = trainingFinite(kahanSum(contributions) / deltas.length);
      return trainingFinite(
        meanGradient + trainingFinite(PAIRWISE_HYPERPARAMETERS.lambda * weights[featureIndex]!),
      );
    });
    const nextWeights = weights.map((weight, featureIndex) => trainingFinite(
      weight - trainingFinite(PAIRWISE_HYPERPARAMETERS.learning_rate * gradients[featureIndex]!),
    ));
    finalLoss = pairwiseLoss(nextWeights, deltas, labels);
    const lossDelta = trainingFinite(Math.abs(trainingFinite(finalLoss - previousLoss)));
    convergenceStreak = lossDelta < PAIRWISE_HYPERPARAMETERS.convergence_delta
      ? convergenceStreak + 1
      : 0;
    weights = nextWeights;
    previousLoss = finalLoss;
    iterationsCompleted = iteration;
    if (convergenceStreak === PAIRWISE_HYPERPARAMETERS.convergence_patience) break;
  }
  return {
    weights,
    initialLoss,
    finalLoss,
    iterationsCompleted,
    convergenceStreak,
    converged: convergenceStreak === PAIRWISE_HYPERPARAMETERS.convergence_patience,
  };
}

function statisticsRef(record: ModelTrainingStatisticsRecord): DigestRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

export function trainPairwiseLogistic(
  request: PairwiseTrainingRequest,
): PairwiseTrainingResult {
  task5TopLevelGate(request, [
    "contract_version", "record_mode", "purpose", "dataset", "feature_matrix",
    "code_manifest", "runtime_profile",
  ]);
  if (request.contract_version !== "contentmd.pairwise-training-request/0.1.0"
    || !["golden_conformance", "diagnostic", "candidate"].includes(request.purpose)) {
    fail("ranking_input_shape_invalid");
  }
  if (!verifiedDatasets.has(request.dataset)) fail("ranking_dataset_state_invalid");
  if (!verifiedMatrices.has(request.feature_matrix)) fail("ranking_reference_invalid");
  if (!verifiedCodeManifests.has(request.code_manifest)) fail("ranking_code_manifest_invalid");
  if (!verifiedRuntimes.has(request.runtime_profile)) {
    fail("ranking_runtime_profile_unsupported");
  }
  const dataset = request.dataset;
  const matrix = request.feature_matrix;
  if (dataset.record_mode !== "development_fixture"
    || matrix.record_mode !== "development_fixture"
    || dataset.dataset_record.payload.dataset_state !== "sealed"
    || dataset.dataset_record.payload.test_open_state !== "sealed") {
    fail("ranking_dataset_state_invalid");
  }
  if (!refsEqual(matrix.dataset_ref, dataset.dataset_ref)
    || matrix.dataset_verification_digest !== dataset.verification_digest) {
    fail("ranking_reference_invalid");
  }
  if (!canonicalEqual(matrix.feature_order, TASK4_FEATURE_ORDER)
    || matrix.training_rows.length === 0
    || matrix.training_rows.some((row) =>
      row.candidate_a_values.length !== TASK4_FEATURE_ORDER.length
      || row.candidate_b_values.length !== TASK4_FEATURE_ORDER.length)) {
    fail("ranking_feature_order_invalid");
  }
  if (matrix.browser_feature_count !== 0
    || matrix.competitor_feature_count !== 0
    || matrix.third_party_label_count !== 0) {
    fail("ranking_source_quarantined");
  }

  const modelSchemaDigest = requiredCodeEntryDigest(
    request.code_manifest,
    "packages/schemas/src/learning-records.schema.json",
  );
  const statisticsSchemaDigest = requiredCodeEntryDigest(
    request.code_manifest,
    "packages/schemas/src/model-training-statistics.schema.json",
  );
  const featureProfileRef = recordRef(matrix.feature_profile_record);
  const trainingInputDigest = sha256Canonical({
    contract_version: "contentmd.pairwise-training-input-preimage/0.1.0",
    record_mode: "development_fixture",
    purpose: request.purpose,
    dataset_ref: dataset.dataset_ref,
    dataset_verification_digest: dataset.verification_digest,
    feature_profile_ref: featureProfileRef,
    feature_matrix_digest: matrix.matrix_digest,
    feature_matrix_verification_digest: matrix.verification_digest,
    ordered_training_example_refs: matrix.training_rows.map((row) => row.example_ref),
    feature_order: TASK4_FEATURE_ORDER,
    hyperparameters: PAIRWISE_HYPERPARAMETERS,
    model_schema_digest: modelSchemaDigest,
    statistics_schema_digest: statisticsSchemaDigest,
    code_digest: request.code_manifest.manifest.manifest_digest,
    code_verification_digest: request.code_manifest.verification_digest,
    runtime_profile_ref: request.runtime_profile.artifact_ref,
    runtime_verification_digest: request.runtime_profile.verification_digest,
    blocking_only_verification_digest: matrix.blocking_only_verification_digest,
    browser_feature_count: 0,
    competitor_feature_count: 0,
    third_party_label_count: 0,
  });

  const standardized = standardizeTrainingRows(matrix.training_rows);
  const fit = fitPairwiseLogistic(
    standardized.deltas,
    matrix.training_rows.map((row) => row.label),
  );
  const coefficientBits = fit.weights.map(binary64ToHex) as [string, ...string[]];
  const featureOrder = [...TASK4_FEATURE_ORDER] as [string, ...string[]];
  const coefficientSetDigest = sha256Canonical({
    contract_version: "contentmd.pairwise-coefficient-set/0.1.0",
    feature_order: featureOrder,
    coefficient_bits: coefficientBits,
  });
  const modelState = fit.converged ? "trained" as const : "nonconverged" as const;
  const statisticsPayload: ModelTrainingStatisticsPayload = {
    contract_version: "contentmd.model-training-statistics/0.1.0",
    record_mode: "development_fixture",
    ranking_objective: "expression_preference",
    candidate_kind: "expression",
    schema_digest: statisticsSchemaDigest,
    dataset_ref: dataset.dataset_ref,
    feature_profile_ref: featureProfileRef,
    purpose: request.purpose,
    training_input_digest: trainingInputDigest,
    code_digest: request.code_manifest.manifest.manifest_digest,
    runtime_profile_ref: request.runtime_profile.artifact_ref,
    pair_count: matrix.training_rows.length,
    feature_count: 21,
    iterations_completed: fit.iterationsCompleted,
    convergence_streak: fit.convergenceStreak,
    converged: fit.converged,
    initial_loss_bits: binary64ToHex(fit.initialLoss),
    final_loss_bits: binary64ToHex(fit.finalLoss),
    coefficient_set_digest: coefficientSetDigest,
    statistics_state: fit.converged ? "completed" : "nonconverged",
    invalid_stage: null,
    error_code: fit.converged ? null : "ranking_training_nonconverged",
    authority_effect: "none",
  };
  const statisticsRecord = finalizeRecord({
    record_id: `model_training_statistics.${sha256Canonical(statisticsPayload).slice(0, 32)}`,
    schema_id: "contentmd.model-training-statistics-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: structuredClone(dataset.dataset_record.scope),
    provenance: [
      {
        record_id: dataset.dataset_ref.record_id,
        relationship: "trained_from_dataset",
        content_digest: dataset.dataset_ref.content_digest,
      },
      {
        record_id: featureProfileRef.record_id,
        relationship: "used_feature_profile",
        content_digest: featureProfileRef.content_digest,
      },
    ],
    lifecycle_state: "active",
    payload: statisticsPayload,
  }) as ModelTrainingStatisticsRecord;
  const trainingStatisticsRef = statisticsRef(statisticsRecord);
  const modelArtifactDigest = sha256Canonical({
    contract_version: "contentmd.ranking-model-artifact-preimage/0.1.0",
    record_mode: "development_fixture",
    ranking_objective: "expression_preference",
    candidate_kind: "expression",
    schema_digest: modelSchemaDigest,
    authority_effect: "none",
    algorithm: "pairwise_logistic_l2",
    dataset_ref: dataset.dataset_ref,
    feature_profile_ref: featureProfileRef,
    hyperparameters: PAIRWISE_HYPERPARAMETERS,
    feature_order: featureOrder,
    standardization: standardized.standardization,
    coefficient_bits: coefficientBits,
    coefficient_set_digest: coefficientSetDigest,
    training_statistics_ref: trainingStatisticsRef,
    runtime_profile_ref: request.runtime_profile.artifact_ref,
    code_digest: request.code_manifest.manifest.manifest_digest,
    input_digest: trainingInputDigest,
    model_state: modelState,
  });
  const modelRecord = finalizeRecord({
    record_id: `ranking_model.${modelArtifactDigest.slice(0, 32)}`,
    schema_id: "contentmd.ranking-model-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: structuredClone(dataset.dataset_record.scope),
    provenance: [
      {
        record_id: statisticsRecord.record_id,
        relationship: "has_training_statistics",
        content_digest: statisticsRecord.content_digest,
      },
      {
        record_id: dataset.dataset_ref.record_id,
        relationship: "trained_from_dataset",
        content_digest: dataset.dataset_ref.content_digest,
      },
      {
        record_id: featureProfileRef.record_id,
        relationship: "used_feature_profile",
        content_digest: featureProfileRef.content_digest,
      },
    ],
    lifecycle_state: "proposed",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: modelSchemaDigest,
      code_digest: request.code_manifest.manifest.manifest_digest,
      input_digest: trainingInputDigest,
      authority_effect: "none",
      algorithm: "pairwise_logistic_l2",
      dataset_ref: dataset.dataset_ref,
      feature_profile_ref: featureProfileRef,
      hyperparameters: PAIRWISE_HYPERPARAMETERS,
      feature_order: featureOrder,
      standardization: standardized.standardization,
      coefficient_bits: coefficientBits,
      training_statistics_ref: trainingStatisticsRef,
      runtime_profile_ref: request.runtime_profile.artifact_ref,
      model_artifact_digest: modelArtifactDigest,
      model_state: modelState,
    },
  }) as RankingModelRecord;
  const immutableResult = task5Immutable({
    state: modelState,
    statistics_record: statisticsRecord,
    model_record: modelRecord,
    ...(fit.converged ? {} : { error: task5ErrorShape("ranking_training_nonconverged") }),
  });
  return immutableResult as PairwiseTrainingResult;
}

export function verifyRankingModel(
  record: RankingModelRecord,
  dependencies: RankingModelDependencies,
): VerifiedRankingModel {
  try {
    if (dependencies === null || typeof dependencies !== "object" || Array.isArray(dependencies)) {
      fail("ranking_input_shape_invalid");
    }
    exactDataKeys(dependencies as unknown as Record<string, unknown>, ["training_request"]);
    const replay = trainPairwiseLogistic(dependencies.training_request);
    if (replay.state === "invalid") fail("ranking_model_invalid");
    if (!canonicalEqual(record, replay.model_record)) fail("ranking_model_invalid");
    if (replay.state === "nonconverged") fail("ranking_model_quarantined");
    const modelRef = recordRef(replay.model_record);
    const trainingStatisticsRef = statisticsRef(replay.statistics_record);
    if (!refsEqual(record.payload.training_statistics_ref, trainingStatisticsRef)) {
      fail("ranking_model_invalid");
    }
    const deterministicReplayDigest = sha256Canonical({
      contract_version: "contentmd.ranking-model-deterministic-replay/0.1.0",
      training_input_digest: replay.model_record.payload.input_digest,
      statistics_record: replay.statistics_record,
      model_record: replay.model_record,
    });
    const verificationDigest = sha256Canonical({
      contract_version: "contentmd.verified-ranking-model/0.1.0",
      model_ref: modelRef,
      training_input_digest: replay.model_record.payload.input_digest,
      statistics_ref: trainingStatisticsRef,
      coefficient_set_digest: replay.statistics_record.payload.coefficient_set_digest,
      code_verification_digest: dependencies.training_request.code_manifest.verification_digest,
      runtime_verification_digest: dependencies.training_request.runtime_profile.verification_digest,
      deterministic_replay_digest: deterministicReplayDigest,
    });
    const authenticatedTrainingRequest = Object.freeze({
      contract_version: dependencies.training_request.contract_version,
      record_mode: dependencies.training_request.record_mode,
      purpose: dependencies.training_request.purpose,
      dataset: dependencies.training_request.dataset,
      feature_matrix: dependencies.training_request.feature_matrix,
      code_manifest: dependencies.training_request.code_manifest,
      runtime_profile: dependencies.training_request.runtime_profile,
    });
    const verified = Object.freeze({
      record: replay.model_record,
      training_request: authenticatedTrainingRequest,
      feature_order: TASK4_FEATURE_ORDER,
      standardization: replay.model_record.payload.standardization,
      coefficient_bits: replay.model_record.payload.coefficient_bits,
      verification_digest: verificationDigest,
    }) as VerifiedRankingModel;
    verifiedModels.add(verified);
    return verified;
  } catch (error) {
    if (error instanceof PairwiseRankingError) throw error;
    return fail("ranking_model_invalid");
  }
}

export function task5RequireVerifiedRankingModel(
  model: VerifiedRankingModel,
): VerifiedRankingModel {
  if (!verifiedModels.has(model)) fail("ranking_model_invalid");
  return model;
}

export function task5ReauthenticatePairwiseCandidate(
  candidate: VerifiedPairwiseCandidate,
): VerifiedPairwiseCandidate {
  if (!verifiedCandidates.has(candidate)) fail("ranking_candidate_ineligible");
  const replayed = verifyPairwiseCandidate(candidate.verification_input);
  if (!canonicalEqual(replayed, candidate)) fail("ranking_reference_invalid");
  return replayed;
}
