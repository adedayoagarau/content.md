import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type MemoryScope,
  type ProvenanceRef,
} from "@contentmd/core";
import { createHash } from "node:crypto";
import {
  task2PreflightCandidatePayload,
  task2PreflightContextPayload,
  task2PreflightSnapshot,
  task2PreflightTaskPayload,
  task2ValidateCandidateSnapshot,
  task2SnapshotRef,
  type CandidatePayload,
  type ContextPayload,
  type EvidenceSnapshot,
  type StableSetPayload,
} from "./qualification.js";
import {
  FEATURE_SOURCE_ROLES,
  task3CheckpointSetRef,
  task3PreflightCheckpointShape,
  task3RecordRef,
  verifyFeatureSourceCheckpointSet,
  type ExpressionFreeFeaturePayload,
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
  type StoreArtifactWitness,
} from "./leakage.js";
import {
  task4ArtifactRefKey,
  task4AssertNoQuarantinedExpressions,
  task4AssertUnicodeScalarGraph,
  task4AssertNoForbiddenInputFields,
  task4AssertArtifactRefShape,
  task4AssertCanonicalGraph,
  task4AssertFiniteNumbers,
  task4AssertDigestRefShape,
  task4AssertExactKeys,
  task4CanonicalCompare,
  task4CanonicalEqual,
  task4ContainsNonfinite,
  task4DigestRef,
  task4DigestRefKey,
  task4FailContract,
  task4GraphemeCount,
  task4CacheKey,
  task4Immutable,
  task4PreflightProducerShape,
  task4PreflightRawArtifactShape,
  task4PreflightUnicodeRuntimeShape,
  task4RefsEqual,
  task4RunStagePlan,
  task4Sha256Utf8,
  task4SortCanonical,
  task4SortScalar,
  task4TopLevelGate,
  task4WithDeferredNumeric,
  task4WithoutForbiddenInputFields,
  task4VerifyArtifactRef,
  task4VerifyDigestRef,
  task4WordTokens,
  verifyTask4Producer,
  verifyTask4UnicodeRuntime,
  Task4ContractError,
  type Task4AllowedSourceClass,
  type Task4ProducerArtifactWitness,
  type Task4ProvenanceRef,
  type Task4QuarantinedSourceClass,
  type Task4RecordMode,
  type Task4UnicodeRuntime,
} from "./retrieval.js";
import {
  LEARNING_SCHEMA_IDS,
  type ArtifactRef,
  type DigestRef,
  type ExemplarRecord,
  type FeatureDefinition,
  type FeatureProfile,
} from "./records.js";
import { task2IsRfc3339, type RawUtf8Artifact } from "./feedback.js";

export interface ScopeMaterial {
  contract_version: "contentmd.task4-scope-material/0.1.0";
  scope_material_id: string;
  scope_role: "target" | "candidate_origin";
  project_id: string;
  memory_scope: MemoryScope;
  product_area: string;
  journey_state: string;
  channel: string;
  locale: string;
  market: string;
  risk: string;
  source_class: Task4AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  material_digest: string;
}

export type ReferenceFeatureMaterialKind = "required_fact" | "recovery_action" | "supporting_evidence";
export type TextFeatureMaterialKind = "approved_terminology" | "context_entity" | "context_action";
export type FeatureMaterial = {
  contract_version: "contentmd.task4-feature-material/0.1.0";
  material_id: string;
  project_id: string;
  locale: string;
  source_class: Task4AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  authority_effect: "none";
  material_digest: string;
} & ({ material_kind: ReferenceFeatureMaterialKind; match_forms: [] }
  | { material_kind: TextFeatureMaterialKind; match_forms: [string, ...string[]] });

export interface FeatureContextBinding {
  context_ref: DigestRef;
  project_id: string;
  checkpoint_set_ref: DigestRef;
  target_scope_ref: DigestRef;
  target_scope_role: "target";
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  permitted_candidate_scope_refs: [DigestRef, ...DigestRef[]];
  feature_material_refs: DigestRef[];
  acceptance_criteria_refs: [DigestRef, ...DigestRef[]];
  candidate_rule_set_refs: [DigestRef, ...DigestRef[]];
  candidate_rule_set_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
}

export interface FeatureUniverseManifest {
  contract_version: "contentmd.task4-feature-universe-manifest/0.1.0";
  manifest_id: string;
  project_id: string;
  feature_profile_version: "rank-features/0.1.0";
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  context_bindings: [FeatureContextBinding, ...FeatureContextBinding[]];
  checkpoint_set_refs: [DigestRef, ...DigestRef[]];
  target_scope_refs: [DigestRef, ...DigestRef[]];
  permitted_candidate_scope_refs: [DigestRef, ...DigestRef[]];
  feature_material_refs: DigestRef[];
  generic_lexicon_ref: ArtifactRef;
  unicode_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
  acceptance_criteria_refs: [DigestRef, ...DigestRef[]];
  hard_rule_set_refs: [DigestRef, ...DigestRef[]];
  hard_rule_set_artifact_refs: [ArtifactRef, ...ArtifactRef[]];
  authority_effect: "none";
  manifest_digest: string;
}

export interface FeatureArtifactBinding {
  role:
    | "feature_universe"
    | "generic_lexicon"
    | "unicode_normalization"
    | "unicode_casefold"
    | "unicode_whitespace"
    | "unicode_word_break"
    | "unicode_grapheme_break"
    | "runtime_profile"
    | "hard_rule_set";
  artifact_ref: ArtifactRef;
}

export interface CreateFeatureProfileInput {
  record_mode: Task4RecordMode;
  project_id: string;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  feature_universe: FeatureUniverseManifest;
  feature_universe_artifact: RawUtf8Artifact;
  checkpoint_sets: [FeatureSourceCheckpointSet, ...FeatureSourceCheckpointSet[]];
  scope_material_sources: [ScopeMaterial, ...ScopeMaterial[]];
  feature_material_sources: FeatureMaterial[];
  hard_rule_sources: [{ candidate_rule_set: CandidateRuleSet; candidate_rule_set_artifact: RawUtf8Artifact }, ...Array<{
    candidate_rule_set: CandidateRuleSet;
    candidate_rule_set_artifact: RawUtf8Artifact;
  }>];
  generic_lexicon: RawUtf8Artifact;
  artifact_bindings: [FeatureArtifactBinding, ...FeatureArtifactBinding[]];
  runtime_profile_ref: ArtifactRef;
}

export interface CandidateRuleBase {
  rule_id: string;
  failure_class: "hard_rule" | "prohibited_claim";
}

export type CandidateRule =
  | (CandidateRuleBase & { rule_kind: "forbidden_token_sequence"; tokens: [string, ...string[]] })
  | (CandidateRuleBase & { rule_kind: "required_token_sequence"; failure_class: "hard_rule"; tokens: [string, ...string[]] })
  | (CandidateRuleBase & { rule_kind: "grapheme_count"; failure_class: "hard_rule"; minimum: number | null; maximum: number | null })
  | (CandidateRuleBase & { rule_kind: "required_source_ref"; failure_class: "hard_rule"; source_ref: DigestRef })
  | (CandidateRuleBase & { rule_kind: "forbidden_source_ref"; source_ref: DigestRef });

export interface CandidateRuleSet {
  contract_version: "contentmd.task4-candidate-rule-set/0.1.0";
  rule_set_id: string;
  project_id: string;
  locale: string;
  source_class: Task4AllowedSourceClass;
  rights_state: "training_permitted";
  source_refs: [DigestRef, ...DigestRef[]];
  rules: [CandidateRule, ...CandidateRule[]];
  rule_set_state: "current";
  authority_effect: "none";
  rule_set_digest: string;
}

export interface CandidateRuleFinding {
  rule_id: string;
  failure_class: "hard_rule" | "prohibited_claim";
}

export interface CandidateEligibilityGate {
  contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0";
  gate_id: string;
  candidate_ref: DigestRef;
  rule_set_ref: DigestRef;
  rule_set_artifact_ref: ArtifactRef;
  unicode_runtime_digest: string;
  findings: CandidateRuleFinding[];
  hard_rule_status: "pass" | "fail";
  prohibited_claim_status: "clear" | "hit";
  authority_effect: "none";
  gate_digest: string;
}

export interface CandidateRuleEvaluation {
  candidate_rule_set: CandidateRuleSet;
  candidate_rule_set_artifact: RawUtf8Artifact;
  eligibility_gate: CandidateEligibilityGate;
}

export interface CandidateVectorizationInput {
  record_mode: Task4RecordMode;
  producer: Task4ProducerArtifactWitness;
  unicode_runtime: Task4UnicodeRuntime;
  profile_input: CreateFeatureProfileInput;
  profile: FeatureProfile;
  feature_universe: FeatureUniverseManifest;
  feature_universe_artifact: RawUtf8Artifact;
  checkpoint_set: FeatureSourceCheckpointSet;
  scope_material_sources: [ScopeMaterial, ...ScopeMaterial[]];
  target_scope: ScopeMaterial;
  candidate_scope: ScopeMaterial;
  candidate: EvidenceSnapshot<"candidate", CandidatePayload>;
  materials: FeatureMaterial[];
  generic_lexicon: RawUtf8Artifact;
  acceptance_criteria_sources: [EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>, ...Array<EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>>];
  rule_evaluations: [CandidateRuleEvaluation, ...CandidateRuleEvaluation[]];
  blocking_evidence: Array<{
    candidate_ref: DigestRef;
    evidence_ref: DigestRef;
    source_class: Task4QuarantinedSourceClass;
    purpose: "feature_exclusion_only";
    contains_expression: false;
  }>;
}

export type CandidateFeatureExclusion =
  | "quarantined_source_class"
  | "hard_rule_failed"
  | "prohibited_claim_hit"
  | "empty_word_tokens";

const TASK4_FEATURE_ORDER_VALUE = [
  "project_match", "product_area_match", "journey_state_match", "channel_match", "locale_match", "risk_match",
  "required_fact_coverage", "required_fact_coverage_missing", "recovery_action_coverage", "recovery_action_coverage_missing",
  "approved_terminology_ratio", "approved_terminology_ratio_missing", "contextual_entity_coverage", "contextual_entity_coverage_missing",
  "contextual_action_coverage", "contextual_action_coverage_missing", "supporting_evidence_coverage",
  "supporting_evidence_coverage_missing", "generic_language_density", "length_distance", "length_distance_missing",
] as const;

export const TASK4_FEATURE_ORDER = Object.freeze(
  [...TASK4_FEATURE_ORDER_VALUE],
) as unknown as typeof TASK4_FEATURE_ORDER_VALUE;

export interface CandidateFeatureVector {
  contract_version: "contentmd.task4-candidate-feature-vector/0.1.0";
  vector_id: string;
  record_mode: "development_fixture";
  project_id: string;
  candidate_ref: DigestRef;
  context_ref: DigestRef;
  target_scope_ref: DigestRef;
  target_scope_role: "target";
  checkpoint_set_ref: DigestRef;
  feature_profile_ref: DigestRef;
  feature_universe_ref: DigestRef;
  runtime_profile_ref: ArtifactRef;
  unicode_runtime_digest: string;
  input_digest: string;
  feature_order: typeof TASK4_FEATURE_ORDER;
  values: [number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number, number];
  satisfied_material_refs: DigestRef[];
  grapheme_constraint_refs: DigestRef[];
  grapheme_count: number;
  token_count: number;
  provenance: [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
  authority_effect: "none";
  vector_digest: string;
}

export type CandidateFeatureResult =
  | { status: "eligible"; vector: CandidateFeatureVector }
  | { status: "ineligible"; candidate_ref: DigestRef; reason: CandidateFeatureExclusion; grapheme_constraint_refs: DigestRef[]; diagnostic_digest: string };

const PROFILE_KEYS = [
  "record_mode", "project_id", "producer", "unicode_runtime", "feature_universe", "feature_universe_artifact",
  "checkpoint_sets", "scope_material_sources", "feature_material_sources", "hard_rule_sources", "generic_lexicon",
  "artifact_bindings", "runtime_profile_ref",
] as const;
const VECTOR_KEYS = [
  "record_mode", "producer", "unicode_runtime", "profile_input", "profile", "feature_universe", "feature_universe_artifact",
  "checkpoint_set", "scope_material_sources", "target_scope", "candidate_scope", "candidate", "materials",
  "generic_lexicon", "acceptance_criteria_sources", "rule_evaluations", "blocking_evidence",
] as const;
const ALLOWED_SOURCE_CLASSES = ["project_owned", "project_owned_synthetic"] as const;
const FEATURE_ARTIFACT_BINDING_ROLES: readonly FeatureArtifactBinding["role"][] = [
  "feature_universe",
  "generic_lexicon",
  "unicode_normalization",
  "unicode_casefold",
  "unicode_whitespace",
  "unicode_word_break",
  "unicode_grapheme_break",
  "runtime_profile",
  "hard_rule_set",
];
const MEMORY_SCOPES: readonly MemoryScope[] = ["task", "personal", "project", "organization", "public"];
const QUARANTINED = ["browser_observed", "competitor", "third_party", "nonconforming", "unknown"] as const;
const FEATURE_PROFILE_CACHE = new Map<string, FeatureProfile>();
const CANDIDATE_VECTOR_CACHE = new Map<string, CandidateFeatureResult>();
const FORBIDDEN_INPUT_FIELDS = [
  "actor_identity", "author_identity", "protected_class", "inferred_emotion", "inferred_vulnerability",
  "presentation_side", "presentation_order", "provider_alternative_order", "decision", "post_decision_outcome",
  "browser_expression", "competitor_expression", "third_party_expression",
] as const;

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

const TASK4_RECORD_ID = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;

function text(value: unknown): asserts value is string {
  if (typeof value !== "string" || value.length === 0) task4FailContract("canonical_value");
}

function digest(value: unknown): asserts value is string {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) task4FailContract("digest");
}

function canonicalSet<T>(values: readonly T[], allowEmpty = true): void {
  if (!Array.isArray(values) || (!allowEmpty && values.length === 0)) task4FailContract("canonical_value");
  if (!task4CanonicalEqual(values, task4SortCanonical(values))
    || new Set(values.map((value) => canonicalJson(value))).size !== values.length) task4FailContract("canonical_value");
}

function digestRefSet(values: readonly DigestRef[], allowEmpty = true): void {
  canonicalSet(values, allowEmpty);
  values.forEach(task4VerifyDigestRef);
}

function artifactRefSet(values: readonly ArtifactRef[], allowEmpty = true): void {
  canonicalSet(values, allowEmpty);
  values.forEach(task4VerifyArtifactRef);
}

function auxiliaryRef(record_id: string, schema_id: string, content_digest: string): DigestRef {
  return { record_id, schema_id, schema_version: "0.1.0", content_digest };
}

function objectRef(value: ScopeMaterial | FeatureMaterial | FeatureUniverseManifest | CandidateRuleSet | CandidateEligibilityGate): DigestRef {
  if ("scope_material_id" in value) return auxiliaryRef(value.scope_material_id, "contentmd.task4-scope-material", value.material_digest);
  if ("material_id" in value) return auxiliaryRef(value.material_id, "contentmd.task4-feature-material", value.material_digest);
  if ("manifest_id" in value) return auxiliaryRef(value.manifest_id, "contentmd.task4-feature-universe-manifest", value.manifest_digest);
  if ("rule_set_id" in value) return auxiliaryRef(value.rule_set_id, "contentmd.task4-candidate-rule-set", value.rule_set_digest);
  return auxiliaryRef(value.gate_id, "contentmd.task4-candidate-eligibility-gate", value.gate_digest);
}

function rawArtifactRef(raw: RawUtf8Artifact, artifact_id: string): ArtifactRef {
  return { artifact_id, artifact_version: "0.1.0", artifact_digest: raw.raw_bytes_digest };
}

function assertRawArtifact(raw: RawUtf8Artifact): void {
  task4AssertExactKeys(raw, ["path", "bytes_utf8", "raw_bytes_digest"]);
  text(raw.path);
  if (typeof raw.bytes_utf8 !== "string") task4FailContract("canonical_value");
  digest(raw.raw_bytes_digest);
  if (raw.raw_bytes_digest !== task4Sha256Utf8(raw.bytes_utf8)) task4FailContract("digest");
}

function assertScopeMaterial(value: unknown): asserts value is ScopeMaterial {
  task4AssertExactKeys(value, [
    "contract_version", "scope_material_id", "scope_role", "project_id", "memory_scope", "product_area",
    "journey_state", "channel", "locale", "market", "risk", "source_class", "rights_state", "source_refs",
    "authority_effect", "material_digest",
  ]);
  const scope = value as unknown as ScopeMaterial;
  if (scope.contract_version !== "contentmd.task4-scope-material/0.1.0"
    || !["target", "candidate_origin"].includes(scope.scope_role)
    || !MEMORY_SCOPES.includes(scope.memory_scope)
    || !ALLOWED_SOURCE_CLASSES.includes(scope.source_class)
    || scope.rights_state !== "training_permitted"
    || scope.authority_effect !== "none") task4FailContract("canonical_value");
  for (const field of ["project_id", "product_area", "journey_state", "channel", "locale", "market", "risk"] as const) text(scope[field]);
  digestRefSet(scope.source_refs, false);
  const { scope_material_id: _id, material_digest: _digest, ...identity } = scope;
  const expectedId = `scope-material.${sha256Canonical(identity)}`;
  const { material_digest: _drop, ...content } = scope;
  if (scope.scope_material_id !== expectedId || scope.material_digest !== sha256Canonical(content)) task4FailContract("digest");
}

function assertFeatureMaterial(value: unknown): asserts value is FeatureMaterial {
  task4AssertExactKeys(value, [
    "contract_version", "material_id", "project_id", "locale", "source_class", "rights_state", "source_refs",
    "authority_effect", "material_digest", "material_kind", "match_forms",
  ]);
  const material = value as unknown as FeatureMaterial;
  if (material.contract_version !== "contentmd.task4-feature-material/0.1.0"
    || !ALLOWED_SOURCE_CLASSES.includes(material.source_class)
    || material.rights_state !== "training_permitted"
    || material.authority_effect !== "none") task4FailContract("canonical_value");
  text(material.project_id);
  text(material.locale);
  digestRefSet(material.source_refs, false);
  const referenceKinds = ["required_fact", "recovery_action", "supporting_evidence"];
  const textKinds = ["approved_terminology", "context_entity", "context_action"];
  if (referenceKinds.includes(material.material_kind)) {
    if (!Array.isArray(material.match_forms) || material.match_forms.length !== 0) task4FailContract("canonical_value");
  } else if (textKinds.includes(material.material_kind)) {
    if (!Array.isArray(material.match_forms) || material.match_forms.length === 0) task4FailContract("canonical_value");
    material.match_forms.forEach(text);
  } else task4FailContract("canonical_value");
  const { material_id: _id, material_digest: _digest, ...identity } = material;
  const expectedId = `feature-material.${sha256Canonical(identity)}`;
  const { material_digest: _drop, ...content } = material;
  if (material.material_id !== expectedId || material.material_digest !== sha256Canonical(content)) task4FailContract("digest");
}

function assertContextBinding(value: unknown): asserts value is FeatureContextBinding {
  task4AssertExactKeys(value, [
    "context_ref", "project_id", "checkpoint_set_ref", "target_scope_ref", "target_scope_role",
    "runtime_profile_ref", "unicode_runtime_digest", "permitted_candidate_scope_refs", "feature_material_refs",
    "acceptance_criteria_refs", "candidate_rule_set_refs", "candidate_rule_set_artifact_refs",
  ]);
  const binding = value as unknown as FeatureContextBinding;
  task4VerifyDigestRef(binding.context_ref);
  task4VerifyDigestRef(binding.checkpoint_set_ref);
  task4VerifyDigestRef(binding.target_scope_ref);
  task4VerifyArtifactRef(binding.runtime_profile_ref);
  digest(binding.unicode_runtime_digest);
  text(binding.project_id);
  if (binding.target_scope_role !== "target") task4FailContract("canonical_value");
  digestRefSet(binding.permitted_candidate_scope_refs, false);
  digestRefSet(binding.feature_material_refs);
  digestRefSet(binding.acceptance_criteria_refs, false);
  digestRefSet(binding.candidate_rule_set_refs, false);
  artifactRefSet(binding.candidate_rule_set_artifact_refs, false);
}

function unions<T>(arrays: readonly (readonly T[])[]): T[] {
  const unique = new Map<string, T>();
  arrays.flat().forEach((value) => unique.set(canonicalJson(value), value));
  return task4SortCanonical([...unique.values()]);
}

function featureUniverseRef(universe: FeatureUniverseManifest): DigestRef {
  return auxiliaryRef(universe.manifest_id, "contentmd.task4-feature-universe-manifest", universe.manifest_digest);
}

function universeArtifactRef(universe: FeatureUniverseManifest, raw: RawUtf8Artifact): ArtifactRef {
  return rawArtifactRef(raw, `contentmd.task4-feature-universe-manifest.${universe.manifest_digest}`);
}

function preflightCanonicalRefArray(
  value: unknown,
  kind: "digest" | "artifact",
  allowEmpty: boolean,
): void {
  if (!Array.isArray(value) || (!allowEmpty && value.length === 0)) task4FailContract("canonical_value");
  for (const item of value) {
    if (kind === "digest") task4AssertDigestRefShape(item);
    else task4AssertArtifactRefShape(item);
  }
  if (!task4CanonicalEqual(value, task4SortCanonical(value))
    || new Set(value.map(canonicalJson)).size !== value.length) task4FailContract("canonical_value");
}

function preflightCanonicalArray<T>(value: readonly T[], allowEmpty = true): void {
  if ((!allowEmpty && value.length === 0)
    || !task4CanonicalEqual(value, task4SortCanonical(value))
    || new Set(value.map(canonicalJson)).size !== value.length) task4FailContract("canonical_value");
}

function sortedArtifactBindings(values: readonly FeatureArtifactBinding[]): FeatureArtifactBinding[] {
  return [...values].sort((left, right) => left.role.localeCompare(right.role, "en")
    || task4CanonicalCompare(left.artifact_ref, right.artifact_ref));
}

function preflightContextBindingShape(value: unknown): void {
  task4AssertExactKeys(value, [
    "context_ref", "project_id", "checkpoint_set_ref", "target_scope_ref", "target_scope_role",
    "runtime_profile_ref", "unicode_runtime_digest", "permitted_candidate_scope_refs", "feature_material_refs",
    "acceptance_criteria_refs", "candidate_rule_set_refs", "candidate_rule_set_artifact_refs",
  ]);
  const binding = value as unknown as FeatureContextBinding;
  task4AssertDigestRefShape(binding.context_ref);
  task4AssertDigestRefShape(binding.checkpoint_set_ref);
  task4AssertDigestRefShape(binding.target_scope_ref);
  task4AssertArtifactRefShape(binding.runtime_profile_ref);
  text(binding.project_id);
  if (binding.target_scope_role !== "target" || typeof binding.unicode_runtime_digest !== "string") {
    task4FailContract("canonical_value");
  }
  preflightCanonicalRefArray(binding.permitted_candidate_scope_refs, "digest", false);
  preflightCanonicalRefArray(binding.feature_material_refs, "digest", true);
  preflightCanonicalRefArray(binding.acceptance_criteria_refs, "digest", false);
  preflightCanonicalRefArray(binding.candidate_rule_set_refs, "digest", false);
  preflightCanonicalRefArray(binding.candidate_rule_set_artifact_refs, "artifact", false);
}

function preflightFeatureUniverseShape(value: unknown): asserts value is FeatureUniverseManifest {
  task4AssertExactKeys(value, [
    "contract_version", "manifest_id", "project_id", "feature_profile_version", "runtime_profile_ref",
    "unicode_runtime_digest", "context_bindings", "checkpoint_set_refs", "target_scope_refs",
    "permitted_candidate_scope_refs", "feature_material_refs", "generic_lexicon_ref", "unicode_artifact_refs",
    "acceptance_criteria_refs", "hard_rule_set_refs", "hard_rule_set_artifact_refs", "authority_effect", "manifest_digest",
  ]);
  const universe = value as unknown as FeatureUniverseManifest;
  if (universe.contract_version !== "contentmd.task4-feature-universe-manifest/0.1.0"
    || universe.feature_profile_version !== "rank-features/0.1.0"
    || universe.authority_effect !== "none"
    || typeof universe.unicode_runtime_digest !== "string"
    || typeof universe.manifest_digest !== "string") task4FailContract("canonical_value");
  text(universe.manifest_id);
  text(universe.project_id);
  task4AssertArtifactRefShape(universe.runtime_profile_ref);
  task4AssertArtifactRefShape(universe.generic_lexicon_ref);
  if (!Array.isArray(universe.context_bindings) || universe.context_bindings.length === 0) {
    task4FailContract("canonical_value");
  }
  universe.context_bindings.forEach(preflightContextBindingShape);
  if (!task4CanonicalEqual(
    universe.context_bindings.map((binding) => binding.context_ref),
    task4SortCanonical(universe.context_bindings.map((binding) => binding.context_ref)),
  ) || new Set(universe.context_bindings.map((binding) => task4DigestRefKey(binding.context_ref))).size !== universe.context_bindings.length) {
    task4FailContract("canonical_value");
  }
  preflightCanonicalRefArray(universe.checkpoint_set_refs, "digest", false);
  preflightCanonicalRefArray(universe.target_scope_refs, "digest", false);
  preflightCanonicalRefArray(universe.permitted_candidate_scope_refs, "digest", false);
  preflightCanonicalRefArray(universe.feature_material_refs, "digest", true);
  preflightCanonicalRefArray(universe.unicode_artifact_refs, "artifact", false);
  preflightCanonicalRefArray(universe.acceptance_criteria_refs, "digest", false);
  preflightCanonicalRefArray(universe.hard_rule_set_refs, "digest", false);
  preflightCanonicalRefArray(universe.hard_rule_set_artifact_refs, "artifact", false);
}

function task4NumericSanitized(value: unknown): unknown {
  if (typeof value === "number") return Number.isFinite(value) ? value : 1;
  if (value === null || typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(task4NumericSanitized);
  return Object.fromEntries((Reflect.ownKeys(value) as string[]).map((key) => [
    key,
    task4NumericSanitized(Object.getOwnPropertyDescriptor(value, key)!.value),
  ]));
}

function task4MapExternalShape(action: () => void, nonfiniteValue?: unknown, retry?: (value: unknown) => void): void {
  try {
    action();
  } catch {
    if (nonfiniteValue !== undefined && retry !== undefined && task4ContainsNonfinite(nonfiniteValue)) {
      try {
        retry(task4NumericSanitized(nonfiniteValue));
        return;
      } catch {
        // A non-numeric canonical defect remains and keeps canonical precedence.
      }
    }
    task4FailContract("canonical_value");
  }
}

function preflightCheckpointShape(value: unknown): asserts value is FeatureSourceCheckpointSet {
  task4MapExternalShape(
    () => task3PreflightCheckpointShape(value),
    value,
    (sanitized) => task3PreflightCheckpointShape(sanitized),
  );
  const checkpoint = value as FeatureSourceCheckpointSet;
  if (checkpoint.contract_version !== "contentmd.feature-source-checkpoint-set/0.1.0"
    || checkpoint.record_mode !== "development_fixture"
    || typeof checkpoint.checkpoint_set_id !== "string"
    || typeof checkpoint.checkpoint_set_digest !== "string") task4FailContract("canonical_value");
  const binding = checkpoint.store_binding;
  if (binding.contract_version !== "contentmd.feature-store-binding/0.1.0"
    || !["sqlite_append_only_event_store", "synthetic_append_only_event_store"].includes(binding.store_kind)
    || typeof binding.instance_nonce_digest !== "string"
    || typeof binding.binding_digest !== "string") {
    task4FailContract("canonical_value");
  }
  for (const field of [binding.binding_id, binding.project_id, binding.store_instance_id]) text(field);
  for (const [artifact, expectedPath] of [
    [binding.store_schema, "fixtures/learning-ranking/feature-source-store-schema.json"],
    [binding.runtime_profile, "fixtures/learning-ranking/feature-source-runtime-profile.json"],
  ] as const) {
    text(artifact.path);
    if (artifact.path !== expectedPath
      || typeof artifact.bytes_utf8 !== "string" || typeof artifact.raw_bytes_digest !== "string") {
      task4FailContract("canonical_value");
    }
    task4AssertArtifactRefShape(artifact.artifact_ref);
  }
  const manifest = checkpoint.feature_source_manifest;
  if (manifest.contract_version !== "contentmd.feature-source-manifest/0.1.0"
    || !Array.isArray(manifest.entries) || manifest.entries.length === 0
    || typeof manifest.manifest_digest !== "string") task4FailContract("canonical_value");
  text(manifest.manifest_id);
  text(manifest.project_id);
  for (const entry of manifest.entries) {
    task4AssertDigestRefShape(entry.source_ref);
    if (!FEATURE_SOURCE_ROLES.includes(entry.source_role)
      || !ALLOWED_SOURCE_CLASSES.includes(entry.source_class)
      || entry.rights_state !== "training_permitted"
      || typeof entry.event_digest !== "string") task4FailContract("canonical_value");
    text(entry.stream_id);
    text(entry.event_id);
    if (typeof entry.sequence !== "number"
      || (Number.isFinite(entry.sequence) && (!Number.isSafeInteger(entry.sequence) || entry.sequence < 1))) {
      task4FailContract("canonical_value");
    }
    const event = entry.event;
    const eventPayload = event.payload as {
      contract_version: unknown;
      project_id: unknown;
      source_ref: unknown;
      source_role: unknown;
      source_class: unknown;
      rights_state: unknown;
    };
    if (event.schema_version !== "0.1.0" || event.event_type !== "feature_source_recorded"
      || event.data_class !== "learning_feature_source"
      || eventPayload.contract_version !== "contentmd.feature-source-append/0.1.0"
      || !(FEATURE_SOURCE_ROLES as readonly unknown[]).includes(eventPayload.source_role)
      || !(ALLOWED_SOURCE_CLASSES as readonly unknown[]).includes(eventPayload.source_class)
      || eventPayload.rights_state !== "training_permitted"
      || typeof event.event_digest !== "string"
      || (event.predecessor_digest !== null && typeof event.predecessor_digest !== "string")) {
      task4FailContract("canonical_value");
    }
    for (const field of [event.event_id, event.stream_id, event.actor_ref, eventPayload.project_id]) text(field);
    task4AssertDigestRefShape(eventPayload.source_ref);
    if (!task2IsRfc3339(event.occurred_at)) task4FailContract("canonical_value");
    if (typeof event.sequence !== "number"
      || (Number.isFinite(event.sequence) && (!Number.isSafeInteger(event.sequence) || event.sequence < 1))) {
      task4FailContract("canonical_value");
    }
    task4AssertDigestRefShape(entry.material.source_ref);
    if (entry.material.material_kind === "task2_evidence_snapshot") {
      const snapshot = entry.material.value;
      if (snapshot.snapshot_kind === "task") {
        task4MapExternalShape(
          () => task2PreflightSnapshot(snapshot, "task", task2PreflightTaskPayload),
          snapshot,
          (sanitized) => task2PreflightSnapshot(sanitized, "task", task2PreflightTaskPayload),
        );
      } else if (snapshot.snapshot_kind === "context") {
        task4MapExternalShape(
          () => task2PreflightSnapshot(snapshot, "context", task2PreflightContextPayload),
          snapshot,
          (sanitized) => task2PreflightSnapshot(sanitized, "context", task2PreflightContextPayload),
        );
      } else if (snapshot.snapshot_kind === "candidate") {
        task4MapExternalShape(
          () => task2PreflightSnapshot(snapshot, "candidate", task2PreflightCandidatePayload),
          snapshot,
          (sanitized) => task2PreflightSnapshot(sanitized, "candidate", task2PreflightCandidatePayload),
        );
      } else if (snapshot.snapshot_kind === "fact-set" || snapshot.snapshot_kind === "review-policy") {
        const payload = snapshot.payload as StableSetPayload;
        const preflight = (candidatePayload: Record<string, unknown>): void => {
            task4AssertExactKeys(candidatePayload, ["item_refs", "set_digest", "state"]);
            preflightCanonicalRefArray(candidatePayload.item_refs, "digest", false);
            if (typeof candidatePayload.set_digest !== "string"
              || !["current", "superseded", "revoked", "unknown"].includes(candidatePayload.state as string)) {
              task4FailContract("canonical_value");
            }
          };
        task4MapExternalShape(
          () => task2PreflightSnapshot(snapshot, snapshot.snapshot_kind, preflight),
          snapshot,
          (sanitized) => task2PreflightSnapshot(sanitized, snapshot.snapshot_kind, preflight),
        );
        if (!["current", "superseded", "revoked", "unknown"].includes(payload.state)
          || typeof payload.set_digest !== "string") {
          task4FailContract("canonical_value");
        }
        preflightCanonicalRefArray(payload.item_refs, "digest", false);
      } else if (["retrieval", "approved-pattern", "acceptance-criteria"].includes(snapshot.snapshot_kind)) {
        task4MapExternalShape(
          () => task2PreflightSnapshot(snapshot, snapshot.snapshot_kind, preflightExpressionFreePayload),
          snapshot,
          (sanitized) => task2PreflightSnapshot(sanitized, snapshot.snapshot_kind, preflightExpressionFreePayload),
        );
      }
      preflightCanonicalRefArray(snapshot.source_refs, "digest", false);
    } else if (entry.material.material_kind === "durable_record") {
      preflightExemplarRecordShape(entry.material.value);
    } else {
      task4FailContract("canonical_value");
    }
  }
  preflightCanonicalRefArray(manifest.entries.map((entry) => entry.source_ref), "digest", false);
  const manifestUniqueKeys = [
    manifest.entries.map((entry) => task4DigestRefKey(entry.material.source_ref)),
    manifest.entries.map((entry) => `${entry.stream_id}\0${entry.sequence}`),
    manifest.entries.map((entry) => entry.event_id),
  ];
  if (manifestUniqueKeys.some((keys) => new Set(keys).size !== keys.length)) {
    task4FailContract("canonical_value");
  }
  if (!Array.isArray(checkpoint.streams)
    || checkpoint.streams.length !== FEATURE_SOURCE_ROLES.length) {
    task4FailContract("canonical_value");
  }
  const streamIds = checkpoint.streams.map((stream) => stream.stream_id);
  const expectedStreamIds = task4SortScalar(FEATURE_SOURCE_ROLES.map((sourceRole) =>
    `feature-source-stream.${sha256Canonical({
      contract_version: "contentmd.feature-source-stream-identity/0.1.0",
      store_binding_digest: checkpoint.store_binding.binding_digest,
      project_id: checkpoint.store_binding.project_id,
      source_role: sourceRole,
    })}`));
  const hasExactDerivedStreamSet = streamIds.every((streamId) =>
    typeof streamId === "string" && expectedStreamIds.includes(streamId));
  if (streamIds.some((streamId) => typeof streamId !== "string")
    || new Set(streamIds).size !== streamIds.length
    || (hasExactDerivedStreamSet && !task4CanonicalEqual(streamIds, expectedStreamIds))) {
    task4FailContract("canonical_value");
  }
  for (const stream of checkpoint.streams) {
    text(stream.stream_id);
    if (typeof stream.maximum_sequence !== "number"
      || (Number.isFinite(stream.maximum_sequence)
        && (!Number.isSafeInteger(stream.maximum_sequence) || stream.maximum_sequence < 0))) {
      task4FailContract("canonical_value");
    }
    const receipt = stream.receipt;
    if (receipt.contract_version !== "contentmd.stream-checkpoint-receipt/0.1.0"
      || receipt.verification_method !== "complete-prefix-sha256-chain"
      || !task2IsRfc3339(receipt.verified_at)
      || typeof stream.prefix_digest !== "string"
      || (stream.head_event_id !== null && typeof stream.head_event_id !== "string")
      || (stream.head_event_digest !== null && typeof stream.head_event_digest !== "string")
      || typeof receipt.store_binding_digest !== "string"
      || typeof receipt.stream_id !== "string"
      || typeof receipt.maximum_sequence !== "number"
      || (Number.isFinite(receipt.maximum_sequence)
        && (!Number.isSafeInteger(receipt.maximum_sequence) || receipt.maximum_sequence < 0))
      || (receipt.head_event_id !== null && typeof receipt.head_event_id !== "string")
      || (receipt.head_event_digest !== null && typeof receipt.head_event_digest !== "string")
      || typeof receipt.prefix_digest !== "string"
      || typeof receipt.feature_source_manifest_digest !== "string"
      || typeof receipt.receipt_digest !== "string") task4FailContract("canonical_value");
    if (stream.head_event_id !== null) text(stream.head_event_id);
    if (receipt.head_event_id !== null) text(receipt.head_event_id);
    for (const event of stream.complete_prefix) {
      const eventPayload = event.payload as {
        contract_version: unknown;
        project_id: unknown;
        source_ref: unknown;
        source_role: unknown;
        source_class: unknown;
        rights_state: unknown;
      };
      if (event.schema_version !== "0.1.0" || event.event_type !== "feature_source_recorded"
        || event.data_class !== "learning_feature_source"
        || eventPayload.contract_version !== "contentmd.feature-source-append/0.1.0"
        || !(FEATURE_SOURCE_ROLES as readonly unknown[]).includes(eventPayload.source_role)
        || !(ALLOWED_SOURCE_CLASSES as readonly unknown[]).includes(eventPayload.source_class)
        || eventPayload.rights_state !== "training_permitted"
        || !task2IsRfc3339(event.occurred_at)
        || typeof event.event_digest !== "string"
        || (event.predecessor_digest !== null && typeof event.predecessor_digest !== "string")) {
        task4FailContract("canonical_value");
      }
      for (const field of [event.event_id, event.stream_id, event.actor_ref]) text(field);
      text(eventPayload.project_id);
      task4AssertDigestRefShape(eventPayload.source_ref);
      if (typeof event.sequence !== "number"
        || (Number.isFinite(event.sequence) && (!Number.isSafeInteger(event.sequence) || event.sequence < 1))) {
        task4FailContract("canonical_value");
      }
    }
    if (new Set(stream.complete_prefix.map((event) => event.event_id)).size
        !== stream.complete_prefix.length
      || new Set(stream.complete_prefix.map((event) => event.event_digest)).size
        !== stream.complete_prefix.length) {
      task4FailContract("canonical_value");
    }
  }
}

function preflightExemplarRecordShape(value: unknown): asserts value is ExemplarRecord {
  task4AssertExactKeys(value, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task4AssertExactKeys(value.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!MEMORY_SCOPES.includes(value.scope.memory_scope as MemoryScope)
    || (value.scope.project_id !== null && (typeof value.scope.project_id !== "string" || value.scope.project_id.length === 0))
    || !Array.isArray(value.scope.resource_refs) || !Array.isArray(value.scope.data_classes)
    || !Array.isArray(value.provenance) || value.provenance.length === 0) task4FailContract("canonical_value");
  value.scope.resource_refs.forEach(text);
  value.scope.data_classes.forEach(text);
  if (!task4CanonicalEqual(value.scope.resource_refs, task4SortScalar(value.scope.resource_refs))
    || new Set(value.scope.resource_refs).size !== value.scope.resource_refs.length
    || !task4CanonicalEqual(value.scope.data_classes, task4SortScalar(value.scope.data_classes))
    || new Set(value.scope.data_classes).size !== value.scope.data_classes.length) {
    task4FailContract("canonical_value");
  }
  for (const entry of value.provenance) {
    task4AssertExactKeys(entry, ["record_id", "relationship", "content_digest"]);
    if (typeof entry.record_id !== "string" || !TASK4_RECORD_ID.test(entry.record_id)) {
      task4FailContract("canonical_value");
    }
    text(entry.relationship);
    if (typeof entry.content_digest !== "string") task4FailContract("canonical_value");
  }
  preflightCanonicalArray(value.provenance, false);
  task4AssertExactKeys(value.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
    "code_digest", "input_digest", "authority_effect", "exemplar_kind", "subject_ref", "approval_ref",
    "applicability_scope_ref", "transfer_condition_refs", "prohibited_transfer", "rights_ref",
    "permission_ref", "currentness_state", "exemplar_state",
  ]);
  if (typeof value.record_id !== "string" || !TASK4_RECORD_ID.test(value.record_id)
    || value.schema_id !== LEARNING_SCHEMA_IDS.exemplar
    || value.schema_version !== "0.1.0"
    || typeof value.record_version !== "number"
    || (Number.isFinite(value.record_version) && value.record_version !== 1)
    || !( ["proposed", "approved", "active", "superseded", "retired", "rejected"] as readonly unknown[])
      .includes(value.lifecycle_state)
    || typeof value.content_digest !== "string"
    || value.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || value.payload.record_mode !== "development_fixture"
    || value.payload.ranking_objective !== "expression_preference"
    || value.payload.candidate_kind !== "expression"
    || value.payload.authority_effect !== "none"
    || !( ["expression", "mechanism"] as readonly unknown[]).includes(value.payload.exemplar_kind)
    || !( ["current", "expired", "revoked"] as readonly unknown[]).includes(value.payload.currentness_state)
    || !( ["approved_current", "expired", "revoked"] as readonly unknown[]).includes(value.payload.exemplar_state)) {
    task4FailContract("canonical_value");
  }
  for (const digestField of ["schema_digest", "code_digest", "input_digest"] as const) {
    if (typeof value.payload[digestField] !== "string") task4FailContract("canonical_value");
  }
  for (const ref of [
    value.payload.subject_ref,
    value.payload.approval_ref,
    value.payload.applicability_scope_ref,
    value.payload.rights_ref,
    value.payload.permission_ref,
  ]) task4AssertDigestRefShape(ref);
  preflightCanonicalRefArray(value.payload.transfer_condition_refs, "digest", false);
  text(value.payload.prohibited_transfer);
}

function preflightScopeMaterialShape(value: unknown): asserts value is ScopeMaterial {
  task4AssertExactKeys(value, [
    "contract_version", "scope_material_id", "scope_role", "project_id", "memory_scope", "product_area",
    "journey_state", "channel", "locale", "market", "risk", "source_class", "rights_state", "source_refs",
    "authority_effect", "material_digest",
  ]);
  const scope = value as unknown as ScopeMaterial;
  if (scope.contract_version !== "contentmd.task4-scope-material/0.1.0"
    || !["target", "candidate_origin"].includes(scope.scope_role)
    || !MEMORY_SCOPES.includes(scope.memory_scope)
    || !ALLOWED_SOURCE_CLASSES.includes(scope.source_class)
    || scope.rights_state !== "training_permitted"
    || scope.authority_effect !== "none") task4FailContract("canonical_value");
  for (const key of [
    "scope_material_id", "project_id", "product_area", "journey_state", "channel", "locale", "market", "risk",
  ] as const) text(scope[key]);
  if (typeof scope.material_digest !== "string") task4FailContract("canonical_value");
  preflightCanonicalRefArray(scope.source_refs, "digest", false);
}

function preflightFeatureMaterialShape(value: unknown): asserts value is FeatureMaterial {
  task4AssertExactKeys(value, [
    "contract_version", "material_id", "project_id", "locale", "source_class", "rights_state", "source_refs",
    "authority_effect", "material_digest", "material_kind", "match_forms",
  ]);
  const material = value as unknown as FeatureMaterial;
  if (material.contract_version !== "contentmd.task4-feature-material/0.1.0"
    || !ALLOWED_SOURCE_CLASSES.includes(material.source_class)
    || material.rights_state !== "training_permitted"
    || material.authority_effect !== "none"
    || ![
      "required_fact", "recovery_action", "supporting_evidence",
      "approved_terminology", "context_entity", "context_action",
    ].includes(material.material_kind)) task4FailContract("canonical_value");
  text(material.material_id);
  text(material.project_id);
  text(material.locale);
  if (typeof material.material_digest !== "string" || !Array.isArray(material.match_forms)) {
    task4FailContract("canonical_value");
  }
  material.match_forms.forEach(text);
  const referenceKinds = ["required_fact", "recovery_action", "supporting_evidence"];
  if ((referenceKinds.includes(material.material_kind) && material.match_forms.length !== 0)
    || (!referenceKinds.includes(material.material_kind) && material.match_forms.length === 0)) {
    task4FailContract("canonical_value");
  }
  preflightCanonicalRefArray(material.source_refs, "digest", false);
}

function preflightCandidateRuleShape(value: unknown): void {
  if (value === null || typeof value !== "object" || Array.isArray(value)) task4FailContract("canonical_value");
  const kind = Object.getOwnPropertyDescriptor(value, "rule_kind")?.value;
  const common = ["rule_id", "failure_class", "rule_kind"] as const;
  if (kind === "forbidden_token_sequence" || kind === "required_token_sequence") {
    task4AssertExactKeys(value, [...common, "tokens"]);
    const rule = value as unknown as Extract<CandidateRule, { rule_kind: "forbidden_token_sequence" | "required_token_sequence" }>;
    if (!Array.isArray(rule.tokens) || rule.tokens.length === 0) task4FailContract("canonical_value");
    rule.tokens.forEach(text);
  } else if (kind === "grapheme_count") {
    task4AssertExactKeys(value, [...common, "minimum", "maximum"]);
    const rule = value as unknown as Extract<CandidateRule, { rule_kind: "grapheme_count" }>;
    for (const bound of [rule.minimum, rule.maximum]) {
      if (bound !== null && typeof bound !== "number") task4FailContract("canonical_value");
      if (typeof bound === "number" && Number.isFinite(bound)
        && (!Number.isSafeInteger(bound) || bound < 0)) task4FailContract("canonical_value");
    }
  } else if (kind === "required_source_ref" || kind === "forbidden_source_ref") {
    task4AssertExactKeys(value, [...common, "source_ref"]);
    task4AssertDigestRefShape((value as unknown as { source_ref: DigestRef }).source_ref);
  } else task4FailContract("canonical_value");
  const rule = value as unknown as CandidateRule;
  text(rule.rule_id);
  if (!['hard_rule', 'prohibited_claim'].includes(rule.failure_class)) task4FailContract("canonical_value");
  if ((rule.rule_kind === "required_token_sequence" || rule.rule_kind === "required_source_ref")
    && rule.failure_class !== "hard_rule") {
    task4FailContract("canonical_value");
  }
  if (rule.rule_kind === "grapheme_count"
    && (rule.failure_class !== "hard_rule"
      || (rule.minimum === null && rule.maximum === null)
      || (rule.minimum !== null && rule.maximum !== null
        && Number.isFinite(rule.minimum) && Number.isFinite(rule.maximum)
        && rule.minimum > rule.maximum))) {
    task4FailContract("canonical_value");
  }
}

function preflightCandidateRuleSetShape(value: unknown): asserts value is CandidateRuleSet {
  task4AssertExactKeys(value, [
    "contract_version", "rule_set_id", "project_id", "locale", "source_class", "rights_state",
    "source_refs", "rules", "rule_set_state", "authority_effect", "rule_set_digest",
  ]);
  const set = value as unknown as CandidateRuleSet;
  if (set.contract_version !== "contentmd.task4-candidate-rule-set/0.1.0"
    || !ALLOWED_SOURCE_CLASSES.includes(set.source_class)
    || set.rights_state !== "training_permitted" || set.rule_set_state !== "current"
    || set.authority_effect !== "none" || !Array.isArray(set.rules) || set.rules.length === 0) {
    task4FailContract("canonical_value");
  }
  text(set.rule_set_id);
  text(set.project_id);
  text(set.locale);
  if (typeof set.rule_set_digest !== "string") task4FailContract("canonical_value");
  preflightCanonicalRefArray(set.source_refs, "digest", false);
  set.rules.forEach(preflightCandidateRuleShape);
  const ruleIds = set.rules.map((rule) => rule.rule_id);
  if (!task4CanonicalEqual(ruleIds, task4SortScalar(ruleIds))
    || new Set(ruleIds).size !== ruleIds.length) task4FailContract("canonical_value");
}

function preflightRuleSourceShape(value: unknown): void {
  task4AssertExactKeys(value, ["candidate_rule_set", "candidate_rule_set_artifact"]);
  preflightCandidateRuleSetShape(value.candidate_rule_set);
  task4PreflightRawArtifactShape(value.candidate_rule_set_artifact);
}

function preflightFeatureProfileShape(value: unknown): asserts value is FeatureProfile {
  task4AssertExactKeys(value, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task4AssertExactKeys(value.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!Array.isArray(value.scope.resource_refs) || !Array.isArray(value.scope.data_classes)
    || !Array.isArray(value.provenance)) task4FailContract("canonical_value");
  text(value.record_id);
  if (value.schema_id !== LEARNING_SCHEMA_IDS.featureProfile
    || value.schema_version !== "0.1.0"
    || typeof value.record_version !== "number"
    || (Number.isFinite(value.record_version) && value.record_version !== 1)
    || value.lifecycle_state !== "active"
    || value.scope.memory_scope !== "project") task4FailContract("canonical_value");
  text(value.scope.project_id);
  if (value.scope.resource_refs.length !== 1
    || !task4CanonicalEqual(value.scope.data_classes, ["learning_feature_profile"])) {
    task4FailContract("canonical_value");
  }
  value.scope.resource_refs.forEach(text);
  value.scope.data_classes.forEach(text);
  for (const entry of value.provenance) {
    task4AssertExactKeys(entry, ["record_id", "relationship", "content_digest"]);
    text(entry.record_id);
    text(entry.relationship);
    if (typeof entry.content_digest !== "string") task4FailContract("canonical_value");
  }
  task4AssertExactKeys(value.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest", "code_digest",
    "input_digest", "authority_effect", "feature_profile_version", "features", "source_artifact_refs",
    "forbidden_input_fields", "runtime_profile_ref", "profile_state",
  ]);
  if (!Array.isArray(value.payload.features) || !Array.isArray(value.payload.source_artifact_refs)
    || !Array.isArray(value.payload.forbidden_input_fields)) task4FailContract("canonical_value");
  if (value.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || value.payload.record_mode !== "development_fixture"
    || value.payload.ranking_objective !== "expression_preference"
    || value.payload.candidate_kind !== "expression"
    || value.payload.authority_effect !== "none"
    || value.payload.feature_profile_version !== "rank-features/0.1.0"
    || value.payload.profile_state !== "frozen") task4FailContract("canonical_value");
  for (const field of ["schema_digest", "code_digest", "input_digest"] as const) {
    if (typeof value.payload[field] !== "string") task4FailContract("canonical_value");
  }
  if (typeof value.content_digest !== "string") task4FailContract("canonical_value");
  for (const definition of value.payload.features) {
    task4AssertExactKeys(definition, [
      "name", "position", "value_type", "transformation", "nullable", "missing_indicator_name",
    ]);
    const typed = definition as unknown as FeatureDefinition;
    text(typed.name);
    text(typed.transformation);
    if (typeof typed.position !== "number"
      || (Number.isFinite(typed.position) && (!Number.isSafeInteger(typed.position) || typed.position < 0))
      || !["boolean", "number"].includes(typed.value_type)
      || typeof typed.nullable !== "boolean"
      || (typed.missing_indicator_name !== null
        && (typeof typed.missing_indicator_name !== "string" || typed.missing_indicator_name.length === 0))) {
      task4FailContract("canonical_value");
    }
  }
  preflightCanonicalRefArray(value.payload.source_artifact_refs, "artifact", false);
  value.payload.forbidden_input_fields.forEach(text);
  task4AssertArtifactRefShape(value.payload.runtime_profile_ref);
}

function preflightExpressionFreePayload(value: Record<string, unknown>): void {
  task4AssertExactKeys(value, [
    "contract_version", "feature_role", "project_id", "source_class", "rights_state",
    "permission_snapshot_ref", "eligibility_checks_snapshot_ref", "ordered_feature_refs", "constraint",
    "state", "content_form", "set_digest",
  ]);
  task4AssertDigestRefShape(value.permission_snapshot_ref);
  task4AssertDigestRefShape(value.eligibility_checks_snapshot_ref);
  if (value.contract_version !== "contentmd.expression-free-feature/0.1.0"
    || !["retrieval_snapshot", "approved_pattern", "acceptance_criteria"].includes(value.feature_role as string)
    || !ALLOWED_SOURCE_CLASSES.includes(value.source_class as Task4AllowedSourceClass)
    || value.rights_state !== "training_permitted"
    || value.state !== "current"
    || value.content_form !== "expression_free_ref_and_numeric_metadata") task4FailContract("canonical_value");
  text(value.project_id);
  if (typeof value.set_digest !== "string") task4FailContract("canonical_value");
  preflightCanonicalRefArray(value.ordered_feature_refs, "digest", false);
  if (value.constraint === null || typeof value.constraint !== "object" || Array.isArray(value.constraint)) {
    task4FailContract("canonical_value");
  }
  const kind = Object.getOwnPropertyDescriptor(value.constraint, "constraint_kind")?.value;
  if (kind === "none") task4AssertExactKeys(value.constraint, ["constraint_kind"]);
  else if (kind === "grapheme_count") {
    task4AssertExactKeys(value.constraint, ["constraint_kind", "minimum", "maximum"]);
    const constraint = value.constraint as { minimum: unknown; maximum: unknown };
    for (const bound of [constraint.minimum, constraint.maximum]) {
      if (bound !== null && typeof bound !== "number") task4FailContract("canonical_value");
      if (typeof bound === "number" && Number.isFinite(bound)
        && (!Number.isSafeInteger(bound) || bound < 0)) task4FailContract("canonical_value");
    }
    if ((constraint.minimum === null && constraint.maximum === null)
      || (typeof constraint.minimum === "number" && typeof constraint.maximum === "number"
        && Number.isFinite(constraint.minimum) && Number.isFinite(constraint.maximum)
        && constraint.minimum > constraint.maximum)) task4FailContract("canonical_value");
  } else task4FailContract("canonical_value");
}

function preflightEligibilityGateShape(value: unknown): asserts value is CandidateEligibilityGate {
  task4AssertExactKeys(value, [
    "contract_version", "gate_id", "candidate_ref", "rule_set_ref", "rule_set_artifact_ref",
    "unicode_runtime_digest", "findings", "hard_rule_status", "prohibited_claim_status", "authority_effect", "gate_digest",
  ]);
  const gate = value as unknown as CandidateEligibilityGate;
  task4AssertDigestRefShape(gate.candidate_ref);
  task4AssertDigestRefShape(gate.rule_set_ref);
  task4AssertArtifactRefShape(gate.rule_set_artifact_ref);
  if (gate.contract_version !== "contentmd.task4-candidate-eligibility-gate/0.1.0"
    || typeof gate.gate_id !== "string"
    || typeof gate.unicode_runtime_digest !== "string"
    || !["pass", "fail"].includes(gate.hard_rule_status)
    || !["clear", "hit"].includes(gate.prohibited_claim_status)
    || gate.authority_effect !== "none"
    || typeof gate.gate_digest !== "string"
    || !Array.isArray(gate.findings)) task4FailContract("canonical_value");
  for (const finding of gate.findings) {
    task4AssertExactKeys(finding, ["rule_id", "failure_class"]);
    text(finding.rule_id);
    if (!['hard_rule', 'prohibited_claim'].includes(finding.failure_class)) task4FailContract("canonical_value");
  }
  const findingIds = gate.findings.map((finding) => finding.rule_id);
  if (!task4CanonicalEqual(findingIds, task4SortScalar(findingIds))
    || new Set(findingIds).size !== findingIds.length) task4FailContract("canonical_value");
}

function preflightProfileInputShape(value: unknown): asserts value is CreateFeatureProfileInput {
  task4AssertExactKeys(value, PROFILE_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  text(value.project_id);
  task4PreflightProducerShape(value.producer);
  task4PreflightUnicodeRuntimeShape(value.unicode_runtime);
  preflightFeatureUniverseShape(value.feature_universe);
  task4PreflightRawArtifactShape(value.feature_universe_artifact);
  if (!Array.isArray(value.checkpoint_sets) || value.checkpoint_sets.length === 0
    || !Array.isArray(value.scope_material_sources) || value.scope_material_sources.length === 0
    || !Array.isArray(value.feature_material_sources)
    || !Array.isArray(value.hard_rule_sources) || value.hard_rule_sources.length === 0
    || !Array.isArray(value.artifact_bindings) || value.artifact_bindings.length === 0) {
    task4FailContract("canonical_value");
  }
  value.checkpoint_sets.forEach(preflightCheckpointShape);
  value.scope_material_sources.forEach(preflightScopeMaterialShape);
  value.feature_material_sources.forEach(preflightFeatureMaterialShape);
  value.hard_rule_sources.forEach(preflightRuleSourceShape);
  const ruleRefs = value.hard_rule_sources.map(({ candidate_rule_set }) => objectRef(candidate_rule_set));
  if (!task4CanonicalEqual(ruleRefs, task4SortCanonical(ruleRefs))
    || new Set(ruleRefs.map(task4DigestRefKey)).size !== ruleRefs.length) {
    task4FailContract("canonical_value");
  }
  // The canonical checkpoint set is a projection of the independently finite
  // checkpoint refs. A nonfinite value elsewhere in a checkpoint must not hide
  // duplicate or noncanonical checkpoint membership.
  preflightCanonicalArray(value.checkpoint_sets.map(task3CheckpointSetRef), false);
  preflightCanonicalArray(value.scope_material_sources.map(objectRef), false);
  preflightCanonicalArray(value.feature_material_sources.map(objectRef));
  task4PreflightRawArtifactShape(value.generic_lexicon);
  preflightGenericLexicon(value.generic_lexicon);
  for (const binding of value.artifact_bindings) {
    task4AssertExactKeys(binding, ["role", "artifact_ref"]);
    const typed = binding as unknown as FeatureArtifactBinding;
    if (!FEATURE_ARTIFACT_BINDING_ROLES.includes(typed.role)) task4FailContract("canonical_value");
    task4AssertArtifactRefShape(typed.artifact_ref);
  }
  if (!task4CanonicalEqual(value.artifact_bindings, sortedArtifactBindings(value.artifact_bindings))
    || new Set(value.artifact_bindings.map(canonicalJson)).size !== value.artifact_bindings.length) {
    task4FailContract("canonical_value");
  }
  task4AssertArtifactRefShape(value.runtime_profile_ref);
}

function preflightVectorInputShape(value: unknown): asserts value is CandidateVectorizationInput {
  task4AssertExactKeys(value, VECTOR_KEYS);
  if (value.record_mode !== "development_fixture") task4FailContract("canonical_value");
  task4PreflightProducerShape(value.producer);
  task4PreflightUnicodeRuntimeShape(value.unicode_runtime);
  preflightProfileInputShape(value.profile_input);
  preflightFeatureProfileShape(value.profile);
  preflightFeatureUniverseShape(value.feature_universe);
  task4PreflightRawArtifactShape(value.feature_universe_artifact);
  preflightCheckpointShape(value.checkpoint_set);
  if (!Array.isArray(value.scope_material_sources) || value.scope_material_sources.length === 0
    || !Array.isArray(value.materials) || !Array.isArray(value.acceptance_criteria_sources)
    || value.acceptance_criteria_sources.length === 0 || !Array.isArray(value.rule_evaluations)
    || value.rule_evaluations.length === 0 || !Array.isArray(value.blocking_evidence)) {
    task4FailContract("canonical_value");
  }
  value.scope_material_sources.forEach(preflightScopeMaterialShape);
  preflightScopeMaterialShape(value.target_scope);
  preflightScopeMaterialShape(value.candidate_scope);
  task4MapExternalShape(
    () => task2PreflightSnapshot(value.candidate, "candidate", task2PreflightCandidatePayload),
    value.candidate,
    (sanitized) => task2PreflightSnapshot(sanitized, "candidate", task2PreflightCandidatePayload),
  );
  value.materials.forEach(preflightFeatureMaterialShape);
  task4PreflightRawArtifactShape(value.generic_lexicon);
  preflightGenericLexicon(value.generic_lexicon);
  for (const snapshot of value.acceptance_criteria_sources) {
    task4MapExternalShape(
      () => task2PreflightSnapshot(snapshot, "acceptance-criteria", preflightExpressionFreePayload),
      snapshot,
      (sanitized) => task2PreflightSnapshot(sanitized, "acceptance-criteria", preflightExpressionFreePayload),
    );
  }
  preflightCanonicalArray(value.scope_material_sources.map(objectRef), false);
  preflightCanonicalArray(value.materials.map(objectRef));
  preflightCanonicalArray(value.acceptance_criteria_sources.map(task2SnapshotRef), false);
  for (const evaluation of value.rule_evaluations) {
    task4AssertExactKeys(evaluation, ["candidate_rule_set", "candidate_rule_set_artifact", "eligibility_gate"]);
    preflightCandidateRuleSetShape(evaluation.candidate_rule_set);
    task4PreflightRawArtifactShape(evaluation.candidate_rule_set_artifact);
    preflightEligibilityGateShape(evaluation.eligibility_gate);
  }
  preflightCanonicalArray(value.rule_evaluations.map((evaluation) => objectRef(evaluation.candidate_rule_set)), false);
  for (const evidence of value.blocking_evidence) {
    const baseKeys = ["candidate_ref", "evidence_ref", "source_class", "purpose", "contains_expression"] as const;
    const actual = Reflect.ownKeys(evidence);
    const deferredExpressionKeys = new Set(["expression", "expression_digest"]);
    if (actual.some((key) => typeof key !== "string"
      || (!baseKeys.includes(key as typeof baseKeys[number]) && !deferredExpressionKeys.has(key)))) {
      task4FailContract("canonical_value");
    }
    for (const key of baseKeys) {
      if (!actual.includes(key)) task4FailContract("canonical_value");
    }
    task4AssertDigestRefShape(evidence.candidate_ref);
    task4AssertDigestRefShape(evidence.evidence_ref);
    if (!QUARANTINED.includes(evidence.source_class)
      || evidence.purpose !== "feature_exclusion_only"
      || evidence.contains_expression !== false) task4FailContract("canonical_value");
  }
  const blockingEvidenceBase = value.blocking_evidence.map((evidence) => ({
    candidate_ref: evidence.candidate_ref,
    evidence_ref: evidence.evidence_ref,
    source_class: evidence.source_class,
    purpose: evidence.purpose,
    contains_expression: evidence.contains_expression,
  }));
  if (!task4CanonicalEqual(blockingEvidenceBase, task4SortCanonical(blockingEvidenceBase))
    || new Set(blockingEvidenceBase.map(canonicalJson)).size !== blockingEvidenceBase.length) {
    task4FailContract("canonical_value");
  }
}

/** Internal Task 4 staging seams; they are intentionally absent from the package-root exports. */
export function task4PreflightFeatureProfileInputShape(value: unknown): asserts value is CreateFeatureProfileInput {
  preflightProfileInputShape(task4WithoutForbiddenInputFields(value));
}

export function task4PreflightVectorizationInputShape(value: unknown): asserts value is CandidateVectorizationInput {
  preflightVectorInputShape(task4WithoutForbiddenInputFields(value));
}

export function task4PreflightFeatureProfileRecordShape(value: unknown): asserts value is FeatureProfile {
  preflightFeatureProfileShape(task4WithoutForbiddenInputFields(value));
}

type Task4DigestNode = Record<string, unknown>;

function task4DigestNodeValue(node: Task4DigestNode, key: string): unknown {
  const descriptor = Object.getOwnPropertyDescriptor(node, key);
  if (descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) {
    task4FailContract("canonical_value");
  }
  return descriptor.value;
}

function task4DigestGraphNodes(value: unknown): Task4DigestNode[] {
  // This is deliberately descriptor-only. Public boundaries have already run the
  // complete shape pass, but the digest dispatcher remains safe when called on
  // an independently supplied graph.
  task4AssertCanonicalGraph(value);
  const nodes: Task4DigestNode[] = [];
  const seen = new Set<object>();
  const visit = (current: unknown): void => {
    if (current === null || typeof current !== "object" || seen.has(current)) return;
    seen.add(current);
    if (Array.isArray(current)) {
      for (let index = 0; index < current.length; index += 1) {
        visit(Object.getOwnPropertyDescriptor(current, String(index))!.value);
      }
      return;
    }
    const node = current as Task4DigestNode;
    for (const key of (Reflect.ownKeys(node) as string[]).sort((left, right) => left.localeCompare(right, "en"))) {
      visit(task4DigestNodeValue(node, key));
    }
    nodes.push(node);
  };
  visit(value);
  return nodes;
}

function task4DigestNodeWithout(node: Task4DigestNode, omitted: readonly string[]): Task4DigestNode {
  const result: Task4DigestNode = {};
  const omittedSet = new Set(omitted);
  for (const key of Reflect.ownKeys(node)) {
    if (typeof key === "string" && !omittedSet.has(key)) result[key] = task4DigestNodeValue(node, key);
  }
  return result;
}

function task4RequireDigest(value: unknown): asserts value is string {
  if (typeof value !== "string" || !/^[a-f0-9]{64}$/.test(value)) task4FailContract("digest");
}

function task4DigestGraphContainsNonfinite(value: unknown, seen = new Set<object>()): boolean {
  if (typeof value === "number") return !Number.isFinite(value);
  if (value === null || typeof value !== "object" || seen.has(value)) return false;
  seen.add(value);
  if (Array.isArray(value)) {
    return value.some((_, index) => task4DigestGraphContainsNonfinite(
      Object.getOwnPropertyDescriptor(value, String(index))!.value,
      seen,
    ));
  }
  return (Reflect.ownKeys(value) as string[]).some((key) => task4DigestGraphContainsNonfinite(
    task4DigestNodeValue(value as Task4DigestNode, key),
    seen,
  ));
}

function task4IsBlockingEvidenceNode(node: Task4DigestNode): boolean {
  return ["candidate_ref", "evidence_ref", "source_class", "purpose", "contains_expression"]
    .every((key) => Object.hasOwn(node, key));
}

function task4VerifyTwoStageDigest(
  node: Task4DigestNode,
  idKey: string,
  digestKey: string,
  prefix: string,
): void {
  const identity = task4DigestNodeWithout(node, [idKey, digestKey]);
  const expectedId = `${prefix}.${sha256Canonical(identity)}`;
  const content = task4DigestNodeWithout(node, [digestKey]);
  if (task4DigestNodeValue(node, idKey) !== expectedId
    || task4DigestNodeValue(node, digestKey) !== sha256Canonical(content)) task4FailContract("digest");
}

function task4VerifyTask2SnapshotDigest(node: Task4DigestNode): void {
  const preimage = {
    contract_version: task4DigestNodeValue(node, "contract_version"),
    snapshot_id: task4DigestNodeValue(node, "snapshot_id"),
    snapshot_kind: task4DigestNodeValue(node, "snapshot_kind"),
    snapshot_version: task4DigestNodeValue(node, "snapshot_version"),
    captured_at: task4DigestNodeValue(node, "captured_at"),
    source_refs: task4DigestNodeValue(node, "source_refs"),
    payload: task4DigestNodeValue(node, "payload"),
  };
  if (task4DigestGraphContainsNonfinite(preimage)) return;
  if (task4DigestNodeValue(node, "snapshot_digest") !== sha256Canonical(preimage)) {
    task4FailContract("digest");
  }
}

function task4VerifyStoreBindingDigestNode(binding: Task4DigestNode): void {
  const expectedNonce = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id: task4DigestNodeValue(binding, "store_instance_id"),
    store_kind: task4DigestNodeValue(binding, "store_kind"),
    project_id: task4DigestNodeValue(binding, "project_id"),
  });
  const identity = task4DigestNodeWithout(binding, ["binding_id", "binding_digest"]);
  if (task4DigestNodeValue(binding, "instance_nonce_digest") !== expectedNonce
    || task4DigestNodeValue(binding, "binding_id")
      !== `feature-store-binding.${sha256Canonical(identity)}`
    || task4DigestNodeValue(binding, "binding_digest")
      !== sha256Canonical(task4DigestNodeWithout(binding, ["binding_digest"]))) {
    task4FailContract("digest");
  }
}

function task4VerifyCheckpointIndependentIdentityClaims(node: Task4DigestNode): void {
  const binding = task4DigestNodeValue(node, "store_binding") as Task4DigestNode;
  const bindingDigest = task4DigestNodeValue(binding, "binding_digest");
  const projectId = task4DigestNodeValue(binding, "project_id");
  const streamRoles = new Map(FEATURE_SOURCE_ROLES.map((sourceRole) => [
    `feature-source-stream.${sha256Canonical({
      contract_version: "contentmd.feature-source-stream-identity/0.1.0",
      store_binding_digest: bindingDigest,
      project_id: projectId,
      source_role: sourceRole,
    })}`,
    sourceRole,
  ]));
  const verifyEventIdentity = (event: Task4DigestNode, expectedStreamId?: unknown): void => {
    const payload = task4DigestNodeValue(event, "payload") as Task4DigestNode;
    const sourceRole = task4DigestNodeValue(payload, "source_role");
    const derivedStreamId = `feature-source-stream.${sha256Canonical({
      contract_version: "contentmd.feature-source-stream-identity/0.1.0",
      store_binding_digest: bindingDigest,
      project_id: projectId,
      source_role: sourceRole,
    })}`;
    const streamId = task4DigestNodeValue(event, "stream_id");
    const expectedEventId = `feature-source-recorded.${sha256Canonical({
      contract_version: "contentmd.feature-source-event-identity/0.1.0",
      store_binding_digest: bindingDigest,
      stream_id: derivedStreamId,
      source_ref: task4DigestNodeValue(payload, "source_ref"),
      source_role: sourceRole,
      source_class: task4DigestNodeValue(payload, "source_class"),
      rights_state: "training_permitted",
    })}`;
    if (!streamRoles.has(derivedStreamId)
      || streamId !== derivedStreamId
      || (expectedStreamId !== undefined && streamId !== expectedStreamId)
      || task4DigestNodeValue(event, "event_id") !== expectedEventId) {
      task4FailContract("digest");
    }
  };

  const manifest = task4DigestNodeValue(node, "feature_source_manifest") as Task4DigestNode;
  for (const entry of task4DigestNodeValue(manifest, "entries") as Task4DigestNode[]) {
    verifyEventIdentity(task4DigestNodeValue(entry, "event") as Task4DigestNode);
  }
  for (const stream of task4DigestNodeValue(node, "streams") as Task4DigestNode[]) {
    const streamId = task4DigestNodeValue(stream, "stream_id");
    if (typeof streamId !== "string" || !streamRoles.has(streamId)) task4FailContract("digest");
    for (const event of task4DigestNodeValue(stream, "complete_prefix") as Task4DigestNode[]) {
      verifyEventIdentity(event, streamId);
    }
  }
}

function task4VerifyCheckpointDigestTree(node: Task4DigestNode): void {
  task4VerifyCheckpointIndependentIdentityClaims(node);
  const binding = task4DigestNodeValue(node, "store_binding") as Task4DigestNode;
  const bindingIdentity = task4DigestNodeWithout(binding, ["binding_id", "binding_digest"]);
  const expectedNonce = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id: task4DigestNodeValue(binding, "store_instance_id"),
    store_kind: task4DigestNodeValue(binding, "store_kind"),
    project_id: task4DigestNodeValue(binding, "project_id"),
  });
  if (task4DigestNodeValue(binding, "instance_nonce_digest") !== expectedNonce
    || task4DigestNodeValue(binding, "binding_id") !== `feature-store-binding.${sha256Canonical(bindingIdentity)}`
    || task4DigestNodeValue(binding, "binding_digest")
      !== sha256Canonical(task4DigestNodeWithout(binding, ["binding_digest"]))) task4FailContract("digest");

  const bindingDigest = task4DigestNodeValue(binding, "binding_digest");
  const projectId = task4DigestNodeValue(binding, "project_id");
  const manifest = task4DigestNodeValue(node, "feature_source_manifest") as Task4DigestNode;
  const entries = task4DigestNodeValue(manifest, "entries") as Task4DigestNode[];
  for (const entry of entries) {
    const event = task4DigestNodeValue(entry, "event") as Task4DigestNode;
    const payload = task4DigestNodeValue(event, "payload") as Task4DigestNode;
    if (task4DigestNodeValue(event, "event_digest")
      !== sha256Canonical(task4DigestNodeWithout(event, ["event_digest"]))) task4FailContract("digest");
    const expectedStreamId = `feature-source-stream.${sha256Canonical({
      contract_version: "contentmd.feature-source-stream-identity/0.1.0",
      store_binding_digest: bindingDigest,
      project_id: projectId,
      source_role: task4DigestNodeValue(payload, "source_role"),
    })}`;
    const expectedEventId = `feature-source-recorded.${sha256Canonical({
      contract_version: "contentmd.feature-source-event-identity/0.1.0",
      store_binding_digest: bindingDigest,
      stream_id: expectedStreamId,
      source_ref: task4DigestNodeValue(payload, "source_ref"),
      source_role: task4DigestNodeValue(payload, "source_role"),
      source_class: task4DigestNodeValue(payload, "source_class"),
      rights_state: "training_permitted",
    })}`;
    if (task4DigestNodeValue(event, "stream_id") !== expectedStreamId
      || task4DigestNodeValue(event, "event_id") !== expectedEventId) task4FailContract("digest");
  }
  const manifestIdentity = {
    contract_version: task4DigestNodeValue(manifest, "contract_version"),
    project_id: task4DigestNodeValue(manifest, "project_id"),
    entries,
  };
  if (task4DigestNodeValue(manifest, "manifest_id")
      !== `feature-source-manifest.${sha256Canonical(manifestIdentity)}`
    || task4DigestNodeValue(manifest, "manifest_digest")
      !== sha256Canonical(task4DigestNodeWithout(manifest, ["manifest_digest"]))) task4FailContract("digest");

  const streams = task4DigestNodeValue(node, "streams") as Task4DigestNode[];
  const streamRoles = new Map(FEATURE_SOURCE_ROLES.map((source_role) => [
    `feature-source-stream.${sha256Canonical({
      contract_version: "contentmd.feature-source-stream-identity/0.1.0",
      store_binding_digest: bindingDigest,
      project_id: projectId,
      source_role,
    })}`,
    source_role,
  ]));
  for (const stream of streams) {
    const streamId = task4DigestNodeValue(stream, "stream_id");
    const sourceRole = typeof streamId === "string" ? streamRoles.get(streamId) : undefined;
    if (typeof streamId !== "string" || sourceRole === undefined) task4FailContract("digest");
    const prefix = task4DigestNodeValue(stream, "complete_prefix") as Task4DigestNode[];
    for (const event of prefix) {
      if (task4DigestNodeValue(event, "event_digest")
        !== sha256Canonical(task4DigestNodeWithout(event, ["event_digest"]))) task4FailContract("digest");
      const payload = task4DigestNodeValue(event, "payload") as Task4DigestNode;
      const expectedEventId = `feature-source-recorded.${sha256Canonical({
        contract_version: "contentmd.feature-source-event-identity/0.1.0",
        store_binding_digest: bindingDigest,
        stream_id: streamId,
        source_ref: task4DigestNodeValue(payload, "source_ref"),
        source_role: sourceRole,
        source_class: task4DigestNodeValue(payload, "source_class"),
        rights_state: "training_permitted",
      })}`;
      if (task4DigestNodeValue(event, "stream_id") !== streamId
        || task4DigestNodeValue(event, "event_id") !== expectedEventId) task4FailContract("digest");
    }
    const expectedPrefix = sha256Canonical({
      contract_version: "contentmd.feature-source-prefix/0.1.0",
      stream_id: streamId,
      maximum_sequence: task4DigestNodeValue(stream, "maximum_sequence"),
      complete_prefix: prefix,
    });
    if (task4DigestNodeValue(stream, "prefix_digest") !== expectedPrefix) task4FailContract("digest");
    const receipt = task4DigestNodeValue(stream, "receipt") as Task4DigestNode;
    if (task4DigestNodeValue(receipt, "receipt_digest")
      !== sha256Canonical(task4DigestNodeWithout(receipt, ["receipt_digest"]))) task4FailContract("digest");
  }
  const checkpointIdentity = {
    contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
    record_mode: task4DigestNodeValue(node, "record_mode"),
    store_binding: binding,
    feature_source_manifest: manifest,
    streams,
  };
  if (task4DigestNodeValue(node, "checkpoint_set_id")
      !== `feature-source-checkpoint-set.${sha256Canonical(checkpointIdentity)}`
    || task4DigestNodeValue(node, "checkpoint_set_digest")
      !== sha256Canonical(task4DigestNodeWithout(node, ["checkpoint_set_digest"]))) task4FailContract("digest");
}

/**
 * Internal category-stage verifier. It validates every independently claimed
 * Task 2/3/4 digest reachable from a supplied Task 4 construction graph before
 * reference, replay, binding, or provenance validation begins.
 */
export function task4VerifyCompleteDigestGraph(value: unknown): void {
  const nodes = task4DigestGraphNodes(value);

  // Syntax is one global pass so a shallow semantic/replay fault cannot mask a
  // deeper malformed digest.
  for (const node of nodes) {
    const quarantinedExpressionCarrier = task4IsBlockingEvidenceNode(node);
    for (const key of Reflect.ownKeys(node)) {
      if (typeof key !== "string" || (!key.endsWith("_digest") && key !== "content_digest")) continue;
      if (quarantinedExpressionCarrier && key === "expression_digest") continue;
      const field = task4DigestNodeValue(node, key);
      if (field !== null) task4RequireDigest(field);
    }
  }

  for (const node of nodes) {
    const contractVersion = Object.hasOwn(node, "contract_version")
      ? task4DigestNodeValue(node, "contract_version")
      : undefined;

    if ((Reflect.ownKeys(node).length === 3 || Reflect.ownKeys(node).length === 4)
      && Object.hasOwn(node, "path") && Object.hasOwn(node, "bytes_utf8")
      && Object.hasOwn(node, "raw_bytes_digest")
      && (Reflect.ownKeys(node).length === 3 || Object.hasOwn(node, "artifact_ref"))) {
      const bytes = task4DigestNodeValue(node, "bytes_utf8");
      if (typeof bytes !== "string"
        || task4DigestNodeValue(node, "raw_bytes_digest") !== task4Sha256Utf8(bytes)) task4FailContract("digest");
      if (Reflect.ownKeys(node).length === 4) {
        const artifactRef = task4DigestNodeValue(node, "artifact_ref") as Task4DigestNode;
        const expectedArtifactId = task4DigestNodeValue(node, "path")
          === "fixtures/learning-ranking/feature-source-store-schema.json"
          ? "contentmd.feature-source-store-schema"
          : task4DigestNodeValue(node, "path")
              === "fixtures/learning-ranking/feature-source-runtime-profile.json"
            ? "contentmd.feature-source-runtime-profile"
            : null;
        if (expectedArtifactId !== null
          && (task4DigestNodeValue(artifactRef, "artifact_id") !== expectedArtifactId
            || task4DigestNodeValue(artifactRef, "artifact_version") !== "0.1.0"
            || task4DigestNodeValue(artifactRef, "artifact_digest")
              !== task4DigestNodeValue(node, "raw_bytes_digest"))) {
          task4FailContract("digest");
        }
      }
    }

    if (contractVersion === "contentmd.task2-evidence-snapshot/0.1.0") {
      task4VerifyTask2SnapshotDigest(node);
    }
    if (Object.hasOwn(node, "schema_id")
      && task4DigestNodeValue(node, "schema_id") === LEARNING_SCHEMA_IDS.featureProfile) {
      const scope = task4DigestNodeValue(node, "scope") as Task4DigestNode;
      const payload = task4DigestNodeValue(node, "payload") as Task4DigestNode;
      if (task4DigestNodeValue(node, "record_id") !== `feature-profile.${sha256Canonical({
        contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
        project_id: task4DigestNodeValue(scope, "project_id"),
        input_digest: task4DigestNodeValue(payload, "input_digest"),
      })}`) task4FailContract("digest");
    }
    if (contractVersion === "contentmd.feature-source-checkpoint-set/0.1.0") {
      task4VerifyCheckpointIndependentIdentityClaims(node);
    }

    // Canonical JSON has no representation for nonfinite numbers. Defer every
    // digest equation whose own preimage contains one; independent finite
    // sibling nodes are still checked, and the public numeric stage reports the
    // dedicated code after producer/Unicode/digest work.
    if (task4DigestGraphContainsNonfinite(node)) continue;

    if (Object.hasOwn(node, "record_version") && Object.hasOwn(node, "content_digest")
      && Object.hasOwn(node, "scope") && Object.hasOwn(node, "payload")) {
      try {
        if (verifyRecordDigest(node as never).valid !== true) task4FailContract("digest");
      } catch (error) {
        if (error instanceof Task4ContractError) throw error;
        task4FailContract("digest");
      }
      if (task4DigestNodeValue(node, "schema_id") === LEARNING_SCHEMA_IDS.featureProfile) {
        const scope = task4DigestNodeValue(node, "scope") as Task4DigestNode;
        const payload = task4DigestNodeValue(node, "payload") as Task4DigestNode;
        if (task4DigestNodeValue(node, "record_id") !== `feature-profile.${sha256Canonical({
          contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
          project_id: task4DigestNodeValue(scope, "project_id"),
          input_digest: task4DigestNodeValue(payload, "input_digest"),
        })}`) task4FailContract("digest");
      }
    }

    if (contractVersion === "contentmd.task2-evidence-snapshot/0.1.0") {
      task4VerifyTask2SnapshotDigest(node);
    } else if (contractVersion === "contentmd.feature-store-binding/0.1.0") {
      task4VerifyStoreBindingDigestNode(node);
    } else if (contractVersion === "contentmd.feature-source-manifest/0.1.0") {
      const manifestIdentity = {
        contract_version: contractVersion,
        project_id: task4DigestNodeValue(node, "project_id"),
        entries: task4DigestNodeValue(node, "entries"),
      };
      if (task4DigestNodeValue(node, "manifest_id")
          !== `feature-source-manifest.${sha256Canonical(manifestIdentity)}`
        || task4DigestNodeValue(node, "manifest_digest")
          !== sha256Canonical(task4DigestNodeWithout(node, ["manifest_digest"]))) {
        task4FailContract("digest");
      }
    } else if (contractVersion === "contentmd.task4-feature-universe-manifest/0.1.0") {
      task4VerifyTwoStageDigest(node, "manifest_id", "manifest_digest", "feature-universe-manifest");
    } else if (contractVersion === "contentmd.task4-scope-material/0.1.0") {
      task4VerifyTwoStageDigest(node, "scope_material_id", "material_digest", "scope-material");
    } else if (contractVersion === "contentmd.task4-feature-material/0.1.0") {
      task4VerifyTwoStageDigest(node, "material_id", "material_digest", "feature-material");
    } else if (contractVersion === "contentmd.task4-candidate-rule-set/0.1.0") {
      task4VerifyTwoStageDigest(node, "rule_set_id", "rule_set_digest", "candidate-rule-set");
    } else if (contractVersion === "contentmd.task4-candidate-eligibility-gate/0.1.0") {
      task4VerifyTwoStageDigest(node, "gate_id", "gate_digest", "candidate-eligibility-gate");
    } else if (contractVersion === "contentmd.feature-source-checkpoint-set/0.1.0") {
      task4VerifyCheckpointDigestTree(node);
    } else if (contractVersion === "contentmd.task4-candidate-feature-vector/0.1.0") {
      const body = task4DigestNodeWithout(node, ["contract_version", "vector_id", "vector_digest"]);
      if (task4DigestNodeValue(node, "vector_id") !== `candidate-feature-vector.${sha256Canonical({
        contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
        ...body,
      })}` || task4DigestNodeValue(node, "vector_digest")
        !== sha256Canonical(task4DigestNodeWithout(node, ["vector_digest"]))) task4FailContract("digest");
    } else if (contractVersion === "contentmd.task4-deterministic-baseline/0.1.0") {
      task4VerifyTwoStageDigest(node, "baseline_id", "baseline_digest", "deterministic-baseline");
    } else if (contractVersion === "contentmd.expression-free-feature/0.1.0") {
      const setPreimage = task4DigestNodeWithout(node, ["set_digest"]);
      if (task4DigestNodeValue(node, "set_digest") !== sha256Canonical({
        contract_version: "contentmd.expression-free-feature-set/0.1.0",
        ...task4DigestNodeWithout(setPreimage, ["contract_version"]),
      })) task4FailContract("digest");
    }

    if (Object.hasOwn(node, "item_refs") && Object.hasOwn(node, "set_digest")
      && Object.hasOwn(node, "state")) {
      if (task4DigestNodeValue(node, "set_digest") !== sha256Canonical({
        contract_version: "contentmd.task2-stable-set/0.1.0",
        item_refs: task4DigestNodeValue(node, "item_refs"),
      })) task4FailContract("digest");
    }
    if (Object.hasOwn(node, "expression") && Object.hasOwn(node, "expression_digest")
      && !task4IsBlockingEvidenceNode(node)) {
      const expression = task4DigestNodeValue(node, "expression");
      if (typeof expression !== "string"
        || task4DigestNodeValue(node, "expression_digest") !== task4Sha256Utf8(expression)) task4FailContract("digest");
    }
    if (Object.hasOwn(node, "event_type") && Object.hasOwn(node, "event_digest")) {
      if (task4DigestNodeValue(node, "event_digest")
        !== sha256Canonical(task4DigestNodeWithout(node, ["event_digest"]))) task4FailContract("digest");
    }
    if (Object.hasOwn(node, "prefix_digest") && Object.hasOwn(node, "complete_prefix")) {
      if (task4DigestNodeValue(node, "prefix_digest") !== sha256Canonical({
        contract_version: "contentmd.feature-source-prefix/0.1.0",
        stream_id: task4DigestNodeValue(node, "stream_id"),
        maximum_sequence: task4DigestNodeValue(node, "maximum_sequence"),
        complete_prefix: task4DigestNodeValue(node, "complete_prefix"),
      })) task4FailContract("digest");
    }
    if (contractVersion === "contentmd.stream-checkpoint-receipt/0.1.0") {
      if (task4DigestNodeValue(node, "receipt_digest")
        !== sha256Canonical(task4DigestNodeWithout(node, ["receipt_digest"]))) task4FailContract("digest");
    }
  }
}

function assertFeatureUniverse(value: unknown): asserts value is FeatureUniverseManifest {
  preflightFeatureUniverseShape(value);
  const universe = value;
  task4VerifyArtifactRef(universe.runtime_profile_ref);
  task4VerifyArtifactRef(universe.generic_lexicon_ref);
  digest(universe.unicode_runtime_digest);
  universe.context_bindings.forEach(assertContextBinding);
  digestRefSet(universe.checkpoint_set_refs, false);
  digestRefSet(universe.target_scope_refs, false);
  digestRefSet(universe.permitted_candidate_scope_refs, false);
  digestRefSet(universe.feature_material_refs);
  artifactRefSet(universe.unicode_artifact_refs, false);
  digestRefSet(universe.acceptance_criteria_refs, false);
  digestRefSet(universe.hard_rule_set_refs, false);
  artifactRefSet(universe.hard_rule_set_artifact_refs, false);
  const expected = {
    checkpoint_set_refs: unions(universe.context_bindings.map((binding) => [binding.checkpoint_set_ref])),
    target_scope_refs: unions(universe.context_bindings.map((binding) => [binding.target_scope_ref])),
    permitted_candidate_scope_refs: unions(universe.context_bindings.map((binding) => binding.permitted_candidate_scope_refs)),
    feature_material_refs: unions(universe.context_bindings.map((binding) => binding.feature_material_refs)),
    acceptance_criteria_refs: unions(universe.context_bindings.map((binding) => binding.acceptance_criteria_refs)),
    hard_rule_set_refs: unions(universe.context_bindings.map((binding) => binding.candidate_rule_set_refs)),
    hard_rule_set_artifact_refs: unions(universe.context_bindings.map((binding) => binding.candidate_rule_set_artifact_refs)),
  };
  for (const [key, expectedValue] of Object.entries(expected)) {
    if (!task4CanonicalEqual(universe[key as keyof typeof expected], expectedValue)) task4FailContract("checkpoint_binding");
  }
  if (universe.context_bindings.some((binding) => binding.project_id !== universe.project_id
    || !task4CanonicalEqual(binding.runtime_profile_ref, universe.runtime_profile_ref)
    || binding.unicode_runtime_digest !== universe.unicode_runtime_digest)) task4FailContract("scope_mismatch");
  const { manifest_id: _id, manifest_digest: _digest, ...identity } = universe;
  const { manifest_digest: _drop, ...content } = universe;
  if (universe.manifest_id !== `feature-universe-manifest.${sha256Canonical(identity)}`
    || universe.manifest_digest !== sha256Canonical(content)) task4FailContract("digest");
}

function verifyUniverseArtifact(universe: FeatureUniverseManifest, raw: RawUtf8Artifact): ArtifactRef {
  assertRawArtifact(raw);
  if (raw.bytes_utf8 !== canonicalJson(universe)) task4FailContract("reference_binding");
  return universeArtifactRef(universe, raw);
}

interface GenericLexicon {
  authority_effect: "none";
  contract_version: "contentmd.generic-language-lexicon/0.1.0";
  entries: Array<{ entry_id: string; tokens: [string, ...string[]] }>;
  locale: string;
  rights_state: "training_permitted";
  source_class: "project_owned_synthetic";
}

const TASK4_GENERIC_LEXICON: GenericLexicon = {
  authority_effect: "none",
  contract_version: "contentmd.generic-language-lexicon/0.1.0",
  entries: [
    { entry_id: "generic.all_in_one", tokens: ["all", "in", "one"] },
    { entry_id: "generic.empower_your_journey", tokens: ["empower", "your", "journey"] },
    { entry_id: "generic.game_changer", tokens: ["game", "changer"] },
    { entry_id: "generic.next_level", tokens: ["next", "level"] },
    { entry_id: "generic.seamless_experience", tokens: ["seamless", "experience"] },
    { entry_id: "generic.unlock_possibilities", tokens: ["unlock", "possibilities"] },
  ],
  locale: "en",
  rights_state: "training_permitted",
  source_class: "project_owned_synthetic",
};
const TASK4_GENERIC_LEXICON_BYTES = canonicalJson(TASK4_GENERIC_LEXICON);

function preflightGenericLexicon(raw: RawUtf8Artifact): GenericLexicon {
  let value: GenericLexicon;
  try {
    value = JSON.parse(raw.bytes_utf8) as GenericLexicon;
  } catch {
    task4FailContract("canonical_value");
  }
  task4AssertExactKeys(value, ["authority_effect", "contract_version", "entries", "locale", "rights_state", "source_class"]);
  if (value.authority_effect !== "none"
    || value.contract_version !== "contentmd.generic-language-lexicon/0.1.0"
    || value.rights_state !== "training_permitted"
    || value.source_class !== "project_owned_synthetic"
    || !Array.isArray(value.entries)
    || value.entries.length === 0) task4FailContract("canonical_value");
  text(value.locale);
  for (const entry of value.entries) {
    task4AssertExactKeys(entry, ["entry_id", "tokens"]);
    text(entry.entry_id);
    if (!Array.isArray(entry.tokens) || entry.tokens.length === 0) task4FailContract("canonical_value");
    entry.tokens.forEach(text);
  }
  const entryIds = value.entries.map((entry) => entry.entry_id);
  const tokenSequences = value.entries.map((entry) => canonicalJson(entry.tokens));
  if (!task4CanonicalEqual(entryIds, task4SortScalar(entryIds))
    || new Set(entryIds).size !== entryIds.length
    || new Set(tokenSequences).size !== tokenSequences.length
    || raw.bytes_utf8 !== canonicalJson(value)) task4FailContract("canonical_value");
  return value;
}

function verifyLexiconUnicodeStage(raw: RawUtf8Artifact, runtime: Task4UnicodeRuntime): void {
  if (raw.bytes_utf8 === TASK4_GENERIC_LEXICON_BYTES) return;
  const value = preflightGenericLexicon(raw);
  for (const entry of value.entries) {
    task4WordTokens(entry.entry_id, runtime);
    const normalized = entry.tokens.flatMap((token) => task4WordTokens(token, runtime));
    if (!task4CanonicalEqual(normalized, entry.tokens)) task4FailContract("unicode_runtime");
  }
}

function verifyRuleSetUnicodeStage(set: CandidateRuleSet, runtime: Task4UnicodeRuntime): void {
  for (const rule of set.rules) {
    task4WordTokens(rule.rule_id, runtime);
    if (rule.rule_kind !== "forbidden_token_sequence" && rule.rule_kind !== "required_token_sequence") continue;
    const normalized = rule.tokens.flatMap((token) => task4WordTokens(token, runtime));
    if (!task4CanonicalEqual(normalized, rule.tokens)) task4FailContract("unicode_runtime");
  }
}

function verifyFeatureMaterialsUnicodeStage(
  materials: readonly FeatureMaterial[],
  runtime: Task4UnicodeRuntime,
): void {
  for (const material of materials) {
    if (material.match_forms.length === 0) continue;
    const normalized = material.match_forms.map((form) => task4WordTokens(form, runtime));
    if (normalized.some((tokens) => tokens.length === 0)
      || new Set(normalized.map(canonicalJson)).size !== normalized.length) {
      task4FailContract("unicode_runtime");
    }
  }
}

function verifyLexicon(raw: RawUtf8Artifact, runtime: Task4UnicodeRuntime): { value: GenericLexicon; ref: ArtifactRef } {
  assertRawArtifact(raw);
  if (raw.path !== "fixtures/learning-ranking/generic-language-lexicon.json") task4FailContract("reference_binding");
  const value = preflightGenericLexicon(raw);
  if (value.authority_effect !== "none" || value.contract_version !== "contentmd.generic-language-lexicon/0.1.0"
    || value.rights_state !== "training_permitted" || value.source_class !== "project_owned_synthetic"
    || raw.bytes_utf8 !== canonicalJson(value) || raw.raw_bytes_digest !== "27d2e0c93fc654d75aad903c6d6b13c1de369d7546637f1142fd65bacd9fb4f0"
    || !task4CanonicalEqual(value, TASK4_GENERIC_LEXICON)) task4FailContract("reference_binding");
  verifyLexiconUnicodeStage(raw, runtime);
  const ref = rawArtifactRef(raw, `contentmd.generic-language-lexicon.${value.locale}`);
  return { value, ref };
}

function checkpointEntries(checkpoint: FeatureSourceCheckpointSet): Map<string, FeatureSourceManifestEntry> {
  return new Map(checkpoint.feature_source_manifest.entries.map((entry) => [task4DigestRefKey(entry.source_ref), entry]));
}

function entrySnapshot<K extends string, P>(entry: FeatureSourceManifestEntry, kind: K): EvidenceSnapshot<K, P> {
  if (entry.material.material_kind !== "task2_evidence_snapshot" || entry.material.value.snapshot_kind !== kind) {
    task4FailContract("checkpoint_binding");
  }
  return entry.material.value as EvidenceSnapshot<K, P>;
}

function deriveBindingClosure(checkpoint: FeatureSourceCheckpointSet): {
  refs: Map<string, DigestRef>;
  roles: Map<string, Set<FeatureSourceManifestEntry["source_role"]>>;
} {
  const byRef = checkpointEntries(checkpoint);
  const queue: Array<{ ref: DigestRef; role: FeatureSourceManifestEntry["source_role"] }> = [];
  const closure = new Map<string, DigestRef>();
  const roles = new Map<string, Set<FeatureSourceManifestEntry["source_role"]>>();
  const enqueue = (
    refs: readonly DigestRef[],
    role: FeatureSourceManifestEntry["source_role"],
  ): void => refs.forEach((ref) => queue.push({ ref, role }));
  for (const entry of checkpoint.feature_source_manifest.entries) {
    const material = entry.material;
    if (material.material_kind === "task2_evidence_snapshot") {
      const snapshot = material.value;
      if (["task", "context", "candidate"].includes(snapshot.snapshot_kind)) {
        enqueue(snapshot.source_refs, entry.source_role);
      }
      if (snapshot.snapshot_kind === "fact-set" || snapshot.snapshot_kind === "review-policy") {
        enqueue((snapshot.payload as StableSetPayload).item_refs, entry.source_role);
      }
      if (["retrieval", "approved-pattern", "acceptance-criteria"].includes(snapshot.snapshot_kind)) {
        enqueue((snapshot.payload as ExpressionFreeFeaturePayload).ordered_feature_refs, entry.source_role);
      }
    } else if (entry.source_role === "approved_exemplar") {
      enqueue([material.value.payload.subject_ref], entry.source_role);
    }
  }
  while (queue.length > 0) {
    const { ref, role } = queue.shift()!;
    const key = task4DigestRefKey(ref);
    const refRoles = roles.get(key) ?? new Set<FeatureSourceManifestEntry["source_role"]>();
    refRoles.add(role);
    roles.set(key, refRoles);
    if (closure.has(key)) continue;
    closure.set(key, ref);
    const target = byRef.get(key);
    if (target?.material.material_kind === "task2_evidence_snapshot") {
      const snapshot = target.material.value;
      if (snapshot.snapshot_kind === "approved-pattern") {
        enqueue((snapshot.payload as ExpressionFreeFeaturePayload).ordered_feature_refs, target.source_role);
      }
    }
  }
  return { refs: closure, roles };
}

interface DerivedBinding {
  binding: FeatureContextBinding;
  checkpoint: FeatureSourceCheckpointSet;
  context: EvidenceSnapshot<"context", ContextPayload>;
  featureMaterialRefs: DigestRef[];
  acceptanceRefs: DigestRef[];
  ruleRefs: DigestRef[];
  ruleArtifactRefs: ArtifactRef[];
  ruleSourceRefs: DigestRef[];
  closure: Map<string, DigestRef>;
  closureRoles: Map<string, Set<FeatureSourceManifestEntry["source_role"]>>;
}

const MATERIAL_SOURCE_ROLES: Readonly<Record<FeatureMaterial["material_kind"], readonly FeatureSourceManifestEntry["source_role"][]>> = {
  required_fact: ["fact_set", "acceptance_criteria"],
  recovery_action: ["policy", "approved_pattern", "approved_exemplar", "acceptance_criteria"],
  supporting_evidence: ["fact_set", "approved_exemplar", "acceptance_criteria"],
  approved_terminology: ["policy", "approved_pattern", "approved_exemplar", "acceptance_criteria"],
  context_entity: ["context", "policy", "acceptance_criteria"],
  context_action: ["context", "policy", "acceptance_criteria"],
};

function ruleArtifactRef(ref: DigestRef): ArtifactRef {
  return {
    artifact_id: `contentmd.task4-candidate-rule-set.${ref.content_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: "",
  };
}

function deriveBinding(
  binding: FeatureContextBinding,
  checkpoints: ReadonlyMap<string, FeatureSourceCheckpointSet>,
  ruleArtifacts: ReadonlyMap<string, ArtifactRef>,
): DerivedBinding {
  const checkpoint = checkpoints.get(task4DigestRefKey(binding.checkpoint_set_ref));
  if (checkpoint === undefined) task4FailContract("checkpoint_binding");
  const byRef = checkpointEntries(checkpoint);
  const contextEntry = byRef.get(task4DigestRefKey(binding.context_ref));
  if (contextEntry === undefined) task4FailContract("checkpoint_binding");
  const context = entrySnapshot<"context", ContextPayload>(contextEntry, "context");
  for (const entry of checkpoint.feature_source_manifest.entries) {
    if (entry.source_role !== "candidate_a" && entry.source_role !== "candidate_b") continue;
    const candidate = entrySnapshot<"candidate", CandidatePayload>(entry, "candidate");
    if (!task4RefsEqual(candidate.payload.context_ref, binding.context_ref)) {
      task4FailContract("scope_mismatch");
    }
  }
  const closure = deriveBindingClosure(checkpoint);
  const featureMaterialRefs = task4SortCanonical([...closure.refs.values()]
    .filter((ref) => ref.schema_id === "contentmd.task4-feature-material" && ref.schema_version === "0.1.0"));
  const acceptanceEntries = checkpoint.feature_source_manifest.entries.filter((entry) => {
    if (entry.source_role !== "acceptance_criteria" || entry.material.material_kind !== "task2_evidence_snapshot") return false;
    const payload = entry.material.value.payload as ExpressionFreeFeaturePayload;
    return entry.material.value.snapshot_kind === "acceptance-criteria" && payload.state === "current"
      && payload.project_id === checkpoint.store_binding.project_id && ALLOWED_SOURCE_CLASSES.includes(payload.source_class as Task4AllowedSourceClass)
      && payload.rights_state === "training_permitted";
  });
  if (acceptanceEntries.length === 0) task4FailContract("checkpoint_binding");
  const acceptanceRefs = task4SortCanonical(acceptanceEntries.map((entry) => entry.source_ref));
  const ruleRefs: DigestRef[] = [];
  const ruleSourceRefs: DigestRef[] = [];
  let policyTargets = 0;
  for (const entry of acceptanceEntries) {
    const acceptance = entry.material.value as EvidenceSnapshot<"acceptance-criteria", ExpressionFreeFeaturePayload>;
    const payload = acceptance.payload;
    ruleSourceRefs.push(...acceptance.source_refs);
    for (const targetRef of payload.ordered_feature_refs) {
      const target = byRef.get(task4DigestRefKey(targetRef));
      if (target === undefined || (target.source_role !== "fact_set" && target.source_role !== "policy")) task4FailContract("checkpoint_binding");
      if (target.source_role === "policy") {
        policyTargets += 1;
        const policy = entrySnapshot<"review-policy", StableSetPayload>(target, "review-policy");
        if (policy.payload.state !== "current") task4FailContract("checkpoint_binding");
        ruleRefs.push(...policy.payload.item_refs);
        ruleSourceRefs.push(...policy.source_refs, ...policy.payload.item_refs);
      }
    }
  }
  const uniqueRules = unions([ruleRefs]);
  if (policyTargets === 0 || uniqueRules.length === 0 || uniqueRules.some((ref) =>
    ref.schema_id !== "contentmd.task4-candidate-rule-set" || ref.schema_version !== "0.1.0")) task4FailContract("checkpoint_binding");
  const ruleArtifactRefs = task4SortCanonical(uniqueRules.map((ref) => {
    const artifact = ruleArtifacts.get(task4DigestRefKey(ref));
    if (artifact === undefined) task4FailContract("checkpoint_binding");
    return artifact;
  }));
  if (!task4CanonicalEqual(binding.feature_material_refs, featureMaterialRefs)
    || !task4CanonicalEqual(binding.acceptance_criteria_refs, acceptanceRefs)
    || !task4CanonicalEqual(binding.candidate_rule_set_refs, uniqueRules)
    || !task4CanonicalEqual(binding.candidate_rule_set_artifact_refs, ruleArtifactRefs)) task4FailContract("checkpoint_binding");
  return {
    binding,
    checkpoint,
    context,
    featureMaterialRefs,
    acceptanceRefs,
    ruleRefs: uniqueRules,
    ruleArtifactRefs,
    ruleSourceRefs: unions([ruleSourceRefs]),
    closure: closure.refs,
    closureRoles: closure.roles,
  };
}

function assertCandidateRuleSet(
  value: unknown,
  runtime: Task4UnicodeRuntime,
): asserts value is CandidateRuleSet {
  task4AssertExactKeys(value, [
    "contract_version", "rule_set_id", "project_id", "locale", "source_class", "rights_state", "source_refs",
    "rules", "rule_set_state", "authority_effect", "rule_set_digest",
  ]);
  const set = value as unknown as CandidateRuleSet;
  if (set.contract_version !== "contentmd.task4-candidate-rule-set/0.1.0" || !ALLOWED_SOURCE_CLASSES.includes(set.source_class)
    || set.rights_state !== "training_permitted" || set.rule_set_state !== "current" || set.authority_effect !== "none") {
    task4FailContract("canonical_value");
  }
  text(set.project_id);
  text(set.locale);
  digestRefSet(set.source_refs, false);
  if (!Array.isArray(set.rules) || set.rules.length === 0) task4FailContract("canonical_value");
  const ids: string[] = [];
  for (const rule of set.rules) {
    const keys = rule.rule_kind === "grapheme_count"
      ? ["rule_id", "failure_class", "rule_kind", "minimum", "maximum"]
      : rule.rule_kind === "required_source_ref" || rule.rule_kind === "forbidden_source_ref"
        ? ["rule_id", "failure_class", "rule_kind", "source_ref"]
        : ["rule_id", "failure_class", "rule_kind", "tokens"];
    task4AssertExactKeys(rule, keys);
    text(rule.rule_id);
    ids.push(rule.rule_id);
    if (!["hard_rule", "prohibited_claim"].includes(rule.failure_class)) task4FailContract("canonical_value");
    if ((rule.rule_kind === "required_token_sequence" || rule.rule_kind === "required_source_ref")
      && rule.failure_class !== "hard_rule") task4FailContract("canonical_value");
    if (rule.rule_kind === "grapheme_count") {
      if (rule.failure_class !== "hard_rule" || (rule.minimum === null && rule.maximum === null)
        || (rule.minimum !== null && Number.isFinite(rule.minimum)
          && (!Number.isSafeInteger(rule.minimum) || rule.minimum < 0))
        || (rule.maximum !== null && Number.isFinite(rule.maximum)
          && (!Number.isSafeInteger(rule.maximum) || rule.maximum < 0))
        || (rule.minimum !== null && rule.maximum !== null
          && Number.isFinite(rule.minimum) && Number.isFinite(rule.maximum)
          && rule.minimum > rule.maximum)) task4FailContract("canonical_value");
    } else if (rule.rule_kind === "required_source_ref" || rule.rule_kind === "forbidden_source_ref") task4VerifyDigestRef(rule.source_ref);
    else {
      if (!Array.isArray(rule.tokens) || rule.tokens.length === 0) task4FailContract("canonical_value");
      rule.tokens.forEach(text);
      const normalized = rule.tokens.flatMap((token) => task4WordTokens(token, runtime));
      if (!task4CanonicalEqual(normalized, rule.tokens)) task4FailContract("unicode_runtime");
    }
  }
  if (!task4CanonicalEqual(ids, task4SortScalar(ids)) || new Set(ids).size !== ids.length) task4FailContract("canonical_value");
  if (!task4ContainsNonfinite(set)) {
    const { rule_set_id: _id, rule_set_digest: _digest, ...identity } = set;
    const { rule_set_digest: _drop, ...content } = set;
    if (set.rule_set_id !== `candidate-rule-set.${sha256Canonical(identity)}` || set.rule_set_digest !== sha256Canonical(content)) {
      task4FailContract("digest");
    }
  }
}

function verifyRuleSource(
  source: { candidate_rule_set: CandidateRuleSet; candidate_rule_set_artifact: RawUtf8Artifact },
  runtime: Task4UnicodeRuntime,
): {
  ref: DigestRef;
  artifactRef: ArtifactRef;
} {
  task4AssertExactKeys(source, ["candidate_rule_set", "candidate_rule_set_artifact"]);
  assertCandidateRuleSet(source.candidate_rule_set, runtime);
  assertRawArtifact(source.candidate_rule_set_artifact);
  if (!task4ContainsNonfinite(source.candidate_rule_set)
    && source.candidate_rule_set_artifact.bytes_utf8 !== canonicalJson(source.candidate_rule_set)) {
    task4FailContract("reference_binding");
  }
  const ref = objectRef(source.candidate_rule_set);
  return {
    ref,
    artifactRef: rawArtifactRef(
      source.candidate_rule_set_artifact,
      `contentmd.task4-candidate-rule-set.${source.candidate_rule_set.rule_set_digest}`,
    ),
  };
}

function profileRef(profile: FeatureProfile): DigestRef {
  return auxiliaryRef(profile.record_id, profile.schema_id, profile.content_digest);
}

function featureProfileNonProvenanceView(profile: FeatureProfile): unknown {
  const { provenance: _provenance, content_digest: _contentDigest, ...view } = profile;
  return view;
}

function verifyFeatureProfileRecord(profile: FeatureProfile): void {
  task4AssertExactKeys(profile, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance", "lifecycle_state", "payload", "content_digest",
  ]);
  task4AssertExactKeys(profile.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  task4AssertExactKeys(profile.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest", "code_digest",
    "input_digest", "authority_effect", "feature_profile_version", "features", "source_artifact_refs",
    "forbidden_input_fields", "runtime_profile_ref", "profile_state",
  ]);
  if (profile.schema_id !== LEARNING_SCHEMA_IDS.featureProfile || profile.schema_version !== "0.1.0"
    || (Number.isFinite(profile.record_version) && profile.record_version !== 1)
    || profile.lifecycle_state !== "active" || profile.scope.memory_scope !== "project"
    || profile.scope.project_id === null || !task4CanonicalEqual(profile.scope.data_classes, ["learning_feature_profile"])
    || profile.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || profile.payload.record_mode !== "development_fixture" || profile.payload.ranking_objective !== "expression_preference"
    || profile.payload.candidate_kind !== "expression" || profile.payload.authority_effect !== "none"
    || profile.payload.feature_profile_version !== "rank-features/0.1.0" || profile.payload.profile_state !== "frozen"
    || !task4CanonicalEqual(profile.payload.features, FEATURE_DEFINITIONS)
    || !task4CanonicalEqual(profile.payload.forbidden_input_fields, FORBIDDEN_INPUT_FIELDS)
    || (!task4ContainsNonfinite(profile) && verifyRecordDigest(profile).valid !== true)) {
    task4FailContract("feature_profile_binding");
  }
  digest(profile.payload.schema_digest);
  digest(profile.payload.code_digest);
  digest(profile.payload.input_digest);
  artifactRefSet(profile.payload.source_artifact_refs, false);
  task4VerifyArtifactRef(profile.payload.runtime_profile_ref);
  if (!Array.isArray(profile.provenance) || profile.provenance.length === 0) task4FailContract("provenance");
  for (const entry of profile.provenance) {
    task4AssertExactKeys(entry, ["record_id", "relationship", "content_digest"]);
    text(entry.record_id);
    text(entry.relationship);
    digest(entry.content_digest);
  }
  const sortedProvenance = [...profile.provenance].sort((left, right) => left.record_id.localeCompare(right.record_id, "en")
    || left.relationship.localeCompare(right.relationship, "en") || left.content_digest.localeCompare(right.content_digest, "en"));
  if (!task4CanonicalEqual(profile.provenance, sortedProvenance)
    || new Set(profile.provenance.map(canonicalJson)).size !== profile.provenance.length) task4FailContract("provenance");
  const artifactProjections = profile.provenance.filter((entry) => entry.relationship.startsWith("task4_feature_artifact_"));
  if (artifactProjections.length !== profile.payload.source_artifact_refs.length
    || !profile.payload.source_artifact_refs.every((ref) => artifactProjections.some((entry) =>
      entry.record_id === `artifact.${ref.artifact_id}.${ref.artifact_version}` && entry.content_digest === ref.artifact_digest))) {
    task4FailContract("provenance");
  }
  if (profile.record_id !== `feature-profile.${sha256Canonical({
    contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
    project_id: profile.scope.project_id,
    input_digest: profile.payload.input_digest,
  })}`) task4FailContract("feature_profile_binding");
}

function coreProvenance(bindings: readonly FeatureArtifactBinding[], producerRef: DigestRef | null): ProvenanceRef[] {
  const values: ProvenanceRef[] = bindings.map((binding) => ({
    record_id: `artifact.${binding.artifact_ref.artifact_id}.${binding.artifact_ref.artifact_version}`,
    relationship: `task4_feature_artifact_${binding.role}`,
    content_digest: binding.artifact_ref.artifact_digest,
  }));
  if (producerRef !== null) values.push({
    record_id: producerRef.record_id,
    relationship: "producer_verification",
    content_digest: producerRef.content_digest,
  });
  return values.sort((left, right) => left.record_id.localeCompare(right.record_id, "en")
    || left.relationship.localeCompare(right.relationship, "en")
    || left.content_digest.localeCompare(right.content_digest, "en"));
}

function profileRuleArtifactRefs(input: CreateFeatureProfileInput): ArtifactRef[] {
  return input.hard_rule_sources.map(({ candidate_rule_set, candidate_rule_set_artifact }) =>
    rawArtifactRef(
      candidate_rule_set_artifact,
      `contentmd.task4-candidate-rule-set.${candidate_rule_set.rule_set_digest}`,
    ));
}

export function task4VerifyProfileReferenceStage(input: CreateFeatureProfileInput): void {
  const universeArtifact = verifyUniverseArtifact(input.feature_universe, input.feature_universe_artifact);
  const lexicon = verifyLexicon(input.generic_lexicon, input.unicode_runtime);
  const ruleArtifactRefs = input.hard_rule_sources.map((source) =>
    verifyRuleSource(source, input.unicode_runtime).artifactRef);
  const expectedBindings = ([
    { role: "feature_universe" as const, artifact_ref: universeArtifact },
    { role: "generic_lexicon" as const, artifact_ref: lexicon.ref },
    { role: "unicode_normalization" as const, artifact_ref: input.unicode_runtime.unicode_bundle.normalization.artifact_ref },
    { role: "unicode_casefold" as const, artifact_ref: input.unicode_runtime.unicode_bundle.casefold.artifact_ref },
    { role: "unicode_whitespace" as const, artifact_ref: input.unicode_runtime.unicode_bundle.whitespace.artifact_ref },
    { role: "unicode_word_break" as const, artifact_ref: input.unicode_runtime.unicode_bundle.word_break.artifact_ref },
    { role: "unicode_grapheme_break" as const, artifact_ref: input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref },
    { role: "runtime_profile" as const, artifact_ref: input.runtime_profile_ref },
    ...ruleArtifactRefs.map((artifact_ref) => ({ role: "hard_rule_set" as const, artifact_ref })),
  ] satisfies FeatureArtifactBinding[]).sort((left, right) =>
    left.role.localeCompare(right.role, "en") || task4CanonicalCompare(left.artifact_ref, right.artifact_ref));
  if (!task4CanonicalEqual(input.feature_universe.generic_lexicon_ref, lexicon.ref)
    || !task4CanonicalEqual(input.artifact_bindings, expectedBindings)) {
    task4FailContract("reference_binding");
  }
}

export function task4VerifyProfileUnicodeStage(input: CreateFeatureProfileInput): void {
  verifyTask4UnicodeRuntime(input.unicode_runtime);
  task4AssertUnicodeScalarGraph(input);
  verifyLexiconUnicodeStage(input.generic_lexicon, input.unicode_runtime);
  for (const source of input.hard_rule_sources) {
    verifyRuleSetUnicodeStage(source.candidate_rule_set, input.unicode_runtime);
  }
  verifyFeatureMaterialsUnicodeStage(input.feature_material_sources, input.unicode_runtime);
  const unicodeRefs = task4SortCanonical([
    input.unicode_runtime.unicode_bundle.normalization.artifact_ref,
    input.unicode_runtime.unicode_bundle.casefold.artifact_ref,
    input.unicode_runtime.unicode_bundle.whitespace.artifact_ref,
    input.unicode_runtime.unicode_bundle.word_break.artifact_ref,
    input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref,
  ]);
  if (input.feature_universe.unicode_runtime_digest !== input.unicode_runtime.runtime_digest
    || !task4CanonicalEqual(unicodeRefs, input.feature_universe.unicode_artifact_refs)) {
    task4FailContract("unicode_runtime");
  }
}

export function task4VerifyVectorUnicodeStage(input: CandidateVectorizationInput): void {
  verifyTask4UnicodeRuntime(input.unicode_runtime);
  task4AssertUnicodeScalarGraph(input);
  task4VerifyProfileUnicodeStage(input.profile_input);
  verifyLexiconUnicodeStage(input.generic_lexicon, input.unicode_runtime);
  for (const evaluation of input.rule_evaluations) {
    verifyRuleSetUnicodeStage(evaluation.candidate_rule_set, input.unicode_runtime);
    for (const finding of evaluation.eligibility_gate.findings) {
      task4WordTokens(finding.rule_id, input.unicode_runtime);
    }
  }
  verifyFeatureMaterialsUnicodeStage(input.materials, input.unicode_runtime);
  task4WordTokens(input.candidate.payload.expression, input.unicode_runtime);
}

function looseCheckpointForBinding(
  input: CreateFeatureProfileInput,
  binding: FeatureContextBinding,
): FeatureSourceCheckpointSet | undefined {
  return input.checkpoint_sets.find((checkpoint) =>
    task4RefsEqual(task3CheckpointSetRef(checkpoint), binding.checkpoint_set_ref));
}

function looseContextForBinding(
  checkpoint: FeatureSourceCheckpointSet,
  binding: FeatureContextBinding,
): EvidenceSnapshot<"context", ContextPayload> | undefined {
  const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
    task4RefsEqual(candidate.source_ref, binding.context_ref));
  if (entry?.material.material_kind !== "task2_evidence_snapshot"
    || entry.material.value.snapshot_kind !== "context") return undefined;
  return entry.material.value as EvidenceSnapshot<"context", ContextPayload>;
}

export function task4VerifyProfileScopeStage(input: CreateFeatureProfileInput): void {
  if (input.project_id !== input.feature_universe.project_id
    || !task4CanonicalEqual(input.runtime_profile_ref, input.unicode_runtime.runtime_profile.artifact_ref)
    || !task4CanonicalEqual(input.runtime_profile_ref, input.feature_universe.runtime_profile_ref)
    || input.feature_universe.unicode_runtime_digest !== input.unicode_runtime.runtime_digest) {
    task4FailContract("scope_mismatch");
  }
  for (const checkpoint of input.checkpoint_sets) {
    if (checkpoint.store_binding.project_id !== input.project_id
      || checkpoint.feature_source_manifest.project_id !== input.project_id
      || checkpoint.feature_source_manifest.entries.some((entry) =>
        (entry.event.payload as { project_id?: unknown }).project_id !== input.project_id)) {
      task4FailContract("scope_mismatch");
    }
  }
  const lexicon = JSON.parse(input.generic_lexicon.bytes_utf8) as GenericLexicon;
  for (const binding of input.feature_universe.context_bindings) {
    if (binding.project_id !== input.feature_universe.project_id
      || !task4CanonicalEqual(binding.runtime_profile_ref, input.feature_universe.runtime_profile_ref)
      || binding.unicode_runtime_digest !== input.unicode_runtime.runtime_digest) {
      task4FailContract("scope_mismatch");
    }
    const checkpoint = looseCheckpointForBinding(input, binding);
    if (checkpoint === undefined) continue;
    const context = looseContextForBinding(checkpoint, binding);
    if (context === undefined) continue;
    if (!context.source_refs.some((ref) => task4RefsEqual(ref, binding.target_scope_ref))) {
      task4FailContract("scope_mismatch");
    }
    const candidateEntries = checkpoint.feature_source_manifest.entries.filter((entry) =>
      entry.source_role === "candidate_a" || entry.source_role === "candidate_b");
    const prePresentationClosure = deriveBindingClosure(checkpoint).refs;
    if (!binding.permitted_candidate_scope_refs.every((ref) => candidateEntries.some((entry) =>
      entry.material.material_kind === "task2_evidence_snapshot"
      && entry.material.value.source_refs.some((sourceRef) => task4RefsEqual(sourceRef, ref)))
      || prePresentationClosure.has(task4DigestRefKey(ref)))) {
      task4FailContract("scope_mismatch");
    }
    for (const entry of checkpoint.feature_source_manifest.entries) {
      if ((entry.source_role !== "candidate_a" && entry.source_role !== "candidate_b")
        || entry.material.material_kind !== "task2_evidence_snapshot"
        || entry.material.value.snapshot_kind !== "candidate") continue;
      const candidate = entry.material.value as EvidenceSnapshot<"candidate", CandidatePayload>;
      if (!task4RefsEqual(candidate.payload.context_ref, binding.context_ref)) {
        task4FailContract("scope_mismatch");
      }
    }
    const targetScopes = input.scope_material_sources.filter((scope) =>
      task4RefsEqual(objectRef(scope), binding.target_scope_ref));
    const candidateScopes = binding.permitted_candidate_scope_refs.flatMap((ref) =>
      input.scope_material_sources.filter((scope) => task4RefsEqual(objectRef(scope), ref)));
    for (const target of targetScopes) {
      if (target.scope_role !== "target" || target.project_id !== binding.project_id
        || target.product_area !== context.payload.product_area
        || target.journey_state !== context.payload.journey_state
        || target.channel !== context.payload.channel || target.locale !== context.payload.locale) {
        task4FailContract("scope_mismatch");
      }
    }
    for (const candidate of candidateScopes) {
      if (candidate.scope_role !== "candidate_origin" || candidate.project_id !== binding.project_id
        || candidate.locale !== context.payload.locale) task4FailContract("scope_mismatch");
    }
    const allScopeKeys = new Set(input.scope_material_sources.map((scope) =>
      task4DigestRefKey(objectRef(scope))));
    for (const scope of [...targetScopes, ...candidateScopes]) {
      if (scope.source_refs.some((ref) => allScopeKeys.has(task4DigestRefKey(ref))
        || task4RefsEqual(ref, binding.context_ref)
        || ref.schema_id === "contentmd.task4-feature-universe-manifest"
        || ref.schema_id === LEARNING_SCHEMA_IDS.featureProfile)) {
        task4FailContract("scope_mismatch");
      }
    }
    for (const material of input.feature_material_sources) {
      if (binding.feature_material_refs.some((ref) => task4RefsEqual(ref, objectRef(material)))
        && (material.project_id !== binding.project_id || material.locale !== context.payload.locale)) {
        task4FailContract("scope_mismatch");
      }
    }
    for (const source of input.hard_rule_sources) {
      if (binding.candidate_rule_set_refs.some((ref) => task4RefsEqual(ref, objectRef(source.candidate_rule_set)))
        && (source.candidate_rule_set.project_id !== binding.project_id
          || source.candidate_rule_set.locale !== context.payload.locale)) {
        task4FailContract("scope_mismatch");
      }
    }
    if (lexicon.locale !== context.payload.locale) task4FailContract("scope_mismatch");
  }
}

const TASK4_VERIFIED_CHECKPOINTS = new Set<string>();

function verifyFiniteCheckpointBindings(checkpoint: FeatureSourceCheckpointSet): void {
  const streams = new Map(checkpoint.streams.map((stream) => [stream.stream_id, stream] as const));
  for (const entry of checkpoint.feature_source_manifest.entries) {
    const event = entry.event;
    const payload = event.payload as {
      source_ref?: DigestRef;
      source_role?: unknown;
      source_class?: unknown;
      rights_state?: unknown;
    };
    const materialRef: DigestRef = entry.material.material_kind === "task2_evidence_snapshot"
      ? {
          record_id: entry.material.value.snapshot_id,
          schema_id: `contentmd.task2-${entry.material.value.snapshot_kind}-snapshot`,
          schema_version: "0.1.0",
          content_digest: entry.material.value.snapshot_digest,
        }
      : task3RecordRef(entry.material.value);
    const stream = streams.get(entry.stream_id);
    if (!task4RefsEqual(entry.source_ref, entry.material.source_ref)
      || !task4RefsEqual(entry.source_ref, materialRef)
      || entry.event_id !== event.event_id
      || entry.event_digest !== event.event_digest
      || entry.stream_id !== event.stream_id
      || !task4RefsEqual(entry.source_ref, payload.source_ref as DigestRef)
      || entry.source_role !== payload.source_role
      || entry.source_class !== payload.source_class
      || entry.rights_state !== payload.rights_state
      || event.schema_version !== "0.1.0"
      || event.event_type !== "feature_source_recorded"
      || event.actor_ref !== "contentmd.task3-development-fixture-recorder"
      || event.data_class !== "learning_feature_source"
      || (event.payload as { contract_version?: unknown }).contract_version
        !== "contentmd.feature-source-append/0.1.0"
      || payload.rights_state !== "training_permitted"
      || !FEATURE_SOURCE_ROLES.includes(entry.source_role)
      || stream === undefined
      || !stream.complete_prefix.some((candidate) =>
        candidate.event_id === entry.event_id && candidate.event_digest === entry.event_digest)) {
      task4FailContract("checkpoint_binding");
    }
    if (Number.isFinite(entry.sequence) && Number.isFinite(event.sequence)
      && entry.sequence !== event.sequence) {
      task4FailContract("checkpoint_binding");
    }
  }
  for (const stream of checkpoint.streams) {
    const head = stream.complete_prefix.at(-1) ?? null;
    const expectedHeadId = head?.event_id ?? null;
    const expectedHeadDigest = head?.event_digest ?? null;
    const receipt = stream.receipt;
    if (stream.head_event_id !== expectedHeadId
      || stream.head_event_digest !== expectedHeadDigest
      || receipt.store_binding_digest !== checkpoint.store_binding.binding_digest
      || receipt.stream_id !== stream.stream_id
      || receipt.head_event_id !== stream.head_event_id
      || receipt.head_event_digest !== stream.head_event_digest
      || receipt.prefix_digest !== stream.prefix_digest
      || receipt.feature_source_manifest_digest
        !== checkpoint.feature_source_manifest.manifest_digest) {
      task4FailContract("checkpoint_binding");
    }
    if (Number.isFinite(stream.maximum_sequence)
      && stream.maximum_sequence !== stream.complete_prefix.length) {
      task4FailContract("checkpoint_binding");
    }
    if (Number.isFinite(stream.maximum_sequence)
      && Number.isFinite(receipt.maximum_sequence)
      && receipt.maximum_sequence !== stream.maximum_sequence) {
      task4FailContract("checkpoint_binding");
    }
    let predecessor: string | null = null;
    for (const [index, event] of stream.complete_prefix.entries()) {
      if (event.stream_id !== stream.stream_id || event.predecessor_digest !== predecessor) {
        task4FailContract("checkpoint_binding");
      }
      if (Number.isFinite(event.sequence) && event.sequence !== index + 1) {
        task4FailContract("checkpoint_binding");
      }
      predecessor = event.event_digest;
    }
  }
}

function verifyCheckpointOnce(checkpoint: FeatureSourceCheckpointSet): void {
  verifyFiniteCheckpointBindings(checkpoint);
  if (task4ContainsNonfinite(checkpoint)) return;
  const key = checkpoint.checkpoint_set_digest;
  if (TASK4_VERIFIED_CHECKPOINTS.has(key)) return;
  try { verifyFeatureSourceCheckpointSet(checkpoint); } catch { task4FailContract("checkpoint_binding"); }
  TASK4_VERIFIED_CHECKPOINTS.add(key);
}

export function task4VerifyProfileCheckpointStage(input: CreateFeatureProfileInput): void {
  for (const checkpoint of input.checkpoint_sets) verifyCheckpointOnce(checkpoint);
  const refs = input.checkpoint_sets.map(task3CheckpointSetRef);
  if (new Set(refs.map(task4DigestRefKey)).size !== refs.length
    || !task4CanonicalEqual(refs, task4SortCanonical(refs))
    || !task4CanonicalEqual(task4SortCanonical(refs), input.feature_universe.checkpoint_set_refs)) {
    task4FailContract("checkpoint_binding");
  }
  const globalScopeRefs = unions(input.feature_universe.context_bindings.flatMap(
    (binding) => [[binding.target_scope_ref], binding.permitted_candidate_scope_refs],
  ));
  const scopeRefs = input.scope_material_sources.map(objectRef);
  if (!task4CanonicalEqual(scopeRefs, task4SortCanonical(scopeRefs))
    || !task4CanonicalEqual(scopeRefs, globalScopeRefs)) task4FailContract("checkpoint_binding");
  const materialRefs = input.feature_material_sources.map(objectRef);
  if (!task4CanonicalEqual(materialRefs, task4SortCanonical(materialRefs))
    || !task4CanonicalEqual(materialRefs, input.feature_universe.feature_material_refs)) {
    task4FailContract("checkpoint_binding");
  }
  const checkpoints = new Map(input.checkpoint_sets.map((checkpoint) => [
    task4DigestRefKey(task3CheckpointSetRef(checkpoint)), checkpoint,
  ] as const));
  const verifiedRules = input.hard_rule_sources.map((source) => ({
    source,
    ...verifyRuleSource(source, input.unicode_runtime),
  }));
  const ruleArtifacts = new Map(verifiedRules.map((item) => [
    task4DigestRefKey(item.ref), item.artifactRef,
  ] as const));
  const derived = input.feature_universe.context_bindings.map((binding) =>
    deriveBinding(binding, checkpoints, ruleArtifacts));
  const allScopeKeys = new Set(scopeRefs.map(task4DigestRefKey));
  const scopeByRef = new Map(input.scope_material_sources.map((scope) => [
    task4DigestRefKey(objectRef(scope)), scope,
  ] as const));
  for (const item of derived) {
    const scopes = [
      scopeByRef.get(task4DigestRefKey(item.binding.target_scope_ref)),
      ...item.binding.permitted_candidate_scope_refs.map((ref) =>
        scopeByRef.get(task4DigestRefKey(ref))),
    ];
    if (scopes.some((scope) => scope === undefined)) task4FailContract("checkpoint_binding");
    for (const scope of scopes as ScopeMaterial[]) {
      if (scope.source_refs.some((ref) => !item.closure.has(task4DigestRefKey(ref))
        && !checkpointEntries(item.checkpoint).has(task4DigestRefKey(ref)))) {
        task4FailContract("checkpoint_binding");
      }
      if (scope.source_refs.some((ref) => allScopeKeys.has(task4DigestRefKey(ref)))) {
        task4FailContract("checkpoint_binding");
      }
    }
  }
  for (const material of input.feature_material_sources) {
    const applicable = derived.filter((item) => item.featureMaterialRefs.some((ref) =>
      task4RefsEqual(ref, objectRef(material))));
    const allowedRoles = MATERIAL_SOURCE_ROLES[material.material_kind];
    for (const item of applicable) {
      const entries = checkpointEntries(item.checkpoint);
      for (const sourceRef of material.source_refs) {
        const key = task4DigestRefKey(sourceRef);
        const roles = new Set(item.closureRoles.get(key) ?? []);
        const entry = entries.get(key);
        if (entry !== undefined) roles.add(entry.source_role);
        if (roles.size === 0 || ![...roles].some((role) => allowedRoles.includes(role))) {
          task4FailContract("checkpoint_binding");
        }
      }
    }
  }
  const verifiedRuleByRef = new Map(verifiedRules.map((item) => [
    task4DigestRefKey(item.ref), item.source.candidate_rule_set,
  ] as const));
  for (const item of derived) {
    const permitted = new Set(item.ruleSourceRefs.map(task4DigestRefKey));
    for (const ref of item.ruleRefs) {
      const ruleSet = verifiedRuleByRef.get(task4DigestRefKey(ref));
      if (ruleSet === undefined || ruleSet.source_refs.some((sourceRef) =>
        !permitted.has(task4DigestRefKey(sourceRef)))) {
        task4FailContract("checkpoint_binding");
      }
    }
  }
  const globalAcceptanceRefs = unions(derived.map((item) => item.acceptanceRefs));
  const globalRuleRefs = unions(derived.map((item) => item.ruleRefs));
  const globalRuleArtifacts = unions(derived.map((item) => item.ruleArtifactRefs));
  if (!task4CanonicalEqual(globalAcceptanceRefs, input.feature_universe.acceptance_criteria_refs)
    || !task4CanonicalEqual(globalRuleRefs, input.feature_universe.hard_rule_set_refs)
    || !task4CanonicalEqual(globalRuleArtifacts, input.feature_universe.hard_rule_set_artifact_refs)
    || !task4CanonicalEqual(verifiedRules.map((item) => item.ref), globalRuleRefs)
    || !task4CanonicalEqual(task4SortCanonical(verifiedRules.map((item) => item.artifactRef)), globalRuleArtifacts)
    || !task4CanonicalEqual(unions(derived.map((item) => item.featureMaterialRefs)),
      input.feature_universe.feature_material_refs)) {
    task4FailContract("checkpoint_binding");
  }
}

export function createFeatureProfile(input: CreateFeatureProfileInput): FeatureProfile {
  task4TopLevelGate(input, PROFILE_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightProfileInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : FEATURE_PROFILE_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  let producer!: ReturnType<typeof verifyTask4Producer>;
  task4RunStagePlan({
    canonical_value: () => {},
    producer_witness: () => { producer = verifyTask4Producer(input.producer, "feature-profile"); },
    unicode_runtime: () => { task4VerifyProfileUnicodeStage(input); },
    digest: () => { task4VerifyCompleteDigestGraph(input); },
    reference_binding: () => { task4VerifyProfileReferenceStage(input); },
    scope_mismatch: () => { task4VerifyProfileScopeStage(input); },
    checkpoint_binding: () => { task4VerifyProfileCheckpointStage(input); },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedInput); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedInput); },
  });
  text(input.project_id);
  assertFeatureUniverse(input.feature_universe);
  const universeArtifact = verifyUniverseArtifact(input.feature_universe, input.feature_universe_artifact);
  const lexicon = verifyLexicon(input.generic_lexicon, input.unicode_runtime);
  task4VerifyArtifactRef(input.runtime_profile_ref);
  if (input.project_id !== input.feature_universe.project_id
    || !task4CanonicalEqual(input.runtime_profile_ref, input.unicode_runtime.runtime_profile.artifact_ref)
    || !task4CanonicalEqual(input.runtime_profile_ref, input.feature_universe.runtime_profile_ref)
    || input.feature_universe.unicode_runtime_digest !== input.unicode_runtime.runtime_digest) task4FailContract("scope_mismatch");
  if (!Array.isArray(input.checkpoint_sets) || input.checkpoint_sets.length === 0) task4FailContract("canonical_value");
  input.checkpoint_sets.forEach(verifyCheckpointOnce);
  const checkpointPairs = input.checkpoint_sets.map((checkpoint) => [task4DigestRefKey(task3CheckpointSetRef(checkpoint)), checkpoint] as const);
  const checkpoints = new Map(checkpointPairs);
  if (checkpoints.size !== input.checkpoint_sets.length
    || !task4CanonicalEqual(input.checkpoint_sets.map(task3CheckpointSetRef), task4SortCanonical(input.checkpoint_sets.map(task3CheckpointSetRef)))
    || !task4CanonicalEqual(task4SortCanonical(input.checkpoint_sets.map(task3CheckpointSetRef)), input.feature_universe.checkpoint_set_refs)) {
    task4FailContract("checkpoint_binding");
  }
  if (!Array.isArray(input.hard_rule_sources) || input.hard_rule_sources.length === 0) task4FailContract("canonical_value");
  const verifiedRules = input.hard_rule_sources.map((source) => ({
    source,
    ...verifyRuleSource(source, input.unicode_runtime),
  }));
  if (!task4CanonicalEqual(verifiedRules.map((item) => item.ref), task4SortCanonical(verifiedRules.map((item) => item.ref)))
    || new Set(verifiedRules.map((item) => task4DigestRefKey(item.ref))).size !== verifiedRules.length) task4FailContract("canonical_value");
  const ruleArtifacts = new Map(verifiedRules.map((item) => [task4DigestRefKey(item.ref), item.artifactRef]));
  const derived = input.feature_universe.context_bindings.map((binding) => deriveBinding(binding, checkpoints, ruleArtifacts));
  const globalScopeRefs = unions(input.feature_universe.context_bindings.flatMap((binding) => [[binding.target_scope_ref], binding.permitted_candidate_scope_refs]));
  if (!Array.isArray(input.scope_material_sources) || input.scope_material_sources.length === 0) task4FailContract("canonical_value");
  input.scope_material_sources.forEach(assertScopeMaterial);
  const scopeRefs = input.scope_material_sources.map(objectRef);
  if (!task4CanonicalEqual(scopeRefs, task4SortCanonical(scopeRefs))
    || new Set(scopeRefs.map(task4DigestRefKey)).size !== scopeRefs.length
    || !task4CanonicalEqual(scopeRefs, globalScopeRefs)) task4FailContract("checkpoint_binding");
  const scopeByRef = new Map(input.scope_material_sources.map((scope) => [task4DigestRefKey(objectRef(scope)), scope]));
  const allScopeKeys = new Set(scopeRefs.map(task4DigestRefKey));
  for (const item of derived) {
    const target = scopeByRef.get(task4DigestRefKey(item.binding.target_scope_ref));
    if (target === undefined) task4FailContract("checkpoint_binding");
    const candidateScopes = item.binding.permitted_candidate_scope_refs.map((ref) => scopeByRef.get(task4DigestRefKey(ref)));
    if (candidateScopes.some((scope) => scope === undefined)) task4FailContract("checkpoint_binding");
    const context = item.context.payload;
    if (target.scope_role !== "target" || target.project_id !== item.binding.project_id
      || target.product_area !== context.product_area || target.journey_state !== context.journey_state
      || target.channel !== context.channel || target.locale !== context.locale
      || candidateScopes.some((scope) => scope!.scope_role !== "candidate_origin" || scope!.project_id !== item.binding.project_id
        || scope!.locale !== context.locale)) task4FailContract("scope_mismatch");
    const contextHasTarget = item.context.source_refs.some((ref) => task4RefsEqual(ref, item.binding.target_scope_ref));
    const candidateEntries = item.checkpoint.feature_source_manifest.entries.filter((entry) =>
      entry.source_role === "candidate_a" || entry.source_role === "candidate_b");
    const candidateHasScopes = item.binding.permitted_candidate_scope_refs.every((ref) => candidateEntries.some((entry) =>
      entry.material.material_kind === "task2_evidence_snapshot"
      && entry.material.value.source_refs.some((sourceRef) => task4RefsEqual(sourceRef, ref)))
      || item.closure.has(task4DigestRefKey(ref)));
    if (!contextHasTarget || !candidateHasScopes) task4FailContract("scope_mismatch");
    for (const scope of [target, ...candidateScopes as ScopeMaterial[]]) {
      if (scope.source_refs.some((ref) => allScopeKeys.has(task4DigestRefKey(ref))
        || task4RefsEqual(ref, item.binding.context_ref)
        || ref.schema_id === "contentmd.task4-feature-universe-manifest"
        || ref.schema_id === LEARNING_SCHEMA_IDS.featureProfile)) task4FailContract("scope_mismatch");
      if (scope.source_refs.some((ref) => !item.closure.has(task4DigestRefKey(ref))
        && !checkpointEntries(item.checkpoint).has(task4DigestRefKey(ref)))) task4FailContract("checkpoint_binding");
    }
    if (lexicon.value.locale !== context.locale) task4FailContract("scope_mismatch");
  }
  if (!Array.isArray(input.feature_material_sources)) task4FailContract("canonical_value");
  input.feature_material_sources.forEach(assertFeatureMaterial);
  const materialRefs = input.feature_material_sources.map(objectRef);
  const derivedMaterialRefs = unions(derived.map((item) => item.featureMaterialRefs));
  if (!task4CanonicalEqual(materialRefs, task4SortCanonical(materialRefs))
    || new Set(materialRefs.map(task4DigestRefKey)).size !== materialRefs.length
    || !task4CanonicalEqual(materialRefs, derivedMaterialRefs)) task4FailContract("checkpoint_binding");
  for (const material of input.feature_material_sources) {
    const applicable = derived.filter((item) => item.featureMaterialRefs.some((ref) => task4RefsEqual(ref, objectRef(material))));
    if (applicable.some((item) => material.project_id !== item.binding.project_id || material.locale !== item.context.payload.locale)) {
      task4FailContract("scope_mismatch");
    }
    const allowedRoles = MATERIAL_SOURCE_ROLES[material.material_kind];
    for (const item of applicable) {
      const entries = checkpointEntries(item.checkpoint);
      for (const sourceRef of material.source_refs) {
        const key = task4DigestRefKey(sourceRef);
        const sourceRoles = new Set(item.closureRoles.get(key) ?? []);
        const entry = entries.get(key);
        if (entry !== undefined) sourceRoles.add(entry.source_role);
        if (sourceRoles.size === 0 || ![...sourceRoles].some((role) => allowedRoles.includes(role))) {
          task4FailContract("checkpoint_binding");
        }
      }
    }
  }
  const verifiedRuleByRef = new Map(
    verifiedRules.map((item) => [task4DigestRefKey(item.ref), item.source.candidate_rule_set]),
  );
  for (const item of derived) {
    const entries = checkpointEntries(item.checkpoint);
    for (const ruleRef of item.ruleRefs) {
      const ruleSet = verifiedRuleByRef.get(task4DigestRefKey(ruleRef));
      if (ruleSet === undefined) task4FailContract("checkpoint_binding");
      if (ruleSet.project_id !== item.binding.project_id || ruleSet.locale !== item.context.payload.locale) {
        task4FailContract("scope_mismatch");
      }
      const permittedRuleSourceKeys = new Set(item.ruleSourceRefs.map(task4DigestRefKey));
      if (ruleSet.source_refs.some((sourceRef) => !permittedRuleSourceKeys.has(task4DigestRefKey(sourceRef)))) {
        task4FailContract("checkpoint_binding");
      }
    }
  }
  const globalAcceptanceRefs = unions(derived.map((item) => item.acceptanceRefs));
  const globalRuleRefs = unions(derived.map((item) => item.ruleRefs));
  const globalRuleArtifacts = unions(derived.map((item) => item.ruleArtifactRefs));
  if (!task4CanonicalEqual(globalAcceptanceRefs, input.feature_universe.acceptance_criteria_refs)
    || !task4CanonicalEqual(globalRuleRefs, input.feature_universe.hard_rule_set_refs)
    || !task4CanonicalEqual(globalRuleArtifacts, input.feature_universe.hard_rule_set_artifact_refs)
    || !task4CanonicalEqual(verifiedRules.map((item) => item.ref), globalRuleRefs)
    || !task4CanonicalEqual(task4SortCanonical(verifiedRules.map((item) => item.artifactRef)), globalRuleArtifacts)) task4FailContract("checkpoint_binding");
  if (!task4CanonicalEqual(unions(derived.map((item) => item.featureMaterialRefs)), input.feature_universe.feature_material_refs)) {
    task4FailContract("checkpoint_binding");
  }
  if (!task4CanonicalEqual(input.feature_universe.generic_lexicon_ref, lexicon.ref)) task4FailContract("reference_binding");
  const unicodeRefs = [
    input.unicode_runtime.unicode_bundle.normalization.artifact_ref,
    input.unicode_runtime.unicode_bundle.casefold.artifact_ref,
    input.unicode_runtime.unicode_bundle.whitespace.artifact_ref,
    input.unicode_runtime.unicode_bundle.word_break.artifact_ref,
    input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref,
  ];
  if (!task4CanonicalEqual(task4SortCanonical(unicodeRefs), input.feature_universe.unicode_artifact_refs)) task4FailContract("unicode_runtime");
  if (!Array.isArray(input.artifact_bindings) || input.artifact_bindings.length === 0) task4FailContract("canonical_value");
  for (const binding of input.artifact_bindings) {
    task4AssertExactKeys(binding, ["role", "artifact_ref"]);
    task4VerifyArtifactRef(binding.artifact_ref);
  }
  const expectedBindings: FeatureArtifactBinding[] = ([
    { role: "feature_universe" as const, artifact_ref: universeArtifact },
    { role: "generic_lexicon" as const, artifact_ref: lexicon.ref },
    { role: "unicode_normalization" as const, artifact_ref: input.unicode_runtime.unicode_bundle.normalization.artifact_ref },
    { role: "unicode_casefold" as const, artifact_ref: input.unicode_runtime.unicode_bundle.casefold.artifact_ref },
    { role: "unicode_whitespace" as const, artifact_ref: input.unicode_runtime.unicode_bundle.whitespace.artifact_ref },
    { role: "unicode_word_break" as const, artifact_ref: input.unicode_runtime.unicode_bundle.word_break.artifact_ref },
    { role: "unicode_grapheme_break" as const, artifact_ref: input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref },
    { role: "runtime_profile" as const, artifact_ref: input.runtime_profile_ref },
    ...globalRuleArtifacts.map((artifact_ref) => ({ role: "hard_rule_set" as const, artifact_ref })),
  ] satisfies FeatureArtifactBinding[]).sort((left, right) => left.role.localeCompare(right.role, "en") || task4CanonicalCompare(left.artifact_ref, right.artifact_ref));
  if (!task4CanonicalEqual(input.artifact_bindings, expectedBindings)) task4FailContract("reference_binding");
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  const sourceArtifactRefs = task4SortCanonical(input.artifact_bindings.map((binding) => binding.artifact_ref)
    .filter((ref, index, all) => all.findIndex((candidate) => task4ArtifactRefKey(candidate) === task4ArtifactRefKey(ref)) === index));
  const input_digest = sha256Canonical({
    contract_version: "contentmd.task4-feature-profile-input/0.1.0",
    project_id: input.project_id,
    producer_manifest_digest: producer.producer_manifest_digest,
    producer_verification_ref: producer.producer_verification_ref,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
    feature_universe_manifest_digest: input.feature_universe.manifest_digest,
    checkpoint_set_refs: input.feature_universe.checkpoint_set_refs,
    global_scope_material_refs: globalScopeRefs,
    global_feature_material_refs: derivedMaterialRefs,
    global_acceptance_criteria_refs: globalAcceptanceRefs,
    global_hard_rule_set_refs: globalRuleRefs,
    global_hard_rule_set_artifact_refs: globalRuleArtifacts,
    artifact_bindings: input.artifact_bindings,
  });
  const record_id = `feature-profile.${sha256Canonical({
    contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
    project_id: input.project_id,
    input_digest,
  })}`;
  const profile = task4Immutable(finalizeRecord({
    record_id,
    schema_id: LEARNING_SCHEMA_IDS.featureProfile as typeof LEARNING_SCHEMA_IDS.featureProfile,
    schema_version: "0.1.0",
    record_version: 1,
    scope: { memory_scope: "project", project_id: input.project_id, resource_refs: [input.feature_universe.manifest_id], data_classes: ["learning_feature_profile"] },
    provenance: coreProvenance(input.artifact_bindings, producer.producer_verification_ref) as [ProvenanceRef, ...ProvenanceRef[]],
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: producer.schema_digest,
      code_digest: producer.code_digest,
      input_digest,
      authority_effect: "none",
      feature_profile_version: "rank-features/0.1.0",
      features: FEATURE_DEFINITIONS,
      source_artifact_refs: sourceArtifactRefs as [ArtifactRef, ...ArtifactRef[]],
      forbidden_input_fields: [...FORBIDDEN_INPUT_FIELDS] as [string, ...string[]],
      runtime_profile_ref: input.runtime_profile_ref,
      profile_state: "frozen",
    },
  }) as FeatureProfile);
  if (cacheKey !== null) FEATURE_PROFILE_CACHE.set(cacheKey, profile);
  return profile;
}

function containsSequence(tokens: readonly string[], sequence: readonly string[]): boolean {
  if (sequence.length === 0 || sequence.length > tokens.length) return false;
  for (let start = 0; start <= tokens.length - sequence.length; start += 1) {
    if (sequence.every((token, offset) => tokens[start + offset] === token)) return true;
  }
  return false;
}

function verifyGate(
  evaluation: CandidateRuleEvaluation,
  candidateRef: DigestRef,
  candidate: EvidenceSnapshot<"candidate", CandidatePayload>,
  runtime: Task4UnicodeRuntime,
): { ruleRef: DigestRef; artifactRef: ArtifactRef; gateRef: DigestRef; gate: CandidateEligibilityGate } {
  task4AssertExactKeys(evaluation, ["candidate_rule_set", "candidate_rule_set_artifact", "eligibility_gate"]);
  const source = verifyRuleSource({
    candidate_rule_set: evaluation.candidate_rule_set,
    candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
  }, runtime);
  const gate = evaluation.eligibility_gate;
  task4AssertExactKeys(gate, [
    "contract_version", "gate_id", "candidate_ref", "rule_set_ref", "rule_set_artifact_ref", "unicode_runtime_digest",
    "findings", "hard_rule_status", "prohibited_claim_status", "authority_effect", "gate_digest",
  ]);
  task4VerifyDigestRef(gate.candidate_ref);
  task4VerifyDigestRef(gate.rule_set_ref);
  task4VerifyArtifactRef(gate.rule_set_artifact_ref);
  if (gate.contract_version !== "contentmd.task4-candidate-eligibility-gate/0.1.0"
    || gate.authority_effect !== "none" || gate.unicode_runtime_digest !== runtime.runtime_digest
    || !task4RefsEqual(gate.candidate_ref, candidateRef) || !task4RefsEqual(gate.rule_set_ref, source.ref)
    || !task4CanonicalEqual(gate.rule_set_artifact_ref, source.artifactRef)) task4FailContract("reference_binding");
  const tokens = task4WordTokens(candidate.payload.expression, runtime);
  const graphemes = task4GraphemeCount(candidate.payload.expression, runtime);
  const sourceKeys = new Set(candidate.source_refs.map(task4DigestRefKey));
  const findings: CandidateRuleFinding[] = [];
  for (const rule of evaluation.candidate_rule_set.rules) {
    let failed = false;
    if (rule.rule_kind === "forbidden_token_sequence") failed = containsSequence(tokens, rule.tokens);
    else if (rule.rule_kind === "required_token_sequence") failed = !containsSequence(tokens, rule.tokens);
    else if (rule.rule_kind === "grapheme_count") failed = (rule.minimum !== null && graphemes < rule.minimum)
      || (rule.maximum !== null && graphemes > rule.maximum);
    else if (rule.rule_kind === "required_source_ref") failed = !sourceKeys.has(task4DigestRefKey(rule.source_ref));
    else failed = sourceKeys.has(task4DigestRefKey(rule.source_ref));
    if (failed) findings.push({ rule_id: rule.rule_id, failure_class: rule.failure_class });
  }
  const hard_rule_status = findings.some((finding) => finding.failure_class === "hard_rule") ? "fail" : "pass";
  const prohibited_claim_status = findings.some((finding) => finding.failure_class === "prohibited_claim") ? "hit" : "clear";
  const identity = {
    contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0" as const,
    candidate_ref: candidateRef,
    rule_set_ref: source.ref,
    rule_set_artifact_ref: source.artifactRef,
    unicode_runtime_digest: runtime.runtime_digest,
    findings,
    hard_rule_status,
    prohibited_claim_status,
    authority_effect: "none" as const,
  };
  const gate_id = `candidate-eligibility-gate.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, gate_id };
  const expected = { ...withoutDigest, gate_digest: sha256Canonical(withoutDigest) };
  if (!task4CanonicalEqual(gate, expected)) task4FailContract("reference_binding");
  return { ruleRef: source.ref, artifactRef: source.artifactRef, gateRef: objectRef(gate), gate };
}

function ratio(materials: readonly FeatureMaterial[], satisfied: ReadonlySet<string>): [number, number] {
  if (materials.length === 0) return [0, 1];
  const count = materials.filter((material) => satisfied.has(task4DigestRefKey(objectRef(material)))).length;
  return [Math.min(1, Math.max(0, count / materials.length)), 0];
}

function task4Provenance(values: readonly Task4ProvenanceRef[]): [Task4ProvenanceRef, ...Task4ProvenanceRef[]] {
  const sorted = task4SortCanonical(values);
  if (sorted.length === 0 || new Set(sorted.map(canonicalJson)).size !== sorted.length) task4FailContract("provenance");
  return sorted as [Task4ProvenanceRef, ...Task4ProvenanceRef[]];
}

function ineligibleDiagnostic(
  reason: CandidateFeatureExclusion,
  input: CandidateVectorizationInput,
  bindings: {
    candidateRef: DigestRef;
    profileRef: DigestRef;
    checkpointRef: DigestRef;
    universeRef: DigestRef;
    universeArtifactRef: ArtifactRef;
    globalScopeRefs: DigestRef[];
    materialRefs: DigestRef[];
    acceptanceRefs: DigestRef[];
    graphemeRefs: DigestRef[];
    ruleRefs: DigestRef[];
    ruleArtifactRefs: ArtifactRef[];
    gateRefs: DigestRef[];
    producerManifestDigest: string;
    producerVerificationRef: DigestRef | null;
  },
): CandidateFeatureResult {
  const blocking_evidence = reason === "quarantined_source_class" ? task4SortCanonical(input.blocking_evidence) : [];
  const diagnostic_digest = sha256Canonical({
    contract_version: "contentmd.task4-candidate-feature-diagnostic/0.1.0",
    candidate_ref: bindings.candidateRef,
    reason,
    profile_ref: bindings.profileRef,
    checkpoint_set_ref: bindings.checkpointRef,
    feature_universe_ref: bindings.universeRef,
    feature_universe_artifact_ref: bindings.universeArtifactRef,
    global_scope_material_refs: bindings.globalScopeRefs,
    selected_binding_feature_material_refs: bindings.materialRefs,
    selected_binding_acceptance_criteria_refs: bindings.acceptanceRefs,
    grapheme_constraint_refs: bindings.graphemeRefs,
    selected_binding_candidate_rule_set_refs: bindings.ruleRefs,
    selected_binding_candidate_rule_set_artifact_refs: bindings.ruleArtifactRefs,
    selected_binding_eligibility_gate_refs: bindings.gateRefs,
    blocking_evidence,
    producer_manifest_digest: bindings.producerManifestDigest,
    producer_verification_ref: bindings.producerVerificationRef,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
  });
  return task4Immutable({
    status: "ineligible",
    candidate_ref: bindings.candidateRef,
    reason,
    grapheme_constraint_refs: bindings.graphemeRefs,
    diagnostic_digest,
  });
}

function verifyVectorUniverseBindings(
  input: CandidateVectorizationInput,
  universeArtifact: ArtifactRef,
  lexiconRef: ArtifactRef,
): void {
  verifyFeatureProfileRecord(input.profile);
  const expectedArtifacts = task4SortCanonical([
    universeArtifact,
    lexiconRef,
    input.unicode_runtime.unicode_bundle.normalization.artifact_ref,
    input.unicode_runtime.unicode_bundle.casefold.artifact_ref,
    input.unicode_runtime.unicode_bundle.whitespace.artifact_ref,
    input.unicode_runtime.unicode_bundle.word_break.artifact_ref,
    input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref,
    input.unicode_runtime.runtime_profile.artifact_ref,
    ...input.feature_universe.hard_rule_set_artifact_refs,
  ]);
  if (input.profile.scope.project_id !== input.feature_universe.project_id
    || !task4CanonicalEqual(input.profile.scope.resource_refs, [input.feature_universe.manifest_id])
    || !task4CanonicalEqual(input.profile.payload.runtime_profile_ref, input.unicode_runtime.runtime_profile.artifact_ref)
    || !task4CanonicalEqual(input.profile.payload.source_artifact_refs, expectedArtifacts)) task4FailContract("feature_profile_binding");
}

function selectedVectorBinding(
  input: CandidateVectorizationInput,
): FeatureContextBinding | undefined {
  return input.feature_universe.context_bindings.find((binding) =>
    task4RefsEqual(binding.context_ref, input.candidate.payload.context_ref));
}

export function task4VerifyVectorReferenceStage(input: CandidateVectorizationInput): void {
  task4VerifyProfileReferenceStage(input.profile_input);
  try {
    task2ValidateCandidateSnapshot(input.candidate);
  } catch {
    if (!task4ContainsNonfinite(input.candidate)) task4FailContract("reference_binding");
    try {
      task2ValidateCandidateSnapshot(task4NumericSanitized(input.candidate) as typeof input.candidate);
    } catch {
      task4FailContract("reference_binding");
    }
  }
  const candidateRef = task2SnapshotRef(input.candidate);
  for (const evaluation of input.rule_evaluations) {
    verifyGate(evaluation, candidateRef, input.candidate, input.unicode_runtime);
  }
  const selected = selectedVectorBinding(input);
  if (selected !== undefined) {
    const targetStored = input.scope_material_sources.find((scope) =>
      task4RefsEqual(objectRef(scope), selected.target_scope_ref));
    const candidateStored = input.scope_material_sources.find((scope) =>
      task4RefsEqual(objectRef(scope), objectRef(input.candidate_scope)));
    if (targetStored === undefined || candidateStored === undefined
      || !task4CanonicalEqual(targetStored, input.target_scope)
      || !task4CanonicalEqual(candidateStored, input.candidate_scope)) {
      task4FailContract("reference_binding");
    }
  }
  for (const evidence of input.blocking_evidence) {
    if (!task4RefsEqual(evidence.candidate_ref, candidateRef)) task4FailContract("reference_binding");
  }
}

export function task4VerifyVectorScopeStage(input: CandidateVectorizationInput): void {
  task4VerifyProfileScopeStage(input.profile_input);
  const selected = selectedVectorBinding(input);
  if (selected === undefined) return;
  const checkpoint = input.checkpoint_set;
  const context = looseContextForBinding(checkpoint, selected);
  if (context === undefined) return;
  if (input.target_scope.scope_role !== "target"
    || input.candidate_scope.scope_role !== "candidate_origin"
    || input.target_scope.project_id !== selected.project_id
    || input.candidate_scope.project_id !== selected.project_id
    || !task4RefsEqual(objectRef(input.target_scope), selected.target_scope_ref)
    || !selected.permitted_candidate_scope_refs.some((ref) =>
      task4RefsEqual(ref, objectRef(input.candidate_scope)))
    || input.target_scope.product_area !== context.payload.product_area
    || input.target_scope.journey_state !== context.payload.journey_state
    || input.target_scope.channel !== context.payload.channel
    || input.target_scope.locale !== context.payload.locale
    || input.candidate_scope.locale !== context.payload.locale) task4FailContract("scope_mismatch");
  const targetKeys = new Set(input.feature_universe.target_scope_refs.map(task4DigestRefKey));
  const candidateKeys = new Set(input.feature_universe.permitted_candidate_scope_refs.map(task4DigestRefKey));
  if (input.scope_material_sources.some((scope) => {
    const key = task4DigestRefKey(objectRef(scope));
    return scope.project_id !== input.feature_universe.project_id
      || (targetKeys.has(key) && scope.scope_role !== "target")
      || (candidateKeys.has(key) && scope.scope_role !== "candidate_origin")
      || (!targetKeys.has(key) && !candidateKeys.has(key));
  })) task4FailContract("scope_mismatch");
  if (input.materials.some((material) =>
    material.project_id !== selected.project_id || material.locale !== context.payload.locale)) {
    task4FailContract("scope_mismatch");
  }
  if (input.rule_evaluations.some(({ candidate_rule_set }) =>
    candidate_rule_set.project_id !== selected.project_id
    || candidate_rule_set.locale !== context.payload.locale)) task4FailContract("scope_mismatch");
  const lexicon = JSON.parse(input.generic_lexicon.bytes_utf8) as GenericLexicon;
  if (lexicon.locale !== context.payload.locale) task4FailContract("scope_mismatch");
}

export function task4VerifyVectorCheckpointStage(input: CandidateVectorizationInput): void {
  task4VerifyProfileCheckpointStage(input.profile_input);
  verifyCheckpointOnce(input.checkpoint_set);
  const selected = selectedVectorBinding(input);
  const checkpointRef = task3CheckpointSetRef(input.checkpoint_set);
  if (selected === undefined || !task4RefsEqual(selected.checkpoint_set_ref, checkpointRef)) {
    task4FailContract("checkpoint_binding");
  }
  const candidateRef = task2SnapshotRef(input.candidate);
  const candidateEntries = input.checkpoint_set.feature_source_manifest.entries.filter((entry) =>
    task4RefsEqual(entry.source_ref, candidateRef));
  if (candidateEntries.length !== 1
    || (candidateEntries[0]!.source_role !== "candidate_a" && candidateEntries[0]!.source_role !== "candidate_b")
    || candidateEntries[0]!.material.material_kind !== "task2_evidence_snapshot"
    || !task4CanonicalEqual(candidateEntries[0]!.material.value, input.candidate)) {
    task4FailContract("checkpoint_binding");
  }
  const materialRefs = input.materials.map(objectRef);
  const scopeRefs = input.scope_material_sources.map(objectRef);
  const globalScopeRefs = unions(input.feature_universe.context_bindings.flatMap(
    (binding) => [[binding.target_scope_ref], binding.permitted_candidate_scope_refs],
  ));
  if (!task4CanonicalEqual(scopeRefs, task4SortCanonical(scopeRefs))
    || !task4CanonicalEqual(scopeRefs, globalScopeRefs)) {
    task4FailContract("checkpoint_binding");
  }
  if (!task4CanonicalEqual(materialRefs, task4SortCanonical(materialRefs))
    || !task4CanonicalEqual(materialRefs, selected.feature_material_refs)) {
    task4FailContract("checkpoint_binding");
  }
  const acceptanceRefs = input.acceptance_criteria_sources.map(task2SnapshotRef);
  if (!task4CanonicalEqual(acceptanceRefs, task4SortCanonical(acceptanceRefs))
    || !task4CanonicalEqual(acceptanceRefs, selected.acceptance_criteria_refs)) {
    task4FailContract("checkpoint_binding");
  }
  const ruleRefs = input.rule_evaluations.map(({ candidate_rule_set }) => objectRef(candidate_rule_set));
  if (!task4CanonicalEqual(ruleRefs, selected.candidate_rule_set_refs)) {
    task4FailContract("checkpoint_binding");
  }
  const acceptanceEntries = checkpointEntries(input.checkpoint_set);
  for (const snapshot of input.acceptance_criteria_sources) {
    const entry = acceptanceEntries.get(task4DigestRefKey(task2SnapshotRef(snapshot)));
    if (entry === undefined || entry.material.material_kind !== "task2_evidence_snapshot"
      || !task4CanonicalEqual(entry.material.value, snapshot)) {
      task4FailContract("checkpoint_binding");
    }
  }
  const ruleArtifacts = new Map(input.rule_evaluations.map((evaluation) => {
    const source = verifyRuleSource({
      candidate_rule_set: evaluation.candidate_rule_set,
      candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
    }, input.unicode_runtime);
    return [task4DigestRefKey(source.ref), source.artifactRef] as const;
  }));
  const derived = deriveBinding(
    selected,
    new Map([[task4DigestRefKey(checkpointRef), input.checkpoint_set]]),
    ruleArtifacts,
  );
  const ruleArtifactRefs = task4SortCanonical([...ruleArtifacts.values()]);
  if (!task4CanonicalEqual(materialRefs, derived.featureMaterialRefs)
    || !task4CanonicalEqual(acceptanceRefs, derived.acceptanceRefs)
    || !task4CanonicalEqual(ruleRefs, derived.ruleRefs)
    || !task4CanonicalEqual(ruleArtifactRefs, derived.ruleArtifactRefs)
    || new Set(ruleRefs.map(task4DigestRefKey)).size !== ruleRefs.length) {
    task4FailContract("checkpoint_binding");
  }
}

export function task4VerifyVectorFeatureProfileStage(
  input: CandidateVectorizationInput,
  replayedProfile: FeatureProfile,
): void {
  if (!task4CanonicalEqual(
    featureProfileNonProvenanceView(replayedProfile),
    featureProfileNonProvenanceView(input.profile),
  )) task4FailContract("feature_profile_binding");
  if (!task4CanonicalEqual(input.profile_input.unicode_runtime, input.unicode_runtime)
    || !task4CanonicalEqual(input.profile_input.feature_universe, input.feature_universe)
    || !task4CanonicalEqual(input.profile_input.feature_universe_artifact, input.feature_universe_artifact)
    || !task4CanonicalEqual(input.profile_input.scope_material_sources, input.scope_material_sources)
    || !task4CanonicalEqual(input.profile_input.generic_lexicon, input.generic_lexicon)
    || !input.profile_input.checkpoint_sets.some((checkpoint) =>
      task4CanonicalEqual(checkpoint, input.checkpoint_set))
    || input.materials.some((material) =>
      !input.profile_input.feature_material_sources.some((source) => task4CanonicalEqual(source, material)))
    || input.rule_evaluations.some((evaluation) =>
      !input.profile_input.hard_rule_sources.some((source) => task4CanonicalEqual(source, {
        candidate_rule_set: evaluation.candidate_rule_set,
        candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
      })))) {
    task4FailContract("feature_profile_binding");
  }
}

export function task4VerifyVectorQuarantineStage(input: CandidateVectorizationInput): void {
  if (input.blocking_evidence.some((evidence) =>
    Object.hasOwn(evidence, "expression") || Object.hasOwn(evidence, "expression_digest"))) {
    task4FailContract("quarantined_expression_present");
  }
}

export function vectorizeCandidate(input: CandidateVectorizationInput): CandidateFeatureResult {
  task4TopLevelGate(input, VECTOR_KEYS);
  task4AssertCanonicalGraph(input);
  const suppliedInput = input;
  input = task4WithoutForbiddenInputFields(input);
  preflightVectorInputShape(input);
  const cacheKey = task4CacheKey(suppliedInput);
  const cached = cacheKey === null ? undefined : CANDIDATE_VECTOR_CACHE.get(cacheKey);
  if (cached !== undefined) return cached;
  let stagedProfile!: FeatureProfile;
  let producer!: ReturnType<typeof verifyTask4Producer>;
  task4RunStagePlan({
    canonical_value: () => {},
    producer_witness: () => {
      producer = verifyTask4Producer(input.producer, "candidate-feature-vector");
      verifyTask4Producer(input.profile_input.producer, "feature-profile");
    },
    unicode_runtime: () => {
      task4VerifyVectorUnicodeStage(input);
    },
    digest: () => { task4VerifyCompleteDigestGraph(input); },
    reference_binding: () => { task4VerifyVectorReferenceStage(input); },
    scope_mismatch: () => { task4VerifyVectorScopeStage(input); },
    checkpoint_binding: () => { task4VerifyVectorCheckpointStage(input); },
    feature_profile_binding: () => {
      stagedProfile = task4WithDeferredNumeric(() => createFeatureProfile(input.profile_input));
      task4VerifyVectorFeatureProfileStage(input, stagedProfile);
    },
    provenance: () => {
      if (!task4CanonicalEqual(stagedProfile.provenance, input.profile.provenance)) {
        task4FailContract("provenance");
      }
    },
    quarantined_expression_present: () => { task4AssertNoQuarantinedExpressions(suppliedInput); },
    forbidden_input_field: () => { task4AssertNoForbiddenInputFields(suppliedInput); },
    numeric_nonfinite: () => { task4AssertFiniteNumbers(suppliedInput); },
  });
  assertFeatureUniverse(input.feature_universe);
  const universeArtifact = verifyUniverseArtifact(input.feature_universe, input.feature_universe_artifact);
  const lexicon = verifyLexicon(input.generic_lexicon, input.unicode_runtime);
  verifyVectorUniverseBindings(input, universeArtifact, lexicon.ref);
  verifyCheckpointOnce(input.checkpoint_set);
  try { task2ValidateCandidateSnapshot(input.candidate); } catch { task4FailContract("reference_binding"); }
  const candidateRef = task2SnapshotRef(input.candidate);
  const candidateEntries = input.checkpoint_set.feature_source_manifest.entries.filter((entry) =>
    task4RefsEqual(entry.source_ref, candidateRef));
  if (candidateEntries.length !== 1
    || (candidateEntries[0]!.source_role !== "candidate_a" && candidateEntries[0]!.source_role !== "candidate_b")
    || candidateEntries[0]!.material.material_kind !== "task2_evidence_snapshot"
    || !task4CanonicalEqual(candidateEntries[0]!.material.value, input.candidate)) {
    task4FailContract("checkpoint_binding");
  }
  const profileReference = profileRef(input.profile);
  const checkpointRef = task3CheckpointSetRef(input.checkpoint_set);
  const universeRef = featureUniverseRef(input.feature_universe);
  const selected = input.feature_universe.context_bindings.find((binding) => task4RefsEqual(binding.context_ref, input.candidate.payload.context_ref));
  if (selected === undefined || !task4RefsEqual(selected.checkpoint_set_ref, checkpointRef)) task4FailContract("checkpoint_binding");
  const ruleArtifactIndex = new Map<string, ArtifactRef>();
  for (const evaluation of input.rule_evaluations) {
    const source = verifyRuleSource({
      candidate_rule_set: evaluation.candidate_rule_set,
      candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
    }, input.unicode_runtime);
    if (!input.profile_input.hard_rule_sources.some((profileSource) => task4CanonicalEqual(profileSource, {
      candidate_rule_set: evaluation.candidate_rule_set,
      candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
    }))) task4FailContract("feature_profile_binding");
    ruleArtifactIndex.set(task4DigestRefKey(source.ref), source.artifactRef);
  }
  const derived = deriveBinding(selected, new Map([[task4DigestRefKey(checkpointRef), input.checkpoint_set]]), ruleArtifactIndex);
  if (!Array.isArray(input.scope_material_sources) || input.scope_material_sources.length === 0) task4FailContract("canonical_value");
  input.scope_material_sources.forEach(assertScopeMaterial);
  const scopeRefs = input.scope_material_sources.map(objectRef);
  const globalScopeRefs = unions(input.feature_universe.context_bindings.flatMap((binding) => [[binding.target_scope_ref], binding.permitted_candidate_scope_refs]));
  if (!task4CanonicalEqual(scopeRefs, task4SortCanonical(scopeRefs))
    || !task4CanonicalEqual(scopeRefs, globalScopeRefs)) task4FailContract("checkpoint_binding");
  const targetKeys = new Set(input.feature_universe.target_scope_refs.map(task4DigestRefKey));
  const candidateKeys = new Set(input.feature_universe.permitted_candidate_scope_refs.map(task4DigestRefKey));
  for (const scope of input.scope_material_sources) {
    const key = task4DigestRefKey(objectRef(scope));
    if (scope.project_id !== input.feature_universe.project_id
      || (targetKeys.has(key) && scope.scope_role !== "target")
      || (candidateKeys.has(key) && scope.scope_role !== "candidate_origin")
      || (!targetKeys.has(key) && !candidateKeys.has(key))) task4FailContract("scope_mismatch");
  }
  const targetStored = input.scope_material_sources.find((scope) => task4RefsEqual(objectRef(scope), selected.target_scope_ref));
  const candidateStored = input.scope_material_sources.find((scope) => task4RefsEqual(objectRef(scope), objectRef(input.candidate_scope)));
  if (targetStored === undefined || candidateStored === undefined
    || !task4CanonicalEqual(targetStored, input.target_scope) || !task4CanonicalEqual(candidateStored, input.candidate_scope)) {
    task4FailContract("reference_binding");
  }
  if (input.target_scope.scope_role !== "target" || input.candidate_scope.scope_role !== "candidate_origin"
    || !task4RefsEqual(objectRef(input.target_scope), selected.target_scope_ref)
    || !selected.permitted_candidate_scope_refs.some((ref) => task4RefsEqual(ref, objectRef(input.candidate_scope)))
    || input.target_scope.project_id !== selected.project_id || input.candidate_scope.project_id !== selected.project_id
    || input.target_scope.locale !== derived.context.payload.locale || input.candidate_scope.locale !== derived.context.payload.locale
    || lexicon.value.locale !== derived.context.payload.locale) task4FailContract("scope_mismatch");
  if (!Array.isArray(input.materials)) task4FailContract("canonical_value");
  input.materials.forEach(assertFeatureMaterial);
  const materialRefs = input.materials.map(objectRef);
  if (!task4CanonicalEqual(materialRefs, task4SortCanonical(materialRefs))
    || !task4CanonicalEqual(materialRefs, derived.featureMaterialRefs)
    || !task4CanonicalEqual(materialRefs, selected.feature_material_refs)) task4FailContract("checkpoint_binding");
  if (input.materials.some((material) => material.project_id !== selected.project_id || material.locale !== derived.context.payload.locale)) {
    task4FailContract("scope_mismatch");
  }
  if (!Array.isArray(input.acceptance_criteria_sources) || input.acceptance_criteria_sources.length === 0) task4FailContract("canonical_value");
  input.acceptance_criteria_sources.forEach((snapshot) => {
    const entry = checkpointEntries(input.checkpoint_set).get(task4DigestRefKey(task2SnapshotRef(snapshot)));
    if (entry === undefined || entry.material.material_kind !== "task2_evidence_snapshot"
      || !task4CanonicalEqual(entry.material.value, snapshot)) task4FailContract("checkpoint_binding");
  });
  const acceptanceRefs = input.acceptance_criteria_sources.map(task2SnapshotRef);
  if (!task4CanonicalEqual(acceptanceRefs, task4SortCanonical(acceptanceRefs))
    || !task4CanonicalEqual(acceptanceRefs, derived.acceptanceRefs)) task4FailContract("checkpoint_binding");
  if (!Array.isArray(input.rule_evaluations) || input.rule_evaluations.length === 0) task4FailContract("canonical_value");
  const gates = input.rule_evaluations.map((evaluation) => verifyGate(evaluation, candidateRef, input.candidate, input.unicode_runtime));
  if (!task4CanonicalEqual(gates.map((gate) => gate.ruleRef), derived.ruleRefs)
    || !task4CanonicalEqual(task4SortCanonical(gates.map((gate) => gate.artifactRef)), derived.ruleArtifactRefs)
    || new Set(gates.map((gate) => task4DigestRefKey(gate.ruleRef))).size !== gates.length) task4FailContract("checkpoint_binding");
  if (!Array.isArray(input.blocking_evidence)) task4FailContract("canonical_value");
  for (const item of input.blocking_evidence) {
    if (Object.hasOwn(item, "expression") || Object.hasOwn(item, "expression_digest")) {
      task4FailContract("quarantined_expression_present");
    }
    task4AssertExactKeys(item, ["candidate_ref", "evidence_ref", "source_class", "purpose", "contains_expression"]);
    task4VerifyDigestRef(item.candidate_ref);
    task4VerifyDigestRef(item.evidence_ref);
    if (!task4RefsEqual(item.candidate_ref, candidateRef) || !QUARANTINED.includes(item.source_class)
      || item.purpose !== "feature_exclusion_only" || item.contains_expression !== false) task4FailContract("reference_binding");
  }
  canonicalSet(input.blocking_evidence);
  const graphemeSources = input.acceptance_criteria_sources.filter((snapshot) => snapshot.payload.constraint.constraint_kind === "grapheme_count");
  const graphemeRefs = task4SortCanonical(graphemeSources.map(task2SnapshotRef));
  const minima = graphemeSources.flatMap((snapshot) => snapshot.payload.constraint.constraint_kind === "grapheme_count"
    && snapshot.payload.constraint.minimum !== null ? [snapshot.payload.constraint.minimum] : []);
  const maxima = graphemeSources.flatMap((snapshot) => snapshot.payload.constraint.constraint_kind === "grapheme_count"
    && snapshot.payload.constraint.maximum !== null ? [snapshot.payload.constraint.maximum] : []);
  const minimum = minima.length === 0 ? null : Math.max(...minima);
  const maximum = maxima.length === 0 ? null : Math.min(...maxima);
  const gateRefs = gates.map((gate) => gate.gateRef);
  const diagnostics = {
    candidateRef, profileRef: profileReference, checkpointRef, universeRef, universeArtifactRef: universeArtifact,
    globalScopeRefs, materialRefs, acceptanceRefs, graphemeRefs, ruleRefs: gates.map((gate) => gate.ruleRef),
    ruleArtifactRefs: gates.map((gate) => gate.artifactRef), gateRefs,
    producerManifestDigest: producer.producer_manifest_digest, producerVerificationRef: producer.producer_verification_ref,
  };
  task4AssertNoForbiddenInputFields(suppliedInput);
  task4AssertFiniteNumbers(suppliedInput);
  if (input.blocking_evidence.length > 0) {
    const result = ineligibleDiagnostic("quarantined_source_class", input, diagnostics);
    if (cacheKey !== null) CANDIDATE_VECTOR_CACHE.set(cacheKey, result);
    return result;
  }
  if ((minimum !== null && maximum !== null && minimum > maximum)
    || gates.some((gate) => gate.gate.hard_rule_status === "fail")) {
    const result = ineligibleDiagnostic("hard_rule_failed", input, diagnostics);
    if (cacheKey !== null) CANDIDATE_VECTOR_CACHE.set(cacheKey, result);
    return result;
  }
  if (gates.some((gate) => gate.gate.prohibited_claim_status === "hit")) {
    const result = ineligibleDiagnostic("prohibited_claim_hit", input, diagnostics);
    if (cacheKey !== null) CANDIDATE_VECTOR_CACHE.set(cacheKey, result);
    return result;
  }
  const tokens = task4WordTokens(input.candidate.payload.expression, input.unicode_runtime);
  if (tokens.length === 0) {
    const result = ineligibleDiagnostic("empty_word_tokens", input, diagnostics);
    if (cacheKey !== null) CANDIDATE_VECTOR_CACHE.set(cacheKey, result);
    return result;
  }
  const grapheme_count = task4GraphemeCount(input.candidate.payload.expression, input.unicode_runtime);
  if (grapheme_count < 1) task4FailContract("unicode_runtime");
  if (input.blocking_evidence.length !== 0) task4FailContract("reference_binding");
  const candidateSources = new Set(input.candidate.source_refs.map(task4DigestRefKey));
  const satisfied = new Set<string>();
  const normalizedForms = new Map<string, string[][]>();
  for (const material of input.materials) {
    const ref = objectRef(material);
    let hit = false;
    if (["required_fact", "recovery_action", "supporting_evidence"].includes(material.material_kind)) {
      hit = candidateSources.has(task4DigestRefKey(ref)) || material.source_refs.some((sourceRef) => candidateSources.has(task4DigestRefKey(sourceRef)));
    } else {
      const forms = material.match_forms.map((form) => task4WordTokens(form, input.unicode_runtime));
      if (forms.some((form) => form.length === 0)
        || new Set(forms.map(canonicalJson)).size !== forms.length) task4FailContract("unicode_runtime");
      normalizedForms.set(task4DigestRefKey(ref), forms);
      hit = forms.some((form) => containsSequence(tokens, form));
    }
    if (hit) satisfied.add(task4DigestRefKey(ref));
  }
  const byKind = (kind: FeatureMaterial["material_kind"]): FeatureMaterial[] => input.materials.filter((material) => material.material_kind === kind);
  const required = ratio(byKind("required_fact"), satisfied);
  const recovery = ratio(byKind("recovery_action"), satisfied);
  const terminology = ratio(byKind("approved_terminology"), satisfied);
  const entity = ratio(byKind("context_entity"), satisfied);
  const action = ratio(byKind("context_action"), satisfied);
  const evidence = ratio(byKind("supporting_evidence"), satisfied);
  const coveredGeneric = new Set<number>();
  for (const entry of lexicon.value.entries) {
    for (let start = 0; start <= tokens.length - entry.tokens.length; start += 1) {
      if (entry.tokens.every((token, offset) => tokens[start + offset] === token)) {
        entry.tokens.forEach((_token, offset) => coveredGeneric.add(start + offset));
      }
    }
  }
  const genericDensity = Math.min(1, Math.max(0, coveredGeneric.size / tokens.length));
  let lengthDistance = 0;
  const lengthMissing = minimum === null && maximum === null ? 1 : 0;
  if (lengthMissing === 0) {
    const denominator = Math.max(1, minimum ?? 0, maximum ?? 0);
    if (minimum !== null && grapheme_count < minimum) lengthDistance = (minimum - grapheme_count) / denominator;
    else if (maximum !== null && grapheme_count > maximum) lengthDistance = (grapheme_count - maximum) / denominator;
    lengthDistance = Math.min(1, Math.max(0, lengthDistance));
  }
  const values: CandidateFeatureVector["values"] = [
    input.candidate_scope.project_id === input.target_scope.project_id ? 1 : 0,
    input.candidate_scope.product_area === input.target_scope.product_area ? 1 : 0,
    input.candidate_scope.journey_state === input.target_scope.journey_state ? 1 : 0,
    input.candidate_scope.channel === input.target_scope.channel ? 1 : 0,
    input.candidate_scope.locale === input.target_scope.locale ? 1 : 0,
    input.candidate_scope.risk === input.target_scope.risk ? 1 : 0,
    required[0], required[1], recovery[0], recovery[1], terminology[0], terminology[1], entity[0], entity[1],
    action[0], action[1], evidence[0], evidence[1], genericDensity, lengthDistance, lengthMissing,
  ];
  if (values.some((value) => !Number.isFinite(value))) task4FailContract("numeric_nonfinite");
  const satisfiedRefs = task4SortCanonical(input.materials.filter((material) => satisfied.has(task4DigestRefKey(objectRef(material)))).map(objectRef));
  const provenanceValues: Task4ProvenanceRef[] = [
    { subject_kind: "digest_ref", ref: candidateRef, relationship: "candidate_subject" },
    { subject_kind: "digest_ref", ref: checkpointRef, relationship: "checkpoint_binding" },
    ...acceptanceRefs.map((ref) => ({ subject_kind: "digest_ref" as const, ref, relationship: "checkpoint_binding" as const })),
    ...gates.map((gate) => ({ subject_kind: "digest_ref" as const, ref: gate.ruleRef, relationship: "checkpoint_binding" as const })),
    { subject_kind: "digest_ref", ref: profileReference, relationship: "feature_profile" },
    { subject_kind: "digest_ref", ref: objectRef(input.target_scope), relationship: "scope_projection" },
    { subject_kind: "digest_ref", ref: objectRef(input.candidate_scope), relationship: "scope_projection" },
    { subject_kind: "digest_ref", ref: universeRef, relationship: "feature_universe" },
    { subject_kind: "artifact_ref", ref: universeArtifact, relationship: "feature_universe" },
    ...materialRefs.map((ref) => ({ subject_kind: "digest_ref" as const, ref, relationship: "feature_material" as const })),
    { subject_kind: "artifact_ref", ref: lexicon.ref, relationship: "runtime_artifact" },
    { subject_kind: "artifact_ref", ref: input.unicode_runtime.runtime_profile.artifact_ref, relationship: "runtime_artifact" },
    ...[
      input.unicode_runtime.unicode_bundle.normalization.artifact_ref,
      input.unicode_runtime.unicode_bundle.casefold.artifact_ref,
      input.unicode_runtime.unicode_bundle.whitespace.artifact_ref,
      input.unicode_runtime.unicode_bundle.word_break.artifact_ref,
      input.unicode_runtime.unicode_bundle.grapheme_break.artifact_ref,
    ].map((ref) => ({ subject_kind: "artifact_ref" as const, ref, relationship: "runtime_artifact" as const })),
  ];
  if (producer.producer_verification_ref !== null) provenanceValues.push({
    subject_kind: "digest_ref", ref: producer.producer_verification_ref, relationship: "producer_verification",
  });
  const provenance = task4Provenance(provenanceValues);
  const featureProfileConstructionInputDigest = task4ContainsNonfinite(input.profile_input)
    ? "0".repeat(64)
    : sha256Canonical(input.profile_input);
  const input_digest = sha256Canonical({
    contract_version: "contentmd.task4-candidate-feature-input/0.1.0",
    candidate_ref: candidateRef,
    context_ref: selected.context_ref,
    target_scope_ref: selected.target_scope_ref,
    candidate_scope_ref: objectRef(input.candidate_scope),
    checkpoint_set_ref: checkpointRef,
    feature_profile_ref: profileReference,
    feature_universe_ref: universeRef,
    feature_universe_artifact_ref: universeArtifact,
    global_scope_material_refs: globalScopeRefs,
    feature_materials: input.materials,
    selected_binding_feature_material_refs: materialRefs,
    generic_lexicon_ref: lexicon.ref,
    selected_binding_acceptance_criteria_refs: acceptanceRefs,
    selected_binding_candidate_rule_set_refs: gates.map((gate) => gate.ruleRef),
    selected_binding_candidate_rule_set_artifact_refs: gates.map((gate) => gate.artifactRef),
    selected_binding_eligibility_gate_refs: gateRefs,
    producer_manifest_digest: producer.producer_manifest_digest,
    producer_verification_ref: producer.producer_verification_ref,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
    feature_profile_construction_input_digest: featureProfileConstructionInputDigest,
  });
  const vectorBody = {
    record_mode: "development_fixture" as const,
    project_id: selected.project_id,
    candidate_ref: candidateRef,
    context_ref: selected.context_ref,
    target_scope_ref: selected.target_scope_ref,
    target_scope_role: "target" as const,
    checkpoint_set_ref: checkpointRef,
    feature_profile_ref: profileReference,
    feature_universe_ref: universeRef,
    runtime_profile_ref: input.unicode_runtime.runtime_profile.artifact_ref,
    unicode_runtime_digest: input.unicode_runtime.runtime_digest,
    input_digest,
    feature_order: TASK4_FEATURE_ORDER,
    values,
    satisfied_material_refs: satisfiedRefs,
    grapheme_constraint_refs: graphemeRefs,
    grapheme_count,
    token_count: tokens.length,
    provenance,
    authority_effect: "none" as const,
  };
  const identity = {
    contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
    ...vectorBody,
  };
  const vector_id = `candidate-feature-vector.${sha256Canonical(identity)}`;
  const withoutDigest = {
    contract_version: "contentmd.task4-candidate-feature-vector/0.1.0" as const,
    vector_id,
    ...vectorBody,
  };
  const result = task4Immutable({
    status: "eligible" as const,
    vector: { ...withoutDigest, vector_digest: sha256Canonical(withoutDigest) },
  });
  if (cacheKey !== null) CANDIDATE_VECTOR_CACHE.set(cacheKey, result);
  return result;
}
