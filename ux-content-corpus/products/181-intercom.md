# 181. Intercom

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Customer messaging and AI support (helpdesk + AI agent) |
| Primary URL | https://www.intercom.com/ |
| Corpus rank | 181 |
| Benchmark strength (source list) | Support states and bot-human handoff |
| Locale / market observed | en (US default; help centre offers pt-BR, fr, de, ja, es) |
| Platform observed | Web (desktop marketing), help centre, product docs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial product. HIPAA support named as an Expert-plan feature; GDPR/recording-consent and BPO visibility controls named in changelog; `trust.intercom.com` is the security surface |
| Harvest date | 2026-09-22 |
| Pages inspected | 11 |
| Harvest completeness | Partial — `fin.ai` (Fin pricing page, Fin help centre) timed out on every attempt and is recorded as blocked. All Fin pricing and handoff detail below comes from `intercom.com` help articles instead, which carry the same definitions |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.intercom.com/ | Hero, two-product framing, pricing teaser, footer IA |
| Pricing | https://www.intercom.com/pricing | Three plans, add-ons, seat/outcome split, 14 collapsed FAQs |
| Tickets (product) | https://www.intercom.com/helpdesk/tickets | Ticket-type taxonomy, feature naming, 8 FAQ questions |
| Help centre home | https://www.intercom.com/help | 15 collections with scope lines and article counts |
| Help: Tickets collection | https://www.intercom.com/help/en/collections/3659257-tickets | Sub-collection names, article inventory |
| Help: Conversations collection | https://www.intercom.com/help/en/collections/3497074-conversations | Sub-collection names |
| **How ticket states work** | https://www.intercom.com/help/en/articles/9730130-how-ticket-states-work | **Primary T6 source** — four state categories with published definitions and behaviours |
| **Fin AI Agent outcomes** | https://www.intercom.com/help/en/articles/8205718-fin-ai-agent-outcomes | **Primary pricing-unit source** — outcome taxonomy, billable/non-billable table |
| **Manage Fin's escalation guidance and rules** | https://www.intercom.com/help/en/articles/12396892-manage-fin-ai-agent-s-escalation-guidance-and-rules | **Primary T9 source** — handoff copy, escalation triggers, Human in the Loop |
| Conversational Fin experience | https://www.intercom.com/help/en/articles/11433030-conversational-fin-experience | Escalation category table, feedback-request strings, follow-up timing |
| Customer portal explained | https://www.intercom.com/help/en/articles/8450754-customer-portal-explained | Customer-facing ticket list columns, view names, empty-cell convention |

---

## T1 Navigation & IA labels

**Global nav — utility-first, no feature mega-menu in server HTML** `[observed]`

`Log in` · `Contact sales` · `View demo` · `Start free trial`, plus a persistent
promotional strip: `Fin AI Agent→`.

**Footer — nine groupings, and the grouping names are verbs and stances, not objects** `[observed]`

`Fin features` · `Pricing` · `Solutions` · `Learn` · `Evaluate` · `Support` ·
`Company` · `Programs` · `Intercom in action`

`Evaluate` is the one worth stealing. It is a footer column named after the
*buyer's job* at that moment rather than after the content type, and it holds
`Why choose Intercom`, `Safety & security`, `ROI calculator`,
`Customer case studies`. Most B2B footers file those four under "Resources".
`Intercom in action` does the same job for the bottom of the funnel
(`View demo`, `Free trial`, `Contact sales`, `Sign in`).

**Help centre top level — 15 collections, each with a gerund scope line** `[observed]`

| Collection | Scope line (verbatim) | Articles |
|---|---|---|
| `Overview` | "Intercom is the only helpdesk with a natively integrated AI Agent, Fin." | 26 |
| `Getting Started` | "Everything you need to know to get started." | 37 |
| `Fin AI Agent` | "Using the most powerful Customer Agent in the market…" | 160 |
| `Channels` | "Enabling the channels you use to communicate with customers, all from the Inbox." | 96 |
| `Inbox` | "Boosting productivity with a workspace that connects your inbox, tickets, and help center." | 114 |
| `Workflows` | "Automating repetitive tasks for customers and teammates with our no-code visual builder." | 69 |
| `Knowledge` | "Managing all of your support content to empower your customers, AI agent, and teammates." | 54 |
| `Reports` | "Monitoring, analyzing and optimizing your support operation with real-time performance data." | 49 |
| `Outbound` | "Onboarding, educating, and notifying your customers with in-context, automated messages." | 138 |
| `Contacts` | "Tracking your customers in Intercom for better relationships." | 45 |
| `Apps & Integrations` | "Integrating apps with your workspace, and building your own custom apps." | 69 |
| `Mobile SDKs` | "Installing and using Intercom in your mobile app." | 16 |
| `Community` | "FAQs from our community forum." | 19 |
| `Academy` | "Using the Academy to level up and learn new skills." | 2 |
| `Security & Privacy` | "How Fin keeps your data secure, complies with global regulations…" | 47 |

Every scope line is a **present participle naming the admin's activity**
(`Enabling`, `Boosting`, `Automating`, `Managing`, `Monitoring`, `Tracking`,
`Integrating`, `Installing`) — the same grammar Wise uses, applied to an
administrator audience rather than a consumer one. Two break the pattern:
`Overview` uses the marketing boilerplate sentence verbatim, and `Community`
uses a bare noun phrase. Article counts are exposed on every collection, which
is a quiet honesty signal about where the product's complexity actually sits
(`Fin AI Agent` 160, `Outbound` 138, `Inbox` 114).

**Sub-collection grammar inside every collection is near-identical** `[observed]`

`Getting started` · `Creating` · `Managing` · `Best practices` · `FAQs`, plus
domain-specific ones (`Handling`, `Workload management`, `Automation`,
`Optimizing`, `Customizing`, `Troubleshooting`). The Fin collection swaps in a
lifecycle: `Train` · `Test` · `Deploy` · `Analyze`. That four-verb sequence is
reused as the in-product navigation, so the help IA and the product IA share
one vocabulary.

**Note a real IA defect:** `FAQs` appears as a sub-collection name **at least
fourteen times** across the tree (under Overview, Getting Started, Fin, Channels,
Phone, Switch, SMS, Inbox, Tickets, Conversations, Copilot, Workflows, Reports,
Outbound, Emails, Chats/Posts/Banners, Series, Tooltips, Surveys, Checklists,
Contacts, Apps, Mobile SDKs). In a flat search result or a breadcrumb trail,
`FAQs` is unresolvable without its parent. `Best practices` and `Managing`
repeat similarly.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> `A complete system for human and AI customer service`

The differentiator is a *completeness* claim, not a speed or price claim. The
subhead is a single long sentence built on a superlative-plus-mechanism-plus-
consequence chain: only helpdesk with a natively integrated AI agent → every
conversation improves the next → "enabling perfect experiences that were never
possible before."

**Section-header pattern: two-noun contrast resolved into one** `[observed]`

- `Two products,   one seamless experience`
- `Together, they deliver better  support experiences`
- `Intercom is a fully-featured  AI-powered helpdesk`
- `Fin is the  highest-performing AI agent`
- `Works with the tools  you already use`
- `Perfect customer experiences`

The two-product architecture (helpdesk + Fin) is the site's central content
problem, and the headline set is engineered around it: separate the two, then
rejoin them. Note the deliberate double-space line breaks in the source — these
are hard-coded visual line breaks inside headline strings, a localisation
hazard.

**Benefit headers are imperative or declarative sentences, never noun labels** `[observed]`

`Maximize productivity with an AI-enhanced inbox` ·
`Ticketing, built for collaboration` ·
`Support for customers, before they need it` ·
`Train and test Fin to handle complex queries` ·
`Deploy across every channel` · `Work together, seamlessly` ·
`Self-improving system` · `Centralised Knowledge Hub`

**Spelling inconsistency worth recording** `[observed]`: `Centralised Knowledge
Hub` (en-GB) sits four headings below `Centralize, manage, and optimize`
(en-US) in the same body copy on the same page. Intercom is Dublin-founded and
the en-GB forms leak through editorial review.

**Tickets page hero** `[observed]`: `Tickets that continue the conversation`,
with a three-negative subhead: "no switching tools, no lost context, and no
missed updates." The triple-negative construction is reused in the closing CTA
header `Get tickets that keep the conversation going`.

**Pricing page hero** `[observed]`:
`Get Fin and Intercom for a single, fully integrated customer service platform`
— a sentence-length headline that is functionally a product-bundle description,
which is unusual for a pricing hero.

**Numbers used as proof** `[observed]`: `Over 2,000 five-star reviews`,
`Trusted by 30,000+ leading brands`, `76% across 12,000+ customers`,
`many seeing over 85%`, `Over 60 improvements to the helpdesk`,
`350+ integrations`, `93% off` (startups), `~10% less verbose`.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start free trial` | Nav, hero, every section foot, pricing cards | Primary; repeated ~8× per page |
| `View demo` | Always paired with `Start free trial` | Consistent pairing across all surfaces |
| `Contact sales` | Nav, Essential/Fin-standalone cards | |
| `Get a demo` | Advanced and Expert pricing cards only | **Inconsistent with `View demo`** — same word, different determiner, on the same page |
| `View Demo` | Fin standalone card, pricing page | **Capitalisation defect** — `View Demo` vs `View demo` twice on one page |
| `Log in` | Global nav | |
| `Sign in` | Footer, `Intercom in action` group | **Second label for the same action** — same defect class as Wise's `Sign up`/`Register` |
| `Learn more` | Helpdesk feature cards (×3), add-on cards (×3) | Bare `Learn more`, six times, no object — the opposite of the Wise practice |
| `View all features` | Each of three pricing cards | |
| `View channel pricing` | Below the plan grid | |
| `Calculate costs` | Pricing estimator card | Verb + object |
| `Calculate savings` | ROI calculator card | Verb + object; near-twin of the above, different outcome noun |
| `Apply now` | Startup discount block | Only CTA on the site implying gatekeeping |
| `Join us on October 7` | Help centre event banner | Date-in-CTA |
| `Skip to main content` | Help centre, first in DOM | Accessibility; **absent from the marketing pages** |
| `Copy for LLM` | Help article header | A machine-audience CTA shipped as a first-class UI control |
| `Send us a message` | Customer portal ticket detail | `[documented]` |
| `Join conversation` | Messenger, when user is not yet a participant | `[documented]` |

**`Copy for LLM`** is the single most novel string in this file. Intercom ships
a button on help articles whose purpose is to serialise the article for
consumption by a language model. It appears on some articles and not others
(present on `How ticket states work`, `Fin AI Agent outcomes`,
`Customer portal explained`; absent on `Conversational Fin experience` and the
escalation article). The inconsistency suggests a staged rollout, but the label
itself — naming the LLM as the recipient, not the user — is a genuinely new CTA
category.

**Negative finding:** Intercom uses bare `Learn more` six times on the homepage
and pricing page. Where Wise consistently loads the object into the link text,
Intercom does not. Three consecutive add-on cards all end `Learn more`, so a
screen-reader link list yields `Learn more, Learn more, Learn more`.

## T4 Onboarding & getting-started

**The Fin lifecycle is a four-verb sequence used as IA, product nav, and docs tree** `[observed]`

`Train` → `Test` → `Deploy` → `Analyze`

Plus `Fin settings` and `FAQs` as non-sequential siblings. This is the clearest
onboarding spine in the file: the same four words name the help collections, the
in-product sections referenced throughout articles (`Fin AI Agent > Train >
Escalation`, `Fin AI Agent > Deploy > Chat`), and the marketing benefit blocks
(`Train and test Fin…`, `Deploy across every channel`, `Analyze performance…`).

**Trial framing** `[observed]`: `14 day free trial. No credit card required.`
placed directly under the hero CTA pair — the objection is answered before it is
raised. Note `14 day` unhyphenated where `14-day` would be correct as a compound
modifier.

**Setup-time claim as a feature bullet** `[observed]`:
`Set up in under an hour on your current helpdesk` — time-to-value stated as a
capability line item inside the Fin standalone card, not as marketing prose.

**Getting-started help collection** `[observed]`: `Setting up your workspace` ·
`Best practices` · `FAQs` — 37 articles.

## T5 Form & field labels

Almost entirely behind auth. What is publicly documented:

**Escalation Rule builder** `[documented]` — field labels quoted inside the
escalation article:

| Label | Notes |
|---|---|
| `+ New` | Creation affordance under both `Escalation Rules` and `Escalation Guidance` |
| `Audience` | Dropdown; default value is `Everyone` |
| `Channels` | Dropdown |
| `Fin will` | The verb-phrase field label that precedes the action selector |
| `Ask for input` | Option value under `Fin will` |
| `Threshold` | Low / Moderate (default) / High — controls how often Fin pauses |
| `Who to ask` | Routes to all teammates, a teammate, or a team |
| `Proceed after` | Fallback timer in hours and minutes |
| `Save` then `Enable` | Two-step commit — configuration is saved and activated separately |

`Fin will` as a field label is worth noting: it makes the settings row read as a
sentence (`Fin will` → `Ask for input`), which is a strong pattern for
rules-builder UIs where each row must be legible as a policy statement.

**Customer portal table columns** `[documented]`:
`ticket ID` · `type` · `state` · `created on` · `last updated`. Fixed set;
custom attributes cannot be added as columns even when marked `Visible to
customer` — Intercom documents this limitation in a `Note:` block rather than
hiding it.

**Macro variable** `[documented]`: `customer portal URL` — inserted via a
variable picker, resolved at send time not author time.

## T6 Status & state language — PRIORITY

### Ticket states: four categories, each with a published definition `[documented]`

Source: `How ticket states work`. Intercom does **not** ship a fixed state list.
It ships four **state categories**, and customers create named states inside
them that inherit the category's behaviour.

| Category (verbatim) | Published definition (verbatim, short) | Behaviour |
|---|---|---|
| `Submitted` | "The 'Submitted' state marks the initial phase of a ticket." | Assigned on creation; visible to customers when the ticket is shared |
| `In progress` | "The 'In Progress' state indicates that work is being done on a ticket." | Visible to customers when shared |
| `Waiting on customer` | "…indicates that a ticket requires additional information from the customer to proceed." | Can pause SLAs; a customer reply auto-returns the ticket to the default `In progress` state |
| `Resolved` | "The 'Resolved' state indicates the completion of work on the ticket." | Visible to customers; drives the `Time to resolve` metric; a customer reply does **not** reopen it |

**Casing defect:** the article writes `In progress` in the table's left column
and `"In Progress"` inside the definition sentence in the same row. Both forms
appear repeatedly throughout the article (`In Progress list`, `In progress
group`). For a document whose entire purpose is to define canonical state names,
this is the most consequential inconsistency in the file.

**Constraints, stated as rules** `[documented]`:

- "Every ticket type must include at least one state from each of these categories."
- "Ticket states can be used across multiple ticket types."
- "Ticket states across the workspace can't have the same internal label. However, they can share the same customer facing label."

That last rule is the important content-design artefact. Intercom formally
separates **internal label** from **customer facing label** and enforces
uniqueness only on the internal one. Two internal states — say `With Tier 2` and
`With Engineering` — may both surface to the customer as `In progress`. The
system is explicitly designed so the operational vocabulary and the customer
vocabulary can diverge. Slack and Jira notifications show the *internal* label;
Messenger, email, and the customer portal show the *external* label.

The article's own screenshot example names a custom in-progress state
`With Us` — a possessive, two-word, deliberately informal state name that
answers the customer's implicit question ("who has it right now?") rather than
describing system status.

**State-transition rules that carry user-visible consequences** `[documented]`:

- Customer reply on `Waiting on customer` → automatic move to the **first** state listed in the `In progress` group. Ordering in settings is therefore semantic.
- Customer reply on `Resolved` → **no** automatic reopen. Requires a workflow using the `Set ticket state` action.
- Adding a participant *by an end user* moves the ticket off `Waiting on Customer` and starts the SLA timer "even without a reply. This is expected behavior."
- `Resolved` → `Submitted` does not reset the SLA timer; `Waiting on customer` → `Submitted` un-pauses it.
- "Setting a ticket to resolved does not automatically close the conversation."

That final line is the Intercom equivalent of Wise's "complete when the money
hasn't arrived" gap: **`Resolved` and `closed` are different things, and the
product documents the divergence rather than reconciling it.**

### Ticket types — a three-way taxonomy `[observed]`

| Type | Marketing definition (paraphrased) |
|---|---|
| `Customer Tickets` | Conversation → ticket for complex issues; keeps the customer informed |
| `Back-office Tickets` | A separate ticket for internal teams, allowing private notes |
| `Tracker Tickets` | One ticket spanning many affected customers for a widespread issue |

`Tracker Tickets` is the coinage worth transferring: a named object for the
one-incident-many-customers case, which most helpdesks handle as an unnamed
bulk-reply convention.

### Conversation states (distinct from ticket states) `[documented]`

Named in passing across articles rather than in a single inventory:
`Spam` (a routed view in the Inbox), `Pending`, `Abandoned`, `Escalated`,
`Resolution`, `snoozed` / `unsnoozed` (from changelog:
`Unassign unsnoozed conversations`), `away mode`.

### Fin outcome states — the billing state machine `[documented]`

| State | Billed | Definition (verbatim, short) |
|---|---|---|
| `Resolution` | Yes, $0.99 | "No further help is requested after the last Al answer." |
| `Procedure handoff` | Yes, $0.99 | Fin executes a Procedure configured to end in a handoff |
| `Disqualification` | Yes, $0.99 | Prospect doesn't match qualification criteria |
| `Qualification` | Yes, $9.99 | Prospect matched and routed |
| `Self-serve qualification` | Yes, $0.99 | Matched to an outcome marked `Self-serve` |
| `Escalated` | No | Fin hands off on default behaviour or workspace rules |
| `Spam` | No | Routed to the Spam view |
| `Pending` | No | Outbound opened/clicked but not answered |
| `Abandoned` | No | No AI answer given and the customer leaves |
| `Abandoned — Not an outcome` | No | Fin asked a clarifying question; no reply; auto-close |

Two sub-species of resolution are named in prose: **`confirmed resolution`**
(customer says something affirmative) and **`assumed resolution`** (customer
exits without asking for more). The `Al` in the `Resolution` definition is a
verbatim typo in Intercom's own table — capital A, lowercase L, not `AI`.

## T7 Error, failure & recovery

`[documented]`, thin — Intercom's public error surface is mostly admin-facing.

- A dedicated article exists: `Customer portal errors explained` — errors get their own explainer, mirroring the Wise "why" pattern.
- Named error string: activating more than 100 guidance rules produces an **`'invalid parameters' error`**, and the article supplies the recovery in plain language — "combine similar rules or pause ones you don't need before activating new ones." The error message itself is generic and unhelpful; the help article is doing the work the error string should do. That is a recordable defect: a limit violation surfaced as a parameter-validation error.
- `Procedure Failure: A technical error or logic issue prevents a Procedure from finishing.` → state `Escalated`, not billed. Failure is modelled as a non-charging outcome, which aligns the pricing with the user's experience.
- FAQ-as-troubleshooting titles: `Why are conversations not escalating?`, `What should I do about forwarded emails?`
- Help sub-collection `Troubleshooting` exists only under `Product Tours`; elsewhere the equivalent is `FAQs and troubleshooting` (Messenger) — two labels for one function.

**Pre-emptive failure copy** `[documented]`: the escalation article ships a
section titled `When escalation offers don't appear` and another called
`Escalation will not be offered if` — negative-space documentation that tells
the admin what *won't* happen and why. Rare and valuable.

## T8 Empty states

`[absent]` for in-product empty states — all behind auth.

One near-miss is documented: the customer portal's `All` view uses an
**em-dash (—) to fill cells that don't apply to a given row's type**. That is an
empty-cell convention rather than an empty state, but it is an explicit
documented decision about how to render "not applicable" in a mixed-type table,
and the reasoning is given — a single status filter spans both ticket and
conversation states "so customers can filter without knowing which type they're
looking for."

The `No company` option in the ticket company dropdown is the nearest thing to a
named null value: it is a selectable value, not a blank.

## T9 Notifications, handoff & escalation copy — PRIORITY

This is the strongest section in the file. Intercom publishes more about how an
AI agent should announce a handoff than any other product in this batch.

### The default handoff line `[documented]`

> `Let me connect you with a teammate`

Quoted in the escalation article as the message "Fin posts a brief handoff
message (e.g. …) before routing" when an Escalation Rule matches. Six words,
first person, present tense, `teammate` not "agent" or "representative", and
crucially **no apology and no wait estimate**.

### The escalation *offer* line `[documented]`

> "I understand this is causing frustration. Would you like to speak with a
> human teammate, or would you prefer to continue working with me?"

Labelled by Intercom as the **Example offer message**. The structure is worth
decomposing:

1. **Name the emotion** — "I understand this is causing frustration."
2. **Offer, don't assume** — "Would you like to…"
3. **Present both options in parallel** — human teammate *or* continue with Fin
4. **Put the AI second** — "continue working with me" is the second branch, so the human option is not buried

No apology ("I'm sorry"), no self-deprecation ("I'm just a bot"), no urgency.
The AI refers to itself in the first person and to the human as a
`human teammate` — the adjective is doing the disambiguation.

### Offer vs. escalate — a documented six-category decision table `[documented]`

| Category | Fin behaviour |
|---|---|
| `Guidance` | Takes precedence over all other categories |
| `Request` | Customer clearly asks for a human → **escalates directly** |
| `Angry` | → **offers** to escalate (may try to resolve first) |
| `Loop` | Customer repeats across 3 rounds → **offers** |
| `How` | Customer asks *how* to reach support → **offers** |
| `Keyword` | Customer says "agent" or "support" → **offers** |

The asymmetry is the design: an explicit request gets an immediate handoff; an
inferred need gets an offer. Intercom states the rationale plainly — escalating
too early "reduces Fin's effectiveness" — and pairs it with a guardrail: "Fin
will never offer escalation twice in a row. If an offer to escalate is triggered
again immediately after a previous offer, Fin will escalate the conversation
straight away to prevent looping."

**A loop is defined numerically**: "3 rounds of replies, where a customer
repeats themselves without adding additional information." Publishing the
threshold is unusual and makes the behaviour auditable.

### How the wait is framed — the honest negative finding

Intercom's handoff copy **does not frame the wait at all**. There is no
published queue-position string, no "someone will be with you in X minutes", no
"we typically reply within an hour" in any harvested surface. What Intercom
publishes instead is:

- A **routing** story (workflows decide what happens next)
- An **identity** story: "The Messenger clearly indicates who is handling the conversation. Once a human agent takes over, responses will be identified by the agent's profile, making it clear that the customer is now speaking with a human support representative."

So the disambiguation burden is carried by the **avatar and profile**, not by a
sentence. For a corpus looking for transferable wait-framing copy, this is a gap
worth naming: the industry's most-copied AI handoff has no wait-expectation
string.

The one place waiting is addressed is the **pre-handover phase** — when "Ask for
more information before handover" is enabled, buttons may appear offering to
"confirm the issue is resolved or continue waiting." `continue waiting` exists as
a user choice, not as a system promise.

### Human in the Loop — a third state between bot and human `[documented]`

`Ask for input` is a mode where Fin pauses, asks a teammate privately, and then
writes the final reply itself. The teammate's three options are labelled:

- `Provide guidance` — Fin uses the input to write the reply
- `Approve the original draft` — send Fin's draft as written
- `Take over the conversation` — "Fin stops responding and the conversation is assigned to the teammate"

The customer-facing artefact here is described but not quoted: "the customer
receives a **short holding reply** so they know their message is being looked
at." The internal note surface is labelled `Ask a teammate`.

This is a genuinely distinct pattern: **the AI stays visible to the customer
while a human is consulted invisibly**. Intercom is careful to distinguish it
from escalation — "This is different from escalation — the conversation stays
with Fin."

### Feedback-request strings `[documented]`

Fin's confirmation prompts are no longer hardcoded; they are model-generated.
But the documented default bias is:

- First attempt: `Is that what you were looking for?`
- Subsequent attempts: `Did that answer your question?`

Documented contextual variants: `Did that solve the knowledge bases issue?`,
`Was that helpful for getting back to work?` — note the first of these is
ungrammatical ("the knowledge bases issue"), an artefact of slot-filling a
plural noun into a singular frame. Intercom published it anyway as an example.
A real cautionary case for generated microcopy.

Also documented: "Fin won't send a feedback request if the direct answer already
contains an inline question" — a de-duplication rule for question-asking.

### Follow-up timing `[documented]`

- Chat/Messenger: fixed **4 minutes** of inactivity, then Fin checks in. Not configurable.
- Email: configurable, **1 hour to 7 days**.
- Three named configurations: check in (default) / check in and offer escalation / turn off entirely.
- After follow-up with no reply, Fin "can send a close out message if you've configured this."

The 4-minute chat timer vs. 1-hour-minimum email timer is a defensible
channel-appropriate difference, and both are published.

### The false-positive warning — best negative finding in the batch `[documented]`

Intercom documents that its own resolution detection misreads patience as
satisfaction:

> "statements like 'I'm willing to wait for an update' or 'I'll wait for a
> resolution' may be read as acceptance of Fin's answer rather than a request
> for further assistance, triggering a confirmed resolution and closing the
> conversation."

And supplies the mitigation as a copy-pasteable guidance rule. Since
`confirmed resolution` is also the **billable** state, this is a case where a
comprehension failure and a revenue event coincide — and Intercom publishes it
rather than burying it.

### Other notification surfaces `[documented]`

- Article: `How customers get notified about tickets`
- `Customer notifications` — marketing feature name: "Give customers real-time updates over email and chat as their tickets progress."
- `Update customers in real time` — "Automatically share updates with your customers in the Messenger and over email."
- Changelog strings: `Delay send / undo send`, `Push notification management per device`, `Side conversation notifications`, `Email recipients status`

## T10 Disclosures, legal & compliance

Light — this is a B2B SaaS surface, not a regulated one.

**Pricing disclosures** `[observed]`

- "All plans include free, unlimited live chat, support email, in-app chats, banners, and tooltips. Pay-as-you-go for email campaigns, SMS, WhatsApp, and Phone." — one sentence separating unlimited from metered, placed directly under the plan grid.
- "Outcome-based pricing you control. Pay only for what you use and set spending limits so costs never exceed your budget."
- "Included in your free trial. Add or remove anytime." (add-ons)
- "Fin is available on every plan, but you won't be billed for Fin if you're not using it."
- "You will never be charged for an outcome that didn't happen… This means you're never paying for Fin's 'attempts' – only for the outcomes you get."
- "If a conversation is considered resolved… but the customer later returns to the same conversation seeking further assistance (even across billing periods) that resolution will be deducted and not charged." — a retroactive clawback rule, stated plainly.

**The pricing-unit vocabulary** `[observed]`

| Unit | Definition |
|---|---|
| `Seat` | Per-teammate charge; two grades, `Full` and `Lite` |
| `Lite seats` | Free allocations bundled by plan — "Includes 20 free Lite seats" (Advanced), "Includes 50 free Lite seats" (Expert) |
| `Fin outcome` | Per-conversation usage charge, `From $0.99 per Fin outcome` |
| `Per Outcome` / `per Fin outcome` | Two renderings of the same unit on two pages |
| `Per Seat/Mo` / `per seat/mo` | Likewise |
| Add-on | `Pro` from `$99/mo`, `Copilot` `$29 per agent/mo`, `Proactive Support Plus` `$99/mo` |

**`agent` vs `teammate` vs `seat` — an unresolved three-way terminology
collision.** The Copilot add-on is priced `per agent/mo` while plans are priced
`per seat/mo`, and the humans are called `teammates` everywhere in the help
centre, while `AI Agent` is the name of the *machine*. So `agent` refers to a
human in the pricing table and to the AI in the product name, on the same page.
This is the clearest terminology defect in the file.

**Legal footer** `[observed]`: `Terms` · `Privacy` · `Security`, plus
`Your Privacy Choices` with a privacy-check icon. Security is delegated to
`trust.intercom.com`.

**Compliance named as features** `[observed]`: `SSO & identity management`,
`HIPAA support`, `Service level agreements (SLAs)` — all three sit inside the
Expert plan's bullet list, framing compliance as a purchasable tier rather than
a baseline.

**Accessibility statement** `[absent]` — no accessibility policy or VPAT link
found in the footer or help centre during this harvest.

## T11 Help-centre architecture

Three levels: **Collection → sub-collection → article**, with article counts
exposed at every level. Breadcrumbs render as
`All Collections > Inbox > Tickets > Getting started > How ticket states work`.

**Article-title grammar — five consistent shapes:**

| Shape | Example |
|---|---|
| `<Noun> explained` | `Tickets explained`, `Customer portal explained`, `Customer portal errors explained` |
| `How <thing> work(s)` | `How ticket states work`, `How to manage Customer tickets` |
| Imperative verb-first | `Manage Fin AI Agent's escalation guidance and rules`, `Customize ticket states`, `Deploy Fin AI Agent over chat` |
| `Using <X> in <Y>` | `Using ticket states in Workflows`, `Using ticket triggers with Workflows` |
| Bare noun phrase | `Ticket Assignment Limit`, `Conversational Fin experience` |

The `<Noun> explained` shape is Intercom's signature and it is applied
consistently, including to failures (`Customer portal errors explained`).

**In-article furniture** `[observed]`, consistent across every article:

- Author byline (`Written by Beth-Ann Sher`) and a **relative** update stamp (`Updated over a week ago`, `Updated over 3 weeks ago`, `Updated yesterday`)
- An `On this page` anchor list
- Inline `Note:`, `Important:`, and `Tip:` blocks as a three-tier severity system
- A closing `💡Tip` panel: **`Need more help?`** → "Get support from our Community Forum"
- A three-emoji satisfaction widget labelled `Did this answer your question?` with `Disappointed Reaction` / `Neutral Reaction` / `Smiley Reaction` as the accessible names
- `Related Articles` list

**Routing furniture is community-first, not contact-first.** The escalation
route at the foot of every article is the **Community Forum**, not a contact
form. `Contact sales` is in the header; there is no `Contact support` link on
the public help surface at all. Intercom's own customer-facing support is
gated behind login — a notable choice for a company selling support software.

**Relative timestamps are a defect at scale.** `Updated over a week ago` on a
document defining canonical state names tells a reader nothing about whether
the definition predates a product change. `Conversational Fin experience` is the
exception, carrying an absolute date (`June 19, 2026`).

## T12 FAQs

**Placement 1 — pricing page, `FAQs` heading, 14 questions, all collapsed.**
Only the first answer is in server HTML.

| # | Question (verbatim) |
|---|---|
| 1 | How does Intercom pricing work? |
| 2 | How is Fin AI Agent priced? |
| 3 | Can I use Fin with my existing helpdesk? |
| 4 | What plans does Intercom offer? |
| 5 | What is a seat (Full vs Lite)? |
| 6 | Are there additional usage charges? |
| 7 | What is Proactive Support Plus? |
| 8 | How much is Copilot? |
| 9 | What is the Pro add-on? |
| 10 | Do I need a contract? |
| 11 | What's the minimum to get started? |
| 12 | Is there a free trial? |
| 13 | How do I change my plan or seats? |
| 14 | Are there discounts available? |

Ordering: mechanism → unit definition → plan → seat definition → overages →
add-ons (three consecutive) → commitment → floor → trial → change → discount.
The list is effectively a **glossary in question form**: Q5 and Q7–Q9 exist
purely to define coined terms (`seat`, `Proactive Support Plus`, `Copilot`,
`Pro add-on`). Q1's visible answer uses a two-bullet structure —
`Seats:` and `Usage:` — and closes by routing to the calculator, which is the
Wise "claim, bound, personalise" move applied to pricing.

**Placement 2 — tickets product page, `FAQs`, 8 questions.** Only Q1's answer
is in server HTML.

| # | Question (verbatim) |
|---|---|
| 1 | What is a ticketing system in Intercom? |
| 2 | What are the different ticket types in Intercom? |
| 3 | How does Intercom's ticketing use AI? |
| 4 | How do I turn a conversation into a ticket? |
| 5 | How is a tracker ticket different from a back-office ticket? |
| 6 | Can I move to Intercom from another helpdesk like Zendesk? |
| 7 | What can Intercom's ticketing integrate with? |
| 8 | How do SLAs and reporting work with tickets? |

Q6 names a competitor in the question text. Q5 is a **disambiguation FAQ** —
its only job is to separate two of Intercom's own coined terms, which is an
admission that the `tracker` / `back-office` distinction doesn't self-explain.

**Placement 3 — inside help articles.** Both the ticket-states and outcomes
articles carry embedded `FAQs` sections with question-shaped headings, e.g.
`What happens to SLAs if a ticket is moved back to a Submitted state?`,
`If a customer is frustrated with Fin's answer and just leaves, is that billed?`,
`Can escalation guidance stop Fin from escalating?`. These are edge-case
registers rather than beginner questions — the FAQ block is used as an
exception-handling appendix.

**Markdown defect:** the embedded FAQ headings render as
`**### Can I close conversations instead of escalating?**` — bold markers
wrapped around a heading, producing literal asterisks in the extracted text.
Present across multiple articles.

## T13 Terminology & glossary — PRIORITY

| Term | Intercom's usage | The alternative it rejected |
|---|---|---|
| `Fin` | The AI agent, named as a person, referred to as "it" in docs and "I/me" in its own copy | "the bot", "the assistant" |
| `Fin AI Agent` | Full form in marketing and settings paths | "chatbot" |
| `teammate` | The human support person, throughout the help centre | "agent" (which is reserved for the AI), "rep" |
| `agent` | Used for humans **only** in pricing (`per agent/mo`) and metrics | — *collides with `AI Agent`* |
| `seat` | The billing unit; grades `Full` and `Lite` | "user", "licence" |
| `outcome` | The usage billing unit — a *result*, not an action | "resolution" alone, "interaction", "message" |
| `resolution` | A **sub-type** of outcome, split into `confirmed` and `assumed` | — |
| `escalation` | Handoff Fin initiates on default/workspace rules — **explicitly not billable** | "transfer", "handover" |
| `handoff` / `handover` | Both spellings used; `Procedure handoff` is the billable object, `handover message` the copy | *inconsistent within one article* |
| `Procedure` | A configured multi-step task Fin executes | "playbook", "macro", "flow" |
| `Guidance` | Natural-language instruction to Fin's model | "prompt", "rule" |
| `Escalation Rule` vs `Escalation Guidance` | Data-driven vs natural-language — a deliberate two-mechanism split | — |
| `Workflow` | Visual no-code builder for post-escalation routing | "automation", "trigger" |
| `Copilot` | AI assistant **for the teammate**, distinct from Fin (for the customer) | — |
| `Operator` | "an agent for your customer operations", bundled in the `Pro` add-on | — |
| `Knowledge Hub` | Centralised content store powering Fin, Copilot and Help Center | "knowledge base", "CMS" |
| `Tracker ticket` | One ticket spanning many affected customers | "mass incident", "parent ticket" |
| `Back-office ticket` | Internal-team ticket allowing private notes | "internal ticket", "task" |
| `Side conversation` | Thread with an external partner inside a customer conversation | "CC", "forward" |
| `Lite seat` | Collaborator-grade access for back-office teams | "light user", "viewer" |
| `Messenger` | The customer-facing chat surface (capitalised, product noun) | "widget", "chat" |
| `Tickets space` | The area of the Messenger listing a customer's tickets | "My tickets" |
| `Customer portal` | The logged-in external ticket list (renamed from `Tickets portal` — the old URL slug survives and redirects) | — |
| `Simple deploy` vs `Advanced Workflows` | Two named configuration modes | "basic"/"advanced" |
| `Let Fin handle` / `Let Fin answer` / `Let customer type` | Workflow step names, written as imperative sentences | — |
| `Human in the Loop` | Fin pauses and consults a teammate without handing over | — |
| `Ask a teammate` | The inbox note surface for the above | — |
| `internal label` vs `customer facing label` | Formally separated state names | — |
| `Fin attribute` | Model-inferred conversation attributes (`Sentiment`, `Issue Type`, `Topic`) | "tags", "intents" |
| `Automation Rate`, `Resolution Rate`, `Involvement`, `CX Score` | Named Fin metrics | — |

**Register split.** Marketing writes `Fin AI Agent` and `Intercom helpdesk`;
help writes `Fin` and `the Inbox`. Same pattern as Wise — the long form lives
where the reader is being sold to, the short form where they are already inside
the task.

**The `Let Fin handle` step-name family** is the most transferable coinage:
workflow steps named as permission grants rather than as actions
(`Let Fin handle`, `Let Fin answer`, `Let customer type`). The admin is
configuring *what is allowed*, and the grammar says so.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the admin throughout ("you can",
"you'll be charged", "your customers"). First-person plural for the company is
**rare** — the help centre is written almost entirely in an impersonal
instructional voice ("Navigate to…", "Click **Save**"). The exceptions cluster
in pricing ("We only count outcomes… and charge for them when Fin actually
delivers a successful result").

Fin itself speaks in the **first person singular** ("Let me connect you",
"I understand this is causing frustration", "continue working with me"). The
company is plural, the AI is singular. That is a deliberate and consistent split.

**Register.** Marketing is short, declarative, contraction-light, and superlative-
heavy ("the only helpdesk", "the highest-performing AI agent", "the most powerful
Customer Agent in the market"). Help is dense, procedural, and heavily
annotated with `Note:` / `Important:` / `Tip:`. No exclamation marks in either.
No `Oops!`.

**Tone does not flatten as stakes rise — it *thickens*.** Where Wise strips
colloquialism out of its fee table, Intercom adds *more* qualifying prose to its
billing article than to any marketing page. The outcomes article contains three
tables, seven definitions, and nine FAQs to explain a single $0.99 unit. That is
a defensible response to a genuinely novel pricing model, but it means the
highest-stakes page is also the longest.

**Emoji.** Used sparingly and functionally in help: `💡Tip`, `📖 Learn how to…`,
`👇` ("To see the ticket state in your inbox dropdown 👇"). The satisfaction
widget uses `😞 😐 😃`. None on marketing pages.

**Accessibility** `[observed]`

- `Skip to main content` present and first in DOM **on the help centre**; the marketing site has no equivalent in the harvested HTML.
- Help-centre article images carry **genuinely descriptive alt text**, and it is scene-level and purposeful: "Overview of the Customer Portal showing a list of company tickets with columns for ticket ID, type, state, created date, and last updated date", "Ticket detail view in the Customer Portal showing ticket status, ID, type, description, and a Send us a message button", "Macro composer with the variable picker open, showing available attributes including Customer portal URL". This is well above the norm for screenshot-heavy documentation.
- **But the same article mixes practice.** Older images in `Customer portal explained` and every image in `How ticket states work` and `Manage Fin's escalation guidance and rules` carry **empty alt** on CDN-hosted screenshots that carry real instructional content (settings screens, workflow diagrams, state dropdowns). So the alt-text improvement is recent and partial, and the most state-definitional article in the corpus — `How ticket states work` — has none of it.
- Marketing hero images: `![](…)` with no alt, four consecutive gallery images. Footer gallery images *do* carry alt ("Illustration of a couple walking under palm trees on a beach", "Black ink illustration of a flower") — decorative images described, instructional images not. That is precisely inverted from correct practice.
- Satisfaction reactions have accessible names (`Disappointed Reaction`, `Neutral Reaction`, `Smiley Reaction`) rather than bare emoji.
- `Your Privacy Choices` link present in every footer.
- No accessibility statement, VPAT, or conformance claim found. `[absent]`

**Negative findings, recorded honestly**

1. `In progress` vs `In Progress` inconsistently cased **inside the canonical state-definition article**.
2. `agent` means a human in pricing and a machine in the product name, on the same page.
3. `Log in` (nav) vs `Sign in` (footer) for one action.
4. `View demo` vs `View Demo` vs `Get a demo` — three renderings on the pricing page.
5. Bare `Learn more` used six times without an object.
6. `Centralised` (en-GB) and `Centralize` (en-US) within four headings of each other.
7. `14 day free trial` missing its hyphen.
8. `Al answer` — capital A, lowercase L — in the `Resolution` definition table.
9. `handoff` and `handover` used interchangeably within a single article.
10. `**### Heading**` markdown artefacts across multiple help articles.
11. `FAQs` used as a sub-collection name ~20 times, unresolvable out of context.
12. Relative update stamps (`Updated over a week ago`) on definitional documents.
13. Hard-coded double-space line breaks inside headline strings (`Two products,   one seamless experience`) — a localisation hazard.
14. Help-centre article titles and URL slugs have drifted: `8450754-tickets-portal-explained` redirects to `…-customer-portal-explained`; `8687982-customize-ticket-states` is linked in one place as `8687982-ticket-states-explained-beta`. Old names survive in link text inside current articles.
15. Instructional screenshots carry empty alt while decorative footer illustrations carry descriptive alt — inverted.

---

## Transferable patterns

1. **Separate the internal state name from the customer-facing state name, and enforce uniqueness only on the internal one.** Intercom's rule — "Ticket states across the workspace can't have the same internal label. However, they can share the same customer facing label" — is the cleanest mechanism in the corpus for letting operations get granular without leaking granularity to the user. Ten internal queues can all read `In progress`. Directly transferable to dispute, refund, and case-status surfaces where PayPal's internal states outnumber what a customer should see.

2. **Model states as *categories* with published behaviours, not as a fixed list.** Four categories (`Submitted` / `In progress` / `Waiting on customer` / `Resolved`), each with a defined SLA effect, visibility rule, and reply-handling rule. Custom states inherit the category's behaviour. This means a new state can be added without redesigning the transition logic or the copy rules. Condition: only works if every state's behaviour is genuinely determined by its category — the moment a state needs bespoke behaviour the model leaks.

3. **The offer/escalate asymmetry for AI handoff.** Explicit request → escalate immediately. Inferred frustration, loop, or keyword → *offer*, don't assume. Plus the anti-loop guard: never offer twice in a row; the second trigger escalates outright. This is the single most reusable artefact in the batch for any AI-assisted service surface. Condition: the offer must present both branches in parallel and put the human option first.

4. **Name the emotion, offer the choice, keep the AI second.** "I understand this is causing frustration. Would you like to speak with a human teammate, or would you prefer to continue working with me?" — no apology, no self-deprecation, the AI in first person, the human described with a disambiguating adjective (`human teammate`). Twenty words doing four jobs.

5. **Publish the false-positive case.** Intercom documents that "I'm willing to wait" is misread as satisfaction, and ships the fix as copy. Any product with intent detection should maintain and publish a list of phrases its classifier gets wrong. Condition: only credible if the fix is shipped alongside the admission.

6. **Price the outcome, not the attempt — and say so.** "You're never paying for Fin's 'attempts' – only for the outcomes you get", plus a retroactive clawback when a "resolved" conversation reopens. The pricing model and the success model are the same object, so the vendor's incentive is legible to the buyer. The content design consequence: every state in the state machine needs a published billable/non-billable flag.

7. **A third state between bot and human.** `Human in the Loop` / `Ask for input` — the AI stays visible to the customer while a human is consulted invisibly, and the customer gets "a short holding reply". Most products binary-split bot vs. human. Condition: requires a holding-reply string that doesn't over-promise, and Intercom conspicuously does not publish theirs.

8. **`Copy for LLM` as a first-class help-centre control.** Naming a machine as the recipient of a copy action. Whether or not the button is good, the label is the first of its kind in this corpus and worth tracking.

## Caveats & gaps

- **`fin.ai` is blocked for this harvest.** `https://fin.ai/pricing` and `https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes` both aborted on repeated attempts. Fin's standalone pricing page, Fin help centre, capabilities page, AI-engine page, ROI calculator, and the `fin.ai/guarantee` page are all unharvested. The outcome definitions captured here come from the equivalent `intercom.com` article and should be equivalent, but the standalone-Fin plan structure (base plan, included resolutions) is **not** verified from a primary source and is therefore omitted rather than guessed.
- **All FAQ answers are collapsed.** 22 FAQ questions captured verbatim across two pages; only two answers are in server HTML. Answer structure for the other 20 is unknown.
- **No in-product strings observed.** Every ticket state name, handoff line, error, and toast in this file is `[documented]` — quoted inside a help article describing the UI — not seen live. The `Let me connect you with a teammate` string in particular is given as an example ("e.g.") rather than as a guaranteed literal, and Intercom explicitly says word-for-word control requires a Workflow.
- **Empty states, validation messages, and toasts are entirely absent.** All behind auth.
- **`status` page not harvested.** Intercom's status link points to `finstatus.com`, which was not fetched; incident-communication vocabulary is unexamined.
- **`trust.intercom.com` not harvested** — the security and compliance disclosure surface is unexamined.
- **Only English observed.** The help centre offers five other locales; no comparison was made, so nothing here should be treated as evidence about Intercom's localisation practice.
- **Help-article bodies were opened for five articles only.** The other ~950 articles are represented by collection names and counts alone.
- **`Copy for LLM`** was not clicked; whether it produces different text from the rendered article is unknown.

## Sources

1. https://www.intercom.com/
2. https://www.intercom.com/pricing
3. https://www.intercom.com/helpdesk/tickets
4. https://www.intercom.com/help (redirects to https://www.intercom.com/help/en)
5. https://www.intercom.com/help/en/collections/3659257-tickets
6. https://www.intercom.com/help/en/collections/3497074-conversations
7. https://www.intercom.com/help/en/articles/9730130-how-ticket-states-work
8. https://www.intercom.com/help/en/articles/8205718-fin-ai-agent-outcomes
9. https://www.intercom.com/help/en/articles/12396892-manage-fin-ai-agent-s-escalation-guidance-and-rules
10. https://www.intercom.com/help/en/articles/11433030-conversational-fin-experience
11. https://www.intercom.com/help/en/articles/8450754-tickets-portal-explained (redirects to `…-customer-portal-explained`)

**Blocked:** `https://fin.ai/pricing`, `https://fin.ai/help/en/articles/13975800-fin-pricing-outcomes` — repeated fetch aborts.
