# 133. Blinkist

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Non-fiction book summaries / expert-guide subscription app (multi-format: summaries, podcasts, guides, AI) |
| Primary URL | https://www.blinkist.com/ |
| Corpus rank | 133 |
| Benchmark strength (source list) | Information hierarchy and progress |
| Locale / market observed | en (`og:locale: en`, alternate `pt`; help centre offers en, de, es, pt-BR) |
| Platform observed | Web marketing (Astro), Intercom-hosted help centre, pricing page |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Subject to auto-renewal / negative-option disclosure regimes. **Carries an explicit German-consumer-law carve-out** (post-1 March 2022 subscriptions: one month's notice, pro-rated refund) — the only product in this batch to publish jurisdiction-specific cancellation rights. Copyright posture is central: the product sells compressed derivatives of third-party books and argues transformation plus revenue-share. |
| Harvest date | 2026-09-21 |
| Pages inspected | 11 |
| Harvest completeness | Partial — the onboarding funnel (`/en/onboarding/matrix`) and the paywall were not entered (no sign-up, no payment), so the trial-offer screen and in-app cancellation UI are unobserved. **The published Accessibility page returned an empty body** — recorded as a defect, not a fetch failure (see T14). Help-centre collection indexes and eight article bodies were reachable in full. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://www.blinkist.com/ | Hero, three-format block, self-reported efficacy stats, use-case grid, 7-question FAQ, large SEO catalogue footer |
| Pricing | https://www.blinkist.com/pricing | Two plans, discount/intro-offer disclosure, 5-question FAQ, plan block repeated twice |
| Accessibility | https://www.blinkist.com/en/accessibility | **Empty body, `noindex, nofollow`** — see T14 |
| Help centre home | https://support.blinkist.com/en | Eight collections + a nine-item `Quick help` block |
| Help: Using Blinkist (collection) | https://support.blinkist.com/en/collections/10716385-using-blinkist | 67 articles across five sub-collections — richest IA source |
| Help: Subscriptions (collection) | https://support.blinkist.com/en/collections/10716455-subscriptions | 38 articles across six sub-collections, incl. `Renewals and Cancellations` |
| Help: `What is a Blink?` | https://support.blinkist.com/en/articles/10033202-what-is-a-blink | The unit definition — T13 anchor |
| Help: copyright / authors | https://support.blinkist.com/en/articles/10033219-what-about-copyrights-are-you-stealing-from-authors | The compression justification — T10 anchor |
| Help: `How do I cancel my subscription or free trial?` | https://support.blinkist.com/en/articles/10033387-... | Platform-split cancellation steps |
| Help: `Is there a cancellation period?` | https://support.blinkist.com/en/articles/10033383-... | 24-hour rule, 14-day guarantee, German carve-out |
| Help: `Does the subscription auto-renew?` | https://support.blinkist.com/en/articles/10033382-... | |
| Help: `Build a learning habit with Weekly Goals` | https://support.blinkist.com/en/articles/13764488-... | The habit mechanic — T4 anchor |
| Help: `What are Shorts?` | https://support.blinkist.com/en/articles/10080589-... | The 5-a-day format |

---

## T1 Navigation & IA labels

**Global nav — three items, and one of them is a whole taxonomy** `[observed]`

`Categories` (dropdown) · `For Business` · `Log in`

That is the entire top nav. No `Pricing`, no `Help`, no `About` — all three are relegated to the footer. For a subscription product, **omitting `Pricing` from the primary nav** is a deliberate funnel decision: the only way a prospect reaches the price is via `Get started` (which enters the onboarding quiz) or by scrolling to the footer. Compare 132 Headway, which also hides price but at least surfaces `FAQ` in a secondary bar.

**Footer — the most content-heavy IA in this batch** `[observed]`

Utility groupings are lean: `Editorial` (one item: `Book lists`) · `Useful links` · `Company`.

`Useful links` contains: `Pricing` · `Blinkist Business` · `Gift Cards` · `Contact & Help` · **`Cancel Subscription`**

**`Cancel Subscription` as a first-class footer link on every page is the single best IA decision Blinkist makes**, and the strongest contrast with Headway (where cancellation lives three clicks into an FAQ and the destination is an off-brand domain). It sits in `Useful links`, four items down, beside `Pricing` and `Contact & Help` — i.e. treated as ordinary self-service rather than as a dark corner. Wise puts `Service status` in the footer as a first-class link; Blinkist does the equivalent for churn.

Legal row: `Sitemap` · `Legal Notice` · `Terms of Service` · `Privacy Policy` · `Cookie Consent` · **`Accessibility`** · `Do Not Sell Or Share My Personal Information`. An `Accessibility` link is present on every page — which makes the empty destination worse, not better (T14).

**The SEO catalogue block — six parallel discovery axes** `[observed]`

Above the footer proper, the home page ships six ten-item lists under these headings:

`Popular titles` · `Popular categories` · `Popular topics` · `Trending topics` · `Featured titles` · `Featured topics`

Note the grammar split. **Categories are bare noun phrases** (`Personal Development`, `Psychology`, `Productivity`, `Career & Success`, `Management & Leadership`, `Science`, `Motivation & Inspiration`, `Mindfulness & Happiness`, `Money & Investments`, `Communication Skills`). **Topics are templated as `Best <X> Books` or `<X> Books`** (`Best Self-Help Books`, `Best Leadership Books`, `Stoicism Books`, `Marketing Books`, `Sociology Books`). So the same site runs two title conventions for two adjacent taxonomy levels — one editorial, one search-shaped — and the URL slugs make the distinction explicit (`/content/categories/...` vs `/content/topics/...`).

**Defect** `[observed]`: `Popular topics` and `Trending topics` and `Featured topics` are three headings over three lists of the same object type, with no stated basis for the distinction. `Featured titles` is also notably **fiction-heavy** (`A Court of Thorns and Roses`, `Into the Wild`, `Walden`, `The Myth of Sisyphus`, `Genesis`) on a site whose every headline says "nonfiction" — see T10.

**Help-centre IA — eight collections, two levels deep** `[observed]`

| Collection | Scale |
|---|---|
| `Using Blinkist` | 67 articles |
| `Subscriptions` | 38 articles |
| `Known Issues and Updates` | 14 articles |
| `Blinkist Business` | 22 articles |
| `Blinkist AI` | 4 articles |
| `Our Affiliate Program` | 6 articles |
| `Get in touch with us` | 3 articles |
| `Privacy and security` | 2 articles |

**`Known Issues and Updates` as a top-level help collection is the standout.** Most products bury current defects in a status page or nowhere; Blinkist gives them a named category alongside `Subscriptions`. Its contents include `Experiencing Issues with the app?`, `Experiencing issues with the website?`, `Update - We'll discontinue support for iOS 16 & 17`, `Update: Discover the voices behind our Blinks`, `Playback keeps stopping on my Android device.` — i.e. a mix of live troubleshooting, deprecation notices, and product announcements. Treating "things that are wrong or changing" as a first-class self-service destination is directly reusable.

**Sub-collections under `Using Blinkist`** `[observed]`: `About Blinkist` (15) · `Manage your account` (15) · `How to use Blinkist` (24) · `Spaces` (9) · `Kindle Connection` (4)

**Sub-collections under `Subscriptions`** `[observed]`: `Plans and Payments` (12) · **`Renewals and Cancellations` (8)** · `Blinkist Platinum` (6) · `Premium Sharing` (10) · `Gift Cards` (1) · `Vouchers and Discounts` (1)

`Renewals and Cancellations` is a named sub-collection — the noun pair puts the renewal and its reversal in the same bucket, which is the honest grouping. `Premium Sharing` getting ten articles (more than cancellation) tells you where support volume actually sits.

**`Quick help` — a nine-item shortcut block on the help home** `[observed]`, and it is entirely failure- and billing-shaped:

`Experiencing Issues with the app?` · `Experiencing issues with the website?` · `How can I upgrade from Premium to Pro?` · `I bought, can't use / Subscription not recognized` · `I was double-charged/I paid twice for my subscription.` · `An additional account on your Premium plan: how does it work?` · `What are Shorts?` · `Update - We'll discontinue support for iOS 16 & 17` · `Update: Discover the voices behind our Blinks`

Six of nine are problems. A "quick help" shelf composed mostly of failures is a defensible triage decision — it matches what brings people to help — and the titles are written as symptoms rather than as topics (`I bought, can't use`, `I was double-charged`). See T7.

## T2 Value proposition & headline patterns

**Hero — the claim is a daily habit, and the mechanism is the subhead** `[observed]`

> Headline: `**Learn** something new **every day**` (bold on `Learn` and `every day`)
> Subhead: "Get the key ideas from the top books, podcasts, and experts in 15 minutes with the Blinkist app."

The bolding is the analysis: Blinkist emphasises the **verb and the frequency**, not the object. `something new` is left deliberately vague and unbolded — the promise is the habit, not the content. The subhead then does all the specification work: the source set (`books, podcasts, and experts`), the unit of value (`key ideas`), and the time cost (`15 minutes`).

Compare the three products in this batch: Memrise's hero promises *relevance*, Headway's promises *transformation*, Blinkist's promises *frequency*. Blinkist's is the most modest and the most falsifiable.

**Section headers escalate from capability to identity** `[observed]`

`Understand key ideas in 15 minutes` · `A world of knowledge in your pocket` · **`How will you level up?`** · `Join 31+ million people growing with Blinkist` · `Trusted by the world's leading brands` · `Grow wherever you are` · `Do you have any questions?` · `Discover the Blinkist catalogue`

`How will you level up?` is the pivot — a **question as a section header**, in gaming vernacular, with the answer supplied as three format choices. Its subhead states the design principle plainly: "Listen, read, or get interactive—however you like to learn, you'll find it here!" Multi-modality as the differentiator rather than library size.

**The three-format block — the clearest information hierarchy on the site** `[observed]`

This is the benchmark-strength artefact. Three formats, each with a coined name, each headline built as **`<benefit phrase>` + `with` + `<product noun>`**:

| Heading (verbatim) | Body |
|---|---|
| `Bite-sized bestsellers with book summaries` | "Get powerful ideas in minutes—not hours or days with our summaries of today's most transformative books." |
| `An expert in your ear with Guides` | "Let a pro lead you through today's must-know topics and apply what you learn right away with interactive tools and activities." |
| `Learning, but social with Spaces` | "Make a learning playlist for yourself, share with others (you can finally start that book club!), or follow thought leaders' Spaces to get inspired." |

The construction is consistent and worth stealing: **the benefit is stated in the user's language, and the product name arrives only at the end of the heading**, after the value. `Learning, but social with Spaces` uses a comma-plus-conjunction fragment to modify a generic noun — a compact way to say "the familiar thing, with one twist."

`An expert in your ear` also appears earlier in the page as a standalone benefit label — so the same phrase serves as both a three-word benefit and the headline for a named format. Reuse of one phrase across hierarchy levels is a deliberate memorability play.

**The `not hours or days` construction** `[observed]` — "Get powerful ideas in minutes—not hours or days". Claim, then explicit negation of the alternative's cost. Recurs on the pricing page as a per-day price (see T10) and in the footer tagline.

**Three-benefit block — noun-phrase labels, sentence bodies** `[observed]`

- `Read & listen to key insights` — "Boost your personal growth with bestsellers and podcasts' summaries."
- `Feed your curiosity` — "Personal recommendations to dive into 9,000+ titles and hundreds of topics."
- `An expert in your ear` — "Learn from experts through step-by-step guides & exclusive insights."

**Use-case grid — four one-word activity labels** `[observed]`

`Driving` · `Doing chores` · `Commuting` · `Training`

Preceded by the section head `Grow wherever you are` and this subhead: "**Forget carving out time.** Slip in a little learning in the car, waiting in line, over lunch, before bed, or whenever you've got a moment."

`Forget carving out time.` is the best-constructed sentence on the site. Two words of imperative dismissal, then the objection named (`carving out time` is exactly the phrase a busy person uses), then a five-item list of moments that require no carving. This is the same time-justification move all three summary/microlearning products make, but Blinkist's version is the shortest.

The `Driving` card is also the only one carrying a platform proof point — `Apple CarPlay and Android Auto logos` — which converts a lifestyle claim into a capability claim.

**Segment-labelled social proof** `[observed]` — three testimonial blocks headed not by the reviewer's name but by their **segment**:

`Upskillers` · `Leaders` · `Lifelong learners`

`Leaders` carries a quote that is really a status claim: "Most CEOs read a book a week. Many use programs like this to acquire key concepts..." — note `programs like this` rather than "Blinkist", which makes the sentence a category endorsement rather than a product testimonial. Worth flagging: it is the weakest-attributed claim on the page.

**Pricing-page headline pattern — the plan *is* the headline** `[observed]`

`MOST POPULAR` (eyebrow) → `PRO - 12 Months` → price stack → `Reach your goals faster` (benefit line) → feature bullets.
Second card: `PREMIUM - 12 Months` → price stack → **`For casual learners`** → bullets.

The benefit lines are the tell. `Reach your goals faster` (aspirational, on the expensive plan) versus `For casual learners` (a mildly deflating label, on the cheap one). Tier descriptors that characterise *the buyer* rather than the offer are a recognised upsell device; `casual` is doing the work of making the $79.99 option feel like a lesser identity.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Hero, and **repeated 5+ times** down the home page | Primary; every instance points at `/en/onboarding/matrix`, i.e. straight into the quiz |
| `Log in` | Global nav | |
| `For Business` | Global nav | Audience switch presented as a nav item, not a CTA |
| `Cancel Subscription` | **Footer, every page** | See T1 — the notable one |
| `Contact & Help` | Footer | Compound label covering both routes |
| `Pricing` | Footer | The only path to price outside the funnel |
| `Gift Cards` | Footer | |
| `Book lists` | Footer, under `Editorial` | |
| `Sitemap` · `Legal Notice` · `Terms of Service` · `Privacy Policy` · `Cookie Consent` · `Accessibility` · `Do Not Sell Or Share My Personal Information` | Footer legal row | |
| `Skip to main content` | **Help centre only**, first in DOM | Present on `support.blinkist.com`; **absent from `www.blinkist.com`** — see T14 |
| `What are you interested in?` | Home, above the interest picker | A question used as an interactive prompt, with `Get started` as the submit |
| `Search for articles...` | Help centre | Placeholder |
| `Set a weekly learning goal` | In-app, `For You` section | `[documented]` — see T4 |
| `Save your goal` | In-app, goal setter | `[documented]` |
| `Edit` | In-app, goal card | `[documented]` |
| `+` / `-` | In-app, goal stepper | `[documented]` — controls named in help copy |
| `account settings` | Help, cancellation path | `[documented]`, links to `/nc/settings` |
| `Did this answer your question?` + `Disappointed` / `Neutral` / `Smiley` reactions | Foot of every help article | Three-point sentiment, labelled |
| `We run on Fin` | Help footer | Vendor attribution for the AI support agent |

**Observations.** Like Headway, Blinkist ships one primary CTA (`Get started`) repeated down the page with no variation — five-plus instances, all to the same quiz URL. Unlike Headway, the label never drifts into variants, so at least it is consistent.

The pricing page is the anomaly: it has **no visible primary CTA in the served HTML**. The plan cards render prices, feature lists, and the intro-offer disclosure, but the purchase button is not in the server markup (client-rendered). The consequence for this harvest is that the actual purchase-confirmation label — the string that matters most for negative-option compliance — is unobserved. Recorded as a gap, not a defect.

`Get started` appearing on the *pricing* page's sibling sections but not as a plan-card action is worth noting: Blinkist funnels to the quiz, not to checkout.

## T4 Onboarding & getting-started

**PRIORITY SECTION.**

**Public onboarding is an interest picker, not a step sequence** `[observed]`

There is **no "How it works" section on the Blinkist home page** — a striking absence given that both Memrise and Headway lead with one. Instead the page offers:

> Section: `A world of knowledge in your pocket`
> Prompt: `What are you interested in?`
> Then: `Get started`

A single-question interest capture, inline on the marketing page, with the CTA as the submit. The funnel proper lives at `/en/onboarding/matrix` — and the slug `matrix` implies a multi-axis selector rather than a linear quiz. Not entered, per scope rules.

So Blinkist's onboarding narrative is **format choice rather than step progression**: `How will you level up?` → three formats → pick one. The user is being onboarded into a *library with three doors*, not walked through a process.

**The habit mechanic: `Weekly Goals` — and it is weekly, not daily** `[documented]`

This is the most important finding in the section, and the sharpest contrast in the batch. From `Build a learning habit with Weekly Goals`:

> "Weekly Goals is designed to support you in creating a consistent learning habit with Blinkist, by letting you set a goal of **how many times per week** you'd like to finish a title."

Five documented steps, each with a verbatim control label:

1. Tap **`"Set a weekly learning goal"`** in the `For You` section of the app.
2. **`Set your goal`** — "Use the **`+`** and **`-`** to set your weekly goal. For example, if you set a weekly goal of 4 days, you'll aim to complete a Blink on four separate days each week. Tap on **`"Save your goal"`**."
3. **`Complete titles`** — "Finish Blinks on different days throughout the week to work toward your goal."
4. **`Track your progress`** — "Monitor how you're doing throughout the current week and see if you're on track to meet your goal. You can always adjust your goal by tapping on **`"Edit"`**."
5. **`Build your streak`** — "Keep achieving your weekly goal to build a streak! **Your streak shows how many consecutive weeks you've successfully met your target.**"

Three things make this the best-designed progress mechanic in the batch:

- **The streak unit is a week, not a day.** "how many consecutive weeks you've successfully met your target" — so a missed day does not break anything. This is the structural fix for the streak-anxiety problem that Memrise solved by *removing* streaks and Headway solved by *lowering the daily minimum to 3 minutes*. Blinkist solved it by changing the period. Of the three, this is the only solution that keeps the streak's motivational value while removing daily jeopardy.
- **The goal is user-set, not system-set.** A `+`/`-` stepper, an explicit `Save your goal`, and a documented `Edit` affordance. Compare Headway, whose streak threshold (`3 key points`) is fixed and whose plan is explicitly not user-adjustable ("you can't adjust it manually").
- **The distinct-days rule is stated with a worked example.** "if you set a weekly goal of 4 days, you'll aim to complete a Blink on four separate days each week" — `separate days` closes the loophole (four Blinks on Sunday) and the example does the explaining instead of a rule statement.

Step 4 also introduces **`on track` as a progress state** — a mid-period status that is neither success nor failure. That is the same instinct as Memrise's `Videos partly understood`: name the in-between.

**Entitlement is disclosed at the top of the habit article** `[observed]`, before any instruction:

> *"Weekly Goals is available to paid subscribers only.*
> *Start your subscription today on our website or through your app store."*

Italicised, first line, with two purchase routes. Putting the paywall notice *above* the how-to rather than discovering it mid-flow is correct — though it does mean the help centre is being used as an upsell surface.

**`Shorts` — the low-commitment daily entry, five items** `[documented]`

> "Shorts are the lightest way to start a healthy learning habit."
> "Get introduced to **5 new ideas, from 5 great new resources** by today's top thinkers and writers, in a way that feels **fun and finishable**."
> "Every day, zip through 5 new bites of knowledge... Each micro-quiz, quote, and video is made to be enjoyed in about a minute"
> "because they're refreshed every 24 hours, there's always something new to learn."

`fun and finishable` is the phrase to keep. `finishable` is an invented-feeling adjective that names the actual anxiety (starting something you won't complete) and is more precise than "short" or "quick."

The four `Why use Shorts?` bullets show the house benefit-bullet shape — **bold imperative/claim, then the number**:
- `Get a little smarter, a lot quicker.` — "Shorts only take 5 minutes, with each idea only about a minute long."
- `Learn in a way that feels as fun.` *(sic — dangling comparative, "as fun" with no second term; a live grammar defect)*
- `Get familiar with 5 new thinkers and resources each day.` — "And it all adds up: that's 25 new books, podcasts, thinkers, and trend-setters every week!"
- `Start a healthy learning habit that's easy to keep up.`

Two register notes. `healthy` is used twice for learning (`healthy learning habit`, "bite by healthy bite") — a wellness borrowing. And the anti-social-media framing is the most explicit in the batch: "especially into that part where you might end up in a **social media spiral that leaves you feeling sleepier, not smarter**." That clause is the single best-written line across all five products in this batch: it names the competitor behaviour, its felt cost, and the substitution, in eleven words.

`25 new books, podcasts, thinkers, and trend-setters every week` is a **compounding-arithmetic claim** — 5×5 presented as accumulation. A reusable device for any daily-habit product: state the weekly multiple, not just the daily unit.

## T5 Form & field labels

Very little public form copy; the pricing page's purchase controls are client-rendered and were not observed.

`[observed]`

| Label / control | Surface | Notes |
|---|---|---|
| `What are you interested in?` | Home, interest picker | A question as a field label |
| `Search for articles...` | Help centre | Placeholder with ellipsis |
| `Did this answer your question?` | Foot of every help article | Followed by three labelled reactions: `Disappointed Reaction😞` / `Neutral Reaction😐` / `Smiley Reaction😃` — **the emoji carry text labels**, which is correct practice |
| Language selector | Help centre | `Português do Brasil` · `English` · `Deutsch` · `Español` — rendered twice in the DOM with an asterisk marking the current selection |
| `✓Using coupon blink20change` | Pricing page | A confirmation row naming the applied coupon code — see T10 |

`[documented]` — in-app controls named in help articles:

| Label / control | Article |
|---|---|
| `Set a weekly learning goal` | Weekly Goals |
| `Save your goal` / `Edit` / `+` / `-` | Weekly Goals |
| `account settings` (→ `/nc/settings`) | Cancellation |
| Font size / background colour | `How can I change the font size when reading?` · `How can I change the colour of the background when reading?` |
| Playback speed | `How can I adjust the speed of the audio?` |
| Autoplay toggle | `How do I turn on/off autoplay?` |
| `Sleep/Night Timer` | `Is there a Sleep/Night Timer feature?` |
| Queue | `How can I manage my queue?` |
| Follow/unfollow a Category | `How do I follow/unfollow a Category?` |
| `Daily Pick` reminder time | `Can I change the time for my Daily Pick reminders?` |
| Push notifications toggle | `How can I turn on or off the push notifications ?` *(note the space before the question mark — live typo)* |

**Observation.** The reading-experience settings inventory (font size, background colour, playback speed, autoplay, sleep timer, offline download, Kindle send, e-reader send) is the **broadest reader-customisation surface in this batch by a wide margin** — and each has its own named help article. Memrise documents a Dark Mode toggle and a romanisation toggle; Headway documents playback speed and app language. Blinkist documents eight distinct display and playback controls. For a text-and-audio product, that inventory *is* the accessibility story, and it is a better one than the empty Accessibility page implies (T14).

## T6 Status & state language

`[documented]` unless noted.

| State / concept | Copy | Notes |
|---|---|---|
| `on track` | "see if you're **on track** to meet your goal" | Mid-period progress state — neither met nor missed |
| Weekly streak | "how many **consecutive weeks** you've successfully met your target" | The period is the week |
| `finished titles` | `How can I view and re-listen to my finished titles?` | Completion as a retrievable collection |
| Auto-renew active | "our subscriptions are set to automatically renew at the end of each billing period" | |
| Cancelled-but-active | "your subscription will stay active until the end of your current cycle" | |
| Expired | "Once your subscription expires, no additional charges will occur. **The system ensures that the subscription is no longer active beyond the expiration date, preventing further fees.**" | An explicit closure guarantee — see below |
| `Basic account` | "you might be logged into a **Basic account**" | A named state for the unpaid/wrong-account case, used diagnostically |
| Shared-plan member | "you are using the subscription at no cost to you, and there **will be** no need for you to cancel" | An entitlement state where the cancel control is *correctly absent* |
| Pre-authorisation hold | "this is only a temporary "hold" on the funds to check that the account is chargeable" | See T7 — the best status explanation in the file |
| `Subscription not recognized` | `I bought, can't use / Subscription not recognized` | Entitlement-mismatch state named in a help title |
| Trial active | "If your subscription is still within the free trial period..." | |
| Free tier (no subscription) | "you'll still be able to learn and grow with **1 pre-selected book a day**" | |
| Deleted app, retained titles | `What happens to my titles when I delete the app?` | A state question about the boundary between device and account |
| Post-subscription Kindle content | `Will the Blinks I sent to Kindle remain after my subscription ends?` | A state question about content that left the platform |

**The closure guarantee is the standout.** From `Does the subscription auto-renew?`:

> "Once your subscription expires, no additional charges will occur. The system ensures that the subscription is no longer active beyond the expiration date, preventing further fees."

Two sentences where one would do, and the redundancy is the point: it says the same thing from the user's side (`no additional charges`) and from the system's side (`the system ensures`). For users who have been burned by a renewal, the doubled reassurance is doing real work. Compare Headway's version — "that will be the last one" — which is shorter and better, but Blinkist's is the more explicit.

**Two state questions worth isolating as a pattern** `[observed]`: `What happens to my titles when I delete the app?` and `Will the Blinks I sent to Kindle remain after my subscription ends?` Both interrogate what survives a boundary the user is about to cross. Products routinely document *how* to cancel or delete and never document *what persists*. Blinkist gives each its own article title. Directly transferable: for every destructive or terminating action, ship a "what remains" article.

## T7 Error, failure & recovery

`[documented]`. Blinkist's recovery corpus is the best-titled in this batch, and the titles are written as the user's *utterance* rather than as topics.

**Symptom-as-title, in the user's clipped voice** `[observed]`

- **`I bought, can't use / Subscription not recognized`** — the standout. Three words of broken telegraphic English (`I bought, can't use`) slash-joined to the system's term for the same condition (`Subscription not recognized`). This is deliberate dual-registration: it matches what a frustrated, possibly non-native-English user types, *and* it matches what a support agent would call it. The most search-aware help title in the corpus.
- `I was double-charged/I paid twice for my subscription.` — same slash device, two phrasings of one complaint, note the terminal full stop on a title.
- `My credit card was declined.`
- `Playback keeps stopping on my Android device.` — platform-specific, present continuous (`keeps stopping`) which is how users describe intermittent faults.
- `I forgot my password! How can I reset it?` — **an exclamation mark inside a help title**, then the question. Voicing panic then supplying the task.
- `I've been invited to join a plan but the link isn't working.`
- `I've been invited to join a plan, but I already have a subscription.`
- `Why is the plan sharing option not displayed in my account?`
- `Why do I see a higher subscription fee after purchasing a discounted plan?`
- `What happened to my user collections and favorites?` — past-tense loss, i.e. a migration-casualty article
- `Experiencing Issues with the app?` / `Experiencing issues with the website?` — **inconsistent capitalisation** of the same title pattern across two articles

Three distinct title grammars are in play for failures: first-person past (`I was double-charged`), present-continuous symptom (`Playback keeps stopping`), and `Why … not …?` (`Why is the plan sharing option not displayed`). All three are user-side; none is written from the system's point of view. This is the Wise "confession title" pattern extended to include system failures, and it is executed more consistently here than in any other product in this batch.

**The pre-authorisation explanation — the best recovery paragraph in the file** `[observed]`, from the cancellation article:

> "**Please note:** Google Play payments can come with a pre-authorization charge 24 hours in advance: this is only a temporary "hold" on the funds to check that the account is chargeable. As long as you cancel the trial or the subscription before the time mentioned above the charge will not go through. However, **even after you cancel, it may take up to 14 business days for the pre-authorization to be removed via Google.**"

Four moves: name the mechanism (`pre-authorization charge`), gloss it in plain language with the term in quotes (`a temporary "hold"`), state its purpose (`to check that the account is chargeable`), then — critically — **set the reversal expectation with a number and attribute the delay to the third party** (`up to 14 business days... via Google`). A user who sees a charge after cancelling now knows it is a hold, why it exists, that it will not complete, how long it lingers, and who controls that. Then it links to Google's own fees documentation.

This is the single most reusable passage across all five files in this batch. Any product where a payment artefact appears after a user has taken action to prevent it should ship this paragraph's structure.

**The diagnostic branch on the cancellation article** `[observed]`

> "If you don't see the option to cancel your subscription, you might be logged into a **Basic account**. Please try to log out and log in again, using the email address attached to your subscription."

Anticipates the instruction failing (the Memrise microphone pattern), gives the likely cause as a *named account state*, and supplies the fix.

And the second branch is better still:

> "If you were invited by someone to join their subscription with "Premium Sharing", or if you joined Blinkist as a company benefit, you won't see the option to cancel your subscription: **you are using the subscription at no cost to you, and there will be no need for you to cancel.**"

A missing control explained as a correct absence, with the reason stated as a benefit. Most products would render a disabled button or nothing at all.

**`Known Issues and Updates` as a collection** — discussed in T1. Includes a forward-looking deprecation: `Update - We'll discontinue support for iOS 16 & 17`. Announcing platform-support withdrawal in the help centre, in first-person-plural future (`We'll discontinue`), is the same instinct as Memrise's Community Courses notice.

**Not found** `[absent]`: no validation-message copy, no 404 copy, no in-app error titles, no payment-decline body (the `My credit card was declined.` article was not fetched).

## T8 Empty states

`[absent]` — no empty-state copy is reachable publicly and none is quoted in the harvested help articles. The nearest adjacent copy is the free-tier fallback state, which functions as a graceful degradation rather than an empty state (`[observed]`, home FAQ):

> "Although you won't have full access to the complete Blinkist library, you'll still be able to learn and grow with **1 pre-selected book a day**."

Worth noting as a pattern: rather than an empty or locked state after trial cancellation, the product **falls back to a non-zero entitlement** and the copy names what remains before naming what is lost. Most trial-end copy does the reverse.

Would require an authenticated pass.

## T9 Notifications & system messages

`[documented]` unless noted.

- **`Daily Pick` reminders — with a user-settable time.** `Can I change the time for my Daily Pick reminders?` A named daily notification, and the fact that a *time-of-day* control exists and has its own help article is a real finding. Neither Memrise (no reminders at all) nor Headway (reminders promised but no documented control) offers this. **A notification whose schedule the user owns is the strongest version of a habit trigger.**
- **Push-notification toggle documented** — `How can I turn on or off the push notifications ?`. In-product control, not delegated to the OS (contrast Memrise, which sends users to device settings).
- **Newsletter management is split into two articles** — `How do I unsubscribe from a newsletter?` and `How can I manage my newsletter subscriptions?`. Unsubscribe and granular preference treated as different user intents.
- **Shorts refresh as an implicit daily notification hook** — "because they're refreshed every 24 hours, there's always something new to learn."
- **Widgets as ambient surface** — `How to use Blinkist widgets on iOS`.
- **Release and deprecation announcements inside help** `[observed]`:
  - `Update - We'll discontinue support for iOS 16 & 17`
  - `Update: Discover the voices behind our Blinks` — a narrator-attribution announcement, which in a synthetic-voice era is a provenance disclosure dressed as a feature note
  - `You can now find all of our updates in one place!` — an article announcing the existence of the updates collection
- **Community guidelines exist for the social feature** — `Blinkist Spaces Community Guidelines`, filed inside `Using Blinkist` → `Spaces`. A named conduct document for a user-generated-content surface.
- **Pricing-page inline notice** `[observed]` — `✓Using coupon blink20change` followed by the intro-offer disclosure (see T10). A confirmation-plus-consequence banner rendered in the purchase context.
- **Article-level feedback prompt** `[observed]` — `Did this answer your question?` with three labelled emoji reactions at the foot of every help article. A per-article satisfaction signal.

**Trial-ending reminder** `[absent]` — as with Headway, **no commitment to notify a user before a trial converts** appears anywhere in the harvested copy. Blinkist instead relies on the 24-hour cancellation window and the 14-day money-back guarantee. Given that the guarantee explicitly does **not** cover auto-renewals (T10), the absence of a pre-renewal reminder is the more consequential gap of the two.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** Blinkist is the most legally explicit product in this batch and the only one publishing jurisdiction-specific rights. It also has the most aggressive price-anchoring copy.

### Plans, prices, and the per-day device

`[observed]`, pricing page. Two plans, both 12-month:

| | PRO - 12 Months | PREMIUM - 12 Months |
|---|---|---|
| Eyebrow | `MOST POPULAR` | — |
| `Discount price:` | **$139.99** | **$79.99** |
| `Original price:` | **$174.99** | **$99.99** |
| `Save` | **$35.00** | **$20.00** |
| Per-day | **`$0` `.38` `a day`** | **`$0` `.22` `a day`** |
| Benefit line | `Reach your goals faster` | `For casual learners` |

The per-day figure is rendered as **three separate typographic elements** (`$0` / `.38` / `a day`) — a deliberate design pattern that makes the dollar sign and the zero dominant and the cents subordinate. $139.99/year presented as `$0.38 a day` is a 365× reduction in the apparent number. This is the standard SaaS anchoring device, executed cleanly, and the **four-figure price stack** (discount / original / savings / per-day) gives a prospect four different numbers for one product, three of which flatter it.

Note: the free tier is **not shown on the pricing page at all.** Its existence is disclosed only in the home-page FAQ ("1 pre-selected book a day") and in the help centre (`Where can I read your free Daily Pick?`). A user on `/pricing` sees two paid options and no free option.

**Feature bullets are duplicated across plans, not differentiated** `[observed]` — PREMIUM's three bullets (`9,000+ book and podcast summaries.` / `Read & listen in 15 min.` / `Personal daily recommendations.`) are repeated verbatim as PRO's last three, with `Blinkist AI` prepended. So the entire PRO premium is one line item. Honest, and it makes the upsell's value legible — though the FAQ then claims PREMIUM also includes "a second Premium account for free to share with someone of their choice", which does **not** appear in the PREMIUM bullet list. A benefit omitted from the plan card it belongs to.

**A fourth tier exists and is invisible on the pricing page** `[observed]`: `Blinkist Platinum` has its own six-article help sub-collection (`What is Blinkist Platinum?`, `Can I upgrade to Platinum from a Premium or PRO subscription?`, `Can I downgrade from Blinkist Platinum to PRO or Premium?`, `Blinkist Live`, `What are Blinkist Infographics and how can I benefit from them?`). The pricing page shows two plans; the help centre documents three paid tiers plus Business. `Infographics` and `Blinkist Live` are Platinum features referenced in home-page testimonials ("When I saw Blinkist had produced an **infographic style Blink**...", "I'm absolutely thrilled that Blinkist now offers infographics!") **without the page ever explaining what they are or that they require Platinum.** Testimonials selling a tier the page does not describe.

### The intro-offer disclosure — good structure, buried placement

`[observed]`, appearing twice on the pricing page (once under each plan block):

> `✓Using coupon blink20change`
> "We've automatically applied a discount to your first subscription price. **By proceeding you accept that $139.99 is processed as an intro offer, then $174.99 will be billed every 12 months automatically.** You can cancel anytime in your Settings."

This is a genuinely well-constructed negative-option disclosure. It contains all four required elements in one sentence: the intro amount, the word `intro offer`, the **renewal amount** ($174.99, not $139.99), the frequency (`every 12 months`), and the automaticity (`automatically`). Then the cancellation route (`in your Settings`). `By proceeding you accept that` is explicit consent-framing.

Three criticisms, recorded honestly:
1. **The coupon is pre-applied without user action** (`We've automatically applied`), and the `✓` checkmark styles it as something the user did. The `Original price` is therefore not a price anyone is being offered — it is the renewal price, presented as a struck-through "before".
2. `You can cancel anytime in your Settings` is **materially incomplete**: the help centre states a **24-hour-before-renewal** deadline (below). "Anytime" and "up to 24 hours before the end of the current billing period" are not the same claim, and the more permissive one is the one shown at the point of purchase. This is the most significant compliance inconsistency found in this file.
3. The disclosure sits **below** the price stack and the feature bullets in reading order, in smaller text, and the purchase control itself is not in the server HTML — so whether the disclosure appears above or below the actual button is unverified.

### Auto-renewal

`[observed]`, three consistent statements:

- Help, `Does the subscription auto-renew?` → "**Yes**, our subscriptions are set to automatically renew at the end of each billing period."
- Pricing FAQ, `Can I cancel during my subscription?` → "Our subscriptions are auto-renewable. To deactivate the automatic renewal you can cancel your subscription **up to 24 hours before the end of the current billing period.** The cancellation will be effective at the end of your current subscription cycle."
- Help, `Is there a cancellation period?` → same 24-hour rule, plus: "Please note that **the subscription doesn't end immediately upon cancellation.** The cancellation will be effective at the end of your current subscription cycle."

The phrasing `To deactivate the automatic renewal you can cancel` is precise and worth noting: it distinguishes the *action* (cancel) from its *effect* (deactivate renewal), which is the distinction users get wrong.

"the subscription doesn't end immediately upon cancellation" is stated as a caution rather than a benefit — the honest framing, since a user who cancels expecting immediate termination will otherwise think it failed. Headway frames the same fact as a benefit ("you keep full access until the end of your current paid period"). Both are true; Blinkist's version pre-empts the support ticket, Headway's softens the churn.

### Trial terms

`[observed]`, and note the hedge on availability:

> "**In some cases** we offer a 7-day free trial with our yearly subscription. If you signed up for it, you can cancel it **up to 24 hours before the end of the trial period** and no charge will go through. You'll still be able to use all Premium features until the end of the free trial."

`In some cases` is unusual — Blinkist does not commit to the trial existing. The home-page FAQ `Can I cancel during my trial or subscription?` gives the cleanest version:

> "**If you cancel your trial at any time before it ends, you won't be charged.** Although you won't have full access to the complete Blinkist library, you'll still be able to learn and grow with 1 pre-selected book a day."

**Defect** `[observed]`: "at any time before it ends" (home FAQ) versus "up to 24 hours before the end of the trial period" (help centre, twice) versus "at least 24 hours before the trial ends" (Apple path in the cancellation article). The same 24-hour-vs-anytime contradiction as the pricing disclosure, now in the trial context. **Three surfaces say "anytime", three say "24 hours".** This is the same class of defect found in Headway (132 T10) and appears to be endemic to the category: marketing surfaces say "anytime", help surfaces say "24 hours", and the user is bound by the stricter one.

Also note the trial-cancellation answer's second half is a **retention message inside a cancellation answer** — "Although you won't have full access... you'll still be able to learn and grow with 1 pre-selected book a day." Reframing the downgrade as continued access is soft, but it is a real entitlement and is accurately described.

### Cancellation — path count and quality

`[documented]`, from `How do I cancel my subscription or free trial?`

Opens: **"We're sorry to hear you'd like to leave!"** — then goes straight to instructions. One sentence of regret, no retention offer, no survey, no interstitial. For a product in a category notorious for cancellation friction, the *absence* of a save-attempt in the documented flow is the finding.

Three paths, split by purchase channel:

| Channel | Steps described |
|---|---|
| Website | **1 step** — "You can cancel your trial or deactivate the automatic renewal for your subscription in your **account settings**" (direct link to `/nc/settings`) — plus two diagnostic branches (Basic account; shared plan) |
| Apple App Store | Delegated to Apple's own article, with a separate note for the in-trial case and the 24-hour warning |
| Google Play | Delegated to Google's article, plus the pre-authorisation explanation |

**One step, one link, for the channel Blinkist controls.** Combined with the footer `Cancel Subscription` link on every page, this is the lowest-friction documented cancellation in the batch. Compare Headway: three different described locations, one on an off-brand domain, and email-to-support listed as a route.

**However** — a real gap. The article does **not** state the 24-hour deadline for *website* subscriptions. It states it for Apple ("Please make sure to cancel at least 24 hours before the trial ends") and implies it for Google (pre-auth timing), but the website path says only "in your account settings". The `Is there a cancellation period?` article carries the rule; the *how-to* article does not repeat it for the one channel Blinkist owns. A user following only the cancellation how-to on web would not learn the deadline.

### Refunds — a real commitment, with named exclusions

`[observed]`, the strongest consumer-protection copy in this batch:

> "If you have been charged for a yearly or monthly subscription, you can request a refund **up to 14 days after the beginning of the subscription**, as per our **14-day money-back guarantee**."

Then three exclusions, each bolded:

- "This guarantee only applies to **first-time purchases**, **not to auto-renewals.**"
- "We **cannot guarantee refunds** for subscription purchased via the **Apple App Store.** For these you'll need to contact Apple Support directly, and Apple will review your request according to their refund policies."
- "We **cannot guarantee a refund** for gift cards that have already been **redeemed**."

A named, numbered guarantee with its boundaries stated in the same breath is the correct structure — and the first exclusion is the important one: **the guarantee protects the initial purchase, not the renewal**, which is precisely where the category's complaints originate. Blinkist says so plainly rather than letting users discover it. Compare Headway: "refunds are issued at our discretion." Blinkist's position is materially better and it publishes the limits of it.

### Jurisdiction-specific rights — the unique artefact

`[observed]`. Blinkist is the only product in this batch to publish a market-specific cancellation regime:

> "**For our German users (i.e. if you are resident in Germany) who purchased a subscription after March 1st 2022, the following also applies:**"
> "In case of a yearly subscription, for your first subscription's year the same rules described above apply. After the first year — that is for subscriptions which will auto-renew after March 1st 2023 — it'll be possible to cancel the annual subscription **at any time, with one month's notice.**"

With channel-split remedies: website subscribers get "a **pro-rated refund** for the remaining months of your cancelled subscription" on request via support; store subscribers are routed to Apple/Google for the pro-rated refund.

This is a help-centre implementation of the German *Gesetz für faire Verbraucherverträge*. Three things make it a strong pattern: the eligibility test is stated as a plain conditional (`i.e. if you are resident in Germany`), the effective dates are given for both the purchase and the renewal, and the remedy is different per channel with the correct escalation route for each. Most global products either apply the strictest regime everywhere or bury market variations in a ToS annex.

### Summary-product framing and copyright

**PRIORITY for this product.** Blinkist has the most developed compression argument in the category, and it is worth quoting structurally.

**The unit is coined, defined, and quantified** `[observed]`, from `What is a Blink?`:

> "A Blink is an explainer of a nonfiction book that takes the most important and memorable insights from the title and condenses each of them into **key ideas of around 200-300 words.**"
> "Each Blink has an average of **7-8 key ideas**, and together you can get the most powerful, useful, and impactful knowledge in **around 15 minutes** of audio or text."

Three levels of hierarchy, each named and sized: **`Blink`** (the work) → **`key ideas`** (7–8 per Blink) → **200–300 words each**. This is the clearest statement of information hierarchy in the batch and the direct justification for the corpus's stated benchmark strength. A user can compute what they are buying: ~8 × 250 words ≈ 2,000 words ≈ 15 minutes. Publishing the word count per unit is unusual and makes the compression ratio auditable.

Note also the noun chosen for the artefact: **`explainer`**, not "summary". `Blink` is "an explainer of a nonfiction book" — framing the output as a piece of explanatory journalism about the book rather than a condensation of it. That word choice is load-bearing for the copyright argument that follows.

**The compression justification — four moves** `[observed]`, from `What about copyrights? Are you stealing from authors?`

First, note the title: **Blinkist asks the accusation in its own help centre**, in the second person, using the word `stealing`. Same device as Headway's `Is Headway legit?` but pointed at the harder question. Naming the worst version of the objection as your own article title is the most confident move available.

The four-part answer:

1. **Transformation claim** — "Our Blinks distill the main ideas and most important concepts from non-fiction books, but they are **new, original works of their own**, written in our Blinkist style, voice, and format."
2. **Partnership and revenue-share claim** — "We work with **publishing partners** to select the most compelling ideas to blink, introducing customers to new books and authors they might otherwise miss. We also **share revenue with those partners**, so that they - and authors - can benefit financially from our engaged customers."
3. **Self-limitation, with a metaphor** — "Our Blinks are concise and compelling, but **necessarily limited by their format. Think of them as a robust movie trailer for books.** Full length books offer more in-depth discussion, rich examples, references, and explanations that Blinks can't fit. **Which is why we always encourage our users to purchase the original title if they want to dig deeper.**"
4. **Author invitation with a real destination** — "If you're an author and see your book featured on Blinkist, we'd love to engage with you" → `contentpartners.blinkist.com/authors`.

**`a robust movie trailer for books`** is the key phrase and the best analogy in the batch. A trailer is (a) derivative but separately authored, (b) obviously incomplete by design, (c) promotional for the original, and (d) something nobody mistakes for the film. One five-word metaphor carries the entire legal and ethical position, and it does so in a register a user accepts. `robust` is hedging the metaphor slightly upward, since a trailer is thinner than a Blink.

Compare Headway on the identical question: "If you have any questions about copyright, please contact us at support@get-headway.com." Blinkist's answer is substantive, Headway's is a null. This is the clearest quality gap between the two products' content operations.

**Editorial provenance, and a drift** `[observed]`

- Home FAQ: "We work with experts, writers, and editors who **collaborate with the original authors whenever possible** to ensure that the summaries contain the essential insights and **preserve the spirit of the entire book**."
- Help: `How do you create the Blinks?`, `How do you choose which books to Blink?` — dedicated articles for method and selection (not fetched).
- `Update: Discover the voices behind our Blinks` — narrator attribution surfaced as an announcement.

`whenever possible` and `preserve the spirit` are both hedges, but they are the right kind: the first bounds the collaboration claim, the second sets a fidelity standard that is qualitative and therefore not falsifiable in the way "complete" would be.

**`blink` as a verb** `[observed]`: "to select the most compelling ideas to **blink**", `How do you choose which books to **Blink**?`. The coined noun has become a transitive verb in the company's own public copy — the strongest possible signal of an internalised product lexicon (see T13).

### Efficacy claims

`[observed]`, home page. Three percentages, with a single asterisked source note:

| Claim |
|---|
| **95%** "of Blinkist members read significantly more than before*" |
| **91%** "of Blinkist members create better habits*" |
| **87%** "have made positive changes in their lives thanks to Blinkist*" |

> "* **Based on internal study using survey data from general Blinkist customers**"

**Assessment, recorded factually.** All three are **self-reported member outcomes**, and the footnote says so: `internal study`, `survey data`, `general Blinkist customers`. That footnote is doing exactly the right job — it names the study type (internal), the instrument (survey), and the population (general customers, i.e. not a selected cohort). It does not give an n, a date, or a methodology, and there is no link.

Structurally this is the **inverse of Headway's approach**: Headway makes strong claims about the *category* (microlearning) with numbers that imply external research and no citations; Blinkist makes claims about *its own members* with an explicit self-report disclaimer. Blinkist's is the more defensible construction, because a self-reported attitude claim ("members read significantly more than before") is a fair thing to survey for, whereas a cognitive or pedagogical claim is not.

The third claim is the weakest: `made positive changes in their lives thanks to Blinkist` attributes causation (`thanks to`) to a survey response. Still bounded by the asterisk, but it is the one claim where the footnote is carrying more weight than it comfortably can.

Note also the **member-count inconsistency across one page** `[observed]`: `32 Million` "Downloads on all platforms" in the stats band, `Join 31+ million people growing with Blinkist` as a section header, and `Become a member of our community of 44 million people` on the pricing page. Three figures — 31M, 32M, 44M — on two pages, for what a reader will take to be one quantity. The pricing page's 44M is the largest and appears where the purchase decision is made. Also: `4.7 Stars` "Average ratings on iOS and Google Play" (home) versus `4.76` App Store / `4.7` Google Play with counts `96k` / `177k` (pricing). The pricing page's per-store attribution with counts is the better practice; the home page's blended `4.7` is not attributable.

`10+ years` "Experience igniting personal growth" and `9,000+ titles` are used consistently.

**`Trusted by the world's leading brands`** `[observed]` — a logo wall (TikTok, Booking.com, Microsoft, Lyft, Babbel, LinkedIn, Zalando, Tier). Note **Babbel and LinkedIn are both education companies**, i.e. adjacent competitors listed as customers, which is a defensible B2B proof point but slightly odd on a consumer page. Also note the logos are delivered as a **single composite image** with alt text listing all eight brands — so the claim is unverifiable per-brand and the alt text is the only machine-readable form of it.

### The fiction problem

`[observed]`. Every headline claim says nonfiction: "the key insights from top **nonfiction**", "thousands of bestselling **non-fiction** books", "over 9,000 books... **non-fiction**", "Our goal is to provide key insights from globally acclaimed and impactful **non-fiction** books."

The `Featured titles` and `Featured topics` blocks in the same page's footer list: `A Court of Thorns and Roses`, `Into the Wild`, `Tuesdays with Morrie`, `The Devil in the White City`, `Walden`, `The Souls of Black Folk`, `The Myth of Sisyphus`, `Genesis`, and topics `Fantasy Romance Books`, `Drama Books`, `Mystery Romance Books`.

`A Court of Thorns and Roses` is fantasy fiction; `Fantasy Romance Books` and `Mystery Romance Books` are fiction categories. The catalogue has expanded beyond the stated scope and **no copy anywhere acknowledges it.** Headway, by contrast, discloses its equivalent drift explicitly ("It also includes a small selection of classic fiction titles"; "Mostly nonfiction — that's Headway's core"). This is a straightforward accuracy defect in Blinkist's positioning copy, and a notable one given the copyright argument in T10 is built on the nonfiction "key ideas" framing.

### Blinkist AI

`[observed]`, pricing page:

> `Exclusive to PRO` → `10x your Productivity with Blinkist AI Assistant`
> "✅Summarize videos, podcasts, docs, articles and more."
> "✅Save and connect your learnings from everywhere."

And in the FAQ: "This powerful tool lets you copy-paste web links and get instant summaries of Youtube videos, podcasts, articles, docs, and more. You can also upload your own documents like PDFs. It's a **productivity game-changer**."

`10x your Productivity` is an unbounded, unqualified multiplier claim and the only such claim on the site — everything else is either footnoted or modest. `productivity game-changer` in the FAQ is pure marketing register leaking into a support answer (the same failure mode as Headway's "machine learning magic"). There is **no AI disclosure, no accuracy caveat, and no output-reliability statement** anywhere on the public surface, despite a four-article `Blinkist AI` help collection existing. Compare Elevate's parent, which ships an explicit `AI Outputs Disclaimer` clause (see 134). Recorded as a gap.

Note also: the AI feature lets users summarise **arbitrary third-party content they supply**, which is a materially different copyright posture from the curated-publisher-partnership model argued in the copyright article. Nothing on the public surface addresses that.

## T11 Help-centre architecture

**Intercom-hosted, two-level, searchable, and the best-structured help centre in this batch** `[observed]`

Structure: 8 collections → sub-collections → articles. Breadcrumbs are numbered and explicit on every page: `1. All Collections` → `2. Subscriptions` → `3. Renewals and Cancellations` → `4. How do I cancel my subscription or free trial?`

**Authorship and freshness are published on every article** `[observed]`

> `Written by Giuditta`
> `February 18, 2026`

A named human author and a last-updated date on every article. This is rare and valuable: it signals maintenance, and it lets a reader judge whether the answer is current. The collection indexes also expose counts and authorship (`By Giuditta` · `1 author` · `67 articles`), which inadvertently reveals that **the entire 156-article help corpus is attributed to one author** — a content-ops finding worth recording, and a single-point-of-failure risk.

The dates observed range from `October 23, 2024` (`What is a Blink?`, `What about copyrights?`) to `April 2, 2026` (`Is there a cancellation period?`). Billing and cancellation articles are the most recently touched; the foundational product-definition articles are the oldest. That maintenance pattern is itself informative about where support pressure sits.

**Article-title grammar — six shapes** `[observed]`

| Shape | Examples |
|---|---|
| `What is/are …?` | `What is a Blink?` · `What are Blinkist Guides?` · `What are Shorts?` · `What is Blinkist Platinum?` |
| `How do I …?` / `How can I …?` | `How do I cancel my subscription or free trial?` · `How can I highlight quotes in a Blink?` |
| `Can I …?` | `Can I share my Blinkist Premium plan with someone else?` · `Can I leave a plan after joining it?` · `Can I access my library without a subscription?` |
| `Why …?` | `Why do I see a higher subscription fee after purchasing a discounted plan?` · `Why is Spaces not available in my account?` |
| First-person symptom | `I was double-charged/I paid twice for my subscription.` · `I forgot my password! How can I reset it?` · `I've been invited to join a plan but the link isn't working.` |
| **Imperative / gerund task** | `Build a learning habit with Weekly Goals` · `Sending Blinks to my Kindle` · `Managing a Space` · `Adding and removing titles from a Space` · `Connect Blinkist to your car with CarPlay` |

The sixth shape is the interesting one. Blinkist uses **imperative or gerund titles for aspirational tasks** and question titles for problems. `Build a learning habit with Weekly Goals` is a benefit-framed help title — it sells the feature in the act of documenting it. `Connect Blinkist to your car with CarPlay` follows the same `<verb> ... with <product>` construction as the home page's format headings (`Bite-sized bestsellers with book summaries`). **Marketing's headline grammar has been carried into the help centre for feature-discovery articles**, while problem articles keep the user's interrogative voice. That register split by article *purpose* rather than by surface is the most sophisticated help-IA decision in this batch.

**A rhetorical-question title** `[observed]`: `What about copyrights? Are you stealing from authors?` — two questions, the second in the second person, naming the accusation. And `Syncing from Kindle to Blinkist - Is it possible?` — a statement plus a doubt, which is how a user would actually phrase a long-shot hope.

**Routing furniture** `[observed]`: search → `Quick help` shortcuts (problem-weighted) → collections → article → `Did this answer your question?` → `Related Articles`. Escalation is a dedicated collection (`Get in touch with us`, 3 articles) rather than a persistent "contact us" button, and the AI agent is disclosed by vendor name in the footer (`We run on Fin`). Disclosing the support-bot vendor is unusual; it is honest but also means the user learns they are talking to Intercom's AI.

**`Privacy and security` as a two-article collection** `[observed]` — small, but it is a top-level collection, i.e. privacy is given the same structural weight as the affiliate programme.

## T12 FAQs

Two FAQ blocks, both accordions with **answers present in server HTML** (unlike Wise).

**(a) Home page — `Do you have any questions?`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What can Blinkist do for me? |
| 2 | How can I use Blinkist? |
| 3 | What types of books does Blinkist cover? How many are there? |
| 4 | What's included in a plan? |
| 5 | What makes Blinkist book summaries the best on the market? |
| 6 | Can I cancel during my trial or subscription? |
| 7 | Have more questions? Contact our Customer Support! |

Seven items, and the ordering is: capability → access → catalogue → entitlement → quality → **cancellation** → escalation. Q6 in position six of seven, immediately before the escalation slot — so cancellation is the **last substantive answer a scrolling prospect reads**. Headway puts the same question fifth of seven. Both products place it in the back half but inside the block, which is the defensible compromise between hiding it and leading with it.

Q3 is a **compound question** (`What types... How many are there?`) — the Wise device of pairing the qualitative and quantitative in one slot rather than splitting them.

Q7 is not a question but a **routing slot dressed as one**, with an exclamation mark: `Have more questions? Contact our Customer Support!` The answer is a bare email address. Using the final FAQ position as a contact card is efficient; the exclamation mark is the only one in the block.

Q1's answer contains the clearest statement of the value proposition anywhere: "Blinkist is here to help you learn faster and smarter." And Q4's answer is where the **second free Premium account** appears — a benefit found nowhere on the pricing page (T10).

**(b) Pricing page — `Do you have questions?`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What's the difference between types of plans? |
| 2 | How can Blinkist boost my personal and professional growth? |
| 3 | On which devices can I use Blinkist? |
| 4 | Can I cancel during my subscription? |
| 5 | Have more questions? Contact our Customer Support! |

Five items. **Q1 is plan differentiation and Q4 is cancellation** — i.e. on the page where money is committed, two of three substantive questions are about what you get and how to get out. That is the right FAQ composition for a pricing page. Q4's answer is where the **24-hour rule** appears, contradicting the plan card's `You can cancel anytime in your Settings` four inches above it (T10). The contradiction is not merely cross-page; it is **on the same screen**.

Note the heading differs by one word between the two blocks: `Do you have any questions?` (home) vs `Do you have questions?` (pricing). Trivial, but it indicates the two blocks are maintained separately — which is consistent with their answers diverging.

Q2 is the weakest item: "Blinkist is bite-sized for a reason! It fits into any down-time or in-between time. Cue up the audio to one of our nonfiction book explainers **before bed**, listen to an expert-led Guide during lunch, or hear the key insights from a podcast right **before bed**." — **`before bed` appears twice in one sentence**, a live copy defect on the pricing page.

## T13 Terminology & glossary

**PRIORITY SECTION.** Blinkist has the most developed and most internally consistent coined lexicon in this batch, and the only one where the brand noun has become a verb.

| Term | Blinkist's usage | The alternative it rejected / note |
|---|---|---|
| **`Blink`** | The core unit: "an **explainer** of a nonfiction book that takes the most important and memorable insights... and condenses each of them into key ideas of around 200-300 words" | `summary`, `abstract`, `digest`, `brief`. The most successful coinage in the category: short, ownable, and it names a *duration* metaphorically (the blink of an eye) rather than an operation (summarising) |
| **`to blink`** (verb) | "the most compelling ideas **to blink**"; `How do you choose which books to **Blink**?` | The noun has become transitive in public copy. Also inconsistently capitalised (`to blink` lowercase in one article, `to Blink` capitalised in a title) |
| **`key ideas`** | The sub-unit: 7–8 per Blink, 200–300 words each | Headway's `key points` / `key insights`. Near-identical concept and name — the category has converged on `key <noun>` for the sub-unit |
| `key insights` | Used interchangeably with `key ideas` in marketing | Two names for one sub-unit, same drift as Headway |
| **`explainer`** | The genre noun applied to a Blink, twice | `summary`. Load-bearing for the copyright argument: an explainer is *about* a work, a summary is *of* it |
| **`Guides`** | "Let a pro lead you through today's must-know topics"; "expert-led guides & exclusive insights"; described as having "interactive tools and activities" | `Courses`, `Masterclasses`. `Guides` implies a companion rather than a curriculum |
| **`Spaces`** | User-created shareable playlists: "Make a learning playlist for yourself, share with others... or follow thought leaders' Spaces" | `Lists`, `Playlists`, `Collections`. Chosen for the social connotation; glossed *as* "a learning playlist" in the same sentence that introduces it — the same borrow-a-known-model trick Memrise uses for Wordlists |
| **`Shorts`** | 5 items/day, ~1 min each, mixed quiz/quote/video, refreshed every 24 hours | **Name collision with Headway's `Shorts`** (4 interactive formats). Two direct competitors, identical coinage, different definitions — the clearest evidence in this batch that the category is converging lexically |
| **`Daily Pick`** | The free tier's single daily title, with a user-settable reminder time | Headway's `Free Daily Read`. Same mechanic, both capitalised, both naming the *entitlement* rather than the tier |
| **`Weekly Goals`** | The habit mechanic: user-set number of distinct days per week | `Streak`, `Daily goal`. The period choice *is* the differentiator (T4) |
| `streak` | Retained, but redefined as weeks: "how many **consecutive weeks** you've successfully met your target" | Redefining an inherited category term rather than rejecting it (Memrise) or adopting it unchanged (Headway) |
| `on track` | Mid-period progress state | `In progress`, `Behind` |
| **`Blinkist AI`** / `Blinkist AI Assistant` | The PRO-exclusive summarisation tool | Two forms, one feature |
| **`Infographics`** | A Platinum content format, praised in two home-page testimonials and **never defined on the marketing site** | Documented only in the Platinum help sub-collection |
| **`Blinkist Live`** | A Platinum feature, help-only | Undefined publicly |
| `Premium` / `PRO` / `Platinum` / `Basic` | Four entitlement tiers | `Basic` is used diagnostically in help ("you might be logged into a Basic account") but never marketed — an internal state name leaking into user-facing copy, which here is actually useful |
| `Premium Sharing` | The second-account benefit, as a named feature | The feature is named in help but the benefit is absent from the pricing card (T10) |
| `titles` | The umbrella noun for Blinks + podcast summaries + Guides | `content`, `items`. `titles` borrows publishing vocabulary and works across formats |
| `Company Collections` | A Business-tier curation feature | |
| `Upskillers` / `Leaders` / `Lifelong learners` | The three marketed audience segments, used as testimonial headings | `Professionals`, `Executives`, `Learners`. `Upskillers` is an agent-noun coinage from a verb phrase |
| `Kindle Connection` | The Kindle-send integration, as a named help collection | `Send to Kindle` |
| `Simplify` | The company podcast | |
| `Fin` | The support AI, disclosed by vendor name | |

**Register and system analysis.** Blinkist's coinages are **short, concrete, and almost all plural nouns**: `Blink`, `Guides`, `Spaces`, `Shorts`, `Infographics`, `titles`. None is a metaphor requiring explanation, and three of them (`Guides`, `Spaces`, `Shorts`) are ordinary English words repurposed — which is cheaper to learn than an invented word but risks collision (and has collided, with Headway).

The system's real strength is **hierarchical legibility**: `titles` (everything) → `Blinks` / `Guides` / `Shorts` (formats) → `key ideas` (units within a Blink) → word counts. A user can locate any piece of content at the right level. This is the direct basis for the corpus's stated benchmark strength on information hierarchy, and it is the one thing Headway conspicuously lacks (Headway has `Shorts`, `Recaps`, `Highlights`, `Gems`, `Collections` — five sibling formats with no parent noun and no stated hierarchy).

The weakness is at the tier level: `Premium` / `PRO` / `Platinum` is a metals-and-adjectives ladder with no semantic ordering a user could infer (is Platinum above or below PRO?), which is exactly why the help centre needs `Can I upgrade to Platinum from a Premium or PRO subscription?` and `Can I downgrade from Blinkist Platinum to PRO or Premium?` as separate articles. Two help articles existing to explain the direction of your own tier ladder is a naming failure.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company — and the company appears in adverse copy, which is the test: "We're sorry to hear you'd like to leave!", "We **cannot guarantee** refunds", "We'll discontinue support for iOS 16 & 17", "We've automatically applied a discount". Present tense dominant.

**Register — three gradients, well controlled** `[observed]`

1. **Acquisition marketing** — em-dash-heavy, imperative, exclamation-light, with a distinctive use of the **negated alternative**: "in minutes—not hours or days", "Forget carving out time.", "sleepier, not smarter", "learn faster and smarter". Blinkist's house rhetorical figure is the antithesis.
2. **Help centre** — plain, instructional, bolded UI nouns, numbered steps, and **consistent use of `Please note:` as a caution marker** (three instances observed). Contractions used freely. Warmth is rationed to one sentence per article at most.
3. **Legal / disclosure** — `By proceeding you accept that...`, `as per our 14-day money-back guarantee`, the German carve-out. Formal, no contractions, no personality.

**The tone flattens as stakes rise**, correctly. The cancellation article opens with one sentence of regret and then becomes purely procedural. The refund exclusions are three bolded negatives with no softening. Contrast Memrise, which puts "🙂" and an exclamation mark at the top of a billing article.

**Where the register slips** `[observed]`: `10x your Productivity with Blinkist AI Assistant` and "It's a **productivity game-changer**" in an FAQ answer. Two instances of unbounded marketing superlative, both attached to the AI feature — the newest part of the product, and the only part with no disclosure copy. The correlation is worth noting: the feature with the loosest claims is the feature with the thinnest governance.

**`Learn in a way that feels as fun.`** — a dangling comparative shipped live in the Shorts article (`as fun` with no second term). And `before bed` twice in one pricing-FAQ sentence. And `How can I turn on or off the push notifications ?` with a space before the question mark. Three small copy defects in maintained content.

**Numbers as trust devices** `[observed]`: `9,000+` titles · `15 minutes` · `200-300 words` per key idea · `7-8 key ideas` per Blink · `5` Shorts/day · `~1 minute` each · `25` per week · `10+ years` · `4.76` / `96k` (App Store) · `4.7` / `177k` (Google Play) · `95%` / `91%` / `87%` · `$0.38 a day` · `14 days` · `24 hours` · `14 business days` · `7-day` trial. The **content-structure numbers** (200–300 words, 7–8 key ideas) are the distinctive set — no other product in this batch publishes the internal dimensions of its unit. The **member-count numbers are the unreliable set** (31M / 32M / 44M — see T10).

**Accessibility content** `[observed]`

- **`Skip to main content` is present and first in the DOM on `support.blinkist.com`** — correct practice. It is **absent from `www.blinkist.com`** on both the home page and the pricing page. The help centre (a third-party Intercom template) is more accessible than the pages Blinkist built.
- **The `Accessibility` page is published, linked in the footer of every page, and returns an empty body.** `https://www.blinkist.com/en/accessibility` serves the site chrome (header, footer, `Powerful ideas— 15 minutes at a time` tagline) and **no content between them**, with `<meta name="robots" content="noindex, nofollow">`. The page canonicalises to `/accessibility`.

  This is the most serious defect found in this file. An accessibility statement is the one page whose absence is self-indicting: the product advertises a commitment in its footer on every page and the destination is blank, and is deliberately de-indexed so it cannot be found by search either. Recorded as a defect rather than a fetch failure because the surrounding chrome rendered normally and the `noindex` directive is an affirmative choice. It is possible the content is client-rendered; if so, an accessibility statement that requires JavaScript to read is itself the finding.

- **Alt text is mixed.** Good, scene-level, and format-aware where it matters:
  - `A screen shot of the Blinkist app open at a blink`
  - `A collection of images representing Blinkist's expert guides format`
  - `A screenshot of the Blinkist app showing a Blinkist space: a user created, shareable playlist of content` — the best alt string in this batch: it names the object, its provenance, and its function
  - `A person driving a car whilst listening to blinks on Blinkist` · `A person cleaning their kitchen whilst listening to blinks on Blinkist` · `A person doing yoga whilst listening to blinks on Blinkist`
  - `Apple CarPlay and Android Auto logos`
  - Weak: `A Blinkist user` used three times for the three testimonial portraits — technically accurate, conveys nothing, and the adjacent segment heading supplies the meaning, so it is defensible rather than wrong.
  - Problem: `brand logos from TikTok, Booking.com, Microsoft, Lyft, Babbel, Tier, LinkedIn, and Zalando` and `company logos for Microsoft, Atlassian, Cisco, AWS, ISC2, and CompTIA` — **eight and six claims compressed into one image each**, so the entire trust signal is unavailable to anyone not loading images, and unverifiable per-brand.
- **The pricing page's price stack is typographically fragmented** (`$0` / `.38` / `a day` as separate elements). How a screen reader renders that is untested, but three separate text nodes forming one number is a known hazard.
- **Emoji reaction controls carry text labels** (`Disappointed Reaction😞`) — correct.
- **The reading-experience settings inventory is the real accessibility story**: font size, background colour, playback speed (documented range), autoplay, sleep/night timer, offline download, Kindle send, e-reader send, CarPlay. Eight-plus user-controllable display and playback affordances, each with its own help article. For a text-and-audio product this is substantive, and it is *more* than the empty statement page would suggest.
- **Four help-centre languages** (en, de, es, pt-BR) with the selector rendered twice in the DOM — a duplication that screen-reader users may encounter as two language menus.
- **`Do Not Sell Or Share My Personal Information`** and `Cookie Consent` are first-class footer links (CCPA / GDPR). Privacy disclosure is handled better than accessibility, the same imbalance found in Headway.

**Negative findings, recorded honestly**

- **The `Accessibility` page is empty and `noindex, nofollow`**, while linked from every page footer. Highest-severity finding.
- **`You can cancel anytime in your Settings`** on the pricing plan card versus **`up to 24 hours before the end of the current billing period`** in the FAQ on the same page. A material cancellation term contradicted within one screen.
- Trial cancellation stated as **"at any time before it ends"** (home FAQ) and **"up to 24 hours before the end of the trial period"** (help, twice) and **"at least 24 hours before the trial ends"** (Apple path).
- **The cancellation how-to does not state the 24-hour deadline for the website channel** — the one channel Blinkist controls.
- **Member count published as 31M, 32M, and 44M** across two pages; the largest figure sits on the pricing page.
- Ratings blended and unattributed on the home page (`4.7 Stars`), attributed with counts on the pricing page (`4.76` / `96k`, `4.7` / `177k`).
- **Nonfiction claimed in every headline; fiction titles and fiction topic categories listed in the same page's footer**, with no acknowledgement anywhere. Headway discloses its equivalent drift; Blinkist does not.
- **`Blinkist Platinum` is a paid tier documented in six help articles and absent from the pricing page**, and two home-page testimonials praise `Infographics` — a Platinum feature never defined on the marketing site.
- **The free tier is absent from the pricing page** entirely.
- **`Premium Sharing` (a second free account) is claimed in the home FAQ and missing from the PREMIUM plan card.**
- `Premium` / `PRO` / `Platinum` tier ladder has no inferable ordering, requiring two help articles to explain its own direction.
- **`Shorts` collides with Headway's `Shorts`.**
- `key ideas` / `key insights` — two names for one sub-unit.
- `to blink` / `to Blink` — inconsistent capitalisation of the verb form.
- `Blinkist AI` / `Blinkist AI Assistant` — two names.
- **No AI accuracy or output-reliability disclosure anywhere**, despite a four-article `Blinkist AI` collection and a user-supplied-content summarisation feature.
- `10x your Productivity` — the only unbounded multiplier claim on the site, unfootnoted.
- `Experiencing Issues with the app?` / `Experiencing issues with the website?` — inconsistent capitalisation of one title pattern.
- `Learn in a way that feels as fun.` — dangling comparative, live.
- `before bed` twice in one sentence, pricing FAQ.
- `How can I turn on or off the push notifications ?` — space before the question mark.
- `Popular topics` / `Trending topics` / `Featured topics` — three headings over the same object type with no stated basis.
- `Skip to main content` present on the Intercom help centre, absent from the Blinkist-built marketing pages.
- Eight-brand and six-brand trust claims delivered as single composite images.
- **The entire 156-article help corpus is attributed to one named author** — a content-ops single point of failure, visible in the collection metadata.
- `Pricing` is absent from the global nav.

---

## Transferable patterns

1. **Publish the internal dimensions of your unit.** `A Blink` = 7–8 `key ideas` × 200–300 words ≈ 15 minutes. Three levels named and sized, so a buyer can compute what they are getting and a sceptic can audit the compression ratio. This is the batch's best answer to "what exactly am I buying?" and it transfers to any product selling a bounded artefact — a report, a review, a summary, a digest.
2. **Make the streak period longer than a day.** `Weekly Goals` keeps a streak's motivational pull while removing daily jeopardy, and the goal is user-set via a `+`/`-` stepper with an `Edit` affordance. Of the three habit mechanics in this batch (Memrise removed streaks; Headway lowered the daily minimum; Blinkist lengthened the period), this is the only one that keeps the mechanic and fixes the anxiety. Condition: requires content units long enough that a daily cadence would feel punitive.
3. **Put `Cancel Subscription` in the footer of every page.** Four items into `Useful links`, beside `Pricing` and `Contact & Help`. One link, one step, no retention interstitial in the documented flow. The strongest single trust signal available to a subscription product, and the cheapest.
4. **Explain the payment artefact that appears after the user acted to prevent it.** The pre-authorisation paragraph — name the mechanism, gloss it in quotes, state its purpose, give the reversal window in days, attribute the delay to the third party, link their documentation. Reusable verbatim in structure for holds, pending charges, and reversal timelines.
5. **Ask the accusation as your own help title.** `What about copyrights? Are you stealing from authors?` Then answer in four moves: transformation, partnership + revenue share, self-limitation with a metaphor, and an invitation with a real destination. Condition: only works if you can actually answer it — Headway posed the same question and shipped an email address, which is worse than not asking.
6. **`A robust movie trailer for books.`** One metaphor that carries incompleteness, derivation, promotion, and non-substitutability simultaneously, in a register users accept. The model for explaining any deliberately partial artefact.
7. **Name your guarantee, then name its exclusions in the same breath.** `14-day money-back guarantee` + "only applies to first-time purchases, **not to auto-renewals**". Stating the limit that matters most, unprompted, converts a hedge into a credible commitment.
8. **Publish jurisdiction-specific rights where they exist.** The German carve-out states the eligibility test as a plain conditional, gives both effective dates, and gives a different remedy per purchase channel. Better than applying the strictest regime globally and better than burying it in a ToS annex.
9. **Split help-title register by article purpose, not by surface.** Imperative/gerund for feature discovery (`Build a learning habit with Weekly Goals`), first-person symptom for failures (`I was double-charged`), questions for policy. The most sophisticated help-IA decision in this batch.
10. **`I bought, can't use / Subscription not recognized`.** Slash-join the user's clipped utterance to the system's term so one title serves both search and support. Also: `I forgot my password! How can I reset it?` — an exclamation mark inside a help title, voicing panic before supplying the task.
11. **Ship a "what remains" article for every terminating action.** `What happens to my titles when I delete the app?` and `Will the Blinks I sent to Kindle remain after my subscription ends?` Products document how to leave and never document what survives.
12. **Explain a missing control as a correct absence.** "you won't see the option to cancel your subscription: you are using the subscription at no cost to you, and there will be no need for you to cancel." Better than a disabled button and far better than nothing.
13. **Counter-example: the published-and-empty page.** An `Accessibility` link in every footer resolving to a blank, `noindex` page is worse than no link at all, because it converts an omission into a broken promise. Use as the cautionary exhibit for any commitment surfaced in global navigation.

## Caveats & gaps

- **The funnel is unobserved.** `/en/onboarding/matrix` and the paywall were not entered (no sign-up, no payment). The purchase-confirmation control is **not in the pricing page's server HTML**, so the actual consent string at the moment of purchase — the single most important artefact for negative-option compliance — was not captured. Whether the intro-offer disclosure sits above or below that control is unverified. A logged-out browser-rendered pass to the paywall would resolve this without payment and should be the next step.
- **In-app cancellation UI is `[documented]` only.** `/nc/settings` was not loaded, so the actual control, its placement, step count, and any retention interstitial are unknown. The documented flow shows no save-attempt; whether the live flow does is untested, and that is exactly where category complaints originate.
- **The Accessibility page's emptiness could be client-rendering.** Recorded as a defect on the evidence available (chrome rendered, body empty, `noindex, nofollow` set). A browser-rendered pass would confirm whether content exists behind JavaScript — but an accessibility statement requiring JavaScript is itself a finding.
- **Terms of Service, Privacy Policy, and Legal Notice not fetched.** The ToS governs the auto-renewal and refund terms that the help centre summarises; the 24-hour rule and the 14-day guarantee are recorded here from help copy, not from the binding document. Any discrepancy between them is unassessed.
- **Only 8 of ~156 help articles were opened.** Titles were captured for `Using Blinkist` (67) and `Subscriptions` (38) in full, so T11's IA analysis is well-founded, but the bodies of `How do you create the Blinks?`, `How do you choose which books to Blink?`, `My credit card was declined.`, `How does the 14-day money-back guarantee work?`, and the entire `Blinkist AI`, `Known Issues and Updates`, `Blinkist Business`, and `Privacy and security` collections are unread. The AI-disclosure gap noted in T10 is therefore **a gap in the public marketing surface**, and the four `Blinkist AI` help articles may contain accuracy caveats not reflected here.
- **`Blinkist Platinum` pricing and positioning are unharvested.** The tier is documented in help and absent from `/pricing`; whether a separate Platinum landing page exists was not checked.
- **`Blinkist Business` (22 articles) not harvested** — the B2B surface has its own IA, its own pricing model, and its own `Company Collections` vocabulary.
- **No summary content was examined or reproduced**, by design. All statements about Blink structure (`7-8 key ideas`, `200-300 words`, `15 minutes`) are Blinkist's own descriptions of its format, not derived from reading any Blink.
- **Category, topic, and title pages not harvested** (`/content/categories/*`, `/content/topics/*`, `/books/*`). Per-title disclosure — author attribution, publisher credit, the Amazon-equivalent buy link, any "read the full book" prompt — is unassessed, which is a real gap given the copyright argument rests partly on encouraging original purchases.
- **The self-reported efficacy study is not obtainable.** `Based on internal study using survey data from general Blinkist customers` is the entire methodology disclosure; there is no n, no date, no link. No judgement is offered here on whether the 95/91/87 figures are supported, only on how they are sourced and bounded.
- **Brand trust claims are unverifiable.** The eight customer logos are a single composite image; no case studies were fetched.
- **Only `en` harvested.** The site offers `pt` as an alternate locale and the help centre four languages; localisation of `Blink`, `Shorts`, `Spaces`, `Daily Pick`, and `Weekly Goals` is unknown, and the German market has materially different cancellation rights whose German-language presentation was not checked.
- **Mobile app store listings out of scope.**

## Sources

1. https://www.blinkist.com/
2. https://www.blinkist.com/pricing
3. https://www.blinkist.com/en/accessibility
4. https://support.blinkist.com/en
5. https://support.blinkist.com/en/collections/10716385-using-blinkist
6. https://support.blinkist.com/en/collections/10716455-subscriptions
7. https://support.blinkist.com/en/articles/10033202-what-is-a-blink
8. https://support.blinkist.com/en/articles/10033219-what-about-copyrights-are-you-stealing-from-authors
9. https://support.blinkist.com/en/articles/10033387-how-do-i-cancel-my-subscription-or-free-trial
10. https://support.blinkist.com/en/articles/10033383-is-there-a-cancellation-period
11. https://support.blinkist.com/en/articles/10033382-does-the-subscription-auto-renew
12. https://support.blinkist.com/en/articles/13764488-build-a-learning-habit-with-weekly-goals
13. https://support.blinkist.com/en/articles/10080589-what-are-shorts
