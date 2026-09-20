import { canonicalJson, sha256Canonical } from "@contentmd/core";
import {
  classifyUxWritingCoordinate,
  type UxWritingCoordinateAxis,
  type UxWritingCoordinateInput,
} from "./ux-writing-coordinate.js";
import {
  resolveUxWritingPolicy,
  type UxWritingPolicyResolution,
} from "./ux-writing-policy-routes.js";
import type { UxWritingEvidenceSourceId } from "./ux-writing-taxonomy.js";

export type UxWritingBenchmarkCategory =
  | "route_canonical"
  | "route_english_variant"
  | "route_missing_fact"
  | "route_missing_axis"
  | "critical_near_neighbor"
  | "out_of_scope"
  | "no_route"
  | "text_only_non_evidence";

export type UxWritingBenchmarkAxisExpectation = string | readonly string[] | null;

export interface UxWritingBenchmarkExpectedResult {
  scope_status: "in_scope" | "out_of_scope";
  axis_values: Partial<Record<UxWritingCoordinateAxis, UxWritingBenchmarkAxisExpectation>>;
  resolution_status: UxWritingPolicyResolution["status"];
  resolution_reason: UxWritingPolicyResolution["reason"];
  route_id: string | null;
  candidate_route_ids: string[];
  missing_axes: UxWritingCoordinateAxis[];
  missing_facts: string[];
  authority_effect: "none";
}

export interface UxWritingBenchmarkCase {
  contract_version: "contentmd.ux-writing-benchmark-case/0.1.0";
  benchmark_version: "0.1.0";
  case_id: string;
  category: UxWritingBenchmarkCategory;
  input: UxWritingCoordinateInput;
  facts: Record<string, string>;
  expected: UxWritingBenchmarkExpectedResult;
  slices: string[];
  provenance: {
    source_kind: "authored_synthetic";
    route_id: string | null;
    evidence_refs: UxWritingEvidenceSourceId[];
    label_status: "provisional_pending_qualified_review";
    external_corpus_used: false;
  };
  authority_effect: "none";
}

export type UxWritingBenchmarkAdjudicationState =
  | "pending_qualified_review"
  | "accepted"
  | "revised"
  | "excluded";

export interface UxWritingBenchmarkAdjudication {
  contract_version: "contentmd.ux-writing-benchmark-adjudication/0.1.0";
  benchmark_version: "0.1.0";
  case_id: string;
  state: UxWritingBenchmarkAdjudicationState;
  reviewer: { reviewer_id: string; role: "qualified_ux_content_reviewer" } | null;
  reviewed_at: string | null;
  rationale: string | null;
  expected_override: UxWritingBenchmarkExpectedResult | null;
  authority_effect: "none";
}

export const UX_WRITING_BENCHMARK_CRITERIA = [
  "deterministic_replay",
  "scope",
  "axis_values",
  "resolution_status",
  "resolution_reason",
  "route",
  "candidate_routes",
  "missing_axes",
  "missing_facts",
  "authority_boundary",
] as const;

export type UxWritingBenchmarkCriterion = typeof UX_WRITING_BENCHMARK_CRITERIA[number];

export interface UxWritingBenchmarkCriterionResult {
  criterion: UxWritingBenchmarkCriterion;
  passed: boolean;
  expected: unknown;
  actual: unknown;
}

export interface UxWritingBenchmarkCaseResult {
  case_id: string;
  category: UxWritingBenchmarkCategory;
  route_slice: string;
  slices: string[];
  adjudication_state: UxWritingBenchmarkAdjudicationState;
  included_in_qualified_metrics: boolean;
  all_criteria_passed: boolean;
  criteria: UxWritingBenchmarkCriterionResult[];
  classification_id: string;
  resolution_id: string;
}

export interface UxWritingBenchmarkCriterionMetric {
  criterion: UxWritingBenchmarkCriterion;
  passed: number;
  failed: number;
  total: number;
  pass_rate: number | null;
}

export interface UxWritingBenchmarkMetricSet {
  case_count: number;
  cases_passing_all_criteria: number;
  cases_failing_any_criterion: number;
  criteria: UxWritingBenchmarkCriterionMetric[];
}

export interface UxWritingBenchmarkBreakdown {
  key: string;
  metrics: UxWritingBenchmarkMetricSet;
}

export interface UxWritingBenchmarkReport {
  contract_version: "contentmd.ux-writing-benchmark-report/0.1.0";
  benchmark_version: "0.1.0";
  language_scope: "english_only";
  authority_effect: "none";
  release_disposition:
    | "hold_for_qualified_review"
    | "qualified_regression_pass"
    | "qualified_regression_fail";
  counts: {
    total: number;
    pending_qualified_review: number;
    accepted: number;
    revised: number;
    excluded: number;
    qualified: number;
  };
  provisional_metrics: UxWritingBenchmarkMetricSet;
  qualified_metrics: UxWritingBenchmarkMetricSet | null;
  by_category: UxWritingBenchmarkBreakdown[];
  by_route: UxWritingBenchmarkBreakdown[];
  by_slice: UxWritingBenchmarkBreakdown[];
  case_results: UxWritingBenchmarkCaseResult[];
  report_digest: string;
}

function invariant(condition: unknown, code: string): asserts condition {
  if (!condition) throw new Error(`ux_writing_benchmark_invalid:${code}`);
}

function exactEqual(left: unknown, right: unknown): boolean {
  return canonicalJson(left) === canonicalJson(right);
}

function validateExpected(expected: UxWritingBenchmarkExpectedResult, label: string): void {
  invariant(expected !== null && typeof expected === "object", `${label}:expected_shape`);
  invariant(expected.scope_status === "in_scope" || expected.scope_status === "out_of_scope", `${label}:scope`);
  invariant(expected.resolution_status === "resolved" || expected.resolution_status === "abstain", `${label}:resolution_status`);
  invariant(expected.authority_effect === "none", `${label}:authority`);
  invariant(Array.isArray(expected.candidate_route_ids), `${label}:candidate_routes`);
  invariant(Array.isArray(expected.missing_axes), `${label}:missing_axes`);
  invariant(Array.isArray(expected.missing_facts), `${label}:missing_facts`);
}

function validateInputs(
  cases: readonly UxWritingBenchmarkCase[],
  adjudications: readonly UxWritingBenchmarkAdjudication[],
): Map<string, UxWritingBenchmarkAdjudication> {
  invariant(cases.length > 0, "empty_cases");
  invariant(cases.length === adjudications.length, "adjudication_count");
  const caseIds = new Set<string>();
  for (const benchmarkCase of cases) {
    invariant(benchmarkCase.contract_version === "contentmd.ux-writing-benchmark-case/0.1.0", `${benchmarkCase.case_id}:contract`);
    invariant(benchmarkCase.benchmark_version === "0.1.0", `${benchmarkCase.case_id}:version`);
    invariant(/^uxw\.0_1\.[a-z0-9._-]+$/u.test(benchmarkCase.case_id), `${benchmarkCase.case_id}:id`);
    invariant(!caseIds.has(benchmarkCase.case_id), `${benchmarkCase.case_id}:duplicate`);
    invariant(benchmarkCase.authority_effect === "none", `${benchmarkCase.case_id}:authority`);
    invariant(benchmarkCase.provenance.source_kind === "authored_synthetic", `${benchmarkCase.case_id}:source_kind`);
    invariant(benchmarkCase.provenance.label_status === "provisional_pending_qualified_review", `${benchmarkCase.case_id}:label_status`);
    invariant(benchmarkCase.provenance.external_corpus_used === false, `${benchmarkCase.case_id}:external_corpus`);
    validateExpected(benchmarkCase.expected, benchmarkCase.case_id);
    caseIds.add(benchmarkCase.case_id);
  }

  const byCase = new Map<string, UxWritingBenchmarkAdjudication>();
  for (const adjudication of adjudications) {
    invariant(adjudication.contract_version === "contentmd.ux-writing-benchmark-adjudication/0.1.0", `${adjudication.case_id}:adjudication_contract`);
    invariant(adjudication.benchmark_version === "0.1.0", `${adjudication.case_id}:adjudication_version`);
    invariant(caseIds.has(adjudication.case_id), `${adjudication.case_id}:unknown_adjudication`);
    invariant(!byCase.has(adjudication.case_id), `${adjudication.case_id}:duplicate_adjudication`);
    invariant(adjudication.authority_effect === "none", `${adjudication.case_id}:adjudication_authority`);
    if (adjudication.state === "pending_qualified_review") {
      invariant(adjudication.reviewer === null && adjudication.reviewed_at === null
        && adjudication.rationale === null && adjudication.expected_override === null,
      `${adjudication.case_id}:pending_fields`);
    } else {
      invariant(adjudication.reviewer?.role === "qualified_ux_content_reviewer", `${adjudication.case_id}:reviewer`);
      invariant(typeof adjudication.reviewed_at === "string" && adjudication.reviewed_at.length > 0, `${adjudication.case_id}:reviewed_at`);
      invariant(typeof adjudication.rationale === "string" && adjudication.rationale.trim().length > 0, `${adjudication.case_id}:rationale`);
      if (adjudication.state === "revised") {
        invariant(adjudication.expected_override !== null, `${adjudication.case_id}:override_required`);
        validateExpected(adjudication.expected_override, adjudication.case_id);
      } else {
        invariant(adjudication.expected_override === null, `${adjudication.case_id}:override_forbidden`);
      }
    }
    byCase.set(adjudication.case_id, adjudication);
  }
  return byCase;
}

function observedAxes(
  classification: ReturnType<typeof classifyUxWritingCoordinate>,
  expected: UxWritingBenchmarkExpectedResult,
): Partial<Record<UxWritingCoordinateAxis, UxWritingBenchmarkAxisExpectation>> {
  const observed: Partial<Record<UxWritingCoordinateAxis, UxWritingBenchmarkAxisExpectation>> = {};
  for (const axis of Object.keys(expected.axis_values) as UxWritingCoordinateAxis[]) {
    observed[axis] = axis === "message_purposes"
      ? classification.axes.message_purposes.values
      : classification.axes[axis].value;
  }
  return observed;
}

function criterion(
  name: UxWritingBenchmarkCriterion,
  expected: unknown,
  actual: unknown,
): UxWritingBenchmarkCriterionResult {
  return { criterion: name, passed: exactEqual(expected, actual), expected, actual };
}

function metricSet(results: readonly UxWritingBenchmarkCaseResult[]): UxWritingBenchmarkMetricSet {
  return {
    case_count: results.length,
    cases_passing_all_criteria: results.filter(({ all_criteria_passed }) => all_criteria_passed).length,
    cases_failing_any_criterion: results.filter(({ all_criteria_passed }) => !all_criteria_passed).length,
    criteria: UX_WRITING_BENCHMARK_CRITERIA.map((name) => {
      const passed = results.filter(({ criteria }) => criteria.some((item) => item.criterion === name && item.passed)).length;
      const total = results.length;
      return { criterion: name, passed, failed: total - passed, total, pass_rate: total === 0 ? null : passed / total };
    }),
  };
}

function breakdown(
  results: readonly UxWritingBenchmarkCaseResult[],
  keys: (result: UxWritingBenchmarkCaseResult) => readonly string[],
): UxWritingBenchmarkBreakdown[] {
  const groups = new Map<string, UxWritingBenchmarkCaseResult[]>();
  for (const result of results) {
    for (const key of keys(result)) groups.set(key, [...(groups.get(key) ?? []), result]);
  }
  return [...groups.entries()].sort(([left], [right]) => left.localeCompare(right, "en"))
    .map(([key, members]) => ({ key, metrics: metricSet(members) }));
}

export function evaluateUxWritingBenchmark(input: {
  cases: readonly UxWritingBenchmarkCase[];
  adjudications: readonly UxWritingBenchmarkAdjudication[];
}): UxWritingBenchmarkReport {
  const adjudications = validateInputs(input.cases, input.adjudications);
  const caseResults = [...input.cases].sort((left, right) => left.case_id.localeCompare(right.case_id, "en"))
    .map((benchmarkCase): UxWritingBenchmarkCaseResult => {
      const adjudication = adjudications.get(benchmarkCase.case_id);
      invariant(adjudication !== undefined, `${benchmarkCase.case_id}:missing_adjudication`);
      const expected = adjudication.state === "revised"
        ? adjudication.expected_override
        : benchmarkCase.expected;
      invariant(expected !== null, `${benchmarkCase.case_id}:missing_expected`);

      const firstClassification = classifyUxWritingCoordinate(benchmarkCase.input);
      const firstResolution = resolveUxWritingPolicy({ classification: firstClassification, facts: benchmarkCase.facts });
      const secondClassification = classifyUxWritingCoordinate(benchmarkCase.input);
      const secondResolution = resolveUxWritingPolicy({ classification: secondClassification, facts: benchmarkCase.facts });
      const actualAxes = observedAxes(firstClassification, expected);
      const deterministicActual = canonicalJson({ classification: firstClassification, resolution: firstResolution })
        === canonicalJson({ classification: secondClassification, resolution: secondResolution });
      const criteria = [
        criterion("deterministic_replay", true, deterministicActual),
        criterion("scope", expected.scope_status, firstClassification.scope.status),
        criterion("axis_values", expected.axis_values, actualAxes),
        criterion("resolution_status", expected.resolution_status, firstResolution.status),
        criterion("resolution_reason", expected.resolution_reason, firstResolution.reason),
        criterion("route", expected.route_id, firstResolution.route?.route_id ?? null),
        criterion("candidate_routes", expected.candidate_route_ids, firstResolution.candidate_route_ids),
        criterion("missing_axes", expected.missing_axes, firstResolution.missing_axes),
        criterion("missing_facts", expected.missing_facts, firstResolution.missing_facts),
        criterion("authority_boundary", "none", firstClassification.authority_effect === "none"
          && firstResolution.authority_effect === "none" && benchmarkCase.authority_effect === "none" ? "none" : "violated"),
      ];
      return {
        case_id: benchmarkCase.case_id,
        category: benchmarkCase.category,
        route_slice: benchmarkCase.provenance.route_id ?? "none",
        slices: [...benchmarkCase.slices].sort(),
        adjudication_state: adjudication.state,
        included_in_qualified_metrics: adjudication.state === "accepted" || adjudication.state === "revised",
        all_criteria_passed: criteria.every(({ passed }) => passed),
        criteria,
        classification_id: firstClassification.classification_id,
        resolution_id: firstResolution.resolution_id,
      };
    });

  const qualified = caseResults.filter(({ included_in_qualified_metrics }) => included_in_qualified_metrics);
  const counts = {
    total: caseResults.length,
    pending_qualified_review: caseResults.filter(({ adjudication_state }) => adjudication_state === "pending_qualified_review").length,
    accepted: caseResults.filter(({ adjudication_state }) => adjudication_state === "accepted").length,
    revised: caseResults.filter(({ adjudication_state }) => adjudication_state === "revised").length,
    excluded: caseResults.filter(({ adjudication_state }) => adjudication_state === "excluded").length,
    qualified: qualified.length,
  };
  const releaseDisposition: UxWritingBenchmarkReport["release_disposition"] = counts.pending_qualified_review > 0 || qualified.length === 0
    ? "hold_for_qualified_review"
    : qualified.every(({ all_criteria_passed }) => all_criteria_passed)
      ? "qualified_regression_pass"
      : "qualified_regression_fail";
  const preimage = {
    contract_version: "contentmd.ux-writing-benchmark-report/0.1.0" as const,
    benchmark_version: "0.1.0" as const,
    language_scope: "english_only" as const,
    authority_effect: "none" as const,
    release_disposition: releaseDisposition,
    counts,
    provisional_metrics: metricSet(caseResults),
    qualified_metrics: qualified.length === 0 ? null : metricSet(qualified),
    by_category: breakdown(caseResults, ({ category }) => [category]),
    by_route: breakdown(caseResults, ({ route_slice }) => [route_slice]),
    by_slice: breakdown(caseResults, ({ slices }) => slices),
    case_results: caseResults,
  };
  return { ...preimage, report_digest: sha256Canonical(preimage) };
}
