# 004. Asana

| Field | Value |
|---|---|
| Domain | `PROD` — Productivity and collaboration |
| Industry / sub-vertical | Work management / collaborative work management (CWM), repositioned in 2026 as "Agentic Work Management" — an OS for human-agent teams |
| Primary URL | https://asana.com/ |
| Corpus rank | 004 |
| Benchmark strength (source list) | Task creation and status language |
| Locale / market observed | en-US (14 locales in the footer switcher; help centre offers 13) |
| Platform observed | Web (desktop), Salesforce-hosted help centre, Atlassian Statuspage, template gallery |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2 Type II, HIPAA compliance (opt-in, eligibility gated), Data residency (five regions: US, EU, Japan, Australia, Middle East), Enterprise Key Management, SIEM (Splunk), eDiscovery (Exterro, Hanzo), DLP (Netskope), Archiving (Theta Lake), SCIM, Audit Log API; a Virginia Consumer Data Protection Act opt-out notice ships on every help-centre page; `Asana Gov` is a named support tier; modern-slavery statement in the footer |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Full for the categories that matter here. Three pages exceeded the fetch tool's output limit and were read via delegated extraction (noted in Pages inspected). Pricing FAQ **answers** were not in the fetch — questions captured verbatim, answers `[absent]` |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://asana.com/ | Hero, Work Graph pillars, six AI Teammate cards with example prompts, five-product tab set |
| Pricing | https://asana.com/pricing | Four plan cards (rendered twice), ~130-row comparison matrix, AI-usage pricing, three add-ons, 18-question FAQ. **Read via delegated extraction** |
| Help centre home | https://help.asana.com/ | Eight topic cards with scope lines, video-tutorial rail, Academy rail; ships a live CSS-error modal |
| Help: Getting started hub | https://help.asana.com/s/getting-started | Role-tabbed onboarding (Team lead / Team member / Admin) |
| Help topic: FAQ and troubleshooting | https://help.asana.com/s/topic/0TOPc0000003VYkOAM | 13 articles under one sub-section; full help-centre topic tree captured. **Read via delegated extraction** |
| Help article: Project progress and status updates | https://help.asana.com/hc/en-us/articles/14148168179099-... | **Highest-value page** — the six project-status values, status-update field set, reminder cadence, snapshotting policy. **Read via delegated extraction** |
| Use case: Task Management | https://asana.com/uses/task-management | Twelve named task features with definitions; 8-question FAQ (questions only) |
| Template gallery | https://asana.com/templates | Seven team categories, fifteen template cards with descriptions |
| Status page | https://status.asana.com/ | Atlassian Statuspage; five regions × six components; **a real resolved incident with its full three-post narrative** |

---

## T1 Navigation & IA labels

**Global nav — label + audience gloss, with the gloss naming *who it is for*, not what it does** `[observed]`

Asana's Products menu inverts the Slack/Notion pattern. Where those products gloss a feature with its benefit, Asana glosses each product with its **buyer**:

| Product | Gloss (verbatim) |
|---|---|
| `Agentic Work Management` | "For cross-functional teams" |
| `Asana Service Management` | "For service teams" |
| `Asana Client Management` | "For teams delivering client work" |
| `Command by Asana` | "For developer teams" |
| `StackAI by Asana` | "For every critical workflow" |

Five products, five `For <audience>` glosses — except the fifth, which breaks the pattern and glosses by *scope* rather than audience. This is a portfolio nav for a company that now sells four adjacent products, and the gloss does the segmentation work that the product names cannot.

The `AI Platform` sub-group reverts to capability glosses: `AI Teammates` "Ready-to-go AI agents for every team" · `AI Studio` "Powerful no-code automations" · `Asana Dash` "Your AI Chief of Staff". `Your AI Chief of Staff` is the standout — a **role metaphor** rather than a feature description, and the only gloss in the five-product corpus that names a human job title as the product's identity.

**`Asana Foundations` as a nav group label** `[observed]` — housing `Admin and security`, `App integrations`, `Developer`, `Latest feature release`. Naming the boring-but-load-bearing group "Foundations" rather than "Platform" or "More" is a small positioning win: it frames admin plumbing as the base of the stack rather than as leftovers.

**Solutions menu — four axes, each labelled** `[observed]`: `Company Type` (Enterprise, Small business, Nonprofit, Agencies) · `Teams` (Operations, Marketing, IT, Leaders) · `Industries` (six) · `Use Cases` (five + `View all use cases`).

`Leaders` filed under `Teams` is a category slip — leadership is a level, not a team — and `Company Type` mixes size (Enterprise, Small business) with sector (Nonprofit, Agencies).

**Help centre — eight topic cards, each with a task-framed scope line** `[observed]`

| Topic | Scope line (verbatim) |
|---|---|
| `Organize your work` | "Learn the best ways to set up your work in Asana." |
| `Asana use cases` | "Discover how to use Asana for your team or industry." |
| `AI and Automation` | "Learn to automate your workflows and work smarter with AI." |
| `Reporting` | "Measure team productivity with dashboards, goals, and portfolios." |
| `App integrations` | "Connect Asana to the apps you use everyday." |
| `Account admin` | "Manage your workspaces, permissions, and security." |
| `Plans and billing` | "Manage your plan, subscription, and billing." |
| `Troubleshooting` | "Solve problems and find quick answers to common questions." |

Unlike Slack's tooltip-only scope lines, these are **rendered as visible text** beneath each card — the same pattern, delivered accessibly. Six of eight scope lines open with a verb (`Learn`, `Discover`, `Learn`, `Measure`, `Connect`, `Manage`, `Manage`, `Solve`), so the section reads as a list of things the user can do.

Two labelling problems. The card says `Troubleshooting`, but the destination page's H1 is **`FAQ and troubleshooting`** — the card and the page disagree. And `App integrations` uses "everyday" (adjective) where "every day" (adverbial) is required.

**Help-centre topic tree — 13 topics with 50+ sub-sections** `[observed]`, captured from the Topics mega-menu:

`Getting started` · `Workflows and automation` · `Goals and reporting` · `Organize your work` · `Use cases` · `Asana AI` · `Admin and security` · `Plans and billing` · `FAQ and troubleshooting` · `Agentic Work Management` · `Asana Service Management` · `Asana Client Management` · `Command`

Note the tree carries **13 topics against the home page's 8 cards** — five topics (including all four new-product topics) are reachable only from the mega-menu, not from the help home. And the last four mirror the product portfolio, so the help IA has been extended by product line rather than by user task, producing duplicate sub-sections across topics (`Get started`, `Getting started`, `Getting started with Command`, `Getting Started With Asana Service` — four spellings of one concept, in three different casings).

`Command` as a topic label against `Command by Asana` as the product name is a third inconsistency in the same menu.

**Breadcrumbs are four levels deep on articles** `[observed]`: `Help Center` → `Organize your work` → `Resource management` → `Project progress and status updates`. The third level is a sub-section, and the current page is plain text rather than a link. Note the routing oddity: an article about **project status updates** is filed under **Resource management** — a topic that otherwise holds timesheets, budgets and workload. The filing does not match the content, and it propagates into the Related-articles module (see T11).

**In-product nav labels leak into the marketing nav** `[observed]`. Every asana.com page renders a logged-in nav fragment in the DOM: `My tasks` · `Inbox` · `My organization` · `Help Center` · `Language` · `Add another account` · `Log out`. These are the actual in-product sidebar labels, shipped to anonymous visitors. `My tasks` and `Inbox` are the two personal surfaces; `My organization` is the admin entry.

**Footer — four groups** `[observed]`: `New to Asana?` · `Use cases` · `Solutions` · `Company`. `New to Asana?` as a footer group label, with a question mark, is the same move Slack makes with `Why Slack?` — addressing the reader's state rather than naming a content type.

**The status page's footer is two rename cycles behind** `[observed]`: it lists `Premium` and `Business` as plans (retired — the current tiers are Personal/Starter/Advanced/Enterprise/Enterprise+), plus `Asana Guide` (superseded by the Help Center), `App Directory` (now `App integrations`), `Wavelength` and `Asana Blog` (now `Resource center` / `Inside Asana`), and `Support` at a `/support` URL. Six stale labels on one page.

## T2 Value proposition & headline patterns

**Homepage hero** `[observed]`

> Headline: `The OS for human-agent teams`
> Subhead: "Supercharge your teams to get things done"

A **category claim borrowed from computing** — "the OS for X" — plus a subhead that is two clichés in a row ("supercharge", "get things done"). The headline is the interesting half: it positions the product as infrastructure rather than as an application, and "human-agent teams" is a coinage that appears in the `<title>`, the OG title and the H1 identically.

Note the meta descriptions diverge: `<meta description>` says "Work management software for teams and AI agents. Plan, automate, and execute critical workflows together." while `og:description` and `twitter:description` both say "Supercharge your team with AI that gets work done." — **three different value propositions** across the page's own metadata, and the OG variant uses the singular "your team" where the on-page subhead uses "your teams".

**Pricing hero is the product name, not a proposition** `[observed]`

> H1: `Agentic Work Management`
> H2: `Power every team with AI`

Leading a pricing page with a product-category H1 rather than a pricing headline is unusual and weak — compare Notion's `One tool to run your company.` or Slack's `Do more with a paid Slack plan`. The reader arriving to compare plans is met with a category name.

**The Work Graph pillar block — four capability names with definition paragraphs** `[observed]`

| Pillar | Definition (summarised) |
|---|---|
| `Asana Work Graph®` | Described as "A neural network of everything your company is doing" — every person, task, project, goal and dependency connected, so humans and agents know "who is doing what, by when, and toward which goal" |
| `Multiplayer` | Humans and agents share one space, one plan, one context; multiple humans can train and improve any agent |
| `Shared memory` | Agents learn from completed work, feedback and preferences, so context is not re-supplied |
| `Enterprise governance` | Every agent has an identity, scoped permissions, an audit trail and cost constraints, managed in the same console as human users |

**"who is doing what, by when, and toward which goal"** is Asana's oldest and best line, and it has survived the AI repositioning intact. It is the clearest single articulation of what a work-management tool is for, and its structure — three interrogatives in ascending scope (who / when / why) — is the reason it works.

`Multiplayer` borrowed from gaming, `Shared memory` from computing, `Work Graph®` trademarked. Three technical metaphors in one section, which is coherent with the "OS" hero.

**Section headings are imperative or declarative claims** `[observed]`: `AI that works the way your team works` · `Your team just got bigger` · `Deliver real productivity for every team` · `Get started easily` · `Recognized as a leader` · `The only platform that can support your company at any scale` · `Transform the way you work with Asana`.

`Your team just got bigger` is the strongest — it frames buying software as hiring, in five words, and it sits directly above the AI Teammates block where six named "colleagues" are introduced.

`The only platform that can support your company at any scale` is an unhedged superlative ("the only") with no footnote, sitting immediately below two footnoted award claims. An uncharacteristic lapse on a page that otherwise footnotes everything.

**Pricing page section headings** `[observed]`: `Compare all features` · `AI for every workflow` · `Ready-to-go AI Teammates supercharge your team` · `Stay a step ahead with Asana Dash` · `One flat rate for every AI request` · `No rate cards, no surprises` · `Administrative tasks are included` · `Flexible AI usage` · `Buy AI usage packs or pay as you go` · `Extend Asana with optional modules` · `Loved by 100,000+ organizations across the globe` · `Deliver real productivity for every team` · `Frequently asked questions` · `Get your team and your agents working together`.

**`No rate cards, no surprises`** is the pricing page's best line: a double negation that names the thing buyers fear about metered AI (opaque per-model pricing) and denies it. See T10 for how well the page actually delivers on it — the answer is mixed.

**Task-management page headline set** `[observed]`: `Simplify task management and prioritize work` → `Connect work to top business priorities` → `Understand campaign priorities at-a-glance` → `Expedite onboarding with clear prioritization` → `Avoid distractions with app integrations` → `Use Asana as your team's task tracker` → `Transform the way you work with Asana`.

Four of seven headings contain a form of *priority/prioritize*. The page is written around one idea — deciding what to do first — and repeats its keyword to the point of monotony, which reads as SEO pressure rather than editorial choice.

**Closing CTA blocks use a three-option ladder with glosses** `[observed]`

> `Start your free trial` — "Try Asana for free. No credit card required."
> `Watch the demo` — "See how Asana connects companies at scale."
> `Speak with a sales rep` — "Learn how Asana helps teams collaborate seamlessly."

Three commitment levels, each with a one-line gloss naming what you get. `No credit card required` is the only friction-removal string on the site — and, notably, **it does not appear on the pricing page**, which carries no trial language at all (see T10).

The homepage's equivalent block is better differentiated: `Try the Asana demo` "See Asana in action" · `Discover resources` "Help articles and tutorials" · `Start with a template` "Get started faster with a template", under the heading `Get started easily` with the sentence "Tour the platform, read a few deep dives, or kickstart your work management journey with the right template." Three verbs matching three cards, in order.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Global nav, homepage, task page, template gallery, comparison table (Starter + Advanced columns), AI cards, closing blocks | Dominant self-serve label |
| `Sign up` | Pricing cards (all four), comparison table (Personal column), help-centre nav | **Second label for the same action**, used on the cards while the table beneath uses `Get started` |
| `Purchase now` | Starter and Advanced cards, Timesheets add-on | **Third label**, sitting on the same card as `Sign up` with no copy explaining the difference |
| `Continue` | Inline signup widget (homepage, task page, template gallery) | Follows `Google` / `Microsoft` / `or` |
| `Launch Asana` | Nav, for existing users | |
| `Log in` | Nav (marketing), help centre | |
| `Upgrade` | Nav | Persistent upsell in the primary nav |
| `Contact sales` | Nav (**twice in one button cluster**), Enterprise card ×2, two add-on cards, comparison table, closing blocks | |
| `View demo` / `Watch the demo` / `Try the Asana demo` | Nav utility, closing block, homepage | **Three labels for one destination** |
| `Learn more` | Homepage AI Teammates, five product tabs (×2 renders each), three add-on cards, two product tiles | **Bare `Learn more` at least 15 times across two pages** — the worst instance in this corpus |
| `Show more` | Four mobile pricing cards | No matching "Show less" |
| `Compare all features` | Pricing | |
| `See all templates` / `See templates` / `Use template` / `Create your template` | Template gallery | `Use template` and `Create your template` used interchangeably on adjacent cards |
| `See all video tutorials` / `View all video collections` | Help centre | Two labels, similar destinations |
| `Go to forum` / `Go to Asana Academy` / `Go to Academy` | Help centre | `Go to Asana Academy` and `Go to Academy` on one page |
| `Get support` / `Get Asana Gov support` | Help-centre header, adjacent | Two support entry points with no disambiguating copy |
| `Contact support` | Help centre, "Still have questions?" | Third support label |
| `Ask the Community` | Inside a help article | |
| `Try for free` | **Inside a help article**, mid-procedure | A marketing CTA in reference documentation |
| `Set status` / `Post` / `Print status update` / `Delete status update` | In-product, documented in help | |
| `Explore all apps` / `Automate work` | Task page | |
| `Refresh` | Help-centre CSS-error modal | |
| `Subscribe` / `Subscribe to Updates` / `Subscribe via Slack` / `Resend OTP` / `Change number` | Status page | |
| `View historical uptime.` / `← Incident History` | Status page | Trailing full stop inside the link text on the first |
| `Manage settings` / `Accept Cookies` / `Allow All` / `Confirm My Choices` / `Your Privacy Choices` | Consent layer, every help page | |

**Observations.** Asana has the loosest CTA discipline of the five products harvested. Three labels for signup (`Get started` / `Sign up` / `Purchase now`), three for the demo (`View demo` / `Watch the demo` / `Try the Asana demo`), three for support (`Get support` / `Contact support` / `Get Asana Gov support`), two for the Academy on one page, and `Contact sales` rendered **twice inside a single nav button cluster** (`[Contact sales][Get started][Upgrade][Contact sales]`).

The `Sign up` / `Purchase now` pair on the same pricing card is the most consequential: two buttons, no explanation of which does what, on the page where the user is deciding to pay.

`Learn more` appears at least fifteen times across the homepage and pricing page, with the destinations split across marketing pages, feature pages and help-centre articles — so identical link text resolves to three different content types. In a screen-reader link list this page reads as fifteen identical entries.

## T4 Onboarding & getting-started

**Onboarding is role-tabbed, and the tabs are the IA** `[observed]`

The help centre's `Getting started` hub — H1 `Learn the basics of Asana`, sub-line "Discover best practices to set you and your team up for success." — opens with four universal articles and then branches:

> `Learn by role`: `Team lead` | `Team member` | `Admin`

Under `Team lead` (the default tab), with the section line "Help your team start using Asana":

`Asana for team leads` · `Invite team members to Asana` · `Help your team adopt Asana` · `Establish conventions for your team` · `Tracking project progress` · `Share project updates`

**`Establish conventions for your team`** is the standout article title in this harvest. It is help content about *naming and process discipline* — the thing that actually determines whether a work-management rollout succeeds — and it is placed in the team-lead onboarding path rather than buried in admin docs. Most products document their features; this documents the customer's governance problem.

`Help your team adopt Asana` likewise treats adoption as the lead's job with its own article. Same instinct as Slack's `Email template for introducing Slack`: **write for the champion, not only for the user.**

The four universal openers are plain imperatives: `See how Asana works` · `Navigating Asana` · `Create tasks in Asana` · `Create projects in Asana`. Note the second is a gerund where the other three are imperatives — one grammar slip in a four-item list.

**Three learning rails, each labelled by its promise** `[observed]`

- `Learn live from an Asana expert` — "Discover how to build workflows and organize your team's work in Asana." → `Sign up`
- `Get your team to use Asana` — "Learn best practices to get your team onboarded and using Asana." → `Go to Asana Academy`
- `Learn quickly with video tutorials` — "Help your teams get more out of Asana in just a few minutes." → `View all video collections`

Three modes (live, self-paced, video) each named by what the reader gets, not by the format alone.

**Video tutorials carry runtimes in the link text** `[observed]`

> `Get started in Asana` **3:41** · `Navigation in Asana` **1:25** · `Plan your day with Asana` **1:48** · `Invite your team` **2:00**

Under the heading `Learn Asana in minutes` with a `Getting started series` label. Putting the duration inside the link lets the user budget before clicking, and the series maxes at 3:41 — which substantiates the "in minutes" claim rather than asserting it.

`Plan your day with Asana` is the notable title: it teaches a *habit*, not a feature.

**Academy paths carry difficulty + duration + outcome** `[observed]`

| Level | Path | Duration |
|---|---|---|
| `Beginner` | `Structure work with projects and tasks` | 25 minutes |
| `Beginner` | `Get started as an Administrator` | 15 minutes |
| `Intermediate` | `Accelerate outcomes with AI Teammates` | 25 minutes |

Three metadata dimensions on each card — level, time, and a one-sentence outcome — so the reader can filter on all three before committing. The same discipline as the video runtimes.

**Onboarding is offered pre-signup as an inline account widget** `[observed]`: the homepage, task page and template gallery all embed a signup form directly in the hero — `Google` / `Microsoft` / `or` / [email field] / `Continue` — with the consent line beneath: "By signing up, I agree to Asana's `Terms of Service` and acknowledge the `Privacy Statement`."

Note the **first-person consent construction** ("I agree… and acknowledge"), which is stronger than the passive "By continuing you agree". And the verb split is deliberate: you *agree to* terms (a contract) but *acknowledge* a privacy statement (a notice) — a legally meaningful distinction rendered in four words. Worth recording as good practice.

The same string appears in two variants across pages: "I agree to Asana's `Terms of Service` and acknowledge the `Privacy Statement`" (homepage, templates) vs "I agree to the Asana `Privacy Policy` and `Terms of Service`" (task page) — different documents, different verbs, different order. Two consent strings for one signup widget.

## T5 Form & field labels

**Status-update composer — the richest field set in this harvest** `[documented]`, from the project-progress article

| Label (verbatim) | Role |
|---|---|
| `What's the status?` | The status-selection field, phrased as a question |
| `Set status` | Button shown when no status exists yet |
| `Summary` | Default narrative block |
| `What we've accomplished` | Default narrative block |
| `Next steps` | Default narrative block |
| `Add a title` | Title field prompt |
| `Add a new section` | Adds a custom block |
| `Post` | Publish action ("the blue **Post** button") |
| `Print status update` / `Delete status update` | Overflow-menu items |
| `Remind me to update the status every Friday` | Reminder toggle |

**`What's the status?` as a field label is the single best string in this file.** It is a question in the second person, colloquial and contracted, and it does the job a label like "Status" would do while also prompting the user to actually answer. For a field whose failure mode is being skipped, phrasing it as a question someone is asking you is exactly right.

**The three default blocks are a reporting template encoded as field labels.** `Summary` → `What we've accomplished` → `Next steps` is past-present-future in three headings, and the middle one is in the **first person plural** where the other two are neutral nouns. That "we" does real work: it makes the status update a team account rather than a manager's report. The blocks are reorderable by drag, and Asana "will remember the block structure and order for future updates" once published — the template learns from the first use.

Defect worth recording: `What we've accomplished` **is never introduced in the procedure**. The numbered "From the status update window, you can:" list names only `Summary` and `Next steps`; the third block appears for the first and only time inside a `Note` callout about reordering. A default field the documentation forgets to mention.

**Project overview field vocabulary** `[documented]`: `project roles` · `project due date` · `date range` · `project Owner` · `Messages` · `milestones` · `goals` · `key resources` · `portfolios` · `custom fields`. Tabs named: `Overview`, `Dashboard`, and — inconsistently — `Status update` **View** (capital V, and the only surface called a View rather than a tab).

The same page calls one thing four ways: "the overview section", "the **Overview** tab", "overview tab", "Overview page". A reader looking for it has four names and no confirmation which appears in the UI.

**Task field vocabulary** `[observed]`, from the task-management page: `owners` · `due dates` · `priorities` · `project details` · `custom fields` · `subtasks` · `dependencies` · `start dates and times` · `recurring tasks` · `estimated and actual time`.

> "Add tasks to your project schedule with owners, due dates, priorities, and project details."
> "Delegate your to-do list, schedule recurring tasks, and share status updates as priorities change."
> "Use custom fields, issue tracking, and workflow automation to route requests, flag blockers, and keep tasks moving."

Three sentences that between them name twelve capabilities. `Delegate your to-do list` is the notable verb — most products say "assign tasks"; Asana says delegate, which frames the action as management rather than data entry.

**Custom fields are positioned as the extensibility mechanism** `[observed]`: "Custom fields are the best way to tag, sort, and filter work. Create unique custom fields for any information you need to track—from priority and status to email or phone number."

Note that **priority and status are given as examples of custom fields**, not as built-ins. Asana's data model treats both as user-defined, which is the opposite of Linear's fixed five-value priority and fixed status categories (see 002-linear T6). Two defensible architectures, and the vocabulary follows directly: Linear documents its values, Asana documents the field type.

**Twelve named task features, each with a definition** `[observed]`. The pattern is `<Feature name>` + a two-to-three-sentence definition that states what it is, what it does, and why you would want it:

`My Tasks` — "a personalized view of every task that's assigned to you, regardless of which project it's in… to ensure nothing falls through the cracks."
`Multi-homing` — "Track and manage tasks across multiple projects. When you make changes to a task in one project, instantly see those changes reflected across all projects in real time."
`Time tracking` · `Workflows` · `Custom fields` · `Rules` · `Mobile` · `Custom templates` · `Project views` · `Dependencies` — "Mark a task as waiting on another task with dependencies. Teams with collaborative workflows can easily see what tasks they're waiting on from others, and know when to get started on their portion of work." · `Timeline` · `Calendar`

`Dependencies` is glossed from **both ends of the relationship** — what you are waiting on, and when you can start — which is the same two-sided framing Linear achieves with `Blocked by` / `Blocks`.

`Multi-homing` is a coined term that the definition has to unpack, and the page also ships a FAQ question asking what it means (see T12) — the coinage needs two explanations, which is a signal it is doing more work than the user wants.

**Project views are named as a closed set** `[observed]`: `List`, `Board`, `Calendar`, `Timeline` on the task page; the pricing matrix extends it to `Project overview` · `List` · `Board` · `Calendar` · `My tasks` · `Notes` · `Timeline` · `Gantt` · `Goals` · `Portfolios`. Note `Timeline` and `Gantt` are listed as **separate rows** in the matrix while the task page says "Timeline View is a Gantt-style project view" — one concept, two matrix rows, one explanatory sentence saying they are the same thing.

**Status-page subscription form** `[observed]`: `Email address:` · `Enter OTP:` · `Resend OTP in: 30 seconds` · `Didn't receive the OTP?` → `Resend OTP` · `Country code:` · `Phone number:` · `Change number`. A one-time-password flow on a *status subscription*, which is heavier than the equivalent on Slack's or Notion's status pages (both take an email address and submit). The failure-anticipating line `Didn't receive the OTP?` is placed at the point of failure, which is correct.

## T6 Status & state language

**Project status — six values, stated once and never defined** `[documented]`

> "Check if the project is **on track**, **at risk**, **off track**, **on hold**, **complete**, or **dropped**"

`on track` · `at risk` · `off track` · `on hold` · `complete` · `dropped`

This is a well-shaped set. Three of the six are a **health ramp** (on track → at risk → off track), one is a suspension (`on hold`), and two are terminal (`complete`, `dropped`). The health ramp uses spatial metaphor consistently — the project is *on* or *off* a track, and `at risk` sits between them as the warning state. `dropped` rather than "cancelled" or "abandoned" is the interesting choice: it is blunt, short, and carries less blame than "cancelled" (which implies a decision) or "failed".

**But the article defines none of them.** No colour key, no threshold, no guidance on when a project moves from `on track` to `at risk`. The six values appear in a single bolded run inside the first numbered instruction and are never mentioned again except for `complete`. For a status vocabulary whose entire purpose is consistent cross-team reporting, the absence of definitions is the most significant content gap found in this product — two teams using `at risk` will mean different things, and the documentation offers no basis for alignment.

Colour associations exist in the product (the values are colour-coded) but appear only inside screenshots, and **those screenshots carry empty alt text**, so the colour information is unavailable to screen-reader users entirely. A status system encoded in colour, documented only in images, with no text alternative.

**`complete` is the only value with any policy attached** `[documented]`, and it gets four statements:

- "Projects can be completed, regardless of whether there is an existing project status."
- "Completed projects should be marked as **Complete** in the status update instead of archiving them. We'd recommend completing projects before archiving. Archiving a project allows you to focus on more active project but does not update a project's status."
- "Marking a project as complete makes it easy to distinguish **Complete** from other statuses in a summary of projects in portfolios and reporting."
- "To uncomplete a project, click on **Complete** to select an updated status from the drop-down menu."

**The complete/archive distinction is the useful pattern here.** Two adjacent end-states that users conflate — one is a *status* (the work is done) and one is a *storage action* (get it out of my sidebar) — disambiguated with an explicit recommendation and a stated consequence ("does not update a project's status"). And the reason given is a reporting reason, which is the honest one.

`uncomplete` as a verb is a coinage, used in a heading (`How to uncomplete a project`). Ugly but unambiguous, and it names the reversal without implying an error.

Capitalisation of this one value is inconsistent three ways on one page: lower-case bold in the value list (`complete`), Title Case as a UI label (`Complete`), and lower-case in prose ("Marking a project as complete").

**Archived state has a verbatim banner** `[documented]`: "A project that has been completed and archived will show the **Complete** status and a banner that says **'This project is archived'**." Four words, present perfect, no action offered in the string itself.

**Status-update reminder cadence — and a contradiction** `[documented]`

> "Each project's owner will receive a weekly task each Thursday to update the status of their project due Friday. If you are the project owner and do not want to receive these reminders, you can turn them off."

The toggle is labelled `Remind me to update the status every Friday`.

**Thursday in the prose, Friday on the toggle.** The mechanism is probably "task created Thursday, due Friday" and the toggle names the due day, but nothing on the page reconciles them, so the user cannot tell which day the reminder arrives.

The mechanism itself is worth recording: **the reminder is a task, not a notification.** Asana schedules the status update into the owner's own task list rather than emailing them, so the nudge lives in the same surface as the work. Dogfooding the product as its own reminder system, and it means the reminder inherits due dates, snoozing and completion.

**Snapshotting — a state-integrity policy, stated plainly** `[documented]`

> "Status updates are intended to be a snapshot of a project's status at a moment in time. As such the data is frozen at the time of publishing. This includes things like project name, custom fields, task names, due dates, and assignees."
> "This means that if a task name or due date changes after publishing, the appearance of the task in the update will stay the same so you can look back and get a complete account of a project's Status at a moment in time."

This is the best-explained piece of behaviour on the page. It answers a question the user would otherwise ask as a bug report ("why is my old status update showing the wrong due date?"), it enumerates exactly which five fields are frozen, and it gives the reason (historical accountability). **Naming the frozen fields specifically** rather than saying "the data is frozen" is what makes it actionable.

**Progress visualisation vocabulary** `[documented]`: "the dots diagram" for historical status at a glance, "a burnup chart" for velocity. Note `dots diagram` is a descriptive phrase rather than a product name — Asana never capitalises it — so a user cannot search for it.

**Service states** `[observed]`, status page (Atlassian Statuspage defaults): `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Five levels, with a sixth informational tier absent (compare Slack's `Notice`). Aggregate: `All Systems Operational`.

**Components are regionalised** — five regions × six components each:

| Region | Components |
|---|---|
| `US` · `EU` · `Japan` · `Australia` · `Middle East` | `App` · `API` · `Mobile` · `Automations and Background Actions` · `Webhooks and Event Streams` · `Notifications` |

Thirty component rows. `Automations and Background Actions` is the notable name — it covers the invisible work (rules firing, recurring tasks generating) that a user would otherwise experience as "nothing happened" rather than as an outage. Naming the silent-failure surface as a status component is good practice.

Several `Webhooks and Event Streams` rows carry a `?` help affordance where others do not, so the tooltip coverage is inconsistent across regions.

**Downtime-calendar empty states** `[observed]`: `No downtime recorded on this day.` · `No data exists for this day.` · `No incidents or maintenance related to this downtime.` Three distinct no-data messages, and the distinction between the first two is real and useful — "we measured and it was fine" versus "we have no measurement".

## T7 Error, failure & recovery

**The `FAQ and troubleshooting` topic contains 13 articles under a single sub-section, `Common issues and fixes`** `[observed]`:

`Tasks and subtasks` · `Upcoming discontinuation of personal projects spaces` · `Asana Forum basics` · `Asana Certification FAQ` · `Troubleshooting browser and connectivity issues` · `How do I get support from Asana?` · `Accidental deletion` · `Navigation and display` · `Security and permissions` · `Recover deleted tasks, projects, and more` · `Salesforce AppExchange Integration Deprecation FAQ` · `Deprecation of integrations` · `Automation permission update FAQ`

**This is a weak troubleshooting category and the weakness is instructive.** Of thirteen articles, only four are genuinely about something going wrong (`Troubleshooting browser and connectivity issues`, `Accidental deletion`, `Recover deleted tasks, projects, and more`, `Navigation and display`). Three are deprecation notices, two are forum/certification admin, one is a permissions change notice, and `Tasks and subtasks` is core product documentation filed under troubleshooting. The topic is functioning as **a catch-all for content that did not fit elsewhere**, which is the standard failure mode of a "Troubleshooting" bucket.

Compare Slack, whose equivalent category is a lookup table from error string to recovery path. Asana's is a miscellany.

**`Accidental deletion` is the best title in the set** `[observed]` — two words naming the user's action and their feeling about it, in the register of the moment. It is the closest Asana gets to Wise's first-person confession pattern. Paired with `Recover deleted tasks, projects, and more`, which names the remedy — so the category holds both the symptom and the fix as separate entry points.

`How do I get support from Asana?` is the only question-form title, and it is the one a lost user would type.

**No error-message catalogue exists.** `[absent]` No article lists in-product error strings, and none of the three help pages opened quoted a single product error message verbatim. Searched: the full 13-article troubleshooting list, the project-progress article body, and the help-centre home. This is a genuine gap against both Notion and Slack, which each publish one.

**Permission-denial copy, documented rather than quoted** `[documented]`

> "if they click on a task, milestone, etc, that is part of a project they don't have access to, they will see a request access page but will not be able to access the underlying data unless they are granted access."

"a request access page" is named as a state but its copy is not given. The surrounding paragraph is a genuinely useful disclosure though — it warns that **status-update collaborators can see the full report contents even without access to the underlying project**, which is a privacy leak users would not anticipate. Documenting the boundary of a permission model where it is counter-intuitive is the right instinct.

**A hard permission constraint, stated plainly** `[documented]`: "You can only delete your own project status, not a status posted by others." One sentence, no hedging, in the section where the user would try.

**Deprecation is handled as a named content type** `[observed]`, with four articles: `Upcoming discontinuation of personal projects spaces` · `Salesforce AppExchange Integration Deprecation FAQ` · `Deprecation of integrations` · `Automation permission update FAQ`. Plus a title carrying its own lifecycle state in parentheses — `Asana in Salesforce AppExchange (being deprecated)`.

Shipping removal notices as help articles is correct; putting a status in the title (`(being deprecated)`) is a maintenance liability, because the title will be wrong on the day the deprecation completes. Same class of problem as `Pages in Asana (formerly Notes)`, which coexists in the same help centre with separate live articles called `Notes view` and `Shareable notes in Asana` — three articles, three names, one feature.

**Recovery affordances named** `[documented]`: `Print status update` / `Delete status update` in an overflow menu; `Restore project`; `uncomplete a project`; `Recover deleted tasks, projects, and more`.

## T8 Empty states

**The status page is the only surface with observable empty states, and it has four** `[observed]`

| String (verbatim) | Context |
|---|---|
| `No incidents reported today.` | Today's row in the incident history |
| `No incidents reported.` | Every prior day's row |
| `No downtime recorded on this day.` | Uptime calendar cell |
| `No data exists for this day.` | Uptime calendar cell, where no measurement exists |
| `No incidents or maintenance related to this downtime.` | Under the `Related` heading on a downtime detail |

Two things worth recording. First, the **today/not-today variant** (`No incidents reported today.` vs `No incidents reported.`) is a deliberate tense distinction — today's row is still open, so the string is provisional; past rows are closed, so the string is final. One word of difference encoding whether the state can still change. Second, `No downtime recorded` and `No data exists` separate a positive finding from an absence of evidence, which is the same honesty move as Slack's uptime methodology note.

(These are Atlassian Statuspage defaults rather than Asana-authored copy, and are attributed as such.)

**The help centre ships a published empty state twice** `[observed]`

> `No articles found for this topic.`

Rendered under **`Setting up Command`** and **`Permissions in Command`** in the help-centre topic tree. Two sub-sections are live in the navigation with zero articles in them, and the empty state is a dead end — no suggested alternative, no "browse related", no contact route. A user who navigates to a published sub-section and finds nothing is given one sentence and no exit.

This is a **launch artefact**: the Command product's help IA was built before its content, and the empty sections shipped. Worth recording precisely because it is the most common real-world empty state — not a user with no data, but a product with no content yet.

**The help centre also ships an error modal in its normal render** `[observed]`

> `Sorry to interrupt`
> `CSS Error`
> `Refresh`
> (close control with title `Cancel and close`)

Present in the served markup of **every** help-centre page fetched — the home, the Getting started hub, the topic page and the article. This is the Salesforce Lightning stylesheet-failure modal, and it is in the DOM on successful loads.

As copy it is poor on three counts. `Sorry to interrupt` is an apology for the interruption rather than a statement of the problem. `CSS Error` is a developer-facing term that means nothing to a user and, worse, sounds trivial — a user cannot tell whether to worry. And `Refresh` does not say what refreshing will fix. The whole modal tells the user that something technical happened, apologises for mentioning it, and offers an action with no stated outcome. It is a useful negative exemplar: **an error state that is polite, honest and completely unusable.**

**In-product empty states are not reachable** `[absent]`. `My tasks` with nothing assigned, an empty project, an empty portfolio, a no-results search — all behind auth and none documented. The `Add a title` prompt and `Set status` (shown when no status exists) are the only first-run strings captured, both `[documented]`.

## T9 Notifications & system messages

**A real incident was captured in full, with its three-post narrative** `[observed]` — the most valuable T9 artefact in this corpus.

> ### Sep 17, 2026
> **`Slow performance for a subset of Asana users`**
>
> **Resolved** - This incident has been resolved. — Sep 17, 15:13 UTC
> **Update** - We are continuing to investigate this issue. — Sep 17, 15:12 UTC
> **Investigating** - We received an alert for unusual slow performance in several regions. We're investigating. — Sep 17, 14:36 UTC

**The incident title is the transferable artefact.** `Slow performance for a subset of Asana users` does three things in six words: names the symptom in the user's terms (*slow*, not "elevated latency"), bounds the blast radius honestly (*a subset*, not "some users may experience"), and identifies who is affected. A user reading it can immediately answer "is this me?" — which is the only question a status page exists to answer.

The three-stage lifecycle is labelled with bolded state prefixes: **`Investigating`** → **`Update`** → **`Resolved`**. The opening post states the *detection mechanism* — "We received an alert" — which tells the reader Asana found it by monitoring rather than by customer report, and therefore that nobody needs to file a ticket. Small, and it materially reduces inbound support volume.

The weakness: the entire incident spans 37 minutes, and the middle post ("We are continuing to investigate this issue") lands **one minute before** the resolution. A no-information update posted 60 seconds before the all-clear is process theatre. And the `Resolved` post says only "This incident has been resolved" — no cause, no duration summary, no statement of what was affected. The narrative opens well and closes empty.

**Subscription copy names the trigger verbs per channel** `[observed]`

> Email: "Get email notifications whenever Asana **creates**, **updates** or **resolves** an incident."
> SMS: "Get text message notifications whenever Asana **creates** or **resolves** an incident."
> Slack: "Get incident updates and maintenance status messages in Slack."

**Three channels, three different trigger sets, each stated.** SMS deliberately omits `updates` — so the high-interruption channel carries only the two events that matter, and the subscriber is told this before opting in. Differentiating notification volume by channel intrusiveness, and disclosing the difference in the subscribe copy, is a genuinely good pattern and directly transferable.

The bolded verbs (`creates`, `updates`, `resolves`) make the difference scannable. Slack's status page uses the same construction with two verbs; Asana's three-way split is the more developed version.

(These are Atlassian Statuspage strings, so the pattern is the vendor's rather than Asana's — attributed accordingly, but no less reusable.)

**Status update as a notification product** `[documented]`. The project-status article treats the status update as a broadcast: "Status updates will appear in the project's overview and messages", collaborators can be added, and "Users can also turn off notifications for this update by ticking the checkbox in the upper right-hand corner."

That last string names an **unlabelled control** — "the checkbox in the upper right-hand corner" — so the instruction is unfollowable from text alone. If the checkbox had a name, the sentence would be half as long and twice as useful. A clean example of how an unnamed control costs the documentation more than it saves the interface.

**Reminders are delivered as tasks** (see T6) rather than as notifications — the most distinctive notification decision in this file.

**AI status generation is absent from the status documentation** `[absent]`. Asana ships a `Smart status` feature (it appears in the help-centre nav under `Asana AI features`) and markets `AI status updates` as a named feature on the task-management page. The canonical status-updates article mentions neither — no AI, no auto-drafting, no cross-link. The article describes status updates as entirely manual: "Any project member can set a status to inform other project members on a project's progress."

A flagship AI capability and its host feature's main reference article do not know about each other. This is the most consequential content-ops gap found, because the user most likely to want AI drafting is the project owner staring at the Thursday reminder task.

## T10 Disclosures, legal & compliance

**Plan structure** `[observed]`

| Plan | Price | Cadence | Positioning (verbatim) |
|---|---|---|---|
| `Personal` | `$0` | `Free forever` | "For one or two people managing personal projects." |
| `Starter` | `$10.99` | "Per user, per month billed annually. $13.49 billed monthly" | "For small teams and professionals that need to track their projects progress and hit deadlines." |
| `Advanced` | `$24.99` | "Per user, per month billed annually. $30.49 billed monthly" | "For growing teams that turn goals into actionable projects, plan team capacity, and keep decisions moving." |
| `Enterprise` | "Contact sales for pricing" | — | "For organizations that scale work across departments with security built in." |
| `Enterprise+` | **no card, no price, no positioning** | — | Described only as the last bullet of the Enterprise card |

Billing toggle: `Monthly` / `Yearly` / `Save up to 18%`. Inheritance lines: `Everything in Personal, plus:` → `Everything in Starter, plus:` → `Everything in Advanced, plus:`.

**Both monthly and annual prices are shown simultaneously** in the cadence line ("$10.99 Per user, per month billed annually. $13.49 billed monthly") — the user sees the real cost of monthly flexibility without operating a toggle. Better than a toggle that hides one number. (Though the desktop render omits the monthly figure that the mobile render includes — see defects.)

The positioning lines are **needs-based, not size-based**, after the first: Starter is for teams that "need to track their projects progress and hit deadlines", Advanced for teams that "turn goals into actionable projects, plan team capacity, and keep decisions moving". A buyer can self-select on the described behaviour rather than on headcount. ("their projects progress" is missing an apostrophe.)

**`Enterprise+` exists only in the comparison table.** A fifth tier appears as a column header with no card, no price, no cadence and no positioning line anywhere on the page. Its only description is buried as the final bullet of the Enterprise card: "For the highest security and compliance needs, Enterprise+ adds SIEM integration, data residency, audit logs and dedicated workspaces." A tier the pricing page sells but does not present.

**AI pricing — the strongest and weakest disclosure on the page**

The strong part. Asana states a **single flat unit price** and builds the section around it:

> `One flat rate for every AI request`
> `No rate cards, no surprises`
> `$0.50 per AI request, billed upfront` (prepaid) / `$0.60 per AI request, billed monthly` (on demand)

Plus three governance affordances named as bullets: `Set a monthly spend cap` · `Live usage dashboard for visibility and control` · `Manage on demand billing directly in-product`. And an explicit carve-out: `Administrative tasks are included` — "Dash admin work such as prioritising the day or analysing Work Graph data is included at no extra cost."

**Naming what is *not* metered** is the reusable move. For a consumption-billed AI feature, the user's real fear is that every interaction costs money; carving out the routine ones and saying so removes the hesitation that suppresses usage.

Prepaid persistence is stated too: "Yours for your full contract [term], no monthly resets" — i.e. prepaid requests do not expire monthly, which is the opposite of the usual credit model and worth stating.

The weak part. The same section ships **`Pre-paid AI requests are are $0.50 per month`** — a doubled "are", and a unit ("per month") that contradicts the card directly beneath it ("$0.50 per **AI request**"). On a page whose headline is `No rate cards, no surprises`, the flagship price is stated with the wrong unit and a typo.

**Two metering currencies coexist**: `AI requests` (for AI Teammates and Dash) and `credits` (for AI Studio). Per-tier allowances:

| Tier | AI requests | AI Studio credits |
|---|---|---|
| Starter | "Includes 5 requests per user per month, up to 50 requests per account" | 50K per billing account per month |
| Advanced | same 5/50 | 75K |
| Enterprise | "Includes 5 requests per user per month, up to 250 requests per account" | 200K |
| Enterprise+ | same as Enterprise | 200K |

Two units, two meters, two dashboards to understand. And the credit strings on the plan cards read **"Includes 75K credits ber billing account per month"** — "ber" for "per", in both card renders, four occurrences. The comparison table spells the same strings correctly, so the cards and the table disagree character-for-character on a billing disclosure.

**Add-ons disclosed as a separate purchase layer** `[observed]`: `Timesheets and Budgets` · `Compliance management` · `Permissions management`, under `Extend Asana with optional modules` and the line "Add only what your team needs - billed separately on eligible plans". Each card states `Available as an add-on to Enterprise plan.`

But the comparison table prints `Timesheets & Budgets add-on` in **all four tier columns including Personal and Starter**, contradicting the card's Enterprise-only statement. And the matrix uses three distinct gating markers — `Add-on`, `Opt-in`, and the named `Compliance mgmt. add-on` / `Permissions mgmt. add-on` — without a legend explaining the difference between "buy this separately" and "ask us to turn it on".

**The bracketed-link pattern in matrix cells reads as broken interpolation** `[observed]`: `Data residency, [see requirements]` · `Enterprise Key Management, [subject to eligibility]` · `HIPAA compliance available, [see requirements]` · `100+ free integrations, including Microsoft 365, Google Workspace, Slack, and [other everyday apps]`. These are real links in source, but the `label, [bracketed qualifier]` shape inside a compliance cell is exactly the shape of an unresolved token. A regulated buyer scanning for HIPAA sees a bracket.

**Compliance vocabulary, ungloassed** `[observed]`: `SOC 2 Type II` · `256-bit encryption at rest and in-transit` · `Cross regional backups` · `Data deletion` · `SAML` · `Audit Log API (built to support SIEM)` · `SIEM integration (Splunk)` · `eDiscovery integration (Exterro, Hanzo)` · `Data Loss Prevention (DLP) integration (Netskope)` · `Archiving integration (Theta Lake)` · `Organization exports` · `Managed workspaces` · `IP allowlisting` · `Data residency` · `Enterprise Key Management` · `HIPAA compliance available`.

Named vendors in the row labels (`Splunk`, `Exterro`, `Hanzo`, `Netskope`, `Theta Lake`) let a buyer match against their existing stack without a sales call. Good practice for a compliance matrix, and better than a generic "SIEM integration".

`Audit Log API (built to support SIEM)` — the parenthetical states the *purpose* rather than the mechanism, which is the right gloss for a row a security buyer is scanning.

**Seat mechanics** `[observed]`: `User limit` → `2 seats` (Personal) / `Unlimited` (all paid), with helper text "Up to 2 seats per project and team. All paid plans let you add unlimited members." Plus `Unlimited free guests` — "invite external collaborators to work on projects without incurring additional costs or impacting your user count" (sentence begins lowercase). And `Pause a member's license` as a named admin capability — a seat state between active and removed.

**No trial language on the pricing page at all.** `[absent]` No "Try free", no trial length, no "no credit card required" — despite the help centre carrying a nine-article `Getting started with a free trial` section and the task-management page carrying `Start your free trial` / "Try Asana for free. No credit card required." The page where a buyer decides is silent about the way in.

**FAQ answers not captured** `[absent]` — see T12.

**Footer legal** `[observed]`: `Terms` · `Privacy` · `Trust and security` · `Supplier responsibility` (→ modern-slavery statement) · `Sustainability and ESG` (→ investor relations). `Supplier responsibility` labelled as a topic and resolving to a single statutory statement is a slight overclaim.

**Virginia CDPA notice ships on every help-centre page** `[observed]`: a persistent panel telling Virginia consumers they may opt out of sale of personal data and targeted-advertising processing via a toggle, with `Opt-Out Request Honored` shown as a state label. A US state-specific disclosure rendered globally rather than geo-gated.

## T11 Help-centre architecture

**Shape:** Salesforce Experience Cloud, three-level — topic → sub-section → article — with a parallel `Getting started` hub, a `Video tutorials` axis, and an external `Asana Academy`. Topic and article URLs are opaque Salesforce record IDs (`/s/topic/0TOPc0000003VYkOAM`) rather than slugs, though article URLs are human-readable (`/s/article/project-progress-and-status-updates`). Older Zendesk-era URLs (`/hc/en-us/articles/14148168179099-...`) still resolve and redirect.

**Help home is a card grid, not a search-first page** `[observed]`

> `Hello!How can we help?`

**The greeting renders with no space between the two sentences** — `Hello!How can we help?` — in the served HTML. A missing separator in the help centre's H1, on the first string every visitor reads.

Below it: `New to Asana?` → "Start your journey here with beginner-friendly resources that help you and your team work smarter." → `Get started`; then `Get your questions answered` over the eight topic cards; then `Learn Asana in minutes` (video rail); then `Connect with other Asana users` → "Ask questions, learn best practices, and get advice from Asana users around the globe." → `Go to forum`; then `Get more out of Asana` (Academy rail); then `Still have questions? We can help.` with three routes.

**`Still have questions? We can help.`** — two sentences, the second reassuring rather than instructing. Routes offered in order: `Asana Academy` "Level up with courses and live trainings." · `Community forum` "Connect with other Asana users." · `Contact support` "We're here to help."

Human contact is last, preceded by two deflections — the same ordering as Wise and Notion. But note **`Still have questions? We can help.`** is immediately followed by a route whose gloss is **"We're here to help."** — the same promise made twice in adjacent strings.

**Article-title grammar — six shapes** `[observed]`

| Shape | Examples |
|---|---|
| Bare imperative | `Create tasks in Asana` · `Create projects in Asana` · `Invite team members to Asana` · `Help your team adopt Asana` · `Establish conventions for your team` · `Share project updates` · `Delete your Asana account` |
| Gerund | `Navigating Asana` · `Tracking project progress` · `Managing timesheet reviewers and approvals` · `Setting up timesheets and budgets add-on` · `Using email bridge in a project` |
| Bare noun | `Workload` · `Accidental deletion` · `Navigation and display` · `Security and permissions` · `Tasks and subtasks` |
| `<Topic> FAQ` | `Asana Certification FAQ` · `Automation permission update FAQ` · `Salesforce AppExchange Integration Deprecation FAQ` |
| Question | `How do I get support from Asana?` |
| Noun + parenthetical state | `Asana in Salesforce AppExchange (being deprecated)` · `Pages in Asana (formerly Notes)` |

Six grammars is two too many. The imperative/gerund split is the most visible: `Tracking project progress` and `Share project updates` sit **adjacent in the same role-tab list**, one gerund and one imperative, for two equivalent tasks.

**Article-internal structure** `[observed]`, from the project-progress article:

H1 → plan-gating module (`Who can use this feature?`) → `In This Article` TOC → intro paragraph → H2 sections with H4 step-intros → `Note` callouts → `Related articles`.

**`Who can use this feature?` as a plan-gating module is the right pattern** — a question in the second person, answered before the reader invests in the procedure, rather than a "Business plan only" badge they discover at step four. It closes with "Visit our `pricing page` for more information."

The execution is broken though. The tier list renders as **one unbroken concatenated string**: `PersonalStarterAdvancedEnterpriseEnterprise+PremiumBusinessLegacy Enterprise` — eight tier names with no delimiter, no whitespace, no list markup. Unreadable visually and worse for a screen reader. It also mixes current tiers with legacy ones (`Premium`, `Business`, `Legacy Enterprise`) with no visual distinction, while the in-body gating sentence on the *same page* does distinguish them: "available on Asana Advanced, Enterprise, Enterprise+, as well as legacy tiers Business and Legacy Enterprise."

**`Note` is the only callout type**, used eight times on one article. It carries everything — constraints ("You can only delete your own project status"), tips ("You can also reorder your Summary… by dragging"), recommendations ("We'd recommend completing projects before archiving"), and community nudges ("Need help cratfing your status updates?"). Compare Notion and Slack, which split `Note` (constraints) from `Tip` (optimisations). Collapsing to one callout type means the reader cannot tell at a glance whether a callout is a warning or a nicety.

One `Note` also opens "**Please note that** you must select a project status…" — inside a callout already labelled `Note`.

**`Related articles` is auto-populated and largely irrelevant** `[observed]`. The status-updates article's ten related links include `Delete your Asana account`, `Managing product licenses`, `Outlook Calendar and Asana`, `Salesforce in Asana integration` and `Using email bridge in a project` — none related to status updates. The module appears to draw from the parent topic (`Resource management`, which the article is mis-filed under) rather than from the article's subject.

It omits the obvious neighbours, all of which exist in the same help centre: `Smart status`, `Share project updates`, `Tracking project progress`, `Project overview tab`, `Status updates templates`. **An article about status updates does not link to any other article about status updates.**

**No feedback widget anywhere.** `[absent]` No "Was this helpful?", no thumbs, no rating, no reason options — on any of the four help pages inspected. Notion, Slack and Linear all ship one (Linear does not either, but Linear also has no help centre). Asana has a help centre and no feedback loop on it.

**No search placeholder text.** `[absent]` The search control renders as an icon with alt `search-icon` and no visible label or placeholder string in the served HTML.

**Two support entry points, undifferentiated** `[observed]`: `Get Asana Gov support` and `Get support` sit adjacent in the help-centre header with no explanatory copy. A user who is not sure whether they are a government customer cannot tell which to click.

**Breadcrumb depth and the mis-filing problem** (see T1) — `Help Center` → `Organize your work` → `Resource management` → `Project progress and status updates`. The article is two levels away from a topic that does not describe it.

## T12 FAQs

**Three FAQ blocks across three pages, all three with answers unretrievable or absent.**

### Block A — Pricing page, heading `Frequently asked questions`, 18 questions `[observed]`

**Answers are accordion-collapsed and not present in the server HTML.** Questions verbatim:

| # | Question (verbatim) |
|---|---|
| 1 | What is an AI request? |
| 2 | What is the contract term for my paid AI requests? |
| 3 | How do I purchase additional AI requests? |
| 4 | How do I monitor and control my costs? |
| 5 | Can I change or cancel my plan? |
| 6 | How many users are included in my plan? |
| 7 | How is AI Studio priced? |
| 8 | How can I add people to my plan? |
| 9 | How secure is Asana? |
| 10 | Do you offer academic pricing? |
| 11 | Should I upgrade my organization or my team? |
| 12 | Will I be charged sales tax? |
| 13 | Is there an on-premises version of Asana? |
| 14 | How does Asana protect my data? |
| 15 | How does Asana store my data? |
| 16 | Will I be charged VAT/GST? |
| 17 | Does Asana offer a discount for nonprofits? |
| 18 | What is your refund policy? |

**Structural notes.** The ordering is revealing: **four of the first four questions are about AI billing** (what a request is, its contract term, how to buy more, how to control cost), and a fifth (Q7) returns to AI pricing. Five of eighteen questions exist because the AI metering model is new and confusing. Q4 — `How do I monitor and control my costs?` — is the one a buyer actually asks about consumption pricing, and putting it fourth on the page is correct.

Q11 — `Should I upgrade my organization or my team?` — is the only question phrased as a **decision the reader must make** rather than a fact they need. It is also the one that exposes Asana's org/team duality as a purchasing problem.

Q14 and Q15 are a near-duplicate pair (`How does Asana protect my data?` / `How does Asana store my data?`) that could be one question, and Q12 and Q16 split tax by jurisdiction (`sales tax` / `VAT/GST`) in a way that will read as an omission to anyone in a third regime.

**No trial question exists** — consistent with the page's total absence of trial language (T10).

### Block B — Task Management page, heading `Frequently asked questions`, 8 questions `[observed]`

**Answers likewise collapsed and not in the fetch.** Questions verbatim:

| # | Question (verbatim) |
|---|---|
| 1 | Can I try task management in Asana for free? |
| 2 | What is task management? |
| 3 | What does task management software do? |
| 4 | How does Asana work as a task tracker? |
| 5 | What are the most important features to consider in a task management tool? |
| 6 | What does it mean to multi-home tasks? |
| 7 | What are subtasks? |
| 8 | What are task templates? How can they help me? |

**This is an SEO FAQ wearing a product FAQ's clothes.** Q2, Q3 and Q5 are category-definition questions (`What is task management?`) aimed at search traffic, not at a visitor already on Asana's site. Q6 and Q7 are the genuinely product-specific ones, and Q6 (`What does it mean to multi-home tasks?`) confirms that Asana's own coinage needs a glossary entry.

Q8 is a **compound question** — "What are task templates? How can they help me?" — pairing the definition with the benefit, the same construction Wise uses. It is the only question in the block written from the reader's position.

Q1 (`Can I try task management in Asana for free?`) is the only trial question found anywhere in the harvest, and it is on a use-case page rather than on pricing.

### Block C — Help centre `FAQ and troubleshooting` topic `[observed]`

Not an FAQ block but a topic whose label promises one. Three of its thirteen articles are named `<Topic> FAQ` (`Asana Certification FAQ`, `Automation permission update FAQ`, `Salesforce AppExchange Integration Deprecation FAQ`), so FAQs exist as a *content type* inside a topic named for them — and the topic's only sub-section is called `Common issues and fixes`, which describes something else. Three levels of naming, three different concepts.

## T13 Terminology & glossary

| Term | Asana's usage | The alternative it rejected |
|---|---|---|
| `task` | The atomic unit of work | `issue`, `ticket`, `card`, `item` — though `Tickets` appears in the Work Graph diagram alt text and `IT ticketing` is a template name |
| `subtask` | Child of a task; has its own FAQ entry | `sub-item` |
| `project` | The container for tasks | `board`, `list` (both are *views* here, not containers) |
| `portfolio` | The container for projects | `program`, `workspace` |
| `goal` | The outcome objects that projects ladder to; `company, team, and individual levels` | `OKR` — which Asana publishes a definitional resource about but does not use as a product noun |
| `team` | The group container | |
| `organization` vs `workspace` | Two distinct account structures, with a dedicated FAQ asking which to upgrade | |
| `Work Graph®` | The trademarked data model — "A neural network of everything your company is doing" | `knowledge graph`, `object model` |
| `Multi-homing` | One task belonging to several projects | `cross-posting`, `linking`, `references` |
| `My Tasks` | The personal aggregate view | `Assigned to me`, `My work` |
| `Inbox` | The notification surface | `Activity`, `Notifications` |
| `Rules` | The automation primitive | `triggers`, `automations` (which is used for the *category*) |
| `Workflow Builder` | The no-code automation canvas | |
| `Bundles` / `workflow bundles` | Packaged rule sets | |
| `status update` | The periodic narrative report | `check-in`, `report` |
| `dots diagram` | The historical-status visualisation — lower-case, never a product name | |
| `burnup chart` | Velocity visualisation | `burndown` (the more common agile term) |
| `snapshot` | The frozen-at-publish semantics of a status update | `version`, `revision` |
| `Milestones` | Named stage markers inside a project | |
| `Agentic Work Management` | The 2026 product-category name | `work management` (retained in `AI work management` in the footer) |
| `AI Teammates` | Pre-built agents with names, mascots and `Skills` | `bots`, `assistants`, `agents` (reserved for the generic) |
| `Asana Dash` | "Your AI Chief of Staff" | `assistant`, `digest` |
| `AI Studio` | The no-code agent builder | |
| `AI request` vs `credits` | Two distinct metering units, for Teammates/Dash and Studio respectively | one unified unit |
| `Skills` | The capability list attached to each AI Teammate | `abilities`, `tools`, `functions` |
| `Shared memory` | Cross-agent learned context | |
| `Multiplayer` | Humans and agents in one shared space | `collaboration`, `co-editing` |
| `Command by Asana` | The developer-team product | |
| `Asana Gov` | A distinct support tier for government customers | |
| `uncomplete` | The verb for reversing project completion | `reopen`, `reactivate` |
| `Pause a member's license` | A seat state between active and removed | `suspend`, `deactivate` |

**AI Teammates are given job titles, mascots and skill lists** `[observed]` — the most distinctive naming decision in this file. Six are shown: `Launch Coordinator` · `Portfolio Advisor` · `Compliance Manager` · `Project Manager` · `Content Writer` · `Quality Coordinator`, each with a mascot illustration, an outcome line, and a `Skills` list.

The outcome lines are written as **the absence of a familiar pain**:
- `Launch Coordinator` — "More predictable launches with no missed milestones or surprises"
- `Portfolio Advisor` — "Early warning on delivery risk before it becomes a real problem"
- `Compliance Manager` — "Continuous compliance monitoring with no scramble at audit time"
- `Project Manager` — "Projects that start structured and stay on track through delivery"
- `Content Writer` — "Faster briefs and communications without starting from scratch"
- `Quality Coordinator` — "Faster issue resolution and fewer line stops disrupting production"

Five of six name the thing that will stop happening — missed milestones, surprises, the audit scramble, starting from scratch, line stops. **Naming the relief rather than the capability** is the pattern, and it works because the reader recognises the pain faster than they would parse the feature.

Each teammate then ships **three example prompts written as things a person would actually say**:
- "Run a go/no-go check for the upcoming product launch"
- "Give me a red/amber/green health check across all active initiatives"
- "Find every cross-project dependency that's currently blocked"
- "Show me what we'd need to delay if we deprioritized one initiative"
- "Check which controls are missing evidence before the audit"
- "Turn this brief into a project plan with tasks and owners"
- "Rewrite this overview so it matches our brand voice"
- "Escalate the line stoppage to engineering leads now"
- "Flag any failure mode appearing more than three times this month"

Eighteen prompts, all imperative, all specific to a named role, all naming real artefacts (go/no-go, RAG status, control evidence, failure modes). This is the best prompt-affordance copy in the corpus: it teaches the register and specificity the system needs by demonstrating it eighteen times, rather than by explaining it once. **Directly transferable to any product with a free-text AI input.**

Note the RAG prompt uses `red/amber/green` — a project-health vocabulary that **does not match Asana's own six status values** (`on track` / `at risk` / `off track` / …). The marketing prompt and the product's state vocabulary are different systems.

`Skills` are title-cased phrases — `Event Logistics Tracking`, `Cross-Functional Launch Alignment`, `Portfolio Health Monitoring`, `Blocker & Dependency Flagging`, `Recurring Issue Pattern Detection` — with one lower-case outlier, `brief writing`, in the Content Writer's list.

**Live terminology fossils** `[observed]`: `Premium` and `Business` (retired tiers, still on the status-page footer and still in the help centre's `Learn about Asana Business features` / `Learn about Asana Premium features` articles); `Asana Guide` (superseded by Help Center); `App Directory` (now `App integrations`); `Notes` → `Pages` (with `Pages in Asana (formerly Notes)` coexisting alongside live `Notes view` and `Shareable notes in Asana`); `Certified Pros` vs `Certifications`; `Wavelength` (retired blog).

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. First-person plural for the company appears mostly in recommendations ("We'd recommend completing projects before archiving") and on the status page ("We received an alert", "We're investigating"). Notably, the first person plural also shows up **as the user's voice** in a field label — `What we've accomplished` — where the "we" is the project team, not Asana. That shift is deliberate and it is the only place in the harvest where a product string speaks as the user.

**Register.** Corporate-optimistic on marketing surfaces, with heavy reliance on a small set of intensifiers: `supercharge` (three times across two pages), `transform`, `accelerate`, `unlock`, `seamlessly`, `at-a-glance`, `real-time`, `best-in-class`-adjacent superlatives (`the best way`, `the only platform`). Help content is plainer and instructional. There is no playful register anywhere — no emoji, no jokes, no colloquialisms — which distinguishes Asana sharply from Notion and Slack.

The one place the register loosens is the AI Teammate prompts (T13), which are written in working voice ("Give me a red/amber/green health check", "Escalate the line stoppage to engineering leads now"). They are the most natural strings on the site and they are written for a machine to receive.

**A marketing CTA inside reference documentation** `[observed]`: the project-status help article contains, mid-procedure, "Custom fields are the best way to tag, sort, and filter work. See them in action with a free Asana trial. `Try for free`." A superlative claim plus a trial CTA, aimed at a reader who is by definition already a paying project member posting a status update. A clear register and audience violation, and the only instance in the five-product corpus of marketing copy inserted into a procedure.

**Numbers are footnoted, sourced and dated** `[observed]`: `85% of Fortune 100 companies choose Asana¹` with the footnote "Accurate as of December 2023, includes free and paid users." — **the footnote both dates the claim and widens the denominator**, admitting that "choose Asana" includes free users. That is more honest than the headline implies, and disclosing it is to Asana's credit.

Also `42% faster execution of business processes`, `40% more business processes completed`, `72% improvement in employee satisfaction`, all attributed to "IDC White Paper, The Business Value of the Asana Platform, Doc. #US50642023, June 2023" — document number and date given. `Loved by 100,000+ organizations across the globe`. `200+` integrations on the task page against `100+ free integrations` in the pricing matrix — **two counts for one thing**, the difference presumably free-vs-total, unexplained.

**Casing is inconsistent within single pages.** In one help article: `project Owner` / `project owner`; `for your Team` / `your team's velocity`; `a project's Status` / `a project's status`; the `Status update` **View** against the `Overview` **tab**. Link text `reporting` with a `title` attribute reading `Reporting`.

**Typography is inconsistent within single paragraphs.** Curly and straight quotes alternate around the same string: `"Regional Impact"` (curly) and `"Regional Impact"` (straight) in adjacent sentences. Apostrophes likewise: `project's` (curly) and `project's` (straight) across one article. And `meta-twitter:card: "summary"` ships with **curly quotes around the value**, which breaks Twitter/X card parsing outright.

**Accessibility content** `[observed]`

Positives:
- Alt text on the homepage's product screenshots is genuinely descriptive and scene-level, among the best in this corpus: "Asana task comments showing a conversation between teammates and Beacon AI, which retrieves task details and updates a due date autonomously" · "Asana AI teammate Penny's profile showing its memory log with learned preferences for pricing communications, confidence scoring, and deal-level recommendations" · "Dark mode IT ticket UI. A chat shows Service AI fulfilling a user's Figma license request. The sidebar details the automated workflow steps executed by AI agents (Identity, Approval, Provisioning) to assign the license." These describe the *demonstrated behaviour*, not just the screen.
- `Get Asana Gov support` as a distinct accessible support route.
- Runtime and difficulty metadata on learning content (T4) benefits cognitive accessibility.
- Video tutorials with stated durations.

Defects, several of them severe:
- **`[object Object]` shipped as the alt text on all 13 help-centre topic icons.** A JavaScript object stringified into an `alt` attribute, on every help page. The *second* render of the same tile set on the same page has correct alt text (`Getting started`, `FAQ and troubleshooting`, …) — so one component is right and its duplicate is broken, and a screen-reader user hears "[object Object]" thirteen times before reaching the working copy.
- **`PersonalStarterAdvancedEnterpriseEnterprise+PremiumBusinessLegacy Enterprise`** — eight plan names concatenated with no delimiter in the plan-gating module of every gated help article. Announced as one meaningless word.
- **No alt text on any instructional image in the status-updates article.** Roughly half are empty (`![]()`), the rest carry filename-ish fragments (`milestones overview`, `charts`, `delete status ` — with a trailing space, `notifications`, `Restore project`, `highlight ordering`, `completed project status`). Because the six status values' **colour coding exists only in these images**, the colour key is unavailable to non-sighted users entirely.
- **The entire help-centre footer is dead** — approximately 50–70 links all pointing to `href="#"`, including `Pricing`, `Help Center`, `Get support`, `Terms`, `Privacy`, both app-store badges and every social icon. The same footer on asana.com carries real URLs, so the help-centre build is stripping hrefs.
- The help-centre header logo links to `https://help.asana.com/s/article/asana.com` — a malformed URL with the domain appended as an article slug.
- OneTrust developer placeholders shipped visible in the consent panel: `Switch Label` (×2), `checkbox label` (×4), `label` (×4), `Back Button`, `Search Icon`, `Filter Icon`.
- Two `H1`s on the pricing page (`Agentic Work Management` and `ADD-ONS`, the latter an all-caps eyebrow marked up as H1).
- `Loading` rendered twice per help page, once *after* the footer, followed by an orphan bare page-title string with no container.
- Empty `alt` on numerous pricing-page images, including the AI Teammates screenshot which ships an empty-alt copy immediately followed by a fully described copy.
- An unlabelled checkbox referenced in instructions by position only ("the checkbox in the upper right-hand corner").

**Negative findings, recorded honestly**

- `[object Object]` as alt text, 13 times per help page.
- `PersonalStarterAdvancedEnterpriseEnterprise+PremiumBusinessLegacy Enterprise` — concatenated plan names in the gating module.
- `Hello!How can we help?` — missing space in the help centre's H1.
- `Sorry to interrupt` / `CSS Error` / `Refresh` in the served markup of every help page.
- `Includes 75K credits **ber** billing account per month` — typo in a billing disclosure, 4 occurrences, contradicting the correctly-spelled matrix.
- `Pre-paid AI requests **are are** $0.50 **per month**` — doubled word plus a unit that contradicts the adjacent card's "per AI request".
- `Yours for your full contract **team**` — "team" for "term".
- `Please note that you must select a project status **of** before you can post` — dangling preposition; the sentence is unparseable.
- `Need help **cratfing** your status updates?` — transposition.
- `Visualize how all **of of** your goals connect` — doubled word.
- `Design and automate routine workflows with our no-code builder. to enhance efficiency` — sentence broken by a stray full stop.
- `Add your company logo and colors… for a more polished and professional look,` — trailing comma for a full stop.
- `their projects progress` — missing apostrophe, in a plan positioning line.
- `the apps you use **everyday**` — adjective for adverbial phrase, in a help-centre scope line.
- Reminder cadence: **Thursday** in prose, **Friday** on the toggle.
- Six project-status values with **no definitions and no colour key in text**.
- The status-updates article does not mention `Smart status` or AI drafting at all.
- `Related articles` on the status article lists ten links, **none about status updates**.
- `What we've accomplished` is a default field the procedure never introduces.
- `Enterprise+` is a tier with no card, no price and no positioning line.
- Add-on availability contradicted between card ("Enterprise plan") and matrix (all four columns).
- Three signup labels (`Get started` / `Sign up` / `Purchase now`), two of them on the same card.
- Three demo labels; three support labels; two Academy labels on one page.
- `Contact sales` rendered twice inside one nav button cluster.
- Bare `Learn more` at least 15 times across two pages, resolving to three different content types.
- Help home shows 8 topics; the mega-menu shows 13.
- Card label `Troubleshooting` vs destination H1 `FAQ and troubleshooting`.
- `Timeline` and `Gantt` as separate matrix rows, described elsewhere as the same view.
- `200+` vs `100+` integrations across two pages.
- `No articles found for this topic.` on two published sub-sections, with no exit.
- Four spellings of "getting started" across the help topic tree, in three casings.
- Plan-card block duplicated (desktop + mobile) with the two renders disagreeing on the monthly price and the Enterprise price wording.
- `Reference custom fields` appears as a row label in two different matrix groups with identical description.
- `Asana webinars` and `Asana Academy` share byte-identical descriptions in the matrix.
- Two consent strings for one signup widget, naming different documents.
- Three different value propositions across the homepage's own `<meta>`, `og:` and on-page copy.
- Curly quotes in `meta-twitter:card`, breaking card parsing.
- `Asana in Salesforce AppExchange (being deprecated)` and `Pages in Asana (formerly Notes)` — lifecycle state baked into titles.
- TOC anchor convention broken for one of thirteen sections (`gl-` prefix on twelve, not on `adding-custom-fields-to-status-updates`).
- No feedback widget anywhere in the help centre.
- No search placeholder text.
- No trial language on the pricing page.

---

## Transferable patterns

1. **`What's the status?` — phrase a field label as the question someone is asking you.** For any field whose failure mode is being skipped (status, reason, context, notes), a second-person question outperforms a noun label because it prompts an answer rather than naming a slot. Condition: works for narrative fields, not for structured ones where the label must also be a column header.
2. **Encode the reporting template in the default field labels.** `Summary` → `What we've accomplished` → `Next steps` is past-present-future in three headings, with the middle one in the team's own first person. The template teaches the format; the user only fills it in. And the system remembers the block order after the first publish, so the template learns.
3. **Name what is *not* metered.** `Administrative tasks are included` on a consumption-billed AI product removes the hesitation that suppresses usage. Pair with a single flat unit price and a stated spend cap. Directly relevant to any usage-billed feature.
4. **Deliver the recurring nudge as a task, not a notification.** Asana schedules the status-update reminder into the owner's own task list, so it inherits due dates, snoozing and completion. The reminder lives in the same surface as the work. Transferable to any product that already has a work queue.
5. **Freeze and enumerate.** "the data is frozen at the time of publishing. This includes things like project name, custom fields, task names, due dates, and assignees." Naming exactly which fields are snapshotted converts a future bug report into an understood behaviour. Applies to any versioned, published or receipted artefact.
6. **Disambiguate the two end-states users conflate**, with a recommendation and a stated consequence: complete (a status) vs archive (a storage action), "Archiving… does not update a project's status." Same shape as paid/settled, closed/resolved, cancelled/refunded.
7. **Ship eighteen example prompts in the user's working voice.** "Give me a red/amber/green health check across all active initiatives" teaches specificity and register by demonstration. Far more effective than one paragraph explaining how to prompt. Condition: the prompts must name real artefacts from the user's domain, not generic verbs.
8. **Name the AI capability by the pain it removes, not the task it performs.** "Continuous compliance monitoring with no scramble at audit time" · "Faster briefs without starting from scratch". Five of six AI Teammate lines name the thing that stops happening.
9. **Differentiate notification triggers by channel intrusiveness, and disclose the difference at opt-in.** Email fires on `creates`, `updates`, `resolves`; SMS on `creates` and `resolves` only — stated in the subscribe copy with the verbs bolded.
10. **Incident titles that answer "is this me?"** `Slow performance for a subset of Asana users` — symptom in user terms, blast radius bounded, audience named, six words. And open the first post with the detection mechanism ("We received an alert") so nobody files a duplicate ticket.
11. **`Who can use this feature?` as a plan-gating module at the top of every gated article.** A second-person question answered before the reader invests in the procedure. (Fix the rendering — see Caveats.)
12. **Write help content for the champion's governance problem.** `Establish conventions for your team` and `Help your team adopt Asana` document the customer's rollout risk, not the product's features. The highest-leverage articles in a team-tool help centre are the ones about agreement, not about buttons.
13. **Put duration and difficulty inside the link text.** `Get started in Asana 3:41` and `Beginner … 25 minutes` let the reader budget before clicking, and they substantiate a claim like "Learn Asana in minutes" rather than asserting it.
14. **Two-verb consent lines.** "I agree to Asana's `Terms of Service` and acknowledge the `Privacy Statement`" — you *agree to* a contract and *acknowledge* a notice. A legally meaningful distinction in four words, in the first person.

## Caveats & gaps

- **Three pages exceeded the fetch tool's output limit** (pricing ~53KB, the troubleshooting topic ~67KB, the project-progress article ~81KB) and were read via delegated full-file extraction rather than directly. The extraction was instructed to read 100% of each file and to quote verbatim; strings from those three pages are as reliable as directly-fetched ones, but they passed through one additional hop and are flagged here for provenance.
- **All three FAQ blocks have unretrievable answers.** The pricing (18), task-management (8) and any help-article FAQs are accordion-collapsed and absent from server HTML. Questions are verbatim; answers are `[absent]` throughout T12 rather than summarised. This is the largest single gap in the file — 26 questions with no answers means the disclosure substance behind refunds, tax, security, data storage, on-premises availability and academic pricing is entirely unharvested.
- **No error-message catalogue exists** (T7). Unlike Notion and Slack, Asana publishes no list of in-product error strings, and none of the four help pages opened quoted one. Recorded as a genuine absence with the search scope stated, not as a harvest gap.
- **In-product states are documented, not observed.** The six project-status values, the status-update composer fields, the archive banner and the reminder toggle are quoted from a help article describing the UI. Marked `[documented]` throughout.
- **Empty states are almost entirely absent.** The five captured (T8) are Atlassian Statuspage defaults plus one help-centre no-content message. Every in-product empty state — empty `My Tasks`, empty project, empty portfolio, no-results search — is behind auth and undocumented.
- **No published voice-and-tone guide or design system was found.** Searched the footer, the Learning & support menu, `/company`, `/culture-and-belonging` and the help centre. As with Notion, Linear and Slack, the T14 findings are inferred from copy across nine pages, not read off a stated standard. Asana has no public brand or content-standards property equivalent to Linear's `/brand` or Slack's `brand.slackhq.com`.
- **Only three help articles' worth of body content was opened** — the project-progress article in full, plus the Getting started hub and the topic index. Roughly 400 article titles were captured from the help-centre topic tree; titles are high-signal for IA and task phrasing but say nothing about answer structure.
- **`asana.com/trust`, `academy.asana.com`, `forum.asana.com`, `developers.asana.com` and the four product pages** (`/product/ai`, `/product/service-management`, `/product/client-management`, `/product/command`) are all unharvested. The product pages are the destinations of the fifteen bare `Learn more` links and would carry feature-level state vocabulary; `academy.asana.com` would carry the richest onboarding-step language.
- **`Smart status` was not opened.** It is the AI status-drafting feature that the canonical status article omits; its help article exists at `/s/article/smart-status` and would close the T9 gap.
- **The status page showed a resolved incident, not a live one.** The three-post narrative captured is complete for that incident, but no active-incident banner, no degraded-component state and no maintenance notice were observable.
- **Localisation not sampled.** Fourteen locales on marketing, thirteen in the help centre (Russian is offered on asana.com but not in the help centre — a coverage asymmetry worth noting). Only en-US inspected.
- **Mobile app copy not harvested** — out of the public web surface.
- **The Command, Service Management and Client Management products are marked `Coming soon` in the help-centre nav but sold as live on asana.com** (Client Management has its own pricing page). Statements in this file about those three products describe the marketing surface; their actual availability is contradicted between Asana's own two properties.

## Sources

1. https://asana.com/
2. https://asana.com/pricing
3. https://help.asana.com/ (→ https://help.asana.com/s/)
4. https://help.asana.com/s/getting-started
5. https://help.asana.com/s/topic/0TOPc0000003VYkOAM (`FAQ and troubleshooting`)
6. https://help.asana.com/hc/en-us/articles/14148168179099-Project-progress-and-status-updates (→ https://help.asana.com/s/article/project-progress-and-status-updates)
7. https://asana.com/uses/task-management
8. https://asana.com/templates
9. https://status.asana.com/
