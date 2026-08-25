import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  PublicProductContractError,
  assertClosedPlainRecord,
  compareUnicodeScalar,
  immutableClone,
  type PublicProductDigestRef,
} from "./public-product-contracts.js";
import {
  verifyPublicProductReviewPair,
  type PublicProductReviewGovernanceEvidence,
} from "./public-product-review.js";

export const PUBLIC_PRODUCT_COVERAGE_SLOTS = Object.freeze([
  "entry_onboarding",
  "core_task_commitment",
  "pending_progress",
  "success",
  "error_recovery",
  "destructive_permission_support",
] as const);

export interface RawStructuralSignature {
  journey: string;
  event_state: string;
  content_slot_type: string;
  surface_channel: string;
}

export interface NormalizedStructuralSignature {
  coverage_slot_id: typeof PUBLIC_PRODUCT_COVERAGE_SLOTS[number];
  journey_family_id: string;
  state_class_id: string;
  content_slot_class_id: string;
  surface_channel_id: string;
}

export interface PublicProductTaxonomyDefinition {
  definition_id: string;
  display_name: string;
  description: string;
  inclusion_rule: string;
  exclusion_rule: string;
  counterexample_refs: readonly PublicProductDigestRef[];
  definition_digest: string;
}

export interface ExperienceMapping {
  mapping_id: string;
  raw_signature: RawStructuralSignature;
  normalized_signature: NormalizedStructuralSignature;
  rationale: string;
  counterexample_refs: readonly PublicProductDigestRef[];
  mapping_material_digest: string;
  review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  mapping_digest: string;
}

export interface PublicProductExperienceTaxonomy {
  contract_version: "contentmd.public-product-experience-taxonomy/0.1.0";
  taxonomy_id: string;
  taxonomy_version: string;
  previous_taxonomy_ref: PublicProductDigestRef | null;
  effective_at: string;
  coverage_slots: readonly PublicProductTaxonomyDefinition[];
  journey_families: readonly PublicProductTaxonomyDefinition[];
  state_classes: readonly PublicProductTaxonomyDefinition[];
  content_slot_classes: readonly PublicProductTaxonomyDefinition[];
  surface_channels: readonly PublicProductTaxonomyDefinition[];
  mappings: readonly ExperienceMapping[];
  mapping_review_receipt_refs: readonly PublicProductDigestRef[];
  taxonomy_review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  taxonomy_material_digest: string;
  classification_effect: "corpus_projection_only";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  taxonomy_digest: string;
}

export interface PublicProductTaxonomyProposal {
  contract_version: "contentmd.public-product-taxonomy-proposal/0.1.0";
  proposal_id: string;
  active_taxonomy_ref: PublicProductDigestRef | null;
  raw_signature: RawStructuralSignature;
  proposed_signature: NormalizedStructuralSignature;
  evidence_refs: readonly PublicProductDigestRef[];
  counterexample_refs: readonly PublicProductDigestRef[];
  proposer_kind: "deterministic_rule" | "human" | "ml_suggestion";
  proposer_artifact_refs: readonly PublicProductDigestRef[];
  confidence: number;
  review_state: "unreviewed";
  classification_effect: "none";
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  proposal_digest: string;
}

export interface VerifiedExperienceTaxonomy {
  taxonomy: PublicProductExperienceTaxonomy;
  by_raw_signature_digest: ReadonlyMap<string, ExperienceMapping>;
  taxonomy_ref: PublicProductDigestRef;
}

const ROOT_KEYS = Object.freeze([
  "contract_version", "taxonomy_id", "taxonomy_version", "previous_taxonomy_ref",
  "effective_at", "coverage_slots", "journey_families", "state_classes",
  "content_slot_classes", "surface_channels", "mappings", "mapping_review_receipt_refs",
  "taxonomy_review_receipt_refs", "taxonomy_material_digest", "classification_effect",
  "authority_effect", "prompt_eligibility", "training_eligibility", "benchmark_eligibility",
  "taxonomy_digest",
]);
const DEFINITION_KEYS = Object.freeze([
  "definition_id", "display_name", "description", "inclusion_rule", "exclusion_rule",
  "counterexample_refs", "definition_digest",
]);
const MAPPING_KEYS = Object.freeze([
  "mapping_id", "raw_signature", "normalized_signature", "rationale", "counterexample_refs",
  "mapping_material_digest", "review_receipt_refs", "mapping_digest",
]);
const RAW_KEYS = Object.freeze(["journey", "event_state", "content_slot_type", "surface_channel"]);
const NORMALIZED_KEYS = Object.freeze([
  "coverage_slot_id", "journey_family_id", "state_class_id", "content_slot_class_id",
  "surface_channel_id",
]);

function fail(code: ConstructorParameters<typeof PublicProductContractError>[0], detail?: string): never {
  throw new PublicProductContractError(code, detail);
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.length > 0;
}

function digest(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{64}$/u.test(value);
}

function time(value: unknown): number | null {
  if (!text(value)) return null;
  const parsed = Date.parse(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function same(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function without<T extends object>(value: T, key: string): Record<string, unknown> {
  return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key));
}

function assertRef(value: unknown, path: string): asserts value is PublicProductDigestRef {
  assertClosedPlainRecord(value, ["object_id", "object_digest"], path);
  if (!text(value.object_id) || !digest(value.object_digest)) fail("canonical_value", path);
}

function refKey(value: PublicProductDigestRef): string {
  return `${value.object_id}\u0000${value.object_digest}`;
}

function assertCanonicalRefs(values: unknown, path: string, allowEmpty = true): asserts values is readonly PublicProductDigestRef[] {
  if (!Array.isArray(values) || (!allowEmpty && values.length === 0)) fail("canonical_value", path);
  for (const value of values) assertRef(value, path);
  const keys = values.map(refKey);
  const sorted = [...keys].sort(compareUnicodeScalar);
  if (new Set(keys).size !== keys.length || !same(keys, sorted)) fail("canonical_value", path);
}

function assertRaw(value: unknown): asserts value is RawStructuralSignature {
  assertClosedPlainRecord(value, RAW_KEYS, "raw_signature");
  if (!RAW_KEYS.every((key) => text(value[key]))) fail("canonical_value", "raw_signature");
}

function assertNormalized(value: unknown): asserts value is NormalizedStructuralSignature {
  assertClosedPlainRecord(value, NORMALIZED_KEYS, "normalized_signature");
  if (!NORMALIZED_KEYS.every((key) => text(value[key]))
    || !PUBLIC_PRODUCT_COVERAGE_SLOTS.includes(
      value.coverage_slot_id as typeof PUBLIC_PRODUCT_COVERAGE_SLOTS[number],
    )) fail("canonical_value", "normalized_signature");
}

function assertDefinition(value: unknown): asserts value is PublicProductTaxonomyDefinition {
  assertClosedPlainRecord(value, DEFINITION_KEYS, "definition");
  if (!text(value.definition_id) || !text(value.display_name) || !text(value.description)
    || !text(value.inclusion_rule) || !text(value.exclusion_rule)
    || !digest(value.definition_digest)) fail("canonical_value", "definition");
  assertCanonicalRefs(value.counterexample_refs, "definition.counterexample_refs");
}

function assertMapping(value: unknown): asserts value is ExperienceMapping {
  assertClosedPlainRecord(value, MAPPING_KEYS, "mapping");
  if (!text(value.mapping_id) || !text(value.rationale)
    || !digest(value.mapping_material_digest) || !digest(value.mapping_digest)
    || !Array.isArray(value.review_receipt_refs) || value.review_receipt_refs.length !== 2) {
    fail("canonical_value", "mapping");
  }
  assertRaw(value.raw_signature);
  assertNormalized(value.normalized_signature);
  assertCanonicalRefs(value.counterexample_refs, "mapping.counterexample_refs");
  for (const receiptRef of value.review_receipt_refs) assertRef(receiptRef, "mapping.review_receipt_ref");
}

function assertDefinitionArray(
  values: unknown,
  path: string,
  exactOrder?: readonly string[],
): asserts values is readonly PublicProductTaxonomyDefinition[] {
  if (!Array.isArray(values) || values.length === 0) fail("canonical_value", path);
  for (const value of values) assertDefinition(value);
  const ids = values.map((value) => value.definition_id);
  const expected = exactOrder ?? [...ids].sort(compareUnicodeScalar);
  if (new Set(ids).size !== ids.length || !same(ids, expected)) fail("canonical_value", path);
}

function taxonomyMaterial(taxonomy: PublicProductExperienceTaxonomy) {
  return {
    contract_version: taxonomy.contract_version,
    taxonomy_version: taxonomy.taxonomy_version,
    previous_taxonomy_ref: taxonomy.previous_taxonomy_ref,
    effective_at: taxonomy.effective_at,
    coverage_slots: taxonomy.coverage_slots,
    journey_families: taxonomy.journey_families,
    state_classes: taxonomy.state_classes,
    content_slot_classes: taxonomy.content_slot_classes,
    surface_channels: taxonomy.surface_channels,
    mappings: taxonomy.mappings,
  };
}

function assertRootShape(value: unknown): asserts value is PublicProductExperienceTaxonomy {
  assertClosedPlainRecord(value, ROOT_KEYS, "taxonomy");
  if (value.contract_version !== "contentmd.public-product-experience-taxonomy/0.1.0"
    || !text(value.taxonomy_id) || !text(value.taxonomy_version) || time(value.effective_at) === null
    || !Array.isArray(value.mappings) || value.mappings.length === 0
    || !Array.isArray(value.taxonomy_review_receipt_refs)
    || value.taxonomy_review_receipt_refs.length !== 2
    || !digest(value.taxonomy_material_digest) || !digest(value.taxonomy_digest)
    || value.classification_effect !== "corpus_projection_only"
    || value.authority_effect !== "none" || value.prompt_eligibility !== "never"
    || value.training_eligibility !== "never" || value.benchmark_eligibility !== false) {
    fail("canonical_value", "taxonomy");
  }
  if (value.previous_taxonomy_ref !== null) assertRef(value.previous_taxonomy_ref, "previous_taxonomy_ref");
  assertDefinitionArray(value.coverage_slots, "coverage_slots", PUBLIC_PRODUCT_COVERAGE_SLOTS);
  assertDefinitionArray(value.journey_families, "journey_families");
  assertDefinitionArray(value.state_classes, "state_classes");
  assertDefinitionArray(value.content_slot_classes, "content_slot_classes");
  assertDefinitionArray(value.surface_channels, "surface_channels");
  for (const mapping of value.mappings) assertMapping(mapping);
  const mappingIds = value.mappings.map((mapping) => mapping.mapping_id);
  if (new Set(mappingIds).size !== mappingIds.length
    || !same(mappingIds, [...mappingIds].sort(compareUnicodeScalar))) fail("canonical_value", "mappings");
  assertCanonicalRefs(value.mapping_review_receipt_refs, "mapping_review_receipt_refs", false);
  for (const receiptRef of value.taxonomy_review_receipt_refs) {
    assertRef(receiptRef, "taxonomy_review_receipt_ref");
  }
}

function assertDefinitionDigest(definition: PublicProductTaxonomyDefinition): void {
  if (definition.definition_digest !== sha256Canonical(without(definition, "definition_digest"))) {
    fail("digest");
  }
}

function assertMappingDigest(mapping: ExperienceMapping): void {
  const material = {
    raw_signature: mapping.raw_signature,
    normalized_signature: mapping.normalized_signature,
    rationale: mapping.rationale,
    counterexample_refs: mapping.counterexample_refs,
  };
  const materialDigest = sha256Canonical(material);
  const identity = {
    mapping_material_digest: materialDigest,
    review_receipt_refs: mapping.review_receipt_refs,
  };
  if (mapping.mapping_material_digest !== materialDigest
    || mapping.mapping_id !== `experience-mapping.${sha256Canonical(identity)}`
    || mapping.mapping_digest !== sha256Canonical(without(mapping, "mapping_digest"))) fail("digest");
}

function readonlyMap<K, V>(source: Map<K, V>): ReadonlyMap<K, V> {
  let view: ReadonlyMap<K, V>;
  view = Object.freeze({
    get size() {
      return source.size;
    },
    get: (key: K) => source.get(key),
    has: (key: K) => source.has(key),
    entries: () => source.entries(),
    keys: () => source.keys(),
    values: () => source.values(),
    forEach: (
      callback: (value: V, key: K, map: ReadonlyMap<K, V>) => void,
      thisArg?: unknown,
    ) => source.forEach((value, key) => callback.call(thisArg, value, key, view)),
    [Symbol.iterator]: () => source[Symbol.iterator](),
  });
  return view;
}

export function verifyPublicProductExperienceTaxonomy(input: {
  taxonomy: PublicProductExperienceTaxonomy;
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): VerifiedExperienceTaxonomy {
  assertClosedPlainRecord(input, ["taxonomy", "governance", "as_of", "verification_mode"], "input");
  assertRootShape(input.taxonomy);
  if (time(input.as_of) === null || input.governance.as_of !== input.as_of
    || (input.verification_mode !== "development_fixture" && input.verification_mode !== "official")) {
    fail("canonical_value");
  }
  for (const definition of [
    ...input.taxonomy.coverage_slots, ...input.taxonomy.journey_families,
    ...input.taxonomy.state_classes, ...input.taxonomy.content_slot_classes,
    ...input.taxonomy.surface_channels,
  ]) assertDefinitionDigest(definition);
  for (const mapping of input.taxonomy.mappings) assertMappingDigest(mapping);
  const materialDigest = sha256Canonical(taxonomyMaterial(input.taxonomy));
  const identity = {
    taxonomy_material_digest: materialDigest,
    mapping_review_receipt_refs: input.taxonomy.mapping_review_receipt_refs,
    taxonomy_review_receipt_refs: input.taxonomy.taxonomy_review_receipt_refs,
  };
  if (input.taxonomy.taxonomy_material_digest !== materialDigest
    || input.taxonomy.taxonomy_id !== `public-product-experience-taxonomy.${sha256Canonical(identity)}`
    || input.taxonomy.taxonomy_digest !== sha256Canonical(without(input.taxonomy, "taxonomy_digest"))) {
    fail("digest");
  }
  const rawKeys = input.taxonomy.mappings.map((mapping) => sha256Canonical(mapping.raw_signature));
  if (new Set(rawKeys).size !== rawKeys.length) fail("taxonomy_invalid", "duplicate_raw_signature");
  const definitionSets = {
    coverage: new Set(input.taxonomy.coverage_slots.map((item) => item.definition_id)),
    journey: new Set(input.taxonomy.journey_families.map((item) => item.definition_id)),
    state: new Set(input.taxonomy.state_classes.map((item) => item.definition_id)),
    content: new Set(input.taxonomy.content_slot_classes.map((item) => item.definition_id)),
    channel: new Set(input.taxonomy.surface_channels.map((item) => item.definition_id)),
  };
  for (const mapping of input.taxonomy.mappings) {
    const signature = mapping.normalized_signature;
    if (!definitionSets.coverage.has(signature.coverage_slot_id)
      || !definitionSets.journey.has(signature.journey_family_id)
      || !definitionSets.state.has(signature.state_class_id)
      || !definitionSets.content.has(signature.content_slot_class_id)
      || !definitionSets.channel.has(signature.surface_channel_id)) fail("taxonomy_invalid", "definition_ref");
    verifyPublicProductReviewPair({
      kind: "taxonomy_mapping",
      subject_ref: ref(`mapping-material.${mapping.mapping_material_digest}`, mapping.mapping_material_digest),
      receipt_refs: mapping.review_receipt_refs,
      required_roles: ["qualified_content_designer", "taxonomy_steward"],
      governance: input.governance,
      verification_mode: input.verification_mode,
    });
  }
  const expectedMappingReviewRefs = input.taxonomy.mappings
    .flatMap((mapping) => [...mapping.review_receipt_refs])
    .sort((left, right) => compareUnicodeScalar(refKey(left), refKey(right)));
  if (!same(expectedMappingReviewRefs, input.taxonomy.mapping_review_receipt_refs)) {
    fail("reference_binding", "mapping_review_union");
  }
  verifyPublicProductReviewPair({
    kind: "taxonomy_version",
    subject_ref: ref(`taxonomy-material.${materialDigest}`, materialDigest),
    receipt_refs: input.taxonomy.taxonomy_review_receipt_refs,
    required_roles: ["qualified_content_designer", "taxonomy_steward"],
    governance: input.governance,
    verification_mode: input.verification_mode,
  });
  if (time(input.taxonomy.effective_at)! > time(input.as_of)!) fail("taxonomy_invalid", "not_effective");
  const taxonomy = immutableClone(input.taxonomy) as PublicProductExperienceTaxonomy;
  const byRaw = new Map<string, ExperienceMapping>();
  for (const mapping of taxonomy.mappings) byRaw.set(sha256Canonical(mapping.raw_signature), mapping);
  return Object.freeze({
    taxonomy,
    by_raw_signature_digest: readonlyMap(byRaw),
    taxonomy_ref: Object.freeze(ref(taxonomy.taxonomy_id, taxonomy.taxonomy_digest)),
  });
}

export function normalizePublicProductSignature(
  taxonomy: VerifiedExperienceTaxonomy,
  raw: RawStructuralSignature,
): NormalizedStructuralSignature | null {
  assertRaw(raw);
  const mapping = taxonomy.by_raw_signature_digest.get(sha256Canonical(raw));
  return mapping === undefined
    ? null
    : immutableClone(mapping.normalized_signature) as NormalizedStructuralSignature;
}

export function createTaxonomyProposal(input: {
  active_taxonomy_ref: PublicProductDigestRef | null;
  raw_signature: RawStructuralSignature;
  proposed_signature: NormalizedStructuralSignature;
  evidence_refs: readonly PublicProductDigestRef[];
  counterexample_refs: readonly PublicProductDigestRef[];
  proposer_kind: "deterministic_rule" | "human" | "ml_suggestion";
  proposer_artifact_refs: readonly PublicProductDigestRef[];
  confidence: number;
}): PublicProductTaxonomyProposal {
  assertClosedPlainRecord(input, [
    "active_taxonomy_ref", "raw_signature", "proposed_signature", "evidence_refs",
    "counterexample_refs", "proposer_kind", "proposer_artifact_refs", "confidence",
  ], "input");
  if (input.active_taxonomy_ref !== null) assertRef(input.active_taxonomy_ref, "active_taxonomy_ref");
  assertRaw(input.raw_signature);
  assertNormalized(input.proposed_signature);
  assertCanonicalRefs(input.evidence_refs, "evidence_refs", false);
  assertCanonicalRefs(input.counterexample_refs, "counterexample_refs");
  assertCanonicalRefs(input.proposer_artifact_refs, "proposer_artifact_refs");
  if (!Number.isFinite(input.confidence) || input.confidence < 0 || input.confidence > 1
    || !["deterministic_rule", "human", "ml_suggestion"].includes(input.proposer_kind)
    || (input.proposer_kind === "ml_suggestion" && input.proposer_artifact_refs.length !== 3)
    || (input.proposer_kind !== "ml_suggestion" && input.proposer_artifact_refs.length !== 0)) {
    fail("canonical_value", "proposal");
  }
  const identityMaterial = {
    contract_version: "contentmd.public-product-taxonomy-proposal/0.1.0" as const,
    ...structuredClone(input),
    review_state: "unreviewed" as const,
    classification_effect: "none" as const,
    authority_effect: "none" as const,
    prompt_eligibility: "never" as const,
    training_eligibility: "never" as const,
    benchmark_eligibility: false as const,
  };
  const preimage = {
    contract_version: identityMaterial.contract_version,
    proposal_id: `public-product-taxonomy-proposal.${sha256Canonical(identityMaterial)}`,
    active_taxonomy_ref: identityMaterial.active_taxonomy_ref,
    raw_signature: identityMaterial.raw_signature,
    proposed_signature: identityMaterial.proposed_signature,
    evidence_refs: identityMaterial.evidence_refs,
    counterexample_refs: identityMaterial.counterexample_refs,
    proposer_kind: identityMaterial.proposer_kind,
    proposer_artifact_refs: identityMaterial.proposer_artifact_refs,
    confidence: identityMaterial.confidence,
    review_state: identityMaterial.review_state,
    classification_effect: identityMaterial.classification_effect,
    authority_effect: identityMaterial.authority_effect,
    prompt_eligibility: identityMaterial.prompt_eligibility,
    training_eligibility: identityMaterial.training_eligibility,
    benchmark_eligibility: identityMaterial.benchmark_eligibility,
  };
  return immutableClone({ ...preimage, proposal_digest: sha256Canonical(preimage) }) as PublicProductTaxonomyProposal;
}

function ref(objectId: string, objectDigest: string): PublicProductDigestRef {
  return { object_id: objectId, object_digest: objectDigest };
}
