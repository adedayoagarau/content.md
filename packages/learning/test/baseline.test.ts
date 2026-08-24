import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import { adaptContentDecisionEvent } from "../src/feedback.js";
import {
  compareDeterministicBaseline,
  createDeterministicBaseline,
  orderBaselineCandidates,
  scoreDeterministicBaseline,
  type BaselineOrderingInput,
  type BaselinePairInput,
  type BaselineScoreInput,
  type CreateBaselineInput,
} from "../src/baseline.js";
import {
  TASK4_FEATURE_ORDER,
  createFeatureProfile,
  vectorizeCandidate,
  type CandidateEligibilityGate,
  type CandidateFeatureVector,
  type CandidateRuleSet,
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
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
  type StoreArtifactWitness,
} from "../src/leakage.js";
import {
  LEARNING_SCHEMA_IDS,
  type ArtifactRef,
  type DigestRef,
  type FeatureDefinition,
  type FeatureProfile,
} from "../src/records.js";
import type {
  Task4DependencyManifest,
  Task4ProducerArtifactWitness,
  Task4UnicodeRuntime,
} from "../src/retrieval.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";
import {
  canonicalSet,
  qualificationFixture,
  rehashSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";

const CONTRACT_PATH =
  "docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md";
const RESOLUTION_PATHS = [
  "package.json",
  "packages/core/package.json",
  "packages/core/tsconfig.json",
  "packages/learning/package.json",
  "packages/learning/tsconfig.json",
  "pnpm-lock.yaml",
  "tsconfig.base.json",
  "tsconfig.json",
] as const;
const PROJECT_ID = "project.task2.fixture";
const NOW = "2026-08-20T19:00:00.000Z";

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
] as [string, ...string[]];

function bytes(path: string): string {
  return readFileSync(new URL(`../../../${path}`, import.meta.url), "utf8");
}

function digestUtf8(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function raw(path: string, bytes_utf8 = bytes(path)) {
  return { path, bytes_utf8, raw_bytes_digest: digestUtf8(bytes_utf8) };
}

function artifact(path: string) {
  const witness = raw(path);
  const parsed = JSON.parse(witness.bytes_utf8) as { artifact_id: string; artifact_version: string };
  return {
    ...witness,
    artifact_ref: {
      artifact_id: parsed.artifact_id,
      artifact_version: parsed.artifact_version,
      artifact_digest: witness.raw_bytes_digest,
    },
  };
}

function storeArtifact(path: string, artifact_id: string) {
  const witness = raw(path);
  return {
    ...witness,
    artifact_ref: { artifact_id, artifact_version: "0.1.0", artifact_digest: witness.raw_bytes_digest },
  };
}

function runtimeProfile(): StoreArtifactWitness {
  const witness = raw("fixtures/learning-ranking/feature-source-runtime-profile.json");
  return {
    ...witness,
    artifact_ref: {
      artifact_id: "contentmd.feature-source-runtime-profile",
      artifact_version: "0.1.0",
      artifact_digest: witness.raw_bytes_digest,
    },
  };
}

function unicodeRuntime(): Task4UnicodeRuntime {
  const bundlePreimage = {
    contract_version: "contentmd.unicode-artifact-bundle/0.1.0" as const,
    source_lock: raw("fixtures/learning-ranking/unicode-17-source-lock.json"),
    acquisition_receipt: raw("fixtures/learning-ranking/unicode-17-acquisition-receipt.json"),
    generator: raw("scripts/generate-unicode-17-artifacts.mjs"),
    normalization: artifact("fixtures/learning-ranking/unicode-17-normalization.json"),
    casefold: artifact("fixtures/learning-ranking/unicode-17-casefold.json"),
    whitespace: artifact("fixtures/learning-ranking/unicode-17-whitespace.json"),
    word_break: artifact("fixtures/learning-ranking/unicode-17-word-break.json"),
    grapheme_break: artifact("fixtures/learning-ranking/unicode-17-grapheme-break.json"),
  };
  const unicode_bundle: UnicodeArtifactBundle = {
    ...bundlePreimage,
    bundle_digest: sha256Canonical(bundlePreimage),
  };
  const runtime_profile = storeArtifact(
    "fixtures/learning-ranking/feature-source-runtime-profile.json",
    "contentmd.feature-source-runtime-profile",
  );
  const preimage = {
    contract_version: "contentmd.task4-unicode-runtime/0.1.0" as const,
    unicode_bundle,
    runtime_profile,
  };
  return { ...preimage, runtime_digest: sha256Canonical(preimage) };
}

function runtimeSpecifiers(source: string): string[] {
  const stripped = source
    .replace(/(^|\n)\s*import\s+type\b[\s\S]*?;/g, "\n")
    .replace(/(^|\n)\s*export\s+type\b[\s\S]*?;/g, "\n");
  const found: string[] = [];
  for (const match of stripped.matchAll(/(^|\n)\s*(?:import|export)\b[\s\S]*?;/g)) {
    const statement = match[0];
    const specifier = statement.match(/\bfrom\s+["']([^"']+)["']/)?.[1]
      ?? statement.match(/\bimport\s+["']([^"']+)["']/)?.[1];
    if (specifier !== undefined) found.push(specifier);
  }
  for (const match of stripped.matchAll(/\bimport\(\s*["']([^"']+)["']\s*\)/g)) found.push(match[1]!);
  return [...new Set(found)];
}

function resolveRuntimePath(from: string, specifier: string): string | null {
  if (specifier.startsWith("node:")) return null;
  if (specifier === "typescript-compiler") return null;
  if (specifier === "@contentmd/core") return "packages/core/src/index.ts";
  if (!specifier.startsWith(".")) throw new Error(`unhandled fixture import ${specifier}`);
  return posix.normalize(posix.join(posix.dirname(from), specifier)).replace(/\.js$/, ".ts");
}

function producer(producer_id: Task4ProducerArtifactWitness["producer_id"]): Task4ProducerArtifactWitness {
  const entry = {
    "retrieval-snapshot": "packages/learning/src/retrieval.ts",
    "feature-profile": "packages/learning/src/features.ts",
    "candidate-feature-vector": "packages/learning/src/features.ts",
    "deterministic-baseline": "packages/learning/src/baseline.ts",
  }[producer_id];
  const pending = [entry];
  const dependencies = new Map<string, string[]>();
  while (pending.length > 0) {
    const path = pending.shift()!;
    if (dependencies.has(path)) continue;
    const resolved = runtimeSpecifiers(bytes(path)).map((specifier) => resolveRuntimePath(path, specifier))
      .filter((value): value is string => value !== null).sort();
    dependencies.set(path, resolved);
    pending.push(...resolved);
  }
  const source_artifacts = [...dependencies.keys()].sort().map((path) => raw(path)) as Task4ProducerArtifactWitness["source_artifacts"];
  const resolution_artifacts = [...RESOLUTION_PATHS].map((path) => raw(path)) as Task4ProducerArtifactWitness["resolution_artifacts"];
  const manifestPreimage = {
    contract_version: "contentmd.task4-dependency-manifest/0.1.0" as const,
    producer_id,
    entry_paths: [entry] as [string, ...string[]],
    resolution_profile: "node24-typescript59-esm-runtime-import-export-literal-dynamic-closure/0.1.0" as const,
    resolution_artifacts: resolution_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest })) as Task4DependencyManifest["resolution_artifacts"],
    entries: source_artifacts.map(({ path, raw_bytes_digest }) => ({
      path,
      raw_bytes_digest,
      runtime_dependency_paths: dependencies.get(path)!,
    })) as Task4DependencyManifest["entries"],
  };
  return {
    contract_version: "contentmd.task4-producer-witness/0.1.0",
    producer_id,
    contract_artifact: raw(CONTRACT_PATH),
    schema_artifact: producer_id === "feature-profile"
      ? raw("packages/schemas/src/learning-records.schema.json")
      : null,
    source_artifacts,
    resolution_artifacts,
    dependency_manifest: {
      ...manifestPreimage,
      dependency_manifest_digest: sha256Canonical(manifestPreimage),
    },
    verification_mode: "development_fixture",
    verification_receipt: null,
  };
}

function baselineProducer(): Task4ProducerArtifactWitness {
  return producer("deterministic-baseline");
}

function auxiliaryRef(record_id: string, schema_id: string, content_digest: string): DigestRef {
  return { record_id, schema_id, schema_version: "0.1.0", content_digest };
}

function twoStage<T extends Record<string, unknown>, I extends string, D extends string>(
  prefix: string,
  id: I,
  digest: D,
  identity: Omit<T, I | D>,
): T {
  const objectId = `${prefix}.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, [id]: objectId };
  return { ...withoutDigest, [digest]: sha256Canonical(withoutDigest) } as T;
}

function checkpointFor(
  snapshots: Array<[
    FeatureSourceManifestEntry["source_role"],
    FeatureSourceManifestEntry["material"]["value"],
  ]>,
  storeSchemaArtifactDigest?: string,
  projectId = PROJECT_ID,
): FeatureSourceCheckpointSet {
  const originalStoreSchema = storeArtifact(
    "fixtures/learning-ranking/feature-source-store-schema.json",
    "contentmd.feature-source-store-schema",
  );
  const store_schema = storeSchemaArtifactDigest === undefined ? originalStoreSchema : {
    ...originalStoreSchema,
    artifact_ref: { ...originalStoreSchema.artifact_ref, artifact_digest: storeSchemaArtifactDigest },
  };
  const runtime_profile = storeArtifact(
    "fixtures/learning-ranking/feature-source-runtime-profile.json",
    "contentmd.feature-source-runtime-profile",
  );
  const store_instance_id = "feature-store.task4.baseline.fixture";
  const store_kind = "synthetic_append_only_event_store" as const;
  const instance_nonce_digest = sha256Canonical({
    contract_version: "contentmd.feature-store-instance/0.1.0",
    store_instance_id,
    store_kind,
    project_id: projectId,
  });
  const bindingIdentity = {
    contract_version: "contentmd.feature-store-binding/0.1.0" as const,
    store_kind,
    project_id: projectId,
    store_instance_id,
    instance_nonce_digest,
    store_schema,
    runtime_profile,
  };
  const binding_id = `feature-store-binding.${sha256Canonical(bindingIdentity)}`;
  const bindingWithoutDigest = { ...bindingIdentity, binding_id };
  const store_binding = {
    ...bindingWithoutDigest,
    binding_digest: sha256Canonical(bindingWithoutDigest),
  };
  const priorByRole = new Map<FeatureSourceManifestEntry["source_role"], {
    sequence: number;
    digest: string | null;
  }>();
  const entries = snapshots.map(([source_role, value]) => {
    const source_ref = snapshotRef(value as never);
    const stream_id = deriveFeatureSourceStreamId(
      store_binding.binding_digest,
      projectId,
      source_role,
    );
    const event_id = deriveFeatureSourceEventId(
      store_binding.binding_digest,
      stream_id,
      source_ref,
      source_role,
      "project_owned_synthetic",
    );
    const prior = priorByRole.get(source_role) ?? { sequence: 0, digest: null };
    const eventPreimage = {
      event_id,
      stream_id,
      sequence: prior.sequence + 1,
      schema_version: "0.1.0" as const,
      event_type: "feature_source_recorded",
      occurred_at: NOW,
      actor_ref: "contentmd.task3-development-fixture-recorder",
      data_class: "learning_feature_source",
      payload: {
        contract_version: "contentmd.feature-source-append/0.1.0" as const,
        project_id: projectId,
        source_ref,
        source_role,
        source_class: "project_owned_synthetic" as const,
        rights_state: "training_permitted" as const,
      },
      predecessor_digest: prior.digest,
    };
    const event = { ...eventPreimage, event_digest: sha256Canonical(eventPreimage) };
    priorByRole.set(source_role, { sequence: event.sequence, digest: event.event_digest });
    return {
      source_ref,
      source_role,
      source_class: "project_owned_synthetic" as const,
      rights_state: "training_permitted" as const,
      material: { material_kind: "task2_evidence_snapshot" as const, source_ref, value },
      stream_id,
      event_id,
      sequence: event.sequence,
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
    project_id: projectId,
    entries: sortedEntries,
  };
  const manifest_id = `feature-source-manifest.${sha256Canonical(manifestIdentity)}`;
  const manifestWithoutDigest = { ...manifestIdentity, manifest_id };
  const feature_source_manifest = {
    ...manifestWithoutDigest,
    manifest_digest: sha256Canonical(manifestWithoutDigest),
  };
  const eventsByRole = new Map<
    FeatureSourceManifestEntry["source_role"],
    FeatureSourceManifestEntry["event"][]
  >();
  for (const entry of entries) {
    const events = eventsByRole.get(entry.source_role) ?? [];
    events.push(entry.event);
    eventsByRole.set(entry.source_role, events);
  }
  const streams = FEATURE_SOURCE_ROLES.map((role) => {
    const stream_id = deriveFeatureSourceStreamId(
      store_binding.binding_digest,
      projectId,
      role,
    );
    const complete_prefix = [...(eventsByRole.get(role) ?? [])]
      .sort((left, right) => left.sequence - right.sequence);
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
      store_binding_digest: store_binding.binding_digest,
      stream_id,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      prefix_digest,
      feature_source_manifest_digest: feature_source_manifest.manifest_digest,
      verification_method: "complete-prefix-sha256-chain" as const,
      verified_at: NOW,
    };
    return {
      stream_id,
      maximum_sequence,
      head_event_id: head?.event_id ?? null,
      head_event_digest: head?.event_digest ?? null,
      complete_prefix,
      prefix_digest,
      receipt: {
        ...receiptWithoutDigest,
        receipt_digest: sha256Canonical(receiptWithoutDigest),
      },
    };
  }).sort((left, right) => left.stream_id.localeCompare(right.stream_id, "en")) as FeatureSourceCheckpointSet["streams"];
  const identity = {
    contract_version: "contentmd.feature-source-checkpoint-set-identity/0.1.0",
    record_mode: "development_fixture" as const,
    store_binding,
    feature_source_manifest,
    streams,
  };
  const checkpoint_set_id = `feature-source-checkpoint-set.${sha256Canonical(identity)}`;
  const withoutDigest = {
    contract_version: "contentmd.feature-source-checkpoint-set/0.1.0" as const,
    checkpoint_set_id,
    record_mode: "development_fixture" as const,
    store_binding,
    feature_source_manifest,
    streams,
  };
  return { ...withoutDigest, checkpoint_set_digest: sha256Canonical(withoutDigest) };
}

function checkpointWithReboundStoreSchemaArtifact(
  checkpoint: FeatureSourceCheckpointSet,
): FeatureSourceCheckpointSet {
  return checkpointFor(checkpoint.feature_source_manifest.entries.map((entry) => [
    entry.source_role,
    entry.material.value,
  ]), "0".repeat(64));
}

function crossProjectCheckpoint(
  checkpoint: FeatureSourceCheckpointSet,
): FeatureSourceCheckpointSet {
  return checkpointFor(checkpoint.feature_source_manifest.entries.map((entry) => [
    entry.source_role,
    entry.material.value,
  ]), undefined, "project.other");
}

type CheckpointEvidenceSnapshot = Extract<
  FeatureSourceCheckpointSet["feature_source_manifest"]["entries"][number]["material"],
  { material_kind: "task2_evidence_snapshot" }
>["value"];

function attachNonfiniteReceiptToSnapshot(snapshot: CheckpointEvidenceSnapshot): void {
  const target = `contentmd://task2/snapshot/${snapshot.snapshot_id}`;
  const receipt = finalizeRecord({
    record_id: `verification-receipt.task4-snapshot.${snapshot.snapshot_id}`,
    schema_id: "contentmd.verification-receipt-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "task" as const,
      project_id: null,
      resource_refs: [target],
      data_classes: ["verification_metadata"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      transaction_ref: `snapshot.${snapshot.snapshot_digest}`,
      target_path: target,
      expected_digest: snapshot.snapshot_digest,
      observed_digest: snapshot.snapshot_digest,
      status: "passed" as const,
      verified_at: NOW,
      method: "sha256-canonical-readback" as const,
    },
  });
  receipt.record_version = Number.NaN;
  snapshot.verification_mode = "resolver_verified";
  snapshot.verification_receipt = receipt;
}

function attachNonfiniteSnapshotReceipt(checkpoint: FeatureSourceCheckpointSet): void {
  const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
    candidate.material.material_kind === "task2_evidence_snapshot"
    && candidate.material.value.snapshot_kind === "context")!;
  if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("missing context");
  attachNonfiniteReceiptToSnapshot(entry.material.value);
}

function attachNonfiniteReceiptToMatchingCandidateSnapshots(input: CandidateVectorizationInput): void {
  attachNonfiniteReceiptToSnapshot(input.candidate);
  for (const checkpoint of [input.checkpoint_set, ...input.profile_input.checkpoint_sets]) {
    for (const entry of checkpoint.feature_source_manifest.entries) {
      if (entry.material.material_kind === "task2_evidence_snapshot"
        && entry.material.value.snapshot_id === input.candidate.snapshot_id) {
        attachNonfiniteReceiptToSnapshot(entry.material.value);
      }
    }
  }
}

interface RealBaselineFixture {
  profileInput: CreateFeatureProfileInput;
  vectorInput: CandidateVectorizationInput;
  secondVectorInput: CandidateVectorizationInput;
}

function realBaselineFixture(options: {
  expression?: string;
  secondExpression?: string;
  emptyMaterials?: boolean;
  checkpointProject?: string;
} = {}): RealBaselineFixture {
  const runtime = unicodeRuntime();
  const base = qualificationFixture(adaptContentDecisionEvent).input;
  const requiredMaterial = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material",
    "material_id",
    "material_digest",
    {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [base.fact_set.payload.item_refs[0]!],
      authority_effect: "none",
      material_kind: "required_fact",
      match_forms: [],
    },
  );
  const actionMaterial = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material",
    "material_id",
    "material_digest",
    {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [base.context.source_refs[0]!],
      authority_effect: "none",
      material_kind: "context_action",
      match_forms: ["clear next"],
    },
  );
  const requiredRef = auxiliaryRef(
    requiredMaterial.material_id,
    "contentmd.task4-feature-material",
    requiredMaterial.material_digest,
  );
  const actionRef = auxiliaryRef(
    actionMaterial.material_id,
    "contentmd.task4-feature-material",
    actionMaterial.material_digest,
  );
  const factItems = canonicalSet(
    options.emptyMaterials === true
      ? base.fact_set.payload.item_refs
      : [...base.fact_set.payload.item_refs, requiredRef],
  ) as [DigestRef, ...DigestRef[]];
  const fact_set = rehashSnapshot({
    ...base.fact_set,
    source_refs: factItems,
    payload: {
      ...base.fact_set.payload,
      item_refs: factItems,
      set_digest: sha256Canonical({
        contract_version: "contentmd.task2-stable-set/0.1.0",
        item_refs: factItems,
      }),
    },
  });
  const factRef = snapshotRef(fact_set);
  const requiredGateRef = options.emptyMaterials === true ? factRef : requiredRef;
  const permissionRef = auxiliaryRef(
    "fixture.permission",
    "contentmd.fixture-record",
    sha256Canonical({ fixture: "permission" }),
  );
  const checksRef = auxiliaryRef(
    "fixture.checks",
    "contentmd.fixture-record",
    sha256Canonical({ fixture: "checks" }),
  );
  const ruleSet = twoStage<CandidateRuleSet, "rule_set_id", "rule_set_digest">(
    "candidate-rule-set",
    "rule_set_id",
    "rule_set_digest",
    {
      contract_version: "contentmd.task4-candidate-rule-set/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [permissionRef],
      rules: [
        {
          rule_id: "rule.forbidden",
          failure_class: "prohibited_claim",
          rule_kind: "forbidden_token_sequence",
          tokens: ["forbidden"],
        },
        {
          rule_id: "rule.required",
          failure_class: "hard_rule",
          rule_kind: "required_source_ref",
          source_ref: requiredGateRef,
        },
      ],
      rule_set_state: "current",
      authority_effect: "none",
    },
  );
  const ruleRef = auxiliaryRef(
    ruleSet.rule_set_id,
    "contentmd.task4-candidate-rule-set",
    ruleSet.rule_set_digest,
  );
  const ruleArtifact = raw(
    "fixtures/learning-ranking/task4-baseline-rule-set.fixture.json",
    canonicalJson(ruleSet),
  );
  const ruleArtifactRef = {
    artifact_id: `contentmd.task4-candidate-rule-set.${ruleSet.rule_set_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: ruleArtifact.raw_bytes_digest,
  };
  const policyItems = [ruleRef] as [DigestRef, ...DigestRef[]];
  const policy = rehashSnapshot({
    ...base.policy,
    source_refs: policyItems,
    payload: {
      ...base.policy.payload,
      item_refs: policyItems,
      set_digest: sha256Canonical({
        contract_version: "contentmd.task2-stable-set/0.1.0",
        item_refs: policyItems,
      }),
    },
  });
  const policyRef = snapshotRef(policy);
  const targetScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material",
    "scope_material_id",
    "material_digest",
    {
      contract_version: "contentmd.task4-scope-material/0.1.0",
      scope_role: "target",
      project_id: PROJECT_ID,
      memory_scope: "project",
      product_area: "checkout",
      journey_state: "confirmation",
      channel: "web",
      locale: "en",
      market: "US",
      risk: "low",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [factRef],
      authority_effect: "none",
    },
  );
  const candidateScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material",
    "scope_material_id",
    "material_digest",
    {
      contract_version: "contentmd.task4-scope-material/0.1.0",
      scope_role: "candidate_origin",
      project_id: PROJECT_ID,
      memory_scope: "project",
      product_area: "checkout",
      journey_state: "confirmation",
      channel: "web",
      locale: "en",
      market: "US",
      risk: "low",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [policyRef],
      authority_effect: "none",
    },
  );
  const targetScopeRef = auxiliaryRef(
    targetScope.scope_material_id,
    "contentmd.task4-scope-material",
    targetScope.material_digest,
  );
  const candidateScopeRef = auxiliaryRef(
    candidateScope.scope_material_id,
    "contentmd.task4-scope-material",
    candidateScope.material_digest,
  );
  const context = rehashSnapshot({
    ...base.context,
    source_refs: canonicalSet([
      ...base.context.source_refs,
      ...(options.emptyMaterials === true ? [] : [actionRef]),
      targetScopeRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...base.context.payload, locale: "en" },
  });
  const contextRef = snapshotRef(context);
  const task = rehashSnapshot({
    ...base.task,
    payload: {
      ...base.task.payload,
      fact_set_ref: factRef,
      policy_ref: policyRef,
      context_ref: contextRef,
    },
  });
  const taskRef = snapshotRef(task);
  const expression = options.expression
    ?? "Use a seamless experience with a clear next step.";
  const secondExpression = options.secondExpression ?? "Clear next.";
  const candidate_a = rehashSnapshot({
    ...base.candidate_a,
    source_refs: canonicalSet([
      ...base.candidate_a.source_refs,
      candidateScopeRef,
      requiredGateRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: {
      ...base.candidate_a.payload,
      task_ref: taskRef,
      context_ref: contextRef,
      expression,
      expression_digest: digestUtf8(expression),
    },
  });
  const candidate_b = rehashSnapshot({
    ...base.candidate_b,
    source_refs: canonicalSet([
      ...base.candidate_b.source_refs,
      candidateScopeRef,
      requiredGateRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: {
      ...base.candidate_b.payload,
      task_ref: taskRef,
      context_ref: contextRef,
      expression: secondExpression,
      expression_digest: digestUtf8(secondExpression),
    },
  });
  const constraint = { constraint_kind: "grapheme_count" as const, minimum: 5, maximum: 80 };
  const acceptancePayload = {
    contract_version: "contentmd.expression-free-feature/0.1.0" as const,
    feature_role: "acceptance_criteria" as const,
    project_id: PROJECT_ID,
    source_class: "project_owned_synthetic" as const,
    rights_state: "training_permitted" as const,
    permission_snapshot_ref: permissionRef,
    eligibility_checks_snapshot_ref: checksRef,
    ordered_feature_refs: [policyRef] as [DigestRef, ...DigestRef[]],
    constraint,
    state: "current" as const,
    content_form: "expression_free_ref_and_numeric_metadata" as const,
    set_digest: sha256Canonical({
      contract_version: "contentmd.expression-free-feature-set/0.1.0",
      feature_role: "acceptance_criteria",
      project_id: PROJECT_ID,
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      permission_snapshot_ref: permissionRef,
      eligibility_checks_snapshot_ref: checksRef,
      ordered_feature_refs: [policyRef],
      constraint,
      state: "current",
      content_form: "expression_free_ref_and_numeric_metadata",
    }),
  };
  const acceptancePreimage = {
    contract_version: "contentmd.task2-evidence-snapshot/0.1.0" as const,
    snapshot_id: "snapshot.acceptance-criteria.task4-baseline",
    snapshot_kind: "acceptance-criteria" as const,
    snapshot_version: "0.1.0" as const,
    captured_at: NOW,
    source_refs: canonicalSet([permissionRef, checksRef, policyRef]) as [DigestRef, ...DigestRef[]],
    payload: acceptancePayload,
  };
  const acceptance = {
    ...acceptancePreimage,
    verification_mode: "development_fixture" as const,
    verification_receipt: null,
    snapshot_digest: sha256Canonical(acceptancePreimage),
  };
  const checkpoint = checkpointFor([
    ["task", task],
    ["context", context],
    ["fact_set", fact_set],
    ["policy", policy],
    ["candidate_a", candidate_a],
    ["candidate_b", candidate_b],
    ["acceptance_criteria", acceptance],
  ], undefined, options.checkpointProject);
  const checkpointRef = task3CheckpointSetRef(checkpoint);
  const acceptanceRef = snapshotRef(acceptance);
  const featureRefs = canonicalSet(
    options.emptyMaterials === true ? [] : [requiredRef, actionRef],
  );
  const runtimeProfileRef = runtime.runtime_profile.artifact_ref;
  const binding = {
    context_ref: contextRef,
    project_id: PROJECT_ID,
    checkpoint_set_ref: checkpointRef,
    target_scope_ref: targetScopeRef,
    target_scope_role: "target" as const,
    runtime_profile_ref: runtimeProfileRef,
    unicode_runtime_digest: runtime.runtime_digest,
    permitted_candidate_scope_refs: [candidateScopeRef] as [DigestRef, ...DigestRef[]],
    feature_material_refs: featureRefs,
    acceptance_criteria_refs: [acceptanceRef] as [DigestRef, ...DigestRef[]],
    candidate_rule_set_refs: [ruleRef] as [DigestRef, ...DigestRef[]],
    candidate_rule_set_artifact_refs: [ruleArtifactRef] as [typeof ruleArtifactRef, ...typeof ruleArtifactRef[]],
  };
  const lexiconRaw = raw("fixtures/learning-ranking/generic-language-lexicon.json");
  const lexiconRef = {
    artifact_id: "contentmd.generic-language-lexicon.en",
    artifact_version: "0.1.0",
    artifact_digest: lexiconRaw.raw_bytes_digest,
  };
  const unicodeRefs = canonicalSet([
    runtime.unicode_bundle.normalization.artifact_ref,
    runtime.unicode_bundle.casefold.artifact_ref,
    runtime.unicode_bundle.whitespace.artifact_ref,
    runtime.unicode_bundle.word_break.artifact_ref,
    runtime.unicode_bundle.grapheme_break.artifact_ref,
  ]) as [ArtifactRef, ...ArtifactRef[]];
  const universeIdentity = {
    contract_version: "contentmd.task4-feature-universe-manifest/0.1.0" as const,
    project_id: PROJECT_ID,
    feature_profile_version: "rank-features/0.1.0" as const,
    runtime_profile_ref: runtimeProfileRef,
    unicode_runtime_digest: runtime.runtime_digest,
    context_bindings: [binding] as [typeof binding, ...typeof binding[]],
    checkpoint_set_refs: [checkpointRef] as [DigestRef, ...DigestRef[]],
    target_scope_refs: [targetScopeRef] as [DigestRef, ...DigestRef[]],
    permitted_candidate_scope_refs: [candidateScopeRef] as [DigestRef, ...DigestRef[]],
    feature_material_refs: featureRefs,
    generic_lexicon_ref: lexiconRef,
    unicode_artifact_refs: unicodeRefs,
    acceptance_criteria_refs: [acceptanceRef] as [DigestRef, ...DigestRef[]],
    hard_rule_set_refs: [ruleRef] as [DigestRef, ...DigestRef[]],
    hard_rule_set_artifact_refs: [ruleArtifactRef] as [typeof ruleArtifactRef, ...typeof ruleArtifactRef[]],
    authority_effect: "none" as const,
  };
  const manifest_id = `feature-universe-manifest.${sha256Canonical(universeIdentity)}`;
  const universeWithoutDigest = { ...universeIdentity, manifest_id };
  const feature_universe: FeatureUniverseManifest = {
    ...universeWithoutDigest,
    manifest_digest: sha256Canonical(universeWithoutDigest),
  };
  const universeRaw = raw(
    "fixtures/learning-ranking/task4-baseline-feature-universe.fixture.json",
    canonicalJson(feature_universe),
  );
  const universeArtifactRef = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: universeRaw.raw_bytes_digest,
  };
  const artifact_bindings: FeatureArtifactBinding[] = [
    { role: "feature_universe", artifact_ref: universeArtifactRef },
    { role: "generic_lexicon", artifact_ref: lexiconRef },
    { role: "hard_rule_set", artifact_ref: ruleArtifactRef },
    { role: "runtime_profile", artifact_ref: runtimeProfileRef },
    { role: "unicode_casefold", artifact_ref: runtime.unicode_bundle.casefold.artifact_ref },
    { role: "unicode_grapheme_break", artifact_ref: runtime.unicode_bundle.grapheme_break.artifact_ref },
    { role: "unicode_normalization", artifact_ref: runtime.unicode_bundle.normalization.artifact_ref },
    { role: "unicode_whitespace", artifact_ref: runtime.unicode_bundle.whitespace.artifact_ref },
    { role: "unicode_word_break", artifact_ref: runtime.unicode_bundle.word_break.artifact_ref },
  ];
  const scopeSources = [targetScope, candidateScope].sort((left, right) => Buffer.compare(
    Buffer.from(canonicalJson(auxiliaryRef(
      left.scope_material_id,
      "contentmd.task4-scope-material",
      left.material_digest,
    ))),
    Buffer.from(canonicalJson(auxiliaryRef(
      right.scope_material_id,
      "contentmd.task4-scope-material",
      right.material_digest,
    ))),
  )) as [ScopeMaterial, ...ScopeMaterial[]];
  const materials = (options.emptyMaterials === true ? [] : [requiredMaterial, actionMaterial])
    .sort((left, right) => Buffer.compare(
      Buffer.from(canonicalJson(auxiliaryRef(
        left.material_id,
        "contentmd.task4-feature-material",
        left.material_digest,
      ))),
      Buffer.from(canonicalJson(auxiliaryRef(
        right.material_id,
        "contentmd.task4-feature-material",
        right.material_digest,
      ))),
    ));
  const profileInput: CreateFeatureProfileInput = {
    record_mode: "development_fixture",
    project_id: PROJECT_ID,
    producer: producer("feature-profile"),
    unicode_runtime: runtime,
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_sets: [checkpoint],
    scope_material_sources: scopeSources,
    feature_material_sources: materials,
    hard_rule_sources: [{ candidate_rule_set: ruleSet, candidate_rule_set_artifact: ruleArtifact }],
    generic_lexicon: lexiconRaw,
    artifact_bindings,
    runtime_profile_ref: runtimeProfileRef,
  };
  const profile = createFeatureProfile(profileInput);
  const gateFor = (candidate: typeof candidate_a): CandidateEligibilityGate => {
    const candidateRef = snapshotRef(candidate);
    const gateIdentity = {
      contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0" as const,
      candidate_ref: candidateRef,
      rule_set_ref: ruleRef,
      rule_set_artifact_ref: ruleArtifactRef,
      unicode_runtime_digest: runtime.runtime_digest,
      findings: [],
      hard_rule_status: "pass" as const,
      prohibited_claim_status: "clear" as const,
      authority_effect: "none" as const,
    };
    const gate_id = `candidate-eligibility-gate.${sha256Canonical(gateIdentity)}`;
    const gateWithoutDigest = { ...gateIdentity, gate_id };
    return { ...gateWithoutDigest, gate_digest: sha256Canonical(gateWithoutDigest) };
  };
  const inputFor = (candidate: typeof candidate_a): CandidateVectorizationInput => ({
    record_mode: "development_fixture",
    producer: producer("candidate-feature-vector"),
    unicode_runtime: runtime,
    profile_input: profileInput,
    profile,
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_set: checkpoint,
    scope_material_sources: scopeSources,
    target_scope: targetScope,
    candidate_scope: candidateScope,
    candidate,
    materials,
    generic_lexicon: lexiconRaw,
    acceptance_criteria_sources: [acceptance],
    rule_evaluations: [{
      candidate_rule_set: ruleSet,
      candidate_rule_set_artifact: ruleArtifact,
      eligibility_gate: gateFor(candidate),
    }],
    blocking_evidence: [],
  });
  return {
    profileInput,
    vectorInput: inputFor(candidate_a),
    secondVectorInput: inputFor(candidate_b as typeof candidate_a),
  };
}

function fixtureArtifact(label: string): ArtifactRef {
  return {
    artifact_id: `contentmd.task4.fixture.${label}`,
    artifact_version: "0.1.0",
    artifact_digest: sha256Canonical({ fixture: label }),
  };
}

function featureProfile(projectId = "project.task4.baseline"): FeatureProfile {
  const runtime = runtimeProfile().artifact_ref;
  const bindings = [
    ["feature_universe", fixtureArtifact("universe")],
    ["generic_lexicon", fixtureArtifact("lexicon")],
    ["hard_rule_set", fixtureArtifact("rule")],
    ["runtime_profile", runtime],
    ["unicode_casefold", fixtureArtifact("casefold")],
    ["unicode_grapheme_break", fixtureArtifact("grapheme")],
    ["unicode_normalization", fixtureArtifact("normalization")],
    ["unicode_whitespace", fixtureArtifact("whitespace")],
    ["unicode_word_break", fixtureArtifact("wordbreak")],
  ] as const;
  const provenance = bindings.map(([role, ref]) => ({
    record_id: `artifact.${ref.artifact_id}.${ref.artifact_version}`,
    relationship: `task4_feature_artifact_${role}`,
    content_digest: ref.artifact_digest,
  })).sort((left, right) => left.record_id.localeCompare(right.record_id, "en")
    || left.relationship.localeCompare(right.relationship, "en")
    || left.content_digest.localeCompare(right.content_digest, "en")) as FeatureProfile["provenance"];
  const input_digest = sha256Canonical({ fixture: "baseline-profile", projectId });
  return finalizeRecord({
    record_id: `feature-profile.${sha256Canonical({
      contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
      project_id: projectId,
      input_digest,
    })}`,
    schema_id: LEARNING_SCHEMA_IDS.featureProfile,
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project",
      project_id: projectId,
      resource_refs: ["feature-universe-manifest.fixture"],
      data_classes: ["learning_feature_profile"],
    },
    provenance,
    lifecycle_state: "active",
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0",
      record_mode: "development_fixture",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      schema_digest: "df46ec3a7fdb56923392c0cb98bc7b43713ee6c9377bba39ddf1873b9c2e286a",
      code_digest: sha256Canonical({ fixture: "feature-profile-code" }),
      input_digest,
      authority_effect: "none",
      feature_profile_version: "rank-features/0.1.0",
      features: FEATURE_DEFINITIONS,
      source_artifact_refs: bindings.map(([, ref]) => ref).sort((left, right) => Buffer.compare(
        Buffer.from(canonicalJson(left), "utf8"),
        Buffer.from(canonicalJson(right), "utf8"),
      )) as [ArtifactRef, ...ArtifactRef[]],
      forbidden_input_fields: FORBIDDEN_FIELDS,
      runtime_profile_ref: runtime,
      profile_state: "frozen",
    },
  }) as FeatureProfile;
}

let cachedCreateInput: CreateBaselineInput | undefined;
function validCreateInput(): CreateBaselineInput {
  if (cachedCreateInput === undefined) {
    const fixture = realBaselineFixture();
    cachedCreateInput = {
      record_mode: "development_fixture",
      producer: producer("deterministic-baseline"),
      feature_profile_input: fixture.profileInput,
      feature_profile: fixture.vectorInput.profile,
      runtime_profile: fixture.vectorInput.unicode_runtime.runtime_profile,
    };
  }
  return structuredClone(cachedCreateInput);
}

interface ScoringFixture {
  baselineInput: CreateBaselineInput;
  baseline: ReturnType<typeof createDeterministicBaseline>;
  profile: FeatureProfile;
  vectorInput: CandidateVectorizationInput;
  vector: CandidateFeatureVector;
  secondVectorInput: CandidateVectorizationInput;
  secondVector: CandidateFeatureVector;
}

function buildScoringFixture(options: {
  expression?: string;
  secondExpression?: string;
  emptyMaterials?: boolean;
} = {}): ScoringFixture {
  const fixture = realBaselineFixture(options);
  const profile = fixture.vectorInput.profile;
  const baselineInput: CreateBaselineInput = {
    record_mode: "development_fixture",
    producer: producer("deterministic-baseline"),
    feature_profile_input: fixture.profileInput,
    feature_profile: profile,
    runtime_profile: fixture.vectorInput.unicode_runtime.runtime_profile,
  };
  const baseline = createDeterministicBaseline(baselineInput);
  const first = vectorizeCandidate(fixture.vectorInput);
  const second = vectorizeCandidate(fixture.secondVectorInput);
  if (first.status !== "eligible" || second.status !== "eligible") {
    throw new Error("expected eligible baseline fixtures");
  }
  return {
    baselineInput,
    baseline,
    profile,
    vectorInput: fixture.vectorInput,
    vector: first.vector,
    secondVectorInput: fixture.secondVectorInput,
    secondVector: second.vector,
  };
}

let defaultScoringFixture: ScoringFixture | undefined;
function scoringFixture(): ScoringFixture {
  defaultScoringFixture ??= buildScoringFixture();
  return defaultScoringFixture;
}

function rehashVector(vector: CandidateFeatureVector): CandidateFeatureVector {
  const { contract_version: _contractVersion, vector_id: _id, vector_digest: _digest, ...body } = vector;
  const vector_id = `candidate-feature-vector.${sha256Canonical({
    contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
    ...body,
  })}`;
  const withoutDigest = {
    contract_version: "contentmd.task4-candidate-feature-vector/0.1.0" as const,
    vector_id,
    ...body,
  };
  return { ...withoutDigest, vector_digest: sha256Canonical(withoutDigest) };
}

function rehashGate(gate: CandidateEligibilityGate): CandidateEligibilityGate {
  const { gate_id: _id, gate_digest: _digest, ...identity } = gate;
  const gate_id = `candidate-eligibility-gate.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, gate_id };
  return { ...withoutDigest, gate_digest: sha256Canonical(withoutDigest) };
}

function makeFirstRuleTokenUnnormalized(
  source: CandidateVectorizationInput["rule_evaluations"][number],
): void {
  const { rule_set_id: _id, rule_set_digest: _digest, ...body } = source.candidate_rule_set;
  source.candidate_rule_set = twoStage<CandidateRuleSet, "rule_set_id", "rule_set_digest">(
    "candidate-rule-set",
    "rule_set_id",
    "rule_set_digest",
    {
      ...body,
      rules: body.rules.map((rule, index) => index === 0 && "tokens" in rule
        ? { ...rule, tokens: ["Ｆｏｒｂｉｄｄｅｎ"] }
        : rule),
    },
  );
  source.candidate_rule_set_artifact.bytes_utf8 = canonicalJson(source.candidate_rule_set);
  source.candidate_rule_set_artifact.raw_bytes_digest = digestUtf8(
    source.candidate_rule_set_artifact.bytes_utf8,
  );
}

function rehashBaseline(
  baseline: ReturnType<typeof createDeterministicBaseline>,
): ReturnType<typeof createDeterministicBaseline> {
  const { baseline_id: _id, baseline_digest: _digest, ...identity } = baseline;
  const baseline_id = `deterministic-baseline.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, baseline_id };
  return {
    ...withoutDigest,
    baseline_digest: sha256Canonical(withoutDigest),
  } as ReturnType<typeof createDeterministicBaseline>;
}

function invokeScoringOperation(
  operation: "score" | "pair" | "order",
  fixture: ScoringFixture,
): unknown {
  if (operation === "score") return scoreDeterministicBaseline({
    record_mode: "development_fixture",
    baseline_input: fixture.baselineInput,
    baseline: fixture.baseline,
    feature_profile: fixture.profile,
    vectorization_input: fixture.vectorInput,
    vector: fixture.vector,
  });
  if (operation === "pair") return compareDeterministicBaseline({
    record_mode: "development_fixture",
    baseline_input: fixture.baselineInput,
    baseline: fixture.baseline,
    feature_profile: fixture.profile,
    candidate_a_vectorization_input: fixture.vectorInput,
    candidate_a: fixture.vector,
    candidate_b_vectorization_input: fixture.secondVectorInput,
    candidate_b: fixture.secondVector,
  });
  return orderBaselineCandidates({
    record_mode: "development_fixture",
    baseline_input: fixture.baselineInput,
    baseline: fixture.baseline,
    feature_profile: fixture.profile,
    candidates: [
      { vectorization_input: fixture.vectorInput, vector: fixture.vector },
      { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
    ],
  });
}

type BaselineCreateFault = {
  category: string;
  mutate: (input: CreateBaselineInput) => void;
};

function rehashFeatureProfile(profile: FeatureProfile): FeatureProfile {
  const { content_digest: _digest, ...withoutDigest } = profile;
  return finalizeRecord(withoutDigest) as FeatureProfile;
}

function rehashUniverseWitness(input: CreateFeatureProfileInput): void {
  const { manifest_id: _id, manifest_digest: _digest, ...identity } = input.feature_universe;
  input.feature_universe.manifest_id = `feature-universe-manifest.${sha256Canonical(identity)}`;
  const { manifest_digest: _drop, ...content } = input.feature_universe;
  input.feature_universe.manifest_digest = sha256Canonical(content);
  input.feature_universe_artifact.bytes_utf8 = canonicalJson(input.feature_universe);
  input.feature_universe_artifact.raw_bytes_digest = digestUtf8(input.feature_universe_artifact.bytes_utf8);
  const universeBinding = input.artifact_bindings.find((binding) => binding.role === "feature_universe")!;
  universeBinding.artifact_ref = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${input.feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: input.feature_universe_artifact.raw_bytes_digest,
  };
  input.artifact_bindings.sort((left, right) => left.role.localeCompare(right.role, "en")
    || Buffer.compare(
      Buffer.from(canonicalJson(left.artifact_ref), "utf8"),
      Buffer.from(canonicalJson(right.artifact_ref), "utf8"),
    ));
}

const BASELINE_CREATE_FAULTS: readonly BaselineCreateFault[] = [
  {
    category: "canonical_value",
    mutate: (input) => {
      (input.feature_profile_input.feature_universe.context_bindings[0] as
        typeof input.feature_profile_input.feature_universe.context_bindings[0] & { extra?: boolean }).extra = true;
    },
  },
  {
    category: "producer_witness",
    mutate: (input) => {
      input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
    },
  },
  {
    category: "unicode_runtime",
    mutate: (input) => {
      input.feature_profile_input.unicode_runtime.runtime_digest = "0".repeat(64);
    },
  },
  {
    category: "digest",
    mutate: (input) => {
      input.feature_profile_input.feature_universe.manifest_digest = "0".repeat(64);
    },
  },
  {
    category: "reference_binding",
    mutate: (input) => {
      input.feature_profile_input.runtime_profile_ref = structuredClone(
        input.feature_profile_input.feature_universe.generic_lexicon_ref,
      );
    },
  },
  {
    category: "scope_mismatch",
    mutate: (input) => {
      input.feature_profile_input.project_id = "project.other";
    },
  },
  {
    category: "checkpoint_binding",
    mutate: (input) => {
      input.feature_profile_input.feature_material_sources = [];
    },
  },
  {
    category: "feature_profile_binding",
    mutate: (input) => {
      input.feature_profile.payload.input_digest = "f".repeat(64);
      input.feature_profile.record_id = `feature-profile.${sha256Canonical({
        contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
        project_id: input.feature_profile.scope.project_id,
        input_digest: input.feature_profile.payload.input_digest,
      })}`;
      input.feature_profile = rehashFeatureProfile(input.feature_profile);
    },
  },
  {
    category: "provenance",
    mutate: (input) => {
      input.feature_profile.provenance = input.feature_profile.provenance.filter(
        ({ relationship }) => relationship !== "task4_feature_artifact_runtime_profile",
      ) as FeatureProfile["provenance"];
      input.feature_profile = rehashFeatureProfile(input.feature_profile);
    },
  },
  {
    category: "forbidden_input_field",
    mutate: (input) => {
      (input.feature_profile_input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>)
        .actor_identity = "forbidden";
    },
  },
  {
    category: "numeric_nonfinite",
    mutate: (input) => {
      input.feature_profile.payload.features[0]!.position = Number.NaN;
    },
  },
];

const BASELINE_CREATE_FAULT_PAIRS = BASELINE_CREATE_FAULTS.flatMap((earlier, index) =>
  BASELINE_CREATE_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

type ScoringFault = {
  category: string;
  mutate: (fixture: ScoringFixture) => void;
};

const SCORING_FAULTS: readonly ScoringFault[] = [
  {
    category: "canonical_value",
    mutate: (fixture) => {
      (fixture.vectorInput.feature_universe.context_bindings[0] as
        typeof fixture.vectorInput.feature_universe.context_bindings[0] & { extra?: boolean }).extra = true;
    },
  },
  {
    category: "producer_witness",
    mutate: (fixture) => {
      fixture.baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
    },
  },
  {
    category: "unicode_runtime",
    mutate: (fixture) => {
      fixture.vectorInput.unicode_runtime.runtime_digest = "0".repeat(64);
    },
  },
  {
    category: "digest",
    mutate: (fixture) => {
      fixture.vectorInput.feature_universe.manifest_digest = "0".repeat(64);
    },
  },
  {
    category: "reference_binding",
    mutate: (fixture) => {
      fixture.vectorInput.target_scope = structuredClone(fixture.vectorInput.candidate_scope);
    },
  },
  {
    category: "scope_mismatch",
    mutate: (fixture) => {
      fixture.vectorInput.profile_input.project_id = "project.other";
    },
  },
  {
    category: "checkpoint_binding",
    mutate: (fixture) => {
      fixture.vectorInput.materials = [];
    },
  },
  {
    category: "feature_profile_binding",
    mutate: (fixture) => {
      fixture.profile = structuredClone(fixture.profile);
      fixture.profile.payload.input_digest = "f".repeat(64);
      fixture.profile.record_id = `feature-profile.${sha256Canonical({
        contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
        project_id: fixture.profile.scope.project_id,
        input_digest: fixture.profile.payload.input_digest,
      })}`;
      fixture.profile = rehashFeatureProfile(fixture.profile);
    },
  },
  {
    category: "provenance",
    mutate: (fixture) => {
      fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
      fixture.baseline = rehashBaseline(fixture.baseline);
    },
  },
  {
    category: "quarantined_expression_present",
    mutate: (fixture) => {
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "evidence.task4.baseline.matrix",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "baseline-matrix" }),
        ),
        source_class: "browser_observed",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        expression: "quarantined",
      }];
    },
  },
  {
    category: "forbidden_input_field",
    mutate: (fixture) => {
      (fixture.vectorInput.unicode_runtime.runtime_profile as unknown as Record<string, unknown>)
        .actor_identity = "forbidden";
    },
  },
  {
    category: "numeric_nonfinite",
    mutate: (fixture) => {
      fixture.vectorInput.profile_input = structuredClone(fixture.vectorInput.profile_input);
      fixture.vectorInput.profile_input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
    },
  },
];

const SCORING_FAULT_PAIRS = SCORING_FAULTS.flatMap((earlier, index) =>
  SCORING_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

const DEEP_DIGEST_FAMILIES = [
  "feature_universe",
  "checkpoint_store_artifact",
  "checkpoint_store_binding",
  "checkpoint_event",
  "checkpoint_prefix_event_id",
  "checkpoint_manifest",
  "checkpoint_prefix",
  "checkpoint_set",
  "checkpoint_stable_set",
  "checkpoint_expression_free_set",
  "acceptance_snapshot",
  "checkpoint_receipt",
  "scope_material",
  "feature_material",
  "candidate_rule_set",
  "eligibility_gate",
  "raw_feature_artifact",
  "candidate_snapshot",
  "candidate_expression",
] as const;

function corruptDeepDigestFamily(
  fixture: ScoringFixture,
  family: typeof DEEP_DIGEST_FAMILIES[number],
): void {
  const vectorInput = fixture.vectorInput;
  if (family === "feature_universe") {
    fixture.baselineInput.feature_profile_input.feature_universe.manifest_digest = "0".repeat(64);
  } else if (family === "checkpoint_store_artifact") {
    vectorInput.checkpoint_set.store_binding.store_schema.raw_bytes_digest = "0".repeat(64);
  } else if (family === "checkpoint_store_binding") {
    vectorInput.checkpoint_set.store_binding.binding_digest = "0".repeat(64);
  } else if (family === "checkpoint_event") {
    vectorInput.checkpoint_set.feature_source_manifest.entries[0]!.event.actor_ref += ".changed";
  } else if (family === "checkpoint_prefix_event_id") {
    const event = vectorInput.checkpoint_set.streams.find((stream) => stream.complete_prefix.length > 0)!
      .complete_prefix[0]!;
    event.event_id = "feature-source-recorded.wrong";
    const { event_digest: _digest, ...preimage } = event;
    event.event_digest = sha256Canonical(preimage);
  } else if (family === "checkpoint_manifest") {
    vectorInput.checkpoint_set.feature_source_manifest.manifest_digest = "0".repeat(64);
  } else if (family === "checkpoint_prefix") {
    vectorInput.checkpoint_set.streams[0]!.prefix_digest = "0".repeat(64);
  } else if (family === "checkpoint_set") {
    vectorInput.checkpoint_set.checkpoint_set_digest = "0".repeat(64);
  } else if (family === "checkpoint_stable_set") {
    const entry = vectorInput.checkpoint_set.feature_source_manifest.entries.find((candidate) =>
      candidate.material.material_kind === "task2_evidence_snapshot"
      && (candidate.material.value.snapshot_kind === "fact-set"
        || candidate.material.value.snapshot_kind === "review-policy"));
    if (entry === undefined || entry.material.material_kind !== "task2_evidence_snapshot") {
      throw new Error("missing stable-set fixture entry");
    }
    const snapshot = structuredClone(entry.material.value);
    (snapshot.payload as { set_digest: string }).set_digest = "0".repeat(64);
    entry.material.value = rehashSnapshot(snapshot) as typeof entry.material.value;
  } else if (family === "acceptance_snapshot") {
    vectorInput.acceptance_criteria_sources[0]!.snapshot_digest = "0".repeat(64);
  } else if (family === "checkpoint_expression_free_set") {
    const entry = vectorInput.checkpoint_set.feature_source_manifest.entries.find((candidate) =>
      candidate.material.material_kind === "task2_evidence_snapshot"
      && candidate.material.value.snapshot_kind === "acceptance-criteria");
    if (entry === undefined || entry.material.material_kind !== "task2_evidence_snapshot") {
      throw new Error("missing expression-free fixture entry");
    }
    const snapshot = structuredClone(entry.material.value);
    (snapshot.payload as { set_digest: string }).set_digest = "0".repeat(64);
    entry.material.value = rehashSnapshot(snapshot) as typeof entry.material.value;
  } else if (family === "checkpoint_receipt") {
    vectorInput.checkpoint_set.streams[0]!.receipt.receipt_digest = "0".repeat(64);
  } else if (family === "scope_material") {
    vectorInput.target_scope.material_digest = "0".repeat(64);
  } else if (family === "feature_material") {
    vectorInput.materials[0]!.material_digest = "0".repeat(64);
  } else if (family === "candidate_rule_set") {
    vectorInput.rule_evaluations[0]!.candidate_rule_set.rule_set_digest = "0".repeat(64);
  } else if (family === "eligibility_gate") {
    vectorInput.rule_evaluations[0]!.eligibility_gate.gate_digest = "0".repeat(64);
  } else if (family === "raw_feature_artifact") {
    vectorInput.generic_lexicon.raw_bytes_digest = "0".repeat(64);
  } else if (family === "candidate_snapshot") {
    vectorInput.candidate.snapshot_digest = "0".repeat(64);
  } else if (family === "candidate_expression") {
    vectorInput.candidate.payload.expression += " changed";
  }
}

function officialCreateInput(): CreateBaselineInput {
  return {
    record_mode: "official",
    producer: {} as never,
    feature_profile_input: {} as never,
    feature_profile: {} as never,
    runtime_profile: {} as never,
  };
}

function officialScoreInput(): BaselineScoreInput {
  return {
    record_mode: "official",
    baseline_input: {} as never,
    baseline: {} as never,
    feature_profile: {} as never,
    vectorization_input: {} as never,
    vector: {} as never,
  };
}

function officialPairInput(): BaselinePairInput {
  return {
    record_mode: "official",
    baseline_input: {} as never,
    baseline: {} as never,
    feature_profile: {} as never,
    candidate_a_vectorization_input: {} as never,
    candidate_a: {} as never,
    candidate_b_vectorization_input: {} as never,
    candidate_b: {} as never,
  };
}

function officialOrderingInput(): BaselineOrderingInput {
  return {
    record_mode: "official",
    baseline_input: {} as never,
    baseline: {} as never,
    feature_profile: {} as never,
    candidates: [{}] as never,
  };
}

describe("Task 4 deterministic baseline boundary", () => {
  it.each(BASELINE_CREATE_FAULT_PAIRS)(
    "exhausts baseline-construction %s before later %s",
    (earlier, later) => {
      const input = validCreateInput();
      earlier.mutate(input);
      later.mutate(input);
      expect(() => createDeterministicBaseline(input)).toThrow(
        `task4_contract_invalid:${earlier.category}`,
      );
    },
  );

  it.each(
    (["score", "pair", "order"] as const).flatMap((operation) =>
      SCORING_FAULT_PAIRS.map(([earlier, later]) => [operation, earlier, later] as const)),
  )(
    "exhausts scoring %s category %s before later %s",
    (operation, earlier, later) => {
      const fixture = structuredClone(scoringFixture());
      earlier.mutate(fixture);
      later.mutate(fixture);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        `task4_contract_invalid:${earlier.category}`,
      );
    },
  );

  it("exhausts Unicode validity across the separately supplied feature profile", () => {
    const input = validCreateInput();
    const profile = structuredClone(input.feature_profile);
    profile.payload.features[0]!.transformation = "\ud800";
    input.feature_profile = rehashFeatureProfile(profile);
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:unicode_runtime",
    );
  });

  it.each(["score", "pair", "order"] as const)(
    "exhausts Unicode validity across the separately supplied baseline in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.baseline.project_id = "project.\ud800";
      fixture.baseline = rehashBaseline(fixture.baseline);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:unicode_runtime",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts Unicode validity across the separately supplied candidate vector in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vector.project_id = "project.\ud800";
      fixture.vector = rehashVector(fixture.vector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:unicode_runtime",
      );
    },
  );

  it("creates the exact dependency-bound static baseline identity", () => {
    const input = validCreateInput();
    const first = createDeterministicBaseline(input);
    const second = createDeterministicBaseline(structuredClone(input));

    expect(second).toEqual(first);
    expect(first).toMatchObject({
      contract_version: "contentmd.task4-deterministic-baseline/0.1.0",
      record_mode: "development_fixture",
      baseline_version: "expression-fit-baseline/0.1.0",
      ranking_objective: "expression_preference",
      candidate_kind: "expression",
      project_id: PROJECT_ID,
      contextual_specificity_projection: "mean_6_scope_matches_plus_applicable_entity_and_action",
      missing_component_rule: "omit_and_renormalize",
      pair_sigmoid_scale: 4,
      probability_clip_lower: 0.000001,
      probability_clip_upper: 0.999999,
      tie_rule: "exact_score_tie_probability_0.5",
      ordering_tie_break: "ascending_candidate_content_digest",
      producer_verification_ref: null,
      authority_effect: "none",
    });
    expect(first.components).toEqual([
      { name: "required_facts", weight: 0.25 },
      { name: "recovery", weight: 0.15 },
      { name: "terminology", weight: 0.15 },
      { name: "contextual_specificity", weight: 0.15 },
      { name: "evidence", weight: 0.15 },
      { name: "one_minus_generic", weight: 0.10 },
      { name: "one_minus_length", weight: 0.05 },
    ]);
    expect(first.runtime_profile_ref).toEqual(input.runtime_profile.artifact_ref);
    expect(first.provenance).toEqual([
      { subject_kind: "digest_ref", ref: first.feature_profile_ref, relationship: "feature_profile" },
      { subject_kind: "artifact_ref", ref: first.runtime_profile_ref, relationship: "runtime_artifact" },
    ].sort((left, right) => Buffer.compare(
      Buffer.from(canonicalJson(left), "utf8"),
      Buffer.from(canonicalJson(right), "utf8"),
    )));
    const { baseline_id: _id, baseline_digest: _digest, ...identity } = first;
    expect(first.baseline_id).toBe(`deterministic-baseline.${sha256Canonical(identity)}`);
    const { baseline_digest: _drop, ...content } = first;
    expect(first.baseline_digest).toBe(sha256Canonical(content));
    expect(first.feature_profile_ref).toEqual({
      record_id: input.feature_profile.record_id,
      schema_id: LEARNING_SCHEMA_IDS.featureProfile,
      schema_version: "0.1.0",
      content_digest: input.feature_profile.content_digest,
    });
  });

  it("does not expose mutable module or caller aliases in a constructed baseline", () => {
    const firstInput = validCreateInput();
    const first = createDeterministicBaseline(firstInput);
    const originalArtifactId = first.runtime_profile_ref.artifact_id;
    firstInput.runtime_profile.artifact_ref.artifact_id = "mutated.after.construction";
    expect(first.runtime_profile_ref.artifact_id).toBe(originalArtifactId);

    expect(Object.isFrozen(first)).toBe(true);
    expect(Object.isFrozen(first.components)).toBe(true);
    expect(Object.isFrozen(first.components[0])).toBe(true);
    expect(() => {
      first.components[0].weight = 0;
    }).toThrow(TypeError);
    expect(first.components[0].weight).toBe(0.25);
  });

  it("requires a complete replayable feature-profile construction proof", () => {
    const fixture = realBaselineFixture();
    const valid = {
      record_mode: "development_fixture",
      producer: producer("deterministic-baseline"),
      feature_profile_input: fixture.profileInput,
      feature_profile: fixture.vectorInput.profile,
      runtime_profile: fixture.vectorInput.unicode_runtime.runtime_profile,
    } as unknown as CreateBaselineInput;
    expect(() => createDeterministicBaseline(valid)).not.toThrow();

    const forged = structuredClone(valid) as unknown as CreateBaselineInput & {
      feature_profile_input: CreateFeatureProfileInput;
    };
    const changedDigest = "f".repeat(64);
    const { content_digest: _contentDigest, ...withoutContentDigest } = forged.feature_profile;
    const changed = {
      ...withoutContentDigest,
      record_id: `feature-profile.${sha256Canonical({
        contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
        project_id: forged.feature_profile.scope.project_id,
        input_digest: changedDigest,
      })}`,
      payload: { ...forged.feature_profile.payload, input_digest: changedDigest },
    };
    forged.feature_profile = finalizeRecord(changed) as FeatureProfile;
    expect(() => createDeterministicBaseline(forged)).toThrow(
      "task4_contract_invalid:feature_profile_binding",
    );
  });

  it("selects producer_witness before later profile and numeric faults", () => {
    const fixture = realBaselineFixture();
    const input = {
      record_mode: "development_fixture",
      producer: producer("deterministic-baseline"),
      feature_profile_input: fixture.profileInput,
      feature_profile: fixture.vectorInput.profile,
      runtime_profile: fixture.vectorInput.unicode_runtime.runtime_profile,
    } as unknown as CreateBaselineInput;
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    input.feature_profile = structuredClone(input.feature_profile);
    input.feature_profile.payload.features[0]!.position = Number.NaN;
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:producer_witness",
    );
  });

  it("stages nested profile checkpoint shape before the baseline producer", () => {
    const input = validCreateInput();
    (input.feature_profile_input.checkpoint_sets[0] as typeof input.feature_profile_input.checkpoint_sets[0] & {
      extra?: boolean;
    }).extra = true;
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:canonical_value",
    );
  });

  it("selects a nested profile domain fault before the baseline producer", () => {
    const input = validCreateInput();
    input.feature_profile.record_version = -1;
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:canonical_value",
    );
  });

  it.each(["score", "pair", "order"] as const)(
    "selects nested baseline producer_witness before stale baseline digest for %s",
    (operation) => {
      const fixture = scoringFixture();
      const baselineInput = structuredClone(fixture.baselineInput);
      const baseline = structuredClone(fixture.baseline);
      baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      baseline.baseline_digest = "0".repeat(64);
      const invoke = operation === "score"
        ? () => scoreDeterministicBaseline({
            record_mode: "development_fixture",
            baseline_input: baselineInput,
            baseline,
            feature_profile: fixture.profile,
            vectorization_input: fixture.vectorInput,
            vector: fixture.vector,
          })
        : operation === "pair"
          ? () => compareDeterministicBaseline({
              record_mode: "development_fixture",
              baseline_input: baselineInput,
              baseline,
              feature_profile: fixture.profile,
              candidate_a_vectorization_input: fixture.vectorInput,
              candidate_a: fixture.vector,
              candidate_b_vectorization_input: fixture.secondVectorInput,
              candidate_b: fixture.secondVector,
            })
          : () => orderBaselineCandidates({
              record_mode: "development_fixture",
              baseline_input: baselineInput,
              baseline,
              feature_profile: fixture.profile,
              candidates: [
                { vectorization_input: fixture.vectorInput, vector: fixture.vector },
                { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
              ],
            });
      expect(invoke).toThrow("task4_contract_invalid:producer_witness");
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "selects complete nested canonical shape before every producer for %s",
    (operation) => {
      const fixture = scoringFixture();
      const baselineInput = structuredClone(fixture.baselineInput);
      (baselineInput.feature_profile_input.checkpoint_sets[0] as
        typeof baselineInput.feature_profile_input.checkpoint_sets[0] & { extra?: boolean }).extra = true;
      baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      const invoke = operation === "score"
        ? () => scoreDeterministicBaseline({
            record_mode: "development_fixture",
            baseline_input: baselineInput,
            baseline: fixture.baseline,
            feature_profile: fixture.profile,
            vectorization_input: fixture.vectorInput,
            vector: fixture.vector,
          })
        : operation === "pair"
          ? () => compareDeterministicBaseline({
              record_mode: "development_fixture",
              baseline_input: baselineInput,
              baseline: fixture.baseline,
              feature_profile: fixture.profile,
              candidate_a_vectorization_input: fixture.vectorInput,
              candidate_a: fixture.vector,
              candidate_b_vectorization_input: fixture.secondVectorInput,
              candidate_b: fixture.secondVector,
            })
          : () => orderBaselineCandidates({
              record_mode: "development_fixture",
              baseline_input: baselineInput,
              baseline: fixture.baseline,
              feature_profile: fixture.profile,
              candidates: [
                { vectorization_input: fixture.vectorInput, vector: fixture.vector },
                { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
              ],
            });
      expect(invoke).toThrow("task4_contract_invalid:canonical_value");
    },
  );

  it.each(["baseline_id", "baseline_digest", "nested_profile_digest", "vector_digest"] as const)(
    "selects %s before provenance across score, pair, and order replay",
    (fault) => {
      for (const operation of ["score", "pair", "order"] as const) {
        const fixture = structuredClone(scoringFixture());
        if (fault === "baseline_id" || fault === "baseline_digest") {
          if (fault === "baseline_id") fixture.baseline.baseline_id = "deterministic-baseline.wrong";
          else fixture.baseline.baseline_digest = "0".repeat(64);
          fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
        } else if (fault === "nested_profile_digest") {
          fixture.vectorInput.profile = structuredClone(fixture.vectorInput.profile);
          fixture.vectorInput.profile.content_digest = "0".repeat(64);
          fixture.vectorInput.profile.provenance[0]!.relationship = "wrong_relationship";
        } else {
          fixture.vector.vector_digest = "0".repeat(64);
          fixture.vector.provenance[0]!.relationship = "wrong_relationship";
        }
        const invoke = operation === "score"
          ? () => scoreDeterministicBaseline({
              record_mode: "development_fixture",
              baseline_input: fixture.baselineInput,
              baseline: fixture.baseline,
              feature_profile: fixture.profile,
              vectorization_input: fixture.vectorInput,
              vector: fixture.vector,
            })
          : operation === "pair"
            ? () => compareDeterministicBaseline({
                record_mode: "development_fixture",
                baseline_input: fixture.baselineInput,
                baseline: fixture.baseline,
                feature_profile: fixture.profile,
                candidate_a_vectorization_input: fixture.vectorInput,
                candidate_a: fixture.vector,
                candidate_b_vectorization_input: fixture.secondVectorInput,
                candidate_b: fixture.secondVector,
              })
            : () => orderBaselineCandidates({
                record_mode: "development_fixture",
                baseline_input: fixture.baselineInput,
                baseline: fixture.baseline,
                feature_profile: fixture.profile,
                candidates: [
                  { vectorization_input: fixture.vectorInput, vector: fixture.vector },
                  { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
                ],
              });
        expect(invoke).toThrow("task4_contract_invalid:digest");
      }
    },
  );

  it.each([
    "feature_universe_manifest",
    "candidate_snapshot",
  ] as const)(
    "selects deepest %s digest before a separately rehashed malformed baseline provenance",
    (fault) => {
      for (const operation of ["score", "pair", "order"] as const) {
        const fixture = structuredClone(scoringFixture());
        fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
        fixture.baseline = rehashBaseline(fixture.baseline);
        if (fault === "feature_universe_manifest") {
          fixture.baselineInput.feature_profile_input.feature_universe.manifest_digest = "0".repeat(64);
        } else {
          fixture.vectorInput.candidate.snapshot_digest = "0".repeat(64);
        }
        const invoke = operation === "score"
          ? () => scoreDeterministicBaseline({
              record_mode: "development_fixture",
              baseline_input: fixture.baselineInput,
              baseline: fixture.baseline,
              feature_profile: fixture.profile,
              vectorization_input: fixture.vectorInput,
              vector: fixture.vector,
            })
          : operation === "pair"
            ? () => compareDeterministicBaseline({
                record_mode: "development_fixture",
                baseline_input: fixture.baselineInput,
                baseline: fixture.baseline,
                feature_profile: fixture.profile,
                candidate_a_vectorization_input: fixture.vectorInput,
                candidate_a: fixture.vector,
                candidate_b_vectorization_input: fixture.secondVectorInput,
                candidate_b: fixture.secondVector,
              })
            : () => orderBaselineCandidates({
                record_mode: "development_fixture",
                baseline_input: fixture.baselineInput,
                baseline: fixture.baseline,
                feature_profile: fixture.profile,
                candidates: [
                  { vectorization_input: fixture.vectorInput, vector: fixture.vector },
                  { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
                ],
              });
        expect(invoke).toThrow("task4_contract_invalid:digest");
      }
    },
  );

  it.each(["profile", "vector"] as const)(
    "classifies a digest-valid nested %s provenance-only mutation as provenance across score, pair, and order",
    (subject) => {
      for (const operation of ["score", "pair", "order"] as const) {
        const fixture = structuredClone(scoringFixture());
        if (subject === "profile") {
          const { content_digest: _digest, ...withoutDigest } = fixture.vectorInput.profile;
          const provenance = withoutDigest.provenance.filter(
            (entry) => entry.relationship !== "task4_feature_artifact_runtime_profile",
          ) as FeatureProfile["provenance"];
          fixture.vectorInput.profile = finalizeRecord({ ...withoutDigest, provenance }) as FeatureProfile;
        } else {
          fixture.vector.provenance = fixture.vector.provenance.filter(
            (entry) => entry.relationship !== "runtime_artifact",
          ) as CandidateFeatureVector["provenance"];
          fixture.vector = rehashVector(fixture.vector);
        }
        expect(() => invokeScoringOperation(operation, fixture)).toThrow(
          "task4_contract_invalid:provenance",
        );
      }
    },
    30_000,
  );

  it.each(DEEP_DIGEST_FAMILIES)(
    "validates the deepest %s digest family before provenance in score, pair, and order",
    (family) => {
      for (const operation of ["score", "pair", "order"] as const) {
        const fixture = structuredClone(scoringFixture());
        fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
        fixture.baseline = rehashBaseline(fixture.baseline);
        corruptDeepDigestFamily(fixture, family);
        expect(() => invokeScoringOperation(operation, fixture)).toThrow(
          "task4_contract_invalid:digest",
        );
      }
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "selects provenance before numeric_nonfinite across %s replay",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
      fixture.baseline = rehashBaseline(fixture.baseline);
      fixture.vectorInput.checkpoint_set.streams[0]!.maximum_sequence = Number.NaN;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:provenance",
      );
    },
    20_000,
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts vector reference binding before supplied-baseline provenance in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.baseline.provenance[0]!.relationship = "wrong_relationship";
      fixture.baseline = rehashBaseline(fixture.baseline);
      fixture.vectorInput.target_scope = structuredClone(fixture.vectorInput.candidate_scope);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:reference_binding",
      );
    },
  );

  it.each(["pair", "order"] as const)(
    "exhausts candidate-B reference binding before candidate-A vector provenance in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vector.provenance = fixture.vector.provenance.filter(
        (entry) => entry.relationship !== "runtime_artifact",
      ) as CandidateFeatureVector["provenance"];
      fixture.vector = rehashVector(fixture.vector);
      fixture.secondVectorInput.target_scope = structuredClone(
        fixture.secondVectorInput.candidate_scope,
      );
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:reference_binding",
      );
    },
  );

  it.each(["pair", "order"] as const)(
    "exhausts candidate-B checkpoint binding before candidate-A profile provenance in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.profile = structuredClone(fixture.vectorInput.profile);
      fixture.vectorInput.profile.provenance = fixture.vectorInput.profile.provenance.filter(
        (entry) => entry.relationship !== "task4_feature_artifact_runtime_profile",
      ) as FeatureProfile["provenance"];
      fixture.vectorInput.profile = rehashFeatureProfile(fixture.vectorInput.profile);
      fixture.secondVectorInput.materials = [];
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:checkpoint_binding",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "maps an independently supplied nonfinite profile to numeric_nonfinite in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.profile.payload.features[0]!.position = Number.NaN;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:numeric_nonfinite",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "maps a nested profile-input checkpoint NaN after complete replay stages in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.profile_input = structuredClone(fixture.vectorInput.profile_input);
      fixture.vectorInput.profile_input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:numeric_nonfinite",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts supplied-vector replay mismatch before nonfinite nested proof in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.profile_input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
      fixture.vector.values[0] = fixture.vector.values[0] === 1 ? 0 : 1;
      fixture.vector = rehashVector(fixture.vector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:feature_profile_binding",
      );
    },
    20_000,
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts supplied-vector provenance before nonfinite nested proof in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.profile_input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
      fixture.vector.provenance = fixture.vector.provenance.slice(1) as CandidateFeatureVector["provenance"];
      fixture.vector = rehashVector(fixture.vector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:provenance",
      );
    },
    20_000,
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts eligibility-gate candidate binding before nonfinite nested proof in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const gate = fixture.vectorInput.rule_evaluations[0]!.eligibility_gate;
      gate.candidate_ref = auxiliaryRef(
        "candidate.wrong",
        "contentmd.task2-evidence-snapshot",
        sha256Canonical({ wrong: true }),
      );
      fixture.vectorInput.rule_evaluations[0]!.eligibility_gate = rehashGate(gate);
      fixture.vectorInput.profile_input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:reference_binding",
      );
    },
  );

  it.each(["pair", "order"] as const)(
    "exhausts candidate-B vector provenance before candidate-A quarantine in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "evidence.task4.cross-branch-quarantine",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "cross-branch-quarantine" }),
        ),
        source_class: "browser_observed",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        expression: "quarantined",
      }] as never;
      fixture.secondVector.provenance = fixture.secondVector.provenance.slice(1) as CandidateFeatureVector["provenance"];
      fixture.secondVector = rehashVector(fixture.secondVector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:provenance",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "checks same-candidate vector replay binding before quarantine in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "evidence.task4.same-candidate-quarantine-binding",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "same-candidate-quarantine-binding" }),
        ),
        source_class: "browser_observed",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        expression: "quarantined",
      }] as never;
      fixture.vector.values[0] = fixture.vector.values[0] === 0 ? 1 : 0;
      fixture.vector = rehashVector(fixture.vector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:feature_profile_binding",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "checks same-candidate vector provenance before quarantine in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "evidence.task4.same-candidate-quarantine-provenance",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "same-candidate-quarantine-provenance" }),
        ),
        source_class: "browser_observed",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        expression: "quarantined",
      }] as never;
      fixture.vector.provenance = fixture.vector.provenance.slice(1) as CandidateFeatureVector["provenance"];
      fixture.vector = rehashVector(fixture.vector);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:provenance",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "checks quarantined evidence base references before quarantine in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: auxiliaryRef(
          "candidate.wrong-quarantine-carrier",
          "contentmd.task2-evidence-snapshot",
          sha256Canonical({ wrong: "quarantine-carrier" }),
        ),
        evidence_ref: auxiliaryRef(
          "evidence.task4.same-candidate-quarantine-reference",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "same-candidate-quarantine-reference" }),
        ),
        source_class: "browser_observed",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        expression: "quarantined",
      }] as never;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:reference_binding",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "orders blocking evidence by its expression-free base projection in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const shared = {
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "evidence.task4.base-projection-order",
          "contentmd.task4-baseline-matrix-evidence",
          sha256Canonical({ fixture: "base-projection-order" }),
        ),
        purpose: "feature_exclusion_only" as const,
        contains_expression: false as const,
      };
      fixture.vectorInput.blocking_evidence = [{
        ...shared,
        source_class: "browser_observed",
      }, {
        ...shared,
        source_class: "competitor",
        expression: "quarantined",
      }] as never;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:quarantined_expression_present",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "classifies a self-consistent invalid eligibility-gate contract before replay in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const gate = fixture.vectorInput.rule_evaluations[0]!.eligibility_gate;
      gate.contract_version = "contentmd.task4-candidate-eligibility-gate/wrong" as never;
      fixture.vectorInput.rule_evaluations[0]!.eligibility_gate = rehashGate(gate);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:canonical_value",
      );
    },
    15_000,
  );

  it.each(["create", "score", "pair", "order"] as const)(
    "keeps malformed generic-lexicon JSON before an independent producer fault in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.baselineInput.feature_profile_input.generic_lexicon.bytes_utf8 = "{";
      fixture.baselineInput.feature_profile_input.generic_lexicon.raw_bytes_digest = digestUtf8("{");
      fixture.baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      if (operation === "create") {
        expect(() => createDeterministicBaseline(fixture.baselineInput)).toThrow(
          "task4_contract_invalid:canonical_value",
        );
      } else {
        expect(() => invokeScoringOperation(operation, fixture)).toThrow(
          "task4_contract_invalid:canonical_value",
        );
      }
    },
  );

  it("classifies a nested invalid artifact-binding role before a baseline producer fault", () => {
    const fixture = structuredClone(scoringFixture());
    fixture.baselineInput.feature_profile_input.artifact_bindings[0]!.role = "bogus" as never;
    fixture.baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createDeterministicBaseline(fixture.baselineInput)).toThrow(
      "task4_contract_invalid:canonical_value",
    );
  });

  it.each(["score", "pair", "order"] as const)(
    "exhausts rule-token Unicode normalization before universe digest in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      makeFirstRuleTokenUnnormalized(fixture.vectorInput.rule_evaluations[0]!);
      fixture.vectorInput.feature_universe.manifest_digest = "0".repeat(64);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:unicode_runtime",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "validates non-token rule identifiers before stale digests in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.rule_evaluations[0]!.candidate_rule_set.rules[1]!.rule_id = "rule.\ud800";
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:unicode_runtime",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "binds checkpoint store-schema artifact refs to raw bytes before replay in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.checkpoint_set = checkpointWithReboundStoreSchemaArtifact(
        fixture.vectorInput.checkpoint_set,
      );
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:digest",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "classifies a nested self-consistent cross-project checkpoint as scope_mismatch in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.baselineInput.feature_profile_input.checkpoint_sets = [
        crossProjectCheckpoint(fixture.baselineInput.feature_profile_input.checkpoint_sets[0]!),
      ];
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:scope_mismatch",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "checks nested binding Unicode runtime digests before forbidden fields in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const profileInput = fixture.baselineInput.feature_profile_input;
      profileInput.feature_universe.context_bindings[0]!.unicode_runtime_digest = "0".repeat(64);
      rehashUniverseWitness(profileInput);
      (fixture.vectorInput.unicode_runtime.runtime_profile as unknown as Record<string, unknown>)
        .actor_identity = "forbidden";
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:scope_mismatch",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "exhausts a finite sibling checkpoint head fault before unrelated nonfinite sequence in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const checkpoint = fixture.vectorInput.checkpoint_set;
      checkpoint.streams[0]!.head_event_id = "feature-source-event.wrong-head";
      checkpoint.streams[1]!.maximum_sequence = Number.NaN;
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:checkpoint_binding",
      );
    },
  );

  it.each((["score", "pair", "order"] as const).flatMap((operation) =>
    (["store-digest", "entry-copy"] as const).map((fault) => [operation, fault] as const)))(
    "exhausts finite descendant checkpoint %s fault before unrelated nonfinite sibling in %s",
    (operation, fault) => {
      const fixture = structuredClone(scoringFixture());
      const checkpoint = fixture.vectorInput.checkpoint_set;
      if (fault === "store-digest") {
        checkpoint.store_binding.instance_nonce_digest = "0".repeat(64);
        checkpoint.streams[1]!.maximum_sequence = Number.NaN;
      } else {
        checkpoint.feature_source_manifest.entries[0]!.event_digest = "0".repeat(64);
        checkpoint.feature_source_manifest.entries[1]!.sequence = Number.NaN;
      }
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        `task4_contract_invalid:${fault === "store-digest" ? "digest" : "checkpoint_binding"}`,
      );
    },
  );

  it("checks the supplied feature-profile ID before deferred nonfinite content in baseline creation", () => {
    const input = structuredClone(scoringFixture().baselineInput);
    input.feature_profile.payload.features[0]!.position = Number.NaN;
    input.feature_profile.record_id = "feature-profile.wrong-independent-id";
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:digest");
  });

  it.each(["score", "pair", "order"] as const)(
    "checks independently derivable profile and snapshot digests before deferred nonfinite content in %s",
    (operation) => {
      for (const subject of ["profile", "snapshot"] as const) {
        const fixture = structuredClone(scoringFixture());
        if (subject === "profile") {
          fixture.profile.payload.features[0]!.position = Number.NaN;
          fixture.profile.record_id = "feature-profile.wrong-independent-id";
        } else {
          attachNonfiniteReceiptToMatchingCandidateSnapshots(fixture.vectorInput);
          fixture.vectorInput.candidate.snapshot_digest = "0".repeat(64);
        }
        expect(() => invokeScoringOperation(operation, fixture)).toThrow(
          "task4_contract_invalid:digest",
        );
      }
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "checks finite material source copies before a nonfinite nested resolver receipt in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const checkpoint = fixture.vectorInput.checkpoint_set;
      attachNonfiniteSnapshotReceipt(checkpoint);
      const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
        candidate.material.material_kind === "task2_evidence_snapshot"
        && candidate.material.value.snapshot_kind === "context")!;
      entry.material.source_ref = auxiliaryRef(
        "snapshot.context.wrong-material-copy",
        "contentmd.task2-evidence-snapshot",
        "0".repeat(64),
      );
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:checkpoint_binding",
      );
    },
  );

  it.each((["score", "pair", "order"] as const).flatMap((operation) =>
    (["actor", "stream-id"] as const).map((fault) => [operation, fault] as const)))(
    "checks finite checkpoint %s semantics before a nonfinite sibling in %s",
    (operation, fault) => {
      const fixture = structuredClone(scoringFixture());
      const checkpoint = fixture.vectorInput.checkpoint_set;
      if (fault === "actor") {
        const entry = checkpoint.feature_source_manifest.entries[0]!;
        entry.event.actor_ref = "contentmd.wrong-actor";
        entry.event.sequence = Number.NaN;
        entry.sequence = Number.NaN;
      } else {
        const stream = checkpoint.streams[0]!;
        stream.stream_id = "feature-source-stream.wrong-derived-id";
        stream.receipt.stream_id = stream.stream_id;
        stream.maximum_sequence = Number.NaN;
        stream.receipt.maximum_sequence = Number.NaN;
      }
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        `task4_contract_invalid:${fault === "actor" ? "checkpoint_binding" : "digest"}`,
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "defers nested snapshot-receipt nonfinite versions to numeric_nonfinite in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      attachNonfiniteSnapshotReceipt(fixture.baselineInput.feature_profile_input.checkpoint_sets[0]!);
      attachNonfiniteSnapshotReceipt(fixture.vectorInput.profile_input.checkpoint_sets[0]!);
      attachNonfiniteSnapshotReceipt(fixture.vectorInput.checkpoint_set);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:numeric_nonfinite",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "defers direct candidate snapshot-receipt nonfinite versions to numeric_nonfinite in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      attachNonfiniteReceiptToMatchingCandidateSnapshots(fixture.vectorInput);
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:numeric_nonfinite",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "classifies duplicate blocking evidence before an independent producer fault in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      const evidence = {
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "fixture.blocking.duplicate",
          "contentmd.fixture-record",
          sha256Canonical({ blocking: "duplicate" }),
        ),
        source_class: "browser_observed" as const,
        purpose: "feature_exclusion_only" as const,
        contains_expression: false as const,
      };
      fixture.vectorInput.blocking_evidence = [evidence, structuredClone(evidence)];
      fixture.vectorInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:canonical_value",
      );
    },
  );

  it.each(["score", "pair", "order"] as const)(
    "keeps quarantined expression aliases ahead of forbidden fields in %s",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.vectorInput.blocking_evidence = [{
        candidate_ref: snapshotRef(fixture.vectorInput.candidate),
        evidence_ref: auxiliaryRef(
          "fixture.blocking.overlap",
          "contentmd.fixture-record",
          sha256Canonical({ blocking: "overlap" }),
        ),
        source_class: "competitor",
        purpose: "feature_exclusion_only",
        contains_expression: false,
        competitor_expression: "copied",
      } as never];
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:quarantined_expression_present",
      );
    },
  );

  it.each([
    ["baseline id", (fixture: ScoringFixture) => { fixture.baseline.baseline_id = 7 as never; }],
    ["baseline profile record id", (fixture: ScoringFixture) => {
      fixture.baseline.feature_profile_ref.record_id = 7 as never;
    }],
    ["baseline profile schema version", (fixture: ScoringFixture) => {
      fixture.baseline.feature_profile_ref.schema_version = 7 as never;
    }],
    ["vector id", (fixture: ScoringFixture) => { fixture.vector.vector_id = 7 as never; }],
    ["vector contract", (fixture: ScoringFixture) => {
      fixture.vector.contract_version = "contentmd.task4-candidate-feature-vector/wrong" as never;
    }],
    ["vector target role", (fixture: ScoringFixture) => { fixture.vector.target_scope_role = "wrong" as never; }],
    ["vector grapheme count", (fixture: ScoringFixture) => { fixture.vector.grapheme_count = "one" as never; }],
  ] as const)("classifies invalid %s before producer work across score, pair, and order", (_name, mutate) => {
    for (const operation of ["score", "pair", "order"] as const) {
      const fixture = structuredClone(scoringFixture());
      mutate(fixture);
      fixture.baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:canonical_value",
      );
    }
  }, 30_000);

  it("classifies a duplicate ordering binding before producer work", () => {
    const fixture = structuredClone(scoringFixture());
    fixture.secondVectorInput = structuredClone(fixture.vectorInput);
    fixture.secondVector = structuredClone(fixture.vector);
    fixture.baselineInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => invokeScoringOperation("order", fixture)).toThrow(
      "task4_contract_invalid:canonical_value",
    );
  });

  it.each(["score", "pair", "order"] as const)(
    "keeps forbidden input ahead of numeric_nonfinite across %s replay",
    (operation) => {
      const fixture = structuredClone(scoringFixture());
      fixture.profile.payload.features[0]!.position = Number.NaN;
      (fixture.vectorInput.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
      expect(() => invokeScoringOperation(operation, fixture)).toThrow(
        "task4_contract_invalid:forbidden_input_field",
      );
    },
  );

  it.each(
    ([8, 10, 12, 16] as const).flatMap((position) =>
      (["score", "pair", "order"] as const).map((operation) => [position, operation] as const)),
  )("defers nonfinite nullable feature %s to numeric_nonfinite in %s", (position, operation) => {
    const fixture = structuredClone(scoringFixture());
    fixture.vector.values[position] = Number.NaN;
    fixture.vector.values[position + 1] = 1;
    expect(() => invokeScoringOperation(operation, fixture)).toThrow(
      "task4_contract_invalid:numeric_nonfinite",
    );
  });

  it.each([
    "feature_universe", "checkpoint_set", "scope_material_sources", "rule_evaluations",
    "context", "vector", "unicode_bundle", "unicode_runtime",
  ])("rejects unavailable construction field %s", (field) => {
    const input = validCreateInput() as CreateBaselineInput & Record<string, unknown>;
    input[field] = {};
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:input_shape");
  });

  it("rejects a runtime witness not bound by the static profile", () => {
    const input = validCreateInput();
    const wrongRuntime = fixtureArtifact("other-runtime");
    const originalRuntime = input.feature_profile.payload.runtime_profile_ref;
    const { content_digest: _digest, ...profileWithoutDigest } = input.feature_profile;
    input.feature_profile = finalizeRecord({
      ...profileWithoutDigest,
      provenance: profileWithoutDigest.provenance.map((entry) => entry.relationship === "task4_feature_artifact_runtime_profile"
        ? {
            record_id: `artifact.${wrongRuntime.artifact_id}.${wrongRuntime.artifact_version}`,
            relationship: entry.relationship,
            content_digest: wrongRuntime.artifact_digest,
          }
        : entry).sort((left, right) => left.record_id.localeCompare(right.record_id, "en")
          || left.relationship.localeCompare(right.relationship, "en")
          || left.content_digest.localeCompare(right.content_digest, "en")) as FeatureProfile["provenance"],
      payload: {
        ...profileWithoutDigest.payload,
        source_artifact_refs: profileWithoutDigest.payload.source_artifact_refs.map((ref) =>
          canonicalJson(ref) === canonicalJson(originalRuntime) ? wrongRuntime : ref).sort((left, right) => Buffer.compare(
            Buffer.from(canonicalJson(left), "utf8"),
            Buffer.from(canonicalJson(right), "utf8"),
          )) as [ArtifactRef, ...ArtifactRef[]],
        runtime_profile_ref: wrongRuntime,
      },
    }) as FeatureProfile;
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:feature_profile_binding",
    );
  });

  it("rejects a rehashed profile with a missing runtime-artifact provenance projection", () => {
    const input = validCreateInput();
    const provenance = input.feature_profile.provenance.filter(
      ({ relationship }) => relationship !== "task4_feature_artifact_runtime_profile",
    ) as FeatureProfile["provenance"];
    const { content_digest: _digest, ...profileWithoutDigest } = input.feature_profile;
    input.feature_profile = finalizeRecord({ ...profileWithoutDigest, provenance }) as FeatureProfile;
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:provenance");
  });

  it("keeps baseline-construction provenance ahead of numeric_nonfinite", () => {
    const input = validCreateInput();
    const provenance = input.feature_profile.provenance.filter(
      ({ relationship }) => relationship !== "task4_feature_artifact_runtime_profile",
    ) as FeatureProfile["provenance"];
    const { content_digest: _digest, ...profileWithoutDigest } = input.feature_profile;
    input.feature_profile = finalizeRecord({ ...profileWithoutDigest, provenance }) as FeatureProfile;
    input.feature_profile.payload.features[0]!.position = Number.NaN;
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:provenance");
  });

  it("exhausts nested profile scope before supplied-profile provenance in baseline construction", () => {
    const input = validCreateInput();
    const provenance = input.feature_profile.provenance.filter(
      ({ relationship }) => relationship !== "task4_feature_artifact_runtime_profile",
    ) as FeatureProfile["provenance"];
    const { content_digest: _digest, ...profileWithoutDigest } = input.feature_profile;
    input.feature_profile = finalizeRecord({ ...profileWithoutDigest, provenance }) as FeatureProfile;
    input.feature_profile_input.project_id = "project.other";
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it("keeps baseline-construction forbidden input ahead of numeric_nonfinite", () => {
    const numericOnly = validCreateInput();
    numericOnly.feature_profile.payload.features[0]!.position = Number.NaN;
    expect(() => createDeterministicBaseline(numericOnly)).toThrow("task4_contract_invalid:numeric_nonfinite");

    const input = validCreateInput();
    input.feature_profile.payload.features[0]!.position = Number.NaN;
    (input.feature_profile_input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:forbidden_input_field");
  });

  it("rejects a profile whose exact feature order is not frozen", () => {
    const input = validCreateInput();
    const { content_digest: _digest, ...profileWithoutDigest } = input.feature_profile;
    input.feature_profile = finalizeRecord({
      ...profileWithoutDigest,
      payload: {
        ...profileWithoutDigest.payload,
        features: [...profileWithoutDigest.payload.features].reverse() as [FeatureDefinition, ...FeatureDefinition[]],
      },
    }) as FeatureProfile;
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:feature_profile_binding",
    );
  });

  it("classifies a malformed profile content digest as digest", () => {
    const input = validCreateInput();
    input.feature_profile.content_digest = "not-a-digest";
    expect(() => createDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:digest",
    );
  });

  it("selects canonical baseline literals before a simultaneous malformed digest", () => {
    const createInput = validCreateInput();
    const baseline = createDeterministicBaseline(createInput);
    const malformed = {
      ...baseline,
      missing_component_rule: "unknown-rule",
      baseline_digest: "not-a-digest",
    } as unknown as typeof baseline;
    expect(() => scoreDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: createInput,
      baseline: malformed,
      feature_profile: createInput.feature_profile,
      vectorization_input: {} as never,
      vector: {} as never,
    })).toThrow("task4_contract_invalid:canonical_value");
  });

  it("exposes the same exact feature order the scorer is required to replay", () => {
    expect(TASK4_FEATURE_ORDER).toEqual(FEATURE_DEFINITIONS.map(({ name }) => name));
  });

  it("replays the real vector and applies exact omission and renormalization", () => {
    const fixture = scoringFixture();
    expect(fixture.vector.values).toEqual([
      1, 1, 1, 1, 1, 1,
      1, 0,
      0, 1,
      0, 1,
      0, 1,
      1, 0,
      0, 1,
      2 / 9,
      0, 0,
    ]);
    const score = scoreDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      vectorization_input: fixture.vectorInput,
      vector: fixture.vector,
    });
    expect(score.omitted_components).toEqual(["recovery", "terminology", "evidence"]);
    expect(score.applicable_components).toEqual([
      {
        name: "required_facts",
        raw_value: 1,
        declared_weight: 0.25,
        normalized_weight: 5 / 11,
        contribution: 5 / 11,
      },
      {
        name: "contextual_specificity",
        raw_value: 1,
        declared_weight: 0.15,
        normalized_weight: 3 / 11,
        contribution: 3 / 11,
      },
      {
        name: "one_minus_generic",
        raw_value: 7 / 9,
        declared_weight: 0.10,
        normalized_weight: 2 / 11,
        contribution: (2 / 11) * (7 / 9),
      },
      {
        name: "one_minus_length",
        raw_value: 1,
        declared_weight: 0.05,
        normalized_weight: 1 / 11,
        contribution: 1 / 11,
      },
    ]);
    expect(score.score).toBe(0.9595959595959597);
    const { score_digest: _digest, ...preimage } = score;
    expect(score.score_digest).toBe(sha256Canonical(preimage));
    expect(score.vector_ref).toEqual({
      record_id: fixture.vector.vector_id,
      schema_id: "contentmd.task4-candidate-feature-vector",
      schema_version: "0.1.0",
      content_digest: fixture.vector.vector_digest,
    });
  });

  it("keeps a positive denominator when every optional coverage is missing", () => {
    const fixture = buildScoringFixture({ emptyMaterials: true });
    const score = scoreDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      vectorization_input: fixture.vectorInput,
      vector: fixture.vector,
    });
    expect(score.omitted_components).toEqual([
      "required_facts", "recovery", "terminology", "evidence",
    ]);
    expect(score.applicable_components.map(({ name }) => name)).toEqual([
      "contextual_specificity", "one_minus_generic", "one_minus_length",
    ]);
    expect(score.score).toBe(0.925925925925926);
    expect(Number.isFinite(score.score)).toBe(true);
  });

  it("uses exact tie probability and exact A/B reversal complement", () => {
    const tie = buildScoringFixture({
      expression: "Clear next.",
      secondExpression: "Clear next.",
    });
    const tied = compareDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: tie.baselineInput,
      baseline: tie.baseline,
      feature_profile: tie.profile,
      candidate_a_vectorization_input: tie.vectorInput,
      candidate_a: tie.vector,
      candidate_b_vectorization_input: tie.secondVectorInput,
      candidate_b: tie.secondVector,
    });
    expect(tied.score_difference).toBe(0);
    expect(tied.probability_a).toBe(0.5);
    expect(tied.probability_b).toBe(0.5);

    const fixture = scoringFixture();
    const forward = compareDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      candidate_a_vectorization_input: fixture.vectorInput,
      candidate_a: fixture.vector,
      candidate_b_vectorization_input: fixture.secondVectorInput,
      candidate_b: fixture.secondVector,
    });
    const reverse = compareDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      candidate_a_vectorization_input: fixture.secondVectorInput,
      candidate_a: fixture.secondVector,
      candidate_b_vectorization_input: fixture.vectorInput,
      candidate_b: fixture.vector,
    });
    expect(forward.score_difference).toBeLessThan(0);
    expect(reverse.score_difference).toBe(-forward.score_difference);
    expect(reverse.probability_a).toBe(forward.probability_b);
    expect(reverse.probability_b).toBe(forward.probability_a);
    expect(forward.probability_b).toBe(1 - forward.probability_a);
    expect(forward.probability_a).toBeGreaterThanOrEqual(fixture.baseline.probability_clip_lower);
    expect(forward.probability_a).toBeLessThanOrEqual(fixture.baseline.probability_clip_upper);
    const { pair_digest: _pairDigest, ...pairPreimage } = forward;
    expect(forward.pair_digest).toBe(sha256Canonical(pairPreimage));
  }, 20_000);

  it("orders score descending and resolves a real score tie by candidate content digest", () => {
    const fixture = scoringFixture();
    const ordered = orderBaselineCandidates({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      candidates: [
        { vectorization_input: fixture.vectorInput, vector: fixture.vector },
        { vectorization_input: fixture.secondVectorInput, vector: fixture.secondVector },
      ],
    });
    expect(ordered.map(({ rank }) => rank)).toEqual([0, 1]);
    expect(ordered[0]!.score).toBeGreaterThan(ordered[1]!.score);
    expect(ordered[0]!.vector_ref.record_id).toBe(fixture.secondVector.vector_id);

    const tie = buildScoringFixture({
      expression: "Clear next.",
      secondExpression: "Clear next.",
    });
    const tied = orderBaselineCandidates({
      record_mode: "development_fixture",
      baseline_input: tie.baselineInput,
      baseline: tie.baseline,
      feature_profile: tie.profile,
      candidates: [
        { vectorization_input: tie.vectorInput, vector: tie.vector },
        { vectorization_input: tie.secondVectorInput, vector: tie.secondVector },
      ],
    });
    const expectedDigests = [
      tie.vector.candidate_ref.content_digest,
      tie.secondVector.candidate_ref.content_digest,
    ].sort();
    expect(tied.map(({ candidate_ref }) => candidate_ref.content_digest)).toEqual(expectedDigests);
  });

  it("rejects a digest-valid self-authored vector after full replay", () => {
    const fixture = scoringFixture();
    const values = [...fixture.vector.values] as CandidateFeatureVector["values"];
    values[18] = 0;
    const forged = rehashVector({ ...fixture.vector, values });
    expect(() => scoreDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      vectorization_input: fixture.vectorInput,
      vector: forged,
    })).toThrow("task4_contract_invalid:feature_profile_binding");
  });

  it("rejects duplicate pair and ordering vector identities", () => {
    const fixture = scoringFixture();
    expect(() => compareDeterministicBaseline({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      candidate_a_vectorization_input: fixture.vectorInput,
      candidate_a: fixture.vector,
      candidate_b_vectorization_input: fixture.vectorInput,
      candidate_b: fixture.vector,
    })).toThrow("task4_contract_invalid:feature_profile_binding");
    expect(() => orderBaselineCandidates({
      record_mode: "development_fixture",
      baseline_input: fixture.baselineInput,
      baseline: fixture.baseline,
      feature_profile: fixture.profile,
      candidates: [
        { vectorization_input: fixture.vectorInput, vector: fixture.vector },
        { vectorization_input: fixture.vectorInput, vector: fixture.vector },
      ],
    })).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["create", createDeterministicBaseline, officialCreateInput],
    ["score", scoreDeterministicBaseline, officialScoreInput],
    ["compare", compareDeterministicBaseline, officialPairInput],
    ["order", orderBaselineCandidates, officialOrderingInput],
  ] as const)("fails %s official mode before nested work", (_name, operation, makeInput) => {
    const input = makeInput();
    expect(() => operation(input as never)).toThrow(
      "task4_contract_invalid:official_mode_not_supported",
    );
  });

  it("rejects unavailable construction fields through the closed top-level shape", () => {
    const input = officialCreateInput() as CreateBaselineInput & { feature_universe?: unknown };
    input.feature_universe = {};
    expect(() => createDeterministicBaseline(input)).toThrow("task4_contract_invalid:input_shape");
  });

  it("never reads nested accessors before official failure", () => {
    let reads = 0;
    const input = officialScoreInput();
    Object.defineProperty(input.vector, "values", {
      enumerable: true,
      get() {
        reads += 1;
        return [];
      },
    });
    expect(() => scoreDeterministicBaseline(input)).toThrow(
      "task4_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);
  });
});
