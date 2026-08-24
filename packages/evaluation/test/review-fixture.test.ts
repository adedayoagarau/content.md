import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import { FilesystemContentAdapter } from "@contentmd/adapter-filesystem";
import { reviewContent, summarizeReview } from "@contentmd/evaluation";

const fixtureRoot = fileURLToPath(
  new URL("../../../fixtures/synthetic-web-app/", import.meta.url),
);

describe("deterministic fixture review", () => {
  it("finds the frozen content defects with typed evidence", async () => {
    const discovery = await new FilesystemContentAdapter().discover({ project_root: fixtureRoot });
    const report = reviewContent({
      project_id: "project.beacon-checkout-lab-fixture",
      occurrences: discovery.occurrences,
      evidence_refs: ["source.product", "source.design", discovery.scan_digest],
      product_facts: {
        payment_outcome_after_submission: "unknown_possible",
        workspace_delete_effect: "local_only",
      },
    });
    const ruleIds = new Set(report.findings.map((finding) => finding.rule_id));

    expect(ruleIds).toEqual(
      new Set([
        "content.unsupported-superlative",
        "content.vague-value-claim",
        "content.generic-abstraction",
        "content.state-mismatch",
        "content.unsafe-retry",
        "content.weak-accessible-name",
        "content.terminology-inconsistency",
        "content.duplicate-destination-labels",
        "content.missing-recovery",
        "content.locale-fallback",
      ]),
    );
    for (const finding of report.findings) {
      expect(finding.finding_id).toMatch(/^finding\.[a-f0-9]{32}$/);
      expect(finding.rule_version).toBe("0.1.0");
      expect(finding.occurrence_refs.length).toBeGreaterThan(0);
      expect(finding.evidence_refs.length).toBeGreaterThan(0);
      expect(finding.rationale.length).toBeGreaterThan(10);
      expect(finding.suggested_next_action.length).toBeGreaterThan(5);
      expect(typeof finding.automatic_rewrite_allowed).toBe("boolean");
    }
    expect(report.hard_outcomes.status).toBe("fail");
    expect(report.hard_outcomes.blocking_finding_refs.length).toBeGreaterThan(0);
    expect(report).not.toHaveProperty("score");
    expect(report).not.toHaveProperty("universal_score");
  });

  it("summarizes observable qualities without claiming AI authorship", async () => {
    const discovery = await new FilesystemContentAdapter().discover({ project_root: fixtureRoot });
    const summary = summarizeReview(
      reviewContent({
        project_id: "project.beacon-checkout-lab-fixture",
        occurrences: discovery.occurrences,
        evidence_refs: [discovery.scan_digest],
        product_facts: {
          payment_outcome_after_submission: "unknown_possible",
          workspace_delete_effect: "local_only",
        },
      }),
    );
    const serialized = JSON.stringify(summary).toLowerCase();

    expect(serialized).toContain("generic abstraction");
    expect(serialized).not.toContain("reads_like_ai");
    expect(serialized).not.toContain("ai-written");
    expect(serialized).not.toContain("written by ai");
  });
});
