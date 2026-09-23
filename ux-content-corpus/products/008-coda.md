# 008. Coda

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Doc-database hybrid / collaborative doc-app builder |
| Primary URL | https://coda.io/ |
| Corpus rank | 008 |
| Benchmark strength (source list) | Document-building onboarding |
| Locale / market observed | en-US (help centre paths carry `/en/` and `/en-us/`; no locale switcher observed) |
| Platform observed | Web (desktop), two help centres (Intercom-era and Zendesk-era), Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Trust Center names SOC-style compliance topics, DPA, subprocessor list, annual penetration testing; accessibility target stated as WCAG 2.2 AA |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Partial — the pricing page 301s off-domain to `superhuman.com/plans/docs`, which returned an empty body (blocked). No plan names, prices, or tier copy captured. Product is also mid-rebrand, so terminology is unstable across surfaces |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://coda.io/ | Hero, mega-nav, four use-case blocks, six team template sets, pricing-philosophy block |
| `/welcome` | https://coda.io/welcome | **Byte-identical to home**; canonical points back to `/` |
| Pricing | https://coda.io/pricing | **BLOCKED** — 301 to `https://superhuman.com/plans/docs`, empty response body |
| Help centre index (legacy) | https://help.coda.io/en/ | Intercom-era index; 11 categories with counts |
| Help centre index (current) | https://help.coda.io/hc/en-us | Zendesk-era index; same 11 categories, different chrome |
| Help category: Tables and views (legacy) | https://help.coda.io/en/collections/1908866-tables-and-views | **Richest single source** — 42 article titles *with* their descriptions, in five named sections |
| Help article: Overview: Tables | https://help.coda.io/hc/en-us/articles/39555768266893-Overview-Tables | Full article: object model, control labels, 8-question FAQ, destructive-action warning |
| Help category: Doc management | https://help.coda.io/hc/en-us/categories/39555711978253-Doc-management | 5 sections incl. performance troubleshooting |
| Help category: Billing and pricing | https://help.coda.io/hc/en-us/categories/37412210092941-Billing-and-pricing | 7 article titles |
| Help category: Sharing your docs | https://help.coda.io/hc/en-us/categories/39555174184077-Sharing-your-docs | 12+ article titles, publishing IA |
| Status page | https://status.coda.io/ | **30+ components**, including named third-party dependencies |
| Accessibility | https://coda.io/product/accessibility | Named partners, internal guild, three shipped improvements |
| Trust Center | https://coda.io/trust | Four-pillar IA, 9-question FAQ (questions only), legal document inventory |

---

## T1 Navigation & IA labels

**A note before the labels: this product is mid-rebrand, and the nav shows it.**
A persistent banner reads
`Coda is now Superhuman Docs: The best place for teams and AI to work together.`
The footer copyright reads `Copyright © 2026 Superhuman Docs. All rights
reserved.` while the help centre footer reads `© 2026 Coda. All rights reserved.`
The community link is labelled `Superhuman community` but points at
`community.coda.io`. The `Press` link is a `mailto:` to a **Grammarly** address.
**Three corporate identities — Coda, Superhuman, Grammarly — appear in one
footer.** Every label below should be read against that instability.

**Global nav — three dropdowns plus four flat links** `[observed]`:
`Product` · `Solutions` · `Resources` · `Gallery` · `Blog` · `Pricing` ·
`Request a demo` · `Get started`.

Note `Gallery` promoted to a top-level flat link. For a product whose
differentiator is user-published docs, that placement is a deliberate bet: the
community's output is a peer of the product and the price.

**Product dropdown is four labelled groups** `[observed]`:

| Group | Items |
|---|---|
| `Explore` | `Docs & team hubs` · `Trackers & apps` · `See all →` |
| `AI & integrations` | `Coda AI` · `Integrate your tools` · `Consolidate your tools` |
| `More` | `What's new` (FEATURED) · `Packs` · `Publishing` |
| `Compare` | `vs Notion` · `vs Confluence` · `vs Quip` · `vs Airtable` · `See all →` |

Two findings. `Integrate your tools` and `Consolidate your tools` sit adjacent
as **two verbs applied to the same object** — an unusually explicit statement of
two competing strategies (keep your stack and connect it, or replace your stack).
Naming both rather than picking one is a real content decision.

And `Compare` is a **nav group, not a footer link** — four named competitors
addressable from the primary navigation, with `vs Notion` first. Most products
bury comparison pages for SEO only; Coda promotes them into the buying path.

**Solutions is a three-axis split** `[observed]`, and the axis names are visible:

- `By role`: `Product` · `Marketing` · `Sales` · `See all →`
- `By scenario`: `Planning & OKRs` · `Meetings` · `Project management` · `See all →`
- `By team size`: `Enterprise` · `Startups` · `Small business` · `See all →`

`By scenario` is the distinctive one. Trello slices by team, Airtable by
team-and-industry; Coda adds **the occasion** — a meeting, a planning cycle — as a
first-class entry point. For a doc product that is the right axis, because a doc
is created for an occasion rather than owned by a department. The anchor links
(`#by-role`, `#by-scenario`, `#by-team-size`) confirm all three are sections of
one page.

**Resources dropdown — four groups, one of which is the product's vocabulary
layer** `[observed]`:

| Group | Items |
|---|---|
| `Learn` | `Guides` · `Interactive sessions` · `Courses` (FEATURED) |
| `Connect` | `Help center` · `Superhuman community` · `Hire a Services Partner` · `Partner with us` |
| `Extend` | `Pack Studio` · `Formula list` · `API` |
| Featured guide | `Get started with Superhuman Docs AI` |

`Interactive sessions` over "webinars" is notable — the URL is
`/resources/webinars/training-recordings`, so the *label* was upgraded and the
*route* preserves the honest word. And the label says "sessions" (live) while the
route says "recordings" (not live). Recorded as a mild defect.

`Hire a Services Partner` and `Partner with us` sit adjacent — the same noun
pointed in two directions, buy-side and sell-side, distinguished only by verb.
Efficient, and slightly confusable.

The featured guide link is titled `Get started with Superhuman Docs AI` but
resolves to `/resources/guides/how-to-get-started-with-coda-ai`, and the product
itself is still labelled `Coda AI` in the same dropdown. **The new name in the
link text, the old name in the URL, the old name in the adjacent nav item** —
a three-way rebrand collision inside one dropdown.

**Help-centre top level — 11 categories, each with a scope line** `[observed]`.
Both help platforms carry the same 11:

| Category | Scope line (verbatim) | Articles |
|---|---|---|
| `Doc management` | "Doc management, including setup, pages, customization, performance, and more" | 46 |
| `Sharing your docs` | "All about sharing and publishing your docs" | 11 |
| `Billing and pricing` | "Upgrading, billing, pricing, payment, and more" | 7 |
| `Import and export` | "Import data from other tools, or export your Coda doc" | 17 |
| `Working in the canvas` | "Word processing, Coda AI, buttons, controls, automations, and more" | 22 |
| `Tables and views` | "All things tables, views, columns, and rows" | 43 |
| `My Coda account` | "Access and manage your individual Coda account" | 10 |
| `Workspace management` | "Organize your team's docs and folders, manage members, and more" | 16 |
| `Enterprise org administration` | "Additional functionality for org admins on our Enterprise plan" | 22 |
| `Integrating with Packs` | "Supercharge your docs with integrations" | 38 |
| `Using Coda's formula language` / `Formulas` | (Zendesk index shortens the label to `Formulas` and moves the old label into the scope line) | 11 |

The scope lines are **comma-runs of the sub-objects**, and two of them end with
`and more` — an honest but unhelpable ending that the Wise convention would fill
with the unhappy path. `Doc management`'s run does include `performance`, which
is where the troubleshooting lives, so one category does surface its failure mode
at the top level.

The IA's organising principle is the **doc lifecycle plus the object model**:
build it (`Doc management`, `Working in the canvas`, `Tables and views`), fill it
(`Import and export`), share it (`Sharing your docs`), govern it
(`Workspace management`, `Enterprise org administration`), pay for it
(`Billing and pricing`), extend it (`Integrating with Packs`, `Formulas`), and
own an account (`My Coda account`). `Working in the canvas` is the only category
named after a *surface* rather than an object or an activity — and `canvas` is a
coined term (see T13).

`Tables and views` (43) and `Doc management` (46) hold half the corpus between
them. `Billing and pricing` (7) is the smallest, which for a product whose
headline pricing claim is its differentiator is a slightly odd allocation.

**Sub-section names inside `Tables and views`** `[observed]` — five, and they are
the real artefact:

1. `Table basics` — "Intro to tables and table setup"
2. `Views & view types` — "View basics - plus all the different available view types"
3. `Columns & column types` — "Managing columns and understanding the different types"
4. `Filtering tables and views` — "Filter data in your tables and views"
5. (a fifth, truncated in the fetch)

Note the parallel `X & X types` construction for sections 2 and 3: the *thing*
and the *taxonomy of the thing* bundled into one section name, because in this
product choosing the type *is* the task. That is a structured-data IA decision
mirroring Airtable's, arrived at independently.

**Sub-section names inside `Doc management`** `[observed]`:
`Doc size & performance` · `Doc usage & navigation` · `Doc setup` ·
`Page management` · `Doc use cases`.

Four of five begin with `Doc`, which makes the list scan poorly. `Doc use cases`
contains **one article**, and `Doc size & performance` is the largest at 12 — for
a doc tool, the fact that performance and size need twelve articles is itself
worth recording, and Coda names the category plainly rather than hiding it under
"Troubleshooting".

**Footer groupings** `[observed]`: `Company` · `Product` · `Solutions` ·
`Popular templates` · `Resources`, then a legal strip: `Privacy` ·
`Legal & security` · `Status` · `Site map` · `Your Privacy Choices`.

`Popular templates` as a **footer group of five named templates** (`Team hub`,
`OKR tracker`, `Meeting notes`, `Product roadmap`, `Decision doc`) is unusual —
most footers list categories, not instances. It is also an SEO surface, but the
five chosen are a useful signal of what Coda thinks its canonical artefacts are.

`Accessibility` is placed inside `Company`, alongside `About us` and `Careers`,
rather than in the legal strip. **Defect:** the footer item `Contact support`
renders as plain text with no link.

## T2 Value proposition & headline patterns

**Hero — a category claim with a terminal full stop** `[observed]`

> `Your all-in-one collaborative workspace.`
>
> "Coda brings teams and tools together for a more organized work day."

Both lines end in full stops, which is Coda's house style throughout (see below).
The headline is a **noun phrase claiming a category**, not a verb and not a
benefit. The subhead then supplies the two objects unified (`teams and tools`)
and the outcome in an unexpectedly modest register: "a more organized work day".
Not "10x productivity", not "ship faster" — *a more organized work day*. That
downshift is deliberate and it recurs.

**The four-part blend formula** `[observed]`, from the meta description and
repeated as positioning:

> "Coda is an all-in-one platform that blends the flexibility of docs, structure
> of spreadsheets, power of applications, and intelligence of AI."

Four `<abstract noun> of <familiar product category>` pairs. The construction
does category-creation work by **naming four things the reader already owns and
claiming one property from each** — flexibility, structure, power, intelligence.
It never says what Coda *is*, only what it borrows. This is the cleanest
"new category" formula in the harvest and is directly reusable whenever a product
sits between established categories.

**Section headers almost all end with full stops** `[observed]`:
`Want to see more?` · `Create workflows across your must-have tools.` ·
`And getting started is easy.` · `Collaboration costs (much) less in Coda.` ·
`Making Coda accessible to all.` · `Learn more about Coda's accessibility
effort.` · `Request a demo.` · `Get to know us more.` · `See Coda in action.` ·
`Take the busywork out of your work with Coda AI.`

Punctuating headings as sentences is a consistent, identifiable voice choice —
it makes the page read as a series of statements rather than a set of labels.
Compare Wise, which does the same thing to its onboarding step headings.

**The four-use-case block, with a competitive twist** `[observed]`. Under
`4 ways 50,000+ teams use Coda to supercharge their work days.`:

| Coined name | Value line | Below it |
|---|---|---|
| `Writeups` | "Coda is familiar like a doc and engaging like an app, so your team can jump in quickly, collaborate effectively, and make decisions that stick." | `Replaces` + logo strip |
| `Hubs` | "Teams move quicker together. So give them a place to get on the same page while centralizing everything from strategy to schedules." | `Replaces` + logos |
| `Trackers` | "Tables talk to each other, edits sync everywhere, views are personalized—and you can ditch the hacky spreadsheets." | `Replaces` + logos |
| `Applications` | "With Coda, anyone can design a time-saving solution with a formula, button, or automation. And replace niche apps in your tool stack." | `Replaces` + logos |

**`Replaces` as a one-word label above a row of competitor logos** is the
sharpest piece of copy on the page. No sentence, no hedge, no "alternative to" —
a single transitive verb with the object supplied visually. It also makes the
four coined nouns (`Writeups`, `Hubs`, `Trackers`, `Applications`) legible by
displacement: you learn what a `Hub` is by seeing what it replaces.

Note `Writeups` — a coined noun for a genre of document, and `familiar like a
doc and engaging like an app` as its definition, which is the four-part blend
formula compressed into one clause. And `ditch the hacky spreadsheets` is the
register floor: `hacky` is the only piece of engineer-slang in the marketing copy.

**Third-party quote used as the positioning statement** `[observed]`:

> "It's more powerful than Google Docs and more flexible than Airtable or
> Notion." — *Fast Company*

Coda outsources its own comparative claim to a publication, names three
competitors inside the quote, and puts `Compare Coda` directly beneath it. A
claim the company could not make in its own voice without sounding defensive,
made attributable. Reusable pattern: **let a third party make the comparative
claim, then supply the tool to verify it.**

**The pricing-philosophy block is the standout** `[observed]`:

> `Collaboration costs (much) less in Coda.`
>
> "Charging per seat doesn't sit well with us. We price Coda differently to erase
> the limits that hinder expanding teams."

Three things. `(much)` as a **parenthetical intensifier inside a headline** —
an aside that raises the claim while signalling it is an aside, so the sentence
survives without it. `doesn't sit well with us` locates the objection in the
company's own discomfort rather than in the customer's wallet, which converts a
pricing page into an ethics statement. And `erase the limits` names the
mechanism as removal rather than addition.

Restated in the Trust Center's demo router as
`Learn about Coda's unique pricing.` — "See why we don't charge per seat and how
the savings can add up." The claim is **stated as a negation of the industry
default** (`we don't charge per seat`) rather than as a description of the actual
model. Recorded as a finding: on every page harvested, Coda says what it does
*not* charge for and never says what it *does* charge for — and the pricing page
that would say so was unreachable (see Caveats).

**Accessibility page headline carries the product's core role noun** `[observed]`:

> `Making Coda accessible to all.`
>
> "Everyone is a maker - productive, creative, and capable of effecting change.
> Which is why we're working hard to make our products accessible to everyone."

`Everyone is a maker` is the brand's central assertion, deployed on the
accessibility page as the *reason* for the accessibility work. The argument runs:
our thesis is that everyone can build → therefore excluding anyone contradicts
the product. Deriving an accessibility commitment from the product thesis rather
than from compliance is the strongest version of this genre in the corpus.
Note the spaced hyphen (`maker - productive`) where the house style elsewhere
uses em-dashes.

**Help-centre search header** `[observed]`, Zendesk index:

> `Feeling stuck? Let's fix that!`

A two-beat construction: name the feeling, then commit to the remedy in the first
person plural. It is the only exclamation mark observed in Coda's help copy and
it sits at the top of the help centre — i.e. at the exact moment of frustration,
the same placement as Coda's `bump in the road` counterpart at Airtable. Register
choice: **acknowledge the emotion, then immediately move to action.**

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav, primary | Bare; no price |
| `Get started for free` | Hero and pricing block | Price added outside the nav |
| `Request a demo` | Global nav | Routes to `superhuman.com/contact-sales` — **off-domain, and the URL carries `productInterest=Coda`** |
| `Contact sales` | Hero, secondary | Routes to `coda.io/contact/sales` — **a different destination from `Request a demo`** |
| `Explore pricing` | Pricing-philosophy block | `Explore` rather than `See` or `View` |
| `Compare Coda` | Under the Fast Company quote, and in footer | Verb + product name |
| `Explore the Gallery` | Two placements | |
| `Browse` | Integrations block | **Bare `Browse`** with no object — the weakest CTA on the page |
| `Learn More` | Rebrand banner | **Bare, and title-cased** against the site's sentence case |
| `Learn all about Docs →` | Rebrand interstitial | Arrow glyph; `Docs` capitalised as the new product name |
| `Start using this template` | Every template card | Verb + object, no price |
| `Preview this template` | Every template card, secondary | Parallel construction with the above |
| `Preview` | The same card's image overlay | **Third label on one card** for the same secondary action |
| `Explore Zoom's decision doc` / `Explore Coda's team hub` / `Explore Figma's product roadmap` / `Explore Google's LaunchCal` | Use-case blocks | **Named-customer artefact CTAs** — the strongest family here |
| `Coda for product` / `Coda for sales` / `Coda for engineering` / `Coda for design` / `Coda for marketing` | Team template sections | Consistent `Coda for X` |
| `Read the handbook` | Three of six team sections | Absent for design, marketing, HR — inconsistent coverage |
| `See all →` | Every nav group | Arrow glyph, consistent |
| `Contact us.` | Accessibility page | **Terminal full stop inside a CTA**, and it routes to the help centre rather than a contact form |
| `Skip to content` | Top of DOM, coda.io | Accessibility |
| `Skip to main content` | Top of DOM, help.coda.io | **Different string on the two domains** for the same affordance |
| `Sign in` | Help centre | Annotated "Opens a dialog" — good practice |
| `See all 12 articles` / `See all 18 articles` / `See all 7 articles` | Help category sections | Count inside the label |
| `Subscribe to Updates` / `Subscribe` / `Subscribe via Slack` | Status page | |
| `View historical uptime.` | Status page | Terminal full stop |
| `Delete` / `Delete all` | Documented destructive controls | See T7 |
| `Start blank` / `Import data` / `Connect to a table` | Documented table-creation choice | See T4 — the best CTA triad in this file |

**Observations.** The `Explore <Customer>'s <artefact>` family is the most
distinctive CTA pattern in the harvest: four CTAs that each name a real company
and a real document type (`Zoom's decision doc`, `Figma's product roadmap`,
`Google's LaunchCal`). The CTA *is* the social proof, and it promises a specific
artefact rather than a page. Compare the bare `Browse` two sections later, which
promises nothing.

Against that: `Request a demo` and `Contact sales` are two labels pointing at two
*different* destinations for what the user will read as one action, and one of
them leaves the domain. `Preview` / `Preview this template` /
`Start using this template` gives one template card three CTAs. `Learn More`
(title case) sits in the highest-priority banner on every page against a
sentence-case house style.

## T4 Onboarding & getting-started

This is the flagged strength, and the evidence is strong — but it is
**instructional rather than sequential.** Coda does not ship a numbered
onboarding course (no Trello-style nine chapters). It ships a *doc-building
method* distributed through help articles and a template gallery.

**The creation moment is a three-way choice with three excellent labels**
`[observed]`, from `Overview: Tables`:

> 1. Type `/table` on any blank line in your doc
> 2. Select **Table** from the list of options.
> 3. Choose to either **Start blank** (to create a brand new base table),
>    **Import data**, or **Connect to a table** (to create a connected view of an
>    existing table in the doc).

`Start blank` · `Import data` · `Connect to a table` is the cleanest
first-run triad in this corpus. Three verbs, three genuinely different mental
models (create from nothing / bring data in / reference what exists), each
glossed in a parenthetical that names the *resulting object* (`base table`,
`connected view`). The user learns the object model by choosing how to start.

Note that the entry point is a **slash command**, and the docs teach it as the
primary route ("Perhaps the quickest is to use the slash command"). Onboarding
copy that leads with a keyboard affordance rather than a button is a bet on the
audience.

**Decision support is explicit, and it is a link** `[observed]`:

> 💡 "Not sure whether you should create a new table or a new view? Check out
> this helpful resource for guidance."

Coda ships a guide called `new-table-or-view` whose entire job is resolving one
architectural choice, and surfaces it at the exact moment the choice is made.
The tip is framed as the user's own uncertainty (`Not sure whether…`), not as an
instruction. **Pattern: when a product forces an irreversible modelling decision,
write a dedicated guide for that decision and link it from the decision point.**

**Article-level onboarding has a consistent internal structure** `[observed]`.
`Overview: Tables` opens with a contents block headed
`Within this article, you'll find...` (ellipsis included), then runs:

`What is a table?` → `What is a view?` → `Create a table (or view)` →
`Add data to tables` → `Customize your table display` →
`Filter, sort, group, and summarize your data` → `Connect tables` → `FAQs`

Definition → creation → population → presentation → analysis → relation →
edge cases. **Concept before action, single object before relationships, and
the FAQ last as the residual bucket.** The parenthetical in
`Create a table (or view)` is doing disambiguation work for a heading that would
otherwise under-promise.

The section headings are a mix of questions (while the user cannot yet act) and
imperatives (once they can) — the same capability-gated register gradient found
at Trello, applied within a single article rather than across a curriculum.

**Definitions lead with the familiar and then correct it** `[observed]`:

> "Like spreadsheets and databases, tables allow you to organize your data."
>
> "Tables consist of rows and columns. Rows generally represent "things" (people,
> tasks, inventory items, places to visit, grocery list items, etc.), and the
> columns are generally "attributes" of those things (the quantity of an item,
> the due date of a task, a customer's address, etc). In other words, each row is
> an individual data point, and each column represents an attribute of that data
> point."

Five worked instances for `things`, three for `attributes`, then the abstraction
restated with `In other words`. The hedge `generally` appears twice, correctly —
rows do not *always* represent things. Note the scare quotes around "things" and
"attributes": the copy is flagging that it is using loose words on purpose before
tightening them.

**The base-table/view explanation is the single best piece of conceptual
onboarding copy in this harvest** `[observed]`:

> "In Coda, we have two types of tables: **base tables** and **views**. When we
> use the word "table," we could be referring to either type. When you create a
> brand new table, you're creating a **base table**. You can then create **views**
> of that base table. A view is essentially a connected "mirror" of that base
> table… Any change to the data in one view reflects in the base table (and in all
> other views)."

Five moves in one paragraph: name both types, **admit the ambiguity of the
product's own word** ("when we use the word "table," we could be referring to
either type"), tell the user which one they get by default, give the metaphor
(`connected "mirror"`), and state the propagation rule with its scope
(`and in all other views`). The second move is the rare one — most products
pretend their overloaded noun is unambiguous. Coda flags the overload, in the
definition, before the user trips on it.

**Onboarding by template, organised by team, with named artefacts** `[observed]`.
The home page runs six team sets (`Product`, `Sales`, `Engineering`, `Design`,
`Marketing`, `HR`), four templates each, every one with a one-line description:

- `Product team hub` — "Everything you need to organize your product team in one place."
- `Decision doc` — "Have the right people weigh in on an upcoming decision."
- `$100 voting exercise` — "Need to make a final decision on your team's OKRs? Weigh your options."
- `Meeting forum` — "How to accelerate reviewing decisions with multi-threaded meetings."
- `Account hub` — "A single source of truth for all your sales team's account planning."
- `Mutual action plan` — "Improve the buying experience and keep everyone aligned throughout the process."
- `Launch checklist` — "Never miss a step as you move towards launch."
- `Visual QA tracker` — "Use this tracker to file visual nits at the end of a project."
- `Design critique` — "A ritual where designers gather to share their work and get feedback."
- `Talent review` — "Identify and track high/low performers, talent gaps, and succession planning."
- `1:1 meeting notes` — "5 ways to get the most out of one-on-ones."
- `Headcount budgeting` — "Combine headcount management, staffing, hiring, and onboarding with Coda's Staffing OS."

Three patterns worth extracting. Several descriptions are **framed as a
practice, not a document** — `Design critique` is "a ritual where designers
gather", `Meeting forum` is "How to accelerate reviewing decisions". The template
is sold as a way of working, which is why the same gallery can carry
`$100 voting exercise` (a named facilitation technique) beside `CRM` (a software
category).

Several use the **second-person problem statement as the description** —
`Need to make a final decision on your team's OKRs? Weigh your options.` and
`Never miss a step as you move towards launch.` The description states the
failure the template prevents.

And `Visual QA tracker` — "file visual nits" — uses in-group craft vocabulary
(`nits`) that only a designer would use, in a card aimed at designers. Register
tuned per audience segment within one gallery.

**Every team set closes with the same construction** `[observed]`:
`Want to know more about running your <team> team on Coda?` → `Coda for <team>` +
`Read the handbook`. The word `running` (not "using" or "managing") frames the
template set as operational infrastructure. **Defect:** three of the six render
with a double space (`running your  product team`), and three of the six lack the
`Read the handbook` link entirely.

## T5 Form & field labels

Coda's column-type system is its structured-data vocabulary, and the legacy help
category exposes it with descriptions. All `[documented]` unless noted.

**Column types named, with their glosses** `[observed]`:

| Type / feature | Gloss (verbatim or close paraphrase) |
|---|---|
| `relation columns` | "use relation columns (**formerly Lookups**) to connect tables in Coda. Easily reference another table directly from within a row." |
| `linked relations` | "use linked relations to create a two-way connection between tables" |
| `select list columns` | "how to create and customize select list columns… with tips for using them effectively" |
| `Progress Bar Column Type` | "add a progress bar column type to each row, providing a clear visual indicator of project progress" |
| `Canvas column type` | "add a canvas column type to each row, bringing the flexibility of Coda's canvas inside any table" |
| `People column format` | "create, use, and customize a People column… so you can easily reference teammates and collaborators" |
| `display column` | `What is the display column?` — "Understand how Coda's default display works" |
| `Compose` | "The compose feature lets you build dynamic formatted text in table columns" |
| `Default column values` | "set default values for new rows… Use our helpful builder or write a formula" |

**`relation columns (formerly Lookups)`** is a rename documented inline, in the
article description, in the help-centre listing — i.e. at the point a user
searching for the *old* word would land. Exactly the right placement for a
terminology migration, and the mirror of Trello's `Butler`/`Automation` drift
handled well rather than badly.

**`Canvas column type`** is the product's signature move rendered as a field:
a cell that contains a whole document surface. The gloss explains it by
recursion — "bringing the flexibility of Coda's canvas inside any table" — and
it is the clearest single sentence about what makes a doc-database hybrid
different from a database.

**Control labels quoted verbatim in the docs** `[observed]`:

`+New row` (described as "the large **+New row** option at the bottom of the
table") · `+` (the small insert-row icon) · `Insert column` →
`Insert column before/after` · `Options` (the table menu, "in the upper-right
corner") · `Sort` → `Add sort` → `Ascending` / `Descending` · `Delete` ·
`Delete all` · `Start blank` / `Import data` / `Connect to a table` ·
`Table` (in the slash-command list) · `/table` (the slash command itself) ·
`Download CSV`-equivalent export options · `My Stats` (a named metrics surface) ·
`doc map` · `filter bar` · `canvas controls`.

`+New row` with the plus glyph **inside the label** is worth noting — the affordance
and the noun are one string, and the docs quote it with the glyph attached.

**Form-building vocabulary** `[observed]`: `Create and customize a form` —
"Responses are automatically stored in tables"; `Set up pre-filled form fields`
— "Make data collection run smoother in your form with pre-filled fields.";
`Share your Coda form`. Forms are modelled as a **view type over a table**, so the
form's fields *are* the table's columns — a structural decision that removes a
whole class of field-mapping copy.

**Doc-level formatting settings** `[observed]`, from `Doc setup`:
`Set date, time, and time zones in your doc` · `Localize currency in docs` ·
`Set custom number format for docs` · `Set custom first day of week` ·
`Set custom working days and holidays` · `Change your doc's title and icon`.

Six articles on per-doc localisation and calendar convention. `Set custom working
days and holidays` is the notable one — a business-calendar concept exposed as a
document setting, which any date-arithmetic feature needs and few products
surface.

**Sorting instruction includes an ordering caveat as a tip** `[observed]`:
"Sorting rules will be prioritized from top to bottom, so be sure to order your
sorting rules in the order that you'd like them to apply." and then
"*Tip: Make sure to ungroup your columns before sorting - otherwise the sort will
be applied to the items within each group rather than rearranging the entire
table.*"

The tip pre-empts a specific wrong outcome by describing what the user *will
see* if they get it wrong. **Stating the symptom of the mistake, not just the
rule**, is the transferable move — the user can recognise the failure they are
already looking at.

## T6 Status & state language

Like Trello and Airtable, **Coda ships no workflow status vocabulary** — status is
a user-authored select-list column. The docs say so explicitly, using status as
the canonical example of grouping: "maybe you want to group your list of tasks
based on the status of the task."

**What Coda owns is a lock/edit-protection state vocabulary**, and it is more
developed than either competitor `[observed]`:

| State | Scope | Source |
|---|---|---|
| `locking` on a table | "add locking to your tables and connected views in order to prevent accidental edits to data" | Overview: Tables |
| `locking` on a page | `Add locking to the pages of your doc` | Doc management |
| `base table` vs `view` | the fundamental table state — original or mirror | Overview: Tables |
| `connected` | a view's relationship to its base table ("a connected "mirror""); also `connected, filtered views` | Overview: Tables |
| `hidden` / `un-hidden` | columns — `Managing columns: hiding, un-hiding, and re-ordering` | Tables and views |
| `published` | docs — a whole `Publishing` IA section | Sharing your docs |
| `synced` | pages — `Sync pages between docs` | Doc management |
| `Row Activity` | per-row change history — "view activity details about rows in your tables" | Tables and views |

Two things stand out. **The stated purpose of locking is "to prevent accidental
edits"**, not "to control permissions" — the state is framed as protection from
the user's own slip rather than from other people's malice. That framing choice
determines the whole tone of the feature.

And **`locking` applies to two different objects (tables, pages) with the same
verb and separate articles**, while a third concept (`Sharing`/permissions)
handles people. Coda separates *accident protection* from *access control*
cleanly, which most products conflate into one "permissions" concept.

**`base table` vs `view` is the most consequential state in the product**, and
the docs handle it with a **dedicated diagnostic tool**:

> "You can use the doc map to understand which tables in your doc are connected.
> This can help you see whether a table is a base table or a view, and allow you
> to understand the connections of data in your doc."

Shipping a *map* whose job is telling the user which state an object is in — and
documenting it as the answer to "how can I see the connections" — is a strong
response to an invisible-state problem. Relevant to any product where two objects
look identical but behave differently.

**Status-page component states** `[observed]`:
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`, with `had a major outage.` / `had a partial outage.` in the daily
log, and the null states `No downtime recorded on this day.` /
`No data exists for this day.` Header: `All Systems Operational`.

**Coda's status page is the most granular in the harvest — 30+ components** —
and the composition is the finding:

- *Own services*: `Docs` · `Doc List` · `Search` · `Packs` ·
  `Published Docs` · `API` · `Coda MCP` · `Doc Processing` · `Login` ·
  `Doc Images` · `Community Forum` · `Community Forum Login`
- *Named third parties, by sub-service and region*:
  `Amazon Web Services` with eleven children (`AWS cloudfront`,
  `AWS ec2-us-west-2`, `AWS rds-us-west-2`, `AWS s3-us-west-2`,
  `AWS elasticache-us-west-2`, `AWS elasticsearch-us-west-2`,
  `AWS lambda-us-west-2`, `AWS kms-us-west-2`, `AWS eks-us-west-2`,
  `AWS ecr-us-west-2`, `AWS ses-us-west-2`, `AWS sns-us-west-2`);
  `Imgix Rendering` with two children; `File and Image Malware Scanning` with two
  named `Scanii.com` endpoints

Compare Airtable's **one** component (`Airtable Service`) and Trello's five. Coda
publishes its own hosting region (`us-west-2`), its CDN vendor, its image
pipeline vendor, and its malware-scanning vendor, at endpoint granularity.

This is a genuine content-strategy trade-off worth recording in full. The
upside: a user seeing `AWS rds-us-west-2` degraded learns immediately that the
cause is upstream and that Coda cannot fix it quickly. The downside: the
component list is **engineering-named, not user-named** — `ecr`, `eks`, `kms`,
`elasticache` are meaningless to the audience, and a user looking for "can I edit
my doc right now" must parse thirty rows to find `Docs`. The page optimises for
the operator's mental model over the reader's.

Also note `Coda MCP` as a first-class status component, and `Community Forum` and
`Community Forum Login` as two separate components — the login path to a
dependency gets its own row.

**Absent** `[absent]`: no `In progress` / `Complete` / `Done` product state, no
approval state, no review state. The only per-row state concept is `Row Activity`
(history), not status.

## T7 Error, failure & recovery

**The destructive-action warning is the standout, and it is quoted verbatim in
the docs** `[documented]`:

> "If the table is a base table, you will see a warning telling you that deleting
> this table will also delete all connected views and break anything (formulas,
> automations, etc.) that reference the table or any views. Click **Delete all**
> to confirm."

Two excellent decisions here. First, the warning **enumerates the collateral
damage by type** — connected views, formulas, automations — rather than saying
"this cannot be undone". The user is told *what else* breaks, which is the
question they actually have. Second, the confirm button is labelled
**`Delete all`**, not `Delete` or `Confirm` or `OK`. The word `all` carries the
scope of the cascade into the button itself, so the last thing the user reads
before committing restates the blast radius.

That is the best confirm-button label in this harvest. `Delete all` over
`Delete` is a one-word change that makes an irreversible cascade legible at the
moment of commitment — directly applicable to account closure, bulk refunds,
API-key revocation, and any delete with dependents.

**A verbatim error string, captured via its article title** `[observed]`:

> `Resolve an "Out of Memory" error`

The article title quotes the error string in quotation marks, which is optimal
for a user pasting it into search. `Resolve` (rather than `Fix` or
`Troubleshoot`) is the verb, and it is used consistently.

**Coda's troubleshooting IA is unusual: it is a performance-engineering
category, not a support category** `[observed]`. `Doc size & performance`
(12 articles) contains:

- `Overview: Improve doc performance`
- `Reduce the size of your doc`
- `Resolve an "Out of Memory" error`
- `Improve doc rendering issues`
- `Generate a HAR file for troubleshooting`
- `Generate a performance profile for troubleshooting`

Two of the six ask the user to **produce a diagnostic artefact** — a HAR file and
a performance profile. Asking an end user to capture a network trace is a
developer-grade instruction shipped into a productivity tool's help centre. It is
honest (the support team genuinely needs it) and it is a real audience
assumption. Note both titles end with `for troubleshooting`, so the *reason* for
the unfamiliar task is in the title.

`Reduce the size of your doc` is the most interesting title: it names a
**user-side remedy for a product-side limit**, framed as the user's action. Not
"Doc size limits" and not "Why is my doc slow" but the thing to do about it.

**`Request access to docs`** `[observed]`, in `Sharing your docs` — the
permission-denied recovery path given a first-class article in the *sharing*
category rather than in troubleshooting. Placing the blocked-user's article
beside the sharer's articles means whoever caused the block can find the fix.

**Recovery and reversal affordances named** `[observed]`:
`Downgrade your Coda workspace` (a peer article to `Upgrade your Coda
workspace`, in the same category) · `Row Activity` · `Doc limits on Free plan`.

Publishing `Downgrade` as a titled peer of `Upgrade`, in the same seven-article
billing category, is a small confidence signal — the exit is documented as
plainly as the entry.

**A limitation answered with a schema critique** `[observed]`, from the tables
FAQ `Can I combine two tables into one?`:

> "There isn't a built-in way to combine two tables (or views) into one single
> table. One alternative is to copy and paste all rows… However, when someone
> wants to combine two tables into one, this is typically a sign that they
> actually need a different table schema. Often, they may want to instead start
> from one big table and create filtered views from there."

Then a worked example (2023 entries + 2024 entries → one base table with a year
column + two filtered views).

This is a **reframing answer**: it gives the honest "no", gives the crude
workaround, then diagnoses the question as a symptom of a modelling mistake and
teaches the correct model with a concrete case. Structurally: refuse → workaround
→ reframe → worked example. It respects the user enough to tell them they asked
the wrong question, and does it without condescension (`this is typically a sign`,
`they may want to instead`).

The same question exists as a bare stub in the legacy help centre —
`How do I combine two tables into one?` with **no description at all**, the only
description-less entry in a 42-item list. The answer was clearly written later.

## T8 Empty states

No in-product empty state was directly observable. What is `[observed]` or
`[documented]`:

**The empty-doc answer is the slash command, not a message.** Coda's blank state
is a blank line, and the documented first action is typing `/`:
"Type `/table` on any blank line in your doc". The empty canvas is treated as a
**command prompt** rather than a surface needing explanation — which is a real
design position and the reason no empty-state illustration copy exists to harvest.

**The `Start blank` / `Import data` / `Connect to a table` triad** (see T4) is
Coda's true first-run copy: the empty state is resolved by a three-way choice at
the moment of creation rather than by a panel shown afterwards.

**Template gallery as the populated alternative** `[observed]` — 24 named
templates on the home page, plus `Explore the Gallery`, plus a footer group of
five `Popular templates`, plus a help article
`Discover docs and Packs in the Gallery`. Four separate entry points to
pre-filled content. Like Trello, Coda treats the blank doc as a content-supply
problem.

**`Filter out the rows you don't need to see, without actually deleting that
info.`** `[observed]` — the filtering gloss, and it is doing empty-state
reassurance work: the reason a filtered view looks empty is stated as
non-destructive in the same breath as the feature. Pre-empting "where did my rows
go?" inside the description of the feature that hides them.

**No-data states on the status page** `[observed]`:
`No incidents reported today.` and `No incidents reported.` — the same adjacent
duplication as Trello and Airtable (shared platform). Coda's page **does** carry
the good pair `No downtime recorded on this day.` /
`No data exists for this day.`, plus
`No incidents or maintenance related to this downtime.` The
nothing-happened / we-don't-know distinction is present here and absent at
Airtable.

**Help-centre empty/lost state** `[observed]`: `Feeling stuck? Let's fix that!`
sits above the search box as the help centre's framing for a user with no answer
yet. And `Not sure whether you should create a new table or a new view?` is an
in-article version of the same move — naming the user's uncertainty as a heading.

**Absent** `[absent]`: no observable copy for an empty table, a zero-result
filter, an empty doc list, an empty search, an empty Gallery category, or a
first-run doc. Coda's `Doc List` is a named status component but its empty state
is post-auth. An authenticated pass is required.

## T9 Notifications & system messages

`[documented]` and thin.

**Automation is the notification-producing concept** `[observed]`. The
`Working in the canvas` scope line names "buttons, controls, automations", and
`Doc usage & navigation` contains `Create webhook-triggered automations`.
Automations and buttons are the mechanisms; no notification copy is observable.

**In-product analytics surfaces are named** `[observed]`:
`Use in-doc statistics to understand your doc` ·
`View doc and Pack metrics with My Stats` ·
`Track published docs with Google Analytics`.

`My Stats` is a coined possessive surface name for a creator's own analytics —
first person singular, which is unusual (compare Trello's second-person
`Your Items`). For a product whose users publish to a public Gallery, `My Stats`
addresses the maker-as-author rather than the maker-as-employee.

**`Row Activity`** — "How to view activity details about rows in your tables" —
is the per-object change feed. Named as a noun, at row granularity.

**Status-page notification copy** `[observed]`, Atlassian Statuspage defaults
with Coda-specific consent text:

- Email: "whenever Coda **creates**, **updates** or **resolves** an incident"
- SMS: "whenever Coda **creates** or **resolves** an incident"
- Slack: "incident updates and maintenance status messages"
- Four channels offered (email, SMS, Slack, Atom/RSS) — **no Twitter/X block**,
  unlike Trello and Airtable

Consent text points at `coda.io/trust/privacy` and uses both `agree` (email, SMS)
and `acknowledge` (Slack) for the same document — the same verb inconsistency
recorded at Airtable, since it is platform-generated.

`Message and data rates may apply.` present. `OTP` unglossed, as on the other
two Statuspage instances.

**The rebrand banner is itself a persistent system message** `[observed]`, and
it appears twice per page in the extracted DOM (responsive duplicates):

> `Coda is now Superhuman Docs: The best place for teams and AI to work together.
> → Learn More`

And an in-page interstitial:

> `Coda is now Superhuman Docs!`
> "Much more than a name change, Superhuman Docs evolves Coda into the best place
> for teams to collaborate with AI, along with enterprise-ready databases, new AI
> Views, and so much more."

`Much more than a name change` is the notable phrase — it opens by denying the
reading the user will default to. Naming and refuting the cynical interpretation
in the first four words of a rebrand announcement is a defensible move; whether
the rest of the sentence earns it is another matter (`and so much more` is
filler, and `new AI Views` names a feature the harvested product pages never
mention).

## T10 Disclosures, legal & compliance

**Weakest evidence category in this file, because the pricing page was blocked.**
No plan names, prices, seat definitions, limits, or billing disclosures were
observable. What is `[observed]`:

**The pricing claim exists only as a negation** `[observed]`:
"Charging per seat doesn't sit well with us. We price Coda differently to erase
the limits that hinder expanding teams." and "See why we don't charge per seat
and how the savings can add up."

Coda tells the user twice what it does not charge for and never, on any reachable
page, what it does charge for. The positive statement of the model lives behind
the blocked redirect. Recorded as a **structural finding, not just a harvest
gap**: a differentiator stated purely as a negation puts the entire explanatory
burden on one page, and if that page fails the claim becomes unverifiable.

**Named billing/limit articles** `[observed]`, the full seven-article category:
`Billing and pricing basics` · `Upgrade your Coda workspace` ·
`Discounts for students, teachers, nonprofits, and startups` ·
`Doc limits on Free plan` · `Downgrade your Coda workspace` ·
`Coda's affiliate program moves to Grammarly` · `Manage your billing account`.

`Doc limits on Free plan` — the limit is scoped to the *doc*, not the user, the
workspace, or the record count. Consistent with a per-doc rather than per-seat
model, and the only public confirmation of what the metered unit is.

`Discounts for students, teachers, nonprofits, and startups` bundles four
concession audiences into one article, where Airtable gives each its own plan.
`startups` as a discount category is the distinctive inclusion.

`Coda's affiliate program moves to Grammarly` is a **programme-migration notice
published as a help article** — the corporate-ownership change surfaced where an
affected user would look, rather than in a blog post. Same instinct as Trello's
`Cloud Terms of Service - Summary of Changes`.

**Trust Center IA — four pillars, each with a scope line** `[observed]`:

| Pillar | Scope line |
|---|---|
| `Privacy` | "Read about our robust data protection and compliance with privacy regulations." |
| `Security` | "Explore enterprise-grade features that enable control, visibility, and flexibility." |
| `Reliability` | "Read about our availability and business continuity commitments." |
| `Legal` | "Terms of Service, plus other contractual commitments and policies." |

Framing sentence: "This Trust Center provides transparency into our practices and
procedures, showcasing our dedication to protecting your data and ensuring the
smooth operation of our services."

`Reliability` as a **peer of Privacy and Security** is the notable structural
choice — uptime and business continuity treated as trust commitments rather than
as an SLA appendix. Its two sub-items are:

- `Uptime and availability` — "We have a **99.9% uptime commitment to Enterprise
  customers**, and provide real-time and historical platform status transparency."
- `Business continuity` — "We use daily backups, cross-regional backups, and
  recovery procedures for restoring services in the event of unavoidable
  failures."

The uptime number is **explicitly bounded to one plan tier** in the same sentence
that states it — "to Enterprise customers". Most trust pages state a figure and
leave the entitlement implicit. And `unavoidable failures` is an unusually frank
noun phrase for a continuity statement; it concedes that some failures cannot be
prevented before describing the response.

**Security sub-pillars are layered by stack position** `[observed]`:
`Product security` ("enterprise-grade product security features for more control,
visibility, and flexibility") · `Application security` ("processes, tooling, and
practices to continuously design and develop secure software") ·
`Infrastructure security` ("built from the ground up using security best
practices") · `Compliance` ("adhere to global privacy laws and security standards
with measures in place to help you meet **your** compliance obligations").

The Compliance line is the well-written one: it positions Coda's compliance as
**instrumental to the customer's own obligations** rather than as an achievement.
"help you meet your compliance obligations" is the sentence an enterprise buyer
needs.

**Legal document inventory, each with a one-line gloss** `[observed]`:
`Terms of Service` ("the agreement between users and Coda") ·
`Developer terms` ("usage of developer tools and platform") ·
`Data processing addendum` ("how data is processed by our data processors") ·
`Publishing policies` ("Content policies for Packs, published docs, and other
user content on Coda") · `Pack ecosystem terms` · `Subprocessor list`
("including data shared and location") · `Referral program terms`.

Seven legal documents each given a plain-language purpose line. `Subprocessor
list` glossed as "including data shared and location" tells the reader what they
will find before they click — the right gloss for a document nobody wants to
read. `Publishing policies` existing at all is a consequence of the Gallery:
a productivity tool that hosts public user content needs content policy, and Coda
files it under Legal rather than under Community.

**Privacy links are inconsistent across one footer** `[observed]`:
the footer's `Privacy` points at `superhuman.com/legal/privacy-policy`; the Trust
Center's `Privacy statement` points at `coda.io/trust/privacy`; the status page's
consent text points at `coda.io/trust/privacy`. **Two privacy policies reachable
from adjacent surfaces of one product**, on two different domains. A material
defect on a compliance-relevant link, and a direct consequence of the
mid-rebrand state.

`Your Privacy Choices` in the footer points at `coda.io/trust/cookies` while the
Trust Center's own cookie link is `coda.io/trust/cookie-notice` — a third
near-duplicate path.

## T11 Help-centre architecture

**The defining finding: Coda is running two public help centres simultaneously,
on one domain, with the same taxonomy and different content.**

| | Legacy | Current |
|---|---|---|
| Path | `help.coda.io/en/` | `help.coda.io/hc/en-us` |
| Platform | Intercom-style | Zendesk |
| Article URL | `/en/collections/1908866-tables-and-views` | `/hc/en-us/categories/37412217582221-Tables-and-views` |
| Chrome | `All Collections` breadcrumb, counts, **article descriptions in the listing** | `Skip to main content`, `Guides` / `Formula Library` / `All resources` nav, `Sign in` |
| Footer | — | `© 2026 Coda. All rights reserved.` |
| Tables and views count | **42 articles** | **43 articles** |

Both are live, both are linked from production (`coda.io` footer links to
`help.coda.io/en/`; the nav links to `help.coda.io/`), and the counts disagree.
Recorded as the most significant content-ops defect in this file.

**Worse: the current help centre's internal links point at the vendor's
subdomain.** Inside the live `Overview: Tables` article, roughly twenty inline
links resolve to `coda-docs.zendesk.com/hc/articles/<id>` rather than
`help.coda.io/hc/en-us/articles/<id>`. The page the user is reading is served
from `help.coda.io`; every link out of it leaves for the Zendesk-branded domain.
This is the same class of defect as Airtable's `document360.io` leak but at
much greater scale — it is the article's entire link graph, not one stray link.

**The legacy help centre is nonetheless the more useful artefact for content
work**, because its category listings carry each article's description. That
format — title plus one-line description, grouped under named sections — makes
the whole category readable at a glance and is worth noting as a help-centre
pattern in its own right. Sample from `Tables and views`:

- `Overview: Tables` — "Like spreadsheets and databases, tables allow you to organize your data. Get familiar with table basics here."
- `Summarize table data` — "Learn how to use Coda's table summary feature… count rows, list rows, summarize columns, and more."
- `Group your table data` — "Organize data by bundling common column values via grouping."
- `Add, select, and delete rows` — "Rows are the core of any table. Learn how to add new ones, and select, expand, or delete existing ones."
- `Create custom table views` — "A view is a mirror of a table that you can visualize however you want."
- `Creating user-specific views` — "Learn how the User( ) formula lets you dynamically customize views for every team member and stakeholder"
- `Subtables: display related row references as a table` — "Add subtables… Learn about when to use subtables and how to create them."
- `Filter tables via the filter bar` — "…create convenient personal filters that anyone can use without disrupting their collaborators"

Two observations on the descriptions. Several **repeat the definition** rather
than describing the article (`A view is a mirror of a table…`), so the listing
doubles as a glossary — a user scanning the category learns the object model
without opening anything. And several name the **social consequence** of a
feature: `without disrupting their collaborators` is why personal filters exist,
stated in a one-line description.

**Article-title grammar — five shapes** `[observed]`:

| Shape | Examples |
|---|---|
| Imperative + object (dominant) | `Summarize table data`, `Group your table data`, `Wrap text in a table`, `Reduce the size of your doc`, `Share your doc`, `Upgrade your Coda workspace` |
| `Overview: <Thing>` / `Overview of <thing>` | `Overview: Tables`, `Overview: Improve doc performance`, `Overview of filtering tables` |
| `Create/Add <thing>` | `Create a cards display`, `Create a timeline chart`, `Add locking to the pages of your doc` |
| Question in the user's voice | `Can I freeze or pin a column or a row?`, `How do I combine two tables into one?`, `What is the display column?`, `How do I control which columns are visible on hover previews?` |
| Gerund (minority) | `Creating user-specific views`, `Managing columns: hiding, un-hiding, and re-ordering`, `Filtering Select Lists`, `Using the Coda MCP` |

The `Overview:` colon prefix is a real convention and it is doing useful work —
it marks the entry point of a topic, so a user landing in a 43-article category
knows which article to read first. But it is applied inconsistently:
`Overview: Tables` and `Overview: Improve doc performance` use the colon while
`Overview of filtering tables` uses `of`, and `Column basics` / `Table basics` /
`Billing and pricing basics` use a `basics` suffix for the same job. **Three
conventions for "start here".**

The question-shaped titles are the interesting minority. `How do I control which
columns are visible on hover previews?` is followed by a description that is
*another, longer version of the same question* — "How can I change which columns
show up on the preview card that pops up when I hover my mouse on a row reference
or relation column?" Title and description are both questions, the second more
verbose. That is search-surface engineering (two phrasings of one query) rather
than editorial, and it is a legitimate tactic worth naming.

Casing is inconsistent throughout: `Progress Bar Column Type` and
`Filtering Select Lists` and `Canvas column type` and `Row Activity` and
`Drag-and-drop Data` and `Change Date Format in a Column` all sit in one
42-item list alongside sentence-cased titles. **At least four casing
conventions in one category.**

**Routing furniture** `[observed]`: help-centre header offers `Guides` ·
`Formula Library` · `All resources` — i.e. the help centre's top nav routes
*out* to the marketing site's learning content, and `Formula Library` is given
peer status with the help centre itself. Article foot carries
`Related resources` (6 links, one tagged `| Guide` to mark it as a different
content type) and an `On this page` in-page nav. `See all N articles` links
close each category section with the count inline.

Marking one related link `| Guide` to distinguish content types inside a
related-links list is a small, good practice.

**`Formula Library` at `coda.io/formulas`** is a third documentation surface
alongside the two help centres and the `Guides` collection — four learning
destinations, which matches the sprawl observed in the Resources nav.

## T12 FAQs

**Three FAQ surfaces, one of which is the strongest in this file.**

### A. In-article FAQ on `Overview: Tables` — 8 questions `[observed]`

Answers present in full. This is the richest FAQ block harvested for Coda.

| # | Question (verbatim) | Answer summary |
|---|---|---|
| 1 | How is a table different from a grid? | Tables hold structured data (filterable, summarisable, formula-referenceable); grids are a display layout for unstructured data and lack filters, sorts, views, and names. |
| 2 | How do I delete a table or view? | Hover → three-dot menu → `Delete`. Base tables trigger a cascade warning naming views, formulas, and automations; confirm with `Delete all`. |
| 3 | How can I see the connections between tables and views in my doc? | Use the doc map; it reveals base-table vs view status and the data connections. |
| 4 | Can I import a table? | Yes; four routes named — manual copy-paste, CSV, direct from other tools, Pack sync tables. |
| 5 | Can I export a table? | Yes; copy-paste, CSV, or whole docs/pages as PDF. |
| 6 | How can I analyze my table data? | Three routes — charts (pie, bar, word cloud), table summaries, formulas — ordered from least to most effort. |
| 7 | Can I combine two tables into one? | No built-in way; gives the crude workaround, then reframes the request as a schema problem with a worked 2023/2024 example. |
| 8 | Is it possible to lock a table? | Yes; locking covers the table and all connected views, purpose stated as preventing accidental edits or deletion. |

**Structural notes.** The eight sort into three jobs: **disambiguation** (Q1, Q3
— "which thing am I looking at?"), **destruction and reversal** (Q2, Q8), and
**data movement and analysis** (Q4–Q7). Q1 leads, and it is the right lead: the
single most confusable pair in the product (`table` vs `grid`) answered first.

Q4/Q5 are a **deliberate symmetric pair** — `Can I import a table?` /
`Can I export a table?` — adjacent, same shape, both answered `Yes` with a route
list. Pairing the in and the out is a small courtesy that answers the
lock-in question without being asked it.

Q6's answer is **ordered by effort**: charts (click), summaries (click), formulas
(write code). Ordering a route list by ascending difficulty rather than by
capability is a reader-first choice.

Q7 is the standout and is analysed in T7. Note it is the only `No` in the set,
and it is the longest answer.

### B. Trust Center FAQ — 9 questions `[observed]`

Placement: accordion at the foot of the Trust Center. **Answers are collapsed
and not present in server HTML — questions verbatim below, answers not
retrieved.**

| # | Question (verbatim) |
|---|---|
| 1 | What are your privacy controls? |
| 2 | What is your data residence and governance policy? |
| 3 | Does Coda provide real-time and historical platform status? |
| 4 | How does Coda handle authentication? |
| 5 | What security features are offered in product? |
| 6 | How does Coda keep the application secure? |
| 7 | Does Coda conduct annual penetration testing? |
| 8 | What are Coda's infrastructure security principles? |
| 9 | Does Coda encrypt data? |

**Structural notes.** Nine questions, all second-person-to-company (`your`,
`Coda`) rather than first-person-user. The ordering mirrors the page's own four
pillars: privacy (1–2), reliability (3), then security by stack layer
(4–9, running product → application → infrastructure → data-at-rest).

Q3 (`Does Coda provide real-time and historical platform status?`) is a
**closed question whose answer is a link to the status page** — an FAQ slot used
as a router. Q7 (`Does Coda conduct annual penetration testing?`) is the
procurement question written in procurement's own phrasing, cadence included.
Five of nine are yes/no questions in a security FAQ, which suits a buyer
running a checklist rather than a reader seeking understanding.

Note Q5's grammar: `What security features are offered in product?` — missing
article, and `in product` is internal jargon for "inside the application".

### C. Pricing FAQ `[absent]`

Not reachable. The pricing page 301s off-domain to an empty response, so any
pricing FAQ — which for a product whose differentiator is a non-per-seat model
would be the single highest-value FAQ block — is unharvested.

## T13 Terminology & glossary

**No public glossary article was located** (contrast Airtable). Definitions are
distributed through article bodies and listing descriptions. `[absent]` for a
consolidated glossary; the terms below are assembled from those sources.

**Core object model**

| Term | Coda's usage | The alternative it rejected |
|---|---|---|
| `doc` | The top-level container and the product's identity noun. Now also the new product name (`Superhuman Docs`) | "Document", "Page", "Base", "Workspace" |
| `page` / `subpage` | Structural divisions inside a doc — `Organize pages and subpages` | "Section", "Tab" |
| `canvas` | **The writable surface itself.** A whole help category is `Working in the canvas`; there is also a `Canvas column type` | "Editor", "Body", "Page content" |
| `table` | "the most powerful and most central building block in Coda" | "Database", "Sheet" |
| `base table` | The original table — the term exists only to contrast with `view` | "Source table", "Master table" |
| `view` | "a connected "mirror" of that base table" | "Filter", "Report", "Query" |
| `grid` | **Unstructured tabular layout** — deliberately distinguished from `table` | — this is the distinction, not a rejection |
| `row` / `column` / `cell` | Spreadsheet vocabulary retained wholesale | "record" / "field" — **the opposite choice from Airtable** |
| `subtable` | "display related row references as a table" | "Nested table", "Child table" |
| `Pack` | A named integration unit, with its own `Pack Studio`, `Pack sync tables`, `Pack ecosystem terms`, and `Pack metrics` | "Integration", "App", "Plugin" |
| `button` / `control` / `automation` | The three interactive primitives, always listed together | "Action", "Widget", "Workflow" |
| `maker` | **The core role noun.** "Everyone is a maker"; `Create your maker profile`; `Superhuman community` is at `community.coda.io` and was the "Coda Maker Community" | "User", "Creator", "Builder" |
| `Gallery` | The public catalogue of published docs and Packs | "Marketplace", "Templates", "Community" |
| `doc map` | The structural diagnostic view | "Outline", "Schema", "Dependency graph" |
| `My Stats` | A maker's own publishing analytics | "Analytics", "Insights" |
| `filter bar` | The personal-filter surface | "Quick filter" |
| `Compose` | Dynamic formatted text in a column | "Rich text formula", "Template" |
| `relation column` | Cross-table reference — **"formerly Lookups"** | "Lookup", "Link", "Reference" |
| `linked relation` | The bidirectional version | "Two-way link", "Backlink" |
| `Writeups` / `Hubs` / `Trackers` / `Applications` | The four marketing genres of doc | — coined for positioning, not product labels |

**The single most important terminology decision in this file: Coda keeps
`row` and `column` where Airtable chose `record` and `field`.** Two direct
competitors in the same sub-vertical made opposite calls on the same problem.
Coda's rationale is visible in its own copy — "Like spreadsheets and databases,
tables allow you to organize your data" — it positions *from* the spreadsheet and
so keeps the spreadsheet's nouns, then teaches the relational concepts
(`relation column`, `base table`, `view`) on top of familiar ground. Airtable
positions *as* a database and teaches the database nouns with spreadsheet glosses.
Both are internally coherent; the pair is a genuinely useful comparative exhibit
for any vocabulary decision where an incumbent category's words are available.

**`table` vs `grid` is the product's most carefully drawn distinction**
`[observed]`, and it gets an FAQ, an info callout, and a definition:

> "It's important to note that tables are different from grids. Tables contain
> structured data, which can be filtered, sorted, used in formulas, etc. Grids,
> on the other hand, are simply a layout option that allow you to display
> (unstructured) information in a tabular format."
>
> "Grids lack filters, sorts, views, table names, column names or any other
> advanced features you'll find in Coda tables."

Two things visually identical, distinguished by whether the data is structured,
and the distinction defined **by enumerating the absent capabilities**. The
parenthetical `(unstructured)` inserted mid-sentence is the load-bearing word.
This is the exact failure mode a doc-database hybrid creates — a thing that looks
like a table but is not one — and Coda names it explicitly rather than hoping
users infer it.

**`canvas` is the coinage that defines the category** `[observed]`. It names the
writable surface as a distinct object, which lets Coda say `Canvas column type`
("bringing the flexibility of Coda's canvas inside any table") and
`Filter tables via controls` ("using canvas controls"). The word makes the
doc/database recursion expressible: a canvas contains tables, and a table cell can
contain a canvas. Without the noun, that sentence cannot be written.

**`maker` as the role noun** carries real weight. It appears in the brand thesis
(`Everyone is a maker`), in a product feature (`Create your maker profile`), in
the community's name, and in the accessibility copy ("Makers can create and
interact with docs without the use of a mouse." / "with a range of disabled
makers"). Choosing `maker` over `user` commits to a claim — that the audience
builds rather than consumes — and the copy holds the line across marketing,
product, community, and accessibility surfaces. That consistency is stronger
than Airtable's `builder`/`creator`/`collaborator` split.

**Rebrand terminology instability, recorded in full** `[observed]`. As of this
harvest the following coexist on live pages:

- Product name: `Coda` (page bodies, help centre, status components, URLs) vs
  `Superhuman Docs` (banner, coda.io footer copyright, status page logo link) vs
  `Docs` (`Learn all about Docs →`)
- Feature name: `Coda AI` (nav, home page) vs `Superhuman Docs AI` (featured
  guide link text), with the URL preserving `coda-ai`
- Community: labelled `Superhuman community`, hosted at `community.coda.io`
- Corporate entity: `Coda` (help footer) vs `Superhuman Docs` (site footer) vs
  `Grammarly` (press mailto, affiliate-programme article)
- Legal: `superhuman.com/legal/notices` and
  `superhuman.com/legal/privacy-policy` beside `coda.io/trust/privacy` and
  `coda.io/trust/tos`
- Help vendor domain: `help.coda.io` serving pages whose links go to
  `coda-docs.zendesk.com`

Six distinct name-drift axes. This is a live case study in what a rebrand costs
in content debt, and it is the most valuable negative finding in this file.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout ("your doc", "you'll
find", "you may want to"). First person plural for the company, used notably in
**definitional** rather than promotional contexts: "In Coda, **we** have two types
of tables", "When **we** use the word "table," **we** could be referring to either
type", "**Our** partnership with Deque gives **us** a better understanding",
"Charging per seat doesn't sit well with **us**". The company speaks as a party to
the conversation about its own vocabulary — which is how the base-table/view
ambiguity gets admitted.

**Register.** Warm, direct, lightly enthusiastic; more human than Airtable's
help copy and less jokey than Trello's marketing. Markers:
`Creating a table is easy!` · `Sure thing - you can connect these tables via
relation columns.` · `Feeling stuck? Let's fix that!` · `Let's say you have a
table for your projects…` · `Perhaps the quickest is…` · `depending on your
style` · `ditch the hacky spreadsheets` · `file visual nits`.

`Sure thing` as the answer to a rhetorical question in a help article, and
`depending on your style` as the reason there are three ways to add a row, are
the register's two most characteristic moments. The copy assumes the reader has
preferences.

**Rhetorical questions are the dominant teaching device** `[observed]`:
`What is a table?` · `What is a view?` · `So is there a way to connect this data
across distinct tables?` · `Not sure whether you should create a new table or a
new view?` · `Feeling stuck?` · `Want to see more?` ·
`Want to know more about running your product team on Coda?`

Coda poses the user's question and then answers it, rather than asserting. That
is a doc-product voice — it reads like a well-written internal wiki, which is
exactly the artefact the product is for. **The help copy models the tone Coda
wants its customers' docs to have.**

**Punctuation as voice.** Headings end in full stops. Em-dashes used for
mid-sentence pivots ("views are personalized—and you can ditch the hacky
spreadsheets"). Emoji used as semantic markers in help articles: `ℹ️` for a
clarifying note, `💡` for a decision tip. Bold used heavily inside instructions to
mark exact UI strings (`**+New row**`, `**Delete all**`, `**Start blank**`) — a
consistent convention that makes the labels harvestable and, more importantly,
scannable for the user mid-task.

**Numbers as trust devices** `[observed]`: `50,000+ teams` (used three times),
`600+ integrations`, `99.9% uptime commitment`, `three to four hours of meetings
every week` (in a customer quote), `4 ways`, `5 ways`, `$100` (in a template
name). Fewer and smaller than Airtable's; Coda leans on named customers
(Figma, NYT, Square, Robinhood, BuzzFeed, TED, Uber, Zoom, Google, Qualtrics,
Huge) rather than on statistics.

**Accessibility content** `[observed]` — the dedicated page is one of the better
examples in this corpus, and its structure is the reusable part:

| Section | Content |
|---|---|
| Headline | `Making Coda accessible to all.` |
| Thesis | "Everyone is a maker - productive, creative, and capable of effecting change. Which is why we're working hard to make our products accessible to everyone." |
| `Why we're investing in accessibility.` | Argues from collaboration quality and diverse perspectives, not from compliance: "Collaboration is richer and more impactful when every team member can participate fully." |
| `Building the culture.` | Names an internal **`Accessibility Guild`** that "helps drive our research, product testing, roadmap and internal education / awareness building" |
| `A focus on usability and compliance.` | **Two named external partners with distinct roles** — one for usability testing "with a range of disabled makers", one for standards conformance against `WCAG 2.2 AA` |
| `Some of the work.` | Three shipped improvements, each with the benefit stated |
| Close | `Learn more about Coda's accessibility effort.` → "Reach out below to get answers to specific questions or better understand our roadmap." → `Contact us.` |

Four things make this strong. **The usability/compliance split is named and
staffed separately** — one partner tests whether disabled people can actually use
the product, another measures conformance to a standard. Stating that these are
different problems, with different vendors, is more informative than any VPAT
claim. **The internal structure is named** (`Accessibility Guild`) with its four
remits listed. **The three shipped improvements are described by who benefits**,
not by what was built:

- `Alt text for images` — "Customers using various assistive technologies can
  interpret imagery."
- `Dark mode` — "Improved visibility for users with certain visual impairments."
- `Navigating via keyboard` — "Makers can create and interact with docs without
  the use of a mouse."

Note the third uses `Makers` and frames the outcome as *creating*, not just
*accessing* — consistent with the thesis, and a higher bar than "the site is
navigable by keyboard". **And the close offers roadmap conversation**, not just
bug reporting: "get answers to specific questions or better understand our
roadmap." Offering to discuss the accessibility roadmap is a commitment few
statements make.

Weaknesses: the page is illustration-heavy prose with **no ACR/VPAT download or
request address**, no conformance date, and no feedback form (the `Contact us.`
CTA routes to the general help centre). Airtable's statement is thinner in
argument but stronger in artefact.

**Alt text** `[observed]`: the accessibility page's own illustrations carry
genuinely descriptive alt —
"A laptop with an eye on the screen, connected to a tablet with audio waves on
the screen connected to a smartphone with an ear hearing audio on the screen.",
"Two hands shaking with confetti dropping down over the them.",
"Layered puzzle pieces with ladders between them and small human figured climbing
the ladders.", "Company logos for Coda, Fable and Deque."

These describe composition and content at real length — among the best alt text
in this corpus. Note two typos inside it: `over the them` and
`small human figured climbing`. Customer logos carry alt (`Figma logo`,
`The New York Times logo`). But the home page's template thumbnails, use-case
videos, and most feature imagery carry **empty or missing alt**, and one logo
carries the alt text `fallback` — a placeholder string shipped as alt text.
So: exemplary on the accessibility page, patchy everywhere else.

`Skip to content` present on `coda.io`; `Skip to main content` on
`help.coda.io` — two strings for one affordance across two domains. The
help-centre `Sign in` link is annotated `"Opens a dialog"`, which is correct
practice and worth noting.

**Negative findings, recorded honestly**

- **Rebrand collision**: `Coda` / `Superhuman Docs` / `Docs` / `Grammarly` all
  live; six distinct drift axes (see T13)
- **Two live help centres** on one domain with the same taxonomy and
  disagreeing article counts (42 vs 43 for `Tables and views`)
- **Vendor-domain link leak at scale**: ~20 inline links in the live
  `Overview: Tables` article resolve to `coda-docs.zendesk.com`
- **Two privacy policies** reachable from adjacent surfaces
  (`superhuman.com/legal/privacy-policy` and `coda.io/trust/privacy`), plus a
  third cookie path variant (`/trust/cookies` vs `/trust/cookie-notice`)
- **Pricing page 301s off-domain and returns an empty body** — the page carrying
  the product's stated differentiator is unreachable without JS
- `[/welcome]` renders as visible link text in the nav — a **URL path shipped as
  a label**, the same class of defect as Trello's leaked `Hero`
- `/welcome` serves a byte-identical page to `/` with a canonical pointing back
  to `/` — a duplicate page with no distinct content
- `Request a demo` (→ `superhuman.com`) and `Contact sales` (→ `coda.io`) are two
  labels, two destinations, two domains, one user intent
- One template card carries three CTAs: `Preview`, `Preview this template`,
  `Start using this template`
- `Learn More` title-cased in the site-wide banner against sentence-case house
  style; also a bare `Browse` with no object
- `Interactive sessions` labels a page routed at `/webinars/training-recordings`
  — "sessions" implies live, "recordings" does not
- Featured guide reads `Get started with Superhuman Docs AI`, routes to
  `how-to-get-started-with-coda-ai`, and sits beside a nav item still called
  `Coda AI`
- Footer `Contact support` is **plain text with no link**
- Double space in `running your  product team on Coda?` and two other instances
- `Read the handbook` present for three of six team sections, absent for three
- `Skip to content` vs `Skip to main content` across the two domains
- `Overview:` / `Overview of` / `X basics` — three conventions for "start here"
- At least four casing conventions in one 42-item help category
  (`Progress Bar Column Type`, `Canvas column type`, `Row Activity`,
  `Drag-and-drop Data`, `Change Date Format in a Column`, `Filtering Select Lists`)
- `How do I combine two tables into one?` is the only description-less entry in
  a 42-item listing
- Alt text typos on the accessibility page (`over the them`,
  `small human figured climbing`); one home-page image with alt text `fallback`
- Status page component names are engineering-facing (`ecr`, `eks`, `kms`,
  `elasticache`) — thirty rows to find `Docs`
- Trust FAQ Q5: `What security features are offered in product?` — missing
  article, internal jargon (`in product`)
- `OTP` unglossed on the status page; `agree` and `acknowledge` used
  interchangeably in adjacent consent lines
- Rebrand banner duplicated in the DOM (responsive variants), so screen-reader
  users may encounter it twice — flagged as suspected, not confirmed

---

## Transferable patterns

1. **Admit your own noun is ambiguous, in the definition.** "When we use the word
   "table," we could be referring to either type." Then say which one the user
   gets by default. Any product with an overloaded term — "account", "payment",
   "order", "case" — is better off flagging the overload once than letting every
   user discover it. Condition: only works if you then supply the disambiguating
   tool (Coda's `doc map`).
2. **Put the blast radius in the confirm button.** `Delete all`, not `Delete`,
   for a cascade that destroys dependent views, formulas, and automations — with
   the warning enumerating the dependent *types*. Directly applicable to account
   closure, key revocation, bulk cancellation, and any delete with downstream
   objects.
3. **`Replaces` + logos.** One transitive verb above a row of competitor marks,
   under each coined product genre. Makes a new noun legible by displacement and
   states the competitive claim without a sentence. Condition: requires real
   displacement, and invites a response.
4. **Let a third party make the comparative claim, then supply the verification
   tool.** The *Fast Company* quote names three competitors; `Compare Coda` sits
   beneath it. A claim the first person cannot make credibly.
5. **Name the user's uncertainty as the heading, then link a guide for that one
   decision.** "Not sure whether you should create a new table or a new view?"
   pointing at a guide whose only job is that choice, surfaced at the decision
   point. Applies wherever a product forces an early, hard-to-reverse modelling
   choice.
6. **Refuse → workaround → reframe → worked example.** The
   `Can I combine two tables into one?` answer gives the honest no, the crude
   workaround, a diagnosis that the question signals a schema problem, and a
   concrete 2023/2024 case. The best structure in this harvest for a
   "you're asking the wrong question" answer.
7. **State the symptom of the mistake, not just the rule.** "Make sure to ungroup
   your columns before sorting - otherwise the sort will be applied to the items
   within each group rather than rearranging the entire table." The user can
   recognise the failure they are already looking at.
8. **Define by enumerating absent capabilities.** "Grids lack filters, sorts,
   views, table names, column names…" — how to distinguish two visually identical
   objects. Better than adjectives.
9. **Derive the accessibility commitment from the product thesis.** "Everyone is a
   maker… Which is why we're working hard to make our products accessible to
   everyone." And split the usability partner from the conformance partner, naming
   both. Stronger than a standards claim alone.
10. **Parenthetical intensifier in a headline.** `Collaboration costs (much) less
    in Coda.` Raises the claim while marking it as an aside; the sentence survives
    without it.
11. **Pair the import and export questions, adjacently, same shape.**
    `Can I import a table?` / `Can I export a table?` answers the lock-in question
    without being asked it.
12. **Counter-example to carry forward: a differentiator stated only as a
    negation.** "We don't charge per seat" appears on every reachable page; what
    Coda *does* charge for appears on none. When the positive statement lives on
    exactly one page, a broken redirect makes the entire claim unverifiable.
13. **Counter-example: the cost of a rebrand in content debt.** Six live
    name-drift axes, two help centres, two privacy policies, and a vendor-domain
    link graph. Useful as an exhibit for why a rename needs a content inventory,
    not just a logo swap.

## Caveats & gaps

- **The pricing page is blocked, and it matters more here than for any other
  product in this batch.** `coda.io/pricing` 301s to
  `superhuman.com/plans/docs`, which returned a 200 with an essentially empty
  body (a GTM noscript tag only). No plan names, no prices, no seat or doc
  definitions, no limits, no billing disclosures, and no pricing FAQ were
  captured. Since Coda's headline differentiator is an explicitly non-per-seat
  model, T10 and T12 are materially incomplete and no claim about Coda's pricing
  *model* should be drawn from this file beyond the negation quoted in T2. Per
  instruction, no alternative retrieval route was attempted.
- **Product is mid-rebrand**, so any string in this file may be superseded
  shortly. Where a name is unstable it is recorded on all its live variants
  rather than normalised. Strings attributed to `coda.io` may be replaced by
  `superhuman.com` equivalents; the help centre appears to be lagging the
  marketing site.
- **Two help centres were harvested and are treated as one corpus.** Where a
  string could come from either, the source URL is given. Article counts differ
  between the two indexes; the legacy index's counts are quoted in T1 and the
  discrepancy is flagged. It is not determinable from the public surface which
  is authoritative.
- **No public glossary exists**, so T13 is assembled from article bodies and
  listing descriptions rather than from a single authored source. Definitions
  quoted are the product's own words but were not collected in one place by
  Coda.
- **All in-product empty states are absent.** No empty table, empty doc, empty
  doc list, zero-result filter, or first-run canvas copy was observable. T8 rests
  on the creation-choice triad, the filtering gloss, and the status page. The
  flagged strength (document-building onboarding) is well evidenced for
  *instruction* and poorly evidenced for *empty states*.
- **No observed in-product validation, toast, or confirmation strings** beyond
  the delete-cascade warning, which is `[documented]` via a help article rather
  than observed.
- **~12 of ~240 help articles were opened or listed in detail.** Six of the
  eleven categories were not entered (`Working in the canvas`,
  `Import and export`, `My Coda account`, `Workspace management`,
  `Enterprise org administration`, `Integrating with Packs`, `Formulas`).
  `Working in the canvas` in particular would strengthen T4 and T5 materially,
  since it covers buttons, controls, and automations.
- **Status page was incident-free during harvest.** All 15 visible days read
  `No incidents reported.`, so no live incident copy — impact statements,
  `Investigating`/`Identified`/`Monitoring` update headers, postmortems — was
  observable. Only component-state vocabulary and null states were captured.
  `Incident History` was not fetched.
- **Trust Center FAQ answers not captured** — the nine questions are in server
  HTML, the answers are accordion-collapsed and client-rendered.
- **Template gallery not fetched.** `coda.io/gallery` was not retrieved; the 24
  template names and descriptions in this file come from the home page. The
  Gallery is Coda's public user-content surface and would carry a distinct
  content type (maker-authored doc titles and descriptions) unrepresented here.
- **Comparison pages not fetched** (`vs Notion`, `vs Confluence`, `vs Quip`,
  `vs Airtable`). These would be the richest source of Coda's own competitive
  vocabulary and are a notable gap given that `Compare` is a nav group.
- **`coda.io/formulas` (Formula Library) not fetched** — a fourth documentation
  surface that would materially extend T5 and T13.
- **No published design system or content style guide was located** for Coda.
  The voice observations in T14 are inferred from the copy, not checked against
  stated rules.
- **Locale is en-US only.** Help paths carry `/en/` and `/en-us/`, implying
  localisation capacity, but no locale switcher was observed and no other locale
  was sampled.
- **Mobile app strings not harvested** (iOS and Android apps exist per footer).
- Alt-text and DOM-duplication findings are flagged as **suspected**, based on
  text extraction rather than DOM or assistive-technology inspection.
- Status-page chrome, `No incidents reported.` strings, and the OTP/consent copy
  are **Atlassian Statuspage platform defaults**, shared with Trello and Airtable
  in this batch; only the component list and the privacy-link targets are
  Coda-authored.

## Sources

1. https://coda.io/
2. https://coda.io/welcome
3. https://coda.io/pricing — attempted; 301 to https://superhuman.com/plans/docs, which returned an empty body (blocked)
4. https://help.coda.io/en/
5. https://help.coda.io/hc/en-us
6. https://help.coda.io/en/collections/1908866-tables-and-views
7. https://help.coda.io/hc/en-us/articles/39555768266893-Overview-Tables
8. https://help.coda.io/hc/en-us/categories/39555711978253-Doc-management
9. https://help.coda.io/hc/en-us/categories/37412210092941-Billing-and-pricing
10. https://help.coda.io/hc/en-us/categories/39555174184077-Sharing-your-docs
11. https://status.coda.io/
12. https://coda.io/product/accessibility
13. https://coda.io/trust
