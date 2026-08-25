import { sha256Canonical } from "@contentmd/core";
import { immutableClone, compareUnicodeScalar, type PublicProductDigestRef } from "./public-product-contracts.js";
import type { PublicEvidenceSubjectRef } from "./public-evidence-disposition.js";
import type { PublicProductCorpusReportV2 } from "./public-product-projection.js";
import { PUBLIC_PRODUCT_COVERAGE_SLOTS } from "./public-product-taxonomy.js";

export interface ExpansionProductAssignment {
  company: string; product_system: string; normalized_industry_id: string;
  covered_slot_ids: readonly string[]; missing_slot_ids: readonly string[];
  active_evidence_refs: readonly PublicEvidenceSubjectRef[];
}
export interface PublicProductExpansionPlanV2 {
  contract_version: "contentmd.public-product-corpus-expansion-plan/0.2.0";
  corpus_report_ref: PublicProductDigestRef; taxonomy_ref: PublicProductDigestRef;
  disposition_ledger_ref: PublicProductDigestRef; review_governance_ref: PublicProductDigestRef;
  near_complete_products: readonly ExpansionProductAssignment[];
  first_evidence_products: readonly ExpansionProductAssignment[];
  gaps: { companies_remaining: number; products_remaining: number; industries_remaining: number; products_below_direct_state_target: number };
  effect: "collection_operator_only"; authority_effect: "none"; prompt_eligibility: "never";
  training_eligibility: "never"; benchmark_eligibility: false; plan_digest: string;
}

function without<T extends object>(value: T, key: string) { return Object.fromEntries(Object.entries(value).filter(([name]) => name !== key)); }
function subjectKey(value: PublicEvidenceSubjectRef): string { return `${value.batch_id}\0${value.record_kind}\0${value.record_id}\0${value.record_digest}`; }

export function planPublicProductCorpusExpansionV2(input: {
  report: PublicProductCorpusReportV2;
  maximum_assignments: number;
}): PublicProductExpansionPlanV2 {
  if (!Number.isSafeInteger(input.maximum_assignments) || input.maximum_assignments < 1) throw new TypeError("public_product_expansion_invalid:maximum_assignments");
  const report = input.report;
  if (report.contract_version !== "contentmd.public-product-corpus-report/0.2.0" || report.status !== "pass"
    || report.accepted_projection_ref === null || report.taxonomy_ref === null || report.errors.length !== 0
    || report.report_digest !== sha256Canonical(without(report, "report_digest"))) throw new TypeError("public_product_expansion_invalid:report");
  const groups = new Map<string, typeof report.active_qualified_evidence[number][]>();
  for (const evidence of report.active_qualified_evidence) {
    const key = `${evidence.company}\0${evidence.product_system}`;
    const group = groups.get(key) ?? []; group.push(evidence); groups.set(key, group);
  }
  const assignments: ExpansionProductAssignment[] = [];
  for (const evidence of groups.values()) {
    const covered = new Set(evidence.map((item) => item.normalized_signature.coverage_slot_id));
    const refs = [...new Map(evidence.map((item) => [subjectKey(item.observation_subject_ref), item.observation_subject_ref])).values()]
      .sort((a, b) => compareUnicodeScalar(subjectKey(a), subjectKey(b)));
    assignments.push({
      company: evidence[0]!.company, product_system: evidence[0]!.product_system,
      normalized_industry_id: evidence[0]!.normalized_industry_id,
      covered_slot_ids: PUBLIC_PRODUCT_COVERAGE_SLOTS.filter((slot) => covered.has(slot)),
      missing_slot_ids: PUBLIC_PRODUCT_COVERAGE_SLOTS.filter((slot) => !covered.has(slot)),
      active_evidence_refs: refs,
    });
  }
  assignments.sort((a, b) => a.missing_slot_ids.length - b.missing_slot_ids.length
    || compareUnicodeScalar(`${a.normalized_industry_id}\0${a.company}\0${a.product_system}`, `${b.normalized_industry_id}\0${b.company}\0${b.product_system}`));
  const corpusRef = { object_id: `public-product-corpus-report.${report.report_digest}`, object_digest: report.report_digest };
  const preimage = {
    contract_version: "contentmd.public-product-corpus-expansion-plan/0.2.0" as const,
    corpus_report_ref: corpusRef, taxonomy_ref: report.taxonomy_ref,
    disposition_ledger_ref: report.disposition_ledger_ref, review_governance_ref: report.review_governance_ref,
    near_complete_products: assignments.slice(0, input.maximum_assignments),
    first_evidence_products: [] as ExpansionProductAssignment[],
    gaps: {
      companies_remaining: Math.max(0, 5_000 - report.active_counts.companies),
      products_remaining: Math.max(0, 20_000 - report.active_counts.products),
      industries_remaining: Math.max(0, 250 - report.active_counts.industries),
      products_below_direct_state_target: Math.max(0, report.active_counts.products - report.coverage_counts.products_meeting_direct_state_target),
    },
    effect: "collection_operator_only" as const, authority_effect: "none" as const,
    prompt_eligibility: "never" as const, training_eligibility: "never" as const,
    benchmark_eligibility: false as const,
  };
  return immutableClone({ ...preimage, plan_digest: sha256Canonical(preimage) }) as PublicProductExpansionPlanV2;
}
