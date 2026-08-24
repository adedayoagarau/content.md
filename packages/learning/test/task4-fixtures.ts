import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { posix } from "node:path";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
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
  const parsed = JSON.parse(witness.bytes_utf8) as { artifact_id: string; artifact_version: string };
  return { ...witness, artifact_ref: { artifact_id: parsed.artifact_id, artifact_version: parsed.artifact_version, artifact_digest: witness.raw_bytes_digest } };
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

export interface Task4Fixture {
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

export function task4Fixture(options: {
  expression?: string;
  expressionB?: string;
  contextId?: string;
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
    snapshot_id: options.contextId ?? base.context.snapshot_id,
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
      ...(options.omitRequiredSource === true ? [] : [requiredGateRef]),
    ]) as [DigestRef, ...DigestRef[]],
    payload: {
      ...base.candidate_b.payload,
      task_ref: taskRef,
      context_ref: options.candidateBContextMismatch === true ? alternateContextRef : contextRef,
      expression: options.expressionB ?? base.candidate_b.payload.expression,
      expression_digest: digestUtf8(options.expressionB ?? base.candidate_b.payload.expression),
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

