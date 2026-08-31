import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import { adaptContentDecisionEvent } from "../src/feedback.js";
import {
  createFeatureProfile,
  vectorizeCandidate,
  type CandidateEligibilityGate,
  type CandidateRuleSet,
  type CandidateVectorizationInput,
  type CreateFeatureProfileInput,
  type FeatureArtifactBinding,
  type FeatureContextBinding,
  type FeatureMaterial,
  type FeatureUniverseManifest,
  type ScopeMaterial,
  TASK4_FEATURE_ORDER,
} from "../src/features.js";
import {
  FEATURE_SOURCE_ROLES,
  deriveFeatureSourceEventId,
  deriveFeatureSourceStreamId,
  task3CheckpointSetRef,
  type FeatureSourceCheckpointSet,
  type FeatureSourceManifestEntry,
} from "../src/leakage.js";
import type { DigestRef, ExemplarRecord } from "../src/records.js";
import type { EvidenceSnapshot, StableSetPayload } from "../src/qualification.js";
import {
  verifyTask4Producer,
  type Task4DependencyManifest,
  type Task4ProducerArtifactWitness,
  type Task4UnicodeRuntime,
} from "../src/retrieval.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";
import {
  canonicalSet,
  qualificationFixture,
  rehashSnapshot,
  snapshotRef,
} from "./task2-fixtures.js";

const PROJECT_ID = "project.task2.fixture";
const NOW = "2026-08-20T19:00:00.000Z";
const CONTRACT_PATH = "docs/superpowers/specs/2026-08-20-contentmd-retrieval-features-baseline-contracts-design.md";
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
  const header = witness.bytes_utf8.slice(0, 4_096);
  const artifact_id = header.match(/"artifact_id":"([^"]+)"/u)?.[1];
  const artifact_version = header.match(/"artifact_version":"([^"]+)"/u)?.[1];
  if (artifact_id === undefined || artifact_version === undefined) throw new Error(`artifact_header_invalid:${path}`);
  return { ...witness, artifact_ref: { artifact_id, artifact_version, artifact_digest: witness.raw_bytes_digest } };
}

function storeArtifact(path: string, artifact_id: string) {
  const witness = raw(path);
  return { ...witness, artifact_ref: { artifact_id, artifact_version: "0.1.0", artifact_digest: witness.raw_bytes_digest } };
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
  const unicode_bundle: UnicodeArtifactBundle = { ...bundlePreimage, bundle_digest: sha256Canonical(bundlePreimage) };
  const runtime_profile = storeArtifact("fixtures/learning-ranking/feature-source-runtime-profile.json", "contentmd.feature-source-runtime-profile");
  const preimage = { contract_version: "contentmd.task4-unicode-runtime/0.1.0" as const, unicode_bundle, runtime_profile };
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
    entries: source_artifacts.map(({ path, raw_bytes_digest }) => ({ path, raw_bytes_digest, runtime_dependency_paths: dependencies.get(path)! })) as Task4DependencyManifest["entries"],
  };
  return {
    contract_version: "contentmd.task4-producer-witness/0.1.0",
    producer_id,
    contract_artifact: raw(CONTRACT_PATH),
    schema_artifact: producer_id === "feature-profile" ? raw("packages/schemas/src/learning-records.schema.json") : null,
    source_artifacts,
    resolution_artifacts,
    dependency_manifest: { ...manifestPreimage, dependency_manifest_digest: sha256Canonical(manifestPreimage) },
    verification_mode: "development_fixture",
    verification_receipt: null,
  };
}

function buildVerifiedProducer(producer_id: Task4ProducerArtifactWitness["producer_id"]): Task4ProducerArtifactWitness {
  const witness = producer(producer_id);
  const code_digest = sha256Canonical({
    contract_version: "contentmd.task4-code-manifest/0.2.0",
    producer_id,
    entry_paths: witness.dependency_manifest.entry_paths,
    resolution_artifacts: witness.dependency_manifest.resolution_artifacts,
    dependency_manifest_digest: witness.dependency_manifest.dependency_manifest_digest,
    entries: witness.dependency_manifest.entries,
  });
  const producer_manifest_digest = sha256Canonical({
    contract_version: "contentmd.task4-producer-manifest/0.1.0",
    producer_id,
    contract: { path: witness.contract_artifact.path, raw_bytes_digest: witness.contract_artifact.raw_bytes_digest },
    schema: witness.schema_artifact === null ? null : {
      path: witness.schema_artifact.path,
      raw_bytes_digest: witness.schema_artifact.raw_bytes_digest,
    },
    dependency_manifest_digest: witness.dependency_manifest.dependency_manifest_digest,
    code_digest,
  });
  const target = `contentmd://task4/producer-manifest/${producer_id}`;
  const verification_receipt = finalizeRecord({
    record_id: `verification-receipt.task4-producer.${producer_id}.${producer_manifest_digest}`,
    schema_id: "contentmd.verification-receipt-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: { memory_scope: "task", project_id: null, resource_refs: [target], data_classes: ["verification_metadata"] },
    provenance: [],
    lifecycle_state: "active",
    payload: {
      transaction_ref: `producer-manifest.${producer_manifest_digest}`,
      target_path: target,
      expected_digest: producer_manifest_digest,
      observed_digest: producer_manifest_digest,
      status: "passed" as const,
      verified_at: NOW,
      method: "sha256-canonical-readback" as const,
    },
  });
  return { ...witness, verification_mode: "build_verified", verification_receipt };
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
  snapshots: Array<[FeatureSourceManifestEntry["source_role"], FeatureSourceManifestEntry["material"]["value"]]>,
  storeSchemaArtifactDigest?: string,
  projectId = PROJECT_ID,
): FeatureSourceCheckpointSet {
  const originalStoreSchema = storeArtifact("fixtures/learning-ranking/feature-source-store-schema.json", "contentmd.feature-source-store-schema");
  const store_schema = storeSchemaArtifactDigest === undefined ? originalStoreSchema : {
    ...originalStoreSchema,
    artifact_ref: { ...originalStoreSchema.artifact_ref, artifact_digest: storeSchemaArtifactDigest },
  };
  const runtime_profile = storeArtifact("fixtures/learning-ranking/feature-source-runtime-profile.json", "contentmd.feature-source-runtime-profile");
  const store_instance_id = "feature-store.task4.fixture";
  const store_kind = "synthetic_append_only_event_store" as const;
  const instance_nonce_digest = sha256Canonical({ contract_version: "contentmd.feature-store-instance/0.1.0", store_instance_id, store_kind, project_id: projectId });
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
  const store_binding = { ...bindingWithoutDigest, binding_digest: sha256Canonical(bindingWithoutDigest) };
  const priorByRole = new Map<FeatureSourceManifestEntry["source_role"], { sequence: number; digest: string | null }>();
  const entries = snapshots.map(([source_role, value]) => {
    const durable = value !== null && typeof value === "object" && "schema_id" in value;
    const source_ref = durable
      ? auxiliaryRef(
          (value as ExemplarRecord).record_id,
          (value as ExemplarRecord).schema_id,
          (value as ExemplarRecord).content_digest,
        )
      : snapshotRef(value as never);
    const stream_id = deriveFeatureSourceStreamId(store_binding.binding_digest, projectId, source_role);
    const event_id = deriveFeatureSourceEventId(store_binding.binding_digest, stream_id, source_ref, source_role, "project_owned_synthetic");
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
      material: durable
        ? { material_kind: "durable_record" as const, source_ref, value: value as ExemplarRecord }
        : { material_kind: "task2_evidence_snapshot" as const, source_ref, value: value as never },
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
  const manifestIdentity = { contract_version: "contentmd.feature-source-manifest/0.1.0" as const, project_id: projectId, entries: sortedEntries };
  const manifest_id = `feature-source-manifest.${sha256Canonical(manifestIdentity)}`;
  const manifestWithoutDigest = { ...manifestIdentity, manifest_id };
  const feature_source_manifest = { ...manifestWithoutDigest, manifest_digest: sha256Canonical(manifestWithoutDigest) };
  const eventsByRole = new Map<FeatureSourceManifestEntry["source_role"], FeatureSourceManifestEntry["event"][]>();
  for (const entry of entries) {
    const events = eventsByRole.get(entry.source_role) ?? [];
    events.push(entry.event);
    eventsByRole.set(entry.source_role, events);
  }
  const streams = FEATURE_SOURCE_ROLES.map((role) => {
    const stream_id = deriveFeatureSourceStreamId(store_binding.binding_digest, projectId, role);
    const complete_prefix = [...(eventsByRole.get(role) ?? [])].sort((left, right) => left.sequence - right.sequence);
    const maximum_sequence = complete_prefix.length;
    const head = complete_prefix.at(-1) ?? null;
    const prefix_digest = sha256Canonical({ contract_version: "contentmd.feature-source-prefix/0.1.0", stream_id, maximum_sequence, complete_prefix });
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
      receipt: { ...receiptWithoutDigest, receipt_digest: sha256Canonical(receiptWithoutDigest) },
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

function attachNonfiniteReceiptToMatchingSnapshots(
  input: CandidateVectorizationInput,
  direct: CheckpointEvidenceSnapshot,
): void {
  attachNonfiniteReceiptToSnapshot(direct);
  for (const checkpoint of [input.checkpoint_set, ...input.profile_input.checkpoint_sets]) {
    for (const entry of checkpoint.feature_source_manifest.entries) {
      if (entry.material.material_kind === "task2_evidence_snapshot"
        && entry.material.value.snapshot_id === direct.snapshot_id) {
        attachNonfiniteReceiptToSnapshot(entry.material.value);
      }
    }
  }
}

interface Task4Fixture {
  profileInput: CreateFeatureProfileInput;
  vectorInput: CandidateVectorizationInput;
}

function compareCanonical(left: unknown, right: unknown): number {
  return Buffer.compare(Buffer.from(canonicalJson(left), "utf8"), Buffer.from(canonicalJson(right), "utf8"));
}

function scopeRef(scope: ScopeMaterial): DigestRef {
  return auxiliaryRef(scope.scope_material_id, "contentmd.task4-scope-material", scope.material_digest);
}

function materialRef(material: FeatureMaterial): DigestRef {
  return auxiliaryRef(material.material_id, "contentmd.task4-feature-material", material.material_digest);
}

function ruleRef(rule: CandidateRuleSet): DigestRef {
  return auxiliaryRef(rule.rule_set_id, "contentmd.task4-candidate-rule-set", rule.rule_set_digest);
}

function sortByRef<T>(values: readonly T[], select: (value: T) => unknown): T[] {
  return [...values].sort((left, right) => compareCanonical(select(left), select(right)));
}

function task4Fixture(options: {
  expression?: string;
  omitRequiredSource?: boolean;
  targetLocale?: string;
  materialLocale?: string;
  emptyMaterials?: boolean;
  ruleToken?: string;
  ruleProject?: string;
  ruleLocale?: string;
  actionSourceRole?: "context" | "fact_set";
  candidateBContextMismatch?: boolean;
  ruleSourceFromCandidateA?: boolean;
  nonfiniteCheckpoint?: boolean;
  duplicateCheckpoint?: boolean;
  checkpointProject?: string;
  omitContextTargetScopeRef?: boolean;
  forbiddenProfile?: boolean;
  actionMatchForms?: [string, ...string[]];
  candidateScopeViaExemplar?: boolean;
  exemplarSubjectMismatch?: boolean;
} = {}): Task4Fixture {
  const runtime = unicodeRuntime();
  const base = qualificationFixture(adaptContentDecisionEvent).input;

  const requiredMaterial = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material", "material_id", "material_digest", {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: options.materialLocale ?? "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [base.fact_set.payload.item_refs[0]!],
      authority_effect: "none",
      material_kind: "required_fact",
      match_forms: [],
    },
  );
  const actionMaterial = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material", "material_id", "material_digest", {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: options.materialLocale ?? "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [options.actionSourceRole === "fact_set"
        ? base.fact_set.payload.item_refs[0]!
        : base.context.source_refs[0]!],
      authority_effect: "none",
      material_kind: "context_action",
      match_forms: options.actionMatchForms ?? ["clear next"],
    },
  );
  const requiredRef = auxiliaryRef(requiredMaterial.material_id, "contentmd.task4-feature-material", requiredMaterial.material_digest);
  const actionRef = auxiliaryRef(actionMaterial.material_id, "contentmd.task4-feature-material", actionMaterial.material_digest);
  const factItems = canonicalSet(options.emptyMaterials === true
    ? base.fact_set.payload.item_refs
    : [...base.fact_set.payload.item_refs, requiredRef]) as [DigestRef, ...DigestRef[]];
  const fact_set = rehashSnapshot({
    ...base.fact_set,
    source_refs: factItems,
    payload: {
      ...base.fact_set.payload,
      item_refs: factItems,
      set_digest: sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs: factItems }),
    },
  });
  const factRef = snapshotRef(fact_set);
  const requiredGateRef = options.emptyMaterials === true ? factRef : requiredRef;
  const permissionRef = auxiliaryRef("fixture.permission", "contentmd.fixture-record", sha256Canonical({ fixture: "permission" }));
  const checksRef = auxiliaryRef("fixture.checks", "contentmd.fixture-record", sha256Canonical({ fixture: "checks" }));
  const ruleSet = twoStage<CandidateRuleSet, "rule_set_id", "rule_set_digest">(
    "candidate-rule-set", "rule_set_id", "rule_set_digest", {
      contract_version: "contentmd.task4-candidate-rule-set/0.1.0",
      project_id: options.ruleProject ?? PROJECT_ID,
      locale: options.ruleLocale ?? "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [options.ruleSourceFromCandidateA === true
        ? base.candidate_a.source_refs[0]!
        : permissionRef],
      rules: [
        { rule_id: "rule.forbidden", failure_class: "prohibited_claim", rule_kind: "forbidden_token_sequence", tokens: [options.ruleToken ?? "forbidden"] },
        { rule_id: "rule.required", failure_class: "hard_rule", rule_kind: "required_source_ref", source_ref: requiredGateRef },
      ],
      rule_set_state: "current",
      authority_effect: "none",
    },
  );
  const ruleRef = auxiliaryRef(ruleSet.rule_set_id, "contentmd.task4-candidate-rule-set", ruleSet.rule_set_digest);
  const ruleBytes = canonicalJson(ruleSet);
  const ruleArtifact = raw("fixtures/learning-ranking/task4-rule-set.fixture.json", ruleBytes);
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
      set_digest: sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs: policyItems }),
    },
  });
  const policyRef = snapshotRef(policy);
  const targetScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material", "scope_material_id", "material_digest", {
      contract_version: "contentmd.task4-scope-material/0.1.0",
      scope_role: "target",
      project_id: PROJECT_ID,
      memory_scope: "project",
      product_area: "checkout",
      journey_state: "confirmation",
      channel: "web",
      locale: options.targetLocale ?? "en",
      market: "US",
      risk: "low",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: [factRef],
      authority_effect: "none",
    },
  );
  const candidateScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material", "scope_material_id", "material_digest", {
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
  const targetScopeRef = auxiliaryRef(targetScope.scope_material_id, "contentmd.task4-scope-material", targetScope.material_digest);
  const candidateScopeRef = auxiliaryRef(candidateScope.scope_material_id, "contentmd.task4-scope-material", candidateScope.material_digest);
  const context = rehashSnapshot({
    ...base.context,
    source_refs: canonicalSet([
      ...base.context.source_refs,
      ...(options.emptyMaterials === true ? [] : [actionRef]),
      ...(options.omitContextTargetScopeRef === true ? [] : [targetScopeRef]),
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...base.context.payload, locale: "en" },
  });
  const contextRef = snapshotRef(context);
  const alternateContextRef = snapshotRef(rehashSnapshot({
    ...structuredClone(context),
    snapshot_id: "snapshot.context.task4-alternate",
    payload: { ...context.payload, context_key: `${context.payload.context_key}.alternate` },
  }));
  const task = rehashSnapshot({
    ...base.task,
    payload: { ...base.task.payload, fact_set_ref: factRef, policy_ref: policyRef, context_ref: contextRef },
  });
  const taskRef = snapshotRef(task);
  const expression = options.expression ?? "Use a seamless experience with a clear next step.";
  const candidate_a = rehashSnapshot({
    ...base.candidate_a,
    source_refs: canonicalSet([
      ...base.candidate_a.source_refs,
      ...(options.candidateScopeViaExemplar === true ? [] : [candidateScopeRef]),
      ...(options.omitRequiredSource === true ? [] : [requiredGateRef]),
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
      ...(options.candidateScopeViaExemplar === true ? [] : [candidateScopeRef]),
    ]) as [DigestRef, ...DigestRef[]],
    payload: {
      ...base.candidate_b.payload,
      task_ref: taskRef,
      context_ref: options.candidateBContextMismatch === true ? alternateContextRef : contextRef,
    },
  });
  const exemplarSubjectRef = options.exemplarSubjectMismatch === true
    ? auxiliaryRef(
        "scope-material.wrong-approved-exemplar-subject",
        "contentmd.task4-scope-material",
        sha256Canonical({ wrong: "approved-exemplar-subject" }),
      )
    : candidateScopeRef;
  const approvedExemplar = finalizeRecord({
    record_id: "exemplar.task4.scope-closure",
    schema_id: "contentmd.exemplar-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: PROJECT_ID,
      resource_refs: ["resource.task4.scope-closure"],
      data_classes: ["learning_exemplar"],
    },
    provenance: [{
      record_id: exemplarSubjectRef.record_id,
      relationship: "subject",
      content_digest: exemplarSubjectRef.content_digest,
    }],
    lifecycle_state: "active" as const,
    payload: {
      contract_version: "contentmd.learning-record-contract/0.1.0" as const,
      record_mode: "development_fixture" as const,
      ranking_objective: "expression_preference" as const,
      candidate_kind: "expression" as const,
      schema_digest: sha256Canonical({ fixture: "scope-closure-schema" }),
      code_digest: sha256Canonical({ fixture: "scope-closure-code" }),
      input_digest: sha256Canonical({ fixture: "scope-closure-input" }),
      authority_effect: "none" as const,
      exemplar_kind: "mechanism" as const,
      subject_ref: exemplarSubjectRef,
      approval_ref: permissionRef,
      applicability_scope_ref: candidateScopeRef,
      transfer_condition_refs: [policyRef] as [DigestRef, ...DigestRef[]],
      prohibited_transfer: "Do not transfer outside the fixture scope.",
      rights_ref: checksRef,
      permission_ref: permissionRef,
      currentness_state: "current" as const,
      exemplar_state: "approved_current" as const,
    },
  }) as ExemplarRecord;
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
    snapshot_id: "snapshot.acceptance-criteria.task4",
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
    ["task", task], ["context", context], ["fact_set", fact_set], ["policy", policy],
    ["candidate_a", candidate_a], ["candidate_b", candidate_b], ["acceptance_criteria", acceptance],
    ...(options.candidateScopeViaExemplar === true
      ? [["approved_exemplar", approvedExemplar] as const]
      : []),
  ], undefined, options.checkpointProject);
  if (options.nonfiniteCheckpoint === true) checkpoint.streams[0]!.maximum_sequence = Number.NaN;
  const checkpointRef = task3CheckpointSetRef(checkpoint);
  const acceptanceRef = snapshotRef(acceptance);
  const featureRefs = canonicalSet(options.emptyMaterials === true ? [] : [requiredRef, actionRef]);
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
  const lexiconRef = { artifact_id: "contentmd.generic-language-lexicon.en", artifact_version: "0.1.0", artifact_digest: lexiconRaw.raw_bytes_digest };
  const unicodeRefs = canonicalSet([
    runtime.unicode_bundle.normalization.artifact_ref,
    runtime.unicode_bundle.casefold.artifact_ref,
    runtime.unicode_bundle.whitespace.artifact_ref,
    runtime.unicode_bundle.word_break.artifact_ref,
    runtime.unicode_bundle.grapheme_break.artifact_ref,
  ]) as [typeof runtime.unicode_bundle.normalization.artifact_ref, ...typeof runtime.unicode_bundle.normalization.artifact_ref[]];
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
  const feature_universe: FeatureUniverseManifest = { ...universeWithoutDigest, manifest_digest: sha256Canonical(universeWithoutDigest) };
  const universeRaw = raw("fixtures/learning-ranking/task4-feature-universe.fixture.json", canonicalJson(feature_universe));
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
  const profileInput: CreateFeatureProfileInput = {
    record_mode: "development_fixture",
    project_id: PROJECT_ID,
    producer: producer("feature-profile"),
    unicode_runtime: runtime,
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_sets: [checkpoint],
    scope_material_sources: [targetScope, candidateScope].sort((left, right) => Buffer.compare(
      Buffer.from(canonicalJson(auxiliaryRef(left.scope_material_id, "contentmd.task4-scope-material", left.material_digest))),
      Buffer.from(canonicalJson(auxiliaryRef(right.scope_material_id, "contentmd.task4-scope-material", right.material_digest))),
    )) as [ScopeMaterial, ...ScopeMaterial[]],
    feature_material_sources: (options.emptyMaterials === true ? [] : [requiredMaterial, actionMaterial]).sort((left, right) => Buffer.compare(Buffer.from(canonicalJson(auxiliaryRef(left.material_id, "contentmd.task4-feature-material", left.material_digest))), Buffer.from(canonicalJson(auxiliaryRef(right.material_id, "contentmd.task4-feature-material", right.material_digest))))),
    hard_rule_sources: [{ candidate_rule_set: ruleSet, candidate_rule_set_artifact: ruleArtifact }],
    generic_lexicon: lexiconRaw,
    artifact_bindings,
    runtime_profile_ref: runtimeProfileRef,
  };
  if (options.duplicateCheckpoint === true) {
    profileInput.checkpoint_sets = [checkpoint, structuredClone(checkpoint)] as CreateFeatureProfileInput["checkpoint_sets"];
  }
  if (options.forbiddenProfile === true) {
    (profileInput.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
  }
  const profile = createFeatureProfile(profileInput);
  const candidateRef = snapshotRef(candidate_a);
  const findings = [
    ...((expression.includes("Forbidden") || expression.includes("forbidden"))
      ? [{ rule_id: "rule.forbidden", failure_class: "prohibited_claim" as const }] : []),
    ...(options.omitRequiredSource === true
      ? [{ rule_id: "rule.required", failure_class: "hard_rule" as const }] : []),
  ];
  const gateIdentity = {
    contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0" as const,
    candidate_ref: candidateRef,
    rule_set_ref: ruleRef,
    rule_set_artifact_ref: ruleArtifactRef,
    unicode_runtime_digest: runtime.runtime_digest,
    findings,
    hard_rule_status: findings.some((finding) => finding.failure_class === "hard_rule") ? "fail" as const : "pass" as const,
    prohibited_claim_status: findings.some((finding) => finding.failure_class === "prohibited_claim") ? "hit" as const : "clear" as const,
    authority_effect: "none" as const,
  };
  const gate_id = `candidate-eligibility-gate.${sha256Canonical(gateIdentity)}`;
  const gateWithoutDigest = { ...gateIdentity, gate_id };
  const eligibility_gate: CandidateEligibilityGate = { ...gateWithoutDigest, gate_digest: sha256Canonical(gateWithoutDigest) };
  const vectorInput: CandidateVectorizationInput = {
    record_mode: "development_fixture",
    producer: producer("candidate-feature-vector"),
    unicode_runtime: runtime,
    profile_input: profileInput,
    profile,
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_set: checkpoint,
    scope_material_sources: profileInput.scope_material_sources,
    target_scope: targetScope,
    candidate_scope: candidateScope,
    candidate: candidate_a,
    materials: profileInput.feature_material_sources,
    generic_lexicon: lexiconRaw,
    acceptance_criteria_sources: [acceptance],
    rule_evaluations: [{ candidate_rule_set: ruleSet, candidate_rule_set_artifact: ruleArtifact, eligibility_gate }],
    blocking_evidence: [],
  };
  return { profileInput, vectorInput };
}

type ProfileFault = {
  category: string;
  suffix: string;
  mutate: (input: CreateFeatureProfileInput) => void;
};

const PROFILE_FAULTS: readonly ProfileFault[] = [
  { category: "canonical", suffix: "canonical_value", mutate: (input) => {
    (input.feature_universe.context_bindings[0] as FeatureContextBinding & { extra?: boolean }).extra = true;
  } },
  { category: "producer", suffix: "producer_witness", mutate: (input) => {
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
  } },
  { category: "unicode", suffix: "unicode_runtime", mutate: (input) => {
    input.unicode_runtime.runtime_digest = "0".repeat(64);
  } },
  { category: "digest", suffix: "digest", mutate: (input) => {
    input.feature_universe.manifest_digest = "0".repeat(64);
  } },
  { category: "reference", suffix: "reference_binding", mutate: (input) => {
    input.runtime_profile_ref = structuredClone(input.feature_universe.generic_lexicon_ref);
  } },
  { category: "scope", suffix: "scope_mismatch", mutate: (input) => {
    input.project_id = "project.other";
  } },
  { category: "checkpoint", suffix: "checkpoint_binding", mutate: (input) => {
    input.feature_material_sources = [];
  } },
  { category: "forbidden", suffix: "forbidden_input_field", mutate: (input) => {
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
  } },
  { category: "numeric", suffix: "numeric_nonfinite", mutate: (input) => {
    input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
  } },
] as const;

const PROFILE_FAULT_PAIRS = PROFILE_FAULTS.flatMap((earlier, index) =>
  PROFILE_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

function rehashFeatureProfileProvenance(
  profile: CandidateVectorizationInput["profile"],
): CandidateVectorizationInput["profile"] {
  const { content_digest: _digest, ...withoutDigest } = profile;
  return finalizeRecord(withoutDigest) as CandidateVectorizationInput["profile"];
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
    || compareCanonical(left.artifact_ref, right.artifact_ref));
}

type VectorFault = {
  category: string;
  suffix: string;
  mutate: (input: CandidateVectorizationInput) => void;
};

const VECTOR_FAULTS: readonly VectorFault[] = [
  { category: "canonical", suffix: "canonical_value", mutate: (input) => {
    (input.feature_universe.context_bindings[0] as FeatureContextBinding & { extra?: boolean }).extra = true;
  } },
  { category: "producer", suffix: "producer_witness", mutate: (input) => {
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
  } },
  { category: "unicode", suffix: "unicode_runtime", mutate: (input) => {
    input.unicode_runtime.runtime_digest = "0".repeat(64);
  } },
  { category: "digest", suffix: "digest", mutate: (input) => {
    input.feature_universe.manifest_digest = "0".repeat(64);
  } },
  { category: "reference", suffix: "reference_binding", mutate: (input) => {
    input.target_scope = structuredClone(input.candidate_scope);
  } },
  { category: "scope", suffix: "scope_mismatch", mutate: (input) => {
    input.profile_input.project_id = "project.other";
  } },
  { category: "checkpoint", suffix: "checkpoint_binding", mutate: (input) => {
    input.materials = [];
  } },
  { category: "feature_profile", suffix: "feature_profile_binding", mutate: (input) => {
    input.profile.payload.input_digest = "f".repeat(64);
    input.profile.record_id = `feature-profile.${sha256Canonical({
      contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
      project_id: input.profile.scope.project_id,
      input_digest: input.profile.payload.input_digest,
    })}`;
    input.profile = rehashFeatureProfileProvenance(input.profile);
  } },
  { category: "provenance", suffix: "provenance", mutate: (input) => {
    input.profile.provenance = input.profile.provenance.filter(
      (entry) => entry.relationship !== "task4_feature_artifact_runtime_profile",
    ) as typeof input.profile.provenance;
    input.profile = rehashFeatureProfileProvenance(input.profile);
  } },
  { category: "quarantine", suffix: "quarantined_expression_present", mutate: (input) => {
    input.blocking_evidence = [{
      candidate_ref: snapshotRef(input.candidate),
      evidence_ref: auxiliaryRef("matrix.blocking", "contentmd.fixture-record", sha256Canonical({ matrix: "blocking" })),
      source_class: "browser_observed",
      purpose: "feature_exclusion_only",
      contains_expression: false,
      expression: "copied expression",
    }] as never;
  } },
  { category: "forbidden", suffix: "forbidden_input_field", mutate: (input) => {
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
  } },
  { category: "numeric", suffix: "numeric_nonfinite", mutate: (input) => {
    input.profile.payload.features[0]!.position = Number.NaN;
  } },
] as const;

const VECTOR_FAULT_PAIRS = VECTOR_FAULTS.flatMap((earlier, index) =>
  VECTOR_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

let cachedMatrixFixture: Task4Fixture | undefined;
function matrixFixture(): Task4Fixture {
  cachedMatrixFixture ??= task4Fixture();
  return structuredClone(cachedMatrixFixture);
}

function materialSnapshot<T extends FeatureSourceManifestEntry["source_role"]>(
  checkpoint: FeatureSourceCheckpointSet,
  role: T,
) {
  const entry = checkpoint.feature_source_manifest.entries.find((candidate) => candidate.source_role === role)!;
  if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("expected snapshot fixture");
  return entry.material.value;
}

function twoBindingFixture(): Task4Fixture {
  const first = task4Fixture();
  const firstCheckpoint = first.profileInput.checkpoint_sets[0];
  const firstRequired = first.profileInput.feature_material_sources.find((material) => material.material_kind === "required_fact")!;
  const firstAction = first.profileInput.feature_material_sources.find((material) => material.material_kind === "context_action")!;
  const secondRequired = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material", "material_id", "material_digest", {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: firstRequired.source_refs,
      authority_effect: "none",
      material_kind: "supporting_evidence",
      match_forms: [],
    },
  );
  const secondEntity = twoStage<FeatureMaterial, "material_id", "material_digest">(
    "feature-material", "material_id", "material_digest", {
      contract_version: "contentmd.task4-feature-material/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: firstAction.source_refs,
      authority_effect: "none",
      material_kind: "context_entity",
      match_forms: ["account"],
    },
  );
  const secondRequiredRef = materialRef(secondRequired);
  const secondEntityRef = materialRef(secondEntity);
  const firstFact = materialSnapshot(firstCheckpoint, "fact_set") as typeof first.vectorInput.checkpoint_set.feature_source_manifest.entries[number]["material"]["value"] & {
    snapshot_kind: "fact-set";
    payload: { item_refs: [DigestRef, ...DigestRef[]]; set_digest: string; state: "current" };
  };
  const secondFactItems = canonicalSet([
    ...firstFact.payload.item_refs.filter((ref) => ref.schema_id !== "contentmd.task4-feature-material"),
    secondRequiredRef,
  ]) as [DigestRef, ...DigestRef[]];
  const secondFact = rehashSnapshot({
    ...structuredClone(firstFact),
    snapshot_id: "snapshot.fact-set.task4-second",
    source_refs: secondFactItems,
    payload: {
      ...firstFact.payload,
      item_refs: secondFactItems,
      set_digest: sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs: secondFactItems }),
    },
  });
  const secondFactRef = snapshotRef(secondFact);
  const firstRule = first.profileInput.hard_rule_sources[0].candidate_rule_set;
  const { rule_set_id: _firstRuleId, rule_set_digest: _firstRuleDigest, ...firstRuleIdentity } = firstRule;
  const secondRule = twoStage<CandidateRuleSet, "rule_set_id", "rule_set_digest">(
    "candidate-rule-set", "rule_set_id", "rule_set_digest", {
      ...structuredClone(firstRuleIdentity),
      source_refs: firstRule.source_refs,
      rules: [
        { rule_id: "rule.second.forbidden", failure_class: "prohibited_claim", rule_kind: "forbidden_token_sequence", tokens: ["blocked"] },
        { rule_id: "rule.second.required", failure_class: "hard_rule", rule_kind: "required_source_ref", source_ref: secondRequiredRef },
      ],
    },
  );
  const secondRuleRef = ruleRef(secondRule);
  const secondRuleArtifact = raw("fixtures/learning-ranking/task4-rule-set-second.fixture.json", canonicalJson(secondRule));
  const secondRuleArtifactRef = {
    artifact_id: `contentmd.task4-candidate-rule-set.${secondRule.rule_set_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: secondRuleArtifact.raw_bytes_digest,
  };
  const firstPolicy = materialSnapshot(firstCheckpoint, "policy") as typeof firstFact;
  const secondPolicyItems = [secondRuleRef] as [DigestRef, ...DigestRef[]];
  const secondPolicy = rehashSnapshot({
    ...structuredClone(firstPolicy),
    snapshot_id: "snapshot.review-policy.task4-second",
    source_refs: secondPolicyItems,
    payload: {
      ...firstPolicy.payload,
      item_refs: secondPolicyItems,
      set_digest: sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs: secondPolicyItems }),
    },
  });
  const secondPolicyRef = snapshotRef(secondPolicy);
  const firstTarget = first.profileInput.scope_material_sources.find((scope) => scope.scope_role === "target")!;
  const firstCandidateScope = first.profileInput.scope_material_sources.find((scope) => scope.scope_role === "candidate_origin")!;
  const { scope_material_id: _targetId, material_digest: _targetDigest, ...targetIdentity } = firstTarget;
  const secondTarget = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material", "scope_material_id", "material_digest", {
      ...targetIdentity,
      journey_state: "review",
      risk: "high",
      source_refs: [secondFactRef],
    },
  );
  const { scope_material_id: _candidateId, material_digest: _candidateDigest, ...candidateIdentity } = firstCandidateScope;
  const secondCandidateScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material", "scope_material_id", "material_digest", {
      ...candidateIdentity,
      journey_state: "review",
      risk: "high",
      source_refs: [secondPolicyRef],
    },
  );
  const secondTargetRef = scopeRef(secondTarget);
  const secondCandidateScopeRef = scopeRef(secondCandidateScope);
  const firstContext = materialSnapshot(firstCheckpoint, "context") as typeof first.vectorInput.candidate & {
    snapshot_kind: "context";
    payload: typeof first.vectorInput.candidate.payload & { context_key: string; product_area: string; journey_state: string; channel: string; locale: string };
  };
  const secondContext = rehashSnapshot({
    ...structuredClone(firstContext),
    snapshot_id: "snapshot.context.task4-second",
    source_refs: canonicalSet([
      ...firstContext.source_refs.filter((ref) => ref.schema_id !== "contentmd.task4-scope-material" && ref.schema_id !== "contentmd.task4-feature-material"),
      secondEntityRef,
      secondTargetRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...firstContext.payload, context_key: "checkout.review", journey_state: "review" },
  });
  const secondContextRef = snapshotRef(secondContext);
  const firstTask = materialSnapshot(firstCheckpoint, "task") as typeof first.vectorInput.candidate & {
    snapshot_kind: "task";
    payload: typeof first.vectorInput.candidate.payload & { fact_set_ref: DigestRef; policy_ref: DigestRef; context_ref: DigestRef; task_key: string };
  };
  const secondTask = rehashSnapshot({
    ...structuredClone(firstTask),
    snapshot_id: "snapshot.task.task4-second",
    payload: {
      ...firstTask.payload,
      task_key: "checkout.review.primary-action",
      fact_set_ref: secondFactRef,
      policy_ref: secondPolicyRef,
      context_ref: secondContextRef,
    },
  });
  const secondTaskRef = snapshotRef(secondTask);
  const firstCandidateA = materialSnapshot(firstCheckpoint, "candidate_a") as typeof first.vectorInput.candidate;
  const secondCandidateA = rehashSnapshot({
    ...structuredClone(firstCandidateA),
    snapshot_id: "snapshot.candidate-a.task4-second",
    source_refs: canonicalSet([
      ...firstCandidateA.source_refs.filter((ref) => ref.schema_id !== "contentmd.task4-scope-material" && ref.schema_id !== "contentmd.task4-feature-material"),
      secondCandidateScopeRef,
      secondRequiredRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...firstCandidateA.payload, task_ref: secondTaskRef, context_ref: secondContextRef },
  });
  const firstCandidateB = materialSnapshot(firstCheckpoint, "candidate_b") as typeof first.vectorInput.candidate;
  const secondCandidateB = rehashSnapshot({
    ...structuredClone(firstCandidateB),
    snapshot_id: "snapshot.candidate-b.task4-second",
    source_refs: canonicalSet([
      ...firstCandidateB.source_refs.filter((ref) => ref.schema_id !== "contentmd.task4-scope-material"),
      secondCandidateScopeRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...firstCandidateB.payload, task_ref: secondTaskRef, context_ref: secondContextRef },
  });
  const firstAcceptance = materialSnapshot(firstCheckpoint, "acceptance_criteria") as typeof first.vectorInput.acceptance_criteria_sources[0];
  const secondOrdered = [secondPolicyRef] as [DigestRef, ...DigestRef[]];
  const secondConstraint = { constraint_kind: "grapheme_count" as const, minimum: 3, maximum: 100 };
  const secondAcceptancePayload = {
    ...structuredClone(firstAcceptance.payload),
    ordered_feature_refs: secondOrdered,
    constraint: secondConstraint,
    set_digest: sha256Canonical({
      contract_version: "contentmd.expression-free-feature-set/0.1.0",
      feature_role: "acceptance_criteria",
      project_id: PROJECT_ID,
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      permission_snapshot_ref: firstAcceptance.payload.permission_snapshot_ref,
      eligibility_checks_snapshot_ref: firstAcceptance.payload.eligibility_checks_snapshot_ref,
      ordered_feature_refs: secondOrdered,
      constraint: secondConstraint,
      state: "current",
      content_form: "expression_free_ref_and_numeric_metadata",
    }),
  };
  const secondAcceptance = rehashSnapshot({
    ...structuredClone(firstAcceptance),
    snapshot_id: "snapshot.acceptance-criteria.task4-second",
    source_refs: canonicalSet([
      secondAcceptancePayload.permission_snapshot_ref,
      secondAcceptancePayload.eligibility_checks_snapshot_ref,
      secondPolicyRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: secondAcceptancePayload,
  });
  const secondCheckpoint = checkpointFor([
    ["task", secondTask], ["context", secondContext], ["fact_set", secondFact], ["policy", secondPolicy],
    ["candidate_a", secondCandidateA], ["candidate_b", secondCandidateB], ["acceptance_criteria", secondAcceptance],
  ]);
  const secondCheckpointRef = task3CheckpointSetRef(secondCheckpoint);
  const secondAcceptanceRef = snapshotRef(secondAcceptance);
  const firstBinding = first.profileInput.feature_universe.context_bindings[0];
  const secondBinding = {
    context_ref: secondContextRef,
    project_id: PROJECT_ID,
    checkpoint_set_ref: secondCheckpointRef,
    target_scope_ref: secondTargetRef,
    target_scope_role: "target" as const,
    runtime_profile_ref: firstBinding.runtime_profile_ref,
    unicode_runtime_digest: firstBinding.unicode_runtime_digest,
    permitted_candidate_scope_refs: [secondCandidateScopeRef] as [DigestRef, ...DigestRef[]],
    feature_material_refs: sortByRef([secondRequired, secondEntity], materialRef).map(materialRef),
    acceptance_criteria_refs: [secondAcceptanceRef] as [DigestRef, ...DigestRef[]],
    candidate_rule_set_refs: [secondRuleRef] as [DigestRef, ...DigestRef[]],
    candidate_rule_set_artifact_refs: [secondRuleArtifactRef] as [typeof secondRuleArtifactRef, ...typeof secondRuleArtifactRef[]],
  };
  const context_bindings = sortByRef([firstBinding, secondBinding], (binding) => binding.context_ref) as FeatureUniverseManifest["context_bindings"];
  const checkpoint_set_refs = sortByRef([firstBinding.checkpoint_set_ref, secondCheckpointRef], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const target_scope_refs = sortByRef([firstBinding.target_scope_ref, secondTargetRef], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const permitted_candidate_scope_refs = sortByRef([firstBinding.permitted_candidate_scope_refs[0], secondCandidateScopeRef], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const feature_material_refs = sortByRef([...firstBinding.feature_material_refs, ...secondBinding.feature_material_refs], (ref) => ref);
  const acceptance_criteria_refs = sortByRef([firstBinding.acceptance_criteria_refs[0], secondAcceptanceRef], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const hard_rule_set_refs = sortByRef([firstBinding.candidate_rule_set_refs[0], secondRuleRef], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const hard_rule_set_artifact_refs = sortByRef([firstBinding.candidate_rule_set_artifact_refs[0], secondRuleArtifactRef], (ref) => ref) as [typeof secondRuleArtifactRef, ...typeof secondRuleArtifactRef[]];
  const { manifest_id: _manifestId, manifest_digest: _manifestDigest, ...firstUniverseIdentity } = first.profileInput.feature_universe;
  const universeIdentity = {
    ...firstUniverseIdentity,
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
  const feature_universe: FeatureUniverseManifest = { ...universeWithoutDigest, manifest_digest: sha256Canonical(universeWithoutDigest) };
  const universeRaw = raw("fixtures/learning-ranking/task4-feature-universe-two.fixture.json", canonicalJson(feature_universe));
  const universeArtifactRef = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: universeRaw.raw_bytes_digest,
  };
  const artifact_bindings = [
    ...first.profileInput.artifact_bindings.filter((binding) => binding.role !== "feature_universe"),
    { role: "feature_universe" as const, artifact_ref: universeArtifactRef },
    { role: "hard_rule_set" as const, artifact_ref: secondRuleArtifactRef },
  ].sort((left, right) => left.role.localeCompare(right.role, "en") || compareCanonical(left.artifact_ref, right.artifact_ref));
  const profileInput: CreateFeatureProfileInput = {
    ...first.profileInput,
    producer: producer("feature-profile"),
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_sets: sortByRef([firstCheckpoint, secondCheckpoint], task3CheckpointSetRef) as [FeatureSourceCheckpointSet, ...FeatureSourceCheckpointSet[]],
    scope_material_sources: sortByRef([
      ...first.profileInput.scope_material_sources,
      secondTarget,
      secondCandidateScope,
    ], scopeRef) as [ScopeMaterial, ...ScopeMaterial[]],
    feature_material_sources: sortByRef([
      ...first.profileInput.feature_material_sources,
      secondRequired,
      secondEntity,
    ], materialRef),
    hard_rule_sources: sortByRef([
      ...first.profileInput.hard_rule_sources,
      { candidate_rule_set: secondRule, candidate_rule_set_artifact: secondRuleArtifact },
    ], (source) => ruleRef(source.candidate_rule_set)) as CreateFeatureProfileInput["hard_rule_sources"],
    artifact_bindings: artifact_bindings as [FeatureArtifactBinding, ...FeatureArtifactBinding[]],
  };
  const profile = createFeatureProfile(profileInput);
  const vectorInput: CandidateVectorizationInput = {
    ...first.vectorInput,
    producer: producer("candidate-feature-vector"),
    profile_input: profileInput,
    profile,
    feature_universe,
    feature_universe_artifact: universeRaw,
    scope_material_sources: profileInput.scope_material_sources,
  };
  return { profileInput, vectorInput };
}

function conflictingLengthFixture(): Task4Fixture {
  const first = task4Fixture();
  const checkpoint = first.profileInput.checkpoint_sets[0];
  const acceptance = materialSnapshot(checkpoint, "acceptance_criteria") as typeof first.vectorInput.acceptance_criteria_sources[0];
  const conflictConstraint = { constraint_kind: "grapheme_count" as const, minimum: 81, maximum: 100 };
  const conflictPayload = {
    ...structuredClone(acceptance.payload),
    constraint: conflictConstraint,
    set_digest: sha256Canonical({
      contract_version: "contentmd.expression-free-feature-set/0.1.0",
      feature_role: acceptance.payload.feature_role,
      project_id: acceptance.payload.project_id,
      source_class: acceptance.payload.source_class,
      rights_state: acceptance.payload.rights_state,
      permission_snapshot_ref: acceptance.payload.permission_snapshot_ref,
      eligibility_checks_snapshot_ref: acceptance.payload.eligibility_checks_snapshot_ref,
      ordered_feature_refs: acceptance.payload.ordered_feature_refs,
      constraint: conflictConstraint,
      state: acceptance.payload.state,
      content_form: acceptance.payload.content_form,
    }),
  };
  const conflictingAcceptance = rehashSnapshot({
    ...structuredClone(acceptance),
    snapshot_id: "snapshot.acceptance-criteria.task4-conflict",
    payload: conflictPayload,
  });
  const roleOrder: FeatureSourceManifestEntry["source_role"][] = [
    "task", "context", "fact_set", "policy", "candidate_a", "candidate_b",
  ];
  const rebuiltCheckpoint = checkpointFor([
    ...roleOrder.map((role) => [role, materialSnapshot(checkpoint, role)] as [FeatureSourceManifestEntry["source_role"], FeatureSourceManifestEntry["material"]["value"]]),
    ["acceptance_criteria", acceptance],
    ["acceptance_criteria", conflictingAcceptance],
  ]);
  const rebuiltCheckpointRef = task3CheckpointSetRef(rebuiltCheckpoint);
  const acceptanceRefs = sortByRef([acceptance, conflictingAcceptance], snapshotRef).map(snapshotRef) as [DigestRef, ...DigestRef[]];
  const firstUniverse = first.profileInput.feature_universe;
  const binding = {
    ...firstUniverse.context_bindings[0],
    checkpoint_set_ref: rebuiltCheckpointRef,
    acceptance_criteria_refs: acceptanceRefs,
  };
  const { manifest_id: _manifestId, manifest_digest: _manifestDigest, ...universeBase } = firstUniverse;
  const universeIdentity = {
    ...universeBase,
    context_bindings: [binding] as [typeof binding, ...typeof binding[]],
    checkpoint_set_refs: [rebuiltCheckpointRef] as [DigestRef, ...DigestRef[]],
    acceptance_criteria_refs: acceptanceRefs,
  };
  const manifest_id = `feature-universe-manifest.${sha256Canonical(universeIdentity)}`;
  const universeWithoutDigest = { ...universeIdentity, manifest_id };
  const feature_universe: FeatureUniverseManifest = { ...universeWithoutDigest, manifest_digest: sha256Canonical(universeWithoutDigest) };
  const universeRaw = raw("fixtures/learning-ranking/task4-feature-universe-conflict.fixture.json", canonicalJson(feature_universe));
  const universeArtifactRef = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: universeRaw.raw_bytes_digest,
  };
  const artifact_bindings = [
    ...first.profileInput.artifact_bindings.filter((artifactBinding) => artifactBinding.role !== "feature_universe"),
    { role: "feature_universe" as const, artifact_ref: universeArtifactRef },
  ].sort((left, right) => left.role.localeCompare(right.role, "en") || compareCanonical(left.artifact_ref, right.artifact_ref));
  const profileInput: CreateFeatureProfileInput = {
    ...first.profileInput,
    producer: producer("feature-profile"),
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_sets: [rebuiltCheckpoint],
    artifact_bindings: artifact_bindings as [FeatureArtifactBinding, ...FeatureArtifactBinding[]],
  };
  const profile = createFeatureProfile(profileInput);
  return {
    profileInput,
    vectorInput: {
      ...first.vectorInput,
      producer: producer("candidate-feature-vector"),
      profile_input: profileInput,
      profile,
      feature_universe,
      feature_universe_artifact: universeRaw,
      checkpoint_set: rebuiltCheckpoint,
      acceptance_criteria_sources: sortByRef([acceptance, conflictingAcceptance], snapshotRef) as CandidateVectorizationInput["acceptance_criteria_sources"],
    },
  };
}

function gateFor(
  candidateRef: DigestRef,
  ruleSet: CandidateRuleSet,
  artifactRefValue: { artifact_id: string; artifact_version: string; artifact_digest: string },
  runtime: Task4UnicodeRuntime,
  findings: CandidateEligibilityGate["findings"],
): CandidateEligibilityGate {
  const identity = {
    contract_version: "contentmd.task4-candidate-eligibility-gate/0.1.0" as const,
    candidate_ref: candidateRef,
    rule_set_ref: ruleRef(ruleSet),
    rule_set_artifact_ref: artifactRefValue,
    unicode_runtime_digest: runtime.runtime_digest,
    findings,
    hard_rule_status: findings.some((finding) => finding.failure_class === "hard_rule") ? "fail" as const : "pass" as const,
    prohibited_claim_status: findings.some((finding) => finding.failure_class === "prohibited_claim") ? "hit" as const : "clear" as const,
    authority_effect: "none" as const,
  };
  const gate_id = `candidate-eligibility-gate.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, gate_id };
  return { ...withoutDigest, gate_digest: sha256Canonical(withoutDigest) };
}

function rehashGate(gate: CandidateEligibilityGate): CandidateEligibilityGate {
  const { gate_id: _id, gate_digest: _digest, ...identity } = gate;
  const gate_id = `candidate-eligibility-gate.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, gate_id };
  return { ...withoutDigest, gate_digest: sha256Canonical(withoutDigest) };
}

function makeFirstRuleTokenUnnormalized(
  source: CreateFeatureProfileInput["hard_rule_sources"][number],
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

function multiRuleFixture(secondFails = false): Task4Fixture {
  const first = task4Fixture();
  const checkpoint = first.profileInput.checkpoint_sets[0];
  const firstRuleSource = first.profileInput.hard_rule_sources[0];
  const secondRule = twoStage<CandidateRuleSet, "rule_set_id", "rule_set_digest">(
    "candidate-rule-set", "rule_set_id", "rule_set_digest", {
      contract_version: "contentmd.task4-candidate-rule-set/0.1.0",
      project_id: PROJECT_ID,
      locale: "en",
      source_class: "project_owned_synthetic",
      rights_state: "training_permitted",
      source_refs: firstRuleSource.candidate_rule_set.source_refs,
      rules: [{
        rule_id: "rule.second.length",
        failure_class: "hard_rule",
        rule_kind: "grapheme_count",
        minimum: secondFails ? 100 : 1,
        maximum: null,
      }],
      rule_set_state: "current",
      authority_effect: "none",
    },
  );
  const secondRuleArtifact = raw("fixtures/learning-ranking/task4-rule-set-multi.fixture.json", canonicalJson(secondRule));
  const secondRuleArtifactRef = {
    artifact_id: `contentmd.task4-candidate-rule-set.${secondRule.rule_set_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: secondRuleArtifact.raw_bytes_digest,
  };
  const firstPolicy = materialSnapshot(checkpoint, "policy") as EvidenceSnapshot<"review-policy", StableSetPayload>;
  const policyItems = sortByRef([ruleRef(firstRuleSource.candidate_rule_set), ruleRef(secondRule)], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const policy = rehashSnapshot({
    ...structuredClone(firstPolicy),
    source_refs: policyItems,
    payload: {
      ...firstPolicy.payload,
      item_refs: policyItems,
      set_digest: sha256Canonical({ contract_version: "contentmd.task2-stable-set/0.1.0", item_refs: policyItems }),
    },
  });
  const policyRef = snapshotRef(policy);
  const oldCandidateScope = first.profileInput.scope_material_sources.find((scope) => scope.scope_role === "candidate_origin")!;
  const { scope_material_id: _scopeId, material_digest: _scopeDigest, ...scopeIdentity } = oldCandidateScope;
  const candidateScope = twoStage<ScopeMaterial, "scope_material_id", "material_digest">(
    "scope-material", "scope_material_id", "material_digest", { ...scopeIdentity, source_refs: [policyRef] },
  );
  const oldCandidateScopeRef = scopeRef(oldCandidateScope);
  const candidateScopeRef = scopeRef(candidateScope);
  const taskSnapshot = materialSnapshot(checkpoint, "task") as any;
  const task = rehashSnapshot({ ...structuredClone(taskSnapshot), payload: { ...taskSnapshot.payload, policy_ref: policyRef } });
  const taskRefValue = snapshotRef(task);
  const candidateASnapshot = materialSnapshot(checkpoint, "candidate_a") as typeof first.vectorInput.candidate;
  const candidateA = rehashSnapshot({
    ...structuredClone(candidateASnapshot),
    source_refs: canonicalSet([
      ...candidateASnapshot.source_refs.filter((ref) => canonicalJson(ref) !== canonicalJson(oldCandidateScopeRef)),
      candidateScopeRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...candidateASnapshot.payload, task_ref: taskRefValue },
  });
  const candidateBSnapshot = materialSnapshot(checkpoint, "candidate_b") as typeof first.vectorInput.candidate;
  const candidateB = rehashSnapshot({
    ...structuredClone(candidateBSnapshot),
    source_refs: canonicalSet([
      ...candidateBSnapshot.source_refs.filter((ref) => canonicalJson(ref) !== canonicalJson(oldCandidateScopeRef)),
      candidateScopeRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: { ...candidateBSnapshot.payload, task_ref: taskRefValue },
  });
  const acceptanceSnapshot = materialSnapshot(checkpoint, "acceptance_criteria") as typeof first.vectorInput.acceptance_criteria_sources[0];
  const acceptancePayload = {
    ...structuredClone(acceptanceSnapshot.payload),
    ordered_feature_refs: [policyRef] as [DigestRef, ...DigestRef[]],
    set_digest: sha256Canonical({
      contract_version: "contentmd.expression-free-feature-set/0.1.0",
      feature_role: acceptanceSnapshot.payload.feature_role,
      project_id: acceptanceSnapshot.payload.project_id,
      source_class: acceptanceSnapshot.payload.source_class,
      rights_state: acceptanceSnapshot.payload.rights_state,
      permission_snapshot_ref: acceptanceSnapshot.payload.permission_snapshot_ref,
      eligibility_checks_snapshot_ref: acceptanceSnapshot.payload.eligibility_checks_snapshot_ref,
      ordered_feature_refs: [policyRef],
      constraint: acceptanceSnapshot.payload.constraint,
      state: acceptanceSnapshot.payload.state,
      content_form: acceptanceSnapshot.payload.content_form,
    }),
  };
  const acceptance = rehashSnapshot({
    ...structuredClone(acceptanceSnapshot),
    source_refs: canonicalSet([
      acceptancePayload.permission_snapshot_ref,
      acceptancePayload.eligibility_checks_snapshot_ref,
      policyRef,
    ]) as [DigestRef, ...DigestRef[]],
    payload: acceptancePayload,
  });
  const rebuiltCheckpoint = checkpointFor([
    ["task", task],
    ["context", materialSnapshot(checkpoint, "context")],
    ["fact_set", materialSnapshot(checkpoint, "fact_set")],
    ["policy", policy],
    ["candidate_a", candidateA],
    ["candidate_b", candidateB],
    ["acceptance_criteria", acceptance],
  ]);
  const checkpointRef = task3CheckpointSetRef(rebuiltCheckpoint);
  const acceptanceRef = snapshotRef(acceptance);
  const ruleRefs = sortByRef([ruleRef(firstRuleSource.candidate_rule_set), ruleRef(secondRule)], (ref) => ref) as [DigestRef, ...DigestRef[]];
  const ruleArtifacts = sortByRef([
    first.profileInput.feature_universe.hard_rule_set_artifact_refs[0],
    secondRuleArtifactRef,
  ], (ref) => ref) as [typeof secondRuleArtifactRef, ...typeof secondRuleArtifactRef[]];
  const oldUniverse = first.profileInput.feature_universe;
  const binding = {
    ...oldUniverse.context_bindings[0],
    checkpoint_set_ref: checkpointRef,
    permitted_candidate_scope_refs: [candidateScopeRef] as [DigestRef, ...DigestRef[]],
    acceptance_criteria_refs: [acceptanceRef] as [DigestRef, ...DigestRef[]],
    candidate_rule_set_refs: ruleRefs,
    candidate_rule_set_artifact_refs: ruleArtifacts,
  };
  const { manifest_id: _manifestId, manifest_digest: _manifestDigest, ...universeBase } = oldUniverse;
  const universeIdentity = {
    ...universeBase,
    context_bindings: [binding] as [typeof binding, ...typeof binding[]],
    checkpoint_set_refs: [checkpointRef] as [DigestRef, ...DigestRef[]],
    permitted_candidate_scope_refs: [candidateScopeRef] as [DigestRef, ...DigestRef[]],
    acceptance_criteria_refs: [acceptanceRef] as [DigestRef, ...DigestRef[]],
    hard_rule_set_refs: ruleRefs,
    hard_rule_set_artifact_refs: ruleArtifacts,
  };
  const manifest_id = `feature-universe-manifest.${sha256Canonical(universeIdentity)}`;
  const universeWithoutDigest = { ...universeIdentity, manifest_id };
  const feature_universe: FeatureUniverseManifest = { ...universeWithoutDigest, manifest_digest: sha256Canonical(universeWithoutDigest) };
  const universeRaw = raw("fixtures/learning-ranking/task4-feature-universe-multirule.fixture.json", canonicalJson(feature_universe));
  const universeArtifactRef = {
    artifact_id: `contentmd.task4-feature-universe-manifest.${feature_universe.manifest_digest}`,
    artifact_version: "0.1.0",
    artifact_digest: universeRaw.raw_bytes_digest,
  };
  const artifact_bindings = [
    ...first.profileInput.artifact_bindings.filter((artifactBinding) => artifactBinding.role !== "feature_universe"),
    { role: "feature_universe" as const, artifact_ref: universeArtifactRef },
    { role: "hard_rule_set" as const, artifact_ref: secondRuleArtifactRef },
  ].sort((left, right) => left.role.localeCompare(right.role, "en") || compareCanonical(left.artifact_ref, right.artifact_ref));
  const profileInput: CreateFeatureProfileInput = {
    ...first.profileInput,
    producer: producer("feature-profile"),
    feature_universe,
    feature_universe_artifact: universeRaw,
    checkpoint_sets: [rebuiltCheckpoint],
    scope_material_sources: sortByRef([
      ...first.profileInput.scope_material_sources.filter((scope) => scope.scope_role !== "candidate_origin"),
      candidateScope,
    ], scopeRef) as [ScopeMaterial, ...ScopeMaterial[]],
    hard_rule_sources: sortByRef([
      firstRuleSource,
      { candidate_rule_set: secondRule, candidate_rule_set_artifact: secondRuleArtifact },
    ], (source) => ruleRef(source.candidate_rule_set)) as CreateFeatureProfileInput["hard_rule_sources"],
    artifact_bindings: artifact_bindings as [FeatureArtifactBinding, ...FeatureArtifactBinding[]],
  };
  const profile = createFeatureProfile(profileInput);
  const candidateRefValue = snapshotRef(candidateA);
  const firstRuleArtifactRef = first.profileInput.feature_universe.hard_rule_set_artifact_refs[0];
  const firstGate = gateFor(candidateRefValue, firstRuleSource.candidate_rule_set, firstRuleArtifactRef, first.vectorInput.unicode_runtime, []);
  const secondFindings = secondFails ? [{ rule_id: "rule.second.length", failure_class: "hard_rule" as const }] : [];
  const secondGate = gateFor(candidateRefValue, secondRule, secondRuleArtifactRef, first.vectorInput.unicode_runtime, secondFindings);
  const evaluations = sortByRef([
    { candidate_rule_set: firstRuleSource.candidate_rule_set, candidate_rule_set_artifact: firstRuleSource.candidate_rule_set_artifact, eligibility_gate: firstGate },
    { candidate_rule_set: secondRule, candidate_rule_set_artifact: secondRuleArtifact, eligibility_gate: secondGate },
  ], (evaluation) => ruleRef(evaluation.candidate_rule_set)) as CandidateVectorizationInput["rule_evaluations"];
  return {
    profileInput,
    vectorInput: {
      ...first.vectorInput,
      producer: producer("candidate-feature-vector"),
      profile_input: profileInput,
      profile,
      feature_universe,
      feature_universe_artifact: universeRaw,
      checkpoint_set: rebuiltCheckpoint,
      scope_material_sources: profileInput.scope_material_sources,
      candidate_scope: candidateScope,
      candidate: candidateA,
      acceptance_criteria_sources: [acceptance],
      rule_evaluations: evaluations,
    },
  };
}

function officialProfileInput(): CreateFeatureProfileInput {
  return {
    record_mode: "official",
    project_id: "project.task4.fixture",
    producer: {} as never,
    unicode_runtime: {} as never,
    feature_universe: {} as never,
    feature_universe_artifact: {} as never,
    checkpoint_sets: [{}] as never,
    scope_material_sources: [{}] as never,
    feature_material_sources: [],
    hard_rule_sources: [{}] as never,
    generic_lexicon: {} as never,
    artifact_bindings: [{}] as never,
    runtime_profile_ref: {} as never,
  };
}

function officialVectorInput(): CandidateVectorizationInput {
  return {
    record_mode: "official",
    producer: {} as never,
    unicode_runtime: {} as never,
    profile_input: {} as never,
    profile: {} as never,
    feature_universe: {} as never,
    feature_universe_artifact: {} as never,
    checkpoint_set: {} as never,
    scope_material_sources: [{}] as never,
    target_scope: {} as never,
    candidate_scope: {} as never,
    candidate: {} as never,
    materials: [],
    generic_lexicon: {} as never,
    acceptance_criteria_sources: [{}] as never,
    rule_evaluations: [{}] as never,
    blocking_evidence: [],
  };
}

describe("Task 4 feature profile and vector boundary", () => {
  it.each(PROFILE_FAULT_PAIRS)(
    "exhausts profile %s before %s",
    (earlier, later) => {
      const { profileInput } = matrixFixture();
      earlier.mutate(profileInput);
      later.mutate(profileInput);
      expect(() => createFeatureProfile(profileInput)).toThrow(`task4_contract_invalid:${earlier.suffix}`);
    },
  );

  it.each(VECTOR_FAULT_PAIRS)(
    "exhausts vector %s before %s",
    (earlier, later) => {
      const { vectorInput } = matrixFixture();
      earlier.mutate(vectorInput);
      later.mutate(vectorInput);
      expect(() => vectorizeCandidate(vectorInput)).toThrow(`task4_contract_invalid:${earlier.suffix}`);
    },
  );
  it("creates the exact frozen 21-feature profile from a complete checkpoint closure", () => {
    const { profileInput } = task4Fixture();
    const profile = createFeatureProfile(profileInput);
    expect(profile.payload.features.map(({ name, position }) => ({ name, position }))).toEqual([
      "project_match", "product_area_match", "journey_state_match", "channel_match", "locale_match", "risk_match",
      "required_fact_coverage", "required_fact_coverage_missing", "recovery_action_coverage", "recovery_action_coverage_missing",
      "approved_terminology_ratio", "approved_terminology_ratio_missing", "contextual_entity_coverage", "contextual_entity_coverage_missing",
      "contextual_action_coverage", "contextual_action_coverage_missing", "supporting_evidence_coverage",
      "supporting_evidence_coverage_missing", "generic_language_density", "length_distance", "length_distance_missing",
    ].map((name, position) => ({ name, position })));
    expect(profile.payload.forbidden_input_fields).toEqual([
      "actor_identity", "author_identity", "protected_class", "inferred_emotion", "inferred_vulnerability",
      "presentation_side", "presentation_order", "provider_alternative_order", "decision", "post_decision_outcome",
      "browser_expression", "competitor_expression", "third_party_expression",
    ]);
    expect(profile.scope).toEqual({
      memory_scope: "project",
      project_id: PROJECT_ID,
      resource_refs: [profileInput.feature_universe.manifest_id],
      data_classes: ["learning_feature_profile"],
    });
  });

  it("replays gates and derives exact scope, coverage, generic, and length values", () => {
    const { vectorInput } = task4Fixture();
    const first = vectorizeCandidate(vectorInput);
    const second = vectorizeCandidate(structuredClone(vectorInput));
    expect(second).toEqual(first);
    expect(first.status).toBe("eligible");
    if (first.status !== "eligible") throw new Error("expected eligible fixture");
    expect(first.vector.values).toEqual([
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
    expect(first.vector.token_count).toBe(9);
    expect(first.vector.grapheme_count).toBeGreaterThanOrEqual(5);
    expect(first.vector.grapheme_constraint_refs).toEqual([
      snapshotRef(vectorInput.acceptance_criteria_sources[0]),
    ]);
    expect(first.vector.satisfied_material_refs).toHaveLength(2);
  });

  it("rejects a self-authored vector input that omits checkpoint-derived material", () => {
    const { vectorInput } = task4Fixture();
    vectorInput.materials = [];
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:checkpoint_binding");
  });

  it("requires the supplied candidate snapshot to equal its checkpoint member byte for byte", () => {
    const { vectorInput } = task4Fixture();
    const candidate = structuredClone(vectorInput.candidate);
    candidate.payload.expression = "A valid but unrecorded candidate.";
    candidate.payload.expression_digest = digestUtf8(candidate.payload.expression);
    vectorInput.candidate = rehashSnapshot(candidate);
    const gate = vectorInput.rule_evaluations[0].eligibility_gate;
    const gateIdentity = {
      contract_version: gate.contract_version,
      candidate_ref: snapshotRef(vectorInput.candidate),
      rule_set_ref: gate.rule_set_ref,
      rule_set_artifact_ref: gate.rule_set_artifact_ref,
      unicode_runtime_digest: gate.unicode_runtime_digest,
      findings: gate.findings,
      hard_rule_status: gate.hard_rule_status,
      prohibited_claim_status: gate.prohibited_claim_status,
      authority_effect: gate.authority_effect,
    };
    const gate_id = `candidate-eligibility-gate.${sha256Canonical(gateIdentity)}`;
    vectorInput.rule_evaluations[0].eligibility_gate = {
      ...gateIdentity,
      gate_id,
      gate_digest: sha256Canonical({ ...gateIdentity, gate_id }),
    };
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:checkpoint_binding");
  });

  it("selects checkpoint nested-domain canonical_value before an unrelated stale digest", () => {
    const { profileInput } = task4Fixture();
    profileInput.checkpoint_sets[0]!.feature_source_manifest.entries[0]!.source_role = "invalid_role" as never;
    profileInput.feature_universe.manifest_digest = "0".repeat(64);
    expect(() => createFeatureProfile(profileInput)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("defers nonfinite digest preimages until numeric_nonfinite while preserving producer precedence", () => {
    const numeric = structuredClone(task4Fixture().vectorInput);
    numeric.profile.payload.features[0]!.position = Number.NaN;
    expect(() => vectorizeCandidate(numeric)).toThrow("task4_contract_invalid:numeric_nonfinite");

    const producerFirst = structuredClone(task4Fixture().vectorInput);
    producerFirst.profile.payload.features[0]!.position = Number.POSITIVE_INFINITY;
    producerFirst.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => vectorizeCandidate(producerFirst)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("keeps quarantine ahead of numeric_nonfinite across the complete vector graph", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.profile.payload.features[0]!.position = Number.NaN;
    input.blocking_evidence = [{
      candidate_ref: snapshotRef(input.candidate),
      evidence_ref: auxiliaryRef("fixture.blocking", "contentmd.fixture-record", sha256Canonical({ blocking: true })),
      source_class: "browser_observed",
      purpose: "feature_exclusion_only",
      contains_expression: false,
      expression: "borrowed words",
    }] as never;
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:quarantined_expression_present");
  });

  it("checks the base reference fields of a quarantined evidence carrier before quarantine", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.blocking_evidence = [{
      candidate_ref: auxiliaryRef(
        "candidate.wrong-quarantine-carrier",
        "contentmd.task2-evidence-snapshot",
        sha256Canonical({ wrong: "quarantine-carrier" }),
      ),
      evidence_ref: auxiliaryRef(
        "fixture.blocking.wrong-candidate",
        "contentmd.fixture-record",
        sha256Canonical({ blocking: "wrong-candidate" }),
      ),
      source_class: "browser_observed",
      purpose: "feature_exclusion_only",
      contains_expression: false,
      expression: "borrowed words",
    }] as never;
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:reference_binding");
  });

  it("orders and deduplicates blocking evidence by its expression-free base projection", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    const shared = {
      candidate_ref: snapshotRef(input.candidate),
      evidence_ref: auxiliaryRef(
        "fixture.blocking.base-projection",
        "contentmd.fixture-record",
        sha256Canonical({ blocking: "base-projection" }),
      ),
      purpose: "feature_exclusion_only" as const,
      contains_expression: false as const,
    };
    input.blocking_evidence = [{
      ...shared,
      source_class: "browser_observed",
    }, {
      ...shared,
      source_class: "competitor",
      expression: "borrowed words",
    }] as never;
    expect(() => vectorizeCandidate(input)).toThrow(
      "task4_contract_invalid:quarantined_expression_present",
    );
  });

  it("classifies a nested forbidden key after producer but before numeric finiteness", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.profile.payload.features[0]!.position = Number.NaN;
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:forbidden_input_field");
  });

  it("keeps profile-construction forbidden input ahead of numeric_nonfinite", () => {
    const numericOnly = structuredClone(task4Fixture().profileInput);
    numericOnly.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
    expect(() => createFeatureProfile(numericOnly)).toThrow("task4_contract_invalid:numeric_nonfinite");

    const input = structuredClone(task4Fixture().profileInput);
    input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:forbidden_input_field");
  });

  it("keeps scope mismatch ahead of numeric_nonfinite during profile construction", () => {
    expect(() => task4Fixture({ ruleLocale: "fr", nonfiniteCheckpoint: true })).toThrow(
      "task4_contract_invalid:scope_mismatch",
    );
  });

  it("exhausts scope across the complete profile graph before checkpoint closure", () => {
    expect(() => task4Fixture({ targetLocale: "fr", ruleSourceFromCandidateA: true })).toThrow(
      "task4_contract_invalid:scope_mismatch",
    );
  });

  it("classifies rule-artifact canonical-byte pairing before a later numeric fault", () => {
    const input = structuredClone(task4Fixture().profileInput);
    const source = input.hard_rule_sources[0]!;
    source.candidate_rule_set_artifact.bytes_utf8 += "\n";
    source.candidate_rule_set_artifact.raw_bytes_digest = digestUtf8(
      source.candidate_rule_set_artifact.bytes_utf8,
    );
    const ruleArtifactRef = {
      artifact_id: `contentmd.task4-candidate-rule-set.${source.candidate_rule_set.rule_set_digest}`,
      artifact_version: "0.1.0",
      artifact_digest: source.candidate_rule_set_artifact.raw_bytes_digest,
    };
    input.feature_universe.context_bindings[0]!.candidate_rule_set_artifact_refs = [ruleArtifactRef];
    input.feature_universe.hard_rule_set_artifact_refs = [ruleArtifactRef];
    const { manifest_id: _manifestId, manifest_digest: _manifestDigest, ...universeBody } = input.feature_universe;
    input.feature_universe = twoStage<FeatureUniverseManifest, "manifest_id", "manifest_digest">(
      "feature-universe-manifest",
      "manifest_id",
      "manifest_digest",
      universeBody,
    );
    input.feature_universe_artifact.bytes_utf8 = canonicalJson(input.feature_universe);
    input.feature_universe_artifact.raw_bytes_digest = digestUtf8(input.feature_universe_artifact.bytes_utf8);
    const universeArtifactRef = {
      artifact_id: `contentmd.task4-feature-universe-manifest.${input.feature_universe.manifest_digest}`,
      artifact_version: "0.1.0",
      artifact_digest: input.feature_universe_artifact.raw_bytes_digest,
    };
    input.artifact_bindings = input.artifact_bindings.map((binding) => {
      if (binding.role === "hard_rule_set") return { ...binding, artifact_ref: ruleArtifactRef };
      if (binding.role === "feature_universe") return { ...binding, artifact_ref: universeArtifactRef };
      return binding;
    }).sort((left, right) => left.role.localeCompare(right.role, "en")
      || compareCanonical(left.artifact_ref, right.artifact_ref)) as CreateFeatureProfileInput["artifact_bindings"];
    input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:reference_binding");
  });

  it.each([
    ["numeric", { omitContextTargetScopeRef: true, nonfiniteCheckpoint: true }],
    ["forbidden", { omitContextTargetScopeRef: true, forbiddenProfile: true }],
  ] as const)("exhausts context target-scope governance before later %s faults", (_name, options) => {
    expect(() => task4Fixture(options)).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it.each([
    ["numeric", { ruleSourceFromCandidateA: true, nonfiniteCheckpoint: true }],
    ["forbidden", { ruleSourceFromCandidateA: true, forbiddenProfile: true }],
  ] as const)("exhausts rule-source closure before later %s faults", (_name, options) => {
    expect(() => task4Fixture(options)).toThrow("task4_contract_invalid:checkpoint_binding");
  });

  it.each([
    ["reference_binding", (input: CandidateVectorizationInput) => {
      input.target_scope = structuredClone(input.candidate_scope);
    }],
    ["checkpoint_binding", (input: CandidateVectorizationInput) => {
      input.materials = [];
    }],
    ["feature_profile_binding", (input: CandidateVectorizationInput) => {
      input.profile.payload.input_digest = "f".repeat(64);
      input.profile.record_id = `feature-profile.${sha256Canonical({
        contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
        project_id: input.profile.scope.project_id,
        input_digest: input.profile.payload.input_digest,
      })}`;
    }],
  ] as const)("keeps %s ahead of numeric_nonfinite during vectorization", (suffix, mutate) => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.profile.payload.features[0]!.position = Number.NaN;
    mutate(input);
    expect(() => vectorizeCandidate(input)).toThrow(`task4_contract_invalid:${suffix}`);
  });

  it("classifies a digest-valid forged gate replay before missing material closure", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    const evaluation = input.rule_evaluations[0]!;
    evaluation.eligibility_gate = gateFor(
      snapshotRef(input.candidate),
      evaluation.candidate_rule_set,
      evaluation.eligibility_gate.rule_set_artifact_ref,
      input.unicode_runtime,
      [{ rule_id: "rule.required", failure_class: "hard_rule" }],
    );
    input.materials = [];
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:reference_binding");
  });

  it("classifies gate candidate binding before a later nonfinite profile field", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    const evaluation = input.rule_evaluations[0]!;
    evaluation.eligibility_gate = gateFor(
      auxiliaryRef("candidate.wrong", "contentmd.task2-evidence-snapshot", sha256Canonical({ wrong: true })),
      evaluation.candidate_rule_set,
      evaluation.eligibility_gate.rule_set_artifact_ref,
      input.unicode_runtime,
      evaluation.eligibility_gate.findings,
    );
    input.profile.payload.features[0]!.position = Number.NaN;
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:reference_binding");
  });

  it.each([
    ["contract", (gate: CandidateEligibilityGate) => {
      gate.contract_version = "contentmd.task4-candidate-eligibility-gate/wrong" as never;
    }],
    ["hard status", (gate: CandidateEligibilityGate) => {
      gate.hard_rule_status = "unknown" as never;
    }],
    ["claim status", (gate: CandidateEligibilityGate) => {
      gate.prohibited_claim_status = "unknown" as never;
    }],
    ["authority", (gate: CandidateEligibilityGate) => {
      gate.authority_effect = "writes_copy" as never;
    }],
  ] as const)("classifies a self-consistent invalid gate %s as canonical_value", (_name, mutate) => {
    const input = structuredClone(task4Fixture().vectorInput);
    const gate = input.rule_evaluations[0]!.eligibility_gate;
    mutate(gate);
    input.rule_evaluations[0]!.eligibility_gate = rehashGate(gate);
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("keeps malformed lexicon JSON ahead of an independent profile producer fault", () => {
    const input = structuredClone(task4Fixture().profileInput);
    input.generic_lexicon.bytes_utf8 = "{";
    input.generic_lexicon.raw_bytes_digest = digestUtf8(input.generic_lexicon.bytes_utf8);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies an invalid artifact-binding role before an independent producer fault", () => {
    const input = structuredClone(task4Fixture().profileInput);
    input.artifact_bindings[0]!.role = "bogus" as never;
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("exhausts rule-token Unicode normalization before a separate universe digest fault", () => {
    const input = structuredClone(task4Fixture().profileInput);
    makeFirstRuleTokenUnnormalized(input.hard_rule_sources[0]!);
    input.feature_universe.manifest_digest = "0".repeat(64);
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it("exhausts vector rule-token Unicode normalization before a separate universe digest fault", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    makeFirstRuleTokenUnnormalized(input.rule_evaluations[0]!);
    input.feature_universe.manifest_digest = "0".repeat(64);
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it.each([
    ["whitespace-only", [" "]],
    ["normalization-colliding", ["clear next", "Ｃｌｅａｒ Ｎｅｘｔ"]],
  ] as const)("rejects %s feature-material match forms in the profile Unicode stage", (_name, forms) => {
    expect(() => task4Fixture({
      actionMatchForms: [...forms] as [string, ...string[]],
    })).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it("classifies duplicate blocking evidence before an independent vector producer fault", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    const evidence = {
      candidate_ref: snapshotRef(input.candidate),
      evidence_ref: auxiliaryRef(
        "fixture.blocking.duplicate",
        "contentmd.fixture-record",
        sha256Canonical({ blocking: "duplicate" }),
      ),
      source_class: "browser_observed" as const,
      purpose: "feature_exclusion_only" as const,
      contains_expression: false as const,
    };
    input.blocking_evidence = [evidence, structuredClone(evidence)];
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("keeps a quarantined expression alias ahead of forbidden-field classification", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.blocking_evidence = [{
      candidate_ref: snapshotRef(input.candidate),
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
    expect(() => vectorizeCandidate(input)).toThrow(
      "task4_contract_invalid:quarantined_expression_present",
    );
  });

  it.each([
    ["reference material with forms", (input: CreateFeatureProfileInput) => {
      input.feature_material_sources.find((material) => material.material_kind === "required_fact")!
        .match_forms = ["not allowed"] as never;
    }],
    ["text material without forms", (input: CreateFeatureProfileInput) => {
      input.feature_material_sources.find((material) => material.material_kind === "context_action")!
        .match_forms = [] as never;
    }],
  ] as const)("classifies %s before an independent profile producer fault", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    mutate(input);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies an invalid required-source rule failure class before producer verification", () => {
    const input = structuredClone(task4Fixture().profileInput);
    const rule = input.hard_rule_sources[0]!.candidate_rule_set.rules.find(
      (candidate) => candidate.rule_kind === "required_source_ref",
    )!;
    rule.failure_class = "unknown" as never;
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("uses Unicode scalar order for rule identifiers before producer verification", () => {
    const input = structuredClone(task4Fixture().profileInput);
    const rules = input.hard_rule_sources[0]!.candidate_rule_set.rules;
    rules[0]!.rule_id = "rule.\uE000";
    rules[1]!.rule_id = "rule.\u{10000}";
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("validates non-token rule and finding identifiers before stale digests", () => {
    const profileInput = structuredClone(task4Fixture().profileInput);
    profileInput.hard_rule_sources[0]!.candidate_rule_set.rules[1]!.rule_id = "rule.\ud800";
    expect(() => createFeatureProfile(profileInput)).toThrow("task4_contract_invalid:unicode_runtime");

    const vectorInput = structuredClone(task4Fixture().vectorInput);
    vectorInput.rule_evaluations[0]!.eligibility_gate.findings = [{
      rule_id: "rule.\ud800",
      failure_class: "hard_rule",
    }];
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it.each([
    ["negative minimum", (constraint: { minimum: number | null; maximum: number | null }) => { constraint.minimum = -1; }],
    ["unsafe maximum", (constraint: { minimum: number | null; maximum: number | null }) => { constraint.maximum = Number.MAX_SAFE_INTEGER + 1; }],
    ["no bound", (constraint: { minimum: number | null; maximum: number | null }) => { constraint.minimum = null; constraint.maximum = null; }],
    ["inverted bounds", (constraint: { minimum: number | null; maximum: number | null }) => { constraint.minimum = 81; constraint.maximum = 80; }],
  ] as const)("classifies acceptance-criteria %s before a producer fault", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    const entry = input.checkpoint_sets[0]!.feature_source_manifest.entries.find((candidate) =>
      candidate.material.material_kind === "task2_evidence_snapshot"
      && candidate.material.value.snapshot_kind === "acceptance-criteria")!;
    if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("missing acceptance criteria");
    mutate((entry.material.value.payload as { constraint: { minimum: number | null; maximum: number | null } }).constraint);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["duplicate checkpoints", (input: CreateFeatureProfileInput) => {
      input.checkpoint_sets.push(structuredClone(input.checkpoint_sets[0]!));
    }],
    ["reversed scopes", (input: CreateFeatureProfileInput) => { input.scope_material_sources.reverse(); }],
    ["reversed materials", (input: CreateFeatureProfileInput) => { input.feature_material_sources.reverse(); }],
    ["reversed artifact bindings", (input: CreateFeatureProfileInput) => { input.artifact_bindings.reverse(); }],
  ] as const)("classifies profile %s before a producer fault", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    mutate(input);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["reversed scopes", (input: CandidateVectorizationInput) => { input.scope_material_sources.reverse(); }],
    ["reversed materials", (input: CandidateVectorizationInput) => { input.materials.reverse(); }],
    ["duplicate acceptance criteria", (input: CandidateVectorizationInput) => {
      input.acceptance_criteria_sources.push(structuredClone(input.acceptance_criteria_sources[0]!));
    }],
    ["duplicate rule evaluations", (input: CandidateVectorizationInput) => {
      input.rule_evaluations.push(structuredClone(input.rule_evaluations[0]!));
    }],
  ] as const)("classifies vector %s before a producer fault", (_name, mutate) => {
    const input = structuredClone(task4Fixture().vectorInput);
    mutate(input);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["checkpoint_set_id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.checkpoint_set_id = 7 as never;
    }],
    ["checkpoint_set_digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.checkpoint_set_digest = 7 as never;
    }],
    ["instance nonce digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.store_binding.instance_nonce_digest = 7 as never;
    }],
    ["manifest digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.feature_source_manifest.manifest_digest = 7 as never;
    }],
    ["entry event digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.feature_source_manifest.entries[0]!.event.event_digest = 7 as never;
    }],
    ["event predecessor digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams.find((stream) => stream.complete_prefix.length > 0)!.complete_prefix[0]!.predecessor_digest = 7 as never;
    }],
    ["receipt prefix digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.receipt.prefix_digest = 7 as never;
    }],
    ["context locale", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
        candidate.material.material_kind === "task2_evidence_snapshot"
        && candidate.material.value.snapshot_kind === "context")!;
      if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("missing context");
      (entry.material.value.payload as { locale: unknown }).locale = 7;
    }],
  ] as const)("classifies checkpoint primitive %s before a producer fault", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    mutate(input.checkpoint_sets[0]!);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["binding digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.store_binding.binding_digest = 7 as never;
    }],
    ["entry source schema version", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.feature_source_manifest.entries[0]!.source_ref.schema_version = 7 as never;
    }],
    ["entry material source record id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.feature_source_manifest.entries[0]!.material.source_ref.record_id = 7 as never;
    }],
    ["stream id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.stream_id = 7 as never;
    }],
    ["stream head event id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.head_event_id = 7 as never;
    }],
    ["empty stream head event id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.head_event_id = "";
    }],
    ["receipt maximum sequence", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.receipt.maximum_sequence = "one" as never;
    }],
    ["receipt digest", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.receipt.receipt_digest = 7 as never;
    }],
    ["empty receipt head event id", (checkpoint: CreateFeatureProfileInput["checkpoint_sets"][number]) => {
      checkpoint.streams[0]!.receipt.head_event_id = "";
    }],
  ] as const)("classifies complete checkpoint primitive %s before producer work", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    mutate(input.checkpoint_sets[0]!);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies duplicate nested snapshot source refs before producer work", () => {
    const input = structuredClone(task4Fixture().profileInput);
    const entry = input.checkpoint_sets[0]!.feature_source_manifest.entries.find((candidate) =>
      candidate.material.material_kind === "task2_evidence_snapshot"
      && candidate.material.value.snapshot_kind === "context")!;
    if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("missing context");
    entry.material.value.source_refs.push(structuredClone(entry.material.value.source_refs[0]!));
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("defers nonfinite build-receipt record versions across profile and vector producers", () => {
    const profileInput = structuredClone(task4Fixture().profileInput);
    profileInput.producer = buildVerifiedProducer("feature-profile");
    if (profileInput.producer.verification_receipt === null) throw new Error("missing receipt");
    profileInput.producer.verification_receipt.record_version = Number.NaN;
    expect(() => createFeatureProfile(profileInput)).toThrow("task4_contract_invalid:numeric_nonfinite");

    const vectorInput = structuredClone(task4Fixture().vectorInput);
    vectorInput.producer = buildVerifiedProducer("candidate-feature-vector");
    if (vectorInput.producer.verification_receipt === null) throw new Error("missing receipt");
    vectorInput.producer.verification_receipt.record_version = Number.NaN;
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:numeric_nonfinite");
  });

  it("defers nonfinite nested snapshot-receipt versions across profile and vector graphs", () => {
    const profileInput = structuredClone(task4Fixture().profileInput);
    attachNonfiniteSnapshotReceipt(profileInput.checkpoint_sets[0]!);
    expect(() => createFeatureProfile(profileInput)).toThrow("task4_contract_invalid:numeric_nonfinite");

    const vectorInput = structuredClone(task4Fixture().vectorInput);
    attachNonfiniteSnapshotReceipt(vectorInput.checkpoint_set);
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:numeric_nonfinite");
  });

  it.each(["candidate", "acceptance-criteria"] as const)(
    "defers nonfinite direct %s snapshot receipts across aligned checkpoint copies",
    (kind) => {
      const input = structuredClone(task4Fixture().vectorInput);
      const direct = kind === "candidate"
        ? input.candidate
        : input.acceptance_criteria_sources[0]!;
      attachNonfiniteReceiptToMatchingSnapshots(input, direct);
      expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:numeric_nonfinite");
    },
  );

  it("classifies required-source prohibited-claim rules before their stale digest", () => {
    const input = structuredClone(task4Fixture().profileInput);
    const rule = input.hard_rule_sources[0]!.candidate_rule_set.rules.find(
      (candidate) => candidate.rule_kind === "required_source_ref",
    );
    if (rule?.rule_kind !== "required_source_ref") throw new Error("missing required-source rule");
    rule.failure_class = "prohibited_claim" as never;
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("binds checkpoint store-schema artifact refs to supplied raw bytes in profile and vector graphs", () => {
    const profileInput = structuredClone(task4Fixture().profileInput);
    profileInput.checkpoint_sets = [
      checkpointWithReboundStoreSchemaArtifact(profileInput.checkpoint_sets[0]!),
    ];
    expect(() => createFeatureProfile(profileInput)).toThrow("task4_contract_invalid:digest");

    const vectorInput = structuredClone(task4Fixture().vectorInput);
    vectorInput.checkpoint_set = checkpointWithReboundStoreSchemaArtifact(vectorInput.checkpoint_set);
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:digest");
  });

  it.each(["profile", "vector"] as const)(
    "classifies a self-consistent cross-project checkpoint as scope_mismatch in %s",
    (operation) => {
      const fixture = task4Fixture();
      if (operation === "profile") {
        const input = structuredClone(fixture.profileInput);
        input.checkpoint_sets = [crossProjectCheckpoint(input.checkpoint_sets[0]!)];
        expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:scope_mismatch");
      } else {
        const input = structuredClone(fixture.vectorInput);
        input.profile_input.checkpoint_sets = [
          crossProjectCheckpoint(input.profile_input.checkpoint_sets[0]!),
        ];
        expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:scope_mismatch");
      }
    },
  );

  it.each(["profile", "vector"] as const)(
    "exhausts a finite sibling checkpoint head fault before unrelated nonfinite sequence in %s",
    (operation) => {
      const fixture = task4Fixture();
      const checkpoint = operation === "profile"
        ? fixture.profileInput.checkpoint_sets[0]!
        : fixture.vectorInput.checkpoint_set;
      checkpoint.streams[0]!.head_event_id = "feature-source-event.wrong-head";
      checkpoint.streams[1]!.maximum_sequence = Number.NaN;
      const invoke = operation === "profile"
        ? () => createFeatureProfile(fixture.profileInput)
        : () => vectorizeCandidate(fixture.vectorInput);
      expect(invoke).toThrow("task4_contract_invalid:checkpoint_binding");
    },
  );

  it.each((["profile", "vector"] as const).flatMap((operation) =>
    (["store-digest", "entry-copy"] as const).map((fault) => [operation, fault] as const)))(
    "exhausts finite descendant checkpoint %s fault before unrelated nonfinite sibling in %s",
    (operation, fault) => {
      const fixture = task4Fixture();
      const checkpoint = operation === "profile"
        ? fixture.profileInput.checkpoint_sets[0]!
        : fixture.vectorInput.checkpoint_set;
      if (fault === "store-digest") {
        checkpoint.store_binding.instance_nonce_digest = "0".repeat(64);
        checkpoint.streams[1]!.maximum_sequence = Number.NaN;
      } else {
        checkpoint.feature_source_manifest.entries[0]!.event_digest = "0".repeat(64);
        checkpoint.feature_source_manifest.entries[1]!.sequence = Number.NaN;
      }
      const invoke = operation === "profile"
        ? () => createFeatureProfile(fixture.profileInput)
        : () => vectorizeCandidate(fixture.vectorInput);
      expect(invoke).toThrow(`task4_contract_invalid:${fault === "store-digest"
        ? "digest"
        : "checkpoint_binding"}`);
    },
  );

  it("checks the independently derivable feature-profile ID before deferred nonfinite content", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.profile.payload.features[0]!.position = Number.NaN;
    input.profile.record_id = "feature-profile.wrong-independent-id";
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:digest");
  });

  it.each(["profile", "vector"] as const)(
    "checks snapshot digest before a nonfinite resolver receipt in %s",
    (operation) => {
      const fixture = task4Fixture();
      if (operation === "profile") {
        const checkpoint = fixture.profileInput.checkpoint_sets[0]!;
        attachNonfiniteSnapshotReceipt(checkpoint);
        const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
          candidate.material.material_kind === "task2_evidence_snapshot"
          && candidate.material.value.snapshot_kind === "context")!;
        if (entry.material.material_kind !== "task2_evidence_snapshot") throw new Error("missing snapshot");
        entry.material.value.snapshot_digest = "0".repeat(64);
        expect(() => createFeatureProfile(fixture.profileInput)).toThrow("task4_contract_invalid:digest");
      } else {
        attachNonfiniteReceiptToMatchingSnapshots(fixture.vectorInput, fixture.vectorInput.candidate);
        fixture.vectorInput.candidate.snapshot_digest = "0".repeat(64);
        expect(() => vectorizeCandidate(fixture.vectorInput)).toThrow("task4_contract_invalid:digest");
      }
    },
  );

  it.each(["profile", "vector"] as const)(
    "checks finite material source copies before a nonfinite nested resolver receipt in %s",
    (operation) => {
      const fixture = task4Fixture();
      const checkpoint = operation === "profile"
        ? fixture.profileInput.checkpoint_sets[0]!
        : fixture.vectorInput.checkpoint_set;
      attachNonfiniteSnapshotReceipt(checkpoint);
      const entry = checkpoint.feature_source_manifest.entries.find((candidate) =>
        candidate.material.material_kind === "task2_evidence_snapshot"
        && candidate.material.value.snapshot_kind === "context")!;
      entry.material.source_ref = auxiliaryRef(
        "snapshot.context.wrong-material-copy",
        "contentmd.task2-evidence-snapshot",
        "0".repeat(64),
      );
      const invoke = operation === "profile"
        ? () => createFeatureProfile(fixture.profileInput)
        : () => vectorizeCandidate(fixture.vectorInput);
      expect(invoke).toThrow("task4_contract_invalid:checkpoint_binding");
    },
  );

  it.each(["profile", "vector"] as const)(
    "checks a finite feature-source manifest digest before an unrelated nonfinite stream in %s",
    (operation) => {
      const fixture = task4Fixture();
      const checkpoint = operation === "profile"
        ? fixture.profileInput.checkpoint_sets[0]!
        : fixture.vectorInput.checkpoint_set;
      checkpoint.feature_source_manifest.manifest_digest = "0".repeat(64);
      checkpoint.streams[0]!.maximum_sequence = Number.NaN;
      const invoke = operation === "profile"
        ? () => createFeatureProfile(fixture.profileInput)
        : () => vectorizeCandidate(fixture.vectorInput);
      expect(invoke).toThrow("task4_contract_invalid:digest");
    },
  );

  it.each((["profile", "vector"] as const).flatMap((operation) =>
    (["actor", "stream-id"] as const).map((fault) => [operation, fault] as const)))(
    "checks finite checkpoint %s semantics before a nonfinite sibling in %s",
    (operation, fault) => {
      const fixture = task4Fixture();
      const checkpoint = operation === "profile"
        ? fixture.profileInput.checkpoint_sets[0]!
        : fixture.vectorInput.checkpoint_set;
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
      const invoke = operation === "profile"
        ? () => createFeatureProfile(fixture.profileInput)
        : () => vectorizeCandidate(fixture.vectorInput);
      expect(invoke).toThrow(`task4_contract_invalid:${fault === "actor"
        ? "checkpoint_binding"
        : "digest"}`);
    },
  );

  it.each(["duplicate", "reordered"] as const)(
    "classifies %s feature-source manifest entries before producer verification",
    (fault) => {
      const input = structuredClone(task4Fixture().profileInput);
      const entries = input.checkpoint_sets[0]!.feature_source_manifest.entries;
      input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      if (fault === "duplicate") {
        entries.splice(1, 0, structuredClone(entries[0]!));
      } else {
        [entries[0], entries[1]] = [entries[1]!, entries[0]!];
      }
      expect(() => createFeatureProfile(input)).toThrow(
        "task4_contract_invalid:canonical_value",
      );
    },
  );

  it("classifies duplicate checkpoint refs before a nonfinite checkpoint value", () => {
    const input = structuredClone(task4Fixture().profileInput);
    input.checkpoint_sets[0]!.streams[0]!.maximum_sequence = Number.NaN;
    input.checkpoint_sets.push(structuredClone(input.checkpoint_sets[0]!));
    expect(() => createFeatureProfile(input)).toThrow(
      "task4_contract_invalid:canonical_value",
    );
  });

  it.each(["duplicate", "reordered", "missing"] as const)(
    "classifies %s feature-source streams before producer verification",
    (fault) => {
      const input = structuredClone(task4Fixture().profileInput);
      const streams = input.checkpoint_sets[0]!.streams;
      input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      if (fault === "duplicate") {
        streams.splice(1, 0, structuredClone(streams[0]!));
      } else if (fault === "reordered") {
        [streams[0], streams[1]] = [streams[1]!, streams[0]!];
      } else {
        streams.pop();
      }
      expect(() => createFeatureProfile(input)).toThrow(
        "task4_contract_invalid:canonical_value",
      );
    },
  );

  it("accepts a permitted candidate scope committed only through approved-exemplar closure", () => {
    const fixture = task4Fixture({ candidateScopeViaExemplar: true });
    expect(() => createFeatureProfile(fixture.profileInput)).not.toThrow();
    expect(vectorizeCandidate(fixture.vectorInput).status).toBe("eligible");
  });

  it("rejects a permitted candidate scope absent from candidate and approved-exemplar closure", () => {
    expect(() => task4Fixture({
      candidateScopeViaExemplar: true,
      exemplarSubjectMismatch: true,
    })).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it("checks every binding Unicode runtime digest at scope stage before forbidden fields", () => {
    const input = structuredClone(task4Fixture().profileInput);
    input.feature_universe.context_bindings[0]!.unicode_runtime_digest = "0".repeat(64);
    const { manifest_id: _id, manifest_digest: _digest, ...identity } = input.feature_universe;
    input.feature_universe.manifest_id = `feature-universe-manifest.${sha256Canonical(identity)}`;
    const { manifest_digest: _drop, ...content } = input.feature_universe;
    input.feature_universe.manifest_digest = sha256Canonical(content);
    input.feature_universe_artifact.bytes_utf8 = canonicalJson(input.feature_universe);
    input.feature_universe_artifact.raw_bytes_digest = digestUtf8(
      input.feature_universe_artifact.bytes_utf8,
    );
    const universeBinding = input.artifact_bindings.find((binding) =>
      binding.role === "feature_universe")!;
    universeBinding.artifact_ref = {
      artifact_id: `contentmd.task4-feature-universe-manifest.${input.feature_universe.manifest_digest}`,
      artifact_version: "0.1.0",
      artifact_digest: input.feature_universe_artifact.raw_bytes_digest,
    };
    input.artifact_bindings.sort((left, right) => left.role.localeCompare(right.role, "en")
      || compareCanonical(left.artifact_ref, right.artifact_ref));
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it("checks nested vector profile-binding Unicode runtime digests before forbidden fields", () => {
    const input = structuredClone(task4Fixture().vectorInput);
    input.profile_input.feature_universe.context_bindings[0]!.unicode_runtime_digest = "0".repeat(64);
    rehashUniverseWitness(input.profile_input);
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => vectorizeCandidate(input)).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it.each([
    ["invalid record id", (record: ExemplarRecord) => { record.record_id = "INVALID RECORD"; }],
    ["empty provenance", (record: ExemplarRecord) => { record.provenance = []; }],
    ["duplicate scope resource", (record: ExemplarRecord) => {
      record.scope.resource_refs.push(record.scope.resource_refs[0]!);
    }],
  ] as const)("classifies durable Exemplar %s before producer work", (_name, mutate) => {
    const input = structuredClone(task4Fixture().profileInput);
    const sourceRef = auxiliaryRef(
      "fixture.exemplar.subject",
      "contentmd.fixture-record",
      sha256Canonical({ fixture: "exemplar-subject" }),
    );
    const record = finalizeRecord({
      record_id: "exemplar.task4.fixture",
      schema_id: "contentmd.exemplar-record",
      schema_version: "0.1.0",
      record_version: 1,
      scope: {
        memory_scope: "project" as const,
        project_id: PROJECT_ID,
        resource_refs: ["resource.task4.exemplar"],
        data_classes: ["learning_exemplar"],
      },
      provenance: [{
        record_id: sourceRef.record_id,
        relationship: "subject",
        content_digest: sourceRef.content_digest,
      }],
      lifecycle_state: "active" as const,
      payload: {
        contract_version: "contentmd.learning-record-contract/0.1.0" as const,
        record_mode: "development_fixture" as const,
        ranking_objective: "expression_preference" as const,
        candidate_kind: "expression" as const,
        schema_digest: sha256Canonical({ fixture: "schema" }),
        code_digest: sha256Canonical({ fixture: "code" }),
        input_digest: sha256Canonical({ fixture: "input" }),
        authority_effect: "none" as const,
        exemplar_kind: "expression" as const,
        subject_ref: sourceRef,
        approval_ref: sourceRef,
        applicability_scope_ref: sourceRef,
        transfer_condition_refs: [sourceRef],
        prohibited_transfer: "Do not transfer outside the fixture scope.",
        rights_ref: sourceRef,
        permission_ref: sourceRef,
        currentness_state: "current" as const,
        exemplar_state: "approved_current" as const,
      },
    }) as ExemplarRecord;
    mutate(record);
    const entry = input.checkpoint_sets[0]!.feature_source_manifest.entries[0]!;
    entry.material = {
      material_kind: "durable_record",
      source_ref: auxiliaryRef(record.record_id, record.schema_id, record.content_digest),
      value: record,
    };
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies an invalid blocking-evidence domain before deferred expression-digest presence", () => {
    const { vectorInput } = task4Fixture();
    const candidateRef = snapshotRef(vectorInput.candidate);
    vectorInput.blocking_evidence = [{
      candidate_ref: candidateRef,
      evidence_ref: auxiliaryRef("fixture.blocking", "contentmd.fixture-record", sha256Canonical({ blocking: true })),
      source_class: "browser_observed",
      purpose: "wrong_purpose",
      contains_expression: false,
      expression_digest: "not-a-digest",
    }] as never;
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("emits no vector for quarantine, hard-rule, prohibited-claim, and empty-token outcomes", () => {
    const quarantined = task4Fixture().vectorInput;
    const candidateRef = snapshotRef(quarantined.candidate);
    quarantined.blocking_evidence = [{
      candidate_ref: candidateRef,
      evidence_ref: auxiliaryRef("fixture.blocking", "contentmd.fixture-record", sha256Canonical({ blocking: true })),
      source_class: "browser_observed",
      purpose: "feature_exclusion_only",
      contains_expression: false,
    }];
    expect(vectorizeCandidate(quarantined)).toMatchObject({ status: "ineligible", reason: "quarantined_source_class" });

    expect(vectorizeCandidate(task4Fixture({ omitRequiredSource: true }).vectorInput)).toMatchObject({
      status: "ineligible",
      reason: "hard_rule_failed",
    });
    expect(vectorizeCandidate(task4Fixture({ expression: "Forbidden clear action" }).vectorInput)).toMatchObject({
      status: "ineligible",
      reason: "prohibited_claim_hit",
    });
    expect(vectorizeCandidate(task4Fixture({ expression: "!!!" }).vectorInput)).toMatchObject({
      status: "ineligible",
      reason: "empty_word_tokens",
    });
  }, 15_000);

  it("counts overlapping generic matches by covered token position", () => {
    const result = vectorizeCandidate(task4Fixture({ expression: "all in one plus all in one clear next" }).vectorInput);
    expect(result.status).toBe("eligible");
    if (result.status !== "eligible") throw new Error("expected eligible fixture");
    expect(result.vector.token_count).toBe(9);
    expect(result.vector.values[18]).toBe(6 / 9);
  });

  it("rejects caller-authored gate findings before feature calculation", () => {
    const { vectorInput } = task4Fixture();
    vectorInput.rule_evaluations[0].eligibility_gate.findings = [{ rule_id: "rule.required", failure_class: "hard_rule" }];
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:digest");
  });

  it("classifies complete wrong-locale scope and material as scope_mismatch", () => {
    expect(() => task4Fixture({ targetLocale: "fr" })).toThrow("task4_contract_invalid:scope_mismatch");
    expect(() => task4Fixture({ materialLocale: "fr" })).toThrow("task4_contract_invalid:scope_mismatch");
  });

  it("keeps a binding with no checkpoint-derived FeatureMaterial well typed and explicitly missing", () => {
    const { profileInput, vectorInput } = task4Fixture({ emptyMaterials: true });
    expect(profileInput.feature_universe.context_bindings[0].feature_material_refs).toEqual([]);
    expect(profileInput.feature_universe.feature_material_refs).toEqual([]);
    expect(profileInput.feature_material_sources).toEqual([]);
    const result = vectorizeCandidate(vectorInput);
    expect(result.status).toBe("eligible");
    if (result.status !== "eligible") throw new Error("expected eligible empty-material fixture");
    expect(result.vector.values.slice(6, 18)).toEqual([0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1]);
  });

  it("keeps disjoint two-binding checkpoint collections local while binding their exact global unions", () => {
    const { profileInput, vectorInput } = twoBindingFixture();
    const [firstBinding, secondBinding] = profileInput.feature_universe.context_bindings;
    expect(firstBinding.feature_material_refs).toHaveLength(2);
    expect(secondBinding.feature_material_refs).toHaveLength(2);
    expect(firstBinding.checkpoint_set_ref).not.toEqual(secondBinding.checkpoint_set_ref);
    expect(profileInput.feature_universe.feature_material_refs).toHaveLength(4);
    expect(profileInput.feature_universe.hard_rule_set_refs).toHaveLength(2);
    expect(profileInput.scope_material_sources).toHaveLength(4);
    expect(vectorInput.materials).toHaveLength(2);
    const result = vectorizeCandidate(vectorInput);
    expect(result.status).toBe("eligible");
    if (result.status !== "eligible") throw new Error("expected selected first binding to remain eligible");
    expect(result.vector.feature_universe_ref).toEqual({
      record_id: profileInput.feature_universe.manifest_id,
      schema_id: "contentmd.task4-feature-universe-manifest",
      schema_version: "0.1.0",
      content_digest: profileInput.feature_universe.manifest_digest,
    });
  });

  it("validates the unused second binding rather than stopping at the selected first binding", () => {
    const omitted = twoBindingFixture().profileInput;
    const secondCandidateRef = omitted.feature_universe.context_bindings[1].permitted_candidate_scope_refs[0];
    omitted.scope_material_sources = omitted.scope_material_sources.filter((scope) =>
      canonicalJson(scopeRef(scope)) !== canonicalJson(secondCandidateRef)) as [ScopeMaterial, ...ScopeMaterial[]];
    expect(() => createFeatureProfile(omitted)).toThrow("task4_contract_invalid:checkpoint_binding");

    const localAlias = twoBindingFixture().profileInput;
    localAlias.feature_universe.context_bindings[1].feature_material_refs = [
      ...localAlias.feature_universe.context_bindings[0].feature_material_refs,
    ];
    expect(() => createFeatureProfile(localAlias)).toThrow("task4_contract_invalid:digest");
  });

  it("intersects every checkpoint-derived grapheme constraint and rejects a conflict", () => {
    const { vectorInput } = conflictingLengthFixture();
    const result = vectorizeCandidate(vectorInput);
    expect(result).toMatchObject({ status: "ineligible", reason: "hard_rule_failed" });
    if (result.status !== "ineligible") throw new Error("expected conflicting hard-rule diagnostic");
    expect(result.grapheme_constraint_refs).toEqual(
      sortByRef(vectorInput.acceptance_criteria_sources, snapshotRef).map(snapshotRef),
    );
  });

  it("identity-binds self-hashed schema bytes without freezing the mutable Task1 registry hash", () => {
    const { profileInput } = task4Fixture();
    const schema = profileInput.producer.schema_artifact;
    if (schema === null) throw new Error("feature-profile fixture requires schema bytes");
    schema.bytes_utf8 += "\n";
    schema.raw_bytes_digest = digestUtf8(schema.bytes_utf8);
    const profile = createFeatureProfile(profileInput);
    expect(profile.payload.schema_digest).toBe(schema.raw_bytes_digest);
  });

  it("reproduces the exact profile and vector identity, digest, input, and provenance preimages", () => {
    const { profileInput, vectorInput } = task4Fixture();
    const profile = createFeatureProfile(profileInput);
    expect(profile.record_id).toBe(`feature-profile.${sha256Canonical({
      contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
      project_id: PROJECT_ID,
      input_digest: profile.payload.input_digest,
    })}`);
    const { content_digest: _profileDigest, ...profileContent } = profile;
    expect(profile.content_digest).toBe(sha256Canonical(profileContent));
    expect(profile.provenance).toHaveLength(profileInput.artifact_bindings.length);

    const result = vectorizeCandidate({ ...vectorInput, profile });
    expect(result.status).toBe("eligible");
    if (result.status !== "eligible") throw new Error("expected eligible identity fixture");
    const vector = result.vector;
    const producerVerification = verifyTask4Producer(vectorInput.producer, "candidate-feature-vector");
    const universeRef = auxiliaryRef(
      vectorInput.feature_universe.manifest_id,
      "contentmd.task4-feature-universe-manifest",
      vectorInput.feature_universe.manifest_digest,
    );
    const universeArtifactRef = {
      artifact_id: `contentmd.task4-feature-universe-manifest.${vectorInput.feature_universe.manifest_digest}`,
      artifact_version: "0.1.0",
      artifact_digest: vectorInput.feature_universe_artifact.raw_bytes_digest,
    };
    const ruleSet = vectorInput.rule_evaluations[0].candidate_rule_set;
    const gate = vectorInput.rule_evaluations[0].eligibility_gate;
    const ruleArtifactRef = {
      artifact_id: `contentmd.task4-candidate-rule-set.${ruleSet.rule_set_digest}`,
      artifact_version: "0.1.0",
      artifact_digest: vectorInput.rule_evaluations[0].candidate_rule_set_artifact.raw_bytes_digest,
    };
    const expectedInputDigest = sha256Canonical({
      contract_version: "contentmd.task4-candidate-feature-input/0.1.0",
      candidate_ref: snapshotRef(vectorInput.candidate),
      context_ref: vectorInput.candidate.payload.context_ref,
      target_scope_ref: scopeRef(vectorInput.target_scope),
      candidate_scope_ref: scopeRef(vectorInput.candidate_scope),
      checkpoint_set_ref: task3CheckpointSetRef(vectorInput.checkpoint_set),
      feature_profile_ref: auxiliaryRef(profile.record_id, profile.schema_id, profile.content_digest),
      feature_universe_ref: universeRef,
      feature_universe_artifact_ref: universeArtifactRef,
      global_scope_material_refs: sortByRef(vectorInput.scope_material_sources, scopeRef).map(scopeRef),
      feature_materials: vectorInput.materials,
      selected_binding_feature_material_refs: vectorInput.materials.map(materialRef),
      generic_lexicon_ref: {
        artifact_id: "contentmd.generic-language-lexicon.en",
        artifact_version: "0.1.0",
        artifact_digest: vectorInput.generic_lexicon.raw_bytes_digest,
      },
      selected_binding_acceptance_criteria_refs: vectorInput.acceptance_criteria_sources.map(snapshotRef),
      selected_binding_candidate_rule_set_refs: [ruleRef(ruleSet)],
      selected_binding_candidate_rule_set_artifact_refs: [ruleArtifactRef],
      selected_binding_eligibility_gate_refs: [auxiliaryRef(
        gate.gate_id,
        "contentmd.task4-candidate-eligibility-gate",
        gate.gate_digest,
      )],
      producer_manifest_digest: producerVerification.producer_manifest_digest,
      producer_verification_ref: producerVerification.producer_verification_ref,
      unicode_runtime_digest: vectorInput.unicode_runtime.runtime_digest,
      feature_profile_construction_input_digest: sha256Canonical(vectorInput.profile_input),
    });
    expect(vector.input_digest).toBe(expectedInputDigest);
    const { contract_version: _vectorContract, vector_id: _vectorId, vector_digest: _vectorDigest, ...vectorBody } = vector;
    expect(vector.vector_id).toBe(`candidate-feature-vector.${sha256Canonical({
      contract_version: "contentmd.task4-candidate-feature-vector-identity/0.1.0",
      ...vectorBody,
    })}`);
    const { vector_digest: _digest, ...vectorContent } = vector;
    expect(vector.vector_digest).toBe(sha256Canonical(vectorContent));
    expect(vector.provenance.some((entry) => entry.relationship === "candidate_subject")).toBe(true);
    expect(vector.provenance.some((entry) => entry.relationship === "feature_universe" && entry.subject_kind === "artifact_ref")).toBe(true);
  });

  it("identity-binds build verification receipts and rejects dependency-closure mutation", () => {
    const development = task4Fixture();
    const developmentProfile = createFeatureProfile(development.profileInput);
    const verifiedInput = task4Fixture().profileInput;
    verifiedInput.producer = buildVerifiedProducer("feature-profile");
    const verifiedProfile = createFeatureProfile(verifiedInput);
    expect(verifiedProfile.record_id).not.toBe(developmentProfile.record_id);
    expect(verifiedProfile.provenance.some((entry) => entry.relationship === "producer_verification")).toBe(true);

    const dependencyFault = task4Fixture().profileInput;
    const transitive = dependencyFault.producer.source_artifacts.find((artifact) => artifact.path === "packages/learning/src/retrieval.ts");
    if (transitive === undefined) throw new Error("expected transitive retrieval dependency");
    transitive.bytes_utf8 += "\n";
    transitive.raw_bytes_digest = digestUtf8(transitive.bytes_utf8);
    expect(() => createFeatureProfile(dependencyFault)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("replays every selected policy-item rule set and aggregates one failure across the complete set", () => {
    const passing = multiRuleFixture(false).vectorInput;
    expect(passing.rule_evaluations).toHaveLength(2);
    const passed = vectorizeCandidate(passing);
    expect(passed.status).toBe("eligible");

    const failing = multiRuleFixture(true).vectorInput;
    expect(failing.rule_evaluations).toHaveLength(2);
    expect(vectorizeCandidate(failing)).toMatchObject({ status: "ineligible", reason: "hard_rule_failed" });

    const permissiveSubset = multiRuleFixture(false).vectorInput;
    permissiveSubset.rule_evaluations = [permissiveSubset.rule_evaluations[0]];
    expect(() => vectorizeCandidate(permissiveSubset)).toThrow("task4_contract_invalid:checkpoint_binding");
  });

  it("rejects unnormalized rule tokens, cross-scope rules, and role-incompatible feature evidence", () => {
    expect(() => task4Fixture({ ruleToken: "Forbidden" })).toThrow("task4_contract_invalid:unicode_runtime");
    expect(() => task4Fixture({ ruleProject: "project.other" })).toThrow("task4_contract_invalid:scope_mismatch");
    expect(() => task4Fixture({ ruleLocale: "fr" })).toThrow("task4_contract_invalid:scope_mismatch");
    expect(() => task4Fixture({ actionSourceRole: "fact_set" })).toThrow("task4_contract_invalid:checkpoint_binding");
  });

  it("rejects a digest-valid forged profile that cannot be replayed from complete construction input", () => {
    const { vectorInput } = task4Fixture();
    const forged = structuredClone(vectorInput.profile);
    forged.payload.input_digest = "f".repeat(64);
    forged.record_id = `feature-profile.${sha256Canonical({
      contract_version: "contentmd.task4-feature-profile-identity/0.1.0",
      project_id: forged.scope.project_id,
      input_digest: forged.payload.input_digest,
    })}`;
    const { content_digest: _oldDigest, ...content } = forged;
    forged.content_digest = sha256Canonical(content);
    vectorInput.profile = forged;
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:feature_profile_binding");
  });

  it("exhausts vector reference binding before supplied-profile provenance", () => {
    const { vectorInput } = task4Fixture();
    const provenance = vectorInput.profile.provenance.filter(
      (entry) => entry.relationship !== "task4_feature_artifact_runtime_profile",
    ) as typeof vectorInput.profile.provenance;
    const { content_digest: _digest, ...profileWithoutDigest } = vectorInput.profile;
    vectorInput.profile = finalizeRecord({ ...profileWithoutDigest, provenance }) as typeof vectorInput.profile;
    vectorInput.target_scope = structuredClone(vectorInput.candidate_scope);
    expect(() => vectorizeCandidate(vectorInput)).toThrow("task4_contract_invalid:reference_binding");
  });

  it("returns detached frozen profiles, vectors, diagnostics, and module feature order", () => {
    const fixture = task4Fixture();
    const profile = createFeatureProfile(fixture.profileInput);
    const profileBytes = canonicalJson(profile);
    fixture.profileInput.runtime_profile_ref.artifact_id = "mutated.runtime";
    expect(canonicalJson(profile)).toBe(profileBytes);
    expect(Object.isFrozen(profile)).toBe(true);
    expect(Object.isFrozen(profile.payload.features[0])).toBe(true);
    expect(() => {
      profile.payload.features[0]!.name = "mutated_feature";
    }).toThrow(TypeError);

    const eligibleInput = task4Fixture().vectorInput;
    const eligible = vectorizeCandidate(eligibleInput);
    expect(eligible.status).toBe("eligible");
    const eligibleBytes = canonicalJson(eligible);
    eligibleInput.profile_input.runtime_profile_ref.artifact_id = "mutated.runtime";
    expect(canonicalJson(eligible)).toBe(eligibleBytes);
    expect(Object.isFrozen(eligible)).toBe(true);
    if (eligible.status !== "eligible") throw new Error("expected eligible fixture");
    expect(Object.isFrozen(eligible.vector.feature_order)).toBe(true);

    const ineligible = vectorizeCandidate(task4Fixture({ expression: "!!!" }).vectorInput);
    expect(ineligible.status).toBe("ineligible");
    expect(Object.isFrozen(ineligible)).toBe(true);
    expect(Object.isFrozen(ineligible.grapheme_constraint_refs)).toBe(true);

    const mutableOrder = TASK4_FEATURE_ORDER as unknown as string[];
    const first = mutableOrder[0]!;
    try {
      expect(() => {
        mutableOrder[0] = "mutated_order";
      }).toThrow(TypeError);
    } finally {
      if (mutableOrder[0] !== first) mutableOrder[0] = first;
    }
  });

  it("requires the selected scope object to be canonical-byte equal to its complete profile source", () => {
    const equalClone = task4Fixture().vectorInput;
    equalClone.target_scope = structuredClone(equalClone.target_scope);
    expect(vectorizeCandidate(equalClone).status).toBe("eligible");

    const substituted = task4Fixture().vectorInput;
    substituted.target_scope = structuredClone(substituted.candidate_scope);
    expect(() => vectorizeCandidate(substituted)).toThrow("task4_contract_invalid:reference_binding");
  });

  it("stages nested closed-shape failures before a separate producer witness fault", () => {
    const profile = task4Fixture().profileInput;
    (profile.feature_universe.context_bindings[0] as FeatureContextBinding & { extra?: boolean }).extra = true;
    const profileDependency = profile.producer.source_artifacts.find((artifact) => artifact.path === "packages/learning/src/retrieval.ts");
    if (profileDependency === undefined) throw new Error("expected profile retrieval dependency");
    profileDependency.bytes_utf8 += "\n";
    profileDependency.raw_bytes_digest = digestUtf8(profileDependency.bytes_utf8);
    expect(() => createFeatureProfile(profile)).toThrow("task4_contract_invalid:canonical_value");

    const vector = task4Fixture().vectorInput;
    (vector.feature_universe.context_bindings[0] as FeatureContextBinding & { extra?: boolean }).extra = true;
    const vectorDependency = vector.producer.source_artifacts.find((artifact) => artifact.path === "packages/learning/src/retrieval.ts");
    if (vectorDependency === undefined) throw new Error("expected vector retrieval dependency");
    vectorDependency.bytes_utf8 += "\n";
    vectorDependency.raw_bytes_digest = digestUtf8(vectorDependency.bytes_utf8);
    expect(() => vectorizeCandidate(vector)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("stages complete nested checkpoint shape before every profile/vector producer", () => {
    const profile = task4Fixture().profileInput;
    (profile.checkpoint_sets[0] as typeof profile.checkpoint_sets[0] & { extra?: boolean }).extra = true;
    profile.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => createFeatureProfile(profile)).toThrow("task4_contract_invalid:canonical_value");

    const vector = task4Fixture().vectorInput;
    (vector.checkpoint_set as typeof vector.checkpoint_set & { extra?: boolean }).extra = true;
    vector.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => vectorizeCandidate(vector)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("requires every checkpoint candidate context to equal its binding context", () => {
    expect(() => task4Fixture({ candidateBContextMismatch: true })).toThrow(
      "task4_contract_invalid:scope_mismatch",
    );
  });

  it("rejects a rule source that exists only in candidate-A closure", () => {
    expect(() => task4Fixture({ ruleSourceFromCandidateA: true })).toThrow(
      "task4_contract_invalid:checkpoint_binding",
    );
  });

  it("selects producer_witness before forbidden and numeric faults for profile and vector APIs", () => {
    const profileForbidden = task4Fixture().profileInput;
    profileForbidden.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    (profileForbidden.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => createFeatureProfile(profileForbidden)).toThrow("task4_contract_invalid:producer_witness");

    const profileNumeric = task4Fixture().profileInput;
    profileNumeric.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    profileNumeric.checkpoint_sets[0].streams[0]!.maximum_sequence = Number.NaN;
    expect(() => createFeatureProfile(profileNumeric)).toThrow("task4_contract_invalid:producer_witness");

    const vectorForbidden = task4Fixture().vectorInput;
    vectorForbidden.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    (vectorForbidden.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).author_identity = "forbidden";
    expect(() => vectorizeCandidate(vectorForbidden)).toThrow("task4_contract_invalid:producer_witness");

    const vectorNumeric = task4Fixture().vectorInput;
    vectorNumeric.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    vectorNumeric.checkpoint_set.streams[0]!.maximum_sequence = Number.NaN;
    expect(() => vectorizeCandidate(vectorNumeric)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("freezes the exact project-owned generic-language lexicon bytes", () => {
    const value = readFileSync(
      new URL("../../../fixtures/learning-ranking/generic-language-lexicon.json", import.meta.url),
      "utf8",
    );
    expect(value).toBe("{\"authority_effect\":\"none\",\"contract_version\":\"contentmd.generic-language-lexicon/0.1.0\",\"entries\":[{\"entry_id\":\"generic.all_in_one\",\"tokens\":[\"all\",\"in\",\"one\"]},{\"entry_id\":\"generic.empower_your_journey\",\"tokens\":[\"empower\",\"your\",\"journey\"]},{\"entry_id\":\"generic.game_changer\",\"tokens\":[\"game\",\"changer\"]},{\"entry_id\":\"generic.next_level\",\"tokens\":[\"next\",\"level\"]},{\"entry_id\":\"generic.seamless_experience\",\"tokens\":[\"seamless\",\"experience\"]},{\"entry_id\":\"generic.unlock_possibilities\",\"tokens\":[\"unlock\",\"possibilities\"]}],\"locale\":\"en\",\"rights_state\":\"training_permitted\",\"source_class\":\"project_owned_synthetic\"}\n");
    expect(createHash("sha256").update(value, "utf8").digest("hex")).toBe(
      "27d2e0c93fc654d75aad903c6d6b13c1de369d7546637f1142fd65bacd9fb4f0",
    );
  });

  it("fails profile official mode before touching nested values", () => {
    let reads = 0;
    const input = officialProfileInput();
    Object.defineProperty(input.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "feature-profile";
      },
    });
    expect(() => createFeatureProfile(input)).toThrow(
      "task4_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);
  });

  it("fails vector official mode before touching nested values", () => {
    let reads = 0;
    const input = officialVectorInput();
    Object.defineProperty(input.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "candidate-feature-vector";
      },
    });
    expect(() => vectorizeCandidate(input)).toThrow(
      "task4_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);
  });

  it("rejects invalid top-level descriptors before official mode", () => {
    const profile = officialProfileInput() as CreateFeatureProfileInput & { extra?: boolean };
    Object.defineProperty(profile, Symbol("extra"), { value: true, enumerable: true });
    expect(() => createFeatureProfile(profile)).toThrow("task4_contract_invalid:input_shape");

    const vector = officialVectorInput();
    Object.defineProperty(vector, "record_mode", { value: "official", enumerable: false });
    expect(() => vectorizeCandidate(vector)).toThrow("task4_contract_invalid:input_shape");
  });
});
