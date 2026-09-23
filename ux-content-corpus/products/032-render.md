# 032. Render

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Cloud application hosting (PaaS) / managed compute + Postgres, Heroku successor |
| Primary URL | https://render.com/ |
| Corpus rank | 032 |
| Benchmark strength (source list) | Infrastructure setup and errors |
| Locale / market observed | en-US only (no locale switcher on any surface) |
| Platform observed | Web (marketing), docs, Atlassian Statuspage |
| Regulatory posture | SOC 2 Type II, ISO 27001, GDPR DPA, HIPAA BAA (Scale/Enterprise only, **+20% compute premium**); published **shared responsibility model** and **pentest policy** |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 8 |
| Harvest completeness | Full for deploy lifecycle, errors, and pricing. Partial on incident vocabulary — the status page was fully operational with only one short incident in 90 days |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://render.com/ | Hero, three-step how-it-works, feature grid, security grid, nav |
| Pricing | https://render.com/pricing | Four workspace plans, six compute tables, a ~120-row feature matrix, 9 FAQ questions |
| **How deploys work** | https://render.com/docs/deploys | **The deploy lifecycle, timeouts, overlapping-deploy policies, zero-downtime sequence — richest single page** |
| **Troubleshooting your deploy** | https://render.com/docs/troubleshooting-deploys | Verbatim error strings grouped by HTTP status; "When to contact support" |
| Deploy for Free | https://render.com/docs/free | Free-tier state language (`spins down`, `suspends`, expiry, grace period) |
| Your First Render Deploy | https://render.com/docs/your-first-deploy | Six numbered steps, three parallel deploy paths, a decision flowchart |
| Render FAQ (docs) | https://render.com/docs/faq | 10 questions in six groups, mostly `Why…?` |
| Status | https://status.render.com/ | 5 global + 10-per-region components across 5 regions; 5 component states |

---

## T1 Navigation & IA labels

**Marketing nav — five items, three of which expand** `[observed]`

`Product` · `Developers` · `Resources` · `Pricing` · `Company`

`Product` splits into two named groups, and the split is meaningful:

| Group | Contents |
|---|---|
| `Features` | `Autoscaling` · `Private Networking` · `Persistent Disks` · `Infrastructure as Code` · `Preview Environments` · `Zero Downtime Deploys` · `Render CLI and MCP` |
| `Services` | `Workflows` (New) · `Sandboxes (Early Access)` (New) · `Static Sites` · `Web Services` · `Private Services` · `Background Workers` · `Cron Jobs` · `Postgres` · `Key Value` |

**`Features` are things the platform does for you; `Services` are things you
create.** That distinction maps exactly onto the user's mental model — one list
is capability, the other is inventory — and it is the cleanest product-nav
split in this batch. Note that every `Features` item links into **docs**, not
to a marketing page: Render sends nav traffic straight to documentation.

`Sandboxes (Early Access)` carries its maturity **inside the label**, not as a
badge — so the caveat survives being copied into a link, a search result, or a
screenshot. `Workflows` carries a separate `New` badge. Two maturity signals,
two mechanisms.

**`Developers` and `Resources` each open with a positioning sentence** `[observed]`:
"Learn how to build and deploy on Render" and
"How the best teams scale faster". Then a featured card
(`Agents — Deploy to Render with your coding agent`;
`Migration Credits — Apply for credits to cover switching costs`) and grouped
links. `Resources` groups are literally `Build` and `Migrate`.

**Competitor migration is a top-level nav concern** `[observed]`:
`Heroku Migration Guide` and `Railway Migration Guide` sit under
`Resources > Migrate`, and the **docs sidebar has its own `Migrate from…`
group** with `Heroku` and `Railway`. The footer adds a `Comparisons` column:
`Vercel` · `Heroku` · `Railway` · `Fly.io`. Render names four competitors in
its own footer and publishes a comparison page for each.

**Docs sidebar — 12 named sections, ordered by operational lifecycle** `[observed]`

`Start` · `Compute` · `Deploys` · `Workflows` · `Render Postgres` ·
`Networking` · `Operational Controls` · `Observability` · `Integrations` ·
`User Management` · `Platform Protections` · `Compare`

This is a **run-a-service ordering**, not a feature ordering: what you choose →
how you ship → how you connect it → how you control it → how you watch it →
who can touch it → what protects it. `Platform Protections` as a section name
(rather than "Security") frames the content as things Render does *for* you.

`Compare` as a **section of the documentation** containing
`Heroku vs Render` and `Vercel vs Render` is the notable oddity — competitive
content living inside the reference corpus, in the sidebar, on every docs page.

Sub-groups use a mix of registers: `Service types` → `Which to use?` (a
question as a nav label) · `How to…` (in Workflows) · `Migrate from…` (with an
ellipsis) · `Database recovery` / `Database performance` · `Internal traffic` /
`Outbound traffic` / `Static site config`. Three of these end in punctuation
that signals continuation.

**`Start` section, six items** `[observed]`:
`Home` · `Your first deploy` · `Free instances` · `Platform features by plan` ·
`Use with coding agents` · `FAQ` · `Templates`.

`Use with coding agents` in the first six links of the docs is a 2026 signal.
`Platform features by plan` is the unusual one — a **plan-comparison page
living in documentation rather than in marketing**, which means the paid/free
boundary is answerable while reading the docs.

**Per-page docs furniture** `[observed]`: `Search` · `Ask AI` /
`Ask` (two labels for one control in one header) · `Copy page` ·
`Get started` · a right-hand mini-TOC headed by the page's own title ·
and a four-link footer: `Pricing` · `Blog` · `Security` · `Customers` ·
`Careers`.

**Footer groupings (marketing)** `[observed]`: `Features` · `Services` ·
`Legal` · `Resources` · `Company` · `Comparisons` · `Socials`.

**Defect** `[observed]`: the footer's `Features` and `Services` columns link to
`docs.render.com` while the header nav links to `render.com/docs` for the same
pages — **two hostnames for one documentation site**, mixed within a single
page. The pricing FAQ does the same
(`docs.render.com/build-pipeline#pipeline-minutes`).

A stray literal `body` also renders as text between the nav and the footer on
the home and pricing pages — a template leak.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The cloud for builders` (from the page title and `og:title`)
> Line: "Intuitive infrastructure to scale any app or agent from your first
> user to your billionth."
> CTAs: `Start for free` · `Talk to sales`

**"from your first user to your billionth"** is the Render signature — the same
two-orders-of-magnitude device Supabase uses in `Build in a weekend / Scale to
millions`, but rendered as an ordinal sequence rather than a time-and-size
pair. It appears twice on the home page and in both meta descriptions.
`your billionth` (rather than "a billion users") keeps the second person
holding the whole span.

`any app or agent` is doing 2026 positioning work in three words, and `agent`
is coordinated with `app` as an equal rather than appended.

**The dominant promise is the absence of a job** `[observed]`

- `Deploy apps and agents with zero ops`
- `Zero ops, zero surprises.` (closing CTA line)
- `Zero Downtime Deploys` (feature name)
- `Zero-config CDN` (pricing row)
- `The Zero DevOps cloud for developers and teams.` (pricing closing line)
- `Build products, not compliance.` (security section)
- "without VPC complexity" · "without extra configuration or add-ons" ·
  "without wiring up queues, workers, and retry logic" ·
  "without overhead" · "Nothing to rip and replace"

**`Zero` is used as a prefix five times across three pages, with four different
objects** (`ops`, `surprises`, `downtime`, `config`, `DevOps`). That is a
recognisable house device and also a drift risk: `zero ops` and
`Zero DevOps cloud` are the same claim in two registers, and `zero surprises`
is a billing claim wearing an ops claim's clothes.

The `X, not Y` negation frame (`Build products, not compliance.`) is the same
construction Heroku uses ("apps, not infrastructure") — and Render's version is
sharper because `compliance` is a noun nobody wants to own.

**Section headers are capability sentences with a number or a named fear**
`[observed]`

- `Full-stack previews for every pull request`
- `Load-based autoscaling that handles 100x traffic bursts and beyond`
- `Durable, long-running workflows as code`
- `Enterprise-grade Postgres databases`
- `Integrated logs and monitoring for builds, deploys and live services`
- `Intuitive infrastructure, designed for builders`
- `Stay secure and resilient by default`

Each is followed by a one-sentence body that names **the occasion**, not the
mechanism: "Keep your workloads running smoothly through viral moments,
seasonal spikes, and launch days." Three concrete events rather than a
throughput figure. `See critical metrics for all of your Render infrastructure
**from day zero**" — the promise is about *when* observability starts.

**A visibly broken headline** `[observed]` — the second section header reads:

> "Intuitive hosting and private networking for web services, Postgres
> databases, cron jobs, workflows, static sites, background jobs, key value
> stores, private services, WebSockets, edge caches, isolated environments,"

**Eleven items and a trailing comma.** This is an animated/rotating list whose
static fallback renders as an unterminated sentence. A genuine defect on the
primary marketing page, and a useful negative example: a rotating-word device
that has no graceful non-animated state.

**Pricing headline** `[absent]` as a hero — the pricing page opens directly
into `Workspace Plans` with no headline sentence. Section headers are bare
nouns (`Compute`, `Workspace features`, `Compare Pricing`,
`Frequently Asked Questions`) with one-line subheads:
"Deploy for free, scale compute as you need." ·
"Compare features across workspace plans." · "Find the plan that meets your
needs."

**Announcement bar** `[observed]`, sitewide:
`Migrating production infrastructure? Get up to $10K in migration credits.` →
`Apply now`. A question addressed to a competitor's customer, with a number, in
the topmost slot on every page.

**Social proof is logo-led with one long quote** `[observed]`: ten customer
logos including `OpenAI`, `Shopify`, `Blackrock`, `bluesky`, `Fortune`, then a
single testimonial closing "I'm convinced Render is the future of the cloud."
— attributed to `Maor Shlomo, Founder of Base44`. No numeric claims
(no "X million developers"), which is unusual in this batch and is the honest
choice for a smaller platform.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start for free` | Hero | |
| `Talk to sales` | Hero, beside the above | Enterprise path at equal weight |
| `Get started` | Header, both marketing and docs | |
| `Deploy your app for free` | Closing home CTA | Verb + object + price |
| `Deploy for free` | Pricing, Hobby tier | **Fourth variant of "sign up"** |
| `Start with Pro` / `Start with Scale` | Pricing, paid tiers | Plan name inside the CTA |
| `Get in touch` | Pricing, Enterprise | |
| `Get Started` | Pricing page foot | Title case, unlike the header's `Get started` |
| `Start deploying` | Pricing, mobile plan selector | Sixth variant |
| `Apply now` | Announcement bar | Migration credits |
| `See customer stories` | Home | |
| `View Templates` | Home, after the three steps | |
| `Preview environment docs` / `Autoscaling docs` / `Workflow docs` / `Postgres docs` / `Observability docs` | Home feature cards | **Five CTAs whose entire text is "<feature> docs"** — the marketing page's secondary action is always documentation |
| `Trust center` | Home security section | Links to `/security` |
| `HIPAA on Render` | Home security section | |
| `Compare all workspace features` | Pricing | Anchor |
| `Expand compute table` | Pricing, six times | Progressive disclosure, repeated identically |
| `Select Plan` | Pricing, mobile | |
| `Copy page` | Every docs page | Markdown export for LLMs |
| `Ask AI` / `Ask` | Docs header | **Two labels, one control, same header** |
| `Search` | Docs header, twice in DOM | |
| `Add credential` | Onboarding step 2 | `[documented]` |
| `Connect` | Repo selection | `[documented]` |
| `Deploy` | Service creation form submit | `[documented]` |
| `+ New` / `New` | Dashboard | **Two forms across two docs pages** |
| `Manual Deploy` | Dashboard dropdown | `[documented]` |
| `Deploy latest commit` / `Deploy a specific commit` / `Clear build cache & deploy` / `Restart service` | Manual-deploy dropdown | `[documented]` — see T6 |
| `Deploy Commit` | Commit-selection dialog | `[documented]` |
| `Cancel deploy` | Deploys page | `[documented]` |
| `Authorize CLI` | Browser confirmation | `[documented]` |
| `Edit` / `Save changes` | Workspace settings | `[documented]` |
| `Subscribe to Updates` / `Subscribe` | Status page | |
| `Subscribe via Slack` | Status page | |
| `Follow @renderstatus` / `view our profile` | Status page | |
| `View historical uptime.` | Status page | Full stop inside link text |
| `← Incident History` | Status page foot | |
| `Resend OTP` | Status subscribe form | |

**Observation.** Render ships **six distinct labels for account creation**
(`Start for free`, `Get started`, `Get Started`, `Deploy for free`,
`Deploy your app for free`, `Start deploying`) plus two plan-specific variants.
But it almost never ships a bare `Learn more` — the five home-page feature
cards all use `<feature> docs`, which is maximally specific and also tells the
reader they are leaving marketing.

`Clear build cache & deploy` is the best CTA in the set: it names a
non-obvious diagnostic action and its consequence in four words, in the place
the user goes when a build is behaving oddly.

## T4 Onboarding & getting-started

**Home page: three numbered steps, the third of which is the promise** `[observed]`

1. `Select a service` — "Choose what you need to run your apps, APIs, agent
   logic, databases, cron jobs, and more."
2. `Deploy your code` — "Just connect your repo. Render deploys on the right
   runtime for your framework."
3. `Render does the rest` — "Get instant networking, scaling, previews,
   deploys, rollbacks, and monitoring."

Steps 1 and 2 are imperatives addressed to the user; **step 3 changes subject
to the company.** The onboarding sequence hands off. That is a deliberate and
transferable structure: the last step of a three-step flow is the thing you
don't have to do.

`Just connect your repo` — the adverb `Just` is carrying the entire
effort claim.

**Docs onboarding: six numbered steps, and step 5 is the one nobody writes**
`[observed]`

`1. Sign up` → `2. Connect your Git provider` → `3. Choose a service type` →
`4. Deploy your code` → **`5. Monitor your deploy`** → `6. Open your app`

**Dedicating a numbered onboarding step to watching the thing you just
started** — and branching it into success and failure — is the standout content
decision on this page. Most tutorials end at "click Deploy".

Step 5's branch copy is symmetrical and both halves are written:

> "**If the deploy completes successfully,** the deploy's status updates to
> **Live** and you'll see log lines like these:"
> "**If the deploy fails,** the deploy's status updates to **Failed**. Review
> the log feed to help identify the issue."

Then: link to `Troubleshooting Your Deploy`, and — crucially — the recovery
*mechanism*: "After you identify the issue, push a new commit to your linked
branch. Render will automatically start a new deploy." The user is told how to
retry using the workflow they already have, not a button.

**Failure is pre-empted at step 3, before it can happen** `[observed]`:

> "**Free web services "spin down" after 15 minutes of inactivity.**
> They spin back up when they next receive an incoming HTTP request or new
> WebSocket connection."

The single most common Render complaint ("my site is slow to load") is
inoculated against **three steps before the user could encounter it**, with
scare quotes around the coined verb on first use.

**Three parallel deploy paths, each fully written** `[observed]`:
`Dashboard` / `CLI` / `Coding Agent`. Not a primary path with footnotes — three
tabbed, complete walkthroughs including monitoring instructions for each. The
Coding Agent path supplies **literal prompts as quoted blocks**:

> "Deploy a web service named "my-service" from
> https://github.com/render-examples/flask-hello-world on Render using the free
> plan."
> "Show me the deploy status and logs for my-service"
> "Why did the deploy for my-service fail?"

Three prompts covering deploy, check, and diagnose. Render ships example
prompts as onboarding copy, with an installable skill
(`render skills install --tool claude --skill render-deploy --skill
render-debug`). Note the third prompt is **the failure case, written as a
question the user asks their agent** — the debug path is part of the happy-path
tutorial.

**Service-type choice is taught twice, in two modes** `[observed]`

First as a two-row table with a `Common frameworks` column
(`Express, Next.js, Fastify, Django, FastAPI, Flask, Rails, Phoenix` for
`Web Service`; `Astro, Hugo, Docusaurus, Next.js static exports` for
`Static Site`) — i.e. **you recognise your own stack rather than parse a
definition.**

Then, in `Next steps`, as a **decision flowchart whose nodes are questions and
whose edges are answers in the user's voice** `[observed]`:

| Question | Answers observed |
|---|---|
| `Will your code receive incoming traffic?` | `No, it'll run in the background.` / `Yes!` |
| `Will any of that traffic come from the public internet?` | `No, only private network traffic.` / `Yes!` |
| `Does your code perform any server-side logic?` | `No, I'm only serving static assets (HTML, CSS, JS, etc.)` / `Yes!` |
| `Are you running simple tasks on a schedule?` | `Yes!` |
| `Do you want Render to handle job queuing and provisioning?` | `No, I'll use a framework like Celery or Sidekiq.` / `Yes!` |

Terminals: `Create a Static site` · `Create a Web service` ·
`Create a Background worker` · `Create a Cron job` ·
`Create a Private service` · `Create a Workflow`.

**The "no" branches are full sentences in the first person with a reason; the
"yes" branches are a single exclamatory word.** `No, I'll use a framework like
Celery or Sidekiq.` is the user explaining themselves. The asymmetry is
deliberate — declining needs a reason, accepting does not — and it makes the
chart readable as dialogue. This is the best-written decision tree in the
batch.

**Celebration copy** `[observed]`:
`**Congratulations!** You've deployed your first app on Render 🎉` — one
exclamation, one emoji, and the emoji also appears in the log output
(`==> Your service is live 🎉`), so the product and the tutorial celebrate with
the same character.

**Step-1 reassurance** `[observed]`:
"**This tutorial uses free Render resources. No payment is required.**" and
"Signing up is fast and free:". The cost objection is cleared before step 1.

**`Next steps` is five named follow-ons**, each with a scope line, and it ends
honestly: "Note that some of these capabilities require running your service on
a paid compute plan." · "Note that free instances are not available for these
service types." **Two paywall disclosures inside the onboarding tutorial's
final section.**

## T5 Form & field labels

`[documented]` — the service-creation form is post-auth, but the docs table it
field by field, which makes it the best-documented form in this batch.

**Web service fields** `[documented]`

| Field | Hint copy (paraphrased, with verbatim fragments) |
|---|---|
| `Branch` | "Your service only deploys commits on the Git branch you specify, such as `main`." |
| `Root Directory` | Opens with a **question**: "Deploying from a monorepo? Specify the subdirectory that represents your application root." |
| `Language` | Names the escape hatch: if your language isn't listed, "you can still deploy using the `Docker` runtime" |
| `Build Command` | "This usually resembles the command you run locally to install dependencies and perform any necessary compilation." |
| `Start Command` | "**For some frameworks, this might differ from the command you run locally.** For example, a Flask app might use `flask run` locally but `gunicorn` for production." |
| `Compute` | "This determines your service's CPU and RAM, along with its cost." |
| `Environment Variables` | "available to your service at both build time and runtime.<br>**If you forget any, you can always add them later and redeploy.**" |

**Static site fields** add `Publish Directory` — "the directory containing your
site's static assets, which are usually generated by your build command", with
three framework-specific examples (`build`, `out`, `_site`) each labelled with
the framework that produces it.

Four patterns worth extracting:

1. **The hint is calibrated against the user's local machine.** `Build Command`
   says it "usually resembles" the local command; `Start Command` explicitly
   says it "might differ", with a named example. **Render tells you when its
   own analogy breaks.** That one-word difference (`usually resembles` vs
   `might differ`) is the whole content design of this form.
2. **A hint that opens with a question** — `Deploying from a monorepo?` — so
   the majority of users can skip the field in one glance.
3. **Reversibility stated at the point of anxiety**: "If you forget any, you
   can always add them later and redeploy." Repeated verbatim on both the
   web-service and static-site tables, and again in the CLI reference.
4. **Examples are labelled by the tool that generates them**, not just listed:
   `` `out` (Next.js static export) `` rather than a bare list.

**CLI flags mirror the form fields, with the same hint text reused**
`[observed]`: `--name` ("appears in the Dashboard and your `onrender.com`
URL") · `--type` (`web_service` / `static_site`) · `--repo` · `--runtime`
(`node`, `python`, `ruby`, `go`, `elixir`, `docker`) · `--build-command` ·
`--start-command` · `--publish-directory` · `--env-var` ("Repeat the flag for
multiple variables") · `--plan` ("Provide `free` to deploy this service for
free") · `--auto-deploy` · `--commit`.

**The same explanatory sentence appears under the GUI field and the CLI flag.**
One content source, two surfaces — verifiable here because both are on public
pages, and a good argument for writing field help as reusable strings.

**Other named settings** `[documented]`:
`Auto-Deploy` (values `On Commit` / `After CI Checks Pass` / `Off`) ·
`Overlapping Deploy Policy` (values `Wait` / `Override`) ·
`Docker Command` · `Deploy Hook URL` ·
`Git Deployment Credentials` · `Account Security` ·
`maxShutdownDelaySeconds` (API/blueprint field) ·
`Monthly Included Usage` (billing section).

**Status-page form labels** `[observed]`: `Email address:` · `Enter OTP:` ·
`Resend OTP in:  seconds` — **rendering with the number missing**, the same
Statuspage interpolation defect observed on Supabase's status page.

## T6 Status & state language

One of the two strongest categories here.

**Deploy states, observed in the tutorial's own branch copy** `[observed]`

| State | Source |
|---|---|
| `Live` | "the deploy's status updates to **Live**" |
| `Failed` | "the deploy's status updates to **Failed**" |

Two states only, both title case, both stated as a *transition*
("updates to"). Additional lifecycle conditions named in prose rather than as
status values: `in progress` · `waiting` · `cancelled` · `skipped` ·
`current live deploy`.

**The deploy pipeline is named as four labelled stages** `[observed]`, rendered
as a diagram whose text is:

`Deploy initiated` → `Build command*` → `Pre-deploy command* (Optional)` →
`Start command` → `Deploy complete`

The asterisk is defined once: "*Consumes pipeline minutes while running."
**Two of the four stages are marked as the billable ones, inline in the
diagram.** A user reading the deploy lifecycle learns the cost model from the
same picture.

**Per-stage timeouts, published as a table** `[observed]`

| Command | Timeout |
|---|---|
| Build command | 120 minutes |
| Pre-deploy command | 30 minutes |
| Start command | 15 minutes |

Preceded by the consequence in bold: "**If any command fails or times out, the
entire deploy fails.** Any remaining commands do not run. Your service
continues running its most recent successful deploy (if any), with zero
downtime." **Failure semantics stated before the numbers**, and the reassurance
(your old version keeps serving) in the same breath as the failure.

**The zero-downtime sequence is published as seven numbered events with exact
signals and delays** `[observed]`

1. build attempted; "If the build fails, Render cancels the deploy, and your
   original service instance continues running without interruption."
2. new instance spins up; "your *original* instance continues to receive all
   incoming traffic while the new instance is spinning up"
3. networking updated so "your *new* instance begins receiving all incoming
   traffic"
4. "**After 60 seconds**, Render sends a `SIGTERM` signal to your app's process
   on the *original* instance."
5. "If your app's process doesn't exit within its specified **shutdown delay**
   (default 30 seconds), Render sends a `SIGKILL` signal"
6. edge cache purged, for services with edge caching
7. "The zero-downtime deploy is complete."

Plus the multi-instance rule: "Render performs steps 2-5 for one instance at a
time. If *any* new instance fails to become healthy during this process, Render
cancels the entire deploy and reverts to instances running the previous
version."

**Render publishes its own state machine, with every timer and signal named.**
A developer can write a correct `SIGTERM` handler from this page alone — and
the accompanying diagram text even shows the load-balancer swap
(`Render load balancer` / `Original instance (v1)` / `New instance (v2)`, with
the original **struck through** in the final frame). The strikethrough survives
into the served text, so the state change is legible without the graphic.

**`Graceful shutdown` is taught as a list of the user's responsibilities**
`[observed]`: respond to remaining in-flight HTTP requests; complete
in-progress worker tasks "(or marking them as failed so they're retried by
other workers)"; terminate outbound connections; exit with a zero status. Four
actions, one of which names the *failure-marking* alternative. And the escape
hatch is bounded and then unbounded: up to `300 seconds` via config, then
"**Need more than 300 seconds for graceful shutdown?** Reach out to our support
team" — a limit, and a named route past it.

**Overlapping-deploy policy: two named states with a dated default change**
`[observed]`

| Policy | Behaviour | Default for |
|---|---|---|
| `Wait` | "Allow the in-progress deploy to finish, then proceed directly to the most recently triggered deploy"; "Render skips any 'intermediate' deploys" | workspaces created **on or after 2025-07-14** |
| `Override` | "Immediately cancel the in-progress deploy and start the new one." | workspaces created **before 2025-07-14** |

**A behavioural default disclosed with the exact date it changed, and both
cohorts named.** Most products silently change a default and let old users
discover it. Render also states its recommendation and the reason:
"We recommend this option for most workspaces, because it helps maintain a
regular cadence of deploys during periods of high change volume."

**Manual-deploy options are four named actions with distinct semantics**
`[observed]`

| Option | What it does |
|---|---|
| `Deploy latest commit` | Most recent commit on the linked branch |
| `Deploy a specific commit` | By SHA or from a list — "**This disables automatic deploys for the service.**" with the reason: "an automatic deploy might reintroduce commits you wanted to exclude" |
| `Clear build cache & deploy` | "first clears the service's build cache… Use this option to incorporate changes to your service's build command, or to refresh stale static assets." |
| `Restart service` | "Deploys the same commit that's *currently* deployed… with the same values for user-defined environment variables." |

`Restart service` gets the most careful copy on the page, because the word is
misleading:

> "On Render, a service restart is actually a special form of manual deploy…
> *Unlike* other deploys, the new instance always uses the exact same Git commit
> and configuration as the running instance at the time of the restart. This
> means that **if you've recently updated your service's environment variables
> but haven't redeployed since then, restarting does *not* incorporate those
> changes.**"

**Render reclassifies its own UI action** ("a restart is actually a deploy") and
then names the exact wrong expectation the word creates. This is the Wise
"gap between system state and user reality" pattern applied to a *verb* rather
than a status.

**Which tools disable auto-deploy, as a four-row table** `[observed]`:
`Dashboard` → **Disables**; `Deploy hook` → **Disables**; `CLI` → **Does not
disable**; `API` → **Does not disable**. An inconsistency in Render's own
product, published as a table rather than hidden.

**Free-tier state vocabulary — five distinct words for "not running"**
`[observed]`

| Term | Trigger and meaning |
|---|---|
| `spins down` | "Render **spins down** a Free web service that goes 15 minutes without receiving any inbound traffic." Reversible, automatic, benign. "A Free web service spins back *up* whenever it next receives an HTTP request… This process takes about one minute." |
| `suspends` | Quota consequence: "If you consume all of your Free instance hours during a given month, Render **suspends** all of your Free web services until the start of the next month." Also used for the traffic threshold and for missing payment methods |
| `disables` | Build-specific: "Render instead **disables** all new builds for your workspace for the remainder of the month.<br>In this case, your services remain active using their existing build artifacts." |
| `expires` | Time-based, for Free Postgres: "**Free Render Postgres databases expire 30 days after creation.** An expired Free database is inaccessible unless you upgrade it" |
| `deletes` | Terminal: "After the grace period, Render **deletes** the database (along with all of its data)." |

**Five verbs, each precisely scoped, and the difference between them is
material to the user.** `spins down` costs you a minute; `suspends` costs you a
month; `disables` stops builds but keeps you serving; `expires` locks you out;
`deletes` is irreversible. The `disables` entry is the best-written because it
states what *continues* to work. And `30 days` + `14 days` grace + deletion is
a three-stage timeline with notification at two of the three stages.

**Render also names the state it displays to end users** `[observed]`:
"Render displays a loading page to connecting browsers while a service is
spinning up." And a genuinely unusual state behaviour:

> "While a Free web service is spun down, incoming requests to the path
> `/robots.txt` automatically receive a standard 'disallow all' response…
> These requests do *not* reach your service or trigger a spin-up."

Verbatim served content (`User-agent: *` / `Disallow: /`). A state-dependent
response served *on the service's behalf* while it is asleep — documented,
including the fact that behaviour differs when the service is awake.

**Log-line state strings** `[observed]`, quoted from the tutorial:

```
==> Deploying...
==> Running 'npm start'
==> Your service is live 🎉
```
```
==> Uploading build...
==> Your site is live 🎉
```

The `==> ` prefix marks platform lines against app output. `Your service is
live` vs `Your site is live` — **the noun changes with the service type**, so
the success line is specific to what you deployed. Both end with the same emoji.

**Skipped deploys have their own event** `[observed]`: skip phrases
`[skip render]` · `[render skip]` — and `render` may be replaced with `deploy`
or `cd`, giving **six accepted spellings of one instruction**. "When an
auto-deploy is skipped, a corresponding entry appears on your service's
**Events** page."

**Dashboard surfaces named as separate state views** `[documented]`:
`Deploys` page (deploy history + current live deploy) · `Logs` page
(runtime, with a `log explorer`) · `Events` page (skips, resource warnings) ·
`Settings` page. **Three different pages for three kinds of history**, and the
troubleshooting doc routes to the right one per symptom.

**Status page: 5 component states** `[observed]`
`Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` ·
`Maintenance`, with history-row variants in sentence case
(`Major outage` / `Partial outage`) — the same title-case/sentence-case
inconsistency as Supabase, because both use Atlassian Statuspage.

**Component taxonomy is region-replicated, which is the notable structure**
`[observed]`

Global: `Render Dashboard` · `Render Website` · `Render Platform API` ·
`Render REST API` · `Static Sites` · `Custom Domains` · `One-Off Jobs`

Then **the identical 10-component block repeated per region** for `Oregon`,
`Frankfurt`, `Ohio`, `Singapore`, `Virginia`:
`Web Services` · `Cron Jobs` · `Background Workers` ·
**`Builds and Deploys`** · `PostgreSQL` · `Redis` ·
`Web Services - Free Tier` · `Autoscaling` · `Metrics/Logs` · `Workflows`

Three things stand out. **`Builds and Deploys` is a first-class status
component in every region** — Render treats "can you ship" as an availability
surface distinct from "is your app up", which is exactly right for a deploy
platform and is the direct expression of its benchmark strength.
**`Web Services - Free Tier` is separately monitored**, so free-tier
degradation is visible as free-tier degradation rather than as a general
outage. And `PostgreSQL` / `Redis` use the **upstream project names** while the
products are marketed as `Render Postgres` and `Render Key Value` — the status
page is a region where the branding has not caught up.

The **50-cell region × component grid** is a legible availability model but a
long linear read: the same ten labels appear five times with no differentiation
in the text.

**Historical-uptime empty states** `[observed]`, identical to Supabase's
(shared Statuspage vocabulary): `No downtime recorded on this day.` ·
`No data exists for this day.` · `No incidents reported today.` ·
`No incidents reported.` · `No incidents or maintenance related to this
downtime.` · `had a major outage.` · `had a partial outage.`

`All Systems Operational` is the overall banner — **a flat assertion with no
epistemic hedge**, unlike Docker's "We're not aware of any issues".

## T7 Error, failure & recovery

The other strongest category. Render has **no error-code taxonomy** — no `H12`,
no `bad_jwt`. It organises failure by **HTTP status code and by verbatim error
string**, and frames the whole thing around one diagnosis.

**The page's opening move is to name the root cause of almost all failures**
`[observed]`

> "Sometimes, an app that runs fine locally might fail to deploy to Render at
> first. When this happens, **it's almost always because of differences between
> your local development environment and the environment that Render uses to
> build and run your code.**"

Then four named difference classes: language version · environment-variable
values · availability of tools and utilities · dependency versions.

**A single unifying hypothesis, stated first, with the four axes it varies
on.** Everything after is an instance of it. Compare Heroku's flat list of 44
codes: Render's troubleshooting page has a *thesis*. For a platform whose most
common ticket is "works on my machine", this is the correct content
architecture.

**Two numbered diagnostic steps before any error list** `[observed]`

`1. Check the logs` — opens "Whenever your app misbehaves in any way,
**always check the logs first.**" Then *which* logs, by symptom: failed deploy →
the `Deploys` page; running app error → the `Logs` page. Then a concrete search
tactic: "searching the log explorer for the word `error` can often direct you
to a relevant log line." Then — unusually — an instruction to leave:
"If the meaning of the full error message is unclear, try searching the web
(or an individual site like Stack Overflow or Discord)".

`2. Ensure matching versions and configuration` — three sub-headings that
mirror the thesis: `Runtime mismatches` · `Version mismatches` ·
`Configuration mismatches`. Includes the one piece of advice nobody thinks to
give: "**Perform a fresh install of your project on your local machine** to
confirm that you're using exactly the dependency versions specified in your
repository (such as in your `package-lock.json` file)." The suggestion is that
the reader's *local* environment may be the lying one.

**Build & deploy errors: grouped by cause class, with verbatim strings**
`[observed]`

*Missing or incorrectly referenced resources*
- `Module Not Found` / `ModuleNotFoundError` — three candidate causes, the
  third being "If you're developing on Windows or another platform with a
  case-insensitive filesystem, make sure that all file paths, names, and
  extensions are cased correctly. **You might need to check the contents of
  your Git repo directly.**"

*Language / dependency version conflicts*
- `` SyntaxError: Unexpected token '??=' `` — "The app's Node.js version
  doesn't support the indicated operator or method."
- `` The engine "node" is incompatible with this module. Expected version… ``
- `requires Python >= 3.8`

*Invalid configuration*
- `Invalid build command` · `Invalid start command` — each with
  "This usually should match the command you run to build/start your app
  locally" and two named examples per language
- `Missing environment variables`
- `` Missing Dockerfile `CMD` or `ENTRYPOINT` `` — and the *symptom*:
  "If you omit *both* of these directives, **your deploy might appear to hang
  indefinitely** in the Render Dashboard."
- `Misconfigured health checks` — "If the health check endpoint responds with an
  unexpected value (or doesn't respond at all), **Render cancels your deploy.**"

The Dockerfile entry is the best of these: it maps a missing *configuration*
to an observable *UI behaviour* (a hang, not an error), which is the case a
user cannot search for because there is no error string to paste.

**Runtime errors organised by HTTP status, with a browser-tooling tip first**
`[observed]`

> "Many common runtime errors surface as `HTTP` error codes returned to your
> browser or other client. For errors returned to your browser, the Network
> panel of your browser's developer tools helps provide more details."

| Status | Causes named |
|---|---|
| `400 Bad Request` | Django `ALLOWED_HOSTS` missing the custom domain — **one cause, framework-specific** |
| `404 Not Found` | Misconfigured redirects/rewrites · misconfigured routing · nonexistent file on disk (two sub-causes: no persistent disk; wrong path "such as by misspelling or incorrectly capitalizing a path component") · Django static files |
| `500 Internal Server Error` | Uncaught exception · database connection issues, with the verbatim string `SSL connection has been closed unexpectedly` and the fix (`sslmode=require`, connection pool) · resource exhaustion, with where to look ("warnings about resource constraints usually appear in the service's logs and on the service's **Events** page") |
| `502 Bad Gateway` | Misconfigured host and port — "Bind your host to `0.0.0.0`… (the default port is `10000`)" · new custom domain not yet propagated, "In most cases this resolves within a few minutes, but it might take up to an hour" · Node.js `Connection reset by peer`, with named settings and values (`server.keepAliveTimeout`, `server.headersTimeout`, "such as to `120000` for 120 seconds") · `WORKER`, `SIGKILL`, `SIGTERM` warnings with the verbatim `[CRITICAL] WORKER TIMEOUT` |

Three observations. **The 400 entry has exactly one cause and it is
framework-specific** — Render publishes the single most common Django
misconfiguration rather than a generic "check your request". The 502
custom-domain entry gives a **duration band with an upper bound**
("a few minutes… up to an hour"), which is what stops the user from retrying
for an hour. And the fix advice carries **specific values, not just parameter
names** (`120000`, `0.0.0.0`, `10000`, `sslmode=require`) — the reader can
paste.

**Notably absent**: there is no `503`, no `504`, and no platform-side error
class at all. **Every documented runtime error is the customer's**, which is
either admirable focus or a gap depending on whether Render's own failures
produce distinguishable statuses. Recorded as a negative finding.

**`When to contact support` — the scope of help, stated as four exclusions**
`[observed]`

> "Render's support team is available and happy to assist with issues that are
> specific to the capabilities, conventions, and underlying infrastructure of
> our platform.
> **Our support team *cannot* assist with more general development issues like
> the following:**
> - Debugging of application code
> - Software design and architecture
> - Performance optimization
> - Programming nuances specific to a particular library or framework
>
> For help with issues like these, please consult sites and services that
> specialize in these forms of assistance."

**A published, enumerated support boundary — four named categories of thing
they will not help with.** Preceded by a warm in-scope sentence
("available and happy to assist"), followed by a redirect without naming a
destination. It is linked from the FAQ as the answer to
`Which types of issues can Render's support team help with?` — so the question
is phrased positively and the answer is a list of negatives.

This is the most directly transferable artefact in the file for anyone writing
support-scope copy: one sentence of what you do, four bullets of what you
don't, one sentence of where else to go. It prevents the ticket rather than
deflecting it.

**Failure recovery is stated as "push a new commit"** `[observed]` — repeated
in all three deploy paths. The retry affordance is the user's existing git
workflow, not a Render button. And in the agent path, the recovery is a prompt:
"Why did the deploy for my-service fail?"

**Suspension recovery** `[observed]`: for the service-initiated-traffic
threshold — "If your service is suspended this way, **you can restore it by
moving it to any paid compute plan.**" The recovery from an abuse suspension is
to pay, stated plainly without euphemism.

## T8 Empty states

`[documented]` and thin, but two real ones.

**The spin-down loading page** `[documented]`:
"Render displays a loading page to connecting browsers while a service is
spinning up." An interstitial served by the platform in place of a
not-yet-running app. **The copy of that page was not captured** and is not
guessed — it is the single most-seen Render-authored screen on the free tier
and would be the highest-value string on the platform.

**The `robots.txt` stand-in** `[observed]` — while a Free web service is spun
down, `/robots.txt` returns:

```
User-agent: *
Disallow: /
```

A machine-facing empty state: Render answers on the service's behalf rather
than waking it, and documents both the content and the fact that it differs
when awake.

**The apparent-hang state** `[observed]`, from troubleshooting: a Dockerfile
missing both `CMD` and `ENTRYPOINT` means "your deploy might appear to hang
indefinitely in the Render Dashboard" — an *empty* progress state with no error,
which is worse than a failure and is documented as such.

**Status-page empty states** `[observed]`: `No incidents reported today.` ·
`No incidents reported.` · `No downtime recorded on this day.` ·
`No data exists for this day.` · `No incidents or maintenance related to this
downtime.` (Shared Statuspage vocabulary — see T6.)

All dashboard first-run states (no services, no logs, no metrics) are
post-auth. `[absent]`

## T9 Notifications & system messages

`[documented]` mostly, with one observed incident.

**Usage notifications are promised with their timing, twice** `[observed]`

> "Render notifies you via email when you're approaching a usage limit, and
> then again if you exceed that limit."
> "Render notifies you via email when you're approaching a Free database
> expiration, and then again when you're approaching the end of the grace
> period."

**A two-notification pattern — warning then event — stated as a commitment in
the documentation.** The user knows how many emails to expect and at which
thresholds. The actual email copy is `[absent]`.

**Consequences of *not* having a payment method are stated as system
behaviour** `[observed]`: "If you haven't added a payment method and you would
incur charges, Render instead **disables your services** for the duration of
the current billing period." And for bandwidth: "Render instead **suspends all
of your Free services** for the remainder of the month." Two different verbs
for two different triggers (see T6).

**Named notification channels** `[documented]`: `Webhooks` and
`Email / Slack` are two separate docs pages under an `Observability >
Notifications` group. `Failure notifications` is listed as a Cron Jobs feature
on the pricing page. `Notifications` appears as a feature row available on all
four plans.

**Deploy log lines are the primary progress channel** `[observed]` — see T6 for
the `==> ` strings. `Follow along as the deploy proceeds through your build and
start commands.` is the instruction that accompanies them, in both the
Dashboard and CLI tabs.

**Status-page incident, the only one in 90 days** `[observed]`:
`Elevated Build and Deploy Times in the Oregon Region` —
`Investigating` (21:26) → `Update` (21:31) → `Update` (21:32) →
`Identified` (21:34) → `Resolved` (21:38). Twelve minutes, five posts.

The bodies are **entirely boilerplate**:
"We are currently investigating this issue." ·
"We are continuing to investigate this issue." (×2, identical, one minute
apart) · "The issue has been identified and a fix is being implemented." ·
"This incident has been resolved."

**Zero customer-specific information in any of the five updates** — no cause,
no blast radius, no affected-workspace guidance, and no mention of what a
customer experiencing a slow build should do. The **title** carries all the
information (symptom + region); the body carries none. Contrast Supabase, which
names regions, versions, root causes, and workarounds. Recorded as the clearest
head-to-head incident-communication gap in this batch. Two identical
consecutive `Update` posts one minute apart is also a cadence defect — an
update that updates nothing.

**Notification subscription copy** `[observed]`:
"Get email notifications whenever Render **creates**, **updates** or
**resolves** an incident." — three bolded trigger verbs, same construction as
Supabase's (shared Statuspage template). Channels: email (OTP-verified),
Slack, Twitter (`@renderstatus`), Atom, RSS. **No SMS and no webhook**, unlike
Supabase — a narrower channel set.

**Support routing from the status page** `[observed]`:
"Visit our [support site](https://community.render.com)." — the status page's
support link goes to a **community forum**, not to Render.

**Billing-email copy** `[absent]`. **Spin-up loading-page copy** `[absent]`.
**Deploy-failure email copy** `[absent]`.

## T10 Disclosures, legal & compliance

**The billing model is disclosed as three named things, in one sentence**
`[observed]`

> "Render charges for three things: your workspace plan (flat subscription),
> metered features like bandwidth (usage-based), and compute for your
> applications (usage-based)."

Three components, each with its *pricing model in parentheses*. This is the
whole commercial model in 26 words, and it is the first FAQ answer.

**The `What does Render bill for?` table is the best billing disclosure in this
batch** `[observed]` — five billables, each with its own row:

| Billable | Key disclosure |
|---|---|
| `Workspace plan` | Names all four plans and states "The **Hobby** plan does not have a monthly fee." |
| `Compute and storage costs` | "**Prorated by the second.** If a service is active for ten seconds in a given month, you are billed only for those ten seconds." Then enumerates the four things that count, including the non-obvious ones: **paid instances running inside previews**, and **database replicas created for high availability or read replicas** |
| `Pipeline minutes` | "**Includes a monthly included amount.**" Then the consequence of the cap: "*Render stops running new builds for your services until the next billing period*" |
| `Outbound bandwidth` | "*Inbound* bandwidth (traffic *to* your services) is **free**." And: "As part of Render's DDoS protection, Render does *not* bill for bandwidth usage incurred from a DDoS attack." |
| `Custom domains` | "Additional domains cost $0.25 each per month." |

Three of these are disclosures a vendor would rather omit. **Preview
environments and HA replicas are billable** — the two things a customer would
assume are included in the feature they bought. **Naming the surprises is the
disclosure.**

And "Render does *not* bill for bandwidth usage incurred from a DDoS attack" is
the single best sentence on the pricing page: it answers a fear
(getting a five-figure bill from an attack) that the customer may not have
articulated, in the same row as the metered charge.

**A whole FAQ devoted to the free-tier billing trap** `[observed]`:
`All of my services run on free instances. Can I still be billed?` — answered
**"Yes, if you've added a payment method."** in bold, then the two ways it
happens. A vendor writing the question that undercuts its own "free" claim.

**The Free-tier limits page opens with a prohibition** `[observed]`:

> "**Free instances have important limitations, described below. Do not use
> them for production applications.**"

Then immediately the legitimate use: "However, they're perfect for testing out
a new technology, working on a hobby project, or previewing Render's developer
experience." **Prohibition first, permission second.** The page then lists
~25 individual limitations across three product families, including several
that are pure downside with no upsell attached:

- "Render might restart a Free web service at any time."
- "Free web services can't listen on reserved ports `18012`, `18013`, or
  `19099`."
- "Free web services can't send outbound network traffic on ports `25`, `465`,
  or `587`, commonly used for SMTP." — **the port numbers *and* what they are
  for**, so a user sending email knows this applies to them
- "Free Render Postgres databases don't support any form of backups."
- Free Key Value: "whenever an instance restarts, all of its data is lost" and
  "If you upgrade a Free Render Key Value instance to a paid compute plan,
  **its data is lost during the upgrade process.**" — data loss *during the
  act of paying you more money*, disclosed

**A distinction most platforms blur, stated in bold** `[observed]`:

> "**Upgrading your workspace plan does *not* remove limitations on Free
> instances.**
> Your workspace's plan only determines which platform-level features are
> available. You change a service's compute plan independently."

**Two orthogonal plan axes — workspace plan and compute plan — and the
disclosure exists because customers pay for the wrong one.** The FAQ
`How do free compute plans work?` reinforces it. This is the clearest example
in the batch of a disclosure written *to prevent a support ticket about a
billing mistake*.

**Compliance is gated by plan, and the premium is stated as a row value**
`[observed]`

From the ~120-row feature matrix: `GDPR DPA` (all four plans) ·
`SOC 2 Type II` (all four) · `ISO 27001` (all four) ·
`SOC 2 & ISO documentation` (— on Hobby) ·
`HIPAA BAA` (— on Hobby and Pro; on Scale and Enterprise:
**"20% compute premium for enabled workspaces"**).

**The price of HIPAA is a cell in the comparison table.** Not "contact sales" —
a percentage. That is unusually direct for a compliance upcharge.

The matrix uses `—` for "not available" and a value or a checkmark otherwise,
and several cells carry *scope* rather than yes/no:
`Inbound IP rules` → `Datastores only / Postgres and Key Value` ·
`Workspace user roles` → `Admin, Developer` (Pro) vs
`Admin, Developer, Contributor, Viewer, Billing` (Scale) ·
`Task compute plans` → `Up to Pro` / `Up to Pro Ultra`. **The cell names the
limit instead of asserting the feature**, which is the right pattern for a
comparison table and is applied consistently.

**Overage prices are printed next to the included amount in the same cell**
`[observed]`: `5 GB included per month / then $0.15 per GB` ·
`500 mins per month / then $5 per 1K mins` ·
`2 included / then $0.25/domain/month` ·
`50 task runs / then $10/mo per 50`. **Included-then-overage as a single cell
format**, repeated ~8 times. A user never has to look up the marginal rate.

**Retention and window values disclosed per plan** `[observed]`:
`Point-in-time recovery window` 3/7/7/7 days ·
`Log retention` 7/14/30/30 days ·
`Instant rollbacks` 5/15/30/30 builds retained ·
`Environments` 2 per project / Unlimited.

**Payment disclosures written to answer confusion** `[observed]`

> `Why was I charged $1 after adding a credit card?`
> "A $1 USD transaction is performed as a credit security check to ensure your
> card details are correct and authorized. The charge is refunded after the
> transaction completes."

A pre-authorisation hold explained as its own FAQ entry, because it generates
support contacts. And: "Your payment info is stored and processed securely by
Stripe and **never touches our servers.**"

**A fee waiver disclosed** `[observed]`:
`My Pro or Scale workspace did not have any activity or services this month.
Will I still be charged for the workspace subscription?` —
"If a workspace has no services (live or suspended) and no activity during a
month, the workspace subscription fee for that month will be waived." Note the
parenthetical `(live or suspended)` — the definition of "no services" is
tightened inside the answer.

**Migration incentive** `[observed]`: "Get up to **$10K** in migration
credits", sitewide banner, with `Apply now` (an application, not an automatic
grant — the gating is in the verb).

**Security claims on the home page, six named** `[observed]`:
`Private networking` ("without VPC complexity") ·
`Built-in DDoS protection` ("without extra configuration or add-ons") ·
`Managed compliance` ("Meet SOC 2 Type 2, HIPAA, ISO 27001, and GDPR
requirements without overhead") · `Audit controls` ·
`Encryption at rest` (**"Minimum AES-128 encryption for databases, backups, and
secrets"** — a *minimum*, and a lower figure than Supabase's AES-256) ·
`Unique user identification`.

**`Minimum AES-128`** is worth flagging: publishing a floor rather than a
ceiling is honest, and AES-128 is a weaker-sounding number than competitors
advertise. Also note `SOC 2 Type 2` on the home page vs `SOC 2 Type II` on the
pricing page — two spellings of one certification.

**Legal footer** `[observed]`: `Privacy Policy` · `Security` ·
`Shared Responsibility Model` · `Terms of Use` · `DMCA Policy` · `DPA` ·
`Acceptable Use`. **`Shared Responsibility Model` promoted into the `Legal`
footer column** — Render treats the security-boundary document as a legal
artefact, alongside a `Pentest policy` page in the docs.

## T11 Help-centre architecture

**There is no help centre.** Support is four-tiered and each tier is named:

1. **Docs** — the primary surface, with `Ask AI` search
2. **`Troubleshooting Your Deploy`** — one page, doing the work of a
   troubleshooting index
3. **`community.render.com`** — a forum, linked from the status page and the
   pricing FAQ ("talk to us in our user community")
4. **Email / chat / Slack** — `support@render.com`, plus chat on all plans and
   a `Private Slack channel` as a paid add-on

**The support-scope boundary is published (see T7)** and is the closest thing
Render has to help-centre routing policy.

**The troubleshooting architecture is one page, not an index.** Compare
Supabase's ~200 faceted entries. Render's single page is organised as:

`1. Check the logs` → `2. Ensure matching versions and configuration` →
`Common errors` (`Build & deploy errors` / `Runtime errors`) →
`When to contact support`

**Diagnostic procedure first, error catalogue second, escalation third.** For a
platform whose failures cluster into one cause class (environment mismatch),
this is arguably better than an index — the reader is walked through the
hypothesis rather than asked to search. The cost is that a user holding an
error string Render hasn't listed has nowhere to land; there is no long tail.

**Article-title grammar — five shapes**

| Shape | Examples |
|---|---|
| Possessive tutorial | `Your First Render Deploy`, `Troubleshooting Your Deploy` |
| `How X works` | `How deploys work` |
| Gerund/noun topic | `Deploying on Render`, `Deploy for Free`, `Monorepo support` |
| Question as nav label | `Which to use?` |
| Bare feature noun | `Scaling`, `Rollbacks`, `Maintenance mode`, `One-off jobs` |

Two of these carry the second-person possessive (`Your`), both in onboarding
and troubleshooting — the two places the reader is most invested.

**Page furniture** `[observed]`: every docs page has an H1 and, on the richer
pages, **an H2 that functions as a one-line abstract**:
`Understand how deploys work.` · `Run your web app in minutes.` ·
`Preview the Render platform with free web services and datastores.` ·
`Spin up basic web services and datastores at no charge.` (meta description).
A **declarative sub-headline under the title** on every substantial page,
telling the reader what they will be able to do.

`Copy page` appears on every docs page — markdown export for LLM consumption,
matching Supabase's `Copy as Markdown` and Docker's `Copy Markdown`. All three
products in this batch ship it; none of them are the same string.

`Ask AI` sits beside `Search` in the docs header, and the mobile variant is
labelled just `Ask` — **two labels for one feature in one header**.

**Sequential cross-linking is heavy and directional.** The FAQ answers
`My app runs fine locally. Why does it fail to deploy?` with a **link and
nothing else** ("Please see Troubleshooting Your Deploy."), and
`Which types of issues can Render's support team help with?` likewise. Render
maintains one canonical location per answer and points at it rather than
duplicating. Two of ten FAQ answers are pure redirects — efficient for
maintenance, slightly hollow for the reader.

## T12 FAQs

**Two FAQ surfaces with different jobs.**

### 12a. Docs FAQ — 10 questions in six named groups `[observed]`

Intro: "This page lists answers to questions that many folks have as they're
getting up and running with Render." (`folks` is the one colloquialism in
Render's docs voice.)

| Group | Question (verbatim) |
|---|---|
| `Languages and technologies` | Which languages does Render support? |
| | Which datastores does Render support? |
| `Billing` | What can I do on Render for free? |
| | What does Render bill for? |
| | All of my services run on free instances. Can I still be billed? |
| `Service behavior` | My app runs fine locally. Why does it fail to deploy? |
| | Why is my free service sometimes slow to respond? |
| | Why do files saved to my service's filesystem disappear? |
| | Can I deploy multiple apps to a single Render service? |
| `Account administration` | Can I transfer existing services from one workspace to another? |
| `Render support` | Which types of issues can Render's support team help with? |

**Structural analysis.** The `Service behavior` group is the interesting one:
**all four questions describe the platform behaving correctly while the user
believes it is broken.**

- `My app runs fine locally. Why does it fail to deploy?` — **two sentences,
  the first being the user's evidence and the second their grievance.** The
  strongest FAQ question in this batch. It encodes the contradiction rather
  than the topic
- `Why is my free service sometimes slow to respond?` — `sometimes` is load-
  bearing; intermittency is the symptom
- `Why do files saved to my service's filesystem disappear?` — the user's verb
  (`disappear`) rather than the system's (`ephemeral`). The answer then
  introduces the system's term: "By default, Render services have an
  **ephemeral filesystem**"
- `Can I deploy multiple apps to a single Render service?` — answered
  **"It might be possible, but you shouldn't."** in bold. A concessive, a
  prohibition, and no hedging; then the reason (resource isolation) and a
  three-row recommended architecture table

Two answers are flat noes with reasons:
`Can I transfer existing services from one workspace to another?` — "**No**, it
is not currently possible", then two workarounds. `not currently` is the only
hedge, and it is the right one — it signals a roadmap without promising.

### 12b. Pricing FAQ — 9 questions `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does billing work? |
| 2 | How am I billed for compute? |
| 3 | My Pro or Scale workspace did not have any activity or services this month. Will I still be charged for the workspace subscription? |
| 4 | I run a large agency with developers on multiple teams. What does this mean for us? |
| 5 | What are build pipeline minutes, and how can I track my usage? |
| 6 | How do free compute plans work? |
| 7 | Which payment methods do you accept? |
| 8 | Why was I charged $1 after adding a credit card? |
| 9 | I have an infrequently asked question. |

**Q3 and Q4 are written as situations, not questions** — a first-person
scenario followed by the question it raises. Q4 (`I run a large agency with
developers on multiple teams. What does this mean for us?`) is a persona
statement; the answer routes to multiple workspaces and then to sales.

**Q9 is the notable one.** `I have an infrequently asked question.` — a
statement, not a question, closing an FAQ with a joke about its own genre, and
then answering warmly: "Great! We're always around to help. You can email us
any time at support@render.com, or talk to us in our user community." One
exclamation mark, and it is the escalation slot. Compare Wise's
`Is there any other information I need to know?` — both are catch-alls; Render's
is funnier and its answer is a human route rather than residual caveats.

**Q5 is compound** (`What are build pipeline minutes, and how can I track my
usage?`) — definition and self-service paired, because knowing the unit without
being able to see your consumption is useless. The same pairing Docker uses
across its metered products.

**Q8** (`Why was I charged $1 after adding a credit card?`) is a support-ticket
deflection written as an FAQ, and it is specific down to the currency
(`$1 USD`).

**Neither FAQ has a headline question about reliability, security, or lock-in.**
Both are billing-and-behaviour documents. For a platform positioned against
Heroku, the absence of a "what if you shut down / raise prices" question
(which Supabase does ask) is a gap.

## T13 Terminology & glossary

Render publishes **no glossary**, which is a real gap given that it inherits
Heroku's conceptual space while systematically renaming everything.

| Term | How Render defines it for a newcomer | What plainer word it displaced |
|---|---|---|
| `service` | "To deploy on Render, you create a **service** that pulls, builds, and runs your code." — defined by its three verbs | app / dyno / container. **The direct replacement for Heroku's `app`+`dyno` pair**, and Render collapses both into one noun. A `service` is what you create, scale, restart, and pay for |
| `Web Service` / `Static Site` / `Private Service` / `Background Worker` / `Cron Job` / `Workflow` | Six named service types, each with a one-line "choose this if…" | dyno types / process types. Where Heroku has one `dyno` with a `process type`, Render has **six top-level nouns** — a flatter, more guessable model, at the cost of six things to learn instead of two |
| `compute plan` | "This determines your service's CPU and RAM, along with its cost." Values are descriptive strings (`Free`, `0.5c-512mb`, `2c-8g`, `12c-96g`) | dyno size / instance type. **The plan identifier *is* the spec** (`4c-32g` = 4 CPU, 32 GB), so the SKU is self-describing — compare Heroku's `Performance-L-RAM`, which requires a lookup table |
| `workspace plan` vs `compute plan` | Two orthogonal axes; the docs carry a bolded disclosure that upgrading one does not change the other | account tier. **The single most confusing piece of Render vocabulary**, and Render knows it (see T10) |
| `workspace` | The billing and membership container; `Hobby`/`Pro`/`Scale`/`Enterprise` | team / account / org. And **`organization` is a *different*, higher container** available only on Scale+ ("multiple workspaces within the same organization"), so Render has two nesting levels with two words users routinely swap |
| `project` / `environment` | `Projects & environments`; "Environments: 2 per project" on Hobby | app group / stage. `Environment` also appears as `Preview Environments`, `isolated environments`, `Network-isolated environments`, and `Protected environments` — **five modified forms of one noun** |
| `spin down` / `spin up` | "Render **spins down** a Free web service that goes 15 minutes without receiving any inbound traffic." Introduced in scare quotes on first use in the tutorial | sleep / idle / hibernate. Heroku says `sleep`; Render says `spin down`. A more mechanical metaphor, and arguably clearer about the restart cost |
| `pipeline minutes` | "Pipeline minutes track the duration of these tasks." The `build pipeline` "is responsible for building your project before it's deployed" | build minutes / CI minutes. Defined in two places, and its own FAQ question. **Contrast Heroku's undefined `Dyno Units`** |
| `Blueprint` / `render.yaml` | Infrastructure-as-code; "Define, deploy, and version your entire architecture with a single YAML file" | manifest / app.json / Terraform config. `Blueprint` is the coined noun; `render.yaml` is the file; `Infrastructure as Code` is the nav label — **three names for one feature** across three surfaces |
| `Key Value` | "`Render Key Value (Redis®-compatible)`"; status page calls it `Redis` | Redis. A trademark-driven rename handled by carrying the real name in a parenthetical — the same move as Heroku's `Key-Value Store` / "The Redis you love" |
| `pre-deploy command` | "runs *after* your service's build finishes, but *before* that build is deployed. Recommended for… Database migrations, Uploading assets to a CDN" | release phase (Heroku's term). Named by *when* it runs rather than by its lifecycle role, which is more guessable |
| `deploy hook` | A per-service URL that triggers a deploy via GET or POST | webhook / trigger URL. `hook` is also used for the inbound `Webhooks` notification product, so `deploy hook` (outbound trigger) and `webhook` (inbound notification) point opposite directions |
| `ephemeral filesystem` | "any changes a running service makes to its filesystem are *lost* with each deploy" | temporary disk / scratch space. **Identical term to Heroku's**, defined in nearly identical words — inherited vocabulary, not coined |
| `persistent disk` | The paid opposite of the above; "$0.25 per GB per month" | volume / block storage |
| `zero-downtime deploy` | Published as a seven-step sequence (T6) | rolling deploy / blue-green. Render names the *outcome*, not the technique |
| `shutdown delay` | "default 30 seconds", max 300, then `SIGKILL` | grace period / termination timeout |
| `overlapping deploy` with policies `Wait` / `Override` | Two named policies for concurrent deploys | queue / cancel. Two one-word policy names, each an imperative verb |
| `service preview` vs `preview environment` | "Single-service previews" vs "Preview environments (multi-service)" | review app (Heroku's term). **Render splits Heroku's one `Review App` into two products distinguished by scope**, and the distinguishing word is in a parenthetical in the nav |
| `skip phrase` | `[skip render]` / `[render skip]` / `[skip deploy]` / `[skip cd]` etc. | commit flag / `[ci skip]`. Borrowed from the CI convention, with six accepted spellings |
| `build filter` | "Render triggers an auto-deploy only if there are changes to particular files in your repo (no skip phrase required)" | path filter / monorepo trigger |
| `maintenance mode` | A named service action | Identical to Heroku's term — inherited |
| `one-off job` | A named service action | Identical to Heroku's `one-off dyno`, minus the dyno |
| `Free instance hours` | "750 Free instance hours to each workspace per calendar month"; "spun-down services don't consume Free instance hours" | free tier quota. Directly parallel to Heroku's `dyno hours`, with the spin-down interaction defined |
| `Sandboxes (Early Access)` | Maturity inside the label | beta / preview |
| `Zero DevOps` / `zero ops` | Two forms of the same positioning claim | managed / serverless |

**The pattern: Render is a systematic de-jargoning of Heroku.** `dyno` →
`service`; `Review App` → `preview`; `release phase` → `pre-deploy command`;
`sleep` → `spin down`; `slug` → nothing (there is no build-artifact noun at
all, just "the build"). Every substitution trades a coined term for a
descriptive one, and the compute-plan identifiers (`4c-32g`) trade a brand
ladder for a spec string.

**What it inherits unchanged**: `ephemeral filesystem`, `maintenance mode`,
`one-off job`, `rollback`, `health check`, `build command` / `start command`.
These are the terms that became generic, so there was nothing to rename.

**What it fumbles**: the `workspace plan` / `compute plan` collision, the
`workspace` / `organization` nesting, five modified forms of `environment`, and
three names for Blueprints. The de-jargoning is applied to the *runtime* model
and not to the *account* model, and the account model is where the support
tickets are.

**Register split by surface:**

| Surface | Vocabulary |
|---|---|
| Marketing | `zero ops`, `builders`, `Intuitive infrastructure`, `any app or agent` |
| Docs | `service`, `compute plan`, `ephemeral filesystem`, `spin down` |
| Pricing | `workspace plan`, `pipeline minutes`, `0.5c-512mb` |
| Status | `Redis`, `PostgreSQL`, `Web Services - Free Tier` |

The status page uses upstream project names where every other surface uses
Render's product names.

## T14 Voice, tone & accessibility

**Person and tense.** Docs are relentlessly second person and possessive —
`your service`, `your app`, `your deploy`, `your linked branch`,
`your workspace`, `your first deploy`. The company is named in the third person
as an actor: "**Render** triggers a deploy", "**Render** cancels the deploy",
"**Render** suspends all of your Free web services", "**Render** deletes the
database".

**This is the distinctive Render voice choice: "Render" rather than "we".**
Across all eight pages, first person plural appears almost only in the support
and community copy ("Our support team *cannot* assist", "We're always around to
help", "We recommend this option", "We accept all major credit and debit
cards"). Everywhere else the platform is a named third party performing actions
on your things.

The effect is precision — "Render deletes the database" is unambiguous about
agency in a way "your database will be deleted" is not — at the cost of warmth.
Render only becomes "we" when a human is involved.

**Register.** Plain, procedural, present tense. Contractions used freely
("doesn't", "can't", "won't", "it'll", "you'll"). Italics and bold are used
**semantically and consistently**: bold for the consequence
("**If any command fails or times out, the entire deploy fails.**"), italics
for the contrastive word ("your *original* instance", "*Unlike* other deploys",
"*only after* all of your repo's CI checks pass", "*Inbound* bandwidth").
The italic almost always marks the word on which a misreading would turn.

**Exclamation marks are rationed to three moments**, all of them the reader's
success or the company's welcome: `Welcome!`, `That's it!` (×3),
`**Congratulations!** You've deployed your first app on Render 🎉`, and
`Great!` (the FAQ's final answer). **Zero exclamation marks in the
troubleshooting page, the deploys page, the free-limits page, or the pricing
page.** A clean stakes gradient.

**`That's it!` is used three times** as a completion marker
("That's it! Render creates your service and kicks off your first deploy.") —
a small, effective device for closing a procedure.

**Warnings use a consistent bold-lead-then-explain shape** `[observed]`:

> "**Free instances have important limitations, described below. Do not use
> them for production applications.**"
> "**Upgrading your workspace plan does *not* remove limitations on Free
> instances.**"
> "**If any command fails or times out, the entire deploy fails.**"
> "**If you deploy a specific commit SHA, you should also disable automatic
> deploys for your service.**"
> "**It might be possible, but you shouldn't.**"

Bolded consequence or prohibition first, explanation after. Five instances,
one shape.

**Honest limitation language, catalogued:**
`Render might restart a Free web service at any time.` ·
`Render may suspend a Free web service that initiates an uncommonly high
volume of traffic.` · `Render might perform maintenance… at any time.` ·
`it is not currently possible` · `Our support team cannot assist with…` ·
`in most cases this resolves within a few minutes, but it might take up to an
hour` · `almost always because of differences between your local development
environment and…` · `Coming Soon` (Object storage).

`might` / `may` are used for platform discretion, `cannot` for hard
boundaries, `not currently` for roadmap. The modal verb carries the type of
limitation.

**One colloquialism**: `many folks have` (docs FAQ intro). `builders` is used
as the audience noun throughout marketing (`The cloud for builders`,
`designed for builders`) — a positioning choice rather than a register one.

**Numbers are specific and unit-bearing throughout**:
`15 minutes` · `about one minute` · `750 Free instance hours` · `30 days` ·
`14 days` grace · `1 GB` · `25 MB` · `120 minutes` / `30 minutes` /
`15 minutes` (timeouts) · `60 seconds` · `30 seconds` / `300 seconds` ·
`10000` (default port) · `0.0.0.0` · `120000` · `$0.25/GB` · `$0.30/GB` ·
`$0.15/GB` · `$0.00016/minute` · `100x` · `$10K` · `$1 USD` · `2025-07-14`
(a policy-change date) · reserved ports `18012`, `18013`, `19099` · SMTP ports
`25`, `465`, `587`. Cron pricing is quoted to **five decimal places**
(`$0.00016/minute`), which is precise and essentially unreadable.

**Accessibility** `[observed]`

- **No `Skip to content` link found in the served HTML of either the marketing
  site or the docs.** Heroku has one on docs, Docker on marketing, Supabase on
  both — Render on neither. The clearest single accessibility gap in this batch.
- Docs image alt text is **descriptive and states what is being shown**:
  "Selecting a deploy to view logs" · "Log explorer in the Render Dashboard" ·
  "Configuring auto-deploys in the Render Dashboard" ·
  "A deploy waiting for an in-progress deploy to complete" ·
  "A skipped deploy on a service's Events page" ·
  "List of available repos to use for a new service" ·
  "Logs for a service deploy". These name both the screen and the state —
  comparable in quality to Docker's docs alt text and better than any of the
  marketing alt text in this batch.
- **But one docs alt text contains escaped HTML entities**:
  `The &quot;New&quot; dropdown in the Render dashboard` — a screen reader
  announces "The quot New quot dropdown".
- **Marketing alt text is empty on most feature illustrations** — the five
  home-page feature cards' images have `![]()` with no alt, and the icon images
  duplicate their heading as alt (`Native language runtimes`,
  `Infrastructure as code`, `Edge caching`) so each is announced twice.
- **Customer logos carry company-name alt** (`OpenAI`, `Shopify`, `Blackrock`,
  `bluesky`, `Fortune`, `Base 44`, `Commure`) — good. But `Base 44` in the
  logo strip and `Base44` in the testimonial are **two spellings of one
  company** in alt text on one page.
- **Two home-page illustrations carry long, genuinely useful alt text**:
  "Deploy static sites, web services, private services, workflows, background
  workers, cron jobs, databases, and more" and "Render automatically deploys
  your services on a private network whenever you push code." — and **each is
  duplicated** (light/dark variants both exposed), so the sentence is announced
  twice.
- **The decision flowchart's text is present in the DOM but unstructured** —
  the questions and answers linearise as a wall of bolded fragments with no
  indication of which answer belongs to which question. A screen-reader user
  gets "No, it'll run in the background. Yes! No, only private network
  traffic. Yes!…" followed by the questions. **The best-written content on the
  page is the least accessible.**
- The zero-downtime diagram's frames linearise as
  `Render load balancer / Original instance (v1) / New instance (v2)` three
  times with only strikethrough distinguishing the final frame — the state
  change is carried by formatting.
- **Every code block on `your-first-deploy` is detached from its context** in
  the served HTML: 15+ snippets (`npm install`, `brew install render`,
  `render login`, …) appear in a block at the *end of the document*, far from
  the tabs they belong to. A non-JS or screen-reader linear read gets the
  prose without its commands, then the commands without their prose.
- `Ask AI` / `Ask` — two accessible names for one control.
- `Search` appears twice in the docs header DOM.
- `View historical uptime.` has a full stop inside the link text.
- A stray literal `body` renders as page text on the home and pricing pages.
- Status-page `Resend OTP in:  seconds` renders without the number.
- No language switcher; no `lang` alternates observed.

**Negative findings, recorded honestly**

- No skip link on either property
- `render.com/docs` (header) vs `docs.render.com` (footer, pricing FAQ) — two
  hostnames for one docs site, on one page
- Six labels for account creation, plus `Get started` vs `Get Started`
- `Ask AI` vs `Ask`; `+ New` vs `New`
- The rotating feature list renders as an 11-item sentence with a trailing
  comma
- `SOC 2 Type 2` (home) vs `SOC 2 Type II` (pricing)
- `Base 44` vs `Base44` in alt text on one page
- `Redis` / `PostgreSQL` (status) vs `Render Key Value` / `Render Postgres`
  (everywhere else)
- `Operational` / `Degraded Performance` (title case) vs `Major outage` /
  `Partial outage` (sentence case)
- Two identical consecutive `Update` posts, one minute apart, in the only
  incident on the status page — and no cause, impact, or user guidance in any
  of the five posts
- The docs nav item `Compute plans` carries an unspaced `New` badge that
  renders as `Compute plansNew`
- `Workflows` appears in the nav as both `Workflows` (linking to
  `workflows-redirect`) and `Intro to workflows` — a redirect exposed in nav
- Escaped `&quot;` entities inside alt text
- Duplicated light/dark image alt text announced twice
- Code blocks detached from their prose in the linear DOM
- No documented platform-side error class (all runtime errors attributed to
  the customer)
- No FAQ question about reliability, lock-in, or price changes

---

## Transferable patterns

1. **Make "watch the thing you just started" a numbered onboarding step, and
   write both branches.** `5. Monitor your deploy` with `If the deploy
   completes successfully…` / `If the deploy fails…`, each with its status name
   and its next action. Most tutorials end at submit. Transfers to any flow
   with an asynchronous outcome — payouts, KYC, disputes, transfers.
2. **Inoculate against your most common complaint before the user can hit
   it.** The free-tier spin-down warning appears at step 3 of 6, three steps
   before the user could experience it, with the coined verb in scare quotes on
   first use.
3. **Calibrate field hints against the user's own environment, and say when the
   analogy breaks.** `Build Command` "usually resembles the command you run
   locally"; `Start Command` "**might differ**", with a named example
   (`flask run` locally, `gunicorn` in production). One word of difference
   between two adjacent hints, and it is the whole content design.
4. **State reversibility at the point of anxiety.** "If you forget any, you can
   always add them later and redeploy." Repeated verbatim across GUI and CLI
   documentation. Cheap, and it stops the form from feeling irreversible.
5. **Write one hypothesis before the error catalogue.** "It's almost always
   because of differences between your local development environment and the
   environment that Render uses" + four named axes. Gives the reader a model
   instead of a search box.
6. **Publish an enumerated support boundary.** One warm in-scope sentence, four
   bullets of out-of-scope categories, one redirect sentence. Prevents the
   ticket rather than deflecting it, and is more respectful than a slow no.
7. **Publish your state machine with every timer and signal named.** Seven
   numbered events, `SIGTERM` at 60 seconds, `SIGKILL` after a 30-second
   configurable delay, max 300, then a named route past the max. A developer
   can write correct shutdown handling from the page alone.
8. **Reclassify your own misleading UI verb, in public.** "On Render, a service
   restart is actually a special form of manual deploy" — then name the exact
   wrong expectation it creates ("restarting does *not* incorporate those
   changes"). Apply wherever a familiar word means something narrower in your
   product.
9. **Use a different verb for each severity of "not running", and define each.**
   `spins down` (minutes, automatic) / `suspends` (a month, quota) /
   `disables` (builds only, service keeps serving) / `expires` (locked out) /
   `deletes` (irreversible). Five words, five consequences, no overlap.
10. **Disclose a default change with its exact date and both cohorts.**
    `Wait` is default for workspaces created on or after `2025-07-14`;
    `Override` before. Plus the recommendation and its reason.
11. **Name the billables a customer would assume are free.** Preview
    environments and HA replicas consume paid compute, stated in the billing
    table. Naming the surprise *is* the disclosure.
12. **Answer the fear the customer hasn't articulated.** "Render does *not*
    bill for bandwidth usage incurred from a DDoS attack." One sentence in the
    metered-charge row.
13. **Put included amount and overage rate in the same cell.**
    `5 GB included per month / then $0.15 per GB`, repeated ~8 times. The
    marginal rate is never a second lookup.
14. **Make the compliance upcharge a table value, not a "contact sales".**
    `HIPAA BAA` → "20% compute premium for enabled workspaces".
15. **Write the decision tree as dialogue, with reasons on the "no" branches.**
    `No, I'll use a framework like Celery or Sidekiq.` / `Yes!` — declining
    needs a reason, accepting does not. Condition: only works where the reader
    can self-identify; and it must be marked up accessibly, which Render's
    is not.
16. **Encode the user's contradiction in the FAQ question.**
    `My app runs fine locally. Why does it fail to deploy?` Two sentences:
    their evidence, then their grievance. Better than "Troubleshooting
    deployment failures".

## Caveats & gaps

- **`render.com/security` (the "Trust center") was not fetched.** Compliance
  claims in this file come from the pricing feature matrix and the home-page
  security grid, so the certification list is second-hand. Any claim about
  scope, auditor, or report availability should be re-verified there before
  use. This is the top gap.
- **The `Shared responsibility model`, `Pentest policy`, `HIPAA on Render`, and
  `certifications-compliance` docs pages were not opened** — all four would
  materially deepen T10, and the shared-responsibility boundary in particular
  is the comparison point against Supabase's two-sentence version.
- **Incident vocabulary is thin because there was almost nothing to observe.**
  One incident in 90 days, twelve minutes long, five boilerplate updates. The
  T9 finding (that Render's incident bodies carry no customer-specific
  information) is drawn from a **single sample** and should be checked against
  `status.render.com/history` before being treated as a pattern. Severity
  labels beyond the component legend, maintenance-notice copy, and
  postmortem practice are all `[absent]`.
- **All dashboard UI is post-auth.** Field labels, dropdown items, and button
  text in T5 and T6 are `[documented]` from docs prose — unusually well
  documented, but still not observed. Strings visible only inside the ~20
  screenshots (status chips, empty states, error banners, the log explorer's
  own UI) are unharvested.
- **The spin-up loading page shown to end users was not captured** and its copy
  is not guessed. It is the most-seen Render-authored screen on the free tier
  and the highest-value missing string in this file.
- Deploy-failure, usage-warning, and free-database-expiry **email copy is
  `[absent]`** — the docs promise the notifications and describe their timing
  but never quote them.
- **Deploy states may be incomplete.** `Live` and `Failed` are observed;
  `in progress`, `waiting`, `cancelled`, `skipped` appear only in prose, and
  the canonical enum (from `api-docs.render.com` or the `Deploys` page) was not
  retrieved. There may be states this file does not list.
- `render.com/docs` (the docs home, which carries the framework quickstarts
  referenced as `#quickstarts`) was not fetched, so the quickstart inventory
  and its scope lines are unharvested — the direct comparison point against
  Supabase's 20 bespoke framework lines.
- The `Migrate from Heroku` / `Migrate from Railway` guides and the three
  comparison pages (`render-vs-heroku`, `render-vs-vercel`,
  `render-vs-railway`) were not opened. For a product whose nav, footer, docs
  sidebar, and sitewide banner are all about displacement, that competitive
  copy is a notable omission from this pass.
- `maintenance-mode`, `rollbacks`, `health-checks`, and `scaling` docs were not
  opened; each would add state and notification vocabulary.
- The pricing feature matrix (~120 rows × 4 plans) was read in full but is
  summarised here selectively; individual cell values other than those quoted
  should be re-verified.
- No non-English surface exists or was found; all register claims are en-US.
- Accessibility findings are from served HTML only. The missing skip link,
  duplicated alt text, escaped entities, detached code blocks, and unstructured
  flowchart are confirmed in markup but were not tested with assistive
  technology.

## Sources

1. https://render.com/
2. https://render.com/pricing
3. https://render.com/docs/deploys
4. https://render.com/docs/troubleshooting-deploys
5. https://render.com/docs/free
6. https://render.com/docs/your-first-deploy
7. https://render.com/docs/faq
8. https://status.render.com/

No domains were blocked for this product.
