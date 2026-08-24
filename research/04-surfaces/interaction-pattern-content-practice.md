---
title: Interaction-pattern content practice
status: working-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Interaction-pattern content practice

## Purpose and evidence boundary

This document defines the content-design work required around recurring interaction patterns. It is not a catalog of reusable sentences. A pattern is a coordinated **meaning, behavior, state, action, and recovery contract**; its words are expressions of that contract in a particular locale, channel, component, slot, modality, and runtime condition.

Claims use the canonical vocabulary in the research protocol:

- **[Sourced fact]** is a fact directly supported by the cited source within its declared scope.
- **[Documented practice]** is what a named organization or practitioner says it does; it is not a universal rule.
- **[Research finding]** is a study result bounded by its method, sample, and limitations.
- **[Cross-source finding]** is a pattern directly supported by more than one independent source.
- **[Inference]** is this research team's interpretation of evidence, not a source assertion.
- **[Proposal]** is a candidate system or practice choice that still requires validation and the applicable decision process.
- **[Open question]** is unresolved and names the evidence, method, or accountable role needed to resolve it. It is not permission to invent an answer.

Scope and source type follow the claim label as secondary metadata when useful; for example, `scope: WCAG 2.2 web conformance; source type: normative standard`.

The supporting source records, dates, limitations, and freshness risks are in [patterns-channels-source-notes.md](../sources/patterns-channels-source-notes.md). Legal, regulatory, clinical, financial, safety, and platform applicability still require qualified review. Most public guidance is English-language and concentrated in US, UK, and large-platform contexts.

## What must exist before writing

**[Inference]** A content designer should not begin with the component. Begin with the event and the decision a person must make or understand.

| Required input | Questions that must be answerable | Stop condition |
|---|---|---|
| User need and content job | What is the person trying to accomplish or understand? What should be different after this message? | Need is an internal business objective only, or is untested for the affected audience |
| Actors and roles | Who acts, receives, is represented, is affected, approves, pays, owns, or can recover? | “User” hides different people, permissions, or consequences |
| Entry point and history | How did the person arrive, what have they already seen or supplied, and can they return by another route? | The design assumes a single linear path |
| Product behavior | What triggers the event; what are the preconditions, transitions, side effects, latency, and source of truth? | Copy would need to promise behavior the product does not guarantee |
| Semantic states | What can be not started, ready, blocked, pending, complete, failed, partial, cancelled, expired, disputed, or reversed? | Only the happy path is known |
| Consequence and reversibility | What changes, for whom, for how long, and can it be reviewed, undone, corrected, appealed, or retried safely? | Consequence, transaction boundary, or recovery is unknown |
| Facts and claims | Which amounts, dates, eligibility rules, retention periods, rights, risks, and commitments are authoritative? | Controlled facts lack an evidence source, accountable fact owner, applicability scope, freshness evidence, or required approver |
| Language system | Which concepts, preferred terms, protected terms, voice rules, tone conditions, and mechanics apply? | A label would decide unsettled product terminology or policy |
| Applicability and risk | Which product, plan, role, market, jurisdiction, data class, age group, and risk tier apply? | The agent cannot determine applicable rule sets or required reviewers |
| Accessibility and locale | What are the visible and nonvisual relationships, reading order, input methods, scripts, plural/grammar branches, dates, units, and expansion constraints? | Meaning depends on color, position, sound alone, or an English-only string shape |
| Implementation contract | Which component slots, resource keys, variables, APIs, focus behavior, status announcements, and fallbacks implement the decision? | The proposed expression cannot bind to a verified runtime state |
| Evaluation plan | What behavior or comprehension is expected, what is the baseline, who must be included, and what guardrails prevent local optimization? | “Shorter,” “friendlier,” or click-through alone is the success criterion |

**[Proposal]** Compile these inputs into known facts with provenance, assumptions, conflicts, missing states, accountable owners by responsibility type, required approvers by decision scope, and safe next actions. If a controlled input is missing, return `insufficient evidence`, `conflict`, or `human decision required`; do not fill the gap with fluent prose.

## Identity and status alignment

This practice adopts the two-level identity, orthogonal evidence dimensions, independent decision and delivery state machines, and separate evaluation records in [candidate-system-model.md](../08-synthesis/candidate-system-model.md).

### Semantic message identity

```text
product + journey + experience event + actor or need + semantic state
+ intended outcome or content job + represented concept/action
```

**[Inference]** A change in consequence, available action, responsible actor, controlled meaning, or recovery normally creates a new or revised content decision.

### Expression identity

```text
message_id + locale + channel + surface + component/pattern + slot
+ visible/assistive modality + variant/experiment + runtime condition
```

**[Inference]** A compact mobile label, an accessible name, an email subject, and an API problem detail may be coordinated expressions of one semantic decision. They are not interchangeable literals.

### Orthogonal evidence dimensions and independent decision/delivery states

**[Proposal]** These are three separate state machines. Within each machine, values form allowed sets with branching transitions; where noted, flags are orthogonal and can coexist rather than replacing one another.

| State machine | Allowed states or orthogonal flags | Transition rules and branch examples | What it must not imply |
|---|---|---|---|
| Evidence | observation set: `unobserved`, `observed`, `corroborated`; challenge flag: `undisputed` or `disputed`; freshness flag: `current` or `stale`; lineage flag: `active` or `superseded`; epistemic qualifier: `none`, `inferred`, or `assumed` | `unobserved → observed`; `observed → corroborated` when independent support is added. Credible conflict sets `disputed` without erasing observation strength; age or change can set `stale` while evidence remains observed/corroborated/disputed; a newer record can set the prior one `superseded` while preserving its other flags and history | Observation, corroboration, freshness, or absence of dispute is not decision approval |
| Decision | `question`, `option`, `proposed`, `approved`, `rejected`, `superseded`, `deprecated`, `retired` | `question → option → proposed` is one drafting branch; `proposed → approved` requires an authorized approver and exact scope; `proposed → rejected` is a sibling outcome; an `approved` decision can later be `superseded`, `deprecated`, or `retired`; new evidence can return work to `question` | Implementation or evidence strength is not approval |
| Delivery | `unmapped`, `mapped`, `patched`, `built`, `verified`, `released`, `observed-live`, `rolled-back`, `removed` | `unmapped → mapped → patched → built` describes one implementation route; verification can fail without advancing; `released → observed-live` requires runtime observation; a patched, built, verified, released, or observed-live occurrence may branch to `rolled-back` or `removed` as applicable; a built artifact may never be released | Release or live observation is not decision approval or user-outcome evidence |

**[Proposal]** Report all three when auditing or changing a pattern. A source string may be `observed`, its underlying decision `question`, and its delivery `observed-live` at the same time.

## Pattern-family map

| Family | Primary content job | Semantically distinct states often collapsed |
|---|---|---|
| Forms and questions | Elicit information people can provide and the service can justify using | optional, required, unknown, not applicable, declined, saved, abandoned |
| Onboarding | Establish orientation, capability, and the next useful action | first use, returning, invited, migrated, interrupted, skipped, completed |
| Authentication and recovery | Establish or restore appropriate access without leaking or weakening assurance | unauthenticated, challenge, pending, failed, locked, recovery, revoked |
| Permissions and consent | Enable an informed, scoped, voluntary choice and a usable alternative | not asked, rationale shown, granted, denied, limited, revoked, unavailable |
| Search, filter, and no results | Help people formulate, narrow, compare, and recover a retrieval task | initial, querying, results, filtered zero, true empty, unavailable, failed |
| Loading, progress, async, partial failure | Explain operation state, useful waiting behavior, outcome, and recovery | queued, running, paused, stalled, partial, cancelled, expired, complete |
| Validation, errors, and recovery | Identify failure ownership and the safest next step | user-correctable, eligibility, permission, conflict, dependency, system |
| Warnings, confirmations, destructive actions | Support informed commitment proportional to consequence | review, armed, committed, processing, reversible, irreversible, undone |
| Billing and subscriptions | Make price, cadence, commitment, change timing, and remedy understandable | trial, active, grace, renewal, failed payment, change pending, cancelled |
| Notifications | Deliver timely, proportionate, actionable information with preference control | generated, suppressed, queued, delivered, seen, acted, expired, failed |
| Help and support | Connect a known need or failure to effective self-service or a responsible person | contextual help, escalation, queued, in progress, resolved, reopened |
| Offboarding | End or change a relationship while preserving rights, data, access, and ownership | sign out, leave, transfer, deactivate, cancel, delete, retain, restore |

## Cross-pattern rules

- **[Inference]** Name the state and the responsible system internally before choosing tone. A blocked eligibility outcome is not a form error; a service failure is not the person's mistake.
- **[Inference]** Put necessary information before commitment. Confirmation after an action cannot repair missing disclosure before it.
- **[Inference]** Match interruption and confirmation cost to consequence, reversibility, frequency, and confidence. More words or a modal are not automatically safer.
- **[Inference]** Preserve entered data and progress where safe. If preservation is unsafe or impossible, disclose that constraint before the person invests work when feasible.
- **[Inference]** Coordinate visible text, accessible name, programmatic state, focus, announcement, and action semantics. Do not make assistive output a late paraphrase of a different decision.
- **[Inference]** Treat retry, resubmit, refresh, back, cancel, and undo as product operations with idempotency and side-effect rules, not generic verbs.
- **[Inference]** Do not expose secrets, account existence, protected attributes, internal identifiers, stack traces, or other people's data in an attempt to be specific.
- **[Inference]** Localize the underlying data and meaning, not only the sentence. Design for grammar, plural, script, direction, names, addresses, units, date/time zones, currencies, input methods, and text expansion.

### Tone is derived from the event, not attached to the component

**[Inference]** A component name such as `modal`, `toast`, or `error` does not determine tone. Relevant inputs include consequence, reversibility, responsibility, certainty, urgency, the person's available agency, prior effort, power relationship, repeated exposure, channel, locale, and evidenced emotional or cognitive context. Do not infer a person's feelings from a product state or demographic proxy.

| Condition to investigate | Candidate stance to test | Failure to guard against |
|---|---|---|
| Routine instruction or low-risk choice | direct, proportionate, low-interruption | forced enthusiasm; explaining controls instead of the decision |
| Uncertainty, waiting, or incomplete result | explicit about known state, boundary, and next update/action | unsupported reassurance; false precision; calling acceptance completion |
| Person-correctable input | specific and non-blaming, with correction preserved | moral judgment; apology that hides the required fix |
| Product, dependency, or operational failure | accountable about the service boundary and available recovery | blaming the person; inventing a cause or recovery time |
| Security, safety, or time-sensitive warning | calm, unambiguous, proportionate to verified risk | alarmism, euphemism, or urgency used for conversion |
| Financial, legal, consent, or rights decision | precise about commitment and alternatives before action | brand warmth obscuring controlled meaning or required disclosure |
| Irreversible loss or offboarding | candid about scope, affected actors, timing, and reversibility | shame, obstruction, or vague “are you sure” friction |
| Success or milestone | proportional to the person's goal and the actual completion boundary | celebration during grief, debt, health, job loss, or merely queued work |
| Vulnerability or support | respectful, choice-preserving, and operationally honest | scripted empathy, assumed emotion, or promises support cannot meet |

**[Proposal]** Store tone context as a scoped decision with its evidence, alternatives, approver where required, locale review, and evaluation—not as a universal adjective score. Channel expressions may adapt rhythm, order, and repetition while preserving responsibility, certainty, consequence, and agency.

## 1. Forms and questions

### Content job and pre-writing needs

**[Inference]** The job is to request only information that is necessary, answerable by the intended person, and usable by the service. Before writing, record the field purpose, source, requiredness, valid absence/uncertainty states, reuse, branching, the accountable owner of the validation behavior, retention, security, and downstream consequence.

### Evidence and scope

- **[Documented practice]** **Scope:** UK government online forms. GOV.UK's [form-structure guidance](https://www.gov.uk/service-manual/design/form-structure) asks teams to document why each question is needed, what it will be used for, who supplies it, how accuracy is checked, and how it stays current and secure. It recommends one thing per page as a starting point, with research-based exceptions.
- **[Documented practice]** **Scope:** UK government transactions. GOV.UK's [question guidance](https://www.gov.uk/service-manual/design/designing-good-questions) says to ask only what is needed, allow uncertainty where valid, favor closed questions when they reduce ambiguity, use help only when research shows a need, and accept unambiguous input formats.
- **[Documented practice]** **Scope:** web accessibility. The W3C [forms tutorial](https://www.w3.org/WAI/tutorials/forms/) and [WCAG 2.2](https://www.w3.org/TR/WCAG22/) coordinate labels, instructions, grouped controls, error identification, and completion feedback.

### Conditional rules and counterexamples

- **[Inference]** Start with one decision topic per step when it aids focus, error recovery, and branch logic; combine related questions when context, comparison, expert speed, or offline continuity makes a grouped form better. Do not encode either layout as universal.
- **[Inference]** Use open input when legitimate answers cannot be enumerated safely; use closed input when the option set is complete, mutually interpretable, and maintained. Do not use a forced “other” response as evidence that the ontology is adequate.
- **[Inference]** Help text should resolve a demonstrated ambiguity or explain a consequence. Repeating the label, teaching obvious control mechanics, or hiding essential disclosure in optional help adds burden.
- **[Inference]** Placeholders may illustrate format but must not replace persistent labels or required values.

### State and recovery contract

**[Proposal]** Model untouched, in progress, saved, valid, invalid, unavailable, not applicable, uncertain, declined, timed out, abandoned, and restored states. Define whether back navigation is safe, whether one-time actions may replay, how drafts expire, which values survive validation or a dependency failure, and where the person can correct earlier answers.

### Accessibility, localization, security, and privacy

**[Proposal]** Coordinate visible label, accessible name, legend, hint, requiredness, unit, format, and error references. Preserve logical reading and focus order. Support paste and password managers where relevant. Minimize collection; explain sensitive-data purpose before input; never request a secret merely to make a question “complete.” Validate locale-shaped inputs without rejecting unambiguous equivalents.

### Evaluation and agent implications

**[Proposal]** Evaluate completion and correction by field and segment, abandonment after sensitive questions, help use, invalid-answer distributions, comprehension of purpose, keyboard and assistive-technology completion, and downstream data quality.

**[Proposal]** Trace every question to a documented need and data use; flag orphan fields, duplicate collection, impossible answer sets, destructive normalization, and missing non-answer states.

## 2. Onboarding

### Content job and pre-writing needs

**[Inference]** Onboarding should get a person to a meaningful first outcome while setting only the expectations needed to proceed. Know the acquisition promise, audience experience, invitation or migration context, minimum setup, permission dependencies, data import, role, success milestone, skip/return behavior, and what the product can teach in context later.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple-platform apps. Apple's [onboarding guidance](https://developer.apple.com/design/human-interface-guidelines/onboarding) favors fast, optional onboarding when needed, interactive or contextual learning, deferred nonessential setup, and permission requests in meaningful context.
- **[Documented practice]** **Scope:** Android mobile apps. Android's [authentication and onboarding guidance](https://developer.android.com/design/ui/mobile/guides/patterns/onboarding) treats onboarding as a bridge to value rather than a compulsory feature tour and distinguishes entry paths such as account creation and sign-in.

### Conditional rules and counterexamples

- **[Inference]** A short tour may help when use is novel, risky, inaccessible without setup, or unavailable for safe experimentation. It is waste when it recites visible controls or delays value.
- **[Inference]** Personalization questions belong before first use only if answers materially change that use and can be explained. Otherwise defer or infer only with valid consent and correction.
- **[Inference]** “Skip” is not always safe for identity proofing, required safety setup, or contractual acceptance. Separate mandatory prerequisites from optional education so the reason is truthful.
- **[Inference]** Returning, invited, migrated, restored, and newly entitled people may need different orientation even when they land on the same screen.

### State and recovery contract

**[Proposal]** Model first launch, unauthenticated return, invited role, partially configured, permission denied, import pending/failed, tutorial skipped, milestone achieved, and re-entry after interruption. Preserve progress, offer later discovery, and avoid trapping a person in setup when the dependent capability is optional.

### Accessibility, localization, security, and privacy

**[Proposal]** Do not make timed animation, gesture imitation, or visual spotlight the only instruction. Provide keyboard/screen-reader paths and reduced-motion behavior. Allow localization expansion and different concept order. Do not use onboarding to bundle unrelated consent, collect speculative profile data, or reveal invitation/account details on a shared device.

### Evaluation and agent implications

**[Proposal]** Measure time and success to first value, skip and return behavior, setup failure, later feature discovery, comprehension of role and data use, and retention without treating completion rate as the goal.

**[Proposal]** Derive steps from real prerequisites and capability dependencies; flag tours with no research need, premature permission requests, and required-looking optional choices.

## 3. Authentication and account recovery

### Content job and pre-writing needs

**[Inference]** The job is to help the right actor establish or restore appropriate access while preserving assurance and privacy. Establish authenticator types, assurance level, session/device state, account-discovery risk, rate limits, lockout, recovery methods, notification recipients, compromise response, support escalation, and what success does and does not authorize.

### Evidence and scope

- **[Sourced fact]** **Scope:** US federal digital identity systems. **Source type:** government security guideline. [NIST SP 800-63B-4](https://pages.nist.gov/800-63-4/sp800-63b.html) defines assurance-sensitive authentication and recovery controls, including recovery notification, rate limiting, and revocation. Its requirements do not automatically apply outside the scoped system, but they are primary security evidence.
- **[Documented practice]** **Scope:** web applications, community security guidance. The OWASP [Forgot Password Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Forgot_Password_Cheat_Sheet.html) recommends consistent responses and timing for existing and nonexistent accounts, secure single-use expiring recovery material, abuse controls, notification, and no automatic login solely from reset completion.
- **[Sourced fact]** **Scope:** WCAG 2.2 web conformance. **Source type:** normative standard. [Accessible Authentication](https://www.w3.org/TR/WCAG22/#accessible-authentication-minimum) limits cognitive-function tests unless assistance or an alternative is available.

### Conditional rules and counterexamples

- **[Inference]** Specificity that helps recovery can also disclose account existence, enabled factors, contact details, or security posture. Reveal only what the verified context permits.
- **[Inference]** Do not promise immediate restoration when manual review, cool-down, fraud investigation, or identity evidence is required. A slower high-assurance path can be legitimate if its status and next step are clear.
- **[Inference]** Password guidance is wrong for passkeys, device codes, magic links, federated identity, or recovery codes; branch by actual mechanism.
- **[Inference]** “Try again” is unsafe when attempts are limited or the prior action might have succeeded.

### State and recovery contract

**[Proposal]** Model signed out, session expired, challenge required, challenge pending, factor unavailable, mismatch, rate-limited, temporarily locked, compromised, recovery initiated, evidence under review, recovery failed, access restored, sessions revoked, and contact method changed. Define attempt counters, expiry, resend/restart behavior, trusted-device implications, and support escalation without exposing security-sensitive detail.

### Accessibility, localization, security, and privacy

**[Proposal]** Support password managers, paste, autofill, accessible names, alternative authentication, sufficient time, and non-memory-dependent paths. Avoid hidden normalization of identifiers across scripts or locales. Redact destinations. Never put credentials, reset tokens, or sensitive evidence in logs or copy inventories. Security review owns disclosure depth and threat tradeoffs.

### Evaluation and agent implications

**[Proposal]** Evaluate legitimate completion, time to recover, abandonment by factor and assistive method, false lockouts, abuse/rate-limit signals, support escalation, comprehension of security consequences, and post-recovery incidents.

**[Proposal]** Use threat-model and assurance evidence; generate no recovery claim, retry path, or account-specific detail from interface context alone.

## 4. Permissions and consent

### Content job and pre-writing needs

**[Inference]** The job is to let a person understand and control a specific access request or data use at the moment it matters. Know the requesting capability, data/action scope, purpose, necessity, recipient, duration, storage/sharing, legal basis, OS/browser prompt behavior, denial fallback, later controls, and consequences of withdrawal.

### Evidence and scope

- **[Documented practice]** **Scope:** Android runtime permissions. Android's [request-permission guidance](https://developer.android.com/training/permissions/requesting) says to ask only when needed, in task context, explain when necessary, respect denial, and degrade gracefully; it warns against repeated pressure.
- **[Documented practice]** **Scope:** Apple-platform apps. Apple's [privacy guidance](https://developer.apple.com/design/human-interface-guidelines/privacy) distinguishes an app's contextual rationale from the system prompt and cautions against manipulative or system-mimicking pre-alerts.
- **[Documented practice]** **Scope:** UK government services. GOV.UK [personal-information guidance](https://www.gov.uk/service-manual/design/collecting-personal-information-from-users) says teams must establish a legal basis with appropriate specialists; where consent is used, it must be specific and withdrawable and separate purposes should not be bundled.

### Conditional rules and counterexamples

- **[Inference]** Permission, consent, contractual acceptance, legal notice, privacy notice, preference, and role authorization are not synonyms. Model the governing basis before selecting a control or verb.
- **[Inference]** Explain benefit when it is real, but also disclose material risk or data use. A benefit-only rationale is not informed choice.
- **[Inference]** If a capability truly cannot function without access, explain that dependency and provide an exit; do not present denial as morally wrong. If a limited or manual alternative exists, surface it.
- **[Inference]** Re-prompt only after a meaningful context change or explicit user action, subject to platform rules. Repetition is not evidence of consent.

### State and recovery contract

**[Proposal]** Model not requested, rationale available, system prompt pending, granted once, granted while using, limited selection, denied, denied permanently, restricted by administrator/device, revoked, expired, and capability unavailable. Define where settings can be changed and what previously collected data or delegated access persists after revocation.

### Accessibility, localization, security, and privacy

**[Proposal]** The purpose and consequence must not rely on OS iconography or color. Controls need distinct accessible names and unambiguous focus order. Localize legal meaning through qualified review, not literal translation. Record the consent/permission version, scope, actor, and time without storing unnecessary sensitive context.

### Evaluation and agent implications

**[Proposal]** Evaluate comprehension, voluntary choice, task completion after grant and denial, later revocation, repeated prompts, support contacts, and whether the service works at the minimum permission level.

**[Proposal]** Refuse to infer legal basis, necessity, data retention, or consent validity; reconcile app copy with current platform behavior and flag dark-pattern pressure.

## 5. Search, filters, and no-results states

### Content job and pre-writing needs

**[Inference]** The job is to help people express an information need, understand the searched scope, refine or compare results, and distinguish “nothing matches” from “the system cannot answer.” Know the corpus, indexing freshness, permissions, query behavior, filter logic, ranking, result attributes, saved state, and recovery options.

### Evidence and scope

- **[Documented practice]** **Scope:** VA.gov candidate component. The VA [search-filter guidance](https://design.va.gov/components/search-filter) covers visible active/reset filter state, responsive placement, loading/result-count/error announcements, and different focus handling for filter versus sort. It is a candidate pattern, not mature universal guidance.
- **[Documented practice]** **Scope:** Carbon-using products. Carbon's [empty-state pattern](https://preview.carbondesignsystem.com/building-blocks/core/patterns/empty-states) distinguishes first use, intentionally empty/deleted, no search matches, unavailable data, and error states.
- **[Documented practice]** **Scope:** search and listing interfaces. Nielsen Norman Group's [list-entry guidance](https://www.nngroup.com/articles/list-entries/) argues that research and analytics should identify the attributes needed to scan and compare results. This is practitioner evidence, not a standard.

### Conditional rules and counterexamples

- **[Inference]** Do not use one empty-state message for a new account, an empty dataset, no query match, zero results after filters, hidden results due to permissions, stale/deleted content, loading, offline state, or service failure.
- **[Inference]** A suggested broader query is useful only when the system knows how matching changed. Do not claim spelling correction, synonym expansion, or “all results” unless retrieval behavior proves it.
- **[Inference]** Showing result count can orient people, but approximate, capped, rapidly changing, or privacy-sensitive counts need qualified representation.
- **[Inference]** A filter label must describe a stable user concept and value set; raw backend fields are not automatically suitable facets.

### State and recovery contract

**[Proposal]** Model initial/never searched, query editing, submitted, loading, results, pagination or incremental load, filters active, zero query matches, zero filtered matches, index stale, permission-limited, offline, service failure, and item no longer available. Preserve query and filters through error and back navigation; expose removal/reset at the appropriate scope.

### Accessibility, localization, security, and privacy

**[Proposal]** Announce result and loading changes without moving focus unnecessarily. Give controls persistent labels and programmatic selected state. Support keyboard traversal and headings/landmarks. Search tokenization, sort, stemming, transliteration, and result snippets are locale decisions. Prevent suggestions, history, and snippets from exposing sensitive or unauthorized content.

### Evaluation and agent implications

**[Proposal]** Evaluate successful reformulation, zero-result recovery, filter use and removal, pogo-sticking, result relevance by intent and segment, announcement quality, and query privacy.

**[Proposal]** Inspect retrieval and authorization semantics before drafting; classify the empty state from runtime evidence and flag missing result attributes or recovery rather than supplying generic encouragement.

## 6. Loading, progress, asynchronous work, and partial failure

### Content job and pre-writing needs

**[Inference]** The job is to establish whether work began, what remains possible while it runs, whether leaving is safe, how progress is estimated, and what completed. Know operation versus object state, execution location, expected duration and variance, cancellation, retry/idempotency, persistence, notification path, timeout, partial-success model, and authoritative result.

### Evidence and scope

- **[Documented practice]** **Scope:** Carbon components. Carbon documents skeleton, inline, full-page, determinate, indeterminate, and progressive loading treatments, with inline states such as active, finished, and error; see [loading](https://preview.carbondesignsystem.com/building-blocks/core/patterns/loading), [inline loading](https://carbondesignsystem.com/components/inline-loading/usage/), and [progress bar](https://carbondesignsystem.com/components/progress-bar/usage/).
- **[Sourced fact]** **Scope:** WCAG 2.2 web conformance. **Source type:** normative standard. [Status Messages](https://www.w3.org/TR/WCAG22/#status-messages) requires status changes to be programmatically determinable without receiving focus when appropriate.
- **[Documented practice]** **Scope:** Google-style APIs. [AIP-151](https://google.aip.dev/151) uses a trackable long-running operation with result and metadata; [AIP-193](https://google.aip.dev/193) generally discourages partial errors except structured bulk-operation cases.

### Conditional rules and counterexamples

- **[Inference]** Use determinate progress only when the denominator and measurement are meaningful. False precision or a stalled percentage damages trust; a stage or indeterminate state may be more accurate.
- **[Inference]** A fast local operation may need no textual interruption. A background operation needs a durable way to find it again even if it began quickly.
- **[Inference]** “Done” is wrong when the request was merely queued, accepted, synchronized to one system, or partially applied. Name the completed boundary.
- **[Inference]** Partial success is not a softened error. Represent succeeded and failed units, consequences, retry scope, and aggregation rules.

### State and recovery contract

**[Proposal]** Keep operation state separate from resource state. Model not started, accepted, queued, running, paused, waiting on another actor/system, stalled, cancelling, cancelled, succeeded, failed, partially succeeded, timed out, and expired. Define refresh/reconnect behavior, safe leave/close, background continuation, deduplicated retry, result retention, and notification after completion.

### Accessibility, localization, security, and privacy

**[Proposal]** Announce meaningful transitions, not every tick. Do not steal focus for routine progress. Animation needs reduced-motion behavior. Durations, counts, units, and plural forms must localize. Progress detail must not leak internal infrastructure, other tenants, sensitive filenames, or private work in notifications.

### Evaluation and agent implications

**[Proposal]** Evaluate confidence about whether work started and finished, duplicate submissions, abandonment, cancellation success, stale jobs, false precision, return-path discovery, assistive announcement burden, and recovery from partial outcomes.

**[Proposal]** Require the operation state machine and retry contract; do not invent time estimates or flatten `accepted`, `complete`, and `partial` into one message.

## 7. Validation, errors, and recovery

### Content job and pre-writing needs

**[Inference]** The job is to explain what prevented the intended outcome, who or what can change it, and the safest next action without blame or sensitive disclosure. Know failure class, detection timing, affected scope, retained state, retry safety, eligibility/permission distinctions, dependency ownership, support escalation, and observability identifier policy.

### Evidence and scope

- **[Documented practice]** **Scope:** GOV.UK forms. GOV.UK's [validation pattern](https://design-system.service.gov.uk/patterns/validation/), [error message](https://design-system.service.gov.uk/components/error-message/), and [error summary](https://design-system.service.gov.uk/components/error-summary/) call for specific correction, retained values, and aligned field and summary errors; they explicitly separate validation from eligibility, permission, and service failure.
- **[Sourced fact]** **Scope:** WCAG 2.2 web conformance. **Source type:** normative standard with non-normative explanation. WCAG requires text identification of detected input errors and labels/instructions where input is required; consequential processes also have error-prevention requirements. See [Input Assistance](https://www.w3.org/WAI/WCAG22/Understanding/input-assistance).
- **[Documented practice]** **Scope:** general interface usability. Nielsen Norman Group's [hostile error-message guidance](https://www.nngroup.com/articles/hostile-error-messages/) cautions against premature errors and disproportionate hostile styling. This is practitioner guidance, not a conformance rule.

### Conditional rules and counterexamples

- **[Inference]** Classify at least: syntax/format, missing data, semantic conflict, eligibility outcome, authorization/permission, concurrency/version conflict, dependency unavailable, rate limit, offline/network, security-sensitive failure, and internal system failure.
- **[Inference]** Inline validation can prevent costly correction when certainty is high; premature validation during entry can interrupt and misclassify incomplete work. Choose trigger by input and task evidence.
- **[Inference]** Specificity should identify recoverable cause and action, but may be constrained by fraud, security, privacy, abuse, or system uncertainty. In those cases, provide the safest truthful next step without false causal detail.
- **[Inference]** Do not tell a person to retry when the action may have succeeded, is non-idempotent, will consume another attempt, or the dependency remains unavailable.

### State and recovery contract

**[Proposal]** Record when detected, responsible subsystem, accountable owner of the failure behavior, affected object/field, retained input, focus destination, retry scope, attempt/lockout effect, and whether the previous request committed. Coordinate summary, inline expression, control state, logs, support reference, and eventual resolution. Provide correction, undo, alternate path, wait/status, contact, or safe exit only when that path exists.

### Accessibility, localization, security, and privacy

**[Proposal]** Identify errors in text, associate them programmatically, preserve user input where safe, focus a useful summary when submission fails, and avoid color/icon-only meaning. Localize constraints and examples; do not interpolate raw backend text. Separate user-safe explanations from diagnostics and log correlation. Redact personal and security-sensitive values.

### Evaluation and agent implications

**[Proposal]** Measure first-attempt success, correction success and time, repeated errors, abandonment, duplicate side effects, support demand by failure code, assistive completion, and error-class accuracy.

**[Proposal]** Map runtime codes to semantic failure classes through an approved contract; flag unmapped and contradictory states, and never rewrite a policy outcome as user error.

## 8. Warnings, confirmations, and destructive actions

### Content job and pre-writing needs

**[Inference]** The job is to help a person anticipate a material consequence and commit, revise, or exit with proportionate friction. Know affected objects and people, immediacy, reversibility, scope, dependencies, permissions, side effects, retention, undo window, notification, and safer alternatives.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple-platform apps. Apple's [alert guidance](https://developer.apple.com/design/human-interface-guidelines/alerts) reserves alerts for important actionable information; it contrasts routine undoable deletion with uncommon or irreversible destructive actions that merit confirmation.
- **[Documented practice]** **Scope:** US federal websites. USWDS [alerts](https://designsystem.digital.gov/components/alert/) and [modals](https://designsystem.digital.gov/components/modal/) distinguish contextual status from focused interruption and advise sparing modal use.
- **[Sourced fact]** **Scope:** WCAG 2.2 web conformance. **Source type:** normative standard. [Error Prevention](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data) requires legal, financial, and user-data-changing submissions to be reversible, checked/correctable, or reviewed/confirmed at level AA.

### Conditional rules and counterexamples

- **[Inference]** Confirmation is warranted by meaningful, uncommon, hard-to-reverse, broad, delayed, legally binding, financial, or third-party consequence—not by the verb alone.
- **[Inference]** For frequent, low-risk, immediately undoable actions, undo may protect people better than repeated confirmation. For irreversible or delayed harm, undo is insufficient or unavailable.
- **[Inference]** Re-entering an object name or credential may slow accidental action in narrow cases, but it can add accessibility burden and does not ensure comprehension. Use only with evidence and an actual security/identity purpose.
- **[Inference]** Do not make the safe exit visually or linguistically ambiguous, and do not use loss-framed shame to obtain commitment.

### State and recovery contract

**[Proposal]** Model warning available, review, confirmation armed, authentication required, committed, processing, scheduled, completed, failed, partially applied, undo available, undone, and irreversible. State the consequence boundary before commit, then confirm the actual result and remaining recovery afterward. Prevent duplicate activation.

### Accessibility, localization, security, and privacy

**[Proposal]** Move focus into genuine dialogs, label them, contain and restore focus correctly, support keyboard exit unless safety requires a constrained flow, and do not rely on button color. Translate consequences and legal terms with domain review. Avoid revealing sensitive object names or counts on shared screens.

### Evaluation and agent implications

**[Proposal]** Evaluate accidental completion, cancellation due to newly understood consequence, undo use/success, repeated confirmation fatigue, assistive interaction, and support/reversal demand.

**[Proposal]** Require consequence and reversibility evidence; reject blanket “confirm every delete” rules and flag mismatches between stated and actual scope.

## 9. Billing and subscriptions

### Content job and pre-writing needs

**[Inference]** The job is to make the economic commitment and its timing understandable before purchase and throughout the relationship. Require authoritative plan/product, price, currency, taxes/fees, billing period, renewal cadence, trial terms, proration, discount duration, usage basis, payment timing, cancellation effect, refund/credit policy, entitlement change, market, evidence source, accountable fact owner, governing applicability, and required approver.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple App Store auto-renewable subscriptions. Apple's [subscription guidance](https://developer.apple.com/app-store/subscriptions/) requires clear subscription name, duration, service, localized renewal terms, prominent billed amount, trial end and price, restore/sign-in paths, and correct timing for plan changes and price notifications/consent.
- **[Sourced fact]** **Scope:** WCAG 2.2 web conformance. **Source type:** normative standard. Financial transactions fall within WCAG's [error-prevention](https://www.w3.org/TR/WCAG22/#error-prevention-legal-financial-data) requirement at level AA.

### Conditional rules and counterexamples

- **[Inference]** A monthly display of an annual commitment, a promotional first period, metered usage, seat-based pricing, and installment financing are different economic decisions. Do not normalize them into one “per month” treatment.
- **[Inference]** “Cancel anytime” is incomplete when access continues, charges are nonrefundable, notice periods apply, hardware must return, or cancellation does not stop another agreement.
- **[Inference]** A payment failure may be retriable, require a new method, enter grace, reduce access, or trigger collection. Content must follow actual policy and timing.
- **[Inference]** Taxes, exchange rates, app-store rules, local rights, and invoice requirements vary; locale formatting cannot substitute for jurisdictional applicability.

### State and recovery contract

**[Proposal]** Model prospective, trial, pending payment, active, renewal approaching, price/term change pending, payment failed, grace, access restricted, upgrade/downgrade scheduled, cancellation requested, cancelled with access remaining, expired, refunded, disputed, and restored. Define receipts, failed-notification recovery, duplicate payment protection, proration display, and support/dispute paths.

### Accessibility, localization, security, and privacy

**[Proposal]** Programmatically associate price with plan and period; keep material terms available before commit and in a durable record. Localize currency, decimal/grouping, taxes, dates, billing time zone, plural, and legal terminology. Never invent amounts or expose complete payment credentials. Apply authentication and privacy controls before plan/account detail.

### Evaluation and agent implications

**[Proposal]** Test comprehension of total commitment, cadence, trial conversion, cancellation outcome, and change timing—not only purchase conversion. Monitor refund/dispute, involuntary churn, duplicate charge, support reason, and accessibility.

**[Proposal]** Bind every economic variable to an authoritative runtime field and applicability scope; block drafting when amount, cadence, renewal, or cancellation behavior is unresolved.

## 10. Notifications

### Content job and pre-writing needs

**[Inference]** The job is to interrupt or update the right recipient at the right urgency with enough information and a safe next action. Know the triggering event, recipient role, sensitivity, urgency and expiry, channel permission/preference, grouping/deduplication, quiet hours, device lock-screen exposure, deep-link destination, delivery guarantees, and fallback/escalation.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple-platform notifications. Apple's [notification guidance](https://developer.apple.com/design/human-interface-guidelines/managing-notifications) emphasizes permission, usefulness, appropriate interruption, grouping, and controls.
- **[Documented practice]** **Scope:** Android notifications. Android's [notification guidance](https://developer.android.com/design/ui/mobile/guides/home-screen/notifications) treats notifications as glanceable system surfaces with hierarchy, channels/categories, actions, and platform-controlled presentation.

### Conditional rules and counterexamples

- **[Inference]** Event creation, channel dispatch, successful delivery, presentation, human attention, comprehension, and action are different states. Do not claim “notified” as proof that a person knows.
- **[Inference]** Urgent interruption is justified by time sensitivity and consequence, not business importance. Routine progress can live in-product; some security/safety events need redundant channels and escalation.
- **[Inference]** A lock-screen preview can help action but disclose sensitive context. Provide a privacy-safe expression or suppress detail according to user and platform settings.
- **[Inference]** Promotional, transactional, social, security, and operational notifications need distinct consent, preference, suppression, and measurement logic.

### State and recovery contract

**[Proposal]** Model eligible, suppressed by preference/rule, scheduled, queued, sent, provider accepted, delivered, presented, opened, actioned, bounced/failed, expired, deduplicated, and escalated. Define stale-link handling, cross-device read state, resend policy, preference propagation, and where the full durable record lives.

### Accessibility, localization, security, and privacy

**[Proposal]** Do not rely on sound, vibration, badge, or color alone. Keep actions understandable outside visual layout and under truncation. Localize concise variants without truncating the consequence or sender identity. Protect lock-screen detail, tokens, and deep links; authenticate before exposing protected destination content.

### Evaluation and agent implications

**[Proposal]** Measure usefulness and task outcome alongside opt-out, dismiss, duplicate, late/stale delivery, sensitive exposure, and interruption burden. Test on actual OS states and assistive technology.

**[Proposal]** Require a notification policy record and channel-safe expression; keep message decision, delivery attempt, and recipient engagement as separate entities.

## 11. Help and support

### Content job and pre-writing needs

**[Inference]** The job is to resolve a need at the point of difficulty or transfer it with enough context to a capable support path. Know likely questions and failure reasons, self-service evidence, channel hours, eligibility, response/service levels, queue and escalation behavior, accessibility/language support, identity verification, case ownership, and feedback loops to product teams.

### Evidence and scope

- **[Sourced fact]** **Scope:** WCAG 2.2 web processes. **Source type:** normative standard with non-normative explanation. [Consistent Help](https://www.w3.org/WAI/WCAG22/Understanding/consistent-help) requires repeated help mechanisms to appear in a consistent relative order where present across pages.
- **[Documented practice]** **Scope:** GOV.UK services. GOV.UK's tested [contact pattern](https://design-system.service.gov.uk/patterns/contact-a-department-or-service-team/) helps route people to the appropriate department or service team while documenting open research gaps.
- **[Documented practice]** **Scope:** GOV.UK service operations. [User-support guidance](https://www.gov.uk/service-manual/helping-people-to-use-your-service/set-up-and-manage-user-support) asks teams to understand demand by channel and reason, define service levels, and feed enquiries and faults back into service improvement.

### Conditional rules and counterexamples

- **[Inference]** Contextual help belongs near a known decision; general documentation supports learning and reference; human support handles unresolved, exceptional, sensitive, or delegated needs. Do not substitute one for another because it is cheaper.
- **[Inference]** Showing every contact channel can create misrouting and delay. Routing can help when based on need and transparent availability; it becomes obstruction when designed to hide effective support.
- **[Inference]** A chatbot must disclose capability limits and offer repair or handoff appropriate to risk. It must not impersonate a person or fabricate case status.
- **[Inference]** Estimated response time must reflect operational evidence and segment/channel conditions, not a content preference.

### State and recovery contract

**[Proposal]** Model help available, self-service attempted, contact eligibility, unavailable/closed, request drafted, submitted, queued, assigned, awaiting person, awaiting staff, escalated, resolved, reopened, and abandoned. Preserve case reference, submitted evidence, promised next step, time expectation, and accessible alternate route. Define safe handoff and transcript/data transfer.

### Accessibility, localization, security, and privacy

**[Proposal]** Offer support compatible with different communication needs and avoid CAPTCHA/memory barriers without alternatives. State channel hours and costs. Provide qualified language access rather than automatic translation for high-consequence cases. Minimize repeated disclosure and authenticate only to the level required for the support action.

### Evaluation and agent implications

**[Proposal]** Measure resolution and recurrence by need, time to effective help, transfer count, abandoned contacts, channel accessibility, expectation accuracy, and product defects learned from support.

**[Proposal]** Retrieve current operational capability before stating availability or timing; route unresolved controlled cases to the accountable operational role or scoped decision approver instead of drafting false reassurance.

## 12. Offboarding

### Content job and pre-writing needs

**[Inference]** The job is to let people end or change access, service, payment, data, and organizational relationships with accurate consequences and a usable record. Distinguish sign out, device/session revocation, leave workspace, remove member, transfer ownership, deactivate, cancel subscription, close account, delete content, delete account/data, export, retain, restore, and statutory request.

### Evidence and scope

- **[Documented practice]** **Scope:** Apple App Store apps with account creation. Apple's [account-deletion guidance](https://developer.apple.com/support/offering-account-deletion-in-your-app/) calls for a discoverable deletion path, clear distinction from deactivation, disclosure of retained data and delayed completion, confirmation, reauthentication that does not obstruct, and separate handling of active subscriptions.
- **[Documented practice]** **Scope:** Google Play apps. Google Play's [account-deletion policy](https://support.google.com/googleplay/android-developer/answer/13327111) requires an in-app path and a web resource for deletion requests for apps in scope. **[Open question]** Direct retrieval was rate-limited during this pass; the research-maintenance role must re-read the live official policy and record its effective/update date before treating details as current enforcement evidence.
- **[Documented practice]** **Scope:** Apple subscriptions. Apple's [subscription guidance](https://developer.apple.com/app-store/subscriptions/) distinguishes subscription management and entitlement timing from account state.

### Conditional rules and counterexamples

- **[Inference]** Cancellation, deactivation, and deletion are not interchangeable. Ending billing may not delete an account; deleting an account may not cancel a third-party subscription; leaving a workspace may require ownership transfer.
- **[Inference]** Retention may be required for legal, fraud, safety, financial, backup, or dispute reasons, but the agent cannot infer those grounds. Explain verified scope and duration without pretending deletion is instantaneous or total.
- **[Inference]** Recovery windows can protect against accident or compromise, but they must not become hidden obstruction. State whether the request can be reversed and when it becomes final.
- **[Inference]** Save offers or feedback requests can be optional and proportionate; blocking exit, obscuring the direct path, or making refusal harder than enrollment is not a content solution.

### State and recovery contract

**[Proposal]** Model requested, identity reverified, blocked by ownership/dependency, subscription separately active, export requested/ready/expired, scheduled, reversible window, processing, partially completed, completed, retained subset, failed, cancelled, restored, and dispute/support. Define effects on collaborators, shared resources, integrations, pending transactions, messages, and receipts before commitment.

### Accessibility, localization, security, and privacy

**[Proposal]** Make the direct path discoverable and operable by keyboard and assistive technology. Avoid deceptive visual hierarchy. Translate rights and retention with qualified locale/jurisdiction review. Protect export links, reauthentication, and account details; notify through verified channels without leaking the offboarding reason.

### Evaluation and agent implications

**[Proposal]** Evaluate whether people can find and complete the intended offboarding operation, comprehend distinct consequences, transfer ownership, obtain data/receipt, and recover from mistakes; monitor support demand, involuntary continuation, and incomplete deletion.

**[Proposal]** Build a dependency and consequence graph before drafting, and block equivalence claims among cancellation, deactivation, and deletion.

## Cross-pattern evaluation framework

**[Inference]** A pattern is ready for recommendation only when its evaluation matches its risk and purpose. No single score establishes quality.

| Evaluation question | Candidate methods | Guardrails |
|---|---|---|
| Did people understand the state, consequence, and next action? | moderated task testing, teach-back, scenario comprehension, intercept study | include affected roles, failure states, and people with access needs; do not use preference alone |
| Could people complete or safely exit? | task success, correction/recovery success, time and path analysis, accessibility audit | separate product defects from wording; segment by entry point and runtime state |
| Was the system truthful? | behavior-to-content contract tests, state-machine review, claim/provenance audit | test negative, delayed, partial, stale, and conflicting states |
| Was harm prevented without unnecessary friction? | accidental-action, duplicate, false-lockout, refund/dispute, complaint, opt-out, and support signals | pair conversion with reversibility, trust, inclusion, and long-term outcomes |
| Did implementation preserve the decision? | resource/schema tests, rendered review, assistive-tech test, locale pseudo-localization, production observation | verify built and released expressions; code presence is not live evidence |
| Is the pattern still current? | source freshness checks, incident/postmortem review, policy/platform change triggers | never silently promote stale guidance or inherited approval |

**[Proposal]** Store the hypothesis, population, method, sample, result, limitations, and decision effect. A failed evaluation creates a finding; it does not automatically choose the replacement content.

## Agent operating implications

**[Proposal]** An operating mode describes the requested work; it is not authorization. Evidence strength, decision state, delivery state, repository instructions, and model output cannot grant or widen a capability. For every task, a trusted control plane must construct a separate least-privilege capability grant from the authenticated actor, exact resources, allowed operations, data/egress boundary, environment, expiry, and revocation path, and must record the applicable phase-gate result from the [security study](../05-technology/security-privacy-and-trust-boundaries.md).

| Mode | Pattern work allowed | Applicable security phase gate | Independently constructed task capability grant and boundary |
|---|---|---|---|
| Discover | Inventory events, states, components, expressions, runtime mappings, evidence, and gaps | P0-A before static read-only local discovery; P0-B additionally before model egress or a read connector | Grant only the exact enrolled roots, files, resources, read operations, data classes, and permitted egress needed for the task. Do not treat frequency or current deployment as correctness, and do not mutate anything. |
| Advise | Compare pattern options against user need, consequence, evidence, accessibility, and operations | P0-A for local discovery used by the advice; P0-B for any model egress or connected read | Grant only the scoped reads and processing needed to return advice. Do not decide controlled behavior, facts, policy, or legal meaning, and do not infer draft or write capability from access to evidence. |
| Draft | Produce proposed semantic decisions, state matrices, slot specifications, and scoped expressions | P0-A and P0-B as applicable to inputs; P0-C before producing a draft artifact | Grant the exact inputs, isolated draft target, permitted output type, and expiry. The grant does not include source-of-truth mutation; mark assumptions and approval needs and do not produce a universal copy library. |
| Apply | Change authorized occurrences using exact targets, expected-current checks, preview, rollback, and verification | P0-D before local apply; P0-E before remote apply, send, or publication; P0-G before any browser, device, emulator, build, server, or process execution used for runtime verification; any P0-A–C gates used in the same task must also pass independently | Grant the exact paths or remote objects, operations, base revision/current values, environment, and expiry after mandatory mutation/change approval. Releasable governed meaning also requires applicable semantic-decision approval; release requires a separate release approval when policy requires residual-risk acceptance. Runtime verification receives a separate exact execution grant; no approval or write grant authorizes it. Do not silently change application behavior or adjacent expressions. |
| Enforce | Run deterministic rules for approved, current, scoped contracts | P0-F before autonomous enforcement; P0-A or P0-B also applies to its read path; P0-G applies to any controlled runtime execution; and P0-D or P0-E applies separately if an enforcement workflow would mutate or publish | Grant the exact approved rule versions, repositories/branches or resources, allowed check or blocking action, execution profile where applicable, and duration. Any write additionally requires mandatory mutation/change approval; publication requires release approval when policy requires it. The agent cannot change rules, exceptions, baselines, severities, or grants, and probabilistic tone or preference judgments do not become blockers. |

## Research and implementation gaps

- **[Open question]** How should one semantic event vary across components, channels, locales, and assistive modalities without losing controlled meaning? Resolve through comparative prototype studies; accountable research roles: content design, localization, and accessibility research.
- **[Open question]** Which design-system pattern claims survive inspection of complete protocols, participant characteristics, raw results, failure cases, and longitudinal outcomes? Resolve through requests to source publishers and replication studies; accountable role: research lead.
- **[Open question]** What contracts work for partial success, cross-device continuation, shared accounts, delegated actors, multi-party consent, and ownership-transfer failure? Resolve through state-model fixtures, threat modelling, and scenario research with all affected roles; accountable roles: product-behavior owner and research lead.
- **[Open question]** What evidence supports agent tool permission, memory consent, generated-content provenance, uncertainty, reversibility after autonomous action, and human handoff after model failure? Resolve through agent-specific safety research and controlled task trials; accountable roles: AI safety, security/privacy, and content design.
- **[Open question]** Which domain overlays are required for health, finance, insurance, government, education, employment, children, safety-critical systems, marketplaces, and creator/platform ecosystems? Resolve through separate jurisdiction-scoped domain work with qualified governing-instrument owners and practitioners.
- **[Open question]** How do these practices hold in non-English languages, non-Latin scripts, right-to-left layouts, low-literacy contexts, shared devices, low bandwidth, offline/staff-assisted service, and multiple assistive technologies? Resolve through locale- and access-specific research led by qualified local-language and accessibility practitioners.
- **[Open question]** Which repository fixtures prove state discovery, semantic/expression identity, orthogonal evidence dimensions, independent decision/delivery states, separate evaluation records, stale-evidence handling, and safe refusal when facts are absent? Resolve through an implementation test corpus maintained by the system-maintenance role and reviewed by content governance.

## Minimum pattern artifact

**[Inference]** A repository pattern definition should be rejected as incomplete unless it can represent:

1. scope and maturity; exact evidence sources with orthogonal observation-strength, challenge, freshness, lineage, and epistemic dimensions; separately identified governing instruments with recorded applicability; accountable owners by responsibility type; authorized approvers and exact approval records; and semantic-decision version and independent decision state;
2. user need, actors/roles, event, entry points, preconditions, and semantic states;
3. content job, concepts, actions, consequences, recovery, and exceptions;
4. required and optional slots without fixed universal wording;
5. visible and assistive relationships, focus/announcement behavior, locale constraints, and privacy/security controls;
6. channel/surface/component applicability and counterexamples;
7. runtime triggers, variables, source occurrences, fallback behavior, and verification;
8. orthogonal evidence dimensions, independent decision/delivery states, and separate evaluation records;
9. evaluation hypothesis, measures, populations, limitations, and review triggers; and
10. unresolved questions, accountable decision-makers, and prohibited autonomous inferences.
