import { sha256Canonical } from "@contentmd/core";
import {
  binary64FromHex,
  binary64ToHex,
  kahanSum,
  stableSigmoid,
  task5Fail,
  type Binary64Hex,
} from "./numeric.js";
import {
  task5ReauthenticatePairwiseCandidate,
  task5RequireVerifiedRankingModel,
  type VerifiedPairwiseCandidate,
  type VerifiedRankingModel,
} from "./pairwise-logistic.js";
import type { ArtifactRef, DigestRef } from "./records.js";

export interface PairwisePrediction {
  contract_version: "contentmd.pairwise-prediction/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  model_ref: DigestRef;
  model_verification_digest: string;
  feature_profile_ref: DigestRef;
  project_id: string;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  checkpoint_set_ref: DigestRef;
  feature_universe_ref: DigestRef;
  feature_runtime_profile_ref: ArtifactRef;
  pairwise_runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  candidate_a_verification_digest: string;
  candidate_b_verification_digest: string;
  score_delta_bits: Binary64Hex;
  unclipped_probability_bits: Binary64Hex;
  probability_bits: Binary64Hex;
  probability: number;
  input_digest: string;
  prediction_digest: string;
}

export interface RankedCandidate {
  candidate_ref: DigestRef;
  expression_digest: string;
  vector_ref: DigestRef;
  vector_digest: string;
  candidate_verification_digest: string;
  score_bits: Binary64Hex;
  original_index: number;
  final_rank: number;
}

export interface PairwiseRankTieCandidate {
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  expression_digest: string;
}

export interface PairwiseRankTieBucket {
  score_bits: Binary64Hex;
  candidates: readonly [PairwiseRankTieCandidate, ...PairwiseRankTieCandidate[]];
}

export interface PairwiseRankTieTrace {
  contract_version: "contentmd.pairwise-rank-tie-trace/0.1.0";
  buckets: readonly [PairwiseRankTieBucket, ...PairwiseRankTieBucket[]];
  trace_digest: string;
}

export interface PairwiseRankResult {
  contract_version: "contentmd.pairwise-rank-result/0.1.0";
  record_mode: "development_fixture";
  authority_effect: "none";
  model_ref: DigestRef;
  model_verification_digest: string;
  feature_profile_ref: DigestRef;
  project_id: string;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  checkpoint_set_ref: DigestRef;
  feature_universe_ref: DigestRef;
  feature_runtime_profile_ref: ArtifactRef;
  pairwise_runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  ordered_candidates: readonly [RankedCandidate, ...RankedCandidate[]];
  tie_trace: PairwiseRankTieTrace;
  input_digest: string;
  output_digest: string;
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

function finite(value: number): number {
  if (!Number.isFinite(value)) task5Fail("ranking_non_finite");
  return value === 0 ? 0 : value;
}

function refEqual(left: DigestRef, right: DigestRef): boolean {
  return left.record_id === right.record_id
    && left.schema_id === right.schema_id
    && left.schema_version === right.schema_version
    && left.content_digest === right.content_digest;
}

function artifactEqual(left: ArtifactRef, right: ArtifactRef): boolean {
  return left.artifact_id === right.artifact_id
    && left.artifact_version === right.artifact_version
    && left.artifact_digest === right.artifact_digest;
}

function refKey(ref: DigestRef): string {
  return `${ref.record_id}\u0000${ref.schema_id}\u0000${ref.schema_version}\u0000${ref.content_digest}`;
}

function modelRef(model: VerifiedRankingModel): DigestRef {
  return {
    record_id: model.record.record_id,
    schema_id: model.record.schema_id,
    schema_version: model.record.schema_version,
    content_digest: model.record.content_digest,
  };
}

interface PreparedCandidate {
  candidate: VerifiedPairwiseCandidate;
  standardized: readonly number[];
  score: number;
  scoreBits: Binary64Hex;
}

function standardizeCandidate(
  model: VerifiedRankingModel,
  candidate: VerifiedPairwiseCandidate,
): readonly number[] {
  if (candidate.vector.values.length !== model.standardization.length
    || model.standardization.length !== model.coefficient_bits.length
    || model.standardization.length !== model.feature_order.length) {
    task5Fail("ranking_feature_order_invalid");
  }
  return candidate.vector.values.map((value, index) => {
    const entry = model.standardization[index]!;
    if (entry.feature_name !== model.feature_order[index]) {
      task5Fail("ranking_feature_order_invalid");
    }
    if (!Number.isFinite(value)
      || !Number.isFinite(entry.mean)
      || !Number.isFinite(entry.population_standard_deviation)
      || entry.population_standard_deviation < 0) {
      task5Fail("ranking_non_finite");
    }
    if (entry.population_standard_deviation === 0) return 0;
    const normalized = finite(finite(value - entry.mean) / entry.population_standard_deviation);
    return finite(Math.min(10, Math.max(-10, normalized)));
  });
}

function assertModelCandidateBinding(
  model: VerifiedRankingModel,
  candidate: VerifiedPairwiseCandidate,
): void {
  const projectId = model.record.scope.project_id;
  const candidateProfileRef: DigestRef = {
    record_id: candidate.profile.record_id,
    schema_id: candidate.profile.schema_id,
    schema_version: candidate.profile.schema_version,
    content_digest: candidate.profile.content_digest,
  };
  if (projectId === null
    || candidate.vector.project_id !== projectId
    || !refEqual(candidate.vector.feature_profile_ref, model.record.payload.feature_profile_ref)
    || !refEqual(candidate.vector.feature_profile_ref, candidateProfileRef)
    || !artifactEqual(candidate.vector.runtime_profile_ref, candidate.profile.payload.runtime_profile_ref)
    || !artifactEqual(model.record.payload.runtime_profile_ref,
      model.training_request.runtime_profile.artifact_ref)) {
    task5Fail("ranking_feature_profile_mismatch");
  }
}

function prepareCandidate(
  model: VerifiedRankingModel,
  supplied: VerifiedPairwiseCandidate,
): PreparedCandidate {
  const candidate = task5ReauthenticatePairwiseCandidate(supplied);
  assertModelCandidateBinding(model, candidate);
  const standardized = standardizeCandidate(model, candidate);
  const coefficients = model.coefficient_bits.map(binary64FromHex);
  const score = finite(kahanSum(standardized.map((value, index) =>
    finite(value * coefficients[index]!))));
  return { candidate, standardized, score, scoreBits: binary64ToHex(score) };
}

function assertSharedBindings(left: VerifiedPairwiseCandidate, right: VerifiedPairwiseCandidate): void {
  if (left.vector.project_id !== right.vector.project_id
    || !refEqual(left.vector.context_ref, right.vector.context_ref)
    || !refEqual(left.vector.target_scope_ref, right.vector.target_scope_ref)
    || !refEqual(left.vector.checkpoint_set_ref, right.vector.checkpoint_set_ref)
    || !refEqual(left.vector.feature_profile_ref, right.vector.feature_profile_ref)
    || !refEqual(left.vector.feature_universe_ref, right.vector.feature_universe_ref)
    || !artifactEqual(left.vector.runtime_profile_ref, right.vector.runtime_profile_ref)
    || left.vector.unicode_runtime_digest !== right.vector.unicode_runtime_digest) {
    task5Fail("ranking_scope_mismatch");
  }
}

function assertUniqueCandidates(candidates: readonly VerifiedPairwiseCandidate[]): void {
  const candidateRefs = new Set<string>();
  const vectorRefs = new Set<string>();
  const expressionDigests = new Set<string>();
  for (const candidate of candidates) {
    const candidateKey = refKey(candidate.candidate_ref);
    const vectorKey = refKey(candidate.vector_ref);
    if (candidateRefs.has(candidateKey)
      || vectorRefs.has(vectorKey)
      || expressionDigests.has(candidate.expression_digest)) {
      task5Fail("ranking_reference_invalid");
    }
    candidateRefs.add(candidateKey);
    vectorRefs.add(vectorKey);
    expressionDigests.add(candidate.expression_digest);
  }
}

function commonOutputFields(model: VerifiedRankingModel, candidate: VerifiedPairwiseCandidate) {
  return {
    model_ref: modelRef(model),
    model_verification_digest: model.verification_digest,
    feature_profile_ref: model.record.payload.feature_profile_ref,
    project_id: candidate.vector.project_id,
    context_ref: candidate.vector.context_ref,
    target_scope_ref: candidate.vector.target_scope_ref,
    checkpoint_set_ref: candidate.vector.checkpoint_set_ref,
    feature_universe_ref: candidate.vector.feature_universe_ref,
    feature_runtime_profile_ref: candidate.vector.runtime_profile_ref,
    pairwise_runtime_profile_ref: model.record.payload.runtime_profile_ref,
    unicode_runtime_digest: candidate.vector.unicode_runtime_digest,
  };
}

export function predictPairwise(
  suppliedModel: VerifiedRankingModel,
  suppliedCandidateA: VerifiedPairwiseCandidate,
  suppliedCandidateB: VerifiedPairwiseCandidate,
): PairwisePrediction {
  const model = task5RequireVerifiedRankingModel(suppliedModel);
  const candidateA = prepareCandidate(model, suppliedCandidateA);
  const candidateB = prepareCandidate(model, suppliedCandidateB);
  assertUniqueCandidates([candidateA.candidate, candidateB.candidate]);
  assertSharedBindings(candidateA.candidate, candidateB.candidate);
  const coefficients = model.coefficient_bits.map(binary64FromHex);
  const deltas = candidateA.standardized.map((value, index) =>
    finite(value - candidateB.standardized[index]!));
  const scoreDelta = finite(kahanSum(deltas.map((delta, index) =>
    finite(coefficients[index]! * delta))));
  const unclippedProbability = scoreDelta === 0 ? 0.5 : stableSigmoid(scoreDelta);
  const probability = finite(Math.min(1 - 1e-6, Math.max(1e-6, unclippedProbability)));
  const common = commonOutputFields(model, candidateA.candidate);
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.pairwise-prediction-input/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    ...common,
    candidate_a: {
      candidate_ref: candidateA.candidate.candidate_ref,
      expression_digest: candidateA.candidate.expression_digest,
      vector_ref: candidateA.candidate.vector_ref,
      vector_digest: candidateA.candidate.vector.vector_digest,
      candidate_verification_digest: candidateA.candidate.verification_digest,
    },
    candidate_b: {
      candidate_ref: candidateB.candidate.candidate_ref,
      expression_digest: candidateB.candidate.expression_digest,
      vector_ref: candidateB.candidate.vector_ref,
      vector_digest: candidateB.candidate.vector.vector_digest,
      candidate_verification_digest: candidateB.candidate.verification_digest,
    },
  });
  const preimage = {
    contract_version: "contentmd.pairwise-prediction/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    ...common,
    candidate_a_ref: candidateA.candidate.candidate_ref,
    candidate_b_ref: candidateB.candidate.candidate_ref,
    candidate_a_vector_ref: candidateA.candidate.vector_ref,
    candidate_b_vector_ref: candidateB.candidate.vector_ref,
    candidate_a_verification_digest: candidateA.candidate.verification_digest,
    candidate_b_verification_digest: candidateB.candidate.verification_digest,
    score_delta_bits: binary64ToHex(scoreDelta),
    unclipped_probability_bits: binary64ToHex(unclippedProbability),
    probability_bits: binary64ToHex(probability),
    probability,
    input_digest: inputDigest,
  };
  return immutable({ ...preimage, prediction_digest: sha256Canonical(preimage) });
}

function digestCompare(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

export function rankEligibleExpressions(
  suppliedModel: VerifiedRankingModel,
  suppliedCandidates: readonly [VerifiedPairwiseCandidate, ...VerifiedPairwiseCandidate[]],
): PairwiseRankResult {
  const model = task5RequireVerifiedRankingModel(suppliedModel);
  if (!Array.isArray(suppliedCandidates) || suppliedCandidates.length === 0) {
    task5Fail("ranking_input_shape_invalid");
  }
  const prepared = suppliedCandidates.map((candidate) => prepareCandidate(model, candidate));
  assertUniqueCandidates(prepared.map(({ candidate }) => candidate));
  for (const candidate of prepared.slice(1)) {
    assertSharedBindings(prepared[0]!.candidate, candidate.candidate);
  }
  const common = commonOutputFields(model, prepared[0]!.candidate);
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.pairwise-rank-input/0.1.0",
    record_mode: "development_fixture",
    authority_effect: "none",
    ...common,
    candidates: prepared.map(({ candidate }, originalIndex) => ({
      candidate_ref: candidate.candidate_ref,
      expression_digest: candidate.expression_digest,
      vector_ref: candidate.vector_ref,
      vector_digest: candidate.vector.vector_digest,
      candidate_verification_digest: candidate.verification_digest,
      original_index: originalIndex,
    })),
  });
  const sorted = prepared.map((candidate, originalIndex) => ({ candidate, originalIndex }))
    .sort((left, right) => right.candidate.score - left.candidate.score
      || digestCompare(
        left.candidate.candidate.expression_digest,
        right.candidate.candidate.expression_digest,
      ));
  const orderedCandidates = sorted.map(({ candidate, originalIndex }, finalRank) => ({
    candidate_ref: candidate.candidate.candidate_ref,
    expression_digest: candidate.candidate.expression_digest,
    vector_ref: candidate.candidate.vector_ref,
    vector_digest: candidate.candidate.vector.vector_digest,
    candidate_verification_digest: candidate.candidate.verification_digest,
    score_bits: candidate.scoreBits,
    original_index: originalIndex,
    final_rank: finalRank,
  })) as [RankedCandidate, ...RankedCandidate[]];
  const buckets: PairwiseRankTieBucket[] = [];
  for (const candidate of orderedCandidates) {
    const previous = buckets.at(-1);
    const tieCandidate: PairwiseRankTieCandidate = {
      candidate_ref: candidate.candidate_ref,
      vector_ref: candidate.vector_ref,
      expression_digest: candidate.expression_digest,
    };
    if (previous !== undefined && previous.score_bits === candidate.score_bits) {
      (previous.candidates as unknown as PairwiseRankTieCandidate[]).push(tieCandidate);
    } else {
      buckets.push({ score_bits: candidate.score_bits, candidates: [tieCandidate] });
    }
  }
  const tieTracePreimage = {
    contract_version: "contentmd.pairwise-rank-tie-trace/0.1.0" as const,
    buckets: buckets as [PairwiseRankTieBucket, ...PairwiseRankTieBucket[]],
  };
  const tieTrace: PairwiseRankTieTrace = {
    ...tieTracePreimage,
    trace_digest: sha256Canonical(tieTracePreimage),
  };
  const preimage = {
    contract_version: "contentmd.pairwise-rank-result/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    ...common,
    ordered_candidates: orderedCandidates,
    tie_trace: tieTrace,
    input_digest: inputDigest,
  };
  return immutable({ ...preimage, output_digest: sha256Canonical(preimage) });
}
