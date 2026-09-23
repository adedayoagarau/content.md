# 037. Retool

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Internal-tool builder / low-code application platform for enterprise (now AI app-generation platform) |
| Primary URL | https://retool.com/ |
| Corpus rank | 037 |
| Benchmark strength (source list) | Builder guidance and component labels |
| Locale / market observed | en-US (single locale; docs declare `meta-docusaurus_locale: en`) |
| Platform observed | Web (marketing, dark-themed), Docusaurus docs site, Atlassian Statuspage |
| Regulatory posture | n/a in the regulatory sense; compliance framed as SOC 2, ISO 27001, SAML/SSO, audit logging, self-hosting. `Trust Center` at `trust.retool.com` and a `Security` page under `docs.retool.com/legal/` |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Partial — the docs' own search, the in-builder component picker, and `trust.retool.com` were not harvested. The component *reference* (the flagged strength) was fully captured for classic apps; the **new app builder's component set was not found as a comparable public list**, so component-label analysis here is necessarily about the classic library. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://retool.com/ | Hero, four capability cards, three "why enterprises" blocks, exceptionally long alt text |
| Pricing | https://retool.com/pricing | Four plans, ~50-row feature comparison table with per-row glosses, four footnote definitions, three FAQ groups |
| Docs home | https://docs.retool.com/ | Six-item nav, 11 product areas × 5 article types, release pointers |
| Classic apps quickstart | https://docs.retool.com/apps/quickstart | The single richest source of builder guidance and in-product terminology |
| Classic apps component reference | https://docs.retool.com/apps/reference/components | 14 categories, ~110 components, each with a one-line description — the flagged strength |
| Classic apps glossary | https://docs.retool.com/apps/reference/glossary | **Entirely empty** — 26 alphabet headings, each "No glossary entries found." |
| Site-wide glossary | https://docs.retool.com/glossary | ~400 entries including the full lifecycle vocabulary |
| Debug app issues | https://docs.retool.com/build/apps/concepts/debug | Error/log taxonomy and the agent-remediation CTAs |
| Status page | https://status.retool.com/ | 14 components, five-state legend, `About This Site` scoping note |

---

## T1 Navigation & IA labels

**Marketing nav is a lifecycle verb sequence** `[observed]`

The site's primary platform grouping is four gerund-free imperatives naming stages of an internal tool's life:

`Build` · `Launch` · `Scale` · `Govern`

Under them, a separate `Capabilities` list names the products: `AI app security` · `AppGen` · `Agents` · `AI primitives` · `App builder` · `Mobile apps` · `Workflows` · `Database` · `External apps` · `Self-hosting`.

**This two-axis footer — stage on one axis, capability on the other — is the notable IA decision.** A reader who knows *where they are in the lifecycle* enters via `Build`/`Launch`/`Scale`/`Govern`; a reader who knows *what thing they need* enters via `Capabilities`. Both lists are complete and neither is a subset of the other, so the site is navigable by either mental model. The URL structure reinforces it: `/build-enterprise-apps`, `/launch-enterprise-apps`, `/scale-enterprise-apps`, `/govern-enterprise-apps`, with capabilities nested beneath (`/build-enterprise-apps/agents`).

**`Audience` is a third axis, mixing job function and industry** `[observed]`: `Data` · `Engineering` · `Operations` · `Financial services` · `Manufacturing` · `Enterprise` · `Startups` · `Agencies`. The first three are teams, the next two are verticals, the last three are company shapes — one list, three kinds of thing. A defensible commercial choice but an inconsistent taxonomy.

**Docs nav is six items, and five of them are verbs** `[observed]`

`Build` · `Automate` · `Code` · `Manage` · `Host` · `What's new`

The verbs differ from the marketing verbs (`Build` is shared; `Launch`/`Scale`/`Govern` become `Automate`/`Code`/`Manage`/`Host`). Two verb systems for one product, split by surface.

**The strongest artefact in this file: an 11 × 5 docs matrix** `[observed]`

Every product area is documented through the same five article types, in the same order, with the area getting a one-line scope description:

| Area | Scope line (verbatim) |
|---|---|
| `Apps` | "Build apps with AI using the new app builder. Deploy securely with Retool." |
| `Classic apps` | "Use Retool's classic drag-and-drop IDE to build, deploy, and embed apps." |
| `Agents` | "Automate human work with AI." |
| `Workflows` | "Automate jobs, alerts, and ETL tasks." |
| `Queries` | "Write functional code that powers your software." |
| `Data Sources` | "Connect to your API and database resources." |
| `Source Control` | "Track and manage changes with version control." |
| `Administration` | "Manage and govern your Retool organization and its users." |
| `Permissions` | "Control access to Retool with user permissions." |
| `SSO` | "Manage single sign-on and authentication." |
| `Deployments` | "Choose how to host and manage your Retool instance." |

Article types: `Quickstart` → `Tutorial`/`Tutorials` → `How-to` → `Reference` → `Concepts`. This is a near-textbook Diátaxis implementation (learning-oriented / task-oriented / information-oriented / understanding-oriented), applied uniformly enough that the reader learns the shape once. Every scope line is a **verb-initial imperative**, and the verb tells you what kind of work the area is for.

**Two consistency defects in that matrix** `[observed]`: the singular/plural of the tutorial bucket varies by area — `Tutorial` for Classic apps, Workflows, Source Control and (oddly) `Tutorial` for Permissions where the nav label elsewhere reads `Tutorials`; `Tutorials` for Agents, Queries, Data Sources, Administration, SSO. And `Data Sources` alone pluralises its first bucket as `Quickstarts`. `Apps` (the new builder) has **no tutorial bucket at all** — four types where every other area has five.

**Per-product docs left nav for `Classic apps` → `Reference`** `[observed]`, an unusually clean reference inventory:

`Components` · `Event handlers` · `Frames` · `Glossary` · `Keyboard shortcuts` · `Modules` · `Objects` · `Retool CLI` · `URL parameters`

**Breadcrumbs** `[observed]`: `Home` → `Classic apps` → `Reference` → `Components`. Four levels, the leaf unlinked.

**Footer legal/ops row** `[observed]`: `Terms of use` · `Privacy policy` · `Security` · `Trust Center` · `Report abuse` · `Changelog` · `Status` · `Site map`. Note that `Terms of use`, `Privacy policy` and `Security` all live on `docs.retool.com/legal/` — legal documents are shipped through the docs toolchain rather than a separate legal site, which is why they inherit the docs' `Was this page helpful?` furniture.

## T2 Value proposition & headline patterns

**Two competing headlines on one page** `[observed]`. The document title is `Build internal software better, with AI.` while the rendered H1 is `Secure your vibe-coded apps` (carrying a `New` badge). The H1 is an announcement slot that has displaced the positioning statement; SEO metadata and visible headline now say different things.

`Secure your vibe-coded apps` is worth dwelling on. Retool has taken an internet-native, faintly pejorative coinage ("vibe-coded") and put it in the primary headline of an enterprise platform, with a whole capability page named `AI app security` at the URL `/secure-vibe-coding`. **The value proposition is expressed as remediation of a named bad practice the audience already recognises in itself.** That is a different move from asserting a benefit, and it only works because the coinage is current — it will date fast, which is presumably the point of putting it in the announcement slot rather than the title tag.

**Section headers are assertions with the object promoted** `[observed]`

`Apps that mean business` · `Build powerful apps from anywhere` · `Securely connect to your production data` · `Ship safely, with governance built in` · `Why enterprises choose Retool` · `Start today` · `Get the latest from Retool`

`Apps that mean business` is a pun doing double work (serious / for the business). `Ship safely, with governance built in` pairs the developer's verb (`ship`) with the buyer's noun (`governance`) in one six-word line — the clearest instance of Retool's central content problem, which is that the builder and the approver are different people and both read the same page.

**The three "why enterprises" blocks all use a concession-then-refusal structure** `[observed]`

- `Production-ready from day one` — the body opens by naming the false choice ("Don't choose between moving fast or shipping something that'll actually pass a security review") and closes with a triplet of negations: "no rebuild, no audit scramble, no IT veto."
- `From one great app to operational excellence` — opens by conceding what competitors do ("Point solutions help you build apps") before the contrast ("You change how your business operates with Retool").
- `More teams building, no new risk` — a headline that is itself a benefit-plus-negation pair.

`no IT veto` is the sharpest three words on the site: it names the actual failure mode of internal tooling in the reader's own political vocabulary.

**Pricing headlines are plain and buyer-facing** `[observed]`: `Find the plan that works for you` · `Compare Features` · `How our pricing works` · and the closing CTA block `Ship internal tools 10x faster.` The three pricing-rationale blocks are labelled `Built for developers` · `Differentiated pricing` · `Room to grow` — the middle one is the only abstract noun phrase and is the weakest of the three; "Differentiated pricing" describes the vendor's pricing model rather than the buyer's benefit, where its neighbours describe the buyer's.

**Docs home headline** `[observed]`: `Build anywhere, deploy in Retool` — the "anywhere/here" contrast that also structures the homepage capability cards (`Build powerful apps from anywhere`). The docs body then closes on a promise: "everything you build is secure by default."

## T3 CTA inventory

| CTA (verbatim) | Context / position | Notes |
|---|---|---|
| `Book a demo` | Sticky nav, footer | Rendered in the DOM as `Book a demoBook a demo` — a doubled label (see T14) |
| `Start for free` | Nav, footer, docs footer | |
| `Get started for free` | Pricing, Free plan card | |
| `Build for free` | Pricing, Free column header of the comparison table | **Third label for the same action on the same page** |
| `Try Retool for free` | Pricing, closing CTA | Fourth |
| `Start free trial` | Pricing, Team and Business cards | |
| `Choose team` / `Choose business` | Pricing, comparison-table column headers | Verb-plus-plan-name; lowercase plan names in a UI where the plans are capitalised elsewhere (`Team`, `Business`) |
| `Get pricing` / `Get Pricing` / `Get pricing ↗` | Pricing, Enterprise card and table cells | Three casings/forms of one label on one page |
| `Sign in` | Docs footer | vs `Log in` absent — Retool uses `Sign in` |
| `Explore products` | — | `[absent]` — Retool has no "all products" index CTA |
| `View app gallery` | Homepage, screenshot strip | Rendered doubled (`View app galleryView app gallery`) |
| `Learn about the app builder` | Homepage capability card | Fully specific |
| `Read the MCP server docs` | Homepage capability card | Names the artefact and the destination type |
| `Read the app import docs` | Homepage capability card | Parallel to the above |
| `See the full list of integrations` | Homepage | |
| `Learn about security and governance` | Homepage | |
| `Explore the new app builder` | Docs home hero | |
| `Watch the film` | Homepage, beside "See what's new." | `film`, not "video" — an unusual register choice |
| `Import` / `MCP` | Homepage prompt box chips | One-word entry points, each with a following gloss ("Import apps built in other platforms", "Build via MCP") |
| `Starter prompts` | Homepage prompt box | Names the affordance rather than instructing |
| `Ask Retool developers` | Every docs page, under `Need more help?` | Routes to `community.retool.com` with the current page pre-quoted in the new-topic body |
| `Was this page helpful?` `Yes` / `No` | Foot of every docs page | |
| `Add to chat` | Debug console, per error and per log row | `[documented]` |
| `Fix` | Debug console, per error row | `[documented]` |
| `Fix all` | Debug console, top of window | `[documented]` |
| `Go to page` | Event-handler action name | `[documented]` |
| `Move to page` | Contextual menu action | `[documented]` |
| `Skip to main content` | First in DOM on marketing and docs | Accessibility |
| `Subscribe to Updates` | Status page | |
| `View historical uptime.` | Status page | Trailing full stop inside the link |

**Observations.** Retool's homepage CTAs are unusually *specific* — `Read the MCP server docs`, `Read the app import docs`, `Learn about the app builder` — with **no bare `Learn more` anywhere** on the pages harvested. That is better than DigitalOcean and comparable to Wise.

The failure is concentrated entirely in the acquisition CTA, which has **five labels for one action** (`Start for free`, `Get started for free`, `Build for free`, `Try Retool for free`, `Start free trial`) and a sixth casing variant of the Enterprise equivalent. Two of the five sit on the same page within one scroll of each other.

**The best CTA pattern here is in the debug console** `[documented]`: `Add to chat` and `Fix` on hover per row, `Fix all` at the top. Three verbs at three scopes — *give me context*, *fix this one*, *fix everything* — with the escalating-scope action placed in the container header rather than in the row. And crucially `Add to chat` is offered *beside* `Fix`, so the user can choose to stay in control rather than delegate. See T7.

## T4 Onboarding & getting-started

**Getting started is a prompt box, not a form** `[observed]`. The homepage hero's primary affordance is a text field with the instruction `Write a prompt, use @ to include data`, accompanied by `Starter prompts` and two alternative entry lanes with one-line glosses:

- `Import` — "Import apps built in other platforms" (React, Lovable, Replit logos)
- `MCP` — "Build via MCP" (Claude Code, Cursor, Codex, ChatGPT, Kiro logos)

`Write a prompt, use @ to include data` is a **two-clause instruction that teaches a syntax in the placeholder**. The first clause states the action, the second teaches the one piece of grammar the user could not guess. Eight words carrying both a task and a feature discovery.

Three entry lanes are then framed as one promise on the capability card: `Build powerful apps from anywhere`, with the three cards named `Retool app builder`, `MCP server`, `Import React code` — noun-phrase names, each with a two-sentence body and a docs link. The `MCP server` card's body is the notable one: "Build an app from your favorite AI coding agent and deploy it here within your governed Retool environment." *There* and *here* are doing the whole job — build wherever you like, deploy where governance lives.

**Docs onboarding is explicitly framed as concept acquisition, not task completion** `[observed]`. `Classic apps quickstart` states its own contract twice — the deck says "Learn about the fundamental concepts of classic apps", and the opening paragraph says: "This guide serves as an introduction to classic apps. It covers many of the concepts and terminology you will come across as you build using the web-based IDE. After reading this page, you should have a good understanding of the fundamentals for building classic apps."

**"After reading this page, you should have a good understanding of…" is a stated exit condition**, and it is honest about being a *reading* outcome rather than a *building* outcome. A quickstart that admits it is a concepts page is more useful than one that pretends to be a tutorial; Retool then ships the actual tutorial as a separate, differently named bucket.

**The quickstart's section headers are all verb-initial and name the mental model** `[observed]`

`Create and edit classic apps with AI` → `Assemble the interface` → `Frame types` → `Connect interface elements together` → `Use JavaScript expressions for values` → `Connect your data using resources` → `Read and write data using queries` → `Connect the interface and code together` → `Control and run queries with event handlers` → `Transform data using transformers` → `Script classic apps with JavaScript` → `Embed content and build custom components` → `Wrap up`

Note `Connect` used three times with three different objects (interface elements to each other; data to the app; interface to code) — repetition used deliberately to signal that the platform's central verb is *connect*. And `Wrap up` as the closing header, which is conversational where the rest is procedural.

**Teaching by analogy, twice, both times to a familiar tool** `[observed]`:

- On the dependency graph: "This is similar to how spreadsheet formulas work when referencing cell values; if a referenced value changes then the formula instantly updates its result."
- On embedded expressions: "similar to the use of template literals", with an outbound MDN link.

The **two analogies are pitched at two different readers** — the spreadsheet analogy for the ops/analyst builder, the template-literal analogy for the engineer — and they explain the same mechanism. Retool's audience problem (business builder plus engineer reading one page) is solved here by doubling the explanation rather than splitting the page.

**Worked examples are always three-part** `[observed]`: the property being set, the expression, and the resulting behaviour. E.g. "The Alert component's **Hidden** (`hidden`) property in the IDE uses a truthy statement that evaluates as `true` if the user is a member of the Sales team… As a result, the alert only appears when a Sales team member is selected." Every example on the page ends with an **"As a result, …" sentence** that states the user-visible outcome. Setting → expression → consequence, never just the first two.

**Prerequisites are handled as a browser-support callout rather than a checklist** `[observed]`: a `Supported browsers` callout lists four browsers and then states the negative: "Editing apps in alternative browsers, on mobile devices, or using beta and nightly builds is not officially supported." Scope stated as an exclusion, early, before the reader invests.

**An opt-out is offered inside the AI section** `[observed]`: "If you prefer not to use AI features, you can turn them off entirely in **Settings** > **AI** by disabling the **Retool AI Access** setting." Placed in the AI onboarding section itself, not buried in settings docs — the refusal path is documented where the feature is introduced.

## T5 Form & field labels

Retool's in-product "fields" are the component property inspector, quoted throughout the docs. `[documented]` unless noted.

**Property labels are Title-case English with the machine name in parentheses** `[documented]`

The docs' house convention is `**Display Label** (`machineName`)`, e.g. the Alert component's `**Hidden** (`hidden`) property`, the Table's `**Data source** (`data`) property`. **Both names are always given together**, which resolves the perennial low-code problem that the label in the inspector and the key in the expression are different strings. Observed pairs: `Hidden` / `hidden`, `Data source` / `data`, `Default value` (no machine name given), `value`, `Type`, `Title`.

**Named IDE surfaces (these are the real "field labels" of a builder)** `[documented]`

`Pages` tab · `Code` pane · `Global` section · `Page` section · `Component tree` panel · `Graph` pane · `Inspector` · `Add UI` tab · `Assist panel` · `Code Search tab` · `Code tab` · `Console tab` · `Component Tree tab` · `Command palette` · `status bar` · `Errors` tab · `Logs` tab · `Timeline` tab · `Settings` > `AI` · `Settings` > `Beta` · `Retool AI Access` · `Data access enforcement`

Two inconsistencies in how these are written: `Component tree` panel (sentence case) on the quickstart versus `Component Tree tab` (title case) in the glossary, for what is apparently the same surface; and `status bar` lowercase in the debug doc versus `Status bar` capitalised in the glossary.

**Component description grammar — the flagged strength, and it is a real system** `[observed]`

Every one of the ~110 components in the reference carries a one-line description, and the descriptions are built from a closed set of **type nouns** introduced by an indefinite article:

| Type noun | Formula | Examples |
|---|---|---|
| `A button to …` | button + action clause | "A button to trigger actions when clicked." · "A button to select single or multiple files." · "A button to record audio." · "A button to record elapsed time." |
| `An input field to …` | input + enter/select clause | "An input field to enter a number." · "An input field to enter an email address." · "An input field to select a color." · "An input field to digitally capture a signature as an image." |
| `A content area to display …` | passive presentation | "A content area to display an image." · "A content area to display bar charts." · "A content area to display a QR code." · "A content area to display a status indicator." |
| `A container to group …` | layout | "A container to group other components together with flexible layout controls." · "A container to group other components into tabbed views." · "A container for a series of steps with multiple branches and outcomes." |
| `A group of …` | multiples | "A group of checkboxes to toggle boolean values." · "A group of buttons to trigger actions when clicked." · "A group of tabs that trigger actions when clicked." |
| `An interface to …` | complex/interactive | "An interface to display and annotate text." · "An interface to scan a barcode or QR code using the device's camera." · "An interface to edit and validate JSON." · "An interface for AI chat conversations." |
| Singletons | | `Table`: "A table to display data that can be sorted, filtered, paginated, and edited." · `Form`: "A form to group and submit input fields." · `Filter`: "An interface to define filters for Table components." · `Spacer`: "An empty area to add space between components." |

**`Spacer` — "An empty area to add space between components."** is the small masterpiece of the set: a component whose entire purpose is absence, described with a type noun (`An empty area`) that keeps it inside the grammar rather than breaking out into "Adds space".

The grammar means a builder can predict a component's *behaviour class* from the first three words of its description. `A button to …` will fire an action; `A content area to display …` will not accept input; `An interface to …` will be the complicated one. That predictive property, not the individual strings, is the transferable asset.

**Where the grammar breaks** `[observed]` — recorded as defects:

- `Key Value` (Legacy): "Display key-value information." — imperative, no article, no type noun. Its non-legacy twin obeys the rule: "A content area for viewing and editing key-value data."
- `Timeline` (badged `NEW`): "Display a Gantt chart of events." — imperative, and the component name (`Timeline`) does not match the artefact named in the description (`Gantt chart`).
- `Button` and `Outline Button` carry **identical** descriptions: "A button to trigger actions when clicked." The one thing that distinguishes them — appearance — is the one thing the description omits.
- `Dropdown Button` and `Split Button` carry identical descriptions: "A dropdown menu with buttons to trigger actions when clicked."
- `Cascader` appears twice (Legacy and Select inputs) with the same description; so do `Alert` and `Button Group`.
- `List View` appears three times with three different descriptions across `Legacy`, `Repeatables`, and a `Container List View` variant.
- `Legacy Checkbox Tree` carries the word "Legacy" *inside the component name* while sitting in a section already headed `Legacy`, alongside `Checkbox Tree` in `Select inputs`.
- `Link` and `Link List` are filed under `Buttons`, described as "A link to trigger actions when clicked." A link that triggers an action rather than navigating is a genuine accessibility concern, and the description is honest about it without flagging it.

**Category names for the component library** `[observed]`, 14 of them: `Legacy` · `Buttons` · `Charts` · `Containers and forms` · `Custom` · `Data` · `Date and time inputs` · `Integrations` · `Navigation` · `Number inputs` · `Presentation` · `Repeatables` · `Select inputs` · `Special inputs` · `Text inputs`.

Five of the fourteen are input sub-types (`Date and time`, `Number`, `Select`, `Special`, `Text`), which is a **taxonomy weighted by the reality of internal tools**: they are mostly forms, so the form controls get five buckets while everything visual gets one (`Presentation`). `Special inputs` is the honest residual bucket, and it is where the interesting things live (`Signature`, `Scanner`, `Bounding Box`, `Microphone`, `LLM Chat`, `Agent Chat`, `Comment Thread`, `Timer`). `Repeatables` is a coined category name for "things that render once per row".

## T6 Status & state language

**Status page: five-state legend** `[observed]`

`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, with per-day history strings in a **second, lower-case register**: `Major outage` / `Partial outage` / `had a major outage.` / `had a partial outage.` Two capitalisation systems for the same five states on one page.

Roll-up headline: `All Systems Operational`. Fourteen components, flat (no region nesting): `New app builder` · `Classic web app` · `Infrastructure` · `Workflows` · `Resource Queries` · `License server` · `Email Server` · `RetoolDB` · `Platform APIs` · `Retool-managed Temporal (via Temporal.io)` · `Source Control` · `Audit Trails` · `Self Hosted On-Premise` · `Assist`.

Two things stand out. `Retool-managed Temporal (via Temporal.io)` **names the upstream vendor in the component label** — the dependency is disclosed in the status taxonomy itself rather than only in incident prose. And the component list carries a governance artefact (`Audit Trails`) as a first-class status component, which tells enterprise buyers their compliance evidence pipeline has its own uptime.

**An explicit scoping note, which most status pages omit** `[observed]`, under `About This Site`:

> "Welcome to Retool's status page. This page primarily reports incidents affecting Retool Cloud. Some components may also impact self-hosted (on-premise) deployments, which will be noted accordingly."

Stating **what the status page does not cover**, and committing to flag the exceptions, resolves the ambiguity that self-hosted customers would otherwise carry into every incident. Directly transferable to any product with both hosted and customer-deployed modes.

**Product-maturity states are defined in the glossary, with the toggle location included** `[observed]`

| Term | Definition (verbatim, short) |
|---|---|
| `Beta` | "This functionality is currently in active development and subject to change. Beta functionality is available for you to use but may not yet be complete." |
| `Public beta` | "This feature is currently in active development, subject to change, and may not yet be complete. The feature can be toggled on or off from the **Settings** > **Beta** page." |
| `Closed beta` | "Functionality is available to a limited number of customers for initial testing… For access, reach out to your account manager." |
| `Closed beta waitlist` | "The waitlist that provides access to a closed beta." |
| `General availability` | "Functionality is generally available to eligible organizations and their users." |
| `Deprecated` | "A feature that is no longer supported by Retool. The feature is removed, and interactions that rely on this functionality may break." |
| `Deprecated component` | "A component that is no longer supported by Retool. It continues to work in existing classic apps but should not be used in new apps" |

**The `Deprecated` / `Deprecated component` pair is the sharpest distinction here.** Platform deprecation means *removed and your things may break*; component deprecation means *still works, don't use it again*. Two definitions of one word, separated because the consequence to the user is different — and the component definition is the only one in the set that gives the reader an instruction ("should not be used in new apps"). Note the missing terminal full stop on that entry.

`Beta` and `Public beta` are near-identical in wording, which suggests `Beta` is a legacy synonym; the only substantive difference is the toggle location. Badges observed in the component reference: `NEW` (on `Timeline`) and `BETA` (on `Agent Chat`).

**Build/branch state vocabulary** `[observed]`, from the glossary and debug docs: `Current working version` ("The version that reflects the current state of the app or workflow, reflecting the latest edits") · `Branch` · `Collaborative branches` · `Catch-up commit` (defined *and* marked obsolete in the same entry: "Made obsolete by branch merging") · `Branch merging` · `Circular dependencies` ("An error state where two or more properties rely on each other to function").

`Catch-up commit` is a glossary entry that documents its own retirement inside the definition. Keeping the obsolete term with a pointer to its successor is the right call for a product whose users read old forum threads.

**Log-type states** `[documented]`: `Function` · `Build` · `Frontend` · `Sandbox` · `Agent` · `Git` (see T7). `Sandbox` carries a state description in its gloss: "Status of the sandbox environment that runs the app preview, such as when it becomes ready."

## T7 Error, failure & recovery

`[documented]` unless noted. Retool publishes no single error-code reference; the error model is instead documented as a **taxonomy plus a remediation affordance**.

**Three error classes, named by where they originate** `[documented]`

The `Errors` tab of the debug console "shows function errors, build errors, and frontend errors." The parallel `Logs` taxonomy is six-valued and each type is defined by what it contains:

| Log type | Gloss (verbatim) |
|---|---|
| `Function` | "Any functions the app runs, including their duration and any errors thrown by function code." |
| `Build` | "Compilation events for the app, including type errors, build failures, and recovery." |
| `Frontend` | "Browser console output from the running app, including logged messages and thrown errors." |
| `Sandbox` | "Status of the sandbox environment that runs the app preview, such as when it becomes ready." |
| `Agent` | "Actions the agent takes, such as the tools it calls while building the app." |
| `Git` | "Git operations for the app, such as pushing commits or restoring project files." |

Two notes. `Build` explicitly includes **`recovery`** as a loggable event — the system logs getting better, not only getting worse, which is unusual and useful when the reader is trying to establish whether a transient failure self-healed. And `Agent` makes the AI's tool calls a first-class log class alongside the app's own, so the builder can audit what the generator did.

**The recovery affordance is a three-scope verb set, and it preserves user agency** `[documented]`

- `Add to chat` — "adds the context of the error to the agent. You can add additional information to the prompt, and submit."
- `Fix` — "automatically prompts the agent to investigate and resolve the error."
- `Fix all` — a `Best practice` callout: "Click **Fix all** at the top of the window to ask the agent to fix all errors in the list."

**This is the most interesting error-recovery content pattern in the file.** The offer is not "we fixed it" but a choice between *hand me the context and I'll steer* (`Add to chat`) and *you take it* (`Fix`), with a bulk escalation in the container header. `Fix` is described as "investigate and resolve" — two verbs, so the user knows the agent will diagnose rather than guess. And `Add to chat` is available on **every** log row, not only on errors, so the same affordance covers "this looks wrong" as well as "this is broken". The `Fix` button, correctly, appears only where there is an error to fix: "If the log is an error, a **Fix** button is also present."

**Prevention documented as a first-class behaviour** `[observed]`, from the quickstart's `Dependency cycles` callout: "The dependency graph enables Retool to prevent you from creating circular dependencies, where two or more properties rely on each other to function. If you attempt to reference values that rely on one another, the IDE displays a warning." The docs describe the *guard* and the *warning*, name the concept, define it inline, and the glossary carries `Circular dependencies` as its own entry. Concept, guard, message, and glossary term all aligned on one name.

**Authoring-time error handling is a named, priced feature** `[observed]`: the pricing table row `Custom error handling` — "Trigger custom error messages and set automatic retry policies in the event of a workflow failure." Included on all four plans, i.e. Retool does not gate failure handling behind a tier. Worth recording: error handling as a line item on the pricing page is itself a content decision, and putting it in the free tier is a trust signal.

**Observed error strings** `[observed]` — the only literal error text found on public surfaces, from the status page:

> "A fix has been implemented for the issue causing intermittent **"Session not found"** connection failures on the Retool MCP server."

and the accompanying user instruction: "If you were running into this error, please retry to create a new session." Note the conditional framing (`If you were running into this error`) rather than a blanket instruction — the recovery step is addressed only to the affected subset.

**No error-code reference exists.** `[absent]` — searched; Retool's troubleshooting is organised as per-area guides (`Troubleshoot resource connections`, `Troubleshoot Source Control issues`, `Workflow performance best practices`, `Debug app issues`, `Classic app error reporting and observability`, `Mobile app error reporting and observability`) rather than as a code catalogue. Those guide titles are `Troubleshoot <object>` (imperative) or `<object> error reporting and observability` (noun phrase) — two shapes, split by whether the reader is fixing or instrumenting. **No error codes are recorded in this file because none were observed.**

**A pre-announced removal, written as a caution** `[observed]`, at the top of the classic apps quickstart:

> `Caution` — "The public beta for Assist concludes on September 30, 2026, and Assist will be removed for all users on that date."

Date-certain, no hedging, `will be removed` rather than "may be sunset", and a `Learn more` link to a changelog entry named `upcoming-assist-removal`. The word "removal" appears in the URL slug, which means the changelog's own IA admits what is happening.

## T8 Empty states

**The headline finding for this product is an empty-state defect, and it is a good one.** `[observed]`

`https://docs.retool.com/apps/reference/glossary` is a published, navigable, linked reference page that contains **twenty-six alphabet headings, each followed by the string `No glossary entries found.`** — and nothing else. The page's own deck ("Definitions of classic-apps-related terms") promises content the page does not have, and its in-page contents block lists all 26 empty sections as navigable anchors.

What makes it instructive rather than merely broken: the empty-state *string* is perfectly good — `No glossary entries found.` is plain, accurate, no exclamation, no cutesy apology. **The failure is that a well-written empty state was allowed to become the entire page.** A no-results message is correct behaviour for a filtered view and a content defect for a reference page, and nothing in the template distinguishes the two cases. The page does supply one route out — "Refer to the [main glossary] for definitions of terms across Retool" — placed above the empty sections, so a reader who reads the preamble escapes. A reader who jumps to `## S` from the contents does not.

**Status page empty states** `[observed]` — four distinct strings for four distinct nothings:

- `No incidents reported today.` (current day, open)
- `No incidents reported.` (prior days, closed)
- `No downtime recorded on this day.` (uptime bar tooltip — *we measured and it was fine*)
- `No data exists for this day.` (uptime bar tooltip — *we did not measure*)
- `No incidents or maintenance related to this downtime.` (the `Related` panel)

**The `No downtime recorded` / `No data exists` pair is the pattern worth stealing.** They look like the same nothing and are not: one is a verified absence of failure, the other is an absence of evidence. Most products render both as a grey bar with no explanation. Distinguishing "clean" from "unknown" in the tooltip is exactly the honesty an SLA-reading buyer needs.

Docs search empty state and in-builder empty states were not reachable. `[absent]`

## T9 Notifications & system messages

**Incident updates use a four-stage narrative — one stage more than DigitalOcean** `[observed]`

**Investigating** → **Identified** → **Monitoring** → **Resolved**

The extra stage carries real information: `Identified` marks the moment cause is known but fix is not yet shipped, which is the stage customers most want distinguished from `Investigating`. From the 14 Sep MCP incident:

- *Investigating* — "We're investigating an issue causing some users to experience errors when connecting to Retool's MCP server. Some connections may fail. We're working on a fix and will provide updates as we have them."
- *Identified* — "The issue has been identified and a fix is being implemented."
- *Monitoring* — "A fix has been implemented and we are monitoring the results."
- *Resolved* — "This incident has been resolved."

The middle two and the last are **boilerplate Statuspage templates**, verbatim. Only the `Investigating` note is written by a human, and it does the work: scoped blast radius ("some users"), hedged symptom ("Some connections may fail"), commitment to cadence rather than to an ETA ("will provide updates as we have them"). Compared with DigitalOcean's incident copy, Retool's is **thinner**: no impact window in the resolution, no apology, no workaround, no named team. The 8 Sep incident does better — it quotes the literal error string and gives the user a recovery action — but it opens at `Monitoring` with no `Investigating` note at all, so the customer-facing record begins after the fix.

**Recorded as a negative finding:** `This incident has been resolved.` as the entire resolution note tells a customer nothing about duration, cause, or whether it can recur. For a platform whose value proposition is enterprise governance, the incident record is the thinnest content on the site.

**Subscription channel copy** `[observed]`, identical in structure to the DigitalOcean Statuspage instance: email subscribers get "whenever Retool **creates**, **updates** or **resolves** an incident"; SMS subscribers get "whenever Retool **creates** or **resolves** an incident" — the higher-interrupt channel is deliberately given fewer events, and the difference is stated rather than discovered. Channels: email, SMS, Slack, Atom/RSS, plus `Visit our support site.` pointing at `community.retool.com` (i.e. the forum *is* the support site).

**In-product notification vocabulary** `[documented]`: event handlers can "display a notification"; the quickstart's worked example is described as "The event handler shows an error notification when a date is selected, but only runs if the specified day is a weekend." Notification *types* are implied (`error`) and the ternary example sets a component's `Type` property to `'success'` or `'error'` — a two-value severity vocabulary.

**Push notifications as a priced capability** `[observed]`: "Get built-in support for writing, customizing, and subscribing mobile users to push notifications." Note `writing` first in the list of three — the copy task is named before the configuration task.

**Governance-triggered messaging** `[observed]`, pricing row `Orchestrated governance`: "Trigger custom logic in response to events in Retool, like org invitations or password reset requests." Two named system-message events (invitation, password reset) exposed as automation hooks.

## T10 Disclosures, legal & compliance

**The pricing page's four footnote definitions are the best disclosure content on the site** `[observed]`

Retool's whole commercial model rests on distinguishing seat types, and it discloses each with a **behavioural definition tied to the billing cycle** rather than a role name:

| Footnote | Term | Definition (verbatim) |
|---|---|---|
| `*` | `Builder` | "Enabled users who built or edited an app or workflow during the billing cycle." |
| `†` | `Internal user` | "Enabled users who did not build or edit an app or workflow during the billing cycle." Plus: "Internal users can be restricted from making edits via the permission controls available on our Business and Enterprise plans." |
| `‡` | `External user` | "Users that are not part of your organization." |
| `§` | `AI credits` | Pooled at account level; cover all app building and AI Actions; "Credits renew monthly and do not roll over"; annual value based on twelve monthly totals; additional packs purchasable on paid plans; Enterprise can BYOK, which "does not draw from this pool"; "Agents are billed separately." |

`Builder` and `Internal user` are defined as **exact complements of one another** — built-or-edited versus did-not-build-or-edit, same window. There is no gap and no overlap, so a customer can compute their own bill. And the `Internal user` footnote immediately surfaces the cost-control lever ("can be restricted from making edits via the permission controls"), i.e. it tells the buyer how to *avoid* accidental builder seats. Disclosing the mitigation next to the risk is the transferable move.

The `AI credits` footnote is the most honest AI-pricing copy in this harvest because it discloses the four things customers get burned on: **no roll-over**, bonus credits are impermanent ("The base credits included in your plan are permanent. Bonus credits are included now and may change over time"), BYOK bypasses the pool, and **agents are on a different meter entirely**. The bold sentence inside the footnote — "Annual value of credits is based on total monthly credits over a twelve month contract term." — bounds the `up to $10k per year` headline offer that sits on the Enterprise card.

**Per-row glosses turn a comparison table into a glossary** `[observed]`. Roughly fifty feature rows each carry a definition appended to the label, so the buyer never has to know the jargon: `Workflows runs` — "Every time a workflow successfully executes when triggered counts as a run." · `Workflows steps` — "Each block on the canvas that transforms, reads from, or writes to your data represents a step in your workflow." · `Modules` — "Reuse groups of components and queries between Retool applications." · `Offline mode` — "Read and write data, even when you're not connected to the internet." · `Biometric authentication` — "Protect access to your app using on-device facial or fingerprint recognition." · `Flexible spaces` — "Set up independent Workspaces for teams to manage their own apps, permissions, resources, connections, and Git repos."

`Workflows runs` is the load-bearing one: the billing unit is defined with the word **`successfully`** in it, which silently tells the buyer that failed runs are not charged. That is a favourable disclosure hidden in a subordinate clause; it should be louder.

**Overage pricing is stated inline in the cell, not footnoted** `[observed]`: "5,000/month **Additional runs are available at $75 per 5,000 runs per month.**" and the external-user volume ladder rendered as a nested table inside a cell (`0-50 Free`, `51-250 $8/month`, `251-500 $6/month`, `Over 500 $4/month`). The unit price *falls* as volume rises and the ladder is shown rather than described.

**Constraints disclosed where they bite** `[observed]`: "Applications with external user pricing require a custom annual plan for self-hosted deployments" sits inside the `External applications` row rather than in terms; `Versatile platform APIs` is rated `Limited access` on Business and "Full access to all API scopes" on Enterprise — a three-valued answer (`—` / `Limited access` / `Full access`) where most tables would print a tick.

**Data-handling claim, stated as a negation** `[observed]`, in the FAQ: "Your queries run against your own data sources. Retool doesn't store your data." Two short sentences, the second a flat denial, in a section that also enumerates the controls (RBAC, audit logging, SSO, independent workspaces, self-hosting) and then routes to the security docs "for specifics".

**A broken link in the compliance answer** `[observed]` — the security FAQ links to `https://docs.retool.com/docs/security`, while the footer's own `Security` link on the same page points to `https://docs.retool.com/legal/security`. Two different URLs for the security document, one of them from a legacy path shape (`/docs/`). Recorded as a defect: the most trust-sensitive link on the pricing page is the stale one.

**Discount and eligibility disclosures** `[observed]`: students and educators "can apply for a free Business account"; nonprofits can "apply for 25 free seats"; "Both apply to cloud-hosted and self-hosted plans." Named eligibility, named quantity, named scope, in three clauses. And a dated offer: "Customers who sign an Enterprise plan contract by September 30, 2026, will receive AI credits worth up to $10k per year of their contract term.§" — with the footnote marker attached to the offer, so the bounding definition is one glance away.

**Not harvested**: `trust.retool.com`, `docs.retool.com/legal/security`, `docs.retool.com/legal/privacy-policy`. `[absent]`

## T11 Help-centre architecture

**There is no help centre. There is a docs site and a forum, and the forum is named as the support site.** `[observed]`

The status page's help pointer reads "Visit our [support site]" and links to `community.retool.com`. Every docs page's footer routes to the same place with the CTA `Ask Retool developers` under the heading `Need more help?`. Technical support from Retool staff is an **Enterprise-only line item** on the pricing table (`Technical support` — "Retool's Support Engineering team is here to help." — `—` / `—` / `—` / `Included`).

So the self-service architecture is: docs → community forum → (Enterprise only) humans. **Three of the four plans have no vendor support channel at all**, and the pricing table says so plainly with three em-dashes. Recording this as a structural fact rather than a criticism: it explains why the docs carry so much conceptual weight (the quickstart is a concepts essay) and why every page ends in a forum hand-off.

**The docs IA is the help IA**, and its shape is described in T1: six verb-named nav groups → 11 areas, each with a scope sentence → five Diátaxis article types → per-area `Reference` inventories. The `Reference` bucket for `Classic apps` includes `Glossary` and `Keyboard shortcuts` as peers of `Components` and `Event handlers`, i.e. **vocabulary and muscle memory are treated as reference material**, not as onboarding.

**Article-title grammar across the docs** `[observed]`, four shapes:

| Shape | Examples |
|---|---|
| `<Area> quickstart` / `<Area> glossary` | `Classic apps quickstart` · `Classic apps glossary` · `Classic apps component reference` |
| `<Verb> <object>` (imperative) | `Debug app issues` · `Troubleshoot resource connections` · `Troubleshoot Source Control issues` · `Configure workflow error handlers` · `Convert classic apps` |
| `<Object> <gerund noun phrase>` | `Classic app error reporting and observability` · `Mobile app error reporting and observability` · `Workflow performance best practices` |
| Concept nouns (left-nav only) | `App builder` · `Best practices` · `Apps vs. classic apps` · `Data` · `Debugging` · `How it works` · `Security` · `Threads and branches` |

`Apps vs. classic apps` is a genuinely good title: a comparison page named as a comparison, addressing the exact question a user of the old builder has. `How it works` as a `Concepts` child is the plainest possible name for the mechanism page.

**A left-nav/page-title mismatch** `[observed]`: the nav item reads `Debugging`, the page H1 reads `Debug app issues`, and the breadcrumb leaf reads `Debugging`. Gerund in navigation, imperative as the title. Defensible (nav labels as topics, titles as tasks) but not stated as a rule anywhere, and it is not applied consistently — `Security` and `Data` are nouns in both places.

**Site-wide glossary as a real artefact** `[observed]`. `docs.retool.com/glossary` carries several hundred A–Z entries covering product nouns, IDE surfaces, lifecycle states, and — unusually — **generic computing terms Retool did not coin**: `Base64`, `Blob`, `Comma-separated values (CSV)`, `CORS`, `CRUD`, `Content Security Policy (CSP)`, `Connection string`, `Database constraint`. The generic entries are noticeably longer and more encyclopedic than the product entries (the `Blob` entry is a full paragraph on object storage; the `Component` entry is nine words).

Two readings. Generously: the glossary is built for the non-engineer builder who may not know what CORS is, and for whom "look it up elsewhere" is a dead end. Critically: the encyclopedia entries read as imported reference text of a different register, and the length inversion — foundational CS concepts explained at length while Retool's own primitives get one clause — is the wrong way round for a product glossary.

**Docs page furniture** `[observed]`, consistent on every page: breadcrumb, `On this page` marker, deck sentence under the H1, version banner where relevant, `Tags` block at the foot, `Need more help? Ask Retool developers`, in-page contents, `Was this page helpful?` `Yes` `No`. No "last updated" or "last verified" date anywhere — a notable gap against DigitalOcean's `Last verified <date>`.

**Callout/admonition labels are named by topic, not by severity** `[observed]` — the best single content practice in Retool's docs.

Observed callout titles: `Classic apps` (the version banner) · `Supported browsers` · `Caution` · `note` · `Note` · `Best practice` · `Dependency cycles` · `JavaScript output`

Where most documentation systems ship `Note` / `Warning` / `Tip` and leave the reader to infer relevance, Retool renames the box after **what it is about**: the callout warning you about circular references is titled `Dependency cycles`; the one telling you how JS queries return data is titled `JavaScript output`; the browser-support box is titled `Supported browsers`. A reader scanning for a specific concern can find it from the callout title alone, and a reader who does not care can skip it without reading. `Best practice` is the one severity-style label that survives, and it earns its place because it marks advice rather than constraint.

The defect: `note` appears lower-case in one place and `Note` capitalised in another, on pages one click apart.

## T12 FAQs

**Placement**: three separate FAQ blocks at the foot of `/pricing`, each with its own heading, plus five questions answered inline in the first group. Answers are present in server HTML and were retrieved.

**Group headings** `[observed]`: `General questions about Retool` · `Frequent questions about AI credits` · `Frequent questions about agents`

Note `Frequent questions` rather than "Frequently asked questions" in two of three headings — a deliberate compression, or a slip, applied to the two newer topics only. Also note that **the FAQ is topic-segmented rather than one list**, and the two segmented topics are exactly the two things customers cannot yet price intuitively (AI credits, agent hours).

### Group 1 — `General questions about Retool` (8 questions)

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | What can I build in Retool? | Apps and automations on your own data, infrastructure and rules; closes by naming the alternative it displaces — the tools you'd wait months for engineering to build |
| 2 | Who can build in Retool? | Four named personas including the coinage `business engineers`; describes the AI generate-then-refine path and ends on "The builder meets you where you are" |
| 3 | What's the difference between builders, internal users, and external users? | Restates the three seat types in prose, adding that internal users "can explore and draft freely without consuming a builder seat" |
| 4 | What's new in Retool's app builder? | Announces a ground-up rebuild, reassures that old apps keep working, and **introduces the retronym** `classic app builder` |
| 5 | How can I deploy Retool? Can I self-host Retool? | Cloud or self-hosted in your VPC; quantifies setup at about 15 minutes via Docker; gives the decision rule ("If your data can't leave your infrastructure, self-hosting is the answer") |
| 6 | Is Retool secure? Where's my data stored? | Enumerates five controls, states the data claim as a negation, routes to security docs for specifics |
| 7 | Do you offer special pricing or discounts for students, educators, or non-profits? | Yes; two named programmes with quantities and application links; scope stated for both hosting modes |
| 8 | (heading only) | — |

Q3 is the interesting one structurally: it **repeats content that already exists as footnotes on the same page**, in a different register. The footnote says "Enabled users who built or edited an app or workflow during the billing cycle"; the FAQ says "Builders are explicitly assigned by admins and can create, edit, and publish apps, workflows, and agents." Those are not the same definition — the footnote is behavioural (what you did), the FAQ is administrative (what you were assigned). **Recorded as a substantive inconsistency**, not just a duplication: a reader could reasonably conclude from the FAQ that builder seats are opt-in and from the footnote that they are triggered by activity.

Q5 answers a compound question ("How can I deploy… Can I self-host…") in one block, and includes the decision rule rather than only the options. Q4 is a **retronym-introduction question** — its real job is to teach the reader the phrase `classic app builder` so the docs' version banners make sense.

### Group 2 — `Frequent questions about AI credits` (4 questions)

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | What are AI credits? | Monthly pool included in every plan; pooled across the org; covers app building and AI actions; explicitly "no add-on, no separate billing" |
| 2 | How many apps can I build? | Answers in **three units**: "Enough for real work", then a range (36–84 apps/month on Business), then the arithmetic (≈12 credits per prompt, 3–6 prompts per app) |
| 3 | Do credits roll over? | Renew each cycle; base credits permanent; bonus credits "may change over time" |
| 4 | What happens if we need more credits? | Upgrade, buy packs, or BYOK (which doesn't draw from the pool) |

**Q2 is the standout FAQ answer in this file.** The question is unanswerable as asked, and instead of refusing it the answer gives three escalating levels of precision — a reassurance for the reader who wants to stop reading, a number for the reader who wants to compare plans, and the underlying rate for the reader who wants to model their own usage. "If it helps to think in prompts:" explicitly signposts the switch between levels. Q3 answers the roll-over question in the first clause and then volunteers the *unasked* caveat about bonus credits being impermanent.

### Group 3 — `Frequent questions about agents` (7 questions)

| # | Question (verbatim) | Answer substance |
|---|---|---|
| 1 | What are agents? | Definition plus the billing model in the same breath: hourly, and "do not draw from the AI credit pool" |
| 2 | Why does Retool use hourly pricing for agents? | Justifies by analogy to labour costing: "you pay for productive time, not tokens or runs" |
| 3 | Why do hourly rates vary by model? | Capability differences; ends by returning the choice to the reader ("You choose what matches the job") |
| 4 | What types of tasks are best suited for agents? | Six named task types, all repetitive and multi-step |
| 5 | What counts as agent runtime? | **Wall-clock definition with an explicit exclusion**: includes step execution, API waits and model processing; "Idle time waiting for human input is excluded" |
| 6 | What if I'm not sure how many hours I need? | Start on the free allocation and use the usage dashboard for a few weeks before committing |
| 7 | Can I use my own model provider keys? Will I pay separately for LLM usage? | Yes; routing and cost consequences of each choice stated separately |
| 8 | What happens when I use all my free agent hours? | "Agent execution pauses." Then the upgrade path |

**Q5 and Q8 are the two to steal.** Q5 defines a billing unit by stating what is *inside* the meter and then what is *outside* it — an exclusion clause in an FAQ answer, which is where customers actually look for it rather than in terms. Q8 answers a fear question with a three-word factual sentence (`Agent execution pauses.`) before offering the commercial remedy; the consequence is stated before the upsell, and the consequence is "pauses" rather than "stops" or "fails", which is both accurate and calming.

Two of the seven questions are `Why does Retool…` — the FAQ is used to **defend a pricing model**, not only to explain it. Q2's answer is an argument ("It mirrors how teams already value labor"), which is unusual and honest about the fact that hourly agent pricing is a choice requiring justification.

## T13 Terminology & glossary

| Term | Retool's usage | The alternative it rejected |
|---|---|---|
| `Retool` | Used as a place as well as a product: "deploy in Retool", "deploy it here within your governed Retool environment" | |
| `classic app` / `classic app builder` | **A retronym coined to name the old thing after the new thing shipped**, defined in the glossary and used as a version banner on ~every legacy page | "legacy app", "v1", "old editor" |
| `app builder` | The new builder, unqualified — the unmarked term | |
| `Builder` (capital B) | A seat type, defined behaviourally and by billing cycle | "developer", "editor" |
| `Internal user` / `External user` | The other two seat types, defined as complements | "viewer", "end user" |
| `business engineers` | Coined persona in the FAQ, listed between "developers" and "analysts" | "citizen developer" (the industry term Retool avoids) |
| `vibe-coded` | An internet coinage promoted to the homepage H1 and a URL slug (`/secure-vibe-coding`) | "AI-generated" |
| `AppGen` | Capability name for AI app generation, CamelCase | "App generation" |
| `AI primitives` | Umbrella for composable AI features | "AI building blocks" |
| `AI credits` | The billing unit for generation, pooled at account level | "tokens" — explicitly rejected in the FAQ: "you pay for productive time, not tokens or runs" |
| `Agents` | Billed hourly, on a separate meter from credits | |
| `Frame` | A named canvas region: `Header`, `Sidebar`, `Main`, `Drawer`, `Split Pane`, `Modal` | "layout slot", "region" |
| `Bottom Sheet` | The mobile-only modal, named after the platform convention | |
| `Repeatables` | Coined component category for row-per-record components | "iterators", "lists" |
| `Spacer` | A component whose description is "An empty area to add space between components." | |
| `Resource` | A saved connection configuration, distinguished from `Data source` (the thing it points at) | The two are defined separately in the glossary — a distinction most tools collapse |
| `Query` | User-written code that talks to a resource; explicitly "not part of a classic app's user interface" | |
| `Transformer` | "a reusable block of JavaScript" whose output lands on a `value` property | "computed field", "formula" |
| `Block` | The workflow unit; `Branch block`, `Code block` named as sub-types | "node", "step" — though `step` is used as the *billing* unit for the same object |
| `Module` | Reusable group of components and queries | "component", "partial" |
| `Thread` / `Branch` | Units of work in the new builder; a branch "can contain one or multiple threads" | |
| `Blueprint` | "A Retool-provided, fully supported installation path for self-hosted deployments" | "reference architecture" |
| `Core tool` / `Custom tool` | The two agent tool classes | |
| `Configuration Assistant` | An LLM that writes an agent's own instructions and tools | |
| `Data access enforcement` | A per-resource setting that "closes it by default across all environments" | "deny by default" |
| `Catch-up commit` | Retained in the glossary and marked obsolete inside its own definition | |
| `Spaces` / `Workspaces` | The pricing row is `Flexible spaces`, its gloss says "independent Workspaces" — **two names for one concept in one sentence** | |
| `Embedded expressions` | The `{{ }}` syntax, always named this way and glossed against template literals | "bindings", "interpolation" |
| `Dependency graph` | The evaluation model, explained by spreadsheet analogy | "reactivity" |
| `blessed self-hosted` | Appears in the Enterprise plan bullet list ("Managed cloud or blessed self-hosted, up to custom self-hosted and air-gapped deployment") — **unglossed internal jargon leaking into a pricing page** | |

**`classic app` deserves separate note as a content-strategy artefact.** Retool rebuilt its core product and, rather than calling the old one "legacy" (which devalues the install base) or "v1" (which is meaningless to non-engineers), it coined `classic` — a word that signals *still supported, deliberately preserved, not the default*. It is then applied with total consistency: a glossary entry, a `Tags` value (`Classic apps`), a version banner on every affected page, a docs area, a `Convert classic apps` migration guide, a comparison page (`Apps vs. classic apps`), and an FAQ answer that introduces the term. **One naming decision, propagated through seven content surfaces.** That propagation discipline is more transferable than the word itself.

**The version banner text** `[observed]`, appearing on every classic-apps page: "You're viewing documentation for classic apps, which use Retool's original app editor. The [new app builder] is the recommended way to build apps and where Retool focuses new development." Three facts in two sentences: where you are, what is recommended, and — the honest one — where engineering effort is going. That last clause tells a reader deciding whether to invest in classic apps what they actually need to know.

**Register split.** Marketing says `vibe-coded`, `AppGen`, `no IT veto`, `Ship internal tools 10x faster.`; pricing says `Builder`, `Internal user`, `billing cycle`; docs say `resource`, `transformer`, `embedded expressions`, `page-scoped`. The abstraction is highest at the top of the funnel and the jargon densest in the middle (pricing), which is unusual — Retool's pricing page is more technical than its docs' onboarding page, because its buyer is technical and its builder may not be.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, consistently and early ("Describe what you want and get a full, production-ready app", "you should have a good understanding"). First-person plural for the company in incident copy ("We're investigating", "We're working on a fix") and in refusals. Third-person-company in marketing ("Retool has entirely rebuilt the app builder", "Retool doesn't store your data") — the company is named rather than "we" on the pages meant to be forwarded to a security reviewer, which reads as more citable.

**Register gradient.** Marketing is punchy and colloquial, with contractions and negation triplets. Pricing is dense, technical, footnoted, and completely unplayful apart from the closing `Ship internal tools 10x faster.` Docs are procedural with two registers layered — the spreadsheet analogy for the analyst, the MDN link for the engineer, in the same paragraph.

**Zero exclamation marks observed** across all nine pages. No `Oops!`. The one place Retool could have been cute — the empty glossary — instead says `No glossary entries found.`

**The negation triplet is the house rhetorical device**, and it appears at every level: "no rebuild, no audit scramble, no IT veto" · "no add-on, no separate billing" · "no rebuild, no audit scramble, no IT veto" · "you pay for productive time, not tokens or runs" · "More teams building, no new risk". Retool defines itself by enumerating the things the reader will not have to do.

**Alt text is the best in this harvest.** `[observed]` Homepage images carry long, scene-level, purpose-explaining alt:

- "The app builder interface showing a chat-driven session with the AI assistant building the app on the left while a live preview renders a dark-themed financial dashboard on the right."
- "A split view showing a Claude Code terminal session where an AI agent is actively generating and deploying a Retool React app."
- "The Retool interface showing an "Import React code" panel with a drag-and-drop zone for uploading a .zip file."
- "A visual diagram showing Retool's integration ecosystem, with connector lines linking services like Snowflake, PostgreSQL, AWS, and Anthropic to a sequential workflow of query, transform, and response steps."
- "Retool apps layered over concentric arcs displaying compliance badges including SOC 2, SAML/SSO, and ISO 27001 on Retool Cloud."

These describe **what the screenshot is evidence of**, not merely what is in it. For product screenshots — where a sighted reader's takeaway is "this is a real product that does the thing" — that is the correct alt-text target, and Retool hits it. The app-gallery strip also gives every thumbnail a distinct descriptive name (`Corporate treasury dashboard app screenshot`, `Security operations console app screenshot`, `Logistics dispatch monitor app screenshot`), so the gallery is navigable non-visually.

**`Skip to main content`** present and first in DOM on both marketing (`#main-content`) and docs (`#__docusaurus_skipToContent_fallback`).

**Accessibility defects and suspected defects** `[observed]`

- **Doubled CTA labels.** Buttons render their text twice in the DOM: `Book a demoBook a demo`, `Start for freeStart for free`, `View app galleryView app gallery`, `Get started for freeGet started for free`, `Try Retool for freeTry Retool for free`, `Choose teamChoose team`. Almost certainly responsive duplicates, but if both copies are exposed the accessible name of every primary CTO on the site is its own label repeated. Flagged as suspected, not confirmed — CSS and `aria-hidden` were not inspected.
- **The app-gallery link's accessible name is 22 concatenated image alt strings.** The gallery strip is a single anchor wrapping ~22 `<img>` elements, each with its own alt; the resulting link name is a run-on of every screenshot description. Good alt text, wrong element boundary.
- **Customer logos carry bare company names as alt** (`Amazon Logo`, `Stripe Logo`, `Burger King Logo`) and the 23-logo strip is duplicated twice in the DOM for the marquee effect, so a screen-reader user may hear 46 company names. The word "Logo" in alt is redundant.
- `_` appears as the entire text content of three homepage capability cards — an apparent placeholder or divider leaking into content.
- The docs glossary's in-page contents lists 26 single-letter links (`A`, `B`, `C`, …) each pointing at an empty section — 26 keyboard stops to nothing.
- Retool's marketing pages declare `meta-color-scheme: dark` and `meta-theme-color: #151515`; the docs ship both light and dark background assets. Contrast was not measured. `[absent]`
- Status page exposes raw anchor fragments (`#updates-dropdown-email`, …) as the subscribe tabs' link text in the extracted DOM, and `x` as the dismiss control — the same Atlassian Statuspage pattern noted for DigitalOcean. Vendor-inherited, not Retool-authored.

**No published content style guide or design system found.** `[absent]` Retool ships a `custom component gallery` (a community-contributed component showcase) and documents `Custom component libraries`, but no voice-and-tone documentation, no writing guidelines, and no public design-system site was reachable. Given how systematic the component-description grammar is (T5), an internal rule almost certainly exists; it is not published.

**Feedback loops present** `[observed]`: `Was this page helpful?` `Yes` `No` on docs pages, and `Need more help? Ask Retool developers` with the current page title and URL **pre-populated into the forum's new-topic body** via query string. The hand-off carries context so the user does not have to re-explain where they were — a small, genuinely good piece of routing content design.

---

## Transferable patterns

1. **A closed set of type nouns for component descriptions.** `A button to …` / `An input field to …` / `A content area to display …` / `A container to group …` / `A group of …` / `An interface to …`. The reader predicts a component's behaviour class from the first three words. Condition: it only pays off if enforced across the whole library — Retool's own exceptions (`Display a Gantt chart of events.`) are exactly where the system stops helping. Directly applicable to any design-system component catalogue.
2. **Name callouts after their topic, not their severity.** `Dependency cycles`, `Supported browsers`, `JavaScript output` instead of `Warning`, `Note`, `Tip`. A scanning reader can decide relevance from the callout title alone. The cheapest high-value change available to most documentation sets.
3. **Define complementary billing terms as exact complements.** `Builder` = "built or edited … during the billing cycle"; `Internal user` = "did not build or edit … during the billing cycle". No gap, no overlap, customer can self-compute. Then put the mitigation next to the risk ("Internal users can be restricted from making edits via the permission controls"). Transferable to any seat-based or usage-based pricing disclosure.
4. **Answer an unanswerable usage question at three levels of precision.** "Enough for real work" → "36–84 apps per month" → "each AI prompt uses about 12 credits, and a typical app takes 3–6 prompts". Signpost the switch ("If it helps to think in prompts:"). Lets three different readers stop at three different depths.
5. **Define a metered unit by stating its exclusions.** "Wall-clock time from when an agent starts a task to when it finishes… Idle time waiting for human input is excluded." The exclusion belongs in the FAQ, where customers look, not only in terms.
6. **Coin a retronym rather than calling the old thing "legacy", then propagate it everywhere.** `classic app` lives in a glossary entry, a docs tag, a version banner, an area name, a migration guide, a comparison page, and an FAQ answer. The banner's third clause — "where Retool focuses new development" — tells the reader the one fact that actually drives their decision.
7. **Offer error recovery at three scopes and keep the user in the loop.** `Add to chat` (give me context, I'll steer) / `Fix` (you take this one) / `Fix all` (in the container header). The non-delegating option sits first. Increasingly relevant to any product wiring an agent into a failure surface.
8. **Scope your status page in prose.** "This page primarily reports incidents affecting Retool Cloud. Some components may also impact self-hosted (on-premise) deployments, which will be noted accordingly." Essential for any product with both hosted and customer-deployed modes.
9. **Distinguish "verified fine" from "not measured".** `No downtime recorded on this day.` versus `No data exists for this day.` Two nothings that mean different things to anyone reading an uptime record.
10. **Write alt text for what the screenshot is evidence of.** Not "screenshot of dashboard" but "…a chat-driven session with the AI assistant building the app on the left while a live preview renders a dark-themed financial dashboard on the right." Condition: pair it with the right element boundary — Retool's own gallery concatenates 22 good alt strings into one unusable link name.
11. **Double the explanation when two audiences read one page.** The dependency graph is explained once as a spreadsheet and once as template literals, in adjacent sentences. Cheaper and kinder than splitting the page or picking a winner.

## Caveats & gaps

- **The new app builder's component set was not found as a public list.** The flagged strength for this product is component labels, and the reference harvested is the **classic** component library, which Retool's own banners describe as not where development is focused. If the new builder ships a different component vocabulary, this file documents the outgoing one. An authenticated pass or a `docs.retool.com/build/apps/reference` sweep is needed.
- **Individual component pages were not opened** — only the index and its one-line descriptions. Property tables, event names, validation-message text, and per-component accessibility notes are unharvested. That is where in-product field labels and error strings would live.
- **All in-product copy is `[documented]`.** Inspector labels, toasts, validation text, the debug console's actual error strings, and every empty state inside the builder are quoted from docs prose or not seen at all.
- **No error-code reference exists on Retool's public surfaces.** Searched and confirmed absent; troubleshooting is organised as per-area guides. The only literal error string captured is `"Session not found"` from a status-page incident note. **No error codes appear in this file because none were observed.**
- The site-wide glossary (~1,800 lines) was sampled across A–D plus targeted lookups for lifecycle terms, not read in full. Entries quoted are verbatim; the absence of a term from this file does not mean it is absent from the glossary.
- **Not harvested**: `trust.retool.com`, `docs.retool.com/legal/security`, `docs.retool.com/legal/privacy-policy`, `community.retool.com`, `university.retool.com`, `/app-gallery`, `/templates`, `/integrations`, the four lifecycle pages (`/build-enterprise-apps` etc.), `/secure-vibe-coding`, and the changelog.
- **The homepage is heavily client-rendered.** Scroll-triggered capability cards appear both in their narrative positions and again as a flat image list at the end of the DOM; the `_` strings in three cards suggest the extraction did not capture everything. Some homepage structure in T2 is inferred from DOM order rather than from visual layout.
- Accessibility findings on doubled CTA labels, the gallery link name, and logo-strip duplication are **suspected, not confirmed** — no ARIA attributes, CSS, or accessible-name computation were inspected.
- Only en-US observed; no locale switcher present to test.
- No `last updated` / `last verified` metadata exists on Retool docs pages, so **content freshness could not be assessed** for any docs quotation in this file.

## Sources

1. https://retool.com/
2. https://retool.com/pricing
3. https://docs.retool.com/
4. https://docs.retool.com/apps/quickstart
5. https://docs.retool.com/apps/reference/components
6. https://docs.retool.com/apps/reference/glossary
7. https://docs.retool.com/glossary
8. https://docs.retool.com/build/apps/concepts/debug
9. https://status.retool.com/
