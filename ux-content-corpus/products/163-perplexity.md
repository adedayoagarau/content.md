# 163. Perplexity

| Field | Value |
|---|---|
| Domain | `AI` — AI and creator products |
| Industry / sub-vertical | AI answer engine / cited-search assistant (with an agentic "digital worker" tier) |
| Primary URL | https://www.perplexity.ai/ |
| Corpus rank | 163 |
| Benchmark strength (source list) | Source-led answer experience |
| Locale / market observed | en (help centre serves 11 locales under `/{locale}/`; en inspected, locale index read for all 11) |
| Platform observed | Web — help centre (Mintlify-hosted), status page. Marketing SPA not renderable. |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | GDPR (dedicated article); consumer-protection refund windows named by jurisdiction (EU/UK/Turkey 14 days; Brazil/South Korea 7 days); SOC-style "Trust center access" referenced for Enterprise; no financial regulator disclosure (not a regulated product) |
| Harvest date | 2026-09-22 |
| Pages inspected | 25 |
| Harvest completeness | Partial — help centre fully readable and unusually rich; the marketing site, pricing page, and any publisher-relations surface are client-rendered SPAs returning empty bodies and could not be harvested |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Marketing home | https://www.perplexity.ai/ | SPA shell. Only `<meta>` returned. Recorded as blocked. |
| Help centre machine index | https://www.perplexity.ai/help-center/llms.txt | Purpose-built agent index; contains explicit "Agent Instructions" |
| Help centre home | https://www.perplexity.ai/help-center/en/index.md | Full MDX source incl. all 11 locale nav payloads and component code |
| What is Perplexity? | .../articles/10352155-what-is-perplexity | Four-card capability framing |
| What is an answer engine…? | .../articles/10354917-what-is-an-answer-engine-and-how-does-perplexity-work-as-one | Shortest article; carries the core accuracy caveat |
| How does Perplexity work? | .../articles/10352895-how-does-perplexity-work | Mechanism narrative; stale model names |
| What is Perplexity Pro? | .../articles/10352901-what-is-perplexity-pro | Benefit list; stale model names; mode taxonomy conflict |
| Which Subscription Plan is right for you? | .../articles/11187416-which-perplexity-subscription-plan-is-right-for-you | Plan comparison table; leaked build instruction |
| How Credits Work on Perplexity | .../articles/13838041-how-credits-work-on-perplexity | Longest and best-structured article in the set |
| What advanced AI models are included…? | .../articles/10354919-what-advanced-ai-models-are-included-in-my-subscription | Dated snapshot; explicit "source of truth" statement |
| What is Model Council? | .../articles/13641704-what-is-model-council | Multi-model disagreement framing |
| Understanding source labels | .../articles/20260806-understanding-source-labels | Government / Academic / Trusted shield system |
| What is a Session? | .../articles/10354769-what-is-a-thread | Title/slug mismatch — live renaming artefact |
| What is Computer? | .../articles/13837784-what-is-computer | Agentic tier; "Perplexity answers… Computer does" |
| Canceling a Subscription | .../articles/10354283-canceling-a-subscription | Per-platform cancel paths |
| Data Collection at Perplexity | .../articles/11564572-data-collection-at-perplexity | Training opt-out mechanics |
| How can I report incorrect or inaccurate answers? | .../articles/10354902-how-can-i-report-incorrect-or-inaccurate-answers | Hallucination reporting taxonomy |
| Cloudflare & VPNs | .../articles/10354884-cloudflare-vpns | Only true error-recovery article found |
| Collection: Getting Started | .../collections/12702161-getting-started | 11 articles |
| Collection: Features | .../collections/18799290-features | 19 articles |
| Collection: AI Models & Content Generation | .../collections/18799291-ai-models-content-generation | 12 articles |
| Collection: Subscription Plans & Billing | .../collections/18799292-subscription-plans-billing | 16 articles |
| Collection: Privacy & Data | .../collections/18799294-privacy-data | 9 articles |
| Collection: Troubleshooting & Support | .../collections/18799303-troubleshooting-support | 11 articles |
| Status page | https://status.perplexity.ai → https://status.perplexity.com | incident.io-hosted; four components |

---

## T1 Navigation & IA labels

`[observed]`

**Help-centre top level — sixteen tiles, sorted by nothing in particular.** The home page renders a `Browse by topic` grid. Labels, with article counts as published:

| Tile | Count |
|---|---|
| `Getting Started` | 11 articles |
| `Perplexity Enterprise` | 39 articles |
| `Computer` | 12 articles |
| `Desktop App` | 12 articles |
| `Features` | 19 articles |
| `AI Models & Content Generation` | 12 articles |
| `Subscription Plans & Billing` | 16 articles |
| `Account & Sign-In` | 13 articles |
| `Privacy & Data` | 9 articles |
| `Connectors & Integrations` | 22 articles |
| `Premium Data Sources` | 11 articles |
| `Comet` | 9 articles |
| `Mobile Apps` | 5 articles |
| `Perplexity API` | 5 articles |
| `Promotions & Partnerships` | 3 articles |
| `Troubleshooting & Support` | 11 articles |

The category grammar is **object-named, not activity-named** — `Privacy & Data`, `AI Models & Content Generation`, `Subscription Plans & Billing`. Compare Wise's gerund categories (`Sending money`, `Holding money`). Perplexity's user cannot self-route on the label alone; they must already know that "can I stop you training on my chats" lives under a noun-pair called `Privacy & Data`. The ampersand-joined compound (`X & Y`) appears in seven of sixteen tiles, which is the tell: these are **merged system domains**, not user tasks.

Second tell: four tiles are **surfaces** (`Computer`, `Desktop App`, `Comet`, `Mobile Apps`) and one is an **audience** (`Perplexity Enterprise`, the largest at 39 articles). The IA mixes three organising axes — task, surface, audience — without marking the switch. `Perplexity Enterprise` and `Subscription Plans & Billing` will both contain Enterprise billing.

**Quick actions row** — four cards, each with a title and a one-line description, three of the four pointing off-domain:

| Title | Description (verbatim) |
|---|---|
| `What's new in Perplexity` | "See the latest features and updates" |
| `System status` | "Check current uptime and incidents" |
| `Enterprise admin hub` | "Onboarding, SSO, billing, and security" |
| `API documentation` | "Build with the Perplexity API" |

The description grammar is consistent and good: **imperative verb + object** (`See…`, `Check…`, `Build…`), except `Enterprise admin hub`, which is a bare comma-run of nouns. Three of four follow the rule; the fourth breaks it.

**Popular articles** — a nine-chip row, promoted above the topic grid. Ordering is plan/billing-led, not task-led: `What is Perplexity Pro?` → `Canceling a Subscription` → `Which Perplexity Subscription Plan is right for you?` → `How Credits Work on Perplexity` → `What is Perplexity?` → `What is Model Council?` → `How to use Computer Skills` → `What is a Session?` → `Billing FAQ for Pro Plan Subscribers`. Four of nine are money. `What is Perplexity?` — the definitional article — sits fifth, behind cancellation.

**Breadcrumbs** are two-level only: `Help Center` / `<Collection>`. Articles do not appear in the trail, so an article page has no visible parent.

**Defect — doubled path segment in every internal link.** Every cross-link in the served markdown is emitted as `/help-center/help-center/en/articles/...`, e.g. the "Getting Started" tile links to `/help-center/help-center/en/collections/12702161-getting-started`. The canonical browsable path is `/help-center/en/...`. Whether this resolves via a rewrite or 404s for a human was not verified, but it is unambiguously a templating bug reaching production on every page of the help centre.

## T2 Value proposition & headline patterns

`[observed]` for help-centre and meta copy; the marketing hero is `[absent]`.

**The only marketing-voice string reachable** is the meta description, repeated identically across `description`, `og:description`, and `twitter:description`:

> "Perplexity is a free AI-powered answer engine that provides accurate, trusted, and real-time answers to any question."

Four claim words stacked in one sentence — `free`, `accurate`, `trusted`, `real-time` — with no qualifier attached to any of them. This is the high-water mark of overclaim in the corpus for this product, and notably it lives on the surface with the least room for a caveat.

**Category self-naming.** Perplexity does not describe itself with a single stable category noun. Across four articles it is: `an AI-powered search engine` (What is Perplexity?), `an answer engine` (the article of that name), `an intelligent research assistant` (same article, one paragraph later), and the meta description's `answer engine`. The help centre is simultaneously trying to claim a new category (`answer engine`) and rank in an old one (`search engine`).

**The contrast frame is the load-bearing pattern.** Every capability paragraph is built as *traditional search does X, we do Y*:

- "Traditional search engines present you with lots of links to sift through."
- "Unlike traditional search engines, which make you sift through a list of links…"
- "Perplexity goes beyond simple keyword searches."

The word `sift` appears in two separate articles as the verb assigned to the incumbent. Perplexity has settled on a single pejorative verb for the competitor's core behaviour and reuses it. That is disciplined competitive copy.

**Four-card capability grid** — `What is Perplexity?` frames the product as four cards, each a two-to-three-word noun phrase plus one explanatory sentence:

| Card | What it claims |
|---|---|
| `Direct answers` | Synthesis across sources, fewer clicks |
| `Current information` | Real-time sourcing at query time |
| `Credible sources` | Citations from news, academic, established publishers |
| `Adaptive search experience` | Standard and advanced modes for different depths |

Three are crisp. `Adaptive search experience` is the weak one — it is a feature-set description wearing a benefit label, and its body is twice the length of the others because it has to enumerate three user types to justify itself.

**Where the overclaim is actually bounded.** The `answer engine` article, the shortest in the set, ends on:

> "While we aim for accuracy, we encourage you to double-check sources for added confidence."

This is the accuracy caveat, and its placement is the finding: it is the **last sentence of the shortest article**, and it does not appear on the home meta description, in `What is Perplexity?`, or in `How does Perplexity work?` — the three places a new user is most likely to land. The hedge exists but is not distributed.

**The strongest capability sentence in the set** is the Computer one, and it earns its force by contrast rather than adjective:

> "**Perplexity** answers your questions. **Computer** does your work."

Seven words. No adjectives. Immediately followed by "One gives you answers. The other takes action." Two consecutive two-sentence parallel constructions — slightly over-written, but the first pair would stand alone as the product's best line.

## T3 CTA inventory

`[observed]` on help pages; `[documented]` where the string is quoted from in-product UI.

| CTA (verbatim) | Context | Evidence | Notes |
|---|---|---|---|
| `Search help articles` | Help centre hero search button | observed | Full object, no bare `Search` |
| `⌘K` | Rendered inside the search button | observed | Shortcut exposed visually and via `aria-keyshortcuts` |
| `Subscribe to updates` | Status page header | observed | |
| `View full screen` | Beside the plan-comparison table image | observed | |
| `Contact us via Help > Contact Support` | Foot of most articles | observed | **Breadcrumb-as-CTA** — the label teaches the in-product path, not just the destination |
| `Contact support` | Same action, elsewhere in the same article set | observed | Inconsistent with the above |
| `contact us` | Same action, lowercase, in Data Collection | observed | Third form of one action |
| `Rate this source` | Source detail panel | documented | The citation-feedback affordance |
| `Request more` | Enterprise usage settings, when capped | documented | Asks the admin, not Perplexity |
| `Start a task` | Computer panel input field | documented | Field label doubling as CTA |
| `Manage Plan` (or `Manage Subscription`) | Settings → Subscription | documented | Help text itself parenthesises the alternative — the writer knew the label was unstable |
| `Cancel subscription` | Current plan page | documented | |
| `Renew plan` / `Update plan` | Reactivation path | documented | Two labels, one outcome, per the same FAQ answer |
| `Enable` | Connector tile | documented | |
| `Install` | Connector tile | documented | Two verbs for adjacent states on one surface |
| `Disconnect` | Connector three-dot menu | documented | |
| `Select` | History page, multi-select mode | documented | Bare verb, no object |
| `Share` | Session top-right | documented | |
| `Export` | Session action bar | documented | PDF / Markdown / DOCX |
| `Rewrite` | Session action bar | documented | Regenerates with a different model |
| `Copy` | Session action bar | documented | |
| `3 models` | Model Council search bar | documented | **A count used as a button label** — see T13 |
| `Auto-refill` | Credits settings toggle | documented | |
| `AI data retention` | Preferences toggle | documented | See T10 — the polarity problem |
| `Sort` → `Default` / `Article count` / `Name` | Help centre topic grid | observed | |

**Observations.** There is no acquisition CTA anywhere on the reachable surface — no `Sign up`, no `Try Pro`, no `Upgrade`. Upgrade is instead carried by prose ("upgrade to Max, which includes 10,000 credits a month"), which is either restraint or an artefact of the marketing site being unreachable.

The `Contact us via Help > Contact Support` construction is genuinely interesting and rare: the CTA label is a **navigation instruction for a different surface**, so a user reading the help centre on a phone learns where the control lives in the app. It costs seven words but removes a hunt. Worth stealing for any help centre whose in-product entry points are non-obvious.

Against that, the same action has three labels on the same page set, and `Manage Plan (or Manage Subscription)` ships the ambiguity to the user inside parentheses rather than resolving it.

## T4 Onboarding & getting-started

`[observed]` (help articles) / `[documented]` (in-product steps).

The `Getting Started` collection is **11 articles with no sequence**. There is no numbered path, no "start here", no progress language. Ordering is: `Tips for Getting Better Answers` → `Getting Started with Perplexity` → `What is Perplexity?` → `How does Perplexity work?` → `Practical Tips for Using Perplexity` → `5 Practical prompts for Perplexity Pro users` → `Supported Browsers` → `System requirements` → `What is an answer engine…?` → `What is the difference between a prompt and a search?` → `What's the difference between typing a question and uploading a file or image?`.

Two structural problems, both visible from the titles alone:

1. **Tips precede definition.** `Tips for Getting Better Answers` is first; `What is Perplexity?` is third. The collection opens by optimising a thing the reader has not yet been told the nature of.
2. **Three near-duplicate pairs.** `Tips for Getting Better Answers from Perplexity` vs `Practical Tips for Using Perplexity`; `What is Perplexity?` vs `What is an answer engine, and how does Perplexity work as one?` vs `How does Perplexity work?`. Six articles occupying three conceptual slots. `System requirements` is in the consumer getting-started collection but its own description scopes it to "Enterprise Pro and Enterprise Max plans" — a misfiled article.

**The two genuinely good titles** are the last two, and they are good for the same reason: they name a **confusion the user actually has** rather than a feature.

- `What is the difference between a prompt and a search?`
- `What's the difference between typing a question and uploading a file or image?`

These are the only two titles in the collection that could not have been written from a feature list. Note also the inconsistency between them — `What is` vs `What's` in adjacent titles.

**In-product step sequences** `[documented]` are consistently written as bare imperatives with the control name bolded:

Model Council on web, four steps: "Go to the Perplexity homepage on web." → "Click Search below the search bar." → "Select Model Council." → "Enter your question and press Enter."

Computer access, two steps then a prose continuation: "Go to the **Home** page." → "Select the **Computer** icon." then "3. In the **Computer** panel, select the **Start a task** field…" — **the numbered-step component is abandoned mid-list** and steps 3 and 4 are hand-numbered paragraphs. A rendering/authoring defect visible in the published output.

**The best onboarding pattern found** is Model Council's verification step, which is not part of the numbered list but follows it:

> "**How to verify it worked.** The search bar shows Model Council as the active mode and displays **3 models**…"

A named, bolded *How to verify it worked* section after a procedure. Most help articles stop at the last action and leave the user unsure whether the state changed. This closes the loop explicitly. It is the single most reusable structural device in the Perplexity help corpus.

## T5 Form & field labels

`[documented]` unless noted.

**Credits settings** — the most field-dense surface described:

| Label | Hint / definition as published |
|---|---|
| `Auto-refill` | Toggle; "off by default" stated twice on one page |
| `Refill amount` | "This is how many credits you buy each time (set any value you want)" |
| `Monthly auto-refill limit` | "This is the most you will automatically spend on auto-refill each month." |
| `Monthly spending cap` | Default `$200`, settable "anywhere up to $5,000" |
| `Usage` dropdown | Per-thread credit consumption |
| Balance types | `Bonus`, `Plan`, `Purchased` |

The definition grammar — **"This is <plain restatement>"** — is unusually literal and reads as if written for a user who has just been surprised by a charge. Given that the same page has a refunds section, that is probably exactly right. The parenthetical "(set any value you want)" is doing anxiety work, not information work.

Note a **label/concept mismatch**: the balance type is displayed as `Plan` but the prose calls it "Monthly credits" throughout, and the article has to gloss it — "**Monthly credits** (shown as "Plan")". The doc is patching a UI label it cannot change.

**Privacy preferences**

| Label | Location |
|---|---|
| `AI data retention` | Account → Preferences |

See T10 — this label's polarity is the most serious content defect found.

**Billing**

`Subscription` (settings section) · `Billing and Shipping Information` · `Manage Plan` / `Manage Subscription`.

**Session composer** `[documented]` — the pre-answer input surface, described positionally rather than by label: Search Modes selector (1), model selector (2), Sources selector (3), attach files (4), microphone icon (5). Only two of the five have quotable labels in the text: the `Sources` control offers `Web` or `Academic`; Enterprise Pro replaces `Focus` with `Choose sources` offering `Web`, `Org Files`, `Web + Org Files`, or `None`.

`None` as a source-scope option is notable — it lets the user turn the retrieval off entirely, which for a self-described answer engine is a meaningful and honestly-labelled state.

**Help centre search** `[observed]`: button label `Search help articles`, `role="search"`, `aria-haspopup="dialog"`, `aria-keyshortcuts="Meta+K Control+K"`, visible `⌘K` affordance marked `aria-hidden`.

## T6 Status & state language

`[observed]` for the status page; `[documented]` for product states.

**Status page** `[observed]` — hosted on incident.io, resolving `status.perplexity.ai` → `status.perplexity.com` (a domain switch mid-redirect, worth noting for trust-signal consistency).

Headline state, first person plural:

> `We're fully operational`
> "We're not aware of any issues affecting our systems."

The subline is the interesting half. Most status pages assert *there are no issues*; Perplexity asserts *we are not aware of any issues*. That is an epistemically honest downgrade of the claim, and it matches the product's broader "verify it yourself" posture. It is also the single best transferable string on the page.

Four monitored components, and the choice of four is itself a product statement: `Website` (100% uptime) · `App` (99.95%) · `Computer` (99.64%) · `API` (100%), over `Jun 2026-Sep 2026`. `Computer` — the agentic tier — is broken out as a peer of the whole website and is the least reliable component shown. Publishing that rather than folding it into `App` is a deliberate transparency choice.

**Credit balance states** `[documented]`: three named balances consumed in a stated order — "Bonus first, then Monthly, then Purchased."

**Task states** `[documented]` — the vocabulary is built around one distinction, repeated:

- "**Active tasks pause.** They do not cancel. Your work is saved."
- "**New tasks are blocked.**"
- "**Tasks resume automatically.**"

`pause` / `cancel` / `blocked` / `resume`. The gloss "They do not cancel" is the pattern: the doc **pre-empts the word the user fears** and negates it in the same breath as the word the system uses. Compare Wise writing an article to reconcile "complete" with "not arrived". Perplexity does it inline, in three words, which is cheaper and better.

**Negative balance** is treated as a legitimate state with three named causes, closing on "You are not charged extra for going temporarily negative." Documenting a state that looks like an error but is not, and saying explicitly what it does *not* cost, is good practice.

**Subscription states** `[documented]`: `Paused` is a first-class state with its own article (`Why is my subscription Paused?`) — capitalised mid-sentence in the title, so it is being named as a system state rather than described. Also `past-due`, "reverted back to the free version", "downgraded to Perplexity's free version".

**Entitlement lifecycle states** `[observed]` — the plan comparison table uses `Being retired` as a cell value for `Organization File Repository` on both Enterprise rows, with a footnote giving a hard date (October 1, 2026), a migration article, and the consequence ("Files remaining after that date will be deleted"). Putting a deprecation state **inside the feature matrix** rather than in a separate notice is a strong pattern: the user comparing plans sees the sunset at the moment of comparison.

## T7 Error, failure & recovery

`[documented]`. This is the thinnest priority area, and the thinness is itself the finding.

**Only one genuine error-recovery article exists** in the consumer troubleshooting collection: `Cloudflare & VPNs`. Its structure is a nested Q&A — `What is Cloudflare?` → `Why do I see a Cloudflare loading screen?` → `How do I avoid the Cloudflare screen?` → `What should I do if I am stuck on the Cloudflare loading screen?` — with four remedies (avoid VPNs, update browser, clear cache and cookies, refresh / different browser). **`Clear cache and cookies` appears twice as its own H2** within one article, once under "avoid" and once under "stuck", with near-identical bodies. A heading-level duplication defect.

Note the *content* problem underneath: the recommended fix for a security check is "Avoid using VPNs" and "Logging in can help". The article asks the user to reduce their own privacy posture to reduce friction, and does not acknowledge the trade-off. For a company that publishes nine privacy articles, that is an unexamined contradiction.

**Troubleshooting collection titles** — the grammar is a three-way split with no governing rule:

| Shape | Examples |
|---|---|
| `How do I / How can I …?` | `How do I submit a bug report?`, `How can I report incorrect or inaccurate answers?`, `How can I contact the Perplexity team?` |
| `Where do I …?` | `Where do I report bugs?`, `Where do I report security issues? Is there a bug bounty program?` |
| Bare noun / fragment | `Cloudflare & VPNs`, `Need support?`, `Email Assistant Troubleshooting` |

**`How do I submit a bug report?` and `Where do I report bugs?` are two separate articles in the same 11-article collection.** So are `How can I contact the Perplexity team?` and `Need support?`. Four articles, two questions. This is a maintenance failure visible from the category page without opening anything.

Absent from the whole set: **no first-person recovery titles** ("I can't sign in" exists only as `I am having issues signing in`, surfaced via a related-links block rather than the troubleshooting collection), and **no "why" articles** explaining adverse outcomes. Where Wise ships `Why was my transfer cancelled?`, Perplexity's only consumer-facing "why did this go wrong" surfaces are `Why can't I see my Pro status?` and `Why is my subscription Paused?` — both filed under billing, not troubleshooting.

**The hallucination-report taxonomy** `[observed]` is the most useful failure vocabulary found, in `How can I report incorrect or inaccurate answers?`. The user is asked for a query URL, a description, and the article lists what the team is looking for:

`Repetitive behavior` · `Loss of context within a thread, a project or with internal file search` · `Ignoring prompts` · `Misinformation` · `Outdated information`

Five named model-failure modes, in the user's report form, on a public page. Publishing your own taxonomy of ways the product fails is rare and genuinely good. Two observations: the list leads with mechanical failures (`Repetitive behavior`) and buries `Misinformation` fourth, and the entry still says `thread`, a term the product renamed to *session* (see T13).

**Recovery entry point** `[documented]`: "Use the flag icon below the answer to report issues." A flag icon, unlabelled, is the primary in-answer correction affordance.

**Credit-state failure triage** — the credits article contains the best-constructed troubleshooting passage in the corpus, under a heading that is a full sentence describing the contradiction the user is staring at:

> `A task says you're out of credits but your balance shows credits remaining`

Three ordered checks follow: `Refresh first.` (acknowledges UI lag) → `On an Enterprise plan, check which balance you're looking at.` (explains pool-vs-allocation) → `Still blocked with credits available?` (escalate with the task URL). Naming the *apparent contradiction* as the heading, rather than the system condition, is the pattern to take.

## T8 Empty states

`[absent]`

No no-results, no-data, first-run, or cleared-state copy is reachable on unauthenticated surfaces. The help centre's own search is a client-side dialog whose no-results string was not retrievable from server markdown. The status-page calendar renders `Loading...` as a placeholder in the served HTML, which is a loading state rather than an empty state.

The nearest documented analogue is the zero-credit condition, covered in T6 — and notably Perplexity treats zero credits as a *paused* state with resumption language rather than as an empty state, which is the right call.

## T9 Notifications & system messages

`[documented]`

**The email inventory is published.** The credits article lists, verbatim as bolded triggers, every transactional email the credits system sends:

| Trigger label | When |
|---|---|
| `Credit purchase` | confirmation when auto-refill adds credits |
| `Low balance` | when credits are running low (if auto-refill is off) |
| `Out of credits` | when you run out of credits and tasks pause |
| `Spending cap reached` | when you've hit your monthly spending cap |
| `Payment failed` | when an auto-refill charge couldn't be processed |

Five triggers, each a two-to-three-word noun phrase plus a `when…` clause. **Publishing the full notification schedule for a metered feature is the strongest trust pattern in this file.** The user can audit, before spending anything, exactly when the system will interrupt them — and by implication, when it will not. The conditional on `Low balance` ("if auto-refill is off") even tells you which notification you forfeit by enabling automation.

**In-flow prompts** `[documented]`:

- A credits purchase prompt appears mid-task, and the article tells the user how to read it: "If you see a prompt to add credits, it means the request you sent would run through Computer. You can dismiss the prompt and continue with Ask instead. You don't need to buy credits or cancel your plan." That last clause — *you don't need to cancel your plan* — is the doc anticipating a churn reflex and heading it off.
- Spending cap: "You will see a notification with the option to raise your limit." The notification carries the remedy.
- Trial payment-method prompt, dual-channel and explicitly enumerated: "**Email:** You will receive an email notification…" / "**In-app:** An in-app banner will appear…"

**Confirmation friction** `[documented]`: "To prevent accidental deletions, we've added confirmation prompts." Stated in a FAQ answer to `Can I recover a deleted Session?`, immediately after "Once a session is deleted, it cannot be retrieved." Irreversibility first, mitigation second — correct order.

**Warning callouts** `[observed]` — the help centre uses typed callout components (`Note`, `Tip`, `Warning`) with a discernible register split. The two `Warning` instances found are both financial-consequence warnings:

- "Cancel your Pro subscription before deleting your account."
- On updating payment details via app stores: "Doing so will create a **new, separate subscription** and you **will be charged**."

The second is the most emphatic string in the entire corpus — bold on both the cause and the consequence, plus a preceding "***Important:*** Do **not**". The emphasis budget is spent where money is lost. That is a defensible gradient.

## T10 Disclosures, legal & compliance

`[observed]` / `[documented]`. Priority section.

### Accuracy and hallucination disclaimers

There is no single accuracy disclaimer. There are four, of very different strength, in four places:

1. **Answer-engine article, final sentence:** "While we aim for accuracy, we encourage you to double-check sources for added confidence."
2. **Source labels, "Good to know":** "Perplexity aims for accuracy, but reviewing the original sources yourself remains the best way to build confidence in an answer."
3. **Source labels, "What labels do not tell you":** "a label is never a substitute for reading the source yourself."
4. **Model Council rationale:** "Every AI model has blind spots. It may overlook context, lean toward certain perspectives, or fill gaps with confident guesses."

Item 4 is the most candid sentence Perplexity publishes. `fill gaps with confident guesses` is a plain-English definition of hallucination, written without the word, and attributed to models generically rather than to Perplexity specifically. It sits in a feature article for a Max-only feature — so **the most honest statement about model unreliability is used as the sales rationale for the most expensive tier.** That is the sharpest observation available about this product's disclosure strategy: candour is not distributed evenly, it is allocated where it converts.

Items 1 and 2 share a construction worth naming: **"we aim for accuracy, but you verify"**. The hedge verb is `aim`, never `ensure`. The burden is transferred to the reader in the same sentence, and the transfer is framed as a benefit to them (`for added confidence`, `to build confidence`) rather than as a limitation of the system. Compare the meta description's unqualified `accurate, trusted`. Marketing asserts; help hedges; nothing on the marketing surface carries the hedge.

### Source attribution and the label system

The `Understanding source labels` article is the strongest single artefact in this harvest and the clearest expression of the "source-led answer experience" benchmark strength.

**The mechanism.** A shield icon on a citation, carrying one of three labels — `Government`, `Academic`, `Trusted`. Hover or select a source to see the label plus a one-sentence description of the domain. Labels apply to **whole websites, not pages**: "Perplexity rates the whole website a source comes from, not each individual page."

**The three labels, as defined:**

| Label | Definition (paraphrased) | Published example domains |
|---|---|---|
| `Government` | official website of a government organization | `nasa.gov`, `epa.gov` |
| `Academic` | scientific sites | `science.org`, `journals.plos.org` |
| `Trusted` | broad category; appears often enough to be rated, publishes within its own area of expertise | `reuters.com`, `mayoclinic.org` |

**The criteria are published as three questions, in plain language:**

- "Does the site correct its mistakes?"
- "Does it say who wrote each piece?"
- "Does it keep news separate from advertising and opinion?"

Three yes/no questions a non-expert can evaluate, each naming a journalistic norm without naming it. This is the single most reusable disclosure artefact in the file: **an editorial-quality rubric rendered as questions the reader could ask themselves.**

**The negative space is where the writing is best.** Four separate disclaimers bound what a label means:

- "Most domains on the web do not have a label. No label does not mean a site is low quality, and it is not a negative judgment."
- "A label is also not an endorsement of what a site publishes."
- "A label describes the website as a whole, not any single article or claim on it."
- "Labels can change over time as sites are reassessed."

Plus the commercial firewall, stated once and unambiguously:

> "Labels are set by the source review process alone. Perplexity's partnerships, payments, and other business arrangements do not affect a site's label."

An explicit **pay-for-placement denial** attached to a trust signal. For any product that ranks or badges third parties while also selling partnerships, this is the sentence to copy.

**Confidence is expressed structurally, not numerically.** There is no percentage, no confidence score, no "high/medium/low" anywhere. Confidence is conveyed by (a) the source label, (b) citation count as a plan benefit, (c) model agreement in Model Council. This is a coherent choice: Perplexity never quantifies its own certainty, only the provenance of its inputs. A content designer choosing between "87% confident" and "3 of 3 models agree, sourced from two Academic domains" has Perplexity's answer here.

**Citation volume is sold as a benefit.** `What is Perplexity Pro?` leads its benefit list with "10x as many citations per answer for greater reference depth and transparency." Transparency is priced. Note the unattributed multiplier — `10x` against no stated baseline.

**Feedback loop on sources** `[documented]`: each source panel carries `Rate this source`. And the article closes with a `For website owners` section directing publishers to support — the only publisher-facing content reachable in this harvest (the publisher-programme pages were unreachable; see Caveats).

### Data use and training opt-out

**Default is opt-in.** "For **Free**, **Perplexity Pro** and **Perplexity Max** users, AI Data Retention is enabled by default."

**Enterprise is carved out absolutely,** using `never` three times on one page: "**Perplexity Enterprise** data is **never** used for AI training purposes"; "Query information is never used to train Perplexity's models"; "Enterprise customers' data is never used or retained for training AI models." Plus named third-party terms: "Strict **Zero Data Retention and Zero Data Training** agreements with AI providers (OpenAI, Anthropic, and more)".

**The opt-out limits are stated plainly and are the honest part:**

- "Opt-outs only apply to data collected after the opt-out date"
- "Previously collected training data cannot be deleted or removed"
- "The opt-in/out setting applies to individual users only"

And what opting out does *not* buy you, under the heading `What opting out does NOT affect:` — "Data may still be processed for service operation, legal compliance, and product improvement." Distinguishing *training* from *product improvement* is legally precise and, for a lay reader, close to meaningless; the two phrases are not defined against each other anywhere on the page.

**Defect — the toggle label has inverted polarity relative to the user's intent.** The control is called `AI data retention`. The instructions read: "If the toggle is enabled, your data is being collected for AI training" / "Toggle off to opt out of AI training data collection." So the user who wants privacy must turn *off* a thing named `retention`, on a `Preferences` page, where "enabled" is the privacy-reducing state and the default. The article has to spend two full steps of a five-step procedure explaining what the toggle's own state means. **When a help article needs a sentence to explain which way a toggle points, the label has failed.** A label like `Use my data to improve AI models` would be self-describing and need no gloss.

**Also inconsistent:** the settings page is called `Preferences` here; elsewhere privacy controls are described as living in "Account Settings" and "your settings". The plan-comparison table adds a fourth phrasing, `Opt-out AI training available`.

**Non-sale commitment:** "Perplexity does not sell your data. Information is only shared with trusted service providers (payment processors, customer support) or when required by law."

**Retention specifics** `[documented]`: Enterprise uploaded files retained 7 days; custom retention configurable for orgs with 50+ Enterprise Pro seats or 1 Enterprise Max seat; sessions "stored in the History indefinitely"; anonymous (signed-out) sessions "visible for 14 days, after which they will disappear permanently without the possibility of recovery."

**Lapse/downgrade disclosure** — genuinely good and rarely written: if an Enterprise subscription lapses, data protection persists; but on voluntary downgrade to a consumer plan, "you'll need to manually **opt out** of AI data usage in your Account Settings". The article tells you that a *billing* action silently changes your *privacy* posture. Most products do not connect those two.

### Usage limits and rate-limit language

The limit vocabulary is the weakest disclosure area, because most of it is unquantified. From the plan table:

`3/day` · `1/month` · `Weekly limits (average use)` · `Monthly limits (average use)` · `Weekly limits (advanced use)` · `Extended limits (400/week)` · `Highest limits (4000/week)` · `Practically unlimited basic searches` · `Very limited amount of Pro Searches` · `Limited amount Create files and apps queries every 30 days` · `Limited` · `minimal limits on volume or frequency` · `generous usage limits`

**Consumer tiers get adjectives; Enterprise tiers get numbers.** Free and Enterprise rows carry hard figures (`3/day`, `400/week`, `500/month`, `4000/week`); Pro, Education Pro, and Max — the three paid consumer plans — carry only `(average use)` and `(advanced use)`. A consumer cannot learn from the comparison table what they are buying. `Practically unlimited` and `Very limited` appear in the same six-bullet list describing one plan.

Two further softeners:

- "**For Advanced AI model queries, access may be limited during weeks of especially heavy usage.**" — bolded, in a `Note` callout, with no threshold, no notice mechanism, and no stated user-visible signal.
- Model Council: "There is a monthly cap on how many Model Council queries you can run" — cap unstated.

The one place limits are quantified for consumers is credits, and there the article is scrupulous: a four-row complexity table (`Light` 100–350, `Complex` 350–950, `Heavy` 875–2,275, `Mega` 2,400–9,800) with an example prompt per row, prefaced by "These are examples, not guarantees. Your actual usage may differ." and a change-notice clause: "Credit pricing, task ranges, and monthly allowances may change… We'll update this page or your account settings if there are any significant changes."

**That is the Wise "claim, bound, personalise" pattern executed well** — ranged figure, worked example, explicit non-guarantee, and a route to the user's own number (`perplexity.ai/account/usage`). It exists for credits and nowhere else.

**Defect:** the complexity table's `Light` row says `100–350` credits, but the `Tip` callout two paragraphs above says "Light tasks use about 15 to 70 credits." Two numbers for one band, on one page, roughly 200 words apart. Neither is marked as superseding the other.

### Money, refunds, and consumer law

- "Credits are non-refundable. They cannot be redeemed for cash. They cannot be transferred or sold. They only pay for eligible Perplexity features. They carry no value outside Perplexity." — five short declaratives, no hedging. Clean scrip disclosure.
- Refunds are then granted in four named cases, and jurisdictional rights are named rather than buried: "In the EU, UK, and Turkey: Within 14 days of purchase; and In Brazil and South Korea: Within 7 days of purchase", prefaced by "Where the law gives you stronger rights, those rules apply."
- Non-refundable cases are enumerated with reasons, not just stated: credits spent on a completed task "paid for the computing power that ran the task"; credits on a task the user stopped "already spent up to that point paid for real computing power". **Justifying each refusal with the underlying cost** is better practice than a blanket clause.
- Failure-side refund is automatic: "If a Computer task can't finish because of an error on our side, we restore the credits used for that task… usually within a few minutes." The scope is `an error on our side`, with examples (`a tool crash, a sandbox error, or a network failure`).
- Auto-renewal disclosure on trials: "Unless you cancel before the trial ends, your subscription will auto-renew at the standard rate."
- Card-failure cascade, disclosed: "If payment on the default card fails, we may attempt to charge other cards on file with Perplexity to avoid service disruption." Notable — a multi-card retry disclosed in a help article rather than only in terms.

**Prices found, with their sources.** Perplexity Max `$200 per month` or `$2,000 per year` (stated only in the Model Council article, not the plan article); Education Pro `$10/mo with verification from SheerID`; Enterprise Pro "starts at `$40/month` or `$400/year/seat`"; education/nonprofit Enterprise Pro discount `$30/seat per month` or `$300/seat annually`. **The plan-comparison article gives no price for Free, Pro, or Max** — the three consumer tiers it exists to compare.

### Acceptable-use boundary

Thin. The only boundary statement found is in the credits FAQ, and it is defined by what will *not* trigger enforcement:

> `Can Perplexity revoke my credits?` — "Only in limited cases like fraud, abuse, or Terms of Service violations. We won't revoke credits just because you use the product heavily within our policies."

The second sentence is the useful one: an explicit promise that heavy legitimate use is not abuse. For any metered product where users fear tripping an invisible fair-use line, that reassurance is the pattern.

`fraud, abuse, or Terms of Service violations` is otherwise undefined on public help surfaces. No content-policy, prohibited-use, or safety article surfaced in any of the six collections inspected. Crawling conduct is addressed only from the publisher side (`How does Perplexity follow robots.txt?`, title only).

## T11 Help-centre architecture

`[observed]`

**Two levels: 16 collections → flat article lists.** No sub-sections within collections, unlike Wise's named sub-groupings. A 39-article collection (`Perplexity Enterprise`) is one undifferentiated list.

**Article counts are published on every tile and every collection header** ("11 articles"), and the grid offers `Sort` by `Default` / `Article count` / `Name`. Exposing a sort control on a 16-item grid is over-engineering; exposing `Article count` as a sort key optimises for the publisher's view of the corpus, not the reader's need.

**Collection descriptions are auto-generated and visibly so.** Each collection's meta description is a template filled with its first few article titles:

> "Find Features help for "What is Pro Search?", "What is a Session?", and "Technical capabilities of Sessions"."
> "Find Privacy & Data help, guidance, and next steps in "What data does Perplexity collect about me?"."

Note the second variant handles a one-item case by switching template ("help, guidance, and next steps in") and produces an ungrammatical trailing construction. Meanwhile the human-written descriptions, where they exist, are far better: `Getting Started` — "Everything you need to get going." Four of the six collections inspected have **no** human description at all, only the generated meta.

**Article-title grammar — five shapes, no governing rule:**

| Shape | Examples |
|---|---|
| `What is X?` | `What is Pro Search?`, `What is a Session?`, `What is Computer?`, `What is Learn Mode?`, `What is Model Council?` |
| `How do I / How can I …?` | `How do I change to my preferred AI model?`, `How can I report incorrect or inaccurate answers?` |
| `Why can't I …?` | `Why can't I see focus mode on my search bar?`, `Why can't I see my Pro status?` |
| Gerund / noun topic | `Generating Images with Perplexity`, `File Uploads`, `Canceling a Subscription`, `Memory`, `Refunds` |
| Marketing-voice fragment | `Perplexity Max`, `Instant Buy + Buy with PayPal`, `Perplexity Pages` |

`What is X?` dominates and is the house style — at least nine articles. It suits a product whose problem is that nobody knows what its nouns mean (see T13). But it produces a help centre that **explains more than it fixes**: of the ~90 titles seen across six collections, the great majority are definitional or procedural, and only one (`Cloudflare & VPNs`) is a pure error-recovery article.

**Capitalisation is not governed.** `Canceling a Subscription` (title case) sits beside `Generating Videos with Perplexity` (title case, lowercase preposition) and `What is Internal Knowledge Search` (sentence case, no question mark on a question-shaped title) and `Understanding source labels` (sentence case). Four conventions in one corpus. The newest articles (`Understanding source labels`, `What advanced AI models are included in my subscription?`) are consistently sentence case, so a style change is in progress and has not been back-applied.

**Routing furniture** `[observed]`, at the foot of the better articles, under `Need more help?`:

1. `Contact us via Help > Contact Support`
2. "Open the Help Center from the **?** icon in the bottom-right corner of Perplexity."
3. "Pro subscribers can access live chat in **Settings**."

Support is tiered by plan and the tiering is stated openly — `Basic` / `Priority` / `Dedicated` in the plan table, with `Basic: Basic Help Center` meaning *self-service only*. Naming the free tier's support as "Basic Help Center" rather than implying human contact is honest.

**Related-links blocks are algorithmic and sometimes wrong.** Every page ends with a four-item `Related topics` list. On `Understanding source labels`, one of the four is `Product Information` from `/help-center/store/en/` — a different help centre (the merchandise store). On the help-centre home, the first related topic is the store's home page, also titled `How can we help?`. The recommender is crossing product boundaries and surfacing a shop page from a citations article.

**The machine-readable layer is a first-class surface.** `llms.txt` exists, is well-formed, and carries a directive block addressed to AI agents:

> "This content comes from the official Perplexity Help Center. Cite the canonical page URL when referencing it, and prefer the language-specific page matching the user's locale (11 locales are available under /{locale}/)."

Every article page repeats this block and a `Documentation Index` pointer. **Perplexity is writing UX content for AI agents as a named audience, with its own register (imperative, citation-focused) and its own IA.** For an answer engine, dogfooding the crawler-facing contract it wants other publishers to honour is coherent and strategically pointed.

**But the machine IA has no IA.** The `llms.txt` index classifies all 3,290 pages under a single top-level bucket literally labelled `Other`, subdivided only by URL path (`Other / Comet`, `Other / De`, `Other / Store`). The sixteen human-facing categories are not represented at all. The agent-facing surface has the polish and none of the taxonomy.

## T12 FAQs

`[observed]`. Unlike most products, Perplexity's FAQ answers *are* in the served markdown, so answers are summarised below rather than lost.

**Placement:** FAQs are not a standalone page. They are an `AccordionGroup` block at the foot of individual articles, under `Frequently asked questions` or `FAQs`. This makes them **topic-scoped rather than site-scoped** — the questions are the residue of one article's support tickets.

**`How Credits Work on Perplexity` — nine questions.** The richest FAQ block found.

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Do monthly credits carry over? | No; unused monthly credits expire each cycle |
| 2 | Do purchased credits expire? | Yes, after one year of inactivity |
| 3 | What happens to my credits if I cancel? | All forfeited at subscription end, non-refundable except where law requires |
| 4 | Can Perplexity revoke my credits? | Only for fraud, abuse, or ToS violations; not for heavy legitimate use |
| 5 | Can I use credits on mobile? | Yes — manual credit packs on iOS, Android, Samsung Galaxy Store |
| 6 | Why am I asked to buy credits when I already pay for a subscription? | Subscription and credits are separate; Ask is free of credits, Computer is not |
| 7 | Do Pro credits refresh monthly? | No; Pro has no monthly allocation, only a one-time bonus, then purchase or upgrade |
| 8 | I'm a Pro subscriber. How do I get credits? | Check settings for promotional credits; otherwise purchase, or upgrade to Max |
| 9 | I was charged for credits I didn't authorize. | Check the auto-refill setting; contact support if in error |

**Structural reading.** Questions 1–3 are expiry and forfeiture, 4 is enforcement, 5 platform, 6–8 the Pro grievance, 9 an unauthorised charge. **Seven of nine are about losing money or access.** This FAQ is a refund-deflection surface, and it is honest enough not to disguise that.

Two grammatical outliers are the most interesting entries. Q8 and Q9 are **not questions** — `I'm a Pro subscriber. How do I get credits?` opens with a self-identification, and `I was charged for credits I didn't authorize.` is a flat declarative statement with a full stop. That is the Wise first-person-confession pattern arriving in an FAQ list: the string the aggrieved user would type. It appears exactly twice, in the two entries with the highest emotional charge, and nowhere else in the corpus. Almost certainly lifted from real tickets rather than designed — which is why it works.

Q6 (`Why am I asked to buy credits when I already pay for a subscription?`) is the question the pricing architecture forced into existence, and Perplexity answers it four separate times across three articles. When one question needs four answers in different places, the model is the problem, not the copy.

**`What advanced AI models are included in my subscription?` — five questions,** and this block is doing genuine expectation management rather than deflection:

| # | Question (verbatim) | Answer, summarised |
|---|---|---|
| 1 | Will the models available to me change? | Yes; models are added and retired continuously |
| 2 | Are third-party models the same as using the provider's own app? | No; Perplexity wraps them in its own search, citations, prompts, safety systems and limits |
| 3 | Does my subscription include API access? | No; API billing and catalogue are entirely separate |
| 4 | Will my queries be used to train these models? | Consumer Pro/Max can opt out; Enterprise data never used |
| 5 | Why can I not see a model listed here? | Plan, staged rollout, region, or an Enterprise admin restriction |

Q2 is the standout. Publicly stating that *the same model behaves differently inside our product* is a hard thing to say — it concedes that "Claude Sonnet 5" on Perplexity is not "Claude Sonnet 5", and pre-empts a real and common user complaint. Most resellers of third-party models leave this unsaid.

Q5's answer lists four causes in ascending order of the user's ability to act, ending with "contact your administrator" — routing the user to the right person rather than to Perplexity support.

**`What is a Session?` — three questions,** including the signed-out data question: `What happens to Sessions when I'm not signed in?` → anonymous sessions visible 14 days, then permanently gone. Putting a data-retention fact in a feature FAQ, rather than only in the privacy collection, is correct placement.

**`Canceling a Subscription` — five questions,** four of which are post-cancellation anxiety (`Will my subscription auto-cancel at the end of its cycle?`, `If I delete my account, will it terminate my subscription?`, `Can I cancel my subscription any time?`, `Is it possible to reactivate my subscription after canceling?`) and the fifth is the failure case, written in first person again: `I've cancelled my subscription, but I'm still being charged. What can I do?`

**`Which Subscription Plan is right for you?` — four questions**, including `Is my data private?` answered as a three-row list by plan tier rather than as prose. Answering a privacy question with a plan-tier table is a revealing piece of structure: privacy is positioned as a feature with SKUs.

## T13 Terminology & glossary

`[observed]` / `[documented]`. Priority section. This is the most unstable vocabulary in the corpus.

### Coined and chosen terms

| Term | Usage | What it replaced / rejected |
|---|---|---|
| `answer engine` | The category claim | "search engine" (which it also still uses) |
| `Ask` | The free, credit-free search product | "Search" — but `Search` is *also* a mode name |
| `Computer` | The agentic tier: "an independent digital worker" | "agent", "assistant" |
| `Comet` | The browser | |
| `Comet Assistant` | In-browser agent, with `Search mode` / `Work mode` | |
| `Model Council` | Multi-model consultation with a `synthesizer model` | "ensemble", "multi-model" |
| `Brain (Research Preview)` | "a self-improving memory system" | |
| `Sonar` / `Sonar 2` | The in-house model | |
| `Best` | Automatic model selection; "not a separate mode" | "Auto", "Default" |
| `Thinking` | A per-model toggle, "a setting on a model, not a separate model" | "reasoning mode" (a term still live elsewhere) |
| `Pro Search` | Deeper search tier | |
| `Deep Research` / `Research` / `Advanced Deep Research` | Long-form report generation | |
| `Learn Mode` | Study mode with quizzes | |
| `Create files and apps` | Artefact generation | A verb phrase used as a product noun |
| `Session` | A conversation unit | `thread` (still in slugs and body text) |
| `Project` | A workspace | `Space` (still in slugs) |
| `History` | Saved sessions, at `/library` | `Library` (still in the URL) |
| `credits` | Compute currency, `100 credits = $1` | "tokens", "compute units" |
| `Bonus` / `Plan` / `Purchased` | Three credit balances | |
| `auto-refill` | Automatic credit top-up | "auto-renew", "top-up" |
| `Connectors` | Third-party app integrations | |
| `Sub-Agents` | Domain-specific delegated agents | |
| `Skills` | Computer capabilities ("Model Council runs as a skill") | |
| `Portable Computer` | On-device Computer for NVIDIA hardware | |
| `Instant Buy` | In-answer commerce | |
| `Internal Knowledge Search` | Search over org files | |
| `Choose sources` | Enterprise replacement for `Focus` | `Focus` |
| `Government` / `Academic` / `Trusted` | The three source labels | "verified", "authoritative" |
| `Standard` | The free plan, on the plan page | `Free`, used everywhere else |

### The renaming debt is the headline finding

Three product nouns were renamed and the rename is only half-applied. All three are **visible to users**, not just internal:

| Old term | New term | Where the old term still lives |
|---|---|---|
| `thread` | `Session` | URL slug `10354769-what-is-a-thread`; slug `10354775-technical-capabilities-of-threads`; article title `Troubleshooting access to threads & Pro features`; body text of the accuracy-report article ("Loss of context within a **thread**, a project or with internal file search"); Korean popular-articles slug is still the untranslated `what-is-a-thread`; Hindi slug is `thread-क-या-है` under the title "सेशंस क्या है?" |
| `Space` | `Project` | Slug `10352961-what-are-spaces` serving the title `What are Projects?` |
| `Library` | `History` | "go to your History page: perplexity.ai/**library**" — the instruction names one thing and links to another |

So the help centre says *Session*, the URL says *thread*, one live article title says *threads*, and a localised slug says *thread* under a translated title that says *session*. A user who searches the help centre for "thread" and a user who searches for "session" will get different results for the same concept, and an AI agent following `llms.txt` will index both.

`Create files and apps` deserves separate mention: it is a **four-word verb phrase used as a countable product noun** — "Limited amount Create files and apps queries every 30 days", "maximize the Create files and apps feature", "the highest access to Create files and apps and Research search modes". It does not decline. Every sentence containing it is ungrammatical or nearly so, and the plan table has to shorten it to `File and App Creation` to fit a column — a fifth name for the same thing. This is what happens when a feature is named by its marketing description rather than given a noun.

### The mode taxonomy contradicts itself across three articles

| Source | The stated mode set |
|---|---|
| `What is Perplexity Pro?` | "our four search modes (**Best, Pro Search, Reasoning Search, and Research**)" |
| Same article, card group | `Best mode`, `Research mode`, `Create files and apps` |
| `What advanced AI models…?` | `Search`, `Deep Research`, `Learn Mode`, `Model Council`, `Comet`, `Perplexity Computer` — and explicitly: "**Best** is not a separate mode." |
| `What is a Session?` | "Search Modes: **Pro, Research, and Create files and apps**" |
| `Features` collection | `What is Research mode?` *and* `What is Reasoning mode?` both live |

Four mode taxonomies. One article calls `Best` a mode and another states it is not. `Reasoning Search` / `Reasoning mode` is named as one of four modes in the Pro article and is absent from the models article's six. This is the terminology problem that most directly damages users: the mode picker is the primary control, and the docs cannot agree on what is in it.

### The model names are stale in three of four places

| Source | Models named |
|---|---|
| `What advanced AI models…?` (snapshot dated **September 4, 2026**) | `Sonar 2`, `GPT-5.6 Terra`, `GPT-5.6 Sol`, `Gemini 3.7 Flash`, `Claude Sonnet 5`, `Claude Opus 5`, `Kimi K3`, `GLM 5.3`, `Grok 4.6`, `Nemotron 3 Ultra` |
| `What is Perplexity Pro?` | `GPT-5.2`, `Claude Sonnet 4.6`, `Gemini 3.1 Pro`, `Sonar`, `Sonnet 4.6 Thinking`, `o3-Pro`, `Claude 4.5 Opus`, `Grok 4`, `GPT-5` |
| `How does Perplexity work?` | `GPT-5`, `Claude 4.6 Sonnet` |
| `Which Subscription Plan…?` (Enterprise Max row) | `GPT-5 Thinking`, `Opus 4.6` |

**Zero overlap between the canonical list and any other page.** `Claude 4.6 Sonnet` and `Claude Sonnet 4.6` also appear as two orderings of one name within the same corpus.

Perplexity has anticipated exactly this and built a defence into the canonical article:

> "Models are subject to change… the list below is a snapshot as of September 4, 2026 and is not a commitment to keep any individual model available. **The model selector in Perplexity is always the source of truth for your account.**"

Every table is captioned "as of September 4, 2026". This is the correct pattern — **date the volatile list, disclaim it as a snapshot, and name the live UI as authoritative.** It is genuinely reusable for any fast-moving capability matrix. But it only works if the *other* pages stop naming models, and three of them have not. The defence is in place on the one page that needed it least.

### Other conflicts worth recording

- **Model Council availability.** The models article: "Available on the **Max and Enterprise Max** plans, on web." The Model Council article: "available on web, in the iOS app, and in Perplexity Computer" and "In Computer, Model Council runs as a skill and is **available in all paid plans**." A Pro subscriber reading page one concludes they cannot use it; reading page two, that they can.
- **Credits settings URL.** Credits article: `perplexity.ai/account/usage` (nine times). Computer article: `perplexity.ai/account/credits`.
- **Auto-refill trigger.** Credits article: "The trigger is 500 credits for Pro and 2,500 for Max." Computer article: "when your balance drops below 500 credits", with no tier split.
- **Light-task credit cost.** Callout: "Light tasks use about 15 to 70 credits." Table, same page: `Light` = `100–350`.
- **Free plan name.** `Standard (Free)`, `Free (Standard) plan`, `Free`, `Standard`, and "the free version" — five forms, two of them on one page.
- **Max annual billing footnote** links the anchor text "perplexity.ai" to `https://perplexity.ai/file/`.

### Register split by surface

Marketing-register strings leak into the help centre wholesale: `Sessions are your gateway to knowledge` as a collection description; "turns answers into *traceable mini-research papers*"; "Turn your ideas into motion"; "supercharges the capabilities of your personal repository". The newest articles — `Understanding source labels`, `What advanced AI models…?`, `How Credits Work` — are flat, sentence-case, and caveat-forward. The older ones are bolded, exclamatory, and adjective-heavy. **The register gradient here is chronological, not stakes-based** — the opposite of Wise, where tone flattens as stakes rise.

## T14 Voice, tone & accessibility

`[observed]`

**Person.** Second person to the user, first-person plural for the company, consistently. "We will email you when…", "We refund credits when…", "We won't revoke credits just because you use the product heavily." The company is a visible actor in adverse copy, which is the right call.

**Register — two voices, unreconciled.** The credits and source-label articles are written in short declaratives with almost no adjectives: "Active tasks pause. They do not cancel. Your work is saved." Five to eight words per sentence in the passages that matter. The older feature articles run to marketing cadence: "Effortlessly upload files", "cutting-edge AI models", "seamlessly", "supercharge". `Effortlessly` and `seamlessly` each appear multiple times; both are claim-words that survive no scrutiny.

**Emphasis is over-used in the older articles.** `What is a Session?` bolds mid-sentence fragments repeatedly — "**remembering what you've talked about and keeping your discussion flowing smoothly from one question to the next**" — bolding an entire clause, which removes the emphasis it intends. The newer articles bold only the lead word of a bullet, which works.

**Contractions** used freely ("don't", "you'll", "can't", "won't"), including in disclosure copy. **No exclamation marks** except one, in a credits FAQ answer: "Yes! You can manually purchase credit packs…" — the single exclamation in the harvest, and it lands on the most trivial answer in the set.

**Numbers.** Specific where they exist: `100 credits = $1`, `2,400–9,800`, `99.64% uptime`, `10,000 credits`, `14 days`, `7 days`, `4000/week`. But see T10 — consumer usage limits are adjectives, not numbers, and the one unattributed multiplier (`10x as many citations`) has no baseline.

**Accessibility — genuinely strong in the newest content, absent in the older.** `[observed]`

Good practice found:

- Breadcrumbs marked `role="navigation" aria-label="Breadcrumb"`.
- Decorative collection eyebrow text and tile artwork correctly `aria-hidden="true"` / `alt=""`.
- Help search: `role="search"`, `aria-label="Help Center search"`, `aria-haspopup="dialog"`, `aria-keyshortcuts="Meta+K Control+K"`, and the visible `⌘K` glyph marked `aria-hidden` so it is not read out as text.
- Popular-articles and quick-action rows carry `aria-label` fallbacks (`aria-label={heading ?? "Popular articles"}`).
- The topic-sort control tracks input modality (`data-modality`, switching on `Tab` / `Arrow` keydown versus pointerdown) so focus styling can differ for keyboard users — a deliberate, non-trivial implementation detail.
- **Alt text in the newest articles is exemplary and content-bearing.** From `Understanding source labels`: "Source detail card for nasa.gov showing the Government label and the description…". From `What is Model Council?`: "A Model Council result on web: one synthesized answer, with each contributing model listed below it." and "The model picker in Computer, prompting the user to select at least two models to include in the council." These describe *state and purpose*, not just contents. They are among the best alt strings in the corpus.

Failures found:

- **Every screenshot in `How Credits Work on Perplexity` carries `alt=""`** — including the usage-page and auto-refill-settings screenshots that the surrounding text refers to as instructional. Same in `What is a Session?` (six images, all empty alt, including the annotated composer diagram the text references as "(1)…(5)"), `Data Collection at Perplexity` (the toggle screenshot), and `What is Computer?` (five images and GIFs, all empty alt). A screen-reader user following the session-creation instructions is told to look at numbered callouts in an image described as nothing.
- The composer instructions depend entirely on **positional references into an unlabelled image** — "select your AI model of choice (2)", "specify your Sources… (3)", "click the microphone icon (5)". Without the image the passage is unusable. This is the most consequential accessibility defect found.
- Several instructional GIFs (`.gif`) with `alt=""` and no text alternative for the motion they demonstrate.

So the accessibility practice is real and recent. Articles dated 2026 (`20260806-understanding-source-labels`, the rewritten models article, the Model Council rewrite) have descriptive alt text and figure captions; articles carrying 2025-era screenshot filenames do not. **The alt-text policy exists and has not been back-applied.**

**Other defects recorded:**

- **A build instruction is published on a live user-facing page.** The plan-comparison article renders, in the body, above the table: "plan-compare-table: full-screen image at assets/img/plan-compare-en.png — REGENERATE with \_scripts/repairs/regen\_plan\_table\_images.js whenever this table content changes." An internal maintenance note, naming a repair script, shipped to users in eleven locales.
- The `Computer` access procedure abandons its step component after step 2 and continues as hand-numbered paragraphs (T4).
- `Clear cache and cookies` appears as two separate H2s in one short article (T7).
- Doubled `/help-center/help-center/` in every internal link (T1).
- The `Related topics` recommender surfaces the merchandise store from a citations article (T11).
- The collection "eyebrow" visually duplicates the H1 immediately below it — correctly hidden from assistive tech, but visually redundant for everyone else.

---

## Transferable patterns

1. **Publish the rubric, not just the badge.** The source-label system works because Perplexity publishes the three questions behind it — "Does the site correct its mistakes?", "Does it say who wrote each piece?", "Does it keep news separate from advertising and opinion?" — in language a non-expert can apply themselves. Any product that badges, ranks, or scores third parties should ship the criteria as plain questions alongside the mark. *Condition:* only works if the criteria are genuinely simple; a rubric that needs a footnote is worse than no rubric.

2. **Attach a commercial firewall statement to every trust signal.** "Perplexity's partnerships, payments, and other business arrangements do not affect a site's label." One sentence, unambiguous, sitting directly under the mechanism. Directly applicable to any PayPal surface that surfaces merchant badges, offer rankings, or recommended providers where a commercial relationship exists elsewhere in the business.

3. **Define the badge by its negative space, four times over.** "No label does not mean a site is low quality." / "not an endorsement" / "describes the website as a whole, not any single article" / "labels can change over time". The four disclaimers are what make the three labels safe to ship. *Condition:* this only scales to a small, stable label set — four caveats per label does not survive a twelve-label taxonomy.

4. **Date the volatile list and name the live UI as the source of truth.** "the list below is a snapshot as of September 4, 2026 and is not a commitment… The model selector in Perplexity is always the source of truth for your account", with every table captioned with the same date. The cleanest solution found to documenting a capability matrix that changes weekly. *Condition:* it fails the moment any other page also names the volatile items — as it has here, on three of four pages. Adopting this pattern requires a matching rule that no other surface may enumerate.

5. **Publish the full notification schedule for anything metered.** Five named email triggers with their conditions, including which notification you lose by turning automation on. A user can audit the interruption model before spending. Transfers directly to balance alerts, spending caps, instalment reminders, and any usage-based billing.

6. **Pre-empt the feared word in the same breath as the system word.** "Active tasks pause. **They do not cancel.** Your work is saved." Three words of negation kill the anxiety the status name creates, without renaming the status. Cheaper than Wise's approach of writing a whole reconciling article, and applicable to every `pending`, `held`, `on hold`, or `under review` state.

7. **Name the apparent contradiction as the heading.** "A task says you're out of credits but your balance shows credits remaining." Not "Troubleshooting balance discrepancies". The user recognises their own screen in the heading and stops searching. Transfers to any support article about a state mismatch between two surfaces.

8. **Justify each refusal with its underlying cost.** Perplexity does not just say credits are non-refundable; it says the credits "paid for the computing power that ran the task" and, for a cancelled task, "the credits already spent up to that point paid for real computing power." Naming what the money bought converts an arbitrary rule into a legible one. Directly applicable to non-refundable fee and FX-spread copy.

9. **Promise that heavy legitimate use is not abuse.** "We won't revoke credits just because you use the product heavily within our policies." A single sentence removing the fear of an invisible fair-use line. Worth copying anywhere a limit exists that users cannot see.

10. **Add a "How to verify it worked" section after a procedure.** Model Council's article names, in bold, exactly what the UI should look like once the steps succeed. Most procedures end at the last click and leave the state change unconfirmed.

11. **Treat AI agents as a named content audience, with their own directive register.** `llms.txt`, per-page "Agent Instructions", and an explicit citation contract. *Condition:* only worth it if you also give that surface a real taxonomy — Perplexity's agent index files all 3,290 pages under a bucket labelled `Other`, which undoes most of the effort.

12. **Negative lesson — never let a toggle's polarity need explaining.** `AI data retention`, defaulted on, where privacy means turning *off* a thing named "retention", forces the help article to spend two of five steps explaining which way the switch points. Name preference controls after the action the user is authorising (`Use my data to improve AI models`), never after the system's internal noun.

13. **Negative lesson — rename in one pass or not at all.** *thread → Session*, *Space → Project*, *Library → History*: all three half-applied, leaving slugs, one live article title, body text, and localised URLs on the old term. The cost is a fractured help-centre search index and, for a company whose product is retrieval, a self-inflicted one.

## Caveats & gaps

- **The entire marketing surface is unreachable.** `https://www.perplexity.ai/` returns an SPA shell; only `<meta>` tags rendered. No hero, no pricing page, no feature pages, no footer, no acquisition CTAs, no legal footer links were observed. T2 and T3 are therefore reconstructed almost entirely from help-centre copy and are not representative of the product's marketing voice.
- **Publisher-relations content could not be retrieved.** Both `https://www.perplexity.ai/publishers` and `https://www.perplexity.ai/hub/getting-started/perplexity-publishers-program` returned empty bodies. The only publisher-facing copy captured is the short `For website owners` section of the source-labels article and the *title* of `How does Perplexity follow robots.txt?`. Given the brief's emphasis on publisher relations, this is the largest gap in the file.
- **Legal pages not harvested.** Terms of Service and Privacy Policy (`/hub/legal/...`) were linked repeatedly but not fetched; T10 relies on the help centre's summaries of them.
- **Two blocked domains/paths:** `www.perplexity.ai` marketing root (SPA, empty body) and `www.perplexity.ai/publishers` + `/hub/*` (empty body). `status.perplexity.ai` fetched successfully after redirecting to `status.perplexity.com`.
- **Session-scoped fetch de-duplication** blocked direct re-fetch of two URLs mid-harvest; both were retrieved via equivalent `.md` or query-suffixed URLs and the content is from the live pages.
- **Help-article bodies read as served markdown/MDX**, which exposes component source (`<Accordion>`, `<Frame>`, `alt` attributes, the leaked build instruction). This gives unusually good visibility into alt text and structure, but means a small number of strings quoted here may render differently, or not at all, in the browser. The doubled `/help-center/help-center/` link paths in particular may be resolved by a rewrite rule not visible in the served source — recorded as a suspected defect rather than a confirmed broken link.
- **All in-product UI strings are `[documented]`, not `[observed]`.** Every field label, button, toggle, status, and toast in T5/T6/T7/T9 is quoted from a help article describing the UI. Perplexity's help authors are careful about bolding literal control names, so confidence is reasonably high, but none of it was seen live and several strings are demonstrably out of date elsewhere in the same corpus.
- **T8 is genuinely absent.** No empty states of any kind were reachable.
- **Six of sixteen help collections inspected.** `Perplexity Enterprise` (39 articles, the largest), `Connectors & Integrations` (22), `Account & Sign-In` (13), `Computer` (12), `Desktop App` (12), `Premium Data Sources` (11), `Comet` (9), `Mobile Apps` (5), `Perplexity API` (5), and `Promotions & Partnerships` (3) were not opened. Article titles from several of these appear via related-links blocks only.
- **en only.** The 11 locale nav payloads were read from the home page source (and one Hindi/Korean slug inconsistency recorded from them), but no non-English article body was fetched. Localised register is unassessed.
- **No accessibility statement found.** No VPAT, accessibility policy, or conformance page surfaced in any collection or in the status-page footer. T14's accessibility findings are derived from markup and alt attributes in the served source, not from a published commitment.
- **Prices are partial and single-sourced.** Max pricing appears only in the Model Council article; Pro and Free carry no price anywhere reachable. Any price in this file should be re-verified against the pricing page before use.
- **Model names and usage limits in this file are dated 2026-09-22 and are explicitly disclaimed as volatile by Perplexity itself.** They are recorded as evidence of a documentation-consistency problem, not as a reliable capability record.

## Sources

1. https://www.perplexity.ai/ (blocked — SPA, meta only)
2. https://www.perplexity.ai/help-center/llms.txt
3. https://www.perplexity.ai/help-center/en/index.md
4. https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity
5. https://www.perplexity.ai/help-center/en/articles/10354917-what-is-an-answer-engine-and-how-does-perplexity-work-as-one
6. https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work.md
7. https://www.perplexity.ai/help-center/en/articles/10352901-what-is-perplexity-pro
8. https://www.perplexity.ai/help-center/en/articles/11187416-which-perplexity-subscription-plan-is-right-for-you.md
9. https://www.perplexity.ai/help-center/en/articles/13838041-how-credits-work-on-perplexity
10. https://www.perplexity.ai/help-center/en/articles/10354919-what-advanced-ai-models-are-included-in-my-subscription
11. https://www.perplexity.ai/help-center/en/articles/13641704-what-is-model-council
12. https://www.perplexity.ai/help-center/en/articles/20260806-understanding-source-labels
13. https://www.perplexity.ai/help-center/en/articles/10354769-what-is-a-thread.md
14. https://www.perplexity.ai/help-center/en/articles/13837784-what-is-computer
15. https://www.perplexity.ai/help-center/en/articles/10354283-canceling-a-subscription.md
16. https://www.perplexity.ai/help-center/en/articles/11564572-data-collection-at-perplexity.md
17. https://www.perplexity.ai/help-center/en/articles/10354902-how-can-i-report-incorrect-or-inaccurate-answers.md
18. https://www.perplexity.ai/help-center/en/articles/10354884-cloudflare-vpns.md
19. https://www.perplexity.ai/help-center/en/collections/12702161-getting-started
20. https://www.perplexity.ai/help-center/en/collections/18799290-features.md
21. https://www.perplexity.ai/help-center/en/collections/18799291-ai-models-content-generation.md
22. https://www.perplexity.ai/help-center/en/collections/18799292-subscription-plans-billing.md
23. https://www.perplexity.ai/help-center/en/collections/18799294-privacy-data
24. https://www.perplexity.ai/help-center/en/collections/18799303-troubleshooting-support
25. https://status.perplexity.ai → https://status.perplexity.com
26. https://www.perplexity.ai/publishers (blocked — empty body)
27. https://www.perplexity.ai/hub/getting-started/perplexity-publishers-program (blocked — empty body)
