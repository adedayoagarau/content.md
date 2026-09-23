# 035. Docker

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Containerization tooling / local developer runtime + image registry |
| Primary URL | https://www.docker.com/ |
| Corpus rank | 035 |
| Benchmark strength (source list) | Conceptual onboarding and troubleshooting |
| Locale / market observed | en-US (a `日本語` footer switch exists on the marketing site) |
| Platform observed | Web (marketing), docs, status page, desktop-app UI labels quoted inside docs |
| Regulatory posture | SOC 2, ISO 27001, ISO 27701, GDPR, CCPA (self-declared on `/trust/`); Trust Center access is **NDA-gated** |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Full — the status page, glossary, and troubleshooting pages all rendered server-side. Docker Desktop's own UI strings are `[documented]` via docs screenshots and instructions, not `[observed]` |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://www.docker.com/ | Hero, nav flyouts (including the full pricing card set), simulated-terminal copy |
| Pricing FAQ | https://www.docker.com/pricing/faq/ | **Richest FAQ in this batch — ~35 verbatim questions in 7 groups** |
| Trust | https://www.docker.com/trust/ | Four trust pillars, NDA-gated Trust Center |
| Docs home | https://docs.docker.com/ | Question-led search entry, four-section IA, `What's new` feed |
| **Glossary** | https://docs.docker.com/reference/glossary/ | 15 terms with verbatim definitions; nav also exposes the 21 named build-check rules |
| What is a container? | https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/ | The core conceptual-onboarding artefact |
| Troubleshoot (Desktop) | https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/ | `Troubleshoot` menu labels, diagnostics ID flow |
| **Troubleshoot topics** | https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/ | 17 named failure modes, each with a fixed Error message → Cause → Solution shape |
| Known issues | https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/known-issues/ | Platform-tabbed list of unfixed defects |
| `docker container ls` reference | https://docs.docker.com/reference/cli/docker/container/ls/ | **The canonical seven container states, with definitions** |
| Status | https://www.dockerstatus.com/ | 20 named components in 4 groups; incident.io-hosted |

---

## T1 Navigation & IA labels

**Marketing nav — five items, with a pricing table inside the nav** `[observed]`

`Products` · `Support` · `Pricing` · `Blog` · `Docs`

The `Pricing` item does not link out to a page in the flyout — it **renders the
entire four-tier pricing card set, with a `Yearly` / `Monthly` toggle and live
`Buy now` links, inside the dropdown.** A transaction surface in a nav menu.
Unusual and worth flagging: the toggle state in the nav is independent of the
pricing page, so a user can be shown two different prices for one plan in one
session.

**`Products` flyout is grouped by problem, not product family** `[observed]`

| Group | Items |
|---|---|
| `AI and Agents` | `Docker Sandboxes` · `AI Governance` · `MCP Enterprise Gateway` · `Gordon` · `Docker Model Runner` |
| `Application Security` | `Docker Hardened Images` · `Docker Scout` |
| `Application Development` | `Docker Desktop` · `Docker Hub` · `Docker Offload` |

Four of the five AI items carry a `New` badge. The ordering puts AI first and
`Docker Desktop` — the thing almost every visitor actually came for — seventh.
Each item has a five-to-seven-word scope line: `Containerize your
applications`, `Discover and share container images`,
`Break free of local constraints`, `Simplify the software supply chain`,
`Your AI Agent across Docker`.

**`Support` flyout is labelled `Support` but contains only `Developers` links** `[observed]`

`Documentation` · `Getting Started` · `Resources` · `Training` ·
`Extensions SDK` · `Community` · `Open Source` · `Preview Program` ·
`Customer Stories`

**A nav item called `Support` with no route to support in it** — no contact,
no ticket, no help centre. The actual support path (`app.docker.com/support`)
appears only inside a troubleshooting doc. Recorded as a defect.

**Docs IA — four sections, split by what the reader is doing** `[observed]`

| Section | Scope line (verbatim) |
|---|---|
| `Get started` | "Containerize an app, sandbox an agent, or pilot Docker for your organization." |
| `Guides` | "Optimize your development workflows with Docker." |
| `Manuals` | "Install, set up, configure, and use Docker products." |
| `Reference` | "Browse the CLI and API documentation." |

This is a clean implementation of the Diátaxis split (tutorial / how-to /
explanation / reference) without naming it. `Manuals` for
"install and configure" and `Guides` for "optimize your workflow" is the one
pair a reader could plausibly confuse.

**`Get started` sub-tree** `[observed]`:
`Tutorials` (`Containerize an application`, `Sandbox a coding agent`,
`Pilot an organization rollout`) · `Get Docker` · `What is Docker?` ·
`Docker concepts` · `Educational resources`.

`Docker concepts` then splits three ways, and the split is the notable IA move:

- `The basics` — four pages, all phrased as questions:
  `What is a container?` · `What is an image?` · `What is a registry?` ·
  `What is Docker Compose?`
- `Building images` — `Understanding the image layers` ·
  `Writing a Dockerfile` · `Build, tag, and publish an image` ·
  `Using the build cache` · `Multi-stage builds`
- `Running containers` — `Publishing and exposing ports` ·
  `Overriding container defaults` · `Persisting container data` ·
  `Sharing local files with containers` · `Multi-container applications`

**The basics are questions; everything after is gerunds.** The register shifts
from "what is this thing" to "doing this thing" at exactly the point the reader
stops being a newcomer. That is the most transferable IA decision in this file.

**Per-page furniture in docs** `[observed]`: breadcrumb
(`Home / Get started / Docker concepts / The basics / What is a container?`) ·
`Ask Gordon` · `Copy Markdown` · `View Markdown` · `Table of contents` ·
`Additional resources` · `Next steps`.

`Copy Markdown` / `View Markdown` beside every article, plus `llms.txt` and
`llms-full.txt` in the footer, is Docker treating **LLM consumption as a
first-class output format** and saying so in the UI.

**Marketing footer groupings** `[observed]`: `Products` · `Features` ·
`Developers` · `Pricing` · `Company` · `Languages`. `Languages` contains only
`English` and `日本語`. `Docker System Status` sits in `Company`, as does
`Swag Store`, `Brand Guidelines`, `Trademark Guidelines`.

**Defect** `[observed]`: the footer links `Docker System Status` to
`http://dockerstatus.com/` — **plain HTTP and the bare apex domain**, while
every other reference uses `https://www.dockerstatus.com/`.

## T2 Value proposition & headline patterns

**Hero — Docker no longer leads with containers** `[observed]`

> Headline: `Accelerate agent adoption, safely.`
> Subhead: `Full autonomy for any agent. Full confidence for your security team.`
> CTA: `Get Started` → Docker Sandboxes

The headline is about AI agents. The word "container" appears nowhere above the
fold. Containers turn up first in the nav scope line
(`Containerize your applications`) and then as a *justification* for the new
product: "Containers proved isolation is the foundation of safe execution."
**The 2013 product is repositioned as the credential for the 2026 one.**

**The two-audience parallel is the dominant headline device** `[observed]`

- `Invisible to developers.  Total control for security.`
- `Full autonomy for any agent. Full confidence for your security team.`
- `Your laptop. One command.` / `Your console. Zero checks.`

Three consecutive instances of a two-clause, two-reader frame — the developer
gets the first half, the security buyer the second. This is a procurement
structure rendered as copy: the person who adopts and the person who approves
are addressed in the same sentence. **Note the double space in
`developers.  Total` — a raw copy defect on the primary section heading.**

**Section headers are fragments with a line break as a beat** `[observed]`

`The runtime under  every agent` · `Unlock the Autonomy of Agents, Safely` ·
`Isolation you can trust` · `Nothing to rip and replace` ·
`Start local. Scale anywhere.` · `No lock-in. Ever.` ·
`From the company that secured the developer laptop for the enterprise.` ·
`Build better, together`

Three of these are **objection-handling headlines written as the objection**
(`Nothing to rip and replace`, `No lock-in. Ever.`,
`Start local. Scale anywhere.`). The buyer's fear is quoted and negated. Also
note the inconsistent capitalisation — sentence case dominates but
`Unlock the Autonomy of Agents, Safely` and `Build better, together` are Title
and sentence case respectively in adjacent sections.

**Benefit copy leads with money, then risk, then compliance** `[observed]`

`Lower cost through trusted autonomy.` — argues autonomy only pays if agents
can be trusted alone · `Ship faster. Without the breach.` ·
`Compliant by default.` — closing with "Evidence your auditors will actually
appreciate", which is a rare bit of dry humour in a compliance line.

**Trust numbers, as three stacked figures** `[observed]`:
`91%` "of the Fortune 100 already run on Docker" · `20B+` "pulls a month on
Docker Hub" · `20M+` "developers build on Docker every day".

**Simulated terminal output used as marketing copy** `[observed]` — the single
most Docker-specific device on the page. Three fake consoles appear as hero
content:

```
$ docker agent run billing-bot
✓ agent online
```

```
$ sbx run claude
Starting claude agent in sandbox 'claude-ai-project'...
≡ Mounting workspace: ~/projects/ai-project
≡ Network policy: deny all, allow 42 hostnames
```

and a governance-console log with timestamped policy events
(`14:02:36.04 Allow policy corp/safe.rego · 0 / 14 pass` ·
`Sign image sha256:9af2…b314 · cosign verified` ·
`Scope identity svc:billing-bot@v1.4 · least priv`).

The value proposition is demonstrated by **showing the product's own output
strings as the ad**. Glyph vocabulary is consistent across all three
(`✓` success, `○` in progress, `›` request, `⏵` agent action, `≡` setup,
`$` prompt) — a symbol system doing status work with no words.

**Docs home headline is a question in the first person plural** `[observed]`:
`How can we help?` — followed by a search box and five **pre-written user
questions as clickable prompts** (see T12).

**Trust page headline** `[observed]`:
`Secure tools make for innovative developers`, under the kicker `Our mission`.
An aphorism rather than a claim.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Started` | Hero | Goes to Docker Sandboxes, **not** to signup or to `/get-started/` |
| `Get started` | Pricing card, Personal tier | Lowercase variant, different destination (signup) |
| `Sign In` | Header | |
| `Buy now` | Pricing cards, Pro / Team / Business | Direct-to-checkout from a nav menu |
| `Contact sales` | Pricing card, Business tier | |
| `Start Free Trial` | Pricing flyout, Hardened Images | |
| `Download Docker Desktop` | Home, section header | Acts as a header for five OS-specific buttons |
| `Download for Mac - Apple Silicon` / `- Intel Chip` / `Download for Windows - AMD64` / `- ARM64` / `Download for Linux` | Home | **Architecture named in the CTA** — five buttons rather than one detect-and-guess |
| `Read more about our approach` | Home card, Sandboxes | Full-phrase, object named |
| `The case for agent governance` | Home card | A noun phrase as CTA — reads like an article title |
| `See why hardened images matter` | Home card | Imperative + reason |
| `Request information` | Trust page | Gated |
| `Go to compliance` / `Go to security` / `Go to availability` / `Go to privacy` | Trust page, four cards | Uniform `Go to <noun>` |
| `Report a problem` | Status page, twice | Routes to `hub.docker.com/support/contact` |
| `Subscribe to updates` | Status page, twice | **Both status CTAs are duplicated in the DOM** |
| `Ask Gordon` | Every docs page | The docs AI assistant, invoked by name |
| `Copy Markdown` / `View Markdown` | Every docs page | Machine-readable export |
| `Share feedback` | Docs search panel | Links to a single pinned GitHub issue |
| `Show more` | Docs home, `What's new` feed | Progressive disclosure |
| `Skip to content` | First in marketing DOM | Accessibility |
| `Toggle menu` | Header | |
| `Cookie Settings` / `Cookies Settings` | Marketing footer / docs footer | **Singular vs plural across the two properties** |
| `create a new issue` | Troubleshoot topics tip | Inline, lowercase |
| `Contact support` | Troubleshoot docs | **Subscription-gated** — see T7 |
| `Report a Bug` | Troubleshoot docs, Desktop UI | The unsubscribed user's alternative to `Contact support` |
| `Submit ticket` | Desktop support form | `[documented]` |
| `Gather diagnostics` | Desktop error dialog | `[documented]` — appears *inside the error message* |
| `Upload to get a Diagnostic ID` | Desktop Support page | `[documented]` |
| `Get support` | Desktop Troubleshoot menu | `[documented]` |

**Observation.** `Get Started` (hero) and `Get started` (pricing) differ in
case *and* destination, and neither goes to the docs' own
`Get started` section. Three things named "get started", three targets. Docker
does otherwise avoid bare `Learn more` — every marketing link names its object
or its argument.

## T4 Onboarding & getting-started

**The conceptual onboarding is question-titled and hands-on in the same page** `[observed]`

`What is a container?` has a fixed four-part shape reused across all four
`The basics` pages:

`Explanation` → `Try it out` → `Additional resources` → `Next steps`

The explanation opens with a **scenario in the second person, not a
definition**:

> "Imagine you're developing a killer web app that has three main components -
> a React frontend, a Python API, and a PostgreSQL database."

Then three questions the reader is assumed to already have — how do you match
versions with teammates, with CI, with production; how do you stop the app's
Python needing conflicting with the machine's; how do you manage conflicts —
and only then: `Enter containers!`

**The definition is deliberately deferred by about 150 words.** The reader is
given the pain first, in their own project's terms, and the word "container"
arrives as the answer to a question they have just been made to ask. This is
the strongest single content pattern in this batch and the most portable.

The definition itself is hedged into plainness: "Simply put, containers are
isolated processes for each of your app's components." Then four adjective-led
bullets, each a single word followed by a full stop and an explanation —
`Self-contained.` · `Isolated.` · `Independent.` · `Portable.` Every one of
them a property the reader can check.

**The comparison the reader is going to make anyway is pre-empted** `[observed]`:
a `Containers versus virtual machines (VMs)` subsection, opening
"Without getting too deep…", and — crucially — a follow-up callout
`Using VMs and containers together` that dismantles the false either/or the
comparison just set up. Docker draws the contrast *and then* removes the
implied exclusivity.

**`Try it out` is dual-path, GUI first** `[observed]`

Tabs: `Using the GUI` / `Using the CLI`. Both are numbered imperative steps.
The GUI path is seven steps ending `Select Run to start your container.`; the
CLI path is one command. Then shared sub-steps:
`View your container` · `Access the frontend` · `Explore your container` ·
`Stop your container` — each a second-person possessive
("**your** container"), and the last one is the *teardown*. The tutorial
teaches how to stop, not just how to start.

**Celebration copy** `[observed]`:
`Congratulations! You just ran your first container! 🎉` (GUI path) and
`Congratulations! You just fired up your first container! 🎉` (CLI path).
Same moment, **two different verbs** — "ran" vs "fired up" — in parallel tabs
of one page. Either a deliberate register match to the CLI audience or an
inconsistency; there is nothing in the page to tell which.

**Inline teaching of a hard concept via analogy** `[observed]`:
"When you launched the container, you exposed one of the container's ports onto
your machine. Think of this as creating configuration to let you connect
through the isolated environment of the container." Note the **second instance
of this sentence on the same page has a typo — "to let you to connect"** —
the CLI tab's copy of the paragraph differs from the GUI tab's. Duplicated
prose across tabs has drifted.

**`Tip` callouts carry the thing the reader will trip on next** `[observed]`

> "The `docker ps` command will show you *only* running containers. To view
> stopped containers, add the `-a` flag to list all containers: `docker ps -a`"

> "When referencing containers by ID, you don't need to provide the full ID.
> You only need to provide enough of the ID to make it unique."

Both anticipate a confusion caused by the step just completed. The first is
effectively an **empty-state explanation** (see T8).

**Three tutorial entry points, named by outcome** `[observed]`:
`Containerize an application` · `Sandbox a coding agent` ·
`Pilot an organization rollout`. Verb + object, one per audience (individual
dev / AI dev / admin).

**Onboarding step language** `[observed]`: numbered lists throughout; no
progress bar, no "Step 1 of 4", no completion percentage. `Next steps` at the
foot of each page is a single forward link with a hand-off sentence:
"Now that you have learned the basics of a Docker container, it's time to learn
about Docker images." **A one-sentence linear curriculum.**

## T5 Form & field labels

`[documented]` — Docker Desktop's UI labels are quoted inside docs
instructions rather than observed live.

**Container-run dialog (Docker Desktop)** `[documented]`

| Label | Notes |
|---|---|
| `Search` | "the Search field on the top navigation bar" |
| `Pull` | Button on a search result |
| `Run` | Both the primary button and the confirm button |
| `Optional settings` | A disclosure group — **and it contains the two fields the tutorial then tells you to fill in**, so the "optional" settings are mandatory for the documented happy path. A real labelling defect |
| `Container name` | Value in tutorial: `welcome-to-docker` |
| `Host port` | Value in tutorial: `8080` |

**Dashboard views and columns** `[documented]`:
`Containers` (view) · `Files` (tab) · `Port(s)` (column) ·
`Actions` (column) · `Stop` (action) · `Settings` → `Resources` →
`File sharing` (Mac/Linux) vs `Settings` → `Shared Folders` (Windows) —
**the same setting has two different names on two platforms.**
`General` tab → `Automatically check configuration` (a checkbox).

**Support form field** `[documented]`: `Diagnostics ID field`.

**Configuration file keys as the real field layer** `[observed]`:
`compose.yaml` · `Dockerfile` · `settings-store.json` ·
`"disableHardwareAcceleration": "always"` · `project.toml`-adjacent
`sbxenv.yaml` · `DOCKER_HOST` · `DOCKER_CERT_PATH` · `--platform linux/amd64`.

**Compose file top-level elements** `[observed]`, from the reference nav —
these are the field names of Docker's primary declarative interface:
`Version and name` · `Services` · `Networks` · `Volumes` · `Configs` ·
`Secrets` · `Fragments` · `Extensions` · `Interpolation` · `Merge` ·
`Include` · `Models` · `Profiles`.

`Configs` and `Secrets` as **two separate top-level keys** is a content
decision worth noting: the schema itself teaches that config and secret are
different kinds of thing, before any docs prose does.

**`docker ps` output column headers** `[observed]`:
`CONTAINER ID` · `IMAGE` · `COMMAND` · `CREATED` · `STATUS` · `PORTS` ·
`NAMES`. Note `CREATED` holds a *relative duration* (`11 seconds ago`,
`11 weeks ago`) while `STATUS` holds a *duration since transition*
(`Up 16 seconds`, `Exited (137) 5 seconds ago`) — two time columns with two
different semantics and no unit label on either.

## T6 Status & state language

One of the two strongest categories here.

**The seven canonical container states, with verbatim definitions** `[observed]`

| State | Definition (verbatim, from `docker container ls`) |
|---|---|
| `created` | "A container that has never been started." |
| `running` | "A running container, started by either `docker start` or `docker run`." |
| `paused` | "A paused container. See `docker pause`." |
| `restarting` | "A container which is starting due to the designated restart policy for that container." |
| `exited` | "A container which is no longer running. For example, the process inside the container completed or the container was stopped using the `docker stop` command." |
| `removing` | "A container which is in the process of being removed. See `docker rm`." |
| `dead` | "A 'defunct' container; for example, a container that was only partially removed because resources were kept busy by an external process. `dead` containers cannot be (re)started, only removed." |

Four observations. First, **`created` is defined by what has *never* happened**
("never been started") rather than by what has — the cleanest way to name a
pre-first-run state. Second, `exited` gives *two* example causes, one benign
(process completed) and one deliberate (`docker stop`), so the state name
carries no blame. Third, `dead` is the most interesting: Docker names a state
for *partial failure of its own cleanup*, scare-quotes "defunct" to signal the
word is being borrowed, and — critically — **states the one thing the user can
still do** ("cannot be (re)started, only removed"). A terminal state that tells
you your only remaining action. Fourth, `restarting` is defined by its
*cause* (the restart policy), not its appearance, which is what a user
debugging a flapping container actually needs.

**The displayed status string is not the state name** `[observed]`

The `STATUS` column renders `Up 16 seconds`, `Up About a minute`,
`Up About an hour (Paused)`, `Exited (0) 2 weeks ago`,
`Exited (137) 5 seconds ago`. So:

- `running` displays as `Up`
- `paused` displays as `Up … (Paused)` — **a paused container reports as `Up`
  with a parenthetical**, which means the primary word is misleading and the
  truth is in the bracket
- `exited` displays as `Exited (<code>)` — the **exit code is carried in the
  status string itself**, and the docs teach the reader to decode it: "locate
  containers that exited with status of `137` meaning a `SIGKILL(9)` killed
  them"

**The machine state name and the human status string diverge for three of
seven states** (`running`/`Up`, `paused`/`Up (Paused)`, and the exit-code
suffix). This is precisely the class of drift the Wise exemplar flags — the
filter you type (`--filter status=paused`) is not the word you read.

**Duration language is fuzzy by design** `[observed]`:
`17 seconds ago` · `About a minute ago` · `Up About a minute` ·
`Up About an hour` · `11 weeks ago` · `Up 4 hours` · `Up 11 weeks`.
`About` is capitalised mid-string because it is concatenated after `Up`,
producing `Up About a minute` — grammatical, but the capital is an artefact.

**Status-page component taxonomy — 20 components in 4 groups** `[observed]`

| Group | Components |
|---|---|
| (ungrouped) | `Docker Authentication` |
| `Docker Hub & Registry` (5 components) | `Docker Hub Registry` · `Docker Hub Web Services` · `Docker Package Repositories` · `Docker Hardened Images` · `Docker Hub Automated Builds` |
| `Cloud & AI Services` (8 components) | `Docker Offload` · `Docker Scout` · `Docker Testcontainers Cloud` · `Docker Build Cloud` · `Docker AI Governance` · `Gordon AI Agent` · `MCP Gateway` · `Docker Model Runner` |
| `Support & Web Properties` (5 components) | `Docker.com Website` · `Docker Support` · `Docker Billing` · `Docker Community Forum` · `Docker Documentation` |
| `Beta Products` (2 components) | `Docker Agentic Platform` · `Docker Sandboxes` |

Three things stand out. **`Docker Documentation` and `Docker Billing` are
first-class status components** — Docker treats "can you read the docs" and
"can you pay us" as availability surfaces, which most companies omit. **`Beta
Products` is its own group**, so a beta outage is visibly a beta outage and
carries different expectations without any explanatory copy. And the group
headers carry a component count (`5 components`, `8 components`), so a
collapsed group still tells you its size.

**Overall status line, stated twice in two registers** `[observed]`

> `We're fully operational`
> "We're not aware of any issues affecting our systems."

The headline is a confident first-person-plural claim; the line beneath
**downgrades it to the limit of Docker's own knowledge.** "We're not aware of
any issues" is epistemically honest in a way "All systems operational" is not,
and it is the better of the two sentences. Shipping both — assertion then
qualification — is the same claim-then-bound move the Wise exemplar
identifies, applied to uptime.

Other status vocabulary `[observed]`: `System status` · a date range
(`Jun 2026-Sep 2026`) · `Calendar` · `Loading...`.
`Powered by incident.io` is disclosed in the footer. **No incident-severity
labels were observable** because there were no live or recent incidents during
the harvest — so `investigating` / `degraded` / `outage` -style vocabulary is
`[absent]`, not inferred.

**Runtime status glyphs in marketing terminal mock-ups** `[observed]`:
`✓ Starting...` · `✓ Ready in 1168ms` · `○ Compiling / ...` ·
`✓ Compiled / in 779ms (559 modules)` · `› GET / 200 in 941ms` ·
`Agent A  Running...` · `✓ agent online` · `✓ Tests passing (12/12)`.
Note `✓ Starting...` — a **tick beside an in-progress gerund**, which conflates
"done" with "under way". The `○` glyph is used correctly for in-progress on the
adjacent line, so the mock-up is internally inconsistent.

## T7 Error, failure & recovery

The other strongest category. Docker has **no numbered error taxonomy** —
unlike Heroku — and instead organises failure by *observable symptom*.

**Troubleshoot topics: 17 named failure modes, grouped by platform** `[observed]`

`Topics for all platforms`
- `Certificates not set up correctly`
- `Docker Desktop's UI appears green, distorted, or has visual artifacts`
- `Using mounted volumes and getting runtime errors indicating an application file is not found, access to a volume mount is denied, or a service cannot start`
- `` `port already allocated` errors ``

`Topics for Linux and Mac`
- `Docker Desktop fails to start on Mac or Linux platforms`

`Topics for Mac`
- `Upgrade requires administrator privileges`
- `Persistent notification telling me an application has changed my Desktop configurations`
- `` `com.docker.vmnetd` is still running after I quit the app ``
- `Incompatible CPU detected`

`Topics for Windows`
- `Docker Desktop fails to start when anti-virus software is installed`
- `Permissions errors on data directories for shared volumes`
- `Unexpected syntax errors, use Unix style line endings for files in containers`
- `Path conversion errors on Windows`
- `Docker commands failing in Git Bash`
- `Docker Desktop fails due to Virtualization not working`
- `Docker Desktop with Windows Containers fails with "The media is write protected""`
- `` `Docker Desktop Access Denied` error message when starting Docker Desktop ``

**Title grammar — four shapes, and they are chosen by what the user can see**

| Shape | Example |
|---|---|
| The literal error string, in backticks | `` `port already allocated` errors ``, `` `Docker Desktop Access Denied` error message… `` |
| The visible symptom, described | `Docker Desktop's UI appears green, distorted, or has visual artifacts` |
| First-person-adjacent complaint | `Persistent notification telling me an application has changed my Desktop configurations`, `` `com.docker.vmnetd` is still running after I quit the app `` |
| `X fails when/due to Y` | `Docker Desktop fails to start when anti-virus software is installed`, `Docker Desktop fails due to Virtualization not working` |

The third shape is the Wise "confession title" pattern applied to *system*
misbehaviour rather than user error — "still running **after I quit the app**"
is the user's grievance, in their words, as the heading. Docker uses first
person for things the *product* did wrong, which is the inverse of Wise's
usage and is equally defensible.

The long mounted-volumes title (26 words, three symptoms joined by "or") is a
**deliberate search-surface**: it is not a good heading, but it catches three
different error strings a user might paste. A legitimate trade of readability
for findability, and worth recording as such rather than as a defect.

**Every topic follows a fixed three- or four-part shape** `[observed]`

1. `Error message` — the verbatim string, in a code block
2. `Possible causes` (plural, bulleted) or `Cause` (singular, prose)
3. `Solution`

The singular/plural switch is meaningful: `Possible causes` is used where
Docker genuinely does not know which applies (certificates: two candidate
causes; ports: two candidate causes), `Cause` where there is one. **The heading
tells you whether the diagnosis is certain.**

**Verbatim error strings recorded** `[observed]`

- `Error response from daemon: Get http://…/v2/: malformed HTTP response "\x15\x03\x01\x00\x02\x02"`
- `Bind for 0.0.0.0:8080 failed: port is already allocated`
- `listen tcp:0.0.0.0:8080: bind: address is already in use`
- `[vpnkit-bridge][F] listen unix <HOME>/…/http-proxy-control.sock: bind: invalid argument`
- `[com.docker.backend][E] listen(vsock:4099) failed: … bind: invalid argument`
- `Wsl/Service/RegisterDistro/CreateVm/HCS/ERROR_NOT_SUPPORTED`
- `"Docker.app is damaged and can't be opened"` (macOS dialog)
- `The media is write protected`
- `Docker Desktop Access Denied`
- `tls: client didn't provide a certificate` / `tls: first record does not look like a TLS handshake` (registry-side logs)

Two of these are **shown as a pair for one failure** (`port is already
allocated` and `address is already in use`) — the same condition surfaces two
strings depending on the path, and the doc prints both so either search term
lands. The `[F]` and `[E]` severity prefixes in the vpnkit lines are Docker's
own log-level markers, exposed without explanation.

**Root cause is explained in terms the user can act on** `[observed]`

The Mac/Linux start failure is the best example. Cause: Docker creates Unix
domain sockets under the home directory; those have a maximum path length —
"104 characters on Mac / 108 characters on Linux". Solution:
"Ensure your username is short enough… Mac: Username should be ≤ 33
characters / Linux: Username should be ≤ 55 characters."

**Docker does the arithmetic for the user.** The constraint is a socket path
length; the actionable fact is a username length. Converting an internal limit
into the variable the user actually controls is the single most reusable
troubleshooting pattern in this file.

**Failure severity is graded, including "ignore this"** `[observed]`

- Act now, destructive risk: the upgrade note is an `Important` callout —
  "Do not uninstall the current version before upgrading. Doing so deletes all
  local Docker containers, images, and volumes." Consequence stated in full,
  in the imperative, before the instruction
- Act, with a choice: ports — "decide whether to shut the other process down,
  or to use a different port in your Docker app"
- Workaround only, named as temporary: anti-virus —
  "For a temporary workaround, uninstall the anti-virus software"
- **Do nothing**: `com.docker.vmnetd` — "The process does not consume any
  resources unless `Docker.app` connects to it, so it's safe to ignore."
  A troubleshooting entry whose whole answer is *this is not a problem*
- Accept the limit: shared-volume permissions — "The default permissions on
  shared volumes are not configurable", then two options neither of which is
  a fix. **Docker states that there is no solution and still writes the
  `Solution` heading**, which is mildly dishonest formatting around an honest
  answer

**Known issues: unfixed defects published, with blame apportioned** `[observed]`

- "The Mac Activity Monitor reports that Docker is using twice the amount of
  memory it's actually using. This is due to a **bug in macOS**." — the defect
  is documented *and* attributed to Apple, with a link
- Intel-on-Apple-silicon emulation: "attempts to run Intel-based containers on
  Apple silicon machines under emulation **can crash** as QEMU sometimes fails
  to run the container", and the summary sentence —
  "running Intel-based containers on Arm-based machines should be regarded as
  **'best effort' only**". A scare-quoted support tier for an unsupported
  path, plus a recommendation that reaches past the reader to *image authors*
  ("encouraging container authors to produce `arm64`, or multi-arch,
  versions"). Docker tells the user to lobby a third party. Rare, and honest.
- The same `"Docker.app is damaged"` bullet appears **twice on the known-issues
  page** — once under Intel and once under Apple silicon — with identical
  wording. Duplication in a platform-tabbed layout.

**The diagnostics-ID flow is the core recovery ritual** `[observed]`

Three entry points, all converging on one artefact:
`Diagnose from the app` · `Diagnose from an error message` ·
`Diagnose from the terminal`.

The middle one is the notable design: **`Gather diagnostics` is a button
inside the error dialog itself**, so the support artefact is created at the
moment of failure rather than reconstructed later. The ID's construction is
disclosed — "composed of your user ID and a timestamp", with an example —
so the user can recognise a valid one.

Expectation-setting appears twice, identically:
"Gathering diagnostics may take several minutes. Don't close Docker Desktop
while the diagnostics are being collected." A duration band plus the one thing
not to do. Repeated verbatim as both a `Note` callout and an inline step,
which is repetitive but correct — the warning is where it is needed.

**Support routing is paywalled, and the copy says so plainly** `[observed]`

> "If you have a Docker subscription, **Contact support**. Fill in the
> information required and add your diagnostics ID."
> "If you don't have a Docker subscription, create an issue on **GitHub**."

This if/else is stated **four separate times** across the troubleshooting docs,
in identical structure. The unsubscribed user's path is a public GitHub repo
(`docker/desktop-feedback`) and the button is labelled `Report a Bug` rather
than `Get help` — an accurate label that also reframes the user's problem as
Docker's defect. Whether that is generous or deflecting depends on the case.

**Build-time failure is a named rule set, not error codes** `[observed]`

Docker publishes 21 `Build checks`, each with a CamelCase rule ID and its own
reference page:

`ConsistentInstructionCasing` · `CopyIgnoredFile` · `DuplicateStageName` ·
`ExposeInvalidFormat` · `ExposeProtoCasing` · `FromAsCasing` ·
`FromPlatformFlagConstDisallowed` · `InvalidDefaultArgInFrom` ·
`InvalidDefinitionDescription` · `JSONArgsRecommended` ·
`LegacyKeyValueFormat` · `MaintainerDeprecated` ·
`MultipleInstructionsDisallowed` · `NoEmptyContinuation` ·
`RedundantTargetPlatform` · `ReservedStageName` · `SecretsUsedInArgOrEnv` ·
`StageNameCasing` · `UndefinedArgInFrom` · `UndefinedVar` ·
`WorkdirRelativePath`

Compare Heroku's `H12`. Docker's identifiers are **self-describing**: a user
seeing `SecretsUsedInArgOrEnv` or `CopyIgnoredFile` knows the problem without
opening the doc, where `H12` teaches nothing. The cost is that the names are
long, unpronounceable in support conversations, and cannot be versioned — a
renamed rule breaks every saved suppression. The trade is worth naming: **a
self-documenting ID optimises for first encounter; an opaque code optimises for
stability and for spoken reference.** `MaintainerDeprecated` is also a
lifecycle notice dressed as a lint rule, so the same mechanism carries
deprecation.

**Desktop `Troubleshoot` menu — five recovery actions, escalating** `[documented]`

`Restart Docker Desktop` → `Support` → `Reset Kubernetes cluster` →
`Clean up data` → `Reset to factory defaults` (+ `Uninstall` on Mac/Linux).

Each destructive option carries its consequence in the label's description:
`Reset Kubernetes cluster` — "delete all stacks and Kubernetes resources";
`Clean up data` — "resets all Docker data without a reset to factory defaults.
Selecting this option results in the loss of existing settings";
`Reset to factory defaults` — "reset all options… to their initial state, the
same as when Docker Desktop was first installed."

**A well-ordered destruction ladder**, with the blast radius named for each
rung. `Clean up data` is the weak label — it sounds like housekeeping and it
deletes your settings. "Clean up" is a euphemism sitting directly above an
option that is honestly named `Reset to factory defaults`.

## T8 Empty states

`[documented]` — one genuine empty-state explanation, and it is delivered as a
`Tip` rather than as UI copy:

> "The `docker ps` command will show you *only* running containers. To view
> stopped containers, add the `-a` flag to list all containers: `docker ps -a`"

This is the classic CLI empty state: the user's container exists, `docker ps`
returns nothing, and the user concludes it was destroyed. Docker does not
change the default and does not add a "0 of 3 containers shown" hint — it
writes the reconciling tip in the tutorial. Exactly the
"help article for the gap between system state and user reality" pattern the
Wise exemplar names, but placed in onboarding rather than in support, so the
reader is inoculated before they hit it.

`--filter 'exited=0'` and `--filter status=exited` are the recovery paths, and
the docs show both with sample output — so the "empty" list is reachable
through two vocabularies (`exited` as a status, `exited=<code>` as a filter).

All Docker Desktop Dashboard empty states (no containers, no images, no
volumes) are in-app and were not observable. `[absent]`

## T9 Notifications & system messages

`[observed]` and `[documented]` in roughly equal parts.

**In-app notification with a documented lifecycle** `[documented]` — the
`Configuration integrity check`:

> "You receive this notification because the Configuration integrity check
> feature has detected that a third-party application has altered your Docker
> Desktop configuration."

The docs then explain the notification's *own* behaviour, which is unusual and
good practice: "If you choose to ignore the notification, it will be shown
again only at the next Docker Desktop startup. If you choose to repair your
configuration, you won't be prompted again." **The user is told the re-nag
policy.** And the opt-out is given by exact path —
`General` tab → clear `Automatically check configuration`.

The notification also explains *why it exists*: "The notification ensures you
are aware of these changes so you can review and repair any potential issues
to maintain system reliability." Justifying an interruption inside the
interruption.

**`What's new` as a product-change channel** `[observed]` — the docs home
carries a dated feed, and each entry has a rigid shape: date · product name ·
**benefit-phrased headline** · one-to-two-sentence detail · deep link.

Headlines observed: `Share agent skills read-only by default` ·
`Run agents without mounting host files` ·
`Install and update shared skills from Git repositories` ·
`Use Docker Build Cloud with standard Buildx` ·
`Join Docker Verified Publisher through self-service plans` ·
`Sign and enforce trusted sandbox kits` ·
`Define reproducible sandbox environments` ·
`Resolve sandbox secrets from external sources` ·
`Run GPU workloads in sandboxes` · `Query DHI VEX data with the GraphQL API`

**Every headline is an imperative verb phrase describing what the reader can
now do** — not "we shipped X". Ten for ten. And the detail line reliably names
the version or the command that changed
("Sandboxes created with version 0.43.0 mount shared agent skills read-only by
default", "manage it with `sbx env`"). A changelog written as capability, with
the identifier needed to act on it.

**Status-page subscription** `[observed]`: `Subscribe to updates` and
`Report a problem`, both duplicated in the DOM.

**Consumption notifications** `[documented]`, from the pricing FAQ:
"consumption notifications can be modified under Settings & Billing. Select
'Consumption notifications' to specify which users will receive notifications
and when notifications are sent." An overage-alert product with configurable
recipient *and* threshold — and the FAQ question that surfaces it is
`Do I get an alert when I am over the limit of purchased consumption?`, which
the answer technically does not say yes to.

**Build-limit exhaustion message** `[documented]`, paraphrased in the FAQ
answer: if minutes run out mid-build the service is not interrupted, but no new
builds can start. The **in-product string for this is not published**, so it is
recorded as behaviour, not copy. `[absent]` for the actual string.

`[absent]`: email templates, toast copy, push.

## T10 Disclosures, legal & compliance

**Licensing is the central disclosure, and it is quoted as contract text** `[observed]`

The pricing FAQ answers `Who's required to pay for Docker subscription plans?`
by **pasting a clause number and its text inline**:

> "4.2 Specific License Limitations for Standalone use of Docker Desktop.
> (a) The use of Docker Desktop without a paid Subscription, is further
> restricted (i) to your use for a non-commercial open source project and/or
> (ii) use in a commercial undertaking with fewer than 250 employees and less
> than US \$10,000,000 (or equivalent local currency) in annual revenue.
> Government Entities shall not use Docker Desktop or access other Entitlements
> of the Service without purchasing a Subscription"

A **plain-language summary immediately precedes it** ("For small companies with
fewer than 250 employees AND less than \$10M in revenue…") with `AND`
capitalised to disambiguate the conjunction — the thing users got wrong when
this licence changed. **Summary first, verbatim clause second, clause number
included.** The same dual-format disclosure pattern as Wise's
"regulator's standardized format", applied to a EULA: the comprehensible
artefact is primary, the binding artefact is present and citable.

Note the seam: the summary says "AND" (both conditions), the clause says
"and/or" across (i) and (ii) — the plain version is *stricter* than the legal
version, which is the safe direction but is still a divergence.

**Rate limits disclosed as a four-way table in prose** `[observed]`

- Paid subscription: "no hourly image pull rate limit"
- Authenticated Personal: `100 pulls/hr/user`
- Unauthenticated: `10 Docker Hub pulls/hr/IP address`
- Free Team: `100 pulls/hr/user instead of 10 pulls/hr/IP address`

**The unit changes with the tier** — per *user* when authenticated, per *IP*
when not. Docker states the unit every time rather than saying "100 pulls/hr",
which is the whole difference between a usable disclosure and a misleading one.
And `What is the definition of "an image pull"?` gets its own FAQ entry,
because the billable unit had to be defined before the limit meant anything:
"An image pull includes both a version check and any images downloaded as a
result of a pull request."

**Three consumption units, each explicitly defined** `[observed]`

| Unit | Definition (verbatim or near) |
|---|---|
| `build minute` | "'Build Minutes' refers to the amount of minutes used by the builders to access Docker Build Cloud whether from a user or automated system." |
| `worker minute` | "Worker minute is a unit of measurement of usage on Testcontainers Cloud on through both desktop and CI use cases." (sic — "on through") |
| `Scout-enabled repository` | "an image repository that has been explicitly enabled for Scout's advanced image analysis" |

Every billable abstraction gets a `What is the definition of…?` question.
Compare Heroku, which bills in `Dyno Units` and never defines them. **Docker
defines its units; Heroku does not.** That is the single clearest
head-to-head content-quality difference in this batch.

**Expiry and rollover stated without being asked nicely** `[observed]`:
"These included minutes do not rollover." · "All pre-purchased consumption
expires at the end of a customer's subscription term." The unfavourable term
is stated flatly, twice, in two different FAQ sections.

**Price *increases* documented, with both old and new figures** `[observed]`

> "Docker Team price increased from \$9/user/month (annual) to \$15/user/mo
> (annual) and from \$11/user/month (monthly) to \$16/user/month (monthly)."
> "Docker Pro plans increased from \$5/month (annual) to \$9/month (annual)
> and from \$7/month (monthly) to \$11/month (monthly)."

Docker publishes the before-and-after of a ~67% increase in its own FAQ, in the
same answer as the added benefits. **Leading with what you gained and then
stating the increase in full, rather than announcing "updated pricing"**, is
the honest structure. Note `$15/user/mo` vs `$15/user/month` inconsistency
within one sentence.

**Removals and deprecations get their own questions** `[observed]`:
`Can I still pay for a Service Account?` — "Docker will no longer offer Service
Accounts as an add-on for customers on new plans. Existing Service Account
agreements will be honored until their current term expires." ·
`Can I still buy the IP Allowlist offering?` — "phasing out… Existing contracts
will be honored, and any new purchases need to be reviewed on a case-by-case
basis." **Withdrawn capabilities are documented rather than silently dropped**,
and grandfathering is stated explicitly each time.

**Downgrade consequences spelled out, including a flat "No"** `[observed]`

`Can I downgrade from Docker Business or Team plans to Docker Pro plan?` —
"**No.**" Then the reason (Pro has no Hub organization, single user only) and
the two remaining options. A one-word answer to a commercial question, which
almost nothing does.

The Business→Team downgrade answer chains five losses in one sentence — one Hub
organization, one namespace, limited team size, no SSO, "and many more
enterprise-grade security and governance features" — then requires a sales
conversation. The trailing "and many more" is vague where the rest is precise.

**Minimum Order Quantity, disclosed with its acronym defined** `[observed]`:
`What is Docker's Minimum Order Quantity (MOQ) policy and who is it for?` —
25 seats for new annual customers, 10 additional for amendments, same through
partners. A procurement floor stated on a public page.

**Trust page: four pillars, each with a scope line** `[observed]`

| Pillar | What it covers (paraphrased from the card) |
|---|---|
| `Compliance` | Certifications: SOC 2, ISO 27001, ISO 27701, GDPR, CCPA |
| `Security` | Security programme, product security notices, vulnerability reporting |
| `Availability` | BC/DR, backup processes, real-time and historical uptime |
| `Privacy` | ISO 27701-certified privacy programme, GDPR and CCPA |

Each card ends `Go to <pillar>`. The framing sentence names five properties as
a set — "We handle security, availability, confidentiality, integrity, and
privacy with the utmost care" — which maps to the SOC 2 trust-services
criteria without saying so.

**Gated disclosure, stated as a gate** `[observed]`:
"Access to our Trust Center is available to customers and prospects **under NDA
upon approval by the Docker Team**." Docker publishes the *existence* of the
evidence, the condition for seeing it, and a `Request information` CTA. Honest
about the wall. Contrast Heroku, which publishes the certification matrix
itself.

**Open-source boundary disclosed** `[observed]`: "Docker's open-source software
such as the Docker Engine is accessible for all and supported by the Moby
project maintainers and community members." The free-vs-paid line and the
who-supports-it line are drawn in the same sentence.

**Marketing footer legal** `[observed]`: `Terms of Use` · `Privacy` · `Legal` ·
`Cookie Settings` · `Trademark Guidelines`.

## T11 Help-centre architecture

**There is no help centre.** Docker runs docs plus a community forum plus
GitHub issues, with no article-based support hub. The `Support` nav item
contains no support (see T1).

**Docs is the support surface, and it opens as a question box** `[observed]`

The docs home is `How can we help?` — an H1 in the first person plural — over a
search field, with **five pre-written questions rendered as clickable prompts**
(quoted in T12). There is no category grid above the fold; the four IA sections
(`Get started` / `Guides` / `Manuals` / `Reference`) sit *below* the question
box.

**Search is an AI assistant with a name and a disclosed scope** `[observed]`

`Gordon` is the assistant, invoked as `Ask Gordon`, and it is also a *product*
listed in the nav (`Gordon — Your AI Agent across Docker`) and a *status-page
component* (`Gordon AI Agent`). One name across three surfaces.

Two pieces of scope copy accompany it:

> "When enabled, Gordon considers the current page you're viewing to provide
> more relevant answers."
> "Answers are generated based on the documentation."

The first discloses a context-capture behaviour as an opt-in and says what it
buys the user. The second is a **grounding disclaimer placed in the panel
rather than in a footnote** — it bounds the answer's authority before the
answer appears. Both are short, plain, and non-defensive. This is the best
AI-assistant disclosure copy in this batch.

`Share feedback` beside the search panel points at a **single pinned GitHub
issue** (`docker/docs/issues/23966`) — a public, permanent feedback thread for
one feature. Contrast Heroku's login-gated feedback form.

**Article-title grammar — three shapes, mapped to IA section**

| Section | Shape | Example |
|---|---|---|
| `Docker concepts` / `The basics` | Question | `What is a registry?` |
| `Docker concepts` / other | Gerund + object | `Understanding the image layers`, `Using the build cache` |
| Tutorials | Imperative + object | `Containerize an application`, `Sandbox a coding agent` |
| Troubleshooting | Symptom or literal error string | `` `port already allocated` errors `` |
| Reference | Bare identifier | `docker container ls`, `SecretsUsedInArgOrEnv` |

Five registers, each confined to its own zone, with essentially no bleed. This
consistency is the quiet strength of the Docker docs and is more valuable than
any individual page.

**Reference IA is the CLI's own shape** `[observed]`: the nav mirrors the
command tree exactly (`docker system` → `docker system df` /
`docker system events` / `docker system info` / `docker system prune`;
`docker volume` → `create` / `inspect` / `ls` / `prune` / `rm` / `update`).
The docs IA *is* the product's grammar, so a user who knows the command knows
the URL. Note the newer `sbx` CLI has a far deeper tree
(`sbx policy allow network`, `sbx kit provenance`, `sbx mcp auth status`) —
four levels in places — which will strain that mapping.

**Routing furniture** `[observed]`: `Further resources` at the foot of the
troubleshooting page offers, in order: specific topics → known issues → one
named high-frequency issue (`Fix "Docker.app is damaged" on macOS`) →
`Get support for Docker products`. **Self-service first, the single most common
problem promoted to a named link, human contact last.**

And a `Tip` at the top of the topics page: "If you do not find a solution in
troubleshooting, browse the GitHub repositories or create a new issue." The
escape hatch is offered *before* the content, not after.

## T12 FAQs

Two distinct FAQ surfaces, in different registers.

**1. Docs home — five questions as clickable search prompts** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How do I get started with Docker? |
| 2 | Can I run my AI agent in a sandbox? |
| 3 | How do I containerize an application? |
| 4 | What are Docker Hardened Images? |
| 5 | Why should I use Docker Compose? |

Five questions, five different interrogatives (`How do I`, `Can I`, `How do I`,
`What are`, `Why should I`). These are not an FAQ list — they are **seeded
queries that teach the user how to talk to the search box**, and they double as
a product-priority signal (two of five are about the new AI products). Q5's
`Why should I…` is the only one asking for an argument rather than a
procedure.

**2. Pricing FAQ — ~35 questions in seven named groups** `[observed]`

Group headings: `Docker plans overview` · `Subscription` · `Billing` ·
`Docker Hub` · `Docker Build Cloud` · `Docker Scout` ·
`Docker Testcontainers Cloud` · `Renewal, Expansion and Account Change`.

Questions verbatim:

*Docker plans overview* — the four plan questions are written **in the
customer's own voice, in the first person**:
| # | Question |
|---|---|
| 1 | I'm a Docker Business customer, what is new in my plan? |
| 2 | I'm a Docker Team customer, what is new in my plan? |
| 3 | I'm a Docker Pro customer, what is new with my plan? |
| 4 | I'm a Docker Personal user, what is included in my plan? |
| 5 | When does new pricing go into effect? |

Note Q1/Q2 say `what is new in my plan`, Q3 says `what is new **with** my
plan`, and Q4 switches from `customer` to `user` and from `what is new` to
`what is included`. **Four parallel questions, three inconsistencies.** Q4's
switch to "included" is arguably deliberate (nothing is new on a free plan) but
"user" vs "customer" is not.

*Subscription* — `What kind of entitlement do the subscription plans offer?` ·
`What kind of users are required to pay for the subscription?` ·
`Are users required to authenticate for accessing all of the products?` ·
`How do we get access to all of the products included in the subscription
plans?` · `Can I disable certain products or services of my subscription?` ·
`Who's required to pay for Docker subscription plans?` ·
`I am part of a "Free Team" plan, what am I eligible for?`

*Billing* — `Can I pay for the subscription plan and specific product
consumption with an invoice?` · `Do I get an invoice for the on-demand
consumption?`

*Docker Hub* — `What is the definition of "an image pull"?` ·
`How do hourly Image pull rate limits work?` ·
`Can I still pay for a Service Account?` ·
`Can I still buy the IP Allowlist offering?` ·
`Do I still have access to the Autobuild service?` ·
`What will the impact be to Docker Sponsored Open Source (DSOS)?`

*Docker Build Cloud* — `What is a builder?` ·
`What is the definition of a "build minute"?` ·
`How do I pay for "build minutes"?` · `Can I buy more than 20,000 minutes?` ·
`When will the pre-purchased build minutes expire?` ·
`What will happen if I use up my build limits? Will service be disrupted
immediately?` · `Can I try Build Cloud without a paid subscription?` ·
`How do I know how many minutes to buy?` ·
`Do I get an alert when I am over the limit of purchased consumption?` ·
`Can I disable Docker Build Cloud?`

*Docker Scout* — `What is a "Scout-enabled repository" and how are they
counted?` · `How do I pay for additional Scout-enabled repositories?` ·
`How do I know how many repositories are Scout-enabled?` ·
`Can I disable the Docker Scout product access?`

*Docker Testcontainers Cloud* — `What is the definition of "worker minute"?` ·
`How do I pay for additional Cloud Runtime minutes?` ·
`When does pre-purchased consumption expire?` ·
`Can I try Testcontainers Cloud without a paid subscription?` ·
`How do I know how much I have used?`

*Renewal, Expansion and Account Change* — five upgrade/downgrade questions plus
`Do I need to do anything at the end of a subscription plan?` and
`What is Docker's Minimum Order Quantity (MOQ) policy and who is it for?`

**Structural analysis.** The three consumption-product sections
(`Build Cloud`, `Scout`, `Testcontainers Cloud`) are built from an **identical
five-question template**, instantiated per product:

1. What is the unit? (`What is the definition of a "build minute"?`)
2. How do I pay for more?
3. When does it expire?
4. Can I try it free?
5. How do I know how much I've used?

This is a reusable FAQ skeleton for any metered product, and the fifth question
— *how do I see my own usage* — is the one most metered products omit. Each
answer supplies a **specific URL to the usage dashboard**
(`build.docker.com`, `scout.docker.com/settings/repos`,
`app.testcontainers.cloud/dashboard/billing`), so the answer to "how much have
I used" is a link, not a paragraph.

The `Can I disable…?` question also recurs three times, one per product —
Docker anticipated that bundling products into a subscription creates a
*removal* need, and answered it per product rather than once.

**Compound questions** are used where the second half is the real anxiety:
`What will happen if I use up my build limits? Will service be disrupted
immediately?` — the reassurance ("the service will not be interrupted") is
delivered before the restriction ("No new image builds can be executed").
`What is a "Scout-enabled repository" and how are they counted?` pairs
definition with the counting rule, because the definition alone would not
settle the plan-limit question.

**Scare quotes are load-bearing.** `"an image pull"`, `"build minute"`,
`"worker minute"`, `"Scout-enabled repository"`, `"Free Team"` — every quoted
term is a billable or eligibility unit. The quotation marks flag "this is a
defined term, and here is the definition." A consistent and readable
convention.

**The FAQ is a pricing-transition artefact, not evergreen.** Several answers
reference `December 10, 2024` as the effective date and the page's own
`og:updated_time` is `2025-12-11` — **the "what is new in my plan" framing has
been live for roughly two years past the change it describes.** A dated
migration FAQ left in the primary pricing position is a real content-ops
finding.

## T13 Terminology & glossary

Docker ships an actual glossary — 15 terms, tabular, `Term | Definition` —
which almost no product in this corpus does. The terms below are quoted from
`docs.docker.com/reference/glossary/` unless noted.

| Term | How Docker defines it for a newcomer | What plainer word it displaced |
|---|---|---|
| `container` | Glossary: "a runnable instance of an image… isolated from one another and the host system but share the OS kernel". Concept page: "isolated processes for each of your app's components" | VM / instance / process / jail / zone. Docker took a shipping metaphor and made it the industry's default noun. **Two definitions in two places** — the glossary is mechanical, the concept page is experiential; the concept page never mentions the kernel and the glossary never mentions the developer's problem |
| `image` | "a read-only template used to create containers… versioned using tags and can be pushed to or pulled from a container registry" | build artifact / snapshot / template / AMI. `read-only template` is the load-bearing phrase — it establishes immutability in three words |
| `layer` | "a modification represented by an instruction in the Dockerfile. Layers are applied in sequence to the base image… Unchanged layers are cached" | diff / delta / changeset. The definition includes the *performance consequence* (caching), which is why the reader cares |
| `base image` | "an image you designate in a `FROM` directive… It defines the starting point for your build" — and, notably, "A Dockerfile with the `FROM scratch` directive uses an empty base image" | parent image / starting image. The `scratch` edge case is defined inside the main definition rather than deferred |
| `registry` | "a storage and content delivery system for Docker images. The default public registry is Docker Hub" | repository host / artifact store. **Docker distinguishes `registry` (the system) from `repository` (one image's namespace within it)** — a distinction users routinely collapse, and the glossary does not explicitly warn about |
| `volume` | "a special directory within a container that bypasses the Union File System… designed to persist data independently of the container lifecycle. Docker supports host, anonymous, and named volumes" | mount / persistent disk / bind. Note `bypasses the Union File System` — an implementation term used inside a newcomer glossary with no gloss of its own |
| `persistent storage` | "Persistent storage or volume storage provides a way for containers to retain data beyond their lifecycle" | **This entry and `volume` overlap heavily** and neither cross-references the other. Two glossary entries for adjacent concepts, defined independently |
| `build` | "the process of building Docker images using a Dockerfile. The build uses a Dockerfile and a 'context'." | compile / bake. A tautological opening ("build is the process of building") — the weakest entry in the glossary |
| `context` | Two unrelated meanings, **both in the same 15-entry glossary**: inside `build`, "the set of files in the directory in which the image is built"; as its own entry, "a Docker context contains endpoint configuration for the Docker CLI to connect to different Docker environments". A genuine collision, unflagged in either entry |
| `multi-architecture image` | "a Docker image that supports multiple CPU architectures, like `amd64` or `arm64`. Docker automatically pulls the correct architecture image for your platform" | fat manifest / manifest list. Renamed from the internal term to a descriptive one, and the definition leads with the *automatic* behaviour so the reader knows they usually need not care |
| `Dockerfile` | Not in the glossary as a term; defined by use throughout | build script / recipe / spec. A filename that became a common noun (and is now lowercased as "a dockerfile" by users, which Docker's own docs do not do) |
| `Docker Compose` | "a tool for defining and running multi-container Docker applications using a YAML file (`compose.yaml`). With a single command, you can start all services defined in the configuration." | orchestrator / stack manager. Note the definition is anchored to a *filename* and a *single command* — two concrete handles rather than an abstraction |
| `Docker Engine` | "the client-server technology that creates and runs Docker containers. It includes the Docker daemon (`dockerd`), REST API, and the Docker CLI client." | runtime / daemon. The umbrella term whose three parts are then named |
| `Docker Desktop` | "an easy-to-install application… that provides a local Docker development environment. It includes Docker Engine, Docker CLI, Docker Compose, and a Kubernetes cluster." | GUI / app. The definition is a *bill of materials*, which is what a user deciding whether to install it needs |
| `Docker Hub` | "Docker's public registry service where users can store, share, and manage container images. It hosts Docker Official Images, Verified Publisher content, and community-contributed images." | The three content tiers are named inside the definition |
| `Docker CLI` | "the command-line interface for interacting with the Docker Engine. It provides commands like `docker run`, `docker build`, `docker ps`" | Defined by example commands rather than by capability |
| `daemon` / `dockerd` | Named inside `Docker Engine`; `dockerd` has its own CLI reference page | service / agent. A Unix term retained unglossed |
| `Docker Official Images` / `Verified Publisher` / `Docker Sponsored Open Source (DSOS)` | Three named trust tiers for registry content, mentioned in the Hub definition and the FAQ | "official" / "trusted". A provenance vocabulary |
| `Docker Hardened Images (DHI)` | Marketing: "Minimal, signed, continuously patched images and MCP servers. SLSA Level 3. Audit-ready by default." | secure base image / distroless. Four claims in two sentences, one of them a named standard |
| `Docker Scout` | "Simplify the software supply chain"; a `Scout-enabled repository` is the billable unit | vulnerability scanner. Brand name over function name — a user looking for "scanning" will not find it by name |
| `Docker Offload` | "Break free of local constraints" | remote build / cloud runtime. **The name describes the mechanism, the tagline describes the feeling, and neither says what it does.** The least self-explanatory product name in the set |
| `Docker Build Cloud` / `build minute` / `builder` | `builder` = "a build engine that you can use to run your builds" | remote builder / build agent. Another tautological definition ("build engine… to run your builds") |
| `Testcontainers Cloud` / `worker minute` | Billable unit defined in the FAQ | test runner minutes |
| `Gordon` | "Your AI Agent across Docker"; appears as `Ask Gordon` in docs and `Gordon AI Agent` on the status page | docs assistant / copilot. A human first name for an assistant — memorable, and it makes the feature addressable in support conversations ("ask Gordon") in a way "the docs AI" is not |
| `Docker Sandboxes` / `sbx` | "Isolated environments for coding agents"; "MicroVM isolation for every agent session" | VM / jail / devcontainer. **`sandbox` is a 30-year-old security term being re-specified as a product**, and the CLI abbreviates to `sbx` — a new three-letter top-level command alongside `docker` |
| `kit` | A signable, versionable bundle in the Sandboxes CLI (`sbx kit pack`, `sbx kit sign`, `sbx kit provenance`) | package / bundle / extension. A new coinage, **not in the glossary** |
| `microVM` | Used in marketing and in a blog title ("Why microVMs") as the isolation primitive | lightweight VM / Firecracker. Docker is now selling *more* isolation than a container, which requires it to implicitly concede that containers are not VMs — the exact distinction its own concept page draws |
| `containerize` | Verb, used throughout (`Containerize an application`, `Containerize your applications`) | dockerize. **Docker actively uses the generic verb over its own trademark-derived one** — and has separate `Trademark Guidelines` in the footer, which is presumably why |

**The glossary's own gaps, recorded.** 15 entries is small for a product with
this much jargon. Missing from it: `Dockerfile`, `tag`, `repository`,
`daemon`, `network`, `bind mount`, `compose`, `orchestration`, `digest`,
`manifest`, `entrypoint`, and every 2026-era term (`sandbox`, `kit`,
`microVM`, `offload`). The glossary describes the 2016 product.

**Register split.** Marketing invents (`Offload`, `Hardened Images`,
`Agentic Platform`, `Claws`); the glossary explains
(`read-only template`, `runnable instance`); the concept pages sympathise
(`Enter containers!`, `Here's what makes them awesome`); the CLI reference is
bare (`docker container ls`). Four registers, and the tone flattens as you move
from the sales surface to the reference surface — the same gradient the Wise
exemplar names.

**The signature Docker terminology move** is different from Heroku's. Heroku
coins and then glosses forever. **Docker coins, wins, and then loses control of
the word** — `container`, `image`, `registry`, `volume`, and `buildpack`-adjacent
vocabulary are now generic. The consequence visible in this harvest is that
Docker must now *disambiguate against the industry*: `Docker Compose` (not
"compose"), `Docker Hub` (not "the registry"), and a `context` collision it
cannot fix because both meanings are entrenched.

## T14 Voice, tone & accessibility

**Person and tense.** Docs are second person, present tense, and unusually
*imaginative* in onboarding: "Imagine you're developing a killer web app",
"How do you make sure you have the same versions as the other developers on
your team?". Company voice is first-person plural in three distinct registers —
`How can we help?` (docs), `We're fully operational` (status),
`Docker will no longer offer Service Accounts` (FAQ, third person). **The FAQ
switches to third-person "Docker" for every commercially unwelcome sentence**
and stays first-person for welcome ones ("we will be expanding DSOS
resources"). That is a consistent and slightly evasive pattern worth noting.

**Register in onboarding is markedly warmer than in Heroku's equivalent.**
`Enter containers!` · `Here's what makes them awesome.` ·
`Containers can run anywhere!` ·
`Congratulations! You just ran your first container! 🎉` · `killer web app`.
Exclamation marks and an emoji, both of which Heroku's docs contain zero of.
The tone then flattens completely: the troubleshooting pages have no
exclamation marks, no emoji, and no encouragement.

**Contractions used freely** throughout docs and marketing
("you'd have to install", "isn't affected", "don't close Docker Desktop",
"We're not aware"). Absent from the quoted licence clause, correctly.

**Uncertainty is stated.** `Possible causes` as a heading (vs `Cause`) ·
"QEMU **sometimes** fails" · "should be regarded as 'best effort' only" ·
"We're **not aware of** any issues" · "Answers are generated based on the
documentation." Docker consistently marks the edge of its own knowledge, and
does it in the heading structure rather than only in prose.

**Callout vocabulary** `[observed]`: `Note` · `Tip` · `Important`.
Three levels only. `Important` is reserved for data loss
("Doing so deletes all local Docker containers, images, and volumes"), `Tip`
for the thing you'll trip on next, `Note` for expectation-setting on duration.
A small, well-disciplined set.

**Numbers are specific and unit-bearing**: `104 characters on Mac` /
`108 characters on Linux` · `≤ 33 characters` / `≤ 55 characters` ·
`100 pulls/hr/user` / `10 pulls/hr/IP address` · `1500 minutes` ·
`20,000 minutes` · `15-day window` · `25 seats` · `91%` · `20B+` · `20M+` ·
`0777`. The rate-limit unit changes with the tier and is restated every time
(see T10) — the discipline is real.

**Accessibility** `[observed]`

- `Skip to content` is first in the marketing DOM, anchored to
  `#wp--skip-link--target`. **The docs pages have no visible skip link in the
  fetched HTML** — the inverse of Heroku, where docs had one and marketing did
  not. Neither company has it on both.
- **Marketing alt text is systematically broken.** Every decorative background
  image carries alt text of the form `- blue gradieng background round`,
  `- gray`, `- logo dark blue nytimes rectangle`, `- desktop containers
  application` — a **leading hyphen and space, machine-generated from the
  filename**, on images that should carry empty alt. `gradieng` is a
  misspelling of "gradient" propagated into the alt text of a decorative
  element. `- gray` appears four times on one page. A screen-reader user hears
  "dash gray" repeatedly.
- Customer logos in the social-proof strip carry filename-derived alt
  (`logo dark blue expedia.svg` → alt `- logo dark blue`), so **one logo's alt
  omits the company name entirely** while its neighbours include it. Inside a
  strip whose only informational content *is* the company names.
- Social icons have alt text consisting of **raw CSS**:
  `.cls-1{fill:var(--iconColor, #1d63ed);}` — six links in the footer whose
  accessible name is a stylesheet fragment. One of them has a nested
  `var(--iconColor, var(--iconColor, #1d63ed))`, so even the CSS is duplicated.
  This is the worst accessibility defect found in this batch.
- Docs alt text, by contrast, is **descriptive and hand-written**:
  "A screenshot of the Docker Desktop Dashboard showing the search result for
  welcome-to-docker Docker image" · "Screenshot of the container view of the
  Docker Desktop GUI showing the welcome-to-docker container running on the
  host port 8080" · "Screenshot of the Docker Desktop Dashboard showing the
  files and directories inside a running container". These name both the screen
  and the state being illustrated. Docs and marketing are evidently written by
  different teams to different standards.
- The `whale menu` icon is referenced in prose as "the Docker menu Docker menu"
  — **a doubled phrase, likely an icon's alt text concatenated into the
  sentence**, producing "Select the Docker menu Docker menu and then
  Troubleshoot."
- Status-page duplication: `Report a problem` and `Subscribe to updates` each
  appear twice, and **every component name appears twice** in the DOM
  (`### Docker Authentication` immediately followed by
  `### Docker Authentication`) — presumably responsive variants. A screen
  reader may enumerate 40 components instead of 20.
- Status-page component groups are headed by a count (`5 components`) which is
  also duplicated. The calendar renders bare numerals 1–30 with no month
  context in the linearised text, and `Loading...` persists in the served HTML.
- `Cookies Settings` (docs) vs `Cookie Settings` (marketing).
- The marketing page uses `≡`, `✓`, `○`, `›`, `⏵` as **status glyphs inside
  simulated terminals with no text equivalent** — decorative in intent, but
  they carry the meaning of the illustration.

**Localisation** `[observed]`: `English` / `日本語` in the marketing footer
only. The docs have no language switch. Heroku localises docs and not
marketing; Docker does the opposite.

**Negative findings, recorded honestly**

- A nav item named `Support` containing no support link
- `Get Started` / `Get started` — two cases, two destinations, neither being
  the docs' `Get started`
- `Optional settings` contains the two fields the tutorial requires
- `Settings > Resources > File sharing` (Mac/Linux) vs `Settings > Shared
  Folders` (Windows) for one setting
- "You just **ran**" vs "You just **fired up**" your first container, in
  parallel tabs of one page
- "to let you **to** connect" — typo in the CLI tab's copy of a paragraph that
  is correct in the GUI tab
- `Invisible to developers.␣␣Total control for security.` — double space in a
  primary heading; same in `The runtime under␣␣every agent`
- `✓ Starting...` — success glyph on an in-progress state
- `paused` containers display as `Up … (Paused)`
- `context` has two unrelated meanings inside a 15-entry glossary
- `volume` and `persistent storage` are two overlapping entries with no
  cross-reference
- `build` and `builder` are both defined tautologically
- `Clean up data` deletes your settings; the option below it is honestly named
  `Reset to factory defaults`
- Pricing FAQ still framed as "what is new in my plan" for a change dated
  December 2024
- `$15/user/mo` and `$15/user/month` in one sentence
- `I'm a Docker … customer` (×3) vs `I'm a Docker Personal **user**`
- `what is new **in** my plan` (×2) vs `what is new **with** my plan`
- `http://dockerstatus.com/` in the footer while every other link uses
  `https://www.dockerstatus.com/`
- The `"Docker.app is damaged"` known-issue bullet is duplicated verbatim
- `gradieng` misspelt in alt text; alt text machine-generated with a leading
  `- `; social-icon alt text is raw CSS
- A `Solution` heading over an answer that states there is no solution
  (shared-volume permissions)

---

## Transferable patterns

1. **Defer the definition; open with the reader's problem in their own
   project's terms.** `What is a container?` spends ~150 words on a three-tier
   app and three version-conflict questions before saying `Enter containers!`.
   The term arrives as the answer to a question the reader has just been made
   to ask. Condition: only works when the pain is universal and one paragraph
   long. For a concept the reader *already* has a name for, go straight to the
   contrast.
2. **Questions for concepts, gerunds for tasks, imperatives for tutorials,
   bare identifiers for reference.** Four registers, each fenced to its own IA
   zone. The register itself tells the reader what kind of page they are on
   before they read a word.
3. **Pre-empt the comparison, then dismantle the false exclusivity.**
   `Containers versus virtual machines` followed immediately by
   `Using VMs and containers together`. Drawing a contrast creates an
   either/or the reader did not ask for; remove it in the same breath.
   Directly applicable to any "X vs Y" payment-method or product comparison.
4. **Define every billable unit before stating its limit.**
   `What is the definition of "an image pull"?` precedes
   `How do hourly Image pull rate limits work?`. And restate the unit inside
   every limit — `100 pulls/hr/**user**` vs `10 pulls/hr/**IP address**` —
   because the unit changes with the tier and the number alone would mislead.
5. **The five-question metered-product template.** Unit → how to buy more →
   when it expires → free trial → **how to see my own usage**, with the usage
   answer being a link to the dashboard rather than a paragraph. Instantiate
   per product. The fifth question is the one most products omit and the one
   customers ask most.
6. **Summary first, verbatim clause second, clause number included.** Docker
   pastes licence §4.2 into a pricing FAQ under a plain-English paraphrase,
   with `AND` capitalised to fix the conjunction users misread. Same shape as
   Wise's regulator-format link. Directly applicable to SECCI, BNPL terms, and
   any consumer-credit disclosure where the binding text and the
   comprehensible text differ.
7. **Convert an internal limit into the variable the user controls.** The
   socket path limit is 104 characters; the published advice is "username
   should be ≤ 33 characters". Do the arithmetic in the copy. This is the
   highest-leverage troubleshooting move in the file.
8. **Signal diagnostic certainty in the heading.** `Cause` when you know,
   `Possible causes` when you don't. One word, and the reader calibrates how
   much to trust the next paragraph.
9. **Write the "this is not a problem" entry.** `com.docker.vmnetd is still
   running after I quit the app` → "it's safe to ignore." A troubleshooting
   article whose answer is *stop investigating* saves a support contact and
   costs one paragraph.
10. **Name a terminal state and tell the user their one remaining action.**
    `dead` — "cannot be (re)started, only removed." Contrast a bare `failed`
    badge. Applies to expired holds, closed disputes, and voided transactions.
11. **Self-describing rule IDs vs opaque codes is a real trade, so choose
    deliberately.** `SecretsUsedInArgOrEnv` is legible on first sight but
    unstable and unspeakable; `H12` is stable, pronounceable, and teaches
    nothing. Use descriptive IDs for lint-style advisories the user reads once;
    use opaque codes for errors that must survive renaming and be quoted to
    support.
12. **Put the AI assistant's grounding disclaimer in the panel, not a
    footnote.** "Answers are generated based on the documentation." plus a
    plain statement of what context it captures and what that buys the user.
    Eleven words, before the answer appears.
13. **State availability as the limit of your own knowledge.** "We're not aware
    of any issues affecting our systems" is true in a way "All systems
    operational" is not, and shipping both — assertion then bound — costs one
    line.
14. **Make the changelog a list of things the reader can now do.** Ten of ten
    `What's new` headlines are imperative capability statements with the
    version or command named in the detail line. Not "we shipped X".

## Caveats & gaps

- **All Docker Desktop UI strings are `[documented]`, not `[observed]`.**
  Field labels, dialog copy, empty states, toast text, and the in-app error
  messages that carry the `Gather diagnostics` button are known only from docs
  prose and screenshot alt text. The screenshots themselves were not opened, so
  strings visible only in the images (button labels, status chips, the
  Dashboard's own empty states) are unharvested. **T5 and T8 are the weakest
  sections here and an authenticated/installed pass would change them most.**
- **No live or recent incident during the harvest.** The status page showed
  `We're fully operational`, so incident-severity vocabulary
  (investigating / identified / monitoring / resolved, or whatever incident.io
  configuration Docker uses), incident-title grammar, and update cadence are
  `[absent]`. Component names and the operational line are `[observed]`; the
  incident language is not, and is not guessed.
- **The main pricing page (`/pricing/`) was not fetched** — tier names, prices,
  and descriptions in this file come from the pricing card set rendered inside
  the nav flyout, which is present on every marketing page. Feature-comparison
  rows, included-quota tables, and any pricing-page-only disclosures are
  unharvested.
- The glossary page's nav exposed the 21 `Build checks` rule IDs and the Compose
  top-level elements; **the individual build-check pages were not opened**, so
  the actual advisory message text for each rule is unknown. The IDs are
  `[observed]`; their user-facing wording is not.
- `Docker Hub` itself (`hub.docker.com`) was not harvested. Registry-side
  status labels, image-page copy, and the `Docker Official Image` /
  `Verified Publisher` badge language are consequently absent.
- The four Trust sub-pages (`/trust/compliance/`, `/security/`,
  `/availability/`, `/privacy/`) were not fetched; the certification list in
  the metadata table is taken from the parent page's card summary and should be
  re-verified before being used as a compliance claim.
- `docs.docker.com/get-started/docker-overview/` (`What is Docker?`) was not
  fetched, nor were `What is an image?`, `What is a registry?`, or
  `What is Docker Compose?`. The four-part page shape
  (`Explanation` / `Try it out` / `Additional resources` / `Next steps`) is
  observed on one of the four and inferred as a template from the nav's
  parallel structure — **flagged as inference, not observation.**
- `Gordon` was not invoked. Its answer formatting, refusal copy, citation
  style, and failure states are unknown; only the two scope sentences around
  the entry point are recorded.
- The Japanese marketing site was not compared. All register claims are en-US.
- Accessibility findings are from served HTML only. The alt-text defects
  (leading `- `, CSS-as-alt, duplicated status components) are confirmed in the
  markup; whether assistive technology actually announces them as described was
  not tested.

## Sources

1. https://www.docker.com/
2. https://www.docker.com/pricing/faq/
3. https://www.docker.com/trust/
4. https://docs.docker.com/
5. https://docs.docker.com/reference/glossary/
6. https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/
7. https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/
8. https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/topics/
9. https://docs.docker.com/desktop/troubleshoot-and-support/troubleshoot/known-issues/
10. https://docs.docker.com/reference/cli/docker/container/ls/
11. https://www.dockerstatus.com/

No domains were blocked for this product.
