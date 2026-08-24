---
title: Surfaces, states, entry points, and content lifecycle
status: working-synthesis
started: 2026-08-17
updated: 2026-08-17
evidence_cutoff: 2026-08-17
---

# Surfaces, states, entry points, and content lifecycle

## Evidence boundary

This is an open coverage model for repository-native content design. It is intentionally broader than “UI copy.” It describes what the system must look for and reason about before it can claim to cover a product experience.

- **[Sourced fact]** WCAG 2.2 conformance applies to complete pages and, when a page is part of a process, all pages in that process. It separately requires descriptive headings and labels, text identification of errors, labels or instructions for input, accessible names and states, and programmatically determinable status messages. Source: [W3C, WCAG 2.2](https://www.w3.org/TR/WCAG22/).
- **[Sourced fact]** GOV.UK service guidance says teams should test the parts of an interaction that are online and offline, including letters, and test frequently with actual or potential users. Source: [GOV.UK, Make the service simple to use](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use).
- **[Inference]** A product-content system cannot use “files containing visible strings” as its experience boundary. A complete content boundary crosses channels, actors, states, time, locales, assistive representations, and sometimes organizations.
- **[Proposal]** Treat this taxonomy as a discovery checklist and coverage denominator, not a promise that every product has every listed item.

## The object being designed

“A string” is only the smallest stored representation. The content-design object is a message in an experience context.

| Level | Meaning | Example |
|---|---|---|
| Occurrence | Literal or resource value at one source location | `Save` in a JSX node |
| Message | User-visible or machine-delivered communication with variables and variants | `Save changes`, including disabled and saving states |
| Content decision | Why this message, terminology, action, order, and disclosure are appropriate | “Save” is accurate because this commits a draft without publishing |
| Experience event | Trigger, preconditions, state transition, consequence, and recovery | Draft changes → save requested → saved or conflict |
| Journey | Related events across channels and time | Create account → verify email → first-run setup → reminder |

- **[Inference]** One literal may serve several contexts, while several literals may be variants of one content decision. Counting strings alone can both overcount reuse and undercount missing states.
- **[Proposal]** Make the auditable unit `message-in-context`, linked to source occurrences and an experience event.

## Entry points

An entry point is how a person, system, or agent arrives at an experience or resumes it. Discovery should check at least the following families.

### Acquisition and navigation

- Home page, landing page, pricing page, campaign page, and product detail page.
- Search-engine result, answer-engine result, social preview, ad, referral, affiliate, and partner listing.
- Site navigation, app navigation, search, command palette, recent items, history, saved item, bookmark, and browser back/forward.
- Direct URL, route, deep link, universal link, app link, QR code, NFC link, and short link.
- App-store listing, extension marketplace, integration marketplace, package registry, install flow, and first launch.

### Identity, access, and handoff

- Sign in, sign up, single sign-on, passkey, magic link, password reset, device code, and account recovery.
- Invitation, shared link, transferred ownership, delegated access, role change, and approval request.
- Redirect from an identity provider, payment provider, bank, partner, embedded widget, or another first-party product.
- Permission prompt from the browser or operating system: camera, microphone, location, notifications, files, contacts, clipboard, biometrics, and tracking.

### Re-entry and interruption

- Push notification, email, SMS, in-app inbox, notification center, calendar event, webhook-derived alert, and reminder.
- Resumed session, abandoned flow, saved draft, background job completion, expired session, and cross-device continuation.
- Error recovery link, support reply, incident update, dispute response, security alert, and policy-change notice.
- Upgrade, downgrade, trial ending, payment failure, renewal, usage threshold, and paywall.

### Programmatic and non-visual entry

- API, SDK, CLI, chat command, voice interface, automation, scheduled workflow, browser extension, plugin, and agent-to-agent handoff.
- Screen-reader landmark or rotor, skip link, keyboard shortcut, voice-control label, and search within assistive technology.
- Offline launch, installed PWA, kiosk, wearable, TV, vehicle interface, and device notification action.

- **[Proposal]** For each product, mark each family `present`, `not present`, `unknown`, or `out of scope`, with evidence. Absence should never be inferred from a failed text search.

## Channels and content-bearing surfaces

### Product interfaces

| Surface family | Content-bearing examples that are often missed |
|---|---|
| Web, mobile, desktop | Navigation, breadcrumbs, tabs, filters, sort, search, tables, charts, pagination, keyboard commands |
| Forms and controls | Labels, legends, hints, units, masks, placeholders, defaults, inline validation, summaries, disabled reasons |
| Overlays | Dialogs, sheets, popovers, menus, tooltips, coach marks, banners, toasts, snackbars |
| System integration | Window titles, dock/menu-bar items, browser tabs, file pickers, share sheets, OS permissions, widgets |
| Rich and spatial media | Alt text, captions, transcripts, audio description, annotations, map labels, chart descriptions, image text |
| Conversational | Welcome, suggested prompts, turn-taking, tool consent, progress, refusal, uncertainty, citations, handoff, memory controls |
| Developer experience | CLI help, flags, prompts, progress, exit errors, API response messages, SDK errors, logs, docs, changelogs |

### Lifecycle communication outside the interface

| Channel | Examples |
|---|---|
| Email | Verification, invitations, receipts, alerts, digests, onboarding, support, lifecycle campaigns |
| SMS and messaging | One-time codes, alerts, appointment or delivery updates, two-way support |
| Push and notification center | Time-sensitive status, background completion, re-engagement, security |
| Documents | Invoices, receipts, statements, contracts, letters, labels, reports, PDFs, print output |
| Help and support | Help center, contextual help, chatbot, agent scripts, macros, contact forms, status page, incident updates |
| Marketing and discovery | Landing pages, SEO title/description, schema data, store listings, social previews, ads, release notes |
| Trust and governance | Consent, privacy, terms, disclosures, permissions, data export, retention, deletion, accessibility statement |

### Internal and intermediary surfaces

- Admin, moderation, risk, support, fulfillment, operations, and content-management consoles.
- Templates used by staff, partners, sellers, creators, or customers to communicate with another person.
- CMS entries, localization workbenches, design-file annotations, experiment consoles, feature-flag labels, and analytics event descriptions.
- Service-to-service events that become user content later, such as reason codes, webhook payload labels, or transaction states.

- **[Inference]** Internal copy can become external through screenshots, exports, support conversations, or templated messages. “Internal” is an access boundary, not a reason to ignore quality or terminology.

## Content forms beyond visible prose

Inventory must include:

- action labels, headings, body copy, labels, hints, descriptions, instructions, confirmations, and errors;
- names, terminology, taxonomy, categories, filters, facets, navigation labels, and information architecture;
- accessible names and descriptions, alt text, captions, transcripts, live-region announcements, and pronunciation guidance;
- placeholders only when they carry content, plus prefix/suffix text, units, formats, examples, and input masks;
- variables, select/plural variants, markup, links, legal qualifiers, dynamic values, and fallback text;
- URLs, slugs, file names, notification titles, subject lines, preview text, sender names, and metadata;
- machine-facing values that users encounter through developer tools, exports, logs, or integrations;
- empty-state illustrations with embedded text and rasterized or vector text in assets;
- order, grouping, progressive disclosure, defaults, visibility rules, and timing—not only words.

- **[Sourced fact]** WAI-ARIA defines roles, states, and properties for accessible interfaces; the W3C authoring guidance recommends visible text as the accessible-name source when it can appropriately name the control because that reduces drift and translation burden. Sources: [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) and [WAI, Providing accessible names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/).
- **[Proposal]** Store visible and assistive representations as linked fields and test for intentional equality or documented difference.

## UI and system states

The state inventory should be generated from the product state model, not from a generic list alone. The following list is the minimum probe set.

### Availability and progress

- initial/default;
- first use, new user, new object, or unconfigured;
- loading, skeleton, indeterminate progress, determinate progress, queued, processing, and background processing;
- partial data, progressive disclosure, paginated, streaming, cached, stale, refreshing, and degraded;
- ready, complete, or up to date;
- offline, reconnecting, rate limited, timed out, service unavailable, maintenance, and fallback.

### Interaction

- hover, focus, active/pressed, selected, checked, expanded/collapsed, dragged, and drop target;
- enabled, disabled with reason, read-only, locked, protected, and unavailable;
- default, changed/dirty, undoable, autosaving, saving, saved, synced, unsynced, and conflict;
- draft, scheduled, published, unpublished, paused, archived, deleted, restored, expired, and deprecated.

### Collection and validation

- optional/required, pristine/touched, accepted/rejected, incomplete, invalid format, out of range, duplicate, and mismatch;
- field hint, inline error, page-level error summary, cross-field dependency, server validation, and correction suggestion;
- single item, many items, maximum reached, no results, filtered-empty, true empty, cleared, and no longer available.

### Eligibility, identity, and trust

- signed out, authenticating, signed in, session expiring, session expired, reauthentication required, and recovery;
- role/permission allowed, denied, pending, requested, revoked, or inherited;
- eligible, not eligible, region-restricted, age-restricted, device/browser unsupported, and waitlisted;
- consent requested, accepted, declined, withdrawn, expired, changed, and partially accepted;
- verified, pending verification, failed verification, challenged, under review, approved, rejected, and appealed.

### Outcomes and recovery

- success with next step, receipt, or no further action;
- recoverable error, retry, alternative path, support escalation, saved work, and undo;
- partial failure, duplicate action, idempotent replay, irreversible consequence, cancellation, rollback, and compensation;
- security or privacy hold, suspected fraud, incident, policy block, legal hold, and compliance review.

### Locale and experiment variants

- source locale, target locale, untranslated, fuzzy/outdated, fallback locale, pseudo-locale, right-to-left, and locale-specific selector;
- personalized/default, experiment control/variant, feature flag on/off, plan tier, device class, and market variation.

- **[Sourced fact]** FormatJS supplies pseudo-locales for accented/expanded and right-to-left testing, and its verification command checks missing or structurally different translations. Source: [FormatJS CLI](https://formatjs.github.io/docs/tooling/cli/).
- **[Inference]** A single screenshot or design-frame scan cannot establish state coverage. It can only prove the state and visibility rendered at capture time.

## Lifecycle events and transitions

Content work should attach messages to events, because the same object noun and action verb change meaning across transitions.

| Event family | Representative transitions |
|---|---|
| Object lifecycle | create → edit → save → publish → unpublish → archive → restore → delete → export |
| Membership | invite → accept/decline → join → change role → remove → transfer ownership |
| Review | submit → request changes → approve/reject → appeal → revise → resubmit |
| Transaction | quote → authorize → pay → confirm → fulfill → cancel → refund → dispute → resolve |
| Subscription | trial → activate → renew → usage limit → payment failure → dunning → suspend → downgrade/cancel |
| Identity and trust | enroll → verify → challenge → recover → revoke → close account |
| Consent and policy | inform → request consent → accept/decline → change terms → renew/withdraw consent |
| Work execution | schedule → queue → start → pause → resume → complete → fail → retry → expire |
| Data movement | import → validate → map → sync → conflict → merge → export → purge |
| Incident | detect → acknowledge → investigate → mitigate → resolve → post-incident update |
| Localization | source change → translation → review → release → become stale → retire |

For every transition, ask:

1. What triggered it, and who or what triggered it?
2. What did the person intend, know, and expect before the transition?
3. What preconditions, permissions, limits, prices, risks, or consequences apply?
4. What is happening now, how long might it take, and may the person leave?
5. What changed, what did not change, and what happens next?
6. What can be undone, retried, corrected, cancelled, appealed, or escalated?
7. Which other channel or actor receives a message?

- **[Proposal]** A content inventory is incomplete when it records the success message but not its trigger, failure modes, recovery, consequential side effects, and receiving channels.

## Multi-actor and agentic experiences

Content decisions can address or affect:

- the primary user;
- another user, recipient, collaborator, approver, dependent, or beneficiary;
- a business, seller, creator, administrator, support agent, regulator, or partner;
- an automated agent acting for a person;
- an automated system making, recommending, or executing a decision.

Agentic products add content states that ordinary CRUD inventories miss:

- what the agent understood and which sources it used;
- plan proposed, plan changed, tool requested, permission requested, action in progress, and action completed;
- uncertainty, assumption, limitation, refusal, safe alternative, escalation, and human handoff;
- reversible preview versus committed external action;
- memory proposed, stored, updated, ignored, deleted, or unavailable;
- partial tool success, stale context, conflicting instructions, and source disagreement.

- **[Inference]** In an agentic interface, provenance, scope, permission, and action status are content—not implementation metadata hidden from users.

## Proposed inventory record

`message-in-context` is a working aggregate that links a semantic message decision, one or more expressions, and exact implementation occurrences. It is not yet a single stable identity. Fields may link to external records rather than duplicate them.

| Field group | Minimum fields |
|---|---|
| Semantic identity | stable message/decision ID; product; journey; event; actor or need; semantic state; intended outcome/content job; represented concept or action |
| Experience scope | feature; route/screen; audience; entry point; preconditions; jurisdiction and risk applicability |
| Trigger | initiating action/system event; preconditions; frequency; urgency |
| Expression identity | expression ID; message ID; locale; channel; surface; component/pattern; slot; visible/assistive modality; experiment or variant |
| Content | source text; linguistic branches; variables; markup; visible label; accessible name/description |
| Action model | primary and secondary actions; consequence; recovery; next state |
| Channel | surface; delivery channel; device; platform; entry point |
| Communication attempt, when applicable | attempt ID; message/expression/channel IDs; recipient scope; eligibility, preference/consent, suppression/deduplication, schedule and expiry; timestamped provider/client events and raw values; failure, retry, fallback, escalation, recovery; separate recipient-engagement event links; evaluation links |
| Language | source locale; target locales; fallback; register; plural/select requirements; direction |
| Evidence and control | factual evidence sources; governing instruments and applicability; accountable owners; authorized approvers and exact approval-record IDs; conflicts and evidence links |
| Implementation | file/node/entry; line or node ID; framework; runtime condition; feature flag |
| Evidence dimensions | observation: unobserved/observed/corroborated; challenge: undisputed/disputed; freshness: current/stale; lineage: active/superseded; epistemic qualifier: none/inferred/assumed; first seen; evidence date |
| Decision state | question/option/proposed/approved/rejected/superseded/deprecated/retired; decision version; exact approval-record IDs and scope |
| Delivery state | unmapped/mapped/patched/built/verified/released/observed-live/rolled-back/removed; exact occurrence, environment, and linked verification record |
| Evaluation-record links | evaluated object/version; question or hypothesis; method; population, sample, fixture, or environment; result; limitations and uncertainty; evaluator; date; unresolved risk |

- **[Proposal]** Keep evidence dimensions, decision/delivery states, communication-attempt and recipient-engagement events, and evaluations as independent records. A decision can be approved while no expression is implemented; an implementation can be live while a channel attempt fails; a provider delivery signal does not prove attention or comprehension; evidence can be corroborated, disputed, and stale simultaneously. Never infer one record from another. The canonical candidate definitions are in [candidate-system-model.md](../08-synthesis/candidate-system-model.md#independent-evidence-decision-and-delivery-records).

## Greenfield and takeover entry

### Greenfield

The content system can help establish:

- users, needs, risks, product boundaries, domain language, evidence sources, governing instruments, accountable owners, and approvers;
- navigation and object model before screens;
- voice principles, tone dimensions, terminology, and reusable patterns;
- state/event map, channel plan, localization model, accessibility content, and evaluation plan;
- implementation conventions and governance before content volume grows.

### Existing product takeover

The system must first discover and reconcile:

- implemented code and resource catalogs;
- rendered routes and runtime states;
- design files, prototypes, annotations, and component properties;
- CMS, help, lifecycle messaging, store listings, and localization systems;
- PRDs, policies, research, support evidence, analytics, and decision records;
- conflicting names, duplicated messages, unreachable text, missing states, stale translations, and undocumented behavior.

- **[Proposal]** Takeover begins with static or connected read-only Discover intent after P0-A for local reads and P0-B for model egress or connected reads, using an independently constructed exact read grant. Any build, server, browser, device, emulator, process, or rendered-state execution additionally requires a passing P0-G result and its own exact runtime-verification grant. Produce an evidence-linked baseline plus separate maps of governing-instrument applicability, accountable owners, authorized approvers, approval records, independent decision/delivery states, and evaluations before proposing any rewrite.
- **[Proposal]** Greenfield and takeover use the same eventual model, but takeover adds exact evidence sources and orthogonal observation/challenge/freshness/lineage/epistemic dimensions, conflict links, occurrence reachability, migration decisions, independent delivery states, and source lineage. It does not add a mixed discovery-confidence or migration-status enum.

## Coverage claims

Avoid statements such as “found all content” unless the denominator is explicit. Report coverage by layer:

- supported repositories, languages, frameworks, and file types scanned;
- routes/screens/states rendered and not rendered;
- design files/pages/frames inspected;
- CMS/localization projects and locales connected;
- external channels included or excluded;
- dynamic and generated content exercised;
- accessibility tree and non-visible names inspected;
- unknowns and permission failures.

- **[Proposal]** For each inventory finding, store the exact evidence source and evidentiary role plus the canonical orthogonal dimensions: observation strength (`unobserved`/`observed`/`corroborated`), challenge (`undisputed`/`disputed`), freshness (`current`/`stale`), lineage (`active`/`superseded`), and epistemic qualifier (`none`/`inferred`/`assumed`). `Declared` describes a source's role, not an evidence state; an unknown is a recorded gap or unanswered question. Failed discovery is not evidence of absence. Keep governing applicability, accountable owner, authorized approver/approval record, decision state, delivery state, and evaluation records separate.

## Gaps to research

- **[Open question]** Which content-bearing surfaces can a repository installer safely infer without credentials, and which require explicit connectors?
- **[Open question]** What is the smallest interoperable state/event schema that works across web, native mobile, service, and agentic products?
- **[Open question]** How should the system model experiments and personalization without collecting sensitive user attributes?
- **[Open question]** Which product lifecycle events require immutable decision records or regulated retention by domain?
- **[Open question]** How should generated user content and staff-authored templates be separated from product-owned interface content?

## Primary references

- [W3C, Web Content Accessibility Guidelines 2.2](https://www.w3.org/TR/WCAG22/)
- [W3C, WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/)
- [W3C WAI, Providing accessible names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/)
- [GOV.UK Service Manual, Make the service simple to use](https://www.gov.uk/service-manual/service-standard/point-4-make-the-service-simple-to-use)
- [FormatJS CLI](https://formatjs.github.io/docs/tooling/cli/)
