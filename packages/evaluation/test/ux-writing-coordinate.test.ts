import { describe, expect, it } from "vitest";
import { classifyUxWritingCoordinate } from "../src/ux-writing-coordinate.js";
import { BUILTIN_UX_WRITING_POLICY_ROUTES, resolveUxWritingPolicy, selectRouteTemplate } from "../src/ux-writing-policy-routes.js";
import {
  UX_WRITING_AXIS_DEFINITIONS,
  UX_WRITING_DEFINED_VALUE_SETS,
  UX_WRITING_EVIDENCE_SOURCES,
  UX_WRITING_TAXONOMY_SCOPE,
  UX_WRITING_VALUE_DEFINITIONS,
} from "../src/ux-writing-taxonomy.js";

const paymentUnknown = () => classifyUxWritingCoordinate({
  work_intent: "contextual microcopy",
  journey: "checkout",
  state: "processing",
  event_state: "unknown",
  message_purposes: ["set expectations", "enable recovery"],
  content_slot: "status",
  interaction_pattern: "transaction summary",
  action_family: "pay",
  channel: "web",
  attention_mode: "status",
  task_structure: "single step",
  state_cause: "unknown",
  content_scope: "component",
  reversibility: "unknown",
  conversation_state: "not applicable",
  locale: "en-US",
  risk: "high",
  action: "pay order",
  outcome: "unknown",
  has_recovery: true,
});

describe("UX-writing coordinate classifier", () => {
  it("classifies each axis independently and deterministically", () => {
    const first = paymentUnknown();
    const second = paymentUnknown();
    expect(first).toEqual(second);
    expect(first.axes.journey.value).toBe("commitment");
    expect(first.axes.event_state.value).toBe("unknown");
    expect(first.axes.message_purposes.values).toEqual(["enable_recovery", "set_expectations"]);
    expect(first.axes.locale.value).toBe("en-US");
    expect(first.scope).toEqual({ status: "in_scope", language: "en", english_variant: "en-US", reasons: [] });
    expect(first.unresolved_axes).toEqual([]);
  });

  it("does not classify arbitrary expression text as product evidence", () => {
    const result = classifyUxWritingCoordinate({ text: "Payment failed. Try again." });
    expect(result.axes.state.reason).toBe("missing_input");
    expect(result.axes.event_state.reason).toBe("missing_input");
    expect(result.unresolved_axes).toContain("state");
  });

  it("preserves unknown labels as unclassified instead of forcing a nearest class", () => {
    const result = classifyUxWritingCoordinate({ journey: "celebration", state: "confusing" });
    expect(result.axes.journey.reason).toBe("no_match");
    expect(result.axes.state.reason).toBe("no_match");
  });

  it("accepts English variants and explicitly rejects non-English or localization work", () => {
    const english = classifyUxWritingCoordinate({ locale: "en_GB" });
    expect(english.axes.locale.value).toBe("en-GB");
    expect(english.scope.status).toBe("in_scope");

    const nonEnglish = classifyUxWritingCoordinate({ locale: "fr-FR" });
    expect(nonEnglish.axes.locale.reason).toBe("out_of_scope");
    expect(nonEnglish.scope).toEqual({
      status: "out_of_scope", language: "en", english_variant: null, reasons: ["non_english_locale"],
    });
    expect(resolveUxWritingPolicy({ classification: nonEnglish, facts: {} }).reason).toBe("out_of_scope");

    const localization = classifyUxWritingCoordinate({ work_intent: "localization", locale: "en-US" });
    expect(localization.axes.work_intent.reason).toBe("out_of_scope");
    expect(localization.scope.reasons).toEqual(["localization_request"]);
  });
});

describe("UX-writing policy routes", () => {
  it("resolves an unknown-payment route only when its facts are complete", () => {
    const classification = paymentUnknown();
    const incomplete = resolveUxWritingPolicy({ classification, facts: { payment_object: "order" } });
    expect(incomplete.status).toBe("abstain");
    expect(incomplete.reason).toBe("missing_facts");
    expect(incomplete.missing_facts).toEqual(["status_check_action"]);

    const complete = resolveUxWritingPolicy({ classification, facts: { payment_object: "order", status_check_action: "Check your activity" } });
    expect(complete.status).toBe("resolved");
    expect(complete.route?.route_id).toBe("commitment.payment.outcome_unknown");
    expect(complete.route?.forbidden_claims).toContain("retry_is_safe");
  });

  it("abstains when multiple policy routes match", () => {
    const classification = paymentUnknown();
    const baseRoute = {
      route_version: "0.2.0" as const,
      description: "test",
      when: { journey: ["commitment" as const] },
      required_axes: ["journey" as const],
      required_facts: [],
      forbidden_claims: [],
      recovery_requirement: "optional" as const,
      review_gates: ["content_design" as const],
      evidence_refs: ["internal.experience_taxonomy" as const],
      authority_effect: "none" as const,
    };
    const result = resolveUxWritingPolicy({ classification, facts: {}, routes: [{ ...baseRoute, route_id: "a" }, { ...baseRoute, route_id: "b" }] });
    expect(result.reason).toBe("ambiguous_route");
    expect(result.candidate_route_ids).toEqual(["a", "b"]);
  });

  it("selects a single route-bound template and rejects template ambiguity", () => {
    const classification = paymentUnknown();
    const facts = { payment_object: "Payment", status_check_action: "Check your activity" };
    const resolution = resolveUxWritingPolicy({ classification, facts });
    const template = { template_id: "unknown-payment", route_id: "commitment.payment.outcome_unknown", required_facts: ["payment_object", "status_check_action"], render: (values: Record<string, string>) => `${values.payment_object} status is not available yet. ${values.status_check_action}.` };
    expect(selectRouteTemplate(resolution, facts, [template]).text).toBe("Payment status is not available yet. Check your activity.");
    expect(selectRouteTemplate(resolution, facts, [template, { ...template, template_id: "duplicate" }]).reason).toBe("ambiguous_template");
  });

  it("separates a linear step indicator from a running process", () => {
    const classification = classifyUxWritingCoordinate({
      state: "input required",
      task_structure: "linear multistep",
      interaction_pattern: "step indicator",
      attention_mode: "inline",
    });
    const result = resolveUxWritingPolicy({
      classification,
      facts: { current_step: "2", total_steps: "4", conditional_step_behavior: "documented", separate_navigation: "present" },
    });
    expect(result.route?.route_id).toBe("progress.multistep.current_step");
    expect(result.route?.route_id).not.toBe("progress.action.delayed");
  });

  it("requires consent and privacy facts before resolving an out-of-app notification", () => {
    const classification = classifyUxWritingCoordinate({
      work_intent: "notification",
      journey: "management",
      event_state: "warning",
      channel: "push",
      attention_mode: "out of app",
    });
    const facts = { reminder_subject: "payment due", timing_basis: "due tomorrow", next_action: "review" };
    const result = resolveUxWritingPolicy({ classification, facts });
    expect(result.reason).toBe("missing_facts");
    expect(result.missing_facts).toEqual([
      "deduplication_policy", "foreground_behavior", "notification_consent_state", "sensitive_information_policy",
    ]);
  });

  it("keeps unexpected service failure separate from field validation", () => {
    const classification = classifyUxWritingCoordinate({
      journey: "recovery",
      state: "failed",
      event_state: "system error",
      state_cause: "system",
      interaction_pattern: "full page message",
      content_scope: "page",
      attention_mode: "page",
      outcome: "failed",
    });
    const result = resolveUxWritingPolicy({
      classification,
      facts: { entered_data_state: "saved", retry_timing: "later", support_or_alternative: "phone support" },
    });
    expect(result.route?.route_id).toBe("recovery.service.problem");
    expect(result.route?.route_id).not.toBe("input.validation.field_error");
  });

  it("separates first-use emptiness, search no-results, and permission emptiness", () => {
    const search = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        journey: "discovery", event_state: "empty", state_cause: "no results", action_family: "search",
        interaction_pattern: "empty state", content_scope: "page",
      }),
      facts: { search_scope: "transactions", active_query_or_filters: "coffee", next_action: "Clear filters" },
    });
    expect(search.route?.route_id).toBe("discovery.search.no_results");

    const firstUse = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        journey: "management", event_state: "empty", state_cause: "first use", action_family: "create",
        interaction_pattern: "empty state", content_scope: "page",
      }),
      facts: { collection_scope: "projects", future_content: "Your projects", first_action: "Create a project" },
    });
    expect(firstUse.route?.route_id).toBe("discovery.collection.first_use");

    const permission = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        event_state: "unavailable", state_cause: "permission", interaction_pattern: "empty state", content_scope: "section",
      }),
      facts: { restricted_data_scope: "team report", permission_basis: "admin access", access_request_path: "Ask an admin" },
    });
    expect(permission.route?.route_id).toBe("empty.permission.blocked");
  });

  it("separates an eligibility result from input validation", () => {
    const eligibility = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        journey: "evaluation", event_state: "unavailable", state_cause: "eligibility",
        interaction_pattern: "full page message", content_scope: "page",
      }),
      facts: {
        eligibility_outcome: "not eligible", result_basis: "age rule", next_action: "Review another service",
        ineligible_alternative: "Service directory",
      },
    });
    expect(eligibility.route?.route_id).toBe("evaluation.eligibility.result");

    const validation = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        event_state: "validation error", state_cause: "invalid input", action_family: "enter",
        content_slot: "error", content_scope: "field", attention_mode: "inline",
      }),
      facts: { field_label: "Date", validation_reason: "past date", correction: "Enter a future date", entered_value_preservation: "preserved" },
    });
    expect(validation.route?.route_id).toBe("input.validation.field_error");
  });

  it("separates a flexible task overview from a linear step indicator", () => {
    const classification = classifyUxWritingCoordinate({
      journey: "progress", task_structure: "task list", interaction_pattern: "task list", content_scope: "journey",
    });
    const result = resolveUxWritingPolicy({
      classification,
      facts: { task_set: "application tasks", task_order_constraints: "flexible", status_vocabulary: "not started,in progress,completed", resume_behavior: "saved" },
    });
    expect(result.route?.route_id).toBe("progress.multitask.overview");
    expect(result.route?.route_id).not.toBe("progress.multistep.current_step");
  });

  it("separates no-input, no-match, and dependent-system conversational errors", () => {
    const base = {
      work_intent: "conversational turn", task_structure: "conversation",
      interaction_pattern: "conversation prompt", channel: "voice",
    };
    const noInput = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({ ...base, conversation_state: "no input" }),
      facts: { original_question: "Which account?", attempt_count: "1", input_optionality: "required", max_attempt_behavior: "end after limit" },
    });
    expect(noInput.route?.route_id).toBe("conversation.input.no_input");

    const noMatch = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({ ...base, conversation_state: "no match" }),
      facts: { original_question: "Which account?", attempt_count: "1", valid_response_space: "checking or savings", max_attempt_behavior: "end after limit" },
    });
    expect(noMatch.route?.route_id).toBe("conversation.input.no_match");

    const systemError = resolveUxWritingPolicy({
      classification: classifyUxWritingCoordinate({
        ...base, conversation_state: "system error", event_state: "system error", state_cause: "external dependency",
      }),
      facts: { failed_request: "get balance", current_state: "unchanged", safe_next_action: "try later", alternative_path: "open the app" },
    });
    expect(systemError.route?.route_id).toBe("conversation.system.error");
  });

  it("abstains when a state cause needed to distinguish near-neighbor routes is missing", () => {
    const classification = classifyUxWritingCoordinate({
      journey: "discovery", event_state: "empty", action_family: "search",
      interaction_pattern: "empty state", content_scope: "page",
    });
    const result = resolveUxWritingPolicy({ classification, facts: {} });
    expect(result.reason).toBe("classification_incomplete");
    expect(result.missing_axes).toContain("state_cause");
  });
});

describe("grounded English taxonomy registry", () => {
  it("defines every classifier axis and resolves every evidence reference", () => {
    const classifiedAxes = Object.keys(paymentUnknown().axes).sort();
    const definedAxes = UX_WRITING_AXIS_DEFINITIONS.map(({ axis }) => axis).sort();
    expect(definedAxes).toEqual(classifiedAxes);

    const sourceIds = new Set(Object.keys(UX_WRITING_EVIDENCE_SOURCES));
    for (const definition of UX_WRITING_AXIS_DEFINITIONS) {
      expect(definition.evidence_refs.length).toBeGreaterThan(0);
      for (const reference of definition.evidence_refs) expect(sourceIds.has(reference)).toBe(true);
    }
  });

  it("keeps built-in routes unique, sourced, and English-only", () => {
    const routeIds = BUILTIN_UX_WRITING_POLICY_ROUTES.map(({ route_id }) => route_id);
    expect(new Set(routeIds).size).toBe(routeIds.length);
    expect(routeIds.some((routeId) => routeId.startsWith("localization."))).toBe(false);
    expect(UX_WRITING_TAXONOMY_SCOPE.language_scope).toBe("english_only");
    expect(UX_WRITING_TAXONOMY_SCOPE.excluded_capabilities).toContain("localization");

    const sourceIds = new Set(Object.keys(UX_WRITING_EVIDENCE_SOURCES));
    for (const route of BUILTIN_UX_WRITING_POLICY_ROUTES) {
      expect(route.evidence_refs.length).toBeGreaterThan(0);
      for (const reference of route.evidence_refs) expect(sourceIds.has(reference)).toBe(true);
    }
  });

  it("requires inclusion and exclusion criteria for every decision-critical value", () => {
    const expected = Object.entries(UX_WRITING_DEFINED_VALUE_SETS)
      .flatMap(([axis, values]) => values.map((value) => `${axis}:${value}`))
      .sort();
    const actual = UX_WRITING_VALUE_DEFINITIONS.map(({ axis, value }) => `${axis}:${value}`).sort();
    expect(actual).toEqual(expected);
    expect(new Set(actual).size).toBe(actual.length);

    const sourceIds = new Set(Object.keys(UX_WRITING_EVIDENCE_SOURCES));
    for (const definition of UX_WRITING_VALUE_DEFINITIONS) {
      expect(definition.include_when.length).toBeGreaterThan(0);
      expect(definition.exclude_when.length).toBeGreaterThan(0);
      for (const reference of definition.evidence_refs) expect(sourceIds.has(reference)).toBe(true);
    }
  });
});
