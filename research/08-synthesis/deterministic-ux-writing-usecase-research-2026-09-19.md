# Deterministic UX-writing use-case research

Status: local synthesis plus fresh official-source validation; implemented English-only development taxonomy, not a production taxonomy
Date: 2026-09-19

## Finding

The system should not classify a request into one flat use case. The repository evidence describes several independent questions:

1. What journey is the person in?
2. What state is the product in?
3. What must the message do now?
4. What content slot or interaction pattern is being written?
5. What task structure, state cause, risk, delivery scope, English variant, and actor constraints apply?

A single label such as `action_failure` collapses distinctions that materially change the copy contract. A failed payment, a rejected field, a blocked permission, a fraud warning, and a destructive cancellation are all “failures” in a loose sense, but require different facts, recovery paths, and review gates.

## Evidence reviewed

### Repository taxonomy

`research/09-experimental/public-product-corpus/experience-taxonomy.json` currently defines:

- 6 coverage slots: entry/onboarding, core task/commitment, pending/progress, success, error/recovery, and destructive/permission/support.
- 11 journey families: access, commitment, completion, discovery, evaluation, management, onboarding, progress, recovery, safety, and support.
- 14 state classes: action available, authentication required, blocked, choice required, completed, consent required, destructive action pending, failed, information available, input required, permission required, processing, risk detected, and support available.
- 13 content-slot classes, 343 mappings, and explicit taxonomy/reviewer receipts.

### Experimental annotation taxonomy

`research/09-experimental/goodmicrocopy/annotation-taxonomy-v0.2.json` adds orthogonal dimensions for evidence type, surface, channel, journey stage, event state, message purposes, interaction pattern, consequence risk, tone traits, content anatomy, and context completeness. Its classifier outputs are explicitly hypotheses, not human gold or approved guidance.

### Capability request schema

`research/09-experimental/ux-writing-capability-record-proposals.schema.json` distinguishes request types including strategy, journey, pattern, contextual microcopy, rewrite, review, localization, recovery, notification, and conversational turn. These are work intents, not product UI states, and should remain a separate axis. The source schema includes localization, but the current classifier deliberately excludes it because this version is English-only.

### Existing implementation and research boundaries

The current implementation has a small state/action/outcome classifier. Existing UX-writing review rules already treat evidence, outcome certainty, recovery safety, semantic invariants, and specialist localization as separate checks. Existing research also requires `other`, uncertainty, competing branches, and human adjudication when taxonomy changes.

## Proposed use-case model

Represent a writing task as a typed coordinate, not a single enum:

```text
work_intent
  + journey_family
  + task_structure
  + state_class / event_state / established_cause
  + message_purpose (1..4)
  + content_slot / interaction_pattern
  + actor and audience
  + consequence_risk / reversibility
  + content_scope / channel / attention_mode
  + English variant
  + evidence and product-fact contract
```

The deterministic classifier should return one of three outcomes for each axis: `exact`, `ambiguous`, or `unclassified`. It may produce a composite route only when every required axis for that route is exact and the facts needed by its policy are present.

## Use-case families to support

| Family | Representative use cases | Critical distinction |
| --- | --- | --- |
| Orient | landing, introduction, navigation, wayfinding, overview | tell the person where they are and what is available |
| Discover | search, browse, filter, sort, category navigation, no-results | discovery failure is not the same as an empty owned dataset |
| Evaluate | compare, qualify, explain value, price, eligibility, trust, terms | disclose decision-relevant facts without overclaiming |
| Access | sign in, sign up, account recovery, verification, market/locale entry | identity/access contract and privacy/security boundaries |
| Onboard | setup, consent, permissions, education, first-run checklist, resume/skip | optionality, sequence, and prerequisite state |
| Input | field label, hint, format, validation, correction, review-before-submit | distinguish missing, malformed, invalid, and rejected input |
| Choose | plan, product, method, provider, preference, mode, date/time selection | alternatives and consequences must be represented |
| Commit | submit, pay, book, send, activate, create, save, confirm | action contract, consequence, reversibility, and confirmation |
| Progress | loading, processing, queued, tracking, delayed, paused, reconnecting | expectation-setting and safe interruption/retry behavior |
| Complete | success, partial success, receipt, delivery, approval, saved status | confirmed outcome versus optimistic UI |
| Fail/recover | system failure, declined action, unavailable dependency, timeout, interruption, retry | cause, current state, safe next step, and duplicate-action risk |
| Block | ineligible, restricted, missing prerequisite, permission gate, unsupported context | explain what prevents continuation and valid alternatives |
| Safety | fraud alert, security incident, suspicious activity, emergency, harm prevention | urgency, authority, reporting path, and risk-specific review |
| Manage | edit, update, renew, pause, resume, configure, preferences, billing | existing-state mutation and persistence semantics |
| Reverse/leave | cancel, refund, return, delete, revoke, unsubscribe, abandon | destructive consequence, confirmation, reversibility, and recovery |
| Support | help discovery, contact routing, troubleshooting, escalation, status inquiry | support is not a generic fallback for an unresolved product state |
| Notify/converse | push, email, SMS, reminder, alert, assistant turn, follow-up | channel timing, interruptiveness, threading, and cross-channel continuity |
| Accessibility/English variants | accessible name, screen-reader status, regional English conventions | accessibility semantics and regional context without claiming localization support |
| Govern/review | strategy, rewrite, review, approval packet, evidence request, decision record | work-process intent, not end-user product state |

These are families for coverage planning. They are not all mutually exclusive and must not be used as a replacement for the typed coordinate.

## Classifier architecture

Use a staged deterministic classifier:

1. Validate the request shape and preserve raw evidence.
2. Classify work intent.
3. Classify journey family and state class independently.
4. Classify message purposes and content slot.
5. Apply task-structure, cause, reversibility, delivery, and English-scope gates.
6. Resolve a policy route from an explicit registry.
7. Select a template only if the route has exactly one eligible policy and all required facts are present.
8. Otherwise return a structured abstention with the conflicting axes and missing facts.

Do not infer a user emotion, urgency, eligibility, product outcome, or recovery safety from wording alone. Those must come from evidence or explicit product facts.

## Implemented development contract

The implementation now supplements the earlier single `UxWritingUseCase` enum with a versioned `UxWritingCoordinate`, axis-level classification records, an evidence registry, and explicit policy routes such as:

- `input.validation.field_error`
- `commitment.payment.outcome_unknown`
- `progress.action.delayed`
- `recovery.destructive.confirm`
- `safety.account.risk_detected`
- `support.issue.route`

Each route declares required axes, required facts, forbidden claims, recovery requirements, review gates, and evidence references. Each newly introduced decision-critical value also has explicit inclusion and exclusion criteria. A route is not a copy template; it is the deterministic contract that makes template selection safe.

## Evidence boundaries

The local taxonomy and experimental corpus support coverage design and counterexample discovery. They do not establish universal writing effectiveness, production approval, or gold labels. The next validation step should be a frozen synthetic matrix covering the cross-product of key axes, followed by qualified human adjudication on ambiguity and near-neighbor cases.

## Fresh external verification, 2026-09-19

### Sourced facts

- WCAG 2.2 distinguishes input-error identification and correction from status messaging, and requires a review, correction, or reversibility mechanism for specified legal, financial, and data submissions. It also adds redundant-entry and accessible-authentication requirements. Sources: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [Error suggestion](https://www.w3.org/WAI/WCAG22/Understanding/error-suggestion.html), [Status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages), [Error prevention](https://www.w3.org/WAI/WCAG22/Understanding/error-prevention-legal-financial-data), [Accessible authentication](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html), and [Redundant entry](https://www.w3.org/WAI/WCAG22/Understanding/redundant-entry.html).
- WAI-ARIA separates a non-interruptive alert from an alert dialog that interrupts work and requires a response. Modal behavior also carries focus and inert-background obligations. Sources: [Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/), [Alert dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/), and [Modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/).
- GOV.UK separates field validation from eligibility, permission, page-not-found, unexpected service-problem, and deliberate service-unavailable states. Its confirmation guidance requires confirmed completion plus what happens next and a retrievable record where applicable. Sources: [Validation](https://design-system.service.gov.uk/patterns/validation/), [Error message](https://design-system.service.gov.uk/components/error-message/), [Problem with the service](https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/), [Service unavailable](https://design-system.service.gov.uk/patterns/service-unavailable-pages/), [Confirmation pages](https://design-system.service.gov.uk/patterns/confirmation-pages/), and [Interruption pages](https://design-system.service.gov.uk/patterns/interruption-pages/).
- GOV.UK treats review-before-submit as a distinct pattern for consequential transactions and explicitly preserves the distinction between reviewing and completing. Its quick-exit safety pattern requires explanation of residual risks such as browser history and data persistence. Sources: [Check answers](https://design-system.service.gov.uk/patterns/check-answers/) and [Exit a page quickly](https://design-system.service.gov.uk/patterns/exit-a-page-quickly/).
- USWDS distinguishes linear step location from an operation's live processing status, and reserves modal interruption for decisions requiring focused attention. Sources: [Step indicator](https://designsystem.digital.gov/components/step-indicator/), [Process list](https://designsystem.digital.gov/components/process-list/), [Modal](https://designsystem.digital.gov/components/modal/), and [Alert](https://designsystem.digital.gov/components/alert/).
- Apple distinguishes alerts from notifications, requires notification consent, warns against exposing sensitive information in notifications, and recommends contextual, specific permission explanations. It also treats onboarding as ideally optional and context-aware. Sources: [Alerts](https://developer.apple.com/design/human-interface-guidelines/alerts), [Notifications](https://developer.apple.com/design/human-interface-guidelines/notifications), [Privacy and permission requests](https://developer.apple.com/design/human-interface-guidelines/privacy), and [Onboarding](https://developer.apple.com/design/human-interface-guidelines/onboarding).
- GOV.UK distinguishes a linear sequence from longer transactions made of tasks that may span sessions and, where possible, be completed in flexible order. Task-level statuses such as not started, in progress, completed, cannot start, and error are not substitutes for a step count. Sources: [Complete multiple tasks](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) and [Task list](https://design-system.service.gov.uk/components/task-list/).
- GOV.UK models eligibility as a question-and-results flow, not a validation error. A negative result should explain the basis and, where possible, what the person can do instead. Source: [Check a service is suitable](https://design-system.service.gov.uk/patterns/check-a-service-is-suitable/).
- Carbon distinguishes no-data/first-use empty states, user-action empty states such as no results or completion, and error-management empty states caused by permissions, systems, configuration, or unsupported actions. Source: [Empty states](https://carbondesignsystem.com/patterns/empty-states-pattern/).
- Atlassian separates message type from the component that carries it and distinguishes the affected scope of banners, section messages, inline messages, flags, dialogs, and empty states. Source: [Designing messages](https://atlassian.design/foundations/content/designing-messages).
- Google's conversation-design guidance distinguishes parameter confirmation from action confirmation, and no-input from no-match and dependent-system errors. The pages were last updated in 2024, so they are treated as bounded interaction-design precedents rather than a current universal voice standard. Sources: [Confirmations](https://developers.google.com/assistant/conversation-design/confirmations) and [Errors](https://developers.google.com/assistant/conversation-design/errors).

### Inferences applied to the system

- Add `attention_mode` as an independent axis with `inline`, `status`, `alert`, `interruptive_dialog`, `page`, and `out_of_app` values. Surface or component name alone does not establish interruption or announcement behavior.
- Add independent `task_structure`, `state_cause`, `content_scope`, `reversibility`, and `conversation_state` axes. They change required facts and recovery behavior; they cannot safely be inferred from a journey or component label.
- Split no-search-results from an empty owned collection; field validation from eligibility or service failure; processing progress from location within a multi-step task; and unexpected failure from planned unavailability.
- Split first-use, cleared-data, permission, configuration, and system-caused empty states; split a flexible task overview from a linear step indicator; and split no-input, no-match, and dependent-system conversational errors.
- Add policy routes for review-before-submit, expired verification codes, service-problem pages, service-unavailable pages, page-not-found recovery, optional onboarding, quick exit, and empty collections.
- Add routes for eligibility results, flexible multi-task progress, evidence-specific empty states, conversational repair, conversational confirmations, handoff, and endings.
- Require notification consent, privacy, deduplication, and foreground-behavior facts before notification route resolution.
- Require entered-data state and retry safety for failures, next steps and record retrieval for confirmations, and reversibility plus unsaved-work effects for destructive confirmations.

### English-only scope decision

- Supported language: English only, represented as `en` or an English BCP 47 variant such as `en-US` or `en-GB`.
- English variants are context, not separate use cases and not evidence that regional conventions have been reviewed.
- Non-English locale tags, translation, localization, multilingual evaluation, and cross-language semantic-parity work return `out_of_scope`.
- Accessibility remains in scope because semantic names, status announcements, focus behavior, and error identification are not localization features.

### What this verification does not prove

Official design-system and standards guidance supports taxonomy separation and safety requirements, but does not prove that this exact classifier is complete, calibrated, or effective across products or English variants. The route registry still needs a frozen adversarial scenario matrix, qualified content-design adjudication, accessibility review, regional-English review, and product-specific outcome validation. Multilingual review becomes necessary only if a later version expands the declared language scope.
