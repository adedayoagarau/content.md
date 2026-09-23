# 091. Bolt

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Ride-hailing and micromobility super-app (Europe/Africa) |
| Primary URL | https://bolt.eu/ |
| Corpus rank | 091 |
| Benchmark strength (source list) | Mobility onboarding and support |
| Locale / market observed | en (global `/en/` path; Estonian-origin, no country geo-switch observed — locale selector shows `EN` only) |
| Platform observed | Web (desktop marketing), Bolt Support portal (Gatsby-rendered, server HTML present) |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Bolt Technology OÜ (Estonia); WCAG 2.1 Level AA and EN 301 549 named as accessibility targets; insurance and product availability disclaimed per country; no financial regulator disclosure on the surfaces harvested |
| Harvest date | 2026-09-21 |
| Pages inspected | 10 |
| Harvest completeness | Partial — help-article *titles* captured in volume across three audience categories; article bodies not opened. Non-English locales not harvested. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage | https://bolt.eu/en/ | Service grid, earn-side grid, footer IA (six groups) |
| Rides (product) | https://bolt.eu/en/rides/ | Hero, safety feature grid, FAQ accordion (7 Q visible + `View more`) |
| Rider safety | https://bolt.eu/en/rides/safety/ | Fullest safety-feature inventory, before/during/after triptych, FAQ |
| Community Guidelines | https://bolt.eu/en/community-guidelines/ | Four-topic hub, audience-inclusive framing |
| Accessibility at Bolt | https://bolt.eu/en/company/accessibility/ | Standards statement + per-service accessibility features |
| Support: For Riders | https://bolt.eu/en/support/categories/115000431394/ | 8 sections, ~30 article titles surfaced |
| Support: For Drivers | https://bolt.eu/en/support/categories/115000300833/ | 6 sections, ~20 article titles surfaced |
| Support: Bolt Food | https://bolt.eu/en/support/categories/360001224900/ | 5 sections, consumer-delivery vocabulary |
| Support section: Using Bolt | https://bolt.eu/en/support/sections/115000942333/ | Full 9-title list — the T7 core |
| Support section: App and features | https://bolt.eu/en/support/sections/360004805720/ | Full 10-title list |

---

## T1 Navigation & IA labels

**Footer is the real IA — six labelled groups, not one flat list** `[observed]`

`Products` · `Earn` · `Company` · `Support` · `Safety` · `Locations` · `City solutions`

Two of those seven are unusual as first-class footer groups. `Safety` gets its own column with four destinations (`Rider safety`, `Driver safety`, `Scooter safety`, `Safety lab`) rather than being buried under Company. And `City solutions` addresses **municipalities**, not users or earners — `Our mission` and `Charging docks`. Bolt is publicly IA-ing a regulator/city-government audience alongside consumers.

**`Products` group is the service-name inventory** `[observed]`

`Rides` · `Scooters` · `E-Bikes` · `Bolt Drive` · `Bolt Food` · `Bolt Market` · `Bolt for Business` · `Bolt Plus` · `Bolt Send`

Note the split: generic nouns for the core modes (`Rides`, `Scooters`, `E-Bikes`) and brand-compound names for everything adjacent (`Bolt Drive`, `Bolt Food`, `Bolt Market`, `Bolt Send`). Ride-hailing is not branded because it *is* the brand.

**`Earn` group names the person, then the money** `[observed]`

`Bolt Drivers` · `Driver earnings` · `Bolt Couriers` · `Courier earnings` · `Bolt Food Merchants` · `Bolt Fleets` · `Bolt Franchise`

Paired construction: for drivers and couriers the role page and the earnings page are separate, adjacent links. Merchants and fleets get no earnings page — a gap in the parallel structure.

**Support IA is audience-first, seven doors** `[observed]`

`Riders` · `Drivers` · `Bolt Food` · `Couriers` · `Fleets` · `Restaurants` · `Bolt for Business`

The list mixes person-nouns (`Riders`, `Drivers`, `Couriers`) with product names (`Bolt Food`, `Bolt for Business`) and a business-type noun (`Restaurants`). Compare the footer, where the merchant page is `Bolt Food Merchants` but the support door for the same audience is `Restaurants`. **Two labels for one audience across two surfaces.**

**Homepage section labels are one-word category nouns** `[observed]`

`Rides` · `Delivery` · `Car-sharing` · `Groceries` · `Business` · `Micromobility`

These are *not* the product names. The homepage grid uses the generic category as the heading and pushes the brand name into the CTA (`Go to Bolt Food`, `Go to Bolt Drive`, `Go to Bolt Market`). So the user meets the category first and the coined name second — the opposite of the Grab/Gojek pattern in this domain.

**Support-portal secondary nav differs from the main site footer** `[observed]`: the support portal's own footer lists `Rides` / `Food delivery` / `Grocery delivery` / `Scooters` / `Car-sharing` / `Business` / `Airports` / `Cities` — i.e. category nouns where the main site uses `Bolt Food` / `Bolt Market` / `Bolt Drive`. A third labelling register for the same nine products.

**Support breadcrumb** `[observed]`: `Support` › `For Riders` › `Using Bolt`. Category pages are titled `For Riders` / `For Drivers` — preposition-plus-audience, which reads as a signpost rather than a heading.

## T2 Value proposition & headline patterns

**Hero — a slogan, not a task** `[observed]`

> `Riding is the new driving`
> "The freedom to go anywhere without paying for parking, fuel, or maintenance. All you need is an app and a destination."

The headline is an aphorism; the subhead does the work, and it frames value as **negation of ownership costs** (parking, fuel, maintenance) rather than positive benefit. The closer — "All you need is an app and a destination" — reduces the whole proposition to two nouns.

**Product-page headline is flat and functional** `[observed]`: `Ride with Bolt`, subhead "Need a ride? Bolt is your go-to ride-hailing app for fast, safe, and reliable rides in over 850+ cities worldwide." The register drops sharply from the homepage slogan to the product page — question-lead ("Need a ride?"), triple adjective, scale number.

**Service one-liners are a consistent shape: benefit fragment, no verb** `[observed]`

| Service | Line (verbatim) |
|---|---|
| Rides | `Request in seconds, ride in minutes.` |
| Delivery | `Your favourite food, delivered fast.` |
| Car-sharing | `High-quality car rental made easy.` |
| Groceries | `All the essentials whenever you need them.` |
| Business | `Manage business travel for your team and clients.` |
| Micromobility | `2-wheel ride rental at your fingertips.` |

`Request in seconds, ride in minutes.` is the load-bearing one — it appears again as the **app-download banner on every support page**, so the same seven words serve as a service descriptor, a tagline and a support-page conversion prompt. Its structure (two parallel clauses, escalating time unit) is the single most reusable Bolt line.

**Section headers on the earn side are addressed to the earner in second person** `[observed]`: `Drive and earn money` · `Earn with every delivery` · `Increase your sales and reach new customers` · `Grow your transport business`. Each is preceded by a small kicker line that restates the same thing in a different grammatical person — kicker `Earn money as a Bolt driver`, heading `Drive and earn money`. The duplication is redundant but gives SEO and scanning two shapes.

**Self-identification claim** `[observed]`: `Bolt is the first European mobility super-app.` — the "super-app" label is claimed explicitly and geographically bounded, which is worth noting against Grab ("Everyday Everything App") and Careem ("the everything app"). Bolt qualifies with a region; the others do not qualify at all.

**Safety-page headline personifies the company as headcount** `[observed]`: "Behind the scenes, over 500 real people are working to ensure you get where you're going safely. We call them the Bolt Safety Team". The phrase `real people` is doing anti-automation work, and `We call them the…` is a naming-act construction — the company introduces its own internal term to the user.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get Bolt` | Hero, nav, every footer | The primary; app-name-as-verb-object |
| `Get Bolt Food` | Hero, footer, paired with above | Two acquisition CTAs shipped side by side |
| `Get the Bolt app` | Support-portal footer | **Third variant** of the same action |
| `Get the app` | Support pages, app banner | **Fourth variant** |
| `Get started` | Homepage, Rides tile | Only used for the core ride product |
| `Go to Bolt Food` | Homepage, Delivery tile | `Go to` + brand name |
| `Go to Bolt Drive` | Homepage, Car-sharing tile | |
| `Go to Bolt Market` | Homepage, Groceries tile | |
| `Go to Bolt for Business` | Homepage, Business tile | |
| `Learn more` | Micromobility tile, several safety cards | Bare, object-less — used repeatedly |
| `Start riding` | Bolt 7 scooter promo | |
| `Send items` | Bolt Send promo | Verb + object, matches the service name's verb |
| `Our mission` | About block | CTA text = destination page title |
| `Register to drive` | Earn grid | |
| `Register as a courier` | Earn grid | |
| `Register with Bolt Food` | Earn grid, merchant | Inconsistent with the two above (`with` + product, not `as` + role) |
| `Register your fleet` | Earn grid | |
| `Sign up now` | Rides page, business block | |
| `Bolt for Business` | Rides page, business block | CTA is the product name alone |
| `Request a ride` | Support-portal footer | |
| `Order food` | Support-portal footer | |
| `View all` | Blog block | |
| `View all airport transfers` | Airports block | Fully specific — contrast with bare `Learn more` |
| `See all articles` | Every support category section | Consistent |
| `Driver safety page` | Rider safety page | Cross-audience escape hatch, placed high |
| `View more` | FAQ accordions | Progressive disclosure |

**The finding worth recording:** Bolt ships **four distinct labels for "download the app"** — `Get Bolt`, `Get Bolt Food`, `Get the Bolt app`, `Get the app` — and they are surface-determined rather than context-determined (marketing pages use the short brandy form, support pages the descriptive form). It is defensible as a register gradient, but it is not governed.

`Register to drive` / `Register as a courier` / `Register with Bolt Food` / `Register your fleet` is a second inconsistency inside a single four-tile grid: three different prepositional frames for one verb.

## T4 Onboarding & getting-started

`[absent]` as a numbered how-it-works sequence. Bolt ships **no step-by-step "how it works" on the rides surface** — unusual for a ride-hailing marketing page, and a genuine negative finding. The closest equivalents:

**The safety triptych is the de facto journey model** `[observed]` — three stages, each an imperative to the *user*, not a description of the system:

1. `Before` — "Check that the driver's face, car make and registration plate match those shown in the app."
2. `During` — "Our Share Ride Details and Emergency Assist features allow you to ride without worry."
3. `After` — "Rate your driver honestly. Those who repeatedly receive low ratings will be banned."

Note that step 2 breaks the pattern: `Before` and `After` tell the user what to *do*; `During` tells the user what Bolt *has built*. The one moment the user is least able to act is the one where Bolt substitutes product for instruction. Note also that `After` states the consequence of the user's action on a third party ("will be banned") — rating is framed as enforcement participation, not feedback.

**Scheduling onboarding copy** `[observed]`: "Simply enter your details and secure your ride up to 90 days ahead." The `90 days` figure is repeated verbatim in the FAQ answer — a consistent number across two placements on one page.

**Beginner-mode onboarding for scooters** `[observed]`: `Beginner mode` — "We limit your scooter's speed to 15 km/h, so that your first 5 rides are slow and steady." Both the limit and the duration are specific, and the rationale is stated in plain terms ("slow and steady") rather than risk language.

## T5 Form & field labels

`[absent]` — no public unauthenticated form surface was reachable on the harvested pages. The ride request flow, registration flows and the support contact form all sit behind an app or a gated step. Field labels for this product require an authenticated or app-store pass.

One adjacent artefact `[observed]`: the accessibility page documents a **self-service profile-field convention** rather than a form label — "Visually impaired riders can add an eye emoji or an eye and dog emoji to their name in the app". The name field is being overloaded as an accessibility-disclosure field. Bolt documents this as a feature and bounds it: "Currently available in Poland."

## T6 Status & state language

Trip states are not directly observable pre-auth. The help IA names them `[documented]`:

- `Ride did not happen` — a distinct state from cancellation, with its own article. This is the interesting one: Bolt models "the trip is in your history but nothing occurred" as a first-class support object.
- `Pickup longer than expected` — a named degraded state, not an error
- `Estimated time of arrival` — ETA is a documented concept on both the rider side and the driver side, where it has its own failure article (`ETA is incorrect`)
- `How to cancel a ride` (rider) — cancellation is an app action, documented under `App and features`, not under problems
- `I want to know why a ride was refunded` (driver) — refund is a state the driver experiences passively
- `Bolt Balance` — a named wallet state object with articles on both the rides and food sides (`Bolt Balance`, `About Bolt Balance`)
- `How to check the order status` (Bolt Food) — order status is a named, checkable thing on the delivery side; **no equivalent "check your ride status" article exists on the rides side**. Asymmetry between the two verticals.
- `How to manage back-to-back rides` (driver) — a named multi-trip state
- `I have issues with Auto Accept` (driver) — `Auto Accept` is a named driver-side mode

**Timing vocabulary inventory** `[observed]`: `in seconds` · `in minutes` · `24/7` · `up to 90 days ahead` · `15 km/h` · `first 5 rides`. Bolt leans relative and short; no absolute-date construction (no "by Tuesday") appears anywhere in the harvest.

**Availability hedge repeated as a standing disclosure** `[observed]`, three separate placements with three different wordings:

- Homepage: "Products and features vary by country. Some features listed here may not be available in your app."
- Rides & Rider safety: "Products, features, and insurance coverage vary by country. Some features listed here may not be available in your app."
- Bolt Send tile: "Check in app for available features."

The middle version adds `insurance coverage` to the list — the variance disclosure gets heavier exactly where the promise gets more consequential.

## T7 Error, failure & recovery

The strongest category for this product, almost entirely `[documented]` via help-article titles.

**Rider-side failure titles — first-person for experience, bare-noun for system** `[observed]`

First person, present/past, the user as subject:
- `I felt unsafe using Bolt`
- `I left an item in the car`
- `I want to report unknown charges`
- `I want to edit my personal information`
- `I have a complaint about rider behaviour` (driver side)

Third person, the system or counterparty as subject:
- `My Bolt app crashed`
- `My driver's vehicle was in poor condition`
- `The final price was higher than expected`
- `Driver asked cash for in-app payment trip`
- `E-bike is parked badly`
- `E-bikes are not available`
- `Map shows incorrect data`
- `Ride did not happen`
- `Pickup longer than expected`

**`I felt unsafe using Bolt` is the standout title.** Past tense, first person, emotional rather than factual state, and it names the product in the sentence. Most platforms title this "Report a safety incident". Bolt writes the sentence a shaken person would say. Contrast with the adjacent `Using Emergency Assist`, a neutral gerund — the in-the-moment tool is named calmly, the after-the-fact reporting route is named emotionally.

**`Driver asked cash for in-app payment trip`** is the other one to steal. It is grammatically rough (no article, telegraphic) but it names a *specific counterparty misbehaviour* rather than a category. Compare the vaguer `I have a complaint about rider behaviour` on the driver side — riders get a named scenario, drivers get a generic complaint channel. The asymmetry is visible in the IA.

**Driver-side failure titles skew to blocked-access and money** `[observed]`
- `I can't log in to my driver account`
- `I can't download the app`
- `I can't see order price in the ride history`
- `I don't receive orders`
- `Bonus was not added`
- `Monthly tax summary is not clear`
- `How to protect my compromised account`
- `I am receiving unwanted marketing messages`
- `ETA is incorrect`

`Monthly tax summary is not clear` is notable — a help article whose title admits the company's own document is confusing. Most products would title this "Understanding your tax summary".

**Bolt Food failure titles use a uniform `I had a problem with…` frame** `[observed]`
- `I had a problem with the courier`
- `I had a problem with the food quality`
- `I had a problem with the restaurant staff`
- `I had a food safety issue`

Four titles, one grammatical mould, one slot changed each time. This is the most *governed* title set in the whole Bolt help estate — the rides side has nothing this systematic. It also enumerates the three human counterparties (courier, restaurant staff) and the product separately, so the user routes by *who or what failed*.

**Payment-adjacent recovery** `[observed]`: `Why does my bank statement show "BOLT.EU/…"?` — a help article for a statement-descriptor confusion, including the literal string the user will see, quoted. This is a well-chosen article: the trigger is outside the product entirely.

**Pre-emptive framing** `[observed]`: the category descriptions are meta-descriptions written for the router, not the reader — `Detailed guide and information on the rider app, account & rides`, `Information about the driver app, payouts, ride-related issues, etc`, `Information about the food app, placing an order and delivery`. Note `etc` shipped in a live description, and the ampersand/`and` inconsistency across the three.

## T8 Empty states

`[absent]` — no no-results, no-data or first-run state reachable on public surfaces. The support portal's search was not exercised. Requires an in-app pass.

## T9 Notifications & system messages

`[documented]` — notification behaviour is documented as a user-controllable topic rather than shown:

- `Managing app notifications` (rider)
- `Changing the language of marketing messages` (rider) — a *language* preference for marketing specifically, separate from app language (`How to change the app language`). Two distinct locale settings, each with its own article.
- `I am receiving unwanted marketing messages` (driver) — the same concern phrased as a complaint on the driver side and as a setting on the rider side

**Documented outbound safety notification** `[observed]`: `Trusted Contacts` — "Add someone you trust, and if there's ever a safety concern and we can't reach you, we'll notify them." The condition is stated as a two-part gate (concern exists **and** we can't reach you), which is more precise than most emergency-contact copy.

**Documented in-app alert** `[observed]`: Emergency Assist "will also notify our Safety team, who will make an immediate welfare call." The term `welfare call` is doing specific work — it names the callback as a wellbeing check rather than a support call.

## T10 Disclosures, legal & compliance

**Variance disclaimers are the dominant disclosure mode** `[observed]` — see T6. Bolt's principal compliance-flavoured copy is not fee or risk language but *availability* language, repeated on every page that lists features.

**Accessibility standards named explicitly** `[observed]`: "We aim to meet international accessibility standards, including WCAG 2.1 Level AA and EN 301 549, and are working toward full compliance." The construction is honest — `aim to meet` and `working toward full compliance` rather than a compliance claim. Naming EN 301 549 alongside WCAG signals EU procurement/EAA awareness.

**Child-seat disclosure is specified to the regulation** `[observed]`: "Riders can request a car equipped with an EU-compliant booster seat for children aged 3 and up, weighing 15–36 kg." Age band, weight band and regulatory standard in one sentence.

**Service-animal disclosure is framed as the user's right, not the company's policy** `[observed]`: "All passengers have the legal right to be accompanied by their assistance animal when using Bolt." `legal right` rather than "we allow" — a deliberate reframe that transfers the obligation to the platform.

**Legal-footer inventory** `[observed]`: `Suppliers` · `Terms and Conditions` · `Privacy` · `Insurance` · `Cookies` · `Security` · `Community Guidelines`. `Insurance` as a standalone top-level footer legal link is unusual and matches the insurance carve-outs in the variance disclaimer.

**Guidelines-vs-terms boundary stated in plain language** `[observed]`: "While our Platform Terms are the legal basis for using the Bolt platform, these guidelines help explain what respectful, safe behaviour looks like in everyday situations." This single sentence does the job most products fail at — it tells the user which document is binding and what the softer one is *for*. Reusable almost verbatim.

## T11 Help-centre architecture

Three levels: **audience category** → **named section** → **article list**, with a `See all articles` overflow at each section (four titles shown, remainder hidden).

**Section names inside `For Riders`** `[observed]`:
`About Bolt` · `Account and data` · `App and features` · `Bolt Drive` · `Bolt E-bikes` · `Bolt Scooters` · `Payments and pricing` · `Using Bolt`

Eight sections, and **three of them are product names rather than activities**. So inside the "riders" door, a rider looking for scooter help finds it; but a rider looking for Bolt Food help must back out to a different top-level category. The IA is audience-first at level 1 and product-first at level 2, and the two axes collide.

`Using Bolt` versus `App and features` is the soft boundary — `How to cancel a ride` and `How to order a ride` live under `App and features`, while `How to contact my driver` and `How to leave a rating` live under `Using Bolt`. The distinction appears to be *interacting with the app* versus *interacting with the trip*, but it is not signposted and a user would not predict it.

**Section names inside `For Drivers`** `[observed]`:
`About Bolt` · `Account` · `Driving with Bolt` · `Earnings and payments` · `Trip issues` · `Using the Bolt app`

`Trip issues` is a named unhappy-path section — the rider side has no equivalent; rider problems are distributed across `Using Bolt` and `Payments and pricing`. Drivers get a dedicated problem shelf, riders do not.

**Section names inside `Bolt Food`** `[observed]`:
`About Bolt Food` · `Account and Data` · `App and Features` · `Order Issues` · `Payments and Pricing` · `Using Bolt Food`

Nearly a clone of the rider structure, with `Order Issues` in the slot where drivers have `Trip issues`. Note the **capitalisation drift**: `Account and data` (riders) vs `Account and Data` (food); `App and features` vs `App and Features`; `Payments and pricing` vs `Payments and Pricing`. Sentence case on one category, title case on another, for identical section names.

**Article-title grammar — five shapes:**

| Shape | Example |
|---|---|
| `How to <verb>` | `How to cancel a ride`, `How to leave a rating` |
| `How do I <verb>?` | `How do I upload my documents?` |
| `I <state/action>` | `I felt unsafe using Bolt`, `I want to report unknown charges` |
| `<Thing> <verb>s <badly>` | `Map shows incorrect data`, `E-bike is parked badly` |
| Bare gerund/noun | `Using Emergency Assist`, `Delivery information`, `Transportation of luggage` |

`How to cancel a ride` and `How do I upload my documents?` are the same speech act in two grammars, on two audience surfaces. The `How to` form dominates the rider side; `How do I …?` appears on the driver side. Not obviously deliberate.

## T12 FAQs

Two FAQ blocks harvested, both accordion, both with server-rendered answers (unlike many competitors).

**Rides page — `Frequently asked questions`, 7 visible + `View more`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | Can I request a Bolt online? |
| 2 | What determines my ride cost? |
| 3 | What types of cars are available? |
| 4 | How do I get a ride to or from the airport with Bolt? |
| 5 | Can I schedule a ride in advance if I need a car later? |
| 6 | Is the Bolt ride-hailing app available in my city? |
| 7 | What payment methods does Bolt accept? |

Ordering: channel → price → inventory → a specific high-intent use case (airport) → scheduling → eligibility → payment. Q1 is an **anti-app question** ("Can I request a Bolt online?") answered with a yes-but that routes back to the app — Bolt surfaces the web-versus-app friction at position one rather than hiding it.

Q2's answer is the most content-designed line in the set: "Ride prices vary based on the journey distance and ride-type you select, with an upfront price estimate provided once you enter your destination." It bounds the variable, names the two drivers of it, and states when certainty arrives — claim, bound, resolve, in one sentence.

Q5 and Q6 both reuse a number/link that appears elsewhere on the page (`90 days`, the cities page), so the FAQ is being used as a **second delivery of page content** rather than net-new information.

**Rider safety page — `Rider Safety FAQ`, 7 visible + `View more`** `[observed]`

| # | Question (verbatim) |
|---|---|
| 1 | How does Bolt handle customer feedback about safety concerns? |
| 2 | What are the vehicle requirements? |
| 3 | How are driver ratings calculated? |
| 4 | What happens if I get into an accident while riding in Bolt? |
| 5 | How often are the scooters inspected for safety and maintenance? |
| 6 | What happens if I have an accident while riding a scooter? |
| 7 | What safety features are included on Bolt scooters? |

**Structural note:** four of seven are about scooters on a page titled *Rider* safety, and the two accident questions (Q4, Q6) are near-duplicates split by mode. The block is mode-mixed without a mode divider, so a car rider scans past four irrelevant answers.

Q2's answer is a concrete spec, not reassurance: "All vehicles must be 4-door, have working seat belts, and have air conditioning. They are also required to be clean and well-maintained inside and out." Four enumerable requirements — checkable by the rider at the kerb, which makes it actionable rather than decorative.

Q3's answer hedges in a way worth flagging: "based on a number of factors, including but not limited to the number of stars they receive from riders, the number of complaints filed against them, and their overall driving record." `including but not limited to` is legal-register language leaking into a consumer FAQ, and it undercuts the transparency the question invites.

## T13 Terminology & glossary

| Term | Bolt's usage | The alternative it rejected |
|---|---|---|
| `Bolt` | Used as a **count noun for a vehicle**: "Can I request a Bolt online?", "you'll always get in the right Bolt car" | "a car", "a ride" |
| `rider` | The passenger, throughout, on every surface | "passenger" (used only once, in the service-animal legal sentence: "All passengers have the legal right…") |
| `driver` / `driver partners` / `partners` | Three registers: `driver` in support, `driver partners` in scale claims, `partners` as the umbrella for drivers+couriers+merchants+fleets | "contractor" |
| `courier` | Delivery person on Bolt Food | "rider" — which would collide with the passenger term |
| `merchant` / `Restaurants` | `Bolt Food Merchants` in the footer, `Restaurants` as the support category | |
| `ride-type` | Hyphenated, the vehicle/service tier: "Ride prices vary based on the journey distance and ride-type you select" | "category" — although `Bolt categories in my city` uses exactly that |
| `Bolt categories` | Support-article term for the same concept as `ride-type` | **Two coined terms for one concept, on two surfaces** |
| `Bolt Balance` | The in-app wallet | "wallet", "credit" |
| `Emergency Assist` | The panic button. Rendered `Emergency assist` on `/rides/` and `Emergency Assist` on `/rides/safety/` and in the article `Using Emergency Assist` | "SOS", "panic button" |
| `Ride Check` | Anomaly detection during a trip — "detect any unexpected and excessively long stops" | "trip monitoring" |
| `Women for Women` | Female-driver-only ride type. Rendered `Women for women` on `/rides/` and `Women for Women` on `/rides/safety/` | "Ladies only" |
| `Trusted Contacts` | Named emergency-contact feature | "emergency contacts" |
| `pickup codes` | Verification code at pickup | "PIN" |
| `Share location` / `Share Location` / `Share Ride Details` | **Three names for what appears to be one feature**, all on two adjacent pages | |
| `Beginner mode` | Speed-limited first scooter rides | "training mode" |
| `Riding Score` | Scooter behaviour score, named in a support article (`What is Riding Score?`) | |
| `Scooter reaction test` / `Cognitive reaction test` | The sobriety check. Support article says `What is the Scooter reaction test?`; the safety page says `Cognitive reaction test` | **Two names again** |
| `Tandem riding detection` | Detects two people on one scooter | "double riding" |
| `Bolt Safety Team` | Explicitly introduced: "We call them the Bolt Safety Team" | |
| `Bolt Send` | Parcel service, brand + verb | |
| `Bolt Drive` | Car-sharing, brand + verb | |
| `Bolt Market` | Groceries, brand + noun | |
| `Auto Accept` | Driver-side automatic job acceptance | |
| `Assistance` | The accessible-ride category name (wheelchair-accommodating) | "Accessible", "WAV" |

**The naming-system finding.** Bolt's product names are `Bolt` + a single word, and that word alternates between **verb** (`Drive`, `Send`) and **noun** (`Food`, `Market`, `Balance`, `Plus`). There is no rule governing which. Where the service is the company's core (ride-hailing) it gets no brand compound at all, just `Rides`. Where a service is a category with an existing consumer word, Bolt sometimes uses the plain word instead (`Scooters`, `E-Bikes`).

**Where the system breaks down:** feature names, not service names. `Emergency assist`/`Emergency Assist`, `Women for women`/`Women for Women`, `Share location`/`Share Location`/`Share Ride Details`, `Scooter reaction test`/`Cognitive reaction test`, `ride-type`/`Bolt categories` — five collisions, four of them on two pages that link to each other. The service tier is governed; the feature tier is not.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for the user throughout; first-person plural for the company, used heavily and confidently — "We're making cities for people", "We call them the Bolt Safety Team", "We limit your scooter's speed", "we've got you". The company is a visible, acting agent even in constraint copy ("We limit").

**Register.** Short declaratives, contractions throughout ("you'll always get in the right Bolt car", "we've got you", "rest easy"). British spelling consistently (`favourite`, `prioritising`, `personalised`, `travelling`, `Centre` in `Driver Centre`-equivalents). No exclamation marks observed on any harvested page. No `Oops!`.

**Colloquialism is rationed the same way Wise rations it** — "rest easy — when it comes to safety, we've got you", "Now sit tight" (not Bolt — see Gojek), "slow and steady", "at your fingertips" cluster in safety and marketing; the disclaimers, fee language and community guidelines are flat. The guidelines page in particular is almost entirely colloquialism-free.

**Numbers as trust devices** `[observed]`: `850+ cities` · `50+ countries` · `4.5 million partners` · `200+ million riders` · `over 500 real people` · `100+ airports` · `15 km/h` · `15–36 kg` · `90 days` · `first 5 rides` · `carbon net zero by 2040`. Note `200+ million riders` (homepage, driver-facing) versus `850+ cities` (homepage, rider-facing) — the big number shown depends on which side of the marketplace is being addressed.

**Accessibility content** `[observed]` — Bolt publishes one of the more substantial accessibility pages in this domain:

- Opening sentence leads with dignity, not compliance: "Everyone — whether a rider, driver, courier, or anyone engaging with Bolt online or offline — should be able to use our services independently and with dignity."
- Standards named (`WCAG 2.1 Level AA`, `EN 301 549`) with an honest "working toward full compliance"
- A feedback channel is offered as a named section, `Driven by feedback`, with an email address
- Accessibility is organised **by service** (`Ride-hailing`, `Food and grocery delivery`, `Micromobility`) rather than by impairment — and the micromobility section is about accessibility *for non-users* (pedestrians tripping over parked scooters), which is a genuinely unusual scope choice
- Driver accessibility is included alongside rider accessibility (`Speech to text` for drivers who prefer not to type)

**Accessibility gaps observed in the markup:**
- Most CMS images on the marketing pages carry **empty or missing alt text** while being the sole carrier of the visual content of a feature card. The feature name and description are adjacent text, so this is defensible, but it is uniform rather than considered.
- One descriptive alt observed: `Bolt app open on a smart phone.` — a single scene-level alt on the homepage, against dozens of empty ones.
- The support portal renders `![Bolt logo](<>)` — a **logo image with an empty src and a non-empty alt**, i.e. a broken image announced to screen readers as "Bolt logo". A real defect.
- The accessibility page duplicates every feature card block in the DOM (carousel variants), so a screen-reader user may hear `Assistance`, `Child seats`, `Pets`, `Service animals`, `Speech to text`, `For visually impaired` twice in succession. Same for the micromobility and delivery blocks. Flagged as observed in the served markup; CSS handling not verified.
- No `Skip to content` link observed in the served DOM on any page.

**Negative findings, recorded honestly**
- Four labels for "download the app" (T3)
- Three prepositional frames for `Register` inside one grid (T3)
- Five feature-name collisions across two adjacent pages (T13)
- Sentence case vs title case for identical help-section names across two categories (T11)
- `Bolt Food Merchants` (footer) vs `Restaurants` (support) for one audience
- `etc` shipped in a live support category description
- `including but not limited to` in a consumer FAQ answer
- Duplicated feature blocks in the accessibility page DOM
- Broken logo image with populated alt in the support portal

---

## Transferable patterns

1. **Separate the binding document from the explanatory one, in one sentence.** "While our Platform Terms are the legal basis for using the Bolt platform, these guidelines help explain what respectful, safe behaviour looks like in everyday situations." Reusable verbatim wherever a product ships both T&Cs and a softer code of conduct. Condition: only works if the softer document genuinely has no legal force — otherwise it misleads.
2. **Name the emotional state in the recovery title, name the tool neutrally.** `I felt unsafe using Bolt` (after the fact, first person, feeling) sits beside `Using Emergency Assist` (in the moment, gerund, calm). Panic-adjacent copy should get *calmer* as the moment gets more acute, and can get *warmer* afterwards. Transfers directly to fraud, dispute and account-compromise flows.
3. **One grammatical mould per problem family.** `I had a problem with the courier / the food quality / the restaurant staff / a food safety issue` — four titles, one shape, one slot. The user routes by *who or what failed* without reading. Cheap to build, and the absence of it on Bolt's own rides side shows the cost of not doing it.
4. **State a user-facing right as a right, not a permission.** "All passengers have the legal right to be accompanied by their assistance animal" outperforms "we allow assistance animals" — it removes the implication that the platform is granting a favour. Transfers to any accessibility or protected-characteristic policy copy.
5. **Make the availability disclaimer a standing element, and escalate it where the stakes rise.** Bolt repeats the feature-variance line on every feature-listing page and adds `insurance coverage` to it on the pages that make safety promises. A disclosure that grows one clause at the point of higher consequence is more credible than a uniform one.
6. **Ship a spec, not a reassurance, when the user can verify it.** "All vehicles must be 4-door, have working seat belts, and have air conditioning" is checkable at the kerb. Reassurance the user can confirm with their own eyes is worth more than a safety adjective.
7. **Govern the feature-name tier, not just the product-name tier.** Bolt's nine product names are clean; its feature names collide five times across two linked pages. The failure mode is predictable: product names get brand review, feature names get shipped by the team that built them. A feature-name registry is the cheap fix.

## Caveats & gaps

- **Help-article bodies not opened.** All T6/T7 content is `[documented]` from titles only. Titles are high-signal for IA and task phrasing and say nothing about answer structure or tone inside the article.
- **No form surface reached.** T5 is `[absent]`. Registration, ride-request and support-contact forms all sit behind an app or a gate.
- **T8 empty states entirely absent** — requires an authenticated or in-app pass.
- **Single locale.** Only the `/en/` path was harvested. Bolt operates in 50+ countries across Europe and Africa; per-market copy, currency framing, and any African-market-specific payment vocabulary (mobile money, cash handling) are unharvested and may differ substantially.
- **Four of seven support categories unharvested**: `Couriers`, `Fleets`, `Restaurants`, `Bolt for Business`. The merchant and fleet content is likely where the most distinctive B2B vocabulary sits.
- **Most sections truncated at four titles** by the `See all articles` pattern; only two sections (`Using Bolt`, `App and features`) were expanded in full.
- **Scooter/e-bike product pages, Bolt Plus, Bolt Drive and Bolt Send product pages unharvested** — the subscription (`Bolt Plus`) page in particular would carry the pricing and cancellation disclosure language absent from this file.
- The DOM-duplication and alt-text observations are from the served markup only; CSS/ARIA handling was not verified, so the screen-reader impact is **suspected, not confirmed**.

## Sources

1. https://bolt.eu/en/
2. https://bolt.eu/en/rides/
3. https://bolt.eu/en/rides/safety/
4. https://bolt.eu/en/community-guidelines/
5. https://bolt.eu/en/company/accessibility/
6. https://bolt.eu/en/support/categories/115000431394/
7. https://bolt.eu/en/support/categories/115000300833/
8. https://bolt.eu/en/support/categories/360001224900/
9. https://bolt.eu/en/support/sections/115000942333/
10. https://bolt.eu/en/support/sections/360004805720/
