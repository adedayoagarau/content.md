# 176. Framer

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | Design-native website builder with an on-canvas AI design agent |
| Primary URL | https://www.framer.com/ |
| Corpus rank | 176 |
| Benchmark strength (source list) | Creation and publishing guidance |
| Locale / market observed | en-US |
| Platform observed | Web (desktop marketing site, help centre, pricing) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a for product copy. Compliance links present: CCPA (via Vanta trust centre), GDPR not named on pages inspected, EU/Turkey 14-day statutory refund named on pricing FAQ |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — marketing pages are Framer-built and duplicate heavily in the DOM (responsive variants), so some strings appear 2-3 times and section boundaries are ambiguous. Help-article *bodies* were not opened; category pages give titles plus one-line summaries. Status page (framerstatus.com) not fetched. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home | https://www.framer.com/ | Hero, agent sections, platform grid, community, footer IA |
| Pricing | https://www.framer.com/pricing | Four plans, usage-limit table, add-ons, 11-question FAQ |
| Publish (product page) | https://www.framer.com/publish/ | Richest single source of publishing-state vocabulary |
| Help centre home | https://www.framer.com/help/ | 16 categories with scope lines and article counts |
| Help: Publishing | https://www.framer.com/help/publishing/ | 20 article titles + summaries |
| Help: FAQ | https://www.framer.com/help/faq/ | 23 article titles + summaries |
| Help: Accessibility | https://www.framer.com/help/accessibility/ | 12 article titles — unusually large a11y category |

---

## T1 Navigation & IA labels

**Global nav — five items, four of them noun categories** `[observed]`

`Platform` · `Solutions` · `Resources` · `Enterprise` · `Pricing` · `Log in` · `Sign up`

Note that `Enterprise` sits in the top nav *beside* `Pricing` rather than inside it — an audience segment promoted to peer status with a commercial page.

**Footer is the real IA, and it is enormous** `[observed]`. Seven groupings:

| Grouping | Contents (verbatim labels) |
|---|---|
| `Product` | `AI` · `Agents` · `External Agents` · `Design` · `Collaborate` · `CMS` · `Hosting` · `Performance` · `SEO` · `Skills` · `Convert` · `Publish` · `Updates` |
| `Marketplace` | `Templates` · `Components` · `Plugins` · `Vectors` · `Gallery` · `Experts` |
| `Business` | `Switch` · `Enterprise` · `Agencies` · `Startups` · `Pricing` |
| `Resources` | `Academy` · `Download App` · `Developers` · `Guides` · `Blog` · `Newsletter` · `Stories` · `Creators` · `Experts` · `Students` · `Ambassadors` · `Help Articles` · `Contact` · `Meetups` |
| `Solutions` | `Designers` · `Agencies` · `Marketers` · `Growth` · `Builders` · `Engineers` · `Site Teams` · `Founders` (+ 8 SEO-shaped entries, below) |
| `Company` | `Careers` · `Security` · `Brand` · `Abuse` · `Legal` · `Trust` |
| `By Framer` | `Merch` · `Keyboard` · `Stack Score` · `Free domains` · `AEO scanner` · `State of Sites` · `CanvasBench` · `Link Preview` |

Two things worth stealing and one worth avoiding.

Worth stealing: **`By Framer` as a footer grouping for side-projects and free tools.** It separates "things that are the product" from "things we made" without demoting either. `Free domains`, `AEO scanner`, `CanvasBench` are lead-gen tools; putting them under an authored-by label rather than under `Resources` is honest about what they are.

Worth stealing: **the `Solutions` list is split by *who you are* (`Designers`, `Marketers`, `Founders`) and then by *what you want to make* (`Landing pages`, `Portfolio maker`, `Figma to HTML`).** Two orthogonal entry vocabularies in one list.

Worth avoiding: the second half of `Solutions` is visibly search-optimised — `AI website builder`, `AI design agent`, `Website builder`, `UI/UX design`, `No-code`. Five near-synonymous labels in one menu. A user scanning this cannot tell `AI website builder` from `AI design agent` from `Website builder`.

**`Compare` is a first-class nav grouping with 17 named competitors** `[observed]`: `Webflow` · `Figma` · `Wix` · `Squarespace` · `WordPress` · `Readymag` · `Ceros` · `Unbounce` · `Lovable` · `Claude Code` · `ChatGPT` · `Codex` · `Contentful` · `Sanity` · `AEM` · `Replit` · `v0`.

The competitor set is the clearest statement of positioning on the site: Framer names three *general-purpose AI coding assistants* (`Claude Code`, `ChatGPT`, `Codex`) alongside site builders and headless CMSs. The comparison list is doing category-definition work.

**Help centre — 16 categories, each with a scope line and a live article count** `[observed]`

| Category | Scope line (verbatim) | Count |
|---|---|---|
| `Get started` | "Set up your first site" | 10 articles |
| `Accessibility` | "Make sites usable for all" | 12 articles |
| `Account` | "Plans, billing, and access" | 32 articles |
| `Agents` | "Build with AI help" | 9 articles |
| `Canvas` | "Design pages and interactions" | 16 articles |
| `CMS` | "Structure and edit content" | 13 articles |
| `Community` | "Share work and connect" | 28 articles |
| `Data` | "Forms, analytics, and tests" | 12 articles |
| `Enterprise` | "Scale teams and security" | 16 articles |
| `FAQ` | "Common answers" | 24 articles |
| `Integrations` | "Connect external tools" | 16 articles |
| `Localization` | "Translate and adapt sites" | 15 articles |
| `Publishing` | "Launch sites" | 20 articles |
| `Security` | "Protect sites and data" | 9 articles |
| `SEO` | "Improve search visibility" | 23 articles |
| `Troubleshooting` | "Diagnose and fix issues" | 31 articles |

**The scope-line grammar is rigidly consistent: bare imperative verb phrase, three to five words, no article, no full stop.** "Launch sites." "Make sites usable for all." "Diagnose and fix issues." Compare Wise, which uses gerunds and comma-runs; Framer uses imperatives and hard brevity. Both are self-routing; Framer's is faster to scan and tells you less.

Two IA observations. `Accessibility` is a *top-level help category with 12 articles*, which is rare — most products bury accessibility in a single footer link. And the category named `Data` covers "Forms, analytics, and tests" — an odd bundle that groups input collection with output measurement under a word that signals neither.

**Article count as a content element.** Publishing the number of articles per category is a small honesty signal (`Security` has 9; `Troubleshooting` has 31) and lets the user calibrate depth before clicking. It also quietly admits that `Troubleshooting` is the biggest category on the site.

## T2 Value proposition & headline patterns

**Hero — the headline is a definition sentence, not a slogan** `[observed]`

> `Framer is the design agent for every step from idea to launch`

Meta description: "Go from idea to launch with an agent that designs and builds on the canvas. Keep each change editable, with hosting, security, analytics, CMS, and SEO built in."

Page title: `Framer: AI design agent`. Note the compression across surfaces — the `<title>` is three words, the H1 is eleven, the meta description is a full two-sentence claim-plus-reassurance. Three lengths of the same proposition, each sized to its slot.

**The single most interesting headline on the site** `[observed]`

> `Agents that work alongside you, not instead of you`

This is a **negation-framed reassurance headline** placed above the AI feature block. It anticipates the reader's fear (replacement) and answers it before describing the capability. The pattern — `X that does A, not B`, where B is the thing the reader is afraid of — is directly reusable for any AI feature announcement.

**Section headers are verb-first and reuse one syntactic frame** `[observed]`

`Design with an agent` · `Run your CMS with an agent` · `Code with an agent` · `Connect to any agent` · `Connect to any AI`

Four of five share `<verb> with an agent`. The fifth pair (`Connect to any agent` / `Connect to any AI`) is a **live inconsistency**: the same block appears twice in the DOM with two different nouns, and both versions are served. See T14.

**Other section headers** `[observed]`: `Not just vibes, a full platform` · `Shipped with Framer` · `Trusted by teams shipping big sites` · `Built on a community that isn't going anywhere` · `Your next idea starts here`

`Not just vibes, a full platform` is a deliberate swipe at "vibe coding" — it uses the reader's own in-group slang to position against a competitor category without naming one. `Built on a community that isn't going anywhere` is a defensive claim (longevity) dressed as a benefit claim.

**Publish page hero** `[observed]`: `Go from design to live site with confidence`

The operative word is `confidence` — the whole page is organised around de-risking the publish action rather than celebrating it. Compare the home hero (`from idea to launch`) and note the pipeline vocabulary is stated as a *journey with named endpoints* on both.

**Pricing headline** `[observed]`: `Start free, then scale your site`. Two clauses, two tenses, the commercial ask deferred to clause two.

**Plan taglines are audience descriptions, not feature summaries** `[observed]`

- `Free` → `Try for free`
- `Basic` → `Creative personal sites`
- `Pro` → `Growing professional sites`
- `Enterprise` → `Mission critical sites`

Four two-to-three-word noun phrases, all ending in `sites`, escalating on a single axis (personal → professional → mission critical). Self-selection is possible from the taglines alone without reading a single feature.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Sign up` | Global nav | |
| `Log in` | Global nav | |
| `Get started for free` | Hero (×2 in DOM), final CTA block | Primary |
| `Start for free` | Publish page hero | **Shorter variant of the above, same action** |
| `Start with agents` | AI section header CTA | |
| `Start with Agents` | Inside each of three agent cards | **Capitalisation differs from the section CTA above** — `agents` vs `Agents` on the same page |
| `Start without AI` | Below the AI prompt box, final CTA block | The standout CTA on the site — see below |
| `Download app` | Hero, final CTA block | |
| `Start with Basic` | Pricing, Basic plan | Plan name inlined into CTA |
| `Start with Pro` | Pricing, Pro plan | |
| `Request Trial` | Pricing, Enterprise plan | Not "Contact sales" — an asymmetric, lower-commitment ask |
| `Meet our customers` | Home, logo wall | |
| `Read stories` | Home, customer stories | **Near-duplicate of the above, different label, adjacent sections** |
| `See Framer sites` | Home, gallery | |
| `Browse the community` | Home, community block | |
| `Install` | External-agents block | |
| `Copy install prompt` | External-agents block | Named object, not bare `Copy` |
| `Learn more` | Pricing, editor billing | One of very few bare `Learn more` instances |
| `Checking status` | Footer, every page | See T6 — a live status indicator rendered as a link label |

**`Start without AI` is the most transferable string in this file.** It sits immediately beneath the AI prompt box in the final CTA block — the point of maximum AI pressure — and offers the opt-out in the same visual group as the opt-in. Most products put the non-AI path behind a settings toggle or omit it. Naming it as a peer CTA, at the moment of the ask, is a real consent pattern.

**CTA defects recorded honestly:**

- `Start with agents` (section) vs `Start with Agents` (cards) — capitalisation drift within one viewport
- `Get started for free` vs `Start for free` — two labels for the same signup destination across two pages
- `Meet our customers` vs `Read stories` — two labels for `/stories/` on the same page

## T4 Onboarding & getting-started

**There is no numbered how-it-works sequence on the home page.** `[absent]` Framer substitutes a **prompt-starter rack** — four suggested first prompts rendered as tappable chips in the final CTA block `[observed]`:

`Create personal portfolio` · `Build startup site` · `Launch landing page` · `Start company blog`

Four verbs, four different verbs (`Create`, `Build`, `Launch`, `Start`), four artefact nouns. The verb variation is doing work: it models to the user that the prompt box accepts natural language rather than a fixed command vocabulary. This is **onboarding-by-example rather than onboarding-by-instruction**, and it is the dominant pattern for AI-first products. The cost is that a user who wants to know *what will happen* is not told.

Beneath the rack the model is named in plain text: `GPT 5.6 Terra` `[observed]`. Naming the underlying model on the marketing page is a transparency choice worth noting.

**The onboarding IA lives in the help centre instead** `[observed]`: `Get started` — "Set up your first site" — 10 articles. And in a separate `Academy` property linked from `Resources`.

**Agent narration copy** `[observed]` — the home page shows a simulated agent transcript, which is de facto onboarding content for what an agent session looks like:

> User prompt: "Create a few layout variations of my site. Keep the content but try some different compositions."
> Agent states shown in sequence: `Thinking...` → `Created a design plan` → `2s` → "Placing layout variations side by side."

**Pattern:** the agent reports a *plan* before reporting *work*, and shows an elapsed-time figure (`2s`) against the plan step. Present-participle for in-progress (`Thinking...`, `Placing...`), past tense for completed (`Created a design plan`). This tense split is the clearest convention in Framer's agent copy.

A second simulated transcript (a WordPress import via Claude Code) uses the same convention with counts attached: "47 posts returned · 47 mapped to Blog schema.", "titles, slugs, authors, dates, and cover images resolved.", "Import complete · 47 blog entries published to Framer CMS." **Every completion line carries the count.** Repeating `47` three times is the reassurance mechanism — nothing was silently dropped.

## T5 Form & field labels

Framer is not a form product, so this is thin. `[observed]` / `[documented]`

**The only public-facing form control on the marketing pages** is the AI prompt box, which carries no visible label — only the starter chips (T4) and the model name. There is no placeholder text in the fetched markup. A prompt box with no label and no placeholder is a defensible choice for a chat-shaped input but leaves screen-reader users dependent on an accessible name that could not be verified from server HTML. **Flagged as unverified, not as a defect.**

**Password-protection gate copy** `[observed]`, shown as a product screenshot on the Publish page:

> `Enter password to access the site.`
> Button: `Submit`

A full imperative sentence with a full stop as the field prompt, and a generic `Submit` as the action. The prompt does the work; the button does not. For a single-field gate this is acceptable, but `Submit` is the weakest verb available and could be `Unlock` or `View site`.

**Site Settings fields shown in a product screenshot** `[observed]`: `Title` · `URL` · `Page Description` · `Social Preview` · `Upload`, with the hint `1200 x 630 pixels` under `Social Preview`.

Note `Page Description` rather than "Meta description" — the user-facing noun over the spec noun. And the dimension hint is given as a bare value with no sentence around it.

**Form-building capability is documented, not observed** `[documented]`: the help category `Data` is scoped "Forms, analytics, and tests", and the pricing FAQ defines a billable event as "a page view, a click on a tracked link, or a submission through a tracked form". Field-type names for Framer's own form component were not reachable on the pages inspected. `[absent]`

## T6 Status & state language

**This is Framer's strongest category and the reason the product is in the corpus.**

**The publish pipeline has two named environments and one named action per environment** `[observed]`, from the Publish page UI screenshots:

| String | Role |
|---|---|
| `Staging` | Environment tab |
| `Production` | Environment tab |
| `Deploy` | Button, first-publish state |
| `Update` | Button, subsequent-publish state |
| `2 changes` / `3 changes` | Pending-change counter beside the button |
| `1m ago · by Benjamin den Boer` | Last-publish attribution line |

**The button label changes from `Deploy` to `Update` depending on whether the environment has been published before.** Same control, two labels, chosen by state. This is a small, expensive, correct decision — most products ship one label and let it be wrong half the time.

**The change counter is the second notable choice.** `2 changes` sits between the environment name and the button, so the user reads *where* → *how much* → *what will happen*. It converts an irreversible action into a quantified one.

**Attribution is stamped on the state, not on an audit log.** `1m ago · by Benjamin den Boer` is rendered inline in the publish control. In a multi-editor product the answer to "is it safe to deploy?" is usually "who touched this last and when", and Framer answers it in the control itself rather than in a separate history view.

**Branch states** `[observed]` — the branch list shows branch names with relative timestamps and avatars: `main` (1m), `home-2026` (3m), `july-update`, `pricing-2026` (3h), `perf-test` (2d), `update-shaders` (3d). Section label `Changes`. Merge action label: `Apply to Main`.

`Apply to Main` over "Merge" is a deliberate de-jargoning — the Git term is avoided for a designer audience while the capability is identical. The capitalised `Main` treats the branch name as a proper noun.

**Optimisation states in version history** `[observed]`: `Optimizing` → `Optimized`. Present-participle to past-participle, the same tense convention as the agent narration (T4). Each version row carries an ID, a state, a relative time and an author: `955g4th33 / Optimizing / 1m ago by Monika`.

**CMS item states** `[observed]`, from the home-page CMS table: the `Status` column contains `Live` and `Draft`.

**`Live` rather than `Published`.** This is a meaningful pick. `Published` describes what the operator did; `Live` describes what the reader can see. For a CMS attached to a website, the reader-facing state is the more useful one — and it pairs cleanly with `Draft`, which is also reader-facing (nobody can see it). A content designer choosing state names should note that Framer uses `Live`/`Draft` for content items but `Deploy`/`Update` for the site itself: **the object being acted on determines whether the state name describes the system or the audience.**

**Localisation states** `[observed]`: locales are listed with a completion percentage — `NL Dutch 35%`, `IT Italian 100%`, `CN Chinese 90%`. A percentage, not a badge. Partial translation is treated as a normal state with a magnitude rather than a binary done/not-done.

**Performance states** `[observed]`: `Core Web Vitals` → `GOOD`, with `LCP 1.1s`, `INP 95ms`, `CLS 0.01`. The verdict word is all-caps and the metrics are raw. Borrowed vocabulary from the Chrome UX standard rather than an invented scale.

**A/B test states** `[observed]`: the results table has columns `Variant` · `Views` · `Events` · `Conversion` · `Lift` · `Best`, with the winning row badged `WINNER` and the lift column showing `—` for the control. A dash for "not applicable" in the baseline row is correct and commonly got wrong.

**Status page as a live nav element** `[observed]`: the footer link on every page reads `Checking status` — present-participle, indicating the indicator is polling. This is a link label that changes with system state, which means the footer's own copy is a status surface. Worth flagging: at harvest the label was `Checking status` on every page fetched, so the resolved states (presumably something like "All systems operational") were not observed. `[absent]`

**Publishing states documented in help titles** `[documented]`: `Staging and versions` · `How to use branches in Framer` · `Publishing your Framer website` · `Resolving publishing errors` · `How can I revert to a previous working version of my file`.

## T7 Error, failure & recovery

`[documented]` via help-article titles and summaries; no live error strings observed.

**Named error conditions:**

- `How to fix the "Module too large" warning` — "Learn how to reduce the size of a CMS collection, page, component, or module so it can publish successfully." The article quotes the exact warning string in its own title, which is the correct pattern for findability: the user searches the string they saw.
- `Resolving publishing errors` — "Publishing a site with errors or missing content can negatively impact user experience." The rationale is framed as *harm to the visitor*, not inconvenience to the operator.
- `How can I revert to a previous working version of my file` — "When working with live websites, it's essential to ensure they function smoothly at all times." Note the article title is a question *without a question mark* — inconsistent with `Do I need to change my DNS settings to move my domain between projects?` in the same category, which has one.

**Recovery is framed as a product capability, not an apology** `[observed]`, Publish page:

> `Version history and rollback. Every site change is saved automatically, so you can restore any version in seconds.`

Three moves in one sentence: name the feature, state the guarantee (`automatically`), bound the effort (`in seconds`). No hedging and no "in the unlikely event".

> `Atomic deploys. Every publish is immutable, isolated, and swapped live with zero downtime.`

This is the most technical sentence on the marketing site and it is aimed squarely at the engineer in the buying committee. Three adjectives, one outcome. `zero downtime` is an absolute claim shipped without a qualifying footnote — contrast Wise, which bounds every such claim. **Framer does not self-qualify.**

**Troubleshooting is the largest help category** (31 articles) and has its own top-level slot — an honest IA signal. There is also a dedicated `How to report an issue` article, scoped "how to report issues or bugs and seek assistance for a smooth Framer experience".

**A deprecation article exists** `[documented]`: `Legacy Framer desktop` — "Legacy Framer desktop was deprecated on March 31, 2023." A dated, one-sentence tombstone article for a withdrawn product. Like Wise's removed-feature articles, this is a content-ops decision most products skip.

**A refusal article exists** `[documented]`: `Can I export my website to HTML and self-host it?` — "Learn why Framer does not support HTML export and how our hosting infrastructure helps optimize your site's performance." The title asks the user's question, the summary states the `No` and then pivots to justification. Paired with `Porting your data from Framer` — "Learn how to export your site and CMS data from Framer and reuse it on other platforms." **Framer publishes its own exit documentation.** Writing the "how to leave" article is a trust move and a rare one.

## T8 Empty states

`[absent]` — no empty-state copy was reachable on public surfaces. All product UI is shown as pre-populated marketing screenshots with sample data (`Articles 320`, `Creators 256`, `Categories 18`). The closest artefact is the branch-list search field rendered with placeholder `Search…` and a filter chip `All`, which is a populated state, not an empty one.

The absence is itself worth noting: every product screenshot on the Framer marketing site shows a *full* CMS, a *busy* branch list, and a *winning* A/B test. Nothing shows a first-run state. A new user's actual first screen is nowhere on the marketing site.

## T9 Notifications & system messages

`[documented]`, mostly from the pricing FAQ, which is where Framer explains its notification model.

**Overage notification policy stated in prose** `[documented]`:

> "When you reach certain limits, we will ask you to upgrade your plan in Framer. For other limits, like bandwidth, we allow you to exceed your limit for one month. You'll receive a notification via email so you can upgrade your plan accordingly."

Two different behaviours for two classes of limit, both stated, with the channel named (`email`) and the grace period quantified (`one month`). This is good practice: the user learns *before* purchase what happens *after* they exceed.

**Editor-billing notification** `[documented]`:

> "We will notify you when an editor is added to your billing, and you will be charged within 24 hours."

Notification and charge stated in one sentence, with the delay quantified. Compare products that notify silently and charge at the next cycle.

**In-product notification surfaces named** `[observed]`, pricing table row: `Bandwidth usage` — "Monthly bandwidth with overage alerts". The alert is listed as a *feature of the limit*, in the limit's own description.

**Slack integration framed as a notification channel** `[documented]`: `Does Framer have an app for Slack?` — "Framer's Slack app simplifies collaboration by making it easy to invite your team to your projects."

## T10 Disclosures, legal & compliance

**Pricing page disclosure line** `[observed]`:

> "All prices are monthly and billed according to the billing cycle selected at checkout. Any applicable sales tax will be added at checkout based on your location."

Two sentences, both deferring specificity to checkout. `Any applicable sales tax` is honest hedging; `based on your location` explains the mechanism without naming jurisdictions.

**Refund policy — jurisdiction-scoped and bolded** `[observed]`:

> "If you live in the EU or Turkey, you are legally eligible for a refund if your subscription was purchased within the last 14 days. To claim your refund, please contact our Support team; they will cancel your subscription and process the refund."

Three things to note. The policy is **framed as the user's legal entitlement** ("you are legally eligible"), not as a company concession. The jurisdictions are named explicitly (`the EU or Turkey`) rather than left to "where required by law". And **no refund policy is stated for any other jurisdiction** — the reader outside the EU/Turkey is told nothing, which is a real gap. The whole paragraph is rendered in bold on the page, which is unusual for a legal disclosure and reads as compensating for its placement at FAQ position 11 of 11.

**Cancellation wording:** `[absent]` — there is no cancellation policy, no notice-period statement, and no downgrade-consequence statement anywhere on the pricing page or its FAQ. Cancellation is mentioned only as something Support performs during a refund. For a subscription product this is a notable omission and the reader must go to `help/account/` (32 articles) to find it.

**Fair-use / flexibility clause** `[observed]`:

> `What if my open-source or side project receives a lot of traffic?` — "We can be flexible with our limits for open-source or non-revenue-based side projects. Please contact us to discuss the options."

A discretionary carve-out published as policy. `non-revenue-based` is the operative qualifier and is doing the gatekeeping.

**Plan-eligibility disclosure** `[observed]`: "Our Free plan is ideal for non-commercial use." Framer states the *intended* use of the free tier rather than prohibiting commercial use outright — soft-boundary language.

**Credits disclosure with a footnote marker** `[observed]`:

> "Every paid plan includes monthly credits that power Agents, Localization, and other AI features. Credits are shared across your entire workspace and its editors. Running low? Upgrade a site or add an add-on for more."
> "¹ On the free plan, when your workspace has no active subscriptions, you receive 500 credits to try Agents."

A superscript-1 footnote attached to the free-plan credit grant. Note the sharing model is disclosed in sentence two — "shared across your entire workspace and its editors" is the sentence that stops a team buying the wrong plan.

**Compliance furniture** `[observed]`: footer links `Security`, `Legal`, `Trust` (to a Vanta trust centre), `CCPA`, and `Abuse` (a raw `mailto:` to abuse@framer.com). Publishing an abuse address as a mailto in the footer of every page is a small, good, old-fashioned choice.

**Font licensing as a user-facing compliance article** `[documented]`: `How to choose the right font license for Framer` — "If you're considering purchasing a custom font for your Framer websites, it's essential to choose a Webfont license rather than a Desktop license." A third-party licensing trap documented in the help centre before the user falls into it.

## T11 Help-centre architecture

Flat two-level: 16 categories → article lists. No sub-sections. Every category page repeats the category name plus the scope line as a page-level H1 group (`Publishing` / `Launch sites`).

**Article-title grammar — five shapes, and the mix is inconsistent:**

| Shape | Examples |
|---|---|
| `How to <verb>` | `How to connect a custom domain` · `How to use branches in Framer` · `How to add custom code` · `How to use Firewall` |
| `<Gerund> <object>` | `Publishing your Framer website` · `Resolving publishing errors` · `Exporting assets` · `Migrating to Framer page by page` |
| `Understanding <concept>` | `Understanding contrast ratio` · `Understanding descriptive link text` · `Understanding HTML Tags` |
| Direct question | `Can I export my website to HTML and self-host it?` · `Is Framer a domain registrar?` · `Does Framer have an app for Slack?` |
| Bare noun phrase | `Static files` · `Staging and versions` · `Custom headers` · `Reduced motion settings` |

The `Understanding <concept>` shape is used **exclusively in the Accessibility category** and nowhere else. That is a deliberate register shift: accessibility articles teach a concept, publishing articles teach a task, FAQ articles answer a question. Three shapes, three intents, cleanly segregated — this is better title discipline than most help centres manage.

**Defect:** question-shaped titles are inconsistently punctuated. `Is Framer a domain registrar?` has a question mark; `How can I revert to a previous working version of my file` does not. Both are questions.

**Summary lines carry real information, not restatement.** Compare `Static files` → "Learn how to upload and host files on your site using static files" (restates the title, adds nothing) with `How to use Multi Site with rewrite rules` → "Learn how to combine multiple Framer projects and external websites under one domain" (defines the capability in different words). The second is the better pattern and is the majority case.

**The Accessibility category is the artefact worth copying.** Twelve articles, split between *how to do a thing in Framer* and *why the thing matters*:

`Guide to web accessibility in Framer` · `How to add Alt Tags to images` · `How to use semantic tags for navigation and footers` · `Improving Accessibility with ARIA Labels` · `Tab order customization` · `Text styles and semantic tags` · `Understanding contrast ratio` · `Understanding descriptive link text` · `Understanding HTML Tags` · `Reduced motion settings` · `Light and dark mode options` · `Disabling pointer events`

The framing sentence on `Guide to web accessibility in Framer` is the thesis: "While Framer automates some aspects of accessibility, the real impact lies in how you assign meaning to web elements. This intentional assignment is key to creating an optimally accessible website." **The tool disclaims completeness and names the user's responsibility.** For any platform whose output other people must use, this sentence is the model.

## T12 FAQs

**Placement:** foot of the pricing page, under the heading `FAQ`. Eleven questions, all answers present in server HTML (unlike Wise).

| # | Question (verbatim) |
|---|---|
| 1 | What are credits? |
| 2 | What's included in the Free plan? |
| 3 | Which plan is right for me? |
| 4 | How are extra editors billed? |
| 5 | What happens if I go over a limit? |
| 6 | How many add-ons can you purchase on the Pro plan? |
| 7 | How are events billed for the Convert add-on? |
| 8 | What's included in the Advanced Hosting add-on? |
| 9 | What if my open-source or side project receives a lot of traffic? |
| 10 | What payment methods do you offer? |
| 11 | What is your refund policy? |

**Structural notes.** The ordering is: new-concept definition → free tier → self-selection → seat billing → overage → add-on limits → add-on billing → add-on contents → edge case → payment → refund. Money questions are back-loaded; the *vocabulary* question (`What are credits?`) is first, because the pricing table is unreadable without it.

Q3 (`Which plan is right for me?`) is the self-selection question and its answer is a four-sentence audience map — "The Basic plan caters to students, freelancers, and small studios. The Pro plan is designed for teams at agencies, startups, and scale-ups…". **This answer is duplicated verbatim twice in the page markup**, a rendering defect.

Q6 is grammatically off: `How many add-ons can you purchase on the Pro plan?` uses second-person `you` to mean "one", where every other question uses `I` or `my` for the user. One question addresses the reader as the subject of the company's sentence rather than their own.

Q9 is the only question phrased as a *situation* rather than a *mechanism* — and it is the only one whose answer is discretionary rather than rule-based. The question shape correctly signals that the answer is a conversation.

**No FAQ block on the home page.** `[absent]`

## T13 Terminology & glossary

Framer does not publish a glossary page, but it does run a `/dictionary/` URL space linked inline from the Publish page — terms are defined at their point of use rather than in a central list.

| Term | Framer's usage | The alternative it rejected |
|---|---|---|
| `design agent` | The headline product noun, highlighted inline on the home page | "AI assistant", "copilot" |
| `Agents` | Plural, capitalised, treated as a product surface with its own nav entry and help category | "AI features" |
| `External agents` | Third-party agents (Claude Code, Cursor, Codex) connecting *in* | "integrations" |
| `canvas` | The design surface; "native to the canvas" is the differentiator phrase | "editor", "workspace" |
| `Live` / `Draft` | CMS item states | "Published"/"Unpublished" |
| `Deploy` / `Update` | Publish actions, chosen by prior-publish state | one label for both |
| `Apply to Main` | Branch merge action | "Merge" — Git term deliberately avoided |
| `Branching` | Named capability with its own marketing line | "versions" |
| `Staging` / `Production` | Environment names, borrowed intact from engineering | "Preview"/"Live" |
| `Atomic deploys` | Engineering term retained and immediately glossed in the same sentence | |
| `credits` | The AI metering unit; defined in FAQ position 1 | "tokens", "requests" |
| `Workspace owner` | The single billing/admin role | "Admin", "Account owner" |
| `Editors` / `Content editors` / `Viewers` | Three priced seat types with distinct capability sentences | "members", "seats" |
| `Seats` | The cap on edit access, distinct from `editors` who occupy them | |
| `CMS collections` / `CMS items` | Two separately metered objects | "content types"/"entries" |
| `Convert` | Product name for A/B testing, funnels and Triggers | "Optimize", "Experiments" |
| `Triggers` | Named sub-feature inside Convert | |
| `Pro Experts` | A certified-partner tier with its own pricing benefits | "partners", "agencies" |
| `Remix link` | A shareable duplicate-this-project URL | "template link", "fork" |
| `Multi Site` | Multiple projects under one domain via rewrite rules | "multi-tenant" |
| `Stack Score`, `AEO scanner`, `CanvasBench` | Coined names for free marketing tools | |
| `AEO` | Answer Engine Optimization — a coined category, shipped as a tool name with no expansion on the pages inspected | "AI SEO" |

**Register split.** Marketing says `design agent` and `canvas`; the help centre says `project` and `file` (`How can I revert to a previous working version of my file`). The pricing page says `site`; the help centre says `project`. **`site`, `project` and `file` are used for what appears to be the same object across three surfaces** — this is the clearest terminology defect in the file.

**`Skills` is marked `New` in the nav and appears at framer.com/skills but is not defined anywhere on the pages inspected.** `[absent]` — a product noun shipped without a definition on any surface harvested.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout. First-person plural for the company, and used freely in policy copy: "We can be flexible with our limits", "we will ask you to upgrade", "We will notify you when an editor is added". The company is a named actor in every commercial sentence, including adverse ones.

**Register.** Short declaratives, heavy sentence fragments as headings, minimal contractions in policy copy and free contractions in marketing copy ("What's included", "isn't going anywhere", "Running low?"). No exclamation marks observed on any page. No `Oops!`.

**Rhetorical moves used repeatedly:**

- **Negation framing.** `Agents that work alongside you, not instead of you` · `Not just vibes, a full platform` · `Start without AI` · "No investors. No bullshit." is Ghost's, not Framer's — Framer's equivalent is `Built on a community that isn't going anywhere`. The house style defines the product by what it is *not* at least four times on the home page.
- **Two-sentence benefit blocks.** Every feature card is exactly one bolded label sentence plus one to two explanation sentences. `Atomic deploys. Every publish is immutable, isolated, and swapped live with zero downtime.` The label ends in a full stop despite being a fragment — the same punctuation habit Wise has.
- **Imperative stacking in feature copy.** "Manage more. Publish faster." Two two-word imperatives as a unit.

**Numbers as trust devices** `[observed]`: `21,664 Resources` · `99.99% uptime` · `300+ locations` · `1.7M Unique Visitors` (sample data) · `504,616,418,546 tokens processed this week`. That last one is in the footer of the pricing page, linked to OpenRouter — a live, absurdly precise third-party-verifiable usage counter used as a credibility signal. It is the only externally-sourced number on the site.

**Claims are not bounded.** `zero downtime`, `99.99% uptime`, `Every site change is saved automatically` ship without qualifying footnotes. This is the sharpest contrast with the Wise exemplar, where every claim carries an adjacent caveat. Framer's only self-qualifying copy is in the pricing FAQ, never in marketing.

**Accessibility content** `[observed]`

- A 12-article `Accessibility` help category at the top level of the help centre — this is the strongest signal in the file. Most products have one accessibility statement; Framer has a curriculum.
- Articles cover alt tags, ARIA labels, semantic tags for nav and footers, tab order, contrast ratio, descriptive link text, HTML tags, and reduced motion. That list maps closely onto the WCAG failures a visual site builder would actually produce.
- `Reduced motion settings` — "Modern operating systems allow users to set a preference for reduced motion. Framer offers a setting to disable parallax, transform, and layout animations for those who prefer minimal motion." The OS preference is explained before the product setting, which is the right order.
- **Alt text on the marketing site is descriptive and functional**, not decorative: "Framer staging interface for previewing site changes before publishing" · "Framer version history interface showing rollback controls" · "Framer branching interface for reviewing and merging site changes" · "Mobile device preview of a Framer website" · "CMS interface preview showing content management features". These describe *what the screenshot demonstrates*, which is the correct choice for a product screenshot — a purely visual description would be useless.
- Weaker instances: `![Framer user avatar]` repeated for six distinct people's avatars, and `![Collaborator avatar]` repeated for five. Identical alt text on distinct identity images. Defensible as decorative-in-context (the names are adjacent in text), but `![]` would be more correct than a repeated non-identifying string.
- **No `Skip to content` link found in the fetched markup.** `[absent]` — flagged as suspected-missing rather than confirmed, since the site is client-rendered.
- **No public accessibility statement or VPAT** was found in the footer or Company grouping. `[absent]` The help category documents how *you* make *your* site accessible; there is nothing about how accessible the Framer editor itself is. That asymmetry is worth recording.

**Negative findings, recorded honestly**

- `Connect to any agent` and `Connect to any AI` — the same section, same body copy, two different nouns, both present in the served markup
- `Start with agents` vs `Start with Agents` — capitalisation drift in one viewport
- `Get started for free` vs `Start for free` — two labels, one destination, two pages
- `Meet our customers` vs `Read stories` — two labels, one destination, one page
- `site` / `project` / `file` used for the same object across marketing, pricing and help
- Q3's answer duplicated verbatim in the pricing-page markup
- Question-mark punctuation inconsistent across question-shaped help titles
- Hero and footer content duplicated 2-3× in the DOM (responsive variants) — screen-reader users may encounter the entire footer three times. Suspected, not confirmed.
- `Skills` marked `New` in nav, undefined anywhere harvested
- No cancellation policy on the pricing page or its FAQ
- No refund policy stated for users outside the EU and Turkey

---

## Transferable patterns

1. **Change the action label with the state, not the context.** `Deploy` on first publish, `Update` thereafter — one control, two labels, picked by whether the environment has history. Transfers to any irreversible-action button where "first time" and "again" carry different risk. Condition: only worth the engineering cost where the two cases genuinely feel different to the user.
2. **Quantify the pending change beside the irreversible button.** `2 changes` between the environment name and `Deploy`. The user reads where → how much → what happens. Directly applicable to any publish, submit, or confirm control, and to checkout review steps.
3. **Name the opt-out as a peer CTA at the point of maximum pressure.** `Start without AI` sits under the AI prompt box, not in settings. For any AI feature being pushed into an existing flow, offering the classic path *in the same visual group* is the difference between a choice and a dark pattern.
4. **Negation-framed reassurance headline.** `Agents that work alongside you, not instead of you`. Anticipate the reader's specific fear and answer it in the headline. Transfers to any capability announcement where the reader's first reaction is a threat assessment — automation, AI, account changes, policy updates.
5. **Pick state names from the audience's perspective for content, the operator's for infrastructure.** `Live`/`Draft` for CMS items (what a reader can see); `Staging`/`Production` and `Deploy`/`Update` for the site (what the operator did). The object determines the point of view. This resolves the perennial "Published or Live?" argument with a rule rather than a preference.
6. **Segregate help-title grammar by intent.** `How to <verb>` for tasks, `Understanding <concept>` for concepts, direct questions for FAQ. Framer restricts `Understanding` to accessibility only, which teaches the reader that those articles will explain rather than instruct. Cheap to adopt, immediately legible.
7. **Publish the exit documentation.** `Porting your data from Framer` alongside `Can I export my website to HTML and self-host it?` — Framer documents both the capability it refuses and the route out. Transfers to account closure, data export, and downgrade copy, where most products go silent.
8. **State overage behaviour before purchase, with the channel and the grace period named.** "we allow you to exceed your limit for one month. You'll receive a notification via email". Two facts a user needs before committing, given on the pricing page rather than discovered at the limit.

## Caveats & gaps

- **Only seven pages inspected.** The `Agents`, `CMS`, `Collaborate`, `Convert`, `Design`, `SEO`, `Hosting`, `Performance`, `Academy`, and `Enterprise` surfaces are unharvested, as are 11 of 16 help categories.
- **Help-article bodies were not opened.** Everything in T6, T7, T9 and T11 derived from help is title-and-summary only. Article titles say nothing about answer structure or in-body error strings.
- **All in-product UI is reconstructed from marketing screenshots**, which are idealised mock-ups with sample data (`Benjamin den Boer`, `Monika`, `Jurre` are Framer staff names used as demo content). State names read off a screenshot may differ from shipped strings. Marked `[observed]` because the string is visibly rendered, but the caveat stands.
- **Framer's marketing site is built in Framer**, so the served HTML contains multiple responsive copies of most sections. Where a string appears two or three times I have counted it once, but section ordering and adjacency claims are less reliable than on a conventionally-rendered site.
- **Status page not fetched.** https://www.framerstatus.com/ was linked but not retrieved; the footer label `Checking status` is the only status string captured.
- **No accessibility statement or VPAT found** for the Framer editor itself. The 12-article help category is about the sites users build, not about the tool.
- **Form field-type names not reachable.** Framer ships a form component (`Data` category, "Forms, analytics, and tests") but no public page inspected named its field types. T5 is consequently thin and should not be used as evidence about Framer's form vocabulary.
- **Mobile app / desktop app copy not harvested.**

## Sources

1. https://www.framer.com/
2. https://www.framer.com/pricing
3. https://www.framer.com/publish/
4. https://www.framer.com/help/
5. https://www.framer.com/help/publishing/
6. https://www.framer.com/help/faq/
7. https://www.framer.com/help/accessibility/
