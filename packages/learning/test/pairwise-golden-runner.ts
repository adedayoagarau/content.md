import { readFileSync } from "node:fs";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  admitPairwiseRuntime,
  predictPairwise,
  rankEligibleExpressions,
  trainPairwiseLogistic,
  verifyLearningDatasetForTraining,
  verifyPairwiseCandidate,
  verifyPairwiseCodeManifest,
  verifyPairwiseFeatureMatrix,
  verifyRankingModel,
  type PairwiseFeatureMatrixReplay,
} from "../src/index.js";
import {
  independentPairwiseFit,
  independentPairwisePrediction,
  oracleBinary64FromHex,
} from "./pairwise-oracle.js";
import { task5FeatureMatrixFixture } from "./task5-fixtures.js";

function codeManifest() {
  const preimage = JSON.parse(readFileSync(new URL(
    "../../../fixtures/learning-ranking/pairwise-training-code-manifest.json",
    import.meta.url,
  ), "utf8"));
  return verifyPairwiseCodeManifest({
    ...preimage,
    manifest_digest: sha256Canonical(preimage),
  });
}

function runtimeProfileInput() {
  const identity = {
    contract_version: "contentmd.pairwise-runtime-profile/0.1.0" as const,
    node_version: "24.14.0" as const,
    v8_version: "13.6.233.17-node.41",
    icu_version: "78.2",
    unicode_version: "17.0",
    platform: "darwin",
    architecture: "arm64",
    endianness: "LE" as const,
  };
  return { ...identity, profile_digest: sha256Canonical(identity) };
}

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}) {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

type MatrixRow = PairwiseFeatureMatrixReplay["rows"][number];

function selector(row: MatrixRow, side: "candidate_a" | "candidate_b") {
  return { example_ref: row.example_ref, side };
}

function sameValues(row: MatrixRow): boolean {
  return row.candidate_a.expected_vector.values.every(
    (value, index) => value === row.candidate_b.expected_vector.values[index],
  );
}

export function runPairwiseGolden() {
  const fixture = task5FeatureMatrixFixture();
  const dataset = verifyLearningDatasetForTraining({
    record_mode: "development_fixture",
    replay: fixture.datasetReplay,
  });
  const matrix = verifyPairwiseFeatureMatrix({
    record_mode: "development_fixture",
    dataset,
    replay: fixture.replay,
  });
  const verifiedCode = codeManifest();
  const runtimeProfile = runtimeProfileInput();
  const verifiedRuntime = admitPairwiseRuntime(runtimeProfile);
  const request = {
    contract_version: "contentmd.pairwise-training-request/0.1.0" as const,
    record_mode: "development_fixture" as const,
    purpose: "golden_conformance" as const,
    dataset,
    feature_matrix: matrix,
    code_manifest: verifiedCode,
    runtime_profile: verifiedRuntime,
  };
  const trained = trainPairwiseLogistic(request);
  if (trained.state !== "trained") throw new Error(`pairwise_golden_${trained.state}`);
  const verifiedModel = verifyRankingModel(trained.model_record, { training_request: request });
  const independent = independentPairwiseFit(matrix.training_rows);
  if (canonicalJson(trained.model_record.payload.coefficient_bits)
    !== canonicalJson(independent.final_coefficient_bits)) {
    throw new Error("pairwise_golden_independent_coefficients");
  }

  const ordinaryRowIndex = matrix.training_rows.findIndex((row) =>
    row.candidate_a_values.some((value, index) => value !== row.candidate_b_values[index]));
  const tieRowIndex = matrix.training_rows.findIndex((row) =>
    row.candidate_a_values.every((value, index) => value === row.candidate_b_values[index]));
  if (ordinaryRowIndex < 0 || tieRowIndex < 0) throw new Error("pairwise_golden_case_missing");
  let extremeRowIndex = ordinaryRowIndex;
  let extremeMagnitude = -1;
  for (const [rowIndex, row] of matrix.training_rows.entries()) {
    const score = independentPairwisePrediction(independent, row);
    const magnitude = Math.abs(oracleBinary64FromHex(score.score_delta_bits));
    if (magnitude > extremeMagnitude) {
      extremeMagnitude = magnitude;
      extremeRowIndex = rowIndex;
    }
  }

  const resolve = (rowIndex: number, side: "candidate_a" | "candidate_b") => {
    const row = fixture.replay.rows[rowIndex]!;
    return verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: row[side],
    });
  };
  const predictionCase = (
    case_id: string,
    rowIndex: number,
    reverse: boolean,
  ) => {
    const row = fixture.replay.rows[rowIndex]!;
    const leftSide = reverse ? "candidate_b" as const : "candidate_a" as const;
    const rightSide = reverse ? "candidate_a" as const : "candidate_b" as const;
    const candidateA = resolve(rowIndex, leftSide);
    const candidateB = resolve(rowIndex, rightSide);
    const expected = independentPairwisePrediction(independent, matrix.training_rows[rowIndex]!, reverse);
    const actual = predictPairwise(verifiedModel, candidateA, candidateB);
    if (actual.score_delta_bits !== expected.score_delta_bits
      || actual.unclipped_probability_bits !== expected.unclipped_probability_bits
      || actual.probability_bits !== expected.probability_bits
      || actual.probability !== expected.probability) {
      throw new Error(`pairwise_golden_independent_prediction:${case_id}`);
    }
    return {
      case_id,
      candidate_a: selector(row, leftSide),
      candidate_b: selector(row, rightSide),
      expected_prediction: actual,
    };
  };
  const tieRow = fixture.replay.rows[tieRowIndex]!;
  const tieA = resolve(tieRowIndex, "candidate_a");
  const tieB = resolve(tieRowIndex, "candidate_b");
  const rank = rankEligibleExpressions(verifiedModel, [tieB, tieA]);
  const orderedDigests = rank.ordered_candidates.map(({ expression_digest }) => expression_digest);
  if (canonicalJson(orderedDigests) !== canonicalJson([...orderedDigests].sort())
    || rank.tie_trace.buckets.length !== 1) {
    throw new Error("pairwise_golden_independent_rank_tie");
  }

  const fixtureWithoutDigest = {
    contract_version: "contentmd.pairwise-golden-model/0.1.0" as const,
    record_mode: "development_fixture" as const,
    purpose: "golden_conformance" as const,
    replay_commitment: {
      contract_version: "contentmd.pairwise-golden-replay-commitment/0.1.0" as const,
      dataset_replay_verification_digest: dataset.verification_digest,
      matrix_replay_verification_digest: matrix.verification_digest,
      sealed_dataset_ref: dataset.dataset_ref,
      feature_profile_ref: recordRef(matrix.feature_profile_record),
      training_row_digests: matrix.training_rows.map((row) => sha256Canonical(row)),
    },
    code_manifest_digest: verifiedCode.manifest.manifest_digest,
    runtime_profile: runtimeProfile,
    one_step_witness: {
      feature_order: matrix.feature_order,
      population_value_bits_by_feature: independent.population_value_bits_by_feature,
      mean_bits: independent.mean_bits,
      population_standard_deviation_bits: independent.population_standard_deviation_bits,
      first_row_delta_bits: independent.first_row_delta_bits,
      initial_coefficient_bits: independent.initial_coefficient_bits,
      initial_loss_bits: independent.initial_loss_bits,
      first_gradient_bits: independent.first_gradient_bits,
      first_updated_coefficient_bits: independent.first_updated_coefficient_bits,
      first_updated_loss_bits: independent.first_updated_loss_bits,
    },
    expected_statistics_record: trained.statistics_record,
    expected_model_record: trained.model_record,
    prediction_cases: [
      predictionCase("ordinary", ordinaryRowIndex, false),
      predictionCase("ordinary_reversed", ordinaryRowIndex, true),
      predictionCase("exact_score_tie", tieRowIndex, false),
      predictionCase("greatest_absolute_score_delta", extremeRowIndex, false),
    ],
    rank_case: {
      candidates: [selector(tieRow, "candidate_b"), selector(tieRow, "candidate_a")],
      expected_result: rank,
    },
  };
  return {
    ...fixtureWithoutDigest,
    fixture_semantic_digest: sha256Canonical({
      contract_version: "contentmd.pairwise-golden-model-preimage/0.1.0",
      fixture: fixtureWithoutDigest,
    }),
  };
}

if (process.argv[1]?.endsWith("pairwise-golden-runner.ts")) {
  process.stdout.write(canonicalJson(runPairwiseGolden()));
}
