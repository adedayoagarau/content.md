import { readFileSync } from "node:fs";
import { sha256Canonical } from "@contentmd/core";
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
} from "@contentmd/learning";
import type { ContentDraftProposal } from "@contentmd/writer";
import { describe, expect, it } from "vitest";
import { task5FeatureMatrixFixture } from "../../learning/test/task5-fixtures.js";
import { selectGovernedDraftAlternative } from "../src/draft-selection.js";

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

function rankingFixture() {
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
  const candidates = [
    verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: row.candidate_a,
    }),
    verifyPairwiseCandidate({
      record_mode: "development_fixture",
      profile: fixture.replay.profile,
      replay: row.candidate_b,
    }),
  ] as const;
  const expressions = [
    row.candidate_a.vectorization_input.candidate.payload.expression,
    row.candidate_b.vectorization_input.candidate.payload.expression,
  ] as const;
  return { model, candidates, expressions };
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
