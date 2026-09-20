import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import {
  evaluateUxWritingBenchmark,
  type UxWritingBenchmarkAdjudication,
  type UxWritingBenchmarkCase,
} from "../src/ux-writing-benchmark.js";
import { BUILTIN_UX_WRITING_POLICY_ROUTES } from "../src/ux-writing-policy-routes.js";

const ROOT = fileURLToPath(new URL("../../../", import.meta.url));

function readJsonl<T>(path: string): T[] {
  return readFileSync(new URL(path, import.meta.url), "utf8").trimEnd().split("\n")
    .map((line) => JSON.parse(line) as T);
}

const cases = readJsonl<UxWritingBenchmarkCase>(
  "../../../fixtures/ux-writing-usecases/benchmark-v0.1.jsonl",
);
const adjudications = readJsonl<UxWritingBenchmarkAdjudication>(
  "../../../fixtures/ux-writing-usecases/adjudication-v0.1.jsonl",
);

describe("English UX-writing benchmark", () => {
  it("freezes 200 authored-synthetic cases with complete route and abstention coverage", () => {
    expect(cases).toHaveLength(200);
    expect(adjudications).toHaveLength(200);
    expect(new Set(cases.map(({ case_id }) => case_id)).size).toBe(200);

    const categoryCounts = Object.fromEntries([
      ...new Set(cases.map(({ category }) => category)),
    ].sort().map((category) => [category, cases.filter((item) => item.category === category).length]));
    expect(categoryCounts).toEqual({
      critical_near_neighbor: 14,
      no_route: 10,
      out_of_scope: 10,
      route_canonical: 39,
      route_english_variant: 39,
      route_missing_axis: 39,
      route_missing_fact: 39,
      text_only_non_evidence: 10,
    });

    const canonicalRoutes = cases.filter(({ category }) => category === "route_canonical")
      .map(({ expected }) => expected.route_id).sort();
    expect(canonicalRoutes).toEqual(BUILTIN_UX_WRITING_POLICY_ROUTES.map(({ route_id }) => route_id).sort());
    expect(cases.every(({ provenance }) => provenance.source_kind === "authored_synthetic"
      && provenance.external_corpus_used === false
      && provenance.label_status === "provisional_pending_qualified_review")).toBe(true);
  });

  it("replays deterministically with separate criterion metrics and no false human-gold claim", () => {
    const first = evaluateUxWritingBenchmark({ cases, adjudications });
    const second = evaluateUxWritingBenchmark({ cases, adjudications });
    expect(first).toEqual(second);
    expect(first.counts).toEqual({
      total: 200,
      pending_qualified_review: 200,
      accepted: 0,
      revised: 0,
      excluded: 0,
      qualified: 0,
    });
    expect(first.release_disposition).toBe("hold_for_qualified_review");
    expect(first.provisional_metrics).toMatchObject({
      case_count: 200,
      cases_passing_all_criteria: 200,
      cases_failing_any_criterion: 0,
    });
    expect(first.provisional_metrics.criteria).toHaveLength(10);
    expect(first.provisional_metrics.criteria.every(({ passed, total, pass_rate }) =>
      passed === 200 && total === 200 && pass_rate === 1)).toBe(true);
    expect(first.qualified_metrics).toBeNull();
    expect(first.by_category).toHaveLength(8);
    expect(first.by_route.some(({ key }) => key === "none")).toBe(true);
  });

  it("reports accepted review separately while pending cases keep release on hold", () => {
    const first = adjudications[0];
    expect(first).toBeDefined();
    const reviewed = adjudications.map((item, index): UxWritingBenchmarkAdjudication => index === 0 ? {
      ...item,
      state: "accepted",
      reviewer: { reviewer_id: "reviewer.fixture", role: "qualified_ux_content_reviewer" },
      reviewed_at: "2026-09-20T12:00:00.000Z",
      rationale: "Fixture acceptance for contract testing.",
    } : item);
    const report = evaluateUxWritingBenchmark({ cases, adjudications: reviewed });
    expect(report.counts.qualified).toBe(1);
    expect(report.qualified_metrics).toMatchObject({ case_count: 1, cases_passing_all_criteria: 1 });
    expect(report.release_disposition).toBe("hold_for_qualified_review");
  });

  it("rejects malformed or unqualified adjudication state instead of treating it as approval", () => {
    const malformed = adjudications.map((item, index) => index === 0 ? {
      ...item,
      reviewer: { reviewer_id: "not-allowed", role: "qualified_ux_content_reviewer" as const },
    } : item);
    expect(() => evaluateUxWritingBenchmark({ cases, adjudications: malformed })).toThrow(
      "ux_writing_benchmark_invalid",
    );
  });

  it("regenerates the exact frozen bytes", () => {
    expect(() => execFileSync(process.execPath, [
      "--import", "tsx", "scripts/generate-ux-writing-usecase-benchmark.mts", "--check",
    ], { cwd: ROOT, encoding: "utf8", timeout: 30_000 })).not.toThrow();
  });
});
