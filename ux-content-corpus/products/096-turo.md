# 096. Turo

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Peer-to-peer car sharing (two-sided vehicle rental marketplace) |
| Primary URL | https://turo.com/ |
| Corpus rank | 096 |
| Benchmark strength (source list) | Marketplace trust and pickup guidance |
| Locale / market observed | en-US (`/us/en/` path; site also serves AU, CA-EN, CA-FR, FR, GB) |
| Platform observed | Web (desktop), marketing site, Zendesk-backed support site |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | Not an insurer — third-party liability insurance issued to Turo by **Travelers Excess and Surplus Lines Company**; Turo Insurance Agency named for Maryland and listed licensed states; state-specific carve-outs named in copy (Maryland, New York, Washington); physical damage handled as contractual risk allocation, not insurance |
| Harvest date | 2026-09-21 |
| Pages inspected | 7 |
| Harvest completeness | Partial — marketing and trust surfaces fully captured; the support site (`help.turo.com`, `support.turo.com`) is client-rendered and returned only a category skeleton plus article `<title>`/`<meta>` values. Article bodies not retrieved. Listing pages, booking flow, and all in-product trip states are behind auth. |

## Pages inspected

| Label | URL | Notes |
|---|---|---|
| Homepage / search entry | https://turo.com/ | Hero, search form, nav, footer, SEO link farm |
| Why choose Turo (how it works) | https://turo.com/us/en/car-rental/united-states/how-turo-works | 3-step booking, pickup/drop-off modes, competitor contrast table, 8-question FAQ, footnote stack |
| Insurance & protection (host-facing) | https://turo.com/us/en/car-rental/united-states/insurance | Three host earnings plans, damage-responsibility figures, 5-footnote disclosure block |
| Trust & Safety | https://turo.com/us/en/car-rental/united-states/trust-and-safety | Host/guest split, four "Tips and tricks" behaviours |
| Support home | https://help.turo.com/ | **Returned title only** — client-rendered |
| Support category index | https://support.turo.com/hc/en-us | Rendered as flat text: two-audience category tree with article counts |
| Help article metadata | https://help.turo.com/en_us/trip-photos-guide-or-guests-HytcE4g49 · .../reporting-damage-or-guests-SJtWr4gE9 | Body not rendered; `meta-description` and `meta-keywords` captured only |

---

## T1 Navigation & IA labels

**Global nav is deliberately thin** `[observed]` — the top bar carries the search form, not a feature menu:

`Where` · `From` · `Until` · `Search` · `Earn on Turo` · `Menu`

The hamburger expands to: `Log in` · `Sign up` · `Earn on Turo` — then a divider — then
`Why choose Turo` · `Gift cards` · `Contact support` · `Legal` · `Insurance & protection` · `Host Hub` · `Carculator`

Note the ordering decision: account actions, rule line, *then* informational links. `Contact support` and `Legal` sit in the same list tier as `Gift cards`, which flattens the support path rather than burying it.

**Footer is grouped by role, not by topic** `[observed]`

| Group | Members |
|---|---|
| `Turo` | `About` · `Team` · `Policies` · `Careers` · `Press` · `OpenRoad` |
| `Locations` | `USA (EN)` · `Australia (EN)` · `Canada (EN)` · `Canada (FR)` · `France (FR)` · `UK (EN)` |
| `Explore` | `Why choose Turo` · `Weddings` · `Pitch a trip` · `Trust & safety` · `Get help` |
| `Hosting` | `List your car` · `Carculator` · `All-Star Hosts` · `Host Hub` · `Insurance & protection` |

The `Explore` / `Hosting` split is the load-bearing IA decision: the same site serves demand and supply, and the footer is where the two audiences are formally separated. `Insurance & protection` appears **only under `Hosting`**, which matches the fact that the linked page is written entirely for hosts.

**Search-result taxonomy tabs** `[observed]` — the homepage search surfaces six filter tabs:
`All` · `Airports` · `Monthly` · `Nearby` · `Delivered` · `Cities`

`Delivered` as a peer of `Airports` is notable — delivery is treated as a *location type*, not a service add-on.

**Support IA is split by role before it is split by task** `[observed]` (support.turo.com):

| `Traveler help` | `Owner help` |
|---|---|
| `Joining Turo` | `Listing your car` (9 articles) |
| `How it works` (12 articles) | `Rentals` (11 articles) |
| `Renting cars` (11 articles) | `Your car` |
| `Insurance & damage` | `Insurance` (10 articles) |
| `Payment & pricing` (10 articles) | `Pricing & payment` (7 articles) |
| `Emergency roadside and collision assistance` | `Emergency roadside and collision assistance` |
| | `The basics` (8 articles) |

Then a third, un-headed block: `Contest and sweepstakes rules` · `Text message help` · `Insurance & damage` (9) · `Reservations` (10) · `Tickets, tolls & towing` · `Fines & fees` · `Terms of service & privacy policy` · `Car use`, plus an `Airport parking` section with `Owner FAQs` (26), `Traveler FAQs` (12), `Airport policies` (10).

**Two observations worth recording.** First, `Insurance & damage` appears *twice* under different parents with different article counts — a genuine duplication in the tree. Second, the marketing site says **guest** and **host** throughout, but the support site says **Traveler** and **Owner**. The same two roles carry four names across two surfaces owned by the same company. This is the single clearest negative finding in the file.

## T2 Value proposition & headline patterns

**Hero — two words, no verb** `[observed]`

> Headline: `Rental reinvented`
> Subhead: "Rent the exact car you want, exactly where you need it, for days, weeks, or months"

The subhead is a three-clause parallel construction on **what / where / how long**, and each clause answers an objection to traditional rental (car assignment, counter location, rental period). `the exact car you want` is doing the heaviest lifting — it is the direct negation of the rental-counter "or similar" promise, which the page later names explicitly.

**Section header on how-it-works is a question** `[observed]`: `Why choose Turo?` — and the same string is reused as a nav label, so the question doubles as navigation.

**Three-benefit block — imperative verb + object** `[observed]`

- `Enjoy a streamlined airport experience`
- `Get personalized service from a local host`
- `Relax with support & damage protection`

The verbs (`Enjoy`, `Get`, `Relax`) are emotional-state verbs rather than action verbs, which is unusual for a marketplace: the user is not being told to do anything, they are being told how they will feel. Each carries one sentence of mechanism underneath, and the third carries a `View details` link rather than a bare claim.

**Comparison table headed `Turo vs. car rental`** `[observed]` — seven paired rows, Turo column first:

| Turo | Car rental |
|---|---|
| `App-based experience` | `Standard rental counter experience` |
| `No waiting in line` | `Waiting in line` |
| `1,600+ unique makes & models` | `Limited car selection` |
| `Get the exact car you choose` | `Get one type of car "or similar"` |
| `Delivery options & thousands of pickup locations` | `Pickup only at retail locations` |
| `Cars rented out by local small businesses` | `Cars owned by large corporations` |
| `Vehicles and hosts rated by guests` | `No vehicle ratings` |

The construction is strict: every Turo cell is a positive noun phrase, every competitor cell is the same concept negated or diminished, and the pairs are never rhetorically uneven. Row 4 quotes the industry's own phrase back at it (`"or similar"` in scare quotes) — the only quotation mark on the page.

**Trust page hero uses adverb-pairing** `[observed]`: `Share safely, travel confidently` — one clause per side of the marketplace, verb + adverb, no object. Followed by `Your safety is a top priority` (note: *a* top priority, not *the*).

**Host-side hero inverts to confidence framing** `[observed]`: `Rent out your car with confidence`, then `Spring for extra peace of mind, or go light for a bigger piece of the pie.` — colloquial register (`spring for`, `go light`, `piece of the pie`) used precisely where the user is being asked to trade coverage against earnings.

## T3 CTA inventory

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Search` | Homepage search form submit | Matches the field-set label, not a marketing verb |
| `Log in` | Nav menu | |
| `Sign up` | Nav menu | |
| `Earn on Turo` | Nav (twice — duplicated in DOM) and top banner | The supply-side CTA outranks `Log in` in the nav bar |
| `Find the perfect car` | How-it-works hero and mid-page | Repeats the step-1 heading verbatim |
| `Browse cars` | End of how-it-works steps | Lower-commitment verb than `Find` |
| `View details` | Under `Relax with support & damage protection` | Anchors to `#youre-protected` — in-page, not a new destination |
| `More about pickup & drop-off` | Inside step 2 | Fully specific, in-page anchor |
| `List your car` | Insurance page, twice | The supply-side conversion |
| `Dive deeper into host earnings plans` | Under the three plan cards | Colloquial `Dive deeper` in place of `Learn more` |
| `Learn more` | Trust page, under host block | The one bare `Learn more` — goes to the insurance page |
| `Learn more about eligibility standards` | Trust page, guest block | Fully specific variant |
| `Read more about protection plans` | Trust page, guest block | |
| `Click here` | Insurance page: "Looking for more info on protection for Turo guests? Click here" | **Accessibility defect** — non-descriptive link text on a page whose whole job is disclosure |
| `Contact support` | Nav menu | Routes via `turo.com/login/kustomer?referralUrl=...` — i.e. **support is gated behind login by default** |
| `Get help` | Footer, `Explore` group | Same destination, different label |
| `Report damage` | support.turo.com header | Adjacent to `Contact us` and the phone number |
| `Show more` | Footer SEO link lists | Progressive disclosure, repeated 6× |
| `Add car to favorites` | Vehicle cards on homepage | Icon-button label, likely `aria-label` |

**Pattern worth stealing:** the two highest-stakes CTAs on the site (`View details` under the protection claim, `More about pickup & drop-off` inside step 2) are **in-page anchors, not navigations**. Turo answers the objection without taking the user out of the funnel. The bare `Learn more` and the `Click here` are both on trust/insurance surfaces, which is exactly where they should not be.

## T4 Onboarding & getting-started

**Three numbered steps, each an imperative headline with a number prefix** `[observed]`

1. `1. Find the perfect car` — "Just enter where and when you need a car, filter to find the best one for you, and read reviews from previous renters."
2. `2. Select a pickup location` — "Grab a car nearby or get one delivered to various destinations, including many airports, train stations, hotels, or maybe even your home."
3. `3. Rent & hit the road` — "Your host sends you pickup details, and you're all set! If you have questions, you can easily chat with your host or contact Support."

Step 3 is the interesting one. It does **not** describe a system action — it describes *another human doing something for you* ("Your host sends you pickup details"). The step that in a conventional rental funnel would be "collect your keys" is instead a message-arrives moment, and the step immediately offers two escape hatches (`chat with your host`, `contact Support`) at the exact point where a stranger-to-stranger handoff creates anxiety. This is the highest-value onboarding pattern in the file.

**A second, separate sequence covers the handoff itself** `[observed]`, headed `How pickup & drop-off work`, introduced with a second-person future-tense promise: "Every time you rent a car on Turo, you'll:"

- `Receive pickup and drop-off instructions from your host once you book`
- `Check in, check out, and chat with your host through the Turo app`
- `Upload your driver's license or show it to your host in person`

`Check in, check out` is the coined pair for the photo-documentation ritual (see T13). Note it is introduced here as a *convenience* ("through the Turo app") and only becomes a *protection requirement* in the insurance copy — the same mechanic is framed twice, softly for guests and hard for hosts.

**Three named handoff modes, each one sentence** `[observed]` — under the sub-head "Some hosts meet guests in person, while others opt for remote handoffs."

| Mode | Copy |
|---|---|
| `In person` | "Your host meets you at your chosen pickup location and hands you the keys." |
| `With a lockbox` | "Your host sends you a lockbox code, then you unlock the box to get the key." |
| `With an app` | "Your host unlocks the car remotely with their car manufacturer's app." |

All three sentences name **the host as the grammatical subject of the first clause**. Turo never claims to be the one handing over the car. That is a liability-shaped grammar choice and it is applied consistently.

## T5 Form & field labels

**The only unauthenticated form is the search bar** `[observed]`

| Label | Placeholder / value |
|---|---|
| `Where` | `Airport, hotel, address, city` |
| `From` | (date) |
| `Until` | (date) |
| — | `Search` (submit) |

`Until` rather than `To` is the notable choice: `To` would collide with the destination sense of `Where`, and `Until` reads as duration rather than direction. The placeholder enumerates four location *types* in ascending order of specificity reversed (`Airport, hotel, address, city`) — airport first because that is the dominant intent.

**Price display grammar on vehicle cards** `[observed]`: `$67/day` then `$202 total`, with monthly inventory switching to `$760/month` and **no total shown**. Ratings render as `5.0(11)` or `4.99(128)`, and inventory with no history renders `New listing` in the rating slot rather than a zero or an empty state.

All other forms (approval to drive, licence upload, damage report) are behind auth. `[absent]`

## T6 Status & state language

Trip states are not observable pre-auth. What the public surfaces name `[documented]`:

**The trip lifecycle vocabulary** — `trip` is the atomic unit, never "rental" or "booking", except in SEO page titles where `car rental` is retained for search. Named states and moments:

- `trip starts` / `before your trip starts` — the free-cancellation boundary
- `while a trip is in progress` — used for the add-a-driver mid-trip case
- `within 24 hours of the end of the trip` — the damage-report window
- `pre- and post-trip photos` — the two documentation checkpoints
- `check in` / `check out` — the in-app actions that bracket the trip
- `New listing` — the pre-review state on a vehicle card `[observed]`
- `All-Star Host` — a named host status tier, surfaced in the footer `[observed]`

**Marketplace-trust states** `[observed]` on the Trust & Safety page, each a two-word second-person declarative used as a heading:

`You're covered` · `You're safe` · `You're not alone` (host side)
`Choose your coverage` · `You're protected` · `You're not alone` (guest side)

This is a status vocabulary expressed as *reassurance state* rather than system state. `You're not alone` appears on both sides with different bodies — for hosts it means a 24-hour emergency line, for guests it means roadside assistance. Same heading, different mechanism, which is a deliberate symmetry: both parties are told the platform is present, and the asymmetry of what that means is pushed into the body copy.

**Turo's status language has a structural gap.** There is no public vocabulary for the states a *guest* most fears — the trip that is booked but unconfirmed, the host who has not responded, the car that is not where it should be. `In the rare event a host cancels` (FAQ) is the only public acknowledgement that the supply side can fail, and it is a subordinate clause, not a named state.

## T7 Error, failure & recovery

**The failure taxonomy is visible in the support tree, not in on-page copy** `[observed]`. Categories that exist solely to absorb things going wrong:

- `Emergency roadside and collision assistance` — listed **twice**, once under `Traveler help` and once under `Owner help`, at the same level as `How it works`. Promoting the crash path to a top-level category on both sides of the marketplace is the strongest IA signal in this product.
- `Insurance & damage` (Traveler, and again in the shared block with 9 articles)
- `Tickets, tolls & towing` — the post-trip liability cluster
- `Fines & fees` — separated from `Tickets, tolls & towing`, so administrative penalties and platform penalties are distinct categories
- `Report damage` — a CTA sitting in the support header beside `Contact us`

**The damage-recovery sequence is written as a numbered obligation with a clock** `[observed]`, on the insurance page under the question-heading `What happens if my vehicle gets damaged?`:

The copy leads with a disclaimer before it leads with help — "Physical damage reimbursement is not insurance, but a contractual allocation of risk between you and Turo" — then gives the action ("simply notify Turo, providing pre- and post-trip photos within 24 hours of the end of the trip"), then the standing instruction ("It's important to take photos before and after each trip"), then the response promise ("A Turo associate will reach out within 1–3 days and guide you through the rest of the process"), then the money ("Hosts will be responsible for the per trip damage responsibility amount, then Turo will reimburse the rest").

Five moves in one short block: **legal characterisation → user action → user habit → our response time → who pays what.** The `1–3 days` is a specific, bounded, unflattering number that most platforms would round or omit.

**Emergency copy is routing-only** `[observed]` — FAQ `What happens if I have an emergency or issue with the car?` answers by naming a third party ("call our emergency roadside assistance provider, available 24/7") and closes with "They'll help you get back on your way." Turo does not position itself as the responder.

**Host cancellation is the one named adverse event with a recovery choice** `[observed]`, inside the cancellation FAQ: "In the rare event a host cancels, you'll be notified immediately so you can book another car, or we'll help you find one. Your refund can be temporarily held to expedite rebooking, or the funds can be returned to your bank account — your choice."

The two-em-dash close (`— your choice`) is the only place on the page where the user is handed an explicit fork in an adverse state. Worth stealing: **when a refund and a rebooking compete for the same money, name the trade-off and let the user pick**, rather than defaulting silently.

**Support-article titles suggest a first-person confession pattern exists** `[documented]` — the retrievable metadata for `Reporting damage | Guests` opens "If your host's vehicle was damaged on your trip, file a damage report and we'll notify your host to respond." Second person, possessive (`your host's vehicle`), and the recovery action is *notification of the counterparty*, not escalation to the platform. Article bodies were not retrievable, so the full failure vocabulary is not captured.

## T8 Empty states

`[absent]` — no empty states reachable. Search results, trip lists, message threads, and the host dashboard are all post-auth. The nearest observable analogue is `New listing` substituting for a star rating on a vehicle with no reviews `[observed]` — a value substitution rather than a true empty state, and a good one: it explains *why* the rating is missing instead of showing `0.0` or blank.

## T9 Notifications & system messages

`[documented]` only, and thinly. The public surfaces reference three notification channels without showing their copy:

- "you'll be notified immediately" (host cancellation, FAQ)
- "make sure you've checked the box to receive email notifications, and enable push notifications from the Turo app in your phone settings — we'll send you occasional promo codes, discounts, and deals" (discounts FAQ) — notable for instructing the user to change an **OS-level** setting, and for being honest that the payload is marketing
- `Text message help` — a support category, implying SMS is a first-class channel

Promotional banner `[observed]`, site-wide top strip: `Earn up to $1,000 per month sharing your car on Turo` — a supply-side acquisition message running above a demand-side homepage, bounded by `up to`.

## T10 Disclosures, legal & compliance

The strongest category in this file, and structurally distinctive.

**Footnotes are numbered and stacked at the page foot, with asterisk density rising with stakes** `[observed]`. The how-it-works page runs `*`, `**`, and three unmarked notes; the insurance page runs `*` through `*****` — five levels of asterisk on a single page. Each plan bullet carries its own marker, so a single line like `Earn 70% of the trip price*****` is unreadable without a round trip to the foot of the page. This is a legible **anti-pattern**: the disclosure is complete and honest, and the interaction cost of consuming it is very high.

**The "we are not an insurer" construction, stated three ways** `[observed]`:

- "Physical damage reimbursement is not insurance, but a contractual allocation of risk between you and Turo."
- "Turo is not an insurance company, and contractual reimbursement for physical damage to your vehicle is not insurance."
- "The policy does not provide coverage for damage to a host's vehicle."

Three negations of the same proposition, in body copy, in a footnote, and in a nested footnote. The repetition is defensive but the plain-language rendering of *contractual allocation of risk* is genuinely good: it names the legal mechanism and then immediately explains its consequence.

**Named counterparty, every time** `[observed]`: `Travelers Excess and Surplus Lines Company` is spelled in full on every surface where liability is claimed; the logo appears beside it. Turo never says "our insurer". Compare the stale asset on the insurance page — the alt text still reads `Liberty Mutual Insurance` and a pull-quote still says "Liberty Mutual, the fifth-largest insurance company in the U.S., is Turo's exclusive provider," beside a Travelers logo. **This is a content-decay defect on the single most consequential page on the site**, and it is recorded here as observed, not inferred.

A second decay artefact sits alongside it: the image alt text reads `"Turo will pay the full repair cost up to the cash value of the car, or a limit of $125,000."` while the visible quote beneath reads `$200,000`. The alt attribute is carrying a superseded figure.

**Jurisdictional carve-outs are named inline, not generalised** `[observed]`:

- Maryland and New York named as states where primary liability coverage may be statutorily required
- "State minimum liability coverage is provided for vehicles in the state of New York. New York hosts can opt into the More Peace of Mind earnings plan for higher liability coverage of $300,000 combined limit."
- "When a trip is booked in the state of Washington, physical damage to the host's vehicle is covered by insurance purchased by Turo, but the Turo insurance does not change the contractual responsibilities of hosts or guests"
- "any personal insurance you may have … would kick in before your protection plan, except in limited situations for trips booked in Maryland"
- A phone number and email for the regulated entity: "consumers in Maryland and the licensed states listed here may contact Turo Insurance Agency at (415) 508-0283 or claims@turo.agency"

**Host earnings plans — the pricing ladder is an inverse trade** `[observed]`. Three plans, named as sentences about the user's priority rather than as tiers:

| Plan name | Host share | Damage responsibility | Liability limit |
|---|---|---|---|
| `More peace of mind plan` | `Earn 70% of the trip price` | `$250 damage responsibility` | `Up to $750,000 in third-party liability insurance` |
| `Balanced plan` | `Earn 80% of the trip price` | `$1,500 damage responsibility` | `Up to $750,000 …` |
| `More earnings plan` | `Earn 90% of the trip price` | `$2,750 damage responsibility` | `Up to $750,000 …` |

`More peace of mind` / `Balanced` / `More earnings` names the **axis the host is trading on**, not the tier's rank. Nothing is called Basic, Plus, or Premium. The liability figure is deliberately held constant across all three so the only variable is the host's own exposure — a clean pricing-comms decision.

The plans carry two further differentiators that are pure content artefacts: submission windows (`Two extra days` / `One extra day` / none, "to submit additional distance and refueling reimbursements") and communication cadence (`Quarterly` / `Semi-annual` / `Annual` "updates, expert tips, and strategies to increase your earnings"). Support responsiveness and newsletter frequency are sold as plan features.

**The dynamic-share footnote is the most important disclosure on the page** `[observed]`: host share is not fixed. "in Austin, Dallas, Detroit, Las Vegas, Maui, Philadelphia, Phoenix, San Diego, and Seattle, the host share is dynamically adjusted based on how far in advance a guest books. In these specific markets, earnings ranges are 65–80% (More peace of mind plan), 75–90% (Balanced plan), and 85–100% (More earnings plan)." Nine named cities, three named ranges, and a stated rationale ("to account for increased trip risk"). The headline number (`70% / 80% / 90%`) is therefore **not true in nine markets**, and the correction is available only at footnote depth five.

**Guest-side protection naming differs from host-side naming** `[observed]`: guests choose between `Premier`, `Standard`, or `Minimum` — conventional tier names with an eligibility gate ("Spring for Premier for peace of mind (eligibility requirements apply), or pay less for lighter protection with higher out-of-pocket costs for vehicle damage or theft"). Hosts get the trade-off-named plans. The same company uses two entirely different pricing-naming philosophies on the two sides of one marketplace.

**Coverage-order disclosure** `[observed]`, guest FAQ: "In the US, any personal insurance you may have that covers damage to the host's vehicle would kick in before your Turo protection plan." The order-of-recourse is stated plainly and then immediately reframed in the footnote as being in the guest's interest ("but this protects your own wallet") — a claim that would benefit from more support than it gets.

**Excluded-from-coverage list, stated as a negative** `[observed]`: "Host earnings plans don't cover reimbursement for wear and tear, reimbursement for loss of hosting income, or a replacement vehicle if a vehicle is being repaired." Three named exclusions, and `loss of hosting income` is the one that matters most to the reader — put second, not first.

## T11 Help-centre architecture

Two-level, audience-first: **role → task cluster → articles**. Structure captured under T1; the architectural observations:

1. **`Emergency roadside and collision assistance` is duplicated as a top-level node on both sides.** Neither node has an article count, which suggests it is a single article promoted to category rank — the platform has decided the crash path must be one click from the index for either party.
2. **`Airport parking` is its own third section**, with `Owner FAQs` (26 articles), `Traveler FAQs` (12) and `Airport policies` (10). Forty-eight articles about airport logistics is a bigger corpus than the whole of `Insurance` (10). This is where marketplace complexity actually lives, and the IA admits it.
3. **`Contact us` is listed as a category node**, not as routing furniture — it sits in the flat third block alongside `Fines & fees`, so contact is reachable at the same depth as any topic.
4. **Support is login-gated by default.** The nav `Contact support` link resolves through `turo.com/login/kustomer?referralUrl=https://help.turo.com`. A user with a problem and no session hits an auth wall before they hit an article. The footer `Get help` link avoids this, so the two labels for one destination also differ in whether they require a login — an accidental but consequential divergence.
5. **Support phone number is in the page furniture** `[observed]`: `Support - 866-735-2901`, with the scope line "General inquiries, billing, roadside and collision assistance." One number, four named use cases, no IVR tree described.

**Article-title grammar** `[observed]` from the retrievable titles — a pipe-delimited audience suffix rather than a prefix:

| Shape | Example |
|---|---|
| `<Topic> \| <Audience>` | `Trip photos guide \| Guests`, `Reporting damage \| Hosts` |
| `<Gerund> <object> \| <Audience> ` | `Reporting and resolving damage \| US hosts` |
| `<Gerund> a <thing> through Turo \| <region> <audience>` | `Managing a damage claim through Turo \| US guests` |

Region is folded into the audience token (`US hosts`, `Canada hosts`). This is a strong convention: one article title carries topic, role, and jurisdiction, so a search-result list is self-disambiguating without any surrounding context.

## T12 FAQs

Placement: accordion at the foot of the how-it-works page, headed `Frequently asked questions`. **Answers are present in the server HTML here** (unlike most accordion implementations), so both questions and answer substance were retrievable.

| # | Question (verbatim) | Answer substance (summarised) |
|---|---|---|
| 1 | Where is Turo available? | Four named countries plus an enumerated list of nine Canadian provinces and Yukon; then a rights statement — hosts cannot restrict interstate/interprovincial driving; cross-border travel has separate rules, with a link |
| 2 | What do I need to book a car on Turo? | Account, licence, driver approval, and a **per-country minimum age** (18 US, 21 AU, 23 CA, 21 UK with licence-tenure rules, 18 FR with two-year tenure); then the approval process is described as fast and one-time |
| 3 | Do I need my own insurance? | Opens with a bare `No.`; then order-of-recourse, the three guest plan names, and the named liability carrier |
| 4 | Can other people drive a car that I booked? | Yes, conditional on approval; names `primary driver`; states hosts *cannot* add drivers; recommends adding before the trip but permits mid-trip in US/CA; routes to the `"Trips"` tab |
| 5 | What is the cancellation policy on Turo? | 24-hour free window, a one-hour window for late bookings, a fee after that; then the host-cancellation path and the refund-vs-rebooking choice |
| 6 | What happens if I have an emergency or issue with the car? | Two sentences; routes to the roadside provider |
| 7 | Can I get my car delivered to me? | Yes; named venue types; hosts set their own delivery fee, some free |
| 8 | How do I get discounts when booking a car? | Weekly/monthly host discounts, notification opt-in, and a named loyalty mechanic |

**Structural notes.** Eight questions, ordered: eligibility of place → eligibility of person → risk → who else can drive → how to get out → what if it goes wrong → convenience → price. **Three of the first five are eligibility or risk questions.** For a marketplace where strangers exchange car keys, the FAQ is not a feature list — it is a qualification and reassurance sequence, and the money question is last.

Q1, Q2 and Q4 all answer **a question about limits the user did not ask**: Q1 volunteers that hosts cannot restrict where you drive, Q2 volunteers that approval is one-time, Q4 volunteers that additional drivers are free and that hosts cannot add them for you. Each of these pre-empts a specific way a host could disadvantage a guest. Reading the FAQ as a list of *platform guarantees against the counterparty* is the most useful way to read it.

Q3's answer begins with the single word "No" before any qualification — the only one-word opening in the set, on the question most likely to stop a booking.

## T13 Terminology & glossary

| Term | Turo's usage | The alternative it rejected |
|---|---|---|
| `host` | Supply side, on all marketing surfaces | "owner" (which the *support site* uses — see below), "lister", "partner" |
| `guest` | Demand side, on all marketing surfaces | "renter", "customer", "driver" |
| `Owner` / `Traveler` | The same two roles, on `support.turo.com` | — **an unresolved duplication**, not a deliberate register split |
| `trip` | The unit of transaction | "rental", "booking", "reservation" (though `Reservations` survives as a support category) |
| `check in` / `check out` | The photo-and-handoff ritual bracketing a trip | "pick-up inspection", "condition report" |
| `Trip photos` | The documentation artefact, capitalised as a feature | "damage evidence", "condition photos" |
| `protection plan` | Guest-side coverage product | "insurance" — actively and repeatedly disclaimed |
| `host earnings plan` | Host-side coverage product | "insurance tier", "commission plan" — note the name foregrounds *earnings*, not coverage |
| `damage responsibility` | The host's per-trip exposure | "deductible" / "excess" — the insurance terms are avoided because the product is contractual, not insurance |
| `physical damage reimbursement` | What Turo pays hosts | "claim payout" |
| `additional driver` / `primary driver` | Multi-driver vocabulary | "authorised driver" |
| `delivery` | Host bringing the car to the guest | "collection", "drop-off service" — `drop-off` is reserved for the trip end |
| `All-Star Host` | A host status tier | "Superhost", "Top rated" |
| `Carculator` | Host earnings-estimator tool | Portmanteau; sits in the main nav |
| `OpenRoad` | Turo's editorial property | |
| `Pitch a trip` | A footer product | Opaque without clicking — an outlier in an otherwise literal vocabulary |
| `loyalty bonus` | "earn a promo code for one bonus day when you take trips totaling 10 days in a 90-day period" | "rewards programme" |
| `New listing` | Rating-slot substitute for un-reviewed cars | "No reviews yet", "0.0" |

**Register split, and where it fails.** Marketing says `host`/`guest`; legal footnotes say `host`/`guest`; the support site says `Owner`/`Traveler`. Wise splits register deliberately by surface (long form in marketing, short form in help). Turo's split is not a register choice — it is two vocabularies that have not been reconciled, and it sits on the surface a user reaches when something has gone wrong.

## T14 Voice, tone & accessibility

**Person and tense.** Second person for whichever side the page is addressing; first-person plural for the company, and the company is a visible actor even in adverse copy ("we'll help you find one", "Turo will reimburse the rest", "We screen each guest"). The host is always the grammatical subject of handoff sentences; Turo is always the grammatical subject of protection sentences. That division is consistent and legally load-bearing.

**Register gradient, clearly graded.** Colloquial in acquisition (`Start your engine!`, `Ready to go? List your car on Turo today, start earning tomorrow.`, `go light for a bigger piece of the pie`, `Dive deeper`, `hit the road`, `Grab a car nearby`). Neutral in how-it-works. Flat and clause-heavy in footnotes. One exclamation mark in the step-3 body ("you're all set!") and one in a CTA heading (`Start your engine!`) — both in low-stakes positions. Zero exclamation marks anywhere in the insurance or trust copy.

**The `Tips and tricks` block is the tonal outlier** `[observed]` — four imperative headings with bodies that are unusually blunt about the limits of the platform:

- `Research` — "We keep a safe and trustworthy marketplace, but **only connect with people you feel confident meeting in person**."
- `Review` — rate each other to inform future users
- `Protect yourself` — "Never post your address, email, or phone number online. We keep your private information private, and only reveal members' names, numbers, and locations once a trip is booked."
- `Respect each other` — "Anyone who doesn't respect our members or our members' vehicles will be removed from the Turo marketplace."

`Protect yourself` as a heading on a trust page is a striking admission. So is the `but` in the `Research` body — a claim followed immediately by its own limit, in the same sentence. Worth stealing: **in a stranger-to-stranger marketplace, tell the user what the platform cannot guarantee, in the same sentence as what it can.** The fourth item is an enforcement threat aimed at the reader, in a section nominally offering them tips — tonally jarring, and arguably the wrong slot for it.

**Numbers as trust devices** `[observed]`: `100+ airports`, `1,600+ unique makes & models`, `up to $750,000`, `$200,000`, `24/7`, `1–3 days`, `$1,000 per month`. Mixed rounding, and two figures on the insurance page that contradict each other across layers (see T10).

**Social proof is attributed with name and city** `[observed]`: `- Sam W., Los Angeles, CA`, `- Okey O., Sugarland, TX`. Both quotes are about claims outcomes, not about driving — on an insurance page, the testimonials are deployed as evidence that the *recovery* process works. That is a deliberate and effective choice.

**Accessibility content** `[observed]`

- Alt text on illustrative images is **empty-quoted rather than empty**: `alt=" "` (a literal space) appears repeatedly on the how-it-works and insurance pages. A single space is not an empty alt attribute — many screen readers will announce these as unlabelled images rather than skipping them. This is a real, repeated defect.
- Functional images do carry alt text: `animated hand holding phone`, `animation of finding a car`, `rear view of a car`, `car key being passed between hands`, `Travelers insurance logo`, `Squiggle`. `Squiggle` on a purely decorative divider should be empty alt.
- **Alt text carrying stale content**: the Jalopnik pull-quote image alt reads `$125,000` while the rendered quote reads `$200,000`; the Liberty Mutual alt sits on a Travelers logo. Screen-reader users receive materially different — and outdated — financial figures.
- `Click here` used as link text on the insurance page.
- No `Skip to content` link observed in the served markup on any of the four marketing pages. `[absent]`
- Vehicle cards concatenate as `BMW X4 2022 in Los AngelesAdd car to favorites BMW X42022•5.0(11)$67/day$202 total` — the accessible name of the card appears to run the favourite-button label into the vehicle description, and the model name is duplicated. Flagged as **suspected** from serialised text, not confirmed against the live accessibility tree.

**Negative findings, recorded honestly**

- `host`/`guest` (marketing) vs `Owner`/`Traveler` (support) — one marketplace, four role names
- `Contact support` (nav, login-gated) vs `Get help` (footer, direct) — one destination, two labels, two access paths
- `Insurance & damage` appears twice in the support tree with different article counts
- Liberty Mutual alt text and `$125,000` alt figure surviving on a Travelers-branded page quoting `$200,000`
- `alt=" "` used where `alt=""` is meant, repeatedly
- `Click here` on the insurance page
- Five levels of asterisk footnote on a single pricing page
- The headline host-share figures are contradicted for nine named markets at footnote depth five

---

## Transferable patterns

1. **Make the counterparty the grammatical subject of handoff copy, and the platform the subject of protection copy.** Turo never says "we give you the keys" and never says "your host covers the damage". Applied consistently, this single grammar rule does most of the liability work on the page. Transfers directly to any marketplace where a third party performs the service — and to PayPal contexts where a merchant, not PayPal, performs delivery.
2. **Name pricing tiers after the axis the user is trading on, not their rank.** `More peace of mind` / `Balanced` / `More earnings` tells the host what they are giving up. Condition: only works when the trade-off is genuinely two-sided. Note Turo itself abandons this on the guest side (`Premier` / `Standard` / `Minimum`), which is the weaker half of its own system.
3. **State the platform's limit in the same sentence as its promise.** "We keep a safe and trustworthy marketplace, but only connect with people you feel confident meeting in person." The `but` clause is what makes the first clause credible. Directly applicable to fraud-protection and buyer-protection copy.
4. **Promote the emergency path to a top-level help category on both sides of a marketplace.** `Emergency roadside and collision assistance` at category rank, un-nested, twice. The IA states the priority before any article does.
5. **Give the user the fork when a refund and a fix compete for the same money.** "Your refund can be temporarily held to expedite rebooking, or the funds can be returned to your bank account — your choice." Highly transferable to disputes, chargebacks, and redelivery flows.
6. **Quote the competitor's own weasel phrase back at them, once.** `Get one type of car "or similar"` is the only quotation mark on the comparison table and it lands because it is the only one.
7. **Anti-pattern to avoid: asterisk laddering.** Five asterisk levels on one page means the true price is unreadable at the point of decision. If a headline number is wrong in nine markets, that belongs adjacent to the number, not at footnote five.
8. **Anti-pattern to avoid: unreconciled role vocabularies across surfaces.** A user who learns `host`/`guest` on the marketing site and then lands on `Owner`/`Traveler` when something breaks has to re-map their mental model at the worst possible moment.

## Caveats & gaps

- **Support-article bodies not retrieved.** `help.turo.com` and `support.turo.com` are client-rendered; `help.turo.com/` returned a bare title, and individual article URLs returned `<head>` metadata only. Everything in T7 and T11 about article *content* is inferred from titles, meta-descriptions and meta-keywords, and is marked `[documented]`.
- **Support is login-gated from the primary nav entry point**, so a full support harvest is not possible on an unauthenticated pass at all — not merely inconvenient.
- **All trip states, notifications, empty states, validation messages, the approval-to-drive flow, the check-in/check-out photo UI, and the damage-report form are behind auth.** T6, T8 and T9 are consequently thin and honestly marked.
- **Listing detail pages were not opened.** Per-vehicle rules, host-set policies, mileage limits and delivery-fee presentation all live there and are unharvested.
- **The insurance page carries at least two stale assets** (Liberty Mutual alt text, a `$125,000` figure in alt against `$200,000` in the visible quote). Any figure taken from that page should be re-verified before use as precedent. Turo's own footnotes date-stamp nothing, so there is no way to tell from the page how current any number is.
- **US locale only.** AU, CA, FR and GB surfaces are unharvested, and several disclosures (age minimums, licence tenure, cross-border rules) are explicitly market-dependent.
- **Accessibility findings are from served HTML, not from a rendered accessibility tree.** The vehicle-card labelling issue in particular is flagged as suspected rather than confirmed.
- Mobile app copy is out of scope for a public web harvest.

## Sources

1. https://turo.com/
2. https://turo.com/us/en/car-rental/united-states/how-turo-works
3. https://turo.com/us/en/car-rental/united-states/insurance
4. https://turo.com/us/en/car-rental/united-states/trust-and-safety
5. https://help.turo.com/ (title only — client-rendered)
6. https://support.turo.com/hc/en-us
7. https://help.turo.com/en_us/trip-photos-guide-or-guests-HytcE4g49 (metadata only)
8. https://help.turo.com/en_us/reporting-damage-or-guests-SJtWr4gE9 (metadata only)
