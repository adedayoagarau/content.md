# 007. Airtable

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | No-code relational database / app-building platform |
| Primary URL | https://www.airtable.com/ |
| Corpus rank | 007 |
| Benchmark strength (source list) | Structured-data guidance |
| Locale / market observed | en-US (product UI also ships fr, de, es per docs) |
| Platform observed | Web (desktop), Pylon-hosted help centre, Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Accessibility target stated as WCAG 2.2 AA with third-party VPAT/ACR audits; GDPR-style rights not surfaced on pages harvested |
| Harvest date | 2026-09-21 |
| Pages inspected | 17 |
| Harvest completeness | Partial — the pricing page's plan-comparison table is client-rendered and returned only headings plus the FAQ; plan detail was recovered from the help centre instead. In-product empty states are not observable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://www.airtable.com/ | Hero, mega-nav, five scripted product demos with visible demo data |
| Pricing | https://www.airtable.com/pricing | **Partially blocked** — tier cards did not render; 7-question FAQ captured in full |
| Help centre index | https://support.airtable.com/ | 18 top-level collections with article counts; `Popular Articles` block |
| Status page | https://status.airtable.com/ | Single service component; subscribe channels |
| Help: Getting started | https://support.airtable.com/collections/7410844392-getting-started-with-airtable | 14 article titles — the onboarding IA |
| Help: Airtable Fields | https://support.airtable.com/collections/6863767017-airtable-fields | 10 sub-collections by field family |
| Help: Fields Overview | https://support.airtable.com/collections/8998700582-fields-overview | 8 article titles |
| Help: Airtable Views | https://support.airtable.com/collections/9049293842-airtable-views | 3 sub-collections |
| Help: View Types | https://support.airtable.com/collections/5056379050-view-types | 7 named view types with article counts |
| Help: Airtable Records | https://support.airtable.com/collections/3569848325-airtable-records | 3 sub-collections |
| Help: Record actions | https://support.airtable.com/collections/4392501043-record-actions | 4 article titles |
| Article: Glossary | https://support.airtable.com/articles/6687333754-glossary-of-airtable-terminology | **Richest single source** — ~85 defined terms |
| Article: Introduction to Airtable basics | https://support.airtable.com/articles/1747995963-introduction-to-airtable-basics | Object-model walkthrough; localisation FAQ |
| Article: Airtable home screen | https://support.airtable.com/articles/6915359572-airtable-home-screen | Nav labels, starring/pinning, sort and filter controls |
| Article: Airtable plans overview | https://support.airtable.com/articles/2277136852-airtable-plans-overview | Limits, billable-collaborator rules, verbatim error string, trial banner |
| Article: Troubleshooting products and features | https://support.airtable.com/articles/2373557978-troubleshooting-airtable-products-and-features | Troubleshooting router and its title grammar |
| Accessibility statement | https://www.airtable.com/company/accessibility | WCAG target, auditor, feedback routes |
| Template gallery | https://www.airtable.com/templates | **Not fetched** — template names recovered from nav instead |

---

## T1 Navigation & IA labels

**Global nav — four dropdowns plus two flat links** `[observed]`:
`Platform` · `Solutions` · `Resources` · `Enterprise` · `Pricing`, then
`Book demo` · `Sign in`.

`Enterprise` sits as a peer of `Platform` and `Solutions` — an audience tier
promoted to top-level nav. Note that the header `Enterprise` links to
`/solutions/enterprise` while the footer `Enterprise` links to `/services`.
**Two destinations, one label** — recorded as a defect.

**Platform dropdown is three-tiered**, and the tier names are the interesting
part `[observed]`:

- Group 1 `Platform & Products`: `Airtable Platform` · `AI App Building` (NEW) ·
  `AI Agents` (NEW) · `Portals` · `Scale` · then a nested `Platform Features`
- Group 2 (nested) `Features`: `Automations` · `Databases` · `Interfaces` ·
  `Reporting` · `Views` · `Governance and Security` · `Airtable AI` · `What's New`
- Group 3 `Tools`: `Integrations` (nested) · `Download`

The `Products` / `Features` split is a genuine IA decision: capabilities that can
be bought or positioned separately (`AI Agents`, `Portals`, `Scale`) sit one
level above capabilities that are part of the base product (`Views`, `Automations`).
`Scale` is the standout label — a single abstract noun naming what is
internally `hyperdb` (visible in the URL `/platform/hyperdb`). The **marketing
label abstracts away the engineering name** and the URL preserves it.

Note `Governance and Security` in the dropdown vs `Governance & Security` in the
footer — ampersand inconsistency for one node.

**Solutions is split into two named axes** `[observed]`, which is cleaner than
most competitors:

| `Teams` | `Industries` |
|---|---|
| `Product` · `Marketing` · `Project Management` · `Operations` · `Sales` · `Design & Creative` · `Human Resources` · `Finance` | `Media & Entertainment` · `Retail` · `CPG Manufacturing` · `Education` · `Technology` · `Agency & Professional Services` |

Each carries a one-line benefit, and the lines are verb-first and outcome-shaped:
`Project Management` → "Strategic project management built for outcomes, not just
to-do lists." (a direct swipe at the T6 problem — see below);
`Human Resources` → "Manage and streamline processes from hire to retire"
(rhyme as a mnemonic, and the only nav line with no full stop in that group);
`Marketing` → "Plan smarter campaigns and scale impact with unifed marketing
workflows." — **`unifed` is a live typo in production nav copy.**

**Resources dropdown is split `Explore` / `Learn & Support` / `Ecosystem`**
`[observed]`. `Learn & Support` contains `Airtable Academy` ·
`Airtable Community` · `Developers Docs` (nested) · `How-to guides` ·
`Support` (nested: `Help center`, `Contact Support`). Five distinct learning
destinations under one heading — academy, community, dev docs, guides, help
centre — with no stated difference between `How-to guides` and `Help center`.

**Help-centre top level — 18 flat collections with article counts** `[observed]`.
Fourteen of the eighteen are prefixed with the word "Airtable":

| Collection | Count |
|---|---|
| `Getting started with Airtable` | 14 articles |
| `Airtable AI` | 5 |
| `Airtable Automations` | 47 |
| `Airtable Bases` | 14 |
| `Airtable Betas` | 3 |
| `Collaborating in Airtable` | 15 |
| `Airtable Enterprise Support` | 49 |
| `Airtable Extensions` | 37 |
| `Airtable Fields` | 73 |
| `Integrating with Airtable` | 23 |
| `Airtable Interface Designer` | 12 |
| `Learning and Resources` | 3 |
| `Managing Airtable` | 28 |
| `Airtable Policy` | 8 |
| `Airtable Records` | 6 |
| `Airtable Sync` | 29 |
| `Airtable Views` | 28 |
| `Airtable Workspaces` | 2 |

Two observations. First, **the taxonomy is the object model**, almost exactly:
Workspaces → Bases → Tables (absent as a category) → Records → Fields → Views,
plus the cross-cutting features. A user who understands the data model can
navigate the help centre without reading a single description. That is the
defining IA property of this product and the reason its `structured-data
guidance` is strong.

Second, **the counts are wildly uneven and are displayed**: `Airtable Fields` has
73 articles, `Airtable Workspaces` has 2. Publishing the count lets the user
calibrate before clicking, but it also exposes that `Records` (6) — the thing the
user actually manipulates — is documented one-twelfth as heavily as the fields
that describe them. `Airtable Betas` (3) as a top-level category is unusual:
beta features get their own permanent shelf rather than being folded in.

There are **no scope lines** under the help collection names — only counts. This
is thinner than Wise or Trello, and relies entirely on the noun being
self-explanatory, which works only because the object model is already taught
elsewhere.

**Help centre is nested three or four deep** `[observed]`:
`All Collections` → `Airtable Fields` → `Fields Overview` → article; and
`All Collections` → `Airtable Views` → `View Types` → `Kanban View` → article.
`Kanban View` is a collection containing **1 article** — a container created for
taxonomic symmetry rather than volume. Several such singleton collections exist
(`Long Text Field` 1 article, `Number-Based Fields` 1 article,
`Expanded records` 1 article, `Record templates` 1 article). The IA is
**model-shaped rather than content-shaped**, and pays for that consistency with
near-empty nodes.

**Footer groupings** `[observed]`: `Platform` · `Solutions` · `Resources` ·
`Learn` · `Company`, each with `See more` / `Show less` progressive disclosure,
then a legal strip: `Security` · `API` · `Privacy` · `Terms` ·
`Do Not Sell/Share My Info` · `Cookie Preferences` · `Accessibility`.
`Status` sits inside `Company` behind `See more` — less prominent than Trello,
which promotes status to a support-hub card.

## T2 Value proposition & headline patterns

**Hero — two fragments, then a competitive rebuttal** `[observed]`

> `Teams, workflows, and agents. All in one space.`
>
> "Other tools let you build with agents. Airtable lets you build with your whole
> team — agents included."

The structure is a **concession-then-reframe**: it grants that competitors have
the headline capability ("other tools let you build with agents"), then moves the
axis of comparison to a different noun ("your whole team"). No superlative, no
number, no "the world's leading". The em-dashed coda
("— agents included") does the work of a whole paragraph by folding the
competitor's differentiator back inside Airtable's own.

Note the headline is a **noun list plus a location claim**, not a verb. Compare
Trello, whose hero is three verbs. Airtable sells a *place*; Trello sells an
*activity*.

**Section headers are one-line imperatives or claims** `[observed]`:
`Build anything` · `Turn builder speed into business momentum.` ·
`Trusted by 500,000+ companies`.

`Turn builder speed into business momentum.` is the notable one — it names the
user by role (`builder`) rather than by title or team, which is consistent with
the glossary's own use of `builders` as a first-class role word (see T13).

**Customer proof is structured as headline + mechanism + metric**, repeated five
times `[observed]`. The grammar is rigid and worth copying:

| Headline (verbatim) | Metric |
|---|---|
| `OpenAI uses Airtable to surface product risks faster` | `50+` projects tracked with weekly AI summaries |
| `eBay triages 1M+ customer insights in real time` | `>90%` faster feedback triage |
| `Publicis Media ships campaigns 70% faster` | `70%` faster turnaround time |
| `Highspot runs product on one centralized roadmap` | `5→1` "Five tools to one system of record." |
| `MGA cut creative-brief processing by 60%` | `60%` reduction in creative brief processing time |

Every headline is **`<Customer> <present-tense verb> <specific object>`** — no
"How X did Y", no "Case study". Then a mechanism sentence in second person
("Centralize feedback, use AI to surface key insights, and turn them into
prioritized work"), then a restatement of the headline in past tense
("eBay processes 1M+ customer insights in real-time."), then the metric.

`5→1` is the strongest single device: an arrow glyph carrying the entire
consolidation argument, glossed in five words. And `>90%` uses a mathematical
operator in body copy rather than "more than 90%".

**Recurring nav-embedded value props** `[observed]`:
`The Airtable Platform` → "Propel your business with a next-gen app-building
platform. See data move in real-time and securely transform your work with AI."
and a customer-story teaser headed `More money, fewer problems` — a pop-culture
inversion used as a case-study title.

**Persistent top banner** `[observed]`:
"Bring your Airtable data into Claude." → `Try it now`. Present on every page
harvested, including the accessibility statement, which is a placement worth
flagging: a promotional banner above a legal/accessibility commitment page.

**Pricing headline** `[observed]`: `A plan for every organization's needs` —
a claim of universal fit rather than a price. The tier cards did not render;
the page's next visible heading is `Have additional questions?`, which means
that for a non-JS client **the pricing page contains no prices at all**. A real
accessibility and robustness finding.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start building for free` | Hero, primary | Verb + price. `building` not `using` — role-consistent with `builder` |
| `Book a demo` | Hero, secondary | |
| `Book demo` | Global nav | **Article dropped** vs the hero's `Book a demo` |
| `Book Demo` | Secondary nav row and footer | **Third casing** of the same action |
| `Sign in` | Global nav (desktop) | |
| `Log in` | Secondary nav row | **Two verbs for one action, in the same header block** |
| `Sign up for free` | Secondary nav row, and help-centre header | |
| `Sign up` | Immediately adjacent to the above in the same element | Rendered as `Sign up for freeSign up` in the extracted DOM — a responsive duplicate |
| `Try Airtable for free` | Footer, Company group | Fourth variant of the signup CTA |
| `Try it now` | Persistent top banner | Bare, object supplied by the banner text |
| `Explore the platform` | Platform dropdown feature card | |
| `Explore all resources` | Resources dropdown card | Parallel construction with the above |
| `See all integrations` / `See all templates` / `See all resources` | Dropdown list ends | Consistent `See all X` pattern |
| `Learn more` | Solutions dropdown customer-story card | **Bare `Learn more`** — the card supplies the object |
| `Get in touch` | Under `Trusted by 500,000+ companies` | Softer than `Contact sales` |
| `Contact Sales` / `Contact sales` | Pricing page and footer | Casing drift |
| `Contact support` | Help-centre header | |
| `Billing FAQ` | Pricing page, `Have additional questions?` | CTA text = destination title |
| `Nonprofits` / `Education` | Pricing page, `Special plans for` | Audience nouns as links, completing a sentence fragment |
| `See more` / `Show less` | Footer groups | Progressive disclosure |
| `Start building in Airtable now` | Help-article header block, under `Try it in Airtable` | **A product-entry CTA inside a help article header** — see T11 |
| `Download CSV` | Documented export control | |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Subscribe via Slack` | Status page | Channel named in the label |
| `Resend OTP` | Status page subscribe | `OTP` unglossed |
| `accessibility feedback form` | Accessibility statement | Link text describes the artefact |
| `Request a VPAT` (as prose + mailto) | Accessibility statement | |

**Observations.** The signup action has **four labels**
(`Start building for free`, `Sign up for free`, `Sign up`,
`Try Airtable for free`) and the demo action has **three casings**
(`Book a demo`, `Book demo`, `Book Demo`). Sign-in has two verbs
(`Sign in`, `Log in`) inside one header. This is looser CTA hygiene than Trello,
which is itself loose. Against that, the `See all X` and `Explore X` families
are applied consistently, and `Billing FAQ` follows the good practice of making
link text equal destination title.

## T4 Onboarding & getting-started

**Onboarding is inverted: AI first, template second, manual last** `[observed]`.
The `Introduction to Airtable basics` article opens its `Start creating` section
with three routes, explicitly ranked:

1. Ask `Omni` (the AI assistant) to build a custom app — with the recommendation
   stated outright: "Whenever possible, this should be the option you use, as it
   often will save you time."
2. Enterprise Scale users: use a `managed app` "already approved for use at your
   Airtable organization"
3. "As always, you can also choose to build an app on your own, from scratch. If
   it's your first time building, we recommend that you consider using a template."

This is a genuinely unusual onboarding structure. Most products route first-run
users to templates and treat AI as an accelerator; Airtable **demotes both
templates and from-scratch building below the AI route, and says so in one
sentence.** Note the hedge "often will save you time" rather than "will save you
time" — a bounded claim in the recommendation itself.

Also note the governance-aware second route: for enterprise users the
recommended path is an app someone else already approved. Onboarding copy that
differs by whether your org has a procurement posture is rare.

**The object model is taught in dependency order** `[observed]`. The
`Introduction to Airtable basics` article walks:
`Workspaces` → `Bases` → `Tables` → `Records` → `Fields` → `Views`, then
`Collaboration` → `Permissions` → `Account` → `Billing` → `Enterprise Scale`,
then `Icons and colors` → `Automations` → `Interfaces` → `Extensions`, then
`Airtable API` → `External integrations` → `Airtable Sync`.

Four named phases: `Start creating` → `Bring your team onboard` →
`Automate and customize` → `Expand and scale`. Container before contents,
people before process, process before integration. Each section ends with a
consistent `Learn more about <thing> →` link carrying a right-arrow glyph.

Each definition leads with the **analogy or the concrete instance, not the
abstraction**:

- `Bases` — "similar to a folder that contains individual files"
- `Records` — "If you're assembling a staff directory, it's each person; if
  you're tracking inventory, it's a product."
- `Fields` — "These are the vertical columns in your table, each one for a
  different variable associated with a record."
- `Views` — "Views let you see the same information from different angles"

The `Records` definition is the best piece of explanatory copy in this harvest:
**two contrasting worked examples in one sentence**, chosen so that the
abstraction (an item in a table) is inferable from the pair rather than stated.
That is a directly reusable technique for any polymorphic object — a "payment",
a "case", an "item".

**`Views` is defined by purpose before mechanism** — "see the same information
from different angles" precedes any mention of filters or field hiding. The
mechanism follows in the next clause. Purpose-then-mechanism ordering is
consistent across all six object definitions.

**Trial onboarding is automatic and stated with its own expiry** `[documented]`:
"After creating a new account in Airtable, your first workspace is automatically
upgraded to a 14-day complimentary trial of the Team plan." And critically:
"Future Free plan workspaces created under the same account will not receive
this complimentary Team trial." The **non-repeatability of the trial is disclosed
at the point the trial is explained**, not discovered later.

The trial's own limits are then listed separately from the plan's limits, under
two distinct headings — `What features aren't included in the Team trial plan?`
(2 items) and `What features are limited when using Team trial plans?` (6 numeric
limits). Splitting *absent* from *reduced* is a real distinction most trial copy
collapses.

**In-product trial countdown, quoted in the docs** `[documented]`:

> `Upgrade to the Team plan before your trial expires in X days.`

The docs render the interpolation token as a literal `X`. Useful to record: the
help centre exposes the *shape* of the string, and the placeholder is a bare
capital letter rather than a named variable — a hint that the underlying string
is `...expires in {0} days` with no pluralisation branch visible.

## T5 Form & field labels

Airtable's field system *is* the product, so this category is unusually rich even
without authenticated access. All `[documented]` unless noted.

**Field-type taxonomy, as the help centre groups it** `[observed]`:

| Family | Articles | Members named elsewhere |
|---|---|---|
| `Attachment` | 3 | |
| `Date-based fields` | 5 | |
| `Formula` | 41 | |
| `Long Text Field` | 1 | |
| `Linked Record Field` | 4 | |
| `Number-Based Fields` | 1 | includes `rating` per plan docs |
| `Other Fields` | 3 | includes `checkbox` per plan docs |
| `Rollup, lookup, and count fields` | 4 | |
| `Select and user fields` | 3 | `single select`, `multiple select`, `user` |

`Other Fields` as a category name is an honest admission of a leftover bucket —
and it is only 3 articles, so the taxonomy is mostly clean. `Formula` at 41 of
73 field articles shows where the complexity actually lives.

The grouping logic drifts, though: `Long Text Field` (singular, title case),
`Number-Based Fields` (hyphenated, plural), `Date-based fields` (hyphenated,
sentence case), `Select and user fields` (sentence case, conjunction),
`Rollup, lookup, and count fields` (serial comma). **Five different naming
conventions in one nine-item list.** Recorded as a defect.

**`Field type` defined as a first-class concept** `[observed]`, glossary:
"A field type specifies the kind or format of data stored in a given field — for
example, long text, date, multiple select, or attachment." Naming the *type of
the type* and giving four instances, again the worked-examples technique.

**`Primary field` — a constraint explained as a role** `[observed]`:
"The primary field is always the first column, or field, in any table. It
represents a description of each record in the table and cannot be deleted,
moved, or hidden. The primary field is used as a brief description of a record in
other parts of the UI."

Three things happen in four sentences: the position rule, the semantic role
("represents a description"), the three prohibited operations listed together,
and the downstream consequence ("used … in other parts of the UI"). Explaining
*why the restriction exists* by naming what depends on it is the transferable
move — compare the common alternative, "The primary field cannot be deleted."

**Filter/condition vocabulary — a three-part anatomy published to users**
`[observed]`, glossary:

> `Condition` — "A rule used to filter records… A condition contains three parts:
> A field / An operator (ex. "contains," "has any of," "is greater than") /
> A value (which records are compared against)"
>
> `Condition group` — "A combination of conditions connected by a conjunction"

Airtable ships the words `condition`, `operator`, `value`, `conjunction`, and
`condition group` to end users, and defines each. Most consumer products hide
this and say "filter". The decision to expose the grammar is what makes complex
filtering learnable, and the operator examples are given **in quotation marks
exactly as they appear in the UI** (`"contains,"` `"has any of,"`
`"is greater than"`) — note `has any of`, a plain-English rendering of set
membership, chosen over "includes any" or "in".

**Documented control labels and settings** `[observed]`:
`Base guide` ("an optional, user-generated description of the base that will
appear when a user opens the base for the first time") · `Invite` ·
`Invite link` · `Share` · `Download CSV` · `Language preferences` ·
`Billing` · `Open anytime` and `All organizations` (two home-screen filter
dropdown defaults) · `List` / `Grid` home-screen view toggle ·
`Data` (app hover action) · `Options` (the `...` menu, called "the "..." spillover
menu" in docs — `spillover` is internal vocabulary leaking into user docs).

`Base guide` is worth singling out: a purpose-built field whose whole job is
**first-run explanatory copy written by the customer's own admin**, shown on
first open. Airtable has productised the empty-state brief — see T8.

**Status-page form labels** `[observed]`: `Email address:` · `Enter OTP:` ·
`Country code:` · `Phone number:` · `Change number` ·
`Didn't receive the OTP?` — identical to Trello's, because both are Atlassian
Statuspage. `OTP` is unglossed on both.

## T6 Status & state language

The critical finding: **Airtable ships no workflow status vocabulary at all.**
Like Trello, status is user-authored — but Airtable goes further, because there
is not even a `complete`/`incomplete` binary. A status is just a `single select`
field whose options the customer types.

**What Airtable does own is state vocabulary for the *artefacts*, not the work**
`[observed]`, from the glossary:

| State / concept | Definition summary |
|---|---|
| `Collaborative view` | Default view type; configuration editable by all creators/editors |
| `Personal view` | Created by one person, for themselves or assigned to others |
| `Locked view` | "prevent all collaborators from customizing or modifying its view configurations (until the view is unlocked)" |
| `Verified data` | Business/Enterprise only; "approved by admins… and shared for use by other people in that organization" |
| `Verified data library` | "A repository for all of the verified data sets… Only admins can approve and publish" |
| `Snapshot` | "captures a version of the base at a particular moment in time" |
| `Revision history` | "shows the changes made to the record over time" |
| `Trash` | "deleted items… temporarily available to be restored for seven days after deletion" |
| `Dependencies` | field-level; "useful in understanding the implications of changing or deleting that field" |
| `Limit` | "The maximum number or amount of something (users, records per base, attachment storage) allowed on a given plan" |
| `Two-way sync (In limited beta)` | Beta status carried **inside the glossary term itself** |
| `Enterprise` / `Plus` / `Pro` | All three marked `(Legacy)` or "now a legacy Airtable plan" |

Three of these deserve attention.

**`Locked view` publishes its own exit condition.** "…until the view is
unlocked" — a parenthetical that turns a restriction into a reversible state. One
clause prevents the "am I stuck?" support ticket.

**`Verified data` is a governance state with a named approver.** The definition
states who can move data into the state (admins), where it goes (a library), and
who can then consume it (other members of the organization). An
approval-workflow state modelled and named for users, with the permission gate
in the definition rather than in a separate permissions article.

**`Trash` states its retention period in the definition.** "seven days" appears
in the glossary entry, not only in the article. A user reading the glossary to
find out what Trash *is* also learns how long they have — the answer to the
urgent question is inside the answer to the calm one.

**Permission levels are the real state machine** `[observed]`. Five levels,
each defined per-surface in the glossary:

| Level | Workspace / base | Interface |
|---|---|---|
| `Owner` | "fully configure and edit all bases and interfaces… and manage workspace settings and billing" | — (workspace only) |
| `Creator` | "fully configure and edit all bases in the workspace" | — |
| `Editor` | "can edit and create records and views, but not configure tables or fields" | "can update editable fields, but cannot add or edit elements" |
| `Commenter` | "can comment on records and create personal views" | "can comment on comment fields and attachments" |
| `Read-only` | "can view, but not edit or comment on, everything" | same |

Every definition is a **capability pair: what you can do, then what you cannot**,
joined by `but not`. Five levels × two surfaces, all following the same
grammatical frame. That consistency is what makes a five-level permission model
legible, and it is the single most copyable construction in this file: for each
role, one sentence, one `but not`.

Note the orthogonal collaborator *scopes* layered on top:
`Workspace collaborator` · `Base collaborator` · `Interface-only collaborator` ·
`Billable collaborator` · `Group manager` · `Org admin`. A user's effective
state is (scope × level), and Airtable names both axes.

**Status vocabulary visible in the home-page demos — explicitly NOT product
copy** `[observed, demo data]`. The marketing page runs five scripted product
demos containing example status values. These are **illustrative customer data,
not Airtable strings**, and must not be read as product vocabulary — but they are
worth recording because they show what Airtable *presents as the canonical
example* of good status design:

- Objective states: `On Track` · `At Risk` · `In Progress`
- Task states: `Done` · `In Progress` · `Not Started` · `Unassigned`
- Deal stages: `Qualification` · `Evaluation` · `Proposal` · `Negotiation`, plus
  `Won`
- Content states: `Ideation` · `In review` · `Approved`
- Risk severities with glosses: `Critical` "Immediate action required" ·
  `High` "Urgent attention needed" · `Medium` "Monitor closely" ·
  `Low` "Acceptable risk level"

The risk-severity set is the notable one: **each severity carries an imperative
gloss telling the reader what to do about it**, not what it means. `Medium` is
not "moderate impact" but "Monitor closely". Severity labels that encode the
required response rather than the assessed magnitude — directly applicable to
fraud, dispute, and risk-queue copy.

Also `Searching web…` appears as an inline per-cell loading state in the demo —
a present-participle-plus-ellipsis in-cell progress string.

**Incident/system states** `[observed]`, status page:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`, with the overall header `All Systems Operational`.

Airtable exposes **exactly one component**: `Airtable Service`. Compare Trello,
which lists five. A single-component status page means the user can never learn
*which part* is degraded — a deliberate simplification with a real information
cost, and worth recording as a status-communication trade-off.

## T7 Error, failure & recovery

**One verbatim error string captured** `[documented]`, quoted inside a plans FAQ:

> "The email address associated with your account is not eligible to be upgraded
> to the Business plan. Please ensure you use a valid email domain."

And the FAQ that surfaces it is titled in the user's voice:
`Why am I receiving an error when attempting to sign up for a Business or
Enterprise Scale plan?`

The article then does something the error string does not: it **names the actual
cause in plain terms** — "it's because you're attempting to sign up using a
public email domain like Gmail, Yahoo, etc." — and then defines the term the
error avoided: `What are private email domains?` → "domains that are exclusive to
a business or organization, unlike Gmail, Yahoo, etc."

This is a clean case study in error-copy failure and its compensation. The error
says `not eligible` (passive, cause unstated) and `a valid email domain`
(implies the address is malformed, which it is not — it is merely consumer-grade).
A user reading that string would plausibly retype their address. The help centre
has to repair the string with two FAQ entries and a definition. **Recorded as
the clearest negative finding in this file:** the error names the rule rather
than the fix, and uses `valid` to mean `not public`.

**The over-limits behaviour is the standout positive** `[observed]`, pricing FAQ
`What happens when I hit my usage limits?`:

> "If you reach (or are over) our record or attachment limits, you'll still be
> able to use your bases and **we will never remove your data**. We'll notify you
> of the overage and you will not be able to add more records or attachments
> until you upgrade to a new plan. For automations and API limits, you will be
> capped at the usage limit on your current plan."

Structure: reassurance first (data safety), then the notification, then the
precise degradation ("will not be able to add more"), then a different rule for a
different resource class. The **absolute promise ("never") comes before the
restriction**, which inverts the usual order. And the degradation is *read-write
asymmetric* — you keep read and edit, you lose create — stated in one clause
rather than as "limited functionality".

Note also the parenthetical "(or are over)": the copy covers the case where the
user is *already* past the limit when they read this, not just approaching it.

**Troubleshooting IA is a router, and its titles are uniformly `Troubleshooting
<system>`** `[observed]`:

- `Troubleshooting Airtable automations`
- `Troubleshooting Airtable base performance`
- `Troubleshooting syncs in Airtable`
- `Troubleshooting common Airtable formula errors`
- `Troubleshooting disconnected OAuth integrations in Airtable`
- `Airtable API: Common troubleshooting`
- `Low-code integrations - Common troubleshooting`
- `Third-party integrations - Common troubleshooting`

The first five are `Troubleshooting X`; the last three invert to
`X - Common troubleshooting` / `X: Common troubleshooting`, with a hyphen in two
and a colon in one. **Three punctuation conventions for one title pattern.**

Every title is **system-named, never symptom-named.** There is no
`My automation didn't run`, no `My records disappeared`, no
`Why is my base slow?`. Compare Trello (`Emails sent to Trello Inbox never
arrive`) and Wise (`I sent money to the wrong person`). Airtable's
troubleshooting IA requires the user to already know which subsystem failed —
which is defensible for a builder audience and a real findability cost for an
end-user one. `Troubleshooting disconnected OAuth integrations in Airtable`
assumes the user knows the word OAuth and that theirs is "disconnected".

**Register of the troubleshooting router's opener** `[observed]`:

> "We're sorry to hear that you've run into a bump in the road while using
> Airtable. Before contacting our Support team we recommend that you check any
> articles listed below…"

An apology, an idiom (`a bump in the road`), and a deflection to self-service, in
two sentences. The idiom is the only colloquialism in the help copy harvested,
and it sits at the exact point of user frustration — the opposite of the Wise
convention of flattening tone as stakes rise. Also note the deflection is stated
as a recommendation with a reason omitted; it does not say *why* checking first
helps the user rather than the support queue.

**Recovery affordances named in the glossary** `[observed]`:
`Snapshot` ("Restoring a snapshot copies it into a new base, and **it does not
overwrite the current version of the base**") · `Revision history` · `Trash`
(7-day restore window). The snapshot definition pre-empts the exact fear that
stops people restoring backups — that restoring will destroy the current state —
and does it in a subordinate clause of the definition.

**A documented dead end, stated as one** `[observed]`:
`Can I transfer ownership of a workspace on the Free plan to another
collaborator?` → "No. On the Free plan, changing the workspace Owner isn't
supported—upgrading to a paid plan is required." Answer opens with `No.` as a
complete sentence, then the constraint, then the one route out.

**Contradiction found** `[observed]`, in `Can I extend my Team trial plan?`. The
answer contains two incompatible paragraphs: the first says to contact support
if a trial-extension link doesn't work; the second opens "No, you can't extend a
Team trial yourself." The two were evidently written at different times and
neither was removed. Recorded as a defect.

## T8 Empty states

No in-product empty state was directly observable. What is `[documented]`:

**Airtable's distinctive answer to the empty container is a customer-authored
brief** `[observed]`, glossary:

> `Base guide` — "the base guide is an optional, user-generated description of
> the base that will appear when a user opens the base for the first time. It's
> also accessible to users at any time if they click on the base name to expand
> the drop-down."

This is the most transferable empty-state idea in the harvest. Rather than
writing one generic first-run message, Airtable **ships a slot for the person who
built the thing to explain it to the person who opens it**, fires it on first
open only, and keeps it permanently retrievable behind a predictable affordance.
Three design decisions in one feature: authorship delegated to the domain expert,
timing bound to first encounter, and persistence so it is not a dismissible
onboarding modal. Directly applicable to shared dashboards, team spaces,
handed-over cases, and any surface whose meaning is local to one team.

**The three-route first-run answer** — Omni, managed app, template — is covered
in T4. Note that the template route carries its own conditional framing: "If
it's your first time building, we recommend that you consider using a template."
Double-hedged (`recommend` + `consider`), which reads as reluctance now that AI
is the promoted path.

**Home-screen sections that can be empty** `[documented]`:
`Home` ("refresh the home screen and show your recently opened apps") ·
`Starred` · `Shared` ("view apps that have been shared with you") ·
`Workspaces` · `+ Create`. The `+ Create` description includes onboarding copy
in its own right: "you can choose the workspace location to create your app and
provide information and tips on how to get started" — **tips are attached to the
creation flow rather than to the empty result.**

The article also documents two adjacent-but-different curation mechanisms:

- `Starring` — workspaces, apps, interfaces; surfaces on a `Starred` page;
  reorderable by drag-and-drop in Grid view
- `Pinning` — workspace pages only; **capped at 3 apps**; "Pinned items appear
  in the order that they were pinned—earliest to most recent"

Two favouriting verbs with different scopes, different caps, and different
ordering rules (user-defined vs chronological). Documented clearly, but the
existence of both is a real conceptual load, and neither name tells you which is
which. Recorded as a finding rather than a defect — the docs do disambiguate.

**No-data states on the status page** `[observed]`:
`No incidents reported today.` and `No incidents reported.` — the same adjacent
duplication as Trello's page. Airtable's page lacks Trello's
`No data exists for this day.` / `No downtime recorded on this day.` distinction,
because it has only one component and no per-component daily grid.

**Absent** `[absent]`: no observable copy for an empty grid view, an empty
Kanban stack, a zero-result filter, an empty Trash, an empty notification tray,
or a failed search. The flagged strength of this product is structured-data
guidance rather than empty states, and the empty-state evidence here is
correspondingly thin. An authenticated pass is required.

## T9 Notifications & system messages

`[documented]` and thin, because notification surfaces are post-auth.

**Notifications is a named home-screen element** `[observed]`, item 4 of 10 in
the home-screen anatomy: "`Notifications` - Allows you to review notifications",
linking to a `Managing Airtable notifications` article (not fetched). The
definition is circular — "notifications lets you review notifications" — which is
a minor but real docs defect in an otherwise careful anatomy list.

**Automations are defined as notification producers** `[observed]`, glossary:
"Airtable automations always include a trigger and one or more actions." and, from
the basics article, automations "can trigger notifications, streamline redundant
work, integrate your tools, run custom code". `Trigger` is itself glossed as
"An event or change that sets an automation in motion. Examples of triggers
include editing records or when a form is submitted." — the noun defined, then
two instances.

**In-product banner strings quoted in docs** `[documented]`:

- `Upgrade to the Team plan before your trial expires in X days.` — located
  "under the "Home" section"
- The over-limit notice: described but not quoted — "We'll notify you of the
  overage"

**Overage notification is promised in the pricing FAQ** — the user is told, before
purchase, that they will be warned rather than cut off. Publishing the existence
of a future warning as a purchase-time reassurance is a small, reusable move.

**Status-page notification scope, per channel** `[observed]` — identical
structure to Trello's (shared platform):

- Email: "whenever Airtable **creates**, **updates** or **resolves** an incident"
- SMS: "whenever Airtable **creates** or **resolves** an incident"
- Slack: "incident updates and maintenance status messages"

Airtable's page offers **four channels** (email, SMS, Slack, Twitter) against
Trello's six — no webhook and no Atom/RSS block surfaced. `Message and data rates
may apply.` present on SMS.

**Consent verb varies by channel** `[observed]`: email says "By subscribing you
agree to our Privacy Policy"; Slack says "By subscribing you **acknowledge** our
Privacy Policy. In addition, you agree to the Atlassian Cloud Terms of Service and
acknowledge Atlassian's Privacy Policy." One sentence uses both `agree` and
`acknowledge` for three different documents, drawing a distinction the user has no
way to act on.

**Trial-expiry email referenced** `[documented]`: "If you received an email
offering a trial extension and the link doesn't work, contact Airtable Support" —
evidence of a lifecycle email, contents not observable.

## T10 Disclosures, legal & compliance

Strongest evidence density in this file after T13.

**Limits are published as exact integers, per plan, per resource** `[observed]`:

| Resource | Free | Team | Business |
|---|---|---|---|
| Records per base | 1,000 | 50,000 | 125,000 |
| API calls / workspace / month | 1,000 | 100,000 | Unlimited |
| Attachment storage per base | 1GB | 20GB | 100GB |
| Revision & snapshot history | 2 weeks | 1 year | 1 year |
| AI credits | 500 per editor+/month | 15,000 per billable collaborator/month | 20,000 per paid user/month |

Plus base-level structural limits published in a single FAQ:
`1500 Bases per workspace` · `1000 Tables per base` · `1000 Views per base` ·
`500 Fields per table`.

Two patterns worth extracting. First, the **record limit's aggregation rule is
disclosed with a worked example**, because it is counter-intuitive:
`Does my plan's record limit include records hosted in other tables?` → "Yes,
your plan's record limit is cumulative over different tables. For example, a base
with one table that has 50,000 records and a base with two tables of 25000
records each would both be at the limits of the Team plan." The FAQ exists purely
because the *unit* of the limit (base, not table) is guessable wrongly. Writing a
worked arithmetic example for a counting rule is the move.

Second, the parenthetical inside the limit itself: "1000 records per base (1000
records per table max will also hit base record limit)". Clumsy sentence, correct
instinct — the qualifier travels with the number.

**The AI-credit denominator changes per plan and is not normalised** `[observed]`:
`per editor and above` (Free) → `per billable collaborator` (Team) →
`per paid user` (Business) → `per paid user, at list price` (Enterprise Scale).
Four different units for one entitlement, across four adjacent table rows.
`at list price` is italicised and unexplained — it presumably bounds credits for
discounted seats, but the reader cannot tell. Recorded as a defect.

**Billable-collaborator rules differ by plan and are stated as enumerations**
`[observed]`. Team bills `Commenter` and above; self-serve Business bills
`Editor` and above (Commenters are explicitly non-billable there). Each plan
then lists every billable role × scope combination as its own bullet — nine
bullets for Team, three for Business. Exhaustive enumeration rather than a rule,
which is verbose but unambiguous.

The glossary's own definition disagrees slightly with the plan article:
`Billable collaborator` says "any collaborator with a permission level of
Commenter, Editor, Creator, or Owner is classified as a billable collaborator"
for self-serve paid plans — but the Business table lists Commenters as
non-billable. **Two public pages give different answers to "does a Commenter cost
money on Business?"** The glossary hedges with "Billing is calculated differently
for sales-led Enterprise Scale and Business plans", which does not cover the
self-serve Business case. Recorded as a substantive content defect on a
billing-relevant question.

**What is *not* billed is stated as prominently as what is** `[observed]`,
pricing FAQ: "No charges will apply on a Team or Business plan for read-only
collaborators, form submissions, or share links." Naming the three free cases
pre-empts the fear that every viewer costs money — which is the main friction in
seat-based pricing for a data tool whose whole point is sharing.

**Proration disclosed twice, in the same words** `[observed]`: "Charges are
prorated: users with edit permissions added partway through the month will only
be charged for the days after they were added." The Business/Enterprise variant
changes `days` to `months`, which is a meaningful difference stated by a one-word
substitution in an otherwise identical sentence — easy to miss.

**An eligibility restriction stated as an inline callout, repeated five times**
`[observed]`: "Business and Enterprise scale plans require private email domains,
meaning domains like Gmail, Yahoo, etc, are ineligible when upgrading to either
plan." The gloss ("meaning domains like Gmail, Yahoo, etc") is attached to the
jargon every single time rather than once. Repetition-with-gloss for a rule that
generates a confusing error (see T7) is defensible, though `Enterprise scale`
loses its capital S in this callout while being `Enterprise Scale` everywhere
else.

**Discount and concession plans each get their own named plan** `[observed]`:
`Non-profit plans` (50% off Team) · `Student plans` (free Team, single
workspace, 6–24 months "depending on your application approval and expected
graduation date") · `Education plans` (50% off Team) · `Team trial plans`.
Modelling a discount as a *plan* rather than a *coupon* means each can carry its
own feature-exclusion list — and the Student plan's exclusion list is published
in full, including the unglamorous ones ("Unlimited records per base (limited to
50000)").

The `.edu` trial is 120 days and, notably, "starts before being approved for a
discounted or complimentary plan" — the concession is granted optimistically and
verified later, and the copy says so.

**Data export answered plainly, including what is not possible** `[observed]`:
`Can I export my data from Airtable?` → "Yes." then a four-step procedure, then:
"Note that each table must be exported as its own CSV — exporting an entire base
as a single file isn't supported." The affirmative answer and the material
limitation sit in the same answer, limitation last.

**Legacy plans documented rather than deleted** `[observed]`: the glossary retains
entries for `Enterprise`, `Plus (Legacy)`, and `Pro (Legacy)`, each pointing at a
`changes-to-airtable-plans` article, and the pricing FAQ includes
`I am currently on Airtable's legacy Enterprise plan — where can I see a list of
my current features?` — answered with a grandfathering commitment ("no changes
will go into effect until your renewal") and a route to the feature list. Keeping
retired plan names in the public glossary so existing customers can still find
themselves is good practice and the mirror image of Trello's `Business Class`
slug rot.

**Legal footer strip** `[observed]`: `Security` · `API` · `Privacy` · `Terms` ·
`Do Not Sell/Share My Info` · `Cookie Preferences` · `Accessibility`. CCPA-style
opt-out present as a first-class footer link.

## T11 Help-centre architecture

**Platform**: Pylon-hosted (`assets.usepylon.com`), custom-themed. Structure:
`All Collections` → collection → sub-collection → (sub-sub-collection) →
article. Article counts shown at every level.

**The defining feature is a structured metadata header on every article**
`[observed]`. Every article opens with a two-column table before any prose:

| Field | Example values seen |
|---|---|
| `Plan availability` | `All plan types` |
| `Permissions` | `Owners - Can access workspace settings…` / `Creators - …` / `All users - …` |
| `Platform(s)` | `Web/Browser, Mac app, and Windows app only` |
| `Try it in Airtable` | `Start building in Airtable now` (a deep link) |
| `Related reading` | list of linked articles |

This is the single best help-centre pattern in the harvest. Before reading a word
of instruction, the user learns **whether the feature exists on their plan, at
their permission level, on their device** — the three reasons an instruction
fails to apply. It front-loads the disqualifiers instead of burying them in a
mid-article note, which is where most products put "Note: available on
Enterprise only."

`Try it in Airtable` is the unusual fourth row: a deep link into the product
(`airtable.com/help_link/t-basics`) placed in the *header* of a help article.
Documentation that opens with a door back into the thing being documented.

The `Permissions` row is itself written in the T6 capability-pair style, and on
the home-screen article the `All users` row includes a capability that no other
role has ("customize their home screen experience by pinning and starring
items"), so the rows are not a strict hierarchy — a subtlety the format handles
without comment.

**Article freshness is stamped** `[observed]`: `Last updated 1 month ago` —
relative rather than absolute. Relative staleness is friendlier but loses the
ability to correlate with a product release; four of the articles harvested all
read "1 month ago", which suggests a bulk re-publish rather than per-article
editing.

**Collection-name grammar — three shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `Airtable <Object>` | `Airtable Fields`, `Airtable Views`, `Airtable Records`, `Airtable Bases`, `Airtable Sync` |
| `<Gerund> in/with Airtable` | `Collaborating in Airtable`, `Integrating with Airtable`, `Getting started with Airtable` |
| Bare noun | `Learning and Resources`, `View Basics`, `View Guides`, `Record actions`, `Fields Overview` |

The first shape dominates and is object-named; the second is activity-named. The
mixture means `Collaborating in Airtable` (activity) sits beside
`Airtable Workspaces` (object) at the same level, describing overlapping
territory. Casing is inconsistent within the bare-noun group:
`Record actions` (sentence case) vs `Fields Overview` (title case) vs
`View Basics` (title case) vs `View Types` (title case) vs `List view`
(sentence) vs `Kanban View` (title) — **within a single seven-item list of view
types, `List view` is the only one not title-cased.**

**Article-title grammar — four shapes** `[observed]`:

| Shape | Examples |
|---|---|
| Gerund + object (dominant) | `Filtering records using conditions`, `Grouping records in Airtable`, `Updating multiple fields with bulk field actions`, `Using rich text in Airtable`, `Adding, duplicating, and deleting Airtable records` |
| `<Thing> overview` | `Field type overview`, `Airtable field manager overview`, `Airtable plans overview`, `Airtable workspace settings overview` |
| `Troubleshooting <system>` | see T7 |
| `<Thing> in Airtable` | `Record coloring in Airtable`, `The primary field in Airtable`, `Accessibility in Airtable` |

`Adding, duplicating, and deleting Airtable records` is worth noting: three
lifecycle operations including the destructive one, in one title, serial-comma'd.
Bundling create/copy/delete into a single article means the user reading about
adding also sees deletion — the opposite of Trello's alphabetised split.

The gerund convention is applied consistently, which is a defensible choice
(gerunds scan well in a list and avoid the imperative's false urgency) but is
the opposite of Trello's imperative convention. Both are internally consistent;
Airtable's is less scannable and more accurate to "here is a document about X".

**Routing furniture** `[observed]`: header offers `Contact support` and
`Sign up for free` side by side — the help centre doubles as an acquisition
surface, which is why an unauthenticated visitor sees a signup CTA above the
search box. Foot of article: `Related Articles` (5 links) and sometimes `Tags`
(e.g. `getting started`, `logging out`, `sign out` — with two near-synonym tags
for one concept). Search is offered via `How can we help?` on the index, plus a
`Popular Articles` shortcut block of five.

`Popular Articles` on the index is revealing about real demand:
`Two-way syncing in Airtable` · `CSV import extension` ·
`Airtable Sync integration: Jira Cloud` ·
`Applying for non-profit, education, and student Airtable plans` ·
`Contacting Airtable`. Four of five are about getting data in or out, or about
money — not about building. Worth recording as a signal that the documented
onboarding narrative (build with AI) and the actual traffic (sync, import,
billing) diverge.

**URL scheme is inconsistent — three live patterns** `[observed]`:
`/articles/<id>-<slug>`, `/docs/<slug>`, and `/v1/docs/<slug>`. The glossary
alone links to all three. One glossary link resolves to
`portal.airtable.document360.io` — a **previous documentation vendor's domain
leaking into a live public page**. And the plans article links to a slug named
`new-airtable-plans-overvier-content-delete-once-done` — an internal editorial
placeholder, complete with typo, shipped in a live link. Both recorded as
defects; the second is the most striking content-ops finding in the harvest.

## T12 FAQs

**Two distinct FAQ surfaces, with different jobs.**

### A. Pricing-page FAQ — 7 questions `[observed]`

Placement: accordion under `Frequently asked questions`, below a
`Have additional questions?` router (`Billing FAQ` · `Nonprofits` / `Education` ·
`Contact Sales`). Answers present in server HTML.

| # | Question (verbatim) | Answer summary |
|---|---|---|
| 1 | How does Airtable's pricing work? | Per-seat; Free is all-free; Team/Business bill anyone with edit permission on at least one base; names the three non-billed cases; states proration in days. |
| 2 | How does Airtable's Business and Enterprise Scale pricing work? | Distinguishes self-serve from sales-led purchase routes; Enterprise Scale gets unlimited org units/workspaces/bases; proration here stated in months. |
| 3 | Is Airtable free to use? | Yes; positions Free for "individual users, very small teams, or those with lightweight needs"; paid plans framed as "power and scale". |
| 4 | How much does Airtable cost? | Gives the two self-serve annual prices ($20 and $45 per user/month); Enterprise Scale is "custom, based on the organization's needs and scale". |
| 5 | What are my payment options? | Credit card for self-serve; sales-purchased plans can invoice annually via PO, ACH, wire, or cheque. |
| 6 | What happens when I hit my usage limits? | See T7 — data-safety promise first, then read-write-asymmetric degradation. |
| 7 | I am currently on Airtable's legacy Enterprise plan — where can I see a list of my current features? | No change until renewal; account team will discuss; links to a legacy feature list. |

**Structural notes.** Six of seven are money questions and one is a
grandfathering question — this FAQ is purely a pricing-objection handler, with no
product, security, or data questions at all (contrast Trello, which puts
`How secure is Trello?` in its pricing FAQ). Airtable routes security to a
separate footer page instead.

Q1 and Q2 are **near-duplicates separated by audience**, and Q3 and Q4 are
near-duplicates separated by phrasing ("is it free" vs "how much"). Four
questions covering what could be two, which is defensible as SEO-driven phrasing
coverage but reads as redundant to a human scanning the list.

Q7 is written in the **first person, as a self-identifying statement rather than
a question** — "I am currently on Airtable's legacy Enterprise plan — where can I
see…". It is the only such construction here, and it works because the user's
first job is to recognise themselves. Compare Wise's first-person confession
titles; this is the same instinct applied to a segment rather than a mistake.

Note Q4 contains a grammatical run-on: "…$45/user/month when billed annually our
Enterprise Scale plan pricing is custom…" — a missing conjunction or full stop in
live pricing copy.

### B. In-article FAQs — the dominant pattern `[observed]`

Nearly every help article harvested ends with an `FAQs` section of collapsible
questions. Counts observed: `Airtable plans overview` has **11**;
`Airtable home screen` has **7**; `Introduction to Airtable basics` has **3**.

The register is markedly different from the pricing FAQ — these are operational,
first-person, and often about the limits of a feature:

- `How do I confirm the remaining days of my Team trial plan?`
- `Can I extend my Team trial plan?`
- `How many bases can a single workspace store?`
- `How many tables, views, and fields can a single base store?`
- `Can I transfer ownership of a workspace on the Free plan to another collaborator?`
- `Can I export my data from Airtable?`
- `How do I change my home screen from a "List" view to a "Grid" view…?`
- `What is "Starring" on the home screen, and what does it do?`
- `What is "Pinning" on the home screen, and what does it do?`
- `Is there a way to always open the base layer or interface layer when I click on an app from the home screen?`
- `Can I change Airtable's interface to Spanish, French, German, or another supported language?`
- `Does Airtable support right-to-left (RTL) languages like Hebrew or Arabic?`

Three patterns here are genuinely good. **`What is X, and what does it do?`** is a
compound question that separates identity from function — the right question for a
coined term, and Airtable uses it twice, for the two confusable curation verbs.
**`Is there a way to always…?`** is phrased as a capability probe and answered
`No.` followed by a full explanation of the actual (session-dependent) behaviour
— a refusal that still teaches the rule. And the RTL question is answered with a
*list of named limitations* rather than a "not supported" (see T14).

The in-article FAQ is doing the work a changelog or a limitations section would
do elsewhere: it is where Airtable admits what does not work.

## T13 Terminology & glossary

**Airtable publishes a public `Glossary of Airtable terminology` — ~85 defined
terms — as a first-class help article inside `Getting started`.** This is the
single most significant finding in this file. It is not a developer glossary and
not an appendix; it is positioned as onboarding content, eighth in a 14-article
getting-started collection, and cross-linked from every related article and from
the basics article's own FAQ (`How can I learn more about Airtable terminology?`).

**Core object model**

| Term | Airtable's usage | The alternative it rejected |
|---|---|---|
| `Workspace` | Collection of bases; "the primary billing unit for Team plans" | "Team", "Organization" |
| `Base` | "a collection of data… designed to contain all of the information related to a project or workflow" | "Database", "Project" |
| `Table` | "holds information about one type of item"; appears as a tab | "Sheet", "Collection" |
| `Record` | "an individual item in a table" | "Row", "Entry", "Item" |
| `Field` | "a vertical column in a table" | "Column", "Property", "Attribute" |
| `View` | "a particular way to look at and organize the underlying data in a table" | "Layout", "Report", "Filter" |
| `App` | "The sum of parts including the base, automations, any interfaces, extensions" | — this is a **2024-era re-frame layered on top** |
| `Data set` | "A table, base, or group of records containing specific data" | "Dataset" (one word) |

The `record` / `field` choice over `row` / `column` is the foundational one, and
Airtable is careful to gloss each with its spreadsheet equivalent inside the
definition ("a vertical column", "each record a row, and each field a column").
**It uses the database word as the label and the spreadsheet word as the gloss** —
teaching relational vocabulary to a spreadsheet audience without making them
learn it before they can act. That is the mechanism behind this product's
benchmark strength.

`App` is the interesting recent addition: a superordinate term invented to wrap
base + automations + interfaces + extensions, so that the thing you buy and the
thing you build have one name. Note the definition has to immediately explain the
relationship to the older word: "The base is the underlying relational database
structure of an app you build." A glossary entry doing migration work.

**Roles and access** (see T6 for the definitions): `Owner` · `Creator` ·
`Editor` · `Commenter` · `Read-only` · `Workspace collaborator` ·
`Base collaborator` · `Interface-only collaborator` · `Billable collaborator` ·
`Group manager` · `Org admin` · `User group` · `Permissions` · `Invite` ·
`Invite link` · `Share` · `Domain capture` · `Identity provider (IdP)` ·
`Single sign-on (SSO)` · `Subdomain`.

`collaborator` is the consistent word for a person — never "user" in
person-facing definitions, though `All users` appears in the docs' permission
headers and `paid user` appears in the AI-credit rows. **Three words for a person
(`collaborator`, `user`, `member`) with `collaborator` clearly dominant** — much
tighter than Trello's six, but not clean.

`Domain capture` is a coined term for an automatic-enrolment mechanism, and its
definition includes the consequence in parentheses: "Admins will always manage
organization members when domain capture is enabled (i.e. there can't be
unmanaged users)." Naming the side effect of turning a setting on, inside the
definition of the setting.

**View types — eight named, with a consistent definition frame** `[observed]`:

`Grid` (default) · `Form` · `Calendar` · `Gallery` · `Kanban` · `Timeline` ·
`Gantt` · `List`.

Every one is defined as "The X base view and interface element allow users to
<purpose>", i.e. the same sentence with one variable. Examples:
`Kanban` → "visualize workflows as rows of stacked cards";
`Gallery` → "represent their records as large cards… highlights
attachments—images, documents, and more";
`List` → "showing levels of hierarchy that illustrate how records relate to each
other (ex. products, tasks, subtasks)";
`Timeline` → "visualize and track records on a customizable horizontal scrolling
timeline".

The glossary also flags the **dual nature** of most view types with an inline
split link — `Calendar (view/element)`, `Form (view/interface layout)`,
`Grid (view/element)` — so the user learns in the glossary that the same concept
exists in two surfaces. `Form` is the exception: it is a `view` in a base but a
`layout` in Interface Designer, and the glossary renders that as
`Form (view/interface layout)`. **A terminology inconsistency exposed rather than
hidden.**

View *permission* types are a separate axis: `Collaborative view` (default) ·
`Personal view` · `Locked view`.

**Interface Designer vocabulary — a second object model** `[observed]`:
`Interface` · `Interface Designer` · `Element` · `Layout` · `Interface page` ·
`Filter element` · `Record details`. `Elements` is glossed with a three-way
classification the user would not otherwise see: "visual elements like grids and
timelines, design elements like text and dividers, and functional elements like
buttons and comments". Naming the *kinds* of building block, with instances,
inside the definition of the block.

**AI vocabulary — the newest and least settled layer** `[observed]`:
`Omni` ("Airtable's integrated AI assistant") · `Field agents`
("AI-powered fields… that can automatically retrieve, analyze, or generate data
at the cell level") · `Field agent catalog` · `Deep analysis` ("An Omni feature
that quickly summarizes large amounts of data to find patterns, themes, or key
takeaways") · `AI credits`.

`Field agent` is the cleverest coinage in the set: it fuses the existing product
noun (`field`) with the new category noun (`agent`), and the definition explains
the novelty by contrast with the familiar — "Unlike standard fields, field agents
are dynamic." **Coin new terms by compounding an existing product noun with the
new concept, then define by difference from the old thing.** `Deep analysis` even
ships an example query in the definition: "What are the top 10 themes across
10,000 rows of customer feedback?" — a glossary entry containing a usable prompt.

**Formula and data vocabulary**: `Formula` · `Expression` ("a combination of
values, fields, and/or formulas that evaluates to a single value") ·
`Condition` · `Condition group` · `Linked record` · `Primary field` ·
`Dependencies` · `Rollup`, `lookup`, `count` (as a field family) ·
`Two-way sync` · `Sync (feature)` vs `Sync (action)`.

`Sync (feature)` / `Sync (action)` is a deliberate disambiguation of one word's
two parts of speech, given two glossary entries. Rare and correct.

**Ecosystem and content nouns**: `Extension` · `Marketplace` · `Universe`
("a platform where users can publish bases that they've created for other people
to browse and copy") · `Template` · `App by Airtable` · `Integration` ·
`Personal access token (PAT)` · `Page designer` · `Snapshot` · `Trash` ·
`Admin Panel` · `Base guide` · `Home screen` · `Comment` · `Revision history` ·
`Verified data` / `Verified data library` · `Limit`.

`Universe` is the odd one out — an abstract, unmotivated name for a user-content
gallery, sitting beside the very concrete `Marketplace` for a very similar
concept (a place to get things other people made). The glossary does not explain
the difference between them, and the two definitions overlap.

**Terms that carry their own availability gate inside the definition**
`[observed]`: `Domain capture` is prefixed **Enterprise Scale plans only**;
`Group manager`, `Verified data`, and `Verified data library` are prefixed
**Enterprise Scale and Business plans only**; `Two-way sync` is suffixed
**(In limited beta)**. A glossary that tells you whether a word applies to you.

**Register note**: the glossary is written in the third person and the present
tense throughout, with no second-person address ("A record is…", not "Your
records are…"). The surrounding help articles are second person. The register
switch marks the glossary as reference rather than instruction, which is correct.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user in help and marketing
("your bases", "you'll still be able to use"). First-person plural for the
company, including in restriction copy: "we will never remove your data",
"We'll notify you of the overage", "we recommend that you consider using a
template", "Airtable doesn't translate user-created names or data for you." The
glossary drops to third person (see T13).

**Register.** Flat, technical, and noticeably less playful than Trello. Almost no
exclamation marks in help copy. Contractions used ("you'll", "isn't", "doesn't").
The marketing layer permits a little more: `More money, fewer problems`,
`Build anything`, `Turn builder speed into business momentum.` The one
colloquialism in the help corpus is "a bump in the road", at the top of the
troubleshooting router.

**Numbers as trust devices** `[observed]`: `500,000+ companies`, `100M records`,
`1M+ customer insights`, `>90%`, `70%`, `60%`, `50+`, `5→1`, `200 preconfigured
base templates`, `thousands of agents`. The `5→1` glyph and the `>90%` operator
are the distinctive ones — mathematical notation used as marketing copy.

**Role-naming as a voice choice.** Airtable addresses `builders`, `creators`,
`collaborators`, and `end users` — role nouns drawn from its own permission model
rather than from job titles. "builders can add visual elements", "the tool that
lets creators build visual interfaces powered by base data for end users". The
product's permission vocabulary doubles as its audience vocabulary, which is
tidy and means the marketing and the product agree on who you are.

**Localisation copy is the standout of this section** `[observed]`. The
`Introduction to Airtable basics` FAQ answers
`Can I change Airtable's interface to Spanish, French, German, or another
supported language?` with a three-part structure that is worth copying wholesale:

1. **What changes** — "Menu labels, buttons, and other system-generated text
   follow the language you chose (or Auto). Product labels, including field types
   and most interface chrome, are shown in that language where translations
   exist."
2. **What doesn't change automatically** — an explicit list: "Base, table, field,
   and view names / Record data / Custom descriptions and labels"
3. **Need base content in another language?** — the workaround, stated as user
   work: "Rename bases, tables, fields, and similar items yourself—Airtable
   doesn't translate user-created names or data for you." Plus a second
   workaround via an AI text field agent.

The headings are **`What changes` / `What doesn't change automatically`**. Drawing
the system-content vs user-content boundary explicitly, as two bulleted lists
under question-form headings, is the clearest treatment of the
localisation-scope problem in this corpus. Note the precision of "where
translations exist" and of "automatically" — both are hedges that prevent a
support ticket.

Four supported UI languages are named: English (United States), French, German,
Spanish, plus an `Auto` option that "follow[s] your browser or system language
when a supported language is available."

**RTL support: a model negative answer** `[observed]`.
`Does Airtable support right-to-left (RTL) languages like Hebrew or Arabic?` is
answered with:

- a plain statement of non-support ("Hebrew and Arabic aren't supported interface
  languages at this time")
- a heading `Known limitations with RTL languages` with three named, specific
  failures: text alignment (RTL text renders LTR "across views, interfaces, and
  automated emails"), interface directionality, and field/view display
- a heading `Potential workarounds` with two, each explicitly disclaimed —
  "though this isn't officially supported by Airtable" and a suggestion to route
  RTL email through Gmail/Outlook automation actions "rather than the native
  "Send email" action"

Three things make this good. The limitations are **enumerated rather than
summarised**, so a user can tell whether their case is affected. The scope of the
alignment bug is given precisely (three surfaces, including automated emails —
the one the user would discover last). And the workarounds are offered *with the
support disclaimer attached*, which is more useful than withholding them.
`at this time` is the only hedge, and it is doing honest work.

**Accessibility content** `[observed]`

Dedicated statement at `/company/accessibility`, linked from the footer on every
page, with a table of contents (`ACR / VPAT`, `Feedback`):

- Commitment sentence: "Airtable is committed to ensuring digital accessibility
  for people with disabilities. We are actively developing improvements to the
  user experience for everyone, and applying the relevant accessibility
  standards."
- Standard named: "Airtable aims to adhere to Web Content Accessibility
  Guidelines (WCAG) 2.2 level AA." — **2.2, not 2.1**, and the acronym is
  expanded before being abbreviated
- **The auditor is named and linked** (a third-party accessibility consultancy),
  with cadence: "maintain regular audits of Airtable and complete regular VPATs"
- Two feedback routes, ranked: a linked `accessibility feedback form` described
  as "the best way to get them fixed", then a dedicated mailbox. The form is
  preferred and the reason given is *effectiveness for the user*, not convenience
  for Airtable
- `Request a VPAT from accessibility@airtable.com` — the compliance artefact
  available on request
- Scope of welcomed feedback is enumerated: "bugs, feature requests, or comments"

Naming the external auditor is the notable move — most accessibility statements
say "a third party" without a link. Stating `2.2 AA` rather than the more common
`2.1 AA` is a real commitment differential.

A dedicated `Accessibility in Airtable` article also exists in the
getting-started collection (not fetched), so accessibility appears both as a
corporate commitment and as a user-facing how-to.

**Accessibility defect on the accessibility page itself** `[observed]`: the page
body reads `Last Updated: June 22, 2026` while the page's own meta description
(and social-card text) reads "Last Updated: Jan 22, 2025". The rendered date and
the indexed date are **seventeen months apart**. Recorded as a defect: the meta
description is a stale cached copy of the body, so search results and link
previews advertise an out-of-date accessibility commitment.

**Alt text** `[observed]`: **almost entirely absent.** Nav dropdown feature
cards, customer-logo images, avatars, and the help-centre hero all render with
empty or missing alt in the extracted markup — including the company-logo grid
(Schaeffler, Cisco, Intuit, eBay, Google, Levi's) which carries logo filenames
but no alt text, and the customer-story logos. Contrast Trello, whose logo wall
names every brand. Help-article screenshots also appear to carry no alt at all,
which matters more because they are instructional. **This is the weakest
accessibility finding in the file and sits directly against the page that claims
WCAG 2.2 AA.** Flagged as suspected rather than confirmed, since the extraction
may not surface all attributes.

No `Skip to content` link was observed in the DOM of either `airtable.com` or
`support.airtable.com` — again flagged as suspected rather than confirmed.

**Negative findings, recorded honestly**

- `unifed` — live typo in the Solutions nav description for Marketing
- `Enterprise` in the header links to `/solutions/enterprise`; `Enterprise` in
  the footer links to `/services` — two destinations, one label
- Four labels for signup: `Start building for free` / `Sign up for free` /
  `Sign up` / `Try Airtable for free`
- Three casings for one CTA: `Book a demo` / `Book demo` / `Book Demo`
- `Sign in` and `Log in` both present in the same header region
- `Governance and Security` (nav) vs `Governance & Security` (footer)
- `Contact Sales` vs `Contact sales`
- `Enterprise Scale` vs `Enterprise scale` in the repeated eligibility callout
- Pricing page renders **no prices** without JavaScript; the plan cards are
  entirely client-side
- `"100GB per of attachment storage per base"` — a broken phrase, repeated
  verbatim across all three plan tables
- `"other Enterprise Scale plan plan pricing"` — duplicated word
- `"...the last interface page you had open.s"` — stray trailing character
- `"...$45/user/month when billed annually our Enterprise Scale plan pricing is
  custom..."` — missing conjunction in live pricing copy
- **Billing contradiction**: the glossary says Commenters are billable on
  self-serve paid plans; the Business plan table lists Commenters as
  non-billable
- **Trial contradiction**: `Can I extend my Team trial plan?` contains both a
  "contact support about the offer" paragraph and a flat "No, you can't extend a
  Team trial yourself"
- Live link to a slug named
  `new-airtable-plans-overvier-content-delete-once-done` — an internal editorial
  placeholder, with a typo, shipped publicly
- Live glossary link resolving to `portal.airtable.document360.io` — a previous
  docs vendor's domain
- Three coexisting help URL schemes: `/articles/`, `/docs/`, `/v1/docs/`
- Four different denominators for AI credits across four adjacent rows
  (`per editor and above` / `per billable collaborator` / `per paid user` /
  `per paid user, at list price`); `at list price` italicised and unexplained
- Five naming conventions inside the nine-item field-family list
- `List view` is the only non-title-cased entry in the seven-item view-type list
- `Notifications - Allows you to review notifications` — circular definition in
  an otherwise careful anatomy list
- `Universe` and `Marketplace` have overlapping definitions with no stated
  distinction
- Accessibility page body date and meta-description date differ by 17 months
- Alt text largely absent across marketing, help chrome, and instructional
  screenshots (suspected)
- `OTP` unglossed on the status page
- Status page exposes a single component (`Airtable Service`), so no partial
  degradation can be communicated
- Promotional banner ("Bring your Airtable data into Claude.") renders above the
  accessibility statement and every legal page

---

## Transferable patterns

1. **Label with the precise word, gloss with the familiar one.** `Field` is
   defined as "a vertical column in a table"; `record` as "an individual item…
   Each record can include data in multiple fields", with `row`/`column` supplied
   as the gloss. Teach the accurate vocabulary while letting the user act on the
   one they already have. Directly applicable to any domain where the correct
   term (authorisation, capture, settlement, chargeback) is unfamiliar and the
   colloquial one (hold, charge, refund, dispute) is wrong but usable.
2. **Publish a public glossary and position it as onboarding, not appendix.**
   Airtable's ~85-term glossary sits eighth in `Getting started`, is linked from
   every related article, and carries plan/beta gates inside individual
   definitions. Condition: only pays off when the terms are genuinely load-bearing
   and stable. A product with drifting vocabulary will ship a glossary that
   documents its own inconsistency.
3. **Define every role as a capability pair joined by `but not`.** "Editors can
   edit and create records and views, **but not** configure tables or fields."
   Five levels × two surfaces, one grammatical frame. The cheapest way to make a
   multi-level permission model legible.
4. **Front-load the three disqualifiers in a structured header.**
   `Plan availability` / `Permissions` / `Platform(s)` before any instruction, on
   every article. The reader learns whether the instruction applies to them before
   investing in reading it. Transfers to any help centre where features vary by
   tier, role, or device — which is most of them.
5. **Reassure before you restrict.** "you'll still be able to use your bases and
   we will never remove your data" precedes "you will not be able to add more
   records". Then specify the degradation as read-write asymmetry rather than
   "limited functionality". Applies to any quota, hold, freeze, or limit state.
6. **Delegate the empty state to the person who built the thing.** The `base
   guide` is a customer-authored description that fires on a user's first open and
   stays retrievable. Better than one generic first-run message for any surface
   whose meaning is local to a team. Condition: needs an author with context and
   an incentive to write.
7. **Answer a non-support question with enumerated limitations plus disclaimed
   workarounds.** The RTL answer names three specific failures (including the
   automated-email case the user would find last) and offers two workarounds each
   marked unsupported. Far more useful than "not currently supported", and it
   converts a dead end into a decision.
8. **Split what changes from what doesn't, under question-form headings.**
   `What changes` / `What doesn't change automatically` for the language setting.
   The clearest way to bound any setting whose effect is partial.
9. **Coin by compounding, define by contrast.** `Field agent` = existing product
   noun + new category noun, then "Unlike standard fields, field agents are
   dynamic." The user's existing mental model becomes the scaffold for the new one.
10. **Severity labels that name the required response.** From the demo data:
    `Medium` — "Monitor closely", not "moderate impact". Encode the action, not the
    magnitude. Directly applicable to risk, fraud, and dispute queues.
11. **Counter-example to carry forward: do not let an error name the rule instead
    of the fix.** "not eligible… ensure you use a valid email domain" required two
    FAQ entries and a definition to repair, and `valid` was used to mean
    `not a consumer provider`. If the help centre has to explain your error
    string, rewrite the string.

## Caveats & gaps

- **The pricing page's plan cards did not render.** `airtable.com/pricing`
  returned the page shell, the `Have additional questions?` router, and the
  seven-question FAQ, but no tier names, prices, or feature rows — these are
  client-side. All plan naming, pricing, and limit data in this file was
  recovered from the help centre's `Airtable plans overview` article instead, so
  the *marketing* framing of the tiers (card headlines, per-tier taglines,
  feature-bullet wording, the `See what's included` pattern if any) is
  unharvested. Note that this also means a non-JS or screen-reader-hostile client
  sees a pricing page with no prices, which is itself a finding.
- **Template gallery not fetched.** `airtable.com/templates` was not retrieved;
  the 13 template names in this file come from the nav dropdown. Since templates
  are one of three documented first-run routes and would carry the richest
  workflow-status and field-name vocabulary, this is a material gap. The
  glossary states there are "over 200 preconfigured base templates".
- **All in-product empty states are absent or inferred.** No empty grid, empty
  Kanban stack, zero-result filter, empty Trash, or empty notification copy was
  observable. T8 rests on the `base guide` concept, the home-screen anatomy, and
  the status page. An authenticated pass is required.
- **No observed in-product validation, toast, or confirmation strings.** T5 is
  documented field names plus status-page forms. The single verbatim error string
  in T7 reached this file only because a help FAQ quoted it.
- **Status vocabulary in T6 is largely negative evidence.** Airtable ships no
  workflow statuses; the status-like strings on the home page are **demo data
  authored to illustrate the product**, not product copy, and are labelled as
  such throughout. Do not cite `On Track` / `At Risk` / `Qualification` as
  Airtable UI strings.
- **~20 of ~400 help articles were opened.** Six of the 18 top-level collections
  were not entered at all (`Airtable AI`, `Airtable Automations`,
  `Airtable Bases`, `Airtable Betas`, `Collaborating in Airtable`,
  `Airtable Enterprise Support`, `Airtable Extensions`, `Integrating with
  Airtable`, `Airtable Interface Designer`, `Airtable Policy`, `Airtable Sync`,
  `Managing Airtable`, `Learning and Resources`, `Airtable Workspaces`).
  `Airtable Policy` (8 articles) in particular would strengthen T10.
- **Status page was incident-free during harvest.** All 15 visible days read
  `No incidents reported.`, so no live incident copy — impact statements, update
  headers, postmortem language — was observable. Only the component-state
  vocabulary was captured, and there is only one component.
- **No published design system or content style guide was located.** Airtable has
  no public equivalent of Atlassian's design site; the voice observations in T14
  are inferred from the copy rather than checked against stated rules. No search
  was run specifically for an Airtable brand or content guideline.
- **Alt-text and skip-link findings are flagged as suspected**, based on
  text-extraction output rather than DOM inspection with an accessibility tool.
- **Locale is en-US only.** French, German, and Spanish product UI exists per the
  docs but was not sampled; nothing here is precedent for localised Airtable copy.
- **Mobile app strings not harvested.** The home-screen article notes the surface
  is "Web/Browser, Mac app, and Windows app only", so mobile has a different IA
  that is entirely unrepresented.
- The help centre is **Pylon-hosted**, and some chrome (`All Collections`,
  `Contact support`, tag behaviour, the article-count display) may be platform
  default rather than Airtable-authored. The structured article header
  (`Plan availability` / `Permissions` / `Platform(s)`) appears to be
  Airtable-authored content within a platform template, but the boundary is not
  determinable from the public surface.

## Sources

1. https://www.airtable.com/
2. https://www.airtable.com/pricing — partially blocked (plan cards client-rendered; FAQ captured)
3. https://support.airtable.com/
4. https://status.airtable.com/
5. https://support.airtable.com/collections/7410844392-getting-started-with-airtable
6. https://support.airtable.com/collections/6863767017-airtable-fields
7. https://support.airtable.com/collections/8998700582-fields-overview
8. https://support.airtable.com/collections/9049293842-airtable-views
9. https://support.airtable.com/collections/5056379050-view-types
10. https://support.airtable.com/collections/3569848325-airtable-records
11. https://support.airtable.com/collections/4392501043-record-actions
12. https://support.airtable.com/articles/6687333754-glossary-of-airtable-terminology
13. https://support.airtable.com/articles/1747995963-introduction-to-airtable-basics
14. https://support.airtable.com/articles/6915359572-airtable-home-screen
15. https://support.airtable.com/articles/2277136852-airtable-plans-overview (reached via https://support.airtable.com/docs/what-to-do-if-you-see-an-over-limits-warning, which redirects)
16. https://support.airtable.com/articles/2373557978-troubleshooting-airtable-products-and-features
17. https://www.airtable.com/company/accessibility
