# 011. Todoist

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Personal task manager / to-do list app with light team workspace |
| Primary URL | https://todoist.com/ |
| Corpus rank | 011 |
| Benchmark strength (source list) | Natural task language and feedback |
| Locale / market observed | en (site offers 19 locales via a footer + help-centre locale switcher: `cs da de en es fi fr it ja ko nb nl pl pt-BR ru sv tr zh-CN zh-TW`) |
| Platform observed | Web (marketing), help centre (Zendesk-backed, custom Astro front end), status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2 Type II certified (claimed on home and pricing); GDPR referenced via Doist Trust Center; AWS-hosted, TLS 1.2/1.3, encryption at rest; public bug-bounty programme. No financial regulator applies. |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Full for public surfaces — marketing, pricing, help IA, two help category pages, two long-form help articles, security page, status page all retrieved. In-product strings are `[documented]` only. Pricing-page FAQ answers not retrieved (accordion, client-rendered). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home (marketing) | https://todoist.com/ | Hero, four benefit blocks, templates carousel, trust stats |
| Pricing | https://todoist.com/pricing | Three plan names, feature bullets, full comparison matrix with row-group headers |
| Help centre home | https://www.todoist.com/help | Eight top-level categories + sub-sections; "Learn and explore" resource block |
| Help: Get Started category | https://www.todoist.com/help/categories/get-started | `Account Basics` article list — 11 titles |
| Help: Features → Tasks & Planning | https://www.todoist.com/help/categories/features/tasks-and-planning | 27 article titles; richest single source of task-phrasing grammar |
| Help: Features → Productivity & Karma | https://www.todoist.com/help/categories/features/productivity-and-karma | 8 titles incl. Karma, vacation mode, offline |
| Help: Troubleshooting category | https://www.todoist.com/help/todoist/troubleshooting | Four sub-sections, 18 titles; the error/recovery corpus |
| Help: Teams category | https://www.todoist.com/help/todoist/teams | 12 titles incl. a removed-feature article |
| Help article: Get started with Todoist | https://www.todoist.com/help/articles/get-started-with-todoist-OgNNJR | 11-step onboarding narrative; quotes in-product labels |
| Help article: Use Task Quick Add | https://www.todoist.com/help/articles/use-task-quick-add-in-todoist-va4Lhpzz | The natural-language syntax table — the core benchmark artefact |
| Security policy | https://www.todoist.com/security | Data-protection headings, admin roles, vulnerability reporting |
| Status page | https://status.todoist.net/ | Instatus-hosted; component names and state vocabulary |

---

## T1 Navigation & IA labels

**Global marketing nav — two dropdowns, one flat link** `[observed]`

`Made For` · `Resources` · `Pricing` · `Log in` · `Start for free`

`Made For` is the notable label. Instead of `Features` or `Product`, Todoist
names the nav group after the user's *intent*, and its children are all
gerund/noun goal-phrases rather than feature names:

`Task Management` · `Project Management` · `Time Management` · `Habit Forming` · `Teamwork`

`Habit Forming` is the odd one out grammatically (gerund rather than noun+noun),
and is the only child that names a behaviour change rather than an object class.

`Resources` children: `Integrations` · `Templates` · `Getting Started` ·
`Teams Toolkit` · `Help Center` · `Customer Stories` ·
`Productivity Methods + Quiz` · `Inspiration Hub` · `Downloads`.
Note `Productivity Methods + Quiz` — a nav label that advertises the *format* of
the destination with a literal `+`.

**Footer — three columns, non-obvious grouping** `[observed]`

| Column | Items |
|---|---|
| `Features` | `How It Works` · `For Teams` · `Pricing` · `Compare` · `Templates` |
| `Resources` | `Download Apps` · `Teams Toolkit` · `Help Center` · `Customer Stories` · `Productivity Methods` · `Integrations` · `Channel Partners` · `Developer API` · `Status` |
| `Company` | `About Us` · `Careers` · `Inspiration Hub` · `Press` · `Twist` |

Two defects here. (1) The column headed `Features` contains `Pricing` and
`Compare`, neither of which is a feature. (2) The same link is labelled
`Teams Toolkit` in the footer on some pages and `Toolkit` on others (compare the
footer on `/help` vs `/help/categories/get-started`) — one destination, two
labels, varying by template. Similarly `Careers` renders as
`Careers We're hiring!` on some templates and bare `Careers` on others.

**Help-centre top level — eight categories** `[observed]`

`Get Started` · `Features` · `Billing` · `Teams` · `Todoist & AI` ·
`Integrations` · `Troubleshooting` · `Product Updates`

All eight are bare noun phrases. Unlike Wise, Todoist does **not** phrase any
help category as a user question — the IA is system-object-shaped at level 1 and
only becomes task-shaped at article level.

**Second level (sub-sections), verbatim:**

| Category | Sub-sections |
|---|---|
| `Get Started` | `Account Basics` · `Download the Apps` · `Guides` · `Privacy & Security` |
| `Features` | `Projects & Sections` · `Tasks & Planning` · `Views, Filters & Labels` · `Reminders & Notifications` · `Productivity & Karma` · `iOS` · `Android` · `Desktop` |
| `Billing` | `Subscriptions` · `Billing Questions` |
| `Teams` | `Guides` · `Security & Admin` |
| `Todoist & AI` | `AI connections` · `AI features` |
| `Integrations` | `Email` · `Automation Tools` · `Productivity` · `Time Tracking` · `Communication` · `Notes & Planning` · `Developers` · `Browsers` · `Calendars` |
| `Troubleshooting` | `Login & Account Access` · `Apps & Devices` · `Sync & Integrations` · `Notifications & Connection` · `FAQ & Policies` |
| `Product Updates` | `What's New` · `Experimental Features` · `Changelog` |

Note the casing inconsistency: `AI connections` / `AI features` are sentence-case
while every other sub-section in the same list is Title Case.

**Two competing help taxonomies live simultaneously** `[observed]` — a real IA
defect. The sidebar on `/help` renders **two different trees at once**: a
`/help/categories/...` tree (`Billing` → `Subscriptions`, `Billing Questions`;
`Teams` → `Guides`, `Security & Admin`) and a `/help/todoist/...` +
`/help/account-and-billing/...` tree (`Billing` → `Payments & billing details`,
`Invoices, taxes & refunds`; `Teams` → `Members & roles`, `Security & access`).
The words `Get Started` appear three times consecutively in the rendered sidebar,
and `Billing` and `Teams` each appear twice with different children. A migration
is visibly in flight and the two vocabularies have not been reconciled —
`Security & Admin` vs `Security & access`, `Billing Questions` vs
`Invoices, taxes & refunds`.

**Breadcrumb grammar** `[observed]`:
`Help Center > Todoist > Troubleshooting`, and on articles
`Get Started > Guides > <article title>`. A "Learn about **Todoist**" switcher
sits above the sidebar with three products: `Todoist` · `Automations` ·
`Account & billing`.

## T2 Value proposition & headline patterns

**Hero — a two-word sentence fragment with a comma** `[observed]`

> Headline: `Clarity, finally.`
> Subhead: "Join 50+ million professionals who simplify work and life with the world's #1 to-do list app."

This is the opposite of the Wise pattern (Wise names the task; Todoist names the
*emotional outcome*). `Clarity, finally.` has no verb, no product name, no
feature — it sells relief. The comma-plus-adverb construction implies a long
prior struggle. Social proof and the category name are both pushed entirely into
the subhead, which is where the only concrete noun (`to-do list app`) appears.

Note the numeric inconsistency across surfaces: the hero says
`50+ million professionals`, the stats band says `30+ million app downloads`, and
the pricing page and help footer both say `Join 30 million+ people`. Three
different magnitudes and three different nouns (professionals / downloads /
people) for what reads as one claim.

**Benefit blocks — eyebrow / headline / paragraph, with the eyebrow as imperative
and the headline as promise** `[observed]`

| Eyebrow (imperative to the user) | Headline (what the product does) |
|---|---|
| `Clear your mind` | `Capture tasks at the speed of thought` |
| `Focus on what's important` | `Stay organized and focused` |
| `Plan with confidence` | `Simplify your planning` |
| `Organize your teamwork, too` | `A home for your team's tasks` |

The pattern is consistent and reusable: **the eyebrow tells the user what to do,
the headline tells them what they get.** Two levels of copy doing two different
jobs in the same block. The fourth eyebrow ends in `, too` — a conjunctive
afterthought that positions teams as an extension of personal use rather than a
separate product, and the body copy reinforces it with "alongside but separate
from your personal tasks and projects."

`at the speed of thought` is the strongest phrase on the page and the one that
most directly encodes the natural-language-capture benchmark.

**Section headers** `[observed]`:
`Smart features that feel magical` · `In it for the long haul` ·
`A task manager you can trust for life` ·
`Kickstart your next project with Todoist Templates` ·
`Gain calmness and clarity with the world's most beloved productivity app` ·
`Take a peek!` / `Watch Todoist in action.`

`In it for the long haul` → `A task manager you can trust for life` is an
unusual value prop: **longevity as a feature**, with the body copy naming the
exact tenure ("We've been building Todoist for 19 years and 20 days" — a live
day-counter) and then the anti-acquisition pledge "we'll never sell out to the
highest bidder." Productivity tools are graveyards of shutdowns, and Todoist
sells against that anxiety explicitly.

**Pricing headline** `[observed]`: `Choose your path to productivity`, subhead
summarised: free-forever framing first, then the upgrade proposition. Plan
tagline grammar is consistent — a short imperative or gerund clause per tier:

- `Beginner` — `Start organizing your life for free`
- `Pro` — `Organize your work and life`
- `Business` — `Manage your teamwork, too`

Again `, too`. Business is framed as additive to Pro, not as a different product.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start for free` | Global nav (desktop + mobile), hero | Primary acquisition; price is inside the label |
| `Upgrade to Pro` | Hero, secondary position | Monetisation CTA placed **in the hero beside signup** — unusual, and it names the destination tier |
| `Log in` | Global nav, help-centre nav | Consistent across surfaces (contrast Wise's `Sign up`/`Register` split) |
| `See more templates` | Templates carousel | Specific object |
| `Read about our long-term mission` | Longevity section | CTA text ≈ destination promise |
| `Compare plans` | Pricing, above matrix | |
| `Read the plans FAQ` | Pricing, twice (above and below matrix) | Names the artefact and the format |
| `Save 20%` | Pricing, billing-cycle toggle | Benefit-as-label on a control |
| `Billing cycle` | Pricing toggle label | |
| `Create a team for free, then` | Business plan card | **Broken/truncated string** — a dangling `then` with the price apparently rendered client-side and absent from server HTML |
| `Get Help` | Help centre, support block | |
| `Contact us` | Help-centre nav (top right) | Two labels for contacting support on the same page: `Get Help` in the body, `Contact us` in the nav |
| `Get started as an individual` | Help centre, onboarding block | Audience-explicit pairing |
| `Get started as a team` | Help centre, onboarding block | |
| `Read article` | Every help-centre list item | Repeated hundreds of times; see T14 for the accessibility read |
| `Visit our Inspiration Hub` | Help centre, content block | |
| `Submit a vulnerability` | Security page | Verb + object, no "here" |
| `Report an issue` | Status page header | |
| `Get updates` | Status page header | Subscribe CTA, no "Subscribe" verb |
| `Show notice history` | Status page | |
| `Expand group` | Status page, component group | |
| `Read uptime graph for Web application & API` | Status page | **Visually-hidden accessibility label**, object-specific |
| `Let us know` | Help article, on an unsupported-language note | Links to a Typeform |
| `Play` | Help article, on every embedded video | Bare label repeated 8+ times in one article — no indication of *what* plays |

**Observations.** Todoist ships **no bare `Learn more`** anywhere in the harvested
set, which is a genuine strength. But it ships two worse things: `Read article`
as the accessible name for every help-list link (the link text is the title, and
`Read article` is appended, producing "Install Todoist for Windows as an MSIX app
Read article" as the flattened link name), and `Play` repeated without object on
the getting-started article. The `Read article` suffix pattern also produces a
visible double-label in extracted text.

`Upgrade to Pro` sitting in the hero as the secondary CTA — before the user has
an account — is the most aggressive choice on the page.

## T4 Onboarding & getting-started

**Eleven-step guide, each step a verb-first imperative headline** `[observed]`

1. `Start with a project`
2. `Add your first task`
3. `Stay on schedule`
4. `Split big tasks into sub-tasks`
5. `Organize tasks into sections`
6. `Add tasks to your Inbox`
7. `Plan your future`
8. `Prioritize your day`
9. `Set dates for big plans`
10. `Complete your tasks`
11. `Get in touch`

No step numbers are shown to the user and no progress language appears — it is a
table of contents, not a wizard. Every step is an imperative; three of the eleven
(`Stay on schedule`, `Plan your future`, `Prioritize your day`) name an *outcome*
rather than a UI action, which is where the guide shifts from instruction to
coaching.

**Each step closes with a three-bullet advice list, not a recap** `[observed]`.
These are the most distinctive copy in the article because they are about
behaviour, not the product:

- Under `Add your first task`: "The most achievable tasks tend to be: Super
  specific and clear / Actionable / Less than an hour long"
- Under `Split big tasks into sub-tasks`: `Divide tough tasks into short, easy ones` ·
  `Track all of your progress` · `Collapse for calm, expand to complete`
- Under `Prioritize your day`: `Pick only a few must-do tasks each day` ·
  `Do your hardest task first` · `Reschedule any tasks you don't check off`
- Under `Complete your tasks`: `Track your successes` · `Note the challenges` ·
  `Reward yourself for a job well done!`

`Collapse for calm, expand to complete` is the single best line in the corpus for
this product — a parallel-construction mnemonic that teaches a UI affordance by
naming its emotional payoff. `Reward yourself for a job well done!` carries the
only exclamation mark in the sequence.

**Callout box taxonomy** `[observed]` — the help centre uses four named box
types, and the labels are doing register work: `Note` (neutral fact),
`Quick tip` (optional), `Helpful hints:` (inline list), `Pro tips:` (behavioural
advice). `Quick tip` and `Pro tips` overlap in function, which is a taxonomy
smell. One `Quick tip` box also contains a full mini-section
("P.S. There's more to discover" with three product links), so the box type is
being reused as a generic container.

**The onboarding easter egg worth stealing** `[documented]`

> "When you're new to Todoist, the task name field shows example task names like
> "Fix bike tire this weekend" or "Read history chapter 5 in 10 days" to help you
> see how Todoist understands natural language. These examples stop appearing
> once you've completed 15 tasks."

This is a **rotating, self-retiring placeholder**: the empty input teaches the
natural-language grammar by example, and the teaching removes itself after a
measured competence threshold (15 completed tasks). Placeholder text as
progressive-disclosure onboarding, with an explicit exit condition — and Todoist
documents the threshold publicly rather than leaving it magic.

## T5 Form & field labels

**The Quick Add syntax table — the product's real form language** `[documented]`

Quick Add is one text input that parses structured data out of prose. The help
article documents the grammar as an `Add` / `By typing` two-column table:

| Attribute | Trigger | Documented example |
|---|---|---|
| Date or due time | natural language, no sigil | `tomorrow at 4 PM`, `every other Tuesday starting March 3` |
| Deadline | curly brackets | `{march 30}`, `{next Friday}` |
| Labels | `%` | `%email` |
| Priority | `p1` / `p2` / `p3` | |
| Reminders | `!` | `!14:00`, `!30 min before` |
| Assignee | `+` | `+Lucile` |
| Project | `#` | `#Work` |
| Section | `/` | `#Work /Admin` |

**Documented natural-language date examples** (from the getting-started article,
rendered as task sentences with the date italicised in situ):

- `Buy grapes today`
- `Paint the deck this weekend`
- `Edit marketing report Sept 15 at 2pm`
- `Attend professional development class every 3rd Tues for 6 months starting in April`

The example set is deliberately graded — one word, two words, a date-time, then a
compound recurrence with an anchor date. The fourth example exists to show off
the parser's ceiling, and it is the only one that would be tedious to enter
through a date picker. **Teaching a parser by escalating examples** is the
transferable move.

**Field and control labels named in help** `[documented]`:
`Add task` (both the button and the submit label — same words for opening and
committing), `Add sub-task`, `Add section`, `task name field`,
`description field`, `Show description` (toggle), `Quick Add global shortcut`,
`Project` (right-panel field in task view), `Completed tasks` (overflow-menu
item), `Dynamic Add button` (the mobile draggable FAB — a named component, see
T13), `Settings` → `Desktop tab` → `Advanced settings`.

**A documented deprecation inside a field-syntax table** `[documented]`:

> "`@` also works for now, but is planned to be retired by the end of 2026."

Todoist publishes the sunset date for a *syntax character* in the reference table
itself, next to the replacement (`%`). This is unusually candid — most products
either silently keep the alias or silently remove it.

**Localisation gap stated as a `Note`** `[documented]`: date parsing is not
supported in Czech or Turkish, with a `Let us know` feedback link — a known
capability hole disclosed at the point of use, in a product whose UI *is*
translated into both. The parser and the interface have different locale
coverage, and the copy admits it.

## T6 Status & state language

**Status page component and state vocabulary** `[observed]`

Components: `Web application & API` · `Content Sync API` · `Website` ·
`Infrastructure` (a collapsed group).

States observed: `Operational` · `Degraded performance`. Metrics are rendered as
a doubled figure — `100% - uptime` alongside `99.98% uptime` (current window vs
90-day), which reads confusingly as two contradictory numbers on one line.

Incident headline observed, verbatim:

> `Content Delivery Network (webapp, desktop clients) experiencing degraded
> performance`

Grammar: `<component> (<affected clients>) <present participle> <state>`. No
severity word, no apology, no ETA in the headline; the parenthetical scopes the
blast radius to specific clients, which is the useful part. The incident is not
listed under `Recent notices` — that block reads
`No notices reported for the past 7 days` while a degradation banner is live
above it. **A live-incident / notice-history inconsistency worth recording.**

Note also that the footer link is labelled `Status` and points to
`status.todoist.com`, while the help centre's "Learn and explore" block labels the
same thing `System Status` ("Check the current health of Todoist apps and
services.") and points to `status.todoist.net`. Two labels, two hostnames.

**Task-state vocabulary** `[documented]` — Todoist's state model is unusually
small and is expressed as verbs on the task rather than status nouns:

- `complete` / `uncomplete` — the reverse action is a coined verb
  (`Introduction to tasks` covers "uncomplete tasks"; there is also a dedicated
  `Reset a sub-task in Todoist`)
- `recurring` — has its own completion semantics
  (`Complete a task with a recurring date`)
- `uncompletable` — a deliberate state with its own article,
  `Create an uncompletable task in Todoist` (a task that cannot be checked off,
  used as a header/note)
- `overdue` is implied by `Reschedule any tasks you don't check off` but never
  named as a state in any harvested surface
- `Vacation mode` — an *account*-level state that suspends the Karma streak
  (`Turn on or off vacation mode in Todoist`)
- Offline is a documented supported state, not an error:
  `Use Todoist while offline`

**Two named date concepts, deliberately distinguished** `[documented]`. This is
the most careful piece of terminology work on the site:

> Dates schedule when you plan to *start*; deadlines are for a fixed, external
> due point you can't miss. The documented worked example is taxes — deadline for
> when they are due, date for when you plan to begin.

Two overlapping temporal concepts disambiguated by a single concrete example
rather than by definition. Distinct entry syntaxes reinforce it (bare text vs
curly brackets), and `{...}` visually suggests "hard boundary."

Also: `Set a fixed time or floating time for a task` — `floating time` is a named
state (time that does not shift with timezone).

## T7 Error, failure & recovery

**`Troubleshooting` article titles, all `[observed]` as titles** — the grammar is
overwhelmingly `Troubleshoot <thing>`, imperative, system-object-first:

- `Troubleshoot syncing issues in Todoist`
- `Troubleshoot connection issues with Todoist`
- `Troubleshoot browser storage issues in Todoist`
- `Troubleshoot performance issues with the Todoist desktop apps`
- `Troubleshoot notifications not received from Todoist`
- `Troubleshoot Google Calendar integration issues in Todoist`
- `Troubleshoot Outlook Calendar integration issues in Todoist`
- `Troubleshoot the Todoist and Outlook Mail integration`
- `Troubleshoot issues with the Todoist for Gmail Add-on`

Nine of eighteen troubleshooting articles begin with the word `Troubleshoot`.
This is the **inverse of the Wise pattern**: where Wise writes `I sent the wrong
amount`, Todoist writes `Troubleshoot syncing issues in Todoist`. Todoist's
titles are optimised for the system's fault domain, not the user's sentence. A
user who thinks "my phone isn't showing my tasks" has to know the word "syncing."

Note also the preposition drift within one list: `issues in Todoist`,
`issues with Todoist`, `issues with the Todoist desktop apps`,
`notifications not received from Todoist`. Four prepositions for the same
relation.

**Only two user-voice failure titles in the whole harvested set** `[observed]`:

- `Why can't I access an attached file?`
- `Does Todoist support start dates?`

Both sit under `FAQ & Policies`. `Why can't I access an attached file?` is the
one first-person-ish recovery title, and `Does Todoist support start dates?` is a
**capability-absence article** — a help article whose job is to say "no, and here
is what to use instead" (the answer is the date/deadline distinction from T6).
Publishing an article for a feature you *don't* have is good practice.

**Removed-feature and renamed-feature articles** `[observed]`:

- `What happened to the Team Inbox?` — a past-tense question about a withdrawn
  feature, in the user's voice. The only title in the set that assumes the user
  is confused by a change Todoist made.
- `Update outdated task links in Todoist` — remediation for links Todoist itself
  invalidated, filed under `Notifications & Connection`
- `Uninstall Todoist for macOS` — an exit path documented in the help centre

**Structural recovery furniture** `[observed]`: every long-form help article ends
with a section literally headed `Get in touch`, with body copy summarised as: now
that you know the basics, contact us if you have questions. The escalation slot
is a fixed, named, final section on every article — predictable placement rather
than a floating widget. On the Quick Add article the same section is conditional
in its phrasing ("If you're having trouble using Quick Add or using your global
keyboard shortcut…"), so the escalation is scoped to the article's topic.

**`Known Issues` as a first-class help article** `[observed]` — sitting in
`FAQ & Policies` alongside `Status Dashboard`. A public, in-help-centre defect
list is a notable transparency choice; most products keep known issues in a
community forum or nowhere.

## T8 Empty states

`[absent]` for in-product empty states — all are behind auth and none is quoted
in the harvested help articles.

Two adjacent findings are worth recording, though:

- **The empty input is treated as an onboarding surface, not an empty state.**
  The rotating placeholder examples described in T4 mean Todoist's most
  significant "nothing here yet" moment is the *task name field*, and the copy
  strategy there is to demonstrate grammar rather than to reassure or prompt.
- **A no-notices empty state** `[observed]` on the status page:
  `No notices reported for the past 7 days` — bounded by an explicit window, so
  it cannot be misread as "nothing has ever gone wrong." As noted in T6 it was
  displaying while a degradation was live, which is exactly the failure mode a
  bounded empty state is supposed to prevent.
- The help centre exposes no search results page without a query, so the
  Wise-style empty-query defect could not be tested.

## T9 Notifications & system messages

`[documented]`, mostly via IA rather than strings.

- `Reminders & Notifications` is a named help sub-section, so notification
  behaviour is treated as a user-configurable feature area rather than a system
  side-effect.
- `Custom Reminders` / `Custom task reminders` appear as **paid-tier features on
  the pricing matrix** — notification granularity is monetised, which is itself a
  content-design constraint (free-tier copy must not imply configurability).
  Note the label differs between the plan bullet list (`Custom task reminders`)
  and the comparison matrix row (`Custom Reminders`).
- Reminder entry syntax is `!` inline in Quick Add (`!14:00`, `!30 min before`) —
  relative *and* absolute reminder offsets in the same grammar.
- `Troubleshoot notifications not received from Todoist` is the documented
  failure path.
- `Get updates` on the status page is the only observed subscribe affordance.
- `Forward emails to Todoist` — inbound email-to-task, listed under
  `Productivity & Karma` rather than under `Integrations` → `Email`, which is a
  cross-category placement inconsistency (an `Email` sub-section exists).

No toast, banner, or push strings were retrievable. `[absent]` for verbatim
notification copy.

## T10 Disclosures, legal & compliance

`[observed]`, and thin by financial-services standards — appropriate for the
domain.

**Security page structure** — headings only: `Data Protection` → `In Transit` /
`At Rest`; `Data Reliability`; `Report a Vulnerability`; `Account Access`;
`Todoist Business Admin Controls`; `Data Privacy`. Content summarised: TLS
1.2/1.3 in transit; AWS hosting with encryption at rest; an explicit
**date-bounded caveat** that files uploaded before 11 April 2016 are not
encrypted at rest but are protected by firewalls; third-party attachment data
(Dropbox, Google Drive) remains on those providers and under their policies.

That pre-2016 disclosure is the most interesting sentence on the page: rather
than claiming blanket encryption, Todoist states the cutover date and what the
older cohort gets instead. **Bounding a security claim by date** is the same
"claim, then bound the claim" move Wise applies to pricing.

The opening commitment list is a three-item parallel construction with semicolons
and a terminal "and" — summarised: prevents unauthorised access; supports
continuous vulnerability monitoring; embraces proactive improvement. Note the
first bullet claims the system "Prevents **all** unauthorized access" — an
absolute security claim, which is the one over-reach in otherwise careful copy.

**Permission and role language** `[observed]` — deliberately minimal:

- Exactly two roles are named: `admin` and `user`
- `central control panel` is the named admin surface
- `Sharing Settings` is the named control, framed as a binary: restrict sharing
  to employees within the organisation, or allow sharing outside it (clients,
  vendors)
- Pricing matrix adds `Team roles & permissions` as a Business-only row, and
  `Team guests` as a counted entity (`1,000`) distinct from `Team members`
  (`1,000`)

Compare Box (015) in this corpus: Todoist's entire permission vocabulary is two
roles plus a guest concept, versus Box's seven-level ladder. The whole
positioning line on home and pricing is "Todoist meets the compliance standards
your company requires, **without the complexity**" — and the role model is the
proof of that claim.

**Compliance claims** `[observed]`:
`Enterprise-grade security with SOC2 Type II certification.` appears as a
standalone banner on both home and pricing, and `SOC2 Certification` is a
comparison-matrix row under `Advanced`. Note the styling inconsistency —
`SOC2` unspaced here, while the industry form is `SOC 2`. GDPR and personal-data
handling are delegated to an external `trust center` link rather than stated
on-page; `Privacy & Security` is a help sub-section and `Privacy` / `Terms` /
`Cookie preferences` sit in the footer utility row.

**Bug bounty** `[observed]`: a public `bug bounty policy` is referenced as
covering "program rules, eligible targets, rewards, and severity levels" —
disclosure of the *shape* of the policy in the link sentence, so the reader knows
whether to click.

**Cookie banner** `[observed]`: heading `We respect your privacy`, body
summarised as: cookies improve the site and Todoist's marketing, choose a
preference and it will be remembered. The heading is a *claim about the company*
rather than a description of the control — "We respect your privacy" asserts
virtue in the same element that asks for consent. `Cookie preferences` is the
persistent footer re-entry point.

**Pricing disclosures** `[observed]` are footnote-marked (`*`) on
`300 for each member *` and `Up to 500 *` in the comparison matrix, but **the
footnote text itself is not present in the retrieved page** — asterisks with no
resolvable note. A genuine defect. Likewise the Business plan's price is absent,
leaving `Create a team for free, then` truncated.

## T11 Help-centre architecture

Three levels: **category → sub-section → article**, with category and
sub-section both rendered as sidebar nav *and* as in-page `Category` / `Section`
pickers, so the same taxonomy appears three times per page.

**Article-title grammar — six consistent shapes** `[observed]`:

| Shape | Share | Examples |
|---|---|---|
| `Introduction to <noun>` | high | `Introduction to tasks`, `Introduction to sub-tasks`, `Introduction to recurring dates`, `Introduction to deadlines in Todoist`, `Introduction to Karma`, `Introduction to search`, `Introduction to Insights`, `Introduction to teams` |
| `<Verb> <object> [in Todoist]` | highest | `Set a priority in Todoist`, `Add emoji in Todoist`, `Print your Todoist tasks`, `Create a Todoist account`, `Change your password`, `Format text in a Todoist task` |
| `Troubleshoot <problem>` | 9 titles | see T7 |
| `Turn <feature> on or off` | 3 titles | `Turn smart date recognition on or off`, `Turn on or off vacation mode in Todoist` |
| `Use <feature>` | several | `Use Task Quick Add in Todoist`, `Use the Productivity view in Todoist`, `Use keyboard shortcuts in Todoist`, `Use Todoist while offline`, `Use folders to organize team projects` |
| Question | rare (3) | `Does Todoist support start dates?`, `Why can't I access an attached file?`, `What happened to the Team Inbox?` |

`Introduction to X` as a named title genre is Todoist's signature. It creates a
**reliable conceptual entry point per object** — a user who does not yet know
what a sub-task is has a guaranteed-findable article, distinct from the
task-oriented `Add a sub-task` article. Splitting "what is it" from "how do I do
it" at the title level is directly reusable.

The `in Todoist` suffix is applied **inconsistently**: `Set a priority in
Todoist` vs `Change your password`; `Introduction to deadlines in Todoist` vs
`Introduction to recurring dates`; `Turn on or off vacation mode in Todoist` vs
`Turn smart date recognition on or off`. Roughly half the titles carry the
product name and half don't, with no discernible rule. Also note the word-order
flip within one pattern: `Turn smart date recognition on or off` vs
`Turn on or off vacation mode`.

**Article page furniture** `[observed]` — every article carries a fixed scaffold:

- `Available for` — a plan-eligibility badge list (`Beginner` / `Pro` /
  `Business`). **Entitlement is disclosed at the top of every article**, before
  the instructions, so a free user learns immediately whether the article
  applies. Order is inconsistent between articles (`Beginner, Pro, Business` on
  one; `Business, Pro, Beginner` on another).
- `Platforms` — e.g. `All platforms`
- `Table of Contents` — rendered twice (top and bottom of the article)
- `Select Platform:` — a per-section platform switcher whose options are
  spelled out in full: `Web, macOS, Windows 10/11` · `iOS, iPadOS` · `Android`.
  Crucially the *instructions differ per tab* and the unselected variants are all
  present in the DOM, so a scraper (and possibly a screen reader) sees three
  contradictory step lists in sequence.
- `Related articles` — 4 links
- `Last updated by` — **a named human with an avatar photo and a date**
  (`Evert`, `August 17, 2026`; `Rachel`, `September 1, 2026`). Attribution to a
  first-name support agent rather than "the Todoist team" is a deliberate
  trust/voice choice and is rare in help centres.

**Routing furniture** `[observed]`: help home leads with search
(`How can we help?` as an H1, rendered twice in the DOM), then the eight
categories, then a `Get up and running in minutes` onboarding block splitting on
audience (`Get started as an individual` / `Get started as a team`), then
`Learn and explore` (six external/adjacent resources, each with a one-line scope
sentence in the Wise style — `Trust Center` "See how we keep your data safe and
compliant.", `System Status` "Check the current health of Todoist apps and
services.", `Developer Hub` "Build on Todoist with our API, documentation, and
developer tools."), then `Get instant help, anytime` → `Get Help`.

**Support-quality social proof inside the help centre** `[observed]` — eight
named customer testimonials *about the support team* sit on the help home page,
plus an award badge (`Engage Award Finalist 2025`, `Best Customer Service Team`).
Section heading: `Get instant help, anytime`, with body summarised as: whether
troubleshooting or learning, help is a message away. Using the help centre to
reassure users that contacting support will be pleasant is an unusual and
arguably effective placement — it lowers the cost of escalation at the moment of
hesitation. One testimonial explicitly contrasts Todoist with bot-first support,
which reads as positioning against the category.

## T12 FAQs

`[partial]`. Two FAQ surfaces exist and neither yielded question text:

1. **Pricing page** — `Read the plans FAQ` appears twice as a link, but the FAQ
   block's questions are not in the retrieved HTML. Only the CTA label is
   `[observed]`.
2. **Help centre** — `FAQ & Policies` is a real sub-section under
   `Troubleshooting`, and its four items *are* `[observed]`:

| # | Item (verbatim) | Shape |
|---|---|---|
| 1 | `Known Issues` | Noun — a defect register |
| 2 | `Status Dashboard` | Noun — a pointer to the status page |
| 3 | `Does Todoist support start dates?` | Yes/no capability question |
| 4 | `Why can't I access an attached file?` | First-person failure question |

**Structural note.** This is a four-item "FAQ" in which two items are not
questions at all but routing stubs to other systems, and only two are genuine
questions. The category label `FAQ & Policies` also promises policies, of which
none are listed. The section is functioning as a **catch-all for anything that
doesn't fit the other four troubleshooting buckets** — the residue slot, and
unlike Wise's deliberate `Is there any other information I need to know?`
catch-all, this one is not signposted as such.

Marketing-page FAQ blocks: `[absent]` — the home page carries no FAQ block at
all, which for a 50-million-user consumer product is notable. Objection handling
is done instead through the longevity/trust section and the SOC 2 banner.

## T13 Terminology & glossary

| Term | Todoist's usage | The alternative it rejected |
|---|---|---|
| `Quick Add` | The capitalised, named natural-language input. Also `Task Quick Add` in the article title and `global Quick Add shortcut` for the OS-level variant | "New task", "Create task", "command bar" |
| `Dynamic Add button` | The draggable mobile FAB — a *named* component, so its drag behaviour can be referenced | "the + button", "FAB" |
| `Inbox` | "the home for tasks without projects (yet)" | "Unsorted", "Backlog", "Someday" |
| `Today` / `Upcoming` | The two time views; both are bare temporal adverbs used as nouns | "Due today", "Agenda", "Calendar" |
| `Karma` | Gamified productivity score, with its own help article and pricing row | "Points", "Streak", "Score" |
| `Vacation mode` | Account state that pauses Karma penalties | "Pause", "Away", "Snooze" |
| `Insights` / `Productivity view` / `Reporting` | **Three names in one help sub-section** for the analytics area (`Introduction to Insights`, `Use the Productivity view in Todoist`, `View Reporting in Todoist`) | — |
| `Deadline` vs `date` | Two deliberately distinct temporal concepts (T6), with distinct syntaxes | one "due date" field |
| `floating time` | Time that doesn't shift with timezone | "local time", "no timezone" |
| `uncomplete` (verb) | The documented reverse of completing | "Undo", "Reopen", "Mark incomplete" |
| `uncompletable` (adjective) | A task that can't be checked off, by design | "note", "header" |
| `sub-task` | Always hyphenated, consistently | "subtask", "child task" |
| `Beginner` | The free plan's name | "Free", "Basic", "Starter" |
| `Ramble` | A named feature on the pricing matrix (`Ramble`, `Unlimited Ramble`, `Limited sessions`) — voice/brain-dump capture | "Voice notes", "Dictation" |
| `Todoist Assist` | Umbrella for AI features, decomposed into `Filter Assist`, `Task Assist`, `Email Assist` | "AI", "Copilot" |
| `Todoist Agents` | A distinct pricing row from `Todoist Assist` | — |
| `Smart quick add` / `smart date recognition` | The parser, referred to two ways | — |
| `sections` | Intra-project dividers, distinct from `folders` (which group team projects) | "groups", "columns" |
| `restricted project` | The named private-within-a-team object | "private project" |
| `Team guests` | Counted separately from `Team members` | "external collaborators" |
| `Twist` | Sibling product in the footer `Company` column, unexplained | — |

**Three observations.**

`Beginner` as a free-plan name is a real choice with a cost. Every other tier
name describes *what you do* (`Pro`, `Business`); `Beginner` describes *what you
are*, and it labels the user rather than the plan. It also fights the
`Available for: Beginner` badge on help articles, where it reads as a competence
level rather than an entitlement. Compare `Free` (factual) or `Starter`
(trajectory) — `Beginner` is the only one that could be read as mildly
patronising, and it appears on every help article in the corpus.

**`Ramble` is undefined anywhere in the harvested set.** It appears as a feature
bullet on the free plan, as `Unlimited Ramble` on Pro, and as a matrix row with
values `Limited sessions` / `Unlimited sessions` — but no page harvested says
what it is. A coined term monetised on the pricing page with no gloss at point of
sale.

**The analytics area has three names** (`Insights`, `Productivity view`,
`Reporting`) plus a fourth adjacent one (`Productivity visualizations` on the
pricing matrix), all within one help sub-section. This is the clearest
terminology defect in the file.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout (`your`, `you'll`),
first-person plural for the company and used generously — "We've spent over a
decade refining Todoist", "We haven't come up with a way to add tasks
telepathically (yet)", "we'll never sell out to the highest bidder",
"We currently don't support writing dates in Czech and Turkish". The company
speaks as a small team with opinions, not as a platform.

**Register: calm, warm, occasionally whimsical — and the whimsy is load-bearing.**
Help articles open with a joke or a reframe before the instructions:
"We haven't come up with a way to add tasks telepathically (yet), but the Todoist
Quick Add is the next best thing." / "All projects begin with a single step, but
don't stop there." / "Small steps add up to big achievements over time." The
parenthetical `(yet)` and the near-proverb openers are consistent enough to read
as a house style. Compare Wise, where the help centre is flat and factual — here
the help centre is the *warmest* surface.

**Exclamation marks are rationed but present**, unlike Wise:
`Take a peek!`, `Designed for teams!`, `Reward yourself for a job well done!`,
`whatever!` ("Set a schedule by day, week, lunar cycle, whatever!"),
`We're hiring!`. Clustered in marketing and in the encouragement bullets; entirely
absent from the security page, the status page, and the troubleshooting titles.
Same stakes-gradient principle as Wise, different baseline.

**Calm as an explicit vocabulary.** `Clarity, finally.`,
`Achieve mental clarity`, `Clear your mind`,
`Gain calmness and clarity`, `Collapse for calm, expand to complete`,
`get things out of your head`. The product is sold on cognitive relief and the
lexical field is tightly controlled around it —
clarity / calm / clear / mind / head. This is the register the brief's
"natural task language" strength actually rests on: the parser is the mechanism,
"clear your mind" is the promise.

**Numbers as trust devices, but inconsistently.** `50+ million professionals`,
`374K+ ★★★★★ reviews`, `374000+`, `30+ million app downloads`,
`2+ billion tasks completed`, `160+ countries`, `1+ million Pro users`,
`19 years and 20 days`, `100% - uptime`, `99.98% uptime`. The
19-years-and-20-days live counter is the best of these — precision as proof of
longevity. But as noted in T2 the user-count claim takes three different values
across three pages, and `374K+` / `374000+` appear as two formats of the same
figure on one page.

**Accessibility content** `[observed]`

- **Good:** the status page ships object-specific visually-hidden labels —
  `Read uptime graph for Web application & API`, `Read uptime graph for Content
  Sync API` — rather than a generic "chart". Also `Expand group`,
  `Show notice history`, and a `Dark mode` / `Language` control pair.
- **Good:** descriptive alt text on the hero image, scene-level:
  "Todoist app interface showing daily tasks, projects, and team sections with a
  mobile view of task entry screen."
- **Good:** the help centre documents keyboard shortcuts as a first-class article
  (`Use keyboard shortcuts in Todoist`) and quotes single-key affordances inline
  (`press the keyboard shortcut Q`, `press ↓` to reveal the description field).
  `↓` is given as a literal glyph rather than the word "Down arrow", which is a
  screen-reader risk in running text.
- **Defect:** the hero alt text is **duplicated verbatim in the DOM** (it appears
  twice consecutively in extracted text), consistent with responsive image
  variants both being exposed.
- **Defect:** `Read article` is appended to every help-list link, producing
  flattened accessible names like "Known Issues Read article". A repeated
  non-distinguishing suffix on hundreds of links.
- **Defect:** `Play` is the entire accessible name for eight separate video
  embeds in the getting-started article — no indication of which video.
- **Defect:** `Select Platform:` tab content is all present in the DOM
  simultaneously, so the three platform variants of each step list read as one
  contradictory sequence. Users of assistive tech may encounter
  "Click **Add task** or press **Q**" immediately followed by two different
  tap-based instructions with no boundary announced.
- **Defect:** avatar images on the eight support testimonials and on
  `Last updated by` carry empty or missing alt while sitting beside a name — mostly
  defensible (the name is adjacent text), but the `Engage Award Finalist 2025`
  badge image carries its award name as alt *and* the same words render as
  adjacent text, so it doubles.
- **Defect:** the `H1` `How can we help?` renders twice on the help home page.
- Reading level is low and sentences are short. Instructions are consistently
  `<verb> <UI element in bold>` with the element name in bold — a stable,
  scannable pattern.

**Negative findings, recorded honestly**

1. Two parallel help taxonomies rendered in one sidebar (`/help/categories/...`
   vs `/help/todoist/...`), with `Get Started` appearing three times and
   `Billing` and `Teams` each appearing twice with different children (T1).
2. `Security & Admin` vs `Security & access`; `Billing Questions` vs
   `Invoices, taxes & refunds` — the two taxonomies use different words for the
   same areas.
3. Nav lists a `Login & Account Access` troubleshooting sub-section; the rendered
   page has no such heading and the URL redirects to the category root. A
   promised category with no content.
4. `Get Help` (body) vs `Contact us` (nav) on the same help page.
5. `Teams Toolkit` vs `Toolkit` in the footer, varying by template. Likewise
   `Careers` vs `Careers We're hiring!`.
6. `Status` → `status.todoist.com` in the footer vs `System Status` →
   `status.todoist.net` in the help centre.
7. `Insights` / `Productivity view` / `Reporting` / `Productivity visualizations`
   — four labels, one feature area.
8. `Custom task reminders` (plan bullet) vs `Custom Reminders` (matrix row).
9. `Create a team for free, then` — truncated string, price missing.
10. Asterisked footnote markers on the pricing matrix (`300 for each member *`,
    `Up to 500 *`) with no footnote text present.
11. User-count claim inconsistent: 50+ million / 30+ million / 30 million+, with
    three different nouns.
12. `SOC2` rather than the conventional `SOC 2`.
13. Status page showed `No notices reported for the past 7 days` while a
    degraded-performance banner was live above it.
14. `100% - uptime` and `99.98% uptime` on the same line, unlabelled.
15. `Ramble` monetised on the pricing page with no definition anywhere public.
16. `Quick tip` and `Pro tips` as overlapping callout types, with `Quick tip`
    also used as a generic container for a multi-link section.

---

## Transferable patterns

1. **Self-retiring placeholder as onboarding.** Teach an input's grammar with
   rotating example values inside the empty field, and remove the teaching once
   the user demonstrates competence (Todoist: 15 completed tasks). Transfers
   directly to any free-text or smart-parse field — amount entry, search,
   reference fields, natural-language date pickers. Condition: you need a
   measurable competence signal, and you must publish the threshold or users will
   report the disappearance as a bug.
2. **Escalating example sets to teach a parser.** Grade documented examples from
   trivial to showing-off (`today` → `this weekend` → `Sept 15 at 2pm` →
   `every 3rd Tues for 6 months starting in April`). The last example's job is to
   establish the ceiling; the first three establish that it's safe. Applies to
   any query language, search syntax, or AI prompt field.
3. **Eyebrow = imperative to the user, headline = promise from the product.**
   Two copy levels in one block, each with a distinct job. Cheap to adopt, and it
   resolves the usual fight over whether a section header should be user-voiced or
   product-voiced — it is both, stacked.
4. **`Introduction to <object>` as a named title genre.** Split "what is this
   concept" from "how do I do this task" at the article-title level, so a user
   with a vocabulary gap has a guaranteed landing page. Transfers to any product
   with coined nouns — disputes, holds, authorisations, chargebacks.
5. **Disclose entitlement before instruction.** `Available for: Beginner / Pro /
   Business` at the top of every help article means a user never reads three
   screens of steps for a feature they can't reach. Directly applicable to
   tiered or market-gated features. Condition: the badge must be maintained
   automatically or it rots into a support liability.
6. **Distinguish two overlapping concepts with one concrete example, not a
   definition.** Date vs deadline, resolved by "deadline for when taxes are due,
   date for when you plan to start," and reinforced by different input syntax.
   The pattern is: pick the single scenario where the distinction bites, and let
   the syntax carry the rest.
7. **Bound a security or capability claim by date or scope rather than dropping
   the claim.** "Files uploaded before 11 April 2016 are not encrypted at rest,
   but are protected by firewalls." Also the published sunset date for a
   deprecated syntax character, stated in the reference table beside its
   replacement. Honest bounding beats both silence and over-claim — note that
   Todoist's one absolute claim ("Prevents all unauthorized access") is the least
   credible line on the same page.
8. **Name a human as the last editor of a help article.** First name, photo,
   date. Cheap trust, and it makes staleness visible instead of hiding it behind
   "the team."
9. **Sell longevity as a feature where the category has a churn problem.** A live
   tenure counter plus an explicit anti-acquisition pledge. Transfers to any
   product asking users to invest years of data — password managers, notes,
   archives, financial history.
10. **Counter-example to steal *against*:** `Troubleshoot <system object>` titles.
    Nine of eighteen troubleshooting articles start with the word "Troubleshoot,"
    which requires the user to already know the system's fault taxonomy. Set this
    beside Wise's `I sent the wrong amount` as a paired before/after when arguing
    for user-voiced recovery titles.

## Caveats & gaps

- **All in-product strings are `[documented]`, not `[observed]`.** Empty states,
  toasts, validation messages, dialog copy, and notification text are behind
  auth. T8 and T9 are consequently thin, and T8 has no verbatim in-product string
  at all.
- **Pricing-page FAQ not retrieved.** `Read the plans FAQ` is a live link but the
  question set is client-rendered and absent from server HTML. T12 rests on the
  help centre's `FAQ & Policies` stub instead.
- **Business plan price and all pricing footnotes missing** from the retrieved
  HTML, so tier-price disclosure language could not be assessed.
- **`todoist.com` vs `www.todoist.com` return materially different payloads.**
  The bare host returns text-only content with nav and footer stripped; the `www`
  host returns full markup with nav, footer, and links. All IA findings in T1 come
  from `www`. Anyone re-verifying should use `www`.
- **Help-article bodies opened for only two articles** (getting-started and Quick
  Add). The other ~90 titles harvested are titles only — high signal for IA and
  task phrasing, silent on answer structure.
- **Whole help categories unharvested:** `Todoist & AI`, `Integrations`,
  `Billing`, `Product Updates`, and the `Views, Filters & Labels`,
  `Reminders & Notifications`, `Projects & Sections`, `iOS`, `Android`, `Desktop`
  sub-sections. `Todoist Assist` / `Todoist Agents` / `Ramble` language is
  therefore known only from pricing rows.
- **No published design system, brand voice guide, or content style guide found.**
  Doist publishes engineering and remote-work material, but no public content
  style guide surfaced. T14 is reconstructed from observed copy, not from stated
  policy.
- **Status page state vocabulary is partly Instatus's, not Todoist's.**
  `Operational` / `Degraded performance` are platform defaults; the component
  names and the incident headline are Todoist's. Attribute accordingly.
- **Localisation not assessed.** 19 locales are offered; only `en` was harvested.
  The documented Czech/Turkish date-parsing gap suggests parser coverage and UI
  coverage diverge, which would repay a localised pass.
- **Mobile app store copy and in-app strings out of scope.**
- The eight support testimonials on the help home are reproduced by the site as
  customer quotations; they are summarised rather than quoted in full here.

## Sources

1. https://todoist.com/
2. https://todoist.com/pricing
3. https://www.todoist.com/help
4. https://www.todoist.com/help/categories/get-started
5. https://www.todoist.com/help/categories/features/tasks-and-planning
6. https://www.todoist.com/help/categories/features/productivity-and-karma
7. https://www.todoist.com/help/todoist/troubleshooting
8. https://www.todoist.com/help/todoist/teams
9. https://www.todoist.com/help/articles/get-started-with-todoist-OgNNJR
10. https://www.todoist.com/help/articles/use-task-quick-add-in-todoist-va4Lhpzz
11. https://www.todoist.com/security
12. https://status.todoist.net/
