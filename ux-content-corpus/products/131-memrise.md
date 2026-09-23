# 131. Memrise

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Language learning (video-native, native-speaker clip corpus + spaced repetition + AI speaking practice) |
| Primary URL | https://www.memrise.com/ |
| Corpus rank | 131 |
| Benchmark strength (source list) | Bite-sized practice prompts |
| Locale / market observed | en (UK-inflected spelling: `organisation`, `personalised`, `Romanisation`, `prioritise`) |
| Platform observed | Web marketing (HubSpot CMS), web help centre (HubSpot), Next.js course pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | n/a — no financial or health regulator. CEFR and named exam boards (IELTS, GCSE, A-Level, IB) referenced as content standards, not regulators |
| Harvest date | 2026-09-21 |
| Pages inspected | 6 |
| Harvest completeness | Partial — pricing is behind auth (`app.memrise.com/payment/plans` requires sign-in), so no price points, no plan-page copy, and no cancellation UI copy were reachable. Help-centre answer bodies WERE reachable (unusual and valuable). In-product strings are `[documented]` from help articles. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://www.memrise.com/ | Hero, "Our Tribe" persona grid, How It Works, Exam Prep, embedded FAQ block |
| Help centre / FAQ (index = content) | https://explore.memrise.com/help | Three categories, ~30 Q&As with **full answer bodies in server HTML** — richest single source |
| About us | https://www.memrise.com/about | Founder narrative, "research-driven organisation" claim, 7-question FAQ block |
| Spanish course page (template) | https://www.memrise.com/en/learn-spanish/spanish-course | Course-object metadata pattern, topic tag list, 7-question FAQ, Pro upsell |
| CEFR levels explainer | https://explore.memrise.com/cefr-levels-explained | **Title-tag/URL mismatch defect — see T14** |
| Community Courses (referenced) | https://community-courses.memrise.com/ | Named in help as the off-ramp site for deprecated content; not fetched directly |

---

## T1 Navigation & IA labels

**Global nav — content-type axis, not task or audience axis** `[observed]`

`Languages` · `Courses` · `Phrasebooks` · `Memrise blog` · `Log in` · `Start learning`

This is an unusual choice. Three of the four primary nav items are **the same 30-ish languages re-listed under a different content noun** — `Learn Spanish` / `Spanish Course` / `Spanish Phrasebook`. The nav is optimised for SEO surface area rather than for a user deciding what to do, and the result is a single dropdown carrying roughly 140 `Learn <language>` links, including constructed and fictional languages (`Learn Klingon`, `Learn Na'vi`, `Learn Dovahzul`, `Learn Quenya`, `Learn Toki Pona`, `Learn Lojban`).

**Footer — four-column grid that repeats the whole language matrix again** `[observed]`

Company/utility links are interleaved *into* the language matrix rather than grouped:
`About Us` · `Our Mission` · `Contact Us` · `FAQ & Help` · `Mobile app` · `Plans` · `Team` · `Memrise Blog` · `Press` · `Jobs` · `Engineering Blog` · `Learning a language` · `Phrasebooks` · `CEFR Levels` · `Community Courses`

**Defect** `[observed]`: the footer contains a long run of empty link elements rendered as `[](javascript:;)` — dozens of them, interleaved between language links. On the About and Home pages this produces a large number of unlabelled anchors in the accessibility tree. Recorded as a real finding, not a fetch artefact: they appear consistently across all three HubSpot-served pages.

**Help-centre IA — three categories only, each with a one-line scope** `[observed]`

| Category | Scope line (verbatim) |
|---|---|
| `Getting Started` | "All you need to know to get started on Memrise" |
| `Account Settings` | "Customise your learning and update your profile details" *(italicised)* |
| `Payments and Subscriptions` | "How to manage your subscription and solve payment issues" *(italicised)* |

Three categories is very lean for a product with this many named mechanics. Note what is *absent* as a category: nothing for troubleshooting, nothing for content/curriculum, nothing for the AI features. The scope line for `Payments and Subscriptions` is the only one that names the unhappy path ("solve payment issues").

**In-app IA, named in help** `[documented]`

Tabs: `Home` · `Lessons` · `Learn` · `Profile`. Sub-surfaces: `My Words` page (the book icon), `My Activities` (on Home), `Wordlists` (selector at the top of Lessons), `Learning Settings`, `Learning & sound settings` (iOS label — **differs from the web label `Learning Settings`**).

## T2 Value proposition & headline patterns

**Hero — the promise is *relevance*, not fluency, speed, or fun** `[observed]`

> Headline: `Learn a language for what you actually need`
> Subhead: "Pass an exam, progress at work, build relationships or just keep your brain sharp"

The adverb `actually` is carrying the entire competitive argument. The subhead is a four-item goal list where the fourth item (`just keep your brain sharp`) is deliberately the lowest-stakes one — it gives permission to a user with no instrumental reason, after three instrumental reasons have been offered.

**The differentiator is stated as a negation of a competitor category** `[observed]`

Section header: `Real native speaker videos, less robotic voices`
Body pull-quote: `Learn the language *real people* speak.`

Note `less robotic voices` rather than "no robotic voices" — a hedge, and also grammatically loose (`less` for a count noun). The meta description is blunter: "Unlike gamified apps with robotic voices, it's built around real native-speaker videos". The whole positioning is **anti-gamification**, which then creates a tension with the streak-adjacent `My Activities` feature (see T6).

**Persona-grid section — headers are character archetypes in the second person** `[observed]`

Section header: `Our Tribe: The Learners who thrive with Memrise`
Subhead: "Memrise is built for real humans with real reasons to learn and connect."

Six persona cards, each a noun phrase with a relative clause, then two-to-three lines of second-person body:

- `The Traveler Who Refuses to Be "That Tourist"`
- `The Student Who Wants to Ace their Exam`
- `The Professional Who Just Moved Abroad`
- `The One Who's in Love (with a Person or a Culture)`
- `The Heritage Speaker Coming Home`
- `The Lifelong Learner Keeping Their Mind Sharp`

This is the most distinctive content artefact on the site. Instead of feature blocks, the marketing page ships **six segments named as identities**, and the copy inside each is written to be recognised rather than to inform. `The One Who's in Love (with a Person or a Culture)` uses a parenthetical to widen the segment without renaming it. `The Heritage Speaker Coming Home` gets the only non-utility framing: "Learning your language isn't just about skill or utility. It's about remembering who you are."

The Lifelong Learner card is where the anti-competitor jab lands: "You've done the streaks and the repetition. You've tried the books."

**Locale defect** `[observed]`: `Traveler` (US) on the persona card, against `organisation` / `personalised` / `Romanisation` / `prioritise` / `Customise` (UK) elsewhere. Mixed orthography within one site.

**Course-page headline pattern — noun-phrase title + second-person outcome** `[observed]`

> `Spanish Language Course by Memrise`
> "Express yourself with confidence in Spanish"

Preceded by two chip-style metadata labels: `Free` and `All levels`. Content-volume claims are used as section *headings*, not as body copy: `1400+ lessons` · `9000+ words` · `1000+ videos` · `75+ AI conversations`. Each heading then gets one explanatory line, e.g. under `1000+ videos`: "Language immersion is the fastest way to learn. Watch native speakers and get used to their accents."

**Science/credibility framing** `[observed]`

- Course page: `Linguistic experts` — "Our Spanish course is created by expert linguists and is rooted in years of scientific research."
- About page section header: `We're a research-driven organisation`
- About page: "The secret formula? A deep understanding of neuroscience and memory techniques, combined with engaging learning content created by **linguistic experts and native speakers**."

Note that `years of scientific research` and `research-driven` are asserted without a single citation, study name, or link anywhere on the public surface. The founder credentials (Oxford, Princeton PhD, US memory championships) are offered *in place of* evidence. This is a softer version of the same pattern seen in 134 Elevate — credential-as-proxy-for-evidence — and is worth flagging for anyone writing efficacy copy.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Start learning` | Global nav (top right), footer | Primary acquisition label on marketing pages |
| `Start Course` | Course page, below course metadata | Course-scoped variant |
| `Start Learning` | Course page nav + sticky | **Title-case variant of the nav's `Start learning`** — same action, two capitalisations |
| `Start learning now` | Course page, "Multiple devices" block | Third variant of the same label, with urgency adverb |
| `Try Exam Practice` | Home, Exam Prep module | Feature-specific, verb-first |
| `Log in` / `Login` | Nav | **Two spellings on two pages** — `Log in` on Home, `Login` on About |
| `See our plans` | Course page, Pro upsell block | Deliberately soft — "see" not "upgrade" or "buy" |
| `Plans` | Footer | Bare noun for the same destination |
| `Upgrade` | In-app button, top of Home and Learn tabs | `[documented]` |
| `Subscribe` | Web app button, top of page | `[documented]` — **`Upgrade` in app vs `Subscribe` on web for the same action** |
| `Find out more` | Course page, Linguistic experts block | Bare, object supplied by section |
| `See more` | Course page, featured-content tiles | Bare, repeated 6× |
| `See Spanish Phrasebook` | Course page, under `9000+ words` | Fully specific — the good pattern |
| `Check out our jobs` | About page | |
| `Scroll down to see a list of the most popular FAQs` | Help centre H1 | An **instruction used as a page headline** — see T11 |
| `Restore purchase` | Payment screen, bottom right | `[documented]` |
| `Save` | Profile settings, top right | `[documented]` |
| `Log out` | Settings, bottom of list | `[documented]` |
| `Delete Account` / `Delete your account` | Settings | `[documented]` — two forms |
| `Submit a request` | Help, payment-failure path | `[documented]`, routes to Zendesk |

**Observation.** Memrise ships **four distinct capitalisations/wordings of its single primary CTA** (`Start learning`, `Start Learning`, `Start Course`, `Start learning now`) and two of its sign-in label. Several CTAs are rendered as HubSpot CTA *images* (`![Start learning](...cta/default/...png)`), so the label lives in alt text rather than in a button element — an accessibility and localisation smell worth recording.

## T4 Onboarding & getting-started

**PRIORITY SECTION.** Two distinct onboarding narratives exist, and they disagree.

**(a) Marketing "How It Works" — four steps, each a full second-person clause** `[observed]`

1. `Tell us your reason(s) for learning` — "Choose what you want to focus on"
2. `We teach you relevant words & phrases` — "Watch native speaker videos to understand real accents"
3. `Use our practice features to consolidate your learning` — "Pronunciation, verb conjugation, sentence building, listening and AI speaking practice"
4. `Feel ready to give it a go in the world` — "That first smooth coffee order. That grin when someone replies back. You're not "practicing" anymore. You're *communicating*."

Two things stand out. The parenthetical plural in step 1 (`reason(s)`) is doing quiet work — it pre-authorises multi-goal users before they worry that they have to pick one. And **step 4 is not a product step at all.** It is the off-product outcome, written as two sentence fragments and a reframe. Most four-step how-it-works sequences end at "start learning"; Memrise ends outside the app, and the final line explicitly retires the word the product is built on: "You're not "practicing" anymore."

The pronoun sequence across the four steps is also deliberate: `you → we → we/our → you`. The company appears in the middle two steps and withdraws at the ends.

**(b) Course-page "About this course" — three steps, imperative, no outcome step** `[observed]`

- `Choose scenarios` you want to prepare for and learn words
- Hear those words spoken by `native speakers`
- `Practice speaking` in private with your AI language partner

Note `AI language partner` here versus `AI language tutor` in the same page's FAQ and `MemBot` / `Communicate` in the help centre — **four names for one feature on one product** (see T13). Note also `in private`, which recurs as the emotional proposition for AI speaking practice: "Build up confidence in private by speaking with your AI language tutor." The value being sold is the absence of an audience, not the quality of the AI.

**The habit loop — deliberately NOT streaks** `[documented]`

`My Activities` is the progress surface, and the help copy is explicit that it is an anti-streak design:

> "It aims to help you build consistent learning habits without the pressure of maintaining streaks or earning points."
> "Traditional streaks and point systems can sometimes feel like pressure or guilt-trips."
> "No, My Activities doesn't send reminders or notifications. It's a quiet, guilt-free space where you can reflect on your progress whenever you like."

Tracked metrics are all past-tense participles, framed as things already achieved rather than targets outstanding: `Words learned` · `Words reviewed` · `Words hear in videos` *(sic — grammatical error in the live help copy)* · `Videos watched` · `Videos understood` · `Videos partly understood` · `Conversations completed`.

`Videos partly understood` is the standout metric name. Most learning products round comprehension to a binary; Memrise ships a **named third state for partial understanding** and counts it as progress. For a content designer this is the most reusable idea in the file: give the in-between state a name and credit it.

The honest admission in the same article is also notable: "While there's no formal goal-setting tool (yet!)..." — a documented capability gap, with a parenthetical, in the help centre.

**The bite-sized practice unit — `Lessons` planned 15 steps ahead** `[documented]`

> "Lessons are structured sequences of learning activities. They include a mix of content types, such as Learn, Review, Sentence Builder Buddy, Pronunciation Buddy, Videos, and Conversations. The goal is to keep your practice varied so you can use the language confidently in real-world situations!"
> "Lessons are put together by our logic system, which decides the best order for your activities. It plans up to 15 steps ahead, but the exact content... is loaded live as you go."

`our logic system` is the chosen phrase over "algorithm" or "AI" — a plainer, less loaded noun for the sequencer, even though the same product says "AI" freely elsewhere.

**Skippability is documented as a rule with a named exception** `[documented]`

> "Yes, you can skip the recommended activity in most cases."
> "Some lessons cannot be skipped, particularly Learn activities for new users who are just getting started."

**Spaced-repetition schedule published verbatim** `[documented]` — see T6.

## T5 Form & field labels

No public unauthenticated form exists beyond the language selector; the following are `[documented]` from help articles.

| Label / control | Surface | Notes |
|---|---|---|
| `Change your profile picture` / `Change your username` / `Change your email address` / `Reset your password` / `Connect to Facebook` | iOS Settings | Imperative-phrase rows, not noun labels |
| `Edit your username` / `Edit the email address associated with your account` | Web settings | Web uses `Edit`, iOS uses `Change` — **register split for identical fields** |
| `Choose the language the website will appear in` | Web settings | Full-sentence field label |
| `Change your timezone` | Web settings | |
| `Switch theme` (toggle) + `Use device settings` (toggle) | iOS Dark Mode | Two-toggle dependency: "You may need to toggle Use device settings off to see this." |
| `Romanisation toggle` | Learning Settings | Named as a toggle in prose, i.e. the control name *is* the feature name |
| `Jumbled word` tests | Web Learning Settings | |
| `Tapping tests` | iOS Learning Settings | **Same control, different name per platform**, and the help article has to gloss it three ways: "(aka 'jumbled words', or 'rearrange the words')" |
| `Prioritise typing tests in Review sessions` | Web Learning Settings | Full imperative sentence as a setting label |
| `Toggle Communicate Responses suggestion on/off` | iOS | |
| `Audio preferences` | iOS | |
| Number-of-words fields | Both | Three separate session types: `learning` session, `reviewing` session, `Speed review` session |
| `Known` / `Difficult` | Wordlist word states | User-applied labels, adjectives not verbs |
| `Word information` | Scenario three-dot menu | |
| `GOODBYE` | Account-deletion confirmation | See T10 — this is Headway's pattern, not Memrise's; Memrise's deletion flow is a plain `Delete Account` |

**Cross-platform settings divergence is disclosed, twice, as a note** `[documented]`

> "**Please note**: at the moment, customising your learning settings on web will not affect your settings in the app (and vice versa)."

The same caveat is repeated verbatim in the mirror article. `at the moment` frames a defect as temporary without committing to a fix.

**Duplicate-content defect** `[observed]`: the help page publishes the question "What are my Learning Settings and how can I change them on my iOS device?" **twice, consecutively, with byte-identical answers**. An obvious CMS duplication that has shipped to the live public help centre.

## T6 Status & state language

**Spaced-repetition intervals published as a user-facing string** `[documented]`

> `Next review in:` **4 hours > 12 hours > 24 hours > 6 days > 12 days > 48 days > 96 days > 6 months**
> "If you get an item wrong during a review, it will be moved back to the first interval (i.e. to be reviewed in 4 hours)."

Publishing the actual interval ladder — and the failure penalty — is a real transparency decision. The mechanism explanation leads with prediction, not with repetition: "The Memrise algorithm predicts when any given word or sentence is likely to fall out of your long-term memory and it's time for you to review it."

Note the register split: the marketing/About page says `spaced repetition` is "the research-backed principle that memories are strengthened most effectively when you review something at the right moment, just as you're about to forget it" — the same mechanic, rendered as a sentence a user can feel rather than a table.

**Named states** `[documented]`

| State | Applies to | Notes |
|---|---|---|
| `Active` | Wordlist | "At any given moment, one Wordlist is designated as "Active" for a language. This is the source of all your lessons and reviews." |
| `Wordlist Completed` | Wordlist terminal state | Rendered as a named screen: "you'll see a "Wordlist Completed" screen and can then choose your next Wordlist" |
| `Known` | Word | User-set; suppresses the item: "Mark words as "Known" to stop them from appearing in Learn and Review sessions." |
| `Difficult` | Word | User-set; **only available after completion** — "For words that are fully learned or marked as known, you can mark them as "Difficult" to prioritise them for extra practice." A state gated on a prior state. |
| `Videos understood` / `Videos partly understood` | Video comprehension | A three-valued rather than binary comprehension state |
| `FREE` / `PRO` / `"Words Added by Me"` | Wordlist tiers | Entitlement rendered as a content-type label |

**Progress language** `[documented]`: "See exactly how many words you've learned vs. how many are left to learn." The `X learned vs Y left` framing, with `exactly` as the trust adverb.

## T7 Error, failure & recovery

`[documented]` — payment failure is the only failure path with substantial public copy, and it is unusually well-structured.

**Payment decline — a three-tier diagnostic, ordered by who can fix it** `[documented]`

Article: `I'm having trouble completing the purchase`

1. *Check eligibility first* — confirm the payment method is even supported (Visa, Mastercard, Amex, PayPal on web; in-app purchase on mobile)
2. *Then three user-side checks* — "Your billing information is updated" / "You have enough funds to complete the payment" / "**Your payment method is enabled for recurring transactions/subscriptions (not all prepaid cards allow these types of charges)**"
3. *Then two escalations* — try a different method; contact your bank

The prepaid-card line is the standout. It names a specific, non-obvious failure cause that the user could not otherwise diagnose, and explains *why* ("not all prepaid cards allow these types of charges"). Directly transferable to any recurring-billing decline copy.

**A named-provider failure note** `[documented]`

> "Please also note: we have experienced that some users have issues processing payments via PayPal unless a credit/debit card has been linked to their account."

`we have experienced that` is a hedge that signals field-observed rather than documented behaviour — honest, and rare. Compare Wise's named-issuer decline article: same instinct, ship the specific known failure.

**Entitlement-not-granted recovery asks for the exact identifier** `[documented]`

Article: `My Memrise subscription with Google Play didn't activate` — three questions in the title ("having trouble accessing... not working... didn't activate?"), then a request for the Google order number **with its format spelled out**: `Order no. (GPA.XXXX-XXXX-XXXX-XXXXX)`, and where to find it ("You can find this information in your receipt from Google"), closing with "We can then manually activate your subscription."

Showing the identifier's shape, and naming the document it lives in, removes a whole support round-trip.

**Permission-failure recovery, including the invisible-prerequisite trap** `[documented]`

Article: `How can I enable microphone permission?` — recovery path for a user who tapped `Don't Allow`, then:

> "**Please note**: If Memrise doesn't appear in your Privacy settings on your iOS device, it means you haven't launched Pronunciation mode yet. **Memrise will not appear in your device's Microphone list unless you have launched the Pronunciation feature at least once.**"

This is the best error-recovery paragraph in the file: it anticipates the *instruction itself failing*, explains the OS behaviour causing it, and bolds the precondition. Most permission-help articles stop at "go to Settings → Privacy → Microphone."

**Feature-withdrawal copy** `[documented]` — see T9, `Will Memrise delete Community Courses?`

**Not found** `[absent]`: no validation-message copy, no in-app error titles, no 404 copy, no offline-state copy. The one non-JS fallback observed is bare: `Error — JavaScript not Loaded` / "You need to enable JavaScript to use the Memrise web product. We also have iOS and Android apps that we highly recommend." (`[observed]`, course page without JS) — note it recommends leaving the web product entirely as the remedy.

## T8 Empty states

`[documented]` — one, and it is a good one:

> "If the first activity has no content (such as Review with 0 words), you will be prompted to skip or do another activity."

A zero-state that resolves to a **choice between two forward actions** rather than to a message. `Review with 0 words` is also a rare instance of a product naming its own degenerate state in help copy.

Everything else is behind auth. `[absent]`

## T9 Notifications & system messages

**Feature-deprecation notice — a full user-facing migration narrative** `[documented]`

`Will Memrise delete Community Courses?` is the most substantial piece of change-communication on the public surface, and worth analysing as a pattern:

- Leads with what already happened and the hard date: "As of March 31st, 2024, these courses live on a dedicated site... and are no longer accessible via memrise.com or our mobile apps."
- Acknowledges differential impact rather than generic regret: "We understand that this change has impacted each of you differently, depending on the courses you were taking and the learning journeys you embarked upon."
- **States the original commitment, then the revision, and marks the revision in bold**: originally "until at least the end of 2024", now "**extending this timeframe to the end of 2025** to give you more time to access these resources."
- Closes with a commitment to further notice and a community line: "Rest assured, we will provide updates regarding any major changes. Thank you for being part of the Memrise community!"

Restating your own prior promise before revising it is the reusable move. Most products silently replace the old date.

**Beta / rollout banners inside help copy** `[observed]`

Two articles open with an identical warning-emoji banner:

> ⚠️**Note that the following information is about a feature currently only available to new users. Stay tuned as we roll out to everyone soon!**

Help documentation is being used as the **release-staging surface** — articles describing features the reader may not have. Honest, and it avoids the worse failure of documenting nothing, but it puts the burden of cohort-identification on the reader with no way to check which cohort they are in.

**Marketing-email and push opt-out copy, with the transactional carve-out** `[documented]`

> "**Please note**: even if you unsubscribe from marketing emails, we may still need to send you the occasional email related to important changes in the product or your profile, as well as transactional emails (such as password reset requests), as per our Privacy Policy."

Unsubscribe instruction is delegated to the email itself ("simply click the '**Unsubscribe here**' link at the bottom of any of our emails") and push opt-out is delegated to the OS — i.e. Memrise ships **no in-product notification-preference surface**, and says so implicitly.

**Explicitly absent by design** `[documented]`: "No, My Activities doesn't send reminders or notifications."

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** Memrise is the least aggressive subscription funnel in this batch, and the interesting findings are mostly about what is *missing* from the public surface.

**Plan structure** `[documented]`

Three plans, named as durations: `Monthly` · `Annual` · `Lifetime`. Also referenced once, inconsistently, as including `Quarterly`:

> "If you're already subscribed to Memrise Pro (Annual, Monthly or **Quarterly**), and wish to upgrade to Lifetime..."

**Defect** `[observed]`: `Quarterly` appears in the Lifetime article's plan list but the dedicated plans article says "We offer **three** subscription plans at Memrise: **Monthly**, **Annual** and **Lifetime.**" Two different plan inventories in the same help centre.

**Naming inconsistency across the entitlement itself** `[observed]`: the product is `Memrise PRO` / `Memrise Pro` in most copy, but the plans article says "All **Premium** memberships will give you access to all languages and scenarios", and the purchase URL is `/premium/`. `PRO`, `Pro`, and `Premium` all denote the same entitlement.

**No price is published anywhere on the public surface** `[observed]`. Every pricing question routes to an authenticated or store-side screen:

> "You can see all the available subscriptions, prices and payment methods for your country by tapping the ***Upgrade*** button on the iOS app or by visiting memrise.com/premium while logged in on the website."

The home-page FAQ answers `How much does it cost?` without a number: "You can start learning for free. Our paid plan unlocks extra features, but building confidence doesn't have to cost a thing. You can see a breakdown of what our plans cover here." — and in the fetched HTML, **"here" is not a link**. A dead pointer in a pricing answer.

**Auto-renewal and cancellation: the critical gap** `[observed]`

There is **no cancellation article and no auto-renewal disclosure** in the public help centre's `Payments and Subscriptions` category. The category contains nine articles covering how to *subscribe*, plan types, gifting, Lifetime, purchase troubleshooting, activation failure, and family sharing — and nothing on how to cancel.

Auto-renewal is acknowledged only obliquely, and only as a **warning attached to account deletion**:

> ⚠️ "**Please note that deleting your account** **will not cancel** **any active subscriptions. Before deleting your account, please ensure you have cancelled your membership's autorenewal.**"

This is the single most quotable compliance finding for Memrise: the product tells you that cancelling requires a separate action, and instructs you to do it *first*, but does not tell you how — and the one article that would (linked from the Lifetime piece as "Further instructions on how to do so can be found at this link") points at `memrisebeta.zendesk.com`, a **staging/beta Zendesk subdomain leaking into production help copy**. Several other in-copy links do the same (`memrisebeta.zendesk.com/hc/en-us/requests/new`, `memrisebeta.zendesk.com/hc/en-us/articles/...`).

On the positive side, the terms that *are* disclosed are clean and unusually pro-user:

- Lifetime is explicitly a one-off: "the amount will be charged as a **one-off upfront payment** **without any renewals**."
- The upgrade path's cost is stated plainly, including the loss: "We can end your current subscription so you can buy the Lifetime plan right away. However, **we won't be able to give you a partial refund for the unused time.**"
- The self-service upgrade route is stated as a *prerequisite chain*, not a button: "you will first have to cancel your current subscription, let it expire and then resubscribe at the end of the current period."
- Entitlement scope is stated against a plausible user fear: "Your Memrise membership applies to your username rather than specific languages."
- Cross-platform entitlement is stated twice, with the condition: "Subscribing on the website will also give you access to your membership on the mobile app (and vice versa). Simply sign in with the same username or email address!"

**Capability denials are stated flatly, with no euphemism** `[documented]`

- `Can I gift Memrise Pro to friends and family?` — "Unfortunately, it's not currently possible to purchase Memrise vouchers or a gift of a Memrise subscription for another person." Then a **workaround that invites credential sharing**: "if you ask permission to log in to your friend or family member's account, you can purchase a subscription for them with your payment details." Recorded as a genuine concern — official help copy recommending account sharing as a purchase workaround.
- `Why can't I share my Memrise subscription with my Family?` — "Memrise Pro is not currently set up to support **Apple's family sharing or Google Play Family Library** at this time."
- `Can I add or follow my friends on Memrise?` — "Unfortunately, we don't offer currently social features such as following friends or leaderboards in our app or website." (word-order error: "don't offer currently")
- `Can I save my conversations with MemBot?` — "Unfortunately, it is not currently possible... We are aware of this request. Please keep an eye out for updates!"

Four denials, all opening `Unfortunately` or `not currently`, three carrying `currently`/`at this time` as a temporal hedge. A consistent and defensible house pattern for "no": apologise once, state the limit, add the time-qualifier, offer the alternative if one exists.

**Data-protection statement inside a task article** `[documented]`

> "To assure the highest level of data protection, deleting your account will delete all personal identifiable information linked with the account."

Deletion is framed as a *privacy benefit* rather than a loss — the inverse of Headway's loss-framed deletion warning (see 132 T10). Both are defensible; the choice reveals what each product fears more.

**Efficacy claims and their hedging** `[observed]`

The strongest claim on the site is conditional, cohort-scoped, and quantified:

> "Here's what we've seen though: learners who spend 15 minutes a day continuing their learning, can confidently have a basic conversation in **2 months**."

Analyse the hedge stack: `Here's what we've seen` (observational, not causal) + `learners who spend 15 minutes a day continuing their learning` (a behavioural precondition, with `continuing` doing extra work) + `can confidently have` (capability, not guarantee) + `a basic conversation` (a deliberately modest outcome). Four hedges around one number. Compare the adjacent answer, which refuses to quantify at all: `How long does it take to get fluent?` → "The more you show up, the more fluent you'll feel." — **`feel` rather than `be`**, which is the whole trick.

Other claims and their bounding:
- `Will I really start speaking in the first week?` → "**Yes.**" then mechanism, then a softened close: "That first real-world conversation? Closer than you think." — a hard yes on speaking, an unquantified tease on conversation.
- Exam prep: "Receive detailed feedback from AI on how to improve your grade" and "The tool is trained on the exam board mark scheme" — a specific, checkable provenance claim, notably stronger than the generic "scientific research" claims.
- User-count claims drift: `80 million learners` (meta description, About, About FAQ) vs `over 80 million learners` vs the hero image filename `Web-60MM-HeroModule-Graphic`. **`364k users` for Pro** on the Spanish course page — an unusually small and unflattering number to publish, and to Memrise's credit it is published anyway.

**Legal footer** `[observed]`: `Terms of Use` · `Privacy Policy` · `Cookie Policy`. Three items, no accessibility statement, no cookie-consent banner copy in the server HTML.

## T11 Help-centre architecture

**A single-page accordion help centre, not a searchable article tree** `[observed]`

Everything lives on one URL (`explore.memrise.com/help`) as three category sections of expand-on-click Q&As. This is the inverse of the Wise/Zendesk model and has a real consequence: **the entire help corpus is in the server HTML**, so it is fully indexable and fully readable without interaction. For a harvest, this is the most generous help architecture in the batch. For a user with thirty questions on one page, it is a scrolling problem — which the page itself concedes in its H1.

**The H1 is a scrolling instruction** `[observed]`

> `Scroll down to see  a list of the most popular FAQs`
> "For a complete list and to chat with our assistant click on the button below"

Note the double space in the live H1 (`see  a list`). This is a page title that describes the page's own layout rather than naming the content — a symptom of the single-page structure, and a genuinely poor heading for screen-reader users landing on the help centre. `most popular FAQs` also implies a ranked subset without saying what the full set is; the "complete list" is deferred to a chat assistant behind an image CTA.

**Three-tier routing, with the bot first** `[observed]`

1. This page's accordions (most popular)
2. `chat with our assistant` (complete list) — an image CTA, label in alt text only
3. `submit a request` → `memrisebeta.zendesk.com` (human)

So the full help corpus is only reachable through a conversational agent. Self-service breadth is gated behind a bot.

**Two help destinations coexist** `[observed]` — the Home/About footers link `FAQ & Help` → `explore.memrise.com/help`, while the **course-page footer** links `FAQ & Help` → `memrise.zendesk.com/hc/en-us`. Same label, two different help centres, on the same site.

**Article-title grammar — four shapes, all user-voiced** `[observed]`

| Shape | Examples |
|---|---|
| `How do I …?` / `How can I …?` | `How do I subscribe to Memrise PRO?` · `How can I delete my account?` · `How can I enable microphone permission?` |
| `What are/is …?` | `What are Lessons?` · `What are Wordlists?` · `What is Word Information?` · `What is My Activities?` |
| `Can I …?` | `Can I upgrade from an Annual to a Lifetime subscription?` · `Can I gift Memrise Pro to friends and family?` · `Can I save my conversations with MemBot?` |
| First-person / possessive complaint | `I'm having trouble completing the purchase` · `My Memrise subscription with Google Play didn't activate` |

The fourth shape is the Wise "confession title" pattern, but applied to *system* failures rather than user mistakes — `My ... didn't activate` rather than `I entered the wrong...`. That is the correct adaptation: first-person for the user's experience of a failure, without implying fault.

`Why can't I share my Memrise subscription with my Family? (Family Sharing/Family Library)` is worth isolating: a `Why can't I` title with a **parenthetical containing both vendors' official feature names**, so the article matches whichever term the user searches.

**Nested sub-headings inside answers** `[observed]` — long answers are internally structured with bolded questions (`**How are Lessons organised?**`, `**Can I skip activities?**`, `**Do I need a subscription to use it?**`). The FAQ is effectively two levels deep inside a single accordion panel. `**Do I need a subscription to use it?**` recurs as a standard closing sub-question on feature articles, which is a smart convention: every feature explainer ends by resolving entitlement.

## T12 FAQs

Three separate FAQ blocks with **different tones and partly contradictory content**.

**(a) Home page — `Is Memrise for me?`** `[observed]`

The heading is the user's decision, not the content's topic. Seven questions, answers in the loosest register on the site:

| # | Question (verbatim) |
|---|---|
| 1 | What makes Memrise different from other language apps? |
| 2 | Do I need to know anything before I start? |
| 3 | Will I really start speaking in the first week? |
| 4 | How much does it cost? |
| 5 | How long does it take to get fluent? |
| 6 | Is Memrise good for travel, work, or relationships? |
| 7 | What if I already use other tools and resources to learn my new language? |

Ordering: differentiation → prerequisite anxiety → speed doubt → price → fluency timeline → use-case fit → **competitive coexistence**. Q7 is the unusual slot: rather than arguing for replacement, the answer endorses being one tool among several — "That's not a problem! Memrise works great as part of your language-learning stack." Q3's `really` is the page voicing the user's scepticism in the question itself, which is then answered with a bare "Yes."

**(b) About page — seven questions, a credibility register** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | What makes Memrise different from other language learning apps? |
| 2 | How does learning with native speakers actually work? |
| 3 | Can Memrise help me prepare for a language exam? |
| 4 | What languages does Memrise offer? |
| 5 | Is Memrise just a flashcard app? |
| 6 | How is Memrise built on science? |
| 7 | Can I use Memrise for work or professional development? |

Q5 (`Is Memrise just a flashcard app?`) is the best-written item across all three blocks. It **names the objection and concedes its historical truth** before rebutting: "No - and that's probably the most common misconception about us. Memrise started with vocabulary learning but the app has moved a long way from there." Then the pivot line: "knowing words isn't the same as being able to use them, and that's where the rest of the app comes in." Conceding the premise buys the rebuttal.

Q6's answer contains the sharpest competitive sentence on the site: "Streaks measure how often you show up. Spaced repetition measures whether what you learned last month is still there." Two parallel clauses, no adjectives, and it reframes the entire gamification category as measuring the wrong thing.

**(c) Course page — seven questions, transactional register** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Why learn Spanish? |
| 2 | Why should I learn Spanish with Memrise? |
| 3 | Where do I start when learning Spanish? |
| 4 | Will the Spanish lessons be tailored to my language level? |
| 5 | How much time will I need to commit to learning Spanish? |
| 6 | Do I get a certificate for completing the Spanish course? |
| 7 | Is it difficult to learn Spanish? |

Every question is language-templated (`Spanish` interpolated), so this block exists once per course. Q4's answer includes a rare expectation-setting sentence about difficulty calibration: "It should feel challenging at times, but won't be overwhelming."

Q6 is the one to steal. Memrise answers a "no" with a joke that reframes the need:

> "We do not offer certificates for learning with us. However, we're sure that the locals actually understanding you is all the street cred you'll need!"

A blunt no, then a substitute value. Contrast 135 LinkedIn Learning, where the certificate *is* the product (`12M LinkedIn members feature a credential on their profile today`) — the same question, opposite answers, and both defensible given the audience.

**Cross-block contradiction** `[observed]`: Q5 on Home says "learners who spend 15 minutes a day... can confidently have a basic conversation in 2 months"; Q5 on the course page refuses any figure — "As much or as little as you like." The commitment ask changes depending on which page the user landed on.

## T13 Terminology & glossary

**PRIORITY SECTION.** Memrise coins heavily, and the coinages are unusually *domestic* in register — "Buddy", "Tribe", "MemBot" — which fights the "authentic, useful, personalised" positioning.

| Term | Memrise's usage | The alternative it rejected / note |
|---|---|---|
| `Lessons` | "structured sequences of learning activities" assembled by the sequencer, planned 15 steps ahead | "modules", "units" — and note Memrise reclaims the most generic word in edtech for its most specific mechanic |
| `Wordlists` | "curated collections of vocabulary grouped by themes" — glossed in the same sentence as **"focused language playlists"** | "decks", "sets". The playlist gloss borrows a music-app mental model to explain a flashcard concept |
| `Scenarios` | The unit of learner intent (`Travel`, `Work`, `Food`, `Health`, `Relationships`, `Shopping`, `Social Life`, `Society`, `Sports`, `Opinions`, `Introductions`, `Basics`, `Education`, `Activities`, `Miscellaneous`) | "topics", "themes". Chosen because it implies a *situation you will be in*, not a subject you will study |
| `My Words` | The personal vocabulary page (book icon) | "Vocabulary", "Glossary" — possessive-first naming |
| `My Activities` | The progress surface, explicitly defined against streaks | "Stats", "Progress", "Streak". The most consequential naming decision on the product |
| `Words Added by Me` | PRO-only personal wordlist, glossed as **"your custom study deck"** | The label is a full first-person clause used as a list name — clumsy, but unambiguous about provenance |
| `Word Information` | The word-detail sheet | "Definition", "Details" |
| `Pronunciation Buddy` | Pronunciation practice activity | "Pronunciation practice/trainer". `Buddy` is the house suffix for AI-assisted activities |
| `Sentence Builder Buddy` | Sentence-construction activity | Same suffix, so `Buddy` reads as a *component class* rather than a character |
| `MemBot` | The conversational AI partner (help-centre name) | See below — four names for one thing |
| `Communicate` | The same AI feature, named as a mode: "If you want to use **Communicate/MemBot**, Memrise will ask for permission to access your microphone" | The help copy has to slash-join two of its own names in one sentence |
| `AI language partner` | Course page, "About this course" | |
| `AI language tutor` | Course page, FAQ and feature block | **Four names in play for the AI speaking feature**: `MemBot`, `Communicate`, `AI language partner`, `AI language tutor`. `partner` and `tutor` appear on the *same page*. A clear terminology defect, and the most useful negative finding in this file |
| `Speed review` | A distinct session type with its own length setting | "Timed review" |
| `Tapping tests` / `Jumbled word` / "rearrange the words" | One test type, three names, platform-split | Help copy glosses all three together — evidence the team knows it is broken |
| `Romanisation toggle` | Script-vs-Latin display switch | "Transliteration". `Romanisation` retained (UK spelling) then immediately explained via example: "if you are studying Korean, the toggle lets you choose whether to see the words in their original Korean characters or in a more familiar romanised version" |
| `Phrasebooks` | A first-class nav content type, and a per-language SEO surface | "Dictionary" — though the footer link `Phrasebooks` points at `/dictionary`, so the URL keeps the rejected word |
| `Our Tribe` | The user community, as a marketing section head, plus "build your own tribe fast" in body copy | "community", "members". A loaded word used twice |
| `Memrise PRO` / `Memrise Pro` / `Premium` | The paid entitlement | Three forms, one entitlement (see T10) |
| `Community Courses` | User-generated content, now migrated off-platform | Retained as a name even after deprecation, so the term now denotes an archive |
| `our logic system` | The lesson sequencer | "algorithm", "AI" — deliberately plainer for the scheduler while "AI" is used freely for the chat feature |
| `Grandmaster of Memory` | Founder credential, capitalised as a title | About-page credibility device |

**Register analysis.** Memrise's coinages split cleanly into two families: **possessive/domestic** (`My Words`, `My Activities`, `Words Added by Me`, `Buddy`, `Tribe`, `MemBot`) and **instructional/flat** (`Lessons`, `Review`, `Scenarios`, `Wordlists`, `Speed review`). The domestic family clusters on features involving the learner's own effort or embarrassment — practice, pronunciation, progress — where reassurance matters. The flat family covers curriculum. That gradient is defensible; what is not defensible is shipping four names for the AI tutor.

## T14 Voice, tone & accessibility

**Person and tense.** Second person throughout for the learner; first-person plural for the company, used as an active agent including in denials ("we don't offer currently", "we won't be able to give you a partial refund", "we have experienced that some users have issues"). Present tense dominant; the future is reserved for outcome promises ("You'll learn useful phrases fast").

**Register gradient — three distinct voices on one product** `[observed]`

1. **Marketing (Home / persona grid)** — heavily italicised emphasis, sentence fragments, em-dash asides, direct address, some slang: "*getting the vibe* wherever you land" · "so you sound *like you belong*" · "whisper sweet nothings in French" · "keep your brain *buzzing*" · "That grin when someone replies back."
2. **About page** — declarative, evidence-shaped, longer sentences, no italics-for-emphasis, named institutions and awards.
3. **Help centre** — instructional imperative, numbered steps, bolded UI nouns, emoji as wayfinding icons (👤 Profile, ⚙️ gear, ⭐ Pro, 📊 Learning Settings, 🔒 Password, ❌ Delete, ⚠️ warnings, 🙂 / 👀 / 🎉 sentiment).

Notably the tone does **not** flatten as stakes rise, which is the opposite of the Wise pattern. The `Payments and Subscriptions` help answers open with "Great to hear you're interested in subscribing to Memrise Pro! 🙂" — an emoji and an exclamation mark at the top of a billing article. Sentiment emoji also survive into the account-deletion and family-sharing denials.

**Emoji as UI wayfinding is a real pattern, not decoration** `[observed]`: help steps consistently pair an emoji with the UI element it names (`Select the 👤 **Profile** button`, `Tap the ⚙️ **gear icon**`). It works for sighted users and is redundant-but-harmless for screen readers since the text label is always present. The ⚠️ prefix is reserved for consequences (subscription-not-cancelled, beta-cohort) — a consistent severity signal.

**Numbers as trust devices** `[observed]`: `149 languages` · `80 million learners` · `189 different countries` · `1400+ lessons` · `9000+ words` · `1000+ videos` · `75+ AI conversations` · `45,000 native speaker videos` · `4.8 out of 5 / 177k ratings` (App Store) · `4.6 out of 5 / 1.47M reviews` (Google Play) · `364k users` (Pro) · `12` (team size, London). Store ratings are attributed to the specific store with the rating count — good practice. The `12`-person team size published alongside `80 million learners` is a deliberate underdog note.

**Accessibility content** `[observed]`

- **No accessibility statement anywhere.** Footer is `Terms of Use` / `Privacy Policy` / `Cookie Policy` only. `[absent]`
- **No `Skip to content` link** in the served HTML on any of the six pages. `[absent]`
- **Alt text is mostly filenames or absent.** Observed alt values on the Home page include `Web-60MM-HeroModule-Graphic-No-Sticker`, `Social Proof Stuff 2`, `cntraveler-Logo-white`, `BBC_Logo`, `Travolutionlogo`, `blue-underline.svg`, and the persona images carry `See who's in our tribe-3`, `student-passing-exam`, `8-1`, `9-2`, `11-1`, `10-1` — i.e. **CMS asset names shipped as alt text**, several of them meaningless (`8-1`, `9-2`). The persona cards are the main content of that section, so this is a substantive gap, not a decorative one.
- **Primary CTAs are images with the label in alt text** (`![Start learning](https://no-cache.hubspot.com/cta/default/...png)`, `![New call-to-action](...)`, `![Try Exam Practice](...)`). One of them has alt text of literally `New call-to-action` — an unedited HubSpot default shipped to production on the hero CTA of the home page. This is the single worst accessibility defect found.
- **Dozens of empty anchors** (`[](javascript:;)`, `[](<>)`) across the footer and persona grid.
- Course page (Next.js) is better: descriptive alt on rating badges (`Stars rated 4.8 out of 5`), meaningful alt on feature images (`1000+ videos`, `75+ AI conversations`, `Multiple devices`, `Linguistic experts`), and video elements carry visible text captions in the markup (`¿qué pasa?/what's up?`).
- **Dark Mode** is a documented user-facing setting, framed around two motivations: "Want to learn at night or save your phone's battery?"
- **Romanisation toggle** is a genuine accessibility/learnability affordance for non-Latin scripts, and is documented as user-controllable.
- Interface language is **not** independently settable on mobile: "The app will automatically detect your device's language settings... In order to use Memrise in another language, you will have to change your device's language settings." On web it *is* settable ("Choose the language the website will appear in") — another platform split.

**Negative findings, recorded honestly**

- `Start learning` / `Start Learning` / `Start Course` / `Start learning now` — four forms of one CTA
- `Log in` (Home) vs `Login` (About) — same action, two spellings
- `Upgrade` (app) vs `Subscribe` (web) — same action, two labels
- `MemBot` / `Communicate` / `AI language partner` / `AI language tutor` — four names, one feature
- `Memrise PRO` / `Memrise Pro` / `Premium` — three forms, one entitlement
- `Tapping tests` / `Jumbled word` / "rearrange the words" — three names, one test type
- Plan inventory stated as three plans in one article and four in another (`Quarterly`)
- `Learning Settings` (web) vs `Learning & sound settings` (iOS)
- `Change` (iOS) vs `Edit` (web) for identical profile fields
- One help question published twice, consecutively, with identical answers
- "Words hear in videos" — grammatical error in a live metric label
- "we don't offer currently social features" — word-order error in live help copy
- "less robotic voices" — `less` used for a count noun in a section heading
- `Traveler` (US) against `organisation`/`personalised`/`Romanisation` (UK) — mixed orthography
- Double space in the help-centre H1 (`see  a list`)
- `memrisebeta.zendesk.com` staging links in production help copy, including the *only* pointer toward cancellation instructions
- Two different help centres behind one `FAQ & Help` label
- "You can see a breakdown of what our plans cover here" — "here" is not a link
- CEFR explainer at `/cefr-levels-explained` serves `<title>` and `og:title` of **`Custom Wordlists on Memrise`** while its meta description is genuinely about CEFR levels — title/URL/description mismatch, and the og:image is named `cw landing page-1.png`. Looks like a repurposed landing page whose metadata was never updated.
- Help copy recommends logging into another person's account as a gifting workaround

---

## Transferable patterns

1. **Name the third state.** `Videos partly understood`, counted as progress alongside `Videos understood`, is the best idea in this file. Most products binarise comprehension, task completion, or verification status and lose the majority case. Condition: only worth it where the middle state is common enough that users will otherwise feel stuck at zero. Applies directly to partially-completed verification, partial refunds, and partially-matched disputes.
2. **Build the progress surface against the category default, and say so in the help copy.** "Traditional streaks and point systems can sometimes feel like pressure or guilt-trips" is a product decision published as help content. If you deliberately omit a mechanic users expect, documenting the *reason* converts an apparent gap into a stated value. Condition: requires the omission to be a real choice, not a backlog item — Memrise weakens this by admitting "there's no formal goal-setting tool (yet!)" two answers later.
3. **Restate your own prior commitment before you revise it.** The Community Courses notice quotes its own earlier promise ("Initially, we communicated that... until at least the end of 2024") then bolds the extension. Costs nothing, and is the difference between a date change and a broken promise. Directly applicable to deprecation, migration, and fee-change notices.
4. **Publish the mechanism's actual numbers.** The spaced-repetition ladder (`4 hours > 12 hours > 24 hours > ... > 6 months`) plus the failure penalty makes an opaque algorithm auditable. Condition: only where the numbers are stable and favourable to state; a schedule you intend to tune quarterly should not be published as a user-facing string.
5. **Anticipate the instruction itself failing.** The microphone-permission article explains why Memrise may be absent from the OS permission list, and bolds the precondition. Any help article whose steps depend on a prior state should carry the "if you can't see this, here's why" branch. Transfers to every OS-permission, bank-authorisation, and device-pairing flow.
6. **Name the specific, non-obvious decline cause.** "Your payment method is enabled for recurring transactions/subscriptions (not all prepaid cards allow these types of charges)" tells a user something they could not have diagnosed. Worth more than three generic troubleshooting bullets.
7. **Concede the objection's historical truth before rebutting it.** `Is Memrise just a flashcard app?` → "No - and that's probably the most common misconception about us. Memrise started with vocabulary learning but..." Owning the old identity buys credibility for the new one. Transfers to any product answering "isn't this just X?"
8. **Answer a capability "no" with a substitute value, not an apology.** The certificate answer ("the locals actually understanding you is all the street cred you'll need") works because the substitute is the thing the user actually wanted. Condition: the humour is load-bearing and will not survive a high-stakes context — do not use this shape where the absent capability has financial or compliance consequences.
9. **Counter-example to avoid: four names for one feature.** `MemBot` / `Communicate` / `AI language partner` / `AI language tutor`, two of them on the same page, is what happens when marketing, product, and support each coin independently. Use as the cautionary exhibit in terminology-governance arguments.

## Caveats & gaps

- **Pricing is entirely unreachable.** `app.memrise.com/payment/plans` and `/premium/` both require authentication, and no price appears on any public page. No plan-page copy, no checkout copy, no trial terms, no in-product cancellation UI copy was harvested. Any statement about Memrise's price points or trial-to-paid funnel would be invention and is therefore absent from this file.
- **No cancellation copy exists publicly.** The absence is itself the finding (T10), but it means the actual cancellation experience is unassessed. The one pointer toward it is a broken beta-Zendesk link.
- **The second help centre was not harvested.** `memrise.zendesk.com/hc/en-us` (linked from course-page footers) and `memrisebeta.zendesk.com` were not fetched. The public single-page help centre may be a curated subset of a much larger Zendesk corpus, which would change the T11 assessment materially.
- **CEFR page content not analysed.** The page was fetched but exceeded the read budget; only its metadata (which is where the defect is) was examined. Its body copy on CEFR levels A1–C2 is unharvested.
- **`learn-a-language` page not analysed** — fetched, oversized, not read.
- **In-product strings are `[documented]`, not `[observed]`.** All tab names, state names, settings labels, and empty-state copy come from help-article prose describing the UI. Where help copy quotes a string in bold or quotation marks it is likely verbatim; where it paraphrases, the actual UI string may differ.
- **Exam Prep detail is thin.** The `Try Exam Practice` destination was not followed. Claims about AI marking and exam-board mark schemes come from the home page and About FAQ only.
- **Persona-grid images failed to resolve** (`![...](<>)`), so alt text for four of the six persona cards was read as the CMS asset name with no image to check it against.
- **Mobile app store listings not harvested** — out of the public web surface per scope rules.
- **No locale variants inspected.** Memrise serves 23 interface languages; only `en` was harvested, so the mixed UK/US orthography finding is within-locale and the localisation quality of the coined terms (`Buddy`, `Tribe`) is unknown.

## Sources

1. https://www.memrise.com/
2. https://explore.memrise.com/help
3. https://www.memrise.com/about
4. https://www.memrise.com/en/learn-spanish/spanish-course
5. https://explore.memrise.com/cefr-levels-explained
6. https://www.memrise.com/learn-a-language
