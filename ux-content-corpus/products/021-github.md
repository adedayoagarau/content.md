# 021. GitHub

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Code hosting and collaboration / AI-assisted developer platform |
| Primary URL | https://github.com/ |
| Corpus rank | 021 |
| Benchmark strength (source list) | Action labels, status, recovery, documentation |
| Locale / market observed | en-US (docs served `/en/`; footer language selector present) |
| Platform observed | Web (marketing), docs.github.com, primer.style (design system), Statuspage-hosted status site |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 1 Type 2 / SOC 2 Type 2, ISAE 3000 / 3402, FedRAMP Tailored ATO, EU + Australia data residency; Microsoft Responsible AI Standard and NIST AI RMF named on Trust Center |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 |
| Harvest completeness | Full for T1–T3, T6, T7, T11, T13, T14. Partial for T5, T8, T9 (in-product strings are behind auth; captured via Primer guidance and docs quotation). T4 and T12 thin. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://github.com/ | Hero, five-verb feature tabs, nav taxonomy, alt text, signup form |
| Pricing | https://github.com/pricing | Three plans, comparison matrix, add-on naming, quota language |
| Docs index | https://docs.github.com/en | Ten top-level doc groupings — the primary IA artefact |
| Status page | https://www.githubstatus.com/ | 12 components, 4 status levels, incident-update vocabulary, 8 days of incident prose |
| REST API troubleshooting | https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api | Richest single error-reference page: HTTP codes + message strings + `errors[].code` table |
| Deployment statuses (REST) | https://docs.github.com/en/rest/deployments/statuses | The seven canonical deployment state names |
| Status checks reference | https://docs.github.com/en/pull-requests/reference/status-checks | Nine check statuses + eight conclusions, with definitions |
| PR merges | https://docs.github.com/en/pull-requests/.../about-pull-request-merges | Three merge-button labels, merge-message generation rules |
| SSH: Permission denied (publickey) | https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey | Error-titled article; shows verbatim CLI error and success strings |
| Primer — Content foundations | https://primer.style/product/getting-started/foundations/content/ | **Published UI content style guide with do/don't pairs** — highest-value page in this file |
| Primer — Empty states | https://primer.style/product/ui-patterns/empty-states/ | Blankslate anatomy and empty-state/error copy doctrine |
| Trust Center | https://github.com/trust-center | Privacy principles, AI FAQ, compliance naming |

---

## T1 Navigation & IA labels

**Global nav — five items, four of which expand into grouped mega-menus** `[observed]`

`Platform` · `Solutions` · `Resources` · `Open Source` · `Enterprise` · `Pricing` · `Sign in` · `Sign up`

`Pricing` is the only flat link among the six. The pattern worth noting: GitHub does not offer a "Products" menu. `Platform` replaces it, and the platform menu is subdivided by **stage of work**, not by product family:

| Group heading (all caps in source) | Members |
|---|---|
| `AI CODE CREATION` | `GitHub Copilot` · `GitHub Copilot app` · `MCP Registry` |
| `DEVELOPER WORKFLOWS` | `Actions` · `Codespaces` · `Issues` · `Code Review` · `Code Quality` |
| `APPLICATION SECURITY` | `GitHub Advanced Security` · `Code security` · `Secret protection` |
| `EXPLORE` | `Why GitHub` · `Documentation` · `Blog` · `Changelog` · `Marketplace` |

**Every product nav item carries a verb-phrase gloss inline** `[observed]` — this is the single most reusable GitHub nav pattern. The label is the noun, the gloss is the imperative:

- `Actions` — "Automate any workflow"
- `Codespaces` — "Instant dev environments"
- `Issues` — "Plan and track work"
- `Code Review` — "Manage code changes"
- `Code Quality` — "Enforce quality at merge"
- `GitHub Copilot` — "Write better code with AI"
- `GitHub Copilot app` — "Direct agents from issue to merge"
- `MCP Registry` — "Integrate external tools"
- `GitHub Advanced Security` — "Find and fix vulnerabilities"
- `Code security` — "Secure your code as you build"
- `Secret protection` — "Stop leaks before they start"
- `GitHub Sponsors` — "Fund open source developers"

Note the capitalisation inconsistency: `Code Review` and `Code Quality` are title case while `Code security` and `Secret protection` are sentence case, in the same menu. Primer's own rule says sentence case. **Defect.**

**Solutions menu is faceted three ways** `[observed]`: `BY COMPANY SIZE` (`Enterprises`, `Small and medium teams`, `Startups`, `Nonprofits`) · `BY USE CASE` (`App Modernization`, `DevSecOps`, `DevOps`, `CI/CD`) · `BY INDUSTRY` (`Healthcare`, `Financial services`, `Manufacturing`, `Government`). Each facet ends with a `View all …` escape hatch.

**Docs IA — ten groupings, ordered by user maturity then role** `[observed]`

`Get started` · `Collaborative coding` · `GitHub Copilot` · `CI/CD and DevOps` · `Security and code quality` · `Client apps` · `Project management` · `Enterprise and teams` · `Developers` · `Community` · `More docs`

Two things are notable. First, `Security and code quality` is the only grouping whose children are **task phrases rather than product nouns**: `Secure your secrets` · `Find and fix code vulnerabilities` · `Secure your supply chain` · `Maintain quality code` · `Secure at scale`. Everywhere else the docs index lists product names. Security is the one area where GitHub decided the user does not know the product name they need.

Second, `Secure at scale` appears twice in the index — once under `Security and code quality`, once under `Enterprise and teams` — pointing at the same URL. Deliberate cross-listing rather than an error, but it means the IA is not a strict tree.

**Docs article-level IA is a four-way split repeated per product** `[observed]`, visible in the Actions and Pull requests sidebars:

`Get started` → `Concepts` → `How-tos` → `Reference` → `Tutorials`

This is a Diátaxis-style taxonomy applied consistently. `Concepts` pages are titled as bare nouns (`Workflows`, `Variables`, `Contexts`, `Expressions`, `Concurrency`). `How-tos` are titled as imperatives (`Trigger a workflow`, `Control jobs with conditions`, `Cancel a workflow run`, `Re-run workflows and jobs`, `Skip workflow runs`). `Reference` pages are titled as noun phrases (`Workflow syntax`, `Events that trigger workflows`, `Limits`). The grammar of the title tells the reader which of the four modes they are in without reading the breadcrumb.

**Footer groupings** `[observed]`: `Platform` · `Ecosystem` · `Support` · `Company`. `Status` sits inside `Support` alongside `Docs`, `Community Forum`, `Premium Support`, and — notably — `What is Git?`, a beginner-education link given equal footer weight to enterprise support.

**Breadcrumbs** `[observed]` — docs pages carry a scrollable breadcrumb with explicit affordance labels `Scroll breadcrumbs left` / `Scroll breadcrumbs right`, plus `Collapse sidebar` / `Expand sidebar`. Chrome controls are labelled in words, not icon-only.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The future of building happens together`
> Body: "Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform."

The headline is an abstract claim, not a task — the opposite of the Wise pattern. The subhead does the differentiating work, and the notable move is the tricolon "developers, agents, and code", which quietly installs `agents` as a peer category to humans. That single coordination is the 2026 positioning.

The page `<title>` is a different line again: `GitHub · Change is constant. GitHub keeps you ahead.` Two-sentence slogan in the title, abstract claim in the H1 — **two competing taglines on one page.** The meta description is a third framing: "the world's most widely adopted, AI-powered developer platform".

**Section headers are benefit assertions, several of them compound** `[observed]`

- `Accelerate your entire workflow`
- `Built-in application security where found means fixed`
- `Work together, achieve more`
- `Millions of developers and businesses call GitHub home`
- `From startups to enterprises, GitHub scales with teams of any size in any industry.` (the only section header punctuated with a full stop)

**Sub-headline pattern — declarative claim, then mechanism sentence** `[observed]`. Each accordion panel and pillar card uses the same two-part shape:

- `Your AI partner everywhere.` — "Copilot is ready to work with you at each step of the software development lifecycle."
- `Plan with clarity.` — "Organize everything from high-level roadmaps to everyday tasks."
- `Apply fixes in seconds.` — "Spend less time debugging and more time building features with Copilot Autofix."
- `Security debt, solved.` — "Leverage security campaigns and Copilot Autofix to reduce application vulnerabilities."
- `Dependencies you can depend on.` — "Update vulnerable dependencies with supported fixes for breaking changes."
- `Your secrets, your business.` — "Detect, prevent, and remediate leaked secrets across your organization."

The first half is a fragment ending in a full stop; the second half is a full sentence. `Security debt, solved.` and `Your secrets, your business.` are both **elliptical** — no verb at all. `Dependencies you can depend on.` is the one pun on the page. Note Primer's own guidance says "Be very thoughtful when introducing humor to the interface" — marketing takes a licence the product surface is denied.

**Short benefit labels used as accordion tab captions** `[observed]`: `Keep track of your tasks` · `Share ideas and ask questions` · `Review code changes together` · `Fund open source projects` · `Automate your path to production` · `Code instantly from anywhere` · `Keep momentum on the go` · `Shape your toolchain`. All imperative, all 3–5 words, all paired with `Explore <ProductName>` as the CTA.

**Feature tab labels are five bare verbs** `[observed]`: `Code` · `Plan` · `Collaborate` · `Automate` · `Secure`. A complete SDLC compressed into five one-word tabs — the tightest naming artefact on the site.

**Coined marketing phrase, used as a section header** `[observed]`: `found means fixed`, lowercase, embedded mid-header ("Built-in application security where found means fixed") and reused as a standalone resource-card title (`Found means fixed`). A three-word compound that asserts a process guarantee.

**Pricing headline** `[observed]`: `Try GitHub, the complete developer platform`, with an unusually conversational lead-in body: the copy opens by conceding the product is complicated ("We get it, there's a lot you can do with GitHub.") before offering the trial as the resolution. Conceding complexity as a pricing-page opener is rare and effective.

**Pricing page `<title>`** `[observed]`: `Pricing · Plans for every developer`.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | |
| `Sign in` | Global nav | Primer mandates "sign in" over "log in" — and the nav complies |
| `Sign up for GitHub` | Hero email form submit, repeated in page-foot form | Form-scoped, names the destination |
| `Download GitHub Copilot app` | Beside hero signup, and repeated at page foot | |
| `Explore GitHub Copilot` | Section CTA | `Explore` + product name is the dominant homepage pattern |
| `Explore GitHub Actions` | Accordion CTA | |
| `Explore GitHub Codespaces` | Accordion CTA | |
| `Explore GitHub Mobile` | Accordion CTA | |
| `Explore GitHub Marketplace` | Accordion CTA | |
| `Explore GitHub Issues` | Accordion CTA | |
| `Explore GitHub Discussions` | Accordion CTA | |
| `Explore GitHub Projects` | Section CTA | |
| `Explore GitHub Sponsors` | Accordion CTA | |
| `Explore code review` | Accordion CTA | **Lowercase and no `GitHub` prefix** — breaks the pattern of the nine above it |
| `Explore GitHub Advanced Security` | Security section | |
| `Learn about GitHub Code Security` | Security pillar | `Learn about` vs `Explore` for adjacent cards — two verbs, one function |
| `Learn about Dependabot` | Security pillar | |
| `Learn about GitHub Secret Protection` | Security pillar | |
| `Read customer story` | Repeated on every customer card | |
| `Read industry report` | Gartner card | |
| `Read the case study` | Pricing-page testimonials | **Third label for "read a customer document"** alongside `Read customer story` |
| `Explore customer stories` | Section foot | |
| `View all features` / `View all solutions` / `View all resources` / `View all use cases` / `View all industries` / `View all topics` | Mega-menu feet | Consistent `View all <plural noun>` |
| `Subscribe` | Footer newsletter | |
| `Start free for 30 days` | Pricing hero | Duration in the label |
| `Join for free` | Free plan card and comparison table | Not "Sign up" — a third acquisition verb |
| `Continue with Team` | Team plan card | `Continue with` implies an in-progress flow that does not exist yet |
| `Start a free trial` | Enterprise plan card | Fourth acquisition verb on one page: `Start free for 30 days` / `Join for free` / `Continue with Team` / `Start a free trial` |
| `Contact Sales` | Enterprise card | Title case; `Contact sales` also appears lowercase on Trust Center — **same action, two casings** |
| `Show features` | Foot of each plan card | Progressive disclosure |
| `Compare all features` | Below add-ons | Anchors to `#compare-features` |
| `Compare plans` | Copilot add-on row | |
| `Switch plans` | Comparison-table control | |
| `Learn more` | Repeated on five add-on rows and several feature blurbs | **Bare `Learn more` ships here**, unlike Wise. The surrounding row supplies the object, but the accessible name alone is uninformative |
| `See pricing details` | Sandbox add-on row | More specific sibling of `Learn more` in the same list |
| `pricing calculator` | Inline link, lowercase mid-sentence | |
| `Start a free 30 day trial` | Inline in Enterprise data-residency blurb | Fifth trial label; note missing hyphen in "30 day" |
| `contact our sales team` | Inline, lowercase | |
| `Make a contribution` | Docs page foot, under "Help us make GitHub Docs great!" | Framing the docs repo as contribution, not feedback |
| `Ask the GitHub community` | Docs page foot | |
| `Contact support` | Docs page foot | Last in the escalation ladder |
| `Expert services` | Docs page foot | |
| `Copy markdown` / `Copy as Markdown` | Docs article header | **Two labels for one control on different doc pages** — capitalisation and preposition both differ |
| `Subscribe to Updates` | Status page | Then `Subscribe via Slack`, `Atom Feed`, `RSS Feed` |
| `View historical uptime.` | Status page | Punctuated with a full stop, unusually for a link |
| `Incident History` | Status page foot | |
| `Merge pull request` | PR merge control | Default option |
| `Squash and merge` | PR merge control | |
| `Rebase and merge` | PR merge control | |
| `Create a merge commit` | Merge-option name in docs | Synonym for `Merge pull request` — **the docs name and the button label differ** |
| `Skip to content` / `Skip to main content` / `Skip to filter input` | Top of DOM across github.com, docs, Primer | Three variants across three surfaces |
| `Yes` / `No` | Docs feedback widget, under "Was this Doc helpful?" | Also appears as "Did you find what you needed?" on other doc pages — **two questions for one widget** |
| `Give feedback` | Primer chrome | |
| `Switch to dark mode` | Primer chrome | Names the destination state, not the current one |

**Observations.** GitHub's CTA discipline is strong within a pattern and weak across patterns. `Explore <Product>` is applied nine times consistently and broken once (`Explore code review`). The acquisition path carries five distinct labels on the pricing page alone. And the `Learn more` / `Learn about X` / `Explore X` / `See pricing details` cluster shows four verbs competing for the same job on adjacent rows.

## T4 Onboarding & getting-started

`[observed]` — thin on the marketing surface. There is no numbered "how it works" sequence on the homepage; the five feature tabs (`Code` · `Plan` · `Collaborate` · `Automate` · `Secure`) are the closest thing, and they are an SDLC ordering rather than a user onboarding sequence.

**Signup entry is a single field** `[observed]`: the placeholder `Enter your email` with submit `Sign up for GitHub`, duplicated in the hero and at the page foot. One field is the entire pre-auth funnel.

`[documented]` — docs model getting-started as a named doc genre rather than a flow. Every product section opens with a `Get started` grouping, and the article titles inside it are consistent across products: `Quickstart`, `Understand GitHub Actions`, `Continuous integration`, `Continuous deployment`, plus role-scoped quickstarts under Pull requests (`Pull request quickstart`, `Stacked PRs quickstart`, `Review quickstart`). `Quickstart` is one word, unhyphenated, used as a noun.

Enterprise onboarding is a named docs product area (`Enterprise onboarding`), which is unusual — onboarding treated as a documented surface with its own IA node.

**Prerequisite framing** `[observed]` — docs how-tos open with a bare permission sentence before step 1: "Read access to the repository is required to perform these steps." Stated as a fact, not a warning, and placed before the first instruction rather than after a failure.

## T5 Form & field labels

`[observed]` on public surfaces — sparse, since almost every GitHub form is post-auth.

| Label / placeholder | Surface |
|---|---|
| `Enter your email` | Homepage signup (placeholder doing the work of a label) |
| `Search` with the keybinding hint `/` | Global nav on github.com |
| `Search or ask Copilot` with hint `/` | docs.github.com search — **the search field is also the AI entry point** |
| `Search for anything...` | Docs homepage search |
| `Search Product UI` | Primer search |
| `Email address:` | Status page subscribe |
| `Enter OTP:` | Status page subscribe |
| `Country code:` | Status page SMS subscribe |
| `Phone number:` | Status page SMS subscribe |
| `Webhook URL:` | Status page webhook subscribe |
| `Change number` | Status page, beside phone field |

Note the status page uses **colon-terminated labels** (`Email address:`, `Enter OTP:`) — Primer explicitly forbids this ("Do not include colons in form labels"). The status page is Atlassian Statuspage, outside GitHub's design system, so the guidance does not reach it. A clean example of a third-party surface leaking a different content standard into a brand's user journey.

`[documented]` — Primer's form rules are published: sentence case for titles, labels, and fields; no colons; action labels start with an imperative verb; labels may shorten to adjective-plus-noun (`New issue`).

**Field-level validation grammar is specified with do/don't pairs** `[documented]`:

> Do: `Enter a name` · `Your name must be between 2 and 20 characters`
> Don't: `Error 1234567890` · `You forgot to add your name`
> Do: `Enter a credit card number` — Don't: `Field required`

The instructive part is the pairing of an **imperative repair instruction** (`Enter a name`) with a **declarative constraint statement** (`Your name must be between 2 and 20 characters`). Primer's rejected alternative `You forgot to add your name` is rejected specifically for assigning blame, and `Field required` for being unspecific.

**Docs body parameter labels** `[observed]` — API reference fields are typed and annotated in a fixed order: name, type, `Required` flag, description, then `Default:`. Enumerations are introduced with the fixed phrase "Can be one of:".

## T6 Status & state language

This and T7 are the two deepest categories for GitHub. The product ships **at least four separate, non-aligned state vocabularies**, and the gaps between them are the finding.

### 6.1 Check statuses — nine names `[documented]`

From the status-checks reference. Checks "move through statuses as they run, then receive a conclusion when they finish."

| Status | Gloss (verbatim) | GitHub Actions only? |
|---|---|---|
| `completed` | "The check run completed and has a conclusion" | No |
| `expected` | "The check run is waiting for a status to be reported." | Yes |
| `failure` | "The check run failed." | No |
| `in_progress` | "The check run is in progress." | No |
| `pending` | at front of queue but concurrency limit reached | Yes |
| `queued` | "The check run has been queued." | No |
| `requested` | "created but has not been queued" | Yes |
| `startup_failure` | "The check suite failed during startup." | Yes |
| `waiting` | waiting for a deployment protection rule to be satisfied | Yes |

Four of the nine distinguish **stages of not-yet-running**: `requested` (created, not queued) → `queued` (in queue) → `pending` (front of queue, blocked by concurrency) → `waiting` (blocked by a protection rule). That is a four-way taxonomy of "nothing is happening yet", each with a different cause. Most products ship one word for this. The cost is that `pending` and `waiting` are near-synonyms in English carrying entirely different system meanings, and `expected` is used to mean "waiting for an external reporter" — a sense of "expected" no user would guess.

### 6.2 Check conclusions — eight names `[documented]`

`action_required` · `cancelled` · `failure` · `neutral` · `skipped` · `stale` · `success` · `timed_out`

`failure` appears in **both** the status list and the conclusion list, which means one token occupies two positions in the same state machine. `neutral` is glossed as "completed with a neutral result. This is treated as a success for dependent checks" — a state whose name says nothing and whose behaviour is success. `stale` is glossed as "marked stale by GitHub because it took too long", which is functionally a timeout, sitting beside a separate `timed_out`. Two names, two timeout semantics, no user-facing distinction explained.

The documented consequence of a skip is a flagged trap: "A job that is skipped will report its status as 'Success'. It will not prevent a pull request from merging, even if it is a required check." GitHub is documenting a case where the displayed state is misleading rather than renaming the state — the same manoeuvre Wise makes with "complete".

### 6.3 Deployment statuses — seven names `[documented]`

`error` · `failure` · `inactive` · `in_progress` · `queued` · `pending` · `success`

A **third** vocabulary, overlapping the check vocabulary on `failure`, `in_progress`, `queued`, `pending`, `success` — but adding `error` (distinct from `failure`, with no explanation of the difference anywhere on the page) and `inactive`. The example progression given is "from `pending` to `in_progress` to `success`".

`inactive` carries a documented rename in the UI: "When you set a transient deployment to `inactive`, the deployment will be shown as `destroyed` in GitHub." **The API state name and the displayed state name are different words** — `inactive` in the payload, `destroyed` on screen. That is the single most quotable status finding in this file: a state whose technical name is neutral and whose user-facing name is violent.

Retention is stated in state terms too: 90 days for historical statuses, with the current status exempt "because it is stored on the deployment itself". 400 days for checks, then archived, then "10 days after archival, the data is permanently deleted" — with the recovery consequence spelled out: "To merge a pull request with checks that are both required and archived, you must rerun the checks."

Default status descriptions shipped in the API examples: `Deployment finished successfully.` — a full sentence with a full stop, capped at 140 characters by documented limit.

### 6.4 Incident status — four component levels `[observed]`

On githubstatus.com the legend is: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage`, plus `Maintenance`. Rollup headline when all clear: `All Systems Operational`.

Historical-uptime cells use a distinct, **past-tense sentence** register rather than labels: `No downtime recorded on this day.` · `No data exists for this day.` · `had a major outage.` · `had a partial outage.` The uptime grid speaks in sentences; the live components speak in labels.

**Component names** `[observed]` — twelve, and they are a deliberate mix of infrastructure and feature nouns: `Git Operations` · `API Requests` · `Webhooks` · `Issues` · `Pull Requests` · `Actions` · `Packages` · `Pages` · `Copilot` · `Codespaces` · `Copilot AI Model Providers`. Note `Copilot AI Model Providers` — GitHub publishes a status component for its **upstream vendors' availability**, which lets incident copy attribute fault outside the company while still owning the surface. Also note `Git Operations` and `API Requests` are named by *operation*, not by service, so a user can map "my push failed" to a component without knowing GitHub's architecture.

### 6.5 Pull-request and repository state vocabulary `[documented]`

`merged` is a state that can be reached without user action: "Pull requests that are merged indirectly are marked as `merged` even if branch protection rules have not been satisfied." `draft` is a named stage (`Draft pull requests`, and a how-to titled `Change the state` / `Change the stage of a pull request` — **two titles for one page**, one saying "state" and one saying "stage"). Also named: `head branch` / `base branch`, `common ancestor commit`, `merge queue`, `required` vs `archived` checks.

### 6.6 Time-as-status `[documented]`

Primer specifies three distinct time registers, chosen by the state of the thing being timed:

- **Relative** for most items — "a minute ago", "20 days ago"; switch to date-time past one month because such items are "less 'current' and more 'historical'"
- **Precise** for anything with an expiry the user must act before — weekday, date, month, year: "Thursday, 26 August 2021"
- **Elapsed** for actively running tasks — "2 minutes, 24 seconds", compacting to "2m 24s" where many are shown together

The rule that precise dates are reserved for "creation or expiration of certificates and keys" is a genuine content-design decision: **format precision tracks consequence**, not aesthetics.

## T7 Error, failure & recovery

The deepest category. GitHub's error content splits into three tiers with three different grammars: HTTP/API errors (cause-named), CLI/Git errors (verbatim terminal strings), and UI errors (governed by published rules).

### 7.1 API error reference — code, message, cause, recovery `[documented]`

From the REST troubleshooting page. The consistent structure is **HTTP code + quoted message string + cause + what to do**.

| HTTP code(s) | Message string / section title | Cause named | Recovery offered |
|---|---|---|---|
| `403 Forbidden` or `429 Too Many Requests` | primary rate limit; `x-ratelimit-remaining` is `0` | quota exhausted | Honour `retry-after`; else wait until `x-ratelimit-reset`; else wait ≥1 min then exponential backoff |
| `403` / `429` | secondary rate limit, with "an error message that indicates that you exceeded a secondary rate limit" | burst behaviour | Exponential backoff, then throw after N retries |
| `404 Not Found` | `404 Not Found` for an existing resource | unauthenticated request to a private resource | Check token scopes, permissions, resource owner, expiry; also check trailing slashes, URL-encoding, HTTP method |
| `400 Bad Request` | "Problems parsing JSON" | invalid JSON body | "use a linter or JSON validator" |
| `400 Bad Request` | "Body should be a JSON object" | body not an object | reformat |
| `400 Bad Request` | version not supported | bad `X-GitHub-Api-Version` | use a valid version |
| `422 Unprocessable Entity` | "Invalid request" | missing required params or wrong type | check reference docs for types |
| `422 Unprocessable Entity` | "Validation Failed" | request unprocessable | inspect `errors[].code` (table below) |
| `403`-class | "Resource not accessible by integration" / "Resource not accessible by personal access token" | insufficient token permissions | read `X-Accepted-GitHub-Permissions` header to learn the exact permission needed |
| timeout | "Server Error" message after 10 seconds | request too slow | check githubstatus.com; simplify the request; request fewer items per page |
| `401`-class | "Requires authentication" when using basic auth | basic auth unsupported | use a PAT or app token |
| (no code) | "User agent required" | missing `User-Agent` header | send username or app name |

**`errors[].code` sub-vocabulary for `422`** `[documented]` — six machine codes, each with a one-line human gloss:

| Code | Gloss (verbatim) |
|---|---|
| `missing` | "A resource does not exist." |
| `missing_field` | "A parameter that was required was not specified." |
| `invalid` | "The formatting of a parameter is invalid." |
| `already_exists` | "Another resource has the same value as one of your parameters." |
| `unprocessable` | "The parameters that were provided were invalid." |
| `custom` | "Refer to the `message` property to diagnose the error." |

`custom` is an explicit escape hatch in the error taxonomy — a machine code whose only content is "read the prose instead". Honest, and better than forcing every case into a wrong bucket.

**Grammatical pattern of GitHub's API errors: they name the cause, not the fix, and the fix is pushed into adjacent docs prose.** `"Resource not accessible by integration"` states the condition in the passive with the agent named at the end. `"Validation Failed"` names only the outcome. `"Problems parsing JSON"` names the activity that failed with no subject at all. None of the message strings themselves contain an imperative. Recovery lives entirely in the surrounding documentation — which is why the troubleshooting page exists at all.

**Two deliberate security-motivated error substitutions are documented** `[documented]` — both are cases where GitHub lies about the error on purpose and says so:

1. "GitHub uses a `404 Not Found` response instead of a `403 Forbidden` response to avoid confirming the existence of private repositories."
2. "If you send a request with an HTTP method that the endpoint does not support, you will receive a `404 Not Found` response instead of `405 Method Not Allowed`."

The first is a defensible privacy decision published openly; the second appears to be incidental routing behaviour documented rather than fixed. Publishing both is the transferable practice: if your error is intentionally wrong, say where and why.

**Escalating consequence stated in the error guidance** `[documented]`: "Continuing to make requests while you are rate limited may result in the banning of your integration." The error copy names the penalty for ignoring the error — rare and worth stealing for abuse-adjacent flows.

**Terminal fallback** `[documented]`: "If you observe an error that is not addressed here, you should refer to the error message that the API gives you. Most error messages will provide a clue about what is wrong and a link to relevant documentation." GitHub commits, in prose, to the practice of shipping a doc link inside error messages.

### 7.2 Error-titled help articles — the error string *is* the title `[observed]`

The SSH troubleshooting section titles articles with the verbatim terminal output, prefixed `Error:`:

- `Error: Permission denied (publickey)`
- `Error: Host key verification failed`
- `Error: Bad file number`
- `Error: Key already in use`
- `Error: Agent admitted failure to sign`
- `Error: Unknown key type`
- `Error: We're doing an SSH key audit`
- `Error: SSL certificate problem: verify that the CA cert is OK`
- `ssh-add "illegal option" error`
- `Permission to user/repo denied to other-user`
- `Permission to user/repo denied to user/other-repo`

This is the **paste-the-error-in-search** pattern, executed properly: the article title is byte-identical to what the user's terminal printed, so a copy-paste search hits it. Compare Wise's first-person confession titles (`I sent the wrong amount`) — same underlying insight (title the article in the user's own words), different because a developer's "own words" are the machine's words. The `Permission to user/repo denied to other-user` titles even preserve the **placeholder structure** of the real message, so the shape matches even though the values differ.

Note the register split inside the same list: nine titles carry the `Error:` prefix, two (`Permission to user/repo denied to …`) do not, and one (`ssh-add "illegal option" error`) puts "error" at the end in lowercase. Sidebar short forms diverge further (`Permission denied other-user`, `Permission denied other-repo`), so the same article has a long title and a truncated nav label that is not a prefix of it.

**Verbatim strings quoted inside the article** `[documented]`:

- Failure: `Permission denied (publickey).` (note the trailing full stop in the real output)
- Success contrast: `Hi USERNAME! You've successfully authenticated...`
- Diagnostic lines the user is taught to read: `debug1: No more authentication methods to try.` · `Trying private key: …` vs `Offering RSA public key: …`

The article's diagnostic method is unusual and good: it teaches the user to **read the difference between two log outputs** rather than just listing fixes. "'-1' at the end of the 'identity file' lines means SSH couldn't find a file to use." The user is handed the interpretation rule, not the answer.

**Recovery sequencing** — the article opens with a definition ("A 'Permission denied' error means that the server rejected your connection. There could be several reasons why, and the most common examples are explained below."), then orders fixes by likelihood, then ends with a **security warning** rather than a resolution:

> "If you see an SSH key you're not familiar with on GitHub, delete it immediately and contact us … An unidentified public key may indicate a possible security concern."

Ending a troubleshooting article on "the cause may be that you are compromised" is a deliberate choice to keep the worst branch visible instead of burying it.

**Error-titled articles elsewhere in docs** `[observed]`: `Commit missing in local clone` (long form: `Commit exists on GitHub but not in my local clone`) · `Linked to wrong user` (`Why are my commits linked to the wrong user?`) · `Commit blocked by push protection` (`My commit is blocked by push protection`) · `Troubleshooting required status checks` · `Troubleshoot stacked PRs` · `Troubleshooting two-factor authentication issues` · `Recovering your account if you lose your 2FA credentials` · `Deleted or missing SSH keys`.

`My commit is blocked by push protection` is first-person — the Wise confession pattern appearing once inside GitHub's otherwise machine-voiced error IA. `Commit exists on GitHub but not in my local clone` is also first-person and, notably, phrased as the **contradiction the user is experiencing** rather than as a fault.

### 7.3 Published UI error rules — Primer `[documented]`

This is the most transferable artefact in the whole file: GitHub publishes its error-copy rules with rejected alternatives.

> Overall: "Be friendly and helpful, and avoid jargon. Do not blame the user."

| Rule | Do | Don't |
|---|---|---|
| Be specific about the repair | `Enter a name` / `Your name must be between 2 and 20 characters` | `Error 1234567890` / `You forgot to add your name` |
| Name the field, not the rule | `Enter a credit card number` | `Field required` |
| Don't apologise | `All checks failed` | `Sorry, all checks failed` |
| Don't be funny | `Some checks failed` | `Oops, some checks failed` |

"In most cases, apologizing won't fix the problem. As a rule, do not apologize too much in any situation in the UI." And: "Humor isn't welcome in all situations, for example: in errors, when waiting, or when something fails." Plus a blunt requirement: "Error messages should be understandable by humans."

The `All checks failed` / `Some checks failed` pair is the cleanest example — the corrected strings are just the plain statement with the apology or the interjection stripped. Nothing is added; a word is removed. That is a rare and useful shape for a style rule.

**Error-code policy** `[documented]`, from the empty-states guidance:

> "Avoid language that's overly technical. If an error code is shown (for example, HTTP 500), make sure it's for relevant for diagnostic purposes or necessary transparency. Avoid using obscure error codes altogether."

(The typo "for relevant for" is in the published source.) Paired with an explicit calibration of over- and under-specificity: "There was a problem" is called out as frustrating, while "The US East-2 database cluster responsible for PR and issue comment data is down" is called out as excessive, on the grounds that it "could make less technical users feel dumb". The stated reason is epistemic, not stylistic: **"The way the user understands how GitHub works may be different from how it's literally built."** That sentence is the best single justification for plain-language error copy I found in this harvest.

**Recovery doctrine** `[documented]`: "If it's possible for the user to recover from the error, explain what went wrong and nudge them towards a path to recover… Try to push the user forward via an alternative path until they truly hit a dead end for completing their task." With a guard against fake helpfulness: "Don't try and push them in a different direction just to get them away from the error." And a fallback when there is no fix: secondary text "can provide additional relevant context or explain what they can do to get help."

### 7.4 Merge-failure and conflict recovery `[documented]`

`Rebase and merge` has a documented three-condition failure list, and the third condition is an unusual admission:

- "The pull request has merge conflicts."
- "Rebasing the commits from the base branch into the head branch runs into conflicts."
- "Rebasing the commits is considered 'unsafe,' such as when a rebase is possible without merge conflicts but would produce a different result than a merge would."

`"unsafe"` is in scare quotes in the source — GitHub coining a safety judgement it cannot fully define, then defining it by example. The recovery is then a three-step manual escalation (rebase locally → resolve conflicts on the command line → force-push), i.e. the product tells the user to leave the product.

There is also a preventative warning written as advice, not error: "If you plan to continue work on the head branch of a pull request after the pull request is merged, we recommend you don't squash and merge." Followed by the consequence: "you will have to resolve the same conflicts repeatedly." **Naming the recurring-pain outcome rather than just the immediate one.**

### 7.5 Incident communication vocabulary `[observed]`

Status-page update labels form a fixed five-verb lifecycle: `Investigating` → `Update` → `Monitoring` → `Resolved`, with `Maintenance` as a separate track.

The recurring boilerplate strings, verbatim:

- `We are investigating reports of degraded performance for Pull Requests`
- `We are investigating reports of degraded availability for API Requests, Issues, Pages and Pull Requests`
- `We are investigating reports of impacted performance for some GitHub services.`
- `Copilot AI Model Providers is experiencing degraded performance. We are continuing to investigate.`
- `The degradation has been mitigated. We are monitoring to ensure stability.`
- `The degradation affecting Pull Requests has been mitigated. We are monitoring to ensure stability.`
- `This incident has been resolved. Thank you for your patience and understanding as we addressed this issue. A detailed root cause analysis will be shared as soon as it is available.`

Three severity adjectives are in play and **are not used consistently**: `degraded performance`, `degraded availability`, and `impacted performance`. Within eight days the same template appears with all three. "Impacted performance" is also the weakest of the three — a nominalisation used where the component list is vague ("some GitHub services"), so the vaguest wording co-occurs with the vaguest scope.

`mitigated` is the pivotal word: it marks the point where user impact stops but the cause is not yet fixed, and it is consistently distinguished from `Resolved`. That two-stage close (`mitigated` → `resolved`) is precise and worth copying.

**Incident titles** follow three shapes `[observed]`: `Incident with Pull Requests` (component-named), `Disruption with some GitHub services` (vague), `Elevated rate of errors for OpenAI models provided by Copilot` and `Degradation with Gemini 3.8 Flash` (symptom-named, third-party named), and one full-sentence title: `Actions Larger Runner Jobs for some customers may be slow to start` — hedged with "may", scoped with "for some customers", and describing the symptom in the user's terms ("slow to start") rather than the system's.

**Retro / RCA prose structure** `[observed]` — the resolved updates on 13 and 14 September follow an identical five-part shape: (1) date and UTC window plus named affected services, (2) quantified impact as percentages, (3) plain-language causal narrative, (4) how it was detected and mitigated, (5) a list of prevention commitments with a timeframe.

The quantification is unusually specific: "approximately 28 services", "8.8% of requests… failed", "approximately 4% of workflows", "about 96% of attempts", "signup failures were above 90%", "5.7% of larger-runner jobs were affected". Naming the 96%-failure case rather than rounding to "significant impact" is the trust move.

The causal narrative is written in **plain, almost narrative English with a named villain and a named blind spot**: "The safeguard that was pacing the background job watched only one health signal — how far the database replicas were lagging — and that signal stayed low the whole time. It did not account for the load building on the primary itself, so the job kept writing while the primary quietly ran toward its limit." Note "quietly" — a single adverb of characterisation inside an incident report. And the two-failure enumeration that follows ("First, there was no quick timeout… Second, a retry loop…") is explicitly a list of *contributing* failures, not one root cause.

Apology practice on the status page **contradicts Primer**: "We sincerely apologize for the disruption." appears in the 15 September retro, and every generic resolution carries "Thank you for your patience and understanding". Primer says do not apologise in the UI; incident comms apologise routinely. Defensible as a register split by stakes — but it is a split, not a rule.

One incident update also contains **in-product workaround copy quoted into the status page**: "We recommend choosing another model or selecting 'Auto' to continue using Copilot." and "Customers can select another model or Auto in the meantime." The recovery action is named in the incident note, so a user reading the status page learns the workaround without going back to the product. Paired with a disclosed mechanism: "Our automated model-warning system activated in-product warnings for affected models during the incident" — GitHub telling users that the product warned them, on the status page.

## T8 Empty states

`[documented]` — no live GitHub empty state is reachable pre-auth, but Primer publishes the doctrine in full, and it is the most structured empty-state guidance in this corpus so far.

**The component is named `Blankslate`** — one word, capital B only. A coined internal noun that has leaked into public documentation, and a term a content designer would not guess from "empty state".

**Five-part anatomy, each with copy rules** `[documented]`: `Graphic` → `Primary Text` → `Secondary text` → `Primary action` → `Secondary action` → `Border`. (Note `Primary Text` is title case and `Secondary text` is sentence case in the same published anatomy — **defect in the design system's own doc.**)

**Three causes of emptiness, three different copy strategies** — this is the reusable core:

| Cause | Primary text should… | Secondary text should… | Action should… |
|---|---|---|---|
| Feature not used yet | "convey the intention of the feature in a way that sounds welcoming and human" | explain the feature's purpose and how it helps reach a goal | "initiate a creation flow or link to a feature" |
| Temporarily empty by nature | "convey that the feature is empty because of the nature of the feature" | (brief, non-redundant) | — |
| Something went wrong | "concisely summarize the problem" | "explain what they can do to fix the problem" | "lead to a solution, a way to get more information, or a way to get help" |

Splitting "no data yet" from "no data right now" from "we failed to load your data" — and giving each a different graphic, tone, and action — is a distinction most systems collapse into one blankslate. The graphic rule enforces it: "If a Blankslate is being used to convey an error state, the graphic should not attempt to bring delight or be playful… Default to using the alert icon."

**Example strings given in the guidance** `[documented]`:

- `Repositories could not be loaded due to a system error` — offered as a sufficient error summary
- `Form could not be submitted. Some required fields were empty.` — offered as the model of "concisely describe what the problem is while being as specific as possible"
- `No code scanning alerts found` — from the punctuation rule, with `No code scanning alerts found!` as the rejected version
- Secondary-action shapes: `Learn more about X`, `Check out the guide on X`

Both error examples use the **passive with an inanimate subject** (`Repositories could not be loaded`, `Form could not be submitted`) — which is how you comply with "do not blame the user" while still naming what failed. The second one is two sentences: outcome, then cause. That outcome-then-cause ordering is the shape worth taking.

**Stated exclusion** `[documented]`: "Error states are unlikely to ever have a secondary action." A rule about what *not* to put in an empty state.

**First-run copy is a named separate case** `[documented]`: "use illustration Blankslates to playfully engage the user and introduce the Octocat as a symbol of GitHub. Primary text should welcome the user to the platform and feature. Secondary text should seek to educate the user, but at a simpler, less-technical level." So reading level is explicitly *lowered* for first-run relative to the rest of the product — a documented register gradient by user tenure.

**Live no-content strings on the status page** `[observed]`: `No incidents reported today.` · `No incidents reported.` · `No incidents or maintenance related to this downtime.` · `No data exists for this day.` Four variants of the same idea; `No incidents reported today.` and `No incidents reported.` differ only by whether "today" is the row, so the redundancy is at least principled.

## T9 Notifications & system messages

`[documented]` — Primer names `Notification messaging` as a UI pattern with its own page, and `Banner`, `InlineMessage`, `Toast`-adjacent components exist in the component list (`Banner`, `BannerStack`, `InlineMessage`). The pattern page itself was not harvested. `[absent]` for its contents.

**Feedback-message rule is published and is the sharpest item here** `[documented]`:

> "Feedback should be clear and reassuring, using the same terms used by the UI elements that triggered it."
> Do: `Issue transfer in progress` — because the trigger button says "transfer"
> Don't: `Moving the issue` — "uses a different term ('moving') than the trigger button"

**Term-continuity between the control and its confirmation**, stated as a rule with a worked counter-example. This is the most directly transferable line in the GitHub file: it converts "be consistent" into a testable check — does the toast reuse the button's verb?

Also note `Issue transfer in progress` is a **nominalisation** (`transfer` as noun) with no verb and no subject, chosen precisely to match the button. Consistency is prioritised over grammatical liveliness.

**Notification vocabulary in docs IA** `[observed]`: `Subscriptions & notifications` is a top-level docs grouping (and is the one place in the docs index that uses an ampersand — which Primer forbids: "Use the word 'and' instead of an ampersand"). `Notifications for workflow runs` is a named Actions concept. `Scheduled reminders` is a pricing-page feature, glossed "Send scheduled messages to you or your team listing open pull requests."

**Status-page subscription channels are themselves a message-design artefact** `[observed]` — four channels with different documented event granularity:

- Email: "whenever GitHub **creates**, **updates** or **resolves** an incident"
- SMS: "whenever GitHub **creates** or **resolves** an incident" (no updates — deliberately coarser for the interruptive channel)
- Webhook: "**creates** an incident, **updates** an incident, **resolves** an incident or **changes** a component status" (finest, adds component-status changes)
- Slack: no event list given

Channel granularity tuned to channel intrusiveness, with the difference stated in the subscribe copy so the user can choose. Worth stealing.

**Docs inline message types** `[observed]` — four labelled callout kinds appear across docs pages: `Note`, `Tip`, `Warning`, and unlabelled inline blockquotes. `Warning` is reserved for the security-implication case in the SSH article; `Tip` for the "you probably don't need to do this" case.

## T10 Disclosures, legal & compliance

`[observed]` — commercial and compliance disclosure, not consumer-finance disclosure.

**Quota and metering language on pricing** — the pattern is `<number> <unit>/month` followed by a standing exemption on its own line:

- `2,000 CI/CD minutes/month` / `3,000 CI/CD minutes/month` / `50,000 CI/CD minutes/month`, each followed by `Free for public repositories`
- `500MB of Packages storage` / `2GB of Packages storage` / `50GB of Packages storage`, each followed by `Free for public repositories`
- `$0 spend limit` for Codespaces on Free, vs `Ability to increase spend limit` on paid — a *capability* stated where a quota would be expected
- `Usage-based` as a price value for GitHub sandbox
- `Unlimited` used as an explicit cell value for public and private repositories across all three tiers
- `Available` used as a cell value for Premium support on Enterprise
- `Public repositories` used as a **cell value** meaning "this feature exists but only for public repos" — a scope-limit rendered as if it were a quantity

The `Public repositories` cell is a real comprehension hazard: in a comparison matrix where sibling cells contain numbers and the word `Unlimited`, a cell reading `Public repositories` requires the reader to infer "restricted to". Negative finding.

**Price footnote pattern** `[observed]`: `$ 4 USD per user/month` with the sub-line "per user/month for the first 12 months*". The asterisk is present, the footnote body was not located on the page — an unresolved asterisk on an introductory-rate disclosure. **Defect worth recording**, and exactly the class of problem a financial-services content team would be cited for.

Currency is always explicit (`$ 0 USD`, `$ 4 USD`, `$ 21 USD`) with the code after the figure. Unit economics are disclosed inline in prose: "compute fees starting at $0.18/hr and storage fees at $0.07/GB per month", "$5 per month for 50 GB bandwidth and 50 GB of storage".

**`Starting at`** precedes the Enterprise price, and `Recommended` is the only badge on the plan cards.

**Compliance artefacts named as plan features** `[observed]`: `SOC1, SOC2, type 2 reports annually` · `FedRAMP Tailored Authority to Operate (ATO)` · `SAML single sign-on` · `Advanced auditing` · `Audit Log API` · `Required 2FA` · `Role-based access control` · `IP allow list` · `Data residency` · `SBOMs` · `Artifact attestations` · `Enterprise Managed Users` · `User provisioning through SCIM`.

`Data residency` is explained in plain language before the compliance framing: a multi-tenant SaaS on Azure "allowing you to choose a regional cloud deployment for data residency, so your in-scope data is stored at rest in a designated location", with availability bounded ("available in the EU and Australia with additional regions coming soon"). **Bounding availability inside the feature description** rather than in a footnote — the Wise "bound the claim" pattern, applied to a compliance feature.

**SLA stated numerically in a feature blurb** `[observed]`: "With Premium, get a 30-minute SLA on Urgent tickets and 24/7 web and phone support via callback request."

**Trust Center disclosure structure** `[observed]` — organised as an FAQ of eleven questions rather than a policy document. The four privacy principles are published as a list of declarative sentences, each capitalised as a title:

`Privacy Protects People.` · `Privacy requires Trust, Control, and Transparency.` · `Privacy is Contextual.` · `Privacy is the Expectation.`

Inconsistent internal capitalisation across the four (`Protects People` vs `requires Trust` vs `is Contextual`), and all four are punctuated with full stops while functioning as headings — against Primer's punctuation rule. But the *form* is strong: a principle set short enough to remember, in the copular present tense, each asserting a claim that could be argued with.

AI governance disclosure names its external frameworks rather than describing them: Microsoft's Responsible AI Standard with its six principles enumerated (`accountability, transparency, fairness, reliability & safety, privacy & security, inclusiveness`) and the NIST AI RMF's four functions (`govern, map, measure, and manage`). A named internal role is disclosed too: `Responsible AI Champions`.

**Footer legal set** `[observed]`: `Terms` · `Privacy` · `Manage cookies` · `Do not share my personal information`. The last is a CCPA-style opt-out surfaced as a footer link with no explanatory gloss.

**Eligibility and discount disclosures** `[observed]`: `Nonprofits` — "Work for a government-recognized nonprofit, association, or 501(c)(3)? Get a discounted Organization on us." A question-form eligibility test as the lead. `Students and teachers` framed as free access "for the school year and beyond".

**Data-retention disclosures in docs** `[documented]`: 90 days for deployment statuses, 400 days for checks then archive then 10 days to permanent deletion. Both state the **user-visible consequence** of the retention boundary, not just the period.

## T11 Help-centre architecture

GitHub has no "help centre" in the consumer sense. Documentation *is* the support surface, and the routing furniture is the finding.

**Support escalation ladder, identical on every docs page foot** `[observed]`, in fixed order:

1. `Was this Doc helpful?` → `Yes` / `No`
2. `Help us make GitHub Docs great!` → `Make a contribution` (opens a PR against github/docs)
3. `Still need help?` → `Ask the GitHub community` → `Contact support` → `Expert services` → `Blog`

Community precedes support, and **contributing a fix precedes asking for help** — an ordering that only makes sense for a developer audience and is a genuine IA statement about who the reader is. Wise offers personalisation first, self-service second, humans last; GitHub offers self-correction first, peers second, humans third, paid services fourth.

Note the two feedback questions coexisting across pages: `Was this Doc helpful?` (with "Doc" capitalised mid-sentence) versus `Did you find what you needed?` on other doc pages. Two questionnaires, two questions, one widget. And `Help us make GitHub Docs great!` carries an exclamation mark that Primer forbids.

**Docs meta-navigation labels** `[observed]`: `In this article` (table of contents), `Tool navigation` (switching between `GitHub CLI` and `Web browser` instructions), `Platform navigation` (`Mac` / `Windows` / `Linux`), `On this page`, `Back to top`, `Version: Free, Pro, & Team`, `API Version: 2026-03-10 (latest)`, `Further reading`.

`Tool navigation` and `Platform navigation` are the notable ones: the same article carries multiple parallel instruction sets and names the axis of variation explicitly. A user on Windows using the CLI is not reading a different article, they are reading a different *projection* of one article — and the labels tell them which projection they are in.

**Article-title grammar — five consistent shapes:**

| Shape | Examples |
|---|---|
| Imperative how-to | `Cancel a workflow run` · `Re-run workflows and jobs` · `Trigger a workflow` · `Manage caches` · `Resolve merge conflicts` |
| Gerund how-to | `Viewing workflow run history` · `Merging a pull request` · `Signing commits` · `Reverting a pull request` |
| `About X` concept | `About the REST API` · `About pull request merges` · `About branches` · `About commits` · `About passkeys` · `About 2FA` |
| `Error: <verbatim string>` | `Error: Permission denied (publickey)` · `Error: Host key verification failed` |
| Bare noun reference | `Workflow syntax` · `Limits` · `Status checks` · `Rate limits` |

The imperative/gerund split is **not clean** — `Cancel a workflow run` and `Viewing workflow run history` sit adjacent in the same Actions sidebar. The docs appear to be mid-migration from gerund titles to imperative ones (the new Diátaxis-style `How-tos` sections use imperatives; older equivalents use gerunds), and the transition is visible in the IA. Honest negative finding: a reader cannot rely on title grammar to predict content type in Actions, even though they can in Pull requests.

**Self-service routing by permission** `[observed]`: docs how-tos open with the permission prerequisite ("Read access to the repository is required to perform these steps."), so the user is routed *out* before they start if they cannot complete the task. Pre-emptive failure prevention at the top of the instruction, rather than an error at the end.

**Cross-product support links** `[observed]`: `Community Forum` · `Professional Services` · `Premium Support` · `Skills` · `Contact GitHub` · `What is Git?` · `Sitemap`. `What is Git?` in the support footer is a striking inclusion — the most basic possible question, given a permanent global slot.

## T12 FAQs

`[observed]` — no FAQ on the homepage or pricing page. The only FAQ block harvested is on the Trust Center, and it is an unusual specimen: the questions are written from the perspective of a **procurement or compliance reviewer**, not an end user.

Placement: `Frequently Asked Questions`, at the foot of `github.com/trust-center`, rendered with `####` heading markers inside bold — a **markup defect** (`**#### What is GitHub's commitment to AI?**`) visible in the served page.

| # | Question (verbatim) |
|---|---|
| 1 | What is GitHub's commitment to AI? |
| 2 | What standard does GitHub follow for AI? |
| 3 | How does GitHub drive Responsible AI practices within its organization? |
| 4 | What assessments and reviews has GitHub completed for its AI systems? |
| 5 | Where can I learn more about GitHub's responsible principles in AI development? |
| 6 | What are GitHub's privacy principles? |
| 7 | How does GitHub protect privacy? |
| 8 | How does GitHub ensure trust, control, and transparency with user data? |
| 9 | How does GitHub handle data in different contexts? |
| 10 | How is privacy integrated into GitHub's operations? |
| 11 | *(product FAQs linked out, not inline:* `GitHub Copilot FAQ`*,* `GitHub Enterprise Cloud FAQ` *— both routed to separate `*.trust.page` domains)* |

**Structural notes.** Answers summarised: Q1–Q5 describe AI governance by naming external frameworks and internal roles; Q6–Q10 restate the four privacy principles in prose. Every answer is 1–4 sentences and none contains a link, a date, or a number — they are positioning statements rather than facts a reviewer could verify. Q5 answers a "where can I learn more" question by *naming* a document ("the Responsible AI Transparency Report") without linking to it, which is a broken affordance inside an FAQ whose entire purpose is routing.

The ordering is two clean blocks of five (AI, then privacy) with no interleaving, and **nine of the ten questions are third-person about GitHub** (`What is GitHub's…`, `How does GitHub…`) rather than second-person about the user. Only Q5 uses `I`. Compare Wise's FAQ, which is almost entirely first- and second-person (`Can I send money…`, `What information do I need…`). GitHub's Trust Center FAQ is written to be *quoted in a vendor assessment*, not read by a person with a problem — which is a legitimate genre, but it means the FAQ carries almost no task language.

Two product FAQs are pushed off-domain to `copilot.github.trust.page` and `ghec.github.trust.page`. Routing compliance content to a third-party trust-portal vendor means the deepest disclosure layer sits outside the brand's own content system entirely.

## T13 Terminology & glossary

| Term | GitHub's usage | The alternative it rejected / note |
|---|---|---|
| `pull request` | Never abbreviated, always lowercase unless sentence-initial — an explicit published rule | "PR" (used freely in docs *sidebars* — `About stacked PRs`, `Review stacked PRs`, `CI for stacked PRs` — which **violates the rule in GitHub's own IA**) |
| `sign in` | Mandated over the alternative | "log in" |
| `Blankslate` | The empty-state component noun | "empty state" (which is the *pattern* name; the component has a different name) |
| `Octicons` | The icon set | "icons" |
| `Octocat` | The mascot, named in first-run copy guidance | |
| `Primer` | The design system | |
| `found means fixed` | Coined security-outcome phrase, lowercase | |
| `security debt` | Borrowed from "technical debt", used as a product concept with a named remedy (`security campaigns`) | |
| `security campaigns` | A named workflow for burning down a backlog | "remediation programme" |
| `Copilot Autofix` | Named capability | |
| `push protection` | Named preventative control, distinct from `secret scanning` (detection) | The prevent/detect split is lexicalised |
| `Secret Protection` / `Code Security` | Two separately named and separately sold halves of `Advanced Security` | |
| `Dependabot` | Named agent, treated as an actor ("Dependabot handles alerts") | |
| `runner` / `larger runner` / `self-hosted runner` / `runner scale set` / `runner group` | Five-term family for compute | `larger runners` — comparative adjective as a product tier name, with no stated baseline |
| `workflow` / `job` / `step` / `action` / `check run` / `check suite` | Six-level nesting, each a distinct noun | |
| `check` vs `commit status` | Two explicitly differentiated status mechanisms, with a note that Actions "generates checks, not commit statuses" | |
| `status` vs `conclusion` | A check has a `status` while running and a `conclusion` when `completed` | Most systems use one word; GitHub splits by phase |
| `state` vs `stage` | Used interchangeably for the same PR concept (`Change the state` / `Change the stage of a pull request`) | **Inconsistency** |
| `environment` | The deployment target noun (`production`, `staging`, `qa`) | |
| `destroyed` (UI) vs `inactive` (API) | Same deployment state, two words | **Deliberate divergence, documented** |
| `head branch` / `base branch` | Consistent throughout, with a glossary link on each first use | "source"/"target" |
| `common ancestor commit` | Named concept used to explain squash-merge consequences | |
| `merge queue` | Named product | |
| `Enterprise Managed Users` | Title-cased coined term for IdP-owned accounts | |
| `Codespaces` / `core hour` | `core hour` is defined inline because it is unguessable: "On a 2-core machine, you would get 60 hours free" | |
| `Quickstart` | One word, no hyphen, used as a noun | "Quick start" |
| `agents` | Coordinated with `developers` and `code` in the hero as a peer category | |
| `Blankslate` vs `Empty states` | Component name and pattern name differ | |
| `Skills` | GitHub's learning product, at `skills.github.com` | "Learn"/"Academy" |
| `The ReadME Project` | Editorial brand punning on README | |
| `Wisers`-equivalent | **`[absent]`** — no internal employee term leaks into public copy |

**Register split by surface.** Marketing says `GitHub Advanced Security` and `GitHub Copilot`; the nav gloss says `Find and fix vulnerabilities`; docs say `code security` and `secret scanning`. The full branded name appears in acquisition contexts and the functional description appears where the user is already working — the same gradient Wise shows, arrived at independently.

**Capitalisation rules published and then broken.** Primer: "Do not capitalize common terms. Only proper nouns and product names should be capitalized" and "Always capitalize GitHub correctly." Observed violations on GitHub's own surfaces: `Code Review` / `Code Quality` beside `Code security` / `Secret protection` in one menu; `Was this Doc helpful?`; `App Modernization` in a nav list of otherwise sentence-case use cases; `Contact Sales` vs `Contact sales`.

## T14 Voice, tone & accessibility

**GitHub publishes its voice as four antitheses** `[documented]` — the most compact voice statement in the corpus:

> - Clear but not cold
> - Conversational but not jargon-y
> - Inclusive but not disingenuous
> - Helpful but not overly-prescriptive

Each is a virtue paired with its own failure mode. This "X but not Y" shape is more operationally useful than a list of adjectives, because it names the over-rotation. ("jargon-y" and "overly-prescriptive" are both hyphenated informally in the source, which is itself on-voice.)

**Top 10 rules, verbatim** `[documented]`:

- Write in plain English, don't sound like a robot.
- Be brief, remove unnecessary words like adjectives and adverbs.
- Use active voice.
- Use sentence case, and when in doubt, don't capitalize.
- Always capitalize GitHub correctly.
- Avoid gendered language.
- Do not use slang or culturally-specific references.
- Do not use "here" or "click here" in calls to action.
- Be very thoughtful when introducing humor to the interface.
- Have someone else proofread your text.

**Reading level is specified numerically** `[documented]`: "Aim for a seventh-grade or below reading level. This means you should write text that is straightforward, without trying to be creative with words." For a developer product, a seventh-grade target is an aggressive and counterintuitive choice, and the rationale is given ("without trying to be creative with words") rather than assumed. Three named testing tools are recommended (Grammarly, Hemingway, an automatic readability checker) — the guidance is falsifiable.

**Person** `[documented]` and `[observed]`: second person for the user, possessive `your` for their objects (`Update your profile`, not `Update my profile`), with a named exception: first person is used "usually related to legal language, such as when a user needs to agree to terms, or confirm a destructive action" — `I have read the Terms of Service`, `I understand, convert this issue to a discussion`.

That exception is a real insight. First person is reserved for the two moments where the user must *own* the statement: consent and destruction. Everywhere else the product speaks to them; in those two places they speak for themselves. Directly transferable to any confirm-destructive-action dialog.

**Prohibition list** `[documented]` — unusually specific, and each item is a common real defect:

- Do not say something is "easy", "quick", or that the user "just" needs to do something
- Do not capitalise common terms
- Do not use emoji in UI content, or to replace words
- Use "and" instead of "&" or "+"
- Do not use exclamation marks to indicate excitement, "most actions aren't"
- Do not use `>` and `<` to indicate steps in a flow
- Do not use semicolons: "they are hard to get right and can be replaced by a period most times"

The `just` / `easy` / `quick` ban is the important one — it targets the specific class of copy that tells a struggling user their difficulty is illegitimate. The semicolon ban is the funniest and is justified on writer-competence grounds rather than reader grounds, which is candid.

**Emoji policy is conditional rather than absolute** `[documented]`: "Avoid using emojis, but when you do: use them only at the end of a sentence; use only well-recognized emojis; do not repeat emojis; use emojis that will work well in both dark and light modes." The dark-mode clause is a content rule derived from a rendering constraint — the kind of cross-discipline rule most style guides miss. Note this contradicts the flat "Do not use emoji in UI content" in the same document's avoid list. **Internal contradiction in the published guide.**

**UI-reference conventions** `[documented]` — a three-way typographic system:

- Unclickable page or section names: quotation marks — `Go to the "Email notifications settings" section.`
- Clickable buttons and links: bold, no quotes — `Click **Save**`
- Folders: code tag — "Open the `docs` folder."

Plus a platform swap: "If you're writing for a mobile app experience, use 'tap', instead of 'click'." And a capitalisation requirement: "Make sure all UI references match the capitalization in the interface."

**Link-text rules** `[documented]`: "Link text should be clear, unique, and informative… Never say 'here' or 'click here'." With an accessibility-specific pattern for image links: set `role="presentation"` on the image and let adjacent text in the same anchor supply the accessible name. A code example is given. This is accessibility guidance published as *content* guidance, in the content chapter — the right place for it.

**Accessibility content** `[observed]`

- Skip links present on all three surfaces, with three different labels: `Skip to content` (github.com), `Skip to main content` (docs), `Skip to main content` + `Skip to filter input` (Primer). The Primer double-skip-link is good practice for a page with a prominent filter.
- `Accessibility` is a top-level Primer pillar at `primer.style/accessibility`, and `accessibility.github.com` is a first-class Trust Center nav item alongside `Securing GitHub`, `Privacy`, and `Security Lab`. Accessibility placed inside the trust surface, not the careers or CSR surface.
- **Alt text on the homepage is exceptionally long and narrative** — GitHub describes animated demos as sequences of events rather than as images. One example, abridged: "A Copilot chat window with the 'Ask' mode enabled. The user switches from 'Ask' mode to 'Agent' mode from a dropdown menu, then sends the prompt 'Update the website to allow searching for running races by name.' Copilot analyzes the codebase, then explains the required edits for three files before generating them…" Another describes a security-campaign screenshot down to the numbers: "…the campaign's progress bar with 97% completed of 701 alerts. A total of 23 alerts are left with 13 in progress…"
  This is the standout accessibility finding. Where most products give a marketing animation a four-word alt, GitHub **narrates the demo**, so a screen-reader user receives the same product argument a sighted user receives from watching. It is also arguably too long for a single alt attribute and would be better as an adjacent long description — a real trade-off, not a clean win.
- Shorter functional alt text is descriptive and screenshot-aware: "Screenshot of the tabs for the 'github/docs' repository. The 'Actions' tab is highlighted with an orange outline." — the alt names the *highlight* the instruction depends on, so the visual annotation is not lost.
- Decorative assets carry empty alt (`![]`) on the homepage particle graphics — correct.
- Keyboard affordances are labelled in text: `/` shown as a search keybinding hint; a `KeybindingHint` component exists in Primer; docs expose `Collapse sidebar` / `Expand sidebar` and `Scroll breadcrumbs left` / `Scroll breadcrumbs right` as named controls.
- `Switch to dark mode` names the target state, which is the less ambiguous of the two conventions.

**Negative findings, recorded honestly**

- `Code Review` / `Code Quality` (title case) beside `Code security` / `Secret protection` (sentence case) in one mega-menu, against Primer's own sentence-case rule
- Three competing taglines on the homepage: H1 `The future of building happens together`, `<title>` `Change is constant. GitHub keeps you ahead.`, meta description "world's most widely adopted, AI-powered developer platform"
- Five acquisition CTAs on the pricing page for near-identical actions: `Start free for 30 days`, `Join for free`, `Continue with Team`, `Start a free trial`, `Start a free 30 day trial`
- Unresolved asterisk: "per user/month for the first 12 months*" with no locatable footnote on the page
- `Explore code review` breaks the `Explore <ProductName>` pattern used nine times on the same page
- `Learn more` ships bare on five pricing add-on rows, beside a more specific `See pricing details` in the same list
- `Copy markdown` vs `Copy as Markdown` for the same docs control on different pages
- `Was this Doc helpful?` vs `Did you find what you needed?` — two labels for one feedback widget; the first also capitalises "Doc" mid-sentence
- `Help us make GitHub Docs great!` uses an exclamation mark Primer forbids
- `Subscriptions & notifications` uses an ampersand Primer forbids
- `About stacked PRs` and four sibling titles abbreviate "pull request" to "PRs", which Primer explicitly forbids ("should never be abbreviated")
- `Change the state` / `Change the stage of a pull request` — "state" and "stage" used for one concept
- Primer's own empty-state anatomy mixes `Primary Text` and `Secondary text` casing
- Primer contains an internal contradiction on emoji (conditional permission in one section, blanket prohibition in the avoid list) and a typo ("make sure it's for relevant for diagnostic purposes")
- Three severity phrasings on the status page within eight days: `degraded performance`, `degraded availability`, `impacted performance`
- Status page uses colon-terminated form labels (`Email address:`) that Primer forbids — third-party Statuspage surface outside design-system reach
- Status page apologises routinely ("We sincerely apologize for the disruption.", "Thank you for your patience and understanding") where Primer says do not apologise
- Trust Center FAQ renders raw `####` markers inside bold, a markup defect on a live compliance page
- Trust Center FAQ Q5 names a document it does not link to
- `Secure at scale` is cross-listed under two docs groupings, so the docs index is a graph presented as a tree
- Docs article titles are mid-migration between gerund and imperative forms, visibly inconsistent inside the Actions sidebar
- Three skip-link labels across three GitHub-owned surfaces

---

## Transferable patterns

1. **The noun-plus-imperative-gloss nav item.** `Actions` — "Automate any workflow". Every product label in GitHub's platform menu carries a 3–5 word verb phrase that says what you do with it. This solves the perennial problem of branded feature names being unguessable, without renaming anything. Condition: only works where the menu has room for two lines per item; it collapses badly in a narrow mobile drawer.
2. **Reuse the trigger's verb in the confirmation.** `Issue transfer in progress`, not `Moving the issue`, because the button said "transfer". GitHub states this as a rule with a rejected example, which converts "be consistent" into a one-line review check. Transfers to every toast, banner, and email confirmation in a product — and is the single cheapest consistency audit a content team can run.
3. **Split "no data yet" from "no data now" from "we failed to load".** Primer gives each cause a different graphic, tone, secondary-text job, and action. Most systems ship one empty state for all three and end up sounding either falsely cheerful about a failure or coldly technical about a first run. Condition: needs engineering to distinguish the three cases, which is usually the real blocker.
4. **First person reserved for consent and destruction.** `I have read the Terms of Service`; `I understand, convert this issue to a discussion`. Second person everywhere else. The grammatical person carries the shift in who is accountable for the statement. Directly applicable to PayPal's agree-and-continue, billing-agreement consent, and any irreversible-action dialog.
5. **Title error articles with the verbatim machine string.** `Error: Permission denied (publickey)` — byte-identical to the terminal output, so a paste-and-search finds it. This is the developer-audience analogue of Wise's `I sent the wrong amount`: title the article in the words the user actually has. Condition: only works where the user *has* a string to paste. For a consumer product the equivalent is the error's own headline text, which means the error headline must be stable enough to be a search key.
6. **Two-stage incident close: `mitigated` then `resolved`.** `mitigated` marks "impact has stopped"; `resolved` marks "cause is addressed". GitHub distinguishes these consistently and publishes the intermediate state, so users get relief information hours before they get closure information. Transfers to any outage, dispute, or fraud-hold communication where the user's pain ends before the case does.
7. **Quantify impact rather than characterising it.** "96% of attempts", "5.7% of larger-runner jobs", "approximately 28 services". Publishing the number — including a 96% failure rate — buys more credibility than any adjective. Condition: requires the organisation to accept that the number will be quoted back.
8. **Narrate the demo in alt text.** GitHub describes what happens in a product animation as a sequence of user and system actions, so a non-sighted reader gets the argument, not just the label. Condition: long alt is a real trade-off; prefer an adjacent long description where the platform supports it, but the *content* GitHub writes is the model.
9. **Publish voice as "X but not Y".** Clear but not cold. Conversational but not jargon-y. Naming the over-rotation alongside the virtue makes a voice statement reviewable rather than decorative.
10. **Ban the words that delegitimise difficulty.** No "easy", no "quick", no "just". A one-line rule that removes an entire class of user-blaming copy, and it is greppable in a string file.
11. **Format precision should track consequence.** Relative time for browsing, precise weekday-and-date for anything with an expiry the user must act before, elapsed time for running tasks. Rule chosen by stakes, not by house style. Immediately applicable to payment-due, card-expiry, and hold-release copy.

## Caveats & gaps

- **All in-product strings are `[documented]`, not `[observed]`.** Check statuses, deployment states, validation messages, toasts, empty states, and every dialog live behind authentication. Their names come from API reference docs and design-system guidance describing the UI, so the *rendered* label may differ from the API token in more places than the one GitHub discloses (`inactive` → `destroyed`). Any string in T5, T6, T8, or T9 should be re-verified in an authenticated pass before use as precedent.
- **T7 error strings are quoted from a troubleshooting doc, not seen in situ.** The doc quotes message text ("Validation Failed", "Resource not accessible by integration") but not the full response body or any accompanying UI treatment. Whether these appear to users in a toast, a banner, or only in a log is unknown from this harvest.
- **The push-protection error page was fetched but exceeded the tool's output limit and was not read.** It is the one remaining high-value GitHub error surface (blocked-push messages and bypass-reason copy) and is recorded here as a known gap rather than a blocked domain.
- **GitHub's primary content guide is staff-only.** Primer repeatedly defers to `github/brand/blob/main/docs/how-to-write-at-github.md` and a Google Drive folder, both explicitly marked "link only accessible to GitHub staff". The public Primer content page is therefore a *summary* of the real standard. The real standard may resolve the contradictions noted above (emoji, apology) that the public page leaves open.
- **Primer's `Notification messaging`, `Degraded experiences`, `Forms`, `Loading`, and `Saving` pattern pages were not harvested**, nor were the `Banner`, `InlineMessage`, `StateLabel`, `ConfirmationDialog`, or `Blankslate` component pages. `StateLabel` and `ConfirmationDialog` in particular would likely yield observed status-label and destructive-confirmation strings. T9 is thin as a direct result.
- **Copilot and Enterprise Cloud trust FAQs sit on `copilot.github.trust.page` and `ghec.github.trust.page`** and were not fetched — the deepest compliance-disclosure layer is off-domain and unharvested.
- **Git-level error messages** (the `remote:` rejection strings, `! [rejected]`, non-fast-forward messages) come from Git rather than GitHub and were not systematically harvested; only the SSH family was.
- **No FAQ exists on the homepage or pricing page**, so T12 rests entirely on a compliance-oriented FAQ written in the third person. GitHub's task-language FAQ equivalent, if it exists, is in the community forum, which was not harvested.
- **Status page is Atlassian Statuspage**, so its form labels, subscription copy, and some chrome reflect Atlassian's content standards rather than GitHub's. The incident *prose* is GitHub-authored; the surrounding furniture is not. Attributions in T6 and T9 distinguish these where it matters.
- **Incident sample is eight days.** The severity-phrasing inconsistency noted in T6 is drawn from a short window and may not represent GitHub's steady-state practice.
- **en-US only.** A language selector is present on docs and the footer; no localised surface was inspected.
- **Marketing copy is Contentful-managed and A/B-tested.** The hero headline, feature tabs, and accordion copy may differ between sessions and audiences; the strings recorded here are one render on one date.

## Sources

1. https://github.com/
2. https://github.com/pricing
3. https://docs.github.com/en
4. https://www.githubstatus.com/
5. https://docs.github.com/en/rest/using-the-rest-api/troubleshooting-the-rest-api
6. https://docs.github.com/en/rest/deployments/statuses
7. https://docs.github.com/en/pull-requests/reference/status-checks
8. https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/incorporating-changes-from-a-pull-request/about-pull-request-merges
9. https://docs.github.com/en/authentication/troubleshooting-ssh/error-permission-denied-publickey
10. https://docs.github.com/en/actions/how-tos/monitor-workflows/view-workflow-run-history
11. https://github.com/trust-center
12. https://primer.style/product/getting-started/foundations/content/
13. https://primer.style/product/ui-patterns/empty-states/
