import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import { adaptContentDecisionEvent } from "../src/feedback.js";
import { determineLearningEligibility } from "../src/eligibility.js";
import {
  FEATURE_SOURCE_ROLES,
  deriveLeakageGroups,
  deriveFeatureSourceEventId,
  deriveFeatureSourceStreamId,
  task3CheckpointSetRef,
  task3SortProvenance,
  verifyDatasetExample,
  verifyLeakageEvidenceSnapshot,
  type CompleteRelationMaterial,
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
  type LeakageEvidenceSnapshot,
  type LeakageRelationNode,
  type RelationMembershipEvidence,
  type StoreArtifactWitness,
  type StoreBindingWitness,
  type Task3ProducerArtifactWitness,
} from "../src/leakage.js";
import { createPreferenceExample } from "../src/preference.js";
import { qualifyFeedback } from "../src/qualification.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";
import {
  buildLearningDataset,
  sealLearningDataset,
  type DatasetSealWitness,
} from "../src/dataset.js";
import { LEARNING_SCHEMA_IDS, type DigestRef, type LearningDatasetManifest } from "../src/records.js";
import {
  PROJECT_ID,
  canonicalSet,
  eligibilityFixture,
  preferenceFixture,
  qualificationFixture,
  rehashSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";

const EVALUATION_AT = "2026-08-20T19:00:00.000Z";

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function readWorkspaceText(path: string): string {
  return readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
}

function rawArtifact(path: string) {
  const bytes_utf8 = readWorkspaceText(path);
  return { path, bytes_utf8, raw_bytes_digest: sha256Utf8(bytes_utf8) };
}

function frozenArtifact(path: string) {
  const bytes_utf8 = readWorkspaceText(path);
  const parsed = JSON.parse(bytes_utf8) as { artifact_id: string; artifact_version: string };
  const raw_bytes_digest = sha256Utf8(bytes_utf8);
  return {
    path,
    bytes_utf8,
    raw_bytes_digest,
    artifact_ref: {
      artifact_id: parsed.artifact_id,
      artifact_version: parsed.artifact_version,
      artifact_digest: raw_bytes_digest,
    },
  };
}

function unicodeBundle(): UnicodeArtifactBundle {
  const preimage = {
    contract_version: "contentmd.unicode-artifact-bundle/0.1.0" as const,
    source_lock: rawArtifact("fixtures/learning-ranking/unicode-17-source-lock.json"),
    acquisition_receipt: rawArtifact("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"),
    generator: rawArtifact("scripts/generate-unicode-17-artifacts.mjs"),
    normalization: frozenArtifact("fixtures/learning-ranking/unicode-17-normalization.json"),
    casefold: frozenArtifact("fixtures/learning-ranking/unicode-17-casefold.json"),
    whitespace: frozenArtifact("fixtures/learning-ranking/unicode-17-whitespace.json"),
    word_break: frozenArtifact("fixtures/learning-ranking/unicode-17-word-break.json"),
    grapheme_break: frozenArtifact("fixtures/learning-ranking/unicode-17-grapheme-break.json"),
  };
  return { ...preimage, bundle_digest: sha256Canonical(preimage) };
}

function task3Producer(producer_id: Task3ProducerArtifactWitness["producer_id"]): Task3ProducerArtifactWitness {
  const paths = {
    "leakage-group": ["packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
    "learning-dataset": ["packages/learning/src/dataset.ts", "packages/learning/src/leakage.ts", "packages/learning/src/unicode-normalization.ts"],
    "dataset-seal": ["packages/learning/src/dataset.ts"],
  }[producer_id].sort();
  return {
    contract_version: "contentmd.task3-producer-witness/0.1.0",
    producer_id,
    schema_artifact: rawArtifact("packages/schemas/src/learning-records.schema.json"),
    source_artifacts: paths.map(rawArtifact) as Task3ProducerArtifactWitness["source_artifacts"],
    verification_mode: "development_fixture",
    verification_receipt: null,
  };
}

function storeArtifact(
  path: StoreArtifactWitness["path"],
  artifactId: string,
): StoreArtifactWitness {
  const bytes_utf8 = readWorkspaceText(path);
  const raw_bytes_digest = sha256Utf8(bytes_utf8);
  return {
    path,
    bytes_utf8,
    raw_bytes_digest,
    artifact_ref: { artifact_id: artifactId, artifact_version: "0.1.0", artifact_digest: raw_bytes_digest },
  };
}

function storeBinding(): StoreBindingWitness {
  const store_schema = storeArtifact(
    "fixtures/learning-ranking/feature-source-store-schema.json",
    "contentmd.feature-source-store-schema",
  );
  const runtime_profile = storeArtifact(
    "fixtures/learning-ranking/feature-source-runtime-profile.json",
    "contentmd.feature-source-runtime-profile",
  );
  const store_instance_id = "feature-store.task3.dataset-fixture";
  const store_kind = "synthetic_append_only_event_store" as const;
  const instance_nonce_digest = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id,
    store_kind,
    project_id: PROJECT_ID,
  });
  const identity = {
    contract_version: "contentmd.feature-store-binding/0.1.0" as const,
    store_kind,
    project_id: PROJECT_ID,
    store_instance_id,
    instance_nonce_digest,
    store_schema,
    runtime_profile,
  };
  const binding_id = `feature-store-binding.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, binding_id };
  return { ...withoutDigest, binding_digest: sha256Canonical(withoutDigest) };
}

function checkpointFor(
  input: ReturnType<typeof qualificationFixture>["input"],
): FeatureSourceCheckpointSet {
  const binding = storeBinding();
  const sourceMaterials = [
    ["task", input.task],
    ["context", input.context],
    ["fact_set", input.fact_set],
    ["policy", input.policy],
    ["candidate_a", input.candidate_a],
    ["candidate_b", input.candidate_b],
  ] as const;
  const entries = sourceMaterials.map(([source_role, value]) => {
    const source_ref = snapshotRef(value);
    const stream_id = deriveFeatureSourceStreamId(binding.binding_digest, PROJECT_ID, source_role);
    const event_id = deriveFeatureSourceEventId(
      binding.binding_digest,
      stream_id,
      source_ref,
      source_role,
      "project_owned_synthetic",
    );
    const eventPreimage = {
      event_id,
      stream_id,
      sequence: 1,
      schema_version: "0.1.0" as const,
      event_type: "feature_source_recorded",
      occurred_at: EVALUATION_AT,
      actor_ref: "contentmd.task3-development-fixture-recorder",
      data_class: "learning_feature_source",
      payload: {
        contract_version: "contentmd.feature-source-append/0.1.0" as const,
        project_id: PROJECT_ID,
        source_ref,
        source_role,
        source_class: "project_owned_synthetic" as const,
        rights_state: "training_permitted" as const,
      },
      predecessor_digest: null,
    };
    const event = { ...eventPreimage, event_digest: sha256Canonical(eventPreimage) };
    return {
      source_ref,
      source_role,
      source_class: "project_owned_synthetic" as const,
      rights_state: "training_permitted" as const,
      material: { material_kind: "task2_evidence_snapshot" as const, source_ref, value },
      stream_id,
      event_id,
      sequence: 1,
      event_digest: event.event_digest,
      event,
    };
  });
  const sortedEntries = entries.sort((left, right) => Buffer.compare(
    Buffer.from(canonicalJson(left.source_ref), "utf8"),
    Buffer.from(canonicalJson(right.source_ref), "utf8"),
  )) as [FeatureSourceManifestEntry, ...FeatureSourceManifestEntry[]];
  const manifestIdentity = {
    contract_version: "contentmd.feature-source-manifest/0.1.0" as const,
    project_id: PROJECT_ID,
    entries: sortedEntries,
  };
  const manifest_id = `feature-source-manifest.${sha256Canonical(manifestIdentity)}`;
  const manifestWithoutDigest = { ...manifestIdentity, manifest_id };
  const feature_source_manifest = { ...manifestWithoutDigest, manifest_digest: sha256Canonical(manifestWithoutDigest) };
  const eventByRole = new Map(sortedEntries.map((entry) => [entry.source_role, entry.event]));
  const streams = FEATURE_SOURCE_ROLES.map((role) => {
    const stream_id = deriveFeatureSourceStreamId(binding.binding_digest, PROJECT_ID, role);
    const event = eventByRole.get(role);
    const complete_prefix = event === undefined ? [] : [event];
    const maximum_sequence = complete_prefix.length;
    const head = complete_prefix.at(-1) ?? null;
    const prefix_digest = sha256Canonical({
      contract_version: "contentmd.feature-source-prefix/0.1.0",
      stream_id,
      maximum_sequence,
      complete_prefix,
    });
    const receiptWithoutDigest = {
      contract_version: "contentmd.stream-checkpoint-receipt/0.1.0" as const,
      store_binding_digest: binding.binding_digest,
      stream_id,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      prefix_digest,
      feature_source_manifest_digest: feature_source_manifest.manifest_digest,
      verification_method: "complete-prefix-sha256-chain" as const,
      verified_at: EVALUATION_AT,
    };
    return {
      stream_id,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      complete_prefix,
      prefix_digest,
      receipt: { ...receiptWithoutDigest, receipt_digest: sha256Canonical(receiptWithoutDigest) },
    };
  }).sort((left, right) => left.stream_id.localeCompare(right.stream_id, "en")) as FeatureSourceCheckpointSet["streams"];
  const identity = {
    contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
    record_mode: "development_fixture" as const,
    store_binding: binding,
    feature_source_manifest,
    streams,
  };
  const checkpoint_set_id = `feature-source-checkpoint-set.${sha256Canonical(identity)}`;
  const withoutDigest = {
    contract_version: "contentmd.feature-source-checkpoint-set/0.1.0" as const,
    checkpoint_set_id,
    record_mode: "development_fixture" as const,
    store_binding: binding,
    feature_source_manifest,
    streams,
  };
  return { ...withoutDigest, checkpoint_set_digest: sha256Canonical(withoutDigest) };
}

function relationMaterial(
  semanticSubjectRef: ReturnType<typeof snapshotRef>,
  candidateRef: ReturnType<typeof snapshotRef>,
): CompleteRelationMaterial {
  const identity = {
    contract_version: "contentmd.relation-membership-evidence/0.1.0" as const,
    evidence_version: "0.1.0" as const,
    verification_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    source_class: "project_owned_synthetic" as const,
    rights_state: "training_permitted" as const,
    evidence: {
      evidence_kind: "message_lineage" as const,
      semantic_subject_ref: semanticSubjectRef,
      member_candidate_refs: [candidateRef] as [typeof candidateRef, ...typeof candidateRef[]],
    },
  };
  const evidence_id = `relation-membership-evidence.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, evidence_id };
  const value: RelationMembershipEvidence = { ...withoutDigest, evidence_digest: sha256Canonical(withoutDigest) };
  return {
    material_kind: "relation_membership_evidence",
    material_ref: {
      record_id: value.evidence_id,
      schema_id: "contentmd.task3-relation-membership-evidence",
      schema_version: "0.1.0",
      content_digest: value.evidence_digest,
    },
    source_class: "project_owned_synthetic",
    rights_state: "training_permitted",
    value,
  };
}

function singletonLeakageEvidence(
  example: ReturnType<typeof completeExample>,
): LeakageEvidenceSnapshot {
  const exampleRef = {
    record_id: example.preference.record_id,
    schema_id: example.preference.schema_id,
    schema_version: example.preference.schema_version,
    content_digest: example.preference.content_digest,
  };
  const candidateRef = snapshotRef(example.qualification_input.candidate_a);
  const material = relationMaterial(candidateRef, candidateRef);
  const basis = {
    basis_kind: "message_lineage" as const,
    semantic_subject_ref: candidateRef,
    bindings: [{
      example_ref: exampleRef,
      candidate_sides: ["A"] as ["A"],
      candidate_refs: [candidateRef] as [typeof candidateRef, ...typeof candidateRef[]],
    }] as [{
      example_ref: typeof exampleRef;
      candidate_sides: ["A"];
      candidate_refs: [typeof candidateRef, ...typeof candidateRef[]];
    }],
    membership_evidence_ref: material.material_ref,
  };
  const relationIdentity = {
    contract_version: "contentmd.leakage-relation-identity/0.1.0",
    reason: "message_lineage" as const,
    basis,
    member_example_refs: [exampleRef] as [typeof exampleRef, ...typeof exampleRef[]],
    evidence_refs: [material.material_ref] as [typeof material.material_ref, ...typeof material.material_ref[]],
    source_class: "project_owned_synthetic" as const,
    rights_state: "training_permitted" as const,
  };
  const relation_digest = sha256Canonical(relationIdentity);
  const relation: LeakageRelationNode = {
    contract_version: "contentmd.leakage-relation/0.1.0",
    relation_id: `leakage-relation.message-lineage.${relation_digest}`,
    reason: "message_lineage",
    basis,
    member_example_refs: relationIdentity.member_example_refs,
    evidence_refs: relationIdentity.evidence_refs,
    source_class: "project_owned_synthetic",
    rights_state: "training_permitted",
    relation_digest,
  };
  const snapshotIdentity = {
    contract_version: "contentmd.leakage-evidence-snapshot/0.1.0" as const,
    snapshot_version: "0.1.0" as const,
    record_mode: "development_fixture" as const,
    cohort_scope: { memory_scope: "project" as const, project_id: PROJECT_ID },
    enumeration_state: "complete" as const,
    subjects: [{ example, relation_ids: [relation.relation_id] }] as [{ example: typeof example; relation_ids: [string, ...string[]] }],
    relation_nodes: [relation] as [LeakageRelationNode, ...LeakageRelationNode[]],
    additional_materials: [material],
  };
  const snapshot_id = `leakage-evidence.${sha256Canonical(snapshotIdentity)}`;
  const withoutDigest = { ...snapshotIdentity, snapshot_id };
  return { ...withoutDigest, snapshot_digest: sha256Canonical(withoutDigest) };
}

function completeExample() {
  const base = qualificationFixture(adaptContentDecisionEvent);
  const checkpoint = checkpointFor(base.input);
  const checkpointRef = task3CheckpointSetRef(checkpoint);
  const featureRefs = checkpoint.feature_source_manifest.entries.map((entry) => entry.source_ref);
  const presentation = rehashSnapshot({
    ...base.input.presentation,
    source_refs: canonicalSet([checkpointRef, ...featureRefs]) as typeof base.input.presentation.source_refs,
  });
  const review = rehashSnapshot({
    ...base.input.review,
    payload: { ...base.input.review.payload, presentation_ref: snapshotRef(presentation) },
  });
  const qualification_input = { ...base.input, presentation, review };
  const qualification = qualifyFeedback(qualification_input);
  const evidence = {
    ...base.evidence,
    qualification_input,
    presentation,
    review,
  };
  const eligibility_input = eligibilityFixture(
    qualification,
    evidence,
    base.adapted.decision,
  );
  const eligibility = determineLearningEligibility(eligibility_input);
  const preference_input = {
    ...preferenceFixture(
      qualification,
      eligibility,
      eligibility_input,
      base.adapted.decision,
      evidence,
    ),
    evaluation_at: EVALUATION_AT,
    feature_source_checkpoint_set_ref: checkpointRef,
  };
  const preference = createPreferenceExample(preference_input);
  return {
    qualification_input,
    qualification,
    eligibility_input,
    eligibility,
    preference_input,
    preference,
    feature_checkpoint_set: checkpoint,
    post_checkpoint_observation: null,
    blocking_evidence: [],
  };
}

function validBuildInput() {
  const example = completeExample();
  return {
    record_mode: "development_fixture" as const,
    evaluation_at: EVALUATION_AT,
    group_producer: task3Producer("leakage-group"),
    dataset_producer: task3Producer("learning-dataset"),
    unicode_artifacts: unicodeBundle(),
    leakage_evidence: singletonLeakageEvidence(example),
  };
}

function syntheticRef(prefix: string, index: number, schemaId = "contentmd.preference-example-record"): DigestRef {
  return {
    record_id: `${prefix}.${String(index).padStart(3, "0")}`,
    schema_id: schemaId,
    schema_version: "0.1.0",
    content_digest: sha256Canonical({ prefix, index }),
  };
}

function trainingEligibleManifest(): LearningDatasetManifest {
  const example_refs = canonicalSet(Array.from({ length: 100 }, (_, index) => syntheticRef("preference.synthetic", index))) as [DigestRef, ...DigestRef[]];
  const leakage_group_refs = canonicalSet(Array.from({ length: 30 }, (_, index) =>
    syntheticRef("leakage-group.synthetic", index, LEARNING_SCHEMA_IDS.leakageGroup))) as [DigestRef, ...DigestRef[]];
  const train_example_refs = canonicalSet(example_refs.slice(0, 60)) as [DigestRef, ...DigestRef[]];
  const validation_example_refs = canonicalSet(example_refs.slice(60, 80)) as [DigestRef, ...DigestRef[]];
  const test_example_refs = canonicalSet(example_refs.slice(80)) as [DigestRef, ...DigestRef[]];
  const permission_refs = [syntheticRef("permission.synthetic", 0, "contentmd.task2-learning-permission-snapshot")] as [DigestRef, ...DigestRef[]];
  const feature_source_checkpoint_refs = [syntheticRef("checkpoint.synthetic", 0, "contentmd.feature-source-checkpoint-set")] as [DigestRef, ...DigestRef[]];
  const input_digest = sha256Canonical({ fixture: "training-eligible-manifest" });
  const artifact = (artifactId: string, relationship: string) => ({
    record_id: `artifact.${artifactId}.17.0.0`,
    relationship,
    content_digest: sha256Canonical({ fixture: artifactId }),
  });
  const provenance = task3SortProvenance([
    {
      record_id: "leakage-evidence.synthetic",
      relationship: "leakage_evidence_snapshot",
      content_digest: sha256Canonical({ fixture: "leakage-evidence" }),
    },
    ...leakage_group_refs.map((ref) => ({
      record_id: ref.record_id,
      relationship: "leakage_group",
      content_digest: ref.content_digest,
    })),
    ...example_refs.map((ref) => ({
      record_id: ref.record_id,
      relationship: "preference_example",
      content_digest: ref.content_digest,
    })),
    ...permission_refs.map((ref) => ({
      record_id: ref.record_id,
      relationship: "learning_permission",
      content_digest: ref.content_digest,
    })),
    ...feature_source_checkpoint_refs.map((ref) => ({
      record_id: ref.record_id,
      relationship: "feature_source_checkpoint_set",
      content_digest: ref.content_digest,
    })),
    artifact("unicode-normalization", "normalization_artifact"),
    artifact("unicode-casefold", "normalization_artifact"),
    artifact("unicode-whitespace", "normalization_artifact"),
    artifact("unicode-word-break", "word_break_artifact"),
    artifact("unicode-grapheme-break", "grapheme_break_artifact"),
  ]);
  return finalizeRecord({
    record_id: `learning-dataset.${input_digest}`,
    schema_id: LEARNING_SCHEMA_IDS.learningDatasetManifest,
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project",
      project_id: PROJECT_ID,
      resource_refs: example_refs.map((ref) => ref.record_id).sort(),
      data_classes: ["learning_data"],
    },
    provenance: provenance as [typeof provenance[number], ...typeof provenance[number][]],
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: sha256Canonical({ fixture: "schema" }),
      code_digest: sha256Canonical({ fixture: "code" }),
      input_digest,
      authority_effect: "none",
      example_refs,
      exclusions: [],
      leakage_group_refs,
      train_example_refs,
      validation_example_refs,
      test_example_refs,
      permission_refs,
      feature_source_checkpoint_refs,
      counts: {
        examples: 100,
        groups: 30,
        train_examples: 60,
        train_groups: 20,
        validation_examples: 20,
        validation_groups: 5,
        test_examples: 20,
        test_groups: 5,
      },
      test_open_state: "not_applicable",
      dataset_state: "training_eligible",
    },
  }) as unknown as LearningDatasetManifest;
}

function refinalizeManifest(manifest: LearningDatasetManifest): LearningDatasetManifest {
  const { content_digest: _digest, ...preimage } = manifest;
  return finalizeRecord(preimage) as unknown as LearningDatasetManifest;
}

function sealWitness(source: LearningDatasetManifest): DatasetSealWitness {
  const membership_digest = sha256Canonical({
    contract_version: "contentmd.learning-dataset-membership/0.1.0",
    example_refs: source.payload.example_refs,
    exclusions: source.payload.exclusions,
    leakage_group_refs: source.payload.leakage_group_refs,
    train_example_refs: source.payload.train_example_refs,
    validation_example_refs: source.payload.validation_example_refs,
    test_example_refs: source.payload.test_example_refs,
    permission_refs: source.payload.permission_refs,
    feature_source_checkpoint_refs: source.payload.feature_source_checkpoint_refs,
    counts: source.payload.counts,
  });
  const source_dataset_ref = {
    record_id: source.record_id,
    schema_id: source.schema_id,
    schema_version: source.schema_version,
    content_digest: source.content_digest,
  };
  const identity = {
    contract_version: "contentmd.dataset-seal-witness/0.1.0" as const,
    source_dataset_ref,
    sealed_at: EVALUATION_AT,
    membership_digest,
    verification_mode: "development_fixture" as const,
  };
  return { ...identity, verification_receipt: null, seal_digest: sha256Canonical(identity) };
}

function readbackSealWitness(source: LearningDatasetManifest): DatasetSealWitness {
  const membership_digest = sealWitness(source).membership_digest;
  const source_dataset_ref = {
    record_id: source.record_id,
    schema_id: source.schema_id,
    schema_version: source.schema_version,
    content_digest: source.content_digest,
  };
  const identity = {
    contract_version: "contentmd.dataset-seal-witness/0.1.0" as const,
    source_dataset_ref,
    sealed_at: EVALUATION_AT,
    membership_digest,
    verification_mode: "readback_verified" as const,
  };
  const seal_digest = sha256Canonical(identity);
  const targetPath = `contentmd://task3/dataset-seal/${source.record_id}`;
  const verification_receipt = finalizeRecord({
    record_id: `verification-receipt.dataset-seal.${seal_digest}`,
    schema_id: "contentmd.verification-receipt-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "task",
      project_id: null,
      resource_refs: [targetPath],
      data_classes: ["verification_metadata"],
    },
    provenance: [],
    lifecycle_state: "active",
    payload: {
      transaction_ref: `dataset-seal.${seal_digest}`,
      target_path: targetPath,
      expected_digest: membership_digest,
      observed_digest: membership_digest,
      status: "passed",
      verified_at: EVALUATION_AT,
      method: "sha256-canonical-readback",
    },
  });
  return { ...identity, verification_receipt, seal_digest };
}

describe("Task 3 dataset input boundary", () => {
  it("builds one evidence-backed singleton group and withholds an unrepresentable split manifest", () => {
    const input = validBuildInput();
    expect(() => verifyLeakageEvidenceSnapshot(input.leakage_evidence)).not.toThrow();
    const result = buildLearningDataset(input);
    expect(result.groups).toHaveLength(1);
    expect(result.groups[0]!.payload.member_refs).toHaveLength(1);
    expect(result.groups[0]!.payload.edges).toEqual([]);
    expect(result.groups[0]!.provenance.map((entry) => entry.relationship)).toEqual(
      expect.arrayContaining([
        "leakage_component_evidence",
        "leakage_relationship",
        "leakage_relationship_evidence",
        "member_example",
      ]),
    );
    expect(result.manifest).toBeNull();
    expect(result.diagnostics.issuance_disposition).toBe("manifest_unissued_structural_empty");
    expect(result.diagnostics.submitted_examples).toBe(1);
    expect(result.diagnostics.included_examples).toBe(1);
    expect(result.diagnostics.counts.groups).toBe(1);
  });

  it("rejects official mode after validating the closed top-level shape", () => {
    expect(() => buildLearningDataset({
      record_mode: "official",
      evaluation_at: "2026-08-20T19:00:00.000Z",
      group_producer: {},
      dataset_producer: {},
      unicode_artifacts: {},
      leakage_evidence: {},
    } as never)).toThrow("task3_contract_invalid:official_mode_not_supported");
  });

  it("rejects unknown top-level keys before official mode", () => {
    expect(() => buildLearningDataset({
      record_mode: "official",
      evaluation_at: "2026-08-20T19:00:00.000Z",
      group_producer: {},
      dataset_producer: {},
      unicode_artifacts: {},
      leakage_evidence: {},
      unknown: true,
    } as never)).toThrow("task3_contract_invalid:input_shape");
  });

  it("rejects symbol, inherited, non-enumerable, and accessor top-level state before official mode", () => {
    const symbolKey = validBuildInput() as ReturnType<typeof validBuildInput> & Record<symbol, unknown>;
    symbolKey[Symbol("unknown")] = true;
    symbolKey.record_mode = "official";
    expect(() => buildLearningDataset(symbolKey)).toThrow(
      "task3_contract_invalid:input_shape",
    );

    const inherited = validBuildInput();
    inherited.record_mode = "official";
    Object.setPrototypeOf(inherited, { inherited: true });
    expect(() => buildLearningDataset(inherited)).toThrow(
      "task3_contract_invalid:input_shape",
    );

    const nonEnumerable = validBuildInput() as ReturnType<typeof validBuildInput> & { hidden?: boolean };
    nonEnumerable.record_mode = "official";
    Object.defineProperty(nonEnumerable, "hidden", { enumerable: false, value: true });
    expect(() => buildLearningDataset(nonEnumerable)).toThrow(
      "task3_contract_invalid:input_shape",
    );

    let reads = 0;
    const accessor = validBuildInput();
    accessor.record_mode = "official";
    Object.defineProperty(accessor, "evaluation_at", {
      enumerable: true,
      get() {
        reads += 1;
        return EVALUATION_AT;
      },
    });
    expect(() => buildLearningDataset(accessor)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it("descriptor-preflights the whole graph without invoking accessors", () => {
    let reads = 0;
    const producer = {};
    Object.defineProperty(producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "leakage-group";
      },
    });
    expect(() => buildLearningDataset({
      record_mode: "development_fixture",
      evaluation_at: "2026-08-20T19:00:00.000Z",
      group_producer: producer,
      dataset_producer: {},
      unicode_artifacts: {},
      leakage_evidence: {},
    } as never)).toThrow("task3_contract_invalid:input_shape");
    expect(reads).toBe(0);
  });

  it("applies build and snapshot mode/shape precedence before nested accessors", () => {
    let reads = 0;
    const official = validBuildInput();
    official.record_mode = "official";
    Object.defineProperty(official.group_producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "leakage-group";
      },
    });
    expect(() => buildLearningDataset(official)).toThrow(
      "task3_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);

    const invalidTopShape = validBuildInput() as ReturnType<typeof validBuildInput> & { extra?: boolean };
    invalidTopShape.record_mode = "official";
    invalidTopShape.extra = true;
    Object.defineProperty(invalidTopShape.dataset_producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "learning-dataset";
      },
    });
    expect(() => buildLearningDataset(invalidTopShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const officialSnapshot = structuredClone(validBuildInput().leakage_evidence);
    officialSnapshot.record_mode = "official";
    Object.defineProperty(officialSnapshot.cohort_scope, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => verifyLeakageEvidenceSnapshot(officialSnapshot)).toThrow(
      "task3_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);

    const nestedShape = validBuildInput() as ReturnType<typeof validBuildInput> & {
      group_producer: Task3ProducerArtifactWitness & { extra?: boolean };
    };
    nestedShape.group_producer.extra = true;
    Object.defineProperty(nestedShape.dataset_producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "learning-dataset";
      },
    });
    expect(() => buildLearningDataset(nestedShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedArtifactShape = validBuildInput() as ReturnType<typeof validBuildInput> & {
      group_producer: Task3ProducerArtifactWitness & {
        schema_artifact: Task3ProducerArtifactWitness["schema_artifact"] & { extra?: boolean };
      };
    };
    nestedArtifactShape.group_producer.schema_artifact.extra = true;
    Object.defineProperty(nestedArtifactShape.dataset_producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "learning-dataset";
      },
    });
    expect(() => buildLearningDataset(nestedArtifactShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedSubjectShape = validBuildInput() as ReturnType<typeof validBuildInput> & {
      leakage_evidence: LeakageEvidenceSnapshot & {
        subjects: [LeakageEvidenceSnapshot["subjects"][number] & { extra?: boolean }, ...LeakageEvidenceSnapshot["subjects"]];
      };
    };
    nestedSubjectShape.leakage_evidence.subjects[0]!.extra = true;
    Object.defineProperty(nestedSubjectShape.leakage_evidence.cohort_scope, "project_id", {
      enumerable: true,
      get() {
        reads += 1;
        return PROJECT_ID;
      },
    });
    expect(() => buildLearningDataset(nestedSubjectShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it.each([
    ["relation node", (input: ReturnType<typeof validBuildInput>) => {
      input.leakage_evidence.relation_nodes[0] = { extra: true } as never;
    }],
    ["relation basis", (input: ReturnType<typeof validBuildInput>) => {
      (input.leakage_evidence.relation_nodes[0]!.basis as unknown as Record<string, unknown>).extra = true;
    }],
    ["relation material wrapper", (input: ReturnType<typeof validBuildInput>) => {
      (input.leakage_evidence.additional_materials[0] as unknown as Record<string, unknown>).extra = true;
    }],
    ["relation evidence envelope", (input: ReturnType<typeof validBuildInput>) => {
      (input.leakage_evidence.additional_materials[0]!.value as unknown as Record<string, unknown>).extra = true;
    }],
    ["relation evidence payload", (input: ReturnType<typeof validBuildInput>) => {
      (input.leakage_evidence.additional_materials[0]!.value.evidence as unknown as Record<string, unknown>).extra = true;
    }],
    ["feature manifest entry", (input: ReturnType<typeof validBuildInput>) => {
      const entry = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set.feature_source_manifest.entries[0]!;
      (entry as unknown as Record<string, unknown>).extra = true;
    }],
    ["feature material", (input: ReturnType<typeof validBuildInput>) => {
      const material = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set.feature_source_manifest.entries[0]!.material;
      (material as unknown as Record<string, unknown>).extra = true;
    }],
    ["stored event payload", (input: ReturnType<typeof validBuildInput>) => {
      const stream = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set.streams
        .find((candidate) => candidate.complete_prefix.length > 0)!;
      (stream.complete_prefix[0]!.payload as unknown as Record<string, unknown>).extra = true;
    }],
    ["stream receipt", (input: ReturnType<typeof validBuildInput>) => {
      const receipt = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set.streams[0]!.receipt;
      (receipt as unknown as Record<string, unknown>).extra = true;
    }],
    ["deep Task 2 subject payload", (input: ReturnType<typeof validBuildInput>) => {
      (input.leakage_evidence.subjects[0]!.example.qualification_input.task.payload as unknown as Record<string, unknown>).extra = true;
    }],
  ] as const)("descriptor-preflights every nested %s before a later accessor", (_label, mutate) => {
    let reads = 0;
    const input = validBuildInput();
    mutate(input);
    Object.defineProperty(input.dataset_producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "learning-dataset";
      },
    });
    expect(() => buildLearningDataset(input)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it.each([
    ["relation basis discriminator", (input: ReturnType<typeof validBuildInput>, onRead: () => void) => {
      const basis = input.leakage_evidence.relation_nodes[0]!.basis as unknown as Record<string, unknown>;
      const bindings = basis.bindings as Array<Record<string, unknown>>;
      bindings[0] = { ...bindings[0], extra: true };
      const value = basis.basis_kind;
      Object.defineProperty(basis, "basis_kind", {
        enumerable: true,
        get() {
          onRead();
          return value;
        },
      });
    }],
    ["relation evidence discriminator", (input: ReturnType<typeof validBuildInput>, onRead: () => void) => {
      const evidence = input.leakage_evidence.additional_materials[0]!.value.evidence as unknown as Record<string, unknown>;
      evidence.extra = true;
      const value = evidence.evidence_kind;
      Object.defineProperty(evidence, "evidence_kind", {
        enumerable: true,
        get() {
          onRead();
          return value;
        },
      });
    }],
    ["feature material discriminator", (input: ReturnType<typeof validBuildInput>, onRead: () => void) => {
      const material = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set
        .feature_source_manifest.entries[0]!.material;
      const record = material as unknown as Record<string, unknown>;
      const snapshot = record.value as Record<string, unknown>;
      record.value = {
        ...snapshot,
        payload: { ...(snapshot.payload as Record<string, unknown>), extra: true },
      };
      const value = record.material_kind;
      Object.defineProperty(record, "material_kind", {
        enumerable: true,
        get() {
          onRead();
          return value;
        },
      });
    }],
    ["feature snapshot discriminator", (input: ReturnType<typeof validBuildInput>, onRead: () => void) => {
      const material = input.leakage_evidence.subjects[0]!.example.feature_checkpoint_set
        .feature_source_manifest.entries[0]!.material as unknown as Record<string, unknown>;
      const original = material.value as Record<string, unknown>;
      const snapshot = {
        ...original,
        payload: { ...(original.payload as Record<string, unknown>), extra: true },
      };
      material.value = snapshot;
      const value = snapshot.snapshot_kind;
      Object.defineProperty(snapshot, "snapshot_kind", {
        enumerable: true,
        get() {
          onRead();
          return value;
        },
      });
    }],
  ] as const)("finds nested %s shape faults without reading discriminators", (_label, mutate) => {
    let reads = 0;
    const input = validBuildInput();
    mutate(input, () => {
      reads += 1;
    });
    expect(() => buildLearningDataset(input)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it("applies evidence identity and digest categories before producer semantics", () => {
    const wrongRecordId = validBuildInput();
    wrongRecordId.group_producer.source_artifacts[0]!.path = "packages/learning/src/dataset.ts";
    wrongRecordId.leakage_evidence.snapshot_id = "INVALID";
    expect(() => buildLearningDataset(wrongRecordId)).toThrow(
      "task3_contract_invalid:record_id",
    );

    const wrongSchemaId = validBuildInput();
    wrongSchemaId.group_producer.source_artifacts[0]!.path = "packages/learning/src/dataset.ts";
    wrongSchemaId.leakage_evidence.subjects[0]!.example.preference.schema_id = "";
    expect(() => buildLearningDataset(wrongSchemaId)).toThrow(
      "task3_contract_invalid:schema_id",
    );

    const malformedDigest = validBuildInput();
    malformedDigest.group_producer.source_artifacts[0]!.path = "packages/learning/src/dataset.ts";
    malformedDigest.leakage_evidence.snapshot_digest = "not-a-digest";
    expect(() => buildLearningDataset(malformedDigest)).toThrow(
      "task3_contract_invalid:digest",
    );
  });

  it("checks an outer evidence snapshot commitment before subject relationships", () => {
    const snapshot = structuredClone(validBuildInput().leakage_evidence);
    snapshot.subjects[0]!.relation_ids = ["leakage-relation.missing.fixture"];
    expect(() => verifyLeakageEvidenceSnapshot(snapshot)).toThrow(
      "task3_contract_invalid:snapshot_digest",
    );
  });

  it("re-derives admission disqualifiers instead of trusting the verified wrapper", () => {
    const input = validBuildInput();
    const subject = structuredClone(input.leakage_evidence.subjects[0]!);
    subject.example.blocking_evidence = [{
      evidence_ref: syntheticRef("blocking.third-party", 0, "contentmd.task3-blocking-evidence"),
      source_class: "third_party",
      purpose: "dataset_exclusion_only",
      contains_expression: false,
    }];
    const verified = verifyDatasetExample(subject);
    expect(verified.exclusion_reasons).toEqual(["forbidden_source_class"]);

    expect(() => deriveLeakageGroups({
      record_mode: "development_fixture",
      producer: input.group_producer,
      unicode_artifacts: input.unicode_artifacts,
      admitted_examples: [verified],
      relation_nodes: input.leakage_evidence.relation_nodes,
      additional_materials: input.leakage_evidence.additional_materials,
    })).toThrow("task3_contract_invalid:dataset_partition");

    verified.exclusion_reasons = [];
    expect(() => deriveLeakageGroups({
      record_mode: "development_fixture",
      producer: input.group_producer,
      unicode_artifacts: input.unicode_artifacts,
      admitted_examples: [verified],
      relation_nodes: input.leakage_evidence.relation_nodes,
      additional_materials: input.leakage_evidence.additional_materials,
    })).toThrow("task3_contract_invalid:reference_integrity");

    const mismatched = structuredClone(validBuildInput().leakage_evidence.subjects[0]!);
    mismatched.example.preference_input = {
      ...mismatched.example.preference_input,
      feature_source_checkpoint_set_ref: syntheticRef(
        "checkpoint.unbound",
        0,
        "contentmd.feature-source-checkpoint-set",
      ),
    };
    mismatched.example.preference = createPreferenceExample(mismatched.example.preference_input);
    const missingAsOf = verifyDatasetExample(mismatched);
    expect(missingAsOf.feature_as_of_digest).toBeNull();
    expect(missingAsOf.exclusion_reasons).toContain("presentation_checkpoint_mismatch");
  });
});

describe("Task 3 sealing boundary", () => {
  it("seals exact threshold-complete membership without opening the test set", () => {
    const source = trainingEligibleManifest();
    const sourceBytes = canonicalJson(source);
    const sealed = sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: source,
      witness: sealWitness(source),
    });
    expect(sealed.payload.dataset_state).toBe("sealed");
    expect(sealed.payload.test_open_state).toBe("sealed");
    expect(sealed.payload.example_refs).toEqual(source.payload.example_refs);
    expect(sealed.record_id).not.toBe(source.record_id);
    expect(canonicalJson(source)).toBe(sourceBytes);
  });

  it("rejects diagnostics-only sources and altered membership commitments", () => {
    const source = trainingEligibleManifest();
    const { content_digest: _digest, ...preimage } = source;
    const diagnosticsOnly = finalizeRecord({
      ...preimage,
      payload: { ...preimage.payload, dataset_state: "diagnostics_only" as const },
    }) as unknown as LearningDatasetManifest;
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: diagnosticsOnly,
      witness: sealWitness(diagnosticsOnly),
    })).toThrow("task3_contract_invalid:dataset_state");

    const witness = sealWitness(source);
    witness.membership_digest = "f".repeat(64);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: source,
      witness,
    })).toThrow("task3_contract_invalid:dataset_partition");
  });

  it("rejects rehashed source manifests with impossible producer-era invariants", () => {
    const wrongContract = structuredClone(trainingEligibleManifest());
    wrongContract.payload.contract_version = "contentmd.learning-record-contract/9.9.9" as never;
    const rehashedWrongContract = refinalizeManifest(wrongContract);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: rehashedWrongContract,
      witness: sealWitness(rehashedWrongContract),
    })).toThrow("task3_contract_invalid:dataset_state");

    const wrongGroupSchema = structuredClone(trainingEligibleManifest());
    wrongGroupSchema.payload.leakage_group_refs = wrongGroupSchema.payload.leakage_group_refs.map((ref) => ({
      ...ref,
      schema_id: LEARNING_SCHEMA_IDS.preferenceExample,
    })) as typeof wrongGroupSchema.payload.leakage_group_refs;
    const rehashedWrongGroupSchema = refinalizeManifest(wrongGroupSchema);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: rehashedWrongGroupSchema,
      witness: sealWitness(rehashedWrongGroupSchema),
    })).toThrow("task3_contract_invalid:reference_integrity");

    const impossibleCounts = structuredClone(trainingEligibleManifest());
    impossibleCounts.payload.counts.train_groups -= 1;
    const rehashedImpossibleCounts = refinalizeManifest(impossibleCounts);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: rehashedImpossibleCounts,
      witness: sealWitness(rehashedImpossibleCounts),
    })).toThrow("task3_contract_invalid:dataset_counts");

    const unknownExclusion = structuredClone(trainingEligibleManifest());
    unknownExclusion.payload.exclusions = [{
      example_ref: syntheticRef("preference.excluded", 0),
      reason_code: "caller_asserted_reason",
    }];
    const rehashedUnknownExclusion = refinalizeManifest(unknownExclusion);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: rehashedUnknownExclusion,
      witness: sealWitness(rehashedUnknownExclusion),
    })).toThrow("task3_contract_invalid:input_shape");

    const staleNestedExclusion = structuredClone(trainingEligibleManifest()) as LearningDatasetManifest & {
      payload: LearningDatasetManifest["payload"] & {
        exclusions: [{ example_ref: DigestRef; reason_code: string; extra?: boolean }];
      };
    };
    staleNestedExclusion.payload.exclusions = [{
      example_ref: syntheticRef("preference.excluded", 1),
      reason_code: "record_not_active",
      extra: true,
    }];
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: staleNestedExclusion,
      witness: sealWitness(staleNestedExclusion),
    })).toThrow("task3_contract_invalid:input_shape");

    const strippedProvenance = structuredClone(trainingEligibleManifest());
    const missingGroup = strippedProvenance.payload.leakage_group_refs[0]!;
    strippedProvenance.provenance = strippedProvenance.provenance.filter((entry) =>
      entry.relationship !== "leakage_group" || entry.record_id !== missingGroup.record_id) as typeof strippedProvenance.provenance;
    const rehashedStrippedProvenance = refinalizeManifest(strippedProvenance);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: rehashedStrippedProvenance,
      witness: sealWitness(rehashedStrippedProvenance),
    })).toThrow("task3_contract_invalid:provenance");
  });

  it("requires an exact closed readback receipt for sealing", () => {
    const source = trainingEligibleManifest();
    const witness = readbackSealWitness(source);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: source,
      witness,
    })).not.toThrow();

    const malformedReceipt = structuredClone(witness.verification_receipt!) as typeof witness.verification_receipt & {
      payload: NonNullable<typeof witness.verification_receipt>["payload"] & { extra?: boolean };
    };
    malformedReceipt!.payload.extra = true;
    const { content_digest: _digest, ...receiptPreimage } = malformedReceipt!;
    witness.verification_receipt = finalizeRecord(receiptPreimage);
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer: task3Producer("dataset-seal"),
      source_manifest: source,
      witness,
    })).toThrow("task3_contract_invalid:input_shape");
  });

  it("rejects official sealing without issuing a record", () => {
    expect(() => sealLearningDataset({
      record_mode: "official",
      producer: {},
      source_manifest: {},
      witness: {},
    } as never)).toThrow("task3_contract_invalid:official_mode_not_supported");
  });

  it("applies seal mode and shape precedence before recursive canonical checks", () => {
    let reads = 0;
    const source = trainingEligibleManifest();
    const official = {
      record_mode: "official" as const,
      producer: task3Producer("dataset-seal"),
      source_manifest: source,
      witness: sealWitness(source),
    };
    Object.defineProperty(official.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "dataset-seal";
      },
    });
    expect(() => sealLearningDataset(official)).toThrow(
      "task3_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);

    const nestedShapeSource = trainingEligibleManifest() as LearningDatasetManifest & {
      payload: LearningDatasetManifest["payload"] & { extra?: boolean };
    };
    nestedShapeSource.payload.extra = true;
    const nestedShape = {
      record_mode: "development_fixture" as const,
      producer: task3Producer("dataset-seal"),
      source_manifest: nestedShapeSource,
      witness: sealWitness(nestedShapeSource),
    };
    Object.defineProperty(nestedShape.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "dataset-seal";
      },
    });
    expect(() => sealLearningDataset(nestedShape)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);

    const nestedProvenanceSource = trainingEligibleManifest() as LearningDatasetManifest & {
      provenance: [LearningDatasetManifest["provenance"][number] & { extra?: boolean }, ...LearningDatasetManifest["provenance"]];
    };
    nestedProvenanceSource.provenance[0]!.extra = true;
    const nestedProvenance = {
      record_mode: "development_fixture" as const,
      producer: task3Producer("dataset-seal"),
      source_manifest: nestedProvenanceSource,
      witness: sealWitness(nestedProvenanceSource),
    };
    Object.defineProperty(nestedProvenance.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "dataset-seal";
      },
    });
    expect(() => sealLearningDataset(nestedProvenance)).toThrow(
      "task3_contract_invalid:input_shape",
    );
    expect(reads).toBe(0);
  });

  it("checks source durable integrity before seal-producer semantics", () => {
    const source = trainingEligibleManifest();
    source.payload.dataset_state = "diagnostics_only";
    const producer = task3Producer("dataset-seal");
    producer.source_artifacts[0]!.path = "packages/learning/src/leakage.ts";
    expect(() => sealLearningDataset({
      record_mode: "development_fixture",
      producer,
      source_manifest: source,
      witness: sealWitness(source),
    })).toThrow("task3_contract_invalid:durable_record_digest");
  });
});
