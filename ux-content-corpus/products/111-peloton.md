# 111. Peloton

| Field | Value |
|---|---|
| Domain | `HLTH` — Health and wellbeing |
| Industry / sub-vertical | Connected fitness (hardware + subscription); instructor-led on-demand class streaming |
| Primary URL | https://www.onepeloton.com/ |
| Corpus rank | 111 |
| Benchmark strength (source list) | Coaching, motivation, progress |
| Locale / market observed | en-US (`meta-og:locale: en-US`); UK/AU/CA variants referenced in asset filenames but not harvested |
| Platform observed | Web (desktop marketing site), blog ("The Output"), legal/terms pages |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **Not a regulated health product and does not claim to be.** Standing medical disclaimer on every blog article routes to a physician and to 911. Consumer-finance disclosure via Affirm (APR, state licences, lender panel). HSA/FSA eligibility mediated by a third party (Truemed) with eligibility explicitly disclaimed. Consumer Health Data Policy published separately from the Privacy Policy (a Washington My Health My Data-style artefact). Statutory cancellation-rights blocks for British Columbia, Ontario, Saskatchewan and New York auto-renewal law. Camera/biometric processing governed by an opt-in consent notice. No HIPAA exposure. |
| Harvest date | 2026-09-21 |
| Pages inspected | 31 |
| Harvest completeness | Partial — `support.onepeloton.com` (the Member Support Center) is a Salesforce Experience Cloud JS shell and is **wholly unreadable** without a browser. Help-centre architecture is therefore reconstructed from footer links and article slugs, and is marked `[documented]`. All in-product states (error, empty, validation, toast, push) are absent or inferred. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://www.onepeloton.com/ | Hero, Peloton IQ 3-step, class taxonomy carousel, purchase disclosures |
| App | https://www.onepeloton.com/app | Tier naming, feature framing, 6-question FAQ |
| App membership | https://www.onepeloton.com/app-membership | Tier comparison, trial terms, 8-question FAQ |
| Membership | https://www.onepeloton.com/membership | All tier names, cardio-class metering rule |
| Classes hub | https://www.onepeloton.com/classes | Discipline taxonomy, collections, 8-question FAQ |
| Strength classes | https://www.onepeloton.com/classes/strength | Class-title grammar, difficulty chips, pagination state |
| Meditation classes | https://www.onepeloton.com/classes/meditation | De-escalated register |
| Beginner strength | https://www.onepeloton.com/classes/beginner-strength-training | Beginner ramp copy |
| Adaptive strength | https://www.onepeloton.com/classes/strength/adaptive | `Adaptive` as a first-class filter facet |
| Class detail | https://www.onepeloton.com/classes/strength/20-min-seated-adaptive-bodyweight-logan-aldridge-1678374000 | Class-plan and body-activity labels |
| Instructors | https://www.onepeloton.com/instructors | 57 instructors, Leaderboard handles in URLs |
| Club Peloton | https://www.onepeloton.com/club-peloton | **Richest single source** — levels, points, de-escalation FAQ |
| Teams | https://www.onepeloton.com/teams | Community/competition copy, 4-step how-it-works |
| Peloton IQ | https://www.onepeloton.com/peloton-iq | AI coaching framing, camera consent FAQ |
| Bike | https://www.onepeloton.com/bike | Product FAQ, warranty, space/safety copy |
| Home trial | https://www.onepeloton.com/home-trial | Return-fee disclosures |
| Financing | https://www.onepeloton.com/financing | Affirm APR disclosure set |
| Membership terms | https://www.onepeloton.com/membership-terms | Suspension, billing-error, statutory-cancellation copy |
| Accessibility | https://www.onepeloton.com/accessibility | WCAG claim, contact route |
| Impact & Inclusion | https://www.onepeloton.com/impact-inclusion | Values vocabulary |
| Blog (9 articles) | /blog/what-is-peloton-iq, /what-is-club-peloton, /teams-and-challenges, /new-membership-features-2025, /milestones, /secret-to-workout-streaks, /peloton-programs, /peloton-challenges, /lost-motivation-to-workout | The motivation-copy corpus |
| Member Support Center | https://support.onepeloton.com/s/?language=en_US | **Blocked** — renders `Loading` / `Sorry to interrupt` / `CSS Error` / `Refresh` only |

---

## T1 Navigation & IA labels

**Product nav is a hardware series, not a feature list** `[observed]`

The homepage leads with `Cross Training Series` as a section label, then five hardware SKUs whose names are a product-line prefix plus a plus-sign tier: `Cross Training Tread` · `Cross Training Tread+` · `Cross Training Bike+` · `Cross Training Bike` · `Cross Training Row+`. Each link renders the long name *and* the short name (`Tread`, `Bike+`) in the same anchor — the long form for SEO, the short form for the user.

**Product-page sticky sub-nav** `[observed]` — https://www.onepeloton.com/bike

`Overview` · `Peloton IQ` · `Classes` · `Compare` · `FAQ`

The App page uses a labelled variant, `Jump To` → `Overview` · `Features` · `Classes` · `Membership`. Note `Compare` and `FAQ` are peers of `Overview` — objection-handling is given nav-level weight.

**Class taxonomy is unstable across surfaces** `[observed]` — a genuine defect worth recording

| Surface | Disciplines listed |
|---|---|
| Homepage carousel | `Strength` `Cycling` `Yoga` `Running` **`Boxing`** `Rowing` `Meditation` **`Barre`** `Stretching` `Walking` **`Pilates`** |
| `/classes` nav | `Strength` `Cycling` `Running` `Rowing` `Yoga` `Meditation` `Stretching` `Walking` **`Outdoor`** **`Cardio`** |
| `/classes/*` nav | as above, **plus `Pilates`** |
| `/app` | `Strength` `Pilates` `Cycling` `Running` `Yoga` `Rowing` `Meditation` `Stretching` `Walking` `Outdoor` `Cardio` |

`Barre`, `Boxing` and `Pilates` are presented as top-level disciplines on the homepage but all three resolve to `/classes/strength` or `/classes/cardio`. The marketing IA and the content IA disagree. This matters because the homepage is where a prospective member forms their model of what the product contains.

**Footer — four groupings plus a legal bar** `[observed]`

- `Shop and Learn`: `Home Trial` · `Membership` · `Refurbished Bikes` · `Purchasing Used Peloton Bikes` · `Gift cards` · `Financing` · `Instructors` · `Peloton for Business` · `The Peloton Report`
- `About`: `Our Story` · `Team` · `Careers` · `Press` · `Global` · `Investors` · `Impact & Inclusion`
- `Visit Us`: `Showrooms` · `Hotel Finder` · `Booking a Test Class` · `Studio`
- `Support`: `Contact Peloton` · `Member Support Center` · `Order Replacement Parts` · `Return Policy` · `Warranties & Protection Plans` · `Shipping` · `Product Recalls` · `Security` · `Consumer Health Data Policy`
- Legal bar: `Privacy Policy` · `Terms of Service` · `Membership Terms` · `IP Policy` · `Cookie Settings` · `Accessibility` · `California Transparency Act`

`Purchasing Used Peloton Bikes` in the *shopping* group is an unusual inclusion — Peloton documents the secondary market it does not control. `Consumer Health Data Policy` sits in Support rather than the legal bar, which is arguably the wrong home for it.

**The blog IA is the motivation taxonomy** `[observed]` — https://www.onepeloton.com/blog/what-is-club-peloton

`Train` · `Recover` · `Level Up` · `Connect` · `Shop`

- `Train`: `Bike` `Row` `Run` `Sculpt` `Strength Train` `Beginners` `Yoga` `Cardio`
- `Recover`: `Nutrition` `Meditation` `Sleep` `Stretching + Mobility`
- `Level Up`: `Mindset` `Mental Health` `Health` `Marathon + Racing` `Equipment`
- `Connect`: `Member Tips` `Member Stories` `Meet Instructors` `Inspiration` `Member News`

**`Recover` is a top-level peer of `Train`.** Giving recovery equal IA weight to training is the single most transferable structural decision in this file — the information architecture itself de-escalates, before a word of copy is read. `Mental Health` sitting under `Level Up` alongside `Marathon + Racing` is a less comfortable adjacency.

**In-app tab names, quoted on public pages** `[documented]`: `Community` · `Teams` · `Achievements` · `You` · `Programs` · `Discover` · `Search` · `Settings` · `Privacy` · `Preferences`.

## T2 Value proposition & headline patterns

**The hero is a sentence about the user's future, not the product** `[observed]`

> `See where movement takes you`
> `Welcome to your new favorite workout`

Note what is absent: no equipment, no price, no number, no class count. Compare the App page, which is the opposite — `Work out, your way` / "Thousands of classes, no equipment needed." The register splits by purchase intent: hardware heroes are aspirational and abstract, App heroes are concrete and objection-handling.

**The dominant headline shape is a two- or three-beat parallel with terminal full stops** `[observed]`

`Train smarter. Grow stronger.` · `Classes that challenge. Instructors who inspire.` ·
`Easy to purchase. Easy to get started.` · `Start. Stop. Or pause.` ·
`Find your Community. Find your Team.` · `Strengthen your form. Flex your confidence.` ·
`More personalized. More impactful. More Peloton.`

Fragments punctuated as sentences. The rhythm does the persuasive work; the content is often near-empty (`More Peloton`). This is a house style, applied consistently enough to be a recognisable voice signature.

**Permission-giving headlines are a distinct and deliberate class** `[observed]`

- `Workouts for when you want to` (/classes) — the conditional clause is the whole point
- `There's no wrong way to ride` (/bike)
- `Some days you know exactly what you need. Other days you discover it.` (/)
- `Earn points just by doing you` (/club-peloton)
- `Instructors for every you` (/) — "every you" rather than "everyone", framing variability *within* one person rather than across people

That last construction is worth stealing. `Instructors for every you` accepts that the same user arrives in different states on different days, and makes the catalogue the answer to mood rather than to goal. The supporting line confirms it: "Whatever you're feeling, there's an expert instructor who lives for it."

**Pressure and permission sit side by side** `[observed]` — the central tension of the file

`The more you show up, the higher you climb` and `Surprises that are worth the push` appear on the *same page* as `Earn points just by doing you` and a FAQ answer stating points never decay. Peloton runs both registers simultaneously. See T14.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Skip to main content` | First in DOM, every www page | Accessibility |
| `Shop Tread` / `Shop Bike+` | Homepage hero | Two primaries, no single CTA |
| `Explore Treads` / `Explore Bikes` | Homepage category cards | `Explore` for browse, `Shop` for intent |
| `Discover all classes` | Homepage classes section | |
| `Preview strength classes` | Homepage carousel (×11 variants) | **Never a bare `Preview`** — the discipline is always in the label |
| `Try 30 days free` | Class pages, /teams, /classes | The dominant acquisition CTA |
| `Try for free` | /instructors, /classes/beginner-strength-training | Shorter variant, same destination — **inconsistent** |
| `Get started` | /classes/meditation hero | Third label for the same action |
| `Start trial` | /membership comparison table | Fourth label |
| `Stream a free class right now` | Free-class tile | Urgency + zero-cost stacked |
| `Play preview` | Class cards | |
| `Show more classes` | Paginated grids | |
| `Explore more classes on the App` | /classes/strength/adaptive, end of a *complete* list | Exhausted-list CTA (see T8) |
| `Clear filters` | /classes/strength/adaptive | |
| `Show only differences` | /membership comparison toggle | Good progressive-disclosure label |
| `Compare all features` | /app-membership, /app | |
| `Stack` / `Schedule` / `Bookmark` | Class-detail action row | Three distinct save verbs — `Stack` is coined |
| `Check your level` / `Learn how to earn` | /club-peloton hero | Anchor CTAs, not navigations |
| `Log in here` / `Log in` | "Already a member?" | |
| `Visit Support Center` / `Contact Peloton` | Footer | |
| `Learn more about Truemed and see additional terms` | HSA/FSA footnote | Fully specific, names the third party |
| `Join Program` / `Mark Program as done` | In-app, quoted in blog `[documented]` | |
| `Create a Team` / `Create Challenge` | In-app, quoted in blog `[documented]` | |
| `View point history` | In-app, quoted in FAQ `[documented]` | |
| `Pay with HSA/FSA funds` / `Pay Over Time` | Checkout options, quoted `[documented]` | |
| `Refresh` | Support-site error screen | `[observed]` as a failure state |

**Observation.** Peloton ships **four different labels for "start a free trial"** — `Try 30 days free`, `Try for free`, `Get started`, `Start trial` — across surfaces a single user could cross in one session. It does, however, almost never ship a bare `Learn more`; the two instances found (`/bike` haulaway, blog App card) both sit inside a card whose heading supplies the object.

## T4 Onboarding & getting-started

**Homepage 3-step — goal first, plan second, effort last** `[observed]`

1. `Set your fitness goal` — "Choose what you're working towards. Whether it's building strength, boosting endurance, or simply moving more — Peloton IQ will build towards it."
2. `Get your weekly plan` — "No more guessing. Peloton IQ helps create your very own weekly personalized plans that adapts to your goals and keeps you on track."
3. `Start training` — "Your plan is ready. Just show up and we'll handle the rest."

Two things. The goal ladder in step 1 descends to `simply moving more` — the lowest rung is named explicitly, so a user with no fitness ambition is not excluded at the first step. And step 3 reduces the user's obligation to one verb: **"Just show up and we'll handle the rest."** That is the thesis of Peloton's onboarding voice — minimise the stated commitment at the point of decision.

(Step 2 contains a live subject-verb agreement error: "plans that adapts".)

**Teams 4-step, numbered `01`–`04`** `[observed]`

`01 Sign up` · `02 Download` · `03 Join` · `04 Interact` — each a single imperative verb, each with one supporting sentence. `04 Interact` is the weakest: "Cheer on friends, drop links, or share photos to your Feed." The label is abstract where the body is concrete.

**Club Peloton 3-step is a status ladder, not a task list** `[observed]`

1. `Your activity determines your level`
2. `You rise up through the ranks`
3. `Your level stays with you`

Step 3 exists purely to remove a fear (that status decays). Structurally, Peloton spends a third of its onboarding explaining what *won't* happen to you. Compare T6.

**Trial language inventory** `[observed]`: `Join today with a 30-day free trial` · `New members try for free. Cancel anytime.¹` · `Cancel anytime before free trial ends.` · `New paid memberships only. Terms apply.*` · "There is no upfront cost to a trial, but Members are required to have a payment method on file."

That last sentence is the honest version of a free trial — it names the card requirement in the same breath as the zero cost, rather than deferring it to checkout.

## T5 Form & field labels

Thin, because everything transactional is behind auth. `[observed]` unless noted.

| Label | Context |
|---|---|
| `Your Email*` | Email capture — /bike, /home-trial, /peloton-iq |
| `Email*` | /app, /financing |
| `Email` | Blog footer, global footer |
| `Filters` · `Duration` · `Class type` · `Adaptive` · `Clear filters` | Class-list filter rail |
| `Monthly` / `Annual` | Pricing toggle |
| `Tooltip` | /app-membership, /app — **a visible/accessible label reading literally "Tooltip"** |

`Adaptive` sitting as a peer facet alongside `Duration` and `Class type` is the notable one: accessibility-relevant content is a filter dimension, not a segregated section.

**In-product field labels, quoted in help content** `[documented]`:
`Make my Club Peloton level private` (checkbox) · `Hide my Club Peloton level` (toggle) · `Personalized Experience` (toggle) · "Set a Team name, optional description, and color." · "Choose who can join your Team." · "Select a challenge based on number of days, time, number of workouts, or distance."

`[absent]`: placeholders, hint text, validation-requirement copy, password rules. None are server-rendered anywhere on the public site.

## T6 Status & state language

**Club Peloton — an 11-level, 5-tier status ladder** `[observed]`

`Bronze I` · `Bronze II` · `Bronze III` · `Silver I` · `Silver II` · `Silver III` · `Gold I` · `Gold II` · `Gold III` · `Champion` · `Legend`

Two tiers escape the metal scheme at the top (`Champion`, `Legend`), which is where the naming stops being a material and starts being an identity. Point bands are published twice at different granularities — the marketing page collapses the nine metal levels into three bands, the blog lists all eleven. The marketing simplification is defensible; the fact that both are public and disagree in shape is a maintenance risk.

Earn categories `[observed]`: `Workout days` · `Weekly & yearly streaks` · `Milestones` · `Community` · `Progress`.

**Streak states and the loss rule** `[observed]`

- `daily streak` · `weekly streak` · `3-week streak` · `1-year (or 52-week) streak`
- Badge intervals: "from 3, 5, and 10 weeks all the way up to 208 weeks (or 4 years)"
- Loss rule stated plainly: "When you miss a day of activity, your daily streak will reset."
- Screen string, captured via alt text: `You have a 5 week streak`

**The de-escalation states are the interesting ones** `[observed]`

Peloton writes explicit *non-decay* states, which most gamified products do not:

- "Do I lose points or have my points reset if I don't use Peloton equipment or the app for a while?" → **No**
- "Every point you earn stays with you for good and won't expire as long as you're a Member."
- Pause vs cancel is modelled as two different states with different consequences: "If you pause your membership, you'll keep your Club Peloton level and points. But if you cancel, you'll lose your level and your points will reset to zero."

So there are three membership states — active, paused, cancelled — and status survives one of the two lapses. Naming `pause` as a first-class state that *preserves* earned status is good practice; making `cancel` destroy it is a retention lever that the same page's legal note quietly contradicts (see T10).

**Class and content states** `[observed]`: `Beginner` / `Intermediate` / `Advanced` chips · `Free class` · `Originally aired 3/9/23` · `Explicit` · `Subtitles: DE, EN, ES` · pagination `Showing 24 of 289` · carousel `Showing slide 1 of 11`.

Class-detail section labels: `More info` · `Equipment` · `Featuring music by` · `Playlist` · `Class plan` · `Body activity`, with segment rows like `Warm Up 3 min` and muscle attribution as `Secondary muscle group` / `Tertiary muscle group` plus percentages.

**The metering state is the harshest string on the site** `[observed]`, /membership:

> "Each time you take a class, you will be notified in app, and a class is considered taken after 180 seconds."
> "Once a class is taken, it cannot be removed or replaced with another cardio equipment class."

App One caps cardio-equipment classes at three per month. A 180-second irreversible consumption threshold turns *browsing* into a risk. The copy is accurate and clear; the policy it describes is the problem, and no amount of wording softens it.

**Membership states** `[observed]`: `free trial` · `paid Peloton Membership` · `overdue` · `auto-renewal` · `prepaid period` · `pause` · `cancel` · `terminate or suspend` · `restoration of service fee` · `Committed Membership Period`.

**Program state** `[observed]`: classes you didn't take are `skipped` — a neutral, non-judging word chosen over "missed" or "failed".

## T7 Error, failure & recovery

Genuinely thin — the marketing site exposes almost no failure copy.

`[observed]` on the support site's own failure screen: `Sorry to interrupt` · `CSS Error` · `Refresh` · `Cancel and close` · `Loading`. These are Salesforce platform strings, not Peloton's, and their presence is itself the finding: Peloton's entire support surface is gated behind a JS shell that fails loudly and unhelpfully.

`[observed]` on every www page: `You need to enable JavaScript to run this app.`

`[observed]` in /membership-terms — suspension triggers written as conditions, with a notification promise attached: "your payment is overdue (provided that we will use reasonable efforts to notify you of the overdue payment before we terminate or suspend)". And a blocking-gate explanation: "Failure to provide all required Account Registration information will prevent you from successfully activating your Membership or using your Activation Code."

`[observed]` in /club-peloton FAQ — a degraded-state explanation offered pre-emptively: "Sometimes there could be a delay when you're having internet issues or there's a problem with the app."

`[absent]`: form validation, payment declines, 404, offline states, retry microcopy. All behind auth or behind the blocked support site.

## T8 Empty states

`[observed]` — the only true list-exhaustion state on the public site is on the adaptive-classes page: `Showing 18 of 18` followed by `Explore more classes on the App`. The CTA at the end of a complete list routes to the product rather than showing nothing — a defensible pattern, though it means the smallest catalogue on the site (18 adaptive classes) terminates in an upsell.

`[documented]` — Peloton publishes its **data-threshold gates**, which function as pre-emptive empty-state explanations:

- "You'll need to have completed at least three recent workouts of the same discipline to see cardio performance estimates."
- "You'll need to have completed at least three recent non-meditation workouts to receive insights."
- "To receive personalized recommendations, you'll need to make sure you've selected a fitness goal and that you've completed at least five recent non-meditation workouts."

Three different thresholds (3 same-discipline, 3 any, 5 any + a goal) for three different features. Publishing them is good — a user who sees an empty insights panel can find out why. Having three is a content-design problem nobody has resolved.

`[documented]` — a no-goal-set state written as prose: "Don't have a goal set up yet? You can add one from your equipment homescreen or join a Personalized Plan in the Peloton App at any time."

`[documented]` — a surface-gap state, admitted rather than hidden: "On the Peloton website: You won't be able to see your point history on the website, but you can always check it out on the Peloton App or equipment."

`[absent]`: verbatim in-product empty states — no-results-for-filter, empty Stack, empty Bookmarks, empty Teams feed, zero-workout profile.

## T9 Notifications & system messages

`[observed]` — notification *types* are named as a reward category on /club-peloton:

- `Instructor shoutouts and milestone alerts` — "That little bit of added recognition to keep you pushing further."
- `First access to on-demand classes or challenges`
- `Invites to exclusive events`

Recognition notifications are sold as a *benefit of status*, not as a system function. That is an unusual framing and a strong one: the notification is the reward.

`[observed]` — in-workout coaching cues, given as examples of Form Feedback: **`keep your back straight`** and **`try to go a bit lower if you can`**. The hedge in the second (`if you can`) is doing real work — a real-time correction that leaves the user an out. Compare the same feature described elsewhere as ensuring "you're executing every rep flawlessly", which does not.

`[documented]` — voice wake-word: `OK Peloton`.

`[documented]` — cross-device notification behaviour is disclosed: "You'll get notifications about teams on your equipment, but you'll need the Peloton App to join a Team and take part in challenges."

`[observed]` — newsletter framing, two variants:
- Blog footer: `Level up your inbox.` — "Subscribe for a weekly dose of fitness, plus the latest promos, launches, and events."
- Article footer: `Strengthen your mind-body connection` — "Enter your email to get articles, expert-backed tips, and updates from Peloton sent to your inbox."

`Level up your inbox.` applies the product's core escalation verb to an email list. It is a good joke and a small tell about how pervasive the verb is.

`[absent]`: verbatim push strings, toast strings, email subject lines.

## T10 Disclosures, legal & compliance

**The Club Peloton legal note is the standout artefact** `[observed]`, /blog/what-is-club-peloton — a rewards-system de-risking disclosure written in full:

> "Club Peloton is a purely motivation-based status system. Points, levels, and any benefits provided within or in connection with Club Peloton serve exclusively to recognize your activity and engagement; they have no cash value and do not create any entitlement to redemption, payment, or the receipt of specific services."

Restated in the FAQ in plainer words: "Points aren't a currency, don't have a cash or market value, can't be redeemed, exchanged, or transferred" and "Benefits are optional, voluntary additions to the experience, not a contractual right."

The tension is visible on one page: `Surprises that are worth the push` (marketing) and `Benefits are optional… not a contractual right` (FAQ). Peloton is simultaneously promising and disclaiming. The disclosure is honest; the adjacency is uncomfortable, and it is exactly the adjacency a content designer working on loyalty or rewards copy has to resolve.

**Standing medical disclaimer on every blog article** `[observed]` — the escalation route is explicit:

> "…does not constitute individualized advice. It is not intended to replace professional medical evaluation, diagnosis, or treatment. Seek the advice of your physician… If you are having a medical emergency, call your physician or 911 immediately."

Placed at the foot of every article, including ones about mental health and motivation. It is boilerplate, but it is present and it names 911.

**Camera and biometric consent** `[observed]`, /peloton-iq FAQ — the best consent copy on the site:

> "…completely optional, and you choose whether to enable it."
> "**Images and videos from the camera are not recorded or stored.**"
> "You can opt out of using the camera at any time by navigating to Profile Settings."

Structure worth stealing: state optionality → state what is *not* retained → name the exact settings path to reverse. Three sentences, no legalese, and the negation (`not recorded or stored`) does more reassurance work than any positive security claim would.

**Affirm / APR disclosure set** `[observed]`: per-SKU monthly figure, term, APR, and base price in one sentence; then "Your rate will be 0% APR or 4.99% APR based on eligibility. A down payment may be required."; then the lender panel; then state-licence notice; then a bounding stack — "Not available outside the U.S. Delivery restrictions apply… Void where prohibited."

**Trial and return terms** `[observed]`: "First-time purchasers only. One trial per household. Upfront payment required. Return fees may apply. Only eligible in 48 contiguous states." Return fees are published as figures (`$150` Bike/Bike+, `$250` Tread/Tread+/Row+) rather than as "fees may apply", and the non-refundable exception is stated: "any assembly fees paid at purchase are non-refundable."

**HSA/FSA** `[observed]` — eligibility is disclaimed twice in one footnote: "Qualification… is determined by Truemed and is not guaranteed. Reimbursement eligibility is determined by the HSA/FSA plan administrator and is not guaranteed." Two separate gatekeepers, both named, neither promised.

**Statutory cancellation rights** `[observed]`, /membership-terms — dedicated blocks for British Columbia, Ontario (Consumer Protection Act 2002), Saskatchewan, and New York auto-renewal law, plus a billing-error window: "please notify us within 60 days of the billing date… Peloton will not issue refunds or credits after the expiration of this 60-day period, except where required by applicable law."

**Safety and restriction copy** `[observed]`: "Age, height and weight restrictions apply." and "We recommend at least 24" of space on all sides… The ceiling height minimum is 8'".

## T11 Help-centre architecture

**Blocked.** `support.onepeloton.com` is a Salesforce Experience Cloud application that returns no server-rendered content. What follows is reconstructed from footer links `[observed]` and article slugs linked from marketing pages `[documented]`.

**Topic structure** `[documented]` — pattern `/s/topic/<18-char-ID>/<slug>`: `Membership` · `Bike` · `Returns + Exchanges` · `Billing + Payment`. Page types: `/s/`, `/s/topic-catalog`, `/s/contact-us`, `/s/article/<slug>`.

**Article-title grammar — a `Domain: Task` pattern** `[documented]`

- `Peloton Membership: How to Manage Your All-Access Membership`
- `Peloton Account: How to Locate Product and Membership Invoices`
- `Order Experience: Delivery Emails & Tracking`
- `Peloton Partnerships: Sell or Recycle Old Equipment with Peloton Repowered and Haulaway`
- Bare noun phrases for policy: `Peloton Return Policy` · `Peloton Recall Information` · `Peloton Hardware Limited Warranty and Protection Plans`
- Legacy first-person question form, still linked live from /membership: `How Do I Begin My 30-Day Free Trial?`

The last is the finding. Peloton migrated from Zendesk to Salesforce and the two title grammars now coexist in the live footer — **first-person questions** (`How Do I Begin My…?`) alongside **third-person noun phrases** (`Peloton Membership: How to Manage…`). The older grammar is the more findable one; the newer is the more taxonomic. Nobody reconciled them.

**Support-site entry points** `[observed]`: `Contact Peloton` · `Member Support Center` · `Order Replacement Parts` · `Return Policy` · `Warranties & Protection Plans` · `Shipping` · `Product Recalls` · `Security` · `Consumer Health Data Policy`. Phone published two ways: `1-866-679-9129` (footer) and `866-679-9129` (/home-trial FAQ).

**In practice the marketing FAQs *are* the help centre.** 88 distinct FAQ questions were captured across 11 marketing pages (see T12). For an unauthenticated user this is the only readable self-service surface Peloton has.

## T12 FAQs

88 questions captured verbatim across /membership, /app-membership, /app, /bike, /home-trial, /peloton-iq, /club-peloton, /teams, /financing, /classes, /classes/strength, /classes/meditation. A representative selection, grouped by the job each block is doing:

**Reframing the product category** (/app): `Isn't Peloton just an exercise bike company?` · `Can you use the Peloton App with any bike, treadmill, or rower?`

The first is a **negative-premise question** — Peloton states the misconception in the user's own dismissive voice and then refutes it. Rare, and effective, because the user who holds that belief will recognise their own sentence.

**Lowering the barrier** (/classes, /classes/strength): `Do I need a Peloton Bike or Tread to take classes?` · `Do I need equipment for these workouts?` · `Can I take Peloton classes at the gym?` · `Will classes fit into my schedule?` · `Does Peloton have strength-training classes available for beginners?`

Every one of these is an objection phrased as a capability question. `Will classes fit into my schedule?` is the one doing the most work — it is the real objection, and it is asked in the second person about the user's life rather than about the product.

**Pre-empting anxiety about the rewards system** (/club-peloton): `Do my points expire?` · `Do I lose points or have my points reset if I don't use Peloton equipment or the app for a while?` · `What if I want to hide my Club Peloton level?` · `Is my Club Peloton activity public, and how is my data used?` · `Do points guarantee a reward or benefit?` · `Can I exchange my points for money or "buy" rewards with my points?` · `Can Club Peloton change or end?`

Seven of the sixteen Club Peloton questions are about **loss, privacy, or the absence of an entitlement**. Peloton built a status system and then wrote an FAQ that mostly reassures people the status can't hurt them. `Can Club Peloton change or end?` is an unusually honest question for a brand to ask on its own behalf.

**Consent and data** (/peloton-iq): `How is my data shared or used to train Peloton IQ?` · `How does the Movement-Tracking Camera work? Can I opt out of using the Movement-Tracking Camera?`

The second is a **compound question that pairs the mechanism with the escape hatch** in a single heading — the user does not have to read one answer to find out whether the other question is even answerable.

**Financing and returns** (/financing, /home-trial): `Will Affirm conduct a credit check/will my credit score be impacted?` · `If I finance my purchase with Affirm, then return my equipment, will I be responsible for a return fee?` · `Are all delivery areas eligible for a 30-day home trial?`

The Affirm-plus-return question is a genuine edge case (two systems interacting) and Peloton answers it plainly: the return fee is the customer's direct responsibility and is not deducted from the loan.

**Structural notes.** Placement is always the page foot, under a bare `FAQs` heading with a horizontal rule. Answers are expanded in server HTML (unlike many accordion implementations), so the full answer text is public and indexable. Question count scales with purchase risk: 13 on /bike, 16 on /club-peloton, 7 on /home-trial, 5 on /classes/meditation.

## T13 Terminology & glossary

| Term | Peloton's usage | The alternative it rejected |
|---|---|---|
| `Member` / `Members` | Capitalised as a proper noun throughout marketing *and* legal copy | "user", "customer", "subscriber" |
| `Club Peloton` | The status system | "rewards", "loyalty programme", "points" |
| `Milestones` | Achievement markers, with `badges` as the artefact | "achievements" alone |
| `Stack` | Verb and noun — queue classes for a session | "playlist", "queue" |
| `Just Ride` / `Just Work Out` | Instructor-free modes | "free ride", "open workout" |
| `Peloton IQ` | The AI layer | "AI coach", "smart training" |
| `Form Feedback` | Real-time posture correction | "form check", "coaching cues" |
| `Personalized Plans` | The weekly programme | "training plan", "schedule" |
| `Seated Adaptive` / `Standing Adaptive` | Class-name prefixes | "accessible", "modified", "chair" |
| `adaptive strength athletes` | The people | "disabled users", "people with disabilities" |
| `skipped` | A class in a Program you didn't take | "missed", "incomplete", "failed" |
| `Leaderboard name` | Public handle | "username", "display name" |
| `high fives` | Peer acknowledgement | "likes", "kudos", "cheers" |
| `The Output` | The blog | "blog", "magazine" |
| `Recover` | Blog top-level section | "wellness", "rest" |
| `Committed Membership Period` | Contract term, legal copy | "minimum term", "lock-in" |

**Class-title grammar is a strict template** `[observed]`:

`<duration> min <Modality/Focus>[: <Sub-focus>]` then `<Instructor> • <Discipline>`, optionally prefixed by a difficulty chip.

`20 min Full Body Strength` · `10 min Barre: Glutes & Legs` · `5 min Basics: Mantra` ·
`45 min Full Body Strength: HiLit W3 D2` · `30 min Density Training: Week 1, Day 1` ·
`20 min Seated Adaptive: Bodyweight` · `10 min Standing Adaptive: Core` ·
`20 min Morning Walking Meditation` · `30 min Classic Rock Run` · `20 min 2000s Barre`

**Duration always leads.** That is a content-design decision with a behavioural consequence: the smallest commitment is the first thing the eye lands on, before the difficulty, before the instructor, before the body part. A user scanning for "what can I face today" gets their answer in two characters. It is the most quietly effective anti-pressure choice on the site, and it is structural rather than tonal.

Other observations: focus is named as a body region or a goal, never as an intensity threat. `Basics:` marks a technique ramp distinct from the `Beginner` chip — two different kinds of entry point. Music and mood are first-class naming axes (`Pop Ride`, `Classic Rock Run`, `The Taylor Swift Collection`), which means a user can select on affect rather than on effort.

**Instructor handles are encoded in URLs** `[observed]`: Christine D'Ercole → `IAMICANIWILLIDO`, Adrian Williams → `nooneissafe`, Ben Alldis → `ChampionSpirit`. Leaderboard identity as brand asset.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user, first-person plural for the company, consistently. `See where movement takes you` · `Just show up and we'll handle the rest.` · `If it's not for you, we'll pick it up…` · `We're Here to Listen`. The company acts, and says so, including in the return flow.

**Register.** Informal, contraction-heavy, slang-tolerant: `bangin' playlists`, `ta-da!`, `Psst:`, `no sweat`, `crew`, `inspo`, `get after it`, `lock in`, `Squad up`. Sentence case in UI, title case on the blog — a consistent split. `Member` capitalised everywhere as a brand convention.

**The tone does NOT flatten as stakes rise — and that is the notable finding.** Compare Wise (exemplar 041), where colloquialism disappears from the fee table. Peloton runs the same escalation register through motivation copy, product copy, and — critically — the rewards disclosure environment. `Surprises that are worth the push` sits beside a paragraph disclaiming any entitlement. The voice is uniform where a gradient would serve the user better.

### The pressure gradient — this is the benchmark artefact

Peloton's coaching copy is an unusually clear specimen because it contains **both** an over-pressuring register and an explicit de-escalating one, often on the same page. Both are `[observed]`.

**Copy that risks over-pressuring:**

1. **Loss aversion stated plainly.** "When you miss a day of activity, your daily streak will reset." (/blog/secret-to-workout-streaks)
2. **Member testimony normalising extreme behaviour, published without counterweight.** The same article quotes a Member describing rising before 4am daily "to make sure I don't need to spend any time during the day worrying about losing my streak", and another describing working out during a child's hospitalisation to preserve a streak. These are presented as tips. This is the most serious content-design failure in the file: user-generated aspiration is being used as editorial guidance, in an article about a mechanic the same brand elsewhere tells you not to stress about.
3. **Accountability framed as anti-cheating.** "be accountable (no cutting a set short!)"
4. **Absolute standards for form.** "individualized corrections to ensure you're executing every rep flawlessly" — `flawlessly` admits no acceptable variance.
5. **Escalation verbs as default vocabulary.** `level up` appears on nearly every surface including the newsletter CTA; also `push you to your limits`, `crush`, `get after it`.
6. **Community as competition.** "See how your rank stacks up against your teammates on the weekly leaderboard."
7. **Status destroyed by cancellation.** "if you cancel, you'll lose your level and your points will reset to zero." — sunk cost weaponised against churn.
8. **Irreversible consumption of a capped resource.** The 180-second class-taken rule (see T6).

**Copy that deliberately de-escalates** — and this set is genuinely strong:

1. **Points reward presence, not performance.** "Points aren't based on your output or Leaderboard rankings—it's all about your presence and commitment, not your performance." Restated on /app as "you'll earn points for showing up — not for how fast or strong you are".
2. **Explicit permission to break a streak.** "But don't stress too much if you miss a few days—just start again and watch the days and weeks tick up."
3. **No decay, stated as a rule and as an FAQ answer.** "Every point you earn stays with you for good…"
4. **Existing members not reset on launch.** "even though Club Peloton is new, existing Members won't be starting from scratch"
5. **Milestones reframed away from finality.** "milestones are a beautiful reminder of all the work you've put in to get to that point, rather than a finish line." Plus "it's never a race to the finish" and "habits will beat motivation every time".
6. **Programs made non-punitive.** "We've made schedules more flexible, so you can take Programs at your own pace **without the risk of getting locked out**… if you need an **extra recovery day** or miss a week while you're on vacation, you'll be able to jump right back in where you left off, regardless of how much time has passed."
7. **The coach can be turned down.** "You can customize the frequency of form cues you receive as well as the speaker volume, or turn them off completely, if you'd like."
8. **Guidance can prescribe less.** "if your form needs improvement, you might be prompted to decrease your weight and focus on doing each rep correctly." A recommendation engine that recommends downwards.
9. **Status can be hidden.** `Hide my Club Peloton level` — the badge is public by default but one toggle away from private, and the FAQ says so before the user asks.
10. **A whole article naming pressure as a cause of failure.** /blog/lost-motivation-to-workout lists "You Felt Pressured Into Your Workout Goal" as a reason for lost motivation, critiques "all of that 'new year, new me' messaging", and offers: "Avoid an All-Or-Nothing Mindset"; "don't shame yourself and ditch your workout altogether—rather, embrace your second 'back-up' goal"; "You don't have to be motivated, but you can be dedicated and committed."; "I gradually rebuild instead of going from zero to 100".

That last line — **"You don't have to be motivated, but you can be dedicated and committed."** — is the single best sentence in the Peloton corpus. It separates affect from behaviour and asks only for the behaviour.

**Accessibility statement** `[observed]` — https://www.onepeloton.com/accessibility

Headings: `Accessibility at Peloton` · `Our Commitment` · `Our Mission and Action` · `We're Here to Listen`.

- Standard cited: "W3C Web Content Accessibility Guidelines (WCAG) 2.1 Level A+AA", used "as the guide to rebuild onepeloton.com"
- "We engage in user research with members of our community with disabilities…"
- Product features named: "Subtitles are available for all on-demand classes as well as live classes in English." and "TalkBack screen reader available for the Peloton Bike, Bike+, Tread, and Row for Members who are blind or have low vision."
- Contact: `Email Us: accessibility@onepeloton.com`

**Gaps in the statement:** no conformance-level claim (partially/fully conformant), no date of last review, no known-limitations section, no non-email contact route. The framing verb is `guide to rebuild` rather than a conformance assertion — defensible, but it means the statement commits to a process rather than to a level.

**Alt text — highly uneven** `[observed]`

Good, scene-level: "Smiling instructor holding a kettlebell close to her chest during a strength training workout." · "Instructor in profile with eyes closed and hands in a prayer position during a meditation session."

Exceptionally good — alt text that carries UI copy so a screen-reader user gets the actual string: "Screen showing "You have a 5 week streak" with days of the week displayed. Monday through Wednesday checked off in purple" and a full transcription of the Club Peloton tier chart including every point band.

Defects found live:
- **Malformed alt on the homepage Barre card**: `alt="Smiling instructor performing a glute kickback on a yoga mat during a Barre class.` — an unescaped `alt=` and unclosed quote leaking into the accessible name.
- **Filename-as-alt** across several pages: "Screenshot 2025-09-05 at 2.55.25 PM", "NG Financing Bike Desk big", "lane-bikes", "green gradient".
- **Generic repeated alt**: "Peloton Instructor working out" on dozens of distinct class cards.
- An element whose visible/accessible label is literally `Tooltip`.
- `Skip to main content` is present and first in DOM on every www page — correct.

**Adaptive and inclusive framing** `[observed]` — the strongest inclusion practice in the file:

- `Seated Adaptive` / `Standing Adaptive` as class-name prefixes, inside the normal title grammar, not in a segregated section
- `Adaptive` as a peer filter facet
- Athlete-first nouns: `adaptive strength athletes`, `seated athletes`
- Class copy: "Fitness is for everyone, and this class embodies that spirit."
- Cross-link from beginner content: "You can also find adaptive strength training options and bodyweight classes."

Naming people `athletes` rather than by their disability, and filing adaptive classes under `Strength` rather than under an "Accessibility" ghetto, are both structural choices that a content designer can replicate.

**Other live copy defects recorded**

- Price hydration placeholders leak as `$0/mo`, `$0`, `Save up to $0` on /membership, /app-membership, /app — a real user can briefly see "$0/mo" as a price.
- Refurbished Bike+ Affirm figure inconsistent across four pages ($116.25/$1,395 vs $166.25/$1,995 vs $166.25/$1,395).
- Punctuation error in a goal list: "Get Stronger, Support Weight Goals. Boost Cardio Fitness, and Promote Longevity".
- Subject-verb error in homepage step 2: "plans that adapts".
- Copyright reads `© Peloton 2012-2023` on a site carrying 2026 content.
- /teams FAQ quotes a real price ("$12.99/mo") while the same page's footnote says "$0/mo".
- Product-name drift: "Row" vs "Row+" between /bike FAQ and /home-trial.

---

## Transferable patterns

1. **Put duration first in the object name.** Peloton's class titles lead with `10 min` / `20 min` before difficulty, focus or instructor. The smallest commitment is the first thing read. This is anti-pressure design done structurally rather than tonally, and it transfers to any catalogue where the user's real question is "what can I face right now" — onboarding task lists, help-article reading times, KYC step estimates.
2. **Give recovery equal IA weight to effort.** `Recover` is a top-level peer of `Train`. Where your product has an effortful primary action, naming the not-doing-it path as a first-class category legitimises it before any copy runs. Condition: only works if the recovery content is genuinely as good as the training content, or it reads as tokenism.
3. **Write the non-decay state explicitly.** "Do I lose points if I don't use Peloton for a while? — No." Most gamified systems leave decay ambiguous, which maximises anxiety at no benefit. State what *cannot* be taken from the user, as a rule and as an FAQ answer. Directly applicable to loyalty tiers, cashback accrual, and credit-limit or seller-status copy.
4. **Separate affect from behaviour.** "You don't have to be motivated, but you can be dedicated and committed." Asks only for the action, releases the user from having to feel a way about it. Transfers to any recurring obligation — savings plans, repayment schedules, verification reminders.
5. **Consent copy: optional → what is not retained → the exact reversal path.** The Movement-Tracking Camera FAQ does this in three sentences with a bolded negation. The negation ("not recorded or stored") reassures more than any positive security claim. Directly reusable for biometric, camera, location and device-data consent.
6. **Pair the mechanism and the escape hatch in one FAQ heading.** "How does the Movement-Tracking Camera work? Can I opt out…?" saves the anxious user a second read.
7. **Do not publish user testimony as guidance without a counterweight.** The streak article's 4am and hospital quotes are the clearest failure mode in this file: authentic member voice used as editorial recommendation, contradicting the brand's own de-escalation copy two pages away. If you quote extreme member behaviour, the surrounding copy has to mark it as extreme.
8. **Watch the uniform register.** Peloton applies the same escalation voice to a workout and to a rewards disclaimer. Wise (041) flattens its tone as stakes rise; Peloton does not, and the result is a marketing line promising "surprises worth the push" adjacent to a paragraph disclaiming any entitlement. Pick the gradient deliberately.

## Caveats & gaps

- **The entire Member Support Center is blocked.** `support.onepeloton.com` is a Salesforce Experience Cloud JS application returning no server HTML. Help-centre architecture (T11) is reconstructed from footer links and article slugs only; no article bodies, no category descriptions, no search behaviour. An authenticated or browser-rendered pass is required.
- **`/warranty` and `/returns` both redirect into blocked surfaces** (support site and `account.onepeloton.com`). Warranty copy in T10 comes from a /bike FAQ answer, not the warranty document.
- **All in-product states are `[documented]` at best.** Streak screens, badge screens, empty states, validation, toasts and push copy are described in blog articles and FAQ answers, never observed. Two in-product strings were recovered *via alt text* (`You have a 5 week streak`, the tier chart) — an accidental but useful channel.
- **Price strings are unreliable.** Membership prices render as hydration placeholders (`$0/mo`) in server HTML. No membership price in this file should be treated as real. Hardware prices are server-rendered and are real.
- **Locale is en-US only.** Asset filenames reference `US-UK-AUS-CA` variants; none were harvested. Any claim here should be re-verified before use as UK or EU precedent, particularly the Affirm and HSA/FSA disclosures which are US-specific.
- **Terms of Service was fetched but only its opening section read** (65KB). The Consumer Health Data Policy and Privacy Policy were not harvested.
- **Mobile app copy is out of scope** — app-store and in-app strings are not on the public web surface, and this is where most of Peloton's motivation copy actually lives.

## Sources

1. https://www.onepeloton.com/
2. https://www.onepeloton.com/app
3. https://www.onepeloton.com/app-membership
4. https://www.onepeloton.com/membership
5. https://www.onepeloton.com/membership-terms
6. https://www.onepeloton.com/classes
7. https://www.onepeloton.com/classes/strength
8. https://www.onepeloton.com/classes/meditation
9. https://www.onepeloton.com/classes/beginner-strength-training
10. https://www.onepeloton.com/classes/strength/adaptive
11. https://www.onepeloton.com/classes/strength/20-min-seated-adaptive-bodyweight-logan-aldridge-1678374000
12. https://www.onepeloton.com/instructors
13. https://www.onepeloton.com/club-peloton
14. https://www.onepeloton.com/teams
15. https://www.onepeloton.com/peloton-iq
16. https://www.onepeloton.com/bike
17. https://www.onepeloton.com/home-trial
18. https://www.onepeloton.com/financing
19. https://www.onepeloton.com/accessibility
20. https://www.onepeloton.com/impact-inclusion
21. https://www.onepeloton.com/terms-of-service
22. https://www.onepeloton.com/blog/what-is-peloton-iq
23. https://www.onepeloton.com/blog/what-is-club-peloton
24. https://www.onepeloton.com/blog/teams-and-challenges
25. https://www.onepeloton.com/blog/new-membership-features-2025
26. https://www.onepeloton.com/blog/milestones
27. https://www.onepeloton.com/blog/secret-to-workout-streaks
28. https://www.onepeloton.com/blog/peloton-programs
29. https://www.onepeloton.com/blog/peloton-challenges
30. https://www.onepeloton.com/blog/lost-motivation-to-workout
31. https://support.onepeloton.com/s/?language=en_US — **blocked**
