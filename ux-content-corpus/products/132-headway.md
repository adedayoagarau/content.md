# 132. Headway

| Field | Value |
|---|---|
| Domain | `EDU` — Education and learning |
| Industry / sub-vertical | Non-fiction book summaries / microlearning subscription app |
| Primary URL | https://makeheadway.com/ |
| Corpus rank | 132 |
| Benchmark strength (source list) | Summary-based habit loops |
| Locale / market observed | en-US (site offers es, pt, fr, de, it, pl, ja variants) |
| Platform observed | Web marketing (Next.js + Storyblok CMS), web FAQ, legal pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not a regulated sector, but subject to auto-renewal / negative-option disclosure regimes (US ROSCA / FTC negative-option rules, EU consumer law). Operating entity is **GTHW App Limited, Limassol, Cyprus**, while the FAQ attributes ownership to "Headway Inc" — see T10. Copyright posture is material: the product resells compressed derivatives of third-party books. |
| Harvest date | 2026-09-21 |
| Pages inspected | 5 |
| Harvest completeness | Partial — the onboarding quiz (`/onboarding/start`) and the paywall were not entered (no sign-up, no payment), so the actual trial-offer screen, price-reveal screen, and in-app cancellation UI are unobserved. Everything else was reachable, including full FAQ bodies and full Subscription Terms. Zendesk help centre (`headway.zendesk.com`) not harvested. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Home / primary marketing | https://makeheadway.com/ | Hero, 7-day plan carousel, goal grid, embedded 8-question FAQ |
| FAQ (full) | https://makeheadway.com/faq/ | **~55 Q&As with full answer bodies in server HTML**, grouped into 7 sections — the richest source in this file |
| Subscription Terms | https://makeheadway.com/subscription-terms/ | 7 numbered clauses; auto-renewal, commitment plans, cancellation, refunds |
| The Science Behind Headway | https://makeheadway.com/science/ | Efficacy-claim surface; 6-question FAQ; email-gated preprint |
| App features / product detail | https://makeheadway.com/headway-app-features/ | Feature inventory, **published price list**, cancellation steps, competitor comparison table |
| Habit-building landing | https://makeheadway.com/headway-for-habit-building/ | Habit-loop copy and 7-question FAQ — the clearest statement of the streak mechanic |

---

## T1 Navigation & IA labels

**Global nav — content topics first, product second** `[observed]`

Primary: `Topics` (dropdown) · `Blog` · `For business` · `Get started`
Secondary bar: `Log in` · `About` · `Blog` · `Library` · `FAQ`

The `Topics` dropdown is an eight-item icon grid, and it is the most interesting nav artefact because **it mixes two destination types under one label**:

| Topic label | Destination type |
|---|---|
| `Self-growth` | `/library/topics/selfimprovement/` — content |
| `Apps & Digital Tools` | `/blog/apps-digital-tools/` — **blog** |
| `Business & Career` | `/library/topics/business/` — content |
| `Success` | `/library/topics/success/` — content |
| `Growth Tools` | `/blog/growth-tools/` — **blog** |
| `Psychology` | `/library/topics/psychology/` — content |
| `Communication` | `/library/topics/communication/` — content |
| `Relationships` | `/library/topics/relationships/` — content |

Two of eight "topics" lead to marketing blog categories rather than to the product library. A user browsing topics to find something to read will land on SEO articles twice out of eight. Note also that the nav slug for `Self-growth` is `selfimprovement` while the footer calls the same destination `Personal growth` — three labels for one taxonomy node.

**Footer — six groupings, one of which is a naming tell** `[observed]`

`Headway` · `Resources` · **`Headway's expertise`** · `Legal` · `Company` · `Languages`

`Headway's expertise` is the unusual one: a possessive-genitive category name containing `Headway science`, `Headway vs AI`, `Headway for self-improvement`, `Headway for burnout`, `Headway for habit building`. These are SEO landing pages, and grouping them under a claim of expertise (rather than "Guides" or "Learn more") puts an assertion into the IA itself.

**`Legal` grouping is unusually granular** `[observed]`: `Privacy policy` · `Terms and conditions` · **`Subscription terms`** · **`AI usage policy`** · `Gift card terms of service` · `Notice at collection` · `Do Not Sell or Share My Personal Information`

Breaking `Subscription terms` out as a **separate document from the general T&Cs**, and linking it in the footer of every page, is the single best compliance-UX decision Headway makes. Most subscription apps bury renewal terms in clause 8 of a monolithic ToS. A standalone, short, footer-linked subscription document is directly reusable.

**Footer content-discovery blocks** `[observed]` — a six-column pre-footer with its own groupings: `Apps & Learning` · `Editors' pick` · `Blog topics` · `Life skills` · `Recommended Reads` · `Summary topics`. `Editors' pick` notably contains two competitor-comparison articles (`Headway vs Blinkist`, `Is Blinkist worth it?`) — competitive SEO surfaced as editorial curation.

**Persistent top banner** `[observed]`: `Grow every day with a personalized plan.` + `Start here` — on every page, above the logo.

**In-app IA, named in FAQ and features pages** `[documented]`

Tabs / surfaces: `Profile` · `Library` · `Shorts` (tab) · `Activity` (tab) · `For You` · `Search` · `Highlights` (tab in Library) · `Saved for later` (carousel in Library) · `Collections` · `Audio queue` · `Recaps` · `Settings` (via `Gear` icon) · `App language` (setting) · `Delete account`.

## T2 Value proposition & headline patterns

**Hero — the unit of value is a *method*, not a library** `[observed]`

> Headline: `Transform your life with microlearning`
> Subhead (interpuncted list): `World's best ideas · 15 min a day · Listen or read · Anytime, anywhere`

The subhead is four noun phrases separated by middots — no verbs, no sentence. It reads as a spec sheet, and it front-loads the two numbers that constitute the offer (`15 min`, `a day`). `Transform your life` is the boldest outcome claim in this batch; it is completely unbounded, and it sits above a subhead that is entirely bounded. Claim high, then immediately shrink the ask.

**`microlearning` is the pivot word.** Headway has chosen to market a *pedagogical category* rather than a product benefit, and then built a whole page (`/science/`) to legitimise the category. Contrast Blinkist, which markets the artefact (`blinks`, `key ideas`). The strategic difference: Headway's claim survives even if you doubt book summaries, because the claim is about session length rather than about compression.

**Section headers are user-goal statements or capability statements** `[observed]`

`Listen to your first summary now` · `Learn from top nonfiction bestsellers` · `Choose your goals and start your self-growth journey` · `Join 55+ million learners worldwide` · `Got questions?  We've got answers.` · `Explore the Headway library` · `Not sure where to start?`

`Listen to your first summary now` is placed above a **playable audio sample with a working `.wav` and a `00:00` timer** — the CTA is satisfied on the page rather than behind signup. `Not sure where to start?` → "Answer a few questions and we'll pick your first summaries." converts indecision into the funnel entry.

**Three-benefit block — imperative heading + situational body** `[observed]`

- `Discover powerful ideas on the go` — "Driving, cooking or getting ready? Listen or read our 15-min summaries anywhere."
- `Get personalized recommendations` — "Enjoy daily content collections tailored to your needs"
- `Stay motivated to grow every day` — "Keep your streak and make real progress with small, daily steps"

Benefit 1 opens with a **three-item question fragment** naming physical activities, which is the house move for time-justification (repeated as "commuting, working out, or doing chores" in the FAQ and "Commuting, standing in a line, brushing their teeth, or even while floating in a pool" on the features page — the pool is doing a lot of work there).

**The goal grid — 12 goals in the user's own voice, some of them startling** `[observed]`

`Develop a CEO mindset` · `Stop wasting time` · `Be a better parent` · `Feel confident` · `Be the most interesting person in the room` · `Become a real man` · `Become well-spoken` · `Get rich` · `Be better in bed` · `Build healthy habits` · `Reach happiness` · `Become "that" girl` · `More goals`

This is the most revealing content artefact on the site. The register spans self-help cliché (`Build healthy habits`, `Reach happiness`) to bluntly transactional (`Get rich`, `Be better in bed`) to gendered-identity (`Become a real man`, `Become "that" girl` — note the scare quotes doing TikTok-vernacular work). A content designer should read this grid as evidence that Headway is optimising acquisition for **stated desire rather than stated need**, and is willing to publish the unflattering version of what users want.

**Named 7-day plans — imperative or mode-switch framing** `[observed]`

`Speak like a CEO` · `Be a better parent` · `Stop delaying, start doing` · `Turn on confidence mode` · `Have a fresh start` — each labelled `7-day plan`.

`Turn on confidence mode` treats a trait as a toggle; `Stop delaying, start doing` is a two-clause stop/start pair. All five are 7 days, which matches the free-trial length exactly — the plan duration and the trial duration are the same number, and nothing on the page acknowledges that.

**Habit-building landing page — a different, tighter voice** `[observed]`

> Eyebrow: `Build a Daily Learning Habit in 15 Minutes`
> H1: `Headway for Habit-Building`
> Body: "Start small, show up daily, and build a learning habit that holds up even on your busiest days."

Four feature cards whose headings are the mechanic's *purpose*, not its name:
- `A plan built around the habit you want`
- `A fresh insight every day to trigger the habit`
- `Interactive Shorts that test what you know`
- `3 minutes keeps the streak, and the habit, alive`

The fourth is the most transferable headline on the site: it states the **minimum viable session** as the headline number, undercutting the product's own 15-minute promise in order to lower the daily barrier. `3 minutes` and `15 minutes` are both load-bearing marketing numbers on the same product, aimed at different anxieties (time cost vs value received).

**Two lines worth isolating** `[observed]`

- "Finishing one summary feels good. Doing it for 30 days changes how you think." — short/long parallel, and the second clause is the only place a *cognitive* claim appears in marketing.
- "The daily insight serves as a trigger, so opening the app no longer feels like a chore." — Headway describing its own habit mechanic in behavioural-design vocabulary (`trigger`) **to the end user**. Unusually candid; most products hide the loop.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Nav, hero, and **repeated 6+ times down the home page** | Primary; every instance carries distinct `utm_section` / `test_home` params, so the page is instrumented per-slot |
| `Start here` | Persistent top banner | Softer variant, same destination |
| `Start my habit today` | Habit landing hero | **First-person possessive CTA** — the only one on the site |
| `Start your Headway journey` | Science page, bottom | Noun-phrase, journey metaphor |
| `Log in` | Secondary nav | Routes to a `onelink.me` app-deeplink, **not to a web login** — so "Log in" on the website hands you to the app store |
| `More goals` | Goal grid | Progressive disclosure |
| `More reviews` | Social proof | |
| `Collaborate now` | Science page | `mailto:insights.lab@makeheadway.com` — a research-partnership CTA on a consumer page |
| `Send me the PDF` | Science page, email form | See T5 — the only public form |
| `See why microlearning works` | Science page hero | Statement-as-CTA |
| `Explore more answers` | FAQ foot | Routes off-site to Zendesk |
| `Check out this article` | FAQ, pricing answer | Deflects a price question to a blog post |
| `View other plans` | In-app offer screen | `[documented]` — the label users must find to see anything other than the pushed plan |
| `Restore purchase` | Paywall, bottom right | `[documented]` |
| `Cancel Subscription` | iOS settings path | `[documented]` |
| `Cancel Subscription` (Headway web account) | Web account page | `[documented]` — see T10 for the inconsistency in *where* this button is said to live |
| `Highlight` | Reader and player | `[documented]` — same label in two contexts, which is correct |
| `Delete account` | Profile → Gear | `[documented]` |
| `Gift Headway` | Footer | |

**Observations.** `Get started` is used to near-exclusion on the home page — six or more instances of one label, each instrumented separately. That is an A/B-testing artefact rather than a content decision, and it means the page never tells a scrolling user anything new at the point of conversion.

Two CTAs are worth flagging as defects. `Log in` routing to an app-store deeplink means a paying web subscriber clicking the obvious control does not reach their account. And the FAQ answer to `How much does the Headway app cost?` ends with `check pricing on our website` linking to `makeheadway.com/` — **the home page, which contains no pricing** (the prices are on `/headway-app-features/`). A circular pointer on the single most commercially sensitive question.

## T4 Onboarding & getting-started

**PRIORITY SECTION.**

**The canonical sequence — four steps, and step 1 is a quiz** `[observed]`, from `/headway-app-features/`:

1. **`Take a quick quiz.`** — "When you sign up, Headway asks about your goals, interests, and challenges. Based on your answers, Headway builds a guided learning plan tailored to you. The plan's content is continually improved and may include book summaries or other interactive formats."
2. **`Read or listen to brief book summaries.`** — "Each summary distills the key insights from bestselling books into a bite-sized format. Choose between reading or listening — including on Apple CarPlay and Android Auto while driving."
3. **`Explore beyond book summaries.`** — Shorts tab, Collections, Search, Audio queue.
4. **`Build a daily learning habit.`** — "Track your progress with streaks, revisit key ideas with Recaps, save Highlights in both audio and reading modes, and keep growing at your own pace."

Then an unnumbered fifth: **`Get smarter recommendations over time.`** — "The more you use Headway, the better it understands what you need."

Two things. Each step heading is a **complete imperative sentence with a full stop** (the same punctuation choice as Wise). And step 1's second half contains an extraordinary piece of honesty for a marketing page: "The plan's content is continually improved and **may include** book summaries or other interactive formats." The product does not commit to what the personalised plan will actually contain. The same hedge appears in the FAQ, more starkly: "a guided personalized learning plan for web users, built from your quiz answers and **currently being iterated on (the summaries it includes now may be replaced with other interactive content types)**." Publishing "we may replace the thing you bought" inside a feature list is either admirable or alarming depending on your view; it is certainly rare.

**The personalisation is one-way** `[documented]` — FAQ `Can I create a personalized learning plan?`:

> "Not exactly — the content you see in the app is personalized for you, and you can't adjust it manually."

A "no" that opens with `Not exactly` rather than `No`, then draws the distinction the user actually needs (personalised *to* you, not *by* you), then splits by acquisition channel: web-quiz users get a quiz-shaped plan, app-direct users get goal-shaped recommendations. **The onboarding a user receives depends on which surface acquired them**, and Headway documents this rather than hiding it.

**The habit loop, fully specified** `[documented]` — this is the core of the benchmark strength.

> `How do Headway streaks work?` — "Read or listen to **at least 3 key points a day** (that's what each summary is built from) to keep your streak alive. We'll remind you when it's at risk, and you can even add colorful widgets to your phone to help the habit stick."

Unpack that. The streak unit is **not** a summary — it is `3 key points`, a sub-unit of a summary. So the daily commitment is roughly a fifth of the advertised 15 minutes. The features page makes the arithmetic explicit: "A single microlearning session takes as little as **3 minutes** to complete — so even on the busiest days, you can keep your streak alive and make progress."

The loop as documented across pages:

| Element | Copy |
|---|---|
| Trigger | "Every morning, Headway hands you one new idea tied to your goal." · `daily insights` |
| Minimum action | `3 key points` / `3 minutes` |
| Streak jeopardy notice | "We'll remind you when it's **at risk**" |
| Ambient reminder | `Motivational wallpapers`, `Widgets` — "Home-screen widgets surface your daily learning and keep your streak visible" |
| Retention reinforcement | `Recaps` ("resurface the core ideas from each summary"), `Highlights`, `spaced repetition` |
| Framing | "A gentle motivation system that helps you stay consistent **without pressure**" |

`at risk` as the streak-jeopardy state name is the most reusable string here: it is a warning that does not scold, and it names a state rather than issuing a command.

Note the tension: the mechanic is a streak with jeopardy notifications and home-screen surfacing, and the copy describing it insists it works "without pressure" and is "gentle". Compare 131 Memrise, which built `My Activities` explicitly to *avoid* "pressure or guilt-trips" and ships no reminders at all. Same category, opposite conclusions, and Headway's claim of gentleness is the weaker of the two positions.

**`Shorts` as the low-barrier entry format** `[observed]`: "Shorts drop you into real situations, a deadline you keep dodging or a confidence wobble, so you adapt based on answers." Described as `four interactive visual formats` — enumerated in the FAQ as "quizzes, interesting facts, visuals, and shortcuts". The Shorts tab is framed against social media: "a separate feed built for those tiny breaks throughout the day... that you scroll through." The doom-scroll substitution framing recurs constantly (`Turn daily scroll time into growth time`; a testimonial reads "It's a really good app to give up doom scrolling").

## T5 Form & field labels

**One public form, on the Science page** `[observed]`

> Section: `Download Complete Study`
> Hint: "Type your email to receive the link to a preprint article"
> Submit: `Send me the PDF`

An email gate on the *evidence* for the product's central claim. The label `Send me the PDF` is first-person-user framing (matching `Start my habit today`), and `preprint article` is an honest description — it does not say "peer-reviewed study". No form was submitted (per scope rules), so no validation or confirmation copy was observed.

**In-app field and control labels** `[documented]`

| Label / control | Surface |
|---|---|
| `App language` | Settings |
| `Highlight` (button) | Reader (on text selection) and audio player |
| `Set a weekly learning goal` | — *not Headway; see 133 Blinkist* |
| `Saved for later` | Library carousel |
| `More to [your goal]` | Home carousel — **a label with the user's own goal interpolated into it** |
| `View other plans` | Paywall |
| `Restore purchase` | Paywall |
| `GOODBYE` | Account-deletion confirmation input |
| Playback speed | `0.5x`–`2x` |

Two standouts. **`More to [your goal]`** is a carousel title templated on the user's declared objective — the personalisation is visible in the label itself, not just in the ranking. And the account-deletion confirmation requires typing **`GOODBYE`** in capitals:

> "Click on the 'Delete account' option. Enter **'GOODBYE'** in the appropriate field and tap the 'Delete account' button."
> "**Note:** After deleting your account, all your progress, library content, and personal data will be erased."

A type-to-confirm word that is emotional rather than procedural (compare GitHub's "type the repository name"). It is memorable, it is a real friction gate, and it is loss-framed — the inverse of Memrise, which frames deletion as a privacy *benefit*.

**Playback-speed reset is documented as intentional with a reason** `[documented]`: "the speed resets for each new summary, since narrators have their own natural tempo, and what feels right for one might not for another." A behaviour most users would report as a bug, explained as a design choice, with the rationale. Whether or not one agrees, documenting the *why* is the right move.

## T6 Status & state language

`[documented]` unless noted.

| State / concept | Copy |
|---|---|
| Streak alive | "keep your streak alive" |
| Streak jeopardy | "We'll remind you when it's **at risk**" |
| Streak unit | `3 key points a day` |
| Weekly/consecutive framing | "Your streak shows how many consecutive weeks..." — *note: this is Blinkist's wording; Headway's streak is daily* |
| Saved vs downloaded | "saving is different from downloading, so it won't be available offline unless you download it too" |
| Subscription active | "A Headway charge means you have an active subscription" |
| Post-cancellation | "you keep full access until the end of your current paid period" |
| Cancelled-but-charged edge case | "If your cancellation lands very close to the renewal moment, one final charge may still go through — **that will be the last one**" |
| Free tier | `Free Daily Read` — "one pre-selected book daily" |
| Entitlement mismatch | "check whether you're logged in with the correct email address" |

Three of these are strong. **`Saved` vs `Downloaded` is explicitly disambiguated** in the FAQ because the two states look identical to users and diverge only offline — exactly the "gap between system state and user reality" that Wise writes articles for. **`at risk`** as a jeopardy state, discussed above. And the cancelled-but-charged answer ends with a **closure guarantee** ("that will be the last one") rather than leaving the user wondering whether more charges follow. That final clause is worth stealing verbatim for any billing-edge-case copy.

`Free Daily Read` is a named entitlement state, and its qualifier is repeated consistently: `one pre-selected book daily`. `pre-selected` is doing honest work — the user does not choose.

## T7 Error, failure & recovery

`[documented]`. Headway's recovery corpus is almost entirely billing- and entitlement-shaped, which tells you where its support volume sits.

**Titles are the user's symptom, not the system's fault** `[observed]`

- `Why can't I access my paid subscription?`
- `Why was I charged after starting a free trial?`
- `Why was I charged twice?`
- `What is a Headway charge on my credit card statement?`
- `I have a busy schedule. Will Headway work for me?` (a *pre-purchase* objection written as an FAQ)
- `How do I restore my Headway subscription?`
- `What should I do if I forgot my password?`
- `Does deleting the Headway app cancel my subscription?`

**`What is a Headway charge on my credit card statement?`** is the single best-placed article on the site. It anticipates the moment a user sees an unrecognised line item — the exact moment that produces chargebacks and one-star reviews — and answers it before they reach their bank. The answer is calm, confirms the charge is real, explains it will appear under the company name, and offers a route: "If anything looks off or you have questions, reach out to us at support@get-headway.com and we'll help sort it out."

**`Why was I charged twice?`** gives a mechanism rather than an apology: "This usually means you have two separate active subscriptions on your account — for example, a Headway subscription plus a separate add-on subscription — which are billed independently." It names the likely cause and implies the fix without promising a refund.

**`Why was I charged after starting a free trial?`** is one sentence and blames nobody: "Free trials automatically convert to a paid subscription unless canceled before the end of the 7-day trial period." No "oops", no hedging, no attempt to soften. Given that this is the highest-complaint scenario in the category, the flat factual register is the correct choice.

**The restore-purchase recovery names the precondition** `[documented]`:

> "Try to read any summary. When you see the payment screen, choose the 'Restore purchase' option in the bottom right corner."
> "Note: **Ensure you log in with the same Apple ID you used to purchase the subscription.**"

Note the recovery path requires the user to *trigger the paywall on purpose* — the restore control lives only on the payment screen. That is an Apple-imposed pattern, but documenting the detour (and the exact corner of the screen) is good practice.

**Email-change has no self-service path** `[documented]`: `How can I change my email address?` requires emailing support with both old and new addresses. A capability gap stated plainly, with the exact two data points support will need — which at least prevents a round-trip.

**Not found** `[absent]`: no validation-message copy, no 404 copy, no offline-error copy, no payment-decline copy (contrast Memrise, which publishes a full decline diagnostic).

## T8 Empty states

`[absent]` — no empty-state copy is reachable on public surfaces, and none is quoted in help content. The nearest adjacent copy is the pre-first-use prompt `Not sure where to start?` / "Answer a few questions and we'll pick your first summaries." (`[observed]`), which is a marketing block rather than an in-product empty state.

Would require an authenticated pass.

## T9 Notifications & system messages

`[documented]` unless noted.

- **Streak-jeopardy reminder** — "We'll **remind you when it's at risk**." The only notification whose trigger condition is stated to the user.
- **Daily insight as trigger** — "Every morning, Headway hands you one new idea tied to your goal." A push described as a gift ("hands you") rather than an alert.
- **Recaps** — "After each summary you get a Recap of the main ideas and actions, and everything you save, highlight, or finish is stored in your Library **with reminders to bring you back to it**."
- **Widgets and wallpapers as ambient notification** — "Home-screen widgets surface your daily learning and keep your streak visible"; "Download motivational wallpapers to keep your goals in view on your phone." Persistent-surface nudges rather than interruptive ones.
- **Price-change notice, in the Subscription Terms** `[observed]` — "We will give you reasonable notice of any such pricing changes by posting the new prices on the App and/or by sending you an email notification, or in another prominent way. If you do not wish to pay the new fees, you can cancel the applicable subscription before the change takes effect." Three delivery channels and an explicit out.
- **A screenshot instruction as a system message** `[observed]` — the last line of the Subscription Terms: "Please take a screenshot of this information for your reference. This may help you to control your subscriptions." Analysed in T10.

**Notification-preference surface** `[absent]` — no article on turning notifications on or off, in contrast to Blinkist (`How can I turn on or off the push notifications?`) and Memrise (documented OS-level path). For a product whose retention mechanic is a reminded streak, the absence of documented notification controls is a notable gap.

## T10 Disclosures, legal & compliance

**PRIORITY SECTION.** This is the strongest section in the file and the reason Headway is worth benchmarking: it has clearly been rewritten in response to complaint pressure, and the rewrite is visible in the copy.

### The pre-emptive complaint disclosure

The standout artefact is the FAQ answer to **`What do Headway reviews say?`** `[observed]`. The question appears to be a social-proof slot. It is not. After one sentence about routines, it turns:

> "Billing concerns come up in reviews sometimes — cancellations, unexpected charges — so we want to be upfront about how it works. Your Headway subscription automatically renews when the current period ends, unless you cancel beforehand. Before you confirm anything, you'll always see the price, trial details, and renewal terms clearly laid out. If you ever want to cancel, you can do it directly through your App Store, Google Play, or Headway account settings — just keep in mind that simply deleting the app won't cancel the subscription for you."

Five moves in one paragraph: (1) name the complaint category in the users' own words (`unexpected charges`), (2) state the intention (`we want to be upfront`), (3) state the renewal rule, (4) make a **forward-looking commitment about the purchase screen** ("you'll always see the price, trial details, and renewal terms clearly laid out"), (5) pre-empt the most common cancellation failure (deleting the app).

Putting a negative-review acknowledgement inside a question framed as social proof is the most transferable compliance-UX pattern in this batch. It converts a reputational liability into a trust signal, in the place a sceptical prospective buyer is actually looking.

### Trial terms

`[observed]`, consistent across three surfaces:

- Length: **7 days**, attached to the yearly plan only — "Headway offers a 7-day free trial when you sign up for a yearly plan."
- One per store account: "The free trial can be used only once per app store account." (stated twice)
- Conversion is automatic and stated without euphemism: "Unless you cancel before the end of the trial period, your subscription will continue and you will be automatically charged the applicable subscription fee for the chosen subscription period **at the price shown on the payment screen**." (Subscription Terms §1)
- Cancellation deadline: **24 hours before renewal**, on two surfaces — "make sure you cancel 24 hours before your subscription renewal, otherwise the payment will be processed automatically" (home FAQ) and "Make sure to cancel at least 24 hours before your next renewal date" (features page).

**Defect** `[observed]`: the FAQ page's `How do I cancel a Headway free trial?` says only "cancel before the end of the 7-day trial period" — **no 24-hour buffer**. Three pages state a 24-hour requirement; the dedicated trial-cancellation answer states none. For the single most consequential number in the product, the help centre contradicts itself. This is the most important negative finding in the file.

**A second, subtler gap:** there is **no stated trial-ending reminder commitment** anywhere. Headway commits to reminding you about your *streak* ("we'll remind you when it's at risk") but makes no commitment to remind you before a trial converts to a charge. The contrast between the two is stark and worth recording: the retention nudge is promised, the billing nudge is not.

### Auto-renewal

**Subscription Terms §2** `[observed]`:
> "The subscription renews automatically at the end of each period (each week, month, 6 months, year, or otherwise, depending on the option you selected at the time of purchase) until you cancel."

Note the period list includes **`each week`** — a weekly billing option not offered anywhere in the published price list (see below).

**FAQ `Does a Headway subscription renew automatically?`** `[observed]`:
> "Yes, subscriptions renew on the date they were originally created, so cancel before that date to avoid the next charge. If your cancellation lands very close to the renewal moment, one final charge may still go through — that will be the last one."

A plain `Yes`, the renewal-date rule, and the near-miss edge case with a closure guarantee. This is well-written.

### Commitment plans — the buried term

**Subscription Terms §2, second paragraph** `[observed]`:
> "We may also offer commitment plans, under which you subscribe for a minimum period (the "committed period") and pay the plan fee in periodic payments over that period. **If you cancel before the end of the committed period, you may be required to pay the remaining amounts due for that period**, as disclosed to you at the time of purchase."

Reinforced in §4: "If you cancel a commitment plan before the end of the committed period, cancellation stops the automatic renewal but does not remove your obligation to pay any remaining amounts due for that period."

This is the most consequential term in the document and it appears **nowhere else** — not in the FAQ's six cancellation answers, not on the pricing list, not on any marketing page. A user who cancels a commitment plan owes the balance, and the only public disclosure of that is clause 2 of a footer-linked legal page. Recorded as the principal compliance concern for this product.

### Cancellation — path count and inconsistencies

Headway documents cancellation more thoroughly than any other product in this batch: **eight separate FAQ entries** plus a Subscription Terms clause plus a features-page section.

| Question (verbatim) | Steps described |
|---|---|
| `How do I cancel my Headway subscription?` | Platform-split: Android 4 steps, Apple 4 steps, website 1 (visit account page) |
| `How do I cancel a Headway free trial?` | 0 steps — deadline only, **and the deadline is wrong** (see above) |
| `How do I cancel Headway on iPhone or iPad?` | 5 steps, inline arrow notation |
| `How do I cancel Headway on Android?` | 5 steps, inline arrow notation |
| `How do I cancel a subscription purchased on the Headway website?` | 1 step |
| `Does deleting the Headway app cancel my subscription?` | "No, uninstalling the app doesn't end your subscription; charges will continue until you cancel it via the Store or your website account." |
| `Can I continue using Headway after cancellation?` | "Yes, you keep full access until the end of your current paid period." |
| `What is the difference between canceling a subscription and deleting an account?` | Distinguishes both directions |

The last of those is genuinely excellent: **`What is the difference between canceling a subscription and deleting an account?`** — "Canceling a subscription only stops future billing — you keep your account and access until your current paid period ends. Deleting your account automatically cancels any active subscription." It resolves a confusion in both directions in two sentences. Most products document only the one direction that protects them.

**Where the website cancellation button lives — three answers** `[observed]`:
1. FAQ: "by visiting the [Headway Account page](https://headway-product.com/sign-in)" — an **unbranded third-party-looking domain** (`headway-product.com`), which is exactly the kind of URL a user would assume is phishing
2. Subscription Terms §4: "by contacting our support at support@get-headway.com **or** by clicking on the 'Cancel Subscription' button in your account on our website"
3. Features page: "Log in to your account at makeheadway.com using the same password you use in the app, and deactivate automatic renewal from your account settings"

Three different locations and mechanisms for one action, one of them on a domain that does not match the brand. The Subscription Terms version also offers **email-to-support as a first-named cancellation route**, which is a slower path than a button and should not be listed first.

**Refunds** `[observed]` — store-mediated for store purchases, discretionary for web:
> "If you've bought a subscription or started a trial on **our websites,** refunds are issued **at our discretion** and are subject to applicable Terms and Conditions, which may be updated periodically."

`at our discretion` + `which may be updated periodically` is a double reservation. Compare 133 Blinkist, which publishes a **14-day money-back guarantee** with named exclusions. Headway offers no equivalent commitment, which is a real competitive difference in consumer protection and is worth noting as such.

The Subscription Terms add a data-sharing consent buried in the refunds clause: "we may provide certain data (e.g., your subscription status, account activity, and usage data) to the relevant App Store to assist in processing your refund request... By using our Services, purchasing subscriptions via App Stores, and submitting a refund request through these platforms, **you expressly consent to the sharing of the necessary account and usage data**." Consent-by-conduct for usage-data sharing, located in a refunds section.

### The screenshot instruction

Final line of the Subscription Terms `[observed]`:

> "Please take a screenshot of this information for your reference. This may help you to control your subscriptions."

Read two ways. Charitably: an unusually practical instruction that helps users retain terms they will need later. Uncharitably: an admission that the document is expected to change and that the user, not the company, bears the burden of retaining what they agreed to — note the adjacent clause reserving the right to change fees "at any time" and the "Last updated: September 2, 2026" stamp. Recorded factually; the ambiguity is the interesting part.

### Summary-product framing and copyright

**PRIORITY for this product.** How Headway justifies compression, in its own words `[observed]`:

- The unit is never coined. Headway says **`summary`**, `book summary`, `key insights`, and `key points` — it has **no equivalent of Blinkist's `blink`**. Its only coined content units are the *formats* around the summary: `Shorts`, `Recaps`, `Highlights`, `Gems`, `Collections`. See T13 for why this matters.
- Provenance is asserted as human and multi-role, repeatedly: "crafted by a team of writers, editors, and **sound actors** who distill key insights from bestselling nonfiction books"; "created by a team of content creators who specialize in literature and writing. They read the books, then create, proofread, and edit each summary, adding insights and facts drawn from trusted sources."
- Anti-automation positioning is explicit: "Headway summaries are written and reviewed by a **real team of people, not generated automatically.**" And against competitors: "Many summary websites for books rely on automation or crowd-sourced content, but Headway takes a different approach." And against LLMs: "While AI can generate on-demand summaries, these summaries are unedited, unverified, and vary in quality."
- **The not-a-replacement move is made positively, as a feature**: `How is Headway different from reading a full book?` → "Headway gives you the core ideas of a book in about 15 minutes instead of the hours a full read takes... **It also works as a discovery tool, helping you figure out which books are worth reading in full.**" Reinforced by shipping an actual purchase path: `Can I buy the full book after reading its summary?` → "Yes — if a summary sparks your interest, just head to the overview page, where you'll find a link straight to Amazon to grab the full book."

So Headway's compression justification is **discovery + a buy link**, not a fair-use or transformation argument. Contrast Blinkist, which argues transformation directly ("new, original works of their own") and revenue-sharing with publishers. Headway makes **no publisher-partnership or revenue-share claim anywhere**, and its copyright FAQ is a null answer:

> `How does Headway handle copyright?` → "If you have any questions about copyright, please contact us at support@get-headway.com"

A question posed and not answered. For a product whose entire catalogue is derived from third-party works, this is the most conspicuous omission on the site — especially sitting beside Blinkist's substantive answer to the same question. `Can authors submit their books to Headway?` is similarly deflected to email ("If you are interested in promoting your book with Headway, just drop us a line"), framing author contact as *promotion* rather than rights.

Time-promise framing is consistent but not identical across surfaces: `15 minutes` (hero, most FAQ answers), `about 15 minutes`, `15–20 minutes` (audio), `about 12-20 minutes` (features page), `as little as 3 minutes` (streak minimum), `15 min or less`. Six figures for one unit. The hedge `about` appears on some and not others.

### Efficacy claims — the Science page

`[observed]`. Headway builds a dedicated page for this, which invites scrutiny.

> H1: `The Science Behind Headway`
> Dek: "Microlearning isn't just a trend. It's a proven method for helping your brain learn faster, remember longer, and apply knowledge in real life."
> Eyebrow: `Backed by studies, not buzzwords`

Then three quantified claims:

| Claim label | Copy (verbatim) |
|---|---|
| `Research Boom` | "In just a decade, scientific studies on microlearning have skyrocketed — proving it's not hype, but the future of learning." |
| `Motivation Boost` | "Short learning bursts trigger dopamine — boosting focus, energy, and motivation by **over 70%**." |
| `Student Success` | "When tested, students learning with microlearning outperformed traditional learners — **82% passed vs. only 64%, a +28% leap forward**." |

And five mechanism claims under `How microlearning hacks your brain`: `From Short-Term to Long-Term`, `The Spacing Effect`, **`Chucking Makes Learning Easier`** *(sic — typo for "Chunking", live on the page)*, `Focus Without the Fatigue`, `Dopamine Boosts Motivation`.

**Assessment, recorded factually.** Every claim on this page is about **microlearning as a category**, not about Headway as a product. No claim asserts that Headway users improve; the strongest product-linked statement is the section heading `How Headway Brings Science to Life`, whose bullets describe design alignment rather than outcomes ("Sessions fit the scientifically proven 8-15 minute focus window"). That category/product separation is a genuine and deliberate hedge — and it is the same structural device Elevate uses (see 134 T10), arrived at independently.

However, the claims themselves carry **no citations, no study names, no authors, no journals, and no dates.** `over 70%` and `82% passed vs. only 64%` are presented as bare figures. The word `proving` is used twice and `proven` three times. The only route to sources is an **email-gated preprint** (`Download Complete Study` → "Type your email to receive the link to a preprint article") — so the evidence for the headline claims is behind a lead-capture form, and is described as a preprint rather than peer-reviewed work. `Backed by studies, not buzzwords` sits above a page that names no study.

Two further notes. The claimed focus window drifts: the FAQ says "our brains focus best in short bursts of **8-15 minutes**" while the `15-Minute Sweet Spot` bullet says "Sessions fit the scientifically proven 8-15 minute focus window" — consistent — but the product's advertised session is 15 minutes, i.e. at the extreme end of the cited window, and the streak minimum (3 minutes) sits *below* it entirely. And "+28% leap forward" is a **percentage-point difference presented as a percentage** (82 − 64 = 18 points, or a 28% relative increase) — arithmetically defensible as a relative figure, but the phrasing `a +28% leap` alongside the two raw percentages invites misreading.

There is **no disclaimer, hedge, or limitations statement anywhere on the Science page.** No "results vary", no "not a substitute for", no methodology note. Contrast the Headway FAQ elsewhere, which hedges freely.

**A separate, self-reported claim set** `[observed]`, on the features page: no equivalent user-percentage stats appear (unlike Blinkist's 95%/91%/87% and Elevate's 93%/95%/90%). Headway's proof is volume and awards rather than self-reported outcomes: `55+ million downloads`, `172,000+ five-star reviews`, `4.6/5 across more than 280,000 combined App Store and Google Play reviews`, `TIME — World's Top 5 EdTech Company (2025, ranked 4th)`, `Webby Honoree (2025)`, `App Store Editors' Choice`, `App of the Day in 30+ countries`.

### Pricing disclosure

**A genuine split-brain problem** `[observed]`.

The FAQ refuses to quote prices, three times:
> "Pricing depends on the plan and any active promotions, so there's no single fixed price to quote."
> "exact options and pricing shown in-app since they can vary by promotion"
> "Price can differ by region, currency, whether you subscribe via the website or through the App Store/Google Play, and active promotions."

The features page publishes them in full:
> `Free plan:` "Always available at no cost. Includes access to one book summary per day — both text and audio. **No credit card required.**"
> `Monthly plan:` **$12.99/month**
> `Quarterly plan:` **$29.99 every 3 months (~$10/month)**
> `Annual plan:` **$89.99/year (~$7.50/month)** — "The best value option."
> "All paid plans include a 7-day free trial"

With a proper bounding note: "Prices shown reflect U.S. rates and may vary depending on your country, local taxes, currency conversion, or promotional offers. **Before subscribing, check the final price displayed in your App Store or Google Play checkout screen to see the exact amount you'll be charged.**"

That bounding note is good practice — claim, bound, route to the authoritative figure. But it sits on a page the FAQ never links to, while the FAQ tells users no price can be quoted. Three inconsistencies compound here:
1. FAQ says "no single fixed price to quote"; features page quotes four.
2. FAQ `Does Headway offer a free trial?` says the trial attaches to the **yearly plan**; features page says **"All paid plans include a 7-day free trial"**.
3. Subscription Terms §2 lists a **weekly** billing period; no weekly plan is published.

**`No credit card required.`** on the free tier is worth isolating as a string — three words that remove the dominant objection to any "free" claim in a subscription app.

### Library-size disclosure — a live contradiction

`[observed]`. The number of summaries is stated four different ways:

| Figure | Location |
|---|---|
| `1,700+ available summaries` | Home-page FAQ, `What's included in my subscription?` |
| `2,500+ book summaries` | FAQ page, `What is the Headway app?` and `Is Headway a book summary app?` |
| `2,500+` | Features page, habit landing page, competitor table |
| `~2,500` | Competitor comparison table |

A user comparing Headway on its own site gets a 47% swing in catalogue size depending on which page they read. Given the comparison table uses the library figure to position against Blinkist's 9,000+, the discrepancy is commercially material.

### Entity disclosure

`[observed]`. The footer of every page reads: "©2026, **GTHW App Limited**, Omonoias Avenue 13, Office 1B, Limassol 3052, **Cyprus**". The FAQ says: "Headway is owned and operated by **Headway Inc**, a global tech company... The company is led by founder and CEO Anton Pavlovsky." The features page repeats "Headway Inc" and lists offices in "Madrid, Kyiv, Warsaw, Lviv, and Nicosia."

Two entity names, and the legal footer entity (`GTHW App Limited`) appears in no user-facing explanation. A user reading the FAQ would not know who they are contracting with. Not necessarily improper, but a transparency gap.

**A good disambiguation disclosure** `[observed]`, worth crediting: `Is Headway related to Headway therapy or Headway Capital?` → "No, despite sharing the name, all three are separate, unrelated companies. Headway Capital is a business lending company, and Headway (headway.co) is a mental health platform connecting people with therapists — neither has any ownership or business ties to the Headway app." Naming both confusable third parties, with a domain, is the right way to handle brand collision.

## T11 Help-centre architecture

**A single long FAQ page, seven sections, no search** `[observed]`

Section headings, in order:
1. `About Headway`
2. `Book summaries and content`
3. `Features and learning`
4. `Devices, web and languages`
5. `Pricing, plans and free access`
6. `Subscription, billing and refunds`
7. `Account, privacy and security`
8. `Gifts, business, authors and support`

All noun phrases, all comma-run lists of scope (`Gifts, business, authors and support` bundles four unrelated audiences into one bucket — the catch-all). The ordering is the tell: **marketing-first, billing-sixth**. A user arriving with a cancellation problem scrolls past five sections of product explanation. Compare Memrise (3 categories, billing is 1 of 3) and Blinkist (`Subscriptions` as a top-level collection, `Renewals and Cancellations` as a named sub-collection).

Roughly 55 Q&As, every answer present in server HTML — fully readable and indexable, like Memrise.

**Two-tier routing, with off-site escalation** `[observed]`:
`Need more guidance?` → "Reach out to our support team or explore the full FAQ page" (on marketing pages) → `Explore more answers` → `headway.zendesk.com/hc/en-us` (from the FAQ foot).

So the on-site FAQ is itself a curated subset, with the full corpus on Zendesk. **Defect**: the phrase "explore the full FAQ page" on the home page links to `/faq/`, but `/faq/` then says the *fuller* set is on Zendesk. "Full" is used for the middle tier.

**Article-title grammar — five shapes** `[observed]`

| Shape | Examples |
|---|---|
| `What is/are …?` | `What is the Headway app?` · `What are Headway Highlights?` · `What is Headway Shorts tab?` |
| `How do I …?` / `How can I …?` | `How do I cancel my Headway subscription?` · `How can I request a refund from Headway?` |
| `Can I …?` | `Can I cancel my subscription or trial at any time?` · `Can I buy the full book after reading its summary?` |
| `Why …?` | `Why was I charged twice?` · `Why does the Headway price vary?` · `Why can't I access my paid subscription?` |
| **Reputation / third-party framed** | `Is Headway legit?` · `Is the Headway app worth it?` · `What do Headway reviews say?` · `Who owns Headway?` · `How does Headway make money?` |

The fifth shape is the distinctive one and does not appear in any other product in this batch. `Is Headway legit?`, `How does Headway make money?`, and `Who owns Headway?` are **questions a user would type into Google about a company they distrust**, answered on the company's own site. `Is Headway legit?` opens "Yes, Headway is a real, operating product, not a scam." — the word `scam` appears in Headway's own FAQ, which is a deliberate SEO-and-trust play.

`How does Headway make money?` is answered plainly ("mainly through subscriptions") — business-model transparency as a consumer FAQ item.

**`Is Headway a habit-building app?`** on the habit landing page is the same trick applied to a category claim: pose the categorisation question, answer `Yes`, then define the category to fit.

## T12 FAQs

Four FAQ blocks across the harvested pages, with different jobs.

**(a) Home page — `Got questions?  We've got answers.`** `[observed]` (note the double space in the live heading)

| # | Question (verbatim) |
|---|---|
| 1 | How does the Headway app work? |
| 2 | What makes Headway the best 15-minute book summary app? |
| 3 | What's included in my subscription? |
| 4 | What types of books are available on Headway? |
| 5 | Can I cancel my subscription or trial at any time? |
| 6 | I have a busy schedule. Will Headway work for me? |
| 7 | How does Headway compare to other book summary websites? |

Seven questions, and **Q5 is cancellation — in position five of seven, on the home page.** That placement is unusual and to Headway's credit: a prospective buyer sees the cancellation answer before they see the competitor comparison. The answer is complete in itself (both cancellation channels plus the 24-hour rule) rather than deferring to the FAQ page.

Q6 (`I have a busy schedule. Will Headway work for me?`) is the only **two-sentence question** in the set — a statement of the user's situation followed by the question. That shape lets the user self-identify before reading. Q2 embeds the SEO keyword (`best 15-minute book summary app`) in the question itself, which is the least natural item in the block.

**(b) FAQ page** — ~55 questions, analysed in T11.

**(c) Science page** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I really learn something valuable in just 15 minutes a day? |
| 2 | How is Headway different from other learning apps? |
| 3 | How is Headway different from just reading a book summary online? |
| 4 | How often should I use microlearning to see real results? |
| 5 | Does microlearning work for both personal growth and professional skills? |
| 6 | Will Headway fit into my daily routine if I'm super busy? |

Q1's `really` voices the user's scepticism, and the answer opens `Yes!` with an exclamation mark — a lower-credibility register than the page's evidence framing warrants. Q4's answer contains the best-hedged sentence on the Science page: "**Consistency beats intensity.** Research shows that learning in short, regular sessions — daily or a few times a week — builds stronger, long-term memory than cramming. Even a few minutes a day can compound into lasting results." Note `can compound` rather than "will".

Q3 is the sharpest competitive framing on the site: "Summaries give you a snapshot. With Headway you're not guessing if a random summary is accurate."

**(d) Habit-building page** `[observed]` — seven questions, all keyword-shaped around "habit":

| # | Question (verbatim) |
|---|---|
| 1 | Is Headway a habit-building app? |
| 2 | Can Headway help me build better habits? |
| 3 | What makes Headway useful for building better habits? |
| 4 | How can I use Headway to build a daily learning habit? |
| 5 | Can book summaries help me build better habits? |
| 6 | What book summaries on Headway help with habit-building? |
| 7 | Does Headway have streaks and progress tracking? |

Six of seven contain the word "habit" and four are near-paraphrases of each other (Q1/Q2/Q3/Q5). This block is SEO scaffolding rather than a user-question inventory, and the repetition is visible. Q3's answer does, however, give the cleanest three-word statement of the mechanic anywhere on the site: "Three things: **consistency, low effort, and feedback.**"

Q5's answer contains a rare conditional concession: "**They can, if you use what you learn.**" — a benefit claim gated on user behaviour, opening with the condition rather than burying it.

## T13 Terminology & glossary

**PRIORITY SECTION.**

**The defining finding: Headway does not coin a name for its core unit.** Where Blinkist has `blink` (and `key idea` beneath it), Headway says `summary`, `book summary`, and `key points`. Its coinages sit entirely in the layer *around* the summary.

| Term | Headway's usage | The alternative it rejected / note |
|---|---|---|
| `summary` / `book summary` | The core unit. Always generic. | `blink`, `abstract`, `brief`, `digest`. **A strategic choice, not an omission**: `book summary` is the search term, so Headway owns the category noun instead of coining a brand noun. The cost is that it has no defensible name for its own product unit; the benefit is SEO and instant comprehension |
| `key points` | The sub-unit of a summary, and **the actual unit of the streak** ("at least 3 key points a day (that's what each summary is built from)") | Blinkist's `key ideas`. Near-identical concept, near-identical name |
| `key insights` | Used interchangeably with `key points` in marketing | Two names for one sub-unit |
| `microlearning` | The method, and the primary positioning word — with a dedicated page | `bite-sized learning`, `snack learning`. Headway markets the *category* rather than the artefact |
| `Shorts` | A tab; "four interactive visual formats" = quizzes, interesting facts, visuals, shortcuts | **Name collision**: Blinkist also ships a feature called `Shorts` (5 daily one-minute items). Two direct competitors, same coined feature name |
| `Recaps` | Post-summary reinforcement: "resurface the core ideas from each summary" | `Review`, `Summary of the summary`. Claimed as a Headway-only feature in the comparison table |
| `Highlights` | Saved excerpts, in **both audio and text** | Standard term, but the audio-highlight capability is distinctive: "Hit the 'Highlight' button in your player right at the moment that gets you" |
| `Gems` | "bite-sized articles built around key ideas from nonfiction books" | Mentioned **once**, in one FAQ answer, and nowhere else on the site — an undocumented content type |
| `Collections` | Curated theme groupings | `Playlists`, `Lists` |
| `Audio queue` | Play-next list, with a stated limitation: "you can adjust the queue, though it's built from recommendations rather than from scratch" | `Playlist` — and the honesty about the limitation is notable |
| `Free Daily Read` | The free tier's entitlement, capitalised as a product name | `Free plan`, `Daily free book`. Naming the *entitlement* rather than the tier |
| `Intimacy Coach` / `Intimacy coach` | "A private, on-device-feel AI chat coach for dating and flirting questions — ask anything, and the chat clears when you close it" | Two capitalisations. **`on-device-feel`** is a remarkable hyphenate — it explicitly claims the *sensation* of local processing without claiming local processing |
| `growth plans` / `learning plan` / `personalized plan` / `guided plan` / `guided personalized learning plan` | The quiz-derived curriculum | **Five names for one artefact.** The clearest terminology defect in the file |
| `Guided experience` / `Non-guided experience` | The two product modes | `non-guided` as a negated adjective is clumsy; there is no positive name for self-directed use |
| `Activity` (tab) | Where goals are updated | |
| `More to [your goal]` | Templated carousel label | |
| `streak` | The daily-consistency counter | Retained from the category, not renamed — contrast Memrise, which rejected the word outright |
| `daily insights` | The morning trigger content | `Daily quote`, `Tip of the day` |
| `spaced repetition` | Named as a Premium feature and a science-page mechanism | Kept as the technical term, unglossed in the FAQ |
| `Headway Premium` | The paid entitlement | Also referred to as "paid monthly, quarterly, and annual plans"; `Premium` is used inconsistently against the bare plan names |
| `Headway Inc` vs `GTHW App Limited` | The company | See T10 |

**Register analysis.** Headway's coined terms are overwhelmingly **short, plural, and concrete** — `Shorts`, `Recaps`, `Highlights`, `Gems`, `Collections`, `Quests`-adjacent. All are one or two syllables, all are nouns, none is a metaphor, and none requires a gloss. That is a disciplined naming system, and it is the reason the five-way mess around `plan` stands out so badly: everywhere else Headway picks one short noun and sticks to it.

The single most interesting lexical choice is the *absence* of a coined summary unit. Headway has decided that owning `book summary` in search is worth more than owning a brand word — and its competitor-comparison content ("Many summary websites for books rely on automation") only works because it can use the generic term to indict the category and then exempt itself.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, and the company speaks in adverse copy as well as positive ("we want to be upfront about how it works", "refunds are issued at our discretion", "we'll help sort it out"). Present tense throughout; imperative for steps.

**Register — three gradients, and they are well controlled** `[observed]`

1. **Acquisition marketing** — maximal claim, minimal hedge, exclamation-adjacent: `Transform your life with microlearning`, `Get rich`, `Become "that" girl`, "Wonderful. Learning has never been so fun and easy."
2. **FAQ / support** — plain, conversational, contraction-heavy, willing to say no: "Not exactly", "Just keep in mind", "that's it", "your call". Sentence fragments used for warmth: "Read it when you have a spare minute, or listen when your hands are busy — same insights either way."
3. **Legal / Subscription Terms** — formal, second-person, no contractions, bolded conditionals. Zero personality.

Unlike Memrise, **the tone does flatten as stakes rise.** The Subscription Terms contain no emoji, no exclamation marks, and no warmth; the billing FAQ answers are noticeably flatter than the feature answers. That is the correct gradient and matches the Wise pattern.

**Where the register slips** `[observed]`: "Behind personalized carousels is a bit of **machine learning magic** — smart algorithms that use real-time data to tailor content just for you." `magic` as an explanation for a recommender system, in an FAQ answer that a user opened in order to understand how their data is used. The one place the marketing voice leaks into an answer that should have been factual.

**Numbers as trust devices** `[observed]`: `55+ million` downloads · `170+ million` across Headway Inc products · `170+ countries` · `172,000+ five-star reviews` · `4.6/5` across `280,000+` reviews · `2,500+` summaries (or `1,700+`) · `500+ employees` · `15 minutes` · `3 minutes` · `7-day` trial · `$12.99 / $29.99 / $89.99` · `30+ countries` (App of the Day) · `TIME` rank `4th`. Store ratings are attributed with counts — good. Library size is not internally consistent — bad.

**Accessibility content** `[observed]`

- **No accessibility statement.** The `Legal` footer grouping has seven items and none is accessibility. `[absent]` — notable given the grouping is otherwise unusually thorough.
- **No `Skip to content` link** in the served HTML on any page. `[absent]`
- **Alt text is genuinely good on the marketing pages** and is doing SEO double duty: "Best book summary app — app that summarizes books for quick learning and personal growth, Headway"; "Headway app onboarding screen with desired areas of development"; "Headway app shorts tab with 6 signs your friends are emotionally manipulating you infographic"; "Headway app streak tab with 1-day streak and fire icon". These are descriptive, screen-specific, and would actually orient a non-sighted user. The icon alts are correct and minimal: `Mountain icon`, `Lock icon`, `Dialog bubble icon`, `Ladybug icon`, `Smile icon`, `Mark icon`.
- **But there is a typo shipped in alt text**: "Headway app **groeth** plans screen including be visible at work, build a personal **bran**, build confidence and others" — two misspellings in one alt attribute.
- **Empty and near-empty alt** on several decorative elements, correctly.
- **Social icons carry `title` attributes** (`Instagram`, `LinkedIn`, `Facebook`) but the X/Twitter icon's title is **empty** (`"X" ""`) — one unlabelled social link.
- **An audio player with no visible transcript or control labels** in the served markup: the `Listen to your first summary now` block renders a `.wav` URL and three `00:00` timers with no `aria` labelling visible in the HTML. Recorded as suspected, not confirmed — client-side rendering may supply labels.
- **`Do Not Sell or Share My Personal Information`** is a first-class footer link on every page (CCPA), as is `Notice at collection`, deep-linked to a specific table anchor (`/privacy-policy/#Table_9`). Privacy disclosure is handled better than accessibility.
- **Localisation breadth is a genuine accessibility win**, and is framed as one: eleven content languages (`English, Spanish, Polish, Portuguese, German, French, Italian, Japanese, Romanian, Czech, Hungarian`), positioned as "making it one of the few book summary apps offering localized content", with a documented use case for non-native English speakers and for "People with ADHD or reading difficulties who find full books overwhelming but can focus on a 3-15 minute structured summary with audio support." Naming ADHD and reading difficulty as a served segment, in the product's own audience list, is unusual and worth crediting.
- **App-language setting has a documented OS fallback**: "on some OS versions, this option may not be available, so you may need to change your phone's overall language instead."
- **English-prevails clause** in the Subscription Terms: "Any translation from the English version is provided for your convenience only... the English language version will prevail."

**Negative findings, recorded honestly**

- **The 24-hour cancellation buffer is stated on three pages and omitted on the dedicated trial-cancellation answer.** Highest-severity content defect found.
- **No trial-ending reminder commitment**, while a streak-jeopardy reminder *is* committed to.
- **Commitment-plan early-termination liability** appears only in Subscription Terms §2/§4 — in no FAQ and on no pricing surface.
- **Library size: `1,700+` vs `2,500+`** on the same site.
- **Trial eligibility: "yearly plan" (FAQ) vs "All paid plans" (features page).**
- **Subscription Terms lists a weekly billing period** that no published plan offers.
- **FAQ says no price can be quoted; features page quotes four prices.**
- The pricing FAQ's "check pricing on our website" links to the home page, **which has no pricing**.
- Website cancellation is located three different ways, one of them on `headway-product.com` — **an off-brand domain for the cancellation destination**.
- Subscription Terms names **email-to-support as a cancellation route**, listed before the self-service button.
- `Log in` in the website nav routes to an **app-store deeplink**, not to web login.
- `How does Headway handle copyright?` poses the question and does not answer it.
- Two entity names (`Headway Inc` in copy, `GTHW App Limited` in the legal footer) with no reconciliation.
- **`Chucking Makes Learning Easier`** — typo for "Chunking" on the Science page, in a heading, on the page that exists to establish credibility.
- `groeth` and `bran` typos in a live alt attribute.
- Five names for the personalised-plan artefact.
- `Shorts` collides with Blinkist's `Shorts`.
- `Gems` is named once and never explained.
- `Intimacy Coach` / `Intimacy coach` — two capitalisations.
- Double space in two live headings (`Got questions?  We've got answers.`).
- Two of eight `Topics` nav items route to blog categories, not to library content.
- Nav `Self-growth` / slug `selfimprovement` / footer `Personal growth` — three labels, one node.
- `Get started` used six-plus times on one page with no variation.
- "a bit of machine learning magic" as the explanation of the recommender, in a how-it-works answer.
- Empty `title` on the X social link.
- No accessibility statement despite a seven-item `Legal` footer group.

---

## Transferable patterns

1. **Answer the complaint you are known for, in the place a sceptic is looking.** `What do Headway reviews say?` names `cancellations, unexpected charges`, states the renewal rule, and commits to what the purchase screen will show. Putting the billing disclosure inside a social-proof question is the strongest pattern in this file. Condition: only works if the commitment is real and the purchase screen actually delivers — otherwise it is a second liability.
2. **Break subscription terms out of the ToS and link them in every footer.** A short, standalone `Subscription terms` document beats clause 8 of a monolith. Directly applicable to any recurring-billing product. Caveat from this same file: doing so is not sufficient if the material term (commitment-plan liability) exists *only* there and in no user-facing help.
3. **Distinguish cancel-vs-delete in both directions.** "Canceling a subscription only stops future billing... Deleting your account automatically cancels any active subscription." Two sentences, one confusion resolved symmetrically. Nearly every subscription product documents only the direction that protects it.
4. **Ship an article named for the bank statement.** `What is a Headway charge on my credit card statement?` intercepts the pre-chargeback moment. Transfers to any product that appears on a statement under a name the user may not recognise — and PayPal has the same problem in reverse, as the descriptor other merchants hide behind.
5. **Close the billing edge case with a guarantee, not a maybe.** "one final charge may still go through — **that will be the last one**." The second clause costs four words and removes the fear the first clause creates.
6. **Name the streak-jeopardy state rather than commanding the user.** `at risk` warns without scolding. Compare a hypothetical "Don't lose your streak!" Condition: pairs badly with claiming the system is "without pressure" — pick one.
7. **State the minimum viable action as a headline, not a footnote.** "3 minutes keeps the streak, and the habit, alive" undercuts the product's own 15-minute promise deliberately, to lower the daily barrier. Two numbers, two anxieties: `15 minutes` answers "is this worth it?", `3 minutes` answers "can I keep this up?".
8. **Justify compression with a discovery claim and a real buy link.** "It also works as a discovery tool, helping you figure out which books are worth reading in full" plus an actual purchase path is a stronger not-a-replacement argument than a legal assertion, because it is falsifiable and the product ships the proof.
9. **Separate category claims from product claims when the evidence is categorical.** Every Science-page claim is about microlearning, none about Headway users. That is a legitimate structural hedge — and the same device Elevate uses for cognitive training. Condition: it only holds if you never let the product claim borrow the category's "proven". Headway's `Backed by studies, not buzzwords` over an uncited page shows where it breaks.
10. **Counter-example: the number that must be right.** A 24-hour cancellation window stated on three pages and dropped on the fourth — the one titled `How do I cancel a Headway free trial?` — is the shape of defect that generates regulatory exposure, not just confusion. Treat any deadline as a single-source-of-truth string with an owner.

## Caveats & gaps

- **The funnel itself is unobserved.** `/onboarding/start`, the quiz, the paywall, the trial-offer screen, and the price-reveal screen were not entered (no sign-up, no payment, per scope rules). The FAQ's forward commitment — "you'll always see the price, trial details, and renewal terms clearly laid out" — is therefore **unverified**, and it is the most important claim in the file. A logged-out browser pass through the quiz to the paywall would test it without payment and should be the next step.
- **In-app cancellation UI is `[documented]` only.** The web account page (`headway-product.com/sign-in`) was not loaded, so the actual `Cancel Subscription` control, its placement, its step count, and any retention interstitials are unknown. Consumer complaints in this category typically concern retention friction *inside* the cancel flow, which is precisely the part not harvested.
- **Zendesk help centre not harvested** (`headway.zendesk.com/hc/en-us`). The on-site FAQ is explicitly a subset, so article-title grammar and category IA at full scale are unassessed.
- **Terms and Conditions of Use not fetched** — only the separate Subscription Terms. The general T&Cs govern web refunds ("subject to applicable Terms and Conditions") and are therefore load-bearing for the refund finding.
- **Privacy policy and AI usage policy not fetched.** The `AI usage policy` is likely relevant to the `Intimacy Coach` and to the "on-device-feel" claim; unassessed.
- **The Science page's underlying preprint was not obtained** — it is email-gated, and no email was submitted. All efficacy findings rest on the page's own uncited summaries of its claims. No judgement is offered here on whether the claims are supported; only on how they are worded and sourced on the public page.
- **`Gems` is unharvested.** Named once in the FAQ as "bite-sized articles built around key ideas from nonfiction books"; no page describes it.
- **No summary content was examined or reproduced**, by design. All statements about summary structure (`7-8 key ideas`-equivalent, `3 key points` as the streak unit, `12-20 minutes`) come from Headway's own descriptions of the format, not from any summary body.
- **Library and topic pages not harvested** (`/library/`, `/library/topics/*`), so content-discovery IA, title grammar for summary pages, and any per-title disclosure (e.g. author/publisher attribution on a summary overview page) are unassessed. The Amazon buy-link claim is `[documented]`, not observed.
- **Competitor figures in the comparison table are Headway's characterisations of rivals** and are recorded here as Headway's claims only. Blinkist's own figures (see 133) differ in places.
- **Only en-US harvested.** Eleven content languages exist; localisation quality of `Shorts`, `Recaps`, `Gems`, `Free Daily Read` is unknown, and the English-prevails clause means translated terms may differ materially.
- **Mobile app store listings out of scope.**

## Sources

1. https://makeheadway.com/
2. https://makeheadway.com/faq/
3. https://makeheadway.com/subscription-terms/
4. https://makeheadway.com/science/
5. https://makeheadway.com/headway-app-features/
6. https://makeheadway.com/headway-for-habit-building/
