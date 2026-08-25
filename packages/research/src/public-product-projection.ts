import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  PublicProductContractError,
  assertClosedPlainRecord,
  compareUnicodeScalar,
  immutableClone,
  sha256Bytes,
  type PublicProductDigestRef,
} from "./public-product-contracts.js";
import {
  derivePublicEvidenceSubjectRef,
  verifyPublicEvidenceDispositionLedger,
  type PublicEvidenceDispositionEvent,
  type PublicEvidenceDispositionSet,
  type PublicEvidenceSubjectRef,
} from "./public-evidence-disposition.js";
import type { PublicProductReviewGovernanceEvidence } from "./public-product-review.js";
import {
  normalizePublicProductSignature,
  verifyPublicProductExperienceTaxonomy,
  type NormalizedStructuralSignature,
  type PublicProductExperienceTaxonomy,
  type RawStructuralSignature,
} from "./public-product-taxonomy.js";

export interface PublicProductBatchBytes {
  batch_id: string;
  source_lines: readonly Uint8Array[];
  observation_lines: readonly Uint8Array[];
}

export interface PublicProductCorpusTargets {
  companies: number;
  products: number;
  industries: number;
  direct_states_per_product: number;
}

export interface VerifyPublicProductCorpusV2Input {
  batches: readonly PublicProductBatchBytes[];
  industry_taxonomy_bytes: Uint8Array;
  taxonomy: PublicProductExperienceTaxonomy | null;
  disposition_sets: readonly PublicEvidenceDispositionSet[];
  disposition_events: readonly PublicEvidenceDispositionEvent[];
  review_governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  targets: PublicProductCorpusTargets;
  verification_mode: "development_fixture" | "official";
}

export interface PublicProductRawCounts { batches: number; sources: number; observations: number }
export interface PublicProductActiveCounts {
  active_sources: number; active_observations: number; held_subjects: number;
  rejected_subjects: number; superseded_subjects: number; qualified_sources: number;
  qualified_observations: number; companies: number; products: number; industries: number;
}
export interface PublicProductCoverageCounts {
  mapped_observations: number; unmapped_observations: number;
  raw_distinct_signatures: number; normalized_distinct_signatures: number;
  direct_observed_slots: number; products_with_direct_observations: number;
  products_meeting_direct_state_target: number;
}
export interface PublicProductCorpusError { code: string; location: string; detail: string }
export interface NormalizedPublicProductEvidence {
  observation_subject_ref: PublicEvidenceSubjectRef;
  source_subject_ref: PublicEvidenceSubjectRef;
  company: string;
  product_system: string;
  normalized_industry_id: string;
  raw_signature: RawStructuralSignature;
  normalized_signature: NormalizedStructuralSignature;
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
}
export interface PublicProductCorpusReportV2 {
  contract_version: "contentmd.public-product-corpus-report/0.2.0";
  status: "pass" | "fail";
  accepted_projection_ref: PublicProductDigestRef | null;
  taxonomy_ref: PublicProductDigestRef | null;
  disposition_ledger_ref: PublicProductDigestRef;
  review_governance_ref: PublicProductDigestRef;
  raw_counts: PublicProductRawCounts;
  active_counts: PublicProductActiveCounts;
  coverage_counts: PublicProductCoverageCounts;
  active_qualified_evidence: readonly NormalizedPublicProductEvidence[];
  errors: readonly PublicProductCorpusError[];
  authority_effect: "none";
  prompt_eligibility: "never";
  training_eligibility: "never";
  benchmark_eligibility: false;
  report_digest: string;
}

type BoundSubject = { ref: PublicEvidenceSubjectRef; location: string; value: Record<string, unknown>; canonical_line: boolean };
const SOURCE_KEYS = ["source_id", "company", "product_system", "industry", "source_url", "canonical_url", "accessed_at", "source_class", "title", "publisher", "access_method", "rights_boundary", "freshness"] as const;
const OBSERVATION_KEYS = ["observation_id", "source_id", "company", "product_system", "industry_stratum", "product_area", "journey", "event_state", "trigger", "user_goal", "system_status", "consequence_risk", "surface_channel", "locale_market", "content_slot_type", "exact_wording_span", "visible_action_recovery", "terminology_entities", "content_object_schema_hypothesis", "accessibility_localization_evidence", "provenance_freshness", "access_rights_boundary", "observed_vs_inferred", "evidence_strength", "authority_effect", "prompt_eligibility", "training_eligibility", "benchmark_eligibility"] as const;
const SOURCE_CLASSES = new Set(["actual UI", "official content guidance", "official community"]);
const EVIDENCE_STRENGTHS = new Set(["high", "medium", "low"]);

function text(value: unknown): value is string { return typeof value === "string" && value.trim() !== ""; }
function subjectKey(value: PublicEvidenceSubjectRef): string { return `${value.batch_id}\0${value.record_kind}\0${value.record_id}\0${value.record_digest}`; }
function productKey(value: Record<string, unknown>): string { return `${value.company}\0${value.product_system}`; }
function add(errors: PublicProductCorpusError[], code: string, location: string, detail: string): void { errors.push({ code, location, detail }); }
function https(value: unknown): boolean {
  if (typeof value !== "string") return false;
  try { const url = new URL(value); return url.protocol === "https:" && url.hash === ""; } catch { return false; }
}
function wordCount(value: unknown): number { return typeof value === "string" && value.trim() !== "" ? value.trim().split(/\s+/u).length : 0; }
function same(left: unknown, right: unknown): boolean { return canonicalJson(left) === canonicalJson(right); }
function ref(id: string, digest: string): PublicProductDigestRef { return { object_id: id, object_digest: digest }; }

function exactShallow(value: unknown, keys: readonly string[], path: string): asserts value is Record<string, unknown> {
  if (value === null || typeof value !== "object" || Array.isArray(value)
    || (Object.getPrototypeOf(value) !== Object.prototype && Object.getPrototypeOf(value) !== null)) {
    throw new PublicProductContractError("input_shape", path);
  }
  const own = Reflect.ownKeys(value);
  if (own.length !== keys.length || keys.some((key) => !own.includes(key))) throw new PublicProductContractError("input_shape", path);
  for (const key of own) {
    const descriptor = Object.getOwnPropertyDescriptor(value, key);
    if (typeof key !== "string" || descriptor === undefined || !descriptor.enumerable || !("value" in descriptor)) throw new PublicProductContractError("input_shape", path);
  }
}

function parseLine(batchId: string, kind: "source" | "observation", bytes: Uint8Array, index: number): BoundSubject {
  if (!(bytes instanceof Uint8Array) || bytes.at(-1) !== 0x0a) throw new PublicProductContractError("canonical_value", "jsonl_line");
  let value: unknown;
  try { value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { throw new PublicProductContractError("canonical_value", "jsonl_line"); }
  if (value === null || typeof value !== "object" || Array.isArray(value)) throw new PublicProductContractError("canonical_value", "jsonl_line");
  const record = value as Record<string, unknown>;
  const id = record[kind === "source" ? "source_id" : "observation_id"];
  if (!text(id)) throw new PublicProductContractError("canonical_value", "record_id");
  const subject = derivePublicEvidenceSubjectRef({ batch_id: batchId, record_kind: kind, record_id: id, exact_line_bytes: bytes });
  const decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  return { ref: subject, location: `${batchId}/${kind === "source" ? "sources" : "observations"}.jsonl:${index + 1}`, value: record, canonical_line: canonicalJson(record) === decoded };
}

function parseIndustryTaxonomy(bytes: Uint8Array): Map<string, string> {
  let value: unknown;
  try { value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)); } catch { throw new PublicProductContractError("taxonomy_invalid", "industry_taxonomy"); }
  assertClosedPlainRecord(value, ["contract_version", "industries", "authority_effect"], "industry_taxonomy");
  if (value.contract_version !== "contentmd.public-product-industry-taxonomy/0.1.0" || value.authority_effect !== "none" || !Array.isArray(value.industries) || value.industries.length === 0) throw new PublicProductContractError("taxonomy_invalid", "industry_taxonomy");
  const aliases = new Map<string, string>();
  let priorId: string | null = null;
  for (const entry of value.industries) {
    assertClosedPlainRecord(entry, ["industry_id", "name", "aliases"], "industry");
    if (!text(entry.industry_id) || !text(entry.name) || !Array.isArray(entry.aliases) || entry.aliases.length === 0 || entry.aliases.some((alias) => !text(alias)) || (priorId !== null && compareUnicodeScalar(priorId, entry.industry_id) >= 0)) throw new PublicProductContractError("taxonomy_invalid", "industry");
    priorId = entry.industry_id;
    for (const alias of entry.aliases) {
      if (aliases.has(alias)) throw new PublicProductContractError("taxonomy_invalid", "industry_alias");
      aliases.set(alias, entry.industry_id);
    }
  }
  return aliases;
}

function validateSource(subject: BoundSubject, asOf: number, aliases: Map<string, string>, errors: PublicProductCorpusError[]): boolean {
  const value = subject.value;
  const start = errors.length;
  if (!subject.canonical_line) add(errors, "canonical_json", subject.location, "active source line is not canonical JSON");
  if (Reflect.ownKeys(value).length !== SOURCE_KEYS.length || SOURCE_KEYS.some((key) => !Object.hasOwn(value, key))) add(errors, "source_shape", subject.location, "source fields are not exact");
  for (const key of SOURCE_KEYS) if (!text(value[key])) add(errors, "source_shape", subject.location, `${key} must be nonempty text`);
  if (!https(value.source_url) || !https(value.canonical_url)) add(errors, "source_url", subject.location, "URLs must be fragment-free HTTPS");
  const accessed = typeof value.accessed_at === "string" ? Date.parse(value.accessed_at) : NaN;
  if (!Number.isFinite(accessed) || accessed > asOf) add(errors, "source_timestamp", subject.location, "accessed_at is invalid or future");
  if (!SOURCE_CLASSES.has(String(value.source_class))) add(errors, "source_class", subject.location, "unsupported source class");
  if (value.rights_boundary !== "public page; evidence only") add(errors, "rights_boundary", subject.location, "source must remain evidence-only");
  if (!aliases.has(String(value.industry))) add(errors, "unmapped_industry", subject.location, String(value.industry));
  return errors.length === start;
}

function validateObservation(subject: BoundSubject, source: BoundSubject | undefined, errors: PublicProductCorpusError[]): boolean {
  const value = subject.value;
  const start = errors.length;
  if (!subject.canonical_line) add(errors, "canonical_json", subject.location, "active observation line is not canonical JSON");
  if (Reflect.ownKeys(value).length !== OBSERVATION_KEYS.length || OBSERVATION_KEYS.some((key) => !Object.hasOwn(value, key))) add(errors, "observation_shape", subject.location, "observation fields are not exact");
  for (const key of OBSERVATION_KEYS.filter((key) => key !== "benchmark_eligibility" && key !== "terminology_entities")) if (!text(value[key])) add(errors, "observation_shape", subject.location, `${key} must be nonempty text`);
  if (!Array.isArray(value.terminology_entities) || value.terminology_entities.some((item) => !text(item))) add(errors, "observation_shape", subject.location, "terminology_entities invalid");
  if (wordCount(value.exact_wording_span) > 25) add(errors, "quotation_limit", subject.location, "quotation exceeds 25 words");
  if (!EVIDENCE_STRENGTHS.has(String(value.evidence_strength))) add(errors, "evidence_strength", subject.location, "invalid evidence strength");
  if (value.authority_effect !== "none" || value.prompt_eligibility !== "never" || value.training_eligibility !== "never" || value.benchmark_eligibility !== false) add(errors, "authority_boundary", subject.location, "public evidence cannot affect authority or learning");
  if (source === undefined) add(errors, "missing_source", subject.location, String(value.source_id));
  else if (source.value.company !== value.company || source.value.product_system !== value.product_system || source.value.industry !== value.industry_stratum) add(errors, "source_projection", subject.location, "source projection mismatch");
  return errors.length === start;
}

function errorSort(left: PublicProductCorpusError, right: PublicProductCorpusError): number { return compareUnicodeScalar(`${left.code}\0${left.location}\0${left.detail}`, `${right.code}\0${right.location}\0${right.detail}`); }

export function verifyPublicProductCorpusV2(input: VerifyPublicProductCorpusV2Input): PublicProductCorpusReportV2 {
  exactShallow(input, ["batches", "industry_taxonomy_bytes", "taxonomy", "disposition_sets", "disposition_events", "review_governance", "as_of", "targets", "verification_mode"], "input");
  assertClosedPlainRecord(input.targets, ["companies", "products", "industries", "direct_states_per_product"], "targets");
  if (!Array.isArray(input.batches) || !Array.isArray(input.disposition_sets) || !Array.isArray(input.disposition_events) || !(input.industry_taxonomy_bytes instanceof Uint8Array) || !text(input.as_of) || !Number.isFinite(Date.parse(input.as_of)) || !["development_fixture", "official"].includes(input.verification_mode) || Object.values(input.targets as unknown as Record<string, number>).some((target) => !Number.isSafeInteger(target) || target < 1)) throw new PublicProductContractError("canonical_value");
  const batchIds = input.batches.map((batch) => batch.batch_id);
  if (new Set(batchIds).size !== batchIds.length) throw new PublicProductContractError("canonical_value", "batches");
  const subjects: BoundSubject[] = [];
  for (const batch of [...input.batches].sort((a, b) => compareUnicodeScalar(a.batch_id, b.batch_id))) {
    exactShallow(batch, ["batch_id", "source_lines", "observation_lines"], "batch");
    if (!text(batch.batch_id) || !Array.isArray(batch.source_lines) || !Array.isArray(batch.observation_lines)) throw new PublicProductContractError("canonical_value", "batch");
    const typedBatch = batch as unknown as PublicProductBatchBytes;
    typedBatch.source_lines.forEach((line, index) => subjects.push(parseLine(typedBatch.batch_id, "source", line, index)));
    typedBatch.observation_lines.forEach((line, index) => subjects.push(parseLine(typedBatch.batch_id, "observation", line, index)));
  }
  subjects.sort((a, b) => compareUnicodeScalar(subjectKey(a.ref), subjectKey(b.ref)));
  const rawSources = subjects.filter((item) => item.ref.record_kind === "source");
  const rawObservations = subjects.filter((item) => item.ref.record_kind === "observation");
  const errors: PublicProductCorpusError[] = [];
  let industryAliases = new Map<string, string>();
  try { industryAliases = parseIndustryTaxonomy(input.industry_taxonomy_bytes); } catch (error) { add(errors, "taxonomy_invalid", "industry-taxonomy.json", error instanceof Error ? error.message : "invalid taxonomy"); }
  let ledger;
  try {
    ledger = verifyPublicEvidenceDispositionLedger({ known_subjects: subjects.map((item) => item.ref), sets: input.disposition_sets, events_in_append_order: input.disposition_events, governance: input.review_governance, as_of: input.as_of, verification_mode: input.verification_mode });
  } catch (error) { add(errors, "disposition_invalid", "ledger", error instanceof Error ? error.message : "invalid ledger"); }
  const fallbackLedgerDigest = sha256Canonical({ sets: input.disposition_sets, events: input.disposition_events, as_of: input.as_of });
  const dispositionRef = ledger === undefined ? ref(`public_product_evidence_ledger.${fallbackLedgerDigest}`, fallbackLedgerDigest) : ref(ledger.head.ledger_id, ledger.head.ledger_digest);
  const states = new Map<string, string>();
  for (const subject of subjects) states.set(subjectKey(subject.ref), ledger?.state_by_subject.get(subjectKey(subject.ref))?.state ?? "active");
  const subjectsByKey = new Map(subjects.map((subject) => [subjectKey(subject.ref), subject]));
  if (ledger !== undefined) {
    for (const subject of subjects) {
      const resolved = ledger.state_by_subject.get(subjectKey(subject.ref));
      if (resolved?.state !== "superseded") continue;
      for (const replacementRef of resolved.terminal_replacement_refs) {
        const replacement = subjectsByKey.get(subjectKey(replacementRef));
        if (replacement === undefined || replacement.ref.record_kind !== subject.ref.record_kind
          || replacement.value.company !== subject.value.company
          || replacement.value.product_system !== subject.value.product_system) {
          add(errors, "replacement_invalid", subject.location, "replacement must preserve record kind, company, and product system");
        }
      }
    }
  }
  const activeSources = rawSources.filter((item) => states.get(subjectKey(item.ref)) === "active");
  const activeObservations = rawObservations.filter((item) => states.get(subjectKey(item.ref)) === "active");
  const validSourceSet = new Set(activeSources.filter((item) => validateSource(item, Date.parse(input.as_of), industryAliases, errors)));
  const sourceIdCounts = new Map<string, number>();
  const urlCounts = new Map<string, number>();
  for (const item of activeSources) { sourceIdCounts.set(String(item.value.source_id), (sourceIdCounts.get(String(item.value.source_id)) ?? 0) + 1); urlCounts.set(String(item.value.canonical_url), (urlCounts.get(String(item.value.canonical_url)) ?? 0) + 1); }
  for (const [id, count] of sourceIdCounts) if (count > 1) add(errors, "duplicate_source_id", "corpus", id);
  for (const [url, count] of urlCounts) if (count > 1) add(errors, "duplicate_canonical_url", "corpus", url);
  const qualifiedSources = activeSources.filter((item) => validSourceSet.has(item) && sourceIdCounts.get(String(item.value.source_id)) === 1 && urlCounts.get(String(item.value.canonical_url)) === 1);
  const sourcesById = new Map(qualifiedSources.map((item) => [String(item.value.source_id), item]));
  const observationCounts = new Map<string, number>();
  for (const item of activeObservations) observationCounts.set(String(item.value.observation_id), (observationCounts.get(String(item.value.observation_id)) ?? 0) + 1);
  for (const [id, count] of observationCounts) if (count > 1) add(errors, "duplicate_observation_id", "corpus", id);
  const qualifiedObservations = activeObservations.filter((item) => validateObservation(item, sourcesById.get(String(item.value.source_id)), errors) && observationCounts.get(String(item.value.observation_id)) === 1);
  let verifiedTaxonomy: ReturnType<typeof verifyPublicProductExperienceTaxonomy> | null = null;
  if (input.taxonomy === null) add(errors, "taxonomy_invalid", "taxonomy", "no active reviewed taxonomy");
  else {
    try { verifiedTaxonomy = verifyPublicProductExperienceTaxonomy({ taxonomy: input.taxonomy, governance: input.review_governance, as_of: input.as_of, verification_mode: input.verification_mode }); }
    catch (error) { add(errors, "taxonomy_invalid", "taxonomy", error instanceof Error ? error.message : "invalid taxonomy"); }
  }
  const normalizedEvidence: NormalizedPublicProductEvidence[] = [];
  const rawSignatures = new Set<string>();
  const normalizedSignatures = new Set<string>();
  const coverageByProduct = new Map<string, Set<string>>();
  let unmapped = 0;
  for (const item of qualifiedObservations) {
    const value = item.value;
    const raw: RawStructuralSignature = { journey: String(value.journey), event_state: String(value.event_state), content_slot_type: String(value.content_slot_type), surface_channel: String(value.surface_channel) };
    rawSignatures.add(sha256Canonical(raw));
    const mapped = verifiedTaxonomy === null ? null : normalizePublicProductSignature(verifiedTaxonomy, raw);
    if (mapped === null) { unmapped += 1; add(errors, "taxonomy_unmapped", item.location, sha256Canonical(raw)); continue; }
    normalizedSignatures.add(sha256Canonical(mapped));
    const source = sourcesById.get(String(value.source_id))!;
    normalizedEvidence.push({ observation_subject_ref: item.ref, source_subject_ref: source.ref, company: String(value.company), product_system: String(value.product_system), normalized_industry_id: industryAliases.get(String(value.industry_stratum))!, raw_signature: raw, normalized_signature: mapped, authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false });
    if (value.observed_vs_inferred === "observed_ui" && source.value.source_class === "actual UI") {
      const slots = coverageByProduct.get(productKey(value)) ?? new Set<string>(); slots.add(mapped.coverage_slot_id); coverageByProduct.set(productKey(value), slots);
    }
  }
  normalizedEvidence.sort((a, b) => compareUnicodeScalar(subjectKey(a.observation_subject_ref), subjectKey(b.observation_subject_ref)));
  const companyCount = new Set(qualifiedSources.map((item) => String(item.value.company))).size;
  const productCount = new Set(qualifiedSources.map((item) => productKey(item.value))).size;
  const industryCount = new Set(qualifiedObservations.map((item) => industryAliases.get(String(item.value.industry_stratum))).filter(Boolean)).size;
  const meeting = [...coverageByProduct.values()].filter((slots) => slots.size >= input.targets.direct_states_per_product).length;
  for (const [code, actual, target] of [["company_target", companyCount, input.targets.companies], ["product_target", productCount, input.targets.products], ["industry_target", industryCount, input.targets.industries]] as const) if (actual < target) add(errors, code, "corpus", `${actual} is below target ${target}`);
  for (const item of new Set(qualifiedSources.map((source) => productKey(source.value)))) if ((coverageByProduct.get(item)?.size ?? 0) < input.targets.direct_states_per_product) add(errors, "insufficient_direct_states", item.replace("\0", " / "), `${coverageByProduct.get(item)?.size ?? 0} is below target ${input.targets.direct_states_per_product}`);
  errors.sort(errorSort);
  const rawCounts = { batches: input.batches.length, sources: rawSources.length, observations: rawObservations.length };
  const stateCount = (state: string) => [...states.values()].filter((value) => value === state).length;
  const activeCounts = { active_sources: activeSources.length, active_observations: activeObservations.length, held_subjects: stateCount("held"), rejected_subjects: stateCount("rejected"), superseded_subjects: stateCount("superseded"), qualified_sources: qualifiedSources.length, qualified_observations: qualifiedObservations.length, companies: companyCount, products: productCount, industries: industryCount };
  const coverageCounts = { mapped_observations: normalizedEvidence.length, unmapped_observations: unmapped, raw_distinct_signatures: rawSignatures.size, normalized_distinct_signatures: normalizedSignatures.size, direct_observed_slots: [...coverageByProduct.values()].reduce((sum, slots) => sum + slots.size, 0), products_with_direct_observations: coverageByProduct.size, products_meeting_direct_state_target: meeting };
  const taxonomyRef = verifiedTaxonomy?.taxonomy_ref ?? null;
  const governanceRef = ref(`public-product-review-governance.${input.review_governance.governance_digest}`, input.review_governance.governance_digest);
  const projectionPreimage = { taxonomy_ref: taxonomyRef, disposition_ledger_ref: dispositionRef, review_governance_ref: governanceRef, active_qualified_evidence: normalizedEvidence };
  const projectionDigest = sha256Canonical(projectionPreimage);
  const accepted = errors.length === 0 ? ref(`public-product-active-projection.${projectionDigest}`, projectionDigest) : null;
  const preimage = { contract_version: "contentmd.public-product-corpus-report/0.2.0" as const, status: errors.length === 0 ? "pass" as const : "fail" as const, accepted_projection_ref: accepted, taxonomy_ref: taxonomyRef, disposition_ledger_ref: dispositionRef, review_governance_ref: governanceRef, raw_counts: rawCounts, active_counts: activeCounts, coverage_counts: coverageCounts, active_qualified_evidence: errors.length === 0 ? normalizedEvidence : [], errors, authority_effect: "none" as const, prompt_eligibility: "never" as const, training_eligibility: "never" as const, benchmark_eligibility: false as const };
  return immutableClone({ ...preimage, report_digest: sha256Canonical(preimage) }) as PublicProductCorpusReportV2;
}
