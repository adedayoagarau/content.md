import { canonicalJson, sha256Canonical, verifyRecordDigest } from "@contentmd/core";
import {
  TASK4_FEATURE_ORDER,
  createFeatureProfile,
  task4VerifyCompleteDigestGraph,
  task4PreflightFeatureProfileInputShape,
  task4PreflightFeatureProfileRecordShape,
  task4PreflightVectorizationInputShape,
  task4VerifyProfileCheckpointStage,
  task4VerifyProfileUnicodeStage,
  task4VerifyVectorUnicodeStage,
  task4VerifyProfileReferenceStage,
  task4VerifyProfileScopeStage,
  task4VerifyVectorCheckpointStage,
  task4VerifyVectorFeatureProfileStage,
  task4VerifyVectorReferenceStage,
  task4VerifyVectorScopeStage,
  vectorizeCandidate,
  type CandidateFeatureVector,
  type CandidateVectorizationInput,
  type CreateFeatureProfileInput,
} from "./features.js";
import type { StoreArtifactWitness } from "./leakage.js";
import {
  LEARNING_SCHEMA_IDS,
  type ArtifactRef,
  type DigestRef,
  type FeatureDefinition,
  type FeatureProfile,
} from "./records.js";
import {
  task4AssertCanonicalGraph,
  task4AssertNoQuarantinedExpressions,
  task4AssertNoForbiddenInputFields,
  task4AssertFiniteNumbers,
  task4AssertUnicodeScalarGraph,
  task4AssertArtifactRefShape,
  task4AssertDigestRefShape,
  task4AssertExactKeys,
  task4CanonicalEqual,
  task4ContainsNonfinite,
  task4HasQuarantinedExpressions,
  task4DigestRef,
  task4FailContract,
  task4CacheKey,
  task4Immutable,
  task4PreflightProducerShape,
  task4PreflightStoreArtifactShape,
  task4SortCanonical,
  task4RunStagePlan,
  task4TopLevelGate,
  task4WithDeferredNumeric,
  task4WithoutForbiddenInputFields,
  task4VerifyArtifactRef,
  task4VerifyDigestRef,
  verifyTask4Producer,
  verifyTask4RuntimeProfile,
  type Task4ProducerArtifactWitness,
  type Task4ProvenanceRef,
  type Task4RecordMode,
} from "./retrieval.js";

export interface BaselineComponent {
  name:
    | "required_facts"
    | "recovery"
    | "terminology"
    | "contextual_specificity"
    | "evidence"
    | "one_minus_generic"
    | "one_minus_length";
  weight: number;
}

export interface CreateBaselineInput {
  record_mode: Task4RecordMode;
  producer: Task4ProducerArtifactWitness;
  feature_profile_input: CreateFeatureProfileInput;
  feature_profile: FeatureProfile;
  runtime_profile: StoreArtifactWitness;
}

export interface DeterministicBaseline {
  contract_version: "contentmd.task4-deterministic-baseline/0.1.0";
  baseline_id: string;
  record_mode: "development_fixture";
  baseline_version: "expression-fit-baseline/0.1.0";
  ranking_objective: "expression_preference";
  candidate_kind: "expression";
  project_id: string;
  feature_profile_ref: DigestRef;
  components: [
    { name: "required_facts"; weight: 0.25 },
    { name: "recovery"; weight: 0.15 },
    { name: "terminology"; weight: 0.15 },
    { name: "contextual_specificity"; weight: 0.15 },
    { name: "evidence"; weight: 0.15 },
    { name: "one_minus_generic"; weight: 0.10 },
    { name: "one_minus_length"; weight: 0.05 },
  ];
  contextual_specificity_projection: "mean_6_scope_matches_plus_applicable_entity_and_action";
  missing_component_rule: "omit_and_renormalize";
  pair_sigmoid_scale: 4;
  probability_clip_lower: 0.000001;
  probability_clip_upper: 0.999999;
  tie_rule: "exact_score_tie_probability_0.5";
  ordering_tie_break: "ascending_candidate_content_digest";
  producer_manifest_digest: string;
  producer_verification_ref: DigestRef | null;
  runtime_profile_ref: ArtifactRef;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  baseline_digest: string;
}

export interface BaselineScoreInput {
  record_mode: Task4RecordMode;
  baseline_input: CreateBaselineInput;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  vectorization_input: CandidateVectorizationInput;
  vector: CandidateFeatureVector;
}

export interface BaselineCandidateScore {
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  baseline_ref: DigestRef;
  applicable_components: Array<{
    name: BaselineComponent["name"];
    raw_value: number;
    declared_weight: number;
    normalized_weight: number;
    contribution: number;
  }>;
  omitted_components: Array<
    "required_facts" | "recovery" | "terminology" | "evidence" | "one_minus_length"
  >;
  score: number;
  score_digest: string;
}

export interface BaselinePairInput {
  record_mode: Task4RecordMode;
  baseline_input: CreateBaselineInput;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  candidate_a_vectorization_input: CandidateVectorizationInput;
  candidate_a: CandidateFeatureVector;
  candidate_b_vectorization_input: CandidateVectorizationInput;
  candidate_b: CandidateFeatureVector;
}

export interface BaselinePairResult {
  baseline_ref: DigestRef;
  candidate_a_ref: DigestRef;
  candidate_b_ref: DigestRef;
  candidate_a_vector_ref: DigestRef;
  candidate_b_vector_ref: DigestRef;
  score_a: number;
  score_b: number;
  score_difference: number;
  probability_a: number;
  probability_b: number;
  pair_digest: string;
}

export interface BaselineOrderingInput {
  record_mode: Task4RecordMode;
  baseline_input: CreateBaselineInput;
  baseline: DeterministicBaseline;
  feature_profile: FeatureProfile;
  candidates: [{
    vectorization_input: CandidateVectorizationInput;
    vector: CandidateFeatureVector;
  }, ...Array<{
    vectorization_input: CandidateVectorizationInput;
    vector: CandidateFeatureVector;
  }>];
}

export interface BaselineOrderedCandidate {
  rank: number;
  candidate_ref: DigestRef;
  vector_ref: DigestRef;
  score: number;
}

const CREATE_KEYS = ["record_mode", "producer", "feature_profile_input", "feature_profile", "runtime_profile"] as const;
const SCORE_KEYS = ["record_mode", "baseline_input", "baseline", "feature_profile", "vectorization_input", "vector"] as const;
const PAIR_KEYS = [
  "record_mode", "baseline_input", "baseline", "feature_profile", "candidate_a_vectorization_input", "candidate_a",
  "candidate_b_vectorization_input", "candidate_b",
] as const;
const ORDERING_KEYS = ["record_mode", "baseline_input", "baseline", "feature_profile", "candidates"] as const;
const BASELINE_CACHE = new Map<string, DeterministicBaseline>();
const BASELINE_SCORE_CACHE = new Map<string, BaselineCandidateScore>();
const BASELINE_PAIR_CACHE = new Map<string, BaselinePairResult>();
const BASELINE_ORDERING_CACHE = new Map<string, BaselineOrderedCandidate[]>();

function baselineComponents(): DeterministicBaseline["components"] {
  return [
    { name: "required_facts", weight: 0.25 },
    { name: "recovery", weight: 0.15 },
    { name: "terminology", weight: 0.15 },
    { name: "contextual_specificity", weight: 0.15 },
    { name: "evidence", weight: 0.15 },
    { name: "one_minus_generic", weight: 0.10 },
    { name: "one_minus_length", weight: 0.05 },
  ];
}

const FEATURE_DEFINITIONS: [FeatureDefinition, ...FeatureDefinition[]] = [
  { name: "project_match", position: 0, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "product_area_match", position: 1, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "journey_state_match", position: 2, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "channel_match", position: 3, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "locale_match", position: 4, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "risk_match", position: 5, value_type: "boolean", transformation: "exact equality", nullable: false, missing_indicator_name: null },
  { name: "required_fact_coverage", position: 6, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "required_fact_coverage_missing" },
  { name: "required_fact_coverage_missing", position: 7, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "recovery_action_coverage", position: 8, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "recovery_action_coverage_missing" },
  { name: "recovery_action_coverage_missing", position: 9, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "approved_terminology_ratio", position: 10, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "approved_terminology_ratio_missing" },
  { name: "approved_terminology_ratio_missing", position: 11, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "contextual_entity_coverage", position: 12, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "contextual_entity_coverage_missing" },
  { name: "contextual_entity_coverage_missing", position: 13, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "contextual_action_coverage", position: 14, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "contextual_action_coverage_missing" },
  { name: "contextual_action_coverage_missing", position: 15, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "supporting_evidence_coverage", position: 16, value_type: "number", transformation: "distinct satisfied / applicable", nullable: true, missing_indicator_name: "supporting_evidence_coverage_missing" },
  { name: "supporting_evidence_coverage_missing", position: 17, value_type: "boolean", transformation: "applicable set empty", nullable: false, missing_indicator_name: null },
  { name: "generic_language_density", position: 18, value_type: "number", transformation: "covered generic token positions / tokens", nullable: false, missing_indicator_name: null },
  { name: "length_distance", position: 19, value_type: "number", transformation: "normalized distance to grapheme range", nullable: true, missing_indicator_name: "length_distance_missing" },
  { name: "length_distance_missing", position: 20, value_type: "boolean", transformation: "no length range", nullable: false, missing_indicator_name: null },
];

const FORBIDDEN_FIELDS = [
  "actor_identity", "author_identity", "protected_class", "inferred_emotion", "inferred_vulnerability",
  "presentation_side", "presentation_order", "provider_alternative_order", "decision", "post_decision_outcome",
  "browser_expression", "competitor_expression", "third_party_expression",
] as const;

const PROFILE_ARTIFACT_ROLES = [
  "feature_universe", "generic_lexicon", "unicode_normalization", "unicode_casefold", "unicode_whitespace",
  "unicode_word_break", "unicode_grapheme_break", "runtime_profile", "hard_rule_set",
] as const;

const DIGEST = /^[a-f0-9]{64}$/;
const BOOLEAN_POSITIONS = new Set([0, 1, 2, 3, 4, 5, 7, 9, 11, 13, 15, 17, 20]);
const NULLABLE_PAIRS = [[6, 7], [8, 9], [10, 11], [12, 13], [14, 15], [16, 17], [19, 20]] as const;

function text(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task4FailContract("canonical_value");
}

function digest(value: unknown): asserts value is string {
  if (typeof value !== "string") task4FailContract("canonical_value");
  if (!DIGEST.test(value)) task4FailContract("digest");
}

function featureProfileRef(profile: FeatureProfile): DigestRef {
  return task4DigestRef(profile.record_id, profile.schema_id, profile.content_digest);
}

function baselineRef(baseline: DeterministicBaseline): DigestRef {
  return task4DigestRef(
    baseline.baseline_id,
    "contentmd.task4-deterministic-baseline",
    baseline.baseline_digest,
  );
}

function vectorRef(vector: CandidateFeatureVector): DigestRef {
  return task4DigestRef(
    vector.vector_id,
    "contentmd.task4-candidate-feature-vector",
    vector.vector_digest,
  );
}

function candidateVectorNonProvenanceView(vector: CandidateFeatureVector): unknown {
  const {
    provenance: _provenance,
    vector_id: _vectorId,
    vector_digest: _vectorDigest,
    ...view
  } = vector;
  return view;
}

function candidateVectorReplayView(
  vector: CandidateFeatureVector,
  deferConstructionDigest: boolean,
): unknown {
  const view = candidateVectorNonProvenanceView(vector) as Record<string, unknown>;
  if (!deferConstructionDigest) return view;
  const { input_digest: _inputDigest, ...independentView } = view;
  return independentView;
}

function featureProfileNonProvenanceView(profile: FeatureProfile): unknown {
  const { provenance: _provenance, content_digest: _contentDigest, ...view } = profile;
  return view;
}

function canonicalArtifactSet(values: readonly ArtifactRef[]): void {
  if (values.length === 0) task4FailContract("feature_profile_binding");
  values.forEach(task4VerifyArtifactRef);
  if (!task4CanonicalEqual(values, task4SortCanonical(values))
    || new Set(values.map((value) => canonicalJson(value))).size !== values.length) {
    task4FailContract("feature_profile_binding");
  }
}

function profileProvenanceOrder(
  left: FeatureProfile["provenance"][number],
  right: FeatureProfile["provenance"][number],
): number {
  return left.record_id.localeCompare(right.record_id, "en")
    || left.relationship.localeCompare(right.relationship, "en")
    || left.content_digest.localeCompare(right.content_digest, "en");
}

function assertFeatureProfileShape(profile: unknown): asserts profile is FeatureProfile {
  task4AssertExactKeys(profile, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task4AssertExactKeys(profile.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  task4AssertExactKeys(profile.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest", "code_digest",
    "input_digest", "authority_effect", "feature_profile_version", "features", "source_artifact_refs",
    "forbidden_input_fields", "runtime_profile_ref", "profile_state",
  ]);
  if (!Array.isArray(profile.provenance)) task4FailContract("canonical_value");
  for (const entry of profile.provenance) {
    task4AssertExactKeys(entry, ["record_id", "relationship", "content_digest"]);
  }
  if (!Array.isArray(profile.payload.features)
    || !Array.isArray(profile.payload.source_artifact_refs)
    || !Array.isArray(profile.payload.forbidden_input_fields)) task4FailContract("canonical_value");
  for (const definition of profile.payload.features) {
    task4AssertExactKeys(definition, [
      "name", "position", "value_type", "transformation", "nullable", "missing_indicator_name",
    ]);
  }
}

function verifyFeatureProfileDigestStage(profile: FeatureProfile): void {
  assertFeatureProfileShape(profile);
  digest(profile.payload.schema_digest);
  digest(profile.payload.code_digest);
  digest(profile.payload.input_digest);
  digest(profile.content_digest);
  task4VerifyArtifactRef(profile.payload.runtime_profile_ref);
  profile.payload.source_artifact_refs.forEach(task4VerifyArtifactRef);
  for (const entry of profile.provenance) digest(entry.content_digest);
  if (profile.record_id !== `feature-profile.${sha256Canonical({
    contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
    project_id: profile.scope.project_id,
    input_digest: profile.payload.input_digest,
  })}`) task4FailContract("digest");
  if (!task4ContainsNonfinite(profile) && verifyRecordDigest(profile).valid !== true) {
    task4FailContract("digest");
  }
}

function verifyFeatureProfile(profile: FeatureProfile): void {
  assertFeatureProfileShape(profile);
  verifyFeatureProfileDigestStage(profile);
  if (profile.schema_id !== LEARNING_SCHEMA_IDS.featureProfile
    || profile.schema_version !== "0.1.0"
    || (Number.isFinite(profile.record_version) && profile.record_version !== 1)
    || profile.lifecycle_state !== "active"
    || profile.scope.memory_scope !== "project"
    || typeof profile.scope.project_id !== "string" || profile.scope.project_id.length === 0
    || !Array.isArray(profile.scope.resource_refs) || profile.scope.resource_refs.length !== 1
    || typeof profile.scope.resource_refs[0] !== "string" || profile.scope.resource_refs[0].length === 0
    || !task4CanonicalEqual(profile.scope.data_classes, ["learning_feature_profile"])
    || profile.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || profile.payload.record_mode !== "development_fixture"
    || profile.payload.ranking_objective !== "expression_preference"
    || profile.payload.candidate_kind !== "expression"
    || profile.payload.authority_effect !== "none"
    || profile.payload.feature_profile_version !== "rank-features/0.1.0"
    || profile.payload.profile_state !== "frozen"
    || !task4CanonicalEqual(profile.payload.features, FEATURE_DEFINITIONS)
    || !task4CanonicalEqual(profile.payload.forbidden_input_fields, FORBIDDEN_FIELDS)) {
    task4FailContract("feature_profile_binding");
  }
  canonicalArtifactSet(profile.payload.source_artifact_refs);
  if (!profile.payload.source_artifact_refs.some((ref) => task4CanonicalEqual(ref, profile.payload.runtime_profile_ref))) {
    task4FailContract("feature_profile_binding");
  }
  if (profile.provenance.length === 0
    || !task4CanonicalEqual(profile.provenance, [...profile.provenance].sort(profileProvenanceOrder))
    || new Set(profile.provenance.map((entry) => canonicalJson(entry))).size !== profile.provenance.length) {
    task4FailContract("provenance");
  }
  const roleCounts = new Map<string, number>();
  const matchedArtifacts = new Set<string>();
  let producerEntries = 0;
  for (const entry of profile.provenance) {
    text(entry.record_id);
    text(entry.relationship);
    digest(entry.content_digest);
    if (entry.relationship === "producer_verification") {
      producerEntries += 1;
      continue;
    }
    const prefix = "task4_feature_artifact_";
    if (!entry.relationship.startsWith(prefix)) task4FailContract("provenance");
    const role = entry.relationship.slice(prefix.length);
    if (!(PROFILE_ARTIFACT_ROLES as readonly string[]).includes(role)) task4FailContract("provenance");
    const matching = profile.payload.source_artifact_refs.filter((ref) =>
      entry.record_id === `artifact.${ref.artifact_id}.${ref.artifact_version}`
      && entry.content_digest === ref.artifact_digest);
    if (matching.length !== 1) task4FailContract("provenance");
    const key = canonicalJson(matching[0]);
    if (matchedArtifacts.has(key)) task4FailContract("provenance");
    matchedArtifacts.add(key);
    roleCounts.set(role, (roleCounts.get(role) ?? 0) + 1);
    if (role === "runtime_profile" && !task4CanonicalEqual(matching[0], profile.payload.runtime_profile_ref)) {
      task4FailContract("provenance");
    }
  }
  if (producerEntries > 1 || matchedArtifacts.size !== profile.payload.source_artifact_refs.length
    || PROFILE_ARTIFACT_ROLES.slice(0, -1).some((role) => roleCounts.get(role) !== 1)
    || (roleCounts.get("hard_rule_set") ?? 0) < 1) task4FailContract("provenance");
}

function verifyFeatureProfileBindingStage(profile: FeatureProfile): void {
  if (profile.schema_id !== LEARNING_SCHEMA_IDS.featureProfile
    || profile.schema_version !== "0.1.0"
    || (Number.isFinite(profile.record_version) && profile.record_version !== 1)
    || profile.lifecycle_state !== "active"
    || profile.scope.memory_scope !== "project"
    || typeof profile.scope.project_id !== "string" || profile.scope.project_id.length === 0
    || !Array.isArray(profile.scope.resource_refs) || profile.scope.resource_refs.length !== 1
    || typeof profile.scope.resource_refs[0] !== "string" || profile.scope.resource_refs[0].length === 0
    || !task4CanonicalEqual(profile.scope.data_classes, ["learning_feature_profile"])
    || profile.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || profile.payload.record_mode !== "development_fixture"
    || profile.payload.ranking_objective !== "expression_preference"
    || profile.payload.candidate_kind !== "expression"
    || profile.payload.authority_effect !== "none"
    || profile.payload.feature_profile_version !== "rank-features/0.1.0"
    || profile.payload.profile_state !== "frozen"
    || !task4CanonicalEqual(profile.payload.features, FEATURE_DEFINITIONS)
    || !task4CanonicalEqual(profile.payload.forbidden_input_fields, FORBIDDEN_FIELDS)) {
    task4FailContract("feature_profile_binding");
  }
  canonicalArtifactSet(profile.payload.source_artifact_refs);
  if (!profile.payload.source_artifact_refs.some((ref) =>
    task4CanonicalEqual(ref, profile.payload.runtime_profile_ref))) {
    task4FailContract("feature_profile_binding");
  }
}

function verifyFeatureProfileProvenanceStage(profile: FeatureProfile): void {
  if (profile.provenance.length === 0
    || !task4CanonicalEqual(profile.provenance, [...profile.provenance].sort(profileProvenanceOrder))
    || new Set(profile.provenance.map((entry) => canonicalJson(entry))).size !== profile.provenance.length) {
    task4FailContract("provenance");
  }
  const roleCounts = new Map<string, number>();
  const matchedArtifacts = new Set<string>();
  let producerEntries = 0;
  for (const entry of profile.provenance) {
    if (entry.relationship === "producer_verification") {
      producerEntries += 1;
      continue;
    }
    const prefix = "task4_feature_artifact_";
    if (!entry.relationship.startsWith(prefix)) task4FailContract("provenance");
    const role = entry.relationship.slice(prefix.length);
    if (!(PROFILE_ARTIFACT_ROLES as readonly string[]).includes(role)) task4FailContract("provenance");
    const matching = profile.payload.source_artifact_refs.filter((ref) =>
      entry.record_id === `artifact.${ref.artifact_id}.${ref.artifact_version}`
      && entry.content_digest === ref.artifact_digest);
    if (matching.length !== 1) task4FailContract("provenance");
    const key = canonicalJson(matching[0]);
    if (matchedArtifacts.has(key)) task4FailContract("provenance");
    matchedArtifacts.add(key);
    roleCounts.set(role, (roleCounts.get(role) ?? 0) + 1);
    if (role === "runtime_profile"
      && !task4CanonicalEqual(matching[0], profile.payload.runtime_profile_ref)) {
      task4FailContract("provenance");
    }
  }
  if (producerEntries > 1 || matchedArtifacts.size !== profile.payload.source_artifact_refs.length
    || PROFILE_ARTIFACT_ROLES.slice(0, -1).some((role) => roleCounts.get(role) !== 1)
    || (roleCounts.get("hard_rule_set") ?? 0) < 1) task4FailContract("provenance");
}

function baselineProvenance(
  profileRef: DigestRef,
  runtimeRef: ArtifactRef,
  producerRef: DigestRef | null,
): [Task4ProvenanceRef, ...Task4ProvenanceRef[]] {
  const values: Task4ProvenanceRef[] = [
    { subject_kind: "digest_ref", ref: profileRef, relationship: "feature_profile" },
    { subject_kind: "artifact_ref", ref: runtimeRef, relationship: "runtime_artifact" },
  ];
  if (producerRef !== null) values.push({
    subject_kind: "digest_ref",
    ref: producerRef,
    relationship: "producer_verification",
  });
  return task4SortCanonical(values) as [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
}

function assertBaselineShape(value: unknown): asserts value is DeterministicBaseline {
  task4AssertExactKeys(value, [
    "contract_version", "baseline_id", "record_mode", "baseline_version", "ranking_objective", "candidate_kind",
    "project_id", "feature_profile_ref", "components", "contextual_specificity_projection",
    "missing_component_rule", "pair_sigmoid_scale", "probability_clip_lower", "probability_clip_upper",
    "tie_rule", "ordering_tie_break", "producer_manifest_digest", "producer_verification_ref",
    "runtime_profile_ref", "provenance", "authority_effect", "baseline_digest",
  ]);
  if (typeof value.baseline_id !== "string"
    || typeof value.project_id !== "string" || value.project_id.length === 0
    || typeof value.producer_manifest_digest !== "string"
    || typeof value.baseline_digest !== "string") task4FailContract("canonical_value");
  task4AssertDigestRefShape(value.feature_profile_ref);
  task4AssertArtifactRefShape(value.runtime_profile_ref);
  if (!Array.isArray(value.components) || !Array.isArray(value.provenance)) task4FailContract("canonical_value");
  for (const component of value.components) {
    task4AssertExactKeys(component, ["name", "weight"]);
    text(component.name);
    if (typeof component.weight !== "number") task4FailContract("canonical_value");
  }
  for (const entry of value.provenance) {
    if (entry.subject_kind === "digest_ref") {
      task4AssertExactKeys(entry, ["subject_kind", "ref", "relationship"]);
      task4AssertDigestRefShape(entry.ref);
    } else if (entry.subject_kind === "artifact_ref") {
      task4AssertExactKeys(entry, ["subject_kind", "ref", "relationship"]);
      task4AssertArtifactRefShape(entry.ref);
    } else task4FailContract("canonical_value");
  }
  if (value.producer_verification_ref !== null) {
    task4AssertDigestRefShape(value.producer_verification_ref);
  }
  for (const entry of value.provenance) text(entry.relationship);
  for (const number of [
    value.pair_sigmoid_scale,
    value.probability_clip_lower,
    value.probability_clip_upper,
  ]) if (typeof number !== "number") task4FailContract("canonical_value");
}

function verifyBaselineDigestStage(baseline: DeterministicBaseline): void {
  assertBaselineShape(baseline);
  task4VerifyDigestRef(baseline.feature_profile_ref);
  task4VerifyArtifactRef(baseline.runtime_profile_ref);
  if (baseline.producer_verification_ref !== null) task4VerifyDigestRef(baseline.producer_verification_ref);
  digest(baseline.producer_manifest_digest);
  digest(baseline.baseline_digest);
  for (const entry of baseline.provenance) {
    if (entry.subject_kind === "digest_ref") task4VerifyDigestRef(entry.ref);
    else task4VerifyArtifactRef(entry.ref);
  }
  if (task4ContainsNonfinite(baseline)) return;
  const { baseline_id: _id, baseline_digest: _digest, ...identity } = baseline;
  if (baseline.baseline_id !== `deterministic-baseline.${sha256Canonical(identity)}`) task4FailContract("digest");
  const { baseline_digest: _drop, ...content } = baseline;
  if (baseline.baseline_digest !== sha256Canonical(content)) task4FailContract("digest");
}

function verifyBaseline(baseline: DeterministicBaseline): void {
  assertBaselineShape(baseline);
  text(baseline.project_id);
  task4AssertDigestRefShape(baseline.feature_profile_ref);
  task4AssertArtifactRefShape(baseline.runtime_profile_ref);
  if (baseline.producer_verification_ref !== null) task4AssertDigestRefShape(baseline.producer_verification_ref);
  if (baseline.contract_version !== "contentmd.task4-deterministic-baseline/0.1.0"
    || baseline.record_mode !== "development_fixture"
    || baseline.baseline_version !== "expression-fit-baseline/0.1.0"
    || baseline.ranking_objective !== "expression_preference"
    || baseline.candidate_kind !== "expression"
    || !task4CanonicalEqual(baseline.components, baselineComponents())
    || baseline.contextual_specificity_projection !== "mean_6_scope_matches_plus_applicable_entity_and_action"
    || baseline.missing_component_rule !== "omit_and_renormalize"
    || (Number.isFinite(baseline.pair_sigmoid_scale) && baseline.pair_sigmoid_scale !== 4)
    || (Number.isFinite(baseline.probability_clip_lower) && baseline.probability_clip_lower !== 0.000001)
    || (Number.isFinite(baseline.probability_clip_upper) && baseline.probability_clip_upper !== 0.999999)
    || baseline.tie_rule !== "exact_score_tie_probability_0.5"
    || baseline.ordering_tie_break !== "ascending_candidate_content_digest"
    || baseline.authority_effect !== "none") task4FailContract("canonical_value");
  verifyBaselineDigestStage(baseline);
  const expectedProvenance = baselineProvenance(
    baseline.feature_profile_ref,
    baseline.runtime_profile_ref,
    baseline.producer_verification_ref,
  );
  if (!task4CanonicalEqual(baseline.provenance, expectedProvenance)) task4FailContract("provenance");
}

function verifyBaselineCanonicalStage(baseline: DeterministicBaseline): void {
  text(baseline.project_id);
  if (baseline.contract_version !== "contentmd.task4-deterministic-baseline/0.1.0"
    || baseline.record_mode !== "development_fixture"
    || baseline.baseline_version !== "expression-fit-baseline/0.1.0"
    || baseline.ranking_objective !== "expression_preference"
    || baseline.candidate_kind !== "expression"
    || !task4CanonicalEqual(baseline.components, baselineComponents())
    || baseline.contextual_specificity_projection !== "mean_6_scope_matches_plus_applicable_entity_and_action"
    || baseline.missing_component_rule !== "omit_and_renormalize"
    || (Number.isFinite(baseline.pair_sigmoid_scale) && baseline.pair_sigmoid_scale !== 4)
    || (Number.isFinite(baseline.probability_clip_lower) && baseline.probability_clip_lower !== 0.000001)
    || (Number.isFinite(baseline.probability_clip_upper) && baseline.probability_clip_upper !== 0.999999)
    || baseline.tie_rule !== "exact_score_tie_probability_0.5"
    || baseline.ordering_tie_break !== "ascending_candidate_content_digest"
    || baseline.authority_effect !== "none") task4FailContract("canonical_value");
}

function verifyBaselineProvenanceStage(baseline: DeterministicBaseline): void {
  const expected = baselineProvenance(
    baseline.feature_profile_ref,
    baseline.runtime_profile_ref,
    baseline.producer_verification_ref,
  );
  if (!task4CanonicalEqual(baseline.provenance, expected)) task4FailContract("provenance");
}

function verifyBaselineProfileBinding(
  baseline: DeterministicBaseline,
  profile: FeatureProfile,
): void {
  verifyBaselineCanonicalStage(baseline);
  verifyFeatureProfileBindingStage(profile);
  const profileRef = featureProfileRef(profile);
  if (!task4CanonicalEqual(baseline.feature_profile_ref, profileRef)
    || baseline.project_id !== profile.scope.project_id
    || !task4CanonicalEqual(baseline.runtime_profile_ref, profile.payload.runtime_profile_ref)) {
    task4FailContract("feature_profile_binding");
  }
}

function assertCandidateVectorShape(value: unknown): asserts value is CandidateFeatureVector {
  task4AssertExactKeys(value, [
    "contract_version", "vector_id", "record_mode", "project_id", "candidate_ref", "context_ref",
    "target_scope_ref", "target_scope_role", "checkpoint_set_ref", "feature_profile_ref", "feature_universe_ref",
    "runtime_profile_ref", "unicode_runtime_digest", "input_digest", "feature_order", "values",
    "satisfied_material_refs", "grapheme_constraint_refs", "grapheme_count", "token_count", "provenance",
    "authority_effect", "vector_digest",
  ]);
  task4AssertDigestRefShape(value.candidate_ref);
  task4AssertDigestRefShape(value.context_ref);
  task4AssertDigestRefShape(value.target_scope_ref);
  task4AssertDigestRefShape(value.checkpoint_set_ref);
  task4AssertDigestRefShape(value.feature_profile_ref);
  task4AssertDigestRefShape(value.feature_universe_ref);
  task4AssertArtifactRefShape(value.runtime_profile_ref);
  if (value.contract_version !== "contentmd.task4-candidate-feature-vector/0.1.0"
    || typeof value.vector_id !== "string"
    || value.record_mode !== "development_fixture"
    || typeof value.project_id !== "string" || value.project_id.length === 0
    || value.target_scope_role !== "target"
    || typeof value.unicode_runtime_digest !== "string"
    || typeof value.input_digest !== "string"
    || typeof value.grapheme_count !== "number"
    || (Number.isFinite(value.grapheme_count)
      && (!Number.isSafeInteger(value.grapheme_count) || value.grapheme_count < 0))
    || typeof value.token_count !== "number"
    || (Number.isFinite(value.token_count)
      && (!Number.isSafeInteger(value.token_count) || value.token_count < 0))
    || value.authority_effect !== "none"
    || typeof value.vector_digest !== "string") task4FailContract("canonical_value");
  if (!Array.isArray(value.feature_order) || !Array.isArray(value.values)
    || !Array.isArray(value.satisfied_material_refs) || !Array.isArray(value.grapheme_constraint_refs)
    || !Array.isArray(value.provenance)) task4FailContract("canonical_value");
  if (value.feature_order.length !== TASK4_FEATURE_ORDER.length
    || !task4CanonicalEqual(value.feature_order, TASK4_FEATURE_ORDER)
    || value.values.length !== TASK4_FEATURE_ORDER.length) task4FailContract("canonical_value");
  value.feature_order.forEach(text);
  if (value.values.some((entry) => typeof entry !== "number")) task4FailContract("canonical_value");
  value.satisfied_material_refs.forEach(task4AssertDigestRefShape);
  value.grapheme_constraint_refs.forEach(task4AssertDigestRefShape);
  if (!task4CanonicalEqual(value.satisfied_material_refs, task4SortCanonical(value.satisfied_material_refs))
    || new Set(value.satisfied_material_refs.map(canonicalJson)).size !== value.satisfied_material_refs.length
    || !task4CanonicalEqual(value.grapheme_constraint_refs, task4SortCanonical(value.grapheme_constraint_refs))
    || new Set(value.grapheme_constraint_refs.map(canonicalJson)).size !== value.grapheme_constraint_refs.length) {
    task4FailContract("canonical_value");
  }
  for (const entry of value.provenance) {
    const kind = Object.getOwnPropertyDescriptor(entry, "subject_kind")?.value;
    task4AssertExactKeys(entry, ["subject_kind", "ref", "relationship"]);
    if (kind === "digest_ref") task4AssertDigestRefShape(entry.ref);
    else if (kind === "artifact_ref") task4AssertArtifactRefShape(entry.ref);
    else task4FailContract("canonical_value");
    text(entry.relationship);
  }
}

function verifyCandidateVectorDigestStage(vector: CandidateFeatureVector): void {
  assertCandidateVectorShape(vector);
  for (const ref of [
    vector.candidate_ref, vector.context_ref, vector.target_scope_ref, vector.checkpoint_set_ref,
    vector.feature_profile_ref, vector.feature_universe_ref,
    ...vector.satisfied_material_refs, ...vector.grapheme_constraint_refs,
  ]) task4VerifyDigestRef(ref);
  task4VerifyArtifactRef(vector.runtime_profile_ref);
  digest(vector.unicode_runtime_digest);
  digest(vector.input_digest);
  digest(vector.vector_digest);
  for (const entry of vector.provenance) {
    if (entry.subject_kind === "digest_ref") task4VerifyDigestRef(entry.ref);
    else task4VerifyArtifactRef(entry.ref);
  }
  if (task4ContainsNonfinite(vector)) return;
  const {
    contract_version: _contractVersion,
    vector_id: _vectorId,
    vector_digest: _vectorDigest,
    ...vectorBody
  } = vector;
  if (vector.vector_id !== `candidate-feature-vector.${sha256Canonical({
    contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
    ...vectorBody,
  })}`) task4FailContract("digest");
  const { vector_digest: _drop, ...content } = vector;
  if (vector.vector_digest !== sha256Canonical(content)) task4FailContract("digest");
}

function preflightCreateBaselineInputShape(value: unknown): asserts value is CreateBaselineInput {
  task4AssertExactKeys(value, CREATE_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  task4PreflightProducerShape(value.producer);
  task4PreflightFeatureProfileInputShape(value.feature_profile_input);
  task4PreflightFeatureProfileRecordShape(value.feature_profile);
  task4PreflightStoreArtifactShape(value.runtime_profile);
}

function preflightScoreInputShape(value: unknown): asserts value is BaselineScoreInput {
  task4AssertExactKeys(value, SCORE_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  preflightCreateBaselineInputShape(value.baseline_input);
  assertBaselineShape(value.baseline);
  task4PreflightFeatureProfileRecordShape(value.feature_profile);
  task4PreflightVectorizationInputShape(value.vectorization_input);
  assertCandidateVectorShape(value.vector);
}

function preflightPairInputShape(value: unknown): asserts value is BaselinePairInput {
  task4AssertExactKeys(value, PAIR_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  preflightCreateBaselineInputShape(value.baseline_input);
  assertBaselineShape(value.baseline);
  task4PreflightFeatureProfileRecordShape(value.feature_profile);
  task4PreflightVectorizationInputShape(value.candidate_a_vectorization_input);
  assertCandidateVectorShape(value.candidate_a);
  task4PreflightVectorizationInputShape(value.candidate_b_vectorization_input);
  assertCandidateVectorShape(value.candidate_b);
}

function preflightOrderingInputShape(value: unknown): asserts value is BaselineOrderingInput {
  task4AssertExactKeys(value, ORDERING_KEYS);
  if (value.record_mode !== "development_fixture" || !Array.isArray(value.candidates)
    || value.candidates.length === 0) task4FailContract("canonical_value");
  preflightCreateBaselineInputShape(value.baseline_input);
  assertBaselineShape(value.baseline);
  task4PreflightFeatureProfileRecordShape(value.feature_profile);
  for (const candidate of value.candidates) {
    task4AssertExactKeys(candidate, ["vectorization_input", "vector"]);
    task4PreflightVectorizationInputShape(candidate.vectorization_input);
    assertCandidateVectorShape(candidate.vector);
  }
  const candidateKeys = value.candidates.map((candidate) => canonicalJson(candidate.vector.candidate_ref));
  const vectorKeys = value.candidates.map((candidate) => candidate.vector.vector_id);
  if (new Set(candidateKeys).size !== candidateKeys.length
    || new Set(vectorKeys).size !== vectorKeys.length) task4FailContract("canonical_value");
}

function verifyProfileInputProducerStage(input: CreateFeatureProfileInput): void {
  verifyTask4Producer(input.producer, "feature-profile");
}

function verifyVectorInputProducerStage(input: CandidateVectorizationInput): void {
  verifyTask4Producer(input.producer, "candidate-feature-vector");
  verifyProfileInputProducerStage(input.profile_input);
}

function verifyBaselineInputProducerStage(input: CreateBaselineInput): void {
  verifyTask4Producer(input.producer, "deterministic-baseline");
  verifyProfileInputProducerStage(input.feature_profile_input);
}

function verifyProfileInputUnicodeStage(input: CreateFeatureProfileInput): void {
  task4VerifyProfileUnicodeStage(input);
}

function verifyVectorInputUnicodeStage(input: CandidateVectorizationInput): void {
  task4VerifyVectorUnicodeStage(input);
}

function verifyBaselineInputUnicodeStage(input: CreateBaselineInput): void {
  verifyProfileInputUnicodeStage(input.feature_profile_input);
  verifyTask4RuntimeProfile(input.runtime_profile);
}

function verifyBaselineInputDigestStage(input: CreateBaselineInput): void {
  task4VerifyCompleteDigestGraph(input);
}

function verifyVectorInputDigestStage(input: CandidateVectorizationInput): void {
  task4VerifyCompleteDigestGraph(input);
}

function verifyCandidateVector(
  vector: CandidateFeatureVector,
  baseline: DeterministicBaseline,
  profile: FeatureProfile,
): void {
  assertCandidateVectorShape(vector);
  verifyCandidateVectorDigestStage(vector);
  if (vector.contract_version !== "contentmd.task4-candidate-feature-vector/0.1.0"
    || vector.record_mode !== "development_fixture" || vector.authority_effect !== "none"
    || vector.target_scope_role !== "target"
    || vector.project_id !== baseline.project_id
    || !task4CanonicalEqual(vector.feature_profile_ref, featureProfileRef(profile))
    || !task4CanonicalEqual(vector.runtime_profile_ref, baseline.runtime_profile_ref)
    || !task4CanonicalEqual(vector.feature_order, TASK4_FEATURE_ORDER)
    || !Array.isArray(vector.values) || vector.values.length !== 21
    || (Number.isFinite(vector.grapheme_count)
      && (!Number.isSafeInteger(vector.grapheme_count) || vector.grapheme_count < 1))
    || (Number.isFinite(vector.token_count)
      && (!Number.isSafeInteger(vector.token_count) || vector.token_count < 1))) {
    task4FailContract("feature_profile_binding");
  }
  for (let index = 0; index < vector.values.length; index += 1) {
    const value = vector.values[index]!;
    if (Number.isFinite(value)
      && (value < 0 || value > 1 || (BOOLEAN_POSITIONS.has(index) && value !== 0 && value !== 1))) {
      task4FailContract("feature_profile_binding");
    }
  }
  for (const [valueIndex, missingIndex] of NULLABLE_PAIRS) {
    if (vector.values[missingIndex] === 1
      && Number.isFinite(vector.values[valueIndex])
      && vector.values[valueIndex] !== 0) {
      task4FailContract("feature_profile_binding");
    }
  }
}

function replayVector(
  vectorizationInput: CandidateVectorizationInput,
  vector: CandidateFeatureVector,
  baseline: DeterministicBaseline,
  profile: FeatureProfile,
): CandidateFeatureVector {
  if (!task4CanonicalEqual(
    featureProfileNonProvenanceView(vectorizationInput.profile),
    featureProfileNonProvenanceView(profile),
  )) task4FailContract("feature_profile_binding");
  if (!task4CanonicalEqual(vectorizationInput.profile.provenance, profile.provenance)) {
    task4FailContract("provenance");
  }
  if (!task4CanonicalEqual(vectorizationInput.profile, profile)) task4FailContract("feature_profile_binding");
  const replay = task4WithDeferredNumeric(() => vectorizeCandidate(vectorizationInput));
  if (replay.status !== "eligible" || !task4CanonicalEqual(
    candidateVectorNonProvenanceView(replay.vector),
    candidateVectorNonProvenanceView(vector),
  )) {
    task4FailContract("feature_profile_binding");
  }
  verifyCandidateVector(vector, baseline, profile);
  if (!task4CanonicalEqual(replay.vector.provenance, vector.provenance)) {
    task4FailContract("provenance");
  }
  if (!task4CanonicalEqual(replay.vector, vector)) task4FailContract("feature_profile_binding");
  return vector;
}

function scoreVector(
  vector: CandidateFeatureVector,
  baseline: DeterministicBaseline,
): BaselineCandidateScore {
  const values = vector.values;
  const contextualValues = [values[0], values[1], values[2], values[3], values[4], values[5]];
  if (values[13] === 0) contextualValues.push(values[12]);
  if (values[15] === 0) contextualValues.push(values[14]);
  const contextualSpecificity = contextualValues.reduce((sum, value) => sum + value, 0)
    / contextualValues.length;
  const declared: Array<{
    name: BaselineComponent["name"];
    raw_value: number;
    declared_weight: number;
    missing: boolean;
  }> = [
    { name: "required_facts", raw_value: values[6], declared_weight: 0.25, missing: values[7] === 1 },
    { name: "recovery", raw_value: values[8], declared_weight: 0.15, missing: values[9] === 1 },
    { name: "terminology", raw_value: values[10], declared_weight: 0.15, missing: values[11] === 1 },
    { name: "contextual_specificity", raw_value: contextualSpecificity, declared_weight: 0.15, missing: false },
    { name: "evidence", raw_value: values[16], declared_weight: 0.15, missing: values[17] === 1 },
    { name: "one_minus_generic", raw_value: 1 - values[18], declared_weight: 0.10, missing: false },
    { name: "one_minus_length", raw_value: 1 - values[19], declared_weight: 0.05, missing: values[20] === 1 },
  ];
  const applicable = declared.filter(({ missing }) => !missing);
  const weightSum = applicable.reduce((sum, component) => sum + component.declared_weight, 0);
  if (!Number.isFinite(contextualSpecificity) || !Number.isFinite(weightSum) || weightSum <= 0) {
    task4FailContract("numeric_nonfinite");
  }
  const applicable_components: BaselineCandidateScore["applicable_components"] = applicable.map((component) => {
    const normalized_weight = component.declared_weight / weightSum;
    const contribution = normalized_weight * component.raw_value;
    if (!Number.isFinite(normalized_weight) || !Number.isFinite(contribution)) task4FailContract("numeric_nonfinite");
    return {
      name: component.name,
      raw_value: component.raw_value,
      declared_weight: component.declared_weight,
      normalized_weight,
      contribution,
    };
  });
  const omitted_components = declared.filter(({ missing }) => missing).map(({ name }) => name) as BaselineCandidateScore["omitted_components"];
  const rawScore = applicable_components.reduce((sum, component) => sum + component.contribution, 0);
  if (!Number.isFinite(rawScore)) task4FailContract("numeric_nonfinite");
  const score = Math.min(1, Math.max(0, rawScore));
  const body = {
    candidate_ref: vector.candidate_ref,
    vector_ref: vectorRef(vector),
    baseline_ref: baselineRef(baseline),
    applicable_components,
    omitted_components,
    score,
  };
  return { ...body, score_digest: sha256Canonical(body) };
}

function sharedVectorBinding(left: CandidateFeatureVector, right: CandidateFeatureVector): boolean {
  return left.project_id === right.project_id
    && task4CanonicalEqual(left.feature_profile_ref, right.feature_profile_ref)
    && task4CanonicalEqual(left.context_ref, right.context_ref)
    && task4CanonicalEqual(left.target_scope_ref, right.target_scope_ref)
    && left.target_scope_role === right.target_scope_role
    && task4CanonicalEqual(left.feature_universe_ref, right.feature_universe_ref)
    && task4CanonicalEqual(left.checkpoint_set_ref, right.checkpoint_set_ref)
    && task4CanonicalEqual(left.runtime_profile_ref, right.runtime_profile_ref)
    && left.unicode_runtime_digest === right.unicode_runtime_digest;
}

interface BaselineReplayCandidate {
  vectorizationInput: CandidateVectorizationInput;
  vector: CandidateFeatureVector;
  replay: CandidateFeatureVector | null;
}

interface BaselineStageGraph {
  baselineInput: CreateBaselineInput;
  baseline: DeterministicBaseline;
  profile: FeatureProfile;
  candidates: BaselineReplayCandidate[];
}

function task4ThrownSuffix(error: unknown): string | null {
  if (!(error instanceof Error)) return null;
  const prefix = "task4_contract_invalid:";
  return error.message.startsWith(prefix) ? error.message.slice(prefix.length) : null;
}

function runBaselineStagePlan(
  suppliedRoot: unknown,
  graph: BaselineStageGraph,
): void {
  const supplied = suppliedRoot as Record<string, unknown>;
  const rawVectorInputs: unknown[] = Object.hasOwn(supplied, "vectorization_input")
    ? [supplied.vectorization_input]
    : Object.hasOwn(supplied, "candidate_a_vectorization_input")
      ? [supplied.candidate_a_vectorization_input, supplied.candidate_b_vectorization_input]
      : Array.isArray(supplied.candidates)
        ? supplied.candidates.map((candidate) => (candidate as Record<string, unknown>).vectorization_input)
        : [];
  const quarantinedCandidates = graph.candidates.map((_, index) =>
    task4HasQuarantinedExpressions(rawVectorInputs[index]));
  let replayedBaselineProfile!: FeatureProfile;
  task4RunStagePlan({
    canonical_value: () => { verifyBaselineCanonicalStage(graph.baseline); },
    producer_witness: () => {
      verifyBaselineInputProducerStage(graph.baselineInput);
      for (const candidate of graph.candidates) {
        verifyVectorInputProducerStage(candidate.vectorizationInput);
      }
    },
    unicode_runtime: () => {
      task4AssertUnicodeScalarGraph(suppliedRoot);
      verifyBaselineInputUnicodeStage(graph.baselineInput);
      for (const candidate of graph.candidates) {
        verifyVectorInputUnicodeStage(candidate.vectorizationInput);
      }
    },
    digest: () => {
      verifyBaselineDigestStage(graph.baseline);
      verifyBaselineInputDigestStage(graph.baselineInput);
      verifyFeatureProfileDigestStage(graph.profile);
      for (const candidate of graph.candidates) {
        verifyVectorInputDigestStage(candidate.vectorizationInput);
        verifyCandidateVectorDigestStage(candidate.vector);
      }
    },
    reference_binding: () => {
      task4VerifyProfileReferenceStage(graph.baselineInput.feature_profile_input);
      for (const candidate of graph.candidates) {
        task4VerifyVectorReferenceStage(candidate.vectorizationInput);
      }
    },
    scope_mismatch: () => {
      task4VerifyProfileScopeStage(graph.baselineInput.feature_profile_input);
      for (const candidate of graph.candidates) {
        task4VerifyVectorScopeStage(candidate.vectorizationInput);
      }
    },
    checkpoint_binding: () => {
      task4VerifyProfileCheckpointStage(graph.baselineInput.feature_profile_input);
      for (const candidate of graph.candidates) {
        task4VerifyVectorCheckpointStage(candidate.vectorizationInput);
      }
    },
    feature_profile_binding: () => {
      verifyFeatureProfileBindingStage(graph.baselineInput.feature_profile);
      verifyFeatureProfileBindingStage(graph.profile);
      replayedBaselineProfile = task4WithDeferredNumeric(() =>
        createFeatureProfile(graph.baselineInput.feature_profile_input));
      if (!task4CanonicalEqual(
        featureProfileNonProvenanceView(replayedBaselineProfile),
        featureProfileNonProvenanceView(graph.baselineInput.feature_profile),
      ) || !task4CanonicalEqual(
        featureProfileNonProvenanceView(graph.baselineInput.feature_profile),
        featureProfileNonProvenanceView(graph.profile),
      )) task4FailContract("feature_profile_binding");
      verifyBaselineProfileBinding(graph.baseline, graph.profile);
      for (const [candidateIndex, candidate] of graph.candidates.entries()) {
        const replayedProfile = task4CanonicalEqual(
          candidate.vectorizationInput.profile_input,
          graph.baselineInput.feature_profile_input,
        ) ? replayedBaselineProfile : task4WithDeferredNumeric(() =>
            createFeatureProfile(candidate.vectorizationInput.profile_input));
        task4VerifyVectorFeatureProfileStage(candidate.vectorizationInput, replayedProfile);
        if (!task4CanonicalEqual(
          featureProfileNonProvenanceView(candidate.vectorizationInput.profile),
          featureProfileNonProvenanceView(graph.profile),
        )) task4FailContract("feature_profile_binding");
        verifyCandidateVector(candidate.vector, graph.baseline, graph.profile);
        try {
          const replayInput = quarantinedCandidates[candidateIndex]
            ? { ...candidate.vectorizationInput, blocking_evidence: [] }
            : candidate.vectorizationInput;
          const result = task4WithDeferredNumeric(() => vectorizeCandidate(replayInput));
          if (result.status !== "eligible" || !task4CanonicalEqual(
            candidateVectorReplayView(
              result.vector,
              task4ContainsNonfinite(candidate.vectorizationInput),
            ),
            candidateVectorReplayView(
              candidate.vector,
              task4ContainsNonfinite(candidate.vectorizationInput),
            ),
          )) task4FailContract("feature_profile_binding");
          candidate.replay = result.vector;
        } catch (error) {
          const suffix = task4ThrownSuffix(error);
          if (!["provenance", "quarantined_expression_present", "forbidden_input_field", "numeric_nonfinite"]
            .includes(String(suffix))) throw error;
        }
      }
    },
    provenance: () => {
      verifyFeatureProfileProvenanceStage(graph.baselineInput.feature_profile);
      verifyFeatureProfileProvenanceStage(graph.profile);
      if (!task4CanonicalEqual(
        replayedBaselineProfile.provenance,
        graph.baselineInput.feature_profile.provenance,
      )) task4FailContract("provenance");
      verifyBaselineProvenanceStage(graph.baseline);
      for (const [candidateIndex, candidate] of graph.candidates.entries()) {
        verifyFeatureProfileProvenanceStage(candidate.vectorizationInput.profile);
        if (!task4CanonicalEqual(
          candidate.vectorizationInput.profile.provenance,
          graph.profile.provenance,
        )) task4FailContract("provenance");
        try {
          const replay = candidate.replay ?? task4WithDeferredNumeric(() => {
            const replayInput = quarantinedCandidates[candidateIndex]
              ? { ...candidate.vectorizationInput, blocking_evidence: [] }
              : candidate.vectorizationInput;
            const result = vectorizeCandidate(replayInput);
            return result.status === "eligible" ? result.vector : null;
          });
          if (replay === null
            || !task4CanonicalEqual(replay.provenance, candidate.vector.provenance)) {
            task4FailContract("provenance");
          }
          candidate.replay = replay;
        } catch (error) {
          const suffix = task4ThrownSuffix(error);
          if (!["quarantined_expression_present", "forbidden_input_field", "numeric_nonfinite"]
            .includes(String(suffix))) throw error;
        }
      }
    },
    quarantined_expression_present: () => {
      task4AssertNoQuarantinedExpressions(suppliedRoot);
    },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedRoot); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedRoot); },
  });
}

export function createDeterministicBaseline(input: CreateBaselineInput): DeterministicBaseline {
  task4TopLevelGate(input, CREATE_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightCreateBaselineInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : BASELINE_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  let producer!: ReturnType<typeof verifyTask4Producer>;
  let replayedProfile!: FeatureProfile;
  task4RunStagePlan({
    canonical_value: () => {},
    producer_witness: () => {
      producer = verifyTask4Producer(input.producer, "deterministic-baseline");
      verifyProfileInputProducerStage(input.feature_profile_input);
    },
    unicode_runtime: () => {
      task4AssertUnicodeScalarGraph(suppliedInput);
      verifyBaselineInputUnicodeStage(input);
    },
    digest: () => {
      verifyBaselineInputDigestStage(input);
      verifyFeatureProfileDigestStage(input.feature_profile);
    },
    reference_binding: () => { task4VerifyProfileReferenceStage(input.feature_profile_input); },
    scope_mismatch: () => { task4VerifyProfileScopeStage(input.feature_profile_input); },
    checkpoint_binding: () => { task4VerifyProfileCheckpointStage(input.feature_profile_input); },
    feature_profile_binding: () => {
      verifyFeatureProfileBindingStage(input.feature_profile);
      replayedProfile = task4WithDeferredNumeric(() => createFeatureProfile(input.feature_profile_input));
      if (!task4CanonicalEqual(
        featureProfileNonProvenanceView(replayedProfile),
        featureProfileNonProvenanceView(input.feature_profile),
      ) || !task4CanonicalEqual(
        input.runtime_profile.artifact_ref,
        input.feature_profile.payload.runtime_profile_ref,
      )) task4FailContract("feature_profile_binding");
    },
    provenance: () => {
      verifyFeatureProfileProvenanceStage(input.feature_profile);
      if (!task4CanonicalEqual(replayedProfile.provenance, input.feature_profile.provenance)) {
        task4FailContract("provenance");
      }
    },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedInput); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedInput); },
  });
  const profileRef = featureProfileRef(input.feature_profile);
  const runtimeRef = { ...input.runtime_profile.artifact_ref };
  const producerVerificationRef = producer.producer_verification_ref === null
    ? null
    : { ...producer.producer_verification_ref };
  const provenance = baselineProvenance(
    profileRef,
    runtimeRef,
    producerVerificationRef,
  );
  const identity = {
    contract_version: "contentmd.task4-deterministic-baseline/0.1.0" as const,
    record_mode: "development_fixture" as const,
    baseline_version: "expression-fit-baseline/0.1.0" as const,
    ranking_objective: "expression_preference" as const,
    candidate_kind: "expression" as const,
    project_id: input.feature_profile.scope.project_id!,
    feature_profile_ref: profileRef,
    components: baselineComponents(),
    contextual_specificity_projection: "mean_6_scope_matches_plus_applicable_entity_and_action" as const,
    missing_component_rule: "omit_and_renormalize" as const,
    pair_sigmoid_scale: 4 as const,
    probability_clip_lower: 0.000001 as const,
    probability_clip_upper: 0.999999 as const,
    tie_rule: "exact_score_tie_probability_0.5" as const,
    ordering_tie_break: "ascending_candidate_content_digest" as const,
    producer_manifest_digest: producer.producer_manifest_digest,
    producer_verification_ref: producerVerificationRef,
    runtime_profile_ref: runtimeRef,
    provenance,
    authority_effect: "none" as const,
  };
  const baseline_id = `deterministic-baseline.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, baseline_id };
  const baseline = task4Immutable({ ...withoutDigest, baseline_digest: sha256Canonical(withoutDigest) });
  if (cacheKey !== null) BASELINE_CACHE.set(cacheKey, baseline);
  return baseline;
}

export function scoreDeterministicBaseline(input: BaselineScoreInput): BaselineCandidateScore {
  task4TopLevelGate(input, SCORE_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightScoreInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : BASELINE_SCORE_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  runBaselineStagePlan(suppliedInput, {
    baselineInput: input.baseline_input,
    baseline: input.baseline,
    profile: input.feature_profile,
    candidates: [{
      vectorizationInput: input.vectorization_input,
      vector: input.vector,
      replay: null,
    }],
  });
  verifyBaselineInputProducerStage(input.baseline_input);
  verifyVectorInputProducerStage(input.vectorization_input);
  verifyBaselineInputUnicodeStage(input.baseline_input);
  verifyVectorInputUnicodeStage(input.vectorization_input);
  verifyBaselineDigestStage(input.baseline);
  verifyBaselineInputDigestStage(input.baseline_input);
  verifyFeatureProfileDigestStage(input.feature_profile);
  verifyVectorInputDigestStage(input.vectorization_input);
  verifyCandidateVectorDigestStage(input.vector);
  verifyBaseline(input.baseline);
  const replayedBaseline = task4WithDeferredNumeric(() => createDeterministicBaseline(input.baseline_input));
  if (!task4CanonicalEqual(replayedBaseline, input.baseline)
    || !task4CanonicalEqual(input.baseline_input.feature_profile, input.feature_profile)) {
    task4FailContract("feature_profile_binding");
  }
  verifyBaselineProfileBinding(input.baseline, input.feature_profile);
  const vector = replayVector(input.vectorization_input, input.vector, input.baseline, input.feature_profile);
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  const score = task4Immutable(scoreVector(vector, input.baseline));
  if (cacheKey !== null) BASELINE_SCORE_CACHE.set(cacheKey, score);
  return score;
}

export function compareDeterministicBaseline(input: BaselinePairInput): BaselinePairResult {
  task4TopLevelGate(input, PAIR_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightPairInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : BASELINE_PAIR_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  runBaselineStagePlan(suppliedInput, {
    baselineInput: input.baseline_input,
    baseline: input.baseline,
    profile: input.feature_profile,
    candidates: [
      {
        vectorizationInput: input.candidate_a_vectorization_input,
        vector: input.candidate_a,
        replay: null,
      },
      {
        vectorizationInput: input.candidate_b_vectorization_input,
        vector: input.candidate_b,
        replay: null,
      },
    ],
  });
  verifyBaselineInputProducerStage(input.baseline_input);
  verifyVectorInputProducerStage(input.candidate_a_vectorization_input);
  verifyVectorInputProducerStage(input.candidate_b_vectorization_input);
  verifyBaselineInputUnicodeStage(input.baseline_input);
  verifyVectorInputUnicodeStage(input.candidate_a_vectorization_input);
  verifyVectorInputUnicodeStage(input.candidate_b_vectorization_input);
  verifyBaselineDigestStage(input.baseline);
  verifyBaselineInputDigestStage(input.baseline_input);
  verifyFeatureProfileDigestStage(input.feature_profile);
  verifyVectorInputDigestStage(input.candidate_a_vectorization_input);
  verifyCandidateVectorDigestStage(input.candidate_a);
  verifyVectorInputDigestStage(input.candidate_b_vectorization_input);
  verifyCandidateVectorDigestStage(input.candidate_b);
  verifyBaseline(input.baseline);
  const replayedBaseline = task4WithDeferredNumeric(() => createDeterministicBaseline(input.baseline_input));
  if (!task4CanonicalEqual(replayedBaseline, input.baseline)
    || !task4CanonicalEqual(input.baseline_input.feature_profile, input.feature_profile)) {
    task4FailContract("feature_profile_binding");
  }
  verifyBaselineProfileBinding(input.baseline, input.feature_profile);
  const candidateA = replayVector(
    input.candidate_a_vectorization_input,
    input.candidate_a,
    input.baseline,
    input.feature_profile,
  );
  const candidateB = replayVector(
    input.candidate_b_vectorization_input,
    input.candidate_b,
    input.baseline,
    input.feature_profile,
  );
  if (task4CanonicalEqual(candidateA.candidate_ref, candidateB.candidate_ref)
    || task4CanonicalEqual(vectorRef(candidateA), vectorRef(candidateB))
    || !sharedVectorBinding(candidateA, candidateB)) task4FailContract("feature_profile_binding");
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  const scoreA = scoreVector(candidateA, input.baseline);
  const scoreB = scoreVector(candidateB, input.baseline);
  const score_difference = scoreA.score - scoreB.score;
  const magnitude = 1 / (1 + Math.exp(-input.baseline.pair_sigmoid_scale * Math.abs(score_difference)));
  let probability_a = score_difference > 0
    ? magnitude
    : score_difference < 0
      ? 1 - magnitude
      : 0.5;
  probability_a = Math.min(
    input.baseline.probability_clip_upper,
    Math.max(input.baseline.probability_clip_lower, probability_a),
  );
  const probability_b = 1 - probability_a;
  if (![score_difference, magnitude, probability_a, probability_b].every(Number.isFinite)) {
    task4FailContract("numeric_nonfinite");
  }
  const body = {
    baseline_ref: baselineRef(input.baseline),
    candidate_a_ref: candidateA.candidate_ref,
    candidate_b_ref: candidateB.candidate_ref,
    candidate_a_vector_ref: vectorRef(candidateA),
    candidate_b_vector_ref: vectorRef(candidateB),
    score_a: scoreA.score,
    score_b: scoreB.score,
    score_difference,
    probability_a,
    probability_b,
  };
  const pair = task4Immutable({ ...body, pair_digest: sha256Canonical(body) });
  if (cacheKey !== null) BASELINE_PAIR_CACHE.set(cacheKey, pair);
  return pair;
}

export function orderBaselineCandidates(input: BaselineOrderingInput): BaselineOrderedCandidate[] {
  task4TopLevelGate(input, ORDERING_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightOrderingInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : BASELINE_ORDERING_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  runBaselineStagePlan(suppliedInput, {
    baselineInput: input.baseline_input,
    baseline: input.baseline,
    profile: input.feature_profile,
    candidates: input.candidates.map((candidate) => ({
      vectorizationInput: candidate.vectorization_input,
      vector: candidate.vector,
      replay: null,
    })),
  });
  verifyBaselineInputProducerStage(input.baseline_input);
  for (const candidate of input.candidates) verifyVectorInputProducerStage(candidate.vectorization_input);
  verifyBaselineInputUnicodeStage(input.baseline_input);
  for (const candidate of input.candidates) verifyVectorInputUnicodeStage(candidate.vectorization_input);
  verifyBaselineDigestStage(input.baseline);
  verifyBaselineInputDigestStage(input.baseline_input);
  verifyFeatureProfileDigestStage(input.feature_profile);
  for (const candidate of input.candidates) {
    verifyVectorInputDigestStage(candidate.vectorization_input);
    verifyCandidateVectorDigestStage(candidate.vector);
  }
  verifyBaseline(input.baseline);
  const replayedBaseline = task4WithDeferredNumeric(() => createDeterministicBaseline(input.baseline_input));
  if (!task4CanonicalEqual(replayedBaseline, input.baseline)
    || !task4CanonicalEqual(input.baseline_input.feature_profile, input.feature_profile)) {
    task4FailContract("feature_profile_binding");
  }
  verifyBaselineProfileBinding(input.baseline, input.feature_profile);
  if (!Array.isArray(input.candidates) || input.candidates.length === 0) task4FailContract("canonical_value");
  const vectors = input.candidates.map((candidate) => {
    task4AssertExactKeys(candidate, ["vectorization_input", "vector"]);
    return replayVector(
      candidate.vectorization_input,
      candidate.vector,
      input.baseline,
      input.feature_profile,
    );
  });
  const first = vectors[0]!;
  const candidateKeys = new Set<string>();
  const vectorKeys = new Set<string>();
  const candidateDigests = new Set<string>();
  for (const vector of vectors) {
    const candidateKey = canonicalJson(vector.candidate_ref);
    const vectorKey = canonicalJson(vectorRef(vector));
    if (!sharedVectorBinding(first, vector)
      || candidateKeys.has(candidateKey) || vectorKeys.has(vectorKey)
      || candidateDigests.has(vector.candidate_ref.content_digest)) {
      task4FailContract("feature_profile_binding");
    }
    candidateKeys.add(candidateKey);
    vectorKeys.add(vectorKey);
    candidateDigests.add(vector.candidate_ref.content_digest);
  }
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  const rows = vectors.map((vector) => ({ vector, calculated: scoreVector(vector, input.baseline) }));
  rows.sort((left, right) => {
    if (left.calculated.score !== right.calculated.score) return right.calculated.score - left.calculated.score;
    const leftDigest = left.vector.candidate_ref.content_digest;
    const rightDigest = right.vector.candidate_ref.content_digest;
    return leftDigest < rightDigest ? -1 : 1;
  });
  const ordered = task4Immutable(rows.map(({ vector, calculated }, rank) => ({
    rank,
    candidate_ref: vector.candidate_ref,
    vector_ref: vectorRef(vector),
    score: calculated.score,
  })));
  if (cacheKey !== null) BASELINE_ORDERING_CACHE.set(cacheKey, ordered);
  return ordered;
}
