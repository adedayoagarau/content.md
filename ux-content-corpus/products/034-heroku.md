# 034. Heroku

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Cloud application hosting / PaaS (legacy incumbent), Salesforce-owned |
| Primary URL | https://www.heroku.com/ |
| Corpus rank | 034 |
| Benchmark strength (source list) | Deployment concepts and status |
| Locale / market observed | en-US (a `日本語に切り替える` toggle is present on every Dev Center article) |
| Platform observed | Web (marketing), Dev Center docs, CLI transcripts quoted inside docs |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | PCI DSS Level 1 Service Provider, HIPAA (BAA via Shield), ISO 27001 / 27017 / 27018, SOC 1 / 2 / 3, GDPR article in Dev Center. Compliance is scoped **per product tier**, not per company |
| Harvest date | 2026-09-21 |
| Pages inspected | 12 fetched successfully (6 further URLs blocked — see Caveats) |
| Harvest completeness | Full for the error/concept/status taxonomy; partial on incident-communication vocabulary because both status surfaces are client-rendered and returned no content |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://www.heroku.com/ | Hero, 12-feature grid, enterprise block, footer IA |
| Pricing | https://www.heroku.com/pricing/ | Dyno tier table (Cedar + Fir), Postgres plan tiers, progressive-disclosure toggles |
| Dev Center home | https://devcenter.heroku.com/ | Four curated shelves incl. `Debugging on Heroku` |
| **Heroku Error Codes** | https://devcenter.heroku.com/articles/error-codes | **The single richest source in this batch — 44 numbered platform error codes in three families** |
| Error Pages | https://devcenter.heroku.com/articles/error-pages | The user-facing 503 page, maintenance mode, customisation config vars |
| Troubleshooting & Support (category) | https://devcenter.heroku.com/categories/troubleshooting | 10-article category — article-title grammar |
| Dynos (App Containers) | https://devcenter.heroku.com/articles/dynos | Coined-term teaching page |
| How Heroku Works | https://devcenter.heroku.com/articles/how-heroku-works | Explicit `Terminology:` callout pattern — the best conceptual-onboarding artefact here |
| Buildpacks | https://devcenter.heroku.com/articles/buildpacks | Classic vs Cloud Native, auto-detection and detection failure |
| Troubleshooting Buildpack Errors | https://devcenter.heroku.com/articles/troubleshooting-buildpack-errors | Single-failure-mode article: `Missing File Failure` |
| Getting Started on Heroku | https://devcenter.heroku.com/start | Language-first onboarding index |
| Compliance Center | https://www.heroku.com/compliance | Certification matrix, trust narrative |

---

## T1 Navigation & IA labels

**Marketing global nav — five items, audience-and-artefact mixed** `[observed]`

`Products` · `Developers` · `Customers` · `Pricing` · `Resources`

An unusual mix: two are audiences (`Developers`, `Customers`), one is a
commercial page (`Pricing`), two are content buckets. `Customers` means
*case studies*, not "your account" — a latent ambiguity on a platform where
the reader is themselves a customer.

**Account menu (pre-auth, showing authenticated destinations)** `[observed]`

`Dashboard` · `Databases` · `Dataclips` · `Elements` · `Documentation` · `Support`

Six separate subdomains surfaced as one menu. `Dataclips` is a Heroku-coined
product noun exposed in nav with no gloss.

**Products sub-nav — every item is `Heroku <X>` plus a one-line scope sentence** `[observed]`

`Heroku Platform` · `Heroku AI` · `Heroku Data Services` · `Heroku Enterprise` ·
`Heroku Success` · `Heroku Elements Marketplace`

`Heroku Success` is the label for what the scope line then calls support options
("from Standard to Signature"). A benefit-named category over a function-named
one — and the only nav label whose meaning is not guessable from the word.

**Dev Center nav — four items only** `[observed]`

`Get Started` · `Documentation` · `Changelog` · `Search`

`Changelog` is promoted to top-level nav, level with Documentation. Notable:
release history is treated as a primary reading surface, not an archive.

**Dev Center category tree — 19 top-level categories, deeply nested** `[observed]`

`Heroku Architecture` · `Developer Tools` · `Deployment` ·
`Continuous Delivery & Integration (Heroku Flow)` · `Language Support` ·
`Databases & Data Management` · `AI` · `Monitoring & Metrics` ·
`App Performance` · `Add-ons` · `Collaboration` · `Security` ·
`Heroku Enterprise` · `Patterns & Best Practices` · `Extending Heroku` ·
`Accounts & Billing` · `Troubleshooting & Support` · `Integrating with Salesforce`

Three of these carry a **parenthetical gloss in the label itself** —
`Compute (Dynos)`, `Stacks (operating system images)`,
`Continuous Delivery & Integration (Heroku Flow)`,
`Heroku Connect (Salesforce sync)`. This is the defining Heroku IA move:
**the coined term and its plain-English translation ship in the same label.**
`Stacks (operating system images)` is the clearest example — the jargon is kept
for continuity and the meaning is supplied inline.

**The `Compute (Dynos)` sub-tree is a five-way split by *kind of question*** `[observed]`

`Dyno Management` · `Dyno Concepts` · `Dyno Behavior` · `Dyno Reference` ·
`Dyno Troubleshooting`

Not by feature. Management = what you do, Concepts = what it is, Behavior =
what it does on its own, Reference = the numbers, Troubleshooting = when it
breaks. This five-slot pattern is repeated per language
(`Java Behavior in Heroku`, `Working with Java`, `Troubleshooting Java Apps`).

**Footer groupings** `[observed]`: `Products` · `Languages` · `Resources` ·
`About Us` · `Help Center` · `Status` · `Contact`. `Languages` as a
first-class footer column (nine entries) is a polyglot-platform signal.

**Dev Center footer groupings** `[observed]`: `Information & Support` ·
`Language Reference` · `Other Resources`.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> Headline: `The Cloud Application Platform For Building, Deploying, and Scaling Apps`
> Subhead: "Heroku is your fastest path from idea to production."

The headline is a **category definition plus a three-verb gerund list**, not a
slogan. The three verbs (`Building, Deploying, and Scaling`) recur as the
organising triple across the whole site — the Dev Center H1 is
`Learn about building, deploying, and managing your apps on Heroku.`
(note: `managing` substituted for `scaling` — the same triple, one verb
swapped, unflagged).

**Section headers are noun phrases with an embedded claim** `[observed]`

`An innovative feature set built for full-stack simplicity` ·
`An ecosystem built to scale your stack` ·
`Scalable app hosting for building AI applications and agents` ·
`Your data on Heroku` · `The platform developers trust` ·
`Ready to Get Started?`

Two use the identical `An X built to/for Y` frame back to back.

**The `git push` as value proposition** `[observed]`

The feature-grid intro leads with a literal command:
"From your first `git push heroku main` to global auto-scaling…". The
developer's muscle memory is used as the unit of the promise. This is the most
distinctive Heroku headline device and it is 15 years old.

**Pricing headline** `[observed]`:
`Heroku Product Pricing for Every Stage of Your App's Journey`, with the
sub-line framing three anchors: "From dynos to data to AI". The phrase
"less ops friction" appears — jargon-as-benefit.

**Anti-infrastructure framing, repeated verbatim in structure** `[observed]`

- "stay focused on building great apps"
- "keeps you focused entirely on your code"
- "you can focus on building apps, not infrastructure"
- "Focus on building data-driven applications, not data infrastructure"
- "Stay focused on building great data-driven applications and let Heroku tackle the rest."

Five variants of one sentence. The `X, not Y` negation frame
("apps, not infrastructure") is the workhorse. Worth noting as a *defect* as
well as a pattern: the final CTA block says "great data-driven applications"
on both the home page and the compliance page, where data-driven is irrelevant
to the compliance reader — a reused module that doesn't fit its context.

**Compliance-page headline inverts to a question** `[observed]`:
`Why should you run critical apps on, and entrust sensitive data to, Heroku?`
— a 15-word second-person question as an H2, answered with
"Trust is our number one value."

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign Up Now!` | Sitewide promo bar | Only exclamation mark in the CTA set |
| `Sign Up` | Header | |
| `Sign up` | Dev Center header | **Case inconsistency with the marketing header** |
| `Login` | Marketing header | |
| `Log in` | Dev Center header | **Two spellings of one action across two surfaces** |
| `Get Started Now` | Hero, and twice more on home | Primary |
| `Get Started Today` | Pricing table header cell | A fourth variant of the same action |
| `Sign Up Now` | Final home CTA block | Fifth variant |
| `Explore Heroku Platform` | Below feature grid | Secondary, verb `Explore` |
| `Explore Heroku Solutions` | Audience section | |
| `Explore Managed Data Services` | Data section | |
| `Explore Heroku Enterprise` | Enterprise block | Four consecutive `Explore <product>` |
| `Learn more about Heroku AI` | AI section | Object-specific, not bare `Learn more` |
| `View More Customers` | Social proof | |
| `Learn how agencies use Heroku` | Social proof | Full-sentence CTA |
| `Lit Chart's story` | Testimonial | Possessive noun phrase as link |
| `Start this guide` | /start, per guide | Imperative + object |
| `Dyno Docs` / `Dyno Specs` / `About Dyno Tiers` | Pricing, stacked trio | Three docs links before any purchase CTA |
| `More about Dynos →` / `More about Dyno tiers →` | Pricing table, every row | **Repeated identically in ~30 rows** |
| `Show Cedar Dynos` / `Hide Cedar Dynos` | Pricing | Progressive disclosure, paired labels |
| `Show Fir Dynos` / `Hide Fir Dynos` | Pricing | |
| `Show Postgres Essential Plan Pricing` | Pricing | Longest disclosure label |
| `Learn More About PCI` / `…About HIPAA` / `…About ISO 27001, 27017, 27018` / `…About SOC 1, 2, 3` | Compliance matrix footer row | Regulator name carried into the CTA |
| `create a ticket` | Compliance, HIPAA paragraph | Inline lowercase link for a legal action (BAA) |
| `contact us` | Compliance, Next Steps | |
| `Visit Blog` | Nav flyout | |
| `Skip Navigation` | First in Dev Center DOM | Accessibility |
| `Log in to submit feedback.` | Foot of every Dev Center article | Gated feedback — see T14 |
| `View categories` / `Show nav` | Dev Center article pages | Mobile-nav toggles exposed in server HTML |
| `expand` | `Table of Contents [expand]` | Bracketed lowercase control inside a heading |

**Observation.** Heroku ships **five distinct labels for "create an account"**
(`Sign Up Now!`, `Sign Up`, `Sign up`, `Get Started Now`, `Get Started Today`,
`Sign Up Now`) across one site. It almost never ships a bare `Learn more` —
every instance names its object — so the specificity discipline is real but
applied only to secondary CTAs.

## T4 Onboarding & getting-started

**There is no product-agnostic quickstart. Onboarding forks on language first.** `[observed]`

`/start` is titled `Getting Started on Heroku` with the subhead
"Step-by-step guides for deploying your first app and mastering the basics of
Heroku", then immediately presents nine language tiles:

`Node.js` · `.NET` · `Ruby` · `Java` · `PHP` · `Python` · `Go` · `Scala` · `Clojure`

Ordered by popularity, not alphabetically, and `.NET` sits second — a
deliberate signal about who Heroku now wants. Below a rule, a smaller
`Other Guides` shelf carries three long-form titles
(`Getting Started on Heroku with Rails 6.x`,
`Getting Started on Heroku with Heroku Connect`,
`Getting Started on Heroku with Ruby (Microsoft Windows)`) each with a
`Start this guide` CTA.

**Defect found** `[observed]`: the `Rails 6.x` entry's title links to
`/articles/getting-started-with-rails6` but its `Start this guide` button links
to `/articles/getting-started-with-rails5`. Two links, one row, different
destinations, one of them the wrong major version. Also, the raw path
(`/articles/getting-started-with-nodejs`) is rendered as visible link text
beside each tile label — a template leak on the canonical onboarding page.

**The conceptual onboarding is a separate, explicitly-signposted narrative** `[observed]`

`How Heroku Works` opens with a reading instruction rather than content:
"Read this document sequentially: in order to tell a coherent story, it
incrementally unveils and refines the concepts describing the platform." It
then runs twelve sections in build order —
`What is an App?` → `Knowing What to Execute` → `Deploying Applications` →
`Building Applications` → `Running Applications on Dynos` → `Config Vars` →
`Releases` → `Dyno Manager` → `Add-ons` → `Logging and Monitoring` →
`HTTP Routing` → `Tying It All Together`.

Two of the twelve headings are not nouns: `What is an App?` (question) and
`Knowing What to Execute` (the *reader's* gerund, not the system's).

**The `Terminology:` callout is the core teaching device** `[observed]`

Definitions are pulled out of the prose into labelled callouts, and — crucially
— the same term is redefined three times as the article earns each addition:

1. `**Terminology** (Preliminary): Apps consist of your source code and a description of any dependencies`
2. `**Terminology**: Apps consist of your source code, a description of any dependencies, and a Procfile.`
3. Releases: `(Preliminary)` "an append-only ledger of your app's build artifact and config vars" → later "build artifact, config vars and add-ons"

The `(Preliminary)` marker is doing real work: it licenses a definition the
writer knows is incomplete, and signals a later correction. A second marker,
`**Advanced**:`, is used once (for buildpacks) to flag skippable depth.
`Tying It All Together` then re-lists every definition split into two buckets,
`Deploy` and `Runtime`. This is a genuinely strong and rarely-copied structure.

**Onboarding step language elsewhere** `[observed]`: the closing section is
`Next Steps` (two bullets), and a blog title on the home page uses the
`in 3 Easy Steps` frame (`How To Set Up a Staging Environment on Heroku in 3
Easy Steps`). No numbered in-product progress language is publicly visible.

## T5 Form & field labels

`[absent]` for true form UI — signup, dashboard, and the deploy flow are behind
auth and were not attempted.

What is publicly observable instead is the **config-var and file-name vocabulary
that functions as Heroku's field layer** `[observed]`:

| Name | Role |
|---|---|
| `Procfile` | Declares `process types`; lines are `web:` and `queue:` |
| `web` / `queue` / `worker` / `run` | Process-type names; `web` is privileged (receives HTTP) |
| `heroku` | The conventional git remote name |
| `ERROR_PAGE_URL` | Config var pointing at a custom error page |
| `MAINTENANCE_PAGE_URL` | Config var pointing at a custom maintenance page |
| `$PORT` | The value a web process must bind to |
| `REDIS_URL` | Auto-injected on add-on provisioning |
| `project.toml` | CNB configuration file |
| `stack` | Value is a base-image name (`heroku-24`) or literally `cnb` |

**Pricing table column labels** `[observed]`:
`Dyno Type` · `Price / Month` · `RAM` · `Compute` · `vCPUs` ·
`Requires Private Space` · `Dyno Family` · `Supporting Links` · `More Details`.
Note `Compute` is expressed as a bare multiplier (`1x-4x`, `12x`, `100x`) with
no unit and no gloss anywhere on the page — the one place Heroku abandons its
own explain-the-jargon rule. On the Fir table the same concept becomes `vCPUs`,
so the two tables measure the same thing in two incompatible units.

Postgres columns add `Connection Limit`, `Disk Size`, `Plan Tier`.

## T6 Status & state language

This is one of the two strongest categories for this product. Heroku's state
names are visible because the docs quote log lines verbatim.

**Dyno lifecycle state names, quoted from log transcripts** `[observed]`

| State | Seen in |
|---|---|
| `created` | `State changed from created to starting` (R10 transcript) |
| `provisioning` | `State changed from provisioning to starting` (R17 transcript) |
| `starting` | Multiple transcripts |
| `up` | `State changed from starting to up` (R13 transcript); `heroku ps` output `web.1: up` |
| `down` | `State changed from down to starting` (H10 transcript) |
| `crashed` | `State changed from starting to crashed` (R10, R17) |
| `quarantined` | H34: the router "quarantines that dyno for 5 seconds" |
| `sleeping` | Eco dynos: "its apps running these dynos are sleeping" |

**The canonical status string shape is `State changed from <a> to <b>`.**
Every transition is logged as a sentence with both endpoints named. A user
debugging reads the *edge*, not the node. That is a materially better status
model than a bare current-state badge and it transfers directly.

**Naming inconsistency, recorded** `[observed]`: the H10 transcript shows
`from down to starting` while R10 shows `from created to starting` — two
different names for the pre-start condition, and `down` never appears in any
prose definition. H14's log line reads `desc="No web processes running"` while
the article heading for the same code reads `H14 - No web dynos running` —
**process vs dyno in the same error's title and payload.**

**Process / formation vocabulary** `[observed]`:
`process type` · `dyno formation` ("the total number of dynos currently
running, divided between the various process types you have scaled") ·
`dyno manager` · `one-off dyno` · `attached` / `detached` ·
`Awaiting client` (a log-line state for `heroku run`).

**Release states** `[observed]`: releases are an `append-only ledger`, numbered
`v102`, `v103`, `v104`, with event verbs in the ledger itself:
`Deploy 582fc95` and `Rollback to v102`. The rollback *creates a new forward
release* (`v104 Rollback to v102`) rather than reverting the counter — the
history is immutable and the UI copy shows it.

**Platform-level non-error states that still get error codes** `[observed]`

`H80 - Maintenance mode` · `H81 - Blank app` ·
`H83 - Planned Service Degradation`. The docs say of each, "This is not an
error, but we give it a code for the sake of completeness." Heroku deliberately
issues identifiers to *benign* states so that every observable condition is
addressable. H80's log line is emitted at `at=info`, not `at=error`, and the
docs note: "Note the log formatting is the same but without the word 'Error'."
**Severity is encoded in a field (`at=info` / `at=warning` / `at=error`)
separately from the code**, so H27 and H28 are `at=warning` while H10 is
`at=error` — three severity tiers inside one taxonomy.

**Generation / architecture states** `[observed]`: `Cedar` and `Fir` are named
platform generations, and roughly 15 of the 44 error codes carry a scoping
sentence of the form "X errors aren't currently emitted for Fir-generation
apps" — or, more finally, "R15 errors aren't planned for Fir-generation apps."
**Heroku distinguishes "not yet" from "never" in the error reference itself.**
That distinction is normally buried in a roadmap.

**HTTP status codes used as state vocabulary** `[observed]`: `503`, `502`,
`499`, `495`, `421`, `417`, `400`, `200` all appear mapped to specific codes —
e.g. H27/H28 return `499`, H32 returns `495`, H31 returns `421`, H26 returns
`417` or `400`. A reader can route from the browser-visible number to the
platform code.

**Status page** `[absent]` — see Caveats. Both status surfaces returned no
content, so component names and incident-severity vocabulary could not be
harvested. The footer links to `Status` at
`status.salesforce.com/products/Heroku` while the legacy `status.heroku.com`
still resolves (to an empty JS shell), so there are **two live status URLs with
no redirect between them.**

## T7 Error, failure & recovery

The strongest category in this file, and the reason Heroku is in this corpus.

**A three-family, letter-prefixed, numbered error taxonomy** `[observed]`

The scheme is stated in one sentence before any code appears: "Each type of
error gets its own error code, with all HTTP errors starting with the letter H
and all runtime errors starting with R. Logging errors start with L."

| Family | Meaning | Codes observed |
|---|---|---|
| `H` | HTTP / router | H10–H15, H17–H22, H24–H28, H31–H34, H80–H83, H99 |
| `R` | Runtime / dyno | R10, R12–R17, R99 |
| `L` | Logging | L10–L15 |

Numbering is **banded by semantics, not sequential**: H10-series = app/request
failures, H80-series = deliberate platform states, H99/R99 = "the platform's
own fault". `H99 and R99 are the only error codes that represent errors in the
Heroku platform` — and that sentence is printed twice, once under each code.
The reserved-`99` convention means a reader can tell whose fault it is from the
number alone.

**Full code→title inventory** `[observed]` (titles verbatim)

`H10 - App crashed` · `H11 - Backlog too deep` · `H12 - Request timeout` ·
`H13 - Connection closed without response` · `H14 - No web dynos running` ·
`H15 - Idle connection` · `H16 - (No Longer in Use)` ·
`H17 - Poorly formatted HTTP response` · `H18 - Server Request Interrupted` ·
`H19 - Backend connection timeout` · `H20 - App boot timeout` ·
`H21 - Backend connection refused` · `H22 - Connection limit reached` ·
`H23 - (No longer in use)` · `H24 - Forced close` · `H25 - HTTP Restriction` ·
`H26 - Request Error` · `H27 - Client Request Interrupted` ·
`H28 - Client Connection Idle` · `H31 - Misdirected Request` ·
`H32 - TLS Certificate Mismatch` · `H33 - HTTP/2 Stream Broken` ·
`H34 - All up dynos are quarantined` · `H80 - Maintenance mode` ·
`H81 - Blank app` · `H82 - You've used up your dyno hour pool` ·
`H83 - Planned Service Degradation` · `H99 - Platform error` ·
`R10 - Boot timeout` · `R12 - Exit timeout` · `R13 - Attach error` ·
`R14 - Memory quota exceeded` · `R15 - Memory quota vastly exceeded` ·
`R16 - Detached` · `R17 - Checksum error` · `R99 - Platform error` ·
`L10 - Drain buffer overflow` · `L11 - Tail buffer overflow` ·
`L12 - Local buffer overflow` · `L13 - Local delivery error` ·
`L14 - Certificate validation error` ·
`L15 - Tail buffer temporarily unavailable`

**Retired codes are kept as tombstones.** `H16 - (No Longer in Use)` and
`H23 - (No longer in use)` remain in the table of contents with the body
"Heroku no longer emits H16 errors." A user who finds an old H16 in a Stack
Overflow answer lands somewhere. Note the **casing inconsistency between the
two tombstones** (`No Longer` vs `No longer`) and that H23 alone preserves the
dead title in its body text ("Endpoint misconfigured"). Gaps at H29, H30 and
R11 are silent — never allocated or never documented, not said which.

**Title grammar — four shapes, and the choice is meaningful**

| Shape | Examples |
|---|---|
| Bare noun phrase (state of the world) | `Request timeout`, `Idle connection`, `Blank app`, `Detached` |
| Agent-named noun phrase | `Client Request Interrupted` vs `Server Request Interrupted` |
| Full clause | `App crashed`, `No web dynos running`, `All up dynos are quarantined` |
| Second person | `You've used up your dyno hour pool` |

The `Client…` / `Server…` pair (H27/H18) is the notable one: two
near-identical failures differentiated **only by which party is at fault**, and
the log line carries a matching `sock=client` / `sock=backend` field. Heroku
also blames *itself* in plain words where true — "this one does not require
action from you" (H99/R99).

`H82 - You've used up your dyno hour pool` is the single second-person title in
44, and it is the one about money. Register shifts to direct address precisely
where the user must act on their own account.

**Severity encoded by adverb, not by number** `[observed]`:
`R14 - Memory quota exceeded` vs `R15 - Memory quota vastly exceeded`. "Vastly"
is the whole difference, and the consequence is spelled out: R14 swaps and
degrades, R15 is "forcibly killed with `SIGKILL` (which cannot be caught or
handled)". Naming two tiers of the same failure with an intensifying adverb is
cheap, memorable, and better than `R14a`/`R14b`.

**Each entry follows a fixed five-part shape** `[observed]`

1. Optional generation-scope caveat ("aren't currently emitted for Fir…")
2. Cause in one or two sentences, in the platform's voice
3. A verbatim log transcript with the real field format
4. Resolution — often with the literal command (`$ heroku ps:scale web=1`)
5. Escalation links (language-specific deep-dives, support, status)

The log transcript is the load-bearing element: the user is matching the string
in front of them, so the doc shows the string. Several entries include
**multi-line transcripts that narrate the failure in sequence** (R10 shows
`State changed from created to starting` → `Starting process…` →
`Error R10 (Boot timeout) -> Web process failed to bind to $PORT within 60
seconds of launch` → `Stopping process with SIGKILL` → `Process exited` →
`State changed from starting to crashed`). Six log lines as a causal story.

**Sub-causes are named, not left to the reader** `[observed]`

H25 has four named types, each with its own `desc` string:
`HTTP restriction: invalid content length` · `oversized cookie` ·
`oversized header` · `oversized status line`.
H26 exposes a separate `cause=` field: `unsupported expect header value` ·
`bad header` · `bad chunk`. **One code, a `cause` sub-field, human-readable
values.** That is a better design than minting H26a/H26b and better than a
single vague code.

**Every timeout is stated as a number, and the numbers are reconciled** `[observed]`

`30 seconds` (H12 request) · `55 seconds` (H15/H28 idle) · `5 seconds`
(H19 connect, and the H34 quarantine window) · `75 seconds` (H20 router
enqueue, and H34 retry budget) · `60 seconds` (R10 port bind) · `90 seconds`
(R10 for Java/Gradle) · `30 seconds` (R12 SIGTERM grace) · `10 attempts`
(H34 retries) · `1024 messages` / `1500 lines` (Logplex buffers) ·
`512kb` / `8kb` (H25 limits).

H20 vs R10 is the standout: the docs pre-empt the obvious confusion between two
boot timeouts by explaining the difference — "the H20 75-second timeout includes
platform tasks such as internal state propagation… The R10 60-second timeout
applies solely to application startup tasks." **Two adjacent numbers plus an
explicit reconciliation paragraph.** This is exactly the disclosure most
products omit.

**Recovery language is graded by who can act** `[observed]`

- User can fix: literal command shown — `$ heroku ps:scale web=1` (H14)
- User can fix but shouldn't: the boot-timeout tool is offered and then
  discouraged in the same paragraph — "this should be considered a *temporary
  solution*" (H20, R10)
- Nobody can fix: "Try again in a minute, or check the status site" (H99/R99)
- Might not be a problem at all: H31 — "If you and your app users can
  successfully access the app in a browser… this may not be cause for concern."

That last one is rare and valuable: an error-reference entry that tells the
reader to **stop investigating**.

**Honest uncertainty** `[observed]`: H33 — "A misbehaving client or dyno can
cause this error and the router can't always determine which is at fault."
R15 — "occasionally the platform may shut down the dyno before the R15 is sent,
causing the error to be dropped." Heroku documents its own observability holes
inside the error reference.

**The user-facing failure page** `[observed]`, via the Error Pages article:
Heroku "serves unstyled HTML with HTTP status code 503 (Service Unavailable)".
Four named default pages exist —
`application-error.html`, `no-such-app.html`, `maintenance-mode.html`,
`ssl-cert-error.html` — and the boundary is drawn explicitly: "Other errors,
such as application errors (a 404 or 500), will display your application's
error page and not the Heroku error page." **The copy of those four pages could
not be retrieved** (see Caveats); their titles are recorded, their body text is
not, and is not guessed here.

**Build-time failure** `[observed]`: `Troubleshooting Buildpack Errors` has
exactly one section, `Missing File Failure`, explaining that a classic
buildpack is "permanently set for future pushes" once detected — so removing
`package.json` from a PHP app leaves it pinned to `heroku/nodejs` and it
"results in an error". The Buildpacks article names `Detection Failures` as a
concept with two listed causes (unsupported language; missing critical file).
Recovery is `heroku buildpacks:clear` or an explicit set.

**Support routing** `[observed]`: the `Troubleshooting & Support` category is
ten articles ordered system-first, user-last —
`Heroku Status` · `Heroku Error Codes` · `Error Pages` ·
`Understanding Heroku Postgres Log Statements and Common Errors` ·
`Request Timeout` · `Recovering an Offline Application` ·
`R14 - Memory Quota Exceeded in Ruby (MRI)` ·
`Wrong Version of Ruby or Rake in App` · `Paid Support` · `Support Channels`.

`Recovering an Offline Application` is the one user-emotional title.
`Wrong Version of Ruby or Rake in App` is a first-person-adjacent confession
shape. Human contact (`Paid Support`, `Support Channels`) is deliberately last
— and the first of the two is named by its *price*, not its function.

## T8 Empty states

`[observed]` — one, and it is an error code rather than a UI screen:

> `H81 - Blank app` — "No code has been pushed to this application. To get rid
> of this message you need to do one deploy."

Heroku models the first-run empty state as a **numbered platform state with a
recovery instruction**, served as a 502 page. "To get rid of this message" is
notably blunt phrasing — it addresses the user's annoyance rather than the
system's condition.

All dashboard empty states are behind auth. `[absent]`

## T9 Notifications & system messages

`[documented]` and thin, because notification UI is post-auth.

- **Log lines are the notification channel.** The `Logplex` model is described
  as "a single source of activity", and the canonical line format is exposed:
  `at=error code=H12 desc="Request timeout" method=GET path="/" host=… fwd=…
  dyno=web.1 connect=6ms service=30001ms status=503 bytes=0`. Field names
  (`at`, `code`, `desc`, `dyno`, `connect`, `service`, `status`, `bytes`,
  `request_id`, `cause`, `sock`, `protocol`, `agent`) are a message schema, and
  `at` carries the severity word (`info` / `warning` / `error`).
- **Dropped-message notices are themselves messages** `[observed]`:
  `Error L10 (output buffer overflow): 500 messages dropped since <timestamp>` ·
  `L11 (Tail buffer overflow) -> This tail session dropped 1101 messages since
  <timestamp>` · `Error L12: 222 messages dropped since <timestamp>` ·
  `Error L13: 111 messages lost since <timestamp>`.
  Note L13 says **`lost`** where L10/L11/L12 say **`dropped`** — the word
  changes when the loss was not a deliberate shed, which is a real semantic
  distinction, though nothing in the copy tells the reader that.
- **Lifecycle notices** `[observed]`:
  `Stopping process with SIGTERM` · `Stopping process with SIGKILL` ·
  `Process exited` · `Client connection closed. Sending SIGHUP to all
  processes` · `Process running mem=1028MB(103.3%)`. The memory notice carries
  both absolute and percentage-of-quota — the user never has to compute the
  ratio.
- **CLI confirmations** `[observed]`:
  `Adding config vars and restarting demoapp... done, v14` ·
  `Rolling back demoapp... done, v102` ·
  `Running \`bash\` attached to terminal... up, run.8963`.
  Consistent shape: present-participle gerund, ellipsis, `done`, then the
  resulting version or dyno name. The confirmation always returns an
  **identifier you can act on next**.
- `App Metrics` / "threshold alerts" are named as a paid-tier feature on the
  pricing page; the alert copy itself is not public. `[absent]`
- `[absent]`: emails, in-app banners, push.

## T10 Disclosures, legal & compliance

**Compliance is scoped per product, in a matrix** `[observed]`

Rows are products (`Heroku Shield Private Spaces`, `Shield Dynos`,
`Heroku Shield Postgres`, `Heroku Shield Connect`,
`Apache Kafka on Heroku Shield`, `Heroku Shield Key-Value Store`,
`Heroku Managed Inference and Agents`,
`Heroku Private Spaces (Cedar)`, `Heroku Private Spaces (Fir)`,
`Common Runtime`, `Heroku Postgres`, `Heroku Connect`,
`Apache Kafka on Heroku`, `Heroku Key-Value Store`, `Regions`); columns are
regimes (`PCI DSS Level 1 Service Provider`,
`HIPAA Protected Health Information`,
`ISO 27001, 27017, 27018 Security Management Controls, Cloud Specific
Controls, Personal Data Protection`,
`SOC 1, 2, 3 Security, Availability & Confidentiality Reports`).

Two things worth stealing. First, **each column header carries the regime name
*and* what it actually covers**, so the reader doesn't need to know what
ISO 27017 is. Second, the matrix is also rendered as a series of small
per-product tables with explicit `Yes` / `No` values — the responsive variant
**replaces filled dots with the word `No`**, which is far more accessible than
an absent glyph. The dot version says nothing where the word version says `No`.

**Certification blocks use a three-line shape** `[observed]`:
short name (`PCI DSS Level 1`) → what it protects (`Service Provider`,
`Protected Health Information`, `Cloud Specific Controls`,
`Internal controls over financial reporting systems`) → a two-to-three-sentence
plain definition. The user gets the acronym, the scope, and the meaning in that
order.

**Trust framed as a value statement, then hedged into process** `[observed]`:
"Trust is our number one value", followed by "we see compliance as the
byproduct of a relentless focus on security and engineering excellence." Four
benefit headings follow: `Simplify compliance` · `Data controls and privacy` ·
`Build on a trusted platform` · `Build apps for regulated industries`.

**Pricing disclosures are embedded in feature strings, not footnotes** `[observed]`

- Eco tier ends its feature list with two hard limits:
  `Personal accounts only` and `Sleeps after 30 minutes of inactivity`
- Basic's differentiator is the single word `Always on`
- Every non-Eco tier begins `Includes all <previous tier> features` — a
  cumulative-inheritance sentence instead of a repeated checklist
- Compute is billed in a coined unit, `Dyno Units / Month`
  (`0.28`, `1`, `8`, `16`, `30`, `60`, `72`) alongside the dollar price —
  **two currencies for one resource**, with no definition of the unit on the
  page
- Postgres Essential tiers disclose `Max downtime 4 hour per month`
  (sic — singular "hour"), `Shared RAM`, `Table Limit: 4,000 tables`, and
  `RAM: 0 Bytes`. **`0 Bytes` of RAM displayed as a spec value is a data
  defect**, and `Max downtime` as a positively-stated plan feature is an
  unusually candid disclosure
- Access gating stated plainly in docs: "We limit access to Performance dynos
  to customers with an established payment history."

**Operational-honesty disclosures inside docs** `[observed]`:
the ephemeral-filesystem warning is repeated in three places
("Any files written get discarded the moment the dyno stops or restarts,
including automatic restarts"); `project.toml` env vars carry
"don't use it for secrets"; dyno cycling is disclosed as routine
("dynos can be configured to be cycled at least once per day").

**Legal footer** `[observed]`: `Legal` · `Terms of Service` ·
`Privacy Information` · `Responsible Disclosure` · `Trust` ·
`Cookie Preferences` · `Your Privacy Choices` · `Sitemap`. All point at
`salesforce.com` or `trust.salesforce.com` — **the legal identity is
Salesforce, the product identity is Heroku**, and the footer is where the seam
shows. The logo alt text is literally `Heroku - from Salesforce`.

## T11 Help-centre architecture

Heroku runs **three separate support surfaces** and the docs are the primary one.

1. `Dev Center` (devcenter.heroku.com) — 19-category reference, article-first
2. `Help Center` (help.heroku.com) — described in nav as
   "Find answers to your questions in the Help Center. Browse FAQs, articles,
   and get support." Not fetched this pass
3. `Compliance Center` (heroku.com/compliance) — a third "Center"

Three products named `<X> Center` is itself a finding: the suffix is doing no
differentiating work.

**Dev Center home is four curated shelves, not the category tree** `[observed]`

| Shelf | Contents |
|---|---|
| `Heroku Essentials` | `Get Started`, `The Heroku CLI`, `Deploying with Git`, `The Procfile`, `Configuration and Config Vars` |
| `Recommended Features` | `Custom Domain Names for Apps`, `Heroku Postgres`, `Heroku Teams`, `Pipelines`, `Heroku CI` |
| `Debugging on Heroku` | `Logging`, `Heroku Error Codes`, `Application Metrics`, `Language Runtime Metrics`, `Production Check` |
| Language chips | Ten language filters above the shelves |

**`Debugging on Heroku` as a top-level shelf on the docs home page, with
`Heroku Error Codes` as its second item, is the headline IA decision here.**
Most platforms bury the error reference; Heroku promotes failure to one of four
things a new reader is shown. And the shelf is named for the *activity*
(`Debugging`) rather than the artefact (`Errors` / `Reference`).

Note `The Procfile` and `The Heroku CLI` take the definite article — the docs
treat these as singular known objects, a small register signal that the reader
is expected to already have heard of them.

**Article-title grammar — five shapes** `[observed]`

| Shape | Example |
|---|---|
| Noun + parenthetical gloss | `Dynos (App Containers)`, `Stacks (operating system images)` |
| `How X Works` | `How Heroku Works` |
| Gerund + object | `Deploying with Git`, `Managing Buildpacks`, `Developing Buildpacks` |
| `Troubleshooting <object>` | `Troubleshooting Buildpack Errors`, `Troubleshooting Java Apps` |
| Code + dash + title | `R14 - Memory Quota Exceeded in Ruby (MRI)` |

The last shape is worth noting: a help-article title that **leads with the
error code the user is holding**, so the code is the search key.

**Per-article furniture, consistent across every Dev Center page** `[observed]`:
breadcrumb trail (`Heroku Architecture` → `Compute (Dynos)` →
`Dynos (App Containers)`) · `Table of Contents [expand]` ·
`Last updated <Month DD, YYYY>` · `Additional Reading` ·
`Next Steps` (on tutorial-shaped pages) · `Feedback` ·
`English — 日本語に切り替える`.

**The `Last updated` date is on every article** and the dates are recent
(`September 18, 2026` for error codes; `September 11, 2026` for buildpacks;
`August 21, 2026` for dynos). Publishing freshness per article, prominently, is
a strong trust device for a reference corpus.

## T12 FAQs

`[absent]` on every page harvested. Neither the home page, the pricing page,
nor any Dev Center article carries an FAQ block or accordion. The only
acknowledgement of the form is a nav description — "Browse FAQs, articles, and
get support" — pointing at `help.heroku.com`, which was not fetched in this
pass.

This is itself a finding: a mature developer platform choosing a
**reference-and-troubleshooting architecture over a Q&A architecture.** The
work an FAQ would do is instead carried by (a) the error-code reference,
(b) the `Terminology:` callouts in `How Heroku Works`, and (c) the
`Troubleshooting <object>` article family. Recorded as absent rather than
inferred.

## T13 Terminology & glossary

The richest coined-term set in this batch. Heroku's vocabulary is ~15 years old
and much of it escaped into general industry use.

| Term | How Heroku defines it for a newcomer | What plainer word it displaced |
|---|---|---|
| `dyno` | "Heroku-managed Linux containers that provide secure, scalable compute"; earlier framing "isolated, virtualized Unix containers, that provide the environment required to run an application"; article title glosses it as `Dynos (App Containers)` | container / instance / server / VM. Predates Docker, so there was no standard word to displace — Heroku had to mint one, and now pays for it by glossing it in the title |
| `dyno formation` | "the total number of dynos currently running, divided between the various process types you have scaled" | instance count / replica count. A collective noun for a *shape*, not a number |
| `dyno manager` | "responsible for keeping dynos running" | scheduler / orchestrator / supervisor |
| `Dyno Units` | Undefined anywhere on the pricing page; used as a billing quantity | vCPU-hours / compute credits. **The one coined term Heroku fails to gloss** |
| `buildpack` | "a set of scripts that transform code into a deployable artifact with minimal configuration" | build script / builder image. Escaped Heroku entirely and became the CNCF `buildpacks.io` standard |
| `slug` | "a bundle of your source, fetched dependencies, the language runtime, and compiled/generated output of the build system, ready for execution" | build artifact / tarball / image. Being retired — Fir uses `OCI image` — and the docs now use the umbrella `build artifact` with slug as one of two cases |
| `build artifact` | Introduced explicitly as an umbrella: "The term 'build artifact' is used to describe both types of buildpack-specific artifacts" | The newer, plainer term *replacing* a coined one. Reverse migration, and a rare thing to catch in progress |
| `release` | "an append-only ledger of your application's build artifact, config vars and add-ons" | version / deployment. Defined three times, each more complete |
| `config var` | "customizable configuration data that can be changed independently of your source code… exposed to a running application via environment variables" | environment variable. Heroku renamed the thing and then explains it *as* the thing it renamed |
| `add-on` | "third party, specialized, value-added cloud services that can be easily attached to an application" | plugin / integration / managed service. "attached resources" is the mental model |
| `Procfile` | "list process types — named commands that you want executed" | start command / entrypoint. A filename as a product noun, always with `The` |
| `process type` | "a named command that can be executed against your built application" | service / role / worker class |
| `one-off dyno` | "temporary dynos that can run with their input/output attached to your local terminal" | task / job / exec session |
| `Logplex` | "a high-performance, real-time system for log delivery" that "collates log entries from all the running dynos… providing a single source of activity" | log aggregator |
| `log drain` | "an API for receiving the output from Logplex" | log forwarder / sink. `drain` also names an error family (`L10 - Drain buffer overflow`) |
| `stack` | An operating-system base image; the category label spells it out as `Stacks (operating system images)`. Value is either `heroku-24` or literally `cnb` | base image / OS version. **Overloaded** — "stack" also means language stack in "customize your language stack with buildpacks" on the same site |
| `Cedar` / `Fir` | Named platform *generations*, used as scoping qualifiers throughout the error reference | v1 / v2 / legacy / next-gen. Tree names carry no ordering, so the docs must say "next platform generation" to establish which is newer |
| `Common Runtime` vs `Private Spaces Runtime` | Shared-tenancy vs network-isolated dedicated runtime | multi-tenant / single-tenant / VPC |
| `Private Space` / `Shield Space` | Dedicated runtime environment; Shield adds compliance controls | VPC / isolated tenant. `Shield` is the compliance brand and appears as a tier prefix across seven products |
| `Eco` / `Basic` / `Standard` / `Performance` / `Private` / `Shield` | Six dyno tiers, then suffixed by size (`-S`, `-M`, `-L`, `-L-RAM`, `-XL`, `-2XL`, `-1X`, `-2X`) | free/hobby/pro. Two orthogonal axes (tier × size) collapsed into one hyphenated SKU string; `Performance-L-RAM` needs three segments |
| `Pipelines` / `Review App` | Named CD objects; "Every pull request can spin up a disposable Review App" | staging environment / preview deployment. `Review App` is the ancestor of every "preview URL" feature shipped since |
| `Heroku Flow` | Brand name for the CD product; the docs category is `Continuous Delivery & Integration (Heroku Flow)` | The gloss is *inverted* here — the generic term leads, the brand is parenthetical, the opposite of `Dynos (App Containers)` |
| `Dataclips` | Exposed in the account nav with no definition on any page harvested | saved query / shared query result |
| `Heroku Elements` | Umbrella for `Add-ons`, `Buildpacks`, and `Buttons` | marketplace |
| `Heroku Success` | The support product | support plans |
| `Preboot` / `Rolling Deploys` / `Fast Rollback` | Named deploy behaviours; "instantly rollback your code or Postgres data to an earlier state" | zero-downtime deploy / blue-green |
| `Heroku Key-Value Store` | "The Redis you love" — a renamed product that names the thing it replaced in its own tagline | Heroku Redis. Trademark-driven rename handled by keeping the old word in the marketing line |

**Register split.** Marketing says `smart containers`, `The Redis you love`,
`Black Friday-ready`; docs say `Heroku-managed Linux containers`. The
colloquialism is confined to the feature grid and vanishes entirely in the
error reference and the compliance matrix — the same stakes-gradient the Wise
exemplar records.

**The signature Heroku terminology move**, and the transferable one: the coined
term and its translation ship *in the same string*. `Dynos (App Containers)`,
`Stacks (operating system images)`, `Compute (Dynos)`,
`Heroku Key-Value Store` / "The Redis you love",
`Heroku Connect (Salesforce sync)`. Heroku cannot abandon the coinages —
fifteen years of URLs, CLI flags and Stack Overflow answers depend on them — so
it pays the gloss tax forever, in the label rather than in a tooltip.

## T14 Voice, tone & accessibility

**Person and tense.** Docs are second person for the user, first-person plural
for the platform — "we automatically detect the correct buildpack",
"We limit access to Performance dynos", "we give it a code for the sake of
completeness". Notably the first person plural is used for *policy decisions*
and *restrictions*, not just capabilities. A named actor takes responsibility
for the limit.

**Register.** Flat, declarative, present tense. Contractions are used in docs
("doesn't", "can't", "aren't") but the marketing page is markedly more
contraction-light. Zero `Oops!`. Zero exclamation marks anywhere in the error
reference. The one exclamation mark on the whole harvest is the promo bar
(`Sign Up Now!`), and the one on the home page's closing language
("using the tools and languages you already love!").

**The tone gradient is real and steep.** Home page: "Build Your Next Big Thing",
"Black Friday-ready enterprise ecommerce sites", "smart containers". Error
codes: "the dyno will be forcibly killed with `SIGKILL` (which cannot be caught
or handled) by the platform." The second sentence is the correct register for
its context and the product does not soften it.

**Uncertainty and self-blame are stated plainly.** "the router can't always
determine which is at fault" (H33); "occasionally the platform may shut down the
dyno before the R15 is sent, causing the error to be dropped" (R15);
"this one does not require action from you" (H99). Also *de-escalation* —
"this may not be cause for concern" (H31).

**Italics used for emphasis on a caveat**: "this should be considered a
*temporary solution*" — the emphasis lands on the hedge, not the offer.

**Numbers are always specific.** `150+ third-party add-ons`,
`380+ open source buildpacks`, `ten global regions`, every timeout in seconds,
every memory figure with a percentage. No rounded marketing numbers in the
technical copy.

**Accessibility** `[observed]`

- `Skip Navigation` is first in the Dev Center DOM, anchored to `#skip-link`.
  **The marketing site has no equivalent skip link in the fetched HTML** — an
  inconsistency between the two surfaces.
- Alt text on the marketing site is short, functional and label-like:
  `Dashboard icon`, `Node.js logo`, `Java Duke`, `Bonobos Logo`,
  `Hero Data`, `Dyno Icon`.
- Compliance-badge alt text is genuinely descriptive and unusually good:
  "PCI Security Standards Council logo with a green globe. Text reads
  'Participating Organization." · "Blue HIPAA logo featuring a caduceus with
  wings and a star." · "Logo displaying 'ISO 27001 Certified by Schellman' in
  blue with a checkmark inside an eye symbol." Someone wrote these by hand.
  **Two of them have an unclosed quotation mark** (`Organization.` with no
  closing quote; `caduceus` block fine) — a small copy defect in otherwise
  exemplary alt text.
- Several decorative images carry empty alt (`![](…)` with `title=""`) beside
  their own link text — defensible.
- The compliance matrix's dot glyph (`⬤`) conveys "yes" with **no text
  equivalent in the wide table**; the narrow-viewport variant supplies
  `Yes` / `No` words. Whether a screen reader gets the accessible version
  depends on CSS/viewport — flagged as a suspected barrier, not confirmed.
- `Table of Contents [expand]` puts a control label inside a heading in square
  brackets — likely a rendering artefact of a disclosure widget, and reads
  oddly linearised.
- Visible raw URLs as link text on `/start`
  (`/articles/getting-started-with-nodejs` rendered beside the label) produce
  duplicate adjacent links to one destination.

**Language availability** `[observed]`: every Dev Center article carries
`English — 日本語に切り替える`, with the switch offered *in the target language*.
Japanese is the only alternative. The marketing site offers no language switch.

**Negative findings, recorded honestly**

- `Log in` / `Sign up` (Dev Center) vs `Login` / `Sign Up` (marketing) —
  one action, two spellings, two casings
- Six different labels for account creation across the site
- `H14 - No web dynos running` (title) vs `desc="No web processes running"`
  (payload) — process/dyno conflated inside one error
- `State changed from down to starting` vs `from created to starting` — two
  names for the pre-start state, only one of them ever defined
- `H16 - (No Longer in Use)` vs `H23 - (No longer in use)` — casing
- `dropped` (L10/L11/L12) vs `lost` (L13) for log-message loss, with no
  explanation of the distinction
- `Compute` in `1x-4x` multipliers (Cedar) vs `vCPUs` (Fir) for the same
  resource on the same page
- `Dyno Units / Month` billed but never defined
- Postgres Essential shows `RAM: 0 Bytes` and `Max downtime 4 hour per month`
  (singular "hour")
- Rails 6.x guide title and its `Start this guide` button point at different
  articles (rails6 vs rails5)
- Two live status URLs (`status.heroku.com`, `status.salesforce.com/products/Heroku`)
  with no redirect; both render nothing without JavaScript
- `Feedback` on every doc page is `Log in to submit feedback.` — the feedback
  loop on the *public* documentation requires an account, which excludes exactly
  the evaluating-newcomer reader the docs are written for
- Three distinct products named `… Center` (Dev, Help, Compliance)
- The site-wide closing CTA ("great data-driven applications") is reused on the
  compliance page where data-driven is not the topic

---

## Transferable patterns

1. **Number every observable state, including the benign ones.** Heroku assigns
   codes to `H80 - Maintenance mode` and `H81 - Blank app` explicitly "for the
   sake of completeness", and reserves `99` in every family for "our fault, not
   yours". A user can name any condition they are in, and can tell from the
   number whether to act. Transfers to any payment or KYC state machine where
   users currently say "it just says pending" — give pending an addressable
   identifier and publish it.
2. **Ship the coined term and its plain translation in the same string.**
   `Dynos (App Containers)`, `Stacks (operating system images)`. Condition: only
   worth the ongoing cost when the coinage is load-bearing in URLs, APIs and a
   decade of third-party answers. If you can still rename, rename.
3. **Log the transition, not the state.** `State changed from starting to
   crashed` tells the user more than a `crashed` badge, because the previous
   state is the diagnosis. Applies directly to transaction, dispute, and
   onboarding status surfaces.
4. **Reconcile adjacent numbers the user will inevitably compare.** H20's
   75 seconds and R10's 60 seconds get an explicit paragraph explaining what
   each includes. Any product with two timeouts, two fee schedules, or two
   arrival estimates should write that paragraph rather than let the user
   discover the conflict.
5. **Split one error code by a human-readable `cause` field instead of minting
   sub-codes.** H26 stays H26 and carries `cause="bad chunk"`. Keeps the
   taxonomy small and the payload specific.
6. **Grade the recovery by who can act, and say "stop looking" when that is the
   answer.** Four distinct registers: here's the command; here's the escape
   hatch but don't rely on it; nobody can fix this, retry; this may not be a
   problem at all. The fourth is the rarest and the most humane.
7. **Promote failure to the top of the docs home.** `Debugging on Heroku` as
   one of four shelves, named for the activity rather than the artefact. Cheap
   IA change, large signal about who the docs are for.
8. **Use `(Preliminary)` on a definition you intend to correct.** The
   `Terminology:` callouts in `How Heroku Works` redefine `app` and `release`
   progressively and flag the incompleteness. Licenses a simple first pass
   without misleading the reader — directly applicable to explaining layered
   financial products.
9. **Distinguish "not yet" from "never" in the reference itself.** "aren't
   currently emitted for Fir" vs "aren't planned for Fir". Two words of
   difference, and it saves the reader a support ticket.
10. **Name limits as features.** `Sleeps after 30 minutes of inactivity`,
    `Personal accounts only`, `Max downtime 4 hour per month` sit in the plan
    feature list, not a footnote. Uncomfortable, and it pre-empts the
    disappointed upgrade.

## Caveats & gaps

- **Both status surfaces are unreachable.** `https://status.heroku.com/` returns
  an Ember shell with no server-rendered content; the footer's canonical
  `https://status.salesforce.com/products/Heroku` returns "You need to enable
  JavaScript to run this app." **T6 incident-communication vocabulary,
  component names, and severity labels are therefore `[absent]`, not inferred.**
  A browser-rendered pass is required.
- **The four default error/maintenance page HTML files
  (`application-error.html`, `no-such-app.html`, `maintenance-mode.html`,
  `ssl-cert-error.html` on `www.herokucdn.com`) returned empty bodies** to the
  fetcher. Their filenames and purpose are recorded; the actual user-facing
  copy — which would be the highest-value T7/T8 strings on the platform — is
  not, and is not guessed.
- `https://devcenter.heroku.com/articles/dyno-states` returned no content
  (likely not a real path). Dyno state names in T6 are taken from **log
  transcripts quoted inside other articles**, so they are `[observed]` as
  strings but the canonical state list may be incomplete. `down`, in
  particular, appears once in a transcript and is never defined in prose.
- **`help.heroku.com` (the Help Center) was not fetched**, so T12 FAQs are
  marked `[absent]` on the strength of the twelve pages harvested. The nav
  description implies FAQs exist there. This is the single biggest gap in the
  file and the first thing a second pass should close.
- All dashboard UI is post-auth: real form labels, validation text, toasts,
  empty states, and the deploy-progress UI are unharvested. T5 and T8 are
  consequently thin, and T9 is documented rather than observed.
- The Heroku CLI's own strings are only visible as **doc-authored transcripts**,
  which may be idealised or stale (several carry 2010–2016 timestamps). Treat
  CLI quotes as `[documented]`, not as verified current output.
- Only one of ~30 pricing rows was read in full detail; the AI and Kafka
  pricing sections, and the Fir Postgres plans, were skimmed. Plan-tier names
  are complete for dynos and Postgres Essential only.
- Japanese localisation exists for the whole Dev Center and was not compared.
  Any claim about register here is en-US only.
- `Dataclips`, `Heroku Flow`, `Production Check` and `Pipelines` are named but
  their own articles were not opened; their definitions in T13 are marked as
  undefined where that is the case rather than filled in.

## Sources

1. https://www.heroku.com/
2. https://www.heroku.com/pricing/
3. https://www.heroku.com/compliance
4. https://devcenter.heroku.com/
5. https://devcenter.heroku.com/start
6. https://devcenter.heroku.com/articles/error-codes
7. https://devcenter.heroku.com/articles/error-pages
8. https://devcenter.heroku.com/categories/troubleshooting
9. https://devcenter.heroku.com/articles/dynos
10. https://devcenter.heroku.com/articles/how-heroku-works
11. https://devcenter.heroku.com/articles/buildpacks
12. https://devcenter.heroku.com/articles/troubleshooting-buildpack-errors

Attempted and blocked (no content returned):
13. https://status.heroku.com/ — client-rendered, empty server HTML
14. https://status.salesforce.com/products/Heroku — "You need to enable JavaScript to run this app."
15. https://www.herokucdn.com/error-pages/application-error.html — empty body
16. https://www.herokucdn.com/error-pages/no-such-app.html — empty body
17. https://www.herokucdn.com/error-pages/maintenance-mode.html — empty body
18. https://www.herokucdn.com/error-pages/ssl-cert-error.html — empty body
19. https://devcenter.heroku.com/articles/dyno-states — no content (path likely invalid)
