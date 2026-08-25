import { canonicalJson, sha256Canonical } from "@contentmd/core";
import { PublicProductContractError, compareUnicodeScalar, immutableClone, type PublicProductDigestRef } from "./public-product-contracts.js";
import type { PublicEvidenceSubjectRef } from "./public-evidence-disposition.js";
import type { PublicProductCorpusReportV2 } from "./public-product-projection.js";
import { verifyPublicProductReviewPair, type PublicProductReviewGovernanceEvidence } from "./public-product-review.js";

export interface CanonicalPatternSignature { coverage_slot_id: string; journey_family_id: string; state_class_id: string; content_slot_class_id: string; surface_channel_id: string }
export interface PublicProductPatternHypothesisV2 {
  contract_version: "contentmd.public-product-pattern-hypothesis/0.2.0"; hypothesis_id: string;
  structural_signature: CanonicalPatternSignature; taxonomy_ref: PublicProductDigestRef;
  disposition_ledger_ref: PublicProductDigestRef; corpus_report_ref: PublicProductDigestRef;
  support: { company_count: number; product_count: number; industry_count: number; evidence_refs: readonly PublicEvidenceSubjectRef[] };
  counterexample_coverage_count: number; review_state: "unreviewed"; authority_effect: "none";
  prompt_eligibility: "never"; training_eligibility: "never"; benchmark_eligibility: false;
  promotion_eligibility: false; hypothesis_digest: string;
}
export interface PublicProductPatternHypothesisReportV2 {
  contract_version: "contentmd.public-product-pattern-hypothesis-report/0.2.0";
  source_report_ref: PublicProductDigestRef; hypotheses: readonly PublicProductPatternHypothesisV2[];
  authority_effect: "none"; prompt_eligibility: "never"; training_eligibility: "never";
  benchmark_eligibility: false; promotion_eligibility: false; report_digest: string;
}
export interface PublicProductPatternAdjudicationV2 {
  contract_version: "contentmd.public-product-pattern-adjudication/0.2.0";
  hypothesis_ref: PublicProductDigestRef; review_receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  decision_state: "ready_for_canonical_authoring" | "hold_for_more_evidence" | "rejected";
  required_next_records: readonly ["ContentPattern", "PatternDisposition"];
  authority_effect: "none"; prompt_eligibility: "never"; training_eligibility: "never";
  benchmark_eligibility: false; promotion_eligibility: false; adjudication_digest: string;
}

function without<T extends object>(value: T, key: string): Record<string, unknown> { return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key)); }
function ref(id: string, digest: string): PublicProductDigestRef { return { object_id: id, object_digest: digest }; }
function subjectKey(value: PublicEvidenceSubjectRef): string { return `${value.batch_id}\0${value.record_kind}\0${value.record_id}\0${value.record_digest}`; }
function productKey(value: { company: string; product_system: string }): string { return `${value.company}\0${value.product_system}`; }
function same(left: unknown, right: unknown): boolean { return canonicalJson(left) === canonicalJson(right); }

function assertAcceptedReport(report: PublicProductCorpusReportV2): void {
  if (report.contract_version !== "contentmd.public-product-corpus-report/0.2.0" || report.status !== "pass"
    || report.accepted_projection_ref === null || report.taxonomy_ref === null || report.errors.length !== 0
    || report.authority_effect !== "none" || report.prompt_eligibility !== "never"
    || report.training_eligibility !== "never" || report.benchmark_eligibility !== false
    || report.report_digest !== sha256Canonical(without(report, "report_digest"))) {
    throw new TypeError("public_product_hypothesis_invalid:source_report");
  }
}

function assertThresholds(value: { min_support_companies: number; min_support_products: number; min_support_industries: number; min_direct_states_per_product: number }): void {
  if (value.min_support_companies !== 5 || value.min_support_products !== 5
    || value.min_support_industries !== 3 || value.min_direct_states_per_product !== 5) {
    throw new TypeError("public_product_hypothesis_invalid:thresholds");
  }
}

export function compilePublicProductPatternHypothesesV2(input: {
  report: PublicProductCorpusReportV2;
  thresholds: { min_support_companies: 5; min_support_products: 5; min_support_industries: 3; min_direct_states_per_product: 5 };
}): PublicProductPatternHypothesisReportV2 {
  assertAcceptedReport(input.report);
  assertThresholds(input.thresholds);
  const taxonomyRef = input.report.taxonomy_ref!;
  const slotsByProduct = new Map<string, Set<string>>();
  for (const evidence of input.report.active_qualified_evidence) {
    const slots = slotsByProduct.get(productKey(evidence)) ?? new Set<string>();
    slots.add(evidence.normalized_signature.coverage_slot_id);
    slotsByProduct.set(productKey(evidence), slots);
  }
  const groups = new Map<string, typeof input.report.active_qualified_evidence[number][]>();
  for (const evidence of input.report.active_qualified_evidence) {
    if ((slotsByProduct.get(productKey(evidence))?.size ?? 0) < 5) continue;
    const key = sha256Canonical(evidence.normalized_signature);
    const group = groups.get(key) ?? [];
    group.push(evidence); groups.set(key, group);
  }
  const corpusRef = ref(`public-product-corpus-report.${input.report.report_digest}`, input.report.report_digest);
  const hypotheses: PublicProductPatternHypothesisV2[] = [];
  for (const support of groups.values()) {
    const companies = new Set(support.map((item) => item.company));
    const products = new Set(support.map(productKey));
    const industries = new Set(support.map((item) => item.normalized_industry_id));
    if (companies.size < 5 || products.size < 5 || industries.size < 3) continue;
    const evidenceRefs = [...new Map(support.map((item) => [subjectKey(item.observation_subject_ref), item.observation_subject_ref])).values()]
      .sort((a, b) => compareUnicodeScalar(subjectKey(a), subjectKey(b)));
    const identity = { structural_signature: support[0]!.normalized_signature, taxonomy_ref: taxonomyRef, disposition_ledger_ref: input.report.disposition_ledger_ref, corpus_report_ref: corpusRef, evidence_refs: evidenceRefs };
    const preimage = {
      contract_version: "contentmd.public-product-pattern-hypothesis/0.2.0" as const,
      hypothesis_id: `public-product-pattern-hypothesis.${sha256Canonical(identity)}`,
      structural_signature: support[0]!.normalized_signature,
      taxonomy_ref: taxonomyRef,
      disposition_ledger_ref: input.report.disposition_ledger_ref,
      corpus_report_ref: corpusRef,
      support: { company_count: companies.size, product_count: products.size, industry_count: industries.size, evidence_refs: evidenceRefs },
      counterexample_coverage_count: 0,
      review_state: "unreviewed" as const, authority_effect: "none" as const,
      prompt_eligibility: "never" as const, training_eligibility: "never" as const,
      benchmark_eligibility: false as const, promotion_eligibility: false as const,
    };
    hypotheses.push({ ...preimage, hypothesis_digest: sha256Canonical(preimage) });
  }
  hypotheses.sort((a, b) => compareUnicodeScalar(a.hypothesis_id, b.hypothesis_id));
  const preimage = { contract_version: "contentmd.public-product-pattern-hypothesis-report/0.2.0" as const, source_report_ref: corpusRef, hypotheses, authority_effect: "none" as const, prompt_eligibility: "never" as const, training_eligibility: "never" as const, benchmark_eligibility: false as const, promotion_eligibility: false as const };
  return immutableClone({ ...preimage, report_digest: sha256Canonical(preimage) }) as PublicProductPatternHypothesisReportV2;
}

function assertHypothesis(value: PublicProductPatternHypothesisV2): void {
  if (value.contract_version !== "contentmd.public-product-pattern-hypothesis/0.2.0"
    || value.hypothesis_digest !== sha256Canonical(without(value, "hypothesis_digest"))) {
    throw new TypeError("public_product_hypothesis_invalid:integrity");
  }
}

export function adjudicatePublicProductPatternReviewsV2(input: {
  hypothesis: PublicProductPatternHypothesisV2;
  receipt_refs: readonly [PublicProductDigestRef, PublicProductDigestRef];
  governance: PublicProductReviewGovernanceEvidence;
  as_of: string;
  verification_mode: "development_fixture" | "official";
}): PublicProductPatternAdjudicationV2 {
  assertHypothesis(input.hypothesis);
  if (input.governance.as_of !== input.as_of) throw new PublicProductContractError("canonical_value", "as_of");
  const hypothesisRef = ref(input.hypothesis.hypothesis_id, input.hypothesis.hypothesis_digest);
  verifyPublicProductReviewPair({ kind: "pattern_hypothesis", subject_ref: hypothesisRef, receipt_refs: input.receipt_refs, required_roles: ["qualified_content_designer", "qualified_content_designer"], governance: input.governance, verification_mode: input.verification_mode });
  const preimage = { contract_version: "contentmd.public-product-pattern-adjudication/0.2.0" as const, hypothesis_ref: hypothesisRef, review_receipt_refs: input.receipt_refs, decision_state: "ready_for_canonical_authoring" as const, required_next_records: ["ContentPattern", "PatternDisposition"] as const, authority_effect: "none" as const, prompt_eligibility: "never" as const, training_eligibility: "never" as const, benchmark_eligibility: false as const, promotion_eligibility: false as const };
  return immutableClone({ ...preimage, adjudication_digest: sha256Canonical(preimage) }) as PublicProductPatternAdjudicationV2;
}
