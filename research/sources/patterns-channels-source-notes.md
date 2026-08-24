---
title: Interaction-pattern and channel-practice source notes
status: working-source-log
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
retrieved: 2026-08-17
---

# Interaction-pattern and channel-practice source notes

## How to read this log

This source log supports the interaction-pattern and channel/modality practice syntheses. It does not establish universal interface copy. All sources were accessed on 17 August 2026 unless another date is stated.

Evidence classes:

- **Normative standard:** conformance language applies only within the standard's declared scope.
- **Government or public-service guidance:** official practice for the named service context; useful evidence, not a universal law.
- **Platform documentation:** current requirements or recommendations for the named platform; behavior and review rules can change.
- **Official design-system guidance:** tested or documented practice within the system's product and audience boundary.
- **Security standard or community guidance:** security requirements or threat-informed implementation practice; not a replacement for a product threat model.
- **Strong practitioner guidance:** experience-backed practice that is neither a law nor a conformance standard.
- **Vendor documentation:** evidence of the vendor's product model or documented practice, not independent outcome evidence.

In the records below:

- **Observation** is a source-grounded statement.
- **Supports** is this project's synthesis or product implication.
- **Boundary** prevents the source from being generalized beyond its evidence.
- A current implementation, documented practice, or observed string is evidence; it is not automatically an approved content decision.

Record conventions that apply unless a record says otherwise:

- **Author or organization** is the organization named in the record heading and official domain; an individual author is not asserted when the page does not name one.
- **Publication or update date** is included in `Scope`, `Observation`, or `Freshness risk` when the source exposes one; otherwise the date was not stated and the retrieval date above is the only verified date.
- **Source type and evidentiary role** follow `Type` and the research protocol's source hierarchy: normative standards and official specifications first, then primary organizational guidance/design systems, then established practitioner evidence, with vendor-product documentation limited to evidence about that product. This ranking does not establish governing applicability, appoint an accountable owner or approver, or grant system capability.
- **Read mode** is direct rendered-page review. PC-025 is the declared exception: its official page was rate-limited, so the observation is metadata/search-result-only and must be re-read before normative use.
- **Research question informed** is the section heading plus the `Supports` field. `Observation` maps to a canonical **sourced fact** or **documented practice** claim according to source type; `Supports` maps to an **inference** or **proposal**, never a source assertion.

## Forms, questions, validation, confirmation, and recovery

### PC-001 — GOV.UK form structure and question protocol

- URL: https://www.gov.uk/service-manual/design/form-structure
- Type: government service-design guidance.
- Scope: UK central-government online forms; last updated 7 August 2018.
- Observation: before writing questions, teams should record why each item is needed, what it will be used for, who must provide it, how accuracy will be checked, and how it will be kept current and secure. The guidance calls this a question protocol. It recommends starting with one thing per page, then merging only when research supports it.
- Supports: requiring a data-purpose and use record before an agent drafts any form question; treating page grouping as a researched decision.
- Boundary: the one-thing-per-page approach has explicit counterexamples, including expert internal services; it is a starting hypothesis, not a universal rule.
- Freshness risk: medium; recheck when GOV.UK guidance changes.

### PC-002 — GOV.UK designing good questions and question pages

- URLs:
  - https://www.gov.uk/service-manual/design/designing-good-questions
  - https://design-system.service.gov.uk/patterns/question-pages/
- Type: government service-design guidance and official design-system pattern.
- Scope: UK government transactions; the service-manual page was updated 24 June 2026.
- Observation: only ask what is needed; make the reason clear; allow uncertainty responses when valid; use closed questions when they reduce ambiguity; add help only when research identifies a need; make validation tolerant of unambiguous formats; retain normal browser back behavior except where replaying a one-time action would be unsafe.
- Supports: modelling valid non-answer states, branching, answer reuse, back/replay semantics, and question-specific evidence.
- Boundary: a closed question is not always appropriate for exploratory, narrative, safeguarding, or research contexts.
- Freshness risk: medium.

### PC-003 — W3C forms tutorial and WCAG input assistance

- URLs:
  - https://www.w3.org/WAI/tutorials/forms/
  - https://www.w3.org/TR/WCAG22/
  - https://www.w3.org/WAI/WCAG22/Understanding/input-assistance
- Type: W3C tutorial, W3C Recommendation, and non-normative understanding guidance.
- Scope: accessible web forms; WCAG 2.2 conformance scope and levels apply.
- Observation: forms need programmatically associated labels, instructions, grouped controls, validation feedback, completion notifications, and logical multi-page progress. WCAG 2.2 requires text error identification and labels/instructions; it adds redundant-entry and accessible-authentication criteria and requires prevention controls for legal, financial, and user-data-changing submissions at level AA.
- Supports: treating visible labels, accessible names, instructions, errors, summaries, and status announcements as coordinated expressions of one form decision.
- Boundary: the tutorial is best-practice guidance; only the referenced WCAG success criteria are normative, and conformance must be assessed on complete pages and processes.
- Freshness risk: low to medium; monitor WCAG revisions and errata.

### PC-004 — GOV.UK validation, error messages, and error summaries

- URLs:
  - https://design-system.service.gov.uk/patterns/validation/
  - https://design-system.service.gov.uk/components/error-message/
  - https://design-system.service.gov.uk/components/error-summary/
- Type: official design-system pattern and components.
- Scope: GOV.UK form validation.
- Observation: validation errors should say what went wrong and how to correct it; entered values should be retained; field errors and a page summary should agree and link to the relevant control. Eligibility, permission, and service failures are not validation errors and require different patterns.
- Supports: classifying failure ownership and recovery before selecting an error surface; preserving state and distinguishing user-correctable input from product or policy outcomes.
- Boundary: component placement and visual treatment are GOV.UK-specific; the semantic distinction is broader but still needs product testing.
- Freshness risk: medium.

### PC-005 — GOV.UK check answers and confirmation pages

- URLs:
  - https://design-system.service.gov.uk/patterns/check-answers/
  - https://design-system.service.gov.uk/patterns/confirmation-pages/
- Type: official design-system patterns.
- Scope: small-to-medium government transactions, with guidance for larger transactions.
- Observation: consequential submissions can provide a review-and-correct stage before commitment. A completion page should confirm the completed transaction, include a reference when one exists, explain what happens next and when, provide contact/support information, and offer a record where appropriate.
- Supports: separate pre-commit review, committed confirmation, and receipt/record states.
- Boundary: a check-answers page is not needed for every low-risk or trivially reversible action; large or multi-actor transactions may require section-level review.
- Freshness risk: medium.

### PC-006 — VA.gov pattern maturity and multi-channel definition

- URLs:
  - https://design.va.gov/patterns/
  - https://design.va.gov/about/contributing-to-the-design-system/experimental-components-and-patterns
- Type: official US government design-system guidance.
- Scope: VA.gov and related Veteran-facing services.
- Observation: VA defines patterns as researched solutions that can span pages, time, and channels and combine design, content strategy, components, and accessibility. Experimental patterns are visibly marked when not validated enough to be called best practice.
- Supports: storing pattern maturity and evidence separately from implementation availability; refusing to promote an observed pattern to approved canon based on reuse alone.
- Boundary: VA research is audience- and service-specific; some linked research is not public.
- Freshness risk: medium.

## Onboarding, authentication, permissions, and consent

### PC-007 — Apple onboarding

- URL: https://developer.apple.com/design/human-interface-guidelines/onboarding
- Type: official platform design guidance.
- Scope: Apple-platform apps and games; change log includes a 10 June 2024 clarification.
- Observation: onboarding should be fast and optional when it is needed; interactive learning and contextual tips are preferred to detached instruction; nonessential setup should be postponed; private-data permission requests should occur in a context that explains their benefit.
- Supports: making first-run instruction conditional on a demonstrated learning need and preserving skip, return, and later-discovery paths.
- Boundary: Apple's language, component, and review expectations apply to Apple platforms, not every onboarding environment.
- Freshness risk: high; recheck platform guidance before enforcement.

### PC-008 — Android authentication and onboarding

- URL: https://developer.android.com/design/ui/mobile/guides/patterns/onboarding
- Type: official platform design guidance.
- Scope: Android mobile and cross-form-factor authentication/onboarding; page published in 2026.
- Observation: assess whether every input is necessary, break long setup into manageable steps, design for adaptive layouts, and support cross-device authentication handoffs where appropriate. The guidance describes solution-focused error tone during high-stress recovery.
- Supports: modelling device handoff, abandoned setup, saved progress, and authentication recovery as lifecycle states rather than a single first-run screen.
- Boundary: component and layout examples are Android-specific; brevity does not override legal, safety, or informed-consent disclosure.
- Freshness risk: high.

### PC-009 — NIST SP 800-63B-4 digital authentication and recovery

- URLs:
  - https://pages.nist.gov/800-63-4/sp800-63b.html
  - https://pages.nist.gov/800-63-4/sp800-63b/authenticators/
- Type: US government security standard/guideline.
- Scope: networked digital identity at defined identity and authentication assurance levels; SP 800-63-4 supersedes SP 800-63-3.
- Observation: recovery methods, validity periods, throttling, reauthentication, authenticator binding/invalidation, and independent account-event notifications depend on assurance and risk. Recovery events require notification and repudiation instructions; recovery is expected to be less convenient and may take longer than routine authentication.
- Supports: obtaining the assurance level, recovery methods, notification addresses, expiry, retry, lockout, support, and fraud-response model before writing authentication content.
- Boundary: not every consumer product is required to implement the federal profile, and content wording cannot determine an assurance level.
- Freshness risk: high; security profiles and errata must be rechecked.

### PC-010 — OWASP forgot-password guidance

- URL: https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html
- Type: strong security-community implementation guidance.
- Scope: password-reset services and common web threats.
- Observation: request responses should not reveal whether an account exists and should have uniform timing; reset identifiers should be secure, single-use, and expiring; successful reset should trigger notification; reset should not silently create a broader authenticated session; repeated reset requests require abuse controls.
- Supports: separating safe public acknowledgement from private side-channel instructions and modelling enumeration, abuse, expiry, invalid token, success, and repudiation states.
- Boundary: OWASP guidance is not a law or a complete threat model; NIST or sector requirements may be stricter or different.
- Freshness risk: high.

### PC-011 — WCAG accessible authentication

- URLs:
  - https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum
  - https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- Type: W3C Recommendation and explanatory overview.
- Scope: web content authentication; WCAG 2.2 levels and exceptions apply.
- Observation: at level AA, authentication should not require a cognitive-function test unless an alternative, assistance, or object-recognition/personal-content exception applies. Password managers and copy/paste support are relevant techniques; redundant-entry exceptions include essential or security-required re-entry.
- Supports: testing sign-in and recovery with password managers, paste, assistive technology, and non-memory-dependent alternatives.
- Boundary: the criterion does not prohibit authentication or all one-time codes; teams must interpret the exact normative text and techniques.
- Freshness risk: low to medium.

### PC-012 — Android runtime permissions

- URLs:
  - https://developer.android.com/training/permissions/requesting
  - https://developer.android.com/training/permissions/usage-notes
- Type: official platform documentation.
- Scope: Android runtime permissions; pages updated in 2026.
- Observation: first determine whether permission is necessary; ask in the task context; explain the data and benefit when needed; let the person cancel educational UI; degrade gracefully after denial; identify what is unavailable without pressuring the person to reverse a choice; recheck permission at use time.
- Supports: permission state models covering not requested, rationale, system prompt, granted, denied, permanently denied, revoked, partial capability, settings recovery, and dependency-driven permissions.
- Boundary: exact system dialog text and re-prompt behavior are OS/version-controlled; an app should not invent those strings or assume grouping.
- Freshness risk: high.

### PC-013 — Apple privacy and permission requests

- URL: https://developer.apple.com/design/human-interface-guidelines/privacy
- Type: official platform design guidance.
- Scope: Apple protected data/resources and tracking requests.
- Observation: the immediate context should explain the permission. When an extra pre-alert is necessary, it must not mimic or manipulate the system alert; Apple gives specific constraints for tracking-request screens and their controls.
- Supports: treating app rationale and OS permission prompt as separate expressions owned by different authorities, and verifying the runtime sequence.
- Boundary: detailed button and pre-alert constraints are Apple-specific and can change through review policy.
- Freshness risk: high.

### PC-014 — GOV.UK personal-information and consent guidance

- URL: https://www.gov.uk/service-manual/design/collecting-personal-information-from-users
- Type: government service-design guidance.
- Scope: UK public-service personal data collection; legal basis must be established by qualified owners.
- Observation: privacy information is part of the service and should be in plain language. When consent is the applicable basis, the guidance calls for an explicit, specific choice, separation of distinct purposes, frequency information where relevant, and a clear withdrawal path.
- Supports: requiring a verified legal basis, purpose, data use, retention, refusal consequence, and withdrawal model before consent content is drafted.
- Boundary: the page cannot determine whether consent is the correct legal basis for a particular processing operation or jurisdiction.
- Freshness risk: high; privacy law and official guidance are mutable.

## Search, empty states, progress, and async work

### PC-015 — VA.gov search filter

- URL: https://design.va.gov/components/search-filter
- Type: official design-system component with candidate maturity.
- Scope: faceted search on VA.gov; page identifies its maturity and a 21 May 2025 accessibility audit.
- Observation: filters need active-state visibility and reset; mobile and desktop placement differs; updated result counts, loading, and errors should be announced; focus behavior differs between filtering and sorting; the component is marked “use with caution.”
- Supports: modelling query, filters, sort, result set, result count, focus destination, loading, error, and reset as one coordinated interaction decision while retaining expression-specific layouts.
- Boundary: threshold examples and responsive arrangement are VA-specific; the linked research is not fully public.
- Freshness risk: medium.

### PC-016 — Carbon empty states

- URL: https://carbondesignsystem.com/patterns/empty-states-pattern/
- Alternate current preview: https://preview.carbondesignsystem.com/building-blocks/core/patterns/empty-states
- Type: official vendor design-system pattern.
- Scope: IBM Carbon product interfaces; current preview updated June 2026.
- Observation: Carbon distinguishes first use, user-cleared or deleted data, no results, unavailable data, and error-related emptiness; next-step guidance and starter content are conditional on the empty-state cause. It warns that localized screenshots/images increase maintenance.
- Supports: prohibiting a single “empty state” category and requiring cause, expected data, permissions, filters, loading, failure, and recovery evidence.
- Boundary: Carbon's anatomy and tone are not universal, and the preview notes an error-state pattern gap.
- Freshness risk: medium to high while preview content evolves.

### PC-017 — Carbon loading and progress

- URLs:
  - https://preview.carbondesignsystem.com/building-blocks/core/patterns/loading
  - https://carbondesignsystem.com/components/inline-loading/usage/
  - https://carbondesignsystem.com/components/progress-bar/usage/
- Type: official vendor design-system pattern and components.
- Scope: Carbon interfaces; pages updated in 2026.
- Observation: skeletons, inline loading, full-screen loading, determinate progress, indeterminate progress, and progressive loading serve different scopes and durations. Inline loading has inactive, active, finished, and error states; assistive technology should be informed of loading, stuck, and failure states.
- Supports: requiring operation scope, expected duration, progress measurability, cancellation/background capability, completion, timeout, stuck, and failure before choosing a progress expression.
- Boundary: time thresholds are heuristic and context dependent; animation and component specifics are Carbon-specific.
- Freshness risk: medium.

### PC-018 — WCAG status messages

- URLs:
  - https://www.w3.org/TR/WCAG22/#status-messages
  - https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html
- Type: W3C Recommendation and non-normative explanation.
- Scope: status messages in markup-based web content.
- Observation: status messages must be programmatically determinable so assistive technologies can present them without moving focus. Roles and properties should reflect whether a message is advisory or urgent.
- Supports: linking visual and live-region expressions while avoiding focus theft; recording urgency as behavior, not color alone.
- Boundary: the criterion does not require every content change to be announced and does not prescribe exact words.
- Freshness risk: low to medium.

### PC-019 — Google API long-running operations and partial errors

- URLs:
  - https://google.aip.dev/151
  - https://google.aip.dev/193
- Type: official Google API design guidance.
- Scope: Google-style APIs, RPC error models, and long-running operations; AIP-151 is approved.
- Observation: long operations return a trackable operation rather than blocking; metadata can expose progress and partial failures. AIP-193 generally discourages partial errors because they complicate clients, while allowing structured partial failure for bulk long-running operations.
- Supports: representing an operation ID, state, progress, per-item result, retryability, cancellation, expiry, and final outcome independently from a UI spinner.
- Boundary: the protocol shapes are Google API conventions, not universal API standards.
- Freshness risk: medium.

## Warnings, destructive actions, billing, notifications, and offboarding

### PC-020 — Apple alerts

- URL: https://developer.apple.com/design/human-interface-guidelines/alerts
- Type: official platform design guidance.
- Scope: Apple-platform alerts.
- Observation: alerts are for critical, immediate information and useful actions; routine information should stay in context. Apple distinguishes common undoable deletion from uncommon irreversible destruction and recommends alerts only for the latter. Titles should describe the situation rather than merely say “Error.”
- Supports: basing interruption and confirmation on consequence, reversibility, frequency, and user initiation rather than a “destructive” color token.
- Boundary: exact alert anatomy and action-sheet distinction are Apple-specific.
- Freshness risk: high.

### PC-021 — USWDS alerts and modals

- URLs:
  - https://designsystem.digital.gov/components/alert/
  - https://designsystem.digital.gov/components/modal/
- Type: official US government design-system components.
- Scope: US federal web interfaces using USWDS.
- Observation: alerts can communicate status and next steps; destructive, non-reversible work may require confirmation. Modals intentionally interrupt and should be used sparingly, usually after a user action; field errors and page-level completion generally belong in context rather than a modal.
- Supports: selecting the least disruptive surface that still matches consequence and required attention, with explicit focus/keyboard behavior.
- Boundary: USWDS itself says project implementations need accessibility testing; examples are not universal content.
- Freshness risk: medium.

### PC-022 — WCAG error prevention for consequential actions

- URL: https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data
- Type: W3C Recommendation.
- Scope: web pages that create legal commitments, financial transactions, modify/delete user-controllable data, or submit test responses; level AA.
- Observation: at least one of reversibility, input checking with correction opportunity, or review/confirmation is required in scope.
- Supports: requiring the product team to identify the actual prevention mechanism; content cannot compensate for missing reversibility, validation, or review behavior.
- Boundary: the criterion does not mandate a confirmation dialog or a specific literal.
- Freshness risk: low to medium.

### PC-023 — Apple auto-renewable subscriptions

- URL: https://developer.apple.com/app-store/subscriptions/
- Type: official platform/business documentation.
- Scope: App Store auto-renewable subscriptions.
- Observation: sign-up must clearly present name/duration, included service, full localized renewal price, and restore/sign-in; billed amount should be most prominent; trial end and later price should be clear. Plan changes can take effect immediately or at renewal, and price changes may trigger consent or notice across channels.
- Supports: collecting platform, storefront, plan, price, currency, tax treatment, billing cadence, trial, renewal, proration, eligibility, change-effective date, grace/retry, and cancellation state before drafting.
- Boundary: App Store behavior does not establish web, Google Play, or jurisdiction-wide requirements; commercial and legal owners must verify claims.
- Freshness risk: high.

### PC-024 — Apple account deletion and subscription coupling

- URL: https://developer.apple.com/support/offering-account-deletion-in-your-app/
- Type: official platform review guidance.
- Scope: App Store apps that support account creation.
- Observation: deletion initiation must be findable and cover the account rather than only deactivation; delayed/manual deletion needs timing and final confirmation; legally retained data must be explained. Active auto-renewing subscriptions require separate billing/cancellation handling, and identity confirmation may be appropriate without unnecessary obstruction.
- Supports: treating account deletion, data deletion, access removal, workspace ownership, subscription cancellation, legal retention, and completion notification as linked but distinct events.
- Boundary: Apple review rules are not a full legal erasure standard and do not determine retention requirements.
- Freshness risk: high.

### PC-025 — Google Play account deletion

- URL: https://support.google.com/googleplay/android-developer/answer/13327111
- Type: official platform policy guidance.
- Scope: Google Play apps that allow account creation.
- Observation: Google Play documents an account-deletion-request requirement and related data-safety disclosures for in-scope apps.
- Supports: checking store/platform obligations independently and discovering both in-app and web deletion entry points.
- Boundary: the page was rate-limited during direct retrieval; this record relies on the official search result and must be rechecked before normative use.
- Freshness risk: high.

### PC-026 — Apple notification interruption and consent

- URL: https://developer.apple.com/design/human-interface-guidelines/managing-notifications
- Type: official platform design guidance.
- Scope: Apple-platform notifications.
- Observation: notification delivery is permissioned and user-configurable; passive, active, time-sensitive, and critical levels have different interruption behavior. Urgency must be represented accurately; marketing notification permission and in-app management are distinct from ordinary product updates.
- Supports: deriving interruption class from consequence and time window, not marketing priority; modelling user preferences, Focus/delay, redaction, action, expiry, and in-app history.
- Boundary: interruption levels and entitlements are Apple-specific; delivery is not proof a person saw or understood a message.
- Freshness risk: high.

### PC-027 — Android notifications

- URL: https://developer.android.com/design/ui/mobile/guides/home-screen/notifications
- Type: official platform design guidance.
- Scope: Android notifications, including Android 13+ permission behavior.
- Observation: explain value and denial consequence before requesting non-exempt notification permission; contextual education should be dismissible; do not immediately re-prompt after dismissal. Required/foreground-service notification behavior differs from optional notifications.
- Supports: separating notification-category purpose, OS authorization, channel settings, delivery state, and message expression.
- Boundary: OS-version and exemption behavior must be checked at implementation time.
- Freshness risk: high.

## Help and support

### PC-028 — WCAG consistent help

- URL: https://www.w3.org/WAI/WCAG22/Understanding/consistent-help
- Type: non-normative explanation of WCAG 2.2 success criterion 3.2.6.
- Scope: repeated help mechanisms within a set of web pages.
- Observation: when human contact, human contact mechanism, self-help, or automated help repeats, its relative order must be consistent. The criterion does not require help to exist, nor a human to be available continuously.
- Supports: preserving support discoverability and serial order across expressions and responsive variants while separately recording availability and response expectations.
- Boundary: this is an understanding document; exact conformance is defined in WCAG 2.2.
- Freshness risk: low to medium.

### PC-029 — GOV.UK contact and user-support operations

- URLs:
  - https://design-system.service.gov.uk/patterns/contact-a-department-or-service-team/
  - https://www.gov.uk/service-manual/helping-people-to-use-your-service/set-up-and-manage-user-support
- Type: official design-system pattern and government service guidance.
- Scope: UK government services.
- Observation: contact details should be ordered by researched need and kept consistent, including hours, expected response, charges, current waits, accessibility/language channels, and privacy limits. Support demand, reason, handling time, status, and channel should feed continuous improvement; enquiries can be treated as service faults.
- Supports: connecting support content to operational capacity, routing, privacy, case context, handoff, and defect taxonomy.
- Boundary: sample service levels and channels are contextual; publishing a channel without operational ownership creates false recovery.
- Freshness risk: medium.

## Channel and modality practice

### PC-030 — Apple layout, adaptation, and accessibility

- URLs:
  - https://developer.apple.com/design/human-interface-guidelines/layout
  - https://developer.apple.com/design/human-interface-guidelines/accessibility
- Type: official platform design guidance.
- Scope: Apple devices, window sizes, input modes, accessibility settings, and locales.
- Observation: hierarchy and layout should adapt to device, orientation, window, Dynamic Type, reading direction, locale length, and input context while remaining recognizable. Core functionality should work through more than one physical interaction; essential audio needs text equivalents.
- Supports: treating mobile/desktop layouts, visible/assistive content, captions, and voice-control labels as expressions that share semantics but need distinct verification.
- Boundary: Apple control sizes and platform conventions do not transfer unchanged to web, Android, or Windows.
- Freshness risk: high.

### PC-031 — Android adaptive apps

- URLs:
  - https://developer.android.com/develop/adaptive-apps
  - https://developer.android.com/develop/adaptive-apps/guides/adaptive-dos-and-donts
- Type: official platform documentation.
- Scope: Android phones, tablets, foldables, desktop windows, cars, TV, and XR surfaces.
- Observation: apps should adapt components and information layout to window size, posture, hardware, and input rather than only stretch a phone layout; list-detail and supporting-pane structures can expose different simultaneous context.
- Supports: verifying content hierarchy, selection context, back behavior, and action labels at every layout mode instead of assuming responsive CSS preserves the experience.
- Boundary: canonical layouts are Android patterns and do not decide a product's content priority.
- Freshness risk: high.

### PC-032 — Windows keyboard and responsive desktop interaction

- URLs:
  - https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-interactions
  - https://learn.microsoft.com/en-us/windows/apps/get-started/best-practices
- Type: official platform documentation.
- Scope: Windows desktop apps and keyboard/accessibility interaction; pages updated in 2026.
- Observation: all functionality should be reachable by keyboard with meaningful focus, access keys, and shortcuts where appropriate; window resizing, DPI, scale, and multiple input configurations require testing.
- Supports: inventorying menu labels, shortcut names, access keys, tooltips, focus order, window titles, multi-selection, and background task status as desktop content surfaces.
- Boundary: platform shortcuts and access-key conventions are locale and app dependent.
- Freshness risk: high.

### PC-033 — WCAG reflow, target, label-in-name, and status

- URLs:
  - https://www.w3.org/WAI/WCAG22/Understanding/reflow.html
  - https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum
  - https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
  - https://www.w3.org/TR/WCAG22/
- Type: W3C Recommendation and non-normative understanding guidance.
- Scope: web content and assistive technology.
- Observation: content must reflow within the criterion's scope; pointer targets have minimum-size requirements with stated exceptions; visible control labels need to be present in accessible names for speech input; status changes need programmatic exposure.
- Supports: verifying truncated/reordered content, touch targets, voice-control names, focus, and live announcements across responsive expressions.
- Boundary: understanding pages explain but do not replace the normative criteria; some content has two-dimensional-layout exceptions.
- Freshness risk: low to medium.

### PC-034 — Google conversation-design sample dialogs and confirmations

- URLs:
  - https://developers.google.com/assistant/conversation-design/write-sample-dialogs
  - https://developers.google.com/assistant/conversation-design/confirmations
  - https://developers.google.com/assistant/conversation-design/learn-about-conversation
- Type: official platform-era practitioner guidance.
- Scope: Actions on Google conversational design; the runtime product context is legacy/deprecated, while the public design method remains available.
- Observation: write sample dialogs and conversation flows before implementation; listen to spoken prompts; confirmation can be implicit, explicit, or omitted based on recognition confidence, consequence, and recoverability; repair should be contextual rather than a repeated generic failure.
- Supports: modelling turn state, captured parameters, confidence, correction, confirmation, interruption, reprompt, and exit before drafting individual utterances.
- Boundary: product/API details are not current proof of Google Assistant capabilities, and confirmation advice needs new validation for generative agents.
- Freshness risk: high.

### PC-035 — Apple Siri multimodal response guidance

- URL: https://developer.apple.com/design/human-interface-guidelines/siri
- Type: official current platform design guidance.
- Scope: Siri and App Intents across audible and visual contexts; revised 8 June 2026.
- Observation: expose familiar action/entity terms; responses should state what happened, remain concise under repetition, work audibly and visually, avoid dependence on visual context for essential meaning, account for device handoff, and make failures situation-specific.
- Supports: separate audible, visual, and combined expressions plus pronunciation, nearby-listener privacy, device target, and action-result states.
- Boundary: custom response opportunities and reserved language are Siri-specific.
- Freshness risk: high.

### PC-036 — IBM conversational AI planning and repair

- URLs:
  - https://www.ibm.com/design/ai/conversation/
  - https://www.ibm.com/design/ai/conversation/planning/
- Type: strong vendor practitioner guidance.
- Scope: task-focused chatbots and conversational agents.
- Observation: establish purpose and topic breadth/depth before personality; map ideal paths, deviations, dead ends, and human handoffs; maintain transparency that the participant is a bot; plan repair as part of the conversation.
- Supports: making capabilities, non-capabilities, sources, memory, human escalation, and repair part of the content model rather than generic tone.
- Boundary: IBM's terminology and persona framing are not empirical proof for all generative chat products.
- Freshness risk: medium.

### PC-037 — Microsoft graceful conversational fallbacks and handoffs

- URL: https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-fallbacks
- Type: official product practitioner guidance.
- Scope: Copilot Studio conversational experiences.
- Observation: state capabilities early; design a fallback sequence rather than one generic apology; after repeated inability, hand off with clear expectations and retained context so the person does not restart.
- Supports: tracking fallback count, rephrase strategy, unsupported intent, human availability, transferred context, privacy consent, and final disposition.
- Boundary: the suggested number of fallback questions is product guidance, not a universal threshold.
- Freshness risk: high.

### PC-038 — GOV.UK email, SMS, and letters

- URLs:
  - https://www.gov.uk/service-manual/design/sending-emails-and-text-messages
  - https://www.gov.uk/service-manual/technology/how-to-email-your-users
  - https://www.gov.uk/service-manual/technology/sending-text-messages-securely
  - https://www.gov.uk/service-manual/design/writing-effective-letters
- Type: government service-design and technical guidance.
- Scope: UK government transactional and subscription communications.
- Observation: send only for a user need; distinguish transactional from subscribed updates; choose channel using preference, sensitivity, urgency, length, and available contact data; state sender, purpose, action, deadline, non-action consequence, next event, and support. Delivery failures and phishing protections need operational handling; letters can be right when a hard copy, accessible format, sensitivity, law, or user expectation requires one.
- Supports: channel selection and orchestration before expression drafting; linking delivery receipts, bounce/failure, fallback, consent, unsubscribe, and records.
- Boundary: rules about domains, greetings, URLs, and permission reflect UK government practice and must not be universalized.
- Freshness risk: high for security and delivery guidance; medium for writing practice.

### PC-039 — Command Line Interface Guidelines

- URL: https://clig.dev/
- Type: open-source strong practitioner guidance.
- Scope: human- and machine-used command-line programs; not a standard.
- Observation: separate primary output from diagnostic messaging; use exit codes; provide concise and full help; disclose state changes and next commands; keep human and machine-readable modes composable; avoid animation in non-interactive output; make external side effects explicit.
- Supports: treating help, stdout, stderr, structured output, exit status, progress, prompt, dry run, confirmation, and CI logs as coordinated but distinct expressions.
- Boundary: recommendations can conflict with established tool ecosystems; the guide explicitly allows intentional deviation.
- Freshness risk: medium.

### PC-040 — Google developer documentation style

- URLs:
  - https://developers.google.com/style
  - https://developers.google.com/style/procedures
  - https://developers.google.com/style/code-syntax
- Type: official developer-documentation practitioner guidance.
- Scope: Google developer documentation and technical audiences; actively updated in 2026.
- Observation: task procedures should provide context, action, command, placeholders, output, and result in a usable order; runnable examples should avoid syntax that users must strip; input and output should be distinguishable; project-specific rules take precedence over the general style guide.
- Supports: linking documentation to product version, runnable artifact, expected output, rollback, prerequisites, and source-of-truth ownership.
- Boundary: editorial mechanics are Google-specific and do not prove that a procedure works.
- Freshness risk: medium.

### PC-041 — RFC 9457 Problem Details for HTTP APIs

- URL: https://www.rfc-editor.org/rfc/rfc9457.html
- Type: IETF Standards Track RFC.
- Scope: machine-readable problem details for HTTP APIs; published July 2023; obsoletes RFC 7807.
- Observation: `type`, `status`, `title`, `detail`, and `instance` have distinct semantics; `detail` should help a client correct this occurrence and must not become a field that machines parse. Security considerations warn against exposing implementation internals.
- Supports: keeping stable machine identity separate from localized human explanation and request-specific recovery; linking API problem semantics to UI expressions without reusing a literal as an identifier.
- Boundary: the RFC does not require Problem Details for every API or replace domain-specific formats.
- Freshness risk: low; monitor errata and successor documents.

### PC-042 — Google AIP errors and localization

- URL: https://google.aip.dev/193
- Type: official Google API design guidance.
- Scope: Google-style RPC/HTTP APIs.
- Observation: machine-readable error identity and metadata are separate from developer-facing and localized messages; localized messages include locale and actionable resolution; help links supplement rather than replace a clear problem and action; clients should not parse prose for control flow.
- Supports: independent semantic error identity, expression locale, diagnostic detail, recovery action, and help reference.
- Boundary: required payload shapes are Google conventions, not IETF requirements.
- Freshness risk: medium.

### PC-043 — Atlassian Statuspage incident communication

- URLs:
  - https://support.atlassian.com/statuspage/docs/what-is-statuspage/
  - https://support.atlassian.com/statuspage/docs/create-an-incident/
  - https://support.atlassian.com/statuspage/docs/read-the-statuspage-user-guide/
- Type: official vendor product documentation and practice guidance.
- Scope: customer-facing outages, scheduled maintenance, components, and subscriber updates in Statuspage.
- Observation: incident state and affected components drive a public history and optional email/SMS updates; documented states include investigating, identified, monitoring, and resolved. The guide recommends impact-focused, regular updates and a post-incident report.
- Supports: modelling incident identity, affected audience/component, observed symptom, known/unknown cause, workaround, update commitment, current state, resolved evidence, and subscriber delivery separately.
- Boundary: Statuspage's state labels and notification behavior are vendor conventions; the tool does not itself monitor systems, and a status value is not proof of actual health.
- Freshness risk: high.

### PC-044 — GOV.UK whole-service, multi-channel testing

- URLs:
  - https://www.gov.uk/service-manual/design/introduction-designing-government-services
  - https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use
- Type: government service standard and guidance.
- Scope: UK government services.
- Observation: service design must cover the user's problem from start to finish, front to back, and across digital, phone, post, face-to-face, suppliers, and internal operations. Teams should test online and offline parts with actual or potential users.
- Supports: treating a physical or staff handoff as an experience event with sender, recipient, transferred facts, delay, ownership, and recovery rather than an “external link.”
- Boundary: the standard's assessment regime is UK-government-specific; whole-journey reasoning is broader but needs domain evidence.
- Freshness risk: medium.

### PC-045 — NHS England Accessible Information Standard

- URLs:
  - https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/
  - https://www.england.nhs.uk/long-read/accessible-information-standard-implementation-guidance/
- Type: official NHS England information standard and implementation guidance.
- Scope: NHS and publicly funded adult social care in England; revised and republished 30 June 2025.
- Observation: organizations identify, record, flag, share, meet, and review a person's information and communication support needs. The implementation guidance says to ask people what support they need rather than infer it from a disability label and to carry those needs through referrals, discharge, handovers, correspondence, and staff action.
- Supports: modelling preferred/required format and support as governed person-specific context, with access controls and freshness, across digital-to-human handoffs.
- Boundary: statutory applicability is specific to the covered English health and care services; the underlying practice must not be used to collect unnecessary sensitive data elsewhere.
- Freshness risk: high for covered-service compliance; recheck revisions and implementation dates.

### PC-046 — W3C how people use assistive technology and label-in-name

- URLs:
  - https://www.w3.org/WAI/people-use-web/tools-techniques/
  - https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html
- Type: W3C accessibility education and non-normative WCAG understanding guidance.
- Scope: screen readers, magnification, speech input, switches, adaptive strategies, and web control naming.
- Observation: people use many combinations of mainstream and assistive technology, and availability varies by language and cost. Speech users commonly invoke visible labels, so mismatched accessible names create failures.
- Supports: avoiding “screen reader” as the sole nonvisual persona; testing serialized order, names, state announcements, speech activation, switch access, zoom, and reduced motion.
- Boundary: examples are not a complete assistive-technology compatibility matrix.
- Freshness risk: medium.

## Strong practitioner evidence used cautiously

### PC-047 — Nielsen Norman Group user control and hostile error-message guidance

- URLs:
  - https://www.nngroup.com/articles/user-control-and-freedom/
  - https://www.nngroup.com/articles/hostile-error-messages/
- Type: strong practitioner guidance derived from usability practice; not a normative standard.
- Scope: general interface heuristics and form-error critique.
- Observation: support undo/exit where possible; avoid premature error presentation, disclose constraints before failure, and reserve intrusive error styling for genuinely critical states.
- Supports: conditional preference for reversibility and appropriately timed validation.
- Boundary: heuristics need contextual user testing and cannot decide security, safety, or legal constraints.
- Freshness risk: medium.

### PC-048 — Nielsen Norman Group list-entry information hierarchy

- URL: https://www.nngroup.com/articles/list-entries/
- Type: strong practitioner guidance with examples and eye-tracking references.
- Scope: search, directory, ecommerce, and other result/listing pages; published 10 April 2016.
- Observation: result entries need enough prioritized attributes to support scanning and comparison without forcing excessive navigation; analytics and research should determine which attributes matter.
- Supports: defining result-card content models from decision needs instead of rendering arbitrary backend fields.
- Boundary: attention patterns vary by language direction, domain, device, and list purpose; the article is not a universal ranking algorithm.
- Freshness risk: medium.

## Evidence gaps opened by this pass

- Public comparative studies of the same semantic message rendered across UI, email, SMS, push, voice, CLI, API, and assistive modalities are scarce.
- Much design-system research is summarized without public protocols, samples, raw findings, or negative results.
- Evidence is disproportionately English-language and US/UK/large-platform based.
- Current official guidance is thin for partial success, cross-device continuation, multi-actor permission, shared-account offboarding, and generative-agent memory/tool consent.
- Platform guidance changes quickly and sometimes conflicts across Apple, Android, web, and regulated-domain obligations.
- A separate legal/applicability review is required for marketing communication, billing, consent, retention, identity, health, financial, children, and employment contexts.
- Primary research must include people using screen readers, speech input, switch access, magnification, captions/transcripts, cognitive supports, non-Latin scripts, right-to-left layouts, low-bandwidth devices, shared devices, and offline or staff-assisted services.
