# 024. Netlify

| Field | Value |
|---|---|
| Domain | `DEV` — Developer, infrastructure, and security |
| Industry / sub-vertical | Web hosting / Jamstack platform — Git-driven CI/CD, edge delivery, agent-assisted build |
| Primary URL | https://www.netlify.com/ |
| Corpus rank | 024 |
| Benchmark strength (source list) | Deployment setup and recovery |
| Locale / market observed | en (docs declare `meta-og:locale: en`; no locale switcher observed) |
| Platform observed | Web (marketing, Astro v5.18.2), docs.netlify.com (Starlight v0.39.2, **serves `.md` on request**), netlifystatus.com (Statuspage), answers.netlify.com (Discourse forum) |
| Regulatory posture | `SOC 2` and `Security scorecard` named as plan features; `HIPAA` sold as an Enterprise add-on; footer carries `Trust Center`, `Privacy`, `GDPR/CCPA`, and an `Abuse` mailto; `Sensitive Variables policy` and `Deploy Request Policy` are named internal policies |
| Auth state | Unauthenticated public surfaces only |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | **Full for T4, T6, T7, T9, T10** — deployment setup and recovery is unusually well documented. Partial for T1–T3, T13. T5 and T8 thin; T14 has no published style guide. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.netlify.com/ | Hero, four-path "Start your way" block, three switchbacks, five use-case tabs with code samples |
| Pricing | https://www.netlify.com/pricing/ | Four plans, credit-metering explainer, six-category comparison table, 11-question FAQ |
| Status page | https://www.netlifystatus.com/ | **~40 components including 11 named third-party dependencies**; 5 update labels; 15 days of incidents |
| Build troubleshooting tips | https://docs.netlify.com/build/configure-builds/troubleshooting-tips/ | **16 named build failures with cause and fix** — the core build-recovery artefact |
| Error reference | https://docs.netlify.com/resources/troubleshooting/error-reference.md | Cross-product error index; SSL error strings quoted verbatim |
| Deploy overview | https://docs.netlify.com/deploy/deploy-overview.md | **Six deploy definitions, five deploy contexts, atomic-deploy explainer, deploy-permission states** |
| Manage deploys | https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview.md | **Deploy status filter vocabulary, lock/rollback/cancel/skip/delete verbs, retention rules** |
| Deploy notifications | https://docs.netlify.com/deploy/deploy-notifications.md | **12 named deploy events** — the richest T9 source in the corpus |
| Fix a failed deploy | https://docs.netlify.com/resources/troubleshooting/fix-a-failed-deploy.md | The `Why did it fail?` AI feature, with its data-handling disclosure |
| Choose your path | https://docs.netlify.com/start/choose-your-path.md | Onboarding IA: `Deploy wizard`, new-vs-existing split, drag-and-drop FAQ |

---

## T1 Navigation & IA labels

**Global nav — four menus plus `Pricing`** `[observed]`

`Platform` · `Solutions` · `Developers` · `Resources` · `Pricing`, with `Search` · `Contact` · `Log in` · `Sign up` · `Dashboard` as the action cluster, and `Ask Netlify` pinned to the page corner.

**The `Platform` menu opens with a sentence, not a list** `[observed]`:

> `### The Netlify Platform`
> **Your app, live instantly.** From AI tools or Git to global deployment in seconds. Everything included.

A three-sentence positioning block above the `Explore the platform` link and the `### Key Features` list. None of the five products in this batch does this; GitHub, GitLab, and Vercel all open their product menus with grouped links. Netlify uses the menu itself as a pitch surface, and `Everything included.` as a two-word closer is doing pricing work inside a product menu.

`Key Features` — `Agent Runners` · `Deploy Previews` · `AI Gateway` · `Functions` · `Database` · `Observability` · `Security` · `Edge network`. Eight items, no glosses. `Agent Runners` leads, so — as with Vercel's `Agent Stack` and GitHub's `AI CODE CREATION` — the AI product sits first.

**The `Solutions` menu asks a question as a group heading** `[observed]`: `### Why Netlify?` containing `Customers` · `Enterprise` · `Partner directory` · `Agent experience`; then `### Use Cases` containing `Prototypes` · `Internal apps` · `Coding agents` · `Ecommerce` · `Marketing sites` · `Web apps`.

And it closes with a **fallback route for the unmatched visitor**:

> **Don't see your solution?** We can help. `Chat with a Netlify expert`

Naming the failure of your own IA inside the menu, and offering a human, is a small and genuinely good decision. Every other product in this batch ends its solutions menu with `View all solutions`.

**`Agent experience` is a named company-level concept** `[observed]` — it appears in the `Solutions` menu under `Why Netlify?` *and* in the footer under `Company`, alongside `About`, `Open source`, and `Careers`. Netlify has promoted agent usability to the same level as its open-source posture and its careers page. No other product in this batch treats it as a company property rather than a feature.

**The `Developers` menu is segmented by tool, and names competitors' products** `[observed]`:

| Group | Members |
|---|---|
| `Where to start` | `Docs` · `Developer guides` · `Templates` · `Integrations` · `Build with AI` |
| `Agents` | `Claude` · `Codex` · `Cursor` · `+ More` |
| `Frameworks` | `Astro` · `TanStack` · `Next.js` · `Wordpress` · `React` · `+ More` |

An `Agents` nav group listing three third-party coding agents by name, each with its own landing page (`netlify.com/with/claude/`, `/with/codex/`). Netlify is doing to AI agents what it previously did to frameworks: a `/with/<name>/` page per partner. `+ More` as the overflow label (rather than `View all`) is the only instance of that convention in this batch.

(`Wordpress` is misspelled — the product is WordPress with a capital P. **Defect in primary navigation.**)

**Docs IA — five sections named as verbs, plus two reference buckets** `[observed]`

`Start` · `Build` · `Deploy` · `Manage` · `Extend` · `Reference` · `Resources` · `AI`

And the docs publish a **visual workflow diagram of their own IA**, with the current section highlighted — the deploy-overview page carries an image whose alt text is: "Simple workflow diagram with words 'start, build, deploy, manage, extend' with deploy highlighted".

**A five-verb lifecycle used simultaneously as the top-level docs IA and as a progress indicator.** The reader always knows which stage of the product lifecycle they are reading about. Compare GitLab's nine imperative docs sections (`Use`, `Extend`, `Install`, `Administer`, `Subscribe`, `Contribute`) — also verbs, but relationship-based rather than sequential. Netlify's is the only sequential one, and it fits a product whose whole value proposition is a pipeline.

`Build` is further split by a pair of unlabelled-but-visible sub-headings: `Fundamentals` (`Build with AI`, `Configure builds`, `Git workflows`, `Environment variables`, `Frameworks`, `Post-processing`, `User-Agent categories`) and **`Primitives`** (`AI Gateway`, `Serverless Functions`, `Edge Functions`, `Image CDN`, `Blobs`, `Database`, `Caching`, `Async Workloads`). `Primitives` as an IA category name is a strong coinage — it tells a developer these are composable building blocks rather than features, and it matches the homepage's `Build with agent-ready primitives.`

**`Reference` groups three kinds of reference under one node** `[observed]`: docs references (`Error reference`, `Request processing order`, `CLI reference`), `APIs` (six API references), and `Dev Tool Guides`. Notably it also contains **`Netlify skills`**, which links to a GitHub repo (`netlify/context-and-tools`) — agent skills shelved as a reference artefact alongside the CLI reference.

**`Resources` contains a named `Checklists` section and `Release phases`** `[observed]` — `Troubleshooting` · `Changelog` · `Examples` · `Migrate` · `Support` · `Checklists` · `Release phases` · `Enterprise credits`. `Checklists` as a docs genre is unusual; `Migrate` (a switching-content section inside product docs) is the same move Vercel makes with its KB comparison articles.

**Docs page furniture is dense and well-labelled** `[observed]`: `Skip to content` · `On this page` (rendered twice, mobile and desktop) · `Copy page` · `View as Markdown` · `Section titled "<heading>"` anchor links on every `##` · breadcrumb (`Build / Configure Builds /`) · `Last updated: Sep 17, 2026` · `Previous <title>` / `Next <title>` pager · a five-field feedback form.

`Section titled "Best practices for troubleshooting your build"` as the accessible name of every heading anchor is a genuinely good accessibility decision — the anchor link is self-describing rather than a bare `#`.

**Footer — four columns, and `Contact us` is one of them** `[observed]`: `Products` · `Resources` · `Company` · `Contact us` (`Sales`, `Support`, `Status`, `Forums`). Plus a legal strip: `Trust Center` · `Privacy` · `GDPR/CCPA` · `Abuse` · `Cookie Settings`.

**`Abuse` is a `mailto:` with a pre-filled subject and body** `[observed]`: `fraud@netlify.com`, subject `Abuse report`, body "Please include the site URL and reason for your report, and we will reply promptly." **Pre-writing the reporter's email body, including the two fields you need and a response commitment**, is the cheapest possible improvement to an abuse-reporting flow and almost nobody does it.

`Site theme` with `System` / `Dark` / `Light` appears in both the marketing footer and the docs footer.

## T2 Value proposition & headline patterns

**Hero** `[observed]`

> H1: `Push your ideas to the web`
> Subhead: "Create with AI or code, deploy instantly on production infrastructure. One platform to build and ship."

The H1 is the only **task-shaped hero** in this batch: a verb, an object the user already owns (`your ideas`), and a destination (`the web`). Compare `Agentic Infrastructure` (Vercel), `Speed you can trust` (GitLab), `The future of building happens together` (GitHub). Netlify's is the plainest and the only one legible to someone who has never heard of the product.

`ideas` rather than `code` is the load-bearing word. It admits an audience that has not written anything yet — which is exactly the audience the AI-agent path targets — without excluding developers.

The subhead is a **three-clause concession structure**: `Create with AI or code` (either audience), `deploy instantly on production infrastructure` (the seriousness guarantee), `One platform to build and ship` (the consolidation claim). `production infrastructure` is doing defensive work against the perception that prompt-built apps are toys.

**Section headers are two-sentence imperatives with a full stop after each** `[observed]`

- `Build your way.  Ship on one platform.`
- `Start your way.`
- `Prompt. Preview. Repeat.`
- `Build with agent-ready primitives.`
- `Grow on the same infrastructure.`
- `For every kind of web app.`
- `Build free.  Scale when you need it.` (pricing H1)

**`Prompt. Preview. Repeat.`** is the best single line on the site: three words, three full stops, a complete development loop, and it works as both a description and an instruction. It is the 2026 successor to "commit, push, deploy" and it names the new middle step (preview) as the thing the product sells.

Note `Build your way.` and `Start your way.` are near-identical headers on one page, thirty lines apart, with different meanings (`Build your way` = choice of stack; `Start your way` = choice of entry path). **Two headings, one construction, adjacent.** And `Build free.  Scale when you need it.` on pricing repeats the construction a third time. Both `Build your way.  Ship on one platform.` and `Build free.  Scale when you need it.` carry a **double space** after the first full stop in the served markup.

**Eyebrow labels above each section are single words or short nouns** `[observed]`: `How it works` · `Get going` · `Workflow` · `Platform` · `Scale` · `Use cases`. Six sections, six one-or-two-word eyebrows. `Get going` is the only colloquial one.

**Each switchback names three capabilities as bullets, verb-first** `[observed]`

| Section | Bullets |
|---|---|
| `Prompt. Preview. Repeat.` | "Build with Claude, Codex, and more AI agents" · "Deploy from Git, CLI, or drag and drop" · "Roll back any deploy in one click" |
| `Build with agent-ready primitives.` | "Build APIs with serverless functions" · "Add instant databases and file storage" · "Handle auth with built-in identity" · "Connect to AI models through AI Gateway" |
| `Grow on the same infrastructure.` | "Automatic HTTPS and DDoS protection" · "Manage access, secrets, and env vars by team" · "Global edge network with 99.99% uptime" |

`Roll back any deploy in one click` is the standout — a recovery capability promoted to a top-three marketing bullet. Most platforms bury rollback in docs; Netlify sells it on the homepage. That is consistent with its benchmark strength and it is the clearest signal in the batch that a vendor considers *undo* a feature rather than a safety net.

**The "How it works" block is three steps with imperative headings and one-sentence bodies** `[observed]`

1. `Start with code or AI` — "Start with a prompt, push from Git, or drag and drop. All paths lead to the same project."
2. `Build fullstack apps` — "Connect APIs, manage data, optimize images, and add AI features from your first prompt."
3. `Go live everywhere` — "Deploy to a global CDN in seconds, then choose when to make your project public."

**"All paths lead to the same project."** is the thesis sentence of the whole site, and it is repeated structurally in the section subhead ("Every path runs on the same workflow and production infrastructure") and again in the `Scale` switchback ("the same infrastructure supports your growth as you scale"). Three restatements of one claim — *the entry point does not change the destination* — which is the right claim for a product with four very different onboarding paths.

Step 3's second clause ("then choose when to make your project public") is a privacy disclosure placed inside a benefit sentence, and it recurs in the Free plan's feature list as `Private by default until you publish`.

**Social proof is three bare metrics with no sentence around them** `[observed]`: `10M+` developers · `60M+` apps deployed · `99.99%` uptime. Plus one pull quote:

> "I can push a change, and within 30 seconds the site is completely rebuilt." — *Jeffrey Sica, Kubernetes contributor, Head of Projects at CNCF*

A testimonial that quantifies a single operation (30 seconds) rather than praising the company. Compare GitLab's eleven-metric carousel and Vercel's three customer sentences — Netlify's is the most restrained, and the quote does the work the metrics cannot.

**Use-case tabs ship runnable code samples with descriptive captions** `[observed]`: five tabs (`AI apps` · `Marketing sites` · `SaaS apps` · `Ecommerce` · `Internal tools`), each with a caption in the form `Example: <what it does>`:

`Example: Generate alt text with OpenAI` · `Example: Optimized image with form` · `Example: Persist user-generated uploads` · `Example: Fetch products from a headless API` · `Example: Proxy an internal API`

The captions are the content artefact — five verb-first noun phrases that let a developer scan for their own problem without reading any code. And the first sample's payload is itself a content-design task: a function that writes alt text. Also note the second sample carries the in-code comment `<!-- Collect leads with zero config -->` — marketing copy inside a code sample.

**Pricing hero** `[observed]`: `Build free.  Scale when you need it.` / "From side projects to enterprise. Plans to experiment and grow the way you ship today."

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start building` | Homepage hero primary | |
| `Request a demo` | Homepage hero secondary, and Enterprise plan card | Consistent across two surfaces |
| `Sign up` | Global nav | |
| `Log in` | Global nav | `Log in`, not "Sign in" — matches Vercel, diverges from GitHub's Primer rule |
| `Contact` | Global nav | Bare noun, no object |
| `Dashboard` | Global nav | |
| `Ask Netlify` | Persistent page corner, marketing and docs | AI query entry point on every page |
| `Build now` | "Start with an AI agent" card | |
| `Import a project` | "Deploy from Git" card | `Import`, not "Connect" or "Add" |
| `Get started with CLI` | "Deploy from terminal" card | |
| `Try Netlify Drop` | "Drag and drop" card | Four cards, **four different CTA verbs** for four parallel entry paths — deliberate, since the paths differ |
| `Explore the platform` | Nav menu foot and `Platform` switchback | Consistent |
| `Explore AI Gateway` | Use-case tab | |
| `Chat with a Netlify expert` | Solutions menu fallback | Names the human |
| `Play` | Video embed | |
| `Join to share your work and connect with builders.` | Discord announcement bar | **A full sentence with a full stop used as a link label** |
| `Close announcement bar` | Announcement bar | Labelled in words |
| `Start for free` | Pricing, Free plan | |
| `Get started` | Pricing, Personal plan | Second acquisition verb |
| `Create a team` | Pricing, Pro plan | **Third — and the only one naming the object created rather than the act of starting** |
| `Use our calculator` | Pricing body | |
| `Calculate your cost` | Pricing anchor nav → same target | **Two labels, one anchor** |
| `See full feature comparison` | Pricing body | |
| `Full feature comparison` | Pricing anchor nav → same target | **Two labels, one anchor** |
| `FAQ` | Pricing anchor nav | |
| `View a plan` / `Jump to a topic` | Comparison-table selectors | Two selector labels, both imperative |
| `Change team plan` | Named in a pricing FAQ answer as a UI control | |
| `Why did it fail?` | **Failed-deploy summary page** — the AI diagnosis trigger | The most distinctive button label in this batch |
| `Publish Deploy` | Rollback control, on any successful deploy detail page | Title case; the rollback verb is *publish*, not "restore" |
| `Lock to stop auto publishing` | Deploys list | **Five-word button naming the mechanism and the consequence** |
| `Unlock to start auto publishing` | Deploys list | Exact mirror of the above |
| `Cancel deploy` → `Yes, cancel deploy` | Deploy detail, with confirmation | The confirm restates the verb |
| `Trigger deploy` | Deploys page header | |
| `Retry without cache with the latest branch commit` | Deploy retry dropdown | **Nine words** — names two modifiers explicitly rather than hiding them in a menu |
| `Retry without cache` | Shorter form of the same control, used in build-troubleshooting docs | **Two lengths for one control across two docs pages** |
| `Manage repository` → `Link to a different repository` | Repo-relink recovery path | |
| `Manage build capacity` | Builds page, when queued | Offered *at the moment of queueing* |
| `Start approval process` | Pending deploy, deploy-permissions flow | |
| `Approve and match with existing team member` | Dropdown option | |
| `Approve and add as Git Contributor` | Dropdown option | Two approve-and-X options naming the side effect |
| `Match contributor and approve deploy` | Confirm button | |
| `Reject` | Pending deploy | |
| `Require approval` / `Auto-approve` | Team settings radio labels | |
| `Edit settings` / `Save` / `Save setting` | Settings controls | `Save` and `Save setting` both appear |
| `Configure` | Repeated across settings paths | |
| `Options > Delete deploy` / `Delete deploy` / `Delete` | Deletion path, three labels across two deploy types | |
| `Download` → `Download ready` | ZIP generation, two-state button | **The label changes to announce completion** |
| `Copy to clipboard` | Deploy log | |
| `Customize` | Under the preview URL, drag-and-drop flow | |
| `Add new project` | Team dashboard | |
| `Let me add individual branches` | Branch-deploy setup radio | **First-person radio label** |
| `All` / `None` | Branch deploys setting values | |
| `Copy page` / `View as Markdown` | Docs article header | Two adjacent controls, one for humans and one for agents |
| `Send` | Docs feedback form | |
| `Skip to content` | Marketing and docs | Consistent |
| `Toggle main menu` / `Toggle platform submenu` / `Toggle solutions submenu` | Nav | Every disclosure control labelled, per-menu |
| `+ More` | Nav overflow, twice | |
| `Use this Zap` / `Use workflow` | Integration cards | |

**Observations.** Netlify's in-product action labels are the most *explanatory* in this batch, and that is the defining characteristic:

- `Lock to stop auto publishing` / `Unlock to start auto publishing` — the button says what it does *and* what changes as a result. Compare a bare `Lock`, which would require a tooltip.
- `Retry without cache with the latest branch commit` — nine words, two modifiers, zero ambiguity about which commit will build.
- `Why did it fail?` — a question as a button label, in the user's voice, at the exact moment they are asking it.
- `Approve and add as Git Contributor` vs `Approve and match with existing team member` — two approvals distinguished by their side effect on billing and team membership.
- `Download` → `Download ready` — a single control whose label reports state.

Against that, the marketing surface carries the usual duplication: `Calculate your cost` / `Use our calculator`, `Full feature comparison` / `See full feature comparison`, and three acquisition verbs (`Start for free`, `Get started`, `Create a team`) across three adjacent plan cards. The four onboarding CTAs (`Build now`, `Import a project`, `Get started with CLI`, `Try Netlify Drop`) are *correctly* different because the four paths differ — that is not a defect, and it is worth distinguishing from the pricing case where three identical actions get three labels.

## T4 Onboarding & getting-started

The strongest category for this product after T7, and the reason its benchmark strength is "deployment setup".

**Four entry paths, presented as equals, each with a one-line promise** `[observed]` — the homepage `Start your way.` block, subtitled "Choose the workflow that fits how you work.":

| Path | Promise | CTA |
|---|---|---|
| `Start building with an AI agent` | "Describe what you want to build. An AI agent handles the rest." | `Build now` |
| `Deploy from Git` | "Auto-deploy on every push. Every PR gets a preview URL." | `Import a project` |
| `Deploy from terminal` | "Deploy directly from your working directory. **No login required to start.**" | `Get started with CLI` |
| `Drag and drop` | "Drop your project folder and deploy in seconds. **New projects stay private until you choose to publish.**" | `Try Netlify Drop` |

Each promise is **two sentences: what happens, then the friction removed or the guarantee given.** `No login required to start.` and `New projects stay private until you choose to publish.` are both objection-handlers placed in the second sentence of a 15-word card. The Git card's second sentence (`Every PR gets a preview URL`) is the only one that is a capability rather than a reassurance — appropriate, since that audience has no objection to handle.

The terminal card ships the actual commands inline:

```
npm i -g netlify-cli
netlify deploy --allow-anonymous
```

`--allow-anonymous` is the flag that makes `No login required to start` true, shown rather than asserted. **Putting the proof of the claim in the copy as executable text** is a specifically developer-audience move and it is well executed.

**Docs onboarding is organised around a stated decision, not a sequence** `[observed]` — the entry page is titled `Choose your path`, and its first artefact is a `Deploy wizard`:

> "New to Netlify? Start with [What is Netlify?] to get an overview of the platform. Then use the deploy wizard below to find your fastest path to publishing your project."
> "Find your fastest path to publishing your project live on the web (deploying! 🚀) by answering a few questions."

**`(deploying! 🚀)`** — a parenthetical gloss that translates the plain-language phrase into the product's term, with an emoji. This is the single best onboarding-vocabulary move in the batch: Netlify says "publishing your project live on the web", then tells the reader that this is what the rest of the documentation calls *deploying*. A glossary entry delivered inside the sentence where the reader first needs it, in the direction that matters (plain → jargon, not jargon → plain).

The wizard is elsewhere branded `Deploy Navigator` — "Try our new Deploy Navigator for personalized deployment recommendations based on your project type and requirements." **`Deploy wizard` and `Deploy Navigator` are two names for one feature on two docs pages.** Defect, and a notable one given that this is the onboarding entry point.

**The top-level split is by what the user already has** `[observed]`: `## Start something new` vs `## Start with existing project`. Within those:

- New: `Start with AI agent` · `Start with template` · `Start with framework`
- Existing: `Start from a remote Git repository` · `Start from files` · `Start from zip files` · `Start from local development` · `Start from an AI-powered site/app generator`

Eight paths, and the preposition carries the distinction: **`Start with X` for new work, `Start from X` for existing work.** A two-preposition system encoding "am I creating or migrating". Subtle, consistent across all eight, and unremarked in the docs — which is how you know it is a real convention rather than an accident. (One exception: `Start with AI agent` is missing its article, where its siblings read `Start with template` / `Start with framework` — all three drop the article, so the convention is consistent even if ungrammatical.)

`Start from an AI-powered site/app generator` names Bolt explicitly and describes the migration path in the user's terms ("claiming your deployment or downloading your project files into a folder"). A docs section for *importing work made elsewhere by an AI* is a 2026-specific onboarding genre.

**The drag-and-drop flow is the most carefully written onboarding sequence in this file** `[observed]`. Five numbered steps, and the copy does four separate jobs:

> "As long as you're logged in to Netlify, you don't have to build your project first. You can drop a web project that still needs a build step - Netlify will detect your framework and run the build for you before publishing. **Dropping a pre-built output folder also works.**"

Then step 4: "Find your site published at the Preview URL ending in `netlify.app`. Your site should now be published on the web so you can share it with others. 🎉" — with `should` rather than `will`, which is honest hedging, and a celebration emoji at the one moment a first-time user has succeeded.

Then the **failure branch immediately after the success step**, as a Tip callout: "If your site is not publishing or not in working order, you can investigate based on your error message or what you're finding in our troubleshooting docs."

Then step 5 offers the polish step: "To customize your preview URL with a project name and to give your project an official name, select **Customize**."

**Success → verify → failure route → refine.** Four moves in five steps, with the failure route placed *before* the optional refinement rather than at the end of the article. That ordering assumes the reader who failed will stop reading, which is correct.

**The drag-and-drop FAQ is written as three questions in the user's voice** `[observed]`, embedded in the onboarding page rather than a separate FAQ page:

1. `Which folder?`
2. `What if my project isn't working?`
3. `What if I update my project?`

`Which folder?` is a **two-word question** — the actual shape of the thought a user has while hovering a folder over a drop zone. And its answer names the three folder names the user might actually be looking at: "may also be called dist, build, or public."

The second answer is a five-item checklist ordered by likelihood, and its fifth item is: "**Ask an AI assistant to help troubleshoot.** We recommend sharing Netlify context for agents with your AI tool or connecting the Netlify MCP server to help it understand how to build and deploy your project." Netlify's own onboarding docs recommend an external AI as a troubleshooting step and tell the reader what to feed it. Compare Vercel's Agent Prompt — same instinct, different mechanism: Vercel writes the prompt, Netlify points at the context bundle.

**Prerequisites and plan gating are stated before steps** `[observed]`: "To use this feature, you need a Credit-based pricing plan and must have enabled AI features." Stated as two conditions before step 1, matching GitLab's `Tier:` / `Offering:` practice in prose form rather than as metadata.

## T5 Form & field labels

`[absent]` for product forms — all Netlify forms are behind auth. Two public exceptions.

**The docs feedback form is five fields and unusually complete** `[observed]`:

> `Did you find this doc useful?`
> "Your feedback helps us improve our docs."
> `Do not fill in this field` — a **visible honeypot label**
> `Email (optional)`
> `What else would you like to tell us about this doc?`
> `I consent to being contacted regarding my feedback`
> `Send`

Three things. First, the optionality suffix `(optional)` matches GitLab's Pajamas convention. Second, the open question is phrased `What else would you like to tell us…` — the `What else` presupposes the rating already given, so the field is scoped rather than open-ended. Third, `I consent to being contacted regarding my feedback` is a **separate explicit consent checkbox for a feedback form**, which most products skip entirely.

`Do not fill in this field` is a honeypot whose label has leaked into the served text. Harmless for sighted users (it is CSS-hidden) but **it will be announced by a screen reader**, which is the exact population most likely to fill it in by accident. Recorded as an accessibility defect.

**Status-page subscribe form** `[observed]` — Statuspage furniture, identical to GitHub's and Vercel's: `Email address:`, `Enter OTP:`, `Country code:`, `Phone number:`, `Webhook URL:` with hint "The URL we should send the webhooks to", and `Email address:` with hint "We'll send you email if your endpoint fails". Colon-terminated labels, third-party content standard.

**Newsletter field** `[observed]`: `Email`, under the heading `Stay up to date with Netlify news`. One word, no placeholder visible in source.

`[documented]` — settings-path notation is a consistent docs convention rendered as a `NavigationPath` component:

`Project configuration > Developer settings > Continuous deployment > Repository` · `Project configuration > Notifications > Deploy notifications` · `Team settings > Access & security > Visitor access > Auto-approve deploys from non-team members` · `Team settings > General > AI enablement` · `Project configuration > Build & Deploy > Automatic Deletion` · `Domain management > HTTPS`

Four-level settings paths written out in full, with `>` separators. Note the casing drift within one system: `Developer settings` (sentence) beside `Continuous deployment` (sentence) beside `Build & Deploy` (title) beside `Automatic Deletion` (title) beside `Access & security` (sentence). **Five settings-path segments, two casing conventions, no rule.**

Also note `Auto-approve deploys from non-team members` is a settings *label* that is a full clause — a setting named by the behaviour it controls rather than by a noun. Good practice, and it makes the radio options (`Require approval` / `Auto-approve`) legible without a description.

## T6 Status & state language

Netlify's state vocabulary is organised around **one object (the deploy) with four orthogonal state axes**, which is a cleaner model than GitHub's overlapping check/deployment/incident vocabularies.

### 6.1 The six deploy definitions — the core artefact `[documented]`

Published under a literal `### Definitions` heading on the deploy-overview page:

| Term | Definition (verbatim, abridged) |
|---|---|
| `Production branch` | "the Git branch that Netlify uses to build and deploy changes to your site's main URL" |
| `Production deploy` | "a deploy from the production branch. If auto publishing is enabled, each new production deploy will become the published deploy." |
| `Published deploy` | "the deploy that is currently available as the live version of your site, accessible from your site's main URL." |
| `Branch deploy` | "a deploy generated from a branch that is not your production branch" — URL prefix is the branch name plus `--` |
| `Deploy Preview` | "a deploy generated from a pull request, merge request, **or agent run**" — URL prefix `deploy-preview-<n>--` or `agent-<runID>--` |
| `Permalink` | "every successful deploy of your site also creates a deploy permalink that starts with the deploy ID number and two hyphens… **The web content at this URL never changes.**" |

**The `Production deploy` / `Published deploy` distinction is the most valuable single definition in this file.** A production deploy is one that *came from* the production branch; a published deploy is the one *currently serving*. They are usually the same object and occasionally are not — precisely when a user has rolled back or locked deploys. Naming the difference means rollback has vocabulary to describe it: "publishing a previous atomic deploy" rather than "undoing".

Most platforms conflate these (GitHub: `production` environment; Vercel: `Production Deployment` only), and the conflation is why rollback copy is usually confusing. Netlify's two nouns do the work.

**The URL scheme encodes the state, and the encoding is documented** `[observed]`:

- Branch: `staging--mysitename.netlify.app`
- Deploy Preview from PR #42: `deploy-preview-42--mysitename.netlify.app`
- Deploy Preview from an agent run: `agent-69a6140cc823ebba94b8ef32--mysitename.netlify.app`
- Permalink: `1234abcd12acde000111cdef--mysitename.netlify.app`

The **double hyphen `--` as a universal prefix separator** is stated four times, once per type. A user seeing any Netlify URL can tell which kind of deploy they are looking at from the segment before the `--`. That is state communicated through information architecture rather than through UI copy, and `agent-` as a first-class prefix alongside `deploy-preview-` is the 2026 addition.

`Permalink` carries the sentence "The web content at this URL never changes." — an immutability guarantee stated flatly, and the reason permalinks bypass skew protection.

### 6.2 Deploy status filter vocabulary — the user-facing state list `[documented]`

From the `Find a deploy` filter options:

| Filter value | Covers |
|---|---|
| `Successful` | — |
| `Unsuccessful` | "includes `Failed`, `Canceled`, or `Skipped` deploys" |
| `Enqueued` | "for deploys that are in the queue awaiting deployment" |
| `Pending review` / `Accepted` / `Rejected` | "for deploys triggered by an unrecognized author" |

Seven state names in three groups, and the grouping is the finding. **`Unsuccessful` is a superordinate filter that collapses three distinct terminal states** — `Failed` (the build broke), `Canceled` (a human stopped it), `Skipped` (a commit message said not to). Those three have nothing in common except that nothing shipped, and giving the user one filter for "nothing shipped" is the right default with the three sub-states still named.

The second group is an **approval state machine, not a build state machine**: `Pending review` → `Accepted` / `Rejected`. A deploy can be blocked by a person before it is blocked by a compiler, and Netlify models that as a peer axis rather than a sub-state of "queued".

Additional states observed elsewhere: `Uploading` and `In progress` (drag-and-drop deploys — "stalled in `Uploading` or `In progress` status for more than 10 minutes"), `Enqueued: Awaiting Capacity` (the team-queue label), `Pending approval` (the Deploys-page label for an untrusted deploy), and `Deploy request is pending review` (the deploy-log message for the same condition).

**`Pending approval` (list) and `Deploy request is pending review` (log) and `Pending review` (filter) are three strings for one state on three surfaces.** Documented together in one paragraph, which makes the divergence visible — but it is still three labels.

### 6.3 Five deploy contexts — a second, orthogonal axis `[documented]`

> "There are five predefined deploy contexts:"
> `production` · `deploy-preview` · `branch-deploy` · `preview-server` · `dev`

Plus: "sites can also use branch names as custom deploy contexts. For example, a branch called `staging` will match a deploy context called `staging`."

A **context is not a status** — it is the configuration namespace a deploy runs under, and it doubles as a TOML key (`[context.production]`, `[context.deploy-preview.environment]`). Lowercase-hyphenated in config, Title Case in prose (`Deploy Preview`, `Branch deploy`). The same word serves as a UI concept, a filter value, a URL prefix, and a config key, with a documented casing shift between them.

`dev` as a deploy context for *local* development is the conceptually interesting one: a context that never produces a deploy, included in the deploy-context list so environment variables can be scoped to it. Netlify extended a deployment concept to cover the one environment that is not deployed.

**Override precedence is stated as a rule with a named exception** `[documented]`: "Overrides are applied in a hierarchical order… **Only options that are set explicitly are overridden; if you leave one out, the build will use the value of the global settings or previous contexts.** Environment variables are also overridden individually." And: "settings for a specific branch will override those for branch-deploy."

Naming that *omission is not the same as clearing* prevents the commonest configuration mistake in any layered-settings system.

### 6.4 Build queue states — three named queues with three causes `[documented]`

The best-structured status explanation in this file. `Enqueued builds` distinguishes:

| Queue | Cause | Recovery offered |
|---|---|---|
| `System queue` | "the number of builds across all customers exceeds the current capacity on the build network. This triggers an increase in system capacity" | Contact sales to reduce exposure |
| `Team queue` | "the number of concurrent builds across all sites on your team exceeds your team's build capacity" — label shown: **`Enqueued: Awaiting Capacity`** | `Manage build capacity` button on the same page; `prioritize` a build (Enterprise); cancel unneeded builds "to move other builds up in the queue" |
| `Context queue` | "When multiple builds are triggered on the same site, in an *identical* deploy context… these builds enter a context queue to ensure they complete sequentially" | Cancel the current active build of identical context |

**One visible state (`Enqueued`), three invisible causes, three different remedies — and the documentation tells you which one you are in.** The System queue is Netlify's problem, the Team queue is a capacity purchase, the Context queue is working as designed. A user staring at a queued build needs exactly this triage, and almost no platform provides it.

Two details worth stealing. The System-queue explanation includes a reassurance about the mechanism — "This triggers an increase in system capacity, so enqueued builds may start building as capacity increases as well as when other builds complete" — i.e. *the queue is not just waiting, it is provisioning*. And the Context-queue behaviour is disclosed with its consequence: "When the current build completes, the newest enqueued build of identical context begins, **skipping any others in the same context queue.**" Telling users that intermediate builds will be silently discarded is the kind of disclosure that prevents a support ticket.

The Team-queue entry also places the remedy control *by name, on the page where the problem appears*: "You can select the **Manage build capacity** button on that page."

### 6.5 Atomic deploys — a state guarantee explained by contrast `[documented]`

> "Instead of pushing individual files to Netlify, you always create a new deploy… **No changes go live on your site's public URL before all changes have been uploaded.** Once all the changes are ready, the new version of the site immediately goes live on the CDN."
> "With FTP or S3 uploads, each file is pushed live one after the other, so you can easily get into situations where a new HTML page is live before the supporting assets… have been uploaded. And if your connection cuts out in the middle of an upload, your site could get stuck in a broken state for a long time."
> "**Atomic deploys guarantee that your site is always consistent.**"

Four moves: state the guarantee, describe the mechanism, **describe the failure mode of the alternative the reader already knows**, restate the guarantee in one sentence. The third move is what makes it land — the reader has personally experienced the half-uploaded FTP site, and the concept is anchored to that memory rather than defined abstractly. The framing sentence is honest about the audience shift too: "If you're used to uploading files with FTP, SSH, RSync or S3's API, this is quite a different concept."

### 6.6 Skew protection — version state as a user-facing concept `[documented]`

Netlify names `version skew` and explains it as a three-step narrative:

> 1. A user opens your app and loads the client-side code in their browser.
> 2. You deploy a new version that removes a field from one of your API endpoints.
> 3. The user continues using the app without reloading. The outdated client code sends a request that includes the now-removed field, **resulting in an error.**

Then the mitigation, and then — unusually — **the failure mode of the mitigation**:

> "If not implemented correctly, skew protection can lead to clients perpetually using old versions of your application. Imagine a scenario where your application sends a cookie that locks the client to deploy A. If we keep using that cookie for as long as it's persisted on the user's browser, they keep requesting deploy A even if your application is now on deploy Z."

`deploy A` … `deploy Z` as a shorthand for "many versions later" is a nice concrete device. And the escape hatch is named in the user's vocabulary: `hard navigation` vs `soft navigation`, with the two detection heuristics published (`Sec-Fetch-Mode: navigate`, `Sec-Fetch-Site` present and not `same-origin`).

**Documenting the failure mode of your own safety feature** is the same practice as GitLab's squash-merge warning and Vercel's custom-error-page static-only constraint. Three products, one pattern: if a feature can trap the user, say how.

### 6.7 Incident status — five update labels `[observed]`

`Investigating` → `Update` → `Identified` → `Monitoring` → `Resolved`. Netlify ships `Identified`, as Vercel does and GitHub does not.

Observed boilerplate:

- `We are investigating reports of errors affecting access to Netlify-hosted sites. Our engineering team is actively investigating the issue.` / `We will provide additional updates as more information becomes available.`
- `We are continuing to investigate this issue. Customers may also experience issues accessing the Netlify application and its features.`
- `We have identified the issue and are working to restore normal service. We will provide another update as more information becomes available.`
- `A fix has been implemented and we are monitoring the results. We will provide another update as we continue to monitor recovery.`
- `This incident has been resolved.`

Two things distinguish Netlify's incident register. First, **`We have identified the issue and are working to restore normal service`** is more informative than Vercel's `The issue has been identified and a fix is being implemented.` — Netlify names the *goal* (restore service) where Vercel names the *activity* (implement a fix). The goal framing answers the user's actual question.

Second, the `Update` entry **widens the impact scope mid-incident**: "Customers may also experience issues accessing the Netlify application and its features." Telling users that the blast radius is larger than first reported, in the update rather than only in the retro, is the honest move.

The one-line retrospective is terse and complete: `We experienced increased errors and latency in the IAD region on our regular network between 15:50 and 17:45 UTC. This issue has been resolved.` — region, network tier, UTC window, resolution, in two sentences.

**`our regular network`** is the notable phrase: it distinguishes the standard edge tier from the `High-Performance Edge Network` component, so an Enterprise customer on the HP tier learns they were unaffected. Scope disclosure by product tier inside an incident note.

Incident titles: `Errors accessing Netlify-hosted sites` · `Elevated Image CDN Errors` · `Elevated Errors and Latency in IAD Region`. Sentence case in the first, Title Case in the other two — inconsistent, the same defect recorded for Vercel.

### 6.8 Status components — ~40, with 11 named third-party dependencies `[observed]`

Legend: `Operational` · `Degraded Performance` · `Partial Outage` · `Major Outage` · `Maintenance`. Rollup `All Systems Operational`.

Netlify components: `High-Performance Edge Network` · `Standard Edge Network` · `Origin Servers` · `Build Pipeline` · `Netlify Application UI` · `API` · `Hosted DNS` · `Prerendering` · `Identity` · `Netlify Functions` · `Analytics` · `Log Drains` · `Collaborative Deploy Previews` · `Git Gateway` · `Edge Functions` · `Netlify Image CDN` · `Netlify Blobs` · `Netlify Observability` · `Netlify Connect` · `Netlify Create API` · `Visual Editor` · `Netlify Forms` · `Netlify Support Forums` · `Netlify Helpdesk` · `Domain Purchasing` · `Billing` · `Agent Runners` · `AI Gateway` · `Live Tunnel`

**And a dedicated `Third-Party Services` group with eleven named upstream dependencies** `[observed]`:

`Atlassian Bitbucket API` · `Atlassian Bitbucket Webhooks` · `Atlassian Bitbucket SSH` · `npm, Inc. Registry Reads` · `GitHub API Requests` · `GitHub Webhooks` · `GitHub Git Operations` · `NS1 API` · `NS1 Management Portal` · `Name.com`

This is the most complete dependency disclosure in the batch — more granular than GitLab's per-component provider annotation, because Netlify breaks each vendor into the **specific operations it depends on**. `GitHub API Requests` / `GitHub Webhooks` / `GitHub Git Operations` as three separate components means a user whose build is stuck can determine whether GitHub's webhook delivery or its Git service is the culprit. `npm, Inc. Registry Reads` scopes to reads only.

The practical consequence for content: when a build fails because npm is down, Netlify's status page can say so, and the user's error message (`Failed to install builder dependencies`-class) has a place to resolve to.

**`Netlify Support Forums` and `Netlify Helpdesk` are both status components**, so "can I ask for help" is answerable during an outage — matching GitLab (`Support Services`) and Vercel (`Support Center`, `Support Chat`).

**The "About This Site" note routes to the forum rather than explaining inline** `[observed]`: "For more information on how we use this page and what these components mean, please see [a Discourse thread titled] 'Important: Is Netlify down? Keeping up with Netlify Status'". The canonical explanation of the status page lives in the community forum, as a support-guide thread. Consistent with Netlify's overall help architecture (T11) and a genuine choice rather than an oversight — but it means the definitional content for a trust surface sits on user-generated infrastructure.

### 6.9 Retention as a state boundary `[documented]`

Four different retention rules, each with the user-visible consequence stated:

- Failed and canceled deploys: deleted after **30 days (90 on paid plans)**
- All deploys: deleted after **30 days (90 on paid plans)**, Enterprise adjustable to **365**
- Never auto-deleted: the published deploy, the most recent successful production deploy, the most recent successful branch deploy per branch
- Consequence: "If you visit the deploy permalink for an automatically deleted deploy, **a generic 404 page is returned.**"

And a warning attached to the *setting* rather than the behaviour: "if you set your site's deploy retention to 30 days and confirm this update, **all eligible deploys older than 30 days will delete with no additional warning.** Netlify runs deploy deletions daily."

`with no additional warning` is the clause that matters. A destructive setting change whose effect is immediate and silent, disclosed at the point of change.

## T7 Error, failure & recovery

The deepest section. Netlify's failure content splits into **build-time errors (16 named cases), deploy-time errors, and a cross-product error reference** — plus an AI diagnosis feature with its own trust disclosure.

### 7.1 Build troubleshooting — 16 named failures, titled as symptoms `[documented]`

Section titles from `Build troubleshooting tips`, in page order:

`Command not found` · `Unexpected 404 page errors` · `` Build command named `build` `` · `` Build fails with `exit status 128` `` · `Build fails on warning message` · `Build fails on peer dependency conflict` · `Case sensitivity` · `Large files or sites` · `Post processing` · `Build cache` · `Enqueued builds` · `Organization-owned private repository` · `` Error: `Uncaught SyntaxError: Unexpected token` `` · `` Error: `Page not found` ``

**Three title conventions coexist**: `Build fails <condition>` (three entries), `Error: <backticked verbatim string>` (two entries), and bare topic nouns (`Case sensitivity`, `Build cache`, `Post processing`, `Large files or sites`). The `Build fails on…` family is the best of the three because it is symptom-first — a user whose build failed on a warning will scan for "Build fails" and find it. The bare-noun entries (`Case sensitivity`) are the weakest: a user does not know their problem is case sensitivity until after they have read the entry.

**The page opens with a two-step triage before any specific error** `[observed]`, and this is the most transferable thing in the section:

> "In case your build fails on Netlify, **first make sure it builds locally in your own development environment.** This is a prerequisite to all of the below suggestions."
> "If your build works locally, **the next debugging step is to ensure the package versions we use to build match yours.** … **That's the leading cause of build failure.**"

Two ordered checks before the catalogue, with the second one explicitly ranked ("the leading cause"). A troubleshooting page that tells you the base rate before the long tail. Compare GitHub's REST troubleshooting, which opens directly into rate limits, and Vercel's error list, which is unordered.

**Grammatical pattern of the entries: cause first, mechanism second, fix third — and the causes are explained rather than asserted.** Three examples worth quoting for their structure.

*`Build fails on warning message`* — the most complete explanation in the file:

> "a build may fail due to a warning message that would not cause a build failure when run locally. This is because some libraries and build tools handle warnings differently **when they detect that they are being run in a Continuous Integration (CI) environment.**"
> "Like many other CI tools and platforms, Netlify sets a build environment variable, `CI=true`, as a convention… Many libraries use the presence of the `CI` variable to trigger changes in their behavior, such as removing progress spinner animations or user prompts. **In some cases, a library may also choose to treat warning messages as errors, failing the build.**"
> "Generally, libraries that choose to fail on warnings **presume their users will want to fix the issues causing the warnings.** If this isn't practical for your use case, you can override the `CI` variable by adding `CI=''` to the beginning of your site build command."

Netlify explains that the failure is **not its own behaviour**, names the mechanism (`CI=true`), explains *why third parties behave that way* (they assume you want to fix warnings), and only then gives the override. Attributing a failure to a third-party convention without blaming the user or the third party is delicate, and this does it well.

And then the callout that makes it genuinely useful:

> **"False" isn't always false**
> "Though it seems like the logical opposite of `CI=true`, setting `CI=false` may not work as expected. This is because environment variable values are processed as strings, and many libraries interpret *any* non-empty string value for `CI` as `true`."

**Pre-empting the wrong fix that the reader is about to try.** `CI=false` is the obvious next move and it silently does nothing. Naming the trap, with its mechanism, in a titled callout is the single best piece of error-adjacent content in this file.

*`Case sensitivity`* — the entry whose last clause is the finding:

> "If you develop on Windows or OSX, and your code includes something like `jQuery/jquery.js` — the Netlify build may fail as the file system used in Netlify builds is case sensitive while your build environment is not. **The error messages that result may not clearly indicate this!**"

An admission, with an exclamation mark, that the platform's own error messages fail to identify this cause. Then a fix that anticipates a second trap: "it may be necessary to `git mv` or `git rm` and then add the file again, **as renaming and committing will not have the desired effect.**"

*`Build fails with exit status 128`* — cause attributed to a *temporal* change:

> "Typically this means that we don't have permission to clone the repository you are trying to deploy. The usual cause for this is that someone made some changes to settings for the parent organization, or repository, **some time after linking the repository to your site.** We only have permission to create a copy of your code when you link the repository."

The mental model is stated in one sentence — permission is captured at link time, not checked at build time — which explains why a build that worked yesterday fails today. Then the fix path with the full settings route, then a **follow-up caution**: "If you do this, please check your webhook settings at your Git provider to be sure you don't have any duplicate Netlify webhooks."

Plus a `Permission levels` callout naming the real blocker: "Your GitHub, GitLab, Bitbucket, Azure DevOps, or Cursor Origin user account may not have the privilege level required to link the repo to Netlify, **even if you can log in and access it from the Git host's website.**" The `even if you can…` clause pre-empts the user's counter-argument.

**Four entries name the failure Netlify will not cause** `[documented]` — negative-scope statements:

- Post processing: "**Redirects or Custom header rules** that we can't process at all are mentioned near the end of the build log and in the Deploy Summary for a deploy, but will **not** cause the build or deploy to fail."
- Large sites: "Sites with tens of thousands of html files can lead to long processing times. **This shouldn't cause the deploy to fail**, but even a 'quick' manual deploy can take quite awhile (many minutes) to finish"
- Build cache: cache is a retry knob, not a failure cause
- Enqueued builds: queueing is not failure

Telling a user which anomalies are *not* their problem is as valuable as telling them which are. (`awhile` should be `a while`; typo in published docs.)

**Retry counts are disclosed** `[documented]`: "many things that fail will lead to a retry; **if after 4 retries it still hasn't worked, we fail the deploy.** You'll probably need to contact support in this case to get more details about the error." Naming the retry budget and admitting the error detail is not self-service.

**Plan-gated failure** `[documented]` — `Organization-owned private repository`: "If you have a Core Starter plan site connected to an organization-owned private GitHub repository, **your builds will fail.**" Then four alternative remedies (upgrade, deploy manually via CLI/API/drag-drop, transfer the repo, make it public), only one of which is a purchase. Then a mechanism note: "If you change your GitHub repository settings, you must push a commit for Netlify to receive the new settings."

Putting three free workarounds beside the upgrade is the same practice as Vercel's `Any plan:` fallback, and it is the right pattern for a plan-gated error.

### 7.2 The error reference — cross-product, symptom-titled `[documented]`

A separate page from build troubleshooting, and its section titles are written as **the user's observable symptom**, not the system's fault:

`Deploy timeout error` · `Domains and DNS errors` · `Drag and drop deploy stuck "uploading" or "In progress"` · `HTTPS errors` · `Non-zero exit code` · `Page not found error` · `Payment error` · `Site doesn't have a secure URL with https` · `SSL certificate errors`

**`Site doesn't have a secure URL with https`** is the standout title. It describes what the user sees in their browser bar, in words they would use, and then redirects to the technically-named section (`SSL certificate errors`). The same page also lists `HTTPS errors` as a third entry pointing at the same target. **Three doors into one answer, deliberately.** That is a findability decision most documentation teams would reject as duplication and it is exactly right — the user who says "no padlock", the user who says "https broken", and the user who says "SSL cert" all arrive.

**Verbatim error strings are quoted as a scannable list** `[documented]` — the `Common SSL Certificate Errors` block:

- "We could not provision a Let's Encrypt certificate for your custom domain"
- Certificate stuck on "Waiting on DNS propagation" for more than 48 hours
- "DNS verification failed" when provisioning certificate
- "Missing certificate" or certificate won't provision
- "Your domain doesn't appear to be served by Netlify"
- HTTPS not working or showing "connection not secure" warnings
- Certificate provisioning has been pending for over 24 hours

Seven entries mixing quoted product strings, quoted browser strings, and **duration-based symptoms** ("stuck for more than 48 hours", "pending for over 24 hours"). The duration entries are the useful innovation: a user whose certificate is `Waiting on DNS propagation` has no error at all — they have a state that has lasted too long. **Naming a normal state plus an elapsed time as a recognised failure** gives that user somewhere to go, and it is directly transferable to any pending/processing state (payment holds, verification reviews, transfers).

`Waiting on DNS propagation` is also a status label surfaced in the error reference — the only place the SSL state vocabulary appears publicly in this harvest.

**Non-zero exit code entry quotes the actual log output** `[documented]`:

```
Bulid failed due to a user error: Build script returned non-zero exit code: 2
Failing build: Failed to build site
```

**`Bulid` — a typo in the quoted build-log string.** Either the docs mistyped the quote or the product ships a misspelled log line; either way it is in the published error reference for the most common build failure on the platform. Recorded as the most consequential defect in this file, because a user pasting `Build failed due to a user error` into search will not match the docs page quoting it.

Note the message's own structure is good: `<what> due to <whose fault>: <the mechanical detail>` then a second line stating the consequence. `due to a user error` is a blunt attribution that GitLab's style guide would reject ("Do not blame the user") — but it is load-bearing here, because it distinguishes this from a platform failure and tells the user the fix is theirs.

The recovery is **navigational, not prescriptive**: "If you check your build log before the non-zero exit code, you can usually find more details about the reason for the failure." Then four numbered steps ending in "Scroll in your build log to find the failure **before** the non-zero exit code." Teaching the user to read the log backwards from the failure line is the right instruction for an error whose real cause is always upstream of the message.

**The drag-and-drop stuck entry is a six-item prevention checklist, not a fix** `[documented]`:

> "Deploys under 50MB work best. Individual files over 10MB are likely to cause your deploy to get stuck… You must have an index.html in the root of your project… Use a computer with a reliable network connection. Any network hiccups can cause the deploy to get stuck… Use a computer that has sufficient free memory - **4x your uncompressed site size is a good ballpark and more is better.**"

Then the disposal instruction: "**After 10 minutes, that older, stuck deploy will never publish, so you don't need to worry about it interfering with your next try.**"

Telling the user that the broken thing will not hurt them, so they can simply retry, removes the hesitation that keeps people stuck. And `4x your uncompressed site size is a good ballpark` gives a heuristic with an explicit confidence level rather than a false precision.

**`Page not found` gets the single most useful sentence in the error reference** `[documented]`:

> "If you drag and drop your project folder and it has an `index.html` file in the root directory when your build settings expect this, **your deploy will appear successful but you will find a page not found error.**"

A documented case where **the success state is wrong**. This is the same genre as Wise's "complete but the money hasn't arrived" and GitHub's "skipped checks report Success" — a status that is technically true and experientially false, addressed by writing the reconciling article rather than renaming the state. Three products in this corpus now, which makes it a confirmed pattern.

(The sentence as published is garbled — "when your build settings expect this" appears to be missing a negation or a different condition — so the *idea* is clear but the sentence is broken. Defect.)

**`Payment error` is the only entry addressed as a question and the only one about the user's browser** `[documented]`:

> "Are you trying to enter a credit card into `app.netlify.com` but getting an error instead?
> We recommend you try entering your credit card in an incognito window without any browser extensions enabled. We've seen ad-blocking-type browser plugins and other plugins inhibit our communication with our authentication service, and create unpredictable behavior. **Please test in an incognito window before you post in the forums or try and contact support.**"

Netlify names the third-party cause (ad blockers), discloses the mechanism (they block the auth service), and then **asks the user to try the fix before opening a ticket** — an explicit deflection instruction inside the error content. Blunt, effective, and honest about why it is there. Directly relevant to any payment-form failure caused by client-side blocking, which is a live PayPal problem.

### 7.3 `Why did it fail?` — AI diagnosis with a published trust disclosure `[documented]`

The button label is the artefact: **`Why did it fail?`**, placed on the failed-deploy summary page and on the pull/merge request.

Four things about this label. It is a **question**, not a command. It is in the **user's voice** at the moment they are asking it. It asks for a *cause*, not a fix — which sets the right expectation for what an LLM can deliver from a log. And it is **four words**, so it fits beside a failure without competing with it.

Compare the alternatives the industry ships: "Analyze", "Explain with AI", "Get AI suggestions", "Debug". All of them describe the tool. `Why did it fail?` describes the user's thought. This is the best AI-feature label in the batch and the clearest instance of writing the button in the user's own words.

**The feature ships with a plain-language data disclosure** `[observed]`:

> "This feature does not use the information processed to train models or store data outside of Netlify's systems."
> "The deploy failure details used to generate suggestions includes: a subsection of the build log entries in your deploy log at or around the place where the error returns; other metadata, such as the name of your site's framework to provide more accurate results."

Two sentences of negative assurance (no training, no external storage) followed by a **positive enumeration of exactly what is sent**. Not "we may process your data" but "a subsection of the build log around the error, plus your framework name". That specificity is what makes the assurance credible, and it is the model for any AI-feature disclosure. (`includes` should be `include`; subject-verb disagreement in published copy.)

Plus an accuracy caveat that does not hide behind hedging: "**We're continuously improving the feature to suggest accurate solutions but your team should review them for accuracy.**"

**Permission model documented as a decision tree** `[documented]`: Owners can enable or disable for the team; Developers can enable unless an Owner has disabled; and the edge case is named — "If a Developer selects the **Why did it fail?** button and the feature is not enabled or disabled for the team, then a prompt appears to enable this feature for the team." A three-state setting (enabled / disabled / unset) with the unset state producing an in-context enablement prompt rather than a dead button.

### 7.4 Recovery verbs — the deploy action vocabulary `[documented]`

Netlify's recovery surface is unusually large and each action is separately named:

| Action | What it does | Notable wording |
|---|---|---|
| `Publish Deploy` | Rollback — republish a previous atomic deploy | "**This doesn't trigger a new deploy** but instead publishes a previous atomic deploy that is still available to you. **Rollbacks are instantaneous.**" |
| `Lock to stop auto publishing` | Pin the site to the current published deploy | "New deploys won't be published to the main site, **although Netlify will still build them and they will be ready for whenever you want to publish them.**" |
| `Unlock to start auto publishing` | Resume | |
| `Cancel deploy` → `Yes, cancel deploy` | Stop an in-progress deploy | Confirmation restates the verb |
| `[skip ci]` / `[skip netlify]` | Skip a deploy via commit message or PR title | Two accepted tokens, three documented placements |
| `Trigger deploy` | Manual deploy on production branch | |
| `Retry without cache with the latest branch commit` | Retry with two modifiers | "the build triggers from the HEAD of your branch. **If the HEAD of the branch differs from the original deploy SHA, Netlify still builds from the HEAD of the branch.**" |
| `Delete deploy` → `Delete` | Permanent removal | Preceded by a "deploy deletion warning" |
| `Download` → `Download ready` | Export a deploy as ZIP | |

**`Publish Deploy` as the rollback verb is the strongest naming decision here.** Rollback is not a special operation in Netlify's model — it is publishing an older deploy, which is the same operation as publishing a new one. The vocabulary makes rollback feel ordinary rather than exceptional, which is exactly the right affective framing for a recovery action, and it is only possible because `production deploy` and `published deploy` are separate concepts (T6.1).

Three of these actions disclose what *doesn't* happen: rollback doesn't trigger a build, locking doesn't stop builds, retry doesn't use the original SHA. All three are the user's likely wrong assumption, corrected in the same paragraph.

**The rollback entry ships its own caveat** `[documented]`: "If your Netlify site is connected to a Git repository and has auto publishing turned on, **any new Git-triggered production deploys will overwrite the previously rolled back version.**" The rollback is not sticky, and the doc says so immediately — which is why `Lock` exists and why the two are documented adjacently.

**Deletion consequences are enumerated as three named outcomes** `[documented]`:

> "**The deploy context URL may no longer work.** If you delete a deploy and there are no other deploys in the context, the deploy context URL will return a generic 404 message."
> "**Your deploy context URL may show changes from a different deploy.** If you delete the most recent deploy to a deploy context, then that URL will point to the next most recent deploy in the same context."
> "**Split testing results may be disrupted.**"

Plus two anti-motivation warnings: "deleting a deploy is permanent and **does not reduce costs for your Netlify team or help you preserve build minutes**", and "the build data from deleted deploys is still included in the aggregated build minute counts and insights analytics **to help you make an accurate assessment of your team's build minutes usage.**"

**Telling users why *not* to do a destructive action** — because it will not achieve the thing they probably want — is a rarer and better pattern than a confirmation dialog. The second sentence explains why deleted data still counts, pre-empting an accusation of double-billing.

### 7.5 Deploy-permission failures — an approval state machine `[documented]`

The `Deploy Request Policy` is the most elaborate blocked-action flow in the batch.

> "Netlify has a Deploy Request Policy that ensures that Netlify only builds and deploys changes pushed to private repositories **from recognized authors.**"
> "Unrecognized authors, or non-team members, are people, automated services, or bots who are not associated with a Netlify team member account. This includes some Git-based services, like a CMS."
> "the Deploy Request Policy treats deploys from unrecognized authors as **'untrusted.'**"

`recognized` / `unrecognized` rather than "authorised" / "unauthorised" — a softer pair that describes an identity-matching problem rather than a permissions violation. Correct, because the usual cause is a contributor whose Git account is not linked, not an attacker.

The state and its two surfaces are documented together: "the subsequent deploy will have the status **Pending approval** on the **Deploys** page. The Deploy log will show a similar message of **Deploy request is pending review.**" Naming both strings and calling them "similar" is an implicit admission they differ.

Four resolution paths are offered, and **three of them are for the blocked person rather than the approver**: the contributor can connect their Git provider account to an existing Netlify user; or a Team Owner can match them to an existing member, add them as a Git Contributor, or reject. The `Reject` path states its persistence: "any future deploys by the same contributor will continue to require approval."

**Billing consequence is disclosed inside the permission flow** `[documented]`: "This ensures that your team is not charged for any Git Contributors unless they are manually approved." An approval setting whose real purpose is cost control, stated plainly rather than framed purely as security.

And the exemption is named twice: "**Builds from build hooks are not affected**" / "Deploys triggered by build hooks are treated as trusted deploys." A hole in the policy, disclosed.

## T8 Empty states

`[absent]` — no in-product empty state is reachable pre-auth, and Netlify publishes no design-system empty-state guidance on a public URL located in this harvest.

`[observed]` — three classes of no-content string were found, none of them a true product empty state:

- **Status page** (Atlassian furniture): `No incidents reported today.` · `No incidents reported.` · `No incidents or maintenance related to this downtime.` · `No downtime recorded on this day.` · `No data exists for this day.`
- **Docs**: the comparison table on pricing renders blank cells for absent features rather than an explicit "not included" value — so the absence itself is the signal. Recorded as a T10 finding rather than an empty state.
- **Deleted-deploy 404**: "a **generic 404 page** is returned" for an auto-deleted deploy permalink, and "the deploy permalink for the deleted deploy will no longer work and will show a **generic 404 error message** instead."

`generic 404 page` / `generic 404 error message` — Netlify describes its own 404 as *generic* twice, in docs, which reads as an acknowledgement that the page carries no recovery content. A user who followed a shared permalink to a deleted deploy gets no explanation of why. That is the clearest empty-state gap this harvest found, and it is documented by Netlify itself without a fix.

`[documented]` — one adjacent artefact: the `Page not found error` entry in the error reference exists precisely because Netlify's 404 is not self-explanatory, and the build-troubleshooting page notes that a firewall block also produces "only a Netlify-branded 404 page". **Three distinct causes — deleted deploy, missing index.html, firewall rule — all resolve to the same undifferentiated 404.** The documentation compensates; the page does not.

## T9 Notifications & system messages

The richest T9 in the corpus so far, because Netlify publishes a **complete deploy-event vocabulary**.

### 9.1 Twelve named deploy events `[documented]`

Each with a one-line gloss in a rigid `event emitted when <condition>` form:

| Event | Gloss (verbatim) |
|---|---|
| `Deploy started` | "event emitted when Netlify starts building your site for a new deploy." |
| `Deploy succeeded` | "event emitted when Netlify finishes uploading a new deploy to our CDN." |
| `Deploy failed` | "event emitted when a deploy does not complete." |
| `Deploy deleted` | "event emitted when a deploy is manually deleted." |
| `Deploy locked` | "event emitted when the site is locked to a published deploy, stopping auto publishing." |
| `Deploy unlocked` | "event emitted when deploys are unlocked, resuming auto publishing." |
| `Deploy request pending` | "event emitted when an untrusted deploy requires approval to begin building." |
| `Deploy request accepted` | "event emitted when an untrusted deploy request is accepted and can begin building." |
| `Deploy request rejected` | "event emitted when an untrusted deploy request is rejected." |
| `Deploy restored` | "event emitted when a deploy is manually published (usually for rollback or rollforward)." |
| `Previously successful deploy failed` | "event emitted when a deploy was previously successful but then failed." |
| `Previously failed deploy succeeded` | "event emitted when a deploy succeeded after it had failed." |

**The last two are the finding.** `Previously successful deploy failed` and `Previously failed deploy succeeded` are **transition events, not state events** — they fire on the *change in fortune*, not on the outcome. Every other platform in this batch notifies on `failed` and `succeeded`; Netlify additionally notifies on "this just broke" and "this is finally fixed".

That distinction is exactly what a notification channel needs. A team whose builds fail routinely does not want a `Deploy failed` alert every time; it wants to know when a *green* pipeline goes red. And `Previously failed deploy succeeded` is the "you can stop worrying" message, which almost no product sends. These two event names are the single most transferable thing in this file for anyone designing alerting: **notify on the edge, not the level.**

Note also the naming: the two transition events are the only ones that do not start with `Deploy`, and they are full clauses rather than noun phrases (`Previously successful deploy failed` vs `Deploy failed`). The grammar signals the difference in kind.

`Deploy restored` covers both directions — "usually for rollback **or rollforward**" — so one event name serves republishing an older deploy and republishing a newer one. `rollforward` is a coined counterpart used once.

### 9.2 Ten notification channels, with per-channel behaviour `[documented]`

`Slack` · `Email` (Pro/Enterprise only) · `HTTP Post Request` (outgoing webhook) · `GitHub commit statuses` · `GitHub pull request comments` · `GitHub commit checks` · `GitLab commit statuses` · `GitLab merge request comments` · `Bitbucket commit statuses` · `Bitbucket pull request comments` · `Azure DevOps commit statuses` · `Azure DevOps pull request comments` · `Cursor Origin commit statuses` · `Cursor Origin pull request comments` · plus `Zapier` and `n8n` integrations.

**The commit-status vs pull-request-comment split is described in terms of what each carries on success and on failure** `[documented]`, and the sentence is repeated near-verbatim across four Git providers:

> "For successful deploys, this will include a link to the Deploy Preview. For failed deploys, this will include a link to the detail page for the deploy where you can examine the deploy log and deploy the latest branch commit."

**The notification's destination changes with the outcome**: success routes to the preview, failure routes to the log. One notification type, two destinations, chosen by state. That is the right design and it is stated as a content rule rather than left implicit.

**Comment notifications are documented as updating in place** `[documented]`: "If you append more commits to a pull request, this notification will **update the comment** to indicate status changes." Mutating an existing comment rather than appending a new one — a decision that determines whether a PR thread is readable after ten pushes.

**The default notification string is named and is customisable** `[observed]`:

> "The settings include a field for a custom message, which will replace the **"Deploy preview ready!"** message that displays by default."

`Deploy preview ready!` — three words and an exclamation mark, stated twice (GitHub commit statuses and GitHub PR comments). It is the only default notification string exposed in this harvest, and it is the one string in Netlify's public corpus that carries an exclamation mark. Also note the casing: `Deploy preview ready!` lowercases *preview*, where the product noun is `Deploy Preview` throughout the docs. **The default notification string does not match the product's own capitalisation.**

**Webhook payload signing is documented with a two-field data section** `[documented]`: header `X-Webhook-Signature`, containing `iss` ("always sent with value `netlify`, identifying the source of the request") and `sha256` ("the hexadecimal representation of the generated payload's SHA256"). Two runnable verification examples (Ruby/Sinatra, Node/Express) with a gotcha called out in the second: "you need to compare the incoming request data **before it's transformed to JSON**".

### 9.3 Usage and limit notifications `[documented]`

From the pricing FAQ: threshold notices at **50%, 75%, and 100%** of a project's credit limit, by email and in-app. And the consequence at 100%: "a site pauses until the next billing cycle", with the blast radius disclosed — "**if one project exceeds its limits, all projects on your account will be paused.**"

Three thresholds is one more than the industry norm (usually 80% and 100%), and the 50% notice is early enough to change behaviour rather than just warn. The cross-project pause is the disclosure that matters: a user reading only the per-project limit would not expect their other sites to go down.

### 9.4 Lock/unlock event notifications, plan-gated `[documented]`

> "You can get notifications about locked deploys by email, outgoing webhook, or Slack. Netlify can notify you when a deploy is either locked or unlocked."
> Pricing Information: "This feature is available on all Pro and Enterprise plans."

A `Pricing Information:` callout attached to a notification capability — plan gating disclosed at the feature, in a labelled block, consistently across the docs (the same callout appears on `Email notifications` and `Change the deploy retention limit`).

**Audit-log strings are quoted** `[documented]`: the team audit log records `Deploy retention has changed` and `Deploy deleted` as named action strings. Two audit-log message formats — one a past-perfect clause, one a past-participle phrase. Inconsistent, but published, which is more than most products do.

## T10 Disclosures, legal & compliance

Netlify's pricing is **credit-metered**, and the disclosure quality is the notable thing: the credit model is explained with per-unit rates and per-meter definitions before the plan cards are compared.

**Four plans** `[observed]`

| Plan | Price | Tagline |
|---|---|---|
| `Free` | `$0 forever` | `Build and deploy free forever` |
| `Personal` | `$9 /month` | `Ready for real traffic` |
| `Pro` (badged `Best value`) | `$20 /month with unlimited members` | `Ship faster as a team` |
| `Enterprise` | `Custom` | `Scale with confidence` |

Four three-or-four-word taglines, each naming a *stage* rather than an audience: free → real traffic → team → scale. Compare GitLab's `For <audience> <participle> <need>` formula. Netlify's is shorter and describes the moment you outgrow the plan below, which is more actionable for self-selection.

`$0 forever` and `Build and deploy free forever` — **"forever" twice on one card**, which is the strongest permanence claim in the batch and is reinforced in the FAQ: "The free plan is always free, with hard monthly limits that cannot be exceeded or incur any costs."

**The credit model is disclosed as five metered dimensions with unit rates** `[observed]`, under `### Usage credits` / "Flexible plans to optimize your usage":

| Meter | Rate | Definition given |
|---|---|---|
| `Production deploys` | `15 credits each` | "A production deploy is the version of your project pushed to your main domain… Also includes: Unlimited Deploy Previews and branch deploys." |
| `AI inference` | `Varies based on AI model` | "AI inference costs are calculated based on the cost of the AI model used." |
| `Compute` | `10 credits per GB-hour` | Covers `Functions & Agent compute` and `Database compute` |
| `Bandwidth` | `20 credits per GB` | "Assets and web content served, Image CDN usage, file downloads, function responses, and Large Media (Deprecated)." |
| `Web requests` | `2 credits per 10k requests` | Page views, function requests, Netlify-hosted assets, redirects, Edge functions |

**Only production deploys are billed; previews and branch deploys are explicitly free** — "Also includes: Unlimited Deploy Previews and branch deploys." That is the pricing decision that makes the product's core workflow (`Prompt. Preview. Repeat.`) affordable, and stating it in the meter definition rather than as a footnote is correct placement.

The `AI inference` row is the honest one: `Varies based on AI model` with no number, and the explanation that cost is passed through. Compare GitLab's equivalent FAQ ("different AI models draw credits at different rates, which change over time"). Two credit-based platforms independently arriving at "we cannot give you a number here" — and both saying so rather than inventing an average.

**Rollover terms are tier-dependent and the exception is stated** `[documented]`: Pro tiers above 3,000 credits roll over unused credits for one additional billing cycle; **the base 3,000 tier does not**. Upgrades take effect immediately and reset the billing cycle; downgrades apply at the end of the current cycle. Naming which tier is excluded from the benefit, rather than describing the benefit generally, prevents the commonest billing complaint.

**Auto-recharge is disclosed as off-by-default, three times** `[observed]`:

> "Additional credits are available when you enable auto recharge (**disabled by default**)."
> "**Auto recharge is turned off by default so you just need to keep it off.** Only Team Owners can enable auto recharge."

A spend-control default disclosed at the feature, in the FAQ, and restricted to one role. The phrasing `so you just need to keep it off` is awkward (and uses the `just` that GitHub's Primer bans), but the substance — *the default protects you and you do nothing* — is the right answer to "can I set a hard spending limit".

**The hard-limit answer distinguishes the two plan classes honestly** `[documented]`: the Free plan has "hard monthly limits that cannot be exceeded or incur any costs"; paid plans control spend via auto-recharge, i.e. **there is no hard cap on paid plans**. Netlify answers "can I set a hard spending limit" with an effective no, and explains the mechanism that substitutes for it. Compare Vercel, which states the same asymmetry (Hobby pauses; Pro does not) and justifies it with an uptime argument. Netlify gives no such justification — a weaker version of the same disclosure.

**Payment-method disclosure is a named exclusion list** `[observed]`: "Netlify only accepts credit cards unless you have a Netlify Enterprise plan, in which case we do accept payment via ACH or wire transfer." The FAQ question is `Can I pay with PayPal, wire transfer, crypto, or any method other than credit card?` — naming three rejected methods **in the question**, so a user scanning finds their method and gets a no immediately. Asking the question in the form the user would ask it, including the methods you do not support, is the right FAQ construction.

**Add-on pricing** `[observed]`: `$5 / 500 additional credits` (Personal) · `$10 / 1,500 additional credits` (Pro) · `(then $40 each)` for concurrent builds · `(then $15 each)` for Preview Servers. Seven Enterprise add-ons marked `(Add-on)` **with no price** — `Project-level access control`, `Self-serve team creation`, `Org-level SSO`, `SCIM`, `Private connectivity`, `HIPAA`, `Fortified bandwidth Advanced web security + Dedicated network`.

`HIPAA` sold as an unpriced Enterprise add-on is the sharpest compliance disclosure on the page — a regulatory regime as a line item.

**Retention and history values are the main comparison currency** `[observed]`: `1-day history` · `7-day history` · `30-day history` · `Full history` · `1-day retention` · `7-day retention` · `24-hour history` · `Retention policies up to 365 days`. Eight duration strings using **three different nouns** (`history`, `retention`, `retention policies`) and two different unit styles (`24-hour` vs `1-day` for the same duration). Recorded as a defect below.

**Free-plan privacy default is disclosed as a feature** `[observed]`: `Private by default until you publish`, and in the meter definition: "On new credit-based pricing accounts, new projects start private by default and become publicly accessible only when you choose to publish." Stated on the homepage card, the plan card, and the credits explainer — three placements for one default, which is proportionate for a default that changes who can see the user's work.

**Legal and trust set** `[observed]`: `Trust Center` · `Privacy` · `GDPR/CCPA` · `Abuse` (mailto) · `Cookie Settings` · `Terms` (docs footer: `Terms of Use`). `GDPR/CCPA` as a single combined link label is unusual — two regimes, one destination. Named policies referenced from docs: `Sensitive Variables policy`, `Deploy Request Policy`, `Terms of Use`.

**Dated policy changes are disclosed** `[observed]`: "As of April 14th, credit-based Pro plans no longer charge for any seat." and "if you created a Netlify account before **September 4, 2025**, you can keep your current plan. No changes needed." The second is the good one — a grandfathering statement with a date and an explicit "no action required", which is the reassurance a long-tenured customer needs. The first is missing its year.

## T11 Help-centre architecture

Netlify runs **four help surfaces**, and the distinctive one is that the community forum functions as an official documentation tier.

| Surface | URL | Role |
|---|---|---|
| `Docs` | docs.netlify.com | Reference, how-to, troubleshooting |
| `Support Forums` / `Forums` | answers.netlify.com (Discourse) | **Verified Support Guides** — quasi-official long-form troubleshooting |
| `Knowledge Base` | netlify.com/knowledge-base/ | Marketing-side articles (not harvested) |
| `Support` | netlify.com/support/ | Ticket entry (not harvested) |

Plus `Ask Netlify` (AI) on every page, `Community`, `Discord`, and `Developer guides` (developers.netlify.com).

**The `Verified Support Guide` is a named content genre living on a Discourse forum** `[observed]`. Docs link out to it repeatedly, and the titles follow their own conventions:

- `Support Guide: I've deployed my site but I still see "Page not found"`
- `Support Guide: Debugging failed builds 101 or "build failed with non-zero exit code"`
- `Support Guide: Handling code-splitting issues on Netlify`
- `Support Guide: Compiled build and deploy resources - start here!`
- `Common Issue: How can I optimize my Netlify build time?`
- `Common Issue: Making the most of Netlify's CDN cache`
- `Important: Is Netlify down? Keeping up with Netlify Status`

**Three title prefixes function as a content-type taxonomy**: `Support Guide:` (official troubleshooting), `Common Issue:` (recurring problem), `Important:` (must-read). And the titles themselves are in the user's voice — `I've deployed my site but I still see "Page not found"` is a first-person confession with the literal error string in quotes, which is the Wise pattern and the GitHub paste-and-search pattern combined in one title.

`Debugging failed builds 101 or "build failed with non-zero exit code"` is the most interesting construction: a **dual title** joining the conceptual name and the verbatim error string with `or`. One article, two doors, in one string. That is a deliberate findability device and it is worth stealing for any help article whose readers arrive by two different routes.

The consequence, though, is that **Netlify's deepest troubleshooting content lives on user-generated infrastructure**. The build-troubleshooting doc ends by routing to the forum ("If your issue doesn't seem to be addressed above, you can visit our Support Forums to browse posts about common issues or start a new discussion") and then to **Stack Overflow** ("Many questions about specific build scenarios have also been asked and answered on StackOverflow"). Docs → forum → third-party Q&A is an unusually long and un-owned tail.

**Docs escalation furniture** `[observed]`: `Did you find this doc useful?` with a five-field form (T5) · `Previous` / `Next` pager · `Last updated: <date>` per page · `Copy page` / `View as Markdown` · `Ask Netlify`.

`Did you find this doc useful?` differs from GitHub's `Was this Doc helpful?` and `Did you find what you needed?` by asking about the *document* rather than the outcome — a subtly different question that collects a different signal. Netlify then explains why it is asking: "Your feedback helps us improve our docs."

**The docs address AI agents explicitly and twice per page** `[observed]`:

> "For the complete Netlify documentation index, see [llms.txt]. Markdown versions of any documentation page are available by appending `.md` to its URL." *(top of page)*
> "Reading these docs with an AI agent? Append `.md` to any docs URL for its Markdown source, or start from the full [llms.txt] index." *(footer)*

The footer version is addressed in the second person **to the human operating the agent** ("Reading these docs with an AI agent?"), which is a more precise audience model than Vercel's "For AI agents:" (addressed to the machine). Netlify assumes a human is reading the page and deciding what to feed the model; Vercel assumes the model is reading the page. Both ship `.md` endpoints and an `llms.txt` index; only Netlify writes the instruction to the person holding the tool.

**`Netlify skills` in the docs Reference nav** links to a GitHub repo (`netlify/context-and-tools`), and the drag-and-drop FAQ recommends "sharing Netlify context for agents with your AI tool or connecting the Netlify MCP server". Three separate agent-context mechanisms named across the docs.

**Article-title grammar — five shapes:**

| Shape | Examples |
|---|---|
| Imperative task | `Choose your path` · `Fix a failed deploy` · `Manage deploys` · `Stop or activate builds` · `Configure builds` · `Ignore builds` |
| Gerund/noun topic | `Deploy overview` · `Deploy notifications` · `Build troubleshooting tips` · `Error reference` |
| `Start with/from X` | `Start with AI agent` · `Start from files` · `Start from local development` |
| Symptom | `Build fails on warning message` · `Drag and drop deploy stuck "uploading" or "In progress"` · `Site doesn't have a secure URL with https` |
| `Error: <string>` | `` Error: `Uncaught SyntaxError: Unexpected token` `` · `` Error: `Page not found` `` |

`Fix a failed deploy` is the only page title in the corpus that is a **bare imperative naming the user's goal in their own words** — not "Troubleshooting deploy failures", not "Deploy failure reference". Three words, one verb, the thing the reader wants.

## T12 FAQs

`[observed]` — one FAQ section, on the pricing page, under a bare `## FAQ` heading with an anchor-nav entry. **Eleven questions, and the distribution is entirely commercial**: nine concern credits, billing, seats, or payment; two concern plan migration; none concerns the product's capabilities.

| # | Question (verbatim) | Answer (summarised) |
|---|---|---|
| 1 | `I'm an existing Netlify customer, do I have to change plans?` | No — accounts created before 4 Sept 2025 keep their plan; Team Owners can migrate via `Usage & billing > Plan details > Change team plan`. |
| 2 | `I have a legacy pricing plan. Where did the pricing plan table and FAQ information go that I still need?` | Plan details are in the team dashboard; legacy-plan FAQ moved into docs. |
| 3 | `Are new projects public as soon as I deploy?` | No — on credit-based accounts every new project is private until you publish. |
| 4 | `How do credits work for bandwidth, compute, AI inference dollars, and web requests, and production deploys?` | Each metered feature consumes credits by usage; routes to the "How credits work" docs. |
| 5 | `How do the Pro plan monthly credit tiers work?` | Owners pick a flat-price tier from 3,000 to 20,000; tiers above 3,000 roll over one cycle; upgrades immediate, downgrades at cycle end. |
| 6 | `What happens when a project reaches its credit limit?` | Site pauses until next cycle; notices at 50/75/100%; one project over limit pauses all projects; upgrading resumes. |
| 7 | `How does billing work for metered features and extra usage packages?` | Enable auto recharge to stay active and buy credits in small batches. |
| 8 | `Can I set a hard spending limit for metered features and have it shut off when the limit is reached?` | Free has hard limits; paid plans use auto recharge, off by default, Owner-only. |
| 9 | `How does pricing work for adding people to my Netlify team?` | Free/Personal cannot add seats; credit-based Pro charges nothing per seat as of April 14th; unlimited free Reviewer roles on all plans. |
| 10 | `Can I pay with PayPal, wire transfer, crypto, or any method other than credit card?` | Credit cards only, except Enterprise (ACH or wire). |
| 11 | `Do you offer discounts for open source projects?` | Yes — the Netlify Open Source plan gives qualifying projects monthly credits, free production deploys, and unlimited members. |

**Structural notes.** Ten of eleven are first- or second-person from the customer (`I'm an existing customer…`, `Can I pay with…`, `How does pricing work for adding people to **my** Netlify team?`). Only Q3 and Q6 are framed about the system. This matches GitLab's pricing FAQ register and inverts GitHub's third-person Trust Center FAQ.

**Q2 is the unusual one.** `I have a legacy pricing plan. Where did the pricing plan table and FAQ information go that I still need?` — a question written *from the perspective of someone whose content was taken away*, acknowledging the removal ("that I still need") and routing to where it went. Most products silently delete legacy pricing content. Publishing a question that admits the reader's content disappeared, in their voice and with a hint of grievance, is a genuinely unusual piece of migration content and the single most quotable FAQ item in this file.

**Q8 is a compound question that pre-states the desired behaviour**: `Can I set a hard spending limit for metered features **and have it shut off when the limit is reached**?` The second clause defines what the asker means by "hard limit", so the answer cannot equivocate. Asking the question with its acceptance criterion attached is a good technique when the honest answer is partially no.

**Q10 names three rejected payment methods in the question** (see T10) — the FAQ equivalent of stating what you are not.

**Q4 is malformed**: "How do credits work for bandwidth, compute, AI inference dollars, and web requests, and production deploys?" — two `and`s, a doubled list, and `AI inference dollars` as an undefined unit that appears nowhere else on the page. Defect on the question whose whole job is explaining the pricing unit.

**Q11 names a plan that does not appear in the comparison table** — the `Netlify Open Source plan` exists only in this answer. A fifth plan, disclosed in an FAQ.

## T13 Terminology & glossary

`[absent]` — **Netlify publishes no glossary page.** Definitions are distributed: a `### Definitions` block on the deploy-overview page (six terms), another referenced on the build-configuration overview, and inline glosses throughout. Compare Vercel's ~130-entry A–Z glossary. This is the largest terminology gap in this file, and it matters because Netlify coins heavily.

| Term | Netlify's usage | The alternative it rejected / note |
|---|---|---|
| `Deploy` (noun) | The central object — "you always create a new deploy" | `deployment`. **Netlify uses the clipped noun throughout**, where GitHub, GitLab, and Vercel all say "deployment". `deploy` as a countable noun is Netlify's signature and it makes every compound shorter: `deploy log`, `deploy summary`, `deploy context`, `deploy permalink`, `deploy retention` |
| `Deploy Preview` | Title Case product noun; URL prefix `deploy-preview-` | `preview environment`, GitLab's `review app`, GitHub's `deployment environment` |
| `Published deploy` vs `Production deploy` | Two separate definitions (see T6.1) | Most platforms have one concept |
| `Atomic deploy` | The consistency guarantee | Borrowed from database vocabulary and explained by contrast with FTP |
| `Permalink` | The immutable per-deploy URL | "deploy URL" |
| `Deploy context` | The config namespace; also a TOML key | "environment" |
| `Preview Server` | A named deploy context and a billed add-on (`then $15 each`) | |
| `Netlify Drawer` | The feedback overlay on Deploy Previews | Vercel's `Toolbar`, GitHub's PR review. **`Drawer` is a UI-pattern word promoted to a product name** |
| `Netlify Drop` | Drag-and-drop deploy | Vercel independently named its equivalent `Vercel Drop` — convergent naming |
| `Agent Runners` | The AI build product, first item in the platform nav | GitLab's `Duo Agent Platform`, Vercel's `Agent Stack` |
| `Agent experience` | A company-level concept in the footer under `Company` | The only product in this batch treating agent usability as an org value |
| `Primitives` | Docs IA category for Functions, Edge Functions, Blobs, Database, Caching | "building blocks", "services". Matches the homepage line `Build with agent-ready primitives.` |
| `Git Contributor` | A billing-and-permission role for non-team-member committers | "collaborator", "outside contributor" |
| `Reviewer` | An unlimited free role for deploy review | Distinguished from `Developer` and `Owner` |
| `recognized` / `unrecognized author` | The Deploy Request Policy vocabulary | "authorised"/"unauthorised" — softer, describes identity-matching not violation |
| `untrusted` (in scare quotes) | How the policy classifies unrecognised-author deploys | Netlify quotes its own term, signalling it is a technical classification not a judgement |
| `Build Pipeline` | Status component name | |
| `Build image` | The named build environment | |
| `Enqueued` | The queue state, with three named queues | "queued", "pending", "waiting" |
| `Enqueued: Awaiting Capacity` | The specific team-queue label | A two-part label: state, then cause |
| `Lock` / `Unlock` (a deploy) | Pin the published deploy | "freeze", "pause deploys". Netlify's verbs are shorter and the button labels supply the meaning |
| `Publish Deploy` | The rollback verb | "restore", "revert", "roll back" |
| `rollforward` | Coined counterpart to rollback, used once in the `Deploy restored` gloss | |
| `Skew protection` / `version skew` | Client/server version mismatch | Vercel uses the identical term `Skew Protection`. **Convergent coinage across two competitors** |
| `hard navigation` / `soft navigation` | Browser navigation types, borrowed from the SPA vocabulary and cited to Chrome docs | |
| `credits` | The metering unit across five dimensions | GitLab also says `credits`; Vercel says `GitLab Credits`-equivalent too. **Three of five products in this batch converged on "credits" for usage metering in 2026** |
| `auto recharge` | The overage mechanism | "auto top-up", "pay as you go" |
| `Fortified bandwidth` | An Enterprise add-on | Unglossed and run together with two other labels in the served text |
| `High-Performance Edge Network` / `Standard Edge Network` / `our regular network` | **Three names for the tiering of one system** — two status components and one incident-note phrase | |
| `Project` vs `Site` | Used interchangeably throughout, including within one FAQ answer | **The most pervasive inconsistency in this file** — see below |
| `Netlify Create API` / `Visual Editor` | Two status components for an apparently related product | |
| `Ask Netlify` | The AI assistant | Vercel's `Ask AI`, GitHub's `Search or ask Copilot` |
| `Verified Support Guide` | A named forum content genre | |
| `Deploy Navigator` / `Deploy wizard` | Two names, one feature, two docs pages | |

**The `project` / `site` collision is the significant terminology finding.** Netlify has evidently renamed *site* to *project*, and the migration is incomplete across every surface harvested:

- Docs URL paths still say `sites/` (`https://app.netlify.com/sites/SITE_NAME/deploys/...`) while UI paths say `projects/` (`https://app.netlify.com/projects/{site_name}/configuration/...`) — **and the projects URL takes a `{site_name}` parameter.**
- Settings paths say `Project configuration`; the same documents say "your site's Deploys list" and "for your site, go to…".
- The pricing FAQ switches three times within one answer: "When a **site** reaches its monthly usage limits… if one **project** exceeds its limits, all **projects** on your account will be paused… You can re-enable your **sites** at any time."
- Docs sentences mix them mid-paragraph: "Deploy logs for a **site** linked to a private repo are available to all **site** members" beside "your **project's** production branch".
- Homepage says `project` consistently; status page says nothing; error docs say both.

A half-completed rename visible in URLs, settings labels, FAQ answers, and body copy simultaneously. It is the clearest example in this corpus of why a terminology migration needs a published word list and a tracked inventory — which is exactly what Netlify, alone among the three code-hosting products here, does not publish.

## T14 Voice, tone & accessibility

`[absent]` — **Netlify publishes no content style guide, voice-and-tone documentation, or design-system content guidance** on any public URL located in this harvest. Like Vercel, and unlike GitHub (Primer) and GitLab (Pajamas). Every observation below is inferred from output.

**Inferred voice.** Warmer and more conversational than any of the other four, and distinctly *instructional*:

- **First-person plural is used constantly and possessively** — "the package versions **we** use to build match yours", "**we** don't have permission to clone the repository", "**we** fail the deploy", "Once **we** find your configuration file, **we'll** automatically use it", "Files over 10 MB… are not well-supported by **our** CDN", "**We've seen** ad-blocking-type browser plugins…". Netlify writes as an agent doing things on the user's behalf, including in failure copy. Compare Vercel's more passive reference register.
- **Direct address with contractions throughout** — "you don't have to build your project first", "it's worth retrying", "you'll probably need to contact support", "Don't name your build command `build`".
- **Prohibitions are bare imperatives** — "Don't name your build command `build` in our production build environment. This will fail and give you **a strange build log.**" `a strange build log` is an unusually informal description of a failure mode, and more honest than a technical one.
- **Hedged certainty is explicit** — "Typically this means…", "The usual cause for this is…", "you may find…", "**may not clearly indicate this!**", "4x your uncompressed site size is **a good ballpark**", "Your site **should** now be published". Netlify hedges where it is uncertain instead of asserting.
- **Emoji appear in docs body copy** — `(deploying! 🚀)` and `🎉` in the drag-and-drop success step, plus `🎉` in a docs banner ("More flexibility and credits now available for Pro plans 🎉"). Both Primer and Pajamas would flag these; Netlify uses them at exactly two moments (first explanation of the core verb, first successful deploy), which is defensible restraint even without a rule.
- **Exclamation marks are rare and load-bearing** — three observed: `The error messages that result may not clearly indicate this!`, `Deploy preview ready!`, and a forum title. The first is the interesting one: an exclamation mark used to flag a *defect in the product*, not excitement.
- **`Please` appears in instruction and deflection copy** — "**Please** check your webhook settings", "**Please** test in an incognito window before you post in the forums", "**please** reach out to Netlify Support", "**please** see [the forum thread]". Four instances, all in requests that cost the user effort. GitLab's inconvenience exception, applied without a published rule.
- **The register does not flatten as stakes rise** — the deletion warning ("deleting a deploy is permanent") is written in the same conversational voice as the onboarding copy. Compare Wise, where colloquialism disappears from the fee table. Netlify's voice is uniform, which is simpler but loses the tonal signal that something serious is happening.

**Accessibility content** `[observed]`

- `Skip to content` on marketing (`#main`) and docs (`#_top`) — present on both, with different anchors.
- **Every disclosure control is labelled in words**: `Toggle main menu`, `Toggle platform submenu`, `Toggle solutions submenu`, `Toggle developers submenu`, `Toggle resources submenu`, `Close announcement bar`. Per-menu toggle labels rather than a single generic one — the best nav-control labelling in this batch.
- `Section titled "<heading text>"` as the accessible name of every heading anchor link in docs. Self-describing rather than `#`.
- `Site theme` with `System` / `Dark` / `Light`, offered on both marketing and docs. `System` included.
- **Alt text is genuinely descriptive on illustrations** — "Line drawing illustration of a code editor with HTML tags, multiple lines of code, and surrounding icons including for various AI tools and frameworks." · "Line drawing illustration of a browser window containing connected elements - a chart showing upward trending data, a security lock icon, a progress bar with checkmark, and a power plug." · "Line drawing illustration showing two overlapping circles with decorative clouds, one representing a rollback and the other a meter increasing." The third names what the illustration *means* (rollback, a rising meter), not just its shapes. Better than Vercel's heading-duplication, short of GitHub's demo narration.
- **Docs screenshot alt text describes the UI state being pointed at** — "A failed deploy with a 'Why did it fail?' button and a diagnosis and suggested solution above the deploy log details" · "Simple workflow diagram with words 'start, build, deploy, manage, extend' with deploy highlighted" · "Build failure reason highlighted for exit code error". The alt names the *highlight*, which is the whole instructional payload.
- **But most docs screenshots have empty alt** — at least a dozen `![](/images/...)` instances across the deploy-overview and manage-deploys pages, including images that are the sole illustration of a UI control (`site-deploys-manage-deploys-lock-deploy-lock.png`, `configure-builds-retry-deploy-dropdown.png`, `site-deploys-outgoing-notifications.png`). **Inconsistent alt-text practice within single pages**: the AI-diagnosis screenshot is described in 20 words, the lock-deploy screenshot in zero.
- Customer logos on the homepage carry brand-name alt (`Meta`, `Autodesk`, `Riot Games`) and the strip is duplicated twice in markup (marquee), so a screen-reader user meets each logo twice.
- **The docs feedback honeypot label `Do not fill in this field` is in the served text** and will be announced. Accessibility defect (T5).
- `Play` as the sole label on the homepage video control.
- **No accessibility statement, VPAT, or conformance report was located.** Same gap as Vercel.

**Negative findings, recorded honestly**

- **`Bulid failed due to a user error`** — misspelling in the quoted build-log string on the error-reference page, for the platform's most common failure
- `project` / `site` used interchangeably across URLs, settings labels, FAQ answers, and body copy — including three switches inside one FAQ answer; `projects/{site_name}` in a documented URL
- `Deploy wizard` (choose-your-path) vs `Deploy Navigator` (deploy-overview) — two names for the onboarding entry point
- `Wordpress` misspelled in primary navigation (should be WordPress)
- `Pending approval` (Deploys list) / `Deploy request is pending review` (deploy log) / `Pending review` (filter) — three strings for one state
- `Retry without cache with the latest branch commit` / `Retry without cache` — two lengths for one control across two docs pages
- `Calculate your cost` / `Use our calculator` and `Full feature comparison` / `See full feature comparison` — two labels each, one anchor each
- `Save` / `Save setting` both used as confirm labels
- `Options > Delete deploy` / `Delete deploy` / `Delete` — three labels in one deletion path
- `99.99% SLA` (Enterprise card) vs `99.99% uptime SLA` (table); `24/7 dedicated support` (card) vs `24×7×365 support with SLA` (table)
- `history` / `retention` / `retention policies` used for the same concept across comparison rows; `24-hour history` beside `1-day history` for the same duration
- `300 credit limit` (Free) vs `1,000 credits included` (Personal) for structurally identical cells
- Pro card says `30-day analytics & metrics`; the table gives Pro `7-day history` observability — card and table disagree
- Pro card says `3+ concurrent builds`; table says `3   (then $40 each)`
- Personal lists `1-day observability` under `Everything in Free, plus:` but the table shows Free already has `1-day history`
- `form submissions` named as a credit meter in a footnote but absent from the credits section and the comparison table
- `Netlify Database` tiers `Basic` / `Relaxed` / `Advanced` — `Relaxed` is an undefined and ill-matched sibling
- `Fortified bandwidth Advanced web security + Dedicated network` — run-together add-on label
- `Netlify Open Source plan` named only in an FAQ answer, absent from the plan table
- `As of April 14th` — dated policy with no year, on a 2026 page
- Q4 of the pricing FAQ is malformed (two `and`s; `AI inference dollars` undefined)
- Double space after the first full stop in `Build your way.  Ship on one platform.` and `Build free.  Scale when you need it.`
- `Build your way.` and `Start your way.` — near-identical headings, same page
- `Deploy preview ready!` lowercases *preview* against the product noun `Deploy Preview`
- Settings-path segments mix sentence and title case: `Developer settings` / `Continuous deployment` / `Build & Deploy` / `Automatic Deletion` / `Access & security`
- Incident titles mix sentence case (`Errors accessing Netlify-hosted sites`) and Title Case (`Elevated Image CDN Errors`)
- `High-Performance Edge Network` / `Standard Edge Network` / `our regular network` — three names for one tiering
- `awhile` for `a while`; `includes` for `include` (AI disclosure); the `Page not found` cause sentence is garbled ("when your build settings expect this")
- Docs honeypot label `Do not fill in this field` exposed to assistive technology
- At least a dozen docs screenshots ship with empty alt on the same pages as 20-word alt text
- Customer-logo strip duplicated in markup
- `generic 404 page` acknowledged twice in docs as the destination for deleted-deploy permalinks, with no recovery content
- No glossary, no published content style guide, no accessibility statement
- Deepest troubleshooting content lives on a Discourse forum and, at the tail, on Stack Overflow

---

## Transferable patterns

1. **Separate "the version that came from production" from "the version currently serving".** `Production deploy` vs `Published deploy`. Two nouns that are usually the same object and diverge exactly when the user has rolled back or paused publishing — which is when they most need vocabulary. Without the split, rollback copy has to say "the deploy that's live but isn't the latest", and every product that conflates them ends up writing that sentence.
2. **Name the rollback after the ordinary operation, not the exceptional one.** `Publish Deploy`, with "This doesn't trigger a new deploy… Rollbacks are instantaneous." Rollback framed as *publishing something you already have* rather than as an undo makes it feel routine and low-risk, which is the correct affective framing for a recovery action taken under pressure.
3. **Notify on the transition, not the state.** `Previously successful deploy failed` and `Previously failed deploy succeeded`. A team with a flaky pipeline does not want an alert on every failure; it wants "this just broke" and "this is finally fixed". Two event names that almost no platform ships, and the single most reusable idea in this file for alerting, incident, and status-change messaging generally.
4. **Put the consequence in the button label.** `Lock to stop auto publishing` / `Unlock to start auto publishing` / `Retry without cache with the latest branch commit`. Five to nine words, naming both the action and what changes as a result. Long labels are correct where the action is infrequent, consequential, and otherwise ambiguous — exactly the profile of most settings and recovery controls.
5. **Write the diagnosis button as the user's question.** `Why did it fail?` — a question, in the user's voice, asking for a cause rather than promising a fix. Four words. Every competitor labels the same feature after the tool ("Analyze", "Explain with AI"); Netlify labels it after the thought. Applies to any AI-assist entry point placed next to a problem.
6. **Pre-empt the wrong fix the reader is about to try.** `"False" isn't always false` — a titled callout explaining that `CI=false` silently does nothing, with the mechanism (string coercion). The most valuable error-adjacent content is often not the fix but the *near-miss* that will waste the user's next hour.
7. **State the base rate before the long tail.** "first make sure it builds locally" → "the next debugging step is to ensure the package versions match" → "**That's the leading cause of build failure.**" Two ordered checks, one explicitly ranked, before a sixteen-entry catalogue. Ranking your own causes is cheap and almost nobody does it.
8. **Give the same answer three doors.** `HTTPS errors`, `Site doesn't have a secure URL with https`, and `SSL certificate errors` all resolve to one section. The user who says "no padlock", the user who says "https broken", and the user who says "SSL cert" all arrive. Deliberate title duplication beats elegant taxonomy when the vocabulary gap is real.
9. **Treat "normal state, too long" as a recognised failure.** "Certificate stuck on 'Waiting on DNS propagation' for more than 48 hours"; "stalled in `Uploading` or `In progress` status for more than 10 minutes". A user in a pending state that has overrun has no error to search for. Naming the state plus an elapsed threshold gives them a destination. Directly transferable to payment holds, KYC reviews, transfers, and disputes.
10. **Tell the user the broken thing is inert.** "After 10 minutes, that older, stuck deploy will never publish, so you don't need to worry about it interfering with your next try." The hesitation that keeps people stuck is usually fear of making it worse, not ignorance of the fix.
11. **Tell users why *not* to take the destructive action.** "deleting a deploy is permanent and **does not reduce costs for your Netlify team or help you preserve build minutes**." Removing the motivation is more effective than a confirmation dialog, and it pre-empts the follow-up complaint that deleted data still counts.
12. **One visible state, three named causes, three remedies.** `Enqueued` → System queue / Team queue / Context queue, each with its own explanation and its own way out, plus the remedy control named on the page where the problem appears (`Manage build capacity`). Any shared-capacity queue owes its users this triage.
13. **Explain a guarantee by describing the failure mode of the thing they already use.** The atomic-deploy explainer spends a paragraph on half-uploaded FTP sites before restating the guarantee. Anchoring an abstract property to a remembered pain is more durable than defining it.
14. **Gloss your own jargon in the direction the user needs.** "Find your fastest path to publishing your project live on the web **(deploying! 🚀)**". Plain language first, product term in parentheses — so the reader learns the word they will need for the rest of the documentation at the moment they first need it. The reverse order (jargon first, gloss second) teaches nothing.
15. **Two prepositions to encode create-vs-migrate.** `Start with template` / `Start with framework` for new work; `Start from files` / `Start from local development` / `Start from a remote Git repository` for existing work. Eight onboarding paths disambiguated by one word, consistently.
16. **Put the failure route immediately after the success step, before the polish step.** The drag-and-drop flow does success → verify → "if it isn't working, here" → optional refinement. The reader who failed will stop reading; the refinement can wait.
17. **Pre-fill the abuse report.** `mailto:fraud@netlify.com` with subject `Abuse report` and body "Please include the site URL and reason for your report, and we will reply promptly." Two required fields named and a response commitment made, at zero engineering cost.
18. **Enumerate exactly what an AI feature sends.** "a subsection of the build log entries in your deploy log at or around the place where the error returns; other metadata, such as the name of your site's framework" — after two sentences of negative assurance. The specificity is what makes "we don't train on your data" believable.
19. **Route the notification by outcome.** "For successful deploys, this will include a link to the Deploy Preview. For failed deploys, this will include a link to the detail page… where you can examine the deploy log." One notification, two destinations, chosen by state. Stated as a rule across four Git providers.
20. **Name the meter that is free.** "A production deploy is… 15 credits each… **Also includes: Unlimited Deploy Previews and branch deploys.**" Putting the free dimension inside the paid meter's definition tells the user which behaviour the pricing is designed to encourage.

## Caveats & gaps

- **All in-product strings are `[documented]`, not `[observed]`.** Deploy statuses, the deploy log UI, dashboard labels, toasts, empty states, and form validation are behind auth. The three-way divergence recorded for one state (`Pending approval` / `Deploy request is pending review` / `Pending review`) is direct evidence that documented labels and rendered labels differ; treat every T6 and T9 string as needing verification in an authenticated pass.
- **The build log itself was not observed.** Netlify's richest error surface is the deploy log, and everything here is a documented description of it. The one quoted log excerpt in the error reference contains a typo (`Bulid`), which means even the documented quotations may not match the shipped strings.
- **No glossary exists.** Definitions are scattered across a `### Definitions` block on one page and inline glosses elsewhere, and the `project`/`site` collision shows the cost. T13 is therefore an inventory of observed usage rather than a reading of a governing list. A build-configuration `#definitions` block is referenced from the deploy docs and was not harvested; it likely contains the build-side terms.
- **No published content style guide, voice-and-tone guidance, or design-system content documentation was located**, and no accessibility statement or conformance report. All T14 observations are inferred from output. If Netlify's guidance exists, it is internal.
- **The `Verified Support Guide` corpus on answers.netlify.com was not harvested** — only seven titles were captured from docs cross-links. Given that docs explicitly route the hardest problems there, Netlify's deepest troubleshooting content is unexamined, and the answer structure of its most substantial help genre is unknown. This is the largest single content gap in the file.
- **`netlify.com/knowledge-base/` and `netlify.com/support/` were not harvested**, so the marketing-side help surface and the support-ticket entry copy are unexamined. T11 is reconstructed from docs footers and nav routing.
- **The pricing calculator (`#calculator`) produced no content** in the fetch — it is a JS widget, and two CTAs point at it. Its copy, inputs, and result language are unharvested, and it is likely the most interactive pricing-disclosure surface on the site.
- **Pricing page was read via a delegated extraction of a saved fetch**, not read directly in this context. Verbatim strings in T10 and T12 are reported at one remove, and the run-together strings noted (`Fortified bandwidth Advanced web security + Dedicated network`) may be extraction artefacts of adjacent inline elements. Comparison-table boolean cells did not survive the text rendering, so the table's `✓`/`✗` semantics are unverified; only non-boolean cell values are recorded.
- **Domain and DNS troubleshooting docs were not harvested** — the error reference routes there for a whole error class, and the SSL error strings captured are a summary list rather than the full reference. `/manage/domains/troubleshooting/` would materially extend T7.
- **No empty-state content was found at all.** T8 rests on Statuspage furniture and on Netlify's own documented description of its 404 as "generic". Whether Netlify ships designed empty states is unknown.
- **Incident sample is fifteen days**, three incidents, one of them ongoing at harvest time (21 September). The casing inconsistency in incident titles is drawn from three data points.
- **Status page is Atlassian Statuspage**, so the legend, subscribe forms, and no-data strings are Atlassian's content standard. Incident prose and component names are Netlify-authored; the furniture is not. The `About This Site` note is Netlify-authored and routes to the forum.
- **en only.** `meta-og:locale: en` on docs; no locale switcher observed on any surface.
- **Marketing site is Astro with view transitions enabled**, and homepage content may be A/B tested; the strings here are one render on one date. Docs pages carry per-page `Last updated` values (the build-troubleshooting page reads `Sep 17, 2026`) — cite the per-page date, not the harvest date, for any specific string.
- **`llms.txt` was not fetched.** Netlify publishes a complete documentation index at `docs.netlify.com/llms.txt` specifically for machine consumption; it would give the full docs IA and page inventory in one request and is the obvious next fetch for anyone extending this file.

## Sources

1. https://www.netlify.com/
2. https://www.netlify.com/pricing/
3. https://www.netlifystatus.com/
4. https://docs.netlify.com/build/configure-builds/troubleshooting-tips/
5. https://docs.netlify.com/resources/troubleshooting/error-reference.md
6. https://docs.netlify.com/deploy/deploy-overview.md
7. https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview.md
8. https://docs.netlify.com/deploy/deploy-notifications.md
9. https://docs.netlify.com/resources/troubleshooting/fix-a-failed-deploy.md
10. https://docs.netlify.com/start/choose-your-path.md
