# 182. Zendesk

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Customer service ticketing platform (helpdesk, CX suite) |
| Primary URL | https://www.zendesk.com/ |
| Corpus rank | 182 |
| Benchmark strength (source list) | Ticket status and self-service |
| Locale / market observed | en-US (18 locale variants exposed in a language switcher on every page) |
| Platform observed | Web (desktop marketing), help centre (`support.zendesk.com`), product docs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated financial product. **Accessible Canada Act** principles explicitly addressed in the published Accessibility Plan; WCAG 2.2 AA named as the product standard; industry pages exist for Financial Services, Government, and Healthcare implying sector-specific obligations |
| Harvest date | 2026-09-22 |
| Pages inspected | 9 |
| Harvest completeness | Partial — `support.zendesk.com/hc/en-us` (help-centre index) aborted on repeated attempts; `status.zendesk.com` not reached. Ticket-status, escalation, pricing-unit and accessibility material was fully retrieved, which covers the stated benchmark strength |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.zendesk.com/ | Hero, nav IA with scope lines, 6 FAQs with visible answers, footer |
| Pricing | https://www.zendesk.com/pricing/ | Four plans, seat pricing, add-ons, 12 FAQs with visible answers |
| Ticketing (product) | https://www.zendesk.com/service/ticketing-system/ | Feature naming, 11 FAQs with visible answers |
| **About the ticket lifecycle and ticket statuses** | https://support.zendesk.com/hc/en-us/articles/8263915942938-About-the-ticket-lifecycle-and-ticket-statuses | **Primary T6 source** — the canonical six-status definition set |
| **What are the customer portal ticket statuses?** | https://support.zendesk.com/hc/en-us/articles/4408825864858-What-are-the-customer-portal-ticket-statuses | **Second T6 source** — the 6→3 agent-to-customer status mapping |
| **Configuring escalation strategies and flows for AI agents** | https://support.zendesk.com/hc/en-us/articles/8357756604186-Configuring-escalation-strategies-and-flows-for-AI-agents | **Primary T9 source** — escalation blocks, availability blocks, fallback |
| **About automated resolutions for AI agents** | https://support.zendesk.com/hc/en-us/articles/5352026794010-About-automated-resolutions-for-AI-agents | **Primary pricing-unit source** — channel-by-channel resolution definition |
| Zendesk Accessibility Plan | https://support.zendesk.com/hc/en-us/articles/10831381898650-Zendesk-Accessibility-Plan | Full published plan, WCAG 2.2 AA commitment, feedback process |
| Help section: Views, ticket status, and ticket fields | https://support.zendesk.com/hc/en-us/sections/5346334218778-Views-ticket-status-and-ticket-fields | Renders with **no article list** in server HTML — a recorded defect, see T11 |

---

## T1 Navigation & IA labels

**Global nav — four groupings, and every single link carries a one-line scope
sentence** `[observed]`

`Platform` · `Products` · `Solutions` · `Resources`, plus `Pricing`, `Sign in`,
`View demo`, `Contact us`.

This is the standout IA practice in the file. Zendesk does not ship a bare link
list; every nav item is a **label + benefit sentence** pair:

| Label | Scope line (verbatim) |
|---|---|
| `Zendesk Resolution Platform` | "Deliver faster, higher quality resolutions with the only AI-first service platform" |
| `Zendesk AI` | "Power your service with AI that continuously improves every resolution" |
| `Reporting and analytics` | "Turn service insights into better outcomes" |
| `Marketplace` | "Find 1,800+ apps, partners, and integrations to serve customers and employees" |
| `Security and Trust` | "Deploy trusted service with enterprise-grade security and AI governance" |
| `Customer Service` | "Manage and resolve customer inquiries across all channels in one place" |
| `Employee Service` | "Give employees the fastest resolutions through a scalable, intuitive platform" |
| `Contact Center` | "Deliver AI-powered resolutions for every call, every channel, every time" |
| `AI agents` | "Resolve even the most complex issues on any channel autonomously" |
| `Copilot` | "Empower service teams with the only proactive AI assistant" |
| `Quality assurance` | "Improve your service overtime with automatic human and AI agent scoring" |
| `Workforce Management` | "Forecast, staff, and manage agent schedules with AI-powered precision" |
| `Ticketing` | "Track, organize, and resolve all your tickets in one place" |
| `Knowledge base` | "Power every resolution with connected knowledge" |
| `Voice` | "Manage and resolve customer calls with AI" |

Nearly every scope line contains the word `resolve`, `resolution`, or
`resolutions`. That is not accidental — see T13.

**Typo in the nav, shipped:** `Quality assurance` reads "Improve your service
**overtime** with automatic human and AI agent scoring." `overtime` should be
`over time`. It appears in the nav on **every page of the site** and is repeated
verbatim on the ticketing product page ("Improve overtime with historical
reporting"). Two instances, same error, in high-traffic chrome.

**`Solutions` splits by two axes with explicit sub-headers** `[observed]`:
`Common use cases` and `By business type` — ten industries each with a
five-to-seven-word benefit line (`Government` → "Reliable support that serves
every citizen"; `Healthcare` → "Build healthier patient experiences").

**Footer — six groupings** `[observed]`: `Products` · `Features` · `Resources` ·
`Company` · `Compare` · `Popular topics`.

Two of these are unusual. **`Compare`** is a footer column containing only
`Zendesk vs. Intercom`, `Zendesk vs. Salesforce`, `Zendesk vs. Freshdesk` —
competitor comparison pages promoted to permanent site furniture. **`Popular
topics`** is a visibly SEO-driven column of ten keyword-phrase links
(`Help desk ticketing software`, `Forum software`, `Client portal software`).
The register difference between `Popular topics` and every other footer column
is stark: these are search queries, not product names.

`System status` sits in the `Products` footer column, and `Accessibility Plan`
sits in `Company` — both promoted to first-class footer links.

## T2 Value proposition & headline patterns

**Hero — a two-part construction: category claim, then a repudiation** `[observed]`

> H1: `AI-powered customer service platform`
> H2: `Move beyond deflection. Deliver real resolutions.`

`Move beyond deflection` is the most pointed piece of positioning in this batch.
`Deflection` is the incumbent industry metric for chatbot success — the number
of tickets *prevented* — and Zendesk names it in order to reject it. The
antonym pairing (deflection / resolution) is the spine of the whole site.

Subhead: "Self-improving AI agents that learn, adapt, and outperform. On every
channel, on any platform." Three verbs, no objects — an unusual truncation.

**Section headers are sentence fragments ending in full stops** `[observed]`

`AI that gets smarter with every resolution.` ·
`Trillions of data points turned into billions of successful outcomes.` ·
`Self‑improving AI Agents on any platform` ·
`Designed for AI-first customer service` ·
`Built for businesses of all sizes` ·
`Connect your ecosystem. Your way.` ·
`Pricing built for your success` ·
`Launch your first AI agent today` ·
`Trusted by teams everywhere.` ·
`Frequently asked questions, answered.`

The full-stop-on-a-fragment habit is consistent enough to be a house style.
`Frequently asked questions, answered.` is a small but effective move — turning
a standard section label into a promise by appending one word.

**Benefit bullets are verb-first imperatives** `[observed]`:
`Manage high volume autonomously` · `Launch in minutes, not months` ·
`Scale without adding headcount` · `Trust every AI-driven resolution` ·
`Modernize voice with Agentic AI`

`Launch in minutes, not months` is a **contrast-pair time claim**, the same
construction Zendesk uses in a customer quote ("fully up and running in just
hours, not weeks"). The X-not-Y time frame is a recurring device.

**Numbers as proof** `[observed]`: `22,000+ service teams`, `80,000+ companies`,
`830M AI interactions`, `4.8B Resolutions delivered`, `up to 80% automation`,
`up to 80%+`, `1,800+ apps`, `average ROI of 301% over three years`,
`support for 80+ languages`.

**An honesty note worth recording** `[observed]`: the ROI calculator carries a
bounding disclaimer — "Results are illustrative and based on the inputs you
provide — actual results may vary." Zendesk bounds its own calculator's output
in the copy beside it, which is the Wise claim-and-bound pattern applied to a
sales tool.

**Ticketing page hero** `[observed]`: eyebrow `Help desk ticketing software`,
H1 `AI-powered ticketing system`, and a subhead ending `No expertise needed.`
That last three-word sentence is repeated as a nav-adjacent promise
("no technical overhead", "no scripting or developers required", "no developer
needed", "No training, scripting or complex flows needed"). **Five separate
no-X-needed constructions across two pages** — the objection Zendesk is most
determined to pre-empt is implementation difficulty, and the copy says so five
times in five different ways rather than once well.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Nav, hero, pricing, closing | Primary |
| `Start your free trial` | Ticketing page form submit | **Third variant** of the same action |
| `14-day free trial` | Ticketing page, as a *button label* | A duration used as a CTA — unusual and information-dense |
| `Buy now` | Three self-serve pricing cards | Direct-purchase language, rare in B2B SaaS |
| `Talk to Sales` | Enterprise pricing card | |
| `Contact Sales` | Pricing nav, FAQ answers, Forethought block | |
| `Contact us` | Global nav, footer | **`Contact Sales` and `Contact us` both present on the pricing page** |
| `View demo` | Nav, home | |
| `Get a demo` | Home, closing CTA pair | **Second label for one action** |
| `Request Forethought demo` | Forethought block | Third demo variant, but properly qualified |
| `Sign in` | Nav and footer | |
| `Register now` | Event banner | |
| `Explore the platform` | Home, AI section | |
| `Learn more` | Home ×2, pricing add-on cards ×3 | Bare, no object |
| `Get the details` | Ticketing page, employee service | A softer `Learn more` synonym |
| `Read the report` | Gartner block | |
| `Read customer story` | Every testimonial | Consistent |
| `See plans & pricing` | Home pricing block | Ampersand; elsewhere Zendesk writes "and" |
| `Calculate your ROI` | Home | |
| `Calculate savings` | Pricing page ROI block | **Second label, same destination anchor** |
| `Compare all plan features` | Pricing, inline link | |
| `Apply now` | Startups block | |
| `Skip to main content` | First in DOM, marketing **and** help centre | Present site-wide — better than Intercom |
| `View FAQs` / `Hide FAQs` | Home FAQ block | Explicit expand/collapse pair |
| `Submit` | Contact Sales form | |

**Negative finding:** three labels for "start a trial"
(`Try for free` / `Start your free trial` / `14-day free trial`), three for
"see a demo" (`View demo` / `Get a demo` / `Request Forethought demo`), two for
"talk to us" (`Contact Sales` / `Contact us`), and two for the same ROI anchor
(`Calculate your ROI` / `Calculate savings`). For a company whose product is
consistency of customer communication, the CTA layer is notably unnormalised.

**`Buy now` on three of four pricing cards** is the most decisive CTA in this
batch. Intercom, HubSpot and Salesforce all route to trials or sales; Zendesk
offers direct purchase and says so in two words.

## T4 Onboarding & getting-started

**Trial framing** `[observed]`, repeated verbatim on home and ticketing pages:

> `**14-day free trial.** No credit card required.`
> "Use your work email to connect customer emails, apps, and invite team members."

That second line is doing real work: it explains *why* a work email is required
rather than just demanding one. A one-sentence rationale attached to a field
constraint, placed above the field.

**Consent copy on the signup form** `[observed]`:
"I agree to Zendesk contacting me with marketing-related communications." as a
checkbox, plus "By submitting, I agree to Zendesk's Privacy Notice." The
marketing consent is an explicit opt-in checkbox and is separated from the
privacy acknowledgement — a defensible GDPR-shaped split.

**What the trial actually gives you, stated plainly** `[documented]`, in the
pricing FAQ: default is the Suite Professional plan for 14 days; `Copilot` is
included by default; other add-ons require contacting sales; "Trial access to AI
features is available for evaluation purposes, though the capabilities included
may vary." That last clause is a hedge, but it is a published hedge.

**Time-to-value claims** `[observed]`: `Launch in minutes, not months`,
"teams like Rain were fully up and running in just hours, not weeks",
`Set up in a few clicks`, `No expertise needed`.

No step-numbered onboarding sequence is exposed publicly. `[absent]`

## T5 Form & field labels

**Contact Sales form** `[observed]`: `Work email` (with hint "Use your work
email to connect customer emails, apps, and invite team members"), `Message`,
`First name`, `Last name`, `Company name`, `Number of employees` (banded select
with a `Select` null option: `1-9`, `10-49`, `50-99`, `100-249`, `250-499`,
`500-999`, `1000-4999`, `5000+`), `Phone number`, `Country`.

**Standard ticket fields** `[documented]`, named in the help IA: `requester`,
`subject`, `description`, `status`, `type`, `priority`, `tags`, `assignee`.

**Escalation block configuration** `[documented]`, from the AI-agent escalation
article — these are the field labels an admin sees when authoring handoff copy:

| Label | Purpose |
|---|---|
| `Escalation` | The block type selected from the plus (+) menu |
| "Enter an AI agent message to communicate to the customer what's happening" | The instruction attached to the handoff-copy field — **the product's own brief to the writer** |
| `Send an email` | Escalation method 1 — takes recipient, email title, optional content |
| `Forward to an agent` | Escalation method 2 |
| `Escalate to team` | Destination field in the Details panel |
| `Escalation fallback` | Which dialogue fires if the escalation itself fails |
| `Failed escalation reply` | The named system reply used as that fallback |
| `Add action` | Optional post-escalation action |
| `Save` / `Publish` | Two-stage commit, same pattern as Intercom |
| `Email automation` → `Keep automation active` / `Stop automation after use cases completed` | Named threshold options |
| `Reply delay (minutes)` | With a published recommended value: 15 minutes |

The instruction string — *"Enter an AI agent message to communicate to the
customer what's happening"* — is the most quotable field-help line in the file.
It is a UI label that tells the admin what the copy is *for* rather than what to
type, and it frames the handoff message as an explanation of a state change.

## T6 Ticket, conversation and record states — PRIORITY

This is the vocabulary the rest of the industry copies, and Zendesk publishes it
in full with definitions.

### The six standard statuses `[documented]`

Source: `About the ticket lifecycle and ticket statuses`. Each has a defined
colour, a definition, and at least one stated constraint.

| Status | Colour | Definition (verbatim, short) | Constraint |
|---|---|---|---|
| `New` | Orange | "Indicates that no action has been taken on the ticket." | "After a New ticket's status has been changed, it can't be set back to New." |
| `Open` | Red | "Indicates a ticket has been assigned to an agent and is in progress. It's waiting for action by the agent." | — |
| `Pending` | Blue | "Indicates the agent is waiting for more information from the requester." | Requester reply auto-resets to `Open` |
| `On-hold` | Dark gray | "Indicates the agent is waiting for information or action from someone other than the requester." | Optional; admin-activated; **internal only** |
| `Solved` | Light gray | "Indicates the agent has submitted a solution." | — |
| `Closed` | Light gray | "Indicates that the ticket is closed by the system and the requester can no longer reopen it." | "Tickets can't manually be set to Closed." |

A seventh, `In Progress`, is available on accounts created **on or after
February 13, 2024**, "depending on how your admin has configured your account."
Note the casing: `In Progress` here, against `On-hold` (hyphen, lowercase h) and
`Pending`. Three different capitalisation conventions inside one six-row table.

**The `Pending` / `On-hold` distinction is the single most transferable
definition pair in this file:**

- `Pending` = waiting on **the requester**
- `On-hold` = waiting on **someone other than the requester**

Two states that are operationally identical for the agent ("you, as an agent,
can't proceed with resolving the ticket until you receive more information from
someone else") are split solely on *who* the blocker is. Zendesk states the
similarity explicitly rather than pretending the states are distinct in kind.

**`On-hold` is invisible to the customer, and Zendesk says so in the definition
itself:**

> "On-hold is an internal status that the ticket requester never sees. While a
> ticket is set to On-hold, the requester sees the status as Open."

That is an explicit, published statement that an internal state maps to a
different external state. Compare Intercom, which achieves the same thing via a
configurable `internal label` / `customer facing label` split. Zendesk hard-codes
one instance of it.

### The customer-facing status set — a 6-to-3 collapse `[documented]`

Source: `What are the customer portal ticket statuses?`. The whole article
exists to answer one question, quoted verbatim as its heading:

> "What are the ticket statuses displayed on the **My activities** help center
> page? Why are they not identical to the agent-facing ticket statuses?"

And the answer states the design rationale in one clause: "the customer portal
ticket statuses are meant to make sense from the end-user's perspective."

| Customer-facing status | Published gloss (verbatim) |
|---|---|
| `Open` | "the support team is working to resolve the request" |
| `Awaiting your reply` | "the support team is waiting for a reply from an end-user" |
| `Solved` | "the request was resolved" |

**The mapping table, verbatim:**

| Ticket Status | Help center request |
|---|---|
| New | Open |
| Open | Open |
| Pending | Awaiting your reply |
| On-hold | Open |
| Solved | Solved |
| Closed | Solved |

This is the corpus's cleanest example of a **deliberate vocabulary reduction at
the audience boundary**. Six operational states collapse to three. Three of the
six (`New`, `Open`, `On-hold`) all surface as `Open`, because the distinctions
between them are the agent's business, not the customer's.

Note what changes grammatically at the boundary. Agent-side statuses are all
**adjectives or past participles describing the ticket** (`New`, `Open`,
`Pending`, `Solved`). The one customer-side status that isn't reused is
`Awaiting your reply` — **a verb phrase, in the second person, naming the
action the reader must take**. `Pending` tells you a state; `Awaiting your
reply` tells you what to do. That single substitution is the most reusable
string in the whole file.

Also worth noting: `Closed` disappears entirely from the customer's vocabulary,
surfacing as `Solved`. The customer is never shown a state whose only meaning is
"you can no longer reopen this."

### Custom statuses and status *categories* `[documented]`

"When custom ticket statuses are activated, then the standard ticket statuses
become ticket status categories." So Zendesk and Intercom converge on the same
architecture from opposite directions — Intercom ships categories first,
Zendesk promotes its fixed statuses into categories when you need more.

A documented example of a custom status name: **`Refund processed`** — a past-
participle phrase naming the *outcome*, not the stage. And the reasoning is
published: a solved ticket retains its custom status after closing because
"This helps provide context of how or why a ticket was solved."
Custom statuses, like system ones, "can also display a different name to end
users than what is shown to agents."

### Lifecycle mechanics with user-visible consequences `[documented]`

- `New` is one-way: once left, never re-entered.
- `Closed` is machine-only: "Tickets can't manually be closed."
- Default automation closes a ticket **four days** after `Solved`. If an admin deactivates that automation, a **28-day** system rule closes it instead, and "any business rules created to close tickets longer than 28 days won't be honored." Both numbers are published.
- Statuses "can often change back and forth between Open, Pending, and On-hold depending on the complexity of the support request" — the lifecycle is explicitly non-linear and the docs illustrate both the linear and the looping case with separate diagrams.

### Two named exception objects `[documented]`

| Term | Definition (paraphrased) |
|---|---|
| `Reopened ticket` | Created when a requester comments on a **solved** ticket; auto-assigned back to the agent who solved it |
| `Follow-up ticket` | Auto-created when someone responds to a **closed** ticket; a new ticket that "references the closed ticket and includes most of its data" |

The distinction is doing careful work. The same user action — replying — produces
a *reopen* before closure and a *new object* after it, because the closed record
is immutable. Rather than hide this, Zendesk names both outcomes and marks
follow-up tickets visibly in the UI. The example given for why a ticket reopens
is written from the customer's position: "the requester may disagree that their
issue was resolved."

### AI agent conversation states `[documented]`

- `escalated` — "Only conversations that were not escalated are evaluated for automated resolutions."
- `verified` / not verified — LLM-adjudicated
- `resolved` / `unresolved` — with a published list of what makes a Web Widget conversation unresolved: the user started a live chat, submitted a contact form, requested a callback, gave negative feedback, or "the AI agent … didn't understand the request"
- Session end: **72 hours** of inactivity, published
- Tag vocabulary leaking into the UI: `ai_agent_automated_resolution`, `escalated_by_ultimate`

**`escalated_by_ultimate`** is a defect worth recording. "Ultimate" was an
acquired company; the tag name survives in current documentation and in live
ticket data, and admins are instructed to build workflows around it. A vendor
codename embedded in a customer-configurable identifier.

## T7 Error, failure & recovery

`[documented]`, moderate.

- **`Failed escalation reply`** — a named system reply for when the handoff itself fails, configurable via an `Escalation fallback` field. Designing a fallback for the fallback is unusually thorough and directly transferable.
- `Escalation fallback` is a first-class field, not a hidden default.
- A precondition is published: "Only conversations that include at least one customer or AI agent message can be escalated."
- Failure-mode warning in the email-automation docs: "Reaching an empty AI agent message block does not trigger an escalation if additional use cases are still allowed" — an author-side trap, documented.
- Admins are instructed to build a detection workflow for a silent-failure state: tickets in `Open` status carrying `escalated_by_ultimate` "will no longer be responded to by the AI agent, meaning they might require human attention." Zendesk is telling customers to monitor for conversations its own automation abandoned.
- A billing-accuracy warning: if the email automation trigger isn't created, "automated resolutions might be consumed for conversations they shouldn't be." A published statement that a misconfiguration can cause overbilling.

## T8 Empty states

`[absent]` for in-product empty states.

One observed empty-state **defect** on a public page: the help-centre section
`Views, ticket status, and ticket fields`
(`/hc/en-us/sections/5346334218778-…`) returns a page containing **only the
`Powered by Zendesk` footer** — no heading, no article list, no "no articles
here" message. The meta description promises "Questions about the default and
custom fields of the ticketing system", so the section is populated; the list
is client-rendered and the server response is bare. Whatever the cause, the
no-JS render of a Zendesk-hosted help section is an unlabelled blank page. For a
company whose help-centre product is sold to 80,000+ customers, that is the most
consequential negative finding in this file.

The `Select` placeholder on both form dropdowns (`Number of employees`,
`Country`) is the only observed null-value label.

## T9 Handoff, escalation and notification copy — PRIORITY

Zendesk's approach is the mirror image of Intercom's. Intercom ships a default
handoff line and documents how to override it. **Zendesk ships no default line
at all** — it ships a *briefing framework* for the admin who has to write one.

### The escalation architecture `[documented]`

The article opens by naming the conditions rather than the mechanism:

> "Sometimes an AI agent needs to transfer a query to a human agent. This can
> happen if the inquiry is complex, urgent, or sensitive."

Three adjectives — `complex`, `urgent`, `sensitive` — as the published taxonomy
of escalation-worthy queries. Compare Intercom's six behavioural triggers
(`Request` / `Angry` / `Loop` / `How` / `Keyword` / `Guidance`). Zendesk
classifies by **the nature of the query**; Intercom classifies by **the
behaviour of the customer**. Both taxonomies are useful and they are almost
non-overlapping.

### The three building blocks of a handoff `[documented]`

| Block | Function |
|---|---|
| `availability block` | Checks business hours and agent availability *before* offering escalation |
| `escalation block` | Carries the AI agent message and the destination |
| `Escalation fallback` | Names the dialogue that fires if escalation fails |

**The availability block is the answer to "how is the wait framed?"** Zendesk's
published guidance is to *not offer a synchronous handoff you can't honour*:

> "in a synchronous channel such as messaging, you can escalate by email instead
> if it's outside of agent working hours. To do this, use an availability block
> at the start of the path to ensure you only escalate when agents are
> available."

That is a channel-downgrade pattern. Rather than promising a human and producing
a queue, the flow re-routes to an asynchronous channel where the expectation is
different. This is a genuinely better answer to wait-framing than writing a
better wait message, and it is the most transferable idea in this section.

### What Zendesk tells the writer to do before handing off `[documented]`

> "Consider what the AI agent can do before escalation to make the handoff and
> ensuing conversation more efficient"

- "Gather information such as order number, name, or email"
- "Add tags and update fields for your specific workflow"
- "Identify suitable agents to take the conversation"

And the field instruction for the message itself: **"Enter an AI agent message
to communicate to the customer what's happening."**

So the published brief is: *collect what the human will need, route to the right
human, and tell the customer what is happening.* No emotional acknowledgement,
no apology, no "one moment please". The framing is purely informational. Where
Intercom's default handoff line names the emotion ("I understand this is causing
frustration"), Zendesk's instruction names only the state change.

### The escalation-volume warning `[documented]`

Zendesk publishes an explicit anti-escalation argument grounded in capacity
arithmetic:

> "if your team has four agents working 9am to 5pm and conducting 200–250
> conversations per day, escalating too many messaging conversations will
> overload your agents and cause long waiting times for the customers."

And the resulting rule: "reserve messaging escalations for high-impact issues
such as product questions and shipping failures, which can directly affect
revenue or CSAT. Offer escalation only when there's no possibility that the AI
agent can guide customers to self-service resources."

Intercom makes the same argument from the *resolution-rate* side ("broad or
generic guidance can cause a sharp increase in escalations and a corresponding
drop in Fin resolution rate"). Zendesk makes it from the *queue-length* side.
Same conclusion, opposite justification — and Zendesk's is the one that centres
the customer's wait rather than the vendor's metric.

### Reusable handoff copy: `template replies` `[documented]`

"design an escalation flow using template replies. If you need more than one
escalation flow, create additional templates." Escalation copy is a managed,
reusable content object, not a one-off string per flow.

### Notification / system-message vocabulary `[documented]` and `[observed]`

- `Failed escalation reply` — a named `system reply`
- `Generative replies` / `uGPT reply` — named reply types (`uGPT` is another surviving acquisition codename in customer-facing docs)
- `Reply delay (minutes)` — a deliberate pause before an AI reply, recommended at 15 minutes. Slowing the bot down on purpose, to avoid an implausibly instant response, is a notable design decision.
- Named agent-side features: `Auto assist`, `Writing Tools`, `Intelligent Triage`, `Admin Copilot`, `Quick Reports`
- Marketing description of voice: `Eliminate hold music and scripts.` — the wait experience addressed by removing it rather than narrating it
- Named routing behaviours: `overflow`, `after hours routing`, `maximum queue size`, `wait time`, and "allow callers to request a callback instead of holding"

`request a callback instead of holding` is the one place Zendesk names the wait
directly, and it names it in order to offer an exit.

## T10 Disclosures, legal & compliance

**Pricing structure, stated in four components** `[observed]`, from the FAQ:

> "Zendesk pricing is primarily seat-based (per agent, per month)"

1. `Base subscription` — plan tier × agent seats
2. `Usage-based features` — "App Builder, Action Builder and Voice are billed based on consumption exceeding applicable plan allowances"
3. `Add-ons` — billed in addition
4. `Annual vs. monthly billing` — annual discounted

**Observed plan pricing** (annual, per agent per month):

| Plan | Price | Positioning line (verbatim) |
|---|---|---|
| `Support Team` | `$19` | "For teams that have outgrown a shared inbox and need core support essentials." |
| `Suite Team` | `$55` | "For teams ready to unify support channels and automate resolutions with AI Agents." |
| `Suite Professional` (`Most Popular`) | `$115` | "For teams optimizing support operations with advanced automation and AI-driven insights." |
| `Suite Enterprise + Copilot` | `Talk to Sales` | "For teams needing advanced security, governance and the most proactive AI assistant." |

Add-ons: `Copilot` `$50 agent/month paid yearly`,
`Workforce Engagement Bundle` `$50 agent/month`, `Contact Center` `$83
agent/month`. Toggle labels: `Monthly` / `Annual`, with `20% off annual`.

Plan positioning lines all follow one frame: **"For teams [participle
phrase]."** — a consistent, well-executed template.

### The pricing unit: `automated resolution` `[documented]`

> "Automated resolutions are the unit of measurement used for calculating and
> billing your account for AI agent usage."
>
> "Paying per automated resolution means that you pay only for customer requests
> that were successfully resolved by the AI agent, without any escalation to a
> human agent."

Three properties make this definition unusually rigorous, and all three are
published:

1. **Adjudicated by a machine.** "Conversations flagged as resolved are also verified by a large language model (LLM), ensuring its accuracy and delivering a true automation rate." A billing event gated by an LLM judgement — and the failure case is stated: "Conversations that don't pass this verification are not considered verified and do not consume an automated resolution."
2. **Counted per conversation, not per user.** "A single user's visits over multiple channels, browsers, or devices will be considered separate interactions." The billing unit's boundary is defined against the obvious ambiguity.
3. **Evaluated on a published clock.** 72 hours of inactivity, "by default set to 72 hours after the first message."

**Channel-specific resolution conditions**, all published. On messaging, a
resolution counts only if the last interaction was one of: positive feedback
(`"Yes, problem solved"`) or no feedback; an article shared and (for
non-generative replies) clicked; or the end user reaching the final step of an
answer flow. On email and web form, four conditions must **all** hold, including
"No human agent responded to the ticket created by the end user's request."

The customer-side feedback strings are quoted in the docs as
`"Yes, problem solved"` / `"No, I still need help"` and
`"Yes, close my request"` — three verbatim customer-facing microcopy strings,
each pairing a yes/no token with a restatement of what it means. That
yes-plus-restatement pattern (`Yes, problem solved` rather than `Yes`) is
directly reusable for any confirmation binary.

**A published exclusion list** — five things that look like AI answers but don't
bill: Answer Bot for Slack, Article Recommendation API, Article Recommendation
for Mobile SDK Classic, Article Recommendation for Agents, Zendesk AI agents for
Microsoft Teams. Plus: no charge in `sandbox environments`, no charge for
`testing features in Admin Center`, and "Actions that link to another flow do not
increase the automated resolution count."

**Allowances and the overage vocabulary** `[documented]`:
`15 / 10 / 5 automated resolutions per agent per month` for Enterprise /
Professional-Growth / Team, with a hard ceiling — "a maximum of 10,000 allocated
automated resolutions per year". Named purchasing modes: `committed usage`
(buy 100+ in advance, better unit price) vs `overage billing (or pay-as-you-go)`
(worse unit price, "billed monthly, regardless of your subscription terms").
`Light agents are not included in the default allocation calculation.`
Allocation "expires annually or at the end of your subscription term."

The overage section has its own heading — **`Avoiding automated resolution
overages`** — written as a user goal, not a policy statement, and it tells the
customer how to cap their own spend.

**Purchase and payment disclosure** `[observed]`: "Payment methods: Bank account
(direct debit), Credit or debit card, or PayPal." and "Currently, Zendesk
supports USD, EUR, GBP, and BRL."

**Legal footer** `[observed]`: `Terms of Use` · `Privacy Notice` ·
`Cookie Notice` · `Cookie settings` · `Trust Center` · `© 2026 Zendesk, Inc.`
Note `Privacy Notice`, not "Privacy Policy" — though the form consent text links
to a URL ending `/privacy-policy/` while the footer links to
`/privacy-notice/`. Two names, two URLs, for what is presented as one document.

## T11 Help-centre architecture

`support.zendesk.com` runs on Zendesk's own Guide product — the help centre is a
dogfood artefact, which makes its defects more significant than they would
otherwise be.

**Article furniture, consistent across all four articles read** `[observed]`:

- A **`What's my plan?`** block at the top of every article, rendered as two small tables mapping the article to plan eligibility (`All Suites` → Team, Growth, Professional, Enterprise, or Enterprise Plus; `Support` → Team, Professional, or Enterprise). Plan-gating disclosed **before** the content, not discovered mid-task. This is an excellent and rare practice.
- A `This article contains the following topics:` anchor list.
- A `Related articles:` list at the top, not the bottom.
- Inline `Note:` blocks as the single severity marker (Zendesk uses one tier where Intercom uses three).
- A `Powered by Zendesk` footer on every page.

**Two version-control artefacts worth noting** `[observed]`:

- The automated-resolutions article opens with a scoped-validity warning: "This article describes the automated resolution platform in place prior to May 18, 2026. For information about the resolution tier platform introduced on May 18, 2026, see About automated resolution tiers." An article that dates itself and forwards the reader.
- The Accessibility Plan carries `Date Last Updated: May 29, 2026` and a link to the superseded 2023 version. **Absolute dates and retained prior versions** — directly better than Intercom's relative `Updated over a week ago`.

**A collapsible `Summary:` block** appears on the automated-resolutions article,
rendered as `Summary: ◀▼`, containing a five-sentence machine-style abstract.
Present on one article of four read — a partial rollout, same pattern as
Intercom's `Copy for LLM`.

**Article-title grammar — four shapes:**

| Shape | Example |
|---|---|
| `About <noun>` | `About the ticket lifecycle and ticket statuses`, `About automated resolutions for AI agents`, `About ticket fields` |
| Gerund-first task | `Configuring escalation strategies and flows for AI agents`, `Editing and managing your ticket fields`, `Migrating to the new AI agents experience` |
| Direct question | `What are the customer portal ticket statuses?`, `Can I require agents to fill in a ticket field before they move to a different ticket status?` |
| `Understanding <noun>` | `Understanding the step types for AI agent answers (Legacy)`, `Understanding email conversation flows` |

`About` for reference, gerund for task, question for edge case, `Understanding`
for conceptual. Four shapes, four jobs, applied consistently. **Titles carry
`(Legacy)` inline** as a status suffix — deprecation is surfaced in the title,
not buried in a banner.

**The section-page defect.** As noted in T8, the section page
`/hc/en-us/sections/5346334218778-Views-ticket-status-and-ticket-fields` returns
nothing but the footer. A one-level-up navigational page in Zendesk's own help
centre renders empty.

## T12 FAQs

Zendesk's FAQ answers are **in the server HTML**, unlike Intercom's. This is a
meaningful accessibility and SEO difference and the only product in this batch
where FAQ answers were fully retrievable.

**Placement 1 — home page, `Need to know more?` with `View FAQs` / `Hide FAQs`
toggle, 6 questions.**

| # | Question (verbatim) |
|---|---|
| 1 | What is Zendesk? |
| 2 | What is Zendesk AI? |
| 3 | What is Zendesk Resolution Platform? |
| 4 | What can you use Zendesk for? |
| 5 | How is Zendesk different from traditional customer service software? |
| 6 | Is Zendesk right for enterprises and growing businesses? |

Three consecutive `What is X?` definitional questions, then a use-case question,
then a differentiation question, then a fit question. The block is functioning
as a **glossary for the company's own newly-coined product names** — Q3 exists
because `Zendesk Resolution Platform` is a 2025-era rename that nobody
recognises. Q5's answer opens with a concession: "Traditional tools often stop
at ticket tracking" — naming the category's limitation before claiming the
difference.

Q4's answer is subheaded by task, not feature: `Run an AI-powered customer
service helpdesk across all channels` / `Manage self-service and build
knowledge` / `Support employees` / `Operate a service-focused contact center` /
`Integrate service with the rest of your systems`.

**Placement 2 — pricing page, `Frequently asked questions, answered.`,
12 questions.**

| # | Question (verbatim) |
|---|---|
| 1 | How is Zendesk pricing structured? |
| 2 | What is the difference between Support and Suite Service Plans? |
| 3 | How does pricing for AI agents work? |
| 4 | What are Forethought AI agents? |
| 5 | What add-ons are available and how are they priced? |
| 6 | How can I purchase Zendesk? |
| 7 | Can I purchase enterprise plans online? |
| 8 | How long are your contracts? Can I upgrade or downgrade? |
| 9 | How does the free trial work? |
| 10 | How do I estimate my total cost? |
| 11 | Does Zendesk integrate with other applications and systems? |
| 12 | How do you protect customer data? |

Q8 is a **compound question** — the Wise pattern of pairing the expectation with
the exception in one heading. Q7 (`Can I purchase enterprise plans online?`) has
a "no" answer and is asked anyway, which is good practice: the FAQ carries the
disqualification rather than letting the user discover it at checkout.

**The answer style is a two-level bullet structure throughout**: a short framing
sentence, then bolded labelled bullets (`Base subscription:`, `Usage-based
features:`, `Add-ons:`, `Annual vs. monthly billing:`), then a routing link. It
is dense but scannable, and every pricing answer ends by routing to Sales,
support docs, or the ROI calculator rather than terminating.

**Placement 3 — ticketing product page, `Frequently asked questions`,
11 questions.** Notable ones: `What is Messaging? And can it act like live
chat?` — a compound question whose answer opens with a bare `Yes.` before
elaborating; and `What types of routing does Zendesk offer, and who can use
omnichannel routing?`, whose answer names plan gates inline ("SLA-based timing
(Growth and above)", "prioritization by urgency and skills (Professional and
higher)").

**29 FAQ questions across three pages, with answers, all server-rendered.**

## T13 Terminology & glossary — PRIORITY

### The organising coinage: `resolution`

Zendesk has rebuilt its entire vocabulary around one noun, and the reach is
remarkable:

`Zendesk Resolution Platform` · `Resolution Learning Loop™` ·
`automated resolution` · `resolution tier` · `Resolutions delivered` (4.8B) ·
`one-touch resolution rate` · `real resolutions` · `full resolution` ·
`higher quality resolutions` · `faster resolutions` · `successful outcomes`

And the antonym it was built to defeat: **`deflection`**. The hero literally
instructs the reader to `Move beyond deflection`. This is a documented case of a
vendor **deprecating an industry metric by naming it in a headline** and
substituting its own. Whether or not the substitution is honest — an "automated
resolution" is still adjudicated by Zendesk's own LLM — the terminological
campaign is complete and consistent across marketing, pricing, docs, and metric
names.

`Resolution Learning Loop™` carries a trademark symbol in body copy, which tells
you how load-bearing the term is meant to be.

| Term | Zendesk's usage | The alternative it rejected |
|---|---|---|
| `resolution` | The atomic unit of value, the pricing unit, and the platform name | `deflection`, `containment`, `ticket closed` |
| `automated resolution` | The billing unit, LLM-verified | "conversation", "session", "interaction" |
| `agent` | A **human** support person — and also an **AI agent** | *collides, as at Intercom* |
| `AI agent` | The bot (formerly `Answer Bot`, formerly `bot`) | "chatbot", "virtual assistant" |
| `Light agent` | Restricted-permission user, excluded from resolution allocation | "collaborator", "viewer" |
| `end user` | The customer, in docs: "anyone who makes a request and interacts with the AI agent" | "customer", "requester" — both also used |
| `requester` | The ticket field naming the person who asked | — |
| `ticket` / `request` | Agent-side vs customer-side name for the same object | — |
| `My activities` | The customer's ticket list in the help centre | "My tickets", "My requests" |
| `Customer portal` / `Client portal` | Both appear — footer says `Client portal`, docs say `customer portal` | *inconsistent* |
| `view` | A saved, filtered ticket list | "queue", "folder" |
| `trigger` vs `automation` | Event-driven vs time-driven business rules — a deliberate split | "rule", "workflow" |
| `macro` | Pre-written agent response, one click | "canned response", "template", "snippet" |
| `dialogue builder` (new) / `bot builder` / `Flow Builder` (legacy) | Three names across generations, all live in current docs | — |
| `use case` | A recognised customer intent handled by the AI agent | "intent", "topic" |
| `escalation block` / `availability block` | Named flow-authoring primitives | "node", "step" |
| `template reply` | Reusable escalation copy | "canned escalation" |
| `system reply` | Product-supplied default replies, e.g. `Failed escalation reply` | — |
| `Intelligent Triage` | Automatic ticket classification | "auto-tagging" |
| `Auto assist` | Proactive AI in the agent workspace | — |
| `Copilot` | The agent-facing AI assistant | *same name Intercom uses for the same thing* |
| `Garden` | Zendesk's design system, named in the Accessibility Plan | — |
| `Agent Workspace` | The unified agent UI | "console", "desktop" |
| `omnichannel routing` / `skills-based routing` / `topics-based routing` | Three named routing modes | — |
| `Zendesk Suite` vs `Zendesk Support` | Two product lines, four plan tiers each | — |
| `committed usage` vs `overage billing (or pay-as-you-go)` | Two named purchase modes for resolutions | "prepay"/"metered" |
| `Forethought` | Acquired AI-agent product, retained as a brand inside Zendesk | — |
| `escalated_by_ultimate`, `uGPT reply` | Acquisition codenames surviving in live identifiers | *defects* |

**`Copilot` is now the industry's shared word for the agent-facing AI
assistant.** Intercom, Zendesk, and HubSpot all use it. Worth flagging for the
corpus: a coined term that has already become generic.

**The `agent` collision is the same defect Intercom has**, and worse here —
Zendesk sells both `agent` seats (humans) and `AI agents` (machines), and the
pricing page uses `agent/month` for the human unit while the adjacent feature
bullet says `AI Agents`. The docs are forced into circumlocutions: "resolved by
the AI agent, without any escalation to a human agent", "without live-agent
intervention", "No human agent responded". Zendesk has to disambiguate with a
modifier every single time — a measurable ongoing cost of the naming choice.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the buyer and the admin
("you pay only for", "your team", "you're charged"). First-person plural for the
company appears mainly in the Accessibility Plan and security answers ("We
combine enterprise-class security features…", "Zendesk is pleased to present").
Marketing is largely agentless and imperative.

**Register.** Marketing is clipped, superlative-heavy, and full-stopped
fragments. Docs are formal, procedural, and notably longer-winded — the
automated-resolutions article runs to five nested heading levels. No exclamation
marks except one, on the ticketing FAQ: "It's easy to use, quick to set up, and
scales as you grow!" — the single `!` on the harvested surface, and it sits in a
low-stakes FAQ answer.

**Zendesk's tone gets more careful as stakes rise**, in the Wise direction:
the billing article is hedged and precise ("might be consumed for conversations
they shouldn't be", "ensuring its accuracy"), the accessibility plan is formal
and commitment-bounded ("Zendesk strives to", "Zendesk aims to", "endeavors to"),
and the marketing is loose ("outperform", "gets smarter"). The `strives to` /
`aims to` verb choice throughout the Accessibility Plan is a deliberate
commitment hedge and appears roughly a dozen times.

**Accessibility — the strongest published position in this batch** `[observed]`

The `Zendesk Accessibility Plan` is a full public document, linked from the
`Company` footer column on every page, dated `May 29, 2026`, with the superseded
2023 version retained and linked.

- **Standard named and specific**: "our goal is not only to meet the industry standard of WCAG 2.2 AA, but to create experiences where anyone who accesses the Zendesk platform with assistive technology has a productive and successful experience." WCAG **2.2** AA, not 2.1 — ahead of most published commitments.
- **A barrier is formally defined**: "we define accessibility barriers as any exception to WCAG 2.2 AA and seek to minimize them." A testable definition rather than a sentiment.
- **Alternate formats offered by name**: "print, large print, Braille, audio format, or an electronic format that is compatible with adaptive technology."
- **Two named accountable roles**, split by feedback type: `Senior Manager of Culture and Experience` (general) and `Senior Director of Product Accessibility` (product).
- **Anonymous feedback explicitly supported**, with the trade-off stated: "Anonymous feedback is welcome; however, acknowledgement of receipt can only be provided for feedback where contact information is provided."
- **Accessible Canada Act, Section 6** — all seven principles reproduced, and the plan is structured around the Act's eight required areas (Employment, Built Environment, ICT internal/external, Other communication, Procurement of goods, Procurement of facilities, Programs and services, Transportation). `Transportation` is included with an honest null: "Zendesk does not offer transportation services and therefore has nothing to report under this heading."
- Named assistive-tech tooling: `NVDA`, `JAWS`, `Windows High Contrast Mode`, via `Assistiv Labs` — with a typo, `Assitiv Labs`, in the link text.
- Named design system as the accessibility vehicle: "We base UI wherever possible on our Garden Design System where accessibility improvements can be leveraged by all products."
- A separate `Zendesk Product Accessibility Statement` is linked for per-product conformance detail.
- Contact channel is a plain email plus postal address plus phone: `accessibility@zendesk.com`, `181 Fremont St, San Francisco, CA 94105`, `+1 (888) 851-9456`.

**Does Zendesk's own site obey it?** Partially.

- `Skip to main content` is present and first in DOM on **both** the marketing site and the help centre. Better than Intercom.
- Marketing images carry **long, genuinely descriptive alt text**: "Customer support agent wearing a headset, typing on a laptop, with chat bubbles about processing a refund", "Diagram showing customer requests routed by channel, ticket priority, and assigned support agents", "Support dashboard showing incoming tickets by channel, with counts and small bar charts for email, messaging, and voice". These describe the *information in the screenshot*, not just the object. Best alt-text practice observed in this batch.
- **But every image is rendered three times** — `![]()![Alt text]()![Alt text](url)` — an empty img, then two copies carrying the same alt. Depending on how the empty and duplicate nodes are handled, a screen-reader user may hear the same description twice per image on a page with thirty images. This is a responsive-image implementation artefact, and it appears on every marketing page.
- **Help-centre article images carry empty alt throughout.** Every diagram in the ticket-lifecycle article — including the two lifecycle flowcharts that are the only visual statement of the state machine — has no alt text. The status colour swatches (`Orange`, `Red`, `Blue`, `Dark gray`, `Light gray`) are images with empty alt, though the colour name is adjacent as text, which mitigates it.
- **Colour is used as a primary status indicator** in the agent UI, per the docs: "ticket statuses have different colored visual indicators that represent their status." The status *name* is always present alongside, so this is defensible, but the docs present the colour column first and the name second.
- The Accessibility Plan's own feedback mechanism is **two Google Forms links** — a third-party surface Zendesk does not control and has not stated a conformance position on.

**Negative findings, recorded honestly**

1. `overtime` for `over time` — in the global nav, on every page, and repeated on the ticketing page.
2. Three trial CTAs, three demo CTAs, two contact CTAs, two ROI CTAs.
3. `agent` = human in pricing, machine in `AI agent`, forcing constant disambiguation in docs.
4. `In Progress` / `On-hold` / `Pending` — three casing conventions inside one status table.
5. `Client portal` (footer) vs `customer portal` (docs) vs `Customer Portal` (article title) — three renderings.
6. `Privacy Notice` in the footer links to `/privacy-notice/`; the form consent text links to `/privacy-policy/`.
7. `escalated_by_ultimate` and `uGPT reply` — acquisition codenames surviving in live, customer-configurable identifiers.
8. `dialogue builder` / `bot builder` / `Flow Builder` — three generations of name, all present in current docs.
9. The help-centre section page renders empty with no fallback message.
10. Every marketing image emitted three times, twice with identical alt.
11. Help-centre diagrams — including the canonical ticket-lifecycle flowcharts — have no alt text, in a company publishing a WCAG 2.2 AA commitment.
12. `Assitiv Labs` misspelling inside the Accessibility Plan.
13. `See plans & pricing` uses an ampersand where the rest of the site writes "and".

---

## Transferable patterns

1. **Collapse the state vocabulary at the audience boundary, and publish the mapping.** Six agent statuses → three customer statuses, with `New`, `Open`, and `On-hold` all surfacing as `Open`. The mapping table is public. For any product with an internal case model richer than the customer needs, this is the reference implementation. Condition: the collapse must be lossless *for the customer's decisions* — they lose nothing by not knowing the ticket is `On-hold` rather than `Open`, because their next action is the same either way.

2. **`Awaiting your reply` over `Pending`.** The single best string in this file. Swap a state adjective for a second-person verb phrase naming the required action. `Pending` describes the system; `Awaiting your reply` describes the reader's obligation. Applies immediately to any pending-action state in disputes, verification, or document upload.

3. **Split "waiting" states by *who* is blocking.** `Pending` (waiting on the requester) vs `On-hold` (waiting on a third party). Operationally identical for the agent, but they produce different SLA treatment, different customer messaging, and different reporting. Zendesk names the similarity out loud rather than pretending the states differ in kind.

4. **Check availability before offering a human.** The `availability block` pattern — gate the escalation offer on whether a human can actually take it, and downgrade the channel (messaging → email) rather than queue the customer. Better than any wait-message wording. Condition: requires the async channel's expectation to be genuinely different, and requires telling the customer the channel changed.

5. **Design the failure of the failure path.** `Escalation fallback` + a named `Failed escalation reply` system string. Most escalation designs stop at "hand to human". Zendesk ships a configurable answer to "what if the handoff itself fails."

6. **Disclose plan gating before the content, not inside it.** The `What's my plan?` block at the top of every help article. The reader learns whether the feature is available to them before investing in reading. Transfers to any tiered or market-gated product where help content spans entitlements.

7. **Adjudicate the billable event, and publish the adjudication.** An automated resolution is LLM-verified, counted per conversation not per user, evaluated at a published 72-hour boundary, with a published exclusion list and a published overage-avoidance guide. Whatever one thinks of machine-judged billing, the disclosure standard is high and the section heading `Avoiding automated resolution overages` is written as the customer's goal, not the vendor's policy.

8. **Yes-plus-restatement for confirmation binaries.** `Yes, problem solved` / `No, I still need help` / `Yes, close my request` — never a bare `Yes`/`No`. The restatement makes the choice legible out of context, which matters in email, in notifications, and for screen-reader users navigating by control.

9. **Name the metric you are replacing.** `Move beyond deflection` — a headline that deprecates an industry term in order to install your own. High-risk, high-reward; only works if your substitute is defined as rigorously as Zendesk defines `automated resolution`.

## Caveats & gaps

- **Help-centre index not retrieved.** `support.zendesk.com/hc/en-us` aborted on repeated attempts, so the top-level category tree and its scope lines are unharvested. The four articles read were reached by direct URL. T11 is therefore reconstructed from article furniture and title grammar, not from the category IA.
- **`status.zendesk.com` not fetched.** No incident-communication vocabulary, no status-level names, no maintenance-notice copy. This was a target page and is a real gap.
- **`About automated resolution tiers`** (the post-18-May-2026 pricing model) was not fetched. The resolution definitions captured here are, by Zendesk's own banner, the **pre-May-2026** platform. The current tier model may use different vocabulary. Anything in T10 should be checked against the newer article before use.
- **All ticket states are `[documented]`, not `[observed]`.** No agent UI, no customer portal, no `My activities` page was seen live. Colour values, the state dropdown, and the closed-ticket hover tooltip are described in prose only.
- **No AI handoff string was captured verbatim.** Unlike Intercom, Zendesk publishes no default handoff line — the copy is author-supplied per escalation block. What is captured is the *brief* Zendesk gives the author. This is a genuine architectural difference, not a harvest failure, but it means there is no Zendesk equivalent of `Let me connect you with a teammate` to compare.
- **Empty states, validation messages, and toasts are absent.** All behind auth.
- **`Zendesk Product Accessibility Statement`** (`/company/agreements-and-terms/accessibility/`) not fetched — the per-product conformance detail and any VPAT are unexamined.
- **Only en-US observed.** Eighteen locales are exposed; no comparison made.
- **Community, Academy, Trust Center, and Marketplace** surfaces unharvested.
- The `Views, ticket status, and ticket fields` section page returned an effectively empty body; whether this is a bot-detection response, a JS-only render, or a genuine fault was not determined.

## Sources

1. https://www.zendesk.com/
2. https://www.zendesk.com/pricing/
3. https://www.zendesk.com/service/ticketing-system/
4. https://support.zendesk.com/hc/en-us/articles/8263915942938-About-the-ticket-lifecycle-and-ticket-statuses
5. https://support.zendesk.com/hc/en-us/articles/4408825864858-What-are-the-customer-portal-ticket-statuses
6. https://support.zendesk.com/hc/en-us/articles/8357756604186-Configuring-escalation-strategies-and-flows-for-AI-agents
7. https://support.zendesk.com/hc/en-us/articles/5352026794010-About-automated-resolutions-for-AI-agents
8. https://support.zendesk.com/hc/en-us/articles/10831381898650-Zendesk-Accessibility-Plan
9. https://support.zendesk.com/hc/en-us/sections/5346334218778-Views-ticket-status-and-ticket-fields (returned an empty body)

**Blocked / not reached:** `https://support.zendesk.com/hc/en-us` (help-centre index, repeated aborts); `https://status.zendesk.com/` (not fetched).
