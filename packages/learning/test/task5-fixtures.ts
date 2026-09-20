import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  buildLearningDataset,
  sealLearningDataset,
  type BuildLearningDatasetInput,
  type DatasetSealWitness,
  type LearningDatasetBuildResult,
} from "../src/dataset.js";
import { determineLearningEligibility } from "../src/eligibility.js";
import { adaptContentDecisionEvent } from "../src/feedback.js";
import {
  createFeatureProfile,
  vectorizeCandidate,
  type CandidateEligibilityGate,
  type CandidateRuleEvaluation,
  type CandidateVectorizationInput,
  type CreateFeatureProfileInput,
  type FeatureArtifactBinding,
  type FeatureMaterial,
  type FeatureUniverseManifest,
  type ScopeMaterial,
} from "../src/features.js";
import {
  FEATURE_SOURCE_ROLES,
  deriveFeatureSourceEventId,
  deriveFeatureSourceStreamId,
  task3CheckpointSetRef,
  type CompleteRelationMaterial,
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
  type LeakageEvidenceSnapshot,
  type LeakageRelationNode,
  type RelationCandidateBinding,
  type RelationMembershipEvidence,
  type StoreArtifactWitness,
  type StoreBindingWitness,
  type Task3ProducerArtifactWitness,
} from "../src/leakage.js";
import { createPreferenceExample } from "../src/preference.js";
import { qualifyFeedback } from "../src/qualification.js";
import type { DigestRef, LearningDatasetManifest } from "../src/records.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";
import {
  PROJECT_ID,
  bareRef,
  canonicalSet,
  eligibilityFixture,
  makeSnapshot,
  preferenceFixture,
  qualificationFixture,
  rehashSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";
import { task4Fixture, type Task4Fixture } from "./task4-fixtures.js";

const DATASET_EVALUATION_AT = "2026-08-20T19:00:00.000Z";
const MEMBERS_PER_GROUP = 4;
const PERMISSION_GROUP_COUNT = 120;
const GROUP_IDS = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17, 19, 20, 22,
  15, 18, 27, 50, 65,
  21, 32, 54, 58, 62,
] as const;
type PreferenceMode = "baseline_aligned" | "baseline_opposed";
const DEFAULT_PREFERENCE_MODE: PreferenceMode = "baseline_aligned";
const OPPOSED_GROUP_IDS = [
  1, 2, 4, 5, 6, 7, 8, 9, 11, 12, 14, 15, 18, 19, 20, 21, 22, 25, 26, 30,
  10, 13, 16, 17, 23,
  0, 3, 24, 28, 29,
] as const;

function groupIdsForMode(mode: PreferenceMode): readonly number[] {
  return mode === "baseline_opposed" ? OPPOSED_GROUP_IDS : GROUP_IDS;
}

function sha256Utf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function compareCanonical(left: unknown, right: unknown): number {
  return Buffer.compare(
    Buffer.from(canonicalJson(left), "utf8"),
    Buffer.from(canonicalJson(right), "utf8"),
  );
}

function cloneFixtureTree<T>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((entry) => cloneFixtureTree(entry)) as T;
  }
  if (value !== null && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, entry]) => [
      key,
      cloneFixtureTree(entry),
    ])) as T;
  }
  return value;
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

function storeArtifact(path: StoreArtifactWitness["path"], artifactId: string): StoreArtifactWitness {
  const bytes_utf8 = readWorkspaceText(path);
  const raw_bytes_digest = sha256Utf8(bytes_utf8);
  return {
    path,
    bytes_utf8,
    raw_bytes_digest,
    artifact_ref: {
      artifact_id: artifactId,
      artifact_version: "0.1.0",
      artifact_digest: raw_bytes_digest,
    },
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
  const store_instance_id = "feature-store.task5.dataset-fixture";
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
      occurred_at: DATASET_EVALUATION_AT,
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
  const feature_source_manifest = {
    ...manifestWithoutDigest,
    manifest_digest: sha256Canonical(manifestWithoutDigest),
  };
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
      verified_at: DATASET_EVALUATION_AT,
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

type QualifiedExample = {
  base: ReturnType<typeof qualificationFixture>;
  task4: Task4Fixture;
  checkpoint: FeatureSourceCheckpointSet;
  checkpointRef: ReturnType<typeof task3CheckpointSetRef>;
  qualification_input: ReturnType<typeof qualificationFixture>["input"];
  qualification: ReturnType<typeof qualifyFeedback>;
  evidence: ReturnType<typeof qualificationFixture>["evidence"];
};

const qualifiedGroupsCache = new Map<PreferenceMode, Map<number, QualifiedExample>>();

function groupExpressions(group: number, mode: PreferenceMode): {
  expressionA: string;
  expressionB: string;
  outcome: "A" | "B";
} {
  const suffix = String(group).padStart(3, "0");
  if (group === 0) {
    const tie = {
      expressionA: `${sha256Utf8("task5-tie-a-000").slice(0, 24)} clear next`,
      expressionB: `${sha256Utf8("task5-tie-b-000").slice(0, 24)} clear next`,
      outcome: "A" as const,
    };
    return mode === "baseline_aligned" ? tie : { ...tie, outcome: "B" };
  }
  const good = `${sha256Utf8(`task5-good-${suffix}`).slice(0, 24)} clear next`;
  const weak = `${sha256Utf8(`task5-weak-${suffix}`).slice(0, 24)} unlock possibilities seamless experience`;
  const aligned = group % 2 === 0
    ? { expressionA: good, expressionB: weak, outcome: "A" }
    : { expressionA: weak, expressionB: good, outcome: "B" };
  return mode === "baseline_aligned"
    ? aligned as typeof aligned & { outcome: "A" | "B" }
    : { ...aligned, outcome: aligned.outcome === "A" ? "B" : "A" } as typeof aligned & {
        outcome: "A" | "B";
      };
}

function qualifiedExample(group: number, mode: PreferenceMode): QualifiedExample {
  const expressions = groupExpressions(group, mode);
  const base = qualificationFixture(adaptContentDecisionEvent, expressions);
  const task4 = task4Fixture({
    expression: expressions.expressionA,
    expressionB: expressions.expressionB,
    contextId: `snapshot.context.task5.${String(group).padStart(3, "0")}`,
    reuseStaticArtifacts: true,
  });
  const checkpoint = task4.vectorInput.checkpoint_set;
  const snapshotForRole = (role: "task" | "context" | "fact_set" | "policy" | "candidate_a" | "candidate_b") => {
    const entry = checkpoint.feature_source_manifest.entries.find((candidate) => candidate.source_role === role);
    if (entry?.material.material_kind !== "task2_evidence_snapshot") {
      throw new Error(`task5_fixture_snapshot_missing:${role}`);
    }
    return entry.material.value;
  };
  const task = snapshotForRole("task") as typeof base.input.task;
  const context = snapshotForRole("context") as typeof base.input.context;
  const fact_set = snapshotForRole("fact_set") as typeof base.input.fact_set;
  const policy = snapshotForRole("policy") as typeof base.input.policy;
  const candidate_a = snapshotForRole("candidate_a") as typeof base.input.candidate_a;
  const candidate_b = snapshotForRole("candidate_b") as typeof base.input.candidate_b;
  const checkpointRef = task3CheckpointSetRef(checkpoint);
  const featureRefs = checkpoint.feature_source_manifest.entries.map((entry) => entry.source_ref);
  const assignmentPreimage = {
    contract_version: "contentmd.task2-presentation-assignment/0.1.0",
    task_ref: snapshotRef(task),
    context_ref: snapshotRef(context),
    candidate_a_ref: snapshotRef(candidate_a),
    candidate_b_ref: snapshotRef(candidate_b),
    canonical_order: base.input.presentation.payload.canonical_order,
    presented_order: base.input.presentation.payload.presented_order,
    seed_commitment_digest: base.input.presentation.payload.randomization_proof.seed_commitment_digest,
  };
  const presentation = rehashSnapshot({
    ...base.input.presentation,
    source_refs: canonicalSet([checkpointRef, ...featureRefs]) as typeof base.input.presentation.source_refs,
    payload: {
      ...base.input.presentation.payload,
      task_ref: snapshotRef(task),
      context_ref: snapshotRef(context),
      candidate_a_ref: snapshotRef(candidate_a),
      candidate_b_ref: snapshotRef(candidate_b),
      fact_set_ref: snapshotRef(fact_set),
      policy_ref: snapshotRef(policy),
      requirements_digest: task.payload.requirements_digest,
      randomization_proof: {
        ...base.input.presentation.payload.randomization_proof,
        assignment_digest: sha256Canonical(assignmentPreimage),
      },
    },
  });
  const review = rehashSnapshot({
    ...base.input.review,
    payload: {
      ...base.input.review.payload,
      presentation_ref: snapshotRef(presentation),
      observed_fact_set_ref: snapshotRef(fact_set),
      observed_policy_ref: snapshotRef(policy),
      observed_task_ref: snapshotRef(task),
      observed_context_ref: snapshotRef(context),
      observed_requirements_digest: task.payload.requirements_digest,
    },
  });
  const lineage_a = rehashSnapshot({
    ...base.input.lineage_a,
    payload: {
      ...base.input.lineage_a.payload,
      candidate_ref: snapshotRef(candidate_a),
      nodes: [{
        ...base.input.lineage_a.payload.nodes[0]!,
        subject_ref: snapshotRef(candidate_a),
      }] as typeof base.input.lineage_a.payload.nodes,
    },
  });
  const lineage_b = rehashSnapshot({
    ...base.input.lineage_b,
    payload: {
      ...base.input.lineage_b.payload,
      candidate_ref: snapshotRef(candidate_b),
      nodes: [{
        ...base.input.lineage_b.payload.nodes[0]!,
        subject_ref: snapshotRef(candidate_b),
      }] as typeof base.input.lineage_b.payload.nodes,
    },
  });
  const qualification_input = {
    ...base.input,
    fact_set,
    policy,
    task,
    context,
    candidate_a,
    candidate_b,
    presentation,
    review,
    lineage_a,
    lineage_b,
  };
  const qualification = qualifyFeedback(qualification_input);
  const evidence = {
    ...base.evidence,
    qualification_input,
    fact_set,
    policy,
    task,
    context,
    candidate_a,
    candidate_b,
    presentation,
    review,
    lineage_a,
    lineage_b,
  };
  return { base, task4, checkpoint, checkpointRef, qualification_input, qualification, evidence };
}

function qualifiedGroup(
  group: number,
  mode: PreferenceMode = DEFAULT_PREFERENCE_MODE,
): QualifiedExample {
  if (!Number.isSafeInteger(group) || group < 0 || group >= PERMISSION_GROUP_COUNT) {
    throw new Error(`task5_fixture_group_invalid:${group}`);
  }
  let byGroup = qualifiedGroupsCache.get(mode);
  if (byGroup === undefined) {
    byGroup = new Map();
    qualifiedGroupsCache.set(mode, byGroup);
  }
  const cached = byGroup.get(group);
  if (cached !== undefined) return cached;
  const created = qualifiedExample(group, mode);
  byGroup.set(group, created);
  return created;
}

function sharedPermission(qualified: readonly QualifiedExample[]) {
  const permissionRef = bareRef("learning-permission.task5.subject");
  const subjectRefs = canonicalSet(qualified.flatMap((item) => [
    snapshotRef(item.qualification_input.candidate_a),
    snapshotRef(item.qualification_input.candidate_b),
    {
      record_id: item.base.adapted.decision.record_id,
      schema_id: item.base.adapted.decision.schema_id,
      schema_version: item.base.adapted.decision.schema_version,
      content_digest: item.base.adapted.decision.content_digest,
    },
  ])) as [DigestRef, ...DigestRef[]];
  const permissionScopeDigest = sha256Canonical({
    contract_version: "contentmd.task5-permission-scope/0.1.0",
    subject_refs: subjectRefs,
  });
  return makeSnapshot(
    "learning-permission",
    `snapshot.learning-permission.task5.${permissionScopeDigest.slice(0, 32)}`,
    {
      permission_ref: permissionRef,
      permission_class: "learning_data" as const,
      status: "issued" as const,
      revocation_state: "current" as const,
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
      allowed_memory_scopes: ["project"] as ["project"],
      project_ids: [PROJECT_ID] as [string, ...string[]],
      subject_refs: subjectRefs,
      issued_at: "2026-08-19T00:00:00.000Z",
      expires_at: "2026-08-21T00:00:00.000Z",
    },
    [permissionRef],
  );
}

function preferenceEvaluationAt(index: number): string {
  return `2026-08-20T18:30:00.${String(index).padStart(6, "0")}Z`;
}

function completeExamples(
  groupIds: readonly number[] = GROUP_IDS,
  mode: PreferenceMode = DEFAULT_PREFERENCE_MODE,
): Array<{
  qualification_input: QualifiedExample["qualification_input"];
  qualification: QualifiedExample["qualification"];
  eligibility_input: ReturnType<typeof eligibilityFixture>;
  eligibility: ReturnType<typeof determineLearningEligibility>;
  preference_input: ReturnType<typeof preferenceFixture>;
  preference: ReturnType<typeof createPreferenceExample>;
  feature_checkpoint_set: FeatureSourceCheckpointSet;
  post_checkpoint_observation: null;
  blocking_evidence: [];
}> {
  const groups = groupIds.map((group) => qualifiedGroup(group, mode));
  return groups.flatMap((qualified, groupIndex) => {
    const permission = sharedPermission([qualified]);
    return Array.from({ length: MEMBERS_PER_GROUP }, (_, member) => {
    const group = groupIds[groupIndex]!;
    const eligibility_input = {
      ...eligibilityFixture(
        qualified.qualification,
        qualified.evidence,
        qualified.base.adapted.decision,
      ),
      permission: structuredClone(permission),
    };
    const eligibility = determineLearningEligibility(eligibility_input);
    const preference_input = {
      ...preferenceFixture(
        qualified.qualification,
        eligibility,
        eligibility_input,
        qualified.base.adapted.decision,
        qualified.evidence,
      ),
      evaluation_at: preferenceEvaluationAt(group * MEMBERS_PER_GROUP + member),
      feature_source_checkpoint_set_ref: qualified.checkpointRef,
    };
    const preference = createPreferenceExample(preference_input);
    return {
      qualification_input: qualified.qualification_input,
      qualification: qualified.qualification,
      eligibility_input,
      eligibility,
      preference_input,
      preference,
      feature_checkpoint_set: qualified.checkpoint,
      post_checkpoint_observation: null,
      blocking_evidence: [] as [],
    };
    });
  });
}

function relationMaterial(candidateRef: DigestRef): CompleteRelationMaterial {
  const identity = {
    contract_version: "contentmd.relation-membership-evidence/0.1.0" as const,
    evidence_version: "0.1.0" as const,
    verification_mode: "development_fixture" as const,
    authority_effect: "none" as const,
    source_class: "project_owned_synthetic" as const,
    rights_state: "training_permitted" as const,
    evidence: {
      evidence_kind: "message_lineage" as const,
      semantic_subject_ref: candidateRef,
      member_candidate_refs: [candidateRef] as [DigestRef, ...DigestRef[]],
    },
  };
  const evidence_id = `relation-membership-evidence.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, evidence_id };
  const value: RelationMembershipEvidence = {
    ...withoutDigest,
    evidence_digest: sha256Canonical(withoutDigest),
  };
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

function relationNode(
  examples: readonly ReturnType<typeof completeExamples>[number][],
): { node: LeakageRelationNode; material: CompleteRelationMaterial } {
  const member_example_refs = canonicalSet(examples.map((example) => ({
    record_id: example.preference.record_id,
    schema_id: example.preference.schema_id,
    schema_version: example.preference.schema_version,
    content_digest: example.preference.content_digest,
  }))) as [DigestRef, ...DigestRef[]];
  const candidateRef = snapshotRef(examples[0]!.qualification_input.candidate_a);
  const material = relationMaterial(candidateRef);
  const bindings = canonicalSet(member_example_refs.map((example_ref): RelationCandidateBinding => ({
    example_ref,
    candidate_sides: ["A"],
    candidate_refs: [candidateRef],
  }))) as [RelationCandidateBinding, ...RelationCandidateBinding[]];
  const basis = {
    basis_kind: "message_lineage" as const,
    semantic_subject_ref: candidateRef,
    bindings,
    membership_evidence_ref: material.material_ref,
  };
  const identity = {
    contract_version: "contentmd.leakage-relation-identity/0.1.0",
    reason: "message_lineage" as const,
    basis,
    member_example_refs,
    evidence_refs: [material.material_ref] as [DigestRef, ...DigestRef[]],
    source_class: "project_owned_synthetic" as const,
    rights_state: "training_permitted" as const,
  };
  const relation_digest = sha256Canonical(identity);
  return {
    material,
    node: {
      contract_version: "contentmd.leakage-relation/0.1.0",
      relation_id: `leakage-relation.message-lineage.${relation_digest}`,
      reason: "message_lineage",
      basis,
      member_example_refs,
      evidence_refs: identity.evidence_refs,
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      relation_digest,
    },
  };
}

function leakageEvidence(
  groupIds: readonly number[] = GROUP_IDS,
  mode: PreferenceMode = DEFAULT_PREFERENCE_MODE,
): LeakageEvidenceSnapshot {
  const examples = completeExamples(groupIds, mode);
  const groups = groupIds.map((_group, groupIndex) => {
    const start = groupIndex * MEMBERS_PER_GROUP;
    return relationNode(examples.slice(start, start + MEMBERS_PER_GROUP));
  });
  const relation_nodes = [...groups.map(({ node }) => node)]
    .sort((left, right) => left.relation_id.localeCompare(right.relation_id, "en")) as [LeakageRelationNode, ...LeakageRelationNode[]];
  const additional_materials = [...groups.map(({ material }) => material)]
    .sort((left, right) => compareCanonical(left.material_ref, right.material_ref));
  const relationByExample = new Map<string, string>();
  for (const node of relation_nodes) {
    for (const ref of node.member_example_refs) relationByExample.set(canonicalJson(ref), node.relation_id);
  }
  const subjects = examples.map((example) => {
    const exampleRef = {
      record_id: example.preference.record_id,
      schema_id: example.preference.schema_id,
      schema_version: example.preference.schema_version,
      content_digest: example.preference.content_digest,
    };
    const relationId = relationByExample.get(canonicalJson(exampleRef));
    if (relationId === undefined) throw new Error("task5_fixture_relation_missing");
    return { example, relation_ids: [relationId] as [string, ...string[]] };
  }).sort((left, right) => compareCanonical(
    {
      record_id: left.example.preference.record_id,
      schema_id: left.example.preference.schema_id,
      schema_version: left.example.preference.schema_version,
      content_digest: left.example.preference.content_digest,
    },
    {
      record_id: right.example.preference.record_id,
      schema_id: right.example.preference.schema_id,
      schema_version: right.example.preference.schema_version,
      content_digest: right.example.preference.content_digest,
    },
  )) as LeakageEvidenceSnapshot["subjects"];
  const identity = {
    contract_version: "contentmd.leakage-evidence-snapshot/0.1.0" as const,
    snapshot_version: "0.1.0" as const,
    record_mode: "development_fixture" as const,
    cohort_scope: { memory_scope: "project" as const, project_id: PROJECT_ID },
    enumeration_state: "complete" as const,
    subjects,
    relation_nodes,
    additional_materials,
  };
  const snapshot_id = `leakage-evidence.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, snapshot_id };
  return { ...withoutDigest, snapshot_digest: sha256Canonical(withoutDigest) };
}

export function task5DatasetBuildInput(
  groupIds: readonly number[] = GROUP_IDS,
  mode: PreferenceMode = DEFAULT_PREFERENCE_MODE,
): BuildLearningDatasetInput {
  return {
    record_mode: "development_fixture",
    evaluation_at: DATASET_EVALUATION_AT,
    group_producer: task3Producer("leakage-group"),
    dataset_producer: task3Producer("learning-dataset"),
    unicode_artifacts: unicodeBundle(),
    leakage_evidence: leakageEvidence(groupIds, mode),
  };
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
    sealed_at: DATASET_EVALUATION_AT,
    membership_digest,
    verification_mode: "development_fixture" as const,
  };
  return { ...identity, verification_receipt: null, seal_digest: sha256Canonical(identity) };
}

const datasetReplayCache = new Map<PreferenceMode, ReturnType<typeof createDatasetReplay>>();
const datasetBuildResultCache = new Map<PreferenceMode, LearningDatasetBuildResult>();

function createDatasetReplay(mode: PreferenceMode) {
  const build_input = task5DatasetBuildInput(groupIdsForMode(mode), mode);
  const result = buildLearningDataset(build_input);
  datasetBuildResultCache.set(mode, result);
  if (result.manifest === null || result.manifest.payload.dataset_state !== "training_eligible") {
    throw new Error(`task5_fixture_dataset_not_training_eligible:${canonicalJson(result.diagnostics.counts)}`);
  }
  const producer = task3Producer("dataset-seal");
  const witness = sealWitness(result.manifest);
  const expected_dataset_record = sealLearningDataset({
    record_mode: "development_fixture",
    producer,
    source_manifest: result.manifest,
    witness,
  });
  return {
    contract_version: "contentmd.learning-dataset-training-replay/0.1.0" as const,
    build_input,
    seal: { producer, witness },
    expected_dataset_record,
  };
}

export function task5DatasetReplayFixture(): ReturnType<typeof createDatasetReplay> {
  const cached = datasetReplayCache.get(DEFAULT_PREFERENCE_MODE)
    ?? createDatasetReplay(DEFAULT_PREFERENCE_MODE);
  datasetReplayCache.set(DEFAULT_PREFERENCE_MODE, cached);
  return cloneFixtureTree(cached);
}

export function task5DatasetExpectedBuildResult(): LearningDatasetBuildResult {
  if (!datasetReplayCache.has(DEFAULT_PREFERENCE_MODE)) {
    datasetReplayCache.set(DEFAULT_PREFERENCE_MODE, createDatasetReplay(DEFAULT_PREFERENCE_MODE));
  }
  return cloneFixtureTree(datasetBuildResultCache.get(DEFAULT_PREFERENCE_MODE)!);
}

function uniqueByProjection<T>(values: readonly T[], projection: (value: T) => unknown): T[] {
  const unique = new Map<string, T>();
  for (const value of values) unique.set(canonicalJson(projection(value)), value);
  return [...unique.values()].sort((left, right) => compareCanonical(projection(left), projection(right)));
}

function scopeMaterialRef(value: ScopeMaterial): DigestRef {
  return {
    record_id: value.scope_material_id,
    schema_id: "contentmd.task4-scope-material",
    schema_version: "0.1.0",
    content_digest: value.material_digest,
  };
}

function featureMaterialRef(value: FeatureMaterial): DigestRef {
  return {
    record_id: value.material_id,
    schema_id: "contentmd.task4-feature-material",
    schema_version: "0.1.0",
    content_digest: value.material_digest,
  };
}

function ruleSetRef(value: CandidateRuleEvaluation["candidate_rule_set"]): DigestRef {
  return {
    record_id: value.rule_set_id,
    schema_id: "contentmd.task4-candidate-rule-set",
    schema_version: "0.1.0",
    content_digest: value.rule_set_digest,
  };
}

function combinedTask4Profile(groupIds: readonly number[], mode: PreferenceMode): {
  profileInput: CreateFeatureProfileInput;
  profile: ReturnType<typeof createFeatureProfile>;
} {
  const fixtures = groupIds.map((group) => qualifiedGroup(group, mode).task4);
  const first = fixtures[0]!.profileInput;
  const context_bindings = uniqueByProjection(
    fixtures.flatMap(({ profileInput }) => profileInput.feature_universe.context_bindings),
    (binding) => binding.context_ref,
  ) as FeatureUniverseManifest["context_bindings"];
  const checkpoint_set_refs = uniqueByProjection(
    context_bindings.map((binding) => binding.checkpoint_set_ref),
    (ref) => ref,
  ) as FeatureUniverseManifest["checkpoint_set_refs"];
  const target_scope_refs = uniqueByProjection(
    context_bindings.map((binding) => binding.target_scope_ref),
    (ref) => ref,
  ) as FeatureUniverseManifest["target_scope_refs"];
  const permitted_candidate_scope_refs = uniqueByProjection(
    context_bindings.flatMap((binding) => binding.permitted_candidate_scope_refs),
    (ref) => ref,
  ) as FeatureUniverseManifest["permitted_candidate_scope_refs"];
  const feature_material_refs = uniqueByProjection(
    context_bindings.flatMap((binding) => binding.feature_material_refs),
    (ref) => ref,
  );
  const acceptance_criteria_refs = uniqueByProjection(
    context_bindings.flatMap((binding) => binding.acceptance_criteria_refs),
    (ref) => ref,
  ) as FeatureUniverseManifest["acceptance_criteria_refs"];
  const hard_rule_set_refs = uniqueByProjection(
    context_bindings.flatMap((binding) => binding.candidate_rule_set_refs),
    (ref) => ref,
  ) as FeatureUniverseManifest["hard_rule_set_refs"];
  const hard_rule_set_artifact_refs = uniqueByProjection(
    context_bindings.flatMap((binding) => binding.candidate_rule_set_artifact_refs),
    (ref) => ref,
  ) as FeatureUniverseManifest["hard_rule_set_artifact_refs"];
  const {
    manifest_id: _manifestId,
    manifest_digest: _manifestDigest,
    context_bindings: _contextBindings,
    checkpoint_set_refs: _checkpointRefs,
    target_scope_refs: _targetRefs,
    permitted_candidate_scope_refs: _candidateRefs,
    feature_material_refs: _materialRefs,
    acceptance_criteria_refs: _acceptanceRefs,
    hard_rule_set_refs: _ruleRefs,
    hard_rule_set_artifact_refs: _ruleArtifactRefs,
    ...universeBase
  } = first.feature_universe;
  const universeIdentity = {
    ...universeBase,
    context_bindings,
    checkpoint_set_refs,
    target_scope_refs,
    permitted_candidate_scope_refs,
    feature_material_refs,
    acceptance_criteria_refs,
    hard_rule_set_refs,
    hard_rule_set_artifact_refs,
  };
  const manifest_id = `feature-universe-manifest.${sha256Canonical(universeIdentity)}`;
  const universeWithoutDigest = { ...universeIdentity, manifest_id };
  const feature_universe = {
    ...universeWithoutDigest,
    manifest_digest: sha256Canonical(universeWithoutDigest),
  } as FeatureUniverseManifest;
  const universeBytes = canonicalJson(feature_universe);
  const feature_universe_artifact = {
    path: first.feature_universe_artifact.path,
    bytes_utf8: universeBytes,
    raw_bytes_digest: sha256Utf8(universeBytes),
  };
  const universeArtifactRef = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: feature_universe_artifact.raw_bytes_digest,
  };
  const checkpoint_sets = uniqueByProjection(
    fixtures.map(({ profileInput }) => profileInput.checkpoint_sets[0]!),
    task3CheckpointSetRef,
  ) as CreateFeatureProfileInput["checkpoint_sets"];
  const scope_material_sources = uniqueByProjection(
    fixtures.flatMap(({ profileInput }) => profileInput.scope_material_sources),
    scopeMaterialRef,
  ) as CreateFeatureProfileInput["scope_material_sources"];
  const feature_material_sources = uniqueByProjection(
    fixtures.flatMap(({ profileInput }) => profileInput.feature_material_sources),
    featureMaterialRef,
  );
  const hard_rule_sources = uniqueByProjection(
    fixtures.flatMap(({ profileInput }) => profileInput.hard_rule_sources),
    ({ candidate_rule_set }) => ruleSetRef(candidate_rule_set),
  ) as CreateFeatureProfileInput["hard_rule_sources"];
  const nonRuleBindings = uniqueByProjection(
    fixtures.flatMap(({ profileInput }) => profileInput.artifact_bindings)
      .filter(({ role }) => role !== "feature_universe" && role !== "hard_rule_set"),
    (binding) => binding,
  );
  const artifact_bindings = [
    { role: "feature_universe" as const, artifact_ref: universeArtifactRef },
    ...nonRuleBindings,
    ...hard_rule_sources.map(({ candidate_rule_set_artifact }, index): FeatureArtifactBinding => ({
      role: "hard_rule_set",
      artifact_ref: hard_rule_set_artifact_refs[index] ?? {
        artifact_id: `contentmd.task4-candidate-rule-set.${hard_rule_set_refs[index]!.content_digest}`,
        artifact_version: "0.1.0",
        artifact_digest: candidate_rule_set_artifact.raw_bytes_digest,
      },
    })),
  ].sort((left, right) => left.role.localeCompare(right.role, "en")
    || compareCanonical(left.artifact_ref, right.artifact_ref)) as CreateFeatureProfileInput["artifact_bindings"];
  const profileInput = cloneFixtureTree({
    ...first,
    feature_universe,
    feature_universe_artifact,
    checkpoint_sets,
    scope_material_sources,
    feature_material_sources,
    hard_rule_sources,
    artifact_bindings,
  }) as CreateFeatureProfileInput;
  return { profileInput, profile: createFeatureProfile(profileInput) };
}

function candidateBFor(fixture: Task4Fixture): CandidateVectorizationInput["candidate"] {
  const entry = fixture.vectorInput.checkpoint_set.feature_source_manifest.entries
    .find((candidate) => candidate.source_role === "candidate_b");
  if (entry?.material.material_kind !== "task2_evidence_snapshot"
    || entry.material.value.snapshot_kind !== "candidate") {
    throw new Error("task5_fixture_candidate_b_missing");
  }
  return entry.material.value;
}

function passingRuleEvaluations(
  evaluations: CandidateVectorizationInput["rule_evaluations"],
  candidate: CandidateVectorizationInput["candidate"],
): CandidateVectorizationInput["rule_evaluations"] {
  const candidate_ref = snapshotRef(candidate);
  return evaluations.map((evaluation): CandidateRuleEvaluation => {
    const {
      gate_id: _gateId,
      gate_digest: _gateDigest,
      candidate_ref: _candidateRef,
      findings: _findings,
      hard_rule_status: _hardRuleStatus,
      prohibited_claim_status: _prohibitedClaimStatus,
      ...gateBase
    } = evaluation.eligibility_gate;
    const gateIdentity = {
      ...gateBase,
      candidate_ref,
      findings: [],
      hard_rule_status: "pass" as const,
      prohibited_claim_status: "clear" as const,
    };
    const gate_id = `candidate-eligibility-gate.${sha256Canonical(gateIdentity)}`;
    const gateWithoutDigest = { ...gateIdentity, gate_id };
    const eligibility_gate: CandidateEligibilityGate = {
      ...gateWithoutDigest,
      gate_digest: sha256Canonical(gateWithoutDigest),
    };
    return {
      candidate_rule_set: evaluation.candidate_rule_set,
      candidate_rule_set_artifact: evaluation.candidate_rule_set_artifact,
      eligibility_gate,
    };
  }) as CandidateVectorizationInput["rule_evaluations"];
}

function candidateReplay(
  fixture: Task4Fixture,
  side: "A" | "B",
  profileInput: CreateFeatureProfileInput,
  profile: ReturnType<typeof createFeatureProfile>,
) {
  const local = structuredClone(fixture.vectorInput);
  const candidate = side === "A" ? local.candidate : candidateBFor(fixture);
  const complete: CandidateVectorizationInput = {
    ...local,
    profile_input: profileInput,
    profile,
    feature_universe: profileInput.feature_universe,
    feature_universe_artifact: profileInput.feature_universe_artifact,
    scope_material_sources: profileInput.scope_material_sources,
    candidate,
    rule_evaluations: side === "A"
      ? local.rule_evaluations
      : passingRuleEvaluations(local.rule_evaluations, candidate),
  };
  const result = vectorizeCandidate(complete);
  if (result.status !== "eligible") {
    throw new Error(`task5_fixture_candidate_${side.toLowerCase()}_ineligible:${result.reason}`);
  }
  const {
    record_mode: _recordMode,
    profile_input: _profileInput,
    profile: _profile,
    ...vectorization_input
  } = complete;
  return {
    contract_version: "contentmd.pairwise-candidate-vector-replay/0.1.0" as const,
    vectorization_input,
    expected_vector: result.vector,
  };
}

function groupIdForSubject(subject: LeakageEvidenceSnapshot["subjects"][number]): number {
  const expression = subject.example.qualification_input.candidate_a.payload.expression;
  const group = Array.from({ length: PERMISSION_GROUP_COUNT }, (_, index) => index)
    .find((index) => groupExpressions(index).expressionA === expression);
  if (group === undefined) throw new Error("task5_fixture_candidate_expression_group_missing");
  return group;
}

function recordRef(record: {
  record_id: string;
  schema_id: string;
  schema_version: "0.1.0";
  content_digest: string;
}): DigestRef {
  return {
    record_id: record.record_id,
    schema_id: record.schema_id,
    schema_version: record.schema_version,
    content_digest: record.content_digest,
  };
}

const featureMatrixReplayCache = new Map<PreferenceMode, ReturnType<typeof createFeatureMatrixReplay>>();

function createFeatureMatrixReplay(mode: PreferenceMode) {
  const datasetReplay = datasetReplayCache.get(mode) ?? createDatasetReplay(mode);
  datasetReplayCache.set(mode, datasetReplay);
  const build = datasetBuildResultCache.get(mode)!;
  if (build.manifest === null) throw new Error("task5_fixture_matrix_manifest_missing");
  const subjectByRef = new Map(build.manifest.payload.example_refs.map((ref) => {
    const subject = datasetReplay.build_input.leakage_evidence.subjects
      .find((candidate) => canonicalJson(recordRef(candidate.example.preference)) === canonicalJson(ref));
    if (subject === undefined) throw new Error("task5_fixture_matrix_subject_missing");
    return [canonicalJson(ref), subject] as const;
  }));
  const trainSubjects = build.manifest.payload.train_example_refs.map((ref) => subjectByRef.get(canonicalJson(ref))!);
  const trainGroupIds = [...new Set(trainSubjects.map(groupIdForSubject))];
  const { profileInput, profile } = combinedTask4Profile(groupIdsForMode(mode), mode);
  const replayByGroup = new Map(trainGroupIds.map((group) => {
    const fixture = qualifiedGroup(group, mode).task4;
    return [group, {
      candidate_a: candidateReplay(fixture, "A", profileInput, profile),
      candidate_b: candidateReplay(fixture, "B", profileInput, profile),
    }] as const;
  }));
  const groupByExample = new Map<string, LearningDatasetBuildResult["groups"][number]>();
  for (const group of build.groups) {
    for (const ref of group.payload.member_refs) groupByExample.set(canonicalJson(ref), group);
  }
  const rows = build.manifest.payload.train_example_refs.map((example_ref) => {
    const subject = subjectByRef.get(canonicalJson(example_ref))!;
    const group = groupByExample.get(canonicalJson(example_ref));
    if (group === undefined || group.payload.split !== "train") {
      throw new Error("task5_fixture_matrix_train_group_missing");
    }
    const candidates = replayByGroup.get(groupIdForSubject(subject))!;
    return {
      example_ref,
      leakage_group_ref: recordRef(group),
      label: subject.example.preference.payload.label,
      candidate_a: candidates.candidate_a,
      candidate_b: candidates.candidate_b,
    };
  }) as [ReturnType<typeof candidateReplay> extends never ? never : {
    example_ref: DigestRef;
    leakage_group_ref: DigestRef;
    label: 0 | 1;
    candidate_a: ReturnType<typeof candidateReplay>;
    candidate_b: ReturnType<typeof candidateReplay>;
  }, ...Array<{
    example_ref: DigestRef;
    leakage_group_ref: DigestRef;
    label: 0 | 1;
    candidate_a: ReturnType<typeof candidateReplay>;
    candidate_b: ReturnType<typeof candidateReplay>;
  }>];
  return {
    contract_version: "contentmd.pairwise-feature-matrix-replay/0.1.0" as const,
    profile: {
      contract_version: "contentmd.pairwise-feature-profile-replay/0.1.0" as const,
      profile_input: profileInput,
      expected_profile: profile,
    },
    rows,
  };
}

export function task5FeatureMatrixFixture() {
  const cached = featureMatrixReplayCache.get(DEFAULT_PREFERENCE_MODE)
    ?? createFeatureMatrixReplay(DEFAULT_PREFERENCE_MODE);
  featureMatrixReplayCache.set(DEFAULT_PREFERENCE_MODE, cached);
  return {
    datasetReplay: task5DatasetReplayFixture(),
    replay: cloneFixtureTree(cached),
  };
}

function candidateSplitFixture(mode: PreferenceMode, split: "validation" | "test") {
  const profileReplay = featureMatrixReplayCache.get(mode) ?? createFeatureMatrixReplay(mode);
  featureMatrixReplayCache.set(mode, profileReplay);
  const datasetReplay = datasetReplayCache.get(mode)!;
  const build = datasetBuildResultCache.get(mode)!;
  if (build.manifest === null) throw new Error("task5_fixture_test_manifest_missing");
  const subjectByRef = new Map(datasetReplay.build_input.leakage_evidence.subjects.map((subject) => [
    canonicalJson(recordRef(subject.example.preference)),
    subject,
  ] as const));
  const profile = profileReplay.profile;
  const exampleRefs = split === "test"
    ? build.manifest.payload.test_example_refs
    : build.manifest.payload.validation_example_refs;
  const rows = exampleRefs.map((example_ref) => {
    const subject = subjectByRef.get(canonicalJson(example_ref));
    if (subject === undefined) throw new Error("task5_fixture_test_subject_missing");
    const group = build.groups.find((candidate) => candidate.payload.member_refs.some((member) =>
      canonicalJson(member) === canonicalJson(example_ref)));
    if (group === undefined || group.payload.split !== split) {
      throw new Error("task5_fixture_test_group_missing");
    }
    const fixture = qualifiedGroup(groupIdForSubject(subject), mode).task4;
    return {
      example_ref,
      leakage_group_ref: recordRef(group),
      subject,
      candidate_a: candidateReplay(
        fixture,
        "A",
        profile.profile_input,
        profile.expected_profile,
      ),
      candidate_b: candidateReplay(
        fixture,
        "B",
        profile.profile_input,
        profile.expected_profile,
      ),
    };
  });
  return {
    datasetReplay: cloneFixtureTree(datasetReplay),
    profile: cloneFixtureTree(profile),
    rows: cloneFixtureTree(rows),
  };
}

export function task5SealedTestCandidateFixture() {
  return candidateSplitFixture(DEFAULT_PREFERENCE_MODE, "test");
}

export function task5ValidationCandidateFixture() {
  return candidateSplitFixture(DEFAULT_PREFERENCE_MODE, "validation");
}

export function task5OpposedFeatureMatrixFixture() {
  const mode = "baseline_opposed" as const;
  const cached = featureMatrixReplayCache.get(mode) ?? createFeatureMatrixReplay(mode);
  featureMatrixReplayCache.set(mode, cached);
  return {
    datasetReplay: cloneFixtureTree(datasetReplayCache.get(mode)!),
    replay: cloneFixtureTree(cached),
  };
}

export function task5OpposedSealedTestCandidateFixture() {
  return candidateSplitFixture("baseline_opposed", "test");
}

export function task5OpposedValidationCandidateFixture() {
  return candidateSplitFixture("baseline_opposed", "validation");
}
