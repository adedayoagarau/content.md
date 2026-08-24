---
title: Channel and modality content practice
status: working-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Channel and modality content practice

## Purpose and evidence boundary

This document defines how a semantic content decision should be selected, adapted, delivered, and evaluated across channels and modalities. It does not prescribe universal channel copy or assume that shrinking one string creates a valid mobile, voice, SMS, or assistive expression.

Claims use the canonical vocabulary in the research protocol:

- **[Sourced fact]** is a fact directly supported by the cited source within its declared scope.
- **[Documented practice]** is what a named organization or practitioner says it does; it is not a universal rule.
- **[Research finding]** is a study result bounded by its method, sample, and limitations.
- **[Cross-source finding]** is a pattern directly supported by more than one independent source.
- **[Inference]** is this research team's interpretation of evidence, not a source assertion.
- **[Proposal]** is a candidate system or practice choice that still requires validation and the applicable decision process.
- **[Open question]** is unresolved and names the evidence, method, or accountable role needed to resolve it; the agent must not turn it into an invented rule.

Scope and source type follow the claim label as secondary metadata when useful; for example, `scope: HTTP APIs; source type: standards-track RFC`.

Source scope, retrieval dates, limitations, and freshness risks are recorded in [patterns-channels-source-notes.md](../sources/patterns-channels-source-notes.md). Channel rules do not displace current law, platform requirements, security and privacy review, deliverability operations, or local-language judgment.

## Channel is not merely a container

**[Inference]** A channel changes the relationship among sender, recipient, context, attention, interaction, persistence, and delivery evidence. A surface is a concrete container within a channel; a modality is how information is perceived or acted on; a component is an implementation mechanism. These distinctions matter because one event may cross several of them.

| Dimension | Questions before choosing or adapting a channel |
|---|---|
| Participants | Who sends, receives, is described, is affected, and is authorized to act? Are they the same person? |
| Entry and continuity | Is this an interruption, a requested response, a durable record, a resumption path, or an in-task explanation? What has the recipient already seen? |
| Urgency and expiry | When does the information become useful, harmful, or stale? Does delay change the available action? |
| Sensitivity | What could be exposed on a lock screen, shared device, forwarded email, spoken interface, log, or printed letter? |
| Context capacity | Does the recipient have the relevant object, history, controls, and visual relationships in view, or must the expression stand alone? |
| Interaction model | Can they reply, navigate, invoke an action, correct input, interrupt, replay, copy, script, or hand off? |
| Delivery semantics | What can the system actually know: generated, queued, accepted, delivered, presented, read, acknowledged, or acted on? |
| Failure and fallback | What if address, device, app, network, authentication, capability, language support, or provider is unavailable? |
| Permission and preference | Is this communication necessary, optional, subscribed, consented, suppressed, or controlled by an OS/administrator? |
| Accessibility and locale | Which visual, audio, haptic, keyboard, speech, screen-reader, caption, transcript, script, direction, grammar, date, number, and unit requirements apply? |
| Retention and provenance | Where is the durable source of truth? What is stored, logged, forwarded, redacted, or discoverable? |
| Measurement | Which events can be observed reliably, and what cannot be inferred from opens, clicks, delivery receipts, or page views? |

**[Proposal]** Channel selection must be an explicit decision with evidence and constraints. The agent may propose expressions only after the semantic job, delivery contract, recipient, sensitivity, and fallback are known.

## Semantic continuity and expression identity

This practice follows [candidate-system-model.md](../08-synthesis/candidate-system-model.md).

### One semantic message, multiple expressions

```text
semantic identity:
product + journey + experience event + actor or need + semantic state
+ intended outcome or content job + represented concept/action

expression identity:
message_id + locale + channel + surface + component/pattern + slot
+ visible/assistive modality + variant/experiment + runtime condition
```

**[Inference]** Expressions can share a semantic identity when the controlled meaning, consequence, responsible actor, and available action remain the same. Channel-specific selection, ordering, repetition, markup, pronunciation, and detail can vary.

**[Inference]** Create a new or revised semantic decision when adaptation changes any of the following:

- what happened or is promised;
- who must act, who is affected, or who is represented;
- the consequence, commitment, right, obligation, eligibility, or risk;
- the available action or recovery path;
- the object or scope to which the message applies; or
- the certainty or evidentiary basis of the claim.

**[Inference]** Truncating away the renewal cadence, omitting the actor in a shared account, replacing “request received” with a completion claim, or changing a reversible action into an irreversible one is not a cosmetic expression change.

### Orthogonal evidence dimensions, independent decision/delivery states, and communication attempts

**[Proposal]** Each row is a separate record family, event stream, state machine, or set of orthogonal flags. Comma-separated values are normalized categories, not one required sequence; channel-native values remain preserved and mapped.

| Layer | Allowed states or orthogonal flags | Branch/control distinction |
|---|---|---|
| Evidence | observation set: `unobserved`, `observed`, `corroborated`; challenge flag: `undisputed` or `disputed`; freshness flag: `current` or `stale`; lineage flag: `active` or `superseded`; epistemic qualifier: `none`, `inferred`, or `assumed` | Challenge, freshness, lineage, and epistemic flags can coexist with the observation state; none imply decision approval |
| Decision | `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, `retired` | `rejected` is a sibling outcome to `approved`, not its next step; approval names an authorized approver, exact decision version, locale/jurisdiction, conditions, and scope |
| Product delivery | `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, `removed` | Verification may fail without advancing; rollback/removal can branch before observed-live; built is not released and released is not understood |
| Communication-attempt eligibility and suppression | `eligible`, `ineligible`, `suppressed`, `deduplicated` | Eligibility, preference/consent, suppression reason, and deduplication are attempt controls; they are not product-delivery or semantic-decision states |
| Dispatch/provider/client events | `scheduled`, `queued`, `sent`, `provider-accepted`, `delivered`, `presented`, `failed`, `expired`, plus mapped channel extensions such as `bounced` or `escalated` | Timestamped events can repeat, branch, fail, retry, fall back, or arrive out of order; preserve raw provider values and provenance; provider/client signals do not prove human attention or comprehension |
| Recipient-engagement events | `opened`, `acknowledged`, `acted` (`actioned` retained only as a source alias) | Engagement is a separate repeatable event stream and evaluation input; it does not prove comprehension, consent, product-state transition, or outcome |

**[Proposal]** Never collapse communication-attempt controls, provider/client events, or recipient-engagement events into the product-delivery state of the expression, the decision state, approval, or outcome evaluation.

## Cross-channel orchestration

```text
authoritative product event
        │
        ▼
semantic message decision ── applicability, claims, risk, accountable owners, scoped approvals
        │
        ├── in-product expression
        ├── assistive expression
        ├── email / SMS / push expression
        ├── conversational or voice expression
        ├── documentation / CLI / API expression
        └── staff / letter / physical handoff expression
                 │
                 ▼
delivery attempts and channel-specific states
                 │
                 ▼
receipt, interaction, recovery, outcome evidence
```

**[Inference]** The durable source of truth should remain discoverable even when an interruptive channel provides the first notice. Cross-channel expressions need a coordination key, applicability window, redaction policy, and stale-link behavior. Repeating the same wording everywhere is not consistency; preserving meaning and enabling the appropriate action is.

## Channel-family map

| Family | Strength | Structural limitation | Common false inference |
|---|---|---|---|
| Web | linkable, flexible, rich context, broadly assistive-capable | viewport/network/browser variability | desktop rendering proves responsive usability |
| Mobile app | contextual sensors, portable, push/deep-link integration | small/variable surface, interruption, OS lifecycle | device ownership implies private attention |
| Desktop app | persistent work, keyboard, windows, files, precision | dense/multiwindow context, OS conventions | larger canvas permits unprioritized content |
| Text chat/conversation | iterative clarification and repair | turn history, ambiguity, anthropomorphism | fluent response means grounded or complete |
| Voice/audio | eyes/hands-busy access, conversational speed | transient, serial, privacy/noise constraints | visual copy can be read aloud unchanged |
| Email | durable, addressable, asynchronous, forwardable | spoofing, clipping, client variance, delayed delivery | delivered/opened means understood |
| SMS | broad device reach, urgent concise notice | cost, length, carrier behavior, shared numbers, limited trust cues | phone number means current intended recipient |
| Push/OS notification | timely interruption and deep-link return | permission, lock-screen privacy, truncation, platform control | sent means presented or seen |
| Documentation | durable explanation, learning, reference, search | can drift from behavior; context switching | publishing docs fixes a poor or inaccessible flow |
| CLI | composable, scriptable, local/remote operations | mixed human/machine audience, terminal variance | decorative prose is harmless to automation |
| API | structured machine contract and programmatic recovery | consumer owns presentation; compatibility obligations | human sentence is a stable error contract |
| Status page | public/shared operational source of truth | separate telemetry and subscription system | status tool detects incidents itself |
| Assistive/nonvisual | access through alternate perception/input | semantics, order, timing, and mode vary | hidden text alone creates accessibility |
| Physical/staff/letter handoff | reaches offline contexts and supports complex service | organizational seams, delay, identity, record transfer | digital completion equals service completion |

## 1. Web

### Before writing

**[Proposal]** Know route and entry variants, viewport/reflow behavior, authentication, browser navigation, server/client state, URL persistence, focus and announcement model, network/offline behavior, SEO/public indexing, locale routing, cookies/storage, and whether content is server-rendered, streamed, personalized, or embedded.

### Evidence and scope

- **[Documented practice]** **Scope:** WCAG 2.2 web content. WCAG's [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), [Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum), [Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), and [Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html) guidance covers zoom/reflow, target access, alignment of visible labels and accessible names, and non-focus status announcements.
- **[Sourced fact]** **Scope:** complete web pages and processes. **Source type:** normative standard. [WCAG 2.2](https://www.w3.org/TR/WCAG22/) evaluates conformance on complete pages and all pages in an in-scope process, not isolated strings or components.

### Conditional rules and counterexamples

- **[Inference]** A responsive expression may reorder or progressively disclose supporting detail, but required meaning, relationship, and action cannot disappear at narrow widths or zoom.
- **[Inference]** Native browser behavior such as back, refresh, link opening, copy, autofill, and history should be preserved unless product safety requires an evidenced exception.
- **[Inference]** Public pages may need search/social metadata expressions distinct from signed-in product content. Indexable snippets must not expose personalized or controlled information.
- **[Inference]** Streaming can show useful progress, but incomplete generated text must not be presented as a final controlled answer.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model initial navigation, loading/hydration, authenticated/unauthenticated, empty, stale, offline, partial render, route not found, permission denied, server failure, and session expiry. Preserve deep links and input where safe; make refresh/retry semantics explicit. Test keyboard, zoom, high contrast, screen reader, speech input, browser translation, text expansion, privacy/storage behavior, and security boundaries across actual breakpoints.

### Evaluation and agent implications

**[Proposal]** Evaluate complete tasks and recovery across browsers, viewport/reflow, input modes, connection states, and entry routes.

**[Proposal]** Inventory route-, server-, client-, and assistive-rendered occurrences; do not infer complete coverage from static source search or one desktop screenshot.

## 2. Mobile app

### Before writing

**[Proposal]** Know device and OS range, orientation, adaptive layouts, deep links, app lifecycle and background work, connectivity, keyboard/IME, permissions, notification path, biometric/device authentication, shared-device risk, app-store obligations, and whether phone/tablet/foldable experiences share one resource.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple platforms. Apple's [layout guidance](https://developer.apple.com/design/human-interface-guidelines/layout) requires adaptation to device, orientation, window, safe area, and accessibility settings; [accessibility guidance](https://developer.apple.com/design/human-interface-guidelines/accessibility) covers perceivable, operable, understandable experiences across platform features.
- **[Documented practice]** **Scope:** Android adaptive apps. Android's [adaptive-app guidance](https://developer.android.com/develop/adaptive-apps) and [adaptive dos and don'ts](https://developer.android.com/develop/adaptive-apps/guides/adaptive-dos-and-donts) treat window size, posture, input, and continuity as runtime conditions rather than phone/tablet forks alone.

### Conditional rules and counterexamples

- **[Inference]** Smaller windows require priority and progressive disclosure, not automatic abbreviation. If truncation removes consequence or disambiguation, change layout or create a safe short expression linked to full context.
- **[Inference]** Device capability does not establish permission or appropriateness. Camera, location, contacts, microphone, biometrics, clipboard, and notification access require contextual behavior and fallback.
- **[Inference]** Mobile can be a private personal device, a shared family phone, an employer-managed device, a kiosk, or a folded/tablet window. Avoid privacy assumptions based on form factor.
- **[Inference]** Gestures can accelerate expert use but need discoverable and operable alternatives.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model cold start, restored state, interrupted foreground, backgrounded operation, offline queue, OS-terminated flow, permission denied/revoked, deep-link stale/unauthorized, device change, and update/migration. Define whether work persists and how re-entry works. Test large text, screen reader, switch/keyboard, voice control, reduced motion, orientation/posture, external display, locale expansion, lock-screen privacy, and network loss.

### Evaluation and agent implications

**[Proposal]** Evaluate first and resumed use across window sizes, input modes, interruptions, permissions, bandwidth, and shared-device scenarios.

**[Proposal]** Bind expressions to adaptive runtime states and platform-specific requirements; do not treat a single “mobile string limit” as a content rule.

## 3. Desktop app

### Before writing

**[Proposal]** Know operating systems, window sizes and density, multiwindow/document model, menus and command surfaces, keyboard conventions, file permissions, background/system-tray behavior, updates, offline/local-versus-cloud state, and interactions with OS dialogs and accessibility APIs.

### Evidence and scope

- **[Documented practice]** **Scope:** Windows apps. Microsoft's [keyboard interaction guidance](https://learn.microsoft.com/en-us/windows/apps/develop/input/keyboard-interactions) covers focus, shortcuts, access keys, and keyboard-operable controls; its [app best practices](https://learn.microsoft.com/en-us/windows/apps/get-started/best-practices) address responsive layout, navigation, accessibility, and system integration for Windows apps.
- **[Documented practice]** **Scope:** Apple platforms. Apple [layout](https://developer.apple.com/design/human-interface-guidelines/layout) and [accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility) guidance also applies to resizable windows, system conventions, and accessibility settings on macOS and related platforms.

### Conditional rules and counterexamples

- **[Inference]** A large canvas can support comparison and persistent context, but density must follow task priority; it is not permission to expose every backend field.
- **[Inference]** Labels may differ between menu, toolbar, context menu, command palette, shortcut help, and confirmation while retaining one action concept. Visible label, accessible name, and command vocabulary must remain discoverably related.
- **[Inference]** “Saved” must distinguish local, synced, exported, published, or committed state. Desktop file metaphors do not guarantee cloud semantics.
- **[Inference]** OS-standard dialogs and terms may take precedence over brand expression where integration or familiarity matters.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model document dirty/saved/synced/conflicted, window/session restored, background operation, offline, file moved/locked, permission lost, update required, multi-instance conflict, crash recovery, and external change. Provide keyboard-complete operation, focus visibility, screen-reader semantics, zoom/text scaling, high contrast, reduced motion, and locale-aware menus/shortcuts. Protect local paths, recent-item lists, notifications, and shared workstation data.

### Evaluation and agent implications

**[Proposal]** Evaluate full workflows by keyboard and assistive technology, window resizing, file/sync conflict, interruption, and cross-platform terminology.

**[Proposal]** Discover menu, shortcut, system integration, file, and background expressions in addition to main-window UI; flag ambiguous save/sync/publish boundaries.

## 4. Text conversation and chat

### Before writing

**[Proposal]** Know participant identities and disclosure, assistant capability, grounding sources, the exact authorized tool/action scope, memory and retention, turn context, supported intents, uncertainty policy, repair, refusal, escalation/handoff, latency, transcript portability, and whether a human may join.

### Evidence and scope

- **[Documented practice]** **Scope:** legacy Google Assistant conversation-design method. Google's [sample-dialog guidance](https://developers.google.com/assistant/conversation-design/write-sample-dialogs) uses spoken sample dialogs, persona, and repair paths before implementation. The product/runtime guidance is legacy; use the design method, not deprecated implementation rules.
- **[Documented practice]** **Scope:** IBM enterprise conversational AI. IBM's [conversation](https://www.ibm.com/design/ai/conversation/) and [planning](https://www.ibm.com/design/ai/conversation/planning/) guidance emphasizes user goals, system capability, context, repair, escalation, and responsible AI planning.
- **[Documented practice]** **Scope:** Microsoft Copilot Studio. Microsoft's [fallback guidance](https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/cux-fallbacks) covers progressive clarification, fallback, escalation, and handoff in that platform.

### Conditional rules and counterexamples

- **[Inference]** Conversation is useful when intent is underspecified, iterative explanation helps, or the next step depends on context. It is inefficient for stable dense comparison, exact scanning, or high-volume repetitive input that a structured interface handles better.
- **[Inference]** A fluent agent response is not evidence of truth, authorization, completion, or human review. State uncertainty, sources, tool actions, and result boundaries according to risk.
- **[Inference]** Open-ended repair can help after misunderstanding, but bounded choices are safer when the system has a small known capability set or a consequential ambiguity.
- **[Inference]** Do not mimic a human relationship or conceal automation. Tone warmth cannot compensate for false capability or lost context.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model new/returning conversation, context available/expired, intent understood/ambiguous/out of scope, generation/tool pending, clarification, confirmation, action completed/failed/partial, refusal, unsafe request, handoff offered/queued/connected/failed, and memory stored/revoked. Allow correction, interruption, review before consequential tool use, and transcript/context handoff. Protect prompts, tool outputs, secrets, other actors' data, and sensitive history.

### Evaluation and agent implications

**[Proposal]** Evaluate task resolution, grounding and calibration, clarification turns, correction recovery, action accuracy, unsafe behavior, handoff success, accessibility, and whether people understand system identity/capability.

**[Proposal]** Separate conversational realization from tool authorization and product result; never treat generated natural language as the source of truth.

## 5. Voice and audio conversation

### Before writing

**[Proposal]** In addition to conversational inputs, know environment/noise, privacy, wake/activation, microphone state, language/voice, recognition confidence, interruption/barge-in, replay, screen availability, captions/transcript, speech rate, pronunciation, sensitive-output policy, and fallback to visual or human channels.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple Siri and related integrations. Apple's current [Siri guidance](https://developer.apple.com/design/human-interface-guidelines/siri) asks spoken and visual responses to stand alone, stay concise under repetition, use familiar terms, avoid device-specific assumptions, and handle situation-specific failure.
- **[Documented practice]** **Scope:** legacy Google Assistant design method. Google's [conversation overview](https://developers.google.com/assistant/conversation-design/learn-about-conversation) and [confirmations](https://developers.google.com/assistant/conversation-design/confirmations) distinguish implicit and explicit confirmation by confidence and consequence. Runtime details are legacy, but the risk-based design distinction remains a useful hypothesis.

### Conditional rules and counterexamples

- **[Inference]** Spoken output is serial and transient. Put the outcome and decision-relevant information early; avoid reading visual navigation, punctuation, or dense option grids verbatim.
- **[Inference]** Explicit confirmation is appropriate when recognition uncertainty and consequence warrant it; constant repetition makes routine use slow and can train people to ignore confirmation.
- **[Inference]** Audio may be hands-free but not private. Ask before speaking sensitive detail and offer transfer to a private visual or authenticated channel.
- **[Inference]** A visual companion may carry detail, but each modality must contain enough information to understand its state and next action without requiring inaccessible cross-reference.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model not listening/listening, speech detected, recognizing, low confidence, clarification, confirmation, processing, speaking, interrupted, no input, no match, action failed/partial/complete, device unavailable, and handoff. Support pause, repeat, slower speech, correction, cancellation, transcript/caption, keyboard/touch alternative, and safe timeout. Localize pronunciation, names, numbers, dates, currency, and speech grammar with native review.

### Evaluation and agent implications

**[Proposal]** Test in realistic noise, accents/dialects, speech impairments, multiple speakers, privacy contexts, and screen/no-screen configurations. Measure recognition plus semantic/task recovery, not word error rate alone.

**[Proposal]** Generate spoken and visual expressions as linked variants with separate constraints, and require risk/confidence evidence before choosing confirmation depth.

## 6. Email

### Before writing

**[Proposal]** Know verified sender/domain, recipient identity and authorization, transactional or promotional class, trigger and expiry, subject/preheader/body roles, client rendering, reply handling, authentication/deep links, attachments, unsubscribe/preferences, bounce/complaint handling, retention, and canonical in-product record.

### Evidence and scope

- **[Documented practice]** **Scope:** UK government services. GOV.UK's [email and text guidance](https://www.gov.uk/service-manual/design/sending-emails-and-text-messages) says communications should be expected, recognizable, useful, and connected to the service; [email technology guidance](https://www.gov.uk/service-manual/technology/how-to-email-your-users) covers sender reputation, authentication, testing, monitoring, and sensitive information.

### Conditional rules and counterexamples

- **[Inference]** Put identifying context and the content job in the subject without exposing sensitive detail. Promotional techniques such as artificial urgency are inappropriate for transactional, security, billing, or support records.
- **[Inference]** Email can be durable and forwardable, which helps records but increases privacy and stale-information risk. Keep mutable authoritative detail in an authenticated destination when appropriate, while the email remains intelligible if the link expires.
- **[Inference]** HTML supports hierarchy, but plain-text, image blocking, clipping, dark mode, and assistive reading remain real conditions. Do not put essential meaning only in an image or layout.
- **[Inference]** A no-reply address is acceptable only when a clear effective alternative exists and the apparent sender relationship is not deceptive.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model eligible/suppressed, scheduled, rendered, queued, provider accepted, delivered, delayed, bounced, complained, unsubscribed, opened where measurable, link expired, and actioned. Define duplicate suppression, corrected-message behavior, reply routing, compromised link, and channel fallback. Localize subject and body together; support text expansion, direction, alt text, semantic markup, and accurate date/time-zone and currency formatting.

### Evaluation and agent implications

**[Proposal]** Measure task outcome, delivery/bounce/complaint, unsubscribe, reply resolution, stale-link recovery, comprehension, accessible rendering, and sensitive exposure; do not use opens as proof of reading.

**[Proposal]** Keep subject, preheader, body, plain-text, and assistive markup as coordinated expressions; inspect deliverability and preference contracts before drafting.

## 7. SMS and text messaging

### Before writing

**[Proposal]** Know number verification and reassignment risk, recipient consent/preference, transactional category, sender identification, urgency/expiry, message segmentation and encoding, carrier delay/filtering, cost, reply support, shortened-link governance, international routing, quiet hours, and fallback.

### Evidence and scope

- **[Documented practice]** **Scope:** UK government services. GOV.UK's [secure SMS guidance](https://www.gov.uk/service-manual/technology/sending-text-messages-securely) covers minimization of sensitive content, sender identification, link security, delivery limitations, and operational controls; its [email/text design guidance](https://www.gov.uk/service-manual/design/sending-emails-and-text-messages) treats texts as part of a whole service rather than standalone marketing copy.

### Conditional rules and counterexamples

- **[Inference]** Concision cannot remove sender, reason, expiry, or material consequence. If those cannot fit safely, use SMS as a privacy-safe alert that points to an authenticated source, not a compressed contract.
- **[Inference]** SMS may be appropriate for time-sensitive reminders or recovery codes but weak for detailed consent, comparison, complex recovery, or content that is unsafe on a shared/reassigned number.
- **[Inference]** Link shorteners reduce context and can resemble phishing. Use controlled domains and explain destination when a link is necessary.
- **[Inference]** Two-way reply commands require exact operational support, clear scope, and locale handling; do not imply replies are monitored when they are not.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model eligible/suppressed, scheduled, segmented, queued, carrier accepted, delivered where signaled, delayed, failed, opted out, number invalid/reassigned, reply received/unrecognized, link expired, and escalated. Define resend, deduplication, opt-out propagation, and alternate channel. Account for Unicode segmentation, right-to-left text, names/numbers, costs, screen-reader pronunciation, and lock-screen privacy.

### Evaluation and agent implications

**[Proposal]** Evaluate delivery latency, failure/reassignment, task completion, opt-out, phishing reports, support reply resolution, and accessibility across devices/languages.

**[Proposal]** Calculate channel constraints from the localized rendered message and provider behavior, not English character count alone; never expose secrets beyond the threat model.

## 8. Push and operating-system notifications

### Before writing

**[Proposal]** Know OS/platform, user permission and category/channel preference, trigger, urgency, grouping, collapse/deduplication, lock-screen privacy, actions, deep-link authentication, badge/sound/haptic policy, expiry, background behavior, and in-product source of truth.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple platforms. Apple's [notification guidance](https://developer.apple.com/design/human-interface-guidelines/managing-notifications) emphasizes useful permission-based interruption, grouping, relevance, and user control.
- **[Documented practice]** **Scope:** Android. Android's [notification guidance](https://developer.android.com/design/ui/mobile/guides/home-screen/notifications) defines glanceable hierarchy, notification channels/categories, actions, grouping, and platform presentation.

### Conditional rules and counterexamples

- **[Inference]** Ask for permission when the person can understand the category and benefit, not automatically at first launch. Some critical enterprise or system contexts are administrator-controlled and need a different explanation.
- **[Inference]** Full detail may help immediate action but expose private data. Create a redacted expression or defer detail to authentication when risk warrants.
- **[Inference]** Action buttons are suitable only when the consequence is clear and safely executable from the notification context. High-consequence actions may need review or authentication.
- **[Inference]** Badges, sounds, and urgency levels are behavioral policy, not decoration; reserve them for defined need and user control.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model permission unknown/requested/granted/denied/revoked, event eligible/suppressed, queued, provider accepted, device received, presented, grouped/replaced, opened, actioned, expired, and deep link stale/unauthorized. Define cross-device clearing and in-product history. Test screen-reader output, action labels, truncation, large text, lock-screen modes, localization, shared devices, and malicious deep-link handling.

### Evaluation and agent implications

**[Proposal]** Measure usefulness, opt-in quality, opt-out/category changes, dismiss, stale/duplicate interruption, action success, privacy incidents, and task outcomes.

**[Proposal]** Do not infer presentation or awareness from send receipts; require a privacy-safe truncated expression and a full destination state.

## 9. Documentation

### Before writing

**[Proposal]** Know audience and prerequisite knowledge, task or concept job, supported versions, platform/language, authoritative product behavior, accountable implementation and documentation-maintenance roles, release cadence, discoverability/search vocabulary, localization, accessibility, runnable examples, deprecation, support route, and feedback path.

### Evidence and scope

- **[Documented practice]** **Scope:** Google developer documentation. The [Google developer documentation style guide](https://developers.google.com/style) covers audience-focused, accessible, consistent technical writing; its [procedure guidance](https://developers.google.com/style/procedures) and [code-syntax guidance](https://developers.google.com/style/code-syntax) distinguish conceptual explanation, ordered tasks, code, placeholders, and results.

### Conditional rules and counterexamples

- **[Inference]** Tutorials support guided learning, how-to procedures support a goal, reference describes exact interfaces, concepts explain a model, and troubleshooting supports diagnosis/recovery. One page should not pretend these jobs are identical.
- **[Inference]** Documentation can explain complexity but must not become the only path through an inaccessible or unsafe product interaction.
- **[Inference]** Working examples improve confidence only when versioned, tested, safe, complete enough to run, and explicit about destructive or billable side effects.
- **[Inference]** Search terminology may include aliases and legacy terms while the preferred product concept remains controlled.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model draft/reviewed/published, version current/older/prerelease, deprecated/removed, example tested/failing, localization current/stale, and link valid/broken. Provide version switch, migration, rollback/recovery, expected result, failure diagnosis, and support escalation. Use semantic headings, descriptive links, text alternatives, keyboard-operable examples, copy-safe code, locale-aware screenshots, and no live secrets.

### Evaluation and agent implications

**[Proposal]** Evaluate task completion from docs, search success, example execution, support deflection without unresolved harm, version mismatch, broken links, accessibility, and feedback themes.

**[Proposal]** Tie claims and examples to tested versions and code; flag documentation that promises absent behavior or lacks an accountable maintenance role and review trigger.

## 10. Command-line interfaces

### Before writing

**[Proposal]** Know human versus scripted use, command grammar, flags/arguments, defaults, stdin/stdout/stderr, exit codes, TTY/non-TTY behavior, destructive and external side effects, idempotency, authentication, environment/config precedence, progress, structured output, localization policy, and shell/platform support.

### Evidence and scope

- **[Documented practice]** **Scope:** general CLI design, strong practitioner guidance. [Command Line Interface Guidelines](https://clig.dev/) recommends human-readable help, examples and next commands, truthful progress, clear side effects, stdout/stderr separation, meaningful exit codes, noninteractive behavior, and machine-readable output where needed. It is a practitioner guide, not a normative standard.

### Conditional rules and counterexamples

- **[Inference]** Human prose belongs in interactive/help/error contexts; stable machine behavior belongs in exit codes, structured output, and documented schemas. Scripts must not parse decorative sentences as a contract.
- **[Inference]** Interactive prompts can protect humans but break automation. Require explicit noninteractive flags and fail safely when input is unavailable; never silently accept a destructive default.
- **[Inference]** Color, spinners, links, and terminal control can aid a TTY but need plain/no-color behavior for logs, pipes, reduced motion, and assistive use.
- **[Inference]** Localization may help human-facing CLI text but can destabilize parsing and support instructions. Keep machine tokens stable and declare locale behavior.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model parse/usage failure, authentication required, preflight, confirmation, running, backgrounded, succeeded, partial, cancelled/interrupted, dependency/network failure, conflict, and rollback. State whether external changes occurred, how to inspect, retry, resume, undo, or clean up. Redact credentials and sensitive paths; avoid secrets in arguments/history; support keyboard-only/plain output by nature, but test screen-reader ordering and verbosity.

### Evaluation and agent implications

**[Proposal]** Test humans and scripts across shells, terminals, pipes, CI, slow networks, interruption, permissions, and failure; validate exit codes and structured schemas independently from prose.

**[Proposal]** Treat help, errors, progress, exit codes, and schemas as coordinated but separate expressions; never “improve” stable tokens without compatibility review.

## 11. APIs and SDK-facing messages

### Before writing

**[Proposal]** Know protocol and version, consumer type, authentication/authorization, operation semantics, canonical status/code taxonomy, retry/idempotency, rate limits, field-level versus request-level failure, partial/batch model, localization policy, correlation/support identifiers, sensitive-detail policy, compatibility and deprecation, and documentation mapping.

### Evidence and scope

- **[Sourced fact]** **Scope:** HTTP APIs. **Source type:** standards-track RFC. [RFC 9457](https://www.rfc-editor.org/rfc/rfc9457.html) defines Problem Details fields and extension mechanisms for machine-readable HTTP API errors; it warns that problem details are not a debugging dump and require security review.
- **[Documented practice]** **Scope:** Google-style APIs. [AIP-193](https://google.aip.dev/193) uses canonical error codes, separates machine handling from human-readable messages, limits localization of developer-facing messages, and constrains partial errors.

### Conditional rules and counterexamples

- **[Inference]** Human-readable `detail` helps diagnosis but must not be the stable branch key. Consumers should use documented types/codes/fields; changing a sentence must not break integration.
- **[Inference]** Localize developer-facing errors only when the API contract and support model can preserve reproducibility. End-user localization usually belongs in the consuming product with structured cause data.
- **[Inference]** Return field-level detail when the consumer can correct it and disclosure is safe. Avoid enumerating protected resource existence or internal stack/infrastructure.
- **[Inference]** A batch with mixed outcomes needs per-item identity and state; an HTTP success alone must not erase unit failures.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model request invalid, unauthenticated, unauthorized, not found or nondisclosable, conflict, precondition failed, rate-limited, dependency unavailable, accepted/long-running, cancelled, deadline exceeded, partial, and complete. Define retryability, retry-after, idempotency keys, operation polling, deprecation, and support correlation. Keep secrets and personal data out of URLs/errors/logs; define Unicode, locale, time, number, and identifier handling.

### Evaluation and agent implications

**[Proposal]** Use contract, compatibility, fuzz, security, failure-injection, retry, and consumer-integration tests; measure time to diagnose and unsafe retries, not message preference.

**[Proposal]** Generate prose only from approved structured semantics, preserve stable codes/types, and block raw exception propagation.

## 12. Status pages and incident communication

### Before writing

**[Proposal]** Know monitored components and customer-facing names, impact and audience, incident source and commander, detection confidence, start time/time zone, lifecycle states, update cadence, subscription channels, support relationship, security disclosure constraints, maintenance model, resolution criteria, and post-incident link.

### Evidence and scope

- **[Documented practice]** **Scope:** Atlassian Statuspage product. Atlassian's [Statuspage overview](https://support.atlassian.com/statuspage/docs/what-is-statuspage/), [incident creation](https://support.atlassian.com/statuspage/docs/create-an-incident/), and [user guide](https://support.atlassian.com/statuspage/docs/read-the-statuspage-user-guide/) document `investigating`, `identified`, `monitoring`, and `resolved` phases, affected components, subscriber updates, and a separation between the communication tool and actual monitoring. This is vendor-product documentation, not independent incident-outcome evidence.

### Conditional rules and counterexamples

- **[Inference]** Status should describe user-observable impact and known scope, not speculation or internal component names with no customer meaning.
- **[Inference]** “Resolved” requires a defined customer-impact criterion; a deployed fix, improving metric, or monitoring period may be a different state.
- **[Inference]** An exact next-update time is useful when operations can meet it. Otherwise provide the current cadence or condition without invented precision.
- **[Inference]** Security incidents may require controlled disclosure, but withholding detail does not justify falsely minimizing impact.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model suspected/unconfirmed, investigating, identified, mitigation underway, recovering, monitoring, resolved, regressed, and postmortem available. Preserve chronological updates and corrections; distinguish affected components/regions/cohorts and ongoing user remediation. Make status accessible without primary-product authentication where appropriate, support time-zone clarity and subscription preferences, and protect confidential response details.

### Evaluation and agent implications

**[Proposal]** Evaluate time to first accurate notice, update-cadence adherence, scope/impact accuracy, correction quality, subscriber delivery, support demand, accessibility, and whether resolution matched real recovery.

**[Proposal]** Draft only from facts and timestamps authorized by the accountable incident commander or declared operational source of truth, preserve uncertainty, and never infer system health from the publishing tool.

## 13. Assistive and nonvisual modalities

### Before writing

**[Proposal]** Know the semantic structure, accessible names/descriptions, roles/states/properties, reading and focus order, live-region behavior, keyboard/switch/speech input, magnification/reflow, captions/transcripts/audio description, haptics, braille implications, cognitive supports, and platform/assistive-technology combinations in scope.

### Evidence and scope

- **[Documented practice]** **Scope:** web accessibility education. W3C's [tools and techniques used by people with disabilities](https://www.w3.org/WAI/people-use-web/tools-techniques/) describes varied combinations of assistive technologies, adaptive strategies, and settings; no single “screen-reader user” profile represents the population.
- **[Sourced fact]** **Scope:** WCAG 2.2 web content. **Source type:** normative standard with non-normative explanations. [Label in Name](https://www.w3.org/WAI/WCAG22/Understanding/label-in-name.html), [Status Messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html), [Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html), and the wider [WCAG 2.2](https://www.w3.org/TR/WCAG22/) establish relevant web requirements. Platform guidance may add native-app requirements.

### Conditional rules and counterexamples

- **[Inference]** An accessible expression is not necessarily the visible sentence repeated in hidden text. It may need object, state, relationship, position, consequence, or action information that visual layout supplies—but its semantic decision must stay aligned.
- **[Inference]** More description is not automatically more accessible. Repeated, stale, overly live, or layout-narrating output can bury the task. Prioritize information needed to perceive state and act.
- **[Inference]** Tooltips and hover-only instruction do not serve touch, keyboard, speech, or many screen-reader contexts. Essential information needs a persistent or programmatically available path.
- **[Inference]** Screen-reader testing alone does not cover magnification, speech input, switch access, captions, hearing access, cognition, color/contrast, motion, or keyboard interaction.

### State, recovery, and cross-cutting requirements

**[Proposal]** Coordinate visible and accessible name, description, value, selected/expanded/disabled state, error, progress, announcement priority, and focus movement across initial, changed, failed, and completed states. Provide skip/navigation landmarks, alternatives to timed/gesture/audio-only operation, and recovery after focus loss. Localize accessible text and pronunciation; do not expose hidden sensitive detail to the accessibility tree.

### Evaluation and agent implications

**[Proposal]** Test complete tasks with relevant disabled people and actual device/browser/AT combinations, including errors, async changes, and re-entry. Combine expert audits with user research.

**[Proposal]** Inventory accessibility-tree and media expressions as first-class occurrences linked to the semantic message; flag hidden duplicates, mismatched names, announcement storms, and missing state—not merely absent alt attributes.

## 14. Physical service, staff, phone, and letter handoffs

### Before writing

**[Proposal]** Know the end-to-end service, online/offline entry points, staff and partner roles, hours/locations/costs, identity and authorization, appointment/wait/queue behavior, documents and evidence, language/communication needs, record transfer, case ownership, escalation, safeguarding, privacy in shared spaces, and failure when a person cannot use the expected channel.

### Evidence and scope

- **[Documented practice]** **Scope:** UK government services. GOV.UK's [whole-service introduction](https://www.gov.uk/service-manual/design/introduction-designing-government-services) and [service-standard point 4](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use) define the service from start to finish across digital, phone, post, and face-to-face routes and call for testing online and offline parts together.
- **[Sourced fact]** **Scope:** NHS-funded care and services in England. **Source type:** official information standard and guidance. The revised NHS England [Accessible Information Standard requirements](https://www.england.nhs.uk/long-read/accessible-information-standard-requirements-dapb1605/) and [implementation guidance](https://www.england.nhs.uk/long-read/accessible-information-standard-implementation-guidance/) require services in scope to identify, record, flag, share, meet, and review disability-related information and communication support needs. Guidance says to ask the specific support need rather than infer it from a condition.
- **[Documented practice]** **Scope:** UK government letters. GOV.UK's [letter guidance](https://www.gov.uk/service-manual/design/writing-effective-letters) treats letters as a designed service interaction with clear purpose, actions, deadlines, contact, and testing.

### Conditional rules and counterexamples

- **[Inference]** A handoff is complete only when the receiving channel or organization can continue the case with the person's authorization and necessary context. Giving a phone number is a referral, not proof of transfer.
- **[Inference]** Digital self-service can improve speed for some and exclude others. Assisted digital, interpreter, relay, representative, postal, or in-person paths must reflect actual capability and not become lower-quality dead ends.
- **[Inference]** Do not infer communication format or support from a diagnosis, age, location, name, or prior contact alone. Ask, record, confirm, and update the specific need within lawful scope.
- **[Inference]** Printed letters provide a durable record but are delayed, shareable, and visible to household members; time-critical or sensitive content may require coordinated channels.

### State, recovery, and cross-cutting requirements

**[Proposal]** Model referral offered/accepted, consent to share, evidence packaged, sent, received, acknowledged, appointment scheduled, queued, attended/missed, case assigned, more information needed, resolved, returned, escalated, and lost handoff. Give the person a reference, responsible organization, expected next step and timing, accessible contact, and recovery if nothing happens. Define corrections when addresses, formats, interpreters, representatives, or accessibility needs change.

### Evaluation and agent implications

**[Proposal]** Evaluate end-to-end success rather than digital completion: successful receipt, transfer count, repeated explanation/evidence, wait accuracy, missed contact, language/accessibility fulfillment, case resolution, and safeguarding/privacy incidents.

**[Proposal]** Represent staff scripts, call-center tools, letters, notices, signage, appointment messages, and handoff records as content-bearing occurrences; require confirmation from the accountable operational role before stating service availability or timing.

## Cross-channel consistency and adaptation rules

| Decision | Must remain invariant when true | May vary by expression | Requires a new/revised semantic decision when changed |
|---|---|---|---|
| Event outcome | what actually happened and its certainty | order, compression, supporting explanation | queued becomes complete; partial becomes full success |
| Actor and object | who acts/is affected and what scope is involved | pronoun/name use allowed by privacy and context | a workspace action is reframed as personal-only |
| Consequence | material effect, commitment, right, risk, and expiry | progressive disclosure if still available before action | renewal, deletion, entitlement, or legal effect changes |
| Action and recovery | available safe next step and preconditions | channel-specific control or route | SMS reply becomes in-app review with different commitment |
| Controlled facts | authoritative amount, date, policy, eligibility, status | locale formatting and permitted summarization | jurisdiction or plan changes the fact/obligation |
| Tone | respect, accountability, urgency proportional to state | rhythm, speech markers, formality, audible repetition | tone falsely changes certainty or responsibility |
| Evidence record | exact evidence sources plus orthogonal observation-strength, challenge, freshness, lineage, and epistemic dimensions | citation presentation | a source, dimension, or supported claim changes |
| Governing applicability | separately identified governing instrument, version/effective date, jurisdiction, claim type, and recorded applicability | placement or disclosure format within the instrument's rules | a different instrument applies or the prior applicability record no longer covers the claim |
| Ownership and approval | accountable owner by responsibility type plus the authorized approver, exact approval record, conditions, and scope | presentation of a noncontrolled attribution | a new claim, audience, channel, locale, or condition falls outside the approval record |
| Decision | exact semantic-decision version and independent decision state | expression-specific decision reference | the channel needs meaning not covered by the approved decision version |

**[Inference]** Cross-channel synchronization also needs:

- a canonical event or content-object reference rather than string matching;
- expiry and stale-expression handling;
- recipient and authorization checks at every destination;
- locale, channel, and assistive fallbacks that preserve controlled meaning;
- duplicate and contradiction detection;
- preference, consent, and redaction policy by communication class;
- durable history where the person needs proof or recovery; and
- metrics that separate generation, dispatch, delivery, engagement, completion, and comprehension.

## Cross-channel evaluation framework

| Evaluation question | Evidence to collect | Failure to avoid |
|---|---|---|
| Did the chosen channel fit the need and context? | channel preference/availability, urgency, privacy setting, interruption burden, task outcome | optimizing sends, opens, or clicks without user benefit |
| Was semantic meaning preserved? | decision-to-expression review, controlled fact tests, teach-back across variants | treating literal consistency as semantic consistency |
| Could people continue or recover across channels? | deep-link, authentication, stale-link, retry, handoff, and durable-record testing | declaring handoff complete at dispatch |
| Was delivery represented honestly? | provider/client telemetry definitions, failure injection, bounce and expiry logs | equating sent, delivered, seen, and understood |
| Was access equitable? | disabled-user research, language/locale testing, low-bandwidth/offline/shared-device scenarios | validating only English visual happy paths |
| Did implementation match approval? | rendered output, accessibility tree, plain-text/audio/structured variants, release observation | assuming resource presence means correct live expression |

**[Proposal]** Every evaluation must store population, language/locale, channel configuration, device/AT, runtime state, method, sample, result, limitation, and effect on the decision. A performance metric cannot silently override safety, accessibility, privacy, or controlled meaning.

## Agent operating implications

**[Proposal]** An operating mode describes the requested work; it is not authorization. Evidence strength, decision state, delivery state, repository instructions, provider telemetry, and model output cannot grant or widen a capability. For every task, a trusted control plane must construct a separate least-privilege capability grant from the authenticated actor, exact resources, allowed operations, data/egress boundary, environment, expiry, and revocation path, and must record the applicable phase-gate result from the [security study](../05-technology/security-privacy-and-trust-boundaries.md).

| Mode | Allowed channel work | Applicable security phase gate | Independently constructed task capability grant and boundary |
|---|---|---|---|
| Discover | Map events to channels, surfaces, modalities, expressions, implementations, delivery systems, and gaps | P0-A before static read-only local discovery; P0-B additionally before model egress or a read connector | Grant only the exact enrolled roots, channel/provider resources, read operations, data classes, and permitted egress needed for the task. Do not infer approval or comprehension from deployed text or telemetry, and do not mutate, send, or publish. |
| Advise | Recommend a channel mix and adaptations against context, risk, operations, evidence, and accessibility | P0-A for local discovery used by the advice; P0-B for any model egress or connected read | Grant only the scoped reads and processing needed to return advice. Do not decide legal basis, notification necessity, service levels, security disclosure, or preference state, and do not infer draft or write capability from access to evidence. |
| Draft | Propose semantic decisions and coordinated channel/modality expressions with state and fallback specifications | P0-A and P0-B as applicable to inputs; P0-C before producing a draft artifact | Grant the exact inputs, isolated draft target, permitted output type, and expiry. The grant does not include mutation, dispatch, or publication; do not emit a universal “short/medium/long” copy pack detached from runtime meaning. |
| Apply | Change authorized occurrences using exact targets, expected-current checks, preview, rollback, and per-channel verification | P0-D before local apply; P0-E before remote apply, send, publication, or preference mutation; P0-G before any browser, device, emulator, build, server, or process execution used for runtime verification; any P0-A–C gates used in the same task must also pass independently | Grant the exact paths or provider objects, operations, recipients/audience where applicable, base revision/current values, environment, and expiry after mandatory mutation/change approval. Releasable governed meaning also requires applicable semantic-decision approval; release or send requires a separate release approval when policy requires residual-risk acceptance. Runtime verification receives a separate exact execution grant; no approval or write grant authorizes it. |
| Enforce | Validate deterministic approved schemas, required fields, mappings, redaction, and accessibility relationships | P0-F before autonomous enforcement; P0-A or P0-B also applies to its read path; P0-G applies to any controlled runtime execution; and P0-D or P0-E applies separately if an enforcement workflow would mutate, send, or publish | Grant the exact approved rule versions, repositories/branches or channel resources, allowed check or blocking action, execution profile where applicable, and duration. Any write additionally requires mandatory mutation/change approval; publication or send requires release approval when policy requires it. The agent cannot change rules, exceptions, baselines, severities, or grants, and model taste or stale platform guidance cannot become a blocking rule. |

## Research and implementation gaps

- **[Open question]** How should one semantic decision vary across web, native apps, email, SMS, push, voice, chat, CLI, API, assistive output, print, and staff handoff? Resolve through comparative task studies with controlled meaning and outcome measures; accountable roles: content-design and research leads.
- **[Open question]** Which findings hold outside English-language, visual-interface, high-bandwidth, individual-account, and US/UK-platform contexts? Resolve through sampling plans owned by qualified locale, accessibility, and regional research practitioners.
- **[Open question]** What fallback contracts work for number/email reassignment, shared devices, provider filtering, cross-device state, offline queues, stale deep links, and multi-organization handoffs? Resolve through failure injection, threat modelling, and end-to-end service trials; accountable roles: delivery operations, security/privacy, and service design.
- **[Open question]** What primary evidence supports conversational-agent memory, tool consent, provenance, uncertainty, multi-agent identity, interruption, repair after partial action, and safe human escalation? Resolve through controlled agent task studies and incident analysis led by AI safety, security/privacy, and content-design research.
- **[Open question]** How can status pages, support operations, letters, call scripts, and in-person artifacts be discovered and release-verified from a repository workflow? Resolve through connector prototypes and real service inventories; accountable roles: content operations and implementation governance.
- **[Open question]** How should speech recognition/synthesis, pronunciation, SMS encoding, CLI localization, API developer support, right-to-left orchestration, and accessibility semantics vary by locale? Resolve through native-language and assistive-technology testing led by qualified practitioners.
- **[Open question]** Which fixtures prove one semantic decision with multiple expressions, a legitimate channel-driven semantic split, orthogonal evidence dimensions, independent decision/product-delivery states, separate communication-attempt states and evaluation records, expired expressions, and inconsistent cross-channel claims? Resolve through a versioned test corpus maintained by the system-maintenance role and reviewed by content governance.

## Minimum channel-expression artifact

**[Inference]** A repository-native channel specification should be rejected as incomplete unless it can represent:

1. semantic message identity and the channel-specific expression identity;
2. participants, entry context, trigger, urgency, expiry, sensitivity, and intended outcome;
3. channel, surface, modality, component/format, slots, variables, and rendering constraints;
4. controlled facts; exact evidence sources with orthogonal observation-strength, challenge, freshness, lineage, and epistemic dimensions; separately identified governing instruments with recorded applicability; accountable owners by responsibility type; authorized approvers and exact approval records; and semantic-decision version and independent decision state;
5. delivery eligibility, permission/preference, redaction, retention, and security controls;
6. queued, delivered, presented, expired, failed, and recovery/fallback behavior where applicable;
7. visible, audio, accessible, plain-text, structured, or print variants and their relationships;
8. canonical destination or durable record, authentication, stale-link, and cross-device behavior;
9. orthogonal evidence dimensions, independent decision/product-delivery and communication-attempt states, and separate evaluation records;
10. evaluation hypothesis, populations, methods, outcomes, limitations, and review triggers; and
11. unknowns, conflicts, accountable decision-makers, and prohibited autonomous inferences.
