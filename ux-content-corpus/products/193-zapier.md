# 193. Zapier

| Field | Value |
|---|---|
| Domain | `SVC` — Customer service, business, and public service |
| Industry / sub-vertical | No-code automation platform (repositioning as "AI orchestration platform") |
| Primary URL | https://zapier.com/ |
| Corpus rank | 193 |
| Benchmark strength (source list) | Automation mapping and errors |
| Locale / market observed | en-US (site offers DE, ES, FR, JA; pricing offers 20 currencies) |
| Platform observed | Web marketing site (Next.js), Zendesk-hosted help centre, incident.io status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no financial or health regulator. Security posture surfaces as plan features: SAML SSO, SCIM, audit log, custom data retention, static IP, app access controls, Observability API |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 fetched successfully |
| Harvest completeness | **Full for the priority sections.** Zapier's help centre is server-rendered and completely readable, and it publishes a formal glossary article and an eleven-status run-status reference. T6, T7 and T13 are exceptionally well evidenced. The homepage exceeded the fetcher's size limit and only its metadata and navigation were captured, so T2 leans on the pricing page |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://zapier.com/ | **Partial** — full nav and meta captured, body exceeded the size limit |
| Pricing | https://zapier.com/pricing | Four plans, task-tier selector, three separate pricing blocks, ~35 FAQ questions, full feature comparison matrix |
| Help centre home | https://help.zapier.com/hc/en-us | Twelve top-level categories, each with a scope sentence |
| Key concepts (glossary) | https://help.zapier.com/hc/en-us/articles/8496181725453-Learn-key-concepts-in-Zap-workflows | 18 defined terms — the canonical vocabulary source |
| Run statuses | https://help.zapier.com/hc/en-us/articles/20505304170637-Review-run-statuses-in-Zap-workflows | **Eleven statuses**, each with definition, icon, propagation rule, and worked example |
| Troubleshoot errors | https://help.zapier.com/hc/en-us/articles/8496037690637-How-to-troubleshoot-errors-in-Zap-workflows | Five unsuccessful-status disambiguation, seven HTTP codes, thirteen named failure articles |
| Zap is not running | https://help.zapier.com/hc/en-us/articles/8496216132621-Zap-is-not-running | Auto-shutoff thresholds, grace periods, error-ratio override labels |
| Troubleshoot held runs | https://help.zapier.com/hc/en-us/articles/37454233721869-How-to-troubleshoot-held-Zap-or-step-runs | Six named causes of `On hold`, each paired with a fix |
| Task usage | https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier | The billing-unit definition, what counts and what does not, notification thresholds |
| Status page | https://status.zapier.com/ | Sixteen named components, operational statement |

---

## T1 Navigation & IA labels

`[observed]`

**Global nav is five items**: `Products` · `Solutions` · `Resources` · `Enterprise` · `Pricing`, plus a language selector (`EN` / `Deutsch - DE` / `English - EN` / `Español - ES` / `Français - FR` / `日本語 - JA`), `GitHub`, `Explore apps`, `Contact sales`.

`GitHub` as a top-level global nav item on a no-code product's marketing site is the notable anomaly — it signals the repositioning toward developers and AI agents.

**The Products menu is organised into four sub-groups, and the group labels do the categorisation work** `[observed]`:

- Header: `Zapier Automation Platform` — "No-code automation across 9,000+ apps"
- `Most Popular` → `Zap workflows` ("Do-it-yourself automation for workflows") · `Zapier MCP` ("Add Zapier to your AI chat") · `Zapier SDK` ("Install Zapier to your AI coding agent") · `Tables` ("Store data your Zap workflows can read and update")
- `Capabilities` → `App integrations` ("Explore 9,000+ app connections") · `AI automation 🪄` ("Cutting-edge AI to upgrade your workflows") · `Security` ("Enterprise-grade security")
- `More Products` → `Forms` ("Capture inputs that trigger workflows") · `Canvas` ("Plan and map your workflows with AI") · `Agents` ("Create your own AI assistants for any task") · `Chatbots` ("Answer customer questions with AI chatbots")

Two observations. `Most Popular` as a *navigation group label* is a merchandising term, not an IA term — it tells the user what other people clicked, not what the thing is. And `AI automation 🪄` ships an emoji **inside a navigation label**, which is the only emoji in the entire harvest and sits in a screen-reader-announced position.

**Solutions is triple-faceted** `[observed]` — `By team` (RevOps, Marketing, IT, HR, Sales, Customer Support, Leaders, Executive Assistants), `By app` (nine named apps plus `View all apps`), `By use case` (Lead management, Sales pipeline, Marketing campaigns, Customer support, Data management, Project management, Tickets and incidents). Plus a separate `Zapier for` axis: Startups / Small and medium businesses / Enterprise.

That is **four simultaneous segmentation axes** in one menu — role, app, job, company size. Each `By team` item carries a benefit gloss rather than a description: `RevOps` — "Drive revenue through automation"; `Sales` — "Close more deals"; `Executive Assistants` — "Eliminate repetitive admin tasks"; `Leaders` — "Streamline decision-making processes". The glosses are outcomes, not capabilities, which is correct for a role-based menu.

**Help-centre top level — twelve categories, each with a scope sentence** `[observed]`. This is the best IA artefact on the site:

| Category | Scope line (verbatim) |
|---|---|
| `Getting started` | "Learn how to make the most of your Zapier account to build automated workflows." |
| `Your Zapier account` | "Learn more about your Zapier profile, notifications, plans, billing, security, and privacy." |
| `Zap workflows` | "Create workflows that connect your apps to automate repetitive tasks." |
| `Zapier tools` | "Use Zapier tools to add essential features to your workflows. You can transform data or control exactly how your automations run." |
| `Zapier AI` | "Add AI into any workflow exactly where you need it. Leverage customer chatbots, autonomous agents, and intelligence actions to integrate powerful AI and control your apps through MCPs." |
| `Custom logic and integrations` | "Go beyond standard integrations with powerful utilities to execute custom code, make direct API calls, and use webhooks to build highly specialized and flexible workflows." |
| `Apps` | "With over 8,000 apps on Zapier, from Airtable to Zendesk, easily connect the apps that you use to start building your workflows." |
| `Forms` | "Collect information with automation-ready forms." |
| `Tables` | "Store your data: save, edit, access, and share the data you need to power your Zaps via a no-code data storage solution." |
| `Canvas` | "Use Zapier's AI-powered diagramming tool that helps you visualize, plan, and automate your processes." |
| `Lead Router` | "Automatically route incoming leads to your sales team based on rules you set, ensuring even and accurate distribution." |
| `Product updates` | "Explore what's new in Zapier: features, improvements, and bug fixes." |

Every category is a product noun except `Getting started`, `Your Zapier account`, and `Custom logic and integrations`. Every scope line is an **imperative addressed to the user** (`Learn…`, `Create…`, `Use…`, `Add…`, `Go beyond…`, `Store…`, `Explore…`) — a consistent grammatical rule applied across twelve items, which is rarer than it should be.

**Defect.** The `Apps` scope line says **"over 8,000 apps"**. Every other surface on the site — the nav header, the `App integrations` gloss, the homepage meta description, and the pricing FAQ — says **"9,000+ apps"**. The help centre is a full thousand behind.

Breadcrumbs are three-level and consistent: `Zapier` → `Zap workflows` → `Troubleshoot Zap workflows`. Help header utility: `My Requests` (rendered twice in the DOM) · `Contact Support` · `Sign in`.

**Footer** `[observed]`: `Pricing` · `Help` · `Developer Platform` · `Press` · `Jobs` · `Enterprise` · `Templates` · `App Integrations` · `Partners Program`, plus `Manage cookies` · `Legal` · `Privacy`. Nine items, no grouping headers. Unusually thin for a product with this many surfaces.

## T2 Value proposition & headline patterns

`[observed]`, mainly from the pricing page and metadata; the homepage body was not captured.

**Homepage positioning, from metadata** `[observed]`:

> Title: `Zapier: Automate AI Workflows, Agents, and Apps`
> Description: "Build and scale AI workflows and agents across 9,000+ apps with Zapier—the most connected AI orchestration platform. Trusted by 3 million+ businesses."

**`AI orchestration platform`** is the current self-description, and `the most connected` is the differentiator claim — connectedness rather than power or ease. Note the ordering in the title: *AI Workflows, Agents, and Apps*. Apps come last. In a product whose entire original proposition was "connect your apps", apps are now the third noun.

**Pricing page hero** `[observed]`:

> `AI orchestration plans that scale with you`
> "Unlock the power of AI orchestration across your organization. Zap workflows, Tables, Forms, and Zapier MCP bring together automated workflows, structured data, custom forms, and an AI action layer in one platform."

The subhead is a **four-term parallel appositive** — four products mapped one-to-one onto four abstractions: Zap workflows → automated workflows, Tables → structured data, Forms → custom forms, MCP → an AI action layer. It teaches the portfolio's shape in one sentence. `an AI action layer` is doing the most work and is the vaguest of the four.

**The pricing page leads with a change notice, not with a price** `[observed]`:

> `New: Your pricing works the same way everywhere you use Zapier.`
> "AI steps, code, and SDK now all follow the same task-based pricing model, so usage is easier to understand everywhere you use Zapier."
> `See new task usage rates`

Announcing a pricing-model change *above* the price table, framed as a simplification benefit ("so usage is easier to understand"), with a link to the detail. That is the right structure for a change that will increase some customers' bills.

**Plan descriptions are one sentence each and each names the ceiling being removed** `[observed]`:

| Plan | Price | Description (verbatim) |
|---|---|---|
| `Free` | `Free forever` / `$0/month` | "Start automating with AI. Zaps, Tables, and Forms included (100 tasks per month)." |
| `Professional` | `Starting from $19.99/month` | "Unlock the full power of the Zapier platform with unlimited access to Zaps, Tables, and Forms." |
| `Team` | `Starting from $69/month` | "Collaborate with your team to build and manage complete AI-powered systems." |
| `Enterprise` | `Contact for pricing` | "Scale AI-powered systems across your entire organization." |

The four verbs are `Start` → `Unlock` → `Collaborate` → `Scale`. A deliberate progression: individual capability, individual power, group, organisation.

**Three separate pricing blocks on one page** `[observed]` — the platform plans, then `Agents plans`, then `Chatbots plans`, each with its own currency selector, its own monthly/yearly toggle, its own comparison matrix, and its own FAQ set. And each has a free tier: `Free` / `Free forever`; `Agents Free` / `Forever` / `Free`; `Chatbots Free` / `Forever` / `Free`. **Three "free forever" tiers on one pricing page**, with three different units of consumption (tasks, activities, chatbots).

**The pricing-philosophy section is three named principles** `[observed]`, under the heading `Our commitment to flexible, risk-free pricing`:

- `Your plan, your way` — "Pick any task tier, and if you reach your limit, you'll be switched to pay-as-you-go unless you turn it off or move up to a higher tier."
- `More valuable as you grow` — "The higher the task tier, the lower the cost per task."
- `Commit and save` — "Commit to annual payments for a lower monthly fee."

The first principle's body **describes an automatic charge-increasing behaviour under a heading that promises user control**. "Your plan, your way" followed by "you'll be switched to pay-as-you-go unless you turn it off" is a defensible disclosure with an indefensible heading — the default is opt-out, and the heading says the opposite.

**Section headings elsewhere** `[observed]`: `Meet the platform` · `AI at every level` · `About task usage rates` · `Shared task pool` · `Scales with how you build` · `All paid plans include` · `Compare all features`.

`Scales with how you build` — "Simple automations stay simple to price. When you use more powerful AI models, add tools, or run longer code, usage reflects that complexity. **You control the tradeoff.**" Three sentences: reassurance, mechanism, agency. The final four-word sentence is the pattern worth noting — it converts a variable-cost disclosure into a statement about user control.

## T3 CTA inventory

`[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try it free` | Pricing hero, Free/Professional/Team cards, Agents Free/Pro, Chatbots Free/Pro/Advanced | **Nine instances of one label on one page** — and it appears on cards costing $0, $19.99, $69, $33.33, $13.33 and $66.67 |
| `Contact sales` / `Contact Sales` | Nav, Team card, Enterprise card, Chatbots Custom | **Both casings on one page** |
| `More about Enterprise` | Enterprise card, below `Contact sales` | Secondary, non-committal |
| `Learn more about Agents` / `Learn more about Chatbots` | Section intros | Names the object |
| `Learn more about usage rates` | Task-rate explainer | |
| `See new task usage rates` | Change-notice banner | Imperative + "new" |
| `See all plan features` / `Compare all features` | Twice each | Two labels for one anchor target |
| `Explore Zap workflows` / `Explore SDK` / `Explore MCP` | Platform section | `Explore <Object>` |
| `Explore apps` | Global nav | |
| `Explore templates` / `Explore use cases` / `Join Zapier Early Access` / `Industry comparisons` | Repeated in **four separate mega-menu panels** verbatim | A four-item promo block duplicated across Products, Solutions, Resources, and Developer resources |
| `Explore articles` | Help centre, ×12 (one per category) | Bare but the card supplies the object |
| `Save your spot` | Site-wide event banner — "Refound your company for the AI era at ZapConnect 2026" | Present on every help-centre page |
| `Contact Support` | Help header and footer cards, rendered twice in the header | |
| `Visit Community` · `Hire an Expert` · `Zapier Learn` | Help-page footer cards, each with a gloss | `Hire an Expert` — "Leverage professionals across the globe ready to help." |
| `Subscribe to updates` | Status page, rendered twice | |
| `Skip to content` (marketing) / `Skip to main content` (help centre) | First in DOM | **Two different skip-link labels across two properties** |
| `Yes` / `No` | Help-article "Was this article helpful?" | |
| `Go to step` | `[documented]` — Zap editor, expands the errored step | |
| `Troubleshoot` | `[documented]` — a **tab label** inside the Zap run details and the editor sidebar | |
| `Logs` | `[documented]` — sibling tab to `Troubleshoot` | |
| `Turn off if errors occur (recommended)` / `Keep running if errors occur` | `[documented]` — error-ratio override radio labels | See T5 |

**Observation.** `Try it free` nine times on the pricing page is a deliberate uniformity, not an accident — it makes every tier feel equally low-commitment. The cost is that the CTA carries zero information about which product or tier it starts. Compare the `Explore <Object>` pattern used everywhere else, which always names the destination. Zapier applies two opposite CTA philosophies on adjacent page regions.

**The best CTA in the harvest is `Troubleshoot` as a tab.** Putting troubleshooting on a peer tab beside `Logs` inside the run detail, rather than as a link out to a help article, makes diagnosis a first-class view of the object rather than an escape hatch.

## T4 Onboarding & getting-started

`[observed]` and `[documented]`

**The onboarding artefact is the glossary, not a step sequence.** The `Getting started` category's first section is `Intro to Zapier`, whose flagship article is `Learn key concepts in Zap workflows` — eighteen defined terms in alphabetical order, each with a definition, most with a worked example and a screenshot. The article closes by routing forward: "Then, use the Zap workflows quick start guide to learn how to build your first Zap."

**Teaching the vocabulary before the procedure is the central onboarding decision** and it is the right one for this product. A Zap is a conditional-logic construct; a user who does not hold `trigger`, `action`, `step`, `filter`, `path` and `task` as distinct concepts cannot follow any procedure. Most products would open with "Step 1: connect your app".

**The worked examples are one continuous scenario** `[observed]`. Across four separate definitions, the same example recurs:

- `Trigger` — "if you want to send a text message each time you receive an email, the trigger is 'new email in inbox'"
- `Action` — "if you want to send a text message each time you receive an email, the action is Send a text message"
- `Filter` — "if you want to send a text message each time you receive an email, you can add a filter so the Zap only runs when emails are received from a specific email address"
- `Multi-step Zap` — defined by contrast with the single-step version of the same shape

**One scenario, elaborated across four terms**, so each new concept is a modification of a structure the reader already holds. The pricing FAQ runs the same technique with a different scenario (new lead → Slack message to a sales rep), reused across `What is a trigger?`, `What's the difference between Zap workflows, triggers, actions, and tasks?`, and `What are tasks?`.

**Named getting-started surfaces** `[observed]`: `Zapier quick-start guide` ("Automate with confidence"), `Zapier Academy` ("Build AI skills to transform work"), `Zapier Learn` ("Take courses designed to help you become a better Zapier user"), `5 things to automate today` ("Popular workflows to save time"), `Create custom chatbots` ("Build an AI chatbot in minutes").

`5 things to automate today` is the strongest first-run content title on the site — a number, a verb, and a deadline, and it addresses the actual blocker (not knowing what to automate) rather than the assumed one (not knowing how).

**Trial terms** `[observed]`, pricing FAQ: "When you create a new Zapier account, you're instantly enrolled in a free 14-day trial of the Zapier Professional plan. No credit card is required." Automatic enrolment stated plainly, plus the credit-card negation.

## T5 Form & field labels

`[documented]` — the Zap editor is behind auth. What is documented is the **field vocabulary of the builder** and a small number of exact control labels.

**The editor's structural vocabulary** `[observed]` from the glossary:

- `Zap editor` — "allows you to create a Zap from scratch. In the Zap editor, you can set up a trigger and one or more actions."
- `Zap outline` — "displays all steps in your Zap. When you select a step, a sidebar will open one the right, displaying additional information and options for the step." (The typo `one the right` is Zapier's.)
- `Test record` — "When you first set up your Zap trigger, Zapier will attempt to find some existing data from your trigger app to use in the Zap."
- `Zap runs` sidebar, `Status` section, `Zap runs icon`, `advanced settings icon`, `Status icon`

**Field mapping is the central form concept and it has a name** `[documented]`: `mapping fields`, defined by the linked article title `Send data between steps by mapping fields`. The verb is *map*, the object is a *field*, and the direction is *between steps*. Three of the eleven run statuses are defined by reference to mapped fields — `Errored` propagates to "all subsequent Zap steps that depend on fields mapped from this step", `Skipped` occurs "when the affected step requires data from a mapped field, but the preceding step that contains the mapped field halted". The mapping concept is load-bearing for the whole state model.

**Exact radio-button labels, one of the few verbatim in-product control sets available** `[documented]`, from the `Error ratio override` setting:

> `Turn off if errors occur (recommended)` — "this is the default setting for all Zap workflows in your account."
> `Keep running if errors occur` — "this allows you to override the default setting so the Zap stays on even if it errors repeatedly."

Two labels, parallel construction (`<verb phrase> if errors occur`), the safe one marked `(recommended)` and stated to be the default. The dangerous one's help text uses the word `repeatedly`, which is doing the warning work without a warning component. This is a well-built pair.

**The issue-severity vocabulary in the editor's Status section** `[documented]`, published as a three-row table with definitions and examples:

| Issue | Definition (verbatim) | Example (verbatim) |
|---|---|---|
| `Warning` | "A step has an issue that will prevent you from publishing your Zap." | "You left a step before completing it." |
| `Error` | "A step has an issue that occurred after you attempt to publish your Zap." | "You need to reconnect your app." |
| `Info` | "There's additional info about a step that you should know about." | "The app you're using will be deprecated." |

The distinction is **temporal, not severity-based**: Warning = before publish, Error = after publish. That is an unusual and defensible axis — it maps to "you can still fix this before it matters" versus "this is already affecting live runs" — but it is not what `Warning` and `Error` conventionally mean, and the article never flags the divergence.

**Named field-level failure articles** `[documented]`: `Zap field will not accept your data` · `Fix "Required field is empty" errors in Zap workflows` · `Dropdown menu in Zap field is empty or missing items`. Two of these quote the literal error string in the title (`"Required field is empty"`), which is the correct title strategy for an error a user will paste into search.

**Search-action configuration is a labelled binary with named consequences** `[documented]`: the option is whether to "proceed if nothing found", with values `Yes` and `No`, and the task-usage article states the billing consequence of each ("**Yes** (proceed if nothing found): the search action uses 1 task. **No**: the search action uses no tasks."). A configuration toggle whose *price* is documented alongside its behaviour.

## T6 Status & state language

**Well evidenced.** Zapier publishes an eleven-status reference with definitions, icons, propagation rules and worked examples.

### The eleven run statuses `[documented]`

Listed in the article's own order, which is alphabetical except that `On hold` precedes `Needs review`:

| Status | Definition (verbatim) | Icon |
|---|---|---|
| `Delayed` | "the Zap run has a Delay step that is postponing the completion of the Zap run" | clock |
| `Errored` | "the run encountered an issue and did not run successfully" | hand |
| `Filtered` | "the conditions in a Filter step were not met, so the Zap did not run any subsequent steps" | filtered |
| `Handled error` | "an error handler ran as an alternative workflow after a step errored" | hand |
| `On hold` | "the run is paused" | pause |
| `Needs review` | "a step requires human review before the Zap can proceed" | thumbs up |
| `Running` | "the run is in progress" | running |
| `Safely halted` | "the run purposely stopped" | clock |
| `Scheduled` | "the Zap run is scheduled to re-run because it encountered an error and autoreplay is enabled" | clock |
| `Skipped` | "a step did not run because of the result of a preceding step in the Zap" | info |
| `Successful` | "the run completed without issues" | check mark |

### The structural insight: status exists at two levels and they can disagree

The article's first sentence establishes it: "Zap and step run statuses indicate whether your Zap or specific steps within it ran successfully or not. **A Zap run status may differ from the statuses of its individual steps.**"

Every status definition then specifies its **propagation rule** — what the Zap-level status is, what the affected step's status is, and what happens to downstream steps. Examples:

- `Errored` — "The Zap run, affected step run, and all subsequent Zap steps that depend on fields mapped from this step will have `Errored` statuses."
- `Handled error` — "**Only the Zap run** will have a `Handled error` status. The errored step it branches from will have an `Errored` status."
- `Safely halted` — "The Zap run and affected step run have `Safely halted` statuses. **Subsequent steps will still run**, but if they have required fields mapped from this step, they will error."
- `Skipped` — "**You will only ever see this as a step run status, not a Zap run status.**"

Publishing the propagation rule for every state, rather than only the state's meaning, is the thing to steal. A status in a multi-step system is not a label on one object; it is a rule about a graph.

### The `Filtered` overload is the most significant finding

`Filtered` is documented as meaning two entirely different things:

1. **The intended meaning**: a Filter step's conditions were not met, so the run stopped. This is a *successful* outcome — the automation correctly declined to act.
2. **The pervasive secondary meaning**: "hasn't run yet". Downstream steps are given `Filtered` while the run is `Delayed`, `On hold`, `Needs review`, or `Running`. Four of the eleven statuses explicitly say "all subsequent steps will have `Filtered` statuses" while waiting.

So a user looking at a step marked `Filtered` cannot tell whether it was deliberately skipped by a rule they wrote or is simply pending. The word carries an implication of *decision* that is false in the majority of cases where it appears. This is a genuine content-design defect in a state model that is otherwise unusually careful, and it is the single most transferable negative finding in this file: **a state name borrowed from one mechanism became the catch-all for "not yet", and the borrowed connotation is wrong.**

### The unsuccessful-status disambiguation is an artefact in its own right

The troubleshooting article opens by separating five look-alike failures, and leads with a disclaimer `[documented]`:

> "If a Zap run is unsuccessful, that does not necessarily mean there is an issue."

Then:

- **`Errored`** — "The run encountered an issue and did not complete. If a Zap errors repeatedly, it will automatically turn off."
- **`Safely halted`** — "The run purposely stopped, usually because a search step found no results. Unlike errors, safely halted runs will not turn off your Zap."
- **`On hold`** — "The run is paused, typically due to a disconnected app, reaching your task limit, or flood protection."
- **`Handled error`** — "A step errored, but a custom error handler ran an alternative workflow. The Zap will not turn off automatically."
- **`Scheduled`** — "The run errored but Autoreplay is enabled, so Zapier will automatically retry it."

Each entry states the **consequence for the Zap's on/off state**, because that is the thing the user actually fears. Three of the five explicitly say the Zap will *not* turn off. The disambiguation is organised around the user's anxiety, not around the taxonomy.

### `Safely halted` is the best-named state in the corpus

Two words carrying three claims: the run stopped (`halted`), it stopped on purpose (`safely`), and nothing is wrong (`safely` again). It names the case where a search found no match — a non-event that would otherwise read as failure. Contrast with `Errored`, which shares the same hand icon as `Handled error` but has opposite consequences.

**Icon collisions are worth recording**: `Delayed`, `Safely halted` and `Scheduled` all use the *clock icon*; `Errored` and `Handled error` both use the *hand icon*. Five of eleven statuses share icons with a peer that has materially different consequences. `Needs review` uses a *thumbs up* icon for a state meaning "blocked pending human approval", which is semantically backwards — thumbs-up conventionally signals approval granted, not approval required.

### Deletion semantics are derived from status

`[documented]`, and this is a good piece of consequence-mapping:

> "If you see a `Running`, `Needs review`, `On hold`, `Delayed`, or `Scheduled` status, the the Zap has not finished running the action yet. Deleting the Zap run prevents the Zap from finishing the run. It also deletes the record of the run.
> For all other statuses, the Zap finished running the action. Deleting the Zap run only removes the record of the run. **It will not undo the action.**"

The eleven states are partitioned into two consequence classes for one destructive operation, and the final sentence pre-empts the exact wrong assumption. (The doubled `the the` is Zapier's.)

### Zap-level lifecycle states

`[documented]` from elsewhere: a Zap is `on` / `off` / `paused`; it can be a `draft` before publication, has `Versions` you can `Compare`, and can be `automatically turned off`. Task-level states: tasks are `held` when a limit is hit. Apps are `connected` / `disconnected` / need to be `reconnected`, and can be `deprecated`.

## T7 Error, failure & recovery

**PRIORITY SECTION.** The richest failure-content set in this batch.

### The recovery vocabulary is three named, distinct mechanisms

| Term | Definition (verbatim or close) | Who acts |
|---|---|---|
| `Replay` | Manually re-run failed or held Zap runs or steps | User |
| `Autoreplay` | "Zapier will retry any Zap steps that fail due to temporary errors or downtime. Autoreplay will retry the step again immediately, and then a few more times if there is still an issue." | System, opt-in, Pro+ |
| `Custom error handling` / `error handler path` | "set up an alternative workflow that runs when a step fails" | User-authored branch |

Three recovery models — manual, automatic, and user-authored-alternative — each with its own name, its own plan gating, and its own run status (`Scheduled` for autoreplay, `Handled error` for the error path). **Naming the retry, the auto-retry, and the fallback branch separately** is the structural decision that makes the rest of the failure content legible.

`Autoreplay` is also documented as an **account-wide setting with a per-Zap override**, and the override rules differ by plan: "Only admins and owners can enable this feature for all Zap workflows in the account. Any member can override the Autoreplay setting for the account by enabling autoreplay for individual Zap workflows."

### The auto-shutoff policy — the highest-stakes failure copy in the product

`[documented]`, and it is stated with different precision in two articles.

`Zap is not running` gives two conditions: "Zapier will automatically turn off your Zap if it: Errors 95% of the time it runs. Has run more than 20 times in the past 7 days."

`How to troubleshoot errors` gives one: "Your Zap will automatically turn off if 95% of its runs result in errors in the last 7 days."

**The 20-run minimum threshold is present in one article and absent from the other.** That threshold is the thing that stops a brand-new Zap from being killed by its first two failures, so its omission materially changes what a reader believes.

Grace periods are stated identically in both: "Enterprise plan accounts have a 72-hour grace period and Team plan accounts have a 24-hour grace period", with email to the account owner. **Free and Professional accounts get no grace period and no email, and neither article says so directly** — it is inferable only from the plan list.

### Six named causes of `On hold`, each paired with its fix

`[documented]`, from the held-runs article. The structure is a `Causes` list followed by a `How to fix it` section with one `###` heading per cause, in the same order:

| Cause (verbatim bold label) | Definition | Fix (verbatim) |
|---|---|---|
| `Too much data` | "when Zapier checked for new data, too many steps (100+) were triggered. This is called 'flood protection' and prevents your Zap from accidentally using a large number of tasks." | "Use a delay after queue action to run tasks at a slower pace." |
| `Disconnected app` | "one of the app accounts used in the Zap is disconnected" | Reconnect, then replay |
| `Task limit reached` | account hit its task limit, or used an unavailable premium app | Upgrade, then replay |
| `Payment issue` | "the payment information on the account expired and must be updated" | Update payment method, then replay |
| `App access policy` | admin restricted the app; three named sub-cases | Ask admin; then replay |
| `Step limit reached` | "the Zap has more than 100 steps" | "Split your workflow into 2 or more Zap workflows." |

**`flood protection` is a coined term for a protective failure**, and the definition explains the protection in the user's own economic terms — "prevents your Zap from accidentally using a large number of tasks". A limit presented as a safeguard on the user's wallet rather than on Zapier's infrastructure. Whether or not that is the real motivation, it is the right frame.

**The cause/fix mirroring is the transferable structure**: every cause in the diagnostic list has a same-named heading in the remedial list, in the same order, so a user who identifies their cause can jump straight to the matching fix. Five of the six fixes end with the same clause — "then replay your held Zap run" — which reinforces `Replay` as the universal recovery verb.

The `App access policy` fix is further split into three conditional branches by policy type (`restricted apps (open policy)`, `allowed apps (closed policy)`, `admin recently switched policies`), each with its own "Ask your account owner or admin to…" instruction. Naming the two policy models and the transition state between them, and giving a distinct remedy for each, is thorough in a way most help content is not.

### HTTP status codes rendered as user-facing content

`[documented]`. Seven codes, each with three fixed sub-headings — `Definition`, `Possible causes`, `Suggested next steps`:

| Code | Definition (verbatim) |
|---|---|
| `400 - Bad Request` | "The server could not understand the request due to invalid syntax." |
| `401 - Unauthorized` | "The request lacks valid authentication credentials." |
| `403 - Forbidden` | "The server understood the request but refused to fulfill it." |
| `404 - Not Found` | "The server couldn't find the resource you requested." |
| `422 - Unprocessable Entity` | "The request was well-formatted but contained errors that prevented the server from fulfilling it." |
| `429 - Too Many Requests` | "The user has sent too many requests in a short period." |
| `500 - Internal Server` | "The server encountered an unexpected condition that prevented it from fulfilling the request." |

The `Possible causes` entries are the valuable part because they translate protocol semantics into user situations: 401 — "your access token has expired or been revoked, you changed your password in the app, or the app enforces a session policy that periodically invalidates connections"; 403 — "your app account has insufficient permission... For example, you cannot edit a record if you have view-only access"; 404 — "you are trying to find a record that does not exist in the app".

The 500 remediation branches on frequency, which is the correct diagnostic question: "If the error only happened once or a few times, it is likely a temporary issue... If the error occurs on every run, check for ongoing issues" — then routes to *three* status sources in order: Zapier's status page, the connected app's own status page, then Zapier Support. **Telling the user to check the third party's status page before contacting you** is honest and reduces mis-routed tickets.

`500 - Internal Server` is a truncated name — the code is "Internal Server Error". Minor, but it is a heading.

**The non-coded failure is explicitly carved out** `[documented]`: "Not all errors include an HTTP status code. If your Zap fails with a 'timed out' message, the app took too long to respond to Zapier's request." Routed to two articles whose titles quote the literal strings: `Error: The app did not respond in time` and `Error: Soft timeout limit reached`. Prefixing a help title with `Error:` and then the verbatim string is the right pattern for searchability.

### The failure-article index is organised by when the failure happens

`[documented]`. Two named groups:

**`Common errors while building your Zap`** — five, each with a bolded plain-language label then the article title: `Trigger test fails` · `Cannot publish your Zap` · `Fields are missing or will not load` · `Field will not accept your data` · `Throttling in the editor`.

**`Common issues while your Zap is running`** — seven: `Zap is not triggering` · `Zap is missing some runs` · `Zap is not sending data` · `Zap is creating duplicate data` · `Dates or times are incorrect` · `Zap is stuck in a loop` · `Zap is running slower than expected`.

Splitting by **build-time versus run-time** is the correct axis for an automation product, because the two have completely different diagnostic paths and completely different user emotional states. And the run-time titles are all in the **user's declarative voice describing observed behaviour** — `Zap is creating duplicate data`, `Zap is stuck in a loop` — rather than in system-object voice. That is the Wise "first-person confession" pattern shifted one step: not `I did X wrong` but `the thing is doing X`, which is right here because the user did not cause it.

`Zap is stuck in a loop` is the best of them. It names a failure mode that only exists in automation, in five words, in the words a user would type.

### AI troubleshooting is a named, in-product surface

`[documented]`: "You can identify and troubleshoot errored runs using AI-powered troubleshooting in your Zap history or the Zap editor. This feature explains the issue and provides step-by-step instructions to resolve it." Reached via a `Troubleshoot` tab beside a `Logs` tab.

And the fallback advice is remarkable `[documented]`: "**If you cannot read the log, copy and paste it into an AI tool.** Then, ask the AI to explain the potential causes for your app's error response." A vendor telling users to take its error output to a third-party AI because its own log is not comprehensible. Honest; also an admission.

**Outage notification** `[documented]`: "If an outage affects an app used in your Zap, a notification will appear in the affected step. The app's team typically resolves these outages. Contact the app directly for more information or support." In-context, at the failing step, with third-party attribution.

**`Still need help?` closes both troubleshooting articles** with four routes in a fixed order: Community → more articles → app-specific docs → "Think you found a bug? Report it to Zapier Support." Human support is last, and the bug-report route is phrased as the user's hypothesis rather than as a certainty.

## T8 Empty states

`[absent]` — no no-data, no-results, or first-run copy was reachable on public surfaces.

Three adjacent findings:

- **The one observed "nothing here" string is on the status page**: `We're not aware of any issues affecting our systems.` See T9.
- **`Safely halted` functions as an empty-state analogue in the run model** — it is what a search step reports when it finds nothing. Zapier's decision to treat "no results" as a *named non-failure state* rather than as an error is the conceptual equivalent of good empty-state design, applied to a machine-facing surface.
- The help-centre calendar on the status page rendered the literal string `Loading...` beneath the `Calendar` heading in the served HTML.

## T9 Notifications & system messages

`[observed]` and `[documented]`

### Task-limit notification thresholds are published as a schedule

`[documented]`, from the task-usage article. This is the most precisely documented notification sequence in the batch:

**With pay-per-task billing on:**
- Email "once you reach the plan's task limit and start using pay-per-task billing"
- "When you reach 80% of the pay-per-task billing limit."
- "When you reach 100% of pay-per-task billing tasks, **equivalent to 3x your selected plan's task limit**."

**With pay-per-task billing off:**
- "When you reach 80% of your task limit."
- "When you reach 100% of your task limit."

Then the consequence: "Once you reach that limit, all other tasks will be held until the end of your billing cycle."

Publishing the **80% and 100% thresholds** and, critically, the fact that the pay-per-task ceiling is **3× the plan limit**, converts an open-ended overage into a bounded one. The `3x` figure is the single most useful number on the page for a buyer worried about runaway cost, and it appears only in the help centre, never on the pricing page.

The pricing FAQ gives the same policy in softer language `[observed]`: "But don't worry! When you reach your plan's task limit, we'll notify you via email." — the only `don't worry!` in the harvest, attached to a billing disclosure.

### Named alerting products and settings

`[observed]` from the pricing matrix: `Alerts` (marked `New`), `Customized error settings`, `Customized polling time`, `Flood protection settings`, `Observability API` (`New`), `Analytics` (`New`), `Log Streams`, `Audit log`. Enterprise accounts can "set up usage alerts to get notified when task usage exceeds a threshold you define."

### The status page

`[observed]`. The operational statement is a two-line pair:

> `We're fully operational`
> "We're not aware of any issues affecting our systems."

The second line **retracts the confidence of the first**. "Fully operational" is an assertion about the system; "we're not aware of any issues" is an assertion about Zapier's knowledge. Read together they say: as far as we know. This is either unusually honest or an accidental juxtaposition of a headline and a boilerplate subhead, and I cannot tell which — but the honest reading is available and worth noting as a pattern: *state your confidence level, not just your status.*

**Sixteen named components in five groups** `[observed]`:

| Group | Components |
|---|---|
| `Website` (3 components) | `Website` · `Login` · `Support` |
| `Zaps` (5 components) | `Instant Triggers` · `Polling Triggers` · `Searches & Writes` · `Zap Editor` · `Zap History` |
| (ungrouped) | `Tables` · `Canvas` · `Forms` · `Chatbots` · `Agents` · `MCP` · `Copilot` · `Developer Platform` |
| `Beta Products` (2 components) | `Functions` · `Lead Router` |

The `Zaps` decomposition is the notable one. Zapier does not report "Zaps: operational" — it reports separately on **instant triggers, polling triggers, and searches & writes**, which are the three mechanisms a Zap depends on and which fail independently. A user whose polling Zaps are late but whose webhook Zaps are fine can see that on the status page. Decomposing a status component along its actual failure boundaries, using the same coined vocabulary the product uses, is exactly right.

`Beta Products` as a **status group** is also good: it sets an expectation about reliability in the status taxonomy itself.

Uptime is shown per component (`100% uptime`) over a stated window (`Jun 2026-Sep 2026`), with a per-day calendar. Powered by incident.io.

### Site-wide promotional banner

`[observed]`: "Refound your company for the AI era at ZapConnect 2026. `Save your spot` →" — present at the very top of **every help-centre page**, including error-troubleshooting articles. A user whose automation has broken sees a conference advertisement above the fix.

## T10 Disclosures, legal & compliance

`[observed]` — commercial rather than regulatory.

### The `task` is the billing unit and its definition is the whole disclosure

**The canonical definition** `[observed]`, from the task-usage article's first line: "A task is any successful action that runs in Zapier. **Only successful actions count toward your task usage.**"

The glossary version: "A task is an action your Zap successfully completes."

The pricing FAQ version: "Tasks are used when a Zap successfully moves data or completes an action for you automatically... **If the action isn't successfully completed, it doesn't count against your task limit.**"

The word `successful` appears in all three. That single adjective is the entire commercial disclosure — it means failures are free — and Zapier restates it in every place the term is defined.

**What counts, published as prose and then as a table** `[observed]`: action steps; steps in an error handler path; previously successful steps re-run during a full replay; each action step inside a sub-Zap plus the `Call a Sub-Zap` and `Return From a Sub-Zap` steps; search actions set to "proceed if nothing found" (1 task) but not otherwise (0 tasks).

**What does not count** `[observed]`: all triggers; Filter or Paths steps; action steps that error or halt; steps that never ran; the `Start a Sub-Zap` trigger; Tables and Forms steps; and seven named built-in apps — `Formatter`, `Delay`, `Looping`, `Sub-Zap app`, `Digest`, `Zapier Manager`, `Storage`.

**Differential task rates for non-Zap products** `[observed]`: `AI by Zapier` — depends on model tier; `Code by Zapier` — 1 task standard runtime, more with extended runtime; `Zapier Lead Router` — **5 tasks per successful lead routed**; `Zapier MCP` — **2 tasks per successful tool call**, with "Failed tool calls do not count toward your task usage."

**The best disclosure on the site** is the polling explainer `[observed]`: "Zapier never charges you a task to check for new data—only when a Zap successfully completes an action for you." Followed by a worked arithmetic example, then: "If a Zap checks an app every two minutes, it will complete **over 20 thousand polls per month. Zapier does not charge for these events.**"

Quantifying the free thing — twenty thousand unbilled operations — is a rhetorically strong and materially informative move. It answers a fear ("am I being charged for checking?") with a number rather than a reassurance.

**A billing-display change is disclosed with an anti-misreading warning** `[observed]`:

> "Starting July 21, 2026, Lead Router usage shows up on the Task Usage and Zap History pages, attributed to the Zap that triggered it. Before this date, Lead Router usage did not appear on these pages, even though it still counted toward your task usage at the rate listed above.
> If you check a date range that spans July 21, 2026, a Zap that uses Lead Router might show a sudden jump in tasks. **This jump means Zapier started displaying that usage, not that you used more tasks.**"

This is exemplary. Zapier admits it was billing for something it was not showing, states the date the display changed, predicts the exact confusion the change will cause, and pre-empts it in one sentence. **Pre-empting the misreading of your own data change** is a genuinely rare disclosure pattern.

### Pricing disclosures

`[observed]`

- Plan prices: `Free` `$0/month`; `Professional` "Starting from `$19.99/month`"; `Team` "Starting from `$69/month`"; `Enterprise` `Contact for pricing`. "Starting from" is doing necessary work because price varies with the selected task tier.
- **Eighteen selectable task tiers** from `100 tasks /mo` to `2M tasks /mo`, plus `Custom task limit`, driven by a slider labelled `How many tasks do you need?`.
- `Pay monthly` / `Pay yearly (Save 33%)` toggle. Twenty currencies.
- `Seats`: `1` / `1` / `25` / `Unlimited` across Free / Professional / Team / Enterprise. Note the Professional card's key features say `25 users` under **Team**, and the matrix gives Professional `1` seat — consistent, but a reader skimming the cards could easily miss that Professional is single-seat.
- `Polling time`: `15 min` / `2 min` / `1 min` / `1 min`. A latency figure as a plan differentiator, stated plainly.
- `Code by Zapier` runtime as a plan differentiator: `1 second` / `30 seconds` / `30 seconds` / `2 minutes` included runtime per step.
- Storage caps: Tables records `2,500 per account` / `100,000` / `500,000` / `Contact Sales`; Forms pages `10 per account` / `50` / `150`; file uploads `5 MB at 3 files max` / `10 MB at 100 files max` / `25 MB at 100 files max` / `25 MB+`.
- **Asterisked footnotes**: "`**` Live Chat is included starting at the Professional 2,000 task tier plan and up." and "`***` Technical Account Managers are included at a set threshold or as an optional add-on." The first is a real bounding of a headline plan benefit — live chat is listed as a Professional key feature but is gated at a task tier *within* Professional.
- `Zapier Copilot*` on the Free card carries a single asterisk with **no visible corresponding footnote**.

### Cancellation, refund and change-of-plan

`[observed]`, from the FAQ:

- `Can I change my plan later?` — "Yes, you can upgrade or downgrade at any time. If you upgrade, the change happens immediately, and you'll only pay a prorated amount for the rest of the billing cycle. If you choose to downgrade, it'll take effect at the end of that billing cycle." Asymmetry stated plainly: upgrades immediate, downgrades deferred.
- `What if I decide to cancel?` — "If you no longer wish to use Zapier, you may cancel at any time. You'll still have access to your paid plan for the remainder of your billing cycle. See our refund policy here." **No refund terms on the page**; deferred to a link.
- `Do you offer any discounts?` — annual pre-pay discount, plus "We also offer non-profits a 15% discount on any paid plan (excluding any pay-per-task charges)." The exclusion is stated inline, in parentheses, which is the right place for it.
- `Can I pay via invoice or wire transfer?` — "on the latest annual Team or Enterprise plan". The word `latest` implies grandfathered plans are excluded and is not explained.
- `What happens if I hit my task limit?` — the fullest overage disclosure: emails at close-to-limit and at-limit; auto-switch to pay-per-task if enabled; "Pay-per-task billing is charged at a **higher per-task rate** than your base subscription tasks"; then a second warning cycle at the maximum; then "your Zap workflows will pause until the start of your next usage period." If pay-per-task is off, "your Zap workflows will pause once you reach your plan's task limit".

**The verb is `pause`, not `stop` or `disable`.** A reversible word for an automatic commercial cut-off, which is accurate (it resumes at cycle reset) and reassuring.

### Reliability and AI disclosures

`[observed]`, from the Agents FAQ — and this is unusual:

> `Why don't I get the same outcome from AI every time?`
> "That's because of non-determinism—what makes LLMs different from computers, which will do the same thing every single time."

A vendor publishing, in its pricing FAQ, that its AI product **will not behave identically on identical input**, with the technical term named and glossed by contrast. Also: `How do I improve the reliability of agents?` routed to prompt-writing tips, and `What app actions can agents perform on my behalf?` — "Zapier Agents can only take actions in the apps you've connected and use the triggers and actions you've set up." A capability-bounding statement for an autonomous agent, given as an FAQ answer.

`Can I use Agents with my Zapier Enterprise account?` — "Zapier Agents doesn't currently support app and action restrictions that may be in place on an Enterprise account." **Disclosing that the AI product bypasses the enterprise governance controls sold on the same page.** Honest to the point of self-harm, and correct.

### Other

`Is Zapier MCP secure?` — "Yes, MCP endpoints include built-in authentication for secure, reliable connections." A one-word-plus-one-sentence security answer that asserts rather than evidences.

`Zapier SDK is free while in beta. We'll notify you before the beta ends, and before any changes to pricing or task usage take effect.` — a forward commitment about future pricing notice, which is a small, cheap, credible promise.

Footer legal is two links only: `Legal` and `Privacy`, plus `Manage cookies`. No accessibility statement, no terms link in the marketing footer (the status page footer has `Terms of service`).

## T11 Help-centre architecture

`[observed]` — fully readable, Zendesk-hosted.

**Three-level hierarchy**: Category → Section → Article, reflected exactly in the breadcrumb (`Zapier` → `Zap workflows` → `Troubleshoot Zap workflows` → article).

**Twelve categories, each with a scope sentence** — reproduced in full in T1. The scope sentences are the strongest element: every one is an imperative addressed to the user, and every one names both the object and the purpose. A user can self-route without opening anything.

**Sections observed** `[documented]`: `Intro to Zapier` (under Getting started) · `Zap history` · `Troubleshoot Zap workflows` (both under Zap workflows) · `Billing` (under Your Zapier account) · `Code` (under Zapier tools).

### Article-title grammar — five shapes

| Shape | Examples |
|---|---|
| `How to <verb>…` | `How to troubleshoot errors in Zap workflows` · `How to troubleshoot held Zap or step runs` |
| `<Verb> …` (imperative) | `Review run statuses in Zap workflows` · `Learn key concepts in Zap workflows` · `Replay failed Zap runs` · `Set up custom error handling` · `Test Zap steps` · `Manage your app connections` · `Create Zap drafts and versions` |
| `<Subject> is <state>` (user's observed symptom) | `Zap is not running` · `Zap is not triggering` · `Zap is not sending data` · `Zap is creating duplicate data` · `Zap is stuck in a loop` · `Zap is running slower than expected` · `Zap is triggering but missed some runs` · `Zap trigger test fails` · `Zap dates or times are incorrect` · `Zap field will not accept your data` |
| `What is X?` | `What is a premium app` · `What is replay` |
| `Error: <literal string>` / `Fix "<literal string>"` | `Error: The app did not respond in time` · `Error: Soft timeout limit reached` · `Fix "Required field is empty" errors in Zap workflows` · `Fix "Throttled by Zapier" or "Zapier has blocked this task" errors` |

**The third shape is the distinctive one.** Ten articles titled `Zap is <symptom>` — declarative, present tense, describing the object's misbehaviour from the user's point of view. Not "Troubleshooting trigger failures" but `Zap is not triggering`. This is the closest analogue in the corpus to Wise's first-person confession titles, adapted correctly for a context where the *system* misbehaves rather than the user: the subject is the Zap, not the user, so there is no implied blame in either direction.

**The fifth shape quotes the literal error string in the title**, in quotation marks — `Fix "Throttled by Zapier" or "Zapier has blocked this task" errors`. That title serves two different in-product strings in one article and quotes both. For a user pasting an error into search, this is optimal.

### Content furniture is consistent and named

Every article carries: `Updated <date> <time>` (to the minute, e.g. "Updated May 29, 2026 18:20"); labelled callout boxes — `Note` (eye icon), `Tip`, and inline **`Available on plans:`** grids showing plan eligibility as ticks and crosses; `Was this article helpful?` with `Yes` / `No` and a **public vote count** ("269 out of 870 found this helpful"); and for troubleshooting articles a `Still need help?` block.

**Publishing the raw helpfulness ratio is a real editorial decision.** The main error-troubleshooting article shows `269 out of 870 found this helpful` — a 31% success rate, displayed publicly, on Zapier's flagship error article. `Zap is not running` shows `33 out of 179` (18%). `How to troubleshoot held Zap or step runs` shows `1 out of 8`. By contrast the glossary article shows `194 out of 229` (85%) and the task-usage article `179 out of 276` (65%).

That is a **self-published content-quality signal**, and it says something clear: Zapier's explanatory content performs well and its troubleshooting content performs badly. A content team could not ask for a cleaner diagnostic, and very few organisations would leave it on the page.

**The `Available on plans:` inline grid** is a good pattern — plan eligibility shown at the point of the instruction rather than sending the reader to the pricing page. The grey X and green checkmark images carry alt text `A grey X` and `A green checkmark`, which is descriptive of appearance but not of meaning; a screen-reader user hears "A grey X, Free, A green checkmark, Professional" with no semantic anchor.

### Defects in the help IA

**Article renames have left stale slugs and stale internal links.** Three of the ten pages fetched redirected from an older title:

| Requested slug | Resolved title |
|---|---|
| `…-Types-of-Zap-runs` | `Learn key concepts in Zap workflows` |
| `…-Review-run-statuses-in-Zaps` | `Review run statuses in Zap workflows` |
| `…-Learn-about-tasks-in-Zapier` | `How is task usage measured in Zapier?` |

Worse, the run-statuses article **links to its own old title from inside itself**: in the `Deleting Zap runs` section, the word `status` links to `…20505304170637-Review-Zap-run-statuses` — the pre-rename slug of the very page the reader is on. And the held-runs article links to `…20505304170637-Review-Zap-run-statuses#h_...`, also the old title.

**Two generations of help URL coexist and are both linked from current articles.** Alongside `help.zapier.com/hc/en-us/articles/<id>-<slug>`, current articles link to the retired `zapier.com/help/...` scheme: `zapier.com/help/manage/tasks/view-and-manage-your-zap-history`, `zapier.com/help/manage/tasks/replay-failed-tasks-in-zaps#manually-replay-failed-tasks`, `zapier.com/help/manage/app-accounts/manage-your-connected-app-accounts#reconnect-your-app-accounts`, `zapier.com/help/paths/`, `zapier.com/help/doc/build-reusable-sub-zaps`. At least six such links appear across three of the ten pages harvested.

**Two links contain literal URL-encoded spaces in the slug**: `…/sections/14037787600653-Troubleshoot-Zap%20workflows` appears twice in the error article, where the canonical breadcrumb slug is `Troubleshoot-Zap-workflows`.

`My Requests` and `Contact Support` are each rendered twice in the help header DOM.

## T12 FAQs

`[observed]` — one very large block on the pricing page, organised into **seven named sub-groups**, which is itself the notable structure.

### Group 1 — `Zapier overview` (8 questions)

| # | Question (verbatim) |
|---|---|
| 1 | Do I need to know how to code? |
| 2 | What are apps? |
| 3 | What is a Zap? |
| 4 | What are tasks? |
| 5 | What is a trigger? |
| 6 | What's the difference between Zap workflows, triggers, actions, and tasks? |
| 7 | Does checking (or polling) for new data use tasks? |
| 8 | How many tasks do I need? |
| 9 | What happens if I hit my task limit? |
| 10 | Will I be charged a task for any of Zapier's built-in data tools? |
| 11 | How many connections does Zapier support? |

**Q1 is `Do I need to know how to code?` and the answer begins `Nope!`** — a one-word colloquial negation as the first word of the first FAQ answer on the pricing page. It addresses the single largest objection to a no-code product before any commercial question, and the register signals the answer before the sentence does.

Q3–Q6 are a **glossary embedded in a pricing FAQ**, and Q6 is an explicit four-way disambiguation. Placing the vocabulary lesson inside the pricing FAQ is necessary here because the billing unit (`task`) is only definable in terms of the other three concepts.

Q7 (`Does checking (or polling) for new data use tasks?`) puts the technical term in parentheses after the plain one — *checking (or polling)* — teaching the jargon while leading with the plain word. A small, reusable move.

### Group 2 — `Tables` (2), Group 3 — `Forms` (2)

Both pairs have the identical shape: `How can I try X?` then `How is X different from other options out there?`. Two products, one template. `…different from other options out there?` is a competitor question the vendor asks itself, phrased colloquially.

### Group 4 — `MCP` (3), Group 5 — `SDK` (2)

`What is Zapier MCP?` · `How much does Zapier MCP cost?` · `Is Zapier MCP secure?` — the definition/price/safety triad for a new product. `What is Zapier SDK?` · `How much does Zapier SDK cost?`

### Group 6 — `Plans and payment` (8)

`Should I use the Team or Enterprise plan?` · `Which plans allow for unlimited users?` · `Do you have a free trial of your premium features?` · `Can I change my plan later?` · `What if I decide to cancel?` · `Do you offer any discounts?` · `Can you charge me in my local currency?` · `Can I pay via invoice or wire transfer?`

Q1 is written as the **buyer's decision**, not as a feature comparison — `Should I use the Team or Enterprise plan?` — and the answer is a two-paragraph comparison that leads with what each plan is *for* rather than what it contains.

### Group 7 — `Sales and support` (3)

`Do you have a Sales team?` · `What level of support do Team and Enterprise plans get?` · `What if I have more questions?`

`What if I have more questions?` is the catch-all, placed last, routing to search first and human help second.

### Separate FAQ sets for Agents and Chatbots

**`Agents FAQs`** (7): `What is an activity?` · `How are activities counted for Zapier Team accounts?` · `Can I use Agents with my Zapier Enterprise account?` · `How do I improve the reliability of agents?` · `Why don't I get the same outcome from AI every time?` · `What app actions can agents perform on my behalf?` · `How can I get access to Agents?` · `How can I provide feedback or report bugs?`

**`Chatbots FAQs`** (4): `How can I try Chatbots?` · `How is Chatbots different from other options out there?` · `Is Chatbots included for free in my paid Zapier plan?` · `Are you adding new functionality?`

`Are you adding new functionality?` answered with "We are heavily investing in Chatbots and we're excited to build new functionality to support your needs" is a roadmap non-answer, and it is the weakest FAQ entry on the page.

**Structural observation.** Roughly 35 questions on one pricing page, grouped seven ways, with three of the groups following an identical two-question template. The grouping is what makes it navigable — an ungrouped 35-question accordion would be unusable. The first group does double duty as the product glossary, which is the design decision that makes the rest of the pricing page comprehensible.

## T13 Terminology & glossary

**PRIORITY SECTION.** Zapier publishes a formal glossary article (`Learn key concepts in Zap workflows`, 18 terms) as the first article in `Getting started`, and repeats a subset in the pricing FAQ.

| Term | Zapier's definition (verbatim or close) | The alternative it rejected |
|---|---|---|
| **`Zap`** | "an automated workflow that connects your apps and services together. Each Zap consists of a trigger and one or more actions." | "workflow", "automation", "recipe", "integration". A coined, capitalised, monosyllabic noun that is also a verb in common speech ("zap") |
| **`Zap workflow`** | The **current** form. Category, article titles and nav all now say "Zap workflows" | `Zap` alone — see the rename note below |
| **`Trigger`** | "an event that starts a Zap" | "when", "condition", "event source" |
| **`Action`** | "an event a Zap performs after it is triggered" | "then", "task", "step" |
| **`Step`** | Not separately defined in the glossary, but used throughout as the unit in the `Zap outline` | |
| **`Task`** | "an action your Zap successfully completes" — **the billing unit** | "run", "execution", "operation". Critically, a task is *not* a Zap run |
| **`Zap run`** | "each instance of a Zap being triggered and performing the action step(s) in the Zap" | "execution". One Zap run can consume many tasks, or none |
| **`Filter`** | "can be added to any Zap to restrict it to run only when certain conditions are met" | "condition", "if" |
| **`Paths`** | "let you build advanced workflows to perform different actions based on different conditions. Paths use conditional, if/then logic" | "branches", "switch". **Plural as a product name** |
| **`Multi-step Zap`** | "If the Zap has more than one action, or includes filters or searches, it is considered a multi-step Zap" | |
| **`Polling interval`** | "the frequency that Zapier will check your trigger apps for new data" | "refresh rate", "sync frequency" |
| **`Instant`** | A **trigger label**: "Triggers labeled *Instant* will always trigger Zap workflows immediately... The trigger app will push the data to Zapier" | "webhook trigger", "push trigger" — `Instant` names the user-visible consequence, not the mechanism |
| **`Test record`** | "Zapier will attempt to find some existing data from your trigger app to use in the Zap" | "sample data" |
| **`Zap editor`** / **`Zap outline`** / **`Zap history`** | The three named surfaces | |
| **`Asset`** | "The building blocks, like specific Zap workflows, Tables, and Forms, that make up your automation" — with a published product→asset table | An umbrella noun for the cross-product object model |
| **`Autoreplay`** | Automatic retry of steps that fail on temporary errors | "auto-retry" |
| **`Replay`** | Manual re-run of a failed or held run | "retry", "resend" |
| **`Premium app`** | Apps gated to paid plans | "paid integration" |
| **`Alpha`** / **`Beta`** | Both formally defined **in the glossary**, with Beta split into `Open` ("available to all Zapier users") and `Closed` ("only available to members of Zapier's Early Access program") | Left undefined by most products |
| **`Zapier tools`** | The built-in non-app steps: "Manipulate data coming in and out of your apps. Use AI to automate your work. Control how your workflows run. Store data." | "utilities", "internal apps" |
| **`Formatter` / `Delay` / `Looping` / `Digest` / `Storage` / `Sub-Zap` / `Zapier Manager`** | The seven named built-in apps, all zero-task | |
| **`Sub-Zap`** | A callable Zap, with `Start a Sub-Zap` / `Call a Sub-Zap` / `Return From a Sub-Zap` as named step types | Function / subroutine — Zapier ships a **function-call abstraction** and names it after its own primitive |
| **`flood protection`** | Held runs when "too many steps (100+) were triggered" — "prevents your Zap from accidentally using a large number of tasks" | "rate limiting", "throttling" (though `Throttled by Zapier` also exists as a literal error string) |
| **`error handler path`** | A user-authored branch that runs when a step fails | "catch block", "fallback" |
| **`Error ratio override`** | The setting that stops auto-shutoff | |
| **`Human in the Loop`** | A step type requiring human approval, with its own `Needs review` status | "approval step" |
| **`activity`** | The **Agents** billing unit, deliberately distinct from `task`: "Activities include actions your agent takes in behaviors or in chat, browsing the web, or looking up information from attached knowledge" | Reusing `task` |
| **`behaviors`** | The Agents unit of configured work — "Run automated behaviors up to 400 times per month" | "automations", "rules" |
| **`Copilot`** / **`Canvas`** / **`Tables`** / **`Forms`** / **`Agents`** / **`Chatbots`** / **`MCP`** / **`SDK`** / **`Lead Router`** / **`Functions`** | The product portfolio, each a common noun except MCP and SDK | |

### The four-term core model, and why it works

`Zap` = `Trigger` + one or more `Action`s; each successful Action = one `Task`; each firing = one `Zap run`.

The reason this teaches well to non-programmers is that **each term is a different part of speech relative to the user's mental model**: the Zap is the *thing you make*, the trigger is *what happens to you*, the action is *what it does for you*, the task is *what you pay for*. Four concepts, four distinct roles, no overlap. The pricing FAQ's Q6 exists precisely to lock that down.

`Task` is the subtle one and Zapier knows it. It is the only term in the set that is simultaneously a technical concept and a commercial one, and it is the only term defined identically in three separate places.

### The rename in progress: `Zap` → `Zap workflow`

This is the live terminology story. The glossary still defines `Zap` as the primary noun. But:

- The help category is `Zap workflows`, not `Zaps`.
- Article titles say `Zap workflows`: `Learn key concepts in Zap workflows`, `Review run statuses in Zap workflows`, `How to troubleshoot errors in Zap workflows`, `Troubleshoot Zap workflows`.
- The nav product is `Zap workflows` — "Do-it-yourself automation for workflows".
- But the shorter form persists everywhere in body copy and in every UI label documented: `Zap run`, `Zap history`, `Zap editor`, `Zap outline`, `Multi-step Zap`, `Sub-Zap`, `What is a Zap?`.
- And the `Asset` table states the collision explicitly in two cells: **Product = `Zap workflows`, Asset = `A Zap.`**

Also visible: plural forms are inconsistent. `Zap workflows` is used as the plural of `Zap workflow`, but body copy repeatedly writes `all Zap workflows in your account` where `all your Zaps` would once have appeared, and one sentence reads "your Zap workflows will never enter a grace period" — a plural construction applied to what is conceptually a single Zap's setting.

The rename is defensible — `Zap` alone is opaque to a first-time visitor and unsearchable — but it is mid-flight, and the glossary defining `Zap` while every title says `Zap workflow` means the canonical vocabulary article is already out of step with the IA around it.

### Status-name capitalisation drift

Within the run-statuses article itself, the canonical status is `Successful`, defined with a heading and an icon. But the `Additional Info` section at the foot of the same article says: "the path and the Zap will both have **Success** statuses" and "the Zap will have a **Success** status". `Success` is not one of the eleven defined statuses. Two names for one state, in one article, roughly 2,000 words apart.

## T14 Voice, tone & accessibility

`[observed]`

**Person and tense.** Second person for the user, first-person plural for Zapier, and the plural is used freely in commercial and failure copy alike: "we'll notify you via email", "Zapier will email you", "We'll email you when you're close", "we'll switch you to pay-per-task billing", "We are heavily investing in Chatbots". Zapier stays a visible actor when it is about to charge you more, which is the right place for it.

**Register is plain, direct, and occasionally colloquial in exactly two contexts** — the pricing FAQ and the marketing pages. `Nope!` · `But don't worry!` · `Yes!` · `different from other options out there` · `AI automation 🪄`. The help centre, by contrast, is flat and instructional throughout, with zero exclamation marks and no jokes across five long articles. **The tone gradient here is cleaner than DocuSign's or Dropbox Sign's**: colloquial where the user is evaluating, flat where the user is broken.

**The one place the gradient fails** is `But don't worry!` — it sits inside the answer to `How many tasks do I need?`, immediately before the explanation of overage billing. Reassurance immediately preceding a cost disclosure is the wrong order; the reassurance should follow the disclosure or not appear.

**Sentence case is used consistently for headings.** `Review run statuses in Zap workflows`, `How to troubleshoot held Zap or step runs`, `What happens if you do not fix an error`, `Still need help?`. Title Case appears only in product names and status names.

**Contractions are used in marketing and FAQ copy but avoided in help-centre procedural text**: the help articles write "do not", "will not", "does not" almost without exception ("if you do not fix an error", "the Zap will not turn off", "these polls never use tasks"), while the FAQ writes "you'll", "we'll", "don't", "isn't". A register split applied by surface rather than by sentence — deliberate, and correct, since expanded negatives are less likely to be misread in instructions.

**Numbers are specific and load-bearing**: `9,000+ apps`, `3 million+ businesses`, `100 tasks per month`, `95%`, `20 times in the past 7 days`, `72-hour` and `24-hour` grace periods, `100+` steps for flood protection, `over 20 thousand polls per month`, `3x your selected plan's task limit`, `5 tasks per successful lead routed`, `2 tasks per successful tool call`. Nearly every number is attached to a consequence rather than to a boast.

**Accessibility content** `[observed]`

- `Skip to content` on marketing pages, `Skip to main content` on help pages — **two labels for one control across two properties**.
- Help-centre icon alt text is descriptive of *appearance*, not meaning: `miscEye icon`, `miscHand`, `miscClock`, `statusPaused`, `statusFilter`, `statusPlaying`, `statusAppApproval`, `formCheck`, `alertInfo`, `Nav: cog`, `A grey X`, `A green checkmark`. These are **internal design-system token names leaked as alt text**. A screen-reader user hears "misc eye icon Note" and "stat us paused" rather than anything meaningful. In the run-statuses article, where the icon is a primary carrier of the status's identity, this is a real failure: the article explains that `Errored` "displays a hand icon" and then renders that icon with the alt text `miscHand`.
- Screenshot alt text, by contrast, is genuinely good and consistently constructed: "Zap run in the Zap editor displaying a delayed status." · "Step run in the Zap editor outline displaying an on hold status." · "Conditional logic setup in Filter step" · "Apps available in Zapier's app directory" · "Example outage notification in a Slack step displayed in the Zap editor". Each names the surface, the object, and the state.
- **But one is wrong.** In the `Handled error` section, the step-run screenshot carries the alt text "Step run in the Zap editor outline displaying **a filtered status**" — copied from the `Filtered` section and not updated. A screen-reader user reading the `Handled error` documentation is told the image shows a filtered status.
- `AI automation 🪄` places an emoji inside a navigation link label.
- **No accessibility statement, VPAT, or conformance claim was found** on any reachable Zapier surface. The footer carries only `Legal` and `Privacy`. `[absent]`
- The site offers four languages (DE, EN, ES, FR, JA — five including Japanese) but the help centre is `/hc/en-us` only in everything harvested.

**Negative findings, recorded honestly**

1. `over 8,000 apps` in the help centre's `Apps` category description vs `9,000+ apps` everywhere else.
2. `Filtered` is overloaded: it means both "a Filter stopped this deliberately" and "this step has not run yet" (used as the downstream placeholder for `Delayed`, `On hold`, `Needs review`, and `Running`).
3. `Success` used twice in the run-statuses article for the status canonically named `Successful`.
4. Status list is alphabetical except `On hold` precedes `Needs review`.
5. Five of eleven statuses share icons with a peer of different consequence (clock: `Delayed`/`Safely halted`/`Scheduled`; hand: `Errored`/`Handled error`).
6. `Needs review` uses a thumbs-up icon for a blocked-pending-approval state.
7. Auto-shutoff is documented with two conditions in one article and one condition in another; the 20-run minimum is missing from the troubleshooting article.
8. Three articles resolved from older slugs; the run-statuses article links to **its own** pre-rename slug from within itself.
9. At least six links to the retired `zapier.com/help/...` URL scheme from current articles.
10. Two links contain a literal `%20` in the section slug (`Troubleshoot-Zap%20workflows`).
11. `Zap` vs `Zap workflow` rename is mid-flight; the `Asset` table states "Zap workflows | A Zap."
12. `Try it free` used nine times on the pricing page across six different products and price points.
13. `Contact sales` and `Contact Sales` both on the pricing page.
14. `See all plan features` and `Compare all features` are two labels for one anchor.
15. `Zapier Copilot*` on the Free card has an asterisk with no visible footnote.
16. `500 - Internal Server` — the heading truncates "Internal Server Error".
17. Typos in the run-statuses article: "the **the** Zap has not finished", "they will **have have** new statuses", "if **alls** steps have `Successful` statuses".
18. Typo in the glossary: "a sidebar will open **one** the right".
19. Missing space in the held-runs article: "premium app](link)**that** is not available".
20. Icon alt text exposes design-token names (`miscEye icon`, `statusAppApproval`, `formCheck`).
21. The `Handled error` screenshot's alt text says "displaying a filtered status".
22. `Skip to content` vs `Skip to main content` across two properties.
23. Help-centre helpfulness ratios are published and are poor on the troubleshooting articles (`1 out of 8`, `33 out of 179`, `269 out of 870`) — recorded as a finding *about* the content, published *by* Zapier.
24. A conference promo banner (`Refound your company for the AI era at ZapConnect 2026`) sits above every help article, including error-recovery ones.
25. `My Requests` and `Contact Support` are each duplicated in the help header DOM.
26. No accessibility statement or VPAT found.
27. `Your plan, your way` is the heading over a description of an opt-out automatic charge escalation.

---

## Transferable patterns

1. **Teach the vocabulary before the procedure, and elaborate one scenario across every term.** Zapier's first Getting started article is an 18-term glossary, and four consecutive definitions extend a single "text message when I get an email" example. Each new concept is a modification of a structure the reader already holds. Transfers to any product with a non-obvious object model — which is most fintech.
2. **Publish the propagation rule, not just the definition, for every state in a multi-step system.** For each of eleven statuses Zapier states what the parent gets, what the step gets, and what downstream steps get. A status in a graph is a rule about the graph, and documenting it as a label is insufficient.
3. **Disambiguate look-alike failures by their consequence, not by their taxonomy.** The five unsuccessful statuses are separated by whether the Zap turns off — the thing the user actually fears — and three of the five say explicitly "will not turn off your Zap". Organise failure documentation around the anxiety, not the object model.
4. **Name the retry, the auto-retry, and the fallback branch as three separate things.** `Replay`, `Autoreplay`, `error handler path`, each with its own status (`Scheduled`, `Handled error`) and its own plan gating. Collapsing these into "retry" makes the state model unexplainable.
5. **Mirror the cause list and the fix list, in the same order, under the same headings.** The held-runs article does this for six causes, and every fix ends with the same recovery verb. A reader who identifies their cause can jump to the matching heading.
6. **Title symptom articles in the object's declarative voice**: `Zap is stuck in a loop`, `Zap is creating duplicate data`. Not the user's confession (the user did nothing wrong) and not the system's object model. Condition: this works where the system misbehaves; where the user erred, Wise's first-person form is better.
7. **Quote the literal error string in the help title, in quotation marks.** `Fix "Required field is empty" errors`, `Error: The app did not respond in time`. Users paste error text into search; match it.
8. **Quantify the thing you do not charge for.** "over 20 thousand polls per month. Zapier does not charge for these events." A number answering a fear beats a reassurance answering a fear.
9. **Pre-empt the misreading of your own data change.** "This jump means Zapier started displaying that usage, not that you used more tasks." Predict the wrong inference your change will cause and refute it in the same paragraph.
10. **Decompose status-page components along real failure boundaries, using the product's own vocabulary.** `Instant Triggers` / `Polling Triggers` / `Searches & Writes` rather than "Zaps". And state your confidence, not just your status: "We're not aware of any issues affecting our systems."
11. **`Safely halted` — name the deliberate non-event.** Where a system stops for a correct reason, give it a name that carries both the stop and the reassurance, and say in the same breath that it has no punitive consequence.
12. **Watch for a state name borrowed from one mechanism becoming the catch-all for "not yet".** `Filtered` is Zapier's cautionary tale: a word implying a decision now mostly means pending. Audit any state whose name asserts a cause.

## Caveats & gaps

- **The homepage body was not captured.** `zapier.com/` exceeded the fetcher's size limit and the persisted output file was no longer available when I tried to read it. Only the metadata, the full global navigation, and the mega-menu glosses were recovered. T2's homepage analysis therefore rests on the title and meta description, and the hero headline, hero subhead, social-proof band, and homepage CTA inventory are **unharvested**. This is the largest gap in the file.
- **All in-product strings are `[documented]`, not observed.** The Zap editor, Zap history, run-detail pages, the `Troubleshoot` and `Logs` tabs, error toasts, banner alerts, and the empty states are all behind auth. Every status name, every icon description, and the two error-ratio radio labels come from help-centre prose describing the UI, not from the UI.
- **No email copy.** Task-limit warnings at 80% and 100%, the auto-shutoff notification, and the grace-period email are described by their triggers only. Their subject lines and bodies were not retrievable.
- **T8 is genuinely empty.** No first-run, no-data, or no-results copy was reachable on any public surface.
- **No accessibility statement, VPAT, or conformance claim was found.** Absence of evidence rather than evidence of absence — but it is not linked from the marketing footer, the help centre, or the pricing page.
- **Only five of ~hundreds of help articles were opened.** The twelve category scope lines and roughly forty article titles are well evidenced; the body structure of the wider help corpus is not. The `Apps`, `Zapier AI`, `Custom logic and integrations`, `Forms`, `Tables`, `Canvas`, `Lead Router`, and `Product updates` categories were not entered.
- **Developer platform not harvested.** `platform.zapier.com` / `docs.zapier.com` and the integration-builder vocabulary are unexamined, as is `zapier.com/apps` and the template gallery.
- **Locale is en-US only.** The site offers DE, ES, FR and JA; the help centre appears to be `/hc/en-us` only.
- **Some pricing-matrix cell values are not asserted.** The comparison tables render as long label runs with the tick/cross values detached in the extracted text. Named numeric values (seats, polling times, record caps, page caps, upload sizes, Code runtimes) were recoverable with confidence and are quoted; individual boolean ticks across ~80 rows were not, and are not claimed.
- **The status page's incident history and the `Calendar` grid rendered as `Loading...`**, so Zapier's actual incident-communication prose — severity labels, update cadence, post-mortem style — was not observed.

## Sources

1. https://zapier.com/ — partial (metadata and navigation only)
2. https://zapier.com/pricing
3. https://help.zapier.com/hc/en-us
4. https://help.zapier.com/hc/en-us/articles/8496181725453-Learn-key-concepts-in-Zap-workflows
5. https://help.zapier.com/hc/en-us/articles/20505304170637-Review-run-statuses-in-Zap-workflows
6. https://help.zapier.com/hc/en-us/articles/8496037690637-How-to-troubleshoot-errors-in-Zap-workflows
7. https://help.zapier.com/hc/en-us/articles/8496216132621-Zap-is-not-running
8. https://help.zapier.com/hc/en-us/articles/37454233721869-How-to-troubleshoot-held-Zap-or-step-runs
9. https://help.zapier.com/hc/en-us/articles/8496196837261-How-is-task-usage-measured-in-Zapier
10. https://status.zapier.com/
