# 186. Jira

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | Issue tracking and agile planning / configurable enterprise work-management |
| Primary URL | https://www.atlassian.com/software/jira |
| Corpus rank | 186 |
| Benchmark strength (source list) | Issue and workflow states |
| Locale / market observed | en-US (`English▾` locale switcher present in the atlassian.com footer; design system mandates US English) |
| Platform observed | Web (marketing — largely un-retrievable), Data Center product documentation on `confluence.atlassian.com`, the Atlassian Design System, the developer REST reference, Statuspage, the developer community |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for the product surface. FedRAMP and Trust Center links present in the global nav; `Notice at Collection` (CCPA) and `Impressum` (German law) in the footer |
| Harvest date | 2026-09-22 |
| Pages inspected | 13 retrieved, 3 blocked |
| Harvest completeness | **Partial — the marketing surface is effectively blocked.** `www.atlassian.com` product and pricing pages are client-rendered and return only `<head>` metadata and global nav to a server-side fetch. `support.atlassian.com` (the Cloud help centre) returns an empty body entirely. The **workflow-state content that is the priority for this file was fully retrievable** from Jira Data Center documentation on `confluence.atlassian.com`, and the Atlassian Design System content guidance was retrievable at its current URLs. Cloud-specific in-product strings, pricing figures, and the Cloud help IA are missing. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Jira product page | https://www.atlassian.com/software/jira | **Body not rendered.** Only `<head>` metadata retrievable — title, meta description, og tags |
| Jira pricing | https://www.atlassian.com/software/jira/pricing | **Body not rendered.** Plan names recoverable from the `<title>` only |
| Agile tutorial: workflows | https://www.atlassian.com/agile/tutorials/workflows | Body not rendered; **global nav and footer fully retrievable** — the source for T1 |
| Docs: Issue fields and statuses | https://confluence.atlassian.com/adminjiraserver/issue-fields-and-statuses-938847116.html | Field inventory, issue types per application, priorities, **resolutions** |
| Docs: Working with workflows | https://confluence.atlassian.com/adminjiraserver/working-with-workflows-938847362.html | **The status-vs-resolution explanation**, default workflow, transitions, drafts, designer |
| Docs: Defining status field values | https://confluence.atlassian.com/adminjiraserver112/defining-status-field-values-1688896787.html | **Status categories** (`To Do` / `In Progress` / `Done`) and the `Add Status` form labels |
| Docs: Configuring issue-level security | https://confluence.atlassian.com/adminjiraserver/configuring-issue-level-security-938847117.html | Security-level vocabulary, role names, `None` semantics |
| ADS: Voice and tone | https://atlassian.design/foundations/content/voice-tone | Three personality traits, six voice-and-tone principles |
| ADS: Style, grammar, and punctuation | https://atlassian.design/foundations/content/language-and-grammar | The full writing style guide — ~30 rules with Do/Don't pairs |
| ADS: Error messages | https://atlassian.design/foundations/content/designing-messages/error-messages | Error-title, body and CTA rules; the "avoid please and sorry" rule |
| Developer REST reference (nav) | https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses/ | Body client-rendered; **API resource names retrievable from nav** and they still say "Issue" |
| Developer community announcement | https://community.developer.atlassian.com/t/work-is-the-new-collective-term-for-items-tracked-in-jira/88552 | **The `issue` → `work item` rename**, rationale, FAQ, and partner pushback |
| Atlassian Status | https://status.atlassian.com/ | Status-hub model, per-product status pages, incident history |
| **BLOCKED** | https://atlassian.design/content/writing-style | Returns HTTP 200 with an **empty body** — no content, no redirect, no 404 page |
| **BLOCKED** | https://atlassian.design/content | Same — empty body |
| **BLOCKED** | https://support.atlassian.com/jira-software-cloud/docs/what-are-issue-statuses-priorities-and-resolutions/ | Returns an empty body; the entire Cloud help centre is unreachable this way |

---

## T1 Navigation & IA labels

`[observed]` — from the one atlassian.com page whose nav rendered.

**Global nav — five items, and the product menu is segmented by role** `[observed]`

`Products` · `Solutions` · `Why Atlassian` · `Resources` · `Enterprise` · `More +`,
with `Get it free` · `Search` · `Sign in`.

`Products` is split into six audience tabs — `Featured`, `Developers`,
`Product Managers`, `IT professionals`, `Business Teams`, `Leadership Teams` — and the
**same product appears under different names and different URLs depending on the tab**:

- Under `Featured`: `Jira` — "Flexible project management" → `/software/jira`
- Under `Developers`: `Jira` — "Flexible project management" → `/software/jira/dev`
- Under `Product Managers`: `Jira` — "Flexible project management" → `/software/jira`

Same label, same descriptor, two destinations. The audience segmentation is carried
entirely by URL, not by copy — so a reader who switches tabs sees an identical card and
lands somewhere different. Recorded as a navigation-content defect.

**Product descriptors are terse noun phrases** `[observed]`:
`Jira` "Flexible project management" · `Confluence` "Knowledge, all in one place" ·
`Jira Service Management` "Deliver service at high velocity" ·
`Bitbucket` "Source code and CI/CD" · `Rovo Dev` "Agentic AI for developers" ·
`Pipelines` "Scalable CI/CD automation" · `DX` "Measure productivity and AI impact" ·
`Jira Product Discovery` "Capture & prioritize ideas" · `Guard` "Enhanced cloud security" ·
`Trello` "Capture and organize your tasks" · `Loom` "Quick, async video updates" ·
`Customer Service Management` "Customer experiences reimagined" ·
`Focus` "Enterprise-scale strategic planning" · `Talent` "Knowledge workforce planning" ·
`Align` "Enterprise-wide work planning & value".

**Defect:** `Capture & prioritize ideas` and `Enterprise-wide work planning & value` use
`&` — which Atlassian's own design system explicitly forbids: "Don't use 'e.g.', 'i.e.',
'etc.', or '&' as they're not localization friendly and can be confusing for users of
assistive technologies." Two violations in the nav of the company's own homepage.

**`Atlassian Collections` — a named bundling concept with a value line each** `[observed]`:
`Teamwork Collection` "Supercharge teamwork seamlessly" (Jira, Confluence, Loom) ·
`Strategy Collection` "Optimize strategy and outcomes confidently" (Focus, Talent, Align) ·
`Service Collection` "Deliver service at high-velocity" ·
`Software Collection` "Ship high-quality software fast" ·
`Product Collection` "Build products with confidence".

**Defect:** `Deliver service at high velocity` (product descriptor, unhyphenated) vs
`Deliver service at high-velocity` (collection descriptor, hyphenated) — the same phrase,
two hyphenations, in adjacent nav panels. The design system's own hyphen rule
("If a noun is described by 2 or more words, use a hyphen … don't add a hyphen after
adverbs ending in -ly") makes the unhyphenated version correct here.

**`Solutions` is a four-axis matrix** `[observed]`: `By Use Case` · `By Team` · `By Size` ·
`By Industry`, with `Enterprise`, `Small Business`, `Startup` and `Non-profit` under Size.

**`Why Atlassian` carries the company's own coined frameworks** `[observed]`:
`System of Work` — "Atlassian's blueprint for how teams work together" ·
`Ecosystem` `New` — "Connect tools, teams, and agents into one intelligent system of work" ·
`Marketplace` · `Customers` · `FedRAMP` · `Resilience` · `Platform` · `Trust center`.

**`Resources` splits into a link set plus two sub-columns**, `Support` and `Resources`
(so `Resources` contains a group also called `Resources` — a self-nesting label).

**Footer groupings** `[observed]`: an unnamed company column (`Company`, `Careers`,
`Events`, `Blogs`, `Investor Relations`, `Atlassian Foundation`, `Press kit`,
`Contact us`) then `Products`, `Resources`, `Learn`. Legal row:
`Privacy policy` · `Notice at Collection` · `Terms` · `Impressum`, plus `English▾`.

**Documentation IA** `[observed]` on `confluence.atlassian.com`. The Jira Data Center
admin documentation is a Confluence space rendered through Scroll Viewport, with a
version selector listing **eighteen product versions plus "See all"** in the left rail of
every page. Publishing an eighteen-deep version picker above the article body is an
unusual IA decision and a real cognitive cost, but it is honest about a Data Center
product's support matrix.

Breadcrumb shape: `Atlassian Support / Administering Jira applications 11.3 /
Documentation / Configuring projects / Working with workflows`.

**Defect:** the breadcrumb root reads `Atlassian Support` and links to
`support.atlassian.com`, while the H1 above it reads
`Administering Jira applications Support` and the page title suffix reads
`Atlassian Documentation`. Three names for the destination in one header.

## T2 Value proposition & headline patterns

`[observed]`, but **only from `<head>` metadata** — the rendered hero was not retrievable.

**Three different titles ship for one page** `[observed]` on `/software/jira`:

| Slot | String |
|---|---|
| `<title>` | `Jira \| Project Management for the AI Era \| Atlassian` |
| `og:title` / `twitter:title` | `Jira: Project Management for the AI Era` |
| `meta-description` | "Jira brings teams together to reach the next level of productivity with AI agents that orchestrate, plan, and track projects at scale." |
| `og:description` | "Elevate your team's productivity with Jira. AI agents orchestrate, plan, and track projects at scale — project management for the AI era." |

Pipe-separated vs colon-separated versions of the same headline, and two distinct
descriptions. A reader sees one in a browser tab, another in a Slack unfurl, a third in a
search result.

**Defect, and a notable one:** `meta-twitter:description` on the product page is
truncated mid-word — `Elevate your team` — so the Twitter/X card ships a fragment.

**The pricing page is worse.** `<title>` says
`Jira pricing: Free, Standard, Premium, Enterprise \| Atlassian`; `og:title` says
`Jira Pricing: Choose Your Jira Plan \| Atlassian` (Title Case, in violation of the
design system's sentence-case rule); `meta-description` says "Compare Jira plans and
pricing. Every paid plan includes AI agents that plan, track, and move work forward, built
in and ready to scale with your team."; and `og:description` says
"Explore Jira pricing for Cloud, **Server**, and Data Center options." — **`Server` is a
deployment option Atlassian ended support for in February 2024.** A stale product line
is still being advertised in the social-share description of the live pricing page.

**Plan names, recoverable from the `<title>` only** `[observed]`:
`Free` · `Standard` · `Premium` · `Enterprise`. Prices were not retrievable.

**Section headings that did render** `[observed]`, from the lower "Recommended for you"
block on the tutorials page:
`Ready-made Jira templates` ("Browse our library of custom Jira templates for various
teams, departments, and workflows.") · `A comprehensive introduction to Jira` ·
`Understanding the Basics of Git`.

**Defect:** `Understanding the Basics of Git` is Title Case *and* a gerund — two
simultaneous violations of the design system's heading rules
("Use sentence case", "Avoid gerunds (the 'ing' form of verbs)").

`Ready-made Jira templates` sits directly above `A comprehensive introduction to Jira`,
which is correct sentence case. **Within one three-card block Atlassian ships both
conventions.**

## T3 CTA inventory

`[observed]` from the rendered nav and footer; `[documented]` for in-product controls.

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get it free` | Global nav, primary | |
| `Sign in` | Global nav | |
| `Search` | Global nav | |
| `More +` | Global nav overflow | A `+` glyph inside a nav label |
| `See all apps` | Products panel | Uses `apps`; the footer says `See all products` |
| `See all products` | Footer | **Two labels for the same destination concept** |
| `See all resources` | Footer | |
| `Go to Jira templates` | Recommended block | Destination-named |
| `Go to Jira Product guide` | Recommended block | |
| `Read More` | Git guide card | **Title Case, and bare** — the only vague CTA in the set, and the only one in Title Case |
| `Learn more and get support ->` | Data Center end-of-life banner | Ships a literal ASCII arrow `->` rather than an arrow glyph |
| `Create support ticket` | Footer | |
| `Skip to content` | First in DOM | Accessibility, present |
| `Ask the community` | Foot of every documentation page | |
| `Provide feedback about this article` | Foot of every documentation page | |
| `Yes` / `No` | Documentation, under `Was this helpful?` | |
| `It wasn't accurate` / `It wasn't clear` / `It wasn't relevant` | Documentation, revealed after `No` | **A three-option negative-feedback taxonomy** — see T9 |
| `Add workflow` / `Add` | Documented, workflow admin | |
| `Copy` | Documented, Workflows list `Actions` column | Both the link label and the confirm-button label |
| `Publish` | Documented, draft workflow | |
| `Delete` | Documented, workflows and statuses | |
| `Add status` | Documented, Statuses admin | |
| `Add issue security scheme` / `Add security level` | Documented, security admin | |
| `Associate` | Documented, scheme-to-project binding | A single technical verb as a button label |
| `Update` / `Cancel` | Documented, scheme editing | |
| `Allow all statuses to transition to this one` | Documented, workflow designer status panel | **A thirteen-word control label** — see T5 |
| `Change default security level to "None"` | Documented, security levels page | Quotes a value inside a link label |
| `Unusable` / `Poor` / `Okay` / `Good` / `Excellent` | Developer docs, `Rate this page:` | A five-point scale exposed as five button labels |

**Observation.** The marketing CTA set could not be harvested, but the documentation and
admin CTA set is visible and it is **noun-and-verb-terse to the point of opacity**:
`Associate`, `Copy`, `Publish`, `Add`. `Associate` in particular is the kind of label that
only makes sense once you already hold the object model — the button is named after the
database relation, not the user's goal. Contrast the design system's own rule:
"use imperative verbs such as 'Save', 'Remove', or 'Create' … to describe what action
people will be making instead of vague terms such as 'OK'." `Associate` is imperative but
it is not, in any ordinary sense, an action a person performs.

## T4 Onboarding & getting-started

`[observed]` / `[documented]`. The Cloud onboarding surface was not retrievable.

**The documented first-run path for a workflow is unusually well written** `[documented]`:

> "The workflow opens in edit mode, and contains a step called **Open** and an incoming
> transition called **Create**."

One sentence that gives a new admin the entire minimal state machine: one status, one
transition into it. `Create` as the name of the transition that brings a work item into
existence is the neatest naming decision in the product — the transition and the user's
verb are the same word.

**The default-project path is described as a set of automatic consequences**
`[documented]`, which is the right shape for a destructive-feeling first edit:

> "As you enter the edit mode, Jira automatically does the following: creates a draft copy
> of the system workflow named "*Your Project Name* Workflow (Draft)" / creates a new
> workflow scheme for the workflow named "*Your Project Name* Workflow Scheme" /
> associates any existing issues in your project with the new workflow"

**Naming templates are published**: `<Project Name> Workflow (Draft)` and
`<Project Name> Workflow Scheme`. Publishing the generated-name pattern means an admin can
predict what will appear in a list of forty workflows. Small, and genuinely useful.

**A performance warning written as a bounded, irreversible caution** `[documented]`:

> "The number of issues impacts the speed when configuring a workflow. For small numbers
> of issues, this process is relatively quick. However if you have many (e.g. thousands
> of) existing issues in your Jira project, this process may take some time. Once this
> process begins, **it can't be paused or canceled**. Avoid editing or transitioning any
> issues within your project while this process is taking place."

Three moves: scale the expectation, bold the irreversibility, give the behavioural
instruction. This is good content design. **It also uses `e.g.`, which the design system
forbids.**

**Progressive-disclosure furniture in the docs** `[observed]`: expandable blocks labelled
`[Expand to view issue fields]`, `[Expand to view Jira Software issue types]`,
`[Tips for using the workflow designer]`, `[Tips on performance when modifying workflows]`.
Naming the collapsed block after what it contains rather than "More" / "Details" is
correct practice and is used consistently.

## T5 Form & field labels

`[documented]` throughout.

**The `Add Status` form — three fields, each with a purpose line**

| Label | Hint text (verbatim) |
|---|---|
| `Name` | "specify a short phrase that best describes your new status." |
| `Description` | "add a sentence or two to describe what workflow step this status represents." |
| `Category` | "choose a category that this status will be grouped into: "To Do" (grey), "In Progress" (blue) or "Done" (green)." |

The `Name` hint tells the admin the *form* of a good status name ("a short phrase"); the
`Description` hint tells them the *function* ("what workflow step this status
represents"); the `Category` hint enumerates the closed set. Three fields, three different
kinds of guidance, all in one dialog. **This is the best-designed form copy in the Jira
documentation** and it is a directly reusable template for any admin form where the user
is inventing a value that other people will read.

The `Category` hint continues with the *consequences* of the choice, which is the part most
products omit: "Categories help you identify where issues are in their lifecycle,
particularly in places where a large number of issues are rolled up, e.g. Version Details
page, Sprint Health Gadget. The category is also used to map statuses to columns in Jira
Software, when creating a new board for an existing project."

**Defect:** that hint uses `e.g.` — forbidden by the design system — and the published
source renders the category list with a stray asterisk-quote artefact
(`*"*To Do" (grey)`), i.e. a broken emphasis marker leaking into the customer-facing
string.

**Issue field labels — the full default set** `[documented]`

`Project` · `Key` · `Summary` · `Type` · `Status` · `Priority` · `Resolution` ·
`Affects Version(s)` · `Fix Version(s)` · `Component(s)` · `Labels` · `Environment` ·
`Description` · `Links` · `Assignee` · `Reporter` · `Votes` · `Watchers` · `Due` ·
`Created` · `Updated` · `Resolved` · `Estimate` · `Remaining` · `Logged` · `Development` ·
`Agile` · `Service Desk`

Four observations on this list.

1. **`Affects Version(s)` and `Fix Version(s)` carry the parenthetical plural in the label
   itself.** The same device Calendly uses for `Host(s)`. Ugly, unambiguous, and common in
   enterprise UIs where a field may hold one or many.
2. **Three time fields are named by past participle** (`Created`, `Updated`, `Resolved`)
   and one by a preposition-less adjective (`Due`). `Due` alone is a fragment — the label
   is neither `Due date` nor `Due`, it is `Due` with the value supplying the date.
3. **`Estimate`, `Remaining` and `Logged` are single words whose definitions each reference
   a *differently named* underlying concept**: `Estimate` is defined as "The **Original
   Estimate**", `Remaining` as "The **Remaining Estimate**", `Logged` as "the sum of the
   **Time Spent**". So there are six names for three quantities, three on the screen and
   three in the definition. A genuine terminology defect in the most-reported-on fields in
   the product.
4. **`Service Desk` is still a field-group label** in current Data Center documentation,
   years after the product was renamed Jira Service Management. And the design system's own
   `Do` example for abbreviations is "Ask the experts at **Jira Service Desk**" — the
   style guide teaching correct product naming using a product name that no longer exists.

**`Key` is defined by example, not by rule** `[documented]`: "A unique identifier for this
issue, in the example above: ANGRY-304. (The characters to the left of the hyphen
represent the project to which this issue belongs.)" — the project-key convention explained
in a parenthetical, using a joke project key (`ANGRY`, from "Red Angry Nerd is scary" in
the `Summary` example). Humour in reference documentation, rationed to one field.

**Workflow-designer control labels** `[documented]`:
`Allow all statuses to transition to this one` — a thirteen-word checkbox label in the
status properties panel. It is long because the concept (a *global transition*) has no
short name a user would recognise, and Atlassian chose the sentence over the jargon.
Defensible; the alternative label would be `Global transition`, which teaches nothing.

Other documented controls: `Workflows` tab · `Inactive` tab · `Actions` column ·
`Order` column · `Add status` · `Statuses` (under `Issue attributes` in the left panel) ·
`Issue attributes` · `Administration ⚙ > Issues` · `View issue` screen ·
`Restrict` / `Admin` permissions.

**Issue-security vocabulary** `[documented]`: `Issue security schemes` ·
`Security levels` · `Add issue security scheme` · `Add security level` ·
`Default` · `Change default security level to "None"` ·
`Add user/Group/Project role to issue security level` (note the **inconsistent
capitalisation inside a single page title**: lowercase `user`, capitalised `Group` and
`Project role`).

Security-level members may be: "Individual users / Groups / Project roles / Issue roles
such as 'Reporter', 'Project Lead', and 'Current Assignee' / 'Anyone' (eg. to allow
anonymous access) / A (multi-)user or (multi-)group picker custom field."

`'Anyone' (eg. to allow anonymous access)` — **`eg.` without the second period**, a third
spelling of the forbidden abbreviation on top of the two already found. And `Anyone` here
means *the public*, whereas in Help Scout (#188) `Anyone` means *unassigned*. Same word,
opposite scope, in two products in the same domain.

## T6 Status & state language

**This is the priority section and Jira is the canonical artefact in the corpus.**
`[documented]`

### The model, in Atlassian's own words

> "A Jira workflow is a set of **statuses** and **transitions** that an issue moves through
> during its lifecycle and typically represents processes within your organization."

> "A **status** represents the state of an issue at a specific point in your workflow
> (e.g. "In progress"). An issue can be in only one status at a given point in time."

> "A **transition** is a link between two statuses that enables an issue to move from one
> status to another. To move an issue between two statuses, a transition must exist. A
> transition is a one-way link, so if an issue needs to move back and forth between two
> statuses, two transitions need to be created."

**Four primitives, four separate nouns**: `workflow`, `status`, `transition`, `step`. And
a fifth layer above status: `status category`.

### Default statuses

The default workflow diagram is published with a `title` attribute that names its states:

> "Workflow with statuses: Open, In Progress, Resolved, Closed, and Reopened."

So the classic Jira system workflow is `Open` → `In Progress` → `Resolved` → `Closed`,
with `Reopened` as the return state. Five statuses.

**Note the shape of that set.** `Open` and `Closed` are a pair; `Resolved` and `Closed`
are *not* synonyms; and `Reopened` is a distinct status rather than a return to `Open` —
so the workflow remembers that the item has been round the loop once. That memory is
carried in the status name, which is why the set has five members rather than three. The
same decision Zendesk makes with `reopened` (see corpus #188) and the opposite of Help
Scout, which returns everything to `Active`.

### Status categories — the layer above status

> "**Category** — choose a category that this status will be grouped into: "To Do" (grey),
> "In Progress" (blue) or "Done" (green)."

Three categories, fixed, colour-bound. Their stated purpose is **aggregation**:
"Categories help you identify where issues are in their lifecycle, particularly in places
where a large number of issues are rolled up" — and **board mapping**: "The category is
also used to map statuses to columns in Jira Software, when creating a new board for an
existing project."

**This is the structural answer to the problem Front and Help Scout solve editorially.**
Jira lets every team invent its own status names (`Awaiting legal`, `In UAT`, `Blocked by
vendor`) and then forces each one into one of three fixed buckets so that reporting,
boards and roll-ups still work. Compare:

| Product | Extensibility | Aggregation mechanism |
|---|---|---|
| **Jira** | unlimited custom statuses | **status category** — three fixed values every status must map to |
| Zendesk | custom ticket statuses | standard statuses become *status categories* |
| Front | custom ticket statuses + ticket status groups | a published mapping table to the legacy vocabulary |
| Help Scout | **none — "not possible"** | not needed; three statuses only |

Jira invented the pattern; Zendesk and Front copied its shape; Help Scout refused the
problem. Four products, four positions on one axis, and the axis is
**how much of your team's process do you let the customer encode in the state enum.**

**Note the colour assignment as published**: `To Do` (grey), `In Progress` (blue),
`Done` (green). Recorded verbatim; Atlassian's own board UI and other documentation are
widely described as using blue for `To Do`, so this may be stale. Flagged as a possible
inconsistency, not confirmed.

### Status vs resolution — the subtle part, and Atlassian states it explicitly

> "Note the difference between the **Resolution** and **Status** fields. The
> **Resolution** specifies why an issue is closed, while **Status** indicates an issue's
> position in its workflow."

> "In Jira, an issue is either open or closed based on the value of its "Resolution" field:
> An issue is open if its resolution field has not been set. An issue is closed if its
> resolution field has a value (e.g. Fixed, Cannot Reproduce). **This is true regardless of
> the current value of the issue's status field (Open, In Progress, etc).**"

**That last sentence is the whole problem in one line.** The thing a user calls "closed"
is not the field called `Status`; it is the *presence of a value* in a different field
called `Resolution`. A work item can sit in a status literally named `Closed` and still be
open as far as every report in the system is concerned, because nobody set a resolution.
This is the single most-misconfigured concept in enterprise issue tracking and Atlassian
documents it correctly — in a subsection called `Set the resolution field`, buried
two-thirds of the way down a long admin page.

**Three content observations.**

1. **The distinction is expressed as a null-check, not as a state.** "An issue is open if
   its resolution field has not been set." The user-facing concept `open` has no field of
   its own. It is derived. Nothing in the UI vocabulary tells you that, which is why the
   documentation has to.
2. **The recovery instruction is given as two mechanisms, not one.** "Set the resolution
   field automatically via a post function" or "Prompt the user to choose a resolution via
   a screen." Naming both routes, with their trade-off implied (automatic vs asked), is
   the right disclosure for an admin decision.
3. **The consequence is signalled visually elsewhere in the product and documented in the
   field list**: "once an issue has been resolved (that is, the issue's Resolution field is
   filled in), textual references to that issue will show the key in strikethrough text."
   And in the `Links` field definition: "(Strikethrough text, ~~like this~~, indicates
   that an issue has been resolved.)" **Strikethrough as the visual encoding of
   resolution-is-set** — a typographic state signal, documented twice.

### Resolutions — the default sets

| Application | Default resolutions (verbatim) and their descriptions |
|---|---|
| Jira Core | `Done` "The work is completed." · `Won't do` "The work will not be done." · `Duplicate` "This work is being tracked elsewhere." |
| Jira Software | the three above plus `Cannot reproduce` "The issue cannot be reproduced." |
| Jira Service Management | `Done` · `Won't do` · `Duplicate` |

Framing note: "An issue can be completed, or resolved, in many ways. An issue resolution is
usually set when the status is changed."

**The resolution names are outcome words, not status words**, and the distinction is
deliberate: `Done` (we did it), `Won't do` (we decided not to), `Duplicate` (someone else
is doing it), `Cannot reproduce` (we couldn't find it). Each is a *reason the work stopped*.
Note that none of them is `Fixed` — yet the workflow article's own example of a resolution
value is "(e.g. Fixed, Cannot Reproduce)". **`Fixed` is not in any published default
resolution set**, and `Cannot Reproduce` is capitalised differently there than in the
reference table (`Cannot reproduce`). Two defects in one parenthetical, inside the single
most important explanatory passage in the product's documentation.

`Won't do` is worth pausing on. It is a contraction, informal, and it commits to the
team's decision rather than to the item's fate — compare the industry alternatives
"Won't Fix" (blames the code), "Rejected" (blames the reporter), "Closed — no action".
`Won't do` is the most humane of the available options and it is one of the few places
Atlassian's stated "practical, with a wink" voice reaches the state vocabulary.

### Issue types — the vocabulary hierarchy

| Application | Type | Description (verbatim) |
|---|---|---|
| Jira Core | `Task` | "A task represents work that needs to be done." |
| | `Sub-task` | "A sub-task is a piece of work that is required for a task." |
| Jira Software | `Task`, `Sub-task` (as above) | |
| | `Story` | "A user story is the smallest unit of work that needs to be done." |
| | `Bug` | "A bug is a problem which impairs or prevents the functions of a product." |
| | `Epic` | "A big user story that needs to be broken down." |
| Jira Service Management | `IT Help` | "Requesting help for IT related problems." |
| | `Purchase` | "Requesting hardware or software." |
| | `Change` | "Requesting a change in current IT profile." |
| | `Fault` | "Reporting a fault." |
| | `Access` | "Requesting additonal access." |

**`Epic` is defined in terms of `Story`** ("A big user story that needs to be broken
down"), and `Story` is defined as "the smallest unit of work" — but `Sub-task` is smaller
than a story and sits below it. **The two definitions are mutually inconsistent**: if a
story is the smallest unit of work, a sub-task cannot be "a piece of work". Recorded as a
genuine definitional defect in the canonical issue-type reference.

The JSM type names are the odd set out: five **gerund-defined request types**
(`Requesting help…`, `Requesting hardware…`, `Reporting a fault`) whose *labels* are nouns
(`IT Help`, `Purchase`, `Change`, `Fault`, `Access`). `IT Help` is also the only
two-word, initialism-leading label in any of the three sets.

**Defect:** `Requesting additonal access.` — a live typo (`additonal`) in the canonical
issue-type reference table.

### Priorities

`Highest` · `High` · `Medium` · `Low` · `Lowest`, with the framing sentence
"An issue's priority indicates its relative **importance**" and a customisation caveat:
"note that both the priorities and their meanings can be customized by your administrator
to suit your organization."

**The descriptions are not parallel and only three of five say anything.**
`Highest` — "Highest priority. Indicates that this issue takes precedence over all others."
`High` — "Indicates that this issue is causing a problem and requires urgent attention."
`Medium` — "Indicates that this issue has a significant impact."
`Low` — "Indicates that this issue has a relatively minor impact."
`Lowest` — "Lowest priority."

`Highest` and `Lowest` are defined tautologically by their own names; `High` is defined by
*urgency*; `Medium` and `Low` are defined by *impact*. **Three different axes in a
five-value ordinal scale.** For a field whose entire purpose is to let two people agree on
an ordering, this is the clearest content failure in the Jira reference documentation.

### Workflow lifecycle states (the workflow object itself has states)

`Active workflow` — "a workflow that is currently being used by one or more projects" ·
`Inactive workflow` — "a workflow that isn't currently being used by any projects" ·
`draft` — created automatically when you edit an active workflow ·
`Publish` — the action that promotes a draft, with an option to "save your original
workflow as an inactive backup".

So Jira has **a state machine for editing the state machine**, and the autosave semantics
differ between the two: "Your changes will be automatically saved as you edit an inactive
workflow. You won't need to manually save or publish your changes." versus the
draft-and-publish flow for active ones. Different save models by object state, disclosed
in the comparison table rather than discovered.

**Statuses are global** `[documented]`, and the warning is placed in a tip callout:
"Statuses are global objects. Changing a status name on one workflow also changes it in
all workflows that use that status." A one-sentence blast-radius warning attached to the
control that causes it — the same practice Front uses for conversation status.

### The status / step distinction

> "Text mode is an advanced way of working with workflows, and it shows the difference
> between **steps** and **statuses**. In text mode, you work directly with steps."

And: "Each stage in the workflow (called a *workflow step*) is linked to an *issue status*,
and an issue status can be linked to only one workflow step in a given workflow."

A fourth noun (`step`) that is one-to-one with `status` within a workflow but is a
separate object with its own ID ("The step ID (step's name) can't be changed"). Jira
exposes an internal modelling distinction to admins and then says it only matters in
"advanced" mode. **Recorded as a terminology leak**: the user has to learn two words for
one thing in order to use one screen.

### Status-page states

`[observed]` on `status.atlassian.com`: `All Systems Operational`, plus a hub model —
Atlassian publishes **twenty-five separate product status pages** rather than one
component list (`Jira`, `Jira Service Management`, `Jira Work Management`,
`Jira Product Discovery`, `Confluence`, `Jira Align`, `Trello`, `Bitbucket`, `Opsgenie`,
`Statuspage`, `Guard`, `Compass`, `Atlas`, `Atlassian Analytics`, `Rovo`, `Rovo Dev`,
`Atlassian Migrations`, `Focus`, `Loom`, `Talent`, `Customer Service Management`, plus
`Atlassian Support`, `Atlassian Partners`, `Atlassian Developers`, `Admin Experience`).

The hub page carries a promotional banner inside the status surface:
`Status Page Light` / "Organization administrators can now receive personalized incident
information in Atlassian Administration. Subscribe to System Health to receive
notifications if a reliability incident affects your organization." with a `Try Now` CTA.
**A marketing CTA on a status page** — the one surface where users arrive already
anxious. Recorded as a negative finding.

Incident history renders as `No incidents reported today.` for the current day and
`No incidents reported.` for prior days — two strings for one condition, differing only
by the word `today`. Reasonable, and worth noting as a deliberate micro-distinction.

## T7 Error, failure & recovery

`[documented]` from the design system; `[absent]` for actual Jira error strings, which
live in the unreachable Cloud UI and help centre.

**Atlassian publishes a full error-message specification.** The structure is
title / body / CTA, with a rule set for each:

**Title** — "Include an informative, scannable title. Try and imagine people trying to
understand what's happening by reading the title on its own. **Avoid explaining what to
do.** Limit titles to three to four words where possible, excluding "an", "a", or "the"."

**Body** — "Include: the reason for the error and the problem, how someone should act and
what happens if they don't act. **If you don't know the reason for an error, don't make one
up** – just say that something's gone wrong and offer a solution for what people can do.
Avoid repeating content from the title. Keep messages to 1 to 2 sentences."

**CTA** — "use imperative verbs such as "Save", "Remove", or "Create" … instead of vague
terms such as "OK". An option to dismiss or cancel lets people feel reassured that they can
opt out. Limit your CTA to 1 or 2 words."

**The three strongest rules, verbatim:**

1. > "Use *we* instead of *you*, as emphasizing the relationship between the person and the problem could make them feel like they're being held responsible."

2. > "Avoid using "please" and "sorry". Saying "sorry" in error messages can make the situation worse by causing errors to appear more severe than they actually are. Similarly, saying "please" can undermine the authority and credibility of your message and lead people to think a required step is optional. Unless the error has severe and irreparable consequences, avoid niceties."

3. > "Stick to the most likely cause or the simplest solution in the first sentence of the error message and offer an alternative backup solution in the second sentence in case the error keeps occurring (for example, contacting support)."

Rule 2 is the most quotable piece of error-message guidance in this corpus. The reasoning
for banning `please` — that it makes a required step read as optional — is a
genuinely non-obvious argument and it is the right one.

**The error/warning boundary is defined** `[documented]`:
"An error message alerts people of a problem that has **already occurred**. By contrast, a
warning message alerts people of a condition that **might cause a problem in the future**."
And: an error "appears **after** someone has taken an action."

**Gradual disclosure for dead ends** `[documented]`: "For dead ends, start with something
short but kind, and add context or other details only if the error will reoccur."

**Worked error examples from the grammar guide** `[documented]`:
`We can't load this page.` (over "We cannot load this page.") ·
`We couldn't load your page` (over "The page couldn't be loaded") ·
`We can't load work item DSP-32113.` (present tense, over the past tense) ·
`Upload failed` / `File created` (past tense permitted for completed actions).

Note the tense rule is split: **present tense for the failure, past tense for the
heading**. "Present tense helps make instructions and messages in the UI clear and
engaging … Past tense can be used to communicate a completed action, like in error message
headings and success flags."

**Jira's own documented failure content** `[documented]` is limited to admin-blocker
articles cross-linked from the workflow page:
`Cannot add transitions or delete steps in draft workflows` (an *archived* knowledge-base
article, still linked from live documentation) and
`Editing a workflow when it shows "You cannot perform this operation on a draft workflow."`
— a community article whose title **quotes the error string verbatim**. That is the only
actual Jira error message recoverable in this harvest:
`You cannot perform this operation on a draft workflow.`

And it violates two of Atlassian's own rules: it uses **`you`** where the guidance says use
`we`, and it **explains nothing about what to do next**.

**Validation is documented as an automatic behaviour, not a message** `[documented]`:
"The workflow designer will automatically validate your workflow and highlight any statuses
that have no incoming or outgoing transitions. The workflow validator will also highlight
all transitions that have an invalid permission condition that you don't have available in
Jira." A structural-integrity check on a user-authored state machine, with no published
message text.

## T8 Empty states

`[documented]` — the design system carries a dedicated
`Empty state` guidance page (`/foundations/content/designing-messages/empty-state`),
identified in the navigation but not opened in this harvest.

Jira's own empty states are behind auth and were not observable. `[absent]`

**One empty state was observed, and it is a defect.** Every documentation page on
`confluence.atlassian.com` renders, in the left rail:

> `Related content`
> `No related content found`

on **every single page harvested** — the workflows page, the statuses page, the security
page, the Confluence pages. A "related content" module that has never once been populated,
shipping its empty state site-wide, twice per page (it appears in both the left rail and
the article footer). The honest fix is to remove the module.

A second observed empty artefact: the left rail also renders the literal string
`Unable to load` beneath the `Documentation` heading on every page — a **failed
component's fallback text shipped as permanent furniture**. Neither string is an error
the user can act on.

## T9 Notifications & system messages

`[documented]` / `[observed]`.

**The design system prescribes five message types**, each with its own guidance page:
`Empty state` · `Error messages` · `Feature discovery` · `Info messages` ·
`Success messages` · `Warning messages` — and maps them to named components:
`Flag`, `Inline message`, `Modal dialog`, `Section message`, `Spotlight`.

**The voice-and-tone page maps principles to message types**, which is the notable
structural move — it does not just say "be friendly", it says *which* principle governs
*which* component:

| Principle | Where to use it (verbatim) |
|---|---|
| `Inform to build trust` | "In-app: flags, error messages, and spotlights / New features or apps / In confusing, warning, or error states" |
| `Empower to inspire action` | "In-app: spotlights and modal dialogs / When something requires an action / When guidance is needed" |
| `Encourage people along the path` | "In-app: information messages, error messages, and section messages" |
| `Motivate by showing possibilities` | "In-app: spotlights and modal dialogs / Educational opportunities" |
| `Satisfy by meeting expectations` | "In-app: warning messages, information messages, and error messages / Across all UI and app content" |
| `Delight with unexpectedly pleasing experiences` | "In-app: success messages and modal dialogs / Social interactions, while introducing new experiences" |

**`error messages` appears under three different principles** (`Inform to build trust`,
`Encourage people along the path`, `Satisfy by meeting expectations`). A writer looking up
"which principle applies to my error message" gets three answers. Recorded as a usability
defect in the guidance itself.

**Delight is explicitly rationed** `[documented]`, and the rationing rule is good:
"Delight means little flourishes, not humor or being cheeky. Always ask yourself what
someone might be feeling at that moment and if delight is appropriate. Also question
whether it will be understood or appreciated by our global audience. Think about the timing
and how frequently a user will see this. **Once may amuse, but a dozen times may annoy.**"

**Documentation feedback is the one observed notification pattern** `[observed]`:
`Was this helpful?` → `Yes` / `No` → on `No`, three reason options:
`It wasn't accurate` · `It wasn't clear` · `It wasn't relevant`
→ `Provide feedback about this article`.

A **three-way negative-feedback taxonomy** is worth stealing. Accuracy, clarity and
relevance are the three distinct ways documentation fails, they map to three different
remedies (fix the fact / rewrite the sentence / re-route the reader), and the options are
phrased in the past tense from the reader's position rather than as categories.

The developer portal uses a different and worse instrument for the same job:
`Rate this page:` `Unusable` / `Poor` / `Okay` / `Good` / `Excellent` — a five-point
satisfaction scale that tells the writer nothing about what to change. **Two Atlassian
documentation properties, two incompatible feedback mechanisms.**

**Status-page notification model** `[observed]`: email and SMS subscription with OTP
verification, plus Atom and RSS. The banner copy offers a competing in-product channel
("Subscribe to System Health to receive notifications if a reliability incident affects
your organization"), so there are two subscription paths with different scopes and the
page does not explain which to choose.

## T10 Disclosures, legal & compliance

`[observed]`, and thin because the pricing page did not render.

**Plan names only**: `Free`, `Standard`, `Premium`, `Enterprise` (from the `<title>`).
No prices, seat definitions, or cancellation wording were retrievable. `[absent]`

**End-of-life disclosure** `[observed]` — a persistent banner on every Data Center
documentation page:

> "Ascend to new heights with Atlassian Cloud. Data Center support ends on March 28, 2029."
> `Learn more and get support ->`

A specific date, seven years ahead of the rename of the migration programme, on every page
of the product's own documentation. **Putting the deprecation date in standing furniture
rather than in a one-time announcement is the right practice** — the person reading an
admin article in 2028 is exactly the person who needs to see it. The marketing verb
(`Ascend to new heights`) sitting in front of it is the wrong register for a support-ends
notice.

**Feature-availability caveats inside reference tables** `[documented]`:
`* Only available in Jira Software projects, and only available to Jira Software users` ·
`** Only available in Jira Service Management projects, and only available to Jira Service
Management users` — asterisked footnotes bound to specific rows of the field table. The
double repetition ("available in X projects, and only available to X users") distinguishes
*project-level* from *licence-level* availability, which is a real distinction and worth
the redundancy.

**Customisation caveats are attached to every default set** `[documented]`. Each of the
priority, resolution and status reference tables carries a variant of "note that your
administrator may have customized these to suit your organization." Telling the reader
that the reference table may not describe *their* instance, on every reference table, is
correct and unusually disciplined.

**Permission prerequisites are stated before procedures** `[documented]`:
"To access and manage workflows, you must be logged in as a user with the Jira
administrators global permissions." followed by the negative case: "Users with project
admin rights can't create new workflows and have limited editing permissions. They can only
edit non-default workflows and any workflows that aren't shared with other projects."
**Stating what the lesser role cannot do, immediately after stating what the greater role
needs**, saves the reader the failed attempt.

**Footer legal set** `[observed]`: `Privacy policy` · `Notice at Collection` · `Terms` ·
`Impressum`; documentation footer adds `Terms of Use` and `Security`.

**Defect:** the main footer says `Terms` and links to `/legal/cloud-terms-of-service`;
the documentation footer says `Terms of Use` and links to `/legal/customer-agreement`.
Two labels, two different agreements, no indication which governs the reader.

No accessibility statement was found in either footer. `[absent]` — notable, because the
design system has a whole `Accessibility` foundation section.

## T11 Help-centre architecture

**`support.atlassian.com` is unreachable to a server-side fetch — it returns an empty
body.** The entire Cloud help centre, which is the primary self-service surface for Jira
Cloud, could not be harvested. `[blocked]`

What is reachable is **the Data Center documentation on `confluence.atlassian.com`**, and
its architecture is worth recording because it is a Confluence space dogfooding as a
docs site (rendered through the third-party Scroll Viewport plugin).

**Structure**: space → section → page, with the section list repeated in a left rail on
every page and an eighteen-version selector above it.

**Article-title grammar — overwhelmingly gerund, in direct violation of the design
system's own rule**

| Shape | Examples |
|---|---|
| Gerund | `Working with workflows`, `Configuring projects`, `Configuring issues`, `Configuring permissions`, `Managing components`, `Managing versions`, `Managing your workflows`, `Configuring workflow schemes`, `Sharing your workflow`, `Using the issue collector`, `Defining a project`, `Defining status field values`, `Defining issue type field values`, `Defining priority field values`, `Defining resolution field values`, `Archiving an issue`, `Archiving a project`, `Managing project shortcuts`, `Restricting issues to project roles`, `Translating resolutions, priorities, statuses, and issue types`, `Working in text mode`, `Configuring issue-level security`, `Advanced workflow configuration` |
| Noun phrase | `Issue fields and statuses`, `Project screens, schemes and fields`, `Workflow properties` |

The Atlassian Design System says, of headings, under a rule that **explicitly names
documentation**:

> "Phrase UI and documentation headings with an action verb. **Avoid gerunds (the 'ing'
> form of verbs) in UI copy.**"
> Do: `Add a page to your project` — Don't: `Adding a page to your project`

Roughly **twenty-three of twenty-six** Jira Data Center documentation headings observed in
this harvest are gerunds. The Do/Don't example in the style guide is almost word-for-word
the pattern the documentation uses.

To be fair to Atlassian: the rule's second clause says "in UI copy", so a defender could
argue documentation is exempt. But the first clause says "UI **and documentation**
headings", and the worked example (`Add a page to your project`) is a documentation
heading. The guidance is internally ambiguous *and* comprehensively ignored.

**Standing furniture on every documentation page** `[observed]`:
`On this page:` · `In this section` · `Related content` / `No related content found` ·
`Still need help?` "The Atlassian Community is here for you." `Ask the community` ·
`Was this helpful?` · `Last modified on <date>`.

`Last modified` dates observed: `Nov 16, 2022`, `Mar 14, 2023`, `Sep 24, 2022`,
`Dec 3, 2025`. **The canonical status-vs-resolution explanation was last touched in
September 2022** and the canonical issue-type reference in November 2022 — on a product
whose Cloud edition renamed its core noun in 2025.

**Routing furniture**: `Ask the community` is the only escalation offered at article foot;
`Contact support` and `Create support ticket` live in the header and global footer.
Community before support, same ordering as Front and Calendly.

## T12 FAQs

`[absent]` as a discrete artefact. No FAQ block was retrievable on the Jira product or
pricing pages (both bodies are client-rendered), and the Data Center documentation uses
`Tips`, `Notes` and expandable blocks rather than question-form headings.

**The only Q&A-shaped content harvested is in the developer-community announcement of the
`issue` → `work item` rename**, which is genuinely a published FAQ and is quoted verbatim
here because it is the richest terminology-governance artefact in this file. `[observed]`

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| Q1 | Why not "item," "record," "activity," "entity," or "entry"? | All ambiguous in what they represent; `work item` "more accurately captures a *record of work*, rather than just any activity". |
| Q2 | Can admins decide what option to replace "issue" with? Will this be a site or a project-level setting? | No. "By default, 'issue' will be replaced with 'work item' for all Jira customers at the site level." |
| Q3 | Will this change come to Jira DC, too? | "As of writing this answer, there are no concrete plans to bring this change to Jira DC anytime soon." |
| Q4 | How can I see a preview of what this might look like in Jira? | A Chrome extension is offered. |

Three things make this exemplary FAQ practice.

1. **Q1 lists the rejected alternatives by name.** Publishing the shortlist you did not
   pick, and why, converts a naming decision from an edict into an argument. Almost no
   product does this.
2. **Q2 answers "can I turn it off" with a flat `No`** and states the scope of the
   imposition (site level, all customers, no admin control) in one sentence.
3. **Q3 admits the split** — the change is Cloud-only and Data Center keeps `issue`
   indefinitely. A later reply makes the consequence explicit: "You're right our Jira Cloud
   and Jira Data Center customers will see both terms."

The thread also carries the **community's objections in public**, unmoderated, which is
itself a content-governance artefact: a partner objects that 86 research participants is
thin for "300.000 customers"; another predicts the documentation will split ("Old doc
would keep 'issues', new doc would be about 'works', maybe even mixing the terms in the
same document"); Atlassian's own reply concedes "you will see both terms while we make this
transition" and "We won't be updating Atlassian Community".

**That prediction is confirmed by this harvest.** The Data Center documentation says
`issue` everywhere; the REST API navigation says `Issue types`, `Issue resolutions`,
`Issue links`, `Issue search`, `Issues`; the design system's Do/Don't examples say
`work item`. Three Atlassian properties, two vocabularies, one product.

## T13 Terminology & glossary

| Term | Atlassian's usage | Status / the alternative it rejected |
|---|---|---|
| `work` / `work item` | **The current Cloud term for the core object.** "`Work` is a broader, conceptual term that refers to all types of work within Jira. `Work item` is used when referring to multiple objects of different types, for example on your Board, List, or other project views." | Replaced `issue` in Jira Cloud from March 2025. Rejected: `item`, `record`, `activity`, `entity`, `entry` |
| `issue` | **Retained** in Jira Data Center, in all REST APIs, in JQL filters, and in Atlassian Community | "there are no changes to existing APIs; they will continue to function as usual with the term 'issue'" |
| `status` | "the state of an issue at a specific point in your workflow" | "state", "stage" |
| `status category` | The three-value fixed grouping above status | "phase", "bucket" |
| `transition` | "a link between two statuses"; one-way | "action", "move", "event" |
| `step` | The workflow node that a status is bound to; visible only in text mode | An internal model term leaked to admins |
| `resolution` | "specifies why an issue is closed" | "outcome", "close reason", "disposition" |
| `Won't do` | A resolution value | "Won't Fix", "Rejected", "Declined" |
| `workflow scheme` | The binding of workflows to issue types within a project | "mapping", "assignment" |
| `post function` | Automation that runs after a transition | "action", "hook" |
| `validator` / `condition` / `trigger` | The other three transition extension points | |
| `global transition` | Not used as a label; the UI says `Allow all statuses to transition to this one` | The jargon was deliberately not shipped |
| `lozenge` | **A design-system component name leaking into admin documentation**: "you can re-order existing statuses, as well as change their names, descriptions and lozenges." | "badge", "tag", "chip" |
| `Epic` / `Story` / `Task` / `Sub-task` / `Bug` | The Jira Software issue-type set | |
| `app` | The Marketplace extension unit. Atlassian's own Confluence documentation glosses it: "apps (also known as add-ons, or plugins)" | **Renamed twice**: `plug-in` → `add-on` → `app` |
| `Collection` | A named multi-product bundle (`Teamwork Collection`, `Strategy Collection`…) | "suite", "bundle" |
| `System of Work` | Atlassian's coined methodology brand | |
| `Rovo` | The AI brand across all products | |
| `Teamwork Graph` | The coined data-layer brand | |
| `Anyone` | In issue security, means **the public** ("to allow anonymous access") | In Help Scout (#188) the same word means *unassigned* |

### The `issue` → `work item` migration, as a content-governance case study

This is the most instructive terminology artefact in the corpus and deserves its own
treatment.

**The stated problem** `[observed]`:
> "When Jira started as a bug-tracking tool for software development a little over two
> decades ago, bugs were represented as 'issues.' … our customers have been clear that this
> terminology can be limiting and sometimes even confusing in the context of their work."

**The stated method** `[observed]`: "we interviewed 86 participants from software to
business Jira end users and admins, and non-Jira users. From our research we found 'work'
resonated most." Plus Chrome-extension telemetry and "numerous studies we've run,
alongside historical data and quantitative feedback over many years."

**The stated future direction is the interesting part** `[observed]`:
> "In future updates, we plan to incorporate the specific terminology you use for your
> unique work types. So, when you're working on a particular type of task, the interface
> will dynamically adjust to reflect that context. For example, engineering teams see
> 'bugs' or 'stories,' whereas Marketing teams may see 'launches' or 'copy.'"

And: "we noticed most people use their own language to describe the objects tracked in
Jira. That might be a task, a ticket, or a bug. This is why we're working on using **work
type language instead of the collective noun** of 'work', where it makes sense to."

**The design conclusion Atlassian reached is: stop naming the abstraction.** Rather than
finding a better collective noun, the plan is to surface the *concrete* type and avoid the
superordinate word wherever possible. That is a genuinely different answer from the one
Front, Help Scout and Calendly reach — each of those picks one abstract noun
(`conversation`, `conversation`, `invitee`) and enforces it everywhere. Jira is betting
that with enough type-awareness you never have to say the general word at all.

**The costs, all publicly acknowledged**:

- Cloud and Data Center diverge permanently: "our Jira Cloud and Jira Data Center customers will see both terms."
- APIs keep `issue`; new APIs get `work`. A partner's objection — "Mixing both `issue` and `work` within a single API scheme would be a very big mistake" — was answered with "We are not planning to combine issue and work in single API", which does not resolve it.
- Documentation splits: "We plan to update our Jira Cloud documentation and some Knowledge Base articles first. We won't be updating Atlassian Community, as articles are time stamped."
- Search fragments: a community member notes that "searches will need to include 'work,' 'work item,' and 'issue' to cover all relevant content."

**Verified in this harvest**: the Data Center documentation, the REST API resource names
and the Statuspage all still say `issue`; the design system says `work item`. The split is
real and it is visible from outside.

### Atlassian's stated voice, verbatim

Three personality traits `[observed]`: `Bold` · `Optimistic` · `Practical, with a wink`.

- `Bold` — "it's about motivating teams with the right amount of support at the right time to do their best work."
- `Optimistic` — "understanding where in the journey someone is and highlighting the key points that will help them along the way."
- `Practical, with a wink` — "Our practical side means getting to the point and being direct and concise." With the caveat: "The 'with a wink' part of this trait needs more discernment when applying it to UI and app content (as opposed to marketing content) and remember that it isn't always appropriate to use."

**Each trait carries a "when to be more" / "when to be less" pair keyed to the reader's
emotional state** — and this is the strongest structural idea in the whole guidance:

| Trait | When to be **more** | When to be **less** |
|---|---|---|
| `Bold` | "confident, interested, trust, anticipation" — power users, admins, daily users | "apprehension, confusion, annoyance, fear, anger" — new users, trial users, new concepts |
| `Optimistic` | "ambitious, inspired, curious, admiration" | "anticipation, unsupported, confused, uncertain" |
| `Practical` (more) | "overwhelmed, unsure, hesitant, stressed" — "people with deadlines or being blocked by errors" | — |
| the `wink` | "successful, joy, proud, relief" — "power users, during social interactions, success messages" | — |

**Naming the emotion, not the screen,** is what makes this usable. A writer can locate
their reader on an affect list and read off the dial position. Note the inversion built
into it: *more* practical exactly when the user is *less* okay, and the wink only after
success. It is a defensible register gradient expressed as a lookup table.

**Defect in the guidance:** `anticipation` appears under **both** "when to be more bold"
and "when to be less optimistic". One emotional state, two opposite instructions, on one
page.

## T14 Voice, tone & accessibility

**Register, as practised.** Documentation is flat, procedural, and heavily
imperative-with-`select`: `Select **Administration** > **Issues**`, `Choose`,
`Click`, `Navigate to`, `Enter`, `Fill in the requested details`. Second person for the
reader; `Jira` named in the third person as the actor ("Jira first creates a draft of
it"); `we` almost absent from documentation but mandated for errors by the design system.

**Contractions are used** in the newer documentation (`isn't`, `can't`, `don't`,
`You'll need to`) and absent from the older reference tables. The split tracks edit
dates, not surface.

**Tone gradient.** Marketing (from metadata alone): superlative and AI-forward
(`Project Management for the AI Era`, "Elevate your team's productivity"). Documentation:
neutral. State names: bare (`Open`, `In Progress`, `Done`, `Won't do`). One joke, in the
issue-field reference (`ANGRY-304`, "Red Angry Nerd is scary"). The gradient is correct;
the marketing end simply could not be measured.

**Numbers.** `18` documentation versions, `March 28, 2029` (EOL date), `86 participants`,
`99%` ("update the terminology on all UI surfaces used by 99% of Jira admins and users"),
`300.000 customers` (a community member's figure, using a European thousands separator
Atlassian's own style guide forbids: "Use a comma to indicate the thousand in a number").

### Does Atlassian obey its own content guidance?

The brief asks this directly. **Verdict: partially, and the violations are concentrated in
documentation and nav rather than in product strings.** Evidence gathered in this harvest:

| ADS rule (verbatim) | Observed violation | Where |
|---|---|---|
| "Don't use 'e.g.', 'i.e.', 'etc.', or '&'" | `e.g. "In progress"`; `(e.g. Fixed, Cannot Reproduce)`; `e.g. Version Details page`; `(e.g. thousands of)`; `eg. to allow anonymous access` | Jira DC docs, five instances, three spellings |
| same rule, `&` | `Capture & prioritize ideas`; `Enterprise-wide work planning & value`; `Guides & Webinars` | atlassian.com global nav |
| "Use sentence case in all titles, headings, menu items, labels, and buttons" | `Read More`; `Understanding the Basics of Git`; `Create and Edit Pages`; `Add, Remove and Search for Labels`; `Create Beautiful and Dynamic Pages`; `Restricted Pages`; `Global Templates and Blueprints`; `Jira Pricing: Choose Your Jira Plan` | atlassian.com, Jira DC docs, Confluence DC docs, og:title |
| "Phrase UI and documentation headings with an action verb. Avoid gerunds" | ~23 of 26 Jira DC documentation headings are gerunds | Jira DC docs |
| "Use the full name of features and apps in customer-facing copy" | The `Do` example itself names `Jira Service Desk`, a product renamed to Jira Service Management | **the style guide's own example** |
| "Use a comma to indicate the thousand in a number" | — (no violation observed in Atlassian copy) | |
| "Avoid using 'please' and 'sorry'" | — (no violation observed) | |
| "Use *we* instead of *you*" in errors | `You cannot perform this operation on a draft workflow.` | Jira error string, quoted in a community article title |
| "Use alternative text for illustrations and symbols in your messages" | The error-messages guidance page ships **six Do/Don't example images with empty `src` and no alt text** (`![]()`) | **the accessibility section of the error-messages page itself** |
| "Don't use periods in headers, titles, tooltips, field descriptions, and menu names" | — (not systematically checked) | |

**The sharpest finding**: on
`atlassian.design/foundations/content/designing-messages/error-messages`, the section
headed `Accessibility` opens with "Use alternative text for illustrations and symbols in
your messages" — and the page's own six illustrative Do/Don't images render as bare
`![]()` with no alt text and, in several cases, no image source at all. **The guidance
page violates the rule it is stating, in the paragraph that states it.**

This is the same category of finding the corpus already recorded for Twilio Paste, but the
Atlassian case is narrower: the *product* strings that were observable
(`Open`, `In Progress`, `Done`, `Won't do`, `Create`,
`Allow all statuses to transition to this one`) are largely compliant. **The guidance is
obeyed in the interface and ignored in the writing about the interface.**

### Accessibility content

- `Skip to content` present, first in DOM, on atlassian.com. `[observed]`
- The design system has a dedicated `Accessibility` foundation, and the error-messages page carries a four-point accessibility checklist: "Use alternative text for illustrations and symbols in your messages / Avoid jargon and use simple language / Make links as descriptive as possible / Make text easily scannable to highlight key information."
- The language guide contains two genuinely accessibility-motivated rules, both well argued: **"Avoid using a `>` symbol where possible, as it is read out as 'greater than' by assistive technologies, leading to confusion. Use 'then' instead."** and the abbreviation ban, justified partly on assistive-technology grounds. The `>` rule is the single best small accessibility-content rule in this corpus.
- Truncation guidance is explicitly accessibility-framed: "If truncation can't be avoided … use a tooltip to display the full text for accessibility and usability."
- **Against that:** the documentation site's inline images are a mixture — the default workflow diagram carries a genuinely descriptive `title` ("Workflow with statuses: Open, In Progress, Resolved, Closed, and Reopened.") which is how this file recovered the default status set, but most procedure screenshots carry no alt text at all, and several UI chrome images render as `![](<>)` — an empty source inside an empty alt.
- **No public accessibility statement or VPAT link** was found in the atlassian.com footer. `[absent]`
- Atlassian's DC documentation uses `>` in navigation instructions in at least one place (`Space tools > Content Tools`, `Administration > Issues`) despite the rule above. Violation of its own accessibility guidance, in its own docs.

**Negative findings, recorded honestly**

- `atlassian.design/content/writing-style` and `atlassian.design/content` return **HTTP 200 with a completely empty body** — no content, no redirect, no 404. The guidance moved to `/foundations/content/...` and the old, widely-linked URLs were left serving nothing. **An earlier corpus agent recorded the empty body and could reasonably have concluded the guidance was withdrawn; it has not been — it has been relocated without a redirect.** That is itself the defect.
- Three titles and two descriptions for one product page; `meta-twitter:description` truncated to `Elevate your team`.
- `Server` still advertised in the live pricing page's `og:description`.
- `Cannot reproduce` vs `Cannot Reproduce`; `Fixed` cited as a default resolution when it is not in any published default set.
- `Epic` and `Story` definitions are mutually inconsistent with `Sub-task`.
- Priority descriptions use three different axes across five ordinal values.
- `Requesting additonal access.` — live typo in the issue-type reference.
- `lect **Add workflow**` — live typo (missing "Se") in the create-a-workflow procedure.
- "import workflows from Atlassian Marketplace or an file" — live typo.
- `*"*To Do" (grey)` — broken emphasis markup leaking into the status-category hint text.
- `Estimate` / `Original Estimate`, `Remaining` / `Remaining Estimate`, `Logged` / `Time Spent` — six names for three quantities.
- `Add user/Group/Project role to issue security level` — three capitalisation conventions in one page title.
- `See all apps` (nav) vs `See all products` (footer).
- `Deliver service at high velocity` vs `Deliver service at high-velocity` in adjacent nav panels.
- `Terms` → cloud-terms-of-service vs `Terms of Use` → customer-agreement in two footers.
- `No related content found` and `Unable to load` ship as permanent furniture on every documentation page.
- `anticipation` listed under both "when to be more bold" and "when to be less optimistic".
- A `Try Now` marketing CTA on the status page.
- The canonical status-vs-resolution documentation was last modified **September 2022**.

---

## Transferable patterns

1. **Separate the state from the outcome, and say so in one sentence.**
   "The **Resolution** specifies why an issue is closed, while **Status** indicates an
   issue's position in its workflow." Any object that can end in more than one way needs
   two fields, not a longer status list. Condition: you must then explain — as Jira does,
   and as most Jira administrators fail to — that "closed" is derived from the *presence of
   a resolution value*, not from the status name. If you cannot explain the derivation in
   two sentences, use a longer status list instead.

2. **Let the customer name the states; fix the categories.** Unlimited custom statuses,
   each forced into one of three immutable buckets (`To Do` / `In Progress` / `Done`) so
   that boards, roll-ups and reporting keep working. This is the pattern Zendesk and Front
   later copied and Help Scout deliberately refused. Reach for it when different teams
   genuinely have different processes *and* leadership needs one cross-team view.

3. **Write the form hint to tell the author what a good value looks like.**
   `Name` — "specify a short phrase that best describes your new status";
   `Description` — "add a sentence or two to describe what workflow step this status
   represents". When a user is authoring a string that other people will read, the field
   hint should specify form and function, not just accept input.

4. **Ban `please` and `sorry` in errors, and publish the reasoning.**
   "saying 'please' can undermine the authority and credibility of your message and lead
   people to think a required step is optional." A rule with an argument attached survives
   review; a rule without one gets negotiated away.

5. **Key the tone dial to the reader's emotional state, not to the screen type.**
   Atlassian's "when to be more bold / when to be less bold" tables list *feelings*
   (`apprehension, confusion, annoyance, fear, anger`) rather than components. A writer can
   locate their reader and read off the setting.

6. **Prefer a long sentence label to a short jargon label for a concept the user does not
   have.** `Allow all statuses to transition to this one` over "Global transition". Thirteen
   words that teach, against two that require prior knowledge.

7. **Publish the rejected alternatives when you rename something.**
   "Why not 'item,' 'record,' 'activity,' 'entity,' or 'entry'?" turns an edict into an
   argument and pre-empts the top community objection. Pair it with an honest "no, you
   can't turn it off" and an honest "no, this isn't coming to the other deployment".

8. **Put the deprecation date in standing page furniture, not in an announcement.**
   "Data Center support ends on March 28, 2029" on every page of the product's own
   documentation. The reader who needs it arrives years after the announcement.

9. **Offer a three-way negative-feedback taxonomy on documentation.**
   `It wasn't accurate` / `It wasn't clear` / `It wasn't relevant` — three failure modes,
   three different remedies, phrased from the reader's position. Strictly better than a
   five-point satisfaction scale, which Atlassian also ships elsewhere and which tells the
   writer nothing.

10. **Negative finding worth generalising: a design system's *own* documentation is where
    its rules go to die.** Atlassian's product strings largely obey the guidance; Atlassian's
    documentation headings, nav labels and the guidance pages' own examples largely do not.
    If you publish a style guide, audit the pages that publish it first.

## Caveats & gaps

- **The marketing surface is effectively unharvested.** `www.atlassian.com/software/jira`
  and `/software/jira/pricing` are client-rendered and returned only `<head>` metadata to
  a server-side fetch (attempted three times each). No hero copy, no CTA inventory, no
  pricing figures, no seat definitions, no cancellation wording, no marketing FAQ. T2, T3
  (marketing half), T10 and T12 are all materially incomplete as a result. Every string
  attributed to those pages in this file comes from metadata and is labelled as such.
- **`support.atlassian.com` returns an empty body.** The Jira Cloud help centre — the
  primary self-service surface for the majority of Jira users, and the home of the
  `work item`-era help IA — is entirely unharvested. T11 describes the Data Center
  documentation instead, which is a different product edition with a different vocabulary.
- **All state and field content in T5 and T6 is from Jira Data Center documentation**, not
  Jira Cloud. Data Center retains `issue`, lacks the 2025 terminology change, and its
  default workflow (`Open` / `In Progress` / `Resolved` / `Closed` / `Reopened`) may differ
  from what a Cloud user sees today. **Do not use this file as evidence of current Jira
  Cloud in-product strings.** The status-category set (`To Do` / `In Progress` / `Done`) is
  common to both and is safe.
- **The default status list was recovered from an image `title` attribute**, not from body
  text. It is verbatim from the published page but it is a caption, not a UI string.
- **The status-category colours** (`To Do` grey, `In Progress` blue, `Done` green) are
  quoted verbatim from a page last modified December 2025 but are widely described
  elsewhere with a different assignment. Flagged as possibly stale.
- **`atlassian.design` renders server-side at `/foundations/content/...` but not at
  `/content/...`.** Three guidance pages were retrieved in full; `Inclusive language`,
  `Date and time`, `Empty state`, `Info messages`, `Success messages`, `Warning messages`
  and `Feature discovery` were identified in the nav and **not opened**. The `Empty state`
  page in particular would have filled T8.
- **`developer.atlassian.com` article bodies are client-rendered.** Only the REST API
  resource navigation was retrievable; no endpoint descriptions, field schemas or
  status-category API values were readable.
- **No Jira in-product error, empty-state, toast or validation string was observed.** The
  single error string in this file (`You cannot perform this operation on a draft
  workflow.`) is quoted from a community article *title*, not from the product.
- **No accessibility statement was found** for Atlassian. Either it is not published in the
  footer or it lives on a page not reached in this harvest.
- The `issue` → `work item` announcement is dated February 2025 and describes a March 2025
  rollout. Later Atlassian communications (referenced in search results but not fetched
  directly) indicate revised dates. The rollout status as of the harvest date was not
  independently verified.
- Only en-US observed.

## Sources

1. https://www.atlassian.com/software/jira — metadata only, body not rendered
2. https://www.atlassian.com/software/jira/pricing — metadata only, body not rendered
3. https://www.atlassian.com/agile/tutorials/workflows — nav and footer only
4. https://confluence.atlassian.com/adminjiraserver/issue-fields-and-statuses-938847116.html
5. https://confluence.atlassian.com/adminjiraserver/working-with-workflows-938847362.html
6. https://confluence.atlassian.com/adminjiraserver112/defining-status-field-values-1688896787.html
7. https://confluence.atlassian.com/adminjiraserver/configuring-issue-level-security-938847117.html
8. https://atlassian.design/foundations/content/voice-tone
9. https://atlassian.design/foundations/content/language-and-grammar
10. https://atlassian.design/foundations/content/designing-messages/error-messages
11. https://developer.atlassian.com/cloud/jira/platform/rest/v3/api-group-workflow-statuses/ — navigation only
12. https://community.developer.atlassian.com/t/work-is-the-new-collective-term-for-items-tracked-in-jira/88552
13. https://status.atlassian.com/
14. https://atlassian.design/content/writing-style — **blocked, empty body**
15. https://atlassian.design/content — **blocked, empty body**
16. https://support.atlassian.com/jira-software-cloud/docs/what-are-issue-statuses-priorities-and-resolutions/ — **blocked, empty body**
