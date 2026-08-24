import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  createProjectOwnedComparisonCorpus,
  type ProjectOwnedComparisonCorpus,
} from "@contentmd/research";
import { validateHumanCalibrationArtifact } from "@contentmd/schemas";
import {
  createBlindCalibrationAssignment,
  createHumanCalibrationSplitManifest,
  evaluateHeldOutHumanCalibration,
  mapHumanDimensionRating,
  recordHumanRaterQualification,
  recordHumanDimensionRating,
  type HumanCalibrationPrediction,
  type HumanCalibrationRatingEvidence,
  type HumanDimensionRatingMapping,
  type HumanRaterQualification,
} from "@contentmd/evaluation";
import { describe, expect, it } from "vitest";

function splitFixture(corpus: ProjectOwnedComparisonCorpus) {
  return createHumanCalibrationSplitManifest({
    record_mode: "development_fixture",
    corpus,
    calibration_leakage_group_ids: corpus.leakage_groups.slice(0, 20)
      .map(({ leakage_group_id }) => leakage_group_id),
    analysis_locked_leakage_group_ids: corpus.leakage_groups.slice(20)
      .map(({ leakage_group_id }) => leakage_group_id),
  });
}

function qualificationFor(
  rater_id: string,
  overrides: Partial<{
    qualified_dimensions: ["directness"] | [];
    qualified_locales: ["en-US"] | ["fr-CA"];
    qualified_channels: ["web"] | ["mobile"];
    participation_consent: "granted" | "not_granted";
    rating_and_notes_consent: "granted" | "not_granted";
    model_processing_consent: "granted" | "not_granted";
    conflict_candidate_ids: string[];
  }> = {},
): HumanRaterQualification {
  return recordHumanRaterQualification({
    record_mode: "development_fixture",
    rater_id,
    qualification_state: "eligible",
    qualified_dimensions: overrides.qualified_dimensions ?? ["directness"],
    qualified_locales: overrides.qualified_locales ?? ["en-US"],
    qualified_channels: overrides.qualified_channels ?? ["web"],
    participation_consent: overrides.participation_consent ?? "granted",
    rating_and_notes_consent: overrides.rating_and_notes_consent ?? "granted",
    model_processing_consent: overrides.model_processing_consent ?? "granted",
    training_evidence_digests: [sha256Canonical({ rater_id, training: "passed" })],
    conflict_candidate_ids: overrides.conflict_candidate_ids ?? [],
    data_minimization_profile: "pseudonymous_no_protected_attributes",
  });
}

function mappedRatingsForTestSplit(
  corpus: ProjectOwnedComparisonCorpus,
  raterIds = ["rater.test.1", "rater.test.2", "rater.test.3"],
): {
  mappings: HumanDimensionRatingMapping[];
  ratingEvidence: HumanCalibrationRatingEvidence[];
  predictions: HumanCalibrationPrediction[];
} {
  const split = splitFixture(corpus);
  const testGroups = new Set(split.analysis_locked_leakage_group_ids);
  const mappings: HumanDimensionRatingMapping[] = [];
  const ratingEvidence: HumanCalibrationRatingEvidence[] = [];
  const predictions: HumanCalibrationPrediction[] = [];

  for (const comparison of corpus.comparisons.filter(({ leakage_group_id }) =>
    testGroups.has(leakage_group_id))) {
    for (const [index, rater_id] of raterIds.entries()) {
      const raterQualification = qualificationFor(rater_id);
      const assignment = createBlindCalibrationAssignment({
        record_mode: "development_fixture",
        corpus,
        split_manifest: split,
        comparison_id: comparison.comparison_id,
        dimension: "directness",
        rater_qualification: raterQualification,
        assignment_index: index,
      });
      const preferredIsLeft = comparison.preferred_candidate_id
        === comparison.blind_assignment.left_candidate_id;
      const rating = recordHumanDimensionRating({
        record_mode: "development_fixture",
        assignment,
        response_state: "submitted",
        display_outcome: preferredIsLeft ? "LEFT" : "RIGHT",
        left_fit: preferredIsLeft ? "strong_fit" : "weak_fit",
        right_fit: preferredIsLeft ? "weak_fit" : "strong_fit",
        ordinal_uncertainty: 2,
        evidence_spans: [preferredIsLeft ? "LEFT:0-7" : "RIGHT:0-7"],
        missing_context_fields: [],
        procedural_abstention_reason: null,
        hard_issue_suspected: false,
        blindness_breach: false,
      });
      const mapping = mapHumanDimensionRating({ corpus, assignment, rating });
      mappings.push(mapping);
      ratingEvidence.push({ rater_qualification: raterQualification, assignment, rating, mapping });
    }
    const predictionPreimage = {
      contract_version: "contentmd.human-calibration-prediction/0.1.0" as const,
      record_mode: "development_fixture" as const,
      comparison_id: comparison.comparison_id,
      comparison_digest: comparison.comparison_digest,
      predicted_candidate_id: comparison.preferred_candidate_id,
      model_ref: "ranking_model.synthetic.v1",
      authority_effect: "none" as const,
    };
    predictions.push({
      ...predictionPreimage,
      prediction_digest: sha256Canonical(predictionPreimage),
    });
  }
  return { mappings, ratingEvidence, predictions };
}

describe("governed human calibration", () => {
  it("freezes a complete leakage-group split without granting authority", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);

    expect(split).toMatchObject({
      contract_version: "contentmd.human-calibration-split/0.1.0",
      record_mode: "development_fixture",
      corpus_id: "voice-comparison.project-owned.v1",
      calibration_leakage_group_ids: expect.any(Array),
      analysis_locked_leakage_group_ids: expect.any(Array),
      rater_partition_policy: "disjoint_between_calibration_and_test",
      authority_effect: "none",
    });
    expect(split.calibration_leakage_group_ids).toHaveLength(20);
    expect(split.analysis_locked_leakage_group_ids).toHaveLength(10);
    expect(Object.isFrozen(split)).toBe(true);
    expect(split.split_digest).toMatch(/^[a-f0-9]{64}$/u);
  });

  it("rejects overlapping or incomplete leakage-group splits", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const calibration = corpus.leakage_groups.slice(0, 20)
      .map(({ leakage_group_id }) => leakage_group_id);
    const analysis = corpus.leakage_groups.slice(20)
      .map(({ leakage_group_id }) => leakage_group_id);

    expect(() => createHumanCalibrationSplitManifest({
      record_mode: "development_fixture",
      corpus,
      calibration_leakage_group_ids: calibration,
      analysis_locked_leakage_group_ids: [calibration[0]!, ...analysis],
    })).toThrow("human_calibration_invalid:leakage_split");

    expect(() => createHumanCalibrationSplitManifest({
      record_mode: "development_fixture",
      corpus,
      calibration_leakage_group_ids: calibration.slice(1),
      analysis_locked_leakage_group_ids: analysis,
    })).toThrow("human_calibration_invalid:leakage_split");
  });

  it("keeps assignments blind and maps locked display outcomes separately", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const comparison = corpus.comparisons.find(({ leakage_group_id }) =>
      split.analysis_locked_leakage_group_ids.includes(leakage_group_id))!;
    const assignment = createBlindCalibrationAssignment({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      comparison_id: comparison.comparison_id,
      dimension: "directness",
      rater_qualification: qualificationFor("rater.test.1"),
      assignment_index: 0,
    });

    expect(canonicalJson(assignment)).not.toContain("preferred_candidate_id");
    expect(canonicalJson(assignment)).not.toContain(comparison.candidate_a.candidate_id);
    expect(canonicalJson(assignment)).not.toContain(comparison.candidate_b.candidate_id);
    expect(assignment).toMatchObject({
      split: "analysis_locked_public_test",
      display_labels: ["LEFT", "RIGHT"],
      expected_answer: null,
      authority_effect: "none",
    });

    const leftWins = recordHumanDimensionRating({
      record_mode: "development_fixture",
      assignment,
      response_state: "submitted",
      display_outcome: "LEFT",
      left_fit: "strong_fit",
      right_fit: "weak_fit",
      ordinal_uncertainty: 2,
      evidence_spans: ["LEFT:0-7"],
      missing_context_fields: [],
      procedural_abstention_reason: null,
      hard_issue_suspected: false,
      blindness_breach: false,
    });
    const mapping = mapHumanDimensionRating({ corpus, assignment, rating: leftWins });

    expect(mapping.canonical_outcome).toBe(
      comparison.blind_assignment.left_candidate_id === comparison.candidate_a.candidate_id
        ? "candidate_a"
        : "candidate_b",
    );
    expect(mapping.raw_rating_digest).toBe(leftWins.rating_digest);
    expect(mapping.authority_effect).toBe("none");
    expect(Object.isFrozen(mapping)).toBe(true);
  });

  it("withholds effectiveness until every test pair has sufficient independent human evidence", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const complete = mappedRatingsForTestSplit(corpus);
    const incompleteEvidence = complete.ratingEvidence.slice(1);

    const report = evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_evidence: incompleteEvidence,
      predictions: complete.predictions,
    });

    expect(report.status).toBe("insufficient_human_evidence");
    expect(report.pair_accuracy).toBeNull();
    expect(report.group_macro_accuracy).toBeNull();
    expect(report.missing_comparison_ids.length).toBeGreaterThan(0);
    expect(report.authority_effect).toBe("none");
  });

  it("reports group-safe held-out effectiveness without approving a model or copy", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const complete = mappedRatingsForTestSplit(corpus);

    const report = evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1", "rater.calibration.2"],
      rating_evidence: complete.ratingEvidence,
      predictions: complete.predictions,
    });

    expect(report).toMatchObject({
      contract_version: "contentmd.human-calibration-effectiveness/0.1.0",
      record_mode: "development_fixture",
      status: "measured",
      pair_accuracy: 1,
      group_macro_accuracy: 1,
      minimum_independent_raters: 3,
      authority_effect: "none",
      approval_effect: "none",
      publication_effect: "none",
    });
    expect(report.evaluated_group_count).toBe(10);
    expect(report.evaluated_pair_count).toBe(30);
    expect(report.missing_comparison_ids).toEqual([]);
    expect(report.evaluation_input_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(report.report_digest).toMatch(/^[a-f0-9]{64}$/u);
    expect(Object.isFrozen(report)).toBe(true);
  });

  it("rejects rater reuse across calibration and analysis-locked evidence", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const complete = mappedRatingsForTestSplit(corpus);

    expect(() => evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.test.1"],
      rating_evidence: complete.ratingEvidence,
      predictions: complete.predictions,
    })).toThrow("human_calibration_invalid:rater_leakage");
  });

  it("rejects a self-consistent mapping whose outcome and canonical winner disagree", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const complete = mappedRatingsForTestSplit(corpus);
    const original = complete.mappings[0]!;
    const comparison = corpus.comparisons.find(({ comparison_id }) =>
      comparison_id === original.comparison_id)!;
    const contradictoryWinner = original.canonical_outcome === "candidate_a"
      ? comparison.candidate_b.candidate_id
      : comparison.candidate_a.candidate_id;
    const { mapping_digest: _digest, ...mappingPreimage } = original;
    const forged = {
      ...mappingPreimage,
      canonical_winner_candidate_id: contradictoryWinner,
    };
    const ratingEvidence = [
      {
        ...complete.ratingEvidence[0]!,
        mapping: { ...forged, mapping_digest: sha256Canonical(forged) },
      },
      ...complete.ratingEvidence.slice(1),
    ];

    expect(() => evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_evidence: ratingEvidence,
      predictions: complete.predictions,
    })).toThrow("human_calibration_invalid:mapping");
  });

  it("replays complete qualification-to-mapping evidence before computing effectiveness", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const complete = mappedRatingsForTestSplit(corpus);
    const original = complete.ratingEvidence[0]!;
    const { qualification_digest: _digest, ...qualificationPreimage } =
      original.rater_qualification;
    const ineligiblePreimage = {
      ...qualificationPreimage,
      qualification_state: "ineligible" as const,
    };
    const ratingEvidence = [
      {
        ...original,
        rater_qualification: {
          ...ineligiblePreimage,
          qualification_digest: sha256Canonical(ineligiblePreimage),
        },
      },
      ...complete.ratingEvidence.slice(1),
    ];

    expect(() => evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_evidence: ratingEvidence,
      predictions: complete.predictions,
    })).toThrow("human_calibration_invalid:rater_not_eligible");

    expect(() => evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_mappings: complete.mappings,
      predictions: complete.predictions,
    } as never)).toThrow("human_calibration_invalid:evaluation_input");

    const comparison = corpus.comparisons.find(({ comparison_id }) =>
      comparison_id === original.mapping.comparison_id)!;
    const noModelQualification = qualificationFor(original.mapping.rater_id, {
      model_processing_consent: "not_granted",
    });
    const noModelAssignment = createBlindCalibrationAssignment({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      comparison_id: comparison.comparison_id,
      dimension: original.assignment.dimension,
      rater_qualification: noModelQualification,
      assignment_index: original.assignment.assignment_index,
    });
    const noModelRating = recordHumanDimensionRating({
      record_mode: "development_fixture",
      assignment: noModelAssignment,
      response_state: original.rating.response_state,
      display_outcome: original.rating.display_outcome,
      left_fit: original.rating.left_fit,
      right_fit: original.rating.right_fit,
      ordinal_uncertainty: original.rating.ordinal_uncertainty,
      evidence_spans: original.rating.evidence_spans,
      missing_context_fields: original.rating.missing_context_fields,
      procedural_abstention_reason: original.rating.procedural_abstention_reason,
      hard_issue_suspected: original.rating.hard_issue_suspected,
      blindness_breach: original.rating.blindness_breach,
    });
    const noModelMapping = mapHumanDimensionRating({
      corpus,
      assignment: noModelAssignment,
      rating: noModelRating,
    });
    expect(() => evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_evidence: [{
        rater_qualification: noModelQualification,
        assignment: noModelAssignment,
        rating: noModelRating,
        mapping: noModelMapping,
      }, ...complete.ratingEvidence.slice(1)],
      predictions: complete.predictions,
    })).toThrow("human_calibration_invalid:model_processing_not_authorized");
  });

  it("emits closed artifacts that validate independently of the evaluation runtime", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const comparison = corpus.comparisons.find(({ leakage_group_id }) =>
      split.analysis_locked_leakage_group_ids.includes(leakage_group_id))!;
    const assignment = createBlindCalibrationAssignment({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      comparison_id: comparison.comparison_id,
      dimension: "directness",
      rater_qualification: qualificationFor("rater.schema.1"),
      assignment_index: 0,
    });
    const rating = recordHumanDimensionRating({
      record_mode: "development_fixture",
      assignment,
      response_state: "submitted",
      display_outcome: "indistinguishable",
      left_fit: "acceptable_fit",
      right_fit: "acceptable_fit",
      ordinal_uncertainty: 2,
      evidence_spans: ["LEFT:0-7", "RIGHT:0-7"],
      missing_context_fields: [],
      procedural_abstention_reason: null,
      hard_issue_suspected: false,
      blindness_breach: false,
    });
    const mapping = mapHumanDimensionRating({ corpus, assignment, rating });
    const complete = mappedRatingsForTestSplit(corpus);
    const report = evaluateHeldOutHumanCalibration({
      record_mode: "development_fixture",
      corpus,
      split_manifest: split,
      calibration_rater_ids: ["rater.calibration.1"],
      rating_evidence: complete.ratingEvidence,
      predictions: complete.predictions,
    });

    for (const artifact of [
      split,
      assignment,
      rating,
      mapping,
      complete.predictions[0]!,
      report,
    ]) {
      expect(validateHumanCalibrationArtifact(artifact)).toEqual({ valid: true, errors: [] });
    }

    const invalid = { ...report, authority_effect: "approve" };
    const validation = validateHumanCalibrationArtifact(invalid);
    expect(validation.valid).toBe(false);
    expect(validation.errors.join("\n")).toMatch(/authority_effect/u);
  });

  it("admits only qualified, consenting, conflict-free raters before revealing a packet", () => {
    const corpus = createProjectOwnedComparisonCorpus();
    const split = splitFixture(corpus);
    const comparison = corpus.comparisons.find(({ leakage_group_id }) =>
      split.analysis_locked_leakage_group_ids.includes(leakage_group_id))!;
    const base = {
      record_mode: "development_fixture" as const,
      corpus,
      split_manifest: split,
      comparison_id: comparison.comparison_id,
      dimension: "directness" as const,
      assignment_index: 0,
    };

    const valid = createBlindCalibrationAssignment({
      ...base,
      rater_qualification: qualificationFor("rater.qualified.1"),
    });
    expect(valid.rater_id).toBe("rater.qualified.1");
    expect(valid.rater_qualification_digest).toMatch(/^[a-f0-9]{64}$/u);

    for (const qualification of [
      qualificationFor("rater.no-consent", { rating_and_notes_consent: "not_granted" }),
      qualificationFor("rater.wrong-dimension", { qualified_dimensions: [] }),
      qualificationFor("rater.wrong-locale", { qualified_locales: ["fr-CA"] }),
      qualificationFor("rater.wrong-channel", { qualified_channels: ["mobile"] }),
    ]) {
      expect(() => createBlindCalibrationAssignment({
        ...base,
        rater_qualification: qualification,
      })).toThrow("human_calibration_invalid:rater_not_eligible");
    }

    expect(() => createBlindCalibrationAssignment({
      ...base,
      rater_qualification: qualificationFor("rater.conflicted", {
        conflict_candidate_ids: [comparison.candidate_a.candidate_id],
      }),
    })).toThrow("human_calibration_invalid:rater_conflict");
  });

  it("keeps qualification records pseudonymous and schema-valid", () => {
    const qualification = qualificationFor("rater.private.1");

    expect(validateHumanCalibrationArtifact(qualification)).toEqual({ valid: true, errors: [] });
    expect(canonicalJson(qualification)).not.toMatch(/email|nationality|ethnicity|gender|diagnosis/u);
    expect(qualification).toMatchObject({
      contract_version: "contentmd.human-rater-qualification/0.1.0",
      qualification_state: "eligible",
      data_minimization_profile: "pseudonymous_no_protected_attributes",
      authority_effect: "none",
    });
    expect(Object.isFrozen(qualification)).toBe(true);
  });
});
