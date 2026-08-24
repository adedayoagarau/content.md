import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
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
} from "../src/index.js";
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

function runtimeProfile() {
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
  return admitPairwiseRuntime({ ...identity, profile_digest: sha256Canonical(identity) });
}

function verifiedRankingFixture() {
  const fixture = task5FeatureMatrixFixture();
  const dataset = verifyLearningDatasetForTraining({
    record_mode: "development_fixture",
    replay: fixture.datasetReplay,
  });
  const featureMatrix = verifyPairwiseFeatureMatrix({
    record_mode: "development_fixture",
    dataset,
    replay: fixture.replay,
  });
  const request = {
    contract_version: "contentmd.pairwise-training-request/0.1.0" as const,
    record_mode: "development_fixture" as const,
    purpose: "candidate" as const,
    dataset,
    feature_matrix: featureMatrix,
    code_manifest: codeManifest(),
    runtime_profile: runtimeProfile(),
  };
  const training = trainPairwiseLogistic(request);
  if (training.state !== "trained") throw new Error(`unexpected training state: ${training.state}`);
  const model = verifyRankingModel(training.model_record, { training_request: request });
  const row = fixture.replay.rows[0]!;
  const candidateA = verifyPairwiseCandidate({
    record_mode: "development_fixture",
    profile: fixture.replay.profile,
    replay: row.candidate_a,
  });
  const candidateB = verifyPairwiseCandidate({
    record_mode: "development_fixture",
    profile: fixture.replay.profile,
    replay: row.candidate_b,
  });
  return { fixture, model, row, candidateA, candidateB };
}

describe("Task 5 verified ranking", () => {
  it("binds prediction and rank outputs to replayed candidates with no authority effect", () => {
    const { fixture, model, row, candidateA, candidateB } = verifiedRankingFixture();
    const prediction = predictPairwise(model, candidateA, candidateB);
    const reverse = predictPairwise(model, candidateB, candidateA);
    const { prediction_digest: predictionDigest, ...predictionPreimage } = prediction;

    expect(predictionDigest).toBe(sha256Canonical(predictionPreimage));
    expect(prediction.authority_effect).toBe("none");
    expect(prediction.feature_runtime_profile_ref).not.toEqual(
      prediction.pairwise_runtime_profile_ref,
    );
    expect(prediction.probability + reverse.probability).toBe(1);
    expect(row.label === 1 ? prediction.probability > 0.5 : prediction.probability < 0.5)
      .toBe(true);
    expect(Object.isFrozen(prediction)).toBe(true);

    const ranked = rankEligibleExpressions(model, [candidateA, candidateB]);
    const { output_digest: outputDigest, ...rankPreimage } = ranked;
    const { trace_digest: traceDigest, ...tracePreimage } = ranked.tie_trace;
    expect(outputDigest).toBe(sha256Canonical(rankPreimage));
    expect(traceDigest).toBe(sha256Canonical(tracePreimage));
    expect(ranked.ordered_candidates[0]!.candidate_ref).toEqual(
      row.label === 1 ? candidateA.candidate_ref : candidateB.candidate_ref,
    );
    expect(ranked.ordered_candidates.map(({ final_rank }) => final_rank)).toEqual([0, 1]);
    expect(Object.isFrozen(ranked.ordered_candidates)).toBe(true);

    const tieRow = fixture.replay.rows.find((candidate) =>
      candidate.candidate_a.expected_vector.values.every(
        (value, index) => value === candidate.candidate_b.expected_vector.values[index],
      ));
    expect(tieRow).toBeDefined();
    const tieCandidateA = verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: tieRow!.candidate_a,
    });
    const tieCandidateB = verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: tieRow!.candidate_b,
    });
    const tiePrediction = predictPairwise(model, tieCandidateA, tieCandidateB);
    const tied = rankEligibleExpressions(model, [tieCandidateB, tieCandidateA]);

    expect(tiePrediction.probability).toBe(0.5);
    expect(tiePrediction.probability_bits).toBe("3fe0000000000000");
    expect(tiePrediction.score_delta_bits).toBe("0000000000000000");
    expect(tied.ordered_candidates[0]!.score_bits).toBe(tied.ordered_candidates[1]!.score_bits);
    expect(tied.tie_trace.buckets).toHaveLength(1);
    expect(tied.tie_trace.buckets[0]!.candidates).toHaveLength(2);
    expect(tied.ordered_candidates.map(({ expression_digest }) => expression_digest)).toEqual(
      [tieCandidateA.expression_digest, tieCandidateB.expression_digest].sort(),
    );
  }, 300_000);

  it("rejects duplicate candidates and structural token casts", () => {
    const { model, candidateA, candidateB } = verifiedRankingFixture();

    expect(() => predictPairwise(model, candidateA, candidateA)).toThrow(
      "task5_contract_invalid:ranking_reference_invalid",
    );
    expect(() => rankEligibleExpressions(model, [candidateA, candidateA])).toThrow(
      "task5_contract_invalid:ranking_reference_invalid",
    );
    expect(() => predictPairwise(
      structuredClone(model),
      candidateA,
      candidateB,
    )).toThrow("task5_contract_invalid:ranking_model_invalid");
    expect(() => predictPairwise(
      model,
      structuredClone(candidateA),
      candidateB,
    )).toThrow("task5_contract_invalid:ranking_candidate_ineligible");

    const forged = structuredClone(model.record);
    forged.payload.coefficient_bits[0] = "3ff0000000000000";
    const coefficientSetDigest = sha256Canonical({
      contract_version: "contentmd.pairwise-coefficient-set/0.1.0",
      feature_order: forged.payload.feature_order,
      coefficient_bits: forged.payload.coefficient_bits,
    });
    forged.payload.model_artifact_digest = sha256Canonical({
      contract_version: "contentmd.ranking-model-artifact-preimage/0.1.0",
      record_mode: forged.payload.record_mode,
      ranking_objective: forged.payload.ranking_objective,
      candidate_kind: forged.payload.candidate_kind,
      schema_digest: forged.payload.schema_digest,
      authority_effect: forged.payload.authority_effect,
      algorithm: forged.payload.algorithm,
      dataset_ref: forged.payload.dataset_ref,
      feature_profile_ref: forged.payload.feature_profile_ref,
      hyperparameters: forged.payload.hyperparameters,
      feature_order: forged.payload.feature_order,
      standardization: forged.payload.standardization,
      coefficient_bits: forged.payload.coefficient_bits,
      coefficient_set_digest: coefficientSetDigest,
      training_statistics_ref: forged.payload.training_statistics_ref,
      runtime_profile_ref: forged.payload.runtime_profile_ref,
      code_digest: forged.payload.code_digest,
      input_digest: forged.payload.input_digest,
      model_state: forged.payload.model_state,
    });
    forged.record_id = `ranking_model.${forged.payload.model_artifact_digest.slice(0, 32)}`;
    const { content_digest: _digest, ...forgedPreimage } = forged;
    forged.content_digest = sha256Canonical(forgedPreimage);
    expect(() => verifyRankingModel(forged, {
      training_request: model.training_request,
    })).toThrow("task5_contract_invalid:ranking_model_invalid");
  }, 300_000);
});
