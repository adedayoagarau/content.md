# 022. GitLab

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Integrated DevSecOps platform (single-application CI/CD, SCM, AppSec, agentic orchestration) |
| Primary URL | https://about.gitlab.com/ |
| Corpus rank | 022 |
| Benchmark strength (source list) | Development-lifecycle terminology |
| Locale / market observed | en-US (site offers `de-de`, `es`, `fr-fr`, `it-it`, `ja-jp`, `pt-br`) |
| Platform observed | Web (marketing), docs.gitlab.com (v19.5), design.gitlab.com (Pajamas), status.gitlab.com (Status.io) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Named on marketing: federal security standards, air-gapped deployment, SBOM tracking, audit trails; `AI Transparency Center` and `Trust Center` are distinct footer destinations; `Modern Slavery Transparency Statement` published; docs carry a `Use of generative AI` legal page |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Full for T1–T3, T5–T7, T10–T14. Partial for T4, T8, T9 (Pajamas documents the rules and gives example strings; live in-product strings are behind auth). |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://about.gitlab.com/ | Hero, four-pillar accordion, industry grid, nav taxonomy, customer metrics |
| Pricing | https://about.gitlab.com/pricing/ | Three tiers × three deployment models, 51-question FAQ, credits add-on, comparison table |
| Docs index | https://docs.gitlab.com/ | Nine top-level doc sections, eleven `Get started with …` cards, reference architectures |
| CI/CD Jobs | https://docs.gitlab.com/ci/jobs/ | **13 job statuses and 20 job sources, each glossed** — the core status artefact |
| Troubleshooting jobs | https://docs.gitlab.com/ci/jobs/job_troubleshooting/ | **Error-titled sections with verbatim message strings and six `failure_reason` codes** |
| Status page | https://status.gitlab.com/ | 23 components, each annotated with its hosting provider |
| Pajamas — Forms | https://design.gitlab.com/patterns/forms/ | Form anatomy, validation, **published error-message guidelines with rejected examples** |
| Pajamas — How to write UI text | https://design.gitlab.com/content/ui-text/ | The content style guide: brevity, error clarity, objective-focus |
| Pajamas — Empty States | https://design.gitlab.com/patterns/empty-states/ | **Four typed empty states, two with mandated verbatim copy** |
| Pajamas — Job object | https://design.gitlab.com/objects/job/ | Object-model documentation; thin on strings |

---

## T1 Navigation & IA labels

**Global nav — six items** `[observed]`

`Platform` · `Solutions` · `Pricing` · `Resources` · `Company` · `Contact us`, with `Request a demo` · `Get free trial` · `Sign in` as the action cluster.

`Contact us` is a **nav menu**, not a link — it expands to `Talk to sales` · `Support portal` · `Customer portal`. Modelling "contact us" as a three-way routing decision at the top level (pre-sales / technical support / billing) is a good IA move that most vendors bury in a footer.

**The Platform menu is grouped by concern, and the three group names are the positioning** `[observed]`

| Group heading | Members |
|---|---|
| `Execution & Workflows` | `CI/CD` · `Source Code Management` · `Agile Delivery` |
| `Security & Governance` | `Application Security Testing` · `Governance & Compliance` · `Supply Chain Security` |
| `Context & AI` | `Agentic Orchestration` · `Context Graph` · `Visibility & Measurement` |

Compare GitHub's equivalent (`AI CODE CREATION` / `DEVELOPER WORKFLOWS` / `APPLICATION SECURITY`): GitLab puts security second rather than third and gives it three peers, and its third group is named for *inputs* (`Context & AI`) where GitHub's is named for *outputs* (`AI CODE CREATION`). Note also all three GitLab group names use `&`, which Pajamas does not forbid but GitHub's Primer does — a visible divergence in house style between two direct competitors.

Unlike GitHub, **GitLab's nav items carry no inline gloss.** `Context Graph` and `Agentic Orchestration` appear as bare labels with no verb phrase explaining them, and neither is guessable. The menu compensates with a single promoted card at the foot (`Why GitLab` — "One platform for speed with control across your software lifecycle."). One gloss for nine items, where GitHub gives nine.

**Solutions is faceted three ways, and the first facet is unusual** `[observed]`: `Outcomes` (`DevOps Modernization`, `Security Modernization`, `AI Modernization` — all three are *assessment* links, i.e. lead-gen forms presented as outcomes) · `By size` (`Enterprise`, `Small Business`, `Startups`) · `Industries` (six named verticals).

Naming a nav facet `Outcomes` and filling it with assessments is a defect worth recording: the label promises a result and delivers a questionnaire.

**Docs top-level nav — nine sections, all imperative or gerund except two** `[observed]`

`Use GitLab` · `GitLab Duo` · `GitLab Orbit` · `Extend` · `Install` · `Administer` · `Subscribe` · `Contribute` · `Solutions`

This is the standout IA artefact in the file. **Seven of nine are single verbs in the imperative**, addressed to the reader: `Use`, `Extend`, `Install`, `Administer`, `Subscribe`, `Contribute`. The two exceptions are product names (`GitLab Duo`, `GitLab Orbit`) and one noun (`Solutions`). Compare GitHub's docs index, which is organised by *subject* (`Collaborative coding`, `CI/CD and DevOps`, `Security and code quality`). GitLab organises by **the relationship the reader has to the product**: am I using it, extending it, running it, paying for it, or building it? A reader can self-route on one word.

`Subscribe` as a top-level docs section — billing and licensing documentation given equal weight to `Use` and `Administer` — is notable. Most vendors treat subscription mechanics as a support-portal topic, not a docs section.

**Docs second-level navigation is a task sequence, not an alphabetical tree** `[observed]`, inside `Use GitLab`:

`Getting started` → `Tutorials` → `Manage your organization` → `Organize work with projects` → `Plan and track work` → `Manage authentication and authorization` → `Use Git` → `Manage your code` → `Use CI/CD to build your application` → `Secure your application` → `Deploy and release your application` → `Manage your infrastructure` → `Monitor your application` → `Analyze GitLab usage` → `Release notes` → `Feature support` → `Find your GitLab version`

Every one of the seventeen is a **verb phrase in the imperative with an explicit object**. `Use CI/CD to build your application` is the pattern: not `CI/CD`, but the feature plus the purpose. `Secure your application`, `Deploy and release your application`, `Monitor your application` — the same possessive object recurs, so the sidebar reads as a lifecycle narrative about *your application* rather than a list of GitLab's features. This is the cleanest expression of GitLab's "development-lifecycle terminology" strength.

The three trailing items (`Release notes`, `Feature support`, `Find your GitLab version`) break the pattern and are meta rather than task — correctly segregated at the end.

**Breadcrumbs are deep and fully worded** `[observed]`. The troubleshooting page carries five levels:

`GitLab Docs` / `Use GitLab` / `Use CI/CD to build your …` / `Jobs` / `Control how jobs run` / `Troubleshooting`

With a `meta-gitlab_docs_breadcrumbs` value in the page head: `Use GitLab › Use CI/CD to build your application › Jobs › Control how jobs run`. Note `Troubleshooting` is the leaf and is a **bare gerund with no object** — `Troubleshooting` under `Control how jobs run`, whose H1 is `Troubleshooting jobs`. The nav label drops the object the H1 supplies; consistent with GitLab's own brevity rule ("if the context clearly refers to the object, you can use a verb or adjective by itself") but it means the breadcrumb leaf is ambiguous out of context.

**Docs homepage H1 is a promise, not a label** `[observed]`: `Find GitLab answers fast`, followed by five bare shortcut links (`Get started`, `CI/CD reference`, `SSH keys`, `Personal access tokens`, `Common Git commands`). Naming the five most-searched destinations as the first thing on the docs home, above the section grid, is a hard-edged content decision — and the H1 states the user's goal rather than the page's identity.

**Pajamas IA — two audiences, `Brand` and `Product`** `[observed]`, with a dedicated `Content` grouping under Product: `UI text` · `Verb tenses` · `Punctuation` · `Date and time`. Four content pages as first-class design-system nodes. Separately, `Accessibility` has nine child pages including `Statement of compliance`, `GitLab accessibility conformance report`, and a five-page `Evaluating accessibility` sub-tree (`Visual`, `Content and semantics`, `Keyboard-only`, `Focus management`, `Screen readers`).

Pajamas also names a category most systems lack: **`Objects`** (`Overview`, `Job`, `Merge request`) — documentation of the product's *domain entities* inside the design system, with "conceptual model" and "semantic layout" as named artefacts. A content designer gets the object model and the copy rules in one place.

**Deprecation is marked in the nav with an emoji** `[observed]`: `⚠️ Banner` and `⚠️ Infinite scroll` in the Pajamas component list. A status signal carried by the nav label itself. Effective visually, but it puts a warning emoji into an accessible name, and GitLab's own UI-text guidance cautions on non-standard terminology for screen readers — an internal tension.

**Footer groupings** `[observed]`: `Pricing` · `Contact Us` · `Platform` · `Topics` · `Solutions` · `Resources` · `Company`. `Status` sits under `Contact Us` next to `Terms of use` and `Privacy statement`. `Topics` is a glossary-style SEO grouping (`CI/CD`, `GitOps`, `DevOps`, `Version Control`, `DevSecOps`, `Cloud Native`, `AI for Coding`, `Agentic AI`) — concept pages, not product pages, given a footer column of their own.

**Footer carries three contribution links** `[observed]`: `View page source` · `Edit this page` · `Please contribute`, all pointing at the GitLab repo that holds the marketing site. The *marketing page itself* is presented as editable by the public. Docs pages carry the same treatment (`View page source`, `Edit in Web IDE`, `Contribute to GitLab`, `Suggest updates`), and so does every Pajamas page (`Page source`, `Open in Web IDE`, `Contribute`). Three distinct surfaces, one consistent "this is source, not output" stance.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `Speed you can trust, all the way to production`
> Subhead: `Agentic software engineering for your entire team`

The `<title>` is a different line — `GitLab - Speed with control for agentic software engineering` — and the meta description a third: "The intelligent orchestration platform for DevSecOps, enabling teams and agents to ship trusted software at enterprise scale."

**Three competing formulations of one idea**, which is itself the finding:

| Surface | Formulation |
|---|---|
| H1 | `Speed you can trust, all the way to production` |
| `<title>` | `Speed with control for agentic software engineering` |
| Meta / repeated CTA subhead | `the intelligent orchestration platform for DevSecOps` |
| Nav promo card | `One platform for speed with control across your software lifecycle.` |

The underlying claim is a **tension pair**: speed *versus* trust, speed *with* control. GitLab has settled on a two-term antithesis as its core message and then expressed it four ways in four slots. The H1 version (`Speed you can trust`) is the strongest because it collapses the pair into a single noun phrase and adds a destination (`all the way to production`). The `<title>` version is the weakest because `control` is the vendor's word and `trust` is the buyer's.

**Section headers are `Built …` participial phrases** `[observed]`

- `Built for how you work`
- `Built to meet your industry's demands`
- `One platform for teams of every size`
- `Start building faster today`

Three of four begin with a form of *build* — a deliberate lexical spine for a build-tooling product.

**Four-pillar accordion — each heading is a full imperative sentence** `[observed]`. This is unusual and worth recording: most marketing pillars are noun phrases; GitLab's are complete commands or claims.

1. `Define how teams and AI agents work together`
2. `Your end-to-end delivery process in one place`
3. `Be proactive with security built in, not bolted on`
4. `Commit once, adjust anytime with flexible pricing`

Pillar 3 carries the sharpest construction on the page: `built in, not bolted on` — an assonant antithesis naming the competitor's architecture as the foil. Pillar 4 is a pricing claim promoted to a product pillar, which is rare.

**Body copy under the pillars states mechanism, then consequence** `[observed]`. Notable formulations:

- "Teams orchestrate from above the lifecycle while agents execute within it" — an **explicit spatial metaphor for the human/agent division of labour** (above vs within). The most precise sentence on the page, and the one a content designer would steal.
- "Agents turn issues into merge requests, remediate vulnerabilities, and review code while your team stays in control." — three concrete agent actions, then the reassurance clause.
- "Build secure products with fewer security products." — a polyptoton on *product*.
- "Projects, releases, and code share one data plane so your team and agents work from a single source of truth."
- "Security findings appear directly in merge requests and IDEs."
- "collect audit-ready evidence automatically in every pipeline" — `audit-ready evidence` is doing compliance-disclosure work inside a benefit sentence.

**Industry cards — label plus two-sentence body, first sentence an imperative** `[observed]`

| Card | Opening imperative |
|---|---|
| `Financial Services` | "Meet strict regulatory requirements without sacrificing delivery speed." |
| `Public Sector` | "Build software that meets federal security standards." |
| `Telecommunications` | "Scale network infrastructure with confidence." |
| `Automotive` | "Accelerate the automotive software lifecycle." |
| `Education` | "Empower students and researchers while protecting institutional data." |
| `Aerospace` | "Accelerate development from flight-critical firmware to customer applications." |

Each opening sentence is `<imperative verb> <the industry's own stated constraint>`, and four of six contain a concession clause ("without sacrificing…", "while protecting…"). The vertical's objection is answered in the first clause. Note `Accelerate` is used twice across six cards.

**Social-proof metrics are formatted as `<figure><unit-phrase>` with the customer named** `[observed]`

`4 hours` saved per engineer per week · `82%` decrease in cycle time · `50%` faster vulnerability detection · `13x` faster security scanning · `20x` decrease in pipeline execution time with GitLab · `100` fewer hours of developer downtime per month · `6x` faster time to market · `17%` boost in developer happiness scores · `97%` reduction in time to fix bugs · `80x` faster CI pipeline builds · `30%` of vulnerabilities found earlier in SDLC

Eleven metrics, mixing percentages, multipliers, and absolute hours. `17% boost in developer happiness scores` is the interesting one — a subjective metric quantified and named as a *score*, alongside hard build-time numbers. And `Join the 50+ million people already using GitLab.` sits as a subhead under `Built for how you work`, i.e. the user count is placed as a *subhead to a benefit*, not as a standalone stat.

**Pricing hero** `[observed]`: `Get started with GitLab` / `The intelligent orchestration platform for DevSecOps.` The H1 is an action, not a page label — `Pricing` appears only in the `<title>` and the nav.

**Closing CTA block** `[observed]`: `Start building faster today` / "See what your team can do with the intelligent orchestration platform for DevSecOps." — identical on homepage and pricing page, which is correct consistency practice.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Homepage hero primary | |
| `Learn more` | Homepage hero secondary | **Bare `Learn more` in the hero**, with no object and no href visible in the render |
| `Get free trial` | Global nav, docs nav | |
| `Request a demo` | Global nav | |
| `Sign in` | Global nav | |
| `Talk to sales` | Nav → Contact us | |
| `Support portal` | Nav → Contact us | |
| `Customer portal` | Nav → Contact us | Three distinct destinations under one menu |
| `Explore the Platform` | Platform menu foot | Capital P |
| `Explore our platform` | Homepage pillar 2 | **Lowercase p, different verb phrase, same destination family** |
| `View all Solutions` | Solutions menu foot | Capital S |
| `View all resources` | Resources menu foot | **Lowercase r — inconsistent with the line above it** |
| `Learn more` | Nav promo card, Why GitLab | |
| `Read the blog` | Nav promo card, Transcend | |
| `Read the latest` | Nav promo card, What's new | Two labels for "read our publication" |
| `Register now` | Event banner, homepage and pricing | |
| `Meet GitLab Duo Agent Platform` | Pillar 1 | `Meet` as a CTA verb — used once |
| `Learn more about security` | Pillar 3 | Object supplied |
| `Read about GitLab Flex` | Pillar 4 | Fourth "read" verb phrase |
| `Why GitLab?` | Homepage section CTA | Question as button label |
| `Get your free trial` | Homepage close | |
| `Contact sales` | Homepage close | Lowercase s |
| `Get started` | Pricing, Free tier (both panels) | **Points to `/-/trials/new` on the GitLab.com panel** — a trial URL for a no-card free plan |
| `Buy Premium` | Pricing, Premium | The only `Buy` verb on the page |
| `Try for free` | Pricing, Premium and credits block | |
| `Get in touch to learn more` | Pricing, Premium card, under `Let's talk` | Orphan enterprise module inside a self-serve card |
| `Learn more about Premium` | Pricing | |
| `Get custom pricing` | Pricing, Ultimate price slot | |
| `Contact us for custom pricing` | Pricing, Ultimate, beside the above | |
| `Contact us` | Pricing, Ultimate button | **Three labels, one action, one destination (`/sales/`)** |
| `Learn more about Ultimate` | Pricing | |
| `Book a demo` | Pricing, Dedicated | Fourth demo/sales label after `Request a demo`, `Talk to sales`, `Contact sales` |
| `Need pricing flexibility?` + `Learn about Flex ↓` | Pricing | Question plus directional-arrow link, rendered run-together |
| `See details and promo terms.` | Pricing, under credits note | Punctuated with a full stop |
| `Compare all features` | Pricing | |
| `Compare features by plan` | Pricing | **Second label for the same comparison affordance** |
| `Get pricing` | Pricing, Flex | |
| `Buy GitLab Credits` | Pricing, credits block | |
| `Learn more about credits and usage billing.` | Pricing | Full stop inside a link |
| `Learn more about GitLab Duo.` | Pricing | |
| `Learn more about Secrets Manager.` | Pricing | |
| `Learn more` | Pricing, ×5 (three add-on cards, Dedicated, Flex, Partner Marketplace) | Bare form coexists with four specific forms on one page |
| `Coming soon` | Pricing comparison table, Custom Agents row | A status rendered as a link |
| `Show all` | Pricing FAQ, ×11 | One per FAQ section |
| `What's new?` | Docs nav | |
| `Skip to main content` | Docs, Pajamas | |
| `Go to GitLab Docs homepage` | Docs nav | Fully worded logo link |
| `Toggle menu` | Docs nav | |
| `Get certified` / `Get support` / `Post on the GitLab forum` | Docs footer, `Help & Community` | |
| `Contribute to GitLab` / `Suggest updates` / `View page source` / `Edit in Web IDE` | Docs footer, `Feedback` | **The docs "Feedback" section contains no feedback widget** — only four ways to submit a change |
| `View page source` / `Edit this page` / `Please contribute` | Marketing footer | `Please contribute` is the only CTA on any surface that says please |
| `Create an issue` | Pajamas, inside `TODO:` blocks | |
| `View in Pajamas UI Kit →` | Pajamas | Trailing arrow |
| `Submit` / `Cancel` | Pajamas form example | The canonical pair |
| `Run again` | Docs, job retry control | Named with the `retry` icon in parentheses |
| `Cancel` | Docs, job cancel control | |
| `Force cancel` | Docs, job control | Escalated form of an existing action, named as such |
| `Retry all failed or canceled jobs` | Docs, pipeline control | Nine words — the longest button label observed |
| `Cancel the running pipeline` | Docs, pipeline control | Definite article inside a button label |
| `Configure` | Pajamas empty-state example | |
| `Create issue` | Pajamas empty-state example | |
| `Invite member to configure` | Pajamas — **mandated exact wording** for a secondary empty-state action | |
| `Search or go to` | Docs instruction, referring to the global search control | |
| `Something actionable` / `Something else` | Pajamas fallback empty-state code sample | Placeholder labels shipped in public docs |

**Observations.** GitLab's CTA inventory is noticeably less disciplined than its IA. The pricing page alone carries **three labels for the Ultimate sales contact** (`Get custom pricing` / `Contact us for custom pricing` / `Contact us`), **two for the comparison table** (`Compare all features` / `Compare features by plan`), **four sales-contact verbs across the site** (`Request a demo`, `Talk to sales`, `Contact sales`, `Book a demo`), and `Learn more` five times bare alongside four object-bearing variants. Capitalisation of `Platform`, `Solutions`, `resources`, and `sales` varies between adjacent menu feet.

Against that, the **in-product action labels documented in docs are strong**: `Run again` rather than "Retry" (plain-language, matches the user's mental model of "do it again"), `Force cancel` as an explicitly escalated sibling of `Cancel`, and `Retry all failed or canceled jobs` spelling out the full scope rather than saying "Retry all". The long label is the right call — it prevents the user from wondering whether successful jobs will re-run.

## T4 Onboarding & getting-started

`[observed]` — no numbered "how it works" sequence exists on the marketing site. Onboarding is handled entirely in docs, and the notable thing is that **`Get started` is a documented content genre with a fixed title formula**.

**Eleven `Get started …` cards on the docs homepage, each a gerund phrase plus a one-line purpose** `[observed]`:

| Card title | Purpose line |
|---|---|
| `Get started with Git` | "Work with the Git version control system." |
| `Get started with the GitLab Duo Agent Platform` | "Use AI-native features throughout your development lifecycle." |
| `Get started organizing work with projects` | "Configure projects to suit your organization." |
| `Get started planning work` | "Plan and execute on work." |
| `Get started managing code` | "Build, track, and deliver the code for your project." |
| `Get started with GitLab CI/CD` | "Build and test your application." |
| `Get started securing your application` | "Test your application and resolve vulnerabilities." |
| `Get started deploying and releasing your application` | "Deploy and manage dependencies." |
| `Get started managing your infrastructure` | "Employ best practices for managing your infrastructure." |
| `Get started with monitoring your application in GitLab` | "Monitor your app and respond to incidents." |
| `Get started extending GitLab` | "Interact programmatically with GitLab." |

The titles mirror the `Use GitLab` sidebar sequence one-to-one, so the onboarding cards and the reference IA are the same list in two registers. `Get started with X` for tools and platforms; `Get started <gerund>ing Y` for activities. The split is nearly consist— but `Get started with monitoring your application in GitLab` uses *both* patterns plus a trailing `in GitLab`, and `Get started with GitLab CI/CD` uses the tool form where its sidebar sibling uses the activity form. **Two formula collisions in eleven items.**

Also note `Monitor your app and respond to incidents.` — the only place on the docs homepage that abbreviates to `app`, where ten siblings say `application`.

**Prerequisite blocks precede every procedure** `[observed]`. Docs how-tos open with a literal `Prerequisites:` heading and a permission list:

> "You must have the Developer, Maintainer, or Owner role for the project."
> "The job must not be archived."
> "The job must be in the `canceling` state, which requires: GitLab 17.0 and later. GitLab Runner 16.10 and later."

Prerequisites are stated as **conditions on the world, not warnings to the reader** — "The job must not be archived" rather than "You can't retry archived jobs". Combined with GitLab's `Tier:` and `Offering:` badges (below), a reader can determine eligibility before reading a single step.

**Every docs page opens with an eligibility pair** `[observed]`:

> `Tier: Free, Premium, Ultimate`
> `Offering: GitLab.com, GitLab Self-Managed, GitLab Dedicated`

And these vary mid-page: the `Job using resource_group gets stuck` section re-declares `Offering: GitLab Self-Managed, GitLab Dedicated` because the fix requires a Rails console. **Section-level eligibility metadata** is a genuinely strong documentation content pattern — the reader is never mid-procedure before discovering it does not apply to them. Directly transferable to any product with plan-gated or market-gated features.

**Version-history disclosure is a named docs block** `[observed]`: a `History` heading per feature, listing introduction, feature-flag name, default state, and GA version, e.g. "Job name filter added as an experiment … with feature flags named `populate_and_use_build_names_table` for the API and `fe_search_build_by_name` for the UI. Disabled by default." Publishing internal feature-flag names to end users is unusual transparency and doubles as a support artefact.

**Install onboarding is framed as a choice, with the choice acknowledged** `[observed]`: `Install GitLab Self-Managed` / "You've got options. See them all", then `Install on Linux` / `Install on Kubernetes` as promoted paths with `Install with Docker`, `Self-compile`, `Install from cloud provider` below. `Self-compile` carries an explicit fallback framing: "If the Linux package isn't available for your distribution, you can self-compile GitLab." The hardest path is presented as the *conditional* one, not the expert one.

**Reference architectures are named by scale alone** `[observed]`: `1,000 users` · `2,000` · `3,000` · `5,000` · `10,000` · `25,000` · `50,000`, under "Scale your GitLab installation by using the recommended configurations." Seven sizing options addressed by the only number the reader knows about themselves.

## T5 Form & field labels

`[observed]` on public marketing surfaces — almost nothing. The only live form is the status-page subscribe set: `Email address for managing webhook`, `Email address for managing subscription`, `Slack channel ID`, `Email address`, with `Manage Existing Subscription` / `Create New Subscription` as a mode toggle and `Enter your Microsoft Teams webhook.` as instruction text. Status.io furniture, not GitLab's design system — the `Manage Subscription` / `Manage Existing Subscription` near-duplication on one panel is a third-party defect.

`[documented]` — Pajamas publishes a full form content specification, and it is the most complete in this corpus so far.

**Eight-part form anatomy, each with a defined content job** `[documented]`:

1. `Label` — "Clearly and concisely identifies an input."
2. `Inputs`
3. `Optional suffix` (optional) — "Indicate that a field isn't required."
4. `Placeholder` (optional) — "Hints at what should be entered into a field."
5. `Description` (optional) — "Clarifies the purpose or intent of an input."
6. `Validation message` — "Appears if the input is invalid, acceptable, or needs awareness."
7. `Help text` (optional) — "Provides contextual examples, formatting information, details about the input field state."
8. `Actions` — "Used to submit or cancel a form."

The distinction between **`Description` (above the input, explains *why*) and `Help` (below the input, explains *how*)** is the reusable part. Two optional text slots with different positions and different jobs, rather than one undifferentiated "hint text". Validation sits between them: "The message is placed directly below the input and above any help text."

**Required/optional convention is inverted from the norm, with a documented exception** `[documented]`:

> "By default all information in forms is required unless stated otherwise with '(optional)' added to the label… However, if your form is entirely optional except for 1-2 fields, you may opt to append '(required)' to the field label instead."

Marking the minority case is the right rule, and GitLab states the flip condition explicitly rather than leaving it to judgement. Example given: `Phone number (optional)`.

**Label rules** `[documented]`: sentence case; "Do not use punctuation. Special characters are allowed for formatting (`-:;`)."

**Description rules include two prohibitions worth quoting** `[documented]`:

- "Avoid repetitive or unnecessary text. For example, `This setting is...` or `Use this setting to...`"
- "Don't use `allow` unless you're specifically talking about security. For example, `Allows users to fork the repo` should be `Users can fork the repo`."

The `allow` rule is the sharpest single line in Pajamas. It converts a system-centred grant ("the software allows you") into a user-centred capability ("you can"), and reserves the permission verb for the one context where permission is genuinely the subject. That is a one-word find-and-replace with a real shift in stance, and it transfers to any settings surface.

**Help-text rule includes a skip condition** `[documented]`: "You can omit examples or expected format if the user typically copies an already validated value to paste into the input. For example, the user copies and pastes their Google Cloud project ID, which was validated when their project was created in Google Cloud." A rule about *when not to write help text*, justified by where the value comes from. Rare and good.

Example help string given: ``Must be 11 digits including the country code. Example: `+1-234-567-8901`. Learn more.`` — constraint, then example in code style, then the escape link. Three moves, one line.

**Placeholder policy is restrictive and names its own exception** `[documented]`: "Only used for extra, non-essential information when the input purpose is still understood in its absence; it's not a replacement for a visible label. An exception is the search component… For example, `Search or go to…`." Note `Search or go to…` — GitLab's global search placeholder does double duty as a navigation affordance, and the ellipsis is a real character in the string.

**Observed field labels from the Pajamas code samples** `[observed]`: `Email address` with description "We'll never share your email with anyone else." and placeholder `name@domain.com`; `Your name`; `Merge state` with options `Select one` / `Open` / `Resolved` / `Closed` / `Blocked`; `Date`; `Group ID`; checkboxes `Squash commits` and `Create new issue`; `Label Name` with "form group description (used as help text)."; disabled field description `This feature is disabled.`

Two things. `Merge state` offers `Open`, `Resolved`, `Closed`, `Blocked` — a four-state vocabulary in a sample that does not match any of GitLab's real job or MR state sets, so the design-system example ships an invented state list. And `Label Name` is title case in a code sample on a page that mandates sentence case. **Both are defects in the design system's own examples.**

**Validation feedback strings from the samples** `[observed]`: `This field is required.` (invalid) and `This field is valid.` (valid), alongside the description `Enter a first and last name.` Note `This field is required.` is precisely the string Pajamas's own error guidance rejects as too generic (`Field is empty` is called out as worse than `Display name is required`). **The component example contradicts the content rule on the same site.**

**Character-counter copy is fully specified, including two tiers** `[documented]`:

| Counter type | Tooltip before limit | Tooltip after limit |
|---|---|---|
| Limited length | `Characters left` | `Characters over limit` |
| Recommended length | `Recommended characters left` | `Over recommended length` |

Four strings, and the *recommended* tier is the interesting one: a soft limit that turns `info`-coloured rather than `danger`, with copy that never says "error". A product distinguishing "you cannot" from "you probably shouldn't" in microcopy and colour together. Over-limit is shown as a negative number (`-23`).

**Disabled-submit prohibition, with three stated reasons** `[documented]`:

> "Do not use a disabled submit button to visualize form validation… There is no mechanism to attempt to proceed or remediate unknown errors. A disabled button can be missed by a screen reader, leaving a user unsure of what to do next. Disabled elements typically have lower contrast…"
>
> "Consider using a contextual message to indicate if additional action is needed instead."

An accessibility-derived content rule: because a disabled control cannot explain itself, the explanation must move into copy. And GitLab names the one legitimate exception (preventing double submission after submit).

**`disabled` vs `readonly` is disambiguated by user intent** `[documented]`: "Disable an element… if the user lacks permission to interact with it, but still needs to know it exists. If an element is already populated, but the user doesn't have permission to edit it, use the `readonly` attribute." A semantic distinction with a content consequence.

## T6 Status & state language

The richest status vocabulary in the corpus so far, and — unlike GitHub — mostly **coherent across surfaces**, because GitLab publishes one job-status list rather than three overlapping ones.

### 6.1 CI/CD job statuses — thirteen names, each glossed `[documented]`

From the CI/CD Jobs docs page, under the heading `Available job statuses`.

| Status | Gloss (verbatim) |
|---|---|
| `created` | "Job has been created but not yet processed." |
| `pending` | "Job is in the queue waiting for a runner." |
| `preparing` | "Runner is preparing the execution environment." |
| `waiting_for_resource` | "Job is waiting for resources to become available." |
| `waiting_for_callback` | "Job is waiting for a callback from an external service." |
| `scheduled` | "Job has been scheduled but execution hasn't started." |
| `manual` | "Job requires manual action to start." |
| `running` | "Job is executing on a runner." |
| `canceling` | "Job is being canceled but `after_script` is running." |
| `canceled` | "Job was manually canceled or automatically aborted." |
| `failed` | "Job execution failed." |
| `skipped` | "Job was skipped due to conditions or dependencies." |
| `success` | "Job completed successfully." |

(Listed alphabetically on the page; reordered here into lifecycle sequence, which the page does not do — a small IA miss, since alphabetical ordering of a state machine hides the sequence.)

**Five distinct pre-execution states.** `created` (not processed) → `pending` (queued, no runner) → `preparing` (runner setting up) plus two blocked variants, `waiting_for_resource` and `waiting_for_callback`. Compare GitHub's four-way not-yet-running taxonomy (`requested`/`queued`/`pending`/`waiting`). GitLab's advantage is that **every waiting state names what it is waiting for**: `waiting_for_resource`, `waiting_for_callback`, and `pending`'s gloss says "waiting for a runner". GitHub's `pending` and `waiting` are opaque without the table; GitLab's are self-documenting even as bare tokens in a log.

`preparing` is the state most products do not ship: the gap between "a machine has been assigned" and "your code is running". Giving that interval its own name means a user staring at a slow build knows whether the delay is queueing or provisioning.

**`canceling` is the standout.** Gloss: "Job is being canceled but `after_script` is running." A transitional state that exists *because cancellation is not instantaneous*, and the reason is named in the state's own definition. The documented cancel sequence is a four-step narrative:

> 1. The job is marked as `canceling`.
> 2. The running command is allowed to complete. The rest of the commands in the job's `before_script` or `script` are skipped.
> 3. If the job has an `after_script` section, it always starts and runs to completion.
> 4. The job is marked as `canceled`.

Then a named escape: **`Force cancel`** — "Force cancel immediately moves a job from the `canceling` state to `canceled`", with the consequence disclosed ("the job token is immediately revoked. If the runner is still executing the job, it loses access to GitLab."). A UI control whose entire purpose is to skip a state, with its own permission requirement (Maintainer or Owner) and its own version prerequisite.

This is the most transferable status pattern in the file: **when "cancel" takes time, give the interval a present-participle name, explain what is still running, and ship a separate control for people who cannot wait.** Applies directly to payment cancellations, refund reversals, and any long-running back-office job where "cancelled" currently means "we have started cancelling".

Note `canceling` / `canceled` use US single-l spelling throughout; the UI labels are `Cancel` and `Force cancel`.

### 6.2 Job sources — twenty names `[documented]`

A separate `source` attribute, "indicates the action that triggered the job", with twenty values each glossed with a `Job initiated by …` formula: `api` · `chat` · `container_registry_push` · `duo_workflow` · `external` · `external_pull_request_event` · `merge_request_event` · `ondemand_dast_scan` · `ondemand_dast_validation` · `parent_pipeline` · `pipeline` · `pipeline_execution_policy` · `pipeline_execution_policy_schedule` · `push` · `scan_execution_policy` · `schedule` · `security_orchestration_policy` · `trigger` · `unknown` · `web` · `webide`

Every gloss begins with the identical three words (`Job initiated by`), so the list is scannable on the differentiating noun alone. Two glosses carry **negative scoping**: `external` says "This does not include pull request events" and `external_pull_request_event` exists separately. Disambiguating two adjacent categories by stating what the broader one excludes, in the gloss, is better practice than a footnote.

`unknown` is shipped as an explicit enumerated value ("Job initiated by an unknown source") rather than left as a null. `duo_workflow` — "Job initiated by GitLab Duo Agent Platform" — makes the AI agent a first-class trigger source alongside humans and schedules, which is the 2026 equivalent of adding `api` in 2015.

Also note the surfacing decision: "By default, the filter shows only build jobs. To view trigger jobs, clear the filter, then select **Kind** > **Trigger**." A documented default filter that hides a job kind, with the un-hiding procedure given.

### 6.3 Job-ordering rules encode status severity `[documented]`

> "For full pipeline graphs, jobs are sorted alphabetically by name. For pipeline mini graphs, jobs are sorted by status severity with failed jobs appearing first, and then alphabetically by name."

Two sort orders for the same objects, chosen by surface: the detailed view sorts for *findability*, the compact view sorts for *triage*. "Status severity" is named as an ordering concept without the severity scale itself being published — a gap, but the principle (compact surfaces sort by urgency) is directly reusable for notification lists and transaction feeds.

**Grouped-job status roll-up** `[documented]`: "Hovering over them shows you if all jobs have passed or any has failed." Aggregate status expressed as an all/any pair.

### 6.4 Stuck-job thresholds and failure reasons — six codes `[documented]`

The single most useful status table on the site, because it maps state + duration → machine reason:

| Job state | Threshold | Failure reason |
|---|---|---|
| Pending | 24 hours | `stuck_pending_with_matching_runners` |
| Pending | 1 hour | `stuck_pending_no_matching_runners` |
| Running | 30 minutes with no updates | `no_updates_running` |
| Canceling | 30 minutes with no updates | `no_updates_canceling` |
| Running | Configured `timeout` plus 15 minutes | `server_timeout_running` |
| Canceling | Configured `timeout` plus 15 minutes | `server_timeout_canceling` |

Two things are excellent here. First, **the timeout is shorter when the system knows the job cannot succeed**: 1 hour if no matching runner exists, 24 hours if one does. The wait length encodes the probability of eventual success, and the reason code names which case applied. Second, `canceling` gets its own timeout pair — a transitional state that can itself get stuck, with named failure reasons for that. Most systems have no vocabulary for "cancellation failed to complete".

And the page closes the interpretive loop: "If your job failed immediately instead of waiting, this isn't the cause." A **negative diagnostic** — telling the reader when to stop reading this section. That single sentence prevents the commonest troubleshooting error, which is applying the wrong explanation.

### 6.5 Status page — 23 components, each annotated with its provider `[observed]`

Rollup: `All Systems Operational`, with `Updated a few seconds ago` (relative time, live).

Component list: `Website` · `API` · `Git Operations` · `Package Registry` · `Container Registry` · `GitLab Pages` · `CI/CD` · `CI/CD - Hosted runners on Linux` · `CI/CD - Hosted runners on Windows` · `CI/CD - Hosted runners on macOS` · `CI/CD - Hosted runners for GitLab community contributions` · `CI/CD - Self-managed runners` · `SAML SSO - GitLab SaaS` · `Background Processing` · `GitLab Customers Portal` · `Support Services` · `packages.gitlab.com` · `version.gitlab.com` · `forum.gitlab.com` · `docs.gitlab.com` · `Canary` · `GitLab Duo` · `GitLab agent server for Kubernetes`

**Every component carries its hosting provider as a visible sub-label**: `Google Compute Engine` for most, `AWS` for `packages.gitlab.com` and `version.gitlab.com`, `Digital Ocean` for `forum.gitlab.com`, `Zendesk` for `Support Services`, `Self-Managed Runner Connectivity` for self-managed runners, and `Google Compute Engine` + `AWS` for macOS runners. GitHub names one upstream-vendor component (`Copilot AI Model Providers`); GitLab **publishes the entire infrastructure dependency map on its status page**. A user seeing `Support Services / Zendesk / Operational` knows their ticket system is a third party.

The `CI/CD` family is split five ways by runner OS and audience, including a dedicated `CI/CD - Hosted runners for GitLab community contributions` — a status component for the open-source contributor path specifically. That is a real content-ops decision: the community is a named user segment on the status page.

`Canary` as a public status component exposes the deployment topology (a canary stage the user may be routed into) as something the user can check. And `Support Services` being on the status page at all means "can I even file a ticket" is answerable.

**Scope disclaimer is given prominence above the components** `[observed]`, and it does routing work rather than legal work: the page states it covers GitLab.com and associated services only, and directs anyone with a non-incident issue or a GitLab Dedicated interruption to `support.gitlab.com`. Telling the reader *what this page will not tell them* before the green ticks. Note the URL is rendered as bare text rather than a link in the served markup — a defect.

**Nine subscription channels** `[observed]`: `Email` · `Webhook` · `RSS` · `Microsoft Teams` · `Slack` · `Twitter/X` · `Calendar` (iCalendar). `Calendar` is unusual — subscribing to status events as calendar entries, which implies maintenance windows are the intended use.

### 6.6 Pipeline and merge-state vocabulary `[observed]` / `[documented]`

Named entities and states: `pipeline` · `stage` · `job` · `runner` · `artifact` · `cache` · `environment` · `deployment job` · `downstream pipeline` · `parent pipeline` · `merge request pipeline` · `scheduled pipeline` · `pipeline mini graph` · `full pipeline graph` · `resource group` · `protected environment` with an `Allowed to deploy` list · `archived` pipelines · `hidden job` (a job whose name starts with `.`, "not processed by GitLab CI/CD").

`hidden` is a state produced by a **naming convention rather than a setting** — prefixing a job name with a period disables it. Documented as "To temporarily disable a job without deleting it from the configuration file", which names the user's actual intent (temporary, non-destructive) rather than the mechanism.

### 6.7 Time and date language `[documented]`

Pajamas maintains a dedicated `Date and time` content page (not harvested) alongside `Verb tenses` and `Punctuation`. Observed elsewhere: `Updated a few seconds ago` (status page relative time), `Last updated at: Tuesday, September 8, 2026 at 10:01 PM` (Pajamas page footers — full weekday, date, 12-hour time), and a documented retention window in prose: "The filter by name returns jobs created in the last 30 days. This retention period applies to both UI and API filtering."

## T7 Error, failure & recovery

GitLab's error content has two layers with two different grammars: **docs sections titled with the verbatim message string** (developer-facing, machine-voiced) and **Pajamas rules governing UI error copy** (user-facing, human-voiced). The two layers are explicitly linked — Pajamas's error guidance defers to the technical-writing word list and style guide.

### 7.1 Error-titled troubleshooting sections `[documented]`

The troubleshooting page uses **the message string itself as the section heading**, backticked, with a trailing noun classifying it:

| Section heading (verbatim) | Classifier used |
|---|---|
| `` `You are not allowed to download code from this project.` error message `` | `error message` |
| `` `Job may allow multiple pipelines to run for a single action` warning `` | `warning` |
| `` `This GitLab CI configuration is invalid` for variable expressions `` | (scoping phrase) |
| `Error: `data integrity failure`` | `Error:` prefix |
| `` `You are not authorized to run this manual job` message `` | `message` |
| `` `get_sources` job section fails because of an HTTP/2 problem `` | symptom-named |
| `Job using `resource_group` gets stuck` | symptom-named |
| `Job dropped after being stuck or exceeding its timeout` | symptom-named |
| `A CI/CD job does not use newer configuration when run again` | symptom-named |
| `Jobs or pipelines run unexpectedly when using `changes:`` | symptom-named |
| `File paths in CI/CD variables` | bare-topic |

**Four different classifier conventions in one page**: `error message`, `warning`, `message`, and an `Error:` prefix. The first three are suffixes; the fourth is a prefix. Compare GitHub's SSH section, which uses a consistent `Error:` prefix across nine articles. GitLab's inconsistency is a real findability cost — a user pasting `You are not authorized to run this manual job` will match, but a user searching for "GitLab error data integrity failure" and a user searching for "GitLab data integrity failure error" hit differently shaped headings.

Against that, GitLab does something GitHub does not: it **distinguishes severity in the heading** (`error message` vs `warning` vs `message`), so the reader learns before clicking whether the string they saw blocks them or merely informs them. `Job may allow multiple pipelines to run for a single action` is explicitly labelled a warning, which tells a panicking user their pipeline is not broken.

### 7.2 Verbatim error strings with cause and recovery `[documented]`

| Error string (verbatim) | Cause named? | Fix named? | Recovery offered |
|---|---|---|---|
| `You are not allowed to download code from this project.` | Yes, in docs body: admins must be direct members of a private project to clone it | No, in the string | Two options: add the administrator as a direct member (any role), or impersonate a direct member. Plus a link to the open issue to change the behaviour |
| `You are not authorized to run this manual job` | No | No | Two documented causes: target is a protected environment and the account is not in the `Allowed to deploy` list; or "prevent outdated deployment jobs" is enabled and running would overwrite the latest deployment. **The docs note the message appears "with **Run** disabled"** — so the copy and the control state are documented together |
| `This GitLab CI configuration is invalid` | No — and the docs say there are several variants: "You might receive one of several `This GitLab CI configuration is invalid` errors" | No | Quoting rules explained with four invalid examples, each annotated with *why* it is invalid |
| `data integrity failure` | No | No | Three named causes with their log signatures: "Database sequence corruption after an upgrade" (`PG::UniqueViolation` in PostgreSQL logs), "Stale Sidekiq processes after an upgrade" (intermittent, retry succeeds), "Ambiguous or invalid SQL from schema changes". Then: inspect the job to find `failure_reason` |
| `error: RPC failed; curl 16 HTTP/2 send again with decreased length` / `fatal: ...` | Yes (HTTP/2 negotiation) | Yes | Two concrete config workarounds: `pre_get_sources_script` with `git config --global http.version "HTTP/1.1"`, or runner `config.toml` env vars |
| `Job may allow multiple pipelines to run for a single action` | Yes ("`rules` with a `when` clause without an `if` clause") | Yes | "use `workflow: rules` or rewrite your rules" |

**Grammatical pattern: GitLab's error strings are second-person permission denials.** Three of the six begin `You are not…`:

- `You are not allowed to download code from this project.`
- `You are not authorized to run this manual job`

This is a distinct choice from GitHub's passive, agent-final constructions (`Resource not accessible by integration`). GitLab addresses the user directly and names them as the blocked party. It is more legible and more confronting; Pajamas's own rule says "Do not blame the user", and `You are not allowed` sits uncomfortably close to blame even though the cause is configuration rather than error. **A real tension between the published rule and the shipped string.**

Also note the inconsistent terminal punctuation: `You are not allowed to download code from this project.` has a full stop; `You are not authorized to run this manual job` does not. Same message family, two conventions. And `allowed` vs `authorized` for the same semantic — two words for one concept in two adjacent strings.

**Recovery is consistently plural and ranked.** Every error in the table offers two or more routes, and the second route is often a delegation or workaround rather than a fix: "impersonate a user who is a direct member", "use `workflow: rules` **or** rewrite your rules", two config locations for the HTTP/1.1 workaround. GitLab does not assume the reader has the permission to apply the first fix.

**Open issues are linked from error documentation** `[observed]`: "An issue exists to change this behavior." — GitLab links the bug report for the behaviour causing the error, from the troubleshooting page. Telling the user "we agree this is wrong and here is the ticket" is a trust move very few products make in error docs.

**Escalation to a `failure_reason` inspection** `[documented]`: "inspect the job in the Rails console to determine the `failure_reason` and whether a downstream pipeline was created." The final recovery step for the hardest error is *find the machine code*, which inverts the usual direction — most products show the code and hide the prose; GitLab shows the prose and makes the code the deep diagnostic.

**Error-adjacent warnings written as consequences, not prohibitions** `[documented]`:

- "Be careful when using file paths in CI/CD variables. A trailing slash can appear correct in the variable definition, but can become invalid when expanded" — with the resulting bad path shown (`path/to/files//*`) and the vagueness of the consequence admitted: "The double slashes might cause unexpected behavior depending on factors like the keyword used, or the shell and OS of the runner."
- "Use unique names for your jobs. If multiple jobs have the same name in a file, only one is added to the pipeline, **and it's difficult to predict which one is chosen.**"

Both admit uncertainty rather than asserting a clean rule. "It's difficult to predict which one is chosen" is an honest statement of nondeterminism in user-facing docs.

**Named recovery feature** `[observed]`: `GitLab Duo Root Cause Analysis` — an AI feature whose entire purpose is explaining a failed job, surfaced in the troubleshooting section of the jobs docs. Where GitHub ships `Copilot Autofix` (fix the vulnerability), GitLab ships `Root Cause Analysis` (explain the failure). The naming difference tracks the product difference: autofix promises the remedy, RCA promises the diagnosis.

**Where failure reasons surface — four places, enumerated** `[documented]`:

> "In the pipeline graph, in the pipeline details view. In the pipeline widgets, in the merge requests and commit pages. In the job views, in the global and detailed views of a job."
> "In each place, if you hover over the failed job you can see the reason it failed."

Documenting the *inventory of surfaces* on which an error string appears is a content-ops artefact most teams never publish, and it is exactly what a content designer needs before changing the string.

### 7.3 Published error-message rules — Pajamas `[documented]`

Two pages carry error guidance, and they are complementary rather than duplicative.

**From `How to write UI text` — the "leave out sorry and please" rule with a named exception:**

> "When writing an error message, leave out extraneous words like `sorry` and `please`. This makes errors easier to read and understand. **If necessary, you can use `please` when the user has been inconvenienced.**"

| | Do | Don't |
|---|---|---|
| Name the failure and the repair | `Unable to complete your request. Enter a valid email address.` | `400 Bad Request` |
| Name the cause, then invite retry | `Connection timed out. Please try again.` | `Something went wrong.` |

This is more nuanced than GitHub's flat "do not apologize too much". GitLab **bans `please` by default and licenses it for inconvenience** — and then demonstrates the licence in its own example (`Connection timed out. Please try again.` retains the please, because a timeout wasted the user's time and was not their fault). A conditional politeness rule with a worked case is more usable than a prohibition.

Note the shape of the Do examples: **two sentences, cause then action.** `Unable to complete your request.` + `Enter a valid email address.` The first sentence is passive with no subject (avoiding blame); the second is a bare imperative (giving the repair). That two-move structure is the single most copyable thing in this section.

**From `Forms` — three named criteria, each with rejected examples:**

Framing first: "Error messages are an indication of system status. They let users know that they have encountered a problem and provide ways to resolve it, **teaching them to avoid future impediments.** Whenever possible, the system should keep potential errors to a minimum."

Defining errors as *teaching* rather than *notifying*, and naming error prevention as the first obligation, is the right hierarchy.

*Concise:* "Describe the error, inform users about what has happened, and if possible, how to resolve it." With a tone warning that is the best sentence in Pajamas:

> "An overly familiar tone of voice can be perceived as careless in the context of error resolution, **especially if the error can't be easily resolved by the user.**"

The conditional is what makes it useful. Friendliness reads as carelessness in proportion to how stuck the user is. That gives a content designer a variable to reason with, not just a rule to obey.

Rejected: `Whoops, GitLab is currently unavailable.`
Accepted: `An error occurred while importing the project to GitLab. For more information, see how to import your project from GitHub to GitLab.` · `The project name must be 40 characters or fewer.` · `Email is required.`

The accepted trio spans three lengths deliberately: one long (system failure, needs a doc link), one medium (constraint, needs the number), one two-word (required field, needs nothing).

*Specific:* "Generic error messages are not helpful, and they don't make sense out of context. Try to provide different errors for different messages and scenarios. For example, errors in text fields can be too long, too short, in the wrong format, and so on."

| Preferred | Rejected | Stated reason |
|---|---|---|
| `Project title must have at least 3 characters.` | `Name is too short` | "more specific and direct" |
| `Display name is required` | `Field is empty` **and** `Your display name can't be blank` | "more specific than `Field is empty` and **more succinct than** `Your display name can't be blank`" |

The second row is the sophisticated one — it rejects a string for being *too vague* and a different string for being *too verbose*, and the winner is bounded on both sides. Most style guides only show the vague-to-specific direction. `Your display name can't be blank` loses because `Your` and `can't be blank` add length without adding information over `is required`.

*Consistent:* "use a contextual error message with the same phrasal structure… All messages should look, sound, and mean the same, according to the component they're displayed in."

Rejected set — three strings that mean one thing:
- `Password must be at least 8 characters.`
- `Password should not be less than 8 characters.`
- `Password has fewer than 8 characters.`

Prescribed: `Password must be at least 3 characters.`

**`<field> must be at least <n> <units>.`** is the canonical GitLab constraint template: modal `must`, positive framing (`at least`, never `not less than`), number, unit, full stop. The three rejects illustrate three failure modes — wrong modal (`should`), negative framing (`not less than`), and describing the input rather than the rule (`has fewer than`).

(Note the prescribed example says `3 characters` where the three rejects all say `8` — a **copy defect in the guidance itself**, since the demonstration of consistency is inconsistent with its own inputs.)

*Persistence:* "Error messages can be persistent, dismissible, or temporary." A three-way taxonomy — with a published `TODO:` admitting the rules for choosing between them do not yet exist, and a pre-filled `Create an issue` link. **Publishing the gap in your own content standard, with the issue template attached**, is a practice worth naming.

*Scenario routing:* "Errors in forms: see form validations. Errors in the system or on a page: see alert." Two error locations, two components, stated as a routing rule.

### 7.4 Destructive and irreversible framing `[observed]`

Pajamas ships a dedicated `Destructive actions` pattern page (not harvested), cross-linked from the error-messages section — errors and destruction treated as one problem space. Observed destructive-adjacent disclosure in docs and pricing:

- Force cancel: "the job token is immediately revoked. If the runner is still executing the job, it loses access to GitLab. The runner aborts the job without waiting for `after_script` to complete."
- Non-renewal (pricing FAQ, summarised): the licence key stops working, Enterprise Edition becomes non-functional, and the customer can downgrade to free Community Edition. **Stating that the software stops working** rather than "your subscription will end".
- Flex commitment (pricing FAQ, verbatim fragments): reserved seats and credits are "use-it-or-lose-it" and expire monthly; unused annual balance is forfeited and cannot be converted to cash.

`use-it-or-lose-it` is a colloquialism used in a financial-terms FAQ answer — informal register in the one place GitLab's own tone guidance would counsel flatness. Effective for comprehension, risky for a commitment contract.

## T8 Empty states

`[documented]` — Pajamas publishes the most *typed* empty-state guidance in this corpus: four named empty-state kinds, two of which have mandated exact copy.

**Three stated goals, ordered** `[documented]`: "Increase feature adoption. Improve learnability and feature discovery. Improve usability." Note adoption is first — GitLab is explicit that an empty state is a growth surface, and reinforces it: "All empty state solutions should include usage analytics so you and your team can measure and improve the empty state solution you've created over time. It's also important to think about this as a *solution*, much like any other solution being developed in your stage group."

**Bespoke before fallback** `[documented]`: the page instructs designers to invent a feature-specific empty state *first* and treat the generic component as a fallback. The worked example is genuinely good: "In an epic with 0 related issues, *suggest* a few existing issues through keyword matching or other intelligent methods that could be added with a simple click." An empty state that fills itself. Contrast GitHub's Primer, which starts from the `Blankslate` component and reasons about slots.

**Three-part anatomy with a word budget** `[documented]`:

- **Title** — "describes the empty state or motivates action, depending on the type… **Try to limit to 5 words (not counting articles or prepositions). Don't end with a period.**"
- **Description** — "explains in full sentences what actions the user can take."
- **Button** (optional) — "serves as a call to action (CTA) and directs the user to take an action."

A numeric word limit with a stated exclusion rule (articles and prepositions don't count) is more enforceable than "be brief". And the title/description split is a **register split**: fragment for the title, full sentences for the description.

**Four content requirements** `[documented]`: "Be simple and clear" · "Provide guidance and motivation: Offer clear instructions on how to proceed or resolve the empty state. **Encourage users to take action with motivating language.**" · "Align with the brand voice and tone: Keep the tone friendly, supportive, and empathetic." · "Use visual elements effectively… Ensure visual elements enhance the message and don't distract from it."

Note the tension with GitLab's error guidance, which warns that "an overly familiar tone… can be perceived as careless." Empty states are licensed to be `friendly, supportive, and empathetic`; errors are not. **A documented register gradient keyed to whether the user is blocked.**

**Four typed empty states** `[documented]` — the reusable core:

| Type | Title should be | Description should be | Button |
|---|---|---|---|
| `Blank content` | "A CTA that starts with an active verb" | "A sentence that starts with an active verb and encourages the user to use a feature" | "One or more buttons that align with the title's verb" |
| `Configuration required` | "A CTA that starts with an active verb" | "A CTA sentence that invites the user to start the configuration" | Primary to configure, optional secondary to delegate |
| `Higher tier feature` | **`Feature not available`** (mandated) | **`This feature is available only on GitLab <tier>.`** (mandated) | — |
| `Empty search results` | **`No results found`** (mandated) | **`Edit your search and try again.`** (mandated) | "This empty state does not contain a CTA." |

**"Buttons that align with the title's verb"** is the same term-continuity rule GitHub states for toasts, applied instead to the title/button pair. If the heading says `Analyze issues in your project`, the button should not say `Get started`.

**Example strings, verbatim** `[documented]`:

> `Analyze issues in your project` (alternative offered: `Get started with issue analytics`)
> "Create issues for projects in your group to track and see metrics for them."
> `[Create issue]`

> `Get started with product analytics`
> "Configure product analytics to track events within your project applications."
> `[Configure]`

Note the Issue Analytics example offers **two titles for one state** — `Analyze issues in your project` (the user's objective) or `Get started with issue analytics` (the feature's name). The first complies with GitLab's own `Objective-focused` rule; the second does not. Offering both in the canonical example weakens the rule.

**`Configuration required` mandates a delegation action** `[documented]`:

> "Secondary action for inviting a member to configure a feature. The secondary action should read as `Invite member to configure` and trigger the invite modal."

This is the single best empty-state idea in the corpus. When a feature needs setup the current user may not be able to perform, the empty state offers **"ask someone who can"** as a first-class secondary action, with the exact wording specified and an implementation reference. Most products present an empty state whose only CTA the user lacks permission to complete, producing a dead end. GitLab ships the escape hatch as the default second button, and justifies it with evidence: the References section cites an internal finding, "Invited users are more likely to activate new stages."

**`Empty search results` has no CTA, by rule** `[documented]` — a documented decision that one empty state should *not* try to convert. `No results found` / `Edit your search and try again.` is also the fix for the exact defect recorded in the Wise exemplar (the string that renders with empty quotes): GitLab's mandated copy interpolates nothing.

**`Higher tier feature` is an upsell empty state with an owner** `[documented]`: "The Growth team is the DRI for `Higher tier feature` empty state regions." A named accountable team for a copy pattern, and a published `TODO:` that its specification does not yet exist. The mandated description — `This feature is available only on GitLab <tier>.` — is notably flat: no benefit language, no CTA, just the eligibility fact and the tier token. Restraint in an upsell slot.

**Fallback component copy, shipped publicly** `[observed]`:

> `title="This state is empty"`
> `description="The title and message should be clear, concise, and explain why the user is seeing this screen."`
> `primary-button-text="Something actionable"` · `secondary-button-text="Something else"`

The code sample's description string is *instructions to the implementer*, and the button labels are `Something actionable` / `Something else`. Harmless in a doc sample, but these are exactly the strings that leak into production when a component is copy-pasted. Also `illustration-name="status-nothing-md"` exposes a naming convention (`status-nothing`) for the no-content illustration.

**Accessibility requirement inside the empty-state spec** `[documented]`: the `headerLevel` prop — "For accessibility this should be set to an appropriate value in the context where the component is used. Defaults to `h2`." Heading level treated as content-designer-adjacent configuration rather than a purely engineering concern.

**Live empty-adjacent strings** `[observed]`: status page `No incidents` equivalents were not visible during this harvest (all components operational, no history shown on the landing page). `[absent]` for observed GitLab empty states.

## T9 Notifications & system messages

`[documented]` — Pajamas names a **`Choosing a messaging pattern`** page and a `Notifications` page, plus five messaging components: `Alert`, `⚠️ Banner` (deprecated), `Broadcast message`, `Toast`, `Popover`. Neither guidance page was harvested. `[absent]` for their contents.

The component *names* are themselves informative. `Broadcast message` is a distinct component from `Alert` and `Banner` — an admin-authored instance-wide announcement, which for a self-hosted product is a genuine content surface (a GitLab administrator writes UI copy their users read). A design system that provides a component for *customer-authored* system messaging is unusual, and it implies content guidance aimed at administrators rather than GitLab's own writers.

**The feedback/validation timing rule is the substantive finding** `[documented]`, from the Forms page:

> "Consider using a slower **debounce period** during real-time validation to prevent interrupting or frustrating a user while they're entering content."

Cross-referenced to a `Saving and feedback` pattern with a `#delayed-feedback` anchor. Message *timing* treated as a content decision, not just an engineering one — the same string is helpful after a pause and hostile mid-keystroke.

**Success messages are suppressed by default** `[documented]`: "There are two types of validation messages: **Error**… **Success**: Indicates content that is valid. **In most cases a success message isn't shown.**" A published default of silence for the happy path. Most systems ship green ticks reflexively; GitLab documents that confirming valid input is usually noise.

**Validation placement is specified** `[documented]`: "A validation message should always be visible and not placed in a tooltip. The message is placed directly below the input and above any help text." The anti-tooltip rule is an accessibility-motivated content rule.

**Notification vocabulary observed elsewhere** `[observed]`: `What's new?` (docs nav, and a marketing destination `What's new in GitLab` with a version number as its headline — `19.4` / "60+ improvements across AI, Security and much more"); `Suggest updates`; `Subscribe to receive status updates by email` (nine channel variants on the status page); and the docs `History` blocks, which function as per-feature changelog notifications embedded in reference pages.

`19.4 / What's new in GitLab / 60+ improvements across AI, Security and much more` is worth noting as a release-note headline pattern: **version number as the eyebrow, count of changes as the hook.** No feature named. It works because the audience's question is "is there enough here to read about", not "what shipped".

## T10 Disclosures, legal & compliance

The strongest category after T6/T7, and the most defect-laden.

**Tier and deployment model are orthogonal, and the page makes the reader choose twice** `[observed]`. Three deployment tabs, each with descriptive copy:

- `GitLab.com` — "GitLab.com is cloud-hosted by us. Instant setup, getting you to value quicker."
- `Self Managed` — "An instance of GitLab managed by you. You maintain full control of your data and infrastructure."
- `Dedicated` — "Single-tenant SaaS fully managed by us. Enterprise-grade security and compliance."

The three descriptions are built on a **single contrasting axis — who manages it** — stated in the same grammatical slot each time: "by us" / "by you" / "by us". Then each adds one differentiating benefit (speed / control / isolation). Three options, one comparison dimension, one tiebreaker each. That is a clean disclosure structure for a choice most vendors muddle.

(`Self Managed` unhyphenated in the tab label, `Self-Managed` hyphenated in every other instance on the page including the footnote `** Available on Self-Managed plans only`. **Defect.**)

**Tier names and taglines** `[observed]`

| Tier | Tagline |
|---|---|
| `Free` | "For individuals working on personal projects and open source contributions" |
| `Premium` (badged `Most popular`) | "For scaling organizations seeking enhanced productivity and collaboration" |
| `Ultimate` | "For enterprises requiring advanced security and compliance capabilities" |
| `GitLab Dedicated` | "For enterprises that need data isolation, residency, and protection." |
| `GitLab Dedicated for Government` | "For government agencies and customers in highly regulated industries." |

Every tagline is a `For <audience> <participle> <need>` fragment. Consistent, and it means the reader self-selects on audience noun alone. Note only the two Dedicated taglines end with full stops; the three main tiers do not. **Punctuation defect within one comparison row.**

**Price strings** `[observed]`: `$ 0` / "per user/month," / `No credit card required` · `$ 29` / "per user/month," / `billed annually` · `Get custom pricing`.

The space in `$ 0` and `$ 29` is a rendering artefact of the figure/symbol split, and the trailing comma on `per user/month,` is doing line-break work — both are visible in the served text. `billed annually` as the qualifier under a per-month figure is the standard-and-correct disclosure; `No credit card required` in the same slot for Free repurposes a friction disclosure as a price qualifier, which is a nice reuse of the position.

**Inclusion/stacking language** `[observed]`: `Everything from Free, plus:` · `Everything from Premium plus:` · `Everything from Premium, plus:` · `Includes everything from Ultimate, plus:` · `Includes everything from Ultimate and Dedicated, plus:`

Five variants of one formula, differing in the comma and the presence of `Includes`. **Defect.** The `Includes everything from Ultimate and Dedicated, plus:` on Dedicated for Government is the informative one — it discloses that the government SKU is a superset of two other products.

**Quota strings** `[observed]`: `5 users per top-level group` · `400 compute minutes per month` · `10 GiB adjustable storage` · `Unlimited licensed users` · `10,000 compute minutes per month` · `Unlimited guest users` · `50,000 compute minutes per month` · `Bring your own storage and runners`

`10 GiB adjustable storage` — `adjustable` is doing quiet work, signalling purchasability without saying "you will need to pay". `Bring your own storage and runners` as a Self-Managed Free "quota" is a category shift: where the SaaS card states a number, the self-hosted card states an obligation. Correct, and a good example of a comparison row that must change *kind* rather than value.

Note **`GiB` throughout, not `GB`** — binary units used consistently in user-facing pricing copy, which is technically precise and slightly unusual for a marketing surface. Undermined by `500GiB` (no space) appearing in one FAQ answer beside `500 GiB` in the table, and `10GiB` in the storage add-on beside `10 GiB` in the plan card.

**Comparison-table cell vocabulary** `[observed]`: `Limited` · `Limited access` · `Beta` · `Custom` · `Add-on GitLab Credits` · `Only $15/user` · `Coming soon`

Seven non-boolean cell values, three of which are problematic. `Limited` and `Limited access` are used in different rows for what appears to be the same idea — two words for one concept. `Only $15/user` puts a **sales adverb inside a comparison cell**, which is the one place in a pricing page where neutrality is the whole point. And `Coming soon` renders as a *link* in the `Custom Agents` row, so a roadmap status is clickable in a table of entitlements.

**Six feature categories in the comparison table** `[observed]`: `Source Code Management & DevOps Workflows` · `GitLab Duo Agent Platform` · `Project Management` · `Security and Compliance` · `SLA Management` · `Portfolio Management`

Note `Source Code Management & DevOps Workflows` uses `&` while `Security and Compliance` uses `and`, in the same list. **Defect.**

**The credits model is the most complex disclosure on the page** `[observed]`. `GitLab Credits` — `$1` / "per GitLab Credit Billing varies by plan*" — described as "the currency that powers a growing set of usage-based features, from AI-powered pipeline fixes to secure secret storage".

Naming a usage unit a **currency** in the product's own description is a strong and honest metaphor: it tells the user this is a budget to be spent, not a quota to be consumed. Three acquisition routes are disclosed:

1. Promotional included credits — `$12 included GitLab Credits per user/month` (Premium), `$24` (Ultimate), marked `*`
2. Monthly commitment pool — "refreshes monthly", better pricing at higher commitment, "Volume discounts are available with annual commitment", "Purchased credits are shared across your team"
3. On-demand — `$1/credit`, billed monthly

And three non-obvious consequences are disclosed rather than buried:

- "Included GitLab credits are a promotional offer available for a limited time." — with `See details and promo terms.` The included allowance is explicitly temporary.
- Once on-demand billing is enabled, **it remains enabled for the rest of the subscription term** (FAQ, summarised). A one-way door named as such.
- "Am I charged a different rate based on what model I use?" → yes, different AI models draw credits at different rates, **which change over time** (FAQ, summarised).

That last one is the disclosure a content designer should study: a usage-priced product admitting that the exchange rate between its unit and the underlying service is variable and will move. Most AI-credit products do not say this.

Three counter-disclosures bound the generosity:
- Included credits are per-user and **non-shareable**; commitment-pool credits are shared org-wide (FAQ)
- Reserved seats and credits are "use-it-or-lose-it" and expire monthly (Flex FAQ)
- Unused annual balance is forfeited and cannot be converted to cash (Flex FAQ)

**Footnote system is broken** `[observed]`. The table declares two footnotes — `* Available on GitLab.com plans only` and `** Available on Self-Managed plans only` — but **no row carries a `**` marker**, so the second footnote has no referent. Separately, the `*` on `$12 included GitLab Credits per user/month to access AI features. *` resolves to the promo-terms sentence in one place and links to the `#usage-pricing` FAQ anchor in the table, i.e. **one asterisk, two targets.** And the footnote text says `GitLab credits` (lowercase c) where every other instance on the page says `GitLab Credits`.

**Tax and reseller disclosure, verbatim and short** `[observed]`:

> "The listed prices may be subject to applicable local and withholding taxes. Pricing may vary when purchased through a partner or reseller."

Two sentences covering tax exclusivity and channel variance. Placed inside an FAQ answer (`Is the listed pricing all inclusive?`) rather than as a footnote under the prices — so the disclosure exists but is one click and one scroll away from the figures it qualifies. Notably there is **no currency indicator other than `$`** anywhere on the page, and no monthly/annual toggle.

**True-up and reconciliation disclosure** `[documented]`, FAQ `How will I be charged for add-on users?`: with quarterly subscription reconciliation (the default for new and renewing subscriptions after 1 August 2021) mid-term users are charged only for remaining quarters; without it, add-on users incur full annual true-ups. Disclosing a **billing-mechanism change with its effective date** to existing customers, in an FAQ, is good practice — it tells a long-tenured customer that their terms may differ from what the page describes.

**`What is a user?` as an FAQ question** `[observed]` — a contractual definition surfaced as a plain question. The answer (summarised) defines an end-user as a person *or machine*, includes employees, agents, and consultants, and states that every user in a namespace is counted except documented exceptions. Defining the billing unit in the FAQ rather than only in the MSA, and including machines, is the disclosure that matters most for a product whose agents now trigger jobs.

**Anti-abuse disclosure written as reassurance** `[observed]`, FAQ `Why do I need to enter credit/debit card details for free compute minutes?`: a card is required for shared runners because of crypto-mining abuse, verified with a one-dollar authorization — "No charge will be made and no money will transfer."

The structure is: name the friction, name the abuse that caused it, name the exact mechanism, and then flatly deny the user's fear in a six-word sentence. **"No charge will be made and no money will transfer."** is the model for any hold, pre-authorisation, or verification-charge disclosure — and directly relevant to PayPal's own account-verification and card-linking copy.

**Compliance and residency language** `[observed]`: `Dedicated` — "Fully isolated single-tenant SaaS hosted and managed by GitLab on AWS in a region of your choice (some regions unsupported)" (FAQ, summarised) — with the exception in parentheses inside the benefit sentence. `GitLab.com` hosting disclosed plainly: Google Cloud Platform in the USA. Marketing-side compliance claims: "Deploy in air-gapped environments", "maintain government compliance, and secure software by design", "track SBOMs", "Maintain audit trails, access controls, and comprehensive security testing", "collect audit-ready evidence automatically in every pipeline".

**Footer legal and transparency set** `[observed]`: `Terms of use` · `Privacy statement` · `Trust Center` · `AI Transparency Center` · `Sustainability` · `Diversity, inclusion and belonging (DIB)` · `Modern Slavery Transparency Statement`. Docs footer adds `Use of generative AI` and `Acceptable use of user licenses` as named legal pages.

**`AI Transparency Center` as a destination separate from `Trust Center`** is the notable structural choice — GitLab has split AI governance out of general trust into its own surface, where GitHub folds AI questions into the Trust Center FAQ. And `Acceptable use of user licenses` is cited from a pricing FAQ answer ("See Acceptable Use of User Licenses for user licensing documentation"), so the licence-compliance document is routed to from the commercial page.

**Trademark disclosure** `[observed]`: "Git is a trademark of Software Freedom Conservancy and our use of 'GitLab' is under license" — in the marketing footer. Docs pages carry a `Creative Commons License` badge, so the documentation is openly licensed while the marketing site is not.

## T11 Help-centre architecture

GitLab runs **three separate support surfaces** and names all three in one nav menu: `Support portal` (support.gitlab.com, Zendesk), `Customer portal` (customers.gitlab.com, billing), and the community `forum.gitlab.com`. Plus docs, plus `university.gitlab.com`. None was harvested directly; what follows is the routing architecture observable from the surfaces that were.

**Docs footer escalation ladder, in four labelled groups** `[observed]`:

| Group | Members |
|---|---|
| `Company` | `About GitLab` · `View pricing` · `Try GitLab for free` |
| `Feedback` | `View page source` · `Edit in Web IDE` · `Contribute to GitLab` · `Suggest updates` |
| `Help & Community` | `Get certified` · `Get support` · `Post on the GitLab forum` |
| `Resources` | `Terms` · `Privacy statement` · `Use of generative AI` · `Acceptable use of user licenses` |

**The `Feedback` group contains no feedback mechanism.** All four members are ways to submit a change to the documentation. There is no "was this helpful?" widget on GitLab docs at all — where GitHub ships `Was this Doc helpful?` / `Yes` / `No`, GitLab ships `Edit in Web IDE`. The implied stance: if the page is wrong, fix it; we are not collecting sentiment. Defensible for an open-core product with a public docs repo, and it is the most opinionated support-IA decision in this file. It also means GitLab has no per-page quality signal from readers who cannot or will not open a merge request.

The `Suggest updates` link is pre-filled: it opens a GitLab issue with `issuable_template=Documentation`. Lowering the cost of the contribution route is how GitLab justifies having no lighter-weight one.

**`Get certified` sits above `Get support`** in `Help & Community` — training offered before assistance. Combined with `university.gitlab.com` in the primary Resources menu, GitLab routes "I don't know how" to education and reserves support for "it's broken".

**Community routing is pre-filled too** `[observed]`: `Post on the GitLab forum` links to `forum.gitlab.com/new-topic?title=topic%20title&body=topic%20body&tags=docs-feedback`. The tag is `docs-feedback` — so the forum *is* the docs feedback channel, which resolves the apparent gap above: sentiment goes to the forum, corrections go to the repo.

**Docs page furniture** `[observed]`: `Skip to main content` · `Go to GitLab Docs homepage` · `Toggle menu` · `Tier:` / `Offering:` eligibility pair · `History` (version changelog) · `Prerequisites:` · a foot-of-page anchor list duplicating every `##` heading · `Find your GitLab version` as a permanent sidebar item.

`Find your GitLab version` in the persistent nav is a notable inclusion. For a self-hosted product, "which version am I on" is the prerequisite question for almost every other question, and GitLab gives it a standing slot rather than burying it in an FAQ.

**Version and offering metadata is machine-readable** `[observed]`: docs pages expose `meta-gitlab_docs_version: 19.5`, `meta-gitlab_docs_legacy_path`, `meta-gitlab_docs_breadcrumbs`, `meta-gitlab_docs_page_source`, and `meta-gitlab_docs_web_ide_link` in the head. The legacy-path field (`/ee/ci/jobs/job_troubleshooting.html`) means old URLs remain resolvable — a content-operations decision visible from outside.

**Article-title grammar — five shapes:**

| Shape | Examples |
|---|---|
| Imperative task | `Control how jobs run` · `Specify when jobs run with rules` · `Manage your code` · `Secure your application` · `Format scripts and job logs` |
| `Get started …` | `Get started with GitLab CI/CD` · `Get started managing code` |
| Bare noun reference | `Jobs` · `Pipelines` · `Runners` · `Caching` · `Artifacts` · `CI/CD YAML syntax reference` · `Job execution flow` |
| Error/symptom string | `` `You are not authorized to run this manual job` message `` · `Job using `resource_group` gets stuck` |
| Bare gerund | `Troubleshooting` · `Debugging` · `Testing` |

The imperative/noun split is cleaner than GitHub's, because GitLab uses gerunds only for the three diagnostic sections (`Troubleshooting`, `Debugging`, `Testing`) and imperatives everywhere else. The grammar therefore signals genre reliably: a gerund heading means "this is a mode you are in", an imperative means "this is a thing to do".

**Self-routing by eligibility precedes self-routing by task.** The `Tier:` / `Offering:` pair, the `Prerequisites:` block, and the section-level offering overrides together mean a reader's first three questions (does this apply to my plan, my deployment, my role) are answered before the first instruction. That ordering — eligibility, then permission, then procedure — is the single most transferable help-architecture pattern here.

## T12 FAQs

`[observed]` — GitLab's pricing FAQ is the largest in this corpus: **51 questions across 11 named sections**, with a jump-link list and a `Show all` control per section. Heading: `Frequentlyasked questions` (missing space — **defect**, and it will read as one word to a screen reader).

**Section names, verbatim**: `License and Subscription` · `Payments and Pricing` · `Features and Benefits` · `GitLab.com` · `Self-Managed` · `Dedicated` · `User Limits` · `Compute minutes` · `Storage Limits` · `Usage pricing` · `GitLab Flex`

Note the capitalisation drift: three sections use Title Case For Both Words (`License and Subscription`, `Payments and Pricing`, `Features and Benefits`, `User Limits`, `Storage Limits`), three use sentence case (`Compute minutes`, `Usage pricing`), and three are product nouns. The jump-link list says `Usage Pricing` where the heading says `Usage pricing`. **Defect.**

**Selected questions, verbatim** (full set of 51 recorded in the harvest; a representative slice below):

| Section | Question (verbatim) |
|---|---|
| License and Subscription | `I already have an account, how do I upgrade?` |
| | `Can I add more users to my subscription?` |
| | `How will I be charged for add-on users?` |
| | `What happens when my subscription is about to expire or has expired?` |
| | `What happens if I decide not to renew my subscription?` |
| | `Can I acquire a mix of licenses?` |
| | `How does the license key work?` |
| | `What is an Activation Code?` |
| | `What documentation applies to use of my subscription?` |
| Payments and Pricing | `What is a user?` |
| | `Is the listed pricing all inclusive?` |
| | `Can I import my projects from another provider?` |
| | `Do you have special pricing for open source projects, educational institutions, or startups?` |
| | `How does GitLab determine what future features fall into given tiers?` |
| Features and Benefits | `What are the differences between Free, Premium, and Ultimate plans?` |
| | `What are the differences between SAST, Secret Detection, and Container Scanning across tiers?` |
| | `What does support entail?` |
| | `Do you have a success offering?` |
| GitLab.com | `Where is GitLab.com hosted?` |
| Self-Managed | `Is there a minimum supported version to use specific capabilities?` |
| Dedicated | `Where is GitLab Dedicated hosted?` |
| User Limits | `What is the 5-user limit on the GitLab.com Free tier?` |
| Compute minutes | `What are compute minutes?` |
| | `What happens if I use all of my compute minutes?` |
| | `Do the compute minutes apply to all runners?` |
| | `Why do I need to enter credit/debit card details for free compute minutes?` |
| Storage Limits | `What are the current GitLab.com storage limits?` |
| | `What does the purchased storage cover?` |
| Usage pricing | `Am I charged a different rate based on what model I use?` |
| | `Can I share credits across my organization?` |
| GitLab Flex | `What's the difference between "reserved" and "on-demand" usage?` |
| | `Can I limit how much on-demand usage I accrue?` |
| | `Do unused reserved GitLab Credits or seats carry over to the next month?` |
| | `Can I convert my GitLab Flex commitment back to cash if I don't use it all?` |

**Structural notes.** Answers are summarised in T10 above; they range from one sentence to a multi-paragraph terms explanation. The distribution is telling: **35 of 51 questions concern money, licensing, or quotas** (`License and Subscription` 11, `Payments and Pricing` 5, `User Limits` 1, `Compute minutes` 6, `Storage Limits` 3, `Usage pricing` 4, `GitLab Flex` 12). Only 5 are about features. This is a **commercial-mechanics FAQ wearing a pricing-page costume**, and its real job is answering procurement rather than evaluation.

**Person and voice.** Unlike GitHub's third-person Trust Center FAQ (`What is GitHub's commitment to AI?`), GitLab's questions are overwhelmingly **first person from the customer**: `Can I add more users…`, `What happens if I decide not to renew…`, `Am I charged a different rate…`, `Can I convert my GitLab Flex commitment back to cash if I don't use it all?`. Twenty-plus questions open with `Can I` or `What happens if I`. The FAQ is written in the voice of someone about to sign a contract and worrying about the downside.

`Can I convert my GitLab Flex commitment back to cash if I don't use it all?` is the standout. GitLab wrote, in the customer's own words, the question whose answer is *no*, and published it under a section promoting the product. Four Flex questions have unfavourable answers (no credit-card purchase, no mid-term switch, no deployment-model change, no cash conversion, no monthly carry-over). **Asking the adverse question in the user's voice, prominently, is the Wise "state what you are not" pattern applied to commercial terms.**

Two compound questions exist: `What happens when my subscription is about to expire or has expired?` (pairing the warning state with the failed state) and `Do the compute minutes increase depending on the number of users in the group, or the number of users in the subscription?` (pairing the two plausible wrong mental models and rejecting both). The second is the more interesting technique: enumerate the user's candidate misunderstandings inside the question so the single answer can dismiss them together.

**Defects in the FAQ itself** `[observed]`:

- `Frequentlyasked questions` — missing space in the H2
- The jump-link list has **10 entries for 11 sections**; `GitLab Flex` (12 questions, the largest section) has no jump link
- Jump label `GitLab.com` points to anchor `#gitlab-saas` — label and slug disagree
- `Selecting a section scrolls to that section within the FAQ block.` renders as **visible body text** above the jump links; reads like helper copy intended to be visually hidden
- One question (`Which Free namespaces can purchase a monthly commitment of GitLab Credits?`) lacks the permalink line every other answer carries
- Anchor slug `#what-are-the-per-project-storage-limits-on-gitLab` contains a stray capital L and is truncated relative to its question
- Anchor `#is-there-a-minimum-version-to-use-specific-capabilities` drops "supported" from the question text
- `How does GitLab determine what future features fall into given tiers?` refers the reader to "our pricing handbook page" and says "On this page we represent our pricing strategy" — but **contains no link**, and "On this page" ambiguously reads as the pricing page the user is on
- Three different minimum versions are cited for overlapping Duo Agent Platform claims: `18.8`, `18.9`, and `18.7`
- `500GiB` and `500 GiB` both appear, once within the same answer

## T13 Terminology & glossary

Pajamas maintains an explicit `Glossary` page (not harvested) and a mandated resolution order for terminology disputes `[documented]`:

> "To be consistent, follow style guidance in this order: For specific terms, use the technical writing **word list**. For component-specific guidance, use the **Pajamas page for each component**. For general guidance, use the technical writing **style guide**."

Plus: "Search the product for the term before creating a new term." and "If you do not see the term you need, open a merge request to add it, or contact a technical writer for assistance."

**A three-level precedence hierarchy with a named owning function (technical writers) and a contribution path (merge request).** This is governance, not guidance, and it is stronger than anything GitHub publishes — Primer defers to a staff-only guide, while GitLab's word list is public and editable.

| Term | GitLab's usage | Alternative rejected / note |
|---|---|---|
| `merge request` | The core unit of code review | **`pull request`** — GitLab's single most consequential terminology divergence. A different metaphor: GitHub asks the maintainer to *pull*; GitLab asks the system to *merge*. GitLab's is the more accurate description of what happens and the less accurate description of the social act |
| `pipeline` / `stage` / `job` | Three-level CI hierarchy | GitHub: `workflow` / `job` / `step`. GitLab's `stage` is a grouping of parallel jobs; GitHub's `step` is a sequential unit inside a job. **The two products use `job` for different-sized things** |
| `runner` | The compute agent | `agent` (reserved for AI), GitHub's `runner` (same word, convergent) |
| `compute minutes` | The CI metering unit | Formerly "CI minutes"; GitHub says `CI/CD minutes`. `compute` is broader and survives non-CI usage |
| `GitLab Credits` | Usage currency for AI and secrets features, `$1` each | **Described as "the currency that powers…"** — the metaphor is stated, not left implicit |
| `GitLab Flex` | One annual commitment reallocable across seats and credits | "Flex" as a commercial-instrument name |
| `reserved` vs `on-demand` | The two Flex usage modes, with a dedicated FAQ defining the difference | Cloud-infrastructure vocabulary imported into software licensing |
| `use-it-or-lose-it` | Applied to reserved credits | A colloquialism in contract terms |
| `Agentic Orchestration` | Nav label for the Duo Agent Platform | `AI features`. Note the marketing hero says `agentic software engineering` — **three "agentic" phrasings** (`Agentic Orchestration`, `agentic software engineering`, `Agentic AI` as a footer topic) |
| `Context Graph` | Nav label for GitLab Orbit | An unglossed coined term in primary navigation |
| `GitLab Orbit` | Product name behind `Context Graph` | Label and product name differ in the nav, so neither is learnable from the other |
| `GitLab Duo` | The AI product family, with `Duo Classic` as a retronym | `Duo Classic` appears in the comparison table (`AI Chat in the IDE (Duo Classic)`) — **a retronym shipped in a feature matrix**, disclosing a generational split in the AI product |
| `Root Cause Analysis` | The AI failure-explanation feature | GitHub's `Copilot Autofix`. Diagnosis vs remedy |
| `Promptlings` | A named brand illustration category in Pajamas | A coined internal term visible in the public design system |
| `Socks` | A Pajamas component name | Unexplained; the most opaque component name observed |
| `Blankslate` (GitHub) vs `GlEmptyState` / `Empty States` (GitLab) | GitLab names the component after the pattern | GitLab's is the more guessable |
| `Broadcast message` | Admin-authored instance-wide notice | Distinct from `Alert` and `Banner` |
| `canceling` / `canceled` | US single-l spelling in state tokens and UI labels | `cancelling` |
| `Self-Managed` / `GitLab Dedicated` / `GitLab.com` | The three deployment models, treated as first-class product names | "on-prem", "SaaS", "cloud" |
| `Dedicated for Government` | A named SKU | |
| `Enterprise Agile Planning` | The non-developer seat type, `$15/user/month` | "viewer seats", "stakeholder licences" |
| `guest users` | A role-based seat category with tier-dependent limits | |
| `top-level group` | The billing and quota boundary | "organisation", "workspace" |
| `namespace` | The container concept; `personal namespaces` excluded from credit commitments | |
| `hidden job` | A job disabled by a `.` name prefix | |
| `Activation Code` vs `license key` | Two generations of entitlement mechanism, both documented, with the older marked legacy since 2022 | **Documenting the superseded mechanism rather than deleting it** |
| `true-up` | Mid-term user reconciliation | Retained industry term, then explained |
| `Community Edition` / `Enterprise Edition` | The open-core split, surfaced in a non-renewal answer | |
| `stage group` | Internal org unit leaking into public Pajamas copy ("much like any other solution being developed in your stage group") | |
| `DRI` | Internal term in public Pajamas copy ("The Growth team is the DRI for…") | **Unexpanded internal acronym** in a public design system |
| `GitLab Duo Agent Platform` vs `Duo Agent Platform` vs `Agent Platform` | Three lengths observed (nav card alt text says `Agent Platform`) | |

**Register split by surface.** Marketing says `Agentic Orchestration` and `intelligent orchestration platform for DevSecOps`; docs say `Use CI/CD to build your application` and `Troubleshooting jobs`; Pajamas says `Invite member to configure`. The marketing register is abstract and vendor-coined; the docs register is concrete and task-named; the product register is short and imperative. The gradient is steep — steeper than GitHub's — and the marketing tier is the weakest of the three, because `Context Graph` and `Agentic Orchestration` are unglossed in the exact place a new visitor meets them.

**Terminology governance observed working.** The `allow` prohibition (T5) and the `pull request` / `merge request` divergence are both evidence of an enforced word list. Terminology governance observed failing: `Self Managed` / `Self-Managed`, `Compute Minutes` / `Compute minutes`, `Limited` / `Limited access`, `allowed` / `authorized`, `GitLab Credits` / `GitLab credits`, and three lengths of the Agent Platform name — all within the pricing page and the error strings.

## T14 Voice, tone & accessibility

**GitLab publishes its voice as a coworker persona** `[documented]`:

> "The copy for GitLab is clear and direct. We strike a balance between professional and friendly. We can empathize with users (such as celebrating completing all items on the To-Do List) while remaining respectful to the importance of their work. **We are a trusted, friendly, helpful, and understanding coworker.**"

Where GitHub publishes four antitheses (`Clear but not cold`), GitLab publishes a **relationship**. The coworker framing is more operational than it looks: it answers questions about register (peers, not service staff), about celebration (a coworker may say well done), and about restraint ("respectful to the importance of their work" — a coworker does not joke while your build is broken). And it names the one licensed celebration — clearing the To-Do List — which makes the permission bounded rather than general.

**Consistency outranks correctness, explicitly** `[documented]`:

> "If you're deciding between being consistent with other language on the same screen, or following the latest style guidance, **go with consistency.** A page that mixes phrasing is harder for users to parse and looks unprofessional. If the text on a page doesn't match the latest guidance, or is inconsistent, create a merge request or open an issue."

A design system telling writers to **violate its own current guidance in favour of local coherence**, and then routing the fix to a merge request. This is the most honest line in either GitLab's or GitHub's published content guidance, because it acknowledges that style guides evolve faster than products get retrofitted. It also gives a writer a defensible answer in review. (GitHub's Primer says the inverse-ish — "don't sacrifice clarity over consistency" — so the two systems have opposite tiebreakers, GitLab favouring consistency and GitHub favouring clarity.)

**Brevity is argued from cognitive load, not aesthetics** `[documented]`:

> "Users will skim content, rather than read text carefully… **A long message or label indicates a design that might need improvement.**"
> "When familiar with a web app, users rely on muscle memory and may read even less when moving quickly."
> "In general, text is burdensome and adds cognitive load. This load is even more pronounced in a powerful productivity tool such as GitLab. **We shouldn't rely on words to explain the purpose of a screen. Instead, the current navigation and composition of on-screen elements should get the user 95% there, with the remaining 5% being specific elements such as text.**"

The 95/5 formulation is a genuine position, and a contentious one: it subordinates copy to layout and treats verbosity as a **design smell** ("indicates a design that might need improvement"). A content designer can use it to escalate a copy problem into a design conversation.

Brevity is prioritised for four content types: "Headers, Button text, Field labels, Error messages."

**Specific word deletions, with do/don't pairs** `[documented]`: "eliminate unnecessary phrases like `in order to` and extra articles like `the` when they don't add clarity."

| Do | Don't |
|---|---|
| `To link Sentry to GitLab, enter your Sentry URL and Auth Token.` | `In order to link Sentry to GitLab, enter your Sentry URL and Auth Token.` |
| `Use this token to validate received payloads.` | `Use this token to validate the received payloads.` |

The second pair is unusually fine-grained — deleting a single definite article. Worth noting because article deletion is where brevity rules start to fight internationalisation and screen-reader fluency, and GitLab does not flag that tension.

**The brevity rule has a stated inverse** `[documented]`:

> "Sometimes an extra word or two are required for clarity. For example, if the context clearly refers to the object, you can use a verb or adjective by itself. **Example:** `Edit` or `Closed`. If the context isn't clear enough, use an object. **Example:** `Edit issue` or `Closed issues`."

A rule for *when to add words*, keyed to whether the surrounding context supplies the object. `Edit` in an issue header, `Edit issue` in a list. This is the correct resolution of the "short labels vs. accessible names" problem and it is stated as a decision procedure rather than a preference. (It also explains the docs breadcrumb leaf `Troubleshooting` noted in T1 — context supplies "jobs".)

**`Objective-focused` is the most distinctive rule** `[documented]`:

> "When users engage with our product, they're focused on getting tasks done, thinking first in terms of **the problem they're trying to solve**, and then how to solve it. Objective-focused content that starts with the task first and then offers the solution can make it easier for users to quickly find and understand the information they need."

| Do | Don't |
|---|---|
| `Monitor your errors by integrating with Sentry` | `Integrate with Sentry to monitor your errors` |
| `To see what's changed, choose a branch or enter a commit.` | `Choose a branch or enter a commit to see what's changed.` |

**Put the user's goal in the first clause and the mechanism in the second.** Both rejected versions are grammatical, clear, and identical in content — they lose purely on clause order. That is a rule about *information sequence*, which is rarer and more useful than a rule about word choice, and it scales to headings, tooltips, empty states, and instructional copy alike.

It also explains the docs IA (T1): `Use CI/CD to build your application` is the objective-focused form of "CI/CD". The style guide and the information architecture are the same idea at two scales.

Note the two Do examples disagree on punctuation — `Monitor your errors by integrating with Sentry` (no full stop, heading-like) versus `To see what's changed, choose a branch or enter a commit.` (full stop, sentence-like). Consistent with GitLab's punctuation conventions if the first is a heading, but the guidance does not say so.

**Capitalisation** `[documented]`: "Use sentence case for field labels and column headings. **Avoid title case.**" Widely violated on the marketing site (`Execution & Workflows`, `Security & Governance`, `Context & AI`, `Financial Services`, `Public Sector`, `Source Code Management & DevOps Workflows`, `License and Subscription`) — though Pajamas scopes the rule to "field labels and column headings", so marketing headings are arguably out of scope. The comparison-table category headings are not: `Source Code Management & DevOps Workflows` is a column-group heading in title case.

**Terminology cautions, with a screen-reader justification** `[documented]`: "Be extremely cautious when using jargon and colloquialisms. They can confuse new users and cause problems with internationalization." and "**Consider screen readers and their ability to interpret non-standard terminology.**"

Naming internationalisation *and* speech synthesis as reasons to avoid jargon — rather than just "clarity" — is the right pair of arguments, and it is the argument against `⚠️ Banner` in Pajamas's own nav.

**CTA rule is routed to accessibility** `[documented]`: "A call to action (CTA) should clearly communicate the result of that action. For more details, learn **how calls to action impact a screen reader user**." The CTA section of the content guide is three sentences long and delegates to the screen-reader page — the accessibility consequence is the primary argument for good CTA copy, not a secondary consideration.

**Accessibility content** `[observed]`

- `Skip to main content` on docs and Pajamas (`#skipTarget`). **No skip link observed on about.gitlab.com** — the marketing site lacks the affordance both other surfaces have. Defect.
- Pajamas ships a nine-page `Accessibility` section including `Statement of compliance`, `Inclusive design principles`, `Best practices`, and a **`GitLab accessibility conformance report`** (ACR) — a published VPAT-style artefact inside the design system rather than in a legal corner.
- A five-page `Evaluating accessibility` sub-tree: `Overview` · `Visual` · `Content and semantics` · `Keyboard-only` · `Focus management` · `Screen readers`. **`Content and semantics` as a named evaluation axis** means copy is auditable as an accessibility surface, with its own page.
- Form accessibility is specified at string level: "`aria-describedby` to programmatically associate a description with an input" and separately for help text; "The clear button should be implemented as a `<button>`, accessible via keyboard, and **its name announced as `Clear` for assistive technology.** After content is removed focus is placed back on the input." — the accessible name is prescribed as a literal string.
- Keyboard behaviour is documented with its exception: `Enter` submits from an input, but not from multi-line fields, and "if a form has a dropdown control that includes a search bar, pressing `Enter` inside the search bar should **not** submit the form. In general, this behavior should be disabled for input elements that do not directly edit a form's data."
- `Quick submit` is a named, documented shortcut: `⌘ + Enter` / `Ctrl + Enter` from any control including Markdown editors. Pajamas also has a `Keyboard shortcuts` pattern page.
- `invertInDarkMode` defaults to `true` on the empty-state illustration — dark-mode handling as a component default rather than a per-instance decision.
- Alt text on the homepage is **functional and moderately descriptive** but far shorter than GitHub's: "Product screenshot of GitLab Duo reviewing a merge request and giving suggestions for improvements" · "Product screenshot of the Vulnerability report dashboard, showing ranges of issue severities" · "Illustration of GitLab Flex routing a single annual commitment across seat-based licenses and usage-based credits". The third is the best — it describes the *argument* the diagram makes, not the shapes in it.
- Weaker alt on the same page: `Agent Platform` as the entire alt text for the lead pillar image (a bare product name, and a shorter one than the product's actual name), and every customer logo is `<name> logo` (acceptable, though `barclays logo` links to an empty `href=""`).
- Docs images carry descriptive alt: "A pipeline graph showing several stages and jobs, including three groups of grouped jobs." · "A pipeline graph showing a failed job and the failure-reason."
- Carousel instructions are rendered as visible text: "Use left and right arrow keys to navigate quotes. Swipe on touch devices. **Autoplay pauses on hover or focus.**" and "Use left and right arrow keys to navigate cards. Swipe on touch devices." Plus a position indicator, `Quote 1 of 5`. Disclosing the autoplay-pause behaviour is good practice; rendering the whole instruction as visible body copy is a debatable choice that GitLab makes consistently (see also the FAQ scroll hint).
- The customer-logo strip is **duplicated three times in the markup** (marquee implementation), tripling it for assistive technology. Defect.

**Negative findings, recorded honestly**

- Three competing hero formulations (H1 / `<title>` / meta) of one message
- `Learn more` appears bare in the homepage hero as the secondary CTA, with no object
- `Explore the Platform` (capital P) vs `Explore our platform` (lowercase) vs `View all Solutions` (capital S) vs `View all resources` (lowercase) — four menu-foot CTAs, inconsistent casing
- Four sales-contact labels site-wide: `Request a demo`, `Talk to sales`, `Contact sales`, `Book a demo`
- Three labels for the Ultimate contact action on one card: `Get custom pricing`, `Contact us for custom pricing`, `Contact us`
- Two labels for the comparison table: `Compare all features`, `Compare features by plan`
- `Self Managed` (tab) vs `Self-Managed` (everywhere else)
- `Compute Minutes` (add-on card) vs `Compute minutes` (table row, FAQ heading)
- `Limited` vs `Limited access` as apparently-equivalent table cell values
- `Source Code Management & DevOps Workflows` (`&`) beside `Security and Compliance` (`and`) in one category list
- `GitLab Credits` vs `GitLab credits` between card text and its own footnote
- Five variants of the tier-stacking formula (`Everything from Premium plus:` / `Everything from Premium, plus:` / …)
- Full stops on the two Dedicated taglines and not on the three tier taglines
- `500GiB` / `500 GiB` and `10GiB` / `10 GiB` inconsistencies, one pair inside a single FAQ answer
- `**` footnote declared with no referent row; `*` resolving to two different targets
- `Frequentlyasked questions` — missing space in the FAQ H2
- FAQ jump list covers 10 of 11 sections, omitting the largest; one label/slug mismatch; one missing permalink; two malformed anchor slugs
- `Selecting a section scrolls to that section within the FAQ block.` as visible body text
- Three different minimum GitLab versions cited for overlapping Duo capability claims (`18.7`, `18.8`, `18.9`)
- Free-tier `Get started` CTA points to `/-/trials/new` on the GitLab.com panel while the plan is described as `$ 0` / `No credit card required`
- `AI features can be accessed via the purchase of GitLab Credits add-on.` — missing article, passive, off-tone against its sibling cards
- Orphan `Let's talk` / `Get in touch to learn more` module inside the GitLab.com Premium card only
- Comparison rows (`Secret Detection`, `Compliance Frameworks`, `Guest Users`, `Model Context Protocol Integrations`) render with fewer cells than columns, so tier attribution is ambiguous from the served text
- `Guest Users` shown as `Limited access` in the table while the Ultimate card bullet says `Unlimited guest users` — **apparent contradiction between card and table**
- `Coming soon` rendered as a link inside a comparison cell
- `Only $15/user` — sales adverb inside a neutral comparison cell
- Event banner says `October 6` with no year, on a page whose footer says `© 2026`
- `barclays logo` links to an empty `href=""`; the logo strip is triplicated in markup
- No skip link observed on about.gitlab.com, present on docs and Pajamas
- `Solutions` nav facet named `Outcomes` contains only assessment forms
- Pajamas's own defects: `Label Name` in title case in a sentence-case-mandating page; `This field is required.` shipped as a sample string that its own error guidance rejects as too generic; the consistency example prescribes `3 characters` while its three rejected inputs all say `8`; `Primary Text`-style casing drift absent but a `Merge state` sample offers an invented four-state list; `DRI` and `stage group` used unexpanded in public copy; `⚠️` emoji inside two nav labels on a site that cautions about screen-reader interpretation
- Two published `TODO:` blocks admitting missing guidance (error-message persistence rules; `Higher tier feature` empty-state spec) — recorded as honest gaps rather than defects, and as a practice worth copying

---

## Transferable patterns

1. **Name the waiting state after what it is waiting for.** `waiting_for_resource`, `waiting_for_callback`, `preparing` — each token is self-documenting in a log or a badge without a legend. Compare `pending` / `waiting`, which need a table. Condition: only works where the number of blocking causes is small and stable; five is near the limit before the vocabulary becomes its own problem.
2. **When "cancel" isn't instant, name the interval and ship an override.** `canceling` ("Job is being canceled but `after_script` is running") → `canceled`, with `Force cancel` as a separately permissioned control and its consequences disclosed. Directly transferable to payment cancellations, refund reversals, subscription terminations, and any back-office job where "cancelled" currently means "we have begun cancelling". Condition: the override must disclose what it breaks, as GitLab's does.
3. **Make the timeout length encode the probability of success, and name the reason code.** 1 hour if no matching runner exists, 24 hours if one does — two thresholds, two `failure_reason` codes, one state. A user waiting is told, by the duration alone, whether the system thinks their job can still succeed. Applies to any queue where the system knows more than the user about eventual outcome.
4. **Two optional text slots with different positions and different jobs.** `Description` above the input explains *why the field exists*; `Help` below the input explains *how to fill it*. Most systems collapse both into one "hint text" and then argue about what goes in it. Condition: only pays off where forms are dense enough that the distinction is visible.
5. **Reserve `allow` for security, and convert grants into capabilities.** `Allows users to fork the repo` → `Users can fork the repo`. A single-word substitution that moves the sentence from the system's permission to the user's ability, and keeps the permission verb meaningful where it matters. One find-and-replace, real change in stance. Immediately applicable to settings, entitlements, and plan-comparison copy.
6. **Put the objective in the first clause and the mechanism in the second.** `Monitor your errors by integrating with Sentry`, not `Integrate with Sentry to monitor your errors`. A rule about clause order, not word choice, so it applies unchanged to headings, tooltips, empty-state titles, instructions, and nav labels. GitLab's own docs IA is this rule applied at the level of a sidebar.
7. **Offer "ask someone who can" as the default second action in a blocked empty state.** `Invite member to configure` — exact wording mandated, invite modal wired, and justified with evidence ("Invited users are more likely to activate new stages"). Turns a permissions dead end into a delegation. This is the single best idea in either design system harvested so far, and it transfers to every plan-gated, role-gated, or admin-gated empty state in an enterprise product.
8. **Declare eligibility before the first instruction, and re-declare it per section.** `Tier:` / `Offering:` at the top of every docs page, overridden mid-page where a fix requires self-hosting, plus `Prerequisites:` stated as conditions on the world ("The job must not be archived") rather than warnings to the reader. Ordering is eligibility → permission → procedure. Applies to any product with plan-gated or market-gated capability, which is to say most of PayPal's.
9. **Prefer local consistency over current guidance, and route the fix.** "If you're deciding between being consistent with other language on the same screen, or following the latest style guidance, go with consistency… create a merge request or open an issue." Gives a writer a defensible answer in review and converts a style violation into a tracked debt item instead of an argument.
10. **License `please` for inconvenience only.** Default is to strip `sorry` and `please` from errors; `please` is permitted "when the user has been inconvenienced" — and the guidance's own example (`Connection timed out. Please try again.`) demonstrates the exception. A conditional politeness rule beats a prohibition, because the prohibition gets broken in exactly the case where it should be.
11. **Familiar tone reads as careless in proportion to how stuck the user is.** "An overly familiar tone of voice can be perceived as careless in the context of error resolution, especially if the error can't be easily resolved by the user." Gives a tone gradient a variable — recoverability — rather than a rule. Pairs with GitLab's own inverse licence for empty states, which are permitted to be "friendly, supportive, and empathetic" because nothing is broken.
12. **Bound an error string on both sides.** `Display name is required` beats `Field is empty` for specificity *and* beats `Your display name can't be blank` for succinctness. Showing both failure directions in one example is more instructive than the usual vague-to-specific arrow.
13. **Publish the infrastructure dependency map on the status page.** Every GitLab component carries its provider (`Google Compute Engine`, `AWS`, `Zendesk`, `Digital Ocean`), so a user can see that their support ticket system is a third party. Condition: only advisable where you are willing to be judged on your vendors; the payoff is that an upstream outage is legible rather than mysterious.
14. **Ask the adverse question in the customer's own voice.** `Can I convert my GitLab Flex commitment back to cash if I don't use it all?` — published under the section promoting Flex, answer no. Four of twelve Flex questions have unfavourable answers. The Wise "state what you are not" pattern applied to commercial terms.
15. **Deny the specific fear in a short flat sentence.** "No charge will be made and no money will transfer." Six words, after naming the friction, the abuse that caused it, and the exact mechanism. The template for any pre-authorisation, hold, verification charge, or micro-deposit disclosure.
16. **Publish the gap.** Two `TODO:` blocks in Pajamas admit that guidance on error-message persistence and on higher-tier empty states does not exist yet, each with a pre-filled issue link. A design system that marks its own holes is more trustworthy than one that reads as complete, and the pre-filled link makes filling the hole cheaper than complaining about it.

## Caveats & gaps

- **All in-product strings are `[documented]`, not `[observed]`.** Job statuses, job sources, failure reasons, validation messages, empty states, and toasts come from docs and from Pajamas describing the UI. GitHub's harvest surfaced one case where the API token and the rendered label differ (`inactive` → `destroyed`); GitLab discloses no such divergence, but the harvest cannot confirm there is none. Re-verify any T5/T6/T8/T9 string in an authenticated pass before using it as precedent.
- **Error strings are quoted from a troubleshooting page, not seen in situ.** The docs quote message text but rarely the full UI treatment. One exception is noted (`You are not authorized to run this manual job` appears "with **Run** disabled"), which suggests the others also have control-state context that was not documented.
- **Pajamas pages not harvested that would materially improve this file:** `Choosing a messaging pattern`, `Notifications`, `Saving and feedback`, `Destructive actions`, `Alert`, `Toast`, `Broadcast message`, `Badge`, `Label`, `Modal`, `Merge request reports`, and the four `Content` pages other than `UI text` (`Verb tenses`, `Punctuation`, `Date and time`). T9 is thin as a direct consequence, and `Verb tenses` and `Punctuation` almost certainly contain the rules that would resolve several defects recorded above.
- **The technical-writing word list and style guide were not harvested.** Pajamas names them as the *first* authority for terminology (ahead of Pajamas itself) and they live at `docs.gitlab.com/ee/development/documentation/styleguide/`. This is the single largest gap in the file: GitLab's real terminology governance is in a document this harvest did not open. T13 is therefore an inventory of observed terms rather than a reading of the governing list.
- **Pajamas `Glossary`, `Principles`, and `Philosophy` pages not harvested**, nor `Brand voice` or `Style and formatting` under the Brand tree — so the marketing-side voice standard is unexamined and the T2/T14 marketing observations are unmeasured against it.
- **Pipeline statuses were not harvested separately from job statuses.** GitLab documents job statuses on `/ci/jobs/`; pipeline-level statuses (which are related but not identical, and include `blocked` and `warning` states referenced obliquely) live on `/ci/pipelines/` and were not opened. The T6 status vocabulary is therefore job-complete and pipeline-incomplete.
- **Merge request state vocabulary is largely unharvested.** `Merge state` appeared only as an invented sample in a Pajamas code block (`Open` / `Resolved` / `Closed` / `Blocked`), which is explicitly *not* evidence of real MR states. The Pajamas `Merge request` object page and `Merge request reports` pattern were not opened. Given that `merge request` is GitLab's signature term, this is a notable hole.
- **Git-level and push-level error messages** (`remote:` rejections, push-rule denials, secret-detection blocks) were not harvested; only CI/CD job errors and one permission error family.
- **Trust Center and AI Transparency Center not fetched.** Both are named in the footer as distinct destinations and would carry the compliance and AI-governance disclosure copy that T10 currently covers only from marketing and pricing surfaces.
- **Support portal, Customer portal, and the forum were not harvested.** T11 is therefore reconstructed from docs footers and nav routing only; GitLab's actual help-centre category tree and article-title grammar (in Zendesk) are unexamined. The finding that GitLab ships no "was this helpful?" widget applies to docs and may not hold on the support portal.
- **Pricing page was read via a delegated extraction of a saved fetch**, not read directly in this context. Verbatim strings in T10 and T12 are reported at one remove; the run-together strings noted (`per GitLab Credit Billing varies by plan*`, `Available for PremiumAvailable for Ultimate`) may be extraction artefacts of adjacent inline elements rather than genuine copy defects, and should be confirmed visually before being cited as defects. The column-shift ambiguities in the comparison table likewise need a visual check.
- **Marketing site is Contentful/YAML-driven and A/B-tested** (the page exposes its own source file, `content/en-us/index.yml`). Hero copy, pillar order, and metric selection may differ between sessions; strings here are one render on one date.
- **en-US only.** Seven locales are offered; none inspected. GitLab's brevity rules (article deletion in particular) have internationalisation consequences the guidance does not discuss, and a localised pass would test them.
- **Status page showed all components operational with no incident history on the landing page**, so GitLab's incident-communication vocabulary — the direct analogue of the richest GitHub finding — is **unharvested**. `status.gitlab.com/pages/history/...` would supply it. This is the most consequential single gap for T6/T9 comparability with product 021.

## Sources

1. https://about.gitlab.com/
2. https://about.gitlab.com/pricing/
3. https://docs.gitlab.com/
4. https://docs.gitlab.com/ci/jobs/
5. https://docs.gitlab.com/ci/jobs/job_troubleshooting/
6. https://status.gitlab.com/
7. https://design.gitlab.com/patterns/forms/
8. https://design.gitlab.com/content/ui-text/
9. https://design.gitlab.com/patterns/empty-states/
10. https://design.gitlab.com/objects/job/
