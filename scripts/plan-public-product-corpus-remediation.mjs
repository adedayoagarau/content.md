#!/usr/bin/env node
import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const value = (flag) => { const index = process.argv.indexOf(flag); return index < 0 ? undefined : process.argv[index + 1]; };
const reportPath = value("--report");
const output = value("--out");
if (!reportPath || !output) throw new Error("report_and_out_are_required");
const report = JSON.parse(await readFile(reportPath, "utf8"));
const diagnostic = report.v2_diagnostic;
if (!diagnostic || !Array.isArray(diagnostic.errors)) throw new Error("v2_diagnostic_required");
const laneByCode = { canonical_json: "corrected_replacement_batch", source_shape: "corrected_replacement_batch", duplicate_source_id: "duplicate_consolidation_and_rekey", duplicate_observation_id: "duplicate_consolidation_and_rekey", duplicate_canonical_url: "duplicate_source_consolidation", missing_source: "source_rebinding_after_replacement", rights_boundary: "rights_review_then_correct_or_reject", quotation_limit: "rights_review_then_redacted_replacement", unmapped_industry: "industry_alias_review", company_target: "new_company_collection", product_target: "new_product_collection", industry_target: "new_industry_collection" };
const byCode = {}, byLane = {}, affectedBatches = new Set();
for (const error of diagnostic.errors) {
  const lane = laneByCode[error.code] ?? "manual_triage";
  byCode[error.code] = (byCode[error.code] ?? 0) + 1;
  byLane[lane] = (byLane[lane] ?? 0) + 1;
  const match = error.location?.match(/^(\d{4}-\d{2}-\d{2}-batch-\d+)/u);
  if (match) affectedBatches.add(match[1]);
}
const preimage = {
  contract_version: "contentmd.public-product-corpus-remediation-plan/0.1.0",
  as_of: diagnostic.as_of,
  source_report_digest: diagnostic.report_digest,
  status_before: diagnostic.status,
  error_count_before: diagnostic.errors.length,
  errors_by_code: Object.fromEntries(Object.entries(byCode).sort(([a], [b]) => a.localeCompare(b))),
  work_by_lane: Object.fromEntries(Object.entries(byLane).sort(([a], [b]) => a.localeCompare(b))),
  affected_batches: [...affectedBatches].sort(),
  current_counts: diagnostic.counts,
  remaining_breadth: diagnostic.gaps,
  execution_order: ["canonicalize_and_shape_corrected_replacements", "consolidate_duplicate_sources_and_rebind_observations", "review_rights_and_quotation_failures", "review_and_add_defensible_industry_aliases", "issue_reviewed_supersession_dispositions", "rerun_official_v2_verifier", "collect_remaining_companies_products_industries_and_direct_states"],
  constraints: { immutable_raw_batches: true, corrections_require_new_batch: true, active_projection_requires_reviewed_dispositions: true, breadth_requires_new_qualified_evidence: true, authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false },
};
const plan = { ...preimage, plan_digest: createHash("sha256").update(JSON.stringify(preimage)).digest("hex") };
await mkdir(path.dirname(output), { recursive: true });
await writeFile(output, `${JSON.stringify(plan, null, 2)}\n`);
process.stdout.write(`${JSON.stringify({ plan_digest: plan.plan_digest, error_count: plan.error_count_before, affected_batches: plan.affected_batches.length, work_by_lane: plan.work_by_lane })}\n`);
