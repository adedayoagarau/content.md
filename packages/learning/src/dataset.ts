import {
  canonicalJson,
  finalizeRecord,
  sha256Canonical,
  verifyRecordDigest,
  type ProvenanceRef,
  type RecordScope,
} from "@contentmd/core";
import {
  task2CompareRfc3339Instants,
  task2IsRfc3339,
} from "./feedback.js";
import {
  task2LineageLearningEligible,
  task2SnapshotRef,
} from "./qualification.js";
import {
  LEARNING_SCHEMA_IDS,
  type DatasetCounts,
  type DatasetExclusion,
  type DigestRef,
  type LearningDatasetManifest,
} from "./records.js";
import {
  Task3ContractError,
  deriveLeakageGroups,
  task3AssertCanonicalGraph,
  task3CheckpointSetRef,
  task3DescriptorDataValue,
  task3ObservationRef,
  task3RecordRef,
  task3RefsEqual,
  task3NormalizeExpression,
  task3PreflightDescriptorChildKeys,
  task3PreflightDescriptorArrayItemKeys,
  task3PreflightDescriptorProvenance,
  task3PreflightGlobalIntegrity,
  task3PreflightProducerShape,
  task3PreflightLeakageEvidenceShape,
  task3PreflightDatasetManifestShape,
  task3PreflightSealWitnessShape,
  task3PreflightTopLevelRecordMode,
  task3SortCanonical,
  task3SortProvenance,
  task3VerifyUnicodeBundle,
  verifyLeakageEvidenceSnapshot,
  verifyTask3Producer,
  type BlockingEvidenceRef,
  type DatasetExampleEvidence,
  type FeatureSourcePostCheckpointObservation,
  type LeakageEvidenceSnapshot,
  type Task3ProducerArtifactWitness,
  type VerifiedDatasetExample,
} from "./leakage.js";
import type { UnicodeArtifactBundle, VerifiedUnicodeArtifactBundle } from "./unicode-normalization.js";

export interface BuildLearningDatasetInput {
  record_mode: "development_fixture" | "official";
  evaluation_at: string;
  group_producer: Task3ProducerArtifactWitness;
  dataset_producer: Task3ProducerArtifactWitness;
  unicode_artifacts: UnicodeArtifactBundle;
  leakage_evidence: LeakageEvidenceSnapshot;
}

export interface DatasetBuildDiagnostics {
  contract_version: "contentmd.dataset-build-diagnostics/0.1.0";
  diagnostics_id: string;
  input_digest: string;
  submitted_examples: number;
  included_examples: number;
  excluded_examples: number;
  counts: DatasetCounts;
  threshold_results: [{ predicate: string; passed: boolean }, ...Array<{ predicate: string; passed: boolean }>];
  reason_codes: string[];
  issuance_disposition: "manifest_issued" | "manifest_unissued_structural_empty";
  diagnostics_digest: string;
}

export interface LearningDatasetBuildResult {
  groups: import("./records.js").LeakageGroupRecord[];
  manifest: LearningDatasetManifest | null;
  diagnostics: DatasetBuildDiagnostics;
}

export interface DatasetSealWitness {
  contract_version: "contentmd.dataset-seal-witness/0.1.0";
  source_dataset_ref: DigestRef;
  sealed_at: string;
  membership_digest: string;
  verification_mode: "development_fixture" | "readback_verified";
  verification_receipt: import("./feedback.js").VerificationReceiptRecord | null;
  seal_digest: string;
}

export interface SealLearningDatasetInput {
  record_mode: "development_fixture" | "official";
  producer: Task3ProducerArtifactWitness;
  source_manifest: LearningDatasetManifest;
  witness: DatasetSealWitness;
}

const DIGEST_PATTERN = /^[a-f0-9]{64}$/;
const RECORD_ID_PATTERN = /^[a-z][a-z0-9]*(?:[._-][a-z0-9]+)*$/;
const EXCLUSION_PRECEDENCE = [
  "record_not_active",
  "preference_not_admitted",
  "qualification_not_qualified",
  "eligibility_not_eligible",
  "objective_or_candidate_kind_mismatch",
  "scope_or_project_mismatch",
  "permission_not_current",
  "permission_not_effective",
  "permission_scope_or_subject_mismatch",
  "lineage_not_learning_eligible",
  "forbidden_source_class",
  "presentation_checkpoint_mismatch",
  "feature_source_after_checkpoint",
  "feature_source_not_manifested",
  "normalized_expression_empty",
  "leakage_relation_not_closed",
] as const;

function fail(suffix: string): never {
  throw new Task3ContractError(`task3_contract_invalid:${suffix}`);
}

function exactKeys(value: unknown, keys: readonly string[]): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)) fail("input_shape");
  const actual = Object.keys(value);
  if (actual.length !== keys.length || keys.some((key) => !Object.hasOwn(value, key))) fail("input_shape");
}

function assertDigest(value: unknown, suffix = "digest"): asserts value is string {
  if (typeof value !== "string" || !DIGEST_PATTERN.test(value)) fail(suffix);
}

function assertDigestRef(value: unknown): asserts value is DigestRef {
  exactKeys(value, ["record_id", "schema_id", "schema_version", "content_digest"]);
  if (typeof value.record_id !== "string" || !RECORD_ID_PATTERN.test(value.record_id)) fail("record_id");
  if (typeof value.schema_id !== "string" || value.schema_id.length === 0
    || value.schema_version !== "0.1.0") fail("schema_id");
  assertDigest(value.content_digest);
}

function canonicalEqual(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function refKey(ref: DigestRef): string {
  return canonicalJson(ref);
}

function includesRef(values: readonly DigestRef[], ref: DigestRef): boolean {
  return values.some((candidate) => task3RefsEqual(candidate, ref));
}

function sortText(values: Iterable<string>): string[] {
  return [...new Set(values)].sort((left, right) => Buffer.compare(Buffer.from(left, "utf8"), Buffer.from(right, "utf8")));
}

function artifactProvenance(
  ref: { artifact_id: string; artifact_version: string; artifact_digest: string },
  relationship: string,
): ProvenanceRef {
  return {
    record_id: `artifact.${ref.artifact_id}.${ref.artifact_version}`,
    relationship,
    content_digest: ref.artifact_digest,
  };
}

function deriveScope(examples: readonly VerifiedDatasetExample[], evidence: LeakageEvidenceSnapshot): RecordScope {
  if (examples.length === 0) {
    return {
      memory_scope: evidence.cohort_scope.memory_scope,
      project_id: evidence.cohort_scope.project_id,
      resource_refs: [],
      data_classes: [],
    };
  }
  const scope = examples[0]!.subject.example.preference.scope;
  if (examples.some((example) => example.subject.example.preference.scope.memory_scope !== scope.memory_scope
    || example.subject.example.preference.scope.project_id !== scope.project_id)) fail("scope_mismatch");
  return {
    memory_scope: scope.memory_scope,
    project_id: scope.project_id,
    resource_refs: sortText(examples.map((example) => example.subject.example.preference.record_id)),
    data_classes: sortText(examples.flatMap((example) => example.subject.example.preference.scope.data_classes)),
  };
}

function addReason(example: VerifiedDatasetExample, reason: string): void {
  if (!example.exclusion_reasons.includes(reason)) example.exclusion_reasons.push(reason);
  example.exclusion_reasons.sort((left, right) =>
    EXCLUSION_PRECEDENCE.indexOf(left as typeof EXCLUSION_PRECEDENCE[number])
      - EXCLUSION_PRECEDENCE.indexOf(right as typeof EXCLUSION_PRECEDENCE[number]));
}

function preNormalizationReasons(
  verified: VerifiedDatasetExample,
  input: BuildLearningDatasetInput,
): void {
  const example = verified.subject.example;
  const preference = example.preference;
  const qualification = example.qualification;
  const eligibility = example.eligibility;
  if (preference.lifecycle_state !== "active"
    || qualification.lifecycle_state !== "active"
    || eligibility.lifecycle_state !== "active") addReason(verified, "record_not_active");
  if (preference.payload.preference_state !== "admitted") addReason(verified, "preference_not_admitted");
  if (qualification.payload.qualification_state !== "qualified"
    || !["A", "B"].includes(qualification.payload.outcome)) addReason(verified, "qualification_not_qualified");
  if (eligibility.payload.eligibility_state !== "eligible") addReason(verified, "eligibility_not_eligible");
  const payloads = [preference.payload, qualification.payload, eligibility.payload];
  if (payloads.some((payload) => payload.ranking_objective !== "expression_preference"
    || payload.candidate_kind !== "expression")) addReason(verified, "objective_or_candidate_kind_mismatch");
  const scope = preference.scope;
  if (scope.memory_scope !== input.leakage_evidence.cohort_scope.memory_scope
    || scope.project_id !== input.leakage_evidence.cohort_scope.project_id
    || qualification.scope.memory_scope !== scope.memory_scope
    || qualification.scope.project_id !== scope.project_id
    || eligibility.scope.memory_scope !== scope.memory_scope
    || eligibility.scope.project_id !== scope.project_id) addReason(verified, "scope_or_project_mismatch");
  const permission = example.eligibility_input.permission;
  if (permission === null
    || permission.payload.status !== "issued"
    || permission.payload.revocation_state !== "current") {
    addReason(verified, "permission_not_current");
  } else {
    if (task2CompareRfc3339Instants(permission.payload.issued_at, input.evaluation_at) > 0
      || permission.payload.expires_at !== null
        && task2CompareRfc3339Instants(input.evaluation_at, permission.payload.expires_at) >= 0) {
      addReason(verified, "permission_not_effective");
    }
    const requiredSubjects = [
      qualification.payload.candidate_a_ref,
      qualification.payload.candidate_b_ref,
      qualification.payload.decision_ref,
    ];
    if (!permission.payload.allowed_memory_scopes.includes(scope.memory_scope)
      || scope.project_id === null
      || !permission.payload.project_ids.includes(scope.project_id)
      || !requiredSubjects.every((ref) => includesRef(permission.payload.subject_refs, ref))) {
      addReason(verified, "permission_scope_or_subject_mismatch");
    }
  }
  if (!task2LineageLearningEligible(example.qualification_input.lineage_a.payload)
    || !task2LineageLearningEligible(example.qualification_input.lineage_b.payload)) {
    addReason(verified, "lineage_not_learning_eligible");
  }
  if (example.blocking_evidence.length > 0) addReason(verified, "forbidden_source_class");
  const checkpointRef = task3CheckpointSetRef(example.feature_checkpoint_set);
  const occurrenceCount = example.qualification_input.presentation.source_refs
    .filter((ref) => task3RefsEqual(ref, checkpointRef)).length;
  if (occurrenceCount !== 1
    || !task3RefsEqual(checkpointRef, example.preference.payload.feature_source_checkpoint_set_ref)
    || !task3RefsEqual(checkpointRef, example.preference_input.feature_source_checkpoint_set_ref)) {
    addReason(verified, "presentation_checkpoint_mismatch");
  }
  const presentedKeys = new Set(verified.presented_feature_refs.map(refKey));
  const checkpointedKeys = new Set(verified.checkpointed_feature_refs.map(refKey));
  const presentedOnly = verified.presented_feature_refs.filter((ref) => !checkpointedKeys.has(refKey(ref)));
  const checkpointedOnly = verified.checkpointed_feature_refs.filter((ref) => !presentedKeys.has(refKey(ref)));
  const observation = example.post_checkpoint_observation;
  const observedKeys = new Set(observation?.observed_entries.map((entry) => refKey(entry.source_ref)) ?? []);
  if (observation !== null) {
    if (presentedOnly.length === 0
      || observation.observed_entries.some((entry) => !presentedOnly.some((ref) => task3RefsEqual(ref, entry.source_ref)))) {
      fail("checkpoint_binding");
    }
  }
  if (presentedOnly.some((ref) => observedKeys.has(refKey(ref)))) addReason(verified, "feature_source_after_checkpoint");
  if (presentedOnly.some((ref) => !observedKeys.has(refKey(ref))) || checkpointedOnly.length > 0) {
    addReason(verified, "feature_source_not_manifested");
  }
}

function normalizeProvisional(
  examples: VerifiedDatasetExample[],
  unicode: VerifiedUnicodeArtifactBundle,
): void {
  for (const verified of examples) {
    if (verified.exclusion_reasons.length > 0) continue;
    const example = verified.subject.example;
    verified.normalized_a = task3NormalizeExpression(example.qualification_input.candidate_a.payload.expression, unicode);
    verified.normalized_b = task3NormalizeExpression(example.qualification_input.candidate_b.payload.expression, unicode);
    if (verified.normalized_a.length === 0 || verified.normalized_b.length === 0) {
      addReason(verified, "normalized_expression_empty");
    }
  }
}

function closeDeclaredRelations(examples: VerifiedDatasetExample[], evidence: LeakageEvidenceSnapshot): void {
  const byRef = new Map(examples.map((example) => [refKey(example.example_ref), example]));
  let changed = true;
  while (changed) {
    changed = false;
    for (const node of evidence.relation_nodes) {
      const members = node.member_example_refs.map((ref) => byRef.get(refKey(ref))!);
      const hasExcluded = members.some((member) => member.exclusion_reasons.length > 0);
      const provisional = members.filter((member) => member.exclusion_reasons.length === 0);
      if (hasExcluded && provisional.length > 0) {
        provisional.forEach((member) => addReason(member, "leakage_relation_not_closed"));
        changed = true;
      }
    }
  }
}

function firstReason(example: VerifiedDatasetExample): string | null {
  return example.exclusion_reasons.length === 0 ? null : example.exclusion_reasons[0]!;
}

function countsFor(
  included: readonly VerifiedDatasetExample[],
  groups: readonly import("./records.js").LeakageGroupRecord[],
): DatasetCounts {
  const splitCount = (split: "train" | "validation" | "test") => ({
    examples: groups.filter((group) => group.payload.split === split)
      .reduce((total, group) => total + group.payload.member_refs.length, 0),
    groups: groups.filter((group) => group.payload.split === split).length,
  });
  const train = splitCount("train");
  const validation = splitCount("validation");
  const test = splitCount("test");
  return {
    examples: included.length,
    groups: groups.length,
    train_examples: train.examples,
    train_groups: train.groups,
    validation_examples: validation.examples,
    validation_groups: validation.groups,
    test_examples: test.examples,
    test_groups: test.groups,
  };
}

const THRESHOLDS = [
  ["examples_at_least_100", (counts: DatasetCounts) => counts.examples >= 100],
  ["groups_at_least_30", (counts: DatasetCounts) => counts.groups >= 30],
  ["train_examples_at_least_1", (counts: DatasetCounts) => counts.train_examples >= 1],
  ["train_groups_at_least_1", (counts: DatasetCounts) => counts.train_groups >= 1],
  ["validation_examples_at_least_20", (counts: DatasetCounts) => counts.validation_examples >= 20],
  ["validation_groups_at_least_5", (counts: DatasetCounts) => counts.validation_groups >= 5],
  ["test_examples_at_least_20", (counts: DatasetCounts) => counts.test_examples >= 20],
  ["test_groups_at_least_5", (counts: DatasetCounts) => counts.test_groups >= 5],
] as const;

function diagnosticReasons(counts: DatasetCounts): string[] {
  return [
    ...(counts.examples === 0 ? ["no_included_examples"] : []),
    ...(counts.groups === 0 ? ["no_leakage_groups"] : []),
    ...(counts.train_examples === 0 || counts.train_groups === 0 ? ["train_split_empty"] : []),
    ...(counts.validation_examples === 0 || counts.validation_groups === 0 ? ["validation_split_empty"] : []),
    ...(counts.test_examples === 0 || counts.test_groups === 0 ? ["test_split_empty"] : []),
    ...(counts.examples < 100 ? ["training_pair_threshold"] : []),
    ...(counts.groups < 30 ? ["training_group_threshold"] : []),
    ...(counts.validation_examples < 20 ? ["validation_pair_threshold"] : []),
    ...(counts.validation_groups < 5 ? ["validation_group_threshold"] : []),
    ...(counts.test_examples < 20 ? ["test_pair_threshold"] : []),
    ...(counts.test_groups < 5 ? ["test_group_threshold"] : []),
  ];
}

function createDiagnostics(
  inputDigest: string,
  submitted: number,
  counts: DatasetCounts,
  structuralEmpty: boolean,
): DatasetBuildDiagnostics {
  const thresholdResults = THRESHOLDS.map(([predicate, check]) => ({ predicate, passed: check(counts) })) as DatasetBuildDiagnostics["threshold_results"];
  const reasons = diagnosticReasons(counts);
  const identity = {
    contract_version: "contentmd.dataset-build-diagnostics/0.1.0" as const,
    input_digest: inputDigest,
    submitted_examples: submitted,
    included_examples: counts.examples,
    excluded_examples: submitted - counts.examples,
    counts,
    threshold_results: thresholdResults,
    reason_codes: reasons,
    issuance_disposition: structuralEmpty
      ? "manifest_unissued_structural_empty" as const
      : "manifest_issued" as const,
  };
  const diagnosticsId = `dataset-diagnostics.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, diagnostics_id: diagnosticsId };
  return { ...withoutDigest, diagnostics_digest: sha256Canonical(withoutDigest) };
}

function provenanceForObservation(observation: FeatureSourcePostCheckpointObservation): ProvenanceRef {
  const ref = task3ObservationRef(observation);
  return { record_id: ref.record_id, relationship: "post_checkpoint_observation", content_digest: ref.content_digest };
}

function provenanceForBlocking(blocking: BlockingEvidenceRef): ProvenanceRef {
  return {
    record_id: blocking.evidence_ref.record_id,
    relationship: "blocking_evidence",
    content_digest: blocking.evidence_ref.content_digest,
  };
}

export function buildLearningDataset(input: BuildLearningDatasetInput): LearningDatasetBuildResult {
  task3PreflightTopLevelRecordMode(input, [
    "record_mode", "evaluation_at", "group_producer", "dataset_producer", "unicode_artifacts", "leakage_evidence",
  ]);
  const producerKeys = [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ];
  task3PreflightDescriptorChildKeys(input, "group_producer", producerKeys);
  task3PreflightDescriptorChildKeys(input, "dataset_producer", producerKeys);
  const groupProducerShape = task3DescriptorDataValue(input, "group_producer");
  if (groupProducerShape !== undefined) task3PreflightProducerShape(groupProducerShape);
  const datasetProducerShape = task3DescriptorDataValue(input, "dataset_producer");
  if (datasetProducerShape !== undefined) task3PreflightProducerShape(datasetProducerShape);
  task3PreflightDescriptorChildKeys(input, "leakage_evidence", [
    "contract_version", "snapshot_id", "snapshot_version", "record_mode", "cohort_scope",
    "enumeration_state", "subjects", "relation_nodes", "additional_materials", "snapshot_digest",
  ]);
  const leakageEvidenceShape = task3DescriptorDataValue(input, "leakage_evidence");
  if (leakageEvidenceShape !== undefined) {
    task3PreflightLeakageEvidenceShape(leakageEvidenceShape);
  }
  task3AssertCanonicalGraph(input);
  task3PreflightGlobalIntegrity(input);
  exactKeys(input, [
    "record_mode", "evaluation_at", "group_producer", "dataset_producer", "unicode_artifacts", "leakage_evidence",
  ]);
  if (input.record_mode !== "development_fixture") {
    if (input.record_mode === "official") fail("official_mode_not_supported");
    fail("input_shape");
  }
  if (!task2IsRfc3339(input.evaluation_at)) fail("timestamp");
  const groupProducer = verifyTask3Producer(input.group_producer, "leakage-group");
  const datasetProducer = verifyTask3Producer(input.dataset_producer, "learning-dataset");
  const verifiedUnicode = task3VerifyUnicodeBundle(input.unicode_artifacts);
  const verifiedEvidence = verifyLeakageEvidenceSnapshot(input.leakage_evidence);
  if (input.leakage_evidence.record_mode !== input.record_mode) fail("reference_integrity");
  const examples = verifiedEvidence.examples.map((example) => ({ ...example, exclusion_reasons: [] }));
  examples.forEach((example) => preNormalizationReasons(example, input));
  normalizeProvisional(examples, verifiedUnicode);
  closeDeclaredRelations(examples, input.leakage_evidence);
  const included = examples.filter((example) => example.exclusion_reasons.length === 0);
  const excluded = examples.filter((example) => example.exclusion_reasons.length > 0);
  const includedKeys = new Set(included.map((example) => refKey(example.example_ref)));
  const admittedNodes = input.leakage_evidence.relation_nodes.filter((node) =>
    node.member_example_refs.every((ref) => includedKeys.has(refKey(ref))));
  const admittedMaterialKeys = new Set(admittedNodes.flatMap((node) => node.evidence_refs.map(refKey)));
  const admittedMaterials = input.leakage_evidence.additional_materials.filter((material) =>
    admittedMaterialKeys.has(refKey(material.material_ref)));
  const derivedGroups = included.length === 0
    ? { groups: [], projections: [], traces: [] }
    : deriveLeakageGroups({
      record_mode: "development_fixture",
      producer: input.group_producer,
      unicode_artifacts: input.unicode_artifacts,
      admitted_examples: included as unknown as [VerifiedDatasetExample, ...VerifiedDatasetExample[]],
      relation_nodes: admittedNodes,
      additional_materials: admittedMaterials,
    });
  const groups = derivedGroups.groups;
  const counts = countsFor(included, groups);
  const scope = deriveScope(included, input.leakage_evidence);
  const unicodeRefs = [
    input.unicode_artifacts.normalization.artifact_ref,
    input.unicode_artifacts.casefold.artifact_ref,
    input.unicode_artifacts.whitespace.artifact_ref,
    input.unicode_artifacts.word_break.artifact_ref,
    input.unicode_artifacts.grapheme_break.artifact_ref,
  ].sort((left, right) => left.artifact_id.localeCompare(right.artifact_id, "en"));
  const featureAsOfEntries = task3SortCanonical(included.map((example) => ({
    example_ref: example.example_ref,
    feature_as_of_digest: example.feature_as_of_digest ?? fail("checkpoint_binding"),
  })));
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.learning-dataset-input/0.1.0",
    record_mode: input.record_mode,
    evaluation_at: input.evaluation_at,
    dataset_producer: input.dataset_producer,
    group_producer_manifest_digest: groupProducer.producer_manifest_digest,
    unicode_artifact_refs: unicodeRefs,
    leakage_evidence: input.leakage_evidence,
    derived_output_scope: scope,
    derived_feature_as_of_entries: featureAsOfEntries,
  });
  const exclusions = task3SortCanonical(excluded.map((example): DatasetExclusion => ({
    example_ref: example.example_ref,
    reason_code: firstReason(example)!,
  })));
  const structuralEmpty = counts.examples === 0 || counts.groups === 0
    || counts.train_examples === 0 || counts.train_groups === 0
    || counts.validation_examples === 0 || counts.validation_groups === 0
    || counts.test_examples === 0 || counts.test_groups === 0;
  const diagnostics = createDiagnostics(inputDigest, examples.length, counts, structuralEmpty);
  if (structuralEmpty) return { groups, manifest: null, diagnostics };

  const groupRefs = task3SortCanonical(groups.map(task3RecordRef)) as [DigestRef, ...DigestRef[]];
  const exampleRefs = included.map((example) => example.example_ref) as [DigestRef, ...DigestRef[]];
  const splitRefs = (split: "train" | "validation" | "test") => task3SortCanonical(groups
    .filter((group) => group.payload.split === split)
    .flatMap((group) => group.payload.member_refs)) as [DigestRef, ...DigestRef[]];
  const permissionRefs = task3SortCanonical(included.map((example) => {
    const permission = example.subject.example.eligibility_input.permission;
    return permission === null ? fail("reference_integrity") : task2SnapshotRef(permission);
  }).filter((ref, index, all) => all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index)) as [DigestRef, ...DigestRef[]];
  const checkpointRefs = task3SortCanonical(included.map((example) =>
    task3CheckpointSetRef(example.subject.example.feature_checkpoint_set))
    .filter((ref, index, all) => all.findIndex((candidate) => task3RefsEqual(candidate, ref)) === index)) as [DigestRef, ...DigestRef[]];
  const thresholdsPass = THRESHOLDS.every(([, check]) => check(counts));
  const provenance = task3SortProvenance([
    {
      record_id: input.leakage_evidence.snapshot_id,
      relationship: "leakage_evidence_snapshot",
      content_digest: input.leakage_evidence.snapshot_digest,
    },
    ...groups.map((group) => ({
      record_id: group.record_id,
      relationship: "leakage_group",
      content_digest: group.content_digest,
    })),
    ...included.map((example) => ({
      record_id: example.subject.example.preference.record_id,
      relationship: "preference_example",
      content_digest: example.subject.example.preference.content_digest,
    })),
    ...excluded.map((example) => ({
      record_id: example.subject.example.preference.record_id,
      relationship: "excluded_example",
      content_digest: example.subject.example.preference.content_digest,
    })),
    ...permissionRefs.map((ref) => ({ record_id: ref.record_id, relationship: "learning_permission", content_digest: ref.content_digest })),
    ...checkpointRefs.map((ref) => ({ record_id: ref.record_id, relationship: "feature_source_checkpoint_set", content_digest: ref.content_digest })),
    ...excluded.flatMap((example) => example.subject.example.post_checkpoint_observation === null
      ? [] : [provenanceForObservation(example.subject.example.post_checkpoint_observation)]),
    ...excluded.flatMap((example) => example.subject.example.blocking_evidence.map(provenanceForBlocking)),
    artifactProvenance(input.unicode_artifacts.normalization.artifact_ref, "normalization_artifact"),
    artifactProvenance(input.unicode_artifacts.casefold.artifact_ref, "normalization_artifact"),
    artifactProvenance(input.unicode_artifacts.whitespace.artifact_ref, "normalization_artifact"),
    artifactProvenance(input.unicode_artifacts.word_break.artifact_ref, "word_break_artifact"),
    artifactProvenance(input.unicode_artifacts.grapheme_break.artifact_ref, "grapheme_break_artifact"),
    ...(datasetProducer.verification_receipt === null ? [] : [{
      record_id: datasetProducer.verification_receipt.record_id,
      relationship: "producer_verification",
      content_digest: datasetProducer.verification_receipt.content_digest,
    }]),
  ]);
  const manifest = finalizeRecord({
    record_id: `learning-dataset.${inputDigest}`,
    schema_id: LEARNING_SCHEMA_IDS.learningDatasetManifest,
    schema_version: "0.1.0",
    record_version: 1,
    scope,
    provenance: provenance as [ProvenanceRef, ...ProvenanceRef[]],
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: input.record_mode,
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: datasetProducer.schema_digest,
      code_digest: datasetProducer.code_digest,
      input_digest: inputDigest,
      authority_effect: "none",
      example_refs: exampleRefs,
      exclusions,
      leakage_group_refs: groupRefs,
      train_example_refs: splitRefs("train"),
      validation_example_refs: splitRefs("validation"),
      test_example_refs: splitRefs("test"),
      permission_refs: permissionRefs,
      feature_source_checkpoint_refs: checkpointRefs,
      counts,
      test_open_state: "not_applicable",
      dataset_state: thresholdsPass ? "training_eligible" : "diagnostics_only",
    },
  }) as unknown as LearningDatasetManifest;
  return { groups, manifest, diagnostics };
}

function membershipDigest(manifest: LearningDatasetManifest): string {
  return sha256Canonical({
    contract_version: "contentmd.learning-dataset-membership/0.1.0",
    example_refs: manifest.payload.example_refs,
    exclusions: manifest.payload.exclusions,
    leakage_group_refs: manifest.payload.leakage_group_refs,
    train_example_refs: manifest.payload.train_example_refs,
    validation_example_refs: manifest.payload.validation_example_refs,
    test_example_refs: manifest.payload.test_example_refs,
    permission_refs: manifest.payload.permission_refs,
    feature_source_checkpoint_refs: manifest.payload.feature_source_checkpoint_refs,
    counts: manifest.payload.counts,
  });
}

function validateManifestForSeal(manifest: LearningDatasetManifest): void {
  exactKeys(manifest, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  exactKeys(manifest.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  exactKeys(manifest.payload, [
    "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
    "code_digest", "input_digest", "authority_effect", "example_refs", "exclusions",
    "leakage_group_refs", "train_example_refs", "validation_example_refs", "test_example_refs",
    "permission_refs", "feature_source_checkpoint_refs", "counts", "test_open_state", "dataset_state",
  ]);
  if (!Array.isArray(manifest.provenance)) fail("input_shape");
  for (const provenance of manifest.provenance) {
    exactKeys(provenance, ["record_id", "relationship", "content_digest"]);
  }
  const preflightRefSets = [
    manifest.payload.example_refs,
    manifest.payload.leakage_group_refs,
    manifest.payload.train_example_refs,
    manifest.payload.validation_example_refs,
    manifest.payload.test_example_refs,
    manifest.payload.permission_refs,
    manifest.payload.feature_source_checkpoint_refs,
  ] as const;
  if (preflightRefSets.some((refs) => !Array.isArray(refs))
    || !Array.isArray(manifest.payload.exclusions)) fail("input_shape");
  preflightRefSets.forEach((refs) => refs.forEach(assertDigestRef));
  for (const exclusion of manifest.payload.exclusions) {
    exactKeys(exclusion, ["example_ref", "reason_code"]);
    assertDigestRef(exclusion.example_ref);
  }
  exactKeys(manifest.payload.counts, [
    "examples", "groups", "train_examples", "train_groups", "validation_examples",
    "validation_groups", "test_examples", "test_groups",
  ]);
  if (verifyRecordDigest(manifest).valid !== true) fail("durable_record_digest");
  if (manifest.schema_id !== LEARNING_SCHEMA_IDS.learningDatasetManifest
    || manifest.schema_version !== "0.1.0") fail("schema_id");
  if (manifest.record_version !== 1
    || manifest.lifecycle_state !== "active"
    || manifest.payload.contract_version !== "contentmd.learning-record-contract/0.1.0"
    || manifest.payload.record_mode !== "development_fixture"
    || manifest.payload.ranking_objective !== "expression_preference"
    || manifest.payload.candidate_kind !== "expression"
    || manifest.payload.authority_effect !== "none") fail("dataset_state");
  const payload = manifest.payload;
  if (manifest.record_id !== `learning-dataset.${payload.input_digest}`) fail("record_id");
  [payload.schema_digest, payload.code_digest, payload.input_digest, manifest.content_digest].forEach((digest) => assertDigest(digest));
  const refSets: readonly (readonly DigestRef[])[] = [
    payload.example_refs,
    payload.leakage_group_refs,
    payload.train_example_refs,
    payload.validation_example_refs,
    payload.test_example_refs,
    payload.permission_refs,
    payload.feature_source_checkpoint_refs,
  ];
  refSets.forEach((refs) => refs.forEach(assertDigestRef));
  if (refSets.some((refs) => !Array.isArray(refs) || refs.length === 0
    || !canonicalEqual(refs, task3SortCanonical(refs))
    || new Set(refs.map(refKey)).size !== refs.length)) fail("set_uniqueness_or_order");
  if (!Array.isArray(payload.exclusions)
    || !canonicalEqual(payload.exclusions, task3SortCanonical(payload.exclusions))
    || new Set(payload.exclusions.map((exclusion) => refKey(exclusion.example_ref))).size !== payload.exclusions.length) {
    fail("set_uniqueness_or_order");
  }
  for (const exclusion of payload.exclusions) {
    exactKeys(exclusion, ["example_ref", "reason_code"]);
    assertDigestRef(exclusion.example_ref);
    if (typeof exclusion.reason_code !== "string"
      || !EXCLUSION_PRECEDENCE.includes(exclusion.reason_code as typeof EXCLUSION_PRECEDENCE[number])) {
      fail("input_shape");
    }
  }
  const exactSchema = (refs: readonly DigestRef[], schemaId: string): void => {
    if (refs.some((ref) => ref.schema_id !== schemaId || ref.schema_version !== "0.1.0")) {
      fail("reference_integrity");
    }
  };
  exactSchema(payload.example_refs, LEARNING_SCHEMA_IDS.preferenceExample);
  exactSchema(payload.leakage_group_refs, LEARNING_SCHEMA_IDS.leakageGroup);
  exactSchema(payload.train_example_refs, LEARNING_SCHEMA_IDS.preferenceExample);
  exactSchema(payload.validation_example_refs, LEARNING_SCHEMA_IDS.preferenceExample);
  exactSchema(payload.test_example_refs, LEARNING_SCHEMA_IDS.preferenceExample);
  exactSchema(payload.permission_refs, "contentmd.task2-learning-permission-snapshot");
  exactSchema(payload.feature_source_checkpoint_refs, "contentmd.feature-source-checkpoint-set");
  exactSchema(payload.exclusions.map((exclusion) => exclusion.example_ref), LEARNING_SCHEMA_IDS.preferenceExample);
  if (!Array.isArray(manifest.provenance) || manifest.provenance.length === 0
    || !canonicalEqual(manifest.provenance, task3SortProvenance(manifest.provenance))) fail("provenance");
  for (const provenance of manifest.provenance) {
    exactKeys(provenance, ["record_id", "relationship", "content_digest"]);
    if (!RECORD_ID_PATTERN.test(provenance.record_id)
      || typeof provenance.relationship !== "string" || provenance.relationship.length === 0) fail("provenance");
    assertDigest(provenance.content_digest, "provenance");
  }
  const allowedRelationships = new Set([
    "leakage_evidence_snapshot", "leakage_group", "preference_example", "excluded_example",
    "learning_permission", "feature_source_checkpoint_set", "post_checkpoint_observation",
    "blocking_evidence", "normalization_artifact", "word_break_artifact",
    "grapheme_break_artifact", "producer_verification",
  ]);
  if (manifest.provenance.some((entry) => !allowedRelationships.has(entry.relationship))) fail("provenance");
  const byRelationship = new Map<string, ProvenanceRef[]>();
  for (const entry of manifest.provenance) {
    const entries = byRelationship.get(entry.relationship) ?? [];
    entries.push(entry);
    byRelationship.set(entry.relationship, entries);
  }
  if ([...byRelationship.values()].some((entries) =>
    new Set(entries.map((entry) => entry.record_id)).size !== entries.length)) fail("provenance");
  const assertRefProvenance = (relationship: string, refs: readonly DigestRef[]): void => {
    const actual = task3SortCanonical((byRelationship.get(relationship) ?? []).map((entry) => ({
      record_id: entry.record_id,
      content_digest: entry.content_digest,
    })));
    const expected = task3SortCanonical(refs.map((ref) => ({
      record_id: ref.record_id,
      content_digest: ref.content_digest,
    })));
    if (!canonicalEqual(actual, expected)) fail("provenance");
  };
  assertRefProvenance("leakage_group", payload.leakage_group_refs);
  assertRefProvenance("preference_example", payload.example_refs);
  assertRefProvenance("excluded_example", payload.exclusions.map((exclusion) => exclusion.example_ref));
  assertRefProvenance("learning_permission", payload.permission_refs);
  assertRefProvenance("feature_source_checkpoint_set", payload.feature_source_checkpoint_refs);
  if ((byRelationship.get("leakage_evidence_snapshot") ?? []).length !== 1
    || (byRelationship.get("producer_verification") ?? []).length > 1
    || !canonicalEqual(
      sortText((byRelationship.get("normalization_artifact") ?? []).map((entry) => entry.record_id)),
      [
        "artifact.unicode-casefold.17.0.0",
        "artifact.unicode-normalization.17.0.0",
        "artifact.unicode-whitespace.17.0.0",
      ],
    )
    || !canonicalEqual(
      (byRelationship.get("word_break_artifact") ?? []).map((entry) => entry.record_id),
      ["artifact.unicode-word-break.17.0.0"],
    )
    || !canonicalEqual(
      (byRelationship.get("grapheme_break_artifact") ?? []).map((entry) => entry.record_id),
      ["artifact.unicode-grapheme-break.17.0.0"],
    )) fail("provenance");
  if (!Array.isArray(manifest.scope.resource_refs) || !Array.isArray(manifest.scope.data_classes)
    || !["task", "personal", "project", "organization", "public"].includes(manifest.scope.memory_scope)
    || manifest.scope.project_id !== null
      && (typeof manifest.scope.project_id !== "string" || manifest.scope.project_id.length === 0)
    || manifest.scope.resource_refs.some((value) => typeof value !== "string" || value.length === 0)
    || manifest.scope.data_classes.some((value) => typeof value !== "string" || value.length === 0)
    || !canonicalEqual(manifest.scope.resource_refs, sortText(manifest.scope.resource_refs))
    || !canonicalEqual(manifest.scope.data_classes, sortText(manifest.scope.data_classes))
    || !canonicalEqual(manifest.scope.resource_refs, sortText(payload.example_refs.map((ref) => ref.record_id)))) {
    fail("scope_mismatch");
  }
  const uniqueIncluded = new Set(payload.example_refs.map(refKey));
  const train = new Set(payload.train_example_refs.map(refKey));
  const validation = new Set(payload.validation_example_refs.map(refKey));
  const test = new Set(payload.test_example_refs.map(refKey));
  if ([...train].some((key) => validation.has(key) || test.has(key))
    || [...validation].some((key) => test.has(key))
    || new Set([...train, ...validation, ...test]).size !== uniqueIncluded.size
    || [...uniqueIncluded].some((key) => !train.has(key) && !validation.has(key) && !test.has(key))
    || payload.exclusions.some((exclusion) => uniqueIncluded.has(refKey(exclusion.example_ref)))) {
    fail("dataset_partition");
  }
  const counts = payload.counts;
  exactKeys(counts, [
    "examples", "groups", "train_examples", "train_groups", "validation_examples",
    "validation_groups", "test_examples", "test_groups",
  ]);
  if (Object.values(counts).some((count) => typeof count !== "number" || !Number.isSafeInteger(count) || count < 0)) {
    fail("dataset_counts");
  }
  if (counts.examples !== payload.example_refs.length
    || counts.groups !== payload.leakage_group_refs.length
    || counts.train_examples !== payload.train_example_refs.length
    || counts.validation_examples !== payload.validation_example_refs.length
    || counts.test_examples !== payload.test_example_refs.length
    || counts.train_groups + counts.validation_groups + counts.test_groups !== counts.groups
    || counts.train_groups < 1 || counts.validation_groups < 1 || counts.test_groups < 1
    || counts.train_groups > counts.groups || counts.validation_groups > counts.groups || counts.test_groups > counts.groups
    || counts.train_groups > counts.train_examples
    || counts.validation_groups > counts.validation_examples
    || counts.test_groups > counts.test_examples) fail("dataset_counts");
  if (payload.dataset_state !== "training_eligible" || payload.test_open_state !== "not_applicable") {
    fail("dataset_state");
  }
  if (!THRESHOLDS.every(([, check]) => check(counts))) fail("dataset_state");
}

function validateSealWitness(
  input: SealLearningDatasetInput,
  membership: string,
): void {
  const witness = input.witness;
  exactKeys(witness, [
    "contract_version", "source_dataset_ref", "sealed_at", "membership_digest", "verification_mode",
    "verification_receipt", "seal_digest",
  ]);
  if (witness.contract_version !== "contentmd.dataset-seal-witness/0.1.0"
  ) fail("input_shape");
  assertDigestRef(witness.source_dataset_ref);
  if (!task3RefsEqual(witness.source_dataset_ref, task3RecordRef(input.source_manifest))) fail("reference_integrity");
  if (!task2IsRfc3339(witness.sealed_at)) fail("timestamp");
  assertDigest(witness.membership_digest);
  assertDigest(witness.seal_digest);
  if (witness.membership_digest !== membership) fail("dataset_partition");
  const sealDigest = sha256Canonical({
    contract_version: witness.contract_version,
    source_dataset_ref: witness.source_dataset_ref,
    sealed_at: witness.sealed_at,
    membership_digest: witness.membership_digest,
    verification_mode: witness.verification_mode,
  });
  if (witness.seal_digest !== sealDigest) fail("digest");
  if (witness.verification_mode === "development_fixture") {
    if (witness.verification_receipt !== null) fail("receipt_binding");
    return;
  }
  if (witness.verification_mode !== "readback_verified" || witness.verification_receipt === null) {
    fail("receipt_binding");
  }
  const receipt = witness.verification_receipt;
  exactKeys(receipt, [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  exactKeys(receipt.scope, ["memory_scope", "project_id", "resource_refs", "data_classes"]);
  if (!Array.isArray(receipt.provenance)) fail("input_shape");
  for (const provenance of receipt.provenance) {
    exactKeys(provenance, ["record_id", "relationship", "content_digest"]);
  }
  exactKeys(receipt.payload, [
    "transaction_ref", "target_path", "expected_digest", "observed_digest",
    "status", "verified_at", "method",
  ]);
  if (verifyRecordDigest(receipt).valid !== true) fail("receipt_digest");
  const targetPath = `contentmd://task3/dataset-seal/${input.source_manifest.record_id}`;
  if (receipt.record_id !== `verification-receipt.dataset-seal.${witness.seal_digest}`
    || receipt.schema_id !== "contentmd.verification-receipt-record"
    || receipt.schema_version !== "0.1.0"
    || receipt.record_version !== 1
    || receipt.lifecycle_state !== "active"
    || !canonicalEqual(receipt.scope, {
      memory_scope: "task",
      project_id: null,
      resource_refs: [targetPath],
      data_classes: ["verification_metadata"],
    })
    || receipt.provenance.length !== 0
    || receipt.payload.status !== "passed"
    || receipt.payload.transaction_ref !== `dataset-seal.${witness.seal_digest}`
    || receipt.payload.target_path !== targetPath
    || receipt.payload.expected_digest !== membership
    || receipt.payload.observed_digest !== membership
    || receipt.payload.method !== "sha256-canonical-readback"
    || !task2IsRfc3339(receipt.payload.verified_at)) fail("receipt_binding");
}

export function sealLearningDataset(input: SealLearningDatasetInput): LearningDatasetManifest {
  task3PreflightTopLevelRecordMode(input, ["record_mode", "producer", "source_manifest", "witness"]);
  task3PreflightDescriptorChildKeys(input, "producer", [
    "contract_version", "producer_id", "schema_artifact", "source_artifacts",
    "verification_mode", "verification_receipt",
  ]);
  const sealProducer = task3DescriptorDataValue(input, "producer");
  if (sealProducer !== undefined) task3PreflightProducerShape(sealProducer);
  task3PreflightDescriptorChildKeys(input, "source_manifest", [
    "record_id", "schema_id", "schema_version", "record_version", "scope", "provenance",
    "lifecycle_state", "payload", "content_digest",
  ]);
  task3PreflightDescriptorChildKeys(input, "witness", [
    "contract_version", "source_dataset_ref", "sealed_at", "membership_digest", "verification_mode",
    "verification_receipt", "seal_digest",
  ]);
  const sourceManifest = task3DescriptorDataValue(input, "source_manifest");
  if (sourceManifest !== undefined) {
    task3PreflightDatasetManifestShape(sourceManifest);
    task3PreflightDescriptorChildKeys(sourceManifest, "scope", [
      "memory_scope", "project_id", "resource_refs", "data_classes",
    ]);
    task3PreflightDescriptorProvenance(sourceManifest);
    task3PreflightDescriptorChildKeys(sourceManifest, "payload", [
      "contract_version", "record_mode", "ranking_objective", "candidate_kind", "schema_digest",
      "code_digest", "input_digest", "authority_effect", "example_refs", "exclusions",
      "leakage_group_refs", "train_example_refs", "validation_example_refs", "test_example_refs",
      "permission_refs", "feature_source_checkpoint_refs", "counts", "test_open_state", "dataset_state",
    ]);
    const sourcePayload = task3DescriptorDataValue(sourceManifest, "payload");
    if (sourcePayload !== undefined) {
      task3PreflightDescriptorArrayItemKeys(sourcePayload, "exclusions", ["example_ref", "reason_code"]);
    }
  }
  const sealWitnessShape = task3DescriptorDataValue(input, "witness");
  if (sealWitnessShape !== undefined) task3PreflightSealWitnessShape(sealWitnessShape);
  task3AssertCanonicalGraph(input);
  task3PreflightGlobalIntegrity(input);
  exactKeys(input, ["record_mode", "producer", "source_manifest", "witness"]);
  if (input.record_mode !== "development_fixture") {
    if (input.record_mode === "official") fail("official_mode_not_supported");
    fail("input_shape");
  }
  const producer = verifyTask3Producer(input.producer, "dataset-seal");
  validateManifestForSeal(input.source_manifest);
  const membership = membershipDigest(input.source_manifest);
  validateSealWitness(input, membership);
  const scope: RecordScope = structuredClone(input.source_manifest.scope);
  const inputDigest = sha256Canonical({
    contract_version: "contentmd.learning-dataset-seal-input/0.1.0",
    record_mode: input.record_mode,
    producer: input.producer,
    source_manifest: input.source_manifest,
    witness: input.witness,
    derived_output_scope: scope,
  });
  const provenance = task3SortProvenance([
    ...input.source_manifest.provenance,
    {
      record_id: input.source_manifest.record_id,
      relationship: "prior_dataset_manifest",
      content_digest: input.source_manifest.content_digest,
    },
    {
      record_id: `dataset-seal.${input.witness.seal_digest}`,
      relationship: "dataset_seal",
      content_digest: input.witness.seal_digest,
    },
    ...(producer.verification_receipt === null ? [] : [{
      record_id: producer.verification_receipt.record_id,
      relationship: "producer_verification",
      content_digest: producer.verification_receipt.content_digest,
    }]),
  ]);
  return finalizeRecord({
    record_id: `learning-dataset.${inputDigest}`,
    schema_id: LEARNING_SCHEMA_IDS.learningDatasetManifest,
    schema_version: "0.1.0",
    record_version: 1,
    scope,
    provenance: provenance as [ProvenanceRef, ...ProvenanceRef[]],
    lifecycle_state: "active",
    payload: {
      ...input.source_manifest.payload,
      schema_digest: producer.schema_digest,
      code_digest: producer.code_digest,
      input_digest: inputDigest,
      dataset_state: "sealed",
      test_open_state: "sealed",
    },
  }) as unknown as LearningDatasetManifest;
}
