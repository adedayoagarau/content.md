# 084. Hopper

| Field | Value |
|---|---|
| Domain | `TRAV` — Travel and mobility |
| Industry / sub-vertical | Flight price-prediction app / app-first OTA with a fintech attachment layer (fare-lock and flexibility products) |
| Primary URL | https://hopper.com/ |
| Corpus rank | 084 |
| Benchmark strength (source list) | Price predictions and timing |
| Locale / market observed | en-US, USD |
| Platform observed | Media centre (`media.hopper.com`), FAQ centre metadata (`help.hopper.com`). **The product site itself rendered no body text.** |
| Auth state | Unauthenticated public surfaces only |
| Regulatory posture | **FTC.** Hopper published a settlement statement dated 2 July 2026 describing "primarily outdated display practices implemented during the pandemic, limited to the Hopper app, and discontinued by Hopper in mid-2023". Hopper states "the FTC raised no issues with the current Hopper app or website". Its flexibility products (`Cancel for Any Reason`, `Disruption Assistance`) are consistently framed as *services*, never as insurance — no insurance or state-licensure disclosure was observed on the reachable surface. |
| Harvest date | 2026-09-21 |
| Pages inspected | 24 attempted / 6 fully readable + 5 partial |
| Harvest completeness | **Blocked on the primary surface.** `hopper.com` is a client-rendered SPA: the homepage, `/flights`, all five `/product/*` pages and `/legal/terms-and-conditions` return `<title>` and `<meta>` only, with **zero body text**. `help.hopper.com` is likewise client-rendered, but five article pages leak the first ~150 characters of body copy through `meta-description` — those fragments are quoted here and marked. `support.hopper.com` returned empty. **`media.hopper.com` renders fully** and carries the only complete Hopper prose in this file. Consequence: the actual in-app prediction UI strings — the thing this product is in the corpus for — are **not observable from the public web at all.** |

## Pages inspected

| Label | URL | Result |
|---|---|---|
| Homepage | https://hopper.com/ | **Empty body** — title + meta only |
| Flights | https://hopper.com/flights | **Empty body** |
| Price Prediction (product) | https://hopper.com/product/price-prediction | **Empty body** — generic meta |
| Cancel for Any Reason (product) | https://hopper.com/product/cancel-for-any-reason | **Empty body** — generic meta |
| Premium Disruption Assistance (product) | https://hopper.com/product/premium-disruption-assistance | **Empty body** — generic meta |
| Terms and Conditions | https://hopper.com/legal/terms-and-conditions | **Empty body** |
| FAQ centre home | https://help.hopper.com/ | **Empty body** — title `FAQs - Hopper` |
| How do Price Predictions work with Hopper? | https://help.hopper.com/en_us/about-our-price-predictions-Hy7cLt_Fv | **Partial** — meta-description leak |
| What is Hopper's Premium Disruption Assistance? | https://help.hopper.com/en_us/premium-disruption-assistance-ByKnGtdKD | **Partial** — meta-description leak |
| What is Hopper's Cancel For Any Reason service for flights? | https://help.hopper.com/en_us/instant-travel-refund-promise-ry7OrFuFD → `/cancel-for-any-reason-flights-ry7OrFuFD` | **Partial** — leak + a revealing redirect |
| What do I do if my flight gets cancelled? | https://help.hopper.com/en_us/what-do-i-do-if-my-flight-gets-canceled-SkFObDw55 | **Partial** — meta-description leak |
| How do I check if my booking is confirmed? | https://help.hopper.com/en_us/how-to-check-if-your-booking-is-confirmed-rJ3QUY_KP | **Partial** — meta-description leak |
| Booking on Hopper.com | https://help.hopper.com/en_us/booking-on-hopper-com-B1fbLwxe6 | **Partial** — meta is the single word "Booking" |
| Price Freeze: General Information (category) | https://help.hopper.com/en_us/categories/price-freeze-general-information-ryHCgqNKu | Empty |
| What if my Price Freeze expires? | https://help.hopper.com/en_us/what-if-my-price-freeze-expires-r1peqV3Yd | Empty |
| Why did the price of my reservation go up after I purchased a Price Freeze? | https://help.hopper.com/en_us/why-did-the-price-of-my-reservation-go-up-after-i-purchased-a-price-freeze-Skj2sEuo | Empty |
| Price Freeze for Flights: "No Availability" error | https://help.hopper.com/en_us/price-freeze-for-flights:-no-availability-error-Bk6YNFutD | Empty |
| Legacy support site | https://support.hopper.com/hc/en-us/articles/360024199954-Price-Predictions | Empty |
| Welcome to Hopper! | https://media.hopper.com/articles/welcome-to-hopper | **Full** — the product-feature inventory |
| 5 Ways the Hopper App Saves You Money on Your Flights | https://media.hopper.com/articles/5-ways-the-hopper-app-saves-you-money | **Full** — 2017, the prediction-copy origin |
| 2025 Travel Booking Hacks | https://media.hopper.com/research/2025-travel-booking-hacks | **Full** — the timing-advice masterclass |
| Hopper Announces Price Freeze™ for Hotels… | https://media.hopper.com/news/hopper-announces-price-freeze-for-hotels-to-help-summer-travelers-lock-in | **Full** — Price Freeze mechanics |
| Hopper reaches settlement with the FTC | https://media.hopper.com/news/hopper-reaches-settlement-with-the-ftc | **Full** |
| In the Press (news index) | https://media.hopper.com/news | **Full** — headline grammar |

---

## T1 Navigation & IA labels

The `hopper.com` header never rendered. What is observable is the **footer**,
which is served identically on every `media.hopper.com` page and is the only
complete IA artefact captured.

**Footer — five groups** `[observed]`

| Group | Labels (verbatim) |
|---|---|
| `Travel` | `Flights` · `Hotels` · `Deals` |
| `Products` | `Price Prediction` · `Change for Any Reason` · `Cancel for Any Reason` · `Leave for Any Reason` · `Disruption Assistance` |
| `Company` | `About` · `Culture` · `Careers` · `Partner with Hopper Homes` · `Partner with Hopper Hotels` |
| `FAQs` | `Flights` · `Hotels & Homes` · `Hopper Products` · `Billing and Payment` · `Using the App` · `Privacy Notice` · `Terms and Conditions` |
| `Media` | `News` · `Articles` · `Press Kit` · `Research` · `Media Enquiries` |

**The `Products` group is the most distinctive nav block in the travel set.**
Three of its five entries share a suffix — `Change for Any Reason`,
`Cancel for Any Reason`, `Leave for Any Reason` — forming a deliberate family
where the **verb is the only variable**. Change (before you go), Cancel (before
you go), Leave (once you're there). Three named escape hatches at three points on
the trip timeline, and the naming makes the family legible at a glance: whatever
goes wrong, there is a `… for Any Reason` for it.

`for Any Reason` is itself the load-bearing phrase — it is the industry's term of
art (CFAR, from travel insurance) promoted to a consumer-facing product name.
Hopper sells the *absence of a justification requirement* as the product, and
names it after that absence.

`Price Prediction` sits first in the group, ahead of the four flexibility
products. Hopper's proposition ordering is **predict → then protect**.

**`Partner with Hopper Homes` / `Partner with Hopper Hotels`** `[observed]` — the
supply-side entry points are labelled as an invitation (`Partner with…`) rather
than as a task ("List your property"). They route to different destinations
(`hosts.hopper.com` and a Typeform), which indicates two supply programmes at
different maturities.

**FAQ IA — five categories, mixing object and activity** `[observed]`:
`Flights` · `Hotels & Homes` · `Hopper Products` · `Billing and Payment` · `Using the App`.

Two are verticals, one is the proprietary-feature bucket, one is money, one is
the app itself. **`Hopper Products` as a help category is the tell**: Hopper's
attachment products are distinctive enough that they cannot be filed under a
vertical, so they get their own branch. `Using the App` is the app-first
equivalent of a "getting started" category.

The category URLs carry a second, older label set:
`help-with-flights`, `help-with-hotels`, `hopper-products`, `billing-and-payments`,
`using-the-app` — note `billing-and-payments` (plural) in the slug against
`Billing and Payment` (singular) in the label.

**Article URL slugs are full questions** `[observed]`:
`/en_us/what-do-i-do-if-my-flight-gets-canceled-SkFObDw55` ·
`/en_us/how-to-check-if-your-booking-is-confirmed-rJ3QUY_KP` ·
`/en_us/what-if-my-price-freeze-expires-r1peqV3Yd` ·
`/en_us/why-did-the-price-of-my-reservation-go-up-after-i-purchased-a-price-freeze-Skj2sEuo`

The URL *is* the question, plus an opaque ID. One slug even carries a colon:
`/en_us/price-freeze-for-flights:-no-availability-error-Bk6YNFutD` — a punctuation
mark that has no business in a URL path.

**Media centre nav** `[observed]`: `News` · `Research` · `Press Kit` ·
`Media Enquiries`, with a secondary `Hopper App` strip (`Home` · `About` ·
`Culture` · `Careers` · `Download`). `Media Enquiries` uses the British spelling
on a US property.

**Terminology drift in the nav itself** `[observed]`: the footer says
`Disruption Assistance`; the help article is titled
`What is Hopper's **Premium** Disruption Assistance?`; the FTC statement says
`Disruption Assistance`; and the product URL is `/product/premium-disruption-assistance`.
`Premium` is present in two of four and absent from two.

## T2 Value proposition & headline patterns

**The canonical one-sentence proposition** `[observed]`, used as both the deck of
`Welcome to Hopper!` and as its meta description:

> "Hopper is a travel app that uses data-driven tools to save you **time, money,
> and anxiety** in your quest to book the perfect trip."

**`anxiety` is the word to steal.** A travel app that names an *emotion* as the
third thing it saves you, in a list otherwise made of the two standard commerce
nouns. It is the only place in this five-product travel set where a company
identifies the psychological cost of its category as a thing the product
addresses. For a price-prediction product — whose entire job is resolving
*should I buy now or wait?* — naming the anxiety is a precise description of the
value, not a flourish.

The rest of the sentence is careful too: `data-driven tools` (mechanism, not
magic), `in your quest to book the perfect trip` (a light self-aware register that
acknowledges the search is a slog).

**The headline claim, stated identically across nine years** `[observed]`:

- 2017: "our Price Prediction feature gets it right an **estimated 95%** of the time!"
- 2021: "Hopper predicts future flight and hotel prices with **95% accuracy** and notifies you the instant there's a deal."

**`95%` is the number the entire product rests on, and Hopper's two framings of
it are meaningfully different.** The 2017 version hedges twice — `estimated` and
`gets it right … of the time` — while the 2021 version asserts `95% accuracy` as
a flat property of the system. The later, more confident phrasing is the one now
in use, and it is also the vaguer one: "95% accuracy" does not say accurate *at
what* (predicting direction? magnitude? the recommendation being the cheaper
outcome?), whereas "gets it right … of the time" at least implies a binary
recommendation being correct.

A third framing, from the FTC statement, quantifies the benefit instead of the
accuracy: "The app's **free** Price Prediction feature has **saved consumers over
$100 million** on trips." Same product, third metric.

**Feature-block grammar: bolded product name, em-dash, one-sentence mechanism**
`[observed]`, from `Welcome to Hopper!`:

- **`Deals Calendar`** — "Hopper helps you instantly identify the cheapest dates to travel with a color-coded calendar."
- **`Price Predictions & Trip Watches`** — "Hopper predicts future prices with 95% accuracy. 'Watch a Trip' to have Hopper monitor prices 24/7 and notify you the instant there's a deal."
- **`Price Freeze`** — "Found a great price, but not quite ready to book? Don't miss out with Price Freeze. Hopper will freeze the price so you can book it at a more convenient time."
- **`Flexible Dates Plan`** — "you can change your flight, including date, time, and airline, for any reason up to 24 hours prior to your scheduled departure with no added fees."
- **`Refundable Ticket Plan`** — "you can cancel your flight for any reason up to 24 hours prior to your scheduled departure and receive **at least 80%** of your ticket cost back."
- **`Disruption Rebooking Service`** — "Never get stuck at the airport again. If your flight is delayed or you miss your connection, you can instantly rebook the next flight to your destination in the app - **no matter the airline** - at no additional cost."

**The `Price Freeze` entry is the model construction for a hesitation product:**
*question naming the user's exact state* ("Found a great price, but not quite
ready to book?") → *loss framing* ("Don't miss out") → *mechanism* → *benefit in
the user's own terms* ("at a more convenient time"). Four moves, three sentences.
The question is the key: it describes a state the reader is *currently in*, which
is more specific than describing a benefit.

`Disruption Rebooking Service` uses the same opening move as a negation —
"Never get stuck at the airport again" — and then does the single most important
thing in its category: **it names the constraint it removes.** `no matter the
airline` is set off with dashes and is the entire product. An airline's own rebooking
is airline-bound; Hopper's is not, and the copy puts that in the middle of the
sentence with visual emphasis.

**Hotel and car blocks reuse the same shapes** `[observed]`:
`Price Predictions & Hotel Watches` · `Exclusive Rates & Carrot Cash` ·
`Price Freeze` (60 days for hotels) · `Refundable Rates` ·
`No Penalty for Young Drivers` · `Book Now, Pay Later`.

**`No Penalty for Young Drivers`** is a benefit named after the *industry practice
it abolishes* — "Traditionally rental car companies charge you a penalty if
you're under 25. If you're under 25, you can book most deals through Hopper
without any penalty charges." Name the incumbent's fee, then say you don't charge
it. Compare Booking's neutral "you might have to pay a 'young driver fee'".

**The closing line of the feature inventory** `[observed]`:

> "Hopper offers ultimate flexibility and hassle-free booking so you can travel
> with confidence and **avoid fees and frustration.**"

Alliterative pairing (`fees and frustration`) restating the money/emotion pairing
from the opening `time, money, and anxiety`. The proposition opens and closes on
the same two-axis claim.

**News headlines are long, factual and asterisked** `[observed]`:

- "Hopper announces its Late Summer Sale running August 12-14th with deals up to 50% off popular destinations*"
- "Hopper announces Early Summer Sale Running from May 6th to the 8th, with $15 to $250 off popular warm weather destinations"
- "Travel Deal Tuesday 2025 brings the best travel deals of the season – with up to 40% off popular destinations & dozens of participating travel brands"
- "Hopper Announces Price Freeze™ for Hotels to Help Summer Travelers Lock in the Best Rates"

Every promotional headline carries **dates and a bounded discount range** in the
headline itself (`August 12-14th`, `up to 50%`, `$15 to $250`). The second is
better than the first: `$15 to $250` is a range with a floor, where `up to 50%`
has only a ceiling. Note the asterisk on the first headline and the inconsistent
capitalisation of `Running` / `running` between the two sale announcements.

`Price Freeze™` carries a trademark symbol in the news headline and nowhere else.

## T3 CTA inventory

Almost nothing is observable, because the product surfaces did not render.

| CTA (verbatim) | Context | Notes |
|---|---|---|
| `Get started` | Media-centre sale article | |
| `Download the Hopper App` | Foot of media articles | |
| `Download the Hopper mobile app to set up airfare alerts and you could save up to 40% on your flight!` | 2017 article, as a full-sentence CTA | Action + mechanism + bounded benefit |
| `Try the free Hopper app and you could save up to 40% on your next flight. Enjoy!` | 2017 article | `you could` — modal hedge inside a CTA |
| `Get the Hopper app to find the best deals.` | Research article sign-off | |
| `Watch a Trip` | Quoted as a UI control in prose | **The core interaction, named as a verb phrase** |
| `Watch a Hotel` | Quoted as a UI control in prose | Same verb, different object |
| `Show all flights` | Quoted as an in-app control (search listing) | |
| `Stop all alerts` | Quoted as an email-footer control (search listing) | |
| `Find partner contact details` | *(not Hopper — cross-check)* | |

**`Watch a Trip` is Hopper's signature verb and it is the whole interaction
model.** Not "Track", not "Save", not "Set a price alert" — `Watch`. It implies
ongoing passive attention by someone else on your behalf, which is exactly what
the product does, and it converts cleanly into a noun (`Trip Watches`,
`Hotel Watches`, `Flight Watch tool`). One verb, four grammatical forms, one
mental model.

**The 2017 CTAs are full sentences with hedges inside them** —
"you **could** save up to 40%". A modal verb inside a call to action is unusual
and correct: the saving is conditional and the CTA says so rather than deferring
it to a footnote.

## T4 Onboarding & getting-started

**`[documented]`, and unusually thin, because Hopper's onboarding is the app's own
first-run experience and that is not on the web.**

The closest thing to a getting-started sequence is an instruction embedded in the
2017 article and restated in the 2025 research piece:

> "download the app and set up fare alerts for your departure airport and
> destination. Hopper will watch flights, monitor price trends and notify you when
> your flight price changes, and also recommend whether you should book your
> flight now or wait until the price drops further."

Four verbs in sequence — `watch` → `monitor` → `notify` → `recommend` — which is
the whole product described as a pipeline the user does not have to run. The user
does one thing (set the alert); Hopper does four.

**The recommended behaviour is quantified and repeated** `[observed]`:

- "The average Hopper user starts watching a trip **3-4 months in advance**"
- "Start monitoring prices for domestic flights **at least 3-4 months** before you plan to depart."
- "Start monitoring the price of your trip **7-8 months** before departure" *(long-haul international)*
- "Remember, though: **The earlier you start monitoring the better.** Early watchers are more likely to be in the loop when that flight price becomes super cheap."

Hopper uses *other users' behaviour* as the onboarding instruction — "the average
Hopper user starts watching a trip 3-4 months in advance" — which is a social
proof that doubles as a how-to. And `Early watchers` is a coined user-type noun
that appears once.

**`Using the App` is a named FAQ category** `[observed]` — the app itself is
treated as a thing requiring documentation, separate from flights and hotels.

## T5 Form & field labels

`[absent]`. No form, field, placeholder or validation copy was observable on any
reachable Hopper surface. The app is the product and the app is not on the web.

Two in-app control labels are quoted in prose and recorded in T3
(`Watch a Trip`, `Show all flights`). No others.

## T6 Status & state language — **PRIORITY**

Hopper's status vocabulary is unusual in the domain because it includes
**prediction states** and **fare-lock states** alongside the ordinary booking
states. Only fragments are observable.

**Booking confirmation states** `[observed]`, from the meta-description leak of
`How do I check if my booking is confirmed?` — this is the fullest booking-state
sentence captured:

> "How to Check if Your Booking is Confirmed  Whenever a booking has been
> **confirmed and ticketed by the airline**, you will receive a confirmation email
> from Hopp…"

Three facts in one clause. `confirmed **and ticketed**` names **two distinct
states as a conjunction** — an intermediate state exists between "we took your
money" and "you have a ticket", and Hopper's confirmation is gated on the second,
not the first. And the actor is named: `by the airline`, not by Hopper. For an
intermediary, stating that the confirming party is the supplier is the correct
and honest framing, and it is done in three words inside the opening sentence.

The article's auto-extracted keyword list — `app, not, booking, email, may,
confirmed, will, confirmation, Hopper, charge, Check, Booking, Confirmed, Whenever`
— includes `charge` and `not`, indicating the body covers the
charged-but-not-confirmed case. **That body was not retrieved and its content is
not reported here.**

A separate, unreached article is titled `Why was I charged when my hotel booking
was not confirmed?` *(surfaced in search listings; not directly verified)* —
which names precisely that failure state as a question.

**Prediction states — the genuinely rare vocabulary** `[observed]`

The recommendation itself is a binary state on a watched trip, and the two values
are consistently `buy` and `wait`:

> "recommend whether you should **book your flight now or wait until the price drops further**"

> "In 95% of cases, following the **'buy' or 'wait'** recommendation will get you a cheaper flight or at least the same price as found in your initial search."
> *(this phrasing is surfaced from search indexing of `media.hopper.com/articles/why-we-do-what-we-do-at-hopper`, which was not directly fetched — treat as indicative, not verified)*

**Two states, four letters each, no third option.** No "maybe", no "uncertain",
no confidence band in the state name. The hedging is moved entirely into the
surrounding copy (`95%`, `estimated`) and out of the state label, which stays
crisp enough to act on. That separation — **certain-sounding state, hedged
context** — is the central content-design decision in this product and it is the
one thing a content designer should take from Hopper.

The state is also **transitional and watchable**: the user who receives `wait` can
subscribe to the moment it flips. Hopper's own description of this
*(from the same indexed source, unverified)*: "If a user follows Hopper's
recommendation to wait, they can sign up for alerts that will inform them when
Hopper's recommendation has **shifted to 'buy now'**."

`shifted to` is the verb for a state transition on a probabilistic recommendation
— not "changed", not "updated". A prediction that moves.

**Price-movement states** `[observed]`, used as notification triggers:

> "Watch a Trip lets Hopper do your comparison shopping for you by monitoring
> prices 24/7 and alerting you if **prices drop or are expected to rise**."
> *(indexed from `media.hopper.com` research content; not directly fetched)*

The pair is asymmetric and deliberately so: `prices drop` (observed, past) vs
`are expected to rise` (predicted, future). **A drop is reported; a rise is
forecast.** Hopper only claims to observe the good news and only predicts the bad
news. That asymmetry is honest — you cannot alert someone to a drop that hasn't
happened — and it maps exactly onto the two reasons a user would act.

**Price Freeze states** `[observed]`, from the Price Freeze announcement. The
freeze is a time-bounded object with its own lifecycle:

| State/concept | Verbatim |
|---|---|
| Freeze duration | "Price Freeze for Hotels allows you to freeze the best rate at a specific hotel for **as long as 60 days**." |
| Price rises during the window | "if the price increases during the course of the freeze window, **Hopper will cover up to $100** so you pay that previous low price" |
| Price falls during the window | "If the price goes down during the freeze window, **you'll pay the new low price.**" |
| Deposit | "the **Price Freeze deposit** will be credited to your booking price" |
| Transferability | "the Price Freeze is **transferable** and you can use your Price Freeze deposit towards another hotel booking" |
| Expiry | Article title: `What if my Price Freeze expires?` *(body not retrieved)* |
| Failure | Article title: `Price Freeze for Flights: What happens if I receive a "No Availability" error?` *(body not retrieved)* |
| Price went up anyway | Article title: `Why did the price of my reservation go up after I purchased a Price Freeze?` *(body not retrieved)* |

**The two-sided freeze rule is the best-written thing in the file:**

> "Hopper ensures that customers always get the best price – if the price
> increases during the course of the freeze window, Hopper will cover up to $100
> so you pay that previous low price. **If the price goes down during the freeze
> window, you'll pay the new low price.**"

A lock that is **one-directional in the user's favour**, stated as two parallel
conditionals in one sentence. The user is protected from the rise and still
benefits from the fall. Most fare-lock products would state only the first half.
And the cap — `up to $100` — is inside the protective clause, not footnoted.

**The existence of three separate help articles about a Price Freeze going wrong**
(`expires`, `No Availability` error, `price went up anyway`) is itself the
finding: Hopper has written the failure documentation for its own guarantee,
including the case where the guarantee appears not to have held. The third title
— `Why did the price of my reservation go up after I purchased a Price Freeze?` —
is written from the position of a user who feels cheated, in the first person
possessive, with no defensive framing in the title.

**Carrot Cash states** *(article titles surfaced in search listings; bodies not
retrieved)*: `What is Carrot Cash?` · `How do I get Carrot Cash?` ·
`How can I use Carrot Cash?` · `How much Carrot Cash can I redeem when I make a
purchase?` · `How do I check how much Carrot Cash I have?` ·
`Is Carrot Cash refundable?` · `Does Carrot Cash expire?` ·
**`Why has my Carrot Cash disappeared?`**

Eight articles for one currency, and the last one is the Wise-style anxious
question — `Why has my Carrot Cash **disappeared**?` — using the user's alarmed
verb rather than "expired" or "been deducted". A balance that vanishes is the
single highest-anxiety state in any stored-value product, and Hopper names it
with the word the user would use.

## T7 Error, failure & recovery — **PRIORITY**

**Disruption is a named, paid product, not a support process.** That is the
structural difference between Hopper and every other product in this domain set.

**`Disruption Rebooking Service` / `Disruption Assistance`** `[observed]`:

> "**Never get stuck at the airport again.** If your flight is delayed or you miss
> your connection, you can instantly rebook the next flight to your destination in
> the app - **no matter the airline** - at no additional cost."

Five elements in two sentences: the promise as a negation of a universal
experience; two named triggers (`delayed`, `miss your connection`); the remedy
(`instantly rebook the next flight`); the location (`in the app`); and the two
constraints removed (`no matter the airline`, `at no additional cost`).

The 2025 research article restates it in the user's voice with the emotional
payoff attached:

> "If your flight is delayed, canceled, or you miss a connection, you can
> immediately rebook on any flight, regardless of carrier. **Skip the lines, forget
> the frustration, and head on your way.**"

Three imperatives in a tricolon, and the middle one is emotional
(`forget the frustration`) between two logistical ones. Note `delayed, canceled,
or you miss a connection` adds a third trigger the first version omits.

**`Flight Delay Guarantee`** `[observed]`, from the meta-description leak of
`What is Hopper's Premium Disruption Assistance?`:

> "Hopper's Flight Delay Guarantee  Worried about your flight being delayed?
> **Opt-in for the Flight Delay Guarantee on select bookings in the app!** If your …"

The opening is a **question naming the user's anxiety** — "Worried about your
flight being delayed?" — the same construction as the Price Freeze block
("Found a great price, but not quite ready to book?"). This is a repeatable
Hopper pattern: **open a product explanation with the emotional state that would
make someone want it.**

The scope bound (`on select bookings`) is inside the CTA sentence. The article's
auto-extracted keyword list includes `re-book`, `canceled`, `airline`, `additional`
— consistent with the rebooking mechanics above. **The body was not retrieved.**

Note that the footer calls this `Disruption Assistance`, the article calls the
product `Premium Disruption Assistance`, and the *feature* inside it is the
`Flight Delay Guarantee`. Three names across two levels of one product.

**`Cancel For Any Reason` (CFAR)** `[observed]`, meta-description leak:

> "Hopper's Cancel For Any Reason for Flights  If you're looking for some
> flexibility to cancel your booking **because you can no longer travel**, you may
> want to a…"

Again the opening names the user's situation before the product. `because you can
no longer travel` is a generous framing — it presumes the cancellation is forced,
not capricious, even though the product's entire premise is that no reason is
required.

The refund terms are stated elsewhere `[observed]`:
"you can cancel your flight for any reason up to **24 hours prior to your
scheduled departure** and receive **at least 80%** of your ticket cost back."

`at least 80%` is the correct construction — a **floor, not a ceiling**. Compare
the industry's "up to". A user reading `at least 80%` knows their worst case;
a user reading "up to 80%" does not.

**A redirect that documents a rename** `[observed]`. The URL
`/en_us/instant-travel-refund-promise-ry7OrFuFD` **302s to**
`/en_us/cancel-for-any-reason-flights-ry7OrFuFD`. The product was once called
**`Instant Travel Refund Promise`** and is now `Cancel For Any Reason`. The old
name was a Hopper coinage promising speed (`Instant`) and certainty (`Promise`);
the new one adopts the insurance industry's term of art. That is a move *away*
from proprietary branding and *toward* category-standard language — the opposite
of the usual direction — and it is legible only because the old slug still
resolves.

**`Change for Any Reason` / `Flexible Dates Plan`** `[observed]`:

> "you can change your flight, including **date, time, and airline**, for any
> reason up to 24 hours prior to your scheduled departure **with no added fees**."

`including date, time, and airline` enumerates the axes of change, and `airline`
is the one that matters — changing carrier is normally impossible.

**Airline-cancellation recovery** `[observed]`, meta-description leak of
`What do I do if my flight gets cancelled?`:

> "It's an unfortunate reality, but **several flights do get cancelled daily for a
> number of reasons**. However, if…"

The article opens by **normalising the event before addressing it**. "It's an
unfortunate reality" concedes; "several flights do get cancelled daily" supplies
base rates; "However" pivots. Three moves before any instruction. This is the
same concede-then-act structure Booking uses for overbookings, applied to the
guest side.

The auto-extracted keyword list — `Hopper, flight, will, cancellation, within,
available, flights, cancelled, change, offer, best, possible, options, can` —
contains `within`, `options` and `offer`, suggesting a time-bound options list.
**The body was not retrieved and no terms are reported.**

**Disruption planning as content** `[observed]`, from `2025 Travel Booking Hacks`,
`Hack #6: Plan Ahead for Travel Disruptions`. Four numbered mitigations, and three
of them are *not* Hopper products:

1. **`Add a Disruption Assistance to prepare for the unexpected:`** — note the malformed article ("Add **a** Disruption Assistance"), and the even-handed "offered on Hopper **and other travel providers**"
2. **`Book the first flight of the day`.** — "On average, flights departing after 9am were **up to 2x more likely to be delayed** than those 5am - 8am flights. Cancellations are also typically highest at the end of the day, with **over 3% of flights canceled on average between 5pm and 10pm** last year."
3. **`Fly direct:`** — "You will usually **pay a premium** to fly direct… but it may be worth the cost for travelers concerned about getting to their destination on time."
4. **`Build in a buffer day for events and holidays:`** — "Travel a day early to your special event… that way if you're impacted by a delay or cancellation, you will have 24 hours to reschedule"

**Three of four cost the reader nothing and one explicitly costs them money
("you will usually pay a premium").** A company selling disruption protection
publishing three free alternatives to buying it — and acknowledging competitors
sell the paid one too — is the strongest trust signal in the file. Each
recommendation carries its own statistic, and the `2x` and `over 3%` figures are
specific enough to be checkable.

## T8 Empty states

`[absent]`. Nothing observable.

## T9 Notifications & system messages

Notification is **the product**, not a supporting layer — Hopper's entire model is
watch-then-notify — and the copy treats it that way.

**The notification promise, three framings** `[observed]`:

- "notifies you **the instant** there's a deal" *(twice, verbatim, for flights and hotels)*
- "the Hopper App is primed for **real-time notifications**, which allow users to stay up-to-date with **even the smallest fluctuations** in seat prices on their chosen route!"
- "Hopper offers **instant airfare alerts direct to your iPhone**, ensuring that you never miss out on that sudden airfare sale"

`the instant there's a deal` is the repeated formula — immediacy expressed as a
noun phrase rather than as "immediately" or "in real time", which makes it feel
like a moment rather than a latency figure.

**The justification for notifying at all is given as a statistic** `[observed]`:

> "Statistics show that would-be travelers who **monitor flight prices typically
> enjoy 5-10% cheaper fares in the same 24-hour period.**"

And the urgency is justified by perishability
*(indexed from `media.hopper.com` research; not directly fetched)*:
"You'll be alerted in real time since **some of these price drops don't last long**."
A reason for the interruption, rather than an assertion that it is valuable.

**Notification triggers, named** `[observed]`: a price drop, an expected rise,
the recommendation shifting to buy, a deal, and — for the paid tier — flight delay
and cancellation events.

**Notification management is documented as a user-facing topic**: the
`Stop all alerts` control is described as living at the foot of the alert email
*(surfaced from search listings)*, and the price-prediction article's
auto-extracted keyword list leads with `notifications, send, don't` — indicating
the article covers when Hopper does *not* notify.

**A self-aware caption on a data table** `[observed]`, under the holiday booking
guide in `2025 Travel Booking Hacks`:

> *"Table: **Prices change often, and so might our advice on when to book.**"*

A caption that pre-emptively expires its own table, in italics, under the data.
See T10 — this is the best hedge in the file.

## T10 Disclosures, legal & compliance — **PRIORITY**

### How a probabilistic prediction is hedged

This is what Hopper is in the corpus for, and the observable evidence is
fragmentary but consistent. The hedging operates on **four separate layers**, and
the separation is the design:

**Layer 1 — the state label is unhedged.** `buy` / `wait`. Two words, no
confidence qualifier, no percentage attached to the individual recommendation.
The user gets an instruction, not a distribution.

**Layer 2 — the accuracy claim sits beside the feature, never inside the state.**
`95% accuracy`, `an estimated 95% of the time`. One number, stated at the feature
level, carrying the uncertainty for every individual prediction.

**Layer 3 — the claim is defined by outcome, not by correctness.**
The most careful formulation found:

> "In 95% of cases, following the 'buy' or 'wait' recommendation will get you a
> cheaper flight **or at least the same price** as found in your initial search."
> *(indexed from `media.hopper.com/articles/why-we-do-what-we-do-at-hopper`; not directly fetched — treat as indicative)*

`or at least the same price` is the crucial clause. It redefines success as
**"you were not made worse off"** rather than "we predicted correctly". That is a
much weaker claim mathematically and a much more useful one to the reader, because
it is the thing they actually care about. If this phrasing is current, it is the
single most transferable sentence in the file for anyone writing probabilistic
guidance.

**Layer 4 — the mechanism is named so the number is not magic.**

> "Hopper collects massive amounts of data, amounting to **more than one billion
> individual, real-time flight pr[ices]…**"
> *(meta-description leak, `How do Price Predictions work with Hopper?`)*

> "By combining **billions of pieces of historical flight-price data** from across
> the web with **advanced price-prediction algorithms** for the future, the Hopper
> App is unrivaled in its ability to pinpoint the best time to click that buy
> button"

> "Price Prediction… uses **an archive of a trillion flight prices** to predict
> future prices for your trip."
> *(indexed; not directly fetched)*

Note the escalation across sources: `more than one billion` → `billions of pieces`
→ `a trillion`. Three magnitudes for the same corpus, across different vintages of
copy. The specific number is doing rhetorical rather than informational work.

**The article title asks the user's question, and the first H2 answers it**
`[observed]`: the page is titled `How do Price Predictions work with Hopper?` and
opens `About Our Price Predictions` / `How do they work?`. Title, then a
restatement of the title as an in-page heading — mildly redundant, but it means
the question is the first thing on screen in both the tab and the body.

### The general-guidance disclaimer

`[observed]`, from `2025 Travel Booking Hacks` — Hopper's non-personalised advice
carries its own bounds, stated three ways:

> "**This is general guidance.** We recommend using Hopper's **Flight Watch tool**
> to monitor the price of **any trips you're dreaming of** for 2024. We'll monitor
> the price of **your specific trip** (destination, dates, even preferences around
> non-stop flights!) and let you know when prices are dropping to their lowest!"

**Claim, bound the claim, route to the personalised figure** — the exact Wise
pattern, applied to timing advice rather than to fees. `This is general guidance`
is three words and it demotes everything above it; `your specific trip` with a
parenthetical enumeration of the variables makes the personalised alternative
concrete. (The article is dated January 2025 and says "for 2024" — see T14.)

> *"Table: Prices change often, and so might our advice on when to book."*

A **table caption that tells the reader the table will go stale.** It hedges the
data, the advice, and the recency in eleven words, and it is placed where a
caption normally carries a source note. Followed by:

> "Check back throughout the year for updated guidance on pricing and the best
> times to book!"

which converts the admission of staleness into a return visit.

**Every statistic carries its basis** `[observed]`:
"Based on 2024 and 2025 global flight data…" · "Domestic travelers **last year**
saved 40% or an average of $150…" · "On average, flights departing after 9am were
up to 2x more likely to be delayed…" · "**over 3% of flights canceled on average**
between 5pm and 10pm last year".

And the savings claims are always **dual-format — percentage and absolute**:
`14%` / `$42 per ticket` · `32%` / `$100 per ticket` · `40%` / `$150` ·
`>20%` / `$50 more per night` · `$43 per stay, or $17 per night`.

**Giving both the percentage and the dollar figure for every claim** is a
discipline maintained across nine years of Hopper copy. The percentage is
comparable; the dollar figure is decidable. Neither alone is enough.

### The FTC settlement statement

`[observed]`, 2 July 2026. The most consequential disclosure on the reachable
surface, and a study in adversarial corporate comms.

The structure: **narrow the scope** → **assert no current issue** → **claim
self-remediation** → **disagree** → **counter-evidence** → **restate mission** →
**explain the settlement decision** → **disclaim the amount**.

Verbatim highlights:

> "Upon receiving millions of files dating from the present back to 2021, **the
> FTC's allegations were narrow: primarily outdated display practices implemented
> during the pandemic, limited to the Hopper app, and discontinued by Hopper in
> mid-2023, prior to the start of the FTC's inquiry.**"

Four scoping moves in one sentence: `narrow`, `outdated`, `limited to the Hopper
app`, `discontinued… prior to the start of the inquiry`.

> "Importantly, the FTC raised **no issues with the current Hopper app or website,
> other business divisions, current product offerings, or any other practices.**"

> "We always strive for excellence… which is exactly why **we identified and
> deprecated these display practices ourselves**, prior to this matter even being
> filed. **We disagree with the FTC's characterization** of the Hopper app and how
> we operate our business, which doesn't align with the real customer feedback."

The counter-evidence is app-store reviews, quantified three ways:

> "**96% of all Hopper app reviews are 4-5 stars**, more than a million customers
> have given us a perfect five-star score, and **only 1.7% of reviews are 1-star**."

And the closing pair:

> "Pursuing years of litigation over **outdated, ticky-tacky issues** would
> distract us from our current customers and partners…"
>
> "**The settlement amount does not reflect the merit of the claims. It reflects
> our decision to move forward.**"

`ticky-tacky` is a startling register choice in a regulatory statement —
colloquial, dismissive, and it does more to characterise the writer than the
claims. The final two sentences are the sharpest thing in the document: two short
declaratives, the first a denial and the second a redefinition, with no hedge
between them.

The statement also uses the occasion to restate product value with new numbers:
"The app's **free** Price Prediction feature has saved consumers **over $100
million** on trips" and "Cancel for Any Reason (CFAR) and Disruption Assistance
have saved travelers an additional **$175 million**". And it fences the B2B
business: "Our B2B business remains separate, and is not implicated in the FTC's
allegations."

**For a content designer this is the reference example of a "display practices"
disclosure** — the allegation is about *how prices and urgency were shown in the
UI*, and the response is written entirely in the language of scope, recency and
self-correction rather than substance.

> **Recorded honestly:** this is Hopper's own account of the settlement. The
> FTC's characterisation is not reproduced here and was not sought. Nothing in
> this file should be read as an independent assessment of the claims.

### Product-scope bounds

`[observed]` — every flexibility product carries at least one bound in its
description:

| Product | Bound |
|---|---|
| `Flexible Dates Plan` | "up to 24 hours prior to your scheduled departure" · "with no added fees" |
| `Refundable Ticket Plan` | "up to 24 hours prior to your scheduled departure" · "**at least 80%** of your ticket cost back" |
| `Refundable Rates` (hotels) | "cancel for any reason up to 24 hours prior to check-in and receive **80%** of your trip cost back" |
| `Flight Delay Guarantee` | "**Opt-in** … on **select bookings** in the app" |
| `Price Freeze` (hotels) | "**as long as 60 days**" · "Hopper will cover **up to $100**" |
| `No Penalty for Young Drivers` | "you can book **most deals** through Hopper without any penalty charges" |
| `Price Freeze for Hotels` | "*Price Freeze for Hotels is available on **iOS and Android**.*" — a platform-availability footnote |

Note the **inconsistency between the flight and hotel refundable products**:
flights say `at least 80%` (a floor), hotels say `80%` (a flat figure). Same
number, materially different promise, on the same page.

`Exclusive Rates` carries a mechanism rather than a bound: "Since Hopper is
app-only, hotels send Hopper exclusive rates that are cheaper than travel
websites." — the exclusivity is explained by the distribution constraint, which
makes the claim plausible rather than assertive.

### Carrot Cash disclosure

*(article titles and summaries surfaced in search listings; bodies not retrieved)*
`Does Carrot Cash expire?` and `What is Carrot Cash?` both address an expiry rule.
**The specific expiry period and dormancy conditions are not reported here
because the article bodies were not retrieved.** `Is Carrot Cash refundable?`
exists as a separate article, meaning refundability of the stored value is treated
as distinct from expiry.

`Carrot Cash` is described in the one fully-readable source as
"a **gift from Hopper** that you can apply to your booking to make it even
cheaper" — framing a promotional balance as a gift rather than as earned rewards.

## T11 Help-centre architecture

**`FAQs`, not "Help Center".** `[observed]` The footer group is labelled `FAQs`
and the help site's `<title>` is `FAQs - Hopper`. Hopper does not use the
"help centre" frame at all — the content is positioned as a question list, which
matches the article-title grammar (below) and sets a lower expectation than a
knowledge base.

**Five categories** (T1). **Two-level**: category → article. No sub-sections were
observable.

**Article-title grammar — four shapes, overwhelmingly interrogative** `[observed]`:

| Shape | Examples (verbatim titles) |
|---|---|
| `How do I …?` | `How do I check if my booking is confirmed?` · `How do I request a refund?` |
| `What is Hopper's <Product>?` | `What is Hopper's Premium Disruption Assistance?` · `What is Hopper's Cancel For Any Reason service for flights?` · `What is Hopper's Change For Any Reason service for flights?` |
| `What do I do if …?` / `What if …?` | `What do I do if my flight gets cancelled?` · `What if my Price Freeze expires?` · `What if my booking experiences flight disruptions and/or delays?` |
| `Why …?` | `Why did the price of my reservation go up after I purchased a Price Freeze?` · `Why has my Carrot Cash disappeared?` · `Why was I charged when my hotel booking was not confirmed?` |

*(Titles above marked as verbatim were either confirmed from a directly-fetched
`<title>` tag or surfaced in search listings; the four confirmed by direct fetch
are noted in the Pages table. Bodies were not retrieved for any of them.)*

**`What is Hopper's <Product>?` is the signature shape and it uses the possessive.**
Not "What is Cancel For Any Reason?" but "What is **Hopper's** Cancel For Any
Reason service for flights?" — and note the appositive `service`, which does
classification work in the title: it tells the reader this is a purchasable
service, not a policy or a feature. Plus `for flights`, distinguishing it from the
hotel variant. The title is doing product-taxonomy work before the body starts.

**The `Why …?` articles are the adverse-outcome set**, and all three are written
from the position of a user who believes something has gone wrong:
a price rose despite a freeze, a balance vanished, a charge appeared without a
confirmation. No defensive framing, no "understanding your…", no euphemism. This
is the strongest signal in the file that Hopper's content team writes from the
complaint rather than from the system.

**`What if my booking experiences flight disruptions and/or delays?`** is the
weakest title in the set: `and/or` in a customer-facing question, and a booking
(not a traveller) doing the experiencing.

**Article bodies open by restating the title as an H1-like line**, then answer.
Observable from the meta-description leaks, which capture the first ~150
characters:

- `About Our Price Predictions  How do they work?  Hopper collects…`
- `How to Check if Your Booking is Confirmed  Whenever a booking has been confirmed…`
- `What do I do if my flight gets cancelled?  It's an unfortunate reality, but…`
- `Hopper's Flight Delay Guarantee  Worried about your flight being delayed?…`
- `Hopper's Cancel For Any Reason for Flights  If you're looking for some flexibility…`

Two patterns visible. The task articles restate the question
(`What do I do if my flight gets cancelled?` → same sentence as the body's first
line). The product articles **replace the interrogative title with a declarative
product name** as the body heading — `What is Hopper's Premium Disruption
Assistance?` opens with `Hopper's Flight Delay Guarantee`, and
`What is Hopper's Cancel For Any Reason service for flights?` opens with
`Hopper's Cancel For Any Reason for Flights`. Question in the title for
findability, product name in the body for authority.

**`Booking on Hopper.com` is an outlier** — a gerund noun-phrase title in a set
that is otherwise entirely questions, and the only article whose subject is the
*web* product rather than the app. Its meta description is the single word
`Booking`, suggesting a stub or a hub page.

## T12 FAQs

Hopper's entire help centre is framed as `FAQs`, so T11 and T12 overlap heavily.
No marketing-page FAQ accordion was observable (the storefronts did not render).

**The research article functions as a de facto FAQ**, organised as six numbered
`Hack #N` headings `[observed]`:

| # | Heading (verbatim) |
|---|---|
| 1 | `Hack #1: Travel on the cheapest dates to save as much as 14% on flights & 23% on hotel stays.` |
| 2 | `Hack #2: Travel in the cheapest .onths to save 30-40% on airfare and more.` |
| 3 | `Hack #3: Start monitoring prices early & book at the right time.` |
| 4 | `Hack #4: Book a Staycation!` |
| 5 | `Hack #5: Follow the Deal, not the Destination` |
| 6 | `Hack #6:` `Plan Ahead for Travel Disruptions` |

**The headings carry the payoff in the heading itself** — `to save as much as 14%
on flights & 23% on hotel stays` — so a reader scanning headings alone gets the
quantified claim without reading a word of body. That is the right structure for
advisory content.

Hack #2 contains a **typo in a published H3: `.onths` for `months`** (see T14).
Hack #6's heading is split across two formatting runs, producing a stray space.

**Within Hack #2, the advice is structured as an A-instead-of-B swap** `[observed]`:

- "**Travel in January/February** *instead of* **peak spring break months**."
- "**Travel in September/October** *instead of* **peak summer months**."

Bold-italic-bold, with `instead of` italicised as the pivot. Each is then
justified with a market mechanism, not just a price:
"Airlines, hotels, and many experience providers will **drop prices in January and
February to incentivize travelers to take a trip.**" and "travel providers will
drop prices once again to **drum up additional demand** as the '**shoulder
season**' between summer and the holidays draws closer."

Explaining *why* the price falls — supplier incentive, not luck — makes the advice
transferable to years the article does not cover. `shoulder season` is glossed
in-line by its own definition ("between summer and the holidays") rather than
assumed.

**Hack #5 introduces a coined term and defines it in an em-dash aside** `[observed]`:

> "Consider swapping out your destination for a '**destination dupe**'- a different
> destination offering a similar experience for a much lower price."

`destination dupe` borrows the beauty industry's "dupe" and lands it in travel.
Defined immediately, in eleven words, inside a hyphen (which should be an em-dash
— see T14). Then illustrated with four named swaps, each with a price floor:

- "**Puerto Rico** - as low as $130 round-trip" — "Swap one of the more expensive Caribbean islands like Turks and Caicos for Puerto Rico."
- "**Dublin, Ireland** - as low as $380 round-trip"
- "**Cartagena, Colombia** - as low as $300 round-trip"
- "**Marrakech, Morocco** - as low as under $600 round-trip"

Each swap names the *expensive* destination it replaces or the *experience* it
delivers, so the reader can judge the substitution. The Marrakech entry says
**`as low as under $600`** — two hedges stacked on one number (see T14).

## T13 Terminology & glossary

| Term | Hopper's usage | The alternative it rejected |
|---|---|---|
| `Watch a Trip` / `Watch a Hotel` | The core verb-phrase interaction; nominalises as `Trip Watches`, `Hotel Watches`, `Flight Watch tool` | "Track", "Save", "Set a price alert" |
| `buy` / `wait` | The two prediction states | "Book now" / "Hold off"; any confidence band |
| `Price Prediction` / `Price Predictions` | The feature; singular in the nav, plural in help | "Fare forecast" |
| `Price Freeze` / `Price Freeze™` | The fare-lock product; TM appears once | "Fare hold", "Lock the price" |
| `Price Freeze deposit` | The amount paid to hold, creditable to the booking | "fee" |
| `freeze window` | The duration of the lock | "hold period" |
| `Cancel for Any Reason` (CFAR) | Post-rename; **was `Instant Travel Refund Promise`** | |
| `Change for Any Reason` / `Flexible Dates Plan` | **Two names for one product** | |
| `Leave for Any Reason` | The hotel mid-stay escape product | |
| `Refundable Ticket Plan` / `Refundable Rates` | Flight and hotel variants of one idea, differently named | |
| `Disruption Assistance` / `Premium Disruption Assistance` / `Disruption Rebooking Service` | **Three names for one product** | |
| `Flight Delay Guarantee` | The feature inside Disruption Assistance | |
| `Carrot Cash` | The promotional currency, described as "a gift from Hopper" | "points", "credit", "rewards" |
| `Hopper Wallet` | Where Carrot Cash is held *(surfaced in search listings)* | "balance" |
| `Deals Calendar` | The colour-coded date grid | "fare calendar", "flexible dates" |
| `Exclusive Rates` | App-only inventory, justified by the app-only distribution | "member rates" |
| `destination dupe` | Coined swap concept, glossed in-line | "alternative destination" |
| `shoulder season` | Trade term, glossed in-line | |
| `Early watchers` | Coined user type, used once | |
| `travel providers` | Used once, even-handedly, to acknowledge competitors | |
| `Hopper Homes` / `Hopper Hotels` | The two supply programmes | |
| `FAQs` | The help surface | "Help Center", "Support" |

**`Carrot Cash` is the boldest terminology choice in the travel set.** An
arbitrary, concrete, slightly silly noun for a stored-value balance, with no
semantic connection to travel or to money — which is precisely why it works as a
brand-owned currency. It is unmistakable, unconfusable with real money, and
pluralises and verbs badly enough that it always reads as a proper noun. The
carrot is also a reward-for-the-rabbit metaphor that Hopper (a rabbit-adjacent
brand) never has to explain.

**The `… for Any Reason` family** (`Change` / `Cancel` / `Leave`) is the most
systematic naming in the file — one suffix, three verbs, three moments in the
trip. It scales: a fourth product could be named on the same frame and a user
would understand it immediately.

**Against that, the product naming is genuinely inconsistent.** `Disruption
Assistance` / `Premium Disruption Assistance` / `Disruption Rebooking Service` are
three names in production for one thing. `Change for Any Reason` and `Flexible
Dates Plan` describe the same product on two surfaces. `Refundable Ticket Plan`
(flights) and `Refundable Rates` (hotels) are the same idea under different nouns.
A product portfolio built on a beautifully systematic naming frame, applied
inconsistently across the surfaces that describe it.

**Register.** Consistently informal and second-person: `score travel deals`,
`unbelievable`, `game-changer`, `a breeze`, `super cheap`, `Nice.`, `Enjoy!`.
Exclamation marks are frequent in marketing and absent from policy — except for
`ticky-tacky` in the FTC statement, which is informality breaking through where it
does not belong.

## T14 Voice, tone & accessibility

**Person.** Second person throughout, first-person plural for the company
("We'll monitor the price of your specific trip", "We've rounded up", "we
identified and deprecated these display practices ourselves"). Third person is
used for Hopper in the 2017 and 2021 marketing ("Hopper predicts…", "Hopper helps
you…") — the brand acting as an agent rather than speaking as "we". Both voices
are in current use.

**Register is warm, confident and exclamation-heavy** in marketing:
`Ready to plan your next adventure? You've come to the right place!` ·
`Hopper is the smart way to score travel deals!` · `Nice.` ·
`Make sure you rent a car you can drive!` · `Book a Staycation!` ·
`You could save up to 40% on your next flight!`

**Anxiety is named directly, repeatedly, as a thing the product removes**:
`save you time, money, and anxiety` · `Worried about your flight being delayed?` ·
`Never get stuck at the airport again` · `forget the frustration` ·
`avoid fees and frustration` · `no long lines`. Hopper writes about the
**emotional** cost of travel more than any other product in this set, and it is
the through-line that connects a price-prediction feature to a delay guarantee.

**Rhetorical questions open product explanations**, consistently:
"Found a great price, but not quite ready to book?" ·
"Worried about your flight being delayed?" ·
"Changed your mind to another hotel? No problem" ·
"See a great deal but not ready to book?" ·
"How much can the Price Freeze save you?"

**Numbers are always dual-format** (percentage + absolute) and always sourced.
`95% accuracy` · `up to 40%` · `5-10% cheaper` · `14%` / `$42 per ticket` ·
`32%` / `$100` · `40%` / `$150` · `$43 per stay, or $17 per night` ·
`over $100 million` · `$175 million` · `96% of all Hopper app reviews` ·
`1.7% of reviews are 1-star` · `2x more likely to be delayed` ·
`over 3% of flights canceled`.

**Tone flattens as stakes rise** — but with one conspicuous failure. Marketing is
exuberant; product bounds are flat and precise (`at least 80%`, `up to $100`,
`up to 24 hours prior to your scheduled departure`); and then the FTC statement
reverts to colloquial dismissal (`ticky-tacky`) at the single highest-stakes moment
on the site.

**Accessibility content: `[absent]`.** No accessibility statement, no
accessibility page, no `Skip to content` link, and no accessibility entry in any
footer was found on any reachable Hopper property. The product surfaces did not
render at all, so no in-product accessibility practice could be assessed. **This
is a gap in the harvest, not a confirmed absence.**

**Alt text** `[observed]`, and it is poor where it is observable:
`Author Image` · `Hero Background Image` · `Download Image` ·
`Booking-Hacks_When-to-Fly.png "Booking-Hacks When-to-Fly"` ·
`Booking-Hacks_Premiums-Cities.png "Booking-Hacks Premiums-Cities"` ·
`Spring-Getaway-Sale IMG01Hopper Media-Center-01` · `Hopper Watermark` ·
`Newsweek Image` · `App Hero Image` · `TDT-2025-HTS`.

**Every chart in the research article carries a filename-derived alt string.**
`Booking-Hacks_Airfare-by-month.png` is alt-texted `"Booking-Hacks
Premiums-Vacations"` — a **copy-paste error putting the wrong chart's name on the
airfare chart**. Since the entire argument of Hack #1 and Hack #2 is carried by
five data visualisations, a screen-reader user gets none of the substance. For an
article whose value *is* the data, this is the most serious accessibility failure
recorded in this corpus.

### Negative findings, recorded honestly

- **`hopper.com` renders no body text to a non-JS client.** Homepage, `/flights`, all five `/product/*` pages and `/legal/terms-and-conditions` return empty bodies. All five product pages share one generic meta description ("Score unbelievable travel deals exclusively in the Hopper App") and one generic title ("Book Travel on Mobile | Hopper") — so `/product/price-prediction` and `/product/cancel-for-any-reason` are indistinguishable to a search engine or a link preview.
- **`help.hopper.com` renders no body text either.** Content is recoverable only from `meta-description` (first ~150 chars) and `meta-keywords` (an auto-extracted term list, not copy).
- **A published H3 reads `Travel in the cheapest .onths`** — `.onths` for `months`, live in the 2025 research article.
- **The 2025 article tells readers to monitor prices "for 2024"** — "We recommend using Hopper's Flight Watch tool to monitor the price of any trips you're dreaming of **for 2024**" — in a piece dated 28 January 2025 and headed `2025 Travel Booking Hacks`.
- **`as low as under $600`** — two hedges on one number, in the Marrakech entry.
- **Three production names for one product**: `Disruption Assistance` / `Premium Disruption Assistance` / `Disruption Rebooking Service`.
- **Two names for another**: `Change for Any Reason` / `Flexible Dates Plan`.
- **`at least 80%` (flights) vs `80%` (hotels)** for the same refundable-rate concept, on the same page.
- **Three magnitudes for the training corpus**: `more than one billion`, `billions of pieces`, `a trillion`.
- **Two figures for one loyalty-style claim**, and three metrics for prediction value (`95% accuracy`, `estimated 95% of the time`, `over $100 million saved`).
- **`Add a Disruption Assistance`** — malformed article before a product name.
- **`and/or` in a customer-facing article title**: `What if my booking experiences flight disruptions and/or delays?`
- **A colon inside a URL path**: `/en_us/price-freeze-for-flights:-no-availability-error-Bk6YNFutD`
- **`billing-and-payments` (slug) vs `Billing and Payment` (label)**.
- **Hyphens used where em-dashes belong**: "a 'destination dupe'- a different destination…" · "in the app - no matter the airline - at no additional cost".
- **Inconsistent headline capitalisation**: `Late Summer Sale running August 12-14th` vs `Early Summer Sale Running from May 6th to the 8th`.
- **`Media Enquiries`** — British spelling on a US property.
- **Chart alt text is filenames**, and at least one is the *wrong* filename.
- **`ticky-tacky`** in a regulatory settlement statement.
- **`canonical: https://media.hopper.comundefined`** — a broken canonical URL with a literal `undefined` concatenated, on every `media.hopper.com` page inspected.
- **The FTC settlement article's `meta-description` is a single space**, so it has no link preview text.

---

## Transferable patterns

1. **Keep the recommendation state unhedged and put the uncertainty beside it, not inside it.** `buy` / `wait` as bare two-word states, with `95% accuracy` carried at the feature level. A user cannot act on "we are 73% confident you should probably wait"; they can act on `wait` if they have been told separately how often `wait` is right. **The single most important lesson from this product.**
2. **Define prediction success as "you were not made worse off", not as "we were right".** "following the 'buy' or 'wait' recommendation will get you a cheaper flight **or at least the same price** as found in your initial search." Weaker claim, more useful promise, and it survives scrutiny.
3. **Name the emotion the product removes.** "save you time, money, and **anxiety**". For any product whose value is decision-relief rather than price, the third noun is the real one.
4. **Open a product explanation with the user's current state as a question.** "Found a great price, but not quite ready to book?" · "Worried about your flight being delayed?" More specific than a benefit statement, and it qualifies the reader in one line.
5. **Name the constraint you remove, and set it off typographically.** "you can instantly rebook the next flight to your destination in the app - **no matter the airline** - at no additional cost." The whole product is in the aside.
6. **Use a floor, not a ceiling, for refund promises.** `at least 80%` tells the user their worst case; `up to 80%` tells them nothing they can plan around.
7. **Make a lock one-directional and say so in one sentence.** "if the price increases… Hopper will cover up to $100… **If the price goes down during the freeze window, you'll pay the new low price.**" Two parallel conditionals, user wins both ways, cap disclosed inline.
8. **Caption your own data with its expiry.** *"Table: Prices change often, and so might our advice on when to book."* Eleven words that hedge the data, the advice and the recency, placed where a source note would go.
9. **Give every savings claim in both percentage and absolute terms.** `14%` *and* `$42 per ticket`. The percentage is comparable; the dollar figure is decidable.
10. **Publish the free alternatives to your paid product.** Three of four disruption mitigations cost nothing, one explicitly costs the reader money, and the paid one is acknowledged as "offered on Hopper **and other travel providers**".
11. **Write the `Why …?` articles from the complaint, not from the system.** `Why did the price of my reservation go up after I purchased a Price Freeze?` · `Why has my Carrot Cash disappeared?` — the user's alarmed verb, no defensive framing, for the cases where your own guarantee appears to have failed.
12. **Name a state pair asymmetrically when the evidence is asymmetric.** "alerting you if **prices drop or are expected to rise**" — observed past for the good news, forecast future for the bad. Do not pretend to predict what you can only report, or to report what you can only predict.
13. **Build a product family on one suffix and vary only the verb.** `Change / Cancel / Leave for Any Reason`. Three moments on the trip timeline, instantly legible, and extensible.

## Caveats & gaps

- **The primary surface is unreadable and the in-app prediction copy was never seen.** `hopper.com` is a client-rendered SPA; `help.hopper.com` likewise. **The actual strings a user reads when Hopper tells them to buy or wait — the recommendation card, the confidence framing, the price-history chart labels, the watch-confirmation, the alert push copy — are not present on any public web surface and are not recorded in this file.** Everything in T6 and T10 about prediction language is reconstructed from marketing prose, help-article titles, and meta-description fragments. **This is a severe limitation for the product whose benchmark strength is exactly that copy.**
- **Five quotations in T6 and T10 are marked as *indexed but not directly fetched*** — they come from search-engine summaries of `media.hopper.com` pages that were not retrieved in this pass (`why-we-do-what-we-do-at-hopper`, `booking-strategies-for-the-modern-traveler`). They are labelled inline as indicative and should be re-verified before use as precedent. **No string in this file has been invented; anything not directly observed is flagged.**
- **No help-article body was retrieved.** The five meta-description leaks give roughly the first 150 characters of five articles. Everything after that — including the actual mechanics of Price Prediction, the CFAR refund terms, the Disruption Assistance claim process, and the Carrot Cash expiry rule — is unharvested. **Where an article title implies a term (e.g. a Carrot Cash expiry period), no term is stated in this file.**
- **`meta-keywords` term lists are reported once as a structural signal only.** They are auto-extracted single words, not copy, and no sentence has been reconstructed from them.
- **No form, field, error, empty-state, validation or in-product notification copy** was observable. T5 and T8 are `[absent]`; T9 is reconstructed entirely from descriptions of notification behaviour.
- **No accessibility statement was found** on any Hopper property. This is a gap in the harvest, not a confirmed absence.
- **Terms and Conditions and Privacy Notice were not readable.** No regulatory, licensure or insurance-status disclosure is reported.
- **The FTC settlement section reports Hopper's own account only.** The FTC's position was not sought and is not reproduced.
- **Two of the three fully-readable marketing sources are old** — `Welcome to Hopper!` is dated June 2021 and `5 Ways the Hopper App Saves You Money` is dated October 2017. The feature inventory in T2 reflects 2021 product naming; several products have demonstrably been renamed since (the `Instant Travel Refund Promise` → `Cancel for Any Reason` redirect proves it). **Feature descriptions quoted from those articles may no longer match the live app.**
- **`support.hopper.com` (the legacy Zendesk) returned empty** — a second, older help corpus exists and was not reachable.
- **Hopper's supply-side surfaces** (`hosts.hopper.com`, the Hotels partner Typeform) were not opened.
- **Mobile app copy and app-store listings** are out of the public web surface — which, for an app-first product, means the majority of this product's UX content is out of scope by definition.

## Sources

**Fully readable:**
1. https://media.hopper.com/articles/welcome-to-hopper
2. https://media.hopper.com/articles/5-ways-the-hopper-app-saves-you-money
3. https://media.hopper.com/research/2025-travel-booking-hacks
4. https://media.hopper.com/news/hopper-announces-price-freeze-for-hotels-to-help-summer-travelers-lock-in
5. https://media.hopper.com/news/hopper-reaches-settlement-with-the-ftc
6. https://media.hopper.com/news

**Partial (meta-description leak only):**
7. https://help.hopper.com/en_us/about-our-price-predictions-Hy7cLt_Fv
8. https://help.hopper.com/en_us/premium-disruption-assistance-ByKnGtdKD
9. https://help.hopper.com/en_us/instant-travel-refund-promise-ry7OrFuFD → /cancel-for-any-reason-flights-ry7OrFuFD
10. https://help.hopper.com/en_us/what-do-i-do-if-my-flight-gets-canceled-SkFObDw55
11. https://help.hopper.com/en_us/how-to-check-if-your-booking-is-confirmed-rJ3QUY_KP
12. https://help.hopper.com/en_us/booking-on-hopper-com-B1fbLwxe6

**Attempted, empty body (recorded as blocked):**
13. https://hopper.com/
14. https://hopper.com/flights
15. https://hopper.com/product/price-prediction
16. https://hopper.com/product/cancel-for-any-reason
17. https://hopper.com/product/premium-disruption-assistance
18. https://hopper.com/legal/terms-and-conditions
19. https://help.hopper.com/
20. https://help.hopper.com/en_us/categories/price-freeze-general-information-ryHCgqNKu
21. https://help.hopper.com/en_us/what-if-my-price-freeze-expires-r1peqV3Yd
22. https://help.hopper.com/en_us/why-did-the-price-of-my-reservation-go-up-after-i-purchased-a-price-freeze-Skj2sEuo
23. https://help.hopper.com/en_us/price-freeze-for-flights:-no-availability-error-Bk6YNFutD
24. https://support.hopper.com/hc/en-us/articles/360024199954-Price-Predictions
