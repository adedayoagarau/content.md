import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { canonicalJson } from "../packages/core/src/index.ts";
import {
  evaluateUxWritingBenchmark,
  type UxWritingBenchmarkAdjudication,
  type UxWritingBenchmarkCase,
  type UxWritingBenchmarkExpectedResult,
} from "../packages/evaluation/src/ux-writing-benchmark.ts";
import {
  UX_WRITING_ACTION_FAMILIES,
  UX_WRITING_ATTENTION_MODES,
  UX_WRITING_CHANNELS,
  UX_WRITING_CONTENT_SCOPES,
  UX_WRITING_CONTENT_SLOTS,
  UX_WRITING_CONVERSATION_STATES,
  UX_WRITING_EVENT_STATES,
  UX_WRITING_INTERACTION_PATTERNS,
  UX_WRITING_JOURNEY_FAMILIES,
  UX_WRITING_MESSAGE_PURPOSES,
  UX_WRITING_REVERSIBILITY,
  UX_WRITING_STATE_CAUSES,
  UX_WRITING_STATE_CLASSES,
  UX_WRITING_TASK_STRUCTURES,
  UX_WRITING_WORK_INTENTS,
  classifyUxWritingCoordinate,
  type UxWritingCoordinateAxis,
  type UxWritingCoordinateClassification,
  type UxWritingCoordinateInput,
} from "../packages/evaluation/src/ux-writing-coordinate.ts";
import {
  BUILTIN_UX_WRITING_POLICY_ROUTES,
  resolveUxWritingPolicy,
  type UxWritingPolicyRoute,
} from "../packages/evaluation/src/ux-writing-policy-routes.ts";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
const FIXTURE_DIRECTORY = fileURLToPath(new URL("../fixtures/ux-writing-usecases/", import.meta.url));
const BENCHMARK_PATH = fileURLToPath(new URL("../fixtures/ux-writing-usecases/benchmark-v0.1.jsonl", import.meta.url));
const ADJUDICATION_PATH = fileURLToPath(new URL("../fixtures/ux-writing-usecases/adjudication-v0.1.jsonl", import.meta.url));
const MANIFEST_PATH = fileURLToPath(new URL("../fixtures/ux-writing-usecases/benchmark-manifest-v0.1.json", import.meta.url));

type RouteDimension = Exclude<UxWritingCoordinateAxis, "locale"> | "outcome";
type Assignment = Record<RouteDimension, string>;

const DIMENSIONS: readonly RouteDimension[] = [
  "work_intent", "journey", "state", "event_state", "message_purposes", "content_slot",
  "interaction_pattern", "action_family", "channel", "attention_mode", "task_structure",
  "state_cause", "content_scope", "reversibility", "conversation_state", "risk", "outcome",
];

const UNIVERSES: Record<RouteDimension, readonly string[]> = {
  work_intent: UX_WRITING_WORK_INTENTS,
  journey: UX_WRITING_JOURNEY_FAMILIES,
  state: UX_WRITING_STATE_CLASSES,
  event_state: UX_WRITING_EVENT_STATES,
  message_purposes: UX_WRITING_MESSAGE_PURPOSES,
  content_slot: UX_WRITING_CONTENT_SLOTS,
  interaction_pattern: UX_WRITING_INTERACTION_PATTERNS,
  action_family: UX_WRITING_ACTION_FAMILIES,
  channel: UX_WRITING_CHANNELS,
  attention_mode: UX_WRITING_ATTENTION_MODES,
  task_structure: UX_WRITING_TASK_STRUCTURES,
  state_cause: UX_WRITING_STATE_CAUSES,
  content_scope: UX_WRITING_CONTENT_SCOPES,
  reversibility: UX_WRITING_REVERSIBILITY,
  conversation_state: UX_WRITING_CONVERSATION_STATES,
  risk: ["low", "medium", "high", "critical", "unknown"],
  outcome: ["confirmed", "partial", "failed", "unknown", "not_applicable"],
};

const PREFERRED_DEFAULTS: Assignment = {
  work_intent: "contextual_microcopy",
  journey: "management",
  state: "information_available",
  event_state: "idle",
  message_purposes: "explain",
  content_slot: "body.supporting",
  interaction_pattern: "inline_notice",
  action_family: "navigate",
  channel: "web",
  attention_mode: "inline",
  task_structure: "single_step",
  state_cause: "user_action",
  content_scope: "component",
  reversibility: "not_applicable",
  conversation_state: "not_applicable",
  risk: "low",
  outcome: "not_applicable",
};

function invariant(condition: unknown, code: string): asserts condition {
  if (!condition) throw new Error(`ux_writing_benchmark_generation_failed:${code}`);
}

function sha256(value: string | Buffer): string {
  return createHash("sha256").update(value).digest("hex");
}

function routeValues(route: UxWritingPolicyRoute, dimension: RouteDimension): readonly string[] | undefined {
  if (dimension === "message_purposes") return route.when.message_purposes_any;
  if (dimension === "outcome") return route.when.outcome;
  return (route.when as Record<string, readonly string[] | undefined>)[dimension];
}

function compatible(route: UxWritingPolicyRoute, assignment: Partial<Assignment>): boolean {
  return Object.entries(assignment).every(([dimension, value]) => {
    const allowed = routeValues(route, dimension as RouteDimension);
    return allowed === undefined || allowed.includes(value ?? "");
  });
}

function rotated<T>(values: readonly T[], offset: number): T[] {
  if (values.length === 0) return [];
  const shift = offset % values.length;
  return [...values.slice(shift), ...values.slice(0, shift)];
}

function choicesFor(target: UxWritingPolicyRoute, dimension: RouteDimension, variant: number): string[] {
  const constrained = routeValues(target, dimension);
  if (constrained !== undefined) return rotated(constrained, variant);
  const preferred = PREFERRED_DEFAULTS[dimension];
  return [preferred, ...UNIVERSES[dimension].filter((value) => value !== preferred)];
}

function solveRouteAssignment(target: UxWritingPolicyRoute, variant: number): Assignment {
  let visited = 0;
  const search = (
    assignment: Partial<Assignment>,
    remaining: readonly RouteDimension[],
    candidates: readonly UxWritingPolicyRoute[],
  ): Assignment | null => {
    visited += 1;
    invariant(visited < 250_000, `${target.route_id}:solver_limit`);
    if (candidates.length === 1 && candidates[0]?.route_id === target.route_id) {
      const complete = { ...assignment } as Assignment;
      for (const dimension of remaining) {
        const value = choicesFor(target, dimension, variant)[0];
        invariant(value !== undefined, `${target.route_id}:${dimension}:empty_universe`);
        complete[dimension] = value;
      }
      return complete;
    }
    if (remaining.length === 0) return null;

    const rankedDimensions = remaining.map((dimension) => {
      const choices = choicesFor(target, dimension, variant);
      const rankedChoices = choices.map((value, preference) => ({
        value,
        preference,
        candidates: candidates.filter((candidate) => compatible(candidate, { ...assignment, [dimension]: value })),
      })).filter(({ candidates: next }) => next.some(({ route_id }) => route_id === target.route_id))
        .sort((left, right) => left.preference - right.preference
          || left.candidates.length - right.candidates.length);
      return { dimension, rankedChoices, best: rankedChoices[0]?.candidates.length ?? Number.POSITIVE_INFINITY };
    }).sort((left, right) => left.best - right.best
      || DIMENSIONS.indexOf(left.dimension) - DIMENSIONS.indexOf(right.dimension));

    const selected = rankedDimensions[0];
    if (selected === undefined) return null;
    const nextRemaining = remaining.filter((dimension) => dimension !== selected.dimension);
    for (const choice of selected.rankedChoices) {
      const result = search({ ...assignment, [selected.dimension]: choice.value }, nextRemaining, choice.candidates);
      if (result !== null) return result;
    }
    return null;
  };

  const solved = search({}, DIMENSIONS, BUILTIN_UX_WRITING_POLICY_ROUTES);
  invariant(solved !== null, `${target.route_id}:no_unique_assignment`);
  return solved;
}

function inputFromAssignment(assignment: Assignment, locale: "en-US" | "en-GB", text: string): UxWritingCoordinateInput {
  return {
    text,
    work_intent: assignment.work_intent,
    journey: assignment.journey,
    state: assignment.state,
    event_state: assignment.event_state,
    message_purposes: [assignment.message_purposes],
    content_slot: assignment.content_slot,
    interaction_pattern: assignment.interaction_pattern,
    action_family: assignment.action_family,
    channel: assignment.channel,
    attention_mode: assignment.attention_mode,
    task_structure: assignment.task_structure,
    state_cause: assignment.state_cause,
    content_scope: assignment.content_scope,
    reversibility: assignment.reversibility,
    conversation_state: assignment.conversation_state,
    locale,
    risk: assignment.risk,
    action: `perform ${assignment.action_family}`,
    outcome: assignment.outcome as "confirmed" | "partial" | "failed" | "unknown" | "not_applicable",
    has_recovery: true,
    actor: "person",
    audience: "product user",
  };
}

function factsForRoute(route: UxWritingPolicyRoute): Record<string, string> {
  return Object.fromEntries(route.required_facts.map((fact) => [fact, `Established ${fact.replaceAll("_", " ")}`]));
}

function axisValues(classification: UxWritingCoordinateClassification): UxWritingBenchmarkExpectedResult["axis_values"] {
  return Object.fromEntries((Object.keys(classification.axes) as UxWritingCoordinateAxis[]).map((axis) => [
    axis,
    axis === "message_purposes" ? classification.axes.message_purposes.values : classification.axes[axis].value,
  ]));
}

function expectedFor(input: UxWritingCoordinateInput, facts: Record<string, string>): UxWritingBenchmarkExpectedResult {
  const classification = classifyUxWritingCoordinate(input);
  const resolution = resolveUxWritingPolicy({ classification, facts });
  return {
    scope_status: classification.scope.status,
    axis_values: axisValues(classification),
    resolution_status: resolution.status,
    resolution_reason: resolution.reason,
    route_id: resolution.route?.route_id ?? null,
    candidate_route_ids: resolution.candidate_route_ids,
    missing_axes: resolution.missing_axes,
    missing_facts: resolution.missing_facts,
    authority_effect: "none",
  };
}

function caseId(value: string): string {
  return `uxw.0_1.${value.replaceAll(/[^a-z0-9._-]+/gu, "_").replaceAll("..", ".")}`;
}

function benchmarkCase(input: {
  id: string;
  category: UxWritingBenchmarkCase["category"];
  coordinate: UxWritingCoordinateInput;
  facts: Record<string, string>;
  route: UxWritingPolicyRoute | null;
  slices: string[];
  assertedRoute?: string | null;
  assertedReason?: UxWritingBenchmarkExpectedResult["resolution_reason"];
}): UxWritingBenchmarkCase {
  const expected = expectedFor(input.coordinate, input.facts);
  if ("assertedRoute" in input) invariant(expected.route_id === input.assertedRoute, `${input.id}:route:${expected.route_id}`);
  if (input.assertedReason !== undefined) invariant(expected.resolution_reason === input.assertedReason, `${input.id}:reason:${expected.resolution_reason}`);
  return {
    contract_version: "contentmd.ux-writing-benchmark-case/0.1.0",
    benchmark_version: "0.1.0",
    case_id: caseId(input.id),
    category: input.category,
    input: input.coordinate,
    facts: input.facts,
    expected,
    slices: [...new Set(input.slices)].sort(),
    provenance: {
      source_kind: "authored_synthetic",
      route_id: input.route?.route_id ?? null,
      evidence_refs: [...(input.route?.evidence_refs ?? [])].sort(),
      label_status: "provisional_pending_qualified_review",
      external_corpus_used: false,
    },
    authority_effect: "none",
  };
}

function removeAxis(input: UxWritingCoordinateInput, axis: UxWritingCoordinateAxis): UxWritingCoordinateInput {
  const copy = { ...input };
  delete (copy as Record<string, unknown>)[axis];
  return copy;
}

function buildRouteCases(): { cases: UxWritingBenchmarkCase[]; canonical: Map<string, UxWritingBenchmarkCase> } {
  const cases: UxWritingBenchmarkCase[] = [];
  const canonical = new Map<string, UxWritingBenchmarkCase>();
  for (const route of BUILTIN_UX_WRITING_POLICY_ROUTES) {
    const slug = route.route_id;
    const facts = factsForRoute(route);
    const canonicalInput = inputFromAssignment(solveRouteAssignment(route, 0), "en-US", `Canonical authored case for ${route.route_id}.`);
    const primary = benchmarkCase({
      id: `route.${slug}.canonical`, category: "route_canonical", coordinate: canonicalInput, facts,
      route, slices: [`route:${slug}`, "variant:en-US"], assertedRoute: route.route_id,
    });
    cases.push(primary);
    canonical.set(route.route_id, primary);

    const britishInput = inputFromAssignment(solveRouteAssignment(route, 1), "en-GB", `English variant authored case for ${route.route_id}.`);
    cases.push(benchmarkCase({
      id: `route.${slug}.en-gb`, category: "route_english_variant", coordinate: britishInput, facts,
      route, slices: [`route:${slug}`, "variant:en-GB"], assertedRoute: route.route_id,
    }));

    const missingFact = route.required_facts[0];
    invariant(missingFact !== undefined, `${slug}:missing_required_fact_seed`);
    const incompleteFacts = { ...facts };
    delete incompleteFacts[missingFact];
    cases.push(benchmarkCase({
      id: `route.${slug}.missing-fact`, category: "route_missing_fact", coordinate: canonicalInput,
      facts: incompleteFacts, route, slices: [`route:${slug}`, "abstention:missing_facts"], assertedRoute: null,
      assertedReason: "missing_facts",
    }));

    let incompleteAxisCase: UxWritingBenchmarkCase | null = null;
    for (const axis of [...route.required_axes].sort()) {
      const coordinate = removeAxis(canonicalInput, axis);
      const candidate = benchmarkCase({
        id: `route.${slug}.missing-axis-${axis}`, category: "route_missing_axis", coordinate, facts,
        route, slices: [`route:${slug}`, "abstention:classification_incomplete", `missing_axis:${axis}`],
      });
      if (candidate.expected.resolution_reason === "classification_incomplete"
        && candidate.expected.candidate_route_ids.includes(route.route_id)) {
        incompleteAxisCase = candidate;
        break;
      }
    }
    invariant(incompleteAxisCase !== null, `${slug}:no_missing_axis_case`);
    cases.push(incompleteAxisCase);
  }
  return { cases, canonical };
}

function cloneResolvedCase(
  source: UxWritingBenchmarkCase,
  id: string,
  distinction: string[],
  overrides: Partial<UxWritingCoordinateInput> = {},
): UxWritingBenchmarkCase {
  const route = BUILTIN_UX_WRITING_POLICY_ROUTES.find(({ route_id }) => route_id === source.provenance.route_id);
  invariant(route !== undefined, `${id}:route_lookup`);
  return benchmarkCase({
    id, category: "critical_near_neighbor", coordinate: { ...source.input, ...overrides }, facts: source.facts,
    route, slices: [`route:${route.route_id}`, ...distinction.map((value) => `distinction:${value}`)],
    assertedRoute: route.route_id,
  });
}

function buildNearNeighborCases(canonical: Map<string, UxWritingBenchmarkCase>): UxWritingBenchmarkCase[] {
  const get = (routeId: string): UxWritingBenchmarkCase => {
    const value = canonical.get(routeId);
    invariant(value !== undefined, `near_neighbor:${routeId}`);
    return value;
  };
  return [
    cloneResolvedCase(get("input.validation.field_error"), "neighbor.validation", ["validation_vs_eligibility"]),
    cloneResolvedCase(get("evaluation.eligibility.result"), "neighbor.eligibility", ["validation_vs_eligibility"]),
    cloneResolvedCase(get("progress.action.delayed"), "neighbor.processing", ["processing_vs_step"]),
    cloneResolvedCase(get("progress.multistep.current_step"), "neighbor.linear-step", ["processing_vs_step", "linear_vs_flexible"]),
    cloneResolvedCase(get("progress.multitask.overview"), "neighbor.flexible-tasks", ["linear_vs_flexible"]),
    cloneResolvedCase(get("discovery.search.no_results"), "neighbor.empty-no-results", ["empty_causes"]),
    cloneResolvedCase(get("discovery.collection.first_use"), "neighbor.empty-first-use", ["empty_causes"]),
    cloneResolvedCase(get("safety.account.risk_detected"), "neighbor.alert", ["alert_vs_alert_dialog"], { attention_mode: "alert" }),
    cloneResolvedCase(get("safety.account.risk_detected"), "neighbor.alert-dialog", ["alert_vs_alert_dialog"], { interaction_pattern: "modal_dialog", attention_mode: "interruptive_dialog" }),
    cloneResolvedCase(get("conversation.input.no_input"), "neighbor.conversation-no-input", ["conversation_repair_states"]),
    cloneResolvedCase(get("conversation.input.no_match"), "neighbor.conversation-no-match", ["conversation_repair_states"]),
    cloneResolvedCase(get("conversation.system.error"), "neighbor.conversation-system-error", ["conversation_repair_states"]),
    cloneResolvedCase(get("conversation.parameter.confirm"), "neighbor.parameter-confirm", ["parameter_vs_action_confirmation"]),
    cloneResolvedCase(get("conversation.action.confirm"), "neighbor.action-confirm", ["parameter_vs_action_confirmation"]),
  ];
}

function buildOutOfScopeCases(canonical: Map<string, UxWritingBenchmarkCase>): UxWritingBenchmarkCase[] {
  const seeds = [...canonical.values()].slice(0, 10);
  const locales = ["fr-FR", "es-ES", "de-DE", "ja-JP", "ar-EG"];
  return seeds.map((seed, index) => {
    const locale = locales[index];
    const coordinate = index < 5
      ? { ...seed.input, locale }
      : { ...seed.input, work_intent: index % 2 === 0 ? "translation" : "localization", locale: "en-US" };
    return benchmarkCase({
      id: `out-of-scope.${String(index + 1).padStart(2, "0")}`,
      category: "out_of_scope",
      coordinate,
      facts: seed.facts,
      route: null,
      slices: [index < 5 ? "scope:non_english_locale" : "scope:localization_request"],
      assertedRoute: null,
      assertedReason: "out_of_scope",
    });
  });
}

function buildNoRouteCases(): UxWritingBenchmarkCase[] {
  const cases: UxWritingBenchmarkCase[] = [];
  const seen = new Set<string>();
  for (let seed = 0; cases.length < 10 && seed < 10_000; seed += 1) {
    const assignment = Object.fromEntries(DIMENSIONS.map((dimension, index) => {
      const universe = UNIVERSES[dimension];
      return [dimension, universe[(seed * (index + 3) + index * 5) % universe.length]];
    })) as Assignment;
    const coordinate = inputFromAssignment(assignment, seed % 2 === 0 ? "en-US" : "en-GB", `Fully classified no-route case ${seed}.`);
    const key = canonicalJson(coordinate);
    if (seen.has(key)) continue;
    const expected = expectedFor(coordinate, {});
    if (expected.resolution_reason !== "no_route") continue;
    seen.add(key);
    cases.push(benchmarkCase({
      id: `no-route.${String(cases.length + 1).padStart(2, "0")}`,
      category: "no_route", coordinate, facts: {}, route: null,
      slices: ["abstention:no_route", "classification:complete"], assertedRoute: null, assertedReason: "no_route",
    }));
  }
  invariant(cases.length === 10, "no_route_count");
  return cases;
}

function buildTextOnlyCases(): UxWritingBenchmarkCase[] {
  const texts = [
    "Payment failed. Try again.", "You are all set.", "Nothing here yet.", "Continue",
    "We could not do that.", "Check your details.", "Your request is processing.",
    "Contact support.", "Confirm deletion.", "Choose an option.",
  ];
  return texts.map((text, index) => benchmarkCase({
    id: `text-only.${String(index + 1).padStart(2, "0")}`,
    category: "text_only_non_evidence",
    coordinate: { text, locale: index % 2 === 0 ? "en-US" : "en-GB" },
    facts: {}, route: null,
    slices: ["abstention:classification_incomplete", "input:text_only_non_evidence"],
    assertedRoute: null, assertedReason: "classification_incomplete",
  }));
}

function pendingAdjudication(benchmarkCaseValue: UxWritingBenchmarkCase): UxWritingBenchmarkAdjudication {
  return {
    contract_version: "contentmd.ux-writing-benchmark-adjudication/0.1.0",
    benchmark_version: "0.1.0",
    case_id: benchmarkCaseValue.case_id,
    state: "pending_qualified_review",
    reviewer: null,
    reviewed_at: null,
    rationale: null,
    expected_override: null,
    authority_effect: "none",
  };
}

function rawJsonl(values: readonly unknown[]): string {
  return `${values.map((value) => canonicalJson(value).trimEnd()).join("\n")}\n`;
}

const routeCases = buildRouteCases();
const cases = [
  ...routeCases.cases,
  ...buildNearNeighborCases(routeCases.canonical),
  ...buildOutOfScopeCases(routeCases.canonical),
  ...buildNoRouteCases(),
  ...buildTextOnlyCases(),
].sort((left, right) => left.case_id.localeCompare(right.case_id, "en"));
const adjudications = cases.map(pendingAdjudication);
invariant(cases.length === 200, `case_count:${cases.length}`);
invariant(new Set(cases.map(({ case_id }) => case_id)).size === cases.length, "duplicate_case_id");

const report = evaluateUxWritingBenchmark({ cases, adjudications });
invariant(report.provisional_metrics.cases_failing_any_criterion === 0, "provisional_regression");
invariant(report.counts.pending_qualified_review === 200 && report.counts.qualified === 0, "adjudication_state");
invariant(report.release_disposition === "hold_for_qualified_review", "release_disposition");

const benchmarkRaw = rawJsonl(cases);
const adjudicationRaw = rawJsonl(adjudications);
const categoryCounts = Object.fromEntries([...new Set(cases.map(({ category }) => category))].sort()
  .map((category) => [category, cases.filter((item) => item.category === category).length]));
const routeCoverage = BUILTIN_UX_WRITING_POLICY_ROUTES.map(({ route_id }) => route_id).sort();
invariant(routeCoverage.every((routeId) => cases.some(({ provenance }) => provenance.route_id === routeId)), "route_coverage");

const inputPaths = [
  "packages/evaluation/src/ux-writing-coordinate.ts",
  "packages/evaluation/src/ux-writing-policy-routes.ts",
  "packages/evaluation/src/ux-writing-taxonomy.ts",
  "packages/evaluation/src/ux-writing-benchmark.ts",
  "scripts/generate-ux-writing-usecase-benchmark.mts",
];
const manifest = {
  contract_version: "contentmd.ux-writing-benchmark-manifest/0.1.0",
  benchmark_id: "contentmd.english-ux-writing-usecases",
  benchmark_version: "0.1.0",
  language_scope: "english_only",
  label_status: "authored_synthetic_provisional_pending_qualified_review",
  authority_effect: "none",
  release_disposition: "hold_for_qualified_review",
  counts: {
    cases: cases.length,
    adjudications: adjudications.length,
    qualified_adjudications: 0,
    routes_covered: routeCoverage.length,
    categories: categoryCounts,
  },
  route_coverage: routeCoverage,
  files: [
    { path: "fixtures/ux-writing-usecases/benchmark-v0.1.jsonl", raw_bytes_digest: sha256(benchmarkRaw), byte_count: Buffer.byteLength(benchmarkRaw), records: cases.length },
    { path: "fixtures/ux-writing-usecases/adjudication-v0.1.jsonl", raw_bytes_digest: sha256(adjudicationRaw), byte_count: Buffer.byteLength(adjudicationRaw), records: adjudications.length },
  ],
  generator_inputs: inputPaths.map((path) => {
    const bytes = readFileSync(`${ROOT}${path}`);
    return { path, raw_bytes_digest: sha256(bytes), byte_count: bytes.length };
  }),
  provenance: {
    source_kind: "authored_synthetic",
    external_corpora_used: [],
    excluded_corpora: [{ id: "goodmicrocopy", reason: "awaiting_classifier_and_not_eligible_as_gold_or_benchmark_authority" }],
    human_review_default: false,
    human_gold_claimed: false,
    independent_adjudication_required: true,
    primary_adjudicator: "ai_classifier_evaluator",
  },
};
const manifestRaw = canonicalJson(manifest);

if (process.argv.includes("--check")) {
  invariant(readFileSync(BENCHMARK_PATH, "utf8") === benchmarkRaw, "benchmark_out_of_date");
  invariant(readFileSync(ADJUDICATION_PATH, "utf8") === adjudicationRaw, "adjudication_out_of_date");
  invariant(readFileSync(MANIFEST_PATH, "utf8") === manifestRaw, "manifest_out_of_date");
  process.stdout.write(`UX-writing benchmark verified: ${cases.length} cases, ${routeCoverage.length} routes\n`);
} else {
  mkdirSync(FIXTURE_DIRECTORY, { recursive: true });
  writeFileSync(BENCHMARK_PATH, benchmarkRaw, "utf8");
  writeFileSync(ADJUDICATION_PATH, adjudicationRaw, "utf8");
  writeFileSync(MANIFEST_PATH, manifestRaw, "utf8");
  process.stdout.write(`UX-writing benchmark generated: ${cases.length} cases, ${routeCoverage.length} routes\n`);
}
