import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";
import { buildLearningDataset } from "../src/dataset.js";
import { createFeatureProfile, vectorizeCandidate } from "../src/features.js";
import {
  admitPairwiseRuntime,
  PairwiseRankingError,
  trainPairwiseLogistic,
  verifyPairwiseCodeManifest,
  verifyLearningDatasetForTraining,
  verifyPairwiseCandidate,
  verifyPairwiseFeatureMatrix,
  verifyRankingModel,
} from "../src/pairwise-logistic.js";
import {
  task5DatasetBuildInput,
  task5DatasetExpectedBuildResult,
  task5DatasetReplayFixture,
  task5FeatureMatrixFixture,
} from "./task5-fixtures.js";
import { task4Fixture } from "./task4-fixtures.js";
import { predictPairwise, rankEligibleExpressions } from "../src/rank.js";
import * as learningPackage from "../src/index.js";
import { independentPairwiseFit, oracleBinary64 } from "./pairwise-oracle.js";
import { pairwiseRuntimeProfileInput } from "./release-runtime-fixture.js";

function rehashLeakageEvidence<T extends {
  contract_version: string;
  snapshot_version: string;
  record_mode: string;
  cohort_scope: unknown;
  enumeration_state: string;
  subjects: unknown;
  relation_nodes: unknown;
  additional_materials: unknown;
  snapshot_id: string;
  snapshot_digest: string;
}>(snapshot: T): T {
  const identity = {
    contract_version: snapshot.contract_version,
    snapshot_version: snapshot.snapshot_version,
    record_mode: snapshot.record_mode,
    cohort_scope: snapshot.cohort_scope,
    enumeration_state: snapshot.enumeration_state,
    subjects: snapshot.subjects,
    relation_nodes: snapshot.relation_nodes,
    additional_materials: snapshot.additional_materials,
  };
  const snapshot_id = `leakage-evidence.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, snapshot_id };
  return { ...snapshot, snapshot_id, snapshot_digest: sha256Canonical(withoutDigest) };
}

function admittedCodeManifest() {
  const manifestPreimage = JSON.parse(readFileSync(new URL(
    "../../../fixtures/learning-ranking/pairwise-training-code-manifest.json",
    import.meta.url,
  ), "utf8"));
  return verifyPairwiseCodeManifest({
    ...manifestPreimage,
    manifest_digest: sha256Canonical(manifestPreimage),
  });
}

function admittedRuntimeProfile() {
  return admitPairwiseRuntime(pairwiseRuntimeProfileInput());
}

describe("Task 5 code and runtime admission", () => {
  it("exposes only the supported Task 5 seams from the learning package root", () => {
    expect(learningPackage).toMatchObject({
      admitPairwiseRuntime: expect.any(Function),
      predictPairwise: expect.any(Function),
      rankEligibleExpressions: expect.any(Function),
      trainPairwiseLogistic: expect.any(Function),
      verifyLearningDatasetForTraining: expect.any(Function),
      verifyPairwiseCandidate: expect.any(Function),
      verifyPairwiseCodeManifest: expect.any(Function),
      verifyPairwiseFeatureMatrix: expect.any(Function),
      verifyRankingModel: expect.any(Function),
    });
  });

  it("admits the externally locked code manifest into an immutable token", () => {
    const verified = admittedCodeManifest();

    expect(verified.manifest.manifest_digest).toBe(
      sha256Canonical({
        contract_version: verified.manifest.contract_version,
        package_id: verified.manifest.package_id,
        package_version: verified.manifest.package_version,
        entries: verified.manifest.entries,
      }),
    );
    expect(Object.isFrozen(verified)).toBe(true);
    expect(Object.isFrozen(verified.manifest.entries)).toBe(true);
  });

  it("accepts only recursively frozen aliases reconstructed by canonical DAG transport", () => {
    const preimage = JSON.parse(readFileSync(new URL(
      "../../../fixtures/learning-ranking/pairwise-training-code-manifest.json",
      import.meta.url,
    ), "utf8")) as Parameters<typeof verifyPairwiseCodeManifest>[0];
    const mutableEntry = { ...preimage.entries[0]! };
    const mutableEntries = [mutableEntry, mutableEntry, ...preimage.entries.slice(2)];
    const mutableAlias = {
      ...preimage,
      entries: mutableEntries,
      manifest_digest: sha256Canonical({ ...preimage, entries: mutableEntries }),
    };
    expect(() => verifyPairwiseCodeManifest(mutableAlias)).toThrow(
      "task5_contract_invalid:ranking_input_shape_invalid",
    );

    const frozenEntry = Object.freeze({ ...preimage.entries[0]! });
    const frozenEntries = [frozenEntry, frozenEntry, ...preimage.entries.slice(2)];
    const frozenAlias = {
      ...preimage,
      entries: frozenEntries,
      manifest_digest: sha256Canonical({ ...preimage, entries: frozenEntries }),
    };
    expect(() => verifyPairwiseCodeManifest(frozenAlias)).toThrow(
      "task5_contract_invalid:ranking_code_manifest_invalid",
    );
  });

  it("rejects an empty code manifest through the public ranking error boundary", () => {
    expect(() => verifyPairwiseCodeManifest({
      contract_version: "contentmd.pairwise-code-manifest/0.1.0",
      package_id: "@contentmd/learning",
      package_version: "0.1.0",
      entries: [],
      manifest_digest: sha256Canonical({
        contract_version: "contentmd.pairwise-code-manifest/0.1.0",
        package_id: "@contentmd/learning",
        package_version: "0.1.0",
        entries: [],
      }),
    })).toThrow("task5_contract_invalid:ranking_code_manifest_invalid");
  });

  it("rejects an unadmitted but self-consistent numeric runtime profile", () => {
    const identity = {
      contract_version: "contentmd.pairwise-runtime-profile/0.1.0" as const,
      node_version: "24.20.0" as const,
      v8_version: "unadmitted-v8",
      icu_version: "78.2",
      unicode_version: "17.0",
      platform: "darwin",
      architecture: "arm64",
      endianness: "LE" as const,
    };
    expect(() => admitPairwiseRuntime({
      ...identity,
      profile_digest: sha256Canonical(identity),
    })).toThrow("task5_contract_invalid:ranking_runtime_profile_unsupported");
  });

  it("admits only the pinned Node 24 numeric runtime into an immutable token", () => {
    const verified = admittedRuntimeProfile();

    expect(verified.artifact_ref).toEqual({
      artifact_id: "contentmd.pairwise-runtime-profile",
      artifact_version: "0.1.0",
      artifact_digest: verified.profile.profile_digest,
    });
    expect(Object.isFrozen(verified)).toBe(true);
  });
});

describe("Task 5 replay handoff", () => {
  it("rejects official fitting before any nested training dependency read", () => {
    let reads = 0;
    const nested = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("nested training dependency must remain unread");
      },
      ownKeys() {
        reads += 1;
        throw new Error("nested training dependency must remain unread");
      },
    });
    const request = {
      contract_version: "contentmd.pairwise-training-request/0.1.0",
      record_mode: "official",
      purpose: "candidate",
      dataset: nested,
      feature_matrix: nested,
      code_manifest: nested,
      runtime_profile: nested,
    };

    expect(() => trainPairwiseLogistic(request as never)).toThrow(
      "task5_contract_invalid:ranking_official_mode_not_supported",
    );
    expect(reads).toBe(0);
  });

  it("keeps checkpointed product-policy authorization independent of later learning permission", () => {
    const input = task5DatasetBuildInput();
    const subject = input.leakage_evidence.subjects[0]!;
    const acceptanceEntry = subject.example.feature_checkpoint_set.feature_source_manifest.entries
      .find((entry) => entry.source_role === "acceptance_criteria")!;
    if (acceptanceEntry.material.material_kind !== "task2_evidence_snapshot") {
      throw new Error("expected acceptance-criteria evidence snapshot");
    }
    const acceptance = acceptanceEntry.material.value.payload;
    const learningPermission = subject.example.eligibility_input.permission;

    expect(learningPermission).not.toBeNull();
    expect(acceptance.permission_snapshot_ref.content_digest).not.toBe(
      learningPermission!.snapshot_digest,
    );

    const result = buildLearningDataset(input);

    expect(result.diagnostics.submitted_examples).toBe(120);
    expect(result.manifest).not.toBeNull();
  }, 120_000);

  it("normalizes top-level descriptor traps without reading nested replay data", () => {
    let traps = 0;
    const input = new Proxy({}, {
      getPrototypeOf() {
        traps += 1;
        throw new Error("top-level descriptor trap");
      },
    });

    expect(() => verifyLearningDatasetForTraining(input as never)).toThrowError(PairwiseRankingError);
    expect(() => verifyLearningDatasetForTraining(input as never)).toThrow(
      "task5_contract_invalid:ranking_input_shape_invalid",
    );
    expect(traps).toBe(2);
  });

  it.each([
    ["dataset", verifyLearningDatasetForTraining, ["record_mode", "replay"]],
    ["feature matrix", verifyPairwiseFeatureMatrix, ["record_mode", "dataset", "replay"]],
    ["candidate", verifyPairwiseCandidate, ["record_mode", "profile", "replay"]],
  ] as const)("rejects official %s replay before any nested read", (_name, operation, keys) => {
    let reads = 0;
    const nested = new Proxy({}, {
      get() {
        reads += 1;
        throw new Error("nested replay must remain unread");
      },
      ownKeys() {
        reads += 1;
        throw new Error("nested replay must remain unread");
      },
    });
    const input = Object.fromEntries(keys.map((key) => [
      key,
      key === "record_mode" ? "official" : nested,
    ]));

    expect(() => operation(input as never)).toThrowError(PairwiseRankingError);
    expect(() => operation(input as never)).toThrow(
      "task5_contract_invalid:ranking_official_mode_not_supported",
    );
    expect(reads).toBe(0);
  });

  it("replays and seals a complete Task 3 training dataset into an immutable token", () => {
    const replay = task5DatasetReplayFixture();
    const input = { record_mode: "development_fixture" as const, replay };
    const inputBytes = canonicalJson(input);
    const replayedBuild = task5DatasetExpectedBuildResult();
    expect(replayedBuild.manifest).not.toBeNull();
    const manifest = replayedBuild.manifest!;
    const datasetRef = {
      record_id: replay.expected_dataset_record.record_id,
      schema_id: replay.expected_dataset_record.schema_id,
      schema_version: replay.expected_dataset_record.schema_version,
      content_digest: replay.expected_dataset_record.content_digest,
    };
    const derivedSealInput = {
      record_mode: "development_fixture" as const,
      producer: replay.seal.producer,
      source_manifest: manifest,
      witness: replay.seal.witness,
    };

    const verified = verifyLearningDatasetForTraining(input);

    expect(verified).toEqual({
      contract_version: "contentmd.verified-learning-dataset/0.1.0",
      record_mode: "development_fixture",
      replay,
      replayed_build_result: replayedBuild,
      dataset_record: replay.expected_dataset_record,
      dataset_ref: datasetRef,
      verification_digest: sha256Canonical({
        contract_version: "contentmd.verified-learning-dataset/0.1.0",
        record_mode: "development_fixture",
        replay,
        replayed_build_result: replayedBuild,
        derived_seal_input: derivedSealInput,
        dataset_ref: datasetRef,
      }),
    });
    expect(verified.dataset_record.payload.dataset_state).toBe("sealed");
    expect(verified.dataset_record.payload.test_open_state).toBe("sealed");
    expect(verified.dataset_record.payload.train_example_refs.length).toBeGreaterThan(0);
    expect(Object.isFrozen(verified)).toBe(true);
    expect(Object.isFrozen(verified.replay.build_input.leakage_evidence.subjects)).toBe(true);
    expect(canonicalJson(input)).toBe(inputBytes);
  }, 120_000);

  it("derives the complete Task 4 training matrix in sealed Task 3 train order", () => {
    const fixture = task5FeatureMatrixFixture();
    const dataset = verifyLearningDatasetForTraining({
      record_mode: "development_fixture",
      replay: fixture.datasetReplay,
    });

    const verified = verifyPairwiseFeatureMatrix({
      record_mode: "development_fixture",
      dataset,
      replay: fixture.replay,
    });

    expect(verified.training_rows).toHaveLength(80);
    expect(verified.training_rows.map((row) => row.example_ref)).toEqual(
      dataset.dataset_record.payload.train_example_refs,
    );
    expect(verified.training_rows.every((row) =>
      row.candidate_a_values.length === 21 && row.candidate_b_values.length === 21)).toBe(true);
    expect(new Set(verified.training_rows.map((row) => row.label))).toEqual(new Set([0, 1]));
    expect(verified.training_rows.some((row) => row.candidate_a_values.some(
      (value, index) => value !== row.candidate_b_values[index],
    ))).toBe(true);
    expect(verified.training_rows.some((row) => row.candidate_a_values.every(
      (value, index) => value === row.candidate_b_values[index],
    ))).toBe(true);
    expect(verified.feature_profile_record).toEqual(fixture.replay.profile.expected_profile);
    expect(verified.browser_feature_count).toBe(0);
    expect(verified.competitor_feature_count).toBe(0);
    expect(verified.third_party_label_count).toBe(0);
    expect(Object.isFrozen(verified)).toBe(true);
    expect(Object.isFrozen(verified.training_rows)).toBe(true);
  }, 240_000);

  it("arbitrates independent row candidates by Task 5 category before replay slot order", () => {
    const fixture = task5FeatureMatrixFixture();
    const dataset = verifyLearningDatasetForTraining({
      record_mode: "development_fixture",
      replay: fixture.datasetReplay,
    });
    const replay = structuredClone(fixture.replay);
    const firstRow = replay.rows[0]!;
    firstRow.candidate_a.expected_vector.values[0] =
      firstRow.candidate_a.expected_vector.values[0] === 1 ? 0 : 1;
    firstRow.candidate_b.vectorization_input.producer.contract_artifact.raw_bytes_digest =
      "0".repeat(64);

    expect(() => verifyPairwiseFeatureMatrix({
      record_mode: "development_fixture",
      dataset,
      replay,
    })).toThrow("task5_contract_invalid:ranking_digest_invalid");
  }, 300_000);

  it("fits the sealed 21-position training matrix into a deterministic trained model", () => {
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

    const result = trainPairwiseLogistic({
      contract_version: "contentmd.pairwise-training-request/0.1.0",
      record_mode: "development_fixture",
      purpose: "candidate",
      dataset,
      feature_matrix: featureMatrix,
      code_manifest: admittedCodeManifest(),
      runtime_profile: admittedRuntimeProfile(),
    });

    expect(result.state).toBe("trained");
    if (result.state !== "trained") throw new Error(`unexpected training state: ${result.state}`);
    expect(result.model_record.payload.feature_order).toHaveLength(21);
    expect(result.model_record.payload.standardization).toHaveLength(21);
    expect(result.model_record.payload.coefficient_bits).toHaveLength(21);
    expect(result.model_record.payload.coefficient_bits.some((bits) =>
      bits !== "0000000000000000")).toBe(true);
    expect(result.model_record.payload.standardization[0]).toEqual({
      feature_name: "project_match",
      mean: 1,
      population_standard_deviation: 0,
    });
    expect(result.model_record.payload.coefficient_bits[0]).toBe("0000000000000000");
    expect(result.model_record.payload.model_state).toBe("trained");
    expect(result.statistics_record.payload.statistics_state).toBe("completed");
    const independent = independentPairwiseFit(featureMatrix.training_rows);
    expect(result.model_record.payload.coefficient_bits).toEqual(
      independent.final_coefficient_bits,
    );
    expect(result.model_record.payload.standardization.map(({ mean }) =>
      oracleBinary64(mean))).toEqual(independent.mean_bits);
    expect(result.model_record.payload.standardization.map(({ population_standard_deviation }) =>
      oracleBinary64(population_standard_deviation))).toEqual(
      independent.population_standard_deviation_bits,
    );
    expect(result.statistics_record.payload.initial_loss_bits).toBe(
      independent.initial_loss_bits,
    );
    expect(result.statistics_record.payload.final_loss_bits).toBe(independent.final_loss_bits);
    expect(result.statistics_record.payload.iterations_completed).toBe(
      independent.iterations_completed,
    );
    expect(validateRecord(SCHEMA_IDS.rankingModel, result.model_record)).toEqual({
      valid: true,
      errors: [],
    });
    expect(validateRecord(
      SCHEMA_IDS.modelTrainingStatistics,
      result.statistics_record,
    )).toEqual({ valid: true, errors: [] });

    const verifiedModel = verifyRankingModel(result.model_record, {
      training_request: {
        contract_version: "contentmd.pairwise-training-request/0.1.0",
        record_mode: "development_fixture",
        purpose: "candidate",
        dataset,
        feature_matrix: featureMatrix,
        code_manifest: admittedCodeManifest(),
        runtime_profile: admittedRuntimeProfile(),
      },
    });
    expect(verifiedModel.record).toEqual(result.model_record);
    expect(verifiedModel.feature_order).toEqual(result.model_record.payload.feature_order);
    expect(Object.isFrozen(verifiedModel)).toBe(true);

    const firstRow = fixture.replay.rows[0]!;
    const candidateA = verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: firstRow.candidate_a,
    });
    const candidateB = verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: firstRow.candidate_b,
    });
    const prediction = predictPairwise(verifiedModel, candidateA, candidateB);
    const reversed = predictPairwise(verifiedModel, candidateB, candidateA);

    expect(prediction.authority_effect).toBe("none");
    expect(prediction.probability).toBeGreaterThanOrEqual(1e-6);
    expect(prediction.probability).toBeLessThanOrEqual(1 - 1e-6);
    expect(prediction.candidate_a_ref).toEqual(candidateA.candidate_ref);
    expect(reversed.candidate_a_ref).toEqual(candidateB.candidate_ref);
    expect(prediction.probability + reversed.probability).toBe(1);
    expect(firstRow.label === 1
      ? prediction.probability > 0.5
      : prediction.probability < 0.5).toBe(true);

    const ranked = rankEligibleExpressions(verifiedModel, [candidateA, candidateB]);
    expect(ranked.authority_effect).toBe("none");
    expect(ranked.ordered_candidates).toHaveLength(2);
    expect(ranked.ordered_candidates.map((candidate) => candidate.final_rank)).toEqual([0, 1]);
    expect(new Set(ranked.ordered_candidates.map((candidate) =>
      candidate.candidate_ref.record_id)).size).toBe(2);
    expect(ranked.ordered_candidates[0]!.candidate_ref).toEqual(
      firstRow.label === 1 ? candidateA.candidate_ref : candidateB.candidate_ref,
    );
  }, 300_000);

  it("rejects a valid but below-threshold Task 3 build before seal replay", () => {
    const replay = task5DatasetReplayFixture();
    const evidence = replay.build_input.leakage_evidence;
    const relation = evidence.relation_nodes[0]!;
    const memberKeys = new Set(relation.member_example_refs.map(canonicalJson));
    const evidenceKeys = new Set(relation.evidence_refs.map(canonicalJson));
    replay.build_input.leakage_evidence = rehashLeakageEvidence({
      ...evidence,
      subjects: evidence.subjects.filter((subject) => memberKeys.has(canonicalJson({
        record_id: subject.example.preference.record_id,
        schema_id: subject.example.preference.schema_id,
        schema_version: subject.example.preference.schema_version,
        content_digest: subject.example.preference.content_digest,
      }))) as typeof evidence.subjects,
      relation_nodes: [relation],
      additional_materials: evidence.additional_materials.filter((material) =>
        evidenceKeys.has(canonicalJson(material.material_ref))),
    });

    let thrown: unknown;
    try {
      verifyLearningDatasetForTraining({ record_mode: "development_fixture", replay });
    } catch (error) {
      thrown = error;
    }
    expect(thrown).toBeInstanceOf(PairwiseRankingError);
    expect((thrown as Error).message).toBe(
      "task5_contract_invalid:learning_dataset_insufficient",
    );
  }, 120_000);

  it("replays a complete Task 4 profile and eligible vector into an immutable candidate token", () => {
    const fixture = task4Fixture();
    const profile = createFeatureProfile(fixture.profileInput);
    const vectorResult = vectorizeCandidate(fixture.vectorInput);
    expect(vectorResult.status).toBe("eligible");
    if (vectorResult.status !== "eligible") throw new Error("expected eligible Task 4 fixture");
    const {
      record_mode: _mode,
      profile: _profile,
      profile_input: _profileInput,
      ...vectorizationInput
    } = fixture.vectorInput;
    const input = JSON.parse(canonicalJson({
      record_mode: "development_fixture",
      profile: {
        contract_version: "contentmd.pairwise-feature-profile-replay/0.1.0",
        profile_input: fixture.profileInput,
        expected_profile: profile,
      },
      replay: {
        contract_version: "contentmd.pairwise-candidate-vector-replay/0.1.0",
        vectorization_input: vectorizationInput,
        expected_vector: vectorResult.vector,
      },
    }));
    const candidateRef = {
      record_id: fixture.vectorInput.candidate.snapshot_id,
      schema_id: "contentmd.task2-candidate-snapshot",
      schema_version: "0.1.0" as const,
      content_digest: fixture.vectorInput.candidate.snapshot_digest,
    };
    const vectorRef = {
      record_id: vectorResult.vector.vector_id,
      schema_id: "contentmd.task4-candidate-feature-vector",
      schema_version: "0.1.0" as const,
      content_digest: vectorResult.vector.vector_digest,
    };
    const identity = {
      contract_version: "contentmd.verified-pairwise-candidate/0.1.0" as const,
      record_mode: "development_fixture" as const,
      profile,
      replay: input.replay,
      vector_ref: vectorRef,
      candidate_ref: candidateRef,
      expression_digest: fixture.vectorInput.candidate.payload.expression_digest,
    };

    const verified = verifyPairwiseCandidate(input);

    expect(verified).toEqual({
      contract_version: identity.contract_version,
      record_mode: identity.record_mode,
      verification_input: input,
      profile,
      replay: input.replay,
      vector: vectorResult.vector,
      vector_ref: vectorRef,
      candidate_ref: candidateRef,
      expression_digest: identity.expression_digest,
      verification_digest: sha256Canonical(identity),
    });
    expect(Object.isFrozen(verified)).toBe(true);
    expect(Object.isFrozen(verified.vector.values)).toBe(true);
  }, 60_000);
});
