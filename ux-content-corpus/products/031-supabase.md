# 031. Supabase

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Backend-as-a-service / managed Postgres platform (open-source Firebase alternative) |
| Primary URL | https://supabase.com/ |
| Corpus rank | 031 |
| Benchmark strength (source list) | Developer onboarding and documentation |
| Locale / market observed | en-US only (no locale switcher found on any surface) |
| Platform observed | Web (marketing), docs, Atlassian Statuspage |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | SOC 2 Type 2, HIPAA (BAA required, Team/Enterprise only), ISO 27001, GDPR with DPA and in-region EU hosting; PCI handled via Stripe (Level 1 Service Provider); explicit **shared responsibility model** |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Full — everything targeted rendered server-side, including a live incident timeline. Dashboard UI strings remain `[documented]` |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://supabase.com/ | Hero, seven product cards, social proof, footer (17 `Solutions` entries) |
| Pricing | https://supabase.com/pricing | Four tiers, compute add-on sizes, 9 FAQ questions, spend-cap language |
| Security & Compliance | https://supabase.com/security | Four-section structure, shared-responsibility framing, security newsletter |
| Docs home | https://supabase.com/docs | Seven-section IA, an **agent-prompt block** as the primary onboarding artefact |
| Getting Started | https://supabase.com/docs/guides/getting-started | 20 framework quickstarts, each with a hand-written one-line scope |
| **Troubleshooting index** | https://supabase.com/docs/guides/troubleshooting | **~200 entries, each tagged with error code(s) and product area — richest single artefact in this batch** |
| **Auth Error Codes** | https://supabase.com/docs/guides/auth/debugging/error-codes | ~80 snake_case error codes with verbatim descriptions |
| Production Checklist | https://supabase.com/docs/guides/deployment/going-into-prod | Three-outcome checklist, auth rate-limit table |
| Status | https://status.supabase.com/ | 11 components + 17 regions, 5 incident states, live multi-week incident |

---

## T1 Navigation & IA labels

**Marketing nav is collapsed behind `Open main menu`** `[observed]` — the
desktop nav is client-rendered and the served HTML exposes only the toggle
label. Nav items are therefore `[absent]`; the footer is the only reliable
marketing IA on this harvest.

**Footer — six columns, and one of them is enormous** `[observed]`

| Column | Notable contents |
|---|---|
| `Product` | `Pricing` · `Database` · `Auth` · `Functions` · `Realtime` · `Storage` · `Vector` · `Cron` · `Feature Catalog` · `Launch Week` |
| `Solutions` | **17 entries** — see below |
| `Resources` | `Blog` · `Support` · `System Status` · `Become a Partner` · `Partner Catalog` · `Brand Assets` · `Security & Compliance` · `Regions` · `SOC2` · `HIPAA` |
| `Developers` | `Documentation` · `Supabase Library` · `Changelog` · `RSS` |
| `Community` | `Events & Webinars` · `SupaSquad` · `Contributing` · `Open Source` · `DevTo` |
| `Company` | `Company` · `Careers` · `General Availability` · `Legal Hub` · `Privacy Policy` · `Acceptable Use Policy` · `Humans.txt` · `Lawyers.txt` · `Security.txt` · `Contact Us` |

**The `Solutions` column is the most revealing IA artefact on the site:**

`AI Builders` · `No Code` · `Beginners` · `Developers` · `Postgres Devs` ·
`Vibe Coders` · `Hackathon Contestants` · `Startups` · `Agencies` ·
`Enterprise` · `Innovation Teams` · `Hosted Postgres` · `B2B SaaS` ·
`FinServ` · `Healthcare` · `Agents` · `Switch from Firebase` ·
`Switch from Neon`

Three axes are collapsed into one list: **skill level**
(`Beginners`, `Postgres Devs`, `Vibe Coders`, `No Code`), **org type**
(`Startups`, `Agencies`, `Enterprise`, `Innovation Teams`), and **industry**
(`FinServ`, `Healthcare`, `B2B SaaS`). Plus two competitor-displacement pages.
`Vibe Coders` and `Hackathon Contestants` as named market segments with their
own landing pages is a real positioning decision recorded in nav. `Beginners`
sitting level with `Enterprise` is the clearest statement of who Supabase now
thinks its buyer is.

**Two competitor-switch pages named by competitor** `[observed]`:
`Switch from Firebase`, `Switch from Neon`. The verb is `Switch`, not
"Migrate" or "Compare" — a decision, not a research task.

**Legal transparency files exposed in footer** `[observed]`:
`Humans.txt`, `Lawyers.txt`, `Security.txt`. `Lawyers.txt` is a Supabase
invention — a `humans.txt` for legal contacts — and shipping it as a nav link
is a deliberate open-source-culture signal.

**Docs nav — six items, five of them not links** `[observed]`

`Start` · `Products` · `Build` · `Manage` · `Reference` · `Resources`

Only `Start` resolves to a URL in the served HTML; the other five are
client-rendered menus. The split is worth recording as intent:
**`Products` / `Build` / `Manage` / `Reference` / `Resources` is a
five-way split by what kind of thing you need**, not by product — with
`Build` and `Manage` separating the day-one reader from the day-100 one.

**Docs home sections — seven, each a verb phrase with a scope line** `[observed]`

| Section | Scope line (verbatim) |
|---|---|
| `Connect a framework` | "Start with a quickstart guide to connect your project in minutes." |
| `Build your backend` | "Build with a complete backend platform, from your database to your application logic." |
| `Extend your database` | "Extend your database with built-in tools for AI, APIs, scheduled jobs, and queues." |
| `Use a client library` | "Use Supabase from the language and framework your application is built with." |
| `Migrate to Supabase` | "Bring your existing data, auth and storage to Supabase following our migration guides." |
| `Explore more` | "Explore the tools, integrations, and guides that help you get more from Supabase." |
| `Self-host Supabase` | "Get started with self-hosting Supabase." |

**Every section heading is an imperative verb the reader performs**, and each
scope line begins with the same verb as its heading (`Build…`, `Extend…`,
`Use…`, `Explore…`). Mechanical, but it makes the page scannable by verb
alone. `Migrate to Supabase` as a top-level docs-home section — with twelve
named source systems including `Heroku` and `Render`, two other products in
this batch — is competitive IA placed inside documentation.

`Self-host Supabase` as the **final** docs-home section is notable: the
open-source escape hatch is present, prominent, and last.

**Per-page docs furniture** `[observed]`: `Skip to content` ·
`Search docs...` · `Main menu` · breadcrumb-style context label ·
`Edit this page on GitHub` · `AI Tools` block · and a three-item
**routing footer that appears on every single docs page**:

> `Need some help?` → `Contact support`
> `Latest product updates?` → `See Changelog`
> `Something's not right?` → `Check system status`

Three questions in the user's voice, each with one destination. `Something's
not right?` is the standout — it is the sentence a user actually thinks, and it
routes to the status page rather than to support. **Pre-empting "is it me or
is it them?" on every documentation page** is the single cheapest and best IA
decision in this file.

## T2 Value proposition & headline patterns

**Hero — a two-clause promise spanning two orders of magnitude** `[observed]`

> Headline: `Build in a weekend` / `Scale to millions`
> Subhead: "Start your project with a Postgres database. Add Authentication,
> Data APIs, Edge Functions, Realtime Data, Storage, and Vector embeddings."

Four words, then four words. The headline names **two moments of the reader's
life** rather than a product attribute, and the gap between them is the whole
argument. It is repeated verbatim as the closing CTA header
(`Build in a weekend, scale to millions`) — this time comma-joined rather than
line-broken, so the same words work as a couplet at the top and a sentence at
the bottom.

The subhead is a **list, not a claim**: one sentence naming the database, then
six additive nouns. `Start your project with…` then `Add…` — the mental model
of a platform you accrete, delivered in two verbs.

**Product cards use bolded verb phrases inside plain sentences** `[observed]`

- `Postgres Database` — "Every project is **a full Postgres database**, the
  world's most trusted relational database."
- `Authentication` — "**Add user sign ups and logins**, securing your data with
  Row Level Security."
- `Edge Functions` — "Easily write custom code **without deploying or scaling
  servers.**"
- `Storage` — "**Store, organize, and serve** large files, from videos to
  images."
- `Realtime` — "**Build multiplayer experiences** with real-time data
  synchronization."
- `Vector` — "Integrate your favorite ML-models to **store, index and search
  vector embeddings**."
- `Data APIs` — "Instant ready-to-use **REST APIs**."

The bold always falls on **the thing the developer gets**, never on the
adjective. Two of the seven bold a negation of work (`without deploying or
scaling servers`), which is the Heroku move applied at feature level.

**The platform-vs-suite tension is addressed in one line** `[observed]`:
`Use one or all. Best of breed products. Integrated as a platform.` Three
fragments, each answering a different objection (commitment, quality,
coherence). Fourteen words doing the work of a comparison table.

**Section headers are second-person outcomes** `[observed]`

`Stay productive and manage your app without leaving the dashboard` ·
`Use Supabase with React` (framework-templated) ·
`Kickstart your next project with production ready templates` ·
`How industry leaders are building with Supabase` · `Join the community` ·
`Open source from day one`

**The open-source section is the only one written as a belief statement**
`[observed]`: "Supabase is built in the open because we believe great developer
tools should be transparent, inspectable, and owned by the community. Read,
contribute, self-host. You're never locked in, and always in control." Note the
three-verb imperative fragment (`Read, contribute, self-host.`) followed by the
lock-in negation. This paragraph is doing the work that a competitor-comparison
page would otherwise do.

**Pricing headline** `[observed]`:
`Predictable pricing, designed to scale`, subhead "Start building for free,
collaborate with your team, then scale to millions of users." The subhead maps
one-to-one onto the three self-serve tiers (Free → Team → scale), so the
sentence *is* the plan ladder.

**Security headline** `[observed]`: `Security at Supabase`, subhead "Supabase is
trusted by thousands of developers for building and deploying secure
applications." A weak, generic pairing compared with everything else on the
site — and the H2 is styled as the subhead, so the page's real structure
(`Compliance` / `Data` / `Configuration` / `Misc`) starts at H3.

**Social proof is verbatim tweets, including grammatical informality** `[observed]`

Fifteen quoted posts are reproduced with their original register —
"Almost too easy! Highly recommend.", "Supabase is really good. ⚡",
"why did I wait so long? 😅", "Run supabase locally and just wow in silence!".
One misspells the product name ("I've always used Supabase just as a
database…" is fine, but another reads "Run supabase locally"). Supabase
publishes lowercase mentions and typos of its own name rather than cleaning
them — the unedited quality *is* the credibility device.

Customer-story one-liners follow a rigid **outcome-with-number** shape:
"Powering millions of AI-generated apps with a complete Supabase backend." ·
"Empowering 2,000+ employees to build production software with AI." ·
"Migrated critical infrastructure from MongoDB with zero downtime." ·
"Scaled from zero to $10M ARR on a single Postgres-backed platform." ·
"From first line of code to fully licensed fintech in three months."

Five for five carry a quantity or a named competitor displaced. The last two
are **sentence fragments beginning with a preposition or a verb**, with no
subject — a compressed headline register.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start your project` | Hero, and again at page foot | Primary. Possessive, not "Sign up" |
| `Request a demo` | Beside `Start your project`, both placements | Enterprise path offered at the same weight as self-serve |
| `Start for Free` | Pricing, Free tier | **Title-case `Free`** |
| `Get Started` | Pricing, Pro and Team tiers | Same label on two different tiers |
| `Contact Us` | Pricing, Enterprise tier | |
| `See how pricing scales` | Pricing, under Pro | Anchor link to the compute add-on table — names the anxiety |
| `Read docs for React` | Home, code sample | Framework name interpolated |
| `View all examples` | Home, templates | |
| `Read the story →` | Customer cards | Arrow glyph in the label |
| `More customer stories` | Social proof | |
| `Join us on Discord` | Community | Names the platform |
| `View on GitHub` | Open-source section | |
| `More on Security` | Footer, above the badge row | |
| `Subscribe` | Footer newsletter, and security newsletter | Two different lists, one label |
| `Skip to content` | First in DOM, both marketing and docs | Accessibility |
| `Open main menu` | Marketing header | |
| `Search docs...` | Docs header | Placeholder-as-label |
| `Copy as Markdown` | Docs pages **and the pricing page** | See T14 |
| `Ask ChatGPT` / `Ask Claude` | Docs pages and pricing page | **Named third-party assistants as first-class CTAs** |
| `Connect your AI agent` | Docs `AI Tools` block | |
| `Show more` | Docs home agent-prompt block | Progressive disclosure on a code block |
| `Edit this page on GitHub` | Every docs page | |
| `Contact support` | Docs routing footer, every page | |
| `See Changelog` | Docs routing footer | |
| `Check system status` | Docs routing footer | |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Subscribe via Slack` | Status page | |
| `View historical uptime.` | Status page | **Trailing full stop inside the link text** |
| `← Incident History` | Status page foot | Arrow glyph, leading |
| `Resend OTP` | Status page subscribe modal | |
| `Change number` / `Edit number` | Status subscribe modal | **Two labels for one action in one modal** |
| `Explore more resources` | Docs home, migration section | |
| `More on self-hosting` | Docs home | |
| `Can't find the answer to your question?` | Pricing FAQ foot | A question used as the escalation CTA |

**Observation.** `Ask ChatGPT` / `Ask Claude` / `Copy as Markdown` appear on
docs pages *and* on the pricing page. Supabase treats **its commercial pricing
page as a document meant to be fed to an LLM** — including a pre-built
`Read from https://supabase.com/pricing so I can ask questions about its
contents` prompt. No other product in this batch does this on a pricing page.

Supabase ships almost no bare `Learn more`; the exceptions
(`View all examples`, `More customer stories`) sit in contexts where the
surrounding heading supplies the object.

## T4 Onboarding & getting-started

**The primary onboarding artefact on the docs home is a prompt for an AI
agent, not instructions for a human** `[observed]`

Under the H1, before any link list, sits a block labelled `Agent Prompt` with a
`CLI` tab and a copyable four-step prompt:

> "Help me get set up with Supabase. Do the following:
> 1. Install the Supabase CLI as a project dev dependency with
>    `npm install supabase --save-dev`, so the version is pinned per project.
> 2. Install the Supabase Plugin with
>    `npx plugins add supabase-community/supabase-plugin`.
> 3. Review my project and determine whether Supabase is already initialized.
>    If it is not initialized, run `npx supabase init`.
> 4. Suggest the most relevant next steps."

This is genuinely novel and worth dwelling on. The steps are written **in the
second person addressed to a coding agent** ("Review **my** project"), the
*reason* for a choice is embedded in the instruction ("so the version is
pinned per project") so the agent can explain it, step 3 is **conditional**
rather than imperative, and step 4 delegates the routing decision back to the
agent. A `Show more` control truncates it, and a copyable shell snippet sits
beneath.

**The content-design implications:** the onboarding's reader is no longer the
developer, it is the developer's tool. Rationale has to be inline (the agent
cannot follow a link), state has to be checked not assumed, and the last step
has to hand control back. Three of those four are also better practice for
human readers.

**Framework-first onboarding, 20 entry points, each with a hand-written
scope line** `[observed]`

The `Getting Started` page lists twenty framework quickstarts, and — unusually
— **no two scope lines are templated.** Each names the framework's own idiom
and how it meets Postgres:

- `React` — "Build single-page apps from reusable components, and query
  Supabase Postgres from the browser."
- `Next.js` — "Full-stack React with server rendering, wired to Supabase
  Postgres and cookie-based auth."
- `TanStack Start` — "Type-safe full-stack React that queries Supabase Postgres
  in server functions."
- `Astro` — "Content-driven sites that render on the server and pull Supabase
  Postgres data per request."
- `Vue` — "Build single-page apps with the Vue composition API, backed by
  Supabase Postgres."
- `Nuxt` — "Full-stack Vue with server rendering, reading Postgres through a
  Supabase composable."
- `SvelteKit` — "Full-stack Svelte that loads Supabase Postgres data in server
  load functions."
- `SolidJS` — "Fine-grained reactive UIs that load Supabase Postgres data with
  Solid resources."
- `Refine` — "Scaffold CRUD dashboards and admin panels straight from your
  Supabase Postgres tables."
- `Hono` — "Lightweight web APIs with Supabase Auth anonymous sign-in and
  RLS-protected reads."
- `Laravel` — "Full-stack PHP with Eloquent ORM connected directly to your
  Supabase Postgres database."
- `Ruby on Rails` — "Convention-driven Ruby apps with Active Record connected
  directly to your Supabase Postgres database."

Each line uses the framework's *native vocabulary* — `composable` for Nuxt,
`server load functions` for SvelteKit, `resources` for Solid, `Eloquent ORM`
for Laravel, `Active Record` for Rails, `convention-driven` for Rails
specifically. **The reader is addressed in the dialect they already speak.**
This is expensive content (20 bespoke lines, maintained) and it is the clearest
demonstration of the "developer onboarding" benchmark strength.

Note the label drift between the two surfaces: docs home says `Python`, the
Getting Started sidebar says `Flask (Python)`, and the card body says "Serve
Flask web apps…". Three names for one quickstart.

**Onboarding is tiered into three named formats** `[observed]`

| Format | Promise | Count |
|---|---|---|
| `Framework quickstarts` | "connect your project in minutes" | 20 |
| `Web app demos` | "Learn how to build a user management app with X and Supabase Database, Auth, and Storage functionality." | 9 |
| `Mobile tutorials` | same sentence, mobile frameworks | 7 |

The `Web app demos` and `Mobile tutorials` scope lines are **completely
templated** — one sentence with the framework name swapped, nine and seven
times. So Supabase spends bespoke copy on the 20 quickstarts (the acquisition
moment) and templates the 16 tutorials (the deepening moment). A defensible
allocation, and visible in the copy.

The single exception in the templated set is
`Android Kotlin` — "Learn how to build a **product** management app" where
every sibling says "user management app". Either a deliberate variation or a
drift; nothing on the page says which.

**`Use cases` shelf, three items, no framework** `[observed]`:
`AI, Vectors, and embeddings` · `Subscription Payments (SaaS)` ·
`Partner Gallery`. The second and third link straight to **GitHub repos, not
docs** — the getting-started page routes out of the documentation entirely.

**Production onboarding is a separate, outcome-framed checklist** `[observed]`

`Production Checklist` opens by naming three outcomes as links, in the second
person, phrased as properties of the reader's project:

> "you should run through this checklist to ensure that your project:
> - Is secure
> - Won't falter under the expected load
> - Remains available whilst in production"

Then five sections: `Security` · `Performance` · `Availability` ·
`Deployment` · `Rate limiting, resource allocation, & abuse prevention`.

`Won't falter under the expected load` is doing real work — "falter" is a
softer, more honest verb than "scale", and `the expected load` scopes the claim
to the reader's own forecast rather than promising unbounded capacity.

Two of the checklist items are unusual for a vendor to write:

- "Consider how *you* might abuse your service as an attacker, and take steps
  to mitigate it." — the only italicised word on the page, and an instruction
  to adopt an adversarial stance toward one's own product
- A link to a **competitor's security documentation** (`auth0.com/docs/security`)
  for "these common cybersecurity threats"

**Progress language** `[absent]` — no step counts, no percentage, no
"Step 1 of 4" anywhere. Checkbox-style bullets on the production checklist;
numbered steps only inside the agent prompt.

## T5 Form & field labels

`[observed]` on the status page's subscription flow, which is the only
substantial public form:

| Label | Notes |
|---|---|
| `Email address:` | Trailing colon |
| `Enter OTP:` | |
| `Resend OTP in:  seconds` | **Renders with the interval value missing** — a double space where the number should be. A live interpolation defect |
| `Didn't receive the OTP?` | Followed by `Resend OTP` |
| `Country code:` | ~190-entry select |
| `Phone number:` | |
| `Change number` / `Edit number` | Two labels, same modal |
| `Channel's Webhook URL:` | Teams integration; possessive apostrophe |
| `Webhook URL:` | Hint: "The URL we should send the webhooks to" |
| `Email address:` (webhook) | Hint: "We'll send you email if your endpoint fails" |
| `VIA EMAIL:` / `VIA SMS:` | All-caps section labels in the incident modal |
| `Enter mobile number` | **No colon, unlike its siblings** |
| `Enter the OTP sent` | |
| `First Name` / `Last Name` / `Email Address` | Security newsletter; title case, no colons |

Two things worth recording. The **hint text is written as the system's own
statement of intent** — "The URL we should send the webhooks to", "We'll send
you email if your endpoint fails" — first person plural, explaining what the
company will do with the value rather than what format it wants. That is a
better hint register than a format example.

And the **colon convention is inconsistent across one page**:
`Email address:` (Statuspage boilerplate) vs `Enter mobile number` (no colon)
vs `First Name` (Supabase's own form, title case, no colon). The status page is
a third-party surface (Atlassian Statuspage) and the seam is visible.

**Dashboard field paths are quoted in docs** `[documented]`, and they are the
real field layer:

`Database > Tables` · `Database > Policies` · `Database > Publications` ·
`Database > Settings > SSL Configuration` ·
`Database > Settings > Network Restrictions` ·
`Authentication > Providers` · `Authentication > Rate Limits` ·
`Authentication > Emails > SMTP Settings` · `Settings > Add-ons` ·
`Organization > Team` · `Settings > Integrations` · `General settings` ·
`Restart project` (button, quoted in a status-page update) ·
`Deploy to production` (toggle) · `Security Advisor` ·
`Performance Advisor` · `Table Editor` · `SQL Editor` · `RLS Policies`

`Security Advisor` and `Performance Advisor` are **named in-product linting
surfaces**, and the Production Checklist opens each of its first two sections by
routing to one. A tweet on the home page confirms users recognise them by name:
"I love @supabase's built-in Advisors. The security and performance linters
improve everything…".

## T6 Status & state language

**Incident lifecycle — five named states, observed live** `[observed]`

| State | Meaning in use |
|---|---|
| `Investigating` | Cause unknown; "We are investigating." |
| `Identified` | Cause known, fix not shipped |
| `Update` | A progress post that changes nothing about the state |
| `Monitoring` | Fix deployed, watching |
| `Resolved` | Closed |

Maintenance uses a **separate and different five-state vocabulary**:
`Scheduled` → `In progress` → `Update` → `Verifying` → `Completed`.

Note that maintenance ends at `Completed`, not `Resolved` — Supabase
distinguishes "we finished what we planned" from "the problem went away". And
`Verifying` has no incident equivalent; planned work gets a checking step that
unplanned work does not. That asymmetry is correct and rarely made explicit.

**Component status vocabulary — five levels, all five rendered in the legend**
`[observed]`

`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`

Also present as historical-day labels: `Major outage` / `Partial outage`
(sentence case, **inconsistent with the title-case legend**), plus
`No downtime recorded on this day.` and `No data exists for this day.`

**`No data exists for this day.` vs `No downtime recorded on this day.`** is a
genuinely good distinction — absence of a problem and absence of measurement
are different claims, and the uptime graph says which. Most status pages render
both as a grey square.

**11 named components, plus 17 regions under one of them** `[observed]`

`Compute capacity` (expands to 17 AWS region rows: `ap-northeast-1`,
`ap-northeast-2`, `ap-south-1`, `ap-southeast-1`, `ap-southeast-2`,
`ca-central-1`, `eu-central-1`, `eu-central-2`, `eu-north-1`, `eu-west-1`,
`eu-west-2`, `eu-west-3`, `sa-east-1`, `us-east-1`, `us-east-2`, `us-west-1`,
`us-west-2`) · `Analytics` · `API Gateway` · `Auth` ·
`Connection Pooler` · `Dashboard` · `Database` · `Edge Functions` ·
`Management API` · `Realtime` · `Storage`

The component names are **exactly the product names from the marketing site**
(`Auth`, `Storage`, `Realtime`, `Database`, `Edge Functions`) plus four
infrastructure layers. A user who knows what they bought knows which row to
read. `Connection Pooler` is the one component named by function rather than by
its product name (`Supavisor`) — see T13.

Each non-region component carries a `?` affordance (a tooltip, not in server
HTML), so definitions exist but were not captured. `[absent]` for the tooltip
copy.

`System Metrics` are published as three named latency series:
`REST API Latency (Singapore)` · `(North Virginia)` · `(Frankfurt)` — **city
names, not region codes**, unlike the component rows directly above which use
`ap-southeast-1` / `us-east-1` / `eu-central-1`. Two naming systems for one set
of places, on one page, 200 pixels apart.

**Project states, from docs and troubleshooting titles** `[documented]`

- `paused` — the central Free-tier state. "Free projects are paused after
  1 week of inactivity." Docs elsewhere: "We may pause applications on the Free
  Plan that exhibit low activity in a 7-day period to save on server
  resources." **Two different durations for the same rule ("1 week" vs
  "a 7-day period") and two different triggers ("inactivity" vs "low
  activity")** — recorded as an inconsistency
- `restore` — the inverse verb ("You can restore paused projects")
- Troubleshooting confirms paused is a long-lived state with its own tail:
  `How To Restore a Project Paused for More Than 1 Year`
- `Pausing Pro-Projects` — pausing is also a *user action*, not only a platform
  action, so one word covers both a punishment and a feature
- `unhealthy` — `Project Status reports unhealthy services`
- `MIGRATIONS_FAILED` — a branch state:
  `Troubleshooting MIGRATIONS_FAILED: missing tables or an incomplete schema on
  your branch`
- `TIMED_OUT` — a Realtime connection state:
  ``Realtime connections giving `TIMED_OUT` errors``
- `suspended` — a quota consequence:
  `Realtime: Project suspended for exceeding quotas`
- `Circuit breaker open` — a pooler state:
  `Supavisor error: 'Circuit breaker open' after password rotation`

**Four different registers for "not working" in one state vocabulary** —
`paused` (benign, reversible, billing-driven), `suspended` (punitive,
quota-driven), `unhealthy` (diagnostic), and `FAILED` / `TIMED_OUT`
(machine-facing SCREAMING_SNAKE). A user cannot infer severity from the word
without knowing the subsystem.

**Live incident, observed mid-flight** `[observed]` — the harvest caught
`401 errors due to JWT rejections`, open since `Aug 14, 2026` and still
unresolved on `Sep 21`. Fourteen updates over five weeks. This is the richest
incident-communication sample in this batch and is analysed in T9.

## T7 Error, failure & recovery

The strongest category for this product, with two distinct and complementary
systems.

### 7a. The Auth error-code taxonomy — ~80 snake_case codes

**The naming scheme is lowercase snake_case describing the condition, not a
number** `[observed]`. Supabase states the contract up front: errors from the
server "always have a `code` property", plus a `status` carrying the HTTP code.

Full inventory `[observed]`:

`anonymous_provider_disabled` · `bad_code_verifier` · `bad_json` · `bad_jwt` ·
`bad_oauth_callback` · `bad_oauth_state` · `captcha_failed` · `conflict` ·
`email_address_invalid` · `email_address_not_authorized` ·
`email_conflict_identity_not_deletable` · `email_exists` ·
`email_not_confirmed` · `email_provider_disabled` · `flow_state_expired` ·
`flow_state_not_found` · `hook_payload_invalid_content_type` ·
`hook_payload_over_size_limit` · `hook_timeout` · `hook_timeout_after_retry` ·
`identity_already_exists` · `identity_not_found` · `insufficient_aal` ·
`invalid_credentials` · `invite_not_found` · `manual_linking_disabled` ·
`mfa_challenge_expired` · `mfa_factor_name_conflict` · `mfa_factor_not_found` ·
`mfa_ip_address_mismatch` · `mfa_phone_enroll_not_enabled` ·
`mfa_phone_verify_not_enabled` · `mfa_totp_enroll_not_enabled` ·
`mfa_totp_verify_not_enabled` · `mfa_verification_failed` ·
`mfa_verification_rejected` · `mfa_verified_factor_exists` ·
`mfa_web_authn_enroll_not_enabled` · `mfa_web_authn_verify_not_enabled` ·
`no_authorization` · `not_admin` · `oauth_provider_not_supported` ·
`otp_disabled` · `otp_expired` · `over_email_send_rate_limit` ·
`over_request_rate_limit` · `over_sms_send_rate_limit` · `phone_exists` ·
`phone_not_confirmed` · `phone_provider_disabled` · `provider_disabled` ·
`provider_email_needs_verification` · `reauthentication_needed` ·
`reauthentication_not_valid` · `refresh_token_already_used` ·
`refresh_token_not_found` · `request_timeout` · `same_password` ·
`saml_assertion_no_email` · `saml_assertion_no_user_id` ·
`saml_entity_id_mismatch` · `saml_idp_already_exists` · `saml_idp_not_found` ·
`saml_metadata_fetch_failed` · `saml_provider_disabled` ·
`saml_relay_state_expired` · `saml_relay_state_not_found` ·
`session_expired` · `session_not_found` · `signup_disabled` ·
`single_identity_not_deletable` · `sms_send_failed` ·
`sso_domain_already_exists` · `sso_provider_not_found` ·
`too_many_enrolled_mfa_factors` · `unexpected_audience` ·
`unexpected_failure` · `user_already_exists` · `user_banned` ·
`user_not_found` · `user_sso_managed` · `validation_failed` · `weak_password`

**Structural analysis.** The codes are morphologically regular and the
morphology carries meaning:

| Suffix / prefix pattern | Meaning | Examples |
|---|---|---|
| `_disabled` / `_not_enabled` | Configuration, not failure | `signup_disabled`, `otp_disabled`, `mfa_totp_enroll_not_enabled` |
| `_not_found` | The object is gone | `session_not_found`, `identity_not_found`, `flow_state_not_found` |
| `_expired` | The object timed out | `session_expired`, `otp_expired`, `flow_state_expired` |
| `_exists` / `_already_exists` | Uniqueness violation | `email_exists`, `identity_already_exists` |
| `bad_` | Malformed input | `bad_json`, `bad_jwt`, `bad_oauth_state` |
| `over_` | Rate limit | `over_email_send_rate_limit`, `over_request_rate_limit` |
| `_not_deletable` | A constraint on removal | `single_identity_not_deletable`, `email_conflict_identity_not_deletable` |
| `mfa_` / `saml_` / `hook_` / `sso_` | Subsystem namespace | 9 / 8 / 4 / 2 codes respectively |

**The `_not_found` vs `_expired` pair is the most valuable distinction in the
whole taxonomy**, and Supabase writes both and explains why they differ:
`flow_state_expired` — "PKCE flow state… has expired"; `flow_state_not_found` —
"Flow states expire after a while and are progressively cleaned up, which can
cause this error. **Retried requests can cause this error, as the previous
request likely destroyed the flow state.**" Same visible symptom, two codes,
and the doc explains that a *retry* is itself a cause. That is the kind of
second-order explanation almost nothing ships.

**Descriptions are written as cause + instruction, and the instruction names
who acts** `[observed]`

- Ask the user: "Ask the user to sign in again." (×4) · "Ask the user to wait a
  while before trying again." (×2) · "Ask the user to try again in a few
  minutes." · "Ask the user to enter a new code." · "Ask the user to solve an
  MFA challenge." · "Ask the user to reauthenticate…"
- Fix your own code: "Indicates a bug in the implementation of the client
  library." · "Check your app for concurrency issues, and if detected, back off
  exponentially." · "Check your CAPTCHA integration." · "Check your server's
  configuration." · "Check your SMS provider configuration."
- Blame a third party: "Indicates an issue with the OAuth provider or client
  library implementation." · "Check the provider's attribute mapping and/or
  configuration."
- Nobody's fault: `unexpected_failure` — "Auth service is degraded or a bug is
  present, **without a specific reason**."
- Do something structural: `email_conflict_identity_not_deletable` — "You may
  need to migrate user data to one of their accounts in this case."

**The second-person addressee is consistently the *developer*, and the
third-person "the user" is the developer's user.** Supabase writes error docs
for the person holding the SDK, never collapsing the two. This is the correct
and surprisingly rare choice for a BaaS.

**One description names a specific framework bug as the likely cause**
`[observed]`: `over_request_rate_limit` — "Sometimes can indicate a bug in your
application that mistakenly sends out too many requests (**such as a badly
written useEffect React hook**)", with a link to React's own docs. A vendor
diagnosing the customer's most common self-inflicted wound, by name.

**Deprecation is marked inline** `[observed]`:
`unexpected_audience` — "(Deprecated feature not available via Supabase client
libraries.)". Admin-only codes carry `(Admin API.)` as a leading parenthetical
— five of them. **Scope is encoded as a prefix in the description**, so a
reader can skip codes they cannot hit.

**HTTP status codes are documented *in the context of Auth*, not generically**
`[observed]` — five entries, each explaining what the standard code means here:

- `403 Forbidden` — "rare situations where a certain Auth feature is not
  available for the user, and you as the developer are not checking a
  precondition"
- `422 Unprocessable Entity` — "request is accepted, but cannot be processed
  because the user or Auth server is in a state where it cannot satisfy the
  request"
- `429 Too Many Requests` — "You should handle this status code often,
  especially in functions that authenticate a user."
- `500 Internal Server Error` — "**Most often it points to issues in your
  database setup** such as a misbehaving trigger on a schema, function, view or
  other database object."
- `501 Not Implemented` — "a feature is not enabled on the Auth server"

The `500` entry is the standout: Supabase redirects the most self-incriminating
status code toward the most likely actual cause (the customer's own database
trigger) without evading responsibility for the remainder. And `422`'s "in a
state where it cannot satisfy the request" is a precise, non-blaming way to
describe a precondition failure.

**Two explicit best-practice rules close the page** `[observed]`

> "Always use `error.code` and `error.name` to identify errors, not string
> matching on error messages."
> "Avoid relying solely on HTTP status codes, as they may change unexpectedly."

**Supabase tells developers not to depend on its own message strings, and
admits its HTTP codes may change.** This is a *content* commitment stated as an
API contract: the code is stable, the prose is not. Every product with a
user-facing error surface should say this, and almost none do.

**Client-side error classes are named and type-split** `[observed]`, per
language (tabs for `JavaScript` / `Dart` / `Swift` / `Python` / `Kotlin` /
`C#`): `AuthError` (wrapper) → `AuthApiError` (server) vs `CustomAuthError`
(client state), plus `AuthWeakPasswordError` for `weak_password`, and guidance
to use `isAuthApiError` rather than `instanceof`. The **two-type split by
origin** (API vs client) is the first thing the page establishes, before any
code — the reader is taught to ask "whose fault" before "what happened".

### 7b. The troubleshooting index — ~200 entries, tagged by code and area

`[observed]` — this is the largest error corpus in this batch and its
*metadata design* is the finding.

**Every entry carries up to three signals: a title, zero-or-more error-code
chips, and one-or-more product-area chips.**

Product-area chips observed: `Database` · `Auth` · `Platform` · `Functions` ·
`Storage` · `Realtime` · `Supavisor` · `Studio` · `Cli` · `Self-hosting` ·
`Branching` · `Api` · `Ai`. Entries carry up to **seven** simultaneously
(`All about Supabase Egress` is tagged
`Platform Database Functions Storage Realtime Auth Supavisor`).

Error-code chips draw from **five different code systems at once**:

| System | Examples |
|---|---|
| Postgres SQLSTATE | `42501`, `42P01`, `40001`, `28P01`, `HV000` |
| HTTP status | `400`, `401`, `402`, `403`, `404`, `500`, `503`, `504`, `520`, `540`, `544`, `546`, `5xx` |
| PostgREST | `PGRST002`, `PGRST106` |
| Supabase Auth snake_case | `otp_expired`, `500 unexpected_failure`, `400 bad_request`, `500 server_error`, `401 UNAUTHENTICATED` |
| Named internal codes | `BOOT_ERROR`, `NOT_FOUND`, `NOT_FOUND_FUNCTION_BLOB`, `WORKER_RESOURCE_LIMIT`, `WORKER_LIMIT`, `CONNECT_TIMEOUT`, `EAUTHQUERY`, `ClientPresenceRateLimitReached`, `TooManyChannels`, `TIMED_OUT`, `MIGRATIONS_FAILED`, `UNUSED_EXTERNAL_IMPORT`, `#ZgotmplZ`, `templatemailer_template_body_parse_error` |

**Composite chips pair the transport code with the semantic code** —
`403 42501`, `401 42501`, `500 unexpected_failure`, `503 BOOT_ERROR`,
`546 WORKER_RESOURCE_LIMIT`, `404 NOT_FOUND_FUNCTION_BLOB`. A user holding a
bare `403` and a user holding `42501` land on the same article. **This is the
most reusable idea in the file: tag support content with every identifier the
user might be holding, at every layer of the stack.** One article, five
possible search keys.

Supabase also mints **non-standard HTTP codes in the 5xx range** —
`540`, `544`, `546`, `520` — documented together in a single entry called
`HTTP status codes` tagged `402, 540, 544, 546`. Inventing status codes is a
questionable API decision; documenting them in one addressable place is the
right content response.

One chip list is visibly broken `[observed]`:
`Errors when creating / updating / deleting users` carries
`500 unexpected_failure` **repeated seven times** with a trailing comma.
Several other entries end with a dangling comma (`5xx,`, `546,`). A metadata
rendering defect.

**Title grammar — seven distinct shapes, and the choice tracks what the user
can see**

| Shape | Examples |
|---|---|
| Bare error string, quoted | `Canceling statement due to "statement timeout"` · `FATAL: Password authentication failed` · `error: no pg_hba.conf entry for host "xx.xxx.xxx.xxx", user "postgres"…` |
| `<Subsystem> error: '<string>'` | `Supavisor error: 'Circuit breaker open' after password rotation` · `FDW Wrappers error: 'component verification failed'` · `Edge Function error: 'Rate limit exceeded for trace'` |
| Code + colon + string | `42501 : permission denied for table http_request_queue` · `PGRST106: "The schema must be one of the following..." error` · `SQLSTATE 40001 (serialization_failure) in an RPC function causes infinite retries` |
| `Resolving <code>…` / `Fixing <code>…` | `Resolving 42P01: relation does not exist error` · `Fixing 520 Errors in the Database REST API` · `Fixing the TooManyChannels Error` |
| First-person complaint | `I am not receiving password reset emails for Supabase dashboard` · `Manually created databases are not visible in the Supabase Dashboard` |
| `Why …?` | `Why are my Supabase branches empty?` · `Why is my select returning an empty data array and I have data in the table?` · `Why do I see Auth & API requests in the dashboard? My app has no users` · `Why are there gaps in my Postgres id sequence?` · `Why is my camelCase name not working in Postgres functions or RLS policies?` · `Why can't I upload/list/etc my public bucket?` |
| `How do I …?` / `How can I …?` | `How do I reset my Supabase database password?` · `How can I revoke execution of a Postgres function?` · `How to bypass modification limits` |
| Concept explainer | `RLS Simplified` · `Memory and Swap usage explained` · `Understanding Postgres EXPLAIN Output` · `Supavisor and Connection Terminology Explained` |

**The `Why …?` family is where the real content design lives.** Six of them
describe situations in which *nothing is broken* and the user believes
otherwise:

- `Why is my select returning an empty data array and I have data in the table?`
  — the RLS empty state (see T8). Note the **compound question with "and"**,
  which encodes the user's sense of contradiction into the title
- `Why do I see Auth & API requests in the dashboard? My app has no users` —
  **two sentences in one title**, the second being the user's objection
- `Why are there gaps in my Postgres id sequence?` — expected Postgres
  behaviour that looks like data loss
- `Why is my camelCase name not working…?` — Postgres case-folding, which
  looks like a bug and is a convention
- `Why is my service role key client getting RLS errors or not returning data?`
  — the "but I used the admin key" surprise
- `Why Supabase Edge Functions cannot provide static egress IPs for allow
  listing` — a **capability refusal documented as a question**, with the
  reason. The URL still says `whitelisting` while the title says
  `allow listing`, so the terminology was updated in the copy and not the slug

This is the Wise "gap between system state and user reality" pattern executed
at scale: the troubleshooting index is a **map of every place Supabase's
correct behaviour reads as a failure.**

**A meta-article about how to ask for help** `[observed]`:
`'Formatting support requests for faster resolution'` — Supabase documents its
own intake format as a public troubleshooting entry, tagged `Platform`. The
quotation marks in the title are in the source.

**Named sub-failure explainers** `[observed]`:
`Edge Function shutdown reasons explained` (tagged `546`) — a dedicated article
for the *set of reasons* behind one code, which is the Heroku `cause=` pattern
solved with an article instead of a field.

**Resource-exhaustion entries are titled by symptom, with `exhaust-` slugs**
`[observed]`: `High Disk I/O` (`/exhaust-disk-io`) · `High RAM usage`
(`/exhaust-ram`) · `High swap usage` (`/exhaust-swap`) · `High CPU usage`.
The slug uses the internal word (`exhaust`), the title uses the user's word
(`High`). A deliberate split between machine-facing and human-facing naming,
visible in the URL.

**Freshness is surfaced per entry** `[observed]` — roughly 45 entries carry a
`Sep 21` date chip, i.e. updated the day of harvest. The index doubles as a
recency signal.

**Ecosystem-specific failures are named by partner** `[observed]`:
`Can't Access Supabase Project When Using Lovable Cloud` ·
`Identifying Lovable backend: Lovable Cloud or Supabase` ·
`Supabase project provisioned via Bolt not visible in dashboard` ·
`Email/Password Login Disabled for Supabase Accounts Created via Vercel
Marketplace` · `'Error: 'Target organization is not managed by Vercel
Marketplace' during project transfer'` · `Prisma Error Management` ·
`Grafana not displaying data` · `PowerBI Service error: …` ·
`rclone error: …` · `Using SQLAlchemy with Supabase`.

**Supabase writes help articles for confusions caused by other companies'
products wrapping it.** The `Ai` tag exists specifically for the AI-app-builder
ecosystem. That is a content-ops decision about where its users actually come
from, and it is legible from the index alone.

**Defects in the index** `[observed]`: one entry
(`Implementing soft deletes with supabase-js`) has **no product-area tag at
all**; `FDW Wrappers` is spelled with the letters transposed in its own slug
(`/FWD-wrappers-error-...`); `RLS policy causes infinite recursion` has a slug
about a completely different error
(`storage-error-database-schema-is-incompatible-when-uploading-files`), so the
title has been rewritten without the URL.

## T8 Empty states

`[documented]` — and Supabase's headline empty state is a genuine
content-design achievement.

> `Why is my select returning an empty data array and I have data in the table?`

This is the canonical Supabase confusion: Row Level Security is on, no policy
matches, and the API correctly returns `[]`. There is no error, no status code,
no warning — **the successful response is the failure.** Supabase cannot fix it
in the UI (the API is behaving correctly and cannot know the developer's
intent), so it writes the reconciling article and titles it in the user's own
contradictory sentence.

Two sibling articles cover the adjacent cases:

- `Why is my service role key client getting RLS errors or not returning data?`
  — the same empty result reached by a different wrong assumption
- `Why can't I upload/list/etc my public bucket?` — the Storage instance of the
  same problem, with `/etc` used casually inside a title

**Related no-data states named in the index** `[observed]`:
`Why are my Supabase branches empty?` (slug: `new-branch-doesnt-copy-database`
— **the title asks the question and the slug gives the answer**) ·
`Failed to retrieve tables` · `Grafana not displaying data` ·
`No toast messages on the Dashboard` ·
`NEW variable is null in a trigger function.` (trailing full stop in a title) ·
`Disk size not shrinking after deleting data`

`No toast messages on the Dashboard` is an empty state *of the notification
system itself* — a troubleshooting entry for missing feedback.

**Status-page empty states** `[observed]`, and these are good:
`No incidents reported today.` · `No incidents reported.` ·
`No incidents or maintenance related to this downtime.` ·
`No downtime recorded on this day.` · `No data exists for this day.`

Five distinct no-data strings, each scoped precisely. Note `No incidents
reported today.` for the current day vs `No incidents reported.` for past days
— the **temporal deixis changes with the row**, which is more work than most
status pages do. And `We're not aware of any issues affecting our systems` is
absent here; Supabase's overall banner is state-driven rather than
hedge-worded.

**A persistent `Fetching` placeholder** `[observed]` — the three `System
Metrics` panels render the literal string `Fetching` in served HTML, and
`Loading...` appears in the calendar. Gerund-without-object as a loading
label; `Fetching` reads as truncated.

All dashboard empty states (no projects, no tables, no logs) are post-auth.
`[absent]`

## T9 Notifications & system messages

**The five-week live incident is the single best sample in this batch**
`[observed]`. `401 errors due to JWT rejections`, `Aug 14 – ongoing`,
fourteen updates. Worth analysing closely because the writing is unusually
candid.

**The opening `Identified` post names the user-visible symptom, the cause
layer, and the effect, in one sentence:**

> "We have identified the root cause of newly refreshed JWTs being rejected by
> the API, resulting in HTTP 401 errors for affected sessions."

Cause → mechanism → the status code the reader is holding. A user grepping
their logs for `401` finds this.

**Blast radius is narrowed explicitly rather than left vague** `[observed]`:
"The impact of the issue is limited to a subset of new projects that can
experience it upon some JWT renewals." Three qualifiers (subset / new / some)
in one sentence. Later: "primarily impacting customers on the Free tier"
(a different incident).

**A rollout is reported region by region, by name** `[observed]` — the Aug 25
update lists twelve AWS region codes that have received the fix and says which
remain. **The user can determine whether their own project is fixed** without
contacting anyone. Almost no status page does this.

**A failed fix and a rollback are reported, with the reason and a
cross-link** `[observed]`:

> "We have seen reports that the JWT rejection issue persisted with 14.17, and
> due to some unintended performance side effects, we have rolled back to
> Postgrest 14.5."

Named versions, admitted regression, **a hyperlink to the separate incident the
attempted fix caused**. A status page that links its own incidents causally.

**A second, unrelated bug found during remediation is disclosed rather than
absorbed** `[observed]`:

> "As part of the incident remediation flow, we have separately identified
> "/lib/aarch64-linux-gnu/libc.so.6: version `GLIBC_2.34' not found" error
> between 11:15 - 16:24 UTC today affecting PostgREST. This has been fixed and
> we can see the error rates have subsided."

Verbatim error string, exact time window, resolution, and the evidence
("error rates have subsided").

**Root cause named in plain terms once known** `[observed]`:
"A stale time cache has been identified as the cause of this issue."

**The final update is the remarkable one** `[observed]` — Supabase apologises
for shifting work onto customers, and explains why:

> "We recognize that this is added work for our customers. This issue has been
> open for over a month, as we tried to make this change on each project's
> behalf. In an effort to resolve this sooner, we have opted to make this
> deployment process change and ask users to upgrade."

Three moves in four sentences: acknowledge the imposition, explain the delay as
an attempt to *avoid* the imposition, then justify the reversal by time-to-fix.
No passive voice, no "we apologise for any inconvenience". **This is the model
paragraph for any "we need you to do something" notice.**

**Self-service workaround, repeated with exact UI path** `[observed]`:

> "Some customers have reported that restarting their project after the rollout
> resolved this issue. To restart your project, go to the General settings page
> in the dashboard and select Restart project. Please contact our support team
> if the issue persists after a restart."

Hedged attribution ("customers have reported", not "this fixes it"), then the
literal click path, then the escalation. Repeated near-verbatim in three
updates — repetitive, but a reader arriving at any update gets the action.

**An email that became wrong is retracted on the status page** `[observed]`:

> "Due to this incident, impacted users who's project were compute constrained
> would have received a 'Your Supabase Project is running out of Disk IO
> Budget' email which is no longer valid. No further action is required and
> your project availability should be restored to normal."

**Retracting a specific notification by quoting its subject line** is excellent
practice — the user can match the email in their inbox. It also hands us the
only verbatim Supabase email subject in this harvest:
`Your Supabase Project is running out of Disk IO Budget`. (The sentence
contains `who's` for `whose` — a defect in an otherwise strong update.)

**An incident Supabase cannot fix is handled by naming the limit of its
agency** `[observed]` — `Network access issues affecting a limited number of
users in Myanmar`:

> "Supabase has taken the steps it can to address the blockage. We recommend
> customers contact their ISP for assistance."
> "We have made a repeat reminder for resolution to the appropriate parties in
> Myanmar. As no further response has been received, this incident will be
> resolved."

**Resolving an incident that is not fixed, and saying so.** The state changes
to `Resolved` because Supabase's work is complete, not because the user's
problem is. Debatable as a state decision; commendable as disclosure. A
workaround blog post is linked instead of a fix.

**Maintenance notices state what is *not* affected first** `[observed]`:

> "Impact:
> - Running projects *are not affected* but Management API operations may fail
>   or be delayed.
> - Various platform operations may fail or be delayed during this window.
> - These may include project creation and initial configuration/setup."

Italicised reassurance leads, then the degradation, then examples. Start and
end times given in UTC with a 30-minute window, posted **eight days in
advance**. And one consequence is disclosed that most vendors would omit:
"During the maintenance, support ticket creation will be suspended." — *you
cannot ask for help during this window.*

**Update cadence is itself communicated** `[observed]`:
"We will provide further updates as they become available." · "We will update
the status page when the fix is rolled out." · "We will continue to provide
updates as progress is made." Every non-terminal update ends with a promise
about the next one.

**Notification channels offered** `[observed]`: email (with OTP verification),
SMS, Slack, Microsoft Teams, webhook, Atom, RSS. The webhook option discloses
its trigger set precisely: "whenever Supabase **creates** an incident,
**updates** an incident, **resolves** an incident or **changes** a component
status" — four events, bolded, and note that **SMS gets fewer triggers than
email**: email covers "creates, updates or resolves", SMS only "creates or
resolves". The difference is stated on each form rather than buried.

**A separate security-incident channel** `[observed]`:
`Security Newsletter` — "Sign up for the Supabase Security Newsletter. Receive
updates during security incidents." A second, opt-in notification stream for
security specifically, on the security page rather than the status page.

**Docs-level routing message, on every page** `[observed]`:
`Something's not right?` → `Check system status`. See T1.

## T10 Disclosures, legal & compliance

**The shared-responsibility model is the organising disclosure, and it is
stated in two sentences** `[observed]`

> "Supabase secures the infrastructure. You secure your application — RLS
> policies, API keys, and access controls."

Two clauses, two subjects, and the second one **enumerates the reader's three
duties**. Reinforced in the Production Checklist as a callout: "Running
databases is a shared responsibility between you and Supabase. There are some
things that we can take care of for you, and some things that you are
responsible for."

For a product whose single most common failure mode is a customer forgetting
RLS, putting the boundary in fourteen words on the security page is the right
disclosure. It is also the implicit answer to "is Supabase secure" — the honest
answer being "partly up to you".

**Compliance is gated by tier, and the gate is stated with the claim**
`[observed]`

- `SOC 2` — "Supabase is SOC 2 Type 2 compliant." Then: "**Enterprise and Team
  customers** can access our SOC 2 Type 2 report on the dashboard."
- `HIPAA` — "Supabase is HIPAA compliant. You can store Protected Health
  Information (PHI) on our hosted platform **once you enter into a Business
  Associate Agreement (BAA) with us and fulfill your HIPAA obligations under
  our shared responsibility model.**"
- `ISO 27001` — certified; certificate access again Team/Enterprise only
- `GDPR & European Compliance` — "Projects hosted in EU regions keep your
  **primary** database data in-region"

Three of four claims carry a **conditional in the same paragraph as the claim**.
The HIPAA sentence is the best-constructed compliance disclosure in this batch:
it does not say "we are HIPAA compliant so you are" — it makes the reader's
compliance contingent on two named acts, one contractual and one operational.

The GDPR word `primary` is doing quiet and important work: it concedes that
non-primary data (replicas, logs, metadata) may leave the region, without
saying so.

**Data disclosures are specific and unhedged** `[observed]`:
"encrypted at rest with AES-256 and in transit via TLS" · "Sensitive
information like access tokens and keys are encrypted at the application level
before they are stored in the database" · "All paid customer databases are
backed up every day" · "Supabase Projects use disks that offer **99.8-99.9%
durability** by default".

A **range**, not a single number, for durability — and it is an unflattering
figure to publish at all. Two mitigations are then named with the failure they
address: "Use Read Replicas if you require availability resilience to a disk
failure event / Use PITR if you require durability resilience to a disk failure
event." Availability vs durability distinguished in adjacent sentences.

**Third-party dependencies are named, including security vendors** `[observed]`:
`Cloudflare` (CDN/DDoS) · `fail2ban` · `GitHub`, `Vanta`, `DepthFirst`
(scanning) · `Stripe` (payments, with its PCI level stated) · `AWS` (regions).
Naming your own scanning vendors is unusually transparent.

**Cost-control disclosure is framed as protecting the customer from the
vendor** `[observed]`:

> "Supabase combats Distributed Denial of Service attacks in several ways to
> mitigate resource abuse **and prevent runaway bills**."

DDoS protection justified by *billing* risk, and the remedy named as a feature:
`spend caps` "to prevent surprise bills". The pricing FAQ leads with the same
anxiety: `Can I cap my usage so my bill doesn't run over?` is **FAQ question
number one.**

**Free-tier limits stated as conditions, on the plan card** `[observed]`:
"Free projects are paused after 1 week of inactivity. Limit of 2 active
projects." · "Community support". Pro: "First project included. Additional
projects from $10/mo." — the per-project cost is disclosed on the card next to
the $25.

**Production Checklist doubles as a disclosure document** `[observed]`:
"Database backups are not available for download for Free Plan projects." ·
"We may pause applications on the Free Plan that exhibit low activity in a
7-day period to save on server resources." · "The default rate limit for auth
emails when using a custom SMTP provider is *30 new users per hour*." ·
"Upgrade to Pro to guarantee that we won't pause your project for inactivity."

The last one is an **upsell written as a guarantee against a platform action**
— unusually direct about what money buys.

**The auth rate-limit table is a model disclosure artefact** `[observed]` —
four columns (`Endpoint` · `Path` · `Limited By` · `Rate Limit`), and the third
column is the one that matters:

| `Limited By` value | Meaning |
|---|---|
| `Sum of combined requests` | Pooled across several endpoints |
| `Last request` | A cooldown window, not a quota |
| `IP Address` | Per-client |

**Naming the limiting dimension separately from the number** is what makes the
table usable — "360 per hour" means nothing without knowing per what.
Individual cells then add the unit and the mutability:
"Defaults to 360 OTPs per hour. **Is customizable.**" ·
"Defaults to 60 seconds window before a new request is allowed." ·
"360 requests per hour (**with bursts up to 30 requests**)".

And one cell carries a dated policy change inline:
"**As of 3 Sep 2024**, this has been updated to 2 emails per hour. You can only
change this with your own custom SMTP setup." A tightening disclosed with its
effective date and its escape hatch, inside the table cell.

**Legal surfaces** `[observed]`: `Legal Hub` · `Privacy Policy` ·
`Acceptable Use Policy` · `Privacy Settings` · `Lawyers.txt` ·
`Security.txt` · `/legal/dpa`. The `Legal Hub` naming (rather than "Legal") and
the `.txt` machine-readable files are both deliberate.

**Pricing-change policy is an FAQ question** `[observed]`:
`Are you going to change your pricing in the future?` — a vendor publishing a
question about its own future price rises, alongside
`What happens if I cancel my subscription?`

## T11 Help-centre architecture

**There is no help centre. There is a troubleshooting index inside the docs,
and it is better than most help centres.**

Support routing is three-tiered and visible on every docs page
(`Contact support` / `See Changelog` / `Check system status`), with the
community as an unnumbered fourth (`Discord`, `SupaSquad`, `Community Forum`
via GitHub).

**The troubleshooting index's architecture is search-plus-facet, not a tree**
`[observed]`

> `Troubleshooting`
> "Search or browse our troubleshooting guides for solutions to common Supabase
> issues."
> `## Matching troubleshooting entries`

The section heading is `Matching troubleshooting entries` — i.e. the **default
view is presented as a search result set with an empty query**, not as a
catalogue. Flat, ~200 entries, alphabetical by title, each faceted by product
area and error code. There is no category hierarchy at all.

This is a defensible and increasingly common choice: with five overlapping code
systems and thirteen product areas, any tree would mis-file half the content.
The facets do the work a tree would. The cost is that **a browsing user gets
no orientation** — the list opens with `42501 : permission denied for table
http_request_queue`, which is an unhelpful first impression, and there is no
"most common issues" shelf.

**Article-title grammar: seven shapes, catalogued in T7.** The consistency is
within-shape rather than across the index, which is the right trade for a
search-first surface — each title optimises for the string its reader is
holding.

**The docs' own IA is five-way and named by reader intent** `[observed]`:
`Products` / `Build` / `Manage` / `Reference` / `Resources`, plus `Start`.
Within `Deployment & Branching`, the sub-grouping is by lifecycle stage:
`Environments` · `Branching` · `Terraform` · `Production readiness` · `CI/CD`.

**`Production readiness` is a named docs category** containing
`Shared responsibility model` · `Maturity model` · `Production checklist` ·
`SOC 2 compliance`. A `Maturity model` document as first-class docs IA is
notable — Supabase publishes a staged model of how serious your deployment is.

**Contribution surfaces are first-class** `[observed]`:
`Edit this page on GitHub` on every page, plus footer links to `Contributing`
and an `Author Styleguide`
(`github.com/supabase/supabase/blob/master/apps/docs/CONTRIBUTING.md`).
**Supabase publishes its own documentation style guide as a linked artefact on
every docs page.** For a content-design corpus this is the most directly
relevant thing on the site and it was not opened in this pass — flagged as the
top gap.

**AI-consumption architecture is a documented layer** `[observed]`:
an `AI Tools` block on every docs page (`Connect your AI agent` ·
`Copy as Markdown` · `Ask ChatGPT` · `Ask Claude`), a docs section
`Build with AI tools` ("Develop with Supabase AI-first using plugins, MCP, and
skills"), and the agent prompt on the docs home. Supabase has built a parallel
IA for non-human readers and labelled it.

## T12 FAQs

**One FAQ block, on the pricing page, nine questions** `[observed]`. Answers
were not captured (accordion, client-rendered) — questions verbatim:

| # | Question (verbatim) |
|---|---|
| 1 | Can I cap my usage so my bill doesn't run over? |
| 2 | When will I be billed? |
| 3 | Does Supabase charge sales tax, VAT or GST? |
| 4 | Are you going to change your pricing in the future? |
| 5 | What happens if I cancel my subscription? |
| 6 | How can I track my usage? |
| 7 | What if I need one project for development and one for production? |
| 8 | Can I self-host Supabase for free? |
| 9 | Can I pause a free project? |

Closing escalation: `Can't find the answer to your question?`

**Structural analysis.** Nine questions, ordered: **fear of overspend** →
timing → tax → **fear of future price rises** → cancellation → usage
visibility → environments → self-host → pausing.

Q1 is the loss-aversion question and it is deliberately first. Q1 and Q6 are a
pair — *can I limit it* and *can I see it* — the two halves of billing
anxiety, separated by four questions rather than adjacent, which is a
sequencing choice worth questioning.

Q4 (`Are you going to change your pricing in the future?`) is the standout:
**a vendor volunteering the question its customers are afraid to ask.** Most
pricing FAQs answer "how do I upgrade"; this one answers "will you raise the
rent".

Q7 is phrased as a **use case, not a feature question**
(`What if I need one project for development and one for production?` rather
than "Do you support staging environments?"). The reader's situation is the
question. Q8 addresses the open-source escape hatch commercially — a
proprietary FAQ that tells you how to not pay.

Note that **no FAQ exists on the home page, the docs, or the security page.**
The security page instead has a newsletter form where an FAQ would be. The
docs' equivalent is the troubleshooting index (T11), whose `How do I …?` and
`Why …?` entries *are* an FAQ by another name — roughly 30 of the ~200 entries
are question-titled.

**Docs-index FAQ-shaped entries worth recording as FAQ content** `[observed]`:
`Are all features available in self-hosted Supabase?` ·
`Do I need to expose "security definer" Functions in Row Level Security
Policies?` · `Should I set a shorter Max-Age parameter on the cookies?` ·
`How long does it take to restore a database from a Point-in-Time backup
(PITR)?` · `Will backups be accessible from the dashboard immediately after
upgrading to a paid plan?` · `How do I make the cookies HttpOnly?` ·
`Supavisor FAQ` · `Realtime Egress FAQ` · `Enabling the IPv4 add-on FAQ`.

Three entries are literally titled `<X> FAQ`, so "FAQ" is used as a *document
type* inside the troubleshooting index rather than as a page pattern.

## T13 Terminology & glossary

Supabase publishes **no glossary page** (a real gap given the vocabulary
below), but one troubleshooting entry —
`Supavisor and Connection Terminology Explained` — functions as a partial one.

| Term | How Supabase defines it for a newcomer | What plainer word it displaced |
|---|---|---|
| `project` | The primary unit. Every project "is a full Postgres database"; projects are created, paused, restored, restarted, transferred, and billed | database / instance / app / environment. **Overloaded** — a `project` is simultaneously a database, a deployment target, a billing line, and an environment. Every Supabase billing FAQ is really a question about this word (Q7: "one project for development and one for production") |
| `organization` | The billing and membership container above projects; `Organization > Team` | account / workspace / team. Note the UI path pairs *both* words, so `organization` contains a `Team` |
| `Row Level Security` / `RLS` | "securing your data with Row Level Security"; "Tables that do not have RLS enabled with reasonable policies allow any client to access and modify their data. This is usually not what you want." | permissions / access rules / auth rules. **A Postgres term retained rather than replaced**, and it is the most consequential concept for a newcomer. Supabase compensates with a dedicated explainer titled `RLS Simplified` and with the empty-array article in T8 — two content artefacts paying for one un-glossed term. "This is usually not what you want" is a notably plain way to state a security consequence |
| `policy` | The RLS unit; `Database > Policies` | rule / grant |
| `Supavisor` | Supabase's connection pooler. **Named `Connection Pooler` on the status page and `Supavisor` in 14 troubleshooting titles** | PgBouncer / pooler. The clearest register split on the site: the coined name for the debugging audience, the functional name for the status-checking audience |
| `Edge Functions` | "Globally distributed, server-side functions to execute your code closest to your users for the lowest latency." | serverless functions / lambdas. `Edge` is borrowed from CDN vocabulary |
| `Realtime` | "Listen to database changes, store and sync user states across clients, broadcast data to clients subscribed to a channel" — three mechanisms in one definition | websockets / pub-sub / live queries. A capitalised adjective used as a product noun, which makes "realtime" ambiguous between the feature and the property |
| `Broadcast` / `Presence` / `Postgres Changes` | The three Realtime sub-features, each named and each with its own troubleshooting entries (`ClientPresenceRateLimitReached`, `WarnSendingBroadcastMessage`, `Realtime: Postgres Changes Troubleshooting`) | events / user state / CDC. `Presence` is borrowed from XMPP |
| `channel` | The Realtime subscription unit; `TooManyChannels` error | topic / room / subscription |
| `Studio` | The dashboard's internal name — appears **only as a troubleshooting tag and in `Supabase Studio`**, never in marketing, where it is `the dashboard` | dashboard / console. A user reading the troubleshooting index sees a product name they have never been shown |
| `Advisor` (`Security Advisor`, `Performance Advisor`) | In-product linters; the Production Checklist opens two sections by routing to one | linter / scanner / audit. `Advisor` is softer than "audit" and implies optional counsel rather than a gate — well chosen for something that flags your own mistakes |
| `Vector` | "Integrate your favorite ML-models to store, index and search vector embeddings" | pgvector / embeddings store |
| `Data APIs` | "Instant ready-to-use REST APIs" | PostgREST / auto-generated API. The underlying tool (`PostgREST`) leaks in ~8 troubleshooting titles and in error codes `PGRST002` / `PGRST106`, so the reader meets the plain name first and the real name at failure time |
| `egress` | Billed network output; `All about Supabase Egress`, `Realtime Egress FAQ`, `cached egress` as a separate line item | bandwidth / data transfer. A cloud-billing term retained unglossed on the pricing card, where `5 GB egress` and `5 GB cached egress` appear as two rows with no explanation of the difference |
| `MAU` / `monthly active users` | A billing unit (`50,000 monthly active users` on Free); `Check usage for monthly active users (MAU)` | seats / users. Billing by the customer's users rather than by the customer's team |
| `Compute Add-on` with sizes `Nano` / `Micro` / `Small` (and larger) | Compute tiers sold as an add-on rather than as a plan | instance size. `Nano` appears in an incident update ("Nano projects becoming unresponsive") but not on the plan cards, so the smallest tier is visible mainly when it breaks |
| `Spend Cap` | Billing guardrail; FAQ Q1 and the security page both lead with it | budget limit / hard cap. Capitalised as a product feature |
| `Branching` / `branch` | Preview environments modelled on git; `MIGRATIONS_FAILED` is a branch state; `Why are my Supabase branches empty?` | preview environment / staging. Borrowing `branch` from git means the reader expects copy-on-write semantics — which is exactly the false expectation the "branches empty" article exists to correct |
| `Point in Time Recovery` / `PITR` | "restoring the database to any point in time… with second-level granularity"; framed against a named metric, "if you need a lower recovery point objective (RPO)" | backups. Enterprise DR vocabulary (`RPO`) used unglossed on a page aimed at weekend builders |
| `Read Replica` | Availability mitigation, distinguished from PITR by failure mode | replica / standby |
| `service role key` / `anon key` / `secret key` / `publishable key` | Four key names across docs and troubleshooting; `Migrating to new API keys` is a named docs page and `Rotating Anon, Service, and JWT Secrets` a troubleshooting entry | API key / admin key. **The vocabulary is mid-migration** — `anon`/`service_role` are the legacy pair, `publishable`/`secret` the new one, and both appear live |
| `Advisors`, `Dataclips`-equivalent `Dataclips` | n/a — Supabase has no Dataclips; `SQL Editor` and `Table Editor` are the named dashboard tools | |
| `SupaSquad` | The community-contributor programme | ambassadors / MVPs. The `Supa-` prefix also yields `Supavisor`, and internally `supabase_migrations` — a house prefix used for both a product and a community programme |
| `Vibe Coders` | A named market segment with its own landing page | beginners / no-code users. Supabase adopted a 2025 internet coinage as a formal audience label in site IA |
| `Lawyers.txt` | A footer file, by analogy with `humans.txt` | legal contacts page |

**The `Supa-` prefix is the house morpheme** (`Supabase`, `Supavisor`,
`SupaSquad`, `supabase_migrations`) and it is applied to a pooler, a community
programme, and a schema — no consistent category.

**Register split by surface, clearly observable:**

| Surface | Vocabulary |
|---|---|
| Marketing | `Data APIs`, `Vector`, `the dashboard`, `Realtime` |
| Status | `Connection Pooler`, `API Gateway`, region codes |
| Docs | `PostgREST`, `RLS`, `egress`, `PITR`, `RPO` |
| Troubleshooting | `Supavisor`, `Studio`, `pgsodium`, `pg_cron`, `Kong`, `GoTrue` |

**The troubleshooting index leaks every internal component name** — `Kong`,
`GoTrue`, `pgsodium`, `pg_cron`, `PostgREST`, `Supavisor`, `Studio` — none of
which appear on the marketing site. That is arguably correct (the debugging
reader needs the real component name to read a log line) but it means
**Supabase has two disjoint vocabularies and no glossary bridging them.** A
user who buys `Auth` debugs `GoTrue`.

## T14 Voice, tone & accessibility

**Person and tense.** Docs address the developer as `you` and the developer's
end user as `the user` — consistently, across ~80 error descriptions. Company
voice is first-person plural and takes responsibility in adverse copy:
"We have identified the root cause", "we have opted to make this deployment
process change", "We recognize that this is added work for our customers",
"We may pause applications on the Free Plan". First person plural is used for
the unpopular decisions, not just the achievements — the opposite of Docker's
pattern.

**Register is plain, short, and unusually candid.** Contractions used freely
("doesn't", "won't", "You're never locked in", "Something's not right?",
"Can't find the answer"). No exclamation marks in docs or error copy. No
`Oops!`. The only exclamation marks on the site are inside **quoted user
tweets**, where they belong to someone else.

**The tone gradient is present but shallow.** Marketing: "Build in a weekend",
"Kickstart your next project". Docs: "This is usually not what you want."
Errors: "Ask the user to sign in again." Incidents: "Thank you for your
patience on this issue." The distance between the extremes is smaller than at
Heroku or Docker — Supabase's marketing is already fairly flat, which makes the
error copy feel continuous with it.

**Uncertainty and limitation are stated repeatedly**, which is the defining
voice characteristic:

- "Auth service is degraded or a bug is present, **without a specific reason**"
- "as they may change unexpectedly" (of its own HTTP codes)
- "Some customers **have reported** that restarting their project… resolved
  this issue"
- "Supabase has taken **the steps it can**"
- "disks that offer **99.8-99.9%** durability"
- "This is **usually** not what you want"
- "**Most often** it points to issues in your database setup"

**Second-person imperatives for the reader's own adversarial thinking**
`[observed]`: "Consider how *you* might abuse your service as an attacker".
The only italic on the Production Checklist.

**British/American mixing** `[observed]`: "Remains available **whilst** in
production" on a page that otherwise uses US spelling and a US-audience
register. One `whilst` in an otherwise en-US corpus.

**Numbers are specific and unit-bearing**: `50,000 monthly active users` ·
`500 MB database size` · `5 GB egress` · `1 GB file storage` · `$25` ·
`$10/mo` · `99.8-99.9%` · `3600 seconds (1 hour)` · `> 4 GB` ·
`30 new users per hour` · `2 emails per hour` · `360 OTPs per hour` ·
`1800 requests per hour` · `15 requests per minute` · `7-day period` ·
`2 active projects`. Where a unit could be ambiguous, both forms are given
(`3600 seconds (1 hour)`).

**Accessibility** `[observed]`

- `Skip to content` present and first in DOM on **both** marketing (`#main`)
  and docs (`#docs-content-container`) — the only product in this batch with it
  on both surfaces
- Logo alt text is precise and dual-theme-aware: two `<img>` elements both
  alt'd `Supabase wordmark` (light and dark variants). **This means the logo is
  announced twice on every docs page** — correct alt text, wrong number of
  elements exposed
- Marketing alt text is thin: `Supabase Og Image` (the OG image), and the
  security-badge images (`soc2-type2.svg`, `HIPAA.svg`) carry **empty alt on a
  meaningful graphic** — the SOC 2 and HIPAA badges convey compliance status
  and have no text equivalent beyond the adjacent heading. Defensible because
  the heading is adjacent; flagged because the badge is the trust signal
- Customer logos carry company-name alt (`Lovable`, `eXp Realty`,
  `Phoenix Energy`, `Chatbase`, `Rally`) — good. Testimonial avatars carry
  full attribution alt ("Bryan Byrne, Product Manager, Lovable") — good, though
  it duplicates the visible caption
- **The home page's trusted-by logo strip renders as twelve empty list
  items** (`- - - - ...`) in served HTML under the heading "Trusted by
  fast-growing companies worldwide". Twelve unlabelled bullets to a screen
  reader
- **The customer-story carousel content is duplicated in the DOM** — the
  Lovable card and its quote appear twice in sequence. A screen-reader user
  encounters the same testimonial twice
- Tweet cards concatenate handle, image alt, and body into one string
  (`@nerdburn twitter image@nerdburnIt's fun, feels lightweight…`) — the
  image's alt text runs into the author name with no separator, producing
  "twitter image at nerdburn It's fun"
- Status page: every incident state label is bolded (`**Update**`,
  `**Resolved**`) rather than marked up semantically in the linearised text;
  dates render with emphasis inside them (`Sep *17*, *2026* - *19:30* UTC`),
  which linearises as fragmented emphasis around numerals
- Status page `Resend OTP in:  seconds` renders with **no number** — see T5
- The `?` tooltips on status components have no visible text equivalent in
  served HTML
- `View historical uptime.` includes a full stop inside the link text
- No language switcher anywhere; no `lang` alternates observed

**Negative findings, recorded honestly**

- "Free projects are **paused after 1 week of inactivity**" (pricing) vs
  "applications on the Free Plan that exhibit **low activity in a 7-day
  period**" (docs) — two durations, two triggers, one rule
- `Operational` / `Degraded Performance` (title case, legend) vs
  `Major outage` / `Partial outage` (sentence case, history rows)
- Region codes (`ap-southeast-1`) and city names (`Singapore`) for the same
  places, on one status page
- `Connection Pooler` (status) vs `Supavisor` (docs) — same component
- `the dashboard` (marketing) vs `Studio` (troubleshooting tag) — same product
- `Python` (docs home) vs `Flask (Python)` (sidebar) vs "Serve Flask web apps"
  (card body) — one quickstart, three names
- `anon` / `service_role` vs `publishable` / `secret` key vocabularies both
  live, with a migration page acknowledging it
- `Change number` and `Edit number` in one modal
- `Resend OTP in:  seconds` with the value missing
- `Fetching` and `Loading...` as two loading labels on one page
- "impacted users **who's** project were compute constrained" — status update
- "Remains available **whilst** in production" — lone British spelling
- `Android Kotlin` says "**product** management app" where nine siblings say
  "user management app"
- Rails 6.x-style drift: `Web app demos` lists `Vue 3` and `Nuxt 3` with
  version numbers while `Framework quickstarts` lists `Vue` and `Nuxt` without
- `FDW Wrappers` slug spells it `FWD-wrappers`
- `RLS policy causes infinite recursion` sits at a slug about an unrelated
  storage schema error
- `Why Supabase Edge Functions cannot provide static egress IPs for allow
  listing` — title says `allow listing`, slug says `whitelisting`
- One troubleshooting entry has no product-area tag
- `500 unexpected_failure` repeated seven times in one entry's chip list;
  several chip lists end in a dangling comma
- `NEW variable is null in a trigger function.` — trailing full stop in a
  title; `42501 : permission denied…` — space before the colon
- Twelve empty list items in the trusted-by strip; carousel content duplicated
- Compliance badges carry empty alt

---

## Transferable patterns

1. **Put `Something's not right? → Check system status` on every
   documentation page.** Three words pre-empt the "is it me or is it them?"
   question that drives a large share of support contact, and route it to a
   self-service answer. Cheapest high-value pattern in this batch. Directly
   applicable to any developer or merchant-facing docs surface.
2. **Tag support content with every identifier the user might be holding, at
   every layer.** Supabase chips one article with `403 42501` so a user with a
   bare HTTP code and a user with a Postgres SQLSTATE land in the same place.
   Applies to payments, where a customer may hold a decline code, a processor
   code, a gateway code, and an HTTP status for one event.
3. **Distinguish `_expired` from `_not_found`, and explain that a retry can
   cause the second.** Two codes for one symptom, with the second-order cause
   documented. Transfers to any token, session, or one-time-code flow.
4. **Tell developers to depend on your codes, not your prose.** "Always use
   `error.code`… not string matching on error messages" plus "Avoid relying
   solely on HTTP status codes, as they may change unexpectedly." A written
   content-stability contract that frees the writer to improve copy.
5. **Name the limiting dimension separately from the limit.** The
   `Limited By` column (`Sum of combined requests` / `Last request` /
   `IP Address`) is what makes the rate-limit table usable. Any quota,
   threshold, or velocity limit disclosure needs this column.
6. **Report a rollout region by region, by name.** The user determines whether
   they are fixed without contacting anyone. Applies to any staged release or
   partial outage where blast radius is enumerable.
7. **When you must shift work onto customers, acknowledge it, explain the
   delay as an attempt to avoid it, then justify the reversal.** The Sep 17
   update is the model paragraph. No passive voice, no "inconvenience".
8. **Retract a wrong notification by quoting its subject line.** "would have
   received a 'Your Supabase Project is running out of Disk IO Budget' email
   which is no longer valid. No further action is required." Lets the user
   match it in their inbox.
9. **Write the article for the case where nothing is broken and the user
   believes otherwise.** `Why is my select returning an empty data array and I
   have data in the table?` — title the article in the user's own
   contradiction, including the "and". Six such articles exist; they are a map
   of where correct behaviour reads as failure.
10. **State the responsibility boundary in two sentences with two subjects, and
    enumerate the reader's duties.** "Supabase secures the infrastructure. You
    secure your application — RLS policies, API keys, and access controls."
11. **Attach the condition to the compliance claim, in the same paragraph.**
    HIPAA compliance made contingent on a named contract *and* a named
    operational duty. Never let "we are compliant" stand alone.
12. **Lead the pricing FAQ with the loss-aversion question.**
    `Can I cap my usage so my bill doesn't run over?` first, and
    `Are you going to change your pricing in the future?` fourth. Answer the
    fear before the feature.
13. **Write bespoke scope lines in the reader's own dialect for the acquisition
    moment, and template everything after.** Twenty hand-written framework
    lines using each framework's native vocabulary (`composable`,
    `server load functions`, `Active Record`); sixteen templated tutorial
    lines. A visible and defensible content-budget allocation.
14. **Write onboarding for the reader's agent as well as the reader.** Embed
    the rationale inline ("so the version is pinned per project"), make steps
    conditional rather than imperative, and hand the routing decision back at
    the end. Three of those four are better for humans too.
15. **Distinguish "no problem occurred" from "no measurement exists".**
    `No downtime recorded on this day.` vs `No data exists for this day.`
    Applies to any historical chart, ledger gap, or reporting period.

## Caveats & gaps

- **The marketing navigation is client-rendered and was not captured.**
  Only `Open main menu` appears in served HTML, so T1's marketing nav labels
  are `[absent]` and the footer is standing in for them. A browser-rendered
  pass is needed for the primary nav, its groupings, and any flyout scope
  lines.
- **Pricing FAQ answers were not captured** — the nine questions are verbatim
  from server HTML; the accordion bodies are not present. Same limitation as
  the Wise exemplar.
- **The full pricing feature matrix was only partially read.** Tier names
  (`Free`, `Pro`, `Team`, `Enterprise`), their positioning lines, headline
  prices, the Free-tier quota list, and the compute add-on size names
  (`Nano`, `Micro`, `Small`) are `[observed]`; the complete per-row comparison
  table, the full compute-size ladder, and Team-tier pricing were not
  extracted. Any claim about what a specific tier includes should be
  re-verified.
- **`github.com/supabase/supabase/.../apps/docs/CONTRIBUTING.md` — the
  `Author Styleguide` — was not fetched.** For a UX-content corpus this is the
  highest-value unharvested artefact on the entire property: Supabase's own
  published documentation voice-and-tone rules. **First thing a second pass
  should do.**
- All dashboard UI is post-auth. Field labels, validation messages, toasts,
  the `Security Advisor` / `Performance Advisor` output strings, and every
  first-run empty state are `[documented]` at best. T5 and T8 are consequently
  the weakest sections, and the Advisor copy in particular would likely be the
  richest in-product content on the platform.
- **The `?` tooltips on the 11 status components were not captured** (not in
  server HTML), so the component *definitions* are absent while the names are
  observed.
- Individual troubleshooting article *bodies* were not opened — ~200 titles and
  their code/area chips were harvested, which is high-signal for IA, error
  taxonomy, and task phrasing, but says nothing about answer structure.
  Notable unopened entries whose bodies would matter: `RLS Simplified`,
  `Edge Function shutdown reasons explained`,
  `Formatting support requests for faster resolution`,
  `Supavisor and Connection Terminology Explained` (the de facto glossary).
- `supabase.com/support`, the `Changelog`, the `Maturity model`, the
  `Shared responsibility model` guide, and the `Legal Hub` were not fetched.
- Email and in-app notification copy is represented by **exactly one verbatim
  subject line**, recovered incidentally from a status-page retraction. The
  notification corpus is otherwise unharvested.
- The incident analysis in T9 is drawn from one live incident and ~8 recent
  ones visible on the status home. `status.supabase.com/history` and
  `/uptime` were not opened, so cadence and severity-label usage over a longer
  window are unverified.
- No non-English surface was found; all register claims are en-US (with one
  `whilst`).
- Accessibility findings are from served HTML only; the duplicated logo alt,
  duplicated carousel, and empty logo-strip list items are confirmed in markup
  but not tested with assistive technology.

## Sources

1. https://supabase.com/
2. https://supabase.com/pricing
3. https://supabase.com/security
4. https://supabase.com/docs
5. https://supabase.com/docs/guides/getting-started
6. https://supabase.com/docs/guides/troubleshooting
7. https://supabase.com/docs/guides/auth/debugging/error-codes
8. https://supabase.com/docs/guides/deployment/going-into-prod
9. https://status.supabase.com/

No domains were blocked for this product.
