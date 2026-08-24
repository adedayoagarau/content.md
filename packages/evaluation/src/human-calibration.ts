import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  verifyVoiceToneComparisonCorpus,
  type ProjectOwnedComparisonCorpus,
  type ProjectOwnedVoiceComparison,
  type VoiceToneFeatureName,
} from "@contentmd/research";

const DIGEST = /^[a-f0-9]{64}$/u;
const DIMENSIONS = [
  "directness",
  "formality",
  "warmth",
  "reassurance",
  "expressiveness",
  "humor",
  "urgency",
  "information_density",
  "authority_stance",
] as const satisfies readonly VoiceToneFeatureName[];
const FIT_BANDS = [
  "strong_fit",
  "acceptable_fit",
  "weak_fit",
  "unacceptable",
  "not_rateable",
] as const;

export type HumanCalibrationSplit = "calibration" | "analysis_locked_public_test";
export type DisplayPairwiseOutcome =
  | "LEFT"
  | "RIGHT"
  | "indistinguishable"
  | "both_unacceptable"
  | "insufficient_context";
export type CandidateFitBand = (typeof FIT_BANDS)[number];
export type CanonicalHumanOutcome =
  | "candidate_a"
  | "candidate_b"
  | "indistinguishable"
  | "both_unacceptable"
  | "insufficient_context"
  | "abstained";

export interface HumanCalibrationSplitManifest {
  contract_version: "contentmd.human-calibration-split/0.1.0";
  record_mode: "development_fixture";
  corpus_id: "voice-comparison.project-owned.v1";
  corpus_manifest_digest: string;
  calibration_leakage_group_ids: string[];
  analysis_locked_leakage_group_ids: string[];
  rater_partition_policy: "disjoint_between_calibration_and_test";
  authority_effect: "none";
  split_digest: string;
}

export interface CreateHumanCalibrationSplitManifestInput {
  record_mode: "development_fixture";
  corpus: ProjectOwnedComparisonCorpus;
  calibration_leakage_group_ids: string[];
  analysis_locked_leakage_group_ids: string[];
}

export interface HumanRaterQualification {
  contract_version: "contentmd.human-rater-qualification/0.1.0";
  record_mode: "development_fixture";
  qualification_id: string;
  rater_id: string;
  qualification_state: "eligible" | "ineligible";
  qualified_dimensions: VoiceToneFeatureName[];
  qualified_locales: string[];
  qualified_channels: string[];
  participation_consent: "granted" | "not_granted";
  rating_and_notes_consent: "granted" | "not_granted";
  model_processing_consent: "granted" | "not_granted";
  training_evidence_digests: string[];
  conflict_candidate_ids: string[];
  data_minimization_profile: "pseudonymous_no_protected_attributes";
  authority_effect: "none";
  qualification_digest: string;
}

export interface RecordHumanRaterQualificationInput {
  record_mode: "development_fixture";
  rater_id: string;
  qualification_state: "eligible" | "ineligible";
  qualified_dimensions: VoiceToneFeatureName[];
  qualified_locales: string[];
  qualified_channels: string[];
  participation_consent: "granted" | "not_granted";
  rating_and_notes_consent: "granted" | "not_granted";
  model_processing_consent: "granted" | "not_granted";
  training_evidence_digests: string[];
  conflict_candidate_ids: string[];
  data_minimization_profile: "pseudonymous_no_protected_attributes";
}

export interface BlindCalibrationAssignment {
  contract_version: "contentmd.blind-calibration-assignment/0.1.0";
  record_mode: "development_fixture";
  assignment_id: string;
  split_manifest_digest: string;
  split: HumanCalibrationSplit;
  comparison_id: string;
  comparison_digest: string;
  leakage_group_id: string;
  dimension: VoiceToneFeatureName;
  rater_id: string;
  rater_qualification_digest: string;
  assignment_index: number;
  display_labels: ["LEFT", "RIGHT"];
  left_expression: string;
  left_expression_digest: string;
  right_expression: string;
  right_expression_digest: string;
  presentation_order_digest: string;
  expected_answer: null;
  authority_effect: "none";
  assignment_digest: string;
}

export interface CreateBlindCalibrationAssignmentInput {
  record_mode: "development_fixture";
  corpus: ProjectOwnedComparisonCorpus;
  split_manifest: HumanCalibrationSplitManifest;
  comparison_id: string;
  dimension: VoiceToneFeatureName;
  rater_qualification: HumanRaterQualification;
  assignment_index: number;
}

export interface HumanDimensionRating {
  contract_version: "contentmd.human-dimension-rating/0.1.0";
  record_mode: "development_fixture";
  rating_id: string;
  assignment_id: string;
  assignment_digest: string;
  split: HumanCalibrationSplit;
  comparison_id: string;
  comparison_digest: string;
  leakage_group_id: string;
  dimension: VoiceToneFeatureName;
  rater_id: string;
  rater_qualification_digest: string;
  response_state: "submitted" | "abstained";
  display_outcome: DisplayPairwiseOutcome | null;
  left_fit: CandidateFitBand | null;
  right_fit: CandidateFitBand | null;
  ordinal_uncertainty: 0 | 1 | 2 | 3;
  evidence_spans: string[];
  missing_context_fields: string[];
  procedural_abstention_reason: string | null;
  hard_issue_suspected: boolean;
  blindness_breach: boolean;
  authority_effect: "none";
  rating_digest: string;
}

export interface RecordHumanDimensionRatingInput {
  record_mode: "development_fixture";
  assignment: BlindCalibrationAssignment;
  response_state: "submitted" | "abstained";
  display_outcome: DisplayPairwiseOutcome | null;
  left_fit: CandidateFitBand | null;
  right_fit: CandidateFitBand | null;
  ordinal_uncertainty: 0 | 1 | 2 | 3;
  evidence_spans: string[];
  missing_context_fields: string[];
  procedural_abstention_reason: string | null;
  hard_issue_suspected: boolean;
  blindness_breach: boolean;
}

export interface HumanDimensionRatingMapping {
  contract_version: "contentmd.human-dimension-rating-mapping/0.1.0";
  record_mode: "development_fixture";
  mapping_id: string;
  raw_rating_id: string;
  raw_rating_digest: string;
  assignment_id: string;
  assignment_digest: string;
  split: HumanCalibrationSplit;
  comparison_id: string;
  comparison_digest: string;
  leakage_group_id: string;
  dimension: VoiceToneFeatureName;
  rater_id: string;
  rater_qualification_digest: string;
  canonical_outcome: CanonicalHumanOutcome;
  canonical_winner_candidate_id: string | null;
  authority_effect: "none";
  mapping_digest: string;
}

export interface HumanCalibrationRatingEvidence {
  rater_qualification: HumanRaterQualification;
  assignment: BlindCalibrationAssignment;
  rating: HumanDimensionRating;
  mapping: HumanDimensionRatingMapping;
}

export interface HumanCalibrationPrediction {
  contract_version: "contentmd.human-calibration-prediction/0.1.0";
  record_mode: "development_fixture";
  comparison_id: string;
  comparison_digest: string;
  predicted_candidate_id: string;
  model_ref: string;
  authority_effect: "none";
  prediction_digest: string;
}

export interface HumanCalibrationEffectivenessReport {
  contract_version: "contentmd.human-calibration-effectiveness/0.1.0";
  record_mode: "development_fixture";
  corpus_manifest_digest: string;
  split_manifest_digest: string;
  model_ref: string | null;
  status: "measured" | "insufficient_human_evidence";
  minimum_independent_raters: 3;
  expected_group_count: number;
  expected_pair_count: number;
  evaluated_group_count: number;
  evaluated_pair_count: number;
  missing_comparison_ids: string[];
  pair_accuracy: number | null;
  group_macro_accuracy: number | null;
  evaluation_input_digest: string;
  authority_effect: "none";
  approval_effect: "none";
  publication_effect: "none";
  report_digest: string;
}

export interface EvaluateHeldOutHumanCalibrationInput {
  record_mode: "development_fixture";
  corpus: ProjectOwnedComparisonCorpus;
  split_manifest: HumanCalibrationSplitManifest;
  calibration_rater_ids: string[];
  rating_evidence: HumanCalibrationRatingEvidence[];
  predictions: HumanCalibrationPrediction[];
}

function fail(code: string): never {
  throw new TypeError(`human_calibration_invalid:${code}`);
}

function compareText(left: string, right: string): number {
  return Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8"));
}

function immutable<T>(value: T): T {
  const clone = structuredClone(value);
  const freeze = (current: unknown): void => {
    if (current === null || typeof current !== "object" || Object.isFrozen(current)) return;
    for (const key of Reflect.ownKeys(current)) {
      const descriptor = Object.getOwnPropertyDescriptor(current, key);
      if (descriptor !== undefined && "value" in descriptor) freeze(descriptor.value);
    }
    Object.freeze(current);
  };
  freeze(clone);
  return clone;
}

function exactDataKeys(value: object, expected: readonly string[]): boolean {
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== Object.prototype && prototype !== null) return false;
  const keys = Reflect.ownKeys(value);
  if (keys.length !== expected.length || keys.some((key) => typeof key !== "string")) return false;
  const expectedSet = new Set(expected);
  for (const key of keys as string[]) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (!expectedSet.has(key) || descriptor === undefined || !descriptor.enumerable
      || !("value" in descriptor)) return false;
  }
  return true;
}

function nonempty(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function canonicalUnique(values: readonly string[], allowEmpty = false): boolean {
  return (allowEmpty || values.length > 0)
    && values.every(nonempty)
    && new Set(values).size === values.length
    && values.every((value, index) => index === 0 || compareText(values[index - 1]!, value) < 0);
}


export function recordHumanRaterQualification(
  input: RecordHumanRaterQualificationInput,
): HumanRaterQualification {
  if (!exactDataKeys(input, [
    "record_mode",
    "rater_id",
    "qualification_state",
    "qualified_dimensions",
    "qualified_locales",
    "qualified_channels",
    "participation_consent",
    "rating_and_notes_consent",
    "model_processing_consent",
    "training_evidence_digests",
    "conflict_candidate_ids",
    "data_minimization_profile",
  ])
    || input.record_mode !== "development_fixture"
    || !nonempty(input.rater_id)
    || !["eligible", "ineligible"].includes(input.qualification_state)
    || !Array.isArray(input.qualified_dimensions)
    || new Set(input.qualified_dimensions).size !== input.qualified_dimensions.length
    || input.qualified_dimensions.some((dimension) => !DIMENSIONS.includes(dimension))
    || input.qualified_dimensions.some((dimension, index) =>
      index > 0 && compareText(input.qualified_dimensions[index - 1]!, dimension) >= 0)
    || !canonicalUnique(input.qualified_locales, true)
    || !canonicalUnique(input.qualified_channels, true)
    || !["granted", "not_granted"].includes(input.participation_consent)
    || !["granted", "not_granted"].includes(input.rating_and_notes_consent)
    || !["granted", "not_granted"].includes(input.model_processing_consent)
    || !canonicalUnique(input.training_evidence_digests)
    || input.training_evidence_digests.some((digest) => !DIGEST.test(digest))
    || !canonicalUnique(input.conflict_candidate_ids, true)
    || input.data_minimization_profile !== "pseudonymous_no_protected_attributes") {
    fail("rater_qualification");
  }
  const identity = {
    contract_version: "contentmd.human-rater-qualification-identity/0.1.0",
    rater_id: input.rater_id,
    training_evidence_digests: input.training_evidence_digests,
  };
  const preimage = {
    contract_version: "contentmd.human-rater-qualification/0.1.0" as const,
    record_mode: "development_fixture" as const,
    qualification_id: `human_rater_qualification.${sha256Canonical(identity).slice(0, 32)}`,
    rater_id: input.rater_id,
    qualification_state: input.qualification_state,
    qualified_dimensions: [...input.qualified_dimensions],
    qualified_locales: [...input.qualified_locales],
    qualified_channels: [...input.qualified_channels],
    participation_consent: input.participation_consent,
    rating_and_notes_consent: input.rating_and_notes_consent,
    model_processing_consent: input.model_processing_consent,
    training_evidence_digests: [...input.training_evidence_digests],
    conflict_candidate_ids: [...input.conflict_candidate_ids],
    data_minimization_profile: input.data_minimization_profile,
    authority_effect: "none" as const,
  };
  return immutable({ ...preimage, qualification_digest: sha256Canonical(preimage) });
}

function verifyRaterQualification(qualification: HumanRaterQualification): void {
  const { qualification_digest: received, ...preimage } = qualification;
  if (qualification.contract_version !== "contentmd.human-rater-qualification/0.1.0"
    || qualification.record_mode !== "development_fixture"
    || qualification.authority_effect !== "none"
    || !DIGEST.test(received)
    || received !== sha256Canonical(preimage)) fail("rater_qualification");
  const replay = recordHumanRaterQualification({
    record_mode: qualification.record_mode,
    rater_id: qualification.rater_id,
    qualification_state: qualification.qualification_state,
    qualified_dimensions: qualification.qualified_dimensions,
    qualified_locales: qualification.qualified_locales,
    qualified_channels: qualification.qualified_channels,
    participation_consent: qualification.participation_consent,
    rating_and_notes_consent: qualification.rating_and_notes_consent,
    model_processing_consent: qualification.model_processing_consent,
    training_evidence_digests: qualification.training_evidence_digests,
    conflict_candidate_ids: qualification.conflict_candidate_ids,
    data_minimization_profile: qualification.data_minimization_profile,
  });
  if (canonicalJson(replay) !== canonicalJson(qualification)) fail("rater_qualification");
}

function verifyCorpus(corpus: ProjectOwnedComparisonCorpus): void {
  try {
    verifyVoiceToneComparisonCorpus(corpus, []);
  } catch {
    fail("corpus");
  }
}

function splitPreimage(
  input: CreateHumanCalibrationSplitManifestInput,
): Omit<HumanCalibrationSplitManifest, "split_digest"> {
  return {
    contract_version: "contentmd.human-calibration-split/0.1.0",
    record_mode: "development_fixture",
    corpus_id: input.corpus.manifest.corpus_id,
    corpus_manifest_digest: input.corpus.manifest.manifest_digest,
    calibration_leakage_group_ids: [...input.calibration_leakage_group_ids],
    analysis_locked_leakage_group_ids: [...input.analysis_locked_leakage_group_ids],
    rater_partition_policy: "disjoint_between_calibration_and_test",
    authority_effect: "none",
  };
}

export function createHumanCalibrationSplitManifest(
  input: CreateHumanCalibrationSplitManifestInput,
): HumanCalibrationSplitManifest {
  if (input.record_mode !== "development_fixture") fail("record_mode");
  verifyCorpus(input.corpus);
  const calibration = input.calibration_leakage_group_ids;
  const analysis = input.analysis_locked_leakage_group_ids;
  const known = [...input.corpus.leakage_groups.map(({ leakage_group_id }) => leakage_group_id)]
    .sort(compareText);
  const supplied = [...calibration, ...analysis].sort(compareText);
  if (!canonicalUnique(calibration) || !canonicalUnique(analysis)
    || new Set([...calibration, ...analysis]).size !== supplied.length
    || supplied.length !== known.length
    || supplied.some((value, index) => value !== known[index])) {
    fail("leakage_split");
  }
  const preimage = splitPreimage(input);
  return immutable({ ...preimage, split_digest: sha256Canonical(preimage) });
}

function verifySplit(
  corpus: ProjectOwnedComparisonCorpus,
  split: HumanCalibrationSplitManifest,
): void {
  const { split_digest: received, ...preimage } = split;
  if (split.contract_version !== "contentmd.human-calibration-split/0.1.0"
    || split.record_mode !== "development_fixture"
    || split.authority_effect !== "none"
    || split.rater_partition_policy !== "disjoint_between_calibration_and_test"
    || split.corpus_id !== corpus.manifest.corpus_id
    || split.corpus_manifest_digest !== corpus.manifest.manifest_digest
    || received !== sha256Canonical(preimage)) fail("split_manifest");
  createHumanCalibrationSplitManifest({
    record_mode: "development_fixture",
    corpus,
    calibration_leakage_group_ids: split.calibration_leakage_group_ids,
    analysis_locked_leakage_group_ids: split.analysis_locked_leakage_group_ids,
  });
}

function comparisonById(
  corpus: ProjectOwnedComparisonCorpus,
  comparisonId: string,
): ProjectOwnedVoiceComparison {
  const matches = corpus.comparisons.filter(({ comparison_id }) => comparison_id === comparisonId);
  if (matches.length !== 1) fail("comparison");
  return matches[0]!;
}

function splitFor(
  manifest: HumanCalibrationSplitManifest,
  leakageGroupId: string,
): HumanCalibrationSplit {
  if (manifest.calibration_leakage_group_ids.includes(leakageGroupId)) return "calibration";
  if (manifest.analysis_locked_leakage_group_ids.includes(leakageGroupId)) {
    return "analysis_locked_public_test";
  }
  return fail("leakage_split");
}

function candidateForDisplay(
  comparison: ProjectOwnedVoiceComparison,
  display: "LEFT" | "RIGHT",
) {
  const candidateId = display === "LEFT"
    ? comparison.blind_assignment.left_candidate_id
    : comparison.blind_assignment.right_candidate_id;
  if (comparison.candidate_a.candidate_id === candidateId) return comparison.candidate_a;
  if (comparison.candidate_b.candidate_id === candidateId) return comparison.candidate_b;
  return fail("assignment");
}

export function createBlindCalibrationAssignment(
  input: CreateBlindCalibrationAssignmentInput,
): BlindCalibrationAssignment {
  if (input.record_mode !== "development_fixture"
    || !DIMENSIONS.includes(input.dimension)
    || !Number.isSafeInteger(input.assignment_index)
    || input.assignment_index < 0) fail("assignment");
  verifyCorpus(input.corpus);
  verifySplit(input.corpus, input.split_manifest);
  verifyRaterQualification(input.rater_qualification);
  const comparison = comparisonById(input.corpus, input.comparison_id);
  const qualification = input.rater_qualification;
  if (qualification.qualification_state !== "eligible"
    || qualification.participation_consent !== "granted"
    || qualification.rating_and_notes_consent !== "granted"
    || !qualification.qualified_dimensions.includes(input.dimension)
    || !qualification.qualified_locales.includes(comparison.context.locale)
    || !qualification.qualified_channels.includes(comparison.context.channel)) {
    fail("rater_not_eligible");
  }
  if (qualification.conflict_candidate_ids.includes(comparison.candidate_a.candidate_id)
    || qualification.conflict_candidate_ids.includes(comparison.candidate_b.candidate_id)) {
    fail("rater_conflict");
  }
  const left = candidateForDisplay(comparison, "LEFT");
  const right = candidateForDisplay(comparison, "RIGHT");
  const identity = {
    contract_version: "contentmd.blind-calibration-assignment-identity/0.1.0",
    split_manifest_digest: input.split_manifest.split_digest,
    comparison_id: comparison.comparison_id,
    comparison_digest: comparison.comparison_digest,
    dimension: input.dimension,
    rater_id: qualification.rater_id,
    rater_qualification_digest: qualification.qualification_digest,
    assignment_index: input.assignment_index,
  };
  const preimage = {
    contract_version: "contentmd.blind-calibration-assignment/0.1.0" as const,
    record_mode: "development_fixture" as const,
    assignment_id: `blind_calibration_assignment.${sha256Canonical(identity).slice(0, 32)}`,
    split_manifest_digest: input.split_manifest.split_digest,
    split: splitFor(input.split_manifest, comparison.leakage_group_id),
    comparison_id: comparison.comparison_id,
    comparison_digest: comparison.comparison_digest,
    leakage_group_id: comparison.leakage_group_id,
    dimension: input.dimension,
    rater_id: qualification.rater_id,
    rater_qualification_digest: qualification.qualification_digest,
    assignment_index: input.assignment_index,
    display_labels: ["LEFT", "RIGHT"] as ["LEFT", "RIGHT"],
    left_expression: left.expression,
    left_expression_digest: left.expression_digest,
    right_expression: right.expression,
    right_expression_digest: right.expression_digest,
    presentation_order_digest: comparison.blind_assignment.order_digest,
    expected_answer: null,
    authority_effect: "none" as const,
  };
  return immutable({ ...preimage, assignment_digest: sha256Canonical(preimage) });
}

function verifyAssignment(assignment: BlindCalibrationAssignment): void {
  const { assignment_digest: received, ...preimage } = assignment;
  if (assignment.contract_version !== "contentmd.blind-calibration-assignment/0.1.0"
    || assignment.record_mode !== "development_fixture"
    || assignment.authority_effect !== "none"
    || assignment.expected_answer !== null
    || assignment.display_labels.length !== 2
    || assignment.display_labels[0] !== "LEFT"
    || assignment.display_labels[1] !== "RIGHT"
    || received !== sha256Canonical(preimage)) fail("assignment");
}

function isFitBand(value: unknown): value is CandidateFitBand {
  return FIT_BANDS.includes(value as CandidateFitBand);
}

function canonicalTextList(values: string[], allowEmpty: boolean): boolean {
  return canonicalUnique(values, allowEmpty);
}

export function recordHumanDimensionRating(
  input: RecordHumanDimensionRatingInput,
): HumanDimensionRating {
  if (input.record_mode !== "development_fixture") fail("record_mode");
  verifyAssignment(input.assignment);
  if (typeof input.hard_issue_suspected !== "boolean"
    || typeof input.blindness_breach !== "boolean"
    || !canonicalTextList(input.evidence_spans, true)
    || !canonicalTextList(input.missing_context_fields, true)) fail("rating");

  if (input.response_state === "submitted") {
    if (input.display_outcome === null || ![
      "LEFT", "RIGHT", "indistinguishable", "both_unacceptable", "insufficient_context",
    ].includes(input.display_outcome)) fail("rating");
    if (input.display_outcome === "insufficient_context") {
      if (input.left_fit !== "not_rateable" || input.right_fit !== "not_rateable"
        || input.ordinal_uncertainty !== 0 || input.missing_context_fields.length === 0
        || input.evidence_spans.length !== 0 || input.procedural_abstention_reason !== null) {
        fail("rating");
      }
    } else if (!isFitBand(input.left_fit) || !isFitBand(input.right_fit)
      || input.left_fit === "not_rateable" || input.right_fit === "not_rateable"
      || ![1, 2, 3].includes(input.ordinal_uncertainty)
      || input.evidence_spans.length === 0
      || input.missing_context_fields.length !== 0
      || input.procedural_abstention_reason !== null) fail("rating");
  } else if (input.response_state === "abstained") {
    if (input.display_outcome !== null || input.left_fit !== null || input.right_fit !== null
      || input.ordinal_uncertainty !== 0 || input.evidence_spans.length !== 0
      || input.missing_context_fields.length !== 0
      || !nonempty(input.procedural_abstention_reason)) fail("rating");
  } else fail("rating");

  const identity = {
    contract_version: "contentmd.human-dimension-rating-identity/0.1.0",
    assignment_digest: input.assignment.assignment_digest,
    rater_id: input.assignment.rater_id,
    rater_qualification_digest: input.assignment.rater_qualification_digest,
  };
  const preimage = {
    contract_version: "contentmd.human-dimension-rating/0.1.0" as const,
    record_mode: "development_fixture" as const,
    rating_id: `human_dimension_rating.${sha256Canonical(identity).slice(0, 32)}`,
    assignment_id: input.assignment.assignment_id,
    assignment_digest: input.assignment.assignment_digest,
    split: input.assignment.split,
    comparison_id: input.assignment.comparison_id,
    comparison_digest: input.assignment.comparison_digest,
    leakage_group_id: input.assignment.leakage_group_id,
    dimension: input.assignment.dimension,
    rater_id: input.assignment.rater_id,
    rater_qualification_digest: input.assignment.rater_qualification_digest,
    response_state: input.response_state,
    display_outcome: input.display_outcome,
    left_fit: input.left_fit,
    right_fit: input.right_fit,
    ordinal_uncertainty: input.ordinal_uncertainty,
    evidence_spans: [...input.evidence_spans],
    missing_context_fields: [...input.missing_context_fields],
    procedural_abstention_reason: input.procedural_abstention_reason,
    hard_issue_suspected: input.hard_issue_suspected,
    blindness_breach: input.blindness_breach,
    authority_effect: "none" as const,
  };
  return immutable({ ...preimage, rating_digest: sha256Canonical(preimage) });
}

function verifyRating(rating: HumanDimensionRating): void {
  const { rating_digest: received, ...preimage } = rating;
  if (rating.contract_version !== "contentmd.human-dimension-rating/0.1.0"
    || rating.record_mode !== "development_fixture"
    || rating.authority_effect !== "none"
    || received !== sha256Canonical(preimage)) fail("rating");
}

export function mapHumanDimensionRating(input: {
  corpus: ProjectOwnedComparisonCorpus;
  assignment: BlindCalibrationAssignment;
  rating: HumanDimensionRating;
}): HumanDimensionRatingMapping {
  verifyCorpus(input.corpus);
  verifyAssignment(input.assignment);
  verifyRating(input.rating);
  const comparison = comparisonById(input.corpus, input.assignment.comparison_id);
  const left = candidateForDisplay(comparison, "LEFT");
  const right = candidateForDisplay(comparison, "RIGHT");
  if (input.assignment.comparison_digest !== comparison.comparison_digest
    || input.assignment.leakage_group_id !== comparison.leakage_group_id
    || input.assignment.presentation_order_digest !== comparison.blind_assignment.order_digest
    || input.assignment.left_expression !== left.expression
    || input.assignment.left_expression_digest !== left.expression_digest
    || input.assignment.right_expression !== right.expression
    || input.assignment.right_expression_digest !== right.expression_digest
    || input.rating.assignment_id !== input.assignment.assignment_id
    || input.rating.assignment_digest !== input.assignment.assignment_digest
    || input.rating.comparison_id !== input.assignment.comparison_id
    || input.rating.comparison_digest !== input.assignment.comparison_digest
    || input.rating.rater_id !== input.assignment.rater_id
    || input.rating.rater_qualification_digest !== input.assignment.rater_qualification_digest
    || input.rating.dimension !== input.assignment.dimension
    || input.rating.split !== input.assignment.split) fail("mapping");

  const displayOutcome = input.rating.display_outcome;
  let canonicalOutcome: CanonicalHumanOutcome;
  let canonicalWinnerCandidateId: string | null = null;
  if (input.rating.response_state === "abstained") canonicalOutcome = "abstained";
  else if (displayOutcome === "LEFT" || displayOutcome === "RIGHT") {
    const winner = displayOutcome === "LEFT" ? left : right;
    canonicalOutcome = winner.candidate_id === comparison.candidate_a.candidate_id
      ? "candidate_a"
      : "candidate_b";
    canonicalWinnerCandidateId = winner.candidate_id;
  } else if (displayOutcome === null) return fail("mapping");
  else canonicalOutcome = displayOutcome;

  const identity = {
    contract_version: "contentmd.human-dimension-rating-mapping-identity/0.1.0",
    raw_rating_digest: input.rating.rating_digest,
    assignment_digest: input.assignment.assignment_digest,
  };
  const preimage = {
    contract_version: "contentmd.human-dimension-rating-mapping/0.1.0" as const,
    record_mode: "development_fixture" as const,
    mapping_id: `human_dimension_rating_mapping.${sha256Canonical(identity).slice(0, 32)}`,
    raw_rating_id: input.rating.rating_id,
    raw_rating_digest: input.rating.rating_digest,
    assignment_id: input.assignment.assignment_id,
    assignment_digest: input.assignment.assignment_digest,
    split: input.assignment.split,
    comparison_id: comparison.comparison_id,
    comparison_digest: comparison.comparison_digest,
    leakage_group_id: comparison.leakage_group_id,
    dimension: input.assignment.dimension,
    rater_id: input.assignment.rater_id,
    rater_qualification_digest: input.assignment.rater_qualification_digest,
    canonical_outcome: canonicalOutcome,
    canonical_winner_candidate_id: canonicalWinnerCandidateId,
    authority_effect: "none" as const,
  };
  return immutable({ ...preimage, mapping_digest: sha256Canonical(preimage) });
}

function verifyMapping(mapping: HumanDimensionRatingMapping): void {
  const { mapping_digest: received, ...preimage } = mapping;
  if (mapping.contract_version !== "contentmd.human-dimension-rating-mapping/0.1.0"
    || mapping.record_mode !== "development_fixture"
    || mapping.authority_effect !== "none"
    || received !== sha256Canonical(preimage)) fail("mapping");
}

function verifyRatingEvidence(
  corpus: ProjectOwnedComparisonCorpus,
  splitManifest: HumanCalibrationSplitManifest,
  evidence: HumanCalibrationRatingEvidence,
): HumanDimensionRatingMapping {
  if (evidence === null || typeof evidence !== "object" || !exactDataKeys(evidence, [
    "rater_qualification",
    "assignment",
    "rating",
    "mapping",
  ])) fail("evaluation_input");
  verifyRaterQualification(evidence.rater_qualification);
  if (evidence.rater_qualification.model_processing_consent !== "granted") {
    fail("model_processing_not_authorized");
  }
  const assignmentReplay = createBlindCalibrationAssignment({
    record_mode: "development_fixture",
    corpus,
    split_manifest: splitManifest,
    comparison_id: evidence.assignment.comparison_id,
    dimension: evidence.assignment.dimension,
    rater_qualification: evidence.rater_qualification,
    assignment_index: evidence.assignment.assignment_index,
  });
  if (canonicalJson(assignmentReplay) !== canonicalJson(evidence.assignment)) fail("assignment");
  const ratingReplay = recordHumanDimensionRating({
    record_mode: "development_fixture",
    assignment: evidence.assignment,
    response_state: evidence.rating.response_state,
    display_outcome: evidence.rating.display_outcome,
    left_fit: evidence.rating.left_fit,
    right_fit: evidence.rating.right_fit,
    ordinal_uncertainty: evidence.rating.ordinal_uncertainty,
    evidence_spans: evidence.rating.evidence_spans,
    missing_context_fields: evidence.rating.missing_context_fields,
    procedural_abstention_reason: evidence.rating.procedural_abstention_reason,
    hard_issue_suspected: evidence.rating.hard_issue_suspected,
    blindness_breach: evidence.rating.blindness_breach,
  });
  if (canonicalJson(ratingReplay) !== canonicalJson(evidence.rating)) fail("rating");
  const mappingReplay = mapHumanDimensionRating({
    corpus,
    assignment: evidence.assignment,
    rating: evidence.rating,
  });
  if (canonicalJson(mappingReplay) !== canonicalJson(evidence.mapping)) fail("mapping");
  return evidence.mapping;
}

function verifyPrediction(
  prediction: HumanCalibrationPrediction,
  comparison: ProjectOwnedVoiceComparison,
): void {
  const { prediction_digest: received, ...preimage } = prediction;
  if (prediction.contract_version !== "contentmd.human-calibration-prediction/0.1.0"
    || prediction.record_mode !== "development_fixture"
    || prediction.authority_effect !== "none"
    || prediction.comparison_id !== comparison.comparison_id
    || prediction.comparison_digest !== comparison.comparison_digest
    || !nonempty(prediction.model_ref)
    || ![comparison.candidate_a.candidate_id, comparison.candidate_b.candidate_id]
      .includes(prediction.predicted_candidate_id)
    || received !== sha256Canonical(preimage)) fail("prediction");
}

function rounded(value: number): number {
  return Number(value.toFixed(12));
}

export function evaluateHeldOutHumanCalibration(
  input: EvaluateHeldOutHumanCalibrationInput,
): HumanCalibrationEffectivenessReport {
  if (input === null || typeof input !== "object" || !exactDataKeys(input, [
    "record_mode",
    "corpus",
    "split_manifest",
    "calibration_rater_ids",
    "rating_evidence",
    "predictions",
  ]) || input.record_mode !== "development_fixture"
    || !Array.isArray(input.calibration_rater_ids)
    || !Array.isArray(input.rating_evidence)
    || !Array.isArray(input.predictions)) fail("evaluation_input");
  verifyCorpus(input.corpus);
  verifySplit(input.corpus, input.split_manifest);
  if (!canonicalUnique(input.calibration_rater_ids, true)) fail("rater_leakage");
  const calibrationRaters = new Set(input.calibration_rater_ids);
  const testGroupIds = new Set(input.split_manifest.analysis_locked_leakage_group_ids);
  const expected = input.corpus.comparisons.filter(({ leakage_group_id }) =>
    testGroupIds.has(leakage_group_id));
  const expectedIds = new Set(expected.map(({ comparison_id }) => comparison_id));

  const mappingsByComparison = new Map<string, HumanDimensionRatingMapping[]>();
  const ratingEvidence = [...input.rating_evidence].sort((left, right) =>
    compareText(left.mapping.comparison_id, right.mapping.comparison_id)
      || compareText(left.mapping.rater_id, right.mapping.rater_id)
      || compareText(left.mapping.raw_rating_digest, right.mapping.raw_rating_digest));
  for (const evidence of ratingEvidence) {
    const mapping = verifyRatingEvidence(input.corpus, input.split_manifest, evidence);
    if (mapping.split !== "analysis_locked_public_test"
      || !expectedIds.has(mapping.comparison_id)
      || calibrationRaters.has(mapping.rater_id)) {
      fail(calibrationRaters.has(mapping.rater_id) ? "rater_leakage" : "leakage_split");
    }
    const comparison = comparisonById(input.corpus, mapping.comparison_id);
    const expectedWinner = mapping.canonical_outcome === "candidate_a"
      ? comparison.candidate_a.candidate_id
      : mapping.canonical_outcome === "candidate_b"
        ? comparison.candidate_b.candidate_id
        : null;
    if (mapping.comparison_digest !== comparison.comparison_digest
      || mapping.leakage_group_id !== comparison.leakage_group_id
      || mapping.canonical_winner_candidate_id !== expectedWinner
      || (mapping.canonical_winner_candidate_id !== null
        && ![comparison.candidate_a.candidate_id, comparison.candidate_b.candidate_id]
          .includes(mapping.canonical_winner_candidate_id))) fail("mapping");
    const values = mappingsByComparison.get(mapping.comparison_id) ?? [];
    values.push(mapping);
    mappingsByComparison.set(mapping.comparison_id, values);
  }

  const predictionInputs = [...input.predictions]
    .sort((left, right) => compareText(left.comparison_id, right.comparison_id));
  const predictions = new Map<string, HumanCalibrationPrediction>();
  for (const prediction of predictionInputs) {
    if (!expectedIds.has(prediction.comparison_id) || predictions.has(prediction.comparison_id)) {
      fail("prediction");
    }
    const comparison = comparisonById(input.corpus, prediction.comparison_id);
    verifyPrediction(prediction, comparison);
    predictions.set(prediction.comparison_id, prediction);
  }
  if (predictions.size !== expected.length) fail("prediction");
  const modelRefs = new Set(predictionInputs.map(({ model_ref }) => model_ref));
  if (modelRefs.size !== 1) fail("prediction");

  const labels = new Map<string, string>();
  const missingComparisonIds: string[] = [];
  for (const comparison of expected) {
    const mappings = mappingsByComparison.get(comparison.comparison_id) ?? [];
    const raters = new Set(mappings.map(({ rater_id }) => rater_id));
    const decisive = mappings.filter(({ canonical_outcome, canonical_winner_candidate_id }) =>
      (canonical_outcome === "candidate_a" || canonical_outcome === "candidate_b")
      && canonical_winner_candidate_id !== null);
    const winners = new Set(decisive.map(({ canonical_winner_candidate_id }) =>
      canonical_winner_candidate_id!));
    if (raters.size < 3 || mappings.length !== raters.size
      || decisive.length !== mappings.length || winners.size !== 1) {
      missingComparisonIds.push(comparison.comparison_id);
      continue;
    }
    labels.set(comparison.comparison_id, decisive[0]!.canonical_winner_candidate_id!);
  }
  missingComparisonIds.sort(compareText);
  const measured = missingComparisonIds.length === 0;
  let pairAccuracy: number | null = null;
  let groupMacroAccuracy: number | null = null;
  if (measured) {
    const pairScores = expected.map((comparison) =>
      Number(predictions.get(comparison.comparison_id)!.predicted_candidate_id
        === labels.get(comparison.comparison_id)!));
    pairAccuracy = rounded(pairScores.reduce((sum, value) => sum + value, 0) / pairScores.length);
    const groupScores = input.split_manifest.analysis_locked_leakage_group_ids.map((groupId) => {
      const members = expected.filter(({ leakage_group_id }) => leakage_group_id === groupId);
      const scores = members.map((comparison) =>
        Number(predictions.get(comparison.comparison_id)!.predicted_candidate_id
          === labels.get(comparison.comparison_id)!));
      return scores.reduce((sum, value) => sum + value, 0) / scores.length;
    });
    groupMacroAccuracy = rounded(
      groupScores.reduce((sum, value) => sum + value, 0) / groupScores.length,
    );
  }
  const evaluatedGroupCount = input.split_manifest.analysis_locked_leakage_group_ids.filter(
    (groupId) => expected.filter(({ leakage_group_id }) => leakage_group_id === groupId)
      .every(({ comparison_id }) => labels.has(comparison_id)),
  ).length;
  const evaluationInputDigest = sha256Canonical({
    contract_version: "contentmd.human-calibration-evaluation-input/0.1.0",
    corpus_manifest_digest: input.corpus.manifest.manifest_digest,
    split_manifest_digest: input.split_manifest.split_digest,
    calibration_rater_ids: input.calibration_rater_ids,
    rating_evidence: ratingEvidence,
    predictions: predictionInputs,
  });
  const preimage = {
    contract_version: "contentmd.human-calibration-effectiveness/0.1.0" as const,
    record_mode: "development_fixture" as const,
    corpus_manifest_digest: input.corpus.manifest.manifest_digest,
    split_manifest_digest: input.split_manifest.split_digest,
    model_ref: input.predictions[0]?.model_ref ?? null,
    status: measured ? "measured" as const : "insufficient_human_evidence" as const,
    minimum_independent_raters: 3 as const,
    expected_group_count: input.split_manifest.analysis_locked_leakage_group_ids.length,
    expected_pair_count: expected.length,
    evaluated_group_count: evaluatedGroupCount,
    evaluated_pair_count: labels.size,
    missing_comparison_ids: missingComparisonIds,
    pair_accuracy: pairAccuracy,
    group_macro_accuracy: groupMacroAccuracy,
    evaluation_input_digest: evaluationInputDigest,
    authority_effect: "none" as const,
    approval_effect: "none" as const,
    publication_effect: "none" as const,
  };
  return immutable({ ...preimage, report_digest: sha256Canonical(preimage) });
}
