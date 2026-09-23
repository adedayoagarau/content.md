# 009. ClickUp

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | All-in-one work platform / convergence suite (tasks + docs + chat + AI agents) |
| Primary URL | https://clickup.com/ |
| Corpus rank | 009 |
| Benchmark strength (source list) | Feature discovery and setup |
| Locale / market observed | en-US; help centre ships six locales (de, es, es-419, fr-FR, it, pt-BR) |
| Platform observed | Web (desktop), Zendesk help centre, incident.io status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Certifications displayed site-wide in the footer: SOC 2 (certified), ISO 27001 (certified), GDPR (compliant), HIPAA (compliant). Data residency offered for US, EU, APAC; MSA & HIPAA "Available" on Enterprise |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 |
| Harvest completeness | Partial — `Manage task statuses` returned only its head (body is client-rendered), so the primary status-vocabulary article is `[documented]` via its meta description only. The marketing feature page compensated substantially. In-product empty states not observable |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://clickup.com/ | Hero, 100+ feature list, 21 named AI agents, six solution blocks, Forrester ROI figures |
| Pricing | https://clickup.com/pricing | **Richest single source** — 4 plan cards, ~130-row comparison table, separate AI pricing tier set, billing-policy statement, 6-question FAQ |
| Help centre index | https://help.clickup.com/hc/en-us | 9 categories with scope lines; `Most viewed articles` with excerpts; 6-locale switcher |
| Help category: Get started | https://help.clickup.com/hc/en-us/categories/5735245366551-Get-started | 14 sections, ~100 article titles with excerpts — the onboarding IA |
| Help category: Technical Support | https://help.clickup.com/hc/en-us/categories/5927901136151-Technical-Support | 4 sections, troubleshooting title grammar |
| Feature page: Custom Task Statuses | https://clickup.com/features/custom-task-statuses | **15 named status templates** across 5 categories — the status-vocabulary source |
| Help article: Manage task statuses | https://help.clickup.com/hc/en-us/articles/6309452618647-Manage-task-statuses | **Partially blocked** — head only; meta description captured |
| Status page | https://status.clickup.com/ | 23 components; incident.io platform, not Statuspage |

---

## T1 Navigation & IA labels

**Global nav — five items, one of which is a brand, not a category** `[observed]`:
`Brain AI` · `Product` · `Solutions` · `Learn` · `Pricing` · `Enterprise`, then
`Get a Demo` · `Login` · `Sign Up`.

`Brain AI` occupies the **first** nav slot — the AI product name promoted above
`Product` itself. For a platform whose pitch is convergence, putting a
sub-brand ahead of the category noun is a positioning statement: AI is not a
feature of the product, it is the entry to it.

`Enterprise` sits as a flat peer of `Pricing`, the same audience-tier promotion
seen at Airtable.

**Footer groupings — six, and the composition is the finding** `[observed]`:

| Group | Contents |
|---|---|
| `Download` | `iOS & Android` · `Mac & Windows` · `Brain MAX` |
| `AI` | `Brain` · `Super Agents` · `Ambient Agents` · `Notetaker` · `Enterprise Search` · `Talk to Text` |
| `Product` | `Chat` · `Projects` · `Docs & Wikis` · `Calendar` · `Dashboards` · `Time Tracking` · `Gantt Charts` · `Automations` · `Whiteboards` · `API` · `Integrations` |
| `Compare` | **eleven named competitors** |
| `Company` | `About Us` · `Careers` · `Customers` · `Affiliates` · `Events` · `Partners` · `Consultants` · `Reviews` · `Press` · `Brand` · `Roadmap` |
| `Help` | `24/7 Support` · `Contact Us` · `Get a Demo` · `Import` · `Community` · `ClickUp University` · `Webinars` · `Blog` · `Research` |

Three observations. **`AI` is a footer group co-equal with `Product`**, holding
six named sub-products — so the AI layer has its own product taxonomy, not a
single entry. `Brain MAX` sits under `Download` rather than under `AI`, implying
it is a client app; `Brain` sits under `AI`. Same brand, two groups.

**The `Compare` group names eleven competitors** — `vs Atlassian` ·
`vs Microsoft Teams` · `vs Asana` · `vs ServiceNow` · `vs Monday` · `vs Slack` ·
`vs Smartsheet` · `vs Wrike` · `vo Salesforce` · `vs Notion` · `vs Airtable`.
Coda names four; ClickUp names eleven, and the list spans four different
categories (project management, chat, ITSM, CRM, database). That breadth *is*
the convergence claim rendered as navigation: the competitor set is wide because
the product claims to replace all of them. Note `vs Atlassian` names the
*company* while the URL is `jira-vs-clickup` — the label was widened to cover the
whole vendor.

`Import` placed inside `Help` rather than under Product is a migration-path
decision: switching tools is treated as a support task, not a feature.

**`Roadmap` links to `dev-doc.clickup.com`** — a public roadmap hosted on a
ClickUp doc at a subdomain whose name (`dev-doc`) reads internal. Recorded as a
mild defect.

**Help-centre top level — nine categories, each with a short scope line**
`[observed]`:

| Category | Scope line (verbatim) |
|---|---|
| `Get started` | "Start using ClickUp." |
| `ClickUp Agents` | "Use context-aware AI teammates." |
| `ClickUp Brain AI` | "Connect knowledge, people, and work." |
| `Features and ClickApps` | "Browse articles by feature." |
| `Chat` | "Communicate with your team." |
| `Integrations, API, and MCP` | "Search and sync data from other apps." |
| `Mobile` | "Take your work anywhere." |
| `Technical Support` | "Troubleshoot bugs and share feedback." |
| `Data, privacy, and security` | "Data protection, privacy, and security." |

Every scope line is **a single short imperative or noun phrase with a full
stop** — the tightest set in this batch. Compare Coda's comma-runs ending in
"and more". `Use context-aware AI teammates.` is the standout: four words that
define the product category (`AI teammates`) and its differentiator
(`context-aware`) in the help-centre nav.

Note `Data, privacy, and security`'s scope line is a near-tautology of its own
label ("Data protection, privacy, and security"), the only one that adds nothing.

**Two of nine categories are AI products** (`ClickUp Agents`,
`ClickUp Brain AI`) — 22% of the help-centre taxonomy allocated to a capability
introduced recently. `Chat` also has its own top-level category. The IA is
**product-line-shaped**, not task-shaped: it mirrors what ClickUp sells rather
than what a user is trying to do.

`Features and ClickApps` is the catch-all, and its scope line admits it:
"Browse articles by feature." A category whose organising principle is
"everything else, by feature name" is where the long tail of a 100+-feature
product goes.

**`Get started` contains fourteen sections** `[observed]` — an unusually deep
onboarding category:

`Intro to ClickUp` (17 articles) · `Navigating ClickUp` (41) ·
`The Hierarchy` (with four nested sub-sections: `Workspaces`, `Spaces`,
`Folders`, `Lists`) · `Owners and Admins` (26) ·
`User roles and permissions` (14) · `Import and Export` (22) ·
`Communicating in ClickUp` (20) · `Teams (User Groups)` (13) ·
`Account settings` (11) · `Privacy and sharing` · `Tasks` (71) ·
`Subtasks` · `Views` (15 nested view-type sections) · `Best practices` ·
`Use cases` (with `Feature` / `Industry` / `Role` sub-sections).

**`Tasks` has 71 articles inside `Get started`.** That is a structural finding:
the "getting started" category contains the product's largest article set,
because in a platform this wide there is no meaningful boundary between
onboarding and reference. `Navigating ClickUp` at 41 articles says the same thing
— navigation alone needs forty-one documents.

`The Hierarchy` as a section name, with a capital H and four nested container
sub-sections, is the most important IA label in this file (see T13).

`Best practices` and `Use cases` as peer sections inside `Get started` is the
notable inclusion — prescriptive guidance and worked scenarios sitting alongside
mechanics. Most help centres separate "how" from "how you should".

## T2 Value proposition & headline patterns

**Hero — and it is grammatically broken** `[observed]`:

> `The Best AI is` / `Software to replace all software`

Read as one sentence: "The Best AI is Software to replace all software." The
first fragment sets up a predicate that the second does not complete
idiomatically. A second variant appears lower on the page as
`The Best AI is` / `Software to replace all software` / `Save time. Save money.
Infinite productivity.` The construction appears to be a rotating-word animation
whose static render reads as a sentence fragment. **Recorded as a defect:** the
page's primary headline does not parse in its non-animated state, which is what
a screen reader or a no-JS client receives.

The claim itself — `Software to replace all software` — is the most aggressive
positioning statement in this batch. Coda says `Replaces` above four logos;
ClickUp says *all software*, unqualified.

**Three-part benefit triad, each a two-word imperative plus a mechanism**
`[observed]`:

- `Save money.` — "All Apps, AI, Projects, Chat + 20 more."
- `Save time.` — "All humans working together with perfect context."
- `Create infinite productivity.` — "AI Agents & Workflows."

The first two are conventional; the third escalates to `infinite`, which is
unbounded and unqualified. Note the triad's grammar breaks on the third item
(`Save X` / `Save X` / `Create X`) — the parallelism is abandoned to reach for
the bigger claim. `perfect context` in the second mechanism is the same
unqualified absolute.

**The problem statement is the strongest piece of copy on the page** `[observed]`:

> `60% of work is lost in context – and AI is lost without it`
>
> `Work Sprawl is killing context and destroying productivity.`

**`Work Sprawl`** is a coined problem-noun, capitalised, and it does the job a
category-creation term should: it names the enemy so the product can be the
answer. The preceding line is a two-clause construction that turns a statistic
into a dependency — work loses context, *and AI needs context* — which makes the
AI pitch follow from the problem rather than being bolted on. This is the
cleanest problem→product logic in the batch.

Note the spaced en-dash and the absent full stop on the first line against a
full stop on the second.

**Statistics presented as a labelled quartet, with a single sourced footnote**
`[observed]`:

| Label | Figure | Gloss |
|---|---|---|
| `ROI` | `384%` | "ClickUp delivered 384% ROI over three years, helping organizations unlock significant efficiency gains." |
| `REVENUE INCREASE` | `$3.9M` | "ClickUp projects drove $3.9M in revenue gains by streamlining work, consolidating tools, and scaling faster." |
| `HOURS SAVED` | `92,400` | "Organizations saved 92,400 hours with ClickUp, reducing manual work and recapturing productivity at scale." |
| `PAYBACK` | `<6 mo` | "Customers reached payback in under six months, making ClickUp a proven investment with rapid returns." |

Footnoted: "*from 2025 The Total Economic Impact™ of ClickUp report from
Forrester Group." with a `Get the report` CTA.

Four-metric grid, each with an all-caps category label, a figure, and a
one-sentence mechanism, all attributed to one named third-party study with a
date. This is the **procurement-grade version** of the social-proof pattern —
compare Airtable's per-customer metrics and Trello's per-claim survey links.
`<6 mo` uses a mathematical operator in a headline figure, as Airtable's `>90%`
does.

But the framing line above it is the interesting one:

> `It's like adding 15 full-time employees`
>
> "According to third party research ClickUp saves the average company over 30k
> hours per year, and delivers industry-leading ROI."

**`It's like adding 15 full-time employees`** converts hours saved into
headcount, which is the unit a buyer's budget is actually denominated in. A
translation of a soft metric into a hard one. Note `According to third party
research` without naming the party in this sentence (it is named in the footnote
below), and `over 30k hours` here against `92,400 hours` in the grid — **two
different hours figures on one page**, one per-year-average and one presumably
cumulative, with neither labelled clearly enough to reconcile. Recorded as a
defect.

**Six solution blocks, each with a rigid five-part structure** `[observed]`.
Tabs: `Projects` · `Marketing` · `Product & Eng` · `IT` · `HR` · `Leadership`,
framed as "Your key workflows, powered by ClickUp Agents."

Each block runs: **headline → subhead → `REPLACES` + logos → three capability
bullets → three-to-four named agents with their jobs → `Explore solution →`**.

| Tab | Headline (verbatim) |
|---|---|
| Projects | `Deliver projects on time, every time` |
| Marketing | `Maximize marketing's impact and results` |
| Product & Eng | `Ship faster, more reliable software` |
| IT | `Create the systems, for scale` |
| HR | `Build the process that power your people` |
| Leadership | `Close the strategy- execution gap` |

Two of the six are defective: `Build the process that power your people`
(subject-verb disagreement — *process* / *power*) and
`Close the strategy- execution gap` (a hyphen stranded before a space, evidently
a broken line-break hyphen). Both are in production headline copy.

`REPLACES` in all caps above a competitor logo strip is **the same device Coda
uses** (`Replaces`), arrived at independently, and here repeated six times with
a different logo set per audience. Segmenting the displacement claim by team is
the refinement.

**Capability bullets are verb-first and include the unhappy path** `[observed]`:
`Manage complex projects at scale` · `Detect and mitigate project risks` ·
`Identify + resolve bugs` · `Eliminate content + creative bottlenecks` ·
`Keep a pulse on employee NPS` · `Enforce accountability and ownership with
ultimate visibility` · `Set the strategy and actually execute it`.

Note the `+` used as a conjunction in body copy (`Detect + resolve`,
`vendors + budgeting`, `contracts + procurement`, `deliverables + timelines`) —
a consistent typographic tic, and one that hurts screen-reader output.
`Set the strategy and actually execute it` — the adverb `actually` is doing
objection-handling work, conceding that strategy documents usually go nowhere.

**Enterprise trust block** `[observed]`:

> `Enterprise-grade everything`
>
> "Out of the box security & AI that's even more private than ChatGPT¹"
>
> ¹ "Our agreements ensure zero data training & retention on all third-party
> model providers"

`even more private than ChatGPT` is a **named-competitor privacy comparison in a
trust claim**, footnoted to the actual mechanism (contractual no-training,
no-retention terms with model providers). The footnote is the substantive part
and it is specific — `zero data training & retention` names both of the two
things an enterprise buyer worries about. Putting the comparison in the headline
and the mechanism in the footnote is the Wise claim-then-bound pattern applied
to AI privacy.

**Pricing headline** `[observed]`: `The best work solution, for the best price.`
— a double superlative, with `100% Money-back Guarantee` rendered **twice**,
immediately above and below it.

**AI pricing headline** `[observed]`:
`The world's most advanced AI for work` — another unqualified superlative, and
`Nothing comes close to Brain²` on the home page.

**Register note on the AI section**: the copy makes strong absolute claims
(`infinite memory`, `perfect context`, `Nothing comes close`, `The only AI that
actually knows your work`, `500+ tool superpowers`) with no qualifying
footnotes, in direct contrast to the enterprise-trust block immediately below it
which is carefully footnoted. **The tone does not flatten as stakes rise** — it
flattens only where compliance requires it.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started. It's FREE` | Hero (first render) | Two sentences in one button; `FREE` in caps |
| `Get started. It's FREE!` | Hero (second and third renders) | **Same button, exclamation mark added** |
| `Get started` | Solution blocks, ROI block, pricing cards | Bare |
| `Get Started` | Free Forever pricing card | **Title-cased** while the other three cards say `Get started` |
| `Get started FREE` | Foot of home page | Fourth variant |
| `Sign Up` | Global nav | Fifth variant of the same action |
| `Activate →` | Feature-picker strip | Unusual verb; arrow glyph |
| `Get a Demo` | Global nav | |
| `Get a custom demo` | Enterprise pricing card | |
| `Book a demo` | ClickUp Certified Agents block | **Third demo-CTA variant** |
| `Contact sales` | Enterprise pricing card | |
| `Contact us` | Pricing FAQ intro, links to help centre | CTA labelled `Contact us` routing to self-service |
| `Login` | Global nav | |
| `Learn More` | Super Agents block | Bare, title-cased |
| `Learn more` | AI block, ClickUp Assist | Bare, sentence-cased — **both casings on one page** |
| `Read More` / `Read more` | Custom Statuses / Board View blocks | **Both casings, adjacent sections** |
| `Explore solution →` | All six solution blocks | Arrow glyph, consistent |
| `See all teams` | Solutions tab strip | |
| `Get Started with Brain` | AI section | Product-specific |
| `Why Brain AI` / `Why Everything AI` | AI pricing cards | **A question as a CTA label** — routes to a video |
| `Get AI Super Credits` | AI pricing | |
| `Read customer stories` | Social proof | |
| `Get the report` | ROI block | Names the artefact |
| `Play Video` | Problem-statement block, rendered twice | Duplicate in DOM |
| `Build your own agent` | Super Agents block | |
| `Delegate any task` | Super Agents block, rendered twice | Reads as a capability claim, used as a CTA |
| `Complete feature list` | Pricing | Section heading used as a link |
| `Load more` | Pricing FAQ | Progressive disclosure |
| `Skip to main content` | Help centre, top of DOM | Accessibility |
| `Ask me anything` | Help-centre search placeholder | **AI-first search affordance** |
| `My Tickets` | Help centre header | |
| `Go to ClickUp` | Help centre footer | |
| `See all N articles` | Help category sections | Count inline |
| `Subscribe to updates` | Status page | |

**Observations.** The signup action has **five labels**
(`Get started. It's FREE`, `Get started. It's FREE!`, `Get started`,
`Get Started`, `Get started FREE`, plus nav `Sign Up`) and the demo action has
three (`Get a Demo`, `Get a custom demo`, `Book a demo`). `Learn more` and
`Read more` each appear in two casings on the same page. This is the loosest CTA
hygiene in the batch — looser than Airtable's four signup variants.

Two CTAs are genuinely interesting. **`Why Brain AI`** uses a question as a
button label, which pre-empts the objection ("why would I pay for this?") and
makes the CTA feel like an answer rather than a commitment — placed on the
*paid* AI tier, where the objection is real. And **`Ask me anything`** as the
help-centre search placeholder reframes search as conversation; it replaces the
conventional "Search for an article" and signals AI retrieval without naming it.

`Activate →` is the odd one out — an unusual verb for a feature-picker, with no
object, reading as if it belongs to a different interaction.

## T4 Onboarding & getting-started

The flagged strength, and the evidence is dense.

**The onboarding IA is forked by role, in the section names** `[observed]`.
Inside `Get started`, two sections address different people doing the same job:

- `Set up your individual Workspace` — "Whether you're joining an established
  Workspace or creating a one-person Workspace, set up for success! ClickUp is
  flexible and customiza…"
- `Set up your team's Workspace` — "**Owners and admins**, take the time to
  optimally configure your Workspace and set your team up for success. Make sure
  you have all the info…"

Both are `Promoted article`-badged. The second **opens by naming its audience in
the vocative** ("Owners and admins, take the time to…") before giving the
instruction — a direct address that lets everyone else self-deselect in four
words. And it asks for *time* up front ("take the time to optimally configure"),
setting the expectation that setup is work rather than a wizard.

The first covers two genuinely different situations in one sentence
("joining an established Workspace **or** creating a one-person Workspace"), which
is the two-worked-examples technique seen at Airtable.

**A dedicated section for administrators** `[observed]`: `Owners and Admins`
(26 articles) sits as a peer of `Intro to ClickUp`. Onboarding for the person who
configures the tool is separated from onboarding for the person who uses it, at
the IA level rather than inside articles.

**`Core ClickUp features`** — "Brand new to ClickUp? Make the most of our
customizable platform by learning these core features!" A curated
minimum-viable-feature set, which for a product advertising **100+ products** is
a necessary counterweight. The home page's 100-item feature list and the help
centre's `Core ClickUp features` article are the two halves of the
feature-discovery problem: one maximises perceived breadth, the other rescues the
new user from it.

**`Best practices` as a first-class section inside onboarding** `[observed]`,
four articles with prescriptive titles:

- `Intro to ClickUp best practices` — "Use the following articles to learn about
  ClickUp best practices."
- `Hierarchy best practices` — "There are many ways to organize your work in
  ClickUp. In this article, you'll learn our **recommended** best practices…"
- `Teamwork best practices`
- `Working efficiently best practices`

`Hierarchy best practices` is the important one. It opens by **conceding that the
product is under-constrained** ("There are many ways to organize your work in
ClickUp") and then supplies an opinion. A maximally flexible product creates a
blank-page problem that flexibility cannot solve; the answer is prescriptive
content, and ClickUp files it inside `Get started` rather than in a blog.

**`Use cases` sub-sectioned three ways** `[observed]`: `Feature` · `Industry` ·
`Role`, plus eleven articles whose titles are **search-shaped how-tos**:

`Use ClickUp for marketing campaign management` ·
`How to manage multiple calendars in one view` ·
`How to track marketing OKRs` · `How to create a content calendar template` ·
`How to use Gantt charts for project planning` ·
`ClickUp vs. Notion: Docs, Wikis, and Project Management`

The last one is a **competitor-comparison article inside the help centre**, and
its excerpt is unusually even-handed: "Notion and ClickUp are solving different
problems. Notion is a document-first workspace. Everything is a page, databases
live inside pa…". Opening a competitive comparison by conceding the competitor
solves a different problem — in a support article, where the reader may already
be a customer — is a notable register choice.

`How to use Gantt charts for project planning` begins by defining the artefact
generically ("A Gantt chart plots tasks along a timeline to show start dates,
due dates, durations, and dependencies") before mentioning ClickUp. **Help
content written to be useful to someone who has not bought yet** — an
acquisition surface disguised as, and functioning as, documentation.

**The onboarding sequence is stated in a small-business article** `[observed]`:
`Run your small business on ClickUp` — "Capture work, align on strategy, execute
efficiently, and continuously improve your small business." Then the first
section heading: `Capture and prioritize work`. A four-verb lifecycle
(capture → align → execute → improve) used as the article's own spine.

**Rollout-of-new-version onboarding** `[observed]`: `Intro to ClickUp 4.0` —
"ClickUp 4.0 introduces a converged Workspace that connects your tasks, Docs,
Chat, and AI tools in one place. New and updated features …". A named major
version with its own intro article, and `NewClickUp 4.0` badged on the home page.
Versioning a SaaS product publicly, and writing onboarding for the version rather
than the product, is a real choice — it gives existing users a re-onboarding
entry point.

**Documented in-product setup affordances** `[observed]`:
`Customize your ClickUp experience` — "Customize your Global Navigation, Home
Sidebar, and Workspace themes. These changes only apply to your Workspace, so
configure them how…" Note the **scope disclaimer inside the description**
("only apply to your Workspace") — repeated verbatim in `My Settings`
("These changes only apply to your Workspace") and
`Change your Workspace appearance and theme` ("These settings only apply to your
Workspace"). Three articles carrying the same scope caveat in the same words: a
deliberate, consistent answer to "will this change things for everyone?"

## T5 Form & field labels

No authenticated forms observable. What is `[observed]` or `[documented]`:

**Task field vocabulary, from the home-page demo board**
`[observed, demo data]` — a scripted Kanban board showing column headers,
field labels, and values:

- Column headers: `Task` · `Name` · `Priority` · `Assignee` · `Labels`
- Priority values: `high` · `normal` · `low` — and also `High` · `Normal`
  **in the same demo**, lower-cased in the table rows and title-cased in the
  priority-picker overlay. A casing inconsistency inside one demo.
- Label values: `Backend` · `API` · `Data` · `Frontend` · `Infra`
- Row control: `Add task`, and `Count` with a numeral per column

`Count` as a column-footer label (rather than "2 tasks" or "Total") is worth
noting — the aggregation function named rather than the result described.

**Documented field and setting labels** `[observed]`:
`Custom Fields` · `Custom Field Manager` (Basic / Advanced) ·
`Custom Task Types` · `Custom Task IDs` · `Custom Statuses` ·
`Custom Roles` · `Custom Permissions` · `Custom Branding` ·
`Custom Exporting` · `Custom SAML Single Sign-On` ·
`Default Personal Views` · `Default Views` · `Default user role permissions` ·
`Multiple Assignees` · `Task Checklists` · `Dependencies` ·
`Relationships` · `Tags` · `Priorities` · `Time Estimates` ·
`Granular Time Estimates` · `Column Calculations` · `Doc Tags` ·
`Work in Progress Limits` · `Protected View` · `Pinning Custom Fields`.

**The `Custom X` prefix appears eleven times in one pricing table.** It is
ClickUp's dominant feature-naming morpheme, and it is doing positioning work:
every instance asserts configurability. The cost is that `Custom` becomes
semantically empty — `Custom Field Manager Advanced` and
`Custom Field Manager Basic` appear as *two separate rows in two separate
sections* of the same table, duplicated verbatim. Recorded as a defect.

**Password requirement text** `[documented]`, from `Change your username, email,
and password`: "Passwords created for ClickUp must be a minimum of 8 characters
and include a…" (truncated). The requirement is stated in the article's opening
lines under a `What you'll need` heading.

**`What you'll need` is a recurring structured heading** `[observed]` across help
articles — e.g. "What you'll need / The desktop app is available on every plan.",
"What you'll need / Invite permissions are available on all plans. The ability to
edit i…", "What you'll need: / The Bulk Action Toolbar is avail…". It functions
as ClickUp's equivalent of Airtable's `Plan availability` / `Permissions` header
table, but as prose rather than a table, and with inconsistent punctuation
(`What you'll need` vs `What you'll need:`).

**A parallel convention exists for the same job** `[observed]`:
`<Feature> feature availability and limits` as a **dedicated article type**, with
at least six instances: `Overviews feature availability and limits` ·
`Global Navigation and Home Sidebar availability and limits` ·
`Import and export feature availability and limits` ·
`Time Tracking feature availability and limits` ·
`Cards feature availability and limits` ·
`ClickUp Brain feature availability and limits`.

And an inline sentence pattern repeated across many articles:
"Feature availability and limits vary by plan and user role. Learn more".

So ClickUp answers "does this apply to me?" three ways: a prose
`What you'll need` block, a dedicated `feature availability and limits` article,
and an inline boilerplate sentence with a `Learn more` link. **Three
conventions for one job** — more thorough than Coda, less elegant than Airtable's
single structured header.

**Status-page and form microcopy** `[observed]`: `Subscribe to updates`;
help-centre search placeholder `Ask me anything`.

## T6 Status & state language

**This is the richest status-vocabulary section in the batch, and ClickUp is the
only product of the five that ships an opinion about status design.**

**The product distinguishes two status *modes*, and names both** `[observed]`,
from the Custom Task Statuses feature page:

> `Create statuses your way!`
>
> **Custom**: "Add different stages to your tasks such as 'in progress' so you
> know what everyone is working on."
>
> **Simple**: "Use simple checklists to show when tasks are 'done' or 'not
> done'."

And the meta description states the trade-off explicitly: "Simple statuses
provide tasks that are either done or not done, great for personal projects or
to-do-lists. Custom Statuses give advanced users a customized workflow."

Naming the binary mode (`Simple`) as a first-class product concept rather than a
degenerate case, and telling the user which audience each suits, is a genuine
information-design decision. Trello ships only the binary; Airtable and Coda
ship neither. ClickUp ships both and labels them.

**And then it takes a position** `[observed]`:

> `Custom Statuses`
>
> "We highly recommend using custom statuses in ClickUp. **The reality is almost
> all tasks at least have three stages.**"

That second sentence is the single most quotable line in this file. A prescriptive
recommendation, justified by an empirical claim about work itself
(`almost all tasks at least have three stages`), stated in the company's own
voice with a hedge (`almost all`, `at least`) that keeps it defensible.
**Most products refuse to tell users how to model their work. ClickUp does,
with a reason.**

The `Simple Statuses` counterpart is described without condescension: "Simple
statuses are treated much like a to-do list and offer an easy way to keep up with
simple tasks. Once the task is complete, change the status to done and move on to
the next!"

**Fifteen named status templates, grouped into five categories** `[observed]` —
`Choose a Custom Status Template`:

| Category | Templates | Description (verbatim) |
|---|---|---|
| `Marketing` | `Content` | "Create amazing content that's been approved by the team before publication." |
| | `Advertising` | "Guarantee your ads are a hit while giving transparency to the team" |
| | `Social media` | "Social media is always better with a little peer-review" |
| `Development` | `Sprint` | "This is your typical Agile process that ensures releases happen on time" |
| | `Engineering` | "A thorough method for ensuring quality output" |
| | `Website Management` | "Move from design to development and bring your website online as quickly as possible" |
| `Operations` | `Startup` | "This workflow can be customized for your team's needs" |
| | `Enterprise` | "Guarantee nothing slips through the cracks and professional output is delivered every time" |
| | `E-Commerce` | "Tasks represent orders and require a fulfillment process to ensure everyone gets their packages" |
| `Personal` | `Vacation` | "Organize a vacation and make sure everything is addressed" |
| | `Party planning` | "Throw the perfect party with none of the headache" |
| | `Job hunt` | "Show your organization skills through the whole application process!" |
| `Other` | `Sales` | "Keep the big deals moving and clear your mind of every moving part" |
| | `Freelancing` | "This is a great way to Get Started with your custom freelancing workflow" |
| | `CRM` | "Keep customers organized and transparent with these custom statuses" |

**This is a status-vocabulary gallery — the artefact a content designer would
most want from this harvest**, and it is the only one of its kind across the five
products.

Three patterns in the descriptions. Each names **the outcome the status sequence
protects**, not the statuses themselves: `Content` protects approval-before-
publication; `Enterprise` protects against things slipping through the cracks;
`E-Commerce` protects package delivery. The status set is sold as a guarantee, not
as a list.

`E-Commerce`'s description does something rarer — it **redefines the core object
for a domain**: "Tasks represent orders". One clause telling the user that in this
template the product's noun means something else. That is how a
general-purpose tool gets adopted for a specific workflow, and stating the
mapping explicitly is the transferable move.

`Startup`'s description is the weak one — "This workflow can be customized for
your team's needs" says nothing that is not true of all fifteen. And
`Freelancing` contains `Get Started` mid-sentence in title case, apparently a
CTA string pasted into body copy. Recorded as a defect.

Note the five categories mix axes: `Marketing` / `Development` / `Operations` are
functions, `Personal` is a life context, `Other` is a residue — and `Other`
contains `Sales` and `CRM`, which are functions that should sit with the first
three. The taxonomy leaked.

**Actual status values, from the home-page demo board**
`[observed, demo data]` — these are illustrative customer configurations, not
product defaults, but they show what ClickUp presents as exemplary:

`Open` (2) → `In Progress` (3) → `In Review` (2) → `Done` (2)

Four stages with counts, which matches the "almost all tasks at least have three
stages" claim. `Open` rather than `To Do` or `Backlog` is the interesting
choice — a state of the *task*, not a position in a queue.

**`Done statuses` is a named product concept** `[documented]` — an article
titled `Use Done statuses` exists, implying the product distinguishes statuses
that *mean* completion from the literal status named "Done". That is the correct
model (a `Published` or `Shipped` status should count as done) and it requires a
meta-status concept. The article body was not retrieved.

**`Time in Status`** `[observed]` — a pricing-table feature
(`Display Time in Status`). Status as something with *duration*, not just
current value. Exposing time-in-state as a first-class metric implies the status
vocabulary is treated as a measurable process, not a label.

**Other state vocabulary** `[observed]`:

| State / concept | Source |
|---|---|
| `Work in Progress Limits` (a ClickApp) | Pricing table — WIP limits as a named, purchasable constraint |
| `Protected View` | Pricing table |
| `Trial` | **Used ~25 times as a cell value** in the comparison table, meaning time-limited access to a feature on a lower plan |
| `Set your status or mute notifications` | Help article — a *person's* status: "Are you at a doctor's appointment, lunch, out of office, or on vacation? Or do you need to focus for a few hours?" |
| `Archived` / `sleeping tab` | `Browser tab limits` — "ClickUp automatically puts inactive tabs in your web browser to sleep" |
| `guests` · `limited members` · `limited members view only` · `members` · `admins` · `owner` | User-role states (see T13) |

**`Set your status or mute notifications`** is the standout for register. The
article opens with a list of the user's actual situations —
"Are you at a doctor's appointment, lunch, out of office, or on vacation? Or do
you need to focus for a few hours?" — before naming the feature. Four concrete
life circumstances, one of them medical, used to introduce a presence setting.
**Naming the situations rather than the setting** is the Wise
`Where is my money?` instinct applied to a status feature.

**AI loading and progress states** `[observed, demo data]`:
`Prioritizing…` · `Creating task…` · `Gathering Data` · `MCP Online` ·
`Memory Updated` · `Searching…`-class present participles. Note
`Prioritizing…` and `Creating task…` carry ellipses while `Gathering Data` does
not, and `Gathering Data` is title-cased while the others are not.

**Status-page states — and a different voice from the rest of the batch**
`[observed]`. ClickUp uses **incident.io**, not Atlassian Statuspage, and the
copy is materially different:

> `We're fully operational`
>
> "We're not aware of any issues affecting our systems."

Compare Atlassian's `All Systems Operational` (used by Trello, Airtable, and
Coda). ClickUp's version is **first person plural and epistemically hedged** —
"We're not aware of any issues" concedes that the absence of a known problem is
not the same as the absence of a problem. That is more honest than "All Systems
Operational" and it is the best status-page framing in this batch.

**Twenty-three components**, all user-facing product names, no infrastructure:
`ClickUp Platform` · `AI Notetaker` · `Automations` · `Brain` · `Calendar` ·
`Chat` · `Clips` · `Comments` · `Dashboards` · `Docs` · `Fields` ·
`Hierarchy` · `Hubs` · `Imports` · `Integrations` · `Notifications` ·
`Public API` · `Search` · `Tasks` · `Templates` · `Views` · `Whiteboards`.

This is the best-calibrated component list of the five. Coda publishes 30+
including AWS sub-services (operator-shaped); Airtable publishes one
(uninformative); ClickUp publishes 23 named by the thing the user would be trying
to do. `Comments` and `Notifications` as separate components from `Tasks` means a
user can tell whether the outage affects their reading or their being told.
`Hierarchy` as a status component is notable — the object model itself can be
degraded.

**Defect:** every component name renders **twice** in the extracted markup
(`### ClickUp Platform` / `### ClickUp Platform`), suggesting a duplicated
heading per row. Screen-reader users may hear each component name twice. Flagged
as suspected.

## T7 Error, failure & recovery

**`Technical Support` is a four-section category and the sections are named by
user intent, not by system** `[observed]`:

`Account Issues` · `Feature requests` · `Report a bug` · `Troubleshooting`.

Putting `Feature requests` inside `Technical Support` is a routing decision:
"the product doesn't do what I need" is treated as adjacent to "the product is
broken". Both are unmet expectations.

**Troubleshooting title grammar — three shapes** `[observed]`:

| Shape | Examples |
|---|---|
| `What is <internal mechanism>?` | `What is view caching?` |
| `Why are my <thing> <adjective>?` | `Why are my Automations slow?` |
| `How to <remedy>` / imperative | `How to hard refresh`, `Clear a browser's cache, cookies, and history`, `Troubleshoot notifications` |
| Symptom as state | `Locked out of ClickUp` |

**`Locked out of ClickUp`** is the best title in the set — a three-word
description of the user's situation, in the user's words, with no system noun.
Its excerpt continues into the user's own voice as a subheading:
"If you can't log in to your ClickUp account, follow the steps in this article.
**I forgot my ClickUp password** Use the following steps if yo…" —
`I forgot my ClickUp password` as a **first-person confession subheading**,
the Wise pattern, present in exactly one place in this harvest.

**`Why are my Automations slow?`** documents an in-product banner rather than
just a cause: "While working in your Workspace, there may be times when you
experience slow loading times. When this happens, **you'll see a banner
message**…". The article tells the user that the system will tell them — so the
banner and the article are designed as a pair. The banner string itself was not
retrievable.

**`What is view caching?`** exposes an internal initiative name to users:
"Views caching, part of our **RapidViews DB initiative**, is the process that we
use to improve the loading times of views in your Workspace…". A named internal
engineering programme surfaced in end-user help. Also note the article title says
`view caching` and the body says `Views caching` — singular/plural drift in the
first two words.

**Bug reporting gets two articles, and the second is instructional**
`[observed]`:

- `Reporting bugs in ClickUp` — "If you're experiencing a bug in ClickUp, you can
  report it directly to our team. Bug reporting information: When you report a
  bug, you'll…"
- `Bug submission tips` — "**We rely on bug reports to improve our product!**
  This article covers tips for screen recording and generating HAR files."

`We rely on bug reports to improve our product!` states the company's dependence
on the user before asking them for work — a reciprocity framing that earns the
subsequent request for a HAR file. Note that ClickUp, like Coda, asks end users
to generate HAR files; both products treat their audience as technical enough.

**Feature requests routed to a named third-party tool** `[observed]`:
`Share your feedback with ClickUp` — "Have an idea for improving ClickUp or some
feedback you want to share? **We use public Canny boards** to capture ideas for
new features an…". Naming the vendor and the fact that the board is *public*
tells the user their request will be visible and votable. Paired with a
`Roadmap` article — "Check out the public-facing ClickUp Roadmap to see what we
plan to focus on for the year!" — so the loop is closed: submit publicly, see the
plan publicly.

**Permission-denied recovery is modelled as a request flow, with three
articles** `[observed]`:

- `Allow requests for full edit permissions` — "Limited members and limited
  members view only can request full edit permissions for locations that have
  been shared with them."
- `Allow requests to upgrade to a member` — "…can request an upgrade to a member.
  This will give them full access to all public items."
- `Manage invite permissions` — "Control who can invite people to your
  Workspace."

The articles are titled from the **admin's** side (`Allow requests…`) while the
body explains the **requester's** action. That is the right choice — the person
who can fix the block is the one who needs the article — and it is the same
instinct as Trello's "contact a Workspace admin", implemented as a feature rather
than as advice.

**Account-level recovery** `[observed]`:
`Change your username, email, and password` · `Locked out of ClickUp` ·
`Consolidate Workspaces` — the last being a human-performed escape hatch:
"Need to move all your data from an existing Workspace to a new one?
**Our team can perform a one-way data migration** from one Workspace to…"
`one-way` is the load-bearing word, disclosed in the description.

**Cross-product migration is a first-class path** `[observed]`:
`How do I import my work into ClickUp?` · `Use the Spreadsheets Importer` ·
`Prepare a spreadsheet for import` · `Import from Slack` —
"Import your Slack channels, users, and communication history when you move to
ClickUp Chat. **Replace Slack and introduce contextual, AI-p…**". The
help centre carries the displacement pitch inside the import article.

`Prepare a spreadsheet for import` is the quietly good one: a **pre-flight
article** whose whole job is preventing the import from failing. Writing the
preparation step as its own document, linked from the import step, is the
transferable move for any data-ingestion flow.

## T8 Empty states

No in-product empty state was directly observable. What is `[observed]` or
inferable:

**ClickUp's answer to the blank workspace is the status-template gallery**
(see T6) plus `Template Everything` — a pricing-table feature name that is
itself a claim: **every object type can be a template.** Supported by
`Create a template` — "Did you create the perfect project plan? Turn it into a
template with timelines, assignees, and key info for next time!" The question
opener (`Did you create the perfect project plan?`) frames templating as
capturing a success rather than filling a void.

`Templates` is also one of the 23 status-page components, so it is
infrastructure-level.

**The 100+ feature list is an anti-empty-state device** `[observed]`. The home
page renders a flat list of ~60 feature names under
"All apps, AI Agents, and humans in ClickUp / 100+ products to replace fragmented
software & maximize human productivity": `Dependencies` · `Connected Search` ·
`Tasks` · `Mind Maps` · `Wikis` · `AI Notetaker` · `Calendar` · `Proofing` ·
`Portfolios` · `Templates` · `Reminders` · `Reporting` · `Goals` · `Projects` ·
`Docs` · `Sprints` · `Custom Status` · `AI Writer` · `API Calls` ·
`Milestones` · `Forms` · `Automations` · `Custom Fields` · `Timesheets` ·
`AI Q&A` · `Priorities` · `Time Estimates` · `Brain` · `Chat` · `Clips` ·
`Everything view` · `Single Sign-on` · `Emails` · `Dashboards` ·
`Time Tracking` · `Kanban Boards` · `Integrations` · `Guests` · `Tags` ·
`24/7 Support` · `Checklists` · `Scheduling` · `Spreadsheets` · `Whiteboards` ·
`Gantt Charts` · `Roadmaps` · `Inbox` · `Teams`.

Note `Custom Status` appears **singular** here and `Custom Statuses` plural in
the pricing table. And `24/7 Support` is listed as a *product* alongside
`Gantt Charts` — a service in a feature list.

The list is a **feature-discovery maximalist strategy**: overwhelm as
reassurance. Its cost is that the new user has no ordering, which is exactly what
`Core ClickUp features` and `Hierarchy best practices` exist to repair (see T4).
The tension between the two is the defining content problem of this product, and
both sides of it are visible in the harvest.

**Documented empty-ish surfaces** `[observed]`:
`What is the Inbox?` — "Open your Inbox to access notifications, get updates,
reply to comments, and take action on reminders or comments you saved for later."
· `My Tasks page (formerly Home)` — "features a canvas that allows you to add
specific cards to see content relevant to you. You can add, reorder, and remove…"
· `Overviews feature availability and limits` — "An Overview is a canvas with
dynamic cards that help organize your high-level Space, Folder, Subfolder, and
Sprint Folder views."

`My Tasks page` and `Overview` are both described as a **`canvas` the user
populates with `cards`** — so the default state is user-assembled, and the empty
state is "you haven't added cards yet". A configurable home page has no canonical
empty state, only an unconfigured one.

**`Save a comment or message for later`** — "Don't have time to reply to a
comment or Chat message? Need to revisit a conversation in the future? Save it
for later!" Two rhetorical questions naming the user's situation, then the
feature. Same construction as `Set your status or mute notifications`. This is a
consistent ClickUp device: **open with the circumstance, not the capability.**

**Status-page null states** `[observed]`: the incident.io page renders a month
calendar with `Loading...` and no per-day "no incidents" strings — so ClickUp's
status page has **no verbose null-state copy** at all, unlike the three
Statuspage instances in this batch. The absence is itself a finding: a calendar
heat-map communicates "nothing happened" visually and needs no sentence.

**Absent** `[absent]`: no observable copy for an empty List, empty Board column,
empty Inbox, zero-result search, empty Dashboard, or first-run Workspace.
An authenticated pass is required.

## T9 Notifications & system messages

**`Notifications` is a status-page component**, a help-article subject, and a
`Smart Notifications` pricing feature — so it is treated as infrastructure,
documentation, and differentiator simultaneously.

**Notification-related articles** `[observed]`:
`Troubleshoot notifications` — "If you aren't receiving the notifications that
you should be, you can use this guide to find a solution. **Why am I not
receiving notifica…**" (a first-person question used as an internal subheading)
· `What is the Inbox?` · `Set your status or mute notifications` ·
`View assigned messages and comments` — "View all of your assigned messages and
comments on one page. The Assigned Comments page has two tabs at the top…" ·
`Schedule comments and emails` · `Save a comment or message for later` ·
`Delegate reminders` · `Assign Comments` · `Schedule Send Comments` ·
`Schedule Send Messages` · `Schedule Send Emails`.

**`Assign Comments`** is the distinctive concept — a comment that is also an
assignment, so a notification carries an obligation rather than information.
Paired with an `Assigned Comments` page and a `View assigned messages and
comments` article. ClickUp models the comment as a work item, which means its
notification copy has to carry accountability. Note the feature is
`Assign Comments` (verb) and the page is `Assigned Comments` (participle) — a
defensible pair.

**`Delegate reminders`** — reminders that can be handed to someone else. A
notification whose recipient is transferable.

**Four separate `Schedule Send` features** in the pricing table
(`Schedule Send Messages`, `Schedule Send Comments`, `Schedule Send Emails`,
plus `Schedule comments and emails` as an article). Send-later implemented per
channel and priced per channel, rather than once.

**Documented banner** `[documented]`: `Why are my Automations slow?` says
"you'll see a banner message" — the string itself not retrievable.

**Status-page subscription** `[observed]`: a single `Subscribe to updates` with
no per-channel scope disclosure (contrast the three Statuspage instances, which
publish different scopes per channel). incident.io's page is sparer, and the
trade-off is that the user cannot learn before subscribing what they will be told.

**AI as a notification producer** `[observed]`, from the home page:
`Ambient Intelligence` — "Brain² surfaces relevant context, related tasks, and
smart suggestions **before you even ask**." And `Ambient Agents` as a named
product. Unprompted notification is branded (`Ambient`) rather than described,
which is a content decision worth noting: the word does the work of explaining
that the system will interrupt you, without using the word "interrupt".

**A notable absence** `[absent]`: no observable email, push, or toast copy, and
no notification-preference vocabulary beyond feature names. `Smart Notifications`
is a pricing-table row with no gloss anywhere in the harvest — the most
consequential notification feature on the page is entirely unexplained.

## T10 Disclosures, legal & compliance

**The strongest section in this file after T6.**

**Plan naming is lower-cased in the cards and title-cased in the table**
`[observed]`. The four pricing cards render as
`free forever` · `unlimited` · `business` · `enterprise`, while the comparison
table header reads `Free Forever` · `Unlimited` · `Business` · `Enterprise`.
**Two casings for four plan names on one page.** The lower-case treatment is
presumably a deliberate typographic style; the table breaks it.

`unlimited` as a *plan name* alongside `Unlimited` as a *feature value* (used
~30 times in the table: `Unlimited Tasks`, `Unlimited Storage`,
`Unlimited Gantt Charts`…) creates a genuine ambiguity — a row reading
"Unlimited / Unlimited / Unlimited / Unlimited" under a column headed
`Unlimited` is not parseable. Recorded as a defect.

**Prices and the annual/monthly frame** `[observed]`:

| Plan | Yearly | Monthly |
|---|---|---|
| `free forever` | Free | Free |
| `unlimited` | `$7` per user/month, billed yearly | `$10` per user/month, billed monthly |
| `business` | `$12` per user/month, billed yearly | `$19` per user/month, billed monthly |
| `enterprise` | `Contact sales` | — |

Toggle label: `Save up to 30% with yearly` with `Monthly` / `Yearly` controls.
`business` carries a `Popular` badge; the AI tier `Everything AI` carries
`RECOMMENDED`. **Two different badge words for the same nudge** on one page.

**A visible interpolation defect** `[observed]`. The extracted card markup reads:

> `free forever yearly price:FreePer user/month, billed yearly`
> `free forever monthly price:FreePer user/month, billed monthly`
> `unlimited yearly price:$7Per user/month, billed yearly`
> `business monthly price:$19Per user/month, billed monthly`

The pattern `<plan> <period> price:` is an **accessible-label prefix rendering
into the text layer** — so a screen reader or text-extraction client receives
"free forever yearly price: Free Per user/month, billed yearly". Both the
monthly and yearly variants are present in the DOM simultaneously (the toggle
hides one visually), which means **assistive-technology users hear both prices
for every plan.** This is the most consequential accessibility defect found in
the batch and it sits on the pricing page.

The Enterprise column compounds it: `Enterprise   enterpriseUser/Month` — the
plan slug leaking into the price cell where a figure should be.

**Every plan's feature list terminates in `and much more...`** `[observed]` —
three of the four (`unlimited`, `business`, `enterprise`). An unresolvable
promise used as a list terminator, three times, on the page whose job is
precision.

**Plan inheritance is stated as an explicit chain** `[observed]`:
`Everything in Free Forever, plus:` → `Everything in Unlimited, plus:` →
`Everything in Business, plus:`. Consistent, and it means each card only has to
carry its delta.

**Quota disclosures attach a dollar value to the allowance** `[observed]`:
`5K Automations Per Month` + `$100 in value` (Business);
`250K Automations Per Month` + `$750 in value` (Enterprise).

Monetising a quota so the buyer can price the tier difference is a real
technique. It also implies an automation unit price the page never states.

**Automation limits stated as three numbers per plan** `[observed]`:
Free — "5 Active Rules, 100 Automation executions, Multiple Actions &
Conditions"; Unlimited — "500 Active Rules, 1,000 Automation executions";
Business — "Unlimited Active Rules, 5,000 Automation executions";
Enterprise — "Unlimited Active Rules, 250,000 Automation executions".

Two distinct metered units (`Active Rules` and `Automation executions`) named and
bounded separately, so a user can tell whether they are limited by *how many
automations they have* or *how often they run*. That distinction is exactly what
quota copy usually collapses.

**`Trial` as a table cell value, used ~25 times** `[observed]`. In ClickUp's
comparison table, `Trial` occupies the cell where a checkmark or a limit would
go, meaning "available temporarily on this plan". It is never glossed on the
page. A user reading `Gantt: Trial` in the Free column cannot tell the duration,
the trigger, or what happens at expiry. **Recorded as a significant disclosure
gap** — an undefined term used two dozen times on a pricing page.

**Granular per-plan limits published as integers** `[observed]`:
`Spaces` 5 / Unlimited / Unlimited / Unlimited · `Lists/Space` 40 / 200 / 400 /
1000 · `Folders/Space` 100 / 200 / 400 / Unlimited · `File Storage` 60MB /
Unlimited · `Whiteboards` 3 / 10 · `Wiki` 1 / 1 / 1 · `Form` 1 ·
`Teams` 2 / 3 / 10 · `Message History` 30 days / Unlimited ·
`Activity` 1 day / 7 days · `Pulse: Live Overview` 1 day / 1 day / 7 days /
30 days · `API Calls` 100/minute (three plans) / 10,000/minute (Enterprise).

`60MB Storage` on the Free plan is startlingly small and is stated plainly in the
card's `Key Features` list rather than buried — the constraint disclosed as a
feature.

Note `Folders/Space` is **100 on Free and 200 on Unlimited** while
`Lists/Space` is 40 on Free — so the free tier permits more folders than lists,
which reads as a data-entry error rather than a design. Flagged as suspected.

**Free-plan guest restriction stated as a sentence in a cell** `[observed]`:
`Guests` → "Guests must be given full access (no permissions)". A security-
relevant limitation written as prose inside a comparison table — awkward
formatting, correct instinct, and the parenthetical does the real work.

**The AI pricing tier set is separate and separately headlined** `[observed]`:

| Tier | Price | Framing heading |
|---|---|---|
| `Free Forever` | Free | `START USING AI` |
| `Brain AI` | `$9` per user/month | `HIGHLIGHTS` |
| `Everything AI` | `$28` per user/month | `BEST FOR FULL AGENTIC SUITE` |
| `AI Super Credits` | `$0.001` / `$10 per 10,000 credits` | — |

Toggle: `Save up to 20% with yearly` (vs 30% on the core plans — two different
discount rates on one page, correctly distinguished).

`Everything AI` at `$28` is **more than twice the `business` plan at `$12`** —
the AI add-on costs more than the product. Stated plainly, without hedging.

**The credit model is explained in five sentences** `[observed]`:

> "Every AI plan includes a monthly credit allowance shared across your
> Workspace. Credits fuel Super Agents, AI Fields, Automations, Image
> Generation, and more. **Usage varies by complexity.** Add more anytime."

`shared across your Workspace` (the pooling rule), `Credits fuel X, Y, Z` (what
consumes them), **`Usage varies by complexity`** (the honest admission that the
user cannot predict consumption), `Add more anytime` (the escape valve). Four
facts a metered-credit buyer needs, in four clauses. `Usage varies by complexity`
is the one most products omit.

Credit allowances stated per tier: `+1,500 AI Super Credits` and
`+5,000 AI Super Credits`, both annotated **`user / mo`** — and the Brain AI tier
says "for Agents, Automations, & more" while Everything AI says
"for Super Agents". Different scopes for the same credit unit, stated
tersely.

**`Super Fair Billing policy` — the standout disclosure in this file**
`[observed]`:

> `When we optimize, you save $`
>
> "When our teams save on AI costs, we pass them onto you. When sudden increases
> in AI costs occur, we subsidize the cost. If AI providers raise rates, we'll
> adjust pricing gradually and transparently, while continuing to optimize
> wherever possible."

Three conditional commitments covering the three directions AI costs can move:
down (passed on), spiking (absorbed), sustained increase (passed on
*gradually and transparently*). It is a **pricing-governance statement**, not a
price — and it addresses the specific anxiety of buying a product whose unit
costs are volatile and outside the vendor's control.

The third clause is the honest one: ClickUp does *not* promise never to raise
prices; it promises the manner of the rise. That is a commitment a company can
keep, which is why it is worth more than a price freeze. Directly comparable to
Wise's `When do price changes apply to me?` and stronger, because it states the
policy rather than just documenting the mechanism.

The heading `When we optimize, you save $` uses a bare currency symbol as a
noun — informal in a way the paragraph below is not.

**Other pricing-governance copy** `[observed]`:
`100% Money-back Guarantee` (rendered twice, no terms stated on the page) ·
`* Usage subject to our fair use policy` (footnote on
`Unlimited Image Generation`, linking to `/terms/ai`) ·
`CLICKUP ASSIST` — "Live training and support for AI… 2 hours of 1:1 expert
time/month". A services add-on quantified in hours.

Note the asterisk: `Unlimited Image Generation *` — the word "Unlimited" with a
fair-use footnote attached. The bound travels with the claim, as at Airtable,
but here the bound is a policy link rather than a number.

**Compliance presented as a persistent footer strip** `[observed]`, on every
page: `SOC 2 CERTIFIED` · `ISO 27001 CERTIFIED` · `GDPR COMPLIANT` ·
`HIPAA COMPLIANT`, each as a badge with the standard name and the status word on
separate lines. Repeated in the home page's trust block. The
`CERTIFIED` / `COMPLIANT` distinction is maintained correctly across all four
(you are certified against SOC 2 and ISO, compliant with GDPR and HIPAA).

Enterprise-row disclosures: `MSA & HIPAA Available` (not "included" —
`Available` is doing careful work), `Data Residency`,
`US, EU & APAC Data Residency`, `HIPAA Compliance → Contact Sales`,
`Contract and Legal Review → Contact Sales`.

**Pricing FAQ — 6 visible questions plus `Load more`** `[observed]`, intro:
"Find answers to your questions right here, and don't hesitate to Contact us if
you couldn't find what you're looking for."

| # | Question (verbatim) | Answer |
|---|---|---|
| 1 | Can I upgrade myself or do I have to upgrade my entire Workspace? | "To upgrade ClickUp, you'll need to upgrade your entire Workspace, which means all members in your Workspace." |
| 2 | What payment methods do you accept? | *collapsed* |
| 3 | What is your refund policy? | *collapsed* |
| 4 | How am I billed when I add paid users to a Workspace? | *collapsed* |
| 5 | What if I have multiple Workspaces? | *collapsed* |
| 6 | What happens if I cancel? | *collapsed* |

Only Q1's answer was in server HTML. It is worth quoting because it is a
**flat refusal delivered without softening**: you cannot upgrade alone, and the
consequence is restated in plain terms ("which means all members in your
Workspace"). No "unfortunately", no workaround, no apology. The restatement
clause is the courtesy.

Q1 is also the **highest-placed question**, ahead of payment methods and refunds
— so ClickUp knows the all-or-nothing upgrade is the first objection. Placing the
most unwelcome answer first is a confidence signal of the same kind as Trello
putting cancellation fourth of eight.

## T11 Help-centre architecture

**Platform**: Zendesk, custom-themed. Structure: index → category → section →
(sub-section) → article. Six locales.

**The index is search-first and AI-framed** `[observed]`:
`How can we help?` → `Search` → placeholder **`Ask me anything`** →
`Categories` (9) → `Most viewed articles` (15, each with a ~150-character
excerpt and a `View article` link).

`Ask me anything` as the search placeholder is the notable choice. It sets the
expectation of a conversational answer rather than a list of documents, and it
is the only AI-native help-search framing in this batch.

**`Most viewed articles` is unusually long — fifteen entries with excerpts** —
and the composition is a demand signal worth recording:

`Use the ClickUp desktop app` · `Export List and Table views` ·
`Set up your individual Workspace` · `Set up your team's Workspace` ·
`Intro to pricing` · `Invite people to your Workspace` ·
`Guest-type user roles` · `Manage task statuses` ·
`What is ClickUp Brain AI?` · `My Tasks page (formerly Home)` ·
`Create a template` · `Intro to time tracking` · `What is Chat?` ·
`Google Calendar integration` · `Intro to the integration with Slack`

Four of fifteen are about **people and permissions**
(`Set up your team's Workspace`, `Invite people`, `Guest-type user roles`, plus
`Intro to pricing` which is billing-by-seat). Two are about **getting data out**
(`Export List and Table views`, `Create a template`). Two are **"what is this
new thing"** (`What is ClickUp Brain AI?`, `What is Chat?`). The most-viewed list
is dominated by setup, seats, and export — not by the 100+ features. Same
divergence between the marketed narrative and actual demand observed at Airtable.

**`Promoted article` is a visible badge** `[observed]`, appearing on five
articles inside `Get started`. Editorial promotion surfaced as a label rather
than just as ordering — the user can see that the placement is curated.

**Article-title grammar — five shapes, and the first is a strong house
convention** `[observed]`:

| Shape | Examples |
|---|---|
| `Intro to <thing>` (dominant) | `Intro to ClickUp`, `Intro to pricing`, `Intro to comments`, `Intro to subtasks`, `Intro to the Hierarchy`, `Intro to views`, `Intro to profiles`, `Intro to time tracking`, `Intro to timesheets`, `Intro to ClickUp 4.0`, `Intro to the integration with Slack`, `Intro to ClickUp best practices` |
| `What is/are <thing>?` | `What is Talk to Text?`, `What is Meetings Hub?`, `What are Hubs?`, `What is the Inbox?`, `What is Chat?`, `What is view caching?`, `What is your Organizational Chart?`, `What is ClickUp Brain AI?` |
| Imperative + object | `Manage task statuses`, `Invite people to your Workspace`, `Create a template`, `Set permissions on individual locations`, `Consolidate Workspaces` |
| `<Feature> feature availability and limits` | six-plus instances (see T5) |
| `How to <task>` / `How do I <task>?` | `How to hard refresh`, `How to track marketing OKRs`, `How do I import my work into ClickUp?` |

**`Intro to X` is the best-executed title convention in this batch** — twelve
observed instances, applied consistently to concepts, features, integrations, and
even to a version number and to the meta-topic of best practices. `Intro to the
Hierarchy` and `Intro to pricing` sit in the same series, which tells the user
that both are foundational rather than reference. The convention also
**disambiguates from the `What is X?` series**: `Intro to` for things you will
learn to use, `What is` for things you need identified. That split holds across
all twenty observed instances, with one exception (`What is view caching?`, which
is an internal mechanism and belongs to neither).

**Two title devices worth singling out.** `My Tasks page (formerly Home)`
carries a **rename in a parenthetical inside the title** — the best-placed
terminology migration in this harvest, because a user searching "Home" finds the
article that explains it is now called something else. Compare Coda's
`relation columns (formerly Lookups)`, same technique, and Trello's `Butler`
drift, which has no such marker.

And `What's the difference between public and internal links?` —
"ClickUp uses two types of links: public links and internal links. Knowing the
difference helps you share the right link and troubleshoo…". A
`What's the difference between X and Y?` title for a confusable pair, with the
*consequence of confusing them* stated in the first sentence. Same job as Coda's
`How is a table different from a grid?`

**Sections are named by object or by activity, inconsistently** `[observed]`:
`Tasks` / `Subtasks` / `Views` / `Workspaces` / `Spaces` / `Folders` / `Lists`
(objects) beside `Navigating ClickUp` / `Communicating in ClickUp` (gerund
activities) beside `Owners and Admins` / `User roles and permissions` (roles)
beside `Best practices` / `Use cases` (content types). Four axes at one level,
the same sprawl recorded at Trello.

`Teams (User Groups)` carries a **parenthetical gloss in the section name** —
because `Teams` is ambiguous (ClickUp's own competitor list includes
`vs Microsoft Teams`, and `Team` is also a view type). Disambiguating a section
name in parentheses is defensible; needing to is a symptom.

**Localisation is where the help centre reveals the most** `[observed]`. The
switcher offers `Deutsch` · `Español` · `Español (Latinoamérica)` ·
`Français (France)` · `Italiano` · `Português do Brasil`, and the return-URLs
expose the **translated category slugs for `Get started`**:

| Locale | Translated slug |
|---|---|
| de | `Erste-Schritte` ("first steps") |
| es | `Incorporación` ("onboarding/incorporation") |
| es-419 | `Incorporación` |
| fr-FR | `Intégration` ("integration/onboarding") |
| it | `Onboarding` (**English retained**) |
| pt-BR | `Comece-agora` ("start now") |

**Six locales, five different translation strategies for one category name.**
German localises literally to a journey metaphor; Spanish and French both use
HR-flavoured abstractions (`Incorporación`, `Intégration` — the words for
employee onboarding, which is a different concept from product onboarding and in
French collides with technical *integration*); Italian gives up and keeps the
English loanword; Brazilian Portuguese converts it to an imperative CTA.

This is a genuinely useful localisation exhibit. The English source
`Get started` is a **verb phrase**, and only the Portuguese preserved that part
of speech. The others chose nouns, and two of those nouns carry unintended
domain meaning. Worth recording for any localisation programme: an imperative
source string will drift to a noun in Romance languages unless the source is
flagged as a CTA.

`Technical Support` fares better — `Technischer Support` / `Soporte técnico` /
`Assistance technique` / `Supporto tecnico` / `Suporte Técnico` — all five
localise consistently, because the source is a noun phrase with cognates.

**Routing furniture** `[observed]`: header carries `API & MCP` (to a separate
developer domain), `Status:` (to the status page — note the **stranded colon**,
evidently a label whose value failed to render, a defect), and `My Tickets`.
Footer: `Go to ClickUp`, locale switcher, social links. Article foot behaviour
not observable. `See all N articles` closes each section with the count inline.

`Status:` with a dangling colon in the help-centre header is a small but telling
defect — it looks like a live status indicator whose value is missing.

## T12 FAQs

**One FAQ surface, largely collapsed.**

### Pricing FAQ — 6 visible + `Load more` `[observed]`

Covered in full in T10. Placement: foot of the pricing page, under
`Frequently asked questions`, with an intro line that routes onward:
"Find answers to your questions right here, and don't hesitate to
[Contact us] if you couldn't find what you're looking for." — and a second,
bolded `Contact us` immediately below it, so the same escape hatch renders twice.

Only Q1's answer is in server HTML; the other five are accordion-collapsed and
client-rendered. Questions verbatim:

1. `Can I upgrade myself or do I have to upgrade my entire Workspace?`
2. `What payment methods do you accept?`
3. `What is your refund policy?`
4. `How am I billed when I add paid users to a Workspace?`
5. `What if I have multiple Workspaces?`
6. `What happens if I cancel?`

**Structural notes.** All six are first-person user questions, and **four of six
are about the seat/Workspace boundary** (1, 4, 5, and implicitly 6). The
Workspace-as-billing-unit is evidently the dominant confusion, and the FAQ is
almost entirely dedicated to it rather than to features or security.

Q1's shape is a **disjunctive question** (`Can I X or do I have to Y?`) — the
user pre-supplies both possibilities, and the answer only has to pick one. That
is the most efficient FAQ construction for a binary policy, and ClickUp uses it
in the highest slot.

Q5 (`What if I have multiple Workspaces?`) is an elliptical question with no
verb — the shortest form of "what are the consequences for my situation". Q6
(`What happens if I cancel?`) is the standard exit question, placed last.

Note the absence: **no security, privacy, AI-data, or credit-consumption
question**, despite the page selling a $28/user AI tier metered in credits whose
"usage varies by complexity". The `Super Fair Billing policy` block does some of
that work in prose, but no FAQ slot addresses "how many credits will I actually
use?" — the question a buyer of a metered product will most want answered.

### In-article FAQs `[absent]`

None observable, because article bodies were client-rendered. Several article
excerpts contain question-shaped subheadings
(`I forgot my ClickUp password`, `Why am I not receiving notifica…`,
`What's the difference bet…` inside `Subtasks in Multiple Lists FAQ`), and one
article is titled `Subtasks in Multiple Lists FAQ`, so in-article FAQ blocks
exist but their contents were not retrieved.

### Trust/security FAQ `[absent]`

No trust-centre page was fetched. Compliance is communicated via footer badges
and pricing-table rows rather than a dedicated FAQ on the pages harvested.

## T13 Terminology & glossary

**No public glossary article was located** `[absent]` for a consolidated
glossary. Terms below are assembled from the pricing table, help-centre titles
and excerpts, and feature pages.

**`The Hierarchy` — the most consequential terminology decision in this file**
`[observed]`. ClickUp names its own object model with a capitalised proper noun,
gives it a help section, and gives that section an intro article:

> `Intro to the Hierarchy` — "Organize all Workspace items, like tasks and Docs,
> into these Hierarchy locations. **This core structure is the key to easily
> managing al…**"

The containers, in order: `Workspace` → `Space` → `Folder` → `Subfolder` →
`List` → `Task` → `Subtask`. Plus `Sprint Folder` as a specialised Folder.

Three observations. **Seven levels is the deepest container model of the five
products** (Trello: Workspace/Board/List/Card; Airtable: Workspace/Base/Table/
Record; Coda: Workspace/Doc/Page/Table/Row). Naming the whole thing
`The Hierarchy` is the copy solution to that depth — it converts an intimidating
nesting structure into a single learnable noun, which the user can then be
taught once. `Hierarchy locations` is the collective term for the containers, and
`Hierarchy best practices` is a whole article about how to use them.

Second, `Hierarchy` is also a **status-page component** — the object model can be
degraded independently of Tasks. That is unusual and it confirms the concept is
infrastructure, not just vocabulary.

Third, the names are all generic English nouns (`Space`, `Folder`, `List`) with
no coinage, which is a deliberate contrast with the AI layer's heavy coinage.
Containers are familiar; intelligence is branded.

**Core objects and surfaces**

| Term | ClickUp's usage | The alternative it rejected |
|---|---|---|
| `Workspace` | Top container; **the billing unit** ("upgrade your entire Workspace") | "Organization", "Account" |
| `Space` | Second level; 5 on Free | "Team", "Department" |
| `Folder` / `Subfolder` | Third and fourth levels | "Project", "Group" |
| `List` | Fifth level, holds tasks | "Board", "Project" |
| `Task` / `Subtask` | The work atom and its child | "Issue", "Item", "Card" |
| `Hub` | "structured pages that let you centralize, organize, find, and take action on items" — plus `Meetings Hub`, `Teams Hub`, `Docs Home` | "Dashboard", "Home", "Portal" |
| `Overview` | "a canvas with dynamic cards" for Space/Folder/Sprint views | "Summary", "Dashboard" |
| `canvas` | The card-assembly surface on `My Tasks` and `Overview` | — **same coinage as Coda, different meaning** |
| `card` | A dashboard/overview widget — **not a task** | "Widget", "Tile" |
| `ClickApp` | A toggleable feature module (`Work in Progress Limits ClickApp`) | "Add-on", "Power-Up", "Extension", "Pack" |
| `Everything view` / `Everything` | A cross-Hierarchy aggregate view | "All tasks", "Global view" |
| `Pulse` | "Pulse: Live Overview" — a real-time activity feed | "Activity", "Live" |
| `Clip` | In-app screen recording | "Video", "Recording", "Loom" |
| `Proofing` | Image/video/PDF annotation | "Markup", "Review" |
| `Portfolio` | Cross-project rollup | "Program", "Roadmap" |
| `Goal` / `Goals Folder` / `Key Results` | OKR objects | "Objective", "Target" |
| `Doc` / `Wiki` | Two named document types, priced separately (`1 Wiki` on three plans) | — the distinction is unexplained in the harvest |

**`card` is a live collision.** In ClickUp a `card` is a dashboard widget
(`dynamic cards`, `Advanced Cards`, `Cards feature availability and limits`),
while in Trello — and in the Kanban convention ClickUp's own `Board view`
implements — a `card` is a task. A user arriving from Trello will read
`add specific cards to see content relevant to you` as being about tasks. The
harvest contains no disambiguating article. Recorded as the clearest
terminology risk in this file.

**`ClickApp`** is the notable coinage: a branded morpheme
(`Click` + `App`) for a feature toggle. It appears in the help-centre category
name (`Features and ClickApps`) and in feature names (`Work in Progress Limits
ClickApp`). The word does useful work — it tells the user these are optional,
per-Space switches rather than always-on features — but it is nowhere defined in
the pages harvested, and the category name pairs it with the plain word
`Features` as if the two were different things without saying how.

**User roles — six named levels plus a custom tier** `[observed]`:
`owner` · `admin` · `member` · `limited member` ·
`limited member view only` · `guest`, plus `Custom Roles` and
`Default user role permissions`. Article set:
`Owner, admin, and member-type user roles` · `Guest-type user roles` ·
`Manage individual permissions for view only users` ·
`Default user role permissions`.

The **`-type` suffix** (`member-type user roles`, `Guest-type user roles`) is a
taxonomic device: it groups roles into families so the two articles can each
cover a cluster. `limited members view only` is the awkward one — four words,
pluralised inconsistently across sources (`limited members view only` /
`view only users`), and it names a role by double restriction. Compare Airtable's
five clean levels, each defined with a `but not` clause; ClickUp has six levels
and no observable parallel definition frame.

**The AI layer is where all the coinage lives** `[observed]`:

`Brain` · `Brain AI` · `ClickUp Brain AI` · `Brain²` · `Brain 2` ·
`Brain MAX` · `Super Agents` · `Ambient Agents` · `Ambient Answers` ·
`Ambient Intelligence` · `AI Notetaker` · `Enterprise Search` ·
`Talk to Text` · `AI Fields` · `AI Writer` · `AI Q&A` · `AI Super Credits` ·
`Deep Search` · `Multiplayer AI` · `ClickUp Certified Agents` ·
`ClickUp Assist` · `AI Assign & Prioritize`.

**`Brain` has six live surface forms** — `Brain`, `Brain AI`,
`ClickUp Brain AI`, `Brain²` (superscript), `Brain 2`, `Brain MAX` — across the
home page, the nav, the footer, the pricing page, and the help centre. `Brain²`
uses a **typographic superscript as part of a product name**, which cannot be
typed, spoken unambiguously, or searched for. The help centre calls it
`ClickUp Brain AI`; the home page calls it `Brain²`; the footer calls it `Brain`;
the pricing tier is `Brain AI`. Recorded as the most severe naming drift in this
file.

**Twenty-one named agents, each with a verb-phrase job description**
`[observed]` — the richest coined-term set in the batch:

| Agent | Stated job |
|---|---|
| `Intake Agent` | "standardizes project kickoff" |
| `Assign Agent` | "determines task owners" |
| `PM Agent` | "tracks deliverables + timelines" |
| `Live Answers Agent` | "keeps everyone informed" |
| `Brief Agent` | "creates campaign briefs" |
| `Content Agent` | "drafts promo copy" |
| `Brand Agent` | "applies guidelines" |
| `Live Intel Agent` | "updates core docs" / "identifies redundancies" |
| `PRD Agent` | "creates docs from voice notes" |
| `Triage Agent` | "prioritizes bugs" |
| `Codegen Agent` | "produces quality code" |
| `Assets Agent` | "tracks inventory" |
| `RFP Agent` | "manages reqs docs" |
| `Contracts Agent` | "standardizes terms" |
| `Onboarding Agent` | "monitors progress + feedback" |
| `Pulse Check Agent` | "collects employee sentiment" |
| `Trainer Agent` | "analyzes course performance" |
| `Goal Reminder Agent` | "removes tedious check-insvisibility" |
| `Alignment Agent` | "ensures cross-functional cohesion" |
| `Key Results Agent` | "suggest relevant KPIs" |
| `Status Update Agent` | "gives always-on visibility" |

The naming convention is rigid and effective: **`<Domain noun> Agent` +
third-person-singular verb + object.** Twenty-one instances, one pattern. It
makes an unbounded capability (an LLM) legible as a bounded set of colleagues,
and the verb phrases read like job descriptions rather than feature descriptions.
This is the clearest answer in the batch to the problem of naming agentic AI:
give each agent a domain, a name ending in `Agent`, and one job stated as a verb.

Defects inside the set: `Key Results Agent suggest relevant KPIs`
(subject-verb agreement), `Live Intel Agent` given two different jobs in two
blocks, `RFP Agent manages reqs docs` (`reqs` is unexpanded internal shorthand),
and `Goal Reminder Agent removes tedious check-insvisibility` — a missing space
and an orphaned word, apparently two strings concatenated.

`Live Answers Agent` appears in three of the six solution blocks with identical
copy ("keeps everyone informed"), so the agent roster is partly shared and
partly per-vertical, without saying which.

**Coined problem-nouns** `[observed]`: `Work Sprawl` (capitalised, the enemy) ·
`Convergence` / `Convergence powerhouse` (the category) ·
`RapidViews DB initiative` (an internal engineering programme name leaked into
user help) · `view caching` / `Views caching` (drift within one article).

**Register split between layers.** The container vocabulary is plain English
(`Space`, `Folder`, `List`, `Task`). The feature vocabulary is `Custom X` eleven
times. The AI vocabulary is dense coinage with superlative modifiers (`Super`,
`MAX`, `Ambient`, `Infinite`, `Multiplayer`). Three registers stacked in one
product, and the AI register is the one drifting.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout help copy
("your Workspace", "you'll see a banner message", "you can report it directly").
First person plural for the company, used freely and often in commitments:
"**We** highly recommend using custom statuses", "**We** rely on bug reports to
improve our product!", "**We** use public Canny boards",
"**Our** team can perform a one-way data migration", "When **we** optimize, you
save $", "**We're** not aware of any issues affecting our systems",
"**Our** agreements ensure zero data training & retention".

ClickUp is the most first-person-plural product in this batch, and it uses that
voice where it matters most — for recommendations, for dependencies on the user,
and for pricing commitments.

**Register — a steep split between marketing and help.**

| Surface | Register markers |
|---|---|
| Home page | `infinite productivity`, `perfect context`, `Nothing comes close`, `500+ tool superpowers`, `Work Sprawl is killing context`, `Get 400% more done`, `It's like adding 15 full-time employees`, `Software to replace all software` |
| Pricing | `The best work solution, for the best price.`, `The world's most advanced AI for work`, `Super Fair Billing policy`, `100% Money-back Guarantee` |
| Help centre | Flat, second person, situation-first, low exclamation density |
| Status page | First person plural, hedged (`We're not aware of any issues`) |

The marketing register is the most superlative-dense in the batch — at least
eight unqualified absolutes on the home page (`all software`, `infinite`,
`perfect`, `Nothing comes close`, `The only AI that actually knows your work`,
`world's most advanced`, `Enterprise-grade everything`, `every time`). Against
that, the two places where a claim could be legally or commercially costly —
the AI privacy claim and the AI billing policy — are **carefully footnoted and
carefully conditional.** So the tone flattens where liability rises, not where
user stakes rise. That is a defensible commercial posture and a recordable
difference from Wise, where tone flattens with *user* stakes.

**The help centre's signature device: open with the situation** `[observed]`.
Three clear instances:

- `Set your status or mute notifications` — "Are you at a doctor's appointment,
  lunch, out of office, or on vacation? Or do you need to focus for a few hours?"
- `Save a comment or message for later` — "Don't have time to reply to a comment
  or Chat message? Need to revisit a conversation in the future?"
- `Create a template` — "Did you create the perfect project plan?"
- `Remap subtask due dates using task templates` — "Do you use task templates and
  need to update your tasks' and subtasks' dates?"

Each opens with one or two questions describing the user's circumstance, then
names the feature. It is the same instinct as Coda's rhetorical questions, but
aimed at *situations* rather than *concepts*. For a product with 100+ features,
opening each article with "here is when you would want this" is a
feature-discovery mechanism disguised as tone. **Directly transferable to any
product whose feature surface exceeds what a user can browse.**

**Exclamation marks are rationed and placed** `[observed]`: they appear in
onboarding encouragement (`set up for success!`, `learning these core features!`,
`for next time!`, `animate your messages!`), in a reciprocity statement
(`We rely on bug reports to improve our product!`), and in acquisition CTAs
(`It's FREE!`). They are absent from troubleshooting, permissions, and billing
copy. That is a coherent policy, inconsistently applied only in the CTA set
(`It's FREE` and `It's FREE!` both live).

**Typographic tics** `[observed]`: `+` used as a conjunction in body copy
(`deliverables + timelines`, `vendors + budgeting`, `Detect + resolve`,
`contracts + procurement`, `Identify + resolve bugs`, `progress + feedback`) —
at least eight instances. It saves a character and costs screen-reader clarity
(`plus` read aloud mid-phrase). Also `&` used in headings and feature names
(`AI & integrations`, `Goals & Portfolio Management`, `zero data training &
retention`) alongside spelled-out `and` elsewhere.

**Numbers as trust devices** `[observed]`: `100+ products`, `100+ awards`,
`5+ million teams`, `85% of Fortune 500`, `3M+ tasks automated`,
`400% more done`, `384% ROI`, `$3.9M`, `92,400 hours`, `30k hours`, `<6 mo`,
`60% of work is lost`, `4.7/5 by 10,000+ users on G2`, `4.6 stars / 25,000+
reviews`, `500+ tool superpowers`, `15 full-time employees`, `20 more`,
`50+ Native Integrations`, `600+`… The density is the highest in the batch, and
two pairs conflict: `4.7/5 by 10,000+ users` (home page) vs
`4.6 stars / 25,000+ reviews` (feature page), and `92,400 hours` vs
`over 30k hours per year`. **Two ratings and two hours figures, unreconciled.**

**Accessibility content** `[absent]` — **no accessibility statement, VPAT
reference, or accessibility page was located** on any surface harvested, and none
appears in the footer, which carries `Status` · `Security` · `Privacy` ·
`Terms` · `Cookie Preferences`. Trello links `Accessibility` from every help
page; Airtable and Coda each publish dedicated statements. ClickUp's footer does
not. Recorded as a gap rather than a confirmed absence — no site-wide search was
run for one.

**Accessibility observations from the markup** `[observed]`

- `Skip to main content` present on `help.clickup.com` (target `#page-container`).
  **No skip link was observed on `clickup.com`** — flagged as suspected.
- Help-centre article images and marketing imagery: alt text largely **absent or
  empty**. Where alt exists on the feature page it is a **filename-style slug** —
  `marketing-content`, `marketing-advertising`, `development-sprint`,
  `operations-ecommerce`, `personal-job-hunt`, `other-crm`, `status change`,
  `custom-big.png`, `board-view-cover-image.png`. These are the *images that
  contain the actual status names*, so a screen-reader user gets
  `personal-job-hunt` where a sighted user reads a full status sequence.
  **The entire status-template gallery is inaccessible**, and the alt text is
  asset-management metadata rather than description. This is the single worst
  accessibility finding in the batch.
- `4.6 stars` is correctly used as alt on the rating image — one good instance.
- **The pricing-page interpolation leak** (see T10) means assistive-technology
  users receive both monthly and yearly prices for every plan, prefixed by
  machine labels (`free forever yearly price:`), plus
  `Enterprise enterpriseUser/Month` where a price should be.
- Status-page component names render **twice each** in the text layer.
- The hero headline does not parse as a sentence in its static state.
- `Status:` in the help header renders with a dangling colon and no value.
- The `+`-as-conjunction and `&`-in-prose habits degrade spoken output.

**Localisation findings** — see T11. Six locales; five translation strategies for
one category name; `Onboarding` left in English for Italian.

**Negative findings, recorded honestly**

- Hero headline `The Best AI is` / `Software to replace all software` does not
  parse as a sentence in its static/no-JS state
- **Pricing-page accessible-label leak**: `free forever yearly price:Free…`,
  `unlimited yearly price:$7…` rendering into the text layer, with both monthly
  and yearly variants present simultaneously
- `Enterprise   enterpriseUser/Month` — plan slug in a price cell
- Plan names lower-cased in cards (`free forever`, `unlimited`, `business`,
  `enterprise`) and title-cased in the comparison table
- `Unlimited` used as both a plan name and a feature value ~30 times in one table
- `Trial` used as an unglossed cell value ~25 times on the pricing page
- `and much more...` terminating three of four plan feature lists
- Two badge words for one nudge: `Popular` (business) and `RECOMMENDED`
  (Everything AI)
- `Custom Field Manager Basic` and `Custom Field Manager Advanced` duplicated as
  rows in two different table sections
- `Folders/Space` 100 on Free vs `Lists/Space` 40 on Free — free tier permits
  more folders than lists (suspected data error)
- Five signup CTA labels (`Get started. It's FREE`, `Get started. It's FREE!`,
  `Get started`, `Get Started`, `Get started FREE`) plus nav `Sign Up`
- Three demo CTA labels (`Get a Demo`, `Get a custom demo`, `Book a demo`)
- `Learn More` / `Learn more` and `Read More` / `Read more` — both casings each
- `Build the process that power your people` — subject-verb disagreement in a
  production headline
- `Close the strategy- execution gap` — stranded hyphen before a space
- `Key Results Agent suggest relevant KPIs` — subject-verb disagreement
- `Goal Reminder Agent removes tedious check-insvisibility` — missing space,
  orphaned word
- `RFP Agent manages reqs docs` — unexpanded internal shorthand
- `Live Intel Agent` given two different job descriptions in two blocks
- `Brain` has six live forms: `Brain`, `Brain AI`, `ClickUp Brain AI`, `Brain²`,
  `Brain 2`, `Brain MAX`; `Brain²` uses an untypeable superscript
- `Custom Status` (singular, home page) vs `Custom Statuses` (plural, pricing)
- `view caching` (title) vs `Views caching` (body) in one article
- `card` means a dashboard widget in ClickUp and a task in the Kanban convention
  its own Board view implements — no disambiguating article found
- `ClickApp` used in a category name and feature names but nowhere defined
- Two conflicting G2 figures (`4.7/5 by 10,000+` vs `4.6 stars / 25,000+`) and
  two conflicting hours figures (`92,400 hours` vs `over 30k hours per year`)
- `Status:` in the help-centre header renders with a dangling colon, no value
- `Get Started` appears in title case inside body copy on the
  `Freelancing` status-template description
- Status-page component names render twice each
- `Play Video` and `Delegate any task` each render twice in the DOM
- Alt text on the status-template gallery is filename-slug metadata
  (`personal-job-hunt`, `other-crm`), making the status vocabulary inaccessible
- No accessibility statement or VPAT reference located; `Accessibility` absent
  from the footer
- No skip link observed on `clickup.com` (suspected)
- `Roadmap` links to a `dev-doc.clickup.com` subdomain
- `100% Money-back Guarantee` stated twice with no terms on the page
- `Smart Notifications` appears as a priced feature with no gloss anywhere

---

## Transferable patterns

1. **Ship an opinion about how to model work, with a reason.** "We highly
   recommend using custom statuses in ClickUp. The reality is almost all tasks at
   least have three stages." A prescriptive recommendation, justified by a hedged
   empirical claim. Condition: requires enough domain confidence to be wrong
   sometimes. Applies to any configurable product where flexibility creates a
   blank-page problem.
2. **Name the binary mode as a first-class concept, not a degenerate case.**
   `Simple` statuses and `Custom` statuses, each with a named audience
   ("great for personal projects" / "give advanced users a customized workflow").
   Labelling the simple path prevents new users from feeling they are using the
   product wrong.
3. **Ship a status-template gallery whose descriptions name the outcome
   protected, not the statuses.** `Content` → "approved by the team before
   publication"; `Enterprise` → "nothing slips through the cracks". Fifteen
   worked status sequences, sold as guarantees. The single most reusable artefact
   in this harvest for anyone designing state vocabulary.
4. **Restate the core noun's domain meaning when a template changes it.**
   "Tasks represent orders" in the E-Commerce status template. One clause that
   lets a general-purpose object serve a specific workflow.
5. **Open help articles with the user's situation, not the capability.**
   "Are you at a doctor's appointment, lunch, out of office, or on vacation?"
   before naming the presence setting. For any product whose feature surface
   exceeds browsability, situation-first openers are a discovery mechanism that
   also reads as good tone.
6. **Publish a pricing-governance policy covering all three cost directions.**
   The `Super Fair Billing policy`: savings passed on, spikes absorbed, sustained
   rises passed on *gradually and transparently*. It commits to the *manner* of a
   price rise rather than promising none — a keepable promise. Essential for any
   product with volatile third-party unit costs.
7. **Admit that metered usage is unpredictable.** "Usage varies by complexity."
   Four words inside a credit-model explanation, doing more for trust than any
   calculator.
8. **Hedge the status page epistemically.** "We're not aware of any issues
   affecting our systems." beats "All Systems Operational" because it is true.
9. **Put the rename in the article title, in parentheses.**
   `My Tasks page (formerly Home)`. The user searching the old word finds the
   article that retires it. Cheapest possible terminology migration.
10. **Give a deep container model one proper noun.** `The Hierarchy`, with its
    own intro article, its own best-practices article, and its own status
    component. Seven nesting levels made learnable as one concept.
11. **Name agents `<Domain> Agent` and give each exactly one verb.** Twenty-one
    instances, one pattern, each a job description rather than a feature
    description. The clearest answer in the batch to naming agentic AI: bound an
    unbounded capability by giving it a role.
12. **Ask disjunctive FAQ questions for binary policies.** "Can I upgrade myself
    or do I have to upgrade my entire Workspace?" The user supplies both options;
    the answer only picks one. Then restate the consequence in plain terms
    ("which means all members in your Workspace") instead of apologising.
13. **Write the pre-flight article.** `Prepare a spreadsheet for import` exists
    separately from `Use the Spreadsheets Importer`. For any ingestion flow, a
    document whose only job is preventing failure.
14. **State reciprocity before asking the user for work.** "We rely on bug
    reports to improve our product!" then ask for a HAR file.
15. **Counter-example: do not let asset filenames become alt text.** The status
    gallery's alt values (`personal-job-hunt`, `other-crm`) make the product's
    best content invisible to assistive technology. Asset-management metadata is
    not a description.
16. **Counter-example: superlative inflation erodes the claims that matter.**
    Eight unqualified absolutes on one page (`all software`, `infinite`,
    `perfect`, `Nothing comes close`) sit above a genuinely careful, footnoted
    privacy claim — and the careful one is harder to believe for the company it
    keeps.

## Caveats & gaps

- **`Manage task statuses` returned only its document head.** The help centre's
  article bodies are client-rendered; this article is the authoritative source
  for ClickUp's status vocabulary and only its title and meta description were
  captured. T6's depth comes from the *marketing* feature page instead, which
  means the status-template contents (the actual status names inside each of the
  15 templates) are **known to exist as images but were not readable as text**.
  Their alt attributes are filename slugs. Recovering the actual status strings
  requires either a browser-rendered pass or authenticated access.
- **All help-article bodies are `[absent]`.** Only titles, section names, and
  ~150-character search excerpts were retrievable across the two categories
  harvested. Every article-level finding in this file rests on a title plus an
  excerpt, which is high-signal for IA and task phrasing and says nothing about
  answer structure. No in-article FAQ, no step copy, no in-product string quoted
  inside an article body was captured.
- **Five of nine help categories were not entered**: `ClickUp Agents`,
  `ClickUp Brain AI`, `Features and ClickApps`, `Chat`,
  `Integrations, API, and MCP`, `Mobile`, `Data, privacy, and security`. The last
  would materially strengthen T10 and is the only likely home for an
  accessibility or data-handling statement.
- **Pricing FAQ answers 2–6 are accordion-collapsed** and were not retrieved.
  Only the questions and Q1's answer are in server HTML — so refund policy,
  cancellation consequences, multi-Workspace billing, and payment methods are all
  question-only.
- **No trust centre, security page, or accessibility page was fetched.**
  `clickup.com/terms/security-policy`, `/terms/privacy`, `/terms`, and
  `/terms/ai` (the fair-use policy) are all unharvested. The `Accessibility`
  absence in T14 is therefore a gap in the harvest as much as a possible gap in
  the product — no dedicated search was run for an accessibility statement.
- **All in-product empty states are absent.** No empty List, Board column,
  Inbox, Dashboard, search result, or first-run Workspace copy was observable.
  T8 rests on template naming, the feature list, and documented canvas
  descriptions.
- **No observed validation, toast, confirmation, or error string.** T7 rests
  entirely on help-article titles and excerpts; the one documented banner
  (`Why are my Automations slow?`) is referenced but not quoted.
- **Home-page board statuses, priorities, and labels are demo data** authored to
  illustrate the product, not product defaults, and are labelled as such
  throughout. Do not cite `Open` / `In Progress` / `In Review` / `Done` as
  ClickUp UI defaults.
- **The 15 status templates are marketing artefacts**, and it is not determinable
  from the public surface whether they correspond exactly to in-product template
  options or to their in-product names.
- **Status page carried no incidents during harvest** (`We're fully
  operational`), so no live incident copy — impact statements, update headers,
  severity labels, postmortems — was observable. incident.io's page also renders
  no verbose null-state strings, so unlike the three Statuspage instances in this
  batch there is no per-day "no incidents" copy to compare.
- **Locale is en-US for all content.** Six locales exist and only their
  *category slugs* were observed, via switcher URLs. The translation findings in
  T11 are based on those slugs alone; no localised page body was fetched, so no
  claim here is precedent for localised ClickUp copy beyond the slugs themselves.
- **Mobile app strings not harvested**; a `Mobile` help category exists and was
  not entered.
- **Comparison pages not fetched** (eleven of them). These would be the richest
  source of ClickUp's competitive vocabulary and of its own account of what
  distinguishes it — a notable gap given that the help centre itself carries
  `ClickUp vs. Notion`.
- **No published design system or content style guide was located.** The voice
  observations in T14 are inferred from copy, not checked against stated rules.
  `clickup.com/brand` exists in the footer and was not fetched.
- Alt-text, skip-link, and DOM-duplication findings are flagged as **suspected**,
  based on text extraction rather than DOM or assistive-technology inspection —
  with the exception of the pricing-page label leak and the filename-slug alt
  values, which appeared directly in the extracted text.
- The pricing page's extracted output exceeded the tool's inline size limit and
  was read from a persisted file; the comparison table's checkmark cells render
  as empty, so **which plans include which non-numeric features is not
  recoverable** from this harvest — only the feature names, the numeric limits,
  and the prose cell values.

## Sources

1. https://clickup.com/
2. https://clickup.com/pricing
3. https://help.clickup.com/hc/en-us
4. https://help.clickup.com/hc/en-us/categories/5735245366551-Get-started
5. https://help.clickup.com/hc/en-us/categories/5927901136151-Technical-Support
6. https://clickup.com/features/custom-task-statuses
7. https://help.clickup.com/hc/en-us/articles/6309452618647-Manage-task-statuses — partially blocked (document head only; body client-rendered)
8. https://status.clickup.com/
