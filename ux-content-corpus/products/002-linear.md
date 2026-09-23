# 002. Linear

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Issue tracker for software teams / product-development system, repositioned around human-plus-agent workflows |
| Primary URL | https://linear.app/ |
| Corpus rank | 002 |
| Benchmark strength (source list) | Concise labels and workflow states |
| Locale / market observed | en-US (single locale; no locale switcher present) |
| Platform observed | Web (desktop), public docs, published method guide, brand guidelines, status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product function. Compliance features named in pricing: `HIPAA compliance`, `Audit log`, `SCIM provisioning`, `IP restrictions`, `Domain claiming`; separate `DPA` and `AUP` legal documents; US and EU data regions shown as distinct status components |
| Harvest date | 2026-09-21 |
| Pages inspected | 14 |
| Harvest completeness | Full. Unusually complete for the state/label categories because Linear publishes its entire status, priority, SLA, and relation vocabulary in open docs. T8 (empty states) is genuinely `[absent]` — see Caveats |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://linear.app/ | Hero, four capability sections, changelog block; **the marketing page renders a live-looking product mock whose status labels, activity-feed sentences and agent states are in the DOM** |
| Pricing | https://linear.app/pricing | Four tiers, ~70-row comparison matrix, footnoted AI-credit dependency |
| Docs home | https://linear.app/docs | 17-group sidebar IA, `Popular` and `Linear basics` card sets with one-line glosses |
| Docs: Start Guide | https://linear.app/docs/start-guide | Onboarding routing by role and company size |
| Docs: Concepts | https://linear.app/docs/conceptual-model | The product's object model stated explicitly — richest T13 source |
| Docs: Issue status | https://linear.app/docs/configuring-workflows | **Highest-value page** — status categories, default set, and Linear's own internal workflow |
| Docs: Triage | https://linear.app/docs/triage | Triage actions, rules, responsibility rotation, two FAQs |
| Docs: Priority | https://linear.app/docs/priority | Five priority values plus a published refusal to add more |
| Docs: SLAs | https://linear.app/docs/sla | Six-value risk/outcome state set, notification thresholds, four FAQs |
| Docs: Issue relations | https://linear.app/docs/issue-relations | Four relation types and their directional labels |
| Docs: Notifications | https://linear.app/docs/notifications | Channel model, digest logic, five FAQs |
| Docs: Projects | https://linear.app/docs/projects | Project creation fields, timeframe certainty ladder, four FAQs |
| Docs: Project status | https://linear.app/docs/project-status | Five project status categories |
| Method: Write issues not user stories | https://linear.app/method/write-issues-not-user-stories | A published content-design position on task-title writing |
| Brand guidelines | https://linear.app/brand | Naming rules and colour names; **no voice or tone section** |
| Status page | https://linearstatus.com | Regional component model with per-component uptime |

(16 URLs across 14 distinct page types; the Method index and Brand page are counted separately in Sources.)

---

## T1 Navigation & IA labels

**Global nav — one word per item, almost without exception** `[observed]`

`Product` · `Resources` · `Customers` · `Pricing` · `Now` · `Contact` · `Docs` · `Open app` · `Log in` · `Sign up`

Eight of ten labels are a single word. This is the product's signature at the IA level and it is applied consistently: the changelog is at `Now`, documentation is at `Docs` (not "Documentation" — though the footer link carries both, rendered as `DocumentationDocs`, suggesting a visible label of `Docs` with `Documentation` as accessible text), and sales contact is `Contact`. Compare the competitive set, where the same slots typically read "Resources", "Customer stories", "Documentation", "Changelog", "Contact sales".

`Now` is the notable coinage — Linear's blog/changelog hub is named for the present tense rather than by content type. It carries no gloss in the nav, so the label is uninformative on first encounter; the product accepts a discoverability cost to keep the word count down.

**Three entry points for an existing user** `[observed]`: `Open app`, `Log in`, and `Sign up` all sit in the nav simultaneously, with `Open app` and `Log in` pointing at the same URL (`/login`). Two labels, one destination, side by side — the clearest CTA defect on the site.

**Docs sidebar — 17 groups, all noun phrases, one in second person** `[observed]`

`Getting started` · `Account` · `AI` · `Your sidebar` · `Teams` · `Issues` · `Issue properties` · `Projects` · `Initiatives` · `Cycles` · `Views` · `Find and filter` · `Linear Asks` · `Integrations` · `Analytics` · `Administration` · `Importers`

Fourteen are bare object nouns matching the product's own concepts one-to-one. Three break the pattern and each break is deliberate:

- `Your sidebar` — the only second-person label, used for the one group that describes the user's personal navigation surface rather than a shared object.
- `Find and filter` — the only verb pair, used for the group that has no object (search, filters, and saved queries are actions, not things).
- `Getting started` — the only gerund, used for the group that is a stage rather than a feature.

**The docs IA mirrors the object model exactly.** `Issues` → `Issue properties` → `Projects` → `Initiatives` → `Cycles` → `Views` is the containment hierarchy from the Concepts page, rendered as navigation. A user who learns the nav has learned the data model. This is the strongest structural decision in this harvest and it is only available to a product willing to constrain its object model to six nouns.

**Product sidebar labels, visible in the homepage mock** `[observed]`

`Pulse` · `Inbox` · `My issues` · `Reviews` · `Workspace` · `Initiatives` · `Projects` · `More` · `Favorites`

`Pulse` is a coined name for an activity surface. `My issues` is the only possessive. `More` as a disclosure label. Grouping headers `Workspace` and `Favorites` separate shared from personal, matching the `Your sidebar` docs group.

**Docs secondary nav** `[observed]`: `Docs` · `Developers` · `Learn` · `Contact support`. Three destinations for documentation-like content plus one for humans, in escalating order.

**Breadcrumbs** `[observed]`: two-level, group then page (`Teams` → `Issue status`; `Issue properties` → `Priority`). Method pages use `Method` → section name (`Method` → `Building`).

**Prev/next pagination on every docs page** `[observed]`: rendered as `Previous<PageTitle>` / `Next<PageTitle>` — e.g. `PreviousPriority` / `NextProjects`. The docs are explicitly linear (no pun intended): every page names its neighbours, so the reference set doubles as a readable sequence.

**`Copy page` control on every docs page** `[observed]`. A one-word affordance, placed beside the breadcrumb, for copying the page as text — almost certainly for pasting into an LLM. Worth recording as a new-genre UI string: documentation is now written to be ingested as well as read, and the label for that is two words.

**Footer — six groups** `[observed]`: `Product` · `Features` · `Company` · `Resources` · `Connect` · `Legal`.

Two observations. `Product` and `Features` are separate groups, and the split is by page type rather than by subject: `Product` holds the four capability pages (`Intake`, `Plan`, `AI`, `Build`) plus `Pricing` and `Security`, while `Features` holds the named-feature pages (`Asks`, `Agents`, `Coding Sessions`, `Customer Requests`, `Insights`, `Mobile`, `Integrations`, `Changelog`). A user looking for "Integrations" would plausibly check `Product` first. And `Switch` sits in `Resources` — a one-word label for a competitor-migration page, which is a confident piece of naming (it does not say "Migrate from Jira").

`Legal` is duplicated: the four legal links appear both as a footer column and again as a footer bottom-row (`Privacy` · `Terms` · `DPA` · `AUP`), so every page ships them twice.

**Accessibility furniture** `[observed]`: `Skip to content →` is present and first in the DOM on every page, with a trailing arrow. Notion, by contrast, ships no skip link.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The product development system for teams and agents`
> Subhead: "Purpose-built for planning and building products. Designed for the AI era."

The headline is a **category definition**, not a benefit and not a task: it names what the thing *is* ("the product development system") and who it is for ("teams and agents"). The definite article is doing the positioning work.

The headline is rendered **three times in the DOM** (responsive variants), and one of the three variants contains a double space: "The product development  system for teams and agents". Both the triplication and the stray space are recorded as defects — screen-reader users may encounter the headline repeated depending on CSS handling, and the double space suggests the three variants are maintained by hand rather than generated from one source.

The `<meta description>` reads "Purpose-built for planning and building products with AI agents." — a fourth variant of the same sentence, differing from the on-page subhead. Four near-identical strings for one value proposition.

**Positioning statement** `[observed]`

> `A new species of product tool.` — "Purpose-built for modern teams with AI workflows at its core, Linear sets a new standard for planning and building products."

A biological metaphor as the category claim. Notable for what it avoids: no speed number, no customer count, no feature list.

**Three-pillar block with figure captions** `[observed]`

Each pillar is a two-word adjectival phrase plus one sentence, and each carries a caption in the style of a scientific figure — `Fig 0.1`, `Fig 0.2`, `Fig 0.3`:

| Pillar | Sentence |
|---|---|
| `Purpose-built` | "Linear is shaped by the practices and principles of world-class product teams." |
| `Powered by agents` | "Designed for workflows shared by humans and agents. From drafting PRDs to pushing PRs." |
| `Designed for speed` | "Reduces noise and restores momentum to help teams ship with high velocity and focus." |

All three pillar labels are **past participles** (`Purpose-built`, `Powered by`, `Designed for`) — the product is described as something that was done deliberately, which is on-message for a company whose differentiator is craft. `Fig 0.1` numbering starting at zero is a deliberate affectation.

"Reduces noise and restores momentum" is the clearest articulation of the product's actual promise, and it is stated as two verbs on an implied subject rather than a benefit to the user.

**Four capability sections — gerund-or-verb pairs joined by "and"** `[observed]`

`Intake and integrations` · `Planning and monitoring` · `AI and automations` · `Build, review, and ship`

Three are noun pairs; the fourth is a three-verb imperative series. The inconsistency is visible in a scan of the four section headings. Each section closes with `Learn more→` (see T3).

Section body copy leads with an imperative and a mechanism:
- "Automatically turn conversations and customer feedback into actionable issues that are instantly routed, labeled, and prioritized for the right team."
- "Plan and navigate from idea to launch. Align your team with product initiatives, strategic roadmaps, and clear, up-to-date PRDs."
- "Build and deploy AI agents that work alongside you as teammates. Work on complex tasks together or delegate entire issues end-to-end."
- "Streamline code reviews with clear diffs, better context, and fewer back-and-forth comments. Keep PRs moving without sacrificing quality."

The last of these is the only one that names a cost being avoided rather than a capability being gained ("fewer back-and-forth comments", "without sacrificing quality"), and it reads as the most credible of the four.

**Closing CTA headline** `[observed]`: `Built for the future. Available today.` Two sentences, four words each, answering the "is this vapourware" objection that the `new species` framing invites. Repeated verbatim on the homepage and the pricing page.

**Social proof is stated once, numerically, without adjectives** `[observed]`: "Linear powers over **40,000** product teams. From ambitious startups to major enterprises." And on pricing: "Trusted by more than **40,000** companies". Note the unit changes between the two pages — "product teams" on the homepage, "companies" on pricing. Same number, two denominators.

**Method-page headline register is didactic, not promotional** `[observed]`

The Linear Method is published as a numbered curriculum with imperative chapter titles: `Set the product direction` · `Set useful goals` · `Prioritize enablers and blockers` · `Scope projects down` · `Generate momentum` · `Write issues not user stories` · `Manage design projects` · `Build with users` · `Launch and keep launching` · `Build in public`.

All ten are imperatives addressed to the reader's practice, not to the product. `Write issues not user stories` is the only one with a negation in the title, and `Launch and keep launching` the only one with a repeated verb. The section's framing line — "There is a lost art of building true quality software" — positions the product as a restoration rather than an innovation, which is the opposite of the homepage's "new species".

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav, docs nav, closing blocks | Primary acquisition |
| `Log in` | Global nav | |
| `Open app` | Global nav, closing block, docs nav | **Same URL as `Log in`**; two labels adjacent in the nav |
| `Get started` | All four pricing tier cards, homepage closing block | Used identically for Free, Basic and Business — no price or tier in the label |
| `Contact sales` | Enterprise tier, Business tier (secondary), closing block | Consistent casing, unlike Notion |
| `contact sales` | Pricing matrix, in the phrase "or contact sales" | Lowercase variant of the above on the same page |
| `Learn more→` | End of all four homepage capability sections | **Bare `Learn more` four times on one page**, differentiated only by the section above it |
| `View all→` | Changelog block | |
| `Customer stories→` | Homepage and pricing social-proof blocks | |
| `Download` | Closing block, footer | |
| `Copy page` | Every docs page, beside the breadcrumb | Copy-for-LLM affordance |
| `Contact support` | Docs secondary nav | |
| `Report a problem` | Status page — a `mailto:` link | Rendered twice on the page |
| `Subscribe to updates` | Status page | Rendered twice |
| `Download Brand Assets` | Brand page | |
| `Download` | Brand page, four times beside four assets | Four identical labels, four different files |
| `Get in touch` | Brand page legal paragraph — a `mailto:` | |
| `Design at Linear` | Brand page closing line, linking to careers | CTA text names the job, not the page |
| `View docs` | Pricing footnote on AI credits | |
| `Skip to content →` | First in DOM, every page | |
| `New Rule` | SLA settings (documented) | |
| `Set SLA` | Issue overflow menu (documented) | |
| `Edit project` / `Delete` | Project context menu (documented) | |
| `Make default` | Status settings (documented) | |
| `Remove relation` | Command menu (documented) | |
| `Create new issue related to…` | Command-menu entry, with ellipsis (documented) | The ellipsis signals a follow-up prompt |
| `Accept` / `Decline` / `Snooze` | Triage actions (documented) | See T6 |

**Observations.** Linear's CTA set is small — roughly a dozen distinct labels across the whole public site, against Notion's thirty-plus. The discipline is real: `Get started` is used for every self-serve tier rather than `Sign up` / `Get started` / `Try free` variants, and `Contact sales` never mutates into "Request a demo" or "Talk to us".

Two defects sit inside that discipline. `Open app` beside `Log in` pointing at one URL is a straightforward duplicate. And `Learn more→` at the foot of all four capability sections is exactly the pattern Wise avoids — the object is supplied only by proximity, so the link text is meaningless in a screen-reader link list, which would read "Learn more, Learn more, Learn more, Learn more".

The `→` glyph is appended to `Learn more`, `View all`, `Customer stories` and `Skip to content` but not to `Get started`, `Sign up`, `Download` or `Contact sales`. The rule appears to be **arrow for navigation, no arrow for action**, which is a defensible distinction and is applied consistently.

## T4 Onboarding & getting-started

**Onboarding is routed by role and by company size, not sequenced by step** `[observed]`

The Start Guide does not present numbered steps. It presents a three-stage frame — understand, then create, then configure — and then **branches by reader identity**:

> `Admins`
> - `How to use Linear: Small teams`
> - `How to use Linear: Startups & mid-size companies`
> - `How to use Linear: Large & scaling companies`
>
> `Team members`
> - `Tips for joining your team on Linear` — flagged "(recommended if you're new to an existing workspace)"

The `How to use Linear: <segment>` construction is a colon-delimited series title, so the three guides read as one document in three editions. And the audience split is the right one for a team tool: the person setting up a workspace and the person being added to one have almost no shared task. Most products write one onboarding path and let the second audience read it sideways.

The parenthetical "(recommended if you're new to an existing workspace)" is a **precondition stated at the link**, so the reader self-selects before clicking. Cheap and effective.

**Section headings are written as reader decisions** `[observed]`

`Overview and demo` — "Start here if you want to understand the layout and core workflows before setting anything up." The heading names the content; the sentence beneath names the *reader state* it suits. Same move at the next heading: "Once you've seen the basics, the next step is creating a workspace and configuring it for how your team works." Each section is hinged to the previous one with a temporal clause, which supplies sequence without numbering it.

**Four onboarding modes offered in parallel** `[observed]`: `Intro to Linear` (video), `Demo Linear` (sandbox workspace), `Live onboarding session` (scheduled human), `Learning Library` / `AI workflows` (video playlists). Plus `Learn from real examples` pointing at customer stories and "see how Linear uses Linear".

**The demo carries an honest limitations note** `[observed]`

> "*Note: Changes are local to your browser and reset on refresh. The demo does not include settings, and it does not show or support SLAs.*"

Three limits stated up front, including a named missing feature. A demo disclaimer that admits what is absent — rather than a generic "this is a demo" — prevents the user from concluding the product lacks SLAs.

**Signup precondition** `[observed]`: "Sign up using your work email" — the constraint is inside the instruction rather than surfacing as a validation error later.

**Concepts page as a second onboarding track** `[observed]`. The `Concepts` doc closes with a six-line summary of how the object model fits together, each line a single clause with no verb inflection variance:

> - issues track individual pieces of work
> - teams own the workflows those issues move through
> - cycles help teams plan short-term work
> - projects organize related issues around a deliverable
> - initiatives organize related projects around a broader goal
> - views help people navigate all of the above

All lowercase, all present tense, all `<subject> <verb> <object>`. This is a mental-model summary written as a grammar exercise, and it is the single most copyable artefact in the file: **six sentences that teach an entire product's object model**. The parallelism is what makes it work — `projects organize related issues` / `initiatives organize related projects` uses the same verb at two levels so the nesting is audible.

## T5 Form & field labels

**Project creation — one required field, two recommended** `[documented]`

> "While the only required field is the project name, we recommend also assigning a project lead and updating the project icon for better visibility and organization."

A three-tier field model (required / recommended / optional) stated in prose at the point of creation. Only `name` is required. Compare the typical project-creation modal with eight required fields.

**Timeframes — a certainty ladder as a field design** `[documented]`

> "Rarely will a project's precise end date be known in its early stages. Select start and target dates that match your level of certainty. Options are available to choose a year, half-year, quarter, month or precise day."

This is the best field-level pattern in the harvest. The date field accepts **five granularities** — `year`, `half-year`, `quarter`, `month`, `precise day` — and the help text instructs the user to pick the one matching their confidence rather than guessing at the finest one. Most date fields force day-precision and then collect fiction. Naming the coarsest option first (`year`) and the finest last (`precise day`) signals which end of the ladder is expected early.

Note `target date` rather than "due date" or "deadline" for projects, while issues keep `Due dates` as a separate named property. Two date concepts, two names, with `target` carrying the softer commitment.

**Issue and project property names** `[documented]`

Issue properties: `Due dates` · `Estimates` · `Issue relations` · `Issue labels` · `Priority` · `SLAs`. Project properties: `status` · `lead` · `target date` · `activity` · `labels` · `priority` · `dependencies` · `milestones`.

`lead` (singular, enforced) over "owner" or "assignees" — and the choice is justified in the FAQ: "We have a single lead field to keep ownership of the project clear." A field constraint defended in help copy rather than hidden.

`activity` as a groupable project property — "use activity to see which projects have recent momentum relative to other active projects". Momentum rendered as a sortable field.

**Relation field labels are directional and asymmetric** `[documented]`

| Sidebar label | Meaning | Flag colour |
|---|---|---|
| `Blocked by` | Issues blocking this one | orange |
| `Blocks` | Issues this one blocks | red |
| `Related` | Non-directional link | — |

Two labels for one relation, phrased from the viewing issue's perspective, so the same edge reads correctly from both ends. And the colour assignment is the interesting part: `Blocks` (you are the blocker) is red, `Blocked by` (you are blocked) is orange. The more urgent colour is on the state where *you* are the problem.

> "Once the blocking issue has been resolved, the relationship moves under *Related*."

The relation **degrades rather than disappears** when it stops mattering. The history is preserved at a lower salience — a genuinely good state-transition design and one that avoids the "where did my link go" failure.

**Status configuration fields** `[documented]`: each status has a `name`, `color`, and `description`. Shipping a description field on a status value is unusual and is what makes custom statuses self-documenting for new team members.

**Notification configuration vocabulary** `[documented]`: channels are `Desktop`, `Mobile`, `Email`, `Slack`; state is shown as "A green dot next to a channel means that notification method is enabled, while a gray dot means it is disabled." The `Notification format` selector offers `email digest` or `immediate delivery`.

**Keyboard shortcuts are documented as first-class labels** `[documented]`. Linear's docs quote shortcuts inline as part of the instruction rather than in an appendix: `G` then `T` (go to triage), `O` then `T`, `1` accept, `2` mark as duplicate, `3` decline, `H` snooze, `MM` mark duplicate, `P` priority, `M` then `R` relate, `M` then `B` blocked by, `M` then `X` blocks, `Shift` `P` move to project, `C` create, `Shift` `S` subscribe, `Cmd/Ctrl` `Shift` `S` unsubscribe, `Cmd/Ctrl` `I` toggle sidebar, `Cmd/Ctrl` `K` command menu. The pattern `<verb> with <key>` ("accept with `1`, mark as duplicate with `2`, decline with `3`, or snooze with `H`") puts the action first and the key second, which reads as instruction rather than reference.

## T6 Status & state language

**This is the product's strongest category and the reason it is in the corpus.**

### Issue status — six fixed categories, free labels inside them `[documented]`

Categories (fixed order, not renameable): `Backlog` → `Unstarted` → `Started` → `Completed` → `Canceled` → `Duplicate`, plus `Triage` as an additional category acting as an inbox.

Default status set shipped to new teams: `Backlog` → `Todo` → `In Progress` → `Done` → `Canceled`.

The architecture: **categories are immutable and ordered; the statuses inside them are user-named and reorderable.**

> "Teams can reorder statuses within each status category, but the categories themselves stay in a fixed order."

Note the deliberate split between category name and default status name. The category is `Unstarted`; the status inside it is `Todo`. The category is `Started`; the status is `In Progress`. The category is `Completed`; the status is `Done`. Categories are named in the *system's* aspectual vocabulary (started/unstarted/completed — states of a process), while the default statuses are named in the *team's* colloquial vocabulary (Todo/In Progress/Done — words people say at standup). Two registers for one state machine, each pointed at a different reader. This is a better-executed version of the same idea Notion reaches for with its three status groups.

**Linear publishes its own internal workflow**, which is the most useful single artefact here `[documented]`:

| Category | Linear's own statuses |
|---|---|
| `Backlog` | `Icebox`, `Backlog` |
| `Unstarted` | `Todo` |
| `Started` | `In Progress`, `In Review`, `Ready to Merge` |
| `Completed` | `Done` |
| `Canceled` | `Canceled`, `Could not reproduce`, `Won't Fix` |
| `Duplicate` | `Duplicate` (applied automatically) |

Three observations. `Started` carries three statuses, so the product's own team needs more granularity in-flight than at either end. `Canceled` also carries three, and the two extra ones — `Could not reproduce` and `Won't Fix` — are **reasons masquerading as states**: rather than a cancel action with a reason field, Linear ships the reason as the status, so the cancellation rationale is visible in a board column header. And `Icebox` sits above `Backlog` in the same category, giving the team a place to put things they are not even pretending to plan.

`Duplicate` is a **system-managed status that cannot be renamed or customized** — the one status the user does not own, because it is set by an action (marking a duplicate) rather than chosen.

> "making duplicates visible as a distinct outcome in workflows and reporting, not just as a relationship between issues"

Promoting duplicate from a relation to a terminal state is a reporting decision expressed as a vocabulary decision.

### Project status — five categories `[documented]`

`Backlog` · `Planned` · `In Progress` · `Completed` · `Canceled`

Almost the issue set, but `Unstarted` becomes `Planned` and `Duplicate` drops out. Projects get planned; issues just wait. The rename is small and correct.

> "Project statuses are updated manually—we do not do this automatically, even if all issues are completed."

An explicit statement that the system will not infer the state. For a stakeholder-facing status this is the right call and it is worth stating, because the reasonable user expectation is the opposite.

### Priority — five values, and a published refusal to add more `[documented]`

`No priority` · `Low` · `Medium` · `High` · `Urgent`

> "We don't have the option to set custom priorities or more granular priorities since it's easy to get carried away with specificity. Adding too many options makes it harder to set priority and leads to diminishing returns. If more granularity is needed, the best workaround is to create additional workflow statuses or use labels."

The most quotable design-rationale paragraph in this harvest. Linear documents the *absence* of a feature, gives the reason (specificity is a trap, and the cost lands on the person setting priority), and routes the user to the two mechanisms that are extensible. Compare Notion, which makes everything customisable and constrains only at the grouping level. Two defensible answers to the same problem, both stated in public.

Note `No priority` as an explicit named value rather than an empty state — it is a choice the user can make, it sorts last ("items without an assigned priority level are now always sorted last"), and it appears in SLA removal rules as a condition. Naming the null case is what makes it filterable.

`Urgent` is the only priority with behavioural consequences attached: "When an issue is marked as **Urgent**, Linear notifies the assignee and, if email notifications are enabled, also sends an urgent email notification." The priority is not just a label; the top value is a trigger.

### SLA status — six values across two axes `[documented]`

| SLA status | Definition (verbatim) |
|---|---|
| `Low risk` | More than 1 week away from SLA |
| `Medium risk` | Within 1 week of SLA |
| `High risk` | Within 1 day of SLA |
| `Breached` | SLA has passed |
| `Achieved` | Issue was completed within SLA |
| `Failed` | Issue was completed after SLA was breached |

Plus `No SLA` as a filterable seventh value.

The set mixes **two different kinds of state**: three forward-looking risk bands (low/medium/high risk), one live adverse state (`Breached`), and two retrospective outcomes (`Achieved` / `Failed`). The vocabulary shift is doing work — risk language while there is still time, outcome language once there is not. And `Breached` versus `Failed` is a real distinction that most products collapse: an issue can be breached and still open, or completed-after-breach and therefore failed. Separating "the clock ran out" from "we lost" lets a team see recoverable situations.

Each risk band is defined by an **absolute threshold, not a percentage** ("Within 1 day of SLA"), so the definition is legible without knowing the total duration.

Colour is described as a continuous ramp rather than discrete states: "SLAs appear on issues as a fire icon which transitions from gray > yellow > orange > red as an issue nears and breaches the SLA." A fire icon that gets hotter — the metaphor and the colour ramp carry the same information redundantly, which is the correct accessibility choice.

Default rules are stated as three plain conditionals `[documented]`:
- "When Priority is Urgent, add a 24 hour SLA"
- "When Priority is High, add a 1 week SLA"
- "When Priority is Medium, Low, or No Priority, remove the SLA"

The third rule is the interesting one — a **removal rule as a default**, justified as hygiene: "if an issue's priority is downgraded, SLAs which are no longer relevant will be removed."

### Triage actions — four verbs `[documented]`

`accept` (`1`) · `mark as duplicate` (`2`) · `decline` (`3`) · `snooze` (`H`)

Each has a defined state consequence and a comment affordance:
- Accept → "offer the option to leave a comment and then move the issue to your team's default status"
- Mark as duplicate → merges attachments and customer requests into the canonical issue, sets `Canceled` status type
- Decline → sets `Canceled` status type, "present the option of adding a comment with an explanation"
- Snooze → "hide the issue from the triage queue to return at a time of your choosing, or when there's new activity on that issue: whichever comes first"

`decline` rather than "reject" or "close" — softer, and it pairs with the offered explanation comment. Both the accept and decline paths **offer a comment at the moment of the decision**, which is where the rationale actually exists. Snooze's dual wake condition ("whichever comes first") is stated inline rather than buried.

A fifth, non-action option is named in prose: "To ask for more information from the user who created the issue, comment on the issue and keep it in Triage or snooze it until you're ready to take an action." The needs-info case is handled by *not* acting, and the docs say so rather than inventing a state for it.

### Live state labels rendered in the homepage product mock `[observed]`

Board column headers with counts: `Backlog 8` · `Todo 71` · `In Progress 3` · `Done 53` · `In Review 3`. The count is adjacent to the status name, unlabelled.

Issue identifiers use a team prefix: `ENG-2085`, `MKT-1028`, `DRV-8852`. A pagination counter renders as `1 / 84`.

Agent-work states: `Working…` (with ellipsis, shown twice per in-flight issue), `Worked for 8 sec`, `Worked for 1 min`, `Draft PR awaiting your review`, `Changed 2 files`, `added to context`.

`Worked for 8 sec` is worth flagging as a new state genre: an **agent labour receipt**, stating elapsed compute time in past tense as a completed unit of work. `Working…` as the in-flight form and `Worked for <duration>` as the resolved form is a clean present/past pair.

### Activity-feed sentence grammar `[observed]`

The mock renders the activity log, which gives the system's sentence templates:

- "Linear created the issue via Slack on behalf of Karri·2min ago"
- "Triage Intelligence added the labels Performance and iOS·2min ago"
- "Linear moved from Todo to In Progress·just now"
- "Linearconnected by Jori·2 min ago"

Pattern: `<actor> <past-tense verb> <object> [via <channel>] [on behalf of <person>] · <relative time>`. Three things to note. The actor slot holds agents as freely as people — `Linear`, `Triage Intelligence`, `Karri` — with no visual or grammatical distinction beyond the name, so an agent's action reads as an action, not an automation. `on behalf of` is the delegation construction, making provenance explicit when a system acts for a user. And status transitions render as **"moved from X to Y"** — both endpoints named, which is more informative than "status changed" and lets the log be read without the prior entry.

`Linearconnected by Jori` is a rendering defect (missing space or missing element boundary between the actor name and the verb phrase).

**Archive as a notified, reversible state** `[documented]`

> "When an issue archives, its creator will be notified—this is an opportunity to unarchive if the issue is still relevant. Archived issues are still searchable and restorable in the future."
> "Archiving is only automatic and is not available as a manual action."

Two good decisions stated plainly: the automatic state change notifies the person most likely to object, and the notification is explicitly framed as an opportunity to reverse. Also the honest constraint that archiving cannot be done by hand.

## T7 Error, failure & recovery

`[absent]` for error strings. Linear's public surfaces carry **no error-message catalogue, no troubleshooting category, and no "I can't…" article set.** The docs sidebar has 17 groups and none of them is a failure group — there is no equivalent of Notion's `Fix a problem`. Support routing is a single link (`Contact support`).

This is a genuine negative finding rather than a harvest gap. Searched: the full docs sidebar, the docs home card sets (`Popular` and `Linear basics`), and every FAQ block on the six doc pages opened.

**Failure and recovery are handled instead as states and relations** `[documented]`, which is the more interesting observation:

- `Could not reproduce` and `Won't Fix` are statuses, so the two most common "we are not doing this" outcomes are first-class and visible on a board rather than buried in a comment.
- `Breached` and `Failed` are SLA states, so missing a commitment is a named, filterable, reportable condition rather than an error.
- `decline` is a triage action with an explanation comment attached, so rejecting work is a designed path.
- `Blocked by` with an orange flag surfaces the dependency failure on the blocked issue's own page.

The transferable point: **a product can address failure through its state vocabulary instead of its error copy.** Where Notion writes a help article for each failure, Linear adds a status. Neither approach covers the other's ground — Linear has nothing to say to a user who cannot log in.

**Recovery affordances found in docs** `[documented]`

| Affordance | Copy / behaviour |
|---|---|
| Unarchive | Creator notified on auto-archive, "an opportunity to unarchive" |
| Restore deleted project | "found in the team's archive under the 'Recently deleted projects' tab for 30 days before they are permanently deleted" |
| Remove relation | Hover the related issue and click the `X`, or `Remove relation` from the command menu; "If you have more than one relation, you'll be prompted to select which relation to remove" |
| Unsubscribe | `Cmd/Ctrl` `Shift` `S` |
| Undo priority | "Use the shortcut again to change or remove it" |
| Duplicate banner | "Duplicate issues show a link to the original issue directly in the issue view, including a dedicated banner and sidebar treatment that links back to the original issue" |

The duplicate banner is a recovery pattern worth naming: a user who lands on a dead-end duplicate is given the live issue in a banner, so the terminal state is never a dead end.

**Conflict surfacing rather than conflict prevention** `[documented]`

> "Once configured, rules are executed in order from the top down. … If rules conflict, this is surfaced in the interface."

Triage rules are allowed to conflict, and the interface tells the user. The alternative — blocking the save — would be more "correct" and less useful, since rule conflicts are often intentional during setup. The exact surfacing copy was not captured.

**Documented gotchas stated before the user hits them** `[documented]`

- "Creating or changing a rule does not automatically apply it to existing matching issues."
- "When an issue matches multiple SLA rules, only the first matching rule is applied."
- "Applying an SLA clears any existing due date from the issue."
- "Issues can only be associated with one project at a time." (with a stated workaround via sub-issues)
- "You cannot mark issues the other way around (e.g. view the canonical issue and mark other issues as duplicates of it)."
- "You cannot select *only* status changes." (notification grouping)

Six cannot-do statements written in plain declarative form, placed in the section where the user would attempt the thing. Linear's failure-prevention budget is spent here rather than on error strings.

## T8 Empty states

`[absent]` — and honestly so.

No empty-state copy was observed on any public surface and none is documented. Specifically checked:

- The docs have no empty-state article and no screenshots of empty views described in text.
- The homepage product mock renders a **fully populated** workspace (84 issues, 8 in backlog, 71 in todo, 53 done) — the marketing surface deliberately shows density, not first-run.
- The demo workspace (`linear.app/demo`) would be the place to observe first-run and no-results states, but it is a JS application and was not fetched.
- The status page's incident list was empty at harvest time but rendered as the all-clear state (see T9), not as a no-data empty state.
- Search, filter, and no-results copy is entirely in-app.

Two adjacent strings were found, neither of them an empty state:

- `No priority` — a named null *value*, not an empty state (see T6). Worth distinguishing: Linear names the absence of a property rather than showing nothing.
- `Icebox` — a status for work with no plan, i.e. a named home for the things that would otherwise make a backlog look empty of intent.

The absence is itself a finding for a corpus entry on a product selected for label concision: Linear's public surfaces give a content designer almost everything about state vocabulary and nothing about zero-data copy. An authenticated or browser-rendered pass on `linear.app/demo` would be required.

## T9 Notifications & system messages

**Channel model — four channels, timing differentiated by urgency** `[documented]`

> "You'll always see notifications in your Linear inbox. For real-time alerts, you can use the Linear desktop app, mobile app, Slack, or email digests."

The inbox is the guaranteed floor; the four channels are optional amplifiers. Channels: `Desktop`, `Mobile`, `Email`, `Slack`. State shown as a coloured dot with the meaning stated in the docs ("A green dot … enabled, while a gray dot … disabled").

**Delivery logic is published, including the suppression rule** `[documented]`

> "Desktop, mobile and Slack notifications are sent in real-time. Email digests send with time delays based on urgency, and are only sent if you haven't already read the Linear inbox notification."

The suppression condition — email only fires if the in-app notification is unread — is exactly the rule users assume is missing when they get duplicate pings. Publishing it is good practice. And the digest delay is a function of urgency rather than a fixed interval: "They're configured to send out after a certain amount of time has elapsed depending on properties such as issue status."

**Notifications are grouped, and the grouping is admitted as a limitation** `[documented]`

> "Notifications are grouped. For example, the status-changes category includes issue completions and cancelations, urgent-priority changes, and changes to blocking relationships. You cannot select *only* status changes."

A product that names its own coarse granularity in the settings documentation, in the sentence where the user would discover it. `status-changes` is given as a hyphenated internal category name in user-facing prose — a small leak.

**Subscription model stated as a list of triggers** `[documented]`

> "You are automatically subscribed to an issue when you create it, are assigned to it, are @mentioned in an issue comment or description, or if you use the menu in the Activity section to subscribe manually."

Four auto-subscribe triggers enumerated, plus a scoping distinction that is easy to get wrong and is called out: "If you are @mentioned in a comment in an issue thread, you will be automatically subscribed to the thread, but not to the overall issue." Thread-level versus issue-level subscription, disambiguated.

**SLA notification thresholds, with a business-day variant** `[documented]`

> "Subscribers to an issue with an SLA receive notifications in their Inbox when SLAs are 24 hours away from being breached as well as when SLAs are breached."
> "Slack team notifications for 'an issue is at risk of breaching SLA' are sent 24 hours before the SLA breaches, or if using business day SLAs, one business day."

The quoted Slack notification subject — "an issue is at risk of breaching SLA" — is the one notification string captured verbatim. It uses the risk register rather than the failure register, consistent with the SLA state vocabulary in T6.

**Inbox retention limit, stated numerically** `[documented]`: "Linear retains up to 2,000 open notifications in your inbox. When this limit is exceeded, notifications are automatically archived." A silent-truncation behaviour published rather than discovered.

**Changelog entries lead with the problem, not the feature** `[observed]`

The four homepage changelog entries share a structure: feature name as the title, then one or two sentences that **state the prior pain before the new capability**.

| Title | Structure of the entry |
|---|---|
| `Priority inbox` | Opens with the problem — an active workspace generates many notifications and "until now your inbox treated them all the same" — then the fix, then a concrete stake ("a review blocking a release never gets buried") |
| `Loops for product management` | States what Loops are, then what is newly true |
| `Coding sessions` | New capability, then the consequence ("fewer handoffs and changes that are further along when they come back to you") |
| `Team initiatives` | Concept restated, then a strategy-to-team argument, then the new capability |

`Priority inbox` is the model: **problem → "until now" → change → named worst case avoided.** The "until now" construction admits the previous version was wrong, which is unusual in release notes and is the reason the entry reads as honest.

Every entry ends with a plain date (`Sep 10, 2026`), and the block closes with `View all→`.

**Status page — regional components with published uptime** `[observed]`

Aggregate: `We're fully operational` / "We're not aware of any issues affecting our systems." (Identical strings to Notion's status page — both are incident.io-hosted, so this is vendor default copy rather than either company's voice. Worth recording precisely because a content designer might otherwise credit it to the product.)

Components are split by **region first, then service**:

| Component | Uptime shown |
|---|---|
| `US Region – Linear application` | 99.83% |
| `US Region – Linear API` | 100% |
| `US Region – Integrations` | 100% |
| `EU Region – Linear application` | 99.93% |
| `EU Region – Linear API` | 100% |
| `EU Region – Integrations` | 100% |

Three services × two regions, with an en-dash separator and a rolling `Jun 2026-Sep 2026` window. Publishing a sub-100% figure (99.83%) unrounded is the notable choice — the number is not flattering and it is not hidden. Contrast Notion's status page, which shows a component tree with no uptime figures at all.

`Report a problem` is a `mailto:support@linear.app` link placed beside `Subscribe to updates` — an inbound channel on a status page, which most status pages omit. Both controls render twice in the DOM.

**Escalation integrations named** `[documented]`: triage responsibility rotation can connect to "PagerDuty, OpsGenie, Rootly, or Incident.io schedules", with an API offered for others. Naming four competitors' products in help copy is a confidence signal.

## T10 Disclosures, legal & compliance

**Pricing tier inheritance stated as a formula** `[observed]`

Each tier's feature list opens with a single inheritance line rather than repeating the previous tier:

- Free: (no inheritance line) — `Unlimited members`, `2 teams`, `250 issues`, `Agent platform`, `Linear Agent`
- Basic: `All Free features +`
- Business: `All Basic features +`
- Enterprise: `All Business features +`

The `+` glyph as the operator. Four tiers, three inheritance statements, zero repeated bullets. This is the same problem Notion solves with `Same as business` cell values, handled more cleanly — the inheritance is declared once at the top of the list rather than in individual cells.

**Billing cadence disclosed per tier, in the price block** `[observed]`: `Free for everyone` (Free), `Billed yearly` (Basic, Business), `Annual billing only` (Enterprise). The Enterprise line states a *constraint*, not a default — "only" is doing the work. Prices are given as `$10 per user/month` and `$16 per user/month` with the yearly-billing note directly beneath, so the monthly figure and the annual commitment are adjacent rather than requiring a toggle.

**Numeric limits stated as bare values with units** `[observed]`: `250 issues`, `2 teams`, `5 teams`, `10MB` file upload, `15 pipelines`, `1 level` / `5 levels` of sub-teams. In the matrix these render as "250 issues" and "2 teams" — value plus unit, no hedging language, no "up to".

**A footnoted metered dependency** `[observed]`

Two matrix rows (`Coding sessions**`, `Loops**`) carry a double-asterisk resolving to:

> `** Requires AI credits` — followed by `View docs`

A feature that is nominally included in the tier but consumes a separate metered resource, disclosed with a marker at the row and an explanation plus a docs link at the table foot. The honest version of "included" for usage-billed AI features, and the pattern generalises to any tier feature with a consumption cost behind it.

**Add-on flagged inline** `[observed]`: `Salesforce integration` carries an `Add-on` badge in the matrix cell — i.e. present in the tier but separately priced. Two distinct "not quite included" markers (`**` for metered, `Add-on` for separately purchased) doing two different jobs.

**Compliance features named without expansion** `[observed]`: `SSO` (with values `Google` and `Google + SAML`), `Admin roles`, `Team owners`, `Advanced authentication`, `SCIM provisioning`, `IP restrictions`, `Domain claiming`, `Audit log`, `Third-party app management`, `HIPAA compliance`, `Custom terms`, `Uptime SLA`.

Unlike Notion, Linear **does not expand acronyms and does not gloss any row**. The matrix is 70 rows of bare labels with no explanatory sentences at all. This is a defensible register choice for a buyer audience that already knows what SCIM is, and it is the sharpest contrast in this five-product set: Notion explains every row in plain language, Linear explains none. The cost is that a first-time buyer cannot self-serve; the benefit is a matrix that can be scanned in seconds.

`SSO` showing `Google` as a *value* on three tiers and `Google + SAML` on the fourth is a neat compression — the cell states which providers, not just yes/no.

**Brand guidelines as a licensing disclosure** `[observed]`, https://linear.app/brand

The naming rules are stated as requirements:

> "'Linear' is a single word, always spelled with a capital 'L'. It is the brand name of both our company and our application (not 'Linear app')."

Plus a proper-noun rule for releases ("e.g. 'Linear Method'"). The prohibition — not "Linear app" — is stated parenthetically inside the rule, which is where a reader would make the mistake.

The IP paragraph opens with a softener and then lists four prohibitions: "This is a friendly reminder that the provided graphics are proprietary and protected under intellectual property laws." Substance: do not alter the files; do not imply a relationship or endorsement; do not use the graphics in your own product or service name; do not combine with other graphics without written consent. Closing with `Get in touch` for questions. Four discrete prohibitions in one sentence with no list formatting — the one place on the site where the copy gets denser rather than shorter.

**Usage guidance written as physical instruction** `[observed]`: "Provide plenty of space around Linear assets. Make them big or make them small, but give them room to breathe. They shouldn't feel cramped or cluttered." Clearance rules expressed as a felt quality rather than a pixel value, which is unusual for a brand page and consistent with the product's craft framing.

**Colour names** `[observed]`: `Mercury White` (#F4F5F8) and `Nordic Gray` (#222326), with a `Copy` control on each. Two named neutrals and a described-but-unnamed "subtle desaturated blue" as the primary — the brand's actual primary colour has no name on its own brand page.

**Legal document set** `[observed]`: `Privacy` · `Terms` · `DPA` · `AUP`. `DPA` and `AUP` unexpanded in the footer, and the status page's "Privacy policy" link points at the DPA rather than the privacy policy — a **mislabelled legal link**, worth recording as a defect since legal document identity matters.

**Data-retention and deletion windows** `[documented]`: deleted projects recoverable for 30 days from `Recently deleted projects` before permanent deletion; inbox retains 2,000 open notifications; auto-close and auto-archive periods are team-configurable. All stated as numbers.

## T11 Help-centre architecture

Linear ships **docs, not a help centre**, and the distinction is structural rather than cosmetic.

**Shape:** a single flat 17-group sidebar mirroring the object model (see T1), with no category landing pages, no article-type chips, no "popular articles" ranking beyond one card block on the index, and no search-first hero. Every page is reachable from the persistent sidebar in one or two clicks, and every page names its previous and next sibling.

**Docs index has exactly two card sets** `[observed]`

`Popular` — four cards:

| Title | Gloss (verbatim) |
|---|---|
| `Start Guide` | "Learn how to use the app and follow best practices for software building" |
| `Import Issues` | "Quickly move issues from your existing issue tracker into Linear" |
| `Projects` | "Shape your product ideas and plan what to build next" |
| `GitHub Automations` | "Link issues and automate pull request workflows" |

`Linear basics` — eight cards:

| Title | Gloss (verbatim) |
|---|---|
| `Workflows` | "Create new statuses and design custom issue workflows" |
| `Select Issues` | "Learn how to take actions on multiple issues at a time" |
| `Issue Relations` | "Indicate blocked, blocking, related, and duplicate issues" |
| `Display Options` | "Order, sort, and group issues and projects and customize views" |
| `Triage` | "Use a special inbox for issues from integrations and other teams" |
| `Parent and Sub-Issues` | "Break down larger tasks into smaller pieces of work" |
| `Notifications` | "Learn how to manage notifications and stay up to date" |
| `Teams` | "Create teams in your workspace to organize different types of work functions" |

**The gloss grammar is the artefact.** Every one of the twelve glosses is a **verb-first phrase describing what the reader will be able to do**, not what the page contains. `Workflows` → "Create new statuses and design custom issue workflows". `Issue Relations` → "Indicate blocked, blocking, related, and duplicate issues". The title is the object; the gloss is the verb. Same label-plus-gloss construction Notion uses in its nav, but where Notion's glosses are benefit claims ("Automate busywork"), Linear's are **task statements** — and a task statement is testable against the page contents in a way a benefit claim is not.

Note the second-person "Learn how to…" appears in only three of twelve glosses, and reads weaker than the nine that start with a bare verb. `Notifications` → "Learn how to manage notifications and stay up to date" against `Triage` → "Use a special inbox for issues from integrations and other teams".

Card titles use **Title Case** (`Select Issues`, `Issue Relations`, `Parent and Sub-Issues`, `Display Options`) while page H1s and sidebar labels use **sentence case** (`Issue status`, `Issue relations`, `Project status`, `Find and filter`). Two casing conventions for the same page names, split by surface. `Workflows` in the card set is the page titled `Issue status` — a **title mismatch** between the index card and the destination H1, inherited from a rename (the URL is still `/docs/configuring-workflows`).

**Article-title grammar — three shapes** `[observed]`

| Shape | Examples |
|---|---|
| Bare object noun (dominant) | `Priority` · `Triage` · `Projects` · `Notifications` · `Estimates` · `Due dates` · `Documents` · `Concepts` |
| Qualified object noun | `Issue status` · `Issue relations` · `Issue labels` · `Project status` · `Project labels` · `Project priority` · `Project templates` · `Project dependencies` · `Project graph` · `Project overview` · `Private teams` · `Sub-teams` · `Team pages` |
| Imperative or guide title | `Start Guide` · `Import Issues` · `Select Issues` · `How to use Linear: Small teams` · `Tips for joining your team on Linear` |

The qualified-noun shape is doing the disambiguation that a category hierarchy would otherwise do: because `Priority` exists for issues and `Project priority` for projects, the title carries the scope. Thirteen pages in the Projects group all begin with the word `Project`, which reads repetitively in the sidebar but is unambiguous out of context — in search results, in an LLM's retrieval, in a pasted link.

**Page-internal structure is rigidly uniform** `[observed]`

Every doc page: H1 → one-sentence purpose statement → hero screenshot → `## Overview` → `## Configure` (where applicable) → `## Basics` (where applicable) → topic sections → `## FAQ` (where applicable) → prev/next → on-page contents list at the foot.

The `Overview` / `Configure` / `Basics` triad appears on Triage, SLAs, Issue status, Notifications and Priority in that order. A template applied with unusual consistency, and the ordering is right: what it is, how to turn it on, how to use it.

The one-sentence purpose statement under the H1 is reused verbatim as the `<meta description>` on every page — e.g. `Priority`: "Set issue priority to indicate which issues to complete first." One sentence serving as page subtitle, meta description, OG description and Twitter description. Single-sourcing that most docs sites do not bother with.

**Tip callouts carry Linear's own practice** `[observed]`

A recurring illustrated callout labelled **`How we work at Linear`** or **`How we work`** appears inside reference docs, containing Linear's internal conventions rather than instructions:

- On `Issue status`: the full six-category internal workflow (quoted in T6).
- On `Projects`: "The project lead is in charge of writing the spec and general execution. Other team members collaborate on the brief, split up areas of work, and then write their own issues."
- On `Projects`, labelled `Example views we've attached to projects`: a `current user` view, a `bug` label view, and "A 'standup' view filtering for `In Progress` helps us have more efficient standups."
- On `Projects`, labelled `Example project views we've attached`: a view filtered to `In Progress` project status.

This is the most distinctive thing about Linear's docs. The reference page tells you what the feature does; the callout tells you **how the people who built it actually use it**, named as their practice rather than as a recommendation. It converts configuration docs into opinionated guidance without making the opinion normative, and it gives the reader a known-good default when the feature is open-ended.

**Routing furniture** `[observed]`: sidebar search is absent from the server HTML; the secondary nav offers `Docs` · `Developers` · `Learn` · `Contact support`, with human contact last and unemphasised. No "was this helpful" widget, no feedback control, no related-articles module beyond prev/next. A markedly thinner support layer than Notion's.

## T12 FAQs

**No FAQ block on the marketing or pricing pages** `[absent]`. Linear's pricing page — 70 rows of comparison matrix — carries **zero questions and zero explanatory prose**. There is no "Questions & answers" section, no billing FAQ, no refund policy, no seat-counting explanation, no "what happens if I downgrade". This is a substantial and deliberate absence next to Notion's 17-question pricing FAQ, and it is the clearest expression of the two products' different assumptions about who is reading.

**FAQs live at the foot of individual docs pages, scoped to the feature.** `[observed]` Fifteen questions were captured across four pages. All are rendered as collapsible items; the answers were present in server HTML and are summarised below.

### `Triage` — 2 questions

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | Can I require priority to be set before an issue leaves Triage? | Yes; configured under Team Settings > Triage |
| 2 | Why are issues in Triage not showing up in my views? | By design — triage issues are excluded from all views because triage sits outside the normal workflow; include them by adding a status filter that includes "Triage" |

Q2 is a **designed-behaviour complaint**, answered by explaining the rationale before the workaround. The answer leads with "By default, we exclude…" — owning the decision in the first clause rather than treating the behaviour as a quirk.

### `Notifications` — 5 questions

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | My notifications are enabled. Why am I not receiving them? | Delivery may be routed to an active desktop or browser session; otherwise contact support |
| 2 | Do you support browser-based notifications? | No new browser push subscriptions; use the desktop app, or mobile/Slack/email; inbox always available |
| 3 | Why isn't the red badge showing up on the Linear icon in my dock? | Check macOS notification settings and the badge setting |
| 4 | What status changes generate notifications? | Completions and cancelations, for subscribed issues; for per-status notifications use a view subscription |
| 5 | Is there a limit to how many notifications you can keep in your inbox? | 2,000 open notifications, then automatic archiving |

Q1 uses the **two-sentence statement-then-question** form ("My notifications are enabled. Why am I not receiving them?"), which pre-empts the answer "check your settings" by establishing that the user already did. The same construction Notion uses in its help FAQ. Q3 is OS-specific and names the platform in the question. Q2 answers a feature request with a flat "not currently" plus three alternatives and the guaranteed floor.

### `SLAs` — 4 questions

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | What is the best way to view SLAs? | Custom view filtered to issues with SLAs, grouped by SLA status, plus Insights |
| 2 | Can I add custom names for SLAs? | "No, we do not offer custom naming for SLAs." |
| 3 | When does Linear send a notification to subscribers that an SLA will be breached? | 24 hours prior |
| 4 | What's the relationship between SLAs and due dates? | Mutually exclusive — applying an SLA replaces an existing due date |

Q2's answer is seven words and contains no apology, no roadmap hedge, and no workaround. Linear's FAQ answers to feature requests are consistently this short — compare the Priority doc's refusal, which is longer because it carries a rationale. The pattern seems to be: **refuse briefly in an FAQ, refuse with reasons in the body copy.**

### `Projects` — 4 questions

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | Can I make a project for ongoing work? | Technically yes but discouraged; three workarounds offered (no target date, time-boxed splits, a custom `Maintenance` status) |
| 2 | Can I add multiple project leads? | No — single lead keeps ownership clear; add others as members, who must opt in to notifications |
| 3 | How is it decided what projects are listed in the project picker menu? | Priority order given as a list: led, member of, recently created by user, overlapping teams, active, recently created, then cancelled and completed |
| 4 | Where is the roadmap timeline view? | Roadmaps were renamed Initiatives; timeline available under "Display" |

Q1's answer is a model of a defensible no: "Technically yes, you can create a project without a completion date -- but we encourage projects to have a clear start and end. We're looking into better ways to manage this type of work but in the meantime there are a few workarounds". It concedes the mechanism, states the opinion, admits the gap is known, and offers three routes. (The double hyphen `--` where an em-dash belongs is a typographic slip.)

Q3 is unusual: it documents a **ranking algorithm** in user-facing help. Most products treat picker ordering as invisible; Linear lists the seven signals in order. A user who understands the ordering can predict the menu.

Q4 is a **rename-migration FAQ** — the question is asked in the old vocabulary and the answer supplies the new one. Shipping an FAQ keyed to the term you retired is how you catch the users who learned the product before the rename.

**Structural note on all four blocks.** The collapsible anchors render as opaque hashes — `#collapsible-6554f37d047c`, `#collapsible-11bbc5452305`, `#collapsible-2b6053fecc38` — rather than readable slugs. These are the only linkable handles for the FAQ answers, so a support agent cannot send a user a meaningful deep link, and the anchor text carries no information for a screen-reader user encountering it in a link list. A small but real defect in an otherwise careful docs system.

## T13 Terminology & glossary

Linear publishes its object model as a dedicated `Concepts` page, which makes this the most directly documented terminology set in the corpus.

| Term | Linear's usage | The alternative it rejected |
|---|---|---|
| `issue` | "the fundamental unit of work"; explicitly covers "bugs, feature work, follow-up tasks, or internal requests" | `task`, `ticket`, `card`, `story` — and `user story` is rejected by name in a published essay |
| `team` | "the primary organizational unit"; owns workflow, cycles, labels, issues | `project`, `squad`, `group`, `space` |
| `workspace` | The company-level container, one URL per workspace | `organization`, `tenant`, `instance` |
| `project` | "units of work that have a clear outcome or planned completion date" | `epic` — the Jira term, absent from every page harvested |
| `initiative` | Above projects; "not just what the team is shipping, but why the work matters" | `roadmap` — **explicitly renamed**, with an FAQ documenting the change; also `objective`, `theme` |
| `cycle` | "a team's repeating planning period" | `sprint` — the word appears nowhere in Linear's own docs prose, though the pricing page and homepage use `sprints` in customer-facing marketing |
| `milestone` | Stages of completion inside a project | `phase`, `checkpoint` |
| `view` | "different ways of looking at the same underlying work… They do not change the work itself" | `filter`, `saved search`, `report` |
| `workflow` | "a group of ordered issue statuses defined per-team" | `pipeline`, `board`, `state machine` |
| `status` (issue/project) | The state; grouped into fixed `categories` | `state`, `stage`, `column` |
| `Triage` | Capitalised as a named surface and a status category, lowercase as a process | `inbox`, `queue`, `intake` — though `Intake` is used as a *marketing* section name for the same capability |
| `lead` | The single owner of a project | `owner`, `manager`, `DRI` |
| `estimate` | Sizing property | `story points` |
| `Pulse` | Coined name for the activity surface | `Activity`, `Feed` |
| `Loops` | Coined name for recurring agent workflows | `Automations`, `Recipes`, `Workflows` (already taken) |
| `Linear Asks` | Coined name for the Slack-based intake product | `Requests`, `Helpdesk` |
| `Coding sessions` | Agent code-execution runs | `jobs`, `runs`, `tasks` |
| `Triage Intelligence` / `Code Intelligence` | The two named LLM-assist features | `AI triage`, `smart routing` |
| `Icebox` | A status above `Backlog` for unplanned work | `Someday`, `Parking lot` |
| `Won't Fix` / `Could not reproduce` | Cancel *reasons* shipped as *statuses* | a resolution field |
| `Breached` / `Achieved` / `Failed` | SLA outcomes, deliberately three words not two | `missed` / `met` |
| `Switch` | The competitor-migration page | "Migrate from Jira", "Why Linear" |
| `Now` | The changelog and blog hub | `Blog`, `Changelog`, `Updates` |
| `Method` | The published practice guide | `Playbook`, `Handbook`, `Guide` |

**Two documented renames.** `Roadmaps` → `Initiatives` (with an FAQ pointing the old term at the new one) and `Workflows` → `Issue status` (page H1 renamed, URL slug `configuring-workflows` and index card title `Workflows` both left behind — three surfaces, two names). `workflow` survives as a *concept* noun meaning the ordered set, while `Issue status` is the settings page, so the rename was a scope narrowing rather than a synonym swap.

**A rejected term with a published argument.** The Method essay `Write issues not user stories` is the corpus's clearest example of a product arguing against a competitor's vocabulary in public. Substance: user stories were a translation layer built when customers could not articulate requirements; they are now "a cargo cult ritual", time-consuming to write and read, they push product-level concerns down to the task level, they silo engineers into mechanical execution, "and frankly, they don't match how we communicate about software in real conversations." The prescription is `issue` — "short and simple issues that describe the task in plain language."

**`cycle` versus `sprint` is the sharpest single terminology decision.** The docs never say sprint; the marketing pages do (`Ship faster with automated sprints` is Notion's headline, but Linear's own pricing matrix and homepage reference `sprints` too). A coined term for the docs and the familiar term for the buyer — a register split by surface, same as Wise's `Wise Multi-Currency Card` versus `Wise card`.

**`Intake` versus `Triage`.** The homepage section is `Intake and integrations`; the product surface and status category are `Triage`. Marketing names the inbound *motion*, the product names the *review step*. Defensible, but it means a user who read the homepage looks for a feature called Intake and finds one called Triage.

**Capitalisation is inconsistent across coined product names.** `Linear Asks` and `Triage Intelligence` are title-cased; `Coding sessions` and `Code Intelligence` are mixed (`Coding sessions` in docs and pricing, `Coding Sessions` in the footer); `Loops` is a bare capital. The footer says `Coding Sessions`, the pricing matrix says `Coding sessions`. For a product whose brand page mandates capitalisation rules for its own name, the feature names are looser.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company — and the `we` is used far more assertively than in the comparison set. Linear's `we` appears in *refusals* and *opinions*, not just in service statements:

- "We don't have the option to set custom priorities…"
- "No, we do not offer custom naming for SLAs."
- "We have a single lead field to keep ownership of the project clear."
- "Project statuses are updated manually—we do not do this automatically…"
- "By default, we exclude triage issues from all views…"
- "we encourage projects to have a clear start and end"
- "We recommend keeping these in the workspace."
- "At Linear, we don't write user stories and think they're an anti-pattern…"

**This is the defining voice characteristic.** The company is present as an opinion-holder, and the opinions are stated as decisions with reasons rather than as apologies or roadmap deferrals. A content designer can read this as a register option: the first-person plural can carry *judgement* as well as *service*. It only works where the product is genuinely opinionated — the same sentences from a product that customises everything would read as evasion.

**Register.** Short declaratives, minimal hedging, no exclamation marks observed anywhere across 14 pages, no emoji, no interjections, no "Oops". Contractions used ("don't", "you'll", "it's", "we're"). Sentence length is short in docs and shortest in labels. The one place the register loosens is the `How we work at Linear` callouts, which read as a colleague talking ("A 'standup' view filtering for `In Progress` helps us have more efficient standups").

The Method essays run to a different register again — argumentative long-form with a polemical edge ("cargo cult ritual", "obsolete", "anti-pattern", "There is a lost art of building true quality software"). Three registers total: label-terse, docs-declarative, method-polemical. The gradient is by *surface* rather than by stakes, which is the opposite of Wise's stakes-based gradient and equally coherent.

**Craft vocabulary as a house style** `[observed]`: `craft`, `momentum`, `noise`, `velocity`, `focus`, `purpose-built`, `quality`, `species`, `standard`. The word `craft` appears in a customer quote positioned on the homepage ("just because of the craft that using Linear infuses on your brain"), and there is a whole page at `/quality`. The product sells a feeling about work, and the lexicon is consistent about which feeling.

**Numbers are used sparingly and exactly** `[observed]`: `40,000` teams/companies, `99.83%` and `99.93%` uptime, `2,000` notifications, `250` issues, `50,000`-equivalent limits absent, `Fig 0.1`. There is no "10x faster", no "save N hours", no percentage-improvement claim anywhere in the harvest. For a product whose third pillar is `Designed for speed`, the absence of a speed *number* is striking and consistent — the claim is made qualitatively and never substantiated numerically, which is either admirable restraint or an unfalsifiable claim depending on your view.

**Label concision, quantified** `[observed]`. Across the nav, sidebar, statuses, priorities, relations and triage actions, essentially every label is one or two words: `Pulse`, `Inbox`, `Reviews`, `Triage`, `Icebox`, `Backlog`, `Todo`, `Done`, `Blocks`, `Blocked by`, `Urgent`, `Low risk`, `Breached`, `Achieved`, `Accept`, `Decline`, `Snooze`, `Copy page`, `Switch`, `Now`. The three-word exceptions are `Ready to Merge`, `Could not reproduce`, `No priority` — and each earns the extra word by encoding something a shorter label would lose.

**Sentence case for headings and page titles; Title Case for docs index cards** (noted as an inconsistency in T11). UI labels are sentence case with product names capitalised.

**Accessibility content** `[observed]`

- `Skip to content →` present and first in the DOM on every page, including docs and the brand page. Better than Notion, which ships none.
- **Alt text on docs screenshots is genuinely descriptive and scene-level**, which is rare:
  - "Image showing the workflow settings in a Linear workspace and the workspace statuses."
  - "Image showing 4 existing workflow statuses and a new custom one about to be added."
  - "two triage rules; if any of three customers set priority to high, and if labeled iOS move to team Mobile"
  - "Issue screen showing medium risk SLA"
  - "Issue relations blocking and relating to other issues"
  - "System preferences showing notifications enabled for Linear."
  - "Linear interface showing active issues page"
  - "Adding team to a project in Linear"
  The second and third examples describe the *state being demonstrated*, not just the screen — a non-sighted reader gets the instructional content of the image, not a label. This is the best alt-text practice in the five-product set.
- Docs sidebar icons carry the page name as alt (`Teams`, `Private teams`, `Issue status`), which duplicates the adjacent link text and produces a double announcement. Minor.
- **Homepage images have no alt text at all** — the four capability-section screenshots and the hero images render with empty or absent alt. The docs team and the marketing team are clearly operating to different standards.
- Homepage avatar alt is templated and adequate: "Avatar of Karri".
- Redundant encoding on the SLA indicator: a fire icon plus a colour ramp plus a text status name, so the risk level survives colour-blindness.
- `Working…` with a Unicode ellipsis as a live state; whether it is announced as a live region is not determinable from static HTML.
- Heading hierarchy on the status page uses `###` for every component including duplicated entries, so each component name appears twice in the heading outline.

**Negative findings, recorded honestly**

- `Open app` and `Log in` are adjacent nav items pointing at the same URL.
- Bare `Learn more→` four times on the homepage, one per capability section.
- The hero headline renders three times in the DOM, and one variant contains a double space: "The product development  system for teams and agents".
- A fourth variant of the same sentence appears in the meta description ("…with AI agents" vs "…Designed for the AI era").
- `Linearconnected by Jori` — missing space or element boundary in the activity-feed mock.
- `NewLoops →` badge renders twice consecutively.
- The status page's `Privacy policy` link points at the DPA, not the privacy policy.
- Docs index card `Workflows` leads to a page titled `Issue status`; the URL is still `/docs/configuring-workflows`. Three names for one page.
- Title Case on docs index cards vs sentence case on the same pages' H1s and sidebar labels.
- `Coding sessions` (docs, pricing) vs `Coding Sessions` (footer).
- `Product` and `Features` as separate footer groups, with `Integrations` filed under `Features`.
- The four legal links render twice per page.
- `Report a problem` and `Subscribe to updates` render twice on the status page.
- FAQ collapsible anchors are opaque hashes (`#collapsible-6554f37d047c`), so FAQ answers cannot be deep-linked meaningfully.
- "Technically yes, you can create a project without a completion date -- but…" uses a double hyphen where an em-dash belongs.
- "Triage offers a opportunity to review…" — missing `n` in the Triage doc's Overview.
- No alt text on homepage imagery, against high-quality alt text in docs.
- `status-changes` (hyphenated internal category name) appears in user-facing settings prose.
- The Brand page has no voice, tone, or copy section at all — it governs the wordmark and the colours and says nothing about how to write. For a product whose public reputation rests on its copy, the writing standard is unpublished.

---

## Transferable patterns

1. **Fixed state categories, free state labels — with the two levels named in different registers.** Linear's categories are `Backlog / Unstarted / Started / Completed / Canceled / Duplicate` (system aspect) while the default statuses inside them are `Backlog / Todo / In Progress / Done / Canceled` (team colloquial). Constrain the machine, free the vocabulary, and name each level for its own reader. Directly applicable to any pipeline where teams rename stages but reporting must stay comparable — disputes, case handling, order fulfilment, KYC queues.
2. **Ship cancel reasons as statuses.** `Won't Fix` and `Could not reproduce` sit in the `Canceled` category rather than in a resolution field, so the reason is visible in a board column and countable in a report. Condition: only works where the reason set is small and stable; a long reason list belongs in a field.
3. **Publish the refusal with its rationale.** The Priority doc explains why custom priorities do not exist and routes the user to the two extensible mechanisms. Documenting a deliberate absence pre-empts the support ticket and converts a limitation into a stated opinion. Contrast the SLA FAQ's seven-word "No, we do not offer custom naming" — refuse briefly in an FAQ, refuse with reasons in body copy.
4. **A certainty ladder instead of a date field.** `year / half-year / quarter / month / precise day`, with help text telling the user to "select start and target dates that match your level of certainty". Stops the form collecting false precision. Transferable to any estimate, forecast, or target-date field.
5. **Directional relation labels with asymmetric urgency.** `Blocked by` (orange) and `Blocks` (red) are one edge described from both ends, with the hotter colour on the state where the viewer is the blocker. And when the block resolves, the relation *degrades to `Related`* rather than vanishing — preserve the history at lower salience.
6. **Two-register state vocabulary across a timeline.** SLA states use risk language while there is time (`Low risk` / `Medium risk` / `High risk`), a live adverse state (`Breached`), and outcome language after the fact (`Achieved` / `Failed`) — and crucially separate "the clock ran out" from "we lost". Applicable to any deadline-bearing process where an in-flight breach is still recoverable.
7. **"How we work at Us" callouts inside reference docs.** Publishing your own team's configuration of an open-ended feature gives readers a known-good default without making it normative. Cheapest possible way to add opinion to configuration documentation.
8. **Six sentences that teach the object model.** The Concepts page closes with six lowercase parallel clauses, one per noun, using the same verb at adjacent levels (`projects organize related issues` / `initiatives organize related projects`) so the nesting is audible. Any product with a nested object model should have this paragraph.
9. **Verb-first task glosses on index cards, not benefit claims.** `Issue Relations` → "Indicate blocked, blocking, related, and duplicate issues". A task statement is testable against the page contents; a benefit claim is not.
10. **Disclose metered dependencies inside the inclusion.** A `**` on the tier row resolving to `** Requires AI credits` + `View docs` is the honest form of "included" for usage-billed AI features, and it is distinguished from `Add-on` (separately purchased). Two markers for two different kinds of not-quite-included.
11. **Changelog entries that lead with "until now".** `Priority inbox` states the prior pain, admits the previous behaviour was wrong, then names the worst case avoided. Admitting the old version was inadequate is what makes the entry credible.
12. **Publish the unflattering uptime number.** `99.83%` unrounded, per region, per service. Rounding to 99.9% or omitting the figure (as Notion does) costs less and buys less.

## Caveats & gaps

- **T7 (errors) and T8 (empty states) are genuinely `[absent]`, not unharvested.** Linear ships no public error catalogue, no troubleshooting docs category, and no empty-state copy anywhere on 14 public pages. Both are recorded as absences with the search scope stated. A content designer needing Linear's error or zero-data copy would have to work in-product.
- **The homepage product mock is the only source of live in-product strings.** Status names, activity-feed sentences, agent states (`Working…`, `Worked for 8 sec`) and issue identifiers are marked `[observed]` because they are in the page DOM, but they are a designed marketing artefact with fabricated content, not a screenshot of a real workspace. The *string templates* are reliable; the data in them is not. Treated accordingly throughout.
- **`linear.app/demo` was not fetched.** It is the obvious route to empty states, validation messages, command-palette copy and toast wording without authenticating, and it is a JS application requiring a browser-rendered pass. This is the single highest-value follow-up for this product.
- **Docs FAQ answers were fully present in server HTML** and are summarised rather than quoted, per the quotation rules. All fifteen questions are verbatim.
- **No voice-and-tone guide exists.** The Brand page governs wordmark, logo, icon and colour only. The Method pages express a *product-development* philosophy and one essay touches issue-writing style, but there is no published writing standard. All T14 findings are inferred from copy, not read off a stated rule — with the exception of the naming rules in T10, which are stated.
- **Only 6 of ~80 docs pages were opened.** The chosen six (`Issue status`, `Triage`, `Priority`, `SLAs`, `Issue relations`, `Notifications`, `Projects`, `Project status`, `Concepts`, `Start Guide`) were selected for state-language density and cover T5/T6/T9/T13 well. The `Cycles`, `Initiatives`, `Views`, `Find and filter`, `Linear Asks`, `Analytics`, `Administration` and `Importers` groups are unharvested, as are all of `Developers` and `Learn`.
- **Only one of ten Method essays was opened.** `Write issues not user stories` was chosen for its direct bearing on task-title content design. The other nine would likely yield more terminology positions.
- **The four capability pages** (`/intake`, `/plan`, `/ai`, `/build`) were not fetched; they are the destinations of the four bare `Learn more→` links and would carry feature-level headline patterns.
- **`/quality`, `/security`, `/switch` and `/enterprise` unharvested.** `/switch` in particular would carry competitive-migration language and probably a Jira-to-Linear terminology mapping, which would be a strong T13 source.
- **No live incident during harvest.** The status page yielded the regional component model, uptime figures and the all-clear string, but no incident-narrative copy. The all-clear strings are incident.io vendor defaults, identical to Notion's, and are attributed as such.
- **Single locale.** No locale switcher was found; the site appears to be en-US only. Several patterns here (one-word nav labels in particular) are length-sensitive and would not survive translation intact.
- **Mobile app copy not harvested** — out of the public web surface.

## Sources

1. https://linear.app/
2. https://linear.app/pricing
3. https://linear.app/docs
4. https://linear.app/docs/start-guide
5. https://linear.app/docs/conceptual-model
6. https://linear.app/docs/configuring-workflows
7. https://linear.app/docs/triage
8. https://linear.app/docs/priority
9. https://linear.app/docs/sla
10. https://linear.app/docs/issue-relations
11. https://linear.app/docs/notifications
12. https://linear.app/docs/projects
13. https://linear.app/docs/project-status
14. https://linear.app/method
15. https://linear.app/method/write-issues-not-user-stories
16. https://linear.app/brand
17. https://linearstatus.com/
