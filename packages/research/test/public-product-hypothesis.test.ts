import { describe, expect, it } from "vitest";
import { sha256Canonical } from "@contentmd/core";
import {
  compilePublicProductPatternHypothesesV2,
  type NormalizedPublicProductEvidence,
  type PublicEvidenceSubjectRef,
  type PublicProductCorpusReportV2,
} from "@contentmd/research";

const digest = (digit: string) => digit.repeat(64);
const ref = (id: string, value: string) => ({ object_id: id, object_digest: value });
function subject(company: number, slot: number): PublicEvidenceSubjectRef {
  return { batch_id: `batch-${company}`, record_kind: "observation", record_id: `observation-${company}-${slot}`, record_digest: sha256Canonical({ company, slot }) };
}

function acceptedReport(): PublicProductCorpusReportV2 {
  const evidence: NormalizedPublicProductEvidence[] = [];
  const slots = ["entry_onboarding", "core_task_commitment", "pending_progress", "success", "error_recovery"] as const;
  for (let company = 0; company < 5; company += 1) for (let slot = 0; slot < 5; slot += 1) {
    evidence.push({
      observation_subject_ref: subject(company, slot),
      source_subject_ref: { ...subject(company, slot), record_kind: "source", record_id: `source-${company}-${slot}` },
      company: `Private Company ${company}`, product_system: `Private Product ${company}`,
      normalized_industry_id: `industry-${company % 3}`,
      raw_signature: { journey: `raw-${slot}`, event_state: `raw-state-${slot}`, content_slot_type: `raw-slot-${slot}`, surface_channel: "web" },
      normalized_signature: { coverage_slot_id: slots[slot], journey_family_id: `journey-${slot}`, state_class_id: `state-${slot}`, content_slot_class_id: `content-${slot}`, surface_channel_id: "channel-web" },
      authority_effect: "none", prompt_eligibility: "never", training_eligibility: "never", benchmark_eligibility: false,
    });
  }
  const preimage = {
    contract_version: "contentmd.public-product-corpus-report/0.2.0" as const,
    status: "pass" as const,
    accepted_projection_ref: ref("projection.accepted", digest("1")),
    taxonomy_ref: ref("taxonomy.accepted", digest("2")),
    disposition_ledger_ref: ref("ledger.accepted", digest("3")),
    review_governance_ref: ref("governance.accepted", digest("4")),
    raw_counts: { batches: 5, sources: 25, observations: 25 },
    active_counts: { active_sources: 25, active_observations: 25, held_subjects: 0, rejected_subjects: 0, superseded_subjects: 0, qualified_sources: 25, qualified_observations: 25, companies: 5, products: 5, industries: 3 },
    coverage_counts: { mapped_observations: 25, unmapped_observations: 0, raw_distinct_signatures: 5, normalized_distinct_signatures: 5, direct_observed_slots: 25, products_with_direct_observations: 5, products_meeting_direct_state_target: 5 },
    active_qualified_evidence: evidence,
    errors: [], authority_effect: "none" as const, prompt_eligibility: "never" as const,
    training_eligibility: "never" as const, benchmark_eligibility: false as const,
  };
  return { ...preimage, report_digest: sha256Canonical(preimage) };
}

describe("normalized public-product pattern hypotheses v0.2", () => {
  it("compiles only normalized signatures at exact 5/5/3 support", () => {
    const compiled = compilePublicProductPatternHypothesesV2({
      report: acceptedReport(),
      thresholds: { min_support_companies: 5, min_support_products: 5, min_support_industries: 3, min_direct_states_per_product: 5 },
    });

    expect(compiled.hypotheses).toHaveLength(5);
    expect(compiled.hypotheses[0]!.support.company_count).toBe(5);
    expect(compiled.hypotheses[0]!.support.product_count).toBe(5);
    expect(compiled.hypotheses[0]!.support.industry_count).toBe(3);
    expect(JSON.stringify(compiled)).not.toContain("Private Company");
    expect(JSON.stringify(compiled)).not.toContain("Private Product");
    expect(JSON.stringify(compiled)).not.toContain("raw-state");
    expect(compiled.promotion_eligibility).toBe(false);
  });

  it("refuses failed or unaccepted projections and report tampering", () => {
    const failed = acceptedReport();
    failed.status = "fail";
    failed.accepted_projection_ref = null;
    expect(() => compilePublicProductPatternHypothesesV2({ report: failed, thresholds: { min_support_companies: 5, min_support_products: 5, min_support_industries: 3, min_direct_states_per_product: 5 } })).toThrow();
    const tampered = acceptedReport();
    tampered.taxonomy_ref!.object_digest = digest("9");
    expect(() => compilePublicProductPatternHypothesesV2({ report: tampered, thresholds: { min_support_companies: 5, min_support_products: 5, min_support_industries: 3, min_direct_states_per_product: 5 } })).toThrow();
  });
});
