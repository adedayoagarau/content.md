# 134. Elevate

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Cognitive training app ("brain training") — skills-games subscription, sibling to a meditation app and a microlearning app under one parent |
| Primary URL | https://elevateapp.com/ → **301/302 to https://themindcompany.com/apps/elevate** (see Caveats) |
| Corpus rank | 134 |
| Benchmark strength (source list) | Performance feedback and goals |
| Locale / market observed | en-US (`og:locale: en_US`; help centre `en-us`) |
| Platform observed | Web marketing (Next.js, Contentful CMS) on parent domain; Zendesk help centre on `support.elevateapp.com` |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **The material context for this file.** Cognitive-training claims sit in the shadow of the FTC's 2016 action against Lumosity over unsupported cognitive-benefit claims (recorded here as external context, not as anything Elevate's own pages say). What Elevate's pages *do* carry: a `No Medical Advice` clause, a `Consumer Health Data` footer link on every page (Washington My Health My Data / consumer-health-data regimes), `Your Privacy Choices` (CCPA/CPRA), a `Notice for California Users` clause, an `AI Outputs Disclaimer`, mandatory individual arbitration with a class-action and jury-trial waiver (NAM, 30-day opt-out), California governing law, a one-year contractual limitations period, and a liability cap at the greater of six months' fees or $100. Auto-renewal subject to US negative-option rules. |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial — **no pricing is published anywhere** (`How much does a subscription to Elevate cost?` exists as a help title but was not fetched; the marketing site quotes no figure), the paywall and onboarding were not entered, and `elevateapp.com` no longer serves its own marketing site. Help-centre category and section indexes plus six article bodies were reachable in full. Terms & Conditions were extracted in full via subagent. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Product page (redirect target) | https://themindcompany.com/apps/elevate | Hero, `How it works`, three benefit blocks, award block. **Reached by redirect from `elevateapp.com`** |
| Parent apps overview | https://themindcompany.com/apps/overview | Three-app portfolio, the `Training that works` efficacy stat band |
| Parent help router | https://themindcompany.com/help | A three-button app selector — see T11 |
| Help centre home | https://support.elevateapp.com/hc/en-us | 7 categories + 8 promoted articles |
| Help: Using Elevate (category) | https://support.elevateapp.com/hc/en-us/categories/4402921324443-Using-Elevate | 4 sections, ~70 articles |
| Help: Membership (category) | https://support.elevateapp.com/hc/en-us/categories/4402921747995-Membership | 2 sections, 30 articles |
| Help: `What is Elevate?` | https://support.elevateapp.com/hc/en-us/articles/4402922583067-What-is-Elevate | The product definition + the core claim — T10 anchor |
| Help: `How do I use the app?` | https://support.elevateapp.com/hc/en-us/articles/4402924805275-How-do-I-use-the-app | Full tab-by-tab IA — T1/T4 anchor |
| Help: `What is EPQ and how is it calculated?` | https://support.elevateapp.com/hc/en-us/articles/4402971643803-What-is-EPQ-and-how-is-it-calculated | The scoring system — T6/T13 anchor |
| Help: `What's included in the free version vs. the upgraded version?` | https://support.elevateapp.com/hc/en-us/articles/4402930775835-... | Entitlement split |
| Help: `How does the 7-day free Elevate trial work?` | https://support.elevateapp.com/hc/en-us/articles/4402973198747-... | Trial terms — T10 anchor |
| Help: `How do I cancel my Elevate subscription?` | https://support.elevateapp.com/hc/en-us/articles/38342436482331-... | Three-channel cancellation — T10 anchor |
| Help: `What are Leagues?` | https://support.elevateapp.com/hc/en-us/articles/40412511351195-What-are-Leagues | Competitive mechanic + a substantial copy defect |
| Terms & Conditions | https://themindcompany.com/terms-and-conditions | Full extraction; `Last updated on: 6/29/2026` |

---

## T0 Domain finding — where Elevate actually lives

**Recorded first because it changes how every other section should be read.** `[observed]`

`https://elevateapp.com/` **redirects to `https://themindcompany.com/apps/elevate`**. The fetch returned `→ https://themindcompany.com/apps/elevate` with `canonical: https://themindcompany.com/apps/elevate`, an `og:site_name` of `The Mind Company`, and a page `<title>` of `Elevate Brain Training App | The Mind Company`.

Consequences for the harvest, all real:

- **Elevate has no marketing site of its own.** It is one of three sub-pages under a parent brand (`Elevate`, `Balance`, `Spark`, with a fourth app `Atlas` named only in the Terms).
- **The legal documents are the parent's, not Elevate's**: `themindcompany.com/terms-and-conditions`, `/privacy-policy`, `/consumer-health-data`. They cover all four apps jointly, which is why the `No Medical Advice` clause opens by describing stress and sleep — Balance's domain, not Elevate's (see T10).
- **`elevateapp.com` survives as a live subdomain host** for support: `support.elevateapp.com` is a Zendesk instance branded `Elevate Support`, running on `mindsnacks.zendesk.com` — **`MindSnacks` being the company's pre-2014 name**, still visible in every sign-in URL on the help centre. Three generations of corporate identity are simultaneously exposed to users: `MindSnacks` (infrastructure), `elevateapp.com` (support domain), `The Mind Company` (brand).
- The parent site's footer also ships a `Redirect Sitemap` link (`themindcompany.com/redirect-sitemap`) as a **public, user-facing nav item** — a migration artefact promoted to the footer of every page.

So the product surface is split across two domains with two different design systems, two different voices, and two different eras of branding. This is the single most important structural fact about Elevate's content.

## T1 Navigation & IA labels

**Parent-site global nav — four items, none of them the product** `[observed]`

`Home` · `Apps` · `Blog` · `About Us`

Elevate is reachable only via `Apps` → `Apps Overview` → `The Elevate App`, or by the redirect. A user who typed `elevateapp.com` lands on a page whose navigation does not contain the word "Elevate" anywhere in the primary bar. There is **no `Pricing`, no `Help`, and no `Log in`** in the global nav — the only CTA is `Try for free`.

**Parent footer — four groupings** `[observed]`

| Grouping | Items |
|---|---|
| `apps` | `Apps Overview` · `The Elevate App` · `The Balance App` · `The Spark App` |
| `resources` | `Blog` · `Help Center` · `Sitemap` · **`Redirect Sitemap`** |
| `company` | `About Us` · `Careers` · `Press Kit` |
| `download` | `Download Elevate` · `Download Balance` · `Download Spark` |

Note the **definite-article naming convention**: `The Elevate App`, `The Balance App`, `The Spark App`. Consistent, and it treats each app as a named entity rather than a feature. But it collides with the page headings, which use the bare name (`Elevate`, `Balance`, `Spark`) — two forms in the same footer/page pair.

`Press Kit` links to a **Google Drive folder** and `Careers` to `ats.rippling.com` — third-party destinations presented as first-party footer items with no external indicator.

**Legal row** `[observed]`: **`Privacy Policy & Accessibility`** (one link, two subjects) · `Terms & Conditions` · `Consumer Health Data` · `Your Privacy Choices`

**Bundling accessibility into the privacy policy link is a notable IA decision** and a weak one: a user looking for an accessibility statement has no reason to click "Privacy Policy", and the combined label suggests the accessibility content is a sub-section of a privacy document rather than a statement in its own right. Compare Blinkist, which ships a dedicated (if empty) `Accessibility` link — and Wise, which ships a real `Accessibility at Wise` article. Elevate's is the only one of the five products in this batch to *merge* the two.

`Consumer Health Data` as a first-class footer link on every page is, by contrast, a good and legally alert decision — it signals that the company treats mental-fitness data as health data under Washington-style regimes, without being asked to.

**Help-centre IA — seven flat categories** `[observed]`

`Using Elevate` · `My Profile` · `Membership` · `Game Instructions & Tips` · `Tech Support & Troubleshooting` · `Terms of Service` · `Contact Us`

All noun phrases, no scope lines (contrast Wise, where every category carries a comma-run of verbs). Two observations:

- **`Game Instructions & Tips` is a top-level category**, separate from `Using Elevate`. Per-game rules are given the same structural weight as the whole rest of the product. For a games product that is correct, and it implies substantial per-game content (40+ games).
- **`Terms of Service` and `Contact Us` are rendered as help *categories*** alongside functional ones. Treating a legal document and an escalation route as peers of `Membership` flattens the hierarchy but does make both findable from the index.

**Sections under `Using Elevate`** `[observed]`: `About Elevate` (17 articles) · `Using the Elevate App` (19) · **`Performance and Progress Tracking` (16)** · `How To Guides` (18)

`Performance and Progress Tracking` as a named 16-article section is the direct evidence for the corpus's stated benchmark strength. Sixteen articles explaining a scoring system is an unusual investment, and it tells you the system is not self-explanatory (see T6).

**Sections under `Membership`** `[observed]`: `Trials and Subscriptions` (13 articles) · `Billing Questions` (17 articles)

Thirty articles on money, seventeen of them classified as *problems* (`Billing Questions` contains `I can't access my paid subscription`, `How do I request a refund through the web (Stripe)?`, `How do I cancel a Stripe trial or subscription via the web?`, `How do I know if I'm on the free version or the paid version?`, `How do I cancel an iOS trial or subscription via the Apple Store?`). Note that **cancellation articles appear in both sections** — `How do I cancel my Elevate subscription?` under `Trials and Subscriptions`, and three platform-specific cancellation articles under `Billing Questions`. The same task is filed in two places under two different framings.

**In-app IA — five tabs, fully documented** `[observed]`, from `How do I use the app?`

| Tab | Contents (verbatim) |
|---|---|
| **`Today`** (landing) | "Your streak (top right corner)" · "All workouts" · "Daily puzzles" · "Recent and Favorite games" · "Words of the Day" |
| **`Leagues`** | "Weekly competitions where Elevate members are grouped to compete for the most XP (activity points)" |
| **`Quests`** | "Daily challenges to win rewards!" |
| **`Games`** | Organised by category: `Writing` · `Speaking` · `Reading` · `Math` · `Memory`. Plus a toggle: **`"Show Game Statistics."`** |
| **`Me`** | "This is where your performance and achievements live" — `Current streak` · `Current league` · `Total XP` · `EPQ and Rankings` · `Achievement badges` |

Plus two sub-surfaces reached from `Me`: **`Notifications`** (bell icon — "populates weekly reports and weekly reviews with a summary of your gameplay and tips on any incorrect answers") and **`Settings`** (gear icon).

`Today` as the landing tab name is a good choice — it names the scope of what you are expected to do, not the object you are looking at (compare `Home`, `Dashboard`, `Feed`). `Me` for the profile/stats tab is blunt and first-person, consistent with the possessive-domestic register also seen in Memrise (`My Words`, `My Activities`).

**Defect** `[observed]`: the article names the learning categories as `Writing · Speaking · Reading · Math · Memory` (five). `What is Elevate?` in the same help centre names "critical cognitive skills like **focus, memory, processing, math, precision, and comprehension**" (six, only two of which overlap). And the marketing page says "you'll strengthen **reading, writing, speaking, memory, and math**" (five, matching the tab) while the meta description says "**focus, memory, math, and reading** skills" (four). **Four different skill taxonomies for one product**, across three surfaces. For a product whose value proposition is *measuring* named skills, having four incompatible lists of what those skills are is the most consequential terminology defect in this file (see T13).

## T2 Value proposition & headline patterns

**Hero — eyebrow, then a four-word promise** `[observed]`

> Eyebrow: `Elevate`
> H1: `Brain training personalized for you`
> CTA: `Try for free`

Six words, no subhead, no number, no social proof above the fold. That is the leanest hero in this batch by a wide margin — Memrise, Headway, and Blinkist all ship a headline plus a qualifying subhead. The entire claim is `Brain training` + `personalized`. `personalized for you` is redundant (personalised for whom else?) but the redundancy is doing emphasis work.

**`How it works` — a single sentence, and the hedge is in it** `[observed]`

> H1: `How it works`
> Body: "Elevate strengthens your mind through **science-backed brain games**."

One sentence for the entire mechanism. `science-backed` is the load-bearing compound, and it is the only efficacy modifier on the page. Note what it modifies: **the games are science-backed**, not the outcomes. That is a deliberate and legally careful construction — see T10.

`strengthens your mind` is the boldest phrasing on the site, and it is unhedged.

**Three benefit blocks — imperative headings, capability bodies** `[observed]`

| Heading (verbatim) | Body (verbatim) |
|---|---|
| `Level up your skills` | "With 40+ games, you'll strengthen reading, writing, speaking, memory, and math." |
| `Stay sharp with puzzles` | "Solve daily puzzles designed to increase problem-solving skills and boost creativity." |
| `Understand your strengths` | "Elevate shows you where you excel, where you can grow, and **how you compare with others**." |

Three things to unpack.

**Block 2 contains the site's most careful hedge**: "puzzles **designed to** increase problem-solving skills and boost creativity." `designed to` attributes the intent to the artefact, not the result to the user. This is the same double-move as the Terms' `Services Description` ("games that are **designed to** train a variety of skills"). The construction appears wherever an outcome is claimed and is absent from the two blocks that claim only capability. That is not accidental.

**Block 3 is the benchmark-strength artefact**, and its three-part structure is the best content pattern on the site: `where you excel` / `where you can grow` / `how you compare with others`. Strength, growth area, and social comparison — stated in the user's frame, with the euphemism (`where you can grow` rather than "where you're weak") doing exactly the work it should. `Understand your strengths` as the heading, then a body that also covers weaknesses and ranking, is a **heading that under-promises relative to its body** — the inverse of the usual failure.

**Block 1's `Level up`** imports gaming vernacular, which is then literalised by the Leagues tier ladder (T4).

**Parent-site headlines — where the claims get stronger** `[observed]`

The parent `Apps Overview` page is where the unhedged claims live:

> H1: `Become calm, sharp, and knowledgeable` — "Discover our apps to strengthen your mind."
> Elevate card: `Elevate` — "Sharpen memory, vocab, math, and more in minutes a day."
> Section: `Personalized to grow with you` — "Each app adapts as you improve, helping you build **results that last**."
> Section: **`Training that works`** — "**Proven** to reduce stress, sharpen focus, and build skills"

`Training that works` and `Proven to...` are materially stronger than anything on the Elevate page itself, and they are the only place the word `Proven` appears. The escalation is one click up from the product page — i.e. **the claims get bolder as you move away from the product and toward the portfolio**, which is the opposite of where scrutiny usually lands. Recorded as a finding; the three percentages that follow are analysed in T10.

`in minutes a day` is the time-cost framing, matching the meta description's "in just minutes a day" — vaguer than Blinkist's `15 minutes` or Headway's `15 min`, and deliberately so: Elevate's session length is user-configurable (`How do I change my workout length?`).

**Award block — third-party credential as the proof device** `[observed]`

> `App of the Year` — "Chosen as Apple's App of the Year. Rated 4.8 stars by millions."
> CTA: `Learn more` → a blog post

Plus two award badges on the parent page (`Apple App of the Year`, `Google Editors' Choice`) and a third for Balance (`Google App of the Year`).

`Rated 4.8 stars by millions` is the only rating claim, and it is **unattributed to a store and uncounted** — "by millions" rather than "across 1.2M ratings". Compare Blinkist's pricing page (`4.76`, `96k ratings`, App Store) and Memrise's course page (`4.8`, `177k ratings`, App Store). Elevate's is the least auditable rating claim in the batch.

**`Get started today`** — "Mental fitness apps for every mind and mood" → `Learn more`. **`Mental fitness`** is the parent's umbrella positioning term, and it is doing careful work: it sits adjacent to "mental health" without claiming it, and it is the noun that lets one brand cover a brain-trainer and a meditation app. See T13.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Try for free` | Elevate page, hero and mid-page | The only conversion CTA on the product page. Points to `elevateapp.sng.link/...` — a **Singular attribution deeplink**, i.e. an app-store handoff, not a web signup |
| `Get started` | Parent footer, every page | → `/apps/overview`, i.e. **a CTA that leads to a product list, not to a product** |
| `Learn more` | Award block, `Get started today` block, each app card | **Bare `Learn more`, used four-plus times**, each to a different destination (a blog post, the apps overview, three app pages). Exactly the pattern Wise avoids |
| `Download Elevate` / `Download Balance` / `Download Spark` | Parent footer | Verb + object, correct |
| `Sign in` | Help centre, top right | Opens a Zendesk dialog on `mindsnacks.zendesk.com` (see T0), `title="Opens a dialog"` |
| `Home` | Help centre logo link | `title="Home"` |
| `See more` / `See all 13 articles` / `See all 17 articles` | Help section indexes | Count-bearing variants — good |
| `Your Privacy Choices` | Parent footer, with a privacy icon | CCPA control surfaced as a footer CTA |
| `Play` | In-game, after selecting a game | `[documented]` |
| `X` (top left) | In-game exit | `[documented]` — "tap on the 'X' in the top left corner of the screen" |
| `Show Game Statistics.` | Games tab toggle | `[documented]` — **the trailing full stop is inside the quoted UI label** in the help copy |
| `Cancel Subscription` | Apple path | `[documented]` — "tap on 'Cancel Subscription' **in red**" |
| `Cancel subscription` | Google path | `[documented]` — **lowercase `s`, same action, adjacent step list** |
| `Cancel service.` | Elevate web/Stripe path | `[documented]` — **a third label for the same action, and it is in-product** |
| `Continue` | Stripe cancellation, after reason selection | `[documented]` |
| `Account Status` | Settings row, Stripe cancellation path | `[documented]` |
| `Compete in Leagues` (toggle) | Settings → Leagues | `[documented]` |
| `League Updates` (toggle) | Settings → Push Notifications | `[documented]` |
| `Contact us` / `contact us` | Help articles, closing line | Two capitalisations |

**Observations, and they are unflattering.**

`Learn more` appears four-plus times on two pages with four different destinations and no object supplied by adjacent text in at least two cases. This is the bare-`Learn more` anti-pattern in its purest form.

More seriously: **the same destructive action has three different labels across three channels** — `Cancel Subscription` (Apple, red), `Cancel subscription` (Google, lowercase), `Cancel service.` (Elevate's own app). Two of those are Apple's and Google's strings and therefore outside Elevate's control; **`Cancel service.` is Elevate's own, and it is the odd one out.** A user who has read the marketing, bought a subscription, and gone looking for "cancel subscription" in the app will find a row called `Cancel service` under a row called `Account Status`. Naming your own cancellation control with a noun the rest of your product never uses (`service` appears nowhere else in user-facing copy; the Terms call it `Paid Subscriptions`) is a genuine findability defect in the one flow where findability is regulated.

And `Try for free` routing to an app-store deeplink means there is **no web product and no web trial** — the free trial is entirely store-mediated, which is why the trial terms are written around Apple's and Google's billing behaviour (T10).

## T4 Onboarding & getting-started

**PRIORITY-adjacent (the brief's priority for this product is T10, but the feedback loop is the benchmark strength).**

**Public onboarding copy is one sentence.** `[observed]`

> "Elevate strengthens your mind through science-backed brain games."

There is **no numbered how-it-works sequence anywhere on the marketing surface** — the only product in this batch without one. The three benefit blocks substitute for it. Onboarding proper is behind the app-store handoff and was not entered.

**Help documents two entry points** `[documented]`: `Where do I start?` and `How do I sign up for the free version?` (both unfetched titles), plus `How do I create an account?`, `How do I sign in with Google?` / `with Apple?` / `with Facebook?` — four auth routes documented separately.

**The daily loop, fully specified** `[documented]`, from `How do I use the app?`:

> "When you open the Elevate app, you'll land on the **Today tab**!"
> "**Tap any workout or puzzle to start playing**. Completing a full workout or one puzzle a day is enough to keep your streak alive!"

**The streak minimum is stated as an either/or with the cheaper option named second**: a full workout *or* one puzzle. That is the same barrier-lowering move as Headway's `3 minutes`, executed in one clause. And `workout length` is itself user-configurable (`How do I change my workout length?`), so the daily commitment has two independent dials.

**`workout` is the session unit.** `Daily workout`, `workout length`, `Workout calendar`, `personalized daily workouts` — a fitness metaphor carried consistently across help and marketing. From `What is Elevate?`:

> "Each day, you'll be provided with a **personalized training program** that adjusts over time to maximize results."
> Feature bullet: "**Personalized daily workouts** that include the skills you need most"
> Feature bullet: "**Workout calendar** to help you track your streaks and stay motivated"

`the skills you need most` is the personalisation claim, and it is the only place the selection criterion is stated.

**Four stacked engagement mechanics — the densest in this batch** `[documented]`

| Mechanic | Documented definition |
|---|---|
| **`streak`** | Kept alive by "a full workout or one puzzle a day". Has a **`streak freeze`** (`What is a streak freeze?`) |
| **`XP`** | "activity points" — the Leagues currency. Surfaced as `Total XP` on the `Me` tab |
| **`Leagues`** | "weekly competitions where Elevate members are grouped together to compete for the most XP" — seven tiers, weekly reset |
| **`Quests`** | "Daily challenges to win rewards!" — `Daily Quests` has its own article |
| **`Coins`** | `What are Coins?` — a second currency, article unfetched |
| **`Achievement badges`** | On the `Me` tab, alongside `Trophies earned` in the League profile |

Six named reward systems (streak, XP, Coins, badges, trophies, League tiers) plus EPQ and Rankings as the *measurement* layer. Elevate is running roughly twice the gamification surface of any other product in this batch, and it is doing so in a category where the marketing claim is cognitive improvement rather than engagement — a tension worth recording: the more the retention mechanic is a weekly XP competition, the less the `EPQ` score measures cognition rather than play frequency. Elevate's own copy concedes exactly this: EPQ "is based on game performance, **consistent training, and game variety**" (T6).

**Leagues — the mechanic, and a substantial copy defect** `[documented]`

> "Leagues are weekly competitions where Elevate members are grouped together to compete for the most XP (activity points). It's a fun and motivating way to challenge yourself alongside other Elevate learners."
> "The more XP you earn by playing games and solving puzzles, the higher you'll climb in your league's rankings. Each week, you'll be matched with a new group of competitors, **giving you a fresh chance to reach the top!**"

Seven tiers, stated lowest→highest: `Bronze → Silver → Gold → Sapphire → Ruby → Emerald → Diamond`. Weekly reset ("Leagues reset every Sunday. You'll see a countdown timer in the Leagues tab showing exactly when the week ends.").

Then the promotion/relegation table, and **this is where it breaks**. Verbatim:

| Tier | Advance | Relegate |
|---|---|---|
| `Bronze` | Top 15 → advance | Bottom 5 → **stay in Bronze** |
| `Silver` | Top 12 → advance | Bottom 4 → **stay in Bronze** |
| `Gold` | Top 10 → advance | Bottom 4 → **stay in Bronze** |
| `Sapphire & Ruby` | Top 7 → advance | Bottom 5 → **stay in Bronze** |
| `Emerald` | Top 5 → advance | Bottom 6 → **stay in Bronze** |
| `Diamond` | Top 10 → advance | Bottom 10 → **stay in Bronze** |

**"stay in Bronze" is repeated for all six tiers.** For Bronze it is correct. For the other five it is either a copy-paste error (the intended string is presumably "stay in Silver/Gold/…" or "drop a tier") or it means a Diamond player finishing in the bottom 10 is demoted **five tiers to Bronze** — which the word "stay" contradicts, since you cannot "stay" somewhere you are not.

And `Diamond` — the top tier — is given an `advance` rule (`Top 10 → advance`) with nowhere to advance to.

This is the clearest single content defect in the entire batch: a published rules table for a competitive system, governing relegation, that is unreadable as written. For a mechanic whose entire motivational premise is that the stakes are legible, it fails at the one thing it must do. Recorded in full because negative findings of this specificity are the most useful kind.

**Opt-out is documented, in four steps** `[documented]`

> "If you don't wish to participate in Leagues, you can opt out: Tap on Me → Tap Settings (gear in top corner) → Tap Leagues → **Toggle off Compete in Leagues**"

A dedicated article exists for it too (`How do I turn off Leagues?`). Shipping a competitive social mechanic **with a documented, named off switch** (`Compete in Leagues`) and a separate notification toggle (`League Updates`) is genuinely good practice — compare Memrise, which avoided the mechanic entirely, and Headway, which documents no notification controls at all.

**Anonymity is offered as a documented affordance** `[documented]`

> "To stay anonymous, remove your name entirely. **The app will automatically generate a random name for you!**"

Opt-out-of-identification inside a leaderboard, achieved by clearing a field, with the system supplying a pseudonym. The exclamation mark is misplaced — a privacy affordance does not need enthusiasm — but the affordance itself is strong, and the Terms corroborate it with a dedicated clause (`User Registration – League Participation and Data Visibility`) and a named contact for profile anonymisation (`support@elevateapp.com`).

**Session-end feedback** `[documented]`: the `Notifications` tab "populates **weekly reports and weekly reviews** with a summary of your gameplay and **tips on any incorrect answers**." The free tier includes "Weekly performance reports and content reviews **to go over any errors you may have missed**." So error review is a free-tier feature — the feedback loop is not paywalled, which is the right call for a product selling feedback.

## T5 Form & field labels

No public form exists — there is no web signup, no newsletter capture, no contact form on the marketing surface. Everything below is `[documented]`.

| Label / control | Surface | Notes |
|---|---|---|
| `Account Status` | Settings row | The row containing the cancellation control |
| `Cancel service.` | Under `Account Status` | See T3 — the third name for cancellation |
| Reason selector | Stripe cancellation, step 6 | "**Select the reason for canceling** and tap 'Continue.'" — a reason-capture step in the cancel flow |
| `Compete in Leagues` (toggle) | Settings → Leagues | |
| `League Updates` (toggle) | Settings → Push Notifications | |
| `Show Game Statistics.` (toggle) | Games tab | "Toggle this on to see your high score, difficulty level, and ranking for each individual game" |
| Name field | Settings → tap your name | "Tap on your name to edit… To stay anonymous, remove your name entirely." Requires an app restart: "Restart the app for the changes to update." |
| Workout length | Settings | `How do I change my workout length?` |
| `training goals` | Settings | Named in the settings inventory: "Personalize workout length, **training goals**, notifications, sound effects, and more" |
| Language | Settings | "Update your language" |

**The settings inventory is worth quoting whole** `[observed]` because it is the clearest statement of user control in the product:

> "View your subscription status and account information · Personalize workout length, training goals, notifications, sound effects, and more · Update your language · Contact Customer Support · Read our Terms of Service and Privacy Policy · Sign out or delete your account"

Six capabilities in one list, and **subscription status is first**. Putting billing visibility at the top of the settings description — rather than buried under "Account" — is correct for a subscription product and matches the help centre's `Where can I check my subscription status?` being a promoted article.

**The reason-capture step is the finding.** Step 6 of the Stripe cancellation is "Select the reason for canceling and tap 'Continue.'" then step 7 is "Tap 'Cancel service' **again**". So the documented web cancel flow is: `Me` → `Settings` → `Account Status` → `Cancel service` → reason selector → `Continue` → `Cancel service` again. **Seven steps, with a mandatory reason selection and a doubled confirmation of the same button label.** That is the most friction-laden cancellation path in this batch — Blinkist's web path is one step, Headway's is one step plus a login. Recorded in T10 as the principal compliance concern.

## T6 Status & state language

**PRIORITY-adjacent.** This is Elevate's richest category and the direct evidence for its benchmark strength. The vocabulary is dense, layered, and — unusually — the product publishes the mechanics.

**`EPQ` — the core metric, defined and bounded** `[observed]`, from `What is EPQ and how is it calculated?`:

> "EPQ stands for **Elevate Proficiency Quotient**. A proficiency quotient tracks your performance. EPQ ranges from **0-5000** and is based on **game performance, consistent training, and game variety**."
> "EPQ can **increase, decrease, or stay the same** depending on how your game scores compare to **your historic performance** and frequency of play. EPQ is **not just based on the individual game but on all games in the same category** (all games in the Writing category, for example)."

Four disclosures in two short paragraphs: the scale, the three inputs, the three possible directions of travel, and the comparison basis (your own history, not a population norm). The last is the important one — **EPQ is an intra-personal metric, not a normative one**, and the copy says so.

Then the six named bands, with explicit numeric ranges:

| Proficiency level | Range |
|---|---|
| `Novice` | [0-1,250] |
| `Intermediate` | [1,250-2,500] |
| `Advanced` | [2,500-3,750] |
| `Expert` | [3,750-4,250] |
| `Elite` | [4,250-4,750] |
| `Master` | [4,750-5,000] |

Note the **bands are not equal**: the first three are 1,250 wide, then 500, 500, 250. The scale compresses sharply at the top, so progression slows dramatically — a standard design choice, and publishing the boundaries makes it visible rather than mysterious. Note also the **overlapping bounds** (`[0-1,250]` and `[1,250-2,500]` both claim 1,250) — a small but real defect in a published specification.

`Elevate Proficiency Quotient` is a deliberate echo of "IQ" (see T13), and the gloss "A proficiency quotient tracks your performance" is doing work to defuse that: it says the thing measures *performance*, not intelligence.

**The parallel vocabularies — and there are four** `[observed]`

| Layer | Values | Where |
|---|---|---|
| `EPQ` | 0–5000 numeric | Per category |
| `proficiency levels` | `Novice` → `Intermediate` → `Advanced` → `Expert` → `Elite` → `Master` | Derived from EPQ |
| `rank` | **`Good`, `Great`, `Excellent`** | `What does a Good, Great, and Excellent rank mean?` |
| `Difficulty` | Separate from EPQ — `What is the difference between EPQ and Difficulty?` |
| `Rankings` | `What are Rankings?` — per-game, visible via `Show Game Statistics` |
| `League tier` | `Bronze` → … → `Diamond` | Weekly, XP-based |

**Six overlapping progress vocabularies.** A user has an EPQ, a proficiency level, a rank, a difficulty setting, a per-game ranking, and a league tier — plus a streak, XP, coins, badges, and trophies. The help centre needs a dedicated article to disambiguate two of them (`What is the difference between EPQ and Difficulty?`) and another to explain why one of them moves (`Why does my proficiency level keep changing?`). **Sixteen articles exist in `Performance and Progress Tracking` because the system requires sixteen articles to be intelligible.** That is the honest reading of the section size noted in T1.

Compare the alternatives in this batch: Memrise ships `Words learned` / `Words reviewed` / `Videos understood` / `Videos partly understood` — four plain counters, no derived scores. Blinkist ships a weekly goal and a streak. Elevate ships six scoring systems. Elevate's gives far more feedback; it also gives far more to misread.

**The negative-progress articles are the best thing here** `[observed]`

- **`Why am I losing EPQ?`**
- **`Why does my proficiency level keep changing?`**
- `I'm at the highest level for all categories. What should I do next?`

Shipping a `Why am I losing X?` article for your own primary metric is the right instinct and the direct analogue of Wise's "why" articles for adverse outcomes. A score that can go down will produce anxiety and support tickets; naming the question in the user's voice (`losing`, not "decreasing") and giving it a title is how you absorb that. The third article is a **terminal-state article** — what to do when the progression system has nothing left to offer — which almost no product ships.

**`hearts and lives remaining`** `[observed]`, from `What do hearts and lives remaining mean?` — an in-game failure-budget vocabulary borrowed wholesale from casual gaming, sitting inside a product that markets cognitive improvement. Two register systems in one product.

**Other named states** `[documented]`

| State | Copy / context |
|---|---|
| `Canceled` (Google) | "**If you don't see a cancellation option, but instead see "Canceled" in red**, as shown in the image below, your subscription has already been canceled." |
| Free vs paid | `How do I know if I'm on the free version or the paid version?` — a named diagnostic article for entitlement ambiguity |
| Auto-renew active | "Elevate subscriptions are set to auto-renew." |
| `on track` | — `[absent]`; Elevate has no mid-period progress state equivalent to Blinkist's `on track` |
| `streak freeze` | `What is a streak freeze?` — a named consumable that suspends streak loss |
| Weekly reset | "Leagues reset every Sunday. You'll see a countdown timer... showing exactly when the week ends." |

**The `"Canceled" in red` disclosure is excellent** and worth isolating. It tells the user how to recognise an *already-completed* cancellation by the absence of the control and the presence of a red label — with a screenshot. Users who cancel and then cannot find the cancel button reasonably conclude it failed and cancel again, or chargeback. Naming the success state's appearance, including its colour, pre-empts that. Directly transferable to any irreversible action whose confirmation is a changed label rather than a message.

## T7 Error, failure & recovery

`[documented]`. The category is `Tech Support & Troubleshooting` (a top-level help category), and the titles are mostly plain-symptom.

**Title shapes** `[observed]`

| Shape | Examples |
|---|---|
| First-person symptom | **`I can't access my paid subscription`** (a *promoted* article on the help home) |
| Bare symptom statement | **`No Sound Troubleshooting`** (promoted) · **`Elevate is taking up too much space.`** |
| Symptom question | **`Why am I not getting Math games?`** · `Why am I losing EPQ?` · `Why does my proficiency level keep changing?` |
| Location question | **`Where are Study Materials?`** (promoted) |
| Recovery task | `How do I restore purchases?` |

Two of the eight **promoted articles on the help home are failures** (`I can't access my paid subscription`, `No Sound Troubleshooting`) and a third is a can't-find (`Where are Study Materials?`). Promoting failures is the right triage decision (same as Blinkist's `Quick help`).

**`Why am I not getting Math games?`** is the standout title. It is a *content-delivery* complaint phrased as the user experiences it — not "How does game selection work?" but the specific noticed absence. For a product whose core loop is a personalised daily workout, "why isn't the app giving me the thing I want" is the predictable friction, and naming one category (`Math`) makes it findable.

**`Elevate is taking up too much space.`** — a device-resource complaint, with a terminal full stop, written as the user's grievance rather than as "Managing storage".

**`Where are Study Materials?`** — a findability article promoted to the front page, which implies the feature is hard to find. There is also `How to unlock Study Materials`, so `Study Materials` requires two articles: one to find it, one to unlock it. A feature needing a "where is it" *and* a "how to unlock it" article on the front page is a navigational and entitlement problem documented rather than fixed.

**The cancellation article's own recovery branch** `[observed]` — analysed in T6 (`"Canceled" in red`), and it closes with an escalation offer:

> "If you have any trouble canceling your subscription, please **contact us**, and we will be happy to assist you!"

Offering human help *for cancellation* is the right thing to do and the opposite of dark-pattern practice. It sits alongside a seven-step web cancel flow with a reason gate, so the article is simultaneously the best and worst cancellation content in the batch.

**Refunds are routed, not answered** `[documented]`: "If you would like to request a refund, please see the refund instructions **here**." → `Does Elevate offer refunds?` (unfetched). Note the article title is a **yes/no question** (`Does Elevate offer refunds?`) while a sibling is a **how-to** (`How do I request a refund?`) and a third is channel-specific (`How do I request a refund through the web (Stripe)?`). Three refund articles, three grammars.

**Not found** `[absent]`: no validation copy, no error titles from inside games, no 404 copy, no offline-state copy, no payment-decline article surfaced in the indexes fetched (contrast Memrise's detailed decline diagnostic).

## T8 Empty states

`[absent]` — no empty-state copy is reachable publicly and none is quoted in the harvested articles. The nearest adjacents are:

- **`I'm at the highest level for all categories. What should I do next?`** `[observed]` — a *terminal-state* article title, which is the ceiling-state analogue of an empty state. The system has run out of progression and the help centre acknowledges it.
- `Why am I not getting Math games?` — a missing-content state, documented as a question rather than as in-product copy.

Both are help titles, not UI strings. Would require an authenticated pass.

## T9 Notifications & system messages

`[documented]` unless noted.

- **`Notifications` is an in-app tab, not just a push channel** — reached via the bell icon on `Me`. It "populates **weekly reports and weekly reviews** with a summary of your gameplay and **tips on any incorrect answers**." So Elevate maintains an in-product inbox of performance feedback. That is a stronger version of the feedback loop than a push notification, because the content persists and is reviewable.
- **Weekly performance reports are free-tier** `[observed]`: "Weekly performance reports and content reviews to go over any errors you may have missed." Feedback is not paywalled.
- **`League Updates`** — a named, separately-toggleable push category. Four documented steps to turn off. Granular notification categories with named toggles is better practice than a single on/off, and better than Memrise (OS-level only) or Headway (no documented control).
- **League countdown timer** — "You'll see a countdown timer in the Leagues tab showing exactly when the week ends." A persistent in-app deadline display rather than an interruptive alert.
- **`Elevate Widgets`** — an article title; ambient home-screen surface.
- **`Words of the Day`** — a daily content slot on the `Today` tab, functioning as a return trigger.
- **`Daily Quests`** — "Daily challenges to win rewards!"
- **Price-change notice** `[observed]`, Terms, `Fee Changes:` — a clause exists; its notice mechanism was not extracted in detail.
- **Cancellation confirmation is a state change, not a message** — see T6. The Terms corroborate: "Once you have cancelled your Paid Subscription **and received confirmation**, no other changes can be made to your account." So a confirmation is sent, but its copy is unobserved.

**Trial-ending reminder** `[absent]` — **no commitment to notify a user before the 7-day trial converts** appears anywhere in the harvested copy, marketing or legal. As with Headway and Blinkist, the retention nudges are numerous and documented (League updates, Quests, Words of the Day, widgets, countdown timers) while the billing nudge is neither promised nor documented. Across all three subscription products in this batch, **the asymmetry is total**: every product commits to reminding you to come back, none commits to reminding you before it charges you.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** Two things to assess: the cognitive-benefit claim posture, and the subscription/cancellation posture.

### Part A — Cognitive-training claims: what the site actually says

**Recorded factually from the pages. No external evidence is asserted here, and no judgement is offered on whether any claim is supported.**

**The claims, in ascending strength, with their exact location:**

| # | Claim (verbatim) | Location | Hedge present? |
|---|---|---|---|
| 1 | "games that are **designed to** train a variety of skills, improve general world-knowledge" | Terms, `Services Description` | **Double hedge** — "designed to allow users to play games that are designed to train" |
| 2 | "puzzles **designed to** increase problem-solving skills and boost creativity" | Elevate page, benefit block 2 | `designed to` |
| 3 | "Elevate strengthens your mind through **science-backed brain games**" | Elevate page, `How it works` | `science-backed` modifies **the games**, not the outcome |
| 4 | "you'll **strengthen** reading, writing, speaking, memory, and math" | Elevate page, benefit block 1 | None |
| 5 | "Build focus, memory, math, and reading skills in just minutes a day" | Elevate page, meta description | None |
| 6 | "The more you train with Elevate, the more you'll **improve cognitive skills critical to boosting productivity, aptitude, and self-confidence**" | Help, `What is Elevate?` | Conditional on frequency only |
| 7 | "helping you build **results that last**" | Parent, `Personalized to grow with you` | None |
| 8 | **`Training that works`** — "**Proven** to reduce stress, sharpen focus, and build skills" | Parent, `Apps Overview` | None |
| 9 | **93%** "of Elevate users feel mentally sharper" | Parent, `Apps Overview` | See below |
| 10 | **90%** "of Elevate users improved their vocabulary" | Parent, `Apps Overview` | See below |
| 11 | **95%** "of Balance users feel less stressed" | Parent, `Apps Overview` | See below |

**Analysis.**

**The hedging is real but inconsistent, and it degrades with distance from the product page.** Claims 1–3 are carefully constructed: `designed to` attributes intent to the artefact, and `science-backed brain games` locates the science in the *design of the games* rather than in the outcomes for the user. That is a defensible construction. Claim 6, in the help centre, is the strongest product-linked statement — "the more you train... the more you'll improve cognitive skills critical to boosting productivity, aptitude, and self-confidence" — and it is conditional on training frequency but not otherwise bounded. Claims 7 and 8, on the parent portfolio page, are **unhedged and use the word `Proven`**.

So the strongest, least-hedged claims are one click *away* from the product, on a page about the portfolio. `Training that works` / `Proven to reduce stress, sharpen focus, and build skills` is the boldest sentence in this file and it carries no qualifier, no asterisk, and no source.

**The three percentages carry NO footnote, NO source note, NO methodology, and NO n.** `[observed]` This is the most significant finding in this section. Compare the same construction elsewhere in this batch:

- **Blinkist** publishes `95% / 91% / 87%` with an asterisk on each and a footnote: "* Based on internal study using survey data from general Blinkist customers." Study type, instrument, and population all disclosed.
- **Elevate's parent** publishes `93% / 95% / 90%` with **nothing**.

Two of the three Elevate/Balance figures are self-report by their wording (`feel mentally sharper`, `feel less stressed`) — and `feel` is doing legitimate hedging work inside the claim itself, which is the right instinct. But **`90% of Elevate users improved their vocabulary` is not a feeling claim.** It asserts a measured outcome, in the past tense, with a percentage, unsourced, under a heading that says `Proven`. Of every string harvested across these five products, this is the one that would most benefit from a footnote and does not have one.

**Where research citations appear: nowhere.** `[absent]` Across the Elevate product page, the parent apps overview, the parent home page nav, the help centre categories fetched, and the **full Terms & Conditions**, there is:
- no named study, author, journal, university, or date
- no mention of clinical validation, peer review, or neuroscience
- no "results may vary", no limitations statement, no efficacy disclaimer
- no link to a research page (contrast Headway, which ships a whole `/science/` page with an email-gated preprint — thin evidence, but a surface)

The Terms are notably bare of it: the subagent extraction confirms the document "contains no mention of studies, research, clinical validation, peer review, neuroscience, scientists, universities, or evidence of efficacy — neither a claim nor a disclaimer of one," and that the phrase "brain training" **does not appear in the Terms at all** — the closest wording is `train a variety of skills`. So the marketing says `brain training` and `science-backed`; the binding document says neither.

**The disclaimers that DO exist, and what they cover** `[observed]`

Elevate's parent ships four relevant clauses, and the interesting thing is that **none of them disclaims cognitive efficacy directly.**

1. **`No Medical Advice`** — the full clause:
   > "We provide the Services to help reduce your stress and improve your sleep and quality of life. You acknowledge and agree that (1) information available through the Services is provided for general educational purposes only, (2) the Services are not intended to diagnose, treat, cure, or prevent any disease, and (3) we do not provide medical or mental health advice or mental or behavioral health services through the Services. If you have any medical or health-related questions or if you experience a medical emergency, please call 911 or consult with a medical or mental health professional as soon as possible. We are not responsible for any health (including mental or behavioral health) or medical problems that may result from your use of the Services. You agree that you are voluntarily participating in the Services and do so at your own risk."

   **Note the mismatch**: the clause opens by describing **stress and sleep** — Balance's territory, not Elevate's. A single multi-app clause has been written around the meditation product, so an Elevate user reading the medical disclaimer finds it describing benefits their app does not claim. And `general educational purposes only` is the closest the document comes to bounding cognitive claims — it does so by reclassifying the content as educational rather than by disclaiming improvement.

2. **`Services Description`** (in `Access and Use of the Service`):
   > "The Services are not designed to diagnose, treat, mitigate or cure any disease, physical or mental health condition and are not a substitute for medical advice or the advice of a mental or behavioral health professional. Some Services may be powered, in whole or part, by artificial intelligence tools."

3. **`AI Outputs Disclaimer`** — "AI Outputs may be inaccurate, incomplete, misleading or otherwise unsuitable for a particular purpose"; "The Mind Company makes no representations or warranties regarding the AI Outputs, including that the AI Outputs will be unique, non-infringing or free from third-party claims, errors, biases, **hallucinations** or other defects"; and AI outputs "do not constitute medical or mental or behavioral health advice." **A named, dedicated AI clause is better practice than Blinkist, which ships `Blinkist AI` with no public accuracy disclosure at all.**

4. **`Disclaimer of Warranties`** — all caps, and item (IV) is the only text in the corpus that touches results:
   > "THE MIND COMPANY MAKES NO WARRANTY THAT ... **(IV) THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL BE ACCURATE OR RELIABLE**"

   Plus "YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK."

**The gap, stated plainly:** the public surface claims `Proven`, `results that last`, `improve cognitive skills`, and `90% ... improved their vocabulary`; the binding document disclaims medical purpose and warrants nothing about results, but **nowhere connects the two.** There is no sentence anywhere that says, in substance, "individual results vary" or "cognitive-training benefits may not transfer to everyday tasks." Whether that matters legally is outside this file's scope. As a content-design observation it is the defining feature of Elevate's claim architecture: **careful verb choice on the product page, unhedged superlatives one level up, no evidence surface, and disclaimers aimed at medical and AI risk rather than at efficacy.**

**One further note, on internal candour.** Elevate's own help centre undercuts the strongest reading of EPQ: the score "is based on game performance, **consistent training, and game variety**" and moves relative to "**your historic performance** and frequency of play." So by the product's own account, EPQ partly measures how often and how variously you play. That is honest, it is in the right place (the article explaining the metric), and it is the best-hedged sentence Elevate has written. It is also invisible from the marketing surface, where the score is implied to measure the mind.

### Part B — Subscription, trial, auto-renewal, cancellation

**Trial: 7 days, auto-converting to annual, with a 24-hour warning and a named reason** `[observed]`, from `How does the 7-day free Elevate trial work?` — quoted nearly whole because it is short and unusually direct:

> "When you start a 7-day trial, you get access to all Elevate games and features free for 7 days.
> After the free trial period, **your account will auto-renew into an annual subscription and you will be charged.**
> If you do not wish to enter into a subscription you will need to **turn off auto-renewal at least 24 hours before the 7th day, as both Apple and Google start to withdraw the funds for a purchase 24 hours before a trial renews.**"

Four things this does well, and they are worth crediting:
- States the **destination plan** (`annual`, not "a paid plan") — a user knows they are being enrolled in a year, not a month.
- Says **"and you will be charged"** flatly. No "your subscription will continue", no euphemism.
- Gives the **24-hour deadline**.
- **Explains why the deadline exists**, and attributes it correctly: "as both Apple and Google start to withdraw the funds for a purchase 24 hours before a trial renews." A deadline with a reason is a deadline users remember and do not dispute.

That last clause is the single best-constructed compliance sentence in this batch. Compare Blinkist, which states 24 hours in help and `anytime` on the pricing card with no explanation, and Headway, which states 24 hours on three pages and omits it on the fourth. **Elevate states it once, consistently, and justifies it.**

**Terms, `Free Trials:`** `[observed]` — corroborates and adds:
> "In order to sign up for a Free Trial, you may need to provide us with your preferred Payment Method. As soon as you submit your payment details, your Free Trial will begin. **You will not be charged until 24 hours prior to the Free Trial expiry.**"
> "**Unless you cancel at least 24 hours before the end of the Free Trial, your access to the Paid Subscription will automatically continue and you will be billed the applicable fees**" *(bold in the original)*
> "All incurred charges are final and **non-refundable, except at our sole discretion**."
> "Once you have cancelled your Free Trial and received confirmation, **you cannot resume the Free Trial even if it was not used for the entire duration**."
> "**Paid Subscription features and content may change at any time, and we cannot guarantee any specific feature or content will be available for the entire Free Trial.**"
> "You may not sign up for more than one Free Trial of a given Paid Subscription at the same time"

The auto-conversion sentence is **bolded in the source document** — an affirmative emphasis choice on the most consequential clause, which is good practice. And `Discount, Coupon or Gift Codes:` adds the same duty for promo periods: "**It is also your responsibility to terminate the Paid Subscription before the end of a free or discounted period** if you do not want to continue with a Paid Subscription at the regular price."

**Auto-renewal** `[observed]`, Terms, `Payment Terms:`
> "all fees due for the Paid Subscriptions are payable **in advance**, and will be billed **automatically** to the Payment Method at the start of the monthly or annual Paid Subscription period... Paid Subscriptions will **auto-renew until you elect to cancel** your access to Paid Subscriptions. **All purchases of Paid Subscriptions are final and non-refundable, except at our sole discretion** and in accordance with the rules governing each Paid Subscription."
> "You expressly authorize us to collect via **automatic debit or ACH** from your Payment Method"

And in `Termination or Cancellation of Paid Subscriptions:`
> "You can manage your Paid Subscription, cancel it, or turn off automatic renewals through your Apple App Store, Google Play Store account, or **Stripe Subscription Management Portal**. If you choose to cancel your Paid Subscription, **it will remain active until the end of your current subscription period**. Please note that **uninstalling a Service will not cancel your Paid Subscription**."
> "The cancellation of a Paid Subscription will go into effect at the end of your current billing cycle... **For example, if you are billed on a monthly basis and cancel during a given month, you will be charged for the entirety of that month and maintain access to the Paid Subscription through the end of that month.**"

Two good moves: the **uninstall-does-not-cancel** warning (present in all three subscription products in this batch — it is now a category standard) and a **worked example** of the billing-cycle rule. A concrete "if you are billed monthly and cancel mid-month, you will be charged for that month" removes the ambiguity that a rule statement leaves.

**Refunds: no guarantee, discretionary only** `[observed]`. `final and non-refundable, except at our sole discretion` appears **three times** (Paid Subscriptions, Virtual Items, Free Trial charges). Help ships three refund articles (`Does Elevate offer refunds?`, `How do I request a refund?`, `How do I request a refund through the web (Stripe)?`) but the binding position is discretionary. **This is the weakest refund posture in the batch**: Blinkist publishes a 14-day money-back guarantee with named exclusions; Headway is discretionary-for-web but store-mediated otherwise; Elevate is discretionary across the board with `sole discretion` stated three times.

**The cancellation paths — and the friction asymmetry** `[documented]`

| Channel | Steps | Reason gate? | Confirmations |
|---|---|---|---|
| Apple App Store | **5** — Settings → Apple ID → Subscriptions → Elevate → `Cancel Subscription` (in red) | No | 1 |
| Google Play | **5** — Play Store → profile icon → Payments & Subscriptions → Subscriptions → Elevate → `Cancel subscription` | No | 1 |
| **Elevate app (Stripe/web)** | **7** — Open Elevate → `Me` → `Settings` (gear) → `Account Status` → `Cancel service.` → **select reason** → `Continue` → `Cancel service` **again** | **Yes, mandatory** | **2** |

The store paths are Apple's and Google's and Elevate cannot change them. **The path Elevate controls is the longest, the only one with a mandatory reason selection, and the only one requiring the user to press the same button twice.** It is also the only one whose control is named something other than "cancel subscription" (`Cancel service.`, under `Account Status`).

Recorded as the principal compliance concern for this product. Compare Blinkist: `Cancel Subscription` in the footer of every page, and a one-step web path ("in your account settings", with a direct link). The contrast between the two is the sharpest self-service-cancellation comparison available in this batch.

Mitigating factors, recorded fairly:
- The article **opens with the plain statement of fact**: "Elevate subscriptions are set to auto-renew. To disable auto-renewal, please follow the instructions below, based on the platform you used to purchase."
- It includes a **channel-diagnostic branch**: "If you don't see your subscription listed under Apple or Google, it's possible you subscribed via the web (Stripe)."
- It tells you **how to recognise an already-cancelled subscription** (`"Canceled" in red`, with a screenshot) — genuinely good (T6).
- It **offers human help for cancelling**: "If you have any trouble canceling your subscription, please contact us, and we will be happy to assist you!"
- The help centre exposes **four** cancellation routes as separate findable articles, including `How do I cancel a Stripe trial or subscription via the web?` and `How do I cancel an iOS trial or subscription via the Apple Store?` — so findability in *help* is good even where findability *in product* is not.

**No price is published anywhere.** `[observed]` The marketing surface quotes no figure. `How much does a subscription to Elevate cost?` exists as a help article and was not fetched. `How can I purchase a subscription outside of Google or Apple?`, `How can I purchase a monthly or lifetime subscription?`, and `Can I switch from an annual to monthly subscription?` establish that **monthly, annual, and lifetime** plans exist, and `Do you offer a Family Plan?` and `Can I gift Elevate?` exist as questions. `Lifetime Subscription Terms and Conditions` is a named Terms clause, with a striking duration definition:

> "your membership will last until the earlier of **99 years** or for as long as we continue to offer the components of the Services for which you have purchased a Lifetime Subscription..."
> "**We make no warranties as to the expected duration of access to the Lifetime Subscription.**"

`99 years` as the upper bound on "lifetime", with an explicit no-warranty on duration. Honest, and the kind of disclosure that only appears when someone has thought about the word "lifetime" adversarially.

**Virtual currency is a purchasable good with its own terms** `[observed]`: a `Virtual Items:` clause — "all fees due for the Virtual Items are payable in advance and will be billed automatically... All purchases of Virtual Items are final and non-refundable, except at our sole discretion." So `Coins` are monetised. A cognitive-training product selling a non-refundable in-app currency is worth flagging: it is a mechanic imported from mobile gaming into a category that markets itself on measurable self-improvement.

**Dispute resolution — the most restrictive in this batch** `[observed]`

An all-caps `IMPORTANT NOTICE REGARDING ARBITRATION AGREEMENT` in the opening section, then a full dedicated section: `DISPUTE RESOLUTION: BINDING INDIVIDUAL ARBITRATION; CLASS ACTION & JURY TRIAL WAIVER ("ARBITRATION AGREEMENT")`, with sub-clauses `Mandatory Binding Arbitration of Disputes`, `Class Action/Jury Trial Waiver`, `Opt-Out Procedures`, `Rules & Procedures`, `Mass Arbitration`, `Arbitration Costs`, `Changes to Arbitration Agreement`, `Survival of Arbitration Agreement`, `Prevailing Party Attorneys' Fees and Costs.`

- Administrator: **NAM** (National Arbitration and Mediation); FAA applies; venue San Francisco / user's county / remote
- **30-day opt-out** by post (2261 Market Street, Suite 86627, San Francisco, CA 94114) or email (`privacy@themindcompany.com`)
- **Mass-arbitration batching** (20+ coordinated demands → NAM Mass Filing Supplemental Rules, batches of 20)
- **Prevailing-party fee shifting**
- Class-action waiver is **non-severable** (if unenforceable, the whole arbitration agreement is void)
- Governing law: **California**; exclusive jurisdiction San Francisco County for non-arbitrable disputes
- **One-year contractual limitations period**
- **Liability cap**: greater of six months' fees paid or **$100**
- Carve-outs: small claims; injunctive relief for IP

Notable that the opt-out is genuinely available and given its own named sub-clause with two contact methods and a 30-day window — the disclosure quality is high even though the terms are restrictive.

**Change-of-terms notice** `[observed]`: **14 days**, "except changes for new functions or required by law, which are effective immediately." A stated notice period is better than most.

**Age** `[observed]`: "If you are under 18 years old, you may use the Services only with the approval of your parent or guardian, **with the exception of Atlas which is not available to users under 18 years of age**." Help ships `Is Elevate suitable for all ages?` as a question.

**`Atlas` — a fourth app named only in the Terms** `[observed]`. The Terms govern "The Elevate, Balance, Spark, **and Atlas** Services" and note Atlas is also web-based and 18+. Atlas appears in **no footer link, no nav item, and no download link.** Either an unlaunched or unannounced product whose terms shipped early, or a B2B/internal surface. Recorded as a finding: the binding document covers a product the user cannot find.

**Terms last updated** `[observed]`: `Last updated on: 6/29/2026`.

## T11 Help-centre architecture

**Two-domain, three-hop routing — and the first hop is a chooser** `[observed]`

The parent help page (`themindcompany.com/help`) is not a help centre. It is a **router**:

> H2: `How can we help?`
> Body: `Select an app to open its support center.`
> Three buttons: `Elevate` · `Balance` · `Spark`

Each leads to a separate Zendesk instance (`support.elevateapp.com`, `support.balanceapp.com`, `support.playsparkapp.com`). So the full path from a product page to an answer is: product page → footer `Help Center` → app chooser → Zendesk home → category → section → article. **Six hops.** And the chooser lists three apps while the Terms govern four.

`Select an app to open its support center.` is at least explicit about what the page is for — a one-line instruction where most routers ship nothing. But an app-selection gate is only necessary because the company shares a domain and not a help system.

**Zendesk help centre — three levels, 7 categories → sections → articles** `[observed]`

Breadcrumbs are numbered and complete on every page: `1. Elevate Support` → `2. Using Elevate` → `3. Performance and Progress Tracking`. Article pages also render an **`Articles in this section`** sidebar listing ~10 siblings plus `See more`, and a **`Related articles`** block of five at the foot. So lateral discovery is strong even though the hierarchy is deep.

**Category and section inventory** — see T1. The signal in the shape:

| Category | Sections | Article count |
|---|---|---|
| `Using Elevate` | `About Elevate` (17) · `Using the Elevate App` (19) · `Performance and Progress Tracking` (16) · `How To Guides` (18) | ~70 |
| `Membership` | `Trials and Subscriptions` (13) · `Billing Questions` (17) | 30 |
| `My Profile` | — | not fetched |
| `Game Instructions & Tips` | — | not fetched |
| `Tech Support & Troubleshooting` | — | not fetched |
| `Terms of Service` | — | not fetched |
| `Contact Us` | — | not fetched |

**`Performance and Progress Tracking` at 16 articles is the tell** (T6): a scoring system requiring sixteen explanatory articles is a scoring system that is not self-evident. **`Billing Questions` at 17 articles is the other tell**: more articles about billing problems than about how to subscribe.

**Promoted articles on the help home — the triage set** `[observed]`

| # | Article (verbatim) |
|---|---|
| 1 | `What are Leagues?` |
| 2 | `How do I use the app?` |
| 3 | `What's included in the free version vs. the upgraded version?` |
| 4 | `What is EPQ and how is it calculated?` |
| 5 | `Where can I check my subscription status?` |
| 6 | `I can't access my paid subscription` |
| 7 | `Where are Study Materials?` |
| 8 | `No Sound Troubleshooting` |

Eight items: one new-feature explainer (Leagues, promoted first — a recency signal), one orientation, one entitlement, one metric, one billing-status, one billing-failure, one findability, one technical failure. **Three of eight are failures or can't-finds.** A good, honest triage shelf. Note `What are Leagues?` in position one: the newest mechanic gets the top slot, which is a product-marketing decision inside a support surface.

**Article-title grammar — six shapes** `[observed]`

| Shape | Examples |
|---|---|
| `What is/are …?` | `What is Elevate?` · `What are Leagues?` · `What is EPQ and how is it calculated?` · `What are Coins?` · `What are proficiency levels?` · `What are Rankings?` · `What is Difficulty?` · `What is a streak freeze?` |
| `How do I …?` / `How can I …?` | `How do I cancel my Elevate subscription?` · `How do I change my workout length?` · `How can I purchase a subscription outside of Google or Apple?` |
| `Where …?` | `Where do I start?` · `Where can I download Elevate?` · `Where can I check my subscription status?` · `Where are Study Materials?` |
| `Why …?` | `Why am I losing EPQ?` · `Why does my proficiency level keep changing?` · `Why am I not getting Math games?` |
| `Can I …?` / `Do you …?` | `Can I use Elevate on my computer?` · `Can I log in on more than one device?` · `Can I gift Elevate?` · `Do you offer a Family Plan?` · `Does Elevate offer refunds?` |
| Bare noun / statement | `Daily Quests` · `Elevate Widgets` · `Words of the Day` · `No Sound Troubleshooting` · `Elevate is taking up too much space.` · `How to unlock Study Materials` |

The `Where …?` shape is unusually well-used — four articles, and three of them are about *finding* something (`Where do I start?`, `Where can I check my subscription status?`, `Where are Study Materials?`) rather than about a location in the world. For a five-tab app with six progress vocabularies, "where is the thing" is the predictable question and Elevate has titled for it.

`What is the difference between EPQ and Difficulty?` is the standout title: a **disambiguation article for two of the product's own metrics.** Products rarely admit their vocabulary is confusable; naming the confusion is the right response when you cannot rename the metrics.

`I'm at the highest level for all categories. What should I do next?` — a two-sentence title, statement then question, same shape as Headway's `I have a busy schedule. Will Headway work for me?`. Both let the user self-identify before reading.

**Routing furniture** `[observed]`: category index → section → article + `Articles in this section` sidebar + `Related articles`. Escalation is a **top-level category** (`Contact Us`) and is also offered inline at the foot of individual articles ("please contact us, and we will be happy to assist you!"). `Sign in` is offered but leads to `mindsnacks.zendesk.com` (T0) — a domain a user has no reason to trust.

**`Terms of Service` as a help category** `[observed]` — legal documents surfaced as browsable help rather than only as a footer link. Findable, though it means the ToS is discoverable in two places with potentially different versions (the Zendesk copy versus `themindcompany.com/terms-and-conditions`). Not verified whether they match.

## T12 FAQs

**`[absent]` on the marketing surface.** Neither the Elevate product page nor the parent apps overview nor the parent help router carries an embedded FAQ block. **Elevate is the only product in this batch with no marketing FAQ** — Memrise has three blocks, Headway four, Blinkist two.

The consequence is structural: every question a prospective buyer might have — what it costs, whether it works, how to cancel, what the free version includes — is answerable **only after leaving the marketing site for a Zendesk instance on a different domain.** The marketing page has one CTA (`Try for free` → app store) and no objection-handling content whatsoever.

The functional FAQ is therefore the help centre's promoted-article shelf (T11) and the `About Elevate` section (17 articles), which does the job a marketing FAQ usually does:

| Article (verbatim) — `About Elevate` section |
|---|
| `How do I use the app?` |
| `What's included in the free version vs. the upgraded version?` |
| `What is Elevate?` |
| `Where can I download Elevate?` |
| `Where do I start?` |
| `What are the compatibility requirements for Elevate?` |
| `Can I use Elevate on my computer?` |
| `What languages can I play Elevate in?` |
| `Is Elevate suitable for all ages?` |
| `How many games do you offer?` |
| *(+7 more)* |

Note `Is Elevate suitable for all ages?` — an audience-suitability question in a cognitive-training product, which is the closest thing in the corpus to a question about who the efficacy claims apply to. Unfetched.

**Recorded as a gap, not a defect** — it is a legitimate strategy for a store-distributed app whose conversion happens on the App Store page (where Apple supplies a description, a rating, and reviews). But it means Elevate publishes **no public answer to "does this work?" at the point of decision**, which given Part A of T10 is the most consequential absence in this file.

## T13 Terminology & glossary

**PRIORITY SECTION.** Elevate coins more than any other product in this batch, and the coinages come from three incompatible vocabularies: **clinical-psychometric** (`Proficiency Quotient`), **fitness** (`workout`, `training`), and **casual gaming** (`XP`, `Coins`, `Leagues`, `hearts and lives`, `Quests`).

| Term | Elevate's usage | The alternative it rejected / note |
|---|---|---|
| **`EPQ` / `Elevate Proficiency Quotient`** | 0–5000 score per skill category, from "game performance, consistent training, and game variety" | **A deliberate echo of `IQ`.** "Quotient" is a psychometric word with no mathematical meaning here (nothing is divided). The gloss — "A proficiency quotient tracks your **performance**" — immediately reframes it away from intelligence toward performance. The most rhetorically loaded coinage in the batch, and the most carefully defused |
| **`proficiency levels`** | Six bands: `Novice` · `Intermediate` · `Advanced` · `Expert` · `Elite` · `Master` | `Beginner`→`Pro`. Note the ladder switches register at the top: the first four are educational/CEFR-flavoured, `Elite` and `Master` are gaming |
| **`rank`** | `Good` · `Great` · `Excellent` | A third evaluative scale, adjective-based, per-performance rather than per-score |
| **`Difficulty`** | A separate adaptive dimension, needing an article to distinguish it from EPQ | `Level`. The collision with `proficiency levels` is exactly why the disambiguation article exists |
| **`Rankings`** | Per-game standing, exposed by `Show Game Statistics` | Fourth evaluative vocabulary |
| **`workout`** | The session unit. `daily workout`, `workout length`, `Workout calendar`, `personalized daily workouts` | `session`, `lesson`, `practice`. The fitness metaphor is the product's spine and is carried consistently |
| **`training`** | The activity. "The more you **train** with Elevate"; `training goals`; `Training that works` | `practice`, `study`. Note `training` is also the word in `brain training`, so it does double duty as activity and category |
| **`brain training`** | The category, in the H1 and the page title | `cognitive training`, `brain games`. **Absent from the Terms entirely** (T10) |
| **`mental fitness`** | The parent's umbrella: "Mental fitness apps for every mind and mood" | `mental health`, `wellness`. Sits adjacent to "mental health" without claiming it — the single most consequential word choice on the parent site |
| **`brain games`** | The artefact, in the one-sentence mechanism: "science-backed brain games" | `exercises`, `activities`, `tasks`. `games` is honest and lowers the stakes |
| **`Leagues`** | Weekly XP competitions, seven tiers | `Leaderboards`, `Tournaments`. `League` implies ongoing membership and promotion/relegation, which the tier ladder delivers (badly — see T4) |
| League tiers | `Bronze` → `Silver` → `Gold` → `Sapphire` → `Ruby` → `Emerald` → `Diamond` | **A mixed metal-then-gemstone ladder**, so the ordering is not inferable past `Gold`. Is Ruby above Sapphire? Is Emerald above Ruby? Only the published list tells you. Same failure class as Blinkist's `Premium`/`PRO`/`Platinum` |
| **`XP`** | "activity points" — glossed in parentheses on first use, every time | `points`, `score`. The gloss `(activity points)` is doing important work: it tells the user XP measures *activity*, not ability, which keeps it separate from EPQ |
| **`Coins`** | A second currency, purchasable (`Virtual Items` in the Terms) | |
| **`Quests`** / `Daily Quests` | "Daily challenges to win rewards!" | `Challenges`, `Goals`, `Missions` |
| **`streak freeze`** | A consumable that suspends streak loss | `pause`, `rest day`. Borrowed from the category (Duolingo) |
| **`hearts and lives remaining`** | In-game failure budget | Pure arcade vocabulary, in a product claiming cognitive benefit |
| **`Study Materials`** | Reference content, free-tier partly and "Exclusive, members-only" partly | `Resources`, `Library`. Needs two articles: `Where are Study Materials?` and `How to unlock Study Materials` |
| **`Words of the Day`** | A daily content slot | Plural-of-a-singular construction (`Words`, not `Word`) — so it is a set per day, not one word |
| **`Today`** (tab) | The landing tab | `Home`, `Dashboard`. Names the scope of the expectation |
| **`Me`** (tab) | Performance and achievements | `Profile`, `Stats`. First-person possessive register, same family as Memrise's `My Words` |
| **`Cancel service.`** | The in-app cancellation control | `Cancel subscription`. **`service` appears nowhere else in user-facing copy** — see T3 |
| **`Account Status`** | The settings row containing cancellation | `Subscription`, `Billing` |
| `The Elevate App` / `Elevate` | The product | Two forms, footer vs page |
| `The Mind Company` / `MindSnacks` / `elevateapp.com` | The company | Three generations of identity live simultaneously (T0) |
| **`Atlas`** | A fourth app, named only in the Terms | Governed but undiscoverable (T10) |
| `AI Outputs` | Capitalised defined term in the Terms | |

### The four-taxonomy problem

**The most important finding in this section.** Elevate's skill categories are stated four different ways:

| Source | Categories |
|---|---|
| Help, `How do I use the app?` (the actual tab) | `Writing` · `Speaking` · `Reading` · `Math` · `Memory` |
| Elevate page, benefit block 1 | "reading, writing, speaking, memory, and math" |
| Help, `What is Elevate?` | "focus, memory, processing, math, precision, and comprehension" |
| Elevate page, meta description | "focus, memory, math, and reading" |
| Parent, Elevate card | "memory, vocab, math, and more" |

Five statements, four distinct lists. `focus`, `processing`, `precision`, `comprehension`, and `vocab` appear in some and not others; `Speaking` and `Writing` appear in two of five. Only `memory` and `math` are in all five.

For a product whose value proposition is **measuring and reporting your ability in named skills**, and which assigns a 0–5000 score *per category*, having no stable list of what the categories are is the defect with the widest blast radius: it undermines EPQ, it undermines `Understand your strengths`, and it makes the `90% improved their vocabulary` claim uncheckable against a category that may not exist in the app (`vocab` appears only on the parent card and in that claim).

### Register analysis

Three vocabularies, and they do not cohere:

1. **Psychometric** — `Proficiency Quotient`, `proficiency levels`, `Novice`→`Master`, `cognitive skills`, `aptitude`. Borrows the authority of assessment.
2. **Fitness** — `workout`, `training`, `Workout calendar`, `training goals`, `mental fitness`, `Stay sharp`. Borrows the legitimacy of exercise, and crucially imports the idea that *effort produces results over time*, which is the whole efficacy argument made metaphorically rather than evidentially.
3. **Arcade** — `XP`, `Coins`, `Leagues`, `Bronze`→`Diamond`, `Quests`, `hearts and lives`, `streak freeze`, `badges`, `trophies`, `Level up`.

The fitness layer is the bridge: it lets a game be called training and a score be called proficiency. `mental fitness` is the keystone term for exactly this reason — it is the only phrase that can host all three registers at once. It is also the phrase doing the most work to keep the product adjacent to health claims without making them.

Where this shows strain: a user finishing a `workout` earns `XP`, climbs from `Sapphire` to `Ruby`, spends `Coins`, loses `hearts`, and receives a revised `Elevate Proficiency Quotient` that moves them from `Advanced` to `Expert` while their `Difficulty` and `Rankings` change independently. Ten vocabularies in one loop. The 16-article `Performance and Progress Tracking` section is the cost of that.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user; first-person plural for the company, present in adverse copy ("**We make no warranties** as to the expected duration", "**we will be happy to assist you**", "**we cannot guarantee** any specific feature"). Marketing uses `you'll` future ("you'll strengthen", "you'll be provided with", "you'll land on the Today tab"). Help uses imperative steps.

**Register — three surfaces, three voices, and the gap between them is the story** `[observed]`

1. **Marketing (Mind Company)** — extremely sparse. Four-to-eight-word headings, one-sentence bodies, no numbers above the fold, no FAQ, no objection-handling. Confident to the point of terse: `Brain training personalized for you`, `How it works`, `Level up your skills`, `Training that works`. This is the most minimal marketing voice in the batch — and minimal copy is how the unhedged claims (`Proven`, `results that last`) end up unqualified: there is no room for a caveat in a four-word heading and no footnote layer beneath it.
2. **Help centre (Zendesk)** — plain, procedural, numbered, with **exclamation marks used liberally in the wrong places**: "It's a fun and motivating way to challenge yourself!", "giving you a fresh chance to reach the top!", "Daily challenges to win rewards!", "Completing a full workout or one puzzle a day is enough to keep your streak alive!", "The app will automatically generate a random name for you!", "we will be happy to assist you!", "Find out more about your personal EPQ on the Me tab!" — including one at the end of the **cancellation** article. Tone does **not** flatten as stakes rise, the same failure as Memrise.
3. **Legal (Terms)** — formal, all-caps for warranty disclaimers, bolded for the trial auto-conversion sentence. Zero personality. Correct.

**The tonal whiplash between surface 1 and surface 3 is the largest in this batch.** `Brain training personalized for you` / `Training that works` / `Proven` on one domain; `THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES WILL [NOT NECESSARILY] BE ACCURATE OR RELIABLE` and `YOUR USE OF THE SERVICES IS AT YOUR SOLE RISK` on the other. Nothing bridges them — no footnote, no "learn more about our research", no limitations page.

**Numbers as trust devices — and they are thin** `[observed]`: `40+ games` (used twice, consistently) · `4.8 stars` ("by millions" — unattributed, uncounted) · `93% / 95% / 90%` (unsourced) · `0-5000` (EPQ scale) · `7-day` trial · `24 hours` · `99 years` (Lifetime cap) · `$100` (liability cap) · `30 days` (arbitration opt-out) · `14 days` (terms-change notice) · `6 months` (liability basis). The **legal numbers are precise and sourced; the efficacy numbers are neither.** That inversion is worth recording: the document nobody reads is quantitatively rigorous, and the page everybody reads is not.

**Accessibility content** `[observed]`

- **No standalone accessibility statement.** The footer link is **`Privacy Policy & Accessibility`** — one link, two subjects, pointing at `/privacy-policy`. So any accessibility commitment is a section of a privacy document. Of the five products in this batch this is the weakest treatment: Wise ships a dedicated article, Blinkist ships a dedicated (empty) page, Elevate ships a compound label. `[absent]` as a standalone artefact.
- **No `Skip to content` link** in the served HTML on the Mind Company pages. The **Zendesk help centre also lacks one** in the fetched markup (Blinkist's Intercom help centre has `Skip to main content`) — so neither domain offers it.
- **Alt text is largely absent or filename-derived** on the marketing pages. Observed values: `Elevate App Icon`, `A family of apps`, `Understand your strength` *(used twice, for two different images, and singular where the heading says `strengths`)*, `Apple Store Best of 2021`, `Background Shapes`, `App Award` *(used twice for two different awards — so a screen-reader user hears "App Award" twice and learns which award neither time)*, `Privacy Icon`, `Elevate App Icon Elevate` *(on the help router button — the icon alt concatenated with the label, producing a stutter)*. Several decorative SVGs carry **no alt at all** (`![](https://themindcompany.com/icons/misc/improve-skills-icon-1.svg)` through `-6.svg` — six unlabelled icons in the hero).
- **The three efficacy percentages are rendered as text**, not images — good, since the claims are at least machine-readable.
- **Video content carries no captions or transcript** in the served markup: `elevate-app-preview.webm` and `balance-app-preview.webm` are embedded with no `<track>`, no transcript link, and no description. Three product-demonstration videos across two pages, none captioned. Recorded as suspected-unlabelled rather than confirmed, since the markup may be client-enhanced.
- **`Your Privacy Choices`** is a footer CTA with an icon on every page (CCPA/CPRA), and **`Consumer Health Data`** is a dedicated footer document. Privacy and health-data disclosure are handled well; accessibility is not. **The same imbalance appears in all three subscription products in this batch** — privacy has regulatory teeth and a compliance owner, accessibility does not, and the footer reveals it.
- **In-product accessibility affordances are documented**: `Update your language` (help: `What languages can I play Elevate in?`), `sound effects` toggle, `workout length` (a genuine cognitive-load and time affordance), `No Sound Troubleshooting` (a promoted article), `Show Game Statistics` toggle (progressive disclosure of a dense stats layer), `Compete in Leagues` toggle (opt out of social comparison), `League Updates` toggle, and the **anonymity affordance** (clear your name, get a generated one). Taken together that is a real set of controls for users who find competition, noise, or long sessions aversive — and it is better than the accessibility footer implies.
- **`Is Elevate suitable for all ages?`** exists as a help article (unfetched) — the only public acknowledgement that the audience may be heterogeneous.

**Negative findings, recorded honestly**

- **`elevateapp.com` redirects to a parent-brand page; Elevate has no site of its own.** Three corporate identities visible to users (`MindSnacks` in every help sign-in URL, `elevateapp.com` as the support domain, `The Mind Company` as the brand).
- **The Leagues promotion/relegation table says "stay in Bronze" for all six tiers**, including for Silver, Gold, Sapphire, Ruby, Emerald, and Diamond players. Either a copy-paste error or a five-tier demotion described with the word "stay". **The worst single content defect in this batch.**
- **`Diamond` (top tier) has an `advance` rule with nowhere to advance to.**
- **Four incompatible skill taxonomies** across five statements, for a product that scores you per skill category.
- **The three efficacy percentages (93% / 95% / 90%) carry no footnote, no source, no n, no methodology** — under a heading reading `Proven`. `90% of Elevate users improved their vocabulary` is a past-tense measured-outcome claim, unsourced.
- **`Training that works` / `Proven` / `results that last` are unhedged**, and are stronger than anything on the product page — i.e. the claims escalate as you move away from the product.
- **No research citation, no study, no limitations statement, and no "results vary" anywhere** — including in the Terms.
- **`brain training` appears in the page title and H1 but nowhere in the Terms**, which say only `train a variety of skills`.
- **The `No Medical Advice` clause opens by describing stress and sleep** — Balance's benefits, not Elevate's — because one clause serves four apps.
- **Elevate's own cancellation control is named `Cancel service.`**, a noun used nowhere else in user-facing copy, sitting under `Account Status`.
- **The web cancel flow is 7 steps with a mandatory reason gate and the same button pressed twice** — longer and more friction-laden than the Apple and Google paths Elevate does not control.
- **Refunds are `final and non-refundable, except at our sole discretion`, stated three times** — the weakest refund posture in the batch.
- **No price published anywhere** on the marketing surface.
- **No marketing FAQ at all** — the only product in this batch without one, so no public objection-handling at the point of decision.
- **`Atlas`** is governed by the Terms and appears in no nav, footer, or download link.
- **`Coins` are a purchasable, non-refundable virtual currency** in a product marketed on measurable cognitive improvement.
- **Overlapping EPQ band boundaries** (`[0-1,250]` and `[1,250-2,500]`).
- **Six overlapping progress vocabularies** (EPQ, proficiency level, rank, Difficulty, Rankings, League tier) requiring 16 help articles and a dedicated disambiguation article.
- **League tier ladder is metals-then-gemstones**, so ordering past `Gold` is not inferable.
- **`Cancel Subscription`** (Apple) / **`Cancel subscription`** (Google) / **`Cancel service.`** (Elevate) — three labels, one action, in one article.
- **Bare `Learn more` used four-plus times** to four different destinations.
- **`Get started`** in the footer leads to a product *list*, not a product.
- **`Understand your strength`** as alt text under a heading reading `Understand your strengths` (singular/plural mismatch), and the same alt reused for two different images.
- **`App Award`** used as alt text for two different awards on one page.
- **Six unlabelled SVG icons** in the Elevate hero.
- **Three product videos with no captions or transcripts** in the served markup.
- **`Privacy Policy & Accessibility`** as a single compound footer link; no standalone accessibility statement.
- **No `Skip to content`** on either domain.
- **Exclamation marks in the cancellation article** and throughout billing-adjacent help copy.
- **`Redirect Sitemap`** promoted to the footer of every page as a user-facing nav item.
- **`Press Kit` → Google Drive** and **`Careers` → Rippling** with no external-link indication.
- **Six hops** from product page to a help article, gated by an app chooser that lists three of four apps.
- **`Where are Study Materials?`** and **`How to unlock Study Materials`** — one feature requiring both a findability and an entitlement article, one of them promoted to the help front page.

---

## Transferable patterns

1. **State the deadline, then explain why it exists.** "turn off auto-renewal at least 24 hours before the 7th day, **as both Apple and Google start to withdraw the funds for a purchase 24 hours before a trial renews**." A justified deadline is remembered and not disputed; an arbitrary one generates tickets and chargebacks. The best compliance sentence in this batch, and the direct answer to the Headway/Blinkist failure of stating "anytime" on one surface and "24 hours" on another.
2. **Name the destination plan in the trial disclosure.** "your account will **auto-renew into an annual subscription** and you will be charged." Not "your subscription will continue" — the plan, the period, and the charge, in one clause.
3. **Tell users how to recognise an already-completed irreversible action.** "If you don't see a cancellation option, but instead see **"Canceled" in red**... your subscription has already been canceled," with a screenshot. Users who cannot find the cancel button assume failure and act again. Naming the success state's appearance — including its colour — pre-empts duplicate cancellations, duplicate refund requests, and chargebacks. Transfers to every confirmation-by-state-change in a payments product.
4. **Ship a `Why am I losing X?` article for any metric that can go down.** `Why am I losing EPQ?` and `Why does my proficiency level keep changing?` absorb the anxiety a volatile score creates, in the user's own verb (`losing`, not "decreasing"). Also ship the ceiling case: `I'm at the highest level for all categories. What should I do next?`
5. **Three-part performance feedback: strength, growth area, comparison.** "Elevate shows you **where you excel, where you can grow, and how you compare with others**." `where you can grow` is the euphemism earning its place. A reusable template for any score, review, or assessment summary.
6. **Publish the score's inputs and its scale.** EPQ: 0–5000, three named inputs, three possible directions, compared against *your own* history. Making a derived score auditable converts it from a judgement into a measurement. Condition: only do this if the inputs are defensible — Elevate's own disclosure that EPQ reflects "consistent training and game variety" honestly reveals that it partly measures play frequency.
7. **Ship a named off switch for every social or competitive mechanic.** `Compete in Leagues`, `League Updates`, plus an anonymity affordance (clear your name → generated pseudonym). Documented in four steps each, with its own help article. The right way to introduce social comparison into a product whose users may find it aversive.
8. **Disambiguate your own confusable metrics in help.** `What is the difference between EPQ and Difficulty?` If you cannot rename two colliding concepts, title an article for the collision.
9. **Put a worked example in the billing-cycle clause.** "if you are billed on a monthly basis and cancel during a given month, you will be charged for the entirety of that month and maintain access... through the end of that month." One example does what three sentences of rule cannot.
10. **Define "lifetime" adversarially.** "the earlier of **99 years** or for as long as we continue to offer the components... **We make no warranties as to the expected duration.**" The disclosure that only exists because someone stress-tested the word.
11. **Ship a named AI-output disclaimer.** The `AI Outputs Disclaimer` clause names inaccuracy, incompleteness, bias, and **hallucinations** explicitly, and excludes medical advice. Better practice than Blinkist, which ships an AI feature with no public accuracy disclosure at all.
12. **Counter-example: minimal marketing copy has no room for a caveat.** Four-word headings and one-sentence bodies leave nowhere to bound a claim, which is how `Proven to reduce stress, sharpen focus, and build skills` ships unqualified above three unsourced percentages. If the voice is terse, the footnote layer has to be deliberate — Wise's "claim, bound, personalise" needs somewhere to put the bound.
13. **Counter-example: name your own cancellation control what users call it.** `Cancel service.` under `Account Status`, in a product whose every other surface says "subscription", is a findability failure in the one flow where findability is regulated. And the channel you control should not be the highest-friction one.
14. **Counter-example: a rules table that cannot be read.** "stay in Bronze" repeated across six tiers, in the governing document for promotion and relegation. Any published rules table for a competitive or tiered system needs a reviewer who reads every row against the row above it.

## Caveats & gaps

- **`elevateapp.com` does not serve its own site.** Recorded as a finding (T0), but it means this file documents *The Mind Company's page about Elevate*, not Elevate's own marketing. Any historical Elevate-branded marketing copy — including whatever efficacy language it may once have carried — is not recoverable from the live surface, and archive retrieval was out of scope per the brief.
- **No price was captured.** `How much does a subscription to Elevate cost?`, `How do I purchase a subscription?`, `How can I purchase a monthly or lifetime subscription?`, and `How can I purchase a subscription outside of Google or Apple?` all exist as help titles and were not fetched. Monthly, annual, and lifetime plans are known to exist from article titles only. **No price point, no plan-page copy, and no checkout copy is asserted anywhere in this file.**
- **The funnel and paywall are unobserved.** `Try for free` hands off to an app-store deeplink, so there is no web funnel to walk. The actual trial-offer screen, the purchase-consent string, and the in-app paywall copy — the artefacts that matter most for negative-option compliance — are only reachable through an app install and were not harvested.
- **The in-product cancellation flow is `[documented]` only.** The seven steps, the reason selector's options, the doubled `Cancel service` confirmation, and any retention interstitial are known from one help article. Whether the live flow adds further friction (offers, surveys, "are you sure" modals) is untested, and that is precisely where category complaints originate.
- **Three of seven help categories were not fetched**: `My Profile`, `Game Instructions & Tips`, `Tech Support & Troubleshooting`, plus `Terms of Service` and `Contact Us` as help categories. `Game Instructions & Tips` is likely the largest unharvested body of content and would carry the per-game task vocabulary.
- **Only 6 of ~100+ help articles were opened.** Titles were captured in full for `Using Elevate` (4 sections) and `Membership` (2 sections), so the IA analysis in T1/T11 is well-founded, but the bodies of `Does Elevate offer refunds?`, `What are proficiency levels?`, `What are Rankings?`, `What is Difficulty?`, `Why am I losing EPQ?`, `What does a Good, Great, and Excellent rank mean?`, `What are Coins?`, `Daily Quests`, `What is a streak freeze?`, and `Is Elevate suitable for all ages?` are unread. **Several of these could materially change T6 and T10** — in particular, `Why am I losing EPQ?` may contain efficacy hedging not reflected here.
- **The Privacy Policy was not fetched**, and it is the destination of the `Privacy Policy & Accessibility` link — so **whatever accessibility commitment exists is unassessed.** The T14 finding is about the *label and IA*, not about the content behind it. A pass on `/privacy-policy` should be the next step and may partly rehabilitate the accessibility finding.
- **`Consumer Health Data` not fetched.** Relevant to how Elevate classifies performance and cognitive data.
- **The Terms were extracted via a subagent**, not read directly by the harvester. Quotations are reported verbatim from that extraction and are attributed to `themindcompany.com/terms-and-conditions`; they have not been independently re-verified against the source. Treated as reliable but flagged.
- **No judgement is offered on whether any cognitive-benefit claim is supported.** T10 Part A records only what the pages say, where they say it, what hedges are present, and what sources are cited (none). The FTC/Lumosity context in the metadata row is external framing supplied by the brief, not a finding about Elevate.
- **The `93% / 95% / 90%` figures' basis is unknown.** No footnote exists to summarise, and no study page was found. It is possible a source exists elsewhere (App Store copy, a blog post, a press kit); the parent blog and the Google Drive press kit were not harvested.
- **Video captioning recorded as suspected, not confirmed.** Three `.webm` files are embedded with no `<track>` or transcript in the served HTML; client-side players may supply captions.
- **`Atlas` is unharvested** — named in the Terms, absent from all navigation.
- **Balance and Spark were not harvested** beyond their one-line descriptions on the overview page, though the Terms and the `No Medical Advice` clause are shared with Elevate and that sharing is itself a finding.
- **Only en-US.** `What languages can I play Elevate in?` confirms multiple languages exist; localisation of `EPQ`, `Novice`→`Master`, the gemstone tiers, and `Cancel service.` is unknown.
- **Mobile app store listings out of scope** — which is a larger gap here than for the other four products, since Elevate has no marketing FAQ and no web funnel, so the App Store page is doing most of the pre-purchase content work.

## Sources

1. https://elevateapp.com/ *(redirects to 2)*
2. https://themindcompany.com/apps/elevate
3. https://themindcompany.com/apps/overview
4. https://themindcompany.com/help
5. https://themindcompany.com/terms-and-conditions
6. https://support.elevateapp.com/hc/en-us
7. https://support.elevateapp.com/hc/en-us/categories/4402921324443-Using-Elevate
8. https://support.elevateapp.com/hc/en-us/categories/4402921747995-Membership
9. https://support.elevateapp.com/hc/en-us/articles/4402922583067-What-is-Elevate
10. https://support.elevateapp.com/hc/en-us/articles/4402924805275-How-do-I-use-the-app
11. https://support.elevateapp.com/hc/en-us/articles/4402971643803-What-is-EPQ-and-how-is-it-calculated
12. https://support.elevateapp.com/hc/en-us/articles/4402930775835-What-s-included-in-the-free-version-vs-the-upgraded-version
13. https://support.elevateapp.com/hc/en-us/articles/4402973198747-How-does-the-7-day-free-Elevate-trial-work
14. https://support.elevateapp.com/hc/en-us/articles/38342436482331-How-do-I-cancel-my-Elevate-subscription
15. https://support.elevateapp.com/hc/en-us/articles/40412511351195-What-are-Leagues
