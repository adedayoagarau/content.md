# 029. Sentry

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Error monitoring and APM — error tracking, tracing, session replay, profiling, logs, uptime and cron monitoring, AI-assisted debugging |
| Primary URL | https://sentry.io/ (marketing served from `/welcome/`) |
| Corpus rank | 029 |
| Benchmark strength (source list) | Issue triage and diagnostic content |
| Locale / market observed | en-US (`og:locale: en_US`; no locale switcher found) |
| Platform observed | Web (marketing), docs (`docs.sentry.io`, every page available as `.md`), Intercom-hosted help centre (`sentry.help`), Statuspage status page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2, ISO 27001, HIPAA Security with BAA available (Enterprise tier), PII management and data scrubbing as product features, US/EU data residency election at organization level, `Relay` as a self-hosted PII-scrubbing proxy. Compliance capabilities are **tier-gated** and listed as pricing rows. |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial — (a) the help centre's three collections hold 785 articles between them and **no article titles were retrieved**, so T11 is structural only; (b) `sentry.io/security/` and `sentry.io/trust/` were not fetched, so T10's compliance detail comes from pricing rows rather than a trust page; (c) all in-product UI is behind auth, though Sentry publishes an unauthenticated sandbox (`sandbox.sentry.io`) that was not entered. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://sentry.io/welcome/ | Hero, four capability cards, two tabbed feature sets, 23-framework install switcher, closing CTA |
| Pricing | https://sentry.io/pricing/ | Four lowercase tiers, ~50-row comparison table, live cost calculator with per-volume error rates |
| Docs index | https://docs.sentry.io/ | Full product map; **`Instructions for AI Coding Assistants`** section |
| **Issues** | https://docs.sentry.io/product/issues/ | Five issue categories, five triage tabs, six sort modes |
| **Issue Status** | https://docs.sentry.io/product/issues/states-triage.md | The six-status table with query syntax — highest-value page in this file |
| **Issue Priority** | https://docs.sentry.io/product/issues/issue-priority.md | The orthogonal High/Medium/Low axis and its derivation from log level |
| Issue Details | https://docs.sentry.io/product/issues/issue-details.md | Diagnostic-section inventory: stack trace, suspect commits, breadcrumbs, trace preview, event highlights |
| Notifications | https://docs.sentry.io/product/notifications.md | Four notification classes, subscribe/unsubscribe triggers, spend thresholds |
| Status page | https://status.sentry.io/ | ~45 components by region and data type; four live incidents with full update chains |
| Help centre | https://help.sentry.io/ → https://www.sentry.help/en | Three collections with article counts and scope lines |

---

## T1 Navigation & IA labels `[observed]`

### Marketing nav — `Platform` holds four sub-groups, one of which is a product family

`Platform` → `Products` · `Seer` (rendered `AI Debugging` in the mobile variant) · `Integrations`
then `Solutions` · `Resources` · `Docs` · `Pricing`

**Defect, and an instructive one:** the same nav group is labelled `Seer` in the desktop rendering and `AI Debugging` in the mobile rendering, on the same page, in the same DOM. One is the brand name, the other is the category. Sentry has not decided whether to lead with the coined name or the plain description, and ships both.

`Products` — eleven entries, nine of which are `<Noun> Monitoring` or a bare capability noun:
`Error Monitoring` · `Logs` · `Session Replay` · `Metrics NEW` · `Tracing` · `Agent Tracing` · `Profiling` · `Size Analysis` · `Cron Monitoring` · `Uptime Monitoring` · `Labs NEW`

The `NEW` badge is appended directly to the label with no separator (`Metrics NEW`, `Labs NEW`, `Seer NEW`), which is a small accessibility defect (see T14) but a clear convention.

`Seer` sub-group: `Seer NEW` · `Agent` · `Autofix` · `AI Code Review`. Note `Agent` as a bare one-word product name inside a nav that also contains `Agent Tracing` (a different product, for tracing *the customer's* agents). Two `Agent` meanings, two nav entries, adjacent. Same collision as Postman's.

`Solutions` — twelve entries mixing three axes: **discipline** (`Web / Full Stack Development`, `Mobile Crash Reporting`, `Game Crash Reporting`), **category** (`AI Observability`, `Application Performance Monitoring`, `Application Observability`, `Real User Monitoring`), **industry** (`Ecommerce`), **standard** (`OpenTelemetry`), and **company size** (`Enterprise`, `Startups`). Five different segmentation logics in one flat list, which is what happens when a solutions menu accretes rather than being designed.

`Resources` → three named groups, and the third is the finding:
- `Learn`: `Blog` · `Changelog` · `Sandbox` · `Resources` · `Syntax` · `Customers` · `Cookbook`
- `Support`: `Contact Us` · `Help Center` · `Status`
- **`Hang out with us`**: `Community` · `Events` · `Merch`

`Hang out with us` is a nav group header written as an invitation in the first person plural. It holds no product, no documentation, and no support — it is purely social, and Sentry gives it equal structural weight with `Support`. The register shift mid-menu is deliberate and it is the clearest signal of Sentry's voice inside the IA itself.

`Sandbox` in the `Learn` group points to `sandbox.sentry.io` — a fully populated, unauthenticated demo instance. Offering the product itself as a documentation resource, from the resources menu, is worth noting.

### Docs IA — product walkthroughs named by the object, with a one-line description each

The docs index is organised into ten top-level sections: `Platforms` · `Frameworks` · `Sentry for AI` · `Account Settings` · `Get Started` · `Organization Settings` · `Product Walkthroughs` · `Pricing & Billing` · `Sentry CLI` · `API Reference` · `Security, Legal, & PII` · `Concepts & Reference` · `Integrations` · `Agent Plugin` · `About Sentry Docs`.

`Product Walkthroughs` is the largest and every entry is `<Noun>: <one-sentence scope>`. The scope lines are unusually good because they state the **user's purpose**, not the feature's mechanism:

| Entry | Scope line (verbatim, abridged to the purposive clause) |
|---|---|
| `Issues` | "…where you can see and start to debug errors and performance problems that are affecting your application." |
| `Session Replay` | "Watch video-like reproductions of real user sessions to debug errors, slow transactions, and user frustration **without guesswork**." |
| `Releases` | "…to determine regressions and resolve issues faster." |
| `Monitors and Alerts` | "Use Monitors to **decide when problems become issues**, and Alerts to notify, ticket, and automate next steps when those issues match your rules." |
| `Relay` | "Learn more about Relay, Sentry's data security solution." |

The `Monitors and Alerts` line is the best scope sentence in this batch. **"decide when problems become issues"** defines the boundary between two of Sentry's own nouns in five words, and then assigns the second tool to what happens after that boundary is crossed. A reader who has never used Sentry now understands the division of labour between two products from one clause.

Note also `Getting Started With Sentry` is scoped as "Set up Sentry and configure the key features that help you find and fix problems faster" — the docs' own framing of onboarding is *set up plus configure*, two verbs, not "learn".

`Security, Legal, & PII` as a top-level docs section name — three concerns joined, with `PII` promoted to the heading rather than buried under security. For a product that ingests application data including whatever the customer's users typed, putting PII in the section name is correct.

### Footer — four groupings, and the support one is named as a user need

`Company` · `Platform` · `Solutions` · **`Get Help`**

`Get Help` rather than `Support` or `Resources`: `Docs` · `Help Center` · `Status` · `Cookbook` · `Dev Resources`. A verb phrase naming the user's state, consistent with the `Hang out with us` choice above. Sentry names nav groups after what the reader is trying to do, in the reader's own words, at least twice.

### Help-centre IA — three collections, with article counts exposed

| Collection | Scope line (verbatim) | Count |
|---|---|---|
| `Product Features` | "Learn sh*t. Find out how to triage errors and performance issues." | 382 articles |
| `Account & Billing` | "Answers to all the important things in life: quotas, customization, and 2FA & SSO." | 260 articles |
| `SDKs` | "Whatever platform you use, we support it. Learn how to configure it." | 143 articles |

Three collections, 785 articles, and **all three scope lines are jokes**. `Learn sh*t.` is masked profanity in a help-centre category description — the single most register-distinctive string in this entire batch (see T14). `Answers to all the important things in life` is deadpan overstatement applied to 2FA configuration. `Whatever platform you use, we support it` is a claim delivered as a shrug.

Publishing the article count per collection is good practice regardless of tone: a reader choosing between three collections learns which is deep and which is thin before clicking.

## T2 Value proposition & headline patterns `[observed]`

### Hero — a two-clause imperative and a deliberately deflating subhead

> `Code breaks, fix it faster`
> "Application monitoring software considered  "not bad" by millions of developers."

The headline is four words with a comma splice: a **concession** (`Code breaks`) followed by an **imperative** (`fix it faster`). It refuses the usual promise structure — Sentry does not claim to prevent breakage, it concedes breakage as a premise and sells the recovery time. For an error-monitoring product this is the only honest headline available, and most competitors still write "ship with confidence".

The subhead is the finding. **`considered "not bad" by millions of developers`** is anti-marketing: the quoted phrase is faint praise, the quotation marks make it a quoted verdict rather than a claim, and `millions` is the only conventional boast in the sentence, immediately undercut by what those millions supposedly said. This is a register decision with real strategic content — it signals in-group developer scepticism toward vendor copy, and it makes the surrounding specific claims more credible by contrast.

(Note a **double space** before the opening quotation mark in the rendered subhead. A typographic defect in the single most-read string on the site.)

### Section headers are short, punctuated, and several are slang

`Developer first. Always.` · `Everything's connected` · `Debugging needs context—with or without AI` ·
`Loved by developers worldwide` · `Get started in minutes` ·
`Built to be secure, Designed to not get in your way` · `Fix It`

`Developer first. Always.` — three words, two full stops, a positioning statement as a two-beat fragment. `Fix It` is the closing section header on both the homepage and the pricing page — a two-word imperative with an odd capital `I`, used as the site's terminal call.

`Built to be secure, Designed to not get in your way` has a **comma splice joining two capitalised participial phrases** — a defect, and a visible one on a security section header.

### Capability cards — four headings, two of them slang

`Monitor in five lines` — "Drop in the SDK. No agents to install. No performance surprises."
`Automatically root-cause any issue` — routes to Seer
**`Babysit the bots`** — "Agent tracing helps you catch unexpected output issues, bad tool calls and visualize the spend and performance across all your agents."
`Stay in the flow` — GitHub, Slack, Jira, Linear, MCP

**`Babysit the bots`** is the standout. It names AI-agent observability with a phrase that is faintly contemptuous of the agents and sympathetic to the engineer who has to watch them. Three words, alliterative, and it encodes an attitude toward the technology that the rest of the industry's copy ("orchestrate your AI workforce") carefully avoids.

`Monitor in five lines` is the counter-example of good specificity: a claim with a number, restated twice more on the page (`Get started in minutes` → "Five lines of code. That's it."), and then *demonstrated* by the install switcher, which for most of its 23 frameworks shows literally one command.

The `Monitor in five lines` body is three fragments, two of them negations: "Drop in the SDK. No agents to install. No performance surprises." **Naming the two fears (an agent to install, a performance cost) and denying each in three words** is tighter than any positive claim would be.

### The argument-by-shrug construction

> `Everything's connected`
> "Yeah, other tools exist. But errors, logs, replays, spans, profiles, and metrics — all connected by the same trace? That's kind of our thing."

Three moves: **concede the competition** ("Yeah, other tools exist"), **state the differentiator as a rhetorical question**, **claim it with deliberate understatement** ("That's kind of our thing"). The whole paragraph is 27 words and contains no adjective of praise. It is the same rhetorical strategy as the hero subhead — win credibility by declining to boast — and Sentry applies it consistently enough that it reads as a house style rather than a one-off.

The same voice appears in feature descriptions: "Catch slow queries, N+1s, and request timeouts **before the 'why is this so slow?' posts fill up your feed.**" — the consequence of *not* using the product is named as social embarrassment on an internal channel, which is a more vivid stake than "improve performance". And Seer's code review is "Stops bad code before it starts bad days."

### Pricing headline and tier naming

> `Pricing plans for dev teams of all sizes`

Tiers, and this is a deliberate typographic choice: **`developer` · `team` · `business` · `enterprise` — all lower case**, as are the CTAs `start trial` and `contact sales`. The comparison-table section headers are also lower case: `monitoring & troubleshooting` · `workflow & alerts` · `reporting & search` · `integrations` · `account & data management` · `admin & compliance` · `support`.

Lower-casing plan names de-emphasises them relative to the feature content, and it reads as terminal-adjacent. It is a consistent system — but note the closing block reverts to `## Enterprise` with a capital, and the calculator's tier selector reads `Team` / `Business` capitalised. **Three casings for the plan names across one page.**

Tier qualifiers are `For <who> <doing what>`:
`For solo devs working on small projects` · `Everything to monitor your application as it scales` · `For teams that need more powerful debugging` · `Let's talk and see how we can serve you best.`

The `business` qualifier is the honest one: not "for enterprises" but **"for teams that need more powerful debugging"** — sold on capability depth, not headcount. And the enterprise qualifier is a sentence of dialogue rather than a description.

## T3 CTA inventory `[observed]`

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Started` | Nav (every page), hero | Primary |
| `Get Demo` | Nav, hero | Paired with `Get Started` in both placements |
| `Sign In` | Nav | |
| `Try Sentry for Free` | `Fix It` closing block, homepage and pricing | **Fourth label** for the signup destination |
| `Get a Demo` | `Fix It` closing block | **`Get Demo`** in nav vs **`Get a Demo`** in the footer block — one article's difference, two labels |
| `start trial` | Pricing, all three paid-visible tiers | Lower case; used even on the `developer` tier, which is `$0` and has no trial to start |
| `Start Trial` | Pricing calculator | Title case — third casing of the same action on one page |
| `contact sales` / `Contact Sales` | Pricing, enterprise | Both casings, same page, both linking to `/demo/` |
| `Contact Us` | Nav `Support` group, footer | |
| `Explore Cookbook` | Nav promo card | |
| `See pricing` | Pricing, two feature rows | Inline, routes to docs pricing |
| `Check out our Privacy Policy` | Homepage security block | Conversational CTA for a legal document |
| `Sign Up` | Newsletter form | |
| `Skip to main content` | Both marketing pages | |
| `Subscribe to Updates` / `Subscribe` | Status page | Rendered `Subscribe to UpdatesSubscribe` |
| `Subscribe via Slack` · `Change number` · `Resend OTP` | Status subscription | |
| `View historical uptime.` | Status page | Terminal full stop inside the link |
| `← Incident History` | Status page | |
| `Search for articles...` | Help centre | Search placeholder with ellipsis |
| `Email Support` | Help centre | The only escalation CTA on the help centre |
| `Share Issue` · `View More Events` · `All Tags` · `View All` · `Edit` | In-product, documented | See below |
| `Archive` · `Resolve` · `Delete` · **`Delete and Discard Forever`** | In-product triage actions, documented | See T7 |
| `Saved Searches` | In-product, documented | |

**Observations.** Four labels for signup (`Get Started`, `Try Sentry for Free`, `start trial`, `Start Trial`) and two for demo (`Get Demo`, `Get a Demo`), with three casings across the pricing page alone. Sentry's CTA hygiene is the weakest of the five products in this batch.

Against that, the **in-product action labels are excellent** and are the reason this product is in the corpus. `Delete and Discard Forever` is a four-word label that distinguishes itself from plain `Delete` by naming both the immediate act and its permanence, with `Forever` doing the irreversibility warning inside the label rather than in a confirmation dialog. `Share Issue` offers "what kind of link you want to share such as including the event ID or copying the link as Markdown" — **`copy the link as Markdown`** is a share option designed for the destination (a PR description, a Slack message, a Jira ticket) rather than for the clipboard.

`start trial` appearing on the `$0` `developer` tier is a straightforward defect: there is nothing to trial, and the link URL (`?plan=am1_f&period=annual`, no `trial` parameter) confirms it goes to plain signup.

## T4 Onboarding & getting-started `[observed]`

### The claim is a number, and the number is demonstrated 23 times

> `Get started in minutes`
> "Five lines of code. That's it. No complex setup, no performance hits, no waiting around."

Three negations again (`No complex setup, no performance hits, no waiting around`), and the claim is `Five lines`, stated twice on the page.

Beneath it sits a **23-framework switcher** — `Next.js`, `Angular`, `Android`, `iOS`, `Flutter`, `React Native`, `.NET MAUI`, `Python`, `Node.js`, `React`, `.NET`, `Go`, `Swift`, `Ruby`, `PHP`, `Laravel`, `ASP.NET Core`, `Spring Boot`, `Vue`, `Solid`, `Svelte`, `Astro`, `JavaScript` — each showing real install code. This is the demonstration of the claim rather than a restatement of it, and for several frameworks the code is genuinely one line:

`npx @sentry/wizard@latest -i nextjs` · `npx astro add @sentry/astro` · `brew install getsentry/tools/sentry-wizard && sentry-wizard -i android`

**The per-framework intro sentences vary, and the variation is a defect worth recording.** Twelve distinct lead-ins for one concept:

`See -- it's really just one command.` (Next.js — note the **double hyphen** where an em-dash belongs) ·
`Get started with just one line of code:` (Angular) ·
`Just run this command to sign up for and install Sentry.` (Android) ·
`Signup and install Sentry with just one line of code:` (iOS — `Signup` as a verb) ·
`Sign-up and install Sentry with just one line of code:` (Flutter — `Sign-up` hyphenated) ·
`Install Sentry with one line of code:` (React Native) ·
`Grab the Sentry Python SDK:` · `Grab the Sentry Node SDK:` · `Grab the Sentry Go SDK:` (three platforms) ·
`Configure your DSN:` (five platforms) ·
`Just run this command to install and register Sentry's Astro integration.` (Astro)

So within six adjacent tabs the same instruction is written as `Signup and install`, `Sign-up and install`, and `sign up for and install` — **three spellings of "sign up" in three consecutive tabs.** Sentry's own word list (if one existed) would catch this; the framework switcher is evidently maintained per-platform with no shared string.

`Grab the Sentry Python SDK` is the best of the set — `Grab` is casual, active, and consistent with the house voice, and it is used on exactly three of 23 tabs.

### The `wizard` as an onboarding content artefact

`npx @sentry/wizard@latest -i nextjs` — the setup tool is named `wizard` and invoked with `-i` (install). Sentry's onboarding content strategy is to **replace documentation with a program**: the copy's job is only to get you to run one command, after which the wizard does the platform detection, DSN insertion, and config writing that a written quickstart would otherwise have to specify. The homepage copy is therefore short *because* the tool is doing the teaching.

### Onboarding addressed to AI coding assistants — a full section with prohibitions

The docs index carries a section headed **`Instructions for AI Coding Assistants`**, opening "When helping a developer set up or use Sentry, follow these guidelines". Eight bulleted directives, and three of them are notable as content:

> - **"Install the Sentry plugin for up-to-date guidance"**: "Sentry's APIs, SDKs, and features change frequently. **Do not rely on training data for Sentry setup or configuration.**"
> - **"SDK versions"**: "Always check the package registry (npm, PyPI, RubyGems, etc.) for the latest Sentry SDK version. **Do not rely on memorized version numbers from training data.**"
> - **"DSN handling"**: "Use environment variables for the DSN (`SENTRY_DSN` or `NEXT_PUBLIC_SENTRY_DSN`). **Never hardcode DSN strings in source code.**"
> - **"Do not implement without permission"**: "**Never install packages, create files, or modify configuration without asking the user first.**"
> - **"Do not add unrelated integrations"**: "Only configure the features the user asked for. Check before enabling additional integrations."
> - **"Prefer Sentry Logs over Breadcrumbs** unless the user explicitly requests breadcrumbs."

Compare Stripe (file 026), whose agent-directed docs tell the agent what to *recommend* to its user. Sentry's go further in one specific direction: **two of the eight directives constrain the agent's autonomy on the user's behalf** — do not act without asking, do not enable things the user did not request. Sentry is writing consent and scope-limitation rules into its reference documentation, addressed to a non-human reader, protecting a human who will never read them.

Whether or not an agent obeys, this is a genuinely new content-design artefact: **a permissions policy written as documentation prose.** It is also the most responsible version of agent-directed docs found in this batch, and the pattern transfers immediately to any vendor writing for coding assistants.

Two supporting surfaces are named: `npx @sentry/agent-plugin install` ("detects the assistants on the machine and sets up the plugin in each" — Claude Code, Cursor, Codex, Grok) and a skill library at `skills.sentry.dev` with three named shelves (`SDK Setup`, `Workflows`, `Features`). And a plain-language definition of the plugin's purpose: "It teaches the assistant step-by-step SDK setup, debugging workflows, and feature configuration."

### Progressive disclosure via `Sandbox` and `Cookbook`

Two named pre-signup surfaces sit in the nav:
- `Sandbox` (`sandbox.sentry.io`) — a populated live demo, linked from the docs body too: "you can think of an [issue](https://sandbox.sentry.io/?scenario=oneIssue&projectSlug=react) as a single bug or problem with your app." **The docs link a concept definition to a live example of that concept**, with a scenario parameter.
- `Cookbook` — "Step-by-step recipes for debugging, monitoring, and fixing issues with Sentry", scoped in docs as "Step-by-step recipes for real Sentry workflows: instrument agents, debug with MCP, triage from Slack, and more."

`Cookbook` / `recipes` as the naming for task-oriented content, distinct from `Guides` ("Practical guidance on what to instrument, what to query, and how to get value from Sentry **after setup**"). Two post-onboarding content types with a stated boundary between them.

## T5 Form & field labels `[observed] / [documented]`

Sentry has no substantial pre-auth form beyond the newsletter and the Statuspage subscription flow.

**Newsletter** `[observed]`:
- `Your Email:` — trailing colon, possessive determiner
- Consent checkbox: "I want to receive the monthly newsletter and other updates from Sentry. You may unsubscribe at any time." — **first-person opt-in** (`I want to receive`) followed by second-person reassurance (`You may unsubscribe`). Person switches mid-string, deliberately: the user asserts the wish, Sentry grants the exit.
- "By filling out this form, you agree to our privacy policy. This form is protected by reCAPTCHA…"
- Section heading: `Get monthly product updatesfrom our newsletter` — **missing space** between `updates` and `from`, a concatenation defect in the heading.

**Status-page subscription** — identical Statuspage template to Twilio's and Postman's, including the same defects: `Email address:` · `Enter OTP:` · `Resend OTP in:  seconds` (**double space, empty interpolation**) · `Didn't receive the OTP? Resend OTP` · `Country code:` · `Phone number:` · `Change number` · `Webhook URL:` with hint `The URL we should send the webhooks to` · optional `Email address:` with hint `We'll send you email if your endpoint fails` · `Message and data rates may apply.`

**Pricing calculator** `[observed]` — the richest interactive labelling found:

`Paid Plan Tier` (`Team` / `Business`) · `Payment Frequency` (`Annual` / `Monthly`) · `Configure` · `Summary ($26.00/mo)`

Eleven metered dimensions, each a slider with a unit-bearing label:
`Errors` · `Logs` · `App Metrics` · `Replays` · `Spans` · `Cron` · `Uptime` · `Attachments` · `Cont. profile hrs` · `UI profile hrs` · `Seer`

And in the expanded list the same eleven are spelled out in full: `Application Metrics`, `Cron monitors`, `Uptime monitors`, `Continuous profile hours`, `UI profile hours`, `Seer: AI Debugging Agent`. **Two label sets for one control group — abbreviated in the tab rail, full in the list.** That is the correct pattern (abbreviate where space is tight, expand where it is not) and it is applied consistently.

Each dimension carries a **one-sentence definition of the billable unit**, which is the disclosure that matters:
> `Errors` — "Errors are sent every time an SDK catches a bug."

Then the included allowance (`50K/mo included`), the slider bounds (`50K` to `1B`), and a per-volume rate table. See T10.

**Documented in-product field and control vocabulary** `[documented]`:
`Saved Searches` · `Event Highlights` · `All Tags` · `View All` · `View More Events` · `Share Issue` ·
tag category tabs `All` / `Custom` / `Application` / `Other` ·
event navigation `Recommended` / `latest` / `oldest` / `Current` ·
`Activity` tab · `Spend Notifications` · `Manage Spend Notifications` ·
`Subscription Consumption` · `Pay-as-you-go Consumption` ·
`Claim Unassigned Issues I've Resolved` (a notification-setting label written as a first-person sentence)

`Claim Unassigned Issues I've Resolved` is worth isolating: a settings toggle whose label is a **first-person relative clause describing the user's own past action**. Most settings are named after the system behaviour they enable; this one is named after the user's behaviour that triggers it. It reads as a sentence the user would say, and the setting's effect (you get notified about those issues) is left implicit because the label already tells you which issues it means.

## T6 Status & state language `[observed]` — the headline category

### Six issue statuses, each with its query syntax, and exactly one at a time

The constraint is stated before the table: **"Keep in mind that an issue can only have one status at a time."**

| Status | Condition (verbatim) | Custom Search Term |
|---|---|---|
| `New` | "An issue that was created in the last 7 days." | `is:new` |
| `Ongoing` | "An issue that was created more than 7 days ago or has manually been marked as reviewed." | `is:ongoing` |
| `Escalating` | "An issue that's exceeded its forecasted event volume." | `is:escalating` |
| `Regressed` | "A resolved issue that's come up again." | `is:regressed` |
| `Archived` | "An issue that's been marked as archived." | `is:archived` |
| `Resolved` | "An issue that's been marked as fixed." | `is:resolved` |

**Four things here are individually transferable and together make this the best state model in the batch.**

**(a) Every status ships with its query string.** The docs table's third column is `Custom Search Term`, and it gives `is:new`, `is:ongoing`, and so on. The status is simultaneously a **badge the user reads**, a **filter the user types**, and a **stable API value**. There is no translation layer, no mapping table, no "the Dashboard calls this X and the API calls it Y" reconciliation of the kind Stripe has to publish. The word on the badge is the word in the search bar.

This is only possible because the status names are single lower-cased-able words. It is a content decision with an architectural consequence, and it is the reason Sentry's triage vocabulary is learnable in one sitting.

**(b) `Ongoing` solves a problem most products leave unsolved.** The awkward state in any inbox-shaped product is "not new, not resolved, not ignored — just still there." Most systems have no name for it and default to `Open` or `Unresolved`, which lumps a three-minute-old crash with a nine-month-old known annoyance. Sentry names it `Ongoing` and gives it a **dual entry condition**: seven days elapsed *or* manually reviewed. So a status can be reached either by the passage of time or by a human act, and the name is true in both cases. `Ongoing` is neutral, non-judgemental, and accurate — it asserts nothing about severity, only about duration.

**(c) `Escalating` is a state produced by a forecast, and the docs say so.** "An issue that's exceeded its **forecasted** event volume." Sentry predicts how much noise an archived issue should make, and promotes it when it exceeds the prediction. The status name encodes the *direction of change* rather than a threshold crossing, which is why it reads as urgent without using the word "critical". There is a dedicated `Escalating Issues Algorithm` page for the derivation.

And the docs immediately bound the feature: "Please note that escalating issues currently does not work for merged/unmerged issues." **A limitation stated inside the status definition**, in the same table cell — not in a footnote, not in a known-issues page.

**(d) `Regressed` is a first-class status, not an event.** "A resolved issue that's come up again." Most trackers reopen a ticket and lose the fact that it was ever closed. Sentry gives the return trip its own name and its own query, which means "things we thought we fixed and didn't" is a browsable list. That is a distinct and valuable triage population.

The default filter is stated explicitly: "By default, the list on the **Issues** page is narrowed down to unresolved issues, with `New`, `Ongoing`, `Escalating`, and `Regressed` status." So `unresolved` is a **derived superset** of four statuses rather than a seventh status — a composition the docs name rather than leave implicit.

### Priority is a second, orthogonal axis — and its derivation is published

`High` · `Medium` · `Low`, described as "three discrete priority levels", each defined by the log level it comes from:

- **`High`**: "Issues that are likely to be actionable and require immediate attention, such as `ERROR` and `FATAL` events."
- **`Medium`**: "Issues that are likely to be actionable and require attention in the near future, including `WARNING` events."
- **`Low`**: "Issues that don't require immediate attention, including `DEBUG` and `INFO` events."

**Two orthogonal axes — status (where is it in the workflow) and priority (how much does it matter) — is the correct model and is rarer than it should be.** Products routinely collapse them into one field, producing lists like "New / Urgent / Resolved" where the values are not mutually exclusive. Sentry keeps them separate and each gets its own docs page.

The derivation is the second finding. Priority is computed from **the log level the developer already wrote in their own code** — `ERROR`, `FATAL`, `WARNING`, `DEBUG`, `INFO`. Sentry did not invent a severity vocabulary; it adopted the one every logging library already uses and mapped it onto three buckets. A developer's existing habits configure the triage system without any configuration step.

Note the hedge repeated in both `High` and `Medium`: **"likely to be actionable"**. Sentry describes its own prioritisation as probabilistic in the definition of the levels, twice. And the page's description line is "Learn how Sentry prioritizes issue **actionability**" — not severity, not impact, but actionability, which is the property a triaging engineer actually cares about.

**Automatic and manual updates, with a stated lockout:**
> "Sentry continuously monitors the volume of events for each issue. If there's a surge of events for a particular issue (it escalates), its priority level will be automatically bumped up… When an issue de-escalates, its priority will go back down to the previous level."
> "But once an issue's priority has been changed manually, **it will no longer be automatically adjusted** if the event volume escalates."

The manual-override-disables-automation rule is stated plainly. This is exactly the behaviour that generates "why did my priority change?" tickets when it is not documented, and the inverse ("why didn't it change?") when it is not documented either. Sentry documents both directions.

`Enhanced Issue Priority` is tier-gated and its inputs are listed: "the error message, whether or not the error is handled, and historical actions taken on similar issues" — for Python and JavaScript only. **A feature whose language coverage is stated in the sentence that describes it.**

### Five issue categories — grouped by the kind of harm, not the kind of signal

The Issues sidebar groups issues into five named categories:

| Category | Scope (verbatim) |
|---|---|
| **`Errors & Outages`** | "Things that break functionality: runtime errors and exceptions, failed cron jobs, and uptime outages." |
| **`Breached Metrics`** | "Degraded behavior over time, such as endpoint latency regressions or a metric crossing a threshold you've set." |
| **`Warnings`** | "Code that works but inefficiently, like N+1 queries, render-blocking assets, or file I/O on the main thread. These degrade performance and user experience." |
| **`Configuration` (beta)** | "SDK or tooling setup problems that make your data harder to debug, such as low-value spans." |
| **`User Feedback`** | "Reports your users submit directly through User Feedback." |

**The taxonomy axis is the *nature of the damage*, not the telemetry type.** `Errors & Outages` = broken. `Breached Metrics` = degrading. `Warnings` = "code that works but inefficiently" — a five-word definition of a whole category that a reader can apply to a novel case. `Configuration` = **your monitoring itself is misconfigured**, which is a category most observability products have no home for and which routinely wastes engineering time. Sentry files "you set us up wrong" as an issue of the same kind as "your app crashed", surfaced in the same list, and flags it as beta.

`Errors & Outages` merging three distinct sources (exceptions, failed crons, uptime outages) into one category on the grounds that they all "break functionality" is the key move. A user triaging does not care whether the break was detected by an SDK, a cron heartbeat, or an uptime prober.

### Five triage tabs, each an explicit query

- `All Unresolved` (`is:unresolved`)
- `For Review` (`is:unresolved is:for_review`) — "Also called **Review List**, for-review issues are a subset of all unresolved issues and can include new issues or regressions that haven't been reviewed yet."
- `Regressed` (`is:regressed`)
- `Archived` (`is:archived`)
- `Escalating` (`is:escalating`) — "previously archived issues that have exceeded their forecasted event volume"

Every tab publishes the query that produces it. A user can read the tab, understand it as a filter, modify it, and save it. The tab is not a magic view — it is a saved search with a name, and the name and the search are shown together.

**Defect:** `For Review` is "Also called **Review List**" — Sentry ships two names for one tab and documents the fact rather than fixing it.

### Six sort modes, with the ranking factors published

`Recommended` · `Last Seen` · `First Seen` · `Trends` · `Events` · `Users`

`Recommended` is described honestly as opaque: "Sentry combines a variety of signals to determine which issues are most likely to need your attention." No specifics.

`Trends`, by contrast, publishes its weighting:
> "The ranking currently relies on three primary factors:
> - Relative volume: Escalating issues that have a higher recent volume (relative to their baseline) are ranked higher.
> - Absolute volume: Issues with more event volume are weighted more highly. Recent events are weighted more than old events.
> - Issue age: New issues are prioritized — **an exponential decay factor halves the weight every 12 hours.**"

**A published half-life for a ranking algorithm.** "halves the weight every 12 hours" is a concrete, checkable, falsifiable statement about a sort order, given to users. The word `currently` hedges it as subject to change. This is the level of algorithmic disclosure that lets a user reason about why their list looks the way it does, and almost nobody ships it.

### The `Recommended` event — three named selection criteria

Within an issue, the default displayed event is chosen by three stated rules:
- **`Recency`**: "The recommended event is never more than 7 days older than the latest event."
- **`Relevance`**: "The recommended event takes into account what terms you've searched for on your way to the issue."
- **`Content`**: "The recommended event prioritizes events that contain debugging tools such as replays, profiles, and traces."

`Relevance` is the interesting one — **the selection depends on the user's own search path to get there**, and Sentry says so. Content that admits the system is watching how you arrived, and uses it.

### Other state vocabulary

- **Error levels** (from the issue stream's colour swatch): `error`, `info`, `fatal`, `warning`, `debug`, `sample` — six values, all lower case. `sample` is the odd one, denoting a synthetic event.
- **Status-page severity legend**: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`, plus the lower-cased `Major outage` / `Partial outage` on the uptime graph (the shared Statuspage defect — see files 027 and 028).
- **Maintenance lifecycle**, distinct from the incident lifecycle: `Scheduled` → `In progress` → `Update` → `Completed`. Note `Completed`, not `Resolved` — maintenance completes, incidents resolve. **Two lifecycles, two terminal verbs, correctly distinguished.**
- **Data retention states** from pricing: `30-day lookback` (developer) · `Up to 90-day lookback` (team) · `Up to 90-day lookback & additional sampled retention` (business). `lookback` as the retention noun.

### Status-page components — ingestion split by data type, mirrored across two regions

~45 components. The structure is the finding: ingestion is decomposed by **what kind of telemetry**, and the decomposition is mirrored across `US` and `EU`:

`US Ingestion` → `US Error Ingestion` · `US Transaction Ingestion` · `US Attachment Ingestion` · `US Profile Ingestion` · `US Replay Ingestion` · `US Span Ingestion` · `US Cron Monitoring` · `Custom Metrics (beta)` · `US Size Analysis Ingestion` · `US Snapshot Ingestion`

`EU Ingestion` → the same nine, prefixed `EU`, **minus `Custom Metrics (beta)`**.

Unlike Postman's 23-vs-6 asymmetry (file 028), Sentry's EU list is near-complete — nine of ten — and the one omission is explicitly a beta feature. A European customer can see that their span ingestion, replay ingestion, and cron monitoring are independently monitored in their own region. **Regional parity in a status page is itself a compliance statement**, and the one gap is labelled beta rather than unexplained.

The `Alerting` group repeats the pattern at a finer grain: `US Errors Alerting` · `EU Errors Alerting` · `US Transactions Alerting` · `US Spans Alerting` · `EU Transactions Alerting` · `EU Spans Alerting` · `US Uptime Monitoring` · `EU Uptime Monitoring`. **Defect:** the ordering is `US Errors, EU Errors, US Transactions, US Spans, EU Transactions, EU Spans` — the first pair alternates by region, the rest group by region. A scanning user loses the pattern after two rows.

Other groups name their sub-dependencies by vendor, which is unusually transparent:
- `Authentication Services` → `Password-Based` · `Google` · `GitHub` · `Azure DevOps` · `SAML-Based Single Sign-On`
- `Notification Delivery` → `Slack` · `Email` · `PagerDuty` · `Microsoft Teams`
- `Third-Party Integrations` → `Stripe` (a single named component — Sentry's billing dependency, exposed)
- `Integration Pipeline`, `Seer`, `Dashboard`, `API`

**Naming `Stripe` as a monitored component** means a customer whose card declines can check whether the problem is Sentry's billing integration. Naming the four notification channels separately means a customer whose Slack alerts stopped can check Slack specifically. Both are the same principle: **decompose the status page along the axis the customer's symptom will arrive on.**

## T7 Error, failure & recovery `[observed]` — longest category, with T6

Sentry is unusual here: it is a product **about** other people's errors, so its error content is (a) the triage vocabulary for handling them and (b) its own incident communication. There is no error-code dictionary, and none is expected.

### The triage verbs — `Archive`, `Resolve`, `Delete`, and one masterful subordinate clause

**`Archive`** replaces the industry-standard `Ignore`, and the definition explains why:

> "Archive an issue to move it out of the issue stream and pause alerts on it **until the issue gets worse**. Archiving makes sense for noisy issues that are less pressing or not applicable to you or your team."

**"until the issue gets worse"** is the best five words in this file. It transforms the action from an abdication (`Ignore` = I am choosing not to look at this) into a **conditional deferral with an automatic recall** (I will not look at this unless it becomes important, and you will tell me). The user's anxiety about ignoring something that might matter is answered inside the verb's own definition. And the recall is real, not rhetorical: "Sentry will automatically bring an issue back to the top of the list and change its status to `Escalating` if the events in that issue significantly increase over a short period of time."

The default is stated: "By default, issues are archived **until escalating**." The archive condition is itself named after the status that will end it.

Then four explicit archive durations, and the second pair is the interesting part:
- `Forever`
- `A set period of time`
- **`Until it occurs a set number of times`**
- **`Until a set number of users are affected`**

Snooze-until-count and snooze-until-user-count. **The dismissal is parameterised by impact, not only by time.** An engineer can say "wake me when this has hit 100 users" — which is the actual decision rule they hold in their head, made expressible. Most snooze implementations offer only durations.

And `Forever` is bounded honestly rather than left absolute:
> "If you archive an issue 'Forever', **events connected with that issue will continue to be recorded**, but the issue will never be labeled as escalating even if it meets escalating conditions. You can still unarchive any archived issue, including those that have been archived 'Forever'."

Two clarifications in one paragraph: `Forever` does not mean the data stops (a quota implication), and `Forever` is reversible (a reassurance). **Defining what a permanent-sounding option does *not* do** is the move.

**`Resolve`** gets the same treatment, with the regression semantics stated first:
> "A plain **Resolve** treats any later event as a regression."

Then three release-scoped variants, each written as **name → when to use → worked example with real version numbers**:

| Option | Use when | Example (verbatim) |
|---|---|---|
| **`The next release`** | "Use when the fix is ready but not deployed yet." | "Fix is in `main`, prod is still on `1.8.0` — only a recurrence in `1.9.0+` reopens it." |
| **`The current release`** | "Use when the fix is already live." | "Fix shipped in `2.4.1` — leftover `2.4.0` events stay quiet; `2.4.2+` can regress it." |
| **`Another existing release`** | "Use for hotfixes or versions that aren't current." | "Hotfix went out in `3.1.4` while latest is `3.2.0` — anchor resolution to `3.1.4`." |

**This is the finest piece of option documentation in the entire batch.** Three near-identical options whose difference is purely semantic and easy to get wrong, disambiguated by giving each a concrete scenario with invented-but-plausible version numbers. `leftover 2.4.0 events stay quiet; 2.4.2+ can regress it` tells the reader exactly what will happen to their inbox. The purpose is stated in one clause ("That tells Sentry which versions still count as expected noise and which newer versions should count as a regression") and **"expected noise"** is doing a lot of work — it names the thing the user is trying to suppress.

**`Delete` and `Delete and Discard Forever`** — two destructive options with a stated behavioural difference:
> "You can remove an issue from the issue list by deleting it, but **it will reappear as a new issue if it recurs.**"
> "There's also an option to `Delete and Discard Forever`, which will make it so that the issue is never seen again, even if it recurs. Any future events tied to the permanently deleted issue will be **discarded automatically and won't count towards your quota**."

Plain `Delete` is explicitly *not* permanent, and the doc says so in the same sentence. `Delete and Discard Forever` adds a **billing consequence** as a benefit — discarded events do not consume quota — which turns a destructive action into a cost-control one. And the feature's limits are stated: "Discard forever only works for Error Issues. Other issue categories, such as Performance Issues only support normal deletion."

### `For Review` — the triage state named after the human act, not the system state

> "Items filtered under `is:for_review` are new, regressed, or unresolved issues that **haven't been marked as reviewed yet**."

And: "you can manually `Archive` or `Resolve` an issue, which will also change its status **and mark it as reviewed**."

`reviewed` is a boolean tracked separately from status, set as a side effect of any triage action. So "has a human looked at this?" is a distinct fact from "what is its workflow state?", and the `For Review` list is the set where the answer is no. **The inbox-zero affordance is a derived query over a human-attention flag**, not a status value — which is why an issue can be `Ongoing` *and* `for_review`, and why `Ongoing`'s definition includes "or has manually been marked as reviewed."

### The diagnostic content inventory — what Sentry puts in front of a debugging engineer

The Issue Details page composes from a named set of sections, and the *names* are the content artefact:

`Event Highlights` · `Stack Trace` · `Suspect Commits` · `Breadcrumbs` · `Trace Preview` · `Session Replay` · `HTTP Request` · `Packages` · `Additional data` · `Span Evidence` · `Tags` · `Screenshot` · `Contexts` · `Feature Flags` · `Event Grouping Information`

Several carry definitions that do real explanatory work:

- **`Suspect Commits`** — "A *suspect commit* is a commit that's been identified as **potentially** having caused the error event… The author of the suspect commit is also **suggested** as an assignee for the issue." Note `suspect`, `potentially`, `suggested` — three hedges in two sentences. Sentry is naming a person as the probable cause of a production error and it hedges every step. The noun `suspect` is doing the work of a confidence label: it is accusatory enough to be useful and provisional enough to be fair. **A hedge encoded in the feature's name.**
- **`Breadcrumbs`** — "provide a history and timeline leading up to the error event. These can include things like HTTP requests, log statements from the console or server, and DOM events." The metaphor is apt and the definition is concrete about what counts.
- **`Event Highlights`** — "specific tags and context items that have been **promoted to the top of the page** for quicker debugging. **If you miss tags being at the top of the page**, click 'View All' to go to their new location under the stack trace." That second sentence is a **migration apology inside reference documentation** — Sentry moved something, anticipates the user's confusion, and names the feeling ("if you miss…") before giving the recovery. Handling the emotional residue of a UI change in the docs for the new feature is rare and good.
- **`Trace-related Issue`** — "a different issue that occurred during the same trace as the event in view. This is useful for understanding the context of the current issue and **may help you identify its root cause**." A cross-reference between two failures, with the causal claim hedged.
- **`Span Evidence`** — "Information about the performance problem in the context of the current event." The word `evidence` for the diagnostic payload of a performance issue, paralleling `suspect` for commits. **A forensic register applied consistently**: suspects, evidence, breadcrumbs, fingerprints.
- **Suspect feature flags** — "Sentry automatically **highlights feature flags that may have contributed to** an error event, making it easier to review and pinpoint potential causes." Same hedging grammar as suspect commits.

The forensic metaphor family (`suspect`, `evidence`, `breadcrumbs`, `fingerprint`, `Sentry` itself) is coherent and long-established. It gives debugging a narrative shape — a scene, a trail, a suspect — which is a more useful mental model than "telemetry".

### Grouping explained in one sentence, with the quota consequence separated

> "You can think of an issue as a single bug or problem with your app. To make them manageable, we **group similar events into issues based on a fingerprint**. This grouping of events into issues allows you to see how frequently a problem is happening and how many users it's affecting."

And then, in a boxed callout headed `Issues and Event Quotas`:
> "Your quota is consumed by *events*, not *issues*. Issues are generated from your accepted error or transaction events. Generating issues does not cause Sentry to accept more events for you and **does not** directly impact your quota."

**The billing implication of the core data model, stated at the point where the model is introduced.** A user learning that events group into issues will immediately wonder which one they pay for, and the answer is in the next paragraph, bolded. Anticipating the commercial question inside the conceptual explanation is the right placement — it is the question, not a distraction from it.

### Incident communication — good structure, badly executed

Four incidents in the 90-day window. The stage labels are `Investigating` · `Update` · `Identified` · `Monitoring` · `Resolved`, plus the separate maintenance chain `Scheduled` · `In progress` · `Update` · `Completed`.

**What is done well:**

- **Bodies name the affected region and the affected data type**: "an issue that causes new errors to be delayed **in the EU region**" · "an issue affecting **spans ingestion in the EU region**" · "degraded ingestion **in US**". The blast radius is in the first clause, and it matches the status-page component names exactly, so a customer can map the sentence to the component.
- **Partial recovery is reported honestly, mid-incident**: "**Error ingestion is fully operational. We are currently working on recovering real-time processing of spans.**" One data type recovered, another not, stated as two facts. This is the single best incident update in the batch — it tells a customer which half of their telemetry they can trust *right now*.
- **Backlog is named, not hidden**: "We are processing real-time data again and are working on **burning our backlog**." Customers of an ingestion product care enormously about the distinction between "new data is flowing" and "old data has caught up", and Sentry separates them. The `Resolved` body then closes the loop precisely: "We are processing **real-time data for all data types** again."
- **The scheduled-maintenance notice is exemplary**, and worth quoting nearly in full because every clause earns its place:
  > "We will be performing a database migration in the EU region that will **pause span ingestion and disable span alerting for up to 2 hours**. The Sentry UI and API **should be available** for the duration, but there will be **a period of catch-up where ingestion will be behind and alerts will not fire (until ingestion has reached fresh data)**."

  Four separate disclosures: what stops (span ingestion, span alerting), the bound (`up to 2 hours`), what keeps working (`UI and API`, hedged with `should`), and — crucially — **the after-effect that outlasts the window**. "alerts will not fire until ingestion has reached fresh data" warns the customer that the maintenance window understates the real period of degraded alerting. Naming the recovery tail is the thing most maintenance notices omit, and it is exactly the thing that causes the post-maintenance support ticket. Posted **two days in advance**.

**What is badly executed, and these are real defects:**

1. **A `Resolved` update whose body is not a resolution.** The `Delays in spans ingestion` incident closes with:
   > **`Resolved`** — "We have identified a networking issue with an upstream provider and are working on mitigations."

   That is an `Identified` body — word-for-word identical to the `Identified` and `Update` entries stamped two minutes earlier. The incident is marked resolved while its own final sentence says work is ongoing. A customer reading the resolution learns that the problem is still being mitigated. This is the most serious incident-content defect in this batch.

2. **Duplicate consecutive updates with identical bodies.** Across the two 18 September incidents, four pairs of updates one to two minutes apart carry identical text under different stage labels:
   - `Update` 10:56 and `Identified` 10:58 — same sentence
   - `Update` 09:53 and `Monitoring` 09:54 — same sentence
   - and the `Resolved`/`Identified` pair above

   The pattern suggests an operator posting a generic `Update` and then re-posting the same text under the correct stage a minute later. The customer-visible effect is a timeline that looks like nothing is happening.

3. **No next-update commitment on any of the fifteen updates read.** Compare Twilio (file 027), which commits to an interval on every single update. Sentry's cadence is actually good (the 18 September error incident ran eight updates over 3h21m) but a customer watching it has no idea when to look again.

4. **A missing terminal full stop and a grammar error** in `Investigating` on the spans incident: "We are currently investigating an issue affecting spans ingestion in the EU region" — no period, where the sibling incident's identical-shape sentence has one.

5. **The 10 September incident is written in a visibly different voice**, with agreement errors: "**Issue were identified** and fixes were applied. **We continue to monitor situation**" (missing article, no full stop), and `Resolved` — "**Issue fully resolved**" (two words, article dropped, no period). Against the other incidents' fluent full sentences, this reads as a different author under pressure with no template. Its `Identified` body is genuinely informative though — "During migration to new control silo region we started to observe increased number of 500 errors. Migration procedure was rolled back." — naming the cause as their own migration and stating the remedy.

6. **The incident title `Sentry.io elevated number of 500 errors`** is missing a verb ("Sentry.io [has an] elevated number…"). Its siblings (`Delayed ingestion of errors in EU`, `Delays in spans ingestion`, `Ingestion is delayed in US`) are grammatical, and even those three use three different constructions for one concept: past participle + noun, noun + noun, subject + passive verb.

**The overall picture:** Sentry has the right instincts (region named, data type named, partial recovery reported, backlog acknowledged) and no template discipline. The best updates here are better than Twilio's; the worst are much worse. Twilio's rigid template produces uniformly adequate updates; Sentry's freehand approach produces both the best single sentence in the batch and a resolution that contradicts itself.

## T8 Empty states `[observed]`

Status page only; all in-product empty states are behind auth.

**Incident history:**
- `No incidents reported today.` (current date)
- `No incidents reported.` (closed dates)

The same one-word tense distinction as Postman's, and correct for the same reason — an open day cannot yet be declared incident-free.

**Uptime graph** (Statuspage-supplied, shared across files 027–029):
- `No downtime recorded on this day.` vs `No data exists for this day.`
- `had a major outage.` / `had a partial outage.`
- `No incidents or maintenance related to this downtime.`

**`[documented]` near-misses.** The docs describe one conditional-absence state with unusual care:
> "**View More Events** is only available on Team plan and above. **On the Free plan, this button will not appear.**"

A docs note stating that a control is *absent* rather than disabled on a lower tier — so a Free-plan user reading the docs is not left hunting for a button that was never rendered. Documenting invisibility is a small, cheap kindness that most tier-gated products skip.

Also: `Custom Metrics (beta)` appearing under `US Ingestion` and absent under `EU Ingestion` is an absence the page does not explain, though the `(beta)` label makes it inferable.

No genuine in-product empty states retrieved. `[absent]`

## T9 Notifications & system messages `[observed]`

### Four notification classes, named and scoped

| Class | Scope (verbatim) |
|---|---|
| `Workflow` | "Activity involving user actions and state changes on issues. This includes activities such as issue resolution, assignment, comments, and regressions." |
| `Deploy` | "When a release you have commits on is deployed." |
| `Spend` | "When you're getting close to spending your reserved volume, your quotas are depleted, and/or your pay-as-you-go budget is being put to use." |
| `Weekly Reports` | "A summary of your organization's Sentry activity." |

Four classes, and the segmentation is by **what kind of fact changed** — the issue moved, your code shipped, your money is going, here is a period summary. A user configuring notifications can reason about the four independently because they map to four different concerns.

`Deploy` is scoped by a relationship the user did not declare: "a release **you have commits on**". The notification audience is derived from version control, not from a subscription list. **Subscription by authorship.**

### Five workflow triggers, each defined by its state transition

- **`Issue Resolved`**: "When a new issue is spotted in your code, it's in the Unresolved state. The issue state changes to Resolved when a project team member resolves it, either by manually changing its state… or by submitting a fix, or because of the project's auto-resolve feature (if configured)." — three routes to one state change, enumerated.
- **`Regressions`**: "A regression happens when the state of an issue changes **from Resolved back to Unresolved**. An email is sent to all project team members." — note the audience widens for regressions: *all* team members, not just subscribers. A regression is treated as more collectively important than an original resolution.
- **`Comments`**, **`Assignment`** ("When an issue is assigned or unassigned")
- **`Event Processing Problems`**: "When there's a problem with **processing error events you've sent to Sentry**." — Sentry notifies you when its own ingestion of your data fails. A meta-notification about the monitoring pipeline itself, which for an observability vendor is the notification that matters most and the one easiest to omit.

### Subscription is behavioural, and so is unsubscription — both enumerated

> "You receive workflow notifications when you subscribe to an issue in one of the following ways by:
> - You or your team being assigned to the issue
> - Clicking the bell icon to subscribe to an issue
> - Commenting on an issue
> - Bookmarking an issue
> - Resolving, unresolving, or archiving an issue
> - Resolving an unassigned issue with the 'Claim Unassigned Issues I've Resolved' option turned on"

> "You'll be unsubscribed from an issue if you:
> - Are unassigned from the issue
> - Delete the only comment you left on an issue
> - Remove a bookmark from an issue"

**Six ways in, three ways out, all published.** This is the most transferable notification-content pattern in the file. Implicit subscription — where acting on a thing silently signs you up for emails about it — is the largest single source of "why am I getting this?" support contacts in any collaborative product. Sentry's answer is to enumerate every implicit trigger *and* every implicit release, so a user can reason backwards from an unwanted email to the act that caused it, and forwards to the act that will stop it.

Note the asymmetry is honest: only three of the six entry routes have a documented exit (assignment, comments, bookmarks). Clicking the bell, resolving, and the Claim option have no listed reversal — arguably a gap, but a visible one because the lists sit adjacent.

The subscribed user becomes a **`participant`**, a named role surfaced in the UI: "Participants can be viewed from the right hand sidebar at the bottom of the issue details page." And the docs flag the overlap risk rather than hiding it: "Note that participant notifications **may have some overlap with alerts** that are configured on a per-project basis." Two notification systems that can double-send, and the docs say so.

### Spend notifications — three thresholds, two configurable axes

Default triggers, sent "to all owners and billing members":
- "**80%** of the organization's reserved volume (such as errors, spans, and/or attachments) has been depleted."
- "The **entire** reserved volume and any pay-as-you-go budget for a category… has been depleted."
- "**80%** of the organization's pay-as-you-go budget has been used."

Two 80% warnings and one exhaustion alert, each scoped to a named budget type. Then user-configurable thresholds on two axes: `Subscription Consumption` and `Pay-as-you-go Consumption`, each "Set the percentage of the quota usage threshold(s)".

The plural `(s)` is doing real work — a user can set multiple thresholds per axis. And the path to configure is given twice, once for the org (`Settings > Subscription > Manage Spend Notifications`) and once for the individual (`User Settings > Notifications > Spend > cog wheel`), with the distinction between "what the org sends" and "how I personally receive it" made explicit. **Separating organisational notification policy from personal delivery preference**, and documenting both, is correct and uncommon.

`Weekly Reports`: "Sentry sends weekly reports **every Saturday, by email**." Day named, channel named. Saturday is an interesting choice — a summary that arrives when nobody is on call, which frames it as review material rather than as an alert.

### Status-page subscription channels

Identical four-channel Statuspage template as files 027 and 028: email gets `creates`/`updates`/`resolves`; SMS gets `creates`/`resolves`; webhook gets those three plus `changes a component status`; Slack is described rather than enumerated. See file 028 T9 for the analysis — the pattern (differentiated event sets per channel, published at opt-in) is vendor-supplied but sound.

## T10 Disclosures, legal & compliance `[observed]`

### The pricing calculator is the disclosure artefact

Sentry's headline prices are small (`$0`, `$26/mo`, `$80/mo`) and its real cost is usage. The disclosure work is therefore done by a live calculator, and it is done well.

**The framing sentence sets the model in three sentences:**
> "Each plan includes a base quota. Any usage above your quota is billed at pay-as-you-go rates. **You only pay for what you use.**"

**Every billable dimension gets a one-line definition of its unit.** For errors:
> "Errors are sent every time an SDK catches a bug."

This is the critical disclosure in usage-based pricing and the one Postman omits (file 028): *what event causes a charge*. Sentry states it in nine words, in the calculator, next to the slider.

**The rate card is published in full, as a volume table:**

| Volume | Price per error |
|---|---|
| `50K – 100K` | `$0.0003625` |
| `100K – 500K` | `$0.0002188` |
| `500K – 10M` | `$0.0001875` |
| `10M – 20M` | `$0.0001625` |
| `20M+` | `$0.0001500` |

Five bands, seven significant figures, tier-labelled (`Pay-as-you-go rates (Team)`). Publishing per-unit prices to four decimal places on a public page, with the volume breakpoints, means a prospective customer can model their bill without contacting sales. Very few usage-priced products do this.

**The estimate is bounded honestly:**
> "This calculator provides an estimate only. **Your actual bill may differ due to rounding.** Volumes above the slider maximums are supported on pay-as-you-go plans. Annual and prepaid billing options with additional discounts are available during checkout."

Four disclosures in four sentences: it is an estimate; the specific reason it may differ (rounding); the slider is not the ceiling; and better prices exist later in the funnel. That last one is genuinely against interest at the point of quoting — telling a user the number they are looking at may be *higher* than what they will pay.

**Live total and per-line breakdown**: `Estimated Monthly Cost $26.00/mo`, `Annual total: $312.00/yr`, then an eleven-row itemisation each showing quantity and charge (`Errors 50K $0.00`, `Logs 5 GB $0.00`, …, `Total $26.00/mo`). Showing eleven `$0.00` lines rather than hiding them demonstrates that the base quota genuinely covers them.

### Additive pricing stated per row in the comparison table

Overage rates appear inline in the feature grid rather than in a separate schedule:
`5GB +$0.50/GB additional` (logs, metrics) · `1 uptime monitor +$1.00/uptime alert additional` ·
`1 cron monitor +$0.78/monitor additional` · `UI Profiling — Pay-as-you-go required +$0.25/hr` ·
`Continuous Profiling — Pay-as-you-go required +$0.0315/hr`

**`Pay-as-you-go required`** as a cell value is a distinct disclosure: the feature has *no* included allowance, so it cannot be used at all without enabling overage billing. Saying "required" rather than showing a zero quota is clearer about the prerequisite.

**Defect:** `1 uptime monitor +$1.00/uptime alert additional` mixes units — the included quantity is a *monitor*, the overage is priced per *alert*. Either the row is wrong or two different things are being metered, and the cell does not disambiguate. Its neighbour (`1 cron monitor +$0.78/monitor additional`) uses one unit consistently, which makes the uptime row look like an error.

**Defect:** `Seer: AI debugging agent (subscription required)` appears in the `team` tier's included-features list, as does `Seer: AI Debugger (at additional cost)` as a comparison-table section header. A feature listed among what you get, parenthetically qualified as something you must buy separately — the same uncomfortable construction as Postman's `(add-on)`, and here it appears with two different parentheticals for the same product.

### Compliance surfaced as pricing rows, not as a trust page

The `admin & compliance` section of the comparison table lists: `Authentication` · `SSO: Google Apps` · `SSO: GitHub Organizations` · `SSO: SAML2` · `SSO: SCIM` · `Manage PII` · `BAA` · `HIPAA Security` · `SOC2` · `ISO 27001` · `Data Residency` · `Relay`.

Three observations. **`BAA` appears as a bare unexpanded acronym** in a pricing table (Business Associate Agreement — the HIPAA instrument), with no gloss anywhere on the page; a reader who does not already work in healthcare compliance cannot decode it. **`Manage PII` is a product feature with a tier gate** — data-minimisation capability is sold, not universal. And **`Data Residency` is a row, not a promise** — the US/EU election is a plan feature, which the docs corroborate (`Data Storage Location (US or EU)` — "Choose where to store your data in the US or the EU").

The homepage's security block is the weakest compliance copy in this batch:
> `Built to be secure, Designed to not get in your way`
> "Security and compliance aren't just checkboxes—they're built into how we run Sentry. We use **industry-standard tech and practices** to keep your data safe, and we stay out of your way while doing it."

No certification is named, no standard is cited, no evidence is offered, and the only CTAs are `Check out our Privacy Policy` and `Contact Us`. Compare Postman's `Compliance isn't a checkbox it's a proof point. Ours are downloadable.` — both reject the checkbox framing in almost identical words, but Postman then enumerates nine certifications and offers the documents, while Sentry asserts and stops. **"industry-standard tech and practices" is a non-claim**, and it sits on the homepage of a product that holds customers' production error data including, potentially, PII.

Sentry does maintain `sentry.io/trust/` and `sentry.io/security/` (both linked from the footer, neither fetched here — see Caveats), so the substance may exist one click away. The finding is about the homepage's treatment, not about Sentry's actual posture.

### Data handling as documented product capability

- `Data Scrubbing` — "Learn more about scrubbing data using the Settings for your project and organization."
- `Relay` — "Sentry's data security solution", a self-hostable proxy, listed both as a docs section and a pricing row
- `Dynamic Sampling` — "prioritize important events and increase visibility in lower-volume projects"
- `Inbound filtering` / `Advanced inbound filtering` — tier-gated
- `Data retention`: `30-day lookback` / `Up to 90-day lookback` / `Up to 90-day lookback & additional sampled retention`
- `Attachments` — the docs list `Screenshot` as an attachable artefact captured "when a user experiences an error, an exception, or a crash", for eleven named SDKs. Screenshots of a user's screen at the moment of failure is a significant privacy surface and the docs treat it as a feature enumeration without a privacy note.

**Trial and tier disclosures**: "try Business for **14 days with no credit card**" (meta description) · "Start free on the Developer plan **forever**" · `Save with annual` toggle · promotional banner `5,000 Session Replays on us — New users only: Get 5,000 free replays per month for your first 3 months.` — **three bounds in one promo** (who: new users; how much: 5,000/month; how long: 3 months). Promotional copy that states its own expiry.

## T11 Help-centre architecture `[observed]` — structure only

H1: **`Advice and answers from the Sentry.io Team`** — an Intercom-default phrasing, retained. Search placeholder: `Search for articles...`

Three collections (see T1 for the table): `Product Features` (382), `Account & Billing` (260), `SDKs` (143). **785 articles in a three-collection taxonomy**, which means each collection must have substantial internal structure not visible from the home page.

Two structural observations:

**(a) The collection split is by *what you are asking about*, and it maps to three different asking-personas.** `Product Features` is the engineer mid-task. `Account & Billing` is the owner or admin. `SDKs` is the engineer at setup time. Three collections, three moments, three different people — a defensible top-level cut for a product whose users span all three roles.

**(b) The escalation is minimal and honest about its own failure.**
> "Chat unavailable? Please accept cookies or contact us via email below."
> `Email Support`

A conditional string that **diagnoses why the chat widget is missing** (cookie consent) and offers the fallback. Most products render a broken chat launcher and say nothing. This one names the cause and routes around it. Note the email address is Cloudflare-obfuscated, so the fallback is a link rather than a visible address.

The help centre carries **no `Contact Us` form, no ticket submission, and no community link** — one email link is the entire human escalation path from the help centre. Community (`Discord`, `sentry.io/community/`) and `Contact Us` live in the marketing nav instead, so a user who entered via `help.sentry.io` sees only the narrowest route out.

**`[absent]`: article titles.** None of the 785 were retrieved. Article-title grammar, task phrasing, and the internal structure of the three collections are unexamined, which is the largest single gap in this file.

**Surface split, documented by role rather than by tooling**: `Sentry Docs` is linked twice from the help-centre header, and `Help Center` and `Docs` appear as separate footer entries throughout the marketing site. The division appears to be docs = how it works, help centre = how to fix my account, but neither surface states the rule.

## T12 FAQs `[absent]`

No FAQ block was found on the homepage, pricing page, docs index, help-centre home, or status page. Sentry's pricing page — the usual home for a FAQ — instead carries the interactive calculator, which arguably does the FAQ's job for cost questions and does it better.

Recording this as a genuine `[absent]` rather than a retrieval failure: the pricing page rendered fully, including the calculator and the ~50-row comparison table, and contained no question-shaped headings.

The nearest equivalents are the docs' in-page explainers, which answer anticipated questions inside reference prose rather than as a separate block: the `Issues and Event Quotas` callout answers "which am I billed for?", and the `View More Events` note answers "where is that button?". **Sentry's FAQ content is distributed into the docs at the point of the question rather than collected at the foot of a page** — a defensible architecture, and one that only works if the anticipation is good. Here it is.

## T13 Terminology & glossary `[observed]`

Sentry publishes `Concepts` — "Learn about important concepts that are essential to using Sentry" at `docs.sentry.io/concepts/key-terms.md` — a dedicated key-terms page (not fetched; see Caveats). Terminology below is from consistent usage across the pages read.

| Term | Sentry's usage | The alternative it rejected |
|---|---|---|
| `Issue` | The central object: a group of similar events sharing a fingerprint. "a single bug or problem with your app" | "error", "ticket", "alert", "bug" |
| `Event` | The individual occurrence; **the billable unit** | "error", "log line", "occurrence" |
| `fingerprint` | The grouping key | "hash", "signature", "group key" |
| `Ongoing` | The not-new, not-closed status | "Open", "Unresolved", "Active" |
| `Escalating` | Exceeding forecast volume | "Spiking", "Critical", "Trending" |
| `Regressed` | Resolved and returned | "Reopened", "Reoccurred" |
| `Archived` | Deferred until worse | **`Ignored`** — the term Sentry replaced |
| `for_review` / `Review List` / `For Review` | The human-attention flag | "Triage", "Inbox", "Unread" — though `Inbox` also exists as a separate Seer feature |
| `Suspect Commit` | Probable cause, hedged in the noun | "Blame", "Culprit", "Responsible commit" |
| `Span Evidence` | The diagnostic payload for a performance issue | "Details", "Data" |
| `Breadcrumbs` | The pre-error timeline | "Trail", "History", "Log context" |
| `Tags` vs `Contexts` | **Formally distinguished**: tags are "key/value string pairs that are both indexed and searchable"; contexts are "related key/value items (not just strings)" and "cannot be searched" | one merged "metadata" concept |
| `Event Highlights` | Promoted tags/context at the top of the page | "Pinned", "Summary" |
| `Seer` | The AI debugging product family | |
| `Autofix` · `AI Code Review` · `Agent` | Three Seer capabilities | |
| `Inbox` | A Seer-gated triage view that "groups the issues assigned to you by **how close they are to being fixed**" | |
| `lookback` | The retention window noun | "retention period" |
| `expected noise` | What a release-scoped resolve suppresses | "old events", "stale errors" |
| `burning our backlog` | Catching up on delayed ingestion (status page) | "processing the queue" |
| `DSN` | The project credential, used unexpanded throughout | |
| `Relay` | The self-hosted PII proxy | |
| `wizard` | The install tool | "CLI installer", "setup script" |
| `Cookbook` / `recipes` | Task-oriented content | "tutorials", "how-tos" |
| `Sandbox` | The unauthenticated live demo | "demo", "playground" |
| `Sentry`, `Functional Software, Inc.` | Brand and legal entity, both in the footer | |

**The `Archived` replacement is the terminology decision worth studying.** `Ignored` is what almost every issue tracker calls this state, and it is a bad word: it describes an attitude (I am disregarding this) rather than a system behaviour, it makes the user feel negligent, and it implies permanence that the feature does not actually have. `Archived` describes where the thing went, not how the user feels about it, and — critically — the surrounding copy ("until the issue gets worse") turns it into a conditional. **Rename the state to describe the storage, and let the adjacent sentence describe the condition.**

`Ongoing` is the second such decision. It is the rarest kind of good naming: a word for a state that most products do not realise they have.

**The forensic metaphor family** — `Sentry`, `suspect commit`, `Span Evidence`, `Breadcrumbs`, `fingerprint` — is internally consistent and long-standing. It frames debugging as investigation, which supports the hedged register (a *suspect* is not a culprit; *evidence* is not proof) and gives the product a coherent noun-world.

**The `Tags` / `Contexts` distinction** is a good example of terminology doing engineering work. The docs state the difference twice and give the decision rule: "The issue details page only displays context for the individual event, and **context cannot be searched. If you require searching for your data, use Tags instead.**" Two similar-sounding concepts, one behavioural difference (searchable or not), and an explicit routing sentence. Also a searchability gotcha documented: "Sentry will display tags containing '`.`' characters as a tree structure to make things a bit more readable, but **searching should always use the full tag name** (for example, `organization.slug` instead of `slug`)." A display transformation that breaks search, named and corrected.

**Collisions recorded:** `Agent` (Seer's agent) vs `Agent Tracing` (tracing the customer's agents) vs "No agents to install" (the APM-agent sense, on the homepage) — **three meanings of `agent` on one marketing site**, one of them a negation of another. `Inbox` (Seer feature) vs `For Review` (the built-in triage list) are two names for adjacent concepts. `Metrics` (product) vs `Application Metrics` (pricing row) vs `Custom Metrics (beta)` (status component) vs `Breached Metrics` (issue category) — four metric-flavoured terms.

### Machine-readable docs

Every docs page is available as Markdown by appending `.md`, announced at the top of the index: "All documentation pages are available as clean Markdown by appending `.md` to any URL… **Use these Markdown URLs for full content.**" The instruction is imperative and addressed to the machine reader.

Plus `mcp.sentry.dev` ("For real-time issue analysis and debugging against a user's Sentry account"), `skills.sentry.dev`, and `npx @sentry/agent-plugin install`. Sentry ships four distinct agent-facing surfaces: markdown docs, a skills library, an MCP server, and a plugin installer — the most complete agent-facing content estate in this batch. The homepage banner promotes it: `Sentry MCP: fix production issues right from your LLM ➔`.

## T14 Voice, tone & accessibility `[observed]`

**No published content style guide or voice-and-tone documentation was found.** `[absent]`. Observations are inferred from shipped copy, which in Sentry's case is unusually consistent.

### The voice: self-deprecating, profane, and specific

Sentry has the most distinctive voice of the five products in this batch, and it is built from three moves.

**(1) Anti-boast.** `considered "not bad" by millions of developers` · `Yeah, other tools exist.` · `That's kind of our thing.` · `See -- it's really just one command.` Claims are made by declining to make them. The rhetorical bet is that a developer audience discounts superlatives and rewards understatement.

**(2) Register breaks in unexpected places.** `Learn sh*t.` as a help-centre collection description is the extreme case — masked profanity in the taxonomy of a support site, in the position normally occupied by "Find answers to common questions about product features." `Hang out with us` as a nav group header. `Babysit the bots` as a product headline. `Answers to all the important things in life: quotas, customization, and 2FA & SSO.` Each is a place where the surrounding convention is maximally dry, which is exactly why they land.

**(3) The consequence named as a felt experience rather than a metric.** "before the 'why is this so slow?' posts fill up your feed" · "Stops bad code before it starts bad days" · "so you can stop guessing" · "without guesswork" · "we stay out of your way while doing it". Sentry consistently describes the benefit as the *absence of an unpleasant experience* rather than the presence of a capability.

**The register gradient is steep and correctly directed.** Marketing and the help-centre chrome carry all the personality. The product documentation — `states-triage`, `issue-priority`, `issue-details`, `notifications` — is entirely flat: declarative, second-person, no jokes, no contractions beyond the ordinary, no exclamation marks. The tonal switch at the docs boundary is total. This is the same discipline Stripe shows (file 026) and the opposite of a uniform brand voice applied everywhere.

**Zero exclamation marks** were found on any surface, including the marketing pages and the help centre. A site with `Learn sh*t.` in it and no exclamation marks is a deliberate configuration: profanity is permitted, enthusiasm is not.

**Person.** Second person for the reader throughout. First-person plural for Sentry, used naturally in docs ("we group similar events into issues", "**we** support it", "We recommend adjusting this value in production"). The incident updates use `we`/`our team` consistently. `You` appears in state definitions in the possessive sense that matters ("issues that need **your** attention", "a metric crossing a threshold **you've** set").

**Hedging is systematic in the diagnostic copy**, which is the register decision with the most substance. `suspect` commit · `potentially` having caused · `suggested` as an assignee · `likely to be actionable` (twice) · `may have contributed to` · `may help you identify its root cause` · `currently relies on` · `should be available`. Sentry makes probabilistic claims about causation constantly, and it marks every one. For a product that names a specific engineer as the probable author of a production failure, this is not politeness — it is the difference between a useful tool and an accusation engine.

### Defects collected

**Punctuation and typography:**
- **Double space** before the quotation mark in the hero subhead — the site's most-read string
- **Double hyphen** for an em-dash: `See -- it's really just one command.` and `Map every incident to the release, PR, and owner -- automatically.`
- **Missing space** in a section heading: `Get monthly product updatesfrom our newsletter`
- **Comma splice** in a heading: `Built to be secure, Designed to not get in your way`
- `Fix It` — capital `I` on a two-word imperative, against the site's otherwise sentence-case headings
- Missing terminal full stops on two incident updates; missing articles and agreement errors on the 10 September incident chain
- `Resend OTP in:  seconds` — visible empty interpolation (Statuspage)

**Naming and casing:**
- Plan names in three casings on one page (`developer` / `Team` / `Enterprise`)
- Four signup CTA labels, two demo CTA labels
- `Seer` vs `AI Debugging` for the same nav group in the same DOM
- `For Review` vs `Review List` for the same tab, documented as such
- `Signup` / `Sign-up` / `sign up for` in three consecutive install tabs
- Three senses of `agent` on one marketing site

**Substantive:**
- A `Resolved` incident update whose body says work is ongoing (T7)
- `start trial` on a `$0` tier with no trial
- `BAA` unexpanded in a pricing table
- `1 uptime monitor +$1.00/uptime alert additional` — mixed units in one cell
- `Seer` listed as an included feature and parenthetically as a paid add-on, with two different parentheticals

### Accessibility content

**Strong:**
- `Skip to main content` present on marketing pages and the help centre
- **Alt text is exceptionally detailed and describes the *information in the screenshot*, not just the scene.** This is the best alt-text practice in the batch for product imagery. Examples:
  - "A section labeled 'Root Cause' with code insight stating: 'The code attempts to check if $quantities,' highlighting a probable bug in the application logic."
  - "Sentry issue detail page for a fatal read ETIMEDOUT error on a GET /api/projects request, showing root cause analysis: a missing DB connection timeout combined with latency and WebSocket activity. Includes stack trace, user impact, and code snippet with a new Pool() initialization lacking timeout settings."
  - "Sentry Session Replay showing a user session on empower-plant.com with clicks, navigation, and two key errors during checkout: out-of-stock and 500 server error."
  - "Sentry trace waterfall view for an HTTP POST to /api/v1/buy-plants, showing AI-related spans including invoke_agent, chat, and execute_tool, with one invocation taking 4.04s—80% faster than average."
  - "Code diff view showing new configurations added to prevent database timeout errors, including connection pool sizing, timeouts for idle connections and queries, and keepalive settings in client.ts."

  These are **150–300 characters each and carry the actual technical content of the screenshot** — the error type, the endpoint, the timing, the file name. A non-sighted developer evaluating Sentry gets the same evidence a sighted one does. Most marketing sites would write "Sentry dashboard screenshot".
- Even the illustrations get interpretive alt: "Cartoon showing the Sentry logo as a distressed character watching one person stuck in a smartphone and another diving headfirst into a retro computer—illustrating developers getting lost in debugging chaos." The alt text explains the *joke*, which is the information.
- Code blocks are labelled by language in text (`Bash`, `Python`, `JavaScript`, `JSX`, `C#`, `Go`, `Swift`, `Ruby`, `PHP`, `XML`, `Java`) rather than by syntax colour alone.
- Docs prose names UI controls in text with bold, and consistently gives the location (`in the header`, `at the lower right`, `in the right-hand sidebar`) rather than relying on a screenshot.
- The help centre's conditional string (`Chat unavailable? Please accept cookies or contact us via email below.`) is a fallback that a keyboard or cookie-restricted user actually benefits from.

**Defects:**
- **`NEW` badges concatenated into link text**: `Metrics NEW`, `Labs NEW`, `Seer NEW`. The accessible name of the link includes the badge with no separator.
- **Nav menus duplicated in the DOM** (desktop and mobile variants, with the mobile variant additionally repeating each group under an `### <heading>` block), so the Products list appears **three times** on a single page and a screen-reader user may traverse it repeatedly.
- **Customer logo rail is text-only** (`GitHub`, `Disney`, `Atlassian`, `Linear`, … 23 names) with two stray image entries (`lyft`, `Factory.ai Logo`) rendered twice above it — inconsistent treatment within one component.
- **~4 status components render a bare `?`** as tooltip-trigger text (`US Cron Monitoring ?`, `Authentication Services ?`, `Integration Pipeline ?`, `Seer ?`) — the shared Statuspage defect, though far fewer instances than Twilio or Postman.
- `Subscribe to UpdatesSubscribe` — doubled accessible name (Statuspage).
- `Marketing Mode` appears as a bare string in the homepage DOM above the announcement banner — an internal toggle label leaking into the rendered page.
- Two illustration `alt` attributes are duplicated verbatim for the same image rendered twice (the 404 cartoon), so it is announced twice.
- The pricing comparison table's feature rows are section-headed but **many rows have no value text at all** in the extracted DOM (checkmark icons only, e.g. `#### Ownership Rules`, `#### Code Owners`, `#### Suspect Commits` with three empty cells). If the availability is conveyed by an unlabelled icon, the entire middle of the comparison table is inaccessible non-visually. This is the most consequential accessibility defect found on Sentry's surfaces — a buyer using a screen reader cannot determine which tier includes SSO, Code Owners, or Anomaly Detection.

---

## Transferable patterns

1. **Make the status name, the filter syntax, and the API value the same string.** Sentry's six statuses each ship with a `Custom Search Term` (`is:new`, `is:ongoing`, `is:escalating`, `is:regressed`, `is:archived`, `is:resolved`) published in the same table row as the definition. No Dashboard-vs-API mapping table is ever needed. Condition: requires single-word, lower-caseable status names chosen with the query syntax in mind from the start — you cannot retrofit this onto `Pending Merchant Review`.

2. **Name the state between "new" and "done".** `Ongoing` — "created more than 7 days ago **or** has manually been marked as reviewed." Every inbox-shaped product has this population and most leave it unnamed inside `Open`. Give it a neutral, duration-based name with a dual entry condition (time elapsed *or* human acknowledgement) so it is true however it was reached.

3. **Replace `Ignore` with `Archive`, and put the recall condition in the definition.** "Archive an issue to move it out of the issue stream and pause alerts on it **until the issue gets worse**." The rename describes where the thing went instead of how the user feels; the subordinate clause removes the anxiety of dismissing something that might matter. And parameterise the dismissal by *impact* as well as by time: `Until it occurs a set number of times` · `Until a set number of users are affected`.

4. **Keep status and priority as two orthogonal axes, and derive priority from something the user already produces.** Sentry's `High`/`Medium`/`Low` come from the log levels (`ERROR`, `FATAL`, `WARNING`, `DEBUG`, `INFO`) the developer already wrote in their own code — zero configuration, and the vocabulary is already familiar. Then document the manual-override lockout: "once an issue's priority has been changed manually, it will no longer be automatically adjusted."

5. **Disambiguate near-identical options with a worked example carrying concrete values.** The three release-scoped resolve options (`The next release` / `The current release` / `Another existing release`) each get a use-when clause and an example with real version numbers: "Fix shipped in `2.4.1` — leftover `2.4.0` events stay quiet; `2.4.2+` can regress it." Whenever options differ only semantically, prose alone will not separate them; a scenario with values will.

6. **Encode uncertainty in the feature's name, not only in its copy.** `Suspect Commit` names a person as the probable cause of a production error, and the noun itself is the hedge. Supported by `potentially having caused` and `suggested as an assignee`. Any feature that attributes blame algorithmically should carry its confidence in the label.

7. **Enumerate every implicit subscription trigger *and* every implicit unsubscribe trigger.** Six ways in, three ways out, published as adjacent lists. Implicit subscription is the largest source of "why am I getting this email?" in collaborative products, and the only content fix is a complete inventory the user can reason backwards from.

8. **Publish the ranking algorithm's weighting, including a half-life.** "an exponential decay factor halves the weight every 12 hours", with `currently` as the hedge. A concrete, checkable statement about why a list is ordered the way it is. Pair it with an honest admission where the algorithm is opaque (`Recommended`: "combines a variety of signals") rather than inventing an explanation.

9. **Answer the billing question inside the conceptual explanation.** The `Issues and Event Quotas` callout ("Your quota is consumed by *events*, not *issues*") sits immediately after the paragraph explaining that events group into issues — because that paragraph is what raises the question. Anticipate the commercial anxiety at the moment the model creates it, not on a separate pricing page.

10. **Write alt text that carries the technical content of a screenshot.** "Sentry issue detail page for a fatal read ETIMEDOUT error on a GET /api/projects request… Includes stack trace, user impact, and code snippet with a new Pool() initialization lacking timeout settings." A non-sighted developer evaluating the product receives the same evidence as a sighted one. Expensive to write, and the only correct answer for a product whose screenshots *are* the argument.

11. **The anti-pattern: freehand incident updates.** Sentry produced the best single incident sentence in this batch ("Error ingestion is fully operational. We are currently working on recovering real-time processing of spans.") and also a `Resolved` update whose body says mitigation is ongoing, four duplicate consecutive updates, and three grammatical styles across four incidents. Twilio's rigid template (file 027) never reaches Sentry's high point and never produces its low point. **If you can only have one, take the template** — then let the region, data type, and partial-recovery details be the variable content inside it.

## Caveats & gaps

- **No help-centre article titles were retrieved.** The three collections hold 382 + 260 + 143 = 785 articles and only the collection names, scope lines, and counts are recorded. T11 is structural only. This is the largest gap in the file: article-title grammar and task phrasing — the single highest-signal artefact in a help centre — are entirely unexamined.
- **`sentry.io/security/` and `sentry.io/trust/` were not fetched.** T10's compliance findings come from comparison-table rows (`SOC2`, `ISO 27001`, `HIPAA Security`, `BAA`, `Data Residency`, `Relay`, `Manage PII`) and from the homepage security block. My criticism of the homepage block ("industry-standard tech and practices" as a non-claim) is a criticism **of that block**, not of Sentry's compliance posture, which may well be fully documented on the two pages I did not read. Flagged deliberately so the finding is not over-read.
- **`docs.sentry.io/concepts/key-terms.md` was not fetched**, so Sentry's own definitions of its key terms are not in this file. T13's table is my inference from consistent usage across eight pages. Sentry does publish a concepts page and it should be read before this file's terminology section is cited as authoritative.
- **`Escalating Issues Algorithm`** (`/product/issues/states-triage/escalating-issues.md`) was not fetched. The forecasting mechanism behind the `Escalating` status — the most distinctive state in the model — is referenced here only as it is summarised on the parent pages.
- **All in-product UI is unobserved.** Every issue-stream string, badge, toast, empty state, confirmation dialog, and validation message is behind auth. Where in-product copy appears here (`Archive`, `Resolve`, `Delete and Discard Forever`, `Share Issue`, `View More Events`, `Claim Unassigned Issues I've Resolved`) it is `[documented]` from a docs description and marked as such. **Notably, Sentry publishes an unauthenticated live demo at `sandbox.sentry.io` with scenario parameters** — that is the obvious next harvest step for this product and would convert most of T6, T7, and T8 from `[documented]` to `[observed]`. I did not enter it because it was outside the fetch list.
- **T8 is effectively empty.** The only empty states recorded are Statuspage-supplied and shared with files 027 and 028. Sentry's own empty states — "no issues", "all caught up", "no events match this search" — are exactly the copy an error-monitoring product should be judged on and none was reachable.
- **T12 is a genuine `[absent]`**, not a retrieval failure. The pricing page rendered in full, calculator and comparison table included, and contains no FAQ.
- **The pricing comparison table's checkmark cells did not render as text.** Rows such as `Ownership Rules`, `Code Owners`, `Suspect Commits`, `Anomaly Detection`, `SSO: SAML2`, `BAA` show a section header and no per-tier values in the extracted DOM. I have therefore **not** stated which tier includes which of these features, only that the rows exist. (This same gap is what makes me flag it as an accessibility defect in T14 — but I cannot distinguish "icon-only, inaccessible" from "icon stripped by the fetch". The claim in T14 is marked as conditional on that.)
- **Status-page capture is a point-in-time snapshot** (2026-09-21) with `All Systems Operational` and four incidents plus one maintenance in the 90-day window. Component names, the severity legend, and the two lifecycle stage sets are durable; the specific incident bodies are a sample of four and my characterisation of Sentry's incident *style* rests on roughly fifteen update bodies. A longer history (`/history`) was not fetched.
- **Statuspage-supplied strings are shared with files 027 (Twilio) and 028 (Postman)** — the severity legend, uptime-graph empty states, subscription-form copy, and the `Resend OTP in:  seconds` defect are vendor copy. Analysed once in file 028; cross-referenced rather than repeated here.
- **No published content style guide or voice-and-tone documentation found.** Searched docs, marketing, and the developer site links. All T14 findings are inferred from shipped copy. Sentry's voice is distinctive enough that I am confident it is governed by *something*, but nothing public states the rules.
- The install switcher's 23 framework tabs were read in full for their prose lead-ins; the code samples themselves are not content artefacts for this corpus and are not analysed beyond the one-command claim.
- Locale: en-US only. No locale switcher was found on any Sentry surface, which is itself notable for a product of this scale.

## Sources

1. https://sentry.io/welcome/
2. https://sentry.io/pricing/
3. https://docs.sentry.io/
4. https://docs.sentry.io/product/issues/
5. https://docs.sentry.io/product/issues/states-triage.md
6. https://docs.sentry.io/product/issues/issue-priority.md
7. https://docs.sentry.io/product/issues/issue-details.md
8. https://docs.sentry.io/product/notifications.md
9. https://status.sentry.io/
10. https://help.sentry.io/ — redirects to https://www.sentry.help/en
