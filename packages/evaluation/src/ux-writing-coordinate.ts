import { sha256Canonical } from "@contentmd/core";

export const UX_WRITING_WORK_INTENTS = [
  "strategy", "journey", "pattern", "contextual_microcopy", "rewrite", "review",
  "recovery", "notification", "conversational_turn",
] as const;
export type UxWritingWorkIntent = typeof UX_WRITING_WORK_INTENTS[number];

export const UX_WRITING_JOURNEY_FAMILIES = [
  "access", "commitment", "completion", "discovery", "evaluation", "management",
  "onboarding", "progress", "recovery", "safety", "support",
] as const;
export type UxWritingJourneyFamily = typeof UX_WRITING_JOURNEY_FAMILIES[number];

export const UX_WRITING_STATE_CLASSES = [
  "action_available", "authentication_required", "blocked", "choice_required", "completed",
  "confirmation_required", "consent_required", "destructive_action_pending", "failed",
  "information_available", "input_required", "permission_required", "processing", "review_required",
  "risk_detected", "support_available",
] as const;
export type UxWritingStateClass = typeof UX_WRITING_STATE_CLASSES[number];

export const UX_WRITING_EVENT_STATES = [
  "idle", "not_started", "choice_required", "in_progress", "success", "partial_success", "warning",
  "validation_error", "system_error", "unavailable", "empty", "interrupted", "cancelled", "unknown",
] as const;
export type UxWritingEventState = typeof UX_WRITING_EVENT_STATES[number];

export const UX_WRITING_MESSAGE_PURPOSES = [
  "set_expectations", "explain", "guide", "reassure", "warn", "confirm", "provide_feedback",
  "reduce_friction", "offer_choice", "encourage", "disclose_consequence", "enable_recovery",
  "express_personality", "communicate_value", "build_trust", "educate", "orient", "prepare",
  "request_input", "clarify", "acknowledge", "repair",
] as const;
export type UxWritingMessagePurpose = typeof UX_WRITING_MESSAGE_PURPOSES[number];

export const UX_WRITING_CONTENT_SLOTS = [
  "action.primary", "body.supporting", "disclosure", "feedback.confirmation", "feedback.error",
  "feedback.status", "form.label", "heading.primary", "heading.section", "item.title",
  "label.descriptive", "navigation", "search_control", "task.status", "conversation.prompt",
  "conversation.response",
] as const;
export type UxWritingContentSlot = typeof UX_WRITING_CONTENT_SLOTS[number];

export const UX_WRITING_INTERACTION_PATTERNS = [
  "button_or_cta", "choice_selector", "confirmation_message", "destructive_confirmation",
  "empty_state", "error_message", "field_help", "form_label", "inline_notice",
  "interactive_explainer", "modal_dialog", "notification_banner", "onboarding_step", "placeholder",
  "product_description", "progress_indicator", "save_status", "search_result", "settings_control",
  "tooltip", "transaction_summary", "voice_prompt_examples", "article", "marketing_cta",
  "social_proof", "url_slug", "full_page_message", "step_indicator", "permission_prompt",
  "review_summary", "task_list", "verification_code", "conversation_prompt", "chat_message", "other",
] as const;
export type UxWritingInteractionPattern = typeof UX_WRITING_INTERACTION_PATTERNS[number];

export const UX_WRITING_ACTION_FAMILIES = [
  "navigate", "search", "authenticate", "register", "verify_identity", "provide_input", "choose",
  "consent", "grant_permission", "create", "save", "submit", "pay", "send", "book", "activate",
  "upload", "download", "track", "retry", "contact_support", "cancel", "refund", "return", "delete",
  "revoke", "unsubscribe", "report", "configure", "renew", "pause", "resume",
] as const;
export type UxWritingActionFamily = typeof UX_WRITING_ACTION_FAMILIES[number];

export const UX_WRITING_CHANNELS = [
  "web", "mobile_app", "desktop_app", "email", "sms", "push_notification", "voice",
  "cross_channel", "other",
] as const;
export type UxWritingChannel = typeof UX_WRITING_CHANNELS[number];

export const UX_WRITING_ATTENTION_MODES = [
  "inline", "status", "alert", "interruptive_dialog", "page", "out_of_app",
] as const;
export type UxWritingAttentionMode = typeof UX_WRITING_ATTENTION_MODES[number];

export const UX_WRITING_TASK_STRUCTURES = [
  "single_step", "linear_multistep", "flexible_multitask", "recurring", "conversational",
  "passive_monitoring",
] as const;
export type UxWritingTaskStructure = typeof UX_WRITING_TASK_STRUCTURES[number];

export const UX_WRITING_STATE_CAUSES = [
  "user_input", "user_action", "no_data_yet", "no_matching_data", "user_cleared_data",
  "authentication", "permission", "eligibility_rule", "configuration", "system", "network",
  "external_dependency", "time_expiry", "safety_signal", "unknown",
] as const;
export type UxWritingStateCause = typeof UX_WRITING_STATE_CAUSES[number];

export const UX_WRITING_CONTENT_SCOPES = [
  "field", "component", "section", "page", "journey", "system", "cross_channel",
] as const;
export type UxWritingContentScope = typeof UX_WRITING_CONTENT_SCOPES[number];

export const UX_WRITING_REVERSIBILITY = [
  "reversible", "conditionally_reversible", "irreversible", "unknown", "not_applicable",
] as const;
export type UxWritingReversibility = typeof UX_WRITING_REVERSIBILITY[number];

export const UX_WRITING_CONVERSATION_STATES = [
  "not_applicable", "initial_prompt", "parameter_confirmation", "action_confirmation", "no_input",
  "no_match", "disambiguation", "correction", "system_error", "handoff", "ending",
] as const;
export type UxWritingConversationState = typeof UX_WRITING_CONVERSATION_STATES[number];

export type UxWritingConsequenceRisk = "low" | "medium" | "high" | "critical" | "unknown";
export type UxWritingOutcome = "confirmed" | "partial" | "failed" | "unknown" | "not_applicable";
export type UxWritingAxisStatus = "exact" | "ambiguous" | "unclassified";
export type UxWritingAxisReason = "missing_input" | "no_match" | "ambiguous_match" | "out_of_scope" | null;
export type UxWritingLanguageScopeReason = "localization_request" | "non_english_locale";

export interface UxWritingAxisClassification<T extends string> {
  status: UxWritingAxisStatus;
  value: T | null;
  candidates: T[];
  matched_rules: string[];
  reason: UxWritingAxisReason;
}

export interface UxWritingMultiAxisClassification<T extends string> {
  status: UxWritingAxisStatus;
  values: T[];
  candidates: T[];
  matched_rules: string[];
  unmatched_inputs: string[];
  reason: UxWritingAxisReason;
}

export interface UxWritingCoordinateInput {
  text?: string;
  work_intent?: string | null;
  journey?: string | null;
  state?: string | null;
  event_state?: string | null;
  message_purposes?: string[];
  content_slot?: string | null;
  interaction_pattern?: string | null;
  action_family?: string | null;
  channel?: string | null;
  attention_mode?: string | null;
  task_structure?: string | null;
  state_cause?: string | null;
  content_scope?: string | null;
  reversibility?: string | null;
  conversation_state?: string | null;
  locale?: string | null;
  risk?: string | null;
  action?: string | null;
  outcome?: UxWritingOutcome;
  has_recovery?: boolean;
  actor?: string | null;
  audience?: string | null;
}

export type UxWritingCoordinateAxis =
  | "work_intent" | "journey" | "state" | "event_state" | "message_purposes"
  | "content_slot" | "interaction_pattern" | "action_family" | "channel" | "attention_mode"
  | "task_structure" | "state_cause" | "content_scope" | "reversibility" | "conversation_state"
  | "locale" | "risk";

export interface UxWritingCoordinateClassification {
  contract_version: "contentmd.ux-writing-coordinate-classification/0.3.0";
  classification_id: string;
  axes: {
    work_intent: UxWritingAxisClassification<UxWritingWorkIntent>;
    journey: UxWritingAxisClassification<UxWritingJourneyFamily>;
    state: UxWritingAxisClassification<UxWritingStateClass>;
    event_state: UxWritingAxisClassification<UxWritingEventState>;
    message_purposes: UxWritingMultiAxisClassification<UxWritingMessagePurpose>;
    content_slot: UxWritingAxisClassification<UxWritingContentSlot>;
    interaction_pattern: UxWritingAxisClassification<UxWritingInteractionPattern>;
    action_family: UxWritingAxisClassification<UxWritingActionFamily>;
    channel: UxWritingAxisClassification<UxWritingChannel>;
    attention_mode: UxWritingAxisClassification<UxWritingAttentionMode>;
    task_structure: UxWritingAxisClassification<UxWritingTaskStructure>;
    state_cause: UxWritingAxisClassification<UxWritingStateCause>;
    content_scope: UxWritingAxisClassification<UxWritingContentScope>;
    reversibility: UxWritingAxisClassification<UxWritingReversibility>;
    conversation_state: UxWritingAxisClassification<UxWritingConversationState>;
    locale: UxWritingAxisClassification<string>;
    risk: UxWritingAxisClassification<UxWritingConsequenceRisk>;
  };
  action_contract: {
    action: string | null;
    outcome: UxWritingOutcome;
    has_recovery: boolean | null;
  };
  context: { actor: string | null; audience: string | null; text: string };
  scope: {
    status: "in_scope" | "out_of_scope";
    language: "en";
    english_variant: string | null;
    reasons: UxWritingLanguageScopeReason[];
  };
  unresolved_axes: UxWritingCoordinateAxis[];
  authority_effect: "none";
}

type AliasRule<T extends string> = { id: string; value: T; aliases: readonly string[] };

function normalize(value: string): string {
  return value.trim().toLocaleLowerCase("en-US").replace(/[./\s-]+/gu, "_").replace(/^_+|_+$/gu, "");
}

function rules<T extends string>(axis: string, values: readonly T[], aliases: Partial<Record<T, readonly string[]>> = {}): AliasRule<T>[] {
  return values.map((value) => ({
    id: `${axis}.${value}`,
    value,
    aliases: [value, ...(aliases[value] ?? [])].map(normalize),
  }));
}

function classifyScalar<T extends string>(raw: string | null | undefined, registry: readonly AliasRule<T>[]): UxWritingAxisClassification<T> {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return { status: "unclassified", value: null, candidates: [], matched_rules: [], reason: "missing_input" };
  }
  const token = normalize(raw);
  const matches = registry.filter((rule) => rule.aliases.includes(token));
  const candidates = [...new Set(matches.map((match) => match.value))].sort();
  const matchedRules = matches.map((match) => match.id).sort();
  if (candidates.length === 1) {
    return { status: "exact", value: candidates[0] ?? null, candidates, matched_rules: matchedRules, reason: null };
  }
  if (candidates.length > 1) {
    return { status: "ambiguous", value: null, candidates, matched_rules: matchedRules, reason: "ambiguous_match" };
  }
  return { status: "unclassified", value: null, candidates: [], matched_rules: [], reason: "no_match" };
}

function classifyMany<T extends string>(raw: string[] | undefined, registry: readonly AliasRule<T>[]): UxWritingMultiAxisClassification<T> {
  if (raw === undefined || raw.length === 0) {
    return { status: "unclassified", values: [], candidates: [], matched_rules: [], unmatched_inputs: [], reason: "missing_input" };
  }
  const classifications = raw.map((value) => ({ raw: value, result: classifyScalar(value, registry) }));
  const values = [...new Set(classifications.flatMap(({ result }) => result.value === null ? [] : [result.value]))].sort();
  const candidates = [...new Set(classifications.flatMap(({ result }) => result.candidates))].sort();
  const matchedRules = [...new Set(classifications.flatMap(({ result }) => result.matched_rules))].sort();
  const unmatchedInputs = classifications.filter(({ result }) => result.status !== "exact").map(({ raw: value }) => value).sort();
  const ambiguous = classifications.some(({ result }) => result.status === "ambiguous");
  const unclassified = classifications.some(({ result }) => result.status === "unclassified");
  return {
    status: ambiguous ? "ambiguous" : unclassified ? "unclassified" : "exact",
    values,
    candidates,
    matched_rules: matchedRules,
    unmatched_inputs: unmatchedInputs,
    reason: ambiguous ? "ambiguous_match" : unclassified ? "no_match" : null,
  };
}

const WORK_INTENT_RULES = rules("work_intent", UX_WRITING_WORK_INTENTS, {
  contextual_microcopy: ["microcopy", "ui_copy", "interface_copy"],
  conversational_turn: ["conversation", "chat_turn", "assistant_turn"],
});
const OUT_OF_SCOPE_WORK_INTENTS = new Set([
  "localization", "localisation", "localize", "localise", "localization_request",
  "translation", "translate", "multilingual",
]);
const JOURNEY_RULES = rules("journey", UX_WRITING_JOURNEY_FAMILIES, {
  access: ["sign_in", "login", "account_access"],
  commitment: ["transact", "transaction", "checkout", "purchase", "submit"],
  completion: ["complete", "confirmation", "success"],
  discovery: ["discover", "browse", "search", "find"],
  evaluation: ["evaluate", "compare", "qualification", "eligibility"],
  management: ["manage", "settings", "preferences", "administration"],
  onboarding: ["onboard", "signup", "sign_up", "setup", "enrolment", "enrollment"],
  progress: ["pending", "wait", "processing", "tracking"],
  recovery: ["recover", "error_recovery", "refund", "return", "cancellation"],
  safety: ["security", "fraud", "incident", "emergency"],
  support: ["help", "assistance", "contact"],
});
const STATE_RULES = rules("state", UX_WRITING_STATE_CLASSES, {
  action_available: ["ready", "available", "actionable"],
  authentication_required: ["sign_in_required", "login_required"],
  blocked: ["ineligible", "restricted", "prerequisite_missing"],
  choice_required: ["select", "selection_required"],
  completed: ["complete", "confirmed", "saved"],
  confirmation_required: ["confirm", "explicit_confirmation_required"],
  consent_required: ["consent", "acceptance_required"],
  destructive_action_pending: ["delete_confirmation", "cancel_confirmation", "destructive_confirmation"],
  failed: ["failure", "error", "declined"],
  information_available: ["information", "details", "informational"],
  input_required: ["form_input_required", "field_required"],
  permission_required: ["permission", "access_permission_required"],
  processing: ["loading", "pending", "in_progress"],
  review_required: ["check_answers", "review_before_submit"],
  risk_detected: ["warning", "suspicious_activity", "fraud_detected"],
  support_available: ["help_available", "assistance_available"],
});
const EVENT_RULES = rules("event_state", UX_WRITING_EVENT_STATES, {
  not_started: ["not_yet_started"],
  in_progress: ["processing", "loading", "pending"],
  success: ["complete", "confirmed"],
  validation_error: ["invalid_input", "field_error"],
  system_error: ["failure", "failed"],
  unavailable: ["blocked", "ineligible"],
  empty: ["no_results", "no_items", "zero_state"],
  interrupted: ["timeout", "disconnected", "paused"],
  cancelled: ["canceled", "abandoned"],
});
const PURPOSE_RULES = rules("message_purpose", UX_WRITING_MESSAGE_PURPOSES, {
  set_expectations: ["expectations"], provide_feedback: ["feedback"], offer_choice: ["choice"],
  disclose_consequence: ["consequence"], enable_recovery: ["recovery"],
  express_personality: ["personality"], communicate_value: ["value"], build_trust: ["trust"],
  request_input: ["ask", "prompt"], clarify: ["disambiguate"], acknowledge: ["acknowledgement", "acknowledgment"],
  repair: ["conversational_repair", "reprompt"],
});
const CONTENT_SLOT_RULES = rules("content_slot", UX_WRITING_CONTENT_SLOTS, {
  "action.primary": ["primary_action", "button", "cta"],
  "body.supporting": ["supporting_body", "body"],
  "feedback.confirmation": ["confirmation", "success_feedback"],
  "feedback.error": ["error", "error_feedback"],
  "feedback.status": ["status", "progress_status"],
  "form.label": ["field_label", "label"],
  "heading.primary": ["page_heading", "h1"],
  "heading.section": ["section_heading", "h2"],
  "item.title": ["title"], "label.descriptive": ["descriptive_label"],
  navigation: ["nav", "link"], search_control: ["search", "filter", "search_filter"],
  "task.status": ["task_status"],
  "conversation.prompt": ["prompt", "voice_prompt"],
  "conversation.response": ["assistant_response", "chat_response"],
});
const PATTERN_RULES = rules("interaction_pattern", UX_WRITING_INTERACTION_PATTERNS, {
  task_list: ["checklist", "multi_task_list"],
  conversation_prompt: ["voice_prompt", "assistant_prompt"],
  chat_message: ["assistant_message", "conversation_message"],
});
const ACTION_RULES = rules("action_family", UX_WRITING_ACTION_FAMILIES, {
  authenticate: ["sign_in", "login"], register: ["sign_up", "signup", "enrol"],
  provide_input: ["enter", "type", "fill"], choose: ["select"], consent: ["agree", "accept"],
  grant_permission: ["allow", "permission"], contact_support: ["get_help", "contact"],
  cancel: ["cancel_action"], delete: ["remove"], report: ["report_issue"], configure: ["set_up", "setup"],
});
const CHANNEL_RULES = rules("channel", UX_WRITING_CHANNELS, {
  mobile_app: ["mobile", "app"], desktop_app: ["desktop"],
  sms: ["text_message"], push_notification: ["push", "push_message"],
  cross_channel: ["crosschannel", "multi_channel", "multichannel"],
});
const ATTENTION_MODE_RULES = rules("attention_mode", UX_WRITING_ATTENTION_MODES, {
  inline: ["in_context", "field_level"],
  status: ["live_region", "non_interruptive_status"],
  alert: ["non_modal_alert"],
  interruptive_dialog: ["alert_dialog", "modal", "dialog"],
  page: ["full_page", "context_change"],
  out_of_app: ["push_notification", "external_notification"],
});
const TASK_STRUCTURE_RULES = rules("task_structure", UX_WRITING_TASK_STRUCTURES, {
  single_step: ["single", "atomic"],
  linear_multistep: ["linear", "multi_step", "wizard"],
  flexible_multitask: ["task_list", "nonlinear_tasks", "multi_session_tasks"],
  recurring: ["repeat", "repeated"],
  conversational: ["dialogue", "conversation"],
  passive_monitoring: ["monitoring", "watching"],
});
const STATE_CAUSE_RULES = rules("state_cause", UX_WRITING_STATE_CAUSES, {
  user_input: ["invalid_input", "missing_input"],
  user_action: ["action_result"],
  no_data_yet: ["first_use", "never_created", "no_data"],
  no_matching_data: ["no_results", "query_no_match"],
  user_cleared_data: ["cleared", "deleted_data"],
  authentication: ["not_signed_in", "login"],
  permission: ["access_denied", "not_authorized"],
  eligibility_rule: ["eligibility", "policy_rule"],
  configuration: ["setup_required", "misconfigured"],
  system: ["service_failure", "technical_failure"],
  network: ["offline", "connectivity"],
  external_dependency: ["third_party", "dependency"],
  time_expiry: ["expired", "timeout"],
  safety_signal: ["fraud_signal", "security_signal"],
});
const CONTENT_SCOPE_RULES = rules("content_scope", UX_WRITING_CONTENT_SCOPES, {
  field: ["field_level"], component: ["local", "container"], section: ["area"],
  page: ["screen", "full_page"], journey: ["flow"], system: ["global", "system_level"],
  cross_channel: ["multichannel", "crosschannel"],
});
const REVERSIBILITY_RULES = rules("reversibility", UX_WRITING_REVERSIBILITY, {
  reversible: ["undoable"], conditionally_reversible: ["partly_reversible", "recoverable_with_conditions"],
  irreversible: ["not_reversible", "permanent"], not_applicable: ["na", "n_a"],
});
const CONVERSATION_STATE_RULES = rules("conversation_state", UX_WRITING_CONVERSATION_STATES, {
  not_applicable: ["na", "n_a"], initial_prompt: ["prompt", "question"],
  parameter_confirmation: ["confirm_parameter", "confirm_input"],
  action_confirmation: ["confirm_action", "explicit_confirmation"],
  no_input: ["silence", "no_response"], no_match: ["not_understood", "unrecognized_input"],
  disambiguation: ["clarification"], correction: ["user_correction"],
  system_error: ["dependent_system_error"], handoff: ["transfer"], ending: ["exit", "close"],
});
const RISK_RULES = rules("risk", ["low", "medium", "high", "critical", "unknown"] as const);

function classifyLocale(raw: string | null | undefined): UxWritingAxisClassification<string> {
  if (raw === null || raw === undefined || raw.trim().length === 0) {
    return { status: "unclassified", value: null, candidates: [], matched_rules: [], reason: "missing_input" };
  }
  const candidate = raw.trim().replace(/_/gu, "-");
  if (!/^[a-zA-Z]{2,3}(?:-[a-zA-Z0-9]{2,8})*$/u.test(candidate)) {
    return { status: "unclassified", value: null, candidates: [], matched_rules: [], reason: "no_match" };
  }
  const language = candidate.split("-")[0]?.toLocaleLowerCase("en-US");
  if (language !== "en") {
    return { status: "unclassified", value: null, candidates: [], matched_rules: ["locale.non_english"], reason: "out_of_scope" };
  }
  let value: string;
  try {
    value = Intl.getCanonicalLocales(candidate)[0] ?? candidate;
  } catch {
    return { status: "unclassified", value: null, candidates: [], matched_rules: [], reason: "no_match" };
  }
  return { status: "exact", value, candidates: [value], matched_rules: ["locale.english_bcp47"], reason: null };
}

function classifyWorkIntent(raw: string | null | undefined): UxWritingAxisClassification<UxWritingWorkIntent> {
  if (raw !== null && raw !== undefined && OUT_OF_SCOPE_WORK_INTENTS.has(normalize(raw))) {
    return { status: "unclassified", value: null, candidates: [], matched_rules: ["work_intent.localization_out_of_scope"], reason: "out_of_scope" };
  }
  return classifyScalar(raw, WORK_INTENT_RULES);
}

function cleanOptional(value: string | null | undefined): string | null {
  if (value === null || value === undefined || value.trim().length === 0) return null;
  return value.trim();
}

export function classifyUxWritingCoordinate(input: UxWritingCoordinateInput): UxWritingCoordinateClassification {
  const axes: UxWritingCoordinateClassification["axes"] = {
    work_intent: classifyWorkIntent(input.work_intent),
    journey: classifyScalar(input.journey, JOURNEY_RULES),
    state: classifyScalar(input.state, STATE_RULES),
    event_state: classifyScalar(input.event_state, EVENT_RULES),
    message_purposes: classifyMany(input.message_purposes, PURPOSE_RULES),
    content_slot: classifyScalar(input.content_slot, CONTENT_SLOT_RULES),
    interaction_pattern: classifyScalar(input.interaction_pattern, PATTERN_RULES),
    action_family: classifyScalar(input.action_family, ACTION_RULES),
    channel: classifyScalar(input.channel, CHANNEL_RULES),
    attention_mode: classifyScalar(input.attention_mode, ATTENTION_MODE_RULES),
    task_structure: classifyScalar(input.task_structure, TASK_STRUCTURE_RULES),
    state_cause: classifyScalar(input.state_cause, STATE_CAUSE_RULES),
    content_scope: classifyScalar(input.content_scope, CONTENT_SCOPE_RULES),
    reversibility: classifyScalar(input.reversibility, REVERSIBILITY_RULES),
    conversation_state: classifyScalar(input.conversation_state, CONVERSATION_STATE_RULES),
    locale: classifyLocale(input.locale),
    risk: classifyScalar(input.risk, RISK_RULES),
  };
  const unresolvedAxes = (Object.entries(axes) as Array<[UxWritingCoordinateAxis, { status: UxWritingAxisStatus }]>)
    .filter(([, axis]) => axis.status !== "exact")
    .map(([name]) => name)
    .sort();
  const scopeReasons: UxWritingLanguageScopeReason[] = [];
  if (axes.work_intent.reason === "out_of_scope") scopeReasons.push("localization_request");
  if (axes.locale.reason === "out_of_scope") scopeReasons.push("non_english_locale");
  const scope: UxWritingCoordinateClassification["scope"] = {
    status: scopeReasons.length === 0 ? "in_scope" : "out_of_scope",
    language: "en",
    english_variant: axes.locale.status === "exact" ? axes.locale.value : null,
    reasons: scopeReasons,
  };
  const preimage = {
    axes,
    action_contract: {
      action: cleanOptional(input.action),
      outcome: input.outcome ?? "not_applicable" as const,
      has_recovery: input.has_recovery ?? null,
    },
    context: {
      actor: cleanOptional(input.actor),
      audience: cleanOptional(input.audience),
      text: input.text?.trim() ?? "",
    },
    scope,
    unresolved_axes: unresolvedAxes,
    authority_effect: "none" as const,
  };
  const digest = sha256Canonical(preimage);
  return {
    contract_version: "contentmd.ux-writing-coordinate-classification/0.3.0",
    classification_id: `uxwcoordinate.${digest.slice(0, 32)}`,
    ...preimage,
  };
}
