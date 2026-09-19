import { readFileSync } from "node:fs";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { endianness, tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { canonicalJson, encodeCanonicalDag, sha256Canonical } from "@contentmd/core";
import {
  admitPairwiseRuntime,
  rankEligibleExpressions,
  trainPairwiseLogistic,
  verifyLearningDatasetForTraining,
  verifyPairwiseCandidate,
  verifyPairwiseCodeManifest,
  verifyPairwiseFeatureMatrix,
  verifyRankingModel,
  type SimulatedVerifiedBindingProjection,
  type Task6ObjectRef,
  type VerifiedRankingModel,
} from "@contentmd/learning";
import type { ContentDraftProposal } from "@contentmd/writer";
import { describe, expect, it } from "vitest";
import { task5FeatureMatrixFixture } from "../../learning/test/task5-fixtures.js";
import { selectGovernedDraftAlternative } from "../src/draft-selection.js";
import * as localRuntime from "../src/local-runtime.js";

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
    v8_version: process.versions.v8,
    icu_version: process.versions.icu!,
    unicode_version: process.versions.unicode!,
    platform: process.platform,
    architecture: process.arch,
    endianness: endianness(),
  };
  return admitPairwiseRuntime({ ...identity, profile_digest: sha256Canonical(identity) });
}

function createRankingFixture() {
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
  if (training.state !== "trained") throw new Error(`unexpected_training_state:${training.state}`);
  const model = verifyRankingModel(training.model_record, { training_request: request });
  const row = fixture.replay.rows[0]!;
  const candidateReplays = [
    {
      record_mode: "development_fixture" as const,
      profile: fixture.replay.profile,
      replay: row.candidate_a,
    },
    {
      record_mode: "development_fixture" as const,
      profile: fixture.replay.profile,
      replay: row.candidate_b,
    },
  ] as const;
  const candidates = [
    verifyPairwiseCandidate(candidateReplays[0]),
    verifyPairwiseCandidate(candidateReplays[1]),
  ] as const;
  const expressions = [
    row.candidate_a.vectorization_input.candidate.payload.expression,
    row.candidate_b.vectorization_input.candidate.payload.expression,
  ] as const;
  return { model, candidates, candidateReplays, expressions, request, training };
}

let cachedRankingFixture: ReturnType<typeof createRankingFixture> | undefined;

function rankingFixture(): ReturnType<typeof createRankingFixture> {
  cachedRankingFixture ??= createRankingFixture();
  return cachedRankingFixture;
}

function objectRef(label: string): Task6ObjectRef {
  return {
    record_id: `fixture.${label}`,
    schema_id: "contentmd.synthetic-reference-record",
    schema_version: "0.1.0",
    content_digest: sha256Canonical({ fixture: label }),
  };
}

function draft(expressions: readonly [string, string]): ContentDraftProposal {
  return {
    schema_version: "contentmd.draft-proposal/0.1.0",
    proposal_id: "proposal.draft.verified-selection",
    lifecycle_state: "proposed",
    authority_effect: "none",
    alternatives: expressions.map((proposed_text, index) => ({
      purpose: `purpose-${index}`,
      original_text: null,
      proposed_text,
      rationale: `rationale-${index}`,
      occurrence_refs: [],
      evidence_refs: ["evidence.synthetic"],
      pattern_refs: ["pattern.synthetic"],
      uncertainty: "synthetic fixture",
    })),
    message_hierarchy: [],
    evidence_refs: ["evidence.synthetic"],
    pattern_refs: ["pattern.synthetic"],
    prohibited_claims_omitted: [],
    uncertainty: ["synthetic fixture"],
    tradeoffs: [],
    model_trace: {
      request_id: "request.synthetic",
      input_digest: sha256Canonical({ input: "synthetic" }),
      output_digest: sha256Canonical({ output: "synthetic" }),
      provider_id: "provider.synthetic.recorded",
      model_id: "model.synthetic.recorded-1",
      deterministic_status: "recorded_replay",
    },
  };
}

function candidateProjection(
  modelRef: Task6ObjectRef,
  baselineRef: Task6ObjectRef,
): SimulatedVerifiedBindingProjection {
  const semantic = {
    contract_version: "contentmd.simulated-binding-projection/0.1.0" as const,
    record_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    projection_stage: "verified" as const,
    stream_id: `learning_binding_sim.${"a".repeat(32)}`,
    verified_head_digest: "b".repeat(64),
    physical_head_digest: "b".repeat(64),
    state: "candidate" as const,
    baseline_ref: baselineRef,
    model_ref: modelRef,
    verified_transition_id: `learning_transition.${"c".repeat(32)}`,
    pending_transition_id: null,
    pending_proposed_projection_digest: null,
    superseded_verified_event_digests: [] as string[],
  };
  const projectionDigest = sha256Canonical(semantic);
  return {
    ...semantic,
    projection_id: `simulated_binding_projection.${projectionDigest.slice(0, 32)}`,
    projection_digest: projectionDigest,
  };
}

function localTrainingArtifactFixture() {
  const { request, training } = rankingFixture();
  const trainingReplay = {
    contract_version: "contentmd.local-pairwise-training-replay/0.1.0" as const,
    record_mode: request.record_mode,
    purpose: request.purpose,
    dataset_replay: request.dataset.replay,
    feature_matrix_replay: request.feature_matrix.replay,
    code_manifest: request.code_manifest.manifest,
    runtime_profile: request.runtime_profile.profile,
  };
  const artifact = encodeCanonicalDag({
    contract_version: "contentmd.local-learning-training-artifact/0.1.0" as const,
    training_replay: trainingReplay,
    training,
  });
  return { artifact, training };
}

describe("governed writer alternative selection", () => {
  it("uses the replay-verified learned rank only when the active binding matches", () => {
    const fixture = rankingFixture();
    const proposal = draft(fixture.expressions);
    const fallbackBaselineRef = objectRef("baseline");
    const modelRef = {
      record_id: fixture.model.record.record_id,
      schema_id: fixture.model.record.schema_id,
      schema_version: fixture.model.record.schema_version,
      content_digest: fixture.model.record.content_digest,
    };
    const expected = rankEligibleExpressions(fixture.model, fixture.candidates);

    const selection = selectGovernedDraftAlternative({
      record_mode: "development_fixture",
      draft: proposal,
      fallback_baseline_ref: fallbackBaselineRef,
      binding_projection: candidateProjection(modelRef, fallbackBaselineRef),
      verified_model: fixture.model,
      verified_candidates: fixture.candidates,
    });

    expect(selection.selection_path).toBe("verified_learned_rank");
    expect(selection.selected_expression_digest).toBe(
      expected.ordered_candidates[0]!.expression_digest,
    );
    expect(selection.ranking_output_digest).toBe(expected.output_digest);
    expect(selection.reason_code).toBe("active_model_verified");
    expect(selection.authority_effect).toBe("none");
    expect(Object.isFrozen(selection)).toBe(true);
  }, 300_000);

  it("falls back deterministically when no verified active model is available", () => {
    const expressions = ["Second synthetic option.", "First synthetic option."] as const;
    const proposal = draft(expressions);

    const first = selectGovernedDraftAlternative({
      record_mode: "development_fixture",
      draft: proposal,
      fallback_baseline_ref: objectRef("baseline"),
      binding_projection: null,
      verified_model: null,
      verified_candidates: null,
    });
    const second = selectGovernedDraftAlternative({
      record_mode: "development_fixture",
      draft: structuredClone(proposal),
      fallback_baseline_ref: objectRef("baseline"),
      binding_projection: null,
      verified_model: null,
      verified_candidates: null,
    });

    expect(first).toEqual(second);
    expect(first.selection_path).toBe("deterministic_safe_fallback");
    expect(first.reason_code).toBe("no_active_binding");
    expect(first.ranking_output_digest).toBeNull();
    expect(first.ordered_expression_digests).toEqual(
      [...first.ordered_expression_digests].sort(),
    );
  });

  it("does not use a verified model when the active binding names another model", () => {
    const fixture = rankingFixture();
    const fallbackBaselineRef = objectRef("baseline");

    const selection = selectGovernedDraftAlternative({
      record_mode: "development_fixture",
      draft: draft(fixture.expressions),
      fallback_baseline_ref: fallbackBaselineRef,
      binding_projection: candidateProjection(objectRef("different-model"), fallbackBaselineRef),
      verified_model: fixture.model,
      verified_candidates: fixture.candidates,
    });

    expect(selection.selection_path).toBe("deterministic_safe_fallback");
    expect(selection.reason_code).toBe("active_model_binding_mismatch");
    expect(selection.model_ref).toBeNull();
  }, 300_000);

  it("rejects a draft whose text is not the verified candidate expression", () => {
    const fixture = rankingFixture();
    const proposal = draft(fixture.expressions);
    proposal.alternatives[0]!.proposed_text = "Unverified replacement.";
    const fallbackBaselineRef = objectRef("baseline");
    const modelRef = {
      record_id: fixture.model.record.record_id,
      schema_id: fixture.model.record.schema_id,
      schema_version: fixture.model.record.schema_version,
      content_digest: fixture.model.record.content_digest,
    };

    expect(() => selectGovernedDraftAlternative({
      record_mode: "development_fixture",
      draft: proposal,
      fallback_baseline_ref: fallbackBaselineRef,
      binding_projection: candidateProjection(modelRef, fallbackBaselineRef),
      verified_model: fixture.model,
      verified_candidates: fixture.candidates,
    })).toThrow("draft_selection_invalid:candidate_expression_binding");
  }, 300_000);
});

describe("persisted local training artifacts", () => {
  it("rehydrates a byte-exact training artifact only through fresh model verification", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-training-artifact-"));
    try {
      const fixture = localTrainingArtifactFixture();
      const artifactPath = join(root, ".contentmd/runtime/learning-training-result.dag.json");
      await mkdir(dirname(artifactPath), { recursive: true });
      await writeFile(artifactPath, canonicalJson(fixture.artifact));

      const runtime = localRuntime as unknown as {
        loadLocalVerifiedTrainingModel?: (projectRoot: string) => Promise<{
          readonly training_artifact_digest: string;
          readonly model: VerifiedRankingModel;
        }>;
      };
      expect(runtime.loadLocalVerifiedTrainingModel).toBeTypeOf("function");
      const restored = await runtime.loadLocalVerifiedTrainingModel!(root);

      expect(restored.training_artifact_digest).toBe(fixture.artifact.root_digest);
      expect(restored.model.record).toEqual(fixture.training.model_record);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }, 300_000);

  it("selects a persisted local draft only through a matching active model and candidate replays", async () => {
    const root = await mkdtemp(join(tmpdir(), "contentmd-governed-draft-selection-"));
    try {
      const fixture = rankingFixture();
      const proposal = draft(fixture.expressions);
      const fallbackBaselineRef = objectRef("selection-baseline");
      const modelRef = {
        record_id: fixture.model.record.record_id,
        schema_id: fixture.model.record.schema_id,
        schema_version: fixture.model.record.schema_version,
        content_digest: fixture.model.record.content_digest,
      };
      const trainingArtifact = encodeCanonicalDag({
        contract_version: "contentmd.local-learning-training-artifact/0.1.0" as const,
        training_replay: {
          contract_version: "contentmd.local-pairwise-training-replay/0.1.0" as const,
          record_mode: fixture.request.record_mode,
          purpose: fixture.request.purpose,
          dataset_replay: fixture.request.dataset.replay,
          feature_matrix_replay: fixture.request.feature_matrix.replay,
          code_manifest: fixture.request.code_manifest.manifest,
          runtime_profile: fixture.request.runtime_profile.profile,
        },
        training: fixture.training,
      });
      const runtimeDir = join(root, ".contentmd/runtime");
      const inputPath = join(root, ".contentmd/learning/draft-selection-input.json");
      await mkdir(dirname(inputPath), { recursive: true });
      await mkdir(runtimeDir, { recursive: true });
      await writeFile(join(runtimeDir, "draft.json"), canonicalJson(proposal));
      await writeFile(
        join(runtimeDir, "learning-training-result.dag.json"),
        canonicalJson(trainingArtifact),
      );
      await writeFile(inputPath, canonicalJson({
        contract_version: "contentmd.local-governed-draft-selection-replay/0.1.0",
        record_mode: "development_fixture",
        proposal_id: proposal.proposal_id,
        draft_digest: sha256Canonical(proposal),
        fallback_baseline_ref: fallbackBaselineRef,
        binding_projection: candidateProjection(modelRef, fallbackBaselineRef),
        candidate_replays: fixture.candidateReplays,
      }));

      const runtime = localRuntime as unknown as {
        selectLocalDraftAlternative?: (projectRoot: string, selectionInputPath: string) => Promise<unknown>;
      };
      expect(runtime.selectLocalDraftAlternative).toBeTypeOf("function");
      const selection = await runtime.selectLocalDraftAlternative!(root, inputPath) as {
        readonly selection_path: string;
        readonly selected_expression_digest: string;
        readonly model_ref: typeof modelRef | null;
      };

      expect(selection).toMatchObject({
        selection_path: "verified_learned_rank",
        model_ref: modelRef,
      });
      expect(selection.selected_expression_digest).toBe(
        rankEligibleExpressions(fixture.model, fixture.candidates).ordered_candidates[0]!.expression_digest,
      );
      expect(JSON.parse(await readFile(join(runtimeDir, "draft-selection.json"), "utf8"))).toEqual(selection);
    } finally {
      await rm(root, { recursive: true, force: true });
    }
  }, 300_000);
});
