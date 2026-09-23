# 189. Front

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Shared inbox and team email / collaborative customer-operations platform |
| Primary URL | https://front.com/ |
| Corpus rank | 189 |
| Benchmark strength (source list) | Inbox ownership and collaboration |
| Locale / market observed | en-US (help centre is path-scoped `/en/`, implying other locales exist) |
| Platform observed | Web (marketing, pricing), help centre, Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for the product surface. Security and data-processing commitments are marketing-page claims (SSO, SCIM, custom roles); `Google User Data Privacy Notice` is a separately linked legal artefact |
| Harvest date | 2026-09-22 |
| Pages inspected | 12 |
| Harvest completeness | Full for the flagged strength — assignment vocabulary, collision detection, comment-vs-reply and inbox-state names were all reachable in the public help centre. Partial overall: the in-product strings for collision indicators exist only inside screenshots, and no article bodies from `Getting started`, `Rules` or `API & integrations` were opened. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://front.com/ | Hero, nav taxonomy with descriptor lines, problem/solution framing, customer quotes |
| Pricing | https://front.com/pricing | Three plans, AI add-on pricing, full feature matrix, eleven-question FAQ |
| Help centre home | https://help.front.com/en/ | Four top-level knowledge-base categories with article counts |
| Help: Using Front (category) | https://help.front.com/en/categories/188-using-front | Second-level grouping into `Workflow basics` / `Productivity` / `Accounts & contacts` / `Troubleshooting` |
| Help: Work together (category) | https://help.front.com/en/categories/199-work-together | The collaboration article inventory — the ownership corpus |
| Help: How to assign a conversation | https://help.front.com/en/articles/2344 | Assignment vocabulary and the one-assignee rule |
| Help: Front's real-time collision detection | https://help.front.com/en/articles/2403 | Very short; the indicator strings are not published as text |
| Help: How to change conversation status | https://help.front.com/en/articles/2134 | The full personal/shared state model and its per-surface consequences |
| Help: Ticket statuses in Front | https://help.front.com/en/articles/1300288 | The second, parallel state vocabulary and its explicit mapping table |
| Help: Understanding comments | https://help.front.com/en/articles/2256 | Comment-vs-reply distinction, `Add internal comment`, contextual comments |
| Help: Subscribing and unsubscribing | https://help.front.com/en/articles/2198 | Participant/subscriber model, auto-subscribe preference labels |
| Status page | https://www.frontstatus.com/ | Sixteen component names, five status levels, incident-update lifecycle |

(Nine substantive content pages plus three category/index pages.)

---

## T1 Navigation & IA labels

**Global nav is unusually thin: two dropdowns and one link** `[observed]`

`Solutions` · `Resources` · `Pricing`, then `Sign in` · `Request a demo` · `Try for free`.
There is no `Product` top-level item; the product lives inside `Solutions`, which is the
opposite of the conventional arrangement.

**Every nav entry carries a wry one-line descriptor.** This is the defining content
decision on Front's marketing surface and it is applied with complete consistency:

| Nav entry | Descriptor (verbatim) |
|---|---|
| `Customer Service` | "All-in-one support platform" |
| `Email Management` | "Collaborative shared inboxes" |
| `Client Communication` | "Personalized service at scale" |
| `Front AI Overview` | "AI for the hard stuff" |
| `Autopilot` | "Beyond happy-path automation" |
| `Copilot` | "AI help that actually gets complexity" |
| `Smart QA` | "QA minus the blind spots" |
| `Smart CSAT` | "CSAT without the lies" |
| `Omnichannel` | "All the channels, zero chaos" |
| `Ticketing` | "Complexity in, clarity out" |
| `Live chat` | "Chat people don't hate" |
| `Knowledge base` | "Stop answering déjà vu" |
| `Integrations & API` | "Escape from tab hell" |

Note what these are *not*. None describes a capability. Each names **a familiar failure of
the incumbent** and positions the feature against it. `CSAT without the lies` accuses the
whole CSAT category of dishonesty in four words. `Beyond happy-path automation` uses a
term of art (`happy path`) that only a support-ops buyer knows, which is precise audience
targeting inside a nav descriptor. `Stop answering déjà vu` is a verb-phrase, not a noun
phrase, breaking the grammatical parallelism the other twelve keep — the only slip in the
set.

**Four further nav groupings** `[observed]`: `Industries` (`Tech`, `Financial Services`,
`Logistics`, `Manufacturing`, `Professional Services`, `Travel`), `Teams`
(`Customer Support`, `Operations`, `Inbound Sales`, `Account Management`,
`Customer Success`), `Using Front` (`Academy`, `Community`, `Help Center`,
`Developer Portal`), `Explore`.

**Defect:** the `Teams` nav says `Customer Support` while the `Use Cases` group says
`Customer Service` and the footer says `Help Desk` — three labels, and `Customer Support`
and `Help Desk` point at the *same* URL (`/teams/customer-service-support`).

**Footer is comparison-forward** `[observed]`. A whole footer column is headed `Compare`
and lists eight named competitors: `Front vs. Zendesk`, `Front vs. Freshdesk`,
`Front vs. Intercom`, `Front vs. Help Scout`, `Front vs. Salesforce`, `Front vs. Hiver`,
`Front vs. Missive`, `Front vs. Pylon`. Naming Help Scout (corpus #188) directly is useful
here — the two products are explicitly in each other's consideration set.

**Help-centre IA — four categories, each with a scope line and a live count** `[observed]`

| Category | Scope line (verbatim) | Size |
|---|---|---|
| `Getting started` | "Walk through the basics of setting up your new Front account" | 23 categories, 201 articles |
| `Using Front` | "Learn how to work in your new inbox and get the most out of Front" | 21 categories, 322 articles |
| `Rules` | "Automate business processes and increase your team's efficiency" | 9 categories, 37 articles |
| `API & integrations` | "Use our API or prebuilt integrations to connect your other apps with Front" | 9 categories, 200 articles |

Publishing the article count next to every category and sub-category
(`Send messages 23 articles`, `Work together 20 articles`, `AI features 30 articles`) is a
small, honest signal of depth. It also exposes imbalance: `Rules` has 37 articles against
`Using Front`'s 322, which tells a reader something true about where the complexity is.

Both `Getting started` and `Using Front` describe the account as "your **new** Front
account" / "your **new** inbox. Written for the first week, still being served in the
third year — a common help-centre staleness that is worth flagging.

**Second-level grouping inside `Using Front`** `[observed]`:
`Workflow basics` (`Send messages`, `Work together`, `Calendar`, `Search`) ·
`Productivity` (`Tags & organization`, `Message templates`, `AI features`, `Help center`,
`Analytics`, `Sequences`) · `Accounts & contacts` (`Accounts`, `Contacts`) ·
`Troubleshooting` (`Application troubleshooting`, `Channel troubleshooting`, `Other`).

`Other` as a published category name containing three articles is a candid piece of IA —
most teams would hide it.

**Third-level grouping inside `Work together`** `[observed]`, and this is the ownership map:
`Intro to collaboration` · `Team processes` · `Comments` · `Message features`.

**Breadcrumbs are four and five levels deep** `[observed]`, e.g.
`Home / Browse knowledge base / Using Front / Workflow basics / Work together / Intro to collaboration`.
**Defect:** the breadcrumb segment `Workflow basics` links to
`/categories/188-workflow-basics`, which is the *same numeric ID* as `Using Front`
(`/categories/188-using-front`) — the slug changes but the ID does not, so two different
breadcrumb labels resolve to one page.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `AI for simple support is everywhere. Complex customer operations demand Front.`
> Subhead: "Only Front brings teams, conversations, and AI into one coordinated system, so customer operations stay fast, accurate, and in control."

Two sentences, the first conceding the market and the second claiming the remainder. The
structure is **concession-then-carve-out**, and it recurs: the page never argues that Front
is better at the easy thing, only that the easy thing is not the problem. `demand` as the
verb (rather than "need" or "require") is doing tonal work — the customer's situation makes
the demand, not Front.

**The problem statement is a three-item indictment with a section header that insults the
category** `[observed]`:

> `Complexity is where most customer support platforms tap out`

- `Teams lack shared context` — "Scattered tools mean incomplete context and customers who have to repeat themselves"
- `AI stops at simple questions` — "Other AI tools can only handle simple FAQs, not real-world, complex requests"
- `Resolution slows to a crawl` — "Your agents shouldn't spend half their time fixing what AI got wrong"

Each label is **a sentence in the present tense describing the reader's current state**,
not a benefit. The third body line ("Your agents shouldn't spend half their time fixing
what AI got wrong") is the sharpest line on the page and it is an attack on AI competitors
made from inside an AI pitch.

**Section headers are eyebrow + claim** `[observed]`, with the eyebrow in caps:

- `FRONT AI` → `Resolve up to 70% of requests with AI, not just the low-hanging fruit`
- `CUSTOMER SUPPORT` → `Complex tickets span departments, your system should too`
- `OPERATIONS` → `Tame the inbox chaos and tackle the workflows your business depends on`

`Complex tickets span departments, your system should too` is a comma splice, and
deliberately so — the shape mimics speech. Front uses this construction repeatedly
(`Alt+Tab isn't a workflow. Unify your whole stack.`,
`Ready to tame the insanity? Come to Front.`).

**The register is consistently irreverent and it is rationed by surface.** Marketing gets
`tab hell`, `insanity`, `gnarliest tickets`, `Chat people don't hate`, `CSAT without the
lies`. The help centre gets none of it — `Assign conversations to give every message a
clear owner and ensure nothing falls through the cracks.` is about as colourful as help
gets, and even that is a stock idiom. The **tone gradient runs marketing → help → state
names**, and by the time you reach `Open` / `Waiting` / `Resolved` the voice has vanished
entirely. That is the correct gradient and worth naming as the pattern.

**Social proof leads with a defection** `[observed]`:
"After switching from Zendesk, we saw our productivity improve by 40% in our member support
team managing email, text, and chat channels." — a named CTO, a named competitor, a number.
Another quote names the collaboration primitive directly: "We love that we can leave a
comment on an email [in Front] and escalate it, and we know that nothing will get lost in
Slack."

**Defect, and a visible one:** the page `meta-description` reads
"Front is a best way to route, respond to, and measure all customer conversations." —
`a best way`. This is the string that renders in search results and link unfurls.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Nav, primary | |
| `Try for Free` | Pricing plan card (Starter) and `Compare plans` row | **Same action, different capitalisation on the same site** |
| `Start free trial` | Homepage hero | A third variant |
| `Request a demo` | Nav, homepage hero cluster | |
| `Request demo` | Homepage hero (first button) | **Article dropped** — `Request demo` and `Request a demo` both ship on the homepage |
| `Request a Demo` | Pricing plan cards | Title Case variant |
| `Talk to Sales` | AI add-on cards, services block | Distinct from `Request a Demo`, used for priced add-ons |
| `Sign in` | Nav | |
| `Explore Front AI` | Homepage, AI section | Named destination |
| `Front for customer support` / `Front for complex operations` | Homepage section links | CTA text = the page it goes to |
| `Explore more` | Six industry/team cards | Bare and repeated six times |
| `View all integrations` | Integrations section | |
| `See more resources` | Resources block | |
| `Join the waitlist` | Top hello-bar, AI agents | |
| `Contact us` | Help-centre header | |
| `Log in to Front` | Help-centre header | **`Log in to Front` in help vs `Sign in` in marketing** — same action, two labels, mirroring the Wise `Sign up`/`Register` finding |
| `Requests` | Help-centre header | The customer-portal link, labelled with a bare noun |
| `More results` | Help search | |
| `Assign` | Documented, conversation toolbar | |
| `Unassigned` | Documented, assignee dropdown option | The un-owned state offered as a selectable value |
| `Subscribe` / `Unsubscribe` | Documented, participants menu | |
| `Archive` / `Reopen` | Documented, conversation header | |
| `Snooze` / `Unsnooze` | Documented, conversation header | |
| `Trash` / `Restore` | Documented, conversation header | Note `Trash` as a verb and `Restore` as its inverse, not "Untrash" |
| `Mark as spam` | Documented, conversation header | The only four-word action in the set; has no published inverse |
| `Send as resolved` | Documented, composer primary button | |
| `Send` / `Send & archive` / `Send & snooze` | Documented, send-button preferences | |
| `Add internal comment` | Documented, comment field placeholder | |
| `Add files` / `Add a Zoom meeting` | Documented, comment bar `+` menu | |
| `Comment` | Documented, text-selection menu | Creates a contextual comment |
| `Jump to message` | Documented, on a quoted contextual comment | |
| `Edit` / `Delete` | Documented, comment hover actions | |
| `Expand` / `Collapse` | Documented, comment editor | |
| `About this conversation` | Documented, details panel opened by the pin icon | |
| `Save` | Documented, inbox settings | |

**Observation.** Front ships five surface variants of two conversion actions
(`Try for free` / `Try for Free` / `Start free trial`; `Request demo` / `Request a Demo` /
`Request a Demo`). Case and article discipline is weak across the marketing surface. By
contrast the **in-product action verbs are tightly paired with explicit inverses** —
`Archive`/`Reopen`, `Snooze`/`Unsnooze`, `Trash`/`Restore`, `Subscribe`/`Unsubscribe`,
`Expand`/`Collapse` — which is exactly the right discipline for a toolbar where the user
must be able to undo a state change they made by accident. Note that three of the four
inverses are *not* the "un-" form of the verb (`Reopen` not "Unarchive", `Restore` not
"Untrash"), and that `Unsnooze` is the one that is. Mixed, but each choice is individually
defensible.

## T4 Onboarding & getting-started

`[observed]` from marketing and help IA; the in-product onboarding is behind auth.

The public onboarding proposition is a **free trial with an explicit no-friction
disclosure**, stated as an FAQ answer rather than a badge: "Our free 14-day trial offers
all the features available in our Professional plan. You can get started without a credit
card and can upgrade at any time during your trial. You do not need a credit card to start,
continue, or complete your Front trial."

Note the triple-negative reassurance — "to start, **continue, or complete**" — which
pre-empts the real anxiety (that the card requirement appears later) rather than the stated
one. That is a good pattern: the objection users voice is "do I need a card", the objection
they actually have is "will you ask for one at day 13".

**The help centre is the onboarding artefact.** `Getting started` (201 articles) is
organised into `For you` / `For your team` — a **first-person vs collective split at the
top of onboarding**, which matches the product's central tension (my inbox vs our inbox).
Sub-paths observed in breadcrumbs: `Getting started / For you / Individual inboxes /
Working in your inbox` and `Getting started / For your team / Shared inboxes / Ticketing`.

**Article structure** `[observed]`: `In this article` jump-links → breadcrumb → H1 →
`Edited <weekday, month day year>` → `## Overview` → `## How it works` → `## Instructions`
(numbered `**Step 1**`, `**Step 2**` …) → `## FAQ`. The `Overview` / `How it works` /
`Instructions` triplet is used with real consistency across the articles harvested, and
`How it works` reliably contains the *consequences* while `Instructions` contains the
*clicks*. Separating "what will happen to my teammates" from "which button to press" is
the structural decision that makes the conversation-status article comprehensible at all.

**Prerequisite blocks** appear as `**Prerequisites**` before step one, e.g.
"You must be a workspace admin for the inbox you want to manage."

## T5 Form & field labels

`[documented]` throughout.

**Assignment and ownership controls**

| Label | Surface |
|---|---|
| `Assign` | Conversation toolbar |
| `Unassigned` | Value in the assignee dropdown |
| participants menu | Named in prose, not a visible label |
| `Subscribe` / `Unsubscribe` | Next to your name in the participants menu |

**Personal preference toggles — the subscription rules** `[documented]`.
Four settings, each named as a **verb + trigger**, which makes the rule readable as a
sentence before you toggle it:

| Label | What it does (summarised) |
|---|---|
| `Subscribe on comment` | Bumps the conversation into your `Subscribed` section after you comment |
| `Subscribe on reply` | Same, after you reply. Forced on for individual-inbox conversations and cannot be disabled. |
| `Unsubscribe on unassign` | Unsubscribes *and archives* when you unassign yourself. Only applies to manual unassign, not rule-driven. |
| `Unsubscribe on move from individual to shared inbox` | Unsubscribes and archives on move. Overridden by admin company rules. |

The fourth label is fourteen words long. It is unwieldy and it is also unambiguous, which
in a preferences list is the right trade — the alternative (`Unsubscribe on move`) would
require the user to guess which move.

**Inbox and ticketing settings** `[documented]`:
`Inboxes` (settings menu) → `Ticketing` tab → `Enable ticket statuses` (toggle) →
`Use this ticket status group` (select, with `None` as an explicit option meaning "all
statuses"). Using `None` to mean *no restriction* rather than *nothing available* is a
classic ambiguity; Front mitigates it with the adjacent sentence "If you select *None*,
agents will see all custom ticket statuses configured for your company."

**Comment composer** `[documented]`: the field placeholder is `Add internal comment` —
the word `internal` is carried in the placeholder itself, not in a tooltip or a colour
alone. This is the single most important label in the product and it is doing the
disclosure at the point of typing.

**Filter and view controls** `[documented]`: `Filter`, inbox tabs, `Views`,
`Assigned to me`, `Subscribed`, `Mentions`, `Later`, `Done`, `Trash`, `Spam`,
`Unassigned`, `Assigned`, `Open`, `Waiting`, `Resolved`, `Snoozed`, `Archived`.

**Analytics field labels** `[documented]`: `Waiting card` (key-metrics card),
`Waiting column` (in `Workload by inbox`), `Status column` (in `Oldest conversations`),
and the named reports `Live dashboard`, `Workload`, `Resolution`, `Team performance`.

## T6 Status & state language

**This is the priority section for this product and it contains the most interesting
finding in the file: Front runs two parallel state vocabularies and publishes the mapping
between them.** `[documented]`

**Vocabulary A — the email-native one (default).** Actions, then destinations:

| Action | Personal destination section | Shared-inbox tab |
|---|---|---|
| `Archive` | `Done` | `Archived` |
| `Snooze` | `Later` | `Snoozed` |
| `Trash` | `Trash` | `Trash` |
| `Mark as spam` | `Spam` | `Spam` |
| (none / default) | `Open` | `Open`, or `Unassigned` / `Assigned` |

**Vocabulary B — the ticketing one (opt-in per inbox).** Three statuses:
`Open`, `Waiting`, `Resolved`, plus admin-defined `custom ticket statuses` grouped into
`ticket status groups`.

**Front publishes the mapping explicitly, in both directions** `[documented]`:

> "Open conversations map to Open ticket status / Snoozed conversations map to Waiting
> ticket status / Archived conversations map to Resolved ticket status … If you disable
> ticket statuses, the mapping above is reversed."

And it states the migration effect in the user's terms:
"Previously Archived conversations will be displayed as Resolved. Previously Snoozed
conversations will be displayed as Waiting."

**Why this matters, and where it leaks.**

1. **The verb never matches the resulting state name.** You click `Archive` and the thing
   lands in `Done`. You click `Snooze` and it lands in `Later`. In a shared inbox you click
   `Archive` and it lands in `Archived`, but with ticketing on, the same click lands it in
   `Resolved`. So a single action produces three different state words depending on which
   surface you are looking at and whether an admin has flipped a toggle you cannot see.
   This is the most consequential content problem in the product, and Front's mitigation is
   pure documentation — an eleven-bullet `How it works` section per surface.

2. **Both vocabularies are shown simultaneously.** "In your *Later* and *Done* sections,
   you'll see both traditional (Snoozed/Archived) and ticket status (Waiting/Resolved)
   tabs." Four tab names for two underlying states, side by side. And then a qualifying
   rule on top: "The Snoozed tab will show conversations with the Waiting status AND have
   a snooze timer." So `Snoozed` ⊂ `Waiting`.

3. **The word `traditional` is Front's own hedge.** Calling vocabulary A "traditional" in
   the help text is an admission that the product is mid-migration and does not intend to
   retire either set.

**Status semantics are defined by user intent, not by system condition** `[documented]`.
The `When to use ticket statuses` section is a genuinely good piece of content design —
each status gets a coloured dot and a list of *situations*, and the situations
deliberately overlap so the distinction has to be drawn on intent:

- 🔵 `Open status` — "The conversation has not been worked on and needs action from your team" / "Your team is actively working on a conversation and the customer needs a response"
- 🟡 `Waiting status` — "Your team is waiting on more information from your customer, **and you intend to follow up** if your customer doesn't respond" / "You're waiting for information from a team member before you can send a response"
- 🟢 `Resolved status` — "The request is completed, and no further action is needed from your team" / "Your team is waiting on more information from your customer, **but no action is needed** from your team unless the customer responds"

Read `Waiting` and `Resolved` together: the *external* situation is identical (waiting on
the customer). The status is decided by whether **you owe a follow-up**. That is the
Jira status-vs-resolution problem in a different costume, and Front resolves it not by
adding a field but by writing the intent into the definition. It then adds the third
option in the same section — "If you need to proactively follow up … you should still
snooze the conversation" — so snooze is the *mechanism* and Waiting is the *declaration*.

**Ownership states** `[documented]`. The rules are stated flatly and they are the heart of
the shared-inbox content problem:

- "A conversation can only be assigned to one user at a time."
- "Once a conversation is assigned, it appears in the assignee's *Assigned to me* section."
- "If you are the assignee, you cannot unsubscribe — you must unassign or reassign the conversation first"
- "Others cannot unsubscribe from a conversation for you"
- "If a teammate who is not the assignee changes a conversation's status from a shared inbox, then the conversation will stay open in the assignee's *Assigned to me* section."

The last one is the crucial guarantee and it is stated as a consequence, not as a feature:
**a non-owner cannot clear an owner's queue.** Front spends an entire article explaining,
surface by surface (`Shared inbox`, `Assigned to me`, `Subscribed`, `Individual inbox`,
`Internal discussions and tasks`, `Delegated inbox`, `Teammates list`), exactly whose view
changes when you act. Six explanations of one action is a lot of content, and it is
evidence that the model is genuinely hard rather than that the writing is poor.

**Participant vs subscriber vs assignee** — three distinct roles, distinguished in prose:
"As a subscriber to a conversation, you automatically become a participant", and
"Others will be able to tell when you have last read the message or if you have
unsubscribed the conversation." So the participants menu is a **read-receipt and
subscription-status surface for teammates**, not just an access-control list.

**Automatic reopening — the `bump`** `[documented]`. "When the customer replies to a
conversation, the conversation will automatically reopen into the Open (or Unassigned or
Assigned) tab. Conversations automatically reopen based on your company's bump settings,
regardless of ticket status." `bump` is used as both a noun (`bump settings`) and a verb
("The conversation will automatically bump to the top"). The concept is Front-specific and
it is the mechanism that makes `Resolved` non-final — a state that a third party can undo.

**Teammate presence states** `[documented]`: `Teammate status colors - See who's online`
and `Real-time agent availability` (a pricing feature row). The colour names themselves
are not published as text.

**Status page states** `[observed]` on frontstatus.com: `Operational` ·
`Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with an overall
`All Systems Operational` banner. Sixteen named components: `App`, `Real time events`,
`API and integrations`, `Push notifications`, `Rules and Workflows`,
`SMTP (non-Gmail / O365)`, `Gmail`, `O365`, `Facebook`, `Twitter`, `Twilio`,
`Other channels`, `Front chat`, `Calendar`, `Analytics`, `Knowledge Base`.

**Defect in the component list:** casing is inconsistent — `Rules and Workflows` (title
case) against `Real time events` and `Push notifications` (sentence case), and
`Front chat` against the product's own `Front Chat` used on the pricing page. `Twitter` is
also stale relative to the platform's current name, while the nav's social link points at
`twitter.com`. `Real time events` is unhyphenated where the product elsewhere writes
`real-time`.

## T7 Error, failure & recovery

`[documented]` and `[observed]`; thinner than the state content.

**The troubleshooting IA is channel-split** `[observed]`:
`Application troubleshooting` (7 articles) · `Channel troubleshooting` (6 articles) ·
`Other` (3 articles). Splitting "the app is broken" from "the email provider is broken" is
the right first cut for a product that is mostly other people's infrastructure.

**Recovery is built into the state model rather than into error messages.** Every
destructive-feeling action has a named inverse offered in the same toolbar —
`Archive`/`Reopen`, `Snooze`/`Unsnooze`, `Trash`/`Restore` — so the recovery affordance is
permanent rather than a post-hoc toast.

**Pre-emptive consequence disclosure** `[documented]`, and this is the notable pattern:

> "If you are ever unsure how changing the conversation status will affect your teammates'
> views, you can hover on the action to see the impact, and you may also see a dialog pop
> up when you change the status."

A **hover-to-see-blast-radius affordance** on a state-change control. For a shared inbox
this is exactly right: the risk is not that you break something, it is that you silently
change what six other people see. The confirmation dialog is conditional ("you may also
see"), which suggests it fires only on the genuinely cross-cutting cases.

**Confirmation on privacy-crossing actions** `[documented]`:
"Don't worry about sharing something by mistake — Front will always prompt you to confirm
you want to share a private conversation." The reassurance is written *before* the
mechanism, in the second person, with a contraction. It is one of the few places the
marketing voice appears in help copy, and it is placed where anxiety is highest.

**Status-page incident lifecycle** `[observed]`, four update labels in a real incident:
`Investigating` → `Update` → `Monitoring` → `Resolved`, each with a UTC timestamp.
Incident title format is bracketed-tag-first:
`[office365] Delays in sending and receiving messages for some customers in [us-west-1] and [us-west-2]`.
Leading with the affected integration in square brackets lets a subscriber triage relevance
from a notification subject line alone.

The update bodies are notably numerate rather than reassuring:
"We have established that channel sync error rate is <1%, but remains above our expected
baseline rate. We are continuing to investigate." — an error rate, a comparison to
baseline, and an explicit refusal to declare victory. `Resolved - This incident has been
resolved.` is the terse close.

**Empty-search state** `[observed]` in the help-centre header: `No results found`,
rendered under a `Results` heading even before a query is typed — so the default state of
the search box is a no-results message. A small defect of the same family as the Wise
empty-query bug.

## T8 Empty states

`[observed]` — one, and it is a defect: the help-centre search region renders
`Results` / `No results found` / `More results` on page load with no query entered. The
instructional prompt above it is `Need help with Front?`.

In-product empty states are behind auth. `[absent]` The nearest documented analogue is the
product's stated goal state, `inbox zero`, used as a plain noun in help copy:
"Organizing your inboxes by conversation status is one of the key tools to working
efficiently in Front, and reaching inbox zero." Front treats `inbox zero` as a term the
reader already owns and does not gloss it.

## T9 Notifications & system messages

`[documented]` and `[observed]`.

**The @mention is the notification primitive** and its semantics are carefully bounded:

- "@mention a teammate in a comment. You can also @mention a contact in an email body"
- "Being @mentioned will unarchive the conversation for you, **but not subscribe you**"
- "A mention subscribes you even if the comment containing it is later edited or deleted."

Those last two sit in different articles and appear to contradict each other — one says a
mention does not subscribe you, the other says it does and survives deletion. Reading
closely, the first is about an *unsubscribed* conversation resurfacing and the second is
about the subscribe trigger list; but a user will not make that distinction. **Recorded as
a genuine inconsistency in published help.**

The `A mention subscribes you even if the comment containing it is later edited or deleted`
line is otherwise excellent — it documents the non-obvious persistence of a side effect
after its cause is removed, which is the kind of thing that generates support tickets.

**Notification destinations are named as sidebar sections**, not as a notification centre:
`Mentions` and `Subscribed`. "When there is new activity on the conversation, such as new
comments, you will see the conversation appear in the *Mentions* and *Subscribed* sections
of your sidebar."

**A `notify teammate` rule action** exists and is named in lowercase in prose
("added through the participants menu or a *notify teammate* rule").

**Status-page subscription channels** `[observed]`: email, SMS, Slack, webhook, Twitter,
Atom/RSS. The webhook copy enumerates four distinct events —
"whenever Front **creates** an incident, **updates** an incident, **resolves** an incident
or **changes** a component status" — where the email copy names three and the SMS copy only
two ("**creates** or **resolves**"). Different fidelity per channel, stated per channel
rather than uniformly. That is honest and it is also a small usability trap: the SMS
subscriber is not told they will miss `Monitoring` updates.

## T10 Disclosures, legal & compliance

**Plan prices** `[observed]`, with `Billed Annually` and `Save 24%` on the toggle:

| Plan | Price | Seat bound | Positioning line |
|---|---|---|---|
| `Starter` | `$25/seat/mo, up to 10 seats` | Hard cap in the price string | "Essential capabilities to get started with single-channel support" |
| `Professional` | `$65/seat/mo, up to 50 seats` | Hard cap in the price string | "Enhanced automation and reporting for omnichannel support" |
| `Enterprise` `most popular` | `$105/seat/mo` | No cap | "Advanced AI tools to accelerate resolution and elevate CX" |

**Putting the seat ceiling inside the price string** (`$25/seat/mo, up to 10 seats`) rather
than in a footnote is a strong disclosure choice — the constraint that will force an
upgrade is impossible to miss at the moment of comparison.

**The `most popular` badge sits on the most expensive plan.** Unusual; the convention is to
badge the middle tier. It is either true or it is a deliberate anchor, and the page gives
the reader no way to tell.

**AI is priced as separately-metered add-ons** `[observed]`, each with a one-line job
description and an inclusion caveat:

- `Autopilot` — "Starting at" `$0.05 /conversation`
- `Copilot` — `$20 / seat / month as an add-on, or included in Enterprise`
- `Smart QA` — `$20 / seat / month as an add-on, or included in Enterprise`
- `Smart CSAT` — `$10 / seat / month as an add-on, or included in Enterprise`
- `Smart QA + Smart CSAT bundle` — "Complete performance insights for `$25 / seat / mo`"

Per-conversation pricing for the autonomous agent and per-seat pricing for the assistive
tools is a coherent, legible model: **you pay per seat for things that help a human and per
unit for things that replace one.** The pricing page never says that out loud, but the
structure carries it.

**Other add-ons, with their cost mechanics spelled out** `[observed]`:
`Native WhatsApp Channel` `popular` — "Meta-billed WhatsApp costs + 20% admin fee", and
`API Rate Limit Increase` — "$200 per 100 API requests/min per month". Disclosing a
percentage markup on a third party's pass-through cost, in the card, is unusually candid.

**Definitional FAQ answers** `[observed]` — the pricing FAQ is used as a glossary:

- "What is a seat?" → "A seat is a paid Front license that can be granted to a unique user in your organization."
- "What is a channel?" → "A channel is the communication medium that people use to get in touch with you like email, SMS, Front Chat, WhatsApp, and more."

Both are one sentence. Defining the two billable units in the pricing FAQ, in plain
language, before any of the "how much" questions, is a directly transferable move.

**Hard limits stated as flat refusals** `[observed]`:

- "No, the Starter plan only supports a single channel type of Email, Front Chat, or SMS."
- "No, plans are assigned at the organization level. You can add or remove seats as needed within a single plan."

Both begin with the word `No`. Neither apologises. Each is followed by the operative
alternative.

**Mandatory-purchase disclosure** `[observed]`: "To ensure you're set up for success, we
require an onboarding package be purchased for contracts over $25k." The
"To ensure you're set up for success" preamble softens a compulsory fee; the disclosure
itself is unambiguous and quantified, which is the part that matters.

**AI data-handling disclosure** `[observed]`, and it is the weakest copy on the page:
"While we may use your data to further train your model, your data will never be
cross-contaminated with other companies' data. We also have extensive agreements in place
with our AI providers to ensure that they're not training their foundational models on any
data that we send to them."

`your model` (singular, second-person possessive) is doing heavy lifting and is not defined
anywhere on the page. `cross-contaminated` is a food-safety metaphor applied to data
governance. `extensive agreements` is unquantified. Named providers are given
("OpenAI, Azure OpenAI, and Amazon AWS … Specifically, we use the text generation API"),
which is good, but the commitment language is vaguer than the pricing language on the same
page. **Recorded as a negative finding: this vendor discloses its markup percentage more
precisely than its model-training practice.**

**Payment-method disclosure** `[observed]`: "You can pay by wire transfer or ACH if you
purchase annually and the total contract value is over $12K." — two conditions, both
quantified.

**Footer legal set** `[observed]`: `SaaS Service Agreement` · `Privacy Notice` ·
`Cookie Policy` · `Google User Data Privacy Notice` · `Status` · `Your Privacy Choices`.
**Defect:** the footer link says `SaaS Service Agreement` (singular) while the help-centre
footer and the URL say `SaaS Services Agreement` (plural).

No accessibility statement or VPAT link was found. `[absent]`

## T11 Help-centre architecture

Four levels: 4 categories → named groupings → sub-categories with counts → articles.
Discussed in T1; the notable practices are:

**Article counts everywhere**, at both category and sub-category level, updated live.

**Article-title grammar — five shapes**

| Shape | Examples |
|---|---|
| `How to <verb> …` | `How to assign a conversation`, `How to change conversation status in Front`, `How to start an internal discussion`, `How to use the participants menu`, `How to handle being out of office` |
| `Understanding <noun>` | `Understanding comments`, `Understanding your Subscribed section`, `Understanding activity history`, `Understanding the conversation summary`, `Understanding round robin vs. load balancing assignments` |
| `<Gerund> and <gerund> …` | `Subscribing and unsubscribing from a conversation` |
| `<Noun phrase> in Front` | `Ticket statuses in Front`, `Ticket IDs in Front`, `Front's real-time collision detection` |
| Imperative | `Make inboxes public for your team`, `Invite guests to your Front conversations or internal discussions` |

The `Understanding <noun>` family is the interesting one. It marks the **conceptual**
article as distinct from the **task** article, the same job Calendly does with the
`<Topic> overview` suffix. `Understanding round robin vs. load balancing assignments` is a
title that exists purely to disambiguate two similar features — a disambiguation article,
which is a content type most help centres never ship.

**`[legacy]` is used as a title suffix** `[observed]`:
`Teammates list and their assignments [legacy]`, and the article opens with
"⚠️ This is a legacy feature. Front companies created after Jan 26, 2023 use Views."
Dating the cut-over precisely, in the first line, is excellent practice — a reader can
determine in one second whether the article applies to them.

**Every article carries an `Edited <full date>` stamp** in long form
(`Edited Friday, July 24 2026`, `Edited Thursday, May 14 2020`). Including the weekday is
unusual and pointless; publishing a 2020 date on a live article
(`Setting up your team's workflow: shared tags, signatures, rules, and message
templates`, edited May 2020) is honest and slightly alarming.

**Keyword tags are rendered as visible text at the article foot** `[observed]`:
the subscribing article ends with `unsubscribe` `mute` `subscribe`; the ticketing article
ends with `ticketing`. These are search synonyms leaking into the page, and `mute` is the
revealing one — see T13.

**Routing furniture** `[observed]`: help header carries `Requests` (customer portal),
`Log in to Front`, `Contact us`; the category pages surface
`Contacting Front's Support team` as a pinned article. `Front Community` and
`Front Academy` are offered as peer resources on the home page, each with a purpose line
("Ask questions, get answers, and connect with peers" / "Enroll in hands-on training to
achieve your goals with Front").

**Defect:** the help centre uses two URL schemes for the same articles —
`/en/articles/2256` and short links of the form `/t/k924v1/understanding-comments` — and
both appear as inline links *within a single article*, sometimes pointing at the same
target. One article links to itself under both schemes.

## T12 FAQs

**Placement A — pricing page.** Eleven questions under `Frequently asked questions`, with
answers present in the HTML (unlike most products in this corpus). `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | What are your Success Services packages and how much do they cost? | Three named packages; PDF pricing sheet linked; onboarding mandatory above $25k contract value. |
| 2 | How does Front's free trial work? Do I need a credit card? | 14 days, Professional feature set, no card at any stage. |
| 3 | What is a seat? | One sentence: a paid licence for a unique user. |
| 4 | What is a channel? | One sentence: the medium a customer uses to reach you. |
| 5 | Can I connect multiple channel types with the Starter plan? | No — Starter is one of Email, Front Chat, or SMS. |
| 6 | What is the maximum number of channels per plan? | Per-licence caps of 10/30/50 by plan, with a worked example and a help link. |
| 7 | Which providers power Front AI features? | Named: OpenAI, Azure OpenAI, AWS; text generation API. |
| 8 | How is my data processed? Is my data protected? | No cross-contamination between companies; provider agreements bar foundation-model training. |
| 9 | How can I learn more about Front's security and compliance best practices? | Points to the security page and to sales for documentation. |
| 10 | Can I combine seats across multiple plans? | No — plans are per organisation. |
| 11 | Can I pay with my bank instead of my credit card? | Wire/ACH available for annual purchases over $12K. |

**Structural notes.** Ordering: services → trial → **two definitional questions** →
three capability-limit questions → three AI/security questions → two billing questions.

Q3 and Q4 are the unusual ones. A pricing FAQ that pauses to define its own billing units
before answering any pricing question is rare, and it is the right sequencing: every later
answer (`up to 10 seats`, `10 channels per license`) depends on those two definitions.
**The glossary is inside the FAQ, at the point of first need.**

Q2 is a **compound question** ("How does Front's free trial work? Do I need a credit
card?"), the same device Wise uses — pairing the general question with the specific anxiety
so one answer serves both.

Q5, Q10 and the trial answer all begin with a flat `No` or an explicit negative. No
softening, no "unfortunately". Consistent register across refusals.

Q7's phrasing — "**Which providers power** Front AI features?" — is written from the
procurement reviewer's position, not the end user's. The whole Q7–Q9 block is buyer-side
diligence content sitting inside a public FAQ, which is a deliberate sales-enablement
decision.

**Placement B — inline per help article.** Short `## FAQ` sections at article foot, with
questions in the user's voice:

| From | Question (verbatim) |
|---|---|
| Subscribing | Why can't I find a subscribed conversation? |
| Subscribing | Does unsubscribing affect other teammates? |
| Subscribing | Why am I subscribed to a conversation I didn't follow? |
| Comments | How do I view my mentions? |
| Ticket statuses | How will I know when the customer replies to a conversation? |
| Ticket statuses | How does snoozing work with ticket statuses? |
| Ticket statuses | Can I change the default status in my send button? |
| Ticket statuses | Do time goals work with ticket statuses? |

`Why am I subscribed to a conversation I didn't follow?` is the standout. It is written
from a position of mild grievance, names the exact confusion ("I didn't follow it"), and
its answer is a ranked list of the three most likely causes with the relevant preference
named in bold. That is a diagnostic answer, not a description. The equivalent in most
products would be titled "About automatic subscriptions".

## T13 Terminology & glossary

| Term | Front's usage | The alternative it rejected |
|---|---|---|
| `conversation` | The core object, everywhere. Never "thread", never "email", never "case". | "ticket", "thread", "case", "issue" |
| `ticket` | Reserved for the *opt-in ticketing layer* — `ticket status`, `ticket ID`, `ticket status group` | Front deliberately does **not** call the base object a ticket |
| `teammate` | Every internal person, in every article | "user", "agent", "member" — though `agent` reappears in AI and analytics copy (`agent performance`, `Real-time agent availability`) |
| `assignee` / `Assigned to me` | The single owner | "owner", "responsible" |
| `Unassigned` | A first-class selectable value, not an absence | "None", "Nobody" |
| `subscriber` / `Subscribed` | Someone following a conversation | "watcher" (Jira), "follower" — though the help text glosses it *as* following: "like 'following' or 'unfollowing' a thread on social media" |
| `participant` | Anyone in the conversation, superset of subscriber | "recipient" |
| `mute` | **Legacy synonym for unsubscribe**, surviving only as a search keyword at the article foot and inside an old URL slug (`subscribing-and-muting-a-conversation`) | The current term is `unsubscribe`; `mute` was retired but kept findable |
| `comment` | The internal message type | "note", "internal note" (Zendesk's term), "private reply" |
| `contextual comment` | A comment anchored to highlighted text in a message | "annotation", "inline comment" |
| `internal discussion` | A conversation with no customer in it | "chat", "channel" |
| `shared draft` | A reply multiple teammates can edit before sending | "collaborative draft" |
| `bump` | Automatic resurfacing of a conversation, noun and verb | "reopen" (which Front also uses, for the manual action) |
| `snooze` | Defer with a timer | "pend", "on hold" |
| `Later` / `Done` | Personal destination sections | "Snoozed" / "Archived" — which are the *shared* names for the same thing |
| `Waiting` / `Resolved` | Ticketing destination statuses | see above; three names per state |
| `Views` | The saved-filter object that replaced `Teammates list` in 2023 | "Saved searches", "Queues" |
| `workspace` | The container above inboxes | "team", "org" |
| `channel` | A connected communication medium, and a billing unit | "inbox", "integration" |
| `inbox zero` | Used unglossed as the goal state | |
| `Autopilot` / `Copilot` / `Smart QA` / `Smart CSAT` | The four named AI products | Aviation metaphor for the autonomy split |
| `Topics` | AI-derived conversation categorisation | "tags", "intents" |
| `guest` | An outside person invited into a conversation or discussion | "external collaborator" |
| `delegated inbox` | Someone else's individual inbox you can work in | "shared mailbox", "proxy access" |
| `coordination tax` | Front's coined term for the cost it sells against, used as a report title and a footer link | |

**Three observations.**

**`conversation` vs `ticket` is the central terminological bet.** Front sells against
Zendesk, and the word `ticket` is Zendesk's word. So the base object is a `conversation`
forever, and `ticket` is confined to a feature you switch on. But the ticketing feature
then introduces a *second complete state vocabulary* (T6), which means the terminological
purity comes at the cost of every user learning two sets of state names. **The naming
strategy and the state model are in tension, and the help centre absorbs the difference.**

**`mute` is the best-preserved fossil in this corpus.** The current UI says
`Unsubscribe`; the article is titled `Subscribing and unsubscribing from a conversation`;
the canonical short URL still contains `subscribing-and-muting-a-conversation`; and the
foot of the article carries three bare keywords, `unsubscribe` `mute` `subscribe`. Front
retired the word from the interface and deliberately kept it findable. That is exactly the
right handling of a renamed concept and most teams do only half of it.

**`teammate` is chosen over `agent` and then leaks.** The collaboration help uses
`teammate` without exception — it frames the shared inbox as a peer group rather than a
queue of labour. But analytics and AI copy say `agent` (`agent performance`,
`Real-time agent availability`, "Your agents shouldn't spend half their time…"). The split
is not random: `teammate` appears where the reader is a worker, `agent` where the reader is
a manager measuring workers. Probably deliberate, and worth naming as a register decision
rather than a defect — but it does mean one person is called two things depending on who is
looking at the screen.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the reader, `we`/`our` for the company, and —
distinctively — **second person for the teammate as well**: "Others will be able to tell
when you have last read the message", "this will not change the conversation's status in
other teammates' *Subscribed* sections". The help copy constantly holds two people in
frame at once, which is what a shared-inbox product has to do and which most collaboration
documentation fails at.

**Register, by surface.** Three clearly separated registers:

1. **Marketing** — irreverent, adversarial, idiomatic: `tab hell`, `gnarliest tickets`, `Ready to tame the insanity?`, `Chat people don't hate`, `CSAT without the lies`, `Stop answering déjà vu`, `Alt+Tab isn't a workflow.` Comma splices and sentence fragments used as rhythm.
2. **Help** — plain, procedural, near-humourless. Bolded UI nouns, italicised UI labels, numbered `**Step n**` blocks. One permitted flourish: "Don't worry about sharing something by mistake".
3. **State names** — bare, uncoloured, single words: `Open`, `Waiting`, `Resolved`, `Later`, `Done`, `Trash`, `Spam`.

The gradient is steep and consistent. **Voice is spent entirely at the top of the funnel
and withdrawn completely at the point of action** — which is the right allocation, because
`Resolved` has to mean the same thing to every member of a team and a joke in a state name
would be a liability.

**Typographic conventions in help** `[observed]`: UI labels in *italics* (`*Assign*`,
`*Unassigned*`, `*Later*`), emphasis in **bold** ("will **not** change"), keyboard shortcuts
as `*Cmd/Ctrl*+*period (.)*`. The bolded `not` is used repeatedly and correctly — in an
article about whose view changes, the negation is the load-bearing word and it is always
visually marked.

**Emoji as status carriers** `[observed]`: 🔵 `Open status`, 🟡 `Waiting status`,
🟢 `Resolved status` in the ticketing article, and ⚠️ to flag legacy features. Colour is
being used semantically in help text, which will not survive a screen reader — the coloured
dot is redundant with the adjacent word, so this is acceptable, but the ⚠️ is the sole
marker of the legacy warning's severity.

**Numbers as trust devices** `[observed]`: `9,300+ companies` (used three times),
`428% average ROI`, `97% customer satisfaction`, `40% productivity increase`,
`7x faster response time`, `160+ integrations`, `up to 70% of requests`,
`Save 24%`, `100 MB size limit`. Each attributed to a named customer where it is a result,
unattributed where it is a product claim.

**Accessibility content** `[observed]`

- Marketing images carry descriptive alt text throughout: `Front Product Interface Screenshot`, `Customer Service Icon`, `Company Logo Uber Freight`, `Front Coordination Tax Promo Image`. Functional rather than evocative, but present and meaningful.
- Social icons carry both alt text and `title` attributes (`Linked In`, `Facebook`, `Instagram`).
- **Help-centre screenshots carry no alt text at all.** Every instructional image in every article harvested renders as a bare `![]` with a CDN URL. This matters more than usual because of the next point.
- **The collision-detection article's entire substance is inside an un-alt-texted image.** The article body is two sentences ("If a teammate is working on a message in a shared inbox, you will see indicators that they are replying. Draft content is automatically shared and updated immediately.") followed by one screenshot. The actual indicator strings — the thing a content designer would want — are **not published as text anywhere**. For a screen-reader user, Front's flagship collaboration feature is documented in two sentences with no detail. `[absent]` and recorded as the single biggest gap in this harvest.
- No `Skip to content` link found. `[absent]`
- No accessibility statement or VPAT link in either footer. `[absent]`

**Negative findings, recorded honestly**

- `meta-description` on the pricing page reads "Front is **a best way** to route…" — a live grammatical error in the string search engines display.
- `Try for free` / `Try for Free` / `Start free trial`, and `Request demo` / `Request a demo` / `Request a Demo` — six strings, two actions.
- `Sign in` (marketing) vs `Log in to Front` (help centre).
- `Customer Service` / `Customer Support` / `Help Desk` — three labels, and two of them point at the same URL.
- `SaaS Service Agreement` (front.com footer) vs `SaaS Services Agreement` (help footer and URL).
- `Front chat` (status page) vs `Front Chat` (pricing page).
- `Real time events` and `Rules and Workflows` break the sentence-case pattern used by the other status components.
- `Twitter` still used as a component name and a social destination.
- In the ticketing article: "you'll see the tabs **Unassigned/Assign** OR Open" — should be `Assigned`. A typo inside the canonical description of the tab set.
- Two contradictory statements about whether an @mention subscribes you (T9).
- Two URL schemes for the same help articles, both linked from within a single article.
- Breadcrumb label `Workflow basics` resolves to the same category ID as `Using Front`.
- The help search region renders `No results found` before any query is entered.
- `Getting started` and `Using Front` both describe "your **new** Front account / inbox" in evergreen category descriptions.
- A live help article last edited May 2020.
- The `most popular` badge on the highest-priced plan.

---

## Transferable patterns

1. **Put ownership in the placeholder, not the styling.** `Add internal comment` as the
   field's own text means the internal/external distinction is read by everyone, including
   screen-reader users, at the moment of typing — not carried by a yellow background. Any
   product with an internal-note-vs-customer-reply split should copy this exactly. It is
   the cheapest possible mitigation of the most expensive possible mistake.

2. **Explain a state change by whose view it changes, surface by surface.** Front's
   conversation-status article is organised by *where you acted from*
   (`Shared inbox` / `Assigned to me` / `Subscribed` / `Individual inbox` /
   `Delegated inbox`) rather than by *what you did*. For any multi-user object, the
   question is never "what does Archive do" but "what does Archive do **to them**".

3. **Give the owner a protected queue and say so as a consequence.** "If a teammate who is
   not the assignee changes a conversation's status from a shared inbox, then the
   conversation will stay open in the assignee's *Assigned to me* section." Ownership is
   only real if a third party cannot clear your list. State the guarantee in the
   documentation of the action that would otherwise seem to break it.

4. **Hover-to-see-blast-radius on shared state controls.** Conditional confirmation dialogs
   plus an always-available hover preview of the impact. Transfers to any bulk action,
   permission change, or shared-workspace mutation.

5. **When you rename a concept, retire it from the UI and keep it in search.** `mute` →
   `unsubscribe`, with `mute` surviving as a visible keyword tag and in the legacy URL
   slug. Half of teams change the label and break search; the other half keep both labels
   and confuse users. Front did the whole job.

6. **Define your billing units in the pricing FAQ, before any price question.**
   `What is a seat?` and `What is a channel?` each answered in one sentence, positioned
   above the capability-limit questions that depend on them.

7. **Publish the mapping when you ship a second vocabulary.** Front's
   Open→Open / Snoozed→Waiting / Archived→Resolved table, stated in both directions
   including what happens on disable, is the minimum honest response to a dual-naming
   migration. Better still is not to ship the second vocabulary — but if product reality
   forces it, publish the table and use the word `traditional` for the old set as Front
   does, so users know which is which.

8. **Distinguish two statuses by user intent when the external facts are identical.**
   `Waiting` and `Resolved` both describe "waiting on the customer"; the difference is
   whether you owe a follow-up. Writing the intent into the status definition, with two
   worked situations each, is more useful than adding a field.

9. **A descriptor line per nav item, each naming the incumbent's failure.**
   `Escape from tab hell`, `CSAT without the lies`. High risk, high reward — it requires a
   product that can actually make the claim, and it must be quarantined to marketing.

## Caveats & gaps

- **Collision-detection strings are unretrievable.** The named benchmark strength for this
  product is only two sentences of published prose; the actual indicators ("X is replying",
  or whatever they say) exist solely inside a screenshot with no alt text. This is the
  most significant gap in the file and it would require an authenticated pass to close.
- **All in-product strings are `[documented]`, not observed.** Toolbar labels, dropdown
  values, tab names, placeholder text and preference labels are taken from help-article
  prose, where Front italicises them. Italicised strings in help are high-confidence but
  not identical to seeing the UI — capitalisation in particular may differ.
- **No empty states, no toasts, no validation messages, no error dialogs** were observable.
  The only empty state recorded is a help-search defect.
- **Article bodies from three of four help categories were not opened.** `Getting started`
  (201 articles), `Rules` (37) and `API & integrations` (200) were not read beyond their
  index entries. `Rules` in particular would likely hold the richest automation and
  condition vocabulary in the product.
- **The product marketing pages were not individually harvested** —
  `/product/ticketing-system`, `/product/omnichannel-support-inbox`,
  `/product/copilot-ai-assistant` and the eight `/compare/` pages are unread. The
  `/compare/front-vs-help-scout` page in particular would be directly relevant to corpus
  entry #188 and is an obvious follow-up.
- **The public glossary at `front.com/glossary`** is linked in the footer and was not
  fetched. For a T13 section this is a notable omission.
- **Only en-US.** The help centre is path-scoped `/en/`, and `Multi-language knowledge base`
  is an Enterprise feature, so localised variants of these strings exist and were not
  compared.
- Mobile app strings out of scope; the comments article notes mobile feature gaps
  ("We do not yet support the ability to add a new contextual comment in the mobile app")
  but does not quote mobile UI.
- The pricing feature matrix was captured but its long tail (`Ticketing system`,
  `Rules & workflow automation`, `CRM`, `Reporting & analytics`, `Help center`,
  `Integrations`, `Security & team management`, `Support & services` sections) renders as
  collapsed accordion headers with no row content in the retrieved HTML.

## Sources

1. https://front.com/
2. https://front.com/pricing
3. https://help.front.com/en/
4. https://help.front.com/en/categories/188-using-front
5. https://help.front.com/en/categories/199-work-together
6. https://help.front.com/en/articles/2344
7. https://help.front.com/en/articles/2403
8. https://help.front.com/en/articles/2134
9. https://help.front.com/en/articles/1300288
10. https://help.front.com/en/articles/2256
11. https://help.front.com/en/articles/2198
12. https://www.frontstatus.com/
