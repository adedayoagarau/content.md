import { createHash } from "node:crypto";
import { posix } from "node:path";
import { readFileSync } from "node:fs";
import { canonicalJson, finalizeRecord, sha256Canonical } from "@contentmd/core";
import { describe, expect, it } from "vitest";
import * as learningSurface from "../src/index.js";
import {
  retrieveApprovedPatterns,
  task4GraphemeCount,
  task4WordTokens,
  verifyRetrievalSnapshot,
  type ApprovedRetrievalCandidate,
  type RetrievalInput,
  type RetrievalProjection,
  type RetrievalProjectionEvidence,
  type RetrievalDispositionEvidence,
  type Task4DependencyManifest,
  type Task4ContentPatternRecord,
  type Task4ProducerArtifactWitness,
  type Task4UnicodeRuntime,
} from "../src/retrieval.js";
import type { DigestRef } from "../src/records.js";
import type { UnicodeArtifactBundle } from "../src/unicode-normalization.js";

const PROJECT_ID = "project.task4.fixture";
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

function raw(path: string) {
  const bytes_utf8 = bytes(path);
  return { path, bytes_utf8, raw_bytes_digest: digestUtf8(bytes_utf8) };
}

function artifact(path: string) {
  const witness = raw(path);
  const header = witness.bytes_utf8.slice(0, 4_096);
  const artifact_id = header.match(/"artifact_id":"([^"]+)"/u)?.[1];
  const artifact_version = header.match(/"artifact_version":"([^"]+)"/u)?.[1];
  if (artifact_id === undefined || artifact_version === undefined) throw new Error(`artifact_header_invalid:${path}`);
  return {
    ...witness,
    artifact_ref: {
      artifact_id,
      artifact_version,
      artifact_digest: witness.raw_bytes_digest,
    },
  };
}

function storeArtifact(path: string, artifact_id: string) {
  const witness = raw(path);
  return {
    ...witness,
    artifact_ref: {
      artifact_id,
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
  if (!specifier.startsWith(".")) throw new Error(`unhandled test fixture import: ${specifier}`);
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
    const resolved = runtimeSpecifiers(bytes(path))
      .map((specifier) => resolveRuntimePath(path, specifier))
      .filter((value): value is string => value !== null)
      .sort();
    dependencies.set(path, resolved);
    pending.push(...resolved);
  }
  const source_artifacts = [...dependencies.keys()].sort().map(raw) as [ReturnType<typeof raw>, ...ReturnType<typeof raw>[]];
  const resolution_artifacts = [...RESOLUTION_PATHS].map(raw) as [ReturnType<typeof raw>, ...ReturnType<typeof raw>[]];
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

function refinalizeProducerManifest(witness: Task4ProducerArtifactWitness): void {
  witness.source_artifacts.sort((left, right) => left.path.localeCompare(right.path, "en"));
  witness.dependency_manifest.entries.sort((left, right) => left.path.localeCompare(right.path, "en"));
  const { dependency_manifest_digest: _digest, ...preimage } = witness.dependency_manifest;
  witness.dependency_manifest.dependency_manifest_digest = sha256Canonical(preimage);
}

function buildVerifiedProducer(
  producer_id: Task4ProducerArtifactWitness["producer_id"],
): Task4ProducerArtifactWitness {
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
    contract: {
      path: witness.contract_artifact.path,
      raw_bytes_digest: witness.contract_artifact.raw_bytes_digest,
    },
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
    scope: {
      memory_scope: "task",
      project_id: null,
      resource_refs: [target],
      data_classes: ["verification_metadata"],
    },
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

function ref(record_id: string, schema_id = "contentmd.fixture-record"): DigestRef {
  return {
    record_id,
    schema_id,
    schema_version: "0.1.0",
    content_digest: sha256Canonical({ record_id, schema_id }),
  };
}

function auxiliaryRef(record_id: string, schema_id: string, content_digest: string): DigestRef {
  return { record_id, schema_id, schema_version: "0.1.0", content_digest };
}

function disposition(
  pattern_ref: DigestRef,
  kind: "approval" | "rights" | "freshness" | "dispute",
): RetrievalDispositionEvidence {
  const common = {
    contract_version: "contentmd.task4-retrieval-disposition-evidence/0.1.0" as const,
    pattern_ref,
    verification_mode: "development_fixture" as const,
    source_class: "project_owned_synthetic" as const,
    source_refs: [ref(`source.${kind}`)] as [DigestRef, ...DigestRef[]],
    authority_effect: "none" as const,
  };
  const variant = kind === "approval" ? { evidence_kind: kind, approval_state: "approved_current" as const }
    : kind === "rights" ? { evidence_kind: kind, rights_state: "retrieval_permitted" as const }
      : kind === "freshness" ? {
        evidence_kind: kind,
        freshness_state: "current" as const,
        evaluated_at: NOW,
        expires_at: "2026-08-21T19:00:00.000Z",
      }
        : { evidence_kind: kind, dispute_state: "none" as const, resolution_ref: null };
  const identity = { ...common, ...variant };
  const evidence_id = `retrieval-disposition-evidence.${sha256Canonical(identity)}`;
  const withoutDigest = { ...identity, evidence_id };
  return { ...withoutDigest, evidence_digest: sha256Canonical(withoutDigest) } as RetrievalDispositionEvidence;
}

function approvedCandidate(): ApprovedRetrievalCandidate {
  const pattern = finalizeRecord({
    record_id: "content-pattern.task4.clear-next-step",
    schema_id: "contentmd.content-pattern-record",
    schema_version: "0.1.0",
    record_version: 1,
    scope: {
      memory_scope: "project" as const,
      project_id: PROJECT_ID,
      resource_refs: ["resource.task4.pattern"],
      data_classes: ["project_pattern"],
    },
    provenance: [],
    lifecycle_state: "active" as const,
    payload: {
      evidence_strength: "project_owned_synthetic",
      problem: "People need a clear next step",
      contexts: [{
        journeys: ["checkout"],
        stages: ["review"],
        states: ["ready"],
        channels: ["web"],
        modalities: ["visual"],
        locales: ["en"],
        risk_levels: ["low"],
      }],
      mechanism: "clear next step",
      source_refs: ["source.task4.pattern"],
      counterexamples: ["Retrying without new evidence"],
      failure_modes: ["vague action"],
      transfer_conditions: [{ field: "channel", values: ["web"] }],
      non_transferable_details: ["Provider labels require current project evidence"],
      rights_boundary: "project_owned_synthetic",
    },
  });
  const pattern_ref = auxiliaryRef(pattern.record_id, pattern.schema_id, pattern.content_digest);
  const approval_evidence = disposition(pattern_ref, "approval") as RetrievalDispositionEvidence & { evidence_kind: "approval" };
  const rights_evidence = disposition(pattern_ref, "rights") as RetrievalDispositionEvidence & { evidence_kind: "rights" };
  const freshness_evidence = disposition(pattern_ref, "freshness") as RetrievalDispositionEvidence & { evidence_kind: "freshness" };
  const dispute_evidence = disposition(pattern_ref, "dispute") as RetrievalDispositionEvidence & { evidence_kind: "dispute" };
  const projectionEvidenceIdentity = {
    contract_version: "contentmd.task4-retrieval-projection-evidence/0.1.0" as const,
    pattern_ref,
    project_id: PROJECT_ID,
    memory_scope: "project" as const,
    product_area: "checkout",
    journey_state: "ready",
    channel: "web",
    locale: "en",
    market: "US",
    risk: "low",
    evidence_strength: "project_owned_synthetic" as const,
    outcome_text: ["People know what happens next"] as [string, ...string[]],
    transfer_conditions: [],
    approval_ref: auxiliaryRef(
      approval_evidence.evidence_id,
      "contentmd.task4-retrieval-disposition-evidence",
      approval_evidence.evidence_digest,
    ),
    rights_ref: auxiliaryRef(
      rights_evidence.evidence_id,
      "contentmd.task4-retrieval-disposition-evidence",
      rights_evidence.evidence_digest,
    ),
    verification_mode: "development_fixture" as const,
    source_class: "project_owned_synthetic" as const,
    source_refs: [ref("source.projection")] as [DigestRef, ...DigestRef[]],
    authority_effect: "none" as const,
  };
  const evidence_id = `retrieval-projection-evidence.${sha256Canonical(projectionEvidenceIdentity)}`;
  const projectionEvidenceWithoutDigest = { ...projectionEvidenceIdentity, evidence_id };
  const projection_evidence: RetrievalProjectionEvidence = {
    ...projectionEvidenceWithoutDigest,
    evidence_digest: sha256Canonical(projectionEvidenceWithoutDigest),
  };
  const projectionIdentity = {
    contract_version: "contentmd.task4-retrieval-projection/0.1.0" as const,
    pattern_ref,
    project_id: PROJECT_ID,
    memory_scope: "project" as const,
    product_area: "checkout",
    journey_state: "ready",
    channel: "web",
    locale: "en",
    market: "US",
    risk: "low",
    lifecycle_state: "active" as const,
    approval_state: "approved_current" as const,
    rights_state: "retrieval_permitted" as const,
    freshness_state: "current" as const,
    dispute_state: "none" as const,
    expires_at: "2026-08-21T19:00:00.000Z",
    source_class: "project_owned_synthetic" as const,
    evidence_strength: "project_owned_synthetic" as const,
    mechanism_text: ["clear next step"] as [string, ...string[]],
    problem_text: ["People need a clear next step"] as [string, ...string[]],
    context_text: ["checkout", "review", "ready", "web", "visual", "en", "low"] as [string, ...string[]],
    outcome_text: ["People know what happens next"] as [string, ...string[]],
    failure_mode_text: ["vague action"] as [string, ...string[]],
    transfer_conditions: [],
    projection_evidence_ref: auxiliaryRef(
      projection_evidence.evidence_id,
      "contentmd.task4-retrieval-projection-evidence",
      projection_evidence.evidence_digest,
    ),
    approval_ref: projection_evidence.approval_ref,
    rights_ref: projection_evidence.rights_ref,
    freshness_ref: auxiliaryRef(
      freshness_evidence.evidence_id,
      "contentmd.task4-retrieval-disposition-evidence",
      freshness_evidence.evidence_digest,
    ),
    dispute_ref: auxiliaryRef(
      dispute_evidence.evidence_id,
      "contentmd.task4-retrieval-disposition-evidence",
      dispute_evidence.evidence_digest,
    ),
    authority_effect: "none" as const,
  };
  const projection_id = `retrieval-projection.${sha256Canonical(projectionIdentity)}`;
  const projectionWithoutDigest = { ...projectionIdentity, projection_id };
  const projection: RetrievalProjection = {
    ...projectionWithoutDigest,
    projection_digest: sha256Canonical(projectionWithoutDigest),
  };
  return {
    source_class: "project_owned_synthetic",
    pattern,
    projection,
    projection_evidence,
    approval_evidence,
    rights_evidence,
    freshness_evidence,
    dispute_evidence,
  };
}

function query() {
  const query_terms = ["clear next"] as [string, ...string[]];
  const normalized_query_term_sequences = [["clear", "next"]];
  const normalized_query_tokens = ["clear", "next"];
  const query_source_refs = [ref("query.source")] as [DigestRef, ...DigestRef[]];
  const registry_versions = [{
    artifact_id: "contentmd.pattern-registry",
    artifact_version: "0.1.0",
    artifact_digest: sha256Canonical({ registry: "task4" }),
  }] as const;
  const identity = {
    contract_version: "contentmd.task4-retrieval-query/0.1.0",
    project_id: PROJECT_ID,
    memory_scope: "project",
    product_area: "checkout",
    journey_state: "ready",
    channel: "web",
    locale: "en",
    market: "US",
    risk: "low",
    query_terms,
    normalized_query_term_sequences,
    normalized_query_tokens,
    query_source_refs,
    registry_versions,
  };
  return {
    project_id: PROJECT_ID,
    memory_scope: "project" as const,
    product_area: "checkout",
    journey_state: "ready",
    channel: "web",
    locale: "en",
    market: "US",
    risk: "low",
    query_terms,
    query_source_refs,
    registry_versions: [...registry_versions] as [typeof registry_versions[number], ...typeof registry_versions[number][]],
    query_digest: sha256Canonical(identity),
  };
}

function rehashQuery(value: ReturnType<typeof query>): void {
  value.query_digest = sha256Canonical({
    contract_version: "contentmd.task4-retrieval-query/0.1.0",
    project_id: value.project_id,
    memory_scope: value.memory_scope,
    product_area: value.product_area,
    journey_state: value.journey_state,
    channel: value.channel,
    locale: value.locale,
    market: value.market,
    risk: value.risk,
    query_terms: value.query_terms,
    normalized_query_term_sequences: [["clear", "next"]],
    normalized_query_tokens: ["clear", "next"],
    query_source_refs: value.query_source_refs,
    registry_versions: value.registry_versions,
  });
}

function rehashRetrievalSnapshot(value: ReturnType<typeof retrieveApprovedPatterns>): void {
  const { snapshot_id: _id, snapshot_digest: _digest, ...identity } = value;
  value.snapshot_id = `retrieval-snapshot.${sha256Canonical(identity)}`;
  const { snapshot_digest: _drop, ...content } = value;
  value.snapshot_digest = sha256Canonical(content);
}

function rehashProjection(value: RetrievalProjection): void {
  const { projection_id: _id, projection_digest: _digest, ...identity } = value;
  value.projection_id = `retrieval-projection.${sha256Canonical(identity)}`;
  const { projection_digest: _drop, ...content } = value;
  value.projection_digest = sha256Canonical(content);
}

function validInput(): RetrievalInput {
  return {
    record_mode: "development_fixture",
    evaluation_at: NOW,
    producer: producer("retrieval-snapshot"),
    unicode_runtime: unicodeRuntime(),
    query: query(),
    candidates: [approvedCandidate()],
  };
}

type RetrievalFault = {
  category: string;
  suffix: string;
  mutate: (input: RetrievalInput) => void;
};

const RETRIEVAL_FAULTS: readonly RetrievalFault[] = [
  { category: "canonical", suffix: "canonical_value", mutate: (input) => {
    (input.query as typeof input.query & { extra?: boolean }).extra = true;
  } },
  { category: "producer", suffix: "producer_witness", mutate: (input) => {
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
  } },
  { category: "unicode", suffix: "unicode_runtime", mutate: (input) => {
    input.unicode_runtime.runtime_digest = "0".repeat(64);
  } },
  { category: "digest", suffix: "digest", mutate: (input) => {
    input.query.query_digest = "0".repeat(64);
  } },
  { category: "reference", suffix: "reference_binding", mutate: (input) => {
    const approved = input.candidates[0] as ApprovedRetrievalCandidate;
    approved.projection.pattern_ref = ref("matrix.reference");
    rehashProjection(approved.projection);
  } },
  { category: "quarantine", suffix: "quarantined_expression_present", mutate: (input) => {
    input.candidates.push({
      source_class: "competitor",
      evidence_ref: ref("matrix.quarantine"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
      expression: "copied expression",
    } as never);
  } },
  { category: "forbidden", suffix: "forbidden_input_field", mutate: (input) => {
    (input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
  } },
  { category: "numeric", suffix: "numeric_nonfinite", mutate: (input) => {
    (input.candidates[0] as ApprovedRetrievalCandidate).pattern.record_version = Number.NaN;
  } },
] as const;

const RETRIEVAL_FAULT_PAIRS = RETRIEVAL_FAULTS.flatMap((earlier, index) =>
  RETRIEVAL_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

type VerifyRetrievalState = {
  retrieval_input: RetrievalInput;
  snapshot: ReturnType<typeof retrieveApprovedPatterns>;
};

const VERIFY_RETRIEVAL_FAULTS = [
  { category: "canonical", suffix: "canonical_value", mutate: ({ retrieval_input }: VerifyRetrievalState) => {
    (retrieval_input.query as typeof retrieval_input.query & { extra?: boolean }).extra = true;
  } },
  { category: "producer", suffix: "producer_witness", mutate: ({ retrieval_input }: VerifyRetrievalState) => {
    retrieval_input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
  } },
  { category: "unicode", suffix: "unicode_runtime", mutate: ({ retrieval_input }: VerifyRetrievalState) => {
    retrieval_input.unicode_runtime.runtime_digest = "0".repeat(64);
  } },
  { category: "digest", suffix: "digest", mutate: ({ retrieval_input }: VerifyRetrievalState) => {
    retrieval_input.query.query_digest = "0".repeat(64);
  } },
  { category: "reference", suffix: "reference_binding", mutate: ({ snapshot }: VerifyRetrievalState) => {
    snapshot.candidates[0]!.rank = 1;
    rehashRetrievalSnapshot(snapshot);
  } },
  { category: "provenance", suffix: "provenance", mutate: ({ snapshot }: VerifyRetrievalState) => {
    snapshot.provenance = snapshot.provenance.slice(1) as typeof snapshot.provenance;
    rehashRetrievalSnapshot(snapshot);
  } },
  { category: "quarantine", suffix: "quarantined_expression_present", mutate: ({ retrieval_input, snapshot }: VerifyRetrievalState) => {
    const evidence_ref = ref("matrix.verify-quarantine");
    retrieval_input.candidates.push({
      source_class: "competitor",
      evidence_ref,
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
      expression: "copied expression",
    } as never);
    const sortCanonical = <T>(values: readonly T[]): T[] => [...values].sort((left, right) =>
      Buffer.compare(Buffer.from(canonicalJson(left), "utf8"), Buffer.from(canonicalJson(right), "utf8")));
    const withoutDeferredExpression = (candidate: RetrievalInput["candidates"][number]) => {
      const clone = { ...candidate } as Record<string, unknown>;
      delete clone.expression;
      delete clone.expression_digest;
      delete clone.browser_expression;
      delete clone.competitor_expression;
      delete clone.third_party_expression;
      return clone;
    };
    snapshot.candidate_set_digest = sha256Canonical({
      contract_version: "contentmd.task4-retrieval-candidate-set/0.1.0",
      approved_candidates: sortCanonical(retrieval_input.candidates.filter((candidate) =>
        candidate.source_class === "project_owned" || candidate.source_class === "project_owned_synthetic")),
      quarantined_candidates: sortCanonical(retrieval_input.candidates.filter((candidate) =>
        ["browser_observed", "competitor", "third_party", "nonconforming", "unknown"]
          .includes(candidate.source_class)).map(withoutDeferredExpression)),
    });
    snapshot.exclusions = sortCanonical([
      ...snapshot.exclusions,
      { subject_ref: evidence_ref, reason: "quarantined_source_class" as const },
    ]);
    rehashRetrievalSnapshot(snapshot);
  } },
  { category: "forbidden", suffix: "forbidden_input_field", mutate: ({ retrieval_input }: VerifyRetrievalState) => {
    (retrieval_input.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
  } },
  { category: "numeric", suffix: "numeric_nonfinite", mutate: ({ snapshot }: VerifyRetrievalState) => {
    snapshot.candidates[0]!.score.total_score = Number.NaN;
  } },
] as const;

const VERIFY_RETRIEVAL_FAULT_PAIRS = VERIFY_RETRIEVAL_FAULTS.flatMap((earlier, index) =>
  VERIFY_RETRIEVAL_FAULTS.slice(index + 1).map((later) => [earlier, later] as const));

describe("Task 4 deterministic approved-pattern retrieval", () => {
  it.each(RETRIEVAL_FAULT_PAIRS)(
    "exhausts retrieve %s before %s",
    (earlier, later) => {
      const input = validInput();
      earlier.mutate(input);
      later.mutate(input);
      expect(() => retrieveApprovedPatterns(input)).toThrow(`task4_contract_invalid:${earlier.suffix}`);
    },
  );

  it.each(VERIFY_RETRIEVAL_FAULT_PAIRS)(
    "exhausts verify %s before %s",
    (earlier, later) => {
      const retrieval_input = validInput();
      const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
      const state = { retrieval_input, snapshot };
      earlier.mutate(state);
      later.mutate(state);
      expect(() => verifyRetrievalSnapshot({
        record_mode: "development_fixture",
        retrieval_input,
        snapshot,
      })).toThrow(`task4_contract_invalid:${earlier.suffix}`);
    },
  );

  it("classifies a validly rehashed wrong candidate-set claim as digest", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.candidate_set_digest = "f".repeat(64);
    rehashRetrievalSnapshot(snapshot);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:digest");
  });

  it("classifies a rehashed snapshot provenance relationship fault as provenance", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.provenance[0]!.relationship = "wrong_relationship" as never;
    rehashRetrievalSnapshot(snapshot);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:provenance");
  });

  it("stages full-graph canonical shape before numeric finiteness without getter reads", () => {
    const input = validInput();
    let reads = 0;
    Object.defineProperty(input.query, "z", { value: Number.NaN, enumerable: true });
    Object.defineProperty(input.query, "a", {
      enumerable: false,
      get() {
        reads += 1;
        return "unsafe";
      },
    });
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
    expect(reads).toBe(0);
  });

  it("rejects a computed template-literal dynamic import in the producer closure", () => {
    const input = validInput();
    const witness = input.producer;
    const entryPath = "packages/learning/src/retrieval.ts";
    const source = witness.source_artifacts.find((artifact) => artifact.path === entryPath)!;
    source.bytes_utf8 += "\nconst task4ComputedProbe = (name: string) => import(`./${name}.js`);\n";
    source.raw_bytes_digest = digestUtf8(source.bytes_utf8);
    const entry = witness.dependency_manifest.entries.find((item) => item.path === entryPath)!;
    entry.raw_bytes_digest = source.raw_bytes_digest;
    const { dependency_manifest_digest: _digest, ...preimage } = witness.dependency_manifest;
    witness.dependency_manifest.dependency_manifest_digest = sha256Canonical(preimage);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("uses the pinned TypeScript parser to reject invalid syntax and decode escaped module specifiers", () => {
    const invalid = validInput();
    const invalidSource = invalid.producer.source_artifacts.find((artifact) => artifact.path === "packages/learning/src/retrieval.ts")!;
    invalidSource.bytes_utf8 += "\nconst = ;\n";
    invalidSource.raw_bytes_digest = digestUtf8(invalidSource.bytes_utf8);
    invalid.producer.dependency_manifest.entries.find((entry) => entry.path === invalidSource.path)!.raw_bytes_digest = invalidSource.raw_bytes_digest;
    refinalizeProducerManifest(invalid.producer);
    expect(() => retrieveApprovedPatterns(invalid)).toThrow("task4_contract_invalid:producer_witness");

    const escaped = validInput();
    const escapedSource = escaped.producer.source_artifacts.find((artifact) => artifact.path === "packages/learning/src/retrieval.ts")!;
    escapedSource.bytes_utf8 += '\nimport "./gh\\u006fst.js";\n';
    escapedSource.raw_bytes_digest = digestUtf8(escapedSource.bytes_utf8);
    const decoyBytes = "export {};\n";
    const decoy = {
      path: "packages/learning/src/ghu006fst.ts",
      bytes_utf8: decoyBytes,
      raw_bytes_digest: digestUtf8(decoyBytes),
    };
    escaped.producer.source_artifacts.push(decoy);
    const escapedEntry = escaped.producer.dependency_manifest.entries.find((entry) => entry.path === escapedSource.path)!;
    escapedEntry.raw_bytes_digest = escapedSource.raw_bytes_digest;
    escapedEntry.runtime_dependency_paths = [...escapedEntry.runtime_dependency_paths, decoy.path].sort();
    escaped.producer.dependency_manifest.entries.push({
      path: decoy.path,
      raw_bytes_digest: decoy.raw_bytes_digest,
      runtime_dependency_paths: [],
    });
    refinalizeProducerManifest(escaped.producer);
    expect(() => retrieveApprovedPatterns(escaped)).toThrow("task4_contract_invalid:producer_witness");
  });

  it.each([
    'eval("import(\'./ghost.js\')")',
    '(0, eval)("import(\'./ghost.js\')")',
    'globalThis.eval("import(\'./ghost.js\')")',
    'new Function("return import(\'./ghost.js\')")()',
    'globalThis["ev" + "al"]("import(\'./ghost.js\')")',
    '(() => {}).constructor("return import(\'./ghost.js\')")()',
  ])("rejects source-text runtime evaluation seam %s", (expression) => {
    const input = validInput();
    const witness = input.producer;
    const entryPath = "packages/learning/src/retrieval.ts";
    const source = witness.source_artifacts.find((artifact) => artifact.path === entryPath)!;
    source.bytes_utf8 += `\n${expression};\n`;
    source.raw_bytes_digest = digestUtf8(source.bytes_utf8);
    witness.dependency_manifest.entries.find((entry) => entry.path === entryPath)!.raw_bytes_digest = source.raw_bytes_digest;
    refinalizeProducerManifest(witness);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("keeps resolution artifacts in exact POSIX path order", () => {
    expect(producer("retrieval-snapshot").resolution_artifacts.map((artifact) => artifact.path)).toEqual([
      "package.json",
      "packages/core/package.json",
      "packages/core/tsconfig.json",
      "packages/learning/package.json",
      "packages/learning/tsconfig.json",
      "pnpm-lock.yaml",
      "tsconfig.base.json",
      "tsconfig.json",
    ]);
  });

  it("applies Unicode 17 GB9c to an Indic conjunct", () => {
    expect(task4GraphemeCount("\u0915\u094D\u0924", unicodeRuntime())).toBe(1);
  });

  it("applies artifact NFKC again after full case folding", () => {
    expect(task4WordTokens("\u1E96", unicodeRuntime())).toEqual(["\u1E96"]);
  });

  it("returns a detached deeply immutable retrieval snapshot", () => {
    const input = validInput();
    const snapshot = retrieveApprovedPatterns(input);
    const original = canonicalJson(snapshot);
    input.query.query_terms[0] = "mutated-after-return";
    input.query.registry_versions[0].artifact_id = "mutated.registry";
    expect(canonicalJson(snapshot)).toBe(original);
    expect(Object.isFrozen(snapshot)).toBe(true);
    expect(Object.isFrozen(snapshot.query)).toBe(true);
    expect(Object.isFrozen(snapshot.query.registry_versions[0])).toBe(true);
    expect(() => {
      snapshot.query.query_terms[0] = "mutated-output";
    }).toThrow(TypeError);
    expect(canonicalJson(snapshot)).toBe(original);
  });

  it("exposes only the eight Task 4 runtime functions through the package root", () => {
    const surface = learningSurface as unknown as Record<string, unknown>;
    for (const name of [
      "retrieveApprovedPatterns", "verifyRetrievalSnapshot", "createFeatureProfile", "vectorizeCandidate",
      "createDeterministicBaseline", "scoreDeterministicBaseline", "compareDeterministicBaseline", "orderBaselineCandidates",
    ]) expect(typeof surface[name]).toBe("function");
    for (const internal of [
      "task4WordTokens", "task4GraphemeCount", "task4FailContract", "verifyTask4Producer",
      "verifyTask4UnicodeRuntime", "task4AssertCanonicalGraph", "TASK4_FEATURE_ORDER",
    ]) expect(surface[internal]).toBeUndefined();
  });

  it("accepts and identity-binds a complete build-verified producer receipt", () => {
    const input = validInput();
    input.producer = buildVerifiedProducer("retrieval-snapshot");
    const snapshot = retrieveApprovedPatterns(input);
    expect(snapshot.producer_verification_ref).not.toBeNull();
    expect(snapshot.provenance).toContainEqual({
      subject_kind: "digest_ref",
      ref: snapshot.producer_verification_ref,
      relationship: "producer_verification",
    });
  });

  it("binds raw and normalized query identity and the exact five-field score", () => {
    const snapshot = retrieveApprovedPatterns(validInput());
    expect(snapshot.candidates).toHaveLength(1);
    expect(snapshot.candidates[0]!.rank).toBe(0);
    expect(snapshot.candidates[0]!.score).toEqual({
      mechanism_coverage: 1,
      problem_coverage: 1,
      context_coverage: 0,
      outcome_coverage: 0.5,
      failure_mode_coverage: 0,
      lexical_score: 0.625,
      evidence_strength_score: 0.5,
      transfer_condition_score: 1,
      total_score: 0.6375,
    });
    expect(snapshot.query_digest).toBe(snapshot.query.query_digest);
    const { snapshot_id: _id, snapshot_digest: _digest, ...identity } = snapshot;
    expect(snapshot.snapshot_id).toBe(`retrieval-snapshot.${sha256Canonical(identity)}`);
  });

  it.each([
    ["project_id", "other", "project_mismatch"],
    ["memory_scope", "organization", "memory_scope_mismatch"],
    ["product_area", "wallet", "product_area_mismatch"],
    ["journey_state", "error", "journey_state_mismatch"],
    ["channel", "mobile", "channel_mismatch"],
    ["locale", "fr", "locale_mismatch"],
    ["market", "GB", "market_mismatch"],
    ["risk", "high", "risk_mismatch"],
  ] as const)("uses the fixed exclusion precedence for %s", (field, value, reason) => {
    const input = validInput();
    Object.assign(input.query, { [field]: value });
    rehashQuery(input.query);
    expect(retrieveApprovedPatterns(input).exclusions[0]!.reason).toBe(reason);
  });

  it("keeps quarantined evidence expression-free and out of scoring and provenance", () => {
    const input = validInput();
    const evidence_ref = ref("quarantine.competitor");
    input.candidates.push({
      source_class: "competitor",
      evidence_ref,
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
    });
    const snapshot = retrieveApprovedPatterns(input);
    expect(snapshot.exclusions).toContainEqual({ subject_ref: evidence_ref, reason: "quarantined_source_class" });
    expect(canonicalJson(snapshot.provenance)).not.toContain(evidence_ref.record_id);

    (input.candidates[1] as unknown as Record<string, unknown>).expression = "borrowed words";
    expect(() => retrieveApprovedPatterns(input)).toThrow(
      "task4_contract_invalid:quarantined_expression_present",
    );
  });

  it("canonicalizes the candidate bag, permits zero hits, and keeps ties stable", () => {
    const first = validInput();
    const quarantine = {
      source_class: "third_party" as const,
      evidence_ref: ref("quarantine.third-party"),
      purpose: "retrieval_exclusion_only" as const,
      contains_expression: false as const,
    };
    first.candidates.push(quarantine);
    const second = structuredClone(first);
    second.candidates.reverse();
    expect(retrieveApprovedPatterns(first)).toEqual(retrieveApprovedPatterns(second));

    const zero = validInput();
    zero.query.product_area = "wallet";
    rehashQuery(zero.query);
    expect(retrieveApprovedPatterns(zero).candidates).toEqual([]);
  });

  it("replays the complete input and rejects a rehashed caller-authored hit", () => {
    const input = validInput();
    const snapshot = retrieveApprovedPatterns(input);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: input,
      snapshot,
    })).not.toThrow();
    const mutated = structuredClone(snapshot);
    mutated.candidates[0]!.score.total_score = 0;
    const { snapshot_id: _id, snapshot_digest: _digest, ...identity } = mutated;
    mutated.snapshot_id = `retrieval-snapshot.${sha256Canonical(identity)}`;
    const { snapshot_digest: _drop, ...content } = mutated;
    mutated.snapshot_digest = sha256Canonical(content);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: input,
      snapshot: mutated,
    })).toThrow("task4_contract_invalid:reference_binding");
  });

  it("keeps snapshot provenance ahead of numeric_nonfinite", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(retrieval_input));
    snapshot.candidates[0]!.score.total_score = Number.NaN;
    snapshot.provenance = snapshot.provenance.slice(1) as typeof snapshot.provenance;
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:provenance");

    const numericOnly = structuredClone(retrieveApprovedPatterns(retrieval_input));
    numericOnly.candidates[0]!.score.total_score = Number.NaN;
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot: numericOnly,
    })).toThrow("task4_contract_invalid:numeric_nonfinite");
  });

  it("selects supplied-snapshot reference binding before replay numeric", () => {
    const numericReplay = validInput();
    const referenceSnapshot = structuredClone(retrieveApprovedPatterns(numericReplay));
    referenceSnapshot.candidates[0]!.score.total_score = 0;
    rehashRetrievalSnapshot(referenceSnapshot);
    numericReplay.candidates[0]!.pattern.record_version = Number.NaN;
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: numericReplay,
      snapshot: referenceSnapshot,
    })).toThrow("task4_contract_invalid:reference_binding");
  });

  it("selects supplied-snapshot reference binding before supplied provenance", () => {
    const provenanceInput = validInput();
    const provenanceSnapshot = structuredClone(retrieveApprovedPatterns(provenanceInput));
    provenanceSnapshot.candidates[0]!.score.total_score = 0;
    provenanceSnapshot.provenance = provenanceSnapshot.provenance.slice(1) as typeof provenanceSnapshot.provenance;
    rehashRetrievalSnapshot(provenanceSnapshot);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: provenanceInput,
      snapshot: provenanceSnapshot,
    })).toThrow("task4_contract_invalid:reference_binding");
  });

  it("selects replay-input digest before supplied-snapshot reference binding", () => {
    const digestInput = validInput();
    const rankSnapshot = structuredClone(retrieveApprovedPatterns(digestInput));
    digestInput.query.query_digest = "0".repeat(64);
    rankSnapshot.candidates[0]!.rank = 1;
    rehashRetrievalSnapshot(rankSnapshot);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: digestInput,
      snapshot: rankSnapshot,
    })).toThrow("task4_contract_invalid:digest");
  });

  it("fails official mode before nested producer access and rejects invalid top-level shapes first", () => {
    let reads = 0;
    const official = validInput();
    official.record_mode = "official";
    Object.defineProperty(official.producer, "producer_id", {
      enumerable: true,
      get() {
        reads += 1;
        return "retrieval-snapshot";
      },
    });
    expect(() => retrieveApprovedPatterns(official)).toThrow(
      "task4_contract_invalid:official_mode_not_supported",
    );
    expect(reads).toBe(0);
    Object.defineProperty(official, "record_mode", {
      enumerable: true,
      get() {
        reads += 1;
        return "official";
      },
    });
    expect(() => retrieveApprovedPatterns(official)).toThrow("task4_contract_invalid:input_shape");
    expect(reads).toBe(0);
  });

  it("maps producer and Unicode mutations to their exact integrity codes", () => {
    const producerFault = validInput();
    producerFault.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    expect(() => retrieveApprovedPatterns(producerFault)).toThrow("task4_contract_invalid:producer_witness");

    const unicodeFault = validInput();
    unicodeFault.unicode_runtime.runtime_digest = "0".repeat(64);
    expect(() => retrieveApprovedPatterns(unicodeFault)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it.each([
    ["empty normalized term", [" "]],
    ["duplicate normalized terms", ["clear next", "CLEAR NEXT"]],
  ] as const)("classifies %s before an independent producer fault in retrieve", (_name, queryTerms) => {
    const input = validInput();
    input.query.query_terms = [...queryTerms] as [string, ...string[]];
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["empty normalized term", [" "]],
    ["duplicate normalized terms", ["clear next", "CLEAR NEXT"]],
  ] as const)("classifies %s before an independent producer fault in verify", (_name, queryTerms) => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    retrieval_input.query.query_terms = [...queryTerms] as [string, ...string[]];
    retrieval_input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies an invalid quarantined-candidate domain before expression and producer faults", () => {
    const input = validInput();
    input.candidates = [{
      source_class: "competitor",
      evidence_ref: ref("quarantine.invalid-domain"),
      purpose: "wrong_purpose",
      contains_expression: false,
      expression: "copied expression",
    } as never];
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("keeps quarantined expression aliases ahead of forbidden-field classification in retrieve and verify", () => {
    const retrieval_input = validInput();
    retrieval_input.candidates = [{
      source_class: "competitor",
      evidence_ref: ref("quarantine.overlap"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
    }];
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    (retrieval_input.candidates[0] as unknown as Record<string, unknown>).competitor_expression = "copied";
    expect(() => retrieveApprovedPatterns(structuredClone(retrieval_input))).toThrow(
      "task4_contract_invalid:quarantined_expression_present",
    );
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:quarantined_expression_present");
  });

  it("defers retained candidate-set replay claims contaminated only by a quarantined expression", () => {
    const retrieval_input = validInput();
    retrieval_input.candidates = [{
      source_class: "competitor",
      evidence_ref: ref("quarantine.verify-plain-expression"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
    }];
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    (retrieval_input.candidates[0] as unknown as Record<string, unknown>).expression = "copied";
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:quarantined_expression_present");
  });

  it("exhausts query Unicode validity before an independent approved-pattern digest fault", () => {
    const input = validInput();
    input.query.query_terms = ["\ud800"];
    (input.candidates[0] as ApprovedRetrievalCandidate).pattern.content_digest = "0".repeat(64);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it.each([
    ["pattern mechanism", (candidate: ApprovedRetrievalCandidate) => {
      candidate.pattern.payload.mechanism = "\ud800";
    }],
    ["projection mechanism", (candidate: ApprovedRetrievalCandidate) => {
      candidate.projection.mechanism_text[0] = "\ud800";
    }],
    ["projection-evidence outcome", (candidate: ApprovedRetrievalCandidate) => {
      candidate.projection_evidence.outcome_text[0] = "\ud800";
    }],
  ] as const)("exhausts approved-candidate Unicode for %s before stale digests", (_name, mutate) => {
    const input = validInput();
    mutate(input.candidates[0] as ApprovedRetrievalCandidate);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:unicode_runtime");
  });

  it("defers scalar-set ordering when a member is not valid Unicode", () => {
    const input = validInput();
    (input.candidates[0] as ApprovedRetrievalCandidate).pattern.payload.contexts[0]!.journeys = [
      "\ud800",
      "a",
    ];
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("validates the retained snapshot query before replay producer work", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.query.query_terms = [" "];
    retrieval_input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:canonical_value");
  });

  it("validates the retained snapshot query digest before reference replay", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.query.query_digest = "0".repeat(64);
    rehashRetrievalSnapshot(snapshot);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:digest");
  });

  it("defers a nonfinite retained candidate rank to numeric_nonfinite", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.candidates[0]!.rank = Number.NaN;
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:numeric_nonfinite");
  });

  it.each([
    ["runtime contract", (input: RetrievalInput) => { input.unicode_runtime.contract_version = 7 as never; }],
    ["bundle contract", (input: RetrievalInput) => { input.unicode_runtime.unicode_bundle.contract_version = 7 as never; }],
  ] as const)("classifies an invalid %s before a producer fault", (_name, mutate) => {
    const input = validInput();
    mutate(input);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("classifies duplicate retained registry bindings before producer replay", () => {
    const retrieval_input = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrieval_input)));
    snapshot.registry_versions.push(structuredClone(snapshot.registry_versions[0]!));
    retrieval_input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input,
      snapshot,
    })).toThrow("task4_contract_invalid:canonical_value");
  });

  it.each([
    ["receipt verified_at", (producer: Task4ProducerArtifactWitness) => {
      if (producer.verification_receipt === null) throw new Error("missing receipt");
      producer.verification_receipt.payload.verified_at = 7 as never;
    }],
    ["receipt record_version", (producer: Task4ProducerArtifactWitness) => {
      if (producer.verification_receipt === null) throw new Error("missing receipt");
      producer.verification_receipt.record_version = "x" as never;
    }],
  ] as const)("classifies invalid %s as canonical before producer verification", (_name, mutate) => {
    const input = validInput();
    input.producer = buildVerifiedProducer("retrieval-snapshot");
    mutate(input.producer);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("defers a nonfinite producer-receipt record version to numeric_nonfinite", () => {
    const input = validInput();
    input.producer = buildVerifiedProducer("retrieval-snapshot");
    if (input.producer.verification_receipt === null) throw new Error("missing receipt");
    input.producer.verification_receipt.record_version = Number.NaN;
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:numeric_nonfinite");
  });

  it.each([
    ["empty counterexamples", (pattern: Task4ContentPatternRecord) => { pattern.payload.counterexamples = []; }],
    ["empty failure modes", (pattern: Task4ContentPatternRecord) => { pattern.payload.failure_modes = []; }],
    ["empty transfer conditions", (pattern: Task4ContentPatternRecord) => { pattern.payload.transfer_conditions = []; }],
    ["empty non-transferable details", (pattern: Task4ContentPatternRecord) => { pattern.payload.non_transferable_details = []; }],
    ["duplicate source refs", (pattern: Task4ContentPatternRecord) => {
      pattern.payload.source_refs.push(pattern.payload.source_refs[0]!);
    }],
    ["empty context dimension", (pattern: Task4ContentPatternRecord) => { pattern.payload.contexts[0]!.journeys = []; }],
    ["invalid transfer field", (pattern: Task4ContentPatternRecord) => {
      pattern.payload.transfer_conditions[0]!.field = "unknown";
    }],
    ["empty transfer values", (pattern: Task4ContentPatternRecord) => {
      pattern.payload.transfer_conditions[0]!.values = [];
    }],
    ["wrong record version", (pattern: Task4ContentPatternRecord) => { pattern.record_version = 2; }],
    ["invalid provenance record id", (pattern: Task4ContentPatternRecord) => {
      pattern.provenance = [{
        record_id: "INVALID RECORD",
        relationship: "source",
        content_digest: sha256Canonical({ fixture: "invalid-provenance" }),
      }];
    }],
    ["noncanonical source refs", (pattern: Task4ContentPatternRecord) => {
      pattern.payload.source_refs = ["source.\u{10000}", "source.\uE000"];
    }],
    ["noncanonical context journeys", (pattern: Task4ContentPatternRecord) => {
      pattern.payload.contexts[0]!.journeys = ["journey.\u{10000}", "journey.\uE000"];
    }],
  ] as const)("matches the registered ContentPattern schema for %s", (_name, mutate) => {
    const input = validInput();
    mutate((input.candidates[0] as ApprovedRetrievalCandidate).pattern);
    input.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:canonical_value");
  });

  it("selects producer_witness before quarantine and numeric faults", () => {
    const numeric = validInput();
    numeric.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    numeric.candidates[0]!.pattern.record_version = Number.NaN;
    expect(() => retrieveApprovedPatterns(numeric)).toThrow("task4_contract_invalid:producer_witness");

    const quarantined = validInput();
    quarantined.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push("packages/learning/src/ghost.ts");
    quarantined.candidates = [{
      source_class: "competitor",
      evidence_ref: ref("quarantine.precedence"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
      expression: "forbidden copied text",
    } as never];
    expect(() => retrieveApprovedPatterns(quarantined)).toThrow("task4_contract_invalid:producer_witness");
  });

  it("keeps quarantine and forbidden input ahead of numeric_nonfinite", () => {
    const numericOnly = validInput();
    numericOnly.candidates[0]!.pattern.record_version = Number.NaN;
    expect(() => retrieveApprovedPatterns(numericOnly)).toThrow(
      "task4_contract_invalid:numeric_nonfinite",
    );

    const quarantined = validInput();
    quarantined.candidates[0]!.pattern.record_version = Number.NaN;
    quarantined.candidates.push({
      source_class: "competitor",
      evidence_ref: ref("quarantine.numeric-last"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
      expression: "forbidden copied text",
    } as never);
    expect(() => retrieveApprovedPatterns(quarantined)).toThrow(
      "task4_contract_invalid:quarantined_expression_present",
    );

    const forbidden = validInput();
    forbidden.candidates[0]!.pattern.record_version = Number.NaN;
    (forbidden.unicode_runtime.runtime_profile as unknown as Record<string, unknown>).actor_identity = "forbidden";
    expect(() => retrieveApprovedPatterns(forbidden)).toThrow(
      "task4_contract_invalid:forbidden_input_field",
    );
  });

  it("selects an approved-pattern digest fault before quarantined expression evidence", () => {
    const input = validInput();
    input.candidates[0]!.pattern.content_digest = "0".repeat(64);
    input.candidates.push({
      source_class: "competitor",
      evidence_ref: ref("quarantine.digest-precedence"),
      purpose: "retrieval_exclusion_only",
      contains_expression: false,
      expression: "forbidden copied text",
    } as never);
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:digest");
  });

  it("selects a later candidate digest before an earlier candidate reference fault", () => {
    const input = validInput();
    const first = approvedCandidate();
    const second = approvedCandidate();
    first.projection.pattern_ref = ref("reference.fault");
    const { projection_id: _oldId, projection_digest: _oldDigest, ...projectionIdentity } = first.projection;
    first.projection.projection_id = `retrieval-projection.${sha256Canonical(projectionIdentity)}`;
    const { projection_digest: _drop, ...projectionContent } = first.projection;
    first.projection.projection_digest = sha256Canonical(projectionContent);
    second.pattern.content_digest = "0".repeat(64);
    input.candidates = [first, second];
    expect(() => retrieveApprovedPatterns(input)).toThrow("task4_contract_invalid:digest");
  });

  it("selects replay producer_witness before a stale supplied snapshot digest", () => {
    const retrievalInput = validInput();
    const snapshot = structuredClone(retrieveApprovedPatterns(structuredClone(retrievalInput)));
    retrievalInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
      "packages/learning/src/ghost.ts",
    );
    snapshot.snapshot_digest = "0".repeat(64);
    expect(() => verifyRetrievalSnapshot({
      record_mode: "development_fixture",
      retrieval_input: retrievalInput,
      snapshot,
    })).toThrow("task4_contract_invalid:producer_witness");
  });

  it.each(["retrieve", "verify"] as const)(
    "selects complete nested canonical shape before every producer for %s",
    (operation) => {
      const cleanInput = validInput();
      const snapshot = retrieveApprovedPatterns(structuredClone(cleanInput));
      const retrievalInput = structuredClone(cleanInput);
      (retrievalInput.query as typeof retrievalInput.query & { extra?: boolean }).extra = true;
      retrievalInput.producer.dependency_manifest.entries[0]!.runtime_dependency_paths.push(
        "packages/learning/src/ghost.ts",
      );
      const invoke = operation === "retrieve"
        ? () => retrieveApprovedPatterns(retrievalInput)
        : () => verifyRetrievalSnapshot({
            record_mode: "development_fixture",
            retrieval_input: retrievalInput,
            snapshot,
          });
      expect(invoke).toThrow("task4_contract_invalid:canonical_value");
    },
  );
});
