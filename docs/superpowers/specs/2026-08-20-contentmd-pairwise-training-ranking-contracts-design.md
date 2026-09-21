---
title: "content.md Pairwise Training and Ranking Contracts 0.1"
status: approved-for-implementation
created: 2026-08-20
updated: 2026-08-20
design_id: CONTENTMD-PAIRWISE-TRAINING-RANKING-CONTRACTS-0.1
parent_design_id: CONTENTMD-LIVE-INTELLIGENCE-LEARNING-0.1
approval_basis: approved-parent-design-and-explicit-continuation
implementation_authority: bounded-local-implementation
authority_effect: implementation-within-written-scope
source_documents:
  - docs/superpowers/specs/2026-08-20-contentmd-live-intelligence-learning-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-learning-record-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-leakage-dataset-contracts-design.md
  - docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md
  - docs/superpowers/plans/2026-08-20-contentmd-recursive-learning-ranking.md
---

# content.md Pairwise Training and Ranking Contracts 0.1

## 1. Purpose and boundary

This addendum freezes the executable contract for Recursive Learning Task 5. It resolves the public API, complete resolver-free upstream replay, numeric representation and operation order, one-to-one feature handling and standardization, training and ranking behavior, model and statistics identity, runtime admission, error precedence, record issuance, quarantine, and golden verification for the deterministic expression-preference ranker.

This document is additive except for the explicit Task 1 `coefficient_bits` schema correction in section 7.1, the sharpened `model_artifact_digest` preimage in section 7.5, and the Task 3 authority-cycle correction required by section 3 replay. That correction preserves two independently verified layers: checkpointed product-policy authority is frozen before presentation and has no learning authority, while the later Task 2 permission/check replay separately authorizes the learning example and covers the resolved subjects and rights. Task 5 otherwise consumes Task 3 and Task 4 through their independently verified, immutable outputs. It does not access a browser, competitor source, provider, network, credential, live store, clock, random source, test split, promotion, deployment, or product mutation.

Version 0.1 supports only:

- `ranking_objective: "expression_preference"`;
- `candidate_kind: "expression"`;
- `algorithm: "pairwise_logistic_l2"`; and
- already hard-eligible project-authored or generated project expressions.

Version 0.1 is `development_fixture`-only. Every mode-bearing public Task 5 API descriptor-validates only the top-level mode field first and throws `ranking_official_mode_not_supported` for `official` before reading any other nested value. It cannot issue or verify an official dataset handoff, matrix, candidate, statistics record, model, prediction, or rank result. Official fitting and inference require later Task 3 and Task 4 contracts with authenticated official resolvers and are outside this version.

## 2. Files, package boundary, and dependencies

Task 5 owns:

- `packages/learning/src/numeric.ts` — finite binary64 primitives only;
- `packages/learning/src/pairwise-logistic.ts` — handoff validation, standardization, fitting, statistics, model issuance, model verification, and pairwise prediction;
- `packages/learning/src/rank.ts` — verified candidate scoring and deterministic ordering;
- `packages/learning/src/pairwise-release-profile.ts` — generated release-owned code-manifest and runtime-profile digest constants;
- `packages/schemas/src/learning-records.schema.json` — removal of `coefficient_bits.uniqueItems` only;
- `packages/schemas/src/model-training-statistics.schema.json` — the auxiliary statistics-record schema;
- `packages/schemas/src/schema-registry.ts` and its focused registry test;
- the Task 5 numeric, fitter, rank, and existing learning-record tests;
- `scripts/verify-pairwise-code-manifest.mjs` — bounded local raw-byte release check;
- `fixtures/learning-ranking/pairwise-training-code-manifest.json`;
- `fixtures/learning-ranking/golden-model.json` and its noncircular `golden-model.sha256` lock; and
- the Task 5 exports added to `packages/learning/src/index.ts`.

No new third-party runtime dependency is permitted. Runtime code may use `@contentmd/core`, existing Task 1 learning-record types, ECMAScript `Number`, `Math.exp`, `Math.log1p`, `Math.sqrt`, `DataView`, typed arrays used only as byte containers, and Node's existing SHA-256/canonical helpers. It may not use a BLAS library, native addon, WebAssembly, GPU, worker, locale-sensitive collation, host normalization, seeded or unseeded randomness, or a model/provider SDK.

Task 5 calls only the committed Task 3 `buildLearningDataset()` and `sealLearningDataset()` functions and the committed Task 4 `createFeatureProfile()` and `vectorizeCandidate()` functions through the complete replay adapters in section 3. Their complete build, seal, producer, dependency, Unicode, checkpoint, profile, vectorization, rule, gate, and evidence inputs travel with the Task 5 handoff. A hash change in a bound Task 3 or Task 4 producer/dependency witness invalidates the corresponding verification digest and the Task 5 golden. Task 5 may not accept a bare record, vector, ref, digest, receipt, `verified` boolean, or moving object as a substitute.

## 3. Exact public API and closed handoff

`packages/learning/src/index.ts` exports exactly the public values and types named in this section plus `PairwiseRankingError`, `PairwiseRankingErrorCode`, and `PairwiseRankingErrorShape` defined in section 9. `numeric.ts` helpers are exported because the independent verifier and golden tests use the same stable seam. No other Task 5 symbol is public.

```ts
type Digest = string; // 64 lowercase hexadecimal characters
type Binary64Hex = string; // 16 lowercase hexadecimal characters
type Task5RecordMode = "development_fixture" | "official";

type PairwiseFeatureOrder = readonly [
  "project_match",
  "product_area_match",
  "journey_state_match",
  "channel_match",
  "locale_match",
  "risk_match",
  "required_fact_coverage",
  "required_fact_coverage_missing",
  "recovery_action_coverage",
  "recovery_action_coverage_missing",
  "approved_terminology_ratio",
  "approved_terminology_ratio_missing",
  "contextual_entity_coverage",
  "contextual_entity_coverage_missing",
  "contextual_action_coverage",
  "contextual_action_coverage_missing",
  "supporting_evidence_coverage",
  "supporting_evidence_coverage_missing",
  "generic_language_density",
  "length_distance",
  "length_distance_missing"
];

interface DatasetSealReplay {
  producer: SealLearningDatasetInput["producer"];
  witness: SealLearningDatasetInput["witness"];
}

interface LearningDatasetTrainingReplay {
  contract_version: "contentmd.learning-dataset-training-replay/0.1.0";
  build_input: BuildLearningDatasetInput;
  seal: DatasetSealReplay;
  expected_dataset_record: LearningDatasetManifest;
}

interface VerifyLearningDatasetForTrainingInput {
  record_mode: Task5RecordMode;
  replay: LearningDatasetTrainingReplay;
}

interface PairwiseFeatureProfileReplay {
  contract_version: "contentmd.pairwise-feature-profile-replay/0.1.0";
  profile_input: CreateFeatureProfileInput;
  expected_profile: FeatureProfile;
}

interface PairwiseCandidateVectorReplay {
  contract_version: "contentmd.pairwise-candidate-vector-replay/0.1.0";
  vectorization_input: Omit<CandidateVectorizationInput, "record_mode" | "profile" | "profile_input">;
  expected_vector: CandidateFeatureVector;
}

interface PairwiseTrainingRowReplay {
  example_ref: DigestRef;
  leakage_group_ref: DigestRef;
  label: 0 | 1;
  candidate_a: PairwiseCandidateVectorReplay;
  candidate_b: PairwiseCandidateVectorReplay;
}

interface PairwiseFeatureMatrixReplay {
  contract_version: "contentmd.pairwise-feature-matrix-replay/0.1.0";
  profile: PairwiseFeatureProfileReplay;
  rows: readonly [PairwiseTrainingRowReplay, ...PairwiseTrainingRowReplay[]];
}

interface VerifyPairwiseFeatureMatrixInput {
  record_mode: Task5RecordMode;
  dataset: VerifiedLearningDatasetForTraining;
  replay: PairwiseFeatureMatrixReplay;
}

interface VerifyPairwiseCandidateInput {
  record_mode: Task5RecordMode;
  profile: PairwiseFeatureProfileReplay;
  replay: PairwiseCandidateVectorReplay;
}

interface PairwiseTrainingRow {
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
  unicode_runtime_digest: Digest;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  candidate_a_values: readonly number[];
  candidate_b_values: readonly number[];
  candidate_a_vector_digest: Digest;
  candidate_b_vector_digest: Digest;
}

interface VerifiedLearningDatasetForTraining {
  readonly contract_version: "contentmd.verified-learning-dataset/0.1.0";
  readonly record_mode: "development_fixture";
  readonly replay: LearningDatasetTrainingReplay;
  readonly replayed_build_result: LearningDatasetBuildResult & {
    manifest: LearningDatasetManifest;
  };
  readonly dataset_record: LearningDatasetManifest;
  readonly dataset_ref: DigestRef;
  readonly verification_digest: Digest;
}

interface VerifiedPairwiseFeatureMatrix {
  readonly contract_version: "contentmd.verified-pairwise-feature-matrix/0.1.0";
  readonly record_mode: "development_fixture";
  readonly dataset_verification_digest: Digest;
  readonly dataset_ref: DigestRef;
  readonly replay: PairwiseFeatureMatrixReplay;
  readonly feature_profile_record: FeatureProfile;
  readonly feature_order: PairwiseFeatureOrder;
  readonly training_rows: readonly [PairwiseTrainingRow, ...PairwiseTrainingRow[]];
  readonly matrix_digest: Digest;
  readonly verification_digest: Digest;
  readonly browser_feature_count: 0;
  readonly competitor_feature_count: 0;
  readonly third_party_label_count: 0;
  readonly blocking_only_verification_digest: Digest;
}

interface PairwiseCodeManifest {
  contract_version: "contentmd.pairwise-code-manifest/0.1.0";
  package_id: "@contentmd/learning";
  package_version: "0.1.0";
  entries: readonly CodeManifestEntry[];
  manifest_digest: Digest;
}

interface CodeManifestEntry {
  path: string;
  raw_bytes_digest: Digest;
  byte_count: number;
}

interface PairwiseRuntimeProfile {
  contract_version: "contentmd.pairwise-runtime-profile/0.1.0";
  node_version: "24.20.0";
  v8_version: string;
  icu_version: string;
  unicode_version: string;
  platform: string;
  architecture: string;
  endianness: "LE" | "BE";
  profile_digest: Digest;
}

interface VerifiedPairwiseCodeManifest {
  readonly manifest: PairwiseCodeManifest;
  readonly verification_digest: Digest;
}

interface VerifiedPairwiseRuntime {
  readonly profile: PairwiseRuntimeProfile;
  readonly artifact_ref: ArtifactRef;
  readonly verification_digest: Digest;
}

interface PairwiseTrainingRequest {
  contract_version: "contentmd.pairwise-training-request/0.1.0";
  record_mode: Task5RecordMode;
  purpose: "golden_conformance" | "diagnostic" | "candidate";
  dataset: VerifiedLearningDatasetForTraining;
  feature_matrix: VerifiedPairwiseFeatureMatrix;
  code_manifest: VerifiedPairwiseCodeManifest;
  runtime_profile: VerifiedPairwiseRuntime;
}

type PairwiseTrainingResult =
  | {
      state: "trained";
      statistics_record: ModelTrainingStatisticsRecord;
      model_record: RankingModelRecord;
    }
  | {
      state: "nonconverged";
      statistics_record: ModelTrainingStatisticsRecord;
      model_record: RankingModelRecord;
      error: PairwiseRankingErrorShape;
    }
  | {
      state: "invalid";
      statistics_record: ModelTrainingStatisticsRecord | null;
      model_record: null;
      error: PairwiseRankingErrorShape;
    };

interface VerifiedPairwiseCandidate {
  readonly contract_version: "contentmd.verified-pairwise-candidate/0.1.0";
  readonly record_mode: "development_fixture";
  readonly verification_input: VerifyPairwiseCandidateInput;
  readonly profile: FeatureProfile;
  readonly replay: PairwiseCandidateVectorReplay;
  readonly vector: CandidateFeatureVector;
  readonly vector_ref: DigestRef;
  readonly candidate_ref: DigestRef;
  readonly expression_digest: Digest;
  readonly verification_digest: Digest;
}

interface PairwisePrediction {
  contract_version: "contentmd.pairwise-prediction/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  model_ref: DigestRef;
  model_verification_digest: Digest;
  feature_profile_ref: DigestRef;
  project_id: string;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  checkpoint_set_ref: DigestRef;
  feature_universe_ref: DigestRef;
  feature_runtime_profile_ref: ArtifactRef;
  pairwise_runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  candidate_a_verification_digest: Digest;
  candidate_b_verification_digest: Digest;
  score_delta_bits: Binary64Hex;
  unclipped_probability_bits: Binary64Hex;
  probability_bits: Binary64Hex;
  probability: number;
  input_digest: Digest;
  prediction_digest: Digest;
}

interface RankedCandidate {
  candidate_ref: DigestRef;
  expression_digest: Digest;
  vector_ref: DigestRef;
  vector_digest: Digest;
  candidate_verification_digest: Digest;
  score_bits: Binary64Hex;
  original_index: number;
  final_rank: number;
}

interface PairwiseRankTieCandidate {
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  expression_digest: Digest;
}

interface PairwiseRankTieBucket {
  score_bits: Binary64Hex;
  candidates: readonly [PairwiseRankTieCandidate, ...PairwiseRankTieCandidate[]];
}

interface PairwiseRankTieTrace {
  contract_version: "contentmd.pairwise-rank-tie-trace/0.1.0";
  buckets: readonly [PairwiseRankTieBucket, ...PairwiseRankTieBucket[]];
  trace_digest: Digest;
}

interface PairwiseRankResult {
  contract_version: "contentmd.pairwise-rank-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  model_ref: DigestRef;
  model_verification_digest: Digest;
  feature_profile_ref: DigestRef;
  project_id: string;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  checkpoint_set_ref: DigestRef;
  feature_universe_ref: DigestRef;
  feature_runtime_profile_ref: ArtifactRef;
  pairwise_runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: Digest;
  ordered_candidates: readonly [RankedCandidate, ...RankedCandidate[]];
  tie_trace: PairwiseRankTieTrace;
  input_digest: Digest;
  output_digest: Digest;
}

interface RankingModelDependencies {
  training_request: PairwiseTrainingRequest;
}

interface VerifiedRankingModel {
  readonly record: RankingModelRecord;
  readonly training_request: PairwiseTrainingRequest;
  readonly feature_order: PairwiseFeatureOrder;
  readonly standardization: readonly StandardizationEntry[];
  readonly coefficient_bits: readonly Binary64Hex[];
  readonly verification_digest: Digest;
}
```

`verifyLearningDatasetForTraining()` performs the top-level mode gate and calls `buildLearningDataset(replay.build_input)`. The internally derived result must contain a non-null manifest and satisfy every exact Task 3 training threshold; this is identical for `golden_conformance`, `diagnostic`, and `candidate` because Task 3 cannot seal a diagnostics-only manifest. A below-threshold build fails `learning_dataset_insufficient` before seal replay. The verifier then constructs `SealLearningDatasetInput` itself as `{record_mode: "development_fixture", producer: replay.seal.producer, source_manifest: replayed_build_result.manifest, witness: replay.seal.witness}`; callers cannot duplicate or substitute `source_manifest`. Calling `sealLearningDataset()` on that derived input must equal `expected_dataset_record` byte-for-byte. The final record uses `development_fixture`, state `sealed`, and `test_open_state: "sealed"`; its exact train refs are nonempty. The complete build input, internally replayed complete build result, seal fragment, derived seal input, and final output remain bound by the token. Its `dataset_ref` is the exact four-field ref of the final record. Its verification digest is:

```text
sha256Canonical({
  contract_version: "contentmd.verified-learning-dataset/0.1.0",
  record_mode: "development_fixture",
  replay,
  replayed_build_result,
  derived_seal_input,
  dataset_ref
})
```

`verifyPairwiseFeatureMatrix()` reruns the dataset token's WeakSet-backed verification, calls `createFeatureProfile(replay.profile.profile_input)`, and requires byte equality with `expected_profile`. The profile equals the dataset project and every replayed vector profile. Rows equal the sealed manifest's stored `train_example_refs` position-for-position: one row per train ref, no independent resort, validation/test ref, omission, addition, or duplicate. For each row the verifier locates the complete admitted Task 3 subject in `dataset.replay.build_input.leakage_evidence.subjects`, whose admission is reproduced by `dataset.replayed_build_result`, and derives the label, candidate A/B refs and complete candidate snapshots, unique train leakage-group ref, and feature-source checkpoint ref; no row field is treated as an assertion. It injects the one top-level replay's exact `{record_mode: "development_fixture", profile_input: replay.profile.profile_input, profile: expected_profile}` into each closed `vectorization_input`, calls `vectorizeCandidate()`, requires `status: "eligible"`, and requires `result.vector` byte-equal to `expected_vector`. A row never duplicates or overrides that profile construction input. Both candidates' complete snapshots equal the exact Task 3 subject snapshots. Their vectorization inputs have empty blocking evidence and their complete gate replay is pass/clear. A/B vectors bind the same project, context, target scope/role, checkpoint, feature universe, Task 4 feature-runtime profile, and Unicode runtime; the checkpoint equals the preference record's checkpoint. The exact Task 4 auxiliary vector ref is `{record_id: vector_id, schema_id: "contentmd.task4-candidate-feature-vector", schema_version: "0.1.0", content_digest: vector_digest}`.

Task 5 does not create a second feature-vector identity. `feature_order` and each value array equal the Task 4 vector's exact 21-position tuple byte-for-byte. The matrix digest is:

```text
sha256Canonical({
  contract_version: "contentmd.pairwise-feature-matrix/0.1.0",
  dataset_ref,
  feature_profile_ref,
  feature_order,
  training_rows,
  browser_feature_count: 0,
  competitor_feature_count: 0,
  third_party_label_count: 0,
  blocking_only_verification_digest
})
```

`training_rows` in that preimage includes every field in `PairwiseTrainingRow`, including values, full Task 4 vector refs/digests, and all shared scope/runtime bindings. `ordered_row_refs` is exactly `training_rows.map((row) => row.example_ref)`. `ordered_candidate_vector_refs` is exactly `training_rows.flatMap((row) => [row.candidate_a_vector_ref, row.candidate_b_vector_ref])`, preserving row order and A-before-B order. `blocking_only_verification_digest` is SHA-256 over canonical JSON of `{contract_version: "contentmd.pairwise-blocking-only-verification/0.1.0", ordered_row_refs, ordered_candidate_vector_refs, all_vector_replays_eligible: true, all_blocking_evidence_empty: true, browser_feature_count: 0, competitor_feature_count: 0, third_party_label_count: 0}`. The matrix verification digest is SHA-256 over canonical JSON of `{contract_version: "contentmd.verified-pairwise-feature-matrix/0.1.0", record_mode: "development_fixture", dataset_verification_digest, replay, matrix_digest}`.

`verifyPairwiseCandidate()` calls `createFeatureProfile(input.profile.profile_input)`, requires byte equality with `expected_profile`, injects that one exact profile input, the derived profile, and `development_fixture` into the complete vectorization input, and calls `vectorizeCandidate()`. The candidate replay cannot carry a duplicate `profile_input`, so no row-local profile override or quadratic serialization exists. It requires `status: "eligible"`, requires `result.vector` byte-equal to `expected_vector`, requires empty blocking evidence, and requires every complete gate pass/clear. It derives the expression digest from the complete candidate snapshot, rechecks it against the expression bytes, and returns the exact Task 4 vector/ref. Its verification digest is SHA-256 over canonical JSON of `{contract_version: "contentmd.verified-pairwise-candidate/0.1.0", record_mode: "development_fixture", profile, replay, vector_ref, candidate_ref, expression_digest}`. No caller-supplied eligibility, copying, currentness, ownership, scope, or provenance state exists in this input. Task 4's complete hard-rule and blocking-evidence replay is the sole v0.1 candidate gate; no unsupported copying or ownership verdict is invented.

The code-manifest token's `verification_digest` is SHA-256 over canonical JSON of `{contract_version: "contentmd.pairwise-code-verification/0.1.0", manifest_digest, manifest_raw_bytes_digest, release_profile_contract_digest}`. The runtime token's digest is SHA-256 over canonical JSON of `{contract_version: "contentmd.pairwise-runtime-verification/0.1.0", profile_digest, artifact_ref, observed_node_version, observed_v8_version, observed_icu_version, observed_unicode_version, observed_platform, observed_architecture, observed_endianness}`. The model token's digest is SHA-256 over canonical JSON of `{contract_version: "contentmd.verified-ranking-model/0.1.0", model_ref, training_input_digest, statistics_ref, coefficient_set_digest, code_verification_digest, runtime_verification_digest, deterministic_replay_digest}`. Every named value is derived by the fresh replay in section 7.5; `training_input_digest` is the exact section 7.5 digest and transitively binds the complete serializable dataset, matrix, code, and runtime replay inputs through their verification digests.

The public functions are exactly:

```ts
binary64ToHex(value: number): Binary64Hex;
binary64FromHex(bits: Binary64Hex): number;
kahanSum(values: readonly number[]): number;
stableSigmoid(value: number): number;
stableSoftplus(value: number): number;

verifyPairwiseCodeManifest(manifest: PairwiseCodeManifest): VerifiedPairwiseCodeManifest;
admitPairwiseRuntime(profile: PairwiseRuntimeProfile): VerifiedPairwiseRuntime;
verifyLearningDatasetForTraining(input: VerifyLearningDatasetForTrainingInput): VerifiedLearningDatasetForTraining;
verifyPairwiseFeatureMatrix(input: VerifyPairwiseFeatureMatrixInput): VerifiedPairwiseFeatureMatrix;
verifyPairwiseCandidate(input: VerifyPairwiseCandidateInput): VerifiedPairwiseCandidate;
trainPairwiseLogistic(request: PairwiseTrainingRequest): PairwiseTrainingResult;
verifyRankingModel(record: RankingModelRecord, dependencies: RankingModelDependencies): VerifiedRankingModel;
predictPairwise(model: VerifiedRankingModel, candidateA: VerifiedPairwiseCandidate, candidateB: VerifiedPairwiseCandidate): PairwisePrediction;
rankEligibleExpressions(model: VerifiedRankingModel, candidates: readonly [VerifiedPairwiseCandidate, ...VerifiedPairwiseCandidate[]]): PairwiseRankResult;
```

`VerifiedLearningDatasetForTraining`, `VerifiedPairwiseFeatureMatrix`, `VerifiedPairwiseCandidate`, `VerifiedPairwiseCodeManifest`, `VerifiedPairwiseRuntime`, and `VerifiedRankingModel` are opaque, frozen values authenticated by module-private `WeakSet` membership; no symbol or enumerable brand participates in canonical data. A structural cast or direct-package import does not create one. Reconstructing serialized upstream dataset, matrix, or candidate data always uses the three replay verifiers above; serialized code and runtime data use `verifyPairwiseCodeManifest()` and `admitPairwiseRuntime()`. Input objects and every nested object must be plain closed data objects with enumerable data properties; accessors, proxies that fail descriptor inspection, symbols, sparse arrays, cycles, aliases that create mutable shared state, and unknown keys fail before arithmetic. A verified `contentmd.canonical-dag/0.1.0` decoder may reconstruct repeated canonical subtrees as shared object identities only when the complete shared subtree is recursively frozen. The closed-graph verifier must reject a cycle and every repeated object whose complete subtree is not frozen; it must accept the recursively frozen sharing without treating the alias itself as mutable input.

## 4. Binary64 and deterministic numeric primitives

All arithmetic uses ECMAScript binary64. Inputs must be primitive finite numbers. NaN, either infinity, boxed numbers, and a non-number fail. Subnormal values are preserved; code must not flush, round, quantize, or replace them.

Every exact zero is canonicalized to positive zero before storage, hashing, bit encoding, comparison, or return. A supplied negative zero is rejected at a public boundary. Arithmetic that produces negative zero is converted to positive zero immediately. Coefficient bits may therefore never be `8000000000000000`.

`binary64ToHex` writes one finite canonical-zero value with `DataView.setFloat64(0, value, false)` and emits bytes `0` through `7` as two lowercase hexadecimal characters each. The encoding is big-endian network order. `binary64FromHex` performs the inverse with `getFloat64(0, false)` and rejects malformed, non-finite, or negative-zero encodings. Thus positive one is `3ff0000000000000`, positive zero is `0000000000000000`, and the smallest positive subnormal is `0000000000000001`.

`kahanSum` is the classic algorithm, not Neumaier summation:

```text
sum = +0
compensation = +0
for value in the already frozen order:
  y = value - compensation
  t = sum + y
  compensation = (t - sum) - y
  sum = t
return canonical_positive_zero(sum)
```

Every intermediate is checked for finiteness. `stableSigmoid(z)` is `1 / (1 + exp(-z))` when `z >= 0`, otherwise `exp(z) / (1 + exp(z))`. `stableSoftplus(z)` is `z + log1p(exp(-z))` when `z > 0`, otherwise `log1p(exp(z))`. These functions do not clip. The prediction API applies clipping after sigmoid.

Repository `canonicalJson()` and `sha256Canonical()` are authoritative for every canonical object and digest preimage, including their committed object-key ordering implementation. Task 5 does not replace or reinterpret that helper, even though the committed helper currently uses `localeCompare("en")` for object keys; its raw bytes are bound by the code manifest and its ICU behavior by the runtime profile. Raw UTF-8 byte comparison applies only to semantic arrays and sets that this contract explicitly says to sort, such as manifest paths, provenance, and expression-digest tie keys. Stored training-row order is preserved and is not independently resorted. A host sort's stability is never relied upon; a final unique key is always present or duplicate keys are rejected.

## 5. One-to-one Task 4 features and standardization

Task 5 consumes the exact Task 4 `CandidateFeatureVector` and its exact 21-position `feature_order`; it performs no feature expansion. The complete Task 4 FeatureProfile must contain the exact definitions and positions frozen in the Task 4 contract. Positions are unique contiguous integers `0..20`, names equal `PairwiseFeatureOrder`, and each replayed vector's order and values are byte-equal to that profile. The seven explicit `*_missing` boolean features already represent nullable-source missingness. Task 5 never adds a second missing-indicator dimension, creates a one-hot dimension, interprets a transformation string as a domain, or hashes a replacement dimension ID.

Every vector has exactly 21 primitive finite values. Boolean and explicit missing-indicator positions are exactly `0` or `1`; number positions are in `[0,1]`. Each nullable value/missing-indicator pair obeys Task 4 exactly: missing means value `0` and indicator `1`; applicable means indicator `0`. These domains are re-established by the complete `vectorizeCandidate()` replay, not accepted from the stored values alone.

For `N` nonempty training pairs and each of the 21 positions, the standardization population is the `2N` values in canonical row order, candidate `A` then candidate `B`. The parent design's divisor `n` means this exact `2N` scalar count. Every position, including booleans and explicit missing indicators, is standardized.

For each position in `PairwiseFeatureOrder`:

1. compute `mean = kahanSum(values) / (2N)`;
2. compute each deviation once as `value - mean`;
3. compute `variance = kahanSum(deviation * deviation) / (2N)`;
4. compute `population_standard_deviation = Math.sqrt(variance)`;
5. canonicalize every exact zero to positive zero; and
6. reject any non-finite intermediate or a variance below zero.

For each candidate value, a zero standard deviation maps to positive zero. Otherwise compute `(value - mean) / population_standard_deviation`, then clip that candidate value to `[-10, 10]`. Candidate `A` and `B` are standardized and clipped independently; only then compute `delta = standardized_A - standardized_B`. The delta is not clipped again. Swapping candidates therefore negates the exact 21-position sequence apart from canonical positive zero.

The model stores exactly 21 `StandardizationEntry` values in `PairwiseFeatureOrder`; `standardization[i].feature_name === feature_order[i]`. The parsed binary64 values of `mean` and `population_standard_deviation` are authoritative; negative zero is forbidden, and repository canonical JSON is the authoritative decimal serialization. Validation, test, shadow, benchmark, and inference reuse these training-frozen values and never recompute statistics. The Task 5 training request contains no validation or test vector.

## 6. Exact training loop

Training rows retain the sealed dataset's exact stored `train_example_refs` order. The Task 3 producer has already canonicalized that semantic ref array; Task 5 neither resorts it nor trusts caller order. Duplicate example refs, candidates with equal refs, a label inconsistent with the replayed Task 2 preference record, a row absent from the train set, or any validation/test member fails before fitting. Candidate sides are never rewritten into winner-first order.

Let `d_i` be the standardized-and-clipped `A - B` vector and `y_i` the stored label. All weights start at positive zero. The fixed hyperparameters are exactly those in the Task 1 `ModelHyperparameters` contract.

Define `loss(w)` in this order:

1. for each row, compute `z_i = kahanSum(w_j * d_ij)` in `feature_order`;
2. compute the row loss as `stableSoftplus(z_i) - y_i * z_i`;
3. compute the mean row loss with Kahan summation in row order and divide by `N`;
4. compute `sum(w_j * w_j)` with Kahan summation in `feature_order`; and
5. add `(lambda / 2) * that_sum` to the mean row loss.

Define the gradient for feature `j` as Kahan summation, in row order, of `(stableSigmoid(z_i) - y_i) * d_ij`, divided by `N`, followed by `+ lambda * w_j`. All feature gradients are computed from the same unchanged weight vector. The next vector is then computed in `feature_order` as `w_next_j = w_j - learning_rate * gradient_j`; updates are simultaneous.

Compute `L0` at the all-zero vector. Update at most 2,000 times. After update `k`, compute `Lk` from the new vector and compare `abs(Lk - L(k-1))` without quantization. A value strictly below `1e-9` increments the consecutive counter; equality or a larger value resets it to zero. Stop after the first update whose counter reaches exactly `10`. `iterations_completed` is the number of completed simultaneous updates, and the returned coefficients and final loss are from that update. If the counter has not reached 10 after update 2,000, the result is `nonconverged` with the finite update-2,000 coefficients; those coefficients are quarantined from prediction and ranking.

Any non-finite input, product, sum state, score, probability, loss, gradient, coefficient, mean, variance, or standard deviation yields `ranking_training_invalid`. It produces no `RankingModelRecord`. No partial coefficient vector may be substituted.

## 7. Statistics, code, runtime, and model identity

### 7.1 Required Task 1 schema correction

Before model tests or issuance, Task 5 removes `uniqueItems: true` only from `rankingModelPayload.properties.coefficient_bits` in `packages/schemas/src/learning-records.schema.json`. Coefficients are position-addressed by `feature_order`; repeated bit strings, including multiple `0000000000000000` values for zero-delta positions, are valid and required to survive schema validation. Array length, item pattern, canonical positive zero, feature-position equality, and all model preimages remain enforced. No other Task 1 field or record family changes. `packages/learning/test/records.test.ts` and `packages/schemas/test/schema-registry.test.ts` must prove that repeated coefficient bits pass and duplicate feature names still fail.

### 7.2 Auxiliary statistics record

Task 5 adds the auxiliary schema ID `contentmd.model-training-statistics-record` without changing the Task 1 set of 23 learning lifecycle families. Its payload is closed and contains:

```ts
type StatisticsInvalidStage =
  | "input_numeric"
  | "standardization"
  | "initial_loss"
  | "gradient_update"
  | "updated_loss";

interface ModelTrainingStatisticsPayload {
  contract_version: "contentmd.model-training-statistics/0.1.0";
  record_mode: "development_fixture";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  schema_digest: Digest;
  dataset_ref: DigestRef;
  feature_profile_ref: DigestRef;
  purpose: "golden_conformance" | "diagnostic" | "candidate";
  training_input_digest: Digest;
  code_digest: Digest;
  runtime_profile_ref: ArtifactRef;
  pair_count: number;
  feature_count: 21;
  iterations_completed: number;
  convergence_streak: number;
  converged: boolean;
  initial_loss_bits: Binary64Hex | null;
  final_loss_bits: Binary64Hex | null;
  coefficient_set_digest: Digest | null;
  statistics_state: "completed" | "nonconverged" | "invalid";
  invalid_stage: StatisticsInvalidStage | null;
  error_code: PairwiseRankingErrorCode | null;
  authority_effect: "none";
}

type ModelTrainingStatisticsRecord =
  DurableRecord<ModelTrainingStatisticsPayload> & {
    schema_id: "contentmd.model-training-statistics-record";
    schema_version: "0.1.0";
    provenance: [ProvenanceRef, ProvenanceRef];
  };
```

`coefficient_set_digest` is null only for invalid statistics. Otherwise it is exactly:

```text
sha256Canonical({
  contract_version: "contentmd.pairwise-coefficient-set/0.1.0",
  feature_order,
  coefficient_bits
})
```

Repeated coefficient bit strings are retained in position order and participate repeatedly in this preimage. The statistics state equations are exhaustive:

| Result | Required statistics fields | Model result |
| --- | --- | --- |
| `trained` | `statistics_state: completed`; `invalid_stage: null`; `converged: true`; `convergence_streak: 10`; `iterations_completed` integer `10..2000`; both loss fields and coefficient digest non-null; `error_code: null` | exactly one `model_state: trained` model |
| `nonconverged` | `statistics_state: nonconverged`; `invalid_stage: null`; `converged: false`; `convergence_streak` integer `0..9`; `iterations_completed: 2000`; both loss fields and coefficient digest non-null; `error_code: ranking_training_nonconverged` | exactly one `model_state: nonconverged` quarantined model |
| `invalid` after safe input identity | `statistics_state: invalid`; the exact first invalid stage; `converged: false`; `iterations_completed: 0`; `convergence_streak: 0`; both loss fields and coefficient digest null; `error_code: ranking_training_invalid` | `model_record: null` |
| any failure before safe input identity, or any unexpected host/descriptor exception | no statistics record | `model_record: null` |

The invalid-stage order is `input_numeric`, `standardization`, `initial_loss`, `gradient_update`, `updated_loss`; the first stage containing the non-finite value wins. Even if finite work preceded the failure, invalid statistics deliberately reset iterations, streak, losses, and coefficient digest to the table values so no partial fit is represented.

For every issued statistics record, `pair_count` equals the verified matrix training-row count, `feature_count` is `21`, and the dataset/profile/purpose/input/code/runtime fields equal the complete request. Non-null loss bits decode to the exact losses from section 6, and a non-null coefficient-set digest equals the exact returned model coefficient bits in feature order. None of these fields is caller supplied independently of the deterministic fit.

The statistics `schema_digest` is the raw-byte SHA-256 entry for `packages/schemas/src/model-training-statistics.schema.json` in the verified code manifest. Its `record_id` is `model_training_statistics.` plus the first 32 characters of SHA-256 over its complete canonical payload preimage excluding no payload field. Its `record_version` is `1`, lifecycle is `active`, and scope equals the dataset scope. Provenance contains exactly the three-field core projections `{relationship: "trained_from_dataset", record_id, content_digest}` and `{relationship: "used_feature_profile", record_id, content_digest}`, sorted by relationship then record ID as an explicitly semantic UTF-8-sorted array. It is finalized with `finalizeRecord`.

### 7.3 Code and schema manifest

The code-manifest entries are exactly these source paths in UTF-8 path order:

```text
docs/superpowers/specs/2026-08-20-contentmd-pairwise-training-ranking-contracts-design.md
packages/core/src/canonical-json.ts
packages/core/src/records.ts
packages/learning/src/index.ts
packages/learning/src/numeric.ts
packages/learning/src/pairwise-logistic.ts
packages/learning/src/rank.ts
packages/learning/src/records.ts
packages/schemas/src/learning-records.schema.json
packages/schemas/src/model-training-statistics.schema.json
packages/schemas/src/schema-registry.ts
scripts/verify-pairwise-code-manifest.mjs
```

Each digest is SHA-256 over exact raw bytes. `manifest_digest` is SHA-256 over canonical JSON of `{contract_version, package_id, package_version, entries}`. `RankingModelRecord.payload.code_digest` and the statistics `code_digest` equal this manifest digest. `RankingModelRecord.payload.schema_digest` equals the learning-record schema entry; the statistics `schema_digest` equals the statistics-schema entry. Verification compares the supplied manifest with the release-owned exact byte manifest; a self-consistent caller replacement is not accepted.

The release-owned manifest preimage is the canonical file `fixtures/learning-ranking/pairwise-training-code-manifest.json`. Its exact raw bytes are `canonicalJson({contract_version, package_id, package_version, entries})`; the repository helper already appends its one LF. `manifest_raw_bytes_digest` is SHA-256 over those exact file bytes, while `manifest_digest` is `sha256Canonical({contract_version, package_id, package_version, entries})`, so the two digests are equal for this canonical file but remain separately named bindings. The public `PairwiseCodeManifest` value is the parsed four preimage fields plus that derived `manifest_digest`; the file does not contain a self-asserted digest field. Both digests are pinned in generated `packages/learning/src/pairwise-release-profile.ts`, which is deliberately excluded from the code-manifest path universe to avoid self-reference. That module contains only `contract_version: "contentmd.pairwise-release-profile/0.1.0"`, `manifest_raw_bytes_digest`, `manifest_digest`, and the nonempty semantic UTF-8-sorted `admitted_runtime_profile_digests`. `release_profile_contract_digest` is SHA-256 over canonical JSON of those four fields. The pure `verifyPairwiseCodeManifest()` function reconstructs the canonical manifest bytes and requires the exact path universe, positive integer byte counts, exact entry order, and pinned raw/semantic digests; it does not claim to read executing source bytes. Before any golden or release fixture is accepted, `scripts/verify-pairwise-code-manifest.mjs` reads the two explicit control files `fixtures/learning-ranking/pairwise-training-code-manifest.json` and `packages/learning/src/pairwise-release-profile.ts`, then exactly the listed source paths; it hashes the listed source bytes, checks every byte count/digest and both control-file pins, reads no other path, and exits nonzero on a missing, extra, symlinked-outside-workspace, or mismatched path. That bounded local build gate creates no runtime token and writes nothing. A self-consistent caller replacement cannot satisfy the pinned pure verifier or the external raw-byte gate.

Task 3 and Task 4 runtime files are not silently omitted from provenance: their exact dependency-closed producer manifests, contract/schema artifacts, runtime witnesses, and verification receipts are complete nested values in the dataset and vector replay inputs and therefore in the dataset/matrix/candidate verification digests. Task 5's release tests reverify those witnesses before the Task 5 manifest. A Task 3/4 source or transitive dependency change that is not reflected in its witness fails replay; it cannot retain a Task 5 verification digest.

### 7.4 Runtime profile

`profile_digest` is SHA-256 over canonical JSON of every runtime-profile field except `profile_digest`. Its artifact ref is exactly `{artifact_id: "contentmd.pairwise-runtime-profile", artifact_version: "0.1.0", artifact_digest: profile_digest}`. Every Task 5 training, model verification, prediction, rank, and golden run requires Node `24.20.0` exactly and a runtime-profile digest present in both the platform-specific externally locked golden fixture and `pairwise-release-profile.ts`; dataset, matrix, candidate, and code replay verifiers neither observe nor accept a Task 5 numeric-runtime input. The admitted profiles are (1) Node `24.20.0`, V8 `13.6.233.17-node.53`, ICU `78.3`, Unicode `17.0`, `darwin`, `arm64`, `LE`; and (2) the same Node/V8/ICU/Unicode tuple on `linux`, `x64`, `LE`. The superseded Node `24.14.0` profile is not admitted. `admitPairwiseRuntime` compares every field with `process.versions`, `process.platform`, `process.arch`, and `os.endianness()` before returning its opaque token. The workspace's broader `>=24.14.0 <25` engine range remains valid for non-ranker packages only; it does not admit a Task 5 training run.

A new operating-system, architecture, V8, ICU, Unicode, Node patch, or endianness tuple is unsupported until a new runtime-profile artifact passes the complete golden in independent fresh processes and is added through a reviewed fixture version. Runtime mismatch fails; it never silently downgrades to a baseline or another profile.

### 7.5 Input, coefficient, artifact, and replay preimages

`input_digest` is SHA-256 over canonical JSON of exactly:

```text
contract_version = contentmd.pairwise-training-input-preimage/0.1.0
record_mode = development_fixture
purpose
dataset_ref
dataset_verification_digest
feature_profile_ref
feature_matrix_digest
feature_matrix_verification_digest
ordered_training_example_refs
feature_order = exact PairwiseFeatureOrder
hyperparameters
model_schema_digest
statistics_schema_digest
code_digest
code_verification_digest
runtime_profile_ref
runtime_verification_digest
blocking_only_verification_digest
browser_feature_count = 0
competitor_feature_count = 0
third_party_label_count = 0
```

`ordered_training_example_refs` is exactly `feature_matrix.training_rows.map((row) => row.example_ref)` in stored Task 3 train order. `feature_profile_ref`, `feature_matrix_digest`, `feature_matrix_verification_digest`, and `blocking_only_verification_digest` are the exact fields from the reauthenticated matrix token; no caller supplies a parallel alias.

This addendum sharpens the Task 1 `model_artifact_digest` preimage. It is SHA-256 over canonical JSON of exactly:

```text
contract_version = contentmd.ranking-model-artifact-preimage/0.1.0
record_mode = development_fixture
ranking_objective
candidate_kind
schema_digest
authority_effect = none
algorithm
dataset_ref
feature_profile_ref
hyperparameters
feature_order
standardization
coefficient_bits
coefficient_set_digest
training_statistics_ref
runtime_profile_ref
code_digest
input_digest
model_state
```

The outer `content_digest`, `record_id`, `model_artifact_digest`, and mutable human-readable decimals outside the authoritative record are excluded. Every other listed value is the exact value serialized in the record or deterministically derived from its exact dependencies. `coefficient_set_digest` uses section 7.2. Including `model_state` prevents a nonconverged artifact from retaining its identity after a state flip.

The model `record_id` is `ranking_model.` plus the first 32 characters of `model_artifact_digest`. `record_version` is `1`, lifecycle is `proposed`, record mode is `development_fixture`, authority effect is `none`, and scope equals the verified dataset scope. Provenance contains exactly the three-field core projections for `has_training_statistics`, `trained_from_dataset`, and `used_feature_profile`, sorted by relationship then record ID as a semantic UTF-8-sorted array. `feature_order`, `standardization`, and `coefficient_bits` each have length 21 and identical positional meaning. Every coefficient is finite when decoded and positive zero is canonical; coefficient bit strings need not be unique.

Model and statistics cross-binding is exact:

- `model_state: trained` if and only if the supplied statistics satisfy the trained row in section 7.2 and its coefficient-set digest equals the model feature order and coefficient bits;
- `model_state: nonconverged` if and only if the statistics satisfy the nonconverged row and the digest equality holds;
- no `model_state: invalid` record is issued by Task 5, and a caller-authored one is always `ranking_model_invalid`;
- dataset, profile, purpose, input digest, schema digests, code digest, runtime ref, scope, and provenance are identical across the complete request, statistics, and model wherever the field exists.

`verifyRankingModel()` accepts the complete `PairwiseTrainingRequest` in `RankingModelDependencies`, including `purpose`. It reauthenticates or reconstructs each opaque token through its complete replay input and reruns `trainPairwiseLogistic()` from that request. The fresh model must equal the supplied record byte-for-byte, and the fresh statistics ref must equal the supplied model's `training_statistics_ref`; no separately supplied statistics assertion exists. It never treats caller-recomputed outer or artifact digests as evidence of fitting. `deterministic_replay_digest` is SHA-256 over canonical JSON of `{contract_version: "contentmd.ranking-model-deterministic-replay/0.1.0", training_input_digest, statistics_record, model_record}` from that fresh replay. A byte-equal trained replay returns the opaque model. A byte-equal nonconverged replay throws `ranking_model_quarantined`; any other mismatch throws `ranking_model_invalid` according to section 9.

### 7.6 Golden fixture and external lock

The semantic object in `fixtures/learning-ranking/golden-model.json` is exactly:

```ts
interface PairwiseGoldenOneStepWitness {
  feature_order: PairwiseFeatureOrder;
  population_value_bits_by_feature: readonly (readonly Binary64Hex[])[];
  mean_bits: readonly Binary64Hex[];
  population_standard_deviation_bits: readonly Binary64Hex[];
  first_row_delta_bits: readonly Binary64Hex[];
  initial_coefficient_bits: readonly Binary64Hex[];
  initial_loss_bits: Binary64Hex;
  first_gradient_bits: readonly Binary64Hex[];
  first_updated_coefficient_bits: readonly Binary64Hex[];
  first_updated_loss_bits: Binary64Hex;
}

interface PairwiseGoldenPredictionCase {
  case_id: string;
  candidate_a: PairwiseGoldenCandidateSelector;
  candidate_b: PairwiseGoldenCandidateSelector;
  expected_prediction: PairwisePrediction;
}

interface PairwiseGoldenRankCase {
  candidates: readonly [
    PairwiseGoldenCandidateSelector,
    PairwiseGoldenCandidateSelector,
    ...PairwiseGoldenCandidateSelector[]
  ];
  expected_result: PairwiseRankResult;
}

interface PairwiseGoldenCandidateSelector {
  example_ref: DigestRef;
  side: "candidate_a" | "candidate_b";
}

interface PairwiseGoldenReplayCommitment {
  contract_version: "contentmd.pairwise-golden-replay-commitment/0.1.0";
  dataset_replay_verification_digest: Digest;
  matrix_replay_verification_digest: Digest;
  sealed_dataset_ref: DigestRef;
  feature_profile_ref: DigestRef;
  training_row_digests: readonly [Digest, ...Digest[]];
}

interface PairwiseGoldenModelFixture {
  contract_version: "contentmd.pairwise-golden-model/0.1.0";
  record_mode: "development_fixture";
  purpose: "golden_conformance";
  replay_commitment: PairwiseGoldenReplayCommitment;
  code_manifest_digest: Digest;
  runtime_profile: PairwiseRuntimeProfile;
  one_step_witness: PairwiseGoldenOneStepWitness;
  expected_statistics_record: ModelTrainingStatisticsRecord;
  expected_model_record: RankingModelRecord;
  prediction_cases: readonly [
    PairwiseGoldenPredictionCase,
    PairwiseGoldenPredictionCase,
    PairwiseGoldenPredictionCase,
    PairwiseGoldenPredictionCase,
    ...PairwiseGoldenPredictionCase[]
  ];
  rank_case: PairwiseGoldenRankCase;
  fixture_semantic_digest: Digest;
}
```

In `PairwiseGoldenOneStepWitness`, `feature_order` is the exact 21-name tuple; the outer `population_value_bits_by_feature` array and each of `mean_bits`, `population_standard_deviation_bits`, `first_row_delta_bits`, `initial_coefficient_bits`, `first_gradient_bits`, and `first_updated_coefficient_bits` have length exactly 21 in that order. For `N = reconstructed_matrix_replay.rows.length`, each population inner array has length exactly `2N` and is the corresponding raw Task 4 value bits in stored row order, A then B. `initial_coefficient_bits` contains exactly 21 positive-zero encodings. Every witness field must equal the independently calculated first update for that same matrix and the fixed section 6 operation order.

The golden file deliberately does not duplicate the complete Task 3/4 replay graph. That graph is reconstructed in each process from the repository's deterministic serializable fixture builder, never from an opaque token, and is admitted only after the public complete replayers return `dataset_replay_verification_digest` and `matrix_replay_verification_digest` equal to `replay_commitment`; the sealed dataset/profile refs and every stored-order `training_row_digest = sha256Canonical(row)` must also match. These verifier digests already bind the complete raw replay inputs and byte-equal derived outputs, so the golden gate must not canonicalize and hash the roughly 415 MB replay graph a second time. This keeps the external golden lock compact while still making any replay-byte, row-order, or selected-output change fail closed. Tests then reconstruct the dataset, profile, matrix, candidates, code token, runtime token, and model token only through their public verifiers. `code_manifest_digest` must equal the separately verified exact pinned Task 5 manifest; it is not a synthetic substitute. Candidate selectors resolve exactly one stored matrix row by byte-equal `example_ref` and then one named side; missing or duplicate resolution fails. The four mandatory prediction cases are an ordinary pair, its exact A/B reversal, an exact score tie, and the valid admitted pair with the greatest absolute score delta; case IDs are unique and in that order. Because valid replay bounds its score delta, the fourth case proves the declared clip postcondition and does not bypass candidate verification to manufacture an unreachable clipping event.

`fixture_semantic_digest` is exactly `sha256Canonical({contract_version: "contentmd.pairwise-golden-model-preimage/0.1.0", fixture: complete_fixture_without_fixture_semantic_digest})`. The file bytes are exactly `canonicalJson(complete_fixture)`. The separate file `fixtures/learning-ranking/golden-model.sha256` contains exactly `<sha256-of-golden-model.json><two ASCII spaces>fixtures/learning-ranking/golden-model.json<LF>`, so the plan's repository-root `shasum -a 256 -c` command resolves the target without an implicit working-directory rule. Tests validate that external raw-byte lock before parsing and then validate the semantic digest. The lock and semantic digest are excluded from `pairwise-release-profile.ts`, every code-verification digest, every training input, and every model preimage; this prevents a golden → expected model → code verification → release profile → golden cycle.

Final coefficients, statistics, prediction, rank, and one-step expectations must not be generated by `numeric.ts`, `pairwise-logistic.ts`, or `rank.ts`. The one-step witness is independently calculated from the fixture's exact replayed training rows, Task 4 values, fixed hyperparameters, and stored order, and stores every binary64 bit pattern needed to reproduce the exact operation order. Running the externally locked fixture in two fresh Node processes must first reproduce the exact replay commitment and then produce byte-identical canonical statistics, model, predictions, rank result, semantic digest, model-artifact digest, and outer record digest. `--update`, snapshot regeneration, lock regeneration, and accepting current output are forbidden test modes.

## 8. Model verification, prediction, and ranking

`verifyRankingModel()` applies section 9, validates the complete record and dependencies, and performs the deterministic retraining replay in section 7.5. Only a byte-equal replay with `model_state: "trained"` returns an opaque `VerifiedRankingModel`. A structurally and cryptographically valid replay with `model_state: "nonconverged"` throws `ranking_model_quarantined`; `model_state: "invalid"`, a state/statistics mismatch, a coefficient mismatch, or any caller-recomputed alternative throws `ranking_model_invalid`.

Prediction and ranking reauthenticate the model token and rerun `verifyPairwiseCandidate()` from each token's complete `verification_input` before arithmetic. Each replayed vector, ref, digest, provenance, gate, value, count, and runtime binding must remain byte-equal. Candidate refs, vector refs, and expression digests are pairwise unique. Candidate project equals the model/dataset/FeatureProfile project; candidate feature-profile ref equals the model; and all candidates in one call bind the same project, context, target scope, checkpoint, feature universe, Task 4 feature-runtime profile, and Unicode runtime. The Task 4 `feature_runtime_profile_ref` equals `FeatureProfile.payload.runtime_profile_ref`. It is distinct from, and is never compared for equality with, the model's Task 5 numeric `pairwise_runtime_profile_ref`; the latter equals `RankingModelRecord.payload.runtime_profile_ref` and the admitted Task 5 token.

Prediction standardizes from the stored 21 training statistics, clips each candidate position independently, forms `A - B`, computes `score_delta = kahanSum(w_j * delta_j)` in `PairwiseFeatureOrder`, then computes `unclipped_probability`. If `score_delta` is exact canonical positive zero, `unclipped_probability` is exactly `0.5`; otherwise it is `stableSigmoid(score_delta)`. `probability = min(1 - 1e-6, max(1e-6, unclipped_probability))`; all three numeric values are encoded with `binary64ToHex`, and `probability === binary64FromHex(probability_bits)`.

Prediction `input_digest` is exactly:

```text
sha256Canonical({
  contract_version: "contentmd.pairwise-prediction-input/0.1.0",
  record_mode: "development_fixture",
  authority_effect: "none",
  model_ref,
  model_verification_digest,
  feature_profile_ref,
  project_id,
  context_ref,
  target_scope_ref,
  checkpoint_set_ref,
  feature_universe_ref,
  feature_runtime_profile_ref,
  pairwise_runtime_profile_ref,
  unicode_runtime_digest,
  candidate_a: {
    candidate_ref,
    expression_digest,
    vector_ref,
    vector_digest,
    candidate_verification_digest
  },
  candidate_b: {
    candidate_ref,
    expression_digest,
    vector_ref,
    vector_digest,
    candidate_verification_digest
  }
})
```

`prediction_digest` is SHA-256 over canonical JSON of every `PairwisePrediction` field except `prediction_digest`, including `input_digest`, all three numeric bit strings, and the decoded clipped number. No prediction field is descriptive or mutable.

Ranking requires a nonempty candidate tuple, standardizes each candidate once, and computes `score = kahanSum(w_j * standardized_x_j)` in `PairwiseFeatureOrder`. Candidates sort by descending numeric score. An exact numeric tie, including canonical positive zero, resolves by ascending lowercase expression SHA-256 digest using raw UTF-8 bytes. `original_index` records caller order and never breaks a tie. The result contains every input candidate exactly once.

Rank `input_digest` is exactly:

```text
sha256Canonical({
  contract_version: "contentmd.pairwise-rank-input/0.1.0",
  record_mode: "development_fixture",
  authority_effect: "none",
  model_ref,
  model_verification_digest,
  feature_profile_ref,
  project_id,
  context_ref,
  target_scope_ref,
  checkpoint_set_ref,
  feature_universe_ref,
  feature_runtime_profile_ref,
  pairwise_runtime_profile_ref,
  unicode_runtime_digest,
  candidates: input_order.map((candidate, original_index) => ({
    candidate_ref,
    expression_digest,
    vector_ref,
    vector_digest,
    candidate_verification_digest,
    original_index
  }))
})
```

The tie trace has one bucket per distinct canonical `score_bits`, in descending numeric-score order, including singleton buckets. Each bucket's candidates are in ascending expression-digest UTF-8 order and retain exact candidate/vector refs. `trace_digest` is SHA-256 over canonical JSON of `{contract_version: "contentmd.pairwise-rank-tie-trace/0.1.0", buckets}`. `output_digest` is SHA-256 over canonical JSON of every `PairwiseRankResult` field except `output_digest`, including the input digest, complete ordered rows, and complete tie trace. Equal candidate refs, vector refs, or expression digests; a missing/duplicate output; a trace mismatch; or any non-bijection is invalid.

## 9. Error codes, states, and precedence

`PairwiseRankingErrorShape` and its code type are exactly:

```ts
type PairwiseRankingErrorCode =
  | "ranking_input_shape_invalid"
  | "ranking_official_mode_not_supported"
  | "ranking_digest_invalid"
  | "ranking_reference_invalid"
  | "ranking_objective_mismatch"
  | "ranking_mode_mismatch"
  | "ranking_scope_mismatch"
  | "learning_data_not_authorized"
  | "ranking_source_quarantined"
  | "learning_dataset_insufficient"
  | "ranking_dataset_state_invalid"
  | "ranking_test_state_invalid"
  | "ranking_feature_profile_mismatch"
  | "ranking_feature_order_invalid"
  | "ranking_runtime_profile_unsupported"
  | "ranking_code_manifest_invalid"
  | "ranking_non_finite"
  | "ranking_training_invalid"
  | "ranking_training_nonconverged"
  | "ranking_model_invalid"
  | "ranking_model_quarantined"
  | "ranking_candidate_ineligible";

interface PairwiseRankingErrorShape {
  code: PairwiseRankingErrorCode;
  message: `task5_contract_invalid:${PairwiseRankingErrorCode}`;
  retryable: false;
}

class PairwiseRankingError extends Error {
  readonly code: PairwiseRankingErrorCode;
  readonly retryable: false;
}
```

`message` is exactly `task5_contract_invalid:<code>`. The closed code set is:

```text
ranking_input_shape_invalid
ranking_official_mode_not_supported
ranking_digest_invalid
ranking_reference_invalid
ranking_objective_mismatch
ranking_mode_mismatch
ranking_scope_mismatch
learning_data_not_authorized
ranking_source_quarantined
learning_dataset_insufficient
ranking_dataset_state_invalid
ranking_test_state_invalid
ranking_feature_profile_mismatch
ranking_feature_order_invalid
ranking_runtime_profile_unsupported
ranking_code_manifest_invalid
ranking_non_finite
ranking_training_invalid
ranking_training_nonconverged
ranking_model_invalid
ranking_model_quarantined
ranking_candidate_ineligible
```

The five low-level numeric helpers, the six verification/admission functions (including `verifyRankingModel`), `predictPairwise`, and `rankEligibleExpressions` throw only `PairwiseRankingError` for contract failures. For a descriptor-valid `official` mode, every mode-bearing API throws `ranking_official_mode_not_supported`. For development requests, `trainPairwiseLogistic` catches the normalized error and returns the exact `invalid` or `nonconverged` union member; it does not leak an implementation exception. A descriptor trap or unexpected host exception is normalized to `ranking_input_shape_invalid` before any record can issue.

Every mode-bearing API uses this exact preflight:

1. descriptor-check only the closed top-level object and its own enumerable data-property `record_mode`; for `verifyRankingModel`, descriptor-check only the outer record, its own `payload`, and `payload.record_mode`;
2. an absent, extra, inherited, accessor, symbol, non-enumerable, non-object, or invalid mode shape throws `ranking_input_shape_invalid`;
3. exact literal `official` throws `ranking_official_mode_not_supported` before any other nested read, getter, proxy trap, digest, ref, code, runtime, or semantic check;
4. only exact `development_fixture` proceeds.

After that preflight, validation stops at the first class in this exact precedence:

1. nested closed shape and primitive domain;
2. digest syntax, canonical/derived digest, derived ID, and outer record digest;
3. complete object/ref equality, replay equality, and ref existence/schema/version;
4. objective and candidate kind;
5. nested mode equality and scope/project/domain equality;
6. permission, rights, privacy, policy, incident, currentness, and source quarantine;
7. dataset state, nonempty/count thresholds, exact split membership, and unopened-test proof;
8. feature profile, exact 21-feature order/domains, vector identity/replay, and matrix equality;
9. Task 5 runtime profile and code/schema manifest;
10. numeric finiteness and standardization;
11. training convergence or model/statistics/state equations; and
12. candidate replay eligibility.

### 9.1 Upstream error normalization and replay arbitration

Task 5 catches upstream contract failures only by exact class and exact `code`: `Task3ContractError` from the committed Task 3 module and `Task4ContractError` from the committed Task 4 module. It never matches `message`, accepts an error-like caller object, or exports either normalizer. The following tables are total for the exact upstream contract versions bound by the Task 5 release profile.

| Exact Task 3 suffix after `task3_contract_invalid:` | Task 5 code |
| --- | --- |
| `input_shape`, `canonical_value`, `timestamp`, `set_uniqueness_or_order` | `ranking_input_shape_invalid` |
| `official_mode_not_supported` | `ranking_mode_mismatch` |
| `digest`, `durable_record_digest`, `snapshot_digest`, `receipt_digest`, `producer_artifact`, `producer_manifest`, `unicode_artifact`, `unicode_scalar` | `ranking_digest_invalid` |
| `record_id`, `schema_id`, `receipt_binding`, `reference_integrity`, `checkpoint_chain`, `checkpoint_binding`, `leakage_universe`, `leakage_relationship`, `group_identity`, `provenance` | `ranking_reference_invalid` |
| `scope_mismatch` | `ranking_scope_mismatch` |
| `split_assignment`, `dataset_partition` | `ranking_test_state_invalid` |
| `dataset_counts`, `dataset_state` | `ranking_dataset_state_invalid` |

A valid Task 3 build result that is below the Task 5 training threshold is not an upstream integrity exception and maps separately to `learning_dataset_insufficient`. Likewise, a valid sealed record whose test state is not `sealed` maps by the Task 5 condition table, not by manufacturing a Task 3 exception.

| Exact Task 4 suffix after `task4_contract_invalid:` | Task 5 code |
| --- | --- |
| `input_shape`, `canonical_value` | `ranking_input_shape_invalid` |
| `official_mode_not_supported` | `ranking_mode_mismatch` |
| `producer_witness`, `unicode_runtime`, `digest` | `ranking_digest_invalid` |
| `reference_binding`, `provenance` | `ranking_reference_invalid` |
| `scope_mismatch`, `checkpoint_binding` | `ranking_scope_mismatch` |
| `feature_profile_binding` | `ranking_feature_profile_mismatch` |
| `quarantined_expression_present`, `forbidden_input_field` | `ranking_source_quarantined` |
| `numeric_nonfinite` | `ranking_non_finite`; `trainPairwiseLogistic()` remaps it to `ranking_training_invalid` only after the complete training request has reached the trainer numeric stage |

Within one call to an upstream public constructor, that upstream contract's first thrown code is authoritative. Task 5 does not duplicate private Task 3 or Task 4 validation or reinterpret a later condition that the upstream constructor did not reach. The mapped result then participates in Task 5 arbitration against local failures and mapped results from every other executable replay slot.

For one Task 5 call, all independent sibling replay slots whose required parents succeeded are executed and their mapped failures retained without issuing an output. A failed parent makes only its dependent child slots non-executable; it does not suppress independent siblings. Examples are: a failed dataset build prevents only the derived seal; a failed profile construction prevents only vectors that require that derived profile; and a failed candidate replay does not prevent another independent row or rank candidate from being checked. Arbitration selects the earliest row in the condition-to-code table below, excluding the already exhausted top-level official row. If two retained failures map to the same row, the winner is the earliest replay slot in literal closed-interface field order, with arrays in stored order, each matrix row A before B, prediction A before B, and rank candidates in supplied order. Derived seal follows build; profile follows dataset; vectors follow profile; model reauthentication precedes prediction or rank candidates. No wall-clock completion order, thrown-error arrival order, host property order, or early loop exit may choose the result.

An exact upstream error class carrying a suffix absent from the applicable table, an upstream-version mismatch, or any non-upstream exception is an unexpected implementation boundary and is normalized to `ranking_input_shape_invalid`; no record, token, prediction, or rank output may issue. Release verification must independently reject an upstream contract/code digest change before such a mismatch can be accepted as a valid Task 5 handoff.

The condition-to-code mapping is exhaustive:

| Condition | Exact code |
| --- | --- |
| Any otherwise-unmapped closed-shape/domain failure; bad literal; unknown/missing/extra/inherited/accessor/symbol/cyclic/non-enumerable/non-plain value; sparse/aliased array; malformed `Binary64Hex` text | `ranking_input_shape_invalid` |
| Top-level exact `official` after the bounded descriptor preflight | `ranking_official_mode_not_supported` |
| Malformed SHA digest; claimed digest/preimage mismatch; derived-ID/ref-content mismatch; outer record mismatch; mapped upstream producer/dependency/Unicode/digest proof failure | `ranking_digest_invalid` |
| Complete replay output mismatch; wrong complete object for a ref; candidate/example/group/row/ref mismatch; duplicate candidate/vector/expression identity across a prediction or rank call; byte inequality not assigned below | `ranking_reference_invalid` |
| Ranking objective or candidate kind mismatch | `ranking_objective_mismatch` |
| Any nested token/request/record mode inequality after the official gate | `ranking_mode_mismatch` |
| Project, record scope, context, target scope, checkpoint, universe, or cross-candidate domain mismatch | `ranking_scope_mismatch` |
| Permission, rights, privacy, policy, incident, temporal-currentness, or learning authorization failure | `learning_data_not_authorized` |
| Browser/competitor/third-party expression or forbidden blocking-only value reaches a matrix, label, feature, fit, score, or tie key | `ranking_source_quarantined` |
| Empty training set or any purpose below the exact Task 3 training thresholds | `learning_dataset_insufficient` |
| Build/final manifest state other than the exact admissible sealed development state | `ranking_dataset_state_invalid` |
| Opened/unsealed test proof, test member in training, or validation/test vector supplied | `ranking_test_state_invalid` |
| FeatureProfile schema/digest/project/source/runtime/replay mismatch | `ranking_feature_profile_mismatch` |
| Any order other than exact `PairwiseFeatureOrder`, wrong length, value-domain violation, or positional standardization-name mismatch | `ranking_feature_order_invalid` |
| Task 5 runtime tuple/profile/ref/admission mismatch | `ranking_runtime_profile_unsupported` |
| Task 5 code/schema manifest shape/path/order/raw/semantic/pin/release-profile mismatch | `ranking_code_manifest_invalid` |
| Non-finite or negative-zero numeric input/encoding/intermediate in a numeric helper, model verification, prediction, or ranking | `ranking_non_finite` |
| Any supplied or derived non-finite in trainer input, standardization, loss, gradient, update, or coefficient; trainer remaps `ranking_non_finite` to this code | `ranking_training_invalid` |
| Exactly 2,000 finite updates without the ten-update convergence streak | `ranking_training_nonconverged` |
| Trained-model schema/preimage/retraining/coefficient/statistics/state-equation mismatch, or any caller-authored `model_state: invalid` record | `ranking_model_invalid` |
| A byte-valid replayed nonconverged model is passed to model verification, prediction, or ranking | `ranking_model_quarantined` |
| Complete Task 4 candidate replay returns ineligible for any semantic reason | `ranking_candidate_ineligible` |

Within one class, object fields are checked in the literal order written in the applicable closed interface or preimage and arrays in stored order. Repository canonical object-key ordering does not define validation precedence. When one condition could match a general and a specific row, the specific row wins; when independent rows apply, the numbered precedence wins subject only to the authoritative within-one-upstream-call rule in section 9.1. There is no unspecified integrity catch-all, automatic retry, fallback, or error replacement.

## 10. Development, official, quarantine, and side effects

Every successful v0.1 handoff, statistics record, model record, prediction, and rank result is `development_fixture` with authority effect `none`. `golden_conformance`, `diagnostic`, and `candidate` are development-only identity purposes; all three require the same exact Task 3 thresholds and sealed dataset because this version defines no alternate diagnostics-only handoff. No output can become official by copying, changing a mode field, recomputing an outer digest, changing lifecycle, or replaying under another API. The official gate in section 9 is unconditional for this version.

Blocking-only competitor/similarity material may contribute only to Task 3 exclusion and Task 4 candidate-ineligibility replay. Its strings, tokens, expression digests, distances, identities, browser locators, prevalence, or derived aggregates may not appear in admitted labels, Task 4 eligible vectors, values, standardization, fitting, coefficients, scores, probabilities, or rank tie keys. An aggregate dataset verification digest may transitively commit a bounded exclusion ref because it authenticates the complete replay; that opaque cryptographic commitment is never decoded, compared, counted, or transformed into a model input. A missing, failed, unknown, or noncurrent blocking check makes the candidate ineligible or the training source quarantined.

All Task 5 public functions except `admitPairwiseRuntime` are synchronous and referentially deterministic from their explicit arguments. `admitPairwiseRuntime` alone observes the immutable runtime tuple named in section 7.4. They perform no file or store read/write, event append, clock read, randomness, environment-variable lookup, subprocess, network call, logging, telemetry, audit append, promotion, binding, or fallback. They copy and freeze returned data. The external code-manifest and golden-lock scripts/tests may perform bounded local file reads before constructing tokens; they are build gates, not runtime APIs, and perform no network or write. Persistence and audit are separate governed callers and cannot change returned bytes.

## 11. TDD and verification contract

Task 5 uses Node `24.20.0` exactly on each separately admitted platform tuple. The minimum executable evidence is:

1. schema tests remove only `coefficient_bits.uniqueItems`, accept multiple identical positive-zero coefficient strings by position, retain the exact 16-hex pattern and array-length checks, and continue rejecting duplicate feature names/order;
2. numeric tests cover big-endian known values, positive-zero canonicalization, negative-zero rejection, smallest subnormal preservation, malformed/non-finite bit rejection, both sigmoid/softplus branches, classic Kahan order sensitivity, and every intermediate finiteness check;
3. replay-verifier tests mutate one field at a time across complete Task 3 build/seal inputs/results and Task 4 profile/vectorization inputs/vectors, prove exact train-set/row/label/side/group/checkpoint derivation, reject a bare ref/digest/vector/receipt/boolean, and reject Task 4 value/count/gate/provenance/runtime/context/universe mutations even after all caller digests are recomputed;
4. profile/matrix tests prove exact one-to-one 21-position reuse, no second missing-indicator expansion, exact vector refs/digests, nonempty stored row order, all feature domains, A/B shared domain, and zero browser/competitor/third-party inputs;
5. independently calculated trainer tests cover exact `2N` population standardization, zero variance, clipping-before-difference, train-only statistics, one-step loss/gradient, A/B reversal, simultaneous updates, strict convergence, update 2,000 nonconvergence, and the exact invalid-stage reset table;
6. identity tests cover exact code/schema/input/statistics/coefficient/model/replay preimages, all record IDs and outer digests, repeated coefficients, purpose binding, every state equation, model-state flips, recomputed-digest forged coefficients, deterministic retraining, nonconverged quarantine, and no invalid model issuance;
7. prediction/rank tests cover complete candidate replay, distinct Task 4 feature and Task 5 numeric runtimes, common project/context/target/checkpoint/universe bindings, stored-stat reuse, exact bits and clipping, A/B reversal, exact ties, tie buckets, expression-digest order, candidate bijection, and one-at-a-time input/prediction/trace/output digest mutations;
8. every mode-bearing API tests top-level `official` short-circuit before nested access using accessor/proxy traps; exhaustive dual-fault tests cover every condition-to-code row, every Task 3 and Task 4 suffix-to-Task-5 normalization row, authoritative within-one-upstream-call precedence, mapped arbitration across independent replay slots, blocked-child versus executable-sibling behavior, deterministic same-code slot ties, unknown suffix/class normalization, trainer nonfinite remapping, raw structural casts, and direct-import/WeakSet bypass;
9. quarantine tests cover stale/mismatched permission and rights, opened test, unadmitted runtime, altered code/schema manifest, browser/competitor feature or label input, and blocking-only leakage; and
10. the external code-manifest gate and golden SHA lock run before two fresh-process golden comparisons with byte-identical statistics, coefficients, predictions, rank result, semantic digest, model-artifact digest, and outer record digest, followed by full Vitest, TypeScript build, package-boundary check, foundation verifier, Unicode/check-only fixtures, and `git diff --check`.

No public endpoint, browser, model provider, competitor site, account, or mutable external service is exercised.

## 12. Acceptance

Task 5 is implementation-ready only when:

1. the exact committed Task 3 build/seal and Task 4 profile/vector APIs are replayed only through the complete section 3 inputs;
2. every public semantic input and output is closed and digest-bound, and every opaque value is reconstructible only through a complete public replay verifier;
3. official mode is unconditionally unsupported before nested reads, while every emitted record/result is development-fixture and authority-free;
4. all binary64, Kahan, operation-order, population, domain, clipping, and convergence choices have one executable interpretation;
5. Task 4's exact 21 features are reused one-to-one and standardization is training-only and identical at inference;
6. schema, code, input purpose, runtime, statistics, model state, coefficients, complete upstream replay, prediction, and rank trace participate in their exact identities;
7. repeated coefficient values validate by position, and deterministic retraining prevents a caller-rehashed alternative model from receiving a token;
8. invalid and nonconverged artifacts cannot rank or change state under the same model ID;
9. browser and competitor material remains blocking-only and absent from admitted labels, vectors, fitting, scores, and ties;
10. the runtime functions remain pure and offline, while bounded local manifest/lock gates are read-only; and
11. the independently fixed platform-specific external-lock goldens and all retained repository gates pass under every admitted runtime profile.
