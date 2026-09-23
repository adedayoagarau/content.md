# 025. Cloudflare

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | CDN, DNS and edge security / SASE and Zero Trust / edge compute platform |
| Primary URL | https://www.cloudflare.com/ |
| Corpus rank | 025 |
| Benchmark strength (source list) | Complex-product navigation and status |
| Locale / market observed | en (`meta-og:locale: en` on docs; docs `inLanguage: en`) |
| Platform observed | Web (marketing, Astro v6.3.7), developers.cloudflare.com (Astro/Nimbus v0.2.2, **serves `.md` per page**), cloudflarestatus.com (**custom-built, not Statuspage**) |
| Regulatory posture | `PCI DSS 4.0 Compliance` as a plan feature; `Trust Hub` with `Compliance resources`, `Data Protection` (GDPR), `Responsible AI`, `Transparency report`, `Report abuse`; `Data Localization Suite` and `Geo-Key Manager` as named products; `legal` is a published error category covering DMCA and country blocks |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | **Full for T6 and T7** — the deepest error taxonomy in the corpus. Full for T1 and T10. Partial for T2, T3, T13. T4, T5, T8, T12 thin or absent; T14 has no published style guide. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.cloudflare.com/ | Hero, `Region: Earth`, three-tab pricing preview, scale metrics |
| Pricing / Plans | https://www.cloudflare.com/plans/ | **Three orthogonal pricing models on one page**; ~25 usage-metered products with unit rates; ten add-ons |
| Status — Overview | https://www.cloudflarestatus.com/ | Custom status site; `Active incidents` / `Recent incidents` / `Active maintenance` |
| Status — Services & Sites | https://www.cloudflarestatus.com/services | **128 services in 18 named groups**, with 30/90-day incident-density labels |
| 5xx errors index | https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/ | 12 named 5xx codes; required-details-for-hosting-provider block |
| 1xxx errors index | .../cloudflare-1xxx-errors/index.md | **31 named 1xxx codes with verbatim user-facing titles** |
| Error 521 | .../cloudflare-5xx-errors/error-521/index.md | Representative 5xx page: causes, resolution checklist |
| Error 1020 | .../cloudflare-1xxx-errors/error-1020/index.md | Representative 1xxx page: **dual audience — visitor and site owner** |
| Custom Errors | https://developers.cloudflare.com/rules/custom-errors/index.md | Error-page override model, six-step priority order, asset limits |
| Error page types | .../custom-errors/reference/error-page-types/index.md | **Seven named error-page types with API identifiers** |
| Error responses | https://developers.cloudflare.com/fundamentals/reference/error-responses/index.md | **RFC 9457 structured errors, 10 error categories, Retry-After table, `what_you_should_do` field** — the single richest error-content artefact in the corpus |

---

## T1 Navigation & IA labels

The benchmark strength for this product is "complex-product navigation", and the finding is that Cloudflare handles a 128-service portfolio with an **unusually shallow marketing nav and an unusually deep status taxonomy**.

**Global nav — four items, no action cluster beyond login** `[observed]`

`Products` · `Solutions` · `Resources` · `Pricing`, plus `Dashboard` and `Login`. Four menus for 128 services. This is the shallowest primary nav in the batch — GitHub has six items, GitLab six, Netlify five, Vercel four — and Cloudflare carries by far the largest portfolio behind it.

Each nav item is also a **destination page**, not just a menu: `/products/`, `/solutions/`, `/resource-hub/`, `/plans/`. Cloudflare's answer to portfolio scale is to push the taxonomy onto a dedicated page rather than into a mega-menu.

**The product taxonomy is six categories, published on the pricing page footer-nav** `[observed]`

| Category | Members (with their glosses) |
|---|---|
| `Compute` | `Browser Run` — "Automated browsers" · `Containers` — "Any language, anywhere" · `Durable Objects` — "Stateful compute" · `Sandboxes` — "Secure code execution" · `Workers` — "Global serverless functions" · `Workers for Platforms` — "Programmable Platform Solutions" · `Workflows` — "Process orchestration" |
| `Storage` | `Artifacts` — "Git-native versioned storage" · `D1` — "Serverless SQL" · `Data Platform` — "Ingest, Catalog & Query" · `Hyperdrive` — "Global databases" · `Queues` — "Message processing" · `R2` — "Egress-free storage" · `KV` — "Ultra-fast key-value storage" |
| `AI` | `Agents` — "Build stateful AI agents" · `AI Gateway` — "AI observability" · `AI Search` — "Instant retrieval" · `Vectorize` — "Vector database" · `Workers AI` — "Edge AI models" |
| `SASE / Zero Trust` | `SASE` · `Access` — "Zero trust access to private resources" · `CASB` — "SaaS and cloud posture" · `Data Loss Prevention` · `Gateway` — "Web filtering" · `Browser Isolation` · `WAN` — "Cloud-delivered networking" · `Email Security` — "Phishing protection" |
| `Security` | `DDoS Protection` · `Rate Limiting` — "Abuse prevention" · `SSL` · `Turnstile` — "A CAPTCHA Replacement Solution" · `WAF` — "Web Application Firewall" · `Magic Transit` — "DDoS Protection for Networks" · `Client-Side Security` — "Prevent browser supply chain attacks" · `Bot Management` — "Block bad bots" |
| `Network & Content Delivery` | `CDN` — "Faster delivery & caching" · `DNS` — "Fast DNS" · `Load Balancing` — "Zero downtime" · `TURN / SFU` — "Real-time infra" · `Analytics` — "Web Performance & Security" |

**Every product carries a two-to-four-word gloss** — the same noun-plus-gloss pattern GitHub uses in its platform menu and Vercel does not use at all. With 40+ products named on one page, the gloss is load-bearing: `D1`, `R2`, `KV`, `Hyperdrive`, `Vectorize`, `Turnstile`, `Zaraz`, and `Magic Transit` are all unguessable without it.

The glosses are also **tightly length-controlled** — 19 of the 40 are exactly two or three words (`Stateful compute`, `Serverless SQL`, `Global databases`, `Message processing`, `Edge AI models`, `Web filtering`) — which is what lets a 40-item grid remain scannable. Capitalisation is inconsistent, though: `Zero trust access to private resources` (sentence) sits beside `Programmable Platform Solutions` and `A CAPTCHA Replacement Solution` and `DDoS Protection for Networks` (title case) in the same grid. **Three capitalisation conventions in one product list.**

**The status site is the real IA artefact: 128 services in 18 named groups** `[observed]`

`CDN & Performance` (10) · `DNS` (6) · `Network Services` (12) · `Dashboard & API` (8) · `Zone Management` (2) · `Sites` (6) · `SSL & TLS` (2) · `Security` (12) · `AI` (6) · `Developer Services` (23) · `Analytics & Observability` (9) · `Email` (2) · `Registrar` (2) · `Zero Trust` (18) · `Media` (3) · `Realtime` (3) · `Data Localization` (2) · `Cloudflare Sites and Services` (2)

Each group is labelled with its own count (`10 services`, `23 services`), and the page header states the total: **"Monitor the operational status of all 128 services and sites"**.

This is the most granular public service taxonomy in the corpus by a wide margin — Vercel has ~70 components, Netlify ~40, GitHub 12. And the grouping is *different from the marketing taxonomy*: the status page has `Zone Management`, `Sites`, `Registrar`, `Data Localization`, and `Cloudflare Sites and Services` as top-level groups, none of which appear in the product nav. The status IA is organised around **what can break**, the marketing IA around **what you can buy**. Two taxonomies over one portfolio, neither mapping cleanly to the other.

Two group names are defective. `Cloudflare Sites and Services` (containing `Precursor` and `Workers VPC`) is a catch-all whose name duplicates the page title (`Services & sites`) — a bucket for two items that belong elsewhere. And `Sites` (containing `Abuse Reports`, `Blog`, `Community Site`, `Developer's Site`, `Marketing Site`, `Support Site`) uses "sites" to mean *Cloudflare's own web properties*, while `Cloudflare Sites and Services` uses it differently again. **The word `sites` carries two meanings in one navigation.**

**The status site has its own four-item nav** `[observed]`: `Overview` · `Services & Sites` · `Locations` · `History`. `Locations` as a peer of `Services` is the notable entry — Cloudflare's 335+ data centres are a separate browsable status dimension, which no other product in this batch offers.

**Docs breadcrumbs are five levels with an ellipsis collapse** `[observed]`:

`Home` / `Support` / `…` / `Troubleshooting` / `HTTP Status Codes` / `Cloudflare 5xx errors`

The `…` is a rendered collapse of intermediate levels — a depth-management device for a docs tree deep enough to need one.

**Docs pages carry a four-control header, and two of the four address machines** `[observed]`:

`Last updated <date>` | `Copy as Markdown` | `View as Markdown` | **`Agent setup`**

Plus a blockquote at the top of every page, before the H1:

> "**Documentation Index** — Fetch the complete documentation index at: https://developers.cloudflare.com/support/llms.txt — Use this file to discover all available pages before exploring further."

**Per-product `llms.txt` files**, not one global index: the support docs point at `/support/llms.txt`, the Rules docs at `/rules/llms.txt`, the Fundamentals docs at `/fundamentals/llms.txt`. A machine-readable index scoped to each product area, and the instruction "Use this file to discover all available pages **before exploring further**" is written as a directive to an agent about its own search strategy. Compare Netlify (one global `llms.txt`) and Vercel (`.md` per page plus `graph.json`). Cloudflare's is the most granular of the three.

`Agent setup` as a docs-header link — a dedicated page (`/agent-setup/`) for configuring an AI agent to read the documentation — is a nav item no other product in this batch ships.

**Docs pages also embed schema.org `TechArticle` JSON-LD** with a full `publisher` block including postal address and two `contactPoint` entries (`Customer Support`, `Sales`) with `availableLanguage: ["English"]`. Structured contact routing published as page metadata.

**Footer — six columns, and `Public interest` is one of them** `[observed]`

`Getting started` · `Company` · `Public interest` · `Compliance` · `Resources` · `Developers` · `Solutions`

`Public interest` (`Project Galileo`, `Athenian Project`, `Cloudflare for Campaigns`, `Project Fairshot`, `Impact/ESG`) is a footer column of named philanthropic programmes, given equal weight to `Compliance` and `Resources`. No other product in this batch has a footer column of this kind.

**`Under attack?` in the `Getting started` footer column** `[observed]` — a question-form link to the `under-attack-hotline`, sitting between `Startups` and `Domain name search`. **An emergency route placed in the acquisition column**, on the reasoning that a company under DDoS attack is a prospect. That is a genuinely unusual and correct placement decision, and it is the single most quotable IA choice in this file.

`Compliance` column: `Compliance resources` · `Trust Hub` · `Data Protection` · `Responsible AI` · `Transparency report` · `Report abuse`. `Responsible AI` and `Transparency report` as peers of GDPR documentation.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> H1: `Everything we learned from powering 20% of the Internet—yours by default`
> Subhead: "One platform for your apps, agents, and workforce. Build, secure, and scale without managing infrastructure."
> `<title>` / `og:title`: `Cloudflare: Build for the agent era`
> meta description: "Welcome to Cloudflare - Powering the next generation of applications"

**The H1 is the most unusual construction in the batch**: a noun phrase with no verb, built on an em-dash pivot. `Everything we learned from <scale credential>` — `yours by default`. The first half establishes authority through a statistic; the second half transfers it to the reader in three words. `by default` is doing the work — it claims the reader gets the benefit without configuring anything, which is Cloudflare's actual product argument.

Note the em-dash is unspaced (`Internet—yours`), and `Internet` is capitalised. Both are deliberate house style; `the Internet` capitalised recurs in "1 in 5 sites on the Internet" and "20% of the Internet".

As with every other product in this batch, there are **three competing taglines**: the H1, the `<title>` (`Build for the agent era`), and the meta description ("Powering the next generation of applications"). The `<title>` version is the sharpest and appears nowhere on the page.

**The subhead's triad is `apps, agents, and workforce`** — the third term is what distinguishes Cloudflare from the other four. GitHub says "developers, agents, and code"; Vercel says "every app and agent". Only Cloudflare includes the *employees* of the customer as a first-class object, because it sells Zero Trust alongside CDN. One word encodes a whole second business line.

**Section headers are short assertive fragments, several with parenthetical undercuts** `[observed]`

- `Region: Earth`
- `Why choose Cloudflare`
- `Pay only when your code runs` — followed by the parenthetical `(Not to keep servers warm.)`
- `Build without boundaries`
- `Cloudflare powers 45% of the Fortune 500`
- `Cloudflare powers 1 in 5 sites on the Internet` (pricing page)
- `Scale predictably` (pricing H1)
- `Get more from Cloudflare`
- `Powerful primitives, seamlessly integrated.`

**`Region: Earth`** is the best two-word headline in the corpus. It parodies the cloud-provider region selector (`us-east-1`, `eu-west-2`) and in doing so states the entire product difference: there is no region to choose. Two words, one colon, a complete competitive argument. Its subhead — "One smart network for workloads + security — close to users, close to data." — uses `+` where most style guides would mandate "and", and repeats `close to` as an anaphora.

**`Pay only when your code runs` / `(Not to keep servers warm.)`** is the second-best. The parenthetical is a **negative restatement naming the competitor's billing model** without naming the competitor, and `keep servers warm` is precise jargon repurposed as an accusation. This is the same claim-then-contrast move as GitLab's "built in, not bolted on".

**Three run-everywhere sub-headers form a triplet with escalating scope** `[observed]`

- `Run everywhere` — "Security, connectivity, and code run in 335+ cities around the world, within 50ms of 95% of the world's population."
- `Run anywhere` — "Our network is close to your users, applications, and sites."
- `Run at massive scale` — **"No more capacity planning. Ever."**

`everywhere` / `anywhere` / `at massive scale`. The first two are near-synonyms doing different work (*we are everywhere* vs *you can be anywhere*), which is elegant but requires the body copy to disambiguate — a reader scanning only headers gets a tautology. `No more capacity planning. Ever.` is a two-sentence fragment where the second sentence is one word; the most emphatic construction on the page.

**Metrics are presented as bare figure-plus-gloss pairs** `[observed]`

`4.5x faster` — "Faster for 95% of round trips by running Workers near your backend, not you." · `310B` — "Daily cyber threats blocked." · `335+ cities` · `within 50ms of 95% of the world's population` · `20% of the Internet` · `45% of the Fortune 500` · `1 in 5 sites on the Internet`

Note `20% of the Internet` (homepage) and `1 in 5 sites on the Internet` (pricing page) are **the same statistic expressed two ways on two pages** — deliberate register variation rather than an error, and the fraction form is the more vivid.

The `4.5x faster` gloss ends `near your backend, not you` — a four-word correction of the reader's likely assumption about what "edge" means. Cloudflare is arguing against its own category's received wisdom in a stat caption.

**`Fighting infra with "cloud"` vs `Shipping with Cloudflare`** `[observed]` — a two-column comparison whose left header puts `"cloud"` in scare quotes. The body did not render in the served HTML, but the header pair alone is the argument: the incumbent is a fight, Cloudflare is shipping.

**Pricing page H1 is two words: `Scale predictably`** with the subhead "Pay only for what you use. Simple, transparent pricing for all Cloudflare products". `predictably` is the operative word — the pricing claim is about *variance*, not cost.

**Closing CTA block is identical on homepage and pricing** `[observed]`: `Build without boundaries` / "Join thousands of developers who've eliminated infrastructure complexity and deployed globally with Cloudflare. Start building for free — no credit card required." Correct reuse, and `no credit card required` placed in the CTA body rather than as a microcopy footnote.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start building for free` | Homepage hero, and both closing CTA blocks | The primary acquisition label, used three times consistently |
| `Start Building` | Footer, marketing and docs | **Title case, no "for free"** — a fourth variant of the same action in the footer of the same page |
| `Login` | Global nav | One word |
| `Log In` | Footer | **Two words, title case — same action, different rendering, same page** |
| `Dashboard` | Global nav | Shown to logged-out users |
| `Get started` | Pricing, ×3 (Free, Pro, Business) and ×2 (SASE Free, Pay-as-you-go) | Five identical CTAs distinguished only by URL query (`?pt=p`, `?pt=b`) |
| `See plans` | Pricing, Contract tier (Network & CDN) | |
| `See packages` | Pricing, Contract tier (SASE) | **Two labels for the same enterprise destination, two tabs apart** |
| `See Free plan` / `See Pro plan` / `See Business plan` / `See Contract plan` | Homepage pricing preview, ×4 | `See <PlanName> plan` — the plan name inside the CTA. Repeated again for the SASE tabs (`See Pay-as-you-go plan`) |
| `See more` | Homepage developer-platform pricing card, ×2 | Bare, no object |
| `Compare all features` | Pricing, ×2 (once per plan family) | |
| `Expand all` | Pricing comparison table, ×2 | |
| `Activate` | Add-on cards, ×5 (`Argo Smart Routing`, `Load Balancing`, `Stream`, `Cache Reserve`, `Log Explorer`, `Advanced Certificate Manager`, `Client-Side Security`) | **`Activate` rather than `Buy` or `Add`** — the dominant add-on verb |
| `Speed Up My Site` | `Automatic Platform Optimization` add-on | **First-person possessive, title case** — the only CTA of its kind on the page, and an outlier against its five `Activate` siblings |
| `Register` | `Cloudflare Registrar` add-on | |
| `Get started` | `Workers` add-on card | A seventh CTA verb inside the same ten-card add-on grid |
| `Under attack?` | Footer, `Getting started` column | Question-form emergency link |
| `Contact sales` | Footer | |
| `Find a partner` | Footer | |
| `Domain name search` | Footer | Noun phrase as a link |
| `Report abuse` | Footer, `Compliance` | |
| `Report security issues` | Footer legal strip | Separate from `Report abuse` — two reporting routes, distinguished |
| `Your privacy choices` | Footer legal strip | With a privacy-options icon |
| `View docs` | Closing CTA secondary | |
| `Subscribe to updates` | Status page, overview and services | |
| `View All` | Status page, ×2 (incidents, maintenance) | Title case on both words |
| `View all future maintenance` | Status page | Sentence case — **inconsistent with `View All` immediately above it** |
| `Skip to main content` | Marketing, docs, status | Consistent across three properties |
| `Copy as Markdown` / `View as Markdown` | Docs header | Two adjacent markdown controls |
| `Agent setup` | Docs header | |
| `Was this helpful?` → `Yes` / `No` | Docs page foot | Binary, like GitHub's |
| `Go to **HTTP Traffic** ↗` / `Go to **Analytics** ↗` | **Deep links from inside error documentation into the dashboard** | Bold destination name plus an external-link arrow |
| `Previous <title>` / `Next <title>` | Docs pager | |
| `Status API` / `RSS Feeds` / `Notifications` | Status footer | Three machine-consumption routes |
| `Support (opens in new tab)` / `Dashboard (opens in new tab)` / `About Us (opens in new tab)` etc. | Status page, all external links | **Every external link carries "(opens in new tab)" in its accessible name** |

**Observations.** Two things stand out, one good and one bad.

The good: **`Go to HTTP Traffic ↗`** and **`Go to Analytics ↗`** are dashboard deep-links embedded *inside error-troubleshooting steps*, with the destination panel named in bold and a `?to=/:account/:zone/security/analytics` path that resolves per-account. A user reading "search the Security Events log for the Ray ID" gets a button that opens their own account's Security Events log. **Routing the reader from documentation into the exact authenticated screen the instruction refers to** is the highest-value CTA pattern in this file, and it is the correct answer to the perennial "the docs say go to Settings > X but I can't find it" problem.

Also good: `(opens in new tab)` appended to every external link's accessible name on the status page. Verbose, but it is the correct practice and no other product in this batch does it.

The bad: the CTA inventory is **the least disciplined in the batch**. `Login` / `Log In` and `Start building for free` / `Start Building` differ in casing and wording between the nav and the footer of the same page. `See plans` / `See packages` differ between two tabs of the same pricing control. `View All` / `View all future maintenance` differ between adjacent status links. And the ten add-on cards carry **five different CTA verbs** (`Activate` ×7, `Speed Up My Site`, `Register`, `Get started`) for what is structurally one action — with `Speed Up My Site` the clear outlier, in first-person title case, against seven neighbours reading `Activate`.

## T4 Onboarding & getting-started

`[absent]` on the marketing surface — there is no numbered how-it-works sequence, no path-selection block, and no quickstart on the homepage. The single onboarding affordance is `Start building for free` → `dash.cloudflare.com/sign-up`, with `no credit card required` as the only friction disclosure.

This is a genuine contrast with the other four. GitHub ships five SDLC tabs, GitLab a four-pillar accordion, Vercel five documented deployment methods, Netlify four equal entry paths with per-path promises. Cloudflare ships one button. The reason is structural: Cloudflare's core onboarding is a **DNS nameserver change**, which is neither demonstrable in a marketing block nor comparable across the three product families it sells.

`[documented]` — onboarding language does appear, but as a **precondition stated inside feature documentation**:

> "Custom Errors require that you [proxy the DNS records] of your domain (or subdomain) through Cloudflare."

`proxy the DNS records` is the onboarding act, named as a prerequisite to a downstream feature rather than as a step in a setup flow. The same pattern recurs throughout: capabilities are gated on `proxied` status, and the docs state the gate at each capability rather than teaching the setup once.

**The one onboarding-shaped artefact is the plan-selection copy** `[observed]`, which is written as four audience statements rather than four feature lists:

- `Free` — "For personal or hobby projects that aren't business-critical."
- `Pro` — "For professional websites that aren't business-critical."
- `Business` — "For small businesses operating online."
- `Contract` — "For mission-critical applications that are core to your business."

**`business-critical` is used as the sorting axis, negatively, twice.** Free and Pro are both defined by what they are *not* suitable for, and `Contract` is defined by the same axis positively ("mission-critical… core to your business"). A four-tier ladder in which the middle two tiers disclaim their own suitability for important work is unusually candid pricing copy — most vendors would not write "for professional websites that aren't business-critical" about a paid plan.

The SASE tier descriptions do the same with organisational shape rather than criticality:

- `Free` — "Teams under 50 users or enterprise proof-of-concept tests."
- `Pay-as-you-go` — "Teams over 50 solving narrow SSE use cases without enterprise support."
- `Contract` — "Organizations building toward full-featured SASE or workspace security."

`solving narrow SSE use cases without enterprise support` describes the Pay-as-you-go customer by their *limitations*, again disclaiming rather than selling. And `building toward full-featured SASE` frames the Contract tier as a destination the reader is already travelling to.

**`Agent setup` as a named onboarding surface for AI agents** `[observed]` — a docs-header link on every page pointing at `/agent-setup/`. Not harvested, but its existence means Cloudflare treats "configure your agent to use our docs" as an onboarding task with its own page. Combined with per-product `llms.txt` files, this is the most developed agent-onboarding surface in the batch.

## T5 Form & field labels

`[absent]` — no product forms are reachable pre-auth. The marketing site has no newsletter field, no search input in the served markup, and no contact form; sign-up is entirely at `dash.cloudflare.com`.

`[observed]` — the only input affordance found is the docs search control, labelled `Search` with keyboard hints rendered as two adjacent key caps: `Ctrl` `K`. A two-key shortcut exposed as visible chrome beside the label.

`[documented]` — settings-path notation is a consistent docs convention using bold plus `>`:

`**Security** > **Analytics**, in the **Events** tab` · `**Security** > **Events**` · `**Error Pages**` · `**Origin Error Pages**` · `**SSL/TLS mode**` set to `**Full**` or `**Full (Strict)**` · `**Add filter**` → `**Edge status code**` or `**Origin status code**`

Two things worth recording. First, the Error 1020 page documents **two different settings paths for the same log, side by side, without explaining why** — one version says `Security > Analytics, in the Events tab` and the immediately following duplicate block says `Security > Events`. The page ships the resolution steps twice with one differing step, presumably for two dashboard versions, but the condition is never stated. **A reader cannot tell which path applies to them.** Defect, on a page whose whole purpose is unblocking a locked-out visitor.

Second, `**Full (Strict**)` appears in the Error 521 page with the closing bold marker inside the parenthesis — `**Full (Strict**)` renders as `Full (Strict)` with a stray character. Markup defect in a reference page.

**Named configuration values that function as field vocabulary** `[documented]`: `Flexible` / `Full` / `Full (Strict)` as the three SSL/TLS modes, each with its port consequence stated — "Port 80 for **Flexible**, or Port 443 for **Full** and **Full (Strict)**." Three mode names whose differences are explained by the concrete thing that must be listening. That is the right way to document a mode selector: name the mode, then name the observable consequence of choosing it.

## T6 Status & state language

Along with T7, the reason this product is in the corpus. Cloudflare's status vocabulary operates at three levels — service status, incident lifecycle, and error state — and the service-status level is the most granular public artefact in this entire corpus.

### 6.1 Four service states, with counts `[observed]`

`Operational` · `Degraded` · `Offline` · `Maintenance`

Displayed as a live tally: `Operational 127` · `Degraded 1` · `Offline 0` · `Maintenance 0`.

Three things distinguish this from the Statuspage default used by GitHub, Vercel, and Netlify (`Operational` / `Degraded Performance` / `Partial Outage` / `Major Outage` / `Maintenance`).

First, **Cloudflare collapses `Partial Outage` and `Major Outage` into a single `Offline`**. Four states instead of five, and the two outage grades that the other three products distinguish are merged. This is arguably the better decision at 128 services: a per-service binary (up / degraded / down) is scannable where a per-service severity grade is not, and severity moves to the incident level instead (see 6.2).

Second, `Degraded` rather than `Degraded Performance` — one word, and it therefore also covers degraded *availability*, which is the distinction GitHub's incident copy keeps drifting across.

Third, **the counts are the headline**. There is no `All Systems Operational` banner; the page leads with `127 / 1 / 0 / 0`. A user learns the shape of the outage before reading a single service name. At this portfolio size that is the right summary, and it is a genuinely different design decision from the binary "all clear" banner the other four use.

### 6.2 Incident severity is a separate axis, labelled on the incident `[observed]`

Recent incidents render as `<title> <Severity> <State> <timestamp>`:

- `Increased Cache Failures` · `Resolved` · `Sep 21, 2026, 18:15 UTC`
- `Unable to start containers in Asia-Pacific` · `Minor` · `Resolved` · `Sep 21, 2026, 13:23 UTC`
- `Unable to register certain domains` · `Minor` · `Resolved` · `Sep 21, 2026, 09:49 UTC`
- Active: `Incorrect geo location for some Cloudflare WARP users` · `Identified` · `WARP` · `Identified`

**`Minor` appears as an explicit severity label**, separate from the lifecycle state. Two of three recent incidents carry it; the first does not — so severity is optional, and its absence is ambiguous (unclassified, or more than minor?). Recorded as a defect: an optional severity label on a status page means the reader cannot distinguish "not minor" from "not labelled".

The active incident renders `Identified` **twice** and its affected service (`WARP`) between them — a template artefact producing a duplicated state label in the accessible text.

**Incident titles are symptom-first and scoped** `[observed]`. All four observed titles name the user-visible failure, and three of four add a scope qualifier:

| Title | Scope device |
|---|---|
| `Increased Cache Failures` | none |
| `Unable to start containers in Asia-Pacific` | geographic |
| `Unable to register certain domains` | `certain` |
| `Incorrect geo location for some Cloudflare WARP users` | `some` |

**`Unable to <verb>` is the dominant construction** — the user's blocked action, in the user's terms, not the system's component. Compare Vercel's `Elevated Errors Triggering Deployments` (system-side) and GitHub's `Incident with Pull Requests` (component-named). Cloudflare writes the incident title as the sentence the affected user would say. That, plus `certain` and `some` as explicit partial-scope hedges in the title itself, means a reader can often self-exclude before opening the incident.

Casing is Title Case in two (`Increased Cache Failures`, `Unable to start containers…` — actually sentence case after the first word) and inconsistent across the set: `Increased Cache Failures` (Title Case) vs `Unable to register certain domains` (sentence case). Same defect as Vercel and Netlify.

### 6.3 Incident-density labels — a status idea no one else ships `[observed]`

Every service on the Services & Sites page carries two accessible-text labels describing its recent reliability:

> `30-day incident history for CDN/Cache: 2 days with incidents. Use arrow keys to review each day`
> `90-day incident history for CDN/Cache: 6 days with incidents. Use arrow keys to review each day`

Or, where clean:

> `30-day incident history for Always Online: no days with incidents`

**This is the standout status-content finding in the corpus.** Three things about it:

1. **The metric is "days with incidents", not uptime percentage.** A count of bad days is comprehensible without knowing what "99.97%" means in minutes, and it is harder to game. `R2: 7 days with incidents` in 30 days tells a reader more than `99.9% uptime` ever could.
2. **Two windows are given, always both.** 30-day and 90-day side by side lets a reader distinguish a recent regression from a chronic problem. `Workers AI: 1 day (30d) / 33 days (90d)` and `WARP: 26 days (30d) / 27 days (90d)` are opposite stories, and both are legible at a glance.
3. **The label doubles as keyboard instruction**: `Use arrow keys to review each day`. The accessible name of the sparkline both states the summary *and* teaches the interaction. One string, two jobs, and it means a screen-reader user gets the data rather than a chart they cannot see.

Variants are grammatically controlled: `no days with incidents` (no instruction appended, because there is nothing to review), `1 day with incidents` (singular), `2 days with incidents` (plural). **Pluralisation and the conditional instruction are both handled correctly**, which is rare in interpolated strings at this volume (256 such labels on one page).

The honesty is notable too. `WARP: 26 days with incidents` in the last 30 is published without softening, beside a live `Degraded` state and a live incident. A vendor publishing "this service has been broken on 26 of the last 30 days" on its own status page is a real transparency decision.

### 6.4 Error state as a named, categorised, machine-readable thing `[documented]`

Cloudflare's deepest status contribution is that **errors carry structured state metadata**, published in the `error-responses` reference. Every Cloudflare-generated error exposes:

| Field | What it states |
|---|---|
| `error_code` | The numeric code (522, 1015) |
| `error_name` | "Machine-readable name in snake_case… **Stable — suitable for programmatic matching**" |
| `error_category` | "Fault classification… **Stable — suitable for programmatic matching**" |
| `cloudflare_error` | "Always true. **Confirms this error was generated by Cloudflare, not the origin.**" |
| `retryable` | "Whether the error is transient and the request can be retried." |
| `retry_after` | "Seconds to wait before retrying. Present only when retryable is true." |
| `owner_action_required` | "Whether the site operator needs to take action to resolve the error." |
| `zone` | The requested hostname |
| `ray_id` | The unique occurrence identifier |

**Four boolean/enum state flags that answer the four questions any error state needs to answer**: whose fault (`error_category`, `cloudflare_error`), can I retry (`retryable`), when (`retry_after`), and can *I* fix it or must someone else (`owner_action_required`).

`owner_action_required` is the one no other product ships. It encodes, in a boolean, the distinction between "you can fix this" and "only the site owner can" — which for a CDN sitting between a visitor and a customer is the single most important thing a visitor needs to know. It is the machine-readable form of the sentence Cloudflare writes in prose elsewhere ("Only the website owner can contact Cloudflare for technical support").

Two fields are explicitly marked **"Stable — suitable for programmatic matching"** — a published compatibility promise about which strings will not change. That is a content-governance statement inside an API reference: it tells integrators which of our words they may depend on. Almost no product makes that commitment explicitly.

### 6.5 Retry state, published as a table `[documented]`

`retry_after` values are published per error code:

| 5xx code | Seconds | | 1xxx code | Seconds | Error name |
|---|---|---|---|---|---|
| 500 | 30 | | 1004 | 120 | DNS resolution error |
| 502 | 60 | | 1015 | 30 | Rate limited |
| 504 | 120 | | 1033 | 120 | Argo Tunnel error |
| 520 | 60 | | 1038 | 60 | HTTP headers limit exceeded |
| 521 | 120 | | 1200 | 60 | Cache connection limit |
| 522 | 120 | | 1205 | 5 | Too many redirects |
| 523 | 120 | | | | |
| 524 | 120 | | | | |
| 525 | `N/A (not retryable)` | | | | |
| 526 | `N/A (not retryable)` | | | | |

And the negative statement: "Non-retryable codes (525, 526) do not include the `Retry-After` header." / "**All other 1xxx error codes are non-retryable and do not include the `Retry-After` header.**"

**Publishing the exact back-off period per error code, and stating which codes are deliberately non-retryable, converts "try again later" into a number.** The 5-second value for `1205 Too many redirects` versus 120 for origin timeouts encodes a judgement about how long each fault typically takes to clear. And the precedence rule is stated: "If a WAF rate limiting rule has already set a dynamic `Retry-After` value on the response, that value takes precedence over the default."

`525` and `526` being non-retryable is the interesting case, with the reason given in the categories table: "No. **Retrying will not help until the operator fixes the TLS configuration.**" A state explicitly marked "waiting will not help" — which is the information that stops a client hammering an endpoint forever.

### 6.6 Named error-page states `[documented]`

Seven error-page types, each with a human name, a description, an HTTP status, and an API identifier:

| Page type | Status | API identifier |
|---|---|---|
| `WAF block` | `403` | `waf_block` |
| `IP/Country block` | `403` | `ip_block` |
| `IP/Country challenge` | `403` | `country_challenge` |
| `500 class errors` | — | `500_errors` |
| `1000 class errors` | — | `1000_errors` |
| `Managed challenge / I'm Under Attack Mode` | `403` | `managed_challenge` |
| `Rate limiting block` | `429` | `ratelimit_block` |

**Three of the seven are `403`** with different human names and different API identifiers — so the HTTP status does not distinguish them and the proprietary vocabulary must. That is exactly the case Cloudflare's `error_name` / `error_category` fields exist to solve, and the table shows why they are necessary.

`Managed challenge / I'm Under Attack Mode` is the one defect here: **two names joined by a slash for one page type**, with an apostrophe and an unexpanded product mode inside the label. Its API identifier (`managed_challenge`) picks only one of the two. `500 class errors` / `1000 class errors` are also inconsistent with the `5xx` / `1xxx` notation used everywhere else in the docs — three notations for two error families across one product (`5XX`, `5xx`, `500 class`).

### 6.7 Scale language as status `[observed]`

`335+ cities` · `within 50ms of 95% of the world's population` · `310B daily cyber threats blocked` · `20% of the Internet` · `45% of the Fortune 500`. All figures, all on the homepage, functioning as ambient reliability claims rather than as status. `Region: Earth` is the headline version of the same idea.

## T7 Error, failure & recovery

The deepest T7 in the corpus. Cloudflare publishes **43+ named error codes across two proprietary families**, a fault-classification taxonomy, a structured machine-readable error format built on an IETF RFC, a per-code retry schedule, and a six-level override priority chain. Nothing else in this batch is close.

### 7.1 Two proprietary error families, and the split is explained in one sentence `[documented]`

> "HTTP errors such as `409`, `530`, `403`, and `429` are returned in the **HTTP status header** of a response, while 1XXX errors appear in the **HTML body** of the response."

One sentence establishing where each family lives on the wire. It matters because it tells a developer which family they can detect programmatically from a status code and which requires parsing a page — which is precisely the problem the structured-response feature later solves.

**`5xx` family — 12 named codes** `[documented]`, each titled `Error <code>: <lowercase description>`:

`Error 500: internal server error` · `Error 501: not implemented` · `Error 502 bad gateway or error 504 gateway timeout` · `Error 503: service temporarily unavailable` · `Error 520: web server returns an unknown error` · `Error 521: web server is down` · `Error 522: connection timed out` · `Error 523: origin is unreachable` · `Error 524: a timeout occurred` · `Error 525: SSL handshake failed` · `Error 526: invalid SSL certificate` · `Error 530`

The 520–526 range is Cloudflare's own extension to HTTP, and the descriptions are written **from the proxy's point of view about the origin**: `web server is down`, `origin is unreachable`, `web server returns an unknown error`. A visitor reading `521: web server is down` learns that the failure is behind Cloudflare, not at Cloudflare — which is the entire purpose of having a private 5xx range.

Three inconsistencies in twelve titles: `Error 502 bad gateway or error 504 gateway timeout` has **no colon and a lowercase second "error"**, breaking the `Error NNN: description` pattern used by the other eleven; `Error 530` has **no description at all**; and `Error 524: a timeout occurred` is the only one phrased as a past-tense clause rather than a state (`is down`, `is unreachable`, `timed out`).

**`1xxx` family — 31 named codes** `[documented]`. The titles are the artefact, because many of them are **the literal sentence shown to the blocked visitor**:

| Code | Title |
|---|---|
| 1000 | `DNS points to prohibited IP` |
| 1001 | `DNS resolution error` |
| 1002 | `DNS points to Prohibited IP` / `Restricted` (two variants, same code) |
| 1003 | `Access Denied: Direct IP Access Not Allowed` |
| 1004 | `Host Not Configured to Serve Web Traffic` |
| 1005 | `Access Denied: Autonomous System Number (ASN) banned` |
| 1006, 1007, 1008, 1106 | `Access Denied: Your IP address has been banned` |
| 1009 | `Access Denied: Country or region banned` |
| 1010 | `The owner of this website has banned your access based on your browser's signature` |
| 1011 | `Access Denied (Hotlinking Denied)` |
| 1012 | `Access Denied` |
| 1013 | `HTTP hostname and TLS SNI hostname mismatch` |
| 1014 | `CNAME Cross-User Banned` |
| 1015 | `You are being rate limited` |
| 1016 | `Origin DNS error` |
| 1018 | `Could not find host` |
| 1019 | `Compute server error` |
| 1020 | `Access denied` |
| 1023 | `Could not find host` |
| 1025 | `Please check back later` |
| 1033 | `Argo Tunnel error` |
| 1034 | `Edge IP Restricted` |
| 1035 | `Invalid request rewrite (invalid URI path)` |
| 1036 | `Invalid request rewrite (maximum length exceeded)` |
| 1037 | `Invalid rewrite rule (failed to evaluate expression)` |
| 1040 | `Invalid request rewrite (header modification not allowed)` |
| 1041 | `Invalid request rewrite (invalid header value)` |
| 1101, 1102 | `Rendering error` (both) |
| 1104 | `A variation of this email address is already taken in our system. Only one variation is allowed.` |
| 1200 | `Cache connection limit` |

**The grammatical range here is the finding, and it is mostly a problem.** Five distinct registers coexist:

1. **Second-person address to the blocked visitor** — `You are being rate limited`, `The owner of this website has banned your access based on your browser's signature`. These are the strings a human actually sees, and they are good: `1010` names the *cause* (browser signature), attributes the decision to the *site owner* rather than Cloudflare, and does so in one sentence.
2. **Bare `Access Denied` variants** — `1012: Access Denied`, `1020: Access denied`, `1011: Access Denied (Hotlinking Denied)`, `1003: Access Denied: Direct IP Access Not Allowed`. **Four codes sharing a stem, with inconsistent capitalisation (`Denied` vs `denied`) and three different suffix conventions (colon, parenthesis, none).** `1012` and `1020` have identical human-facing titles differing only in the capital D — for a visitor, indistinguishable.
3. **System-object noun phrases** — `Origin DNS error`, `Argo Tunnel error`, `Compute server error`, `Cache connection limit`, `Edge IP Restricted`. Meaningless to a visitor, appropriate for an operator.
4. **Politeness** — `1025: Please check back later`. The only `please` in the error catalogue, and the only title with no diagnostic content at all.
5. **A full two-sentence UI message as a title** — `1104: A variation of this email address is already taken in our system. Only one variation is allowed.` This is a *form-validation message* sitting in a network-error catalogue, complete with terminal punctuation and a second explanatory sentence. It is the odd one out by a wide margin and suggests the 1xxx range has accumulated unrelated failures.

**Duplicate titles across distinct codes** are a real findability defect: `1018` and `1023` are both `Could not find host`; `1101` and `1102` are both `Rendering error`; `1000` and `1002` are both `DNS points to prohibited IP` (differing only in the capital P on `Prohibited`). A user pasting the visible string into search cannot reach the right page.

### 7.2 The structured error response — the single best error artefact in this corpus `[documented]`

Cloudflare returns machine-readable errors via HTTP content negotiation, built on **RFC 9457 (Problem Details for HTTP APIs)**, and the design is worth reproducing in full because every field earns its place.

The JSON for a 522:

```json
{
  "type": "https://developers.cloudflare.com/.../error-522/",
  "title": "Error 522: Connection timed out",
  "status": 522,
  "detail": "Cloudflare could not establish a TCP connection to the origin server. The TCP handshake timed out, which may indicate the origin is overloaded, firewalling Cloudflare, or unreachable at the network level.",
  "instance": "9f140b785e57c458",
  "error_code": 522,
  "error_name": "connection_timeout",
  "error_category": "origin",
  "ray_id": "9f140b785e57c458",
  "timestamp": "2026-04-24T09:22:40Z",
  "zone": "example.com",
  "cloudflare_error": true,
  "retryable": true,
  "retry_after": 120,
  "owner_action_required": true,
  "what_you_should_do": "**Wait and retry.** Back off for at least 120 seconds. If the error persists, the website operator should verify firewall rules and ensure the origin accepts connections from Cloudflare IP ranges.",
  "footer": "This error was generated by Cloudflare on behalf of the website owner."
}
```

Five content-design observations.

**First, `what_you_should_do` is a first-class API field containing formatted prose.** Not a documentation link, not an error code — a written instruction, with **Markdown bold inside a JSON string value**, shipped in the response body. The recovery action travels with the failure, over the wire, to whoever or whatever receives it. No other product in this corpus puts the remedy in the payload.

Its internal structure is a three-move template: **imperative summary in bold** (`**Wait and retry.**`) → **specific quantified action** (`Back off for at least 120 seconds.`) → **escalation with named actor and named check** (`If the error persists, the website operator should verify firewall rules and ensure the origin accepts connections from Cloudflare IP ranges.`). Bold-lead, number, escalation. That is a reusable microcopy template for any recovery instruction.

**Second, `type` is a documentation URL.** RFC 9457 mandates it, and Cloudflare populates it with the exact troubleshooting page. The error carries its own docs link as a standard field, so any RFC-aware client can surface "read more" without Cloudflare-specific code. This is Vercel's "most error messages will provide a clue… and a link to relevant documentation" made mechanical.

**Third, `detail` names the fault and the candidate causes in one sentence.** "Cloudflare could not establish a TCP connection to the origin server. The TCP handshake timed out, which may indicate the origin is **overloaded, firewalling Cloudflare, or unreachable at the network level**." Subject (Cloudflare), the action it could not complete, the mechanism, then three ranked hypotheses. The field's own definition is instructive: "Plain-text explanation of what went wrong **and which party is responsible**."

**Fourth, `footer` is an attribution line**: `"This error was generated by Cloudflare on behalf of the website owner."` **`on behalf of`** is the key phrase — Cloudflare is disclaiming authorship of the *decision* while owning the *delivery*. For a proxy that blocks people at a customer's instruction, that six-word clause is the entire liability and trust position, and it is shipped in every error. It is the T7 analogue of Wise's "state what you are not".

**Fifth, the Markdown variant is structurally the same content with prose headings** `[documented]`:

```markdown
---
error_code: 522
error_name: connection_timeout
...
---
# Error 522: Connection timed out
## What Happened
Cloudflare could not establish a TCP connection...
## What You Should Do
**Wait and retry.** Back off for at least 120 seconds...
---
This error was generated by Cloudflare on behalf of the website owner.
```

**`## What Happened` and `## What You Should Do` as the two mandated section headings of an error document.** Two headings, second person, plain words. That pairing — cause then action, in the reader's voice — is the most directly copyable structure in this entire file, and it works at any scale from a toast to a full error page.

(Note the inconsistency: the Markdown headings are Title Case — `What Happened`, `What You Should Do` — against Cloudflare's own predominantly sentence-case docs headings. And `what_you_should_do` in snake_case maps to `What You Should Do`, a third rendering of the same phrase.)

**Content negotiation is published as a lookup table** `[documented]` — nine `Accept` header values mapped to three output formats, including the tie-break rules ("When multiple formats are acceptable, quality factors (`q` values) determine precedence. At the same quality value, the first-listed type wins"). And the availability statement: "Structured error responses are available on **all plans, including the Free plan.**"

The rationale is stated in the page description itself: "**including structured JSON and Markdown for agents and API clients**". Cloudflare is content-negotiating its error pages so that an AI agent hitting a blocked URL receives a parseable document rather than a CAPTCHA page. That is the most consequential 2026-specific error-content decision in the corpus.

And the docs spell out the trade-off for customers: "If you want agents to receive structured responses while keeping your custom HTML for browsers, add a Custom Error Rule that matches on the `Accept` header." With a worked expression:

> `(http.response.code eq 522) and (any(http.request.headers["accept"][*] contains "application/json"))`

**Serving different error content to browsers, API clients, and agents from one configuration** — and documenting it as three named audiences — is a genuinely new content-design surface.

### 7.3 Fault classification — ten categories, published `[documented]`

`error_category` classifies "the fault so that clients can route retry and escalation behavior without parsing the prose fields."

**5xx categories — three, with a retry verdict each:**

| Category | Codes | Meaning | Retry? |
|---|---|---|---|
| `origin` | 502, 504, 520–524 | "The origin server is responsible. Transient infrastructure failure." | "Yes. Back off using `retry_after`." |
| `cloudflare` | 500 | "Cloudflare encountered an internal error. The origin was not necessarily involved." | "Yes. Short retry (30s)." |
| `ssl` | 525, 526 | "The origin's TLS configuration is broken (handshake failure or invalid certificate)." | "No. Retrying will not help until the operator fixes the TLS configuration." |

**A vendor publishing a machine-readable field whose value can be `cloudflare`** — i.e. "this one is our fault" — is the notable item. `cloudflare_error: true` confirms Cloudflare generated the response; `error_category: "cloudflare"` confirms Cloudflare *caused* it. Two different admissions, both fielded.

**1xxx categories — ten, with example codes:**

`access_denied` (1005–1012, 1106–1109) · `rate_limit` (1015, 1025, 1027, 1200) · `dns` (1001, 1016) · `config` (1004, 1014, 1033, 1043, 1047, 1049) · `tls` (1017, 1028, 1029, 1044) · `legal` (1026, 1039) · `worker` (1042, 1100–1105) · `rewrite` (1036, 1037) · `snippet` (1201–1206) · `unsupported` (1045)

**`legal` — "Legal restrictions (DMCA, country blocks)" — is a fault category.** A machine-readable classification that means "this block is a legal instruction, not a technical failure". No amount of retrying or reconfiguring resolves it, and the category says so by existing. For a company that publishes a `Transparency report`, having `legal` as an error category is consistent and unusually honest.

Note the categories reveal codes absent from the public 1xxx index: `1017`, `1026`, `1027`, `1028`, `1029`, `1038`, `1039`, `1042`, `1043`, `1044`, `1045`, `1047`, `1049`, `1103`, `1105`, `1107`, `1108`, `1109`, `1201`–`1206`. **The categories table documents ~20 error codes that the error index does not list.** Two references disagree on the size of the catalogue.

### 7.4 The per-error page template `[documented]`

Consistent across both families:

1. **H1 = `Error <code>`**, then an H2 restating `Error <code>: <description>`
2. **One-sentence definition** — `Error 521 occurs when the origin web server refuses connections from Cloudflare.` / `This error indicates that access to the website is denied by a Cloudflare firewall rule.`
3. **`### Common causes`** — "The two most common causes of `521` errors are: Offlined origin web server application. Blocked Cloudflare requests." Ranked, and the count stated (`The two most common`)
4. **`### Resolution`** — a checklist
5. **Community link** — "Find additional troubleshooting information on the [Cloudflare Community]"
6. **`Was this helpful?` `Yes` `No`**

**The `Resolution` checklists are imperative and specific**, and the 521 page's is the model:

> "Ensure your origin web server is responsive."
> "Review origin web server error logs to identify web server application crashes or outages."
> "Confirm Cloudflare IP addresses are not blocked or rate limited."
> "Allow all Cloudflare IP ranges in your origin web server's firewall or other security software."
> "Confirm that — if you have your **SSL/TLS mode** set to **Full** or **Full (Strict)** — your origin supports HTTPS…"
> "Ensure that your origin web server application is actively bound and listening on the port required by your SSL/TLS mode: Port 80 for **Flexible**, or Port 443 for **Full** and **Full (Strict)**."

Six items, four verbs (`Ensure`, `Review`, `Confirm`, `Allow`), and the last two are **conditional on a setting the reader may not have checked**, with the condition stated inline. `Port 80 for Flexible, or Port 443 for Full` converts an abstract mode into a testable fact.

### 7.5 Dual-audience error content — the distinguishing feature `[documented]`

Cloudflare sits between a **site visitor** who sees the error and a **site owner** who can fix it, and the error content addresses both explicitly. The Error 1020 page is the clearest case:

> "**If you are not the website owner**, provide the website owner with a screenshot of the `1020` error message you received."
>
> "**If you are the website owner:**
> 1. Retrieve a screenshot of the 1020 error **from your customer**.
> 2. Search the Security Events log … for the **Ray ID** or client IP address from the visitor's 1020 error message.
> 3. Assess the cause of the block and either update the Firewall Rule or allow the visitor's IP address in IP Access Rules."

**Two audiences, two instruction sets, on one page, branched by an if-clause.** The visitor's instruction is one sentence and its only action is to *hand the problem to someone else* — correctly, since they have no other option. The owner's instruction is a three-step investigation keyed to the artefact the visitor was told to produce. **The two halves interlock: step 1 of the owner path consumes the output of the visitor path.**

That is an exceptionally well-designed piece of error content. It solves the hardest problem in intermediary-product error copy — the person who sees the message cannot act on it — by giving the powerless reader a job that makes the powerful reader's job possible.

The `Ray ID` is the token that makes it work: a unique per-request identifier printed on the error page, searchable in the owner's dashboard. Cloudflare's docs define it, link it, and build the recovery procedure around it. Compare Vercel's `::vercel:REQUEST_ID::` token recommendation — same idea, and Cloudflare's is the more developed implementation because the search path is documented end to end.

**The support-boundary statement is repeated in three places** `[documented]`:

> "Cloudflare Support only assists the domain owner to resolve issues. **If you are a site visitor, report the problem to the site owner.**"
> "Only the website owner can contact Cloudflare for technical support. You can find a domain's contact details via the Whois database."
> "This error was generated by Cloudflare on behalf of the website owner." *(the `footer` field)*

Three statements of the same boundary at three levels — a support note, a docs section, and an API field — plus a route out for the visitor (`Whois`). Telling a locked-out visitor *who to contact and how to find them* is the difference between a dead end and a path.

**Plan-gated support is disclosed in the same block** `[documented]`: "Pro, Business and Enterprise plan users have access to email support. Business and Enterprise users can also access chat support." Support channel availability stated inside the error documentation, where the reader is deciding whether to escalate.

### 7.6 Required-details block — a pre-written support ticket `[documented]`

> "When contacting your hosting provider, share the following information:
> - The specific `5XX` error code and message.
> - The time and timezone when the `5XX` error occurred.
> - The URL that resulted in the HTTP `5XX` error (for example, `https://www.example.com/images/icons/image1.png`)."

Three fields, with an example for the one most likely to be given vaguely. Then a diagnostic hint that anticipates the hosting provider's first wrong answer:

> "**The cause of the error is not always found in the origin server's error logs.** Be sure to check the logs of any load balancers, caches, proxies, or firewalls between Cloudflare and the origin web server."

**Cloudflare is coaching its customer on how to argue with their hosting provider.** The customer will be told "there's nothing in our logs"; this sentence pre-arms them with the four other places to look. Content written for a conversation that happens outside the product.

And a timezone warning appears twice: "Convert the UTC timestamp of the `1020` error to your local timezone when searching in the Security Events log." A one-line note preventing the commonest log-search failure.

### 7.7 Custom error overrides — a six-level priority chain `[documented]`

Customers can replace Cloudflare's error pages, and the resolution order is published as a numbered six-step chain: account-level Error Page → zone-level Error Page → account-level Custom Error Rule → zone-level Custom Error Rule → rule-specific block response → default error page in the negotiated format.

Plus a separately stated three-level summary in the error-responses reference (Custom Error Rules → Error Pages → structured responses). **Two published priority orders, one six-step and one three-step, on two pages** — consistent but differently granular, and a reader who finds only one will not know the other exists.

**Three constraints stated with their reasons** `[documented]`:

- "Error Pages do not apply to responses with an HTTP status code of `500`, `501`, `503`, or `505`. **These exceptions help avoid issues with specific API endpoints and other web applications.**"
- "Cloudflare will return the default Cloudflare error page instead of your custom Error Pages **if the incoming request does not contain an `accept-encoding` header.**"
- "**The processed page must not exceed approximately 1.5 MB.**" — with the reason: "Because a custom error asset is served to every visitor that triggers the associated rule, a large asset can generate significant egress traffic."

The third is the good one: a size limit justified by the *cost to the customer* rather than by platform capacity. And `approximately` is honest hedging on a stated limit.

`Error Pages do not perform content negotiation` — a one-line statement of a capability gap, given its own emphasis in the comparison tables, because it is the thing that silently breaks agent access for customers who configured an Error Page.

## T8 Empty states

`[absent]` — no in-product empty state is reachable pre-auth, and Cloudflare publishes no design-system or empty-state guidance on any public URL located in this harvest.

`[observed]` — two no-content strings, both on the status site and both Cloudflare-authored (the status site is custom-built, not Statuspage, so these are not third-party furniture):

- `No active maintenance` — under the `Active maintenance` heading, followed by `View all future maintenance`
- `30-day incident history for Always Online: no days with incidents` — the clean-record variant of the incident-density label

**`No active maintenance` followed by a link to future maintenance is a correctly constructed empty state**: it states the absence in three words and then offers the adjacent thing the reader probably wants. Most status pages stop at the negative.

The incident-density variant is the better artefact. When a service has a clean record, the label drops the trailing `Use arrow keys to review each day` instruction — because there is nothing to review. **A conditional instruction correctly suppressed in the empty case**, at a scale of 256 generated strings. That is the interpolation discipline the Wise exemplar's empty-quotes defect illustrates the absence of.

**The error pages themselves function as Cloudflare's principal "empty" surface** — `1025: Please check back later` is the closest thing to a holding state in the catalogue, and `Always Online` is a named product whose entire purpose is to serve cached content instead of an empty error page when an origin is down. Recorded as adjacent rather than as an empty state proper.

## T9 Notifications & system messages

`[observed]` — thin, and what exists is routing rather than copy.

**Status-page subscription is offered as three machine-consumption routes plus one human one** `[observed]`: `Subscribe to updates` (human), and in the footer `Status API` · `RSS Feeds` · `Notifications` (linking to `/docs/notifications`). Cloudflare ships a **documented notifications system for its status page** with its own docs path — more infrastructure than the Statuspage checkbox lists of the other four, but the subscribe panel itself did not render in the served markup, so no channel-granularity copy was captured. Compare GitHub's four channels with per-channel event lists.

**`Notifications` is a first-class status component** (under `Dashboard & API`) — so the notification system's own availability is monitored and publishable. Also `Notifications` has "1 day with incidents" in 30 days, which is the kind of detail that only a 128-service status page surfaces.

**Notification-adjacent product vocabulary** `[observed]`: `Health Checks` (Network Services), `Logpush` (SASE Contract feature, "Logpush to SIEM/cloud storage"), `Workers Logpush` ("Push Workers logs to external destinations"), `Log Explorer` ("Meet log retention requirements, quickly detect security and performance issues, investigate root cause, and mitigate impact"), `Trace`, `Observatory`, `Workers Observability`.

The `Log Explorer` add-on description is a four-verb sequence naming the whole incident-response arc in one sentence: *meet retention requirements → detect → investigate root cause → mitigate impact*. Compliance obligation first, then the three operational stages. Well-compressed.

**In-error notification routing** `[documented]` — the closest thing to system messaging in the harvest is the error content's own escalation instructions: telling the visitor to contact the owner, telling the owner which log to search, telling the customer what to send their hosting provider, and disclosing which plans have email versus chat support. Notification-by-documentation rather than by channel.

`[absent]` — no toast, banner, email, or in-product alert copy was observed; no published messaging-pattern guidance.

## T10 Disclosures, legal & compliance

Cloudflare's pricing page is the most structurally complex in the batch, and the structure is the finding.

**Three entirely separate pricing models, presented as three tabs of one control** `[observed]`

| Tab | Model | Unit |
|---|---|---|
| `Network & CDN` | Flat-rate plan tiers | per domain per month |
| `SASE / Zero Trust` | Per-seat | per active user per month |
| `Compute & Storage` | Usage-metered | ~25 products, each with its own unit |

Three billing paradigms — subscription, seat, and consumption — under one `Pricing` nav item. The homepage introduces each with its own explanatory header, and these three headers are the best pricing copy in the corpus:

- **`Pay for clean traffic`** — "One stack of security and performance for every site — **same DDoS mitigation, same global CDN, same network at every tier. You only pay for the depth your site needs.**"
- **`Pay for active employees`** — "**The first 50 employees are on us** — scale to thousands at a flat per-user rate."
- **`Wall Clock vs. CPU Time`** — "**Never pay for idle time waiting for slow APIs, LLMs, or humans.** Cloudflare charges only for compute, not wall time, even during long agent workflows or hibernating WebSockets."

Each names *what the money buys* rather than what it costs. `Pay for clean traffic` reframes a CDN subscription as a filtration service. `same … same … same … You only pay for the depth` is an anaphoric triad that neutralises the usual objection to tiered security (that the free tier is deliberately weakened). And `waiting for slow APIs, LLMs, or humans` is the sharpest list on the site — putting `humans` third, as a category of latency, is both funny and technically exact for agent workflows.

The `Wall Clock vs. CPU Time` section is illustrated with a literal rendering of the billing model in the served text: `1ms` then ninety-one repetitions of the word `free`, then `LLM Call 2500ms`, then `0.5ms`, forty-eight more `free`s, then `API Call 300ms`. **The word "free" repeated 139 times as a data visualisation.** Visually effective; in the accessible text it is 139 unlabelled repetitions of one word, which is a significant screen-reader defect.

**Plan tiers and price strings** `[observed]`

| Family | Tiers |
|---|---|
| Network & CDN | `Free` `$0 /month` · `Pro` `$20 /mo billed annually, or $25/mo billed monthly` · `Business` `$200 /mo billed annually, or $250/mo billed monthly` · `Contract` `Custom` / `Billed annually` |
| SASE / Zero Trust | `Free` `$0 forever` · `Pay-as-you-go` `$7 /user/month` · `Contract` `Custom` / `Annual price per user` |

**Both billing periods are shown in one string** — `$20 /mo billed annually, or $25/mo billed monthly`. No toggle, no asterisk, no "starting at". The monthly premium is visible without interaction, which is the most honest presentation of annual-discount pricing available and the opposite of the industry default. Note the inconsistent spacing within the same string (`$20 /mo` with a space, `$25/mo` without).

`Contract` rather than `Enterprise` as the top tier name is a small but real choice: it names the *commercial mechanism* rather than the customer's size, so a small company with a mission-critical app is not excluded by the label.

**Comparison-table cell vocabulary** `[observed]`: `—` (for absent), `100%` (Uptime SLA), `1x` / `10x (Standard); 25x (Premium)` (Uptime Service Credits), `50 users` / `No limit`, `Up to 24 hours` / `Up to 30 days` / `Up to 6 months; Logpush to SIEM/cloud storage`, `Community forums + Discord` / `Chat and ticket support` / `Phone, chat, ticket; professional services available (add-on)`.

`Uptime Service Credits` expressed as multipliers (`1x`, `10x`, `25x`) with sub-tier names in parentheses is the most compressed SLA disclosure observed — and `10x (Standard); 25x (Premium)` discloses that the Contract tier itself has two sub-grades, inside a table cell.

`Community forums + Discord` uses `+` where `and` would be conventional, matching the homepage's `workloads + security`.

**Usage pricing is published as ~25 per-product tables with free tiers alongside paid rates** `[observed]`. A representative slice:

| Product | Free | Paid |
|---|---|---|
| `Workers` — Requests | `100k / day` | `$0.30 / million requests` |
| `Workers` — CPU Time | `10 ms / request` | `$0.02 / million CPU ms` |
| `R2` — Standard Storage | `10 GB-month` | `$0.015 / GB-month` |
| `R2` — Class A operations | `1 million` | `$4.50 / million requests` |
| `D1` — Rows Read | `5 million / day` | `$0.001 / million rows` |
| `Workers AI` — Neurons | `10,000 neurons / day` | `$0.011 / thousand neurons` |
| `Vectorize` — Dimensions Queried | `30M queried dimensions / month` | `$0.01 / million` |
| `Hyperdrive` — Queries | `100,000 / day` | **`Free`** |
| `Pipelines` — Ingestion | `—` | **`TBD (free during beta)`** |

Two values are notable. `Hyperdrive` has `Free` in the *Paid* column — a product with no paid rate, disclosed in the paid table rather than omitted. And `Pipelines` ships **`TBD (free during beta)`** as a published price: an admission that the rate is undecided, with the current cost stated. Publishing `TBD` on a pricing page is unusual and preferable to omission, because it tells a prospective user that a future charge exists.

**Coined billing units** `[observed]`: `Neurons` (Workers AI), `GB-s`, `GiB-hrs`, `vCPU-min`, `Class A operations` / `Class B operations` (R2), `Request Units`, `Dynamic Worker`, `queried dimensions` / `stored dimensions`, `data points`, `Build Minutes`, `thousand minutes`, `hundred thousand`.

`Neurons` is the only fully invented unit and it is unglossed on the pricing page — a user cannot estimate `10,000 neurons / day` without leaving the page. `hundred thousand` and `thousand` spelled out as denominators (`$5.00 / hundred thousand`, `$0.50 / thousand`) sit beside `$0.30 / million` in numerals — **three number-formatting conventions in one price list.**

**`Not available—` appears as a run-together string** in several free-tier cells (`Not available—`, `5M stored dimensionsNot available`, `10,000 neurons / dayNot available`), where a label and an em-dash have concatenated. Markup defect visible in the served text, and in at least two cases it **contradicts the adjacent value** — `10,000 neurons / dayNot available` states both that there is a free tier and that there is not.

**One global pricing footnote** `[observed]`: "Prices listed are for monthly billing. Discounts are available for annual upfront commitments." Two sentences, no asterisk, placed after the usage tables. **No tax disclosure, no currency statement beyond `$`, no refund or cancellation terms** anywhere on the page.

**Ten add-ons with heterogeneous price formats** `[observed]`: `Starting at $5/mo` (×3), `$5/mo (Free plan); included with Pro/Biz/Ent`, `Usage-based`, `$1/GB ingested; first 10 GB free`, `$10/mo`, `$0.099/1k requests`, `Starting at $7.85`, `Free to try`.

`$5/mo (Free plan); included with Pro/Biz/Ent` is the interesting one — a single add-on priced *only for the free tier* and bundled above it, with the plan abbreviations `Pro/Biz/Ent` used nowhere else on the site. `Cloudflare Registrar` — "**At-cost** domain registration with **no markup pricing**" at `Starting at $7.85` — is a margin disclosure used as a selling point.

**Compliance and trust vocabulary** `[observed]`: `PCI DSS 4.0 Compliance` (Business tier and above), `100% Uptime SLA`, `Uptime Service Credits`, `Role-based Account Control`, `Single-Sign-On (SSO) Support`, `Network Prioritization`, `Data Localization Suite`, `Geo-Key Manager`.

`100%` as a published uptime SLA is an absolute claim, softened only by the credit multipliers beside it — the credits are the real disclosure, and they are in the adjacent row.

**Footer trust set** `[observed]`: `Trust Hub` · `Compliance resources` · `Data Protection` · `Responsible AI` · `Transparency report` · `Report abuse` · `Privacy policy` · `Report security issues` · `Terms of use` · `Trademark` · `Your privacy choices`.

`Report abuse` (in `Compliance`) and `Report security issues` (in the legal strip) are **two distinct reporting routes with distinct destinations**, correctly separated — abuse of a Cloudflare-fronted site goes to the abuse process, a vulnerability in Cloudflare goes to disclosure. Most products conflate these. `Transparency report` as a peer of GDPR documentation, and `legal` existing as an error category (T7.3), mean Cloudflare's takedown posture is disclosed at three levels: the policy, the report, and the error code.

## T11 Help-centre architecture

Cloudflare runs **four help surfaces**, and the split is by audience rather than by content type:

| Surface | URL | Audience |
|---|---|---|
| `Documentation` | developers.cloudflare.com | Developers and operators; includes a `Support` section |
| `Support` | support.cloudflare.com | Ticket entry (not harvested) |
| `Community` | community.cloudflare.com | Peer support, linked from error pages |
| `Learning center` | cloudflare.com/learning/ | Concept explainers (not harvested) |

**The notable structure is that `Support` is a section *inside* the developer documentation** — the 5xx and 1xxx error references live at `developers.cloudflare.com/support/troubleshooting/http-status-codes/`, with the breadcrumb `Home / Support / … / Troubleshooting / HTTP Status Codes`. Troubleshooting content for non-developers (site visitors who hit a 1020) sits in a developer docs site. That is a defensible consolidation — one URL space, one search — but it means a locked-out visitor lands on a page whose chrome is `Cloudflare Docs` with a `Search Ctrl K` control and an `Agent setup` link.

Docs pages carry `meta-pcx_content_type: Troubleshooting` and `meta-algolia_content_type: Troubleshooting` plus `meta-pcx_content_group: Core platform` and `meta-pcx_product: Support` — **a machine-readable content-type and product taxonomy in page metadata**, feeding both the search index and (presumably) internal content ops. Four classification fields per page. This is the most developed docs metadata in the batch after Vercel's front matter, and unlike Vercel's it is populated.

**Per-page furniture** `[observed]`: `Skip to content` · breadcrumb with `…` collapse · `Last updated <date>` · `Copy as Markdown` · `View as Markdown` · `Agent setup` · an inline table of contents rendered as a bare list before the body · `Was this helpful?` `Yes` `No` · `Previous <title>` / `Next <title>` · `On this page`.

**The documentation-index blockquote appears above the H1 on every page**, addressed to agents (see T1). Three machine-facing affordances per page (`Copy as Markdown`, `View as Markdown`, `llms.txt` pointer) plus one machine-onboarding link (`Agent setup`). No other product in this batch has four.

**Community routing is embedded in error resolutions** `[observed]` — the Error 521 page ends with "Find additional troubleshooting information on the [Cloudflare Community] ↗", linking a specific thread (`community-tip-fixing-error-521-web-server-is-down`). The community thread title format (`Community Tip: Fixing Error 521 — web server is down`) mirrors Netlify's `Support Guide:` convention: a prefix marking the thread as quasi-official.

**Support escalation is plan-gated and the gate is disclosed in the error docs** `[documented]`: "Pro, Business and Enterprise plan users have access to email support. Business and Enterprise users can also access chat support. For additional support options, refer to the Cloudflare plans." Stated on the 1xxx index page, so a reader deciding whether to escalate learns their channel availability in the same breath.

And the audience gate: "Only the website owner can contact Cloudflare for technical support. You can find a domain's contact details via the **Whois database**." **Routing a non-customer to a third-party lookup service to find the person who can help them** is the correct answer to an otherwise dead-ended support path.

**Article-title grammar — four shapes:**

| Shape | Examples |
|---|---|
| `Error <code>` / `Error <code>: <description>` | `Error 521` · `Error 1020: Access denied` · `Cloudflare 5xx errors` |
| Product-noun reference | `Custom Errors` · `Error page types` · `Error responses` |
| Section as capability | `Required error details for hosting provider` · `Error analytics` · `Log Explorer` |
| Family index | `Cloudflare 1xxx errors` · `HTTP Status Codes` |

`Required error details for hosting provider` is the best of these — a section title naming the *artefact the reader must produce* rather than a topic. It is findable by a user who does not yet know what they need.

**Status site has its own help routing** `[observed]`: `About Us` · `Developers` · `Help Center` · `Community` · `Dashboard` · `Status API` · `RSS Feeds` · `Notifications`, each external link carrying `(opens in new tab)`. Note `Help Center` here points at `cloudflare.com/support` while the footer elsewhere says `Support` — two labels for one destination.

## T12 FAQs

`[absent]` — **no FAQ section exists on the homepage, the pricing page, or any harvested documentation page.** Cloudflare is the only product in this batch with no FAQ of any kind on its commercial surfaces.

Given the complexity disclosed in T10 — three billing models, ~25 metered products, coined units like `Neurons`, `Class A operations` and `Request Units`, an unglossed `TBD (free during beta)`, and no tax or refund disclosure — the absence is a real gap rather than a stylistic choice. GitLab answers 51 pricing questions; Netlify 11; Cloudflare none.

The functional substitutes are the **per-product docs links** embedded in every pricing row (each product name in the usage tables links to its own documentation) and the **Community**. Both push the reader off the page. Compare Vercel, which also ships no FAQ but substitutes a 130-term glossary; Cloudflare substitutes nothing on-page.

**The closest FAQ-shaped content found** is the `### Support and assistance` block on the 1xxx errors index, which answers three unasked questions in four bullets: who can contact support, how to find the domain owner, which plans get email support, which get chat. Four answers, no questions, inside an error reference.

## T13 Terminology & glossary

`[absent]` — **no glossary page was located.** Definitions are distributed across product pages and the two-to-four-word nav glosses (T1). For a portfolio of 128 services with heavy coinage, this is a significant gap — larger in practice than Netlify's, because Cloudflare's coined terms are more numerous and less guessable.

| Term | Cloudflare's usage | The alternative it rejected / note |
|---|---|---|
| `Zone` | The unit of configuration — a domain. `Zone Analytics`, `Zone Versioning`, `zone-level`, `Zones` as a status group, `zone` as an error-response field | "domain", "site", "property". **Inherited from DNS and never renamed**, so every customer must learn it. The most consequential legacy term in the product |
| `Ray ID` | The per-request identifier printed on every error page and searchable in the dashboard | "request ID" (Vercel), "trace ID". A coined term that is the linchpin of the entire error-recovery flow |
| `Origin` / `origin server` | The customer's own server behind Cloudflare | "backend", "upstream". Used as a bare noun (`Origin Servers`, `Origin Error Pages`, `error_category: "origin"`) |
| `Proxied` | The state of a DNS record routed through Cloudflare — the precondition for most features | "enabled", "protected". A state adjective that gates capability |
| `Edge` | `Edge status code`, `Edge IP Restricted`, `edge functions` | Used alongside `Origin` as the two ends of the request path |
| `1xxx errors` / `5xx errors` / `500 class` / `1000 class` | **Four notations for two error families** (`5XX`, `5xx`, `500 class errors`, `1000 class errors`) | **Inconsistency** |
| `Region: Earth` | Marketing framing for the absence of region selection | `us-east-1`. Not a product term, but it functions as one |
| `Neurons` | The Workers AI billing unit | "tokens", "inference units". **Unglossed on the pricing page** |
| `Class A operations` / `Class B operations` | R2 request classes, priced 12x apart | Borrowed from S3's vocabulary without explanation |
| `Request Units` | Durable Objects KV backend billing | A third unit concept beside operations and requests |
| `Dynamic Worker` | A runtime-spawned Worker, `$0.002` each | |
| `Durable Objects` | "Stateful compute" | A two-word coinage for a novel primitive; the gloss is essential |
| `Workers` / `Workers for Platforms` / `Workers AI` / `Workers KV` / `Workers Logs` / `Workers Logpush` / `Workers Builds` / `Workers Assets` / `Workers Preview` / `Workers Observability` / `Workers VPC` / `Workers Analytics Engine` | **Twelve `Workers *` products** on the status page | A prefix family that has become a namespace |
| `D1` / `R2` / `KV` | Alphanumeric product names | `D1` and `R2` are unguessable; `KV` is an abbreviation. All three rely entirely on their glosses |
| `Turnstile` | "A CAPTCHA Replacement Solution" | Names a physical gate mechanism; the gloss does the explaining |
| `Magic Transit` / `Magic WAN` (now `Cloudflare WAN`) | Network products | `Magic` as a product-name morpheme; the status page shows `Cloudflare WAN` where the product nav shows `WAN`, evidence of an in-progress rename |
| `Argo Smart Routing` / `Argo Tunnel` | Two `Argo` products; `Error 1033: Argo Tunnel error` | The homepage add-on says `Smart Shield + Argo Smart Routing` — a **compound add-on name joining two brands with `+`** |
| `Spectrum` / `Zaraz` / `Hyperdrive` / `Vectorize` / `Precursor` / `Artifacts` | Coined single-word product names | `Precursor` appears only on the status page with no gloss anywhere |
| `SASE` / `SSE` / `ZTNA` / `SWG` / `DEX` / `CASB` / `DLP` | Seven unexpanded security acronyms in plan copy | `ZTNA, SWG & DEX` appears as a bare acronym string in the SASE Free tier feature list on the homepage. **Unglossed** |
| `Under Attack Mode` / `I'm Under Attack Mode` | Two names, one mode, joined by a slash in the error-page-types table | **Inconsistency**, with an apostrophe inside a UI label |
| `Managed challenge` / `IP/Country challenge` / `Challenge Platform` | Three challenge concepts; `Challenge Platform` is a status component | |
| `Always Online` | The product that serves cached content when an origin is down | A name that states the outcome |
| `Flexible` / `Full` / `Full (Strict)` | The three SSL/TLS modes | Adjectives as mode names; `Strict` parenthesised as a modifier of `Full` |
| `owner_action_required` / `retryable` / `cloudflare_error` | Published, stable API field names encoding fault and recoverability | |
| `error_name` values in snake_case | `connection_timeout`, `rate_limited`, `waf_block`, `ip_block`, `country_challenge`, `managed_challenge`, `ratelimit_block` | Note `ratelimit_block` (one word) beside `rate_limit` (the category, two words) and `rate_limited` (the error name) — **three renderings of one concept across three published fields** |
| `Contract` | The top pricing tier | `Enterprise` — and yet `Enterprise` still appears in the support-plan copy ("Pro, Business and Enterprise plan users") and in `included with Pro/Biz/Ent`. **The rename has not reached the docs** |
| `sites` | Means customer websites (`1 in 5 sites`), Cloudflare's own web properties (status group `Sites`), and appears in a catch-all group name (`Cloudflare Sites and Services`) | **Three meanings in one product** |

**Register split by surface.** Marketing uses metaphor and provocation (`Region: Earth`, `Fighting infra with "cloud"`, `Not to keep servers warm`); the status page uses bare product nouns; the error docs use precise technical prose with the visitor/owner split; the structured error format uses snake_case machine identifiers. Four registers, and the marketing tier is the furthest from the others — a visitor arriving from `Region: Earth` and landing on `Error 1013: HTTP hostname and TLS SNI hostname mismatch` experiences no continuity of voice at all. That is arguably correct (different audiences) but it is the steepest gradient in the batch.

## T14 Voice, tone & accessibility

`[absent]` — **no content style guide, voice-and-tone documentation, or design-system content guidance was located on any public URL.** Same gap as Vercel and Netlify; GitHub (Primer) and GitLab (Pajamas) are the exceptions in this batch.

**Inferred voice.** Two distinct voices, cleanly separated by surface.

*Marketing voice* — confident, elliptical, argumentative:

- **Fragments and one-word sentences**: `Region: Earth`, `No more capacity planning. Ever.`, `(Not to keep servers warm.)`, `Build without boundaries`
- **Antithesis and correction**: `near your backend, not you`; `Fighting infra with "cloud"` vs `Shipping with Cloudflare`; `built... without requiring specialized operational knowledge`
- **Scare quotes used adversarially** — `"cloud"` in a section header
- **Anaphora**: `close to users, close to data`; `same DDoS mitigation, same global CDN, same network at every tier`
- **`+` used in prose** where "and" would be conventional: `workloads + security`, `Community forums + Discord`, `Smart Shield + Argo Smart Routing`
- **Unspaced em-dashes**: `Internet—yours by default`
- Numbers everywhere, always specific: `310B`, `4.5x`, `335+`, `50ms`, `95%`, `20%`, `45%`
- **No exclamation marks observed anywhere.** No emoji anywhere — the only product in this batch with neither on any surface.

*Documentation voice* — flat, procedural, second person, with explicit audience branching:

- "Contact your hosting provider or site administrator and share the necessary error details"
- "**If you are not the website owner**, provide the website owner with a screenshot"
- "Ensure your origin web server is responsive."
- "Be sure to check the logs of any load balancers, caches, proxies, or firewalls"
- Hedged where uncertain: "The cause of the error is **not always** found in the origin server's error logs", "which **may indicate** the origin is overloaded", "must not exceed **approximately** 1.5 MB"
- **First-person plural is almost absent.** The docs say "Cloudflare will return…", "Cloudflare could not establish…", not "we will". Compare Netlify, which says "we" constantly. Cloudflare refers to itself in the third person in its own documentation, which produces a notably impersonal register — appropriate for a company that is often the *reason* the reader is blocked
- **`Please` appears twice**: `Error 1025: Please check back later` and "please see [the forum thread]" equivalents. Rationed
- Callout labels are bare: `Note`, `Customize error pages`, `Large assets increase bandwidth`, `Permission levels` — **the third is a warning titled with its consequence rather than with "Warning"**, which is better practice

**Accessibility content** `[observed]`

- `Skip to main content` on marketing, docs, and status — consistent across three properties, same wording.
- **`(opens in new tab)` appended to every external link's accessible name on the status page** — `Support (opens in new tab)`, `Dashboard (opens in new tab)`, `About Us (opens in new tab)`, `Help Center (opens in new tab)`, `Community (opens in new tab)`, `Developers (opens in new tab)`. Verbose but correct, and unique in this batch.
- **The incident-density labels are the standout accessibility artefact** (T6.3): 256 generated strings that give a screen-reader user the same information a sighted user gets from a sparkline, plus the keyboard instruction to explore it. Correct pluralisation, correct suppression of the instruction in the empty case. This is what good data-visualisation alt text looks like at scale.
- `Local time` / `Showing local times` as a visible status-page control — timezone handling surfaced rather than assumed.
- Docs expose `Search` with visible `Ctrl` `K` key hints.
- **Homepage alt text is brand-name-only on all ~34 customer logos** (`Fossil`, `Canva`, `Uber`, `Homeland Security`), and the entire logo strip is **duplicated twice in the markup**, so a screen-reader user encounters 68 brand names consecutively. Two carousels (`Shopify Character.AI Intercom DoorDash…` and the logo wall) both repeat.
- One named person's photo carries alt `Duncan Davidson` — a name with no role or context, though the adjacent text supplies both.
- **The `Wall Clock vs. CPU Time` visualisation renders as 139 consecutive instances of the word `free`** in the accessible text, interspersed with `1ms`, `LLM Call 2500ms`, `0.5ms`, `API Call 300ms`. A decorative data graphic with no aggregate label and no `aria-hidden`. **The most severe accessibility defect found in this harvest.**
- The homepage carries an unlabelled animated sequence in the text layer (`Launching agents to analyze repository…`, `3 background agents launched`, `review-agent scanning PRs 179.6k tokens`, `Agents frontend analysis loading...`, `Enter`) — a simulated terminal rendered as live text with a stray `Enter`.
- `Pause` appears as a bare control label on the customer carousel.
- **No accessibility statement, VPAT, or conformance report was located.** The `Trust Hub` includes `Responsible AI` and `Data Protection` but no accessibility page surfaced in this harvest.

**Negative findings, recorded honestly**

- `Login` (nav) vs `Log In` (footer); `Start building for free` (hero) vs `Start Building` (footer) — same page, same actions
- `See plans` vs `See packages` for the two Contract tiers on the same pricing control
- `View All` vs `View all future maintenance` — adjacent status links, different casing
- Ten add-on cards, five CTA verbs (`Activate` ×7, `Speed Up My Site`, `Register`, `Get started`); `Speed Up My Site` is first-person title case among seven `Activate`s
- Three competing hero formulations (H1 / `<title>` / meta description)
- `Run everywhere` and `Run anywhere` as adjacent section headers — near-synonyms whose distinction lives only in the body copy
- `20% of the Internet` (homepage) vs `1 in 5 sites on the Internet` (pricing) — same statistic, two forms, arguably deliberate
- Four notations for two error families: `5XX`, `5xx`, `500 class errors`, `1000 class errors`
- `Error 502 bad gateway or error 504 gateway timeout` — no colon, lowercase second "error", breaking the pattern of eleven siblings
- `Error 530` has no description where all eleven siblings do
- `1012: Access Denied` vs `1020: Access denied` — identical user-facing titles differing only in capitalisation
- `1018` and `1023` both `Could not find host`; `1101` and `1102` both `Rendering error`; `1000` and `1002` both `DNS points to prohibited IP` / `Prohibited IP`
- `1104` ships a two-sentence form-validation message as an error-catalogue title
- `Managed challenge / I'm Under Attack Mode` — two names, one page type, one API identifier
- `rate_limit` (category) / `rate_limited` (error name) / `ratelimit_block` (page type identifier) — three renderings, three published fields
- The error-categories table references ~20 codes absent from the 1xxx error index — **two references disagree on the catalogue size**
- Two published priority orders for custom errors (six-step and three-step) on two pages
- Error 1020 ships **two resolution paths with one differing settings step and no stated condition** for choosing between them
- `**Full (Strict**)` — misplaced bold marker in the Error 521 page
- `Contract` is the tier name on pricing but `Enterprise` persists in support-plan copy and in `Pro/Biz/Ent`
- `Cloudflare WAN` (status) vs `WAN` (product nav) — in-progress rename visible
- `sites` carries three meanings; `Cloudflare Sites and Services` is a two-item catch-all whose name duplicates the page title
- `Help Center` (status footer) vs `Support` (marketing footer) for one destination
- `Not available—` run-together strings in pricing tables, twice contradicting the adjacent value (`10,000 neurons / dayNot available`)
- Three number-formatting conventions in one price list (`/ million`, `/ thousand`, `/ hundred thousand`)
- `$20 /mo` and `$25/mo` — inconsistent spacing within a single price string
- Three capitalisation conventions across 40 product glosses
- `ZTNA, SWG & DEX` and six other security acronyms unexpanded in plan copy
- `Neurons`, `Precursor`, `Request Units`, `Class A operations` unglossed
- `Minor` severity label present on two of three recent incidents, absent on the third — ambiguous
- Active incident renders `Identified` twice in its accessible text
- Incident titles mix Title Case and sentence case
- 139 consecutive `free` strings in the accessible text of a pricing graphic
- Customer-logo strip duplicated in markup (~68 alt strings)
- No FAQ anywhere; no glossary; no published content style guide; no accessibility statement

---

## Transferable patterns

1. **`## What Happened` / `## What You Should Do`.** Two headings, second person, plain words, mandated as the structure of every error document. Cause then action, in the reader's voice. Works unchanged at any scale from a toast to a full-page error, and it is the single most copyable thing in this file.
2. **Put the recovery instruction in the payload.** `what_you_should_do` is an API field containing formatted prose, so the remedy travels with the failure to whoever receives it — a browser, a log, a support ticket, or an agent. Its internal template is reusable too: **bold imperative summary → specific quantified action → escalation naming who must act and what they must check.**
3. **Ship a boolean that says who can fix it.** `owner_action_required` encodes, machine-readably, the difference between "you can resolve this" and "only someone else can". For any product sitting between two parties — marketplace, payment intermediary, embedded checkout — this is the field that prevents the powerless reader from wasting an hour.
4. **Publish a fault-classification enum, and let one of its values be your own name.** `error_category: "origin" | "cloudflare" | "ssl"`, with `cloudflare` meaning "our fault". Naming yourself as a possible cause, in a stable published field, is a credibility move that costs nothing and cannot be faked.
5. **Publish the back-off period per error code, and say which codes are never worth retrying.** A table of `retry_after` values turns "try again later" into a number, and the non-retryable entries (`525`, `526` — "Retrying will not help until the operator fixes the TLS configuration") stop clients hammering a fault that waiting cannot clear.
6. **Mark which of your strings are stable.** "Stable — suitable for programmatic matching" on `error_name` and `error_category` is a published compatibility promise about vocabulary. It tells integrators which words they may depend on and, implicitly, which prose you reserve the right to rewrite.
7. **Branch the error content by audience with an if-clause, and make the halves interlock.** `If you are not the website owner, provide the website owner with a screenshot` / `If you are the website owner: 1. Retrieve a screenshot from your customer…` The powerless reader is given a job that makes the powerful reader's job possible. The best answer available to the intermediary-product error problem.
8. **Attribute the decision, not just the delivery.** `This error was generated by Cloudflare on behalf of the website owner.` Six words that separate who executed the block from who ordered it, shipped on every error. Directly applicable to any platform enforcing a partner's rule against an end user — declines, holds, restrictions, content takedowns.
9. **Count bad days, not uptime percentage — and give two windows.** `30-day incident history for R2: 7 days with incidents` beside `90-day: 23 days`. Comprehensible without arithmetic, hard to game, and the two windows distinguish a recent regression from a chronic problem. Publishing `WARP: 26 days with incidents` in the last 30 is the credibility test, and Cloudflare passes it.
10. **Make the chart's accessible name carry both the summary and the interaction.** `…2 days with incidents. Use arrow keys to review each day`, with the instruction correctly suppressed when there is nothing to review. One string, two jobs, correct pluralisation, at 256 instances.
11. **Lead a large status page with counts, not a banner.** `Operational 127 · Degraded 1 · Offline 0 · Maintenance 0`. Above roughly twenty components, "All Systems Operational" stops being informative and the shape of the outage becomes the useful summary.
12. **Write the incident title as the user's blocked action, with a scope hedge.** `Unable to start containers in Asia-Pacific`, `Unable to register certain domains`, `Incorrect geo location for some WARP users`. `certain` and `some` in the title let most readers self-exclude before opening the incident.
13. **Collapse outage grades at the service level; keep severity at the incident level.** Four service states (`Operational` / `Degraded` / `Offline` / `Maintenance`) instead of five, with `Minor` as a separate incident label. Per-service binary is scannable; per-service severity is not. Condition: the severity label must be mandatory, which Cloudflare's currently is not.
14. **Deep-link from documentation into the reader's own authenticated screen.** `Go to **HTTP Traffic** ↗` resolving to `/:account/:zone/analytics/traffic`. The correct fix for "the docs say go to Settings > X and I cannot find it", and it costs one templated URL.
15. **Write the ticket your customer will file with someone else.** The `Required error details for hosting provider` block lists the three fields to send, with an example for the vaguest one, and then pre-arms the customer against the hosting provider's first wrong answer ("The cause of the error is not always found in the origin server's error logs"). Content authored for a conversation that happens outside your product.
16. **Route the non-customer to whoever can help, by name and by mechanism.** "Only the website owner can contact Cloudflare for technical support. You can find a domain's contact details via the **Whois database**." A dead-ended reader given a third-party lookup rather than a closed door.
17. **Negotiate error format by audience.** JSON for API clients, Markdown for agents, HTML for browsers, from one configuration, with the `Accept`-matching expression published. As agents become a majority reader of error pages, this stops being clever and starts being table stakes.
18. **Justify a limit by the cost to the customer, not the cost to you.** "Because a custom error asset is served to every visitor that triggers the associated rule, a large asset can generate significant egress traffic." A constraint the reader will accept because the reason is their money.
19. **Name the mode, then name its observable consequence.** `Port 80 for Flexible, or Port 443 for Full and Full (Strict)`. Mode selectors are only learnable through the concrete thing that changes.
20. **`Region: Earth`.** Two words that parody the category's dominant interface convention and state the product difference in the same breath. The best short headline in the corpus, and a reminder that the sharpest positioning copy often names something the competitor makes you do.
21. **Show both billing periods in one string.** `$20 /mo billed annually, or $25/mo billed monthly`. No toggle, no asterisk. The monthly premium is visible without interaction — the opposite of the industry default and the more honest presentation.
22. **Disclaim the tier you are selling.** `Pro — For professional websites that aren't business-critical.` A paid tier defined by what it is not suitable for. It sorts buyers faster than any feature list and it buys credibility for the tier above.
23. **Put the emergency route in the acquisition column.** `Under attack?` in the footer's `Getting started` group. A company mid-incident is a prospect, and the question form matches their state of mind.

## Caveats & gaps

- **All in-product strings are `[documented]` or absent.** The Cloudflare dashboard is entirely behind auth. Every status name, setting label, form field, toast, and empty state in T5, T6.6, T8, and T9 is reconstructed from documentation describing the UI. The Error 1020 page's two divergent settings paths are direct evidence that the documented paths and the shipped UI are not in lockstep.
- **The rendered error pages themselves were not observed.** This is the most consequential gap: Cloudflare's 1xxx error pages are among the most-seen error screens on the web, and the harvest captured their *titles* (from the docs index) and their *structured JSON/Markdown equivalents* (from the reference), but not the HTML page a blocked visitor actually reads. The full visible copy — the sub-headline, the `Ray ID` presentation, the "What can I do?" block, the Cloudflare branding line — is unharvested. Fetching `https://<any-cloudflare-site>/cdn-cgi/error/1020` would supply it.
- **Only two of 43+ error pages were opened individually** (`521`, `1020`). The family indexes give titles for all of them and the reference gives categories and retry values, so the *system* is well evidenced; the per-page prose is sampled at n=2. `1015` (rate limiting), `1010` (browser signature ban), and `1009` (country ban) are the highest-value unharvested pages, because all three are visitor-facing blocks with a significant human-impact dimension.
- **`error_name` values are published for only a handful of codes** (`connection_timeout`, `rate_limited`, plus the seven page-type identifiers). The full snake_case name list — which is the machine vocabulary Cloudflare has promised to keep stable — is not published on any harvested page.
- **No FAQ, no glossary, no published content style guide, no accessibility statement.** Four absences, the first two of which are genuine gaps for a product of this complexity. All T14 voice observations are inferred from output rather than read from a rule.
- **`Agent setup` (`/agent-setup/`) was not fetched**, nor any `llms.txt`. Cloudflare's agent-facing documentation infrastructure is the most developed in this batch and is described here only from the links to it.
- **`Trust Hub`, `Transparency report`, `Responsible AI`, and `Compliance resources` were not fetched.** T10's compliance coverage rests on plan-table features, footer labels, and the existence of the `legal` error category. Given that Cloudflare's takedown and transparency posture is unusually consequential, this is a real gap.
- **`/products/`, `/solutions/`, and `/resource-hub/` were not fetched.** The product taxonomy in T1 is reconstructed from the pricing page's footer-nav grid, which may not match the dedicated products page. T2 and T3 are correspondingly thin for a five-page marketing site.
- **`support.cloudflare.com`, `community.cloudflare.com`, and `cloudflare.com/learning/` were not harvested.** T11 is reconstructed from docs breadcrumbs, footer routing, and community links quoted in error pages. Cloudflare's actual help-centre category tree and the `Community Tip:` article corpus are unexamined.
- **The status-page subscribe panel did not render**, so channel-granularity copy (which events go to which channel) was not captured. `/docs/notifications` on the status site is the obvious next fetch and would materially improve T9, which is currently the weakest section in this file.
- **`cloudflarestatus.com/locations` and `/history` were not harvested.** `Locations` is a status dimension no other product in this batch offers and would likely carry the data-centre naming vocabulary that Vercel publishes as `IAD1 - Washington DC, USA`.
- **Incident sample is four incidents on two days.** The `Minor` severity inconsistency and the title-casing drift are drawn from a very small sample. Cloudflare's incident *update* prose — the `Investigating` / `Identified` / `Monitoring` / `Resolved` boilerplate that dominates the GitHub, Vercel, and Netlify files — was **not captured at all**, because the overview page shows only incident titles and no individual incident page was opened. This is the largest T6 gap relative to the other four products.
- **The status site is custom-built, not Atlassian Statuspage**, so unlike the other four products in this batch every string on it is Cloudflare-authored. That makes the findings more attributable, and it also means the four-state legend and the incident-density labels are genuine design decisions rather than vendor defaults.
- **Pricing page is heavily JS-rendered.** The comparison tables produced duplicated and run-together text (`Free—`, `Not available—`, plan headers repeated), the `Support`, `Rules & Routing`, `Security`, and `Platform` comparison sections rendered as headings with no rows, and the `Wall Clock vs. CPU Time` graphic rendered as 139 repetitions of `free`. Some defects recorded in T10 and T14 may be extraction artefacts rather than authored copy and should be confirmed visually — though the `Not available—` contradictions and the `free` repetition are almost certainly real, since both appear in the DOM text layer a screen reader would consume.
- **en only.** `inLanguage: en` in the docs JSON-LD and `availableLanguage: ["English"]` in the published contact points; no locale switcher observed.
- **Marketing site is Astro v6.3.7 and may be A/B tested.** Docs pages carry per-page `Last updated` values spanning April to September 2026 — cite the per-page date, not the harvest date, for any specific string.

## Sources

1. https://www.cloudflare.com/
2. https://www.cloudflare.com/plans/
3. https://www.cloudflarestatus.com/
4. https://www.cloudflarestatus.com/services
5. https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/
6. https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/index.md
7. https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-5xx-errors/error-521/index.md
8. https://developers.cloudflare.com/support/troubleshooting/http-status-codes/cloudflare-1xxx-errors/error-1020/index.md
9. https://developers.cloudflare.com/rules/custom-errors/index.md
10. https://developers.cloudflare.com/rules/custom-errors/reference/error-page-types/index.md
11. https://developers.cloudflare.com/fundamentals/reference/error-responses/index.md
