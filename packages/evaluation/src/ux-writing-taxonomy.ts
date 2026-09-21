import {
  UX_WRITING_CONTENT_SCOPES,
  UX_WRITING_CONVERSATION_STATES,
  UX_WRITING_REVERSIBILITY,
  UX_WRITING_STATE_CAUSES,
  UX_WRITING_TASK_STRUCTURES,
} from "./ux-writing-coordinate.js";

export const UX_WRITING_TAXONOMY_SCOPE = {
  taxonomy_version: "0.3.0",
  language_scope: "english_only",
  supported_languages: ["en"],
  english_variants: "BCP 47 language tags whose primary language subtag is en",
  excluded_capabilities: [
    "translation",
    "localization",
    "multilingual_generation",
    "multilingual_evaluation",
    "cross_language_semantic_parity",
  ],
  authority_effect: "none",
} as const;

export const UX_WRITING_EVIDENCE_SOURCES = {
  "project.english_scope": {
    source_type: "project_decision",
    title: "English-only scope decision",
    locator: "docs/verification/deterministic-usecase-writing-system.md",
    accessed_on: "2026-09-19",
    supports: "Limits this taxonomy version to English while retaining English regional variants as context.",
  },
  "internal.experience_taxonomy": {
    source_type: "local_research",
    title: "Public product corpus experience taxonomy",
    locator: "research/09-experimental/public-product-corpus/experience-taxonomy.json",
    accessed_on: "2026-09-19",
    supports: "Journey, product-state, action, and content-slot seed classes.",
  },
  "internal.annotation_taxonomy": {
    source_type: "local_research",
    title: "Good Microcopy experimental annotation taxonomy",
    locator: "research/09-experimental/goodmicrocopy/annotation-taxonomy-v0.2.json",
    accessed_on: "2026-09-19",
    supports: "Event state, message purpose, interaction pattern, channel, and risk dimensions; hypothesis labels only.",
  },
  "internal.capability_schema": {
    source_type: "local_research",
    title: "UX-writing capability request schema",
    locator: "research/09-experimental/ux-writing-capability-record-proposals.schema.json",
    accessed_on: "2026-09-19",
    supports: "Work-intent classes kept separate from end-user product states.",
  },
  "wcag.error_suggestion": {
    source_type: "standard",
    title: "WCAG 2.2 Understanding SC 3.3.3: Error Suggestion",
    locator: "https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html",
    accessed_on: "2026-09-19",
    supports: "Input errors require identified, actionable correction when suggestions are known.",
  },
  "wcag.status_messages": {
    source_type: "standard",
    title: "WCAG 2.2 Understanding SC 4.1.3: Status Messages",
    locator: "https://www.w3.org/WAI/WCAG22/Understanding/status-messages",
    accessed_on: "2026-09-19",
    supports: "Status semantics are independent of visual component and focus movement.",
  },
  "wcag.error_prevention": {
    source_type: "standard",
    title: "WCAG 2.2 Understanding SC 3.3.4: Error Prevention",
    locator: "https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data",
    accessed_on: "2026-09-19",
    supports: "Consequential submissions need reversibility, review, confirmation, or correction safeguards.",
  },
  "wai.alert": {
    source_type: "standard",
    title: "WAI-ARIA Authoring Practices: Alert Pattern",
    locator: "https://www.w3.org/WAI/ARIA/apg/patterns/alert/",
    accessed_on: "2026-09-19",
    supports: "Alerts communicate important time-sensitive information without requiring a response.",
  },
  "wai.alert_dialog": {
    source_type: "standard",
    title: "WAI-ARIA Authoring Practices: Alert Dialog Pattern",
    locator: "https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/",
    accessed_on: "2026-09-19",
    supports: "Alert dialogs interrupt work and require a response, unlike non-interruptive alerts.",
  },
  "govuk.validation": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Recover from validation errors",
    locator: "https://design-system.service.gov.uk/patterns/validation/",
    accessed_on: "2026-09-19",
    supports: "Field validation is a correction flow, not eligibility or service failure.",
  },
  "govuk.service_problem": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: There is a problem with the service pages",
    locator: "https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/",
    accessed_on: "2026-09-19",
    supports: "Unexpected service failure requires data-preservation, retry, and alternative-path facts.",
  },
  "govuk.service_unavailable": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Service unavailable pages",
    locator: "https://design-system.service.gov.uk/patterns/service-unavailable-pages/",
    accessed_on: "2026-09-19",
    supports: "Known planned or closed availability is distinct from unexpected system failure.",
  },
  "govuk.confirmation": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Confirmation pages",
    locator: "https://design-system.service.gov.uk/patterns/confirmation-pages/",
    accessed_on: "2026-09-19",
    supports: "Completion copy depends on a confirmed outcome, what happens next, and record retrieval.",
  },
  "govuk.check_answers": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Check answers",
    locator: "https://design-system.service.gov.uk/patterns/check-answers/",
    accessed_on: "2026-09-19",
    supports: "Review-before-submit is distinct from completed submission.",
  },
  "govuk.quick_exit": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Exit a page quickly",
    locator: "https://design-system.service.gov.uk/patterns/exit-a-page-quickly/",
    accessed_on: "2026-09-19",
    supports: "Quick exit needs explicit residual privacy and data-persistence limits.",
  },
  "govuk.multiple_tasks": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Complete multiple tasks",
    locator: "https://design-system.service.gov.uk/patterns/complete-multiple-tasks/",
    accessed_on: "2026-09-19",
    supports: "Flexible multi-task work has task-level statuses and differs from linear step location.",
  },
  "govuk.eligibility": {
    source_type: "official_design_system",
    title: "GOV.UK Design System: Check a service is suitable",
    locator: "https://design-system.service.gov.uk/patterns/check-a-service-is-suitable/",
    accessed_on: "2026-09-19",
    supports: "Eligibility is a question-and-results flow requiring basis, outcome, and alternatives.",
  },
  "carbon.empty_states": {
    source_type: "official_design_system",
    title: "Carbon Design System: Empty states",
    locator: "https://carbondesignsystem.com/patterns/empty-states-pattern/",
    accessed_on: "2026-09-19",
    supports: "First-use, user-action, permission, configuration, and system empty states require different treatments.",
  },
  "atlassian.designing_messages": {
    source_type: "official_design_system",
    title: "Atlassian Design System: Designing messages",
    locator: "https://atlassian.design/foundations/content/designing-messages",
    accessed_on: "2026-09-19",
    supports: "Message purpose, component, affected scope, and interruption are related but not interchangeable.",
  },
  "google.conversation_confirmations": {
    source_type: "official_platform_guidance",
    title: "Google Conversation Design: Confirmations",
    locator: "https://developers.google.com/assistant/conversation-design/confirmations",
    accessed_on: "2026-09-19",
    supports: "Parameter and action confirmations require different strategies; high-cost actions may require explicit confirmation.",
  },
  "google.conversation_errors": {
    source_type: "official_platform_guidance",
    title: "Google Conversation Design: Errors",
    locator: "https://developers.google.com/assistant/conversation-design/errors",
    accessed_on: "2026-09-19",
    supports: "No input, no match, and dependent-system errors are distinct conversational repair states.",
  },
  "uswds.step_indicator": {
    source_type: "official_design_system",
    title: "U.S. Web Design System: Step indicator",
    locator: "https://designsystem.digital.gov/components/step-indicator/",
    accessed_on: "2026-09-19",
    supports: "A step indicator locates someone within a linear process rather than reporting live processing.",
  },
  "apple.notifications": {
    source_type: "official_platform_guidance",
    title: "Apple Human Interface Guidelines: Notifications",
    locator: "https://developer.apple.com/design/human-interface-guidelines/notifications",
    accessed_on: "2026-09-19",
    supports: "Out-of-app notifications have consent, privacy, timing, and foreground-behavior constraints.",
  },
  "apple.privacy": {
    source_type: "official_platform_guidance",
    title: "Apple Human Interface Guidelines: Privacy",
    locator: "https://developer.apple.com/design/human-interface-guidelines/privacy",
    accessed_on: "2026-09-19",
    supports: "Permission requests need contextual purpose and data-scope explanations.",
  },
  "apple.onboarding": {
    source_type: "official_platform_guidance",
    title: "Apple Human Interface Guidelines: Onboarding",
    locator: "https://developer.apple.com/design/human-interface-guidelines/onboarding",
    accessed_on: "2026-09-19",
    supports: "Onboarding guidance should usually remain optional and context-aware.",
  },
} as const;

export type UxWritingEvidenceSourceId = keyof typeof UX_WRITING_EVIDENCE_SOURCES;

export type UxWritingTaxonomyLayer = "request" | "task" | "state" | "message" | "delivery";

export interface UxWritingAxisDefinition {
  axis: string;
  layer: UxWritingTaxonomyLayer;
  classification_question: string;
  independent_from: string[];
  decision_effect: string;
  evidence_refs: UxWritingEvidenceSourceId[];
}

export const UX_WRITING_AXIS_DEFINITIONS: readonly UxWritingAxisDefinition[] = [
  { axis: "work_intent", layer: "request", classification_question: "What kind of writing work is requested?", independent_from: ["journey", "state"], decision_effect: "Selects the workflow without pretending the request type is an end-user state.", evidence_refs: ["internal.capability_schema"] },
  { axis: "locale", layer: "request", classification_question: "Which English variant is in scope?", independent_from: ["channel", "audience"], decision_effect: "Preserves regional English context and rejects non-English work in this version.", evidence_refs: ["project.english_scope"] },
  { axis: "journey", layer: "task", classification_question: "What goal-oriented journey is the person in?", independent_from: ["state", "interaction_pattern"], decision_effect: "Constrains relevant policy routes without encoding the current product condition.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "task_structure", layer: "task", classification_question: "How is the work organized over time?", independent_from: ["event_state", "interaction_pattern"], decision_effect: "Separates single-step, linear, flexible multi-task, recurring, conversational, and monitoring work.", evidence_refs: ["govuk.multiple_tasks", "uswds.step_indicator"] },
  { axis: "action_family", layer: "task", classification_question: "What product action is at stake?", independent_from: ["message_purposes", "content_slot"], decision_effect: "Determines object, consequence, retry, and confirmation requirements.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "risk", layer: "task", classification_question: "What is the consequence of misunderstanding or failure?", independent_from: ["urgency", "attention_mode"], decision_effect: "Escalates review and confirmation safeguards without inventing urgency.", evidence_refs: ["wcag.error_prevention"] },
  { axis: "reversibility", layer: "task", classification_question: "Can the committed action be undone, and under what conditions?", independent_from: ["risk", "outcome"], decision_effect: "Controls confirmation, review, and consequence disclosure.", evidence_refs: ["wcag.error_prevention", "google.conversation_confirmations"] },
  { axis: "state", layer: "state", classification_question: "What product condition currently governs the available action?", independent_from: ["event_state", "state_cause"], decision_effect: "Identifies what the person can or must do now.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "event_state", layer: "state", classification_question: "What lifecycle event or outcome is being reported?", independent_from: ["state", "message_purposes"], decision_effect: "Separates idle, progress, success, warning, validation, system, empty, interruption, and unknown outcomes.", evidence_refs: ["internal.annotation_taxonomy", "atlassian.designing_messages"] },
  { axis: "state_cause", layer: "state", classification_question: "What established cause produced this state?", independent_from: ["event_state", "journey"], decision_effect: "Prevents visually similar states from receiving unsafe or irrelevant recovery copy.", evidence_refs: ["carbon.empty_states", "google.conversation_errors", "govuk.eligibility"] },
  { axis: "message_purposes", layer: "message", classification_question: "What jobs must the message perform?", independent_from: ["interaction_pattern", "attention_mode"], decision_effect: "Allows multiple communicative functions without using tone as a use case.", evidence_refs: ["internal.annotation_taxonomy", "atlassian.designing_messages"] },
  { axis: "content_slot", layer: "message", classification_question: "Which semantic content slot is being written?", independent_from: ["interaction_pattern", "content_scope"], decision_effect: "Constrains expression shape while remaining independent of component choice.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "interaction_pattern", layer: "message", classification_question: "Which interaction pattern carries the message?", independent_from: ["message_purposes", "attention_mode"], decision_effect: "Applies pattern-specific facts without treating a component name as message meaning.", evidence_refs: ["internal.annotation_taxonomy", "atlassian.designing_messages"] },
  { axis: "content_scope", layer: "delivery", classification_question: "What portion of the experience is affected?", independent_from: ["interaction_pattern", "attention_mode"], decision_effect: "Separates field, component, section, page, journey, system, and cross-channel impact.", evidence_refs: ["carbon.empty_states", "atlassian.designing_messages"] },
  { axis: "channel", layer: "delivery", classification_question: "Where is the message delivered?", independent_from: ["attention_mode", "content_scope"], decision_effect: "Adds channel constraints without assuming interruption from channel alone.", evidence_refs: ["internal.annotation_taxonomy", "apple.notifications"] },
  { axis: "attention_mode", layer: "delivery", classification_question: "How does the message claim attention?", independent_from: ["interaction_pattern", "channel"], decision_effect: "Separates inline/status delivery, alerts, interruptive dialogs, pages, and out-of-app messages.", evidence_refs: ["wai.alert", "wai.alert_dialog", "wcag.status_messages"] },
  { axis: "conversation_state", layer: "delivery", classification_question: "What conversational turn or repair state is active?", independent_from: ["event_state", "message_purposes"], decision_effect: "Separates prompting, confirmation, repair, handoff, and ending behavior.", evidence_refs: ["google.conversation_confirmations", "google.conversation_errors"] },
] as const;

export interface UxWritingValueDefinition {
  axis: "task_structure" | "state_cause" | "content_scope" | "reversibility" | "conversation_state";
  value: string;
  include_when: string;
  exclude_when: string;
  evidence_refs: UxWritingEvidenceSourceId[];
}

export const UX_WRITING_VALUE_DEFINITIONS: readonly UxWritingValueDefinition[] = [
  { axis: "task_structure", value: "single_step", include_when: "One bounded user goal can be completed without an ordered sequence or independently tracked task set.", exclude_when: "Do not use for background processing, recurring work, or a journey with multiple tracked stages.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "task_structure", value: "linear_multistep", include_when: "The person advances through an ordered sequence with a meaningful current-step position.", exclude_when: "Do not use for flexible tasks, live processing, or a merely long page.", evidence_refs: ["uswds.step_indicator"] },
  { axis: "task_structure", value: "flexible_multitask", include_when: "Multiple named tasks have independent statuses and may span sessions or allow flexible order.", exclude_when: "Do not use when only one ordered current step exists.", evidence_refs: ["govuk.multiple_tasks"] },
  { axis: "task_structure", value: "recurring", include_when: "The same task intentionally repeats on a documented cadence or trigger.", exclude_when: "Do not use for a retry caused by failure or for multiple distinct tasks.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "task_structure", value: "conversational", include_when: "Turn-taking and conversational context are part of completing the task.", exclude_when: "Do not use solely because static content appears in a chat-styled component.", evidence_refs: ["google.conversation_confirmations", "google.conversation_errors"] },
  { axis: "task_structure", value: "passive_monitoring", include_when: "The action has started and the person's main task is to observe or await status.", exclude_when: "Do not use for active data entry or location within a step sequence.", evidence_refs: ["wcag.status_messages"] },

  { axis: "state_cause", value: "user_input", include_when: "Entered or omitted data is established as the cause of the current validation state.", exclude_when: "Do not use for eligibility decisions, system failure, or an unverified assumption about blame.", evidence_refs: ["wcag.error_suggestion", "govuk.validation"] },
  { axis: "state_cause", value: "user_action", include_when: "A documented user-initiated action directly produced the current state.", exclude_when: "Do not use merely because the person was present before a system-originated event.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "state_cause", value: "no_data_yet", include_when: "The relevant collection has not yet been populated, including a supported first-use state.", exclude_when: "Do not use for a scoped query with no matches or data that was cleared.", evidence_refs: ["carbon.empty_states"] },
  { axis: "state_cause", value: "no_matching_data", include_when: "A completed search or filter operation found no matches within its documented scope.", exclude_when: "Do not claim that no underlying data exists or classify an untouched collection this way.", evidence_refs: ["carbon.empty_states"] },
  { axis: "state_cause", value: "user_cleared_data", include_when: "Evidence confirms that existing data was cleared, deleted, archived, or completed away.", exclude_when: "Do not use for first use or when prior data existence is unknown.", evidence_refs: ["carbon.empty_states"] },
  { axis: "state_cause", value: "authentication", include_when: "An identity session or sign-in requirement prevents access.", exclude_when: "Do not use when identity is known but authorization is absent.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "state_cause", value: "permission", include_when: "The identity is established but lacks authorization to access data or perform an action.", exclude_when: "Do not use for product eligibility or a missing sign-in session.", evidence_refs: ["carbon.empty_states", "apple.privacy"] },
  { axis: "state_cause", value: "eligibility_rule", include_when: "A documented policy or suitability rule produced the result.", exclude_when: "Do not use for malformed input or a missing technical prerequisite.", evidence_refs: ["govuk.eligibility"] },
  { axis: "state_cause", value: "configuration", include_when: "A known setup or configuration requirement prevents the expected data or behavior.", exclude_when: "Do not use as a generic explanation for an unknown system failure.", evidence_refs: ["carbon.empty_states"] },
  { axis: "state_cause", value: "system", include_when: "The owned service or product system is established as the cause of failure or unavailability.", exclude_when: "Do not use for misunderstood input, planned closure without evidence, or third-party failure.", evidence_refs: ["govuk.service_problem", "google.conversation_errors"] },
  { axis: "state_cause", value: "network", include_when: "Connectivity loss or network failure is established as the cause.", exclude_when: "Do not infer this from a timeout or generic error alone.", evidence_refs: ["internal.annotation_taxonomy"] },
  { axis: "state_cause", value: "external_dependency", include_when: "A named dependent service or external party is established as the cause.", exclude_when: "Do not shift responsibility to a third party without evidence.", evidence_refs: ["govuk.service_problem", "google.conversation_errors"] },
  { axis: "state_cause", value: "time_expiry", include_when: "A documented validity period, session, code, or deadline has elapsed.", exclude_when: "Do not use for an incorrect value or an unexplained interruption.", evidence_refs: ["internal.experience_taxonomy"] },
  { axis: "state_cause", value: "safety_signal", include_when: "A documented security, fraud, or harm signal triggered the state.", exclude_when: "Do not present a signal as confirmed fraud, guilt, or safety.", evidence_refs: ["wai.alert", "wai.alert_dialog"] },
  { axis: "state_cause", value: "unknown", include_when: "Available evidence cannot establish a more specific cause.", exclude_when: "Do not treat unknown as permission to guess or omit uncertainty.", evidence_refs: ["internal.annotation_taxonomy"] },

  { axis: "content_scope", value: "field", include_when: "The message applies to one named input and its correction or guidance.", exclude_when: "Do not use for a group, section, or page-level condition.", evidence_refs: ["wcag.error_suggestion"] },
  { axis: "content_scope", value: "component", include_when: "The condition is contained within one reusable UI component or data container.", exclude_when: "Do not use when the whole section or journey is affected.", evidence_refs: ["carbon.empty_states", "atlassian.designing_messages"] },
  { axis: "content_scope", value: "section", include_when: "A coherent region of a page is affected while the rest remains usable.", exclude_when: "Do not use for a single field or a system-wide condition.", evidence_refs: ["atlassian.designing_messages"] },
  { axis: "content_scope", value: "page", include_when: "The current page or screen is the affected context.", exclude_when: "Do not imply the entire service or journey is affected without evidence.", evidence_refs: ["govuk.service_problem", "carbon.empty_states"] },
  { axis: "content_scope", value: "journey", include_when: "The condition or guidance applies across a multi-page goal-oriented flow.", exclude_when: "Do not use for a local component message.", evidence_refs: ["govuk.multiple_tasks"] },
  { axis: "content_scope", value: "system", include_when: "The established impact spans the service or product system.", exclude_when: "Do not generalize a local failure into system-wide unavailability.", evidence_refs: ["govuk.service_unavailable", "atlassian.designing_messages"] },
  { axis: "content_scope", value: "cross_channel", include_when: "Meaning or state must remain coherent across two or more delivery channels.", exclude_when: "Do not use merely because a single message links elsewhere.", evidence_refs: ["apple.notifications", "internal.annotation_taxonomy"] },

  { axis: "reversibility", value: "reversible", include_when: "The committed action can be undone through a documented, available path without material loss.", exclude_when: "Do not use when recovery is time-limited, conditional, or unverified.", evidence_refs: ["wcag.error_prevention"] },
  { axis: "reversibility", value: "conditionally_reversible", include_when: "Undo or recovery exists only within documented limits, costs, approvals, or time windows.", exclude_when: "Do not collapse these conditions into a blanket reversible claim.", evidence_refs: ["wcag.error_prevention", "google.conversation_confirmations"] },
  { axis: "reversibility", value: "irreversible", include_when: "No supported recovery path exists after commitment.", exclude_when: "Do not use when reversal is merely difficult or unknown.", evidence_refs: ["wcag.error_prevention", "google.conversation_confirmations"] },
  { axis: "reversibility", value: "unknown", include_when: "The available evidence does not establish whether or how the action can be undone.", exclude_when: "Do not convert uncertainty into reassurance or a destructive claim.", evidence_refs: ["wcag.error_prevention"] },
  { axis: "reversibility", value: "not_applicable", include_when: "No committed state-changing action is involved.", exclude_when: "Do not use for a pending or completed mutation merely because risk is low.", evidence_refs: ["internal.experience_taxonomy"] },

  { axis: "conversation_state", value: "not_applicable", include_when: "The experience is not using conversational turn-taking for this message.", exclude_when: "Do not use when prior turns materially determine the response.", evidence_refs: ["internal.annotation_taxonomy"] },
  { axis: "conversation_state", value: "initial_prompt", include_when: "The system is making the first context-setting request for input in the current conversational task.", exclude_when: "Do not use for a reprompt, confirmation, or correction.", evidence_refs: ["google.conversation_errors"] },
  { axis: "conversation_state", value: "parameter_confirmation", include_when: "The turn confirms how one or more pieces of supplied information were interpreted.", exclude_when: "Do not use to authorize a consequential action.", evidence_refs: ["google.conversation_confirmations"] },
  { axis: "conversation_state", value: "action_confirmation", include_when: "The turn confirms a pending or completed product action.", exclude_when: "Do not use for simple acknowledgment of an input parameter.", evidence_refs: ["google.conversation_confirmations"] },
  { axis: "conversation_state", value: "no_input", include_when: "No response was detected within the documented response window.", exclude_when: "Do not claim the person's speech was misunderstood or rejected.", evidence_refs: ["google.conversation_errors"] },
  { axis: "conversation_state", value: "no_match", include_when: "A response was received but could not be interpreted in the current context.", exclude_when: "Do not use when no response occurred or a dependent system failed after understanding.", evidence_refs: ["google.conversation_errors"] },
  { axis: "conversation_state", value: "disambiguation", include_when: "Two or more plausible interpretations require a narrower choice.", exclude_when: "Do not use for a general first prompt or an input with no plausible interpretation.", evidence_refs: ["google.conversation_confirmations"] },
  { axis: "conversation_state", value: "correction", include_when: "The person is revising a previously interpreted parameter or action target.", exclude_when: "Do not force a full restart when a bounded correction is supported.", evidence_refs: ["google.conversation_confirmations"] },
  { axis: "conversation_state", value: "system_error", include_when: "The request was understood, but a dependent system could not complete it.", exclude_when: "Do not use for no input or no match.", evidence_refs: ["google.conversation_errors"] },
  { axis: "conversation_state", value: "handoff", include_when: "The conversational task is being transferred to another agent, person, channel, or process.", exclude_when: "Do not imply context transfer or resolution unless established.", evidence_refs: ["google.conversation_errors", "internal.annotation_taxonomy"] },
  { axis: "conversation_state", value: "ending", include_when: "The interaction is closing and must state the outcome or valid reentry path.", exclude_when: "Do not use while a required answer, confirmation, or recovery attempt remains active.", evidence_refs: ["google.conversation_errors"] },
] as const;

export const UX_WRITING_DEFINED_VALUE_SETS = {
  task_structure: UX_WRITING_TASK_STRUCTURES,
  state_cause: UX_WRITING_STATE_CAUSES,
  content_scope: UX_WRITING_CONTENT_SCOPES,
  reversibility: UX_WRITING_REVERSIBILITY,
  conversation_state: UX_WRITING_CONVERSATION_STATES,
} as const;

export const UX_WRITING_CRITICAL_DISTINCTIONS = [
  { distinction_id: "validation_vs_eligibility", left: "invalid or missing entered data", right: "policy eligibility result", why: "One requests a correction; the other explains a rule-based result and alternatives.", evidence_refs: ["wcag.error_suggestion", "govuk.validation", "govuk.eligibility"] },
  { distinction_id: "processing_vs_step_location", left: "an operation is running", right: "a person is located in a linear sequence", why: "One needs status and timing; the other needs orientation.", evidence_refs: ["wcag.status_messages", "uswds.step_indicator"] },
  { distinction_id: "linear_steps_vs_flexible_tasks", left: "ordered multi-step flow", right: "tasks completed in a flexible order or across sessions", why: "Step count and task status answer different questions.", evidence_refs: ["uswds.step_indicator", "govuk.multiple_tasks"] },
  { distinction_id: "empty_state_causes", left: "first use or no data", right: "no results, cleared data, permission, configuration, or system failure", why: "The appropriate explanation and next action depend on why data is absent.", evidence_refs: ["carbon.empty_states"] },
  { distinction_id: "alert_vs_alert_dialog", left: "important status that does not require a response", right: "interruptive decision requiring a response", why: "Focus, interaction, urgency, and content obligations differ.", evidence_refs: ["wai.alert", "wai.alert_dialog"] },
  { distinction_id: "conversation_error_causes", left: "no input or no match", right: "dependent-system failure", why: "Silence, misunderstood input, and failed execution require different repair prompts.", evidence_refs: ["google.conversation_errors"] },
  { distinction_id: "parameter_vs_action_confirmation", left: "confirm interpreted information", right: "confirm a pending or completed action", why: "Misrecognition cost and reversibility determine whether confirmation is implicit or explicit.", evidence_refs: ["google.conversation_confirmations", "wcag.error_prevention"] },
] as const satisfies readonly {
  distinction_id: string;
  left: string;
  right: string;
  why: string;
  evidence_refs: readonly UxWritingEvidenceSourceId[];
}[];
