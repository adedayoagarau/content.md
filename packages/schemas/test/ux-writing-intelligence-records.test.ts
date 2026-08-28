import { describe, expect, it } from "vitest";
import { SCHEMA_IDS, validateRecord } from "@contentmd/schemas";

const digest = "0".repeat(64);

function envelope(schema_id: string, payload: unknown) {
  return {
    record_id: "uxw.intelligence.fixture",
    schema_id,
    schema_version: "0.1.0",
    record_version: 1,
    content_digest: digest,
    scope: { memory_scope: "project", project_id: "project.fixture", resource_refs: [], data_classes: ["public-synthetic"] },
    provenance: [],
    lifecycle_state: "proposed",
    payload,
  };
}

describe("UX-writing intelligence record schemas", () => {
  it("validates a closed declarative rule pack", () => {
    const record = envelope(SCHEMA_IDS.uxWritingRulePack, {
      contract_version: "contentmd.ux-writing-rule-pack/0.1.0",
      pack_id: "uxw-pack.core.fixture",
      pack_version: 1,
      layer: "core",
      status: "approved",
      scope: { surfaces: [], channels: [], locales: [], risk_levels: ["high"] },
      rules: [{
        rule_id: "uxw.fixture.state",
        rule_version: "0.1.0",
        title: "State is known",
        classification: "hard",
        dimension: "state",
        review_type: "deterministic",
        applies_when: [],
        assertion: { fact_path: "state.known", operator: "equals", value: true },
        failure_status: "unknown",
        reason: "State is not established.",
        consequence: "Copy may be false.",
        repair: "Supply state evidence.",
        required_fact_paths: ["state.known"],
        source_refs: ["source.fixture"],
        fixture_refs: ["fixture.state"],
        override_policy: "core_immutable",
      }],
      suppressed_rule_ids: [],
      supersedes_pack_ref: null,
      approval_refs: [],
      authority_effect: "none",
    });
    expect(validateRecord(SCHEMA_IDS.uxWritingRulePack, record)).toEqual({ valid: true, errors: [] });
  });

  it("rejects arbitrary condition operators", () => {
    const payload = {
      contract_version: "contentmd.ux-writing-rule-pack/0.1.0",
      pack_id: "uxw-pack.core.fixture",
      pack_version: 1,
      layer: "core",
      status: "approved",
      scope: { surfaces: [], channels: [], locales: [], risk_levels: [] },
      rules: [{
        rule_id: "uxw.fixture.state", rule_version: "0.1.0", title: "State", classification: "hard", dimension: "state", review_type: "deterministic",
        applies_when: [], assertion: { fact_path: "state.known", operator: "execute", value: "code" }, failure_status: "fail",
        reason: "Missing.", consequence: "False.", repair: "Supply it.", required_fact_paths: ["state.known"], source_refs: ["source.fixture"], fixture_refs: ["fixture.state"], override_policy: "core_immutable",
      }],
      suppressed_rule_ids: [], supersedes_pack_ref: null, approval_refs: [], authority_effect: "none",
    };
    expect(validateRecord(SCHEMA_IDS.uxWritingRulePack, envelope(SCHEMA_IDS.uxWritingRulePack, payload)).valid).toBe(false);
  });

  it("validates the persisted review report shape", () => {
    const payload = {
      contract_version: "contentmd.ux-writing-review-report/0.1.0",
      report_id: `uxwreview.${"1".repeat(32)}`,
      request_ref: "uxw.request.fixture",
      target: { source_artifact: "checkout.tsx", line: 42, column: 3, text: "Payment failed. Try again." },
      input_digest: digest,
      rule_pack_digests: ["2".repeat(64)],
      findings: [],
      hard_plane_status: "pass",
      advisory_status: "pass",
      recommended_disposition: "bounded_approval",
      repair_brief_ref: null,
      authority_effect: "none",
      report_digest: "3".repeat(64),
    };
    expect(validateRecord(SCHEMA_IDS.uxWritingReviewReport, envelope(SCHEMA_IDS.uxWritingReviewReport, payload)))
      .toEqual({ valid: true, errors: [] });
  });

  it("validates the persisted integrity-bound repair brief shape", () => {
    const payload = {
      contract_version: "contentmd.ux-writing-repair-brief/0.1.0",
      brief_id: `uxwrepair.${"4".repeat(32)}`,
      request_ref: "uxw.request.fixture",
      review_report_ref: `uxwreview.${"1".repeat(32)}`,
      preserve: ["The outcome is not confirmed"],
      must_change: ["Provide a safe verification path"],
      must_not_claim: ["Payment failed"],
      required_facts: ["The payment outcome may be unknown"],
      consequence: "Another attempt may duplicate payment",
      recovery: "Check payment status",
      channel: "web",
      locale: "en-US",
      acceptance_criteria: ["Unknown state remains explicit"],
      unresolved_questions: [],
      authority_effect: "none",
      brief_digest: "5".repeat(64),
    };
    expect(validateRecord(SCHEMA_IDS.uxWritingRepairBrief, envelope(SCHEMA_IDS.uxWritingRepairBrief, payload)))
      .toEqual({ valid: true, errors: [] });
  });
});
