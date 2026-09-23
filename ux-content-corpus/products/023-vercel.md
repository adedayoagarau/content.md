# 023. Vercel

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Frontend deployment platform / edge compute and agentic infrastructure |
| Primary URL | https://vercel.com/ |
| Corpus rank | 023 |
| Benchmark strength (source list) | Deployment status and errors |
| Locale / market observed | en-US (`meta-og:locale: en_US`, no locale switcher observed) |
| Platform observed | Web (marketing), vercel.com/docs (**serves `text/markdown` natively**), vercel-status.com (Statuspage) |
| Regulatory posture | `Trust Center` hosted off-domain at `security.vercel.com`; named legal set includes `DPA`, `Acceptable Use Policy`, `Cookie Policy`; `Fair Use Guidelines` is a distinct docs page cited from error copy; `Compliance` is a docs nav item |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 13 |
| Harvest completeness | **Full for T6, T7, T13** — the reason this product is in the corpus. Partial for T1–T3 (marketing copy is animation-driven and largely absent from server HTML). T4, T5, T8, T9, T12 thin or absent. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://vercel.com/ | Hero, three rotating subheads, three customer pillars; most body copy is animated and not in server HTML |
| Error Codes (index) | https://vercel.com/docs/errors | The taxonomy page: `Application errors` / `Platform errors` as the two top-level classes (lists client-rendered, empty in source) |
| Error List (general) | https://vercel.com/docs/errors/error-list | **~35 named dashboard/CLI/config errors with cause and fix** — the richest single page |
| `FUNCTION_INVOCATION_TIMEOUT` | https://vercel.com/docs/errors/FUNCTION_INVOCATION_TIMEOUT | Full rendered error page: code, status, reason phrase, troubleshoot steps, **Agent Prompt** |
| `FUNCTION_THROTTLED` | https://vercel.com/docs/errors/FUNCTION_THROTTLED.md | Markdown form; three-step troubleshoot |
| `DEPLOYMENT_BLOCKED` | https://vercel.com/docs/errors/DEPLOYMENT_BLOCKED.md | Six-step troubleshoot including "check the status page" |
| `DNS_HOSTNAME_NOT_FOUND` | https://vercel.com/docs/errors/DNS_HOSTNAME_NOT_FOUND.md | DNS-class error; `NXDOMAIN` surfaced to users |
| REST API Errors | https://vercel.com/docs/rest-api/errors | **~35 machine codes with verbatim `message` strings and JSON shape**, grouped into five families |
| Custom error pages | https://vercel.com/docs/custom-error-pages | Error-page fallback routing, **token interpolation (`::vercel:ERROR_CODE::`)**, example copy |
| Deploying to Vercel | https://vercel.com/docs/deployments | Five deployment methods, three environments, dashboard action vocabulary |
| Glossary | https://vercel.com/docs/glossary | **~130 defined terms A–W** — the best terminology artefact in the corpus so far |
| Account Plans | https://vercel.com/docs/plans | Three plans, quota-exhaustion behaviour per plan, billing FAQ-as-headings |
| Status page | https://www.vercel-status.com/ | **~70 components including 20 named CDN regions**; 5 incident-state labels; 11 days of incident prose |
| Cross-link map | https://vercel.com/docs/errors.graph.md | A machine-readable inbound/outbound link graph published per page |

---

## T1 Navigation & IA labels

**Global nav — four items** `[observed]`

`Products` · `Resources` · `Enterprise` · `Pricing`, with `Get a Demo` · `Log In` · `Sign Up` · `Ask AI` · `Dashboard` as the action cluster.

The shortest primary nav of the five products in this batch, and `Ask AI` is a **nav-level control**, not a widget — an AI query entry point given the same weight as `Log In`.

**Products menu — three groups, and the first group name is the 2026 positioning** `[observed]`

| Group | Members |
|---|---|
| `Agent Stack` | `AI SDK` · `AI Gateway` · `Sandbox` · `Passport` · `Connect` · `eve` |
| `Core Platform` | `Security` · `Content Delivery` · `Fluid Compute` · `Observability` · `Workflows` · `CI/CD` |
| `Tools` | `Next.js` · `Vercel Agent` · `Vercel Plugin` · `Open Source` · `Domains` · `v0` |

`Agent Stack` listed **above** `Core Platform` is the whole strategic claim in one ordering decision: the AI product line is the primary offer and the hosting platform is the substrate. Compare GitHub (`AI CODE CREATION` first, then `DEVELOPER WORKFLOWS`) and GitLab (`Execution & Workflows` first, `Context & AI` last). All three ship an AI grouping; only Vercel and GitHub put it first.

Note `Security` sits inside `Core Platform` on the homepage nav but has its own `Security` footer column with four members (`Platform Security`, `WAF`, `Bot Management`, `BotID`) — so security is a nav child and a footer parent simultaneously.

Nav items carry **no inline gloss** — `Passport`, `Connect`, `eve`, `Fluid Compute`, and `v0` are all bare coined labels. Four of the six `Agent Stack` items are unguessable from the label alone. Vercel's compensating mechanism is the glossary (T13), which is a docs artefact rather than a nav one. Against GitHub's noun-plus-imperative pattern (`Actions` — "Automate any workflow"), this is the weakest naming affordance of the three code platforms.

**Docs nav — two groups, four subgroups, and the subgroup names are verb pairs** `[observed]`

| Group | Subgroup | Members |
|---|---|---|
| `Build` | `Build with AI` | `AI Gateway` · `AI SDK` · `Sandbox` · `Container Registry` · `Workflow` · `Vercel Agent` · `v0` · `Vercel MCP` · `AI Integrations` |
| `Build` | `Deploy & scale` | `Deployments` · `CLI` · `Functions` · `Delivery Network` · `Storage` · `Integrations` · `Microfrontends` · `Domains` |
| `Build` | `Operate & protect` | `Firewall` · `Observability` · `Feature Flags` · `Toolbar` · `Bot Management` · `BotID` · `Deployment Protection` · `Compliance` |
| `Learn` | `Resources` | `Changelog` · `Blog` · `Community` · `Knowledge Base` · `APIs & SDKs` · `Templates` |

`Build with AI` / `Deploy & scale` / `Operate & protect` — three **verb-led lifecycle stages**, two of them coordinated verb pairs. This is a cleaner IA statement than the marketing nav, and it maps to the application lifecycle rather than to Vercel's org chart. `Compliance` sitting inside `Operate & protect` (rather than under a legal or trust heading) is a deliberate reframing of compliance as an operational activity.

**Two distinct documentation properties, named differently** `[observed]`: `Docs` (vercel.com/docs — reference and how-to) and `Knowledge Base` (vercel.com/kb — troubleshooting guides, `/kb/guide/…` URLs). Error pages routinely link out to `/kb/guide/…` articles with question-form titles (`What can I do about Vercel Functions timing out?`, `What should I do if I receive a 503 error on Vercel?`, `How to debug 404 errors`). **The split is by grammar as much as by content**: Docs titles are noun phrases and imperatives; KB titles are user questions. A reader with a symptom goes to KB; a reader with a task goes to Docs.

**Docs pages publish machine-readable IA metadata in YAML front matter** `[observed]` — and this is the single most distinctive IA finding in this file:

```
title / product / url / canonical_url / last_updated /
type: conceptual | reference | how-to /
prerequisites: [] / related: [...] / summary /
install_vercel_plugin: npx plugins add vercel/vercel-plugin
```

Every docs page declares its own **`type`** from a three-value content taxonomy (`conceptual`, `reference`, `how-to`), its `prerequisites` as an explicit array, and its `related` pages. This is Diátaxis-style classification made machine-readable and *served to the reader*, because vercel.com/docs returns `Content-Type: text/markdown` to non-browser clients.

**Vercel also publishes a per-page cross-link graph** `[observed]` — `/docs/<path>.graph.md`, with a stated scope and build timestamp:

> "From the Vercel docs graph (built 2026-09-21T05:26:59.511Z), spanning vercel.com docs + KB, nextjs.org, ai-sdk.dev, and other Vercel documentation sites. Full graph as JSON: https://vercel.com/docs/graph.json"

Sections within it: `Semantically closest pages`, `Pages that link here (10)` with a per-site breakdown (`By site: vercel-changelog (2) · vercel-kb (1) · vercel-docs (7)`), grouped under `### From vercel-changelog` etc. **Inbound links published as user-facing content.** For a content designer this is an IA audit tool shipped as a page: you can see which pages depend on the string you are about to change.

**The `related` block is addressed to a non-human reader, in the second person** `[observed]`:

> "**For AI agents:** Follow these links to understand how this page connects to the rest of the Vercel ecosystem. For the full cross-link map (inbound, outbound, prerequisites, and semantic neighbors), see the .graph.md link below."

A labelled aside written *to agents* and rendered visibly to humans. This is the clearest instance in the whole corpus of documentation IA being redesigned for a machine audience without hiding it from people.

**Footer — eleven columns** `[observed]`: `Agent Stack` · `Core Platform` · `Security` · `Tools` · `Frameworks` · `SDKs` · `Build` · `Learn` · `Explore` · `Company` · `Legal & Trust` · `Social`.

`Legal & Trust` as a single combined heading (rather than separate legal and security columns) is notable — it groups `Privacy Policy`, `Terms of Service`, `Cookie Policy`, `DPA`, `Acceptable Use Policy`, `Legal (all documents)`, `Trust Center`, `Status`, and `Cookie Preferences` under one label, so the status page sits in the same grouping as the DPA. Framing uptime as a trust artefact alongside legal ones is defensible and unusual.

`Frameworks` and `SDKs` as separate footer columns with nine and six members is a **partner/ecosystem IA** most platforms compress into one "integrations" link. And `Is Agentic` (is-agentic.com) sits in the `Learn` column — an editorial microsite given the same footer weight as `Docs`.

**`New` badges are inline in footer labels** `[observed]`: `Vercel DropNew`, `Vercel PluginNew`, `ConnectNew`, `PassportNew`, `eveNew`, `Workflow SDKNew`, `Chat SDKNew`, `Queues SDKNew`. Rendered run-together in the served text, so the accessible name of the link is `Vercel DropNew`. **Defect** — a visual badge that concatenates into the link text.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> H1: `Agentic Infrastructure`
> Meta description and `og:description`: "The autonomous stack for every app and agent."
> `<title>`: `Agentic Infrastructure - Vercel`

A **two-word noun-phrase H1** with no verb, no benefit, and no audience. The shortest hero in this batch by a wide margin, and the only one that is purely a category claim. Vercel is not describing what you can do; it is naming the category it intends to own. That works only for a brand whose audience already knows the product — and it is a real risk for anyone arriving cold, since `Agentic Infrastructure` is not a term with settled public meaning.

**The subhead is a rotating triptych, and the three variants are visible in source as a run-on string** `[observed]`:

> `To ship apps and agents` · `For coding agents` · `For coding agents to ship apps and agents automated by agents.`

With three matching expansion sentences:

- "For coding agents to deploy in their native language, with Vercel's API, CLI, MCP, and Skills."
- "To ship apps and agents in Sandboxed VMs, with durable backends, powered by hundreds of models."
- "Automated by agents who autonomously investigate errors, plan fixes, and open PRs."

The composite final frame — `For coding agents to ship apps and agents automated by agents.` — uses the word *agent* **three times in eleven words**. It is grammatically valid and semantically almost empty. This is the standout negative finding in the file: a rotating headline whose end state is a tautology. It also serialises badly (the three variants concatenate in the DOM, so a screen-reader user may receive all three as one sentence).

The third expansion sentence is the good one: "Automated by agents who autonomously investigate errors, plan fixes, and open PRs." Three concrete agent actions, one of which (`open PRs`) is a verifiable artefact. Note **`agents who`** rather than *agents that* — agents given animate relative pronouns. A small grammatical choice with a large positioning implication, and consistent with GitLab's "Teams orchestrate from above the lifecycle while agents execute within it."

**Section headers are `<verb> <object> that <clause>` — three of three** `[observed]`

- `Build agents on infrastructure that thinks like them`
- `Ship apps that scale from zero to millions instantly`
- `Host platforms that serve every customer`

A rigorously consistent template: imperative verb (`Build` / `Ship` / `Host`), object (`agents` / `apps` / `platforms`), relative clause carrying the differentiator. Three audiences, three verbs, one shape. This is the tightest headline system in the batch and the most directly copyable thing on Vercel's marketing surface.

`infrastructure that thinks like them` is the strongest phrase — it personifies the platform *by analogy to the agent* rather than to the developer, which is a genuinely new move.

**Each section carries a single customer proof sentence, with one number** `[observed]`

- "Notion powers millions of agent conversations daily on Vercel."
- "Zapier serves over 100 million monthly website visits on Vercel."
- "Mintlify powers documentation for over 20,000 companies on Vercel."

Identical shape: `<Customer> <verb>s <quantified workload> on Vercel.` One sentence, one metric, trailing `on Vercel`. Compare GitLab's eleven-metric carousel; Vercel ships three and attaches each to a named section rather than a wall. The restraint reads as more confident. Note "millions of agent conversations" is the only unquantified one — "millions" where the others give a figure.

**Feature lists are four bare nouns per section, under a `Features` label** `[observed]`

| Section | Features |
|---|---|
| Agents | `Durable Orchestration` · `Sandboxed Environments` · `AI Model Gateway` · `Fluid Compute` |
| Apps | `Global Delivery` · `Deployment Environments` · `Serverless Functions` · `Web Application Firewall` |
| Platforms | `Tenant Isolation` · `Domain Management` · `Custom SSL Certificates` · `Preview URLs` |

Twelve capability names, title case, no glosses, no CTAs. Note these are **descriptive category names, not product names** — `AI Model Gateway` rather than `AI Gateway`, `Serverless Functions` rather than `Vercel Functions`, `Global Delivery` rather than `Content Delivery`. The marketing page describes capabilities generically and the nav names them proprietarily. A deliberate register split: sell the category on the landing page, brand it in the menu.

**`Recently shipped` as a homepage section** `[observed]` — three cards, and the third contains a **simulated terminal transcript as marketing copy**:

> `▲ vercel deploy` / `Vercel CLI` / `- ✓ Building image from Dockerfile.` / `vercel - ✓ Stored image in your project's registry` / `- ✓ Deployed to Fluid compute Production: https://my-server.vercel.app`

Shipping CLI output as a hero card is a register choice aimed squarely at people who read logs. The success-line format (`✓ <past-participle phrase>`) is itself a status-copy artefact worth noting for T6: `Building image from Dockerfile.` uses the *present participle* for a completed step, which is technically wrong for a `✓` line.

**Product taglines observed on the `Recently shipped` cards** `[observed]`

- `eve` — "A framework for building durable agents."
- `Passport` — "Secure every internal agent, app, and deployment with your identity provider."
- `Containers` — "Run production workloads in isolated containers on Vercel."

All three are single sentences with full stops; two are imperatives. `Passport`'s tagline is the only place on the homepage where a coined product name gets an explanatory gloss — and the card itself shows the word *passport* rendered in five languages (`Passport - Pasaporte - Passaporto - パスポート Iss 2026`) as a visual device, which appears in the accessible text as noise.

**Closing CTA header** `[observed]`: `Built by you, or your agents` — with `Deploy now`, `Onboard your agent`, and `Paste to your agent` as its three actions. A CTA cluster where two of three actions are addressed to a non-human executor.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up` | Global nav, docs nav | Title case on both words |
| `Log In` | Global nav, docs nav | `Log In` — **Vercel uses "log in" where GitHub's Primer mandates "sign in"**; a direct divergence between two adjacent developer brands |
| `Get a Demo` | Global nav | Indefinite article inside a button label |
| `Talk to sales` | Hero secondary | Sentence case |
| `Deploy now` | Hero primary, and repeated at page foot | Points to `/new` |
| `Ask AI` | Global nav and docs nav | An AI entry point promoted to primary nav on both surfaces |
| `Dashboard` | Global nav (authenticated affordance shown to logged-out users) | |
| `Get your ticket` | Event banner (`Ship 26 is coming to SF`) | |
| `Onboard your agent` | Homepage close | |
| `Paste to your agent` | Homepage close | **A CTA whose object is a clipboard operation performed by the user on behalf of software** |
| `Drop to deploy` | Hero, beside a loading state | Four-word alliterative instruction doubling as a product name (`Vercel Drop`) |
| `Getting Started` | Docs nav | Title case; the docs URL is `/docs/getting-started-with-vercel` |
| `Copy page` | Docs article header | **Copies the page as markdown for pasting into an AI tool** |
| `Copy Wordmark` / `Copy Logo` / `Download Brand Assets` / `Brand Guidelines` | Logo context menu | Brand assets exposed from a right-click on the logo on every page |
| `Skip to content` | Top of DOM (`#geist-skip-nav`) | Named after the design system (`geist`) |
| `Show more` | Error pages, collapsing the Agent Prompt | |
| `Was this helpful?` → `Send` | Error page foot | Free-text feedback, not a Yes/No pair — **differs from GitHub's binary widget** |
| `Learn more →` | Docs `Explore deployments` cards, ×9 | Trailing arrow; bare `Learn more` with the object supplied by the card title |
| `Select a display theme:` → `system` / `light` / `dark` | Footer | Theme control labelled with a colon-terminated instruction |
| `Cookie Preferences` | Footer, `Legal & Trust` | Not a link in the served markup |
| `Deploy` | Vercel Drop flow (documented) | |
| `Redeploy` | Deployment actions (documented) | "Re-run the build for a specific commit or configuration." |
| `Inspect` | Deployment actions (documented) | "View logs and build outputs." |
| `Assign a Custom Domain` | Deployment actions (documented) | Only action of the four with an article and a capitalised object |
| `Promote to Production` | Deployment actions (documented) | "Convert a preview deployment to production (if needed)." |
| `Promote` | Error-list recovery instruction | **The short form of `Promote to Production`, used in error copy as the fix for "Production deployment cannot be redeployed"** |
| `Resources` / `Deployment Summary` / `Deployment Details` / `Project Overview` / `Deployments` | Dashboard surface names, quoted in docs in bold | |
| `Middleware` / `Static Assets` / `Functions` | Resources-tab sub-labels (documented) | |
| `Logs` / `Analytics` / `Speed Insights` / `Observability` | Destinations from a function's three-dot menu (documented) | |
| `Override` | Project setting, named in error recovery | "disable the **Override** option to default to the preferred settings" |
| `Settings → Git` | Path notation used inside error recovery copy | Arrow notation for a settings path |
| `Upgrade to Pro` | Error recovery, `repo_links_exceeded_limit` | Plan-specific remedy inside an error page |
| `Request a limit increase` | Error recovery, same error, Pro/Enterprise branch | |

**Observations.** Vercel's public CTA surface is small — most of the homepage's interaction is animated and absent from server HTML — but two things stand out.

First, **three CTAs address an agent rather than the reader**: `Onboard your agent`, `Paste to your agent`, and `Ask AI`. Plus `Copy page` on every docs article, whose purpose is to move the page into an LLM. No other product in this batch ships agent-directed CTAs.

Second, **`Log In` vs GitHub's mandated `Sign in`** is a clean example of two neighbouring brands landing on opposite sides of the same microcopy question, and Vercel additionally title-cases both words where GitHub sentence-cases. Neither is wrong; the divergence is the finding.

Third, the **deployment action vocabulary is unusually precise**: `Redeploy` (re-run the same build), `Promote to Production` (change a preview's role without rebuilding), `Instant Rollback` (revert), and `Rolling Releases` (fractional promotion) are four distinct named operations on one object. Most platforms ship "deploy" and "roll back". The distinction between `Redeploy` and `Promote` is load-bearing and is explained in error copy (see T7).

## T4 Onboarding & getting-started

`[observed]` — Vercel's onboarding content is structured around **five named deployment methods, ordered by decreasing setup cost**, which is the reusable artefact:

| Method | Framing sentence |
|---|---|
| `Git` | "The most common way to create a deployment is by pushing code to a connected Git repository." |
| `Vercel Drop` | "lets you deploy a file or folder by dragging it into your browser. **You don't need Git, the CLI, or any local setup.**" |
| `Vercel CLI` | "create deployments from a terminal, CI pipeline, **or coding agent with terminal access**" |
| `Deploy Hooks` | "let you trigger deployments with a unique URL." |
| `Vercel REST API` | "when a service **or agent** needs to create deployments through HTTP rather than a local checkout." |

The `Vercel Drop` entry is the best-written onboarding sentence in this batch: it names the interaction (`dragging it into your browser`) and then **lists the three prerequisites it removes**. Naming the absent requirements is more persuasive than naming the present capability, and it is the exact inverse of the usual feature sentence.

Two of the five method descriptions explicitly name an *agent* as the actor. `coding agent with terminal access` is a precise audience descriptor — not "AI", but the specific capability that makes the CLI relevant.

**Three-step quickstart per method, imperative and numbered** `[observed]`. For Drop:

> 1. Go to vercel.com/drop. 2. Drag a project folder onto the page. 3. Choose a team and project name, then select **Deploy**.

For Deploy Hooks: "From your Project settings, create a Deploy Hook" → "Vercel generates a unique URL for each Project" → "Make an HTTP `GET` or `POST` request to this URL to trigger the deployment". Note step 2 is a **system action, not a user action** — Vercel narrates what the platform does between the user's steps rather than eliding it. A three-step list in which the middle step belongs to the machine.

**The docs front page of `/docs/deployments` leads with three copy-pasteable command blocks before any prose** `[observed]`, labelled with `####` headings:

> `Create a deployment` → `vercel deploy`
> `Verify a preview` → `vercel curl / --deployment your_preview_url_here` and `vercel logs --deployment your_preview_deployment_id_here --level error`
> `Deploy to production` → `vercel deploy --prod`

Commands before concepts. And the placeholder convention is `your_preview_url_here` — a self-describing snake_case placeholder with an explanatory comment above it ("Replace these values with the URL and ID printed by `vercel deploy`"). Compare GitHub's `RUN_ID` / `OWNER` / `REPO` screaming-case convention. Vercel's is more obviously a placeholder to a beginner; GitHub's is more obviously a variable to a scripter.

Note the second block's framing verb: **`Verify a preview`**, and the page summary reinforces it — "Verify each deployment URL before you send changes to production." Onboarding that includes a verification step as a named phase, with the specific commands to perform it, is rare. Most quickstarts end at "it worked".

**Three environments, defined as activities rather than as places** `[observed]`

> 1. **Local Development**: developing and testing code changes on your local machine
> 2. **Preview**: deploying for further testing, QA, or collaboration **without impacting your live site**
> 3. **Production**: deploying the final changes to your user-facing site with the production domain

Each gloss is a gerund phrase, and the Preview gloss carries the reassurance clause that makes the concept land. Also note the naming inconsistency in the same passage: "Vercel provides three default environments: **Local**, **Preview**, and **Production**" — then the numbered list calls the first `Local Development`. **Two names for one environment, two sentences apart.**

`[absent]` — no account-creation or signup-form copy is reachable; `/signup` was not harvested.

## T5 Form & field labels

`[absent]` for product forms — Vercel's dashboard is entirely behind auth and the marketing site has no forms in server HTML.

`[observed]` — the only live form furniture is on the status page (Statuspage boilerplate): `Email address:`, `Enter OTP:`, `Country code:`, `Phone number:`, `Webhook URL:` with the hint "The URL we should send the webhooks to", and `Email address:` with the hint "We'll send you email if your endpoint fails". Colon-terminated labels, first-person-plural hint text. Third-party furniture, identical to the GitHub status page.

`[observed]` — one product-adjacent free-text control: the docs feedback widget, `Was this helpful?` followed by `Send` and the fragment `supported.` (a truncated string in the served markup — likely "…files are supported" or similar from an attachment affordance). **Defect**: a dangling word in the accessible text.

`[documented]` — validation *rules* appear in error copy rather than as field help, which is the notable inversion. Constraints are published as error-list entries:

- Project names: "can only consist of up to one hundred alphanumeric lowercase characters. Hyphens can be used in between words in the name, **but never at the start or end**."
- Environment variable keys: "The only valid characters are letters, digits and `_`", max 256 characters
- Environment variable values: max 65536 characters
- Environment variables per deployment: 100
- Open team-join requests: 10

Every one of these is documented as the *consequence of violating it* (`env_key_invalid_characters`, `env_key_invalid_length`, `env_value_invalid_length`, `env_too_many_keys`, `Maximum team member requests`) rather than as a field constraint. A user learns the rule by breaking it. For a developer product with a config-file interface and no form, that is defensible — but it means the constraint copy lives in T7, not T5.

**Error-message interpolation convention** `[documented]` — REST API messages use **screaming-case placeholder tokens inline in the prose string**:

- `"Could not find the RESOURCE: ID"`
- `"This endpoint only responds to METHOD"`
- `"You don't have access to \"DOMAIN\""`
- `"The env key \"KEY\" exceeds the 256 length limit"`
- `"Not allowed to access secret \"NAME\""`
- `"The domain \"NAME\" already exists"`
- `"Too many env vars have been supplied (100 max allowed, but got #)"`

Two interpolation styles coexist: bare `RESOURCE`, `METHOD`, `ID` (unquoted, unmarked) and `\"KEY\"` / `\"DOMAIN\"` (double-quoted). And a third, `#`, documented separately: "`#` is your number of variables." **Three placeholder conventions in one error catalogue.** The quoted form is the better one — it makes the boundary of the interpolated value visible, which is exactly the class of bug that produced the Wise exemplar's empty-quotes defect.

## T6 Status & state language

Along with T7, the reason this product is in the corpus. Vercel's state vocabulary is spread across three layers — deployment lifecycle, incident status, and release maturity — and the third is the unusual one.

### 6.1 Deployment lifecycle vocabulary `[documented]`

Vercel's canonical definition ties state to outcome: **"A deployment on Vercel is the result of a successful build of your project."** So a deployment, by definition, is a *succeeded* build. Failed builds are not deployments. That single definitional choice explains the shape of the rest of the vocabulary.

Named states and state-bearing concepts observed:

| Term | Source / gloss |
|---|---|
| `Preview Deployment` | "created from non-production branches that allows you to test changes in a live environment before merging to production" |
| `Production Deployment` | "The live version of your application that serves end users, typically deployed from your main branch" |
| `canceled`, `errored`, `preview`, `production` | The four deployment classes named in `Deployment Retention`: "Configure separate retention windows for **canceled, errored, preview, and production** deployments" |
| `initializing` | Observed on the status page: `Deployment stuck in initializing state` |
| `initialized` | Observed in the *same* incident's body: "causing deployments to get stuck in an **initialized** state" |
| `Build` | "The process Vercel runs on every deployment that compiles, bundles, and optimizes your application" |
| `Checks` | "Automated tests and assertions that run after every successful deployment to validate quality, performance, and reliability" |
| `Deployment Checks` | "Conditions that must pass before Vercel promotes a build to your production domains" |
| `Rolling Releases` | "rolls out a new build to a configurable fraction of traffic before promoting it to 100%" |
| `Instant Rollback` | Named revert operation |
| `Skew Protection` | "prevents version mismatches between client and server during a deployment by pinning framework-managed requests to a specific deployment ID" |
| `Promote` | The operation that changes a preview into production without rebuilding |
| `Redeploy` | Re-run the build for a specific commit or configuration |

**The `initializing` / `initialized` inconsistency is a live, published defect** `[observed]`. One incident on 18 September 2026 is titled `Deployment stuck in initializing state`; its `Monitoring` update says "deployments to get stuck in an **initialized** state"; its `Investigating` update says "getting stuck in an **initializing** state". Three references, two different state names, one incident. The gerund (`initializing`) describes an in-progress state; the past participle (`initialized`) describes a completed one — and they mean opposite things. This is exactly the class of error that erodes trust in status pages, because the reader cannot tell whether the deployment is mid-setup or finished-and-hung.

**`canceled` / `errored` as retention categories** is the interesting structural point: Vercel treats terminal deployment states as *data-lifecycle* categories with separate configurable retention windows. A state's name is also a storage policy key. `errored` (rather than `failed`) is Vercel's term, which diverges from GitHub's `failure` and GitLab's `failed`.

**`Checks` vs `Deployment Checks`** are two glossary entries with overlapping names: the first runs *after* a successful deployment to validate it; the second gates *promotion* to production. Two similar labels, two different positions in the pipeline. A user reading "checks failed" cannot tell which gate they hit.

### 6.2 Incident status — five update labels and a two-verb resolution style `[observed]`

Update labels observed on vercel-status.com, in lifecycle order:

`Investigating` → `Identified` → `Update` → `Monitoring` → `Resolved`

Vercel ships **`Identified`**, which GitHub does not. Its boilerplate is: `The issue has been identified and a fix is being implemented.` That intermediate state — cause known, fix not yet deployed — is the single most useful addition to the standard four-stage lifecycle, because it is the point at which a user stops needing to investigate on their own. GitHub's ladder jumps from `Investigating` to `Monitoring`, hiding that transition.

**Recurring boilerplate, verbatim:**

- `We are currently investigating an issue causing an elevated rate of deployments getting stuck in an initializing state. We will provide additional updates as they become available.`
- `We are currently investigating an issue causing increased errors triggering deployments. We'll provide additional updates as they become available.`
- `We are continuing to investigate an issue causing elevated errors triggering deployments. We'll provide additional updates as they become available.`
- `The issue has been identified and a fix is being implemented.`
- `A fix has been implemented and we are monitoring the results.`
- `This incident has been resolved.`

Note `We will provide` in one and `We'll provide` in the next — **contraction inconsistency inside a single incident's update chain**, twenty-four minutes apart.

**Severity/scale adjectives** `[observed]`: `elevated rate of`, `elevated errors`, `increased errors`, `degraded`, `Failures delivering`, `Missing`, `Paused`. `elevated` and `increased` are used interchangeably for the same condition in consecutive updates of the same incident. Same defect class as GitHub's `degraded performance` / `degraded availability` / `impacted performance` drift.

**Incident titles — four shapes** `[observed]`

| Shape | Examples |
|---|---|
| Symptom as noun phrase | `Deployment stuck in initializing state` · `Invoice Generation Paused` |
| `Elevated <thing>` | `Elevated Errors Triggering Deployments` · `Elevated Vercel KMS and Connect Errors` · `Elevated error rate on Connect and Passport` |
| `<Gerund> <object>` | `Failures delivering Logs to Drains` |
| `Missing <data>` | `Missing Web Analytics and Speed Insights data` |

Title Case and sentence case both appear (`Elevated Errors Triggering Deployments` vs `Elevated error rate on Connect and Passport`) — **inconsistent casing across incident titles**.

**The strongest incident-communication finding: Vercel states the negative scope explicitly.** Three of the eight resolved incidents carry a sentence whose only job is to tell most readers they were not affected:

> `Existing deployments and traffic are unaffected and no action is required.`
> `Product availability and usage are unaffected, and no further action is required.`
> `No additional actions are required.`

`<X> are unaffected and no action is required` is a reusable template. It answers, in one clause, the two questions every status-page reader has — *am I hit* and *must I do something* — and it does so in the **Resolved** note where a reader arriving late will see it first. This is the sharpest thing in Vercel's status vocabulary and the clearest transferable pattern for any payment, dispute, or outage notice.

**Retro prose is short, structured, and admits unrecoverable loss** `[observed]`. The Drains incident, in full shape: UTC window → who was affected → cause → fix → **irrecoverability**:

> "Between September 16, 2026 11:06 UTC and September 17, 2026 07:11 UTC, some customers experienced failed drain deliveries. An update caused larger payloads to exceed a 5 MB delivery-size limit at some Drain destinations. We have implemented a fix that splits larger payloads into smaller payloads before delivery. **Affected Drains data could not be redelivered.**"

Four sentences. The cause is named with the specific numeric limit (`5 MB`), the fix is named mechanically (`splits larger payloads into smaller payloads`), and the final sentence states permanent data loss in the passive, without hedging or apology. Stating what cannot be recovered — rather than stopping at "resolved" — is the honest move and is entirely absent from GitHub's equivalent notes.

**One incident is written as a running log in a single field** `[observed]` — the `Invoice Generation Paused` note contains three updates separated by `---` horizontal rules, in **reverse chronological order inside one Resolved entry**:

> "Invoice generation has been re-enabled." / `---` / "We've identified the issue and expect to resolve by end-of-day today." / `---` / "We've temporarily paused invoice generation. Invoices may arrive later than usual. Product availability and usage are unaffected, and no further action is required. We're working on an update to re-enable invoice generation and we'll provide another update when invoicing resumes."

A defect in the incident-comms tooling or process — the update chain was collapsed into one field rather than posted as separate timestamped updates. The copy itself is good (`Invoices may arrive later than usual` is a precise, low-alarm consequence statement for a billing pause), but the reader gets no timestamps for the intermediate states.

### 6.3 Status page components — ~70, including 20 named CDN regions `[observed]`

Rollup: `All Systems Operational`. Legend: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance` — identical to GitHub's, because both are Statuspage.

Top-level components: `AI Gateway` · `API` · `Build & Deploy` (containing `Builds`, `npm Registry`, `CI/CD`, `Deploy Hooks`, `Git Integrations`, `Integration Webhooks`) · `CDN` (containing 20 regions) · `Community` · `Cron Jobs` · `Dashboard` (containing `Dashboard`, `Support Center`, `Support Chat`) · `Data Cache` · `DNS` · `Domain Registration` · `Firewall` · `Functions` · `Image Optimization` · `Observability` (containing `Drains`, `Logs`, `Observability`, `Speed Insights`, `Web Analytics`) · `Marketplace` · `Queues` · `Remote Caching` · `Routing Middleware` · `SAML Single Sign-On` · `Sandbox` · `Secure Compute` (containing `Builds`, `TLS Certificates`) · `Storage` (containing `Blob`, `Global Config`) · `v0` (containing `Output Generation`, `Dashboard`, `Workflow`) · `Container Registry` · `Key Management Service` · `Connect`

**The CDN region list is the artefact.** Twenty components named with an IATA-style code plus a human place name, in a consistent `CODE - City, Region/Country` format:

`ARN1 - Stockholm, Sweden` · `BOM1 - Mumbai, India` · `CDG1 - Paris, France, Europe` · `CLE1 - Cleveland, East US` · `CPT1 - Cape Town, South Africa` · `DUB1 - Dublin, Ireland` · `DXB1 - Dubai, UAE` · `FRA1 - Frankfurt, Germany, Europe` · `GRU1 - São Paulo, Brazil` · `HKG1 - Hong Kong` · `HND1 - Tokyo, Japan` · `IAD1 - Washington DC, USA` · `ICN1 - Seoul, South Korea` · `KIX1 - Osaka, Japan` · `LHR1 - London, UK` · `PDX1 - Portland, West US` · `SFO1 - San Francisco, CA, USA` · `SIN1 - Singapore` · `SYD1 - Sydney, Australia` · `YUL1 - Montréal, Canada`

**Pairing the opaque machine identifier with the plain-language location is the pattern.** A developer who sees `iad1` in a log or a config file can find it on the status page; a manager who knows only "our US East region" can too. One label serves both. The format is imperfect — `CDG1 - Paris, France, Europe` and `FRA1 - Frankfurt, Germany, Europe` append a continent the other eighteen do not, `CLE1 - Cleveland, East US` and `PDX1 - Portland, West US` give a US sub-region where `IAD1 - Washington DC, USA` and `SFO1 - San Francisco, CA, USA` give a country, and `SFO1` is the only one with a state. **Four different geographic granularities in one list.** But the underlying idea — code plus place, always both — is directly reusable for any product exposing region identifiers.

Note `Dashboard` appears **three times** as a component name (top-level, under `Dashboard`, and under `v0`), and `Builds` appears twice (under `Build & Deploy` and under `Secure Compute`). Duplicate component names at different tree positions are ambiguous when read as a flat list, which is how screen readers and the Atom feed will present them. Also one component renders with **no name at all** in the served markup (a bare `Operational` immediately before the legend). Defect.

`Support Center` and `Support Chat` as status components (as on GitLab, where `Support Services / Zendesk` appears) means "can I reach you" is answerable during an outage.

### 6.4 Release-maturity states — six named phases `[documented]`

From the glossary, `Release Phases`: the stages a Vercel product passes through before GA:

`Alpha` ("under development") · `Beta` ("pre-GA without an SLA") · `Private Beta` ("under NDA") · `Limited Beta` ("publicly announced with gated access") · `Public Beta` ("available without special invitation") · `General Availability (GA)`

**Six maturity states with the *access* condition as the differentiator, not the code quality.** `Private Beta` / `Limited Beta` / `Public Beta` are distinguished by who can get in and what they have signed, and `Beta` is defined by the absence of an SLA — a commercial fact, not an engineering one. Publishing this taxonomy means every `Beta` badge in the product has a defined contractual meaning. GitLab ships `Alpha/Beta/GA` with `experiment` feature flags; Vercel's six-way split is finer and its definitions are more useful because they answer "what do I get" rather than "how finished is it".

This is a status vocabulary most content teams never formalise, and it is the one a PM asks about most often.

### 6.5 Permissions and gating as a state `[observed]`

Docs pages carry inline gating callouts: `> **🔒 Permissions Required**: Custom error pages`. An emoji-prefixed bold label naming the permission by feature name. Compare GitLab's `Tier:` / `Offering:` metadata pair — Vercel's is per-section and prose-embedded rather than page-level and structured, so it is easier to miss but appears closer to the thing it gates.

Feature availability is also encoded in glossary definitions rather than a matrix: "An Enterprise feature that…" opens the definitions of `Conformance`, `Custom Error Pages`, `Directory Sync`, `Protected Git Scopes`, `Trusted IPs`; "A Pro feature that…" opens `Spend Management`; "Available on Pro and Enterprise plans" closes `Rolling Releases`, `Webhooks`, `Notebooks`. **Plan availability written into the first or last clause of the term's definition** — so a reader looking up what something *is* learns in the same sentence whether they can have it.

## T7 Error, failure & recovery

The deepest section in this file. Vercel publishes **three separate error catalogues with three different grammars**, plus a documented mechanism for putting error codes into the user's own branded page, plus — uniquely in this corpus — a prompt template addressed to an AI agent on every error page.

### 7.1 The error taxonomy: two classes, stated on the index page `[observed]`

`/docs/errors` defines the top-level split in one sentence and two headings:

> "When developing your application with Vercel, you may encounter a variety of errors. They can reflect issues that happen with **external providers such as domain services** or **internal problems at the level of your application's deployment or your usage of platform features.**"
>
> `## Application errors` · `## Platform errors`

So the first thing the reader is told is **whose fault it might be** — third party, your application, or Vercel. And every individual error page then declares its own class in the `summary` field, as a terminal sentence:

- `FUNCTION_INVOCATION_TIMEOUT` — "The request for a Vercel Function reached the timeout threshold. **This is an application error.**"
- `DEPLOYMENT_BLOCKED` — "The deployment was blocked due to certain conditions. **This is a deployment error.**"
- `DNS_HOSTNAME_NOT_FOUND` — "The domain does not exist, resulting in an NXDOMAIN error during DNS resolution. **This is a DNS error.**"

**`This is a <class> error.` as a fixed closing sentence in every error summary** is the single most transferable thing on Vercel's error surface. It is one short declarative sentence that pre-empts the reader's first question (is this me or you?) and it is machine-parseable. Note the index page names two classes (`Application`, `Platform`) while the summaries use at least four (`application`, `deployment`, `DNS`, and by implication `platform`) — **the taxonomy on the index does not match the taxonomy in the pages.** Recorded as a defect; the idea survives it.

### 7.2 The per-error page template `[observed]`

Six fixed blocks, in order:

1. **Code as H1** — `# FUNCTION_INVOCATION_TIMEOUT`. The heading is the machine string, screaming snake case. Same paste-and-search logic as GitHub's `Error: Permission denied (publickey)`, applied to codes rather than sentences.
2. **One-sentence definition, cause-first** — "The `FUNCTION_INVOCATION_TIMEOUT` error occurs when a function invocation takes longer than the allowed execution time." The formula is rigid: `` The `CODE` error occurs when <condition> ``. Then a candidate-causes clause: "This could be due to an error within the function itself, a slow network call, or an issue with the environment in which the function is running."
3. **HTTP status and reason phrase, as separate labelled fields** —
   - Rendered page: `504` / `FUNCTION_INVOCATION_TIMEOUT:` / `Gateway Timeout`
   - Markdown form: `**Error Code:** \`403\`` / `**Name:** Forbidden`
   The proprietary code is mapped to the **standard HTTP status and its canonical reason phrase**, so a user who only knows "I'm getting a 502" can cross-reference, and a user who only has the Vercel code learns what the browser saw. `DEPLOYMENT_BLOCKED` → `403 / Forbidden`; `DNS_HOSTNAME_NOT_FOUND` → `502 / Bad Gateway`; `FUNCTION_INVOCATION_TIMEOUT` → `504 / Gateway Timeout`. **Dual-vocabulary disclosure**, and a direct analogue of the Wise "regulator's standardized format" pattern: publish the proprietary artefact as primary and the standard one alongside it.
   (Note the field label `Error Code:` holds the *HTTP status*, while the H1 holds the actual error code. **The label is wrong** — `403` is a status, not an error code, and the page's own H1 is the error code. A real naming defect on a reference page.)
4. **`Troubleshoot` — numbered steps with a bolded lead phrase** `[observed]`. The lead phrase names the *hypothesis*, not the action:
   - `FUNCTION_THROTTLED`: `**Check application logs**:` → `**Handle request spikes**:` → `**Optimize your function**:`
   - `DEPLOYMENT_BLOCKED`: `**Check configuration:**` → `**Check your account plan**:` → `**Review email notifications**:` → `**Verify account status:**` → `**Review policies:**` → `**Check for platform outages:**`
   - `DNS_HOSTNAME_NOT_FOUND`: `**Review DNS configuration:**` → `**Verify domain registration:**` → `**Check for private IP addresses:**` → `**Review application logs:**`

   Four verbs recur across all three pages — `Check`, `Review`, `Verify`, `Handle` — forming a consistent diagnostic lexicon. And `FUNCTION_INVOCATION_TIMEOUT`'s five steps are phrased as **candidate causes in the second person, not instructions**: "The function is taking too long to process a request", "The function isn't returning a response", "**You have an infinite loop within your function**", "Upstream errors". The reader is handed a differential diagnosis and asked to eliminate. That is a different and arguably better shape for a timeout than a checklist, because the fix depends on which cause it is.

   Note the colon placement drifts: `**Check application logs**:` (colon outside the bold) vs `**Check configuration:**` (colon inside). Both appear on error pages. Minor, but it is in the reference material.
5. **`Was this helpful?` with free-text `Send`** — not a Yes/No binary.
6. **`Last updated <date>`** — per-error freshness stamp (`Last updated May 14, 2026` on the timeout page; the front matter also carries `last_updated: 2026-02-26` etc. per page). Error reference pages dated individually.

### 7.3 The Agent Prompt — a prompt template shipped on every error page `[observed]`

The most distinctive artefact in this entire corpus batch. Each error page includes a collapsible block labelled `Agent Prompt` (with `Show more`), containing a ready-to-paste prompt written in the *user's* first person and addressed to a coding agent:

> "I'm encountering an error and reviewing the docs at https://vercel.com/docs/errors/FUNCTION_INVOCATION_TIMEOUT.md to understand what's happening. Please help me resolve this by: 1. **Suggest the fix** … 2. **Explain the root cause** … 3. **Teach the concept** … 4. **Show warning signs** … 5. **Discuss alternatives** … My goal is to fix the immediate issue while building lasting understanding so I can avoid and resolve similar errors independently in the future."

Five numbered requests, each with two or three sub-questions. The five are worth naming because they constitute **a published theory of what error documentation is for**:

| Request | Sub-questions (abridged, verbatim) |
|---|---|
| `Suggest the fix` | "propose what needs to be changed"; "If you do not have access to my codebase, ask me for the codebase" |
| `Explain the root cause` | "What was the code actually doing vs. what it needed to do?"; "What conditions triggered this specific error?"; "What misconception or oversight led to this?" |
| `Teach the concept` | "Why does this error exist and **what is it protecting me from**?"; "What's the correct mental model for this concept?" |
| `Show warning signs` | "What should I look out for that might cause this again?"; "What code smells or patterns indicate this issue?" |
| `Discuss alternatives` | "Explain if there are different valid approaches and their trade-offs" |

Several observations a content designer should take from this.

First, **the prompt is written in the user's voice, not Vercel's.** "I'm encountering an error…" — Vercel authored a first-person utterance for the user to speak to a third party. That is a new content genre: not UI copy, not documentation, but *scripted user speech*. Wise writes help-article titles in the user's voice (`I sent the wrong amount`); Vercel writes an entire paragraph in it, for the user to literally send.

Second, the prompt links to **the `.md` version of the page** (`…/FUNCTION_INVOCATION_TIMEOUT.md`), i.e. the documentation ships a pointer to its own machine-readable form inside the text a machine will read. Combined with the `Copy page` control and the "For AI agents:" asides, Vercel's docs are consistently authored for two audiences at once and label which is which.

Third, and most useful independent of AI: **"Why does this error exist and what is it protecting me from?"** is a question error documentation should answer and almost never does. Vercel has not answered it on the page — it has outsourced the answer to a model — but it has at least named the gap. Any error-content reviewer could adopt that question as a check.

Fourth, the framing sentence — "My goal is to fix the immediate issue **while building lasting understanding so I can avoid and resolve similar errors independently in the future**" — is the same stance GitLab states in its own voice ("teaching them to avoid future impediments"). Two products, one theory of errors-as-pedagogy; GitLab writes it as a rule for its writers, Vercel writes it as a request from its users.

### 7.4 The general error list — ~35 named errors, titled as conditions `[documented]`

`/docs/errors/error-list` covers dashboard, CLI, and configuration errors. Titles are **noun phrases naming the offending condition**, not the message string and not the user's symptom:

`Missing public directory` · `Missing build script` · `Maximum team member requests` · `Inviting users to team who requested access` · `Request access with the required Git account` · `Blocked scopes` · `Unused build and development settings` · `Unused Vercel Function region setting` · `Invalid route source pattern` · `Invalid route destination segment` · `Failed to install builder dependencies` · `Conflicting configuration files` · `Conflicting functions and builds configuration` · `Unsupported functions configuration with Nextjs` · `Deploying Vercel functions to multiple regions` · `Unmatched function pattern` · `Cannot load project settings` · `Project name validation` · `Repository connection limitation` · `Domain verification through CLI` · `Leaving the team` · `Git Default ignore list` · `GitHub app installation not found` · `Preview branch used as production branch` · `Lost Git repository access` · `Production deployment cannot be redeployed` · `SSL certificate deletion denied` · `Production branch used as preview branch` · `Command not found in vercel dev` · `Recursive invocation of commands` · `Pnpm engine unsupported` · `Yarn dynamic require of "util" is not supported` · `Invalid Global Config connection string` · `Globally installed @vercel/speed-insights or @vercel/analytics packages` · `Oversized Incremental Static Regeneration page`

**Three adjectival prefixes do most of the work**: `Missing …` (2), `Invalid …` (3), `Unused …` (2), `Conflicting …` (2), `Unsupported …` / `Unmatched …` / `Oversized …` (1 each). A reader scanning the list can find their class of problem from the first word. The `Unused …` pair is the standout genre — `Unused build and development settings` and `Unused Vercel Function region setting` document errors where **nothing failed**: the user configured something and Vercel silently ignored it. Documenting *silent no-ops* as errors, and explaining which config file wins, is a real service and almost no platform does it.

Two titles are mirror images of each other — `Preview branch used as production branch` and `Production branch used as preview branch` — documenting both directions of one confusion as separate entries with separate fixes. Correct, and it means either phrasing the user reaches for will match.

`Yarn dynamic require of "util" is not supported` is the one verbatim-string title in the list, and it links to the upstream Yarn issue: "This is a known **yarn issue**." Naming a third party's bug and linking their tracker, rather than absorbing it as a Vercel error.

**Grammatical pattern of the recovery copy.** Every entry follows `<condition> → <cause> → <numbered or bulleted fixes>`, and the fixes are consistently **imperative with an object**:

- "Make sure the output directory is specified correctly in project settings"
- "Try running the build command locally and make sure that the files are correctly generated"
- "Double-check that the name and version of the Builder you are requesting is correct."
- "**Solution:** Delete the `now.json` file" / "**Solution:** Delete the `.now` directory" / "**Solution:** Only define the `VERCEL_` prefixed Environment Variable"
- "To fix, remove the `.vercel` directory and redeploy" — followed by **platform-branched commands** (`rm -rf .vercel` for macOS/Linux, `rmdir /s /q .vercel` for Windows)

The `**Solution:**` label inside a bullet list (in `Conflicting configuration files`) is a nice micro-pattern: four conflict conditions, each with its remedy inline and labelled, so the reader matches their symptom and reads one word further.

**Before/After code pairs are used instead of prose for syntax errors** `[documented]` — `Invalid route source pattern` and `Invalid route destination segment` each ship a `**Before**` and `**After**` JSON block with one character changed, plus one sentence of explanation ("negative lookaheads must be wrapped in a group"; "A named segment parameter defined in the `destination` property must also be defined in the `source` property"). `Unmatched function pattern` uses `**Not Allowed**` / `**Allowed**` / `**Allowed (Next.js)**` — three blocks, and the third names the framework condition in the label.

**`Recursive invocation of commands` uses a different, two-heading template** `[documented]`: `### Why this error occurred` then `### Possible ways to fix it`. **One entry out of thirty-five uses question-and-answer headings; the rest use bare prose.** An inconsistency, but the two headings are better than the default, because `Why this error occurred` is exactly the question the Agent Prompt says users need answered.

**Recovery that routes to a plan change, with branches** `[documented]` — `Repository connection limitation` names the machine code, says where it surfaces, and then branches the remedy by plan:

> "the request fails with the error code `repo_links_exceeded_limit`. **You'll see this code in the API response and in the dashboard.** To resolve it: **Hobby plan:** Upgrade to Pro… **Pro or Enterprise plan:** Request a limit increase… **Any plan:** Alternatively, disconnect an existing Project from the repository under **Settings → Git**."

Three remedies labelled by plan, with a plan-independent fallback labelled `Any plan:`. And the sentence "You'll see this code in the API response and in the dashboard" tells the user **where the same string appears on two surfaces** — a small piece of cross-surface orientation that prevents the "is this the same error?" question.

**Recovery that explains why the safe path is the default** `[documented]` — `Production deployment cannot be redeployed`:

> "You cannot redeploy a production deployment if a more recent one exists. **The reason is that redeploying an old production deployment would result in overwriting the most recent source code you have deployed to production.** To force an explicit overwrite of the current production deployment, select **Promote** instead."

Prohibition → consequence it prevents → the named control that does it anyway. Three moves, and the third is the important one: Vercel does not just block the action, it points at the deliberate override. This is the pattern for every "are you sure" in a destructive flow.

**Blocked-account error copy names the enforcement basis and the contact address** `[documented]` — `Blocked scopes`:

> "A deployment, project, user, or team on Vercel can be blocked if it violates our **fair use guidelines** or **Terms of Service**. Blocked deployments and projects will result in your website returning a **451** error. Blocked users and teams cannot create new deployments, and blocked users cannot be invited to a team. Please reach out to registration@vercel.com if you need help."

Four affected entity types enumerated, the exact HTTP status disclosed (`451` — "Unavailable For Legal Reasons", a deliberate and correct choice), the differential consequences for each entity type spelled out, and a **named email address** as the route out. Publishing the status code for an enforcement block means a developer can distinguish "we blocked you" from "your app is broken" from the wire alone.

**One error page is written in the second person as a misconception correction** `[documented]` — `Request access with the required Git account` opens by quoting the message the user saw and then explaining that the string is ambiguous between two causes:

> "When a deployment fails with the message **\"Team access required to deploy.\"**, the commit author either does not have a Vercel account, **or** the team has enabled **Manual Approval**."

One message, two causes, two different fixes. Documenting an **overloaded error string** and disambiguating it in prose, rather than splitting the string, is the same manoeuvre Wise makes with `complete` and GitHub makes with skipped-check-reports-success. Three products, one pattern: when one state name covers two realities, write the reconciling article.

### 7.5 REST API errors — ~35 codes in five families, with verbatim messages `[documented]`

Grouped as `Generic errors` ("consistent for all endpoints") · `Deployment errors` · `Domain errors` · `DNS errors` · `OAuth2 errors`. Every entry ships the cause in prose, the JSON shape, and the message string.

**Generic:** `forbidden` ("Not authorized") · `rate_limited` · `bad_request` · `internal_server_error` ("An unexpected internal error occurred") · `not_found` ("Could not find the RESOURCE: ID") · `method_unknown` ("This endpoint only responds to METHOD")

**Deployment:** `missing_files` · `no_files` ("No files in the deployment") · `env_too_many_keys` · `env_key_invalid_characters` · `env_key_invalid_length` · `env_value_invalid_length` · `env_value_invalid_type_missing_uid` · `env_value_invalid_type_unknown_props` · `env_value_invalid_type` · `env_secret_forbidden` · `env_secret_missing`

**Domain:** `forbidden` · `not_found` ("Domain name not found") · `missing_name` · `conflict_aliases` · `not_modified` ("Nothing to do") · `invalid_name` · `custom_domain_needs_upgrade` · `failed_to_add_domain` · `service_unavailable` · `price_mismatch` · `not_available` ("Domain is not available") · `invalid_domain` ("Invalid domain or TLD")

**DNS:** `missing_name` ("Missing `name` parameter") · `missing_type` ("Missing `type` parameter")

**OAuth2:** `not_found` ("OAuth client not found: CLIENT_ID")

Three things stand out.

**The rate-limit message is the most informative single error string in this corpus.** Verbatim:

> `"The rate limit of 6 exceeded for 'api-www-user-update-username'. Try again in 7 days"`

With a structured `limit` object alongside: `remaining`, `reset`, `resetMs`, `total`. The message names the **limit value** (6), the **specific rate-limit bucket by internal identifier** (`api-www-user-update-username`), and the **wait in human units** (`7 days`) — and the payload gives the same reset in two machine formats. Compare GitHub's rate-limit guidance, which describes headers the developer must read and interpret themselves. Vercel puts the answer in the sentence. The one flaw: `Try again in 7 days` has no terminal full stop while the preceding sentence does.

The accompanying scope note is also good practice: "The limit of requests is per endpoint basis so you can continue using other endpoints even if some of them give you this error." **Telling the user what still works** — the same negative-scope move as the status page's `<X> are unaffected`.

**Several messages are self-documenting with an example inside the message string** `[documented]`:

- `"The URL was expected to include the domain name. Example: /domains/google.com"`
- `"The `name` field in the body was expected but is not present in the body payload. Example value: `example.com`"`
- `"The env key \"KEY\" passed an object with unknown properties. Only `uid` is allowed when passing an object"`
- `"Too many env vars have been supplied (100 max allowed, but got #)"`

Putting `Example:` or `Example value:` **inside the error message** (not in adjacent docs) means the fix travels with the failure. `(100 max allowed, but got #)` gives the limit and the observed value in one parenthetical — the single most useful shape for a quota error.

**Two structural defects in the catalogue itself** `[observed]`:

1. **The same heading appears twice with different content.** `### Missing DNS record name` appears at the end of the `Domain errors` section, where its body describes the `type` parameter and its code is `missing_type` — and again at the start of `DNS errors`, correctly describing `name` / `missing_name`. The Domain-section entry is a copy-paste error: its heading, body, and code disagree with each other.
2. **Machine codes are reused across semantically different errors.** `not_found` covers generic resource-not-found, domain-not-found, and OAuth-client-not-found. `forbidden` covers endpoint authorization and domain access. `not_modified` covers both "Nothing to do" and — confusingly — "The domain \"NAME\" already exists", which is a conflict, not an unmodified state. `missing_name` covers a missing URL segment and a missing body field. A client cannot branch on `code` alone; it must also read `message`, which is the thing error codes exist to avoid.

Also note the two casing systems: REST API codes are `snake_case` lowercase (`env_key_invalid_length`), platform error codes are `SCREAMING_SNAKE_CASE` (`FUNCTION_INVOCATION_TIMEOUT`), and the error-list entry `repo_links_exceeded_limit` is snake_case while appearing in prose about the dashboard. **Two conventions, and a user meeting both has no rule for telling which surface they are on.** Arguably intentional (API vs platform) but never stated.

### 7.6 Custom error pages — putting the error code in the user's own page `[documented]`

The most operationally interesting error-content feature in this batch. Vercel lets a customer replace platform error pages, with **fallback routing by status-code proximity**:

| Error | Destination |
|---|---|
| 500 | `/500.html` |
| 501…503 | `/500.html` (fallback) |
| 504 | `/504.html` |
| 505…511 | `/500.html` (fallback) |

> "For most cases, you only need to create a single `500` error page. Vercel automatically uses it as the fallback for all platform errors, so you don't need to design a separate page for each error type."

**One page covers all 5xx; specific pages override.** A content designer is explicitly told not to write eleven error pages. That is a scoping instruction inside a feature doc, and it is the right default.

**Two interpolation tokens are provided, and their use is recommended rather than required** `[observed]`:

| Token | Description |
|---|---|
| `::vercel:REQUEST_ID::` | "Matches the `x-vercel-id` header value" |
| `::vercel:ERROR_CODE::` | "The error code (e.g., `FUNCTION_INVOCATION_TIMEOUT`)" |

> "**Vercel strongly recommends embedding these tokens to help users reference a specific request when contacting support.**"

A platform telling its customers to put a **request ID and an error code into their branded error page**, with the stated reason being support-ticket quality. This is the practical resolution of the perennial argument about whether to show users technical identifiers: show them, because the identifier is what makes the support conversation possible. Note GitHub's Primer says the opposite-ish ("Avoid using obscure error codes altogether") — but GitHub is writing about *codes as explanation*, and Vercel is writing about *codes as reference*. Both are right; the distinction is what the code is for.

**The example error page copy is Vercel's own recommended wording** `[observed]`:

> `<title>Something went wrong</title>`
> `<h1>Something went wrong</h1>`
> `<p>We're working on it. Please try again later.</p>`
> `<p>Request ID: ::vercel:REQUEST_ID::</p>`
> `<p>Error: ::vercel:ERROR_CODE::</p>`

Notable because `Something went wrong` is **precisely the string GitLab's style guide rejects** ("Don't: `Something went wrong.`", preferring `Connection timed out. Please try again.`). Vercel ships it as the canonical example. The defence is that a platform-level 5xx genuinely cannot know what went wrong, so the vague headline is honest and the specificity moves into the two identifier lines below it. That is a legitimate position and a good illustration that "be specific" is conditional on the system *having* information. Also note `Please try again later.` retains the `please` — permitted under GitLab's inconvenience exception, banned under GitHub's blanket rule.

**Three stated benefits, and the first is the unusual one** `[observed]`:

> "**Maintain brand consistency**: Keep your visual identity intact **even during platform outages**"
> "**Improve user experience**: Provide helpful messaging, support links, or **status page references**"
> "**Reduce user confusion**: Guide users on what to do next **instead of showing a technical error**"

A vendor selling, as a feature, the ability to hide that the vendor is broken. And recommending that the customer link their *own* status page from it.

**One limit, with its reasoning** `[documented]`: "Custom error pages must be static. **Since these pages handle platform errors, they can't rely on server-side rendering or dynamic content that might also fail.**" A constraint justified by the failure mode it avoids — the error page must not share a dependency with the thing that errored. Obvious once stated, and rarely stated.

### 7.7 Where errors surface, and the `/_logs` convention `[documented]`

Multiple error pages route the user to the same place: "Check the application logs, which can be found at the host URL under the `/_logs` path", with an example: `https://my-deployment-my-username.vercel.app/_logs`. A **stable, guessable, per-deployment diagnostic URL** named in the error copy itself. The user does not need to find the dashboard; the path is appended to the URL they already have. Repeated verbatim across `FUNCTION_INVOCATION_TIMEOUT` and `FUNCTION_THROTTLED`.

And `DEPLOYMENT_BLOCKED` step 6 closes the loop outward: "**Check for platform outages:** Sometimes, platform-wide outages or issues can cause deployments to be blocked. Check the status page for any ongoing incidents." **An error page whose last troubleshooting step is "it might be us"** — and it links the status page. Most error documentation never admits that possibility. GitHub's REST troubleshooting does the same ("you can use githubstatus.com … to check for incidents"), so this is emerging good practice among developer platforms.

## T8 Empty states

`[absent]` — no empty state is reachable pre-auth, and Vercel publishes no design-system empty-state guidance on a public URL (`geist` is referenced only in the skip-link id; no Geist content guidelines were located in this harvest).

`[observed]` — three no-content strings, all on the Statuspage-hosted status site and therefore Atlassian's copy rather than Vercel's: `No incidents reported today.` · `No incidents reported.` · `No incidents or maintenance related to this downtime.` · `No downtime recorded on this day.` · `No data exists for this day.`

`[observed]` — one product-adjacent empty-ish state in the served homepage markup: `Drop to deploy` beside the word `Loading`, which appears to be the pre-interaction state of the hero's drag-and-drop demo. `Drop to deploy` is a good instruction-as-empty-state: four words, imperative, names the gesture and the outcome. Recorded as observed but not confirmed as an empty state proper.

Notably, the **`Unused build and development settings` and `Unused Vercel Function region setting`** error-list entries (T7) occupy the conceptual space an empty state usually would: they explain a UI region that exists but has no effect. Vercel documents "this setting you can see is being ignored" in the error catalogue rather than in the setting's own empty/disabled copy. A defensible split for a config-file-driven product, and a gap for anyone arriving via the dashboard.

## T9 Notifications & system messages

`[documented]` — Vercel's notification model is described in the glossary as a four-channel, category-scoped system:

> `Notifications` — "Configurable alerts about **deployments, domains, integrations, account changes, and usage**. Vercel delivers them through the dashboard, email, push, and **SMS (for Spend Management only)**."

Five notification categories and four channels, with **SMS restricted to one category**. Reserving the most intrusive channel for the single event class where money is at stake (spend thresholds) is a defensible channel-granularity decision, and it is the same shape as GitHub's status-page channel tiering (SMS gets creates and resolves only, no updates).

`Alerts` is a separate named concept: "Notifications that fire when something is wrong with your project, such as **a spike in failed function invocations or unusual usage patterns**. Configure delivery through email, Slack, or webhooks." So `Notifications` covers lifecycle events and `Alerts` covers anomalies — two nouns, two glossary entries, different channel sets. The distinction is real but the names do not signal it; a user would not predict that "alerts" are anomaly-triggered and "notifications" are event-triggered.

**Quota-approach and quota-exceeded messaging is documented per plan** `[documented]`, and this is the substantive finding:

> "All plans receive notifications by email and on the dashboard when they are **approaching and exceed** their usage limits."
> "Hobby plans **will be paused** when they exceed the included free tier usage"
> "Pro teams and Enterprise teams on the Flexible Commitment plan can configure Spend Management to automatically **pause deployments, trigger a webhook, or send SMS notifications** when they reach 100% usage"
> "For Pro and Enterprise teams, when you reach 100% usage your deployments are **not** automatically stopped."

Two notification thresholds (`approaching`, `exceed`) and three configurable consequences at 100%. The bolded **not** in "your deployments are **not** automatically stopped" is emphasis placed on a negation — correct, because the reader's default assumption is the opposite.

And the justification that follows is worth quoting as a piece of reassurance copy:

> "One of the benefits to always being on, is that you don't have to worry about downtime in the event of a huge traffic spike caused by announcements or other events. **Keeping your site live during these times can be critical to your business.**"

A billing policy explained by the business risk it protects against, rather than by the revenue it generates. (The sentence carries a comma splice — "One of the benefits to always being on, is that" — in published docs.)

**Error copy that references an email notification as a diagnostic source** `[observed]` — `DEPLOYMENT_BLOCKED` step 3: "**Review email notifications**: If you receive an email from Vercel about the pause, it may contain more details about the issue and next steps." The in-product error points the user at the transactional email as the fuller explanation. An acknowledgement that the email carries content the error page does not — honest, and a flag that the two surfaces are not aligned.

`[absent]` — no toast, banner, or in-product alert strings were observed; no published messaging-pattern guidance.

## T10 Disclosures, legal & compliance

`[documented]` — Vercel's pricing disclosure is split between `/docs/plans` (harvested) and `/pricing` (not harvested), and the docs version is organised as **FAQ-style question headings inside a reference page**:

`### Where do I understand my usage?` · `### What happens when I reach 100% usage?`

Two questions under `## General billing information`. The first is ungrammatical (`Where do I understand my usage?` — "understand" does not take "where"; presumably "see" or "find" was intended). **Defect, on a billing page.**

**Three plan names with audience-first definitions** `[observed]`

| Plan | Audience framing |
|---|---|
| `Hobby` | "designed for personal projects and developers" — free |
| `Pro` | "designed for professional developers, freelancers, and businesses who need enhanced features and team collaboration" — "credit-based" |
| `Enterprise` | "caters to large organizations and enterprises requiring custom options, advanced security, and dedicated support" |

Glossary version, more compact: "Hobby (free, for personal projects), Pro (credit-based, with team collaboration), and Enterprise (custom limits, SSO, and SLAs)."

`Hobby` as a plan name is distinctive — GitHub says `Free`, GitLab says `Free`, Vercel says `Hobby`. It describes the *use case* rather than the price, which has two effects: it sets an expectation that commercial use belongs on Pro, and it makes downgrading feel like a reclassification rather than a saving. Paired with the `Fair Use Guidelines` page cited from `Blocked scopes`, the naming is doing enforcement work.

**Quota strings** `[observed]`: `100 GB of Fast Data Transfer` · `1 hour of runtime logs` (Hobby) · `Each build cache holds up to 1 GB and is retained for one month` · `100` environment variables per deployment · `256` character env key limit · `65536` character env value limit · `20 MB` ISR response limit · `5 MB` Drain delivery limit (from an incident note) · `up to five scopes per team` (Protected Git Scopes) · `Up to one hundred alphanumeric lowercase characters` (project names) · `20 compute-capable regions`.

Note `one hundred` spelled out in the project-name rule and `100` as a numeral in the env-var rule, on adjacent reference pages.

**Add-on pricing disclosed inside glossary definitions** `[observed]` — the `Password Protection` entry is the most complex single disclosure sentence in this file:

> "Pro teams pay **$20 per month for each protected project**. Enterprise includes Team Level Password Protection for every project, while existing Pro teams with the **legacy Advanced Deployment Protection package** retain team-level coverage for **$150 per month per team**."

Three pricing regimes (per-project Pro, included Enterprise, grandfathered legacy team-level) in one sentence, with the legacy package named. Disclosing grandfathered pricing to new readers — rather than only to the customers on it — is unusually transparent and prevents the "why does my colleague pay differently" support ticket.

**Free-offer bounding** `[observed]`: "Paid Pro teams include a **free first-year domain on an eligible TLD**, one per team. **The offer is not available during the Pro trial.**" Four bounds in two sentences: paid only, first year only, eligible TLDs only, one per team, and explicitly excluded during trial. The Wise claim-then-bound pattern, applied to a promotional offer.

**Date-scoped defaults are disclosed** `[observed]`: `Skew Protection` — "On by default for projects created **after November 19, 2024**." And from the error list: multi-region function deployment "has existed since the launch of the current pricing model but was applied on **July 10, 2020**. For Projects created on or after the date, it's no longer possible to deploy to multiple regions."

**Telling long-tenured users that their defaults differ from the documented ones, with the cutover date**, is the same practice as GitLab's quarterly-reconciliation disclosure. It is the single most under-used disclosure pattern in software documentation and it prevents a whole class of "the docs are wrong" tickets.

**Legal document set** `[observed]`: `Privacy Policy` · `Terms of Service` · `Cookie Policy` · `DPA` · `Acceptable Use Policy` · `Legal (all documents)` · `Trust Center` · `Status` · `Cookie Preferences`.

`Legal (all documents)` as a link label — the parenthetical scope note inside the label — is a small good decision: it tells the reader this is the index, not another policy. `DPA` is exposed as a bare acronym with no expansion, which only a procurement reader will parse. And `Fair Use Guidelines` is *not* in this set; it lives in docs (`/docs/limits/fair-use-guidelines`) and is cited from error copy, so the enforcement basis for account blocking sits in documentation rather than in legal.

**Trust Center is off-domain** at `security.vercel.com` (compare GitHub's on-domain `/trust-center` and GitLab's `/security`). Not harvested.

**Compliance-as-product** `[observed]`: `Conformance` — "An Enterprise feature that runs automated checks on your code for performance, security, and code health issues during local development and CI. Use Conformance to **prevent regressions and burn down existing issues over time**." Note `burn down`, the same debt metaphor GitHub uses for `security debt` / `security campaigns`. Convergent vocabulary across competitors for the same idea.

**Security-mechanism disclosure written for a general reader** `[observed]` — the glossary explains fingerprinting and TLS in plain terms:

- `JA3/JA4 Fingerprints` — "TLS fingerprinting techniques used by Vercel's security systems to identify and restrict malicious traffic patterns."
- `SNI (Server Name Indication)` — "a TLS extension where the client sends the destination hostname **in plain text at the start of the handshake, before encryption begins**. The Sandbox firewall uses the SNI to identify and filter HTTPS traffic by domain. **Connections without an SNI cannot be matched to a domain rule.**"
- `OIDC` — "A federation protocol that issues **short-lived, non-persistent tokens** for secure backend access **without storing long-lived credentials**."
- `BotID` — "An invisible CAPTCHA from Vercel, **powered by Kasada**, that detects sophisticated bots **without showing visible challenges or requiring user action**."

The SNI entry is the best of these: it explains the mechanism, states the consequence for the product's firewall, and then names the failure case (no SNI → no match). Three sentences, complete mental model. The `BotID` entry discloses the third-party vendor (`Kasada`) inside the definition — vendor disclosure as glossary content.

## T11 Help-centre architecture

Vercel operates **four distinct help surfaces**, and the split is by content genre rather than by product area:

| Surface | URL pattern | Title grammar | Role |
|---|---|---|---|
| `Docs` | `/docs/…` | Noun phrases, imperatives, error codes | Reference, conceptual, how-to (declared per page in `type:`) |
| `Knowledge Base` | `/kb/guide/…` | **User questions** | Symptom-driven troubleshooting |
| `Community` | community.vercel.com | Forum threads | Peer support |
| `Help` | `/help` | — | Support-ticket entry (not harvested) |

**The KB title grammar is the finding.** Observed KB titles, all linked from docs and error pages:

`What can I do about Vercel Functions timing out?` · `What should I do if I receive a 503 error on Vercel?` · `How to debug 404 errors` · `How do I resolve "ERR_SSL_PROTOCOL_ERROR" with Vercel?` · `Are Vercel Preview Deployments indexed by search engines?` · `Can you deploy based on tags/releases on Vercel?` · `How do I generate an SHA for uploading a file to the Vercel API` · `What can I do when I run into build output limits with Next.js on Vercel?` · `Custom 404 Page` · `Vercel vs Netlify` · `Migrate to Vercel from Cloudflare` · `How to test a container image in Vercel Sandbox before deploying`

Four question shapes: `What can I do about/when …?` (capability under constraint), `What should I do if …?` (response to an event), `How do I …?` (procedure), `Can you / Are … ?` (yes-no eligibility). Plus two non-question forms and, notably, **two competitor-comparison articles inside the help surface** (`Vercel vs Netlify`, `Migrate to Vercel from Cloudflare`) — switching content shelved with troubleshooting content.

`What can I do about Vercel Functions timing out?` is the KB counterpart to the docs page `FUNCTION_INVOCATION_TIMEOUT`, and the pairing is the architecture in miniature: **the code is the docs title, the question is the KB title, and the error page links to both.** A user with a code lands on docs; a user with a feeling lands on KB. That is a clean two-door design, and it is more deliberate than GitHub's single docs surface with mixed title grammar.

Note `How do I generate an SHA for uploading a file to the Vercel API` has **no question mark** while its siblings do. And `How to debug 404 errors` uses the infinitive where siblings use `How do I`.

**Per-page routing furniture** `[observed]`: `## Related pages` (with the "For AI agents:" preamble) · `Full cross-link map for this page: /docs/<path>.graph.md` · `[View full sitemap](/docs/sitemap)` at the foot of every markdown page · `Copy page` · `Ask AI` · `Was this helpful?` + `Send` · `Last updated <date>`.

**`View full sitemap` as the last line of every docs page** is a deliberate low-tech escape hatch — when the related links and the search both fail, the reader gets the whole index. Simple and rare.

**Front-matter `prerequisites` is a declared, machine-readable field** `[observed]` — `prerequisites: []` on every page harvested, i.e. the field exists and is empty across all thirteen. Either Vercel has not populated it or these pages genuinely have none. Worth flagging: an unpopulated structured field is worse than no field, because downstream consumers (including the agents Vercel is courting) will read the empty array as "no prerequisites" rather than "unknown".

**Support escalation is thin relative to peers.** There is no visible "still need help" ladder on docs pages (GitHub's four-step, GitLab's four-group). The routes out are `Ask AI`, `Was this helpful?`, `Community`, and the footer `Help` link. **The primary escalation affordance on a Vercel docs page is an AI query**, with human support two clicks further away in the footer. That is the most AI-forward support architecture in this batch and the one whose consequences are least visible from outside.

## T12 FAQs

`[observed]` — no FAQ section exists on the homepage, and `/pricing` was not harvested. The only FAQ-shaped content found is **two question headings inside the `/docs/plans` reference page**, under `## General billing information`:

| # | Question (verbatim) | Answer (summarised) |
|---|---|---|
| 1 | `Where do I understand my usage?` | Points to the dashboard usage page and three further docs pages on optimising usage, how usage is calculated, and reading an invoice. |
| 2 | `What happens when I reach 100% usage?` | All plans get approaching-and-exceeded notifications by email and dashboard; Hobby is paused; Pro and Enterprise are not stopped and may configure Spend Management to pause, webhook, or SMS; closes with a rationale for staying live during traffic spikes. |

Two questions is the thinnest FAQ in this batch. The second is substantive and well-structured (per-plan branching, explicit negation, stated rationale); the first is a grammatical error.

**The absence is itself the finding.** Vercel has replaced the FAQ genre with three other mechanisms: the **glossary** (~130 terms, which answers "what is X"), the **Knowledge Base** (question-titled articles, which answers "what do I do about Y"), and **`Ask AI`** (which answers anything). A product that ships a 130-term glossary and a question-titled KB does not need a marketing FAQ, and arguably should not have one — a static list of twelve questions would be strictly worse than either. Recorded as a deliberate architectural substitution rather than a gap, with the caveat that `/pricing` may carry a conventional FAQ that this harvest did not reach.

## T13 Terminology & glossary

**Vercel publishes a ~130-entry glossary, A–W, and it is the strongest terminology artefact in the corpus so far** `[observed]`. Framing: "A full glossary of terms used in Vercel's products and documentation."

Its structural virtues, before the terms themselves:

- **Every entry is a definition, not a description.** The shape is `<Term>` → a noun-phrase or gerund definition → optional mechanism sentence → optional plan availability → `See <Docs page>.`
- **Cross-references are inline and anchored** (`See [Vercel Agent](#vercel-agent)`), so related terms resolve within the page.
- **Pure aliases are entries** rather than omissions: `Agent` → "See Vercel Agent." · `Analytics` → "See Web Analytics." · `Firewall` → "See Vercel Firewall." · `Functions` → "See Vercel Functions." · `Middleware` → "See Routing Middleware." · `Sandbox` → "See Vercel Sandbox." · `Toolbar` → "See Vercel Toolbar." · `Workflows` → "See Vercel Workflows." · `Marketplace` → "See Vercel Marketplace." · `Queues` → "See Vercel Queues."
  **Ten redirect entries** covering the short forms users actually type. This is the glossary equivalent of a URL redirect and it is why the artefact works: a reader looking up `middleware` is not told it does not exist.
- **Plan gating is written into the definition**, not a separate matrix (see T6.5).
- Several entries include **numeric specifics** a marketing page would omit: `Global Config` — "within 15ms at P99, often less than 1ms"; `Build Cache` — "up to 1 GB and is retained for one month"; `Region` — "20 compute-capable regions globally"; `Protected Git Scopes` — "Up to five scopes per team".

| Term | Vercel's usage | The alternative it rejected / note |
|---|---|---|
| `Deployment` | "The result of a successful build" — a deployment is by definition a succeeded build | GitHub/GitLab treat a failed deploy as a deployment in a failed state. **Vercel's definitional choice is the sharpest terminology decision in the file** |
| `Build` vs `Deployment` | Process vs artefact, two entries | Many products conflate them |
| `Preview Deployment` | Vercel's signature coinage; `Preview URLs` is a marketing feature name | "staging", "review app" (GitLab's term) |
| `Promote` / `Promote to Production` | Change a preview's role without rebuilding | "deploy to prod" |
| `Instant Rollback` | The revert operation, with `Instant` in the product name | "revert", "roll back" |
| `Rolling Releases` | Fractional traffic promotion | "canary" (which GitLab uses as a status component) |
| `Skew Protection` | Preventing client/server version mismatch mid-deploy | An invented term for a problem most platforms leave unnamed |
| `Fluid Compute` | The concurrency-and-CPU-billing execution model | "serverless" (which Vercel also defines, separately) |
| `Active CPU` | The Fluid Compute billing unit — "you only pay for the actual CPU time your functions use **while executing, rather than provisioned capacity**" | "vCPU-seconds" |
| `Hobby` | The free plan | `Free`. Names the use case, not the price — and does enforcement work |
| `Vercel Functions` | The compute primitive | "serverless functions" (used generically on the marketing page, branded in the nav) |
| `Routing Middleware` | The full name; `Middleware` redirects to it | Vercel **renamed** middleware and kept the short form as an alias |
| `Delivery Network` / `Content Delivery` / `CDN` | Three labels across nav, footer, and glossary for one product | **Inconsistency** — the docs nav says `Delivery Network`, the footer says `Content Delivery`, the glossary and status page say `CDN` |
| `Points of Presence (PoPs)` | Distinguished from `Region`: PoPs "terminate TCP and route traffic over a private network to the nearest Vercel region, where TLS termination and caching occur" | Most CDNs use "edge" for both. Vercel separates the two and explains what happens where |
| `Edge` | Defined separately from both, as a location concept | |
| `Global Config` | Low-latency config store | Formerly "Edge Config" — the rename is visible in the error list, where the error is `Invalid Global Config connection string` but "In most cases, the environment variable is named `EDGE_CONFIG`". **The old name persists in the variable users must edit.** A rename that did not reach the config surface |
| `Drains` | Observability export | "log forwarding", "export" |
| `Checks` vs `Deployment Checks` | Post-deploy validation vs pre-promotion gate | Two similar names, two pipeline positions |
| `Notifications` vs `Alerts` | Lifecycle events vs anomaly detection | Two nouns, no signal in the names |
| `Session` | "A single running microVM instance inside a Vercel Sandbox" — with the persistence model explained | An overloaded general word given a precise product meaning |
| `Real Experience Score (RES)` / `Virtual Experience Score (VES)` | Two coined metrics: RES from real users, VES predictive "before deployment" | Two three-word coinages with initialisms, one measured and one predicted |
| `Conformance` | Enterprise code-health checks | "linting at scale", "policy" |
| `Passport` | Identity product for internal agents and deployments | Unglossed in nav; glossed only on a homepage card |
| `Connect` | Unglossed everywhere observed; **appears in the glossary not at all** | **Gap** — a nav-level product with a status component and no glossary entry |
| `eve` | A framework, lowercase | The only lowercase product name; also has its own domain (eve.dev) |
| `v0` | AI code generation, lowercase alphanumeric | |
| `BotID` | Invisible CAPTCHA, camel-case with a capitalised initialism | Distinguished from `Bot Protection` and `Bot Management`, which are also separate entries |
| `Bot Management` / `Bot Protection` / `BotID` | Three entries, hierarchically related: Management is "the umbrella term", Protection is the ruleset, BotID is the invisible challenge | Genuinely disambiguated, unusually well |
| `Vercel Drop` | Drag-and-drop deploy | Named after the gesture |
| `Vercel Agent` | "Code Review for pull request feedback and **Investigations** for automatically diagnosing production alerts" | `Investigations` as a named AI capability — diagnosis, like GitLab's `Root Cause Analysis`, not GitHub's `Autofix` |
| `Agent Skills` (skills.sh) / `Vercel Plugin` / `Vercel MCP` | Three named agent-integration surfaces | |
| `Multi-repo` | "also known as 'polyrepo'" — the alias disclosed inside the definition | |
| `Fast Data Transfer` | The billed egress metric | "bandwidth" |
| `I/O-bound` | A general computing term given a glossary entry because it explains Fluid Compute's value | Defining the *concept your pricing depends on* |
| `Release Phases` | Six-state maturity taxonomy (T6.4) | |
| `Geist` | The design system — **referenced only as the skip-link id (`#geist-skip-nav`)**, absent from the glossary and the footer | **Gap**: GitHub publishes Primer, GitLab publishes Pajamas, Vercel's design system has no public content guidance located in this harvest |

**Register split by surface.** Marketing describes capabilities generically (`Serverless Functions`, `Global Delivery`, `AI Model Gateway`); nav and glossary name them proprietarily (`Vercel Functions`, `Content Delivery`, `AI Gateway`); status page uses infrastructure names (`CDN`, `Functions`, `Routing Middleware`). Three registers, and the *generic* one is on the acquisition surface — the inverse of Wise and GitHub, which put the branded form on marketing and the short form in help. Vercel sells the category and brands the product, which fits a company trying to define a category (`Agentic Infrastructure`).

## T14 Voice, tone & accessibility

`[absent]` — **Vercel publishes no content style guide, voice-and-tone documentation, or design-system content guidance on any public URL located in this harvest.** GitHub ships Primer's Content foundations; GitLab ships Pajamas's four content pages and a public technical-writing word list. Vercel's `Geist` design system appears only as a CSS/DOM identifier. This is the largest single gap in the file and it means every voice observation below is inferred from output rather than read from a rule.

**Inferred voice, from the docs corpus.** Consistent, and consistently *terse*:

- **Definitions are copular and complete.** `The FUNCTION_THROTTLED error occurs when …`; `A deployment on Vercel is the result of a successful build of your project.`; `A form is for …` (GitLab) vs Vercel's `A build cache holds up to 1 GB`. Subject, verb, fact.
- **Second person for the user, first-person plural for the platform** — "We have implemented a fix", "The URL we should send the webhooks to", "our fair use guidelines". Vercel is a visible actor in adverse copy, including in the sentence admitting permanent data loss.
- **Contractions used freely**: "you don't need Git", "isn't returning a response", "can't rely on server-side rendering", "We'll provide additional updates", "You'll see this code". Also `We will provide` in the same incident chain — inconsistent.
- **No exclamation marks observed anywhere.** No `Oops`, no `Whoops`, no celebration copy.
- **`Please` used sparingly and only where the user is inconvenienced or must escalate**: "Please reach out to registration@vercel.com if you need help.", "Please try again later." (in the recommended error-page copy), "Please help me resolve this by:" (the Agent Prompt, where the user is speaking). Effectively GitLab's inconvenience exception, applied without a published rule.
- **Numbers are specific, not rounded**: `15ms at P99`, `5 MB`, `65536`, `20 MB`, `100 million monthly website visits`, `20,000 companies`, `November 19, 2024`, `July 10, 2020`.
- **Emoji appear in docs callouts**: `> **💡 Note:**`, `> **🔒 Permissions Required**:`. Two emoji used as semantic prefixes in reference material — which GitHub's Primer forbids in UI content and GitLab cautions against for screen readers. Vercel uses them in docs, where the convention is more common, but they are in the served markdown and therefore in the accessible text.
- **Marketing register is abstract and noun-heavy** (`Agentic Infrastructure`, `The autonomous stack for every app and agent.`) while docs register is concrete and verb-led (`Create a deployment`, `Verify a preview`, `Check application logs`). The gradient is the steepest in this batch: the landing page is almost content-free and the reference material is dense. A reader's experience of Vercel's voice depends entirely on which surface they land on.

**Accessibility content** `[observed]`

- `Skip to content` present, first in DOM, id `#geist-skip-nav`.
- `meta-color-scheme: dark light` and an explicit footer control: `Select a display theme:` → `system` / `light` / `dark`. Theme choice offered as three named options including `system`, which is the correct default-respecting option.
- Dark/light asset pairs are shipped as **two `<img>` elements with identical alt text** on the homepage — e.g. `Build agents on infrastructure that thinks like them` appears four times as alt text across mobile-dark, mobile-light, desktop-dark, desktop-light variants of one image. **A screen-reader user may encounter the same alt text four times for one visual.** This is the same defect class flagged in the Wise exemplar (duplicated responsive DOM), here confirmed rather than suspected: four `![alt](url)` instances with matching alt are present in the served markup.
- Alt text, where present, **duplicates the adjacent heading verbatim** rather than describing the image. `alt="Ship apps that scale from zero to millions instantly"` on a product screenshot tells a non-sighted reader nothing the heading did not. Compare GitHub, which narrates the demo. **Weakest alt-text practice in this batch.**
- One `![](<>)` — an image with **empty alt and an empty URL** — appears in both the homepage and error-page markup immediately after the nav. Either a placeholder or a broken asset; either way an empty `src`.
- The `Passport` card renders the word in five scripts (`Passport - Pasaporte - Passaporto - パスポート Iss 2026`) as decorative typography, and it lands in the text layer as a run-on string.
- Status-page phone-country list renders 190+ options as plain text in the served markup, with `* United States (+1)` carrying a stray asterisk marking the default — Atlassian furniture.
- `supported.` appears as an orphan word in the docs feedback widget. Truncated string in the accessible text.
- `Ask AI` and `Copy page` are text-labelled controls (not icon-only), which is good.
- **No accessibility statement, conformance report, or a11y documentation page was located.** GitLab publishes an ACR and a nine-page accessibility section; GitHub has `accessibility.github.com` linked from the Trust Center. Vercel's `Vercel Toolbar` glossary entry mentions "accessibility audits" as a *feature for customers*, but no equivalent artefact for Vercel's own product was found. Recorded as a gap.

**Negative findings, recorded honestly**

- `initializing` vs `initialized` for one deployment state, three times in one live incident
- `Local` vs `Local Development` for one environment, two sentences apart
- `Delivery Network` (docs nav) vs `Content Delivery` (footer) vs `CDN` (glossary, status page) for one product
- `Error Code:` used as the label for the **HTTP status**, on pages whose H1 is the actual error code
- Error index declares two classes (`Application errors`, `Platform errors`); error summaries use at least four (`application`, `deployment`, `DNS`, `platform`)
- REST API reuses `not_found`, `forbidden`, `not_modified`, and `missing_name` across semantically different errors, so a client cannot branch on `code`
- `not_modified` used for "The domain already exists", which is a conflict, not an unmodified state
- **`### Missing DNS record name` appears twice** in the REST errors page with different bodies; the first instance's heading, prose, and code (`missing_type`) all disagree
- Three placeholder conventions in error messages: bare `RESOURCE`/`METHOD`, quoted `\"KEY\"`, and `#`
- Two code-casing conventions with no stated rule: `SCREAMING_SNAKE_CASE` platform codes, `snake_case` API and dashboard codes
- `Where do I understand my usage?` — ungrammatical FAQ heading on a billing page
- "One of the benefits to always being on, is that…" — comma splice in published docs
- `Try again in 7 days` lacks a terminal full stop where the preceding sentence has one
- `We will provide` / `We'll provide` in consecutive updates of one incident
- `elevated` / `increased` used interchangeably for one condition in consecutive updates of one incident
- Incident titles mix Title Case (`Elevated Errors Triggering Deployments`) and sentence case (`Elevated error rate on Connect and Passport`)
- The `Invoice Generation Paused` incident collapses three updates into one Resolved field separated by `---`, losing timestamps
- Homepage rotating subhead ends on `For coding agents to ship apps and agents automated by agents.` — *agent* three times in eleven words; all three variants concatenate in the DOM
- `✓ Building image from Dockerfile.` — present participle on a completed-step success line
- `New` badges concatenate into link text (`Vercel DropNew`, `PassportNew`, `Queues SDKNew`)
- Four identical alt strings per homepage image (dark/light × mobile/desktop)
- Alt text duplicates the adjacent heading rather than describing the image
- `![](<>)` — empty alt, empty src — in homepage and error-page markup
- `supported.` orphan string in the docs feedback widget
- `Dashboard` appears three times and `Builds` twice as status-page component names; one component has no name at all
- CDN region labels use four geographic granularities (`Hong Kong` / `Dublin, Ireland` / `Cleveland, East US` / `Paris, France, Europe` / `San Francisco, CA, USA`)
- `prerequisites: []` declared and empty on all thirteen pages — a structured field asserting "none" where "unpopulated" is likelier
- `EDGE_CONFIG` remains the variable name after the product was renamed `Global Config`
- `Connect` is a nav product and a status component with **no glossary entry**
- Colon placement drifts inside bolded troubleshoot leads (`**Check application logs**:` vs `**Check configuration:**`)
- `one hundred` (spelled) and `100` (numeral) for limits on adjacent reference pages
- `Something went wrong` shipped as canonical error-page copy — defensible for a platform 5xx, but it is the exact string a peer's style guide rejects
- `Log In` / `Sign Up` title-cased, against the sentence-case norm of both direct competitors
- No published content style guide, no accessibility statement, no design-system content guidance

---

## Transferable patterns

1. **Close every error summary with `This is a <class> error.`** One short declarative sentence that pre-empts the reader's first question — is this my fault, my code's, or yours? Machine-parseable, one line, no cost. Condition: the class taxonomy must be fixed and must match the index, which is where Vercel currently fails; get the taxonomy right first and the sentence does the rest.
2. **Publish the proprietary code and the standard one together.** `FUNCTION_INVOCATION_TIMEOUT` shown beside `504` / `Gateway Timeout` on the same page means a user who has only the browser's status, or only the vendor's code, can both arrive. Directly analogous to Wise's regulator-format fee table: primary artefact optimised for the vendor's model, secondary artefact in the universal standard. Applies to any product with internal codes layered on an industry standard — ISO reason codes, card decline codes, SWIFT return codes.
3. **Put the limit, the observed value, and the wait into the error string.** `The rate limit of 6 exceeded for 'api-www-user-update-username'. Try again in 7 days` and `Too many env vars have been supplied (100 max allowed, but got #)`. Naming the bucket, the ceiling, the actual, and the human-readable retry window removes the entire diagnostic step. Condition: requires the values at message-construction time; the payoff is that the fix travels with the failure.
4. **Put an example inside the message, not beside it.** `The URL was expected to include the domain name. Example: /domains/google.com`. `Example:` as a message-internal convention means the repair is available wherever the error is logged, quoted, or pasted — including into a support ticket or an AI chat, where adjacent documentation does not follow.
5. **State the negative scope in the resolution note.** `Existing deployments and traffic are unaffected and no action is required.` Answers *am I hit* and *must I act* in one clause, positioned where a late-arriving reader sees it first. The single best status-page sentence pattern in this batch, and it transfers unchanged to payment incidents, dispute backlogs, and maintenance notices.
6. **Ship `Identified` as a distinct incident state.** Between `Investigating` and `Monitoring` sits the moment the cause is known and the fix is not yet out. That is the point at which users can stop diagnosing on their own. GitHub omits it; Vercel's `The issue has been identified and a fix is being implemented.` is worth adopting verbatim.
7. **Say what could not be recovered.** "Affected Drains data could not be redelivered." Stating permanent loss in the resolution note, flatly and without apology, is more trustworthy than stopping at "resolved" — and it pre-empts the support wave from users waiting for data that will never arrive.
8. **Pair the opaque identifier with the plain-language label, always both.** `IAD1 - Washington DC, USA`. A developer with a log line and a manager with a mental model both find the same row. Condition: pick one geographic granularity and hold it — Vercel's own list drifts across four.
9. **Formalise release maturity as six access-defined states.** `Alpha` / `Beta` (no SLA) / `Private Beta` (NDA) / `Limited Beta` (announced, gated) / `Public Beta` (open) / `GA`. Defining the phases by *what the customer gets and has signed* rather than by code completeness gives every Beta badge in the product a contractual meaning. Most orgs have these states informally and argue about them quarterly.
10. **Document the silent no-op as an error.** `Unused build and development settings`, `Unused Vercel Function region setting` — entries for cases where nothing failed and the user's configuration was simply ignored, explaining which source wins. Applies to any product with layered configuration (dashboard vs file vs CLI flag vs environment variable), which is to say most enterprise products.
11. **Prohibition → the consequence it prevents → the named override.** "You cannot redeploy a production deployment if a more recent one exists. The reason is that redeploying an old production deployment would result in overwriting the most recent source code… To force an explicit overwrite, select **Promote** instead." Three moves. The third is what stops the user filing a bug: the platform is not refusing, it is routing.
12. **Branch the remedy by plan, and include an `Any plan:` fallback.** The `repo_links_exceeded_limit` entry gives a Hobby remedy, a Pro/Enterprise remedy, and a plan-independent one. A user on any tier finds a route out, and the upsell sits beside a free alternative rather than replacing it.
13. **Tell the user where the same error string appears.** "You'll see this code in the API response and in the dashboard." One sentence that prevents "is this the same problem?" across two surfaces. Also a content-ops artefact: it is the inventory a writer needs before changing the string.
14. **Make the last troubleshooting step "it might be us", and link the status page.** `DEPLOYMENT_BLOCKED` step 6. Costs nothing, saves a support ticket, and its absence is conspicuous once you have seen it.
15. **Tell customers to embed the request ID and error code in their own error page.** `::vercel:REQUEST_ID::` / `::vercel:ERROR_CODE::`, with the stated reason being support-ticket quality. Resolves the "don't show users technical detail" argument by distinguishing codes-as-explanation (avoid) from codes-as-reference (require). Directly applicable to any white-labelled or embedded experience, including payment SDKs rendered inside a merchant's page.
16. **One error page covers the class; specific pages override.** "For most cases, you only need to create a single `500` error page… so you don't need to design a separate page for each error type", plus a published fallback-routing table. A scoping instruction that saves a content team ten pages of work, and the constraint is justified by the failure mode ("these pages handle platform errors, they can't rely on server-side rendering… that might also fail").
17. **Disclose date-scoped defaults with the cutover date.** "On by default for projects created after November 19, 2024." "For Projects created on or after the date, it's no longer possible to…" Tells long-tenured users their reality differs from the documented one and prevents a whole class of "the docs are wrong" reports.
18. **Write the alias into the glossary.** Ten redirect-only entries (`Middleware` → "See Routing Middleware.") mean a reader looking up the word they actually use is never told it does not exist. The cheapest possible fix for a rename, and the one most teams skip.
19. **Name the absent prerequisites, not the present capability.** "lets you deploy a file or folder by dragging it into your browser. **You don't need Git, the CLI, or any local setup.**" Listing the three barriers removed is more persuasive than listing the one thing enabled. Applies to any low-friction alternative path — guest checkout, one-tap, no-account flows.
20. **`<Verb> <object> that <differentiator>`, held across every section header.** `Build agents on infrastructure that thinks like them` / `Ship apps that scale from zero to millions instantly` / `Host platforms that serve every customer`. Three audiences, three verbs, one shape. The most disciplined headline template in this batch.

## Caveats & gaps

- **`/pricing` was not harvested.** All pricing observations come from `/docs/plans` and the glossary, which give plan names, quota examples, and add-on prices in prose but no price table, no currency statement, no billing-period toggle, and no tax disclosure. T10 is therefore structurally incomplete, and any conventional pricing FAQ (which would materially change T12) is unexamined.
- **The full platform error-code list was not obtained.** `/docs/errors` renders `## Application errors` and `## Platform errors` as client-side lists that are empty in the served markdown, so the complete catalogue — likely 40+ codes — is unharvested. Four codes were read individually (`FUNCTION_INVOCATION_TIMEOUT`, `FUNCTION_THROTTLED`, `DEPLOYMENT_BLOCKED`, `DNS_HOSTNAME_NOT_FOUND`) plus five named in passing (`FALLBACK_BODY_TOO_LARGE`, `EDGE_FUNCTION_INVOCATION_TIMEOUT`, `INTERNAL_FUNCTION_INVOCATION_TIMEOUT`, `INTERNAL_EDGE_FUNCTION_INVOCATION_TIMEOUT`, `EDGE_FUNCTION_INVOCATION_FAILED`, `MIDDLEWARE_INVOCATION_TIMEOUT`). The naming *system* is therefore well evidenced — `[SCOPE_]SUBJECT_EVENT_CONDITION`, with `INTERNAL_` as a prefix distinguishing platform-side from customer-side failures of the same kind — but the inventory is partial. `/docs/sitemap` or `/docs/graph.json` would supply it.
- **No published content style guide, voice-and-tone documentation, or design-system content guidance was located.** `Geist` exists only as a DOM identifier in this harvest. Every T14 voice observation is inferred from output, not read from a rule, and is correspondingly weaker than the GitHub (Primer) and GitLab (Pajamas) equivalents. If Vercel's guidance exists, it is internal.
- **No accessibility statement, VPAT, or conformance report was located**, and the alt-text and duplicate-DOM defects recorded in T14 are therefore unmeasured against any stated standard.
- **All in-product strings are `[documented]` or absent.** Deployment states, dashboard labels, toasts, empty states, form validation, and the build-log UI are behind auth. The state names in T6.1 come from glossary definitions and retention-policy prose, so the *rendered* labels may differ — and the `initializing`/`initialized` discrepancy is direct evidence that they sometimes do.
- **Build-failure copy specifically was not obtained.** Vercel's build logs and the `Deployment failed` surfaces are the single richest unobserved error surface for this product, and they are the ones most users actually meet. What was harvested is the *reference* layer beneath them.
- **Trust Center (`security.vercel.com`) not fetched**, so compliance-framework naming, certification claims, and security disclosure copy are unexamined. T10's compliance coverage rests on glossary definitions and footer labels only.
- **Knowledge Base articles were not opened.** Twelve KB titles were captured from docs cross-links, which is enough to establish the question-form title grammar, but no KB article body was read — so the answer structure of Vercel's symptom-driven help surface is unknown. Given that KB is one of two doors in Vercel's help architecture (T11), this is a significant hole.
- **Homepage body copy is largely animation-driven and absent from server HTML.** The three rotating hero subheads were recoverable only as a concatenated string, the twelve feature names appear without their surrounding copy, and the interactive drop-to-deploy demo is not readable. T2 and T3 are correspondingly thinner than for GitHub or GitLab, and the CTA inventory should be assumed incomplete.
- **`prerequisites: []` on every page harvested** may mean the field is unpopulated platform-wide rather than genuinely empty; do not cite Vercel's prerequisites metadata as evidence of a populated structured field.
- **Incident sample is fifteen days** (7–21 September 2026), eight incidents. The severity-adjective drift and the casing inconsistency in incident titles are drawn from a short window.
- **Status page is Atlassian Statuspage**, so form labels, subscription copy, legend wording, and the no-data strings are Atlassian's content standard, not Vercel's. The incident prose and component names are Vercel-authored; the furniture is not. Attributions in T6, T8, and T9 distinguish these.
- **en-US only.** No locale switcher was observed and `og:locale` is `en_US`; whether Vercel localises at all is unestablished.
- **Docs pages carry per-page `last_updated` values spanning 2025-12-18 to 2026-09-21**, so the error reference is of mixed freshness. The `FUNCTION_INVOCATION_TIMEOUT` page's rendered footer says `Last updated May 14, 2026` while its sibling markdown files declare February and August 2026 dates — cite the per-page date, not a single harvest date, for any specific string.

## Sources

1. https://vercel.com/
2. https://vercel.com/docs/errors
3. https://vercel.com/docs/errors/error-list
4. https://vercel.com/docs/errors/FUNCTION_INVOCATION_TIMEOUT
5. https://vercel.com/docs/errors/FUNCTION_THROTTLED.md
6. https://vercel.com/docs/errors/DEPLOYMENT_BLOCKED.md
7. https://vercel.com/docs/errors/DNS_HOSTNAME_NOT_FOUND.md
8. https://vercel.com/docs/rest-api/errors
9. https://vercel.com/docs/custom-error-pages
10. https://vercel.com/docs/deployments
11. https://vercel.com/docs/glossary
12. https://vercel.com/docs/plans
13. https://vercel.com/docs/errors.graph.md
14. https://www.vercel-status.com/
