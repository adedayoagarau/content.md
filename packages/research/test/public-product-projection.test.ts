import { describe, expect, it } from "vitest";
import { canonicalJson } from "@contentmd/core";
import { verifyPublicProductCorpusV2 } from "@contentmd/research";
import {
  changeSecondProductIdentity,
  holdFirstObservation,
  projectionFixture,
  supersedeFirstObservation,
} from "./public-product-corpus-fixtures.js";

describe("public-product active corpus projection v0.2", () => {
  it("counts five reviewed canonical slots for one directly observed product", () => {
    const report = verifyPublicProductCorpusV2(projectionFixture(5));

    expect(report.status).toBe("pass");
    expect(report.raw_counts).toEqual({ batches: 2, sources: 5, observations: 5 });
    expect(report.active_counts.qualified_observations).toBe(5);
    expect(report.coverage_counts.direct_observed_slots).toBe(5);
    expect(report.coverage_counts.products_meeting_direct_state_target).toBe(1);
    expect(report.active_qualified_evidence).toHaveLength(5);
    expect(report.accepted_projection_ref).not.toBeNull();
    expect(report.authority_effect).toBe("none");
    expect(report.prompt_eligibility).toBe("never");
    expect(report.training_eligibility).toBe("never");
    expect(report.benchmark_eligibility).toBe(false);
  });

  it("does not let five raw paraphrases satisfy five-state coverage", () => {
    const report = verifyPublicProductCorpusV2(projectionFixture(5, true));

    expect(report.coverage_counts.raw_distinct_signatures).toBe(5);
    expect(report.coverage_counts.direct_observed_slots).toBe(1);
    expect(report.coverage_counts.products_meeting_direct_state_target).toBe(0);
  });

  it("keeps unmapped observations diagnostic and grants no coverage", () => {
    const input = projectionFixture(1);
    input.taxonomy = null;
    const report = verifyPublicProductCorpusV2(input);

    expect(report.status).toBe("fail");
    expect(report.accepted_projection_ref).toBeNull();
    expect(report.coverage_counts.mapped_observations).toBe(0);
    expect(report.coverage_counts.unmapped_observations).toBe(1);
    expect(report.coverage_counts.direct_observed_slots).toBe(0);
    expect(report.active_qualified_evidence).toEqual([]);
  });

  it("keeps held evidence in raw counts while removing only the active projection member", () => {
    const report = verifyPublicProductCorpusV2(holdFirstObservation(projectionFixture(2)));

    expect(report.raw_counts.observations).toBe(2);
    expect(report.active_counts.active_observations).toBe(1);
    expect(report.active_counts.held_subjects).toBe(1);
    expect(report.active_counts.qualified_observations).toBe(1);
  });

  it("grants no direct-state credit to inferred observations or non-UI sources", () => {
    const inferred = verifyPublicProductCorpusV2(projectionFixture(1, false, {
      observed_vs_inferred: "inferred",
    }));
    const guidance = verifyPublicProductCorpusV2(projectionFixture(1, false, {
      source_class: "official content guidance",
    }));

    expect(inferred.coverage_counts.direct_observed_slots).toBe(0);
    expect(guidance.coverage_counts.direct_observed_slots).toBe(0);
  });

  it("requires observations to project the active source identity exactly", () => {
    const input = projectionFixture(1);
    const batch = input.batches.find((item) => item.observation_lines.length > 0)!;
    const observation = JSON.parse(
      new TextDecoder().decode(batch.observation_lines[0]!),
    ) as Record<string, unknown>;
    observation.company = "Different Company";
    (batch.observation_lines as Uint8Array[])[0] = new TextEncoder().encode(canonicalJson(observation));
    const report = verifyPublicProductCorpusV2(input);

    expect(report.status).toBe("fail");
    expect(report.accepted_projection_ref).toBeNull();
    expect(report.errors.some((error) => error.code === "source_projection")).toBe(true);
  });

  it("binds taxonomy, ledger, and review governance into report identity", () => {
    const base = verifyPublicProductCorpusV2(projectionFixture(2));
    const held = verifyPublicProductCorpusV2(holdFirstObservation(projectionFixture(2)));

    expect(held.report_digest).not.toBe(base.report_digest);
    expect(held.disposition_ledger_ref).not.toEqual(base.disposition_ledger_ref);
    expect(held.review_governance_ref).not.toEqual(base.review_governance_ref);
  });

  it("revalidates supersession replacements and preserves immutable raw counts", () => {
    const validInput = supersedeFirstObservation(projectionFixture(2));
    validInput.targets.direct_states_per_product = 1;
    const valid = verifyPublicProductCorpusV2(validInput);
    const invalidInput = supersedeFirstObservation(changeSecondProductIdentity(projectionFixture(2)));
    invalidInput.targets.direct_states_per_product = 1;
    const invalid = verifyPublicProductCorpusV2(invalidInput);

    expect(valid.raw_counts.observations).toBe(2);
    expect(valid.active_counts.superseded_subjects).toBe(1);
    expect(valid.active_counts.active_observations).toBe(1);
    expect(invalid.status).toBe("fail");
    expect(invalid.accepted_projection_ref).toBeNull();
    expect(invalid.errors.some((error) => error.code === "replacement_invalid")).toBe(true);
  });

  it("fails closed on a corrupt disposition while leaving the raw subject diagnostic-active", () => {
    const input = holdFirstObservation(projectionFixture(2));
    input.disposition_events[0]!.event_digest = "0".repeat(64);
    const report = verifyPublicProductCorpusV2(input);

    expect(report.status).toBe("fail");
    expect(report.accepted_projection_ref).toBeNull();
    expect(report.active_counts.active_observations).toBe(2);
    expect(report.errors.some((error) => error.code === "disposition_invalid")).toBe(true);
  });

  it("is byte-identical when semantic-set inputs are permuted", () => {
    const first = projectionFixture(5);
    const second = projectionFixture(5);
    second.batches = [...second.batches].reverse();

    expect(verifyPublicProductCorpusV2(second)).toEqual(verifyPublicProductCorpusV2(first));
  });
});
