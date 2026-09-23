# 033. Railway

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Deployment platform / usage-billed PaaS with a visual infrastructure canvas |
| Primary URL | https://railway.com/ |
| Corpus rank | 033 |
| Benchmark strength (source list) | Concise deployment guidance |
| Locale / market observed | en-US only (no locale switcher on any surface) |
| Platform observed | Web (marketing), docs, in-house status page; docs source is public on GitHub |
| Regulatory posture | A `trust.railway.com` trust centre and an `Enterprise > Compliance` docs page exist but were not fetched; DPA, Acceptable Use, Enterprise Agreement, and a Bug Bounty Program are published. **Regulatory claims are therefore not recorded here** |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 9 |
| Harvest completeness | Full for the deploy state machine, terminology, and billing. Partial on incident vocabulary — the status page showed 100% uptime across 90 days with no incident text at all |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://railway.com/ | Hero, five-phase feature narrative, "Alternative to" logo rows, footer |
| Docs home | https://docs.railway.com/ | Full sidebar IA — 10 competitor comparisons, 8 migration guides |
| **Deployments reference** | https://docs.railway.com/deployments/reference | **Nine named deployment states with definitions; deployment menu; peak-hours and pause policies — richest single page** |
| The Basics | https://docs.railway.com/overview/the-basics | The object model, "In a nutshell" summary |
| Quick Start Tutorial | https://docs.railway.com/quick-start | Four deployment paths, the canvas, log-reading advice |
| **Application Failed to Respond** | https://docs.railway.com/networking/troubleshooting/application-failed-to-respond | The signature Railway error, with per-framework fixes |
| Philosophy | https://docs.railway.com/platform/philosophy | Three-stage product thesis, architecture disclosure, two flat "No" answers |
| Pricing Plans | https://docs.railway.com/pricing/plans | Five tiers, resource unit pricing, retention and deletion timelines |
| **Pricing FAQs** | https://docs.railway.com/pricing/faqs | **~20 questions, several unusually blunt about what Railway will not do** |
| Status | https://railway.instatus.com/ → https://status.railway.com | 40+ components in 6 groups; a scope disclaimer at the top |

**Note on retrieval:** five of the docs pages were fetched from Railway's
public documentation source repository
(`raw.githubusercontent.com/railwayapp/docs`) rather than the rendered
`docs.railway.com` HTML. Content is identical; the rendered URLs are the
canonical citations and are listed in Sources.

---

## T1 Navigation & IA labels

**Marketing nav — four collapsed menus plus pricing** `[observed]`

`Product` · `Developers` · `Enterprise` · `Company` · `Pricing`

All four menus are client-rendered; their contents do not appear in served
HTML. Nav sub-labels are therefore `[absent]` and the footer is standing in.

**Footer — five columns, and one is named after a behaviour** `[observed]`

| Column | Contents |
|---|---|
| `Product` | `Features` · `Mobile app` · `Pricing` · `Agents` · `Sandboxes` · `Changelog` · `Templates` · `Template kickback` |
| `Compare` | `Heroku` · `Render` · `Fly.io` · `Vercel` |
| `Contact` | `Twitter` · `GitHub` · `Email` |
| `Resources` | `Customers` · `Enterprise` · `Docs` · `Central Station` · `Blog` · `Partnerships` · `Affiliate program` |
| `Company` | `About` · `Philosophy` · `Careers` · `Shop` · `Trust` · `Logo` · `Status` |
| `Legal` | `DPA` · `Acceptable Use` · `Privacy Policy` · `Terms of Service` · `Enterprise Agreement` · `Bug Bounty Program` · `Cookie preferences` |

`Compare` as a **footer column naming four competitors** is the same move
Render makes. `Philosophy` promoted into the `Company` footer alongside
`About` and `Careers` — a documentation page treated as a corporate artefact.
`Logo` (rather than "Brand" or "Press kit") and `Shop` are Railway's
idiosyncrasies.

**A live status indicator in the footer** `[observed]`:
`All systems operational↗` rendered as a link beside the logo on every page.
The arrow glyph is inside the label. Most products link a word (`Status`);
Railway prints **the current state**, so a user never has to click to find out
nothing is wrong.

**Docs sidebar — 13 named sections, and the first two are the finding**
`[observed]`

An ungrouped starter block: `Quick start` · `The basics` ·
`Railway for Agents` · `Mobile app` · `Best practices` ·
`Advanced concepts` · `Production readiness checklist` · `Guides` ·
`Keyboard shortcuts`

Then: `Platform` · `Pricing` · `Enterprise` · `AI` ·
`Templates & open source` · `Languages & frameworks` · `CLI` · `Projects` ·
`Build & deploy` · `Data & storage` · `Networking` · `Observability` ·
`Access` · `Integrations` · `Community`

**`Pricing` is a section of the documentation with nine sub-pages** —
`Plans` · `Free trial` · `Understanding your bill` · `FAQs` · `Refunds` ·
`Cost control` · `Committed spend` · `AWS Marketplace` · `Credits`.
Railway documents its commercial model at the same depth and in the same place
as its API. `Understanding your bill`, `Refunds`, and `Cost control` as
*documentation* rather than marketing or a help centre is unusual and is the
structural expression of its usage-billing anxiety.

**`Platform > Compare to Railway` — ten competitor pages in the docs sidebar**
`[observed]`: `Compare to Heroku` · `Compare to Render` · `Compare to Fly` ·
`Compare to Northflank` · `Compare to Vercel` · `Compare to DigitalOcean` ·
`Compare to Replit` · `Compare to Lovable` · `Compare to Bolt` ·
`Compare to VPS`

Plus **eight `Migrate from…` pages**: `Heroku` · `Render` · `Fly` · `Vercel` ·
`DigitalOcean` · `Replit` · `Lovable` · `Bolt`.

**Eighteen competitive pages inside the documentation**, including two
AI-app-builders (`Lovable`, `Bolt`) and one non-product (`Compare to VPS`).
The grouping label is `Compare to Railway` — phrased from the *reader's*
direction of travel, so the reader is the one doing the comparing.

Note the **name inversion between the two groups**: `Compare to Heroku`
(Railway is the implicit subject) but `Migrate from Heroku` (the reader is).
Two perspectives, adjacent in one sidebar.

**Troubleshooting is distributed, not centralised** `[observed]` — four
separate `Troubleshooting` sub-groups, one per section:

| Section | Troubleshooting entries |
|---|---|
| `Build & deploy` | `Slow deployments` · `NodeJS SIGTERM handling` · `No start command could be found` |
| `Data & storage` | `Recover PostgreSQL from corrupted WAL` · `ENOTFOUND redis.railway.internal` |
| `Networking` | `SSL` · `Network diagnostics` · `Application failed to respond` · `405 method not allowed` |
| `Integrations > OAuth` | `Troubleshooting` |

**Failure content lives beside the feature it belongs to**, not in a
troubleshooting silo. Eleven entries total — an order of magnitude smaller
than Supabase's index, and the direct consequence of Railway's "concise" house
style. Three entries are the **literal error string as the title**
(`ENOTFOUND redis.railway.internal`, `No start command could be found`,
`405 method not allowed`).

**Per-page docs furniture** `[observed]`: `Search...` · `Changelog` ·
`Central Station` · `Go to Railway` · breadcrumb · `On this page` ·
`Previous<title>` / `Next<title>` · `Ask AI about this page` · `Copy page` ·
`Open in ChatGPT` · `Open in Claude` · `Open in Cursor` ·
`Deploy with Railway` · `Edit this page on GitHub`.

**Three named AI assistants as per-page CTAs**, plus `Deploy with Railway` —
a button that takes the reader from *reading about* a thing to *provisioning*
it, with the current doc path passed as a query parameter
(`railway.com/new?doc=%2Fdeployments%2Freference`). **The documentation is a
deploy surface.**

**Prev/Next labels are rendered without separators** `[observed]`:
`PreviousScaling` and `NextSlow deployments` — a template defect that
linearises as one word.

## T2 Value proposition & headline patterns

**Hero — two lines, and the noun is emotional** `[observed]`

> Headline: `Ship software peacefully`
> Sub: "With the all-in-one [intelligent] cloud provider"
> CTAs: `Deploy →` · `Agents`

**`peacefully` is the most unusual word in this entire batch.** Every other
product in the set promises speed (`fastest path from idea to production`),
scale (`Build in a weekend / Scale to millions`), or absence of work
(`zero ops`). Railway promises **an emotional state**. The adverb does the
positioning: it implies the alternative is stressful without naming a
competitor, and it is the only hero in this corpus that addresses how
deploying *feels*.

The page title and `og:title` say something different —
`Railway | The all-in-one intelligent cloud provider` — so the **SEO headline
and the visual headline are two different propositions**, one categorical and
one emotional.

**The five-phase narrative is the page's structure** `[observed]`

The hero interactive is labelled with five verbs:
`Deploy` · `Network` · `Scale` · `Monitor` · `Evolve`

and the five content sections carry the same five phases as
**verb-pair eyebrows** above their headlines:

| Eyebrow | Headline |
|---|---|
| `Build and deploy` | `Deploy anything without the complexity` |
| `Network and connect` | `Instant networking. Zero setup.` |
| `Scale and grow` | `Grow big without the growing pains` |
| `Monitor and observe` | `Logs, metrics, and alerts in one place. Clarity without the chaos.` |
| `Evolve and collaborate` | `Finally, a development workflow that actually flows.` |

**Five eyebrows, each a pair of near-synonymous verbs** (`Build and deploy`,
`Network and connect`, `Scale and grow`, `Monitor and observe`,
`Evolve and collaborate`). The second verb in each pair adds nothing
semantically — it is rhythm. Consistent and slightly padded.

**Four of five headlines are built on `X without the Y`**:
`without the complexity` · `without the growing pains` ·
`without the chaos` · (and `Zero setup.`). The negated noun escalates from
mechanical (`complexity`, `setup`) to bodily (`growing pains`) to emotional
(`chaos`) — the same register gradient as `peacefully`.

`Finally, a development workflow that actually flows.` is the outlier:
**`Finally` and `actually` are both exasperation markers**, positioning the
reader as someone who has been let down before. It is the most conversational
headline in the batch.

**"Alternative to" logo rows — the most aggressive positioning device here**
`[observed]`

Each of the five sections ends with the label `Alternative to` and a row of
competitor/tool logos:

| Section | Named alternatives |
|---|---|
| Build and deploy | `Docker` · `Helm` · `Heroku` · `DigitalOcean` · `Cloud Run` |
| Network and connect | `Envoy` · `Cilium` · `Nginx` · `Istio` · `HAProxy` |
| Scale and grow | `Kubernetes` · `Amazon ECS` · `Nomad` · `Better Stack` |
| Monitor and observe | `Datadog` · `Sentry` · `OpenTelemetry` |
| Evolve and collaborate | `Terraform` · `Spacelift` |

**Nineteen named tools Railway claims to replace, on the home page, grouped by
the job they do.** Two words of copy (`Alternative to`) doing the work of a
comparison table. Note that three of the five rows name **open-source
infrastructure components** (Nginx, Envoy, Kubernetes, Terraform) rather than
commercial competitors — Railway is positioning against *the assembly job*,
not against vendors. That is a sharper argument and a defensible one.

**Feature bullets are three-per-section, each a claim plus a mechanism**
`[observed]`

- `See your infrastructure` — "Craft on a visual canvas that makes your entire
  stack visible at a glance."
- `Correct config. All the time` — "Railway reads your code and sets the right
  settings, automatically."
- `Edit anything in context` — "Modify settings directly from the canvas.
  **YAML optional.**"
- `Private, fast connections by default` — "100 Gbps internal networking
  without VPC configuration."
- `Protocol detection built-in` — "HTTP, TCP, gRPC, WebSockets handled
  automatically."
- `Alerts that reach you` — "Slack, Discord, or emails the moment conditions
  you specify are met."
- `Preview every PR` — "Every pull request gets its own preview. **No
  surprises after merge.**"
- `Undo mistakes in seconds` — "Rollback to any previous version instantly
  when something breaks."

**`YAML optional.`** is two words and is the whole anti-config argument.
`Correct config. All the time` has **no full stop after the second fragment**,
unlike its siblings — a punctuation inconsistency in a three-item list.

**Closing CTA is a railway pun** `[observed]`:
`A better future is / now boarding` → "Deploy your first project today" →
`All Aboard`. See T13 — the transport metaphor is systematic.

**Social proof is two-layered**: three named-CTO testimonials with **specific
operational numbers** ("1,500+ requests per second… fulfilled in under 50
milliseconds"; "Services that took 1 week to configure elsewhere take 1 day to
spin up"), then six verbatim tweets reproduced **with their original
lowercase, typos, and profanity-adjacent enthusiasm** ("Real talk, i'm love
with @Railway", "i love how railway makes it super easy"). Railway publishes
`i'm love with` unedited — the same unedited-quote credibility device as
Supabase.

One quoted tweet is doing disclosure work Railway could not say itself:
"really gotta commend @Railway for allowing hard spending limits, I have never,
ever seen this with any cloud provider. It's so refreshing to use a platform
that isn't trying to extract maximal dollars from my wallet." **The billing
guarantee is delivered as someone else's testimony.**

**A live counter block that renders as zeros** `[observed]`:
`## 0+ deploys per month (and counting)` and
`Users 0000000, Services 000000000, Deployments 000000000, Requests
00000000000000, Logs 00000000000000`. A client-hydrated odometer whose static
fallback is a row of zeros — **the headline literally reads "0+ deploys per
month"** to any non-JS reader, crawler, or screen reader. A real defect on the
primary marketing page, and the second instance in this batch (after Render's
trailing-comma list) of an animated device with no graceful fallback.

**Docs home headline** `[observed]`: `Railway Documentation` — "Railway is an
all-in-one intelligent cloud provider that makes it easy to provision
infrastructure, develop locally, and deploy to the cloud." Three verbs, in
lifecycle order, matching the Philosophy page's three stages.

**Quick Start closing line** `[observed]`:
"Railway aims to be the simplest way to **develop, deploy, and diagnose
issues** with your application." — the third verb is the unusual one, and it is
load-bearing (see T7, T13).

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Deploy →` | Hero, primary | Arrow inside the label; goes to `/new` |
| `Agents` | Hero, secondary | A bare product noun as the second CTA |
| `All Aboard` | Closing CTA block | Railway pun; goes to `/new` |
| `Learn more →` | Five feature sections | **The one product in this batch that ships a bare `Learn more`** — five times, each to a different `#anchor` on `/features` |
| `Read customer stories →` | Social proof | |
| `Join 2M+ developers building with Railway →` | Social proof | Number inside the CTA |
| `Download now →` | Mobile app banner | |
| `Deploy with Railway` | **Every docs page** | Passes the current doc path as a query param |
| `Ask AI about this page` | Every docs page | |
| `Copy page` | Every docs page | Markdown export |
| `Open in ChatGPT` / `Open in Claude` / `Open in Cursor` | Every docs page | **Three named assistants** |
| `Edit this page on GitHub` | Every docs page | |
| `Go to Railway` | Docs header | |
| `Central Station` | Docs header and footer | The support hub, named not described |
| `Changelog` | Docs header | |
| `Upload your current invoice` | Pricing docs | **Upload a competitor's bill to get a comparison** |
| `Click here to book some time with us` | Philosophy page | Full-sentence CTA with a `cal.com` link |
| `New Project` | Dashboard | `[documented]` |
| `Deploy Now` / `Add variables` | Post-repo-selection choice | `[documented]` — see T4 |
| `Add a Service` | Empty project canvas | `[documented]` |
| `Deploy` | Service creation | `[documented]` |
| `Generate Domain` | Service settings | `[documented]` |
| `View logs` / `Restart` / `Redeploy` / `Rollback` / `Remove` / `Abort` | Deployment 3-dot menu | `[documented]` — see T6 |
| `Create a backup` / `Delete a backup` / `Lock a backup` / `Restore` / `Edit schedule` | Backups tab | `[documented]` |
| `Wipe Volume` | Volume settings | `[documented]` — "wipes all data in the volume and then redeploys the connected service" |
| `Cancel Plan` | Billing page | `[documented]` |
| `Re-issue` | Invoice gear menu | `[documented]` |
| `Delete` | Payment method section | `[documented]` |
| `Subscribe` | Status page | |
| `Log in` | Status page | |
| `Overview` / `Edge Network` / `History` | Status page tabs | |
| `All systems operational↗` | Sitewide footer | State as link text |

**Observation.** Railway is the **only product in this batch that ships a bare
`Learn more`**, and it does so five times on one page. Against that, it ships
the most context-specific CTA in the batch (`Deploy with Railway` on every docs
page, carrying the reader's location). And `Upload your current invoice` is a
CTA that asks for a competitor's document — an aggressive, specific, and
memorable acquisition ask.

`Deploy Now` vs `Add variables` (see T4) is the best-designed pair here: two
buttons at the same decision point, one of which defers the deploy.

## T4 Onboarding & getting-started

**Four deployment paths, enumerated before any instruction** `[observed]`

The Quick Start opens by naming its own scope:

> "**This guide covers two different topics to get you quickly started with the
> platform -**
> 1. **Deploying your project** — Bring your code and let Railway handle the rest.
>    **Option 1** — Deploying from **GitHub**.
>    **Option 2** — Deploying with the **CLI**.
>    **Option 3** — Deploying from a **Docker Image**.
> 2. **Deploying a template** — Ideal for deploying pre-configured software with
>    minimal effort."

**Two topics, three options inside the first, each with a one-line "when to
use".** The reader picks a branch before reading anything. And the guide names
its own worked examples up front ("this guide uses a basic NextJS app that was
prepared for this guide"; "the Umami template"), so the reader knows what they
are about to see.

**The onboarding decision that is worth stealing** `[observed]`

After selecting a repo, the user is offered two buttons and the docs explain
both *before* recommending one:

> "Choose either **Deploy Now** or **Add variables**.
> **Deploy Now** will immediately start to build and deploy your selected repo.
> **Add Variables** will bring you to your service and ask you to add variables,
> when done you will need to click the **Deploy** button at the top of your
> canvas to initiate the first deployment.
> *For brevity, choose **Deploy Now**.*"

Two things. The product offers a **"configure first" fork at the moment of
first deploy**, so a user with secrets is not forced into a failed build. And
the tutorial states *why* it is choosing one — "For brevity" — in italics,
rather than silently picking. **Naming the tutorial's own bias** is a small,
honest move.

**Failure is addressed in the tutorial, with a technique rather than a link**
`[observed]`

> "If anything fails during this time, you can explore your build or deploy
> logs for clues. **A helpful tip is to scroll through the entire log; important
> details are often missed, and the actual error is rarely at the bottom!**"

This is the single most useful sentence in Railway's onboarding. It is not
"see troubleshooting" — it is a **specific, counter-intuitive reading
technique** for the artefact the user is about to stare at, delivered at the
moment of failure. Compare Render's "searching the log explorer for the word
`error`". Both products teach log-reading; Railway's version corrects a
mistaken assumption ("the actual error is rarely at the bottom").

Followed immediately by the escalation: "If you're stuck don't hesitate to open
a **Help Thread**."

**Guidance embedded as `Hint:` lines** `[observed]`, in the template path:

> "*Hint: If your desired template isn't found feel free to reach out to the
> community.*"
> "*Hint: Generally it's best to choose the template with a combined higher
> deployment and success count.*"

The second is a **selection heuristic for a marketplace**, given by the
marketplace owner — it tells the reader how to judge third-party content using
Railway's own metrics. `success count` as a published template signal is a
small, strong trust mechanic.

**The destination is named and given a metaphor** `[observed]`:
all four paths converge on `The canvas`, described as
"This is your *mission control*. Your project's infrastructure, environments,
and deployments are all controlled from here." Italicised, and the only
metaphor in the tutorial that is not a train.

**Completion copy** `[observed]`:
"And that's it! 🎉 Your project is now ready for use." ·
"That's it, deploying a template is as easy as a few clicks!" ·
"Happy Building!" Three closings, one emoji.

**`What to explore next` — four named follow-ons**, each with a scope line:
`Environments` ("parallel, identical environments for PRs/testing") ·
`Observability Dashboard` · `Project Members` ("as easy as sending them an
invite link") · `Staged Changes`.

**`The Basics` opens with a summary called `In a nutshell`** `[observed]` — a
**nested bullet list of the entire object model before any prose**, with each
term given a one-line gloss:

> - **Dashboard** — Main entrypoint for all projects under your account.
> - **Project** — A collection of services under the same network.
> - **Service** — A target for a deployment source (e.g. Web Application).
> - **Deployment** — Built and deliverable unit of a service.
> - **Volumes** — Persistent storage solution for services.

Plus four indented sub-objects (`Project Settings`, `Service Variables`,
`Backups`, `Service Metrics`, `Service Settings`, `Volume Metrics`,
`Volume Settings`).

**Five nouns, each defined in under ten words, with the containment hierarchy
shown by indentation.** A reader gets the whole data model in fifteen seconds
before deciding how deep to go. This is the cleanest conceptual-onboarding
artefact in the batch after Heroku's `Terminology:` callouts — and unlike
Heroku's it is *up front and compressed* rather than progressive.

**A four-rung learning ladder, named in the sidebar** `[observed]`:
`Quick start` → `The basics` → `Advanced concepts` →
`Production readiness checklist`, with `Best practices` alongside. The
Basics page ends by naming the next rung explicitly: "If you want to go deeper,
click the Next button below to head to the next section — **Advanced
Concepts**."

## T5 Form & field labels

`[documented]` — the dashboard is post-auth; the docs name its fields.

**Service settings** `[documented]`

| Field | Documented purpose |
|---|---|
| `Source` | "the deployment source, which can be either a GitHub repository with a specific branch or an image with optional credentials" |
| `Networking` | "Generate a Railway-provided domain or add your own custom one" |
| `Custom Build Command` | "configure a custom build command **if you need to overwrite the default**" |
| `Custom Start Command` | "configure a custom start command if you need to overwrite the default" |
| `Image name` | Docker path; example value `blueriver/nextjs` |
| Target port | On a domain; the field that causes the signature error (T7) |

**Both command fields are prefixed `Custom` and both hints say "if you need to
overwrite the default".** The field label itself signals that leaving it empty
is the normal case — a labelling choice that lowers the perceived obligation of
a form. Compare Render, where `Build Command` and `Start Command` are
unprefixed and required-looking.

**Project settings** `[documented]`: `Transfer Project` · `Environments` ·
`Members` · **`Danger`** — "Remove individual services or delete the entire
project." A settings group named `Danger` (not "Danger zone", not "Advanced").

**Volume settings** `[documented]`: `Mount path` ("The absolute path where the
volume will be mounted within the deployed service") · `Volume Size`
("Displays the current volume capacity and offers the option to expand it **if
your plan permits**") · `Wipe Volume` ("This action wipes all data in the
volume **and then redeploys the connected service**").

`Wipe Volume` states the *second-order* consequence — the redeploy — which is
the part a user would not predict.

**Backups tab actions** `[documented]`: `Create a backup` ("with a press of a
button") · `Delete a backup` · **`Lock a backup`** ("Prevent a backup from
being deleted") · `Restore` · `Edit schedule`.

`Lock a backup` is a named guard against your own destructive action,
surfaced as a peer of delete in the same 3-dot menu.

**Billing form fields** `[documented]`: `Payment Method` · `Billing Email` ·
`Billing Address` · `Tax ID / VAT number` · `Billing Info` (section) ·
`Billing History` (section) · `Active Plan` (section).

**Configuration variables exposed as named tuning knobs** `[observed]`:
`RAILWAY_DEPLOYMENT_OVERLAP_SECONDS` ("The time from when a new deployment
becomes `Active` until the previous deployment is removed") ·
`RAILWAY_DEPLOYMENT_DRAINING_SECONDS` (graceful-shutdown window) · `PORT`
(auto-injected).

Both timing knobs are **named after the interval they control in seconds**, and
both are documented at the point where the behaviour is explained rather than
only in a variables reference.

## T6 Status & state language

The strongest category for this product, and the clearest deployment state
machine in the batch.

**Nine named deployment states, each with its own definition and anchor**
`[observed]`

| State | Definition (verbatim or near-verbatim) |
|---|---|
| `Initializing` | "Every Deployment in Railway begins as `Initializing` — once it has been accepted into Railway's build queue, the status will change to `Building`." |
| `Building` | "Railway will attempt to create a deployable Docker image containing your code and configuration" |
| `Deploying` | "Once the build succeeds, Railway will attempt to deploy your image… If a healthcheck is configured, Railway will wait for it to succeed before proceeding" |
| `Failed` | "If an error occurs during the build **or** deploy process, the Deployment will stop and the status will become `Failed`." |
| `Active` | Conditional: "If the deployment **has** a healthcheck configured, Railway will mark the deployment as `Active` when the healthcheck succeeds. If the deployment **does not** have a healthcheck configured, Railway will mark the deployment as `Active` after starting the container." |
| `Completed` | "the status of the Deployment when the running app exits with a **zero exit code**" |
| `Crashed` | "A Deployment will remain in the `Active` state unless it crashes, at which point it will become `Crashed`." |
| `Removing` | Transitional — "first having their status updated to `Removing` before they are finally `Removed`" |
| `Removed` | Terminal |

Five things worth extracting.

**1. Every definition names its transition, not just its condition.**
`Initializing` says what changes it to `Building`; `Active` says what causes
it; `Crashed` is defined relative to `Active`. The reader learns the graph, not
a glossary.

**2. `Active` has a conditional definition, and the condition is a user
choice.** Whether `Active` means "healthcheck passed" or "container started"
depends on whether the user configured a healthcheck — **and Railway writes
both branches rather than picking the flattering one.** This is the single most
honest state definition in the batch: it tells the user that `Active` means
less than they think if they skipped a step.

**3. `Completed` vs `Crashed` is the zero-exit-code distinction, named.** A
long-running service that exits cleanly is `Completed`, not `Failed`. Most
platforms collapse "stopped on purpose" and "stopped by accident"; Railway
separates them on the exit code and says so.

**4. `Removing` exists as a distinct transitional state.** Teardown gets its
own word, so a user watching a list sees the intermediate rather than a
flicker.

**5. The docs point at the machine-readable source of truth** `[observed]`:
"A comprehensive up to date list of statues can be found in Railway's GraphQL
playground under `DeploymentStatus`". **The prose defers to the schema and
admits it may lag** — with a link and a screenshot. (`statues` is a typo for
`statuses`, in the first sentence of the section.)

**Deployment menu — six actions, with their state-dependence stated**
`[observed]`

`View logs` · `Restart` · `Redeploy` · `Rollback` · `Remove` · `Abort`

Prefaced by: "**Note:** Some actions are only available on certain deployment
states." Each is defined by what it *does to which state*:

- `View logs` — "during build the build logs will be shown, during deploy the
  deploy logs will be shown" — **one button, two destinations, chosen by state**
- `Restart` — "Restarts the process within the deployment's container, this is
  often used to bring a service back online after a crash **or if you
  application has locked up**" (sic — "you application")
- `Redeploy` — and then a **four-item list of the situations it fixes**:
  "A crash. / A usage limit has been reached and raised. / Upgrading to Hobby
  when trial credits were previously depleted. / Being demoted from Hobby to
  free and then upgrading again." Three of the four are *billing* recoveries
- `Rollback` — same one-line definition as `Redeploy` ("Redeploys the selected
  deployment"), which is a **documentation defect**: two menu items with
  identical definitions and no stated difference. The distinction only emerges
  in the Plans page (rollback restores the retained *image*; redeploy
  *rebuilds* from source)
- `Remove` — "Stops the currently running deployment, this also marks the
  deployment as `REMOVED` and moves it into the history section"
- `Abort` — "Cancels the selected initializing or building deployment, this
  also marks the deployment as `REMOVED`"

**`Remove` and `Abort` are two verbs for the same state transition,
distinguished by which state you are in** — you `Abort` something that hasn't
started and `Remove` something that has. Both land in `REMOVED`.

Note the **casing shift**: the state section uses `Removed`; the menu section
uses `REMOVED`. Title case in prose, SCREAMING_SNAKE in the action
descriptions, for one value.

**Singleton-deploy model, stated as a default and a consequence** `[observed]`

> "By default, Railway maintains only one deploy per service. In practice, this
> means that if you trigger a new deploy… the old version will be stopped and
> removed **with a slight overlap for zero downtime**."
> "Once the new deployment is online, the old deployment is sent a `SIGTERM`
> signal. By default, it is given **0 seconds** to gracefully shutdown before
> being forcefully stopped with a `SIGKILL`. **We do not send any other signals
> under any circumstances.**"

Two disclosures most platforms would soften. **The default graceful-shutdown
window is zero seconds** — stated plainly, with the knob to change it named in
the next sentence. And "We do not send any other signals under any
circumstances" is an **absolute negative commitment** about platform behaviour,
which is rarer and more useful than a list of what it does send.

**Railway-initiated deployments — the platform acting on your service,
disclosed with three causes** `[observed]`

> "Occasionally, Railway will initiate a new deployment to migrate your service
> from one host to another. This may happen for one of three reasons:
> 1. At your plan tier, such as Trial or Hobby, you may be pre-emptively moved
>    to a different host to help us optimize workload distribution.
> 2. A host requires security or performance updates… **We provide advance
>    warning for these events.**
> 3. A host has a fault and we migrate workloads off the machine…"
> "During platform-wide upgrades, your service might be redeployed multiple
> times… **These deployments are mandatory and cannot be opted out of.**"
> "These Railway-initiated deployments will display with a **banner above the
> Active deployment** to clearly identify them."

Reason 1 names **tier-based deprioritisation as a cause of your service being
moved** — an unflattering fact about what you get for free. And the UI
consequence (a banner) is documented, so a user seeing a deploy they did not
trigger can identify it. **A "this wasn't you" affordance for an unexplained
state change** is a pattern worth naming.

**Free-tier peak-hours restriction, published as a table** `[observed]`

| Region | Timezone | Peak Hours |
|---|---|---|
| `US West` | America/Los_Angeles | `8 AM – 8 PM PT` |
| `US East` | America/New_York | `8 AM – 8 PM ET` |
| `EU West` | Europe/Amsterdam | `8 AM – 8 PM CET` |
| `Southeast Asia` | Asia/Singapore | `8 AM – 8 PM SGT` |

"During these windows, **deploys from free-tier users to the affected region
will be rejected.** You will see an error message indicating the restriction
and the region's timezone."

Then `Options during peak hours`:
> "**Wait** — deploy outside of peak hours for your target region.
> **Upgrade** — upgrade to the Hobby plan or above to remove the restriction
> entirely."

**A twelve-hour daily blackout for free users, published as a schedule with
timezones, plus a two-option recovery where one option is "pay".** Blunt, and
far better than an unexplained failure. The error message itself is
`[absent]` — the docs describe it ("indicating the restriction and the
region's timezone") without quoting it.

**`Deployments paused - limited access` — capacity rationing, disclosed**
`[observed]`

> "Railway takes the stance that **Pro/Enterprise tiers may, in rare occasions,
> be prioritized above Free/Hobby tiers.** During periods where Pro/Enterprise
> users require additional resources, Railway may temporarily suspend resource
> allocation, including builds, to Free, and more rarely Hobby, customers."

Then three sub-sections with parallel bullet structure:

`During a pause`:
- "You'll see a **'Limited Access'** indicator in your dashboard"
- "New deployments will be **queued** rather than immediately processed"
- "**All other Railway features remain fully functional**"
- "**No data or existing deployments are affected**"

`Continue deploying during high traffic`: upgrade to Pro to bypass the queue.

`When normal operations resume`:
- "Queued deployments will automatically process in order"
- "You'll receive a notification when deployment capabilities are restored"
- "**No action is required on your part**"

**This is the best-structured degradation disclosure in the batch.** Four
beats: the policy and its rationale; what you will see and what is *not*
affected (two of four bullets are reassurance); the paid escape; and what
happens when it ends, closing with "No action is required on your part". Every
question a user in that state would ask, in order, with the scary ones
answered by negation. `Limited Access` is the in-product indicator label,
quoted.

**Status page — 40+ components in 6 groups, with regional replication**
`[observed]`

Global: `Dashboard — railway.com` · `API — backboard.railway.com` ·
`Support & Community — station.railway.com` · `Dev Studio — dev.new`

`Observability`: `Logs` · `Metrics`
`Domains`: `Registration` · `Provisioning`
`Authentication`: `Login — GitHub` · `Login — Google` · `Login — Emails` ·
`Login — Railway OAuth`
`Payments & Billing`

Then the same **eight-component block per region** for
`US East (Virginia, USA)`, `US West (California, USA)`,
`EU West (Amsterdam, Netherlands)`, `Southeast Asia (Singapore)`:
`Builds` · `Deployments` · `Compute` · `Storage Buckets` ·
`Networking — Public` · `Networking — Private` ·
`Networking — Outbound Static IPs` · `Sandboxes`

And `External & Third-Party Integrations`: `GitHub — Auto-Deploys` ·
`Image Registry — Dockerhub` · `Image Registry — GitHub (GHCR)` ·
`Package Registry — npm`

Three findings. **Components are named `<Function> — <hostname>`**
(`API — backboard.railway.com`, `Dev Studio — dev.new`) so a user who sees a
hostname in a stack trace can map it to a status row. **Authentication is
decomposed by identity provider** — four separate `Login — X` rows, so a Google
outage is visibly a Google outage. And **Railway monitors four third-party
dependencies it does not own** (`Dockerhub`, `GHCR`, `npm`, GitHub
auto-deploys), which is a genuine service to the user: most build failures
during an npm outage are reported to the platform.

Regions are named with **both the code and the human place**
(`US East (Virginia, USA)`) — the ambiguity Supabase's status page has (region
codes above, city names below) does not exist here.

**Status states observed** `[observed]`: `Fully Operational` (overall) ·
`Operational` (per component). No degraded, partial, or outage states were
visible because every component showed `100.00% uptime` over 90 days, except
`US East`, `US West`, and both `Networking — Public` rows at `99.80%` (a
July dip to `99.42%`) — **with no incident text attached to it.**

**A scope disclaimer at the top of the status page** `[observed]`:

> "This status page reports incidents with **significant, widespread user
> impact. Smaller or isolated issues won't show up here.** If you are
> experiencing an issue, please report it at station.railway.com."

**Railway states the threshold for what appears on its status page, and routes
the sub-threshold case.** This is honest and also self-protective, and it is
the right disclosure for a page showing 100% uptime. Compare Docker's
"We're not aware of any issues" — both bound the claim, Railway's by *scope*
and Docker's by *knowledge*.

**A nav tab called `Edge Network`** sits beside `Overview` and `History` — a
separate status surface for the routing layer.

## T7 Error, failure & recovery

Railway has **no error-code taxonomy** and the smallest troubleshooting corpus
in this batch — eleven entries, distributed across four sections. That is the
direct expression of "concise deployment guidance", and it has both a clear
strength and a clear cost.

**The signature error: `Application Failed to Respond`** `[observed]`

This is Railway's equivalent of Heroku's H10 — the one error every user sees —
and it gets a page with a fixed four-part shape:

`What this error means` → `Why this error can occur` → `Possible solutions`
→ per-framework code

> **What this error means:** "Seeing that your application failed to respond
> means that Railway's Edge Proxy cannot communicate with your application,
> causing your request to fail with a **502 (Bad Gateway)** status code."

One sentence: who could not talk to whom, and the status code the user is
holding. **`Railway's Edge Proxy` is named as the failing party** rather than
"an error occurred" — the user learns which component is reporting.

> **Why this error can occur:** "There are a few reasons… **the most common
> being** that your application is not listening on the correct host or port.
> **Another common reason** is that your target port is set to an incorrect
> value. **In some far less common cases** this error can also occur if your
> application is under heavy load."

**Three causes, explicitly ranked by frequency** — "the most common", "another
common", "in some far less common cases". The reader knows where to look
first. This frequency-ordering is the most transferable thing on the page and
almost nothing does it.

The solutions section opens with a conditional that most troubleshooting pages
omit: "**The correct solution depends on the cause of the error.**" Then one
sub-section per cause, in the same order.

The target-port fix includes a **worked wrong-and-right example from a
screenshot**: "In the screenshot above, the domain was previously incorrectly
configured with port 3000, when the application was actually listening on port
8080." Concrete numbers, not "ensure the ports match".

The host/port fix states the rule in two bullets —
"Host = `0.0.0.0`" / "Port = Value of the `PORT` environment variable provided
by Railway" — and then gives **six framework-specific code fixes**:
`Node / Express` · `Node / Nest` · `Node / next` · `Python / gunicorn` ·
`Python / uvicorn` · `Go / net/http`.

Two of these are notable. `gunicorn` gets the answer "**listens on `0.0.0.0`
and the `PORT` environment variable by default**" — i.e. *nothing to do*, which
is the most useful possible answer and is written as its own entry rather than
omitted. And `uvicorn` gets "needs additional configuration flags", with them.
**Railway documents which frameworks are already correct**, not only which need
fixing.

The heavy-load cause ends with a **diagnostic threshold**: "if you are running
a Node.js application, and see that your vCPU usage has peaked at any point to
around 1 vCPU, this is a good indication that your application is under heavy
load **given Node's single-threaded nature**." A number, a place to look
(`Metrics` tab), and the reason the number means something.

**The eleven troubleshooting entries, by title** `[observed]`

| Section | Title | Shape |
|---|---|---|
| Deploy | `Slow deployments` | Symptom |
| Deploy | `NodeJS SIGTERM handling` | Topic |
| Deploy | `No start command could be found` | **Literal error string** |
| Data | `Recover PostgreSQL from corrupted WAL` | `Recover X from Y` |
| Data | `ENOTFOUND redis.railway.internal` | **Literal error string, including the hostname** |
| Network | `SSL` | Bare noun |
| Network | `Network diagnostics` | Topic |
| Network | `Application failed to respond` | **The user-visible page title** |
| Network | `405 method not allowed` | **HTTP status + literal message** |
| OAuth | `Troubleshooting` | Generic |

**Four of ten titles are the exact string the user is holding**, including one
that contains an internal hostname (`redis.railway.internal`). That is the
right optimisation for search — a user pastes the error and lands.

**The cost of concision, recorded as a negative finding.** Eleven entries is
very few for a platform of this scope. There is no entry for build failures
generally, no entry for OOM, no entry for crashed deployments, no entry for
healthcheck failures, no entry for volume exhaustion, and — despite `Failed`
and `Crashed` being two of nine named states — **no troubleshooting page for
either state**. A user whose deployment says `Crashed` has the state
definition and nothing else. Railway's answer to this is the community
(see T11), which is a real strategy but leaves the documented corpus thin.

**Recovery is routed through the deployment menu, and the menu documents its
own use cases** `[observed]` — the `Redeploy` entry's four-situation list
(T6) is effectively a mini troubleshooting index living inside a UI reference.
Three of its four situations are billing states, which tells you where
Railway's failure volume actually is.

**Billing failure has the most thorough recovery documentation** `[observed]`

`My services were stopped, what do I do?` is answered as a **four-cause table
with a solution per cause**:

- "**Usage limits reached:** You've hit your usage limits. Increase your usage
  limit, remove it entirely, or wait for the usage limit to reset."
- "**Trial credits exhausted:** You've run out of trial credits. Consider
  upgrading to a paid plan"
- "**Failed payment:** Your payment method has failed. Update your payment
  method and pay your outstanding invoice."
- "**Unpaid invoice:** You have an outstanding invoice."

Then the automatic recovery and its window:
> "Railway will **automatically redeploy your services once the underlying
> issue is resolved**, as long as it is resolved **within a period of 30 days**.
> After that, you will have to redeploy them manually from the Removed
> deployment's 3-dot menu."
> "**Note:** Although Railway will remove your deployment for any of the above
> reasons, Railway will **not** remove the volume attached to the service."

**Cause → action → automatic recovery → the deadline on that automation → what
is preserved regardless.** The volume note is the reassurance a panicking user
needs and it is placed last, as a `Note`. This is better written than any of
the technical troubleshooting pages, which says something about where the
support load is.

**The payment-failure sequence is narrated as escalating steps** `[observed]`:
"we retry the payment method on file **over several days**. We also inform you
of the payment failure… If payment continues to fail, we **flag your services
to be stopped and send you a warning**. If we do not receive payment, your
services are **stopped** until all open invoices have been paid."

Three stages, each with its notification. The user can locate themselves in the
sequence.

**A named Stripe error string, with its fix** `[observed]`:
"If you encounter **'This invoice can no longer be paid on Stripe'** error or
need your Tax ID added to a previous invoice, follow the steps below to get an
invoice reissued." — a third-party error message documented in the vendor's own
FAQ, with a five-step recovery and a **time bound on the fix**: "If you do not
receive the re-issued invoice within 24 hours, please reach out to us."

## T8 Empty states

`[documented]` and thin.

**The empty project canvas** `[documented]`:
"After the project is created, you will land on the Project Canvas. **A panel
will appear prompting you to Add a Service.**" — a first-run empty state with a
single named action (`Add a Service`). The panel's own copy is `[absent]`.

**The zero-render marketing counter** `[observed]` — `0+ deploys per month
(and counting)` and rows of zeros (see T2). An unintended empty state on the
home page: the odometer's pre-hydration value is displayed as fact.

**The status page's uptime rows** `[observed]` render `100.00% uptime` with no
incident entries anywhere — a status page whose entire content is the absence
of content. The scope disclaimer (T6) is doing the work an empty state would
otherwise do, explaining *why* nothing is listed.

**Template search miss** `[documented]`: "*Hint: If your desired template isn't
found feel free to reach out to the community.*" — the no-results recovery for
the template marketplace is stated in the tutorial rather than (observably) in
the UI.

All dashboard empty states (no projects, no services, no logs, no deployments)
are post-auth. `[absent]`

## T9 Notifications & system messages

`[documented]`, and unusually explicit about *which* notifications exist.

**Notification commitments stated in documentation** `[observed]`

- Capacity pause: "You'll receive a **notification when deployment
  capabilities are restored**"
- Payment failure: "We also **inform you** of the payment failure, in case your
  payment method needs to be updated" → then "we flag your services to be
  stopped and **send you a warning**"
- Volume data deletion: "Railway will delete your data from the platform as per
  the timeline below **after sufficient warning**"
- Host maintenance: "**We provide advance warning for these events**"
- Hobby fee waiver: "If you qualify, you will be **notified in the Dashboard or
  when you upgrade to the Hobby plan**"

**Five notification promises across four documents**, each attached to the
event that triggers it. None of the actual message copy is published —
`[absent]` throughout — but the *existence and timing* of each is a commitment
a user can rely on. "after sufficient warning" is the vaguest of the five and
sits on the most consequential event (data deletion).

**In-product indicators, named** `[documented]`:
`Limited Access` (dashboard indicator during a capacity pause) ·
a **banner above the Active deployment** for Railway-initiated deployments ·
`Estimated Usage` (usage section) · `Staged Changes`
("these updates will be gathered into a changeset for you to review and apply").

**Alert configuration is a marketing feature with its channels named**
`[observed]`: `Alerts that reach you` — "Slack, Discord, or emails **the moment
conditions you specify are met**." Three channels, and `Discord` before
`emails` is an audience signal.

**Webhooks** are a documented observability surface
(`Observability > Webhooks`), not fetched.

**Status-page notification** `[observed]`: a single `Subscribe` control; the
channel list is behind an interaction and was not captured. The status page is
in-house (`status.railway.com`, reached via `railway.instatus.com`) rather than
Atlassian Statuspage, so the shared subscription boilerplate seen on Supabase
and Render is absent — and so is its channel disclosure.

**No email copy, no toast copy, no push copy was observable.** `[absent]`

## T10 Disclosures, legal & compliance

**The billing model is disclosed as two components, repeatedly** `[observed]`

> "There are two main components to your bill:
> **Subscription** — Cost of the plan you're on
> **Resource Usage** — Cost of the resources you've consumed:
> `[cost per unit] x [used units]`"

The formula is printed as a formula. Restated three more times across the
Plans and FAQs pages, because it is the thing users get wrong.

**Five tiers, each with a one-line audience** `[observed]`

| Plan | Positioning line | Price |
|---|---|---|
| `Trial` | One-time $5 grant | — |
| `Free` | "For running small apps with $1 of free credit per month" | `$0 / month` |
| `Hobby` | "For indie hackers and developers to build and deploy personal projects" | `$5 / month` |
| `Pro` | "For professional developers and their teams shipping to production" | `$20 / month` |
| `Enterprise` | "For teams building and deploying production applications with the need for enterprise features related to compliance, SLAs, and account management" | `Custom` |

**Resource prices published in two units each** `[observed]`

| Resource | Price |
|---|---|
| `RAM` | `$10 / GB / month` (`$0.000231 / GB / minute`) |
| `CPU` | `$20 / vCPU / month` (`$0.000463 / vCPU / minute`) |
| `Network Egress` | `$0.05 / GB` (`$0.000000047683716 / KB`) |
| `Volume Storage` | `$0.15 / GB / month` (`$0.000003472222222 / GB / minute`) |

**Every rate is given at both human scale and billing scale** — the
per-month figure you reason with and the per-minute figure you are actually
charged. Egress is quoted to **fifteen decimal places**, which is precise and
absurd; it is also the only honest way to show a per-KB rate.

**The "is the Hobby plan free?" question, answered "No."** `[observed]`

> "**Is the hobby plan free?**
> **No.** The Hobby Plan is $5 a month, and it includes a resource usage credit
> of $5. **Even if you do not use the $5 in usage (CPU, Memory, egress), you
> always pay the $5 subscription fee.**"

A one-word answer to a question about the plan's own name, followed by the
worst case stated explicitly. Paired with
`Why am I charged for more than $5 on the hobby plan?`, and with a worked
example pair:

> "If your resource usage is $3, your total bill for the cycle will be $5…
> If your resource usage is $7, your total bill for the cycle will be $7 ($5
> subscription fee + $2 of usage)"

**Two numeric examples, one under and one over the threshold**, with the
arithmetic shown. This is the correct way to disclose an included-usage
model and it is done better here than anywhere else in this batch.

**The refusal to estimate, stated as a policy with an analogy** `[observed]`

> "**We are unable to give exact quotes or estimates for how much it will cost
> to run your app** because it is highly dependent on what you're deploying."

And, on `Why is my resource usage higher than expected?`:

> "**Unfortunately, we are unable to assist with figuring out why your bill is
> higher than normal**, as it is entirely dependent on what you have deployed.
> Resource usage is billed in a manner akin to how a **utility company**
> operates: **they can tell you the amount of electricity you've consumed, but
> they can't explain the reasons for your high usage.** Similarly, we can only
> provide information on the quantity of resources you consume, not the reasons
> behind it."

**A support-scope refusal delivered through a household analogy.** It is the
clearest example in this batch of *using a metaphor to make a "no" feel
reasonable* — and the analogy is load-bearing, because it transfers the reader's
existing acceptance of utility billing onto cloud billing.

Crucially, the refusal is **preceded by five specific things it could be**:
memory leaks; higher traffic; inherently resource-intensive templates; egress
from not using Private Networking; **PR deploys billing for mirrored
workloads**. So the answer is "we can't tell you, but here are the five usual
suspects" — not a bare deflection. The PR-deploy item is the non-obvious one
and is exactly the kind of surprise charge a user would dispute.

Instead of an estimate, a **procedure** is given:
> "1. Deploy your project with the Trial or Hobby plan
> 2. Allow it to run for **one week**
> 3. Check your Estimated Usage in the Usage Section"
> "Keeping it running for one week allows us to rack up sufficient metrics…
> You can then use this information to **extrapolate** the cost you should
> expect."

**Three steps, a duration, and the reason the duration matters.**

**Deletion timelines, published per plan** `[observed]`

`How long does Railway keep my volume data if I am no longer on a paid plan?`

| Plan | Days |
|---|---|
| `Free or Trial plan` | `30 days after expiry` |
| `Hobby plan` | `60 days after cancellation` |
| `Pro plan` | `90 days after cancellation` |

**Image retention, published per plan** `[observed]`:
`Free / Trial` `24 hours` · `Hobby` `72 hours` · `Pro` `120 hours` ·
`Enterprise` `360 hours`. With the consequence spelled out: a deployment
outside the window "will not have the option to rollback; instead, you will
need to use the **redeploy** feature. This will **rebuild the image from the
original source code** with the deployment's original variables." — the
rollback/redeploy distinction that the deployment menu fails to make (T6) is
finally drawn here, in the pricing docs.

**Resource caps per plan, as a six-column table** `[observed]`:
`Replicas` / `RAM` / `CPU` / `Ephemeral Storage` / `Volume Storage` /
`Image Size`, from Trial (`2` / `1 GB` / `2 vCPU` / `1 GB` / `0.5 GB` /
`4 GB`) to Enterprise (`50` / `2.4 TB` / `2,400 vCPU` / `100 GB` / `5 TB` /
`Unlimited`). With a footnote clarifying that "these are maximum values and
**include replica multiplication**" — i.e. the headline number is not per
replica.

**Post-cancellation and post-deletion billing, disclosed as two questions**
`[observed]`

> `Why did I receive another invoice after cancelling my subscription?` —
> "These are resource usages you have consumed in that billing cycle that **we
> reserve the right to charge you for**."
> `Why was I charged after deleting my account?` — "Railway bills Resource Usage
> **in arrears**… This final invoice covers the portion of the cycle you used,
> and **the plan fee for the current period is not prorated. Invoices for a
> deleted account are not refundable.**"

Three unfavourable terms in one answer (arrears billing, no proration,
non-refundable), stated flatly. Most products would not write the second
question at all.

**A charge Railway protects the user from, disclosed** `[observed]`:
> "When the amount due on your invoice is **less than $0.50**, and you do not
> have a credit balance, Railway marks the invoice as paid and registers the
> amount to your credit balance as a debit to be charged on a future invoice."

The `applied balance` line item on an invoice explained, with its threshold.

**Cancellation consequence stated at the point of cancellation** `[observed]`:
"When you cancel your subscription, **Railway will stop all deployments in your
workspace to prevent further charges.** Your plan will remain active until the
end of your billing cycle." — the destructive consequence is framed as *in the
user's financial interest*, which is true and is the right framing.

**A discretionary waiver, with its process disclosed as closed** `[observed]`:
> "Railway waives the monthly Hobby plan subscription fee for a small set of
> active builders… Eligibility is **automatically assessed**… **This is a fully
> automated process, and Railway does not respond to requests for waiver.**"

A benefit you cannot apply for, stated so nobody wastes a ticket.

**A withdrawn capability, dated** `[observed]`:
`I prefer to prepay. Is that possible?` — "**Not anymore as of March 30th**,
Railway requires the use of a post-paid card." (The year is omitted.)

**Architecture disclosed voluntarily** `[observed]`, from Philosophy:
"Railway at a high level takes your code, builds it, and throws it on running
infrastructure **on GCP**." Then five named layers — `Build Layer`
(with `Railpack` and the image registry), `Deployment Layer`, `Routing Layer`,
`Logging Layer` ("a suite of machines networked running **Clickhouse**"),
`Dashboard Layer`. **Naming the underlying cloud and the log store is a
disclosure most PaaS vendors avoid.**

And: "Railway uses a suite of alerting vendors, additional internal tools, and
**PagerDuty**… **Operational incident management reports and RCAs are available
by request for those on an Enterprise plan.**" — RCA availability gated by
plan, stated.

**Two flat "No" answers on the Philosophy page** `[observed]`:
> `Do I have to change how I write Code?` — "**No**, Railway is a deployment
> platform that works with your existing code."
> `Is Railway serverless?` — "**No**, services on Railway are deployed in
> stateful Docker containers." Then the nuance: a feature *called* `Serverless`
> exists that lets a service "sleep" — **so Railway says it is not serverless
> while shipping a feature named Serverless, and explains the gap in the same
> answer.**

**Legal surfaces** `[observed]`: `DPA` · `Acceptable Use` · `Privacy Policy` ·
`Terms of Service` · `Enterprise Agreement` · `Bug Bounty Program` ·
`Cookie preferences`, plus `trust.railway.com` linked twice in the footer.

## T11 Help-centre architecture

**There is no help centre. There is `Central Station`.**

`station.railway.com` is the named support hub — a community forum where users
open **`Help Threads`** (`station.railway.com/questions`). It is:

- a footer link under `Resources`
- a link in the docs header, beside `Changelog`
- **a monitored component on the status page**
  (`Support & Community — station.railway.com`)
- the escalation target in the Quick Start ("If you're stuck don't hesitate to
  open a Help Thread")
- the escalation target on the status page ("please report it at
  station.railway.com")
- the escalation target for invoice re-issuance failures
- the escalation target for agency billing handover

**One named destination, referenced from six surfaces, in the same words.**
Railway's support architecture is a single strong routing decision repeated
everywhere, rather than a tiered system. The cost is that `Central Station`
must be learned as a proper noun — nothing about the name says "support".

**Paid support is a named tier ladder** `[documented]`:
`Priority support` / `priority threads` (Pro) ·
`Business Class Support` (a Pro add-on, included with Enterprise) ·
`Priority boarding` (a docs page under `Platform`). Three named support
products, all using transport vocabulary (see T13).

**Documentation is the primary surface**, and it is organised so that
**failure content lives beside the feature it belongs to** (four distributed
`Troubleshooting` sub-groups — see T1) rather than in a central index.

**The docs are open source and say so on every page** `[observed]`:
`Edit this page on GitHub` → `github.com/railwayapp/docs/edit/main/content/...`.
The entire documentation corpus is public markdown. For a content corpus this
is notable: **Railway's docs are directly inspectable as source**, including
their frontmatter (`title`, `description`) and their component vocabulary
(`<Image>`, `<Banner variant="info">`).

**The AI-consumption layer is the most developed in this batch** `[observed]`:
`Ask AI about this page` · `Copy page` · `Open in ChatGPT` ·
`Open in Claude` · `Open in Cursor`, plus a whole `AI` docs section
(`Railway Agent`, `Agent skills`, `MCP server`, seven named editor/assistant
plugins), plus `Railway for Agents` as the third item in the docs sidebar.
**Three named third-party assistants as per-page CTAs** — Supabase offers two,
Docker one (its own), Render none.

**Article-title grammar — five shapes**

| Shape | Examples |
|---|---|
| Bare noun/topic | `The Basics`, `Philosophy`, `Deployments reference`, `SSL` |
| `X reference` | `Deployments reference`, `Variables reference` |
| Literal error string | `No start command could be found`, `ENOTFOUND redis.railway.internal`, `405 method not allowed` |
| `Verb X from Y` | `Recover PostgreSQL from corrupted WAL`, `Migrate from Heroku` |
| `Compare to X` | Ten pages |

**Community programmes are documented** `[observed]`:
`The Conductor program` · `Affiliate program` · `Bounties` —
a `Community` docs section with three named programmes, one of which
(`Conductor`) is another transport pun for what other products call
"ambassadors".

## T12 FAQs

**Two FAQ surfaces, both in the documentation, both billing-dominated.**

### 12a. `Pricing FAQs` — ~20 questions `[observed]`

Intro: "General common Questions & Answers related to Railway's pricing."

| # | Question (verbatim) |
|---|---|
| 1 | Can I try Railway without a credit-card? |
| 2 | What payment methods are accepted? |
| 3 | What will it cost to run my app? |
| 4 | How do I prevent spending more than I want to? |
| 5 | Why is my resource usage higher than expected? |
| 6 | Why am I charged for more than $5 on the hobby plan? |
| 7 | Why is there an "applied balance" on my invoice? |
| 8 | How do I view or upgrade my current plan? |
| 9 | How do I cancel my subscription? |
| 10 | How do I add or update billing information? |
| 11 | How is sales Tax/VAT handled? |
| 12 | How do I remove my saved payment method from my account? |
| 13 | What happens if the payment fails for my subscription? |
| 14 | My services were stopped, what do I do? |
| 15 | I am a freelancer or represent an agency. How do I manage my billing relationships with my clients? |
| 16 | Why did I receive another invoice after cancelling my subscription? |
| 17 | Why was I charged after deleting my account? |
| 18 | How do I request a refund? |
| 19 | Requesting an invoice re-issuance |

### 12b. `Pricing Plans` FAQs — 8 further questions `[observed]`

`Which plan is right for me?` · `Can I upgrade or downgrade at any time?` ·
`What is the difference between subscription and resource usage?` ·
`Can I add collaborators to my project?` ·
`How long does Railway keep my volume data if I am no longer on a paid plan?` ·
`Is the hobby plan free?` ·
`Can I get the hobby plan subscription fee waived?` ·
`I prefer to prepay. Is that possible?` ·
`What happens if I use credits as a payment method and my account runs out of credits?` ·
`Why was I charged for a partial month of usage?`

**Structural analysis.**

**Roughly 28 FAQ questions and every one is about money.** There is no
technical FAQ, no "what languages do you support", no reliability question.
Railway's FAQ surface is a billing-anxiety document, which is the correct
allocation for a pure usage-billed platform and is a sharp contrast with
Render (which splits billing and service-behaviour) and Docker (which splits
across seven product groups).

**Seven questions begin with `Why…`** — and every one of them is a complaint:
`Why is my resource usage higher than expected?` ·
`Why am I charged for more than $5…?` ·
`Why is there an "applied balance" on my invoice?` ·
`Why did I receive another invoice after cancelling…?` ·
`Why was I charged after deleting my account?` ·
`Why was I charged for a partial month of usage?` ·
`Why was I charged $1…` (Render's, for contrast).

**Five of seven are "why was I charged".** Railway has systematically written
down every surprise charge its users encounter and answered each in its own
entry. That is a chargeback-prevention document masquerading as an FAQ, and it
is the most complete one in this batch.

**Q14 (`My services were stopped, what do I do?`) is the standout question
shape** — a two-clause sentence, the first being the state the user is in and
the second their actual question. Compare Render's
`My app runs fine locally. Why does it fail to deploy?`. Both encode the
user's situation before their question; Railway's is the panicked-user version.

**Q15 is a persona statement** (`I am a freelancer or represent an agency.
How do I manage my billing relationships with my clients?`) — the same
situation-then-question construction, and the answer ends by naming the messy
case: "If you run into issues **when it's time to hand over your workload to
your client**, you can reach out to us."

**Q19 is not a question** (`Requesting an invoice re-issuance`) — a gerund
heading in a list of questions, and the only one. An inconsistency.

**Q3's answer refuses the question and substitutes a procedure** (see T10),
and Q5's refuses it with a utility-company analogy. **Two of the twenty
answers are explicit "we cannot help you with this"**, both written at length
and both giving something in return. That is the Railway house move: a
documented no, with substance attached.

## T13 Terminology & glossary

Railway publishes **no glossary page**, but `The Basics`'s
`In a nutshell` block functions as one (T4) — five terms with one-line
definitions.

**The transport metaphor is systematic and is the defining terminology
finding.**

| Coined term | What it is | The plainer word it displaced |
|---|---|---|
| `Railway` | The company and platform | — |
| `Central Station` | The support and community hub | help centre / forum / community |
| `Help Thread` | A support request | ticket / case |
| `Priority boarding` | An early-access/beta programme | beta / preview programme |
| `Business Class Support` | A paid support tier | premium support |
| `The Conductor program` | Community contributors | ambassadors / MVPs |
| `All Aboard` | The closing CTA | Sign up / Get started |
| `now boarding` | Closing headline ("A better future is now boarding") | Coming soon |
| `Railpack` | The build system | buildpack. **The one railway-adjacent coinage that isn't a pun** — a portmanteau of Railway and buildpack, and a direct descendant of Heroku's term |
| `Railway Metal` | Bare-metal infrastructure | dedicated hardware |

**Ten transport terms across support, community, marketing, and infrastructure
naming.** No other product in this batch sustains a metaphor across this many
surfaces. The cost is real and worth naming: **`Central Station` does not say
"support"**, `Priority boarding` does not say "beta", and `Business Class
Support` requires the reader to already hold the airline analogy. A new user
looking for help must learn a proper noun first. The benefit is memorability
and a coherent brand voice — and Railway commits fully rather than hedging,
which is the right way to make this trade if you are going to make it.

**The object model — five nouns, each defined in under ten words**

| Term | Definition (verbatim from `In a nutshell`) | Displaced |
|---|---|---|
| `Dashboard` | "Main entrypoint for all projects under your account." | home / console |
| `Project` | "A collection of services under the same network." Elsewhere: "a capsule for composing infrastructure… an application stack, a service group, or even a collection of service groups" | app / stack / environment. **Three alternative framings offered in one sentence** because the concept has no single analogue |
| `Service` | "A target for a deployment source (e.g. Web Application)." Elsewhere: "a deployment target for your deployment source" | app / dyno / container. Same choice as Render — `service` replaces Heroku's `app`+`dyno` |
| `Deployment` | "Built and deliverable unit of a service." Elsewhere: "**attempts** to build and deliver your service" | release / build. **`attempts` is the load-bearing word** — a deployment is defined as an attempt, which is why `Failed` is a first-class state rather than an exception |
| `Volume` | "Persistent storage solution for services." | disk / persistent disk |

`Deployment` defined as an *attempt* is the sharpest definitional choice in
this batch. It makes failure part of the noun.

| Other terms | Usage | Displaced |
|---|---|---|
| `Project Canvas` / `the canvas` | The visual project view; "This is your *mission control*" | dashboard / graph / topology view. The only non-transport metaphor in the product, and it collides slightly with `Dashboard`, which is a *different* screen |
| `Workspace` | The billing and membership container above projects | team / org. Railway has `Workspace` → `Project` → `Service` → `Deployment`, four levels |
| `Service Variables` | "A collection of configurations and secrets" | environment variables / config vars. Note: **config and secrets are one object**, unlike Docker Compose's separate `configs` and `secrets` |
| `Reference Variable` | A variable that reads from another service | linked variable / output |
| `Staged Changes` | "updates will be gathered into a changeset for you to review and apply" | pending changes / draft. Borrowed from git's staging area |
| `Ephemeral storage` | Per-deployment scratch space, 1 GB free / 100 GB paid | temp disk. Same term as Heroku, Docker, Render — fully generic now |
| `Singleton deploys` | "By default, Railway maintains only one deploy per service" | — a named *policy*, not an object |
| `Serverless` | A feature that lets a service "sleep" when inactive — **while the Philosophy page states "Is Railway serverless? No"** | scale-to-zero / sleep. **A product feature named after a category the company disclaims** |
| `Limited Access` | The dashboard indicator during a capacity pause | degraded / throttled. A euphemism, but an honest one — access is limited, not removed |
| `Sandboxes` | A service type | — |
| `Agents` / `Cloud agents` / `Railway Agent` | **Three different AI products with near-identical names**: `Agents` (marketing), `Cloud agents` (run coding agents on Railway), `Railway Agent` (Railway's own assistant). The docs sidebar lists all three under `AI` | — a genuine naming collision |
| `Template kickback` | Revenue share for template authors | referral / royalty |
| `Dev Studio — dev.new` | A product surfaced only on the status page | — |

**Vocabulary shared with the rest of this batch**: `ephemeral storage`,
`pre-deploy command`, `start command`, `healthcheck`, `rollback`, `replica`,
`volume`, `private networking`, `egress`. These are the terms that became
industry-generic after Heroku and Docker coined them — Railway inherits them
without modification, which is correct.

**Register split by surface:**

| Surface | Vocabulary |
|---|---|
| Marketing | `peacefully`, `Alternative to`, `All Aboard`, `YAML optional` |
| Docs — concepts | `Project`, `Service`, `Deployment`, `capsule`, `mission control` |
| Docs — reference | `Initializing`, `REMOVED`, `SIGTERM`, `RAILWAY_DEPLOYMENT_DRAINING_SECONDS` |
| Docs — pricing | `Resource Usage`, `applied balance`, `in arrears`, `post-paid card` |
| Support | `Central Station`, `Help Thread`, `Business Class` |

## T14 Voice, tone & accessibility

**Person and tense.** Docs are second person for the user and **first person
plural for the company** — "**We** do not send any other signals under any
circumstances", "**We** provide advance warning for these events", "**we** are
unable to assist", "**we** reserve the right to charge you for", "**We** would
rather have a developer make the correct choice for their company than to adopt
Railway and then come to regret that decision."

This is the opposite of Render's "Render does X" third-person convention, and
it produces a markedly more conversational corpus. Railway also uses
**"Railway" in the third person in the same documents** ("Railway will
automatically redeploy your services"), so both voices coexist — `we` for
commitments and refusals, `Railway` for platform behaviour.

**Register is conversational and occasionally colloquial** —
"**We got you.**" · "**Bring it.**" (Philosophy, on Dockerfiles) ·
"we'll find it!" · "rack up sufficient metrics" · "throws it on running
infrastructure on GCP" · "**Happy Building!**" ·
"If you're stuck **don't hesitate**". `We got you` and `Bring it` are the two
most informal strings in this entire batch.

**The Philosophy page is a voice document in its own right** `[observed]`:

> "Railway maintains a policy to be **forthcoming and frank at all times.**"
> "We believe software should be **'take what you need, and leave what you
> don't.'**"
> "we are comfortable **recommending additional vendors** if they might acutely
> meet their needs."
> "If you've outgrown the 'magic' built into deployment platforms, **or are
> suspicious of things that are just too magical**, we are happy to provide a
> high level overview of Railway's architecture."

**Railway states a disclosure policy, offers to recommend competitors, and
pre-empts distrust of its own abstraction — naming the reader's suspicion in
the reader's terms ("too magical").** The scare quotes around `"magic"` on
second use, after using it unquoted, is a deliberate stance shift.

The two section headings `Take what you need` and `Leave what you don't` are
the philosophy split into the page's structure.

**Exclamation marks are used, sparingly and only in success or welcome**:
`Happy Building!` · `And that's it! 🎉` · `we'll find it!` ·
"the actual error is rarely at the bottom!" — the last being the only
exclamation in a troubleshooting context, and it marks a counter-intuitive
fact rather than enthusiasm. Zero exclamation marks in the deployments
reference, the error page, or the pricing docs.

**Bold-lead warnings**, as elsewhere in this batch:
"**These deployments are mandatory and cannot be opted out of.**" ·
"**We do not send any other signals under any circumstances.**" ·
"**No action is required on your part**" ·
"**Unfortunately, we are unable to assist…**"

**Flat negatives are a house device.** `No.` (is the Hobby plan free) ·
`No,` (do I have to change how I write code) · `No,` (is Railway serverless) ·
`Not anymore as of March 30th` (prepay) ·
`Railway does not respond to requests for waiver` ·
`we are unable to give exact quotes` · `we are unable to assist`.
**Seven documented refusals**, each followed by either a reason, a
substitute procedure, or both. Railway says no more often and more plainly
than anything else in this batch, and it almost always pays for the no.

**Numbers are specific**: `$5` · `$20` · `$10 / GB / month` ·
`$0.000000047683716 / KB` · `0 seconds` (default SIGTERM grace) ·
`30 days` · `24/72/120/360 hours` · `1,500+ requests per second` ·
`under 50 milliseconds` · `100 Gbps` · `650+ templates` · `2M+ developers` ·
`8 AM – 8 PM` · `less than $0.50` · `one week`.

**Accessibility** `[observed]`

- **No `Skip to content` link found in the served HTML** of either the
  marketing site or the docs. Railway and Render are the two products in this
  batch with none on either property.
- **Docs image alt text is descriptive and consistently written**:
  "screenshot of new project menu with deploy from github selected" ·
  "screenshot of the command line after railway init was run" ·
  "screenshot of the project canvas with services highlighted" ·
  "Screenshot of application failed to respond error" ·
  "Limited Access indicator shown during high traffic periods". These name the
  screen *and* the state being illustrated. Casing is inconsistent (lowercase
  `screenshot of…` in the quick start, capitalised `Screenshot of…` in the
  basics) but the content is good.
- **One docs alt text is wrong** `[observed]`: in the Docker-image section of
  the Quick Start, the image of the *empty project* option carries
  `alt="screenshot of new project menu with deploy from github selected"` —
  copy-pasted from the GitHub section and describing a different screen.
- **Marketing alt text is largely empty or filename-derived**: the five
  section background textures carry `![]()` with no alt (correct, they are
  decorative), but **the testimonial avatars and the section illustrations also
  carry empty alt**, and the customer logos carry only the company name
  (`TripAdvisor`, `Cognizant`, `Mercado Libre`, `G2X`, `Reducto`,
  `Automattic`) — acceptable. The `Alternative to` competitor logos carry
  `Docker logo`, `Helm logo`, `Nginx logo` etc. — **good, because those logos
  are the argument**; without alt the entire positioning device would be
  invisible.
- **The testimonial carousel is duplicated in the DOM** — all six tweets appear
  twice in sequence, so a screen-reader user hears each testimonial twice. The
  same defect as Supabase's customer carousel.
- **The live-counter block renders as zeros** in served HTML —
  `## 0+ deploys per month (and counting)` as an H2, and
  `Users 0000000, Services 000000000, Deployments 000000000, Requests
  00000000000000, Logs 00000000000000` as body text. A screen reader announces
  a heading claiming zero deploys and then fifty digits of zero.
- **`PreviousScaling` / `NextSlow deployments`** — prev/next link labels render
  without a separator between the word and the title.
- **`Compute plansNew`**-style badge concatenation does not occur here, but the
  docs sidebar renders `Templates & open source` with an escaped ampersand in
  the title attribute (`Templates &amp; open source`), as do
  `Languages &amp; frameworks`, `Build &amp; deploy`, `Data &amp; storage`,
  `Scopes &amp; user consent`, `Login &amp; tokens`, `Uploading &amp; serving`
  — **seven escaped entities in link title attributes**, announced as "amp".
- **Status-page uptime rows linearise poorly**: each component produces
  `<name> / 100.00% uptime / 90 days agoToday / June100.00% / July100.00% /
  August100.00% / September100.00%` — with `90 days agoToday` and
  `June100.00%` concatenated without separators. With 40+ components this is
  ~280 fragments of run-together text.
- `All systems operational↗` puts a directional glyph inside link text.
- No language switcher; no `lang` alternates observed.

**Negative findings, recorded honestly**

- The home-page live counter renders `0+ deploys per month` and rows of zeros
  without JavaScript — a headline claiming zero usage
- `Ship software peacefully` (visual H1) vs
  `The all-in-one intelligent cloud provider` (title/`og:title`) — two
  different value propositions
- `Rollback` and `Redeploy` have **identical one-line definitions** in the
  deployment menu docs; the actual difference is documented only in the pricing
  docs
- `Removed` (state section) vs `REMOVED` (menu section) — one value, two
  casings, one page
- "A comprehensive up to date list of **statues**" — typo in the first sentence
  of the deployment-states section
- "if **you** application has locked up" — typo in the `Restart` definition
- `Correct config. All the time` — missing terminal full stop in a
  three-fragment list where the siblings have one
- Five bare `Learn more →` CTAs on the home page
- `Agents` (marketing) / `Cloud agents` (docs) / `Railway Agent` (docs) —
  three AI products with colliding names
- A feature named `Serverless` on a platform whose Philosophy page answers
  "Is Railway serverless? **No**"
- `Compare to Heroku` (Railway as subject) vs `Migrate from Heroku` (reader as
  subject) in adjacent sidebar groups
- The footer links `Render`, `Fly.io`, `Vercel` comparisons to
  `docs.railway.com/maturity/...` while the docs sidebar serves them at
  `docs.railway.com/platform/...` — **two URL namespaces for one set of pages**,
  and `Philosophy` in the footer points at `/maturity/philosophy` while the
  sidebar points at `/platform/philosophy`
- `Requesting an invoice re-issuance` is a gerund heading inside a list of
  questions
- "Not anymore **as of March 30th**" — a dated policy change with no year
- A copy-pasted, incorrect alt text in the Quick Start
- Testimonial carousel duplicated in the DOM
- Seven escaped `&amp;` entities in sidebar link titles
- No skip link on either property
- Only eleven troubleshooting entries total, with **no page for the `Failed` or
  `Crashed` states** that the platform itself names

---

## Transferable patterns

1. **Define a state by its transition, not its condition.** Every one of
   Railway's nine deployment states says what moves it to the next state
   (`Initializing` → "once it has been accepted into Railway's build queue, the
   status will change to `Building`"). The reader learns the graph. Applies to
   any status a user watches.
2. **Write both branches of a conditional state definition, including the
   unflattering one.** `Active` means "healthcheck passed" *or* "container
   started", depending on whether the user configured a healthcheck — and
   Railway says so. Tells the user their green light means less than they
   think.
3. **Rank causes by frequency, explicitly.** "the most common being…",
   "Another common reason…", "In some far less common cases…" — then order the
   solutions the same way. Three phrases, and the reader's search is halved.
4. **Document which cases need no fix.** `gunicorn` "listens on `0.0.0.0` and
   the `PORT` environment variable **by default**" gets its own entry beside
   the frameworks that need flags. Naming the already-correct case prevents a
   user from changing something that works.
5. **Give a reading technique, not just a link, at the moment of failure.**
   "scroll through the entire log; important details are often missed, and the
   actual error is rarely at the bottom!" Corrects a specific wrong assumption
   about the artefact in front of the user.
6. **Offer a "configure first" fork at the first deploy, and name your
   tutorial's own bias.** `Deploy Now` vs `Add variables`, both explained,
   then "*For brevity, choose Deploy Now.*" The user with secrets is not
   funnelled into a guaranteed failure.
7. **Open a concepts page with a compressed object model.** `In a nutshell` —
   five nouns, one line each, indented to show containment, before any prose.
   Fifteen seconds to the whole data model.
8. **Structure a degradation notice as four beats.** Policy and why → what you
   see and what is *not* affected → the paid escape → what happens when it ends
   ("No action is required on your part"). Two of four bullets should be
   reassurance by negation.
9. **Give a "this wasn't you" affordance for platform-initiated state
   changes.** Railway-initiated deploys "display with a banner above the Active
   deployment to clearly identify them", and the three causes are published.
   Applies anywhere a system acts on a user's object without being asked.
10. **Publish an absolute negative commitment about your own behaviour.**
    "We do not send any other signals under any circumstances." More useful
    than an exhaustive list of what you do send, and impossible to
    misinterpret.
11. **Show two worked numeric examples for an included-usage model, one under
    and one over.** "$3 usage → $5 bill" and "$7 usage → $7 bill ($5 + $2)".
    Removes the entire class of "why was I charged" tickets that the example
    covers.
12. **Answer the question the plan's own name raises.** `Is the hobby plan
    free?` → `**No.**` → "Even if you do not use the $5 in usage, you always
    pay the $5 subscription fee."
13. **When you must refuse, give the five usual suspects and a procedure.**
    Railway cannot explain your bill, so it lists five common causes, offers a
    three-step one-week measurement procedure, and justifies the refusal with a
    utility-company analogy. A documented no with substance attached.
14. **Print a rate in the unit the user reasons with *and* the unit you bill
    in.** `$10 / GB / month ($0.000231 / GB / minute)`.
15. **Name the scope threshold of your status page.** "reports incidents with
    significant, widespread user impact. Smaller or isolated issues won't show
    up here" — plus where to report the sub-threshold case. Prevents the
    "your status page is lying" reaction.
16. **Put the current state in the footer, not a link to it.**
    `All systems operational↗` sitewide. Zero clicks to the reassurance.
17. **Decompose authentication on the status page by identity provider.**
    `Login — GitHub` / `Login — Google` / `Login — Emails` /
    `Login — Railway OAuth`, plus status rows for third-party dependencies
    (`npm`, `Dockerhub`, `GHCR`). Lets a user distinguish your outage from
    someone else's.

## Caveats & gaps

- **The marketing navigation is entirely client-rendered.** Only the five
  top-level labels (`Product`, `Developers`, `Enterprise`, `Company`,
  `Pricing`) appear in served HTML; every sub-label and scope line is
  `[absent]`. T1's marketing IA is reconstructed from the footer. A
  browser-rendered pass is required.
- **`railway.com/pricing` (the marketing pricing page) was not fetched.** All
  pricing content here comes from `docs.railway.com/pricing/plans` and
  `/pricing/faqs`. The marketing page has its own headline, plan-card copy,
  feature matrix, and an `Upload your current invoice` comparison tool, none of
  which are captured. **Top gap.**
- **`trust.railway.com` and `docs.railway.com/enterprise/compliance` were not
  fetched**, so the `Regulatory posture` field in this file is deliberately
  empty. Railway almost certainly holds SOC 2 and similar; **nothing is
  recorded because nothing was observed.** Do not infer compliance claims from
  this file.
- **Incident-communication vocabulary is almost entirely `[absent]`.** The
  status page showed `Fully Operational` with 100% uptime on every component
  across 90 days and **no incident entries at all**. Only two states
  (`Fully Operational`, `Operational`) were observable; degraded/outage/
  maintenance labels, incident-update grammar, severity vocabulary, and
  postmortem practice are unknown. The three regional rows at `99.80%` have no
  attached incident text. `status.railway.com/historical` and
  `/locations` were not opened and would be the place to find this.
- **All dashboard UI is post-auth.** Field labels, menu items, button text, the
  `Limited Access` indicator, the Railway-initiated-deploy banner, and every
  empty state in T5/T6/T8 are `[documented]` from docs prose. Strings visible
  only inside the ~30 screenshots are unharvested — including the peak-hours
  rejection error, which the docs describe but never quote.
- **Five of the nine pages were fetched from the docs' public GitHub source**
  rather than the rendered site. The markdown is the authoritative content, but
  **rendered-only elements are missing**: `<Banner variant="info">` bodies
  render inline here but their visual treatment and any surrounding UI copy
  are not observable, and client-rendered components on those pages would not
  appear in either form.
- Only **two of eleven troubleshooting pages were opened** (the error page in
  full; the other nine by title only). `Slow deployments`,
  `No start command could be found`, `405 method not allowed`, and
  `ENOTFOUND redis.railway.internal` bodies would all deepen T7 and are the
  natural second pass.
- `Central Station` (`station.railway.com`) was not fetched. Railway's entire
  support surface — thread titles, categories, staff-response register,
  self-service routing — is unharvested, and for a product whose help centre
  *is* a forum this is a structural gap in T11.
- `Best practices`, `Advanced concepts`, `Production readiness checklist`,
  `Cost control`, `Refunds`, `Support`, and `Incident management` docs pages
  were not opened. `Incident management` in particular would fill the T9/T6
  gaps left by the quiet status page.
- None of the ten `Compare to…` or eight `Migrate from…` pages were opened. For
  a product with eighteen competitive pages inside its documentation, that
  copy is a significant unharvested category.
- Email, toast, and push copy is `[absent]` entirely — five notification
  *commitments* are documented, zero notification *strings*.
- No non-English surface was found; all register claims are en-US.
- Accessibility findings are from served HTML only. The zero-rendering counter,
  duplicated carousel, escaped entities, concatenated prev/next labels, and
  run-together status rows are confirmed in markup but were not tested with
  assistive technology.

## Sources

1. https://railway.com/
2. https://docs.railway.com/
3. https://docs.railway.com/deployments/reference
4. https://docs.railway.com/overview/the-basics
5. https://docs.railway.com/quick-start
6. https://docs.railway.com/networking/troubleshooting/application-failed-to-respond
7. https://docs.railway.com/platform/philosophy
8. https://docs.railway.com/pricing/plans
9. https://docs.railway.com/pricing/faqs
10. https://railway.instatus.com/ (redirects to https://status.railway.com)

Sources 4–9 were retrieved from Railway's public documentation source
repository at `raw.githubusercontent.com/railwayapp/docs/main/content/docs/…`,
which is the same content served at the canonical URLs listed above.

No domains were blocked for this product.
