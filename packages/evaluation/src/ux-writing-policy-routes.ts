import { sha256Canonical } from "@contentmd/core";
import type {
  UxWritingActionFamily, UxWritingAttentionMode, UxWritingChannel, UxWritingConsequenceRisk,
  UxWritingContentScope, UxWritingContentSlot, UxWritingConversationState, UxWritingCoordinateAxis,
  UxWritingCoordinateClassification, UxWritingEventState, UxWritingInteractionPattern,
  UxWritingJourneyFamily, UxWritingMessagePurpose, UxWritingOutcome, UxWritingReversibility,
  UxWritingStateCause, UxWritingStateClass, UxWritingTaskStructure, UxWritingWorkIntent,
} from "./ux-writing-coordinate.js";
import type { UxWritingEvidenceSourceId } from "./ux-writing-taxonomy.js";

export interface UxWritingPolicyMatch {
  work_intent?: UxWritingWorkIntent[];
  journey?: UxWritingJourneyFamily[];
  state?: UxWritingStateClass[];
  event_state?: UxWritingEventState[];
  state_cause?: UxWritingStateCause[];
  task_structure?: UxWritingTaskStructure[];
  message_purposes_any?: UxWritingMessagePurpose[];
  content_slot?: UxWritingContentSlot[];
  interaction_pattern?: UxWritingInteractionPattern[];
  action_family?: UxWritingActionFamily[];
  content_scope?: UxWritingContentScope[];
  channel?: UxWritingChannel[];
  attention_mode?: UxWritingAttentionMode[];
  conversation_state?: UxWritingConversationState[];
  reversibility?: UxWritingReversibility[];
  risk?: UxWritingConsequenceRisk[];
  outcome?: UxWritingOutcome[];
}

export interface UxWritingPolicyRoute {
  route_id: string;
  route_version: "0.2.0";
  description: string;
  when: UxWritingPolicyMatch;
  required_axes: UxWritingCoordinateAxis[];
  required_facts: string[];
  forbidden_claims: string[];
  recovery_requirement: "required" | "optional" | "not_applicable";
  review_gates: Array<"content_design" | "accessibility" | "legal_policy" | "safety_security">;
  evidence_refs: UxWritingEvidenceSourceId[];
  authority_effect: "none";
}

export interface UxWritingPolicyResolution {
  contract_version: "contentmd.ux-writing-policy-resolution/0.2.0";
  resolution_id: string;
  classification_ref: string;
  status: "resolved" | "abstain";
  route: UxWritingPolicyRoute | null;
  candidate_route_ids: string[];
  missing_axes: UxWritingCoordinateAxis[];
  missing_facts: string[];
  reason: "out_of_scope" | "classification_incomplete" | "no_route" | "ambiguous_route" | "missing_facts" | null;
  authority_effect: "none";
}

const route = (value: Omit<UxWritingPolicyRoute, "route_version" | "authority_effect">): UxWritingPolicyRoute => ({
  ...value,
  route_version: "0.2.0",
  authority_effect: "none",
});

export const BUILTIN_UX_WRITING_POLICY_ROUTES: readonly UxWritingPolicyRoute[] = [
  route({
    route_id: "discovery.search.no_results",
    description: "A completed search or filter operation returned no matching data.",
    when: { journey: ["discovery"], event_state: ["empty"], state_cause: ["no_matching_data"], action_family: ["search"], interaction_pattern: ["search_result", "empty_state"], content_scope: ["component", "section", "page"] },
    required_axes: ["journey", "event_state", "state_cause", "action_family", "interaction_pattern", "content_scope"],
    required_facts: ["search_scope", "active_query_or_filters", "next_action"],
    forbidden_claims: ["results_do_not_exist_outside_search_scope", "collection_has_never_had_data"],
    recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["carbon.empty_states"],
  }),
  route({
    route_id: "discovery.collection.first_use",
    description: "A collection has no data yet and offers the first meaningful action.",
    when: { journey: ["discovery", "management"], event_state: ["empty"], state_cause: ["no_data_yet"], action_family: ["create", "upload"], interaction_pattern: ["empty_state"], content_scope: ["component", "section", "page"] },
    required_axes: ["journey", "event_state", "state_cause", "action_family", "interaction_pattern", "content_scope"],
    required_facts: ["collection_scope", "future_content", "first_action"], forbidden_claims: ["search_returned_no_results", "data_was_deleted"],
    recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility"], evidence_refs: ["carbon.empty_states"],
  }),
  route({
    route_id: "management.collection.cleared",
    description: "A collection is empty because its prior contents were cleared or deleted.",
    when: { journey: ["management", "completion"], event_state: ["empty", "success"], state_cause: ["user_cleared_data"], interaction_pattern: ["empty_state"], content_scope: ["component", "section", "page"] },
    required_axes: ["journey", "event_state", "state_cause", "interaction_pattern", "content_scope"],
    required_facts: ["cleared_content", "completion_evidence", "available_next_action"], forbidden_claims: ["first_use", "content_recoverable_without_evidence"],
    recovery_requirement: "optional", review_gates: ["content_design", "accessibility"], evidence_refs: ["carbon.empty_states"],
  }),
  route({
    route_id: "empty.permission.blocked",
    description: "Data exists or may exist, but the current person cannot view it because permission is absent.",
    when: { event_state: ["empty", "unavailable"], state_cause: ["permission"], interaction_pattern: ["empty_state"], content_scope: ["component", "section", "page"] },
    required_axes: ["event_state", "state_cause", "interaction_pattern", "content_scope"], required_facts: ["restricted_data_scope", "permission_basis", "access_request_path"],
    forbidden_claims: ["no_data_exists", "permission_will_be_granted"], recovery_requirement: "required", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["carbon.empty_states", "apple.privacy"],
  }),
  route({
    route_id: "empty.configuration.required",
    description: "Data cannot appear until an established configuration step is completed.",
    when: { event_state: ["empty", "unavailable"], state_cause: ["configuration"], action_family: ["configure"], interaction_pattern: ["empty_state"], content_scope: ["component", "section", "page"] },
    required_axes: ["event_state", "state_cause", "action_family", "interaction_pattern", "content_scope"], required_facts: ["missing_configuration", "first_configuration_action"],
    forbidden_claims: ["no_data_exists", "system_failure"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["carbon.empty_states"],
  }),
  route({
    route_id: "empty.system.unavailable",
    description: "A local data region is empty because a system or dependency could not supply its content.",
    when: { event_state: ["empty", "system_error"], state_cause: ["system", "network", "external_dependency"], interaction_pattern: ["empty_state"], content_scope: ["component", "section"] },
    required_axes: ["event_state", "state_cause", "interaction_pattern", "content_scope"], required_facts: ["affected_data", "current_state", "safe_next_action"],
    forbidden_claims: ["no_data_exists", "technical_cause_not_established", "retry_is_safe_without_evidence"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"],
    evidence_refs: ["carbon.empty_states"],
  }),
  route({
    route_id: "access.authentication.required",
    description: "Protected content requires account authentication.",
    when: { journey: ["access"], state: ["authentication_required"], state_cause: ["authentication"], action_family: ["authenticate"] },
    required_axes: ["journey", "state", "state_cause", "action_family"], required_facts: ["access_reason", "authentication_action"], forbidden_claims: ["authentication_guarantees_identity"],
    recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "safety_security"], evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "onboarding.permission.request",
    description: "Initial setup requests a product or device permission.",
    when: { journey: ["onboarding"], state: ["permission_required"], state_cause: ["permission"], action_family: ["grant_permission"], interaction_pattern: ["permission_prompt"], attention_mode: ["interruptive_dialog", "page"] },
    required_axes: ["journey", "state", "state_cause", "action_family", "interaction_pattern", "attention_mode"], required_facts: ["permission_purpose", "data_scope", "denial_effect"],
    forbidden_claims: ["permission_is_required_when_optional", "vague_better_experience_justification"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["apple.privacy"],
  }),
  route({
    route_id: "onboarding.education.optional",
    description: "Optional first-run guidance helps someone begin without becoming a prerequisite.",
    when: { journey: ["onboarding"], event_state: ["idle", "not_started"], interaction_pattern: ["onboarding_step"], attention_mode: ["inline", "page"] },
    required_axes: ["journey", "event_state", "interaction_pattern", "attention_mode"], required_facts: ["learning_goal", "skip_behavior", "resume_or_revisit_path"],
    forbidden_claims: ["optional_step_presented_as_required"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility"], evidence_refs: ["apple.onboarding", "carbon.empty_states"],
  }),
  route({
    route_id: "input.validation.field_error",
    description: "Submitted field input requires a specific correction.",
    when: { event_state: ["validation_error"], state_cause: ["user_input"], action_family: ["provide_input"], content_slot: ["feedback.error"], content_scope: ["field"], attention_mode: ["inline", "page"] },
    required_axes: ["event_state", "state_cause", "action_family", "content_slot", "content_scope", "attention_mode"], required_facts: ["field_label", "validation_reason", "correction", "entered_value_preservation"],
    forbidden_claims: ["invalidity_cause_not_established", "eligibility_failure_presented_as_input_error"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"],
    evidence_refs: ["wcag.error_suggestion", "govuk.validation"],
  }),
  route({
    route_id: "access.verification.code_expired",
    description: "An authentication or verification code expired and must be replaced safely.",
    when: { journey: ["access"], event_state: ["validation_error", "unavailable"], state_cause: ["time_expiry"], action_family: ["verify_identity"], interaction_pattern: ["verification_code"] },
    required_axes: ["journey", "event_state", "state_cause", "action_family", "interaction_pattern"], required_facts: ["expiry_basis", "replacement_code_action", "destination_hint_policy"],
    forbidden_claims: ["code_incorrect_when_only_expired", "sensitive_destination_exposure"], recovery_requirement: "required", review_gates: ["content_design", "accessibility", "safety_security"],
    evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "evaluation.choice.required",
    description: "A person must compare and select among alternatives.",
    when: { journey: ["evaluation"], state: ["choice_required"], action_family: ["choose"], interaction_pattern: ["choice_selector"] },
    required_axes: ["journey", "state", "action_family", "interaction_pattern"], required_facts: ["option_set", "decision_relevant_differences"], forbidden_claims: ["unsupported_best_option"],
    recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "evaluation.eligibility.result",
    description: "A rule-based suitability or eligibility check produced a result.",
    when: { journey: ["evaluation"], event_state: ["success", "unavailable"], state_cause: ["eligibility_rule"], interaction_pattern: ["full_page_message"], content_scope: ["page"] },
    required_axes: ["journey", "event_state", "state_cause", "interaction_pattern", "content_scope"], required_facts: ["eligibility_outcome", "result_basis", "next_action", "ineligible_alternative"],
    forbidden_claims: ["input_is_invalid", "eligibility_reason_not_established", "guaranteed_downstream_approval"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["govuk.eligibility"],
  }),
  route({
    route_id: "commitment.review_before_submit",
    description: "A consequential submission is reviewed and can be corrected before finalization.",
    when: { journey: ["commitment"], state: ["review_required"], action_family: ["submit", "pay", "delete"], interaction_pattern: ["review_summary"], reversibility: ["conditionally_reversible", "irreversible"], risk: ["high", "critical"] },
    required_axes: ["journey", "state", "action_family", "interaction_pattern", "reversibility", "risk"], required_facts: ["reviewable_information", "correction_path", "error_prevention_mechanism", "final_action_consequence"],
    forbidden_claims: ["submission_already_complete"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["wcag.error_prevention", "govuk.check_answers"],
  }),
  route({
    route_id: "commitment.action.ready",
    description: "A consequential primary action is ready to be initiated.",
    when: { journey: ["commitment"], state: ["action_available"], action_family: ["submit", "pay", "send", "book", "activate", "create"], content_slot: ["action.primary"] },
    required_axes: ["journey", "state", "action_family", "content_slot"], required_facts: ["action_object", "immediate_consequence"], forbidden_claims: ["outcome_before_commitment"],
    recovery_requirement: "optional", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "commitment.payment.outcome_unknown",
    description: "A payment was attempted but its outcome is not established.",
    when: { journey: ["commitment"], event_state: ["in_progress", "interrupted", "unknown"], action_family: ["pay"], content_slot: ["feedback.status"], attention_mode: ["status", "page"], outcome: ["unknown"] },
    required_axes: ["journey", "event_state", "action_family", "content_slot", "attention_mode"], required_facts: ["payment_object", "status_check_action"],
    forbidden_claims: ["payment_failed", "payment_succeeded", "retry_is_safe"], recovery_requirement: "required", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["internal.experience_taxonomy", "wcag.status_messages"],
  }),
  route({
    route_id: "progress.action.delayed",
    description: "An initiated task remains pending or delayed.",
    when: { journey: ["progress"], event_state: ["in_progress", "interrupted"], task_structure: ["single_step", "passive_monitoring"], content_slot: ["feedback.status"], attention_mode: ["status", "page"] },
    required_axes: ["journey", "event_state", "task_structure", "content_slot", "attention_mode"], required_facts: ["current_status", "timing_expectation", "safe_next_action", "announcement_behavior"],
    forbidden_claims: ["completion_time_not_established"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["wcag.status_messages"],
  }),
  route({
    route_id: "progress.multistep.current_step",
    description: "A person is located within a linear multi-step task, not waiting for processing.",
    when: { state: ["action_available", "input_required"], task_structure: ["linear_multistep"], interaction_pattern: ["step_indicator"], attention_mode: ["inline", "page"] },
    required_axes: ["state", "task_structure", "interaction_pattern", "attention_mode"], required_facts: ["current_step", "total_steps", "conditional_step_behavior", "separate_navigation"],
    forbidden_claims: ["conditional_steps_are_fixed", "indicator_is_navigation", "operation_is_processing"], recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility"],
    evidence_refs: ["uswds.step_indicator"],
  }),
  route({
    route_id: "progress.multitask.overview",
    description: "A person sees the status of multiple tasks that may span sessions or be completed flexibly.",
    when: { journey: ["progress", "onboarding"], task_structure: ["flexible_multitask"], interaction_pattern: ["task_list"], content_scope: ["page", "journey"] },
    required_axes: ["journey", "task_structure", "interaction_pattern", "content_scope"], required_facts: ["task_set", "task_order_constraints", "status_vocabulary", "resume_behavior"],
    forbidden_claims: ["all_tasks_are_linear", "status_not_backed_by_saved_state", "step_count_used_as_task_status"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility"],
    evidence_refs: ["govuk.multiple_tasks"],
  }),
  route({
    route_id: "completion.action.confirmed",
    description: "An action has a confirmed completed outcome.",
    when: { journey: ["completion"], state: ["completed"], event_state: ["success"], interaction_pattern: ["confirmation_message"], attention_mode: ["status", "page"], outcome: ["confirmed"] },
    required_axes: ["journey", "state", "event_state", "interaction_pattern", "attention_mode"], required_facts: ["completed_action", "confirmed_outcome", "next_step", "record_retrieval"],
    forbidden_claims: ["unconfirmed_follow_on_outcome"], recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility"], evidence_refs: ["govuk.confirmation"],
  }),
  route({
    route_id: "completion.action.partial",
    description: "Part of an action completed and part remains unresolved.",
    when: { journey: ["completion"], event_state: ["partial_success"], content_slot: ["feedback.confirmation", "feedback.status"], outcome: ["partial"] },
    required_axes: ["journey", "event_state", "content_slot"], required_facts: ["completed_part", "incomplete_part", "next_action"], forbidden_claims: ["whole_action_completed"],
    recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.annotation_taxonomy", "govuk.confirmation"],
  }),
  route({
    route_id: "recovery.action.failed",
    description: "An attempted action failed with an established recovery path.",
    when: { journey: ["recovery"], state: ["failed"], event_state: ["system_error"], state_cause: ["system", "network", "external_dependency"], interaction_pattern: ["error_message"], outcome: ["failed"] },
    required_axes: ["journey", "state", "event_state", "state_cause", "interaction_pattern"], required_facts: ["failed_action", "current_state", "recovery_action", "entered_data_state", "retry_safety"],
    forbidden_claims: ["failure_cause_not_established", "retry_is_safe_without_evidence"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"],
    evidence_refs: ["govuk.service_problem"],
  }),
  route({
    route_id: "recovery.service.problem",
    description: "An unexpected service problem interrupts the journey at page level.",
    when: { journey: ["recovery"], state: ["failed"], event_state: ["system_error"], state_cause: ["system", "network", "external_dependency"], interaction_pattern: ["full_page_message"], content_scope: ["page", "system"], attention_mode: ["page"] },
    required_axes: ["journey", "state", "event_state", "state_cause", "interaction_pattern", "content_scope", "attention_mode"], required_facts: ["entered_data_state", "retry_timing", "support_or_alternative"],
    forbidden_claims: ["technical_cause_not_established", "data_saved_without_evidence"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["govuk.service_problem"],
  }),
  route({
    route_id: "recovery.service.unavailable",
    description: "A service is deliberately unavailable for a known period or closure state.",
    when: { journey: ["recovery"], state: ["blocked"], event_state: ["unavailable"], state_cause: ["system"], interaction_pattern: ["full_page_message"], content_scope: ["page", "system"], attention_mode: ["page"] },
    required_axes: ["journey", "state", "event_state", "state_cause", "interaction_pattern", "content_scope", "attention_mode"], required_facts: ["availability_scope", "return_time_or_closure_state", "alternative_path", "planned_unavailability_evidence"],
    forbidden_claims: ["return_time_not_established", "unexpected_failure_presented_as_planned"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["govuk.service_unavailable"],
  }),
  route({
    route_id: "recovery.destructive.confirm",
    description: "A cancellation, deletion, revocation, or unsubscribe action awaits confirmation.",
    when: { journey: ["recovery"], state: ["destructive_action_pending", "confirmation_required"], action_family: ["cancel", "delete", "revoke", "unsubscribe"], interaction_pattern: ["destructive_confirmation"], reversibility: ["reversible", "conditionally_reversible", "irreversible"], attention_mode: ["interruptive_dialog", "page"] },
    required_axes: ["journey", "state", "action_family", "interaction_pattern", "reversibility", "attention_mode"], required_facts: ["action_object", "consequence", "recovery_window", "unsaved_work_effect"],
    forbidden_claims: ["reversible_when_irreversible", "recovery_window_not_established"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["wcag.error_prevention", "google.conversation_confirmations"],
  }),
  route({
    route_id: "discovery.page.not_found",
    description: "A requested location cannot be found and needs navigational recovery.",
    when: { journey: ["discovery"], event_state: ["unavailable"], action_family: ["navigate"], interaction_pattern: ["full_page_message"], content_scope: ["page"], attention_mode: ["page"] },
    required_axes: ["journey", "event_state", "action_family", "interaction_pattern", "content_scope", "attention_mode"], required_facts: ["requested_location_state", "navigation_recovery"],
    forbidden_claims: ["service_is_unavailable", "search_returned_no_results"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "blocked.prerequisite",
    description: "A person cannot continue because an established prerequisite is not met.",
    when: { state: ["blocked"], event_state: ["unavailable"], state_cause: ["authentication", "permission", "configuration", "external_dependency"], interaction_pattern: ["inline_notice", "modal_dialog"], content_scope: ["component", "section", "page"] },
    required_axes: ["state", "event_state", "state_cause", "interaction_pattern", "content_scope"], required_facts: ["blocking_condition", "available_alternatives"],
    forbidden_claims: ["eligibility_result_presented_as_validation", "blocking_reason_not_established"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["internal.experience_taxonomy", "govuk.eligibility"],
  }),
  route({
    route_id: "safety.account.risk_detected",
    description: "A security, fraud, or safety signal requires protective action.",
    when: { journey: ["safety"], state: ["risk_detected"], event_state: ["warning"], state_cause: ["safety_signal"], interaction_pattern: ["notification_banner", "modal_dialog"], attention_mode: ["alert", "interruptive_dialog", "page", "out_of_app"] },
    required_axes: ["journey", "state", "event_state", "state_cause", "interaction_pattern", "attention_mode"], required_facts: ["observed_event", "protective_action", "support_path", "sensitive_information_policy"],
    forbidden_claims: ["fraud_confirmed_without_evidence", "account_safe_without_evidence"], recovery_requirement: "required", review_gates: ["content_design", "accessibility", "legal_policy", "safety_security"],
    evidence_refs: ["wai.alert", "wai.alert_dialog"],
  }),
  route({
    route_id: "safety.quick_exit",
    description: "A person can leave a sensitive experience quickly while understanding residual privacy limits.",
    when: { journey: ["safety"], state: ["action_available"], action_family: ["navigate"], content_slot: ["action.primary"] },
    required_axes: ["journey", "state", "action_family", "content_slot"], required_facts: ["exit_destination", "activation_methods", "entered_data_effect", "browser_history_limitation"],
    forbidden_claims: ["history_is_erased", "quick_exit_eliminates_all_risk"], recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility", "safety_security"], evidence_refs: ["govuk.quick_exit"],
  }),
  route({
    route_id: "management.preference.saved",
    description: "A setting change has been persisted successfully.",
    when: { journey: ["management"], state: ["completed"], event_state: ["success"], state_cause: ["user_action"], action_family: ["save", "configure"], interaction_pattern: ["save_status"], outcome: ["confirmed"] },
    required_axes: ["journey", "state", "event_state", "state_cause", "action_family", "interaction_pattern"], required_facts: ["setting_name", "persisted_state"], forbidden_claims: ["persistence_not_confirmed"],
    recovery_requirement: "not_applicable", review_gates: ["content_design", "accessibility"], evidence_refs: ["wcag.status_messages"],
  }),
  route({
    route_id: "support.issue.route",
    description: "A person needs a valid route to assistance.",
    when: { journey: ["support"], state: ["support_available"], action_family: ["contact_support"], content_slot: ["navigation"] },
    required_axes: ["journey", "state", "action_family", "content_slot"], required_facts: ["issue_scope", "support_destination"], forbidden_claims: ["resolution_guaranteed"],
    recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.experience_taxonomy"],
  }),
  route({
    route_id: "notification.reminder.action",
    description: "An out-of-app channel reminds a person about a documented pending action.",
    when: { work_intent: ["notification"], event_state: ["idle", "not_started", "warning"], channel: ["email", "sms", "push_notification", "mobile_app"], attention_mode: ["out_of_app"] },
    required_axes: ["work_intent", "event_state", "channel", "attention_mode"], required_facts: ["reminder_subject", "timing_basis", "next_action", "notification_consent_state", "sensitive_information_policy", "deduplication_policy", "foreground_behavior"],
    forbidden_claims: ["urgency_not_established", "sensitive_data_exposed", "consent_assumed"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility", "legal_policy"], evidence_refs: ["apple.notifications"],
  }),
  route({
    route_id: "conversation.input.no_input",
    description: "A voice interaction received no response and needs a context-aware reprompt or graceful exit.",
    when: { work_intent: ["conversational_turn"], task_structure: ["conversational"], conversation_state: ["no_input"], interaction_pattern: ["conversation_prompt"], channel: ["voice"] },
    required_axes: ["work_intent", "task_structure", "conversation_state", "interaction_pattern", "channel"], required_facts: ["original_question", "attempt_count", "input_optionality", "max_attempt_behavior"],
    forbidden_claims: ["user_was_not_heard", "repeat_verbatim_without_context", "unbounded_reprompt"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["google.conversation_errors"],
  }),
  route({
    route_id: "conversation.input.no_match",
    description: "A conversational response could not be interpreted in context and needs progressive repair.",
    when: { work_intent: ["conversational_turn"], task_structure: ["conversational"], conversation_state: ["no_match"], interaction_pattern: ["conversation_prompt", "chat_message"], channel: ["voice", "mobile_app", "web"] },
    required_axes: ["work_intent", "task_structure", "conversation_state", "interaction_pattern", "channel"], required_facts: ["original_question", "attempt_count", "valid_response_space", "max_attempt_behavior"],
    forbidden_claims: ["user_said_nothing", "repeat_verbatim_without_context", "unbounded_reprompt"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["google.conversation_errors"],
  }),
  route({
    route_id: "conversation.parameter.confirm",
    description: "A conversational turn confirms interpreted information while preserving a correction path.",
    when: { work_intent: ["conversational_turn"], task_structure: ["conversational"], conversation_state: ["parameter_confirmation"], interaction_pattern: ["conversation_prompt", "chat_message"] },
    required_axes: ["work_intent", "task_structure", "conversation_state", "interaction_pattern"], required_facts: ["interpreted_parameter", "recognition_confidence", "misunderstanding_cost", "correction_path"],
    forbidden_claims: ["parameter_is_correct_without_confirmation_basis", "correction_requires_full_restart"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["google.conversation_confirmations"],
  }),
  route({
    route_id: "conversation.action.confirm",
    description: "A conversational turn explicitly confirms a consequential pending action.",
    when: { work_intent: ["conversational_turn"], state: ["confirmation_required"], task_structure: ["conversational"], conversation_state: ["action_confirmation"], interaction_pattern: ["conversation_prompt", "chat_message"], reversibility: ["conditionally_reversible", "irreversible"], risk: ["high", "critical"] },
    required_axes: ["work_intent", "state", "task_structure", "conversation_state", "interaction_pattern", "reversibility", "risk"], required_facts: ["pending_action", "action_object", "consequence", "confirmation_response_space", "correction_or_cancel_path"],
    forbidden_claims: ["action_already_completed", "ambiguous_confirmation_target"], recovery_requirement: "required", review_gates: ["content_design", "accessibility", "legal_policy"],
    evidence_refs: ["google.conversation_confirmations", "wcag.error_prevention"],
  }),
  route({
    route_id: "conversation.system.error",
    description: "The person was understood, but a dependent system could not complete the conversational task.",
    when: { work_intent: ["conversational_turn"], event_state: ["system_error"], state_cause: ["system", "network", "external_dependency"], task_structure: ["conversational"], conversation_state: ["system_error"], interaction_pattern: ["conversation_prompt", "chat_message"] },
    required_axes: ["work_intent", "event_state", "state_cause", "task_structure", "conversation_state", "interaction_pattern"], required_facts: ["failed_request", "current_state", "safe_next_action", "alternative_path"],
    forbidden_claims: ["user_input_not_understood", "retry_is_safe_without_evidence"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["google.conversation_errors"],
  }),
  route({
    route_id: "conversation.handoff",
    description: "A conversational experience transfers the task while preserving expectations and context boundaries.",
    when: { work_intent: ["conversational_turn"], task_structure: ["conversational"], conversation_state: ["handoff"], interaction_pattern: ["conversation_prompt", "chat_message"] },
    required_axes: ["work_intent", "task_structure", "conversation_state", "interaction_pattern"], required_facts: ["handoff_destination", "context_transferred", "expected_wait_or_next_step", "fallback_path"],
    forbidden_claims: ["context_transferred_without_evidence", "resolution_guaranteed"], recovery_requirement: "required", review_gates: ["content_design", "accessibility"], evidence_refs: ["internal.annotation_taxonomy", "google.conversation_errors"],
  }),
  route({
    route_id: "conversation.ending",
    description: "A conversational experience ends with the task outcome and any valid next path made clear.",
    when: { work_intent: ["conversational_turn"], task_structure: ["conversational"], conversation_state: ["ending"], interaction_pattern: ["conversation_prompt", "chat_message"] },
    required_axes: ["work_intent", "task_structure", "conversation_state", "interaction_pattern"], required_facts: ["ending_reason", "task_outcome", "reentry_or_alternative_path"],
    forbidden_claims: ["task_completed_without_evidence", "vague_future_help_promise"], recovery_requirement: "optional", review_gates: ["content_design", "accessibility"], evidence_refs: ["google.conversation_errors"],
  }),
];

type ScalarAxis = Exclude<UxWritingCoordinateAxis, "message_purposes">;

function scalarValue(classification: UxWritingCoordinateClassification, axis: ScalarAxis): string | null {
  return classification.axes[axis].status === "exact" ? classification.axes[axis].value : null;
}

const AXIS_MATCH_KEYS = [
  "work_intent", "journey", "state", "event_state", "state_cause", "task_structure",
  "content_slot", "interaction_pattern", "action_family", "content_scope", "channel",
  "attention_mode", "conversation_state", "reversibility", "risk",
] as const satisfies readonly ScalarAxis[];

interface RouteCompatibility {
  status: "match" | "partial" | "conflict";
  unresolved_conditions: UxWritingCoordinateAxis[];
}

function routeCompatibility(classification: UxWritingCoordinateClassification, policy: UxWritingPolicyRoute): RouteCompatibility {
  const unresolved: UxWritingCoordinateAxis[] = [];
  for (const axis of AXIS_MATCH_KEYS) {
    const allowed = policy.when[axis] as readonly string[] | undefined;
    if (allowed === undefined) continue;
    const value = scalarValue(classification, axis);
    if (value === null) unresolved.push(axis);
    else if (!allowed.includes(value)) return { status: "conflict", unresolved_conditions: [] };
  }
  if (policy.when.message_purposes_any !== undefined) {
    if (classification.axes.message_purposes.status !== "exact") unresolved.push("message_purposes");
    else if (!policy.when.message_purposes_any.some((purpose) => classification.axes.message_purposes.values.includes(purpose))) {
      return { status: "conflict", unresolved_conditions: [] };
    }
  }
  if (policy.when.outcome !== undefined && !policy.when.outcome.includes(classification.action_contract.outcome)) {
    return { status: "conflict", unresolved_conditions: [] };
  }
  return unresolved.length > 0
    ? { status: "partial", unresolved_conditions: [...new Set(unresolved)].sort() }
    : { status: "match", unresolved_conditions: [] };
}

export function resolveUxWritingPolicy(input: {
  classification: UxWritingCoordinateClassification;
  facts: Record<string, string>;
  routes?: readonly UxWritingPolicyRoute[];
}): UxWritingPolicyResolution {
  const routes = input.routes ?? BUILTIN_UX_WRITING_POLICY_ROUTES;
  const compatibility = routes.map((candidate) => ({ candidate, result: routeCompatibility(input.classification, candidate) }));
  const exact = compatibility.filter(({ result }) => result.status === "match");
  const partial = compatibility.filter(({ result }) => result.status === "partial");

  let routeValue: UxWritingPolicyRoute | null = null;
  let status: UxWritingPolicyResolution["status"] = "abstain";
  let reason: UxWritingPolicyResolution["reason"] = null;
  let candidateIds: string[] = [];
  let missingAxes: UxWritingCoordinateAxis[] = [];
  let missingFacts: string[] = [];

  if (input.classification.scope.status === "out_of_scope") {
    reason = "out_of_scope";
  } else if (exact.length === 0 && partial.length === 0) {
    reason = "no_route";
  } else if (exact.length === 0) {
    candidateIds = partial.map(({ candidate }) => candidate.route_id).sort();
    missingAxes = [...new Set(partial.flatMap(({ candidate, result }) => [
      ...result.unresolved_conditions,
      ...candidate.required_axes.filter((axis) => input.classification.unresolved_axes.includes(axis)),
    ]))].sort();
    reason = "classification_incomplete";
  } else if (exact.length > 1) {
    candidateIds = exact.map(({ candidate }) => candidate.route_id).sort();
    reason = "ambiguous_route";
  } else {
    const candidate = exact[0]?.candidate;
    if (candidate === undefined) reason = "no_route";
    else {
      candidateIds = [candidate.route_id];
      missingAxes = candidate.required_axes.filter((axis) => input.classification.unresolved_axes.includes(axis)).sort();
      missingFacts = candidate.required_facts.filter((fact) => typeof input.facts[fact] !== "string" || input.facts[fact]?.trim().length === 0).sort();
      if (missingAxes.length > 0) reason = "classification_incomplete";
      else if (missingFacts.length > 0) reason = "missing_facts";
      else { routeValue = candidate; status = "resolved"; }
    }
  }

  const preimage = {
    classification_ref: input.classification.classification_id, status, route: routeValue,
    candidate_route_ids: candidateIds, missing_axes: missingAxes, missing_facts: missingFacts,
    reason, authority_effect: "none" as const,
  };
  const digest = sha256Canonical(preimage);
  return { contract_version: "contentmd.ux-writing-policy-resolution/0.2.0", resolution_id: `uxwroute.${digest.slice(0, 32)}`, ...preimage };
}

export interface UxWritingRouteTemplate {
  template_id: string;
  route_id: string;
  required_facts: string[];
  render: (facts: Record<string, string>) => string;
}

export interface UxWritingRouteTemplateSelection {
  template_id: string | null;
  text: string | null;
  disposition: "selected" | "abstain";
  reason: "resolved_route_required" | "no_template" | "required_fact_missing" | "ambiguous_template" | null;
}

export function selectRouteTemplate(
  resolution: UxWritingPolicyResolution,
  facts: Record<string, string>,
  templates: readonly UxWritingRouteTemplate[],
): UxWritingRouteTemplateSelection {
  if (resolution.status !== "resolved" || resolution.route === null) {
    return { template_id: null, text: null, disposition: "abstain", reason: "resolved_route_required" };
  }
  const routeTemplates = templates.filter((template) => template.route_id === resolution.route?.route_id);
  if (routeTemplates.length === 0) return { template_id: null, text: null, disposition: "abstain", reason: "no_template" };
  const eligible = routeTemplates.filter((template) => template.required_facts.every((fact) => typeof facts[fact] === "string" && facts[fact]?.trim().length > 0));
  if (eligible.length === 0) return { template_id: null, text: null, disposition: "abstain", reason: "required_fact_missing" };
  if (eligible.length > 1) return { template_id: null, text: null, disposition: "abstain", reason: "ambiguous_template" };
  const template = eligible[0];
  if (template === undefined) return { template_id: null, text: null, disposition: "abstain", reason: "no_template" };
  return { template_id: template.template_id, text: template.render(facts), disposition: "selected", reason: null };
}
